var rp = require("request-promise");
var filterer = require("./email-filterer.js")
var HtmlParser = require("./html-parser-utils.js");
var unique = require("array-unique");

function WebsiteEmailScraper (domain) {
  var websiteQueue = [
    domain
  ];
  var pastCrawled = [];
  var emails = [];

  let currentLevel = 1;

  this.getLevels = async function(maxLevel, timeout = 5000) {
    if (maxLevel === 0) return [];    
    let stop = false;
    let execTimeout = setTimeout(() => {
      stop = true;
    }, timeout);

    try {
      while(currentLevel <= maxLevel) {
        if(stop) break;
        await getLevel();
        currentLevel ++;
      }  
    } catch (error) {
      throw error;
    }
    
    clearTimeout(execTimeout);
    return filterer.filterEmails(unique(emails));
  }

  // async parallels requests
  async function getLevel () {
    var newLinks = [];
    const promises = [];
    for (let url of websiteQueue) {
      if (pastCrawled.indexOf(url) === -1) {
        promises.push(new Promise(async (resolve) => {
          console.log(`parse ${url}`);
          const htmlString = await rp({url, headers : {'User-Agent' : 'request'}})
          pastCrawled.push(url);
          parser = new HtmlParser(htmlString, domain);
          newLinks = unique(newLinks.concat(parser.extractLinks()));
          emails = emails.concat(parser.extractEmails());
          resolve();
        }));
      }
    }

    await Promise.all(promises);
    
    websiteQueue = [];
    for (var i=0; i<newLinks.length; i++) {
      if (pastCrawled.indexOf(newLinks[i]) === -1) websiteQueue.push(newLinks[i]);
    }

    websiteQueue = unique(websiteQueue);
  }
}

module.exports = WebsiteEmailScraper;

var rp = require("request-promise");
var HtmlParser = require("./html-parser-utils.js");
var unique = require("array-unique");
var validator = require("validator");


function WebsiteEmailScraper (domain) {
  var websiteQueue = [
    domain
  ];
  var pastCrawled = [];
  var emails = [];

  let currentLevel = 1;
  let timeout = 5000;

  this.getLevels = async function(maxLevel, newTimeout) {
    if (maxLevel === 0) return [];    
    let stop = false;

    timeout = newTimeout || timeout;

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
    return unique(emails).filter(email => validator.isEmail(email));
  }

  // async parallels requests
  async function getLevel () {
    var newLinks = [];
    const promises = [];
    for (let url of websiteQueue) {
      if (pastCrawled.indexOf(url) === -1) {
        promises.push(new Promise(async (resolve) => {
          try {
            const htmlString = await rp({url, headers : {'User-Agent' : 'request'}, timeout})
            parser = new HtmlParser(htmlString, domain);
            newLinks = unique(newLinks.concat(parser.extractLinks()));
            emails = emails.concat(parser.extractEmails());   
          } catch (error) {}

          pastCrawled.push(url);
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

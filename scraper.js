/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package
* 2017-11-20
*/

var rp = require("request-promise");
const cheerio = require('cheerio');


var filterer = require("./email-filterer.js")
var HtmlParser = require("./html-parser-utils.js");
var QueueManager = require("node-asyncqueue");
var unique = require("array-unique");
// Asynchronously resolve a list of asynchronous tasks using promises
// var asyncQueue = require("async-queue");

function WebsiteEmailScraper (domain) {
  /* private */
  /**
   * List of websites that are to be crawled
   * @type {Array}
   */
  var websiteQueue = [
    domain
  ];

  /**
   * Prevents repeats from being crawled
   * @type {Array}
   */
  var pastCrawled = [];


  var emails = [];

  /**
   * How many times this crawler has recursed on links it has found
   * @type {Number}
   */
  var currentLevel = 0;

  this.getLevels = function(numLevels) {

    var levels = [];
    var p = new Promise(function(resolve, reject) {resolve();});


    for (var i=0; i<numLevels; i++) {
      p = p.then(() => {

      }).then(getLevel);
    }


    return p.then(() => {
      return filterer.filterEmails(unique(emails));
    });
  }


  /* public */
  function getLevel () {
    var newLinks = [];
    var promiseQueue = [new Promise(function(resolve, reject) {resolve();})];

    for (var i=0; i<websiteQueue.length; i++) {

      promiseQueue.push(
        rp({url : websiteQueue[i], headers : {'User-Agent' : 'request'}}).then((htmlString) => {
          parser = new HtmlParser(htmlString, domain);
          newLinks = newLinks.concat(parser.extractLinks());
          console.log("num liinks: " + newLinks.length);
          emails = emails.concat(parser.extractEmails());

        })
        .catch((e) => {
          throw new Error("Error with rp: " + e);
        })
      );
    }
    // Async Queue, get all
    return QueueManager.asyncFunctionQueue(promiseQueue, true).then(() =>{
      currentLevel ++;
      websiteQueue = [];
      for (var i=0; i<newLinks.length; i++) {
        // add next level of links
        if (pastCrawled.indexOf(newLinks[i]) === -1) websiteQueue.push(newLinks[i]);
      }
    });

    // crawl, add all pages to website queue
  }


}

module.exports = WebsiteEmailScraper;

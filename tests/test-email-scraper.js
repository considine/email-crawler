/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package
* 2017-11-20
*/




var HtmlParser = require("../html-parser-utils");
var Scraper = require("../scraper.js");
// rewire

var rp = require('request-promise');
var assert = require('assert');
var path = require("path");
var fs = require("fs");



var htmlparser;
var domain = "https://requestb.in";

// Mock data
var testData =
[
  {  "domain" : "https://requestb.in",
    "relativeLinks" : 3,
    "localPath" : "./assets/links.html"
  },
  {
    "domain" : "https://koptional.com",
    "localPath" : "./assets/links2.html"
  },
  {
    "domain" : "http://johnwetzel.co",
    "localPath" : "./assets/links3.html"
  }
];

// test utility for synchronously getting file data
// storing test files in assets dir
function getFileContents (localPath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, localPath), 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

describe ("htmlParserUtils", function () {
  describe("#extractLinks()", function() {
    before(function(done) {

      // Ready test Data
      var thisDat = testData[0];
      getFileContents(thisDat.localPath).then((data)=> {
        htmlparser = new HtmlParser(data, thisDat.domain);
        done();
      })
      .catch((e) => {
        done(e);
      })

    });
    it ("should remove all absolute link references properly", function(done) {

      var links = (htmlparser.extractLinks());
      if (links.length !== 2) return done(new Error("failed to replace all absolute link references"));
      done();
    });
  });



  describe("#extractEmails()", function() {
    before(function(done) {
      var thisDat = testData[2];
      getFileContents(thisDat.localPath).then((data) => {
        htmlparser = new HtmlParser(data, thisDat.domain);
        // console.log(data);
        done();
      })
      .catch((e) => {
        done(e);
      });

    });
    it ("should find emails that exist in an html file", function(done) {

      var emails = htmlparser.extractEmails();
      if (emails.length> 0) done();
      else done(new Error("no emaisl found"));
      // done();
    });
  });
});




describe("scraper", function() {

  describe("#crawlLevel()", function() {
    it("should retrieve links from the homepage", function(done) {
      var emailscraper = new Scraper("http://www.donfranklinmonticello.com/");
      emailscraper.getLevels(3, 1000).then((emails) => {
        console.log(emails);
        done();
      })
      .catch((e) => {
        done(e);
      })
    })
  })
})

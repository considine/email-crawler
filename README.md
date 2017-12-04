# email-crawler


## INSTALLATION
```
npm install email-crawler
```

## USAGE
```javascript
var Scraper = require("email-crawler");
var emailscraper = new Scraper("https://koptional.com");
// A level is how far removed (in  terms of link clicks) a page is from the root page (only follows same domain routes)
emailscraper.getLevels(2).then((emails) => {
  console.log(emails); // Here are the emails crawled from traveling two levels down this domain
})
.catch((e) => {
  console.log("error");
})
```


## TESTS
sorry, I am using mocha and jasmine at this point but am hoping to move all to jasmine
```
./node_modules/mocha/bin/mocha tests/*.js --timeout=150000
./node_modules/jasmine-node/bin/jasmine-node spec
```

or simply
```
npm test
```

## LICENSE
MIT

/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package email-scraper
* 2017-12-02
*/

var _ = require('underscore');

var filter_out = [
  ".*@example.com$",
  ".*@domain.com$",
  ".*@mydomain.com$",
  ".*\.png$",
  ".*\.jpe?g$",
  ".*\.gif$",
  ".*@[0-9\.]+$" // no letters

]


module.exports = {
  /**
   * [description]
   * @param  {[type]} emailArray [description]
   * @return {[type]}            [description]
   */
  filterEmails : function (emailArray) {
    return _.filter(emailArray, function(item) {
      for (var i=0; i<filter_out.length; i++) {
        var re = new RegExp(filter_out[i]);
        if (re.test(item)) return false;
      }
      return true;
    });
  }
}

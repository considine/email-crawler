var EmailFilterer = require("../email-filterer");
var request = require('request');



var testEmails =  ['crleohaettprs@bellsouth.net', 'dcidwsoyanh@yahoo.com', 'egicesoetduirrvs@comcast.net', 'anoalr@littlefieldoil.com', 'duocaraairb@aol.com', 'tooual_awrd@yahoo.com', 'needsis@smsh.org', 'rperaivr@hctc.net', 'inikgs.@mail.glassdoctor.com', 'srcatnra89@gmail.com', 'pstitdogunc@gmail.com', 'b61k09s.ks@gmail.com', '9kk5eB8a1@yahoo.com', 'WnMBe@live.com', 'cetkBs4al@aol.com', 'eswsnotshtaurt@cableone.net', 'kaeti@strickerbros.com', 'aauc3r1o94di@att.net', 'c3amriios3lehs@sbcglobal.net', 'agout9absts7esl@yahoo.com', 'devalz@mlode.com', '3aporin8ic58e1.outs@gmail.com', 'mstptnbdia@frontiernet.net', 'wsraa@cadillactruck.com', 'riarltaaeoppeur@gmail.com', 'teocretrasplh@bellsouth.net', 'yhwndsdoaci@yahoo.com', 'csvodtrreiiseuge@comcast.net', 'oalrna@littlefieldoil.com', 'brirduaocaa@aol.com', 'aal_rdootwu@yahoo.com', 'edsnies@smsh.org', 'vriarerp@hctc.net', 'k.siign@mail.glassdoctor.com', 'arrnsct9a8@gmail.com', 'iogdnstctpu@gmail.com', '6190kk.sbs@gmail.com', 'aBk1k895e@yahoo.com', 'MnBeW@live.com', 'lekBastc4@aol.com', 'soetsnwuthsatr@cableone.net', 'etiak@strickerbros.com', 'cai439rdauo1@att.net', 'asliomsc33erhi@sbcglobal.net', 'ts7tseogu9salab@yahoo.com', 'evalzd@mlode.com', 'tp5as8uni1o3cieor8.@gmail.com', 'tmdnstiapb@frontiernet.net', 'wsaar@cadillactruck.com', 'raaoeurpartpile@gmail.com', 'fnoi@garberselectric.com', 'john@eclipsegt.com', 'bjb@winthropcpa.com', 'nebnpslg@aol.com', 'niof@ArchwayAutoSalvage.com', 'k.lzitesmnoi@yahoo.com', 'ttezmiscrh.pe@farmerscoop.com', 'ucrcclettkuitaeor@sbcglobal.net', 'fino@automotive-recyclers.com', 'uamoailaretprrtslta@gmail.com', 'shmoat@windstream.net', 'sbkellijin@bmwstore.com', 'tamt@fdford.com', 'si24p3@sbcglobal.net', 'aydn@americantirepros.com', 'ikonarrlcf@yahoo.com', 'pa@premiercooperative.com', 'ttam@proautocollision.com', 'crnrlliueme@gmail.com', 'al242ogl1k@yahoo.com', 'seasl@sunriseforeignautoparts.com', 'reubc@leessummithonda.com', '903r50c@windstream.net', 'mknig@ralphkingbody.com', 'rtatpp@cableone.net', 'srla3tla@mindspring.com', 'totcacn@lambcreek.com', 'kagsralls@batterysource.com', 'rrsctutii@aol.com', 'o1023tishamar@yahoo.com', 'batrsnb@ptialaska.net', 'uckuBTwAudrstcnnoikar@yahoo.com', 'liaem@forrestersonline.com', 'hstiillrvptsame@sbcglobal.net', 'iyetafoesualrprt@yahoo.com', 'etikr@sunflower.com', 'ccisrojeeivreankst@yahoo.com', 'ctbyiwyb@aol.com', 'sl1c@bellsouth.net', 'indma@southerncarts.com', 'mrydee@casperautoparts.com', 'ttzivuoamotoae@yahoo.com', 'leeyschs@farmsupplycenter.net', 'eapaaobflafrd@aol.com', 'odbeibedo@rhinowimax.com', 'elnsnefykanr@glassdoctorrdu.com', 'brkemosp@cableone.net', 'sbeawutoodyany@frontiernet.net', 'dewnihislirdswecsentn@yahoo.com', 'emeiertcnservc@mmctsu.com', '1ornra0a@aol.com', 'oydhusbsrnoebp@centurytel.com', 'ssore@rosemotor.com', 'l55ase5ye@windstream.net', '57ax1nspo@roadrunner.com', 'g26du1@comcast.net', 'oleiamciroin.rplas@gmail.com', 'aririaerrhps@harrisautorepairink.com', 'pleasmp@maplesgas.com', 'wdfyoo@bellsouth.net', 'ddbaumotnoydioa@provalue.net', 'sopehjs@doandelivers.com', 't6d31a1@yahoo.com', 'imj@tire-mart.com', 'tnwenri@weathersauto.com', 'nedsetgeearoitacss@sbcglobal.net', '2jlhawhn7so@live.com', 'lrhil@HillSyntheticDistributing.com', 'ne.syarike@mail.glassdoctor.com', 'bcsa@alanclark.kscoxmail.com', 'tlmisdnwba@baldwin-telecom.net', 'ajaaaydmjhn@hotmail.com'];


describe("emailFilterer", function() {
  describe("#filterEmails", function() {
    it("should filter out emails that end in versions", function() {
      var versionEmails  = ["item@1.2.3", "lodash@1.13.2", "jackson@12.1.2"];
      var testSet = versionEmails.concat(testEmails);

      expect(JSON.stringify(EmailFilterer.filterEmails(testSet))).toEqual(JSON.stringify(testEmails));
    });

    it ("should filter out emails that end in png or jpg or jpeg", function () {
      var versionEmails  = ["facebook@item.png", "jack@png", "ryan@jpeg", "linkedin@jpg", "item@gif"];
      var testSet = versionEmails.concat(testEmails);

      expect(JSON.stringify(EmailFilterer.filterEmails(testSet))).toEqual(JSON.stringify(testEmails));
    });

    it ("should filter out placeholder emails", function () {
      var versionEmails  = ["user@mydomain.com", "jack@domain.com", "somebody@example.com"];
      var testSet = versionEmails.concat(testEmails);

      expect(JSON.stringify(EmailFilterer.filterEmails(testSet))).toEqual(JSON.stringify(testEmails));
    });

  })
})

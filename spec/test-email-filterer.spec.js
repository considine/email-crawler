var EmailFilterer = require("../email-filterer");
var request = require('request');



var testEmails =  ['rerahclstpoet@bellsouth.net', 'osidacwdhyn@yahoo.com', 'sotugieecrdsvire@comcast.net', 'raoanl@littlefieldoil.com', 'rraibaadcuo@aol.com', 'ao_laudotrw@yahoo.com', 'ssednie@smsh.org', 'rrpivare@hctc.net', 'isnig.k@mail.glassdoctor.com', 'racsr9tna8@gmail.com', 'dgptiuotscn@gmail.com', '.ks9k1b06s@gmail.com', 'kaB5e81k9@yahoo.com', 'nMeWB@live.com', 'ea4ltscBk@aol.com', 'seanthswtorsut@cableone.net', 'taeik@strickerbros.com', 'cdar4139uoia@att.net', 'ao3eslri3hmsci@sbcglobal.net', 'e9ta7assloubtsg@yahoo.com', 'vazlde@mlode.com', '5.8iop13ictoeuas8nr@gmail.com', 'itmdntbsap@frontiernet.net', 'awrsa@cadillactruck.com', 'roelaappruatire@gmail.com', 'elpeatosrcrth@bellsouth.net', 'wscodiayndh@yahoo.com', 'doireevgecsirsut@comcast.net', 'onrlaa@littlefieldoil.com', 'abouaiadrcr@aol.com', 'luwadt_aoor@yahoo.com', 'sidseen@smsh.org', 'prvrriea@hctc.net', '.siking@mail.glassdoctor.com', 's89actranr@gmail.com', 'uodingscptt@gmail.com', '.60b91skks@gmail.com', '198ea5kkB@yahoo.com', 'eWnMB@live.com', 'Bksaetc4l@aol.com', 'eurhtsnostsawt@cableone.net', 'atike@strickerbros.com', '1adurac3i9o4@att.net', 'hs3imlcosair3e@sbcglobal.net', 'otg9tebsala7sus@yahoo.com', 'vledaz@mlode.com', '8n.rupa1oiio3se8tc5@gmail.com', 'tpdbmnitsa@frontiernet.net', 'sawar@cadillactruck.com', 'rraeeiolaupatpr@gmail.com', 'ofni@garberselectric.com', 'hjno@eclipsegt.com', 'bjb@winthropcpa.com', 'genspbln@aol.com', 'onif@ArchwayAutoSalvage.com', 'lzkmnes.iito@yahoo.com', 'cmz.phesreitt@farmerscoop.com', 'ltitaceutuoerrkcc@sbcglobal.net', 'oifn@automotive-recyclers.com', 'pstamalrureltratoai@gmail.com', 'moasht@windstream.net', 'jsllibenki@bmwstore.com', 'tmat@fdford.com', '32i4ps@sbcglobal.net', 'ynad@americantirepros.com', 'filcknraor@yahoo.com', 'pa@premiercooperative.com', 'attm@proautocollision.com', 'rleluicenmr@gmail.com', 'ga242ol1lk@yahoo.com', 'lseas@sunriseforeignautoparts.com', 'reucb@leessummithonda.com', '3r50c90@windstream.net', 'gmnik@ralphkingbody.com', 'pprtat@cableone.net', 'lartla3s@mindspring.com', 'natotcc@lambcreek.com', 'lrlsaaksg@batterysource.com', 'crurittis@aol.com', 'aios3ram12h0t@yahoo.com', 'bastbrn@ptialaska.net', 'iuAdkncusBcrTtroawukn@yahoo.com', 'leami@forrestersonline.com', 'hsepltvmrltiias@sbcglobal.net', 'trotulieasyraepf@yahoo.com', 'rtkei@sunflower.com', 'inicartckseojsrvee@yahoo.com', 'tbbcwyiy@aol.com', '1slc@bellsouth.net', 'dmina@southerncarts.com', 'deyerm@casperautoparts.com', 'tmouzoatvoaeti@yahoo.com', 'sesehylc@farmsupplycenter.net', 'raeopbdlaaffa@aol.com', 'dobebdioe@rhinowimax.com', 'yrnseafnlenk@glassdoctorrdu.com', 'emsrpkbo@cableone.net', 'ydewoytbnasaou@frontiernet.net', 'isesrninceitehnswdwdl@yahoo.com', 'mcitecenveerrs@mmctsu.com', 'oraa10rn@aol.com', 'hpdbreuosobnys@centurytel.com', 'roses@rosemotor.com', 'l5s5eyae5@windstream.net', '5oa71xnsp@roadrunner.com', '6g2d1u@comcast.net', 'lo.rinmarcliopaies@gmail.com', 'riihrsarrape@harrisautorepairink.com', 'pleamsp@maplesgas.com', 'dyoowf@bellsouth.net', 'odouoainddtybma@provalue.net', 'sjhsoep@doandelivers.com', '1da31t6@yahoo.com', 'ijm@tire-mart.com', 'nwniert@weathersauto.com', 'saeasrsgenceetitod@sbcglobal.net', '7nho2lshwja@live.com', 'llihr@HillSyntheticDistributing.com', 'reia.ksyne@mail.glassdoctor.com', 'sacb@alanclark.kscoxmail.com', 'bisladwntm@baldwin-telecom.net', 'ajdaahyjnma@hotmail.com', 'uotutlfason@comcast.net', 'sentsnigarede@sbcglobal.net', 'airbsdely.@mail.glassdoctor.com', 'ciccrasabulsdlnem@windstream.net', 'rkyic@autoglassofindiana.com', 'mr6ai7r2epr0@sbcglobal.net', 'usoa1jtj@gmail.com', 'JreaneWro@lavabit.com', 'TERESISASRAECEYRG@MSN.COM', 'sccylashisssa@fpunet.com', 'ayansyrdor@gmail.com', 'sndine@mohavehitch.com', 'rnwt0sc@q.com', 'ittcroovereks@gmail.com', 'nosmgdirarsral@aol.com', 'ersaldawnvaer@hotmail.com', 'isktrni@grassyautoparts.com', 'lei5rnlo5w@hotmail.com', 'agohrgntoecenvl@yahoo.com', 'rauaowtsds@sbcglobal.net', 'sraokahl.cy@gmail.com', 'rbriderodfta@frontiernet.net', 'esrn3frJei@windstream.net', 'osAGyu2yubtod@gmail.com', 'dzjelu@teamdeluz.com', 'lkiliucaoinao1s@aol.com', 'urpolspsetp@gmail.com', 'gnsriprdhec@yahoo.com', 'tneecntebhrhw@hotmail.com', 'obcra@portcitymail.com', 'lyhc.retarsbna@mail.glassdoctor.com', 'aairosvtcerderi@bellsouth.net', 'ttoieiosettemvnzaum@yahoo.com', 'tejirr@mediacombb.net', 'iv8mcadvaea7to6td5neuo@gmail.com', 'sasolgastnw@gmail.com', 'FION@autoadditions.net', 'a_evrdkufsse@yahoo.com', 'asaibtntctypm@hotmail.com', 'jemlratob@millerglass.com', 'ssotneijwsld6eil6eb@yahoo.com', 'celrnatecl@evanstire.com', 'mkei@palmettoglass.com', 'don3sn0dycahopusb@yahoo.com', 'inof@bensonautobody.com', 'sotrgiepr.@mail.glassdoctor.com', 'erearcmten@budgetblinds.com', 'cc767w@yahoo.com', 'awrdmcih@fuse.net', 'tprrye@yahoo.com', 'alup@deltaworldtire.com', 'ingmmed@savannahhyundai.com'];

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

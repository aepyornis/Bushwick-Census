  // CENSUS data from American Fact Finder
  // NYC data from table P2
   var nyc2010 = {
      totalpop: {
        bronx: 1385108,
        kings: 2504700,
        newyork: 1585873,
        queens: 2230722,
       richmond: 468730
     },
       hispanic: {
         bronx: 741413,
         kings: 496285,
         newyork: 403557,
         queens: 613750,
         richmond: 81051
     },
       nhw: {
         bronx: 151209,
         kings: 893306,
         newyork: 761493,
         queens: 616727,
         richmond: 300169
       }
   };

     var nyc2000 = {
      totalpop: {
        bronx: 1332650,
        kings: 2465326,
        newyork: 1537195,
        queens: 2229379,
       richmond: 443728
    },
     hispanic: {
        bronx: 644705,
        kings: 487878,
        newyork: 417816,
        queens: 556605,
       richmond: 53550
     },
      nhw: {
        bronx: 193651,
        kings: 854532,
        newyork: 703873,
        queens: 732895,
        richmond: 316316
     }
    };

  var bushwick2010 = {
    totalpop: 112634,
    hispanic: 73616,
    nhw: 9564
  };

  var bushwick2000 = {
    totalpop: 104358,
    hispanic: 70142,
    nhw:3026
  };

  function sum(memo, num) {
    return memo + num;
  }
  
  function sumPop(data) {
    return _.chain(data).values().reduce(sum).value();
  }
  
  // Hispanic Population
  // sumPop(nyc2000.hispanic)/sumPop(nyc2000.totalpop) * 100 = 26.98%
  // sumPop(nyc2010.hispanic)/sumPop(nyc2010.totalpop) * 100 = 28.56%
  // bushwick2000.hispanic/bushwick2000.totalpop * 100 = 67.21%
  // bushwick2010.hispanic/bushwick2010.totalpop * 100 = 65.36%

  // non-Hispanic white population
  // sumPop(nyc2000.nhw)/sumPop(nyc2000.totalpop) * 100 = 35%
  // sumPop(nyc2010.nhw)/sumPop(nyc2010.totalpop) * 100 = 33%
  // bushwick2000.nhw / bushwick2000.totalpop * 100 = 3%
  // bushwick2010.nhw / bushwick2010.totalpop * 100 = 8.5%
  

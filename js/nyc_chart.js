(function(){
    var w = 500;
    var h = 100;
    var element = '#nyc-chart';

    var svg = d3.select(element).append('svg')
            .attr('width', w)
            .attr('height', h);

    var domains = {
        nyc2000: [0, 8008278],
        nyc2010: [0, 8175133],
        bushwick2000: [0, 104358],
        bushwick2010: [0, 112634]
    };

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

  function sum(memo, num) {
    return memo + num;
  }
  
  function sumPop(data) {
    return _.chain(data).values().reduce(sum).value();
  }

    
    //var nycScale = d3.scale.linear().range([0, h]).domain(domains.nyc2010);
    
    var scale = d3.scale.linear().range([0, h]).domain([0,2810000]);
    
    // hispanic in NYC
    //createRect(scale(stats2000.hispanic), 0);
    //createRect(scale(stats2010.hispanic), 25);
    // white in NYC
    //createRect(scale(stats2000.white), 60);
    //createRect(scale(stats2010.white), 85);

    function createRect(height, x) {
        console.log(height);
        svg.append('rect')
        .attr('clasx', 'chart-rect')
        .attr('x', x)
        .attr('y', yValue(height))
        .attr('width', 20)
        .attr('height', height);
        
    }

    function yValue(data) {
        return h - data;
    }
    
})();

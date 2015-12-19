'use strict';

d3.json('data/bushwick.json', function (err, bushwick){
  if (err) {return console.error(err);}
  // generated geojsons
  var bushwickCensus =  topojson.feature(bushwick, bushwick.objects.bushwick_census);
  var boroughs = topojson.feature(bushwick, bushwick.objects.boroughs);
  //var cd = topojson.feature(bushwick, bushwick.objects.cd);
  var roads = topojson.feature(bushwick, bushwick.objects.roads);
  var greenspace = topojson.feature(bushwick, bushwick.objects.greenspace);
  var parks =  topojson.feature(bushwick, bushwick.objects.parks);
  var water =  topojson.feature(bushwick, bushwick.objects.costal_water);

  var w = 700;
  var h = 700;  
  var svg = svgMaker(w,h, '#white-pop-map');

  var path = d3.geo.path()
        .projection(projection(w,h));

  boroRoadsWaterGreenspace(svg, path);
  
  var currentYear = '2000';
  
  //bushwick census
  var tracts = svg.selectAll('path.tracts')
        .data(bushwickCensus.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', 'white')
        .attr('fill-opacity', '0.8')
        .attr('fill', function(d){
          return whitePopScale(d.properties['nhwpct' + currentYear]);
        });
  //parks
  svg.append('path')
    .datum(parks)
    .attr('d', path)
    .attr('fill', '#4ca64c')
    .attr('fill-opacity', '0.9');
  
  var labels = svg.selectAll(".label")
        .data(bushwickCensus.features)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr("transform", function(d) {
          return "translate(" + projection(w,h)(d3.geo.centroid(d.geometry)) + ")"; })
        .text(LabelText(currentYear))
        .attr('text-anchor', 'middle')
        .attr('dy', '1em');
  
  var title = svg.append('text')
        .attr('class', 'title')
        .attr('x', '10')
        .attr('y', '30')
        .text('Pct of "Non-Hispanic Whites" in each Bushwick census tract');

  var toggleLocation = {
    x: '' + (w * 0.8),
    y: '' + (h * 0.15)
  };
  
  var toggle = svg.append('text')
        .attr('id', '#year-toggle')
        .attr('class', 'toggle') 
        .attr('x',toggleLocation.x)
        .attr('y', toggleLocation.y)
        .text(currentYear);
              
  var toggleInfo = svg.append('text')
        .attr('class', 'toggle-info')
        .attr('x',toggleLocation.x)
        .attr('y', toggleLocation.y)
        .attr('dy', '20')
        .attr('dx', '-20')
        .text('Click year to switch');

   toggle.on('click', function(){
      currentYear = (currentYear === '2010') ? '2000' : '2010';
      tracts
        .transition()
        .duration(500)
        .attr('fill', function(d){
          return whitePopScale(d.properties['nhwpct' + currentYear]);
        });
     labels.text(LabelText(currentYear));
     toggle.text(currentYear);
   });

  //returns svg object
function svgMaker(width, height, element) {
  return d3.select(element).append('svg')
    .attr('width', width)
    .attr('height', height);
}

//returns d3 projection
function projection(w,h){
  return d3.geo.mercator()
    .center([-73.920522,40.692649])
    .scale(700000)
    .translate([ w / 2, h / 2]);
}

 function whitePopScale(pct){ 
  var blues = ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'];
  if (pct < 3 ){
    return blues[0];
  } else if (pct < 5) {
    return blues[1];
  } else if (pct < 7) {
    return blues[2];
  } else if (pct < 9) {
    return blues[3];
  } else if (pct < 11) {
    return blues[4];
  } else {
    return blues[5];
  }
 }

function LabelText(year) {
  return function(d){
    return '' + d.properties['nhwpct' + year] + '%';
  };
}

function boroRoadsWaterGreenspace(svg, path) {
  // borough background
  svg.append('path')
    .datum(boroughs)
    .attr('d', path)
    .attr('fill','#ccebc5')
    .attr('fill-opacity', 0.8);
  //roads
  svg.append('path')
    .datum(roads)
    .attr('d', path)
    .attr('stroke', 'black')
    .attr('fill-opacity', '0')
    .attr('stroke-opacity', '0.2');
  //water
  svg.append('path')
    .datum(water)
    .attr('d', path)
    .attr('fill', '#B2B2FF');
  // greenspace
  svg.append('path')
    .datum(greenspace)
    .attr('d', path)
    .attr('fill', '#4ca64c')
    .attr('fill-opacity', '0.6');
}

// var b;
// d3.json('data/bushwick.json', function(err, bushwick){
//   b =  topojson.feature(bushwick, bushwick.objects.bushwick_census);
  //});
  
}); //end of d3.json   

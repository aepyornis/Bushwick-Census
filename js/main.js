d3.json('data/bushwick.json', function(err, bushwick){
  if (err) return console.error(err);
  
  var bushwickCensus =  topojson.feature(bushwick, bushwick.objects.bushwick_census);
  var boroughs = topojson.feature(bushwick, bushwick.objects.boroughs);
  var cd = topojson.feature(bushwick, bushwick.objects.cd);

  var w = 700;
  var h = 800;  
  var svg = svgMaker(w,h, '#white-pop-map');

  var path = d3.geo.path()
        .projection(projection(w,h));

  // borough background
  svg.append('path')
    .datum(boroughs)
    .attr('d', path)
    .attr('fill','#ccebc5')
    .attr('fill-opacity', 0.8);

  //bushwick census
  var tracts = svg.selectAll('path.tracts')
        .data(bushwickCensus.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', 'white')
        .attr('fill', function(d){
          return whitePopScale(d.properties.nhwpct2010);
        });

  var labels = svg.selectAll(".labels")
        .data(bushwickCensus.features)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr("transform", function(d) {
          return "translate(" + projection(w,h)(d3.geo.centroid(d.geometry)) + ")"; })
        .text(function(d){
          return '' + d.properties.nhwpct2010 + '%';
        })
        .attr('fill', 'black');
  
  var currentYear = '2010';
  
  d3.select('#white-pop-year-toggle')
    .on('click', function(){
      currentYear = (currentYear === '2010') ? '2000' : '2010';
      tracts
        .transition()
        .duration(500)
        .attr('fill', function(d){
          return whitePopScale(d.properties['nhwpct' + currentYear]);
        });
    });

}); //end of d3.json   

  //returns svg object
function svgMaker(width, height, element) {
  return d3.select(element).append('svg')
    .attr('width', width)
    .attr('height', height);
}

//returns d3 projection
function projection(w,h){
  return d3.geo.mercator()
    .center([-73.921422,40.696649])
    .scale(500000)
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

var b;
d3.json('data/bushwick.json', function(err, bushwick){
  b =  topojson.feature(bushwick, bushwick.objects.bushwick_census);
});

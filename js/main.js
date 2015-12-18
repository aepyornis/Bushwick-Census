d3.json('data/bushwick.json', function(err, bushwick){
  if (err) return console.error(err);
  
  var bushwickCensus = topojson.feature(bushwick, bushwick.objects.bushwick_census);
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
  svg.selectAll('path')
    .data(bushwickCensus.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('stroke', 'white')
    .attr('fill', function(d){
      return 'blue';
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

d3.json('data/bushwick.json', function(err, bushwick){
  if (err) return console.error(err);

  var bushwickCensus = topojson.feature(bushwick, bushwick.objects.bushwick_census);
  
  var w = 700;
  var h = 800;  
  var svg = svgMaker(w,h);

  var path = d3.geo.path()
        .projection(projection(w,h));
  
  svg.append('path')
    .datum(bushwickCensus)
    .attr('d', path);
  
});


//returns svg object
function svgMaker(width, height) {
  return d3.select('body').append('svg')
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

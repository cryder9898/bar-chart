const dataURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const svg = d3.select('svg');

function render(data) {
  console.log(data);
  // bind data
  let circles = svg.selectAll('circles').data(data);
  // enter
  circles.enter().append('circle')
    .attr('r', 10);
  // update
  circles
    .attr('cx', function(d) {return d})
    .attr('cy', function(d) {return d});
  // exit
  circles.exit().remove();
}

d3.json(dataURL, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data.data);
    render(data.data);
  }
});

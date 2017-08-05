const dataURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Set the dimensions of the canvas / graph
const w = 600,
h = 300;

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%Y-%m-%d");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom(x).ticks(10);

var yAxis = d3.axisLeft(y).ticks(10);

// Define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.gdp); });

// Adds the svg canvas
var svg = d3.select("svg")
  .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json(dataURL, function(error, data) {
    data = data.data.map(function(d) {
        let obj = {};
        obj.date = parseDate(d[0]);
        obj.gdp = +d[1];
        return obj;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.gdp; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

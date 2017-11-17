const initScatterPlot = function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  /* 
   * value accessor - returns the value to encode for a given data object.
   * scale - maps value to a visual display encoding, such as a pixel position.
   * map function - maps from data value to display value
   * axis - sets up axis
   */ 
  
  // setup x 
  var xValue = function(d) { return d.time;}, // data -> value
      xScale = d3.time.scale().range([0, width]), // value -> display
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(7);
  
  // setup y
  var yValue = function(d) { return d.perf_idx;}, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) { return yScale(yValue(d));}, // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");
  
  // setup fill color
  var cValue = function(d) { return d.Manufacturer;},
      color = d3.scale.category10();
  
  // add the graph canvas to the body of the webpage
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // load data
  d3.json("js/data.json", function(error, data) {
  
    // change string (from CSV) into number format
    data.forEach(function(d) {
      d["perf_idx"] = 1 - parseFloat(d["perf_idx"]);
      d["time"] = new Date(d["time"]);
console.log(d.time)
    });
  
    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain(d3.extent(data, d => d.time));
    yScale.domain([0, 1]);
  
    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Date");
  
    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("val error");
  
    // draw dots
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color(cValue(d));});
  });
};

window.addEventListener('DOMContentLoaded', initScatterPlot);

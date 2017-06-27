/* global d3 */

function streamGraph() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 600,
    height = 120,
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    catValue = function (d) { d[1]; },
    xValue = function (d) { d[0]; },
    yValue = function (d) { d[2]; },
    xScale = d3.scaleLinear(),
    yScale = d3.scaleLinear(),
    stack = d3.stack().offset(d3.stackOffsetWiggle);

  function chart(selection) {
    selection.each(function (data) {

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g");

      stack.keys(catValue);

      xScale
          .domain([0, m - 1])
          .range([0, width]);

      yScale
          .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
          .range([height, 0]);

      var z = d3.interpolateCool;

      var area = d3.area()
          .x(X)
          .y0(function(d) { return yScale(d[0]); })
          .y1(function(d) { return yScale(d[1]); });

      svg.selectAll("path")
        .data(layers0)
        .enter().append("path")
          .attr("d", area)
          .attr("fill", function() { return z(Math.random()); });

      function stackMax(layer) {
        return d3.max(layer, function(d) { return d[1]; });
      }

      function stackMin(layer) {
        return d3.min(layer, function(d) { return d[0]; });
      }

      // // Inspired by Lee Byron’s test data generator.
      // function bumps(n, m) {
      //   var a = [], i;
      //   for (i = 0; i < n; ++i) a[i] = 0;
      //   for (i = 0; i < m; ++i) bump(a, n);
      //   return a;
      // }

      // function bump(a, n) {
      //   var x = 1 / (0.1 + Math.random()),
      //       y = 2 * Math.random() - 0.5,
      //       z = 10 / (0.1 + Math.random());
      //   for (var i = 0; i < n; i++) {
      //     var w = (i / n - y) * z;
      //     a[i] += x * Math.exp(-w * w);
      //   }
      // }




    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(xValue(d));
  }

  return chart;
}


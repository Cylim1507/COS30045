function init() {

    var w = 600;
    var h = 300;
    var padding = 50;

    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        dataset = data;

        console.table(dataset, ["date", "number"]);

        lineChart(dataset);
    });

    function lineChart(dataset) {
        // Create scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([h - padding, padding]);

        // Define the line generator
        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });

        // Append the SVG element
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Append the path for the line chart
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);

        // Add x-axis
        var xAxis = d3.axisBottom(xScale).ticks(10);
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        // Add y-axis
        var yAxis = d3.axisLeft(yScale).ticks(5);
        svg.append("g")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

        // Add reference line at 500,000
        svg.append("line")
            .attr("class", "halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000))
            .attr("stroke", "red")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");

        // Add label for the reference line
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("font-size", "12px")
            .attr("fill", "red");

        // Define the area generator
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(yScale(0))  // Base line for the area shape
            .y1(function(d) { return yScale(d.number); });

        // Append the area shape
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "black")
            .attr("opacity", 0.5);
    }
}

window.onload = init;

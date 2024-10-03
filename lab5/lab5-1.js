// Set up dimensions and padding for the chart
var w = 500; // Width of the SVG
var h = 130; // Height of the SVG
var barpadding = 2; // Padding between bars
var maxValue = 25; // Maximum value for data scaling

// Sample dataset
var dataset = [14, 5, 26, 23, 9, 10, 15, 27];

// Create xScale for the bars
var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length)) // Create a range based on the dataset length
                .rangeRound([0, w]) // Map to the width of the SVG
                .paddingInner(0.05); // Padding between bars

// Create yScale for the chart
var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)]) // Set domain from 0 to max value in dataset
                .range([h, 0]); // Invert range for y-axis

// Append SVG to the body
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "rgb(106, 90, 205)");

// Bind data to rectangles (bars) in the SVG
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i); // Set x position based on index
    })
    .attr("y", function(d) {
        return yScale(d); // Set y position based on data value
    })
    .attr("width", xScale.bandwidth()) // Set width of bars
    .attr("height", function(d) {
        return h - yScale(d); // Set height of bars based on data value
    });

// Bind the updateData function to the button click event
d3.select("#updateButton").on("click", function() {
    // Generate new random data
    var numValues = dataset.length; // Keep the same number of bars
    dataset = []; // Clear the existing dataset
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue); // Generate random value
        dataset.push(newNumber); // Add to the dataset
    }

    // Update the yScale domain based on new data
    yScale.domain([0, d3.max(dataset)]);

    // Select all rectangles and bind new data
    var bars = svg.selectAll("rect")
        .data(dataset);

    // Update existing bars
    bars
        .attr("y", function(d) {
            return yScale(d); // Update y position
        })
        .attr("height", function(d) {
            return h - yScale(d); // Update height
        });

    // Enter new bars if necessary
    bars.enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i); // Set x position for new bars
        })
        .attr("y", function(d) {
            return yScale(d); // Set y position for new bars
        })
        .attr("width", xScale.bandwidth()) // Set width of new bars
        .attr("height", function(d) {
            return h - yScale(d); // Set height of new bars
        });

    // Remove bars if the dataset is smaller
    bars.exit().remove(); // Remove any bars that are no longer needed
});

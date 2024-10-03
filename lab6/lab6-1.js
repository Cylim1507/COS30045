var w = 500;
        var h = 130;
        var barpadding = 2;
        var maxValue = 25;

        var dataset = [14, 5, 26, 23, 9, 10, 15, 27];

        var xScale = d3.scaleBand()
                        .domain(d3.range(dataset.length))
                        .rangeRound([0, w])
                        .paddingInner(0.05);
        
        var yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset)])
                        .range([h, 0]);

        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        // Function to render the bars and bind data
        function renderBars() {
            // Select existing bars
            var bars = svg.selectAll("rect")
                          .data(dataset);

            // Enter new bars
            var barsEnter = bars.enter()
                                .append("rect")
                                .attr("x", w)  // Start off-screen on the right
                                .attr("y", function(d) {
                                    return yScale(d);
                                })
                                .attr("width", xScale.bandwidth())
                                .attr("height", function(d) {
                                    return h - yScale(d);
                                })
                                .attr("fill", "rgb(106, 90, 205)");  // Set initial bar color

            // Merge the enter selection with the update selection
            barsEnter.merge(bars)
                    .transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        return yScale(d);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return h - yScale(d);
                    });

            // Remove exit bars (if there are any)
            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();

            // Remove old text labels
            svg.selectAll("text").remove();

            // Add event listeners to both new and existing bars
            barsEnter.merge(bars)
                    .on("mouseover", function(event, d) {
                        d3.select(this)
                          .transition()
                          .duration(200)
                          .attr("fill", "orange");

                        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2; // Center horizontally
                        var yPosition = yScale(d) + 15; // Position above the bar

                        // Append text when hovering
                        svg.append("text")
                            .attr("id", "tooltip")
                            .attr("x", xPosition) // Use the variable directly
                            .attr("y", yPosition) // Use the variable directly
                            .attr("text-anchor", "middle") // Center the text
                            .attr("fill", "black")
                            .text(d);
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip").remove();
                        d3.select(this)
                          .transition()
                          .duration(500)
                          .attr("fill", "rgb(106, 90, 205)");
                    });
        }
            
        // Initial render
        renderBars();

        // Add new bars when "Add" button is clicked
        d3.select("#add").on("click", function() {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);

            // Update xScale domain with the new dataset length
            xScale.domain(d3.range(dataset.length));

            // Render bars
            renderBars();
        });

        // Remove bars when "Remove" button is clicked
        d3.select("#remove").on("click", function() {
            if (dataset.length > 0) {
                dataset.pop();  // Remove the last element from the dataset

                // Update xScale domain with the new dataset length
                xScale.domain(d3.range(dataset.length));

                // Render bars
                renderBars();
            }
        });
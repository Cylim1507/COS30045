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
						.attr("height", h)
						.attr("fill", "rgb(106, 90, 205)");

			svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d){
					return yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d){
					return h - yScale(d);
				});

			// Add new bars when "Add" button is clicked
			d3.select("#add").on("click", function() {
				var newNumber = Math.floor(Math.random() * maxValue);
				dataset.push(newNumber);

				// Update xScale domain with the new dataset length
				xScale.domain(d3.range(dataset.length));

				var bars = svg.selectAll("rect")
								.data(dataset);

				// Append new bars
				bars.enter()
					.append("rect")
					.attr("x", w)  // Start off-screen on the right
					.attr("y", function(d) {
						return yScale(d);
					})
					.attr("width", xScale.bandwidth())
					.attr("height", function(d) {
						return h - yScale(d);
					})
					.merge(bars)
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
			});

			// Add new bars when "Add" button is clicked
			d3.select("#remove").on("click", function() {

				if (dataset.length > 0) {
					dataset.pop();  // Remove the last element from the dataset

					// Update xScale domain with the new dataset length
					xScale.domain(d3.range(dataset.length));

					// Select all rectangles and bind new data
					var bars = svg.selectAll("rect")
								.data(dataset);

					// Remove the last bar
					bars.exit()
						.transition()
						.duration(500)
						.attr("x", w)  // Move it off-screen before removing
						.remove();

					// Update the remaining bars
					bars.transition()
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
				}
				

			});
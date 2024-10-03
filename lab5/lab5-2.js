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

			// Update Data Button - updates bars with new random data
			d3.select("#updateButton").on("click", function() {
				// Generate new random data
				var numValues = dataset.length;
				dataset = [];
				for (var i = 0; i < numValues; i++) {
					var newNumber = Math.floor(Math.random() * maxValue);
					dataset.push(newNumber);
				}

				// Update the yScale domain
				yScale.domain([0, d3.max(dataset)]);

				// Select all rectangles and bind new data
				svg.selectAll("rect")
					.data(dataset)
					.transition()
					.duration(2000)
					.attr("y", function(d) {
						return yScale(d);
					})
					.attr("height", function(d) {
						return h - yScale(d);
					});
			});

			// Transition 1 Button - example: fade out and in bars
			d3.select("#transition3").on("click", function() {
				svg.selectAll("rect")
					.transition()
					.duration(1000)
					.style("opacity", 0)  // Fade out
					.transition()
					.duration(1000)
					.style("opacity", 1);  // Fade back in
			});

			// Transition 3 Button - oscillate width of bars
			d3.select("#transition4").on("click", function() {
				svg.selectAll("rect")
					.transition()
					.duration(1000)
					.attr("width", xScale.bandwidth() * 1.5)  // Increase bar width
					.transition()
					.duration(1000)
					.attr("width", xScale.bandwidth());  // Restore original width
			});

			// Transition 2 Button - bars update with easing
			d3.select("#transition1").on("click", function() {
				// Generate new random data
				var numValues = dataset.length;
				dataset = [];
				for (var i = 0; i < numValues; i++) {
					var newNumber = Math.floor(Math.random() * maxValue);
					dataset.push(newNumber);
				}

				// Update the yScale domain
				yScale.domain([0, d3.max(dataset)]);

				// Select all rectangles and bind new data
				svg.selectAll("rect")
					.data(dataset)
					.transition()
					.delay(function(d, i){
						return i/dataset.length * 100;
					})
					.duration(1000)
					.ease(d3.easeCubicInOut)  // Correct easing function
					.attr("y", function(d) {
						return yScale(d);
					})
					.attr("height", function(d) {
						return h - yScale(d);
					});
			});
		
			// Transition 2 Button - bars update with easing
			d3.select("#transition2").on("click", function() {
				// Generate new random data
				var numValues = dataset.length;
				dataset = [];
				for (var i = 0; i < numValues; i++) {
					var newNumber = Math.floor(Math.random() * maxValue);
					dataset.push(newNumber);
				}

				// Update the yScale domain
				yScale.domain([0, d3.max(dataset)]);

				// Select all rectangles and bind new data
				svg.selectAll("rect")
					.data(dataset)
					.transition()
					.delay(function(d, i){
						return i/dataset.length * 200;
					})
					.duration(2000)
					.ease(d3.easeCircleIn)  // Correct easing function
					.attr("y", function(d) {
						return yScale(d);
					})
					.attr("height", function(d) {
						return h - yScale(d);
					});
			});
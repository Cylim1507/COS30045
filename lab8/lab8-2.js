function init() {
    var w = 500;
    var h = 300;

    var color = d3.scaleQuantize()
        .range([
            "rgb(242, 240, 247)", 
            "rgb(203, 201, 226)", 
            "rgb(158, 154, 200)", 
            "rgb(117, 107, 177)", 
            "rgb(84, 39, 143)"
        ]);

    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);

    var path = d3.geoPath().projection(projection);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Use Promise.all to load all required data simultaneously
    Promise.all([
        d3.csv("VIC_LGA_unemployment.csv"),
        d3.json("LGA_VIC.json"),
        d3.csv("VIC_city.csv")
    ]).then(function([unemploymentData, geoJsonData, cityData]) {
        // Process unemployment data
        unemploymentData.forEach(d => {
            d.LGA = d.LGA.trim(); // Clean LGA names
            d.unemployed = +d.unemployed; // Convert to number
        });

        // Set the color domain based on unemployment values
        color.domain([
            d3.min(unemploymentData, d => d.unemployed),
            d3.max(unemploymentData, d => d.unemployed)
        ]);

        // Merge unemployment data with GeoJSON features
        var dataByLGA = {};
        unemploymentData.forEach(d => {
            dataByLGA[d.LGA] = d.unemployed;
        });

        geoJsonData.features.forEach(feature => {
            var lgaName = feature.properties.LGA_name;
            feature.properties.value = dataByLGA[lgaName] || 0; // Default to 0 if no match
        });

        // Draw the map with color fill based on unemployment data
        svg.selectAll("path")
            .data(geoJsonData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", d => {
                var value = d.properties.value;
                return value ? color(value) : "#ccc"; // Fallback color for missing data
            });

        // Plot cities as circles on the map
        svg.selectAll("circle")
            .data(cityData)
            .enter()
            .append("circle")
            .attr("cx", d => projection([+d.lon, +d.lat])[0])
            .attr("cy", d => projection([+d.lon, +d.lat])[1])
            .attr("r", 6)
            .attr("fill", "red")
            .append("title") // Tooltip with city name
            .text(d => d.place);
    }).catch(error => {
        console.error("Error loading data:", error);
    });
}

// Initialize the map when the window loads
window.onload = init;

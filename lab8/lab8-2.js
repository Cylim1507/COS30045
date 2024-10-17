function init() {

    var w = 500;
    var h = 300;

    var color = d3.scaleQuantize()
                    .range(["rgb(242, 240, 247)", 
                            "rgb(203, 201, 226)", 
                            "rgb(158, 154, 200)", 
                            "rgb(117, 107, 177)", 
                            "rgb(84, 39, 143)"]);
                            
    d3.csv("VIC_LGA_unemployment.csv", function(d) {
        return {
            LGA: d.LGA, 
            unemployed: +d.unemployed // Convert unemployed to a number
        };
    }).then(function(data) {
        console.log(data); // Check if the data is correctly loaded
    
        // Example: You can now bind this data to D3 elements as needed
        data.forEach(function(d) {
            console.log(`LGA: ${d.LGA}, Unemployed: ${d.unemployed}`);
        });

        var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2, h/2])
                        .scale(2450);

        var path = d3.geoPath()
                        .projection(projection);

        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("fill", color);
                    
        d3.json("LGA_VIC.json"), function(json){
            for(var i = 0; i<DataTransfer.length;i++)
            {
                var database = data[i].LGS;
                var dataValue = parseFloat(data[i].value);
                for (var j = 0; j<json.features.length; j++){
                    var jsonState = json.features[j].properties.name;
                    if (dataState = jsonState){
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }

            }
        };
    });   

}

window.onload = init;

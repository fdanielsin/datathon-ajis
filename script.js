var infoComplementaire = {
    // ======= TODO =======
    CREUSE: {
        percent: "50",
        motif: "FOOO"
    },
    // ====================
}

var width = 550,
    height = 550;

var path = d3.geoPath();

var projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2600)
    .translate([width / 2, height / 2]);

path.projection(projection);

var svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

var deps = svg.append("g");

var tooltip = $("#tooltip");

d3.json('./departments.json', function (req, geojson) {
    deps.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("class", "department")
        .attr("d", path)
        .on("mouseover", function (d) {
            $(this).attr("NOM_DEPT", d.properties.NOM_DEPT);
            $(this).attr("NOM_REGION", d.properties.NOM_DEPT);
            var p = infoComplementaire[d.properties.NOM_DEPT];
            tooltip.html("Département : " + d.properties.NOM_DEPT + "<br />" +
                    "Région : " + d.properties.NOM_REGION + "<br />" +
                    (p ? (
                        // ======= TODO =======
                        p.percent + "% des aidant sont " + p.motif
                        // ====================
                    ) : ""));
            });
});



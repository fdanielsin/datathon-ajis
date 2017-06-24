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

var infoComplementaire = [];
d3.json('./data.json', function (req, data) {
  data.forEach(function (d) {
    infoComplementaire[d["Département"].toUpperCase()] = d;
  });
});

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
                      "<ul><li>Département: " + p["Département"] + "</li>" +
                      "<li>Demande aide financière sur SAP: " + p["Demande aide financière sur SAP"] + "</li>" +
                      "<li>Demande informative sur SAP-CESU: " + p["Demande informative sur SAP-CESU"] + "</li>" +
                      "<li>Demande financière situation d'aidant: " + p["Demande financière situation d'aidant"] + "</li>" +
                      "<li>Demande d'information situation d'aidant: " + p["Demande d'information situation d'aidant"] + "</li>" +
                      "<li>Service Diag Conseil: " + p["Service Diag Conseil"] + "</li>" +
                      "<li>Assistance immobilisation-Hospitalisation: " + p["Assistance immobilisation-Hospitalisation"] + "</li>" +
                      "<li>Hébergement spécialisé -dde financière: " + p["Hébergement spécialisé -dde financière"] + "</li>" +
                      "<li>Hébergement spécialisé -dde information: " + p["Hébergement spécialisé -dde information"] + "</li>" +
                      "<li>Aménagement du logement (dde financière + info): " + p["Aménagement du logement (dde financière + info)"] + "</li>" +
                      "<li>Demande financière frais de santé: " + p["Demande financière frais de santé"] + "</li>" +
                      "<li>TA besoin financier: " + p["TA besoin financier"] + "</li>" +
                      "<li>TA besoin d'info: " + p["TA besoin d'info"] + "</li>" +
                      "<li>Besoin de Parler: " + p["Besoin de Parler"] + "</li>" +
                      "<li>Hébergement temporaire: " + p["Hébergement temporaire"] + "</li></ul>"
                    ) : ""));
            });
});

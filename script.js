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

var magic = function(x) {
  return 10 + 2 * (parseInt(x) || 0);
}

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
        "Région : " + d.properties.NOM_REGION + "<hr />" +
        "<ul>" +
          "<li style=\"font-size: " + magic(p["Demande aide financière sur SAP"]) + "px\">Demande aide financière sur SAP</li>" +
          "<li style=\"font-size: " + magic(p["Demande informative sur SAP-CESU"]) + "px\">Demande informative sur SAP-CESU</li>" +
          "<li style=\"font-size: " + magic(p["Demande financière situation d'aidant"]) + "px\">Demande financière situation d'aidant</li>" +
          "<li style=\"font-size: " + magic(p["Demande d'information situation d'aidant"]) + "px\">Demande d'information situation d'aidant</li>" +
          "<li style=\"font-size: " + magic(p["Service Diag Conseil"]) + "px\">Service Diag Conseil</li>" +
          "<li style=\"font-size: " + magic(p["Assistance immobilisation-Hospitalisation"]) + "px\">Assistance immobilisation-Hospitalisation</li>" +
          "<li style=\"font-size: " + magic(p["Hébergement spécialisé -dde financière"]) + "px\">Hébergement spécialisé -dde financière</li>" +
          "<li style=\"font-size: " + magic(p["Hébergement spécialisé -dde information"]) + "px\">Hébergement spécialisé -dde information</li>" +
          "<li style=\"font-size: " + magic(p["Aménagement du logement (dde financière + info)"]) + "px\">Aménagement du logement (dde financière + info)</li>" +
          "<li style=\"font-size: " + magic(p["Demande financière frais de santé"]) + "px\">Demande financière frais de santé</li>" +
          "<li style=\"font-size: " + magic(p["TA besoin financier"]) + "px\">TA besoin financier</li>" +
          "<li style=\"font-size: " + magic(p["TA besoin d'info"]) + "px\">TA besoin d'info</li>" +
          "<li style=\"font-size: " + magic(p["Besoin de Parler"]) + "px\">Besoin de Parler</li>" +
          "<li style=\"font-size: " + magic(p["Hébergement temporaire"]) + "px\">Hébergement temporaire</li>" +
        "</ul>");
      });
});

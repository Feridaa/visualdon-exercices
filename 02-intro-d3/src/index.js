import { select, selection } from "d3-selection";

// C'est ici que vous allez écrire les premières lignes avec d3.js!

// Créez 3 cercles de 40px de rayon et placez-les respectivement à : (50,50), (150,150), (250,250)

//******************************************************* */
//*********ON DEFINIT LES ZONES D'AFFICHAGE ************* */
//******************************************************* */

// Append svg
select("body").append("div").attr("class", "monSVG");

const WIDTH = 500;
const HEIGHT = 500;

// création SVG
const monSVG = select(".monSVG")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

//******************************************************* */

// Définition des groupes

const groupe1 = monSVG.append("g");
const groupe2 = monSVG.append("g");
const groupe3 = monSVG.append("g");

// Crééer 3 cercle et Rajoutez du texte en dessous de chaque cercle
groupe1
  .append("circle")
  .attr("cx", "50")
  .attr("cy", "50")
  .attr("r", "40")
  .attr("id", "firstCircle");

groupe1.append("text").text("1").attr("x", "40").attr("y", "120");

groupe2
  .append("circle")
  .attr("cx", "150")
  .attr("cy", "150")
  .attr("r", "40")
  .attr("id", "secondCircle");

groupe2.append("text").text("2").attr("x", "130").attr("y", "230");

groupe3
  .append("circle")
  .attr("cx", "250")
  .attr("cy", "250")
  .attr("r", "40")
  .attr("id", "thirdCircle");

groupe3.append("text").text("3").attr("x", "240").attr("y", "330");

// Changez la couleur du deuxième cercle

const cercle2 = select("#secondCircle").attr("fill", "red");

// //************************** DEUXIEME MANIERE - Pour changer la couleur, on peut faire aussi faire SANS STOCKER DANS UNE VARIABLE :

groupe2.select("circle").attr("fill", "red");

// Déplacez de 50px vers la droite le premier et le deuxième cercle, FACON DE LA PROF

const cercle1 = select("#firstCircle");
cercle1.attr("cx", "100");
cercle2.attr("cx", "200");

// //************************** DEUXIEME MANIERE de déplacer de 50px - SANS STOCKER DANS UNE VARIABLE

groupe1.select("circle").attr("cx", "100");
groupe2.select("circle").attr("cx", "200");

// Déplacer les cercles on click
const cercle3 = select("#thirdCircle");

cercle3.on("click", function () {
  cercle1.attr("cx", "400");
  cercle2.attr("cx", "400");
  cercle3.attr("cx", "400");
});

//************************** DEUXIEME MANIERE de déplacer SANS STOCKER DANS UNE VARIABLE ON CLICK

groupe3.select("circle").on("click", function () {
  groupe1.select("circle").attr("cx", "400");
  groupe2.select("circle").attr("cx", "400");
  groupe3.select("circle").attr("cx", "400");
});

// *******************************************************************************************************************************************************
// ************************************************* EXERCICE AVEC LES BARRE : Barchart - Création graph *************************************************
// *******************************************************************************************************************************************************

//******************************************************* */
//*********ON DEFINIT LES ZONES D'AFFICHAGE ************* */
//******************************************************* */

// on seléctionne notre body dans lequel on va ajouter une div qui contient une classe qui s'appelle monGraph
select("body").append("div").attr("class", "monGraph");

// dans notre classe on créer une zone SVG dans laquel on va mettre nos graphs et on donne à la zone une hauteur et une largeur
const monGraph = select(".monGraph")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

// On stock nos données dans un tableau
const mesDonnees = [20, 5, 25, 8, 15];

// ici on lui dit de seléctionner tout les rectangle qui vont être créé avec les données du tableau
monGraph
  .selectAll("rect")
  .data(mesDonnees)
  // vu que ce sont de nouvelles données, on utilise enter pour les ajouter, si c'était des modification on va utiliser update
  .join((enter) =>
    enter
      .append("rect")

      // Sur l'horizontale (X) on va créer une "marque" en faisant un espace de *30 entre chaque.
      // on est obligé de mettre deux arguments, la premier correspond à la donnée (d)
      // le second à l'index (i).

      .attr("x", (donnee, index) => index * 30)

      // On se met à 500 sur l'axe Y (donc en bas) et on soustrait la valeur de la donnée
      // pour bien se positionner.

      .attr("y", (donnee, i) => 500 - donnee)

      // Définit la largeur de 20
      .attr("width", 20)

      // on dessine le rectangle en fonction de la donnée du tab

      .attr("height", (donnee) => donnee)
      .attr("stroke", "black")
      .attr("fill", "black")
  );

import { json } from "d3-fetch";
import { select, selectAll } from "d3-selection";
import { max } from "d3-array";

// on stock les deux URL de l'api dans des variables
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const userUrl = "https://jsonplaceholder.typicode.com/users";

// Vu qu'il y a deux API on va utiliser promise.all,
// Promise.all va nous retrouner un tableau avec deux tableau

// On redirige le premier tableau dans posts et le second dans users
Promise.all([json(postsUrl), json(userUrl)]).then(([posts, users]) => {
  //.
  //*********************************************************************************************************************
  // ****************************************** 1. Création d'un nouvel objet mix de nos deux API ***********************
  //                                                      FILTRAGE DE DONNEES
  //*********************************************************************************************************************

  // La fonction .map() est une méthode qui permet de créer un nouveau tableau
  // en appliquant une fonction de transformation à chaque élément du tableau initial
  let tabUsersPosts = users.map((usr) => {
    // on filtre le tableau posts en affichant uniquement les posts qui ont un id
    // qui correspond au id du user et on stock dans la constante postsFilter
    let TabpostsFiltrer = posts.filter((post) => post.userId === usr.id);

    // on crée un nouvel objet qui combine ce qui nous interesse
    let nouvelObjet = {
      nomUtilisateur: usr.name,
      ville: usr.address.city,

      // sur la base du tableau postsFiltrer, on refaire un filtrer ou on veut juste selectionner les titres des posts
      titresPosts: TabpostsFiltrer.map((post) => post.title),
    };
    return nouvelObjet;
  });

  console.log("Nouvel objet", tabUsersPosts);

  //*********************************************************************************************************************
  // ******************************************   2. Nombre de posts par user *******************************************
  //                                                  FILTRAGE DE DONNEES
  //*********************************************************************************************************************

  let result2 = users.map((usr) => {
    let posts_filtered = posts.filter((post) => post.userId === usr.id);
    let new_object = {
      userId: usr.id,
      userName: usr.name,
      nPosts: posts_filtered.length,
    };
    return new_object;
  });

  const container = select("body").append("div");

  container
    .selectAll("p")
    .data(result2)
    .enter()
    .append("p")
    .text((d) => "User " + d.userId + ": " + d.nPosts);

  console.log("Nombre de posts par user", result2);

  //*********************************************************************************************************************
  // ******************************************   3. USER AVEC LES TEXT LE PLUS LONG ************************************
  //                                                       FILTRAGE DE DONNEES
  //*********************************************************************************************************************

  let body_length = users.map((usr) => {
    let posts_filtered = posts.filter((post) => post.userId === usr.id);
    let new_object = {
      userId: usr.id,
      body_length: max(posts_filtered.map((post) => post.body.length)),
    };
    return new_object;
  });

  let result3 = body_length.filter(
    (d) => d.body_length === max(body_length.map((d2) => d2.body_length))
  );

  console.log("User qui a écrit le texte le plus long", result3);

  const container2 = select("body").append("div");

  container2
    .selectAll("p")
    .data(result3)
    .join((enter) =>
      enter.append("p").text((d) => "User " + d.userId + ": " + d.body_length)
    );

  //*********************************************************************************************************************
  // ******************************************   4. CREATION DU GRAPH **************************************************
  //*********************************************************************************************************************

  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 0.6 * window.innerWidth - margin.left - margin.right,
    height = 0.7 * window.innerHeight - margin.top - margin.bottom;

  const figure = select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height + 80);

  figure
    .selectAll("rect")
    .data(result2)
    .join((enter) =>
      enter
        .append("rect")
        .attr("width", 30)
        .attr("height", (d) => height - d.nPosts)
        .attr("x", (d, i) => i * 50)
        .attr("y", (d) => d.nPosts)
        .attr("fill", "black")
    );

  figure
    .selectAll("text")
    .data(result2)
    .join((enter) =>
      enter
        .append("text")
        .attr("x", (d, i) => i * 50)
        .attr("y", (d) => height + 20)
        .text((d) => d.userId)
    );
});

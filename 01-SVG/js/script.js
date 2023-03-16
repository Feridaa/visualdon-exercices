// click

const rectangle = document.querySelector("#rectangle");

rectangle.addEventListener("click", function () {
  if (rectangle.getAttribute("fill") === "red") {
    rectangle.setAttribute("fill", "blue ");
  } else {
    rectangle.setAttribute("fill", "red");
  }
});

// over

const donut = document.querySelector("#donut");

donut.addEventListener("mouseover", function (e) {
  donut.setAttribute("r", "100");
});

donut.addEventListener("mouseout", function (e) {
  donut.setAttribute("r", "60");
});

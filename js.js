var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var HALF_WIDTH = width/2;
var HALF_HEIGHT = height/2;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var planet_one = new Sphere(0, 0, 0, 50);
planet_one.makePoints();
planet_one.rotate(0.002, 0.005, 0.001);

var planet_two = new Sphere(0, 0, 0, 25);
planet_two.makePoints();
planet_two.rotate(0.003, 0.001, 0.008);

var cube = new Cube(HALF_WIDTH, 0, 0, 120);
cube.makePoints();
cube.rotate(0.001, 0.002, 0.002);

var octoPrism = new Prism(HALF_WIDTH/2, 0, 0, 50, 8, 12);
octoPrism.makePoints();
octoPrism.rotate(0.0018, 0.06, 0.001);

function draw() {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, width, height);

    planet_one.drawLines(context, 250);
    planet_two.drawLines(context, 250);
    //cube.drawPoints(context, 200);
    cube.drawLines(context, 250);
    octoPrism.drawLines(context, 250);

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

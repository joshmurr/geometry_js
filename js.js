var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var HALF_WIDTH = width/2;
var HALF_HEIGHT = height/2;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var sphere = new Sphere(0, 0, 0, 50);
sphere.makePoints();
sphere.rotate(0.002, 0.005, 0.001);

var cube = new Cube(HALF_WIDTH, 0, 0, 120);
cube.makePoints();
cube.rotate(0.001, 0.002, 0.002);

var octoPrism = new Prism(HALF_WIDTH/2, 0, 0, 50, 8, 12);
octoPrism.makePoints();
octoPrism.rotate(0.0018, 0.06, 0.001);

var klein = new Klein(HALF_WIDTH/2, 0, 0);
klein.makePoints();
klein.scale(20);
klein.rotate(0.005, 0.005, 0.005);

var torus = new Torus(HALF_WIDTH, 0, 0, 5, 3);
torus.makePoints();
torus.scale(20);
torus.rotate(0.005, 0.005, 0.005);

var torusPoints = torus.points;
var kleinPoints = klein.points;
var doAnimatePoints = false;

function draw() {
    // LINES
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, width, height);
    klein.drawLines(context, 250);
    torus.drawLines(context, 250);

    if(doAnimatePoints) torus.animateTo(kleinPoints);


    requestAnimationFrame(draw);
}

function animatePoints(){
    doAnimatePoints = true;
}


requestAnimationFrame(draw);

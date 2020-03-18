var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var HALF_WIDTH = width/2;
var HALF_HEIGHT = height/2;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var sphere = new Sphere(0, 300, 0, 50);
sphere.makePoints();
sphere.rotate(0.005, 0.005, 0.005);

var klein = new Klein(HALF_WIDTH, 0, 0);
klein.makePoints();
klein.scale = 20;
klein.rotate(0.005, 0.005, 0.005);

var torus = new Torus(HALF_WIDTH/2, 0, 0, 5, 3);
torus.makePoints();
torus.scale = 20;
torus.rotate(0.005, 0.005, 0.005);

var torus2 = new Torus(0, 0, 0, 5, 3);
torus2.makePoints();
torus2.scale = 20;
torus2.rotate(0.005, 0.005, 0.005);

var torusPoints = torus2.points;
var kleinPoints = klein.points;
var spherePoints = sphere.points;

var p = [torusPoints, kleinPoints, spherePoints];
var counter = 0;

var doAnimatePoints = false;

var startTime = new Date();

function draw() {
    let time = new Date();
    let elapsedTime = (time - startTime) / 1000;

    // LINES
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, width, height);

    let v = Math.sin(Math.cos(elapsedTime))*0.01;

    klein.update();
    torus.update();
    torus2.update();
    sphere.update();

    klein.drawPoints(context, 250);
    torus.drawPoints(context, 250);
    torus2.drawPoints(context, 250);
    sphere.drawPoints(context, 250);

    if(counter) torus.animateTo(p[counter%3]);


    requestAnimationFrame(draw);
}

function animatePoints(){
    counter++;
}


requestAnimationFrame(draw);

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
sphere.makeFaces();
sphere.rotate(0.005, 0.005, 0.005);

var klein = new Klein(HALF_WIDTH, 0, 0);
klein.makePoints();
klein.makeFaces();
klein.scale = 20;
klein.rotate(0.005, 0.005, 0.005);

var torus = new Torus(HALF_WIDTH/2, 0, 0, 5, 3);
torus.makePoints();
torus.makeFaces();
torus.scale = 20;
torus.rotate(0.005, 0.005, 0.005);

var astroidalEllipsoid = new AstroidalEllipsoid(0, 0, 0);
astroidalEllipsoid.makePoints();
astroidalEllipsoid.makeFaces();
astroidalEllipsoid.rotate(0.005, 0.005, 0.005);

var boysSurface = new BoysSurface(0, 0, 0);
boysSurface.makePoints();
boysSurface.makeFaces();
boysSurface.rotate(0.005, 0.005, 0.005);

var cylinder = new Cylinder(0, 0, 0, 1, 2);
cylinder.makePoints();
cylinder.makeFaces();
cylinder.rotate(0.005, 0.005, 0.005);


var torusPoints = torus.points;
var kleinPoints = klein.points;
var spherePoints = sphere.points;
var astroidalEllipsoidPoints = astroidalEllipsoid.points;
var boysSurfacePoints = boysSurface.points;
var cylinderPoints = cylinder.points;

var blankShape = new Blank(HALF_WIDTH/2, 0, 0);
blankShape.makePoints();

var p = [torusPoints, kleinPoints, spherePoints, astroidalEllipsoidPoints, boysSurfacePoints, cylinderPoints];
var counter = 0;

var startTime = new Date();

function draw() {
    let time = new Date();
    let elapsedTime = (time - startTime) / 1000;

    // LINES
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, width, height);

    klein.update();
    torus.update();
    sphere.update();
    astroidalEllipsoid.update();
    boysSurface.update();
    cylinder.update();
    blankShape.update();

    // sphere.drawFaces(context, 250);
    klein.drawFaces(context, 250);
    // torus.drawFaces(context, 250);
    // cylinder.drawFaces(context, 250);
    // boysSurface.drawFaces(context, 250);
    // astroidalEllipsoid.drawFaces(context, 250);
    // blankShape.drawPoints(context, 250);

    blankShape.animateTo(p[counter]);


    requestAnimationFrame(draw);
}

function makeSphere(){
    counter = 2;
}

function makeKlein(){
    counter = 1;
}

function makeTorus(){
    counter = 0;
}

function makeAstroidalEllipsoid(){
    counter = 3;
}

function makeBoysSurface(){
    counter = 4;
}

function makeCylinder(){
    counter = 5;
}


requestAnimationFrame(draw);

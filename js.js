var drawPoints = false;
var drawLines = false;
var drawWireframe = false;

var linesBtn = document.getElementById("linesBtn");
var pointsBtn = document.getElementById("pointsBtn");
var wireframeBtn = document.getElementById("wireframeBtn");
var xInput = document.getElementById("X");
var yInput = document.getElementById("Y");
var zInput = document.getElementById("Z");

var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var HALF_WIDTH = width/2;
var HALF_HEIGHT = height/2;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var sphere = new Sphere(0, 0, 0);
sphere.makePoints();

var klein = new Klein(0, 0, 0);
klein.makePoints();

var torus = new Torus(0, 0, 0, 5, 3);
torus.makePoints();

var astroidalEllipsoid = new AstroidalEllipsoid(0, 0, 0);
astroidalEllipsoid.makePoints();

var boysSurface = new BoysSurface(0, 0, 0);
boysSurface.makePoints();

var cylinder = new Cylinder(0, 0, 0, 1, 2);
cylinder.makePoints();

var torusPoints = torus.points;
var kleinPoints = klein.points;
var spherePoints = sphere.points;
var astroidalEllipsoidPoints = astroidalEllipsoid.points;
var boysSurfacePoints = boysSurface.points;
var cylinderPoints = cylinder.points;

var blankShape = new Blank(0, 0, 0);
blankShape.makePoints();
blankShape.makeFaces();
blankShape.rotate(0.005, 0.005, 0.005);
blankShape.home = kleinPoints;

var p = [torusPoints, kleinPoints, spherePoints, astroidalEllipsoidPoints, boysSurfacePoints, cylinderPoints];
// var meshes = [torus, klein, sphere, astroidalEllipsoid, boysSurface, cylinder];
var counter = 0;

var startTime = new Date();

togglePoints();

function draw() {
    let time = new Date();
    let elapsedTime = (time - startTime) / 1000;

    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, width, height);

    // blankShape.update(xInput + HALF_WIDTH/2, yInput, zInput);
    blankShape.update();

    if(drawWireframe) blankShape.drawWireframe(context, 250);
    if(drawLines) blankShape.drawLines(context, 250);
    if(drawPoints) blankShape.drawPoints(context, 250);

    requestAnimationFrame(draw);
}

function toggleLines(){
    drawLines = !drawLines;
    if(drawLines) linesBtn.style.backgroundColor = "red";
    else linesBtn.style.backgroundColor = "white";
}

function togglePoints(){
    drawPoints = !drawPoints;
    if(drawPoints) pointsBtn.style.backgroundColor = "red";
    else pointsBtn.style.backgroundColor = "white";
}

function toggleWireframe(){
    drawWireframe = !drawWireframe;
    if(drawWireframe) wireframeBtn.style.backgroundColor = "red";
    else wireframeBtn.style.backgroundColor = "white";
}

function setLocation(){
    blankShape.x = parseInt(xInput.value, 10);
    blankShape.y = parseInt(yInput.value, 10);
    blankShape.z = parseInt(zInput.value, 10);
}

function makeSphere(){
    blankShape.home = spherePoints;
}

function makeKlein(){
    blankShape.home = kleinPoints;
}

function makeTorus(){
    blankShape.home = torusPoints;
}

function makeAstroidalEllipsoid(){
    blankShape.home = astroidalEllipsoidPoints;
}

function makeBoysSurface(){
    blankShape.home = boysSurfacePoints;
}

function makeCylinder(){
    blankShape.home = cylinderPoints;
}


requestAnimationFrame(draw);

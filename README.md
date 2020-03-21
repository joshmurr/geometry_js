# Parametric Surfaces

This project was to help me learn more about parametric (or algebraic) surfaces. I ended up here after being shown the following algorithm for a sphere by Prof. Mick Grierson while studying on the Creative Computing Msc at the Creative Computing Institute (London) in 2019:

``` javascript
for (var i = 0; i < dim; i++) {                
  var z = size * Math.cos(spacing / 2 * i);
  var s = size * Math.sin(spacing / 2 * i);
      for (var j = 0; j < dim; j++ ) {
      var point = [
          cos(spacing * j) * s, 
          sin(spacing * j) * s, 
          z
      ];
      points.push(point);
  }
}
```

I played with this formula to generate other shapes such as a cube or a cylinder. I didn't know at the time but these are known as _parametric surfaces_ defined by _spherical coordinates_. The general conversion of _spherical to Cartesian_ coordinates is:

<a style="position:center" href="https://www.codecogs.com/eqnedit.php?latex=\begin{array}{l}x&space;=&space;\rho&space;sin&space;(\phi)&space;cos&space;(\theta)\\y&space;=&space;\rho&space;sin&space;(\phi)&space;sin&space;(\theta)\\z&space;=&space;\rho&space;cos&space;(\theta)\end{array}" target="_blank"><img src="https://latex.codecogs.com/svg.latex?\begin{array}{l}x&space;=&space;\rho&space;sin&space;(\phi)&space;cos&space;(\theta)\\y&space;=&space;\rho&space;sin&space;(\phi)&space;sin&space;(\theta)\\z&space;=&space;\rho&space;cos&space;(\theta)\end{array}" title="\begin{array}{l}x = \rho sin (\phi) cos (\theta)\\y = \rho sin (\phi) sin (\theta)\\z = \rho cos (\theta)\end{array}" /></a>

![Torus -> Klein](./img/torus2klein.png)

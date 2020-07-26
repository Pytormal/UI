/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */

//Menu button
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// searcg bar
document.getElementById("searchform").onsubmit = function () {
  window.location =
    "http://www.bing.com/search?q=site:http://127.0.0.1:5500" +
    document.getElementById("test").value;
  return false;
};


function getElementLeft(elm) 
{
    var x = 0;

    //set x to elm’s offsetLeft
    x = elm.offsetLeft;

    //set elm to its offsetParent
    elm = elm.offsetParent;

    //use while loop to check if elm is null
    // if not then add current elm’s offsetLeft to x
    //offsetTop to y and set elm to its offsetParent

    while(elm != null)
    {
        x = parseInt(x) + parseInt(elm.offsetLeft);
        elm = elm.offsetParent;
    }
    return x;
}

// Ball

var scene = new THREE.Scene();
document.addEventListener('mousemove', onMouseMove, false);
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 5, 8000);
var mouseX;
var mouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var distance = Math.min(20, window.innerWidth / 4);
var geometry = new THREE.Geometry();

for (var i = 0; i < 2900; i++) {

  var vertex = new THREE.Vector3();

  var theta = THREE.Math.randFloatSpread(360);
  var phi = THREE.Math.randFloatSpread(360);

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  geometry.vertices.push(vertex);
}
var particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xff44ff, size: 2 }));
particles.boundingSphere = 80;


var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
var myTween;
function onMouseMove(event) {
  if (myTween)
    myTween.kill();

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = - (event.clientY / window.innerHeight) * 2 + 2;
  myTween = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
  //particles.rotation.x = mouseY*-1;
  //particles.rotation.y = mouseX;
}
animate();

// Scaling animation
var animProps = { scale: 8, xRot: 0, yRot: 0 };
gsap.to(animProps, {
  duration: 10, scale: 7, repeat: -1, yoyo: true, ease: "sine", onUpdate: function () {
    renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
  }
});

gsap.to(animProps, {
  duration: 12, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function () {
    renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
  }
});

// Snake Game

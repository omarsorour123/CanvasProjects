var canvas = document.getElementById("canvas1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random RGB color
function getRandomColor() {
    const r = getRandomNumber(0, 255);
    const g = getRandomNumber(0, 255);
    const b = getRandomNumber(0, 255);
    return `rgb(${r},${g},${b})`;
}

for (var i = 0; i < 100; i++) {

    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
   
}




function Circle(x,y,dx,dy,radius,rColor)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=rColor;
    this.draw=function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
         c.strokeStyle=rColor;
         c.stroke();

    }
    this.update=function(){
        
        if(this.x+this.radius>innerWidth|| this.x - this.radius < 0)
        this.dx=-this.dx; 
      
      if(this.y+this.radius>innerHeight||this.y-this.radius<0)
      this.dy=-this.dy;
    
      this.x+=this.dx;
      this.y+=this.dy;  
      this.draw();

    }
}
var radius= 30;
var circles = [];
for(var i = 0 ;i<100;i++)
{
    var x=Math.random()*(innerWidth-radius*2)+radius;
    var y=Math.random()*(innerHeight-radius*2)+radius;
    var dx=Math.random()*getRandomNumber(10,11);
    var dy=Math.random()*getRandomNumber(10,11);
    var rColor=getRandomColor();
    circles.push(new Circle(x,y,dx,dy,radius,rColor));
}

var circle= new Circle(100,100,10,10,30);
function animate()
{ requestAnimationFrame(animate);
    const randomColor = getRandomColor();
    c.clearRect(0,0,innerWidth,innerHeight);
   

  for(var i = 0 ;i<100;i++)
  {
    circles[i].update();
  }
  

  circle.update();
      
}

animate();

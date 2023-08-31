//Resize the canvas and make it to take the full screen
var canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//Function to generate random numbers between intervals
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



//Max radius can the circles grow
var maxRadius= 60;
//Colors of the circles
var arrayColor = [
    '#042940',
    '#005C53',
    '#9FC131',
    '#DBF227',
    '#D6D58E',
    
]

//Mouse variable to track the mouse x and y
var mouse = {
    x:undefined,
    y:undefined
}

//Event to update with new mouse coordinate values
window.addEventListener('mousemove',function(event)
{
    mouse.x=event.x;
    mouse.y=event.y;
    
});
//Event when resize the screen new circles generate in the new dimension
window.addEventListener('resize',function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
//Circle Object
function Circle(x,y,dx,dy,radius,minRadius)
{
    this.x=x;
    this.y=y;
    //dx and dy for the velocity of the circle 
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    //minRadius for minimum size the circle can reach
    this.minRadius=minRadius;
    //Get random color of arrayColors
    this.color=arrayColor[getRandomNumber(0,arrayColor.length)];
    //Draw function to draw the circle 
    this.draw=function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle=this.color;
         c.fillStyle=this.color;
         c.fill();
         c.stroke();
        
    }
    //Update to move and resize the circle
    this.update=function(){
        
        if(this.x+this.radius>innerWidth|| this.x - this.radius < 0)
        this.dx=-this.dx; 
      
      if(this.y+this.radius>innerHeight||this.y-this.radius<0)
      this.dy=-this.dy;
    
      this.x+=this.dx;
      this.y+=this.dy; 
      // Conditions to resize the circle depend on mouse location  
      if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50&&this.radius<maxRadius)
        this.radius+=2;
    else if(this.radius>minRadius)
      this.radius-=1;
      this.draw();

    }
}





var radius= 30;
var circles = [];


function init()
{   circles=[];
    for(var i = 0 ;i<500;i++)
    {  //Equation to make the circles bounce from the edge of the screen
        var x=Math.random()*(innerWidth-minRadius*2)+minRadius;
        var y=Math.random()*(innerHeight-minRadius*2)+minRadius;
        //Get random numbers
        var dx=Math.random()*getRandomNumber(3,4);
        var dy=Math.random()*getRandomNumber(3,4);
        var minRadius=getRandomNumber(2,7);
        circles.push(new Circle(x,y,dx,dy,minRadius,minRadius));
    }
}
var circle= new Circle(100,100,10,10,30);
//to animate the circles
function animate()
{ requestAnimationFrame(animate);
    const randomColor = getRandomColor();
    c.clearRect(0,0,innerWidth,innerHeight);
   

  for(var i = 0 ;i<500;i++)
  {
    circles[i].update();
  }
  

  circle.update();
      
}
init();
animate();

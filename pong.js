const canvas=document.getElementById("pong");
const context=canvas.getContext("2d");

// context.fillStyle="black";
// context.fillRect(100,200,50,75);
//
// context.fillStyle="red";
// context.beginPath();
// context.arc(300,350,100,0,360,false);
// context.closePath();
// context.fill();
const user={
  x:0,
  y:canvas.height/2-100/2,
  width:10,
  height:100,
  color:"WHITE",
  score:0
}

const com={
  x:canvas.width-10,
  y:canvas.height/2-100/2,
  width:10,
  height:100,
  color:"WHITE",
  score:0
}

const net={
  x:canvas.width/2-2/2,
  y:0,
  width:2,
  height:10,
  color:"WHITE"

}

const ball={
  x:canvas.width/2,
  y:canvas.height/2,
  radius:10,
  speed:5,
  velocityX:5,
  velocityY:5,
  color:"WHITE"
}


function drawReact(x,y,w,h,color){
  context.fillStyle=color;
  context.fillRect(x,y,w,h);
}



function drawCircle(x,y,r,color){
  context.fillStyle=color;
  context.beginPath();
  context.arc(x,y,r,0,Math.PI*2,false);
  context.closePath();
  context.fill();
}


function drawText(text,x,y,color){
  context.fillStyle=color;
  context.font="75px ";
  context.fillText(text,x,y);
}

function drawNet(){
  for(let i=0;i<=canvas.height;i+=15){
    drawReact(net.x,net.y+i,net.width,net.height,net.color);
  }
}

function render(){
  drawReact(0,0,canvas.width,canvas.height,"BLACK");

  drawNet();

  drawText(user.score,canvas.width/4,canvas.height/5,"WHITE");
  drawText(com.score,3*canvas.width/4,canvas.height/5,"WHITE");

  drawReact(user.x,user.y,user.width,user.height,user.color);
  drawReact(com.x,com.y,com.width,com.height,com.color);

  drawCircle(ball.x,ball.y,ball.radius,ball.color);

}

canvas.addEventListener("mousemove",movePaddle);
function movePaddle(evt){
  let rect=canvas.getBoundingClientRect();
  user.y=evt.clientY-rect.top-user.height/2;
}
function resetBall(){
  ball.x=canvas.width/2;
  ball.y=canvas.height/2;
  ball.speed=5;
  ball.velocityX=-ball.velocityX;
}

function update(){
  ball.x+=ball.velocityX;
  ball.y+=ball.velocityY;
   if(ball.y+ball.radius>canvas.height||ball.y-ball.radius<0){
    ball. velocityY=-ball.velocityY;

   }
   let computerLevel=0.1;
   com.y+=(ball.y-(com.y+com.height/2))*computerLevel;

   let player=(ball.x < canvas.width/2)?user:com;
  if(collision(ball,player)){
    let collidePoint=(ball.y-(player.y+player.height/2));
    collidePoint=collidePoint/(player.height/2);

    let angleRed=(Math.PI/4)*collidePoint;
    let direction=(ball.x<canvas.width/2)?1:-1;

    ball.velocityX=direction*ball.speed*Math.cos(angleRed);
    ball.velocityY=direction*ball.speed*Math.sin(angleRed);
      ball.speed+=0.3;
  }

  if(ball.x-ball.radius<0){
    com.score++;
    resetBall();
  }else if(ball.x+ball.radius>canvas.width){
    user.score++;
    resetBall();
  }

}

function collision(b,p){
  p.top=p.y;
  p.bottom=p.y+p.height;
  p.left=p.x;
  p.right=p.x+p.width;

  b.top=b.y-b.radius;
  b.bottom=b.y+b.radius;
  b.left=b.x-b.radius;
  b.right=b.x+b.radius;
return b.right>p.left && b.top<p.bottom && b.left<p.right && b.bottom>p.top;
}

function game(){
 update();
  render();
}
const framePerSecond=50;
setInterval(game,1000/framePerSecond);

//

//
//

//


//

//

//
//
//

//

//

//

//

//
//
// // let rectX=0;
// // function render(){
// //   drawReact(0,0,600,400,"black");
// //   drawReact(rectX,100,100,100,"red");
// //   rectX=rectX+100;
// // }
// // setInterval(render,1000);
//

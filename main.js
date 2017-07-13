var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var gravity = .1;

//keyboard input
var keymap = [];
document.addEventListener('keydown', function (e) {keymap[e.keyCode] = true;}, false);
document.addEventListener('keyup', function (e) {keymap[e.keyCode] = false;}, false);

var cam = {
  x: 0,
  y: 0,
  w: c.width,
  h: c.height,
}

var player = {
  x: c.width/2,
  y: c.height/2,
  size: 20,
  xv: 0,
  yv: 0,
  speed: 3,
  update: function () {
    //inputs
    if(keymap[37]) if(this.x-this.speed>0){this.xv = -this.speed};
    if(keymap[39]) if(this.x+this.speed<c.width-this.size){this.xv = this.speed};
    //physics/collision detection

    if(this.onGround()) this.yv = 0;
    else this.yv+=gravity;
    if(keymap[38]) if(this.onGround())this.yv = -6;

    this.y+=this.yv;
    this.x+=this.xv;

    //draw
    ctx.fillRect(this.x-cam.x,this.y-cam.y-1,this.size,this.size);

    //reset vars
    this.xv = 0;
  },
  onGround: function () {
    if(this.y+this.size+this.speed>cam.y+cam.h) return true;
    for (var i = 0; i < platforms.length; i++) {
      if(this.x+this.size>platforms[i].x && this.x<platforms[i].x+platforms[i].w){
        if(this.y+this.size+this.speed>platforms[i].y && this.y+this.size+this.speed<platforms[i].y+platforms[i].h) return true;
      }
    }
    return false;
  }
}

var platforms = [];
function platform(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.update = function () {
    ctx.fillRect(x-cam.x,y-cam.y,w,h);
  }
}
platforms.push(new platform(100,400,100,10));

setInterval(function () {
  ctx.clearRect(0,0,c.width,c.height);
    player.update();
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].update();
    }
    console.log(player.onGround());
},10);

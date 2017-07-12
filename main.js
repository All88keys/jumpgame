var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var gravity = 1;

//keyboard input
var keymap = [];
document.addEventListener('keydown', function (e) {keymap[e.keyCode] = true;}, false);
document.addEventListener('keyup', function (e) {keymap[e.keyCode] = false;}, false);

var player = {
  x: c.width/2,
  y: c.height/2,
  size: 20,
  xv: 0,
  yv: 0,
  speed: 3,
  update: function () {
    //inputs
    if(keymap[37]) this.xv = -this.speed;
    if(keymap[39]) this.xv = this.speed;

    //physics/collision detection
    if(this.x+this.size+this.speed>=c.width){
      this.xv = -1;
    }
    if(this.x<=0){
      this.xv = 1;
    }
    this.x+=this.xv;

    //draw
    ctx.fillRect(this.x,this.y,this.size,this.size);

    //reset vars
    this.xv = 0;
    this.yv = 0;
  }
}




setInterval(function () {
  ctx.clearRect(0,0,c.width,c.height);
    player.update();
    console.log(player.x, player.y);
},10);

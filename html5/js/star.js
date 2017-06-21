var can;
var ctx;
var w;
var h;
var girlPic=new Image();
var starPic=new Image();
var arr=[];
var num=60;
var delTime;
var lastTime;
var switchY=false;
var life=0;
function init(){
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	w=can.width;
	h=can.height;
	girlPic.src='image/girl.jpg';
	starPic.src="image/star.png";
	for(var i=0;i<num;i++){
		var obj=new starObj();
		arr.push(obj);
		arr[i].init();
	}
	document.onmousemove=mousemove;
	lastTime=Date.now();
	gameloop();

}
document.body.onload=init;
function gameloop(){
	window.requestAnimationFrame(gameloop);
	var now=Date.now();
	delTime=now-lastTime;
	lastTime=now;
	drawBackground();
	drawGirl();
	drawStars();
	aliveUpdate();
}
function drawBackground(){
	ctx.fillstyle='#393550';
	ctx.fillRect(0,0,w,h)
}
function drawGirl(){
	ctx.drawImage(girlPic,100,150,600,300);
}
function mousemove(e){
	if(e.offsetX||e.layerX){
		var px=e.offsetX==undefined?e.layerX:e.offsetX;
		var py=e.offsetY==undefined?e.layerY:e.offsetY;
	}
	if(px>100&&px<700&&py>150&&py<450){
		switchY=true;
	}else{
		switchY=false;
	}
	
}
var starObj=function(){
	this.x;
	this.y;
	this.picNo;
	this.timer;
	this.speedX;
	this.speedY;
}
starObj.prototype.init=function(){
	this.x=Math.random()*600+100;
	this.y=Math.random()*300+150;
	this.picNo=Math.floor(Math.random()*7);
	this.timer=0;
	this.speedX=Math.random()*3-1.5;
	this.speedY=Math.random()*3-1.5;
}
starObj.prototype.update=function(){
	this.x+=this.speedX*delTime*0.004;
	this.y+=this.speedY*delTime*0.004;
	if(this.x<100||this.x>700){
		this.init();
		return;
	}
	if(this.y<150||this.y>450){
		this.init();
		return;
	}
	this.timer+=delTime;
	if(this.timer>50){
		this.picNo+=1;
		this.picNo%=7;
		this.timer=0;
	}
}
starObj.prototype.draw=function(){
	ctx.save();
	ctx.globalAlpha=life;
	ctx.drawImage(starPic,this.picNo*7,0,7,7,this.x,this.y,7,7);
	ctx.restore();
}
function drawStars(){
	for(var i=0;i<num;i++){
		arr[i].update();
		arr[i].draw();
	}
}
function aliveUpdate(){
	if(switchY){
		life+=0.03*delTime*0.05;
		life=Math.min(1,life);
	}else{
		life-=0.03*delTime*0.05;
		life=Math.max(0,life);
	}
}
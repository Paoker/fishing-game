//鱼
var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];
	
function Fish(type){	
	this.type=type;	
	this.w=FISH_SIZE[this.type].w;
	this.h=FISH_SIZE[this.type].h;
	this.x=0;
	this.y=0;
	this.rotate=0;
	this.cur=0; //计数器
	this.collR=FISH_SIZE[this.type].collR;
	
	this.speed=1;	
	
	this.scale=false;
	
	this.move();
}

Fish.prototype.draw=function(gd){
	
	gd.save();
	gd.translate(this.x,this.y);
	
	gd.rotate(d2a(this.rotate));
	
	//翻转鱼
	if(this.scale){
		gd.scale(1,-1);
	}
	
	gd.drawImage(JSON['fish'+this.type],0,this.cur%4*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);	
	
	gd.restore();
};

Fish.prototype.move=function(){
	var _this=this;
	//移动鱼
	// this.x this.y
	setInterval(function(){
		_this.x+=Math.cos(d2a(_this.rotate))*_this.speed;
		_this.y+=Math.sin(d2a(_this.rotate))*_this.speed;
	},30);
	
	
	//摇尾巴
	setInterval(function(){
		_this.cur++;
		
	},200);	
};

Fish.prototype.isIn=function(x,y){
	
	var x1=this.x;
	var y1=this.y;
	
	var x2=x;
	var y2=y;
	
	var a=y2-y1;
	var b=x2-x1;
	
	var c=Math.sqrt(a*a+b*b);
	
	if(c<this.collR){
		return true;
	}else{
		return false;	
	}
};












	
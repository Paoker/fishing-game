function Coin(type){
	this.type=type;
	this.x=0;
	this.y=0;
	this.w=60;
	this.h=60;
	this.cur=0;
	
	this.move();
}
Coin.prototype.draw=function(gd){
	
	gd.save();
	
	gd.translate(this.x,this.y);
	
	var oImg=null;
	switch(this.type){
		case 1:
		case 2:
			oImg=JSON['coinAni1'];
		break;
		case 3:
		case 4:
		case 5:
			oImg=JSON['coinAni2'];
		break;
	}
	gd.drawImage(oImg,0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	
	gd.restore();
		
};

Coin.prototype.move=function(){
	var _this=this;
	setInterval(function(){
		_this.cur++;	
		if(_this.cur==10){
			_this.cur=0;	
		}
	},100);
	
	setInterval(function(){
		_this.x+=(20-_this.x)/8;
		_this.y+=(660-_this.y)/8;
	},30);
	
};
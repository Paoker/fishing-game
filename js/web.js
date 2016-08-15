function Web(type){
	this.type=type;
	this.x=0;
	this.y=0;
	this.w=230;
	this.h=230;
	this.scale=1;
}
Web.prototype.draw=function(gd){
	
	gd.save();
	
	gd.translate(this.x,this.y);
	gd.scale(this.scale,this.scale);
	gd.drawImage(JSON['web'],0,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	
	gd.restore();
	
};

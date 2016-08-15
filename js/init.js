window.onload=function(){
	var oC=document.querySelector('#canvas');
	
	var gd=oC.getContext('2d');

	readImage(source,function(){
		
		
		var c=new Cannon(5);
		
		//存鱼
		var fishArr=[];
		
		//保存炮弹
		var bulletArr=[];
		
		//保存死鱼
		var dieFishArr=[];
		
		//存金币
		var coinArr=[];
		
		//存渔网
		var webArr=[];
		
		setInterval(function(){
			//清画布
			gd.clearRect(0,0,oC.width,oC.height);
			
			if(Math.random()<0.05){
				var f=new Fish(rnd(1,6));
				f.y=rnd(100,oC.height-100);
				if(Math.random()>0.5){
					f.x=-50;
					f.rotate=rnd(-45,45);
				}else{
					f.x=oC.width+50;
					f.scale=true;
					f.rotate=rnd(-135,-225);	
				}
				
				
				fishArr.push(f)
			}
			
			
			
			//画鱼
			for(var i=0; i<fishArr.length;i++){
				fishArr[i].draw(gd);
			}
			
			//画死鱼
			for(var i=0; i<dieFishArr.length;i++){
				dieFishArr[i].draw(gd);	
			}
			
			//画金币
			for(var i=0; i<coinArr.length;i++){
				coinArr[i].draw(gd);
			}
			
			//画渔网
			for(var i=0; i<webArr.length;i++){
				webArr[i].draw(gd);
			}
			
			
			
			//画炮台
			gd.drawImage(JSON['bottom'],0,0,765,70,18,530,765,70);
			
			
			
			
			//画炮弹
			//bullet.draw(gd);
			for(var i=0; i<bulletArr.length;i++){
				bulletArr[i].draw(gd);
			}
			
			//画炮
			c.draw(gd);
			
			
			//碰撞检测
			for(var i=0; i<fishArr.length;i++){
				for(var j=0; j<bulletArr.length;j++){
					if(fishArr[i].isIn(bulletArr[j].x,bulletArr[j].y)){
						
						var type=fishArr[i].type;
						var x=fishArr[i].x;
						var y=fishArr[i].y;
						var w=fishArr[i].w;
						var h=fishArr[i].h;
						var rotate=fishArr[i].rotate;
						
						
						//炮弹消失
						bulletArr.splice(j,1);
						
						//活鱼消失
						fishArr.splice(i,1);
						
						//生成死鱼
						var dieFish=new DieFish(type);
						dieFish.x=x;
						dieFish.y=y;
						dieFish.w=w;
						dieFish.h=h;
						dieFish.rotate=rotate;
						
						dieFishArr.push(dieFish);
						
						setTimeout(function(){
							dieFishArr.shift();
						},300);	
						
						
						//生成金币
						var oCoin=new Coin(type);
						
						oCoin.x=x;
						oCoin.y=y;
						
						coinArr.push(oCoin);
						
						setTimeout(function(){
							coinArr.shift();
						},1000);
						
						//金币音效
						var oCoinS=new Audio();
						
						oCoinS.src='snd/coin.wav';
						
						oCoinS.play();	
					
						
						//生成渔网
						var web=new Web(1);	
						
						web.x=x;
						web.y=y;
						
						web.scale=0.5;
						
						setInterval(function(){
							web.scale+=0.1;
							
							if(web.scale==1.2){
								web.scale=0.5;
							}	
						},100);
						
						//删除渔网
						setTimeout(function(){
							webArr.shift();	
						},600);
						
						
						webArr.push(web);
						
						//console.log(bulletArr);
							
					}		
				}
			}
			
			
			//性能优化
			
			//删除屏幕之外的鱼
			for(var i=0; i<fishArr.length;i++){
if(fishArr[i].x<-50 || fishArr[i].x>850 || fishArr[i].y<-50 || fishArr[i].y>650){
					fishArr.splice(i,1);
					i--;	
				}
			}
			
			//删除屏幕之外的炮弹
			for(var i=0; i<bulletArr.length;i++){
if(bulletArr[i].x<-50 || bulletArr[i].x>850 || bulletArr[i].y<-50 || bulletArr[i].y>650){
					bulletArr.splice(i,1);
					i--;	
				}
			}
			
				
		},16);
		
		//点击事件
		oC.onclick=function(ev){
			var x1=ev.clientX-oC.offsetLeft;
			var y1=ev.clientY-oC.offsetTop;
			var x2=c.x;
			var y2=c.y;
			
			var a=x2-x1;
			var b=y2-y1;
			
			var d=Math.atan2(b,a);
			
			var deg=a2d(d)-90;
			c.rotate=deg;
			c.emitChange();
			
			
			//生成炮弹
			var bullet=new Bullet(c.type);
			bullet.rotate=deg;
			bulletArr.push(bullet);
			
			//添加炮弹音效
			var oS=new Audio();
			oS.src='snd/cannon.mp3';
			oS.play();
		};
	
			
	},function(loaded,total){
		var scale=loaded/total;
		//进度条
	});
		
};
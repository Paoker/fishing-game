//所有资源
var JSON={};

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);	
}

function d2a(n){
	return n/180*Math.PI;	
}

function a2d(n){
	return n/Math.PI*180;	
}

//加载游戏资源
function readImage(arr,fnSucc,fnLoading){
	
	var count=0;
	var oImg;
	for(var i=0; i<arr.length;i++){
		oImg=new Image();

		(function(index){
			oImg.onload=function(){
				count++;
				JSON[arr[index]]=this;
			//JSON['fish1']='img(fish1.png)';//JSON={a:12}
				
				//加载进度
				fnLoading&&fnLoading(count,arr.length);
				
				//资源加载完毕
				if(count==arr.length){
					fnSucc&&fnSucc();
				}
			};	
		})(i);
		
		oImg.src='img/'+arr[i]+'.png';
	}
}
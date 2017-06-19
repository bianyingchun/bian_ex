$(function(){
	//设置色盘颜色
	$.each($('.color li'),function(i,value){
		$(value).css('background',value.id);
	});
	
	//设置鼠标点击时元素CSS切换
	$(".thin li,.color li").click(function(){$(this).css("border","1px solid #fff").siblings().css("border","1px solid #000");
	});	
	$(".first li").click(function(){
		$(this).css("background","#8080ff").siblings().css("background","#c2c2a3");
		$(".second li").css("background","#c2c2a3");
	});
	$(".second li").click(function(){
		$(this).css("background","#8080ff").siblings().css("background","#c2c2a3");
		$(".first li").css("background","#c2c2a3");
	});
	
	//获取canvas对象
	var cx=document.getElementById("canvas").getContext('2d');
	//默认划线
	var flag=0;
	$("#canvas").mousedown(function(evt){
		flag=1;
		var evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cx.beginPath();	
		cx.moveTo(startX,startY);
	}).mousemove(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		if(flag==1){
		cx.lineTo(currentX,currentY);
		cx.stroke();		
		}
	}).mouseup(function(){
		flag=0;
		cx.closePath();
	}).mouseout(function(){
		flag=0;
		cx.closePath();
	});
	
	//设置线条和填充颜色
	$(".color li").click(function(){
		cx.strokeStyle=$(this).css('backgroundColor');
		cx.fillStyle=$(this).css('backgroundColor');
	});
	//设置线段粗细
	$(".thin li").click(function(){
		var index=$(this).index();
		cx.lineWidth=index*2-1;
	})
	//设置形状工具
	//直线段
	$('#thrline').click(function(){	
	$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cx.beginPath();	
		cx.moveTo(startX,startY);
}).mouseup(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;	
		cx.lineTo(currentX,currentY);
		cx.stroke();
		cx.closePath();		
	});
	});
	//圆圈
	$("#circle").click(function(){
		var startX=0;
		var startY=0;
		$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}).mouseup(function(evt){
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.beginPath();
		var a=currentX-startX;
		var b=currentY-startY;
		var r=Math.sqrt(a*a+b*b);
		cx.arc(startX,startY,r,0,360,false);
		cx.stroke();
		cx.closePath();		
	});	
	});
	//矩形框
	$("#rectangle").click(function(){
		var startX=0;
		var startY=0;
		$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}).mouseup(function(evt){
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.beginPath();
		var a=currentX-startX;
		var b=currentY-startY;
		cx.rect(startX,startY,a,b);
		cx.stroke();
		cx.closePath();		
	});	
	})
	//三角形
	$("#tragle").click(function(){
		var startX=0;
		var startY=0;
		$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
		
	}).mouseup(function(evt){
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.beginPath();
		cx.moveTo(currentX,currentY);
		var leftX=2*startX-currentX;
		var leftY=currentY;
		cx.lineTo(leftX,leftY);
		var topX=startX;
		var topY=3*startY-2*currentY;
		cx.lineTo(topX,topY);
		cx.lineTo(currentX,currentY);
		cx.stroke();
		cx.closePath();		
	});	
	})
	//填充圆
	$("#cirfall").click(function(){
		var startX=0;
		var startY=0;
		$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}).mouseup(function(evt){
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.beginPath();
		var a=currentX-startX;
		var b=currentY-startY;
		var r=Math.sqrt(a*a+b*b);
		cx.arc(startX,startY,r,0,360,false);
		cx.fill();
		cx.closePath();		
	});	
	});
	//填充矩形
	$("#rectanglefill").click(function(){
		var startX=0;
		var startY=0;
		$('canvas').unbind();
	$('canvas').mousedown(function(evt){
		var evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}).mouseup(function(evt){
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.beginPath();
		var a=currentX-startX;
		var b=currentY-startY;
		cx.fillRect(startX,startY,a,b);
		cx.stroke();
		cx.closePath();		
	});	
	})
	//工具功能实现
	//画笔工具
	$("#pen").click(function(){
		$('canvas').unbind();
		$("#canvas").mousedown(function(evt){
		flag=1;
		var evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cx.beginPath();	
		cx.moveTo(startX,startY);
	}).mousemove(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		if(flag==1){
		cx.lineTo(currentX,currentY);
		cx.stroke();		
		}
	}).mouseup(function(){
		flag=0;
		cx.closePath();
	}).mouseout(function(){
		flag=0;
		cx.closePath();
	});
	})
	//橡皮擦工具
	var eflag=0
	$("#easer").click(function(){
		$('canvas').unbind();
		$("#canvas").mousedown(function(evt){
		eflag=1;
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		cx.clearRect(currentX-cx.lineWidth,currentY-cx.lineWidth,cx.lineWidth*2,cx.lineWidth*2);	
	}).mousemove(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		if(eflag==1){
		cx.clearRect(currentX-cx.lineWidth,currentY-cx.lineWidth,cx.lineWidth*2,cx.lineWidth*2);	
		}
	}).mouseup(function(){
		eflag=0;
		cx.closePath();
	}).mouseout(function(){
		eflag=0;
		cx.closePath();
	});
	})
	//油漆桶工具
	$("#pour").click(function(){
		$('canvas').unbind();
		$("canvas").mousedown(function(){
		cx.beginPath();
		cx.fillRect(0,0,$('canvas').width(),$("canvas").height());
		cx.stroke();
		cx.closePath();	
		})	
	})
	//吸管工具
	/*
	$("#xiguan").click(function(){
		$('canvas').unbind();
		$("canvas").mousedown(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		var obj=cx.getImageData(currentX,currentY,1,1);
		cx.strokeStyle=rgb(obj.data[0],obj.data[1],obj.data[2])+'';
		cx.fillStyle=rgb(obj.data[0],obj.data[1],obj.data[2])+'';
		})	
	})*/
	//文本工具
	$("#wenzi").click(function(){
		$('canvas').unbind();
		$("canvas").mousedown(function(evt){
		var evt=window.event||evt;
		var currentX=evt.pageX-this.offsetLeft;
		var currentY=evt.pageY-this.offsetTop;
		var text=window.prompt('请输入文字','');
		if(text!=null){
			cx.fillText(text,currentX,currentY);
		}
		})	
	})
	//放大镜工具
	$("#push").click(function(){
		var scale=window.prompt('请输入缩放的百分比','');
		$('canvas').width(900*parseInt(scale)/100);
		$('canvas').height(345*parseInt(scale)/100);
	})
	//清空画布
	$('#clear').click(function(){
		cx.clearRect(0,0,$('canvas').width(),$('canvas').height());
	})
});
// JavaScript Document
var clickX=new Array();
var clickY=new Array();
var clickDrag=new Array();
var clickColor=new Array();
var clickTool=new Array();
var clickSize=new Array();
var curTool="maker";
var curColor="";
var curSize=3;
var scroll_top=0;
var paint=false;
var color=["#ef5b9c","#f05b72","#f391a9","#f15a22","#fcaf17","#b2d235","#45b97c","#90d7ec","#426ab3","#8552a1","#a1a3a6","#000","#a03939","#deab8a"];
var color_flag=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var maker_color=new Image();
var crayon_color=new Image();
var crayon_bg=new Image();
var maker_bg=new Image();
var eraser_bg=new Image();
var crayonTextureImage=new Image();
var bg01=new Image();
var mycanvas1=document.getElementById("mycanvas");
var mycanvas2=document.getElementById("mypannel");
if(mycanvas1.getContext&&mycanvas2.getContext){ 
   var context = mycanvas1.getContext("2d");
   var mypannel= mycanvas2.getContext("2d");
}
crayon_color.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/crayon-outline.png";
maker_color.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/marker-outline.png";
maker_bg.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/marker-background.png";
crayon_bg.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/crayon-background.png";
eraser_bg.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/eraser-background.png";
bg01.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/bg01.jpg";
crayonTextureImage.src="G:/html/新建文件夹/自己写的JS程序/画板js/images/Copy of crayon-texture.png";
maker_bg.onload=function(){
   context.drawImage(maker_bg,775,0,490,220);
};
crayonTextureImage.onload=function(){};
crayon_bg.onload=function(){};
eraser_bg.onload=function(){};
maker_color.onload=function(){draw_left();};
crayon_color.onload=function(){draw_left();};
bg01.onload=function(){
mypannel.drawImage(bg01,22,20,956,650);
};
function draw_left(){
 //alert("aaa");
context.clearRect(0,0,300,700);
 //alert(clickTool);
   switch(curTool){
	  
	 
   case 'maker':
   //alert("maker");
   
   for(var i=0;i<color.length;i++){
      if(color_flag[i]==0){
		context.beginPath();
		context.fillStyle=color[i];
		context.moveTo(95,26+i*50);
		context.lineTo(113,20+i*50);
		context.lineTo(113,36+i*50);
		context.closePath();
		context.fill();
		context.drawImage(maker_color,90,50*i,100,50);
	  }
	  else if(color_flag[i]==1){
	    context.beginPath();
		context.fillStyle=color[i];
		context.moveTo(55,26+i*50);
		context.lineTo(73,20+i*50);
		context.lineTo(73,36+i*50);
		context.closePath();
		context.fill();
		context.drawImage(maker_color,50,50*i,100,50);
	  }
   }
 
   break;
   
   case 'crayon':
      for(var i=0;i<color.length;i++){
      if(color_flag[i]==0){
		context.beginPath();
		context.fillStyle=color[i];
		context.moveTo(41+92,11+2+50*i);
		context.lineTo(41+92,35+2+50*i);
		context.lineTo(29+92,35+2+50*i);
		context.lineTo(29+92,33+2+50*i);
		context.lineTo(11+92,27+2+50*i);
		context.lineTo(11+92,19+2+50*i);
		context.lineTo(29+92,13+2+50*i);
		context.lineTo(29+92,11+2+50*i);
		context.lineTo(41+92,11+2+50*i);
		context.closePath();
		context.fill();
		context.drawImage(crayon_color,90,50*i,100,50);
	  }
	  else if(color_flag[i]==1){
	    context.beginPath();
		context.fillStyle=color[i];
		context.moveTo(41+52,11+2+50*i);
		context.lineTo(41+52,35+2+50*i);
		context.lineTo(29+52,35+2+50*i);
		context.lineTo(29+52,33+2+50*i);
		context.lineTo(11+52,27+2+50*i);
		context.lineTo(11+52,19+2+50*i);
		context.lineTo(29+52,13+2+50*i);
		context.lineTo(29+52,11+2+50*i);
		context.lineTo(41+52,11+2+50*i);
		context.closePath();
		context.fill();
		context.drawImage(crayon_color,50,50*i,100,50);
	  }
   }
   break;
   
   }
}

//function draw(){
	mycanvas1.onmousedown=function(e){
		color_flag=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var clickEvent=window.event||e;
		var mwidth=clickEvent.clientX;
		var mheight=clickEvent.clientY+scroll_top;
		//alert(mwidth+" "+mheight);
		
		for(var i=0;i<color.length;i++){
		   if(50<mwidth&&mwidth<150&&mheight<50*(i+1)&&mheight>50*i){
			   //alert(i);
			   color_flag[i]=1;
			   curColor=color[i];
			   draw_left();
			 }
		}
		if(1150<mwidth&&mwidth<1300&&mheight<60&&mheight>20){
		       //alert("aa");
			   context.drawImage(crayon_bg,775,0,490,220);
			   curTool="crayon";
			   draw_left();
			  
		}
		else if(1150<mwidth&&mwidth<1300&&mheight<100&&mheight>60){
			   context.drawImage(maker_bg,775,0,490,220);
			   curTool="maker";
			   draw_left();
		}
		else if(1150<mwidth&&mwidth<1300&&mheight<140&&mheight>100){
			   context.drawImage(eraser_bg,775,0,490,220);
			   curTool="eraser";
			   draw_left();
		}		
		else if(1150<mwidth&&mwidth<1260&&mheight<210&&mheight>140){
			   
			   if(1150<mwidth&&mwidth<1190&&mheight<210&&mheight>140){
				   context.clearRect(1150,190,105,6);
				   curSize=10;
				   context.beginPath();
				   context.moveTo(1176,200);
				   context.lineTo(1176,188);
				   context.stroke();
				   context.closePath();			   
			   }
			   else  if(1190<mwidth&&mwidth<1210&&mheight<210&&mheight>140){
				   context.clearRect(1150,190,105,6);
				   curSize=8;
				   context.beginPath();
				   context.moveTo(1203,200);
				   context.lineTo(1203,188);
				   context.stroke();
				   context.closePath();			   
			   }
			   else  if(1210<mwidth&&mwidth<1230&&mheight<210&&mheight>140){
				   context.clearRect(1150,190,105,6);
				   curSize=6;
				   context.beginPath();
				   context.moveTo(1226,200);
				   context.lineTo(1226,188);
				   context.stroke();
				   context.closePath(); 
			   }
		       else  if(1230<mwidth&&mwidth<1260&&mheight<210&&mheight>140){
				   context.clearRect(1150,190,105,6);
				   curSize=3;
				   context.beginPath();
				   context.moveTo(1243,200);
				   context.lineTo(1243,188);
				   context.stroke();
				   context.closePath(); 
			   }	   
		}
		else if(1150<mwidth&&mwidth<1300&&mheight<270&&mheight>210){
			   //context.drawImage(eraser_bg,775,0,490,220);
			   curTool="seal";
			   //draw_left();
		}	
	};
//}
//draw();
$("#mypannel").mousedown(function(e){
	paint=true;
	var draw_x=e.clientX-150;
	var draw_y=e.clientY+scroll_top;
	addClick(draw_x,draw_y,false);
	if(curTool=='seal'){
		draw_seal(draw_x,draw_y);
	}
});
$("#mypannel").mouseup(function(e){
	paint=false;
});

$("#mypannel").mousemove(function(e){
if(paint==true){
	  var locX=e.clientX-150;
	  var locY=e.clientY+scroll_top;
	  addClick(locX,locY,true);
	  draw_pic();
}
});

function addClick(x, y,dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	
}
function draw_pic(){
	  //mypannel.clearRect(0,0,600,700);
	  for(var i=0;i<clickX.length;i++){
		//mypannel.lineWidth = ; 
		if(clickTool[i]=='maker'||clickTool[i]=='crayon'||clickTool[i]=='eraser'){
		mypannel.beginPath();
		if(i!=0&&clickDrag[i]!=false){
		mypannel.moveTo(clickX[i-1], clickY[i-1]);
		}
		else{
	    mypannel.moveTo(clickX[i], clickY[i]);
		}
		mypannel.lineTo(clickX[i], clickY[i]);
		mypannel.closePath();			
		mypannel.lineJoin = "round";
		mypannel.lineWidth = clickSize[i];
		
		if(clickTool[i]=='eraser'){
			mypannel.strokeStyle="#fff";
		}
		else{
			mypannel.strokeStyle = clickColor[i];
		}
		mypannel.stroke();
		//mypannel.restore();
	    if(clickTool[i]=='crayon'){
		    mypannel.globalAlpha = 0.4; // No IE support
		    mypannel.drawImage(crayonTextureImage, clickX[i], clickY[i], clickSize[i], clickSize[i]);
		}
		}
		else if(clickTool[i]=='seal'){
			draw_seal(clickX[i],clickY[i]);
		}
	  }
}

function draw_seal(draw_x,draw_y){
	    //alert("seal");
	  	mypannel.beginPath(); 
		for(var j=0;j<5;j++){ 
		  mypannel.lineTo(draw_x+100*Math.cos((18+j*72)*Math.PI/180),-100*Math.sin((18+j*72)*Math.PI/180)+draw_y);
		  mypannel.lineTo(draw_x+50*Math.cos((54+j*72)*Math.PI/180),-50*Math.sin((54+j*72)*Math.PI/180)+draw_y); 
		} 
		mypannel.fillStyle=clickColor; 
		//mypannel.fill(); 
		mypannel.closePath();         
		mypannel.stroke();
	  
}
function draw_test(){
		mypannel.translate(160,30);
		mypannel.fillStyle='rgba(120,93,222,0.25)';
		mypannel.fillRect(0,0,100,50)
		
		for(var i=0;i<50;i++){
		mypannel.translate(25,25);
		mypannel.scale(0.95,0.95);
		mypannel.rotate(Math.PI/10);
		mypannel.fillRect(0,0,100,50);
  } 
}
//draw_test();
function convertCanvasToImage() {
	   var image = new Image();
	   image.src = mypannel.toDataURL("F:/html/新建文件夹/自己写的JS程序/画板js/images/");
	   return image;
 }

window.onscroll=function(){
        scroll_top=document.body.scrollTop;
}
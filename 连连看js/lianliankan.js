// JavaScript Document
var canvas = document.getElementById("myCanvas"); 
if(canvas.getContext){ 
var ctx = canvas.getContext("2d");
  for(var j=1;j<14;j++){
	for(var i=1;i<12;i++){
	  ctx.beginPath();  
	  ctx.moveTo(0,40*i); 
	  ctx.lineTo(800,40*i); 
	  ctx.stroke();  
	  ctx.closePath(); 
	  ctx.beginPath();  
	  ctx.moveTo(40*j,0); 
	  ctx.lineTo(40*j,800); 
	  ctx.stroke();  
	  ctx.closePath(); 
	}
  }
}
  var score=0;
  var img_src=new Array();
  var img_map=new Array();
  //var num_map=new Array();
  var num_map=[0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,7,7];
  for(var i=1;i<9;i++){
	var img1=new Image();
	img1.src="G:/html/js例子/zootetragonoides/katongxiaodongwu_0"+i+".png";
	img_src.push(img1);
  }
  /*
  for(var i=0;i<28;i++){
    var num=parseInt(Math.random()*8);
	//img_map.push(img[num]);
	num_count[num]=num_count[num]+1;
	num_map.push(num);
  }
  */
  num_map.sort(function(){return 0.5-Math.random()});
  //alert(num_map.length);
  var map=new Array();
  for(var i=0;i<12;i++){
	  map[i]=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  }
map[6][1]=num_map[0];
map[7][1]=num_map[1];
map[8][1]=num_map[2];
map[9][1]=num_map[3];
map[7][2]=num_map[4];
map[8][2]=num_map[5];
map[9][2]=num_map[6];
map[8][3]=num_map[7];
map[9][3]=num_map[8];
map[9][4]=num_map[9];

map[6][12]=num_map[10];
map[7][12]=num_map[11];
map[8][12]=num_map[12];
map[9][12]=num_map[13];
map[7][11]=num_map[14];
map[8][11]=num_map[15];
map[9][11]=num_map[16];
map[8][10]=num_map[17];
map[9][10]=num_map[18];

map[9][9]=num_map[19];
map[2][5]=num_map[20];
map[2][6]=num_map[21];
map[2][7]=num_map[22];
map[2][8]=num_map[23];
map[3][5]=num_map[24];
map[3][6]=num_map[25];
map[3][7]=num_map[26];
map[3][8]=num_map[27];
 
//alert(map);

function draw_pannel(){
//alert("2017---");

ctx.clearRect(0,0,560,480);
for(var i=0;i<12;i++){
	for(var j=0;j<14;j++){
		if(map[i][j]!=-1){
			var temp=map[i][j];
				//alert(temp);
	   ctx.drawImage(img_src[temp],40*j,40*i,40,40);
			}
		}
	}
} 

img1.onload=function(){
    draw_pannel(); 
}
//alert(map);
timedCount();

var mouse_map=new Array();
var temp_i=-1;
var temp_j=-1;
canvas.onmousedown=function(e){
		var clickEvent=window.event||e;
		var mwidth=clickEvent.clientX;
		var mheight=clickEvent.clientY-60;
		for(var i=0;i<12;i++){
			for(var j=0;j<14;j++){
			if(j*40<mwidth&&mwidth<(j+1)*40&&i*40<mheight&&mheight<(i+1)*40){
				//alert(map[i][j]);
			if(map[i][j]!=-1&&mouse_map.length==0){
				//ctx.fillStyle = "rgba(225,225,225,0.5)";      
                ctx.globalAlpha=0.2;
				ctx.fillStyle="#FFFF00";
				ctx.fillRect(40*j,40*i,40,40);
				mouse_map.push(i);
				mouse_map.push(j);
				temp_i=mouse_map[0];
				temp_j=mouse_map[1];
				//alert(mouse_map);
				}
			else if(map[i][j]!=-1&&mouse_map.length!=0&&i==temp_i&&j==temp_j){
				//alert("两个坐标重复了！");
				temp_i=-1;
				temp_j=-1;
				mouse_map=[];
				//alert(mouse_map);
				}
			else if(map[i][j]!=-1&&mouse_map.length!=0){
				if(i!=temp_i||j!=temp_j){
					ctx.globalAlpha=0.2;
					ctx.fillStyle="#FFFF00";
					ctx.fillRect(40*j,40*i,40,40);
					mouse_map.push(i);
					mouse_map.push(j);
				}
				//mouse_map=[];
				//alert(mouse_map);
				}
			
			}
		    }
		}
		ctx.globalAlpha=1;
		if(mouse_map.length==4){
			searchPath();
			//draw_pannel();
			mouse_map=[];
		}
		else if(mouse_map.length>4){	
			mouse_map=[];
			draw_pannel();
		}
};
function check_win(){
        for(var i=0;i<12;i++){
			for(var j=0;j<14;j++){
				if(map[i][j]!=-1){
					return false;
				}
			}
		}
		clearTimeout(t);
		return true;
}
function timedCount(){
	    var c=Number(document.getElementById("time").innerHTML);
		c=c-1;
		//alert(c);
		document.getElementById("time").innerHTML=c;
		if(c==0){
			clearTimeout(t);
			if(check_win()){
				alert("YOU WIN!");
			}
			else{
				ctx.globalAlpha=0.2;
				draw_pannel();
				alert("YOU LOSE!");
			}
		}
		else if(c<60&&c>0){
			t=setTimeout("timedCount()",1000);
		}
};
function build(i,j) {
	 ctx.beginPath();
	 ctx.fillStyle="#FFFF00";
	 ctx.fillRect(40*j,40*i,40,40);
	 ctx.closePath();
}
function build_wall(r1,c1,r2,c2) {
	 ctx.beginPath();
	 ctx.moveTo(c1*40+20,r1*40+20);
	 ctx.lineTo(c2*40+20,r2*40+20);
	 //ctx.fillStyle="#000";
	 ctx.stroke();
	 ctx.closePath();
}
function build_start_end(r,c) {
	 //ctx.beginPath();
	 
	 var img0=new Image();
	 img0.src="F:/html/js例子/zootetragonoides/flower.png";
	 ctx.drawImage(img0,40*c,40*r,40,40);
	 //alert("aaa");
}

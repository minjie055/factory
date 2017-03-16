// JavaScript Document
function Position(x,y,lastPOS,direct){
	this.X=x;
	this.Y=y;
	this.LastPOS = lastPOS;
	this.direct=direct;
}
Position.prototype.validate = function(currPos,queue,closedQ){
	//1 在方格范围之内的，2 非障碍物，3 不在open列表中，4 不在closed列表中
	//alert(map[currPos.X][currPos.Y]);
	if(currPos.X >=0 && currPos.X < 12 && currPos.Y >=0 && currPos.Y < 14 && map[currPos.X][currPos.Y]==-1 && !queue.has(currPos) && !closedQ.has(currPos)){
		return true;
	}
	return false;
}
Position.prototype.Down = function(queue,closedQ){
	var curr = new Position(this.X + 1, this.Y,this,1);

	//alert(curr.direct);
	if(this.validate(curr,queue,closedQ)){
		curr.LastPOS = this;
		return curr;
	}
	return undefined;
};
Position.prototype.Right = function(queue,closedQ){
	var curr = new Position(this.X, this.Y + 1,this,2);
	if(this.validate(curr,queue,closedQ)){
		curr.LastPOS = this;
		return curr;
	}
	return undefined;
};
Position.prototype.Up = function(queue,closedQ){
	var curr = new Position(this.X - 1, this.Y,this,3);
	if(this.validate(curr,queue,closedQ)){
		curr.LastPOS = this;
		return curr;
	}
	return undefined;
};
Position.prototype.Left = function(queue,closedQ){
	var curr =  new Position(this.X, this.Y - 1,this,4);
	if(this.validate(curr,queue,closedQ)){
		curr.LastPOS = this;
		return curr;
	}
	return undefined;
};
function Queue(){
	var me = this;
	var _list = [];
	this.length = function(){
		return _list.length;
	};
	this._push=function(position){
		//if(startPos.constructor.name != "Position")
		//	throw "Should be Position object.";
		_list.push(position);
		return me;
	}
	this.fetch=function(){
		return _list.shift();
	}
	this._pop=function(){
		return _list.pop();
	}
	this.has=function(position){
		for(var i=0,len=_list.length;i<len;i++){
			if(_list[i].X == position.X && _list[i].Y == position.Y){
				return true;
			}
		}
		return false;
	}
	this.Item = _list;
}

function searchPath(){
	var openQ = new Queue(),found = false;
	var closedQ = new Queue();
	var searchCount = 0;
	var startPos=new Position(mouse_map[0],mouse_map[1]);
	var endPos=new Position(mouse_map[2],mouse_map[3]);
	//alert(endPos.X+"  endPos  "+endPos.Y);
	var temp=map[endPos.X][endPos.Y];
	map[endPos.X][endPos.Y]=-1;
	//alert("temp"+temp+"  "+map[endPos.X][endPos.Y]);
	openQ._push(startPos);
	//alert(startPos.X+"  startPos  "+startPos.Y);
	while(!found && openQ.length() && searchCount < 1000){
		searchCount++;
		var POS = openQ.fetch();
		//alert(POS.X+"  "+POS.Y);
		//build(POS.X,POS.Y);
		closedQ._push(POS);
		if(POS.X == endPos.X && POS.Y == endPos.Y){
			found = true;
		}else{
			var down = POS.Down(openQ,closedQ);
			//alert("down");
			var right = POS.Right(openQ,closedQ);
			var up = POS.Up(openQ,closedQ);
			var left = POS.Left(openQ,closedQ);
			
			if(down) openQ._push(down);
			if(right) openQ._push(right);
			if(up) openQ._push(up);
			if(left) openQ._push(left);
		}
	}
	
	if(found){
		//alert("找到通路！");
		map[endPos.X][endPos.Y]=temp;
		//alert(map[startPos.X][startPos.Y]+"  "+map[endPos.X][endPos.Y]);
		if(map[startPos.X][startPos.Y]!=-1&&map[endPos.X][endPos.Y]!=-1&&map[startPos.X][startPos.Y]==map[endPos.X][endPos.Y]&&check_transition(startPos,closedQ)<3){
		//alert("minjie");
		score=score+2;
		document.getElementById("score").innerHTML=score;
		map[startPos.X][startPos.Y]=-1;
		map[endPos.X][endPos.Y]=-1;
		//alert(map[startPos.X][startPos.Y]);
		build_start_end(startPos.X,startPos.Y);
		build_start_end(endPos.X,endPos.Y);
		paintSearchResult(startPos,closedQ);
		setTimeout(draw_pannel,700);
		mouse_map=[];
		if(check_win()==true){
			alert("YOU WIN!");
			}
		}
	else{
		//to do
		//alert("两张不相同！请重新选择！！");
		mouse_map=[];
		draw_pannel();
	}
}
}
function paintSearchResult(startPos,closedQ){
	var pathLength=0;
	var lastPOS = closedQ._pop();

    var temp;
	while( lastPOS.X!=startPos.X || lastPOS.Y!=startPos.Y){
		//gridUI[lastPOS.X][lastPOS.Y].style.background='#339933';
		temp=lastPOS;
		//setTimeout("build_wall(lastPOS.X,lastPOS.Y)",1000);
		//alert(pathLength+"  "+lastPOS.X+"  "+lastPOS.Y+"  "+lastPOS.direct);
		lastPOS = lastPOS.LastPOS;
		build_wall(temp.X,temp.Y,lastPOS.X,lastPOS.Y);
		pathLength++;
	}

}
function check_transition(startPos,closedQ){
	//alert("check_transition");
    var transition=[];
	var flag=0;
	var lastPOS = closedQ._pop();
	closedQ._push(lastPOS);
	while( lastPOS.X!=startPos.X || lastPOS.Y!=startPos.Y){

		transition.push(lastPOS.direct);

		lastPOS = lastPOS.LastPOS;

	}
	//alert(transition);
	for(var i=0;i<transition.length-1;i++){
	    if(transition[i]!=transition[i+1]){
		   flag=flag+1;
		}
	}
	//alert(flag);
	return  flag;
	
}
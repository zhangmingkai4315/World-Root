(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 使用订阅发布模式实现组件之间通信

var publisher={
  subscribers:{
    any:[]
  },
  subscribe:function(fn,type){
    type=type||'any';
    if(typeof this.subscribers[type]==='undefined'){
      this.subscribers[type]=[];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe:function(fn,type){
    this.visitSubscribers('unsubscribe',fn,type);
  },
  publish:function(publication,type){
    this.visitSubscribers('publish',publication,type)
  },
  visitSubscribers:function(action,arg,type){
    // debugger
    var pubtype=type||'any';
    if(typeof this.subscribers[pubtype]==='undefined'){
          this.subscribers[pubtype]=[];
        }
    var subscribers=this.subscribers[pubtype],
        i,
        max=subscribers.length;
    for(i=0;i<max;i+=1){
      if(action==='publish'){
        subscribers[i](arg);
      }else{
        if(subscribers[i]===arg){
          subscribers.splice(i,1);
        }
      }
    }
  }
};

function makePublisher(o){
  var i;
  for (i in publisher){
    if(publisher.hasOwnProperty(i)&& typeof publisher[i]==='function'){
      o[i]=publisher[i];
    }
  }
  o.subscribers={any:[]};
}


//给Date增加一个属性方法用于格式化输出：
 Date.prototype.yyyymmddHHMM = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours().toString();
   var MM= this.getMinutes().toString();
   return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+(dd[1]?dd:"0"+dd[0])+"-"+
            (hh[1]?hh:"0"+hh[0])+":"+(MM[1]?MM:"0"+MM[0]); // padding
};
// －－－－－－－－－－－－－－使用d3绘制图片－－－－－－－－－－－－－－－－－
window.app_global={allCities:[]}
window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function( callback, element) {
           return window.setTimeout(callback, 1000/60);
         };
})();

d3.helper=d3.helper||{}
d3.helper.EventHandler={}
makePublisher(d3.helper.EventHandler);


d3.helper.addpoint=function(lat,lon,color,blink,number){
  var gpoint = this.g.append("g").attr("class", "rootpoint");
  // debugger
  var x =d3.helper.projection([lat,lon])[0];
  var y =d3.helper.projection([lat,lon])[1];
  var radiation
  if(blink==true){
    radiation =function(){
      gpoint.append('svg:circle')
      .attr({
        cx:x,cy:y,r:1
      }).attr('fill',color)
      .style('opacity','10')
      .transition()
      .duration(3000)
      .delay(Math.random()*5000)
      .attr('r',30)
      .style('opacity','0.001')
      .remove();
      setTimeout(radiation,5000);
    }
  }else{
    radiation=function(){
      gpoint.append('svg:circle')
      .attr({
        cx:x,cy:y,r:1
      }).attr('fill',color)
      .style('opacity','5')
      .transition()
      .duration(3000)
      .delay(Math.random()*5000)
      .attr('r',6)
    }

}
 setTimeout(radiation,100);
}


d3.helper.projectionLatlng=function(projection,latlng){
  var point={};
  point.x =projection([latlng[1],latlng[0]])[0];
  point.y=projection([latlng[1],latlng[0]])[1];
  return point;
}
d3.helper.lngLatToArc=function(projection,sourceLatLnt, targetLatLnt, bend){

        bend = bend || 1;

    if (targetLatLnt && sourceLatLnt) {
      var source={},target={};
          source.x =projection([sourceLatLnt[1],sourceLatLnt[0]])[0];
          source.y=projection([sourceLatLnt[1],sourceLatLnt[0]])[1];
          target.x =projection([targetLatLnt[1],targetLatLnt[0]])[0];
          target.y=projection([targetLatLnt[1],targetLatLnt[0]])[1]
            var dx = target.x - source.x,
                    dy = target.y - source.y,
                    dr = (Math.sqrt(dx * dx + dy * dy)*bend);
            // To avoid a whirlpool effect, make the bend direction consistent regardless of whether the source is east or west of the target
            var west_of_source = (target.x - source.x) < 0;
            if (west_of_source){

        return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0,1 " + target.x + "," + target.y;

        } else {
       return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0,1 " + target.x + "," + target.y;
        }
    // return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0,1 " + target.x + "," + target.y;
}
}

},{}]},{},[1])
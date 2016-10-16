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
d3.helper.addpoint_china=function(lat,lon,color,blink,number){
  var gpoint = this.china_svg.append("g").attr("class", "china_rootpoint");
  var x =d3.helper.china_projection([lat,lon])[0];
  var y =d3.helper.china_projection([lat,lon])[1];
  var radiation
  if(blink==true){
    radiation =function(){
      gpoint.append('svg:circle')
      .attr({
        cx:x,cy:y,r:1
      }).attr('fill',color)
      .style('opacity','10')
      .transition()
      .duration(5000)
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
 setTimeout(radiation,500);
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
function addChinaRootInfo(){
  $('#china_map_panel_0').removeClass('hidden');
  $('#china_map_panel_0').addClass('animated fadeInLeft');
  var china_roots=d3.helper.china_root_servers;
  var mainland_roots=china_roots.filter(function(i){return (i.data.location.indexOf(', CN')!==-1)});
  var hk_roots=china_roots.filter(function(i){return (i.data.location.indexOf(', HK')!==-1)});
  var tw_roots=china_roots.filter(function(i){return (i.data.location.indexOf(', TW')!==-1)});
  var mainland_roots_label=mainland_roots.map(function(i){
    return '<span class="label" style="background-color:'+i.color+'">'+i.data.rootserver+'根</span>';
  }).join(' ');
  var hk_roots_label=hk_roots.map(function(i){
      return '<span class="label" style="background-color:'+i.color+'">'+i.data.rootserver+'根</span>';
    }).join(' ');
  var tw_roots_label=tw_roots.map(function(i){
      return '<span class="label" style="background-color:'+i.color+'">'+i.data.rootserver+'根</span>';
    }).join(' ');
  var html='<h3 class="info_title"><span class="normal">当前中国根镜像数据</h3><hr/><p class="info_normal">总计根镜像: </span><span class="info">'+china_roots.length+' 个</span></p>'+
        '<p><span class="info_normal">大陆地区: </span><span class="info"> '+mainland_roots.length+' 个'+' '+mainland_roots_label+'</p>'+
        '<p><span class="info_normal">香港地区: </span><span class="info"> '+hk_roots.length+' 个'+' '+hk_roots_label+'</p>'+
        '<p><span class="info_normal">台湾地区: </span><span class="info"> '+tw_roots.length+' 个'+' '+tw_roots_label+'</p>';
  d3.select('#china_map_panel_0').html(html);
}
function hiddenChinaRootInfo(){
  $('#china_map_panel_0').addClass('hidden');
}


function SelectWorldButton(){
    console.log('world');
    hiddenChinaRootInfo()
    $('#header_title').text("全球根镜像展示");
    d3.selectAll(".china_rootpoint")
     .remove();
    d3.helper.china_svg.transition()
       .duration(550)
       .attr("transform", "scale(0.1)");
    d3.helper.world_svg.transition()
      .duration(750)
      .delay(150)
      .attr("transform", "scale(1)");
    d3.select('.root_server_zone').classed("hidden",false);
    d3.select('#panel_ping_result').classed("hidden",false);

    d3.helper.servers.map(function(i){
         d3.helper.addpoint(i.latLng[1], i.latLng[0],i.color,true);
      });
}


function SelectChinaButton(){
  console.log('china');
  $('#header_title').text('中国根镜像展示');
  addChinaRootInfo();


  d3.selectAll(".rootpoint")
     .remove();
  var width =window.innerWidth-20, height =window.innerHeight-60;
  // zoom world map
  d3.helper.world_svg.transition()
    .duration(550)
    .attr("transform", "scale(0.1)");
  d3.select('.root_server_zone').classed("hidden",true);
  d3.select('#panel_ping_result').classed("hidden",true);
  d3.helper.china_svg.transition()
     .delay(150)
     .duration(750)
     .attr("transform", "scale(1)");
     // .attr("transform","scale( "+width / 0.7/ Math.PI+")");

   d3.helper.china_root_servers.map(function(i){
        d3.helper.addpoint_china(i.latLng[1], i.latLng[0],i.color,true);
   });
}

},{}]},{},[1])
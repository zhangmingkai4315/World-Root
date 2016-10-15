var root_pingdata=[
  {"title":"A根","subtitle":"美国Verisign, Inc.","ping":174,tag:'A',distination:'nnn1-lon3',number:1},
  {"title":"B根","subtitle":"美国南加州大学(ISI)","ping":205,tag:'B',distination:'b4',number:0},
  {"title":"C根","subtitle":"美国Cogent.","ping":275,tag:'C',distination:'lax1a.c.root-servers.org',number:1},
  {"title":"D根","subtitle":"美国马里兰大学","ping":124,tag:'D',distination:'sgsg2.droot',number:14},
  {"title":"E根","subtitle":"美国NASA研究中心","ping":149,tag:'E',distination:'1.1.e.qpg.pch.net',number:0},
  {"title":"F根","subtitle":"美国ISC","ping":1,tag:'F',distination:'pek2b.f.root-servers.org',number:51},
  {"title":"G根","subtitle":"美国DOD网络信息中心.","ping":478,tag:'G',distination:'g.root-servers-con2-1.net',number:0},
  {"title":"H根","subtitle":"美国军队研究实验室.","ping":368,tag:'H',distination:'003.apg.h.root-servers.org',number:0},
  {"title":"I根","subtitle":"瑞典Netnod","ping":0.5,tag:'I',distination:'s1.bei',number:42},
  {"title":"J根","subtitle":"美国Verisign, Inc.","ping":0.7,tag:'J',distination:'rootns1-elpek3',number:82},
  {"title":"K根","subtitle":"荷兰RIPE NCC","ping":180,tag:'K',distination:'ns2.jp-tyo.k.ripe.net',number:2},
  {"title":"L根","subtitle":"美国ICANN","ping":1.2,tag:'L',distination:'pek01.l.root-servers.org',number:32},
  {"title":"M根","subtitle":"日本WIDE Project","ping":61,tag:'M',distination:'M-NRT-JPNAP-1',number:0},
]
d3.helper.china_root_servers=[];




$(document).ready(function () {
  for(var i=0;i<root_pingdata.length;i++){
    if(root_pingdata[i]['ping']>300){
      $(".list-aggregate").append('<li class="error">'+
      root_pingdata[i]['title']+':'+
      root_pingdata[i]['subtitle']+' 响应时间 '+
      root_pingdata[i]['ping']+'ms </li>')
    }else if(root_pingdata[i]['ping']<10){
      $(".list-aggregate").append('<li class="info">'+
      root_pingdata[i]['title']+':'+
      root_pingdata[i]['subtitle']+' 响应时间 '+
      root_pingdata[i]['ping']+'ms </li>')
    }else{
      $(".list-aggregate").append('<li class="normal">'+
      root_pingdata[i]['title']+':'+
      root_pingdata[i]['subtitle']+' 响应时间 '+
      root_pingdata[i]['ping']+'ms </li>')
    }
  }
  $('#marquee-vertical').marquee({
    css3easing:'ease-in',
    // speed:'1000',
    duplicated: true
  });

});
// global svg

d3.helper.printRootServerWorldMap=function(world,id,servers,width,height){

  var topo,projection,path,svg,g;
  var rootServerList={};
  var centered;
  d3.helper.servers=servers;
  if(d3.helper.china_root_servers.length===0){
    servers.map(function(i){
      if(i.data.location.indexOf(', CN')!==-1||
         i.data.location.indexOf(', TW')!==-1||
         i.data.location.indexOf(', HK')!==-1){
         d3.helper.china_root_servers.push(i);

      }
   });
  }

  // var tooltip = d3.select("#"+id).append("div").attr("class", "tooltip hidden");
  var width =window.innerWidth-20, height =window.innerHeight-60;
  var projection = d3.geo.equirectangular()
    .translate([(width/2.2), (height/1.9)])
    .scale( width / 1.8/ Math.PI);
  d3.helper.projection=projection;
  path = d3.geo.path().projection(projection);
  d3.helper.world_svg= world_svg = d3.select("#"+id).append("svg")
      .attr("width", width)
      .attr("height", height)
      // .style("background-color","rgb(12,51,94)")
      .append("g");
  d3.helper.g = g = world_svg.append("g");
  function clicked(d) {
    // console.log(d)
    var x, y, k;
    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
      console.log(x,y,centroid);
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }
    // console.log(svg.selectAll("path"))
    world_svg.selectAll("path")
        .classed("active", centered && function(d) {
          console.log(centered&&(d === centered));
          return d === centered;
        });

    world_svg.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
  }

  var countries = topojson.feature(world, world.objects.countries).features;
  var countryLoation={};
  var country = g.selectAll(".country").data(countries);
  var locationBySitesName = {};
  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      .on("click", clicked)
      .attr("id", function(d,i) { return d.id; })
      .attr("title", function(d,i) { return d.properties.name; })

  var offsetL = document.getElementById(id).offsetLeft+20;
  var offsetT = document.getElementById(id).offsetTop+10;
  var rootServerList={};
  var colorSchema=d3.scale.category20();

  servers.map(function(i){
    // debugger
    var color=colorSchema(i.data.rootserver.charCodeAt(0)-65);
    if(typeof rootServerList[i.data.rootserver]=="undefined"){
      rootServerList[i.data.rootserver]=color;
    }
    i.color=color;
    d3.helper.addpoint(i.latLng[1], i.latLng[0],color,true);
  });
  d3.helper.rootServerColor=rootServerList;

  var keyList=_.keys(rootServerList);
  var rootList=[]
  for(var key=0;key<keyList.length;key++){
    var rootName=keyList[key];
    rootList.push({'name':rootName,"color":rootServerList[rootName]})
  }
  rootList=_.sortBy(rootList, function(o) { return o.name; });
  // var drawList=function(svg,data){
  var root_info_zone = world_svg.append("g").attr("class","root_server_zone")

  root_info_zone.selectAll('.rootlist')
       .data(rootList)
       .enter()
       .append('circle')
       .attr("transform","translate("+((width-13*36)/2)+","+(height-135)+")")
       .attr({
         cx:function(d,i){
           return i*40;
         },
         cy:40,
         r:function(){
            return 17/1400*window.innerWidth
         },
         fill:function(d){
           return d.color;
         }
       }).on("click",function(d){
            d3.selectAll(".rootpoint").remove();
            var selectedRoot=[]
             servers.map(function(i){
              // debugger
              if(i.data.rootserver==d.name){
                d3.helper.addpoint(i.latLng[1], i.latLng[0],i.color,true);
              }
            });
       }).on("dblclick",function(d){
            d3.selectAll(".rootpoint").remove();
            servers.map(function(i){
               d3.helper.addpoint(i.latLng[1], i.latLng[0],i.color,true);
            });
       });
     root_info_zone.append("g").attr("class","root_server_name").selectAll('.rootServerName')
       .data(rootList)
       .enter()
       .append('text')
       .attr("x",function(d,i){
          return ((width-13*36)/2)+i*40
       })
       .attr({
         'y':height-55,
         "text-anchor":"middle",
       }).style({
         "fill":"rgba(194, 211, 218, 0.9)",
         "text-align":"center",
         "font-weight":"bold",
         "font-size":"1.5em"
       }).text(function(d){
        return d.name
       });
       var ping_array=root_pingdata.map(function(i){
         return i.ping;
       });

       var y = d3.scale.linear()
         .domain([0,d3.max(ping_array)])
         .range([10,200]);



     var tooltip = d3.select("body")
       .append("div")
       .classed("root_ping_info",true)
       .style({"position":"absolute","top":"0px","visibility":"hidden"});
    var panel_height=height/4;
    var panel_width=width/4;
     root_info_zone.append("g").attr("class","root_server_ping").selectAll('.root_ping')
         .data(root_pingdata)
         .enter()
         .append('rect')
         .classed("rect_ping",true)
         .attr("x",function(d,i){
            return ((width-13*37.5)/2)+i*40
         })
         .attr("height",function(d,i){
           return y(d.ping)
         })
         .attr(
           'fill',function(d,i){
            if(d.ping>300){
              return 'rgba(255, 0, 0, 0.43)';
            }else if(d.ping<10){
              return 'rgba(127, 255, 212, 0.5)'
            }else{
              return 'rgba(255, 255, 255, 0.46)';
            }
          }
         )
         .attr({
           rx:2,
           ry:2,
           'y':height-120,
           'width':20,
         })
         .attr("transform", function(d,i){
            return  "translate(0,"+(-y(d.ping))+")";
         }).on("mouseover", function(d){
            tooltip.html("<h4>"+d.title+"</h4><p>"+d.subtitle+"</p><h4>"+d.ping+"ms</h4>");
            return tooltip.style("visibility", "visible");

         })
           .on("mousemove", function(){
              return tooltip.style({"top":((event.pageY-5)+"px"),"left":((event.pageX+2)+"px")});
         })
           .on("mouseout", function(){
                tooltip.text("");
                return tooltip.style({"top":"0px","left":"0px","visibility":"hidden"});
          });

    setInterval(function(){
      var y = d3.scale.linear()
        .domain([0,d3.max(ping_array)])
        .range([10,200]);

      world_svg.selectAll('.rect_ping')
          .data(root_pingdata)
          .transition()
          .duration(1000)
          .delay(Math.random()*2000)
          .attr("height", function(d) {
            var random_value=5*Math.random()*((Math.random()>0.5)?-1:1);
            d.random_value=random_value;
            return (y(d.ping)+random_value)>0?(y(d.ping)+random_value):1;
          }).attr("transform", function(d,i){
            return  "translate(0,"+(-d.random_value-y(d.ping))+")";
          });
    },2000)
}

d3.helper.printChinaMonMap=function(map_data,id,width,height){
  var topo,projection,path,svg,g;
  var width =window.innerWidth-20, height =window.innerHeight-60;
  var china_projection = d3.geo.mercator()
    .translate([-(width/1.7), (height/0.82)])
    .scale( width / 0.52/ Math.PI);
  d3.helper.china_projection=china_projection;
  path = d3.geo.path().projection(china_projection);
  china_svg = d3.select('svg')
      .append("g").attr("transform", "scale(0.1)");;
  d3.helper.china_svg  = china_svg
  var provinces = topojson.feature(map_data, map_data.objects.china).features;
  var provinces = china_svg.selectAll(".province").data(provinces);
  provinces.enter().insert("path")
      .attr("class", "province")
      .attr("d", path)
      .attr("id", function(d,i) { return d.id; })
      .attr("title", function(d,i) { return d.properties.name; })
      .style({
        "stroke":"white",
        "stroke-width":"0.5px",
      });

}

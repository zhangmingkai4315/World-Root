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


d3.helper.printRootServerWorldMap=function(world,id,servers,width,height){
  var topo,projection,path,svg,g;
  var rootServerList={};
  // var tooltip = d3.select("#"+id).append("div").attr("class", "tooltip hidden");
  var width =window.innerWidth-20, height =window.innerHeight-60;
  var projection = d3.geo.equirectangular()
    .translate([(width/2.2), (height/1.9)])
    .scale( width / 1.8/ Math.PI);
  d3.helper.projection=projection;
  path = d3.geo.path().projection(projection);
  svg = d3.select("#"+id).append("svg")
      .attr("width", width)
      .attr("height", height)
      // .style("background-color","rgb(12,51,94)")
      .append("g");
  d3.helper.g = g = svg.append("g");


  var countries = topojson.feature(world, world.objects.countries).features;
  var countryLoation={};
  var country = g.selectAll(".country").data(countries);
  var locationBySitesName = {};
  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
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
  var keyList=_.keys(rootServerList);
  var rootList=[]
  for(var key=0;key<keyList.length;key++){
    var rootName=keyList[key];
    rootList.push({'name':rootName,"color":rootServerList[rootName]})
  }
  rootList=_.sortBy(rootList, function(o) { return o.name; });
  // var drawList=function(svg,data){
  svg.append("g").attr("class","root_server").selectAll('.rootlist')
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
                selectedRoot.push(i)
              }
            });
            selectedRoot.map(function(i){
               d3.helper.addpoint(i.latLng[1], i.latLng[0],i.color,true);
            });
       }).on("dblclick",function(d){
            d3.selectAll(".rootpoint").remove();
            servers.map(function(i){
               d3.helper.addpoint(i.latLng[1], i.latLng[0],i.color,true);
            });
       });
     svg.append("g").attr("class","root_server_name").selectAll('.rootServerName')
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
       .style({"position":"absolute","top":"0px"});
    var panel_height=height/4;
    var panel_width=width/4
     svg.append("g").attr("class","show_panel").append('rect')
     .classed("display_ping_data",true)
     .attr({"x":width/40,"y":height/1.5,"height":panel_height,'width':panel_width});

     var barwidth=(panel_height)/root_pingdata.length;
     var yScale=d3.scale.ordinal().domain(d3.range(root_pingdata.length)).rangeRoundBands([0,panel_height],0.05);
     svg.selectAll('.panel_ping_rect_bar').data(root_pingdata).enter().append('rect')
     .classed("panel_ping_rect_bar",true)
     .attr({
         x:function (d,i) {
            return width/40;
         },
         y:function (d,i) {
         return height/1.5+yScale(i);
         },
         width:function (d,i) {
           return panel_width-20;
         },
         height:function (d,i) {
           return yScale.rangeBand();
         },
        fill:function (d,i) {
           return 'none';
         }
     });

     svg.selectAll('.panel_ping_rect_text').data(root_pingdata).enter().append('text')
      .classed("panel_ping_rect_text",true)
      .text(function (d) {
        return d.subtitle;
      }).attr({
        x:function (d,i) {
          return width/40+15;
          return xScale(i)+xScale.rangeBand()/2;
        },
        y:function (d,i) {
          return height/1.5+yScale(i)+yScale.rangeBand()/2
        }
      }).style({
           "fill":"rgba(194, 211, 218, 0.9)",
           "float":"left",
           "font-size":"0.7em"
      });

      // function redraw(){
      //   var
      // }









    //  svg.select(".show_panel").selectAll('.root_ping_describe')
    //  .data(root_pingdata)
    //  .enter()
    //  .append('text')
    //  .classed("root_ping_describe",true)
    //  .attr('x',function(d,i){
    //    return width/40+15;
    //  })
    //  .attr('y',function(d,i){
    //    return height/1.5+i*16+25;
    //  }).style({
    //    "fill":"rgba(194, 211, 218, 0.9)",
    //    "float":"left",
    //    "font-size":"0.6em"
    //  }).text(function(d){
    //   return d.subtitle;
    //  });

    //  function _rollbar(){
    //     svg.selectAll('.root_ping_describe')
    //     .transition()
    //     .duration(500)
    //     .attr("transform", function(d,i){
    //        return  "translate(0,-16)";
    //     })
    //     setTimeout(_rollbar,2000);
    //  }
     //
    //  var roll_t=setTimeout(_rollbar,1000);

     svg.append("g").attr("class","root_server_ping").selectAll('.root_ping')
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
              return tooltip.style("top", (event.pageY-5)+"px").style("left",(event.pageX+2)+"px");
         })
           .on("mouseout", function(){
                tooltip.text("");
                return tooltip.style("top", "0px").style("left","0px");
          });



}

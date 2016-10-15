import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "backgroundColor": "#1b2b3e"
    },
    "panel_button_group": {
        "float": "right",
        "paddingTop": 1,
        "paddingRight": 1,
        "paddingBottom": 1,
        "paddingLeft": 1
    },
    "button": {
        "background": "rgba(255, 255, 255, 0.18)",
        "color": "rgb(255, 255, 255)",
        "borderRadius": 5,
        "fontSize": "120%",
        "paddingTop": 0.5,
        "paddingRight": 2,
        "paddingBottom": 0.5,
        "paddingLeft": 2,
        "border": "none rgba(0, 0, 0, 0)",
        "display": "inline-block",
        "zoom": 1,
        "lineHeight": "normal",
        "whiteSpace": "nowrap",
        "verticalAlign": "middle",
        "textAlign": "center",
        "cursor": "pointer",
        "WebkitUserDrag": "none",
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "button:hover": {
        "background": "rgba(255, 255, 255, 0.58)"
    },
    "header": {
        "backgroundColor": "rgba(70, 130, 180, 0.35)",
        "paddingTop": 2,
        "paddingRight": 100,
        "paddingBottom": 2,
        "paddingLeft": 100,
        "display": "block",
        "zIndex": 0,
        "position": "absolute",
        "lineHeight": 0.75,
        "left": -50,
        "WebkitTransform": "skew(-25deg)",
        "MozTransform": "skew(-25deg)"
    },
    "header_title": {
        "float": "left",
        "display": "block",
        "fontSize": 2,
        "color": "white",
        "WebkitTransform": "skew(25deg)",
        "MozTransform": "skew(25deg)"
    },
    "h1s-title": {
        "float": "left",
        "marginTop": 300
    },
    "arcs": {
        "fill": "rgba(38, 0, 249, 0.01)",
        "stroke": "rgba(38, 0, 249, 0.04)"
    },
    "gpoint": {
        "fill": "rgb(73,188,255)"
    },
    "country": {
        "fill": "rgba(255, 255, 255, 0.1)",
        "strokeWidth": 0.3,
        "stroke": "white",
        "strokeLinejoin": "round"
    },
    "country:hover": {
        "fill": "rgb(195,233,255)",
        "strokeWidth": 0.1
    },
    "text": {
        "fontSize": 15,
        "color": "white",
        "textTransform": "capitalize"
    },
    "hidden": {
        "display": "none"
    },
    "axis": {
        "shapeRendering": "crispEdges"
    },
    "axis path": {
        "fill": "none",
        "strokeWidth": 0.5,
        "stroke": "orange",
        "shapeRendering": "crispEdges"
    },
    "axis line": {
        "fill": "none",
        "strokeWidth": 0.5,
        "stroke": "orange",
        "shapeRendering": "crispEdges"
    },
    "xaxis path": {
        "stroke": "#fff",
        "display": "none"
    },
    "xaxis line": {
        "stroke": "brue",
        "strokeOpacity": 0.5
    },
    "xaxis tick text": {
        "fill": "white"
    },
    "yaxis line": {
        "stroke": "#ddd"
    },
    "yaxis tick text": {
        "fill": "white"
    },
    "pathline": {
        "fill": "none",
        "stroke": "#fff",
        "strokeWidth": 0.5
    },
    "divtooltip": {
        "color": "#222",
        "background": "#fff",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "textShadow": "#f5f5f5 0 1px 0",
        "borderRadius": 2,
        "boxShadow": "0px 0px 2px 0px #a6a6a6",
        "opacity": 0.9,
        "position": "absolute"
    },
    "graticule": {
        "fill": "none",
        "stroke": "#bbb",
        "strokeWidth": 0.5,
        "strokeOpacity": 0.5
    },
    "arcs path": {
        "strokeWidth": 2,
        "opacity": 0.9,
        "stroke": "tomato",
        "pointerEvents": "none",
        "fill": "none"
    },
    "arcs great-arc-end": {
        "fill": "tomato"
    },
    "boundary": {
        "stroke": "grey",
        "strokeWidth": 0.5
    },
    "province": {
        "fill": "rgba(255, 255, 255, 0.1)",
        "stroke": "grey",
        "strokeWidth": 1.5
    },
    "province:hover": {
        "fill": "rgb(195,233,255)",
        "strokeWidth": 2.5
    },
    "monitor_list:hover": {
        "fill": "white"
    },
    "bar": {
        "fill": "orange"
    },
    "mon_bar:hover": {
        "fill": "orangered"
    },
    "bar:hover": {
        "fill": "orangered"
    },
    "d3-tip": {
        "lineHeight": 1,
        "fontWeight": "bold",
        "paddingTop": 12,
        "paddingRight": 12,
        "paddingBottom": 12,
        "paddingLeft": 12,
        "background": "rgba(0, 0, 0, 0.8)",
        "color": "#fff",
        "borderRadius": 2
    },
    "d3-tip:after": {
        "boxSizing": "border-box",
        "display": "inline",
        "fontSize": 10,
        "width": "100%",
        "lineHeight": 1,
        "color": "rgba(0, 0, 0, 0.8)",
        "content": "\\25BC",
        "position": "absolute",
        "textAlign": "center"
    },
    "d3-tipn:after": {
        "marginTop": -1,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "top": "100%",
        "left": 0
    },
    "axis text": {
        "fontSize": 11
    },
    "root_ping_info": {
        "borderRadius": "5px 5px",
        "backgroundColor": "rgba(15, 26, 33, 0.8)",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "color": "cornsilk",
        "lineHeight": 0.6
    },
    "root_ping_info p": {
        "fontStyle": "italic",
        "fontWeight": "200"
    },
    "panel_ping_result": {
        "position": "absolute",
        "height": 200,
        "width": 320,
        "top": 480,
        "left": 30,
        "backgroundColor": "rgba(128, 129, 132, 0.34)",
        "boxShadow": "0px 0px 2px 0px #a6a6a6"
    },
    "china_map_panel_0": {
        "position": "absolute",
        "height": 200,
        "width": 320,
        "top": 480,
        "left": 30,
        "backgroundColor": "rgba(128, 129, 132, 0.34)",
        "fontSize": 10,
        "boxShadow": "0px 0px 2px 0px #a6a6a6",
        "color": "rgba(255, 255, 255, 0.37)"
    },
    "label": {
        "display": "inline",
        "paddingTop": 0.2,
        "paddingRight": 0.6,
        "paddingBottom": 0.3,
        "paddingLeft": 0.6,
        "fontSize": "75%",
        "fontWeight": "700",
        "lineHeight": 1,
        "color": "#fff",
        "textAlign": "center",
        "whiteSpace": "nowrap",
        "verticalAlign": "baseline",
        "borderRadius": 0.25
    },
    "info_title": {
        "color": "rgba(255, 255, 255, 0.9)",
        "fontSize": 1.6
    },
    "info_normal": {
        "color": "rgba(255, 255, 255, 0.8)",
        "fontSize": 1
    },
    "list-wrpaaer": {
        "height": 200,
        "width": 320,
        "fontSize": 10
    },
    "list-wrpaaer ul": {
        "color": "rgba(255, 255, 255, 0.37)",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 5,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0
    },
    "list-wrpaaer ul li": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 5,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "borderBottom": "0px dotted rgba(255, 255, 255, 0.37)"
    },
    "error": {
        "color": "red"
    },
    "info": {
        "color": "aquamarine"
    },
    "active": {
        "fill": "rgba(255, 0, 0, 0.24)"
    }
});
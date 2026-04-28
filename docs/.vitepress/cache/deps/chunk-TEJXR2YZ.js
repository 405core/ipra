import {
  f
} from "./chunk-DJX4MEFN.js";
import {
  Rt
} from "./chunk-HPIGS4CQ.js";
import {
  ia
} from "./chunk-LKDN26KO.js";
import {
  m,
  r
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-O5ABG6QK.mjs
var a = r(f(), 1);
var x = m((r2, t) => {
  let e = r2.append("rect");
  if (e.attr("x", t.x), e.attr("y", t.y), e.attr("fill", t.fill), e.attr("stroke", t.stroke), e.attr("width", t.width), e.attr("height", t.height), t.name && e.attr("name", t.name), t.rx && e.attr("rx", t.rx), t.ry && e.attr("ry", t.ry), t.attrs !== void 0) for (let n in t.attrs) e.attr(n, t.attrs[n]);
  return t.class && e.attr("class", t.class), e;
}, "drawRect");
var g = m((r2, t) => {
  let e = { x: t.startx, y: t.starty, width: t.stopx - t.startx, height: t.stopy - t.starty, fill: t.fill, stroke: t.stroke, class: "rect" };
  x(r2, e).lower();
}, "drawBackgroundRect");
var f2 = m((r2, t) => {
  let e = t.text.replace(Rt, " "), n = r2.append("text");
  n.attr("x", t.x), n.attr("y", t.y), n.attr("class", "legend"), n.style("text-anchor", t.anchor), t.class && n.attr("class", t.class);
  let s = n.append("tspan");
  return s.attr("x", t.x + t.textMargin * 2), s.text(e), n;
}, "drawText");
var E = m((r2, t, e, n) => {
  let s = r2.append("image");
  s.attr("x", t), s.attr("y", e);
  let i = (0, a.sanitizeUrl)(n);
  s.attr("xlink:href", i);
}, "drawImage");
var h = m((r2, t, e, n) => {
  let s = r2.append("use");
  s.attr("x", t), s.attr("y", e);
  let i = (0, a.sanitizeUrl)(n);
  s.attr("xlink:href", `#${i}`);
}, "drawEmbeddedImage");
var u = m(() => ({ x: 0, y: 0, width: 100, height: 100, fill: "#EDF2AE", stroke: "#666", anchor: "start", rx: 0, ry: 0 }), "getNoteRect");
var G = m(() => ({ x: 0, y: 0, width: 100, height: 100, "text-anchor": "start", style: "#666", textMargin: 0, rx: 0, ry: 0, tspan: true }), "getTextObj");
var T = m(() => {
  let r2 = ia(".mermaidTooltip");
  return r2.empty() && (r2 = ia("body").append("div").attr("class", "mermaidTooltip").style("opacity", 0).style("position", "absolute").style("text-align", "center").style("max-width", "200px").style("padding", "2px").style("font-size", "12px").style("background", "#ffffde").style("border", "1px solid #333").style("border-radius", "2px").style("pointer-events", "none").style("z-index", "100")), r2;
}, "createTooltip");

export {
  x,
  g,
  f2 as f,
  E,
  h,
  u,
  G,
  T
};
//# sourceMappingURL=chunk-TEJXR2YZ.js.map

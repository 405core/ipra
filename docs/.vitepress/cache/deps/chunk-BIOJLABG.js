import {
  qo
} from "./chunk-HPIGS4CQ.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-73ENG63I.mjs
var u = m((t) => {
  let { handDrawnSeed: s } = qo();
  return { fill: t, hachureAngle: 120, hachureGap: 4, fillWeight: 2, roughness: 0.7, stroke: t, seed: s };
}, "solidStateFill");
var p = m((t) => {
  let s = h([...t.cssCompiledStyles || [], ...t.cssStyles || [], ...t.labelStyle || []]);
  return { stylesMap: s, stylesArray: [...s] };
}, "compileStyles");
var h = m((t) => {
  let s = /* @__PURE__ */ new Map();
  return t.forEach((o) => {
    let [n, r] = o.split(":");
    s.set(n.trim(), r == null ? void 0 : r.trim());
  }), s;
}, "styles2Map");
var g = m((t) => t === "color" || t === "font-size" || t === "font-family" || t === "font-weight" || t === "font-style" || t === "text-decoration" || t === "text-align" || t === "text-transform" || t === "line-height" || t === "letter-spacing" || t === "word-spacing" || t === "text-shadow" || t === "text-overflow" || t === "white-space" || t === "word-wrap" || t === "word-break" || t === "overflow-wrap" || t === "hyphens", "isLabelStyle");
var m2 = m((t) => {
  let { stylesArray: s } = p(t), o = [], n = [], r = [], l = [];
  return s.forEach((e) => {
    let a = e[0];
    g(a) ? o.push(e.join(":") + " !important") : (n.push(e.join(":") + " !important"), a.includes("stroke") && r.push(e.join(":") + " !important"), a === "fill" && l.push(e.join(":") + " !important"));
  }), { labelStyles: o.join(";"), nodeStyles: n.join(";"), stylesArray: s, borderStyles: r, backgroundStyles: l };
}, "styles2String");
var S = m((t, s) => {
  var _a;
  let { themeVariables: o, handDrawnSeed: n } = qo(), { nodeBorder: r, mainBkg: l } = o, { stylesMap: e } = p(t);
  return Object.assign({ roughness: 0.7, fill: e.get("fill") || l, fillStyle: "hachure", fillWeight: 4, hachureGap: 5.2, stroke: e.get("stroke") || r, seed: n, strokeWidth: ((_a = e.get("stroke-width")) == null ? void 0 : _a.replace("px", "")) || 1.3, fillLineDash: [0, 0], strokeLineDash: d(e.get("stroke-dasharray")) }, s);
}, "userNodeOverrides");
var d = m((t) => {
  if (!t) return [0, 0];
  let s = t.trim().split(/\s+/).map(Number);
  if (s.length === 1) {
    let r = isNaN(s[0]) ? 0 : s[0];
    return [r, r];
  }
  let o = isNaN(s[0]) ? 0 : s[0], n = isNaN(s[1]) ? 0 : s[1];
  return [o, n];
}, "getStrokeDashArray");

export {
  u,
  p,
  g,
  m2 as m,
  S
};
//# sourceMappingURL=chunk-BIOJLABG.js.map

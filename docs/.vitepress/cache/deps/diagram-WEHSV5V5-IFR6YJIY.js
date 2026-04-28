import {
  c
} from "./chunk-S3XR4SNL.js";
import {
  d as d2
} from "./chunk-PG2EBXFX.js";
import "./chunk-G7CRMAJP.js";
import "./chunk-EUSCIRG4.js";
import "./chunk-KDDFP6PK.js";
import "./chunk-ZJVYFLWS.js";
import "./chunk-CGNTNBTA.js";
import "./chunk-CCKZNSTL.js";
import {
  y
} from "./chunk-HKRTJANV.js";
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  g,
  m as m2
} from "./chunk-BIOJLABG.js";
import {
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  Ur,
  as,
  es,
  hs,
  is,
  ls,
  ns,
  oo,
  os,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  $n,
  He,
  Pn,
  Ua,
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/diagram-WEHSV5V5.mjs
var _a;
var F = (_a = class {
  constructor() {
    this.nodes = [];
    this.levels = /* @__PURE__ */ new Map();
    this.outerNodes = [];
    this.classes = /* @__PURE__ */ new Map();
    this.setAccTitle = es;
    this.getAccTitle = ss;
    this.setDiagramTitle = hs;
    this.getDiagramTitle = ns;
    this.getAccDescription = ls;
    this.setAccDescription = as;
  }
  getNodes() {
    return this.nodes;
  }
  getConfig() {
    let r = oo, i = Ot();
    return Lt({ ...r.treemap, ...i.treemap ?? {} });
  }
  addNode(r, i) {
    this.nodes.push(r), this.levels.set(r, i), i === 0 && (this.outerNodes.push(r), this.root ?? (this.root = r));
  }
  getRoot() {
    return { name: "", children: this.outerNodes };
  }
  addClass(r, i) {
    let l = this.classes.get(r) ?? { id: r, styles: [], textStyles: [] }, o = i.replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    o && o.forEach((s) => {
      g(s) && ((l == null ? void 0 : l.textStyles) ? l.textStyles.push(s) : l.textStyles = [s]), (l == null ? void 0 : l.styles) ? l.styles.push(s) : l.styles = [s];
    }), this.classes.set(r, l);
  }
  getClasses() {
    return this.classes;
  }
  getStylesForClass(r) {
    var _a2;
    return ((_a2 = this.classes.get(r)) == null ? void 0 : _a2.styles) ?? [];
  }
  clear() {
    os(), this.nodes = [], this.levels = /* @__PURE__ */ new Map(), this.outerNodes = [], this.classes = /* @__PURE__ */ new Map(), this.root = void 0;
  }
}, m(_a, "TreeMapDB"), _a);
function ge(m3) {
  if (!m3.length) return [];
  let r = [], i = [];
  return m3.forEach((l) => {
    let o = { name: l.name, children: l.type === "Leaf" ? void 0 : [] };
    for (o.classSelector = l == null ? void 0 : l.classSelector, (l == null ? void 0 : l.cssCompiledStyles) && (o.cssCompiledStyles = l.cssCompiledStyles), l.type === "Leaf" && l.value !== void 0 && (o.value = l.value); i.length > 0 && i[i.length - 1].level >= l.level; ) i.pop();
    if (i.length === 0) r.push(o);
    else {
      let s = i[i.length - 1].node;
      s.children ? s.children.push(o) : s.children = [o];
    }
    l.type !== "Leaf" && i.push({ node: o, level: l.level });
  }), r;
}
m(ge, "buildHierarchy");
var ve = m((m3, r) => {
  c(m3, r);
  let i = [];
  for (let s of m3.TreemapRows ?? []) s.$type === "ClassDefStatement" && r.addClass(s.className ?? "", s.styleText ?? "");
  for (let s of m3.TreemapRows ?? []) {
    let d3 = s.item;
    if (!d3) continue;
    let f = s.indent ? parseInt(s.indent) : 0, R = we(d3), a = d3.classSelector ? r.getStylesForClass(d3.classSelector) : [], A = a.length > 0 ? a : void 0, T = { level: f, name: R, type: d3.$type, value: d3.value, classSelector: d3.classSelector, cssCompiledStyles: A };
    i.push(T);
  }
  let l = ge(i), o = m((s, d3) => {
    for (let f of s) r.addNode(f, d3), f.children && f.children.length > 0 && o(f.children, d3 + 1);
  }, "addNodesRecursively");
  o(l, 0);
}, "populate");
var we = m((m3) => m3.name ? String(m3.name) : "", "getItemName");
var O = { parser: { yy: void 0 }, parse: m(async (m3) => {
  var _a2;
  try {
    let i = await d2("treemap", m3);
    pt.debug("Treemap AST:", i);
    let l = (_a2 = O.parser) == null ? void 0 : _a2.yy;
    if (!(l instanceof F)) throw new Error("parser.parser?.yy was not a TreemapDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");
    ve(i, l);
  } catch (r) {
    throw pt.error("Error parsing treemap:", r), r;
  }
}, "parse") };
var Ne = 10;
var P = 10;
var B = 25;
var Le = m((m3, r, i, l) => {
  let o = l.db, s = o.getConfig(), d3 = s.padding ?? Ne, f = o.getDiagramTitle(), R = o.getRoot(), { themeVariables: a } = Ot();
  if (!R) return;
  let A = f ? 30 : 0, T = d(r), X = s.nodeWidth ? s.nodeWidth * P : 960, Y = s.nodeHeight ? s.nodeHeight * P : 500, G = X, q = Y + A;
  T.attr("viewBox", `0 0 ${G} ${q}`), is(T, q, G, s.useMaxWidth);
  let C;
  try {
    let e = s.valueFormat || ",";
    if (e === "$0,0") C = m((t) => "$" + $n(",")(t), "valueFormat");
    else if (e.startsWith("$") && e.includes(",")) {
      let t = /\.\d+/.exec(e), n = t ? t[0] : "";
      C = m((g2) => "$" + $n("," + n)(g2), "valueFormat");
    } else if (e.startsWith("$")) {
      let t = e.substring(1);
      C = m((n) => "$" + $n(t || "")(n), "valueFormat");
    } else C = $n(e);
  } catch (e) {
    pt.error("Error creating format function:", e), C = $n(",");
  }
  let V = He().range(["transparent", a.cScale0, a.cScale1, a.cScale2, a.cScale3, a.cScale4, a.cScale5, a.cScale6, a.cScale7, a.cScale8, a.cScale9, a.cScale10, a.cScale11]), ye = He().range(["transparent", a.cScalePeer0, a.cScalePeer1, a.cScalePeer2, a.cScalePeer3, a.cScalePeer4, a.cScalePeer5, a.cScalePeer6, a.cScalePeer7, a.cScalePeer8, a.cScalePeer9, a.cScalePeer10, a.cScalePeer11]), H = He().range([a.cScaleLabel0, a.cScaleLabel1, a.cScaleLabel2, a.cScaleLabel3, a.cScaleLabel4, a.cScaleLabel5, a.cScaleLabel6, a.cScaleLabel7, a.cScaleLabel8, a.cScaleLabel9, a.cScaleLabel10, a.cScaleLabel11]);
  f && T.append("text").attr("x", G / 2).attr("y", A / 2).attr("class", "treemapTitle").attr("text-anchor", "middle").attr("dominant-baseline", "middle").text(f);
  let U = T.append("g").attr("transform", `translate(0, ${A})`).attr("class", "treemapContainer"), Se = Pn(R).sum((e) => e.value ?? 0).sort((e, t) => (t.value ?? 0) - (e.value ?? 0)), J = Ua().size([X, Y]).paddingTop((e) => e.children && e.children.length > 0 ? B + P : 0).paddingInner(d3).paddingLeft((e) => e.children && e.children.length > 0 ? P : 0).paddingRight((e) => e.children && e.children.length > 0 ? P : 0).paddingBottom((e) => e.children && e.children.length > 0 ? P : 0).round(true)(Se), be = J.descendants().filter((e) => e.children && e.children.length > 0), z = U.selectAll(".treemapSection").data(be).enter().append("g").attr("class", "treemapSection").attr("transform", (e) => `translate(${e.x0},${e.y0})`);
  z.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", B).attr("class", "treemapSectionHeader").attr("fill", "none").attr("fill-opacity", 0.6).attr("stroke-width", 0.6).attr("style", (e) => e.depth === 0 ? "display: none;" : ""), z.append("clipPath").attr("id", (e, t) => `clip-section-${r}-${t}`).append("rect").attr("width", (e) => Math.max(0, e.x1 - e.x0 - 12)).attr("height", B), z.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", (e) => e.y1 - e.y0).attr("class", (e, t) => `treemapSection section${t}`).attr("fill", (e) => V(e.data.name)).attr("fill-opacity", 0.6).attr("stroke", (e) => ye(e.data.name)).attr("stroke-width", 2).attr("stroke-opacity", 0.4).attr("style", (e) => {
    if (e.depth === 0) return "display: none;";
    let t = m2({ cssCompiledStyles: e.data.cssCompiledStyles });
    return t.nodeStyles + ";" + t.borderStyles.join(";");
  }), z.append("text").attr("class", "treemapSectionLabel").attr("x", 6).attr("y", B / 2).attr("dominant-baseline", "middle").text((e) => e.depth === 0 ? "" : e.data.name).attr("font-weight", "bold").attr("style", (e) => {
    if (e.depth === 0) return "display: none;";
    let t = "dominant-baseline: middle; font-size: 12px; fill:" + H(e.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;", n = m2({ cssCompiledStyles: e.data.cssCompiledStyles });
    return t + n.labelStyles.replace("color:", "fill:");
  }).each(function(e) {
    if (e.depth === 0) return;
    let t = ia(this), n = e.data.name;
    t.text(n);
    let g2 = e.x1 - e.x0, y2 = 6, S;
    s.showValues !== false && e.value ? S = g2 - 10 - 30 - 10 - y2 : S = g2 - y2 - 6;
    let u = Math.max(15, S), c2 = t.node();
    if (c2.getComputedTextLength() > u) {
      let h = n;
      for (; h.length > 0; ) {
        if (h = n.substring(0, h.length - 1), h.length === 0) {
          t.text("..."), c2.getComputedTextLength() > u && t.text("");
          break;
        }
        if (t.text(h + "..."), c2.getComputedTextLength() <= u) break;
      }
    }
  }), s.showValues !== false && z.append("text").attr("class", "treemapSectionValue").attr("x", (e) => e.x1 - e.x0 - 10).attr("y", B / 2).attr("text-anchor", "end").attr("dominant-baseline", "middle").text((e) => e.value ? C(e.value) : "").attr("font-style", "italic").attr("style", (e) => {
    if (e.depth === 0) return "display: none;";
    let t = "text-anchor: end; dominant-baseline: middle; font-size: 10px; fill:" + H(e.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;", n = m2({ cssCompiledStyles: e.data.cssCompiledStyles });
    return t + n.labelStyles.replace("color:", "fill:");
  });
  let xe = J.leaves(), j = U.selectAll(".treemapLeafGroup").data(xe).enter().append("g").attr("class", (e, t) => `treemapNode treemapLeafGroup leaf${t}${e.data.classSelector ? ` ${e.data.classSelector}` : ""}x`).attr("transform", (e) => `translate(${e.x0},${e.y0})`);
  j.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", (e) => e.y1 - e.y0).attr("class", "treemapLeaf").attr("fill", (e) => e.parent ? V(e.parent.data.name) : V(e.data.name)).attr("style", (e) => m2({ cssCompiledStyles: e.data.cssCompiledStyles }).nodeStyles).attr("fill-opacity", 0.3).attr("stroke", (e) => e.parent ? V(e.parent.data.name) : V(e.data.name)).attr("stroke-width", 3), j.append("clipPath").attr("id", (e, t) => `clip-${r}-${t}`).append("rect").attr("width", (e) => Math.max(0, e.x1 - e.x0 - 4)).attr("height", (e) => Math.max(0, e.y1 - e.y0 - 4)), j.append("text").attr("class", "treemapLabel").attr("x", (e) => (e.x1 - e.x0) / 2).attr("y", (e) => (e.y1 - e.y0) / 2).attr("style", (e) => {
    let t = "text-anchor: middle; dominant-baseline: middle; font-size: 38px;fill:" + H(e.data.name) + ";", n = m2({ cssCompiledStyles: e.data.cssCompiledStyles });
    return t + n.labelStyles.replace("color:", "fill:");
  }).attr("clip-path", (e, t) => `url(#clip-${r}-${t})`).text((e) => e.data.name).each(function(e) {
    let t = ia(this), n = e.x1 - e.x0, g2 = e.y1 - e.y0, y2 = t.node(), S = 4, w = n - 2 * S, u = g2 - 2 * S;
    if (w < 10 || u < 10) {
      t.style("display", "none");
      return;
    }
    let c2 = parseInt(t.style("font-size"), 10), D = 8, b = 28, h = 0.6, x = 6, M = 2;
    for (; y2.getComputedTextLength() > w && c2 > D; ) c2--, t.style("font-size", `${c2}px`);
    let N = Math.max(x, Math.min(b, Math.round(c2 * h))), _ = c2 + M + N;
    for (; _ > u && c2 > D && (c2--, N = Math.max(x, Math.min(b, Math.round(c2 * h))), !(N < x && c2 === D)); ) t.style("font-size", `${c2}px`), _ = c2 + M + N, N <= x && _ > u;
    t.style("font-size", `${c2}px`), (y2.getComputedTextLength() > w || c2 < D || u < c2) && t.style("display", "none");
  }), s.showValues !== false && j.append("text").attr("class", "treemapValue").attr("x", (t) => (t.x1 - t.x0) / 2).attr("y", function(t) {
    return (t.y1 - t.y0) / 2;
  }).attr("style", (t) => {
    let n = "text-anchor: middle; dominant-baseline: hanging; font-size: 28px;fill:" + H(t.data.name) + ";", g2 = m2({ cssCompiledStyles: t.data.cssCompiledStyles });
    return n + g2.labelStyles.replace("color:", "fill:");
  }).attr("clip-path", (t, n) => `url(#clip-${r}-${n})`).text((t) => t.value ? C(t.value) : "").each(function(t) {
    let n = ia(this), g2 = this.parentNode;
    if (!g2) {
      n.style("display", "none");
      return;
    }
    let y2 = ia(g2).select(".treemapLabel");
    if (y2.empty() || y2.style("display") === "none") {
      n.style("display", "none");
      return;
    }
    let S = parseFloat(y2.style("font-size")), w = 28, u = 0.6, c2 = 6, D = 2, b = Math.max(c2, Math.min(w, Math.round(S * u)));
    n.style("font-size", `${b}px`);
    let x = (t.y1 - t.y0) / 2 + S / 2 + D;
    n.attr("y", x);
    let M = t.x1 - t.x0, Ce = t.y1 - t.y0 - 4, De = M - 8;
    n.node().getComputedTextLength() > De || x + b > Ce || b < c2 ? n.style("display", "none") : n.style("display", null);
  });
  let Te = s.diagramPadding ?? 8;
  y(T, Te, "flowchart", (s == null ? void 0 : s.useMaxWidth) || false);
}, "draw");
var $e = m(function(m3, r) {
  return r.db.getClasses();
}, "getClasses");
var ue = { draw: Le, getClasses: $e };
var Fe = { sectionStrokeColor: "black", sectionStrokeWidth: "1", sectionFillColor: "#efefef", leafStrokeColor: "black", leafStrokeWidth: "1", leafFillColor: "#efefef", labelFontSize: "12px", valueFontSize: "10px", titleFontSize: "14px" };
var Pe = m(({ treemap: m3 } = {}) => {
  let r = Ur(), i = Ot(), l = Lt(r, i.themeVariables), o = Lt(Fe, m3), s = o.titleColor ?? l.titleColor, d3 = o.labelColor ?? l.textColor, f = o.valueColor ?? l.textColor;
  return `
  .treemapNode.section {
    stroke: ${o.sectionStrokeColor};
    stroke-width: ${o.sectionStrokeWidth};
    fill: ${o.sectionFillColor};
  }
  .treemapNode.leaf {
    stroke: ${o.leafStrokeColor};
    stroke-width: ${o.leafStrokeWidth};
    fill: ${o.leafFillColor};
  }
  .treemapLabel {
    fill: ${d3};
    font-size: ${o.labelFontSize};
  }
  .treemapValue {
    fill: ${f};
    font-size: ${o.valueFontSize};
  }
  .treemapTitle {
    fill: ${s};
    font-size: ${o.titleFontSize};
  }
  `;
}, "getStyles");
var he = Pe;
var ft = { parser: O, get db() {
  return new F();
}, renderer: ue, styles: he };
export {
  ft as diagram
};
//# sourceMappingURL=diagram-WEHSV5V5-IFR6YJIY.js.map

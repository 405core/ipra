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
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  $,
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  as,
  es,
  hs,
  is,
  ls,
  ns,
  oo,
  os,
  qo,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  Ds,
  He,
  ks,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/pieDiagram-3IATQBI2.mjs
var ee = oo.pie;
var C = { sections: /* @__PURE__ */ new Map(), showData: false, config: ee };
var D = C.sections;
var A = C.showData;
var ue = structuredClone(ee);
var Se = m(() => structuredClone(ue), "getConfig");
var he = m(() => {
  D = /* @__PURE__ */ new Map(), A = C.showData, os();
}, "clear");
var ye = m(({ label: e, value: i }) => {
  if (i < 0) throw new Error(`"${e}" has invalid value: ${i}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);
  D.has(e) || (D.set(e, i), pt.debug(`added new section: ${e}, with value: ${i}`));
}, "addSection");
var xe = m(() => D, "getSections");
var Pe = m((e) => {
  A = e;
}, "setShowData");
var we = m(() => A, "getShowData");
var u = { getConfig: Se, clear: he, setDiagramTitle: hs, getDiagramTitle: ns, setAccTitle: es, getAccTitle: ss, setAccDescription: as, getAccDescription: ls, addSection: ye, getSections: xe, setShowData: Pe, getShowData: we };
var Ce = m((e, i) => {
  c(e, i), i.setShowData(e.showData), e.sections.map(i.addSection);
}, "populateDb");
var te = { parse: m(async (e) => {
  let i = await d2("pie", e);
  pt.debug(i), Ce(i, u);
}, "parse") };
var Ae = m((e) => `
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`, "getStyles");
var ie = Ae;
var Te = m((e) => {
  let i = [...e.values()].reduce((n, s) => n + s, 0), T = [...e.entries()].map(([n, s]) => ({ label: n, value: s })).filter((n) => n.value / i * 100 >= 1);
  return Ds().value((n) => n.value).sort(null)(T);
}, "createPieArcs");
var ve = m((e, i, T, v) => {
  var _a;
  pt.debug(`rendering pie chart
` + e);
  let n = v.db, s = qo(), $2 = Lt(n.getConfig(), s.pie), b = 40, a = 18, d3 = 4, c2 = 450, m2 = c2, S = d(i), l = S.append("g");
  l.attr("transform", "translate(" + m2 / 2 + "," + c2 / 2 + ")");
  let { themeVariables: o } = s, [R] = $(o.pieOuterStrokeWidth);
  R ?? (R = 2);
  let E = $2.textPosition, f = Math.min(m2, c2) / 2 - b, oe = ks().innerRadius(0).outerRadius(f), ne = ks().innerRadius(f * E).outerRadius(f * E);
  l.append("circle").attr("cx", 0).attr("cy", 0).attr("r", f + R / 2).attr("class", "pieOuterCircle");
  let g = n.getSections(), ae = Te(g), se = [o.pie1, o.pie2, o.pie3, o.pie4, o.pie5, o.pie6, o.pie7, o.pie8, o.pie9, o.pie10, o.pie11, o.pie12], h = 0;
  g.forEach((t) => {
    h += t;
  });
  let k = ae.filter((t) => (t.data.value / h * 100).toFixed(0) !== "0"), y = He(se).domain([...g.keys()]);
  l.selectAll("mySlices").data(k).enter().append("path").attr("d", oe).attr("fill", (t) => y(t.data.label)).attr("class", "pieCircle"), l.selectAll("mySlices").data(k).enter().append("text").text((t) => (t.data.value / h * 100).toFixed(0) + "%").attr("transform", (t) => "translate(" + ne.centroid(t) + ")").style("text-anchor", "middle").attr("class", "slice");
  let ce = l.append("text").text(n.getDiagramTitle()).attr("x", 0).attr("y", -(c2 - 50) / 2).attr("class", "pieTitleText"), G = [...g.entries()].map(([t, P]) => ({ label: t, value: P })), x = l.selectAll(".legend").data(G).enter().append("g").attr("class", "legend").attr("transform", (t, P) => {
    let j = a + d3, fe = j * G.length / 2, ge = 12 * a, De = P * j - fe;
    return "translate(" + ge + "," + De + ")";
  });
  x.append("rect").attr("width", a).attr("height", a).style("fill", (t) => y(t.label)).style("stroke", (t) => y(t.label)), x.append("text").attr("x", a + d3).attr("y", a - d3).text((t) => n.getShowData() ? `${t.label} [${t.value}]` : t.label);
  let le = Math.max(...x.selectAll("text").nodes().map((t) => (t == null ? void 0 : t.getBoundingClientRect().width) ?? 0)), pe = m2 + b + a + d3 + le, B = ((_a = ce.node()) == null ? void 0 : _a.getBoundingClientRect().width) ?? 0, me = m2 / 2 - B / 2, de = m2 / 2 + B / 2, F = Math.min(0, me), O = Math.max(pe, de) - F;
  S.attr("viewBox", `${F} 0 ${O} ${c2}`), is(S, c2, O, $2.useMaxWidth);
}, "draw");
var re = { draw: ve };
var Ye = { parser: te, db: u, renderer: re, styles: ie };
export {
  Ye as diagram
};
//# sourceMappingURL=pieDiagram-3IATQBI2-CJ4PS5BJ.js.map

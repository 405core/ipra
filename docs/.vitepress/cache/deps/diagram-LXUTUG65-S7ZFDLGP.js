import {
  c
} from "./chunk-S3XR4SNL.js";
import {
  d as d2
} from "./chunk-PG2EBXFX.js";
import {
  s
} from "./chunk-Z75ON5TC.js";
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
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
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
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/diagram-LXUTUG65.mjs
var d3 = new s(() => ({ cnt: 1, stack: [{ id: 0, level: -1, name: "/", children: [] }] }));
var I = m(() => {
  d3.reset(), os();
}, "clear");
var P = m(() => d3.records.stack[0], "getRoot");
var X = m(() => d3.records.cnt, "getCount");
var z = oo.treeView;
var F = m(() => Lt(z, Ot().treeView), "getConfig");
var H = m((e, t) => {
  for (; e <= d3.records.stack[d3.records.stack.length - 1].level; ) d3.records.stack.pop();
  let i = { id: d3.records.cnt++, level: e, name: t, children: [] };
  d3.records.stack[d3.records.stack.length - 1].children.push(i), d3.records.stack.push(i);
}, "addNode");
var M = { clear: I, addNode: H, getRoot: P, getCount: X, getConfig: F, getAccTitle: ss, getAccDescription: ls, getDiagramTitle: ns, setAccDescription: as, setAccTitle: es, setDiagramTitle: hs };
var w = M;
var W = m((e) => {
  c(e, w), e.nodes.map((t) => w.addNode(t.indent ? parseInt(t.indent) : 0, t.name));
}, "populate");
var j = { parse: m(async (e) => {
  let t = await d2("treeView", e);
  pt.debug(t), W(t);
}, "parse") };
var L = m((e, t, i, n, s2) => {
  let l = n.append("text").text(i.name).attr("dominant-baseline", "middle").attr("class", "treeView-node-label"), { height: c2, width: o } = l.node().getBBox(), m2 = c2 + s2.paddingY * 2, a = o + s2.paddingX * 2;
  l.attr("x", e + s2.paddingX), l.attr("y", t + m2 / 2), i.BBox = { x: e, y: t, width: a, height: m2 };
}, "positionLabel");
var A = m((e, t, i, n, s2, l) => e.append("line").attr("x1", t).attr("y1", i).attr("x2", n).attr("y2", s2).attr("stroke-width", l).attr("class", "treeView-node-line"), "positionLine");
var Y = m((e, t, i) => {
  let n = 0, s2 = 0, l = m((o, m2, a, g) => {
    let f = g * (a.rowIndent + a.paddingX);
    L(f, n, m2, o, a);
    let { height: p, width: V } = m2.BBox;
    A(o, f - a.rowIndent, n + p / 2, f, n + p / 2, a.lineThickness), s2 = Math.max(s2, f + V), n += p;
  }, "drawNode"), c2 = m((o, m2 = 0) => {
    l(e, o, i, m2), o.children.forEach((p) => {
      c2(p, m2 + 1);
    });
    let { x: a, y: g, height: f } = o.BBox;
    if (o.children.length) {
      let { y: p, height: V } = o.children[o.children.length - 1].BBox;
      A(e, a + i.paddingX, g + f, a + i.paddingX, p + V / 2 + i.lineThickness / 2, i.lineThickness);
    }
  }, "processNode");
  return c2(t), { totalHeight: n, totalWidth: s2 };
}, "drawTree");
var _ = m((e, t, i, n) => {
  pt.debug(`Rendering treeView diagram
` + e);
  let s2 = n.db, l = s2.getRoot(), c2 = s2.getConfig(), o = d(t), m2 = o.append("g");
  m2.attr("class", "tree-view");
  let { totalHeight: a, totalWidth: g } = Y(m2, l, c2);
  o.attr("viewBox", `-${c2.lineThickness / 2} 0 ${g} ${a}`), is(o, a, g, c2.useMaxWidth);
}, "draw");
var O = { draw: _ };
var q = O;
var U = { labelFontSize: "16px", labelColor: "black", lineColor: "black" };
var J = m(({ treeView: e }) => {
  let { labelFontSize: t, labelColor: i, lineColor: n } = Lt(U, e);
  return `
    .treeView-node-label {
        font-size: ${t};
        fill: ${i};
    }
    .treeView-node-line {
        stroke: ${n};
    }
    `;
}, "styles");
var $ = J;
var Te = { db: w, renderer: q, parser: j, styles: $ };
export {
  Te as diagram
};
//# sourceMappingURL=diagram-LXUTUG65-S7ZFDLGP.js.map

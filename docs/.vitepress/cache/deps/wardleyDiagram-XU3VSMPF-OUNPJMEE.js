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
  as,
  es,
  hs,
  is,
  ls,
  ns,
  os,
  qo,
  ss,
  st
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

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/wardleyDiagram-XU3VSMPF.mjs
var q = m((r, a) => {
  let e = r <= 1 ? r * 100 : r;
  if (e < 0 || e > 100) throw new Error(`${a} must be between 0-1 (decimal) or 0-100 (percentage). Received: ${r}`);
  return e;
}, "toPercent");
var z = m((r, a, e) => ({ x: q(a, `${e} evolution`), y: q(r, `${e} visibility`) }), "toCoordinates");
var ut = m((r) => {
  if (r) {
    if (r === "+<>") return "bidirectional";
    if (r === "+<") return "backward";
    if (r === "+>") return "forward";
  }
}, "getFlowFromPort");
var Ct = m((r) => {
  var _a2;
  if (!(r == null ? void 0 : r.startsWith("+"))) return {};
  let e = (_a2 = /^\+'([^']*)'/.exec(r)) == null ? void 0 : _a2[1];
  return r.includes("<>") ? { flow: "bidirectional", label: e } : r.includes("<") ? { flow: "backward", label: e } : r.includes(">") ? { flow: "forward", label: e } : { label: e };
}, "extractFlowFromArrow");
var St = m((r, a) => {
  if (c(r, a), r.size && a.setSize(r.size.width, r.size.height), r.evolution) {
    let e = r.evolution.stages.map((o) => o.secondName ? `${o.name.trim()} / ${o.secondName.trim()}` : o.name.trim()), f = r.evolution.stages.filter((o) => o.boundary !== void 0).map((o) => o.boundary);
    a.updateAxes({ stages: e, stageBoundaries: f });
  }
  if (r.anchors.forEach((e) => {
    let f = z(e.visibility, e.evolution, `Anchor "${e.name}"`);
    a.addNode(e.name, e.name, f.x, f.y, "anchor");
  }), r.components.forEach((e) => {
    var _a2;
    let f = z(e.visibility, e.evolution, `Component "${e.name}"`), o = e.label ? (e.label.negX ? -1 : 1) * e.label.offsetX : void 0, d3 = e.label ? (e.label.negY ? -1 : 1) * e.label.offsetY : void 0, h = (_a2 = e.decorator) == null ? void 0 : _a2.strategy;
    a.addNode(e.name, e.name, f.x, f.y, "component", o, d3, e.inertia, h);
  }), r.notes.forEach((e) => {
    let f = z(e.visibility, e.evolution, `Note "${e.text}"`);
    a.addNote(e.text, f.x, f.y);
  }), r.pipelines.forEach((e) => {
    let f = a.getNode(e.parent);
    if (!f || typeof f.y != "number") throw new Error(`Pipeline "${e.parent}" must reference an existing component with coordinates.`);
    let o = f.y;
    a.startPipeline(e.parent), e.components.forEach((d3) => {
      let h = `${e.parent}_${d3.name}`, S = d3.label ? (d3.label.negX ? -1 : 1) * d3.label.offsetX : void 0, y = d3.label ? (d3.label.negY ? -1 : 1) * d3.label.offsetY : void 0, I = q(d3.evolution, `Pipeline component "${d3.name}" evolution`);
      a.addNode(h, d3.name, I, o, "pipeline-component", S, y), a.addPipelineComponent(e.parent, h);
    });
  }), r.links.forEach((e) => {
    let f = !!e.arrow && (e.arrow.includes("-.->") || e.arrow.includes(".-.")), o = ut(e.fromPort) ?? ut(e.toPort), { flow: d3, label: h } = Ct(e.arrow);
    !o && d3 && (o = d3);
    let S = e.linkLabel, y = h ?? S;
    a.addLink(e.from, e.to, f, y, o);
  }), r.evolves.forEach((e) => {
    let f = a.getNode(e.component);
    if ((f == null ? void 0 : f.y) !== void 0) {
      let o = q(e.target, `Evolve target for "${e.component}"`);
      a.addTrend(e.component, o, f.y);
    }
  }), r.annotations.length > 0) {
    let e = r.annotations[0], f = z(e.x, e.y, "Annotations box");
    a.setAnnotationsBox(f.x, f.y);
  }
  r.annotation.forEach((e) => {
    let f = z(e.x, e.y, `Annotation ${e.number}`);
    a.addAnnotation(e.number, [{ x: f.x, y: f.y }], e.text);
  }), r.accelerators.forEach((e) => {
    let f = z(e.x, e.y, `Accelerator "${e.name}"`);
    a.addAccelerator(e.name, f.x, f.y);
  }), r.deaccelerators.forEach((e) => {
    let f = z(e.x, e.y, `Deaccelerator "${e.name}"`);
    a.addDeaccelerator(e.name, f.x, f.y);
  });
}, "populateDb");
var U = { parser: { yy: void 0 }, parse: m(async (r) => {
  var _a2;
  let a = await d2("wardley", r);
  pt.debug(a);
  let e = (_a2 = U.parser) == null ? void 0 : _a2.yy;
  if (!e || typeof e.addNode != "function") throw new Error("parser.parser?.yy was not a WardleyDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");
  St(a, e);
}, "parse") };
var _a;
var H = (_a = class {
  constructor() {
    this.nodes = /* @__PURE__ */ new Map();
    this.links = [];
    this.trends = /* @__PURE__ */ new Map();
    this.pipelines = /* @__PURE__ */ new Map();
    this.annotations = [];
    this.notes = [];
    this.accelerators = [];
    this.deaccelerators = [];
    this.axes = {};
  }
  addNode(a) {
    let e = this.nodes.get(a.id) ?? { id: a.id, label: a.label }, f = { ...e, ...a, className: a.className ?? e.className, labelOffsetX: a.labelOffsetX ?? e.labelOffsetX, labelOffsetY: a.labelOffsetY ?? e.labelOffsetY };
    this.nodes.set(a.id, f);
  }
  addLink(a) {
    this.links.push(a);
  }
  addTrend(a) {
    this.trends.set(a.nodeId, a);
  }
  startPipeline(a) {
    this.pipelines.set(a, { nodeId: a, componentIds: [] });
    let e = this.nodes.get(a);
    e && (e.isPipelineParent = true);
  }
  addPipelineComponent(a, e) {
    let f = this.pipelines.get(a);
    f && f.componentIds.push(e);
    let o = this.nodes.get(e);
    o && (o.inPipeline = true);
  }
  addAnnotation(a) {
    this.annotations.push(a);
  }
  addNote(a) {
    this.notes.push(a);
  }
  addAccelerator(a) {
    this.accelerators.push(a);
  }
  addDeaccelerator(a) {
    this.deaccelerators.push(a);
  }
  setAnnotationsBox(a, e) {
    this.annotationsBox = { x: a, y: e };
  }
  setAxes(a) {
    this.axes = { ...this.axes, ...a };
  }
  setSize(a, e) {
    this.size = { width: a, height: e };
  }
  getNode(a) {
    return this.nodes.get(a);
  }
  build() {
    let a = [];
    for (let e of this.nodes.values()) {
      if (typeof e.x != "number" || typeof e.y != "number") throw new Error(`Node "${e.label}" is missing coordinates`);
      a.push(e);
    }
    return { nodes: a, links: [...this.links], trends: [...this.trends.values()], pipelines: [...this.pipelines.values()], annotations: [...this.annotations], notes: [...this.notes], accelerators: [...this.accelerators], deaccelerators: [...this.deaccelerators], annotationsBox: this.annotationsBox, axes: { ...this.axes }, size: this.size };
  }
  clear() {
    this.nodes.clear(), this.links = [], this.trends.clear(), this.pipelines.clear(), this.annotations = [], this.notes = [], this.accelerators = [], this.deaccelerators = [], this.annotationsBox = void 0, this.axes = {}, this.size = void 0;
  }
}, m(_a, "WardleyBuilder"), _a);
var P = new H();
function L(r) {
  let a = qo();
  return st(r.trim(), a);
}
m(L, "textSanitizer");
function Mt() {
  return qo()["wardley-beta"];
}
m(Mt, "getConfig");
function $t(r, a, e, f, o, d3, h, S, y) {
  P.addNode({ id: r, label: L(a), x: e, y: f, className: o, labelOffsetX: d3, labelOffsetY: h, inertia: S, sourceStrategy: y });
}
m($t, "addNode");
function Nt(r, a, e = false, f, o) {
  P.addLink({ source: r, target: a, dashed: e, label: f, flow: o });
}
m(Nt, "addLink");
function Lt(r, a, e) {
  P.addTrend({ nodeId: r, targetX: a, targetY: e });
}
m(Lt, "addTrend");
function vt(r, a, e) {
  P.addAnnotation({ number: r, coordinates: a, text: e ? L(e) : void 0 });
}
m(vt, "addAnnotation");
function At(r, a, e) {
  P.addNote({ text: L(r), x: a, y: e });
}
m(At, "addNote");
function Tt(r, a, e) {
  P.addAccelerator({ name: L(r), x: a, y: e });
}
m(Tt, "addAccelerator");
function zt(r, a, e) {
  P.addDeaccelerator({ name: L(r), x: a, y: e });
}
m(zt, "addDeaccelerator");
function Xt(r, a) {
  P.setAnnotationsBox(r, a);
}
m(Xt, "setAnnotationsBox");
function Bt(r, a) {
  P.setSize(r, a);
}
m(Bt, "setSize");
function Et(r) {
  P.startPipeline(r);
}
m(Et, "startPipeline");
function Yt(r, a) {
  P.addPipelineComponent(r, a);
}
m(Yt, "addPipelineComponent");
function Dt(r) {
  let a = {};
  r.xLabel && (a.xLabel = L(r.xLabel)), r.yLabel && (a.yLabel = L(r.yLabel)), r.stages && (a.stages = r.stages.map((e) => L(e))), r.stageBoundaries && (a.stageBoundaries = r.stageBoundaries), P.setAxes(a);
}
m(Dt, "updateAxes");
function Rt(r) {
  return P.getNode(r);
}
m(Rt, "getNode");
function It() {
  return P.build();
}
m(It, "getWardleyData");
function Ot() {
  P.clear(), os();
}
m(Ot, "clear");
var gt = { getConfig: Mt, addNode: $t, addLink: Nt, addTrend: Lt, addAnnotation: vt, addNote: At, addAccelerator: Tt, addDeaccelerator: zt, setAnnotationsBox: Xt, setSize: Bt, startPipeline: Et, addPipelineComponent: Yt, updateAxes: Dt, getNode: Rt, getWardleyData: It, clear: Ot, setAccTitle: es, getAccTitle: ss, setDiagramTitle: hs, getDiagramTitle: ns, getAccDescription: ls, setAccDescription: as };
var Ft = ["Genesis", "Custom Built", "Product", "Commodity"];
var Gt = m(() => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  let { themeVariables: r } = qo();
  return { backgroundColor: ((_a2 = r.wardley) == null ? void 0 : _a2.backgroundColor) ?? r.background ?? "#fff", axisColor: ((_b = r.wardley) == null ? void 0 : _b.axisColor) ?? "#000", axisTextColor: ((_c = r.wardley) == null ? void 0 : _c.axisTextColor) ?? r.primaryTextColor ?? "#222", gridColor: ((_d = r.wardley) == null ? void 0 : _d.gridColor) ?? "rgba(100, 100, 100, 0.2)", componentFill: ((_e = r.wardley) == null ? void 0 : _e.componentFill) ?? "#fff", componentStroke: ((_f = r.wardley) == null ? void 0 : _f.componentStroke) ?? "#000", componentLabelColor: ((_g = r.wardley) == null ? void 0 : _g.componentLabelColor) ?? r.primaryTextColor ?? "#222", linkStroke: ((_h = r.wardley) == null ? void 0 : _h.linkStroke) ?? "#000", evolutionStroke: ((_i = r.wardley) == null ? void 0 : _i.evolutionStroke) ?? "#dc3545", annotationStroke: ((_j = r.wardley) == null ? void 0 : _j.annotationStroke) ?? "#000", annotationTextColor: ((_k = r.wardley) == null ? void 0 : _k.annotationTextColor) ?? r.primaryTextColor ?? "#222", annotationFill: ((_l = r.wardley) == null ? void 0 : _l.annotationFill) ?? r.background ?? "#fff" };
}, "getTheme");
var jt = m(() => {
  let r = qo()["wardley-beta"];
  return { width: (r == null ? void 0 : r.width) ?? 900, height: (r == null ? void 0 : r.height) ?? 600, padding: (r == null ? void 0 : r.padding) ?? 48, nodeRadius: (r == null ? void 0 : r.nodeRadius) ?? 6, nodeLabelOffset: (r == null ? void 0 : r.nodeLabelOffset) ?? 8, axisFontSize: (r == null ? void 0 : r.axisFontSize) ?? 12, labelFontSize: (r == null ? void 0 : r.labelFontSize) ?? 10, showGrid: (r == null ? void 0 : r.showGrid) ?? false, useMaxWidth: (r == null ? void 0 : r.useMaxWidth) ?? true };
}, "getConfigValues");
var qt = m((r, a, e, f) => {
  var _a2, _b;
  pt.debug(`Rendering Wardley map
` + r);
  let o = jt(), d3 = Gt(), h = o.nodeRadius * 1.6, S = f.db, y = S.getWardleyData(), I = S.getDiagramTitle(), M = ((_a2 = y.size) == null ? void 0 : _a2.width) ?? o.width, w = ((_b = y.size) == null ? void 0 : _b.height) ?? o.height, E = d(a);
  E.selectAll("*").remove(), is(E, w, M, o.useMaxWidth), E.attr("viewBox", `0 0 ${M} ${w}`);
  let W = E.append("g").attr("class", "wardley-map"), V = E.append("defs");
  V.append("marker").attr("id", `arrow-${a}`).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto-start-reverse").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", d3.evolutionStroke).attr("stroke", "none"), V.append("marker").attr("id", `link-arrow-end-${a}`).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerWidth", 5).attr("markerHeight", 5).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", d3.linkStroke).attr("stroke", "none"), V.append("marker").attr("id", `link-arrow-start-${a}`).attr("viewBox", "0 0 10 10").attr("refX", 1).attr("refY", 5).attr("markerWidth", 5).attr("markerHeight", 5).attr("orient", "auto").append("path").attr("d", "M 10 0 L 0 5 L 10 10 z").attr("fill", d3.linkStroke).attr("stroke", "none"), W.append("rect").attr("class", "wardley-background").attr("width", M).attr("height", w).attr("fill", d3.backgroundColor);
  let Y = M - o.padding * 2, D = w - o.padding * 2;
  I && W.append("text").attr("class", "wardley-title").attr("x", M / 2).attr("y", o.padding / 2).attr("fill", d3.axisTextColor).attr("font-size", o.axisFontSize * 1.05).attr("font-weight", "bold").attr("text-anchor", "middle").attr("dominant-baseline", "middle").text(I);
  let v = m((t) => o.padding + t / 100 * Y, "projectX"), A = m((t) => w - o.padding - t / 100 * D, "projectY"), O = W.append("g").attr("class", "wardley-axes");
  O.append("line").attr("x1", o.padding).attr("x2", M - o.padding).attr("y1", w - o.padding).attr("y2", w - o.padding).attr("stroke", d3.axisColor).attr("stroke-width", 1), O.append("line").attr("x1", o.padding).attr("x2", o.padding).attr("y1", o.padding).attr("y2", w - o.padding).attr("stroke", d3.axisColor).attr("stroke-width", 1);
  let yt = y.axes.xLabel ?? "Evolution", xt = y.axes.yLabel ?? "Visibility";
  O.append("text").attr("class", "wardley-axis-label wardley-axis-label-x").attr("x", o.padding + Y / 2).attr("y", w - o.padding / 4).attr("fill", d3.axisTextColor).attr("font-size", o.axisFontSize).attr("font-weight", "bold").attr("text-anchor", "middle").text(yt), O.append("text").attr("class", "wardley-axis-label wardley-axis-label-y").attr("x", o.padding / 3).attr("y", o.padding + D / 2).attr("fill", d3.axisTextColor).attr("font-size", o.axisFontSize).attr("font-weight", "bold").attr("text-anchor", "middle").attr("transform", `rotate(-90 ${o.padding / 3} ${o.padding + D / 2})`).text(xt);
  let R = y.axes.stages && y.axes.stages.length > 0 ? y.axes.stages : Ft;
  if (R.length > 0) {
    let t = W.append("g").attr("class", "wardley-stages"), s = y.axes.stageBoundaries, n = [];
    if (s && s.length === R.length) {
      let i = 0;
      s.forEach((p) => {
        n.push({ start: i, end: p }), i = p;
      });
    } else {
      let i = 1 / R.length;
      R.forEach((p, l) => {
        n.push({ start: l * i, end: (l + 1) * i });
      });
    }
    R.forEach((i, p) => {
      let l = n[p], u = o.padding + l.start * Y, g = o.padding + l.end * Y, x = (u + g) / 2;
      p > 0 && t.append("line").attr("x1", u).attr("x2", u).attr("y1", o.padding).attr("y2", w - o.padding).attr("stroke", "#000").attr("stroke-width", 1).attr("stroke-dasharray", "5 5").attr("opacity", 0.8), t.append("text").attr("class", "wardley-stage-label").attr("x", x).attr("y", w - o.padding / 1.5).attr("fill", d3.axisTextColor).attr("font-size", o.axisFontSize - 2).attr("text-anchor", "middle").text(i);
    });
  }
  if (o.showGrid) {
    let t = W.append("g").attr("class", "wardley-grid");
    for (let s = 1; s < 4; s++) {
      let n = s / 4, i = o.padding + Y * n;
      t.append("line").attr("x1", i).attr("x2", i).attr("y1", o.padding).attr("y2", w - o.padding).attr("stroke", d3.gridColor).attr("stroke-dasharray", "2 6"), t.append("line").attr("x1", o.padding).attr("x2", M - o.padding).attr("y1", w - o.padding - D * n).attr("y2", w - o.padding - D * n).attr("stroke", d3.gridColor).attr("stroke-dasharray", "2 6");
    }
  }
  let c2 = /* @__PURE__ */ new Map();
  if (y.nodes.forEach((t) => {
    c2.set(t.id, { x: v(t.x), y: A(t.y), node: t });
  }), y.pipelines.length > 0) {
    let t = W.append("g").attr("class", "wardley-pipelines"), s = W.append("g").attr("class", "wardley-pipeline-links");
    y.pipelines.forEach((n) => {
      if (n.componentIds.length === 0) return;
      let i = n.componentIds.map((g) => ({ id: g, pos: c2.get(g), node: y.nodes.find((x) => x.id === g) })).filter((g) => g.pos && g.node).sort((g, x) => g.node.x - x.node.x);
      for (let g = 0; g < i.length - 1; g++) {
        let x = i[g], b = i[g + 1];
        s.append("line").attr("class", "wardley-pipeline-evolution-link").attr("x1", x.pos.x).attr("y1", x.pos.y).attr("x2", b.pos.x).attr("y2", b.pos.y).attr("stroke", d3.linkStroke).attr("stroke-width", 1).attr("stroke-dasharray", "4 4");
      }
      let p = 1 / 0, l = -1 / 0, u = 0;
      if (n.componentIds.forEach((g) => {
        let x = c2.get(g);
        x && (p = Math.min(p, x.x), l = Math.max(l, x.x), u = x.y);
      }), p !== 1 / 0 && l !== -1 / 0) {
        let x = o.nodeRadius * 4, b = u - x / 2, C = c2.get(n.nodeId);
        if (C) {
          let N = (p + l) / 2;
          C.x = N, C.y = b - h / 6;
        }
        t.append("rect").attr("class", "wardley-pipeline-box").attr("x", p - 15).attr("y", b).attr("width", l - p + 30).attr("height", x).attr("fill", "none").attr("stroke", d3.axisColor).attr("stroke-width", 1.5).attr("rx", 4).attr("ry", 4);
      }
    });
  }
  let J = W.append("g").attr("class", "wardley-links"), K = /* @__PURE__ */ new Map();
  y.pipelines.forEach((t) => {
    K.set(t.nodeId, new Set(t.componentIds));
  });
  let Q = y.links.filter((t) => {
    var _a3;
    return !(!c2.has(t.source) || !c2.has(t.target) || ((_a3 = K.get(t.target)) == null ? void 0 : _a3.has(t.source)));
  });
  J.selectAll("line").data(Q).enter().append("line").attr("class", (t) => `wardley-link${t.dashed ? " wardley-link--dashed" : ""}`).attr("x1", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), p = y.nodes.find((x) => x.id === t.source).isPipelineParent ? h / Math.sqrt(2) : o.nodeRadius, l = n.x - s.x, u = n.y - s.y, g = Math.sqrt(l * l + u * u);
    return s.x + l / g * p;
  }).attr("y1", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), p = y.nodes.find((x) => x.id === t.source).isPipelineParent ? h / Math.sqrt(2) : o.nodeRadius, l = n.x - s.x, u = n.y - s.y, g = Math.sqrt(l * l + u * u);
    return s.y + u / g * p;
  }).attr("x2", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), p = y.nodes.find((x) => x.id === t.target).isPipelineParent ? h / Math.sqrt(2) : o.nodeRadius, l = s.x - n.x, u = s.y - n.y, g = Math.sqrt(l * l + u * u);
    return n.x + l / g * p;
  }).attr("y2", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), p = y.nodes.find((x) => x.id === t.target).isPipelineParent ? h / Math.sqrt(2) : o.nodeRadius, l = s.x - n.x, u = s.y - n.y, g = Math.sqrt(l * l + u * u);
    return n.y + u / g * p;
  }).attr("stroke", d3.linkStroke).attr("stroke-width", 1).attr("stroke-dasharray", (t) => t.dashed ? "6 6" : null).attr("marker-end", (t) => t.flow === "forward" || t.flow === "bidirectional" ? `url(#link-arrow-end-${a})` : null).attr("marker-start", (t) => t.flow === "backward" || t.flow === "bidirectional" ? `url(#link-arrow-start-${a})` : null), J.selectAll("text").data(Q.filter((t) => t.label)).enter().append("text").attr("class", "wardley-link-label").attr("x", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), i = (s.x + n.x) / 2, p = n.y - s.y, l = n.x - s.x, u = Math.sqrt(l * l + p * p), g = 8, x = p / u;
    return i + x * g;
  }).attr("y", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), i = (s.y + n.y) / 2, p = n.x - s.x, l = n.y - s.y, u = Math.sqrt(p * p + l * l), g = 8, x = -p / u;
    return i + x * g;
  }).attr("fill", d3.axisTextColor).attr("font-size", o.labelFontSize).attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("transform", (t) => {
    let s = c2.get(t.source), n = c2.get(t.target), i = (s.x + n.x) / 2, p = (s.y + n.y) / 2, l = n.x - s.x, u = n.y - s.y, g = Math.sqrt(l * l + u * u), x = 8, b = u / g, C = -l / g, N = i + b * x, F = p + C * x, X = Math.atan2(u, l) * 180 / Math.PI;
    return (X > 90 || X < -90) && (X += 180), `rotate(${X} ${N} ${F})`;
  }).text((t) => t.label);
  let mt = W.append("g").attr("class", "wardley-trends"), ht = y.trends.map((t) => {
    let s = c2.get(t.nodeId);
    if (!s) return null;
    let n = v(t.targetX), i = A(t.targetY), p = n - s.x, l = i - s.y, u = Math.sqrt(p * p + l * l), g = o.nodeRadius + 2, x = u > g ? n - p / u * g : n, b = u > g ? i - l / u * g : i;
    return { origin: s, targetX: n, targetY: i, adjustedX2: x, adjustedY2: b };
  }).filter((t) => t !== null);
  mt.selectAll("line").data(ht).enter().append("line").attr("class", "wardley-trend").attr("x1", (t) => t.origin.x).attr("y1", (t) => t.origin.y).attr("x2", (t) => t.adjustedX2).attr("y2", (t) => t.adjustedY2).attr("stroke", d3.evolutionStroke).attr("stroke-width", 1).attr("stroke-dasharray", "4 4").attr("marker-end", `url(#arrow-${a})`);
  let $ = W.append("g").attr("class", "wardley-nodes").selectAll("g").data(y.nodes).enter().append("g").attr("class", (t) => ["wardley-node", t.className ? `wardley-node--${t.className}` : ""].filter(Boolean).join(" "));
  $.filter((t) => t.sourceStrategy === "outsource").append("circle").attr("class", "wardley-outsource-overlay").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y).attr("r", o.nodeRadius * 2).attr("fill", "#666").attr("stroke", d3.componentStroke).attr("stroke-width", 1), $.filter((t) => t.sourceStrategy === "buy").append("circle").attr("class", "wardley-buy-overlay").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y).attr("r", o.nodeRadius * 2).attr("fill", "#ccc").attr("stroke", d3.componentStroke).attr("stroke-width", 1), $.filter((t) => t.sourceStrategy === "build").append("circle").attr("class", "wardley-build-overlay").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y).attr("r", o.nodeRadius * 2).attr("fill", "#eee").attr("stroke", "#000").attr("stroke-width", 1);
  let T = $.filter((t) => t.sourceStrategy === "market");
  T.append("circle").attr("class", "wardley-market-overlay").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y).attr("r", o.nodeRadius * 2).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 1), $.filter((t) => !t.isPipelineParent && t.sourceStrategy !== "market" && t.className !== "anchor").append("circle").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y).attr("r", o.nodeRadius).attr("fill", d3.componentFill).attr("stroke", d3.componentStroke).attr("stroke-width", 1);
  let _ = o.nodeRadius * 0.7, k = o.nodeRadius * 1.2;
  if (T.append("line").attr("class", "wardley-market-line").attr("x1", (t) => c2.get(t.id).x).attr("y1", (t) => c2.get(t.id).y - k).attr("x2", (t) => c2.get(t.id).x - k * Math.cos(Math.PI / 6)).attr("y2", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("stroke", d3.componentStroke).attr("stroke-width", 1), T.append("line").attr("class", "wardley-market-line").attr("x1", (t) => c2.get(t.id).x - k * Math.cos(Math.PI / 6)).attr("y1", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("x2", (t) => c2.get(t.id).x + k * Math.cos(Math.PI / 6)).attr("y2", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("stroke", d3.componentStroke).attr("stroke-width", 1), T.append("line").attr("class", "wardley-market-line").attr("x1", (t) => c2.get(t.id).x + k * Math.cos(Math.PI / 6)).attr("y1", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("x2", (t) => c2.get(t.id).x).attr("y2", (t) => c2.get(t.id).y - k).attr("stroke", d3.componentStroke).attr("stroke-width", 1), T.append("circle").attr("class", "wardley-market-dot").attr("cx", (t) => c2.get(t.id).x).attr("cy", (t) => c2.get(t.id).y - k).attr("r", _).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 2), T.append("circle").attr("class", "wardley-market-dot").attr("cx", (t) => c2.get(t.id).x - k * Math.cos(Math.PI / 6)).attr("cy", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("r", _).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 2), T.append("circle").attr("class", "wardley-market-dot").attr("cx", (t) => c2.get(t.id).x + k * Math.cos(Math.PI / 6)).attr("cy", (t) => c2.get(t.id).y + k * Math.sin(Math.PI / 6)).attr("r", _).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 2), $.filter((t) => t.isPipelineParent === true).append("rect").attr("x", (t) => c2.get(t.id).x - h / 2).attr("y", (t) => c2.get(t.id).y - h / 2).attr("width", h).attr("height", h).attr("fill", d3.componentFill).attr("stroke", d3.componentStroke).attr("stroke-width", 1), $.filter((t) => t.inertia === true).append("line").attr("class", "wardley-inertia").attr("x1", (t) => {
    let s = c2.get(t.id), n = t.isPipelineParent ? h / 2 + 15 : o.nodeRadius + 15;
    return t.sourceStrategy && (n += o.nodeRadius + 10), s.x + n;
  }).attr("y1", (t) => {
    let s = c2.get(t.id), n = t.isPipelineParent ? h : o.nodeRadius * 2;
    return s.y - n / 2;
  }).attr("x2", (t) => {
    let s = c2.get(t.id), n = t.isPipelineParent ? h / 2 + 15 : o.nodeRadius + 15;
    return t.sourceStrategy && (n += o.nodeRadius + 10), s.x + n;
  }).attr("y2", (t) => {
    let s = c2.get(t.id), n = t.isPipelineParent ? h : o.nodeRadius * 2;
    return s.y + n / 2;
  }).attr("stroke", d3.componentStroke).attr("stroke-width", 6), $.append("text").attr("x", (t) => {
    let s = c2.get(t.id);
    if (t.className === "anchor") return t.labelOffsetX !== void 0 ? s.x + t.labelOffsetX : s.x;
    let n = o.nodeLabelOffset;
    t.sourceStrategy && t.labelOffsetX === void 0 && (n += 10);
    let i = t.labelOffsetX ?? n;
    return s.x + i;
  }).attr("y", (t) => {
    let s = c2.get(t.id);
    if (t.className === "anchor") return t.labelOffsetY !== void 0 ? s.y + t.labelOffsetY : s.y - 3;
    let n = -o.nodeLabelOffset;
    t.sourceStrategy && t.labelOffsetY === void 0 && (n -= 10);
    let i = t.labelOffsetY ?? n;
    return s.y + i;
  }).attr("class", "wardley-node-label").attr("fill", (t) => t.className === "evolved" ? d3.evolutionStroke : t.className === "anchor" ? "#000" : d3.componentLabelColor).attr("font-size", o.labelFontSize).attr("font-weight", (t) => t.className === "anchor" ? "bold" : "normal").attr("text-anchor", (t) => t.className === "anchor" ? "middle" : "start").attr("dominant-baseline", (t) => t.className === "anchor" ? "middle" : "auto").text((t) => t.label), y.annotations.length > 0) {
    let t = W.append("g").attr("class", "wardley-annotations");
    if (y.annotations.forEach((s) => {
      let n = s.coordinates.map((i) => ({ x: v(i.x), y: A(i.y) }));
      if (n.length > 1) for (let i = 0; i < n.length - 1; i++) t.append("line").attr("class", "wardley-annotation-line").attr("x1", n[i].x).attr("y1", n[i].y).attr("x2", n[i + 1].x).attr("y2", n[i + 1].y).attr("stroke", d3.axisColor).attr("stroke-width", 1.5).attr("stroke-dasharray", "4 4");
      n.forEach((i) => {
        let p = t.append("g").attr("class", "wardley-annotation");
        p.append("circle").attr("cx", i.x).attr("cy", i.y).attr("r", 10).attr("fill", "white").attr("stroke", d3.axisColor).attr("stroke-width", 1.5), p.append("text").attr("x", i.x).attr("y", i.y).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", 10).attr("fill", d3.axisTextColor).attr("font-weight", "bold").text(s.number);
      });
    }), y.annotationsBox) {
      let s = v(y.annotationsBox.x), n = A(y.annotationsBox.y), i = 10, p = 16, l = 11, u = t.append("g").attr("class", "wardley-annotations-box"), g = [...y.annotations].filter((b) => b.text).sort((b, C) => b.number - C.number), x = [];
      if (g.forEach((b, C) => {
        let N = u.append("text").attr("x", s + i).attr("y", n + i + (C + 1) * p).attr("font-size", l).attr("fill", d3.axisTextColor).attr("text-anchor", "start").attr("dominant-baseline", "middle").text(`${b.number}. ${b.text}`);
        x.push(N);
      }), x.length > 0) {
        let b = 0, C = 0;
        x.forEach((Z) => {
          let G = Z.node(), Pt = G.getComputedTextLength();
          b = Math.max(b, Pt);
          let Wt = G.getBBox();
          C = Math.max(C, Wt.height);
        });
        let N = b + i * 2 + 105, F = g.length * p + i * 2 + C / 2, X = o.padding, bt = M - o.padding - N, wt = o.padding, kt = w - o.padding - F;
        s = Math.max(X, Math.min(s, bt)), n = Math.max(wt, Math.min(n, kt)), x.forEach((Z, G) => {
          Z.attr("x", s + i).attr("y", n + i + (G + 1) * p);
        }), u.insert("rect", "text").attr("x", s).attr("y", n).attr("width", N).attr("height", F).attr("fill", "white").attr("stroke", d3.axisColor).attr("stroke-width", 1.5).attr("rx", 4).attr("ry", 4);
      }
    }
  }
  if (y.notes.length > 0) {
    let t = W.append("g").attr("class", "wardley-notes");
    y.notes.forEach((s) => {
      let n = v(s.x), i = A(s.y);
      t.append("text").attr("x", n).attr("y", i).attr("text-anchor", "start").attr("font-size", 11).attr("fill", d3.axisTextColor).attr("font-weight", "bold").text(s.text);
    });
  }
  if (y.accelerators.length > 0) {
    let t = W.append("g").attr("class", "wardley-accelerators");
    y.accelerators.forEach((s) => {
      let n = v(s.x), i = A(s.y), p = 60, l = 30, u = 20, g = `
        M ${n} ${i - l / 2}
        L ${n + p - u} ${i - l / 2}
        L ${n + p - u} ${i - l / 2 - 8}
        L ${n + p} ${i}
        L ${n + p - u} ${i + l / 2 + 8}
        L ${n + p - u} ${i + l / 2}
        L ${n} ${i + l / 2}
        Z
      `;
      t.append("path").attr("d", g).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 1), t.append("text").attr("x", n + p / 2).attr("y", i + l / 2 + 15).attr("text-anchor", "middle").attr("font-size", 10).attr("fill", d3.axisTextColor).attr("font-weight", "bold").text(s.name);
    });
  }
  if (y.deaccelerators.length > 0) {
    let t = W.append("g").attr("class", "wardley-deaccelerators");
    y.deaccelerators.forEach((s) => {
      let n = v(s.x), i = A(s.y), p = 60, l = 30, u = 20, g = `
        M ${n + p} ${i - l / 2}
        L ${n + u} ${i - l / 2}
        L ${n + u} ${i - l / 2 - 8}
        L ${n} ${i}
        L ${n + u} ${i + l / 2 + 8}
        L ${n + u} ${i + l / 2}
        L ${n + p} ${i + l / 2}
        Z
      `;
      t.append("path").attr("d", g).attr("fill", "white").attr("stroke", d3.componentStroke).attr("stroke-width", 1), t.append("text").attr("x", n + p / 2).attr("y", i + l / 2 + 15).attr("text-anchor", "middle").attr("font-size", 10).attr("fill", d3.axisTextColor).attr("font-weight", "bold").text(s.name);
    });
  }
}, "draw");
var ft = { draw: qt };
var ye = { parser: U, db: gt, renderer: ft, styles: m(() => "", "styles") };
export {
  ye as diagram
};
//# sourceMappingURL=wardleyDiagram-XU3VSMPF-OUNPJMEE.js.map

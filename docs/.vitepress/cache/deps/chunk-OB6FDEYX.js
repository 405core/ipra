import {
  G,
  d
} from "./chunk-KKUK5XSX.js";
import {
  Vt as Vt2
} from "./chunk-37DMPFOG.js";
import {
  S,
  m as m2,
  p,
  u
} from "./chunk-BIOJLABG.js";
import {
  Lr,
  ve
} from "./chunk-GYGMMI4F.js";
import {
  M,
  Vt,
  Yt
} from "./chunk-DZJA65GQ.js";
import {
  Fo,
  Hi,
  Ot,
  cn,
  ds,
  no,
  qo,
  st
} from "./chunk-HPIGS4CQ.js";
import {
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-SEEX5HTF.mjs
var G2 = m(async (d2, t, c) => {
  var _a, _b;
  let h, a = t.useHtmlLabels || Hi((_a = qo()) == null ? void 0 : _a.htmlLabels);
  c ? h = c : h = "node default";
  let o = d2.insert("g").attr("class", h).attr("id", t.domId || t.id), f = o.insert("g").attr("class", "label").attr("style", Vt(t.labelStyle)), i;
  t.label === void 0 ? i = "" : i = typeof t.label == "string" ? t.label : t.label[0];
  let n = !!t.icon || !!t.img, r = t.labelType === "markdown", e = await Lr(f, st(Yt(i), qo()), { useHtmlLabels: a, width: t.width || ((_b = qo().flowchart) == null ? void 0 : _b.wrappingWidth), classes: r ? "markdown-node-label" : "", style: t.labelStyle, addSvgBackground: n, markdown: r }, qo()), s = e.getBBox(), p2 = ((t == null ? void 0 : t.padding) ?? 0) / 2;
  if (a) {
    let l = e.children[0], m3 = ia(e);
    await G(l, i), s = l.getBoundingClientRect(), m3.attr("width", s.width), m3.attr("height", s.height);
  }
  return a ? f.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")") : f.attr("transform", "translate(0, " + -s.height / 2 + ")"), t.centerLabel && f.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")"), f.insert("rect", ":first-child"), { shapeSvg: o, bbox: s, halfPadding: p2, label: f };
}, "labelHelper");
var Gt = m(async (d2, t, c) => {
  var _a, _b;
  let h = c.useHtmlLabels ?? no(qo()), a = d2.insert("g").attr("class", "label").attr("style", c.labelStyle || ""), o = await Lr(a, st(Yt(t), qo()), { useHtmlLabels: h, width: c.width || ((_b = (_a = qo()) == null ? void 0 : _a.flowchart) == null ? void 0 : _b.wrappingWidth), style: c.labelStyle, addSvgBackground: !!c.icon || !!c.img }), f = o.getBBox(), i = c.padding / 2;
  if (no(qo())) {
    let n = o.children[0], r = ia(o);
    f = n.getBoundingClientRect(), r.attr("width", f.width), r.attr("height", f.height);
  }
  return h ? a.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")") : a.attr("transform", "translate(0, " + -f.height / 2 + ")"), c.centerLabel && a.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), a.insert("rect", ":first-child"), { shapeSvg: d2, bbox: f, halfPadding: i, label: a };
}, "insertLabel");
var v = m((d2, t) => {
  let c = t.node().getBBox();
  d2.width = c.width, d2.height = c.height;
}, "updateNodeBounds");
var T = m((d2, t) => (d2.look === "handDrawn" ? "rough-node" : "node") + " " + d2.cssClasses + " " + (t || ""), "getNodeClasses");
function I(d2) {
  let t = d2.map((c, h) => `${h === 0 ? "M" : "L"}${c.x},${c.y}`);
  return t.push("Z"), t.join(" ");
}
m(I, "createPathFromPoints");
function at(d2, t, c, h, a, o) {
  let f = [], n = c - d2, r = h - t, e = n / o, s = 2 * Math.PI / e, p2 = t + r / 2;
  for (let l = 0; l <= 50; l++) {
    let m3 = l / 50, g = d2 + m3 * n, u2 = p2 + a * Math.sin(s * (g - d2));
    f.push({ x: g, y: u2 });
  }
  return f;
}
m(at, "generateFullSineWavePoints");
function $t(d2, t, c, h, a, o) {
  let f = [], i = a * Math.PI / 180, e = (o * Math.PI / 180 - i) / (h - 1);
  for (let s = 0; s < h; s++) {
    let p2 = i + s * e, l = d2 + c * Math.cos(p2), m3 = t + c * Math.sin(p2);
    f.push({ x: -l, y: -m3 });
  }
  return f;
}
m($t, "generateCirclePoints");
function Wt(d2) {
  let t = Array.from(d2.childNodes).filter((n) => n.tagName === "path"), c = document.createElementNS("http://www.w3.org/2000/svg", "path"), h = t.map((n) => n.getAttribute("d")).filter((n) => n !== null).join(" ");
  c.setAttribute("d", h);
  let a = t.find((n) => n.getAttribute("fill") !== "none"), o = t.find((n) => n.getAttribute("stroke") !== "none"), f = m((n, r) => (n == null ? void 0 : n.getAttribute(r)) ?? void 0, "getAttr");
  if (a) {
    let n = { fill: f(a, "fill"), "fill-opacity": f(a, "fill-opacity") ?? "1" };
    Object.entries(n).forEach(([r, e]) => {
      e && c.setAttribute(r, e);
    });
  }
  if (o) {
    let n = { stroke: f(o, "stroke"), "stroke-width": f(o, "stroke-width") ?? "1", "stroke-opacity": f(o, "stroke-opacity") ?? "1" };
    Object.entries(n).forEach(([r, e]) => {
      e && c.setAttribute(r, e);
    });
  }
  let i = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return i.appendChild(c), i;
}
m(Wt, "mergePaths");
var Ds = m((d2, t) => {
  var c = d2.x, h = d2.y, a = t.x - c, o = t.y - h, f = d2.width / 2, i = d2.height / 2, n, r;
  return Math.abs(o) * f > Math.abs(a) * i ? (o < 0 && (i = -i), n = o === 0 ? 0 : i * a / o, r = i) : (a < 0 && (f = -f), n = f, r = a === 0 ? 0 : f * o / a), { x: c + n, y: h + r };
}, "intersectRect");
var ut = Ds;
var Ps = m(async (d2, t, c, h = false, a = false) => {
  let o = t || "";
  typeof o == "object" && (o = o[0]);
  let f = qo(), i = no(f);
  return await Lr(d2, o, { style: c, isTitle: h, useHtmlLabels: i, markdown: false, isNode: a, width: Number.POSITIVE_INFINITY }, f);
}, "createLabel");
var vt = Ps;
var it = m((d2, t, c, h, a) => ["M", d2 + a, t, "H", d2 + c - a, "A", a, a, 0, 0, 1, d2 + c, t + a, "V", t + h - a, "A", a, a, 0, 0, 1, d2 + c - a, t + h, "H", d2 + a, "A", a, a, 0, 0, 1, d2, t + h - a, "V", t + a, "A", a, a, 0, 0, 1, d2 + a, t, "Z"].join(" "), "createRoundedRectPathD");
var Zt = m(async (d2, t) => {
  pt.info("Creating subgraph rect for ", t.id, t);
  let c = qo(), { themeVariables: h, handDrawnSeed: a } = c, { clusterBkg: o, clusterBorder: f } = h, { labelStyles: i, nodeStyles: n, borderStyles: r, backgroundStyles: e } = m2(t), s = d2.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.domId).attr("data-look", t.look), p2 = no(c), l = s.insert("g").attr("class", "cluster-label "), m3;
  t.labelType === "markdown" ? m3 = await Lr(l, t.label, { style: t.labelStyle, useHtmlLabels: p2, isNode: true, width: t.width }) : m3 = await vt(l, t.label, t.labelStyle || "", false, true);
  let g = m3.getBBox();
  if (no(c)) {
    let C = m3.children[0], R = ia(m3);
    g = C.getBoundingClientRect(), R.attr("width", g.width), R.attr("height", g.height);
  }
  let u2 = t.width <= g.width + t.padding ? g.width + t.padding : t.width;
  t.width <= g.width + t.padding ? t.diff = (u2 - t.width) / 2 - t.padding : t.diff = -t.padding;
  let y = t.height, b = t.x - u2 / 2, S2 = t.y - y / 2;
  pt.trace("Data ", t, JSON.stringify(t));
  let N;
  if (t.look === "handDrawn") {
    let C = Vt2.svg(s), R = S(t, { roughness: 0.7, fill: o, stroke: f, fillWeight: 3, seed: a }), M2 = C.path(it(b, S2, u2, y, 0), R);
    N = s.insert(() => (pt.debug("Rough node insert CXC", M2), M2), ":first-child"), N.select("path:nth-child(2)").attr("style", r.join(";")), N.select("path").attr("style", e.join(";").replace("fill", "stroke"));
  } else N = s.insert("rect", ":first-child"), N.attr("style", n).attr("rx", t.rx).attr("ry", t.ry).attr("x", b).attr("y", S2).attr("width", u2).attr("height", y);
  let { subGraphTitleTopMargin: w } = d(c);
  if (l.attr("transform", `translate(${t.x - g.width / 2}, ${t.y - t.height / 2 + w})`), i) {
    let C = l.select("span");
    C && C.attr("style", i);
  }
  let B = N.node().getBBox();
  return t.offsetX = 0, t.width = B.width, t.height = B.height, t.offsetY = g.height - t.padding / 2, t.intersect = function(C) {
    return ut(t, C);
  }, { cluster: s, labelBBox: g };
}, "rect");
var vs = m((d2, t) => {
  let c = d2.insert("g").attr("class", "note-cluster").attr("id", t.domId), h = c.insert("rect", ":first-child"), a = 0 * t.padding, o = a / 2;
  h.attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - t.width / 2 - o).attr("y", t.y - t.height / 2 - o).attr("width", t.width + a).attr("height", t.height + a).attr("fill", "none");
  let f = h.node().getBBox();
  return t.width = f.width, t.height = f.height, t.intersect = function(i) {
    return ut(t, i);
  }, { cluster: c, labelBBox: { width: 0, height: 0 } };
}, "noteGroup");
var ks = m(async (d2, t) => {
  let c = qo(), { themeVariables: h, handDrawnSeed: a } = c, { altBackground: o, compositeBackground: f, compositeTitleBackground: i, nodeBorder: n } = h, r = d2.insert("g").attr("class", t.cssClasses).attr("id", t.domId).attr("data-id", t.id).attr("data-look", t.look), e = r.insert("g", ":first-child"), s = r.insert("g").attr("class", "cluster-label"), p2 = r.append("rect"), l = await vt(s, t.label, t.labelStyle, void 0, true), m3 = l.getBBox();
  if (no(c)) {
    let M2 = l.children[0], E = ia(l);
    m3 = M2.getBoundingClientRect(), E.attr("width", m3.width), E.attr("height", m3.height);
  }
  let g = 0 * t.padding, u2 = g / 2, y = (t.width <= m3.width + t.padding ? m3.width + t.padding : t.width) + g;
  t.width <= m3.width + t.padding ? t.diff = (y - t.width) / 2 - t.padding : t.diff = -t.padding;
  let b = t.height + g, S2 = t.height + g - m3.height - 6, N = t.x - y / 2, w = t.y - b / 2;
  t.width = y;
  let B = t.y - t.height / 2 - u2 + m3.height + 2, C;
  if (t.look === "handDrawn") {
    let M2 = t.cssClasses.includes("statediagram-cluster-alt"), E = Vt2.svg(r), H = t.rx || t.ry ? E.path(it(N, w, y, b, 10), { roughness: 0.7, fill: i, fillStyle: "solid", stroke: n, seed: a }) : E.rectangle(N, w, y, b, { seed: a });
    C = r.insert(() => H, ":first-child");
    let W = E.rectangle(N, B, y, S2, { fill: M2 ? o : f, fillStyle: M2 ? "hachure" : "solid", stroke: n, seed: a });
    C = r.insert(() => H, ":first-child"), p2 = r.insert(() => W);
  } else C = e.insert("rect", ":first-child"), C.attr("class", "outer").attr("x", N).attr("y", w).attr("width", y).attr("height", b).attr("data-look", t.look), p2.attr("class", "inner").attr("x", N).attr("y", B).attr("width", y).attr("height", S2);
  s.attr("transform", `translate(${t.x - m3.width / 2}, ${w + 1 - (no(c) ? 0 : 3)})`);
  let R = C.node().getBBox();
  return t.height = R.height, t.offsetX = 0, t.offsetY = m3.height - t.padding / 2, t.labelBBox = m3, t.intersect = function(M2) {
    return ut(t, M2);
  }, { cluster: r, labelBBox: m3 };
}, "roundedWithTitle");
var Bs = m(async (d2, t) => {
  pt.info("Creating subgraph rect for ", t.id, t);
  let c = qo(), { themeVariables: h, handDrawnSeed: a } = c, { clusterBkg: o, clusterBorder: f } = h, { labelStyles: i, nodeStyles: n, borderStyles: r, backgroundStyles: e } = m2(t), s = d2.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.domId).attr("data-look", t.look), p2 = no(c), l = s.insert("g").attr("class", "cluster-label "), m3 = await Lr(l, t.label, { style: t.labelStyle, useHtmlLabels: p2, isNode: true, width: t.width }), g = m3.getBBox();
  if (no(c)) {
    let C = m3.children[0], R = ia(m3);
    g = C.getBoundingClientRect(), R.attr("width", g.width), R.attr("height", g.height);
  }
  let u2 = t.width <= g.width + t.padding ? g.width + t.padding : t.width;
  t.width <= g.width + t.padding ? t.diff = (u2 - t.width) / 2 - t.padding : t.diff = -t.padding;
  let y = t.height, b = t.x - u2 / 2, S2 = t.y - y / 2;
  pt.trace("Data ", t, JSON.stringify(t));
  let N;
  if (t.look === "handDrawn") {
    let C = Vt2.svg(s), R = S(t, { roughness: 0.7, fill: o, stroke: f, fillWeight: 4, seed: a }), M2 = C.path(it(b, S2, u2, y, t.rx), R);
    N = s.insert(() => (pt.debug("Rough node insert CXC", M2), M2), ":first-child"), N.select("path:nth-child(2)").attr("style", r.join(";")), N.select("path").attr("style", e.join(";").replace("fill", "stroke"));
  } else N = s.insert("rect", ":first-child"), N.attr("style", n).attr("rx", t.rx).attr("ry", t.ry).attr("x", b).attr("y", S2).attr("width", u2).attr("height", y);
  let { subGraphTitleTopMargin: w } = d(c);
  if (l.attr("transform", `translate(${t.x - g.width / 2}, ${t.y - t.height / 2 + w})`), i) {
    let C = l.select("span");
    C && C.attr("style", i);
  }
  let B = N.node().getBBox();
  return t.offsetX = 0, t.width = B.width, t.height = B.height, t.offsetY = g.height - t.padding / 2, t.intersect = function(C) {
    return ut(t, C);
  }, { cluster: s, labelBBox: g };
}, "kanbanSection");
var Ts = m((d2, t) => {
  let c = qo(), { themeVariables: h, handDrawnSeed: a } = c, { nodeBorder: o } = h, f = d2.insert("g").attr("class", t.cssClasses).attr("id", t.domId).attr("data-look", t.look), i = f.insert("g", ":first-child"), n = 0 * t.padding, r = t.width + n;
  t.diff = -t.padding;
  let e = t.height + n, s = t.x - r / 2, p2 = t.y - e / 2;
  t.width = r;
  let l;
  if (t.look === "handDrawn") {
    let u2 = Vt2.svg(f).rectangle(s, p2, r, e, { fill: "lightgrey", roughness: 0.5, strokeLineDash: [5], stroke: o, seed: a });
    l = f.insert(() => u2, ":first-child");
  } else {
    l = i.insert("rect", ":first-child");
    let g = "outer";
    t.look, g = "divider", l.attr("class", g).attr("x", s).attr("y", p2).attr("width", r).attr("height", e).attr("data-look", t.look);
  }
  let m3 = l.node().getBBox();
  return t.height = m3.height, t.offsetX = 0, t.offsetY = 0, t.intersect = function(g) {
    return ut(t, g);
  }, { cluster: f, labelBBox: {} };
}, "divider");
var Cs = Zt;
var Rs = { rect: Zt, squareRect: Cs, roundedWithTitle: ks, noteGroup: vs, divider: Ts, kanbanSection: Bs };
var Jt = /* @__PURE__ */ new Map();
var Cr = m(async (d2, t) => {
  let c = t.shape || "rect", h = await Rs[c](d2, t);
  return Jt.set(t.id, h), h;
}, "insertCluster");
var Rr = m(() => {
  Jt = /* @__PURE__ */ new Map();
}, "clear");
function Gs(d2, t) {
  return d2.intersect(t);
}
m(Gs, "intersectNode");
var Kt = Gs;
function Ms(d2, t, c, h) {
  var a = d2.x, o = d2.y, f = a - h.x, i = o - h.y, n = Math.sqrt(t * t * i * i + c * c * f * f), r = Math.abs(t * c * f / n);
  h.x < a && (r = -r);
  var e = Math.abs(t * c * i / n);
  return h.y < o && (e = -e), { x: a + r, y: o + e };
}
m(Ms, "intersectEllipse");
var Mt = Ms;
function Es(d2, t, c) {
  return Mt(d2, t, t, c);
}
m(Es, "intersectCircle");
var Qt = Es;
function Hs(d2, t, c, h) {
  {
    let a = t.y - d2.y, o = d2.x - t.x, f = t.x * d2.y - d2.x * t.y, i = a * c.x + o * c.y + f, n = a * h.x + o * h.y + f, r = 1e-6;
    if (i !== 0 && n !== 0 && te(i, n)) return;
    let e = h.y - c.y, s = c.x - h.x, p2 = h.x * c.y - c.x * h.y, l = e * d2.x + s * d2.y + p2, m3 = e * t.x + s * t.y + p2;
    if (Math.abs(l) < r && Math.abs(m3) < r && te(l, m3)) return;
    let g = a * s - e * o;
    if (g === 0) return;
    let u2 = Math.abs(g / 2), y = o * p2 - s * f, b = y < 0 ? (y - u2) / g : (y + u2) / g;
    y = e * f - a * p2;
    let S2 = y < 0 ? (y - u2) / g : (y + u2) / g;
    return { x: b, y: S2 };
  }
}
m(Hs, "intersectLine");
function te(d2, t) {
  return d2 * t > 0;
}
m(te, "sameSign");
var ee = Hs;
function js(d2, t, c) {
  let h = d2.x, a = d2.y, o = [], f = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(e) {
    f = Math.min(f, e.x), i = Math.min(i, e.y);
  }) : (f = Math.min(f, t.x), i = Math.min(i, t.y));
  let n = h - d2.width / 2 - f, r = a - d2.height / 2 - i;
  for (let e = 0; e < t.length; e++) {
    let s = t[e], p2 = t[e < t.length - 1 ? e + 1 : 0], l = ee(d2, c, { x: n + s.x, y: r + s.y }, { x: n + p2.x, y: r + p2.y });
    l && o.push(l);
  }
  return o.length ? (o.length > 1 && o.sort(function(e, s) {
    let p2 = e.x - c.x, l = e.y - c.y, m3 = Math.sqrt(p2 * p2 + l * l), g = s.x - c.x, u2 = s.y - c.y, y = Math.sqrt(g * g + u2 * u2);
    return m3 < y ? -1 : m3 === y ? 0 : 1;
  }), o[0]) : d2;
}
m(js, "intersectPolygon");
var se = js;
var $ = { node: Kt, circle: Qt, ellipse: Mt, polygon: se, rect: ut };
function re(d2, t) {
  let { labelStyles: c } = m2(t);
  t.labelStyle = c;
  let h = T(t), a = h;
  h || (a = "anchor");
  let o = d2.insert("g").attr("class", a).attr("id", t.domId || t.id), f = 1, { cssStyles: i } = t, n = Vt2.svg(o), r = S(t, { fill: "black", stroke: "none", fillStyle: "solid" });
  t.look !== "handDrawn" && (r.roughness = 0);
  let e = n.circle(0, 0, f * 2, r), s = o.insert(() => e, ":first-child");
  return s.attr("class", "anchor").attr("style", Vt(i)), v(t, s), t.intersect = function(p2) {
    return pt.info("Circle intersect", t, f, p2), $.circle(t, f, p2);
  }, o;
}
m(re, "anchor");
function ie(d2, t, c, h, a, o, f) {
  let n = (d2 + c) / 2, r = (t + h) / 2, e = Math.atan2(h - t, c - d2), s = (c - d2) / 2, p2 = (h - t) / 2, l = s / a, m3 = p2 / o, g = Math.sqrt(l ** 2 + m3 ** 2);
  if (g > 1) throw new Error("The given radii are too small to create an arc between the points.");
  let u2 = Math.sqrt(1 - g ** 2), y = n + u2 * o * Math.sin(e) * (f ? -1 : 1), b = r - u2 * a * Math.cos(e) * (f ? -1 : 1), S2 = Math.atan2((t - b) / o, (d2 - y) / a), w = Math.atan2((h - b) / o, (c - y) / a) - S2;
  f && w < 0 && (w += 2 * Math.PI), !f && w > 0 && (w -= 2 * Math.PI);
  let B = [];
  for (let C = 0; C < 20; C++) {
    let R = C / 19, M2 = S2 + R * w, E = y + a * Math.cos(M2), H = b + o * Math.sin(M2);
    B.push({ x: E, y: H });
  }
  return B;
}
m(ie, "generateArcPoints");
function As(d2, t, c) {
  let [h, a] = [t, c].sort((o, f) => f - o);
  return a * (1 - Math.sqrt(1 - (d2 / h / 2) ** 2));
}
m(As, "calculateArcSagitta");
async function oe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a, i = m((M2) => M2 + f, "calcTotalHeight"), n = m((M2) => {
    let E = M2 / 2;
    return [E / (2.5 + M2 / 50), E];
  }, "calcEllipseRadius"), { shapeSvg: r, bbox: e } = await G2(d2, t, T(t)), s = i((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : e.height), [p2, l] = n(s), m3 = As(s, p2, l), u2 = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : e.width) + o * 2 + m3 - m3, y = s, { cssStyles: b } = t, S2 = [{ x: u2 / 2, y: -y / 2 }, { x: -u2 / 2, y: -y / 2 }, ...ie(-u2 / 2, -y / 2, -u2 / 2, y / 2, p2, l, false), { x: u2 / 2, y: y / 2 }, ...ie(u2 / 2, y / 2, u2 / 2, -y / 2, p2, l, true)], N = Vt2.svg(r), w = S(t, {});
  t.look !== "handDrawn" && (w.roughness = 0, w.fillStyle = "solid");
  let B = I(S2), C = N.path(B, w), R = r.insert(() => C, ":first-child");
  return R.attr("class", "basic label-container outer-path"), b && t.look !== "handDrawn" && R.selectAll("path").attr("style", b), h && t.look !== "handDrawn" && R.selectAll("path").attr("style", h), R.attr("transform", `translate(${p2 / 2}, 0)`), v(t, R), t.intersect = function(M2) {
    return $.polygon(t, S2, M2);
  }, r;
}
m(oe, "bowTieRect");
function et(d2, t, c, h) {
  return d2.insert("polygon", ":first-child").attr("points", h.map(function(a) {
    return a.x + "," + a.y;
  }).join(" ")).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + c / 2 + ")");
}
m(et, "insertPolygonShape");
var Et = 12;
async function ae(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 28 : a, f = t.look === "neo" ? 24 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ?? n.width) + (t.look === "neo" ? o * 2 : o + Et), e = ((t == null ? void 0 : t.height) ?? n.height) + (t.look === "neo" ? f * 2 : f), s = 0, p2 = r, l = -e, m3 = 0, g = [{ x: s + Et, y: l }, { x: p2, y: l }, { x: p2, y: m3 }, { x: s, y: m3 }, { x: s, y: l + Et }, { x: s + Et, y: l }], u2, { cssStyles: y } = t;
  if (t.look === "handDrawn") {
    let b = Vt2.svg(i), S2 = S(t, {}), N = I(g), w = b.path(N, S2);
    u2 = i.insert(() => w, ":first-child").attr("transform", `translate(${-r / 2}, ${e / 2})`), y && u2.attr("style", y);
  } else u2 = et(i, r, e, g);
  return h && u2.attr("style", h), v(t, u2), t.intersect = function(b) {
    return $.polygon(t, g, b);
  }, i;
}
m(ae, "card");
function ne(d2, t) {
  let { nodeStyles: c } = m2(t);
  t.label = "";
  let h = d2.insert("g").attr("class", T(t)).attr("id", t.domId ?? t.id), { cssStyles: a } = t, o = Math.max(28, t.width ?? 0), f = [{ x: 0, y: o / 2 }, { x: o / 2, y: 0 }, { x: 0, y: -o / 2 }, { x: -o / 2, y: 0 }], i = Vt2.svg(h), n = S(t, {});
  t.look !== "handDrawn" && (n.roughness = 0, n.fillStyle = "solid");
  let r = I(f), e = i.path(r, n), s = h.insert(() => e, ":first-child");
  return a && t.look !== "handDrawn" && s.selectAll("path").attr("style", a), c && t.look !== "handDrawn" && s.selectAll("path").attr("style", c), t.width = 28, t.height = 28, t.intersect = function(p2) {
    return $.polygon(t, f, p2);
  }, h;
}
m(ne, "choice");
async function Ht(d2, t, c) {
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.labelStyle = h;
  let { shapeSvg: o, bbox: f, halfPadding: i } = await G2(d2, t, T(t)), n = 16, r = (c == null ? void 0 : c.padding) ?? i, e = t.look === "neo" ? f.width / 2 + n * 2 : f.width / 2 + r, s, { cssStyles: p2 } = t;
  if (t.look === "handDrawn") {
    let l = Vt2.svg(o), m3 = S(t, {}), g = l.circle(0, 0, e * 2, m3);
    s = o.insert(() => g, ":first-child"), s.attr("class", "basic label-container").attr("style", Vt(p2));
  } else s = o.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", a).attr("r", e).attr("cx", 0).attr("cy", 0);
  return v(t, s), t.calcIntersect = function(l, m3) {
    let g = l.width / 2;
    return $.circle(l, g, m3);
  }, t.intersect = function(l) {
    return pt.info("Circle intersect", t, e, l), $.circle(t, e, l);
  }, o;
}
m(Ht, "circle");
function Os(d2) {
  let t = Math.cos(Math.PI / 4), c = Math.sin(Math.PI / 4), h = d2 * 2, a = { x: h / 2 * t, y: h / 2 * c }, o = { x: -(h / 2) * t, y: h / 2 * c }, f = { x: -(h / 2) * t, y: -(h / 2) * c }, i = { x: h / 2 * t, y: -(h / 2) * c };
  return `M ${o.x},${o.y} L ${i.x},${i.y}
                   M ${a.x},${a.y} L ${f.x},${f.y}`;
}
m(Os, "createLine");
function le(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c, t.label = "";
  let a = d2.insert("g").attr("class", T(t)).attr("id", t.domId ?? t.id), o = Math.max(30, (t == null ? void 0 : t.width) ?? 0), { cssStyles: f } = t, i = Vt2.svg(a), n = S(t, {});
  t.look !== "handDrawn" && (n.roughness = 0, n.fillStyle = "solid");
  let r = i.circle(0, 0, o * 2, n), e = Os(o), s = i.path(e, n), p2 = a.insert(() => r, ":first-child");
  return p2.insert(() => s), p2.attr("class", "outer-path"), f && t.look !== "handDrawn" && p2.selectAll("path").attr("style", f), h && t.look !== "handDrawn" && p2.selectAll("path").attr("style", h), v(t, p2), t.intersect = function(l) {
    return pt.info("crossedCircle intersect", t, { radius: o, point: l }), $.circle(t, o, l);
  }, a;
}
m(le, "crossedCircle");
function xt(d2, t, c, h = 100, a = 0, o = 180) {
  let f = [], i = a * Math.PI / 180, e = (o * Math.PI / 180 - i) / (h - 1);
  for (let s = 0; s < h; s++) {
    let p2 = i + s * e, l = d2 + c * Math.cos(p2), m3 = t + c * Math.sin(p2);
    f.push({ x: -l, y: -m3 });
  }
  return f;
}
m(xt, "generateCirclePoints");
async function ce(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, label: f } = await G2(d2, t, T(t)), i = t.look === "neo" ? 18 : t.padding ?? 0, n = t.look === "neo" ? 12 : t.padding ?? 0, r = o.width + i, e = o.height + n, s = Math.max(5, e * 0.1), { cssStyles: p2 } = t, l = [...xt(r / 2, -e / 2, s, 30, -90, 0), { x: -r / 2 - s, y: s }, ...xt(r / 2 + s * 2, -s, s, 20, -180, -270), ...xt(r / 2 + s * 2, s, s, 20, -90, -180), { x: -r / 2 - s, y: -e / 2 }, ...xt(r / 2, e / 2, s, 20, 0, 90)], m3 = [{ x: r / 2, y: -e / 2 - s }, { x: -r / 2, y: -e / 2 - s }, ...xt(r / 2, -e / 2, s, 20, -90, 0), { x: -r / 2 - s, y: -s }, ...xt(r / 2 + r * 0.1, -s, s, 20, -180, -270), ...xt(r / 2 + r * 0.1, s, s, 20, -90, -180), { x: -r / 2 - s, y: e / 2 }, ...xt(r / 2, e / 2, s, 20, 0, 90), { x: -r / 2, y: e / 2 + s }, { x: r / 2, y: e / 2 + s }], g = Vt2.svg(a), u2 = S(t, { fill: "none" });
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let b = I(l).replace("Z", ""), S2 = g.path(b, u2), N = I(m3), w = g.path(N, { ...u2 }), B = a.insert("g", ":first-child");
  return B.insert(() => w, ":first-child").attr("stroke-opacity", 0), B.insert(() => S2, ":first-child"), B.attr("class", "text"), p2 && t.look !== "handDrawn" && B.selectAll("path").attr("style", p2), h && t.look !== "handDrawn" && B.selectAll("path").attr("style", h), B.attr("transform", `translate(${s}, 0)`), f.attr("transform", `translate(${-r / 2 + s - (o.x - (o.left ?? 0))},${-e / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`), v(t, B), t.intersect = function(C) {
    return $.polygon(t, m3, C);
  }, a;
}
m(ce, "curlyBraceLeft");
function bt(d2, t, c, h = 100, a = 0, o = 180) {
  let f = [], i = a * Math.PI / 180, e = (o * Math.PI / 180 - i) / (h - 1);
  for (let s = 0; s < h; s++) {
    let p2 = i + s * e, l = d2 + c * Math.cos(p2), m3 = t + c * Math.sin(p2);
    f.push({ x: l, y: m3 });
  }
  return f;
}
m(bt, "generateCirclePoints");
async function he(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, label: f } = await G2(d2, t, T(t)), i = t.look === "neo" ? 18 : t.padding ?? 0, n = t.look === "neo" ? 12 : t.padding ?? 0, r = o.width + (t.look === "neo" ? i * 2 : i), e = o.height + (t.look === "neo" ? n * 2 : n), s = Math.max(5, e * 0.1), { cssStyles: p2 } = t, l = [...bt(r / 2, -e / 2, s, 20, -90, 0), { x: r / 2 + s, y: -s }, ...bt(r / 2 + s * 2, -s, s, 20, -180, -270), ...bt(r / 2 + s * 2, s, s, 20, -90, -180), { x: r / 2 + s, y: e / 2 }, ...bt(r / 2, e / 2, s, 20, 0, 90)], m3 = [{ x: -r / 2, y: -e / 2 - s }, { x: r / 2, y: -e / 2 - s }, ...bt(r / 2, -e / 2, s, 20, -90, 0), { x: r / 2 + s, y: -s }, ...bt(r / 2 + s * 2, -s, s, 20, -180, -270), ...bt(r / 2 + s * 2, s, s, 20, -90, -180), { x: r / 2 + s, y: e / 2 }, ...bt(r / 2, e / 2, s, 20, 0, 90), { x: r / 2, y: e / 2 + s }, { x: -r / 2, y: e / 2 + s }], g = Vt2.svg(a), u2 = S(t, { fill: "none" });
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let b = I(l).replace("Z", ""), S2 = g.path(b, u2), N = I(m3), w = g.path(N, { ...u2 }), B = a.insert("g", ":first-child");
  return B.insert(() => w, ":first-child").attr("stroke-opacity", 0), B.insert(() => S2, ":first-child"), B.attr("class", "text"), p2 && t.look !== "handDrawn" && B.selectAll("path").attr("style", p2), h && t.look !== "handDrawn" && B.selectAll("path").attr("style", h), B.attr("transform", `translate(${-s}, 0)`), f.attr("transform", `translate(${-r / 2 + (t.padding ?? 0) / 2 - (o.x - (o.left ?? 0))},${-e / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`), v(t, B), t.intersect = function(C) {
    return $.polygon(t, m3, C);
  }, a;
}
m(he, "curlyBraceRight");
function st2(d2, t, c, h = 100, a = 0, o = 180) {
  let f = [], i = a * Math.PI / 180, e = (o * Math.PI / 180 - i) / (h - 1);
  for (let s = 0; s < h; s++) {
    let p2 = i + s * e, l = d2 + c * Math.cos(p2), m3 = t + c * Math.sin(p2);
    f.push({ x: -l, y: -m3 });
  }
  return f;
}
m(st2, "generateCirclePoints");
async function pe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, label: f } = await G2(d2, t, T(t)), i = t.look === "neo" ? 18 : t.padding ?? 0, n = t.look === "neo" ? 12 : t.padding ?? 0, r = o.width + (t.look === "neo" ? i * 2 : i), e = o.height + (t.look === "neo" ? n * 2 : n), s = Math.max(5, e * 0.1), { cssStyles: p2 } = t, l = [...st2(r / 2, -e / 2, s, 30, -90, 0), { x: -r / 2 - s, y: s }, ...st2(r / 2 + s * 2, -s, s, 20, -180, -270), ...st2(r / 2 + s * 2, s, s, 20, -90, -180), { x: -r / 2 - s, y: -e / 2 }, ...st2(r / 2, e / 2, s, 20, 0, 90)], m3 = [...st2(-r / 2 + s + s / 2, -e / 2, s, 20, -90, -180), { x: r / 2 - s / 2, y: s }, ...st2(-r / 2 - s / 2, -s, s, 20, 0, 90), ...st2(-r / 2 - s / 2, s, s, 20, -90, 0), { x: r / 2 - s / 2, y: -s }, ...st2(-r / 2 + s + s / 2, e / 2, s, 30, -180, -270)], g = [{ x: r / 2, y: -e / 2 - s }, { x: -r / 2, y: -e / 2 - s }, ...st2(r / 2, -e / 2, s, 20, -90, 0), { x: -r / 2 - s, y: -s }, ...st2(r / 2 + s * 2, -s, s, 20, -180, -270), ...st2(r / 2 + s * 2, s, s, 20, -90, -180), { x: -r / 2 - s, y: e / 2 }, ...st2(r / 2, e / 2, s, 20, 0, 90), { x: -r / 2, y: e / 2 + s }, { x: r / 2 - s - s / 2, y: e / 2 + s }, ...st2(-r / 2 + s + s / 2, -e / 2, s, 20, -90, -180), { x: r / 2 - s / 2, y: s }, ...st2(-r / 2 - s / 2, -s, s, 20, 0, 90), ...st2(-r / 2 - s / 2, s, s, 20, -90, 0), { x: r / 2 - s / 2, y: -s }, ...st2(-r / 2 + s + s / 2, e / 2, s, 30, -180, -270)], u2 = Vt2.svg(a), y = S(t, { fill: "none" });
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  let S2 = I(l).replace("Z", ""), N = u2.path(S2, y), B = I(m3).replace("Z", ""), C = u2.path(B, y), R = I(g), M2 = u2.path(R, { ...y }), E = a.insert("g", ":first-child");
  return E.insert(() => M2, ":first-child").attr("stroke-opacity", 0), E.insert(() => N, ":first-child"), E.insert(() => C, ":first-child"), E.attr("class", "text"), p2 && t.look !== "handDrawn" && E.selectAll("path").attr("style", p2), h && t.look !== "handDrawn" && E.selectAll("path").attr("style", h), E.attr("transform", `translate(${s - s / 4}, 0)`), f.attr("transform", `translate(${-r / 2 + (t.padding ?? 0) / 2 - (o.x - (o.left ?? 0))},${-e / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`), v(t, E), t.intersect = function(H) {
    return $.polygon(t, g, H);
  }, a;
}
m(pe, "curlyBraces");
async function me(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a, i = 20, n = 5, { shapeSvg: r, bbox: e } = await G2(d2, t, T(t)), s = Math.max(i, (e.width + o * 2) * 1.25, (t == null ? void 0 : t.width) ?? 0), p2 = Math.max(n, e.height + f * 2, (t == null ? void 0 : t.height) ?? 0), l = p2 / 2, { cssStyles: m3 } = t, g = Vt2.svg(r), u2 = S(t, {});
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let y = s, b = p2, S2 = y - l, N = b / 4, w = [{ x: S2, y: 0 }, { x: N, y: 0 }, { x: 0, y: b / 2 }, { x: N, y: b }, { x: S2, y: b }, ...$t(-S2, -b / 2, l, 50, 270, 90)], B = I(w), C = g.path(B, u2), R = r.insert(() => C, ":first-child");
  return R.attr("class", "basic label-container outer-path"), m3 && t.look !== "handDrawn" && R.selectChildren("path").attr("style", m3), h && t.look !== "handDrawn" && R.selectChildren("path").attr("style", h), R.attr("transform", `translate(${-s / 2}, ${-p2 / 2})`), v(t, R), t.intersect = function(M2) {
    return $.polygon(t, w, M2);
  }, r;
}
m(me, "curvedTrapezoid");
var Ls = m((d2, t, c, h, a, o) => [`M${d2},${t + o}`, `a${a},${o} 0,0,0 ${c},0`, `a${a},${o} 0,0,0 ${-c},0`, `l0,${h}`, `a${a},${o} 0,0,0 ${c},0`, `l0,${-h}`].join(" "), "createCylinderPathD");
var Vs = m((d2, t, c, h, a, o) => [`M${d2},${t + o}`, `M${d2 + c},${t + o}`, `a${a},${o} 0,0,0 ${-c},0`, `l0,${h}`, `a${a},${o} 0,0,0 ${c},0`, `l0,${-h}`].join(" "), "createOuterCylinderPathD");
var Is = m((d2, t, c, h, a, o) => [`M${d2 - c / 2},${-h / 2}`, `a${a},${o} 0,0,0 ${c},0`].join(" "), "createInnerCylinderPathD");
var ge = 8;
var fe = 8;
async function de(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 24 : a, f = t.look === "neo" ? 24 : a;
  if (t.width || t.height) {
    let u2 = t.width ?? 0;
    t.width = (t.width ?? 0) - f, t.width < fe && (t.width = fe);
    let b = u2 / 2 / (2.5 + u2 / 50);
    t.height = (t.height ?? 0) - o - b * 3, t.height < ge && (t.height = ge);
  }
  let { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = (t.width ? t.width : n.width) + f, s = e / 2, p2 = s / (2.5 + e / 50), l = (t.height ? t.height : n.height) + o + p2, m3, { cssStyles: g } = t;
  if (t.look === "handDrawn") {
    let u2 = Vt2.svg(i), y = Vs(0, 0, e, l, s, p2), b = Is(0, p2, e, l, s, p2), S2 = S(t, {}), N = u2.path(y, S2), w = u2.path(b, S(t, { fill: "none" }));
    m3 = i.insert(() => w, ":first-child"), m3 = i.insert(() => N, ":first-child"), m3.attr("class", "basic label-container"), g && m3.attr("style", g);
  } else {
    let u2 = Ls(0, 0, e, l, s, p2);
    m3 = i.insert("path", ":first-child").attr("d", u2).attr("class", "basic label-container outer-path").attr("style", Vt(g)).attr("style", h);
  }
  return m3.attr("label-offset-y", p2), m3.attr("transform", `translate(${-e / 2}, ${-(l / 2 + p2)})`), v(t, m3), r.attr("transform", `translate(${-(n.width / 2) - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + (t.padding ?? 0) / 1.5 - (n.y - (n.top ?? 0))})`), t.intersect = function(u2) {
    let y = $.rect(t, u2), b = y.x - (t.x ?? 0);
    if (s != 0 && (Math.abs(b) < (t.width ?? 0) / 2 || Math.abs(b) == (t.width ?? 0) / 2 && Math.abs(y.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - p2)) {
      let S2 = p2 * p2 * (1 - b * b / (s * s));
      S2 > 0 && (S2 = Math.sqrt(S2)), S2 = p2 - S2, u2.y - (t.y ?? 0) > 0 && (S2 = -S2), y.y += S2;
    }
    return y;
  }, i;
}
m(de, "cylinder");
async function ye(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 16 : t.padding ?? 0, { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = i.width + a, e = i.height + o, s = e * 0.2, p2 = -r / 2, l = -e / 2 - s / 2, { cssStyles: m3 } = t, g = Vt2.svg(f), u2 = S(t, {});
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let y = [{ x: p2, y: l + s }, { x: -p2, y: l + s }, { x: -p2, y: -l }, { x: p2, y: -l }, { x: p2, y: l }, { x: -p2, y: l }, { x: -p2, y: l + s }], b = g.polygon(y.map((N) => [N.x, N.y]), u2), S2 = f.insert(() => b, ":first-child");
  return S2.attr("class", "basic label-container outer-path"), m3 && t.look !== "handDrawn" && S2.selectAll("path").attr("style", m3), h && t.look !== "handDrawn" && S2.selectAll("path").attr("style", h), n.attr("transform", `translate(${p2 + (t.padding ?? 0) / 2 - (i.x - (i.left ?? 0))}, ${l + s + (t.padding ?? 0) / 2 - (i.y - (i.top ?? 0))})`), v(t, S2), t.intersect = function(N) {
    return $.rect(t, N);
  }, f;
}
m(ye, "dividedRectangle");
async function ue(d2, t) {
  var _a, _b;
  let { labelStyles: c, nodeStyles: h } = m2(t), a = t.look === "neo" ? 12 : 5;
  t.labelStyle = c;
  let o = t.padding ?? 0, f = t.look === "neo" ? 16 : o, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ? (t == null ? void 0 : t.width) / 2 : n.width / 2) + (f ?? 0), e = r - a, s, { cssStyles: p2 } = t;
  if (t.look === "handDrawn") {
    let l = Vt2.svg(i), m3 = S(t, { roughness: 0.2, strokeWidth: 2.5 }), g = S(t, { roughness: 0.2, strokeWidth: 1.5 }), u2 = l.circle(0, 0, r * 2, m3), y = l.circle(0, 0, e * 2, g);
    s = i.insert("g", ":first-child"), s.attr("class", Vt(t.cssClasses)).attr("style", Vt(p2)), (_a = s.node()) == null ? void 0 : _a.appendChild(u2), (_b = s.node()) == null ? void 0 : _b.appendChild(y);
  } else {
    s = i.insert("g", ":first-child");
    let l = s.insert("circle", ":first-child"), m3 = s.insert("circle");
    s.attr("class", "basic label-container").attr("style", h), l.attr("class", "outer-circle").attr("style", h).attr("r", r).attr("cx", 0).attr("cy", 0), m3.attr("class", "inner-circle").attr("style", h).attr("r", e).attr("cx", 0).attr("cy", 0);
  }
  return v(t, s), t.intersect = function(l) {
    return pt.info("DoubleCircle intersect", t, r, l), $.circle(t, r, l);
  }, i;
}
m(ue, "doublecircle");
function xe(d2, t, { config: { themeVariables: c } }) {
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.label = "", t.labelStyle = h;
  let o = d2.insert("g").attr("class", T(t)).attr("id", t.domId ?? t.id), f = 7, { cssStyles: i } = t, n = Vt2.svg(o), { nodeBorder: r } = c, e = S(t, { fillStyle: "solid" });
  t.look !== "handDrawn" && (e.roughness = 0);
  let s = n.circle(0, 0, f * 2, e), p2 = o.insert(() => s, ":first-child");
  return p2.selectAll("path").attr("style", `fill: ${r} !important;`), i && i.length > 0 && t.look !== "handDrawn" && p2.selectAll("path").attr("style", i), a && t.look !== "handDrawn" && p2.selectAll("path").attr("style", a), v(t, p2), t.intersect = function(l) {
    return pt.info("filledCircle intersect", t, { radius: f, point: l }), $.circle(t, f, l);
  }, o;
}
m(xe, "filledCircle");
var be = 10;
var Se = 10;
async function we(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? a * 2 : a;
  (t.width || t.height) && (t.height = (t == null ? void 0 : t.height) ?? 0, t.height < be && (t.height = be), t.width = ((t == null ? void 0 : t.width) ?? 0) - o - o / 2, t.width < Se && (t.width = Se));
  let { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : i.width) + (o ?? 0), e = (t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : r + i.height, s = e, p2 = [{ x: 0, y: -e }, { x: s, y: -e }, { x: s / 2, y: 0 }], { cssStyles: l } = t, m3 = Vt2.svg(f), g = S(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = I(p2), y = m3.path(u2, g), b = f.insert(() => y, ":first-child").attr("transform", `translate(${-e / 2}, ${e / 2})`).attr("class", "outer-path");
  return l && t.look !== "handDrawn" && b.selectChildren("path").attr("style", l), h && t.look !== "handDrawn" && b.selectChildren("path").attr("style", h), t.width = r, t.height = e, v(t, b), n.attr("transform", `translate(${-i.width / 2 - (i.x - (i.left ?? 0))}, ${-e / 2 + (t.padding ?? 0) / 2 + (i.y - (i.top ?? 0))})`), t.intersect = function(S2) {
    return pt.info("Triangle intersect", t, p2, S2), $.polygon(t, p2, S2);
  }, f;
}
m(we, "flippedTriangle");
function Ne(d2, t, { dir: c, config: { state: h, themeVariables: a } }) {
  let { nodeStyles: o } = m2(t);
  t.label = "";
  let f = d2.insert("g").attr("class", T(t)).attr("id", t.domId ?? t.id), { cssStyles: i } = t, n = Math.max(70, (t == null ? void 0 : t.width) ?? 0), r = Math.max(10, (t == null ? void 0 : t.height) ?? 0);
  c === "LR" && (n = Math.max(10, (t == null ? void 0 : t.width) ?? 0), r = Math.max(70, (t == null ? void 0 : t.height) ?? 0));
  let e = -1 * n / 2, s = -1 * r / 2, p2 = Vt2.svg(f), l = S(t, { stroke: a.lineColor, fill: a.lineColor });
  t.look !== "handDrawn" && (l.roughness = 0, l.fillStyle = "solid");
  let m3 = p2.rectangle(e, s, n, r, l), g = f.insert(() => m3, ":first-child");
  i && t.look !== "handDrawn" && g.selectAll("path").attr("style", i), o && t.look !== "handDrawn" && g.selectAll("path").attr("style", o), v(t, g);
  let u2 = (h == null ? void 0 : h.padding) ?? 0;
  return t.width && t.height && (t.width += u2 / 2 || 0, t.height += u2 / 2 || 0), t.intersect = function(y) {
    return $.rect(t, y);
  }, f;
}
m(Ne, "forkJoin");
async function $e(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = 15, o = 10, f = t.look === "neo" ? 16 : t.padding ?? 0, i = t.look === "neo" ? 12 : t.padding ?? 0;
  (t.width || t.height) && (t.height = ((t == null ? void 0 : t.height) ?? 0) - i * 2, t.height < o && (t.height = o), t.width = ((t == null ? void 0 : t.width) ?? 0) - f * 2, t.width < a && (t.width = a));
  let { shapeSvg: n, bbox: r } = await G2(d2, t, T(t)), e = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : Math.max(a, r.width)) + f * 2, s = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : Math.max(o, r.height)) + i * 2, p2 = s / 2, { cssStyles: l } = t, m3 = Vt2.svg(n), g = S(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = [{ x: -e / 2, y: -s / 2 }, { x: e / 2 - p2, y: -s / 2 }, ...$t(-e / 2 + p2, 0, p2, 50, 90, 270), { x: e / 2 - p2, y: s / 2 }, { x: -e / 2, y: s / 2 }], y = I(u2), b = m3.path(y, g), S2 = n.insert(() => b, ":first-child");
  return S2.attr("class", "basic label-container outer-path"), l && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", l), h && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", h), v(t, S2), t.intersect = function(N) {
    return pt.info("Pill intersect", t, { radius: p2, point: N }), $.polygon(t, u2, N);
  }, n;
}
m($e, "halfRoundedRectangle");
var Ws = m((d2, t, c, h, a) => [`M${d2 + a},${t}`, `L${d2 + c - a},${t}`, `L${d2 + c},${t - h / 2}`, `L${d2 + c - a},${t - h}`, `L${d2 + a},${t - h}`, `L${d2},${t - h / 2}`, "Z"].join(" "), "createHexagonPathD");
async function De(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t), a = t.look === "neo" ? 3.5 : 4;
  t.labelStyle = c;
  let o = t.padding ?? 0, f = 70, i = 32, n = t.look === "neo" ? f : o, r = t.look === "neo" ? i : o;
  if (t.width || t.height) {
    let S2 = (t.height ?? 0) / a;
    t.width = ((t == null ? void 0 : t.width) ?? 0) - 2 * S2 - r, t.height = (t.height ?? 0) - n;
  }
  let { shapeSvg: e, bbox: s } = await G2(d2, t, T(t)), p2 = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : s.height) + n, l = p2 / a, m3 = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : s.width) + 2 * l + r, g = [{ x: l, y: 0 }, { x: m3 - l, y: 0 }, { x: m3, y: -p2 / 2 }, { x: m3 - l, y: -p2 }, { x: l, y: -p2 }, { x: 0, y: -p2 / 2 }], u2, { cssStyles: y } = t;
  if (t.look === "handDrawn") {
    let b = Vt2.svg(e), S2 = S(t, {}), N = Ws(0, 0, m3, p2, l), w = b.path(N, S2);
    u2 = e.insert(() => w, ":first-child").attr("transform", `translate(${-m3 / 2}, ${p2 / 2})`), y && u2.attr("style", y);
  } else u2 = et(e, m3, p2, g);
  return h && u2.attr("style", h), t.width = m3, t.height = p2, v(t, u2), t.intersect = function(b) {
    return $.polygon(t, g, b);
  }, e;
}
m(De, "hexagon");
async function Pe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.label = "", t.labelStyle = c;
  let { shapeSvg: a } = await G2(d2, t, T(t)), o = Math.max(30, (t == null ? void 0 : t.width) ?? 0), f = Math.max(30, (t == null ? void 0 : t.height) ?? 0), { cssStyles: i } = t, n = Vt2.svg(a), r = S(t, {});
  t.look !== "handDrawn" && (r.roughness = 0, r.fillStyle = "solid");
  let e = [{ x: 0, y: 0 }, { x: o, y: 0 }, { x: 0, y: f }, { x: o, y: f }], s = I(e), p2 = n.path(s, r), l = a.insert(() => p2, ":first-child");
  return l.attr("class", "basic label-container outer-path"), i && t.look !== "handDrawn" && l.selectChildren("path").attr("style", i), h && t.look !== "handDrawn" && l.selectChildren("path").attr("style", h), l.attr("transform", `translate(${-o / 2}, ${-f / 2})`), v(t, l), t.intersect = function(m3) {
    return pt.info("Pill intersect", t, { points: e }), $.polygon(t, e, m3);
  }, a;
}
m(Pe, "hourglass");
async function ve2(d2, t, { config: { themeVariables: c, flowchart: h } }) {
  let { labelStyles: a } = m2(t);
  t.labelStyle = a;
  let o = t.assetHeight ?? 48, f = t.assetWidth ?? 48, i = Math.max(o, f), n = h == null ? void 0 : h.wrappingWidth;
  t.width = Math.max(i, n ?? 0);
  let { shapeSvg: r, bbox: e, label: s } = await G2(d2, t, "icon-shape default"), p2 = t.pos === "t", l = i, m3 = i, { nodeBorder: g } = c, { stylesMap: u2 } = p(t), y = -m3 / 2, b = -l / 2, S2 = t.label ? 8 : 0, N = Vt2.svg(r), w = S(t, { stroke: "none", fill: "none" });
  t.look !== "handDrawn" && (w.roughness = 0, w.fillStyle = "solid");
  let B = N.rectangle(y, b, m3, l, w), C = Math.max(m3, e.width), R = l + e.height + S2, M2 = N.rectangle(-C / 2, -R / 2, C, R, { ...w, fill: "transparent", stroke: "none" }), E = r.insert(() => B, ":first-child"), H = r.insert(() => M2);
  if (t.icon) {
    let W = r.append("g");
    W.html(`<g>${await ve(t.icon, { height: i, width: i, fallbackPrefix: "" })}</g>`);
    let j = W.node().getBBox(), L = j.width, O = j.height, A = j.x, V = j.y;
    W.attr("transform", `translate(${-L / 2 - A},${p2 ? e.height / 2 + S2 / 2 - O / 2 - V : -e.height / 2 - S2 / 2 - O / 2 - V})`), W.attr("style", `color: ${u2.get("stroke") ?? g};`);
  }
  return s.attr("transform", `translate(${-e.width / 2 - (e.x - (e.left ?? 0))},${p2 ? -R / 2 : R / 2 - e.height})`), E.attr("transform", `translate(0,${p2 ? e.height / 2 + S2 / 2 : -e.height / 2 - S2 / 2})`), v(t, H), t.intersect = function(W) {
    if (pt.info("iconSquare intersect", t, W), !t.label) return $.rect(t, W);
    let j = t.x ?? 0, L = t.y ?? 0, O = t.height ?? 0, A = [];
    return p2 ? A = [{ x: j - e.width / 2, y: L - O / 2 }, { x: j + e.width / 2, y: L - O / 2 }, { x: j + e.width / 2, y: L - O / 2 + e.height + S2 }, { x: j + m3 / 2, y: L - O / 2 + e.height + S2 }, { x: j + m3 / 2, y: L + O / 2 }, { x: j - m3 / 2, y: L + O / 2 }, { x: j - m3 / 2, y: L - O / 2 + e.height + S2 }, { x: j - e.width / 2, y: L - O / 2 + e.height + S2 }] : A = [{ x: j - m3 / 2, y: L - O / 2 }, { x: j + m3 / 2, y: L - O / 2 }, { x: j + m3 / 2, y: L - O / 2 + l }, { x: j + e.width / 2, y: L - O / 2 + l }, { x: j + e.width / 2 / 2, y: L + O / 2 }, { x: j - e.width / 2, y: L + O / 2 }, { x: j - e.width / 2, y: L - O / 2 + l }, { x: j - m3 / 2, y: L - O / 2 + l }], $.polygon(t, A, W);
  }, r;
}
m(ve2, "icon");
async function ke(d2, t, { config: { themeVariables: c, flowchart: h } }) {
  let { labelStyles: a } = m2(t);
  t.labelStyle = a;
  let o = t.assetHeight ?? 48, f = t.assetWidth ?? 48, i = Math.max(o, f), n = h == null ? void 0 : h.wrappingWidth;
  t.width = Math.max(i, n ?? 0);
  let { shapeSvg: r, bbox: e, label: s } = await G2(d2, t, "icon-shape default"), p2 = 20, l = t.label ? 8 : 0, m3 = t.pos === "t", { nodeBorder: g, mainBkg: u2 } = c, { stylesMap: y } = p(t), b = Vt2.svg(r), S2 = S(t, {});
  t.look !== "handDrawn" && (S2.roughness = 0, S2.fillStyle = "solid");
  let N = y.get("fill");
  S2.stroke = N ?? u2;
  let w = r.append("g");
  t.icon && w.html(`<g>${await ve(t.icon, { height: i, width: i, fallbackPrefix: "" })}</g>`);
  let B = w.node().getBBox(), C = B.width, R = B.height, M2 = B.x, E = B.y, H = Math.max(C, R) * Math.SQRT2 + p2 * 2, W = b.circle(0, 0, H, S2), j = Math.max(H, e.width), L = H + e.height + l, O = b.rectangle(-j / 2, -L / 2, j, L, { ...S2, fill: "transparent", stroke: "none" }), A = r.insert(() => W, ":first-child"), V = r.insert(() => O);
  return w.attr("transform", `translate(${-C / 2 - M2},${m3 ? e.height / 2 + l / 2 - R / 2 - E : -e.height / 2 - l / 2 - R / 2 - E})`), w.attr("style", `color: ${y.get("stroke") ?? g};`), s.attr("transform", `translate(${-e.width / 2 - (e.x - (e.left ?? 0))},${m3 ? -L / 2 : L / 2 - e.height})`), A.attr("transform", `translate(0,${m3 ? e.height / 2 + l / 2 : -e.height / 2 - l / 2})`), v(t, V), t.intersect = function(X) {
    return pt.info("iconSquare intersect", t, X), $.rect(t, X);
  }, r;
}
m(ke, "iconCircle");
async function Be(d2, t, { config: { themeVariables: c, flowchart: h } }) {
  let { labelStyles: a } = m2(t);
  t.labelStyle = a;
  let o = t.assetHeight ?? 48, f = t.assetWidth ?? 48, i = Math.max(o, f), n = h == null ? void 0 : h.wrappingWidth;
  t.width = Math.max(i, n ?? 0);
  let { shapeSvg: r, bbox: e, halfPadding: s, label: p2 } = await G2(d2, t, "icon-shape default"), l = t.pos === "t", m3 = i + s * 2, g = i + s * 2, { nodeBorder: u2, mainBkg: y } = c, { stylesMap: b } = p(t), S2 = -g / 2, N = -m3 / 2, w = t.label ? 8 : 0, B = Vt2.svg(r), C = S(t, {});
  t.look !== "handDrawn" && (C.roughness = 0, C.fillStyle = "solid");
  let R = b.get("fill");
  C.stroke = R ?? y;
  let M2 = B.path(it(S2, N, g, m3, 5), C), E = Math.max(g, e.width), H = m3 + e.height + w, W = B.rectangle(-E / 2, -H / 2, E, H, { ...C, fill: "transparent", stroke: "none" }), j = r.insert(() => M2, ":first-child").attr("class", "icon-shape2"), L = r.insert(() => W);
  if (t.icon) {
    let O = r.append("g");
    O.html(`<g>${await ve(t.icon, { height: i, width: i, fallbackPrefix: "" })}</g>`);
    let A = O.node().getBBox(), V = A.width, X = A.height, _ = A.x, z = A.y;
    O.attr("transform", `translate(${-V / 2 - _},${l ? e.height / 2 + w / 2 - X / 2 - z : -e.height / 2 - w / 2 - X / 2 - z})`), O.attr("style", `color: ${b.get("stroke") ?? u2};`);
  }
  return p2.attr("transform", `translate(${-e.width / 2 - (e.x - (e.left ?? 0))},${l ? -H / 2 : H / 2 - e.height})`), j.attr("transform", `translate(0,${l ? e.height / 2 + w / 2 : -e.height / 2 - w / 2})`), v(t, L), t.intersect = function(O) {
    if (pt.info("iconSquare intersect", t, O), !t.label) return $.rect(t, O);
    let A = t.x ?? 0, V = t.y ?? 0, X = t.height ?? 0, _ = [];
    return l ? _ = [{ x: A - e.width / 2, y: V - X / 2 }, { x: A + e.width / 2, y: V - X / 2 }, { x: A + e.width / 2, y: V - X / 2 + e.height + w }, { x: A + g / 2, y: V - X / 2 + e.height + w }, { x: A + g / 2, y: V + X / 2 }, { x: A - g / 2, y: V + X / 2 }, { x: A - g / 2, y: V - X / 2 + e.height + w }, { x: A - e.width / 2, y: V - X / 2 + e.height + w }] : _ = [{ x: A - g / 2, y: V - X / 2 }, { x: A + g / 2, y: V - X / 2 }, { x: A + g / 2, y: V - X / 2 + m3 }, { x: A + e.width / 2, y: V - X / 2 + m3 }, { x: A + e.width / 2 / 2, y: V + X / 2 }, { x: A - e.width / 2, y: V + X / 2 }, { x: A - e.width / 2, y: V - X / 2 + m3 }, { x: A - g / 2, y: V - X / 2 + m3 }], $.polygon(t, _, O);
  }, r;
}
m(Be, "iconRounded");
async function Te(d2, t, { config: { themeVariables: c, flowchart: h } }) {
  let { labelStyles: a } = m2(t);
  t.labelStyle = a;
  let o = t.assetHeight ?? 48, f = t.assetWidth ?? 48, i = Math.max(o, f), n = h == null ? void 0 : h.wrappingWidth;
  t.width = Math.max(i, n ?? 0);
  let { shapeSvg: r, bbox: e, halfPadding: s, label: p2 } = await G2(d2, t, "icon-shape default"), l = t.pos === "t", m3 = i + s * 2, g = i + s * 2, { nodeBorder: u2, mainBkg: y } = c, { stylesMap: b } = p(t), S2 = -g / 2, N = -m3 / 2, w = t.label ? 8 : 0, B = Vt2.svg(r), C = S(t, {});
  t.look !== "handDrawn" && (C.roughness = 0, C.fillStyle = "solid");
  let R = b.get("fill");
  C.stroke = R ?? y;
  let M2 = B.path(it(S2, N, g, m3, 0.1), C), E = Math.max(g, e.width), H = m3 + e.height + w, W = B.rectangle(-E / 2, -H / 2, E, H, { ...C, fill: "transparent", stroke: "none" }), j = r.insert(() => M2, ":first-child"), L = r.insert(() => W);
  if (t.icon) {
    let O = r.append("g");
    O.html(`<g>${await ve(t.icon, { height: i, width: i, fallbackPrefix: "" })}</g>`);
    let A = O.node().getBBox(), V = A.width, X = A.height, _ = A.x, z = A.y;
    O.attr("transform", `translate(${-V / 2 - _},${l ? e.height / 2 + w / 2 - X / 2 - z : -e.height / 2 - w / 2 - X / 2 - z})`), O.attr("style", `color: ${b.get("stroke") ?? u2};`);
  }
  return p2.attr("transform", `translate(${-e.width / 2 - (e.x - (e.left ?? 0))},${l ? -H / 2 : H / 2 - e.height})`), j.attr("transform", `translate(0,${l ? e.height / 2 + w / 2 : -e.height / 2 - w / 2})`), v(t, L), t.intersect = function(O) {
    if (pt.info("iconSquare intersect", t, O), !t.label) return $.rect(t, O);
    let A = t.x ?? 0, V = t.y ?? 0, X = t.height ?? 0, _ = [];
    return l ? _ = [{ x: A - e.width / 2, y: V - X / 2 }, { x: A + e.width / 2, y: V - X / 2 }, { x: A + e.width / 2, y: V - X / 2 + e.height + w }, { x: A + g / 2, y: V - X / 2 + e.height + w }, { x: A + g / 2, y: V + X / 2 }, { x: A - g / 2, y: V + X / 2 }, { x: A - g / 2, y: V - X / 2 + e.height + w }, { x: A - e.width / 2, y: V - X / 2 + e.height + w }] : _ = [{ x: A - g / 2, y: V - X / 2 }, { x: A + g / 2, y: V - X / 2 }, { x: A + g / 2, y: V - X / 2 + m3 }, { x: A + e.width / 2, y: V - X / 2 + m3 }, { x: A + e.width / 2 / 2, y: V + X / 2 }, { x: A - e.width / 2, y: V + X / 2 }, { x: A - e.width / 2, y: V - X / 2 + m3 }, { x: A - g / 2, y: V - X / 2 + m3 }], $.polygon(t, _, O);
  }, r;
}
m(Te, "iconSquare");
async function Ce(d2, t, { config: { flowchart: c } }) {
  let h = new Image();
  h.src = (t == null ? void 0 : t.img) ?? "", await h.decode();
  let a = Number(h.naturalWidth.toString().replace("px", "")), o = Number(h.naturalHeight.toString().replace("px", ""));
  t.imageAspectRatio = a / o;
  let { labelStyles: f } = m2(t);
  t.labelStyle = f;
  let i = c == null ? void 0 : c.wrappingWidth;
  t.defaultWidth = c == null ? void 0 : c.wrappingWidth;
  let n = Math.max(t.label ? i ?? 0 : 0, (t == null ? void 0 : t.assetWidth) ?? a), r = t.constraint === "on" && (t == null ? void 0 : t.assetHeight) ? t.assetHeight * t.imageAspectRatio : n, e = t.constraint === "on" ? r / t.imageAspectRatio : (t == null ? void 0 : t.assetHeight) ?? o;
  t.width = Math.max(r, i ?? 0);
  let { shapeSvg: s, bbox: p2, label: l } = await G2(d2, t, "image-shape default"), m3 = t.pos === "t", g = -r / 2, u2 = -e / 2, y = t.label ? 8 : 0, b = Vt2.svg(s), S2 = S(t, {});
  t.look !== "handDrawn" && (S2.roughness = 0, S2.fillStyle = "solid");
  let N = b.rectangle(g, u2, r, e, S2), w = Math.max(r, p2.width), B = e + p2.height + y, C = b.rectangle(-w / 2, -B / 2, w, B, { ...S2, fill: "none", stroke: "none" }), R = s.insert(() => N, ":first-child"), M2 = s.insert(() => C);
  if (t.img) {
    let E = s.append("image");
    E.attr("href", t.img), E.attr("width", r), E.attr("height", e), E.attr("preserveAspectRatio", "none"), E.attr("transform", `translate(${-r / 2},${m3 ? B / 2 - e : -B / 2})`);
  }
  return l.attr("transform", `translate(${-p2.width / 2 - (p2.x - (p2.left ?? 0))},${m3 ? -e / 2 - p2.height / 2 - y / 2 : e / 2 - p2.height / 2 + y / 2})`), R.attr("transform", `translate(0,${m3 ? p2.height / 2 + y / 2 : -p2.height / 2 - y / 2})`), v(t, M2), t.intersect = function(E) {
    if (pt.info("iconSquare intersect", t, E), !t.label) return $.rect(t, E);
    let H = t.x ?? 0, W = t.y ?? 0, j = t.height ?? 0, L = [];
    return m3 ? L = [{ x: H - p2.width / 2, y: W - j / 2 }, { x: H + p2.width / 2, y: W - j / 2 }, { x: H + p2.width / 2, y: W - j / 2 + p2.height + y }, { x: H + r / 2, y: W - j / 2 + p2.height + y }, { x: H + r / 2, y: W + j / 2 }, { x: H - r / 2, y: W + j / 2 }, { x: H - r / 2, y: W - j / 2 + p2.height + y }, { x: H - p2.width / 2, y: W - j / 2 + p2.height + y }] : L = [{ x: H - r / 2, y: W - j / 2 }, { x: H + r / 2, y: W - j / 2 }, { x: H + r / 2, y: W - j / 2 + e }, { x: H + p2.width / 2, y: W - j / 2 + e }, { x: H + p2.width / 2 / 2, y: W + j / 2 }, { x: H - p2.width / 2, y: W + j / 2 }, { x: H - p2.width / 2, y: W - j / 2 + e }, { x: H - r / 2, y: W - j / 2 + e }], $.polygon(t, L, E);
  }, s;
}
m(Ce, "imageSquare");
async function Re(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = a, f = t.look === "neo" ? a * 2 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = Math.max(n.width + (f ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), e = Math.max(n.height + (o ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), s = [{ x: 0, y: 0 }, { x: r, y: 0 }, { x: r + 3 * e / 6, y: -e }, { x: -3 * e / 6, y: -e }], p2, { cssStyles: l } = t;
  if (t.look === "handDrawn") {
    let m3 = Vt2.svg(i), g = S(t, {}), u2 = I(s), y = m3.path(u2, g);
    p2 = i.insert(() => y, ":first-child").attr("transform", `translate(${-r / 2}, ${e / 2})`), l && p2.attr("style", l);
  } else p2 = et(i, r, e, s);
  return h && p2.attr("style", h), t.width = r, t.height = e, v(t, p2), t.intersect = function(m3) {
    return $.polygon(t, s, m3);
  }, i;
}
m(Re, "inv_trapezoid");
async function pt2(d2, t, c) {
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.labelStyle = h;
  let { shapeSvg: o, bbox: f } = await G2(d2, t, T(t)), i = Math.max(f.width + c.labelPaddingX * 2, (t == null ? void 0 : t.width) || 0), n = Math.max(f.height + c.labelPaddingY * 2, (t == null ? void 0 : t.height) || 0), r = -i / 2, e = -n / 2, s, { rx: p2, ry: l } = t, { cssStyles: m3 } = t;
  if ((c == null ? void 0 : c.rx) && c.ry && (p2 = c.rx, l = c.ry), t.look === "handDrawn") {
    let g = Vt2.svg(o), u2 = S(t, {}), y = p2 || l ? g.path(it(r, e, i, n, p2 || 0), u2) : g.rectangle(r, e, i, n, u2);
    s = o.insert(() => y, ":first-child"), s.attr("class", "basic label-container").attr("style", Vt(m3));
  } else s = o.insert("rect", ":first-child"), s.attr("class", "basic label-container").attr("style", a).attr("rx", Vt(p2)).attr("ry", Vt(l)).attr("x", r).attr("y", e).attr("width", i).attr("height", n);
  return v(t, s), t.calcIntersect = function(g, u2) {
    return $.rect(g, u2);
  }, t.intersect = function(g) {
    return $.rect(t, g);
  }, o;
}
m(pt2, "drawRect");
async function Ge(d2, t) {
  let { shapeSvg: c, bbox: h, label: a } = await G2(d2, t, "label"), o = c.insert("rect", ":first-child");
  return o.attr("width", 0.1).attr("height", 0.1), c.attr("class", "label edgeLabel"), a.attr("transform", `translate(${-(h.width / 2) - (h.x - (h.left ?? 0))}, ${-(h.height / 2) - (h.y - (h.top ?? 0))})`), v(t, o), t.intersect = function(n) {
    return $.rect(t, n);
  }, c;
}
m(Ge, "labelRect");
async function Me(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = a, f = t.look === "neo" ? a * 2 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.height) ?? n.height) + o, e = ((t == null ? void 0 : t.width) ?? n.width) + f, s = [{ x: 0, y: 0 }, { x: e + 3 * r / 6, y: 0 }, { x: e, y: -r }, { x: -(3 * r) / 6, y: -r }], p2, { cssStyles: l } = t;
  if (t.look === "handDrawn") {
    let m3 = Vt2.svg(i), g = S(t, {}), u2 = I(s), y = m3.path(u2, g);
    p2 = i.insert(() => y, ":first-child").attr("transform", `translate(${-e / 2}, ${r / 2})`), l && p2.attr("style", l);
  } else p2 = et(i, e, r, s);
  return h && p2.attr("style", h), t.width = e, t.height = r, v(t, p2), t.intersect = function(m3) {
    return $.polygon(t, s, m3);
  }, i;
}
m(Me, "lean_left");
async function Ee(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = a, f = t.look === "neo" ? a * 2 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.height) ?? n.height) + o, e = ((t == null ? void 0 : t.width) ?? n.width) + f, s = [{ x: -3 * r / 6, y: 0 }, { x: e, y: 0 }, { x: e + 3 * r / 6, y: -r }, { x: 0, y: -r }], p2, { cssStyles: l } = t;
  if (t.look === "handDrawn") {
    let m3 = Vt2.svg(i), g = S(t, {}), u2 = I(s), y = m3.path(u2, g);
    p2 = i.insert(() => y, ":first-child").attr("transform", `translate(${-e / 2}, ${r / 2})`), l && p2.attr("style", l);
  } else p2 = et(i, e, r, s);
  return h && p2.attr("style", h), t.width = e, t.height = r, v(t, p2), t.intersect = function(m3) {
    return $.polygon(t, s, m3);
  }, i;
}
m(Ee, "lean_right");
function He(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.label = "", t.labelStyle = c;
  let a = d2.insert("g").attr("class", T(t)).attr("id", t.domId ?? t.id), { cssStyles: o } = t, f = Math.max(35, (t == null ? void 0 : t.width) ?? 0), i = Math.max(35, (t == null ? void 0 : t.height) ?? 0), n = 7, r = [{ x: f, y: 0 }, { x: 0, y: i + n / 2 }, { x: f - 2 * n, y: i + n / 2 }, { x: 0, y: 2 * i }, { x: f, y: i - n / 2 }, { x: 2 * n, y: i - n / 2 }], e = Vt2.svg(a), s = S(t, {});
  t.look !== "handDrawn" && (s.roughness = 0, s.fillStyle = "solid");
  let p2 = I(r), l = e.path(p2, s), m3 = a.insert(() => l, ":first-child");
  return m3.attr("class", "outer-path"), o && t.look !== "handDrawn" && m3.selectAll("path").attr("style", o), h && t.look !== "handDrawn" && m3.selectAll("path").attr("style", h), m3.attr("transform", `translate(-${f / 2},${-i})`), v(t, m3), t.intersect = function(g) {
    return pt.info("lightningBolt intersect", t, g), $.polygon(t, r, g);
  }, a;
}
m(He, "lightningBolt");
var Xs = m((d2, t, c, h, a, o, f) => [`M${d2},${t + o}`, `a${a},${o} 0,0,0 ${c},0`, `a${a},${o} 0,0,0 ${-c},0`, `l0,${h}`, `a${a},${o} 0,0,0 ${c},0`, `l0,${-h}`, `M${d2},${t + o + f}`, `a${a},${o} 0,0,0 ${c},0`].join(" "), "createCylinderPathD");
var Ys = m((d2, t, c, h, a, o, f) => [`M${d2},${t + o}`, `M${d2 + c},${t + o}`, `a${a},${o} 0,0,0 ${-c},0`, `l0,${h}`, `a${a},${o} 0,0,0 ${c},0`, `l0,${-h}`, `M${d2},${t + o + f}`, `a${a},${o} 0,0,0 ${c},0`].join(" "), "createOuterCylinderPathD");
var Fs = m((d2, t, c, h, a, o) => [`M${d2 - c / 2},${-h / 2}`, `a${a},${o} 0,0,0 ${c},0`].join(" "), "createInnerCylinderPathD");
var je = 10;
var Ae = 10;
async function Oe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 24 : a;
  if (t.width || t.height) {
    let y = t.width ?? 0;
    t.width = (t.width ?? 0) - o, t.width < Ae && (t.width = Ae);
    let S2 = y / 2 / (2.5 + y / 50);
    t.height = (t.height ?? 0) - f - S2 * 3, t.height < je && (t.height = je);
  }
  let { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : n.width) + o * 2, s = e / 2, p2 = s / (2.5 + e / 50), l = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : n.height) + p2 + f * 2, m3 = l * 0.1, g, { cssStyles: u2 } = t;
  if (t.look === "handDrawn") {
    let y = Vt2.svg(i), b = Ys(0, 0, e, l, s, p2, m3), S2 = Fs(0, p2, e, l, s, p2), N = S(t, {}), w = y.path(b, N), B = y.path(S2, N);
    i.insert(() => B, ":first-child").attr("class", "line"), g = i.insert(() => w, ":first-child"), g.attr("class", "basic label-container"), u2 && g.attr("style", u2);
  } else {
    let y = Xs(0, 0, e, l, s, p2, m3);
    g = i.insert("path", ":first-child").attr("d", y).attr("class", "basic label-container outer-path").attr("style", Vt(u2)).attr("style", h);
  }
  return g.attr("label-offset-y", p2), g.attr("transform", `translate(${-e / 2}, ${-(l / 2 + p2)})`), v(t, g), r.attr("transform", `translate(${-(n.width / 2) - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + p2 - (n.y - (n.top ?? 0))})`), t.intersect = function(y) {
    let b = $.rect(t, y), S2 = b.x - (t.x ?? 0);
    if (s != 0 && (Math.abs(S2) < (t.width ?? 0) / 2 || Math.abs(S2) == (t.width ?? 0) / 2 && Math.abs(b.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - p2)) {
      let N = p2 * p2 * (1 - S2 * S2 / (s * s));
      N > 0 && (N = Math.sqrt(N)), N = p2 - N, y.y - (t.y ?? 0) > 0 && (N = -N), b.y += N;
    }
    return b;
  }, i;
}
m(Oe, "linedCylinder");
async function Le(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a;
  if (t.width || t.height) {
    let N = t.width;
    t.width = (N ?? 0) * 10 / 11 - o * 2, t.width < 10 && (t.width = 10), t.height = ((t == null ? void 0 : t.height) ?? 0) - f * 2, t.height < 10 && (t.height = 10);
  }
  let { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : n.width) + (o ?? 0) * 2, s = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : n.height) + (f ?? 0) * 2, p2 = t.look === "neo" ? s / 4 : s / 8, l = s + p2, { cssStyles: m3 } = t, g = Vt2.svg(i), u2 = S(t, {});
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let y = [{ x: -e / 2 - e / 2 * 0.1, y: -l / 2 }, { x: -e / 2 - e / 2 * 0.1, y: l / 2 }, ...at(-e / 2 - e / 2 * 0.1, l / 2, e / 2 + e / 2 * 0.1, l / 2, p2, 0.8), { x: e / 2 + e / 2 * 0.1, y: -l / 2 }, { x: -e / 2 - e / 2 * 0.1, y: -l / 2 }, { x: -e / 2, y: -l / 2 }, { x: -e / 2, y: l / 2 * 1.1 }, { x: -e / 2, y: -l / 2 }], b = g.polygon(y.map((N) => [N.x, N.y]), u2), S2 = i.insert(() => b, ":first-child");
  return S2.attr("class", "basic label-container outer-path"), m3 && t.look !== "handDrawn" && S2.selectAll("path").attr("style", m3), h && t.look !== "handDrawn" && S2.selectAll("path").attr("style", h), S2.attr("transform", `translate(0,${-p2 / 2})`), r.attr("transform", `translate(${-e / 2 + (t.padding ?? 0) + e / 2 * 0.1 / 2 - (n.x - (n.left ?? 0))},${-s / 2 + (t.padding ?? 0) - p2 / 2 - (n.y - (n.top ?? 0))})`), v(t, S2), t.intersect = function(N) {
    return $.polygon(t, y, N);
  }, i;
}
m(Le, "linedWaveEdgedRect");
async function Ve(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a, i = t.look === "neo" ? 10 : 5;
  (t.width || t.height) && (t.width = Math.max(((t == null ? void 0 : t.width) ?? 0) - o * 2 - 2 * i, 10), t.height = Math.max(((t == null ? void 0 : t.height) ?? 0) - f * 2 - 2 * i, 10));
  let { shapeSvg: n, bbox: r, label: e } = await G2(d2, t, T(t)), s = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : r.width) + o * 2 + 2 * i, p2 = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : r.height) + f * 2 + 2 * i, l = s - 2 * i, m3 = p2 - 2 * i, g = -l / 2, u2 = -m3 / 2, { cssStyles: y } = t, b = Vt2.svg(n), S2 = S(t, {}), N = [{ x: g - i, y: u2 + i }, { x: g - i, y: u2 + m3 + i }, { x: g + l - i, y: u2 + m3 + i }, { x: g + l - i, y: u2 + m3 }, { x: g + l, y: u2 + m3 }, { x: g + l, y: u2 + m3 - i }, { x: g + l + i, y: u2 + m3 - i }, { x: g + l + i, y: u2 - i }, { x: g + i, y: u2 - i }, { x: g + i, y: u2 }, { x: g, y: u2 }, { x: g, y: u2 + i }], w = [{ x: g, y: u2 + i }, { x: g + l - i, y: u2 + i }, { x: g + l - i, y: u2 + m3 }, { x: g + l, y: u2 + m3 }, { x: g + l, y: u2 }, { x: g, y: u2 }];
  t.look !== "handDrawn" && (S2.roughness = 0, S2.fillStyle = "solid");
  let B = I(N), C = b.path(B, S2), R = I(w), M2 = b.path(R, S2);
  t.look !== "handDrawn" && (C = Wt(C), M2 = Wt(M2));
  let E = n.insert("g", ":first-child");
  return E.insert(() => C), E.insert(() => M2), E.attr("class", "basic label-container outer-path"), y && t.look !== "handDrawn" && E.selectAll("path").attr("style", y), h && t.look !== "handDrawn" && E.selectAll("path").attr("style", h), e.attr("transform", `translate(${-(r.width / 2) - i - (r.x - (r.left ?? 0))}, ${-(r.height / 2) + i - (r.y - (r.top ?? 0))})`), v(t, E), t.intersect = function(H) {
    return $.polygon(t, N, H);
  }, n;
}
m(Ve, "multiRect");
async function Ie(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, label: f } = await G2(d2, t, T(t)), i = t.padding ?? 0, n = t.look === "neo" ? 16 : i, r = t.look === "neo" ? 12 : i, e = true;
  (t.width || t.height) && (e = false, t.width = ((t == null ? void 0 : t.width) ?? 0) - n * 2, t.height = ((t == null ? void 0 : t.height) ?? 0) - r * 3);
  let s = Math.max(o.width, (t == null ? void 0 : t.width) ?? 0) + n * 2, p2 = Math.max(o.height, (t == null ? void 0 : t.height) ?? 0) + r * 3, l = t.look === "neo" ? p2 / 4 : p2 / 8, m3 = p2 + (e ? l / 2 : -l / 2), g = -s / 2, u2 = -m3 / 2, y = 10, { cssStyles: b } = t, S2 = at(g - y, u2 + m3 + y, g + s - y, u2 + m3 + y, l, 0.8), N = S2 == null ? void 0 : S2[S2.length - 1], w = [{ x: g - y, y: u2 + y }, { x: g - y, y: u2 + m3 + y }, ...S2, { x: g + s - y, y: N.y - y }, { x: g + s, y: N.y - y }, { x: g + s, y: N.y - 2 * y }, { x: g + s + y, y: N.y - 2 * y }, { x: g + s + y, y: u2 - y }, { x: g + y, y: u2 - y }, { x: g + y, y: u2 }, { x: g, y: u2 }, { x: g, y: u2 + y }], B = [{ x: g, y: u2 + y }, { x: g + s - y, y: u2 + y }, { x: g + s - y, y: N.y - y }, { x: g + s, y: N.y - y }, { x: g + s, y: u2 }, { x: g, y: u2 }], C = Vt2.svg(a), R = S(t, {});
  t.look !== "handDrawn" && (R.roughness = 0, R.fillStyle = "solid");
  let M2 = I(w), E = C.path(M2, R), H = I(B), W = C.path(H, R), j = a.insert(() => E, ":first-child");
  return j.insert(() => W), j.attr("class", "basic label-container outer-path"), b && t.look !== "handDrawn" && j.selectAll("path").attr("style", b), h && t.look !== "handDrawn" && j.selectAll("path").attr("style", h), j.attr("transform", `translate(0,${-l / 2})`), f.attr("transform", `translate(${-(o.width / 2) - y - (o.x - (o.left ?? 0))}, ${-(o.height / 2) + y - l / 2 - (o.y - (o.top ?? 0))})`), v(t, j), t.intersect = function(L) {
    return $.polygon(t, w, L);
  }, a;
}
m(Ie, "multiWaveEdgedRectangle");
async function We(d2, t, { config: { themeVariables: c } }) {
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.labelStyle = h, t.useHtmlLabels || no(Ot()) || (t.centerLabel = true);
  let { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = Math.max(i.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), e = Math.max(i.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), s = -r / 2, p2 = -e / 2, { cssStyles: l } = t, m3 = Vt2.svg(f), g = S(t, { fill: c.noteBkgColor, stroke: c.noteBorderColor });
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = m3.rectangle(s, p2, r, e, g), y = f.insert(() => u2, ":first-child");
  return y.attr("class", "basic label-container outer-path"), n.attr("class", "label noteLabel"), l && t.look !== "handDrawn" && y.selectAll("path").attr("style", l), a && t.look !== "handDrawn" && y.selectAll("path").attr("style", a), n.attr("transform", `translate(${-i.width / 2 - (i.x - (i.left ?? 0))}, ${-(i.height / 2) - (i.y - (i.top ?? 0))})`), v(t, y), t.intersect = function(b) {
    return $.rect(t, b);
  }, f;
}
m(We, "note");
var _s = m((d2, t, c) => [`M${d2 + c / 2},${t}`, `L${d2 + c},${t - c / 2}`, `L${d2 + c / 2},${t - c}`, `L${d2},${t - c / 2}`, "Z"].join(" "), "createDecisionBoxPathD");
async function Xe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o } = await G2(d2, t, T(t)), f = o.width + (t.padding ?? 0), i = o.height + (t.padding ?? 0), n = f + i, r = 0.5, e = [{ x: n / 2, y: 0 }, { x: n, y: -n / 2 }, { x: n / 2, y: -n }, { x: 0, y: -n / 2 }], s, { cssStyles: p2 } = t;
  if (t.look === "handDrawn") {
    let l = Vt2.svg(a), m3 = S(t, {}), g = _s(0, 0, n), u2 = l.path(g, m3);
    s = a.insert(() => u2, ":first-child").attr("transform", `translate(${-n / 2 + r}, ${n / 2})`), p2 && s.attr("style", p2);
  } else s = et(a, n, n, e), s.attr("transform", `translate(${-n / 2 + r}, ${n / 2})`);
  return h && s.attr("style", h), v(t, s), t.calcIntersect = function(l, m3) {
    let g = l.width, u2 = [{ x: g / 2, y: 0 }, { x: g, y: -g / 2 }, { x: g / 2, y: -g }, { x: 0, y: -g / 2 }], y = $.polygon(l, u2, m3);
    return { x: y.x - 0.5, y: y.y - 0.5 };
  }, t.intersect = function(l) {
    return this.calcIntersect(t, l);
  }, a;
}
m(Xe, "question");
async function Ye(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 21 : a ?? 0, f = t.look === "neo" ? 12 : a ?? 0, { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = ((t == null ? void 0 : t.width) ?? n.width) + (t.look === "neo" ? o * 2 : o), s = ((t == null ? void 0 : t.height) ?? n.height) + (t.look === "neo" ? f * 2 : f), p2 = -e / 2, l = -s / 2, m3 = l / 2, g = [{ x: p2 + m3, y: l }, { x: p2, y: 0 }, { x: p2 + m3, y: -l }, { x: -p2, y: -l }, { x: -p2, y: l }], { cssStyles: u2 } = t, y = Vt2.svg(i), b = S(t, {});
  t.look !== "handDrawn" && (b.roughness = 0, b.fillStyle = "solid");
  let S2 = I(g), N = y.path(S2, b), w = i.insert(() => N, ":first-child");
  return w.attr("class", "basic label-container outer-path"), u2 && t.look !== "handDrawn" && w.selectAll("path").attr("style", u2), h && t.look !== "handDrawn" && w.selectAll("path").attr("style", h), w.attr("transform", `translate(${-m3 / 2},0)`), r.attr("transform", `translate(${-m3 / 2 - n.width / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) - (n.y - (n.top ?? 0))})`), v(t, w), t.intersect = function(B) {
    return $.polygon(t, g, B);
  }, i;
}
m(Ye, "rect_left_inv_arrow");
async function Fe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a;
  t.cssClasses ? a = "node " + t.cssClasses : a = "node default";
  let o = d2.insert("g").attr("class", a).attr("id", t.domId || t.id), f = o.insert("g"), i = o.insert("g").attr("class", "label").attr("style", h), n = t.description, r = t.label, e = await vt(i, r, t.labelStyle, true, true), s = { width: 0, height: 0 };
  if (no(qo())) {
    let R = e.children[0], M2 = ia(e);
    s = R.getBoundingClientRect(), M2.attr("width", s.width), M2.attr("height", s.height);
  }
  pt.info("Text 2", n);
  let p2 = n || [], l = e.getBBox(), m3 = await vt(i, Array.isArray(p2) ? p2.join("<br/>") : p2, t.labelStyle, true, true), g = m3.children[0], u2 = ia(m3);
  s = g.getBoundingClientRect(), u2.attr("width", s.width), u2.attr("height", s.height);
  let y = (t.padding || 0) / 2;
  ia(m3).attr("transform", "translate( " + (s.width > l.width ? 0 : (l.width - s.width) / 2) + ", " + (l.height + y + 5) + ")"), ia(e).attr("transform", "translate( " + (s.width < l.width ? 0 : -(l.width - s.width) / 2) + ", 0)"), s = i.node().getBBox(), i.attr("transform", "translate(" + -s.width / 2 + ", " + (-s.height / 2 - y + 3) + ")");
  let b = s.width + (t.padding || 0), S2 = s.height + (t.padding || 0), N = -s.width / 2 - y, w = -s.height / 2 - y, B, C;
  if (t.look === "handDrawn") {
    let R = Vt2.svg(o), M2 = S(t, {}), E = R.path(it(N, w, b, S2, t.rx || 0), M2), H = R.line(-s.width / 2 - y, -s.height / 2 - y + l.height + y, s.width / 2 + y, -s.height / 2 - y + l.height + y, M2);
    C = o.insert(() => (pt.debug("Rough node insert CXC", E), H), ":first-child"), B = o.insert(() => (pt.debug("Rough node insert CXC", E), E), ":first-child");
  } else B = f.insert("rect", ":first-child"), C = f.insert("line"), B.attr("class", "outer title-state").attr("style", h).attr("x", -s.width / 2 - y).attr("y", -s.height / 2 - y).attr("width", s.width + (t.padding || 0)).attr("height", s.height + (t.padding || 0)), C.attr("class", "divider").attr("x1", -s.width / 2 - y).attr("x2", s.width / 2 + y).attr("y1", -s.height / 2 - y + l.height + y).attr("y2", -s.height / 2 - y + l.height + y);
  return v(t, B), t.intersect = function(R) {
    return $.rect(t, R);
  }, o;
}
m(Fe, "rectWithTitle");
async function _e(d2, t, { config: { themeVariables: c } }) {
  let h = (c == null ? void 0 : c.radius) ?? 5, a = { rx: h, ry: h, classes: "", labelPaddingX: ((t == null ? void 0 : t.padding) ?? 0) * 1, labelPaddingY: ((t == null ? void 0 : t.padding) ?? 0) * 1 };
  return pt2(d2, t, a);
}
m(_e, "roundedRect");
var Dt = 8;
async function qe(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 12 : t.padding ?? 0, { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ?? i.width) + a * 2 + (t.look === "neo" ? Dt : Dt * 2), e = ((t == null ? void 0 : t.height) ?? i.height) + o * 2, s = r - Dt, p2 = e, l = Dt - r / 2, m3 = -e / 2, { cssStyles: g } = t, u2 = Vt2.svg(f), y = S(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  let b = [{ x: l, y: m3 }, { x: l + s, y: m3 }, { x: l + s, y: m3 + p2 }, { x: l - Dt, y: m3 + p2 }, { x: l - Dt, y: m3 }, { x: l, y: m3 }, { x: l, y: m3 + p2 }], S2 = u2.polygon(b.map((w) => [w.x, w.y]), y), N = f.insert(() => S2, ":first-child");
  return N.attr("class", "basic label-container outer-path").attr("style", Vt(g)), h && t.look !== "handDrawn" && N.selectAll("path").attr("style", h), g && t.look !== "handDrawn" && N.selectAll("path").attr("style", h), n.attr("transform", `translate(${Dt / 2 - i.width / 2 - (i.x - (i.left ?? 0))}, ${-(i.height / 2) - (i.y - (i.top ?? 0))})`), v(t, N), t.intersect = function(w) {
    return $.rect(t, w);
  }, f;
}
m(qe, "shadedProcess");
async function ze(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a;
  (t.width || t.height) && (t.width = Math.max(((t == null ? void 0 : t.width) ?? 0) - o * 2, 10), t.height = Math.max(((t == null ? void 0 : t.height) ?? 0) / 1.5 - f * 2, 10));
  let { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : n.width) + o * 2, s = (((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : n.height) + f * 2) * 1.5, p2 = e, l = s / 1.5, m3 = -p2 / 2, g = -l / 2, { cssStyles: u2 } = t, y = Vt2.svg(i), b = S(t, {});
  t.look !== "handDrawn" && (b.roughness = 0, b.fillStyle = "solid");
  let S2 = [{ x: m3, y: g }, { x: m3, y: g + l }, { x: m3 + p2, y: g + l }, { x: m3 + p2, y: g - l / 2 }], N = I(S2), w = y.path(N, b), B = i.insert(() => w, ":first-child");
  return B.attr("class", "basic label-container  outer-path"), u2 && t.look !== "handDrawn" && B.selectChildren("path").attr("style", u2), h && t.look !== "handDrawn" && B.selectChildren("path").attr("style", h), B.attr("transform", `translate(0, ${l / 4})`), r.attr("transform", `translate(${-p2 / 2 + (t.padding ?? 0) - (n.x - (n.left ?? 0))}, ${-l / 4 + (t.padding ?? 0) - (n.y - (n.top ?? 0))})`), v(t, B), t.intersect = function(C) {
    return $.polygon(t, S2, C);
  }, i;
}
m(ze, "slopedRect");
async function Ue(d2, t) {
  let c = t.padding ?? 0, h = t.look === "neo" ? 16 : c * 2, a = t.look === "neo" ? 12 : c, o = { rx: 0, ry: 0, classes: "", labelPaddingX: t.labelPaddingX ?? h, labelPaddingY: a };
  return pt2(d2, t, o);
}
m(Ue, "squareRect");
async function Ze(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 20 : a, f = t.look === "neo" ? 12 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = n.height + (t.look === "neo" ? f * 2 : f), e = n.width + r / 4 + (t.look === "neo" ? o * 2 : o), s = r / 2, { cssStyles: p2 } = t, l = Vt2.svg(i), m3 = S(t, {});
  t.look !== "handDrawn" && (m3.roughness = 0, m3.fillStyle = "solid");
  let g = [{ x: -e / 2 + s, y: -r / 2 }, { x: e / 2 - s, y: -r / 2 }, ...$t(-e / 2 + s, 0, s, 50, 90, 270), { x: e / 2 - s, y: r / 2 }, ...$t(e / 2 - s, 0, s, 50, 270, 450)], u2 = I(g), y = l.path(u2, m3), b = i.insert(() => y, ":first-child");
  return b.attr("class", "basic label-container outer-path"), p2 && t.look !== "handDrawn" && b.selectChildren("path").attr("style", p2), h && t.look !== "handDrawn" && b.selectChildren("path").attr("style", h), v(t, b), t.intersect = function(S2) {
    return $.polygon(t, g, S2);
  }, i;
}
m(Ze, "stadium");
async function Je(d2, t) {
  let c = { rx: t.look === "neo" ? 3 : 5, ry: t.look === "neo" ? 3 : 5, classes: "flowchart-node" };
  return pt2(d2, t, c);
}
m(Je, "state");
function Ke(d2, t, { config: { themeVariables: c } }) {
  var _a, _b;
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.labelStyle = h;
  let { cssStyles: o } = t, { lineColor: f, stateBorder: i, nodeBorder: n, nodeShadow: r } = c;
  (t.width || t.height) && ((t.width ?? 0) < 14 && (t.width = 14), (t.height ?? 0) < 14 && (t.height = 14)), t.width || (t.width = 14), t.height || (t.height = 14);
  let e = d2.insert("g").attr("class", "node default").attr("id", t.domId ?? t.id), s = Vt2.svg(e), p2 = S(t, {});
  t.look !== "handDrawn" && (p2.roughness = 0, p2.fillStyle = "solid");
  let l = s.circle(0, 0, t.width, { ...p2, stroke: f, strokeWidth: 2 }), m3 = i ?? n, g = (t.width ?? 0) * 5 / 14, u2 = s.circle(0, 0, g, { ...p2, fill: m3, stroke: m3, strokeWidth: 2, fillStyle: "solid" }), y = e.insert(() => l, ":first-child");
  if (y.insert(() => u2), t.look !== "handDrawn" && y.attr("class", "outer-path"), o && y.selectAll("path").attr("style", o), a && y.selectAll("path").attr("style", a), t.width < 25 && r && t.look !== "handDrawn") {
    let b = ((_b = (_a = d2.node()) == null ? void 0 : _a.ownerSVGElement) == null ? void 0 : _b.id) ?? "", S2 = b ? `${b}-drop-shadow-small` : "drop-shadow-small";
    y.attr("style", `filter:url(#${S2})`);
  }
  return v(t, y), t.intersect = function(b) {
    return $.circle(t, (t.width ?? 0) / 2, b);
  }, e;
}
m(Ke, "stateEnd");
function Qe(d2, t, { config: { themeVariables: c } }) {
  var _a, _b;
  let { lineColor: h, nodeShadow: a } = c;
  (t.width || t.height) && ((t.width ?? 0) < 14 && (t.width = 14), (t.height ?? 0) < 14 && (t.height = 14)), t.width || (t.width = 14), t.height || (t.height = 14);
  let o = d2.insert("g").attr("class", "node default").attr("id", t.domId || t.id), f;
  if (t.look === "handDrawn") {
    let n = Vt2.svg(o).circle(0, 0, t.width, u(h));
    f = o.insert(() => n), f.attr("class", "state-start").attr("r", (t.width ?? 7) / 2).attr("width", t.width ?? 14).attr("height", t.height ?? 14);
  } else f = o.insert("circle", ":first-child"), f.attr("class", "state-start").attr("r", (t.width ?? 7) / 2).attr("width", t.width ?? 14).attr("height", t.height ?? 14);
  if (t.width < 25 && a && t.look !== "handDrawn") {
    let i = ((_b = (_a = d2.node()) == null ? void 0 : _a.ownerSVGElement) == null ? void 0 : _b.id) ?? "", n = i ? `${i}-drop-shadow-small` : "drop-shadow-small";
    f.attr("style", `filter:url(#${n})`);
  }
  return v(t, f), t.intersect = function(i) {
    return $.circle(t, (t.width ?? 7) / 2, i);
  }, o;
}
m(Qe, "stateStart");
var kt = 8;
async function ts(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = (t == null ? void 0 : t.padding) ?? 8, o = t.look === "neo" ? 28 : a, f = t.look === "neo" ? 12 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ?? n.width) + 2 * kt + o, e = ((t == null ? void 0 : t.height) ?? n.height) + f, s = r - 2 * kt, p2 = e, l = -r / 2, m3 = -e / 2, g = [{ x: 0, y: 0 }, { x: s, y: 0 }, { x: s, y: -p2 }, { x: 0, y: -p2 }, { x: 0, y: 0 }, { x: -8, y: 0 }, { x: s + 8, y: 0 }, { x: s + 8, y: -p2 }, { x: -8, y: -p2 }, { x: -8, y: 0 }];
  if (t.look === "handDrawn") {
    let u2 = Vt2.svg(i), y = S(t, {}), b = u2.rectangle(l, m3, s + 16, p2, y), S2 = u2.line(l + kt, m3, l + kt, m3 + p2, y), N = u2.line(l + kt + s, m3, l + kt + s, m3 + p2, y);
    i.insert(() => S2, ":first-child"), i.insert(() => N, ":first-child");
    let w = i.insert(() => b, ":first-child"), { cssStyles: B } = t;
    w.attr("class", "basic label-container").attr("style", Vt(B)), v(t, w);
  } else {
    let u2 = et(i, s, p2, g);
    h && u2.attr("style", h), v(t, u2);
  }
  return t.intersect = function(u2) {
    return $.polygon(t, g, u2);
  }, i;
}
m(ts, "subroutine");
var Xt = 0.2;
async function es(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a;
  (t.width || t.height) && (t.height = Math.max(((t == null ? void 0 : t.height) ?? 0) - f * 2, 10), t.width = Math.max(((t == null ? void 0 : t.width) ?? 0) - o * 2 - Xt * (t.height + f * 2), 10));
  let { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : n.height) + f * 2, e = Xt * r, s = Xt * r, l = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : n.width) + o * 2 + e - e, m3 = r, g = -l / 2, u2 = -m3 / 2, { cssStyles: y } = t, b = Vt2.svg(i), S2 = S(t, {}), N = [{ x: g - e / 2, y: u2 }, { x: g + l + e / 2, y: u2 }, { x: g + l + e / 2, y: u2 + m3 }, { x: g - e / 2, y: u2 + m3 }], w = [{ x: g + l - e / 2, y: u2 + m3 }, { x: g + l + e / 2, y: u2 + m3 }, { x: g + l + e / 2, y: u2 + m3 - s }];
  t.look !== "handDrawn" && (S2.roughness = 0, S2.fillStyle = "solid");
  let B = I(N), C = b.path(B, S2), R = I(w), M2 = b.path(R, { ...S2, fillStyle: "solid" }), E = i.insert(() => M2, ":first-child");
  return E.insert(() => C, ":first-child"), E.attr("class", "basic label-container outer-path"), y && t.look !== "handDrawn" && E.selectAll("path").attr("style", y), h && t.look !== "handDrawn" && E.selectAll("path").attr("style", h), v(t, E), t.intersect = function(H) {
    return $.polygon(t, N, H);
  }, i;
}
m(es, "taggedRect");
async function ss(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, label: f } = await G2(d2, t, T(t)), i = Math.max(o.width + (t.padding ?? 0) * 2, (t == null ? void 0 : t.width) ?? 0), n = Math.max(o.height + (t.padding ?? 0) * 2, (t == null ? void 0 : t.height) ?? 0), r = n / 8, e = 0.2 * i, s = 0.2 * n, p2 = n + r, { cssStyles: l } = t, m3 = Vt2.svg(a), g = S(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = [{ x: -i / 2 - i / 2 * 0.1, y: p2 / 2 }, ...at(-i / 2 - i / 2 * 0.1, p2 / 2, i / 2 + i / 2 * 0.1, p2 / 2, r, 0.8), { x: i / 2 + i / 2 * 0.1, y: -p2 / 2 }, { x: -i / 2 - i / 2 * 0.1, y: -p2 / 2 }], y = -i / 2 + i / 2 * 0.1, b = -p2 / 2 - s * 0.4, S2 = [{ x: y + i - e, y: (b + n) * 1.3 }, { x: y + i, y: b + n - s }, { x: y + i, y: (b + n) * 0.9 }, ...at(y + i, (b + n) * 1.25, y + i - e, (b + n) * 1.3, -n * 0.02, 0.5)], N = I(u2), w = m3.path(N, g), B = I(S2), C = m3.path(B, { ...g, fillStyle: "solid" }), R = a.insert(() => C, ":first-child");
  return R.insert(() => w, ":first-child"), R.attr("class", "basic label-container outer-path"), l && t.look !== "handDrawn" && R.selectAll("path").attr("style", l), h && t.look !== "handDrawn" && R.selectAll("path").attr("style", h), R.attr("transform", `translate(0,${-r / 2})`), f.attr("transform", `translate(${-i / 2 + (t.padding ?? 0) - (o.x - (o.left ?? 0))},${-n / 2 + (t.padding ?? 0) - r / 2 - (o.y - (o.top ?? 0))})`), v(t, R), t.intersect = function(M2) {
    return $.polygon(t, u2, M2);
  }, a;
}
m(ss, "taggedWaveEdgedRectangle");
async function rs(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o } = await G2(d2, t, T(t)), f = Math.max(o.width + (t.padding ?? 0), (t == null ? void 0 : t.width) || 0), i = Math.max(o.height + (t.padding ?? 0), (t == null ? void 0 : t.height) || 0), n = -f / 2, r = -i / 2, e = a.insert("rect", ":first-child");
  return e.attr("class", "text").attr("style", h).attr("rx", 0).attr("ry", 0).attr("x", n).attr("y", r).attr("width", f).attr("height", i), v(t, e), t.intersect = function(s) {
    return $.rect(t, s);
  }, a;
}
m(rs, "text");
var qs = m((d2, t, c, h, a, o) => `M${d2},${t}
    a${a},${o} 0,0,1 0,${-h}
    l${c},0
    a${a},${o} 0,0,1 0,${h}
    M${c},${-h}
    a${a},${o} 0,0,0 0,${h}
    l${-c},0`, "createCylinderPathD");
var zs = m((d2, t, c, h, a, o) => [`M${d2},${t}`, `M${d2 + c},${t}`, `a${a},${o} 0,0,0 0,${-h}`, `l${-c},0`, `a${a},${o} 0,0,0 0,${h}`, `l${c},0`].join(" "), "createOuterCylinderPathD");
var Us = m((d2, t, c, h, a, o) => [`M${d2 + c / 2},${-h / 2}`, `a${a},${o} 0,0,0 0,${h}`].join(" "), "createInnerCylinderPathD");
var is = 5;
var os = 10;
async function as(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 12 : a / 2;
  if (t.width || t.height) {
    let g = t.height ?? 0;
    t.height = (t.height ?? 0) - o, t.height < is && (t.height = is);
    let y = g / 2 / (2.5 + g / 50);
    t.width = (t.width ?? 0) - o - y * 3, t.width < os && (t.width = os);
  }
  let { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = (t.height ? t.height : i.height) + o, e = r / 2, s = e / (2.5 + r / 50), p2 = (t.width ? t.width : i.width) + s + o, { cssStyles: l } = t, m3;
  if (t.look === "handDrawn") {
    let g = Vt2.svg(f), u2 = zs(0, 0, p2, r, s, e), y = Us(0, 0, p2, r, s, e), b = g.path(u2, S(t, {})), S2 = g.path(y, S(t, { fill: "none" }));
    m3 = f.insert(() => S2, ":first-child"), m3 = f.insert(() => b, ":first-child"), m3.attr("class", "basic label-container"), l && m3.attr("style", l);
  } else {
    let g = qs(0, 0, p2, r, s, e);
    m3 = f.insert("path", ":first-child").attr("d", g).attr("class", "basic label-container").attr("style", Vt(l)).attr("style", h), m3.attr("class", "basic label-container outer-path"), l && m3.selectAll("path").attr("style", l), h && m3.selectAll("path").attr("style", h);
  }
  return m3.attr("label-offset-x", s), m3.attr("transform", `translate(${-p2 / 2}, ${r / 2} )`), n.attr("transform", `translate(${-(i.width / 2) - s - (i.x - (i.left ?? 0))}, ${-(i.height / 2) - (i.y - (i.top ?? 0))})`), v(t, m3), t.intersect = function(g) {
    let u2 = $.rect(t, g), y = u2.y - (t.y ?? 0);
    if (e != 0 && (Math.abs(y) < (t.height ?? 0) / 2 || Math.abs(y) == (t.height ?? 0) / 2 && Math.abs(u2.x - (t.x ?? 0)) > (t.width ?? 0) / 2 - s)) {
      let b = s * s * (1 - y * y / (e * e));
      b != 0 && (b = Math.sqrt(Math.abs(b))), b = s - b, g.x - (t.x ?? 0) > 0 && (b = -b), u2.x += b;
    }
    return u2;
  }, f;
}
m(as, "tiltedCylinder");
async function ns(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = (t.look === "neo", a), f = t.look === "neo" ? a * 2 : a, { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.height) ?? n.height) + o, e = ((t == null ? void 0 : t.width) ?? n.width) + f, s = [{ x: -3 * r / 6, y: 0 }, { x: e + 3 * r / 6, y: 0 }, { x: e, y: -r }, { x: 0, y: -r }], p2, { cssStyles: l } = t;
  if (t.look === "handDrawn") {
    let m3 = Vt2.svg(i), g = S(t, {}), u2 = I(s), y = m3.path(u2, g);
    p2 = i.insert(() => y, ":first-child").attr("transform", `translate(${-e / 2}, ${r / 2})`), l && p2.attr("style", l);
  } else p2 = et(i, e, r, s);
  return h && p2.attr("style", h), t.width = e, t.height = r, v(t, p2), t.intersect = function(m3) {
    return $.polygon(t, s, m3);
  }, i;
}
m(ns, "trapezoid");
async function ls(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a, i = 15, n = 5;
  (t.width || t.height) && (t.height = (t.height ?? 0) - f * 2, t.height < n && (t.height = n), t.width = (t.width ?? 0) - o * 2, t.width < i && (t.width = i));
  let { shapeSvg: r, bbox: e } = await G2(d2, t, T(t)), s = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : e.width) + o * 2, p2 = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : e.height) + f * 2, { cssStyles: l } = t, m3 = Vt2.svg(r), g = S(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = [{ x: -s / 2 * 0.8, y: -p2 / 2 }, { x: s / 2 * 0.8, y: -p2 / 2 }, { x: s / 2, y: -p2 / 2 * 0.6 }, { x: s / 2, y: p2 / 2 }, { x: -s / 2, y: p2 / 2 }, { x: -s / 2, y: -p2 / 2 * 0.6 }], y = I(u2), b = m3.path(y, g), S2 = r.insert(() => b, ":first-child");
  return S2.attr("class", "basic label-container outer-path"), l && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", l), h && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", h), v(t, S2), t.intersect = function(N) {
    return $.polygon(t, u2, N);
  }, r;
}
m(ls, "trapezoidalPentagon");
var cs = 10;
var hs = 10;
async function ps(d2, t) {
  var _a;
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? a * 2 : a;
  (t.width || t.height) && (t.width = (((t == null ? void 0 : t.width) ?? 0) - o) / 2, t.width < hs && (t.width = hs), t.height = (t == null ? void 0 : t.height) ?? 0, t.height < cs && (t.height = cs));
  let { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = Hi((_a = qo().flowchart) == null ? void 0 : _a.htmlLabels), e = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : i.width) + o, s = (t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : e + i.height, p2 = s, l = [{ x: 0, y: 0 }, { x: p2, y: 0 }, { x: p2 / 2, y: -s }], { cssStyles: m3 } = t, g = Vt2.svg(f), u2 = S(t, {});
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let y = I(l), b = g.path(y, u2), S2 = f.insert(() => b, ":first-child").attr("transform", `translate(${-s / 2}, ${s / 2})`).attr("class", "outer-path");
  return m3 && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", m3), h && t.look !== "handDrawn" && S2.selectChildren("path").attr("style", h), t.width = e, t.height = s, v(t, S2), n.attr("transform", `translate(${-i.width / 2 - (i.x - (i.left ?? 0))}, ${s / 2 - (i.height + (t.padding ?? 0) / (r ? 2 : 1) - (i.y - (i.top ?? 0)))})`), t.intersect = function(N) {
    return pt.info("Triangle intersect", t, l, N), $.polygon(t, l, N);
  }, f;
}
m(ps, "triangle");
async function ms(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 12 : a, i = true;
  (t.width || t.height) && (i = false, t.width = ((t == null ? void 0 : t.width) ?? 0) - o * 2, t.width < 10 && (t.width = 10), t.height = ((t == null ? void 0 : t.height) ?? 0) - f * 2, t.height < 10 && (t.height = 10));
  let { shapeSvg: n, bbox: r, label: e } = await G2(d2, t, T(t)), s = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : r.width) + (o ?? 0) * 2, p2 = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : r.height) + (f ?? 0) * 2, l = t.look === "neo" ? p2 / 4 : p2 / 8, m3 = p2 + (i ? l : -l), { cssStyles: g } = t, y = 14 - s, b = y > 0 ? y / 2 : 0, S2 = Vt2.svg(n), N = S(t, {});
  t.look !== "handDrawn" && (N.roughness = 0, N.fillStyle = "solid");
  let w = [{ x: -s / 2 - b, y: m3 / 2 }, ...at(-s / 2 - b, m3 / 2, s / 2 + b, m3 / 2, l, 0.8), { x: s / 2 + b, y: -m3 / 2 }, { x: -s / 2 - b, y: -m3 / 2 }], B = I(w), C = S2.path(B, N), R = n.insert(() => C, ":first-child");
  return R.attr("class", "basic label-container outer-path"), g && t.look !== "handDrawn" && R.selectAll("path").attr("style", g), h && t.look !== "handDrawn" && R.selectAll("path").attr("style", h), R.attr("transform", `translate(0,${-l / 2})`), e.attr("transform", `translate(${-s / 2 + (t.padding ?? 0) - (r.x - (r.left ?? 0))},${-p2 / 2 + (t.padding ?? 0) - l - (r.y - (r.top ?? 0))})`), v(t, R), t.intersect = function(M2) {
    return $.polygon(t, w, M2);
  }, n;
}
m(ms, "waveEdgedRectangle");
async function gs(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.padding ?? 0, o = t.look === "neo" ? 16 : a, f = t.look === "neo" ? 20 : a;
  if (t.width || t.height) {
    t.width = (t == null ? void 0 : t.width) ?? 0, t.width < 20 && (t.width = 20), t.height = (t == null ? void 0 : t.height) ?? 0, t.height < 10 && (t.height = 10);
    let N = Math.min(t.height * 0.2, t.height / 4);
    t.height = Math.ceil(t.height - f - N * (20 / 9)), t.width = t.width - o * 2;
  }
  let { shapeSvg: i, bbox: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : n.width) + o * 2, e = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : n.height) + f, s = e / 8, p2 = e + s * 2, { cssStyles: l } = t, m3 = Vt2.svg(i), g = S(t, {});
  t.look !== "handDrawn" && (g.roughness = 0, g.fillStyle = "solid");
  let u2 = [{ x: -r / 2, y: p2 / 2 }, ...at(-r / 2, p2 / 2, r / 2, p2 / 2, s, 1), { x: r / 2, y: -p2 / 2 }, ...at(r / 2, -p2 / 2, -r / 2, -p2 / 2, s, -1)], y = I(u2), b = m3.path(y, g), S2 = i.insert(() => b, ":first-child");
  return S2.attr("class", "basic label-container"), l && t.look !== "handDrawn" && S2.selectAll("path").attr("style", l), h && t.look !== "handDrawn" && S2.selectAll("path").attr("style", h), v(t, S2), t.intersect = function(N) {
    return $.polygon(t, u2, N);
  }, i;
}
m(gs, "waveRectangle");
var K = 10;
async function fs(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 12 : t.padding ?? 0;
  (t.width || t.height) && (t.width = Math.max(((t == null ? void 0 : t.width) ?? 0) - a * 2 - K, 10), t.height = Math.max(((t == null ? void 0 : t.height) ?? 0) - o * 2 - K, 10));
  let { shapeSvg: f, bbox: i, label: n } = await G2(d2, t, T(t)), r = ((t == null ? void 0 : t.width) ? t == null ? void 0 : t.width : i.width) + a * 2 + K, e = ((t == null ? void 0 : t.height) ? t == null ? void 0 : t.height : i.height) + o * 2 + K, s = r - K, p2 = e - K, l = -s / 2, m3 = -p2 / 2, { cssStyles: g } = t, u2 = Vt2.svg(f), y = S(t, {}), b = [{ x: l - K, y: m3 - K }, { x: l - K, y: m3 + p2 }, { x: l + s, y: m3 + p2 }, { x: l + s, y: m3 - K }], S2 = `M${l - K},${m3 - K} L${l + s},${m3 - K} L${l + s},${m3 + p2} L${l - K},${m3 + p2} L${l - K},${m3 - K}
                M${l - K},${m3} L${l + s},${m3}
                M${l},${m3 - K} L${l},${m3 + p2}`;
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  let N = u2.path(S2, y), w = f.insert(() => N, ":first-child");
  return w.attr("transform", `translate(${K / 2}, ${K / 2})`), w.attr("class", "basic label-container outer-path"), g && t.look !== "handDrawn" && w.selectAll("path").attr("style", g), h && t.look !== "handDrawn" && w.selectAll("path").attr("style", h), n.attr("transform", `translate(${-(i.width / 2) + K / 2 - (i.x - (i.left ?? 0))}, ${-(i.height / 2) + K / 2 - (i.y - (i.top ?? 0))})`), v(t, w), t.intersect = function(B) {
    return $.polygon(t, b, B);
  }, f;
}
m(fs, "windowPane");
var ds2 = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]);
var Zs = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color"]);
async function Yt2(d2, t) {
  var _a, _b, _c, _d, _e2;
  let c = t;
  c.alias && (t.label = c.alias);
  let { theme: h, themeVariables: a } = Ot(), { rowEven: o, rowOdd: f, nodeBorder: i, borderColorArray: n } = a;
  if (t.look === "handDrawn") {
    let { themeVariables: F } = Ot(), { background: U } = F, Q = { ...t, id: t.id + "-background", domId: (t.domId || t.id) + "-background", look: "default", cssStyles: ["stroke: none", `fill: ${U}`] };
    await Yt2(d2, Q);
  }
  let r = Ot();
  t.useHtmlLabels = r.htmlLabels;
  let e = ((_a = r.er) == null ? void 0 : _a.diagramPadding) ?? 10, s = ((_b = r.er) == null ? void 0 : _b.entityPadding) ?? 6, { cssStyles: p2 } = t, { labelStyles: l, nodeStyles: m3 } = m2(t);
  if (c.attributes.length === 0 && t.label) {
    let F = { rx: 0, ry: 0, labelPaddingX: e, labelPaddingY: e * 1.5, classes: "" };
    M(t.label, r) + F.labelPaddingX * 2 < r.er.minEntityWidth && (t.width = r.er.minEntityWidth);
    let U = await pt2(d2, t, F);
    if (h != null && ds2.has(h)) {
      let Q = c.colorIndex ?? 0;
      U.attr("data-color-id", `color-${Q % n.length}`);
    }
    if (!Hi(r.htmlLabels)) {
      let Q = U.select("text"), ot = (_c = Q.node()) == null ? void 0 : _c.getBBox();
      Q.attr("transform", `translate(${-ot.width / 2}, 0)`);
    }
    return U;
  }
  r.htmlLabels || (e *= 1.25, s *= 1.25);
  let g = T(t);
  g || (g = "node default");
  let u2 = d2.insert("g").attr("class", g).attr("id", t.domId || t.id), y = await Tt(u2, t.label ?? "", r, 0, 0, ["name"], l);
  y.height += s;
  let b = 0, S2 = [], N = [], w = 0, B = 0, C = 0, R = 0, M2 = true, E = true;
  for (let F of c.attributes) {
    let U = await Tt(u2, F.type, r, 0, b, ["attribute-type"], l);
    w = Math.max(w, U.width + e);
    let Q = await Tt(u2, F.name, r, 0, b, ["attribute-name"], l);
    B = Math.max(B, Q.width + e);
    let ot = await Tt(u2, F.keys.join(), r, 0, b, ["attribute-keys"], l);
    C = Math.max(C, ot.width + e);
    let St = await Tt(u2, F.comment, r, 0, b, ["attribute-comment"], l);
    R = Math.max(R, St.width + e);
    let gt = Math.max(U.height, Q.height, ot.height, St.height) + s;
    N.push({ yOffset: b, rowHeight: gt }), b += gt;
  }
  let H = 4;
  C <= e && (M2 = false, C = 0, H--), R <= e && (E = false, R = 0, H--);
  let W = u2.node().getBBox();
  if (y.width + e * 2 - (w + B + C + R) > 0) {
    let F = y.width + e * 2 - (w + B + C + R);
    w += F / H, B += F / H, C > 0 && (C += F / H), R > 0 && (R += F / H);
  }
  let j = w + B + C + R, L = Vt2.svg(u2), O = S(t, {});
  t.look !== "handDrawn" && (O.roughness = 0, O.fillStyle = "solid");
  let A = 0;
  N.length > 0 && (A = N.reduce((F, U) => F + ((U == null ? void 0 : U.rowHeight) ?? 0), 0));
  let V = Math.max(W.width + e * 2, (t == null ? void 0 : t.width) || 0, j), X = Math.max((A ?? 0) + y.height, (t == null ? void 0 : t.height) || 0), _ = -V / 2, z = -X / 2;
  if (u2.selectAll("g:not(:first-child)").each((F, U, Q) => {
    let ot = ia(Q[U]), St = ot.attr("transform"), gt = 0, _t = 0;
    if (St) {
      let Ot2 = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(St);
      Ot2 && (gt = parseFloat(Ot2[1]), _t = parseFloat(Ot2[2]), ot.attr("class").includes("attribute-name") ? gt += w : ot.attr("class").includes("attribute-keys") ? gt += w + B : ot.attr("class").includes("attribute-comment") && (gt += w + B + C));
    }
    ot.attr("transform", `translate(${_ + e / 2 + gt}, ${_t + z + y.height + s / 2})`);
  }), u2.select(".name").attr("transform", "translate(" + -y.width / 2 + ", " + (z + s / 2) + ")"), h != null && ds2.has(h)) {
    let F = c.colorIndex ?? 0;
    u2.attr("data-color-id", `color-${F % n.length}`);
  }
  let Bt = L.rectangle(_, z, V, X, O), Pt = u2.insert(() => Bt, ":first-child").attr("class", "outer-path").attr("style", p2.join(""));
  S2.push(0);
  for (let [F, U] of N.entries()) {
    let ot = (F + 1) % 2 === 0 && U.yOffset !== 0, St = L.rectangle(_, y.height + z + (U == null ? void 0 : U.yOffset), V, U == null ? void 0 : U.rowHeight, { ...O, fill: ot ? o : f, stroke: i });
    u2.insert(() => St, "g.label").attr("style", p2.join("")).attr("class", `row-rect-${ot ? "even" : "odd"}`);
  }
  let ct = 1e-4, nt = Ct(_, y.height + z, V + _, y.height + z, ct), ht = L.polygon(nt.map((F) => [F.x, F.y]), O);
  if (u2.insert(() => ht).attr("class", "divider"), nt = Ct(w + _, y.height + z, w + _, X + z, ct), ht = L.polygon(nt.map((F) => [F.x, F.y]), O), u2.insert(() => ht).attr("class", "divider"), M2) {
    let F = w + B + _;
    nt = Ct(F, y.height + z, F, X + z, ct), ht = L.polygon(nt.map((U) => [U.x, U.y]), O), u2.insert(() => ht).attr("class", "divider");
  }
  if (E) {
    let F = w + B + C + _;
    nt = Ct(F, y.height + z, F, X + z, ct), ht = L.polygon(nt.map((U) => [U.x, U.y]), O), u2.insert(() => ht).attr("class", "divider");
  }
  for (let F of S2) {
    let U = y.height + z + F;
    nt = Ct(_, U, V + _, U, ct), ht = L.polygon(nt.map((Q) => [Q.x, Q.y]), O), u2.insert(() => ht).attr("class", "divider");
  }
  if (v(t, Pt), m3 && t.look !== "handDrawn") if (h != null && Zs.has(h)) u2.selectAll("path").attr("style", m3);
  else {
    let U = (_e2 = (_d = m3.split(";")) == null ? void 0 : _d.filter((Q) => Q.includes("stroke"))) == null ? void 0 : _e2.map((Q) => `${Q}`).join("; ");
    u2.selectAll("path").attr("style", U ?? ""), u2.selectAll(".row-rect-even path").attr("style", m3);
  }
  return t.intersect = function(F) {
    return $.rect(t, F);
  }, u2;
}
m(Yt2, "erBox");
async function Tt(d2, t, c, h = 0, a = 0, o = [], f = "") {
  let i = d2.insert("g").attr("class", `label ${o.join(" ")}`).attr("transform", `translate(${h}, ${a})`).attr("style", f);
  t !== cn(t) && (t = cn(t), t = t.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
  let n = i.node().appendChild(await Lr(i, t, { width: M(t, c) + 100, style: f, useHtmlLabels: c.htmlLabels }, c));
  if (t.includes("&lt;") || t.includes("&gt;")) {
    let e = n.children[0];
    for (e.textContent = e.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">"); e.childNodes[0]; ) e = e.childNodes[0], e.textContent = e.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  }
  let r = n.getBBox();
  if (Hi(c.htmlLabels)) {
    let e = n.children[0];
    e.style.textAlign = "start";
    let s = ia(n);
    r = e.getBoundingClientRect(), s.attr("width", r.width), s.attr("height", r.height);
  }
  return r;
}
m(Tt, "addText");
function Ct(d2, t, c, h, a) {
  return d2 === c ? [{ x: d2 - a / 2, y: t }, { x: d2 + a / 2, y: t }, { x: c + a / 2, y: h }, { x: c - a / 2, y: h }] : [{ x: d2, y: t - a / 2 }, { x: d2, y: t + a / 2 }, { x: c, y: h + a / 2 }, { x: c, y: h - a / 2 }];
}
m(Ct, "lineToPolygon");
async function ys(d2, t, c, h, a = c.class.padding ?? 12) {
  let o = h ? 0 : 3, f = d2.insert("g").attr("class", T(t)).attr("id", t.domId || t.id), i = null, n = null, r = null, e = null, s = 0, p2 = 0, l = 0;
  if (i = f.insert("g").attr("class", "annotation-group text"), t.annotations.length > 0) {
    let b = t.annotations[0];
    await jt(i, { text: `«${b}»` }, 0), s = i.node().getBBox().height;
  }
  n = f.insert("g").attr("class", "label-group text"), await jt(n, t, 0, ["font-weight: bolder"]);
  let m3 = n.node().getBBox();
  p2 = m3.height, r = f.insert("g").attr("class", "members-group text");
  let g = 0;
  for (let b of t.members) {
    let S2 = await jt(r, b, g, [b.parseClassifier()]);
    g += S2 + o;
  }
  l = r.node().getBBox().height, l <= 0 && (l = a / 2), e = f.insert("g").attr("class", "methods-group text");
  let u2 = 0;
  for (let b of t.methods) {
    let S2 = await jt(e, b, u2, [b.parseClassifier()]);
    u2 += S2 + o;
  }
  let y = f.node().getBBox();
  if (i !== null) {
    let b = i.node().getBBox();
    i.attr("transform", `translate(${-b.width / 2})`);
  }
  return n.attr("transform", `translate(${-m3.width / 2}, ${s})`), y = f.node().getBBox(), r.attr("transform", `translate(0, ${s + p2 + a * 2})`), y = f.node().getBBox(), e.attr("transform", `translate(0, ${s + p2 + (l ? l + a * 4 : a * 2)})`), y = f.node().getBBox(), { shapeSvg: f, bbox: y };
}
m(ys, "textHelper");
async function jt(d2, t, c, h = []) {
  let a = d2.insert("g").attr("class", "label").attr("style", h.join("; ")), o = Ot(), f = "useHtmlLabels" in t ? t.useHtmlLabels : Hi(o.htmlLabels) ?? true, i = "";
  "text" in t ? i = t.text : i = t.label, !f && i.startsWith("\\") && (i = i.substring(1)), Fo(i) && (f = true);
  let n = await Lr(a, ds(Yt(i)), { width: M(i, o) + 50, classes: "markdown-node-label", useHtmlLabels: f }, o), r, e = 1;
  if (f) {
    let s = n.children[0], p2 = ia(n);
    e = s.innerHTML.split("<br>").length, s.innerHTML.includes("</math>") && (e += s.innerHTML.split("<mrow>").length - 1);
    let l = s.getElementsByTagName("img");
    if (l) {
      let m3 = i.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all([...l].map((g) => new Promise((u2) => {
        function y() {
          var _a;
          if (g.style.display = "flex", g.style.flexDirection = "column", m3) {
            let b = ((_a = o.fontSize) == null ? void 0 : _a.toString()) ?? window.getComputedStyle(document.body).fontSize, N = parseInt(b, 10) * 5 + "px";
            g.style.minWidth = N, g.style.maxWidth = N;
          } else g.style.width = "100%";
          u2(g);
        }
        m(y, "setupImage"), setTimeout(() => {
          g.complete && y();
        }), g.addEventListener("error", y), g.addEventListener("load", y);
      })));
    }
    r = s.getBoundingClientRect(), p2.attr("width", r.width), p2.attr("height", r.height);
  } else {
    h.includes("font-weight: bolder") && ia(n).selectAll("tspan").attr("font-weight", ""), e = n.children.length;
    let s = n.children[0];
    (n.textContent === "" || n.textContent.includes("&gt")) && (s.textContent = i[0] + i.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim(), i[1] === " " && (s.textContent = s.textContent[0] + " " + s.textContent.substring(1))), s.textContent === "undefined" && (s.textContent = ""), r = n.getBBox();
  }
  return a.attr("transform", "translate(0," + (-r.height / (2 * e) + c) + ")"), r.height;
}
m(jt, "addText");
async function us(d2, t) {
  var _a, _b;
  let c = qo(), { themeVariables: h } = c, { useGradient: a } = h, o = c.class.padding ?? 12, f = o, i = t.useHtmlLabels ?? Hi(c.htmlLabels) ?? true, n = t;
  n.annotations = n.annotations ?? [], n.members = n.members ?? [], n.methods = n.methods ?? [];
  let { shapeSvg: r, bbox: e } = await ys(d2, t, c, i, f), { labelStyles: s, nodeStyles: p2 } = m2(t);
  t.labelStyle = s, t.cssStyles = n.styles || "";
  let l = ((_a = n.styles) == null ? void 0 : _a.join(";")) || p2 || "";
  t.cssStyles || (t.cssStyles = l.replaceAll("!important", "").split(";"));
  let m3 = n.members.length === 0 && n.methods.length === 0 && !((_b = c.class) == null ? void 0 : _b.hideEmptyMembersBox), g = Vt2.svg(r), u2 = S(t, {});
  t.look !== "handDrawn" && (u2.roughness = 0, u2.fillStyle = "solid");
  let y = Math.max(t.width ?? 0, e.width), b = Math.max(t.height ?? 0, e.height), S2 = (t.height ?? 0) > e.height;
  n.members.length === 0 && n.methods.length === 0 ? b += f : n.members.length > 0 && n.methods.length === 0 && (b += f * 2);
  let N = -y / 2, w = -b / 2, B = m3 ? o * 2 : n.members.length === 0 && n.methods.length === 0 ? -o : 0;
  S2 && (B = o * 2);
  let C = g.rectangle(N - o, w - o - (m3 ? o : n.members.length === 0 && n.methods.length === 0 ? -o / 2 : 0), y + 2 * o, b + 2 * o + B, u2), R = r.insert(() => C, ":first-child");
  R.attr("class", "basic label-container outer-path");
  let M2 = R.node().getBBox(), E = r.select(".annotation-group").node().getBBox().height - (m3 ? o / 2 : 0) || 0, H = r.select(".label-group").node().getBBox().height - (m3 ? o / 2 : 0) || 0, W = r.select(".members-group").node().getBBox().height - (m3 ? o / 2 : 0) || 0, j = (E + H + w + o - (w - o - (m3 ? o : n.members.length === 0 && n.methods.length === 0 ? -o / 2 : 0))) / 2;
  if (r.selectAll(".text").each((L, O, A) => {
    var _a2, _b2;
    let V = ia(A[O]), X = V.attr("transform"), _ = 0;
    if (X) {
      let ct = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(X);
      ct && (_ = parseFloat(ct[2]));
    }
    let z = _ + w + o - (m3 ? o : n.members.length === 0 && n.methods.length === 0 ? -o / 2 : 0);
    if (V.attr("class").includes("methods-group")) {
      let Pt = Math.max(W, f / 2);
      S2 ? z = Math.max(j, E + H + Pt + w + f * 2 + o) + f * 2 : z = E + H + Pt + w + f * 4 + o;
    }
    n.members.length === 0 && n.methods.length === 0 && ((_a2 = c.class) == null ? void 0 : _a2.hideEmptyMembersBox) && (n.annotations.length > 0 ? z = _ - f : z = _), i || (z -= 4);
    let Bt = N;
    (V.attr("class").includes("label-group") || V.attr("class").includes("annotation-group")) && (Bt = -((_b2 = V.node()) == null ? void 0 : _b2.getBBox().width) / 2 || 0, r.selectAll("text").each(function(Pt, ct, nt) {
      window.getComputedStyle(nt[ct]).textAnchor === "middle" && (Bt = 0);
    })), V.attr("transform", `translate(${Bt}, ${z})`);
  }), n.members.length > 0 || n.methods.length > 0 || m3) {
    let L = E + H + w + o, O = g.line(M2.x, L, M2.x + M2.width, L + 1e-3, u2);
    r.insert(() => O).attr("class", `divider${t.look === "neo" && !a ? " neo-line" : ""}`).attr("style", l);
  }
  if (m3 || n.members.length > 0 || n.methods.length > 0) {
    let L = E + H + W + w + f * 2 + o, O = g.line(M2.x, S2 ? Math.max(j, L) : L, M2.x + M2.width, (S2 ? Math.max(j, L) : L) + 1e-3, u2);
    r.insert(() => O).attr("class", `divider${t.look === "neo" && !a ? " neo-line" : ""}`).attr("style", l);
  }
  if (n.look !== "handDrawn" && r.selectAll("path").attr("style", l), R.select(":nth-child(2)").attr("style", l), r.selectAll(".divider").select("path").attr("style", l), t.labelStyle ? r.selectAll("span").attr("style", t.labelStyle) : r.selectAll("span").attr("style", l), !i) {
    let L = RegExp(/color\s*:\s*([^;]*)/), O = L.exec(l);
    if (O) {
      let A = O[0].replace("color", "fill");
      r.selectAll("tspan").attr("style", A);
    } else if (s) {
      let A = L.exec(s);
      if (A) {
        let V = A[0].replace("color", "fill");
        r.selectAll("tspan").attr("style", V);
      }
    }
  }
  return v(t, R), t.intersect = function(L) {
    return $.rect(t, L);
  }, r;
}
m(us, "classBox");
async function xs(d2, t) {
  var _a, _b;
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let a = t, o = t, f = 20, i = 20, n = "verifyMethod" in t, r = T(t), { themeVariables: e } = qo(), { borderColorArray: s, requirementEdgeLabelBackground: p2 } = e, l = d2.insert("g").attr("class", r).attr("id", t.domId ?? t.id), m3;
  n ? m3 = await mt(l, `&lt;&lt;${a.type}&gt;&gt;`, 0, t.labelStyle) : m3 = await mt(l, "&lt;&lt;Element&gt;&gt;", 0, t.labelStyle);
  let g = m3, u2 = await mt(l, a.name, g, t.labelStyle + "; font-weight: bold;");
  if (g += u2 + i, n) {
    let M2 = await mt(l, `${a.requirementId ? `ID: ${a.requirementId}` : ""}`, g, t.labelStyle);
    g += M2;
    let E = await mt(l, `${a.text ? `Text: ${a.text}` : ""}`, g, t.labelStyle);
    g += E;
    let H = await mt(l, `${a.risk ? `Risk: ${a.risk}` : ""}`, g, t.labelStyle);
    g += H, await mt(l, `${a.verifyMethod ? `Verification: ${a.verifyMethod}` : ""}`, g, t.labelStyle);
  } else {
    let M2 = await mt(l, `${o.type ? `Type: ${o.type}` : ""}`, g, t.labelStyle);
    g += M2, await mt(l, `${o.docRef ? `Doc Ref: ${o.docRef}` : ""}`, g, t.labelStyle);
  }
  let y = (((_a = l.node()) == null ? void 0 : _a.getBBox().width) ?? 200) + f, b = (((_b = l.node()) == null ? void 0 : _b.getBBox().height) ?? 200) + f, S2 = -y / 2, N = -b / 2, w = Vt2.svg(l), B = S(t, {});
  t.look !== "handDrawn" && (B.roughness = 0, B.fillStyle = "solid");
  let C = w.rectangle(S2, N, y, b, B), R = l.insert(() => C, ":first-child");
  if (R.attr("class", "basic label-container outer-path").attr("style", h), s == null ? void 0 : s.length) {
    let M2 = t.colorIndex ?? 0;
    l.attr("data-color-id", `color-${M2 % s.length}`);
  }
  if (l.selectAll(".label").each((M2, E, H) => {
    let W = ia(H[E]), j = W.attr("transform"), L = 0, O = 0;
    if (j) {
      let _ = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(j);
      _ && (L = parseFloat(_[1]), O = parseFloat(_[2]));
    }
    let A = O - b / 2, V = S2 + f / 2;
    (E === 0 || E === 1) && (V = L), W.attr("transform", `translate(${V}, ${A + f})`);
  }), g > m3 + u2 + i) {
    let M2 = N + m3 + u2 + i, E;
    if (t.look === "neo") {
      let j = [[S2, M2], [S2 + y, M2], [S2 + y, M2 + 1e-3], [S2, M2 + 1e-3]];
      E = w.polygon(j, B);
    } else E = w.line(S2, M2, S2 + y, M2, B);
    l.insert(() => E).attr("class", "divider");
  }
  return v(t, R), t.intersect = function(M2) {
    return $.rect(t, M2);
  }, h && t.look !== "handDrawn" && (p2 || (s == null ? void 0 : s.length)) && l.selectAll("path").attr("style", h), l;
}
m(xs, "requirementBox");
async function mt(d2, t, c, h = "") {
  if (t === "") return 0;
  let a = d2.insert("g").attr("class", "label").attr("style", h), o = qo(), f = o.htmlLabels ?? true, i = await Lr(a, ds(Yt(t)), { width: M(t, o) + 50, classes: "markdown-node-label", useHtmlLabels: f, style: h }, o), n;
  if (f) {
    let r = i.children[0], e = ia(i);
    n = r.getBoundingClientRect(), e.attr("width", n.width), e.attr("height", n.height);
  } else {
    let r = i.children[0];
    for (let e of r.children) h && e.setAttribute("style", h);
    n = i.getBBox(), n.height += 6;
  }
  return a.attr("transform", `translate(${-n.width / 2},${-n.height / 2 + c})`), n.height;
}
m(mt, "addText");
var Js = m((d2) => {
  switch (d2) {
    case "Very High":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return null;
    case "Low":
      return "blue";
    case "Very Low":
      return "lightblue";
  }
}, "colorFromPriority");
async function bs(d2, t, { config: c }) {
  var _a, _b;
  let { labelStyles: h, nodeStyles: a } = m2(t);
  t.labelStyle = h || "";
  let o = 10, f = t.width;
  t.width = (t.width ?? 200) - 10;
  let { shapeSvg: i, bbox: n, label: r } = await G2(d2, t, T(t)), e = t.padding || 10, s = "", p2;
  "ticket" in t && t.ticket && ((_a = c == null ? void 0 : c.kanban) == null ? void 0 : _a.ticketBaseUrl) && (s = (_b = c == null ? void 0 : c.kanban) == null ? void 0 : _b.ticketBaseUrl.replace("#TICKET#", t.ticket), p2 = i.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", s).attr("target", "_blank"));
  let l = { useHtmlLabels: t.useHtmlLabels, labelStyle: t.labelStyle || "", width: t.width, img: t.img, padding: t.padding || 8, centerLabel: false }, m3, g;
  p2 ? { label: m3, bbox: g } = await Gt(p2, "ticket" in t && t.ticket || "", l) : { label: m3, bbox: g } = await Gt(i, "ticket" in t && t.ticket || "", l);
  let { label: u2, bbox: y } = await Gt(i, "assigned" in t && t.assigned || "", l);
  t.width = f;
  let b = 10, S2 = (t == null ? void 0 : t.width) || 0, N = Math.max(g.height, y.height) / 2, w = Math.max(n.height + b * 2, (t == null ? void 0 : t.height) || 0) + N, B = -S2 / 2, C = -w / 2;
  r.attr("transform", "translate(" + (e - S2 / 2) + ", " + (-N - n.height / 2) + ")"), m3.attr("transform", "translate(" + (e - S2 / 2) + ", " + (-N + n.height / 2) + ")"), u2.attr("transform", "translate(" + (e + S2 / 2 - y.width - 2 * o) + ", " + (-N + n.height / 2) + ")");
  let R, { rx: M2, ry: E } = t, { cssStyles: H } = t;
  if (t.look === "handDrawn") {
    let W = Vt2.svg(i), j = S(t, {}), L = M2 || E ? W.path(it(B, C, S2, w, M2 || 0), j) : W.rectangle(B, C, S2, w, j);
    R = i.insert(() => L, ":first-child"), R.attr("class", "basic label-container").attr("style", H || null);
  } else {
    R = i.insert("rect", ":first-child"), R.attr("class", "basic label-container __APA__").attr("style", a).attr("rx", M2 ?? 5).attr("ry", E ?? 5).attr("x", B).attr("y", C).attr("width", S2).attr("height", w);
    let W = "priority" in t && t.priority;
    if (W) {
      let j = i.append("line"), L = B + 2, O = C + Math.floor((M2 ?? 0) / 2), A = C + w - Math.floor((M2 ?? 0) / 2);
      j.attr("x1", L).attr("y1", O).attr("x2", L).attr("y2", A).attr("stroke-width", "4").attr("stroke", Js(W));
    }
  }
  return v(t, R), t.height = w, t.intersect = function(W) {
    return $.rect(t, W);
  }, i;
}
m(bs, "kanbanItem");
async function Ss(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, halfPadding: f, label: i } = await G2(d2, t, T(t)), n = o.width + 10 * f, r = o.height + 8 * f, e = 0.15 * n, { cssStyles: s } = t, p2 = o.width + 20, l = o.height + 20, m3 = Math.max(n, p2), g = Math.max(r, l);
  i.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`);
  let u2, y = `M0 0 
    a${e},${e} 1 0,0 ${m3 * 0.25},${-1 * g * 0.1}
    a${e},${e} 1 0,0 ${m3 * 0.25},0
    a${e},${e} 1 0,0 ${m3 * 0.25},0
    a${e},${e} 1 0,0 ${m3 * 0.25},${g * 0.1}

    a${e},${e} 1 0,0 ${m3 * 0.15},${g * 0.33}
    a${e * 0.8},${e * 0.8} 1 0,0 0,${g * 0.34}
    a${e},${e} 1 0,0 ${-1 * m3 * 0.15},${g * 0.33}

    a${e},${e} 1 0,0 ${-1 * m3 * 0.25},${g * 0.15}
    a${e},${e} 1 0,0 ${-1 * m3 * 0.25},0
    a${e},${e} 1 0,0 ${-1 * m3 * 0.25},0
    a${e},${e} 1 0,0 ${-1 * m3 * 0.25},${-1 * g * 0.15}

    a${e},${e} 1 0,0 ${-1 * m3 * 0.1},${-1 * g * 0.33}
    a${e * 0.8},${e * 0.8} 1 0,0 0,${-1 * g * 0.34}
    a${e},${e} 1 0,0 ${m3 * 0.1},${-1 * g * 0.33}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    let b = Vt2.svg(a), S2 = S(t, {}), N = b.path(y, S2);
    u2 = a.insert(() => N, ":first-child"), u2.attr("class", "basic label-container").attr("style", Vt(s));
  } else u2 = a.insert("path", ":first-child").attr("class", "basic label-container").attr("style", h).attr("d", y);
  return u2.attr("transform", `translate(${-m3 / 2}, ${-g / 2})`), v(t, u2), t.calcIntersect = function(b, S2) {
    return $.rect(b, S2);
  }, t.intersect = function(b) {
    return pt.info("Bang intersect", t, b), $.rect(t, b);
  }, a;
}
m(Ss, "bang");
async function ws(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, halfPadding: f, label: i } = await G2(d2, t, T(t)), n = o.width + 2 * f, r = o.height + 2 * f, e = 0.15 * n, s = 0.25 * n, p2 = 0.35 * n, l = 0.2 * n, { cssStyles: m3 } = t, g, u2 = `M0 0 
    a${e},${e} 0 0,1 ${n * 0.25},${-1 * n * 0.1}
    a${p2},${p2} 1 0,1 ${n * 0.4},${-1 * n * 0.1}
    a${s},${s} 1 0,1 ${n * 0.35},${n * 0.2}

    a${e},${e} 1 0,1 ${n * 0.15},${r * 0.35}
    a${l},${l} 1 0,1 ${-1 * n * 0.15},${r * 0.65}

    a${s},${e} 1 0,1 ${-1 * n * 0.25},${n * 0.15}
    a${p2},${p2} 1 0,1 ${-1 * n * 0.5},0
    a${e},${e} 1 0,1 ${-1 * n * 0.25},${-1 * n * 0.15}

    a${e},${e} 1 0,1 ${-1 * n * 0.1},${-1 * r * 0.35}
    a${l},${l} 1 0,1 ${n * 0.1},${-1 * r * 0.65}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    let y = Vt2.svg(a), b = S(t, {}), S2 = y.path(u2, b);
    g = a.insert(() => S2, ":first-child"), g.attr("class", "basic label-container").attr("style", Vt(m3));
  } else g = a.insert("path", ":first-child").attr("class", "basic label-container").attr("style", h).attr("d", u2);
  return i.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`), g.attr("transform", `translate(${-n / 2}, ${-r / 2})`), v(t, g), t.calcIntersect = function(y, b) {
    return $.rect(y, b);
  }, t.intersect = function(y) {
    return pt.info("Cloud intersect", t, y), $.rect(t, y);
  }, a;
}
m(ws, "cloud");
async function Ns(d2, t) {
  let { labelStyles: c, nodeStyles: h } = m2(t);
  t.labelStyle = c;
  let { shapeSvg: a, bbox: o, halfPadding: f, label: i } = await G2(d2, t, T(t)), n = o.width + 8 * f, r = o.height + 2 * f, e = 5, s = t.look === "neo" ? `
    M${-n / 2} ${r / 2 - e}
    v${-r + 2 * e}
    q0,-${e} ${e},-${e}
    h${n - 2 * e}
    q${e},0 ${e},${e}
    v${r - e}
    H${-n / 2}
    Z
  ` : `
    M${-n / 2} ${r / 2 - e}
    v${-r + 2 * e}
    q0,-${e} ${e},-${e}
    h${n - 2 * e}
    q${e},0 ${e},${e}
    v${r - 2 * e}
    q0,${e} ${-e},${e}
    h${-(n - 2 * e)}
    q${-e},0 ${-e},${-e}
    Z
  `;
  if (!t.domId) throw new Error(`defaultMindmapNode: node "${t.id}" is missing a domId — was render.ts domId prefixing skipped?`);
  let p2 = a.append("path").attr("id", t.domId).attr("class", "node-bkg node-" + t.type).attr("style", h).attr("d", s);
  return a.append("line").attr("class", "node-line-").attr("x1", -n / 2).attr("y1", r / 2).attr("x2", n / 2).attr("y2", r / 2), i.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`), a.append(() => i.node()), v(t, p2), t.calcIntersect = function(l, m3) {
    return $.rect(l, m3);
  }, t.intersect = function(l) {
    return $.rect(t, l);
  }, a;
}
m(Ns, "defaultMindmapNode");
async function $s(d2, t) {
  let c = { padding: t.padding ?? 0 };
  return Ht(d2, t, c);
}
m($s, "mindmapCircle");
var Ks = [{ semanticName: "Process", name: "Rectangle", shortName: "rect", description: "Standard process shape", aliases: ["proc", "process", "rectangle"], internalAliases: ["squareRect"], handler: Ue }, { semanticName: "Event", name: "Rounded Rectangle", shortName: "rounded", description: "Represents an event", aliases: ["event"], internalAliases: ["roundedRect"], handler: _e }, { semanticName: "Terminal Point", name: "Stadium", shortName: "stadium", description: "Terminal point", aliases: ["terminal", "pill"], handler: Ze }, { semanticName: "Subprocess", name: "Framed Rectangle", shortName: "fr-rect", description: "Subprocess", aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"], handler: ts }, { semanticName: "Database", name: "Cylinder", shortName: "cyl", description: "Database storage", aliases: ["db", "database", "cylinder"], handler: de }, { semanticName: "Start", name: "Circle", shortName: "circle", description: "Starting point", aliases: ["circ"], handler: Ht }, { semanticName: "Bang", name: "Bang", shortName: "bang", description: "Bang", aliases: ["bang"], handler: Ss }, { semanticName: "Cloud", name: "Cloud", shortName: "cloud", description: "cloud", aliases: ["cloud"], handler: ws }, { semanticName: "Decision", name: "Diamond", shortName: "diam", description: "Decision-making step", aliases: ["decision", "diamond", "question"], handler: Xe }, { semanticName: "Prepare Conditional", name: "Hexagon", shortName: "hex", description: "Preparation or condition step", aliases: ["hexagon", "prepare"], handler: De }, { semanticName: "Data Input/Output", name: "Lean Right", shortName: "lean-r", description: "Represents input or output", aliases: ["lean-right", "in-out"], internalAliases: ["lean_right"], handler: Ee }, { semanticName: "Data Input/Output", name: "Lean Left", shortName: "lean-l", description: "Represents output or input", aliases: ["lean-left", "out-in"], internalAliases: ["lean_left"], handler: Me }, { semanticName: "Priority Action", name: "Trapezoid Base Bottom", shortName: "trap-b", description: "Priority action", aliases: ["priority", "trapezoid-bottom", "trapezoid"], handler: ns }, { semanticName: "Manual Operation", name: "Trapezoid Base Top", shortName: "trap-t", description: "Represents a manual task", aliases: ["manual", "trapezoid-top", "inv-trapezoid"], internalAliases: ["inv_trapezoid"], handler: Re }, { semanticName: "Stop", name: "Double Circle", shortName: "dbl-circ", description: "Represents a stop point", aliases: ["double-circle"], internalAliases: ["doublecircle"], handler: ue }, { semanticName: "Text Block", name: "Text Block", shortName: "text", description: "Text block", handler: rs }, { semanticName: "Card", name: "Notched Rectangle", shortName: "notch-rect", description: "Represents a card", aliases: ["card", "notched-rectangle"], handler: ae }, { semanticName: "Lined/Shaded Process", name: "Lined Rectangle", shortName: "lin-rect", description: "Lined process shape", aliases: ["lined-rectangle", "lined-process", "lin-proc", "shaded-process"], handler: qe }, { semanticName: "Start", name: "Small Circle", shortName: "sm-circ", description: "Small starting point", aliases: ["start", "small-circle"], internalAliases: ["stateStart"], handler: Qe }, { semanticName: "Stop", name: "Framed Circle", shortName: "fr-circ", description: "Stop point", aliases: ["stop", "framed-circle"], internalAliases: ["stateEnd"], handler: Ke }, { semanticName: "Fork/Join", name: "Filled Rectangle", shortName: "fork", description: "Fork or join in process flow", aliases: ["join"], internalAliases: ["forkJoin"], handler: Ne }, { semanticName: "Collate", name: "Hourglass", shortName: "hourglass", description: "Represents a collate operation", aliases: ["hourglass", "collate"], handler: Pe }, { semanticName: "Comment", name: "Curly Brace", shortName: "brace", description: "Adds a comment", aliases: ["comment", "brace-l"], handler: ce }, { semanticName: "Comment Right", name: "Curly Brace", shortName: "brace-r", description: "Adds a comment", handler: he }, { semanticName: "Comment with braces on both sides", name: "Curly Braces", shortName: "braces", description: "Adds a comment", handler: pe }, { semanticName: "Com Link", name: "Lightning Bolt", shortName: "bolt", description: "Communication link", aliases: ["com-link", "lightning-bolt"], handler: He }, { semanticName: "Document", name: "Document", shortName: "doc", description: "Represents a document", aliases: ["doc", "document"], handler: ms }, { semanticName: "Delay", name: "Half-Rounded Rectangle", shortName: "delay", description: "Represents a delay", aliases: ["half-rounded-rectangle"], handler: $e }, { semanticName: "Direct Access Storage", name: "Horizontal Cylinder", shortName: "h-cyl", description: "Direct access storage", aliases: ["das", "horizontal-cylinder"], handler: as }, { semanticName: "Disk Storage", name: "Lined Cylinder", shortName: "lin-cyl", description: "Disk storage", aliases: ["disk", "lined-cylinder"], handler: Oe }, { semanticName: "Display", name: "Curved Trapezoid", shortName: "curv-trap", description: "Represents a display", aliases: ["curved-trapezoid", "display"], handler: me }, { semanticName: "Divided Process", name: "Divided Rectangle", shortName: "div-rect", description: "Divided process shape", aliases: ["div-proc", "divided-rectangle", "divided-process"], handler: ye }, { semanticName: "Extract", name: "Triangle", shortName: "tri", description: "Extraction process", aliases: ["extract", "triangle"], handler: ps }, { semanticName: "Internal Storage", name: "Window Pane", shortName: "win-pane", description: "Internal storage", aliases: ["internal-storage", "window-pane"], handler: fs }, { semanticName: "Junction", name: "Filled Circle", shortName: "f-circ", description: "Junction point", aliases: ["junction", "filled-circle"], handler: xe }, { semanticName: "Loop Limit", name: "Trapezoidal Pentagon", shortName: "notch-pent", description: "Loop limit step", aliases: ["loop-limit", "notched-pentagon"], handler: ls }, { semanticName: "Manual File", name: "Flipped Triangle", shortName: "flip-tri", description: "Manual file operation", aliases: ["manual-file", "flipped-triangle"], handler: we }, { semanticName: "Manual Input", name: "Sloped Rectangle", shortName: "sl-rect", description: "Manual input step", aliases: ["manual-input", "sloped-rectangle"], handler: ze }, { semanticName: "Multi-Document", name: "Stacked Document", shortName: "docs", description: "Multiple documents", aliases: ["documents", "st-doc", "stacked-document"], handler: Ie }, { semanticName: "Multi-Process", name: "Stacked Rectangle", shortName: "st-rect", description: "Multiple processes", aliases: ["procs", "processes", "stacked-rectangle"], handler: Ve }, { semanticName: "Stored Data", name: "Bow Tie Rectangle", shortName: "bow-rect", description: "Stored data", aliases: ["stored-data", "bow-tie-rectangle"], handler: oe }, { semanticName: "Summary", name: "Crossed Circle", shortName: "cross-circ", description: "Summary", aliases: ["summary", "crossed-circle"], handler: le }, { semanticName: "Tagged Document", name: "Tagged Document", shortName: "tag-doc", description: "Tagged document", aliases: ["tag-doc", "tagged-document"], handler: ss }, { semanticName: "Tagged Process", name: "Tagged Rectangle", shortName: "tag-rect", description: "Tagged process", aliases: ["tagged-rectangle", "tag-proc", "tagged-process"], handler: es }, { semanticName: "Paper Tape", name: "Flag", shortName: "flag", description: "Paper tape", aliases: ["paper-tape"], handler: gs }, { semanticName: "Odd", name: "Odd", shortName: "odd", description: "Odd shape", internalAliases: ["rect_left_inv_arrow"], handler: Ye }, { semanticName: "Lined Document", name: "Lined Document", shortName: "lin-doc", description: "Lined document", aliases: ["lined-document"], handler: Le }];
var Qs = m(() => {
  let t = [...Object.entries({ state: Je, choice: ne, note: We, rectWithTitle: Fe, labelRect: Ge, iconSquare: Te, iconCircle: ke, icon: ve2, iconRounded: Be, imageSquare: Ce, anchor: re, kanbanItem: bs, mindmapCircle: $s, defaultMindmapNode: Ns, classBox: us, erBox: Yt2, requirementBox: xs }), ...Ks.flatMap((c) => [c.shortName, ..."aliases" in c ? c.aliases : [], ..."internalAliases" in c ? c.internalAliases : []].map((a) => [a, c.handler]))];
  return Object.fromEntries(t);
}, "generateShapeMap");
var Ft = Qs();
function jg(d2) {
  return d2 in Ft;
}
m(jg, "isValidShape");
var At = /* @__PURE__ */ new Map();
async function Wg(d2, t, c) {
  let h, a;
  t.shape === "rect" && (t.rx && t.ry ? t.shape = "roundedRect" : t.shape = "squareRect");
  let o = t.shape ? Ft[t.shape] : void 0;
  if (!o) throw new Error(`No such shape: ${t.shape}. Please check your syntax.`);
  if (t.link) {
    let f;
    c.config.securityLevel === "sandbox" ? f = "_top" : t.linkTarget && (f = t.linkTarget || "_blank"), h = d2.insert("svg:a").attr("xlink:href", t.link).attr("target", f ?? null), a = await o(h, t, c);
  } else a = await o(d2, t, c), h = a;
  return h.attr("data-look", Vt(t.look)), t.tooltip && a.attr("title", t.tooltip), At.set(t.id, h), t.haveCallback && h.attr("class", h.attr("class") + " clickable"), h;
}
m(Wg, "insertNode");
var Xg = m((d2, t) => {
  At.set(t.id, d2);
}, "setNodeElem");
var Yg = m(() => {
  At.clear();
}, "clear");
var Fg = m((d2) => {
  let t = At.get(d2.id);
  pt.trace("Transforming node", d2.diff, d2, "translate(" + (d2.x - d2.width / 2 - 5) + ", " + d2.width / 2 + ")");
  let c = 8, h = d2.diff || 0;
  return d2.clusterNode ? t.attr("transform", "translate(" + (d2.x + h - d2.width / 2) + ", " + (d2.y - d2.height / 2 - c) + ")") : t.attr("transform", "translate(" + d2.x + ", " + d2.y + ")"), h;
}, "positionNode");

export {
  G2 as G,
  v,
  vt,
  Cr,
  Rr,
  jg,
  Wg,
  Xg,
  Yg,
  Fg
};
//# sourceMappingURL=chunk-OB6FDEYX.js.map

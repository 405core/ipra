import {
  Ye,
  _e,
  gs
} from "./chunk-KPZWZI5L.js";
import {
  fn
} from "./chunk-M3ZS3LOY.js";
import {
  m as m2
} from "./chunk-NVNIWB3X.js";
import "./chunk-UDPC2CDO.js";
import "./chunk-HKRTJANV.js";
import "./chunk-3DBRZS4A.js";
import "./chunk-V354F32T.js";
import "./chunk-QDSNXXJA.js";
import "./chunk-LK7THHH6.js";
import "./chunk-OB6FDEYX.js";
import "./chunk-KKUK5XSX.js";
import "./chunk-37DMPFOG.js";
import "./chunk-BIOJLABG.js";
import "./chunk-GYGMMI4F.js";
import {
  Ut
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Cn,
  is,
  je,
  qo
} from "./chunk-HPIGS4CQ.js";
import {
  $s,
  As,
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/stateDiagram-MLPALWAM.mjs
var j = m((e) => e.append("circle").attr("class", "start-state").attr("r", qo().state.sizeUnit).attr("cx", qo().state.padding + qo().state.sizeUnit).attr("cy", qo().state.padding + qo().state.sizeUnit), "drawStartState");
var q = m((e) => e.append("line").style("stroke", "grey").style("stroke-dasharray", "3").attr("x1", qo().state.textHeight).attr("class", "divider").attr("x2", qo().state.textHeight * 2).attr("y1", 0).attr("y2", 0), "drawDivider");
var Z = m((e, n) => {
  let s = e.append("text").attr("x", 2 * qo().state.padding).attr("y", qo().state.textHeight + 2 * qo().state.padding).attr("font-size", qo().state.fontSize).attr("class", "state-title").text(n.id), c = s.node().getBBox();
  return e.insert("rect", ":first-child").attr("x", qo().state.padding).attr("y", qo().state.padding).attr("width", c.width + 2 * qo().state.padding).attr("height", c.height + 2 * qo().state.padding).attr("rx", qo().state.radius), s;
}, "drawSimpleState");
var K = m((e, n) => {
  let s = m(function(d, w, y) {
    let E = d.append("tspan").attr("x", 2 * qo().state.padding).text(w);
    y || E.attr("dy", qo().state.textHeight);
  }, "addTspan"), r = e.append("text").attr("x", 2 * qo().state.padding).attr("y", qo().state.textHeight + 1.3 * qo().state.padding).attr("font-size", qo().state.fontSize).attr("class", "state-title").text(n.descriptions[0]).node().getBBox(), g = r.height, h = e.append("text").attr("x", qo().state.padding).attr("y", g + qo().state.padding * 0.4 + qo().state.dividerMargin + qo().state.textHeight).attr("class", "state-description"), i = true, o = true;
  n.descriptions.forEach(function(d) {
    i || (s(h, d, o), o = false), i = false;
  });
  let m3 = e.append("line").attr("x1", qo().state.padding).attr("y1", qo().state.padding + g + qo().state.dividerMargin / 2).attr("y2", qo().state.padding + g + qo().state.dividerMargin / 2).attr("class", "descr-divider"), x = h.node().getBBox(), p = Math.max(x.width, r.width);
  return m3.attr("x2", p + 3 * qo().state.padding), e.insert("rect", ":first-child").attr("x", qo().state.padding).attr("y", qo().state.padding).attr("width", p + 2 * qo().state.padding).attr("height", x.height + g + 2 * qo().state.padding).attr("rx", qo().state.radius), e;
}, "drawDescrState");
var v = m((e, n, s) => {
  let c = qo().state.padding, r = 2 * qo().state.padding, g = e.node().getBBox(), h = g.width, i = g.x, o = e.append("text").attr("x", 0).attr("y", qo().state.titleShift).attr("font-size", qo().state.fontSize).attr("class", "state-title").text(n.id), x = o.node().getBBox().width + r, p = Math.max(x, h);
  p === h && (p = p + r);
  let d, w = e.node().getBBox();
  n.doc, d = i - c, x > h && (d = (h - p) / 2 + c), Math.abs(i - w.x) < c && x > h && (d = i - (x - h) / 2);
  let y = 1 - qo().state.textHeight;
  return e.insert("rect", ":first-child").attr("x", d).attr("y", y).attr("class", s ? "alt-composit" : "composit").attr("width", p).attr("height", w.height + qo().state.textHeight + qo().state.titleShift + 1).attr("rx", "0"), o.attr("x", d + c), x <= h && o.attr("x", i + (p - r) / 2 - x / 2 + c), e.insert("rect", ":first-child").attr("x", d).attr("y", qo().state.titleShift - qo().state.textHeight - qo().state.padding).attr("width", p).attr("height", qo().state.textHeight * 3).attr("rx", qo().state.radius), e.insert("rect", ":first-child").attr("x", d).attr("y", qo().state.titleShift - qo().state.textHeight - qo().state.padding).attr("width", p).attr("height", w.height + 3 + 2 * qo().state.textHeight).attr("rx", qo().state.radius), e;
}, "addTitleAndBox");
var Q = m((e) => (e.append("circle").attr("class", "end-state-outer").attr("r", qo().state.sizeUnit + qo().state.miniPadding).attr("cx", qo().state.padding + qo().state.sizeUnit + qo().state.miniPadding).attr("cy", qo().state.padding + qo().state.sizeUnit + qo().state.miniPadding), e.append("circle").attr("class", "end-state-inner").attr("r", qo().state.sizeUnit).attr("cx", qo().state.padding + qo().state.sizeUnit + 2).attr("cy", qo().state.padding + qo().state.sizeUnit + 2)), "drawEndState");
var V = m((e, n) => {
  let s = qo().state.forkWidth, c = qo().state.forkHeight;
  if (n.parentId) {
    let r = s;
    s = c, c = r;
  }
  return e.append("rect").style("stroke", "black").style("fill", "black").attr("width", s).attr("height", c).attr("x", qo().state.padding).attr("y", qo().state.padding);
}, "drawForkJoinState");
var D = m((e, n, s, c) => {
  let r = 0, g = c.append("text");
  g.style("text-anchor", "start"), g.attr("class", "noteText");
  let h = e.replace(/\r\n/g, "<br/>");
  h = h.replace(/\n/g, "<br/>");
  let i = h.split(Cn.lineBreakRegex), o = 1.25 * qo().state.noteMargin;
  for (let m3 of i) {
    let x = m3.trim();
    if (x.length > 0) {
      let p = g.append("tspan");
      if (p.text(x), o === 0) {
        let d = p.node().getBBox();
        o += d.height;
      }
      r += o, p.attr("x", n + qo().state.noteMargin), p.attr("y", s + r + 1.25 * qo().state.noteMargin);
    }
  }
  return { textWidth: g.node().getBBox().width, textHeight: r };
}, "_drawLongText");
var tt = m((e, n) => {
  n.attr("class", "state-note");
  let s = n.append("rect").attr("x", 0).attr("y", qo().state.padding), c = n.append("g"), { textWidth: r, textHeight: g } = D(e, 0, 0, c);
  return s.attr("height", g + 2 * qo().state.noteMargin), s.attr("width", r + qo().state.noteMargin * 2), s;
}, "drawNote");
var A = m(function(e, n) {
  let s = n.id, c = { id: s, label: n.id, width: 0, height: 0 }, r = e.append("g").attr("id", s).attr("class", "stateGroup");
  n.type === "start" && j(r), n.type === "end" && Q(r), (n.type === "fork" || n.type === "join") && V(r, n), n.type === "note" && tt(n.note.text, r), n.type === "divider" && q(r), n.type === "default" && n.descriptions.length === 0 && Z(r, n), n.type === "default" && n.descriptions.length > 0 && K(r, n);
  let g = r.node().getBBox();
  return c.width = g.width + 2 * qo().state.padding, c.height = g.height + 2 * qo().state.padding, c;
}, "drawState");
var Y = 0;
var I = m(function(e, n, s) {
  let c = m(function(o) {
    switch (o) {
      case _e.relationType.AGGREGATION:
        return "aggregation";
      case _e.relationType.EXTENSION:
        return "extension";
      case _e.relationType.COMPOSITION:
        return "composition";
      case _e.relationType.DEPENDENCY:
        return "dependency";
    }
  }, "getRelationType");
  n.points = n.points.filter((o) => !Number.isNaN(o.y));
  let r = n.points, g = As().x(function(o) {
    return o.x;
  }).y(function(o) {
    return o.y;
  }).curve($s), h = e.append("path").attr("d", g(r)).attr("id", "edge" + Y).attr("class", "transition"), i = "";
  if (qo().state.arrowMarkerAbsolute && (i = je(true)), h.attr("marker-end", "url(" + i + "#" + c(_e.relationType.DEPENDENCY) + "End)"), s.title !== void 0) {
    let o = e.append("g").attr("class", "stateLabel"), { x: m3, y: x } = Ut.calcLabelPosition(n.points), p = Cn.getRows(s.title), d = 0, w = [], y = 0, E = 0;
    for (let a = 0; a <= p.length; a++) {
      let u = o.append("text").attr("text-anchor", "middle").text(p[a]).attr("x", m3).attr("y", x + d), l = u.node().getBBox();
      y = Math.max(y, l.width), E = Math.min(E, l.x), pt.info(l.x, m3, x + d), d === 0 && (d = u.node().getBBox().height, pt.info("Title height", d, x)), w.push(u);
    }
    let M = d * p.length;
    if (p.length > 1) {
      let a = (p.length - 1) * d * 0.5;
      w.forEach((u, l) => u.attr("y", x + l * d - a)), M = d * p.length;
    }
    let H = o.node().getBBox();
    o.insert("rect", ":first-child").attr("class", "box").attr("x", m3 - y / 2 - qo().state.padding / 2).attr("y", x - M / 2 - qo().state.padding / 2 - 3.5).attr("width", y + qo().state.padding).attr("height", M + qo().state.padding), pt.info(H);
  }
  Y++;
}, "drawEdge");
var S;
var G = {};
var et = m(function() {
}, "setConf");
var it = m(function(e) {
  e.append("defs").append("marker").attr("id", "dependencyEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "insertMarkers");
var nt = m(function(e, n, s, c) {
  S = qo().state;
  let r = qo().securityLevel, g;
  r === "sandbox" && (g = ia("#i" + n));
  let h = r === "sandbox" ? ia(g.nodes()[0].contentDocument.body) : ia("body"), i = r === "sandbox" ? g.nodes()[0].contentDocument : document;
  pt.debug("Rendering diagram " + e);
  let o = h.select(`[id='${n}']`);
  it(o);
  let m3 = c.db.getRootDoc(), x = o.append("g").attr("id", n + "-root");
  $(m3, x, void 0, false, h, i, c);
  let p = S.padding, d = o.node().getBBox(), w = d.width + p * 2, y = d.height + p * 2, E = w * 1.75;
  is(o, y, E, S.useMaxWidth), o.attr("viewBox", `${d.x - S.padding}  ${d.y - S.padding} ` + w + " " + y);
}, "draw");
var at = m((e) => e ? e.length * S.fontSizeFactor : 1, "getLabelWidth");
var $ = m((e, n, s, c, r, g, h) => {
  let i = new m2({ compound: true, multigraph: true }), o, m3 = true;
  for (o = 0; o < e.length; o++) if (e[o].stmt === "relation") {
    m3 = false;
    break;
  }
  s ? i.setGraph({ rankdir: "LR", multigraph: true, compound: true, ranker: "tight-tree", ranksep: m3 ? 1 : S.edgeLengthFactor, nodeSep: m3 ? 1 : 50, isMultiGraph: true }) : i.setGraph({ rankdir: "TB", multigraph: true, compound: true, ranksep: m3 ? 1 : S.edgeLengthFactor, nodeSep: m3 ? 1 : 50, ranker: "tight-tree", isMultiGraph: true }), i.setDefaultEdgeLabel(function() {
    return {};
  });
  let x = h.db.getStates(), p = h.db.getRelations(), d = Object.keys(x), w = true;
  for (let a of d) {
    let u = x[a];
    s && (u.parentId = s);
    let l;
    if (u.doc) {
      let B = n.append("g").attr("id", u.id).attr("class", "stateGroup");
      if (l = $(u.doc, B, u.id, !c, r, g, h), w) {
        B = v(B, u, c);
        let k = B.node().getBBox();
        l.width = k.width, l.height = k.height + S.padding / 2, G[u.id] = { y: S.compositTitleSize };
      } else {
        let k = B.node().getBBox();
        l.width = k.width, l.height = k.height;
      }
    } else l = A(n, u, i);
    if (u.note) {
      let B = { descriptions: [], id: u.id + "-note", note: u.note, type: "note" }, k = A(n, B, i);
      u.note.position === "left of" ? (i.setNode(l.id + "-note", k), i.setNode(l.id, l)) : (i.setNode(l.id, l), i.setNode(l.id + "-note", k)), i.setParent(l.id, l.id + "-group"), i.setParent(l.id + "-note", l.id + "-group");
    } else i.setNode(l.id, l);
  }
  pt.debug("Count=", i.nodeCount(), i);
  let y = 0;
  p.forEach(function(a) {
    y++, pt.debug("Setting edge", a), i.setEdge(a.id1, a.id2, { relation: a, width: at(a.title), height: S.labelHeight * Cn.getRows(a.title).length, labelpos: "c" }, "id" + y);
  }), fn(i), pt.debug("Graph after layout", i.nodes());
  let E = n.node();
  i.nodes().forEach(function(a) {
    a !== void 0 && i.node(a) !== void 0 ? (pt.warn("Node " + a + ": " + JSON.stringify(i.node(a))), r.select("#" + E.id + " #" + a).attr("transform", "translate(" + (i.node(a).x - i.node(a).width / 2) + "," + (i.node(a).y + (G[a] ? G[a].y : 0) - i.node(a).height / 2) + " )"), r.select("#" + E.id + " #" + a).attr("data-x-shift", i.node(a).x - i.node(a).width / 2), g.querySelectorAll("#" + E.id + " #" + a + " .divider").forEach((l) => {
      let B = l.parentElement, k = 0, T = 0;
      B && (B.parentElement && (k = B.parentElement.getBBox().width), T = parseInt(B.getAttribute("data-x-shift"), 10), Number.isNaN(T) && (T = 0)), l.setAttribute("x1", 0 - T + 8), l.setAttribute("x2", k - T - 8);
    })) : pt.debug("No Node " + a + ": " + JSON.stringify(i.node(a)));
  });
  let M = E.getBBox();
  i.edges().forEach(function(a) {
    a !== void 0 && i.edge(a) !== void 0 && (pt.debug("Edge " + a.v + " -> " + a.w + ": " + JSON.stringify(i.edge(a))), I(n, i.edge(a), i.edge(a).relation));
  }), M = E.getBBox();
  let H = { id: s || "root", label: s || "root", width: 0, height: 0 };
  return H.width = M.width + 2 * S.padding, H.height = M.height + 2 * S.padding, pt.debug("Doc rendered", H, i), H;
}, "renderDoc");
var _ = { setConf: et, draw: nt };
var Ht = { parser: Ye, get db() {
  return new _e(1);
}, renderer: _, styles: gs, init: m((e) => {
  e.state || (e.state = {}), e.state.arrowMarkerAbsolute = e.arrowMarkerAbsolute;
}, "init") };
export {
  Ht as diagram
};
//# sourceMappingURL=stateDiagram-MLPALWAM-JW3WLCDW.js.map

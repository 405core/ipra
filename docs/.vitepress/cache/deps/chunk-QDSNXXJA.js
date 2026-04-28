import {
  E,
  T,
  d,
  s
} from "./chunk-LK7THHH6.js";
import {
  vt
} from "./chunk-OB6FDEYX.js";
import {
  d as d2
} from "./chunk-KKUK5XSX.js";
import {
  Vt as Vt2
} from "./chunk-37DMPFOG.js";
import {
  g,
  m as m2
} from "./chunk-BIOJLABG.js";
import {
  Lr
} from "./chunk-GYGMMI4F.js";
import {
  Ut,
  Vt
} from "./chunk-DZJA65GQ.js";
import {
  Ot,
  no,
  qo
} from "./chunk-HPIGS4CQ.js";
import {
  $s,
  As,
  Bc,
  Jc,
  Kc,
  Lc,
  Qc,
  Qs,
  Vc,
  Vn,
  Zc,
  Zs,
  ia,
  pt,
  zc
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-HNL3EPQF.mjs
var bt = m((r, t, a, s2, o, n = false, e) => {
  t.arrowTypeStart && wt(r, "start", t.arrowTypeStart, a, s2, o, n, e), t.arrowTypeEnd && wt(r, "end", t.arrowTypeEnd, a, s2, o, n, e);
}, "addEdgeMarkers");
var Ut2 = { arrow_cross: { type: "cross", fill: false }, arrow_point: { type: "point", fill: true }, arrow_barb: { type: "barb", fill: true }, arrow_barb_neo: { type: "barb", fill: true }, arrow_circle: { type: "circle", fill: false }, aggregation: { type: "aggregation", fill: false }, extension: { type: "extension", fill: false }, composition: { type: "composition", fill: true }, dependency: { type: "dependency", fill: true }, lollipop: { type: "lollipop", fill: false }, only_one: { type: "onlyOne", fill: false }, zero_or_one: { type: "zeroOrOne", fill: false }, one_or_more: { type: "oneOrMore", fill: false }, zero_or_more: { type: "zeroOrMore", fill: false }, requirement_arrow: { type: "requirement_arrow", fill: false }, requirement_contains: { type: "requirement_contains", fill: false } };
var Et = ["cross", "point", "circle", "lollipop", "aggregation", "extension", "composition", "dependency", "barb"];
var wt = m((r, t, a, s2, o, n, e = false, i) => {
  var _a;
  let c = Ut2[a], l = c && Et.includes(c.type);
  if (!c) {
    pt.warn(`Unknown arrow type: ${a}`);
    return;
  }
  let m3 = c.type, p = `${o}_${n}-${m3}${t === "start" ? "Start" : "End"}${e && l ? "-margin" : ""}`;
  if (i && i.trim() !== "") {
    let x = i.replace(/[^\dA-Za-z]/g, "_"), f = `${p}_${x}`;
    if (!document.getElementById(f)) {
      let k = document.getElementById(p);
      if (k) {
        let u = k.cloneNode(true);
        u.id = f, u.querySelectorAll("path, circle, line").forEach((X) => {
          X.setAttribute("stroke", i), c.fill && X.setAttribute("fill", i);
        }), (_a = k.parentNode) == null ? void 0 : _a.appendChild(u);
      }
    }
    r.attr(`marker-${t}`, `url(${s2}#${f})`);
  } else r.attr(`marker-${t}`, `url(${s2}#${p})`);
}, "addEdgeMarker");
var Wt = m((r) => {
  var _a, _b;
  return typeof r == "string" ? r : (_b = (_a = qo()) == null ? void 0 : _a.flowchart) == null ? void 0 : _b.curve;
}, "resolveEdgeCurveType");
var I = /* @__PURE__ */ new Map();
var M = /* @__PURE__ */ new Map();
var _r = m(() => {
  I.clear(), M.clear();
}, "clear");
var T2 = m((r) => r ? typeof r == "string" ? r : r.reduce((t, a) => t + ";" + a, "") : "", "getLabelStyles");
var Sr = m(async (r, t) => {
  let a = qo(), s2 = no(a), { labelStyles: o } = m2(t);
  t.labelStyle = o;
  let n = r.insert("g").attr("class", "edgeLabel"), e = n.insert("g").attr("class", "label").attr("data-id", t.id), i = t.labelType === "markdown", l = await Lr(r, t.label, { style: T2(t.labelStyle), useHtmlLabels: s2, addSvgBackground: true, isNode: false, markdown: i, width: i ? void 0 : void 0 }, a);
  e.node().appendChild(l), pt.info("abc82", t, t.labelType);
  let m3 = l.getBBox(), g2 = m3;
  if (s2) {
    let p = l.children[0], x = ia(l);
    m3 = p.getBoundingClientRect(), g2 = m3, x.attr("width", m3.width), x.attr("height", m3.height);
  } else {
    let p = ia(l).select("text").node();
    p && typeof p.getBBox == "function" && (g2 = p.getBBox());
  }
  e.attr("transform", d(g2, s2)), I.set(t.id, n), t.width = m3.width, t.height = m3.height;
  let h;
  if (t.startLabelLeft) {
    let p = r.insert("g").attr("class", "edgeTerminals"), x = p.insert("g").attr("class", "inner"), f = await vt(x, t.startLabelLeft, T2(t.labelStyle) || "", false, false);
    h = f;
    let k = f.getBBox();
    if (s2) {
      let u = f.children[0], b = ia(f);
      k = u.getBoundingClientRect(), b.attr("width", k.width), b.attr("height", k.height);
    }
    x.attr("transform", d(k, s2)), M.get(t.id) || M.set(t.id, {}), M.get(t.id).startLeft = p, V(h, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    let p = r.insert("g").attr("class", "edgeTerminals"), x = p.insert("g").attr("class", "inner"), f = await vt(x, t.startLabelRight, T2(t.labelStyle) || "", false, false);
    h = f, x.node().appendChild(f);
    let k = f.getBBox();
    if (s2) {
      let u = f.children[0], b = ia(f);
      k = u.getBoundingClientRect(), b.attr("width", k.width), b.attr("height", k.height);
    }
    x.attr("transform", d(k, s2)), M.get(t.id) || M.set(t.id, {}), M.get(t.id).startRight = p, V(h, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    let p = r.insert("g").attr("class", "edgeTerminals"), x = p.insert("g").attr("class", "inner"), f = await vt(x, t.endLabelLeft, T2(t.labelStyle) || "", false, false);
    h = f;
    let k = f.getBBox();
    if (s2) {
      let u = f.children[0], b = ia(f);
      k = u.getBoundingClientRect(), b.attr("width", k.width), b.attr("height", k.height);
    }
    x.attr("transform", d(k, s2)), p.node().appendChild(f), M.get(t.id) || M.set(t.id, {}), M.get(t.id).endLeft = p, V(h, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    let p = r.insert("g").attr("class", "edgeTerminals"), x = p.insert("g").attr("class", "inner"), f = await vt(x, t.endLabelRight, T2(t.labelStyle) || "", false, false);
    h = f;
    let k = f.getBBox();
    if (s2) {
      let u = f.children[0], b = ia(f);
      k = u.getBoundingClientRect(), b.attr("width", k.width), b.attr("height", k.height);
    }
    x.attr("transform", d(k, s2)), p.node().appendChild(f), M.get(t.id) || M.set(t.id, {}), M.get(t.id).endRight = p, V(h, t.endLabelRight);
  }
  return l;
}, "insertEdgeLabel");
function V(r, t) {
  no(qo()) && r && (r.style.width = t.length * 9 + "px", r.style.height = "12px");
}
m(V, "setTerminalWidth");
var Or = m((r, t) => {
  pt.debug("Moving label abc88 ", r.id, r.label, I.get(r.id), t);
  let a = t.updatedPath ? t.updatedPath : t.originalPath, s2 = qo(), { subGraphTitleTotalMargin: o } = d2(s2);
  if (r.label) {
    let n = I.get(r.id), e = r.x, i = r.y;
    if (a) {
      let c = Ut.calcLabelPosition(a);
      pt.debug("Moving label " + r.label + " from (", e, ",", i, ") to (", c.x, ",", c.y, ") abc88"), t.updatedPath && (e = c.x, i = c.y);
    }
    n.attr("transform", `translate(${e}, ${i + o / 2})`);
  }
  if (r.startLabelLeft) {
    let n = M.get(r.id).startLeft, e = r.x, i = r.y;
    if (a) {
      let c = Ut.calcTerminalLabelPosition(r.arrowTypeStart ? 10 : 0, "start_left", a);
      e = c.x, i = c.y;
    }
    n.attr("transform", `translate(${e}, ${i})`);
  }
  if (r.startLabelRight) {
    let n = M.get(r.id).startRight, e = r.x, i = r.y;
    if (a) {
      let c = Ut.calcTerminalLabelPosition(r.arrowTypeStart ? 10 : 0, "start_right", a);
      e = c.x, i = c.y;
    }
    n.attr("transform", `translate(${e}, ${i})`);
  }
  if (r.endLabelLeft) {
    let n = M.get(r.id).endLeft, e = r.x, i = r.y;
    if (a) {
      let c = Ut.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_left", a);
      e = c.x, i = c.y;
    }
    n.attr("transform", `translate(${e}, ${i})`);
  }
  if (r.endLabelRight) {
    let n = M.get(r.id).endRight, e = r.x, i = r.y;
    if (a) {
      let c = Ut.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_right", a);
      e = c.x, i = c.y;
    }
    n.attr("transform", `translate(${e}, ${i})`);
  }
}, "positionEdgeLabel");
var Xt = m((r, t) => {
  let a = r.x, s2 = r.y, o = Math.abs(t.x - a), n = Math.abs(t.y - s2), e = r.width / 2, i = r.height / 2;
  return o >= e || n >= i;
}, "outsideNode");
var Yt = m((r, t, a) => {
  pt.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(a)}
  node        : x:${r.x} y:${r.y} w:${r.width} h:${r.height}`);
  let s2 = r.x, o = r.y, n = Math.abs(s2 - a.x), e = r.width / 2, i = a.x < t.x ? e - n : e + n, c = r.height / 2, l = Math.abs(t.y - a.y), m3 = Math.abs(t.x - a.x);
  if (Math.abs(o - t.y) * e > Math.abs(s2 - t.x) * c) {
    let g2 = a.y < t.y ? t.y - c - o : o - c - t.y;
    i = m3 * g2 / l;
    let h = { x: a.x < t.x ? a.x + i : a.x - m3 + i, y: a.y < t.y ? a.y + l - g2 : a.y - l + g2 };
    return i === 0 && (h.x = t.x, h.y = t.y), m3 === 0 && (h.x = t.x), l === 0 && (h.y = t.y), pt.debug(`abc89 top/bottom calc, Q ${l}, q ${g2}, R ${m3}, r ${i}`, h), h;
  } else {
    a.x < t.x ? i = t.x - e - s2 : i = s2 - e - t.x;
    let g2 = l * i / m3, h = a.x < t.x ? a.x + m3 - i : a.x - m3 + i, p = a.y < t.y ? a.y + g2 : a.y - g2;
    return pt.debug(`sides calc abc89, Q ${l}, q ${g2}, R ${m3}, r ${i}`, { _x: h, _y: p }), i === 0 && (h = t.x, p = t.y), m3 === 0 && (h = t.x), l === 0 && (p = t.y), { x: h, y: p };
  }
}, "intersection");
var Mt = m((r, t) => {
  pt.warn("abc88 cutPathAtIntersect", r, t);
  let a = [], s2 = r[0], o = false;
  return r.forEach((n) => {
    if (pt.info("abc88 checking point", n, t), !Xt(t, n) && !o) {
      let e = Yt(t, s2, n);
      pt.debug("abc88 inside", n, s2, e), pt.debug("abc88 intersection", e, t);
      let i = false;
      a.forEach((c) => {
        i = i || c.x === e.x && c.y === e.y;
      }), a.some((c) => c.x === e.x && c.y === e.y) ? pt.warn("abc88 no intersect", e, a) : a.push(e), o = true;
    } else pt.warn("abc88 outside", n, s2), s2 = n, o || a.push(n);
  }), pt.debug("returning points", a), a;
}, "cutPathAtIntersect");
function vt2(r) {
  let t = [], a = [];
  for (let s2 = 1; s2 < r.length - 1; s2++) {
    let o = r[s2 - 1], n = r[s2], e = r[s2 + 1];
    (o.x === n.x && n.y === e.y && Math.abs(n.x - e.x) > 5 && Math.abs(n.y - o.y) > 5 || o.y === n.y && n.x === e.x && Math.abs(n.x - o.x) > 5 && Math.abs(n.y - e.y) > 5) && (t.push(n), a.push(s2));
  }
  return { cornerPoints: t, cornerPointPositions: a };
}
m(vt2, "extractCornerPoints");
var Lt = m(function(r, t, a) {
  let s2 = t.x - r.x, o = t.y - r.y, n = Math.sqrt(s2 * s2 + o * o), e = a / n;
  return { x: t.x - e * s2, y: t.y - e * o };
}, "findAdjacentPoint");
var Ht = m(function(r) {
  let { cornerPointPositions: t } = vt2(r), a = [];
  for (let s2 = 0; s2 < r.length; s2++) if (t.includes(s2)) {
    let o = r[s2 - 1], n = r[s2 + 1], e = r[s2], i = Lt(o, e, 5), c = Lt(n, e, 5), l = c.x - i.x, m3 = c.y - i.y;
    a.push(i);
    let g2 = Math.sqrt(2) * 2, h = { x: e.x, y: e.y };
    if (Math.abs(n.x - o.x) > 10 && Math.abs(n.y - o.y) >= 10) {
      pt.debug("Corner point fixing", Math.abs(n.x - o.x), Math.abs(n.y - o.y));
      let p = 5;
      e.x === i.x ? h = { x: l < 0 ? i.x - p + g2 : i.x + p - g2, y: m3 < 0 ? i.y - g2 : i.y + g2 } : h = { x: l < 0 ? i.x - g2 : i.x + g2, y: m3 < 0 ? i.y - p + g2 : i.y + p - g2 };
    } else pt.debug("Corner point skipping fixing", Math.abs(n.x - o.x), Math.abs(n.y - o.y));
    a.push(h, c);
  } else a.push(r[s2]);
  return a;
}, "fixCorners");
var Bt = m((r, t, a) => {
  let s2 = r - t - a, o = 2, n = 2, e = o + n, i = Math.floor(s2 / e), c = Array(i).fill(`${o} ${n}`).join(" ");
  return `0 ${t} ${c} ${a}`;
}, "generateDashArray");
var $r = m(function(r, t, a, s2, o, n, e, i = false) {
  var _a;
  if (!e) throw new Error(`insertEdge: missing diagramId for edge "${t.id}" — edge IDs require a diagram prefix for uniqueness`);
  let { handDrawnSeed: c } = qo(), l = t.points, m3 = false, g2 = o;
  var h = n;
  let p = [];
  for (let _ in t.cssCompiledStyles) g(_) || p.push(t.cssCompiledStyles[_]);
  pt.debug("UIO intersect check", t.points, h.x, g2.x), h.intersect && g2.intersect && !i && (l = l.slice(1, t.points.length - 1), l.unshift(g2.intersect(l[0])), pt.debug("Last point UIO", t.start, "-->", t.end, l[l.length - 1], h, h.intersect(l[l.length - 1])), l.push(h.intersect(l[l.length - 1])));
  let x = btoa(JSON.stringify(l));
  t.toCluster && (pt.info("to cluster abc88", a.get(t.toCluster)), l = Mt(t.points, a.get(t.toCluster).node), m3 = true), t.fromCluster && (pt.debug("from cluster abc88", a.get(t.fromCluster), JSON.stringify(l, null, 2)), l = Mt(l.reverse(), a.get(t.fromCluster).node).reverse(), m3 = true);
  let f = l.filter((_) => !Number.isNaN(_.y)), k = Wt(t.curve);
  k !== "rounded" && (f = Ht(f));
  let u = Vn;
  switch (k) {
    case "linear":
      u = Vn;
      break;
    case "basis":
      u = $s;
      break;
    case "cardinal":
      u = Bc;
      break;
    case "bumpX":
      u = Lc;
      break;
    case "bumpY":
      u = zc;
      break;
    case "catmullRom":
      u = Vc;
      break;
    case "monotoneX":
      u = Zc;
      break;
    case "monotoneY":
      u = Qc;
      break;
    case "natural":
      u = Zs;
      break;
    case "step":
      u = Qs;
      break;
    case "stepAfter":
      u = Jc;
      break;
    case "stepBefore":
      u = Kc;
      break;
    case "rounded":
      u = Vn;
      break;
    default:
      u = $s;
  }
  let { x: b, y: X } = E(t), j = As().x(b).y(X).curve(u), L;
  switch (t.thickness) {
    case "normal":
      L = "edge-thickness-normal";
      break;
    case "thick":
      L = "edge-thickness-thick";
      break;
    case "invisible":
      L = "edge-thickness-invisible";
      break;
    default:
      L = "edge-thickness-normal";
  }
  switch (t.pattern) {
    case "solid":
      L += " edge-pattern-solid";
      break;
    case "dotted":
      L += " edge-pattern-dotted";
      break;
    case "dashed":
      L += " edge-pattern-dashed";
      break;
    default:
      L += " edge-pattern-solid";
  }
  let w, C = k === "rounded" ? Tt(Ct(f, t), 5) : j(f), S = Array.isArray(t.style) ? t.style : [t.style], z = S.find((_) => _ == null ? void 0 : _.startsWith("stroke:")), O = "";
  t.animate && (O = "edge-animation-fast"), t.animation && (O = "edge-animation-" + t.animation);
  let D = false;
  if (t.look === "handDrawn") {
    let _ = Vt2.svg(r);
    Object.assign([], f);
    let R = _.path(C, { roughness: 0.3, seed: c });
    L += " transition", w = ia(R).select("path").attr("id", `${e}-${t.id}`).attr("class", " " + L + (t.classes ? " " + t.classes : "") + (O ? " " + O : "")).attr("style", S ? S.reduce((Q, Z) => Q + ";" + Z, "") : "");
    let q = w.attr("d");
    w.attr("d", q), r.node().appendChild(w.node());
  } else {
    let _ = p.join(";"), R = S ? S.reduce((P, v) => P + v + ";", "") : "", q = (_ ? _ + ";" + R + ";" : R) + ";" + (S ? S.reduce((P, v) => P + ";" + v, "") : "");
    w = r.append("path").attr("d", C).attr("id", `${e}-${t.id}`).attr("class", " " + L + (t.classes ? " " + t.classes : "") + (O ? " " + O : "")).attr("style", q), z = (_a = q.match(/stroke:([^;]+)/)) == null ? void 0 : _a[1], D = t.animate === true || !!t.animation || _.includes("animation");
    let Q = w.node(), Z = typeof Q.getTotalLength == "function" ? Q.getTotalLength() : 0, J = T[t.arrowTypeStart] || 0, F = T[t.arrowTypeEnd] || 0;
    if (t.look === "neo" && !D) {
      let v = `stroke-dasharray: ${t.pattern === "dotted" || t.pattern === "dashed" ? Bt(Z, J, F) : `0 ${J} ${Z - J - F} ${F}`}; stroke-dashoffset: 0;`;
      w.attr("style", v + w.attr("style"));
    }
  }
  w.attr("data-edge", true), w.attr("data-et", "edge"), w.attr("data-id", t.id), w.attr("data-points", x), w.attr("data-look", Vt(t.look)), t.showPoints && f.forEach((_) => {
    r.append("circle").style("stroke", "red").style("fill", "red").attr("r", 1).attr("cx", _.x).attr("cy", _.y);
  });
  let A = "";
  (qo().flowchart.arrowMarkerAbsolute || qo().state.arrowMarkerAbsolute) && (A = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, A = A.replace(/\(/g, "\\(").replace(/\)/g, "\\)")), pt.info("arrowTypeStart", t.arrowTypeStart), pt.info("arrowTypeEnd", t.arrowTypeEnd);
  let St = !D && (t == null ? void 0 : t.look) === "neo";
  bt(w, t, A, e, s2, St, z);
  let Ot2 = Math.floor(l.length / 2), $t = l[Ot2];
  Ut.isLabelCoordinateInPath($t, w.attr("d")) || (m3 = true);
  let G = {};
  return m3 && (G.updatedPath = l), G.originalPath = t.points, G;
}, "insertEdge");
function Tt(r, t) {
  if (r.length < 2) return "";
  let a = "", s2 = r.length, o = 1e-5;
  for (let n = 0; n < s2; n++) {
    let e = r[n], i = r[n - 1], c = r[n + 1];
    if (n === 0) a += `M${e.x},${e.y}`;
    else if (n === s2 - 1) a += `L${e.x},${e.y}`;
    else {
      let l = e.x - i.x, m3 = e.y - i.y, g2 = c.x - e.x, h = c.y - e.y, p = Math.hypot(l, m3), x = Math.hypot(g2, h);
      if (p < o || x < o) {
        a += `L${e.x},${e.y}`;
        continue;
      }
      let f = l / p, k = m3 / p, u = g2 / x, b = h / x, X = f * u + k * b, j = Math.max(-1, Math.min(1, X)), L = Math.acos(j);
      if (L < o || Math.abs(Math.PI - L) < o) {
        a += `L${e.x},${e.y}`;
        continue;
      }
      let w = Math.min(t / Math.sin(L / 2), p / 2, x / 2), C = e.x - f * w, S = e.y - k * w, z = e.x + u * w, O = e.y + b * w;
      a += `L${C},${S}`, a += `Q${e.x},${e.y} ${z},${O}`;
    }
  }
  return a;
}
m(Tt, "generateRoundedPath");
function _t(r, t) {
  if (!r || !t) return { angle: 0, deltaX: 0, deltaY: 0 };
  let a = t.x - r.x, s2 = t.y - r.y;
  return { angle: Math.atan2(s2, a), deltaX: a, deltaY: s2 };
}
m(_t, "calculateDeltaAndAngle");
function Ct(r, t) {
  let a = r.map((o) => ({ ...o }));
  if (r.length >= 2 && s[t.arrowTypeStart]) {
    let o = s[t.arrowTypeStart], n = r[0], e = r[1], { angle: i } = _t(n, e), c = o * Math.cos(i), l = o * Math.sin(i);
    a[0].x = n.x + c, a[0].y = n.y + l;
  }
  let s2 = r.length;
  if (s2 >= 2 && s[t.arrowTypeEnd]) {
    let o = s[t.arrowTypeEnd], n = r[s2 - 1], e = r[s2 - 2], { angle: i } = _t(e, n), c = o * Math.cos(i), l = o * Math.sin(i);
    a[s2 - 1].x = n.x - c, a[s2 - 1].y = n.y - l;
  }
  return a;
}
m(Ct, "applyMarkerOffsetsToPoints");
var zt = m((r, t, a, s2) => {
  t.forEach((o) => {
    ir[o](r, a, s2);
  });
}, "insertMarkers");
var At = m((r, t, a) => {
  pt.trace("Making markers for ", a), r.append("defs").append("marker").attr("id", a + "_" + t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z"), r.append("marker").attr("id", a + "_" + t + "-extensionStart-margin").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("viewBox", "0 0 20 14").append("polygon").attr("points", "10,7 18,13 18,1").style("stroke-width", 2).style("stroke-dasharray", "0"), r.append("defs").append("marker").attr("id", a + "_" + t + "-extensionEnd-margin").attr("class", "marker extension " + t).attr("refX", 9).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("viewBox", "0 0 20 14").append("polygon").attr("points", "10,1 10,13 18,7").style("stroke-width", 2).style("stroke-dasharray", "0");
}, "extension");
var Rt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionStart-margin").attr("class", "marker composition " + t).attr("refX", 15).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("viewBox", "0 0 15 15").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionEnd-margin").attr("class", "marker composition " + t).attr("refX", 3.5).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "composition");
var qt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationStart-margin").attr("class", "marker aggregation " + t).attr("refX", 15).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 2).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationEnd-margin").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 2).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "aggregation");
var Qt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyStart-margin").attr("class", "marker dependency " + t).attr("refX", 4).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyEnd-margin").attr("class", "marker dependency " + t).attr("refX", 16).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "dependency");
var Zt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopStart-margin").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6).attr("stroke-width", 2), r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopEnd-margin").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6).attr("stroke-width", 2);
}, "lollipop");
var Pt = m((r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-pointEnd-margin").attr("class", "marker " + t).attr("viewBox", "0 0 11.5 14").attr("refX", 11.5).attr("refY", 7).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 10.5).attr("markerHeight", 14).attr("orient", "auto").append("path").attr("d", "M 0 0 L 11.5 7 L 0 14 z").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-pointStart-margin").attr("class", "marker " + t).attr("viewBox", "0 0 11.5 14").attr("refX", 1).attr("refY", 7).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11.5).attr("markerHeight", 14).attr("orient", "auto").append("polygon").attr("points", "0,7 11.5,14 11.5,0").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0");
}, "point");
var Nt = m((r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-circleEnd-margin").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refY", 5).attr("refX", 12.25).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 14).attr("markerHeight", 14).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-circleStart-margin").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -2).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 14).attr("markerHeight", 14).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0");
}, "circle");
var Vt3 = m((r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-crossEnd-margin").attr("class", "marker cross " + t).attr("viewBox", "0 0 15 15").attr("refX", 17.7).attr("refY", 7.5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 1,1 L 14,14 M 1,14 L 14,1").attr("class", "arrowMarkerPath").style("stroke-width", 2.5), r.append("marker").attr("id", a + "_" + t + "-crossStart-margin").attr("class", "marker cross " + t).attr("viewBox", "0 0 15 15").attr("refX", -3.5).attr("refY", 7.5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 1,1 L 14,14 M 1,14 L 14,1").attr("class", "arrowMarkerPath").style("stroke-width", 2.5).style("stroke-dasharray", "1,0");
}, "cross");
var It = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "barb");
var jt = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { transitionColor: n } = o;
  r.append("defs").append("marker").attr("id", a + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L11,14 L13,7 L11,0 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-barbEnd-margin").attr("refX", 17).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L11,14 L13,7 L11,0 Z").attr("fill", `${n}`);
}, "barbNeo");
var Dt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-onlyOneStart").attr("class", "marker onlyOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18"), r.append("defs").append("marker").attr("id", a + "_" + t + "-onlyOneEnd").attr("class", "marker onlyOne " + t).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18");
}, "only_one");
var Gt = m((r, t, a) => {
  let s2 = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  s2.append("circle").attr("fill", "white").attr("cx", 21).attr("cy", 9).attr("r", 6), s2.append("path").attr("d", "M9,0 L9,18");
  let o = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + t).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  o.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 9).attr("r", 6), o.append("path").attr("d", "M21,0 L21,18");
}, "zero_or_one");
var Jt = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-oneOrMoreStart").attr("class", "marker oneOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"), r.append("defs").append("marker").attr("id", a + "_" + t + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + t).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18");
}, "one_or_more");
var Ft = m((r, t, a) => {
  let s2 = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  s2.append("circle").attr("fill", "white").attr("cx", 48).attr("cy", 18).attr("r", 6), s2.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18");
  let o = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + t).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  o.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 18).attr("r", 6), o.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18");
}, "zero_or_more");
var Kt = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n } = o;
  r.append("defs").append("marker").attr("id", a + "_" + t + "-onlyOneStart").attr("class", "marker onlyOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18").attr("stroke-width", `${n}`), r.append("defs").append("marker").attr("id", a + "_" + t + "-onlyOneEnd").attr("class", "marker onlyOne " + t).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18").attr("stroke-width", `${n}`);
}, "only_one_neo");
var tr = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n, mainBkg: e } = o, i = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse");
  i.append("circle").attr("fill", e ?? "white").attr("cx", 21).attr("cy", 9).attr("stroke-width", `${n}`).attr("r", 6), i.append("path").attr("d", "M9,0 L9,18").attr("stroke-width", `${n}`);
  let c = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + t).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto");
  c.append("circle").attr("fill", e ?? "white").attr("cx", 9).attr("cy", 9).attr("stroke-width", `${n}`).attr("r", 6), c.append("path").attr("d", "M21,0 L21,18").attr("stroke-width", `${n}`);
}, "zero_or_one_neo");
var rr = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n } = o;
  r.append("defs").append("marker").attr("id", a + "_" + t + "-oneOrMoreStart").attr("class", "marker oneOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27").attr("stroke-width", `${n}`), r.append("defs").append("marker").attr("id", a + "_" + t + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + t).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18").attr("stroke-width", `${n}`);
}, "one_or_more_neo");
var ar = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n, mainBkg: e } = o, i = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto");
  i.append("circle").attr("fill", e ?? "white").attr("cx", 45.5).attr("cy", 18).attr("r", 6).attr("stroke-width", `${n}`), i.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18").attr("stroke-width", `${n}`);
  let c = r.append("defs").append("marker").attr("id", a + "_" + t + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + t).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse");
  c.append("circle").attr("fill", e ?? "white").attr("cx", 11).attr("cy", 18).attr("r", 6).attr("stroke-width", `${n}`), c.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18").attr("stroke-width", `${n}`);
}, "zero_or_more_neo");
var er = m((r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("path").attr("d", `M0,0
      L20,10
      M20,10
      L0,20`);
}, "requirement_arrow");
var nr = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n } = o;
  r.append("defs").append("marker").attr("id", a + "_" + t + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("stroke-width", `${n}`).attr("viewBox", "0 0 25 20").append("path").attr("d", `M0,0
      L20,10
      M20,10
      L0,20`).attr("stroke-linejoin", "miter");
}, "requirement_arrow_neo");
var sr = m((r, t, a) => {
  let s2 = r.append("defs").append("marker").attr("id", a + "_" + t + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("g");
  s2.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none"), s2.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10), s2.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10);
}, "requirement_contains");
var or = m((r, t, a) => {
  let s2 = Ot(), { themeVariables: o } = s2, { strokeWidth: n } = o, e = r.append("defs").append("marker").attr("id", a + "_" + t + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("g");
  e.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none"), e.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10), e.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10), e.selectAll("*").attr("stroke-width", `${n}`);
}, "requirement_contains_neo");
var ir = { extension: At, composition: Rt, aggregation: qt, dependency: Qt, lollipop: Zt, point: Pt, circle: Nt, cross: Vt3, barb: It, barbNeo: jt, only_one: Dt, zero_or_one: Gt, one_or_more: Jt, zero_or_more: Ft, only_one_neo: Kt, zero_or_one_neo: tr, one_or_more_neo: rr, zero_or_more_neo: ar, requirement_arrow: er, requirement_contains: sr, requirement_arrow_neo: nr, requirement_contains_neo: or };
var Yr = zt;

export {
  _r,
  Sr,
  Or,
  $r,
  Yr
};
//# sourceMappingURL=chunk-QDSNXXJA.js.map

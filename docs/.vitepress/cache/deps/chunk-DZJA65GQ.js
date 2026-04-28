import {
  f
} from "./chunk-DJX4MEFN.js";
import {
  Cn,
  Qt,
  Ts,
  qr,
  w
} from "./chunk-HPIGS4CQ.js";
import {
  $s,
  Bc,
  Es,
  Gc,
  Hc,
  Jc,
  Kc,
  Lc,
  Qc,
  Qs,
  Rs,
  Vc,
  Vn,
  Wc,
  Xc,
  Zc,
  Zs,
  ia,
  pt,
  qc,
  zc,
  zs
} from "./chunk-LKDN26KO.js";
import {
  ki,
  qs
} from "./chunk-EQAKJMPU.js";
import {
  m,
  r
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-2HR5LOFI.mjs
var nt = r(f(), 1);
var ct = "​";
var ut = { curveBasis: $s, curveBasisClosed: Es, curveBasisOpen: Rs, curveBumpX: Lc, curveBumpY: zc, curveBundle: Hc, curveCardinalClosed: qc, curveCardinalOpen: Wc, curveCardinal: Bc, curveCatmullRomClosed: Xc, curveCatmullRomOpen: Gc, curveCatmullRom: Vc, curveLinear: Vn, curveLinearClosed: zs, curveMonotoneX: Zc, curveMonotoneY: Qc, curveNatural: Zs, curveStep: Qs, curveStepAfter: Jc, curveStepBefore: Kc };
var lt = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var ft = m(function(e, t) {
  let r2 = rt(e, /(?:init\b)|(?:initialize\b)/), n = {};
  if (Array.isArray(r2)) {
    let s = r2.map((u) => u.args);
    Qt(s), n = w(n, [...s]);
  } else n = r2.args;
  if (!n) return;
  let i = Ts(e, t), o = "config";
  return n[o] !== void 0 && (i === "flowchart-v2" && (i = "flowchart"), n[i] = n[o], delete n[o]), n;
}, "detectInit");
var rt = m(function(e, t = null) {
  var _a2, _b;
  try {
    let r2 = new RegExp(`[%]{2}(?![{]${lt.source})(?=[}][%]{2}).*
`, "ig");
    e = e.trim().replace(r2, "").replace(/'/gm, '"'), pt.debug(`Detecting diagram directive${t !== null ? " type:" + t : ""} based on the text:${e}`);
    let n, i = [];
    for (; (n = qr.exec(e)) !== null; ) if (n.index === qr.lastIndex && qr.lastIndex++, n && !t || t && ((_a2 = n[1]) == null ? void 0 : _a2.match(t)) || t && ((_b = n[2]) == null ? void 0 : _b.match(t))) {
      let o = n[1] ? n[1] : n[2], s = n[3] ? n[3].trim() : n[4] ? JSON.parse(n[4].trim()) : null;
      i.push({ type: o, args: s });
    }
    return i.length === 0 ? { type: e, args: null } : i.length === 1 ? i[0] : i;
  } catch (r2) {
    return pt.error(`ERROR: ${r2.message} - Unable to parse directive type: '${t}' based on the text: '${e}'`), { type: void 0, args: null };
  }
}, "detectDirective");
var zt = m(function(e) {
  return e.replace(qr, "");
}, "removeDirectives");
var gt = m(function(e, t) {
  for (let [r2, n] of t.entries()) if (n.match(e)) return r2;
  return -1;
}, "isSubstringInArray");
function dt(e, t) {
  if (!e) return t;
  let r2 = `curve${e.charAt(0).toUpperCase() + e.slice(1)}`;
  return ut[r2] ?? t;
}
m(dt, "interpolateToCurve");
function ht(e, t) {
  let r2 = e.trim();
  if (r2) return t.securityLevel !== "loose" ? (0, nt.sanitizeUrl)(r2) : r2;
}
m(ht, "formatUrl");
var mt = m((e, ...t) => {
  let r2 = e.split("."), n = r2.length - 1, i = r2[n], o = window;
  for (let s = 0; s < n; s++) if (o = o[r2[s]], !o) {
    pt.error(`Function name: ${e} not found in window`);
    return;
  }
  o[i](...t);
}, "runFunc");
function it(e, t) {
  return !e || !t ? 0 : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
m(it, "distance");
function pt2(e) {
  let t, r2 = 0;
  e.forEach((i) => {
    r2 += it(i, t), t = i;
  });
  let n = r2 / 2;
  return T(e, n);
}
m(pt2, "traverseEdge");
function xt(e) {
  return e.length === 1 ? e[0] : pt2(e);
}
m(xt, "calcLabelPosition");
var tt = m((e, t = 2) => {
  let r2 = Math.pow(10, t);
  return Math.round(e * r2) / r2;
}, "roundNumber");
var T = m((e, t) => {
  let r2, n = t;
  for (let i of e) {
    if (r2) {
      let o = it(i, r2);
      if (o === 0) return r2;
      if (o < n) n -= o;
      else {
        let s = n / o;
        if (s <= 0) return r2;
        if (s >= 1) return { x: i.x, y: i.y };
        if (s > 0 && s < 1) return { x: tt((1 - s) * r2.x + s * i.x, 5), y: tt((1 - s) * r2.y + s * i.y, 5) };
      }
    }
    r2 = i;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint");
var yt = m((e, t, r2) => {
  pt.info(`our points ${JSON.stringify(t)}`), t[0] !== r2 && (t = t.reverse());
  let i = T(t, 25), o = e ? 10 : 5, s = Math.atan2(t[0].y - i.y, t[0].x - i.x), u = { x: 0, y: 0 };
  return u.x = Math.sin(s) * o + (t[0].x + i.x) / 2, u.y = -Math.cos(s) * o + (t[0].y + i.y) / 2, u;
}, "calcCardinalityPosition");
function vt(e, t, r2) {
  let n = structuredClone(r2);
  pt.info("our points", n), t !== "start_left" && t !== "start_right" && n.reverse();
  let i = 25 + e, o = T(n, i), s = 10 + e * 0.5, u = Math.atan2(n[0].y - o.y, n[0].x - o.x), c = { x: 0, y: 0 };
  return t === "start_left" ? (c.x = Math.sin(u + Math.PI) * s + (n[0].x + o.x) / 2, c.y = -Math.cos(u + Math.PI) * s + (n[0].y + o.y) / 2) : t === "end_right" ? (c.x = Math.sin(u - Math.PI) * s + (n[0].x + o.x) / 2 - 5, c.y = -Math.cos(u - Math.PI) * s + (n[0].y + o.y) / 2 - 5) : t === "end_left" ? (c.x = Math.sin(u) * s + (n[0].x + o.x) / 2 - 5, c.y = -Math.cos(u) * s + (n[0].y + o.y) / 2 - 5) : (c.x = Math.sin(u) * s + (n[0].x + o.x) / 2, c.y = -Math.cos(u) * s + (n[0].y + o.y) / 2), c;
}
m(vt, "calcTerminalLabelPosition");
function bt(e) {
  let t = "", r2 = "";
  for (let n of e) n !== void 0 && (n.startsWith("color:") || n.startsWith("text-align:") ? r2 = r2 + n + ";" : t = t + n + ";");
  return { style: t, labelStyle: r2 };
}
m(bt, "getStylesFromArray");
var et = 0;
var Ct = m(() => (et++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + et), "generateId");
function Mt(e) {
  let t = "", r2 = "0123456789abcdef", n = r2.length;
  for (let i = 0; i < e; i++) t += r2.charAt(Math.floor(Math.random() * n));
  return t;
}
m(Mt, "makeRandomHex");
var wt = m((e) => Mt(e.length), "random");
var Pt = m(function() {
  return { x: 0, y: 0, fill: void 0, anchor: "start", style: "#666", width: 100, height: 100, textMargin: 0, rx: 0, ry: 0, valign: void 0, text: "" };
}, "getTextObj");
var Tt = m(function(e, t) {
  let r2 = t.text.replace(Cn.lineBreakRegex, " "), [, n] = $(t.fontSize), i = e.append("text");
  i.attr("x", t.x), i.attr("y", t.y), i.style("text-anchor", t.anchor), i.style("font-family", t.fontFamily), i.style("font-size", n), i.style("font-weight", t.fontWeight), i.attr("fill", t.fill), t.class !== void 0 && i.attr("class", t.class);
  let o = i.append("tspan");
  return o.attr("x", t.x + t.textMargin * 2), o.attr("fill", t.fill), o.text(r2), i;
}, "drawSimpleText");
var St = ki((e, t, r2) => {
  if (!e || (r2 = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" }, r2), Cn.lineBreakRegex.test(e))) return e;
  let n = e.split(" ").filter(Boolean), i = [], o = "";
  return n.forEach((s, u) => {
    let c = M(`${s} `, r2), l = M(o, r2);
    if (c > t) {
      let { hyphenatedStrings: h, remainingWord: f2 } = $t(s, t, "-", r2);
      i.push(o, ...h), o = f2;
    } else l + c >= t ? (i.push(o), o = s) : o = [o, s].filter(Boolean).join(" ");
    u + 1 === n.length && i.push(o);
  }), i.filter((s) => s !== "").join(r2.joinWith);
}, (e, t, r2) => `${e}${t}${r2.fontSize}${r2.fontWeight}${r2.fontFamily}${r2.joinWith}`);
var $t = ki((e, t, r2 = "-", n) => {
  n = Object.assign({ fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 }, n);
  let i = [...e], o = [], s = "";
  return i.forEach((u, c) => {
    let l = `${s}${u}`;
    if (M(l, n) >= t) {
      let x = c + 1, h = i.length === x, f2 = `${l}${r2}`;
      o.push(h ? l : f2), s = "";
    } else s = l;
  }), { hyphenatedStrings: o, remainingWord: s };
}, (e, t, r2 = "-", n) => `${e}${t}${r2}${n.fontSize}${n.fontWeight}${n.fontFamily}`);
function Wt(e, t) {
  return S(e, t).height;
}
m(Wt, "calculateTextHeight");
function M(e, t) {
  return S(e, t).width;
}
m(M, "calculateTextWidth");
var S = ki((e, t) => {
  let { fontSize: r2 = 12, fontFamily: n = "Arial", fontWeight: i = 400 } = t;
  if (!e) return { width: 0, height: 0 };
  let [, o] = $(r2), s = ["sans-serif", n], u = e.split(Cn.lineBreakRegex), c = [], l = ia("body");
  if (!l.remove) return { width: 0, height: 0, lineHeight: 0 };
  let p = l.append("svg");
  for (let h of s) {
    let f2 = 0, g = { width: 0, height: 0, lineHeight: 0 };
    for (let ot of u) {
      let W = Pt();
      W.text = ot || ct;
      let E = Tt(p, W).style("font-size", o).style("font-weight", i).style("font-family", h), y = (E._groups || E)[0][0].getBBox();
      if (y.width === 0 && y.height === 0) throw new Error("svg element not in render tree");
      g.width = Math.round(Math.max(g.width, y.width)), f2 = Math.round(y.height), g.height += f2, g.lineHeight = Math.round(Math.max(g.lineHeight, f2));
    }
    c.push(g);
  }
  p.remove();
  let x = isNaN(c[1].height) || isNaN(c[1].width) || isNaN(c[1].lineHeight) || c[0].height > c[1].height && c[0].width > c[1].width && c[0].lineHeight > c[1].lineHeight ? 0 : 1;
  return c[x];
}, (e, t) => `${e}${t.fontSize}${t.fontWeight}${t.fontFamily}`);
var _a;
var P = (_a = class {
  constructor(t = false, r2) {
    this.count = 0;
    this.count = r2 ? r2.length : 0, this.next = t ? () => this.count++ : () => Date.now();
  }
}, m(_a, "InitIDGenerator"), _a);
var C;
var Et = m(function(e) {
  return C = C || document.createElement("div"), e = escape(e).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), C.innerHTML = e, unescape(C.textContent);
}, "entityDecode");
function It(e) {
  return "str" in e;
}
m(It, "isDetailedError");
var Bt = m((e, t, r2, n) => {
  var _a2;
  if (!n) return;
  let i = (_a2 = e.node()) == null ? void 0 : _a2.getBBox();
  i && e.append("text").text(n).attr("text-anchor", "middle").attr("x", i.x + i.width / 2).attr("y", -r2).attr("class", t);
}, "insertTitle");
var $ = m((e) => {
  if (typeof e == "number") return [e, e + "px"];
  let t = parseInt(e ?? "", 10);
  return Number.isNaN(t) ? [void 0, void 0] : e === String(t) ? [t, e + "px"] : [t, e];
}, "parseFontSize");
function Lt(e, t) {
  return qs({}, e, t);
}
m(Lt, "cleanAndMerge");
var Ut = { assignWithDepth: w, wrapLabel: St, calculateTextHeight: Wt, calculateTextWidth: M, calculateTextDimensions: S, cleanAndMerge: Lt, detectInit: ft, detectDirective: rt, isSubstringInArray: gt, interpolateToCurve: dt, calcLabelPosition: xt, calcCardinalityPosition: yt, calcTerminalLabelPosition: vt, formatUrl: ht, getStylesFromArray: bt, generateId: Ct, random: wt, runFunc: mt, entityDecode: Et, insertTitle: Bt, isLabelCoordinateInPath: Dt, parseFontSize: $, InitIDGenerator: P };
var Xt = m(function(e) {
  let t = e;
  return t = t.replace(/style.*:\S*#.*;/g, function(r2) {
    return r2.substring(0, r2.length - 1);
  }), t = t.replace(/classDef.*:\S*#.*;/g, function(r2) {
    return r2.substring(0, r2.length - 1);
  }), t = t.replace(/#\w+;/g, function(r2) {
    let n = r2.substring(1, r2.length - 1);
    return /^\+?\d+$/.test(n) ? "ﬂ°°" + n + "¶ß" : "ﬂ°" + n + "¶ß";
  }), t;
}, "encodeEntities");
var Yt = m(function(e) {
  return e.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities");
var Jt = m((e, t, { counter: r2 = 0, prefix: n, suffix: i }, o) => o || `${n ? `${n}_` : ""}${e}_${t}_${r2}${i ? `_${i}` : ""}`, "getEdgeId");
function Vt(e) {
  return e ?? null;
}
m(Vt, "handleUndefinedAttr");
function Dt(e, t) {
  let r2 = Math.round(e.x), n = Math.round(e.y), i = t.replace(/(\d+\.\d+)/g, (o) => Math.round(parseFloat(o)).toString());
  return i.includes(r2.toString()) || i.includes(n.toString());
}
m(Dt, "isLabelCoordinateInPath");

export {
  ct,
  zt,
  dt,
  bt,
  Ct,
  wt,
  St,
  Wt,
  M,
  It,
  $,
  Lt,
  Ut,
  Xt,
  Yt,
  Jt,
  Vt
};
//# sourceMappingURL=chunk-DZJA65GQ.js.map

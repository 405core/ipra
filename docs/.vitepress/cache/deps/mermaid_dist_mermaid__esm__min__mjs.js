import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Ar,
  gr
} from "./chunk-YYFVCIEQ.js";
import {
  H
} from "./chunk-V354F32T.js";
import "./chunk-QDSNXXJA.js";
import "./chunk-LK7THHH6.js";
import "./chunk-OB6FDEYX.js";
import "./chunk-KKUK5XSX.js";
import "./chunk-37DMPFOG.js";
import "./chunk-BIOJLABG.js";
import {
  Ce,
  Qn
} from "./chunk-GYGMMI4F.js";
import {
  It,
  Lt,
  Ut,
  Xt,
  Yt as Yt2,
  zt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Bs,
  Bt,
  Hi,
  In,
  Jh,
  Mt,
  On,
  Ot,
  Qh,
  Ts,
  Vt,
  Yt,
  Zh,
  et,
  fn,
  is,
  ks,
  me,
  no,
  rn,
  so,
  tn,
  vr,
  w
} from "./chunk-HPIGS4CQ.js";
import {
  Wh,
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import {
  Cr
} from "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/mermaid.esm.min.mjs
var Ne = m((t) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t), "detector");
var He = m(async () => {
  let { diagram: t } = await import("./c4Diagram-DFAF54RM-EAOBGN5C.js");
  return { id: "c4", diagram: t };
}, "loader");
var Ue = { id: "c4", detector: Ne, loader: He };
var Xt2 = Ue;
var Wt = "flowchart";
var qe = m((t, e) => {
  var _a3, _b;
  return ((_a3 = e == null ? void 0 : e.flowchart) == null ? void 0 : _a3.defaultRenderer) === "dagre-wrapper" || ((_b = e == null ? void 0 : e.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk" ? false : /^\s*graph/.test(t);
}, "detector");
var Be = m(async () => {
  let { diagram: t } = await import("./flowDiagram-OTCZ4VVT-XJ25LSS3.js");
  return { id: Wt, diagram: t };
}, "loader");
var Ye = { id: Wt, detector: qe, loader: Be };
var Kt = Ye;
var Qt = "flowchart-v2";
var Xe = m((t, e) => {
  var _a3, _b, _c;
  return ((_a3 = e == null ? void 0 : e.flowchart) == null ? void 0 : _a3.defaultRenderer) === "dagre-d3" ? false : (((_b = e == null ? void 0 : e.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk" && (e.layout = "elk"), /^\s*graph/.test(t) && ((_c = e == null ? void 0 : e.flowchart) == null ? void 0 : _c.defaultRenderer) === "dagre-wrapper" ? true : /^\s*flowchart/.test(t));
}, "detector");
var We = m(async () => {
  let { diagram: t } = await import("./flowDiagram-OTCZ4VVT-XJ25LSS3.js");
  return { id: Qt, diagram: t };
}, "loader");
var Ke = { id: Qt, detector: Xe, loader: We };
var Zt = Ke;
var Qe = m((t) => /^\s*erDiagram/.test(t), "detector");
var Ze = m(async () => {
  let { diagram: t } = await import("./erDiagram-GCSMX5X6-7I3TPPAH.js");
  return { id: "er", diagram: t };
}, "loader");
var Je = { id: "er", detector: Qe, loader: Ze };
var Jt = Je;
var tr = "gitGraph";
var ta = m((t) => /^\s*gitGraph/.test(t), "detector");
var ra = m(async () => {
  let { diagram: t } = await import("./gitGraphDiagram-3HKGZ4G3-SRPB2HZV.js");
  return { id: tr, diagram: t };
}, "loader");
var ea = { id: tr, detector: ta, loader: ra };
var rr = ea;
var er = "gantt";
var aa = m((t) => /^\s*gantt/.test(t), "detector");
var ia2 = m(async () => {
  let { diagram: t } = await import("./ganttDiagram-MUNLMDZQ-VKZVRPJH.js");
  return { id: er, diagram: t };
}, "loader");
var oa = { id: er, detector: aa, loader: ia2 };
var ar = oa;
var ir = "info";
var na = m((t) => /^\s*info/.test(t), "detector");
var sa = m(async () => {
  let { diagram: t } = await import("./infoDiagram-MN7RKWGX-6YBUKRHL.js");
  return { id: ir, diagram: t };
}, "loader");
var or = { id: ir, detector: na, loader: sa };
var ca = m((t) => /^\s*pie/.test(t), "detector");
var ma = m(async () => {
  let { diagram: t } = await import("./pieDiagram-3IATQBI2-CJ4PS5BJ.js");
  return { id: "pie", diagram: t };
}, "loader");
var nr = { id: "pie", detector: ca, loader: ma };
var sr = "quadrantChart";
var pa = m((t) => /^\s*quadrantChart/.test(t), "detector");
var da = m(async () => {
  let { diagram: t } = await import("./quadrantDiagram-E256RVCF-WQYLCOZM.js");
  return { id: sr, diagram: t };
}, "loader");
var fa = { id: sr, detector: pa, loader: da };
var cr = fa;
var mr = "xychart";
var ga = m((t) => /^\s*xychart(-beta)?/.test(t), "detector");
var la = m(async () => {
  let { diagram: t } = await import("./xychartDiagram-ZHJ5623Y-LAMQDAK3.js");
  return { id: mr, diagram: t };
}, "loader");
var ua = { id: mr, detector: ga, loader: la };
var pr = ua;
var dr = "requirement";
var Da = m((t) => /^\s*requirement(Diagram)?/.test(t), "detector");
var ya = m(async () => {
  let { diagram: t } = await import("./requirementDiagram-M5DCFWZL-HOKTPCHP.js");
  return { id: dr, diagram: t };
}, "loader");
var xa = { id: dr, detector: Da, loader: ya };
var fr = xa;
var gr2 = "sequence";
var ha = m((t) => /^\s*sequenceDiagram/.test(t), "detector");
var Ea = m(async () => {
  let { diagram: t } = await import("./sequenceDiagram-ZOUHS735-AB3VGV3P.js");
  return { id: gr2, diagram: t };
}, "loader");
var wa = { id: gr2, detector: ha, loader: Ea };
var lr = wa;
var ur = "class";
var La = m((t, e) => {
  var _a3;
  return ((_a3 = e == null ? void 0 : e.class) == null ? void 0 : _a3.defaultRenderer) === "dagre-wrapper" ? false : /^\s*classDiagram/.test(t);
}, "detector");
var ba = m(async () => {
  let { diagram: t } = await import("./classDiagram-PPOCWD7C-C6BX4ZLW.js");
  return { id: ur, diagram: t };
}, "loader");
var va = { id: ur, detector: La, loader: ba };
var Dr = va;
var yr = "classDiagram";
var Sa = m((t, e) => {
  var _a3;
  return /^\s*classDiagram/.test(t) && ((_a3 = e == null ? void 0 : e.class) == null ? void 0 : _a3.defaultRenderer) === "dagre-wrapper" ? true : /^\s*classDiagram-v2/.test(t);
}, "detector");
var Ma = m(async () => {
  let { diagram: t } = await import("./classDiagram-v2-23LJLIIU-DHW3EGYH.js");
  return { id: yr, diagram: t };
}, "loader");
var Aa = { id: yr, detector: Sa, loader: Ma };
var xr = Aa;
var hr = "state";
var Ta = m((t, e) => {
  var _a3;
  return ((_a3 = e == null ? void 0 : e.state) == null ? void 0 : _a3.defaultRenderer) === "dagre-wrapper" ? false : /^\s*stateDiagram/.test(t);
}, "detector");
var Ca = m(async () => {
  let { diagram: t } = await import("./stateDiagram-MLPALWAM-JW3WLCDW.js");
  return { id: hr, diagram: t };
}, "loader");
var ka = { id: hr, detector: Ta, loader: Ca };
var Er = ka;
var wr = "stateDiagram";
var Ra = m((t, e) => {
  var _a3;
  return !!(/^\s*stateDiagram-v2/.test(t) || /^\s*stateDiagram/.test(t) && ((_a3 = e == null ? void 0 : e.state) == null ? void 0 : _a3.defaultRenderer) === "dagre-wrapper");
}, "detector");
var ja = m(async () => {
  let { diagram: t } = await import("./stateDiagram-v2-B5LQ5ZB2-2IPPVU6V.js");
  return { id: wr, diagram: t };
}, "loader");
var Ia = { id: wr, detector: Ra, loader: ja };
var Lr = Ia;
var br = "journey";
var Oa = m((t) => /^\s*journey/.test(t), "detector");
var Pa = m(async () => {
  let { diagram: t } = await import("./journeyDiagram-SO5T7YLQ-EGEOLCG6.js");
  return { id: br, diagram: t };
}, "loader");
var Fa = { id: br, detector: Oa, loader: Pa };
var vr2 = Fa;
var _a = m((t, e, a) => {
  pt.debug(`rendering svg for syntax error
`);
  let i = d(e), o = i.append("g");
  i.attr("viewBox", "0 0 2412 512"), is(i, 100, 512, true), o.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"), o.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"), o.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"), o.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"), o.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"), o.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"), o.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), o.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${a}`);
}, "draw");
var ht = { draw: _a };
var Sr = ht;
var Va = { db: {}, renderer: ht, parser: { parse: m(() => {
}, "parse") } };
var Mr = Va;
var Ar2 = "flowchart-elk";
var Ga = m((t, e = {}) => {
  var _a3;
  return /^\s*flowchart-elk/.test(t) || /^\s*(flowchart|graph)/.test(t) && ((_a3 = e == null ? void 0 : e.flowchart) == null ? void 0 : _a3.defaultRenderer) === "elk" ? (e.layout = "elk", true) : false;
}, "detector");
var za = m(async () => {
  let { diagram: t } = await import("./flowDiagram-OTCZ4VVT-XJ25LSS3.js");
  return { id: Ar2, diagram: t };
}, "loader");
var $a = { id: Ar2, detector: Ga, loader: za };
var Tr = $a;
var Cr2 = "timeline";
var Na = m((t) => /^\s*timeline/.test(t), "detector");
var Ha = m(async () => {
  let { diagram: t } = await import("./timeline-definition-5SPVSISX-AN433M25.js");
  return { id: Cr2, diagram: t };
}, "loader");
var Ua = { id: Cr2, detector: Na, loader: Ha };
var kr = Ua;
var Rr = "mindmap";
var qa = m((t) => /^\s*mindmap/.test(t), "detector");
var Ba = m(async () => {
  let { diagram: t } = await import("./mindmap-definition-2EUWGEK5-6YMWQNAB.js");
  return { id: Rr, diagram: t };
}, "loader");
var Ya = { id: Rr, detector: qa, loader: Ba };
var jr = Ya;
var Ir = "kanban";
var Xa = m((t) => /^\s*kanban/.test(t), "detector");
var Wa = m(async () => {
  let { diagram: t } = await import("./kanban-definition-LJHFXRCJ-YDYOWYCA.js");
  return { id: Ir, diagram: t };
}, "loader");
var Ka = { id: Ir, detector: Xa, loader: Wa };
var Or = Ka;
var Pr = "sankey";
var Qa = m((t) => /^\s*sankey(-beta)?/.test(t), "detector");
var Za = m(async () => {
  let { diagram: t } = await import("./sankeyDiagram-L3NBLAOT-MG75WST5.js");
  return { id: Pr, diagram: t };
}, "loader");
var Ja = { id: Pr, detector: Qa, loader: Za };
var Fr = Ja;
var _r = "packet";
var ti = m((t) => /^\s*packet(-beta)?/.test(t), "detector");
var ri = m(async () => {
  let { diagram: t } = await import("./diagram-JC5VWROH-BSHPEPTD.js");
  return { id: _r, diagram: t };
}, "loader");
var Vr = { id: _r, detector: ti, loader: ri };
var Gr = "radar";
var ei = m((t) => /^\s*radar-beta/.test(t), "detector");
var ai = m(async () => {
  let { diagram: t } = await import("./diagram-H7BISOXX-GXWRP2YE.js");
  return { id: Gr, diagram: t };
}, "loader");
var zr = { id: Gr, detector: ei, loader: ai };
var $r = "block";
var ii = m((t) => /^\s*block(-beta)?/.test(t), "detector");
var oi = m(async () => {
  let { diagram: t } = await import("./blockDiagram-IGV67L2C-ROUNY5Q6.js");
  return { id: $r, diagram: t };
}, "loader");
var ni = { id: $r, detector: ii, loader: oi };
var Nr = ni;
var Hr = "treeView";
var si = m((t) => /^\s*treeView-beta/.test(t), "detector");
var ci = m(async () => {
  let { diagram: t } = await import("./diagram-LXUTUG65-S7ZFDLGP.js");
  return { id: Hr, diagram: t };
}, "loader");
var mi = { id: Hr, detector: si, loader: ci };
var Ur = mi;
var qr = "architecture";
var pi = m((t) => /^\s*architecture/.test(t), "detector");
var di = m(async () => {
  let { diagram: t } = await import("./architectureDiagram-EMZXCZ2Q-ZKVAPAFE.js");
  return { id: qr, diagram: t };
}, "loader");
var fi = { id: qr, detector: pi, loader: di };
var Br = fi;
var Yr = "ishikawa";
var gi = m((t) => /^\s*ishikawa(-beta)?\b/i.test(t), "detector");
var li = m(async () => {
  let { diagram: t } = await import("./ishikawaDiagram-YMYX4NHK-OKR5SJQS.js");
  return { id: Yr, diagram: t };
}, "loader");
var Xr = { id: Yr, detector: gi, loader: li };
var Wr = "venn";
var ui = m((t) => /^\s*venn-beta/.test(t), "detector");
var Di = m(async () => {
  let { diagram: t } = await import("./vennDiagram-IE5QUKF5-O2RN4BXX.js");
  return { id: Wr, diagram: t };
}, "loader");
var yi = { id: Wr, detector: ui, loader: Di };
var Kr = yi;
var Qr = "treemap";
var xi = m((t) => /^\s*treemap/.test(t), "detector");
var hi = m(async () => {
  let { diagram: t } = await import("./diagram-WEHSV5V5-IFR6YJIY.js");
  return { id: Qr, diagram: t };
}, "loader");
var Zr = { id: Qr, detector: xi, loader: hi };
var Jr = "wardley-beta";
var Ei = m((t) => /^\s*wardley-beta/i.test(t), "detector");
var wi = m(async () => {
  let { diagram: t } = await import("./wardleyDiagram-XU3VSMPF-OUNPJMEE.js");
  return { id: Jr, diagram: t };
}, "loader");
var Li = { id: Jr, detector: Ei, loader: wi };
var te = Li;
var re = false;
var $ = m(() => {
  re || (re = true, On("error", Mr, (t) => t.toLowerCase().trim() === "error"), On("---", { db: { clear: m(() => {
  }, "clear") }, styles: {}, renderer: { draw: m(() => {
  }, "draw") }, parser: { parse: m(() => {
    throw new Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
  }, "parse") }, init: m(() => null, "init") }, (t) => t.toLowerCase().trimStart().startsWith("---")), ks(Tr, jr, Br), ks(Xt2, Or, xr, Dr, Jt, ar, or, nr, fr, lr, Zt, Kt, kr, rr, Lr, Er, vr2, cr, Fr, Vr, pr, Nr, Ur, zr, Xr, Zr, Kr, te));
}, "addDiagrams");
var ee = m(async () => {
  pt.debug("Loading registered diagrams");
  let e = (await Promise.allSettled(Object.entries(Yt).map(async ([a, { detector: i, loader: o }]) => {
    if (o) try {
      In(a);
    } catch {
      try {
        let { diagram: n, id: m2 } = await o();
        On(m2, n, i);
      } catch (n) {
        throw pt.error(`Failed to load external diagram with key ${a}. Removing from detectors.`), delete Yt[a], n;
      }
    }
  }))).filter((a) => a.status === "rejected");
  if (e.length > 0) {
    pt.error(`Failed to load ${e.length} external diagrams`);
    for (let a of e) pt.error(a);
    throw new Error(`Failed to load ${e.length} external diagrams`);
  }
}, "loadRegisteredDiagrams");
var et2 = "comm";
var at = "rule";
var it = "decl";
var ae = "@import";
var ie = "@namespace";
var oe = "@keyframes";
var ne = "@layer";
var Et = Math.abs;
var Q = String.fromCharCode;
function ot(t) {
  return t.trim();
}
m(ot, "trim");
function Z(t, e, a) {
  return t.replace(e, a);
}
m(Z, "replace");
function se(t, e, a) {
  return t.indexOf(e, a);
}
m(se, "indexof");
function O(t, e) {
  return t.charCodeAt(e) | 0;
}
m(O, "charat");
function P(t, e, a) {
  return t.slice(e, a);
}
m(P, "substr");
function h(t) {
  return t.length;
}
m(h, "strlen");
function ce(t) {
  return t.length;
}
m(ce, "sizeof");
function N(t, e) {
  return e.push(t), t;
}
m(N, "append");
var nt = 1;
var H2 = 1;
var me2 = 0;
var w2 = 0;
var D = 0;
var q = "";
function st(t, e, a, i, o, n, m2, s) {
  return { value: t, root: e, parent: a, type: i, props: o, children: n, line: nt, column: H2, length: m2, return: "", siblings: s };
}
m(st, "node");
function pe() {
  return D;
}
m(pe, "char");
function de() {
  return D = w2 > 0 ? O(q, --w2) : 0, H2--, D === 10 && (H2 = 1, nt--), D;
}
m(de, "prev");
function L() {
  return D = w2 < me2 ? O(q, w2++) : 0, H2++, D === 10 && (H2 = 1, nt++), D;
}
m(L, "next");
function j() {
  return O(q, w2);
}
m(j, "peek");
function J() {
  return w2;
}
m(J, "caret");
function ct(t, e) {
  return P(q, t, e);
}
m(ct, "slice");
function U(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
m(U, "token");
function fe(t) {
  return nt = H2 = 1, me2 = h(q = t), w2 = 0, [];
}
m(fe, "alloc");
function ge(t) {
  return q = "", t;
}
m(ge, "dealloc");
function mt(t) {
  return ot(ct(w2 - 1, wt(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
m(mt, "delimit");
function le(t) {
  for (; (D = j()) && D < 33; ) L();
  return U(t) > 2 || U(D) > 3 ? "" : " ";
}
m(le, "whitespace");
function ue(t, e) {
  for (; --e && L() && !(D < 48 || D > 102 || D > 57 && D < 65 || D > 70 && D < 97); ) ;
  return ct(t, J() + (e < 6 && j() == 32 && L() == 32));
}
m(ue, "escaping");
function wt(t) {
  for (; L(); ) switch (D) {
    case t:
      return w2;
    case 34:
    case 39:
      t !== 34 && t !== 39 && wt(D);
      break;
    case 40:
      t === 41 && wt(t);
      break;
    case 92:
      L();
      break;
  }
  return w2;
}
m(wt, "delimiter");
function De(t, e) {
  for (; L() && t + D !== 57; ) if (t + D === 84 && j() === 47) break;
  return "/*" + ct(e, w2 - 1) + "*" + Q(t === 47 ? t : L());
}
m(De, "commenter");
function ye(t) {
  for (; !U(j()); ) L();
  return ct(t, w2);
}
m(ye, "identifier");
function Ee(t) {
  return ge(pt2("", null, null, null, [""], t = fe(t), 0, [0], t));
}
m(Ee, "compile");
function pt2(t, e, a, i, o, n, m2, s, c) {
  for (var l = 0, y = 0, p = m2, x = 0, A = 0, b = 0, f = 1, C = 1, v = 1, u = 0, S = "", k = o, T = n, E = i, d2 = S; C; ) switch (b = u, u = L()) {
    case 40:
      if (b != 108 && O(d2, p - 1) == 58) {
        se(d2 += Z(mt(u), "&", "&\f"), "&\f", Et(l ? s[l - 1] : 0)) != -1 && (v = -1);
        break;
      }
    case 34:
    case 39:
    case 91:
      d2 += mt(u);
      break;
    case 9:
    case 10:
    case 13:
    case 32:
      d2 += le(b);
      break;
    case 92:
      d2 += ue(J() - 1, 7);
      continue;
    case 47:
      switch (j()) {
        case 42:
        case 47:
          N(bi(De(L(), J()), e, a, c), c), (U(b || 1) == 5 || U(j() || 1) == 5) && h(d2) && P(d2, -1, void 0) !== " " && (d2 += " ");
          break;
        default:
          d2 += "/";
      }
      break;
    case 123 * f:
      s[l++] = h(d2) * v;
    case 125 * f:
    case 59:
    case 0:
      switch (u) {
        case 0:
        case 125:
          C = 0;
        case 59 + y:
          v == -1 && (d2 = Z(d2, /\f/g, "")), A > 0 && (h(d2) - p || f === 0 && b === 47) && N(A > 32 ? he(d2 + ";", i, a, p - 1, c) : he(Z(d2, " ", "") + ";", i, a, p - 2, c), c);
          break;
        case 59:
          d2 += ";";
        default:
          if (N(E = xe(d2, e, a, l, y, o, s, S, k = [], T = [], p, n), n), u === 123) if (y === 0) pt2(d2, e, E, E, k, n, p, s, T);
          else {
            switch (x) {
              case 99:
                if (O(d2, 3) === 110) break;
              case 108:
                if (O(d2, 2) === 97) break;
              default:
                y = 0;
              case 100:
              case 109:
              case 115:
            }
            y ? pt2(t, E, E, i && N(xe(t, E, E, 0, 0, o, s, S, o, k = [], p, T), T), o, T, p, s, i ? k : T) : pt2(d2, E, E, E, [""], T, 0, s, T);
          }
      }
      l = y = A = 0, f = v = 1, S = d2 = "", p = m2;
      break;
    case 58:
      p = 1 + h(d2), A = b;
    default:
      if (f < 1) {
        if (u == 123) --f;
        else if (u == 125 && f++ == 0 && de() == 125) continue;
      }
      switch (d2 += Q(u), u * f) {
        case 38:
          v = y > 0 ? 1 : (d2 += "\f", -1);
          break;
        case 44:
          s[l++] = (h(d2) - 1) * v, v = 1;
          break;
        case 64:
          j() === 45 && (d2 += mt(L())), x = j(), y = p = h(S = d2 += ye(J())), u++;
          break;
        case 45:
          b === 45 && h(d2) == 2 && (f = 0);
      }
  }
  return n;
}
m(pt2, "parse");
function xe(t, e, a, i, o, n, m2, s, c, l, y, p) {
  for (var x = o - 1, A = o === 0 ? n : [""], b = ce(A), f = 0, C = 0, v = 0; f < i; ++f) for (var u = 0, S = P(t, x + 1, x = Et(C = m2[f])), k = t; u < b; ++u) (k = ot(C > 0 ? A[u] + " " + S : Z(S, /&\f/g, A[u]))) && (c[v++] = k);
  return st(t, e, a, o === 0 ? at : s, c, l, y, p);
}
m(xe, "ruleset");
function bi(t, e, a, i) {
  return st(t, e, a, et2, Q(pe()), P(t, 2, -2), 0, i);
}
m(bi, "comment");
function he(t, e, a, i, o) {
  return st(t, e, a, it, P(t, 0, i), P(t, i + 1, -1), i, o);
}
m(he, "declaration");
function dt(t, e) {
  for (var a = "", i = 0; i < t.length; i++) a += e(t[i], i, t, e) || "";
  return a;
}
m(dt, "serialize");
function we(t, e, a, i) {
  switch (t.type) {
    case ne:
      if (t.children.length) break;
    case ae:
    case ie:
    case it:
      return t.return = t.return || t.value;
    case et2:
      return "";
    case oe:
      return t.return = t.value + "{" + dt(t.children, i) + "}";
    case at:
      if (!h(t.value = t.props.join(","))) return "";
  }
  return h(a = dt(t.children, i)) ? t.return = t.value + "{" + a + "}" : "";
}
m(we, "stringify");
var vi = "graphics-document document";
function Le(t, e) {
  t.attr("role", vi), e !== "" && t.attr("aria-roledescription", e);
}
m(Le, "setA11yDiagramInfo");
function be(t, e, a, i) {
  if (t.insert !== void 0) {
    if (a) {
      let o = `chart-desc-${i}`;
      t.attr("aria-describedby", o), t.insert("desc", ":first-child").attr("id", o).text(a);
    }
    if (e) {
      let o = `chart-title-${i}`;
      t.attr("aria-labelledby", o), t.insert("title", ":first-child").attr("id", o).text(e);
    }
  }
}
m(be, "addSVGa11yTitleDescription");
var _a2;
var B = (_a2 = class {
  constructor(e, a, i, o, n) {
    this.type = e;
    this.text = a;
    this.db = i;
    this.parser = o;
    this.renderer = n;
  }
  static async fromText(e, a = {}) {
    var _a3, _b;
    let i = Ot(), o = Ts(e, i);
    e = Xt(e) + `
`;
    try {
      In(o);
    } catch {
      let l = Bs(o);
      if (!l) throw new Vt(`Diagram ${o} not found.`);
      let { id: y, diagram: p } = await l();
      On(y, p);
    }
    let { db: n, parser: m2, renderer: s, init: c } = In(o);
    return m2.parser && (m2.parser.yy = n), (_a3 = n.clear) == null ? void 0 : _a3.call(n), c == null ? void 0 : c(i), a.title && ((_b = n.setDiagramTitle) == null ? void 0 : _b.call(n, a.title)), await m2.parse(e), new _a2(o, e, n, m2, s);
  }
  async render(e, a) {
    await this.renderer.draw(this.text, e, a, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, m(_a2, "Diagram"), _a2);
var ve = [];
var Se = m(() => {
  ve.forEach((t) => {
    t();
  }), ve = [];
}, "attachFunctions");
var Me = m((t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function Ae(t) {
  let e = t.match(vr);
  if (!e) return { text: t, metadata: {} };
  let a = Ar(e[1], { schema: gr }) ?? {};
  a = typeof a == "object" && !Array.isArray(a) ? a : {};
  let i = {};
  return a.displayMode && (i.displayMode = a.displayMode.toString()), a.title && (i.title = a.title.toString()), a.config && (i.config = a.config), { text: t.slice(e[0].length), metadata: i };
}
m(Ae, "extractFrontMatter");
var Mi = m((t) => t.replace(/\r\n?/g, `
`).replace(/<(\w+)([^>]*)>/g, (e, a, i) => "<" + a + i.replace(/="([^"]*)"/g, "='$1'") + ">"), "cleanupText");
var Ai = m((t) => {
  let { text: e, metadata: a } = Ae(t), { displayMode: i, title: o, config: n = {} } = a;
  return i && (n.gantt || (n.gantt = {}), n.gantt.displayMode = i), { title: o, config: n, text: e };
}, "processFrontmatter");
var Ti = m((t) => {
  let e = Ut.detectInit(t) ?? {}, a = Ut.detectDirective(t, "wrap");
  return Array.isArray(a) ? e.wrap = a.some(({ type: i }) => i === "wrap") : (a == null ? void 0 : a.type) === "wrap" && (e.wrap = true), { text: zt(t), directive: e };
}, "processDirectives");
function Lt2(t) {
  let e = Mi(t), a = Ai(e), i = Ti(a.text), o = Lt(a.config, i.directive);
  return t = Me(i.text), { code: t, title: a.title, config: o };
}
m(Lt2, "preprocessDiagram");
function Te(t) {
  let e = new TextEncoder().encode(t), a = Array.from(e, (i) => String.fromCodePoint(i)).join("");
  return btoa(a);
}
m(Te, "toBase64");
var Ci = 5e4;
var ki = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var Ri = "sandbox";
var ji = "loose";
var Ii = "http://www.w3.org/2000/svg";
var Oi = "http://www.w3.org/1999/xlink";
var Pi = "http://www.w3.org/1999/xhtml";
var Fi = "100%";
var _i = "100%";
var Vi = "border:0;margin:0;";
var Gi = "margin:0";
var zi = "allow-top-navigation-by-user-activation allow-popups";
var $i = 'The "iframe" tag is not supported by your browser.';
var Ni = ["foreignobject"];
var Hi2 = ["dominant-baseline"];
function je(t) {
  let e = Lt2(t);
  return rn(), tn(e.config ?? {}), e;
}
m(je, "processAndSetConfigs");
async function Ui(t, e) {
  $();
  try {
    let { code: a, config: i } = je(t);
    return { diagramType: (await Ie(a)).type, config: i };
  } catch (a) {
    if (e == null ? void 0 : e.suppressErrors) return false;
    throw a;
  }
}
m(Ui, "parse");
var Ce2 = m((t, e, a = []) => `
.${t} ${e} { ${a.join(" !important; ")} !important; }`, "cssImportantStyles");
var qi = m((t, e = /* @__PURE__ */ new Map()) => {
  let a = "";
  if (t.themeCSS !== void 0 && (a += `
${t.themeCSS}`), t.fontFamily !== void 0 && (a += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (a += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), e instanceof Map) {
    let m2 = no(t) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    e.forEach((s) => {
      Cr(s.styles) || m2.forEach((c) => {
        a += Ce2(s.id, c, s.styles);
      }), Cr(s.textStyles) || (a += Ce2(s.id, "tspan", ((s == null ? void 0 : s.textStyles) || []).map((c) => c.replace("color", "fill"))));
    });
  }
  return a;
}, "createCssStyles");
var Bi = m((t, e, a, i) => {
  let o = qi(t, a), n = fn(e, o, { ...t.themeVariables, theme: t.theme, look: t.look }, i);
  return dt(Ee(`${i}{${n}}`), we);
}, "createUserStyles");
var Yi = m((t = "", e, a) => {
  let i = t;
  return !a && !e && (i = i.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, 'marker-end="url(#')), i = Yt2(i), i = i.replace(/<br>/g, "<br/>"), i;
}, "cleanUpSvgCode");
var Xi = m((t = "", e) => {
  var _a3, _b;
  let a = ((_b = (_a3 = e == null ? void 0 : e.viewBox) == null ? void 0 : _a3.baseVal) == null ? void 0 : _b.height) ? e.viewBox.baseVal.height + "px" : _i, i = Te(`<body style="${Gi}">${t}</body>`);
  return `<iframe style="width:${Fi};height:${a};${Vi}" src="data:text/html;charset=UTF-8;base64,${i}" sandbox="${zi}">
  ${$i}
</iframe>`;
}, "putIntoIFrame");
var ke = m((t, e, a, i, o) => {
  let n = t.append("div");
  n.attr("id", a), i && n.attr("style", i);
  let m2 = n.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", Ii);
  return o && m2.attr("xmlns:xlink", o), m2.append("g"), t;
}, "appendDivSvgG");
function Re(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
m(Re, "sandboxedIframe");
var Wi = m((t, e, a, i) => {
  var _a3, _b, _c;
  (_a3 = t.getElementById(e)) == null ? void 0 : _a3.remove(), (_b = t.getElementById(a)) == null ? void 0 : _b.remove(), (_c = t.getElementById(i)) == null ? void 0 : _c.remove();
}, "removeExistingElements");
var Ki = m(async function(t, e, a) {
  var _a3, _b, _c, _d, _e2, _f;
  $();
  let i = je(e);
  e = i.code;
  let o = Ot();
  pt.debug(o), e.length > ((o == null ? void 0 : o.maxTextSize) ?? Ci) && (e = ki);
  let n = "#" + t, m2 = "i" + t, s = "#" + m2, c = "d" + t, l = "#" + c, y = m(() => {
    let gt = ia(x ? s : l).node();
    gt && "remove" in gt && gt.remove();
  }, "removeTempElements"), p = ia("body"), x = o.securityLevel === Ri, A = o.securityLevel === ji, b = o.fontFamily;
  if (a !== void 0) {
    if (a && (a.innerHTML = ""), x) {
      let M = Re(ia(a), m2);
      p = ia(M.nodes()[0].contentDocument.body), p.node().style.margin = 0;
    } else p = ia(a);
    ke(p, t, c, `font-family: ${b}`, Oi);
  } else {
    if (Wi(document, t, c, m2), x) {
      let M = Re(ia("body"), m2);
      p = ia(M.nodes()[0].contentDocument.body), p.node().style.margin = 0;
    } else p = ia("body");
    ke(p, t, c);
  }
  let f, C;
  try {
    f = await B.fromText(e, { title: i.title });
  } catch (M) {
    if (o.suppressErrorRendering) throw y(), M;
    f = await B.fromText("error"), C = M;
  }
  let v = p.select(l).node(), u = f.type, S = v.firstChild, k = S.firstChild, T = (_b = (_a3 = f.renderer).getClasses) == null ? void 0 : _b.call(_a3, e, f), E = Bi(o, u, T, n), d2 = document.createElement("style");
  d2.innerHTML = E, S.insertBefore(d2, k);
  try {
    await f.renderer.draw(e, t, "11.14.0", f);
  } catch (M) {
    throw o.suppressErrorRendering ? y() : Sr.draw(e, t, "11.14.0"), M;
  }
  let Ge = p.select(`${l} svg`), ze = (_d = (_c = f.db).getAccTitle) == null ? void 0 : _d.call(_c), $e = (_f = (_e2 = f.db).getAccDescription) == null ? void 0 : _f.call(_e2);
  Zi(u, Ge, ze, $e), p.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Pi);
  let _ = p.select(l).node().innerHTML;
  if (pt.debug("config.arrowMarkerAbsolute", o.arrowMarkerAbsolute), _ = Yi(_, x, Hi(o.arrowMarkerAbsolute)), x) {
    let M = p.select(l + " svg").node();
    _ = Xi(_, M);
  } else A || (_ = Bt.sanitize(_, { ADD_TAGS: Ni, ADD_ATTR: Hi2, HTML_INTEGRATION_POINTS: { foreignobject: true } }));
  if (Se(), C) throw C;
  return y(), { diagramType: u, svg: _, bindFunctions: f.db.bindFunctions };
}, "render");
function Qi(t = {}) {
  var _a3;
  let e = w({}, t);
  (e == null ? void 0 : e.fontFamily) && !((_a3 = e.themeVariables) == null ? void 0 : _a3.fontFamily) && (e.themeVariables || (e.themeVariables = {}), e.themeVariables.fontFamily = e.fontFamily), Zh(e), (e == null ? void 0 : e.theme) && e.theme in et ? e.themeVariables = et[e.theme].getThemeVariables(e.themeVariables) : e && (e.themeVariables = et.default.getThemeVariables(e.themeVariables));
  let a = typeof e == "object" ? me(e) : Qh();
  Wh(a.logLevel), $();
}
m(Qi, "initialize");
var Ie = m((t, e = {}) => {
  let { code: a } = Lt2(t);
  return B.fromText(a, e);
}, "getDiagramFromText");
function Zi(t, e, a, i) {
  Le(e, t), be(e, a, i, e.attr("id"));
}
m(Zi, "addA11yInfo");
var F = Object.freeze({ render: Ki, parse: Ui, getDiagramFromText: Ie, initialize: Qi, getConfig: Ot, setConfig: so, getSiteConfig: Qh, updateSiteConfig: Jh, reset: m(() => {
  rn();
}, "reset"), globalReset: m(() => {
  rn(Mt);
}, "globalReset"), defaultConfig: Mt });
Wh(Ot().logLevel);
rn(Ot());
var Ji = m((t, e, a) => {
  pt.warn(t), It(t) ? (a && a(t.str, t.hash), e.push({ ...t, message: t.str, error: t })) : (a && a(t), t instanceof Error && e.push({ str: t.message, message: t.message, hash: t.name, error: t }));
}, "handleError");
var Oe = m(async function(t = { querySelector: ".mermaid" }) {
  try {
    await to(t);
  } catch (e) {
    if (It(e) && pt.error(e.str), I.parseError && I.parseError(e), !t.suppressErrors) throw pt.error("Use the suppressErrors option to suppress these errors"), e;
  }
}, "run");
var to = m(async function({ postRenderCallback: t, querySelector: e, nodes: a } = { querySelector: ".mermaid" }) {
  let i = F.getConfig();
  pt.debug(`${t ? "" : "No "}Callback function found`);
  let o;
  if (a) o = a;
  else if (e) o = document.querySelectorAll(e);
  else throw new Error("Nodes and querySelector are both undefined");
  pt.debug(`Found ${o.length} diagrams`), (i == null ? void 0 : i.startOnLoad) !== void 0 && (pt.debug("Start On Load: " + (i == null ? void 0 : i.startOnLoad)), F.updateSiteConfig({ startOnLoad: i == null ? void 0 : i.startOnLoad }));
  let n = new Ut.InitIDGenerator(i.deterministicIds, i.deterministicIDSeed), m2, s = [];
  for (let c of Array.from(o)) {
    pt.info("Rendering diagram: " + c.id);
    if (c.getAttribute("data-processed")) continue;
    c.setAttribute("data-processed", "true");
    let l = `mermaid-${n.next()}`;
    m2 = c.innerHTML, m2 = Ce(Ut.entityDecode(m2)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    let y = Ut.detectInit(m2);
    y && pt.debug("Detected early reinit: ", y);
    try {
      let { svg: p, bindFunctions: x } = await Ve(l, m2, c);
      c.innerHTML = p, t && await t(l), x && x(c);
    } catch (p) {
      Ji(p, s, I.parseError);
    }
  }
  if (s.length > 0) throw s[0];
}, "runThrowsErrors");
var Pe = m(function(t) {
  F.initialize(t);
}, "initialize");
var ro = m(async function(t, e, a) {
  pt.warn("mermaid.init is deprecated. Please use run instead."), t && Pe(t);
  let i = { postRenderCallback: a, querySelector: ".mermaid" };
  typeof e == "string" ? i.querySelector = e : e && (e instanceof HTMLElement ? i.nodes = [e] : i.nodes = e), await Oe(i);
}, "init");
var eo = m(async (t, { lazyLoad: e = true } = {}) => {
  $(), ks(...t), e === false && await ee();
}, "registerExternalDiagrams");
var Fe = m(function() {
  if (I.startOnLoad) {
    let { startOnLoad: t } = F.getConfig();
    t && I.run().catch((e) => pt.error("Mermaid failed to initialize", e));
  }
}, "contentLoaded");
if (typeof document < "u") {
  window.addEventListener("load", Fe, false);
}
var ao = m(function(t) {
  I.parseError = t;
}, "setParseErrorHandler");
var ft = [];
var bt = false;
var _e = m(async () => {
  if (!bt) {
    for (bt = true; ft.length > 0; ) {
      let t = ft.shift();
      if (t) try {
        await t();
      } catch (e) {
        pt.error("Error executing queue", e);
      }
    }
    bt = false;
  }
}, "executeQueue");
var io = m(async (t, e) => new Promise((a, i) => {
  let o = m(() => new Promise((n, m2) => {
    F.parse(t, e).then((s) => {
      n(s), a(s);
    }, (s) => {
      var _a3;
      pt.error("Error parsing", s), (_a3 = I.parseError) == null ? void 0 : _a3.call(I, s), m2(s), i(s);
    });
  }), "performCall");
  ft.push(o), _e().catch(i);
}), "parse");
var Ve = m((t, e, a) => new Promise((i, o) => {
  let n = m(() => new Promise((m2, s) => {
    F.render(t, e, a).then((c) => {
      m2(c), i(c);
    }, (c) => {
      var _a3;
      pt.error("Error parsing", c), (_a3 = I.parseError) == null ? void 0 : _a3.call(I, c), s(c), o(c);
    });
  }), "performCall");
  ft.push(n), _e().catch(o);
}), "render");
var oo = m(() => Object.keys(Yt).map((t) => ({ id: t })), "getRegisteredDiagramsMetadata");
var I = { startOnLoad: true, mermaidAPI: F, parse: io, render: Ve, init: ro, run: Oe, registerExternalDiagrams: eo, registerLayoutLoaders: H, initialize: Pe, parseError: void 0, contentLoaded: Fe, setParseErrorHandler: ao, detectType: Ts, registerIconPacks: Qn, getRegisteredDiagramsMetadata: oo };
var Sc = I;
export {
  Sc as default
};
/*! Bundled license information:

mermaid/dist/mermaid.esm.min.mjs:
  (*! Check if previously processed *)
  (*!
   * Wait for document loaded before starting the execution
   *)
*/
//# sourceMappingURL=mermaid_dist_mermaid__esm__min__mjs.js.map

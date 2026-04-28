import {
  m as m2
} from "./chunk-NVNIWB3X.js";
import {
  Df,
  Ji,
  Jm,
  Jr,
  Ki,
  Nf,
  Om,
  Qr,
  Rn,
  Ti,
  Tn,
  Xr,
  Zi,
  Zr,
  bn,
  dn,
  fm,
  fn,
  gp,
  hi,
  lp,
  np,
  sn,
  tp,
  ym
} from "./chunk-3DBRZS4A.js";
import {
  Mt,
  N,
  qs
} from "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-3YCYZ6SJ.mjs
function g(r, e, n, t) {
  var o;
  do
    o = lp(t);
  while (r.hasNode(o));
  return n.dummy = e, r.setNode(o, n), o;
}
m(g, "addDummyNode");
function xr(r) {
  var e = new m2().setGraph(r.graph());
  return Zr(r.nodes(), function(n) {
    e.setNode(n, r.node(n));
  }), Zr(r.edges(), function(n) {
    var t = e.edge(n.v, n.w) || { weight: 0, minlen: 1 }, o = r.edge(n);
    e.setEdge(n.v, n.w, { weight: t.weight + o.weight, minlen: Math.max(t.minlen, o.minlen) });
  }), e;
}
m(xr, "simplify");
function X(r) {
  var e = new m2({ multigraph: r.isMultigraph() }).setGraph(r.graph());
  return Zr(r.nodes(), function(n) {
    r.children(n).length || e.setNode(n, r.node(n));
  }), Zr(r.edges(), function(n) {
    e.setEdge(n, r.edge(n));
  }), e;
}
m(X, "asNonCompoundGraph");
function $(r, e) {
  var n = r.x, t = r.y, o = e.x - n, a = e.y - t, i = r.width / 2, f = r.height / 2;
  if (!o && !a) throw new Error("Not possible to find intersection inside of the rectangle");
  var d, c;
  return Math.abs(a) * i > Math.abs(o) * f ? (a < 0 && (f = -f), d = f * o / a, c = f) : (o < 0 && (i = -i), d = i, c = i * a / o), { x: n + d, y: t + c };
}
m($, "intersectRect");
function C(r) {
  var e = Jr(Jm(er(r) + 1), function() {
    return [];
  });
  return Zr(r.nodes(), function(n) {
    var t = r.node(n), o = t.rank;
    sn(o) || (e[o][t.order] = n);
  }), e;
}
m(C, "buildLayerMatrix");
function kr(r) {
  var e = ym(Jr(r.nodes(), function(n) {
    return r.node(n).rank;
  }));
  Zr(r.nodes(), function(n) {
    var t = r.node(n);
    fm(t, "rank") && (t.rank -= e);
  });
}
m(kr, "normalizeRanks");
function gr(r) {
  var e = ym(Jr(r.nodes(), function(a) {
    return r.node(a).rank;
  })), n = [];
  Zr(r.nodes(), function(a) {
    var i = r.node(a).rank - e;
    n[i] || (n[i] = []), n[i].push(a);
  });
  var t = 0, o = r.graph().nodeRankFactor;
  Zr(n, function(a, i) {
    sn(a) && i % o !== 0 ? --t : t && Zr(a, function(f) {
      r.node(f).rank += t;
    });
  });
}
m(gr, "removeEmptyRanks");
function rr(r, e, n, t) {
  var o = { width: 0, height: 0 };
  return arguments.length >= 4 && (o.rank = n, o.order = t), g(r, "border", o, e);
}
m(rr, "addBorderNode");
function er(r) {
  return bn(Jr(r.nodes(), function(e) {
    var n = r.node(e).rank;
    if (!sn(n)) return n;
  }));
}
m(er, "maxRank");
function Nr(r, e) {
  var n = { lhs: [], rhs: [] };
  return Zr(r, function(t) {
    e(t) ? n.lhs.push(t) : n.rhs.push(t);
  }), n;
}
m(Nr, "partition");
function Or(r, e) {
  var n = Ti();
  try {
    return e();
  } finally {
    console.log(r + " time: " + (Ti() - n) + "ms");
  }
}
m(Or, "time");
function Ir(r, e) {
  return e();
}
m(Ir, "notime");
function Lr(r) {
  function e(n) {
    var t = r.children(n), o = r.node(n);
    if (t.length && Zr(t, e), Object.prototype.hasOwnProperty.call(o, "minRank")) {
      o.borderLeft = [], o.borderRight = [];
      for (var a = o.minRank, i = o.maxRank + 1; a < i; ++a) Pr(r, "borderLeft", "_bl", n, o, a), Pr(r, "borderRight", "_br", n, o, a);
    }
  }
  m(e, "dfs"), Zr(r.children(), e);
}
m(Lr, "addBorderSegments");
function Pr(r, e, n, t, o, a) {
  var i = { width: 0, height: 0, rank: a, borderType: e }, f = o[e][a - 1], d = g(r, "border", i, n);
  o[e][a] = d, r.setParent(d, t), f && r.setEdge(f, d, { weight: 1 });
}
m(Pr, "addBorderNode");
function jr(r) {
  var e = r.graph().rankdir.toLowerCase();
  (e === "lr" || e === "rl") && Rr(r);
}
m(jr, "adjust");
function Tr(r) {
  var e = r.graph().rankdir.toLowerCase();
  (e === "bt" || e === "rl") && pe(r), (e === "lr" || e === "rl") && (me(r), Rr(r));
}
m(Tr, "undo");
function Rr(r) {
  Zr(r.nodes(), function(e) {
    Cr(r.node(e));
  }), Zr(r.edges(), function(e) {
    Cr(r.edge(e));
  });
}
m(Rr, "swapWidthHeight");
function Cr(r) {
  var e = r.width;
  r.width = r.height, r.height = e;
}
m(Cr, "swapWidthHeightOne");
function pe(r) {
  Zr(r.nodes(), function(e) {
    nr(r.node(e));
  }), Zr(r.edges(), function(e) {
    var n = r.edge(e);
    Zr(n.points, nr), Object.prototype.hasOwnProperty.call(n, "y") && nr(n);
  });
}
m(pe, "reverseY");
function nr(r) {
  r.y = -r.y;
}
m(nr, "reverseYOne");
function me(r) {
  Zr(r.nodes(), function(e) {
    tr(r.node(e));
  }), Zr(r.edges(), function(e) {
    var n = r.edge(e);
    Zr(n.points, tr), Object.prototype.hasOwnProperty.call(n, "x") && tr(n);
  });
}
m(me, "swapXY");
function tr(r) {
  var e = r.x;
  r.x = r.y, r.y = e;
}
m(tr, "swapXYOne");
var _a;
var H = (_a = class {
  constructor() {
    var e = {};
    e._next = e._prev = e, this._sentinel = e;
  }
  dequeue() {
    var e = this._sentinel, n = e._prev;
    if (n !== e) return Sr(n), n;
  }
  enqueue(e) {
    var n = this._sentinel;
    e._prev && e._next && Sr(e), e._next = n._next, n._next._prev = e, n._next = e, e._prev = n;
  }
  toString() {
    for (var e = [], n = this._sentinel, t = n._prev; t !== n; ) e.push(JSON.stringify(t, _e)), t = t._prev;
    return "[" + e.join(", ") + "]";
  }
}, m(_a, "List"), _a);
function Sr(r) {
  r._prev._next = r._next, r._next._prev = r._prev, delete r._next, delete r._prev;
}
m(Sr, "unlink");
function _e(r, e) {
  if (r !== "_next" && r !== "_prev") return e;
}
m(_e, "filterOutLinks");
var we = Mt(1);
function Mr(r, e) {
  if (r.nodeCount() <= 1) return [];
  var n = Ee(r, e || we), t = be(n.graph, n.buckets, n.zeroIdx);
  return Qr(Jr(t, function(o) {
    return r.outEdges(o.v, o.w);
  }));
}
m(Mr, "greedyFAS");
function be(r, e, n) {
  for (var t = [], o = e[e.length - 1], a = e[0], i; r.nodeCount(); ) {
    for (; i = a.dequeue(); ) or(r, e, n, i);
    for (; i = o.dequeue(); ) or(r, e, n, i);
    if (r.nodeCount()) {
      for (var f = e.length - 2; f > 0; --f) if (i = e[f].dequeue(), i) {
        t = t.concat(or(r, e, n, i, true));
        break;
      }
    }
  }
  return t;
}
m(be, "doGreedyFAS");
function or(r, e, n, t, o) {
  var a = o ? [] : void 0;
  return Zr(r.inEdges(t.v), function(i) {
    var f = r.edge(i), d = r.node(i.v);
    o && a.push({ v: i.v, w: i.w }), d.out -= f, ar(e, n, d);
  }), Zr(r.outEdges(t.v), function(i) {
    var f = r.edge(i), d = i.w, c = r.node(d);
    c.in -= f, ar(e, n, c);
  }), r.removeNode(t.v), a;
}
m(or, "removeNode");
function Ee(r, e) {
  var n = new m2(), t = 0, o = 0;
  Zr(r.nodes(), function(f) {
    n.setNode(f, { v: f, in: 0, out: 0 });
  }), Zr(r.edges(), function(f) {
    var d = n.edge(f.v, f.w) || 0, c = e(f), h = d + c;
    n.setEdge(f.v, f.w, h), o = Math.max(o, n.node(f.v).out += c), t = Math.max(t, n.node(f.w).in += c);
  });
  var a = Jm(o + t + 3).map(function() {
    return new H();
  }), i = t + 1;
  return Zr(n.nodes(), function(f) {
    ar(a, i, n.node(f));
  }), { graph: n, buckets: a, zeroIdx: i };
}
m(Ee, "buildState");
function ar(r, e, n) {
  n.out ? n.in ? r[n.out - n.in + e].enqueue(n) : r[r.length - 1].enqueue(n) : r[0].enqueue(n);
}
m(ar, "assignBucket");
function Fr(r) {
  var e = r.graph().acyclicer === "greedy" ? Mr(r, n(r)) : ye(r);
  Zr(e, function(t) {
    var o = r.edge(t);
    r.removeEdge(t), o.forwardName = t.name, o.reversed = true, r.setEdge(t.w, t.v, o, lp("rev"));
  });
  function n(t) {
    return function(o) {
      return t.edge(o).weight;
    };
  }
  m(n, "weightFn");
}
m(Fr, "run");
function ye(r) {
  var e = [], n = {}, t = {};
  function o(a) {
    Object.prototype.hasOwnProperty.call(t, a) || (t[a] = true, n[a] = true, Zr(r.outEdges(a), function(i) {
      Object.prototype.hasOwnProperty.call(n, i.w) ? e.push(i) : o(i.w);
    }), delete n[a]);
  }
  return m(o, "dfs"), Zr(r.nodes(), o), e;
}
m(ye, "dfsFAS");
function Gr(r) {
  Zr(r.edges(), function(e) {
    var n = r.edge(e);
    if (n.reversed) {
      r.removeEdge(e);
      var t = n.forwardName;
      delete n.reversed, delete n.forwardName, r.setEdge(e.w, e.v, n, t);
    }
  });
}
m(Gr, "undo");
function Br(r) {
  r.graph().dummyChains = [], Zr(r.edges(), function(e) {
    xe(r, e);
  });
}
m(Br, "run");
function xe(r, e) {
  var n = e.v, t = r.node(n).rank, o = e.w, a = r.node(o).rank, i = e.name, f = r.edge(e), d = f.labelRank;
  if (a !== t + 1) {
    r.removeEdge(e);
    var c = void 0, h, l;
    for (l = 0, ++t; t < a; ++l, ++t) f.points = [], c = { width: 0, height: 0, edgeLabel: f, edgeObj: e, rank: t }, h = g(r, "edge", c, "_d"), t === d && (c.width = f.width, c.height = f.height, c.dummy = "edge-label", c.labelpos = f.labelpos), r.setEdge(n, h, { weight: f.weight }, i), l === 0 && r.graph().dummyChains.push(h), n = h;
    r.setEdge(n, o, { weight: f.weight }, i);
  }
}
m(xe, "normalizeEdge");
function Ar(r) {
  Zr(r.graph().dummyChains, function(e) {
    var n = r.node(e), t = n.edgeLabel, o;
    for (r.setEdge(n.edgeObj, t); n.dummy; ) o = r.successors(e)[0], r.removeNode(e), t.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (t.x = n.x, t.y = n.y, t.width = n.width, t.height = n.height), e = o, n = r.node(e);
  });
}
m(Ar, "undo");
function U(r) {
  var e = {};
  function n(t) {
    var o = r.node(t);
    if (Object.prototype.hasOwnProperty.call(e, t)) return o.rank;
    e[t] = true;
    var a = ym(Jr(r.outEdges(t), function(i) {
      return n(i.w) - r.edge(i).minlen;
    }));
    return (a === Number.POSITIVE_INFINITY || a === void 0 || a === null) && (a = 0), o.rank = a;
  }
  m(n, "dfs"), Zr(r.sources(), n);
}
m(U, "longestPath");
function M(r, e) {
  return r.node(e.w).rank - r.node(e.v).rank - r.edge(e).minlen;
}
m(M, "slack");
function J(r) {
  var e = new m2({ directed: false }), n = r.nodes()[0], t = r.nodeCount();
  e.setNode(n, {});
  for (var o, a; ke(e, r) < t; ) o = ge(e, r), a = e.hasNode(o.v) ? M(r, o) : -M(r, o), Ne(e, r, a);
  return e;
}
m(J, "feasibleTree");
function ke(r, e) {
  function n(t) {
    Zr(e.nodeEdges(t), function(o) {
      var a = o.v, i = t === a ? o.w : a;
      !r.hasNode(i) && !M(e, o) && (r.setNode(i, {}), r.setEdge(t, i, {}), n(i));
    });
  }
  return m(n, "dfs"), Zr(r.nodes(), n), r.nodeCount();
}
m(ke, "tightTree");
function ge(r, e) {
  return Om(e.edges(), function(n) {
    if (r.hasNode(n.v) !== r.hasNode(n.w)) return M(e, n);
  });
}
m(ge, "findMinSlackEdge");
function Ne(r, e, n) {
  Zr(r.nodes(), function(t) {
    e.node(t).rank += n;
  });
}
m(Ne, "shiftRanks");
var tt = Mt(1);
var pt = Mt(1);
ir.CycleException = W;
function ir(r) {
  var e = {}, n = {}, t = [];
  function o(a) {
    if (Object.prototype.hasOwnProperty.call(n, a)) throw new W();
    Object.prototype.hasOwnProperty.call(e, a) || (n[a] = true, e[a] = true, Zr(r.predecessors(a), o), delete n[a], t.push(a));
  }
  if (m(o, "visit"), Zr(r.sinks(), o), tp(e) !== r.nodeCount()) throw new W();
  return t;
}
m(ir, "topsort");
function W() {
}
m(W, "CycleException");
W.prototype = new Error();
function K(r, e, n) {
  N(e) || (e = [e]);
  var t = (r.isDirected() ? r.successors : r.neighbors).bind(r), o = [], a = {};
  return Zr(e, function(i) {
    if (!r.hasNode(i)) throw new Error("Graph does not have node: " + i);
    Yr(r, i, n === "post", a, t, o);
  }), o;
}
m(K, "dfs");
function Yr(r, e, n, t, o, a) {
  Object.prototype.hasOwnProperty.call(t, e) || (t[e] = true, n || a.push(e), Zr(o(e), function(i) {
    Yr(r, i, n, t, o, a);
  }), n && a.push(e));
}
m(Yr, "doDfs");
function sr(r, e) {
  return K(r, e, "post");
}
m(sr, "postorder");
function fr(r, e) {
  return K(r, e, "pre");
}
m(fr, "preorder");
T.initLowLimValues = dr;
T.initCutValues = ur;
T.calcCutValue = Ur;
T.leaveEdge = qr;
T.enterEdge = Xr2;
T.exchangeEdges = Hr;
function T(r) {
  r = xr(r), U(r);
  var e = J(r);
  dr(e), ur(e, r);
  for (var n, t; n = qr(e); ) t = Xr2(e, r, n), Hr(e, r, n, t);
}
m(T, "networkSimplex");
function ur(r, e) {
  var n = sr(r, r.nodes());
  n = n.slice(0, n.length - 1), Zr(n, function(t) {
    Ce(r, e, t);
  });
}
m(ur, "initCutValues");
function Ce(r, e, n) {
  var t = r.node(n), o = t.parent;
  r.edge(n, o).cutvalue = Ur(r, e, n);
}
m(Ce, "assignCutValue");
function Ur(r, e, n) {
  var t = r.node(n), o = t.parent, a = true, i = e.edge(n, o), f = 0;
  return i || (a = false, i = e.edge(o, n)), f = i.weight, Zr(e.nodeEdges(n), function(d) {
    var c = d.v === n, h = c ? d.w : d.v;
    if (h !== o) {
      var l = c === a, p = e.edge(d).weight;
      if (f += l ? p : -p, Te(r, n, h)) {
        var m3 = r.edge(n, h).cutvalue;
        f += l ? -m3 : m3;
      }
    }
  }), f;
}
m(Ur, "calcCutValue");
function dr(r, e) {
  arguments.length < 2 && (e = r.nodes()[0]), Wr(r, {}, 1, e);
}
m(dr, "initLowLimValues");
function Wr(r, e, n, t, o) {
  var a = n, i = r.node(t);
  return e[t] = true, Zr(r.neighbors(t), function(f) {
    Object.prototype.hasOwnProperty.call(e, f) || (n = Wr(r, e, n, f, t));
  }), i.low = a, i.lim = n++, o ? i.parent = o : delete i.parent, n;
}
m(Wr, "dfsAssignLowLim");
function qr(r) {
  return Ki(r.edges(), function(e) {
    return r.edge(e).cutvalue < 0;
  });
}
m(qr, "leaveEdge");
function Xr2(r, e, n) {
  var t = n.v, o = n.w;
  e.hasEdge(t, o) || (t = n.w, o = n.v);
  var a = r.node(t), i = r.node(o), f = a, d = false;
  a.lim > i.lim && (f = i, d = true);
  var c = fn(e.edges(), function(h) {
    return d === zr(r, r.node(h.v), f) && d !== zr(r, r.node(h.w), f);
  });
  return Om(c, function(h) {
    return M(e, h);
  });
}
m(Xr2, "enterEdge");
function Hr(r, e, n, t) {
  var o = n.v, a = n.w;
  r.removeEdge(o, a), r.setEdge(t.v, t.w, {}), dr(r), ur(r, e), je(r, e);
}
m(Hr, "exchangeEdges");
function je(r, e) {
  var n = Ki(r.nodes(), function(o) {
    return !e.node(o).parent;
  }), t = fr(r, n);
  t = t.slice(1), Zr(t, function(o) {
    var a = r.node(o).parent, i = e.edge(o, a), f = false;
    i || (i = e.edge(a, o), f = true), e.node(o).rank = e.node(a).rank + (f ? i.minlen : -i.minlen);
  });
}
m(je, "updateRanks");
function Te(r, e, n) {
  return r.hasEdge(e, n);
}
m(Te, "isTreeEdge");
function zr(r, e, n) {
  return n.low <= e.lim && e.lim <= n.lim;
}
m(zr, "isDescendant");
function cr(r) {
  switch (r.graph().ranker) {
    case "network-simplex":
      Jr2(r);
      break;
    case "tight-tree":
      Se(r);
      break;
    case "longest-path":
      Re(r);
      break;
    default:
      Jr2(r);
  }
}
m(cr, "rank");
var Re = U;
function Se(r) {
  U(r), J(r);
}
m(Se, "tightTreeRanker");
function Jr2(r) {
  T(r);
}
m(Jr2, "networkSimplexRanker");
function Kr(r) {
  var e = g(r, "root", {}, "_root"), n = Me(r), t = bn(Xr(n)) - 1, o = 2 * t + 1;
  r.graph().nestingRoot = e, Zr(r.edges(), function(i) {
    r.edge(i).minlen *= o;
  });
  var a = Fe(r) + 1;
  Zr(r.children(), function(i) {
    Qr2(r, e, o, a, t, n, i);
  }), r.graph().nodeRankFactor = o;
}
m(Kr, "run");
function Qr2(r, e, n, t, o, a, i) {
  var f = r.children(i);
  if (!f.length) {
    i !== e && r.setEdge(e, i, { weight: 0, minlen: n });
    return;
  }
  var d = rr(r, "_bt"), c = rr(r, "_bb"), h = r.node(i);
  r.setParent(d, i), h.borderTop = d, r.setParent(c, i), h.borderBottom = c, Zr(f, function(l) {
    Qr2(r, e, n, t, o, a, l);
    var p = r.node(l), m3 = p.borderTop ? p.borderTop : l, v = p.borderBottom ? p.borderBottom : l, b = p.borderTop ? t : 2 * t, D = m3 !== v ? 1 : o - a[i] + 1;
    r.setEdge(d, m3, { weight: b, minlen: D, nestingEdge: true }), r.setEdge(v, c, { weight: b, minlen: D, nestingEdge: true });
  }), r.parent(i) || r.setEdge(e, d, { weight: 0, minlen: o + a[i] });
}
m(Qr2, "dfs");
function Me(r) {
  var e = {};
  function n(t, o) {
    var a = r.children(t);
    a && a.length && Zr(a, function(i) {
      n(i, o + 1);
    }), e[t] = o;
  }
  return m(n, "dfs"), Zr(r.children(), function(t) {
    n(t, 1);
  }), e;
}
m(Me, "treeDepths");
function Fe(r) {
  return Rn(r.edges(), function(e, n) {
    return e + r.edge(n).weight;
  }, 0);
}
m(Fe, "sumWeights");
function Zr2(r) {
  var e = r.graph();
  r.removeNode(e.nestingRoot), delete e.nestingRoot, Zr(r.edges(), function(n) {
    var t = r.edge(n);
    t.nestingEdge && r.removeEdge(n);
  });
}
m(Zr2, "cleanup");
function $r(r, e, n) {
  var t = {}, o;
  Zr(n, function(a) {
    for (var i = r.parent(a), f, d; i; ) {
      if (f = r.parent(i), f ? (d = t[f], t[f] = i) : (d = o, o = i), d && d !== i) {
        e.setEdge(d, i);
        return;
      }
      i = f;
    }
  });
}
m($r, "addSubgraphConstraints");
function re(r, e, n) {
  var t = Ve(r), o = new m2({ compound: true }).setGraph({ root: t }).setDefaultNodeLabel(function(a) {
    return r.node(a);
  });
  return Zr(r.nodes(), function(a) {
    var i = r.node(a), f = r.parent(a);
    (i.rank === e || i.minRank <= e && e <= i.maxRank) && (o.setNode(a), o.setParent(a, f || t), Zr(r[n](a), function(d) {
      var c = d.v === a ? d.w : d.v, h = o.edge(c, a), l = sn(h) ? 0 : h.weight;
      o.setEdge(c, a, { weight: r.edge(d).weight + l });
    }), Object.prototype.hasOwnProperty.call(i, "minRank") && o.setNode(a, { borderLeft: i.borderLeft[e], borderRight: i.borderRight[e] }));
  }), o;
}
m(re, "buildLayerGraph");
function Ve(r) {
  for (var e; r.hasNode(e = lp("_root")); ) ;
  return e;
}
m(Ve, "createRootNode");
function ee(r, e) {
  for (var n = 0, t = 1; t < e.length; ++t) n += Be(r, e[t - 1], e[t]);
  return n;
}
m(ee, "crossCount");
function Be(r, e, n) {
  for (var t = gp(n, Jr(n, function(c, h) {
    return h;
  })), o = Qr(Jr(e, function(c) {
    return np(Jr(r.outEdges(c), function(h) {
      return { pos: t[h.w], weight: r.edge(h).weight };
    }), "pos");
  })), a = 1; a < n.length; ) a <<= 1;
  var i = 2 * a - 1;
  a -= 1;
  var f = Jr(new Array(i), function() {
    return 0;
  }), d = 0;
  return Zr(o.forEach(function(c) {
    var h = c.pos + a;
    f[h] += c.weight;
    for (var l = 0; h > 0; ) h % 2 && (l += f[h + 1]), h = h - 1 >> 1, f[h] += c.weight;
    d += c.weight * l;
  })), d;
}
m(Be, "twoLayerCrossCount");
function ne(r) {
  var e = {}, n = fn(r.nodes(), function(f) {
    return !r.children(f).length;
  }), t = bn(Jr(n, function(f) {
    return r.node(f).rank;
  })), o = Jr(Jm(t + 1), function() {
    return [];
  });
  function a(f) {
    if (!fm(e, f)) {
      e[f] = true;
      var d = r.node(f);
      o[d.rank].push(f), Zr(r.successors(f), a);
    }
  }
  m(a, "dfs");
  var i = np(n, function(f) {
    return r.node(f).rank;
  });
  return Zr(i, a), o;
}
m(ne, "initOrder");
function te(r, e) {
  return Jr(e, function(n) {
    var t = r.inEdges(n);
    if (t.length) {
      var o = Rn(t, function(a, i) {
        var f = r.edge(i), d = r.node(i.v);
        return { sum: a.sum + f.weight * d.order, weight: a.weight + f.weight };
      }, { sum: 0, weight: 0 });
      return { v: n, barycenter: o.sum / o.weight, weight: o.weight };
    } else return { v: n };
  });
}
m(te, "barycenter");
function oe(r, e) {
  var n = {};
  Zr(r, function(o, a) {
    var i = n[o.v] = { indegree: 0, in: [], out: [], vs: [o.v], i: a };
    sn(o.barycenter) || (i.barycenter = o.barycenter, i.weight = o.weight);
  }), Zr(e.edges(), function(o) {
    var a = n[o.v], i = n[o.w];
    !sn(a) && !sn(i) && (i.indegree++, a.out.push(n[o.w]));
  });
  var t = fn(n, function(o) {
    return !o.indegree;
  });
  return Ae(t);
}
m(oe, "resolveConflicts");
function Ae(r) {
  var e = [];
  function n(a) {
    return function(i) {
      i.merged || (sn(i.barycenter) || sn(a.barycenter) || i.barycenter >= a.barycenter) && De(a, i);
    };
  }
  m(n, "handleIn");
  function t(a) {
    return function(i) {
      i.in.push(a), --i.indegree === 0 && r.push(i);
    };
  }
  for (m(t, "handleOut"); r.length; ) {
    var o = r.pop();
    e.push(o), Zr(o.in.reverse(), n(o)), Zr(o.out, t(o));
  }
  return Jr(fn(e, function(a) {
    return !a.merged;
  }), function(a) {
    return Tn(a, ["vs", "i", "barycenter", "weight"]);
  });
}
m(Ae, "doResolveConflicts");
function De(r, e) {
  var n = 0, t = 0;
  r.weight && (n += r.barycenter * r.weight, t += r.weight), e.weight && (n += e.barycenter * e.weight, t += e.weight), r.vs = e.vs.concat(r.vs), r.barycenter = n / t, r.weight = t, r.i = Math.min(e.i, r.i), e.merged = true;
}
m(De, "mergeEntries");
function ie(r, e) {
  var n = Nr(r, function(h) {
    return Object.prototype.hasOwnProperty.call(h, "barycenter");
  }), t = n.lhs, o = np(n.rhs, function(h) {
    return -h.i;
  }), a = [], i = 0, f = 0, d = 0;
  t.sort(Ye(!!e)), d = ae(a, o, d), Zr(t, function(h) {
    d += h.vs.length, a.push(h.vs), i += h.barycenter * h.weight, f += h.weight, d = ae(a, o, d);
  });
  var c = { vs: Qr(a) };
  return f && (c.barycenter = i / f, c.weight = f), c;
}
m(ie, "sort");
function ae(r, e, n) {
  for (var t; e.length && (t = Df(e)).i <= n; ) e.pop(), r.push(t.vs), n++;
  return n;
}
m(ae, "consumeUnsortable");
function Ye(r) {
  return function(e, n) {
    return e.barycenter < n.barycenter ? -1 : e.barycenter > n.barycenter ? 1 : r ? n.i - e.i : e.i - n.i;
  };
}
m(Ye, "compareWithBias");
function hr(r, e, n, t) {
  var o = r.children(e), a = r.node(e), i = a ? a.borderLeft : void 0, f = a ? a.borderRight : void 0, d = {};
  i && (o = fn(o, function(v) {
    return v !== i && v !== f;
  }));
  var c = te(r, o);
  Zr(c, function(v) {
    if (r.children(v.v).length) {
      var b = hr(r, v.v, n, t);
      d[v.v] = b, Object.prototype.hasOwnProperty.call(b, "barycenter") && Ue(v, b);
    }
  });
  var h = oe(c, n);
  ze(h, d);
  var l = ie(h, t);
  if (i && (l.vs = Qr([i, l.vs, f]), r.predecessors(i).length)) {
    var p = r.node(r.predecessors(i)[0]), m3 = r.node(r.predecessors(f)[0]);
    Object.prototype.hasOwnProperty.call(l, "barycenter") || (l.barycenter = 0, l.weight = 0), l.barycenter = (l.barycenter * l.weight + p.order + m3.order) / (l.weight + 2), l.weight += 2;
  }
  return l;
}
m(hr, "sortSubgraph");
function ze(r, e) {
  Zr(r, function(n) {
    n.vs = Qr(n.vs.map(function(t) {
      return e[t] ? e[t].vs : t;
    }));
  });
}
m(ze, "expandSubgraphs");
function Ue(r, e) {
  sn(r.barycenter) ? (r.barycenter = e.barycenter, r.weight = e.weight) : (r.barycenter = (r.barycenter * r.weight + e.barycenter * e.weight) / (r.weight + e.weight), r.weight += e.weight);
}
m(Ue, "mergeBarycenters");
function ue(r) {
  var e = er(r), n = se(r, Jm(1, e + 1), "inEdges"), t = se(r, Jm(e - 1, -1, -1), "outEdges"), o = ne(r);
  fe(r, o);
  for (var a = Number.POSITIVE_INFINITY, i, f = 0, d = 0; d < 4; ++f, ++d) {
    We(f % 2 ? n : t, f % 4 >= 2), o = C(r);
    var c = ee(r, o);
    c < a && (d = 0, i = hi(o), a = c);
  }
  fe(r, i);
}
m(ue, "order");
function se(r, e, n) {
  return Jr(e, function(t) {
    return re(r, t, n);
  });
}
m(se, "buildLayerGraphs");
function We(r, e) {
  var n = new m2();
  Zr(r, function(t) {
    var o = t.graph().root, a = hr(t, o, n, e);
    Zr(a.vs, function(i, f) {
      t.node(i).order = f;
    }), $r(t, n, a.vs);
  });
}
m(We, "sweepLayerGraphs");
function fe(r, e) {
  Zr(e, function(n) {
    Zr(n, function(t, o) {
      r.node(t).order = o;
    });
  });
}
m(fe, "assignOrder");
function de(r) {
  var e = Xe(r);
  Zr(r.graph().dummyChains, function(n) {
    for (var t = r.node(n), o = t.edgeObj, a = qe(r, e, o.v, o.w), i = a.path, f = a.lca, d = 0, c = i[d], h = true; n !== o.w; ) {
      if (t = r.node(n), h) {
        for (; (c = i[d]) !== f && r.node(c).maxRank < t.rank; ) d++;
        c === f && (h = false);
      }
      if (!h) {
        for (; d < i.length - 1 && r.node(c = i[d + 1]).minRank <= t.rank; ) d++;
        c = i[d];
      }
      r.setParent(n, c), n = r.successors(n)[0];
    }
  });
}
m(de, "parentDummyChains");
function qe(r, e, n, t) {
  var o = [], a = [], i = Math.min(e[n].low, e[t].low), f = Math.max(e[n].lim, e[t].lim), d, c;
  d = n;
  do
    d = r.parent(d), o.push(d);
  while (d && (e[d].low > i || f > e[d].lim));
  for (c = d, d = t; (d = r.parent(d)) !== c; ) a.push(d);
  return { path: o.concat(a.reverse()), lca: c };
}
m(qe, "findPath");
function Xe(r) {
  var e = {}, n = 0;
  function t(o) {
    var a = n;
    Zr(r.children(o), t), e[o] = { low: a, lim: n++ };
  }
  return m(t, "dfs"), Zr(r.children(), t), e;
}
m(Xe, "postorder");
function He(r, e) {
  var n = {};
  function t(o, a) {
    var i = 0, f = 0, d = o.length, c = Df(a);
    return Zr(a, function(h, l) {
      var p = Ke(r, h), m3 = p ? r.node(p).order : d;
      (p || h === c) && (Zr(a.slice(f, l + 1), function(v) {
        Zr(r.predecessors(v), function(b) {
          var D = r.node(b), mr = D.order;
          (mr < i || m3 < mr) && !(D.dummy && r.node(v).dummy) && ce(n, b, v);
        });
      }), f = l + 1, i = m3);
    }), a;
  }
  return m(t, "visitLayer"), Rn(e, t), n;
}
m(He, "findType1Conflicts");
function Je(r, e) {
  var n = {};
  function t(a, i, f, d, c) {
    var h;
    Zr(Jm(i, f), function(l) {
      h = a[l], r.node(h).dummy && Zr(r.predecessors(h), function(p) {
        var m3 = r.node(p);
        m3.dummy && (m3.order < d || m3.order > c) && ce(n, p, h);
      });
    });
  }
  m(t, "scan");
  function o(a, i) {
    var f = -1, d, c = 0;
    return Zr(i, function(h, l) {
      if (r.node(h).dummy === "border") {
        var p = r.predecessors(h);
        p.length && (d = r.node(p[0]).order, t(i, c, l, f, d), c = l, f = d);
      }
      t(i, c, i.length, d, a.length);
    }), i;
  }
  return m(o, "visitLayer"), Rn(e, o), n;
}
m(Je, "findType2Conflicts");
function Ke(r, e) {
  if (r.node(e).dummy) return Ki(r.predecessors(e), function(n) {
    return r.node(n).dummy;
  });
}
m(Ke, "findOtherInnerSegmentNode");
function ce(r, e, n) {
  if (e > n) {
    var t = e;
    e = n, n = t;
  }
  Object.prototype.hasOwnProperty.call(r, e) || Object.defineProperty(r, e, { enumerable: true, configurable: true, value: {}, writable: true });
  var o = r[e];
  Object.defineProperty(o, n, { enumerable: true, configurable: true, value: true, writable: true });
}
m(ce, "addConflict");
function Qe(r, e, n) {
  if (e > n) {
    var t = e;
    e = n, n = t;
  }
  return !!r[e] && Object.prototype.hasOwnProperty.call(r[e], n);
}
m(Qe, "hasConflict");
function Ze(r, e, n, t) {
  var o = {}, a = {}, i = {};
  return Zr(e, function(f) {
    Zr(f, function(d, c) {
      o[d] = d, a[d] = d, i[d] = c;
    });
  }), Zr(e, function(f) {
    var d = -1;
    Zr(f, function(c) {
      var h = t(c);
      if (h.length) {
        h = np(h, function(b) {
          return i[b];
        });
        for (var l = (h.length - 1) / 2, p = Math.floor(l), m3 = Math.ceil(l); p <= m3; ++p) {
          var v = h[p];
          a[c] === c && d < i[v] && !Qe(n, c, v) && (a[v] = c, a[c] = o[c] = o[v], d = i[v]);
        }
      }
    });
  }), { root: o, align: a };
}
m(Ze, "verticalAlignment");
function $e(r, e, n, t, o) {
  var a = {}, i = rn(r, e, n, o), f = o ? "borderLeft" : "borderRight";
  function d(l, p) {
    for (var m3 = i.nodes(), v = m3.pop(), b = {}; v; ) b[v] ? l(v) : (b[v] = true, m3.push(v), m3 = m3.concat(p(v))), v = m3.pop();
  }
  m(d, "iterate");
  function c(l) {
    a[l] = i.inEdges(l).reduce(function(p, m3) {
      return Math.max(p, a[m3.v] + i.edge(m3));
    }, 0);
  }
  m(c, "pass1");
  function h(l) {
    var p = i.outEdges(l).reduce(function(v, b) {
      return Math.min(v, a[b.w] - i.edge(b));
    }, Number.POSITIVE_INFINITY), m3 = r.node(l);
    p !== Number.POSITIVE_INFINITY && m3.borderType !== f && (a[l] = Math.max(a[l], p));
  }
  return m(h, "pass2"), d(c, i.predecessors.bind(i)), d(h, i.successors.bind(i)), Zr(t, function(l) {
    a[l] = a[n[l]];
  }), a;
}
m($e, "horizontalCompaction");
function rn(r, e, n, t) {
  var o = new m2(), a = r.graph(), i = on(a.nodesep, a.edgesep, t);
  return Zr(e, function(f) {
    var d;
    Zr(f, function(c) {
      var h = n[c];
      if (o.setNode(h), d) {
        var l = n[d], p = o.edge(l, h);
        o.setEdge(l, h, Math.max(i(r, c, d), p || 0));
      }
      d = c;
    });
  }), o;
}
m(rn, "buildBlockGraph");
function en(r, e) {
  return Om(Xr(e), function(n) {
    var t = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    return Zi(n, function(a, i) {
      var f = an(r, i) / 2;
      t = Math.max(a + f, t), o = Math.min(a - f, o);
    }), t - o;
  });
}
m(en, "findSmallestWidthAlignment");
function nn(r, e) {
  var n = Xr(e), t = ym(n), o = bn(n);
  Zr(["u", "d"], function(a) {
    Zr(["l", "r"], function(i) {
      var f = a + i, d = r[f], c;
      if (d !== e) {
        var h = Xr(d);
        c = i === "l" ? t - ym(h) : o - bn(h), c && (r[f] = dn(d, function(l) {
          return l + c;
        }));
      }
    });
  });
}
m(nn, "alignCoordinates");
function tn(r, e) {
  return dn(r.ul, function(n, t) {
    if (e) return r[e.toLowerCase()][t];
    var o = np(Jr(r, t));
    return (o[1] + o[2]) / 2;
  });
}
m(tn, "balance");
function he(r) {
  var e = C(r), n = qs(He(r, e), Je(r, e)), t = {}, o;
  Zr(["u", "d"], function(i) {
    o = i === "u" ? e : Xr(e).reverse(), Zr(["l", "r"], function(f) {
      f === "r" && (o = Jr(o, function(l) {
        return Xr(l).reverse();
      }));
      var d = (i === "u" ? r.predecessors : r.successors).bind(r), c = Ze(r, o, n, d), h = $e(r, o, c.root, c.align, f === "r");
      f === "r" && (h = dn(h, function(l) {
        return -l;
      })), t[i + f] = h;
    });
  });
  var a = en(r, t);
  return nn(t, a), tn(t, r.graph().align);
}
m(he, "positionX");
function on(r, e, n) {
  return function(t, o, a) {
    var i = t.node(o), f = t.node(a), d = 0, c;
    if (d += i.width / 2, Object.prototype.hasOwnProperty.call(i, "labelpos")) switch (i.labelpos.toLowerCase()) {
      case "l":
        c = -i.width / 2;
        break;
      case "r":
        c = i.width / 2;
        break;
    }
    if (c && (d += n ? c : -c), c = 0, d += (i.dummy ? e : r) / 2, d += (f.dummy ? e : r) / 2, d += f.width / 2, Object.prototype.hasOwnProperty.call(f, "labelpos")) switch (f.labelpos.toLowerCase()) {
      case "l":
        c = f.width / 2;
        break;
      case "r":
        c = -f.width / 2;
        break;
    }
    return c && (d += n ? c : -c), c = 0, d;
  };
}
m(on, "sep");
function an(r, e) {
  return r.node(e).width;
}
m(an, "width");
function le(r) {
  r = X(r), sn2(r), Ji(he(r), function(e, n) {
    r.node(n).x = e;
  });
}
m(le, "position");
function sn2(r) {
  var e = C(r), n = r.graph().ranksep, t = 0;
  Zr(e, function(o) {
    var a = bn(Jr(o, function(i) {
      return r.node(i).height;
    }));
    Zr(o, function(i) {
      r.node(i).y = t + a / 2;
    }), t += a + n;
  });
}
m(sn2, "positionY");
function fn2(r, e) {
  var n = e && e.debugTiming ? Or : Ir;
  n("layout", () => {
    var t = n("  buildLayoutGraph", () => bn2(r));
    n("  runLayout", () => un(t, n)), n("  updateInputGraph", () => dn2(r, t));
  });
}
m(fn2, "layout");
function un(r, e) {
  e("    makeSpaceForEdgeLabels", () => En(r)), e("    removeSelfEdges", () => Ln(r)), e("    acyclic", () => Fr(r)), e("    nestingGraph.run", () => Kr(r)), e("    rank", () => cr(X(r))), e("    injectEdgeLabelProxies", () => yn(r)), e("    removeEmptyRanks", () => gr(r)), e("    nestingGraph.cleanup", () => Zr2(r)), e("    normalizeRanks", () => kr(r)), e("    assignRankMinMax", () => xn(r)), e("    removeEdgeLabelProxies", () => kn(r)), e("    normalize.run", () => Br(r)), e("    parentDummyChains", () => de(r)), e("    addBorderSegments", () => Lr(r)), e("    order", () => ue(r)), e("    insertSelfEdges", () => Cn(r)), e("    adjustCoordinateSystem", () => jr(r)), e("    position", () => le(r)), e("    positionSelfEdges", () => jn(r)), e("    removeBorderNodes", () => Pn(r)), e("    normalize.undo", () => Ar(r)), e("    fixupEdgeLabelCoords", () => On(r)), e("    undoCoordinateSystem", () => Tr(r)), e("    translateGraph", () => gn(r)), e("    assignNodeIntersects", () => Nn(r)), e("    reversePoints", () => In(r)), e("    acyclic.undo", () => Gr(r));
}
m(un, "runLayout");
function dn2(r, e) {
  Zr(r.nodes(), function(n) {
    var t = r.node(n), o = e.node(n);
    t && (t.x = o.x, t.y = o.y, e.children(n).length && (t.width = o.width, t.height = o.height));
  }), Zr(r.edges(), function(n) {
    var t = r.edge(n), o = e.edge(n);
    t.points = o.points, Object.prototype.hasOwnProperty.call(o, "x") && (t.x = o.x, t.y = o.y);
  }), r.graph().width = e.graph().width, r.graph().height = e.graph().height;
}
m(dn2, "updateInputGraph");
var cn = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
var hn = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
var ln = ["acyclicer", "ranker", "rankdir", "align"];
var pn = ["width", "height"];
var mn = { width: 0, height: 0 };
var vn = ["minlen", "weight", "width", "height", "labeloffset"];
var _n = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" };
var wn = ["labelpos"];
function bn2(r) {
  var e = new m2({ multigraph: true, compound: true }), n = pr(r.graph());
  return e.setGraph(qs({}, hn, lr(n, cn), Tn(n, ln))), Zr(r.nodes(), function(t) {
    var o = pr(r.node(t));
    e.setNode(t, Nf(lr(o, pn), mn)), e.setParent(t, r.parent(t));
  }), Zr(r.edges(), function(t) {
    var o = pr(r.edge(t));
    e.setEdge(t, qs({}, _n, lr(o, vn), Tn(o, wn)));
  }), e;
}
m(bn2, "buildLayoutGraph");
function En(r) {
  var e = r.graph();
  e.ranksep /= 2, Zr(r.edges(), function(n) {
    var t = r.edge(n);
    t.minlen *= 2, t.labelpos.toLowerCase() !== "c" && (e.rankdir === "TB" || e.rankdir === "BT" ? t.width += t.labeloffset : t.height += t.labeloffset);
  });
}
m(En, "makeSpaceForEdgeLabels");
function yn(r) {
  Zr(r.edges(), function(e) {
    var n = r.edge(e);
    if (n.width && n.height) {
      var t = r.node(e.v), o = r.node(e.w), a = { rank: (o.rank - t.rank) / 2 + t.rank, e };
      g(r, "edge-proxy", a, "_ep");
    }
  });
}
m(yn, "injectEdgeLabelProxies");
function xn(r) {
  var e = 0;
  Zr(r.nodes(), function(n) {
    var t = r.node(n);
    t.borderTop && (t.minRank = r.node(t.borderTop).rank, t.maxRank = r.node(t.borderBottom).rank, e = bn(e, t.maxRank));
  }), r.graph().maxRank = e;
}
m(xn, "assignRankMinMax");
function kn(r) {
  Zr(r.nodes(), function(e) {
    var n = r.node(e);
    n.dummy === "edge-proxy" && (r.edge(n.e).labelRank = n.rank, r.removeNode(e));
  });
}
m(kn, "removeEdgeLabelProxies");
function gn(r) {
  var e = Number.POSITIVE_INFINITY, n = 0, t = Number.POSITIVE_INFINITY, o = 0, a = r.graph(), i = a.marginx || 0, f = a.marginy || 0;
  function d(c) {
    var h = c.x, l = c.y, p = c.width, m3 = c.height;
    e = Math.min(e, h - p / 2), n = Math.max(n, h + p / 2), t = Math.min(t, l - m3 / 2), o = Math.max(o, l + m3 / 2);
  }
  m(d, "getExtremes"), Zr(r.nodes(), function(c) {
    d(r.node(c));
  }), Zr(r.edges(), function(c) {
    var h = r.edge(c);
    Object.prototype.hasOwnProperty.call(h, "x") && d(h);
  }), e -= i, t -= f, Zr(r.nodes(), function(c) {
    var h = r.node(c);
    h.x -= e, h.y -= t;
  }), Zr(r.edges(), function(c) {
    var h = r.edge(c);
    Zr(h.points, function(l) {
      l.x -= e, l.y -= t;
    }), Object.prototype.hasOwnProperty.call(h, "x") && (h.x -= e), Object.prototype.hasOwnProperty.call(h, "y") && (h.y -= t);
  }), a.width = n - e + i, a.height = o - t + f;
}
m(gn, "translateGraph");
function Nn(r) {
  Zr(r.edges(), function(e) {
    var n = r.edge(e), t = r.node(e.v), o = r.node(e.w), a, i;
    n.points ? (a = n.points[0], i = n.points[n.points.length - 1]) : (n.points = [], a = o, i = t), n.points.unshift($(t, a)), n.points.push($(o, i));
  });
}
m(Nn, "assignNodeIntersects");
function On(r) {
  Zr(r.edges(), function(e) {
    var n = r.edge(e);
    if (Object.prototype.hasOwnProperty.call(n, "x")) switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
      case "l":
        n.x -= n.width / 2 + n.labeloffset;
        break;
      case "r":
        n.x += n.width / 2 + n.labeloffset;
        break;
    }
  });
}
m(On, "fixupEdgeLabelCoords");
function In(r) {
  Zr(r.edges(), function(e) {
    var n = r.edge(e);
    n.reversed && n.points.reverse();
  });
}
m(In, "reversePointsForReversedEdges");
function Pn(r) {
  Zr(r.nodes(), function(e) {
    if (r.children(e).length) {
      var n = r.node(e), t = r.node(n.borderTop), o = r.node(n.borderBottom), a = r.node(Df(n.borderLeft)), i = r.node(Df(n.borderRight));
      n.width = Math.abs(i.x - a.x), n.height = Math.abs(o.y - t.y), n.x = a.x + n.width / 2, n.y = t.y + n.height / 2;
    }
  }), Zr(r.nodes(), function(e) {
    r.node(e).dummy === "border" && r.removeNode(e);
  });
}
m(Pn, "removeBorderNodes");
function Ln(r) {
  Zr(r.edges(), function(e) {
    if (e.v === e.w) {
      var n = r.node(e.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e, label: r.edge(e) }), r.removeEdge(e);
    }
  });
}
m(Ln, "removeSelfEdges");
function Cn(r) {
  var e = C(r);
  Zr(e, function(n) {
    var t = 0;
    Zr(n, function(o, a) {
      var i = r.node(o);
      i.order = a + t, Zr(i.selfEdges, function(f) {
        g(r, "selfedge", { width: f.label.width, height: f.label.height, rank: i.rank, order: a + ++t, e: f.e, label: f.label }, "_se");
      }), delete i.selfEdges;
    });
  });
}
m(Cn, "insertSelfEdges");
function jn(r) {
  Zr(r.nodes(), function(e) {
    var n = r.node(e);
    if (n.dummy === "selfedge") {
      var t = r.node(n.e.v), o = t.x + t.width / 2, a = t.y, i = n.x - o, f = t.height / 2;
      r.setEdge(n.e, n.label), r.removeNode(e), n.label.points = [{ x: o + 2 * i / 3, y: a - f }, { x: o + 5 * i / 6, y: a - f }, { x: o + i, y: a }, { x: o + 5 * i / 6, y: a + f }, { x: o + 2 * i / 3, y: a + f }], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
m(jn, "positionSelfEdges");
function lr(r, e) {
  return dn(Tn(r, e), Number);
}
m(lr, "selectNumberAttrs");
function pr(r) {
  var e = {};
  return Zr(r, function(n, t) {
    e[t.toLowerCase()] = n;
  }), e;
}
m(pr, "canonicalize");

export {
  fn2 as fn
};
//# sourceMappingURL=chunk-M3ZS3LOY.js.map

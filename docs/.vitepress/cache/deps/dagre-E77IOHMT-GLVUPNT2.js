import {
  fn
} from "./chunk-M3ZS3LOY.js";
import {
  m as m2
} from "./chunk-NVNIWB3X.js";
import {
  Jr,
  _f,
  sn
} from "./chunk-3DBRZS4A.js";
import {
  $r,
  Or,
  Sr,
  Yr,
  _r
} from "./chunk-QDSNXXJA.js";
import "./chunk-LK7THHH6.js";
import {
  Cr,
  Fg,
  Rr,
  Wg,
  Xg,
  Yg,
  v
} from "./chunk-OB6FDEYX.js";
import {
  d
} from "./chunk-KKUK5XSX.js";
import "./chunk-37DMPFOG.js";
import "./chunk-BIOJLABG.js";
import "./chunk-GYGMMI4F.js";
import "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  qo
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

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/dagre-E77IOHMT.mjs
function h(e) {
  var t = { options: { directed: e.isDirected(), multigraph: e.isMultigraph(), compound: e.isCompound() }, nodes: re(e), edges: se(e) };
  return sn(e.graph()) || (t.value = _f(e.graph())), t;
}
m(h, "write");
function re(e) {
  return Jr(e.nodes(), function(t) {
    var n = e.node(t), c = e.parent(t), s = { v: t };
    return sn(n) || (s.value = n), sn(c) || (s.parent = c), s;
  });
}
m(re, "writeNodes");
function se(e) {
  return Jr(e.edges(), function(t) {
    var n = e.edge(t), c = { v: t.v, w: t.w };
    return sn(t.name) || (c.name = t.name), sn(n) || (c.value = n), c;
  });
}
m(se, "writeEdges");
var a = /* @__PURE__ */ new Map();
var v2 = /* @__PURE__ */ new Map();
var W = /* @__PURE__ */ new Map();
var Z = m(() => {
  v2.clear(), W.clear(), a.clear();
}, "clear");
var J = m((e, t) => {
  let n = v2.get(t) || [];
  return pt.trace("In isDescendant", t, " ", e, " = ", n.includes(e)), n.includes(e);
}, "isDescendant");
var ce = m((e, t) => {
  let n = v2.get(t) || [];
  return pt.info("Descendants of ", t, " is ", n), pt.info("Edge is ", e), e.v === t || e.w === t ? false : n ? n.includes(e.v) || J(e.v, t) || J(e.w, t) || n.includes(e.w) : (pt.debug("Tilt, ", t, ",not in descendants"), false);
}, "edgeInCluster");
var $ = m((e, t, n, c) => {
  pt.warn("Copying children of ", e, "root", c, "data", t.node(e), c);
  let s = t.children(e) || [];
  e !== c && s.push(e), pt.warn("Copying (nodes) clusterId", e, "nodes", s), s.forEach((o) => {
    if (t.children(o).length > 0) $(o, t, n, c);
    else {
      let l = t.node(o);
      pt.info("cp ", o, " to ", c, " with parent ", e), n.setNode(o, l), c !== t.parent(o) && (pt.warn("Setting parent", o, t.parent(o)), n.setParent(o, t.parent(o))), e !== c && o !== e ? (pt.debug("Setting parent", o, e), n.setParent(o, e)) : (pt.info("In copy ", e, "root", c, "data", t.node(e), c), pt.debug("Not Setting parent for node=", o, "cluster!==rootId", e !== c, "node!==clusterId", o !== e));
      let u = t.edges(o);
      pt.debug("Copying Edges", u), u.forEach((d2) => {
        pt.info("Edge", d2);
        let m3 = t.edge(d2.v, d2.w, d2.name);
        pt.info("Edge data", m3, c);
        try {
          ce(d2, c) ? (pt.info("Copying as ", d2.v, d2.w, m3, d2.name), n.setEdge(d2.v, d2.w, m3, d2.name), pt.info("newGraph edges ", n.edges(), n.edge(n.edges()[0]))) : pt.info("Skipping copy of edge ", d2.v, "-->", d2.w, " rootId: ", c, " clusterId:", e);
        } catch (p) {
          pt.error(p);
        }
      });
    }
    pt.debug("Removing node", o), t.removeNode(o);
  });
}, "copy");
var L = m((e, t) => {
  let n = t.children(e), c = [...n];
  for (let s of n) W.set(s, e), c = [...c, ...L(s, t)];
  return c;
}, "extractDescendants");
var ae = m((e, t, n) => {
  let c = e.edges().filter((d2) => d2.v === t || d2.w === t), s = e.edges().filter((d2) => d2.v === n || d2.w === n), o = c.map((d2) => ({ v: d2.v === t ? n : d2.v, w: d2.w === t ? t : d2.w })), l = s.map((d2) => ({ v: d2.v, w: d2.w }));
  return o.filter((d2) => l.some((m3) => d2.v === m3.v && d2.w === m3.w));
}, "findCommonEdges");
var x = m((e, t, n) => {
  let c = t.children(e);
  if (pt.trace("Searching children of id ", e, c), c.length < 1) return e;
  let s;
  for (let o of c) {
    let l = x(o, t, n), u = ae(t, n, l);
    if (l) if (u.length > 0) s = l;
    else return l;
  }
  return s;
}, "findNonClusterChild");
var Q = m((e) => !a.has(e) || !a.get(e).externalConnections ? e : a.has(e) ? a.get(e).id : e, "getAnchorId");
var I = m((e, t) => {
  if (!e || t > 10) {
    pt.debug("Opting out, no graph ");
    return;
  } else pt.debug("Opting in, graph ");
  e.nodes().forEach(function(n) {
    e.children(n).length > 0 && (pt.warn("Cluster identified", n, " Replacement id in edges: ", x(n, e, n)), v2.set(n, L(n, e)), a.set(n, { id: x(n, e, n), clusterData: e.node(n) }));
  }), e.nodes().forEach(function(n) {
    let c = e.children(n), s = e.edges();
    c.length > 0 ? (pt.debug("Cluster identified", n, v2), s.forEach((o) => {
      let l = J(o.v, n), u = J(o.w, n);
      l ^ u && (pt.warn("Edge: ", o, " leaves cluster ", n), pt.warn("Descendants of XXX ", n, ": ", v2.get(n)), a.get(n).externalConnections = true);
    })) : pt.debug("Not a cluster ", n, v2);
  });
  for (let n of a.keys()) {
    let c = a.get(n).id, s = e.parent(c);
    s !== n && a.has(s) && !a.get(s).externalConnections && (a.get(n).id = s);
  }
  e.edges().forEach(function(n) {
    let c = e.edge(n);
    pt.warn("Edge " + n.v + " -> " + n.w + ": " + JSON.stringify(n)), pt.warn("Edge " + n.v + " -> " + n.w + ": " + JSON.stringify(e.edge(n)));
    let s = n.v, o = n.w;
    if (pt.warn("Fix XXX", a, "ids:", n.v, n.w, "Translating: ", a.get(n.v), " --- ", a.get(n.w)), a.get(n.v) || a.get(n.w)) {
      if (pt.warn("Fixing and trying - removing XXX", n.v, n.w, n.name), s = Q(n.v), o = Q(n.w), e.removeEdge(n.v, n.w, n.name), s !== n.v) {
        let l = e.parent(s);
        a.get(l).externalConnections = true, c.fromCluster = n.v;
      }
      if (o !== n.w) {
        let l = e.parent(o);
        a.get(l).externalConnections = true, c.toCluster = n.w;
      }
      pt.warn("Fix Replacing with XXX", s, o, n.name), e.setEdge(s, o, c, n.name);
    }
  }), pt.warn("Adjusted Graph", h(e)), ee(e, 0), pt.trace(a);
}, "adjustClustersAndEdges");
var ee = m((e, t) => {
  var _a, _b;
  if (pt.warn("extractor - ", t, h(e), e.children("D")), t > 10) {
    pt.error("Bailing out");
    return;
  }
  let n = e.nodes(), c = false;
  for (let s of n) {
    let o = e.children(s);
    c = c || o.length > 0;
  }
  if (!c) {
    pt.debug("Done, no node has children", e.nodes());
    return;
  }
  pt.debug("Nodes = ", n, t);
  for (let s of n) if (pt.debug("Extracting node", s, a, a.has(s) && !a.get(s).externalConnections, !e.parent(s), e.node(s), e.children("D"), " Depth ", t), !a.has(s)) pt.debug("Not a cluster", s, t);
  else if (!a.get(s).externalConnections && e.children(s) && e.children(s).length > 0) {
    pt.warn("Cluster without external connections, without a parent and with children", s, t);
    let l = e.graph().rankdir === "TB" ? "LR" : "TB";
    ((_b = (_a = a.get(s)) == null ? void 0 : _a.clusterData) == null ? void 0 : _b.dir) && (l = a.get(s).clusterData.dir, pt.warn("Fixing dir", a.get(s).clusterData.dir, l));
    let u = new m2({ multigraph: true, compound: true }).setGraph({ rankdir: l, nodesep: 50, ranksep: 50, marginx: 8, marginy: 8 }).setDefaultEdgeLabel(function() {
      return {};
    });
    pt.warn("Old graph before copy", h(e)), $(s, e, u, s), e.setNode(s, { clusterNode: true, id: s, clusterData: a.get(s).clusterData, label: a.get(s).label, graph: u }), pt.warn("New graph after copy node: (", s, ")", h(u)), pt.debug("Old graph after copy", h(e));
  } else pt.warn("Cluster ** ", s, " **not meeting the criteria !externalConnections:", !a.get(s).externalConnections, " no parent: ", !e.parent(s), " children ", e.children(s) && e.children(s).length > 0, e.children("D"), t), pt.debug(a);
  n = e.nodes(), pt.warn("New list of nodes", n);
  for (let s of n) {
    let o = e.node(s);
    pt.warn(" Now next level", s, o), (o == null ? void 0 : o.clusterNode) && ee(o.graph, t + 1);
  }
}, "extractor");
var ne = m((e, t) => {
  if (t.length === 0) return [];
  let n = Object.assign([], t);
  return t.forEach((c) => {
    let s = e.children(c), o = ne(e, s);
    n = [...n, ...o];
  }), n;
}, "sorter");
var te = m((e) => ne(e, e.children()), "sortNodesByHierarchy");
var ie = m(async (e, t, n, c, s, o) => {
  pt.warn("Graph in recursive render:XAX", h(t), s);
  let l = t.graph().rankdir;
  pt.trace("Dir in recursive render - dir:", l);
  let u = e.insert("g").attr("class", "root");
  t.nodes() ? pt.info("Recursive render XXX", t.nodes()) : pt.info("No nodes found for", t), t.edges().length > 0 && pt.info("Recursive edges", t.edge(t.edges()[0]));
  let d2 = u.insert("g").attr("class", "clusters"), m3 = u.insert("g").attr("class", "edgePaths"), p = u.insert("g").attr("class", "edgeLabels"), b = u.insert("g").attr("class", "nodes");
  await Promise.all(t.nodes().map(async function(f) {
    let r = t.node(f);
    if (s !== void 0) {
      let w = JSON.parse(JSON.stringify(s.clusterData));
      pt.trace(`Setting data for parent cluster XXX
 Node.id = `, f, `
 data=`, w.height, `
Parent cluster`, s.height), t.setNode(s.id, w), t.parent(f) || (pt.trace("Setting parent", f, s.id), t.setParent(f, s.id, w));
    }
    if (pt.info("(Insert) Node XXX" + f + ": " + JSON.stringify(t.node(f))), r == null ? void 0 : r.clusterNode) {
      pt.info("Cluster identified XBX", f, r.width, t.node(f));
      let { ranksep: w, nodesep: E } = t.graph();
      r.graph.setGraph({ ...r.graph.graph(), ranksep: w + 25, nodesep: E });
      let N = await ie(b, r.graph, n, c, t.node(f), o), D = N.elem;
      v(r, D), r.diff = N.diff || 0, pt.info("New compound node after recursive render XAX", f, "width", r.width, "height", r.height), Xg(D, r);
    } else t.children(f).length > 0 ? (pt.trace("Cluster - the non recursive path XBX", f, r.id, r, r.width, "Graph:", t), pt.trace(x(r.id, t)), a.set(r.id, { id: x(r.id, t), node: r })) : (pt.trace("Node - the non recursive path XAX", f, b, t.node(f), l), await Wg(b, t.node(f), { config: o, dir: l }));
  })), await m(async () => {
    let f = t.edges().map(async function(r) {
      let w = t.edge(r.v, r.w, r.name);
      pt.info("Edge " + r.v + " -> " + r.w + ": " + JSON.stringify(r)), pt.info("Edge " + r.v + " -> " + r.w + ": ", r, " ", JSON.stringify(t.edge(r))), pt.info("Fix", a, "ids:", r.v, r.w, "Translating: ", a.get(r.v), a.get(r.w)), await Sr(p, w);
    });
    await Promise.all(f);
  }, "processEdges")(), pt.info("Graph before layout:", JSON.stringify(h(t))), pt.info("############################################# XXX"), pt.info("###                Layout                 ### XXX"), pt.info("############################################# XXX"), fn(t), pt.info("Graph after layout:", JSON.stringify(h(t)));
  let P = 0, { subGraphTitleTotalMargin: S } = d(o);
  return await Promise.all(te(t).map(async function(f) {
    var _a;
    let r = t.node(f);
    if (pt.info("Position XBX => " + f + ": (" + r.x, "," + r.y, ") width: ", r.width, " height: ", r.height), r == null ? void 0 : r.clusterNode) r.y += S, pt.info("A tainted cluster node XBX1", f, r.id, r.width, r.height, r.x, r.y, t.parent(f)), a.get(r.id).node = r, Fg(r);
    else if (t.children(f).length > 0) {
      pt.info("A pure cluster node XBX1", f, r.id, r.x, r.y, r.width, r.height, t.parent(f)), r.height += S, t.node(r.parentId);
      let w = (r == null ? void 0 : r.padding) / 2 || 0, E = ((_a = r == null ? void 0 : r.labelBBox) == null ? void 0 : _a.height) || 0, N = E - w || 0;
      pt.debug("OffsetY", N, "labelHeight", E, "halfPadding", w), await Cr(d2, r), a.get(r.id).node = r;
    } else {
      let w = t.node(r.parentId);
      r.y += S / 2, pt.info("A regular node XBX1 - using the padding", r.id, "parent", r.parentId, r.width, r.height, r.x, r.y, "offsetY", r.offsetY, "parent", w, w == null ? void 0 : w.offsetY, r), Fg(r);
    }
  })), t.edges().forEach(function(f) {
    let r = t.edge(f);
    pt.info("Edge " + f.v + " -> " + f.w + ": " + JSON.stringify(r), r), r.points.forEach((D) => D.y += S / 2);
    let w = t.node(f.v);
    var E = t.node(f.w);
    let N = $r(m3, r, a, n, w, E, c);
    Or(r, N);
  }), t.nodes().forEach(function(f) {
    let r = t.node(f);
    pt.info(f, r.type, r.diff), r.isGroup && (P = r.diff);
  }), pt.warn("Returning from recursive render XAX", u, P), { elem: u, diff: P };
}, "recursiveRender");
var Se = m(async (e, t) => {
  var _a, _b, _c, _d, _e, _f2;
  let n = new m2({ multigraph: true, compound: true }).setGraph({ rankdir: e.direction, nodesep: ((_a = e.config) == null ? void 0 : _a.nodeSpacing) || ((_c = (_b = e.config) == null ? void 0 : _b.flowchart) == null ? void 0 : _c.nodeSpacing) || e.nodeSpacing, ranksep: ((_d = e.config) == null ? void 0 : _d.rankSpacing) || ((_f2 = (_e = e.config) == null ? void 0 : _e.flowchart) == null ? void 0 : _f2.rankSpacing) || e.rankSpacing, marginx: 8, marginy: 8 }).setDefaultEdgeLabel(function() {
    return {};
  }), c = t.select("g");
  Yr(c, e.markers, e.type, e.diagramId), Yg(), _r(), Rr(), Z(), e.nodes.forEach((o) => {
    n.setNode(o.id, { ...o }), o.parentId && n.setParent(o.id, o.parentId);
  }), pt.debug("Edges:", e.edges), e.edges.forEach((o) => {
    if (o.start === o.end) {
      let l = o.start, u = l + "---" + l + "---1", d2 = l + "---" + l + "---2", m3 = n.node(l);
      n.setNode(u, { domId: u, id: u, parentId: m3.parentId, labelStyle: "", label: "", padding: 0, shape: "labelRect", style: "", width: 10, height: 10 }), n.setParent(u, m3.parentId), n.setNode(d2, { domId: d2, id: d2, parentId: m3.parentId, labelStyle: "", padding: 0, shape: "labelRect", label: "", style: "", width: 10, height: 10 }), n.setParent(d2, m3.parentId);
      let p = structuredClone(o), b = structuredClone(o), X = structuredClone(o);
      p.label = "", p.arrowTypeEnd = "none", p.id = l + "-cyclic-special-1", b.arrowTypeStart = "none", b.arrowTypeEnd = "none", b.id = l + "-cyclic-special-mid", X.label = "", m3.isGroup && (p.fromCluster = l, X.toCluster = l), X.id = l + "-cyclic-special-2", X.arrowTypeStart = "none", n.setEdge(l, u, p, l + "-cyclic-special-0"), n.setEdge(u, d2, b, l + "-cyclic-special-1"), n.setEdge(d2, l, X, l + "-cyc<lic-special-2");
    } else n.setEdge(o.start, o.end, { ...o }, o.id);
  }), pt.warn("Graph at first:", JSON.stringify(h(n))), I(n), pt.warn("Graph after XAX:", JSON.stringify(h(n)));
  let s = qo();
  await ie(c, n, e.type, e.diagramId, void 0, s);
}, "render");
export {
  Se as render
};
//# sourceMappingURL=dagre-E77IOHMT-GLVUPNT2.js.map

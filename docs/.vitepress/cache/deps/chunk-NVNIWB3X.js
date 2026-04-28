import {
  Kn,
  Rn,
  Xr,
  Zr,
  fn,
  h,
  sn
} from "./chunk-3DBRZS4A.js";
import {
  Cr
} from "./chunk-TIOLQL7Q.js";
import {
  Mt,
  T
} from "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-HN6EAY2L.mjs
var P = "\0";
var l = "\0";
var v = "";
var _a;
var m2 = (_a = class {
  constructor(e = {}) {
    this._isDirected = Object.prototype.hasOwnProperty.call(e, "directed") ? e.directed : true, this._isMultigraph = Object.prototype.hasOwnProperty.call(e, "multigraph") ? e.multigraph : false, this._isCompound = Object.prototype.hasOwnProperty.call(e, "compound") ? e.compound : false, this._label = void 0, this._defaultNodeLabelFn = Mt(void 0), this._defaultEdgeLabelFn = Mt(void 0), this._nodes = {}, this._isCompound && (this._parent = {}, this._children = {}, this._children[l] = {}), this._in = {}, this._preds = {}, this._out = {}, this._sucs = {}, this._edgeObjs = {}, this._edgeLabels = {};
  }
  isDirected() {
    return this._isDirected;
  }
  isMultigraph() {
    return this._isMultigraph;
  }
  isCompound() {
    return this._isCompound;
  }
  setGraph(e) {
    return this._label = e, this;
  }
  graph() {
    return this._label;
  }
  setDefaultNodeLabel(e) {
    return T(e) || (e = Mt(e)), this._defaultNodeLabelFn = e, this;
  }
  nodeCount() {
    return this._nodeCount;
  }
  nodes() {
    return h(this._nodes);
  }
  sources() {
    var e = this;
    return fn(this.nodes(), function(t) {
      return Cr(e._in[t]);
    });
  }
  sinks() {
    var e = this;
    return fn(this.nodes(), function(t) {
      return Cr(e._out[t]);
    });
  }
  setNodes(e, t) {
    var s = arguments, i = this;
    return Zr(e, function(r) {
      s.length > 1 ? i.setNode(r, t) : i.setNode(r);
    }), this;
  }
  setNode(e, t) {
    return Object.prototype.hasOwnProperty.call(this._nodes, e) ? (arguments.length > 1 && (this._nodes[e] = t), this) : (this._nodes[e] = arguments.length > 1 ? t : this._defaultNodeLabelFn(e), this._isCompound && (this._parent[e] = l, this._children[e] = {}, this._children[l][e] = true), this._in[e] = {}, this._preds[e] = {}, this._out[e] = {}, this._sucs[e] = {}, ++this._nodeCount, this);
  }
  node(e) {
    return this._nodes[e];
  }
  hasNode(e) {
    return Object.prototype.hasOwnProperty.call(this._nodes, e);
  }
  removeNode(e) {
    if (Object.prototype.hasOwnProperty.call(this._nodes, e)) {
      var t = m((s) => this.removeEdge(this._edgeObjs[s]), "removeEdge");
      delete this._nodes[e], this._isCompound && (this._removeFromParentsChildList(e), delete this._parent[e], Zr(this.children(e), (s) => {
        this.setParent(s);
      }), delete this._children[e]), Zr(h(this._in[e]), t), delete this._in[e], delete this._preds[e], Zr(h(this._out[e]), t), delete this._out[e], delete this._sucs[e], --this._nodeCount;
    }
    return this;
  }
  setParent(e, t) {
    if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
    if (sn(t)) t = l;
    else {
      t += "";
      for (var s = t; !sn(s); s = this.parent(s)) if (s === e) throw new Error("Setting " + t + " as parent of " + e + " would create a cycle");
      this.setNode(t);
    }
    return this.setNode(e), this._removeFromParentsChildList(e), this._parent[e] = t, this._children[t][e] = true, this;
  }
  _removeFromParentsChildList(e) {
    delete this._children[this._parent[e]][e];
  }
  parent(e) {
    if (this._isCompound) {
      var t = this._parent[e];
      if (t !== l) return t;
    }
  }
  children(e) {
    if (sn(e) && (e = l), this._isCompound) {
      var t = this._children[e];
      if (t) return h(t);
    } else {
      if (e === l) return this.nodes();
      if (this.hasNode(e)) return [];
    }
  }
  predecessors(e) {
    var t = this._preds[e];
    if (t) return h(t);
  }
  successors(e) {
    var t = this._sucs[e];
    if (t) return h(t);
  }
  neighbors(e) {
    var t = this.predecessors(e);
    if (t) return Kn(t, this.successors(e));
  }
  isLeaf(e) {
    var t;
    return this.isDirected() ? t = this.successors(e) : t = this.neighbors(e), t.length === 0;
  }
  filterNodes(e) {
    var t = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
    t.setGraph(this.graph());
    var s = this;
    Zr(this._nodes, function(n, h2) {
      e(h2) && t.setNode(h2, n);
    }), Zr(this._edgeObjs, function(n) {
      t.hasNode(n.v) && t.hasNode(n.w) && t.setEdge(n, s.edge(n));
    });
    var i = {};
    function r(n) {
      var h2 = s.parent(n);
      return h2 === void 0 || t.hasNode(h2) ? (i[n] = h2, h2) : h2 in i ? i[h2] : r(h2);
    }
    return m(r, "findParent"), this._isCompound && Zr(t.nodes(), function(n) {
      t.setParent(n, r(n));
    }), t;
  }
  setDefaultEdgeLabel(e) {
    return T(e) || (e = Mt(e)), this._defaultEdgeLabelFn = e, this;
  }
  edgeCount() {
    return this._edgeCount;
  }
  edges() {
    return Xr(this._edgeObjs);
  }
  setPath(e, t) {
    var s = this, i = arguments;
    return Rn(e, function(r, n) {
      return i.length > 1 ? s.setEdge(r, n, t) : s.setEdge(r, n), n;
    }), this;
  }
  setEdge() {
    var e, t, s, i, r = false, n = arguments[0];
    typeof n == "object" && n !== null && "v" in n ? (e = n.v, t = n.w, s = n.name, arguments.length === 2 && (i = arguments[1], r = true)) : (e = n, t = arguments[1], s = arguments[3], arguments.length > 2 && (i = arguments[2], r = true)), e = "" + e, t = "" + t, sn(s) || (s = "" + s);
    var h2 = p(this._isDirected, e, t, s);
    if (Object.prototype.hasOwnProperty.call(this._edgeLabels, h2)) return r && (this._edgeLabels[h2] = i), this;
    if (!sn(s) && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(e), this.setNode(t), this._edgeLabels[h2] = r ? i : this._defaultEdgeLabelFn(e, t, s);
    var c = D(this._isDirected, e, t, s);
    return e = c.v, t = c.w, Object.freeze(c), this._edgeObjs[h2] = c, L(this._preds[t], e), L(this._sucs[e], t), this._in[t][h2] = c, this._out[e][h2] = c, this._edgeCount++, this;
  }
  edge(e, t, s) {
    var i = arguments.length === 1 ? O(this._isDirected, arguments[0]) : p(this._isDirected, e, t, s);
    return this._edgeLabels[i];
  }
  hasEdge(e, t, s) {
    var i = arguments.length === 1 ? O(this._isDirected, arguments[0]) : p(this._isDirected, e, t, s);
    return Object.prototype.hasOwnProperty.call(this._edgeLabels, i);
  }
  removeEdge(e, t, s) {
    var i = arguments.length === 1 ? O(this._isDirected, arguments[0]) : p(this._isDirected, e, t, s), r = this._edgeObjs[i];
    return r && (e = r.v, t = r.w, delete this._edgeLabels[i], delete this._edgeObjs[i], j(this._preds[t], e), j(this._sucs[e], t), delete this._in[t][i], delete this._out[e][i], this._edgeCount--), this;
  }
  inEdges(e, t) {
    var s = this._in[e];
    if (s) {
      var i = Xr(s);
      return t ? fn(i, function(r) {
        return r.v === t;
      }) : i;
    }
  }
  outEdges(e, t) {
    var s = this._out[e];
    if (s) {
      var i = Xr(s);
      return t ? fn(i, function(r) {
        return r.w === t;
      }) : i;
    }
  }
  nodeEdges(e, t) {
    var s = this.inEdges(e, t);
    if (s) return s.concat(this.outEdges(e, t));
  }
}, m(_a, "Graph"), _a);
m2.prototype._nodeCount = 0;
m2.prototype._edgeCount = 0;
function L(d, e) {
  d[e] ? d[e]++ : d[e] = 1;
}
m(L, "incrementOrInitEntry");
function j(d, e) {
  --d[e] || delete d[e];
}
m(j, "decrementOrRemoveEntry");
function p(d, e, t, s) {
  var i = "" + e, r = "" + t;
  if (!d && i > r) {
    var n = i;
    i = r, r = n;
  }
  return i + v + r + v + (sn(s) ? P : s);
}
m(p, "edgeArgsToId");
function D(d, e, t, s) {
  var i = "" + e, r = "" + t;
  if (!d && i > r) {
    var n = i;
    i = r, r = n;
  }
  var h2 = { v: i, w: r };
  return s && (h2.name = s), h2;
}
m(D, "edgeArgsToObj");
function O(d, e) {
  return p(d, e.v, e.w, e.name);
}
m(O, "edgeObjToId");

export {
  m2 as m
};
//# sourceMappingURL=chunk-NVNIWB3X.js.map

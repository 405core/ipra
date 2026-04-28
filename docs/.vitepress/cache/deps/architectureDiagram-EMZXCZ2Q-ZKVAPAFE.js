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
import {
  ra
} from "./chunk-D7XFU3CV.js";
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Lr,
  Qn,
  mt,
  ve
} from "./chunk-GYGMMI4F.js";
import {
  Jt,
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  _o,
  as,
  es,
  hs,
  ls,
  ns,
  oo,
  os,
  qo,
  ss,
  st
} from "./chunk-HPIGS4CQ.js";
import {
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m,
  o,
  r
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/architectureDiagram-EMZXCZ2Q.mjs
var xe = o((se, Me) => {
  "use strict";
  m(function(C, T) {
    typeof se == "object" && typeof Me == "object" ? Me.exports = T() : typeof define == "function" && define.amd ? define([], T) : typeof se == "object" ? se.layoutBase = T() : C.layoutBase = T();
  }, "webpackUniversalModuleDefinition")(se, function() {
    return function(D) {
      var C = {};
      function T(g) {
        if (C[g]) return C[g].exports;
        var l = C[g] = { i: g, l: false, exports: {} };
        return D[g].call(l.exports, l, l.exports, T), l.l = true, l.exports;
      }
      return m(T, "__webpack_require__"), T.m = D, T.c = C, T.i = function(g) {
        return g;
      }, T.d = function(g, l, a) {
        T.o(g, l) || Object.defineProperty(g, l, { configurable: false, enumerable: true, get: a });
      }, T.n = function(g) {
        var l = g && g.__esModule ? m(function() {
          return g.default;
        }, "getDefault") : m(function() {
          return g;
        }, "getModuleExports");
        return T.d(l, "a", l), l;
      }, T.o = function(g, l) {
        return Object.prototype.hasOwnProperty.call(g, l);
      }, T.p = "", T(T.s = 28);
    }([function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "LayoutConstants"), g.QUALITY = 1, g.DEFAULT_CREATE_BENDS_AS_NEEDED = false, g.DEFAULT_INCREMENTAL = false, g.DEFAULT_ANIMATION_ON_LAYOUT = true, g.DEFAULT_ANIMATION_DURING_LAYOUT = false, g.DEFAULT_ANIMATION_PERIOD = 50, g.DEFAULT_UNIFORM_LEAF_NODE_SIZES = false, g.DEFAULT_GRAPH_MARGIN = 15, g.NODE_DIMENSIONS_INCLUDE_LABELS = false, g.SIMPLE_NODE_SIZE = 40, g.SIMPLE_NODE_HALF_SIZE = g.SIMPLE_NODE_SIZE / 2, g.EMPTY_COMPOUND_NODE_SIZE = 40, g.MIN_EDGE_LENGTH = 1, g.WORLD_BOUNDARY = 1e6, g.INITIAL_WORLD_BOUNDARY = g.WORLD_BOUNDARY / 1e3, g.WORLD_CENTER_X = 1200, g.WORLD_CENTER_Y = 900, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = T(2), l = T(8), a = T(9);
      function i(c2, t, u) {
        g.call(this, u), this.isOverlapingSourceAndTarget = false, this.vGraphObject = u, this.bendpoints = [], this.source = c2, this.target = t;
      }
      m(i, "LEdge"), i.prototype = Object.create(g.prototype);
      for (var n in g) i[n] = g[n];
      i.prototype.getSource = function() {
        return this.source;
      }, i.prototype.getTarget = function() {
        return this.target;
      }, i.prototype.isInterGraph = function() {
        return this.isInterGraph;
      }, i.prototype.getLength = function() {
        return this.length;
      }, i.prototype.isOverlapingSourceAndTarget = function() {
        return this.isOverlapingSourceAndTarget;
      }, i.prototype.getBendpoints = function() {
        return this.bendpoints;
      }, i.prototype.getLca = function() {
        return this.lca;
      }, i.prototype.getSourceInLca = function() {
        return this.sourceInLca;
      }, i.prototype.getTargetInLca = function() {
        return this.targetInLca;
      }, i.prototype.getOtherEnd = function(c2) {
        if (this.source === c2) return this.target;
        if (this.target === c2) return this.source;
        throw "Node is not incident with this edge";
      }, i.prototype.getOtherEndInGraph = function(c2, t) {
        for (var u = this.getOtherEnd(c2), e = t.getGraphManager().getRoot(); ; ) {
          if (u.getOwner() == t) return u;
          if (u.getOwner() == e) break;
          u = u.getOwner().getParent();
        }
        return null;
      }, i.prototype.updateLength = function() {
        var c2 = new Array(4);
        this.isOverlapingSourceAndTarget = l.getIntersection(this.target.getRect(), this.source.getRect(), c2), this.isOverlapingSourceAndTarget || (this.lengthX = c2[0] - c2[2], this.lengthY = c2[1] - c2[3], Math.abs(this.lengthX) < 1 && (this.lengthX = a.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = a.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY));
      }, i.prototype.updateLengthSimple = function() {
        this.lengthX = this.target.getCenterX() - this.source.getCenterX(), this.lengthY = this.target.getCenterY() - this.source.getCenterY(), Math.abs(this.lengthX) < 1 && (this.lengthX = a.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = a.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
      }, D.exports = i;
    }, function(D, C, T) {
      "use strict";
      function g(l) {
        this.vGraphObject = l;
      }
      m(g, "LGraphObject"), D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = T(2), l = T(10), a = T(13), i = T(0), n = T(16), c2 = T(5);
      function t(e, r2, h, f) {
        h == null && f == null && (f = r2), g.call(this, f), e.graphManager != null && (e = e.graphManager), this.estimatedSize = l.MIN_VALUE, this.inclusionTreeDepth = l.MAX_VALUE, this.vGraphObject = f, this.edges = [], this.graphManager = e, h != null && r2 != null ? this.rect = new a(r2.x, r2.y, h.width, h.height) : this.rect = new a();
      }
      m(t, "LNode"), t.prototype = Object.create(g.prototype);
      for (var u in g) t[u] = g[u];
      t.prototype.getEdges = function() {
        return this.edges;
      }, t.prototype.getChild = function() {
        return this.child;
      }, t.prototype.getOwner = function() {
        return this.owner;
      }, t.prototype.getWidth = function() {
        return this.rect.width;
      }, t.prototype.setWidth = function(e) {
        this.rect.width = e;
      }, t.prototype.getHeight = function() {
        return this.rect.height;
      }, t.prototype.setHeight = function(e) {
        this.rect.height = e;
      }, t.prototype.getCenterX = function() {
        return this.rect.x + this.rect.width / 2;
      }, t.prototype.getCenterY = function() {
        return this.rect.y + this.rect.height / 2;
      }, t.prototype.getCenter = function() {
        return new c2(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
      }, t.prototype.getLocation = function() {
        return new c2(this.rect.x, this.rect.y);
      }, t.prototype.getRect = function() {
        return this.rect;
      }, t.prototype.getDiagonal = function() {
        return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
      }, t.prototype.getHalfTheDiagonal = function() {
        return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
      }, t.prototype.setRect = function(e, r2) {
        this.rect.x = e.x, this.rect.y = e.y, this.rect.width = r2.width, this.rect.height = r2.height;
      }, t.prototype.setCenter = function(e, r2) {
        this.rect.x = e - this.rect.width / 2, this.rect.y = r2 - this.rect.height / 2;
      }, t.prototype.setLocation = function(e, r2) {
        this.rect.x = e, this.rect.y = r2;
      }, t.prototype.moveBy = function(e, r2) {
        this.rect.x += e, this.rect.y += r2;
      }, t.prototype.getEdgeListToNode = function(e) {
        var r2 = [], h, f = this;
        return f.edges.forEach(function(o2) {
          if (o2.target == e) {
            if (o2.source != f) throw "Incorrect edge source!";
            r2.push(o2);
          }
        }), r2;
      }, t.prototype.getEdgesBetween = function(e) {
        var r2 = [], h, f = this;
        return f.edges.forEach(function(o2) {
          if (!(o2.source == f || o2.target == f)) throw "Incorrect edge source and/or target";
          (o2.target == e || o2.source == e) && r2.push(o2);
        }), r2;
      }, t.prototype.getNeighborsList = function() {
        var e = /* @__PURE__ */ new Set(), r2 = this;
        return r2.edges.forEach(function(h) {
          if (h.source == r2) e.add(h.target);
          else {
            if (h.target != r2) throw "Incorrect incidency!";
            e.add(h.source);
          }
        }), e;
      }, t.prototype.withChildren = function() {
        var e = /* @__PURE__ */ new Set(), r2, h;
        if (e.add(this), this.child != null) for (var f = this.child.getNodes(), o2 = 0; o2 < f.length; o2++) r2 = f[o2], h = r2.withChildren(), h.forEach(function(A) {
          e.add(A);
        });
        return e;
      }, t.prototype.getNoOfChildren = function() {
        var e = 0, r2;
        if (this.child == null) e = 1;
        else for (var h = this.child.getNodes(), f = 0; f < h.length; f++) r2 = h[f], e += r2.getNoOfChildren();
        return e == 0 && (e = 1), e;
      }, t.prototype.getEstimatedSize = function() {
        if (this.estimatedSize == l.MIN_VALUE) throw "assert failed";
        return this.estimatedSize;
      }, t.prototype.calcEstimatedSize = function() {
        return this.child == null ? this.estimatedSize = (this.rect.width + this.rect.height) / 2 : (this.estimatedSize = this.child.calcEstimatedSize(), this.rect.width = this.estimatedSize, this.rect.height = this.estimatedSize, this.estimatedSize);
      }, t.prototype.scatter = function() {
        var e, r2, h = -i.INITIAL_WORLD_BOUNDARY, f = i.INITIAL_WORLD_BOUNDARY;
        e = i.WORLD_CENTER_X + n.nextDouble() * (f - h) + h;
        var o2 = -i.INITIAL_WORLD_BOUNDARY, A = i.INITIAL_WORLD_BOUNDARY;
        r2 = i.WORLD_CENTER_Y + n.nextDouble() * (A - o2) + o2, this.rect.x = e, this.rect.y = r2;
      }, t.prototype.updateBounds = function() {
        if (this.getChild() == null) throw "assert failed";
        if (this.getChild().getNodes().length != 0) {
          var e = this.getChild();
          if (e.updateBounds(true), this.rect.x = e.getLeft(), this.rect.y = e.getTop(), this.setWidth(e.getRight() - e.getLeft()), this.setHeight(e.getBottom() - e.getTop()), i.NODE_DIMENSIONS_INCLUDE_LABELS) {
            var r2 = e.getRight() - e.getLeft(), h = e.getBottom() - e.getTop();
            this.labelWidth && (this.labelPosHorizontal == "left" ? (this.rect.x -= this.labelWidth, this.setWidth(r2 + this.labelWidth)) : this.labelPosHorizontal == "center" && this.labelWidth > r2 ? (this.rect.x -= (this.labelWidth - r2) / 2, this.setWidth(this.labelWidth)) : this.labelPosHorizontal == "right" && this.setWidth(r2 + this.labelWidth)), this.labelHeight && (this.labelPosVertical == "top" ? (this.rect.y -= this.labelHeight, this.setHeight(h + this.labelHeight)) : this.labelPosVertical == "center" && this.labelHeight > h ? (this.rect.y -= (this.labelHeight - h) / 2, this.setHeight(this.labelHeight)) : this.labelPosVertical == "bottom" && this.setHeight(h + this.labelHeight));
          }
        }
      }, t.prototype.getInclusionTreeDepth = function() {
        if (this.inclusionTreeDepth == l.MAX_VALUE) throw "assert failed";
        return this.inclusionTreeDepth;
      }, t.prototype.transform = function(e) {
        var r2 = this.rect.x;
        r2 > i.WORLD_BOUNDARY ? r2 = i.WORLD_BOUNDARY : r2 < -i.WORLD_BOUNDARY && (r2 = -i.WORLD_BOUNDARY);
        var h = this.rect.y;
        h > i.WORLD_BOUNDARY ? h = i.WORLD_BOUNDARY : h < -i.WORLD_BOUNDARY && (h = -i.WORLD_BOUNDARY);
        var f = new c2(r2, h), o2 = e.inverseTransformPoint(f);
        this.setLocation(o2.x, o2.y);
      }, t.prototype.getLeft = function() {
        return this.rect.x;
      }, t.prototype.getRight = function() {
        return this.rect.x + this.rect.width;
      }, t.prototype.getTop = function() {
        return this.rect.y;
      }, t.prototype.getBottom = function() {
        return this.rect.y + this.rect.height;
      }, t.prototype.getParent = function() {
        return this.owner == null ? null : this.owner.getParent();
      }, D.exports = t;
    }, function(D, C, T) {
      "use strict";
      var g = T(0);
      function l() {
      }
      m(l, "FDLayoutConstants");
      for (var a in g) l[a] = g[a];
      l.MAX_ITERATIONS = 2500, l.DEFAULT_EDGE_LENGTH = 50, l.DEFAULT_SPRING_STRENGTH = 0.45, l.DEFAULT_REPULSION_STRENGTH = 4500, l.DEFAULT_GRAVITY_STRENGTH = 0.4, l.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1, l.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8, l.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5, l.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = true, l.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = true, l.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3, l.COOLING_ADAPTATION_FACTOR = 0.33, l.ADAPTATION_LOWER_NODE_LIMIT = 1e3, l.ADAPTATION_UPPER_NODE_LIMIT = 5e3, l.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100, l.MAX_NODE_DISPLACEMENT = l.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3, l.MIN_REPULSION_DIST = l.DEFAULT_EDGE_LENGTH / 10, l.CONVERGENCE_CHECK_PERIOD = 100, l.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1, l.MIN_EDGE_LENGTH = 1, l.GRID_CALCULATION_CHECK_PERIOD = 10, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      function g(l, a) {
        l == null && a == null ? (this.x = 0, this.y = 0) : (this.x = l, this.y = a);
      }
      m(g, "PointD"), g.prototype.getX = function() {
        return this.x;
      }, g.prototype.getY = function() {
        return this.y;
      }, g.prototype.setX = function(l) {
        this.x = l;
      }, g.prototype.setY = function(l) {
        this.y = l;
      }, g.prototype.getDifference = function(l) {
        return new DimensionD(this.x - l.x, this.y - l.y);
      }, g.prototype.getCopy = function() {
        return new g(this.x, this.y);
      }, g.prototype.translate = function(l) {
        return this.x += l.width, this.y += l.height, this;
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = T(2), l = T(10), a = T(0), i = T(7), n = T(3), c2 = T(1), t = T(13), u = T(12), e = T(11);
      function r2(f, o2, A) {
        g.call(this, A), this.estimatedSize = l.MIN_VALUE, this.margin = a.DEFAULT_GRAPH_MARGIN, this.edges = [], this.nodes = [], this.isConnected = false, this.parent = f, o2 != null && o2 instanceof i ? this.graphManager = o2 : o2 != null && o2 instanceof Layout && (this.graphManager = o2.graphManager);
      }
      m(r2, "LGraph"), r2.prototype = Object.create(g.prototype);
      for (var h in g) r2[h] = g[h];
      r2.prototype.getNodes = function() {
        return this.nodes;
      }, r2.prototype.getEdges = function() {
        return this.edges;
      }, r2.prototype.getGraphManager = function() {
        return this.graphManager;
      }, r2.prototype.getParent = function() {
        return this.parent;
      }, r2.prototype.getLeft = function() {
        return this.left;
      }, r2.prototype.getRight = function() {
        return this.right;
      }, r2.prototype.getTop = function() {
        return this.top;
      }, r2.prototype.getBottom = function() {
        return this.bottom;
      }, r2.prototype.isConnected = function() {
        return this.isConnected;
      }, r2.prototype.add = function(f, o2, A) {
        if (o2 == null && A == null) {
          var v = f;
          if (this.graphManager == null) throw "Graph has no graph mgr!";
          if (this.getNodes().indexOf(v) > -1) throw "Node already in graph!";
          return v.owner = this, this.getNodes().push(v), v;
        } else {
          var y = f;
          if (!(this.getNodes().indexOf(o2) > -1 && this.getNodes().indexOf(A) > -1)) throw "Source or target not in graph!";
          if (!(o2.owner == A.owner && o2.owner == this)) throw "Both owners must be this graph!";
          return o2.owner != A.owner ? null : (y.source = o2, y.target = A, y.isInterGraph = false, this.getEdges().push(y), o2.edges.push(y), A != o2 && A.edges.push(y), y);
        }
      }, r2.prototype.remove = function(f) {
        var o2 = f;
        if (f instanceof n) {
          if (o2 == null) throw "Node is null!";
          if (!(o2.owner != null && o2.owner == this)) throw "Owner graph is invalid!";
          if (this.graphManager == null) throw "Owner graph manager is invalid!";
          for (var A = o2.edges.slice(), v, y = A.length, N = 0; N < y; N++) v = A[N], v.isInterGraph ? this.graphManager.remove(v) : v.source.owner.remove(v);
          var S = this.nodes.indexOf(o2);
          if (S == -1) throw "Node not in owner node list!";
          this.nodes.splice(S, 1);
        } else if (f instanceof c2) {
          var v = f;
          if (v == null) throw "Edge is null!";
          if (!(v.source != null && v.target != null)) throw "Source and/or target is null!";
          if (!(v.source.owner != null && v.target.owner != null && v.source.owner == this && v.target.owner == this)) throw "Source and/or target owner is invalid!";
          var w = v.source.edges.indexOf(v), P = v.target.edges.indexOf(v);
          if (!(w > -1 && P > -1)) throw "Source and/or target doesn't know this edge!";
          v.source.edges.splice(w, 1), v.target != v.source && v.target.edges.splice(P, 1);
          var S = v.source.owner.getEdges().indexOf(v);
          if (S == -1) throw "Not in owner's edge list!";
          v.source.owner.getEdges().splice(S, 1);
        }
      }, r2.prototype.updateLeftTop = function() {
        for (var f = l.MAX_VALUE, o2 = l.MAX_VALUE, A, v, y, N = this.getNodes(), S = N.length, w = 0; w < S; w++) {
          var P = N[w];
          A = P.getTop(), v = P.getLeft(), f > A && (f = A), o2 > v && (o2 = v);
        }
        return f == l.MAX_VALUE ? null : (N[0].getParent().paddingLeft != null ? y = N[0].getParent().paddingLeft : y = this.margin, this.left = o2 - y, this.top = f - y, new u(this.left, this.top));
      }, r2.prototype.updateBounds = function(f) {
        for (var o2 = l.MAX_VALUE, A = -l.MAX_VALUE, v = l.MAX_VALUE, y = -l.MAX_VALUE, N, S, w, P, $, X = this.nodes, _ = X.length, R = 0; R < _; R++) {
          var J = X[R];
          f && J.child != null && J.updateBounds(), N = J.getLeft(), S = J.getRight(), w = J.getTop(), P = J.getBottom(), o2 > N && (o2 = N), A < S && (A = S), v > w && (v = w), y < P && (y = P);
        }
        var s = new t(o2, v, A - o2, y - v);
        o2 == l.MAX_VALUE && (this.left = this.parent.getLeft(), this.right = this.parent.getRight(), this.top = this.parent.getTop(), this.bottom = this.parent.getBottom()), X[0].getParent().paddingLeft != null ? $ = X[0].getParent().paddingLeft : $ = this.margin, this.left = s.x - $, this.right = s.x + s.width + $, this.top = s.y - $, this.bottom = s.y + s.height + $;
      }, r2.calculateBounds = function(f) {
        for (var o2 = l.MAX_VALUE, A = -l.MAX_VALUE, v = l.MAX_VALUE, y = -l.MAX_VALUE, N, S, w, P, $ = f.length, X = 0; X < $; X++) {
          var _ = f[X];
          N = _.getLeft(), S = _.getRight(), w = _.getTop(), P = _.getBottom(), o2 > N && (o2 = N), A < S && (A = S), v > w && (v = w), y < P && (y = P);
        }
        var R = new t(o2, v, A - o2, y - v);
        return R;
      }, r2.prototype.getInclusionTreeDepth = function() {
        return this == this.graphManager.getRoot() ? 1 : this.parent.getInclusionTreeDepth();
      }, r2.prototype.getEstimatedSize = function() {
        if (this.estimatedSize == l.MIN_VALUE) throw "assert failed";
        return this.estimatedSize;
      }, r2.prototype.calcEstimatedSize = function() {
        for (var f = 0, o2 = this.nodes, A = o2.length, v = 0; v < A; v++) {
          var y = o2[v];
          f += y.calcEstimatedSize();
        }
        return f == 0 ? this.estimatedSize = a.EMPTY_COMPOUND_NODE_SIZE : this.estimatedSize = f / Math.sqrt(this.nodes.length), this.estimatedSize;
      }, r2.prototype.updateConnected = function() {
        var f = this;
        if (this.nodes.length == 0) {
          this.isConnected = true;
          return;
        }
        var o2 = new e(), A = /* @__PURE__ */ new Set(), v = this.nodes[0], y, N, S = v.withChildren();
        for (S.forEach(function(R) {
          o2.push(R), A.add(R);
        }); o2.length !== 0; ) {
          v = o2.shift(), y = v.getEdges();
          for (var w = y.length, P = 0; P < w; P++) {
            var $ = y[P];
            if (N = $.getOtherEndInGraph(v, this), N != null && !A.has(N)) {
              var X = N.withChildren();
              X.forEach(function(R) {
                o2.push(R), A.add(R);
              });
            }
          }
        }
        if (this.isConnected = false, A.size >= this.nodes.length) {
          var _ = 0;
          A.forEach(function(R) {
            R.owner == f && _++;
          }), _ == this.nodes.length && (this.isConnected = true);
        }
      }, D.exports = r2;
    }, function(D, C, T) {
      "use strict";
      var g, l = T(1);
      function a(i) {
        g = T(6), this.layout = i, this.graphs = [], this.edges = [];
      }
      m(a, "LGraphManager"), a.prototype.addRoot = function() {
        var i = this.layout.newGraph(), n = this.layout.newNode(null), c2 = this.add(i, n);
        return this.setRootGraph(c2), this.rootGraph;
      }, a.prototype.add = function(i, n, c2, t, u) {
        if (c2 == null && t == null && u == null) {
          if (i == null) throw "Graph is null!";
          if (n == null) throw "Parent node is null!";
          if (this.graphs.indexOf(i) > -1) throw "Graph already in this graph mgr!";
          if (this.graphs.push(i), i.parent != null) throw "Already has a parent!";
          if (n.child != null) throw "Already has a child!";
          return i.parent = n, n.child = i, i;
        } else {
          u = c2, t = n, c2 = i;
          var e = t.getOwner(), r2 = u.getOwner();
          if (!(e != null && e.getGraphManager() == this)) throw "Source not in this graph mgr!";
          if (!(r2 != null && r2.getGraphManager() == this)) throw "Target not in this graph mgr!";
          if (e == r2) return c2.isInterGraph = false, e.add(c2, t, u);
          if (c2.isInterGraph = true, c2.source = t, c2.target = u, this.edges.indexOf(c2) > -1) throw "Edge already in inter-graph edge list!";
          if (this.edges.push(c2), !(c2.source != null && c2.target != null)) throw "Edge source and/or target is null!";
          if (!(c2.source.edges.indexOf(c2) == -1 && c2.target.edges.indexOf(c2) == -1)) throw "Edge already in source and/or target incidency list!";
          return c2.source.edges.push(c2), c2.target.edges.push(c2), c2;
        }
      }, a.prototype.remove = function(i) {
        if (i instanceof g) {
          var n = i;
          if (n.getGraphManager() != this) throw "Graph not in this graph mgr";
          if (!(n == this.rootGraph || n.parent != null && n.parent.graphManager == this)) throw "Invalid parent node!";
          var c2 = [];
          c2 = c2.concat(n.getEdges());
          for (var t, u = c2.length, e = 0; e < u; e++) t = c2[e], n.remove(t);
          var r2 = [];
          r2 = r2.concat(n.getNodes());
          var h;
          u = r2.length;
          for (var e = 0; e < u; e++) h = r2[e], n.remove(h);
          n == this.rootGraph && this.setRootGraph(null);
          var f = this.graphs.indexOf(n);
          this.graphs.splice(f, 1), n.parent = null;
        } else if (i instanceof l) {
          if (t = i, t == null) throw "Edge is null!";
          if (!t.isInterGraph) throw "Not an inter-graph edge!";
          if (!(t.source != null && t.target != null)) throw "Source and/or target is null!";
          if (!(t.source.edges.indexOf(t) != -1 && t.target.edges.indexOf(t) != -1)) throw "Source and/or target doesn't know this edge!";
          var f = t.source.edges.indexOf(t);
          if (t.source.edges.splice(f, 1), f = t.target.edges.indexOf(t), t.target.edges.splice(f, 1), !(t.source.owner != null && t.source.owner.getGraphManager() != null)) throw "Edge owner graph or owner graph manager is null!";
          if (t.source.owner.getGraphManager().edges.indexOf(t) == -1) throw "Not in owner graph manager's edge list!";
          var f = t.source.owner.getGraphManager().edges.indexOf(t);
          t.source.owner.getGraphManager().edges.splice(f, 1);
        }
      }, a.prototype.updateBounds = function() {
        this.rootGraph.updateBounds(true);
      }, a.prototype.getGraphs = function() {
        return this.graphs;
      }, a.prototype.getAllNodes = function() {
        if (this.allNodes == null) {
          for (var i = [], n = this.getGraphs(), c2 = n.length, t = 0; t < c2; t++) i = i.concat(n[t].getNodes());
          this.allNodes = i;
        }
        return this.allNodes;
      }, a.prototype.resetAllNodes = function() {
        this.allNodes = null;
      }, a.prototype.resetAllEdges = function() {
        this.allEdges = null;
      }, a.prototype.resetAllNodesToApplyGravitation = function() {
        this.allNodesToApplyGravitation = null;
      }, a.prototype.getAllEdges = function() {
        if (this.allEdges == null) {
          for (var i = [], n = this.getGraphs(), c2 = n.length, t = 0; t < n.length; t++) i = i.concat(n[t].getEdges());
          i = i.concat(this.edges), this.allEdges = i;
        }
        return this.allEdges;
      }, a.prototype.getAllNodesToApplyGravitation = function() {
        return this.allNodesToApplyGravitation;
      }, a.prototype.setAllNodesToApplyGravitation = function(i) {
        if (this.allNodesToApplyGravitation != null) throw "assert failed";
        this.allNodesToApplyGravitation = i;
      }, a.prototype.getRoot = function() {
        return this.rootGraph;
      }, a.prototype.setRootGraph = function(i) {
        if (i.getGraphManager() != this) throw "Root not in this graph mgr!";
        this.rootGraph = i, i.parent == null && (i.parent = this.layout.newNode("Root node"));
      }, a.prototype.getLayout = function() {
        return this.layout;
      }, a.prototype.isOneAncestorOfOther = function(i, n) {
        if (!(i != null && n != null)) throw "assert failed";
        if (i == n) return true;
        var c2 = i.getOwner(), t;
        do {
          if (t = c2.getParent(), t == null) break;
          if (t == n) return true;
          if (c2 = t.getOwner(), c2 == null) break;
        } while (true);
        c2 = n.getOwner();
        do {
          if (t = c2.getParent(), t == null) break;
          if (t == i) return true;
          if (c2 = t.getOwner(), c2 == null) break;
        } while (true);
        return false;
      }, a.prototype.calcLowestCommonAncestors = function() {
        for (var i, n, c2, t, u, e = this.getAllEdges(), r2 = e.length, h = 0; h < r2; h++) {
          if (i = e[h], n = i.source, c2 = i.target, i.lca = null, i.sourceInLca = n, i.targetInLca = c2, n == c2) {
            i.lca = n.getOwner();
            continue;
          }
          for (t = n.getOwner(); i.lca == null; ) {
            for (i.targetInLca = c2, u = c2.getOwner(); i.lca == null; ) {
              if (u == t) {
                i.lca = u;
                break;
              }
              if (u == this.rootGraph) break;
              if (i.lca != null) throw "assert failed";
              i.targetInLca = u.getParent(), u = i.targetInLca.getOwner();
            }
            if (t == this.rootGraph) break;
            i.lca == null && (i.sourceInLca = t.getParent(), t = i.sourceInLca.getOwner());
          }
          if (i.lca == null) throw "assert failed";
        }
      }, a.prototype.calcLowestCommonAncestor = function(i, n) {
        if (i == n) return i.getOwner();
        var c2 = i.getOwner();
        do {
          if (c2 == null) break;
          var t = n.getOwner();
          do {
            if (t == null) break;
            if (t == c2) return t;
            t = t.getParent().getOwner();
          } while (true);
          c2 = c2.getParent().getOwner();
        } while (true);
        return c2;
      }, a.prototype.calcInclusionTreeDepths = function(i, n) {
        i == null && n == null && (i = this.rootGraph, n = 1);
        for (var c2, t = i.getNodes(), u = t.length, e = 0; e < u; e++) c2 = t[e], c2.inclusionTreeDepth = n, c2.child != null && this.calcInclusionTreeDepths(c2.child, n + 1);
      }, a.prototype.includesInvalidEdge = function() {
        for (var i, n = [], c2 = this.edges.length, t = 0; t < c2; t++) i = this.edges[t], this.isOneAncestorOfOther(i.source, i.target) && n.push(i);
        for (var t = 0; t < n.length; t++) this.remove(n[t]);
        return false;
      }, D.exports = a;
    }, function(D, C, T) {
      "use strict";
      var g = T(12);
      function l() {
      }
      m(l, "IGeometry"), l.calcSeparationAmount = function(a, i, n, c2) {
        if (!a.intersects(i)) throw "assert failed";
        var t = new Array(2);
        this.decideDirectionsForOverlappingNodes(a, i, t), n[0] = Math.min(a.getRight(), i.getRight()) - Math.max(a.x, i.x), n[1] = Math.min(a.getBottom(), i.getBottom()) - Math.max(a.y, i.y), a.getX() <= i.getX() && a.getRight() >= i.getRight() ? n[0] += Math.min(i.getX() - a.getX(), a.getRight() - i.getRight()) : i.getX() <= a.getX() && i.getRight() >= a.getRight() && (n[0] += Math.min(a.getX() - i.getX(), i.getRight() - a.getRight())), a.getY() <= i.getY() && a.getBottom() >= i.getBottom() ? n[1] += Math.min(i.getY() - a.getY(), a.getBottom() - i.getBottom()) : i.getY() <= a.getY() && i.getBottom() >= a.getBottom() && (n[1] += Math.min(a.getY() - i.getY(), i.getBottom() - a.getBottom()));
        var u = Math.abs((i.getCenterY() - a.getCenterY()) / (i.getCenterX() - a.getCenterX()));
        i.getCenterY() === a.getCenterY() && i.getCenterX() === a.getCenterX() && (u = 1);
        var e = u * n[0], r2 = n[1] / u;
        n[0] < r2 ? r2 = n[0] : e = n[1], n[0] = -1 * t[0] * (r2 / 2 + c2), n[1] = -1 * t[1] * (e / 2 + c2);
      }, l.decideDirectionsForOverlappingNodes = function(a, i, n) {
        a.getCenterX() < i.getCenterX() ? n[0] = -1 : n[0] = 1, a.getCenterY() < i.getCenterY() ? n[1] = -1 : n[1] = 1;
      }, l.getIntersection2 = function(a, i, n) {
        var c2 = a.getCenterX(), t = a.getCenterY(), u = i.getCenterX(), e = i.getCenterY();
        if (a.intersects(i)) return n[0] = c2, n[1] = t, n[2] = u, n[3] = e, true;
        var r2 = a.getX(), h = a.getY(), f = a.getRight(), o2 = a.getX(), A = a.getBottom(), v = a.getRight(), y = a.getWidthHalf(), N = a.getHeightHalf(), S = i.getX(), w = i.getY(), P = i.getRight(), $ = i.getX(), X = i.getBottom(), _ = i.getRight(), R = i.getWidthHalf(), J = i.getHeightHalf(), s = false, m2 = false;
        if (c2 === u) {
          if (t > e) return n[0] = c2, n[1] = h, n[2] = u, n[3] = X, false;
          if (t < e) return n[0] = c2, n[1] = A, n[2] = u, n[3] = w, false;
        } else if (t === e) {
          if (c2 > u) return n[0] = r2, n[1] = t, n[2] = P, n[3] = e, false;
          if (c2 < u) return n[0] = f, n[1] = t, n[2] = S, n[3] = e, false;
        } else {
          var p = a.height / a.width, E = i.height / i.width, d3 = (e - t) / (u - c2), O = void 0, x = void 0, G = void 0, b = void 0, I = void 0, Z = void 0;
          if (-p === d3 ? c2 > u ? (n[0] = o2, n[1] = A, s = true) : (n[0] = f, n[1] = h, s = true) : p === d3 && (c2 > u ? (n[0] = r2, n[1] = h, s = true) : (n[0] = v, n[1] = A, s = true)), -E === d3 ? u > c2 ? (n[2] = $, n[3] = X, m2 = true) : (n[2] = P, n[3] = w, m2 = true) : E === d3 && (u > c2 ? (n[2] = S, n[3] = w, m2 = true) : (n[2] = _, n[3] = X, m2 = true)), s && m2) return false;
          if (c2 > u ? t > e ? (O = this.getCardinalDirection(p, d3, 4), x = this.getCardinalDirection(E, d3, 2)) : (O = this.getCardinalDirection(-p, d3, 3), x = this.getCardinalDirection(-E, d3, 1)) : t > e ? (O = this.getCardinalDirection(-p, d3, 1), x = this.getCardinalDirection(-E, d3, 3)) : (O = this.getCardinalDirection(p, d3, 2), x = this.getCardinalDirection(E, d3, 4)), !s) switch (O) {
            case 1:
              b = h, G = c2 + -N / d3, n[0] = G, n[1] = b;
              break;
            case 2:
              G = v, b = t + y * d3, n[0] = G, n[1] = b;
              break;
            case 3:
              b = A, G = c2 + N / d3, n[0] = G, n[1] = b;
              break;
            case 4:
              G = o2, b = t + -y * d3, n[0] = G, n[1] = b;
              break;
          }
          if (!m2) switch (x) {
            case 1:
              Z = w, I = u + -J / d3, n[2] = I, n[3] = Z;
              break;
            case 2:
              I = _, Z = e + R * d3, n[2] = I, n[3] = Z;
              break;
            case 3:
              Z = X, I = u + J / d3, n[2] = I, n[3] = Z;
              break;
            case 4:
              I = $, Z = e + -R * d3, n[2] = I, n[3] = Z;
              break;
          }
        }
        return false;
      }, l.getCardinalDirection = function(a, i, n) {
        return a > i ? n : 1 + n % 4;
      }, l.getIntersection = function(a, i, n, c2) {
        if (c2 == null) return this.getIntersection2(a, i, n);
        var t = a.x, u = a.y, e = i.x, r2 = i.y, h = n.x, f = n.y, o2 = c2.x, A = c2.y, v = void 0, y = void 0, N = void 0, S = void 0, w = void 0, P = void 0, $ = void 0, X = void 0, _ = void 0;
        return N = r2 - u, w = t - e, $ = e * u - t * r2, S = A - f, P = h - o2, X = o2 * f - h * A, _ = N * P - S * w, _ === 0 ? null : (v = (w * X - P * $) / _, y = (S * $ - N * X) / _, new g(v, y));
      }, l.angleOfVector = function(a, i, n, c2) {
        var t = void 0;
        return a !== n ? (t = Math.atan((c2 - i) / (n - a)), n < a ? t += Math.PI : c2 < i && (t += this.TWO_PI)) : c2 < i ? t = this.ONE_AND_HALF_PI : t = this.HALF_PI, t;
      }, l.doIntersect = function(a, i, n, c2) {
        var t = a.x, u = a.y, e = i.x, r2 = i.y, h = n.x, f = n.y, o2 = c2.x, A = c2.y, v = (e - t) * (A - f) - (o2 - h) * (r2 - u);
        if (v === 0) return false;
        var y = ((A - f) * (o2 - t) + (h - o2) * (A - u)) / v, N = ((u - r2) * (o2 - t) + (e - t) * (A - u)) / v;
        return 0 < y && y < 1 && 0 < N && N < 1;
      }, l.findCircleLineIntersections = function(a, i, n, c2, t, u, e) {
        var r2 = (n - a) * (n - a) + (c2 - i) * (c2 - i), h = 2 * ((a - t) * (n - a) + (i - u) * (c2 - i)), f = (a - t) * (a - t) + (i - u) * (i - u) - e * e, o2 = h * h - 4 * r2 * f;
        if (o2 >= 0) {
          var A = (-h + Math.sqrt(h * h - 4 * r2 * f)) / (2 * r2), v = (-h - Math.sqrt(h * h - 4 * r2 * f)) / (2 * r2), y = null;
          return A >= 0 && A <= 1 ? [A] : v >= 0 && v <= 1 ? [v] : y;
        } else return null;
      }, l.HALF_PI = 0.5 * Math.PI, l.ONE_AND_HALF_PI = 1.5 * Math.PI, l.TWO_PI = 2 * Math.PI, l.THREE_PI = 3 * Math.PI, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "IMath"), g.sign = function(l) {
        return l > 0 ? 1 : l < 0 ? -1 : 0;
      }, g.floor = function(l) {
        return l < 0 ? Math.ceil(l) : Math.floor(l);
      }, g.ceil = function(l) {
        return l < 0 ? Math.floor(l) : Math.ceil(l);
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "Integer"), g.MAX_VALUE = 2147483647, g.MIN_VALUE = -2147483648, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = function() {
        function t(u, e) {
          for (var r2 = 0; r2 < e.length; r2++) {
            var h = e[r2];
            h.enumerable = h.enumerable || false, h.configurable = true, "value" in h && (h.writable = true), Object.defineProperty(u, h.key, h);
          }
        }
        return m(t, "defineProperties"), function(u, e, r2) {
          return e && t(u.prototype, e), r2 && t(u, r2), u;
        };
      }();
      function l(t, u) {
        if (!(t instanceof u)) throw new TypeError("Cannot call a class as a function");
      }
      m(l, "_classCallCheck");
      var a = m(function(u) {
        return { value: u, next: null, prev: null };
      }, "nodeFrom"), i = m(function(u, e, r2, h) {
        return u !== null ? u.next = e : h.head = e, r2 !== null ? r2.prev = e : h.tail = e, e.prev = u, e.next = r2, h.length++, e;
      }, "add"), n = m(function(u, e) {
        var r2 = u.prev, h = u.next;
        return r2 !== null ? r2.next = h : e.head = h, h !== null ? h.prev = r2 : e.tail = r2, u.prev = u.next = null, e.length--, u;
      }, "_remove"), c2 = function() {
        function t(u) {
          var e = this;
          l(this, t), this.length = 0, this.head = null, this.tail = null, u == null ? void 0 : u.forEach(function(r2) {
            return e.push(r2);
          });
        }
        return m(t, "LinkedList"), g(t, [{ key: "size", value: m(function() {
          return this.length;
        }, "size") }, { key: "insertBefore", value: m(function(e, r2) {
          return i(r2.prev, a(e), r2, this);
        }, "insertBefore") }, { key: "insertAfter", value: m(function(e, r2) {
          return i(r2, a(e), r2.next, this);
        }, "insertAfter") }, { key: "insertNodeBefore", value: m(function(e, r2) {
          return i(r2.prev, e, r2, this);
        }, "insertNodeBefore") }, { key: "insertNodeAfter", value: m(function(e, r2) {
          return i(r2, e, r2.next, this);
        }, "insertNodeAfter") }, { key: "push", value: m(function(e) {
          return i(this.tail, a(e), null, this);
        }, "push") }, { key: "unshift", value: m(function(e) {
          return i(null, a(e), this.head, this);
        }, "unshift") }, { key: "remove", value: m(function(e) {
          return n(e, this);
        }, "remove") }, { key: "pop", value: m(function() {
          return n(this.tail, this).value;
        }, "pop") }, { key: "popNode", value: m(function() {
          return n(this.tail, this);
        }, "popNode") }, { key: "shift", value: m(function() {
          return n(this.head, this).value;
        }, "shift") }, { key: "shiftNode", value: m(function() {
          return n(this.head, this);
        }, "shiftNode") }, { key: "get_object_at", value: m(function(e) {
          if (e <= this.length()) {
            for (var r2 = 1, h = this.head; r2 < e; ) h = h.next, r2++;
            return h.value;
          }
        }, "get_object_at") }, { key: "set_object_at", value: m(function(e, r2) {
          if (e <= this.length()) {
            for (var h = 1, f = this.head; h < e; ) f = f.next, h++;
            f.value = r2;
          }
        }, "set_object_at") }]), t;
      }();
      D.exports = c2;
    }, function(D, C, T) {
      "use strict";
      function g(l, a, i) {
        this.x = null, this.y = null, l == null && a == null && i == null ? (this.x = 0, this.y = 0) : typeof l == "number" && typeof a == "number" && i == null ? (this.x = l, this.y = a) : l.constructor.name == "Point" && a == null && i == null && (i = l, this.x = i.x, this.y = i.y);
      }
      m(g, "Point"), g.prototype.getX = function() {
        return this.x;
      }, g.prototype.getY = function() {
        return this.y;
      }, g.prototype.getLocation = function() {
        return new g(this.x, this.y);
      }, g.prototype.setLocation = function(l, a, i) {
        l.constructor.name == "Point" && a == null && i == null ? (i = l, this.setLocation(i.x, i.y)) : typeof l == "number" && typeof a == "number" && i == null && (parseInt(l) == l && parseInt(a) == a ? this.move(l, a) : (this.x = Math.floor(l + 0.5), this.y = Math.floor(a + 0.5)));
      }, g.prototype.move = function(l, a) {
        this.x = l, this.y = a;
      }, g.prototype.translate = function(l, a) {
        this.x += l, this.y += a;
      }, g.prototype.equals = function(l) {
        if (l.constructor.name == "Point") {
          var a = l;
          return this.x == a.x && this.y == a.y;
        }
        return this == l;
      }, g.prototype.toString = function() {
        return new g().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      function g(l, a, i, n) {
        this.x = 0, this.y = 0, this.width = 0, this.height = 0, l != null && a != null && i != null && n != null && (this.x = l, this.y = a, this.width = i, this.height = n);
      }
      m(g, "RectangleD"), g.prototype.getX = function() {
        return this.x;
      }, g.prototype.setX = function(l) {
        this.x = l;
      }, g.prototype.getY = function() {
        return this.y;
      }, g.prototype.setY = function(l) {
        this.y = l;
      }, g.prototype.getWidth = function() {
        return this.width;
      }, g.prototype.setWidth = function(l) {
        this.width = l;
      }, g.prototype.getHeight = function() {
        return this.height;
      }, g.prototype.setHeight = function(l) {
        this.height = l;
      }, g.prototype.getRight = function() {
        return this.x + this.width;
      }, g.prototype.getBottom = function() {
        return this.y + this.height;
      }, g.prototype.intersects = function(l) {
        return !(this.getRight() < l.x || this.getBottom() < l.y || l.getRight() < this.x || l.getBottom() < this.y);
      }, g.prototype.getCenterX = function() {
        return this.x + this.width / 2;
      }, g.prototype.getMinX = function() {
        return this.getX();
      }, g.prototype.getMaxX = function() {
        return this.getX() + this.width;
      }, g.prototype.getCenterY = function() {
        return this.y + this.height / 2;
      }, g.prototype.getMinY = function() {
        return this.getY();
      }, g.prototype.getMaxY = function() {
        return this.getY() + this.height;
      }, g.prototype.getWidthHalf = function() {
        return this.width / 2;
      }, g.prototype.getHeightHalf = function() {
        return this.height / 2;
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
        return typeof a;
      } : function(a) {
        return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
      };
      function l() {
      }
      m(l, "UniqueIDGeneretor"), l.lastID = 0, l.createID = function(a) {
        return l.isPrimitive(a) ? a : (a.uniqueID != null || (a.uniqueID = l.getString(), l.lastID++), a.uniqueID);
      }, l.getString = function(a) {
        return a == null && (a = l.lastID), "Object#" + a;
      }, l.isPrimitive = function(a) {
        var i = typeof a > "u" ? "undefined" : g(a);
        return a == null || i != "object" && i != "function";
      }, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      function g(h) {
        if (Array.isArray(h)) {
          for (var f = 0, o2 = Array(h.length); f < h.length; f++) o2[f] = h[f];
          return o2;
        } else return Array.from(h);
      }
      m(g, "_toConsumableArray");
      var l = T(0), a = T(7), i = T(3), n = T(1), c2 = T(6), t = T(5), u = T(17), e = T(29);
      function r2(h) {
        e.call(this), this.layoutQuality = l.QUALITY, this.createBendsAsNeeded = l.DEFAULT_CREATE_BENDS_AS_NEEDED, this.incremental = l.DEFAULT_INCREMENTAL, this.animationOnLayout = l.DEFAULT_ANIMATION_ON_LAYOUT, this.animationDuringLayout = l.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = l.DEFAULT_ANIMATION_PERIOD, this.uniformLeafNodeSizes = l.DEFAULT_UNIFORM_LEAF_NODE_SIZES, this.edgeToDummyNodes = /* @__PURE__ */ new Map(), this.graphManager = new a(this), this.isLayoutFinished = false, this.isSubLayout = false, this.isRemoteUse = false, h != null && (this.isRemoteUse = h);
      }
      m(r2, "Layout"), r2.RANDOM_SEED = 1, r2.prototype = Object.create(e.prototype), r2.prototype.getGraphManager = function() {
        return this.graphManager;
      }, r2.prototype.getAllNodes = function() {
        return this.graphManager.getAllNodes();
      }, r2.prototype.getAllEdges = function() {
        return this.graphManager.getAllEdges();
      }, r2.prototype.getAllNodesToApplyGravitation = function() {
        return this.graphManager.getAllNodesToApplyGravitation();
      }, r2.prototype.newGraphManager = function() {
        var h = new a(this);
        return this.graphManager = h, h;
      }, r2.prototype.newGraph = function(h) {
        return new c2(null, this.graphManager, h);
      }, r2.prototype.newNode = function(h) {
        return new i(this.graphManager, h);
      }, r2.prototype.newEdge = function(h) {
        return new n(null, null, h);
      }, r2.prototype.checkLayoutSuccess = function() {
        return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
      }, r2.prototype.runLayout = function() {
        this.isLayoutFinished = false, this.tilingPreLayout && this.tilingPreLayout(), this.initParameters();
        var h;
        return this.checkLayoutSuccess() ? h = false : h = this.layout(), l.ANIMATE === "during" ? false : (h && (this.isSubLayout || this.doPostLayout()), this.tilingPostLayout && this.tilingPostLayout(), this.isLayoutFinished = true, h);
      }, r2.prototype.doPostLayout = function() {
        this.incremental || this.transform(), this.update();
      }, r2.prototype.update2 = function() {
        if (this.createBendsAsNeeded && (this.createBendpointsFromDummyNodes(), this.graphManager.resetAllEdges()), !this.isRemoteUse) {
          for (var h, f = this.graphManager.getAllEdges(), o2 = 0; o2 < f.length; o2++) h = f[o2];
          for (var A, v = this.graphManager.getRoot().getNodes(), o2 = 0; o2 < v.length; o2++) A = v[o2];
          this.update(this.graphManager.getRoot());
        }
      }, r2.prototype.update = function(h) {
        if (h == null) this.update2();
        else if (h instanceof i) {
          var f = h;
          if (f.getChild() != null) for (var o2 = f.getChild().getNodes(), A = 0; A < o2.length; A++) update(o2[A]);
          if (f.vGraphObject != null) {
            var v = f.vGraphObject;
            v.update(f);
          }
        } else if (h instanceof n) {
          var y = h;
          if (y.vGraphObject != null) {
            var N = y.vGraphObject;
            N.update(y);
          }
        } else if (h instanceof c2) {
          var S = h;
          if (S.vGraphObject != null) {
            var w = S.vGraphObject;
            w.update(S);
          }
        }
      }, r2.prototype.initParameters = function() {
        this.isSubLayout || (this.layoutQuality = l.QUALITY, this.animationDuringLayout = l.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = l.DEFAULT_ANIMATION_PERIOD, this.animationOnLayout = l.DEFAULT_ANIMATION_ON_LAYOUT, this.incremental = l.DEFAULT_INCREMENTAL, this.createBendsAsNeeded = l.DEFAULT_CREATE_BENDS_AS_NEEDED, this.uniformLeafNodeSizes = l.DEFAULT_UNIFORM_LEAF_NODE_SIZES), this.animationDuringLayout && (this.animationOnLayout = false);
      }, r2.prototype.transform = function(h) {
        if (h == null) this.transform(new t(0, 0));
        else {
          var f = new u(), o2 = this.graphManager.getRoot().updateLeftTop();
          if (o2 != null) {
            f.setWorldOrgX(h.x), f.setWorldOrgY(h.y), f.setDeviceOrgX(o2.x), f.setDeviceOrgY(o2.y);
            for (var A = this.getAllNodes(), v, y = 0; y < A.length; y++) v = A[y], v.transform(f);
          }
        }
      }, r2.prototype.positionNodesRandomly = function(h) {
        if (h == null) this.positionNodesRandomly(this.getGraphManager().getRoot()), this.getGraphManager().getRoot().updateBounds(true);
        else for (var f, o2, A = h.getNodes(), v = 0; v < A.length; v++) f = A[v], o2 = f.getChild(), o2 == null || o2.getNodes().length == 0 ? f.scatter() : (this.positionNodesRandomly(o2), f.updateBounds());
      }, r2.prototype.getFlatForest = function() {
        for (var h = [], f = true, o2 = this.graphManager.getRoot().getNodes(), A = true, v = 0; v < o2.length; v++) o2[v].getChild() != null && (A = false);
        if (!A) return h;
        var y = /* @__PURE__ */ new Set(), N = [], S = /* @__PURE__ */ new Map(), w = [];
        for (w = w.concat(o2); w.length > 0 && f; ) {
          for (N.push(w[0]); N.length > 0 && f; ) {
            var P = N[0];
            N.splice(0, 1), y.add(P);
            for (var $ = P.getEdges(), v = 0; v < $.length; v++) {
              var X = $[v].getOtherEnd(P);
              if (S.get(P) != X) if (!y.has(X)) N.push(X), S.set(X, P);
              else {
                f = false;
                break;
              }
            }
          }
          if (!f) h = [];
          else {
            var _ = [].concat(g(y));
            h.push(_);
            for (var v = 0; v < _.length; v++) {
              var R = _[v], J = w.indexOf(R);
              J > -1 && w.splice(J, 1);
            }
            y = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Map();
          }
        }
        return h;
      }, r2.prototype.createDummyNodesForBendpoints = function(h) {
        for (var f = [], o2 = h.source, A = this.graphManager.calcLowestCommonAncestor(h.source, h.target), v = 0; v < h.bendpoints.length; v++) {
          var y = this.newNode(null);
          y.setRect(new Point(0, 0), new Dimension(1, 1)), A.add(y);
          var N = this.newEdge(null);
          this.graphManager.add(N, o2, y), f.add(y), o2 = y;
        }
        var N = this.newEdge(null);
        return this.graphManager.add(N, o2, h.target), this.edgeToDummyNodes.set(h, f), h.isInterGraph() ? this.graphManager.remove(h) : A.remove(h), f;
      }, r2.prototype.createBendpointsFromDummyNodes = function() {
        var h = [];
        h = h.concat(this.graphManager.getAllEdges()), h = [].concat(g(this.edgeToDummyNodes.keys())).concat(h);
        for (var f = 0; f < h.length; f++) {
          var o2 = h[f];
          if (o2.bendpoints.length > 0) {
            for (var A = this.edgeToDummyNodes.get(o2), v = 0; v < A.length; v++) {
              var y = A[v], N = new t(y.getCenterX(), y.getCenterY()), S = o2.bendpoints.get(v);
              S.x = N.x, S.y = N.y, y.getOwner().remove(y);
            }
            this.graphManager.add(o2, o2.source, o2.target);
          }
        }
      }, r2.transform = function(h, f, o2, A) {
        if (o2 != null && A != null) {
          var v = f;
          if (h <= 50) {
            var y = f / o2;
            v -= (f - y) / 50 * (50 - h);
          } else {
            var N = f * A;
            v += (N - f) / 50 * (h - 50);
          }
          return v;
        } else {
          var S, w;
          return h <= 50 ? (S = 9 * f / 500, w = f / 10) : (S = 9 * f / 50, w = -8 * f), S * h + w;
        }
      }, r2.findCenterOfTree = function(h) {
        var f = [];
        f = f.concat(h);
        var o2 = [], A = /* @__PURE__ */ new Map(), v = false, y = null;
        (f.length == 1 || f.length == 2) && (v = true, y = f[0]);
        for (var N = 0; N < f.length; N++) {
          var S = f[N], w = S.getNeighborsList().size;
          A.set(S, S.getNeighborsList().size), w == 1 && o2.push(S);
        }
        var P = [];
        for (P = P.concat(o2); !v; ) {
          var $ = [];
          $ = $.concat(P), P = [];
          for (var N = 0; N < f.length; N++) {
            var S = f[N], X = f.indexOf(S);
            X >= 0 && f.splice(X, 1);
            var _ = S.getNeighborsList();
            _.forEach(function(s) {
              if (o2.indexOf(s) < 0) {
                var m2 = A.get(s), p = m2 - 1;
                p == 1 && P.push(s), A.set(s, p);
              }
            });
          }
          o2 = o2.concat(P), (f.length == 1 || f.length == 2) && (v = true, y = f[0]);
        }
        return y;
      }, r2.prototype.setGraphManager = function(h) {
        this.graphManager = h;
      }, D.exports = r2;
    }, function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "RandomSeed"), g.seed = 1, g.x = 0, g.nextDouble = function() {
        return g.x = Math.sin(g.seed++) * 1e4, g.x - Math.floor(g.x);
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = T(5);
      function l(a, i) {
        this.lworldOrgX = 0, this.lworldOrgY = 0, this.ldeviceOrgX = 0, this.ldeviceOrgY = 0, this.lworldExtX = 1, this.lworldExtY = 1, this.ldeviceExtX = 1, this.ldeviceExtY = 1;
      }
      m(l, "Transform"), l.prototype.getWorldOrgX = function() {
        return this.lworldOrgX;
      }, l.prototype.setWorldOrgX = function(a) {
        this.lworldOrgX = a;
      }, l.prototype.getWorldOrgY = function() {
        return this.lworldOrgY;
      }, l.prototype.setWorldOrgY = function(a) {
        this.lworldOrgY = a;
      }, l.prototype.getWorldExtX = function() {
        return this.lworldExtX;
      }, l.prototype.setWorldExtX = function(a) {
        this.lworldExtX = a;
      }, l.prototype.getWorldExtY = function() {
        return this.lworldExtY;
      }, l.prototype.setWorldExtY = function(a) {
        this.lworldExtY = a;
      }, l.prototype.getDeviceOrgX = function() {
        return this.ldeviceOrgX;
      }, l.prototype.setDeviceOrgX = function(a) {
        this.ldeviceOrgX = a;
      }, l.prototype.getDeviceOrgY = function() {
        return this.ldeviceOrgY;
      }, l.prototype.setDeviceOrgY = function(a) {
        this.ldeviceOrgY = a;
      }, l.prototype.getDeviceExtX = function() {
        return this.ldeviceExtX;
      }, l.prototype.setDeviceExtX = function(a) {
        this.ldeviceExtX = a;
      }, l.prototype.getDeviceExtY = function() {
        return this.ldeviceExtY;
      }, l.prototype.setDeviceExtY = function(a) {
        this.ldeviceExtY = a;
      }, l.prototype.transformX = function(a) {
        var i = 0, n = this.lworldExtX;
        return n != 0 && (i = this.ldeviceOrgX + (a - this.lworldOrgX) * this.ldeviceExtX / n), i;
      }, l.prototype.transformY = function(a) {
        var i = 0, n = this.lworldExtY;
        return n != 0 && (i = this.ldeviceOrgY + (a - this.lworldOrgY) * this.ldeviceExtY / n), i;
      }, l.prototype.inverseTransformX = function(a) {
        var i = 0, n = this.ldeviceExtX;
        return n != 0 && (i = this.lworldOrgX + (a - this.ldeviceOrgX) * this.lworldExtX / n), i;
      }, l.prototype.inverseTransformY = function(a) {
        var i = 0, n = this.ldeviceExtY;
        return n != 0 && (i = this.lworldOrgY + (a - this.ldeviceOrgY) * this.lworldExtY / n), i;
      }, l.prototype.inverseTransformPoint = function(a) {
        var i = new g(this.inverseTransformX(a.x), this.inverseTransformY(a.y));
        return i;
      }, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      function g(e) {
        if (Array.isArray(e)) {
          for (var r2 = 0, h = Array(e.length); r2 < e.length; r2++) h[r2] = e[r2];
          return h;
        } else return Array.from(e);
      }
      m(g, "_toConsumableArray");
      var l = T(15), a = T(4), i = T(0), n = T(8), c2 = T(9);
      function t() {
        l.call(this), this.useSmartIdealEdgeLengthCalculation = a.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.gravityConstant = a.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = a.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = a.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = a.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.displacementThresholdPerNode = 3 * a.DEFAULT_EDGE_LENGTH / 100, this.coolingFactor = a.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.initialCoolingFactor = a.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.totalDisplacement = 0, this.oldTotalDisplacement = 0, this.maxIterations = a.MAX_ITERATIONS;
      }
      m(t, "FDLayout"), t.prototype = Object.create(l.prototype);
      for (var u in l) t[u] = l[u];
      t.prototype.initParameters = function() {
        l.prototype.initParameters.call(this, arguments), this.totalIterations = 0, this.notAnimatedIterations = 0, this.useFRGridVariant = a.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION, this.grid = [];
      }, t.prototype.calcIdealEdgeLengths = function() {
        for (var e, r2, h, f, o2, A, v, y = this.getGraphManager().getAllEdges(), N = 0; N < y.length; N++) e = y[N], r2 = e.idealLength, e.isInterGraph && (f = e.getSource(), o2 = e.getTarget(), A = e.getSourceInLca().getEstimatedSize(), v = e.getTargetInLca().getEstimatedSize(), this.useSmartIdealEdgeLengthCalculation && (e.idealLength += A + v - 2 * i.SIMPLE_NODE_SIZE), h = e.getLca().getInclusionTreeDepth(), e.idealLength += r2 * a.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (f.getInclusionTreeDepth() + o2.getInclusionTreeDepth() - 2 * h));
      }, t.prototype.initSpringEmbedder = function() {
        var e = this.getAllNodes().length;
        this.incremental ? (e > a.ADAPTATION_LOWER_NODE_LIMIT && (this.coolingFactor = Math.max(this.coolingFactor * a.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (e - a.ADAPTATION_LOWER_NODE_LIMIT) / (a.ADAPTATION_UPPER_NODE_LIMIT - a.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - a.COOLING_ADAPTATION_FACTOR))), this.maxNodeDisplacement = a.MAX_NODE_DISPLACEMENT_INCREMENTAL) : (e > a.ADAPTATION_LOWER_NODE_LIMIT ? this.coolingFactor = Math.max(a.COOLING_ADAPTATION_FACTOR, 1 - (e - a.ADAPTATION_LOWER_NODE_LIMIT) / (a.ADAPTATION_UPPER_NODE_LIMIT - a.ADAPTATION_LOWER_NODE_LIMIT) * (1 - a.COOLING_ADAPTATION_FACTOR)) : this.coolingFactor = 1, this.initialCoolingFactor = this.coolingFactor, this.maxNodeDisplacement = a.MAX_NODE_DISPLACEMENT), this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations), this.displacementThresholdPerNode = 3 * a.DEFAULT_EDGE_LENGTH / 100, this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length, this.repulsionRange = this.calcRepulsionRange();
      }, t.prototype.calcSpringForces = function() {
        for (var e = this.getAllEdges(), r2, h = 0; h < e.length; h++) r2 = e[h], this.calcSpringForce(r2, r2.idealLength);
      }, t.prototype.calcRepulsionForces = function() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, r2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, h, f, o2, A, v = this.getAllNodes(), y;
        if (this.useFRGridVariant) for (this.totalIterations % a.GRID_CALCULATION_CHECK_PERIOD == 1 && e && this.updateGrid(), y = /* @__PURE__ */ new Set(), h = 0; h < v.length; h++) o2 = v[h], this.calculateRepulsionForceOfANode(o2, y, e, r2), y.add(o2);
        else for (h = 0; h < v.length; h++) for (o2 = v[h], f = h + 1; f < v.length; f++) A = v[f], o2.getOwner() == A.getOwner() && this.calcRepulsionForce(o2, A);
      }, t.prototype.calcGravitationalForces = function() {
        for (var e, r2 = this.getAllNodesToApplyGravitation(), h = 0; h < r2.length; h++) e = r2[h], this.calcGravitationalForce(e);
      }, t.prototype.moveNodes = function() {
        for (var e = this.getAllNodes(), r2, h = 0; h < e.length; h++) r2 = e[h], r2.move();
      }, t.prototype.calcSpringForce = function(e, r2) {
        var h = e.getSource(), f = e.getTarget(), o2, A, v, y;
        if (this.uniformLeafNodeSizes && h.getChild() == null && f.getChild() == null) e.updateLengthSimple();
        else if (e.updateLength(), e.isOverlapingSourceAndTarget) return;
        o2 = e.getLength(), o2 != 0 && (A = e.edgeElasticity * (o2 - r2), v = A * (e.lengthX / o2), y = A * (e.lengthY / o2), h.springForceX += v, h.springForceY += y, f.springForceX -= v, f.springForceY -= y);
      }, t.prototype.calcRepulsionForce = function(e, r2) {
        var h = e.getRect(), f = r2.getRect(), o2 = new Array(2), A = new Array(4), v, y, N, S, w, P, $;
        if (h.intersects(f)) {
          n.calcSeparationAmount(h, f, o2, a.DEFAULT_EDGE_LENGTH / 2), P = 2 * o2[0], $ = 2 * o2[1];
          var X = e.noOfChildren * r2.noOfChildren / (e.noOfChildren + r2.noOfChildren);
          e.repulsionForceX -= X * P, e.repulsionForceY -= X * $, r2.repulsionForceX += X * P, r2.repulsionForceY += X * $;
        } else this.uniformLeafNodeSizes && e.getChild() == null && r2.getChild() == null ? (v = f.getCenterX() - h.getCenterX(), y = f.getCenterY() - h.getCenterY()) : (n.getIntersection(h, f, A), v = A[2] - A[0], y = A[3] - A[1]), Math.abs(v) < a.MIN_REPULSION_DIST && (v = c2.sign(v) * a.MIN_REPULSION_DIST), Math.abs(y) < a.MIN_REPULSION_DIST && (y = c2.sign(y) * a.MIN_REPULSION_DIST), N = v * v + y * y, S = Math.sqrt(N), w = (e.nodeRepulsion / 2 + r2.nodeRepulsion / 2) * e.noOfChildren * r2.noOfChildren / N, P = w * v / S, $ = w * y / S, e.repulsionForceX -= P, e.repulsionForceY -= $, r2.repulsionForceX += P, r2.repulsionForceY += $;
      }, t.prototype.calcGravitationalForce = function(e) {
        var r2, h, f, o2, A, v, y, N;
        r2 = e.getOwner(), h = (r2.getRight() + r2.getLeft()) / 2, f = (r2.getTop() + r2.getBottom()) / 2, o2 = e.getCenterX() - h, A = e.getCenterY() - f, v = Math.abs(o2) + e.getWidth() / 2, y = Math.abs(A) + e.getHeight() / 2, e.getOwner() == this.graphManager.getRoot() ? (N = r2.getEstimatedSize() * this.gravityRangeFactor, (v > N || y > N) && (e.gravitationForceX = -this.gravityConstant * o2, e.gravitationForceY = -this.gravityConstant * A)) : (N = r2.getEstimatedSize() * this.compoundGravityRangeFactor, (v > N || y > N) && (e.gravitationForceX = -this.gravityConstant * o2 * this.compoundGravityConstant, e.gravitationForceY = -this.gravityConstant * A * this.compoundGravityConstant));
      }, t.prototype.isConverged = function() {
        var e, r2 = false;
        return this.totalIterations > this.maxIterations / 3 && (r2 = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2), e = this.totalDisplacement < this.totalDisplacementThreshold, this.oldTotalDisplacement = this.totalDisplacement, e || r2;
      }, t.prototype.animate = function() {
        this.animationDuringLayout && !this.isSubLayout && (this.notAnimatedIterations == this.animationPeriod ? (this.update(), this.notAnimatedIterations = 0) : this.notAnimatedIterations++);
      }, t.prototype.calcNoOfChildrenForAllNodes = function() {
        for (var e, r2 = this.graphManager.getAllNodes(), h = 0; h < r2.length; h++) e = r2[h], e.noOfChildren = e.getNoOfChildren();
      }, t.prototype.calcGrid = function(e) {
        var r2 = 0, h = 0;
        r2 = parseInt(Math.ceil((e.getRight() - e.getLeft()) / this.repulsionRange)), h = parseInt(Math.ceil((e.getBottom() - e.getTop()) / this.repulsionRange));
        for (var f = new Array(r2), o2 = 0; o2 < r2; o2++) f[o2] = new Array(h);
        for (var o2 = 0; o2 < r2; o2++) for (var A = 0; A < h; A++) f[o2][A] = new Array();
        return f;
      }, t.prototype.addNodeToGrid = function(e, r2, h) {
        var f = 0, o2 = 0, A = 0, v = 0;
        f = parseInt(Math.floor((e.getRect().x - r2) / this.repulsionRange)), o2 = parseInt(Math.floor((e.getRect().width + e.getRect().x - r2) / this.repulsionRange)), A = parseInt(Math.floor((e.getRect().y - h) / this.repulsionRange)), v = parseInt(Math.floor((e.getRect().height + e.getRect().y - h) / this.repulsionRange));
        for (var y = f; y <= o2; y++) for (var N = A; N <= v; N++) this.grid[y][N].push(e), e.setGridCoordinates(f, o2, A, v);
      }, t.prototype.updateGrid = function() {
        var e, r2, h = this.getAllNodes();
        for (this.grid = this.calcGrid(this.graphManager.getRoot()), e = 0; e < h.length; e++) r2 = h[e], this.addNodeToGrid(r2, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
      }, t.prototype.calculateRepulsionForceOfANode = function(e, r2, h, f) {
        if (this.totalIterations % a.GRID_CALCULATION_CHECK_PERIOD == 1 && h || f) {
          var o2 = /* @__PURE__ */ new Set();
          e.surrounding = new Array();
          for (var A, v = this.grid, y = e.startX - 1; y < e.finishX + 2; y++) for (var N = e.startY - 1; N < e.finishY + 2; N++) if (!(y < 0 || N < 0 || y >= v.length || N >= v[0].length)) {
            for (var S = 0; S < v[y][N].length; S++) if (A = v[y][N][S], !(e.getOwner() != A.getOwner() || e == A) && !r2.has(A) && !o2.has(A)) {
              var w = Math.abs(e.getCenterX() - A.getCenterX()) - (e.getWidth() / 2 + A.getWidth() / 2), P = Math.abs(e.getCenterY() - A.getCenterY()) - (e.getHeight() / 2 + A.getHeight() / 2);
              w <= this.repulsionRange && P <= this.repulsionRange && o2.add(A);
            }
          }
          e.surrounding = [].concat(g(o2));
        }
        for (y = 0; y < e.surrounding.length; y++) this.calcRepulsionForce(e, e.surrounding[y]);
      }, t.prototype.calcRepulsionRange = function() {
        return 0;
      }, D.exports = t;
    }, function(D, C, T) {
      "use strict";
      var g = T(1), l = T(4);
      function a(n, c2, t) {
        g.call(this, n, c2, t), this.idealLength = l.DEFAULT_EDGE_LENGTH, this.edgeElasticity = l.DEFAULT_SPRING_STRENGTH;
      }
      m(a, "FDLayoutEdge"), a.prototype = Object.create(g.prototype);
      for (var i in g) a[i] = g[i];
      D.exports = a;
    }, function(D, C, T) {
      "use strict";
      var g = T(3), l = T(4);
      function a(n, c2, t, u) {
        g.call(this, n, c2, t, u), this.nodeRepulsion = l.DEFAULT_REPULSION_STRENGTH, this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0, this.startX = 0, this.finishX = 0, this.startY = 0, this.finishY = 0, this.surrounding = [];
      }
      m(a, "FDLayoutNode"), a.prototype = Object.create(g.prototype);
      for (var i in g) a[i] = g[i];
      a.prototype.setGridCoordinates = function(n, c2, t, u) {
        this.startX = n, this.finishX = c2, this.startY = t, this.finishY = u;
      }, D.exports = a;
    }, function(D, C, T) {
      "use strict";
      function g(l, a) {
        this.width = 0, this.height = 0, l !== null && a !== null && (this.height = a, this.width = l);
      }
      m(g, "DimensionD"), g.prototype.getWidth = function() {
        return this.width;
      }, g.prototype.setWidth = function(l) {
        this.width = l;
      }, g.prototype.getHeight = function() {
        return this.height;
      }, g.prototype.setHeight = function(l) {
        this.height = l;
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = T(14);
      function l() {
        this.map = {}, this.keys = [];
      }
      m(l, "HashMap"), l.prototype.put = function(a, i) {
        var n = g.createID(a);
        this.contains(n) || (this.map[n] = i, this.keys.push(a));
      }, l.prototype.contains = function(a) {
        var i = g.createID(a);
        return this.map[a] != null;
      }, l.prototype.get = function(a) {
        var i = g.createID(a);
        return this.map[i];
      }, l.prototype.keySet = function() {
        return this.keys;
      }, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      var g = T(14);
      function l() {
        this.set = {};
      }
      m(l, "HashSet"), l.prototype.add = function(a) {
        var i = g.createID(a);
        this.contains(i) || (this.set[i] = a);
      }, l.prototype.remove = function(a) {
        delete this.set[g.createID(a)];
      }, l.prototype.clear = function() {
        this.set = {};
      }, l.prototype.contains = function(a) {
        return this.set[g.createID(a)] == a;
      }, l.prototype.isEmpty = function() {
        return this.size() === 0;
      }, l.prototype.size = function() {
        return Object.keys(this.set).length;
      }, l.prototype.addAllTo = function(a) {
        for (var i = Object.keys(this.set), n = i.length, c2 = 0; c2 < n; c2++) a.push(this.set[i[c2]]);
      }, l.prototype.size = function() {
        return Object.keys(this.set).length;
      }, l.prototype.addAll = function(a) {
        for (var i = a.length, n = 0; n < i; n++) {
          var c2 = a[n];
          this.add(c2);
        }
      }, D.exports = l;
    }, function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "Matrix"), g.multMat = function(l, a) {
        for (var i = [], n = 0; n < l.length; n++) {
          i[n] = [];
          for (var c2 = 0; c2 < a[0].length; c2++) {
            i[n][c2] = 0;
            for (var t = 0; t < l[0].length; t++) i[n][c2] += l[n][t] * a[t][c2];
          }
        }
        return i;
      }, g.transpose = function(l) {
        for (var a = [], i = 0; i < l[0].length; i++) {
          a[i] = [];
          for (var n = 0; n < l.length; n++) a[i][n] = l[n][i];
        }
        return a;
      }, g.multCons = function(l, a) {
        for (var i = [], n = 0; n < l.length; n++) i[n] = l[n] * a;
        return i;
      }, g.minusOp = function(l, a) {
        for (var i = [], n = 0; n < l.length; n++) i[n] = l[n] - a[n];
        return i;
      }, g.dotProduct = function(l, a) {
        for (var i = 0, n = 0; n < l.length; n++) i += l[n] * a[n];
        return i;
      }, g.mag = function(l) {
        return Math.sqrt(this.dotProduct(l, l));
      }, g.normalize = function(l) {
        for (var a = [], i = this.mag(l), n = 0; n < l.length; n++) a[n] = l[n] / i;
        return a;
      }, g.multGamma = function(l) {
        for (var a = [], i = 0, n = 0; n < l.length; n++) i += l[n];
        i *= -1 / l.length;
        for (var c2 = 0; c2 < l.length; c2++) a[c2] = i + l[c2];
        return a;
      }, g.multL = function(l, a, i) {
        for (var n = [], c2 = [], t = [], u = 0; u < a[0].length; u++) {
          for (var e = 0, r2 = 0; r2 < a.length; r2++) e += -0.5 * a[r2][u] * l[r2];
          c2[u] = e;
        }
        for (var h = 0; h < i.length; h++) {
          for (var f = 0, o2 = 0; o2 < i.length; o2++) f += i[h][o2] * c2[o2];
          t[h] = f;
        }
        for (var A = 0; A < a.length; A++) {
          for (var v = 0, y = 0; y < a[0].length; y++) v += a[A][y] * t[y];
          n[A] = v;
        }
        return n;
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = function() {
        function n(c2, t) {
          for (var u = 0; u < t.length; u++) {
            var e = t[u];
            e.enumerable = e.enumerable || false, e.configurable = true, "value" in e && (e.writable = true), Object.defineProperty(c2, e.key, e);
          }
        }
        return m(n, "defineProperties"), function(c2, t, u) {
          return t && n(c2.prototype, t), u && n(c2, u), c2;
        };
      }();
      function l(n, c2) {
        if (!(n instanceof c2)) throw new TypeError("Cannot call a class as a function");
      }
      m(l, "_classCallCheck");
      var a = T(11), i = function() {
        function n(c2, t) {
          l(this, n), (t !== null || t !== void 0) && (this.compareFunction = this._defaultCompareFunction);
          var u = void 0;
          c2 instanceof a ? u = c2.size() : u = c2.length, this._quicksort(c2, 0, u - 1);
        }
        return m(n, "Quicksort"), g(n, [{ key: "_quicksort", value: m(function(t, u, e) {
          if (u < e) {
            var r2 = this._partition(t, u, e);
            this._quicksort(t, u, r2), this._quicksort(t, r2 + 1, e);
          }
        }, "_quicksort") }, { key: "_partition", value: m(function(t, u, e) {
          for (var r2 = this._get(t, u), h = u, f = e; ; ) {
            for (; this.compareFunction(r2, this._get(t, f)); ) f--;
            for (; this.compareFunction(this._get(t, h), r2); ) h++;
            if (h < f) this._swap(t, h, f), h++, f--;
            else return f;
          }
        }, "_partition") }, { key: "_get", value: m(function(t, u) {
          return t instanceof a ? t.get_object_at(u) : t[u];
        }, "_get") }, { key: "_set", value: m(function(t, u, e) {
          t instanceof a ? t.set_object_at(u, e) : t[u] = e;
        }, "_set") }, { key: "_swap", value: m(function(t, u, e) {
          var r2 = this._get(t, u);
          this._set(t, u, this._get(t, e)), this._set(t, e, r2);
        }, "_swap") }, { key: "_defaultCompareFunction", value: m(function(t, u) {
          return u > t;
        }, "_defaultCompareFunction") }]), n;
      }();
      D.exports = i;
    }, function(D, C, T) {
      "use strict";
      function g() {
      }
      m(g, "SVD"), g.svd = function(l) {
        this.U = null, this.V = null, this.s = null, this.m = 0, this.n = 0, this.m = l.length, this.n = l[0].length;
        var a = Math.min(this.m, this.n);
        this.s = function(xt) {
          for (var At = []; xt-- > 0; ) At.push(0);
          return At;
        }(Math.min(this.m + 1, this.n)), this.U = function(xt) {
          var At = m(function $t(Rt) {
            if (Rt.length == 0) return 0;
            for (var Xt = [], zt = 0; zt < Rt[0]; zt++) Xt.push($t(Rt.slice(1)));
            return Xt;
          }, "allocate");
          return At(xt);
        }([this.m, a]), this.V = function(xt) {
          var At = m(function $t(Rt) {
            if (Rt.length == 0) return 0;
            for (var Xt = [], zt = 0; zt < Rt[0]; zt++) Xt.push($t(Rt.slice(1)));
            return Xt;
          }, "allocate");
          return At(xt);
        }([this.n, this.n]);
        for (var i = function(xt) {
          for (var At = []; xt-- > 0; ) At.push(0);
          return At;
        }(this.n), n = function(xt) {
          for (var At = []; xt-- > 0; ) At.push(0);
          return At;
        }(this.m), c2 = true, t = true, u = Math.min(this.m - 1, this.n), e = Math.max(0, Math.min(this.n - 2, this.m)), r2 = 0; r2 < Math.max(u, e); r2++) {
          if (r2 < u) {
            this.s[r2] = 0;
            for (var h = r2; h < this.m; h++) this.s[r2] = g.hypot(this.s[r2], l[h][r2]);
            if (this.s[r2] !== 0) {
              l[r2][r2] < 0 && (this.s[r2] = -this.s[r2]);
              for (var f = r2; f < this.m; f++) l[f][r2] /= this.s[r2];
              l[r2][r2] += 1;
            }
            this.s[r2] = -this.s[r2];
          }
          for (var o2 = r2 + 1; o2 < this.n; o2++) {
            if (/* @__PURE__ */ function(xt, At) {
              return xt && At;
            }(r2 < u, this.s[r2] !== 0)) {
              for (var A = 0, v = r2; v < this.m; v++) A += l[v][r2] * l[v][o2];
              A = -A / l[r2][r2];
              for (var y = r2; y < this.m; y++) l[y][o2] += A * l[y][r2];
            }
            i[o2] = l[r2][o2];
          }
          if (/* @__PURE__ */ function(xt, At) {
            return xt && At;
          }(c2, r2 < u)) for (var N = r2; N < this.m; N++) this.U[N][r2] = l[N][r2];
          if (r2 < e) {
            i[r2] = 0;
            for (var S = r2 + 1; S < this.n; S++) i[r2] = g.hypot(i[r2], i[S]);
            if (i[r2] !== 0) {
              i[r2 + 1] < 0 && (i[r2] = -i[r2]);
              for (var w = r2 + 1; w < this.n; w++) i[w] /= i[r2];
              i[r2 + 1] += 1;
            }
            if (i[r2] = -i[r2], /* @__PURE__ */ function(xt, At) {
              return xt && At;
            }(r2 + 1 < this.m, i[r2] !== 0)) {
              for (var P = r2 + 1; P < this.m; P++) n[P] = 0;
              for (var $ = r2 + 1; $ < this.n; $++) for (var X = r2 + 1; X < this.m; X++) n[X] += i[$] * l[X][$];
              for (var _ = r2 + 1; _ < this.n; _++) for (var R = -i[_] / i[r2 + 1], J = r2 + 1; J < this.m; J++) l[J][_] += R * n[J];
            }
            if (t) for (var s = r2 + 1; s < this.n; s++) this.V[s][r2] = i[s];
          }
        }
        var m2 = Math.min(this.n, this.m + 1);
        if (u < this.n && (this.s[u] = l[u][u]), this.m < m2 && (this.s[m2 - 1] = 0), e + 1 < m2 && (i[e] = l[e][m2 - 1]), i[m2 - 1] = 0, c2) {
          for (var p = u; p < a; p++) {
            for (var E = 0; E < this.m; E++) this.U[E][p] = 0;
            this.U[p][p] = 1;
          }
          for (var d3 = u - 1; d3 >= 0; d3--) if (this.s[d3] !== 0) {
            for (var O = d3 + 1; O < a; O++) {
              for (var x = 0, G = d3; G < this.m; G++) x += this.U[G][d3] * this.U[G][O];
              x = -x / this.U[d3][d3];
              for (var b = d3; b < this.m; b++) this.U[b][O] += x * this.U[b][d3];
            }
            for (var I = d3; I < this.m; I++) this.U[I][d3] = -this.U[I][d3];
            this.U[d3][d3] = 1 + this.U[d3][d3];
            for (var Z = 0; Z < d3 - 1; Z++) this.U[Z][d3] = 0;
          } else {
            for (var et = 0; et < this.m; et++) this.U[et][d3] = 0;
            this.U[d3][d3] = 1;
          }
        }
        if (t) for (var F = this.n - 1; F >= 0; F--) {
          if (/* @__PURE__ */ function(xt, At) {
            return xt && At;
          }(F < e, i[F] !== 0)) for (var tt = F + 1; tt < a; tt++) {
            for (var z = 0, M = F + 1; M < this.n; M++) z += this.V[M][F] * this.V[M][tt];
            z = -z / this.V[F + 1][F];
            for (var U = F + 1; U < this.n; U++) this.V[U][tt] += z * this.V[U][F];
          }
          for (var H = 0; H < this.n; H++) this.V[H][F] = 0;
          this.V[F][F] = 1;
        }
        for (var K = m2 - 1, ht = 0, Nt = Math.pow(2, -52), St = Math.pow(2, -966); m2 > 0; ) {
          var Q = void 0, Yt = void 0;
          for (Q = m2 - 2; Q >= -1 && Q !== -1; Q--) if (Math.abs(i[Q]) <= St + Nt * (Math.abs(this.s[Q]) + Math.abs(this.s[Q + 1]))) {
            i[Q] = 0;
            break;
          }
          if (Q === m2 - 2) Yt = 4;
          else {
            var wt = void 0;
            for (wt = m2 - 1; wt >= Q && wt !== Q; wt--) {
              var ot = (wt !== m2 ? Math.abs(i[wt]) : 0) + (wt !== Q + 1 ? Math.abs(i[wt - 1]) : 0);
              if (Math.abs(this.s[wt]) <= St + Nt * ot) {
                this.s[wt] = 0;
                break;
              }
            }
            wt === Q ? Yt = 3 : wt === m2 - 1 ? Yt = 1 : (Yt = 2, Q = wt);
          }
          switch (Q++, Yt) {
            case 1:
              {
                var rt = i[m2 - 2];
                i[m2 - 2] = 0;
                for (var vt = m2 - 2; vt >= Q; vt--) {
                  var mt2 = g.hypot(this.s[vt], rt), Lt2 = this.s[vt] / mt2, Et = rt / mt2;
                  if (this.s[vt] = mt2, vt !== Q && (rt = -Et * i[vt - 1], i[vt - 1] = Lt2 * i[vt - 1]), t) for (var Tt = 0; Tt < this.n; Tt++) mt2 = Lt2 * this.V[Tt][vt] + Et * this.V[Tt][m2 - 1], this.V[Tt][m2 - 1] = -Et * this.V[Tt][vt] + Lt2 * this.V[Tt][m2 - 1], this.V[Tt][vt] = mt2;
                }
              }
              break;
            case 2:
              {
                var Mt = i[Q - 1];
                i[Q - 1] = 0;
                for (var It = Q; It < m2; It++) {
                  var Wt = g.hypot(this.s[It], Mt), Pt = this.s[It] / Wt, Ut = Mt / Wt;
                  if (this.s[It] = Wt, Mt = -Ut * i[It], i[It] = Pt * i[It], c2) for (var Ft = 0; Ft < this.m; Ft++) Wt = Pt * this.U[Ft][It] + Ut * this.U[Ft][Q - 1], this.U[Ft][Q - 1] = -Ut * this.U[Ft][It] + Pt * this.U[Ft][Q - 1], this.U[Ft][It] = Wt;
                }
              }
              break;
            case 3:
              {
                var Y = Math.max(Math.max(Math.max(Math.max(Math.abs(this.s[m2 - 1]), Math.abs(this.s[m2 - 2])), Math.abs(i[m2 - 2])), Math.abs(this.s[Q])), Math.abs(i[Q])), W = this.s[m2 - 1] / Y, V = this.s[m2 - 2] / Y, B = i[m2 - 2] / Y, k = this.s[Q] / Y, j = i[Q] / Y, gt = ((V + W) * (V - W) + B * B) / 2, ft = W * B * (W * B), q = 0;
                /* @__PURE__ */ (function(xt, At) {
                  return xt || At;
                })(gt !== 0, ft !== 0) && (q = Math.sqrt(gt * gt + ft), gt < 0 && (q = -q), q = ft / (gt + q));
                for (var lt = (k + W) * (k - W) + q, ut = k * j, it = Q; it < m2 - 1; it++) {
                  var pt2 = g.hypot(lt, ut), Dt = lt / pt2, st2 = ut / pt2;
                  if (it !== Q && (i[it - 1] = pt2), lt = Dt * this.s[it] + st2 * i[it], i[it] = Dt * i[it] - st2 * this.s[it], ut = st2 * this.s[it + 1], this.s[it + 1] = Dt * this.s[it + 1], t) for (var nt = 0; nt < this.n; nt++) pt2 = Dt * this.V[nt][it] + st2 * this.V[nt][it + 1], this.V[nt][it + 1] = -st2 * this.V[nt][it] + Dt * this.V[nt][it + 1], this.V[nt][it] = pt2;
                  if (pt2 = g.hypot(lt, ut), Dt = lt / pt2, st2 = ut / pt2, this.s[it] = pt2, lt = Dt * i[it] + st2 * this.s[it + 1], this.s[it + 1] = -st2 * i[it] + Dt * this.s[it + 1], ut = st2 * i[it + 1], i[it + 1] = Dt * i[it + 1], c2 && it < this.m - 1) for (var dt = 0; dt < this.m; dt++) pt2 = Dt * this.U[dt][it] + st2 * this.U[dt][it + 1], this.U[dt][it + 1] = -st2 * this.U[dt][it] + Dt * this.U[dt][it + 1], this.U[dt][it] = pt2;
                }
                i[m2 - 2] = lt, ht = ht + 1;
              }
              break;
            case 4:
              {
                if (this.s[Q] <= 0 && (this.s[Q] = this.s[Q] < 0 ? -this.s[Q] : 0, t)) for (var at = 0; at <= K; at++) this.V[at][Q] = -this.V[at][Q];
                for (; Q < K && !(this.s[Q] >= this.s[Q + 1]); ) {
                  var ct = this.s[Q];
                  if (this.s[Q] = this.s[Q + 1], this.s[Q + 1] = ct, t && Q < this.n - 1) for (var bt = 0; bt < this.n; bt++) ct = this.V[bt][Q + 1], this.V[bt][Q + 1] = this.V[bt][Q], this.V[bt][Q] = ct;
                  if (c2 && Q < this.m - 1) for (var Ot2 = 0; Ot2 < this.m; Ot2++) ct = this.U[Ot2][Q + 1], this.U[Ot2][Q + 1] = this.U[Ot2][Q], this.U[Ot2][Q] = ct;
                  Q++;
                }
                ht = 0, m2--;
              }
              break;
          }
        }
        var Vt = { U: this.U, V: this.V, S: this.s };
        return Vt;
      }, g.hypot = function(l, a) {
        var i = void 0;
        return Math.abs(l) > Math.abs(a) ? (i = a / l, i = Math.abs(l) * Math.sqrt(1 + i * i)) : a != 0 ? (i = l / a, i = Math.abs(a) * Math.sqrt(1 + i * i)) : i = 0, i;
      }, D.exports = g;
    }, function(D, C, T) {
      "use strict";
      var g = function() {
        function i(n, c2) {
          for (var t = 0; t < c2.length; t++) {
            var u = c2[t];
            u.enumerable = u.enumerable || false, u.configurable = true, "value" in u && (u.writable = true), Object.defineProperty(n, u.key, u);
          }
        }
        return m(i, "defineProperties"), function(n, c2, t) {
          return c2 && i(n.prototype, c2), t && i(n, t), n;
        };
      }();
      function l(i, n) {
        if (!(i instanceof n)) throw new TypeError("Cannot call a class as a function");
      }
      m(l, "_classCallCheck");
      var a = function() {
        function i(n, c2) {
          var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1, e = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
          l(this, i), this.sequence1 = n, this.sequence2 = c2, this.match_score = t, this.mismatch_penalty = u, this.gap_penalty = e, this.iMax = n.length + 1, this.jMax = c2.length + 1, this.grid = new Array(this.iMax);
          for (var r2 = 0; r2 < this.iMax; r2++) {
            this.grid[r2] = new Array(this.jMax);
            for (var h = 0; h < this.jMax; h++) this.grid[r2][h] = 0;
          }
          this.tracebackGrid = new Array(this.iMax);
          for (var f = 0; f < this.iMax; f++) {
            this.tracebackGrid[f] = new Array(this.jMax);
            for (var o2 = 0; o2 < this.jMax; o2++) this.tracebackGrid[f][o2] = [null, null, null];
          }
          this.alignments = [], this.score = -1, this.computeGrids();
        }
        return m(i, "NeedlemanWunsch"), g(i, [{ key: "getScore", value: m(function() {
          return this.score;
        }, "getScore") }, { key: "getAlignments", value: m(function() {
          return this.alignments;
        }, "getAlignments") }, { key: "computeGrids", value: m(function() {
          for (var c2 = 1; c2 < this.jMax; c2++) this.grid[0][c2] = this.grid[0][c2 - 1] + this.gap_penalty, this.tracebackGrid[0][c2] = [false, false, true];
          for (var t = 1; t < this.iMax; t++) this.grid[t][0] = this.grid[t - 1][0] + this.gap_penalty, this.tracebackGrid[t][0] = [false, true, false];
          for (var u = 1; u < this.iMax; u++) for (var e = 1; e < this.jMax; e++) {
            var r2 = void 0;
            this.sequence1[u - 1] === this.sequence2[e - 1] ? r2 = this.grid[u - 1][e - 1] + this.match_score : r2 = this.grid[u - 1][e - 1] + this.mismatch_penalty;
            var h = this.grid[u - 1][e] + this.gap_penalty, f = this.grid[u][e - 1] + this.gap_penalty, o2 = [r2, h, f], A = this.arrayAllMaxIndexes(o2);
            this.grid[u][e] = o2[A[0]], this.tracebackGrid[u][e] = [A.includes(0), A.includes(1), A.includes(2)];
          }
          this.score = this.grid[this.iMax - 1][this.jMax - 1];
        }, "computeGrids") }, { key: "alignmentTraceback", value: m(function() {
          var c2 = [];
          for (c2.push({ pos: [this.sequence1.length, this.sequence2.length], seq1: "", seq2: "" }); c2[0]; ) {
            var t = c2[0], u = this.tracebackGrid[t.pos[0]][t.pos[1]];
            u[0] && c2.push({ pos: [t.pos[0] - 1, t.pos[1] - 1], seq1: this.sequence1[t.pos[0] - 1] + t.seq1, seq2: this.sequence2[t.pos[1] - 1] + t.seq2 }), u[1] && c2.push({ pos: [t.pos[0] - 1, t.pos[1]], seq1: this.sequence1[t.pos[0] - 1] + t.seq1, seq2: "-" + t.seq2 }), u[2] && c2.push({ pos: [t.pos[0], t.pos[1] - 1], seq1: "-" + t.seq1, seq2: this.sequence2[t.pos[1] - 1] + t.seq2 }), t.pos[0] === 0 && t.pos[1] === 0 && this.alignments.push({ sequence1: t.seq1, sequence2: t.seq2 }), c2.shift();
          }
          return this.alignments;
        }, "alignmentTraceback") }, { key: "getAllIndexes", value: m(function(c2, t) {
          for (var u = [], e = -1; (e = c2.indexOf(t, e + 1)) !== -1; ) u.push(e);
          return u;
        }, "getAllIndexes") }, { key: "arrayAllMaxIndexes", value: m(function(c2) {
          return this.getAllIndexes(c2, Math.max.apply(null, c2));
        }, "arrayAllMaxIndexes") }]), i;
      }();
      D.exports = a;
    }, function(D, C, T) {
      "use strict";
      var g = m(function() {
      }, "layoutBase");
      g.FDLayout = T(18), g.FDLayoutConstants = T(4), g.FDLayoutEdge = T(19), g.FDLayoutNode = T(20), g.DimensionD = T(21), g.HashMap = T(22), g.HashSet = T(23), g.IGeometry = T(8), g.IMath = T(9), g.Integer = T(10), g.Point = T(12), g.PointD = T(5), g.RandomSeed = T(16), g.RectangleD = T(13), g.Transform = T(17), g.UniqueIDGeneretor = T(14), g.Quicksort = T(25), g.LinkedList = T(11), g.LGraphObject = T(2), g.LGraph = T(6), g.LEdge = T(1), g.LGraphManager = T(7), g.LNode = T(3), g.Layout = T(15), g.LayoutConstants = T(0), g.NeedlemanWunsch = T(27), g.Matrix = T(24), g.SVD = T(26), D.exports = g;
    }, function(D, C, T) {
      "use strict";
      function g() {
        this.listeners = [];
      }
      m(g, "Emitter");
      var l = g.prototype;
      l.addListener = function(a, i) {
        this.listeners.push({ event: a, callback: i });
      }, l.removeListener = function(a, i) {
        for (var n = this.listeners.length; n >= 0; n--) {
          var c2 = this.listeners[n];
          c2.event === a && c2.callback === i && this.listeners.splice(n, 1);
        }
      }, l.emit = function(a, i) {
        for (var n = 0; n < this.listeners.length; n++) {
          var c2 = this.listeners[n];
          a === c2.event && c2.callback(i);
        }
      }, D.exports = g;
    }]);
  });
});
var Ie = o((he, Oe) => {
  "use strict";
  m(function(C, T) {
    typeof he == "object" && typeof Oe == "object" ? Oe.exports = T(xe()) : typeof define == "function" && define.amd ? define(["layout-base"], T) : typeof he == "object" ? he.coseBase = T(xe()) : C.coseBase = T(C.layoutBase);
  }, "webpackUniversalModuleDefinition")(he, function(D) {
    return (() => {
      "use strict";
      var C = { 45: (a, i, n) => {
        var c2 = {};
        c2.layoutBase = n(551), c2.CoSEConstants = n(806), c2.CoSEEdge = n(767), c2.CoSEGraph = n(880), c2.CoSEGraphManager = n(578), c2.CoSELayout = n(765), c2.CoSENode = n(991), c2.ConstraintHandler = n(902), a.exports = c2;
      }, 806: (a, i, n) => {
        var c2 = n(551).FDLayoutConstants;
        function t() {
        }
        m(t, "CoSEConstants");
        for (var u in c2) t[u] = c2[u];
        t.DEFAULT_USE_MULTI_LEVEL_SCALING = false, t.DEFAULT_RADIAL_SEPARATION = c2.DEFAULT_EDGE_LENGTH, t.DEFAULT_COMPONENT_SEPERATION = 60, t.TILE = true, t.TILING_PADDING_VERTICAL = 10, t.TILING_PADDING_HORIZONTAL = 10, t.TRANSFORM_ON_CONSTRAINT_HANDLING = true, t.ENFORCE_CONSTRAINTS = true, t.APPLY_LAYOUT = true, t.RELAX_MOVEMENT_ON_CONSTRAINTS = true, t.TREE_REDUCTION_ON_INCREMENTAL = true, t.PURE_INCREMENTAL = t.DEFAULT_INCREMENTAL, a.exports = t;
      }, 767: (a, i, n) => {
        var c2 = n(551).FDLayoutEdge;
        function t(e, r2, h) {
          c2.call(this, e, r2, h);
        }
        m(t, "CoSEEdge"), t.prototype = Object.create(c2.prototype);
        for (var u in c2) t[u] = c2[u];
        a.exports = t;
      }, 880: (a, i, n) => {
        var c2 = n(551).LGraph;
        function t(e, r2, h) {
          c2.call(this, e, r2, h);
        }
        m(t, "CoSEGraph"), t.prototype = Object.create(c2.prototype);
        for (var u in c2) t[u] = c2[u];
        a.exports = t;
      }, 578: (a, i, n) => {
        var c2 = n(551).LGraphManager;
        function t(e) {
          c2.call(this, e);
        }
        m(t, "CoSEGraphManager"), t.prototype = Object.create(c2.prototype);
        for (var u in c2) t[u] = c2[u];
        a.exports = t;
      }, 765: (a, i, n) => {
        var c2 = n(551).FDLayout, t = n(578), u = n(880), e = n(991), r2 = n(767), h = n(806), f = n(902), o2 = n(551).FDLayoutConstants, A = n(551).LayoutConstants, v = n(551).Point, y = n(551).PointD, N = n(551).DimensionD, S = n(551).Layout, w = n(551).Integer, P = n(551).IGeometry, $ = n(551).LGraph, X = n(551).Transform, _ = n(551).LinkedList;
        function R() {
          c2.call(this), this.toBeTiled = {}, this.constraints = {};
        }
        m(R, "CoSELayout"), R.prototype = Object.create(c2.prototype);
        for (var J in c2) R[J] = c2[J];
        R.prototype.newGraphManager = function() {
          var s = new t(this);
          return this.graphManager = s, s;
        }, R.prototype.newGraph = function(s) {
          return new u(null, this.graphManager, s);
        }, R.prototype.newNode = function(s) {
          return new e(this.graphManager, s);
        }, R.prototype.newEdge = function(s) {
          return new r2(null, null, s);
        }, R.prototype.initParameters = function() {
          c2.prototype.initParameters.call(this, arguments), this.isSubLayout || (h.DEFAULT_EDGE_LENGTH < 10 ? this.idealEdgeLength = 10 : this.idealEdgeLength = h.DEFAULT_EDGE_LENGTH, this.useSmartIdealEdgeLengthCalculation = h.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.gravityConstant = o2.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = o2.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = o2.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = o2.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.prunedNodesAll = [], this.growTreeIterations = 0, this.afterGrowthIterations = 0, this.isTreeGrowing = false, this.isGrowthFinished = false);
        }, R.prototype.initSpringEmbedder = function() {
          c2.prototype.initSpringEmbedder.call(this), this.coolingCycle = 0, this.maxCoolingCycle = this.maxIterations / o2.CONVERGENCE_CHECK_PERIOD, this.finalTemperature = 0.04, this.coolingAdjuster = 1;
        }, R.prototype.layout = function() {
          var s = A.DEFAULT_CREATE_BENDS_AS_NEEDED;
          return s && (this.createBendpoints(), this.graphManager.resetAllEdges()), this.level = 0, this.classicLayout();
        }, R.prototype.classicLayout = function() {
          if (this.nodesWithGravity = this.calculateNodesToApplyGravitationTo(), this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity), this.calcNoOfChildrenForAllNodes(), this.graphManager.calcLowestCommonAncestors(), this.graphManager.calcInclusionTreeDepths(), this.graphManager.getRoot().calcEstimatedSize(), this.calcIdealEdgeLengths(), this.incremental) {
            if (h.TREE_REDUCTION_ON_INCREMENTAL) {
              this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
              var m2 = new Set(this.getAllNodes()), p = this.nodesWithGravity.filter(function(O) {
                return m2.has(O);
              });
              this.graphManager.setAllNodesToApplyGravitation(p);
            }
          } else {
            var s = this.getFlatForest();
            if (s.length > 0) this.positionNodesRadially(s);
            else {
              this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
              var m2 = new Set(this.getAllNodes()), p = this.nodesWithGravity.filter(function(E) {
                return m2.has(E);
              });
              this.graphManager.setAllNodesToApplyGravitation(p), this.positionNodesRandomly();
            }
          }
          return Object.keys(this.constraints).length > 0 && (f.handleConstraints(this), this.initConstraintVariables()), this.initSpringEmbedder(), h.APPLY_LAYOUT && this.runSpringEmbedder(), true;
        }, R.prototype.tick = function() {
          if (this.totalIterations++, this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished) if (this.prunedNodesAll.length > 0) this.isTreeGrowing = true;
          else return true;
          if (this.totalIterations % o2.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
            if (this.isConverged()) if (this.prunedNodesAll.length > 0) this.isTreeGrowing = true;
            else return true;
            this.coolingCycle++, this.layoutQuality == 0 ? this.coolingAdjuster = this.coolingCycle : this.layoutQuality == 1 && (this.coolingAdjuster = this.coolingCycle / 3), this.coolingFactor = Math.max(this.initialCoolingFactor - Math.pow(this.coolingCycle, Math.log(100 * (this.initialCoolingFactor - this.finalTemperature)) / Math.log(this.maxCoolingCycle)) / 100 * this.coolingAdjuster, this.finalTemperature), this.animationPeriod = Math.ceil(this.initialAnimationPeriod * Math.sqrt(this.coolingFactor));
          }
          if (this.isTreeGrowing) {
            if (this.growTreeIterations % 10 == 0) if (this.prunedNodesAll.length > 0) {
              this.graphManager.updateBounds(), this.updateGrid(), this.growTree(this.prunedNodesAll), this.graphManager.resetAllNodesToApplyGravitation();
              var s = new Set(this.getAllNodes()), m2 = this.nodesWithGravity.filter(function(d3) {
                return s.has(d3);
              });
              this.graphManager.setAllNodesToApplyGravitation(m2), this.graphManager.updateBounds(), this.updateGrid(), h.PURE_INCREMENTAL ? this.coolingFactor = o2.DEFAULT_COOLING_FACTOR_INCREMENTAL / 2 : this.coolingFactor = o2.DEFAULT_COOLING_FACTOR_INCREMENTAL;
            } else this.isTreeGrowing = false, this.isGrowthFinished = true;
            this.growTreeIterations++;
          }
          if (this.isGrowthFinished) {
            if (this.isConverged()) return true;
            this.afterGrowthIterations % 10 == 0 && (this.graphManager.updateBounds(), this.updateGrid()), h.PURE_INCREMENTAL ? this.coolingFactor = o2.DEFAULT_COOLING_FACTOR_INCREMENTAL / 2 * ((100 - this.afterGrowthIterations) / 100) : this.coolingFactor = o2.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100), this.afterGrowthIterations++;
          }
          var p = !this.isTreeGrowing && !this.isGrowthFinished, E = this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished;
          return this.totalDisplacement = 0, this.graphManager.updateBounds(), this.calcSpringForces(), this.calcRepulsionForces(p, E), this.calcGravitationalForces(), this.moveNodes(), this.animate(), false;
        }, R.prototype.getPositionsData = function() {
          for (var s = this.graphManager.getAllNodes(), m2 = {}, p = 0; p < s.length; p++) {
            var E = s[p].rect, d3 = s[p].id;
            m2[d3] = { id: d3, x: E.getCenterX(), y: E.getCenterY(), w: E.width, h: E.height };
          }
          return m2;
        }, R.prototype.runSpringEmbedder = function() {
          this.initialAnimationPeriod = 25, this.animationPeriod = this.initialAnimationPeriod;
          var s = false;
          if (o2.ANIMATE === "during") this.emit("layoutstarted");
          else {
            for (; !s; ) s = this.tick();
            this.graphManager.updateBounds();
          }
        }, R.prototype.moveNodes = function() {
          for (var s = this.getAllNodes(), m2, p = 0; p < s.length; p++) m2 = s[p], m2.calculateDisplacement();
          Object.keys(this.constraints).length > 0 && this.updateDisplacements();
          for (var p = 0; p < s.length; p++) m2 = s[p], m2.move();
        }, R.prototype.initConstraintVariables = function() {
          var s = this;
          this.idToNodeMap = /* @__PURE__ */ new Map(), this.fixedNodeSet = /* @__PURE__ */ new Set();
          for (var m2 = this.graphManager.getAllNodes(), p = 0; p < m2.length; p++) {
            var E = m2[p];
            this.idToNodeMap.set(E.id, E);
          }
          var d3 = m(function M(U) {
            for (var H = U.getChild().getNodes(), K, ht = 0, Nt = 0; Nt < H.length; Nt++) K = H[Nt], K.getChild() == null ? s.fixedNodeSet.has(K.id) && (ht += 100) : ht += M(K);
            return ht;
          }, "calculateCompoundWeight");
          if (this.constraints.fixedNodeConstraint) {
            this.constraints.fixedNodeConstraint.forEach(function(H) {
              s.fixedNodeSet.add(H.nodeId);
            });
            for (var m2 = this.graphManager.getAllNodes(), E, p = 0; p < m2.length; p++) if (E = m2[p], E.getChild() != null) {
              var O = d3(E);
              O > 0 && (E.fixedNodeWeight = O);
            }
          }
          if (this.constraints.relativePlacementConstraint) {
            var x = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Map();
            if (this.dummyToNodeForVerticalAlignment = /* @__PURE__ */ new Map(), this.dummyToNodeForHorizontalAlignment = /* @__PURE__ */ new Map(), this.fixedNodesOnHorizontal = /* @__PURE__ */ new Set(), this.fixedNodesOnVertical = /* @__PURE__ */ new Set(), this.fixedNodeSet.forEach(function(M) {
              s.fixedNodesOnHorizontal.add(M), s.fixedNodesOnVertical.add(M);
            }), this.constraints.alignmentConstraint) {
              if (this.constraints.alignmentConstraint.vertical) for (var b = this.constraints.alignmentConstraint.vertical, p = 0; p < b.length; p++) this.dummyToNodeForVerticalAlignment.set("dummy" + p, []), b[p].forEach(function(U) {
                x.set(U, "dummy" + p), s.dummyToNodeForVerticalAlignment.get("dummy" + p).push(U), s.fixedNodeSet.has(U) && s.fixedNodesOnHorizontal.add("dummy" + p);
              });
              if (this.constraints.alignmentConstraint.horizontal) for (var I = this.constraints.alignmentConstraint.horizontal, p = 0; p < I.length; p++) this.dummyToNodeForHorizontalAlignment.set("dummy" + p, []), I[p].forEach(function(U) {
                G.set(U, "dummy" + p), s.dummyToNodeForHorizontalAlignment.get("dummy" + p).push(U), s.fixedNodeSet.has(U) && s.fixedNodesOnVertical.add("dummy" + p);
              });
            }
            if (h.RELAX_MOVEMENT_ON_CONSTRAINTS) this.shuffle = function(M) {
              var U, H, K;
              for (K = M.length - 1; K >= 2 * M.length / 3; K--) U = Math.floor(Math.random() * (K + 1)), H = M[K], M[K] = M[U], M[U] = H;
              return M;
            }, this.nodesInRelativeHorizontal = [], this.nodesInRelativeVertical = [], this.nodeToRelativeConstraintMapHorizontal = /* @__PURE__ */ new Map(), this.nodeToRelativeConstraintMapVertical = /* @__PURE__ */ new Map(), this.nodeToTempPositionMapHorizontal = /* @__PURE__ */ new Map(), this.nodeToTempPositionMapVertical = /* @__PURE__ */ new Map(), this.constraints.relativePlacementConstraint.forEach(function(M) {
              if (M.left) {
                var U = x.has(M.left) ? x.get(M.left) : M.left, H = x.has(M.right) ? x.get(M.right) : M.right;
                s.nodesInRelativeHorizontal.includes(U) || (s.nodesInRelativeHorizontal.push(U), s.nodeToRelativeConstraintMapHorizontal.set(U, []), s.dummyToNodeForVerticalAlignment.has(U) ? s.nodeToTempPositionMapHorizontal.set(U, s.idToNodeMap.get(s.dummyToNodeForVerticalAlignment.get(U)[0]).getCenterX()) : s.nodeToTempPositionMapHorizontal.set(U, s.idToNodeMap.get(U).getCenterX())), s.nodesInRelativeHorizontal.includes(H) || (s.nodesInRelativeHorizontal.push(H), s.nodeToRelativeConstraintMapHorizontal.set(H, []), s.dummyToNodeForVerticalAlignment.has(H) ? s.nodeToTempPositionMapHorizontal.set(H, s.idToNodeMap.get(s.dummyToNodeForVerticalAlignment.get(H)[0]).getCenterX()) : s.nodeToTempPositionMapHorizontal.set(H, s.idToNodeMap.get(H).getCenterX())), s.nodeToRelativeConstraintMapHorizontal.get(U).push({ right: H, gap: M.gap }), s.nodeToRelativeConstraintMapHorizontal.get(H).push({ left: U, gap: M.gap });
              } else {
                var K = G.has(M.top) ? G.get(M.top) : M.top, ht = G.has(M.bottom) ? G.get(M.bottom) : M.bottom;
                s.nodesInRelativeVertical.includes(K) || (s.nodesInRelativeVertical.push(K), s.nodeToRelativeConstraintMapVertical.set(K, []), s.dummyToNodeForHorizontalAlignment.has(K) ? s.nodeToTempPositionMapVertical.set(K, s.idToNodeMap.get(s.dummyToNodeForHorizontalAlignment.get(K)[0]).getCenterY()) : s.nodeToTempPositionMapVertical.set(K, s.idToNodeMap.get(K).getCenterY())), s.nodesInRelativeVertical.includes(ht) || (s.nodesInRelativeVertical.push(ht), s.nodeToRelativeConstraintMapVertical.set(ht, []), s.dummyToNodeForHorizontalAlignment.has(ht) ? s.nodeToTempPositionMapVertical.set(ht, s.idToNodeMap.get(s.dummyToNodeForHorizontalAlignment.get(ht)[0]).getCenterY()) : s.nodeToTempPositionMapVertical.set(ht, s.idToNodeMap.get(ht).getCenterY())), s.nodeToRelativeConstraintMapVertical.get(K).push({ bottom: ht, gap: M.gap }), s.nodeToRelativeConstraintMapVertical.get(ht).push({ top: K, gap: M.gap });
              }
            });
            else {
              var Z = /* @__PURE__ */ new Map(), et = /* @__PURE__ */ new Map();
              this.constraints.relativePlacementConstraint.forEach(function(M) {
                if (M.left) {
                  var U = x.has(M.left) ? x.get(M.left) : M.left, H = x.has(M.right) ? x.get(M.right) : M.right;
                  Z.has(U) ? Z.get(U).push(H) : Z.set(U, [H]), Z.has(H) ? Z.get(H).push(U) : Z.set(H, [U]);
                } else {
                  var K = G.has(M.top) ? G.get(M.top) : M.top, ht = G.has(M.bottom) ? G.get(M.bottom) : M.bottom;
                  et.has(K) ? et.get(K).push(ht) : et.set(K, [ht]), et.has(ht) ? et.get(ht).push(K) : et.set(ht, [K]);
                }
              });
              var F = m(function(U, H) {
                var K = [], ht = [], Nt = new _(), St = /* @__PURE__ */ new Set(), Q = 0;
                return U.forEach(function(Yt, wt) {
                  if (!St.has(wt)) {
                    K[Q] = [], ht[Q] = false;
                    var ot = wt;
                    for (Nt.push(ot), St.add(ot), K[Q].push(ot); Nt.length != 0; ) {
                      ot = Nt.shift(), H.has(ot) && (ht[Q] = true);
                      var rt = U.get(ot);
                      rt.forEach(function(vt) {
                        St.has(vt) || (Nt.push(vt), St.add(vt), K[Q].push(vt));
                      });
                    }
                    Q++;
                  }
                }), { components: K, isFixed: ht };
              }, "constructComponents"), tt = F(Z, s.fixedNodesOnHorizontal);
              this.componentsOnHorizontal = tt.components, this.fixedComponentsOnHorizontal = tt.isFixed;
              var z = F(et, s.fixedNodesOnVertical);
              this.componentsOnVertical = z.components, this.fixedComponentsOnVertical = z.isFixed;
            }
          }
        }, R.prototype.updateDisplacements = function() {
          var s = this;
          if (this.constraints.fixedNodeConstraint && this.constraints.fixedNodeConstraint.forEach(function(z) {
            var M = s.idToNodeMap.get(z.nodeId);
            M.displacementX = 0, M.displacementY = 0;
          }), this.constraints.alignmentConstraint) {
            if (this.constraints.alignmentConstraint.vertical) for (var m2 = this.constraints.alignmentConstraint.vertical, p = 0; p < m2.length; p++) {
              for (var E = 0, d3 = 0; d3 < m2[p].length; d3++) {
                if (this.fixedNodeSet.has(m2[p][d3])) {
                  E = 0;
                  break;
                }
                E += this.idToNodeMap.get(m2[p][d3]).displacementX;
              }
              for (var O = E / m2[p].length, d3 = 0; d3 < m2[p].length; d3++) this.idToNodeMap.get(m2[p][d3]).displacementX = O;
            }
            if (this.constraints.alignmentConstraint.horizontal) for (var x = this.constraints.alignmentConstraint.horizontal, p = 0; p < x.length; p++) {
              for (var G = 0, d3 = 0; d3 < x[p].length; d3++) {
                if (this.fixedNodeSet.has(x[p][d3])) {
                  G = 0;
                  break;
                }
                G += this.idToNodeMap.get(x[p][d3]).displacementY;
              }
              for (var b = G / x[p].length, d3 = 0; d3 < x[p].length; d3++) this.idToNodeMap.get(x[p][d3]).displacementY = b;
            }
          }
          if (this.constraints.relativePlacementConstraint) if (h.RELAX_MOVEMENT_ON_CONSTRAINTS) this.totalIterations % 10 == 0 && (this.shuffle(this.nodesInRelativeHorizontal), this.shuffle(this.nodesInRelativeVertical)), this.nodesInRelativeHorizontal.forEach(function(z) {
            if (!s.fixedNodesOnHorizontal.has(z)) {
              var M = 0;
              s.dummyToNodeForVerticalAlignment.has(z) ? M = s.idToNodeMap.get(s.dummyToNodeForVerticalAlignment.get(z)[0]).displacementX : M = s.idToNodeMap.get(z).displacementX, s.nodeToRelativeConstraintMapHorizontal.get(z).forEach(function(U) {
                if (U.right) {
                  var H = s.nodeToTempPositionMapHorizontal.get(U.right) - s.nodeToTempPositionMapHorizontal.get(z) - M;
                  H < U.gap && (M -= U.gap - H);
                } else {
                  var H = s.nodeToTempPositionMapHorizontal.get(z) - s.nodeToTempPositionMapHorizontal.get(U.left) + M;
                  H < U.gap && (M += U.gap - H);
                }
              }), s.nodeToTempPositionMapHorizontal.set(z, s.nodeToTempPositionMapHorizontal.get(z) + M), s.dummyToNodeForVerticalAlignment.has(z) ? s.dummyToNodeForVerticalAlignment.get(z).forEach(function(U) {
                s.idToNodeMap.get(U).displacementX = M;
              }) : s.idToNodeMap.get(z).displacementX = M;
            }
          }), this.nodesInRelativeVertical.forEach(function(z) {
            if (!s.fixedNodesOnHorizontal.has(z)) {
              var M = 0;
              s.dummyToNodeForHorizontalAlignment.has(z) ? M = s.idToNodeMap.get(s.dummyToNodeForHorizontalAlignment.get(z)[0]).displacementY : M = s.idToNodeMap.get(z).displacementY, s.nodeToRelativeConstraintMapVertical.get(z).forEach(function(U) {
                if (U.bottom) {
                  var H = s.nodeToTempPositionMapVertical.get(U.bottom) - s.nodeToTempPositionMapVertical.get(z) - M;
                  H < U.gap && (M -= U.gap - H);
                } else {
                  var H = s.nodeToTempPositionMapVertical.get(z) - s.nodeToTempPositionMapVertical.get(U.top) + M;
                  H < U.gap && (M += U.gap - H);
                }
              }), s.nodeToTempPositionMapVertical.set(z, s.nodeToTempPositionMapVertical.get(z) + M), s.dummyToNodeForHorizontalAlignment.has(z) ? s.dummyToNodeForHorizontalAlignment.get(z).forEach(function(U) {
                s.idToNodeMap.get(U).displacementY = M;
              }) : s.idToNodeMap.get(z).displacementY = M;
            }
          });
          else {
            for (var p = 0; p < this.componentsOnHorizontal.length; p++) {
              var I = this.componentsOnHorizontal[p];
              if (this.fixedComponentsOnHorizontal[p]) for (var d3 = 0; d3 < I.length; d3++) this.dummyToNodeForVerticalAlignment.has(I[d3]) ? this.dummyToNodeForVerticalAlignment.get(I[d3]).forEach(function(U) {
                s.idToNodeMap.get(U).displacementX = 0;
              }) : this.idToNodeMap.get(I[d3]).displacementX = 0;
              else {
                for (var Z = 0, et = 0, d3 = 0; d3 < I.length; d3++) if (this.dummyToNodeForVerticalAlignment.has(I[d3])) {
                  var F = this.dummyToNodeForVerticalAlignment.get(I[d3]);
                  Z += F.length * this.idToNodeMap.get(F[0]).displacementX, et += F.length;
                } else Z += this.idToNodeMap.get(I[d3]).displacementX, et++;
                for (var tt = Z / et, d3 = 0; d3 < I.length; d3++) this.dummyToNodeForVerticalAlignment.has(I[d3]) ? this.dummyToNodeForVerticalAlignment.get(I[d3]).forEach(function(U) {
                  s.idToNodeMap.get(U).displacementX = tt;
                }) : this.idToNodeMap.get(I[d3]).displacementX = tt;
              }
            }
            for (var p = 0; p < this.componentsOnVertical.length; p++) {
              var I = this.componentsOnVertical[p];
              if (this.fixedComponentsOnVertical[p]) for (var d3 = 0; d3 < I.length; d3++) this.dummyToNodeForHorizontalAlignment.has(I[d3]) ? this.dummyToNodeForHorizontalAlignment.get(I[d3]).forEach(function(H) {
                s.idToNodeMap.get(H).displacementY = 0;
              }) : this.idToNodeMap.get(I[d3]).displacementY = 0;
              else {
                for (var Z = 0, et = 0, d3 = 0; d3 < I.length; d3++) if (this.dummyToNodeForHorizontalAlignment.has(I[d3])) {
                  var F = this.dummyToNodeForHorizontalAlignment.get(I[d3]);
                  Z += F.length * this.idToNodeMap.get(F[0]).displacementY, et += F.length;
                } else Z += this.idToNodeMap.get(I[d3]).displacementY, et++;
                for (var tt = Z / et, d3 = 0; d3 < I.length; d3++) this.dummyToNodeForHorizontalAlignment.has(I[d3]) ? this.dummyToNodeForHorizontalAlignment.get(I[d3]).forEach(function(Nt) {
                  s.idToNodeMap.get(Nt).displacementY = tt;
                }) : this.idToNodeMap.get(I[d3]).displacementY = tt;
              }
            }
          }
        }, R.prototype.calculateNodesToApplyGravitationTo = function() {
          var s = [], m2, p = this.graphManager.getGraphs(), E = p.length, d3;
          for (d3 = 0; d3 < E; d3++) m2 = p[d3], m2.updateConnected(), m2.isConnected || (s = s.concat(m2.getNodes()));
          return s;
        }, R.prototype.createBendpoints = function() {
          var s = [];
          s = s.concat(this.graphManager.getAllEdges());
          var m2 = /* @__PURE__ */ new Set(), p;
          for (p = 0; p < s.length; p++) {
            var E = s[p];
            if (!m2.has(E)) {
              var d3 = E.getSource(), O = E.getTarget();
              if (d3 == O) E.getBendpoints().push(new y()), E.getBendpoints().push(new y()), this.createDummyNodesForBendpoints(E), m2.add(E);
              else {
                var x = [];
                if (x = x.concat(d3.getEdgeListToNode(O)), x = x.concat(O.getEdgeListToNode(d3)), !m2.has(x[0])) {
                  if (x.length > 1) {
                    var G;
                    for (G = 0; G < x.length; G++) {
                      var b = x[G];
                      b.getBendpoints().push(new y()), this.createDummyNodesForBendpoints(b);
                    }
                  }
                  x.forEach(function(I) {
                    m2.add(I);
                  });
                }
              }
            }
            if (m2.size == s.length) break;
          }
        }, R.prototype.positionNodesRadially = function(s) {
          for (var m2 = new v(0, 0), p = Math.ceil(Math.sqrt(s.length)), E = 0, d3 = 0, O = 0, x = new y(0, 0), G = 0; G < s.length; G++) {
            G % p == 0 && (O = 0, d3 = E, G != 0 && (d3 += h.DEFAULT_COMPONENT_SEPERATION), E = 0);
            var b = s[G], I = S.findCenterOfTree(b);
            m2.x = O, m2.y = d3, x = R.radialLayout(b, I, m2), x.y > E && (E = Math.floor(x.y)), O = Math.floor(x.x + h.DEFAULT_COMPONENT_SEPERATION);
          }
          this.transform(new y(A.WORLD_CENTER_X - x.x / 2, A.WORLD_CENTER_Y - x.y / 2));
        }, R.radialLayout = function(s, m2, p) {
          var E = Math.max(this.maxDiagonalInTree(s), h.DEFAULT_RADIAL_SEPARATION);
          R.branchRadialLayout(m2, null, 0, 359, 0, E);
          var d3 = $.calculateBounds(s), O = new X();
          O.setDeviceOrgX(d3.getMinX()), O.setDeviceOrgY(d3.getMinY()), O.setWorldOrgX(p.x), O.setWorldOrgY(p.y);
          for (var x = 0; x < s.length; x++) {
            var G = s[x];
            G.transform(O);
          }
          var b = new y(d3.getMaxX(), d3.getMaxY());
          return O.inverseTransformPoint(b);
        }, R.branchRadialLayout = function(s, m2, p, E, d3, O) {
          var x = (E - p + 1) / 2;
          x < 0 && (x += 180);
          var G = (x + p) % 360, b = G * P.TWO_PI / 360, I = Math.cos(b), Z = d3 * Math.cos(b), et = d3 * Math.sin(b);
          s.setCenter(Z, et);
          var F = [];
          F = F.concat(s.getEdges());
          var tt = F.length;
          m2 != null && tt--;
          for (var z = 0, M = F.length, U, H = s.getEdgesBetween(m2); H.length > 1; ) {
            var K = H[0];
            H.splice(0, 1);
            var ht = F.indexOf(K);
            ht >= 0 && F.splice(ht, 1), M--, tt--;
          }
          m2 != null ? U = (F.indexOf(H[0]) + 1) % M : U = 0;
          for (var Nt = Math.abs(E - p) / tt, St = U; z != tt; St = ++St % M) {
            var Q = F[St].getOtherEnd(s);
            if (Q != m2) {
              var Yt = (p + z * Nt) % 360, wt = (Yt + Nt) % 360;
              R.branchRadialLayout(Q, s, Yt, wt, d3 + O, O), z++;
            }
          }
        }, R.maxDiagonalInTree = function(s) {
          for (var m2 = w.MIN_VALUE, p = 0; p < s.length; p++) {
            var E = s[p], d3 = E.getDiagonal();
            d3 > m2 && (m2 = d3);
          }
          return m2;
        }, R.prototype.calcRepulsionRange = function() {
          return 2 * (this.level + 1) * this.idealEdgeLength;
        }, R.prototype.groupZeroDegreeMembers = function() {
          var s = this, m2 = {};
          this.memberGroups = {}, this.idToDummyNode = {};
          for (var p = [], E = this.graphManager.getAllNodes(), d3 = 0; d3 < E.length; d3++) {
            var O = E[d3], x = O.getParent();
            this.getNodeDegreeWithChildren(O) === 0 && (x.id == null || !this.getToBeTiled(x)) && p.push(O);
          }
          for (var d3 = 0; d3 < p.length; d3++) {
            var O = p[d3], G = O.getParent().id;
            typeof m2[G] > "u" && (m2[G] = []), m2[G] = m2[G].concat(O);
          }
          Object.keys(m2).forEach(function(b) {
            if (m2[b].length > 1) {
              var I = "DummyCompound_" + b;
              s.memberGroups[I] = m2[b];
              var Z = m2[b][0].getParent(), et = new e(s.graphManager);
              et.id = I, et.paddingLeft = Z.paddingLeft || 0, et.paddingRight = Z.paddingRight || 0, et.paddingBottom = Z.paddingBottom || 0, et.paddingTop = Z.paddingTop || 0, s.idToDummyNode[I] = et;
              var F = s.getGraphManager().add(s.newGraph(), et), tt = Z.getChild();
              tt.add(et);
              for (var z = 0; z < m2[b].length; z++) {
                var M = m2[b][z];
                tt.remove(M), F.add(M);
              }
            }
          });
        }, R.prototype.clearCompounds = function() {
          var s = {}, m2 = {};
          this.performDFSOnCompounds();
          for (var p = 0; p < this.compoundOrder.length; p++) m2[this.compoundOrder[p].id] = this.compoundOrder[p], s[this.compoundOrder[p].id] = [].concat(this.compoundOrder[p].getChild().getNodes()), this.graphManager.remove(this.compoundOrder[p].getChild()), this.compoundOrder[p].child = null;
          this.graphManager.resetAllNodes(), this.tileCompoundMembers(s, m2);
        }, R.prototype.clearZeroDegreeMembers = function() {
          var s = this, m2 = this.tiledZeroDegreePack = [];
          Object.keys(this.memberGroups).forEach(function(p) {
            var E = s.idToDummyNode[p];
            if (m2[p] = s.tileNodes(s.memberGroups[p], E.paddingLeft + E.paddingRight), E.rect.width = m2[p].width, E.rect.height = m2[p].height, E.setCenter(m2[p].centerX, m2[p].centerY), E.labelMarginLeft = 0, E.labelMarginTop = 0, h.NODE_DIMENSIONS_INCLUDE_LABELS) {
              var d3 = E.rect.width, O = E.rect.height;
              E.labelWidth && (E.labelPosHorizontal == "left" ? (E.rect.x -= E.labelWidth, E.setWidth(d3 + E.labelWidth), E.labelMarginLeft = E.labelWidth) : E.labelPosHorizontal == "center" && E.labelWidth > d3 ? (E.rect.x -= (E.labelWidth - d3) / 2, E.setWidth(E.labelWidth), E.labelMarginLeft = (E.labelWidth - d3) / 2) : E.labelPosHorizontal == "right" && E.setWidth(d3 + E.labelWidth)), E.labelHeight && (E.labelPosVertical == "top" ? (E.rect.y -= E.labelHeight, E.setHeight(O + E.labelHeight), E.labelMarginTop = E.labelHeight) : E.labelPosVertical == "center" && E.labelHeight > O ? (E.rect.y -= (E.labelHeight - O) / 2, E.setHeight(E.labelHeight), E.labelMarginTop = (E.labelHeight - O) / 2) : E.labelPosVertical == "bottom" && E.setHeight(O + E.labelHeight));
            }
          });
        }, R.prototype.repopulateCompounds = function() {
          for (var s = this.compoundOrder.length - 1; s >= 0; s--) {
            var m2 = this.compoundOrder[s], p = m2.id, E = m2.paddingLeft, d3 = m2.paddingTop, O = m2.labelMarginLeft, x = m2.labelMarginTop;
            this.adjustLocations(this.tiledMemberPack[p], m2.rect.x, m2.rect.y, E, d3, O, x);
          }
        }, R.prototype.repopulateZeroDegreeMembers = function() {
          var s = this, m2 = this.tiledZeroDegreePack;
          Object.keys(m2).forEach(function(p) {
            var E = s.idToDummyNode[p], d3 = E.paddingLeft, O = E.paddingTop, x = E.labelMarginLeft, G = E.labelMarginTop;
            s.adjustLocations(m2[p], E.rect.x, E.rect.y, d3, O, x, G);
          });
        }, R.prototype.getToBeTiled = function(s) {
          var m2 = s.id;
          if (this.toBeTiled[m2] != null) return this.toBeTiled[m2];
          var p = s.getChild();
          if (p == null) return this.toBeTiled[m2] = false, false;
          for (var E = p.getNodes(), d3 = 0; d3 < E.length; d3++) {
            var O = E[d3];
            if (this.getNodeDegree(O) > 0) return this.toBeTiled[m2] = false, false;
            if (O.getChild() == null) {
              this.toBeTiled[O.id] = false;
              continue;
            }
            if (!this.getToBeTiled(O)) return this.toBeTiled[m2] = false, false;
          }
          return this.toBeTiled[m2] = true, true;
        }, R.prototype.getNodeDegree = function(s) {
          for (var m2 = s.id, p = s.getEdges(), E = 0, d3 = 0; d3 < p.length; d3++) {
            var O = p[d3];
            O.getSource().id !== O.getTarget().id && (E = E + 1);
          }
          return E;
        }, R.prototype.getNodeDegreeWithChildren = function(s) {
          var m2 = this.getNodeDegree(s);
          if (s.getChild() == null) return m2;
          for (var p = s.getChild().getNodes(), E = 0; E < p.length; E++) {
            var d3 = p[E];
            m2 += this.getNodeDegreeWithChildren(d3);
          }
          return m2;
        }, R.prototype.performDFSOnCompounds = function() {
          this.compoundOrder = [], this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
        }, R.prototype.fillCompexOrderByDFS = function(s) {
          for (var m2 = 0; m2 < s.length; m2++) {
            var p = s[m2];
            p.getChild() != null && this.fillCompexOrderByDFS(p.getChild().getNodes()), this.getToBeTiled(p) && this.compoundOrder.push(p);
          }
        }, R.prototype.adjustLocations = function(s, m2, p, E, d3, O, x) {
          m2 += E + O, p += d3 + x;
          for (var G = m2, b = 0; b < s.rows.length; b++) {
            var I = s.rows[b];
            m2 = G;
            for (var Z = 0, et = 0; et < I.length; et++) {
              var F = I[et];
              F.rect.x = m2, F.rect.y = p, m2 += F.rect.width + s.horizontalPadding, F.rect.height > Z && (Z = F.rect.height);
            }
            p += Z + s.verticalPadding;
          }
        }, R.prototype.tileCompoundMembers = function(s, m2) {
          var p = this;
          this.tiledMemberPack = [], Object.keys(s).forEach(function(E) {
            var d3 = m2[E];
            if (p.tiledMemberPack[E] = p.tileNodes(s[E], d3.paddingLeft + d3.paddingRight), d3.rect.width = p.tiledMemberPack[E].width, d3.rect.height = p.tiledMemberPack[E].height, d3.setCenter(p.tiledMemberPack[E].centerX, p.tiledMemberPack[E].centerY), d3.labelMarginLeft = 0, d3.labelMarginTop = 0, h.NODE_DIMENSIONS_INCLUDE_LABELS) {
              var O = d3.rect.width, x = d3.rect.height;
              d3.labelWidth && (d3.labelPosHorizontal == "left" ? (d3.rect.x -= d3.labelWidth, d3.setWidth(O + d3.labelWidth), d3.labelMarginLeft = d3.labelWidth) : d3.labelPosHorizontal == "center" && d3.labelWidth > O ? (d3.rect.x -= (d3.labelWidth - O) / 2, d3.setWidth(d3.labelWidth), d3.labelMarginLeft = (d3.labelWidth - O) / 2) : d3.labelPosHorizontal == "right" && d3.setWidth(O + d3.labelWidth)), d3.labelHeight && (d3.labelPosVertical == "top" ? (d3.rect.y -= d3.labelHeight, d3.setHeight(x + d3.labelHeight), d3.labelMarginTop = d3.labelHeight) : d3.labelPosVertical == "center" && d3.labelHeight > x ? (d3.rect.y -= (d3.labelHeight - x) / 2, d3.setHeight(d3.labelHeight), d3.labelMarginTop = (d3.labelHeight - x) / 2) : d3.labelPosVertical == "bottom" && d3.setHeight(x + d3.labelHeight));
            }
          });
        }, R.prototype.tileNodes = function(s, m2) {
          var p = this.tileNodesByFavoringDim(s, m2, true), E = this.tileNodesByFavoringDim(s, m2, false), d3 = this.getOrgRatio(p), O = this.getOrgRatio(E), x;
          return O < d3 ? x = E : x = p, x;
        }, R.prototype.getOrgRatio = function(s) {
          var m2 = s.width, p = s.height, E = m2 / p;
          return E < 1 && (E = 1 / E), E;
        }, R.prototype.calcIdealRowWidth = function(s, m2) {
          var p = h.TILING_PADDING_VERTICAL, E = h.TILING_PADDING_HORIZONTAL, d3 = s.length, O = 0, x = 0, G = 0;
          s.forEach(function(z) {
            O += z.getWidth(), x += z.getHeight(), z.getWidth() > G && (G = z.getWidth());
          });
          var b = O / d3, I = x / d3, Z = Math.pow(p - E, 2) + 4 * (b + E) * (I + p) * d3, et = (E - p + Math.sqrt(Z)) / (2 * (b + E)), F;
          m2 ? (F = Math.ceil(et), F == et && F++) : F = Math.floor(et);
          var tt = F * (b + E) - E;
          return G > tt && (tt = G), tt += E * 2, tt;
        }, R.prototype.tileNodesByFavoringDim = function(s, m2, p) {
          var E = h.TILING_PADDING_VERTICAL, d3 = h.TILING_PADDING_HORIZONTAL, O = h.TILING_COMPARE_BY, x = { rows: [], rowWidth: [], rowHeight: [], width: 0, height: m2, verticalPadding: E, horizontalPadding: d3, centerX: 0, centerY: 0 };
          O && (x.idealRowWidth = this.calcIdealRowWidth(s, p));
          var G = m(function(M) {
            return M.rect.width * M.rect.height;
          }, "getNodeArea"), b = m(function(M, U) {
            return G(U) - G(M);
          }, "areaCompareFcn");
          s.sort(function(z, M) {
            var U = b;
            return x.idealRowWidth ? (U = O, U(z.id, M.id)) : U(z, M);
          });
          for (var I = 0, Z = 0, et = 0; et < s.length; et++) {
            var F = s[et];
            I += F.getCenterX(), Z += F.getCenterY();
          }
          x.centerX = I / s.length, x.centerY = Z / s.length;
          for (var et = 0; et < s.length; et++) {
            var F = s[et];
            if (x.rows.length == 0) this.insertNodeToRow(x, F, 0, m2);
            else if (this.canAddHorizontal(x, F.rect.width, F.rect.height)) {
              var tt = x.rows.length - 1;
              x.idealRowWidth || (tt = this.getShortestRowIndex(x)), this.insertNodeToRow(x, F, tt, m2);
            } else this.insertNodeToRow(x, F, x.rows.length, m2);
            this.shiftToLastRow(x);
          }
          return x;
        }, R.prototype.insertNodeToRow = function(s, m2, p, E) {
          var d3 = E;
          if (p == s.rows.length) {
            var O = [];
            s.rows.push(O), s.rowWidth.push(d3), s.rowHeight.push(0);
          }
          var x = s.rowWidth[p] + m2.rect.width;
          s.rows[p].length > 0 && (x += s.horizontalPadding), s.rowWidth[p] = x, s.width < x && (s.width = x);
          var G = m2.rect.height;
          p > 0 && (G += s.verticalPadding);
          var b = 0;
          G > s.rowHeight[p] && (b = s.rowHeight[p], s.rowHeight[p] = G, b = s.rowHeight[p] - b), s.height += b, s.rows[p].push(m2);
        }, R.prototype.getShortestRowIndex = function(s) {
          for (var m2 = -1, p = Number.MAX_VALUE, E = 0; E < s.rows.length; E++) s.rowWidth[E] < p && (m2 = E, p = s.rowWidth[E]);
          return m2;
        }, R.prototype.getLongestRowIndex = function(s) {
          for (var m2 = -1, p = Number.MIN_VALUE, E = 0; E < s.rows.length; E++) s.rowWidth[E] > p && (m2 = E, p = s.rowWidth[E]);
          return m2;
        }, R.prototype.canAddHorizontal = function(s, m2, p) {
          if (s.idealRowWidth) {
            var E = s.rows.length - 1, d3 = s.rowWidth[E];
            return d3 + m2 + s.horizontalPadding <= s.idealRowWidth;
          }
          var O = this.getShortestRowIndex(s);
          if (O < 0) return true;
          var x = s.rowWidth[O];
          if (x + s.horizontalPadding + m2 <= s.width) return true;
          var G = 0;
          s.rowHeight[O] < p && O > 0 && (G = p + s.verticalPadding - s.rowHeight[O]);
          var b;
          s.width - x >= m2 + s.horizontalPadding ? b = (s.height + G) / (x + m2 + s.horizontalPadding) : b = (s.height + G) / s.width, G = p + s.verticalPadding;
          var I;
          return s.width < m2 ? I = (s.height + G) / m2 : I = (s.height + G) / s.width, I < 1 && (I = 1 / I), b < 1 && (b = 1 / b), b < I;
        }, R.prototype.shiftToLastRow = function(s) {
          var m2 = this.getLongestRowIndex(s), p = s.rowWidth.length - 1, E = s.rows[m2], d3 = E[E.length - 1], O = d3.width + s.horizontalPadding;
          if (s.width - s.rowWidth[p] > O && m2 != p) {
            E.splice(-1, 1), s.rows[p].push(d3), s.rowWidth[m2] = s.rowWidth[m2] - O, s.rowWidth[p] = s.rowWidth[p] + O, s.width = s.rowWidth[instance.getLongestRowIndex(s)];
            for (var x = Number.MIN_VALUE, G = 0; G < E.length; G++) E[G].height > x && (x = E[G].height);
            m2 > 0 && (x += s.verticalPadding);
            var b = s.rowHeight[m2] + s.rowHeight[p];
            s.rowHeight[m2] = x, s.rowHeight[p] < d3.height + s.verticalPadding && (s.rowHeight[p] = d3.height + s.verticalPadding);
            var I = s.rowHeight[m2] + s.rowHeight[p];
            s.height += I - b, this.shiftToLastRow(s);
          }
        }, R.prototype.tilingPreLayout = function() {
          h.TILE && (this.groupZeroDegreeMembers(), this.clearCompounds(), this.clearZeroDegreeMembers());
        }, R.prototype.tilingPostLayout = function() {
          h.TILE && (this.repopulateZeroDegreeMembers(), this.repopulateCompounds());
        }, R.prototype.reduceTrees = function() {
          for (var s = [], m2 = true, p; m2; ) {
            var E = this.graphManager.getAllNodes(), d3 = [];
            m2 = false;
            for (var O = 0; O < E.length; O++) if (p = E[O], p.getEdges().length == 1 && !p.getEdges()[0].isInterGraph && p.getChild() == null) {
              if (h.PURE_INCREMENTAL) {
                var x = p.getEdges()[0].getOtherEnd(p), G = new N(p.getCenterX() - x.getCenterX(), p.getCenterY() - x.getCenterY());
                d3.push([p, p.getEdges()[0], p.getOwner(), G]);
              } else d3.push([p, p.getEdges()[0], p.getOwner()]);
              m2 = true;
            }
            if (m2 == true) {
              for (var b = [], I = 0; I < d3.length; I++) d3[I][0].getEdges().length == 1 && (b.push(d3[I]), d3[I][0].getOwner().remove(d3[I][0]));
              s.push(b), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
            }
          }
          this.prunedNodesAll = s;
        }, R.prototype.growTree = function(s) {
          for (var m2 = s.length, p = s[m2 - 1], E, d3 = 0; d3 < p.length; d3++) E = p[d3], this.findPlaceforPrunedNode(E), E[2].add(E[0]), E[2].add(E[1], E[1].source, E[1].target);
          s.splice(s.length - 1, 1), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
        }, R.prototype.findPlaceforPrunedNode = function(s) {
          var m2, p, E = s[0];
          if (E == s[1].source ? p = s[1].target : p = s[1].source, h.PURE_INCREMENTAL) E.setCenter(p.getCenterX() + s[3].getWidth(), p.getCenterY() + s[3].getHeight());
          else {
            var d3 = p.startX, O = p.finishX, x = p.startY, G = p.finishY, b = 0, I = 0, Z = 0, et = 0, F = [b, Z, I, et];
            if (x > 0) for (var tt = d3; tt <= O; tt++) F[0] += this.grid[tt][x - 1].length + this.grid[tt][x].length - 1;
            if (O < this.grid.length - 1) for (var tt = x; tt <= G; tt++) F[1] += this.grid[O + 1][tt].length + this.grid[O][tt].length - 1;
            if (G < this.grid[0].length - 1) for (var tt = d3; tt <= O; tt++) F[2] += this.grid[tt][G + 1].length + this.grid[tt][G].length - 1;
            if (d3 > 0) for (var tt = x; tt <= G; tt++) F[3] += this.grid[d3 - 1][tt].length + this.grid[d3][tt].length - 1;
            for (var z = w.MAX_VALUE, M, U, H = 0; H < F.length; H++) F[H] < z ? (z = F[H], M = 1, U = H) : F[H] == z && M++;
            if (M == 3 && z == 0) F[0] == 0 && F[1] == 0 && F[2] == 0 ? m2 = 1 : F[0] == 0 && F[1] == 0 && F[3] == 0 ? m2 = 0 : F[0] == 0 && F[2] == 0 && F[3] == 0 ? m2 = 3 : F[1] == 0 && F[2] == 0 && F[3] == 0 && (m2 = 2);
            else if (M == 2 && z == 0) {
              var K = Math.floor(Math.random() * 2);
              F[0] == 0 && F[1] == 0 ? K == 0 ? m2 = 0 : m2 = 1 : F[0] == 0 && F[2] == 0 ? K == 0 ? m2 = 0 : m2 = 2 : F[0] == 0 && F[3] == 0 ? K == 0 ? m2 = 0 : m2 = 3 : F[1] == 0 && F[2] == 0 ? K == 0 ? m2 = 1 : m2 = 2 : F[1] == 0 && F[3] == 0 ? K == 0 ? m2 = 1 : m2 = 3 : K == 0 ? m2 = 2 : m2 = 3;
            } else if (M == 4 && z == 0) {
              var K = Math.floor(Math.random() * 4);
              m2 = K;
            } else m2 = U;
            m2 == 0 ? E.setCenter(p.getCenterX(), p.getCenterY() - p.getHeight() / 2 - o2.DEFAULT_EDGE_LENGTH - E.getHeight() / 2) : m2 == 1 ? E.setCenter(p.getCenterX() + p.getWidth() / 2 + o2.DEFAULT_EDGE_LENGTH + E.getWidth() / 2, p.getCenterY()) : m2 == 2 ? E.setCenter(p.getCenterX(), p.getCenterY() + p.getHeight() / 2 + o2.DEFAULT_EDGE_LENGTH + E.getHeight() / 2) : E.setCenter(p.getCenterX() - p.getWidth() / 2 - o2.DEFAULT_EDGE_LENGTH - E.getWidth() / 2, p.getCenterY());
          }
        }, a.exports = R;
      }, 991: (a, i, n) => {
        var c2 = n(551).FDLayoutNode, t = n(551).IMath;
        function u(r2, h, f, o2) {
          c2.call(this, r2, h, f, o2);
        }
        m(u, "CoSENode"), u.prototype = Object.create(c2.prototype);
        for (var e in c2) u[e] = c2[e];
        u.prototype.calculateDisplacement = function() {
          var r2 = this.graphManager.getLayout();
          this.getChild() != null && this.fixedNodeWeight ? (this.displacementX += r2.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.fixedNodeWeight, this.displacementY += r2.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.fixedNodeWeight) : (this.displacementX += r2.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren, this.displacementY += r2.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren), Math.abs(this.displacementX) > r2.coolingFactor * r2.maxNodeDisplacement && (this.displacementX = r2.coolingFactor * r2.maxNodeDisplacement * t.sign(this.displacementX)), Math.abs(this.displacementY) > r2.coolingFactor * r2.maxNodeDisplacement && (this.displacementY = r2.coolingFactor * r2.maxNodeDisplacement * t.sign(this.displacementY)), this.child && this.child.getNodes().length > 0 && this.propogateDisplacementToChildren(this.displacementX, this.displacementY);
        }, u.prototype.propogateDisplacementToChildren = function(r2, h) {
          for (var f = this.getChild().getNodes(), o2, A = 0; A < f.length; A++) o2 = f[A], o2.getChild() == null ? (o2.displacementX += r2, o2.displacementY += h) : o2.propogateDisplacementToChildren(r2, h);
        }, u.prototype.move = function() {
          var r2 = this.graphManager.getLayout();
          (this.child == null || this.child.getNodes().length == 0) && (this.moveBy(this.displacementX, this.displacementY), r2.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY)), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0;
        }, u.prototype.setPred1 = function(r2) {
          this.pred1 = r2;
        }, u.prototype.getPred1 = function() {
          return pred1;
        }, u.prototype.getPred2 = function() {
          return pred2;
        }, u.prototype.setNext = function(r2) {
          this.next = r2;
        }, u.prototype.getNext = function() {
          return next;
        }, u.prototype.setProcessed = function(r2) {
          this.processed = r2;
        }, u.prototype.isProcessed = function() {
          return processed;
        }, a.exports = u;
      }, 902: (a, i, n) => {
        function c2(f) {
          if (Array.isArray(f)) {
            for (var o2 = 0, A = Array(f.length); o2 < f.length; o2++) A[o2] = f[o2];
            return A;
          } else return Array.from(f);
        }
        m(c2, "_toConsumableArray");
        var t = n(806), u = n(551).LinkedList, e = n(551).Matrix, r2 = n(551).SVD;
        function h() {
        }
        m(h, "ConstraintHandler"), h.handleConstraints = function(f) {
          var o2 = {};
          o2.fixedNodeConstraint = f.constraints.fixedNodeConstraint, o2.alignmentConstraint = f.constraints.alignmentConstraint, o2.relativePlacementConstraint = f.constraints.relativePlacementConstraint;
          for (var A = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), y = [], N = [], S = f.getAllNodes(), w = 0, P = 0; P < S.length; P++) {
            var $ = S[P];
            $.getChild() == null && (v.set($.id, w++), y.push($.getCenterX()), N.push($.getCenterY()), A.set($.id, $));
          }
          o2.relativePlacementConstraint && o2.relativePlacementConstraint.forEach(function(Y) {
            !Y.gap && Y.gap != 0 && (Y.left ? Y.gap = t.DEFAULT_EDGE_LENGTH + A.get(Y.left).getWidth() / 2 + A.get(Y.right).getWidth() / 2 : Y.gap = t.DEFAULT_EDGE_LENGTH + A.get(Y.top).getHeight() / 2 + A.get(Y.bottom).getHeight() / 2);
          });
          var X = m(function(W, V) {
            return { x: W.x - V.x, y: W.y - V.y };
          }, "calculatePositionDiff"), _ = m(function(W) {
            var V = 0, B = 0;
            return W.forEach(function(k) {
              V += y[v.get(k)], B += N[v.get(k)];
            }), { x: V / W.size, y: B / W.size };
          }, "calculateAvgPosition"), R = m(function(W, V, B, k, j) {
            function gt(st2, nt) {
              var dt = new Set(st2), at = true, ct = false, bt = void 0;
              try {
                for (var Ot2 = nt[Symbol.iterator](), Vt; !(at = (Vt = Ot2.next()).done); at = true) {
                  var xt = Vt.value;
                  dt.add(xt);
                }
              } catch (At) {
                ct = true, bt = At;
              } finally {
                try {
                  !at && Ot2.return && Ot2.return();
                } finally {
                  if (ct) throw bt;
                }
              }
              return dt;
            }
            m(gt, "setUnion");
            var ft = /* @__PURE__ */ new Map();
            W.forEach(function(st2, nt) {
              ft.set(nt, 0);
            }), W.forEach(function(st2, nt) {
              st2.forEach(function(dt) {
                ft.set(dt.id, ft.get(dt.id) + 1);
              });
            });
            var q = /* @__PURE__ */ new Map(), lt = /* @__PURE__ */ new Map(), ut = new u();
            ft.forEach(function(st2, nt) {
              st2 == 0 ? (ut.push(nt), B || (V == "horizontal" ? q.set(nt, v.has(nt) ? y[v.get(nt)] : k.get(nt)) : q.set(nt, v.has(nt) ? N[v.get(nt)] : k.get(nt)))) : q.set(nt, Number.NEGATIVE_INFINITY), B && lt.set(nt, /* @__PURE__ */ new Set([nt]));
            }), B && j.forEach(function(st2) {
              var nt = [];
              if (st2.forEach(function(ct) {
                B.has(ct) && nt.push(ct);
              }), nt.length > 0) {
                var dt = 0;
                nt.forEach(function(ct) {
                  V == "horizontal" ? (q.set(ct, v.has(ct) ? y[v.get(ct)] : k.get(ct)), dt += q.get(ct)) : (q.set(ct, v.has(ct) ? N[v.get(ct)] : k.get(ct)), dt += q.get(ct));
                }), dt = dt / nt.length, st2.forEach(function(ct) {
                  B.has(ct) || q.set(ct, dt);
                });
              } else {
                var at = 0;
                st2.forEach(function(ct) {
                  V == "horizontal" ? at += v.has(ct) ? y[v.get(ct)] : k.get(ct) : at += v.has(ct) ? N[v.get(ct)] : k.get(ct);
                }), at = at / st2.length, st2.forEach(function(ct) {
                  q.set(ct, at);
                });
              }
            });
            for (var it = m(function() {
              var nt = ut.shift(), dt = W.get(nt);
              dt.forEach(function(at) {
                if (q.get(at.id) < q.get(nt) + at.gap) if (B && B.has(at.id)) {
                  var ct = void 0;
                  if (V == "horizontal" ? ct = v.has(at.id) ? y[v.get(at.id)] : k.get(at.id) : ct = v.has(at.id) ? N[v.get(at.id)] : k.get(at.id), q.set(at.id, ct), ct < q.get(nt) + at.gap) {
                    var bt = q.get(nt) + at.gap - ct;
                    lt.get(nt).forEach(function(Ot2) {
                      q.set(Ot2, q.get(Ot2) - bt);
                    });
                  }
                } else q.set(at.id, q.get(nt) + at.gap);
                ft.set(at.id, ft.get(at.id) - 1), ft.get(at.id) == 0 && ut.push(at.id), B && lt.set(at.id, gt(lt.get(nt), lt.get(at.id)));
              });
            }, "_loop"); ut.length != 0; ) it();
            if (B) {
              var pt2 = /* @__PURE__ */ new Set();
              W.forEach(function(st2, nt) {
                st2.length == 0 && pt2.add(nt);
              });
              var Dt = [];
              lt.forEach(function(st2, nt) {
                if (pt2.has(nt)) {
                  var dt = false, at = true, ct = false, bt = void 0;
                  try {
                    for (var Ot2 = st2[Symbol.iterator](), Vt; !(at = (Vt = Ot2.next()).done); at = true) {
                      var xt = Vt.value;
                      B.has(xt) && (dt = true);
                    }
                  } catch (Rt) {
                    ct = true, bt = Rt;
                  } finally {
                    try {
                      !at && Ot2.return && Ot2.return();
                    } finally {
                      if (ct) throw bt;
                    }
                  }
                  if (!dt) {
                    var At = false, $t = void 0;
                    Dt.forEach(function(Rt, Xt) {
                      Rt.has([].concat(c2(st2))[0]) && (At = true, $t = Xt);
                    }), At ? st2.forEach(function(Rt) {
                      Dt[$t].add(Rt);
                    }) : Dt.push(new Set(st2));
                  }
                }
              }), Dt.forEach(function(st2, nt) {
                var dt = Number.POSITIVE_INFINITY, at = Number.POSITIVE_INFINITY, ct = Number.NEGATIVE_INFINITY, bt = Number.NEGATIVE_INFINITY, Ot2 = true, Vt = false, xt = void 0;
                try {
                  for (var At = st2[Symbol.iterator](), $t; !(Ot2 = ($t = At.next()).done); Ot2 = true) {
                    var Rt = $t.value, Xt = void 0;
                    V == "horizontal" ? Xt = v.has(Rt) ? y[v.get(Rt)] : k.get(Rt) : Xt = v.has(Rt) ? N[v.get(Rt)] : k.get(Rt);
                    var zt = q.get(Rt);
                    Xt < dt && (dt = Xt), Xt > ct && (ct = Xt), zt < at && (at = zt), zt > bt && (bt = zt);
                  }
                } catch (ee) {
                  Vt = true, xt = ee;
                } finally {
                  try {
                    !Ot2 && At.return && At.return();
                  } finally {
                    if (Vt) throw xt;
                  }
                }
                var ve2 = (dt + ct) / 2 - (at + bt) / 2, qt = true, jt = false, _t = void 0;
                try {
                  for (var Qt = st2[Symbol.iterator](), ce; !(qt = (ce = Qt.next()).done); qt = true) {
                    var te = ce.value;
                    q.set(te, q.get(te) + ve2);
                  }
                } catch (ee) {
                  jt = true, _t = ee;
                } finally {
                  try {
                    !qt && Qt.return && Qt.return();
                  } finally {
                    if (jt) throw _t;
                  }
                }
              });
            }
            return q;
          }, "findAppropriatePositionForRelativePlacement"), J = m(function(W) {
            var V = 0, B = 0, k = 0, j = 0;
            if (W.forEach(function(lt) {
              lt.left ? y[v.get(lt.left)] - y[v.get(lt.right)] >= 0 ? V++ : B++ : N[v.get(lt.top)] - N[v.get(lt.bottom)] >= 0 ? k++ : j++;
            }), V > B && k > j) for (var gt = 0; gt < v.size; gt++) y[gt] = -1 * y[gt], N[gt] = -1 * N[gt];
            else if (V > B) for (var ft = 0; ft < v.size; ft++) y[ft] = -1 * y[ft];
            else if (k > j) for (var q = 0; q < v.size; q++) N[q] = -1 * N[q];
          }, "applyReflectionForRelativePlacement"), s = m(function(W) {
            var V = [], B = new u(), k = /* @__PURE__ */ new Set(), j = 0;
            return W.forEach(function(gt, ft) {
              if (!k.has(ft)) {
                V[j] = [];
                var q = ft;
                for (B.push(q), k.add(q), V[j].push(q); B.length != 0; ) {
                  q = B.shift();
                  var lt = W.get(q);
                  lt.forEach(function(ut) {
                    k.has(ut.id) || (B.push(ut.id), k.add(ut.id), V[j].push(ut.id));
                  });
                }
                j++;
              }
            }), V;
          }, "findComponents"), m2 = m(function(W) {
            var V = /* @__PURE__ */ new Map();
            return W.forEach(function(B, k) {
              V.set(k, []);
            }), W.forEach(function(B, k) {
              B.forEach(function(j) {
                V.get(k).push(j), V.get(j.id).push({ id: k, gap: j.gap, direction: j.direction });
              });
            }), V;
          }, "dagToUndirected"), p = m(function(W) {
            var V = /* @__PURE__ */ new Map();
            return W.forEach(function(B, k) {
              V.set(k, []);
            }), W.forEach(function(B, k) {
              B.forEach(function(j) {
                V.get(j.id).push({ id: k, gap: j.gap, direction: j.direction });
              });
            }), V;
          }, "dagToReversed"), E = [], d3 = [], O = false, x = false, G = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), Z = [];
          if (o2.fixedNodeConstraint && o2.fixedNodeConstraint.forEach(function(Y) {
            G.add(Y.nodeId);
          }), o2.relativePlacementConstraint && (o2.relativePlacementConstraint.forEach(function(Y) {
            Y.left ? (b.has(Y.left) ? b.get(Y.left).push({ id: Y.right, gap: Y.gap, direction: "horizontal" }) : b.set(Y.left, [{ id: Y.right, gap: Y.gap, direction: "horizontal" }]), b.has(Y.right) || b.set(Y.right, [])) : (b.has(Y.top) ? b.get(Y.top).push({ id: Y.bottom, gap: Y.gap, direction: "vertical" }) : b.set(Y.top, [{ id: Y.bottom, gap: Y.gap, direction: "vertical" }]), b.has(Y.bottom) || b.set(Y.bottom, []));
          }), I = m2(b), Z = s(I)), t.TRANSFORM_ON_CONSTRAINT_HANDLING) {
            if (o2.fixedNodeConstraint && o2.fixedNodeConstraint.length > 1) o2.fixedNodeConstraint.forEach(function(Y, W) {
              E[W] = [Y.position.x, Y.position.y], d3[W] = [y[v.get(Y.nodeId)], N[v.get(Y.nodeId)]];
            }), O = true;
            else if (o2.alignmentConstraint) (function() {
              var Y = 0;
              if (o2.alignmentConstraint.vertical) {
                for (var W = o2.alignmentConstraint.vertical, V = m(function(q) {
                  var lt = /* @__PURE__ */ new Set();
                  W[q].forEach(function(pt2) {
                    lt.add(pt2);
                  });
                  var ut = new Set([].concat(c2(lt)).filter(function(pt2) {
                    return G.has(pt2);
                  })), it = void 0;
                  ut.size > 0 ? it = y[v.get(ut.values().next().value)] : it = _(lt).x, W[q].forEach(function(pt2) {
                    E[Y] = [it, N[v.get(pt2)]], d3[Y] = [y[v.get(pt2)], N[v.get(pt2)]], Y++;
                  });
                }, "_loop2"), B = 0; B < W.length; B++) V(B);
                O = true;
              }
              if (o2.alignmentConstraint.horizontal) {
                for (var k = o2.alignmentConstraint.horizontal, j = m(function(q) {
                  var lt = /* @__PURE__ */ new Set();
                  k[q].forEach(function(pt2) {
                    lt.add(pt2);
                  });
                  var ut = new Set([].concat(c2(lt)).filter(function(pt2) {
                    return G.has(pt2);
                  })), it = void 0;
                  ut.size > 0 ? it = y[v.get(ut.values().next().value)] : it = _(lt).y, k[q].forEach(function(pt2) {
                    E[Y] = [y[v.get(pt2)], it], d3[Y] = [y[v.get(pt2)], N[v.get(pt2)]], Y++;
                  });
                }, "_loop3"), gt = 0; gt < k.length; gt++) j(gt);
                O = true;
              }
              o2.relativePlacementConstraint && (x = true);
            })();
            else if (o2.relativePlacementConstraint) {
              for (var et = 0, F = 0, tt = 0; tt < Z.length; tt++) Z[tt].length > et && (et = Z[tt].length, F = tt);
              if (et < I.size / 2) J(o2.relativePlacementConstraint), O = false, x = false;
              else {
                var z = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), U = [];
                Z[F].forEach(function(Y) {
                  b.get(Y).forEach(function(W) {
                    W.direction == "horizontal" ? (z.has(Y) ? z.get(Y).push(W) : z.set(Y, [W]), z.has(W.id) || z.set(W.id, []), U.push({ left: Y, right: W.id })) : (M.has(Y) ? M.get(Y).push(W) : M.set(Y, [W]), M.has(W.id) || M.set(W.id, []), U.push({ top: Y, bottom: W.id }));
                  });
                }), J(U), x = false;
                var H = R(z, "horizontal"), K = R(M, "vertical");
                Z[F].forEach(function(Y, W) {
                  d3[W] = [y[v.get(Y)], N[v.get(Y)]], E[W] = [], H.has(Y) ? E[W][0] = H.get(Y) : E[W][0] = y[v.get(Y)], K.has(Y) ? E[W][1] = K.get(Y) : E[W][1] = N[v.get(Y)];
                }), O = true;
              }
            }
            if (O) {
              for (var ht = void 0, Nt = e.transpose(E), St = e.transpose(d3), Q = 0; Q < Nt.length; Q++) Nt[Q] = e.multGamma(Nt[Q]), St[Q] = e.multGamma(St[Q]);
              var Yt = e.multMat(Nt, e.transpose(St)), wt = r2.svd(Yt);
              ht = e.multMat(wt.V, e.transpose(wt.U));
              for (var ot = 0; ot < v.size; ot++) {
                var rt = [y[ot], N[ot]], vt = [ht[0][0], ht[1][0]], mt2 = [ht[0][1], ht[1][1]];
                y[ot] = e.dotProduct(rt, vt), N[ot] = e.dotProduct(rt, mt2);
              }
              x && J(o2.relativePlacementConstraint);
            }
          }
          if (t.ENFORCE_CONSTRAINTS) {
            if (o2.fixedNodeConstraint && o2.fixedNodeConstraint.length > 0) {
              var Lt2 = { x: 0, y: 0 };
              o2.fixedNodeConstraint.forEach(function(Y, W) {
                var V = { x: y[v.get(Y.nodeId)], y: N[v.get(Y.nodeId)] }, B = Y.position, k = X(B, V);
                Lt2.x += k.x, Lt2.y += k.y;
              }), Lt2.x /= o2.fixedNodeConstraint.length, Lt2.y /= o2.fixedNodeConstraint.length, y.forEach(function(Y, W) {
                y[W] += Lt2.x;
              }), N.forEach(function(Y, W) {
                N[W] += Lt2.y;
              }), o2.fixedNodeConstraint.forEach(function(Y) {
                y[v.get(Y.nodeId)] = Y.position.x, N[v.get(Y.nodeId)] = Y.position.y;
              });
            }
            if (o2.alignmentConstraint) {
              if (o2.alignmentConstraint.vertical) for (var Et = o2.alignmentConstraint.vertical, Tt = m(function(W) {
                var V = /* @__PURE__ */ new Set();
                Et[W].forEach(function(j) {
                  V.add(j);
                });
                var B = new Set([].concat(c2(V)).filter(function(j) {
                  return G.has(j);
                })), k = void 0;
                B.size > 0 ? k = y[v.get(B.values().next().value)] : k = _(V).x, V.forEach(function(j) {
                  G.has(j) || (y[v.get(j)] = k);
                });
              }, "_loop4"), Mt = 0; Mt < Et.length; Mt++) Tt(Mt);
              if (o2.alignmentConstraint.horizontal) for (var It = o2.alignmentConstraint.horizontal, Wt = m(function(W) {
                var V = /* @__PURE__ */ new Set();
                It[W].forEach(function(j) {
                  V.add(j);
                });
                var B = new Set([].concat(c2(V)).filter(function(j) {
                  return G.has(j);
                })), k = void 0;
                B.size > 0 ? k = N[v.get(B.values().next().value)] : k = _(V).y, V.forEach(function(j) {
                  G.has(j) || (N[v.get(j)] = k);
                });
              }, "_loop5"), Pt = 0; Pt < It.length; Pt++) Wt(Pt);
            }
            o2.relativePlacementConstraint && function() {
              var Y = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), gt = /* @__PURE__ */ new Set(), ft = /* @__PURE__ */ new Set();
              if (G.forEach(function(Gt) {
                gt.add(Gt), ft.add(Gt);
              }), o2.alignmentConstraint) {
                if (o2.alignmentConstraint.vertical) for (var q = o2.alignmentConstraint.vertical, lt = m(function(yt) {
                  V.set("dummy" + yt, []), q[yt].forEach(function(Ct) {
                    Y.set(Ct, "dummy" + yt), V.get("dummy" + yt).push(Ct), G.has(Ct) && gt.add("dummy" + yt);
                  }), k.set("dummy" + yt, y[v.get(q[yt][0])]);
                }, "_loop6"), ut = 0; ut < q.length; ut++) lt(ut);
                if (o2.alignmentConstraint.horizontal) for (var it = o2.alignmentConstraint.horizontal, pt2 = m(function(yt) {
                  B.set("dummy" + yt, []), it[yt].forEach(function(Ct) {
                    W.set(Ct, "dummy" + yt), B.get("dummy" + yt).push(Ct), G.has(Ct) && ft.add("dummy" + yt);
                  }), j.set("dummy" + yt, N[v.get(it[yt][0])]);
                }, "_loop7"), Dt = 0; Dt < it.length; Dt++) pt2(Dt);
              }
              var st2 = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Map(), dt = m(function(yt) {
                b.get(yt).forEach(function(Ct) {
                  var Zt = void 0, Bt = void 0;
                  Ct.direction == "horizontal" ? (Zt = Y.get(yt) ? Y.get(yt) : yt, Y.get(Ct.id) ? Bt = { id: Y.get(Ct.id), gap: Ct.gap, direction: Ct.direction } : Bt = Ct, st2.has(Zt) ? st2.get(Zt).push(Bt) : st2.set(Zt, [Bt]), st2.has(Bt.id) || st2.set(Bt.id, [])) : (Zt = W.get(yt) ? W.get(yt) : yt, W.get(Ct.id) ? Bt = { id: W.get(Ct.id), gap: Ct.gap, direction: Ct.direction } : Bt = Ct, nt.has(Zt) ? nt.get(Zt).push(Bt) : nt.set(Zt, [Bt]), nt.has(Bt.id) || nt.set(Bt.id, []));
                });
              }, "_loop8"), at = true, ct = false, bt = void 0;
              try {
                for (var Ot2 = b.keys()[Symbol.iterator](), Vt; !(at = (Vt = Ot2.next()).done); at = true) {
                  var xt = Vt.value;
                  dt(xt);
                }
              } catch (Gt) {
                ct = true, bt = Gt;
              } finally {
                try {
                  !at && Ot2.return && Ot2.return();
                } finally {
                  if (ct) throw bt;
                }
              }
              var At = m2(st2), $t = m2(nt), Rt = s(At), Xt = s($t), zt = p(st2), ve2 = p(nt), qt = [], jt = [];
              Rt.forEach(function(Gt, yt) {
                qt[yt] = [], Gt.forEach(function(Ct) {
                  zt.get(Ct).length == 0 && qt[yt].push(Ct);
                });
              }), Xt.forEach(function(Gt, yt) {
                jt[yt] = [], Gt.forEach(function(Ct) {
                  ve2.get(Ct).length == 0 && jt[yt].push(Ct);
                });
              });
              var _t = R(st2, "horizontal", gt, k, qt), Qt = R(nt, "vertical", ft, j, jt), ce = m(function(yt) {
                V.get(yt) ? V.get(yt).forEach(function(Ct) {
                  y[v.get(Ct)] = _t.get(yt);
                }) : y[v.get(yt)] = _t.get(yt);
              }, "_loop9"), te = true, ee = false, Se = void 0;
              try {
                for (var ye = _t.keys()[Symbol.iterator](), be; !(te = (be = ye.next()).done); te = true) {
                  var me = be.value;
                  ce(me);
                }
              } catch (Gt) {
                ee = true, Se = Gt;
              } finally {
                try {
                  !te && ye.return && ye.return();
                } finally {
                  if (ee) throw Se;
                }
              }
              var yr = m(function(yt) {
                B.get(yt) ? B.get(yt).forEach(function(Ct) {
                  N[v.get(Ct)] = Qt.get(yt);
                }) : N[v.get(yt)] = Qt.get(yt);
              }, "_loop10"), Ee = true, Fe = false, Pe = void 0;
              try {
                for (var Te = Qt.keys()[Symbol.iterator](), Ge; !(Ee = (Ge = Te.next()).done); Ee = true) {
                  var me = Ge.value;
                  yr(me);
                }
              } catch (Gt) {
                Fe = true, Pe = Gt;
              } finally {
                try {
                  !Ee && Te.return && Te.return();
                } finally {
                  if (Fe) throw Pe;
                }
              }
            }();
          }
          for (var Ut = 0; Ut < S.length; Ut++) {
            var Ft = S[Ut];
            Ft.getChild() == null && Ft.setCenter(y[v.get(Ft.id)], N[v.get(Ft.id)]);
          }
        }, a.exports = h;
      }, 551: (a) => {
        a.exports = D;
      } }, T = {};
      function g(a) {
        var i = T[a];
        if (i !== void 0) return i.exports;
        var n = T[a] = { exports: {} };
        return C[a](n, n.exports, g), n.exports;
      }
      m(g, "__webpack_require__");
      var l = g(45);
      return l;
    })();
  });
});
var cr = o((le, Re) => {
  "use strict";
  m(function(C, T) {
    typeof le == "object" && typeof Re == "object" ? Re.exports = T(Ie()) : typeof define == "function" && define.amd ? define(["cose-base"], T) : typeof le == "object" ? le.cytoscapeFcose = T(Ie()) : C.cytoscapeFcose = T(C.coseBase);
  }, "webpackUniversalModuleDefinition")(le, function(D) {
    return (() => {
      "use strict";
      var C = { 658: (a) => {
        a.exports = Object.assign != null ? Object.assign.bind(Object) : function(i) {
          for (var n = arguments.length, c2 = Array(n > 1 ? n - 1 : 0), t = 1; t < n; t++) c2[t - 1] = arguments[t];
          return c2.forEach(function(u) {
            Object.keys(u).forEach(function(e) {
              return i[e] = u[e];
            });
          }), i;
        };
      }, 548: (a, i, n) => {
        var c2 = function() {
          function e(r2, h) {
            var f = [], o2 = true, A = false, v = void 0;
            try {
              for (var y = r2[Symbol.iterator](), N; !(o2 = (N = y.next()).done) && (f.push(N.value), !(h && f.length === h)); o2 = true) ;
            } catch (S) {
              A = true, v = S;
            } finally {
              try {
                !o2 && y.return && y.return();
              } finally {
                if (A) throw v;
              }
            }
            return f;
          }
          return m(e, "sliceIterator"), function(r2, h) {
            if (Array.isArray(r2)) return r2;
            if (Symbol.iterator in Object(r2)) return e(r2, h);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          };
        }(), t = n(140).layoutBase.LinkedList, u = {};
        u.getTopMostNodes = function(e) {
          for (var r2 = {}, h = 0; h < e.length; h++) r2[e[h].id()] = true;
          var f = e.filter(function(o2, A) {
            typeof o2 == "number" && (o2 = A);
            for (var v = o2.parent()[0]; v != null; ) {
              if (r2[v.id()]) return false;
              v = v.parent()[0];
            }
            return true;
          });
          return f;
        }, u.connectComponents = function(e, r2, h, f) {
          var o2 = new t(), A = /* @__PURE__ */ new Set(), v = [], y = void 0, N = void 0, S = void 0, w = false, P = 1, $ = [], X = [], _ = m(function() {
            var J = e.collection();
            X.push(J);
            var s = h[0], m2 = e.collection();
            m2.merge(s).merge(s.descendants().intersection(r2)), v.push(s), m2.forEach(function(d3) {
              o2.push(d3), A.add(d3), J.merge(d3);
            });
            for (var p = m(function() {
              s = o2.shift();
              var O = e.collection();
              s.neighborhood().nodes().forEach(function(I) {
                r2.intersection(s.edgesWith(I)).length > 0 && O.merge(I);
              });
              for (var x = 0; x < O.length; x++) {
                var G = O[x];
                if (y = h.intersection(G.union(G.ancestors())), y != null && !A.has(y[0])) {
                  var b = y.union(y.descendants());
                  b.forEach(function(I) {
                    o2.push(I), A.add(I), J.merge(I), h.has(I) && v.push(I);
                  });
                }
              }
            }, "_loop2"); o2.length != 0; ) p();
            if (J.forEach(function(d3) {
              r2.intersection(d3.connectedEdges()).forEach(function(O) {
                J.has(O.source()) && J.has(O.target()) && J.merge(O);
              });
            }), v.length == h.length && (w = true), !w || w && P > 1) {
              N = v[0], S = N.connectedEdges().length, v.forEach(function(d3) {
                d3.connectedEdges().length < S && (S = d3.connectedEdges().length, N = d3);
              }), $.push(N.id());
              var E = e.collection();
              E.merge(v[0]), v.forEach(function(d3) {
                E.merge(d3);
              }), v = [], h = h.difference(E), P++;
            }
          }, "_loop");
          do
            _();
          while (!w);
          return f && $.length > 0 && f.set("dummy" + (f.size + 1), $), X;
        }, u.relocateComponent = function(e, r2, h) {
          if (!h.fixedNodeConstraint) {
            var f = Number.POSITIVE_INFINITY, o2 = Number.NEGATIVE_INFINITY, A = Number.POSITIVE_INFINITY, v = Number.NEGATIVE_INFINITY;
            if (h.quality == "draft") {
              var y = true, N = false, S = void 0;
              try {
                for (var w = r2.nodeIndexes[Symbol.iterator](), P; !(y = (P = w.next()).done); y = true) {
                  var $ = P.value, X = c2($, 2), _ = X[0], R = X[1], J = h.cy.getElementById(_);
                  if (J) {
                    var s = J.boundingBox(), m2 = r2.xCoords[R] - s.w / 2, p = r2.xCoords[R] + s.w / 2, E = r2.yCoords[R] - s.h / 2, d3 = r2.yCoords[R] + s.h / 2;
                    m2 < f && (f = m2), p > o2 && (o2 = p), E < A && (A = E), d3 > v && (v = d3);
                  }
                }
              } catch (I) {
                N = true, S = I;
              } finally {
                try {
                  !y && w.return && w.return();
                } finally {
                  if (N) throw S;
                }
              }
              var O = e.x - (o2 + f) / 2, x = e.y - (v + A) / 2;
              r2.xCoords = r2.xCoords.map(function(I) {
                return I + O;
              }), r2.yCoords = r2.yCoords.map(function(I) {
                return I + x;
              });
            } else {
              Object.keys(r2).forEach(function(I) {
                var Z = r2[I], et = Z.getRect().x, F = Z.getRect().x + Z.getRect().width, tt = Z.getRect().y, z = Z.getRect().y + Z.getRect().height;
                et < f && (f = et), F > o2 && (o2 = F), tt < A && (A = tt), z > v && (v = z);
              });
              var G = e.x - (o2 + f) / 2, b = e.y - (v + A) / 2;
              Object.keys(r2).forEach(function(I) {
                var Z = r2[I];
                Z.setCenter(Z.getCenterX() + G, Z.getCenterY() + b);
              });
            }
          }
        }, u.calcBoundingBox = function(e, r2, h, f) {
          for (var o2 = Number.MAX_SAFE_INTEGER, A = Number.MIN_SAFE_INTEGER, v = Number.MAX_SAFE_INTEGER, y = Number.MIN_SAFE_INTEGER, N = void 0, S = void 0, w = void 0, P = void 0, $ = e.descendants().not(":parent"), X = $.length, _ = 0; _ < X; _++) {
            var R = $[_];
            N = r2[f.get(R.id())] - R.width() / 2, S = r2[f.get(R.id())] + R.width() / 2, w = h[f.get(R.id())] - R.height() / 2, P = h[f.get(R.id())] + R.height() / 2, o2 > N && (o2 = N), A < S && (A = S), v > w && (v = w), y < P && (y = P);
          }
          var J = {};
          return J.topLeftX = o2, J.topLeftY = v, J.width = A - o2, J.height = y - v, J;
        }, u.calcParentsWithoutChildren = function(e, r2) {
          var h = e.collection();
          return r2.nodes(":parent").forEach(function(f) {
            var o2 = false;
            f.children().forEach(function(A) {
              A.css("display") != "none" && (o2 = true);
            }), o2 || h.merge(f);
          }), h;
        }, a.exports = u;
      }, 816: (a, i, n) => {
        var c2 = n(548), t = n(140).CoSELayout, u = n(140).CoSENode, e = n(140).layoutBase.PointD, r2 = n(140).layoutBase.DimensionD, h = n(140).layoutBase.LayoutConstants, f = n(140).layoutBase.FDLayoutConstants, o2 = n(140).CoSEConstants, A = m(function(y, N) {
          var S = y.cy, w = y.eles, P = w.nodes(), $ = w.edges(), X = void 0, _ = void 0, R = void 0, J = {};
          y.randomize && (X = N.nodeIndexes, _ = N.xCoords, R = N.yCoords);
          var s = m(function(I) {
            return typeof I == "function";
          }, "isFn"), m2 = m(function(I, Z) {
            return s(I) ? I(Z) : I;
          }, "optFn"), p = c2.calcParentsWithoutChildren(S, w), E = m(function b(I, Z, et, F) {
            for (var tt = Z.length, z = 0; z < tt; z++) {
              var M = Z[z], U = null;
              M.intersection(p).length == 0 && (U = M.children());
              var H = void 0, K = M.layoutDimensions({ nodeDimensionsIncludeLabels: F.nodeDimensionsIncludeLabels });
              if (M.outerWidth() != null && M.outerHeight() != null) if (F.randomize) if (!M.isParent()) H = I.add(new u(et.graphManager, new e(_[X.get(M.id())] - K.w / 2, R[X.get(M.id())] - K.h / 2), new r2(parseFloat(K.w), parseFloat(K.h))));
              else {
                var ht = c2.calcBoundingBox(M, _, R, X);
                M.intersection(p).length == 0 ? H = I.add(new u(et.graphManager, new e(ht.topLeftX, ht.topLeftY), new r2(ht.width, ht.height))) : H = I.add(new u(et.graphManager, new e(ht.topLeftX, ht.topLeftY), new r2(parseFloat(K.w), parseFloat(K.h))));
              }
              else H = I.add(new u(et.graphManager, new e(M.position("x") - K.w / 2, M.position("y") - K.h / 2), new r2(parseFloat(K.w), parseFloat(K.h))));
              else H = I.add(new u(this.graphManager));
              if (H.id = M.data("id"), H.nodeRepulsion = m2(F.nodeRepulsion, M), H.paddingLeft = parseInt(M.css("padding")), H.paddingTop = parseInt(M.css("padding")), H.paddingRight = parseInt(M.css("padding")), H.paddingBottom = parseInt(M.css("padding")), F.nodeDimensionsIncludeLabels && (H.labelWidth = M.boundingBox({ includeLabels: true, includeNodes: false, includeOverlays: false }).w, H.labelHeight = M.boundingBox({ includeLabels: true, includeNodes: false, includeOverlays: false }).h, H.labelPosVertical = M.css("text-valign"), H.labelPosHorizontal = M.css("text-halign")), J[M.data("id")] = H, isNaN(H.rect.x) && (H.rect.x = 0), isNaN(H.rect.y) && (H.rect.y = 0), U != null && U.length > 0) {
                var Nt = void 0;
                Nt = et.getGraphManager().add(et.newGraph(), H), b(Nt, U, et, F);
              }
            }
          }, "processChildrenList"), d3 = m(function(I, Z, et) {
            for (var F = 0, tt = 0, z = 0; z < et.length; z++) {
              var M = et[z], U = J[M.data("source")], H = J[M.data("target")];
              if (U && H && U !== H && U.getEdgesBetween(H).length == 0) {
                var K = Z.add(I.newEdge(), U, H);
                K.id = M.id(), K.idealLength = m2(y.idealEdgeLength, M), K.edgeElasticity = m2(y.edgeElasticity, M), F += K.idealLength, tt++;
              }
            }
            y.idealEdgeLength != null && (tt > 0 ? o2.DEFAULT_EDGE_LENGTH = f.DEFAULT_EDGE_LENGTH = F / tt : s(y.idealEdgeLength) ? o2.DEFAULT_EDGE_LENGTH = f.DEFAULT_EDGE_LENGTH = 50 : o2.DEFAULT_EDGE_LENGTH = f.DEFAULT_EDGE_LENGTH = y.idealEdgeLength, o2.MIN_REPULSION_DIST = f.MIN_REPULSION_DIST = f.DEFAULT_EDGE_LENGTH / 10, o2.DEFAULT_RADIAL_SEPARATION = f.DEFAULT_EDGE_LENGTH);
          }, "processEdges"), O = m(function(I, Z) {
            Z.fixedNodeConstraint && (I.constraints.fixedNodeConstraint = Z.fixedNodeConstraint), Z.alignmentConstraint && (I.constraints.alignmentConstraint = Z.alignmentConstraint), Z.relativePlacementConstraint && (I.constraints.relativePlacementConstraint = Z.relativePlacementConstraint);
          }, "processConstraints");
          y.nestingFactor != null && (o2.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = f.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = y.nestingFactor), y.gravity != null && (o2.DEFAULT_GRAVITY_STRENGTH = f.DEFAULT_GRAVITY_STRENGTH = y.gravity), y.numIter != null && (o2.MAX_ITERATIONS = f.MAX_ITERATIONS = y.numIter), y.gravityRange != null && (o2.DEFAULT_GRAVITY_RANGE_FACTOR = f.DEFAULT_GRAVITY_RANGE_FACTOR = y.gravityRange), y.gravityCompound != null && (o2.DEFAULT_COMPOUND_GRAVITY_STRENGTH = f.DEFAULT_COMPOUND_GRAVITY_STRENGTH = y.gravityCompound), y.gravityRangeCompound != null && (o2.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = f.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = y.gravityRangeCompound), y.initialEnergyOnIncremental != null && (o2.DEFAULT_COOLING_FACTOR_INCREMENTAL = f.DEFAULT_COOLING_FACTOR_INCREMENTAL = y.initialEnergyOnIncremental), y.tilingCompareBy != null && (o2.TILING_COMPARE_BY = y.tilingCompareBy), y.quality == "proof" ? h.QUALITY = 2 : h.QUALITY = 0, o2.NODE_DIMENSIONS_INCLUDE_LABELS = f.NODE_DIMENSIONS_INCLUDE_LABELS = h.NODE_DIMENSIONS_INCLUDE_LABELS = y.nodeDimensionsIncludeLabels, o2.DEFAULT_INCREMENTAL = f.DEFAULT_INCREMENTAL = h.DEFAULT_INCREMENTAL = !y.randomize, o2.ANIMATE = f.ANIMATE = h.ANIMATE = y.animate, o2.TILE = y.tile, o2.TILING_PADDING_VERTICAL = typeof y.tilingPaddingVertical == "function" ? y.tilingPaddingVertical.call() : y.tilingPaddingVertical, o2.TILING_PADDING_HORIZONTAL = typeof y.tilingPaddingHorizontal == "function" ? y.tilingPaddingHorizontal.call() : y.tilingPaddingHorizontal, o2.DEFAULT_INCREMENTAL = f.DEFAULT_INCREMENTAL = h.DEFAULT_INCREMENTAL = true, o2.PURE_INCREMENTAL = !y.randomize, h.DEFAULT_UNIFORM_LEAF_NODE_SIZES = y.uniformNodeDimensions, y.step == "transformed" && (o2.TRANSFORM_ON_CONSTRAINT_HANDLING = true, o2.ENFORCE_CONSTRAINTS = false, o2.APPLY_LAYOUT = false), y.step == "enforced" && (o2.TRANSFORM_ON_CONSTRAINT_HANDLING = false, o2.ENFORCE_CONSTRAINTS = true, o2.APPLY_LAYOUT = false), y.step == "cose" && (o2.TRANSFORM_ON_CONSTRAINT_HANDLING = false, o2.ENFORCE_CONSTRAINTS = false, o2.APPLY_LAYOUT = true), y.step == "all" && (y.randomize ? o2.TRANSFORM_ON_CONSTRAINT_HANDLING = true : o2.TRANSFORM_ON_CONSTRAINT_HANDLING = false, o2.ENFORCE_CONSTRAINTS = true, o2.APPLY_LAYOUT = true), y.fixedNodeConstraint || y.alignmentConstraint || y.relativePlacementConstraint ? o2.TREE_REDUCTION_ON_INCREMENTAL = false : o2.TREE_REDUCTION_ON_INCREMENTAL = true;
          var x = new t(), G = x.newGraphManager();
          return E(G.addRoot(), c2.getTopMostNodes(P), x, y), d3(x, G, $), O(x, y), x.runLayout(), J;
        }, "coseLayout");
        a.exports = { coseLayout: A };
      }, 212: (a, i, n) => {
        var c2 = function() {
          function y(N, S) {
            for (var w = 0; w < S.length; w++) {
              var P = S[w];
              P.enumerable = P.enumerable || false, P.configurable = true, "value" in P && (P.writable = true), Object.defineProperty(N, P.key, P);
            }
          }
          return m(y, "defineProperties"), function(N, S, w) {
            return S && y(N.prototype, S), w && y(N, w), N;
          };
        }();
        function t(y, N) {
          if (!(y instanceof N)) throw new TypeError("Cannot call a class as a function");
        }
        m(t, "_classCallCheck");
        var u = n(658), e = n(548), r2 = n(657), h = r2.spectralLayout, f = n(816), o2 = f.coseLayout, A = Object.freeze({ quality: "default", randomize: true, animate: true, animationDuration: 1e3, animationEasing: void 0, fit: true, padding: 30, nodeDimensionsIncludeLabels: false, uniformNodeDimensions: false, packComponents: true, step: "all", samplingType: true, sampleSize: 25, nodeSeparation: 75, piTol: 1e-7, nodeRepulsion: m(function(N) {
          return 4500;
        }, "nodeRepulsion"), idealEdgeLength: m(function(N) {
          return 50;
        }, "idealEdgeLength"), edgeElasticity: m(function(N) {
          return 0.45;
        }, "edgeElasticity"), nestingFactor: 0.1, gravity: 0.25, numIter: 2500, tile: true, tilingCompareBy: void 0, tilingPaddingVertical: 10, tilingPaddingHorizontal: 10, gravityRangeCompound: 1.5, gravityCompound: 1, gravityRange: 3.8, initialEnergyOnIncremental: 0.3, fixedNodeConstraint: void 0, alignmentConstraint: void 0, relativePlacementConstraint: void 0, ready: m(function() {
        }, "ready"), stop: m(function() {
        }, "stop") }), v = function() {
          function y(N) {
            t(this, y), this.options = u({}, A, N);
          }
          return m(y, "Layout"), c2(y, [{ key: "run", value: m(function() {
            var S = this, w = this.options, P = w.cy, $ = w.eles, X = [], _ = void 0, R = void 0, J = [], s = void 0, m2 = [];
            w.fixedNodeConstraint && (!Array.isArray(w.fixedNodeConstraint) || w.fixedNodeConstraint.length == 0) && (w.fixedNodeConstraint = void 0), w.alignmentConstraint && (w.alignmentConstraint.vertical && (!Array.isArray(w.alignmentConstraint.vertical) || w.alignmentConstraint.vertical.length == 0) && (w.alignmentConstraint.vertical = void 0), w.alignmentConstraint.horizontal && (!Array.isArray(w.alignmentConstraint.horizontal) || w.alignmentConstraint.horizontal.length == 0) && (w.alignmentConstraint.horizontal = void 0)), w.relativePlacementConstraint && (!Array.isArray(w.relativePlacementConstraint) || w.relativePlacementConstraint.length == 0) && (w.relativePlacementConstraint = void 0);
            var p = w.fixedNodeConstraint || w.alignmentConstraint || w.relativePlacementConstraint;
            p && (w.tile = false, w.packComponents = false);
            var E = void 0, d3 = false;
            if (P.layoutUtilities && w.packComponents && (E = P.layoutUtilities("get"), E || (E = P.layoutUtilities()), d3 = true), $.nodes().length > 0) if (d3) {
              var G = e.getTopMostNodes(w.eles.nodes());
              if (s = e.connectComponents(P, w.eles, G), s.forEach(function(ot) {
                var rt = ot.boundingBox();
                m2.push({ x: rt.x1 + rt.w / 2, y: rt.y1 + rt.h / 2 });
              }), w.randomize && s.forEach(function(ot) {
                w.eles = ot, X.push(h(w));
              }), w.quality == "default" || w.quality == "proof") {
                var b = P.collection();
                if (w.tile) {
                  var I = /* @__PURE__ */ new Map(), Z = [], et = [], F = 0, tt = { nodeIndexes: I, xCoords: Z, yCoords: et }, z = [];
                  if (s.forEach(function(ot, rt) {
                    ot.edges().length == 0 && (ot.nodes().forEach(function(vt, mt2) {
                      b.merge(ot.nodes()[mt2]), vt.isParent() || (tt.nodeIndexes.set(ot.nodes()[mt2].id(), F++), tt.xCoords.push(ot.nodes()[0].position().x), tt.yCoords.push(ot.nodes()[0].position().y));
                    }), z.push(rt));
                  }), b.length > 1) {
                    var M = b.boundingBox();
                    m2.push({ x: M.x1 + M.w / 2, y: M.y1 + M.h / 2 }), s.push(b), X.push(tt);
                    for (var U = z.length - 1; U >= 0; U--) s.splice(z[U], 1), X.splice(z[U], 1), m2.splice(z[U], 1);
                  }
                }
                s.forEach(function(ot, rt) {
                  w.eles = ot, J.push(o2(w, X[rt])), e.relocateComponent(m2[rt], J[rt], w);
                });
              } else s.forEach(function(ot, rt) {
                e.relocateComponent(m2[rt], X[rt], w);
              });
              var H = /* @__PURE__ */ new Set();
              if (s.length > 1) {
                var K = [], ht = $.filter(function(ot) {
                  return ot.css("display") == "none";
                });
                s.forEach(function(ot, rt) {
                  var vt = void 0;
                  if (w.quality == "draft" && (vt = X[rt].nodeIndexes), ot.nodes().not(ht).length > 0) {
                    var mt2 = {};
                    mt2.edges = [], mt2.nodes = [];
                    var Lt2 = void 0;
                    ot.nodes().not(ht).forEach(function(Et) {
                      if (w.quality == "draft") if (!Et.isParent()) Lt2 = vt.get(Et.id()), mt2.nodes.push({ x: X[rt].xCoords[Lt2] - Et.boundingbox().w / 2, y: X[rt].yCoords[Lt2] - Et.boundingbox().h / 2, width: Et.boundingbox().w, height: Et.boundingbox().h });
                      else {
                        var Tt = e.calcBoundingBox(Et, X[rt].xCoords, X[rt].yCoords, vt);
                        mt2.nodes.push({ x: Tt.topLeftX, y: Tt.topLeftY, width: Tt.width, height: Tt.height });
                      }
                      else J[rt][Et.id()] && mt2.nodes.push({ x: J[rt][Et.id()].getLeft(), y: J[rt][Et.id()].getTop(), width: J[rt][Et.id()].getWidth(), height: J[rt][Et.id()].getHeight() });
                    }), ot.edges().forEach(function(Et) {
                      var Tt = Et.source(), Mt = Et.target();
                      if (Tt.css("display") != "none" && Mt.css("display") != "none") if (w.quality == "draft") {
                        var It = vt.get(Tt.id()), Wt = vt.get(Mt.id()), Pt = [], Ut = [];
                        if (Tt.isParent()) {
                          var Ft = e.calcBoundingBox(Tt, X[rt].xCoords, X[rt].yCoords, vt);
                          Pt.push(Ft.topLeftX + Ft.width / 2), Pt.push(Ft.topLeftY + Ft.height / 2);
                        } else Pt.push(X[rt].xCoords[It]), Pt.push(X[rt].yCoords[It]);
                        if (Mt.isParent()) {
                          var Y = e.calcBoundingBox(Mt, X[rt].xCoords, X[rt].yCoords, vt);
                          Ut.push(Y.topLeftX + Y.width / 2), Ut.push(Y.topLeftY + Y.height / 2);
                        } else Ut.push(X[rt].xCoords[Wt]), Ut.push(X[rt].yCoords[Wt]);
                        mt2.edges.push({ startX: Pt[0], startY: Pt[1], endX: Ut[0], endY: Ut[1] });
                      } else J[rt][Tt.id()] && J[rt][Mt.id()] && mt2.edges.push({ startX: J[rt][Tt.id()].getCenterX(), startY: J[rt][Tt.id()].getCenterY(), endX: J[rt][Mt.id()].getCenterX(), endY: J[rt][Mt.id()].getCenterY() });
                    }), mt2.nodes.length > 0 && (K.push(mt2), H.add(rt));
                  }
                });
                var Nt = E.packComponents(K, w.randomize).shifts;
                if (w.quality == "draft") X.forEach(function(ot, rt) {
                  var vt = ot.xCoords.map(function(Lt2) {
                    return Lt2 + Nt[rt].dx;
                  }), mt2 = ot.yCoords.map(function(Lt2) {
                    return Lt2 + Nt[rt].dy;
                  });
                  ot.xCoords = vt, ot.yCoords = mt2;
                });
                else {
                  var St = 0;
                  H.forEach(function(ot) {
                    Object.keys(J[ot]).forEach(function(rt) {
                      var vt = J[ot][rt];
                      vt.setCenter(vt.getCenterX() + Nt[St].dx, vt.getCenterY() + Nt[St].dy);
                    }), St++;
                  });
                }
              }
            } else {
              var O = w.eles.boundingBox();
              if (m2.push({ x: O.x1 + O.w / 2, y: O.y1 + O.h / 2 }), w.randomize) {
                var x = h(w);
                X.push(x);
              }
              w.quality == "default" || w.quality == "proof" ? (J.push(o2(w, X[0])), e.relocateComponent(m2[0], J[0], w)) : e.relocateComponent(m2[0], X[0], w);
            }
            var Q = m(function(rt, vt) {
              if (w.quality == "default" || w.quality == "proof") {
                typeof rt == "number" && (rt = vt);
                var mt2 = void 0, Lt2 = void 0, Et = rt.data("id");
                return J.forEach(function(Mt) {
                  Et in Mt && (mt2 = { x: Mt[Et].getRect().getCenterX(), y: Mt[Et].getRect().getCenterY() }, Lt2 = Mt[Et]);
                }), w.nodeDimensionsIncludeLabels && (Lt2.labelWidth && (Lt2.labelPosHorizontal == "left" ? mt2.x += Lt2.labelWidth / 2 : Lt2.labelPosHorizontal == "right" && (mt2.x -= Lt2.labelWidth / 2)), Lt2.labelHeight && (Lt2.labelPosVertical == "top" ? mt2.y += Lt2.labelHeight / 2 : Lt2.labelPosVertical == "bottom" && (mt2.y -= Lt2.labelHeight / 2))), mt2 == null && (mt2 = { x: rt.position("x"), y: rt.position("y") }), { x: mt2.x, y: mt2.y };
              } else {
                var Tt = void 0;
                return X.forEach(function(Mt) {
                  var It = Mt.nodeIndexes.get(rt.id());
                  It != null && (Tt = { x: Mt.xCoords[It], y: Mt.yCoords[It] });
                }), Tt == null && (Tt = { x: rt.position("x"), y: rt.position("y") }), { x: Tt.x, y: Tt.y };
              }
            }, "getPositions");
            if (w.quality == "default" || w.quality == "proof" || w.randomize) {
              var Yt = e.calcParentsWithoutChildren(P, $), wt = $.filter(function(ot) {
                return ot.css("display") == "none";
              });
              w.eles = $.not(wt), $.nodes().not(":parent").not(wt).layoutPositions(S, w, Q), Yt.length > 0 && Yt.forEach(function(ot) {
                ot.position(Q(ot));
              });
            } else console.log("If randomize option is set to false, then quality option must be 'default' or 'proof'.");
          }, "run") }]), y;
        }();
        a.exports = v;
      }, 657: (a, i, n) => {
        var c2 = n(548), t = n(140).layoutBase.Matrix, u = n(140).layoutBase.SVD, e = m(function(h) {
          var f = h.cy, o2 = h.eles, A = o2.nodes(), v = o2.nodes(":parent"), y = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), w = [], P = [], $ = [], X = [], _ = [], R = [], J = [], s = [], m2 = void 0, p = void 0, E = 1e8, d3 = 1e-9, O = h.piTol, x = h.samplingType, G = h.nodeSeparation, b = void 0, I = m(function() {
            for (var V = 0, B = 0, k = false; B < b; ) {
              V = Math.floor(Math.random() * p), k = false;
              for (var j = 0; j < B; j++) if (X[j] == V) {
                k = true;
                break;
              }
              if (!k) X[B] = V, B++;
              else continue;
            }
          }, "randomSampleCR"), Z = m(function(V, B, k) {
            for (var j = [], gt = 0, ft = 0, q = 0, lt = void 0, ut = [], it = 0, pt2 = 1, Dt = 0; Dt < p; Dt++) ut[Dt] = E;
            for (j[ft] = V, ut[V] = 0; ft >= gt; ) {
              q = j[gt++];
              for (var st2 = w[q], nt = 0; nt < st2.length; nt++) lt = N.get(st2[nt]), ut[lt] == E && (ut[lt] = ut[q] + 1, j[++ft] = lt);
              R[q][B] = ut[q] * G;
            }
            if (k) {
              for (var dt = 0; dt < p; dt++) R[dt][B] < _[dt] && (_[dt] = R[dt][B]);
              for (var at = 0; at < p; at++) _[at] > it && (it = _[at], pt2 = at);
            }
            return pt2;
          }, "BFS"), et = m(function(V) {
            var B = void 0;
            if (V) {
              B = Math.floor(Math.random() * p), m2 = B;
              for (var j = 0; j < p; j++) _[j] = E;
              for (var gt = 0; gt < b; gt++) X[gt] = B, B = Z(B, gt, V);
            } else {
              I();
              for (var k = 0; k < b; k++) Z(X[k], k, V, false);
            }
            for (var ft = 0; ft < p; ft++) for (var q = 0; q < b; q++) R[ft][q] *= R[ft][q];
            for (var lt = 0; lt < b; lt++) J[lt] = [];
            for (var ut = 0; ut < b; ut++) for (var it = 0; it < b; it++) J[ut][it] = R[X[it]][ut];
          }, "allBFS"), F = m(function() {
            for (var V = u.svd(J), B = V.S, k = V.U, j = V.V, gt = B[0] * B[0] * B[0], ft = [], q = 0; q < b; q++) {
              ft[q] = [];
              for (var lt = 0; lt < b; lt++) ft[q][lt] = 0, q == lt && (ft[q][lt] = B[q] / (B[q] * B[q] + gt / (B[q] * B[q])));
            }
            s = t.multMat(t.multMat(j, ft), t.transpose(k));
          }, "sample"), tt = m(function() {
            for (var V = void 0, B = void 0, k = [], j = [], gt = [], ft = [], q = 0; q < p; q++) k[q] = Math.random(), j[q] = Math.random();
            k = t.normalize(k), j = t.normalize(j);
            for (var lt = 0, ut = d3, it = d3, pt2 = void 0; ; ) {
              lt++;
              for (var Dt = 0; Dt < p; Dt++) gt[Dt] = k[Dt];
              if (k = t.multGamma(t.multL(t.multGamma(gt), R, s)), V = t.dotProduct(gt, k), k = t.normalize(k), ut = t.dotProduct(gt, k), pt2 = Math.abs(ut / it), pt2 <= 1 + O && pt2 >= 1) break;
              it = ut;
            }
            for (var st2 = 0; st2 < p; st2++) gt[st2] = k[st2];
            for (lt = 0, it = d3; ; ) {
              lt++;
              for (var nt = 0; nt < p; nt++) ft[nt] = j[nt];
              if (ft = t.minusOp(ft, t.multCons(gt, t.dotProduct(gt, ft))), j = t.multGamma(t.multL(t.multGamma(ft), R, s)), B = t.dotProduct(ft, j), j = t.normalize(j), ut = t.dotProduct(ft, j), pt2 = Math.abs(ut / it), pt2 <= 1 + O && pt2 >= 1) break;
              it = ut;
            }
            for (var dt = 0; dt < p; dt++) ft[dt] = j[dt];
            P = t.multCons(gt, Math.sqrt(Math.abs(V))), $ = t.multCons(ft, Math.sqrt(Math.abs(B)));
          }, "powerIteration");
          c2.connectComponents(f, o2, c2.getTopMostNodes(A), y), v.forEach(function(W) {
            c2.connectComponents(f, o2, c2.getTopMostNodes(W.descendants().intersection(o2)), y);
          });
          for (var z = 0, M = 0; M < A.length; M++) A[M].isParent() || N.set(A[M].id(), z++);
          var U = true, H = false, K = void 0;
          try {
            for (var ht = y.keys()[Symbol.iterator](), Nt; !(U = (Nt = ht.next()).done); U = true) {
              var St = Nt.value;
              N.set(St, z++);
            }
          } catch (W) {
            H = true, K = W;
          } finally {
            try {
              !U && ht.return && ht.return();
            } finally {
              if (H) throw K;
            }
          }
          for (var Q = 0; Q < N.size; Q++) w[Q] = [];
          v.forEach(function(W) {
            for (var V = W.children().intersection(o2); V.nodes(":childless").length == 0; ) V = V.nodes()[0].children().intersection(o2);
            var B = 0, k = V.nodes(":childless")[0].connectedEdges().length;
            V.nodes(":childless").forEach(function(j, gt) {
              j.connectedEdges().length < k && (k = j.connectedEdges().length, B = gt);
            }), S.set(W.id(), V.nodes(":childless")[B].id());
          }), A.forEach(function(W) {
            var V = void 0;
            W.isParent() ? V = N.get(S.get(W.id())) : V = N.get(W.id()), W.neighborhood().nodes().forEach(function(B) {
              o2.intersection(W.edgesWith(B)).length > 0 && (B.isParent() ? w[V].push(S.get(B.id())) : w[V].push(B.id()));
            });
          });
          var Yt = m(function(V) {
            var B = N.get(V), k = void 0;
            y.get(V).forEach(function(j) {
              f.getElementById(j).isParent() ? k = S.get(j) : k = j, w[B].push(k), w[N.get(k)].push(V);
            });
          }, "_loop"), wt = true, ot = false, rt = void 0;
          try {
            for (var vt = y.keys()[Symbol.iterator](), mt2; !(wt = (mt2 = vt.next()).done); wt = true) {
              var Lt2 = mt2.value;
              Yt(Lt2);
            }
          } catch (W) {
            ot = true, rt = W;
          } finally {
            try {
              !wt && vt.return && vt.return();
            } finally {
              if (ot) throw rt;
            }
          }
          p = N.size;
          var Et = void 0;
          if (p > 2) {
            b = p < h.sampleSize ? p : h.sampleSize;
            for (var Tt = 0; Tt < p; Tt++) R[Tt] = [];
            for (var Mt = 0; Mt < b; Mt++) s[Mt] = [];
            return h.quality == "draft" || h.step == "all" ? (et(x), F(), tt(), Et = { nodeIndexes: N, xCoords: P, yCoords: $ }) : (N.forEach(function(W, V) {
              P.push(f.getElementById(V).position("x")), $.push(f.getElementById(V).position("y"));
            }), Et = { nodeIndexes: N, xCoords: P, yCoords: $ }), Et;
          } else {
            var It = N.keys(), Wt = f.getElementById(It.next().value), Pt = Wt.position(), Ut = Wt.outerWidth();
            if (P.push(Pt.x), $.push(Pt.y), p == 2) {
              var Ft = f.getElementById(It.next().value), Y = Ft.outerWidth();
              P.push(Pt.x + Ut / 2 + Y / 2 + h.idealEdgeLength), $.push(Pt.y);
            }
            return Et = { nodeIndexes: N, xCoords: P, yCoords: $ }, Et;
          }
        }, "spectralLayout");
        a.exports = { spectralLayout: e };
      }, 579: (a, i, n) => {
        var c2 = n(212), t = m(function(e) {
          e && e("layout", "fcose", c2);
        }, "register");
        typeof cytoscape < "u" && t(cytoscape), a.exports = t;
      }, 140: (a) => {
        a.exports = D;
      } }, T = {};
      function g(a) {
        var i = T[a];
        if (i !== void 0) return i.exports;
        var n = T[a] = { exports: {} };
        return C[a](n, n.exports, g), n.exports;
      }
      m(g, "__webpack_require__");
      var l = g(579);
      return l;
    })();
  });
});
var Le = { L: "left", R: "right", T: "top", B: "bottom" };
var De = { L: m((D) => `${D},${D / 2} 0,${D} 0,0`, "L"), R: m((D) => `0,${D / 2} ${D},0 ${D},${D}`, "R"), T: m((D) => `0,0 ${D},0 ${D / 2},${D}`, "T"), B: m((D) => `${D / 2},0 ${D},${D} 0,${D}`, "B") };
var ne = { L: m((D, C) => D - C + 2, "L"), R: m((D, C) => D - 2, "R"), T: m((D, C) => D - C + 2, "T"), B: m((D, C) => D - 2, "B") };
var rr = m(function(D) {
  return Ht(D) ? D === "L" ? "R" : "L" : D === "T" ? "B" : "T";
}, "getOppositeArchitectureDirection");
var Ce = m(function(D) {
  let C = D;
  return C === "L" || C === "R" || C === "T" || C === "B";
}, "isArchitectureDirection");
var Ht = m(function(D) {
  let C = D;
  return C === "L" || C === "R";
}, "isArchitectureDirectionX");
var kt = m(function(D) {
  let C = D;
  return C === "T" || C === "B";
}, "isArchitectureDirectionY");
var ae = m(function(D, C) {
  let T = Ht(D) && kt(C), g = kt(D) && Ht(C);
  return T || g;
}, "isArchitectureDirectionXY");
var ir = m(function(D) {
  let C = D[0], T = D[1], g = Ht(C) && kt(T), l = kt(C) && Ht(T);
  return g || l;
}, "isArchitecturePairXY");
var Er = m(function(D) {
  return D !== "LL" && D !== "RR" && D !== "TT" && D !== "BB";
}, "isValidArchitectureDirectionPair");
var oe = m(function(D, C) {
  let T = `${D}${C}`;
  return Er(T) ? T : void 0;
}, "getArchitectureDirectionPair");
var nr = m(function([D, C], T) {
  let g = T[0], l = T[1];
  return Ht(g) ? kt(l) ? [D + (g === "L" ? -1 : 1), C + (l === "T" ? 1 : -1)] : [D + (g === "L" ? -1 : 1), C] : Ht(l) ? [D + (l === "L" ? 1 : -1), C + (g === "T" ? 1 : -1)] : [D, C + (g === "T" ? 1 : -1)];
}, "shiftPositionByArchitectureDirectionPair");
var ar = m(function(D) {
  return D === "LT" || D === "TL" ? [1, 1] : D === "BL" || D === "LB" ? [1, -1] : D === "BR" || D === "RB" ? [-1, -1] : [-1, 1];
}, "getArchitectureDirectionXYFactors");
var or = m(function(D, C) {
  return ae(D, C) ? "bend" : Ht(D) ? "horizontal" : "vertical";
}, "getArchitectureDirectionAlignment");
var sr = m(function(D) {
  return D.type === "service";
}, "isArchitectureService");
var hr = m(function(D) {
  return D.type === "junction";
}, "isArchitectureJunction");
var pe = m((D) => D.data(), "edgeData");
var Jt2 = m((D) => D.data(), "nodeData");
var Tr = oo.architecture;
var _a;
var re = (_a = class {
  constructor() {
    this.nodes = {};
    this.groups = {};
    this.edges = [];
    this.registeredIds = {};
    this.elements = {};
    this.diagramId = "";
    this.setAccTitle = es;
    this.getAccTitle = ss;
    this.setDiagramTitle = hs;
    this.getDiagramTitle = ns;
    this.getAccDescription = ls;
    this.setAccDescription = as;
    this.clear();
  }
  setDiagramId(C) {
    this.diagramId = C;
  }
  getDiagramId() {
    return this.diagramId;
  }
  clear() {
    this.nodes = {}, this.groups = {}, this.edges = [], this.registeredIds = {}, this.dataStructures = void 0, this.elements = {}, this.diagramId = "", os();
  }
  addService({ id: C, icon: T, in: g, title: l, iconText: a }) {
    if (this.registeredIds[C] !== void 0) throw new Error(`The service id [${C}] is already in use by another ${this.registeredIds[C]}`);
    if (g !== void 0) {
      if (C === g) throw new Error(`The service [${C}] cannot be placed within itself`);
      if (this.registeredIds[g] === void 0) throw new Error(`The service [${C}]'s parent does not exist. Please make sure the parent is created before this service`);
      if (this.registeredIds[g] === "node") throw new Error(`The service [${C}]'s parent is not a group`);
    }
    this.registeredIds[C] = "node", this.nodes[C] = { id: C, type: "service", icon: T, iconText: a, title: l, edges: [], in: g };
  }
  getServices() {
    return Object.values(this.nodes).filter(sr);
  }
  addJunction({ id: C, in: T }) {
    if (this.registeredIds[C] !== void 0) throw new Error(`The junction id [${C}] is already in use by another ${this.registeredIds[C]}`);
    if (T !== void 0) {
      if (C === T) throw new Error(`The junction [${C}] cannot be placed within itself`);
      if (this.registeredIds[T] === void 0) throw new Error(`The junction [${C}]'s parent does not exist. Please make sure the parent is created before this junction`);
      if (this.registeredIds[T] === "node") throw new Error(`The junction [${C}]'s parent is not a group`);
    }
    this.registeredIds[C] = "node", this.nodes[C] = { id: C, type: "junction", edges: [], in: T };
  }
  getJunctions() {
    return Object.values(this.nodes).filter(hr);
  }
  getNodes() {
    return Object.values(this.nodes);
  }
  getNode(C) {
    return this.nodes[C] ?? null;
  }
  addGroup({ id: C, icon: T, in: g, title: l }) {
    var _a2, _b, _c;
    if (((_a2 = this.registeredIds) == null ? void 0 : _a2[C]) !== void 0) throw new Error(`The group id [${C}] is already in use by another ${this.registeredIds[C]}`);
    if (g !== void 0) {
      if (C === g) throw new Error(`The group [${C}] cannot be placed within itself`);
      if (((_b = this.registeredIds) == null ? void 0 : _b[g]) === void 0) throw new Error(`The group [${C}]'s parent does not exist. Please make sure the parent is created before this group`);
      if (((_c = this.registeredIds) == null ? void 0 : _c[g]) === "node") throw new Error(`The group [${C}]'s parent is not a group`);
    }
    this.registeredIds[C] = "group", this.groups[C] = { id: C, icon: T, title: l, in: g };
  }
  getGroups() {
    return Object.values(this.groups);
  }
  addEdge({ lhsId: C, rhsId: T, lhsDir: g, rhsDir: l, lhsInto: a, rhsInto: i, lhsGroup: n, rhsGroup: c2, title: t }) {
    if (!Ce(g)) throw new Error(`Invalid direction given for left hand side of edge ${C}--${T}. Expected (L,R,T,B) got ${String(g)}`);
    if (!Ce(l)) throw new Error(`Invalid direction given for right hand side of edge ${C}--${T}. Expected (L,R,T,B) got ${String(l)}`);
    if (this.nodes[C] === void 0 && this.groups[C] === void 0) throw new Error(`The left-hand id [${C}] does not yet exist. Please create the service/group before declaring an edge to it.`);
    if (this.nodes[T] === void 0 && this.groups[T] === void 0) throw new Error(`The right-hand id [${T}] does not yet exist. Please create the service/group before declaring an edge to it.`);
    let u = this.nodes[C].in, e = this.nodes[T].in;
    if (n && u && e && u == e) throw new Error(`The left-hand id [${C}] is modified to traverse the group boundary, but the edge does not pass through two groups.`);
    if (c2 && u && e && u == e) throw new Error(`The right-hand id [${T}] is modified to traverse the group boundary, but the edge does not pass through two groups.`);
    let r2 = { lhsId: C, lhsDir: g, lhsInto: a, lhsGroup: n, rhsId: T, rhsDir: l, rhsInto: i, rhsGroup: c2, title: t };
    this.edges.push(r2), this.nodes[C] && this.nodes[T] && (this.nodes[C].edges.push(this.edges[this.edges.length - 1]), this.nodes[T].edges.push(this.edges[this.edges.length - 1]));
  }
  getEdges() {
    return this.edges;
  }
  getDataStructures() {
    if (this.dataStructures === void 0) {
      let C = {}, T = Object.entries(this.nodes).reduce((c2, [t, u]) => (c2[t] = u.edges.reduce((e, r2) => {
        var _a2, _b;
        let h = (_a2 = this.getNode(r2.lhsId)) == null ? void 0 : _a2.in, f = (_b = this.getNode(r2.rhsId)) == null ? void 0 : _b.in;
        if (h && f && h !== f) {
          let o2 = or(r2.lhsDir, r2.rhsDir);
          o2 !== "bend" && (C[h] ?? (C[h] = {}), C[h][f] = o2, C[f] ?? (C[f] = {}), C[f][h] = o2);
        }
        if (r2.lhsId === t) {
          let o2 = oe(r2.lhsDir, r2.rhsDir);
          o2 && (e[o2] = r2.rhsId);
        } else {
          let o2 = oe(r2.rhsDir, r2.lhsDir);
          o2 && (e[o2] = r2.lhsId);
        }
        return e;
      }, {}), c2), {}), g = Object.keys(T)[0], l = { [g]: 1 }, a = Object.keys(T).reduce((c2, t) => t === g ? c2 : { ...c2, [t]: 1 }, {}), i = m((c2) => {
        let t = { [c2]: [0, 0] }, u = [c2];
        for (; u.length > 0; ) {
          let e = u.shift();
          if (e) {
            l[e] = 1, delete a[e];
            let r2 = T[e], [h, f] = t[e];
            Object.entries(r2).forEach(([o2, A]) => {
              l[A] || (t[A] = nr([h, f], o2), u.push(A));
            });
          }
        }
        return t;
      }, "BFS"), n = [i(g)];
      for (; Object.keys(a).length > 0; ) n.push(i(Object.keys(a)[0]));
      this.dataStructures = { adjList: T, spatialMaps: n, groupAlignments: C };
    }
    return this.dataStructures;
  }
  setElementForId(C, T) {
    this.elements[C] = T;
  }
  getElementById(C) {
    return this.elements[C];
  }
  getConfig() {
    return Lt({ ...Tr, ...Ot().architecture });
  }
  getConfigField(C) {
    return this.getConfig()[C];
  }
}, m(_a, "ArchitectureDB"), _a);
var Ar = m((D, C) => {
  c(D, C), D.groups.map((T) => C.addGroup(T)), D.services.map((T) => C.addService({ ...T, type: "service" })), D.junctions.map((T) => C.addJunction({ ...T, type: "junction" })), D.edges.map((T) => C.addEdge(T));
}, "populateDb");
var we = { parser: { yy: void 0 }, parse: m(async (D) => {
  var _a2;
  let C = await d2("architecture", D);
  pt.debug(C);
  let T = (_a2 = we.parser) == null ? void 0 : _a2.yy;
  if (!(T instanceof re)) throw new Error("parser.parser?.yy was not a ArchitectureDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");
  Ar(C, T);
}, "parse") };
var Nr = m((D) => `
  .edge {
    stroke-width: ${D.archEdgeWidth};
    stroke: ${D.archEdgeColor};
    fill: none;
  }

  .arrow {
    fill: ${D.archEdgeArrowColor};
  }

  .node-bkg {
    fill: none;
    stroke: ${D.archGroupBorderColor};
    stroke-width: ${D.archGroupBorderWidth};
    stroke-dasharray: 8;
  }
  .node-icon-text {
    display: flex; 
    align-items: center;
  }
  
  .node-icon-text > div {
    color: #fff;
    margin: 1px;
    height: fit-content;
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`, "getStyles");
var lr = Nr;
var pr = r(cr(), 1);
var ie = m((D) => `<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/>${D}</g>`, "wrapIcon");
var Kt = { prefix: "mermaid-architecture", height: 80, width: 80, icons: { database: { body: ie('<path id="b" data-name="4" d="m20,57.86c0,3.94,8.95,7.14,20,7.14s20-3.2,20-7.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><path id="c" data-name="3" d="m20,45.95c0,3.94,8.95,7.14,20,7.14s20-3.2,20-7.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><path id="d" data-name="2" d="m20,34.05c0,3.94,8.95,7.14,20,7.14s20-3.2,20-7.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse id="e" data-name="1" cx="40" cy="22.14" rx="20" ry="7.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="20" y1="57.86" x2="20" y2="22.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="60" y1="57.86" x2="60" y2="22.14" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>') }, server: { body: ie('<rect x="17.5" y="17.5" width="45" height="45" rx="2" ry="2" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="17.5" y1="32.5" x2="62.5" y2="32.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="17.5" y1="47.5" x2="62.5" y2="47.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><g><path d="m56.25,25c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: #fff; stroke-width: 0px;"/><path d="m56.25,25c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: none; stroke: #fff; stroke-miterlimit: 10;"/></g><g><path d="m56.25,40c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: #fff; stroke-width: 0px;"/><path d="m56.25,40c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: none; stroke: #fff; stroke-miterlimit: 10;"/></g><g><path d="m56.25,55c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: #fff; stroke-width: 0px;"/><path d="m56.25,55c0,.27-.45.5-1,.5h-10.5c-.55,0-1-.23-1-.5s.45-.5,1-.5h10.5c.55,0,1,.23,1,.5Z" style="fill: none; stroke: #fff; stroke-miterlimit: 10;"/></g><g><circle cx="32.5" cy="25" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="27.5" cy="25" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="22.5" cy="25" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/></g><g><circle cx="32.5" cy="40" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="27.5" cy="40" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="22.5" cy="40" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/></g><g><circle cx="32.5" cy="55" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="27.5" cy="55" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/><circle cx="22.5" cy="55" r=".75" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10;"/></g>') }, disk: { body: ie('<rect x="20" y="15" width="40" height="50" rx="1" ry="1" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="24" cy="19.17" rx=".8" ry=".83" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="56" cy="19.17" rx=".8" ry=".83" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="24" cy="60.83" rx=".8" ry=".83" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="56" cy="60.83" rx=".8" ry=".83" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="40" cy="33.75" rx="14" ry="14.58" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><ellipse cx="40" cy="33.75" rx="4" ry="4.17" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><path d="m37.51,42.52l-4.83,13.22c-.26.71-1.1,1.02-1.76.64l-4.18-2.42c-.66-.38-.81-1.26-.33-1.84l9.01-10.8c.88-1.05,2.56-.08,2.09,1.2Z" style="fill: #fff; stroke-width: 0px;"/>') }, internet: { body: ie('<circle cx="40" cy="40" r="22.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="40" y1="17.5" x2="40" y2="62.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="17.5" y1="40" x2="62.5" y2="40" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><path d="m39.99,17.51c-15.28,11.1-15.28,33.88,0,44.98" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><path d="m40.01,17.51c15.28,11.1,15.28,33.88,0,44.98" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="19.75" y1="30.1" x2="60.25" y2="30.1" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/><line x1="19.75" y1="49.9" x2="60.25" y2="49.9" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>') }, cloud: { body: ie('<path d="m65,47.5c0,2.76-2.24,5-5,5H20c-2.76,0-5-2.24-5-5,0-1.87,1.03-3.51,2.56-4.36-.04-.21-.06-.42-.06-.64,0-2.6,2.48-4.74,5.65-4.97,1.65-4.51,6.34-7.76,11.85-7.76.86,0,1.69.08,2.5.23,2.09-1.57,4.69-2.5,7.5-2.5,6.1,0,11.19,4.38,12.28,10.17,2.14.56,3.72,2.51,3.72,4.83,0,.03,0,.07-.01.1,2.29.46,4.01,2.48,4.01,4.9Z" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>') }, unknown: mt, blank: { body: ie("") } } };
var fr = m(async function(D, C, T, g) {
  let l = T.getConfigField("padding"), a = T.getConfigField("iconSize"), i = a / 2, n = a / 6, c2 = n / 2;
  await Promise.all(C.edges().map(async (t) => {
    var _a2, _b;
    let { source: u, sourceDir: e, sourceArrow: r2, sourceGroup: h, target: f, targetDir: o2, targetArrow: A, targetGroup: v, label: y } = pe(t), { x: N, y: S } = t[0].sourceEndpoint(), { x: w, y: P } = t[0].midpoint(), { x: $, y: X } = t[0].targetEndpoint(), _ = l + 4;
    if (h && (Ht(e) ? N += e === "L" ? -_ : _ : S += e === "T" ? -_ : _ + 18), v && (Ht(o2) ? $ += o2 === "L" ? -_ : _ : X += o2 === "T" ? -_ : _ + 18), !h && ((_a2 = T.getNode(u)) == null ? void 0 : _a2.type) === "junction" && (Ht(e) ? N += e === "L" ? i : -i : S += e === "T" ? i : -i), !v && ((_b = T.getNode(f)) == null ? void 0 : _b.type) === "junction" && (Ht(o2) ? $ += o2 === "L" ? i : -i : X += o2 === "T" ? i : -i), t[0]._private.rscratch) {
      let R = D.insert("g");
      if (R.insert("path").attr("d", `M ${N},${S} L ${w},${P} L${$},${X} `).attr("class", "edge").attr("id", `${g}-${Jt(u, f, { prefix: "L" })}`), r2) {
        let J = Ht(e) ? ne[e](N, n) : N - c2, s = kt(e) ? ne[e](S, n) : S - c2;
        R.insert("polygon").attr("points", De[e](n)).attr("transform", `translate(${J},${s})`).attr("class", "arrow");
      }
      if (A) {
        let J = Ht(o2) ? ne[o2]($, n) : $ - c2, s = kt(o2) ? ne[o2](X, n) : X - c2;
        R.insert("polygon").attr("points", De[o2](n)).attr("transform", `translate(${J},${s})`).attr("class", "arrow");
      }
      if (y) {
        let J = ae(e, o2) ? "XY" : Ht(e) ? "X" : "Y", s = 0;
        J === "X" ? s = Math.abs(N - $) : J === "Y" ? s = Math.abs(S - X) / 1.5 : s = Math.abs(N - $) / 2;
        let m2 = R.append("g");
        if (await Lr(m2, y, { useHtmlLabels: false, width: s, classes: "architecture-service-label" }, qo()), m2.attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle"), J === "X") m2.attr("transform", "translate(" + w + ", " + P + ")");
        else if (J === "Y") m2.attr("transform", "translate(" + w + ", " + P + ") rotate(-90)");
        else if (J === "XY") {
          let p = oe(e, o2);
          if (p && ir(p)) {
            let E = m2.node().getBoundingClientRect(), [d3, O] = ar(p);
            m2.attr("dominant-baseline", "auto").attr("transform", `rotate(${-1 * d3 * O * 45})`);
            let x = m2.node().getBoundingClientRect();
            m2.attr("transform", `
                translate(${w}, ${P - E.height / 2})
                translate(${d3 * x.width / 2}, ${O * x.height / 2})
                rotate(${-1 * d3 * O * 45}, 0, ${E.height / 2})
              `);
          }
        }
      }
    }
  }));
}, "drawEdges");
var ur = m(async function(D, C, T, g) {
  let a = T.getConfigField("padding") * 0.75, i = T.getConfigField("fontSize"), c2 = T.getConfigField("iconSize") / 2;
  await Promise.all(C.nodes().map(async (t) => {
    let u = Jt2(t);
    if (u.type === "group") {
      let { h: e, w: r2, x1: h, y1: f } = t.boundingBox(), o2 = D.append("rect");
      o2.attr("id", `${g}-group-${u.id}`).attr("x", h + c2).attr("y", f + c2).attr("width", r2).attr("height", e).attr("class", "node-bkg");
      let A = D.append("g"), v = h, y = f;
      if (u.icon) {
        let N = A.append("g");
        N.html(`<g>${await ve(u.icon, { height: a, width: a, fallbackPrefix: Kt.prefix })}</g>`), N.attr("transform", "translate(" + (v + c2 + 1) + ", " + (y + c2 + 1) + ")"), v += a, y += i / 2 - 1 - 2;
      }
      if (u.label) {
        let N = A.append("g");
        await Lr(N, u.label, { useHtmlLabels: false, width: r2, classes: "architecture-service-label" }, qo()), N.attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "start").attr("text-anchor", "start"), N.attr("transform", "translate(" + (v + c2 + 4) + ", " + (y + c2 + 2) + ")");
      }
      T.setElementForId(u.id, o2);
    }
  }));
}, "drawGroups");
var gr = m(async function(D, C, T, g) {
  let l = qo();
  for (let a of T) {
    let i = C.append("g"), n = D.getConfigField("iconSize");
    if (a.title) {
      let e = i.append("g");
      await Lr(e, a.title, { useHtmlLabels: false, width: n * 1.5, classes: "architecture-service-label" }, l), e.attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle"), e.attr("transform", "translate(" + n / 2 + ", " + n + ")");
    }
    let c2 = i.append("g");
    if (a.icon) c2.html(`<g>${await ve(a.icon, { height: n, width: n, fallbackPrefix: Kt.prefix })}</g>`);
    else if (a.iconText) {
      c2.html(`<g>${await ve("blank", { height: n, width: n, fallbackPrefix: Kt.prefix })}</g>`);
      let h = c2.append("g").append("foreignObject").attr("width", n).attr("height", n).append("div").attr("class", "node-icon-text").attr("style", `height: ${n}px;`).append("div").html(st(a.iconText, l)), f = parseInt(window.getComputedStyle(h.node(), null).getPropertyValue("font-size").replace(/\D/g, "")) ?? 16;
      h.attr("style", `-webkit-line-clamp: ${Math.floor((n - 2) / f)};`);
    } else c2.append("path").attr("class", "node-bkg").attr("id", `${g}-node-${a.id}`).attr("d", `M0,${n} V5 Q0,0 5,0 H${n - 5} Q${n},0 ${n},5 V${n} Z`);
    i.attr("id", `${g}-service-${a.id}`).attr("class", "architecture-service");
    let { width: t, height: u } = i.node().getBBox();
    a.width = t, a.height = u, D.setElementForId(a.id, i);
  }
  return 0;
}, "drawServices");
var dr = m(function(D, C, T, g) {
  T.forEach((l) => {
    let a = C.append("g"), i = D.getConfigField("iconSize");
    a.append("g").append("rect").attr("id", `${g}-node-${l.id}`).attr("fill-opacity", "0").attr("width", i).attr("height", i), a.attr("class", "architecture-junction");
    let { width: c2, height: t } = a._groups[0][0].getBBox();
    a.width = c2, a.height = t, D.setElementForId(l.id, a);
  });
}, "drawJunctions");
Qn([{ name: Kt.prefix, icons: Kt }]);
ra.use(pr.default);
function Lr2(D, C, T) {
  D.forEach((g) => {
    C.add({ group: "nodes", data: { type: "service", id: g.id, icon: g.icon, label: g.title, parent: g.in, width: T.getConfigField("iconSize"), height: T.getConfigField("iconSize") }, classes: "node-service" });
  });
}
m(Lr2, "addServices");
function Dr(D, C, T) {
  D.forEach((g) => {
    C.add({ group: "nodes", data: { type: "junction", id: g.id, parent: g.in, width: T.getConfigField("iconSize"), height: T.getConfigField("iconSize") }, classes: "node-junction" });
  });
}
m(Dr, "addJunctions");
function Cr(D, C) {
  C.nodes().map((T) => {
    let g = Jt2(T);
    if (g.type === "group") return;
    g.x = T.position().x, g.y = T.position().y, D.getElementById(g.id).attr("transform", "translate(" + (g.x || 0) + "," + (g.y || 0) + ")");
  });
}
m(Cr, "positionNodes");
function wr(D, C) {
  D.forEach((T) => {
    C.add({ group: "nodes", data: { type: "group", id: T.id, icon: T.icon, label: T.title, parent: T.in }, classes: "node-group" });
  });
}
m(wr, "addGroups");
function Mr(D, C) {
  D.forEach((T) => {
    let { lhsId: g, rhsId: l, lhsInto: a, lhsGroup: i, rhsInto: n, lhsDir: c2, rhsDir: t, rhsGroup: u, title: e } = T, r2 = ae(T.lhsDir, T.rhsDir) ? "segments" : "straight", h = { id: `${g}-${l}`, label: e, source: g, sourceDir: c2, sourceArrow: a, sourceGroup: i, sourceEndpoint: c2 === "L" ? "0 50%" : c2 === "R" ? "100% 50%" : c2 === "T" ? "50% 0" : "50% 100%", target: l, targetDir: t, targetArrow: n, targetGroup: u, targetEndpoint: t === "L" ? "0 50%" : t === "R" ? "100% 50%" : t === "T" ? "50% 0" : "50% 100%" };
    C.add({ group: "edges", data: h, classes: r2 });
  });
}
m(Mr, "addEdges");
function xr(D, C, T) {
  let g = m((n, c2) => Object.entries(n).reduce((t, [u, e]) => {
    var _a2;
    let r2 = 0, h = Object.entries(e);
    if (h.length === 1) return t[u] = h[0][1], t;
    for (let f = 0; f < h.length - 1; f++) for (let o2 = f + 1; o2 < h.length; o2++) {
      let [A, v] = h[f], [y, N] = h[o2];
      if (((_a2 = T[A]) == null ? void 0 : _a2[y]) === c2) t[u] ?? (t[u] = []), t[u] = [...t[u], ...v, ...N];
      else if (A === "default" || y === "default") t[u] ?? (t[u] = []), t[u] = [...t[u], ...v, ...N];
      else {
        let w = `${u}-${r2++}`;
        t[w] = v;
        let P = `${u}-${r2++}`;
        t[P] = N;
      }
    }
    return t;
  }, {}), "flattenAlignments"), l = C.map((n) => {
    let c2 = {}, t = {};
    return Object.entries(n).forEach(([u, [e, r2]]) => {
      var _a2, _b, _c;
      let h = ((_a2 = D.getNode(u)) == null ? void 0 : _a2.in) ?? "default";
      c2[r2] ?? (c2[r2] = {}), (_b = c2[r2])[h] ?? (_b[h] = []), c2[r2][h].push(u), t[e] ?? (t[e] = {}), (_c = t[e])[h] ?? (_c[h] = []), t[e][h].push(u);
    }), { horiz: Object.values(g(c2, "horizontal")).filter((u) => u.length > 1), vert: Object.values(g(t, "vertical")).filter((u) => u.length > 1) };
  }), [a, i] = l.reduce(([n, c2], { horiz: t, vert: u }) => [[...n, ...t], [...c2, ...u]], [[], []]);
  return { horizontal: a, vertical: i };
}
m(xr, "getAlignments");
function Or(D, C) {
  let T = [], g = m((a) => `${a[0]},${a[1]}`, "posToStr"), l = m((a) => a.split(",").map((i) => parseInt(i)), "strToPos");
  return D.forEach((a) => {
    let i = Object.fromEntries(Object.entries(a).map(([u, e]) => [g(e), u])), n = [g([0, 0])], c2 = {}, t = { L: [-1, 0], R: [1, 0], T: [0, 1], B: [0, -1] };
    for (; n.length > 0; ) {
      let u = n.shift();
      if (u) {
        c2[u] = 1;
        let e = i[u];
        if (e) {
          let r2 = l(u);
          Object.entries(t).forEach(([h, f]) => {
            let o2 = g([r2[0] + f[0], r2[1] + f[1]]), A = i[o2];
            A && !c2[o2] && (n.push(o2), T.push({ [Le[h]]: A, [Le[rr(h)]]: e, gap: 1.5 * C.getConfigField("iconSize") }));
          });
        }
      }
    }
  }), T;
}
m(Or, "getRelativeConstraints");
function Ir(D, C, T, g, l, { spatialMaps: a, groupAlignments: i }) {
  return new Promise((n) => {
    let c2 = ia("body").append("div").attr("id", "cy").attr("style", "display:none"), t = ra({ container: document.getElementById("cy"), style: [{ selector: "edge", style: { "curve-style": "straight", "source-endpoint": "data(sourceEndpoint)", "target-endpoint": "data(targetEndpoint)" } }, { selector: "edge[label]", style: { label: "data(label)" } }, { selector: "edge.segments", style: { "curve-style": "segments", "segment-weights": "0", "segment-distances": [0.5], "edge-distances": "endpoints", "source-endpoint": "data(sourceEndpoint)", "target-endpoint": "data(targetEndpoint)" } }, { selector: "node", style: { "compound-sizing-wrt-labels": "include" } }, { selector: "node[label]", style: { "text-valign": "bottom", "text-halign": "center", "font-size": `${l.getConfigField("fontSize")}px` } }, { selector: ".node-service", style: { label: "data(label)", width: "data(width)", height: "data(height)" } }, { selector: ".node-junction", style: { width: "data(width)", height: "data(height)" } }, { selector: ".node-group", style: { padding: `${l.getConfigField("padding")}px` } }], layout: { name: "grid", boundingBox: { x1: 0, x2: 100, y1: 0, y2: 100 } } });
    c2.remove(), wr(T, t), Lr2(D, t, l), Dr(C, t, l), Mr(g, t);
    let u = xr(l, a, i), e = Or(a, l), r2 = t.layout({ name: "fcose", quality: "proof", randomize: l.getConfigField("randomize"), styleEnabled: false, animate: false, nodeDimensionsIncludeLabels: false, idealEdgeLength(h) {
      let [f, o2] = h.connectedNodes(), { parent: A } = Jt2(f), { parent: v } = Jt2(o2);
      return A === v ? 1.5 * l.getConfigField("iconSize") : 0.5 * l.getConfigField("iconSize");
    }, edgeElasticity(h) {
      let [f, o2] = h.connectedNodes(), { parent: A } = Jt2(f), { parent: v } = Jt2(o2);
      return A === v ? 0.45 : 1e-3;
    }, alignmentConstraint: u, relativePlacementConstraint: e });
    r2.one("layoutstop", () => {
      var _a2;
      function h(f, o2, A, v) {
        let y, N, { x: S, y: w } = f, { x: P, y: $ } = o2;
        N = (v - w + (S - A) * (w - $) / (S - P)) / Math.sqrt(1 + Math.pow((w - $) / (S - P), 2)), y = Math.sqrt(Math.pow(v - w, 2) + Math.pow(A - S, 2) - Math.pow(N, 2));
        let X = Math.sqrt(Math.pow(P - S, 2) + Math.pow($ - w, 2));
        y = y / X;
        let _ = (P - S) * (v - w) - ($ - w) * (A - S);
        switch (true) {
          case _ >= 0:
            _ = 1;
            break;
          case _ < 0:
            _ = -1;
            break;
        }
        let R = (P - S) * (A - S) + ($ - w) * (v - w);
        switch (true) {
          case R >= 0:
            R = 1;
            break;
          case R < 0:
            R = -1;
            break;
        }
        return N = Math.abs(N) * _, y = y * R, { distances: N, weights: y };
      }
      m(h, "getSegmentWeights"), t.startBatch();
      for (let f of Object.values(t.edges())) if ((_a2 = f.data) == null ? void 0 : _a2.call(f)) {
        let { x: o2, y: A } = f.source().position(), { x: v, y } = f.target().position();
        if (o2 !== v && A !== y) {
          let N = f.sourceEndpoint(), S = f.targetEndpoint(), { sourceDir: w } = pe(f), [P, $] = kt(w) ? [N.x, S.y] : [S.x, N.y], { weights: X, distances: _ } = h(N, S, P, $);
          f.style("segment-distances", _), f.style("segment-weights", X);
        }
      }
      t.endBatch(), r2.run();
    }), r2.run(), t.ready((h) => {
      pt.info("Ready", h), n(t);
    });
  });
}
m(Ir, "layoutArchitecture");
var Rr = m(async (D, C, T, g) => {
  let l = g.db;
  l.setDiagramId(C);
  let a = l.getServices(), i = l.getJunctions(), n = l.getGroups(), c2 = l.getEdges(), t = l.getDataStructures(), u = d(C), e = u.append("g");
  e.attr("class", "architecture-edges");
  let r2 = u.append("g");
  r2.attr("class", "architecture-services");
  let h = u.append("g");
  h.attr("class", "architecture-groups"), await gr(l, r2, a, C), dr(l, r2, i, C);
  let f = await Ir(a, i, n, c2, l, t);
  await fr(e, f, l, C), await ur(h, f, l, C), Cr(l, f), _o(void 0, u, l.getConfigField("padding"), l.getConfigField("useMaxWidth"));
}, "draw");
var vr = { draw: Rr };
var Ci = { parser: we, get db() {
  return new re();
}, renderer: vr, styles: lr };
export {
  Ci as diagram
};
//# sourceMappingURL=architectureDiagram-EMZXCZ2Q-ZKVAPAFE.js.map

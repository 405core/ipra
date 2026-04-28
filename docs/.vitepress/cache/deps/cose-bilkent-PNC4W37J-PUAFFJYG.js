import {
  ra
} from "./chunk-D7XFU3CV.js";
import {
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import {
  m,
  o,
  r
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/cose-bilkent-PNC4W37J.mjs
var q = o((k, K) => {
  "use strict";
  m(function(M, v) {
    typeof k == "object" && typeof K == "object" ? K.exports = v() : typeof define == "function" && define.amd ? define([], v) : typeof k == "object" ? k.layoutBase = v() : M.layoutBase = v();
  }, "webpackUniversalModuleDefinition")(k, function() {
    return function(m2) {
      var M = {};
      function v(n) {
        if (M[n]) return M[n].exports;
        var e = M[n] = { i: n, l: false, exports: {} };
        return m2[n].call(e.exports, e, e.exports, v), e.l = true, e.exports;
      }
      return m(v, "__webpack_require__"), v.m = m2, v.c = M, v.i = function(n) {
        return n;
      }, v.d = function(n, e, t) {
        v.o(n, e) || Object.defineProperty(n, e, { configurable: false, enumerable: true, get: t });
      }, v.n = function(n) {
        var e = n && n.__esModule ? m(function() {
          return n.default;
        }, "getDefault") : m(function() {
          return n;
        }, "getModuleExports");
        return v.d(e, "a", e), e;
      }, v.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e);
      }, v.p = "", v(v.s = 26);
    }([function(m2, M, v) {
      "use strict";
      function n() {
      }
      m(n, "LayoutConstants"), n.QUALITY = 1, n.DEFAULT_CREATE_BENDS_AS_NEEDED = false, n.DEFAULT_INCREMENTAL = false, n.DEFAULT_ANIMATION_ON_LAYOUT = true, n.DEFAULT_ANIMATION_DURING_LAYOUT = false, n.DEFAULT_ANIMATION_PERIOD = 50, n.DEFAULT_UNIFORM_LEAF_NODE_SIZES = false, n.DEFAULT_GRAPH_MARGIN = 15, n.NODE_DIMENSIONS_INCLUDE_LABELS = false, n.SIMPLE_NODE_SIZE = 40, n.SIMPLE_NODE_HALF_SIZE = n.SIMPLE_NODE_SIZE / 2, n.EMPTY_COMPOUND_NODE_SIZE = 40, n.MIN_EDGE_LENGTH = 1, n.WORLD_BOUNDARY = 1e6, n.INITIAL_WORLD_BOUNDARY = n.WORLD_BOUNDARY / 1e3, n.WORLD_CENTER_X = 1200, n.WORLD_CENTER_Y = 900, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = v(2), e = v(8), t = v(9);
      function r2(u, o2, p) {
        n.call(this, p), this.isOverlapingSourceAndTarget = false, this.vGraphObject = p, this.bendpoints = [], this.source = u, this.target = o2;
      }
      m(r2, "LEdge"), r2.prototype = Object.create(n.prototype);
      for (var a in n) r2[a] = n[a];
      r2.prototype.getSource = function() {
        return this.source;
      }, r2.prototype.getTarget = function() {
        return this.target;
      }, r2.prototype.isInterGraph = function() {
        return this.isInterGraph;
      }, r2.prototype.getLength = function() {
        return this.length;
      }, r2.prototype.isOverlapingSourceAndTarget = function() {
        return this.isOverlapingSourceAndTarget;
      }, r2.prototype.getBendpoints = function() {
        return this.bendpoints;
      }, r2.prototype.getLca = function() {
        return this.lca;
      }, r2.prototype.getSourceInLca = function() {
        return this.sourceInLca;
      }, r2.prototype.getTargetInLca = function() {
        return this.targetInLca;
      }, r2.prototype.getOtherEnd = function(u) {
        if (this.source === u) return this.target;
        if (this.target === u) return this.source;
        throw "Node is not incident with this edge";
      }, r2.prototype.getOtherEndInGraph = function(u, o2) {
        for (var p = this.getOtherEnd(u), i = o2.getGraphManager().getRoot(); ; ) {
          if (p.getOwner() == o2) return p;
          if (p.getOwner() == i) break;
          p = p.getOwner().getParent();
        }
        return null;
      }, r2.prototype.updateLength = function() {
        var u = new Array(4);
        this.isOverlapingSourceAndTarget = e.getIntersection(this.target.getRect(), this.source.getRect(), u), this.isOverlapingSourceAndTarget || (this.lengthX = u[0] - u[2], this.lengthY = u[1] - u[3], Math.abs(this.lengthX) < 1 && (this.lengthX = t.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = t.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY));
      }, r2.prototype.updateLengthSimple = function() {
        this.lengthX = this.target.getCenterX() - this.source.getCenterX(), this.lengthY = this.target.getCenterY() - this.source.getCenterY(), Math.abs(this.lengthX) < 1 && (this.lengthX = t.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = t.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
      }, m2.exports = r2;
    }, function(m2, M, v) {
      "use strict";
      function n(e) {
        this.vGraphObject = e;
      }
      m(n, "LGraphObject"), m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = v(2), e = v(10), t = v(13), r2 = v(0), a = v(16), u = v(4);
      function o2(i, h, l, d) {
        l == null && d == null && (d = h), n.call(this, d), i.graphManager != null && (i = i.graphManager), this.estimatedSize = e.MIN_VALUE, this.inclusionTreeDepth = e.MAX_VALUE, this.vGraphObject = d, this.edges = [], this.graphManager = i, l != null && h != null ? this.rect = new t(h.x, h.y, l.width, l.height) : this.rect = new t();
      }
      m(o2, "LNode"), o2.prototype = Object.create(n.prototype);
      for (var p in n) o2[p] = n[p];
      o2.prototype.getEdges = function() {
        return this.edges;
      }, o2.prototype.getChild = function() {
        return this.child;
      }, o2.prototype.getOwner = function() {
        return this.owner;
      }, o2.prototype.getWidth = function() {
        return this.rect.width;
      }, o2.prototype.setWidth = function(i) {
        this.rect.width = i;
      }, o2.prototype.getHeight = function() {
        return this.rect.height;
      }, o2.prototype.setHeight = function(i) {
        this.rect.height = i;
      }, o2.prototype.getCenterX = function() {
        return this.rect.x + this.rect.width / 2;
      }, o2.prototype.getCenterY = function() {
        return this.rect.y + this.rect.height / 2;
      }, o2.prototype.getCenter = function() {
        return new u(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
      }, o2.prototype.getLocation = function() {
        return new u(this.rect.x, this.rect.y);
      }, o2.prototype.getRect = function() {
        return this.rect;
      }, o2.prototype.getDiagonal = function() {
        return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
      }, o2.prototype.getHalfTheDiagonal = function() {
        return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
      }, o2.prototype.setRect = function(i, h) {
        this.rect.x = i.x, this.rect.y = i.y, this.rect.width = h.width, this.rect.height = h.height;
      }, o2.prototype.setCenter = function(i, h) {
        this.rect.x = i - this.rect.width / 2, this.rect.y = h - this.rect.height / 2;
      }, o2.prototype.setLocation = function(i, h) {
        this.rect.x = i, this.rect.y = h;
      }, o2.prototype.moveBy = function(i, h) {
        this.rect.x += i, this.rect.y += h;
      }, o2.prototype.getEdgeListToNode = function(i) {
        var h = [], l, d = this;
        return d.edges.forEach(function(y) {
          if (y.target == i) {
            if (y.source != d) throw "Incorrect edge source!";
            h.push(y);
          }
        }), h;
      }, o2.prototype.getEdgesBetween = function(i) {
        var h = [], l, d = this;
        return d.edges.forEach(function(y) {
          if (!(y.source == d || y.target == d)) throw "Incorrect edge source and/or target";
          (y.target == i || y.source == i) && h.push(y);
        }), h;
      }, o2.prototype.getNeighborsList = function() {
        var i = /* @__PURE__ */ new Set(), h = this;
        return h.edges.forEach(function(l) {
          if (l.source == h) i.add(l.target);
          else {
            if (l.target != h) throw "Incorrect incidency!";
            i.add(l.source);
          }
        }), i;
      }, o2.prototype.withChildren = function() {
        var i = /* @__PURE__ */ new Set(), h, l;
        if (i.add(this), this.child != null) for (var d = this.child.getNodes(), y = 0; y < d.length; y++) h = d[y], l = h.withChildren(), l.forEach(function(T) {
          i.add(T);
        });
        return i;
      }, o2.prototype.getNoOfChildren = function() {
        var i = 0, h;
        if (this.child == null) i = 1;
        else for (var l = this.child.getNodes(), d = 0; d < l.length; d++) h = l[d], i += h.getNoOfChildren();
        return i == 0 && (i = 1), i;
      }, o2.prototype.getEstimatedSize = function() {
        if (this.estimatedSize == e.MIN_VALUE) throw "assert failed";
        return this.estimatedSize;
      }, o2.prototype.calcEstimatedSize = function() {
        return this.child == null ? this.estimatedSize = (this.rect.width + this.rect.height) / 2 : (this.estimatedSize = this.child.calcEstimatedSize(), this.rect.width = this.estimatedSize, this.rect.height = this.estimatedSize, this.estimatedSize);
      }, o2.prototype.scatter = function() {
        var i, h, l = -r2.INITIAL_WORLD_BOUNDARY, d = r2.INITIAL_WORLD_BOUNDARY;
        i = r2.WORLD_CENTER_X + a.nextDouble() * (d - l) + l;
        var y = -r2.INITIAL_WORLD_BOUNDARY, T = r2.INITIAL_WORLD_BOUNDARY;
        h = r2.WORLD_CENTER_Y + a.nextDouble() * (T - y) + y, this.rect.x = i, this.rect.y = h;
      }, o2.prototype.updateBounds = function() {
        if (this.getChild() == null) throw "assert failed";
        if (this.getChild().getNodes().length != 0) {
          var i = this.getChild();
          if (i.updateBounds(true), this.rect.x = i.getLeft(), this.rect.y = i.getTop(), this.setWidth(i.getRight() - i.getLeft()), this.setHeight(i.getBottom() - i.getTop()), r2.NODE_DIMENSIONS_INCLUDE_LABELS) {
            var h = i.getRight() - i.getLeft(), l = i.getBottom() - i.getTop();
            this.labelWidth > h && (this.rect.x -= (this.labelWidth - h) / 2, this.setWidth(this.labelWidth)), this.labelHeight > l && (this.labelPos == "center" ? this.rect.y -= (this.labelHeight - l) / 2 : this.labelPos == "top" && (this.rect.y -= this.labelHeight - l), this.setHeight(this.labelHeight));
          }
        }
      }, o2.prototype.getInclusionTreeDepth = function() {
        if (this.inclusionTreeDepth == e.MAX_VALUE) throw "assert failed";
        return this.inclusionTreeDepth;
      }, o2.prototype.transform = function(i) {
        var h = this.rect.x;
        h > r2.WORLD_BOUNDARY ? h = r2.WORLD_BOUNDARY : h < -r2.WORLD_BOUNDARY && (h = -r2.WORLD_BOUNDARY);
        var l = this.rect.y;
        l > r2.WORLD_BOUNDARY ? l = r2.WORLD_BOUNDARY : l < -r2.WORLD_BOUNDARY && (l = -r2.WORLD_BOUNDARY);
        var d = new u(h, l), y = i.inverseTransformPoint(d);
        this.setLocation(y.x, y.y);
      }, o2.prototype.getLeft = function() {
        return this.rect.x;
      }, o2.prototype.getRight = function() {
        return this.rect.x + this.rect.width;
      }, o2.prototype.getTop = function() {
        return this.rect.y;
      }, o2.prototype.getBottom = function() {
        return this.rect.y + this.rect.height;
      }, o2.prototype.getParent = function() {
        return this.owner == null ? null : this.owner.getParent();
      }, m2.exports = o2;
    }, function(m2, M, v) {
      "use strict";
      function n(e, t) {
        e == null && t == null ? (this.x = 0, this.y = 0) : (this.x = e, this.y = t);
      }
      m(n, "PointD"), n.prototype.getX = function() {
        return this.x;
      }, n.prototype.getY = function() {
        return this.y;
      }, n.prototype.setX = function(e) {
        this.x = e;
      }, n.prototype.setY = function(e) {
        this.y = e;
      }, n.prototype.getDifference = function(e) {
        return new DimensionD(this.x - e.x, this.y - e.y);
      }, n.prototype.getCopy = function() {
        return new n(this.x, this.y);
      }, n.prototype.translate = function(e) {
        return this.x += e.width, this.y += e.height, this;
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = v(2), e = v(10), t = v(0), r2 = v(6), a = v(3), u = v(1), o2 = v(13), p = v(12), i = v(11);
      function h(d, y, T) {
        n.call(this, T), this.estimatedSize = e.MIN_VALUE, this.margin = t.DEFAULT_GRAPH_MARGIN, this.edges = [], this.nodes = [], this.isConnected = false, this.parent = d, y != null && y instanceof r2 ? this.graphManager = y : y != null && y instanceof Layout && (this.graphManager = y.graphManager);
      }
      m(h, "LGraph"), h.prototype = Object.create(n.prototype);
      for (var l in n) h[l] = n[l];
      h.prototype.getNodes = function() {
        return this.nodes;
      }, h.prototype.getEdges = function() {
        return this.edges;
      }, h.prototype.getGraphManager = function() {
        return this.graphManager;
      }, h.prototype.getParent = function() {
        return this.parent;
      }, h.prototype.getLeft = function() {
        return this.left;
      }, h.prototype.getRight = function() {
        return this.right;
      }, h.prototype.getTop = function() {
        return this.top;
      }, h.prototype.getBottom = function() {
        return this.bottom;
      }, h.prototype.isConnected = function() {
        return this.isConnected;
      }, h.prototype.add = function(d, y, T) {
        if (y == null && T == null) {
          var c = d;
          if (this.graphManager == null) throw "Graph has no graph mgr!";
          if (this.getNodes().indexOf(c) > -1) throw "Node already in graph!";
          return c.owner = this, this.getNodes().push(c), c;
        } else {
          var D = d;
          if (!(this.getNodes().indexOf(y) > -1 && this.getNodes().indexOf(T) > -1)) throw "Source or target not in graph!";
          if (!(y.owner == T.owner && y.owner == this)) throw "Both owners must be this graph!";
          return y.owner != T.owner ? null : (D.source = y, D.target = T, D.isInterGraph = false, this.getEdges().push(D), y.edges.push(D), T != y && T.edges.push(D), D);
        }
      }, h.prototype.remove = function(d) {
        var y = d;
        if (d instanceof a) {
          if (y == null) throw "Node is null!";
          if (!(y.owner != null && y.owner == this)) throw "Owner graph is invalid!";
          if (this.graphManager == null) throw "Owner graph manager is invalid!";
          for (var T = y.edges.slice(), c, D = T.length, E = 0; E < D; E++) c = T[E], c.isInterGraph ? this.graphManager.remove(c) : c.source.owner.remove(c);
          var O = this.nodes.indexOf(y);
          if (O == -1) throw "Node not in owner node list!";
          this.nodes.splice(O, 1);
        } else if (d instanceof u) {
          var c = d;
          if (c == null) throw "Edge is null!";
          if (!(c.source != null && c.target != null)) throw "Source and/or target is null!";
          if (!(c.source.owner != null && c.target.owner != null && c.source.owner == this && c.target.owner == this)) throw "Source and/or target owner is invalid!";
          var s = c.source.edges.indexOf(c), g = c.target.edges.indexOf(c);
          if (!(s > -1 && g > -1)) throw "Source and/or target doesn't know this edge!";
          c.source.edges.splice(s, 1), c.target != c.source && c.target.edges.splice(g, 1);
          var O = c.source.owner.getEdges().indexOf(c);
          if (O == -1) throw "Not in owner's edge list!";
          c.source.owner.getEdges().splice(O, 1);
        }
      }, h.prototype.updateLeftTop = function() {
        for (var d = e.MAX_VALUE, y = e.MAX_VALUE, T, c, D, E = this.getNodes(), O = E.length, s = 0; s < O; s++) {
          var g = E[s];
          T = g.getTop(), c = g.getLeft(), d > T && (d = T), y > c && (y = c);
        }
        return d == e.MAX_VALUE ? null : (E[0].getParent().paddingLeft != null ? D = E[0].getParent().paddingLeft : D = this.margin, this.left = y - D, this.top = d - D, new p(this.left, this.top));
      }, h.prototype.updateBounds = function(d) {
        for (var y = e.MAX_VALUE, T = -e.MAX_VALUE, c = e.MAX_VALUE, D = -e.MAX_VALUE, E, O, s, g, f, L = this.nodes, N = L.length, I = 0; I < N; I++) {
          var R = L[I];
          d && R.child != null && R.updateBounds(), E = R.getLeft(), O = R.getRight(), s = R.getTop(), g = R.getBottom(), y > E && (y = E), T < O && (T = O), c > s && (c = s), D < g && (D = g);
        }
        var C = new o2(y, c, T - y, D - c);
        y == e.MAX_VALUE && (this.left = this.parent.getLeft(), this.right = this.parent.getRight(), this.top = this.parent.getTop(), this.bottom = this.parent.getBottom()), L[0].getParent().paddingLeft != null ? f = L[0].getParent().paddingLeft : f = this.margin, this.left = C.x - f, this.right = C.x + C.width + f, this.top = C.y - f, this.bottom = C.y + C.height + f;
      }, h.calculateBounds = function(d) {
        for (var y = e.MAX_VALUE, T = -e.MAX_VALUE, c = e.MAX_VALUE, D = -e.MAX_VALUE, E, O, s, g, f = d.length, L = 0; L < f; L++) {
          var N = d[L];
          E = N.getLeft(), O = N.getRight(), s = N.getTop(), g = N.getBottom(), y > E && (y = E), T < O && (T = O), c > s && (c = s), D < g && (D = g);
        }
        var I = new o2(y, c, T - y, D - c);
        return I;
      }, h.prototype.getInclusionTreeDepth = function() {
        return this == this.graphManager.getRoot() ? 1 : this.parent.getInclusionTreeDepth();
      }, h.prototype.getEstimatedSize = function() {
        if (this.estimatedSize == e.MIN_VALUE) throw "assert failed";
        return this.estimatedSize;
      }, h.prototype.calcEstimatedSize = function() {
        for (var d = 0, y = this.nodes, T = y.length, c = 0; c < T; c++) {
          var D = y[c];
          d += D.calcEstimatedSize();
        }
        return d == 0 ? this.estimatedSize = t.EMPTY_COMPOUND_NODE_SIZE : this.estimatedSize = d / Math.sqrt(this.nodes.length), this.estimatedSize;
      }, h.prototype.updateConnected = function() {
        var d = this;
        if (this.nodes.length == 0) {
          this.isConnected = true;
          return;
        }
        var y = new i(), T = /* @__PURE__ */ new Set(), c = this.nodes[0], D, E, O = c.withChildren();
        for (O.forEach(function(I) {
          y.push(I), T.add(I);
        }); y.length !== 0; ) {
          c = y.shift(), D = c.getEdges();
          for (var s = D.length, g = 0; g < s; g++) {
            var f = D[g];
            if (E = f.getOtherEndInGraph(c, this), E != null && !T.has(E)) {
              var L = E.withChildren();
              L.forEach(function(I) {
                y.push(I), T.add(I);
              });
            }
          }
        }
        if (this.isConnected = false, T.size >= this.nodes.length) {
          var N = 0;
          T.forEach(function(I) {
            I.owner == d && N++;
          }), N == this.nodes.length && (this.isConnected = true);
        }
      }, m2.exports = h;
    }, function(m2, M, v) {
      "use strict";
      var n, e = v(1);
      function t(r2) {
        n = v(5), this.layout = r2, this.graphs = [], this.edges = [];
      }
      m(t, "LGraphManager"), t.prototype.addRoot = function() {
        var r2 = this.layout.newGraph(), a = this.layout.newNode(null), u = this.add(r2, a);
        return this.setRootGraph(u), this.rootGraph;
      }, t.prototype.add = function(r2, a, u, o2, p) {
        if (u == null && o2 == null && p == null) {
          if (r2 == null) throw "Graph is null!";
          if (a == null) throw "Parent node is null!";
          if (this.graphs.indexOf(r2) > -1) throw "Graph already in this graph mgr!";
          if (this.graphs.push(r2), r2.parent != null) throw "Already has a parent!";
          if (a.child != null) throw "Already has a child!";
          return r2.parent = a, a.child = r2, r2;
        } else {
          p = u, o2 = a, u = r2;
          var i = o2.getOwner(), h = p.getOwner();
          if (!(i != null && i.getGraphManager() == this)) throw "Source not in this graph mgr!";
          if (!(h != null && h.getGraphManager() == this)) throw "Target not in this graph mgr!";
          if (i == h) return u.isInterGraph = false, i.add(u, o2, p);
          if (u.isInterGraph = true, u.source = o2, u.target = p, this.edges.indexOf(u) > -1) throw "Edge already in inter-graph edge list!";
          if (this.edges.push(u), !(u.source != null && u.target != null)) throw "Edge source and/or target is null!";
          if (!(u.source.edges.indexOf(u) == -1 && u.target.edges.indexOf(u) == -1)) throw "Edge already in source and/or target incidency list!";
          return u.source.edges.push(u), u.target.edges.push(u), u;
        }
      }, t.prototype.remove = function(r2) {
        if (r2 instanceof n) {
          var a = r2;
          if (a.getGraphManager() != this) throw "Graph not in this graph mgr";
          if (!(a == this.rootGraph || a.parent != null && a.parent.graphManager == this)) throw "Invalid parent node!";
          var u = [];
          u = u.concat(a.getEdges());
          for (var o2, p = u.length, i = 0; i < p; i++) o2 = u[i], a.remove(o2);
          var h = [];
          h = h.concat(a.getNodes());
          var l;
          p = h.length;
          for (var i = 0; i < p; i++) l = h[i], a.remove(l);
          a == this.rootGraph && this.setRootGraph(null);
          var d = this.graphs.indexOf(a);
          this.graphs.splice(d, 1), a.parent = null;
        } else if (r2 instanceof e) {
          if (o2 = r2, o2 == null) throw "Edge is null!";
          if (!o2.isInterGraph) throw "Not an inter-graph edge!";
          if (!(o2.source != null && o2.target != null)) throw "Source and/or target is null!";
          if (!(o2.source.edges.indexOf(o2) != -1 && o2.target.edges.indexOf(o2) != -1)) throw "Source and/or target doesn't know this edge!";
          var d = o2.source.edges.indexOf(o2);
          if (o2.source.edges.splice(d, 1), d = o2.target.edges.indexOf(o2), o2.target.edges.splice(d, 1), !(o2.source.owner != null && o2.source.owner.getGraphManager() != null)) throw "Edge owner graph or owner graph manager is null!";
          if (o2.source.owner.getGraphManager().edges.indexOf(o2) == -1) throw "Not in owner graph manager's edge list!";
          var d = o2.source.owner.getGraphManager().edges.indexOf(o2);
          o2.source.owner.getGraphManager().edges.splice(d, 1);
        }
      }, t.prototype.updateBounds = function() {
        this.rootGraph.updateBounds(true);
      }, t.prototype.getGraphs = function() {
        return this.graphs;
      }, t.prototype.getAllNodes = function() {
        if (this.allNodes == null) {
          for (var r2 = [], a = this.getGraphs(), u = a.length, o2 = 0; o2 < u; o2++) r2 = r2.concat(a[o2].getNodes());
          this.allNodes = r2;
        }
        return this.allNodes;
      }, t.prototype.resetAllNodes = function() {
        this.allNodes = null;
      }, t.prototype.resetAllEdges = function() {
        this.allEdges = null;
      }, t.prototype.resetAllNodesToApplyGravitation = function() {
        this.allNodesToApplyGravitation = null;
      }, t.prototype.getAllEdges = function() {
        if (this.allEdges == null) {
          for (var r2 = [], a = this.getGraphs(), u = a.length, o2 = 0; o2 < a.length; o2++) r2 = r2.concat(a[o2].getEdges());
          r2 = r2.concat(this.edges), this.allEdges = r2;
        }
        return this.allEdges;
      }, t.prototype.getAllNodesToApplyGravitation = function() {
        return this.allNodesToApplyGravitation;
      }, t.prototype.setAllNodesToApplyGravitation = function(r2) {
        if (this.allNodesToApplyGravitation != null) throw "assert failed";
        this.allNodesToApplyGravitation = r2;
      }, t.prototype.getRoot = function() {
        return this.rootGraph;
      }, t.prototype.setRootGraph = function(r2) {
        if (r2.getGraphManager() != this) throw "Root not in this graph mgr!";
        this.rootGraph = r2, r2.parent == null && (r2.parent = this.layout.newNode("Root node"));
      }, t.prototype.getLayout = function() {
        return this.layout;
      }, t.prototype.isOneAncestorOfOther = function(r2, a) {
        if (!(r2 != null && a != null)) throw "assert failed";
        if (r2 == a) return true;
        var u = r2.getOwner(), o2;
        do {
          if (o2 = u.getParent(), o2 == null) break;
          if (o2 == a) return true;
          if (u = o2.getOwner(), u == null) break;
        } while (true);
        u = a.getOwner();
        do {
          if (o2 = u.getParent(), o2 == null) break;
          if (o2 == r2) return true;
          if (u = o2.getOwner(), u == null) break;
        } while (true);
        return false;
      }, t.prototype.calcLowestCommonAncestors = function() {
        for (var r2, a, u, o2, p, i = this.getAllEdges(), h = i.length, l = 0; l < h; l++) {
          if (r2 = i[l], a = r2.source, u = r2.target, r2.lca = null, r2.sourceInLca = a, r2.targetInLca = u, a == u) {
            r2.lca = a.getOwner();
            continue;
          }
          for (o2 = a.getOwner(); r2.lca == null; ) {
            for (r2.targetInLca = u, p = u.getOwner(); r2.lca == null; ) {
              if (p == o2) {
                r2.lca = p;
                break;
              }
              if (p == this.rootGraph) break;
              if (r2.lca != null) throw "assert failed";
              r2.targetInLca = p.getParent(), p = r2.targetInLca.getOwner();
            }
            if (o2 == this.rootGraph) break;
            r2.lca == null && (r2.sourceInLca = o2.getParent(), o2 = r2.sourceInLca.getOwner());
          }
          if (r2.lca == null) throw "assert failed";
        }
      }, t.prototype.calcLowestCommonAncestor = function(r2, a) {
        if (r2 == a) return r2.getOwner();
        var u = r2.getOwner();
        do {
          if (u == null) break;
          var o2 = a.getOwner();
          do {
            if (o2 == null) break;
            if (o2 == u) return o2;
            o2 = o2.getParent().getOwner();
          } while (true);
          u = u.getParent().getOwner();
        } while (true);
        return u;
      }, t.prototype.calcInclusionTreeDepths = function(r2, a) {
        r2 == null && a == null && (r2 = this.rootGraph, a = 1);
        for (var u, o2 = r2.getNodes(), p = o2.length, i = 0; i < p; i++) u = o2[i], u.inclusionTreeDepth = a, u.child != null && this.calcInclusionTreeDepths(u.child, a + 1);
      }, t.prototype.includesInvalidEdge = function() {
        for (var r2, a = this.edges.length, u = 0; u < a; u++) if (r2 = this.edges[u], this.isOneAncestorOfOther(r2.source, r2.target)) return true;
        return false;
      }, m2.exports = t;
    }, function(m2, M, v) {
      "use strict";
      var n = v(0);
      function e() {
      }
      m(e, "FDLayoutConstants");
      for (var t in n) e[t] = n[t];
      e.MAX_ITERATIONS = 2500, e.DEFAULT_EDGE_LENGTH = 50, e.DEFAULT_SPRING_STRENGTH = 0.45, e.DEFAULT_REPULSION_STRENGTH = 4500, e.DEFAULT_GRAVITY_STRENGTH = 0.4, e.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1, e.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8, e.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5, e.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = true, e.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = true, e.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3, e.COOLING_ADAPTATION_FACTOR = 0.33, e.ADAPTATION_LOWER_NODE_LIMIT = 1e3, e.ADAPTATION_UPPER_NODE_LIMIT = 5e3, e.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100, e.MAX_NODE_DISPLACEMENT = e.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3, e.MIN_REPULSION_DIST = e.DEFAULT_EDGE_LENGTH / 10, e.CONVERGENCE_CHECK_PERIOD = 100, e.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1, e.MIN_EDGE_LENGTH = 1, e.GRID_CALCULATION_CHECK_PERIOD = 10, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      var n = v(12);
      function e() {
      }
      m(e, "IGeometry"), e.calcSeparationAmount = function(t, r2, a, u) {
        if (!t.intersects(r2)) throw "assert failed";
        var o2 = new Array(2);
        this.decideDirectionsForOverlappingNodes(t, r2, o2), a[0] = Math.min(t.getRight(), r2.getRight()) - Math.max(t.x, r2.x), a[1] = Math.min(t.getBottom(), r2.getBottom()) - Math.max(t.y, r2.y), t.getX() <= r2.getX() && t.getRight() >= r2.getRight() ? a[0] += Math.min(r2.getX() - t.getX(), t.getRight() - r2.getRight()) : r2.getX() <= t.getX() && r2.getRight() >= t.getRight() && (a[0] += Math.min(t.getX() - r2.getX(), r2.getRight() - t.getRight())), t.getY() <= r2.getY() && t.getBottom() >= r2.getBottom() ? a[1] += Math.min(r2.getY() - t.getY(), t.getBottom() - r2.getBottom()) : r2.getY() <= t.getY() && r2.getBottom() >= t.getBottom() && (a[1] += Math.min(t.getY() - r2.getY(), r2.getBottom() - t.getBottom()));
        var p = Math.abs((r2.getCenterY() - t.getCenterY()) / (r2.getCenterX() - t.getCenterX()));
        r2.getCenterY() === t.getCenterY() && r2.getCenterX() === t.getCenterX() && (p = 1);
        var i = p * a[0], h = a[1] / p;
        a[0] < h ? h = a[0] : i = a[1], a[0] = -1 * o2[0] * (h / 2 + u), a[1] = -1 * o2[1] * (i / 2 + u);
      }, e.decideDirectionsForOverlappingNodes = function(t, r2, a) {
        t.getCenterX() < r2.getCenterX() ? a[0] = -1 : a[0] = 1, t.getCenterY() < r2.getCenterY() ? a[1] = -1 : a[1] = 1;
      }, e.getIntersection2 = function(t, r2, a) {
        var u = t.getCenterX(), o2 = t.getCenterY(), p = r2.getCenterX(), i = r2.getCenterY();
        if (t.intersects(r2)) return a[0] = u, a[1] = o2, a[2] = p, a[3] = i, true;
        var h = t.getX(), l = t.getY(), d = t.getRight(), y = t.getX(), T = t.getBottom(), c = t.getRight(), D = t.getWidthHalf(), E = t.getHeightHalf(), O = r2.getX(), s = r2.getY(), g = r2.getRight(), f = r2.getX(), L = r2.getBottom(), N = r2.getRight(), I = r2.getWidthHalf(), R = r2.getHeightHalf(), C = false, G = false;
        if (u === p) {
          if (o2 > i) return a[0] = u, a[1] = l, a[2] = p, a[3] = L, false;
          if (o2 < i) return a[0] = u, a[1] = T, a[2] = p, a[3] = s, false;
        } else if (o2 === i) {
          if (u > p) return a[0] = h, a[1] = o2, a[2] = g, a[3] = i, false;
          if (u < p) return a[0] = d, a[1] = o2, a[2] = O, a[3] = i, false;
        } else {
          var S = t.height / t.width, _ = r2.height / r2.width, F = (i - o2) / (p - u), w = void 0, x = void 0, P = void 0, Y = void 0, X = void 0, U = void 0;
          if (-S === F ? u > p ? (a[0] = y, a[1] = T, C = true) : (a[0] = d, a[1] = l, C = true) : S === F && (u > p ? (a[0] = h, a[1] = l, C = true) : (a[0] = c, a[1] = T, C = true)), -_ === F ? p > u ? (a[2] = f, a[3] = L, G = true) : (a[2] = g, a[3] = s, G = true) : _ === F && (p > u ? (a[2] = O, a[3] = s, G = true) : (a[2] = N, a[3] = L, G = true)), C && G) return false;
          if (u > p ? o2 > i ? (w = this.getCardinalDirection(S, F, 4), x = this.getCardinalDirection(_, F, 2)) : (w = this.getCardinalDirection(-S, F, 3), x = this.getCardinalDirection(-_, F, 1)) : o2 > i ? (w = this.getCardinalDirection(-S, F, 1), x = this.getCardinalDirection(-_, F, 3)) : (w = this.getCardinalDirection(S, F, 2), x = this.getCardinalDirection(_, F, 4)), !C) switch (w) {
            case 1:
              Y = l, P = u + -E / F, a[0] = P, a[1] = Y;
              break;
            case 2:
              P = c, Y = o2 + D * F, a[0] = P, a[1] = Y;
              break;
            case 3:
              Y = T, P = u + E / F, a[0] = P, a[1] = Y;
              break;
            case 4:
              P = y, Y = o2 + -D * F, a[0] = P, a[1] = Y;
              break;
          }
          if (!G) switch (x) {
            case 1:
              U = s, X = p + -R / F, a[2] = X, a[3] = U;
              break;
            case 2:
              X = N, U = i + I * F, a[2] = X, a[3] = U;
              break;
            case 3:
              U = L, X = p + R / F, a[2] = X, a[3] = U;
              break;
            case 4:
              X = f, U = i + -I * F, a[2] = X, a[3] = U;
              break;
          }
        }
        return false;
      }, e.getCardinalDirection = function(t, r2, a) {
        return t > r2 ? a : 1 + a % 4;
      }, e.getIntersection = function(t, r2, a, u) {
        if (u == null) return this.getIntersection2(t, r2, a);
        var o2 = t.x, p = t.y, i = r2.x, h = r2.y, l = a.x, d = a.y, y = u.x, T = u.y, c = void 0, D = void 0, E = void 0, O = void 0, s = void 0, g = void 0, f = void 0, L = void 0, N = void 0;
        return E = h - p, s = o2 - i, f = i * p - o2 * h, O = T - d, g = l - y, L = y * d - l * T, N = E * g - O * s, N === 0 ? null : (c = (s * L - g * f) / N, D = (O * f - E * L) / N, new n(c, D));
      }, e.angleOfVector = function(t, r2, a, u) {
        var o2 = void 0;
        return t !== a ? (o2 = Math.atan((u - r2) / (a - t)), a < t ? o2 += Math.PI : u < r2 && (o2 += this.TWO_PI)) : u < r2 ? o2 = this.ONE_AND_HALF_PI : o2 = this.HALF_PI, o2;
      }, e.doIntersect = function(t, r2, a, u) {
        var o2 = t.x, p = t.y, i = r2.x, h = r2.y, l = a.x, d = a.y, y = u.x, T = u.y, c = (i - o2) * (T - d) - (y - l) * (h - p);
        if (c === 0) return false;
        var D = ((T - d) * (y - o2) + (l - y) * (T - p)) / c, E = ((p - h) * (y - o2) + (i - o2) * (T - p)) / c;
        return 0 < D && D < 1 && 0 < E && E < 1;
      }, e.HALF_PI = 0.5 * Math.PI, e.ONE_AND_HALF_PI = 1.5 * Math.PI, e.TWO_PI = 2 * Math.PI, e.THREE_PI = 3 * Math.PI, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      function n() {
      }
      m(n, "IMath"), n.sign = function(e) {
        return e > 0 ? 1 : e < 0 ? -1 : 0;
      }, n.floor = function(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
      }, n.ceil = function(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e);
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      function n() {
      }
      m(n, "Integer"), n.MAX_VALUE = 2147483647, n.MIN_VALUE = -2147483648, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = function() {
        function o2(p, i) {
          for (var h = 0; h < i.length; h++) {
            var l = i[h];
            l.enumerable = l.enumerable || false, l.configurable = true, "value" in l && (l.writable = true), Object.defineProperty(p, l.key, l);
          }
        }
        return m(o2, "defineProperties"), function(p, i, h) {
          return i && o2(p.prototype, i), h && o2(p, h), p;
        };
      }();
      function e(o2, p) {
        if (!(o2 instanceof p)) throw new TypeError("Cannot call a class as a function");
      }
      m(e, "_classCallCheck");
      var t = m(function(p) {
        return { value: p, next: null, prev: null };
      }, "nodeFrom"), r2 = m(function(p, i, h, l) {
        return p !== null ? p.next = i : l.head = i, h !== null ? h.prev = i : l.tail = i, i.prev = p, i.next = h, l.length++, i;
      }, "add"), a = m(function(p, i) {
        var h = p.prev, l = p.next;
        return h !== null ? h.next = l : i.head = l, l !== null ? l.prev = h : i.tail = h, p.prev = p.next = null, i.length--, p;
      }, "_remove"), u = function() {
        function o2(p) {
          var i = this;
          e(this, o2), this.length = 0, this.head = null, this.tail = null, p == null ? void 0 : p.forEach(function(h) {
            return i.push(h);
          });
        }
        return m(o2, "LinkedList"), n(o2, [{ key: "size", value: m(function() {
          return this.length;
        }, "size") }, { key: "insertBefore", value: m(function(i, h) {
          return r2(h.prev, t(i), h, this);
        }, "insertBefore") }, { key: "insertAfter", value: m(function(i, h) {
          return r2(h, t(i), h.next, this);
        }, "insertAfter") }, { key: "insertNodeBefore", value: m(function(i, h) {
          return r2(h.prev, i, h, this);
        }, "insertNodeBefore") }, { key: "insertNodeAfter", value: m(function(i, h) {
          return r2(h, i, h.next, this);
        }, "insertNodeAfter") }, { key: "push", value: m(function(i) {
          return r2(this.tail, t(i), null, this);
        }, "push") }, { key: "unshift", value: m(function(i) {
          return r2(null, t(i), this.head, this);
        }, "unshift") }, { key: "remove", value: m(function(i) {
          return a(i, this);
        }, "remove") }, { key: "pop", value: m(function() {
          return a(this.tail, this).value;
        }, "pop") }, { key: "popNode", value: m(function() {
          return a(this.tail, this);
        }, "popNode") }, { key: "shift", value: m(function() {
          return a(this.head, this).value;
        }, "shift") }, { key: "shiftNode", value: m(function() {
          return a(this.head, this);
        }, "shiftNode") }, { key: "get_object_at", value: m(function(i) {
          if (i <= this.length()) {
            for (var h = 1, l = this.head; h < i; ) l = l.next, h++;
            return l.value;
          }
        }, "get_object_at") }, { key: "set_object_at", value: m(function(i, h) {
          if (i <= this.length()) {
            for (var l = 1, d = this.head; l < i; ) d = d.next, l++;
            d.value = h;
          }
        }, "set_object_at") }]), o2;
      }();
      m2.exports = u;
    }, function(m2, M, v) {
      "use strict";
      function n(e, t, r2) {
        this.x = null, this.y = null, e == null && t == null && r2 == null ? (this.x = 0, this.y = 0) : typeof e == "number" && typeof t == "number" && r2 == null ? (this.x = e, this.y = t) : e.constructor.name == "Point" && t == null && r2 == null && (r2 = e, this.x = r2.x, this.y = r2.y);
      }
      m(n, "Point"), n.prototype.getX = function() {
        return this.x;
      }, n.prototype.getY = function() {
        return this.y;
      }, n.prototype.getLocation = function() {
        return new n(this.x, this.y);
      }, n.prototype.setLocation = function(e, t, r2) {
        e.constructor.name == "Point" && t == null && r2 == null ? (r2 = e, this.setLocation(r2.x, r2.y)) : typeof e == "number" && typeof t == "number" && r2 == null && (parseInt(e) == e && parseInt(t) == t ? this.move(e, t) : (this.x = Math.floor(e + 0.5), this.y = Math.floor(t + 0.5)));
      }, n.prototype.move = function(e, t) {
        this.x = e, this.y = t;
      }, n.prototype.translate = function(e, t) {
        this.x += e, this.y += t;
      }, n.prototype.equals = function(e) {
        if (e.constructor.name == "Point") {
          var t = e;
          return this.x == t.x && this.y == t.y;
        }
        return this == e;
      }, n.prototype.toString = function() {
        return new n().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      function n(e, t, r2, a) {
        this.x = 0, this.y = 0, this.width = 0, this.height = 0, e != null && t != null && r2 != null && a != null && (this.x = e, this.y = t, this.width = r2, this.height = a);
      }
      m(n, "RectangleD"), n.prototype.getX = function() {
        return this.x;
      }, n.prototype.setX = function(e) {
        this.x = e;
      }, n.prototype.getY = function() {
        return this.y;
      }, n.prototype.setY = function(e) {
        this.y = e;
      }, n.prototype.getWidth = function() {
        return this.width;
      }, n.prototype.setWidth = function(e) {
        this.width = e;
      }, n.prototype.getHeight = function() {
        return this.height;
      }, n.prototype.setHeight = function(e) {
        this.height = e;
      }, n.prototype.getRight = function() {
        return this.x + this.width;
      }, n.prototype.getBottom = function() {
        return this.y + this.height;
      }, n.prototype.intersects = function(e) {
        return !(this.getRight() < e.x || this.getBottom() < e.y || e.getRight() < this.x || e.getBottom() < this.y);
      }, n.prototype.getCenterX = function() {
        return this.x + this.width / 2;
      }, n.prototype.getMinX = function() {
        return this.getX();
      }, n.prototype.getMaxX = function() {
        return this.getX() + this.width;
      }, n.prototype.getCenterY = function() {
        return this.y + this.height / 2;
      }, n.prototype.getMinY = function() {
        return this.getY();
      }, n.prototype.getMaxY = function() {
        return this.getY() + this.height;
      }, n.prototype.getWidthHalf = function() {
        return this.width / 2;
      }, n.prototype.getHeightHalf = function() {
        return this.height / 2;
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
        return typeof t;
      } : function(t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      };
      function e() {
      }
      m(e, "UniqueIDGeneretor"), e.lastID = 0, e.createID = function(t) {
        return e.isPrimitive(t) ? t : (t.uniqueID != null || (t.uniqueID = e.getString(), e.lastID++), t.uniqueID);
      }, e.getString = function(t) {
        return t == null && (t = e.lastID), "Object#" + t;
      }, e.isPrimitive = function(t) {
        var r2 = typeof t > "u" ? "undefined" : n(t);
        return t == null || r2 != "object" && r2 != "function";
      }, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      function n(l) {
        if (Array.isArray(l)) {
          for (var d = 0, y = Array(l.length); d < l.length; d++) y[d] = l[d];
          return y;
        } else return Array.from(l);
      }
      m(n, "_toConsumableArray");
      var e = v(0), t = v(6), r2 = v(3), a = v(1), u = v(5), o2 = v(4), p = v(17), i = v(27);
      function h(l) {
        i.call(this), this.layoutQuality = e.QUALITY, this.createBendsAsNeeded = e.DEFAULT_CREATE_BENDS_AS_NEEDED, this.incremental = e.DEFAULT_INCREMENTAL, this.animationOnLayout = e.DEFAULT_ANIMATION_ON_LAYOUT, this.animationDuringLayout = e.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = e.DEFAULT_ANIMATION_PERIOD, this.uniformLeafNodeSizes = e.DEFAULT_UNIFORM_LEAF_NODE_SIZES, this.edgeToDummyNodes = /* @__PURE__ */ new Map(), this.graphManager = new t(this), this.isLayoutFinished = false, this.isSubLayout = false, this.isRemoteUse = false, l != null && (this.isRemoteUse = l);
      }
      m(h, "Layout"), h.RANDOM_SEED = 1, h.prototype = Object.create(i.prototype), h.prototype.getGraphManager = function() {
        return this.graphManager;
      }, h.prototype.getAllNodes = function() {
        return this.graphManager.getAllNodes();
      }, h.prototype.getAllEdges = function() {
        return this.graphManager.getAllEdges();
      }, h.prototype.getAllNodesToApplyGravitation = function() {
        return this.graphManager.getAllNodesToApplyGravitation();
      }, h.prototype.newGraphManager = function() {
        var l = new t(this);
        return this.graphManager = l, l;
      }, h.prototype.newGraph = function(l) {
        return new u(null, this.graphManager, l);
      }, h.prototype.newNode = function(l) {
        return new r2(this.graphManager, l);
      }, h.prototype.newEdge = function(l) {
        return new a(null, null, l);
      }, h.prototype.checkLayoutSuccess = function() {
        return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
      }, h.prototype.runLayout = function() {
        this.isLayoutFinished = false, this.tilingPreLayout && this.tilingPreLayout(), this.initParameters();
        var l;
        return this.checkLayoutSuccess() ? l = false : l = this.layout(), e.ANIMATE === "during" ? false : (l && (this.isSubLayout || this.doPostLayout()), this.tilingPostLayout && this.tilingPostLayout(), this.isLayoutFinished = true, l);
      }, h.prototype.doPostLayout = function() {
        this.incremental || this.transform(), this.update();
      }, h.prototype.update2 = function() {
        if (this.createBendsAsNeeded && (this.createBendpointsFromDummyNodes(), this.graphManager.resetAllEdges()), !this.isRemoteUse) {
          for (var l, d = this.graphManager.getAllEdges(), y = 0; y < d.length; y++) l = d[y];
          for (var T, c = this.graphManager.getRoot().getNodes(), y = 0; y < c.length; y++) T = c[y];
          this.update(this.graphManager.getRoot());
        }
      }, h.prototype.update = function(l) {
        if (l == null) this.update2();
        else if (l instanceof r2) {
          var d = l;
          if (d.getChild() != null) for (var y = d.getChild().getNodes(), T = 0; T < y.length; T++) update(y[T]);
          if (d.vGraphObject != null) {
            var c = d.vGraphObject;
            c.update(d);
          }
        } else if (l instanceof a) {
          var D = l;
          if (D.vGraphObject != null) {
            var E = D.vGraphObject;
            E.update(D);
          }
        } else if (l instanceof u) {
          var O = l;
          if (O.vGraphObject != null) {
            var s = O.vGraphObject;
            s.update(O);
          }
        }
      }, h.prototype.initParameters = function() {
        this.isSubLayout || (this.layoutQuality = e.QUALITY, this.animationDuringLayout = e.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = e.DEFAULT_ANIMATION_PERIOD, this.animationOnLayout = e.DEFAULT_ANIMATION_ON_LAYOUT, this.incremental = e.DEFAULT_INCREMENTAL, this.createBendsAsNeeded = e.DEFAULT_CREATE_BENDS_AS_NEEDED, this.uniformLeafNodeSizes = e.DEFAULT_UNIFORM_LEAF_NODE_SIZES), this.animationDuringLayout && (this.animationOnLayout = false);
      }, h.prototype.transform = function(l) {
        if (l == null) this.transform(new o2(0, 0));
        else {
          var d = new p(), y = this.graphManager.getRoot().updateLeftTop();
          if (y != null) {
            d.setWorldOrgX(l.x), d.setWorldOrgY(l.y), d.setDeviceOrgX(y.x), d.setDeviceOrgY(y.y);
            for (var T = this.getAllNodes(), c, D = 0; D < T.length; D++) c = T[D], c.transform(d);
          }
        }
      }, h.prototype.positionNodesRandomly = function(l) {
        if (l == null) this.positionNodesRandomly(this.getGraphManager().getRoot()), this.getGraphManager().getRoot().updateBounds(true);
        else for (var d, y, T = l.getNodes(), c = 0; c < T.length; c++) d = T[c], y = d.getChild(), y == null || y.getNodes().length == 0 ? d.scatter() : (this.positionNodesRandomly(y), d.updateBounds());
      }, h.prototype.getFlatForest = function() {
        for (var l = [], d = true, y = this.graphManager.getRoot().getNodes(), T = true, c = 0; c < y.length; c++) y[c].getChild() != null && (T = false);
        if (!T) return l;
        var D = /* @__PURE__ */ new Set(), E = [], O = /* @__PURE__ */ new Map(), s = [];
        for (s = s.concat(y); s.length > 0 && d; ) {
          for (E.push(s[0]); E.length > 0 && d; ) {
            var g = E[0];
            E.splice(0, 1), D.add(g);
            for (var f = g.getEdges(), c = 0; c < f.length; c++) {
              var L = f[c].getOtherEnd(g);
              if (O.get(g) != L) if (!D.has(L)) E.push(L), O.set(L, g);
              else {
                d = false;
                break;
              }
            }
          }
          if (!d) l = [];
          else {
            var N = [].concat(n(D));
            l.push(N);
            for (var c = 0; c < N.length; c++) {
              var I = N[c], R = s.indexOf(I);
              R > -1 && s.splice(R, 1);
            }
            D = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Map();
          }
        }
        return l;
      }, h.prototype.createDummyNodesForBendpoints = function(l) {
        for (var d = [], y = l.source, T = this.graphManager.calcLowestCommonAncestor(l.source, l.target), c = 0; c < l.bendpoints.length; c++) {
          var D = this.newNode(null);
          D.setRect(new Point(0, 0), new Dimension(1, 1)), T.add(D);
          var E = this.newEdge(null);
          this.graphManager.add(E, y, D), d.add(D), y = D;
        }
        var E = this.newEdge(null);
        return this.graphManager.add(E, y, l.target), this.edgeToDummyNodes.set(l, d), l.isInterGraph() ? this.graphManager.remove(l) : T.remove(l), d;
      }, h.prototype.createBendpointsFromDummyNodes = function() {
        var l = [];
        l = l.concat(this.graphManager.getAllEdges()), l = [].concat(n(this.edgeToDummyNodes.keys())).concat(l);
        for (var d = 0; d < l.length; d++) {
          var y = l[d];
          if (y.bendpoints.length > 0) {
            for (var T = this.edgeToDummyNodes.get(y), c = 0; c < T.length; c++) {
              var D = T[c], E = new o2(D.getCenterX(), D.getCenterY()), O = y.bendpoints.get(c);
              O.x = E.x, O.y = E.y, D.getOwner().remove(D);
            }
            this.graphManager.add(y, y.source, y.target);
          }
        }
      }, h.transform = function(l, d, y, T) {
        if (y != null && T != null) {
          var c = d;
          if (l <= 50) {
            var D = d / y;
            c -= (d - D) / 50 * (50 - l);
          } else {
            var E = d * T;
            c += (E - d) / 50 * (l - 50);
          }
          return c;
        } else {
          var O, s;
          return l <= 50 ? (O = 9 * d / 500, s = d / 10) : (O = 9 * d / 50, s = -8 * d), O * l + s;
        }
      }, h.findCenterOfTree = function(l) {
        var d = [];
        d = d.concat(l);
        var y = [], T = /* @__PURE__ */ new Map(), c = false, D = null;
        (d.length == 1 || d.length == 2) && (c = true, D = d[0]);
        for (var E = 0; E < d.length; E++) {
          var O = d[E], s = O.getNeighborsList().size;
          T.set(O, O.getNeighborsList().size), s == 1 && y.push(O);
        }
        var g = [];
        for (g = g.concat(y); !c; ) {
          var f = [];
          f = f.concat(g), g = [];
          for (var E = 0; E < d.length; E++) {
            var O = d[E], L = d.indexOf(O);
            L >= 0 && d.splice(L, 1);
            var N = O.getNeighborsList();
            N.forEach(function(C) {
              if (y.indexOf(C) < 0) {
                var G = T.get(C), S = G - 1;
                S == 1 && g.push(C), T.set(C, S);
              }
            });
          }
          y = y.concat(g), (d.length == 1 || d.length == 2) && (c = true, D = d[0]);
        }
        return D;
      }, h.prototype.setGraphManager = function(l) {
        this.graphManager = l;
      }, m2.exports = h;
    }, function(m2, M, v) {
      "use strict";
      function n() {
      }
      m(n, "RandomSeed"), n.seed = 1, n.x = 0, n.nextDouble = function() {
        return n.x = Math.sin(n.seed++) * 1e4, n.x - Math.floor(n.x);
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = v(4);
      function e(t, r2) {
        this.lworldOrgX = 0, this.lworldOrgY = 0, this.ldeviceOrgX = 0, this.ldeviceOrgY = 0, this.lworldExtX = 1, this.lworldExtY = 1, this.ldeviceExtX = 1, this.ldeviceExtY = 1;
      }
      m(e, "Transform"), e.prototype.getWorldOrgX = function() {
        return this.lworldOrgX;
      }, e.prototype.setWorldOrgX = function(t) {
        this.lworldOrgX = t;
      }, e.prototype.getWorldOrgY = function() {
        return this.lworldOrgY;
      }, e.prototype.setWorldOrgY = function(t) {
        this.lworldOrgY = t;
      }, e.prototype.getWorldExtX = function() {
        return this.lworldExtX;
      }, e.prototype.setWorldExtX = function(t) {
        this.lworldExtX = t;
      }, e.prototype.getWorldExtY = function() {
        return this.lworldExtY;
      }, e.prototype.setWorldExtY = function(t) {
        this.lworldExtY = t;
      }, e.prototype.getDeviceOrgX = function() {
        return this.ldeviceOrgX;
      }, e.prototype.setDeviceOrgX = function(t) {
        this.ldeviceOrgX = t;
      }, e.prototype.getDeviceOrgY = function() {
        return this.ldeviceOrgY;
      }, e.prototype.setDeviceOrgY = function(t) {
        this.ldeviceOrgY = t;
      }, e.prototype.getDeviceExtX = function() {
        return this.ldeviceExtX;
      }, e.prototype.setDeviceExtX = function(t) {
        this.ldeviceExtX = t;
      }, e.prototype.getDeviceExtY = function() {
        return this.ldeviceExtY;
      }, e.prototype.setDeviceExtY = function(t) {
        this.ldeviceExtY = t;
      }, e.prototype.transformX = function(t) {
        var r2 = 0, a = this.lworldExtX;
        return a != 0 && (r2 = this.ldeviceOrgX + (t - this.lworldOrgX) * this.ldeviceExtX / a), r2;
      }, e.prototype.transformY = function(t) {
        var r2 = 0, a = this.lworldExtY;
        return a != 0 && (r2 = this.ldeviceOrgY + (t - this.lworldOrgY) * this.ldeviceExtY / a), r2;
      }, e.prototype.inverseTransformX = function(t) {
        var r2 = 0, a = this.ldeviceExtX;
        return a != 0 && (r2 = this.lworldOrgX + (t - this.ldeviceOrgX) * this.lworldExtX / a), r2;
      }, e.prototype.inverseTransformY = function(t) {
        var r2 = 0, a = this.ldeviceExtY;
        return a != 0 && (r2 = this.lworldOrgY + (t - this.ldeviceOrgY) * this.lworldExtY / a), r2;
      }, e.prototype.inverseTransformPoint = function(t) {
        var r2 = new n(this.inverseTransformX(t.x), this.inverseTransformY(t.y));
        return r2;
      }, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      function n(i) {
        if (Array.isArray(i)) {
          for (var h = 0, l = Array(i.length); h < i.length; h++) l[h] = i[h];
          return l;
        } else return Array.from(i);
      }
      m(n, "_toConsumableArray");
      var e = v(15), t = v(7), r2 = v(0), a = v(8), u = v(9);
      function o2() {
        e.call(this), this.useSmartIdealEdgeLengthCalculation = t.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.idealEdgeLength = t.DEFAULT_EDGE_LENGTH, this.springConstant = t.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = t.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = t.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = t.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = t.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = t.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.displacementThresholdPerNode = 3 * t.DEFAULT_EDGE_LENGTH / 100, this.coolingFactor = t.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.initialCoolingFactor = t.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.totalDisplacement = 0, this.oldTotalDisplacement = 0, this.maxIterations = t.MAX_ITERATIONS;
      }
      m(o2, "FDLayout"), o2.prototype = Object.create(e.prototype);
      for (var p in e) o2[p] = e[p];
      o2.prototype.initParameters = function() {
        e.prototype.initParameters.call(this, arguments), this.totalIterations = 0, this.notAnimatedIterations = 0, this.useFRGridVariant = t.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION, this.grid = [];
      }, o2.prototype.calcIdealEdgeLengths = function() {
        for (var i, h, l, d, y, T, c = this.getGraphManager().getAllEdges(), D = 0; D < c.length; D++) i = c[D], i.idealLength = this.idealEdgeLength, i.isInterGraph && (l = i.getSource(), d = i.getTarget(), y = i.getSourceInLca().getEstimatedSize(), T = i.getTargetInLca().getEstimatedSize(), this.useSmartIdealEdgeLengthCalculation && (i.idealLength += y + T - 2 * r2.SIMPLE_NODE_SIZE), h = i.getLca().getInclusionTreeDepth(), i.idealLength += t.DEFAULT_EDGE_LENGTH * t.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (l.getInclusionTreeDepth() + d.getInclusionTreeDepth() - 2 * h));
      }, o2.prototype.initSpringEmbedder = function() {
        var i = this.getAllNodes().length;
        this.incremental ? (i > t.ADAPTATION_LOWER_NODE_LIMIT && (this.coolingFactor = Math.max(this.coolingFactor * t.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (i - t.ADAPTATION_LOWER_NODE_LIMIT) / (t.ADAPTATION_UPPER_NODE_LIMIT - t.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - t.COOLING_ADAPTATION_FACTOR))), this.maxNodeDisplacement = t.MAX_NODE_DISPLACEMENT_INCREMENTAL) : (i > t.ADAPTATION_LOWER_NODE_LIMIT ? this.coolingFactor = Math.max(t.COOLING_ADAPTATION_FACTOR, 1 - (i - t.ADAPTATION_LOWER_NODE_LIMIT) / (t.ADAPTATION_UPPER_NODE_LIMIT - t.ADAPTATION_LOWER_NODE_LIMIT) * (1 - t.COOLING_ADAPTATION_FACTOR)) : this.coolingFactor = 1, this.initialCoolingFactor = this.coolingFactor, this.maxNodeDisplacement = t.MAX_NODE_DISPLACEMENT), this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations), this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length, this.repulsionRange = this.calcRepulsionRange();
      }, o2.prototype.calcSpringForces = function() {
        for (var i = this.getAllEdges(), h, l = 0; l < i.length; l++) h = i[l], this.calcSpringForce(h, h.idealLength);
      }, o2.prototype.calcRepulsionForces = function() {
        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, l, d, y, T, c = this.getAllNodes(), D;
        if (this.useFRGridVariant) for (this.totalIterations % t.GRID_CALCULATION_CHECK_PERIOD == 1 && i && this.updateGrid(), D = /* @__PURE__ */ new Set(), l = 0; l < c.length; l++) y = c[l], this.calculateRepulsionForceOfANode(y, D, i, h), D.add(y);
        else for (l = 0; l < c.length; l++) for (y = c[l], d = l + 1; d < c.length; d++) T = c[d], y.getOwner() == T.getOwner() && this.calcRepulsionForce(y, T);
      }, o2.prototype.calcGravitationalForces = function() {
        for (var i, h = this.getAllNodesToApplyGravitation(), l = 0; l < h.length; l++) i = h[l], this.calcGravitationalForce(i);
      }, o2.prototype.moveNodes = function() {
        for (var i = this.getAllNodes(), h, l = 0; l < i.length; l++) h = i[l], h.move();
      }, o2.prototype.calcSpringForce = function(i, h) {
        var l = i.getSource(), d = i.getTarget(), y, T, c, D;
        if (this.uniformLeafNodeSizes && l.getChild() == null && d.getChild() == null) i.updateLengthSimple();
        else if (i.updateLength(), i.isOverlapingSourceAndTarget) return;
        y = i.getLength(), y != 0 && (T = this.springConstant * (y - h), c = T * (i.lengthX / y), D = T * (i.lengthY / y), l.springForceX += c, l.springForceY += D, d.springForceX -= c, d.springForceY -= D);
      }, o2.prototype.calcRepulsionForce = function(i, h) {
        var l = i.getRect(), d = h.getRect(), y = new Array(2), T = new Array(4), c, D, E, O, s, g, f;
        if (l.intersects(d)) {
          a.calcSeparationAmount(l, d, y, t.DEFAULT_EDGE_LENGTH / 2), g = 2 * y[0], f = 2 * y[1];
          var L = i.noOfChildren * h.noOfChildren / (i.noOfChildren + h.noOfChildren);
          i.repulsionForceX -= L * g, i.repulsionForceY -= L * f, h.repulsionForceX += L * g, h.repulsionForceY += L * f;
        } else this.uniformLeafNodeSizes && i.getChild() == null && h.getChild() == null ? (c = d.getCenterX() - l.getCenterX(), D = d.getCenterY() - l.getCenterY()) : (a.getIntersection(l, d, T), c = T[2] - T[0], D = T[3] - T[1]), Math.abs(c) < t.MIN_REPULSION_DIST && (c = u.sign(c) * t.MIN_REPULSION_DIST), Math.abs(D) < t.MIN_REPULSION_DIST && (D = u.sign(D) * t.MIN_REPULSION_DIST), E = c * c + D * D, O = Math.sqrt(E), s = this.repulsionConstant * i.noOfChildren * h.noOfChildren / E, g = s * c / O, f = s * D / O, i.repulsionForceX -= g, i.repulsionForceY -= f, h.repulsionForceX += g, h.repulsionForceY += f;
      }, o2.prototype.calcGravitationalForce = function(i) {
        var h, l, d, y, T, c, D, E;
        h = i.getOwner(), l = (h.getRight() + h.getLeft()) / 2, d = (h.getTop() + h.getBottom()) / 2, y = i.getCenterX() - l, T = i.getCenterY() - d, c = Math.abs(y) + i.getWidth() / 2, D = Math.abs(T) + i.getHeight() / 2, i.getOwner() == this.graphManager.getRoot() ? (E = h.getEstimatedSize() * this.gravityRangeFactor, (c > E || D > E) && (i.gravitationForceX = -this.gravityConstant * y, i.gravitationForceY = -this.gravityConstant * T)) : (E = h.getEstimatedSize() * this.compoundGravityRangeFactor, (c > E || D > E) && (i.gravitationForceX = -this.gravityConstant * y * this.compoundGravityConstant, i.gravitationForceY = -this.gravityConstant * T * this.compoundGravityConstant));
      }, o2.prototype.isConverged = function() {
        var i, h = false;
        return this.totalIterations > this.maxIterations / 3 && (h = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2), i = this.totalDisplacement < this.totalDisplacementThreshold, this.oldTotalDisplacement = this.totalDisplacement, i || h;
      }, o2.prototype.animate = function() {
        this.animationDuringLayout && !this.isSubLayout && (this.notAnimatedIterations == this.animationPeriod ? (this.update(), this.notAnimatedIterations = 0) : this.notAnimatedIterations++);
      }, o2.prototype.calcNoOfChildrenForAllNodes = function() {
        for (var i, h = this.graphManager.getAllNodes(), l = 0; l < h.length; l++) i = h[l], i.noOfChildren = i.getNoOfChildren();
      }, o2.prototype.calcGrid = function(i) {
        var h = 0, l = 0;
        h = parseInt(Math.ceil((i.getRight() - i.getLeft()) / this.repulsionRange)), l = parseInt(Math.ceil((i.getBottom() - i.getTop()) / this.repulsionRange));
        for (var d = new Array(h), y = 0; y < h; y++) d[y] = new Array(l);
        for (var y = 0; y < h; y++) for (var T = 0; T < l; T++) d[y][T] = new Array();
        return d;
      }, o2.prototype.addNodeToGrid = function(i, h, l) {
        var d = 0, y = 0, T = 0, c = 0;
        d = parseInt(Math.floor((i.getRect().x - h) / this.repulsionRange)), y = parseInt(Math.floor((i.getRect().width + i.getRect().x - h) / this.repulsionRange)), T = parseInt(Math.floor((i.getRect().y - l) / this.repulsionRange)), c = parseInt(Math.floor((i.getRect().height + i.getRect().y - l) / this.repulsionRange));
        for (var D = d; D <= y; D++) for (var E = T; E <= c; E++) this.grid[D][E].push(i), i.setGridCoordinates(d, y, T, c);
      }, o2.prototype.updateGrid = function() {
        var i, h, l = this.getAllNodes();
        for (this.grid = this.calcGrid(this.graphManager.getRoot()), i = 0; i < l.length; i++) h = l[i], this.addNodeToGrid(h, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
      }, o2.prototype.calculateRepulsionForceOfANode = function(i, h, l, d) {
        if (this.totalIterations % t.GRID_CALCULATION_CHECK_PERIOD == 1 && l || d) {
          var y = /* @__PURE__ */ new Set();
          i.surrounding = new Array();
          for (var T, c = this.grid, D = i.startX - 1; D < i.finishX + 2; D++) for (var E = i.startY - 1; E < i.finishY + 2; E++) if (!(D < 0 || E < 0 || D >= c.length || E >= c[0].length)) {
            for (var O = 0; O < c[D][E].length; O++) if (T = c[D][E][O], !(i.getOwner() != T.getOwner() || i == T) && !h.has(T) && !y.has(T)) {
              var s = Math.abs(i.getCenterX() - T.getCenterX()) - (i.getWidth() / 2 + T.getWidth() / 2), g = Math.abs(i.getCenterY() - T.getCenterY()) - (i.getHeight() / 2 + T.getHeight() / 2);
              s <= this.repulsionRange && g <= this.repulsionRange && y.add(T);
            }
          }
          i.surrounding = [].concat(n(y));
        }
        for (D = 0; D < i.surrounding.length; D++) this.calcRepulsionForce(i, i.surrounding[D]);
      }, o2.prototype.calcRepulsionRange = function() {
        return 0;
      }, m2.exports = o2;
    }, function(m2, M, v) {
      "use strict";
      var n = v(1), e = v(7);
      function t(a, u, o2) {
        n.call(this, a, u, o2), this.idealLength = e.DEFAULT_EDGE_LENGTH;
      }
      m(t, "FDLayoutEdge"), t.prototype = Object.create(n.prototype);
      for (var r2 in n) t[r2] = n[r2];
      m2.exports = t;
    }, function(m2, M, v) {
      "use strict";
      var n = v(3);
      function e(r2, a, u, o2) {
        n.call(this, r2, a, u, o2), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0, this.startX = 0, this.finishX = 0, this.startY = 0, this.finishY = 0, this.surrounding = [];
      }
      m(e, "FDLayoutNode"), e.prototype = Object.create(n.prototype);
      for (var t in n) e[t] = n[t];
      e.prototype.setGridCoordinates = function(r2, a, u, o2) {
        this.startX = r2, this.finishX = a, this.startY = u, this.finishY = o2;
      }, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      function n(e, t) {
        this.width = 0, this.height = 0, e !== null && t !== null && (this.height = t, this.width = e);
      }
      m(n, "DimensionD"), n.prototype.getWidth = function() {
        return this.width;
      }, n.prototype.setWidth = function(e) {
        this.width = e;
      }, n.prototype.getHeight = function() {
        return this.height;
      }, n.prototype.setHeight = function(e) {
        this.height = e;
      }, m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      var n = v(14);
      function e() {
        this.map = {}, this.keys = [];
      }
      m(e, "HashMap"), e.prototype.put = function(t, r2) {
        var a = n.createID(t);
        this.contains(a) || (this.map[a] = r2, this.keys.push(t));
      }, e.prototype.contains = function(t) {
        var r2 = n.createID(t);
        return this.map[t] != null;
      }, e.prototype.get = function(t) {
        var r2 = n.createID(t);
        return this.map[r2];
      }, e.prototype.keySet = function() {
        return this.keys;
      }, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      var n = v(14);
      function e() {
        this.set = {};
      }
      m(e, "HashSet"), e.prototype.add = function(t) {
        var r2 = n.createID(t);
        this.contains(r2) || (this.set[r2] = t);
      }, e.prototype.remove = function(t) {
        delete this.set[n.createID(t)];
      }, e.prototype.clear = function() {
        this.set = {};
      }, e.prototype.contains = function(t) {
        return this.set[n.createID(t)] == t;
      }, e.prototype.isEmpty = function() {
        return this.size() === 0;
      }, e.prototype.size = function() {
        return Object.keys(this.set).length;
      }, e.prototype.addAllTo = function(t) {
        for (var r2 = Object.keys(this.set), a = r2.length, u = 0; u < a; u++) t.push(this.set[r2[u]]);
      }, e.prototype.size = function() {
        return Object.keys(this.set).length;
      }, e.prototype.addAll = function(t) {
        for (var r2 = t.length, a = 0; a < r2; a++) {
          var u = t[a];
          this.add(u);
        }
      }, m2.exports = e;
    }, function(m2, M, v) {
      "use strict";
      var n = function() {
        function a(u, o2) {
          for (var p = 0; p < o2.length; p++) {
            var i = o2[p];
            i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(u, i.key, i);
          }
        }
        return m(a, "defineProperties"), function(u, o2, p) {
          return o2 && a(u.prototype, o2), p && a(u, p), u;
        };
      }();
      function e(a, u) {
        if (!(a instanceof u)) throw new TypeError("Cannot call a class as a function");
      }
      m(e, "_classCallCheck");
      var t = v(11), r2 = function() {
        function a(u, o2) {
          e(this, a), (o2 !== null || o2 !== void 0) && (this.compareFunction = this._defaultCompareFunction);
          var p = void 0;
          u instanceof t ? p = u.size() : p = u.length, this._quicksort(u, 0, p - 1);
        }
        return m(a, "Quicksort"), n(a, [{ key: "_quicksort", value: m(function(o2, p, i) {
          if (p < i) {
            var h = this._partition(o2, p, i);
            this._quicksort(o2, p, h), this._quicksort(o2, h + 1, i);
          }
        }, "_quicksort") }, { key: "_partition", value: m(function(o2, p, i) {
          for (var h = this._get(o2, p), l = p, d = i; ; ) {
            for (; this.compareFunction(h, this._get(o2, d)); ) d--;
            for (; this.compareFunction(this._get(o2, l), h); ) l++;
            if (l < d) this._swap(o2, l, d), l++, d--;
            else return d;
          }
        }, "_partition") }, { key: "_get", value: m(function(o2, p) {
          return o2 instanceof t ? o2.get_object_at(p) : o2[p];
        }, "_get") }, { key: "_set", value: m(function(o2, p, i) {
          o2 instanceof t ? o2.set_object_at(p, i) : o2[p] = i;
        }, "_set") }, { key: "_swap", value: m(function(o2, p, i) {
          var h = this._get(o2, p);
          this._set(o2, p, this._get(o2, i)), this._set(o2, i, h);
        }, "_swap") }, { key: "_defaultCompareFunction", value: m(function(o2, p) {
          return p > o2;
        }, "_defaultCompareFunction") }]), a;
      }();
      m2.exports = r2;
    }, function(m2, M, v) {
      "use strict";
      var n = function() {
        function r2(a, u) {
          for (var o2 = 0; o2 < u.length; o2++) {
            var p = u[o2];
            p.enumerable = p.enumerable || false, p.configurable = true, "value" in p && (p.writable = true), Object.defineProperty(a, p.key, p);
          }
        }
        return m(r2, "defineProperties"), function(a, u, o2) {
          return u && r2(a.prototype, u), o2 && r2(a, o2), a;
        };
      }();
      function e(r2, a) {
        if (!(r2 instanceof a)) throw new TypeError("Cannot call a class as a function");
      }
      m(e, "_classCallCheck");
      var t = function() {
        function r2(a, u) {
          var o2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
          e(this, r2), this.sequence1 = a, this.sequence2 = u, this.match_score = o2, this.mismatch_penalty = p, this.gap_penalty = i, this.iMax = a.length + 1, this.jMax = u.length + 1, this.grid = new Array(this.iMax);
          for (var h = 0; h < this.iMax; h++) {
            this.grid[h] = new Array(this.jMax);
            for (var l = 0; l < this.jMax; l++) this.grid[h][l] = 0;
          }
          this.tracebackGrid = new Array(this.iMax);
          for (var d = 0; d < this.iMax; d++) {
            this.tracebackGrid[d] = new Array(this.jMax);
            for (var y = 0; y < this.jMax; y++) this.tracebackGrid[d][y] = [null, null, null];
          }
          this.alignments = [], this.score = -1, this.computeGrids();
        }
        return m(r2, "NeedlemanWunsch"), n(r2, [{ key: "getScore", value: m(function() {
          return this.score;
        }, "getScore") }, { key: "getAlignments", value: m(function() {
          return this.alignments;
        }, "getAlignments") }, { key: "computeGrids", value: m(function() {
          for (var u = 1; u < this.jMax; u++) this.grid[0][u] = this.grid[0][u - 1] + this.gap_penalty, this.tracebackGrid[0][u] = [false, false, true];
          for (var o2 = 1; o2 < this.iMax; o2++) this.grid[o2][0] = this.grid[o2 - 1][0] + this.gap_penalty, this.tracebackGrid[o2][0] = [false, true, false];
          for (var p = 1; p < this.iMax; p++) for (var i = 1; i < this.jMax; i++) {
            var h = void 0;
            this.sequence1[p - 1] === this.sequence2[i - 1] ? h = this.grid[p - 1][i - 1] + this.match_score : h = this.grid[p - 1][i - 1] + this.mismatch_penalty;
            var l = this.grid[p - 1][i] + this.gap_penalty, d = this.grid[p][i - 1] + this.gap_penalty, y = [h, l, d], T = this.arrayAllMaxIndexes(y);
            this.grid[p][i] = y[T[0]], this.tracebackGrid[p][i] = [T.includes(0), T.includes(1), T.includes(2)];
          }
          this.score = this.grid[this.iMax - 1][this.jMax - 1];
        }, "computeGrids") }, { key: "alignmentTraceback", value: m(function() {
          var u = [];
          for (u.push({ pos: [this.sequence1.length, this.sequence2.length], seq1: "", seq2: "" }); u[0]; ) {
            var o2 = u[0], p = this.tracebackGrid[o2.pos[0]][o2.pos[1]];
            p[0] && u.push({ pos: [o2.pos[0] - 1, o2.pos[1] - 1], seq1: this.sequence1[o2.pos[0] - 1] + o2.seq1, seq2: this.sequence2[o2.pos[1] - 1] + o2.seq2 }), p[1] && u.push({ pos: [o2.pos[0] - 1, o2.pos[1]], seq1: this.sequence1[o2.pos[0] - 1] + o2.seq1, seq2: "-" + o2.seq2 }), p[2] && u.push({ pos: [o2.pos[0], o2.pos[1] - 1], seq1: "-" + o2.seq1, seq2: this.sequence2[o2.pos[1] - 1] + o2.seq2 }), o2.pos[0] === 0 && o2.pos[1] === 0 && this.alignments.push({ sequence1: o2.seq1, sequence2: o2.seq2 }), u.shift();
          }
          return this.alignments;
        }, "alignmentTraceback") }, { key: "getAllIndexes", value: m(function(u, o2) {
          for (var p = [], i = -1; (i = u.indexOf(o2, i + 1)) !== -1; ) p.push(i);
          return p;
        }, "getAllIndexes") }, { key: "arrayAllMaxIndexes", value: m(function(u) {
          return this.getAllIndexes(u, Math.max.apply(null, u));
        }, "arrayAllMaxIndexes") }]), r2;
      }();
      m2.exports = t;
    }, function(m2, M, v) {
      "use strict";
      var n = m(function() {
      }, "layoutBase");
      n.FDLayout = v(18), n.FDLayoutConstants = v(7), n.FDLayoutEdge = v(19), n.FDLayoutNode = v(20), n.DimensionD = v(21), n.HashMap = v(22), n.HashSet = v(23), n.IGeometry = v(8), n.IMath = v(9), n.Integer = v(10), n.Point = v(12), n.PointD = v(4), n.RandomSeed = v(16), n.RectangleD = v(13), n.Transform = v(17), n.UniqueIDGeneretor = v(14), n.Quicksort = v(24), n.LinkedList = v(11), n.LGraphObject = v(2), n.LGraph = v(5), n.LEdge = v(1), n.LGraphManager = v(6), n.LNode = v(3), n.Layout = v(15), n.LayoutConstants = v(0), n.NeedlemanWunsch = v(25), m2.exports = n;
    }, function(m2, M, v) {
      "use strict";
      function n() {
        this.listeners = [];
      }
      m(n, "Emitter");
      var e = n.prototype;
      e.addListener = function(t, r2) {
        this.listeners.push({ event: t, callback: r2 });
      }, e.removeListener = function(t, r2) {
        for (var a = this.listeners.length; a >= 0; a--) {
          var u = this.listeners[a];
          u.event === t && u.callback === r2 && this.listeners.splice(a, 1);
        }
      }, e.emit = function(t, r2) {
        for (var a = 0; a < this.listeners.length; a++) {
          var u = this.listeners[a];
          t === u.event && u.callback(r2);
        }
      }, m2.exports = n;
    }]);
  });
});
var J = o((Z, z) => {
  "use strict";
  m(function(M, v) {
    typeof Z == "object" && typeof z == "object" ? z.exports = v(q()) : typeof define == "function" && define.amd ? define(["layout-base"], v) : typeof Z == "object" ? Z.coseBase = v(q()) : M.coseBase = v(M.layoutBase);
  }, "webpackUniversalModuleDefinition")(Z, function(m2) {
    return function(M) {
      var v = {};
      function n(e) {
        if (v[e]) return v[e].exports;
        var t = v[e] = { i: e, l: false, exports: {} };
        return M[e].call(t.exports, t, t.exports, n), t.l = true, t.exports;
      }
      return m(n, "__webpack_require__"), n.m = M, n.c = v, n.i = function(e) {
        return e;
      }, n.d = function(e, t, r2) {
        n.o(e, t) || Object.defineProperty(e, t, { configurable: false, enumerable: true, get: r2 });
      }, n.n = function(e) {
        var t = e && e.__esModule ? m(function() {
          return e.default;
        }, "getDefault") : m(function() {
          return e;
        }, "getModuleExports");
        return n.d(t, "a", t), t;
      }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, n.p = "", n(n.s = 7);
    }([function(M, v) {
      M.exports = m2;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).FDLayoutConstants;
      function t() {
      }
      m(t, "CoSEConstants");
      for (var r2 in e) t[r2] = e[r2];
      t.DEFAULT_USE_MULTI_LEVEL_SCALING = false, t.DEFAULT_RADIAL_SEPARATION = e.DEFAULT_EDGE_LENGTH, t.DEFAULT_COMPONENT_SEPERATION = 60, t.TILE = true, t.TILING_PADDING_VERTICAL = 10, t.TILING_PADDING_HORIZONTAL = 10, t.TREE_REDUCTION_ON_INCREMENTAL = false, M.exports = t;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).FDLayoutEdge;
      function t(a, u, o2) {
        e.call(this, a, u, o2);
      }
      m(t, "CoSEEdge"), t.prototype = Object.create(e.prototype);
      for (var r2 in e) t[r2] = e[r2];
      M.exports = t;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).LGraph;
      function t(a, u, o2) {
        e.call(this, a, u, o2);
      }
      m(t, "CoSEGraph"), t.prototype = Object.create(e.prototype);
      for (var r2 in e) t[r2] = e[r2];
      M.exports = t;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).LGraphManager;
      function t(a) {
        e.call(this, a);
      }
      m(t, "CoSEGraphManager"), t.prototype = Object.create(e.prototype);
      for (var r2 in e) t[r2] = e[r2];
      M.exports = t;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).FDLayoutNode, t = n(0).IMath;
      function r2(u, o2, p, i) {
        e.call(this, u, o2, p, i);
      }
      m(r2, "CoSENode"), r2.prototype = Object.create(e.prototype);
      for (var a in e) r2[a] = e[a];
      r2.prototype.move = function() {
        var u = this.graphManager.getLayout();
        this.displacementX = u.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren, this.displacementY = u.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren, Math.abs(this.displacementX) > u.coolingFactor * u.maxNodeDisplacement && (this.displacementX = u.coolingFactor * u.maxNodeDisplacement * t.sign(this.displacementX)), Math.abs(this.displacementY) > u.coolingFactor * u.maxNodeDisplacement && (this.displacementY = u.coolingFactor * u.maxNodeDisplacement * t.sign(this.displacementY)), this.child == null ? this.moveBy(this.displacementX, this.displacementY) : this.child.getNodes().length == 0 ? this.moveBy(this.displacementX, this.displacementY) : this.propogateDisplacementToChildren(this.displacementX, this.displacementY), u.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0;
      }, r2.prototype.propogateDisplacementToChildren = function(u, o2) {
        for (var p = this.getChild().getNodes(), i, h = 0; h < p.length; h++) i = p[h], i.getChild() == null ? (i.moveBy(u, o2), i.displacementX += u, i.displacementY += o2) : i.propogateDisplacementToChildren(u, o2);
      }, r2.prototype.setPred1 = function(u) {
        this.pred1 = u;
      }, r2.prototype.getPred1 = function() {
        return pred1;
      }, r2.prototype.getPred2 = function() {
        return pred2;
      }, r2.prototype.setNext = function(u) {
        this.next = u;
      }, r2.prototype.getNext = function() {
        return next;
      }, r2.prototype.setProcessed = function(u) {
        this.processed = u;
      }, r2.prototype.isProcessed = function() {
        return processed;
      }, M.exports = r2;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).FDLayout, t = n(4), r2 = n(3), a = n(5), u = n(2), o2 = n(1), p = n(0).FDLayoutConstants, i = n(0).LayoutConstants, h = n(0).Point, l = n(0).PointD, d = n(0).Layout, y = n(0).Integer, T = n(0).IGeometry, c = n(0).LGraph, D = n(0).Transform;
      function E() {
        e.call(this), this.toBeTiled = {};
      }
      m(E, "CoSELayout"), E.prototype = Object.create(e.prototype);
      for (var O in e) E[O] = e[O];
      E.prototype.newGraphManager = function() {
        var s = new t(this);
        return this.graphManager = s, s;
      }, E.prototype.newGraph = function(s) {
        return new r2(null, this.graphManager, s);
      }, E.prototype.newNode = function(s) {
        return new a(this.graphManager, s);
      }, E.prototype.newEdge = function(s) {
        return new u(null, null, s);
      }, E.prototype.initParameters = function() {
        e.prototype.initParameters.call(this, arguments), this.isSubLayout || (o2.DEFAULT_EDGE_LENGTH < 10 ? this.idealEdgeLength = 10 : this.idealEdgeLength = o2.DEFAULT_EDGE_LENGTH, this.useSmartIdealEdgeLengthCalculation = o2.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.springConstant = p.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = p.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = p.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = p.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = p.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = p.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.prunedNodesAll = [], this.growTreeIterations = 0, this.afterGrowthIterations = 0, this.isTreeGrowing = false, this.isGrowthFinished = false, this.coolingCycle = 0, this.maxCoolingCycle = this.maxIterations / p.CONVERGENCE_CHECK_PERIOD, this.finalTemperature = p.CONVERGENCE_CHECK_PERIOD / this.maxIterations, this.coolingAdjuster = 1);
      }, E.prototype.layout = function() {
        var s = i.DEFAULT_CREATE_BENDS_AS_NEEDED;
        return s && (this.createBendpoints(), this.graphManager.resetAllEdges()), this.level = 0, this.classicLayout();
      }, E.prototype.classicLayout = function() {
        if (this.nodesWithGravity = this.calculateNodesToApplyGravitationTo(), this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity), this.calcNoOfChildrenForAllNodes(), this.graphManager.calcLowestCommonAncestors(), this.graphManager.calcInclusionTreeDepths(), this.graphManager.getRoot().calcEstimatedSize(), this.calcIdealEdgeLengths(), this.incremental) {
          if (o2.TREE_REDUCTION_ON_INCREMENTAL) {
            this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
            var g = new Set(this.getAllNodes()), f = this.nodesWithGravity.filter(function(I) {
              return g.has(I);
            });
            this.graphManager.setAllNodesToApplyGravitation(f);
          }
        } else {
          var s = this.getFlatForest();
          if (s.length > 0) this.positionNodesRadially(s);
          else {
            this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
            var g = new Set(this.getAllNodes()), f = this.nodesWithGravity.filter(function(L) {
              return g.has(L);
            });
            this.graphManager.setAllNodesToApplyGravitation(f), this.positionNodesRandomly();
          }
        }
        return this.initSpringEmbedder(), this.runSpringEmbedder(), true;
      }, E.prototype.tick = function() {
        if (this.totalIterations++, this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished) if (this.prunedNodesAll.length > 0) this.isTreeGrowing = true;
        else return true;
        if (this.totalIterations % p.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
          if (this.isConverged()) if (this.prunedNodesAll.length > 0) this.isTreeGrowing = true;
          else return true;
          this.coolingCycle++, this.layoutQuality == 0 ? this.coolingAdjuster = this.coolingCycle : this.layoutQuality == 1 && (this.coolingAdjuster = this.coolingCycle / 3), this.coolingFactor = Math.max(this.initialCoolingFactor - Math.pow(this.coolingCycle, Math.log(100 * (this.initialCoolingFactor - this.finalTemperature)) / Math.log(this.maxCoolingCycle)) / 100 * this.coolingAdjuster, this.finalTemperature), this.animationPeriod = Math.ceil(this.initialAnimationPeriod * Math.sqrt(this.coolingFactor));
        }
        if (this.isTreeGrowing) {
          if (this.growTreeIterations % 10 == 0) if (this.prunedNodesAll.length > 0) {
            this.graphManager.updateBounds(), this.updateGrid(), this.growTree(this.prunedNodesAll), this.graphManager.resetAllNodesToApplyGravitation();
            var s = new Set(this.getAllNodes()), g = this.nodesWithGravity.filter(function(N) {
              return s.has(N);
            });
            this.graphManager.setAllNodesToApplyGravitation(g), this.graphManager.updateBounds(), this.updateGrid(), this.coolingFactor = p.DEFAULT_COOLING_FACTOR_INCREMENTAL;
          } else this.isTreeGrowing = false, this.isGrowthFinished = true;
          this.growTreeIterations++;
        }
        if (this.isGrowthFinished) {
          if (this.isConverged()) return true;
          this.afterGrowthIterations % 10 == 0 && (this.graphManager.updateBounds(), this.updateGrid()), this.coolingFactor = p.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100), this.afterGrowthIterations++;
        }
        var f = !this.isTreeGrowing && !this.isGrowthFinished, L = this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished;
        return this.totalDisplacement = 0, this.graphManager.updateBounds(), this.calcSpringForces(), this.calcRepulsionForces(f, L), this.calcGravitationalForces(), this.moveNodes(), this.animate(), false;
      }, E.prototype.getPositionsData = function() {
        for (var s = this.graphManager.getAllNodes(), g = {}, f = 0; f < s.length; f++) {
          var L = s[f].rect, N = s[f].id;
          g[N] = { id: N, x: L.getCenterX(), y: L.getCenterY(), w: L.width, h: L.height };
        }
        return g;
      }, E.prototype.runSpringEmbedder = function() {
        this.initialAnimationPeriod = 25, this.animationPeriod = this.initialAnimationPeriod;
        var s = false;
        if (p.ANIMATE === "during") this.emit("layoutstarted");
        else {
          for (; !s; ) s = this.tick();
          this.graphManager.updateBounds();
        }
      }, E.prototype.calculateNodesToApplyGravitationTo = function() {
        var s = [], g, f = this.graphManager.getGraphs(), L = f.length, N;
        for (N = 0; N < L; N++) g = f[N], g.updateConnected(), g.isConnected || (s = s.concat(g.getNodes()));
        return s;
      }, E.prototype.createBendpoints = function() {
        var s = [];
        s = s.concat(this.graphManager.getAllEdges());
        var g = /* @__PURE__ */ new Set(), f;
        for (f = 0; f < s.length; f++) {
          var L = s[f];
          if (!g.has(L)) {
            var N = L.getSource(), I = L.getTarget();
            if (N == I) L.getBendpoints().push(new l()), L.getBendpoints().push(new l()), this.createDummyNodesForBendpoints(L), g.add(L);
            else {
              var R = [];
              if (R = R.concat(N.getEdgeListToNode(I)), R = R.concat(I.getEdgeListToNode(N)), !g.has(R[0])) {
                if (R.length > 1) {
                  var C;
                  for (C = 0; C < R.length; C++) {
                    var G = R[C];
                    G.getBendpoints().push(new l()), this.createDummyNodesForBendpoints(G);
                  }
                }
                R.forEach(function(S) {
                  g.add(S);
                });
              }
            }
          }
          if (g.size == s.length) break;
        }
      }, E.prototype.positionNodesRadially = function(s) {
        for (var g = new h(0, 0), f = Math.ceil(Math.sqrt(s.length)), L = 0, N = 0, I = 0, R = new l(0, 0), C = 0; C < s.length; C++) {
          C % f == 0 && (I = 0, N = L, C != 0 && (N += o2.DEFAULT_COMPONENT_SEPERATION), L = 0);
          var G = s[C], S = d.findCenterOfTree(G);
          g.x = I, g.y = N, R = E.radialLayout(G, S, g), R.y > L && (L = Math.floor(R.y)), I = Math.floor(R.x + o2.DEFAULT_COMPONENT_SEPERATION);
        }
        this.transform(new l(i.WORLD_CENTER_X - R.x / 2, i.WORLD_CENTER_Y - R.y / 2));
      }, E.radialLayout = function(s, g, f) {
        var L = Math.max(this.maxDiagonalInTree(s), o2.DEFAULT_RADIAL_SEPARATION);
        E.branchRadialLayout(g, null, 0, 359, 0, L);
        var N = c.calculateBounds(s), I = new D();
        I.setDeviceOrgX(N.getMinX()), I.setDeviceOrgY(N.getMinY()), I.setWorldOrgX(f.x), I.setWorldOrgY(f.y);
        for (var R = 0; R < s.length; R++) {
          var C = s[R];
          C.transform(I);
        }
        var G = new l(N.getMaxX(), N.getMaxY());
        return I.inverseTransformPoint(G);
      }, E.branchRadialLayout = function(s, g, f, L, N, I) {
        var R = (L - f + 1) / 2;
        R < 0 && (R += 180);
        var C = (R + f) % 360, G = C * T.TWO_PI / 360, S = Math.cos(G), _ = N * Math.cos(G), F = N * Math.sin(G);
        s.setCenter(_, F);
        var w = [];
        w = w.concat(s.getEdges());
        var x = w.length;
        g != null && x--;
        for (var P = 0, Y = w.length, X, U = s.getEdgesBetween(g); U.length > 1; ) {
          var b = U[0];
          U.splice(0, 1);
          var V = w.indexOf(b);
          V >= 0 && w.splice(V, 1), Y--, x--;
        }
        g != null ? X = (w.indexOf(U[0]) + 1) % Y : X = 0;
        for (var H = Math.abs(L - f) / x, W = X; P != x; W = ++W % Y) {
          var et = w[W].getOtherEnd(s);
          if (et != g) {
            var rt = (f + P * H) % 360, gt = (rt + H) % 360;
            E.branchRadialLayout(et, s, rt, gt, N + I, I), P++;
          }
        }
      }, E.maxDiagonalInTree = function(s) {
        for (var g = y.MIN_VALUE, f = 0; f < s.length; f++) {
          var L = s[f], N = L.getDiagonal();
          N > g && (g = N);
        }
        return g;
      }, E.prototype.calcRepulsionRange = function() {
        return 2 * (this.level + 1) * this.idealEdgeLength;
      }, E.prototype.groupZeroDegreeMembers = function() {
        var s = this, g = {};
        this.memberGroups = {}, this.idToDummyNode = {};
        for (var f = [], L = this.graphManager.getAllNodes(), N = 0; N < L.length; N++) {
          var I = L[N], R = I.getParent();
          this.getNodeDegreeWithChildren(I) === 0 && (R.id == null || !this.getToBeTiled(R)) && f.push(I);
        }
        for (var N = 0; N < f.length; N++) {
          var I = f[N], C = I.getParent().id;
          typeof g[C] > "u" && (g[C] = []), g[C] = g[C].concat(I);
        }
        Object.keys(g).forEach(function(G) {
          if (g[G].length > 1) {
            var S = "DummyCompound_" + G;
            s.memberGroups[S] = g[G];
            var _ = g[G][0].getParent(), F = new a(s.graphManager);
            F.id = S, F.paddingLeft = _.paddingLeft || 0, F.paddingRight = _.paddingRight || 0, F.paddingBottom = _.paddingBottom || 0, F.paddingTop = _.paddingTop || 0, s.idToDummyNode[S] = F;
            var w = s.getGraphManager().add(s.newGraph(), F), x = _.getChild();
            x.add(F);
            for (var P = 0; P < g[G].length; P++) {
              var Y = g[G][P];
              x.remove(Y), w.add(Y);
            }
          }
        });
      }, E.prototype.clearCompounds = function() {
        var s = {}, g = {};
        this.performDFSOnCompounds();
        for (var f = 0; f < this.compoundOrder.length; f++) g[this.compoundOrder[f].id] = this.compoundOrder[f], s[this.compoundOrder[f].id] = [].concat(this.compoundOrder[f].getChild().getNodes()), this.graphManager.remove(this.compoundOrder[f].getChild()), this.compoundOrder[f].child = null;
        this.graphManager.resetAllNodes(), this.tileCompoundMembers(s, g);
      }, E.prototype.clearZeroDegreeMembers = function() {
        var s = this, g = this.tiledZeroDegreePack = [];
        Object.keys(this.memberGroups).forEach(function(f) {
          var L = s.idToDummyNode[f];
          g[f] = s.tileNodes(s.memberGroups[f], L.paddingLeft + L.paddingRight), L.rect.width = g[f].width, L.rect.height = g[f].height;
        });
      }, E.prototype.repopulateCompounds = function() {
        for (var s = this.compoundOrder.length - 1; s >= 0; s--) {
          var g = this.compoundOrder[s], f = g.id, L = g.paddingLeft, N = g.paddingTop;
          this.adjustLocations(this.tiledMemberPack[f], g.rect.x, g.rect.y, L, N);
        }
      }, E.prototype.repopulateZeroDegreeMembers = function() {
        var s = this, g = this.tiledZeroDegreePack;
        Object.keys(g).forEach(function(f) {
          var L = s.idToDummyNode[f], N = L.paddingLeft, I = L.paddingTop;
          s.adjustLocations(g[f], L.rect.x, L.rect.y, N, I);
        });
      }, E.prototype.getToBeTiled = function(s) {
        var g = s.id;
        if (this.toBeTiled[g] != null) return this.toBeTiled[g];
        var f = s.getChild();
        if (f == null) return this.toBeTiled[g] = false, false;
        for (var L = f.getNodes(), N = 0; N < L.length; N++) {
          var I = L[N];
          if (this.getNodeDegree(I) > 0) return this.toBeTiled[g] = false, false;
          if (I.getChild() == null) {
            this.toBeTiled[I.id] = false;
            continue;
          }
          if (!this.getToBeTiled(I)) return this.toBeTiled[g] = false, false;
        }
        return this.toBeTiled[g] = true, true;
      }, E.prototype.getNodeDegree = function(s) {
        for (var g = s.id, f = s.getEdges(), L = 0, N = 0; N < f.length; N++) {
          var I = f[N];
          I.getSource().id !== I.getTarget().id && (L = L + 1);
        }
        return L;
      }, E.prototype.getNodeDegreeWithChildren = function(s) {
        var g = this.getNodeDegree(s);
        if (s.getChild() == null) return g;
        for (var f = s.getChild().getNodes(), L = 0; L < f.length; L++) {
          var N = f[L];
          g += this.getNodeDegreeWithChildren(N);
        }
        return g;
      }, E.prototype.performDFSOnCompounds = function() {
        this.compoundOrder = [], this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
      }, E.prototype.fillCompexOrderByDFS = function(s) {
        for (var g = 0; g < s.length; g++) {
          var f = s[g];
          f.getChild() != null && this.fillCompexOrderByDFS(f.getChild().getNodes()), this.getToBeTiled(f) && this.compoundOrder.push(f);
        }
      }, E.prototype.adjustLocations = function(s, g, f, L, N) {
        g += L, f += N;
        for (var I = g, R = 0; R < s.rows.length; R++) {
          var C = s.rows[R];
          g = I;
          for (var G = 0, S = 0; S < C.length; S++) {
            var _ = C[S];
            _.rect.x = g, _.rect.y = f, g += _.rect.width + s.horizontalPadding, _.rect.height > G && (G = _.rect.height);
          }
          f += G + s.verticalPadding;
        }
      }, E.prototype.tileCompoundMembers = function(s, g) {
        var f = this;
        this.tiledMemberPack = [], Object.keys(s).forEach(function(L) {
          var N = g[L];
          f.tiledMemberPack[L] = f.tileNodes(s[L], N.paddingLeft + N.paddingRight), N.rect.width = f.tiledMemberPack[L].width, N.rect.height = f.tiledMemberPack[L].height;
        });
      }, E.prototype.tileNodes = function(s, g) {
        var f = o2.TILING_PADDING_VERTICAL, L = o2.TILING_PADDING_HORIZONTAL, N = { rows: [], rowWidth: [], rowHeight: [], width: 0, height: g, verticalPadding: f, horizontalPadding: L };
        s.sort(function(C, G) {
          return C.rect.width * C.rect.height > G.rect.width * G.rect.height ? -1 : C.rect.width * C.rect.height < G.rect.width * G.rect.height ? 1 : 0;
        });
        for (var I = 0; I < s.length; I++) {
          var R = s[I];
          N.rows.length == 0 ? this.insertNodeToRow(N, R, 0, g) : this.canAddHorizontal(N, R.rect.width, R.rect.height) ? this.insertNodeToRow(N, R, this.getShortestRowIndex(N), g) : this.insertNodeToRow(N, R, N.rows.length, g), this.shiftToLastRow(N);
        }
        return N;
      }, E.prototype.insertNodeToRow = function(s, g, f, L) {
        var N = L;
        if (f == s.rows.length) {
          var I = [];
          s.rows.push(I), s.rowWidth.push(N), s.rowHeight.push(0);
        }
        var R = s.rowWidth[f] + g.rect.width;
        s.rows[f].length > 0 && (R += s.horizontalPadding), s.rowWidth[f] = R, s.width < R && (s.width = R);
        var C = g.rect.height;
        f > 0 && (C += s.verticalPadding);
        var G = 0;
        C > s.rowHeight[f] && (G = s.rowHeight[f], s.rowHeight[f] = C, G = s.rowHeight[f] - G), s.height += G, s.rows[f].push(g);
      }, E.prototype.getShortestRowIndex = function(s) {
        for (var g = -1, f = Number.MAX_VALUE, L = 0; L < s.rows.length; L++) s.rowWidth[L] < f && (g = L, f = s.rowWidth[L]);
        return g;
      }, E.prototype.getLongestRowIndex = function(s) {
        for (var g = -1, f = Number.MIN_VALUE, L = 0; L < s.rows.length; L++) s.rowWidth[L] > f && (g = L, f = s.rowWidth[L]);
        return g;
      }, E.prototype.canAddHorizontal = function(s, g, f) {
        var L = this.getShortestRowIndex(s);
        if (L < 0) return true;
        var N = s.rowWidth[L];
        if (N + s.horizontalPadding + g <= s.width) return true;
        var I = 0;
        s.rowHeight[L] < f && L > 0 && (I = f + s.verticalPadding - s.rowHeight[L]);
        var R;
        s.width - N >= g + s.horizontalPadding ? R = (s.height + I) / (N + g + s.horizontalPadding) : R = (s.height + I) / s.width, I = f + s.verticalPadding;
        var C;
        return s.width < g ? C = (s.height + I) / g : C = (s.height + I) / s.width, C < 1 && (C = 1 / C), R < 1 && (R = 1 / R), R < C;
      }, E.prototype.shiftToLastRow = function(s) {
        var g = this.getLongestRowIndex(s), f = s.rowWidth.length - 1, L = s.rows[g], N = L[L.length - 1], I = N.width + s.horizontalPadding;
        if (s.width - s.rowWidth[f] > I && g != f) {
          L.splice(-1, 1), s.rows[f].push(N), s.rowWidth[g] = s.rowWidth[g] - I, s.rowWidth[f] = s.rowWidth[f] + I, s.width = s.rowWidth[instance.getLongestRowIndex(s)];
          for (var R = Number.MIN_VALUE, C = 0; C < L.length; C++) L[C].height > R && (R = L[C].height);
          g > 0 && (R += s.verticalPadding);
          var G = s.rowHeight[g] + s.rowHeight[f];
          s.rowHeight[g] = R, s.rowHeight[f] < N.height + s.verticalPadding && (s.rowHeight[f] = N.height + s.verticalPadding);
          var S = s.rowHeight[g] + s.rowHeight[f];
          s.height += S - G, this.shiftToLastRow(s);
        }
      }, E.prototype.tilingPreLayout = function() {
        o2.TILE && (this.groupZeroDegreeMembers(), this.clearCompounds(), this.clearZeroDegreeMembers());
      }, E.prototype.tilingPostLayout = function() {
        o2.TILE && (this.repopulateZeroDegreeMembers(), this.repopulateCompounds());
      }, E.prototype.reduceTrees = function() {
        for (var s = [], g = true, f; g; ) {
          var L = this.graphManager.getAllNodes(), N = [];
          g = false;
          for (var I = 0; I < L.length; I++) f = L[I], f.getEdges().length == 1 && !f.getEdges()[0].isInterGraph && f.getChild() == null && (N.push([f, f.getEdges()[0], f.getOwner()]), g = true);
          if (g == true) {
            for (var R = [], C = 0; C < N.length; C++) N[C][0].getEdges().length == 1 && (R.push(N[C]), N[C][0].getOwner().remove(N[C][0]));
            s.push(R), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
          }
        }
        this.prunedNodesAll = s;
      }, E.prototype.growTree = function(s) {
        for (var g = s.length, f = s[g - 1], L, N = 0; N < f.length; N++) L = f[N], this.findPlaceforPrunedNode(L), L[2].add(L[0]), L[2].add(L[1], L[1].source, L[1].target);
        s.splice(s.length - 1, 1), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
      }, E.prototype.findPlaceforPrunedNode = function(s) {
        var g, f, L = s[0];
        L == s[1].source ? f = s[1].target : f = s[1].source;
        var N = f.startX, I = f.finishX, R = f.startY, C = f.finishY, G = 0, S = 0, _ = 0, F = 0, w = [G, _, S, F];
        if (R > 0) for (var x = N; x <= I; x++) w[0] += this.grid[x][R - 1].length + this.grid[x][R].length - 1;
        if (I < this.grid.length - 1) for (var x = R; x <= C; x++) w[1] += this.grid[I + 1][x].length + this.grid[I][x].length - 1;
        if (C < this.grid[0].length - 1) for (var x = N; x <= I; x++) w[2] += this.grid[x][C + 1].length + this.grid[x][C].length - 1;
        if (N > 0) for (var x = R; x <= C; x++) w[3] += this.grid[N - 1][x].length + this.grid[N][x].length - 1;
        for (var P = y.MAX_VALUE, Y, X, U = 0; U < w.length; U++) w[U] < P ? (P = w[U], Y = 1, X = U) : w[U] == P && Y++;
        if (Y == 3 && P == 0) w[0] == 0 && w[1] == 0 && w[2] == 0 ? g = 1 : w[0] == 0 && w[1] == 0 && w[3] == 0 ? g = 0 : w[0] == 0 && w[2] == 0 && w[3] == 0 ? g = 3 : w[1] == 0 && w[2] == 0 && w[3] == 0 && (g = 2);
        else if (Y == 2 && P == 0) {
          var b = Math.floor(Math.random() * 2);
          w[0] == 0 && w[1] == 0 ? b == 0 ? g = 0 : g = 1 : w[0] == 0 && w[2] == 0 ? b == 0 ? g = 0 : g = 2 : w[0] == 0 && w[3] == 0 ? b == 0 ? g = 0 : g = 3 : w[1] == 0 && w[2] == 0 ? b == 0 ? g = 1 : g = 2 : w[1] == 0 && w[3] == 0 ? b == 0 ? g = 1 : g = 3 : b == 0 ? g = 2 : g = 3;
        } else if (Y == 4 && P == 0) {
          var b = Math.floor(Math.random() * 4);
          g = b;
        } else g = X;
        g == 0 ? L.setCenter(f.getCenterX(), f.getCenterY() - f.getHeight() / 2 - p.DEFAULT_EDGE_LENGTH - L.getHeight() / 2) : g == 1 ? L.setCenter(f.getCenterX() + f.getWidth() / 2 + p.DEFAULT_EDGE_LENGTH + L.getWidth() / 2, f.getCenterY()) : g == 2 ? L.setCenter(f.getCenterX(), f.getCenterY() + f.getHeight() / 2 + p.DEFAULT_EDGE_LENGTH + L.getHeight() / 2) : L.setCenter(f.getCenterX() - f.getWidth() / 2 - p.DEFAULT_EDGE_LENGTH - L.getWidth() / 2, f.getCenterY());
      }, M.exports = E;
    }, function(M, v, n) {
      "use strict";
      var e = {};
      e.layoutBase = n(0), e.CoSEConstants = n(1), e.CoSEEdge = n(2), e.CoSEGraph = n(3), e.CoSEGraphManager = n(4), e.CoSELayout = n(6), e.CoSENode = n(5), M.exports = e;
    }]);
  });
});
var nt = o((j, tt) => {
  "use strict";
  m(function(M, v) {
    typeof j == "object" && typeof tt == "object" ? tt.exports = v(J()) : typeof define == "function" && define.amd ? define(["cose-base"], v) : typeof j == "object" ? j.cytoscapeCoseBilkent = v(J()) : M.cytoscapeCoseBilkent = v(M.coseBase);
  }, "webpackUniversalModuleDefinition")(j, function(m2) {
    return function(M) {
      var v = {};
      function n(e) {
        if (v[e]) return v[e].exports;
        var t = v[e] = { i: e, l: false, exports: {} };
        return M[e].call(t.exports, t, t.exports, n), t.l = true, t.exports;
      }
      return m(n, "__webpack_require__"), n.m = M, n.c = v, n.i = function(e) {
        return e;
      }, n.d = function(e, t, r2) {
        n.o(e, t) || Object.defineProperty(e, t, { configurable: false, enumerable: true, get: r2 });
      }, n.n = function(e) {
        var t = e && e.__esModule ? m(function() {
          return e.default;
        }, "getDefault") : m(function() {
          return e;
        }, "getModuleExports");
        return n.d(t, "a", t), t;
      }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, n.p = "", n(n.s = 1);
    }([function(M, v) {
      M.exports = m2;
    }, function(M, v, n) {
      "use strict";
      var e = n(0).layoutBase.LayoutConstants, t = n(0).layoutBase.FDLayoutConstants, r2 = n(0).CoSEConstants, a = n(0).CoSELayout, u = n(0).CoSENode, o2 = n(0).layoutBase.PointD, p = n(0).layoutBase.DimensionD, i = { ready: m(function() {
      }, "ready"), stop: m(function() {
      }, "stop"), quality: "default", nodeDimensionsIncludeLabels: false, refresh: 30, fit: true, padding: 10, randomize: true, nodeRepulsion: 4500, idealEdgeLength: 50, edgeElasticity: 0.45, nestingFactor: 0.1, gravity: 0.25, numIter: 2500, tile: true, animate: "end", animationDuration: 500, tilingPaddingVertical: 10, tilingPaddingHorizontal: 10, gravityRangeCompound: 1.5, gravityCompound: 1, gravityRange: 3.8, initialEnergyOnIncremental: 0.5 };
      function h(T, c) {
        var D = {};
        for (var E in T) D[E] = T[E];
        for (var E in c) D[E] = c[E];
        return D;
      }
      m(h, "extend");
      function l(T) {
        this.options = h(i, T), d(this.options);
      }
      m(l, "_CoSELayout");
      var d = m(function(c) {
        c.nodeRepulsion != null && (r2.DEFAULT_REPULSION_STRENGTH = t.DEFAULT_REPULSION_STRENGTH = c.nodeRepulsion), c.idealEdgeLength != null && (r2.DEFAULT_EDGE_LENGTH = t.DEFAULT_EDGE_LENGTH = c.idealEdgeLength), c.edgeElasticity != null && (r2.DEFAULT_SPRING_STRENGTH = t.DEFAULT_SPRING_STRENGTH = c.edgeElasticity), c.nestingFactor != null && (r2.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = t.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = c.nestingFactor), c.gravity != null && (r2.DEFAULT_GRAVITY_STRENGTH = t.DEFAULT_GRAVITY_STRENGTH = c.gravity), c.numIter != null && (r2.MAX_ITERATIONS = t.MAX_ITERATIONS = c.numIter), c.gravityRange != null && (r2.DEFAULT_GRAVITY_RANGE_FACTOR = t.DEFAULT_GRAVITY_RANGE_FACTOR = c.gravityRange), c.gravityCompound != null && (r2.DEFAULT_COMPOUND_GRAVITY_STRENGTH = t.DEFAULT_COMPOUND_GRAVITY_STRENGTH = c.gravityCompound), c.gravityRangeCompound != null && (r2.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = t.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = c.gravityRangeCompound), c.initialEnergyOnIncremental != null && (r2.DEFAULT_COOLING_FACTOR_INCREMENTAL = t.DEFAULT_COOLING_FACTOR_INCREMENTAL = c.initialEnergyOnIncremental), c.quality == "draft" ? e.QUALITY = 0 : c.quality == "proof" ? e.QUALITY = 2 : e.QUALITY = 1, r2.NODE_DIMENSIONS_INCLUDE_LABELS = t.NODE_DIMENSIONS_INCLUDE_LABELS = e.NODE_DIMENSIONS_INCLUDE_LABELS = c.nodeDimensionsIncludeLabels, r2.DEFAULT_INCREMENTAL = t.DEFAULT_INCREMENTAL = e.DEFAULT_INCREMENTAL = !c.randomize, r2.ANIMATE = t.ANIMATE = e.ANIMATE = c.animate, r2.TILE = c.tile, r2.TILING_PADDING_VERTICAL = typeof c.tilingPaddingVertical == "function" ? c.tilingPaddingVertical.call() : c.tilingPaddingVertical, r2.TILING_PADDING_HORIZONTAL = typeof c.tilingPaddingHorizontal == "function" ? c.tilingPaddingHorizontal.call() : c.tilingPaddingHorizontal;
      }, "getUserOptions");
      l.prototype.run = function() {
        var T, c, D = this.options, E = this.idToLNode = {}, O = this.layout = new a(), s = this;
        s.stopped = false, this.cy = this.options.cy, this.cy.trigger({ type: "layoutstart", layout: this });
        var g = O.newGraphManager();
        this.gm = g;
        var f = this.options.eles.nodes(), L = this.options.eles.edges();
        this.root = g.addRoot(), this.processChildrenList(this.root, this.getTopMostNodes(f), O);
        for (var N = 0; N < L.length; N++) {
          var I = L[N], R = this.idToLNode[I.data("source")], C = this.idToLNode[I.data("target")];
          if (R !== C && R.getEdgesBetween(C).length == 0) {
            var G = g.add(O.newEdge(), R, C);
            G.id = I.id();
          }
        }
        var S = m(function(w, x) {
          typeof w == "number" && (w = x);
          var P = w.data("id"), Y = s.idToLNode[P];
          return { x: Y.getRect().getCenterX(), y: Y.getRect().getCenterY() };
        }, "getPositions"), _ = m(function F() {
          for (var w = m(function() {
            D.fit && D.cy.fit(D.eles, D.padding), T || (T = true, s.cy.one("layoutready", D.ready), s.cy.trigger({ type: "layoutready", layout: s }));
          }, "afterReposition"), x = s.options.refresh, P, Y = 0; Y < x && !P; Y++) P = s.stopped || s.layout.tick();
          if (P) {
            O.checkLayoutSuccess() && !O.isSubLayout && O.doPostLayout(), O.tilingPostLayout && O.tilingPostLayout(), O.isLayoutFinished = true, s.options.eles.nodes().positions(S), w(), s.cy.one("layoutstop", s.options.stop), s.cy.trigger({ type: "layoutstop", layout: s }), c && cancelAnimationFrame(c), T = false;
            return;
          }
          var X = s.layout.getPositionsData();
          D.eles.nodes().positions(function(U, b) {
            if (typeof U == "number" && (U = b), !U.isParent()) {
              for (var V = U.id(), H = X[V], W = U; H == null && (H = X[W.data("parent")] || X["DummyCompound_" + W.data("parent")], X[V] = H, W = W.parent()[0], W != null); ) ;
              return H != null ? { x: H.x, y: H.y } : { x: U.position("x"), y: U.position("y") };
            }
          }), w(), c = requestAnimationFrame(F);
        }, "iterateAnimated");
        return O.addListener("layoutstarted", function() {
          s.options.animate === "during" && (c = requestAnimationFrame(_));
        }), O.runLayout(), this.options.animate !== "during" && (s.options.eles.nodes().not(":parent").layoutPositions(s, s.options, S), T = false), this;
      }, l.prototype.getTopMostNodes = function(T) {
        for (var c = {}, D = 0; D < T.length; D++) c[T[D].id()] = true;
        var E = T.filter(function(O, s) {
          typeof O == "number" && (O = s);
          for (var g = O.parent()[0]; g != null; ) {
            if (c[g.id()]) return false;
            g = g.parent()[0];
          }
          return true;
        });
        return E;
      }, l.prototype.processChildrenList = function(T, c, D) {
        for (var E = c.length, O = 0; O < E; O++) {
          var s = c[O], g = s.children(), f, L = s.layoutDimensions({ nodeDimensionsIncludeLabels: this.options.nodeDimensionsIncludeLabels });
          if (s.outerWidth() != null && s.outerHeight() != null ? f = T.add(new u(D.graphManager, new o2(s.position("x") - L.w / 2, s.position("y") - L.h / 2), new p(parseFloat(L.w), parseFloat(L.h)))) : f = T.add(new u(this.graphManager)), f.id = s.data("id"), f.paddingLeft = parseInt(s.css("padding")), f.paddingTop = parseInt(s.css("padding")), f.paddingRight = parseInt(s.css("padding")), f.paddingBottom = parseInt(s.css("padding")), this.options.nodeDimensionsIncludeLabels && s.isParent()) {
            var N = s.boundingBox({ includeLabels: true, includeNodes: false }).w, I = s.boundingBox({ includeLabels: true, includeNodes: false }).h, R = s.css("text-halign");
            f.labelWidth = N, f.labelHeight = I, f.labelPos = R;
          }
          if (this.idToLNode[s.data("id")] = f, isNaN(f.rect.x) && (f.rect.x = 0), isNaN(f.rect.y) && (f.rect.y = 0), g != null && g.length > 0) {
            var C;
            C = D.getGraphManager().add(D.newGraph(), f), this.processChildrenList(C, g, D);
          }
        }
      }, l.prototype.stop = function() {
        return this.stopped = true, this;
      };
      var y = m(function(c) {
        c("layout", "cose-bilkent", l);
      }, "register");
      typeof cytoscape < "u" && y(cytoscape), M.exports = y;
    }]);
  });
});
var ot = r(nt(), 1);
ra.use(ot.default);
function ct(m2, M) {
  m2.forEach((v) => {
    let n = { id: v.id, labelText: v.label, height: v.height, width: v.width, padding: v.padding ?? 0 };
    Object.keys(v).forEach((e) => {
      ["id", "label", "height", "width", "padding", "x", "y"].includes(e) || (n[e] = v[e]);
    }), M.add({ group: "nodes", data: n, position: { x: v.x ?? 0, y: v.y ?? 0 } });
  });
}
m(ct, "addNodes");
function pt2(m2, M) {
  m2.forEach((v) => {
    let n = { id: v.id, source: v.start, target: v.end };
    Object.keys(v).forEach((e) => {
      ["id", "start", "end"].includes(e) || (n[e] = v[e]);
    }), M.add({ group: "edges", data: n });
  });
}
m(pt2, "addEdges");
function st(m2) {
  return new Promise((M) => {
    let v = ia("body").append("div").attr("id", "cy").attr("style", "display:none"), n = ra({ container: document.getElementById("cy"), style: [{ selector: "edge", style: { "curve-style": "bezier" } }] });
    v.remove(), ct(m2.nodes, n), pt2(m2.edges, n), n.nodes().forEach(function(t) {
      t.layoutDimensions = () => {
        let r2 = t.data();
        return { w: r2.width, h: r2.height };
      };
    });
    let e = { name: "cose-bilkent", quality: "proof", styleEnabled: false, animate: false };
    n.layout(e).run(), n.ready((t) => {
      pt.info("Cytoscape ready", t), M(n);
    });
  });
}
m(st, "createCytoscapeInstance");
function at(m2) {
  return m2.nodes().map((M) => {
    let v = M.data(), n = M.position(), e = { id: v.id, x: n.x, y: n.y };
    return Object.keys(v).forEach((t) => {
      t !== "id" && (e[t] = v[t]);
    }), e;
  });
}
m(at, "extractPositionedNodes");
function ht(m2) {
  return m2.edges().map((M) => {
    let v = M.data(), n = M._private.rscratch, e = { id: v.id, source: v.source, target: v.target, startX: n.startX, startY: n.startY, midX: n.midX, midY: n.midY, endX: n.endX, endY: n.endY };
    return Object.keys(v).forEach((t) => {
      ["id", "source", "target"].includes(t) || (e[t] = v[t]);
    }), e;
  });
}
m(ht, "extractPositionedEdges");
async function lt(m2, M) {
  pt.debug("Starting cose-bilkent layout algorithm");
  try {
    dt(m2);
    let v = await st(m2), n = at(v), e = ht(v);
    return pt.debug(`Layout completed: ${n.length} nodes, ${e.length} edges`), { nodes: n, edges: e };
  } catch (v) {
    throw pt.error("Error in cose-bilkent layout algorithm:", v), v;
  }
}
m(lt, "executeCoseBilkentLayout");
function dt(m2) {
  if (!m2) throw new Error("Layout data is required");
  if (!m2.config) throw new Error("Configuration is required in layout data");
  if (!m2.rootNode) throw new Error("Root node is required");
  if (!m2.nodes || !Array.isArray(m2.nodes)) throw new Error("No nodes found in layout data");
  if (!Array.isArray(m2.edges)) throw new Error("Edges array is required in layout data");
  return true;
}
m(dt, "validateLayoutData");
var ut = m(async (m2, M, { insertCluster: v, insertEdge: n, insertEdgeLabel: e, insertMarkers: t, insertNode: r2, log: a, positionEdgeLabel: u }, { algorithm: o2 }) => {
  let p = {}, i = {}, h = M.select("g");
  t(h, m2.markers, m2.type, m2.diagramId);
  let l = h.insert("g").attr("class", "subgraphs"), d = h.insert("g").attr("class", "edgePaths"), y = h.insert("g").attr("class", "edgeLabels"), T = h.insert("g").attr("class", "nodes");
  a.debug("Inserting nodes into DOM for dimension calculation"), await Promise.all(m2.nodes.map(async (E) => {
    if (E.isGroup) {
      let O = { ...E };
      i[E.id] = O, p[E.id] = O, await v(l, E);
    } else {
      let O = { ...E };
      p[E.id] = O;
      let s = await r2(T, E, { config: m2.config, dir: m2.direction || "TB" }), g = s.node().getBBox();
      O.width = g.width, O.height = g.height, O.domId = s, a.debug(`Node ${E.id} dimensions: ${g.width}x${g.height}`);
    }
  })), a.debug("Running cose-bilkent layout algorithm");
  let c = { ...m2, nodes: m2.nodes.map((E) => {
    let O = p[E.id];
    return { ...E, width: O.width, height: O.height };
  }) }, D = await lt(c, m2.config);
  a.debug("Positioning nodes based on layout results"), D.nodes.forEach((E) => {
    let O = p[E.id];
    (O == null ? void 0 : O.domId) && (O.domId.attr("transform", `translate(${E.x}, ${E.y})`), O.x = E.x, O.y = E.y, a.debug(`Positioned node ${O.id} at center (${E.x}, ${E.y})`));
  }), D.edges.forEach((E) => {
    let O = m2.edges.find((s) => s.id === E.id);
    O && (O.points = [{ x: E.startX, y: E.startY }, { x: E.midX, y: E.midY }, { x: E.endX, y: E.endY }]);
  }), a.debug("Inserting and positioning edges"), await Promise.all(m2.edges.map(async (E) => {
    let O = await e(y, E), s = p[E.start ?? ""], g = p[E.end ?? ""];
    if (s && g) {
      let f = D.edges.find((L) => L.id === E.id);
      if (f) {
        a.debug("APA01 positionedEdge", f);
        let L = { ...E }, N = n(d, L, i, m2.type, s, g, m2.diagramId);
        u(L, N);
      } else {
        let L = { ...E, points: [{ x: s.x || 0, y: s.y || 0 }, { x: g.x || 0, y: g.y || 0 }] }, N = n(d, L, i, m2.type, s, g, m2.diagramId);
        u(L, N);
      }
    }
  })), a.debug("Cose-bilkent rendering completed");
}, "render");
var xt = ut;
export {
  xt as render
};
//# sourceMappingURL=cose-bilkent-PNC4W37J-PUAFFJYG.js.map

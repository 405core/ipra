import {
  $,
  B,
  G,
  K,
  M,
  N,
  X,
  Yt,
  d,
  j,
  lt,
  y
} from "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-QU3B7NT4.mjs
var C = Yt(Object.keys, Object);
var T = C;
var V = Object.prototype;
var D = V.hasOwnProperty;
function K2(r) {
  if (!K(r)) return T(r);
  var t = [];
  for (var o in Object(r)) D.call(r, o) && o != "constructor" && t.push(o);
  return t;
}
m(K2, "baseKeys");
var O = K2;
var N2 = j(d, "DataView");
var s = N2;
var W = j(d, "Promise");
var c = W;
var B2 = j(d, "Set");
var g = B2;
var z = j(d, "WeakMap");
var u = z;
var M2 = "[object Map]";
var E = "[object Object]";
var h = "[object Promise]";
var x = "[object Set]";
var k = "[object WeakMap]";
var l = "[object DataView]";
var G2 = lt(s);
var L = lt(B);
var q = lt(c);
var F = lt(g);
var H = lt(u);
var p = y;
(s && p(new s(new ArrayBuffer(1))) != l || B && p(new B()) != M2 || c && p(c.resolve()) != h || g && p(new g()) != x || u && p(new u()) != k) && (p = m(function(r) {
  var t = y(r), o = t == E ? r.constructor : void 0, w = o ? lt(o) : "";
  if (w) switch (w) {
    case G2:
      return l;
    case L:
      return M2;
    case q:
      return h;
    case F:
      return x;
    case H:
      return k;
  }
  return t;
}, "getTag"));
var A = p;
var I = "[object Map]";
var J = "[object Set]";
var Q = Object.prototype;
var R = Q.hasOwnProperty;
function U(r) {
  if (r == null) return true;
  if (M(r) && (N(r) || typeof r == "string" || typeof r.splice == "function" || $(r) || X(r) || G(r))) return !r.length;
  var t = A(r);
  if (t == I || t == J) return !r.size;
  if (K(r)) return !O(r).length;
  for (var o in r) if (R.call(r, o)) return false;
  return true;
}
m(U, "isEmpty");
var Cr = U;

export {
  O,
  g,
  A,
  Cr
};
//# sourceMappingURL=chunk-TIOLQL7Q.js.map

import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-35NHKZTR.mjs
var d = m((t, r) => {
  if (r) return "translate(" + -t.width / 2 + ", " + -t.height / 2 + ")";
  let c = t.x ?? 0, e = t.y ?? 0;
  return "translate(" + -(c + t.width / 2) + ", " + -(e + t.height / 2) + ")";
}, "computeLabelTransform");
var s = { aggregation: 17.25, extension: 17.25, composition: 17.25, dependency: 6, lollipop: 13.5, arrow_point: 4, arrow_barb: 0, arrow_barb_neo: 5.5 };
var T = { arrow_point: 4, arrow_cross: 12.5, arrow_circle: 12.5 };
function b(t, r) {
  if (t === void 0 || r === void 0) return { angle: 0, deltaX: 0, deltaY: 0 };
  t = n(t), r = n(r);
  let [c, e] = [t.x, t.y], [o, i] = [r.x, r.y], l = o - c, p = i - e;
  return { angle: Math.atan(p / l), deltaX: l, deltaY: p };
}
m(b, "calculateDeltaAndAngle");
var n = m((t) => Array.isArray(t) ? { x: t[0], y: t[1] } : t, "pointTransformer");
var E = m((t) => ({ x: m(function(r, c, e) {
  let o = 0, i = n(e[0]).x < n(e[e.length - 1]).x ? "left" : "right";
  if (c === 0 && Object.hasOwn(s, t.arrowTypeStart)) {
    let { angle: a, deltaX: m2 } = b(e[0], e[1]);
    o = s[t.arrowTypeStart] * Math.cos(a) * (m2 >= 0 ? 1 : -1);
  } else if (c === e.length - 1 && Object.hasOwn(s, t.arrowTypeEnd)) {
    let { angle: a, deltaX: m2 } = b(e[e.length - 1], e[e.length - 2]);
    o = s[t.arrowTypeEnd] * Math.cos(a) * (m2 >= 0 ? 1 : -1);
  }
  let l = Math.abs(n(r).x - n(e[e.length - 1]).x), p = Math.abs(n(r).y - n(e[e.length - 1]).y), u = Math.abs(n(r).x - n(e[0]).x), x = Math.abs(n(r).y - n(e[0]).y), y = s[t.arrowTypeStart], h = s[t.arrowTypeEnd], g = 1;
  if (l < h && l > 0 && p < h) {
    let a = h + g - l;
    a *= i === "right" ? -1 : 1, o -= a;
  }
  if (u < y && u > 0 && x < y) {
    let a = y + g - u;
    a *= i === "right" ? -1 : 1, o += a;
  }
  return n(r).x + o;
}, "x"), y: m(function(r, c, e) {
  let o = 0, i = n(e[0]).y < n(e[e.length - 1]).y ? "down" : "up";
  if (c === 0 && Object.hasOwn(s, t.arrowTypeStart)) {
    let { angle: a, deltaY: m2 } = b(e[0], e[1]);
    o = s[t.arrowTypeStart] * Math.abs(Math.sin(a)) * (m2 >= 0 ? 1 : -1);
  } else if (c === e.length - 1 && Object.hasOwn(s, t.arrowTypeEnd)) {
    let { angle: a, deltaY: m2 } = b(e[e.length - 1], e[e.length - 2]);
    o = s[t.arrowTypeEnd] * Math.abs(Math.sin(a)) * (m2 >= 0 ? 1 : -1);
  }
  let l = Math.abs(n(r).y - n(e[e.length - 1]).y), p = Math.abs(n(r).x - n(e[e.length - 1]).x), u = Math.abs(n(r).y - n(e[0]).y), x = Math.abs(n(r).x - n(e[0]).x), y = s[t.arrowTypeStart], h = s[t.arrowTypeEnd], g = 1;
  if (l < h && l > 0 && p < h) {
    let a = h + g - l;
    a *= i === "up" ? -1 : 1, o -= a;
  }
  if (u < y && u > 0 && x < y) {
    let a = y + g - u;
    a *= i === "up" ? -1 : 1, o += a;
  }
  return n(r).y + o;
}, "y") }), "getLineFunctionsWithOffset");

export {
  d,
  s,
  T,
  E
};
//# sourceMappingURL=chunk-LK7THHH6.js.map

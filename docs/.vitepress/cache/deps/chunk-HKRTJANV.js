import {
  is
} from "./chunk-HPIGS4CQ.js";
import {
  pt
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-RWUO3TPN.mjs
var y = m((t, e, o, n) => {
  t.attr("class", o);
  let { width: r, height: m2, x: s, y: b } = w(t, e);
  is(t, m2, r, n);
  let u = x(s, b, r, m2, e);
  t.attr("viewBox", u), pt.debug(`viewBox configured: ${u} with padding: ${e}`);
}, "setupViewPortForSVG");
var w = m((t, e) => {
  var _a;
  let o = ((_a = t.node()) == null ? void 0 : _a.getBBox()) || { width: 0, height: 0, x: 0, y: 0 };
  return { width: o.width + e * 2, height: o.height + e * 2, x: o.x, y: o.y };
}, "calculateDimensionsWithPadding");
var x = m((t, e, o, n, r) => `${t - r} ${e - r} ${o} ${n}`, "createViewBox");

export {
  y
};
//# sourceMappingURL=chunk-HKRTJANV.js.map

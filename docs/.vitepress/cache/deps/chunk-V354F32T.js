import {
  $r,
  Or,
  Sr,
  Yr
} from "./chunk-QDSNXXJA.js";
import {
  Cr,
  G,
  Wg
} from "./chunk-OB6FDEYX.js";
import {
  dt
} from "./chunk-DZJA65GQ.js";
import {
  Cn,
  Ot
} from "./chunk-HPIGS4CQ.js";
import {
  pt
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-XEIFE4KY.mjs
var w = { common: Cn, getConfig: Ot, insertCluster: Cr, insertEdge: $r, insertEdgeLabel: Sr, insertMarkers: Yr, insertNode: Wg, interpolateToCurve: dt, labelHelper: G, log: pt, positionEdgeLabel: Or };
var a = {};
var H = m((t) => {
  for (let r of t) a[r.name] = r;
}, "registerLayoutLoaders");
var S = m(() => {
  H([{ name: "dagre", loader: m(async () => await import("./dagre-E77IOHMT-GLVUPNT2.js"), "loader") }, { name: "cose-bilkent", loader: m(async () => await import("./cose-bilkent-PNC4W37J-PUAFFJYG.js"), "loader") }]);
}, "registerDefaultLayoutLoaders");
S();
var P = m(async (t, r) => {
  if (!(t.layoutAlgorithm in a)) throw new Error(`Unknown layout algorithm: ${t.layoutAlgorithm}`);
  if (t.diagramId) for (let e of t.nodes) {
    let A = e.domId || e.id;
    e.domId = `${t.diagramId}-${A}`;
  }
  let n = a[t.layoutAlgorithm], x = await n.loader(), { theme: d, themeVariables: D } = t.config, { useGradient: F, gradientStart: $, gradientStop: I } = D, s = r.attr("id");
  if (r.append("defs").append("filter").attr("id", `${s}-drop-shadow`).attr("height", "130%").attr("width", "130%").append("feDropShadow").attr("dx", "4").attr("dy", "4").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${(d == null ? void 0 : d.includes("dark")) ? "#FFFFFF" : "#000000"}`), r.append("defs").append("filter").attr("id", `${s}-drop-shadow-small`).attr("height", "150%").attr("width", "150%").append("feDropShadow").attr("dx", "2").attr("dy", "2").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${(d == null ? void 0 : d.includes("dark")) ? "#FFFFFF" : "#000000"}`), F) {
    let e = r.append("linearGradient").attr("id", r.attr("id") + "-gradient").attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    e.append("svg:stop").attr("offset", "0%").attr("stop-color", $).attr("stop-opacity", 1), e.append("svg:stop").attr("offset", "100%").attr("stop-color", I).attr("stop-opacity", 1);
  }
  return x.render(t, r, w, { algorithm: n.algorithm });
}, "render");
var M = m((t = "", { fallback: r = "dagre" } = {}) => {
  if (t in a) return t;
  if (r in a) return pt.warn(`Layout algorithm ${t} is not registered. Using ${r} as fallback.`), r;
  throw new Error(`Both layout algorithms ${t} and ${r} are not registered.`);
}, "getRegisteredLayoutAlgorithm");

export {
  H,
  P,
  M
};
//# sourceMappingURL=chunk-V354F32T.js.map

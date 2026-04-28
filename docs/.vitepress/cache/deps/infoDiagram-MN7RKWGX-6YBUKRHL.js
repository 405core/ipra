import {
  d as d2
} from "./chunk-PG2EBXFX.js";
import "./chunk-G7CRMAJP.js";
import "./chunk-EUSCIRG4.js";
import "./chunk-KDDFP6PK.js";
import "./chunk-ZJVYFLWS.js";
import "./chunk-CGNTNBTA.js";
import "./chunk-CCKZNSTL.js";
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  is
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

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/infoDiagram-MN7RKWGX.mjs
var a = { parse: m(async (t) => {
  let e = await d2("info", t);
  pt.debug(e);
}, "parse") };
var g = { version: "11.14.0" };
var c = m(() => g.version, "getVersion");
var m2 = { getVersion: c };
var D = m((t, e, d3) => {
  pt.debug(`rendering info diagram
` + t);
  let i = d(e);
  is(i, 100, 400, true), i.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${d3}`);
}, "draw");
var f = { draw: D };
var z = { parser: a, db: m2, renderer: f };
export {
  z as diagram
};
//# sourceMappingURL=infoDiagram-MN7RKWGX-6YBUKRHL.js.map

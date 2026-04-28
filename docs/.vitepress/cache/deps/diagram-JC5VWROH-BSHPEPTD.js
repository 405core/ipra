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
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  as,
  es,
  hs,
  is,
  ls,
  ns,
  oo,
  os,
  ss
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

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/diagram-JC5VWROH.mjs
var O = oo.packet;
var _a;
var y = (_a = class {
  constructor() {
    this.packet = [];
    this.setAccTitle = es;
    this.getAccTitle = ss;
    this.setDiagramTitle = hs;
    this.getDiagramTitle = ns;
    this.getAccDescription = ls;
    this.setAccDescription = as;
  }
  getConfig() {
    let t = Lt({ ...O, ...Ot().packet });
    return t.showBits && (t.paddingY += 10), t;
  }
  getPacket() {
    return this.packet;
  }
  pushWord(t) {
    t.length > 0 && this.packet.push(t);
  }
  clear() {
    os(), this.packet = [];
  }
}, m(_a, "PacketDB"), _a);
var _ = 1e4;
var V = m((e, t) => {
  c(e, t);
  let a = -1, o = [], s = 1, { bitsPerRow: l } = t.getConfig();
  for (let { start: r, end: n, bits: d3, label: p } of e.blocks) {
    if (r !== void 0 && n !== void 0 && n < r) throw new Error(`Packet block ${r} - ${n} is invalid. End must be greater than start.`);
    if (r ?? (r = a + 1), r !== a + 1) throw new Error(`Packet block ${r} - ${n ?? r} is not contiguous. It should start from ${a + 1}.`);
    if (d3 === 0) throw new Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);
    for (n ?? (n = r + (d3 ?? 1) - 1), d3 ?? (d3 = n - r + 1), a = n, pt.debug(`Packet block ${r} - ${a} with label ${p}`); o.length <= l + 1 && t.getPacket().length < _; ) {
      let [m2, i] = q({ start: r, end: n, bits: d3, label: p }, s, l);
      if (o.push(m2), m2.end + 1 === s * l && (t.pushWord(o), o = [], s++), !i) break;
      ({ start: r, end: n, bits: d3, label: p } = i);
    }
  }
  t.pushWord(o);
}, "populate");
var q = m((e, t, a) => {
  if (e.start === void 0) throw new Error("start should have been set during first phase");
  if (e.end === void 0) throw new Error("end should have been set during first phase");
  if (e.start > e.end) throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);
  if (e.end + 1 <= t * a) return [e, void 0];
  let o = t * a - 1, s = t * a;
  return [{ start: e.start, end: o, label: e.label, bits: o - e.start }, { start: s, end: e.end, label: e.label, bits: e.end - s }];
}, "getNextFittingBlock");
var D = { parser: { yy: void 0 }, parse: m(async (e) => {
  var _a2;
  let t = await d2("packet", e), a = (_a2 = D.parser) == null ? void 0 : _a2.yy;
  if (!(a instanceof y)) throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");
  pt.debug(t), V(t, a);
}, "parse") };
var L = m((e, t, a, o) => {
  let s = o.db, l = s.getConfig(), { rowHeight: r, paddingY: n, bitWidth: d3, bitsPerRow: p } = l, m2 = s.getPacket(), i = s.getDiagramTitle(), g = r + n, f = g * (m2.length + 1) - (i ? 0 : r), k = d3 * p + 2, u = d(t);
  u.attr("viewBox", `0 0 ${k} ${f}`), is(u, f, k, l.useMaxWidth);
  for (let [G, R] of m2.entries()) M(u, R, G, l);
  u.append("text").text(i).attr("x", k / 2).attr("y", f - g / 2).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("class", "packetTitle");
}, "draw");
var M = m((e, t, a, { rowHeight: o, paddingX: s, paddingY: l, bitWidth: r, bitsPerRow: n, showBits: d3 }) => {
  let p = e.append("g"), m2 = a * (o + l) + l;
  for (let i of t) {
    let g = i.start % n * r + 1, f = (i.end - i.start + 1) * r - s;
    if (p.append("rect").attr("x", g).attr("y", m2).attr("width", f).attr("height", o).attr("class", "packetBlock"), p.append("text").attr("x", g + f / 2).attr("y", m2 + o / 2).attr("class", "packetLabel").attr("dominant-baseline", "middle").attr("text-anchor", "middle").text(i.label), !d3) continue;
    let k = i.end === i.start, u = m2 - 2;
    p.append("text").attr("x", g + (k ? f / 2 : 0)).attr("y", u).attr("class", "packetByte start").attr("dominant-baseline", "auto").attr("text-anchor", k ? "middle" : "start").text(i.start), k || p.append("text").attr("x", g + f).attr("y", u).attr("class", "packetByte end").attr("dominant-baseline", "auto").attr("text-anchor", "end").text(i.end);
  }
}, "drawWord");
var F = { draw: L };
var N = { byteFontSize: "10px", startByteColor: "black", endByteColor: "black", labelColor: "black", labelFontSize: "12px", titleColor: "black", titleFontSize: "14px", blockStrokeColor: "black", blockStrokeWidth: "1", blockFillColor: "#efefef" };
var z = m(({ packet: e } = {}) => {
  let t = Lt(N, e);
  return `
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`;
}, "styles");
var gt = { parser: D, get db() {
  return new y();
}, renderer: F, styles: z };
export {
  gt as diagram
};
//# sourceMappingURL=diagram-JC5VWROH-BSHPEPTD.js.map

import {
  X
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-DKKBVRCY.mjs
var i = {};
var m2 = { info: X(async () => {
  let { createInfoServices: e } = await import("./info-OMHHGYJF-BF2H5H6G-64RB4QX3.js"), r = e().Info.parser.LangiumParser;
  i.info = r;
}, "info"), packet: X(async () => {
  let { createPacketServices: e } = await import("./packet-4T2RLAQJ-EV4IVRXR-5B7AMRIK.js"), r = e().Packet.parser.LangiumParser;
  i.packet = r;
}, "packet"), pie: X(async () => {
  let { createPieServices: e } = await import("./pie-ZZUOXDRM-N23DN5KN-WFBIN3V6.js"), r = e().Pie.parser.LangiumParser;
  i.pie = r;
}, "pie"), treeView: X(async () => {
  let { createTreeViewServices: e } = await import("./treeView-SZITEDCU-5DXDK3XO-SM2NYDDD.js"), r = e().TreeView.parser.LangiumParser;
  i.treeView = r;
}, "treeView"), architecture: X(async () => {
  let { createArchitectureServices: e } = await import("./architecture-YZFGNWBL-S5CXDPWN-N2LX222R.js"), r = e().Architecture.parser.LangiumParser;
  i.architecture = r;
}, "architecture"), gitGraph: X(async () => {
  let { createGitGraphServices: e } = await import("./gitGraph-7Q5UKJZL-54BCDZD5-KCS6VQM4.js"), r = e().GitGraph.parser.LangiumParser;
  i.gitGraph = r;
}, "gitGraph"), radar: X(async () => {
  let { createRadarServices: e } = await import("./radar-PYXPWWZC-P6TP7ZYP-VCVPJJWH.js"), r = e().Radar.parser.LangiumParser;
  i.radar = r;
}, "radar"), treemap: X(async () => {
  let { createTreemapServices: e } = await import("./treemap-W4RFUUIX-WYLRDWKO-WUPKOH6G.js"), r = e().Treemap.parser.LangiumParser;
  i.treemap = r;
}, "treemap"), wardley: X(async () => {
  let { createWardleyServices: e } = await import("./wardley-RL74JXVD-BCRCBASE-2S3ED3WN.js"), r = e().Wardley.parser.LangiumParser;
  i.wardley = r;
}, "wardley") };
async function d(e, r) {
  let o = m2[e];
  if (!o) throw new Error(`Unknown diagram type: ${e}`);
  i[e] || await o();
  let s = i[e].parse(r);
  if (s.lexerErrors.length > 0 || s.parserErrors.length > 0) throw new p(s);
  return s.value;
}
m(d, "parse");
X(d, "parse");
var _a;
var p = (_a = class extends Error {
  constructor(e) {
    let r = e.lexerErrors.map((a) => {
      let s = a.line !== void 0 && !isNaN(a.line) ? a.line : "?", c = a.column !== void 0 && !isNaN(a.column) ? a.column : "?";
      return `Lexer error on line ${s}, column ${c}: ${a.message}`;
    }).join(`
`), o = e.parserErrors.map((a) => {
      let s = a.token.startLine !== void 0 && !isNaN(a.token.startLine) ? a.token.startLine : "?", c = a.token.startColumn !== void 0 && !isNaN(a.token.startColumn) ? a.token.startColumn : "?";
      return `Parse error on line ${s}, column ${c}: ${a.message}`;
    }).join(`
`);
    super(`Parsing failed: ${r} ${o}`), this.result = e;
  }
}, m(_a, "MermaidParseError"), X(_a, "MermaidParseError"), _a);

export {
  d
};
//# sourceMappingURL=chunk-PG2EBXFX.js.map

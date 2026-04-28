import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  g0,
  iS,
  sS
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-6NTNNK5N.mjs
var _a;
var C = (_a = class extends sS {
  constructor() {
    super(["pie", "showData"]);
  }
}, m(_a, "PieTokenBuilder"), X(_a, "PieTokenBuilder"), _a);
var _a2;
var P = (_a2 = class extends iS {
  runCustomConverter(a, r, i) {
    if (a.name === "PIE_SECTION_LABEL") return r.replace(/"/g, "").trim();
  }
}, m(_a2, "PieValueConverter"), X(_a2, "PieValueConverter"), _a2);
var p = { parser: { TokenBuilder: X(() => new C(), "TokenBuilder"), ValueConverter: X(() => new P(), "ValueConverter") } };
function M(a = Xm) {
  let r = ac(Km(a), f0), i = ac(Wm({ shared: r }), g0, p);
  return r.ServiceRegistry.register(i), { shared: r, Pie: i };
}
m(M, "createPieServices");
X(M, "createPieServices");

export {
  p,
  M
};
//# sourceMappingURL=chunk-2ZIBIWL3.js.map

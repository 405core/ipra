import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  d0,
  f0,
  iS,
  sS
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-XGPFEOL4.mjs
var _a;
var C = (_a = class extends sS {
  constructor() {
    super(["architecture"]);
  }
}, m(_a, "ArchitectureTokenBuilder"), X(_a, "ArchitectureTokenBuilder"), _a);
var _a2;
var v = (_a2 = class extends iS {
  runCustomConverter(c, r, i) {
    if (c.name === "ARCH_ICON") return r.replace(/[()]/g, "").trim();
    if (c.name === "ARCH_TEXT_ICON") return r.replace(/["()]/g, "");
    if (c.name === "ARCH_TITLE") {
      let e = r.replace(/^\[|]$/g, "").trim();
      return (e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'")) && (e = e.slice(1, -1), e = e.replace(/\\"/g, '"').replace(/\\'/g, "'")), e.trim();
    }
  }
}, m(_a2, "ArchitectureValueConverter"), X(_a2, "ArchitectureValueConverter"), _a2);
var f = { parser: { TokenBuilder: X(() => new C(), "TokenBuilder"), ValueConverter: X(() => new v(), "ValueConverter") } };
function p(c = Xm) {
  let r = ac(Km(c), f0), i = ac(Wm({ shared: r }), d0, f);
  return r.ServiceRegistry.register(i), { shared: r, Architecture: i };
}
m(p, "createArchitectureServices");
X(p, "createArchitectureServices");

export {
  f,
  p
};
//# sourceMappingURL=chunk-EUSCIRG4.js.map

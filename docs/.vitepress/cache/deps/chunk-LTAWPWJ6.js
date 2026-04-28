import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  m0,
  sS,
  v0
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-TYMNRAUI.mjs
var _a;
var v = (_a = class extends sS {
  constructor() {
    super(["info", "showInfo"]);
  }
}, m(_a, "InfoTokenBuilder"), X(_a, "InfoTokenBuilder"), _a);
var I = { parser: { TokenBuilder: X(() => new v(), "TokenBuilder"), ValueConverter: X(() => new v0(), "ValueConverter") } };
function M(f = Xm) {
  let r = ac(Km(f), f0), t = ac(Wm({ shared: r }), m0, I);
  return r.ServiceRegistry.register(t), { shared: r, Info: t };
}
m(M, "createInfoServices");
X(M, "createInfoServices");

export {
  I,
  M
};
//# sourceMappingURL=chunk-LTAWPWJ6.js.map

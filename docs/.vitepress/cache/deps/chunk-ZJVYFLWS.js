import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  sS,
  v0,
  y0
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-W7ZLLLMY.mjs
var _a;
var R = (_a = class extends sS {
  constructor() {
    super(["radar-beta"]);
  }
}, m(_a, "RadarTokenBuilder"), X(_a, "RadarTokenBuilder"), _a);
var M = { parser: { TokenBuilder: X(() => new R(), "TokenBuilder"), ValueConverter: X(() => new v0(), "ValueConverter") } };
function p(m2 = Xm) {
  let r = ac(Km(m2), f0), o = ac(Wm({ shared: r }), y0, M);
  return r.ServiceRegistry.register(o), { shared: r, Radar: o };
}
m(p, "createRadarServices");
X(p, "createRadarServices");

export {
  M,
  p
};
//# sourceMappingURL=chunk-ZJVYFLWS.js.map

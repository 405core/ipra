import {
  $0,
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  iS
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-DJ7UZH7F.mjs
var _a;
var v = (_a = class extends iS {
  runCustomConverter(t, e, a) {
    switch (t.name.toUpperCase()) {
      case "LINK_LABEL":
        return e.substring(1).trim();
      default:
        return;
    }
  }
}, m(_a, "WardleyValueConverter"), X(_a, "WardleyValueConverter"), _a);
var y = { parser: { ValueConverter: X(() => new v(), "ValueConverter") } };
function C(t = Xm) {
  let e = ac(Km(t), f0), a = ac(Wm({ shared: e }), $0, y);
  return e.ServiceRegistry.register(a), { shared: e, Wardley: a };
}
m(C, "createWardleyServices");
X(C, "createWardleyServices");

export {
  y,
  C
};
//# sourceMappingURL=chunk-CCKZNSTL.js.map

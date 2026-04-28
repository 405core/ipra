import {
  Km,
  T0,
  Wm,
  X,
  Xm,
  ac,
  f0,
  iS,
  sS
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-WSB5WSVC.mjs
var _a;
var v = (_a = class extends sS {
  constructor() {
    super(["treemap"]);
  }
}, m(_a, "TreemapTokenBuilder"), X(_a, "TreemapTokenBuilder"), _a);
var g = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/;
var _a2;
var h = (_a2 = class extends iS {
  runCustomConverter(r, e, t) {
    if (r.name === "NUMBER2") return parseFloat(e.replace(/,/g, ""));
    if (r.name === "SEPARATOR") return e.substring(1, e.length - 1);
    if (r.name === "STRING2") return e.substring(1, e.length - 1);
    if (r.name === "INDENTATION") return e.length;
    if (r.name === "ClassDef") {
      if (typeof e != "string") return e;
      let a = g.exec(e);
      if (a) return { $type: "ClassDefStatement", className: a[1], styleText: a[2] || void 0 };
    }
  }
}, m(_a2, "TreemapValueConverter"), X(_a2, "TreemapValueConverter"), _a2);
function f(r) {
  let e = r.validation.TreemapValidator, t = r.validation.ValidationRegistry;
  if (t) {
    let a = { Treemap: e.checkSingleRoot.bind(e) };
    t.register(a, e);
  }
}
m(f, "registerValidationChecks");
X(f, "registerValidationChecks");
var _a3;
var C = (_a3 = class {
  checkSingleRoot(r, e) {
    let t;
    for (let a of r.TreemapRows) a.item && (t === void 0 && a.indent === void 0 ? t = 0 : a.indent === void 0 ? e("error", "Multiple root nodes are not allowed in a treemap.", { node: a, property: "item" }) : t !== void 0 && t >= parseInt(a.indent, 10) && e("error", "Multiple root nodes are not allowed in a treemap.", { node: a, property: "item" }));
  }
}, m(_a3, "TreemapValidator"), X(_a3, "TreemapValidator"), _a3);
var V = { parser: { TokenBuilder: X(() => new v(), "TokenBuilder"), ValueConverter: X(() => new h(), "ValueConverter") }, validation: { TreemapValidator: X(() => new C(), "TreemapValidator") } };
function M(r = Xm) {
  let e = ac(Km(r), f0), t = ac(Wm({ shared: e }), T0, V);
  return e.ServiceRegistry.register(t), f(t), { shared: e, Treemap: t };
}
m(M, "createTreemapServices");
X(M, "createTreemapServices");

export {
  V,
  M
};
//# sourceMappingURL=chunk-CGNTNBTA.js.map

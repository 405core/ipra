import {
  Km,
  R0,
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

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-RNJOYNJ4.mjs
var _a;
var V = (_a = class extends iS {
  runCustomConverter(t, e, i) {
    if (t.name === "INDENTATION") return (e == null ? void 0 : e.length) || 0;
    if (t.name === "STRING2") return e.substring(1, e.length - 1);
  }
}, m(_a, "TreeViewValueConverter"), X(_a, "TreeViewValueConverter"), _a);
var _a2;
var v = (_a2 = class extends sS {
  constructor() {
    super(["treeView-beta"]);
  }
}, m(_a2, "TreeViewTokenBuilder"), X(_a2, "TreeViewTokenBuilder"), _a2);
var w = { parser: { TokenBuilder: X(() => new v(), "TokenBuilder"), ValueConverter: X(() => new V(), "ValueConverter") } };
function C(t = Xm) {
  let e = ac(Km(t), f0), i = ac(Wm({ shared: e }), R0, w);
  return e.ServiceRegistry.register(i), { shared: e, TreeView: i };
}
m(C, "createTreeViewServices");
X(C, "createTreeViewServices");

export {
  w,
  C
};
//# sourceMappingURL=chunk-G7CRMAJP.js.map

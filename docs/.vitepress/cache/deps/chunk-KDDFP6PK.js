import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  p0,
  sS,
  v0
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-A34GCYZU.mjs
var _a;
var m2 = (_a = class extends sS {
  constructor() {
    super(["gitGraph"]);
  }
}, m(_a, "GitGraphTokenBuilder"), X(_a, "GitGraphTokenBuilder"), _a);
var h = { parser: { TokenBuilder: X(() => new m2(), "TokenBuilder"), ValueConverter: X(() => new v0(), "ValueConverter") } };
function v(c = Xm) {
  let r = ac(Km(c), f0), i = ac(Wm({ shared: r }), p0, h);
  return r.ServiceRegistry.register(i), { shared: r, GitGraph: i };
}
m(v, "createGitGraphServices");
X(v, "createGitGraphServices");

export {
  h,
  v
};
//# sourceMappingURL=chunk-KDDFP6PK.js.map

import {
  Km,
  Wm,
  X,
  Xm,
  ac,
  f0,
  h0,
  sS,
  v0
} from "./chunk-UOHFH3CX.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-DU5LTGQ6.mjs
var _a;
var v = (_a = class extends sS {
  constructor() {
    super(["packet"]);
  }
}, m(_a, "PacketTokenBuilder"), X(_a, "PacketTokenBuilder"), _a);
var p = { parser: { TokenBuilder: X(() => new v(), "TokenBuilder"), ValueConverter: X(() => new v0(), "ValueConverter") } };
function M(k = Xm) {
  let r = ac(Km(k), f0), o = ac(Wm({ shared: r }), h0, p);
  return r.ServiceRegistry.register(o), { shared: r, Packet: o };
}
m(M, "createPacketServices");
X(M, "createPacketServices");

export {
  p,
  M
};
//# sourceMappingURL=chunk-VNU3COQH.js.map

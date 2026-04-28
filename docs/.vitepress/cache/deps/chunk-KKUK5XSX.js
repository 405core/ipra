import {
  $
} from "./chunk-DZJA65GQ.js";
import {
  oo,
  qo
} from "./chunk-HPIGS4CQ.js";
import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-SRFB55UJ.mjs
var d = m(({ flowchart: n }) => {
  var _a, _b;
  let i = ((_a = n == null ? void 0 : n.subGraphTitleMargin) == null ? void 0 : _a.top) ?? 0, e = ((_b = n == null ? void 0 : n.subGraphTitleMargin) == null ? void 0 : _b.bottom) ?? 0, r = i + e;
  return { subGraphTitleTopMargin: i, subGraphTitleBottomMargin: e, subGraphTitleTotalMargin: r };
}, "getSubGraphTitleMargins");
async function G(n, i) {
  let e = n.getElementsByTagName("img");
  if (!e || e.length === 0) return;
  let r = i.replace(/<img[^>]*>/g, "").trim() === "";
  await Promise.all([...e].map((t) => new Promise((g) => {
    function a() {
      if (t.style.display = "flex", t.style.flexDirection = "column", r) {
        let c = qo().fontSize ? qo().fontSize : window.getComputedStyle(document.body).fontSize, u = 5, [f = oo.fontSize] = $(c), l = f * u + "px";
        t.style.minWidth = l, t.style.maxWidth = l;
      } else t.style.width = "100%";
      g(t);
    }
    m(a, "setupImage"), setTimeout(() => {
      t.complete && a();
    }), t.addEventListener("error", a), t.addEventListener("load", a);
  })));
}
m(G, "configureLabelImages");

export {
  d,
  G
};
//# sourceMappingURL=chunk-KKUK5XSX.js.map

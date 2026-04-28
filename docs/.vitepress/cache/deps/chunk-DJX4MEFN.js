import {
  m,
  o
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-XBXGYYE5.mjs
var g = o((e) => {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: true });
  e.BLANK_URL = e.relativeFirstCharacters = e.whitespaceEscapeCharsRegex = e.urlSchemeRegex = e.ctrlCharactersRegex = e.htmlCtrlEntityRegex = e.htmlEntitiesRegex = e.invalidProtocolRegex = void 0;
  e.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
  e.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
  e.htmlCtrlEntityRegex = /&(newline|tab);/gi;
  e.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
  e.urlSchemeRegex = /^.+(:|&colon;)/gim;
  e.whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
  e.relativeFirstCharacters = [".", "/"];
  e.BLANK_URL = "about:blank";
});
var f = o((h) => {
  "use strict";
  Object.defineProperty(h, "__esModule", { value: true });
  h.sanitizeUrl = void 0;
  var t = g();
  function v(r) {
    return t.relativeFirstCharacters.indexOf(r[0]) > -1;
  }
  m(v, "isRelativeUrlWithoutProtocol");
  function x(r) {
    var c = r.replace(t.ctrlCharactersRegex, "");
    return c.replace(t.htmlEntitiesRegex, function(a, i) {
      return String.fromCharCode(i);
    });
  }
  m(x, "decodeHtmlCharacters");
  function C(r) {
    return URL.canParse(r);
  }
  m(C, "isValidUrl");
  function d(r) {
    try {
      return decodeURIComponent(r);
    } catch {
      return r;
    }
  }
  m(d, "decodeURI");
  function p(r) {
    if (!r) return t.BLANK_URL;
    var c, a = d(r.trim());
    do
      a = x(a).replace(t.htmlCtrlEntityRegex, "").replace(t.ctrlCharactersRegex, "").replace(t.whitespaceEscapeCharsRegex, "").trim(), a = d(a), c = a.match(t.ctrlCharactersRegex) || a.match(t.htmlEntitiesRegex) || a.match(t.htmlCtrlEntityRegex) || a.match(t.whitespaceEscapeCharsRegex);
    while (c && c.length > 0);
    var i = a;
    if (!i) return t.BLANK_URL;
    if (v(i)) return i;
    var u = i.trimStart(), m2 = u.match(t.urlSchemeRegex);
    if (!m2) return i;
    var l = m2[0].toLowerCase().trim();
    if (t.invalidProtocolRegex.test(l)) return t.BLANK_URL;
    var s = u.replace(/\\/g, "/");
    if (l === "mailto:" || l.includes("://")) return s;
    if (l === "http:" || l === "https:") {
      if (!C(s)) return t.BLANK_URL;
      var o2 = new URL(s);
      return o2.protocol = o2.protocol.toLowerCase(), o2.hostname = o2.hostname.toLowerCase(), o2.toString();
    }
    return s;
  }
  m(p, "sanitizeUrl");
  h.sanitizeUrl = p;
});

export {
  f
};
//# sourceMappingURL=chunk-DJX4MEFN.js.map

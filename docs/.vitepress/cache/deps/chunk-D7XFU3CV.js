import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-7RZVMHOQ.mjs
function Ps(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var t = 0, a = Array(e); t < e; t++) a[t] = r[t];
  return a;
}
m(Ps, "_arrayLikeToArray");
function rc(r) {
  if (Array.isArray(r)) return r;
}
m(rc, "_arrayWithHoles");
function tc(r) {
  if (Array.isArray(r)) return Ps(r);
}
m(tc, "_arrayWithoutHoles");
function gt(r, e) {
  if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function");
}
m(gt, "_classCallCheck");
function ac(r, e) {
  for (var t = 0; t < e.length; t++) {
    var a = e[t];
    a.enumerable = a.enumerable || false, a.configurable = true, "value" in a && (a.writable = true), Object.defineProperty(r, ev(a.key), a);
  }
}
m(ac, "_defineProperties");
function pt(r, e, t) {
  return e && ac(r.prototype, e), Object.defineProperty(r, "prototype", { writable: false }), r;
}
m(pt, "_createClass");
function Dr(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = Ys(r)) || e) {
      t && (r = t);
      var a = 0, n = m(function() {
      }, "F");
      return { s: n, n: m(function() {
        return a >= r.length ? { done: true } : { done: false, value: r[a++] };
      }, "n"), e: m(function(l) {
        throw l;
      }, "e"), f: n };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i, s = true, o = false;
  return { s: m(function() {
    t = t.call(r);
  }, "s"), n: m(function() {
    var l = t.next();
    return s = l.done, l;
  }, "n"), e: m(function(l) {
    o = true, i = l;
  }, "e"), f: m(function() {
    try {
      s || t.return == null || t.return();
    } finally {
      if (o) throw i;
    }
  }, "f") };
}
m(Dr, "_createForOfIteratorHelper");
function jl(r, e, t) {
  return (e = ev(e)) in r ? Object.defineProperty(r, e, { value: t, enumerable: true, configurable: true, writable: true }) : r[e] = t, r;
}
m(jl, "_defineProperty$1");
function nc(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
m(nc, "_iterableToArray");
function ic(r, e) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var a, n, i, s, o = [], l = true, u = false;
    try {
      if (i = (t = t.call(r)).next, e === 0) {
        if (Object(t) !== t) return;
        l = false;
      } else for (; !(l = (a = i.call(t)).done) && (o.push(a.value), o.length !== e); l = true) ;
    } catch (f) {
      u = true, n = f;
    } finally {
      try {
        if (!l && t.return != null && (s = t.return(), Object(s) !== s)) return;
      } finally {
        if (u) throw n;
      }
    }
    return o;
  }
}
m(ic, "_iterableToArrayLimit");
function sc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
m(sc, "_nonIterableRest");
function oc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
m(oc, "_nonIterableSpread");
function je(r, e) {
  return rc(r) || ic(r, e) || Ys(r, e) || sc();
}
m(je, "_slicedToArray");
function bn(r) {
  return tc(r) || nc(r) || Ys(r) || oc();
}
m(bn, "_toConsumableArray");
function uc(r, e) {
  if (typeof r != "object" || !r) return r;
  var t = r[Symbol.toPrimitive];
  if (t !== void 0) {
    var a = t.call(r, e);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(r);
}
m(uc, "_toPrimitive");
function ev(r) {
  var e = uc(r, "string");
  return typeof e == "symbol" ? e : e + "";
}
m(ev, "_toPropertyKey");
function nr(r) {
  "@babel/helpers - typeof";
  return nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, nr(r);
}
m(nr, "_typeof");
function Ys(r, e) {
  if (r) {
    if (typeof r == "string") return Ps(r, e);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Ps(r, e) : void 0;
  }
}
m(Ys, "_unsupportedIterableToArray");
var tr = typeof window > "u" ? null : window;
var So = tr ? tr.navigator : null;
tr && tr.document;
var lc = nr("");
var rv = nr({});
var vc = nr(function() {
});
var fc = typeof HTMLElement > "u" ? "undefined" : nr(HTMLElement);
var Ia = m(function(e) {
  return e && e.instanceString && Ke(e.instanceString) ? e.instanceString() : null;
}, "instanceStr");
var pe = m(function(e) {
  return e != null && nr(e) == lc;
}, "string");
var Ke = m(function(e) {
  return e != null && nr(e) === vc;
}, "fn");
var Ge = m(function(e) {
  return !Br(e) && (Array.isArray ? Array.isArray(e) : e != null && e instanceof Array);
}, "array");
var Ie = m(function(e) {
  return e != null && nr(e) === rv && !Ge(e) && e.constructor === Object;
}, "plainObject");
var cc = m(function(e) {
  return e != null && nr(e) === rv;
}, "object");
var ne = m(function(e) {
  return e != null && nr(e) === nr(1) && !isNaN(e);
}, "number");
var dc = m(function(e) {
  return ne(e) && Math.floor(e) === e;
}, "integer");
var wn = m(function(e) {
  if (fc !== "undefined") return e != null && e instanceof HTMLElement;
}, "htmlElement");
var Br = m(function(e) {
  return Oa(e) || tv(e);
}, "elementOrCollection");
var Oa = m(function(e) {
  return Ia(e) === "collection" && e._private.single;
}, "element");
var tv = m(function(e) {
  return Ia(e) === "collection" && !e._private.single;
}, "collection");
var Zs = m(function(e) {
  return Ia(e) === "core";
}, "core");
var av = m(function(e) {
  return Ia(e) === "stylesheet";
}, "stylesheet");
var hc = m(function(e) {
  return Ia(e) === "event";
}, "event");
var lt = m(function(e) {
  return e == null ? true : !!(e === "" || e.match(/^\s+$/));
}, "emptyString");
var gc = m(function(e) {
  return typeof HTMLElement > "u" ? false : e instanceof HTMLElement;
}, "domElement");
var pc = m(function(e) {
  return Ie(e) && ne(e.x1) && ne(e.x2) && ne(e.y1) && ne(e.y2);
}, "boundingBox");
var yc = m(function(e) {
  return cc(e) && Ke(e.then);
}, "promise");
var mc = m(function() {
  return So && So.userAgent.match(/msie|trident|edge/i);
}, "ms");
var Jt = m(function(e, t) {
  t || (t = m(function() {
    if (arguments.length === 1) return arguments[0];
    if (arguments.length === 0) return "undefined";
    for (var i = [], s = 0; s < arguments.length; s++) i.push(arguments[s]);
    return i.join("$");
  }, "keyFn"));
  var a = m(function() {
    var i = this, s = arguments, o, l = t.apply(i, s), u = a.cache;
    return (o = u[l]) || (o = u[l] = e.apply(i, s)), o;
  }, "memoizedFn");
  return a.cache = {}, a;
}, "memoize");
var Qs = Jt(function(r) {
  return r.replace(/([A-Z])/g, function(e) {
    return "-" + e.toLowerCase();
  });
});
var Ln = Jt(function(r) {
  return r.replace(/(-\w)/g, function(e) {
    return e[1].toUpperCase();
  });
});
var nv = Jt(function(r, e) {
  return r + e[0].toUpperCase() + e.substring(1);
}, function(r, e) {
  return r + "$" + e;
});
var ko = m(function(e) {
  return lt(e) ? e : e.charAt(0).toUpperCase() + e.substring(1);
}, "capitalize");
var nt = m(function(e, t) {
  return e.slice(-1 * t.length) === t;
}, "endsWith");
var ar = "(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))";
var bc = "rgb[a]?\\((" + ar + "[%]?)\\s*,\\s*(" + ar + "[%]?)\\s*,\\s*(" + ar + "[%]?)(?:\\s*,\\s*(" + ar + "))?\\)";
var wc = "rgb[a]?\\((?:" + ar + "[%]?)\\s*,\\s*(?:" + ar + "[%]?)\\s*,\\s*(?:" + ar + "[%]?)(?:\\s*,\\s*(?:" + ar + "))?\\)";
var xc = "hsl[a]?\\((" + ar + ")\\s*,\\s*(" + ar + "[%])\\s*,\\s*(" + ar + "[%])(?:\\s*,\\s*(" + ar + "))?\\)";
var Ec = "hsl[a]?\\((?:" + ar + ")\\s*,\\s*(?:" + ar + "[%])\\s*,\\s*(?:" + ar + "[%])(?:\\s*,\\s*(?:" + ar + "))?\\)";
var Cc = "\\#[0-9a-fA-F]{3}";
var Tc = "\\#[0-9a-fA-F]{6}";
var iv = m(function(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}, "ascending");
var Sc = m(function(e, t) {
  return -1 * iv(e, t);
}, "descending");
var we = Object.assign != null ? Object.assign.bind(Object) : function(r) {
  for (var e = arguments, t = 1; t < e.length; t++) {
    var a = e[t];
    if (a != null) for (var n = Object.keys(a), i = 0; i < n.length; i++) {
      var s = n[i];
      r[s] = a[s];
    }
  }
  return r;
};
var kc = m(function(e) {
  if (!(!(e.length === 4 || e.length === 7) || e[0] !== "#")) {
    var t = e.length === 4, a, n, i, s = 16;
    return t ? (a = parseInt(e[1] + e[1], s), n = parseInt(e[2] + e[2], s), i = parseInt(e[3] + e[3], s)) : (a = parseInt(e[1] + e[2], s), n = parseInt(e[3] + e[4], s), i = parseInt(e[5] + e[6], s)), [a, n, i];
  }
}, "hex2tuple");
var Dc = m(function(e) {
  var t, a, n, i, s, o, l, u;
  function f(h, m2, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? h + (m2 - h) * 6 * p : p < 1 / 2 ? m2 : p < 2 / 3 ? h + (m2 - h) * (2 / 3 - p) * 6 : h;
  }
  m(f, "hue2rgb");
  var c = new RegExp("^" + xc + "$").exec(e);
  if (c) {
    if (a = parseInt(c[1]), a < 0 ? a = (360 - -1 * a % 360) % 360 : a > 360 && (a = a % 360), a /= 360, n = parseFloat(c[2]), n < 0 || n > 100 || (n = n / 100, i = parseFloat(c[3]), i < 0 || i > 100) || (i = i / 100, s = c[4], s !== void 0 && (s = parseFloat(s), s < 0 || s > 1))) return;
    if (n === 0) o = l = u = Math.round(i * 255);
    else {
      var d = i < 0.5 ? i * (1 + n) : i + n - i * n, g = 2 * i - d;
      o = Math.round(255 * f(g, d, a + 1 / 3)), l = Math.round(255 * f(g, d, a)), u = Math.round(255 * f(g, d, a - 1 / 3));
    }
    t = [o, l, u, s];
  }
  return t;
}, "hsl2tuple");
var Bc = m(function(e) {
  var t, a = new RegExp("^" + bc + "$").exec(e);
  if (a) {
    t = [];
    for (var n = [], i = 1; i <= 3; i++) {
      var s = a[i];
      if (s[s.length - 1] === "%" && (n[i] = true), s = parseFloat(s), n[i] && (s = s / 100 * 255), s < 0 || s > 255) return;
      t.push(Math.floor(s));
    }
    var o = n[1] || n[2] || n[3], l = n[1] && n[2] && n[3];
    if (o && !l) return;
    var u = a[4];
    if (u !== void 0) {
      if (u = parseFloat(u), u < 0 || u > 1) return;
      t.push(u);
    }
  }
  return t;
}, "rgb2tuple");
var Pc = m(function(e) {
  return Ac[e.toLowerCase()];
}, "colorname2tuple");
var sv = m(function(e) {
  return (Ge(e) ? e : null) || Pc(e) || kc(e) || Bc(e) || Dc(e);
}, "color2tuple");
var Ac = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], grey: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
var ov = m(function(e) {
  for (var t = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
    var s = a[i];
    if (Ie(s)) throw Error("Tried to set map with object key");
    i < a.length - 1 ? (t[s] == null && (t[s] = {}), t = t[s]) : t[s] = e.value;
  }
}, "setMap");
var uv = m(function(e) {
  for (var t = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
    var s = a[i];
    if (Ie(s)) throw Error("Tried to get map with object key");
    if (t = t[s], t == null) return t;
  }
  return t;
}, "getMap");
var Xa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Na(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
m(Na, "getDefaultExportFromCjs");
var jn;
var Do;
function za() {
  if (Do) return jn;
  Do = 1;
  function r(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return m(r, "isObject"), jn = r, jn;
}
m(za, "requireIsObject");
var ei;
var Bo;
function Rc() {
  if (Bo) return ei;
  Bo = 1;
  var r = typeof Xa == "object" && Xa && Xa.Object === Object && Xa;
  return ei = r, ei;
}
m(Rc, "require_freeGlobal");
var ri;
var Po;
function In() {
  if (Po) return ri;
  Po = 1;
  var r = Rc(), e = typeof self == "object" && self && self.Object === Object && self, t = r || e || Function("return this")();
  return ri = t, ri;
}
m(In, "require_root");
var ti;
var Ao;
function Mc() {
  if (Ao) return ti;
  Ao = 1;
  var r = In(), e = m(function() {
    return r.Date.now();
  }, "now");
  return ti = e, ti;
}
m(Mc, "requireNow");
var ai;
var Ro;
function Lc() {
  if (Ro) return ai;
  Ro = 1;
  var r = /\s/;
  function e(t) {
    for (var a = t.length; a-- && r.test(t.charAt(a)); ) ;
    return a;
  }
  return m(e, "trimmedEndIndex"), ai = e, ai;
}
m(Lc, "require_trimmedEndIndex");
var ni;
var Mo;
function Ic() {
  if (Mo) return ni;
  Mo = 1;
  var r = Lc(), e = /^\s+/;
  function t(a) {
    return a && a.slice(0, r(a) + 1).replace(e, "");
  }
  return m(t, "baseTrim"), ni = t, ni;
}
m(Ic, "require_baseTrim");
var ii;
var Lo;
function Js() {
  if (Lo) return ii;
  Lo = 1;
  var r = In(), e = r.Symbol;
  return ii = e, ii;
}
m(Js, "require_Symbol");
var si;
var Io;
function Oc() {
  if (Io) return si;
  Io = 1;
  var r = Js(), e = Object.prototype, t = e.hasOwnProperty, a = e.toString, n = r ? r.toStringTag : void 0;
  function i(s) {
    var o = t.call(s, n), l = s[n];
    try {
      s[n] = void 0;
      var u = true;
    } catch {
    }
    var f = a.call(s);
    return u && (o ? s[n] = l : delete s[n]), f;
  }
  return m(i, "getRawTag"), si = i, si;
}
m(Oc, "require_getRawTag");
var oi;
var Oo;
function Nc() {
  if (Oo) return oi;
  Oo = 1;
  var r = Object.prototype, e = r.toString;
  function t(a) {
    return e.call(a);
  }
  return m(t, "objectToString"), oi = t, oi;
}
m(Nc, "require_objectToString");
var ui;
var No;
function lv() {
  if (No) return ui;
  No = 1;
  var r = Js(), e = Oc(), t = Nc(), a = "[object Null]", n = "[object Undefined]", i = r ? r.toStringTag : void 0;
  function s(o) {
    return o == null ? o === void 0 ? n : a : i && i in Object(o) ? e(o) : t(o);
  }
  return m(s, "baseGetTag"), ui = s, ui;
}
m(lv, "require_baseGetTag");
var li;
var zo;
function zc() {
  if (zo) return li;
  zo = 1;
  function r(e) {
    return e != null && typeof e == "object";
  }
  return m(r, "isObjectLike"), li = r, li;
}
m(zc, "requireIsObjectLike");
var vi;
var Fo;
function Fa() {
  if (Fo) return vi;
  Fo = 1;
  var r = lv(), e = zc(), t = "[object Symbol]";
  function a(n) {
    return typeof n == "symbol" || e(n) && r(n) == t;
  }
  return m(a, "isSymbol"), vi = a, vi;
}
m(Fa, "requireIsSymbol");
var fi;
var Vo;
function Fc() {
  if (Vo) return fi;
  Vo = 1;
  var r = Ic(), e = za(), t = Fa(), a = NaN, n = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, s = /^0o[0-7]+$/i, o = parseInt;
  function l(u) {
    if (typeof u == "number") return u;
    if (t(u)) return a;
    if (e(u)) {
      var f = typeof u.valueOf == "function" ? u.valueOf() : u;
      u = e(f) ? f + "" : f;
    }
    if (typeof u != "string") return u === 0 ? u : +u;
    u = r(u);
    var c = i.test(u);
    return c || s.test(u) ? o(u.slice(2), c ? 2 : 8) : n.test(u) ? a : +u;
  }
  return m(l, "toNumber"), fi = l, fi;
}
m(Fc, "requireToNumber");
var ci;
var qo;
function Vc() {
  if (qo) return ci;
  qo = 1;
  var r = za(), e = Mc(), t = Fc(), a = "Expected a function", n = Math.max, i = Math.min;
  function s(o, l, u) {
    var f, c, d, g, h, m2, p = 0, y = false, b = false, w = true;
    if (typeof o != "function") throw new TypeError(a);
    l = t(l) || 0, r(u) && (y = !!u.leading, b = "maxWait" in u, d = b ? n(t(u.maxWait) || 0, l) : d, w = "trailing" in u ? !!u.trailing : w);
    function x(R) {
      var M = f, I = c;
      return f = c = void 0, p = R, g = o.apply(I, M), g;
    }
    m(x, "invokeFunc");
    function C(R) {
      return p = R, h = setTimeout(S, l), y ? x(R) : g;
    }
    m(C, "leadingEdge");
    function T(R) {
      var M = R - m2, I = R - p, O = l - M;
      return b ? i(O, d - I) : O;
    }
    m(T, "remainingWait");
    function E(R) {
      var M = R - m2, I = R - p;
      return m2 === void 0 || M >= l || M < 0 || b && I >= d;
    }
    m(E, "shouldInvoke");
    function S() {
      var R = e();
      if (E(R)) return D(R);
      h = setTimeout(S, T(R));
    }
    m(S, "timerExpired");
    function D(R) {
      return h = void 0, w && f ? x(R) : (f = c = void 0, g);
    }
    m(D, "trailingEdge");
    function B() {
      h !== void 0 && clearTimeout(h), p = 0, f = m2 = c = h = void 0;
    }
    m(B, "cancel");
    function P() {
      return h === void 0 ? g : D(e());
    }
    m(P, "flush");
    function A() {
      var R = e(), M = E(R);
      if (f = arguments, c = this, m2 = R, M) {
        if (h === void 0) return C(m2);
        if (b) return clearTimeout(h), h = setTimeout(S, l), x(m2);
      }
      return h === void 0 && (h = setTimeout(S, l)), g;
    }
    return m(A, "debounced"), A.cancel = B, A.flush = P, A;
  }
  return m(s, "debounce"), ci = s, ci;
}
m(Vc, "requireDebounce");
var qc = Vc();
var Va = Na(qc);
var di = tr ? tr.performance : null;
var vv = di && di.now ? function() {
  return di.now();
} : function() {
  return Date.now();
};
var _c = function() {
  if (tr) {
    if (tr.requestAnimationFrame) return function(r) {
      tr.requestAnimationFrame(r);
    };
    if (tr.mozRequestAnimationFrame) return function(r) {
      tr.mozRequestAnimationFrame(r);
    };
    if (tr.webkitRequestAnimationFrame) return function(r) {
      tr.webkitRequestAnimationFrame(r);
    };
    if (tr.msRequestAnimationFrame) return function(r) {
      tr.msRequestAnimationFrame(r);
    };
  }
  return function(r) {
    r && setTimeout(function() {
      r(vv());
    }, 1e3 / 60);
  };
}();
var xn = m(function(e) {
  return _c(e);
}, "requestAnimationFrame");
var Zr = vv;
var kt = 9261;
var fv = 65599;
var Wt = 5381;
var cv = m(function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt, a = t, n; n = e.next(), !n.done; ) a = a * fv + n.value | 0;
  return a;
}, "hashIterableInts");
var Ta = m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt;
  return t * fv + e | 0;
}, "hashInt");
var Sa = m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Wt;
  return (t << 5) + t + e | 0;
}, "hashIntAlt");
var Gc = m(function(e, t) {
  return e * 2097152 + t;
}, "combineHashes");
var rt = m(function(e) {
  return e[0] * 2097152 + e[1];
}, "combineHashesArray");
var Ya = m(function(e, t) {
  return [Ta(e[0], t[0]), Sa(e[1], t[1])];
}, "hashArrays");
var _o = m(function(e, t) {
  var a = { value: 0, done: false }, n = 0, i = e.length, s = { next: m(function() {
    return n < i ? a.value = e[n++] : a.done = true, a;
  }, "next") };
  return cv(s, t);
}, "hashIntsArray");
var Pt = m(function(e, t) {
  var a = { value: 0, done: false }, n = 0, i = e.length, s = { next: m(function() {
    return n < i ? a.value = e.charCodeAt(n++) : a.done = true, a;
  }, "next") };
  return cv(s, t);
}, "hashString");
var dv = m(function() {
  return Hc(arguments);
}, "hashStrings");
var Hc = m(function(e) {
  for (var t, a = 0; a < e.length; a++) {
    var n = e[a];
    a === 0 ? t = Pt(n) : t = Pt(n, t);
  }
  return t;
}, "hashStringsArray");
function Wc(r, e, t, a, n) {
  var i = n * Math.PI / 180, s = Math.cos(i) * (r - t) - Math.sin(i) * (e - a) + t, o = Math.sin(i) * (r - t) + Math.cos(i) * (e - a) + a;
  return { x: s, y: o };
}
m(Wc, "rotatePoint");
var $c = m(function(e, t, a, n, i, s) {
  return { x: (e - a) * i + a, y: (t - n) * s + n };
}, "movePointByBoxAspect");
function Uc(r, e, t) {
  if (t === 0) return r;
  var a = (e.x1 + e.x2) / 2, n = (e.y1 + e.y2) / 2, i = e.w / e.h, s = 1 / i, o = Wc(r.x, r.y, a, n, t), l = $c(o.x, o.y, a, n, i, s);
  return { x: l.x, y: l.y };
}
m(Uc, "rotatePosAndSkewByBox");
var Go = true;
var Kc = console.warn != null;
var Xc = console.trace != null;
var js = Number.MAX_SAFE_INTEGER || 9007199254740991;
var hv = m(function() {
  return true;
}, "trueify");
var En = m(function() {
  return false;
}, "falsify");
var Ho = m(function() {
  return 0;
}, "zeroify");
var eo = m(function() {
}, "noop");
var Ue = m(function(e) {
  throw new Error(e);
}, "error");
var gv = m(function(e) {
  if (e !== void 0) Go = !!e;
  else return Go;
}, "warnings");
var qe = m(function(e) {
  gv() && (Kc ? console.warn(e) : (console.log(e), Xc && console.trace()));
}, "warn");
var Yc = m(function(e) {
  return we({}, e);
}, "clone");
var _r = m(function(e) {
  return e == null ? e : Ge(e) ? e.slice() : Ie(e) ? Yc(e) : e;
}, "copy");
var Zc = m(function(e) {
  return e.slice();
}, "copyArray");
var pv = m(function(e, t) {
  for (t = e = ""; e++ < 36; t += e * 51 & 52 ? (e ^ 15 ? 8 ^ Math.random() * (e ^ 20 ? 16 : 4) : 4).toString(16) : "-") ;
  return t;
}, "uuid");
var Qc = {};
var yv = m(function() {
  return Qc;
}, "staticEmptyObject");
var dr = m(function(e) {
  var t = Object.keys(e);
  return function(a) {
    for (var n = {}, i = 0; i < t.length; i++) {
      var s = t[i], o = a == null ? void 0 : a[s];
      n[s] = o === void 0 ? e[s] : o;
    }
    return n;
  };
}, "defaults");
var vt = m(function(e, t, a) {
  for (var n = e.length - 1; n >= 0; n--) e[n] === t && e.splice(n, 1);
}, "removeFromArray");
var ro = m(function(e) {
  e.splice(0, e.length);
}, "clearArray");
var Jc = m(function(e, t) {
  for (var a = 0; a < t.length; a++) {
    var n = t[a];
    e.push(n);
  }
}, "push");
var Sr = m(function(e, t, a) {
  return a && (t = nv(a, t)), e[t];
}, "getPrefixedProperty");
var Xr = m(function(e, t, a, n) {
  a && (t = nv(a, t)), e[t] = n;
}, "setPrefixedProperty");
var jc = function() {
  function r() {
    gt(this, r), this._obj = {};
  }
  return m(r, "ObjectMap"), pt(r, [{ key: "set", value: m(function(t, a) {
    return this._obj[t] = a, this;
  }, "set") }, { key: "delete", value: m(function(t) {
    return this._obj[t] = void 0, this;
  }, "_delete") }, { key: "clear", value: m(function() {
    this._obj = {};
  }, "clear") }, { key: "has", value: m(function(t) {
    return this._obj[t] !== void 0;
  }, "has") }, { key: "get", value: m(function(t) {
    return this._obj[t];
  }, "get") }]);
}();
var Yr = typeof Map < "u" ? Map : jc;
var ed = "undefined";
var rd = function() {
  function r(e) {
    if (gt(this, r), this._obj = /* @__PURE__ */ Object.create(null), this.size = 0, e != null) {
      var t;
      e.instanceString != null && e.instanceString() === this.instanceString() ? t = e.toArray() : t = e;
      for (var a = 0; a < t.length; a++) this.add(t[a]);
    }
  }
  return m(r, "ObjectSet"), pt(r, [{ key: "instanceString", value: m(function() {
    return "set";
  }, "instanceString") }, { key: "add", value: m(function(t) {
    var a = this._obj;
    a[t] !== 1 && (a[t] = 1, this.size++);
  }, "add") }, { key: "delete", value: m(function(t) {
    var a = this._obj;
    a[t] === 1 && (a[t] = 0, this.size--);
  }, "_delete") }, { key: "clear", value: m(function() {
    this._obj = /* @__PURE__ */ Object.create(null);
  }, "clear") }, { key: "has", value: m(function(t) {
    return this._obj[t] === 1;
  }, "has") }, { key: "toArray", value: m(function() {
    var t = this;
    return Object.keys(this._obj).filter(function(a) {
      return t.has(a);
    });
  }, "toArray") }, { key: "forEach", value: m(function(t, a) {
    return this.toArray().forEach(t, a);
  }, "forEach") }]);
}();
var ta = (typeof Set > "u" ? "undefined" : nr(Set)) !== ed ? Set : rd;
var On = m(function(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  if (e === void 0 || t === void 0 || !Zs(e)) {
    Ue("An element must have a core reference and parameters set");
    return;
  }
  var n = t.group;
  if (n == null && (t.data && t.data.source != null && t.data.target != null ? n = "edges" : n = "nodes"), n !== "nodes" && n !== "edges") {
    Ue("An element must be of type `nodes` or `edges`; you specified `" + n + "`");
    return;
  }
  this.length = 1, this[0] = this;
  var i = this._private = { cy: e, single: true, data: t.data || {}, position: t.position || { x: 0, y: 0 }, autoWidth: void 0, autoHeight: void 0, autoPadding: void 0, compoundBoundsClean: false, listeners: [], group: n, style: {}, rstyle: {}, styleCxts: [], styleKeys: {}, removed: true, selected: !!t.selected, selectable: t.selectable === void 0 ? true : !!t.selectable, locked: !!t.locked, grabbed: false, grabbable: t.grabbable === void 0 ? true : !!t.grabbable, pannable: t.pannable === void 0 ? n === "edges" : !!t.pannable, active: false, classes: new ta(), animation: { current: [], queue: [] }, rscratch: {}, scratch: t.scratch || {}, edges: [], children: [], parent: t.parent && t.parent.isNode() ? t.parent : null, traversalCache: {}, backgrounding: false, bbCache: null, bbCacheShift: { x: 0, y: 0 }, bodyBounds: null, overlayBounds: null, labelBounds: { all: null, source: null, target: null, main: null }, arrowBounds: { source: null, target: null, "mid-source": null, "mid-target": null } };
  if (i.position.x == null && (i.position.x = 0), i.position.y == null && (i.position.y = 0), t.renderedPosition) {
    var s = t.renderedPosition, o = e.pan(), l = e.zoom();
    i.position = { x: (s.x - o.x) / l, y: (s.y - o.y) / l };
  }
  var u = [];
  Ge(t.classes) ? u = t.classes : pe(t.classes) && (u = t.classes.split(/\s+/));
  for (var f = 0, c = u.length; f < c; f++) {
    var d = u[f];
    !d || d === "" || i.classes.add(d);
  }
  this.createEmitter(), (a === void 0 || a) && this.restore();
  var g = t.style || t.css;
  g && (qe("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."), this.style(g));
}, "Element");
var Wo = m(function(e) {
  return e = { bfs: e.bfs || !e.dfs, dfs: e.dfs || !e.bfs }, m(function(a, n, i) {
    var s;
    Ie(a) && !Br(a) && (s = a, a = s.roots || s.root, n = s.visit, i = s.directed), i = arguments.length === 2 && !Ke(n) ? n : i, n = Ke(n) ? n : function() {
    };
    for (var o = this._private.cy, l = a = pe(a) ? this.filter(a) : a, u = [], f = [], c = {}, d = {}, g = {}, h = 0, m2, p = this.byGroup(), y = p.nodes, b = p.edges, w = 0; w < l.length; w++) {
      var x = l[w], C = x.id();
      x.isNode() && (u.unshift(x), e.bfs && (g[C] = true, f.push(x)), d[C] = 0);
    }
    for (var T = m(function() {
      var R = e.bfs ? u.shift() : u.pop(), M = R.id();
      if (e.dfs) {
        if (g[M]) return 0;
        g[M] = true, f.push(R);
      }
      var I = d[M], O = c[M], L = O != null ? O.source() : null, N = O != null ? O.target() : null, q = O == null ? void 0 : R.same(L) ? N[0] : L[0], H;
      if (H = n(R, O, q, h++, I), H === true) return m2 = R, 1;
      if (H === false) return 1;
      for (var z = R.connectedEdges().filter(function(ee) {
        return (!i || ee.source().same(R)) && b.has(ee);
      }), V = 0; V < z.length; V++) {
        var K = z[V], J = K.connectedNodes().filter(function(ee) {
          return !ee.same(R) && y.has(ee);
        }), X = J.id();
        J.length !== 0 && !g[X] && (J = J[0], u.push(J), e.bfs && (g[X] = true, f.push(J)), c[X] = K, d[X] = d[M] + 1);
      }
    }, "_loop"), E; u.length !== 0 && (E = T(), !(E !== 0 && E === 1)); ) ;
    for (var S = o.collection(), D = 0; D < f.length; D++) {
      var B = f[D], P = c[B.id()];
      P != null && S.push(P), S.push(B);
    }
    return { path: o.collection(S), found: o.collection(m2) };
  }, "searchFn");
}, "defineSearch");
var ka = { breadthFirstSearch: Wo({ bfs: true }), depthFirstSearch: Wo({ dfs: true }) };
ka.bfs = ka.breadthFirstSearch;
ka.dfs = ka.depthFirstSearch;
var un = { exports: {} };
var td = un.exports;
var $o;
function ad() {
  return $o || ($o = 1, function(r, e) {
    (function() {
      var t, a, n, i, s, o, l, u, f, c, d, g, h, m2, p;
      n = Math.floor, c = Math.min, a = m(function(y, b) {
        return y < b ? -1 : y > b ? 1 : 0;
      }, "defaultCmp"), f = m(function(y, b, w, x, C) {
        var T;
        if (w == null && (w = 0), C == null && (C = a), w < 0) throw new Error("lo must be non-negative");
        for (x == null && (x = y.length); w < x; ) T = n((w + x) / 2), C(b, y[T]) < 0 ? x = T : w = T + 1;
        return [].splice.apply(y, [w, w - w].concat(b)), b;
      }, "insort"), o = m(function(y, b, w) {
        return w == null && (w = a), y.push(b), m2(y, 0, y.length - 1, w);
      }, "heappush"), s = m(function(y, b) {
        var w, x;
        return b == null && (b = a), w = y.pop(), y.length ? (x = y[0], y[0] = w, p(y, 0, b)) : x = w, x;
      }, "heappop"), u = m(function(y, b, w) {
        var x;
        return w == null && (w = a), x = y[0], y[0] = b, p(y, 0, w), x;
      }, "heapreplace"), l = m(function(y, b, w) {
        var x;
        return w == null && (w = a), y.length && w(y[0], b) < 0 && (x = [y[0], b], b = x[0], y[0] = x[1], p(y, 0, w)), b;
      }, "heappushpop"), i = m(function(y, b) {
        var w, x, C, T, E, S;
        for (b == null && (b = a), T = (function() {
          S = [];
          for (var D = 0, B = n(y.length / 2); 0 <= B ? D < B : D > B; 0 <= B ? D++ : D--) S.push(D);
          return S;
        }).apply(this).reverse(), E = [], x = 0, C = T.length; x < C; x++) w = T[x], E.push(p(y, w, b));
        return E;
      }, "heapify"), h = m(function(y, b, w) {
        var x;
        if (w == null && (w = a), x = y.indexOf(b), x !== -1) return m2(y, 0, x, w), p(y, x, w);
      }, "updateItem"), d = m(function(y, b, w) {
        var x, C, T, E, S;
        if (w == null && (w = a), C = y.slice(0, b), !C.length) return C;
        for (i(C, w), S = y.slice(b), T = 0, E = S.length; T < E; T++) x = S[T], l(C, x, w);
        return C.sort(w).reverse();
      }, "nlargest"), g = m(function(y, b, w) {
        var x, C, T, E, S, D, B, P, A;
        if (w == null && (w = a), b * 10 <= y.length) {
          if (T = y.slice(0, b).sort(w), !T.length) return T;
          for (C = T[T.length - 1], B = y.slice(b), E = 0, D = B.length; E < D; E++) x = B[E], w(x, C) < 0 && (f(T, x, 0, null, w), T.pop(), C = T[T.length - 1]);
          return T;
        }
        for (i(y, w), A = [], S = 0, P = c(b, y.length); 0 <= P ? S < P : S > P; 0 <= P ? ++S : --S) A.push(s(y, w));
        return A;
      }, "nsmallest"), m2 = m(function(y, b, w, x) {
        var C, T, E;
        for (x == null && (x = a), C = y[w]; w > b; ) {
          if (E = w - 1 >> 1, T = y[E], x(C, T) < 0) {
            y[w] = T, w = E;
            continue;
          }
          break;
        }
        return y[w] = C;
      }, "_siftdown"), p = m(function(y, b, w) {
        var x, C, T, E, S;
        for (w == null && (w = a), C = y.length, S = b, T = y[b], x = 2 * b + 1; x < C; ) E = x + 1, E < C && !(w(y[x], y[E]) < 0) && (x = E), y[b] = y[x], b = x, x = 2 * b + 1;
        return y[b] = T, m2(y, S, b, w);
      }, "_siftup"), t = function() {
        y.push = o, y.pop = s, y.replace = u, y.pushpop = l, y.heapify = i, y.updateItem = h, y.nlargest = d, y.nsmallest = g;
        function y(b) {
          this.cmp = b ?? a, this.nodes = [];
        }
        return m(y, "Heap"), y.prototype.push = function(b) {
          return o(this.nodes, b, this.cmp);
        }, y.prototype.pop = function() {
          return s(this.nodes, this.cmp);
        }, y.prototype.peek = function() {
          return this.nodes[0];
        }, y.prototype.contains = function(b) {
          return this.nodes.indexOf(b) !== -1;
        }, y.prototype.replace = function(b) {
          return u(this.nodes, b, this.cmp);
        }, y.prototype.pushpop = function(b) {
          return l(this.nodes, b, this.cmp);
        }, y.prototype.heapify = function() {
          return i(this.nodes, this.cmp);
        }, y.prototype.updateItem = function(b) {
          return h(this.nodes, b, this.cmp);
        }, y.prototype.clear = function() {
          return this.nodes = [];
        }, y.prototype.empty = function() {
          return this.nodes.length === 0;
        }, y.prototype.size = function() {
          return this.nodes.length;
        }, y.prototype.clone = function() {
          var b;
          return b = new y(), b.nodes = this.nodes.slice(0), b;
        }, y.prototype.toArray = function() {
          return this.nodes.slice(0);
        }, y.prototype.insert = y.prototype.push, y.prototype.top = y.prototype.peek, y.prototype.front = y.prototype.peek, y.prototype.has = y.prototype.contains, y.prototype.copy = y.prototype.clone, y;
      }(), function(y, b) {
        return r.exports = b();
      }(this, function() {
        return t;
      });
    }).call(td);
  }(un)), un.exports;
}
m(ad, "requireHeap$1");
var hi;
var Uo;
function nd() {
  return Uo || (Uo = 1, hi = ad()), hi;
}
m(nd, "requireHeap");
var id = nd();
var qa = Na(id);
var sd = dr({ root: null, weight: m(function(e) {
  return 1;
}, "weight"), directed: false });
var od = { dijkstra: m(function(e) {
  if (!Ie(e)) {
    var t = arguments;
    e = { root: t[0], weight: t[1], directed: t[2] };
  }
  var a = sd(e), n = a.root, i = a.weight, s = a.directed, o = this, l = i, u = pe(n) ? this.filter(n)[0] : n[0], f = {}, c = {}, d = {}, g = this.byGroup(), h = g.nodes, m2 = g.edges;
  m2.unmergeBy(function(I) {
    return I.isLoop();
  });
  for (var p = m(function(O) {
    return f[O.id()];
  }, "getDist"), y = m(function(O, L) {
    f[O.id()] = L, b.updateItem(O);
  }, "setDist"), b = new qa(function(I, O) {
    return p(I) - p(O);
  }), w = 0; w < h.length; w++) {
    var x = h[w];
    f[x.id()] = x.same(u) ? 0 : 1 / 0, b.push(x);
  }
  for (var C = m(function(O, L) {
    for (var N = (s ? O.edgesTo(L) : O.edgesWith(L)).intersect(m2), q = 1 / 0, H, z = 0; z < N.length; z++) {
      var V = N[z], K = l(V);
      (K < q || !H) && (q = K, H = V);
    }
    return { edge: H, dist: q };
  }, "distBetween"); b.size() > 0; ) {
    var T = b.pop(), E = p(T), S = T.id();
    if (d[S] = E, E !== 1 / 0) for (var D = T.neighborhood().intersect(h), B = 0; B < D.length; B++) {
      var P = D[B], A = P.id(), R = C(T, P), M = E + R.dist;
      M < p(P) && (y(P, M), c[A] = { node: T, edge: R.edge });
    }
  }
  return { distanceTo: m(function(O) {
    var L = pe(O) ? h.filter(O)[0] : O[0];
    return d[L.id()];
  }, "distanceTo"), pathTo: m(function(O) {
    var L = pe(O) ? h.filter(O)[0] : O[0], N = [], q = L, H = q.id();
    if (L.length > 0) for (N.unshift(L); c[H]; ) {
      var z = c[H];
      N.unshift(z.edge), N.unshift(z.node), q = z.node, H = q.id();
    }
    return o.spawn(N);
  }, "pathTo") };
}, "dijkstra") };
var ud = { kruskal: m(function(e) {
  e = e || function(w) {
    return 1;
  };
  for (var t = this.byGroup(), a = t.nodes, n = t.edges, i = a.length, s = new Array(i), o = a, l = m(function(x) {
    for (var C = 0; C < s.length; C++) {
      var T = s[C];
      if (T.has(x)) return C;
    }
  }, "findSetIndex"), u = 0; u < i; u++) s[u] = this.spawn(a[u]);
  for (var f = n.sort(function(w, x) {
    return e(w) - e(x);
  }), c = 0; c < f.length; c++) {
    var d = f[c], g = d.source()[0], h = d.target()[0], m2 = l(g), p = l(h), y = s[m2], b = s[p];
    m2 !== p && (o.merge(d), y.merge(b), s.splice(p, 1));
  }
  return o;
}, "kruskal") };
var ld = dr({ root: null, goal: null, weight: m(function(e) {
  return 1;
}, "weight"), heuristic: m(function(e) {
  return 0;
}, "heuristic"), directed: false });
var vd = { aStar: m(function(e) {
  var t = this.cy(), a = ld(e), n = a.root, i = a.goal, s = a.heuristic, o = a.directed, l = a.weight;
  n = t.collection(n)[0], i = t.collection(i)[0];
  var u = n.id(), f = i.id(), c = {}, d = {}, g = {}, h = new qa(function(H, z) {
    return d[H.id()] - d[z.id()];
  }), m2 = new ta(), p = {}, y = {}, b = m(function(z, V) {
    h.push(z), m2.add(V);
  }, "addToOpenSet"), w, x, C = m(function() {
    w = h.pop(), x = w.id(), m2.delete(x);
  }, "popFromOpenSet"), T = m(function(z) {
    return m2.has(z);
  }, "isInOpenSet");
  b(n, u), c[u] = 0, d[u] = s(n);
  for (var E = 0; h.size() > 0; ) {
    if (C(), E++, x === f) {
      for (var S = [], D = i, B = f, P = y[B]; S.unshift(D), P != null && S.unshift(P), D = p[B], D != null; ) B = D.id(), P = y[B];
      return { found: true, distance: c[x], path: this.spawn(S), steps: E };
    }
    g[x] = true;
    for (var A = w._private.edges, R = 0; R < A.length; R++) {
      var M = A[R];
      if (this.hasElementWithId(M.id()) && !(o && M.data("source") !== x)) {
        var I = M.source(), O = M.target(), L = I.id() !== x ? I : O, N = L.id();
        if (this.hasElementWithId(N) && !g[N]) {
          var q = c[x] + l(M);
          if (!T(N)) {
            c[N] = q, d[N] = q + s(L), b(L, N), p[N] = w, y[N] = M;
            continue;
          }
          q < c[N] && (c[N] = q, d[N] = q + s(L), p[N] = w, y[N] = M);
        }
      }
    }
  }
  return { found: false, distance: void 0, path: void 0, steps: E };
}, "aStar") };
var fd = dr({ weight: m(function(e) {
  return 1;
}, "weight"), directed: false });
var cd = { floydWarshall: m(function(e) {
  for (var t = this.cy(), a = fd(e), n = a.weight, i = a.directed, s = n, o = this.byGroup(), l = o.nodes, u = o.edges, f = l.length, c = f * f, d = m(function(K) {
    return l.indexOf(K);
  }, "indexOf"), g = m(function(K) {
    return l[K];
  }, "atIndex"), h = new Array(c), m2 = 0; m2 < c; m2++) {
    var p = m2 % f, y = (m2 - p) / f;
    y === p ? h[m2] = 0 : h[m2] = 1 / 0;
  }
  for (var b = new Array(c), w = new Array(c), x = 0; x < u.length; x++) {
    var C = u[x], T = C.source()[0], E = C.target()[0];
    if (T !== E) {
      var S = d(T), D = d(E), B = S * f + D, P = s(C);
      if (h[B] > P && (h[B] = P, b[B] = D, w[B] = C), !i) {
        var A = D * f + S;
        !i && h[A] > P && (h[A] = P, b[A] = S, w[A] = C);
      }
    }
  }
  for (var R = 0; R < f; R++) for (var M = 0; M < f; M++) for (var I = M * f + R, O = 0; O < f; O++) {
    var L = M * f + O, N = R * f + O;
    h[I] + h[N] < h[L] && (h[L] = h[I] + h[N], b[L] = b[I]);
  }
  var q = m(function(K) {
    return (pe(K) ? t.filter(K) : K)[0];
  }, "getArgEle"), H = m(function(K) {
    return d(q(K));
  }, "indexOfArgEle"), z = { distance: m(function(K, J) {
    var X = H(K), ee = H(J);
    return h[X * f + ee];
  }, "distance"), path: m(function(K, J) {
    var X = H(K), ee = H(J), te = g(X);
    if (X === ee) return te.collection();
    if (b[X * f + ee] == null) return t.collection();
    var ie = t.collection(), j = X, F;
    for (ie.merge(te); X !== ee; ) j = X, X = b[X * f + ee], F = w[j * f + X], ie.merge(F), ie.merge(g(X));
    return ie;
  }, "path") };
  return z;
}, "floydWarshall") };
var dd = dr({ weight: m(function(e) {
  return 1;
}, "weight"), directed: false, root: null });
var hd = { bellmanFord: m(function(e) {
  var t = this, a = dd(e), n = a.weight, i = a.directed, s = a.root, o = n, l = this, u = this.cy(), f = this.byGroup(), c = f.edges, d = f.nodes, g = d.length, h = new Yr(), m2 = false, p = [];
  s = u.collection(s)[0], c.unmergeBy(function(Te) {
    return Te.isLoop();
  });
  for (var y = c.length, b = m(function(xe) {
    var me = h.get(xe.id());
    return me || (me = {}, h.set(xe.id(), me)), me;
  }, "getInfo"), w = m(function(xe) {
    return (pe(xe) ? u.$(xe) : xe)[0];
  }, "getNodeFromTo"), x = m(function(xe) {
    return b(w(xe)).dist;
  }, "distanceTo"), C = m(function(xe) {
    for (var me = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s, se = w(xe), he = [], ge = se; ; ) {
      if (ge == null) return t.spawn();
      var Ce = b(ge), ye = Ce.edge, ke = Ce.pred;
      if (he.unshift(ge[0]), ge.same(me) && he.length > 0) break;
      ye != null && he.unshift(ye), ge = ke;
    }
    return l.spawn(he);
  }, "pathTo"), T = 0; T < g; T++) {
    var E = d[T], S = b(E);
    E.same(s) ? S.dist = 0 : S.dist = 1 / 0, S.pred = null, S.edge = null;
  }
  for (var D = false, B = m(function(xe, me, se, he, ge, Ce) {
    var ye = he.dist + Ce;
    ye < ge.dist && !se.same(he.edge) && (ge.dist = ye, ge.pred = xe, ge.edge = se, D = true);
  }, "checkForEdgeReplacement"), P = 1; P < g; P++) {
    D = false;
    for (var A = 0; A < y; A++) {
      var R = c[A], M = R.source(), I = R.target(), O = o(R), L = b(M), N = b(I);
      B(M, I, R, L, N, O), i || B(I, M, R, N, L, O);
    }
    if (!D) break;
  }
  if (D) for (var q = [], H = 0; H < y; H++) {
    var z = c[H], V = z.source(), K = z.target(), J = o(z), X = b(V).dist, ee = b(K).dist;
    if (X + J < ee || !i && ee + J < X) if (m2 || (qe("Graph contains a negative weight cycle for Bellman-Ford"), m2 = true), e.findNegativeWeightCycles !== false) {
      var te = [];
      X + J < ee && te.push(V), !i && ee + J < X && te.push(K);
      for (var ie = te.length, j = 0; j < ie; j++) {
        var F = te[j], _ = [F];
        _.push(b(F).edge);
        for (var W = b(F).pred; _.indexOf(W) === -1; ) _.push(W), _.push(b(W).edge), W = b(W).pred;
        _ = _.slice(_.indexOf(W));
        for (var Z = _[0].id(), ae = 0, de = 2; de < _.length; de += 2) _[de].id() < Z && (Z = _[de].id(), ae = de);
        _ = _.slice(ae).concat(_.slice(0, ae)), _.push(_[0]);
        var Re = _.map(function(Te) {
          return Te.id();
        }).join(",");
        q.indexOf(Re) === -1 && (p.push(l.spawn(_)), q.push(Re));
      }
    } else break;
  }
  return { distanceTo: x, pathTo: C, hasNegativeWeightCycle: m2, negativeWeightCycles: p };
}, "bellmanFord") };
var gd = Math.sqrt(2);
var pd = m(function(e, t, a) {
  a.length === 0 && Ue("Karger-Stein must be run on a connected (sub)graph");
  for (var n = a[e], i = n[1], s = n[2], o = t[i], l = t[s], u = a, f = u.length - 1; f >= 0; f--) {
    var c = u[f], d = c[1], g = c[2];
    (t[d] === o && t[g] === l || t[d] === l && t[g] === o) && u.splice(f, 1);
  }
  for (var h = 0; h < u.length; h++) {
    var m2 = u[h];
    m2[1] === l ? (u[h] = m2.slice(), u[h][1] = o) : m2[2] === l && (u[h] = m2.slice(), u[h][2] = o);
  }
  for (var p = 0; p < t.length; p++) t[p] === l && (t[p] = o);
  return u;
}, "collapse");
var gi = m(function(e, t, a, n) {
  for (; a > n; ) {
    var i = Math.floor(Math.random() * t.length);
    t = pd(i, e, t), a--;
  }
  return t;
}, "contractUntil");
var yd = { kargerStein: m(function() {
  var e = this, t = this.byGroup(), a = t.nodes, n = t.edges;
  n.unmergeBy(function(N) {
    return N.isLoop();
  });
  var i = a.length, s = n.length, o = Math.ceil(Math.pow(Math.log(i) / Math.LN2, 2)), l = Math.floor(i / gd);
  if (i < 2) {
    Ue("At least 2 nodes are required for Karger-Stein algorithm");
    return;
  }
  for (var u = [], f = 0; f < s; f++) {
    var c = n[f];
    u.push([f, a.indexOf(c.source()), a.indexOf(c.target())]);
  }
  for (var d = 1 / 0, g = [], h = new Array(i), m2 = new Array(i), p = new Array(i), y = m(function(q, H) {
    for (var z = 0; z < i; z++) H[z] = q[z];
  }, "copyNodesMap"), b = 0; b <= o; b++) {
    for (var w = 0; w < i; w++) m2[w] = w;
    var x = gi(m2, u.slice(), i, l), C = x.slice();
    y(m2, p);
    var T = gi(m2, x, l, 2), E = gi(p, C, l, 2);
    T.length <= E.length && T.length < d ? (d = T.length, g = T, y(m2, h)) : E.length <= T.length && E.length < d && (d = E.length, g = E, y(p, h));
  }
  for (var S = this.spawn(g.map(function(N) {
    return n[N[0]];
  })), D = this.spawn(), B = this.spawn(), P = h[0], A = 0; A < h.length; A++) {
    var R = h[A], M = a[A];
    R === P ? D.merge(M) : B.merge(M);
  }
  var I = m(function(q) {
    var H = e.spawn();
    return q.forEach(function(z) {
      H.merge(z), z.connectedEdges().forEach(function(V) {
        e.contains(V) && !S.contains(V) && H.merge(V);
      });
    }), H;
  }, "constructComponent"), O = [I(D), I(B)], L = { cut: S, components: O, partition1: D, partition2: B };
  return L;
}, "kargerStein") };
var pi;
var md = m(function(e) {
  return { x: e.x, y: e.y };
}, "copyPosition");
var Nn = m(function(e, t, a) {
  return { x: e.x * t + a.x, y: e.y * t + a.y };
}, "modelToRenderedPosition");
var mv = m(function(e, t, a) {
  return { x: (e.x - a.x) / t, y: (e.y - a.y) / t };
}, "renderedToModelPosition");
var $t = m(function(e) {
  return { x: e[0], y: e[1] };
}, "array2point");
var bd = m(function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 1 / 0, i = t; i < a; i++) {
    var s = e[i];
    isFinite(s) && (n = Math.min(s, n));
  }
  return n;
}, "min");
var wd = m(function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = -1 / 0, i = t; i < a; i++) {
    var s = e[i];
    isFinite(s) && (n = Math.max(s, n));
  }
  return n;
}, "max");
var xd = m(function(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 0, i = 0, s = t; s < a; s++) {
    var o = e[s];
    isFinite(o) && (n += o, i++);
  }
  return n / i;
}, "mean");
var Ed = m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
  n ? e = e.slice(t, a) : (a < e.length && e.splice(a, e.length - a), t > 0 && e.splice(0, t));
  for (var o = 0, l = e.length - 1; l >= 0; l--) {
    var u = e[l];
    s ? isFinite(u) || (e[l] = -1 / 0, o++) : e.splice(l, 1);
  }
  i && e.sort(function(d, g) {
    return d - g;
  });
  var f = e.length, c = Math.floor(f / 2);
  return f % 2 !== 0 ? e[c + 1 + o] : (e[c - 1 + o] + e[c + o]) / 2;
}, "median");
var Cd = m(function(e) {
  return Math.PI * e / 180;
}, "deg2rad");
var Za = m(function(e, t) {
  return Math.atan2(t, e) - Math.PI / 2;
}, "getAngleFromDisp");
var to = Math.log2 || function(r) {
  return Math.log(r) / Math.log(2);
};
var ao = m(function(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}, "signum");
var At = m(function(e, t) {
  return Math.sqrt(Tt(e, t));
}, "dist");
var Tt = m(function(e, t) {
  var a = t.x - e.x, n = t.y - e.y;
  return a * a + n * n;
}, "sqdist");
var Td = m(function(e) {
  for (var t = e.length, a = 0, n = 0; n < t; n++) a += e[n];
  for (var i = 0; i < t; i++) e[i] = e[i] / a;
  return e;
}, "inPlaceSumNormalize");
var or = m(function(e, t, a, n) {
  return (1 - n) * (1 - n) * e + 2 * (1 - n) * n * t + n * n * a;
}, "qbezierAt");
var Xt = m(function(e, t, a, n) {
  return { x: or(e.x, t.x, a.x, n), y: or(e.y, t.y, a.y, n) };
}, "qbezierPtAt");
var Sd = m(function(e, t, a, n) {
  var i = { x: t.x - e.x, y: t.y - e.y }, s = At(e, t), o = { x: i.x / s, y: i.y / s };
  return a = a ?? 0, n = n ?? a * s, { x: e.x + o.x * n, y: e.y + o.y * n };
}, "lineAt");
var Da = m(function(e, t, a) {
  return Math.max(e, Math.min(a, t));
}, "bound");
var xr = m(function(e) {
  if (e == null) return { x1: 1 / 0, y1: 1 / 0, x2: -1 / 0, y2: -1 / 0, w: 0, h: 0 };
  if (e.x1 != null && e.y1 != null) {
    if (e.x2 != null && e.y2 != null && e.x2 >= e.x1 && e.y2 >= e.y1) return { x1: e.x1, y1: e.y1, x2: e.x2, y2: e.y2, w: e.x2 - e.x1, h: e.y2 - e.y1 };
    if (e.w != null && e.h != null && e.w >= 0 && e.h >= 0) return { x1: e.x1, y1: e.y1, x2: e.x1 + e.w, y2: e.y1 + e.h, w: e.w, h: e.h };
  }
}, "makeBoundingBox");
var kd = m(function(e) {
  return { x1: e.x1, x2: e.x2, w: e.w, y1: e.y1, y2: e.y2, h: e.h };
}, "copyBoundingBox");
var Dd = m(function(e) {
  e.x1 = 1 / 0, e.y1 = 1 / 0, e.x2 = -1 / 0, e.y2 = -1 / 0, e.w = 0, e.h = 0;
}, "clearBoundingBox");
var Bd = m(function(e, t) {
  e.x1 = Math.min(e.x1, t.x1), e.x2 = Math.max(e.x2, t.x2), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, t.y1), e.y2 = Math.max(e.y2, t.y2), e.h = e.y2 - e.y1;
}, "updateBoundingBox");
var bv = m(function(e, t, a) {
  e.x1 = Math.min(e.x1, t), e.x2 = Math.max(e.x2, t), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, a), e.y2 = Math.max(e.y2, a), e.h = e.y2 - e.y1;
}, "expandBoundingBoxByPoint");
var ln = m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.x1 -= t, e.x2 += t, e.y1 -= t, e.y2 += t, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
}, "expandBoundingBox");
var vn = m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0], a, n, i, s;
  if (t.length === 1) a = n = i = s = t[0];
  else if (t.length === 2) a = i = t[0], s = n = t[1];
  else if (t.length === 4) {
    var o = je(t, 4);
    a = o[0], n = o[1], i = o[2], s = o[3];
  }
  return e.x1 -= s, e.x2 += n, e.y1 -= a, e.y2 += i, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
}, "expandBoundingBoxSides");
var Ko = m(function(e, t) {
  e.x1 = t.x1, e.y1 = t.y1, e.x2 = t.x2, e.y2 = t.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1;
}, "assignBoundingBox");
var no = m(function(e, t) {
  return !(e.x1 > t.x2 || t.x1 > e.x2 || e.x2 < t.x1 || t.x2 < e.x1 || e.y2 < t.y1 || t.y2 < e.y1 || e.y1 > t.y2 || t.y1 > e.y2);
}, "boundingBoxesIntersect");
var it = m(function(e, t, a) {
  return e.x1 <= t && t <= e.x2 && e.y1 <= a && a <= e.y2;
}, "inBoundingBox");
var Xo = m(function(e, t) {
  return it(e, t.x, t.y);
}, "pointInBoundingBox");
var wv = m(function(e, t) {
  return it(e, t.x1, t.y1) && it(e, t.x2, t.y2);
}, "boundingBoxInBoundingBox");
var Pd = (pi = Math.hypot) !== null && pi !== void 0 ? pi : function(r, e) {
  return Math.sqrt(r * r + e * e);
};
function Ad(r, e) {
  if (r.length < 3) throw new Error("Need at least 3 vertices");
  var t = m(function(S, D) {
    return { x: S.x + D.x, y: S.y + D.y };
  }, "add"), a = m(function(S, D) {
    return { x: S.x - D.x, y: S.y - D.y };
  }, "sub"), n = m(function(S, D) {
    return { x: S.x * D, y: S.y * D };
  }, "scale"), i = m(function(S, D) {
    return S.x * D.y - S.y * D.x;
  }, "cross"), s = m(function(S) {
    var D = Pd(S.x, S.y);
    return D === 0 ? { x: 0, y: 0 } : { x: S.x / D, y: S.y / D };
  }, "normalize"), o = m(function(S) {
    for (var D = 0, B = 0; B < S.length; B++) {
      var P = S[B], A = S[(B + 1) % S.length];
      D += P.x * A.y - A.x * P.y;
    }
    return D / 2;
  }, "signedArea"), l = m(function(S, D, B, P) {
    var A = a(D, S), R = a(P, B), M = i(A, R);
    if (Math.abs(M) < 1e-9) return t(S, n(A, 0.5));
    var I = i(a(B, S), R) / M;
    return t(S, n(A, I));
  }, "intersectLines"), u = r.map(function(E) {
    return { x: E.x, y: E.y };
  });
  o(u) < 0 && u.reverse();
  for (var f = u.length, c = [], d = 0; d < f; d++) {
    var g = u[d], h = u[(d + 1) % f], m2 = a(h, g), p = s({ x: m2.y, y: -m2.x });
    c.push(p);
  }
  for (var y = c.map(function(E, S) {
    var D = t(u[S], n(E, e)), B = t(u[(S + 1) % f], n(E, e));
    return { p1: D, p2: B };
  }), b = [], w = 0; w < f; w++) {
    var x = y[(w - 1 + f) % f], C = y[w], T = l(x.p1, x.p2, C.p1, C.p2);
    b.push(T);
  }
  return b;
}
m(Ad, "inflatePolygon");
function Rd(r, e, t, a, n, i) {
  var s = qd(r, e, t, a, n), o = Ad(s, i), l = xr();
  return o.forEach(function(u) {
    return bv(l, u.x, u.y);
  }), l;
}
m(Rd, "miterBox");
var xv = m(function(e, t, a, n, i, s, o) {
  var l = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : "auto", u = l === "auto" ? ft(i, s) : l, f = i / 2, c = s / 2;
  u = Math.min(u, f, c);
  var d = u !== f, g = u !== c, h;
  if (d) {
    var m2 = a - f + u - o, p = n - c - o, y = a + f - u + o, b = p;
    if (h = st(e, t, a, n, m2, p, y, b, false), h.length > 0) return h;
  }
  if (g) {
    var w = a + f + o, x = n - c + u - o, C = w, T = n + c - u + o;
    if (h = st(e, t, a, n, w, x, C, T, false), h.length > 0) return h;
  }
  if (d) {
    var E = a - f + u - o, S = n + c + o, D = a + f - u + o, B = S;
    if (h = st(e, t, a, n, E, S, D, B, false), h.length > 0) return h;
  }
  if (g) {
    var P = a - f - o, A = n - c + u - o, R = P, M = n + c - u + o;
    if (h = st(e, t, a, n, P, A, R, M, false), h.length > 0) return h;
  }
  var I;
  {
    var O = a - f + u, L = n - c + u;
    if (I = ma(e, t, a, n, O, L, u + o), I.length > 0 && I[0] <= O && I[1] <= L) return [I[0], I[1]];
  }
  {
    var N = a + f - u, q = n - c + u;
    if (I = ma(e, t, a, n, N, q, u + o), I.length > 0 && I[0] >= N && I[1] <= q) return [I[0], I[1]];
  }
  {
    var H = a + f - u, z = n + c - u;
    if (I = ma(e, t, a, n, H, z, u + o), I.length > 0 && I[0] >= H && I[1] >= z) return [I[0], I[1]];
  }
  {
    var V = a - f + u, K = n + c - u;
    if (I = ma(e, t, a, n, V, K, u + o), I.length > 0 && I[0] <= V && I[1] >= K) return [I[0], I[1]];
  }
  return [];
}, "roundRectangleIntersectLine");
var Md = m(function(e, t, a, n, i, s, o) {
  var l = o, u = Math.min(a, i), f = Math.max(a, i), c = Math.min(n, s), d = Math.max(n, s);
  return u - l <= e && e <= f + l && c - l <= t && t <= d + l;
}, "inLineVicinity");
var Ld = m(function(e, t, a, n, i, s, o, l, u) {
  var f = { x1: Math.min(a, o, i) - u, x2: Math.max(a, o, i) + u, y1: Math.min(n, l, s) - u, y2: Math.max(n, l, s) + u };
  return !(e < f.x1 || e > f.x2 || t < f.y1 || t > f.y2);
}, "inBezierVicinity");
var Id = m(function(e, t, a, n) {
  a -= n;
  var i = t * t - 4 * e * a;
  if (i < 0) return [];
  var s = Math.sqrt(i), o = 2 * e, l = (-t + s) / o, u = (-t - s) / o;
  return [l, u];
}, "solveQuadratic");
var Od = m(function(e, t, a, n, i) {
  var s = 1e-5;
  e === 0 && (e = s), t /= e, a /= e, n /= e;
  var o, l, u, f, c, d, g, h;
  if (l = (3 * a - t * t) / 9, u = -(27 * n) + t * (9 * a - 2 * (t * t)), u /= 54, o = l * l * l + u * u, i[1] = 0, g = t / 3, o > 0) {
    c = u + Math.sqrt(o), c = c < 0 ? -Math.pow(-c, 1 / 3) : Math.pow(c, 1 / 3), d = u - Math.sqrt(o), d = d < 0 ? -Math.pow(-d, 1 / 3) : Math.pow(d, 1 / 3), i[0] = -g + c + d, g += (c + d) / 2, i[4] = i[2] = -g, g = Math.sqrt(3) * (-d + c) / 2, i[3] = g, i[5] = -g;
    return;
  }
  if (i[5] = i[3] = 0, o === 0) {
    h = u < 0 ? -Math.pow(-u, 1 / 3) : Math.pow(u, 1 / 3), i[0] = -g + 2 * h, i[4] = i[2] = -(h + g);
    return;
  }
  l = -l, f = l * l * l, f = Math.acos(u / Math.sqrt(f)), h = 2 * Math.sqrt(l), i[0] = -g + h * Math.cos(f / 3), i[2] = -g + h * Math.cos((f + 2 * Math.PI) / 3), i[4] = -g + h * Math.cos((f + 4 * Math.PI) / 3);
}, "solveCubic");
var Nd = m(function(e, t, a, n, i, s, o, l) {
  var u = 1 * a * a - 4 * a * i + 2 * a * o + 4 * i * i - 4 * i * o + o * o + n * n - 4 * n * s + 2 * n * l + 4 * s * s - 4 * s * l + l * l, f = 9 * a * i - 3 * a * a - 3 * a * o - 6 * i * i + 3 * i * o + 9 * n * s - 3 * n * n - 3 * n * l - 6 * s * s + 3 * s * l, c = 3 * a * a - 6 * a * i + a * o - a * e + 2 * i * i + 2 * i * e - o * e + 3 * n * n - 6 * n * s + n * l - n * t + 2 * s * s + 2 * s * t - l * t, d = 1 * a * i - a * a + a * e - i * e + n * s - n * n + n * t - s * t, g = [];
  Od(u, f, c, d, g);
  for (var h = 1e-7, m2 = [], p = 0; p < 6; p += 2) Math.abs(g[p + 1]) < h && g[p] >= 0 && g[p] <= 1 && m2.push(g[p]);
  m2.push(1), m2.push(0);
  for (var y = -1, b, w, x, C = 0; C < m2.length; C++) b = Math.pow(1 - m2[C], 2) * a + 2 * (1 - m2[C]) * m2[C] * i + m2[C] * m2[C] * o, w = Math.pow(1 - m2[C], 2) * n + 2 * (1 - m2[C]) * m2[C] * s + m2[C] * m2[C] * l, x = Math.pow(b - e, 2) + Math.pow(w - t, 2), y >= 0 ? x < y && (y = x) : y = x;
  return y;
}, "sqdistToQuadraticBezier");
var zd = m(function(e, t, a, n, i, s) {
  var o = [e - a, t - n], l = [i - a, s - n], u = l[0] * l[0] + l[1] * l[1], f = o[0] * o[0] + o[1] * o[1], c = o[0] * l[0] + o[1] * l[1], d = c * c / u;
  return c < 0 ? f : d > u ? (e - i) * (e - i) + (t - s) * (t - s) : f - d;
}, "sqdistToFiniteLine");
var kr = m(function(e, t, a) {
  for (var n, i, s, o, l, u = 0, f = 0; f < a.length / 2; f++) if (n = a[f * 2], i = a[f * 2 + 1], f + 1 < a.length / 2 ? (s = a[(f + 1) * 2], o = a[(f + 1) * 2 + 1]) : (s = a[(f + 1 - a.length / 2) * 2], o = a[(f + 1 - a.length / 2) * 2 + 1]), !(n == e && s == e)) if (n >= e && e >= s || n <= e && e <= s) l = (e - n) / (s - n) * (o - i) + i, l > t && u++;
  else continue;
  return u % 2 !== 0;
}, "pointInsidePolygonPoints");
var Qr = m(function(e, t, a, n, i, s, o, l, u) {
  var f = new Array(a.length), c;
  l[0] != null ? (c = Math.atan(l[1] / l[0]), l[0] < 0 ? c = c + Math.PI / 2 : c = -c - Math.PI / 2) : c = l;
  for (var d = Math.cos(-c), g = Math.sin(-c), h = 0; h < f.length / 2; h++) f[h * 2] = s / 2 * (a[h * 2] * d - a[h * 2 + 1] * g), f[h * 2 + 1] = o / 2 * (a[h * 2 + 1] * d + a[h * 2] * g), f[h * 2] += n, f[h * 2 + 1] += i;
  var m2;
  if (u > 0) {
    var p = Tn(f, -u);
    m2 = Cn(p);
  } else m2 = f;
  return kr(e, t, m2);
}, "pointInsidePolygon");
var Fd = m(function(e, t, a, n, i, s, o, l) {
  for (var u = new Array(a.length * 2), f = 0; f < l.length; f++) {
    var c = l[f];
    u[f * 4 + 0] = c.startX, u[f * 4 + 1] = c.startY, u[f * 4 + 2] = c.stopX, u[f * 4 + 3] = c.stopY;
    var d = Math.pow(c.cx - e, 2) + Math.pow(c.cy - t, 2);
    if (d <= Math.pow(c.radius, 2)) return true;
  }
  return kr(e, t, u);
}, "pointInsideRoundPolygon");
var Cn = m(function(e) {
  for (var t = new Array(e.length / 2), a, n, i, s, o, l, u, f, c = 0; c < e.length / 4; c++) {
    a = e[c * 4], n = e[c * 4 + 1], i = e[c * 4 + 2], s = e[c * 4 + 3], c < e.length / 4 - 1 ? (o = e[(c + 1) * 4], l = e[(c + 1) * 4 + 1], u = e[(c + 1) * 4 + 2], f = e[(c + 1) * 4 + 3]) : (o = e[0], l = e[1], u = e[2], f = e[3]);
    var d = st(a, n, i, s, o, l, u, f, true);
    t[c * 2] = d[0], t[c * 2 + 1] = d[1];
  }
  return t;
}, "joinLines");
var Tn = m(function(e, t) {
  for (var a = new Array(e.length * 2), n, i, s, o, l = 0; l < e.length / 2; l++) {
    n = e[l * 2], i = e[l * 2 + 1], l < e.length / 2 - 1 ? (s = e[(l + 1) * 2], o = e[(l + 1) * 2 + 1]) : (s = e[0], o = e[1]);
    var u = o - i, f = -(s - n), c = Math.sqrt(u * u + f * f), d = u / c, g = f / c;
    a[l * 4] = n + d * t, a[l * 4 + 1] = i + g * t, a[l * 4 + 2] = s + d * t, a[l * 4 + 3] = o + g * t;
  }
  return a;
}, "expandPolygon");
var Vd = m(function(e, t, a, n, i, s) {
  var o = a - e, l = n - t;
  o /= i, l /= s;
  var u = Math.sqrt(o * o + l * l), f = u - 1;
  if (f < 0) return [];
  var c = f / u;
  return [(a - e) * c + e, (n - t) * c + t];
}, "intersectLineEllipse");
var Bt = m(function(e, t, a, n, i, s, o) {
  return e -= i, t -= s, e /= a / 2 + o, t /= n / 2 + o, e * e + t * t <= 1;
}, "checkInEllipse");
var ma = m(function(e, t, a, n, i, s, o) {
  var l = [a - e, n - t], u = [e - i, t - s], f = l[0] * l[0] + l[1] * l[1], c = 2 * (u[0] * l[0] + u[1] * l[1]), d = u[0] * u[0] + u[1] * u[1] - o * o, g = c * c - 4 * f * d;
  if (g < 0) return [];
  var h = (-c + Math.sqrt(g)) / (2 * f), m2 = (-c - Math.sqrt(g)) / (2 * f), p = Math.min(h, m2), y = Math.max(h, m2), b = [];
  if (p >= 0 && p <= 1 && b.push(p), y >= 0 && y <= 1 && b.push(y), b.length === 0) return [];
  var w = b[0] * l[0] + e, x = b[0] * l[1] + t;
  if (b.length > 1) {
    if (b[0] == b[1]) return [w, x];
    var C = b[1] * l[0] + e, T = b[1] * l[1] + t;
    return [w, x, C, T];
  } else return [w, x];
}, "intersectLineCircle");
var yi = m(function(e, t, a) {
  return t <= e && e <= a || a <= e && e <= t ? e : e <= t && t <= a || a <= t && t <= e ? t : a;
}, "midOfThree");
var st = m(function(e, t, a, n, i, s, o, l, u) {
  var f = e - i, c = a - e, d = o - i, g = t - s, h = n - t, m2 = l - s, p = d * g - m2 * f, y = c * g - h * f, b = m2 * c - d * h;
  if (b !== 0) {
    var w = p / b, x = y / b, C = 1e-3, T = 0 - C, E = 1 + C;
    return T <= w && w <= E && T <= x && x <= E ? [e + w * c, t + w * h] : u ? [e + w * c, t + w * h] : [];
  } else return p === 0 || y === 0 ? yi(e, a, o) === o ? [o, l] : yi(e, a, i) === i ? [i, s] : yi(i, o, a) === a ? [a, n] : [] : [];
}, "finiteLinesIntersect");
var qd = m(function(e, t, a, n, i) {
  var s = [], o = n / 2, l = i / 2, u = t, f = a;
  s.push({ x: u + o * e[0], y: f + l * e[1] });
  for (var c = 1; c < e.length / 2; c++) s.push({ x: u + o * e[c * 2], y: f + l * e[c * 2 + 1] });
  return s;
}, "transformPoints");
var Ba = m(function(e, t, a, n, i, s, o, l) {
  var u = [], f, c = new Array(a.length), d = true;
  s == null && (d = false);
  var g;
  if (d) {
    for (var h = 0; h < c.length / 2; h++) c[h * 2] = a[h * 2] * s + n, c[h * 2 + 1] = a[h * 2 + 1] * o + i;
    if (l > 0) {
      var m2 = Tn(c, -l);
      g = Cn(m2);
    } else g = c;
  } else g = a;
  for (var p, y, b, w, x = 0; x < g.length / 2; x++) p = g[x * 2], y = g[x * 2 + 1], x < g.length / 2 - 1 ? (b = g[(x + 1) * 2], w = g[(x + 1) * 2 + 1]) : (b = g[0], w = g[1]), f = st(e, t, n, i, p, y, b, w), f.length !== 0 && u.push(f[0], f[1]);
  return u;
}, "polygonIntersectLine");
var _d = m(function(e, t, a, n, i, s, o, l, u) {
  var f = [], c, d = new Array(a.length * 2);
  u.forEach(function(b, w) {
    w === 0 ? (d[d.length - 2] = b.startX, d[d.length - 1] = b.startY) : (d[w * 4 - 2] = b.startX, d[w * 4 - 1] = b.startY), d[w * 4] = b.stopX, d[w * 4 + 1] = b.stopY, c = ma(e, t, n, i, b.cx, b.cy, b.radius), c.length !== 0 && f.push(c[0], c[1]);
  });
  for (var g = 0; g < d.length / 4; g++) c = st(e, t, n, i, d[g * 4], d[g * 4 + 1], d[g * 4 + 2], d[g * 4 + 3], false), c.length !== 0 && f.push(c[0], c[1]);
  if (f.length > 2) {
    for (var h = [f[0], f[1]], m2 = Math.pow(h[0] - e, 2) + Math.pow(h[1] - t, 2), p = 1; p < f.length / 2; p++) {
      var y = Math.pow(f[p * 2] - e, 2) + Math.pow(f[p * 2 + 1] - t, 2);
      y <= m2 && (h[0] = f[p * 2], h[1] = f[p * 2 + 1], m2 = y);
    }
    return h;
  }
  return f;
}, "roundPolygonIntersectLine");
var Qa = m(function(e, t, a) {
  var n = [e[0] - t[0], e[1] - t[1]], i = Math.sqrt(n[0] * n[0] + n[1] * n[1]), s = (i - a) / i;
  return s < 0 && (s = 1e-5), [t[0] + s * n[0], t[1] + s * n[1]];
}, "shortenIntersection");
var wr = m(function(e, t) {
  var a = As(e, t);
  return a = Ev(a), a;
}, "generateUnitNgonPointsFitToSquare");
var Ev = m(function(e) {
  for (var t, a, n = e.length / 2, i = 1 / 0, s = 1 / 0, o = -1 / 0, l = -1 / 0, u = 0; u < n; u++) t = e[2 * u], a = e[2 * u + 1], i = Math.min(i, t), o = Math.max(o, t), s = Math.min(s, a), l = Math.max(l, a);
  for (var f = 2 / (o - i), c = 2 / (l - s), d = 0; d < n; d++) t = e[2 * d] = e[2 * d] * f, a = e[2 * d + 1] = e[2 * d + 1] * c, i = Math.min(i, t), o = Math.max(o, t), s = Math.min(s, a), l = Math.max(l, a);
  if (s < -1) for (var g = 0; g < n; g++) a = e[2 * g + 1] = e[2 * g + 1] + (-1 - s);
  return e;
}, "fitPolygonToSquare");
var As = m(function(e, t) {
  var a = 1 / e * 2 * Math.PI, n = e % 2 === 0 ? Math.PI / 2 + a / 2 : Math.PI / 2;
  n += t;
  for (var i = new Array(e * 2), s, o = 0; o < e; o++) s = o * a + n, i[2 * o] = Math.cos(s), i[2 * o + 1] = Math.sin(-s);
  return i;
}, "generateUnitNgonPoints");
var ft = m(function(e, t) {
  return Math.min(e / 4, t / 4, 8);
}, "getRoundRectangleRadius");
var Cv = m(function(e, t) {
  return Math.min(e / 10, t / 10, 8);
}, "getRoundPolygonRadius");
var io = m(function() {
  return 8;
}, "getCutRectangleCornerLength");
var Gd = m(function(e, t, a) {
  return [e - 2 * t + a, 2 * (t - e), e];
}, "bezierPtsToQuadCoeff");
var Rs = m(function(e, t) {
  return { heightOffset: Math.min(15, 0.05 * t), widthOffset: Math.min(100, 0.25 * e), ctrlPtOffsetPct: 0.05 };
}, "getBarrelCurveConstants");
function mi(r, e) {
  function t(c) {
    for (var d = [], g = 0; g < c.length; g++) {
      var h = c[g], m2 = c[(g + 1) % c.length], p = { x: m2.x - h.x, y: m2.y - h.y }, y = { x: -p.y, y: p.x }, b = Math.sqrt(y.x * y.x + y.y * y.y);
      d.push({ x: y.x / b, y: y.y / b });
    }
    return d;
  }
  m(t, "getAxes");
  function a(c, d) {
    var g = 1 / 0, h = -1 / 0, m2 = Dr(c), p;
    try {
      for (m2.s(); !(p = m2.n()).done; ) {
        var y = p.value, b = y.x * d.x + y.y * d.y;
        g = Math.min(g, b), h = Math.max(h, b);
      }
    } catch (w) {
      m2.e(w);
    } finally {
      m2.f();
    }
    return { min: g, max: h };
  }
  m(a, "project");
  function n(c, d) {
    return !(c.max < d.min || d.max < c.min);
  }
  m(n, "overlaps");
  var i = [].concat(bn(t(r)), bn(t(e))), s = Dr(i), o;
  try {
    for (s.s(); !(o = s.n()).done; ) {
      var l = o.value, u = a(r, l), f = a(e, l);
      if (!n(u, f)) return false;
    }
  } catch (c) {
    s.e(c);
  } finally {
    s.f();
  }
  return true;
}
m(mi, "satPolygonIntersection");
var Hd = dr({ dampingFactor: 0.8, precision: 1e-6, iterations: 200, weight: m(function(e) {
  return 1;
}, "weight") });
var Wd = { pageRank: m(function(e) {
  for (var t = Hd(e), a = t.dampingFactor, n = t.precision, i = t.iterations, s = t.weight, o = this._private.cy, l = this.byGroup(), u = l.nodes, f = l.edges, c = u.length, d = c * c, g = f.length, h = new Array(d), m2 = new Array(c), p = (1 - a) / c, y = 0; y < c; y++) {
    for (var b = 0; b < c; b++) {
      var w = y * c + b;
      h[w] = 0;
    }
    m2[y] = 0;
  }
  for (var x = 0; x < g; x++) {
    var C = f[x], T = C.data("source"), E = C.data("target");
    if (T !== E) {
      var S = u.indexOfId(T), D = u.indexOfId(E), B = s(C), P = D * c + S;
      h[P] += B, m2[S] += B;
    }
  }
  for (var A = 1 / c + p, R = 0; R < c; R++) if (m2[R] === 0) for (var M = 0; M < c; M++) {
    var I = M * c + R;
    h[I] = A;
  }
  else for (var O = 0; O < c; O++) {
    var L = O * c + R;
    h[L] = h[L] / m2[R] + p;
  }
  for (var N = new Array(c), q = new Array(c), H, z = 0; z < c; z++) N[z] = 1;
  for (var V = 0; V < i; V++) {
    for (var K = 0; K < c; K++) q[K] = 0;
    for (var J = 0; J < c; J++) for (var X = 0; X < c; X++) {
      var ee = J * c + X;
      q[J] += h[ee] * N[X];
    }
    Td(q), H = N, N = q, q = H;
    for (var te = 0, ie = 0; ie < c; ie++) {
      var j = H[ie] - N[ie];
      te += j * j;
    }
    if (te < n) break;
  }
  var F = { rank: m(function(W) {
    return W = o.collection(W)[0], N[u.indexOf(W)];
  }, "rank") };
  return F;
}, "pageRank") };
var Yo = dr({ root: null, weight: m(function(e) {
  return 1;
}, "weight"), directed: false, alpha: 0 });
var Yt = { degreeCentralityNormalized: m(function(e) {
  e = Yo(e);
  var t = this.cy(), a = this.nodes(), n = a.length;
  if (e.directed) {
    for (var f = {}, c = {}, d = 0, g = 0, h = 0; h < n; h++) {
      var m2 = a[h], p = m2.id();
      e.root = m2;
      var y = this.degreeCentrality(e);
      d < y.indegree && (d = y.indegree), g < y.outdegree && (g = y.outdegree), f[p] = y.indegree, c[p] = y.outdegree;
    }
    return { indegree: m(function(w) {
      return d == 0 ? 0 : (pe(w) && (w = t.filter(w)), f[w.id()] / d);
    }, "indegree"), outdegree: m(function(w) {
      return g === 0 ? 0 : (pe(w) && (w = t.filter(w)), c[w.id()] / g);
    }, "outdegree") };
  } else {
    for (var i = {}, s = 0, o = 0; o < n; o++) {
      var l = a[o];
      e.root = l;
      var u = this.degreeCentrality(e);
      s < u.degree && (s = u.degree), i[l.id()] = u.degree;
    }
    return { degree: m(function(w) {
      return s === 0 ? 0 : (pe(w) && (w = t.filter(w)), i[w.id()] / s);
    }, "degree") };
  }
}, "degreeCentralityNormalized"), degreeCentrality: m(function(e) {
  e = Yo(e);
  var t = this.cy(), a = this, n = e, i = n.root, s = n.weight, o = n.directed, l = n.alpha;
  if (i = t.collection(i)[0], o) {
    for (var g = i.connectedEdges(), h = g.filter(function(T) {
      return T.target().same(i) && a.has(T);
    }), m2 = g.filter(function(T) {
      return T.source().same(i) && a.has(T);
    }), p = h.length, y = m2.length, b = 0, w = 0, x = 0; x < h.length; x++) b += s(h[x]);
    for (var C = 0; C < m2.length; C++) w += s(m2[C]);
    return { indegree: Math.pow(p, 1 - l) * Math.pow(b, l), outdegree: Math.pow(y, 1 - l) * Math.pow(w, l) };
  } else {
    for (var u = i.connectedEdges().intersection(a), f = u.length, c = 0, d = 0; d < u.length; d++) c += s(u[d]);
    return { degree: Math.pow(f, 1 - l) * Math.pow(c, l) };
  }
}, "degreeCentrality") };
Yt.dc = Yt.degreeCentrality;
Yt.dcn = Yt.degreeCentralityNormalised = Yt.degreeCentralityNormalized;
var Zo = dr({ harmonic: true, weight: m(function() {
  return 1;
}, "weight"), directed: false, root: null });
var Zt = { closenessCentralityNormalized: m(function(e) {
  for (var t = Zo(e), a = t.harmonic, n = t.weight, i = t.directed, s = this.cy(), o = {}, l = 0, u = this.nodes(), f = this.floydWarshall({ weight: n, directed: i }), c = 0; c < u.length; c++) {
    for (var d = 0, g = u[c], h = 0; h < u.length; h++) if (c !== h) {
      var m2 = f.distance(g, u[h]);
      a ? d += 1 / m2 : d += m2;
    }
    a || (d = 1 / d), l < d && (l = d), o[g.id()] = d;
  }
  return { closeness: m(function(y) {
    return l == 0 ? 0 : (pe(y) ? y = s.filter(y)[0].id() : y = y.id(), o[y] / l);
  }, "closeness") };
}, "closenessCentralityNormalized"), closenessCentrality: m(function(e) {
  var t = Zo(e), a = t.root, n = t.weight, i = t.directed, s = t.harmonic;
  a = this.filter(a)[0];
  for (var o = this.dijkstra({ root: a, weight: n, directed: i }), l = 0, u = this.nodes(), f = 0; f < u.length; f++) {
    var c = u[f];
    if (!c.same(a)) {
      var d = o.distanceTo(c);
      s ? l += 1 / d : l += d;
    }
  }
  return s ? l : 1 / l;
}, "closenessCentrality") };
Zt.cc = Zt.closenessCentrality;
Zt.ccn = Zt.closenessCentralityNormalised = Zt.closenessCentralityNormalized;
var $d = dr({ weight: null, directed: false });
var Ms = { betweennessCentrality: m(function(e) {
  for (var t = $d(e), a = t.directed, n = t.weight, i = n != null, s = this.cy(), o = this.nodes(), l = {}, u = {}, f = 0, c = { set: m(function(w, x) {
    u[w] = x, x > f && (f = x);
  }, "set"), get: m(function(w) {
    return u[w];
  }, "get") }, d = 0; d < o.length; d++) {
    var g = o[d], h = g.id();
    a ? l[h] = g.outgoers().nodes() : l[h] = g.openNeighborhood().nodes(), c.set(h, 0);
  }
  for (var m2 = m(function() {
    for (var w = o[p].id(), x = [], C = {}, T = {}, E = {}, S = new qa(function(J, X) {
      return E[J] - E[X];
    }), D = 0; D < o.length; D++) {
      var B = o[D].id();
      C[B] = [], T[B] = 0, E[B] = 1 / 0;
    }
    for (T[w] = 1, E[w] = 0, S.push(w); !S.empty(); ) {
      var P = S.pop();
      if (x.push(P), i) for (var A = 0; A < l[P].length; A++) {
        var R = l[P][A], M = s.getElementById(P), I = void 0;
        M.edgesTo(R).length > 0 ? I = M.edgesTo(R)[0] : I = R.edgesTo(M)[0];
        var O = n(I);
        R = R.id(), E[R] > E[P] + O && (E[R] = E[P] + O, S.nodes.indexOf(R) < 0 ? S.push(R) : S.updateItem(R), T[R] = 0, C[R] = []), E[R] == E[P] + O && (T[R] = T[R] + T[P], C[R].push(P));
      }
      else for (var L = 0; L < l[P].length; L++) {
        var N = l[P][L].id();
        E[N] == 1 / 0 && (S.push(N), E[N] = E[P] + 1), E[N] == E[P] + 1 && (T[N] = T[N] + T[P], C[N].push(P));
      }
    }
    for (var q = {}, H = 0; H < o.length; H++) q[o[H].id()] = 0;
    for (; x.length > 0; ) {
      for (var z = x.pop(), V = 0; V < C[z].length; V++) {
        var K = C[z][V];
        q[K] = q[K] + T[K] / T[z] * (1 + q[z]);
      }
      z != o[p].id() && c.set(z, c.get(z) + q[z]);
    }
  }, "_loop"), p = 0; p < o.length; p++) m2();
  var y = { betweenness: m(function(w) {
    var x = s.collection(w).id();
    return c.get(x);
  }, "betweenness"), betweennessNormalized: m(function(w) {
    if (f == 0) return 0;
    var x = s.collection(w).id();
    return c.get(x) / f;
  }, "betweennessNormalized") };
  return y.betweennessNormalised = y.betweennessNormalized, y;
}, "betweennessCentrality") };
Ms.bc = Ms.betweennessCentrality;
var Ud = dr({ expandFactor: 2, inflateFactor: 2, multFactor: 1, maxIterations: 20, attributes: [function(r) {
  return 1;
}] });
var Kd = m(function(e) {
  return Ud(e);
}, "setOptions");
var Xd = m(function(e, t) {
  for (var a = 0, n = 0; n < t.length; n++) a += t[n](e);
  return a;
}, "getSimilarity");
var Yd = m(function(e, t, a) {
  for (var n = 0; n < t; n++) e[n * t + n] = a;
}, "addLoops");
var Tv = m(function(e, t) {
  for (var a, n = 0; n < t; n++) {
    a = 0;
    for (var i = 0; i < t; i++) a += e[i * t + n];
    for (var s = 0; s < t; s++) e[s * t + n] = e[s * t + n] / a;
  }
}, "normalize");
var Zd = m(function(e, t, a) {
  for (var n = new Array(a * a), i = 0; i < a; i++) {
    for (var s = 0; s < a; s++) n[i * a + s] = 0;
    for (var o = 0; o < a; o++) for (var l = 0; l < a; l++) n[i * a + l] += e[i * a + o] * t[o * a + l];
  }
  return n;
}, "mmult");
var Qd = m(function(e, t, a) {
  for (var n = e.slice(0), i = 1; i < a; i++) e = Zd(e, n, t);
  return e;
}, "expand");
var Jd = m(function(e, t, a) {
  for (var n = new Array(t * t), i = 0; i < t * t; i++) n[i] = Math.pow(e[i], a);
  return Tv(n, t), n;
}, "inflate");
var jd = m(function(e, t, a, n) {
  for (var i = 0; i < a; i++) {
    var s = Math.round(e[i] * Math.pow(10, n)) / Math.pow(10, n), o = Math.round(t[i] * Math.pow(10, n)) / Math.pow(10, n);
    if (s !== o) return false;
  }
  return true;
}, "hasConverged");
var eh = m(function(e, t, a, n) {
  for (var i = [], s = 0; s < t; s++) {
    for (var o = [], l = 0; l < t; l++) Math.round(e[s * t + l] * 1e3) / 1e3 > 0 && o.push(a[l]);
    o.length !== 0 && i.push(n.collection(o));
  }
  return i;
}, "assign");
var rh = m(function(e, t) {
  for (var a = 0; a < e.length; a++) if (!t[a] || e[a].id() !== t[a].id()) return false;
  return true;
}, "isDuplicate");
var th = m(function(e) {
  for (var t = 0; t < e.length; t++) for (var a = 0; a < e.length; a++) t != a && rh(e[t], e[a]) && e.splice(a, 1);
  return e;
}, "removeDuplicates");
var Qo = m(function(e) {
  for (var t = this.nodes(), a = this.edges(), n = this.cy(), i = Kd(e), s = {}, o = 0; o < t.length; o++) s[t[o].id()] = o;
  for (var l = t.length, u = l * l, f = new Array(u), c, d = 0; d < u; d++) f[d] = 0;
  for (var g = 0; g < a.length; g++) {
    var h = a[g], m2 = s[h.source().id()], p = s[h.target().id()], y = Xd(h, i.attributes);
    f[m2 * l + p] += y, f[p * l + m2] += y;
  }
  Yd(f, l, i.multFactor), Tv(f, l);
  for (var b = true, w = 0; b && w < i.maxIterations; ) b = false, c = Qd(f, l, i.expandFactor), f = Jd(c, l, i.inflateFactor), jd(f, c, u, 4) || (b = true), w++;
  var x = eh(f, l, t, n);
  return x = th(x), x;
}, "markovClustering");
var ah = { markovClustering: Qo, mcl: Qo };
var nh = m(function(e) {
  return e;
}, "identity");
var Sv = m(function(e, t) {
  return Math.abs(t - e);
}, "absDiff");
var Jo = m(function(e, t, a) {
  return e + Sv(t, a);
}, "addAbsDiff");
var jo = m(function(e, t, a) {
  return e + Math.pow(a - t, 2);
}, "addSquaredDiff");
var ih = m(function(e) {
  return Math.sqrt(e);
}, "sqrt");
var sh = m(function(e, t, a) {
  return Math.max(e, Sv(t, a));
}, "maxAbsDiff");
var fa = m(function(e, t, a, n, i) {
  for (var s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : nh, o = n, l, u, f = 0; f < e; f++) l = t(f), u = a(f), o = i(o, l, u);
  return s(o);
}, "getDistance");
var jt = { euclidean: m(function(e, t, a) {
  return e >= 2 ? fa(e, t, a, 0, jo, ih) : fa(e, t, a, 0, Jo);
}, "euclidean"), squaredEuclidean: m(function(e, t, a) {
  return fa(e, t, a, 0, jo);
}, "squaredEuclidean"), manhattan: m(function(e, t, a) {
  return fa(e, t, a, 0, Jo);
}, "manhattan"), max: m(function(e, t, a) {
  return fa(e, t, a, -1 / 0, sh);
}, "max") };
jt["squared-euclidean"] = jt.squaredEuclidean;
jt.squaredeuclidean = jt.squaredEuclidean;
function zn(r, e, t, a, n, i) {
  var s;
  return Ke(r) ? s = r : s = jt[r] || jt.euclidean, e === 0 && Ke(r) ? s(n, i) : s(e, t, a, n, i);
}
m(zn, "clusteringDistance");
var oh = dr({ k: 2, m: 2, sensitivityThreshold: 1e-4, distance: "euclidean", maxIterations: 10, attributes: [], testMode: false, testCentroids: null });
var so = m(function(e) {
  return oh(e);
}, "setOptions");
var Sn = m(function(e, t, a, n, i) {
  var s = i !== "kMedoids", o = s ? function(c) {
    return a[c];
  } : function(c) {
    return n[c](a);
  }, l = m(function(d) {
    return n[d](t);
  }, "getQ"), u = a, f = t;
  return zn(e, n.length, o, l, u, f);
}, "getDist");
var bi = m(function(e, t, a) {
  for (var n = a.length, i = new Array(n), s = new Array(n), o = new Array(t), l = null, u = 0; u < n; u++) i[u] = e.min(a[u]).value, s[u] = e.max(a[u]).value;
  for (var f = 0; f < t; f++) {
    l = [];
    for (var c = 0; c < n; c++) l[c] = Math.random() * (s[c] - i[c]) + i[c];
    o[f] = l;
  }
  return o;
}, "randomCentroids");
var kv = m(function(e, t, a, n, i) {
  for (var s = 1 / 0, o = 0, l = 0; l < t.length; l++) {
    var u = Sn(a, e, t[l], n, i);
    u < s && (s = u, o = l);
  }
  return o;
}, "classify");
var Dv = m(function(e, t, a) {
  for (var n = [], i = null, s = 0; s < t.length; s++) i = t[s], a[i.id()] === e && n.push(i);
  return n;
}, "buildCluster");
var uh = m(function(e, t, a) {
  return Math.abs(t - e) <= a;
}, "haveValuesConverged");
var lh = m(function(e, t, a) {
  for (var n = 0; n < e.length; n++) for (var i = 0; i < e[n].length; i++) {
    var s = Math.abs(e[n][i] - t[n][i]);
    if (s > a) return false;
  }
  return true;
}, "haveMatricesConverged");
var vh = m(function(e, t, a) {
  for (var n = 0; n < a; n++) if (e === t[n]) return true;
  return false;
}, "seenBefore");
var eu = m(function(e, t) {
  var a = new Array(t);
  if (e.length < 50) for (var n = 0; n < t; n++) {
    for (var i = e[Math.floor(Math.random() * e.length)]; vh(i, a, n); ) i = e[Math.floor(Math.random() * e.length)];
    a[n] = i;
  }
  else for (var s = 0; s < t; s++) a[s] = e[Math.floor(Math.random() * e.length)];
  return a;
}, "randomMedoids");
var ru = m(function(e, t, a) {
  for (var n = 0, i = 0; i < t.length; i++) n += Sn("manhattan", t[i], e, a, "kMedoids");
  return n;
}, "findCost");
var fh = m(function(e) {
  var t = this.cy(), a = this.nodes(), n = null, i = so(e), s = new Array(i.k), o = {}, l;
  i.testMode ? typeof i.testCentroids == "number" ? (i.testCentroids, l = bi(a, i.k, i.attributes)) : nr(i.testCentroids) === "object" ? l = i.testCentroids : l = bi(a, i.k, i.attributes) : l = bi(a, i.k, i.attributes);
  for (var u = true, f = 0; u && f < i.maxIterations; ) {
    for (var c = 0; c < a.length; c++) n = a[c], o[n.id()] = kv(n, l, i.distance, i.attributes, "kMeans");
    u = false;
    for (var d = 0; d < i.k; d++) {
      var g = Dv(d, a, o);
      if (g.length !== 0) {
        for (var h = i.attributes.length, m2 = l[d], p = new Array(h), y = new Array(h), b = 0; b < h; b++) {
          y[b] = 0;
          for (var w = 0; w < g.length; w++) n = g[w], y[b] += i.attributes[b](n);
          p[b] = y[b] / g.length, uh(p[b], m2[b], i.sensitivityThreshold) || (u = true);
        }
        l[d] = p, s[d] = t.collection(g);
      }
    }
    f++;
  }
  return s;
}, "kMeans");
var ch = m(function(e) {
  var t = this.cy(), a = this.nodes(), n = null, i = so(e), s = new Array(i.k), o, l = {}, u, f = new Array(i.k);
  i.testMode ? typeof i.testCentroids == "number" || (nr(i.testCentroids) === "object" ? o = i.testCentroids : o = eu(a, i.k)) : o = eu(a, i.k);
  for (var c = true, d = 0; c && d < i.maxIterations; ) {
    for (var g = 0; g < a.length; g++) n = a[g], l[n.id()] = kv(n, o, i.distance, i.attributes, "kMedoids");
    c = false;
    for (var h = 0; h < o.length; h++) {
      var m2 = Dv(h, a, l);
      if (m2.length !== 0) {
        f[h] = ru(o[h], m2, i.attributes);
        for (var p = 0; p < m2.length; p++) u = ru(m2[p], m2, i.attributes), u < f[h] && (f[h] = u, o[h] = m2[p], c = true);
        s[h] = t.collection(m2);
      }
    }
    d++;
  }
  return s;
}, "kMedoids");
var dh = m(function(e, t, a, n, i) {
  for (var s, o, l = 0; l < t.length; l++) for (var u = 0; u < e.length; u++) n[l][u] = Math.pow(a[l][u], i.m);
  for (var f = 0; f < e.length; f++) for (var c = 0; c < i.attributes.length; c++) {
    s = 0, o = 0;
    for (var d = 0; d < t.length; d++) s += n[d][f] * i.attributes[c](t[d]), o += n[d][f];
    e[f][c] = s / o;
  }
}, "updateCentroids");
var hh = m(function(e, t, a, n, i) {
  for (var s = 0; s < e.length; s++) t[s] = e[s].slice();
  for (var o, l, u, f = 2 / (i.m - 1), c = 0; c < a.length; c++) for (var d = 0; d < n.length; d++) {
    o = 0;
    for (var g = 0; g < a.length; g++) l = Sn(i.distance, n[d], a[c], i.attributes, "cmeans"), u = Sn(i.distance, n[d], a[g], i.attributes, "cmeans"), o += Math.pow(l / u, f);
    e[d][c] = 1 / o;
  }
}, "updateMembership");
var gh = m(function(e, t, a, n) {
  for (var i = new Array(a.k), s = 0; s < i.length; s++) i[s] = [];
  for (var o, l, u = 0; u < t.length; u++) {
    o = -1 / 0, l = -1;
    for (var f = 0; f < t[0].length; f++) t[u][f] > o && (o = t[u][f], l = f);
    i[l].push(e[u]);
  }
  for (var c = 0; c < i.length; c++) i[c] = n.collection(i[c]);
  return i;
}, "assign");
var tu = m(function(e) {
  var t = this.cy(), a = this.nodes(), n = so(e), i, s, o, l, u;
  l = new Array(a.length);
  for (var f = 0; f < a.length; f++) l[f] = new Array(n.k);
  o = new Array(a.length);
  for (var c = 0; c < a.length; c++) o[c] = new Array(n.k);
  for (var d = 0; d < a.length; d++) {
    for (var g = 0, h = 0; h < n.k; h++) o[d][h] = Math.random(), g += o[d][h];
    for (var m2 = 0; m2 < n.k; m2++) o[d][m2] = o[d][m2] / g;
  }
  s = new Array(n.k);
  for (var p = 0; p < n.k; p++) s[p] = new Array(n.attributes.length);
  u = new Array(a.length);
  for (var y = 0; y < a.length; y++) u[y] = new Array(n.k);
  for (var b = true, w = 0; b && w < n.maxIterations; ) b = false, dh(s, a, o, u, n), hh(o, l, s, a, n), lh(o, l, n.sensitivityThreshold) || (b = true), w++;
  return i = gh(a, o, n, t), { clusters: i, degreeOfMembership: o };
}, "fuzzyCMeans");
var ph = { kMeans: fh, kMedoids: ch, fuzzyCMeans: tu, fcm: tu };
var yh = dr({ distance: "euclidean", linkage: "min", mode: "threshold", threshold: 1 / 0, addDendrogram: false, dendrogramDepth: 0, attributes: [] });
var mh = { single: "min", complete: "max" };
var bh = m(function(e) {
  var t = yh(e), a = mh[t.linkage];
  return a != null && (t.linkage = a), t;
}, "setOptions");
var au = m(function(e, t, a, n, i) {
  for (var s = 0, o = 1 / 0, l, u = i.attributes, f = m(function(D, B) {
    return zn(i.distance, u.length, function(P) {
      return u[P](D);
    }, function(P) {
      return u[P](B);
    }, D, B);
  }, "getDist"), c = 0; c < e.length; c++) {
    var d = e[c].key, g = a[d][n[d]];
    g < o && (s = d, o = g);
  }
  if (i.mode === "threshold" && o >= i.threshold || i.mode === "dendrogram" && e.length === 1) return false;
  var h = t[s], m2 = t[n[s]], p;
  i.mode === "dendrogram" ? p = { left: h, right: m2, key: h.key } : p = { value: h.value.concat(m2.value), key: h.key }, e[h.index] = p, e.splice(m2.index, 1), t[h.key] = p;
  for (var y = 0; y < e.length; y++) {
    var b = e[y];
    h.key === b.key ? l = 1 / 0 : i.linkage === "min" ? (l = a[h.key][b.key], a[h.key][b.key] > a[m2.key][b.key] && (l = a[m2.key][b.key])) : i.linkage === "max" ? (l = a[h.key][b.key], a[h.key][b.key] < a[m2.key][b.key] && (l = a[m2.key][b.key])) : i.linkage === "mean" ? l = (a[h.key][b.key] * h.size + a[m2.key][b.key] * m2.size) / (h.size + m2.size) : i.mode === "dendrogram" ? l = f(b.value, h.value) : l = f(b.value[0], h.value[0]), a[h.key][b.key] = a[b.key][h.key] = l;
  }
  for (var w = 0; w < e.length; w++) {
    var x = e[w].key;
    if (n[x] === h.key || n[x] === m2.key) {
      for (var C = x, T = 0; T < e.length; T++) {
        var E = e[T].key;
        a[x][E] < a[x][C] && (C = E);
      }
      n[x] = C;
    }
    e[w].index = w;
  }
  return h.key = m2.key = h.index = m2.index = null, true;
}, "mergeClosest");
var Ut = m(function(e, t, a) {
  e && (e.value ? t.push(e.value) : (e.left && Ut(e.left, t), e.right && Ut(e.right, t)));
}, "getAllChildren");
var Ls = m(function(e, t) {
  if (!e) return "";
  if (e.left && e.right) {
    var a = Ls(e.left, t), n = Ls(e.right, t), i = t.add({ group: "nodes", data: { id: a + "," + n } });
    return t.add({ group: "edges", data: { source: a, target: i.id() } }), t.add({ group: "edges", data: { source: n, target: i.id() } }), i.id();
  } else if (e.value) return e.value.id();
}, "buildDendrogram");
var Is = m(function(e, t, a) {
  if (!e) return [];
  var n = [], i = [], s = [];
  return t === 0 ? (e.left && Ut(e.left, n), e.right && Ut(e.right, i), s = n.concat(i), [a.collection(s)]) : t === 1 ? e.value ? [a.collection(e.value)] : (e.left && Ut(e.left, n), e.right && Ut(e.right, i), [a.collection(n), a.collection(i)]) : e.value ? [a.collection(e.value)] : (e.left && (n = Is(e.left, t - 1, a)), e.right && (i = Is(e.right, t - 1, a)), n.concat(i));
}, "buildClustersFromTree");
var nu = m(function(e) {
  for (var t = this.cy(), a = this.nodes(), n = bh(e), i = n.attributes, s = m(function(w, x) {
    return zn(n.distance, i.length, function(C) {
      return i[C](w);
    }, function(C) {
      return i[C](x);
    }, w, x);
  }, "getDist"), o = [], l = [], u = [], f = [], c = 0; c < a.length; c++) {
    var d = { value: n.mode === "dendrogram" ? a[c] : [a[c]], key: c, index: c };
    o[c] = d, f[c] = d, l[c] = [], u[c] = 0;
  }
  for (var g = 0; g < o.length; g++) for (var h = 0; h <= g; h++) {
    var m2 = void 0;
    n.mode === "dendrogram" ? m2 = g === h ? 1 / 0 : s(o[g].value, o[h].value) : m2 = g === h ? 1 / 0 : s(o[g].value[0], o[h].value[0]), l[g][h] = m2, l[h][g] = m2, m2 < l[g][u[g]] && (u[g] = h);
  }
  for (var p = au(o, f, l, u, n); p; ) p = au(o, f, l, u, n);
  var y;
  return n.mode === "dendrogram" ? (y = Is(o[0], n.dendrogramDepth, t), n.addDendrogram && Ls(o[0], t)) : (y = new Array(o.length), o.forEach(function(b, w) {
    b.key = b.index = null, y[w] = t.collection(b.value);
  })), y;
}, "hierarchicalClustering");
var wh = { hierarchicalClustering: nu, hca: nu };
var xh = dr({ distance: "euclidean", preference: "median", damping: 0.8, maxIterations: 1e3, minIterations: 100, attributes: [] });
var Eh = m(function(e) {
  var t = e.damping, a = e.preference;
  0.5 <= t && t < 1 || Ue("Damping must range on [0.5, 1).  Got: ".concat(t));
  var n = ["median", "mean", "min", "max"];
  return n.some(function(i) {
    return i === a;
  }) || ne(a) || Ue("Preference must be one of [".concat(n.map(function(i) {
    return "'".concat(i, "'");
  }).join(", "), "] or a number.  Got: ").concat(a)), xh(e);
}, "setOptions");
var Ch = m(function(e, t, a, n) {
  var i = m(function(o, l) {
    return n[l](o);
  }, "attr");
  return -zn(e, n.length, function(s) {
    return i(t, s);
  }, function(s) {
    return i(a, s);
  }, t, a);
}, "getSimilarity");
var Th = m(function(e, t) {
  var a = null;
  return t === "median" ? a = Ed(e) : t === "mean" ? a = xd(e) : t === "min" ? a = bd(e) : t === "max" ? a = wd(e) : a = t, a;
}, "getPreference");
var Sh = m(function(e, t, a) {
  for (var n = [], i = 0; i < e; i++) t[i * e + i] + a[i * e + i] > 0 && n.push(i);
  return n;
}, "findExemplars");
var iu = m(function(e, t, a) {
  for (var n = [], i = 0; i < e; i++) {
    for (var s = -1, o = -1 / 0, l = 0; l < a.length; l++) {
      var u = a[l];
      t[i * e + u] > o && (s = u, o = t[i * e + u]);
    }
    s > 0 && n.push(s);
  }
  for (var f = 0; f < a.length; f++) n[a[f]] = a[f];
  return n;
}, "assignClusters");
var kh = m(function(e, t, a) {
  for (var n = iu(e, t, a), i = 0; i < a.length; i++) {
    for (var s = [], o = 0; o < n.length; o++) n[o] === a[i] && s.push(o);
    for (var l = -1, u = -1 / 0, f = 0; f < s.length; f++) {
      for (var c = 0, d = 0; d < s.length; d++) c += t[s[d] * e + s[f]];
      c > u && (l = f, u = c);
    }
    a[i] = s[l];
  }
  return n = iu(e, t, a), n;
}, "assign");
var su = m(function(e) {
  for (var t = this.cy(), a = this.nodes(), n = Eh(e), i = {}, s = 0; s < a.length; s++) i[a[s].id()] = s;
  var o, l, u, f, c, d;
  o = a.length, l = o * o, u = new Array(l);
  for (var g = 0; g < l; g++) u[g] = -1 / 0;
  for (var h = 0; h < o; h++) for (var m2 = 0; m2 < o; m2++) h !== m2 && (u[h * o + m2] = Ch(n.distance, a[h], a[m2], n.attributes));
  f = Th(u, n.preference);
  for (var p = 0; p < o; p++) u[p * o + p] = f;
  c = new Array(l);
  for (var y = 0; y < l; y++) c[y] = 0;
  d = new Array(l);
  for (var b = 0; b < l; b++) d[b] = 0;
  for (var w = new Array(o), x = new Array(o), C = new Array(o), T = 0; T < o; T++) w[T] = 0, x[T] = 0, C[T] = 0;
  for (var E = new Array(o * n.minIterations), S = 0; S < E.length; S++) E[S] = 0;
  var D;
  for (D = 0; D < n.maxIterations; D++) {
    for (var B = 0; B < o; B++) {
      for (var P = -1 / 0, A = -1 / 0, R = -1, M = 0, I = 0; I < o; I++) w[I] = c[B * o + I], M = d[B * o + I] + u[B * o + I], M >= P ? (A = P, P = M, R = I) : M > A && (A = M);
      for (var O = 0; O < o; O++) c[B * o + O] = (1 - n.damping) * (u[B * o + O] - P) + n.damping * w[O];
      c[B * o + R] = (1 - n.damping) * (u[B * o + R] - A) + n.damping * w[R];
    }
    for (var L = 0; L < o; L++) {
      for (var N = 0, q = 0; q < o; q++) w[q] = d[q * o + L], x[q] = Math.max(0, c[q * o + L]), N += x[q];
      N -= x[L], x[L] = c[L * o + L], N += x[L];
      for (var H = 0; H < o; H++) d[H * o + L] = (1 - n.damping) * Math.min(0, N - x[H]) + n.damping * w[H];
      d[L * o + L] = (1 - n.damping) * (N - x[L]) + n.damping * w[L];
    }
    for (var z = 0, V = 0; V < o; V++) {
      var K = d[V * o + V] + c[V * o + V] > 0 ? 1 : 0;
      E[D % n.minIterations * o + V] = K, z += K;
    }
    if (z > 0 && (D >= n.minIterations - 1 || D == n.maxIterations - 1)) {
      for (var J = 0, X = 0; X < o; X++) {
        C[X] = 0;
        for (var ee = 0; ee < n.minIterations; ee++) C[X] += E[ee * o + X];
        (C[X] === 0 || C[X] === n.minIterations) && J++;
      }
      if (J === o) break;
    }
  }
  for (var te = Sh(o, c, d), ie = kh(o, u, te), j = {}, F = 0; F < te.length; F++) j[te[F]] = [];
  for (var _ = 0; _ < a.length; _++) {
    var W = i[a[_].id()], Z = ie[W];
    Z != null && j[Z].push(a[_]);
  }
  for (var ae = new Array(te.length), de = 0; de < te.length; de++) ae[de] = t.collection(j[te[de]]);
  return ae;
}, "affinityPropagation");
var Dh = { affinityPropagation: su, ap: su };
var Bh = dr({ root: void 0, directed: false });
var Ph = { hierholzer: m(function(e) {
  if (!Ie(e)) {
    var t = arguments;
    e = { root: t[0], directed: t[1] };
  }
  var a = Bh(e), n = a.root, i = a.directed, s = this, o = false, l, u, f;
  n && (f = pe(n) ? this.filter(n)[0].id() : n[0].id());
  var c = {}, d = {};
  i ? s.forEach(function(b) {
    var w = b.id();
    if (b.isNode()) {
      var x = b.indegree(true), C = b.outdegree(true), T = x - C, E = C - x;
      T == 1 ? l ? o = true : l = w : E == 1 ? u ? o = true : u = w : (E > 1 || T > 1) && (o = true), c[w] = [], b.outgoers().forEach(function(S) {
        S.isEdge() && c[w].push(S.id());
      });
    } else d[w] = [void 0, b.target().id()];
  }) : s.forEach(function(b) {
    var w = b.id();
    if (b.isNode()) {
      var x = b.degree(true);
      x % 2 && (l ? u ? o = true : u = w : l = w), c[w] = [], b.connectedEdges().forEach(function(C) {
        return c[w].push(C.id());
      });
    } else d[w] = [b.source().id(), b.target().id()];
  });
  var g = { found: false, trail: void 0 };
  if (o) return g;
  if (u && l) if (i) {
    if (f && u != f) return g;
    f = u;
  } else {
    if (f && u != f && l != f) return g;
    f || (f = u);
  }
  else f || (f = s[0].id());
  var h = m(function(w) {
    for (var x = w, C = [w], T, E, S; c[x].length; ) T = c[x].shift(), E = d[T][0], S = d[T][1], x != S ? (c[S] = c[S].filter(function(D) {
      return D != T;
    }), x = S) : !i && x != E && (c[E] = c[E].filter(function(D) {
      return D != T;
    }), x = E), C.unshift(T), C.unshift(x);
    return C;
  }, "walk"), m2 = [], p = [];
  for (p = h(f); p.length != 1; ) c[p[0]].length == 0 ? (m2.unshift(s.getElementById(p.shift())), m2.unshift(s.getElementById(p.shift()))) : p = h(p.shift()).concat(p);
  m2.unshift(s.getElementById(p.shift()));
  for (var y in c) if (c[y].length) return g;
  return g.found = true, g.trail = this.spawn(m2, true), g;
}, "hierholzer") };
var Ja = m(function() {
  var e = this, t = {}, a = 0, n = 0, i = [], s = [], o = {}, l = m(function(d, g) {
    for (var h = s.length - 1, m2 = [], p = e.spawn(); s[h].x != d || s[h].y != g; ) m2.push(s.pop().edge), h--;
    m2.push(s.pop().edge), m2.forEach(function(y) {
      var b = y.connectedNodes().intersection(e);
      p.merge(y), b.forEach(function(w) {
        var x = w.id(), C = w.connectedEdges().intersection(e);
        p.merge(w), t[x].cutVertex ? p.merge(C.filter(function(T) {
          return T.isLoop();
        })) : p.merge(C);
      });
    }), i.push(p);
  }, "buildComponent"), u = m(function(d, g, h) {
    d === h && (n += 1), t[g] = { id: a, low: a++, cutVertex: false };
    var m2 = e.getElementById(g).connectedEdges().intersection(e);
    if (m2.size() === 0) i.push(e.spawn(e.getElementById(g)));
    else {
      var p, y, b, w;
      m2.forEach(function(x) {
        p = x.source().id(), y = x.target().id(), b = p === g ? y : p, b !== h && (w = x.id(), o[w] || (o[w] = true, s.push({ x: g, y: b, edge: x })), b in t ? t[g].low = Math.min(t[g].low, t[b].id) : (u(d, b, g), t[g].low = Math.min(t[g].low, t[b].low), t[g].id <= t[b].low && (t[g].cutVertex = true, l(g, b))));
      });
    }
  }, "biconnectedSearch");
  e.forEach(function(c) {
    if (c.isNode()) {
      var d = c.id();
      d in t || (n = 0, u(d, d), t[d].cutVertex = n > 1);
    }
  });
  var f = Object.keys(t).filter(function(c) {
    return t[c].cutVertex;
  }).map(function(c) {
    return e.getElementById(c);
  });
  return { cut: e.spawn(f), components: i };
}, "hopcroftTarjanBiconnected");
var Ah = { hopcroftTarjanBiconnected: Ja, htbc: Ja, htb: Ja, hopcroftTarjanBiconnectedComponents: Ja };
var ja = m(function() {
  var e = this, t = {}, a = 0, n = [], i = [], s = e.spawn(e), o = m(function(u) {
    i.push(u), t[u] = { index: a, low: a++, explored: false };
    var f = e.getElementById(u).connectedEdges().intersection(e);
    if (f.forEach(function(m2) {
      var p = m2.target().id();
      p !== u && (p in t || o(p), t[p].explored || (t[u].low = Math.min(t[u].low, t[p].low)));
    }), t[u].index === t[u].low) {
      for (var c = e.spawn(); ; ) {
        var d = i.pop();
        if (c.merge(e.getElementById(d)), t[d].low = t[u].index, t[d].explored = true, d === u) break;
      }
      var g = c.edgesWith(c), h = c.merge(g);
      n.push(h), s = s.difference(h);
    }
  }, "stronglyConnectedSearch");
  return e.forEach(function(l) {
    if (l.isNode()) {
      var u = l.id();
      u in t || o(u);
    }
  }), { cut: s, components: n };
}, "tarjanStronglyConnected");
var Rh = { tarjanStronglyConnected: ja, tsc: ja, tscc: ja, tarjanStronglyConnectedComponents: ja };
var Bv = {};
[ka, od, ud, vd, cd, hd, yd, Wd, Yt, Zt, Ms, ah, ph, wh, Dh, Ph, Ah, Rh].forEach(function(r) {
  we(Bv, r);
});
var Pv = 0;
var Av = 1;
var Rv = 2;
var zr = m(function(e) {
  if (!(this instanceof zr)) return new zr(e);
  this.id = "Thenable/1.0.7", this.state = Pv, this.fulfillValue = void 0, this.rejectReason = void 0, this.onFulfilled = [], this.onRejected = [], this.proxy = { then: this.then.bind(this) }, typeof e == "function" && e.call(this, this.fulfill.bind(this), this.reject.bind(this));
}, "api");
zr.prototype = { fulfill: m(function(e) {
  return ou(this, Av, "fulfillValue", e);
}, "fulfill"), reject: m(function(e) {
  return ou(this, Rv, "rejectReason", e);
}, "reject"), then: m(function(e, t) {
  var a = this, n = new zr();
  return a.onFulfilled.push(lu(e, n, "fulfill")), a.onRejected.push(lu(t, n, "reject")), Mv(a), n.proxy;
}, "then") };
var ou = m(function(e, t, a, n) {
  return e.state === Pv && (e.state = t, e[a] = n, Mv(e)), e;
}, "deliver");
var Mv = m(function(e) {
  e.state === Av ? uu(e, "onFulfilled", e.fulfillValue) : e.state === Rv && uu(e, "onRejected", e.rejectReason);
}, "execute");
var uu = m(function(e, t, a) {
  if (e[t].length !== 0) {
    var n = e[t];
    e[t] = [];
    var i = m(function() {
      for (var o = 0; o < n.length; o++) n[o](a);
    }, "func");
    typeof setImmediate == "function" ? setImmediate(i) : setTimeout(i, 0);
  }
}, "execute_handlers");
var lu = m(function(e, t, a) {
  return function(n) {
    if (typeof e != "function") t[a].call(t, n);
    else {
      var i;
      try {
        i = e(n);
      } catch (s) {
        t.reject(s);
        return;
      }
      Lv(t, i);
    }
  };
}, "resolver");
var Lv = m(function(e, t) {
  if (e === t || e.proxy === t) {
    e.reject(new TypeError("cannot resolve promise with itself"));
    return;
  }
  var a;
  if (nr(t) === "object" && t !== null || typeof t == "function") try {
    a = t.then;
  } catch (i) {
    e.reject(i);
    return;
  }
  if (typeof a == "function") {
    var n = false;
    try {
      a.call(t, function(i) {
        n || (n = true, i === t ? e.reject(new TypeError("circular thenable chain")) : Lv(e, i));
      }, function(i) {
        n || (n = true, e.reject(i));
      });
    } catch (i) {
      n || e.reject(i);
    }
    return;
  }
  e.fulfill(t);
}, "resolve");
zr.all = function(r) {
  return new zr(function(e, t) {
    for (var a = new Array(r.length), n = 0, i = m(function(l, u) {
      a[l] = u, n++, n === r.length && e(a);
    }, "fulfill"), s = 0; s < r.length; s++) (function(o) {
      var l = r[o], u = l != null && l.then != null;
      if (u) l.then(function(c) {
        i(o, c);
      }, function(c) {
        t(c);
      });
      else {
        var f = l;
        i(o, f);
      }
    })(s);
  });
};
zr.resolve = function(r) {
  return new zr(function(e, t) {
    e(r);
  });
};
zr.reject = function(r) {
  return new zr(function(e, t) {
    t(r);
  });
};
var aa = typeof Promise < "u" ? Promise : zr;
var Os = m(function(e, t, a) {
  var n = Zs(e), i = !n, s = this._private = we({ duration: 1e3 }, t, a);
  if (s.target = e, s.style = s.style || s.css, s.started = false, s.playing = false, s.hooked = false, s.applying = false, s.progress = 0, s.completes = [], s.frames = [], s.complete && Ke(s.complete) && s.completes.push(s.complete), i) {
    var o = e.position();
    s.startPosition = s.startPosition || { x: o.x, y: o.y }, s.startStyle = s.startStyle || e.cy().style().getAnimationStartStyle(e, s.style);
  }
  if (n) {
    var l = e.pan();
    s.startPan = { x: l.x, y: l.y }, s.startZoom = e.zoom();
  }
  this.length = 1, this[0] = this;
}, "Animation");
var Rt = Os.prototype;
we(Rt, { instanceString: m(function() {
  return "animation";
}, "instanceString"), hook: m(function() {
  var e = this._private;
  if (!e.hooked) {
    var t, a = e.target._private.animation;
    e.queue ? t = a.queue : t = a.current, t.push(this), Br(e.target) && e.target.cy().addToAnimationPool(e.target), e.hooked = true;
  }
  return this;
}, "hook"), play: m(function() {
  var e = this._private;
  return e.progress === 1 && (e.progress = 0), e.playing = true, e.started = false, e.stopped = false, this.hook(), this;
}, "play"), playing: m(function() {
  return this._private.playing;
}, "playing"), apply: m(function() {
  var e = this._private;
  return e.applying = true, e.started = false, e.stopped = false, this.hook(), this;
}, "apply"), applying: m(function() {
  return this._private.applying;
}, "applying"), pause: m(function() {
  var e = this._private;
  return e.playing = false, e.started = false, this;
}, "pause"), stop: m(function() {
  var e = this._private;
  return e.playing = false, e.started = false, e.stopped = true, this;
}, "stop"), rewind: m(function() {
  return this.progress(0);
}, "rewind"), fastforward: m(function() {
  return this.progress(1);
}, "fastforward"), time: m(function(e) {
  var t = this._private;
  return e === void 0 ? t.progress * t.duration : this.progress(e / t.duration);
}, "time"), progress: m(function(e) {
  var t = this._private, a = t.playing;
  return e === void 0 ? t.progress : (a && this.pause(), t.progress = e, t.started = false, a && this.play(), this);
}, "progress"), completed: m(function() {
  return this._private.progress === 1;
}, "completed"), reverse: m(function() {
  var e = this._private, t = e.playing;
  t && this.pause(), e.progress = 1 - e.progress, e.started = false;
  var a = m(function(u, f) {
    var c = e[u];
    c != null && (e[u] = e[f], e[f] = c);
  }, "swap");
  if (a("zoom", "startZoom"), a("pan", "startPan"), a("position", "startPosition"), e.style) for (var n = 0; n < e.style.length; n++) {
    var i = e.style[n], s = i.name, o = e.startStyle[s];
    e.startStyle[s] = i, e.style[n] = o;
  }
  return t && this.play(), this;
}, "reverse"), promise: m(function(e) {
  var t = this._private, a;
  switch (e) {
    case "frame":
      a = t.frames;
      break;
    default:
    case "complete":
    case "completed":
      a = t.completes;
  }
  return new aa(function(n, i) {
    a.push(function() {
      n();
    });
  });
}, "promise") });
Rt.complete = Rt.completed;
Rt.run = Rt.play;
Rt.running = Rt.playing;
var Mh = { animated: m(function() {
  return m(function() {
    var t = this, a = t.length !== void 0, n = a ? t : [t], i = this._private.cy || this;
    if (!i.styleEnabled()) return false;
    var s = n[0];
    if (s) return s._private.animation.current.length > 0;
  }, "animatedImpl");
}, "animated"), clearQueue: m(function() {
  return m(function() {
    var t = this, a = t.length !== void 0, n = a ? t : [t], i = this._private.cy || this;
    if (!i.styleEnabled()) return this;
    for (var s = 0; s < n.length; s++) {
      var o = n[s];
      o._private.animation.queue = [];
    }
    return this;
  }, "clearQueueImpl");
}, "clearQueue"), delay: m(function() {
  return m(function(t, a) {
    var n = this._private.cy || this;
    return n.styleEnabled() ? this.animate({ delay: t, duration: t, complete: a }) : this;
  }, "delayImpl");
}, "delay"), delayAnimation: m(function() {
  return m(function(t, a) {
    var n = this._private.cy || this;
    return n.styleEnabled() ? this.animation({ delay: t, duration: t, complete: a }) : this;
  }, "delayAnimationImpl");
}, "delayAnimation"), animation: m(function() {
  return m(function(t, a) {
    var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this, l = !i, u = !l;
    if (!o.styleEnabled()) return this;
    var f = o.style();
    t = we({}, t, a);
    var c = Object.keys(t).length === 0;
    if (c) return new Os(s[0], t);
    switch (t.duration === void 0 && (t.duration = 400), t.duration) {
      case "slow":
        t.duration = 600;
        break;
      case "fast":
        t.duration = 200;
        break;
    }
    if (u && (t.style = f.getPropsList(t.style || t.css), t.css = void 0), u && t.renderedPosition != null) {
      var d = t.renderedPosition, g = o.pan(), h = o.zoom();
      t.position = mv(d, h, g);
    }
    if (l && t.panBy != null) {
      var m2 = t.panBy, p = o.pan();
      t.pan = { x: p.x + m2.x, y: p.y + m2.y };
    }
    var y = t.center || t.centre;
    if (l && y != null) {
      var b = o.getCenterPan(y.eles, t.zoom);
      b != null && (t.pan = b);
    }
    if (l && t.fit != null) {
      var w = t.fit, x = o.getFitViewport(w.eles || w.boundingBox, w.padding);
      x != null && (t.pan = x.pan, t.zoom = x.zoom);
    }
    if (l && Ie(t.zoom)) {
      var C = o.getZoomedViewport(t.zoom);
      C != null ? (C.zoomed && (t.zoom = C.zoom), C.panned && (t.pan = C.pan)) : t.zoom = null;
    }
    return new Os(s[0], t);
  }, "animationImpl");
}, "animation"), animate: m(function() {
  return m(function(t, a) {
    var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this;
    if (!o.styleEnabled()) return this;
    a && (t = we({}, t, a));
    for (var l = 0; l < s.length; l++) {
      var u = s[l], f = u.animated() && (t.queue === void 0 || t.queue), c = u.animation(t, f ? { queue: true } : void 0);
      c.play();
    }
    return this;
  }, "animateImpl");
}, "animate"), stop: m(function() {
  return m(function(t, a) {
    var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this;
    if (!o.styleEnabled()) return this;
    for (var l = 0; l < s.length; l++) {
      for (var u = s[l], f = u._private, c = f.animation.current, d = 0; d < c.length; d++) {
        var g = c[d], h = g._private;
        a && (h.duration = 0);
      }
      t && (f.animation.queue = []), a || (f.animation.current = []);
    }
    return o.notify("draw"), this;
  }, "stopImpl");
}, "stop") };
var wi;
var vu;
function Fn() {
  if (vu) return wi;
  vu = 1;
  var r = Array.isArray;
  return wi = r, wi;
}
m(Fn, "requireIsArray");
var xi;
var fu;
function Lh() {
  if (fu) return xi;
  fu = 1;
  var r = Fn(), e = Fa(), t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a = /^\w*$/;
  function n(i, s) {
    if (r(i)) return false;
    var o = typeof i;
    return o == "number" || o == "symbol" || o == "boolean" || i == null || e(i) ? true : a.test(i) || !t.test(i) || s != null && i in Object(s);
  }
  return m(n, "isKey"), xi = n, xi;
}
m(Lh, "require_isKey");
var Ei;
var cu;
function Ih() {
  if (cu) return Ei;
  cu = 1;
  var r = lv(), e = za(), t = "[object AsyncFunction]", a = "[object Function]", n = "[object GeneratorFunction]", i = "[object Proxy]";
  function s(o) {
    if (!e(o)) return false;
    var l = r(o);
    return l == a || l == n || l == t || l == i;
  }
  return m(s, "isFunction"), Ei = s, Ei;
}
m(Ih, "requireIsFunction");
var Ci;
var du;
function Oh() {
  if (du) return Ci;
  du = 1;
  var r = In(), e = r["__core-js_shared__"];
  return Ci = e, Ci;
}
m(Oh, "require_coreJsData");
var Ti;
var hu;
function Nh() {
  if (hu) return Ti;
  hu = 1;
  var r = Oh(), e = function() {
    var a = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }();
  function t(a) {
    return !!e && e in a;
  }
  return m(t, "isMasked"), Ti = t, Ti;
}
m(Nh, "require_isMasked");
var Si;
var gu;
function zh() {
  if (gu) return Si;
  gu = 1;
  var r = Function.prototype, e = r.toString;
  function t(a) {
    if (a != null) {
      try {
        return e.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  return m(t, "toSource"), Si = t, Si;
}
m(zh, "require_toSource");
var ki;
var pu;
function Fh() {
  if (pu) return ki;
  pu = 1;
  var r = Ih(), e = Nh(), t = za(), a = zh(), n = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, s = Function.prototype, o = Object.prototype, l = s.toString, u = o.hasOwnProperty, f = RegExp("^" + l.call(u).replace(n, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function c(d) {
    if (!t(d) || e(d)) return false;
    var g = r(d) ? f : i;
    return g.test(a(d));
  }
  return m(c, "baseIsNative"), ki = c, ki;
}
m(Fh, "require_baseIsNative");
var Di;
var yu;
function Vh() {
  if (yu) return Di;
  yu = 1;
  function r(e, t) {
    return e == null ? void 0 : e[t];
  }
  return m(r, "getValue"), Di = r, Di;
}
m(Vh, "require_getValue");
var Bi;
var mu;
function oo() {
  if (mu) return Bi;
  mu = 1;
  var r = Fh(), e = Vh();
  function t(a, n) {
    var i = e(a, n);
    return r(i) ? i : void 0;
  }
  return m(t, "getNative"), Bi = t, Bi;
}
m(oo, "require_getNative");
var Pi;
var bu;
function Vn() {
  if (bu) return Pi;
  bu = 1;
  var r = oo(), e = r(Object, "create");
  return Pi = e, Pi;
}
m(Vn, "require_nativeCreate");
var Ai;
var wu;
function qh() {
  if (wu) return Ai;
  wu = 1;
  var r = Vn();
  function e() {
    this.__data__ = r ? r(null) : {}, this.size = 0;
  }
  return m(e, "hashClear"), Ai = e, Ai;
}
m(qh, "require_hashClear");
var Ri;
var xu;
function _h() {
  if (xu) return Ri;
  xu = 1;
  function r(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  return m(r, "hashDelete"), Ri = r, Ri;
}
m(_h, "require_hashDelete");
var Mi;
var Eu;
function Gh() {
  if (Eu) return Mi;
  Eu = 1;
  var r = Vn(), e = "__lodash_hash_undefined__", t = Object.prototype, a = t.hasOwnProperty;
  function n(i) {
    var s = this.__data__;
    if (r) {
      var o = s[i];
      return o === e ? void 0 : o;
    }
    return a.call(s, i) ? s[i] : void 0;
  }
  return m(n, "hashGet"), Mi = n, Mi;
}
m(Gh, "require_hashGet");
var Li;
var Cu;
function Hh() {
  if (Cu) return Li;
  Cu = 1;
  var r = Vn(), e = Object.prototype, t = e.hasOwnProperty;
  function a(n) {
    var i = this.__data__;
    return r ? i[n] !== void 0 : t.call(i, n);
  }
  return m(a, "hashHas"), Li = a, Li;
}
m(Hh, "require_hashHas");
var Ii;
var Tu;
function Wh() {
  if (Tu) return Ii;
  Tu = 1;
  var r = Vn(), e = "__lodash_hash_undefined__";
  function t(a, n) {
    var i = this.__data__;
    return this.size += this.has(a) ? 0 : 1, i[a] = r && n === void 0 ? e : n, this;
  }
  return m(t, "hashSet"), Ii = t, Ii;
}
m(Wh, "require_hashSet");
var Oi;
var Su;
function $h() {
  if (Su) return Oi;
  Su = 1;
  var r = qh(), e = _h(), t = Gh(), a = Hh(), n = Wh();
  function i(s) {
    var o = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++o < l; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return m(i, "Hash"), i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = a, i.prototype.set = n, Oi = i, Oi;
}
m($h, "require_Hash");
var Ni;
var ku;
function Uh() {
  if (ku) return Ni;
  ku = 1;
  function r() {
    this.__data__ = [], this.size = 0;
  }
  return m(r, "listCacheClear"), Ni = r, Ni;
}
m(Uh, "require_listCacheClear");
var zi;
var Du;
function Iv() {
  if (Du) return zi;
  Du = 1;
  function r(e, t) {
    return e === t || e !== e && t !== t;
  }
  return m(r, "eq"), zi = r, zi;
}
m(Iv, "requireEq");
var Fi;
var Bu;
function qn() {
  if (Bu) return Fi;
  Bu = 1;
  var r = Iv();
  function e(t, a) {
    for (var n = t.length; n--; ) if (r(t[n][0], a)) return n;
    return -1;
  }
  return m(e, "assocIndexOf"), Fi = e, Fi;
}
m(qn, "require_assocIndexOf");
var Vi;
var Pu;
function Kh() {
  if (Pu) return Vi;
  Pu = 1;
  var r = qn(), e = Array.prototype, t = e.splice;
  function a(n) {
    var i = this.__data__, s = r(i, n);
    if (s < 0) return false;
    var o = i.length - 1;
    return s == o ? i.pop() : t.call(i, s, 1), --this.size, true;
  }
  return m(a, "listCacheDelete"), Vi = a, Vi;
}
m(Kh, "require_listCacheDelete");
var qi;
var Au;
function Xh() {
  if (Au) return qi;
  Au = 1;
  var r = qn();
  function e(t) {
    var a = this.__data__, n = r(a, t);
    return n < 0 ? void 0 : a[n][1];
  }
  return m(e, "listCacheGet"), qi = e, qi;
}
m(Xh, "require_listCacheGet");
var _i;
var Ru;
function Yh() {
  if (Ru) return _i;
  Ru = 1;
  var r = qn();
  function e(t) {
    return r(this.__data__, t) > -1;
  }
  return m(e, "listCacheHas"), _i = e, _i;
}
m(Yh, "require_listCacheHas");
var Gi;
var Mu;
function Zh() {
  if (Mu) return Gi;
  Mu = 1;
  var r = qn();
  function e(t, a) {
    var n = this.__data__, i = r(n, t);
    return i < 0 ? (++this.size, n.push([t, a])) : n[i][1] = a, this;
  }
  return m(e, "listCacheSet"), Gi = e, Gi;
}
m(Zh, "require_listCacheSet");
var Hi;
var Lu;
function Qh() {
  if (Lu) return Hi;
  Lu = 1;
  var r = Uh(), e = Kh(), t = Xh(), a = Yh(), n = Zh();
  function i(s) {
    var o = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++o < l; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return m(i, "ListCache"), i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = a, i.prototype.set = n, Hi = i, Hi;
}
m(Qh, "require_ListCache");
var Wi;
var Iu;
function Jh() {
  if (Iu) return Wi;
  Iu = 1;
  var r = oo(), e = In(), t = r(e, "Map");
  return Wi = t, Wi;
}
m(Jh, "require_Map");
var $i;
var Ou;
function jh() {
  if (Ou) return $i;
  Ou = 1;
  var r = $h(), e = Qh(), t = Jh();
  function a() {
    this.size = 0, this.__data__ = { hash: new r(), map: new (t || e)(), string: new r() };
  }
  return m(a, "mapCacheClear"), $i = a, $i;
}
m(jh, "require_mapCacheClear");
var Ui;
var Nu;
function eg() {
  if (Nu) return Ui;
  Nu = 1;
  function r(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  return m(r, "isKeyable"), Ui = r, Ui;
}
m(eg, "require_isKeyable");
var Ki;
var zu;
function _n() {
  if (zu) return Ki;
  zu = 1;
  var r = eg();
  function e(t, a) {
    var n = t.__data__;
    return r(a) ? n[typeof a == "string" ? "string" : "hash"] : n.map;
  }
  return m(e, "getMapData"), Ki = e, Ki;
}
m(_n, "require_getMapData");
var Xi;
var Fu;
function rg() {
  if (Fu) return Xi;
  Fu = 1;
  var r = _n();
  function e(t) {
    var a = r(this, t).delete(t);
    return this.size -= a ? 1 : 0, a;
  }
  return m(e, "mapCacheDelete"), Xi = e, Xi;
}
m(rg, "require_mapCacheDelete");
var Yi;
var Vu;
function tg() {
  if (Vu) return Yi;
  Vu = 1;
  var r = _n();
  function e(t) {
    return r(this, t).get(t);
  }
  return m(e, "mapCacheGet"), Yi = e, Yi;
}
m(tg, "require_mapCacheGet");
var Zi;
var qu;
function ag() {
  if (qu) return Zi;
  qu = 1;
  var r = _n();
  function e(t) {
    return r(this, t).has(t);
  }
  return m(e, "mapCacheHas"), Zi = e, Zi;
}
m(ag, "require_mapCacheHas");
var Qi;
var _u;
function ng() {
  if (_u) return Qi;
  _u = 1;
  var r = _n();
  function e(t, a) {
    var n = r(this, t), i = n.size;
    return n.set(t, a), this.size += n.size == i ? 0 : 1, this;
  }
  return m(e, "mapCacheSet"), Qi = e, Qi;
}
m(ng, "require_mapCacheSet");
var Ji;
var Gu;
function ig() {
  if (Gu) return Ji;
  Gu = 1;
  var r = jh(), e = rg(), t = tg(), a = ag(), n = ng();
  function i(s) {
    var o = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++o < l; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return m(i, "MapCache"), i.prototype.clear = r, i.prototype.delete = e, i.prototype.get = t, i.prototype.has = a, i.prototype.set = n, Ji = i, Ji;
}
m(ig, "require_MapCache");
var ji;
var Hu;
function sg() {
  if (Hu) return ji;
  Hu = 1;
  var r = ig(), e = "Expected a function";
  function t(a, n) {
    if (typeof a != "function" || n != null && typeof n != "function") throw new TypeError(e);
    var i = m(function() {
      var s = arguments, o = n ? n.apply(this, s) : s[0], l = i.cache;
      if (l.has(o)) return l.get(o);
      var u = a.apply(this, s);
      return i.cache = l.set(o, u) || l, u;
    }, "memoized");
    return i.cache = new (t.Cache || r)(), i;
  }
  return m(t, "memoize"), t.Cache = r, ji = t, ji;
}
m(sg, "requireMemoize");
var es;
var Wu;
function og() {
  if (Wu) return es;
  Wu = 1;
  var r = sg(), e = 500;
  function t(a) {
    var n = r(a, function(s) {
      return i.size === e && i.clear(), s;
    }), i = n.cache;
    return n;
  }
  return m(t, "memoizeCapped"), es = t, es;
}
m(og, "require_memoizeCapped");
var rs;
var $u;
function Ov() {
  if ($u) return rs;
  $u = 1;
  var r = og(), e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, t = /\\(\\)?/g, a = r(function(n) {
    var i = [];
    return n.charCodeAt(0) === 46 && i.push(""), n.replace(e, function(s, o, l, u) {
      i.push(l ? u.replace(t, "$1") : o || s);
    }), i;
  });
  return rs = a, rs;
}
m(Ov, "require_stringToPath");
var ts;
var Uu;
function Nv() {
  if (Uu) return ts;
  Uu = 1;
  function r(e, t) {
    for (var a = -1, n = e == null ? 0 : e.length, i = Array(n); ++a < n; ) i[a] = t(e[a], a, e);
    return i;
  }
  return m(r, "arrayMap"), ts = r, ts;
}
m(Nv, "require_arrayMap");
var as;
var Ku;
function ug() {
  if (Ku) return as;
  Ku = 1;
  var r = Js(), e = Nv(), t = Fn(), a = Fa(), n = r ? r.prototype : void 0, i = n ? n.toString : void 0;
  function s(o) {
    if (typeof o == "string") return o;
    if (t(o)) return e(o, s) + "";
    if (a(o)) return i ? i.call(o) : "";
    var l = o + "";
    return l == "0" && 1 / o == -1 / 0 ? "-0" : l;
  }
  return m(s, "baseToString"), as = s, as;
}
m(ug, "require_baseToString");
var ns;
var Xu;
function zv() {
  if (Xu) return ns;
  Xu = 1;
  var r = ug();
  function e(t) {
    return t == null ? "" : r(t);
  }
  return m(e, "toString"), ns = e, ns;
}
m(zv, "requireToString");
var is;
var Yu;
function Fv() {
  if (Yu) return is;
  Yu = 1;
  var r = Fn(), e = Lh(), t = Ov(), a = zv();
  function n(i, s) {
    return r(i) ? i : e(i, s) ? [i] : t(a(i));
  }
  return m(n, "castPath"), is = n, is;
}
m(Fv, "require_castPath");
var ss;
var Zu;
function uo() {
  if (Zu) return ss;
  Zu = 1;
  var r = Fa();
  function e(t) {
    if (typeof t == "string" || r(t)) return t;
    var a = t + "";
    return a == "0" && 1 / t == -1 / 0 ? "-0" : a;
  }
  return m(e, "toKey"), ss = e, ss;
}
m(uo, "require_toKey");
var os;
var Qu;
function lg() {
  if (Qu) return os;
  Qu = 1;
  var r = Fv(), e = uo();
  function t(a, n) {
    n = r(n, a);
    for (var i = 0, s = n.length; a != null && i < s; ) a = a[e(n[i++])];
    return i && i == s ? a : void 0;
  }
  return m(t, "baseGet"), os = t, os;
}
m(lg, "require_baseGet");
var us;
var Ju;
function vg() {
  if (Ju) return us;
  Ju = 1;
  var r = lg();
  function e(t, a, n) {
    var i = t == null ? void 0 : r(t, a);
    return i === void 0 ? n : i;
  }
  return m(e, "get"), us = e, us;
}
m(vg, "requireGet");
var fg = vg();
var cg = Na(fg);
var ls;
var ju;
function dg() {
  if (ju) return ls;
  ju = 1;
  var r = oo(), e = function() {
    try {
      var t = r(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {
    }
  }();
  return ls = e, ls;
}
m(dg, "require_defineProperty");
var vs;
var el;
function hg() {
  if (el) return vs;
  el = 1;
  var r = dg();
  function e(t, a, n) {
    a == "__proto__" && r ? r(t, a, { configurable: true, enumerable: true, value: n, writable: true }) : t[a] = n;
  }
  return m(e, "baseAssignValue"), vs = e, vs;
}
m(hg, "require_baseAssignValue");
var fs;
var rl;
function gg() {
  if (rl) return fs;
  rl = 1;
  var r = hg(), e = Iv(), t = Object.prototype, a = t.hasOwnProperty;
  function n(i, s, o) {
    var l = i[s];
    (!(a.call(i, s) && e(l, o)) || o === void 0 && !(s in i)) && r(i, s, o);
  }
  return m(n, "assignValue"), fs = n, fs;
}
m(gg, "require_assignValue");
var cs;
var tl;
function pg() {
  if (tl) return cs;
  tl = 1;
  var r = 9007199254740991, e = /^(?:0|[1-9]\d*)$/;
  function t(a, n) {
    var i = typeof a;
    return n = n ?? r, !!n && (i == "number" || i != "symbol" && e.test(a)) && a > -1 && a % 1 == 0 && a < n;
  }
  return m(t, "isIndex"), cs = t, cs;
}
m(pg, "require_isIndex");
var ds;
var al;
function yg() {
  if (al) return ds;
  al = 1;
  var r = gg(), e = Fv(), t = pg(), a = za(), n = uo();
  function i(s, o, l, u) {
    if (!a(s)) return s;
    o = e(o, s);
    for (var f = -1, c = o.length, d = c - 1, g = s; g != null && ++f < c; ) {
      var h = n(o[f]), m2 = l;
      if (h === "__proto__" || h === "constructor" || h === "prototype") return s;
      if (f != d) {
        var p = g[h];
        m2 = u ? u(p, h, g) : void 0, m2 === void 0 && (m2 = a(p) ? p : t(o[f + 1]) ? [] : {});
      }
      r(g, h, m2), g = g[h];
    }
    return s;
  }
  return m(i, "baseSet"), ds = i, ds;
}
m(yg, "require_baseSet");
var hs;
var nl;
function mg() {
  if (nl) return hs;
  nl = 1;
  var r = yg();
  function e(t, a, n) {
    return t == null ? t : r(t, a, n);
  }
  return m(e, "set"), hs = e, hs;
}
m(mg, "requireSet");
var bg = mg();
var wg = Na(bg);
var gs;
var il;
function xg() {
  if (il) return gs;
  il = 1;
  function r(e, t) {
    var a = -1, n = e.length;
    for (t || (t = Array(n)); ++a < n; ) t[a] = e[a];
    return t;
  }
  return m(r, "copyArray"), gs = r, gs;
}
m(xg, "require_copyArray");
var ps;
var sl;
function Eg() {
  if (sl) return ps;
  sl = 1;
  var r = Nv(), e = xg(), t = Fn(), a = Fa(), n = Ov(), i = uo(), s = zv();
  function o(l) {
    return t(l) ? r(l, i) : a(l) ? [l] : e(n(s(l)));
  }
  return m(o, "toPath"), ps = o, ps;
}
m(Eg, "requireToPath");
var Cg = Eg();
var Tg = Na(Cg);
var Sg = { data: m(function(e) {
  var t = { field: "data", bindingEvent: "data", allowBinding: false, allowSetting: false, allowGetting: false, settingEvent: "data", settingTriggersEvent: false, triggerFnName: "trigger", immutableKeys: {}, updateStyle: false, beforeGet: m(function(n) {
  }, "beforeGet"), beforeSet: m(function(n, i) {
  }, "beforeSet"), onSet: m(function(n) {
  }, "onSet"), canSet: m(function(n) {
    return true;
  }, "canSet") };
  return e = we({}, t, e), m(function(n, i) {
    var s = e, o = this, l = o.length !== void 0, u = l ? o : [o], f = l ? o[0] : o;
    if (pe(n)) {
      var c = n.indexOf(".") !== -1, d = c && Tg(n);
      if (s.allowGetting && i === void 0) {
        var g;
        return f && (s.beforeGet(f), d && f._private[s.field][n] === void 0 ? g = cg(f._private[s.field], d) : g = f._private[s.field][n]), g;
      } else if (s.allowSetting && i !== void 0) {
        var h = !s.immutableKeys[n];
        if (h) {
          var m2 = jl({}, n, i);
          s.beforeSet(o, m2);
          for (var p = 0, y = u.length; p < y; p++) {
            var b = u[p];
            s.canSet(b) && (d && f._private[s.field][n] === void 0 ? wg(b._private[s.field], d, i) : b._private[s.field][n] = i);
          }
          s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
        }
      }
    } else if (s.allowSetting && Ie(n)) {
      var w = n, x, C, T = Object.keys(w);
      s.beforeSet(o, w);
      for (var E = 0; E < T.length; E++) {
        x = T[E], C = w[x];
        var S = !s.immutableKeys[x];
        if (S) for (var D = 0; D < u.length; D++) {
          var B = u[D];
          s.canSet(B) && (B._private[s.field][x] = C);
        }
      }
      s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
    } else if (s.allowBinding && Ke(n)) {
      var P = n;
      o.on(s.bindingEvent, P);
    } else if (s.allowGetting && n === void 0) {
      var A;
      return f && (s.beforeGet(f), A = f._private[s.field]), A;
    }
    return o;
  }, "dataImpl");
}, "data"), removeData: m(function(e) {
  var t = { field: "data", event: "data", triggerFnName: "trigger", triggerEvent: false, immutableKeys: {} };
  return e = we({}, t, e), m(function(n) {
    var i = e, s = this, o = s.length !== void 0, l = o ? s : [s];
    if (pe(n)) {
      for (var u = n.split(/\s+/), f = u.length, c = 0; c < f; c++) {
        var d = u[c];
        if (!lt(d)) {
          var g = !i.immutableKeys[d];
          if (g) for (var h = 0, m2 = l.length; h < m2; h++) l[h]._private[i.field][d] = void 0;
        }
      }
      i.triggerEvent && s[i.triggerFnName](i.event);
    } else if (n === void 0) {
      for (var p = 0, y = l.length; p < y; p++) for (var b = l[p]._private[i.field], w = Object.keys(b), x = 0; x < w.length; x++) {
        var C = w[x], T = !i.immutableKeys[C];
        T && (b[C] = void 0);
      }
      i.triggerEvent && s[i.triggerFnName](i.event);
    }
    return s;
  }, "removeDataImpl");
}, "removeData") };
var kg = { eventAliasesOn: m(function(e) {
  var t = e;
  t.addListener = t.listen = t.bind = t.on, t.unlisten = t.unbind = t.off = t.removeListener, t.trigger = t.emit, t.pon = t.promiseOn = function(a, n) {
    var i = this, s = Array.prototype.slice.call(arguments, 0);
    return new aa(function(o, l) {
      var u = m(function(g) {
        i.off.apply(i, c), o(g);
      }, "callback"), f = s.concat([u]), c = f.concat([]);
      i.on.apply(i, f);
    });
  };
}, "eventAliasesOn") };
var Ve = {};
[Mh, Sg, kg].forEach(function(r) {
  we(Ve, r);
});
var Dg = { animate: Ve.animate(), animation: Ve.animation(), animated: Ve.animated(), clearQueue: Ve.clearQueue(), delay: Ve.delay(), delayAnimation: Ve.delayAnimation(), stop: Ve.stop() };
var fn = { classes: m(function(e) {
  var t = this;
  if (e === void 0) {
    var a = [];
    return t[0]._private.classes.forEach(function(h) {
      return a.push(h);
    }), a;
  } else Ge(e) || (e = (e || "").match(/\S+/g) || []);
  for (var n = [], i = new ta(e), s = 0; s < t.length; s++) {
    for (var o = t[s], l = o._private, u = l.classes, f = false, c = 0; c < e.length; c++) {
      var d = e[c], g = u.has(d);
      if (!g) {
        f = true;
        break;
      }
    }
    f || (f = u.size !== e.length), f && (l.classes = i, n.push(o));
  }
  return n.length > 0 && this.spawn(n).updateStyle().emit("class"), t;
}, "classes"), addClass: m(function(e) {
  return this.toggleClass(e, true);
}, "addClass"), hasClass: m(function(e) {
  var t = this[0];
  return t != null && t._private.classes.has(e);
}, "hasClass"), toggleClass: m(function(e, t) {
  Ge(e) || (e = e.match(/\S+/g) || []);
  for (var a = this, n = t === void 0, i = [], s = 0, o = a.length; s < o; s++) for (var l = a[s], u = l._private.classes, f = false, c = 0; c < e.length; c++) {
    var d = e[c], g = u.has(d), h = false;
    t || n && !g ? (u.add(d), h = true) : (!t || n && g) && (u.delete(d), h = true), !f && h && (i.push(l), f = true);
  }
  return i.length > 0 && this.spawn(i).updateStyle().emit("class"), a;
}, "toggleClass"), removeClass: m(function(e) {
  return this.toggleClass(e, false);
}, "removeClass"), flashClass: m(function(e, t) {
  var a = this;
  if (t == null) t = 250;
  else if (t === 0) return a;
  return a.addClass(e), setTimeout(function() {
    a.removeClass(e);
  }, t), a;
}, "flashClass") };
fn.className = fn.classNames = fn.classes;
var Le = { metaChar: "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]", comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=", boolOp: "\\?|\\!|\\^", string: `"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`, number: ar, meta: "degree|indegree|outdegree", separator: "\\s*,\\s*", descendant: "\\s+", child: "\\s+>\\s+", subject: "\\$", group: "node|edge|\\*", directedEdge: "\\s+->\\s+", undirectedEdge: "\\s+<->\\s+" };
Le.variable = "(?:[\\w-.]|(?:\\\\" + Le.metaChar + "))+";
Le.className = "(?:[\\w-]|(?:\\\\" + Le.metaChar + "))+";
Le.value = Le.string + "|" + Le.number;
Le.id = Le.variable;
(function() {
  var r, e, t;
  for (r = Le.comparatorOp.split("|"), t = 0; t < r.length; t++) e = r[t], Le.comparatorOp += "|@" + e;
  for (r = Le.comparatorOp.split("|"), t = 0; t < r.length; t++) e = r[t], !(e.indexOf("!") >= 0) && e !== "=" && (Le.comparatorOp += "|\\!" + e);
})();
var _e = m(function() {
  return { checks: [] };
}, "newQuery");
var oe = { GROUP: 0, COLLECTION: 1, FILTER: 2, DATA_COMPARE: 3, DATA_EXIST: 4, DATA_BOOL: 5, META_COMPARE: 6, STATE: 7, ID: 8, CLASS: 9, UNDIRECTED_EDGE: 10, DIRECTED_EDGE: 11, NODE_SOURCE: 12, NODE_TARGET: 13, NODE_NEIGHBOR: 14, CHILD: 15, DESCENDANT: 16, PARENT: 17, ANCESTOR: 18, COMPOUND_SPLIT: 19, TRUE: 20 };
var Ns = [{ selector: ":selected", matches: m(function(e) {
  return e.selected();
}, "matches") }, { selector: ":unselected", matches: m(function(e) {
  return !e.selected();
}, "matches") }, { selector: ":selectable", matches: m(function(e) {
  return e.selectable();
}, "matches") }, { selector: ":unselectable", matches: m(function(e) {
  return !e.selectable();
}, "matches") }, { selector: ":locked", matches: m(function(e) {
  return e.locked();
}, "matches") }, { selector: ":unlocked", matches: m(function(e) {
  return !e.locked();
}, "matches") }, { selector: ":visible", matches: m(function(e) {
  return e.visible();
}, "matches") }, { selector: ":hidden", matches: m(function(e) {
  return !e.visible();
}, "matches") }, { selector: ":transparent", matches: m(function(e) {
  return e.transparent();
}, "matches") }, { selector: ":grabbed", matches: m(function(e) {
  return e.grabbed();
}, "matches") }, { selector: ":free", matches: m(function(e) {
  return !e.grabbed();
}, "matches") }, { selector: ":removed", matches: m(function(e) {
  return e.removed();
}, "matches") }, { selector: ":inside", matches: m(function(e) {
  return !e.removed();
}, "matches") }, { selector: ":grabbable", matches: m(function(e) {
  return e.grabbable();
}, "matches") }, { selector: ":ungrabbable", matches: m(function(e) {
  return !e.grabbable();
}, "matches") }, { selector: ":animated", matches: m(function(e) {
  return e.animated();
}, "matches") }, { selector: ":unanimated", matches: m(function(e) {
  return !e.animated();
}, "matches") }, { selector: ":parent", matches: m(function(e) {
  return e.isParent();
}, "matches") }, { selector: ":childless", matches: m(function(e) {
  return e.isChildless();
}, "matches") }, { selector: ":child", matches: m(function(e) {
  return e.isChild();
}, "matches") }, { selector: ":orphan", matches: m(function(e) {
  return e.isOrphan();
}, "matches") }, { selector: ":nonorphan", matches: m(function(e) {
  return e.isChild();
}, "matches") }, { selector: ":compound", matches: m(function(e) {
  return e.isNode() ? e.isParent() : e.source().isParent() || e.target().isParent();
}, "matches") }, { selector: ":loop", matches: m(function(e) {
  return e.isLoop();
}, "matches") }, { selector: ":simple", matches: m(function(e) {
  return e.isSimple();
}, "matches") }, { selector: ":active", matches: m(function(e) {
  return e.active();
}, "matches") }, { selector: ":inactive", matches: m(function(e) {
  return !e.active();
}, "matches") }, { selector: ":backgrounding", matches: m(function(e) {
  return e.backgrounding();
}, "matches") }, { selector: ":nonbackgrounding", matches: m(function(e) {
  return !e.backgrounding();
}, "matches") }].sort(function(r, e) {
  return Sc(r.selector, e.selector);
});
var Bg = function() {
  for (var r = {}, e, t = 0; t < Ns.length; t++) e = Ns[t], r[e.selector] = e.matches;
  return r;
}();
var Pg = m(function(e, t) {
  return Bg[e](t);
}, "stateSelectorMatches");
var Ag = "(" + Ns.map(function(r) {
  return r.selector;
}).join("|") + ")";
var zt = m(function(e) {
  return e.replace(new RegExp("\\\\(" + Le.metaChar + ")", "g"), function(t, a) {
    return a;
  });
}, "cleanMetaChars");
var tt = m(function(e, t, a) {
  e[e.length - 1] = a;
}, "replaceLastQuery");
var zs = [{ name: "group", query: true, regex: "(" + Le.group + ")", populate: m(function(e, t, a) {
  var n = je(a, 1), i = n[0];
  t.checks.push({ type: oe.GROUP, value: i === "*" ? i : i + "s" });
}, "populate") }, { name: "state", query: true, regex: Ag, populate: m(function(e, t, a) {
  var n = je(a, 1), i = n[0];
  t.checks.push({ type: oe.STATE, value: i });
}, "populate") }, { name: "id", query: true, regex: "\\#(" + Le.id + ")", populate: m(function(e, t, a) {
  var n = je(a, 1), i = n[0];
  t.checks.push({ type: oe.ID, value: zt(i) });
}, "populate") }, { name: "className", query: true, regex: "\\.(" + Le.className + ")", populate: m(function(e, t, a) {
  var n = je(a, 1), i = n[0];
  t.checks.push({ type: oe.CLASS, value: zt(i) });
}, "populate") }, { name: "dataExists", query: true, regex: "\\[\\s*(" + Le.variable + ")\\s*\\]", populate: m(function(e, t, a) {
  var n = je(a, 1), i = n[0];
  t.checks.push({ type: oe.DATA_EXIST, field: zt(i) });
}, "populate") }, { name: "dataCompare", query: true, regex: "\\[\\s*(" + Le.variable + ")\\s*(" + Le.comparatorOp + ")\\s*(" + Le.value + ")\\s*\\]", populate: m(function(e, t, a) {
  var n = je(a, 3), i = n[0], s = n[1], o = n[2], l = new RegExp("^" + Le.string + "$").exec(o) != null;
  l ? o = o.substring(1, o.length - 1) : o = parseFloat(o), t.checks.push({ type: oe.DATA_COMPARE, field: zt(i), operator: s, value: o });
}, "populate") }, { name: "dataBool", query: true, regex: "\\[\\s*(" + Le.boolOp + ")\\s*(" + Le.variable + ")\\s*\\]", populate: m(function(e, t, a) {
  var n = je(a, 2), i = n[0], s = n[1];
  t.checks.push({ type: oe.DATA_BOOL, field: zt(s), operator: i });
}, "populate") }, { name: "metaCompare", query: true, regex: "\\[\\[\\s*(" + Le.meta + ")\\s*(" + Le.comparatorOp + ")\\s*(" + Le.number + ")\\s*\\]\\]", populate: m(function(e, t, a) {
  var n = je(a, 3), i = n[0], s = n[1], o = n[2];
  t.checks.push({ type: oe.META_COMPARE, field: zt(i), operator: s, value: parseFloat(o) });
}, "populate") }, { name: "nextQuery", separator: true, regex: Le.separator, populate: m(function(e, t) {
  var a = e.currentSubject, n = e.edgeCount, i = e.compoundCount, s = e[e.length - 1];
  a != null && (s.subject = a, e.currentSubject = null), s.edgeCount = n, s.compoundCount = i, e.edgeCount = 0, e.compoundCount = 0;
  var o = e[e.length++] = _e();
  return o;
}, "populate") }, { name: "directedEdge", separator: true, regex: Le.directedEdge, populate: m(function(e, t) {
  if (e.currentSubject == null) {
    var a = _e(), n = t, i = _e();
    return a.checks.push({ type: oe.DIRECTED_EDGE, source: n, target: i }), tt(e, t, a), e.edgeCount++, i;
  } else {
    var s = _e(), o = t, l = _e();
    return s.checks.push({ type: oe.NODE_SOURCE, source: o, target: l }), tt(e, t, s), e.edgeCount++, l;
  }
}, "populate") }, { name: "undirectedEdge", separator: true, regex: Le.undirectedEdge, populate: m(function(e, t) {
  if (e.currentSubject == null) {
    var a = _e(), n = t, i = _e();
    return a.checks.push({ type: oe.UNDIRECTED_EDGE, nodes: [n, i] }), tt(e, t, a), e.edgeCount++, i;
  } else {
    var s = _e(), o = t, l = _e();
    return s.checks.push({ type: oe.NODE_NEIGHBOR, node: o, neighbor: l }), tt(e, t, s), l;
  }
}, "populate") }, { name: "child", separator: true, regex: Le.child, populate: m(function(e, t) {
  if (e.currentSubject == null) {
    var a = _e(), n = _e(), i = e[e.length - 1];
    return a.checks.push({ type: oe.CHILD, parent: i, child: n }), tt(e, t, a), e.compoundCount++, n;
  } else if (e.currentSubject === t) {
    var s = _e(), o = e[e.length - 1], l = _e(), u = _e(), f = _e(), c = _e();
    return s.checks.push({ type: oe.COMPOUND_SPLIT, left: o, right: l, subject: u }), u.checks = t.checks, t.checks = [{ type: oe.TRUE }], c.checks.push({ type: oe.TRUE }), l.checks.push({ type: oe.PARENT, parent: c, child: f }), tt(e, o, s), e.currentSubject = u, e.compoundCount++, f;
  } else {
    var d = _e(), g = _e(), h = [{ type: oe.PARENT, parent: d, child: g }];
    return d.checks = t.checks, t.checks = h, e.compoundCount++, g;
  }
}, "populate") }, { name: "descendant", separator: true, regex: Le.descendant, populate: m(function(e, t) {
  if (e.currentSubject == null) {
    var a = _e(), n = _e(), i = e[e.length - 1];
    return a.checks.push({ type: oe.DESCENDANT, ancestor: i, descendant: n }), tt(e, t, a), e.compoundCount++, n;
  } else if (e.currentSubject === t) {
    var s = _e(), o = e[e.length - 1], l = _e(), u = _e(), f = _e(), c = _e();
    return s.checks.push({ type: oe.COMPOUND_SPLIT, left: o, right: l, subject: u }), u.checks = t.checks, t.checks = [{ type: oe.TRUE }], c.checks.push({ type: oe.TRUE }), l.checks.push({ type: oe.ANCESTOR, ancestor: c, descendant: f }), tt(e, o, s), e.currentSubject = u, e.compoundCount++, f;
  } else {
    var d = _e(), g = _e(), h = [{ type: oe.ANCESTOR, ancestor: d, descendant: g }];
    return d.checks = t.checks, t.checks = h, e.compoundCount++, g;
  }
}, "populate") }, { name: "subject", modifier: true, regex: Le.subject, populate: m(function(e, t) {
  if (e.currentSubject != null && e.currentSubject !== t) return qe("Redefinition of subject in selector `" + e.toString() + "`"), false;
  e.currentSubject = t;
  var a = e[e.length - 1], n = a.checks[0], i = n == null ? null : n.type;
  i === oe.DIRECTED_EDGE ? n.type = oe.NODE_TARGET : i === oe.UNDIRECTED_EDGE && (n.type = oe.NODE_NEIGHBOR, n.node = n.nodes[1], n.neighbor = n.nodes[0], n.nodes = null);
}, "populate") }];
zs.forEach(function(r) {
  return r.regexObj = new RegExp("^" + r.regex);
});
var Rg = m(function(e) {
  for (var t, a, n, i = 0; i < zs.length; i++) {
    var s = zs[i], o = s.name, l = e.match(s.regexObj);
    if (l != null) {
      a = l, t = s, n = o;
      var u = l[0];
      e = e.substring(u.length);
      break;
    }
  }
  return { expr: t, match: a, name: n, remaining: e };
}, "consumeExpr");
var Mg = m(function(e) {
  var t = e.match(/^\s+/);
  if (t) {
    var a = t[0];
    e = e.substring(a.length);
  }
  return e;
}, "consumeWhitespace");
var Lg = m(function(e) {
  var t = this, a = t.inputText = e, n = t[0] = _e();
  for (t.length = 1, a = Mg(a); ; ) {
    var i = Rg(a);
    if (i.expr == null) return qe("The selector `" + e + "`is invalid"), false;
    var s = i.match.slice(1), o = i.expr.populate(t, n, s);
    if (o === false) return false;
    if (o != null && (n = o), a = i.remaining, a.match(/^\s*$/)) break;
  }
  var l = t[t.length - 1];
  t.currentSubject != null && (l.subject = t.currentSubject), l.edgeCount = t.edgeCount, l.compoundCount = t.compoundCount;
  for (var u = 0; u < t.length; u++) {
    var f = t[u];
    if (f.compoundCount > 0 && f.edgeCount > 0) return qe("The selector `" + e + "` is invalid because it uses both a compound selector and an edge selector"), false;
    if (f.edgeCount > 1) return qe("The selector `" + e + "` is invalid because it uses multiple edge selectors"), false;
    f.edgeCount === 1 && qe("The selector `" + e + "` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.");
  }
  return true;
}, "parse");
var Ig = m(function() {
  if (this.toStringCache != null) return this.toStringCache;
  for (var e = m(function(f) {
    return f ?? "";
  }, "clean"), t = m(function(f) {
    return pe(f) ? '"' + f + '"' : e(f);
  }, "cleanVal"), a = m(function(f) {
    return " " + f + " ";
  }, "space"), n = m(function(f, c) {
    var d = f.type, g = f.value;
    switch (d) {
      case oe.GROUP: {
        var h = e(g);
        return h.substring(0, h.length - 1);
      }
      case oe.DATA_COMPARE: {
        var m2 = f.field, p = f.operator;
        return "[" + m2 + a(e(p)) + t(g) + "]";
      }
      case oe.DATA_BOOL: {
        var y = f.operator, b = f.field;
        return "[" + e(y) + b + "]";
      }
      case oe.DATA_EXIST: {
        var w = f.field;
        return "[" + w + "]";
      }
      case oe.META_COMPARE: {
        var x = f.operator, C = f.field;
        return "[[" + C + a(e(x)) + t(g) + "]]";
      }
      case oe.STATE:
        return g;
      case oe.ID:
        return "#" + g;
      case oe.CLASS:
        return "." + g;
      case oe.PARENT:
      case oe.CHILD:
        return i(f.parent, c) + a(">") + i(f.child, c);
      case oe.ANCESTOR:
      case oe.DESCENDANT:
        return i(f.ancestor, c) + " " + i(f.descendant, c);
      case oe.COMPOUND_SPLIT: {
        var T = i(f.left, c), E = i(f.subject, c), S = i(f.right, c);
        return T + (T.length > 0 ? " " : "") + E + S;
      }
      case oe.TRUE:
        return "";
    }
  }, "checkToString"), i = m(function(f, c) {
    return f.checks.reduce(function(d, g, h) {
      return d + (c === f && h === 0 ? "$" : "") + n(g, c);
    }, "");
  }, "queryToString"), s = "", o = 0; o < this.length; o++) {
    var l = this[o];
    s += i(l, l.subject), this.length > 1 && o < this.length - 1 && (s += ", ");
  }
  return this.toStringCache = s, s;
}, "toString");
var Og = { parse: Lg, toString: Ig };
var Vv = m(function(e, t, a) {
  var n, i = pe(e), s = ne(e), o = pe(a), l, u, f = false, c = false, d = false;
  switch (t.indexOf("!") >= 0 && (t = t.replace("!", ""), c = true), t.indexOf("@") >= 0 && (t = t.replace("@", ""), f = true), (i || o || f) && (l = !i && !s ? "" : "" + e, u = "" + a), f && (e = l = l.toLowerCase(), a = u = u.toLowerCase()), t) {
    case "*=":
      n = l.indexOf(u) >= 0;
      break;
    case "$=":
      n = l.indexOf(u, l.length - u.length) >= 0;
      break;
    case "^=":
      n = l.indexOf(u) === 0;
      break;
    case "=":
      n = e === a;
      break;
    case ">":
      d = true, n = e > a;
      break;
    case ">=":
      d = true, n = e >= a;
      break;
    case "<":
      d = true, n = e < a;
      break;
    case "<=":
      d = true, n = e <= a;
      break;
    default:
      n = false;
      break;
  }
  return c && (e != null || !d) && (n = !n), n;
}, "valCmp");
var Ng = m(function(e, t) {
  switch (t) {
    case "?":
      return !!e;
    case "!":
      return !e;
    case "^":
      return e === void 0;
  }
}, "boolCmp");
var zg = m(function(e) {
  return e !== void 0;
}, "existCmp");
var lo = m(function(e, t) {
  return e.data(t);
}, "data");
var Fg = m(function(e, t) {
  return e[t]();
}, "meta");
var Ye = [];
var $e = m(function(e, t) {
  return e.checks.every(function(a) {
    return Ye[a.type](a, t);
  });
}, "matches");
Ye[oe.GROUP] = function(r, e) {
  var t = r.value;
  return t === "*" || t === e.group();
};
Ye[oe.STATE] = function(r, e) {
  var t = r.value;
  return Pg(t, e);
};
Ye[oe.ID] = function(r, e) {
  var t = r.value;
  return e.id() === t;
};
Ye[oe.CLASS] = function(r, e) {
  var t = r.value;
  return e.hasClass(t);
};
Ye[oe.META_COMPARE] = function(r, e) {
  var t = r.field, a = r.operator, n = r.value;
  return Vv(Fg(e, t), a, n);
};
Ye[oe.DATA_COMPARE] = function(r, e) {
  var t = r.field, a = r.operator, n = r.value;
  return Vv(lo(e, t), a, n);
};
Ye[oe.DATA_BOOL] = function(r, e) {
  var t = r.field, a = r.operator;
  return Ng(lo(e, t), a);
};
Ye[oe.DATA_EXIST] = function(r, e) {
  var t = r.field;
  return r.operator, zg(lo(e, t));
};
Ye[oe.UNDIRECTED_EDGE] = function(r, e) {
  var t = r.nodes[0], a = r.nodes[1], n = e.source(), i = e.target();
  return $e(t, n) && $e(a, i) || $e(a, n) && $e(t, i);
};
Ye[oe.NODE_NEIGHBOR] = function(r, e) {
  return $e(r.node, e) && e.neighborhood().some(function(t) {
    return t.isNode() && $e(r.neighbor, t);
  });
};
Ye[oe.DIRECTED_EDGE] = function(r, e) {
  return $e(r.source, e.source()) && $e(r.target, e.target());
};
Ye[oe.NODE_SOURCE] = function(r, e) {
  return $e(r.source, e) && e.outgoers().some(function(t) {
    return t.isNode() && $e(r.target, t);
  });
};
Ye[oe.NODE_TARGET] = function(r, e) {
  return $e(r.target, e) && e.incomers().some(function(t) {
    return t.isNode() && $e(r.source, t);
  });
};
Ye[oe.CHILD] = function(r, e) {
  return $e(r.child, e) && $e(r.parent, e.parent());
};
Ye[oe.PARENT] = function(r, e) {
  return $e(r.parent, e) && e.children().some(function(t) {
    return $e(r.child, t);
  });
};
Ye[oe.DESCENDANT] = function(r, e) {
  return $e(r.descendant, e) && e.ancestors().some(function(t) {
    return $e(r.ancestor, t);
  });
};
Ye[oe.ANCESTOR] = function(r, e) {
  return $e(r.ancestor, e) && e.descendants().some(function(t) {
    return $e(r.descendant, t);
  });
};
Ye[oe.COMPOUND_SPLIT] = function(r, e) {
  return $e(r.subject, e) && $e(r.left, e) && $e(r.right, e);
};
Ye[oe.TRUE] = function() {
  return true;
};
Ye[oe.COLLECTION] = function(r, e) {
  var t = r.value;
  return t.has(e);
};
Ye[oe.FILTER] = function(r, e) {
  var t = r.value;
  return t(e);
};
var Vg = m(function(e) {
  var t = this;
  if (t.length === 1 && t[0].checks.length === 1 && t[0].checks[0].type === oe.ID) return e.getElementById(t[0].checks[0].value).collection();
  var a = m(function(i) {
    for (var s = 0; s < t.length; s++) {
      var o = t[s];
      if ($e(o, i)) return true;
    }
    return false;
  }, "selectorFunction");
  return t.text() == null && (a = m(function() {
    return true;
  }, "selectorFunction")), e.filter(a);
}, "filter");
var qg = m(function(e) {
  for (var t = this, a = 0; a < t.length; a++) {
    var n = t[a];
    if ($e(n, e)) return true;
  }
  return false;
}, "matches");
var _g = { matches: qg, filter: Vg };
var ct = m(function(e) {
  this.inputText = e, this.currentSubject = null, this.compoundCount = 0, this.edgeCount = 0, this.length = 0, e == null || pe(e) && e.match(/^\s*$/) || (Br(e) ? this.addQuery({ checks: [{ type: oe.COLLECTION, value: e.collection() }] }) : Ke(e) ? this.addQuery({ checks: [{ type: oe.FILTER, value: e }] }) : pe(e) ? this.parse(e) || (this.invalid = true) : Ue("A selector must be created from a string; found "));
}, "Selector");
var dt = ct.prototype;
[Og, _g].forEach(function(r) {
  return we(dt, r);
});
dt.text = function() {
  return this.inputText;
};
dt.size = function() {
  return this.length;
};
dt.eq = function(r) {
  return this[r];
};
dt.sameText = function(r) {
  return !this.invalid && !r.invalid && this.text() === r.text();
};
dt.addQuery = function(r) {
  this[this.length++] = r;
};
dt.selector = dt.toString;
var ot = { allAre: m(function(e) {
  var t = new ct(e);
  return this.every(function(a) {
    return t.matches(a);
  });
}, "allAre"), is: m(function(e) {
  var t = new ct(e);
  return this.some(function(a) {
    return t.matches(a);
  });
}, "is"), some: m(function(e, t) {
  for (var a = 0; a < this.length; a++) {
    var n = t ? e.apply(t, [this[a], a, this]) : e(this[a], a, this);
    if (n) return true;
  }
  return false;
}, "some"), every: m(function(e, t) {
  for (var a = 0; a < this.length; a++) {
    var n = t ? e.apply(t, [this[a], a, this]) : e(this[a], a, this);
    if (!n) return false;
  }
  return true;
}, "every"), same: m(function(e) {
  if (this === e) return true;
  e = this.cy().collection(e);
  var t = this.length, a = e.length;
  return t !== a ? false : t === 1 ? this[0] === e[0] : this.every(function(n) {
    return e.hasElementWithId(n.id());
  });
}, "same"), anySame: m(function(e) {
  return e = this.cy().collection(e), this.some(function(t) {
    return e.hasElementWithId(t.id());
  });
}, "anySame"), allAreNeighbors: m(function(e) {
  e = this.cy().collection(e);
  var t = this.neighborhood();
  return e.every(function(a) {
    return t.hasElementWithId(a.id());
  });
}, "allAreNeighbors"), contains: m(function(e) {
  e = this.cy().collection(e);
  var t = this;
  return e.every(function(a) {
    return t.hasElementWithId(a.id());
  });
}, "contains") };
ot.allAreNeighbours = ot.allAreNeighbors;
ot.has = ot.contains;
ot.equal = ot.equals = ot.same;
var Mr = m(function(e, t) {
  return m(function(n, i, s, o) {
    var l = n, u = this, f;
    if (l == null ? f = "" : Br(l) && l.length === 1 && (f = l.id()), u.length === 1 && f) {
      var c = u[0]._private, d = c.traversalCache = c.traversalCache || {}, g = d[t] = d[t] || [], h = Pt(f), m2 = g[h];
      return m2 || (g[h] = e.call(u, n, i, s, o));
    } else return e.call(u, n, i, s, o);
  }, "traversalCache");
}, "cache");
var ea = { parent: m(function(e) {
  var t = [];
  if (this.length === 1) {
    var a = this[0]._private.parent;
    if (a) return a;
  }
  for (var n = 0; n < this.length; n++) {
    var i = this[n], s = i._private.parent;
    s && t.push(s);
  }
  return this.spawn(t, true).filter(e);
}, "parent"), parents: m(function(e) {
  for (var t = [], a = this.parent(); a.nonempty(); ) {
    for (var n = 0; n < a.length; n++) {
      var i = a[n];
      t.push(i);
    }
    a = a.parent();
  }
  return this.spawn(t, true).filter(e);
}, "parents"), commonAncestors: m(function(e) {
  for (var t, a = 0; a < this.length; a++) {
    var n = this[a], i = n.parents();
    t = t || i, t = t.intersect(i);
  }
  return t.filter(e);
}, "commonAncestors"), orphans: m(function(e) {
  return this.stdFilter(function(t) {
    return t.isOrphan();
  }).filter(e);
}, "orphans"), nonorphans: m(function(e) {
  return this.stdFilter(function(t) {
    return t.isChild();
  }).filter(e);
}, "nonorphans"), children: Mr(function(r) {
  for (var e = [], t = 0; t < this.length; t++) for (var a = this[t], n = a._private.children, i = 0; i < n.length; i++) e.push(n[i]);
  return this.spawn(e, true).filter(r);
}, "children"), siblings: m(function(e) {
  return this.parent().children().not(this).filter(e);
}, "siblings"), isParent: m(function() {
  var e = this[0];
  if (e) return e.isNode() && e._private.children.length !== 0;
}, "isParent"), isChildless: m(function() {
  var e = this[0];
  if (e) return e.isNode() && e._private.children.length === 0;
}, "isChildless"), isChild: m(function() {
  var e = this[0];
  if (e) return e.isNode() && e._private.parent != null;
}, "isChild"), isOrphan: m(function() {
  var e = this[0];
  if (e) return e.isNode() && e._private.parent == null;
}, "isOrphan"), descendants: m(function(e) {
  var t = [];
  function a(n) {
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      t.push(s), s.children().nonempty() && a(s.children());
    }
  }
  return m(a, "add"), a(this.children()), this.spawn(t, true).filter(e);
}, "descendants") };
function vo(r, e, t, a) {
  for (var n = [], i = new ta(), s = r.cy(), o = s.hasCompoundNodes(), l = 0; l < r.length; l++) {
    var u = r[l];
    t ? n.push(u) : o && a(n, i, u);
  }
  for (; n.length > 0; ) {
    var f = n.shift();
    e(f), i.add(f.id()), o && a(n, i, f);
  }
  return r;
}
m(vo, "forEachCompound");
function qv(r, e, t) {
  if (t.isParent()) for (var a = t._private.children, n = 0; n < a.length; n++) {
    var i = a[n];
    e.has(i.id()) || r.push(i);
  }
}
m(qv, "addChildren");
ea.forEachDown = function(r) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return vo(this, r, e, qv);
};
function _v(r, e, t) {
  if (t.isChild()) {
    var a = t._private.parent;
    e.has(a.id()) || r.push(a);
  }
}
m(_v, "addParent");
ea.forEachUp = function(r) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return vo(this, r, e, _v);
};
function Gg(r, e, t) {
  _v(r, e, t), qv(r, e, t);
}
m(Gg, "addParentAndChildren");
ea.forEachUpAndDown = function(r) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return vo(this, r, e, Gg);
};
ea.ancestors = ea.parents;
var Pa;
var Gv;
Pa = Gv = { data: Ve.data({ field: "data", bindingEvent: "data", allowBinding: true, allowSetting: true, settingEvent: "data", settingTriggersEvent: true, triggerFnName: "trigger", allowGetting: true, immutableKeys: { id: true, source: true, target: true, parent: true }, updateStyle: true }), removeData: Ve.removeData({ field: "data", event: "data", triggerFnName: "trigger", triggerEvent: true, immutableKeys: { id: true, source: true, target: true, parent: true }, updateStyle: true }), scratch: Ve.data({ field: "scratch", bindingEvent: "scratch", allowBinding: true, allowSetting: true, settingEvent: "scratch", settingTriggersEvent: true, triggerFnName: "trigger", allowGetting: true, updateStyle: true }), removeScratch: Ve.removeData({ field: "scratch", event: "scratch", triggerFnName: "trigger", triggerEvent: true, updateStyle: true }), rscratch: Ve.data({ field: "rscratch", allowBinding: false, allowSetting: true, settingTriggersEvent: false, allowGetting: true }), removeRscratch: Ve.removeData({ field: "rscratch", triggerEvent: false }), id: m(function() {
  var e = this[0];
  if (e) return e._private.data.id;
}, "id") };
Pa.attr = Pa.data;
Pa.removeAttr = Pa.removeData;
var Hg = Gv;
var Gn = {};
function ys(r) {
  return function(e) {
    var t = this;
    if (e === void 0 && (e = true), t.length !== 0) if (t.isNode() && !t.removed()) {
      for (var a = 0, n = t[0], i = n._private.edges, s = 0; s < i.length; s++) {
        var o = i[s];
        !e && o.isLoop() || (a += r(n, o));
      }
      return a;
    } else return;
  };
}
m(ys, "defineDegreeFunction");
we(Gn, { degree: ys(function(r, e) {
  return e.source().same(e.target()) ? 2 : 1;
}), indegree: ys(function(r, e) {
  return e.target().same(r) ? 1 : 0;
}), outdegree: ys(function(r, e) {
  return e.source().same(r) ? 1 : 0;
}) });
function Ft(r, e) {
  return function(t) {
    for (var a, n = this.nodes(), i = 0; i < n.length; i++) {
      var s = n[i], o = s[r](t);
      o !== void 0 && (a === void 0 || e(o, a)) && (a = o);
    }
    return a;
  };
}
m(Ft, "defineDegreeBoundsFunction");
we(Gn, { minDegree: Ft("degree", function(r, e) {
  return r < e;
}), maxDegree: Ft("degree", function(r, e) {
  return r > e;
}), minIndegree: Ft("indegree", function(r, e) {
  return r < e;
}), maxIndegree: Ft("indegree", function(r, e) {
  return r > e;
}), minOutdegree: Ft("outdegree", function(r, e) {
  return r < e;
}), maxOutdegree: Ft("outdegree", function(r, e) {
  return r > e;
}) });
we(Gn, { totalDegree: m(function(e) {
  for (var t = 0, a = this.nodes(), n = 0; n < a.length; n++) t += a[n].degree(e);
  return t;
}, "totalDegree") });
var Nr;
var Hv;
var Wv = m(function(e, t, a) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (!i.locked()) {
      var s = i._private.position, o = { x: t.x != null ? t.x - s.x : 0, y: t.y != null ? t.y - s.y : 0 };
      i.isParent() && !(o.x === 0 && o.y === 0) && i.children().shift(o, a), i.dirtyBoundingBoxCache();
    }
  }
}, "beforePositionSet");
var ol = { field: "position", bindingEvent: "position", allowBinding: true, allowSetting: true, settingEvent: "position", settingTriggersEvent: true, triggerFnName: "emitAndNotify", allowGetting: true, validKeys: ["x", "y"], beforeGet: m(function(e) {
  e.updateCompoundBounds();
}, "beforeGet"), beforeSet: m(function(e, t) {
  Wv(e, t, false);
}, "beforeSet"), onSet: m(function(e) {
  e.dirtyCompoundBoundsCache();
}, "onSet"), canSet: m(function(e) {
  return !e.locked();
}, "canSet") };
Nr = Hv = { position: Ve.data(ol), silentPosition: Ve.data(we({}, ol, { allowBinding: false, allowSetting: true, settingTriggersEvent: false, allowGetting: false, beforeSet: m(function(e, t) {
  Wv(e, t, true);
}, "beforeSet"), onSet: m(function(e) {
  e.dirtyCompoundBoundsCache();
}, "onSet") })), positions: m(function(e, t) {
  if (Ie(e)) t ? this.silentPosition(e) : this.position(e);
  else if (Ke(e)) {
    var a = e, n = this.cy();
    n.startBatch();
    for (var i = 0; i < this.length; i++) {
      var s = this[i], o = void 0;
      (o = a(s, i)) && (t ? s.silentPosition(o) : s.position(o));
    }
    n.endBatch();
  }
  return this;
}, "positions"), silentPositions: m(function(e) {
  return this.positions(e, true);
}, "silentPositions"), shift: m(function(e, t, a) {
  var n;
  if (Ie(e) ? (n = { x: ne(e.x) ? e.x : 0, y: ne(e.y) ? e.y : 0 }, a = t) : pe(e) && ne(t) && (n = { x: 0, y: 0 }, n[e] = t), n != null) {
    var i = this.cy();
    i.startBatch();
    for (var s = 0; s < this.length; s++) {
      var o = this[s];
      if (!(i.hasCompoundNodes() && o.isChild() && o.ancestors().anySame(this))) {
        var l = o.position(), u = { x: l.x + n.x, y: l.y + n.y };
        a ? o.silentPosition(u) : o.position(u);
      }
    }
    i.endBatch();
  }
  return this;
}, "shift"), silentShift: m(function(e, t) {
  return Ie(e) ? this.shift(e, true) : pe(e) && ne(t) && this.shift(e, t, true), this;
}, "silentShift"), renderedPosition: m(function(e, t) {
  var a = this[0], n = this.cy(), i = n.zoom(), s = n.pan(), o = Ie(e) ? e : void 0, l = o !== void 0 || t !== void 0 && pe(e);
  if (a && a.isNode()) if (l) for (var u = 0; u < this.length; u++) {
    var f = this[u];
    t !== void 0 ? f.position(e, (t - s[e]) / i) : o !== void 0 && f.position(mv(o, i, s));
  }
  else {
    var c = a.position();
    return o = Nn(c, i, s), e === void 0 ? o : o[e];
  }
  else if (!l) return;
  return this;
}, "renderedPosition"), relativePosition: m(function(e, t) {
  var a = this[0], n = this.cy(), i = Ie(e) ? e : void 0, s = i !== void 0 || t !== void 0 && pe(e), o = n.hasCompoundNodes();
  if (a && a.isNode()) if (s) for (var l = 0; l < this.length; l++) {
    var u = this[l], f = o ? u.parent() : null, c = f && f.length > 0, d = c;
    c && (f = f[0]);
    var g = d ? f.position() : { x: 0, y: 0 };
    t !== void 0 ? u.position(e, t + g[e]) : i !== void 0 && u.position({ x: i.x + g.x, y: i.y + g.y });
  }
  else {
    var h = a.position(), m2 = o ? a.parent() : null, p = m2 && m2.length > 0, y = p;
    p && (m2 = m2[0]);
    var b = y ? m2.position() : { x: 0, y: 0 };
    return i = { x: h.x - b.x, y: h.y - b.y }, e === void 0 ? i : i[e];
  }
  else if (!s) return;
  return this;
}, "relativePosition") };
Nr.modelPosition = Nr.point = Nr.position;
Nr.modelPositions = Nr.points = Nr.positions;
Nr.renderedPoint = Nr.renderedPosition;
Nr.relativePoint = Nr.relativePosition;
var Wg = Hv;
var Qt;
var yt;
Qt = yt = {};
yt.renderedBoundingBox = function(r) {
  var e = this.boundingBox(r), t = this.cy(), a = t.zoom(), n = t.pan(), i = e.x1 * a + n.x, s = e.x2 * a + n.x, o = e.y1 * a + n.y, l = e.y2 * a + n.y;
  return { x1: i, x2: s, y1: o, y2: l, w: s - i, h: l - o };
};
yt.dirtyCompoundBoundsCache = function() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, e = this.cy();
  return !e.styleEnabled() || !e.hasCompoundNodes() ? this : (this.forEachUp(function(t) {
    if (t.isParent()) {
      var a = t._private;
      a.compoundBoundsClean = false, a.bbCache = null, r || t.emitAndNotify("bounds");
    }
  }), this);
};
yt.updateCompoundBounds = function() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, e = this.cy();
  if (!e.styleEnabled() || !e.hasCompoundNodes()) return this;
  if (!r && e.batching()) return this;
  function t(s) {
    if (!s.isParent()) return;
    var o = s._private, l = s.children(), u = s.pstyle("compound-sizing-wrt-labels").value === "include", f = { width: { val: s.pstyle("min-width").pfValue, left: s.pstyle("min-width-bias-left"), right: s.pstyle("min-width-bias-right") }, height: { val: s.pstyle("min-height").pfValue, top: s.pstyle("min-height-bias-top"), bottom: s.pstyle("min-height-bias-bottom") } }, c = l.boundingBox({ includeLabels: u, includeOverlays: false, useCache: false }), d = o.position;
    (c.w === 0 || c.h === 0) && (c = { w: s.pstyle("width").pfValue, h: s.pstyle("height").pfValue }, c.x1 = d.x - c.w / 2, c.x2 = d.x + c.w / 2, c.y1 = d.y - c.h / 2, c.y2 = d.y + c.h / 2);
    function g(D, B, P) {
      var A = 0, R = 0, M = B + P;
      return D > 0 && M > 0 && (A = B / M * D, R = P / M * D), { biasDiff: A, biasComplementDiff: R };
    }
    m(g, "computeBiasValues");
    function h(D, B, P, A) {
      if (P.units === "%") switch (A) {
        case "width":
          return D > 0 ? P.pfValue * D : 0;
        case "height":
          return B > 0 ? P.pfValue * B : 0;
        case "average":
          return D > 0 && B > 0 ? P.pfValue * (D + B) / 2 : 0;
        case "min":
          return D > 0 && B > 0 ? D > B ? P.pfValue * B : P.pfValue * D : 0;
        case "max":
          return D > 0 && B > 0 ? D > B ? P.pfValue * D : P.pfValue * B : 0;
        default:
          return 0;
      }
      else return P.units === "px" ? P.pfValue : 0;
    }
    m(h, "computePaddingValues");
    var m2 = f.width.left.value;
    f.width.left.units === "px" && f.width.val > 0 && (m2 = m2 * 100 / f.width.val);
    var p = f.width.right.value;
    f.width.right.units === "px" && f.width.val > 0 && (p = p * 100 / f.width.val);
    var y = f.height.top.value;
    f.height.top.units === "px" && f.height.val > 0 && (y = y * 100 / f.height.val);
    var b = f.height.bottom.value;
    f.height.bottom.units === "px" && f.height.val > 0 && (b = b * 100 / f.height.val);
    var w = g(f.width.val - c.w, m2, p), x = w.biasDiff, C = w.biasComplementDiff, T = g(f.height.val - c.h, y, b), E = T.biasDiff, S = T.biasComplementDiff;
    o.autoPadding = h(c.w, c.h, s.pstyle("padding"), s.pstyle("padding-relative-to").value), o.autoWidth = Math.max(c.w, f.width.val), d.x = (-x + c.x1 + c.x2 + C) / 2, o.autoHeight = Math.max(c.h, f.height.val), d.y = (-E + c.y1 + c.y2 + S) / 2;
  }
  m(t, "update");
  for (var a = 0; a < this.length; a++) {
    var n = this[a], i = n._private;
    (!i.compoundBoundsClean || r) && (t(n), e.batching() || (i.compoundBoundsClean = true));
  }
  return this;
};
var Rr = m(function(e) {
  return e === 1 / 0 || e === -1 / 0 ? 0 : e;
}, "noninf");
var Or = m(function(e, t, a, n, i) {
  n - t === 0 || i - a === 0 || t == null || a == null || n == null || i == null || (e.x1 = t < e.x1 ? t : e.x1, e.x2 = n > e.x2 ? n : e.x2, e.y1 = a < e.y1 ? a : e.y1, e.y2 = i > e.y2 ? i : e.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1);
}, "updateBounds");
var at = m(function(e, t) {
  return t == null ? e : Or(e, t.x1, t.y1, t.x2, t.y2);
}, "updateBoundsFromBox");
var ca = m(function(e, t, a) {
  return Sr(e, t, a);
}, "prefixedProperty");
var en = m(function(e, t, a) {
  if (!t.cy().headless()) {
    var n = t._private, i = n.rstyle, s = i.arrowWidth / 2, o = t.pstyle(a + "-arrow-shape").value, l, u;
    if (o !== "none") {
      a === "source" ? (l = i.srcX, u = i.srcY) : a === "target" ? (l = i.tgtX, u = i.tgtY) : (l = i.midX, u = i.midY);
      var f = n.arrowBounds = n.arrowBounds || {}, c = f[a] = f[a] || {};
      c.x1 = l - s, c.y1 = u - s, c.x2 = l + s, c.y2 = u + s, c.w = c.x2 - c.x1, c.h = c.y2 - c.y1, ln(c, 1), Or(e, c.x1, c.y1, c.x2, c.y2);
    }
  }
}, "updateBoundsFromArrow");
var ms = m(function(e, t, a) {
  if (!t.cy().headless()) {
    var n;
    a ? n = a + "-" : n = "";
    var i = t._private, s = i.rstyle, o = t.pstyle(n + "label").strValue;
    if (o) {
      var l = t.pstyle("text-halign"), u = t.pstyle("text-valign"), f = ca(s, "labelWidth", a), c = ca(s, "labelHeight", a), d = ca(s, "labelX", a), g = ca(s, "labelY", a), h = t.pstyle(n + "text-margin-x").pfValue, m2 = t.pstyle(n + "text-margin-y").pfValue, p = t.isEdge(), y = t.pstyle(n + "text-rotation"), b = t.pstyle("text-outline-width").pfValue, w = t.pstyle("text-border-width").pfValue, x = w / 2, C = t.pstyle("text-background-padding").pfValue, T = 2, E = c, S = f, D = S / 2, B = E / 2, P, A, R, M;
      if (p) P = d - D, A = d + D, R = g - B, M = g + B;
      else {
        switch (l.value) {
          case "left":
            P = d - S, A = d;
            break;
          case "center":
            P = d - D, A = d + D;
            break;
          case "right":
            P = d, A = d + S;
            break;
        }
        switch (u.value) {
          case "top":
            R = g - E, M = g;
            break;
          case "center":
            R = g - B, M = g + B;
            break;
          case "bottom":
            R = g, M = g + E;
            break;
        }
      }
      var I = h - Math.max(b, x) - C - T, O = h + Math.max(b, x) + C + T, L = m2 - Math.max(b, x) - C - T, N = m2 + Math.max(b, x) + C + T;
      P += I, A += O, R += L, M += N;
      var q = a || "main", H = i.labelBounds, z = H[q] = H[q] || {};
      z.x1 = P, z.y1 = R, z.x2 = A, z.y2 = M, z.w = A - P, z.h = M - R, z.leftPad = I, z.rightPad = O, z.topPad = L, z.botPad = N;
      var V = p && y.strValue === "autorotate", K = y.pfValue != null && y.pfValue !== 0;
      if (V || K) {
        var J = V ? ca(i.rstyle, "labelAngle", a) : y.pfValue, X = Math.cos(J), ee = Math.sin(J), te = (P + A) / 2, ie = (R + M) / 2;
        if (!p) {
          switch (l.value) {
            case "left":
              te = A;
              break;
            case "right":
              te = P;
              break;
          }
          switch (u.value) {
            case "top":
              ie = M;
              break;
            case "bottom":
              ie = R;
              break;
          }
        }
        var j = m(function(Te, xe) {
          return Te = Te - te, xe = xe - ie, { x: Te * X - xe * ee + te, y: Te * ee + xe * X + ie };
        }, "rotate"), F = j(P, R), _ = j(P, M), W = j(A, R), Z = j(A, M);
        P = Math.min(F.x, _.x, W.x, Z.x), A = Math.max(F.x, _.x, W.x, Z.x), R = Math.min(F.y, _.y, W.y, Z.y), M = Math.max(F.y, _.y, W.y, Z.y);
      }
      var ae = q + "Rot", de = H[ae] = H[ae] || {};
      de.x1 = P, de.y1 = R, de.x2 = A, de.y2 = M, de.w = A - P, de.h = M - R, Or(e, P, R, A, M), Or(i.labelBounds.all, P, R, A, M);
    }
    return e;
  }
}, "updateBoundsFromLabel");
var ul = m(function(e, t) {
  if (!t.cy().headless()) {
    var a = t.pstyle("outline-opacity").value, n = t.pstyle("outline-width").value, i = t.pstyle("outline-offset").value, s = n + i;
    $v(e, t, a, s, "outside", s / 2);
  }
}, "updateBoundsFromOutline");
var $v = m(function(e, t, a, n, i, s) {
  if (!(a === 0 || n <= 0 || i === "inside")) {
    var o = t.cy(), l = t.pstyle("shape").value, u = o.renderer().nodeShapes[l], f = t.position(), c = f.x, d = f.y, g = t.width(), h = t.height();
    if (u.hasMiterBounds) {
      i === "center" && (n /= 2);
      var m2 = u.miterBounds(c, d, g, h, n);
      at(e, m2);
    } else s != null && s > 0 && vn(e, [s, s, s, s]);
  }
}, "updateBoundsFromMiter");
var $g = m(function(e, t) {
  if (!t.cy().headless()) {
    var a = t.pstyle("border-opacity").value, n = t.pstyle("border-width").pfValue, i = t.pstyle("border-position").value;
    $v(e, t, a, n, i);
  }
}, "updateBoundsFromMiterBorder");
var Ug = m(function(e, t) {
  var a = e._private.cy, n = a.styleEnabled(), i = a.headless(), s = xr(), o = e._private, l = e.isNode(), u = e.isEdge(), f, c, d, g, h, m2, p = o.rstyle, y = l && n ? e.pstyle("bounds-expansion").pfValue : [0], b = m(function(Re) {
    return Re.pstyle("display").value !== "none";
  }, "isDisplayed"), w = !n || b(e) && (!u || b(e.source()) && b(e.target()));
  if (w) {
    var x = 0, C = 0;
    n && t.includeOverlays && (x = e.pstyle("overlay-opacity").value, x !== 0 && (C = e.pstyle("overlay-padding").value));
    var T = 0, E = 0;
    n && t.includeUnderlays && (T = e.pstyle("underlay-opacity").value, T !== 0 && (E = e.pstyle("underlay-padding").value));
    var S = Math.max(C, E), D = 0, B = 0;
    if (n && (D = e.pstyle("width").pfValue, B = D / 2), l && t.includeNodes) {
      var P = e.position();
      h = P.x, m2 = P.y;
      var A = e.outerWidth(), R = A / 2, M = e.outerHeight(), I = M / 2;
      f = h - R, c = h + R, d = m2 - I, g = m2 + I, Or(s, f, d, c, g), n && ul(s, e), n && t.includeOutlines && !i && ul(s, e), n && $g(s, e);
    } else if (u && t.includeEdges) if (n && !i) {
      var O = e.pstyle("curve-style").strValue;
      if (f = Math.min(p.srcX, p.midX, p.tgtX), c = Math.max(p.srcX, p.midX, p.tgtX), d = Math.min(p.srcY, p.midY, p.tgtY), g = Math.max(p.srcY, p.midY, p.tgtY), f -= B, c += B, d -= B, g += B, Or(s, f, d, c, g), O === "haystack") {
        var L = p.haystackPts;
        if (L && L.length === 2) {
          if (f = L[0].x, d = L[0].y, c = L[1].x, g = L[1].y, f > c) {
            var N = f;
            f = c, c = N;
          }
          if (d > g) {
            var q = d;
            d = g, g = q;
          }
          Or(s, f - B, d - B, c + B, g + B);
        }
      } else if (O === "bezier" || O === "unbundled-bezier" || nt(O, "segments") || nt(O, "taxi")) {
        var H;
        switch (O) {
          case "bezier":
          case "unbundled-bezier":
            H = p.bezierPts;
            break;
          case "segments":
          case "taxi":
          case "round-segments":
          case "round-taxi":
            H = p.linePts;
            break;
        }
        if (H != null) for (var z = 0; z < H.length; z++) {
          var V = H[z];
          f = V.x - B, c = V.x + B, d = V.y - B, g = V.y + B, Or(s, f, d, c, g);
        }
      }
    } else {
      var K = e.source(), J = K.position(), X = e.target(), ee = X.position();
      if (f = J.x, c = ee.x, d = J.y, g = ee.y, f > c) {
        var te = f;
        f = c, c = te;
      }
      if (d > g) {
        var ie = d;
        d = g, g = ie;
      }
      f -= B, c += B, d -= B, g += B, Or(s, f, d, c, g);
    }
    if (n && t.includeEdges && u && (en(s, e, "mid-source"), en(s, e, "mid-target"), en(s, e, "source"), en(s, e, "target")), n) {
      var j = e.pstyle("ghost").value === "yes";
      if (j) {
        var F = e.pstyle("ghost-offset-x").pfValue, _ = e.pstyle("ghost-offset-y").pfValue;
        Or(s, s.x1 + F, s.y1 + _, s.x2 + F, s.y2 + _);
      }
    }
    var W = o.bodyBounds = o.bodyBounds || {};
    Ko(W, s), vn(W, y), ln(W, 1), n && (f = s.x1, c = s.x2, d = s.y1, g = s.y2, Or(s, f - S, d - S, c + S, g + S));
    var Z = o.overlayBounds = o.overlayBounds || {};
    Ko(Z, s), vn(Z, y), ln(Z, 1);
    var ae = o.labelBounds = o.labelBounds || {};
    ae.all != null ? Dd(ae.all) : ae.all = xr(), n && t.includeLabels && (t.includeMainLabels && ms(s, e, null), u && (t.includeSourceLabels && ms(s, e, "source"), t.includeTargetLabels && ms(s, e, "target")));
  }
  return s.x1 = Rr(s.x1), s.y1 = Rr(s.y1), s.x2 = Rr(s.x2), s.y2 = Rr(s.y2), s.w = Rr(s.x2 - s.x1), s.h = Rr(s.y2 - s.y1), s.w > 0 && s.h > 0 && w && (vn(s, y), ln(s, 1)), s;
}, "boundingBoxImpl");
var Uv = m(function(e) {
  var t = 0, a = m(function(s) {
    return (s ? 1 : 0) << t++;
  }, "tf"), n = 0;
  return n += a(e.incudeNodes), n += a(e.includeEdges), n += a(e.includeLabels), n += a(e.includeMainLabels), n += a(e.includeSourceLabels), n += a(e.includeTargetLabels), n += a(e.includeOverlays), n += a(e.includeOutlines), n;
}, "getKey");
var Kv = m(function(e) {
  var t = m(function(o) {
    return Math.round(o);
  }, "r");
  if (e.isEdge()) {
    var a = e.source().position(), n = e.target().position();
    return _o([t(a.x), t(a.y), t(n.x), t(n.y)]);
  } else {
    var i = e.position();
    return _o([t(i.x), t(i.y)]);
  }
}, "getBoundingBoxPosKey");
var ll = m(function(e, t) {
  var a = e._private, n, i = e.isEdge(), s = t == null ? vl : Uv(t), o = s === vl;
  if (a.bbCache == null ? (n = Ug(e, Aa), a.bbCache = n, a.bbCachePosKey = Kv(e)) : n = a.bbCache, !o) {
    var l = e.isNode();
    n = xr(), (t.includeNodes && l || t.includeEdges && !l) && (t.includeOverlays ? at(n, a.overlayBounds) : at(n, a.bodyBounds)), t.includeLabels && (t.includeMainLabels && (!i || t.includeSourceLabels && t.includeTargetLabels) ? at(n, a.labelBounds.all) : (t.includeMainLabels && at(n, a.labelBounds.mainRot), t.includeSourceLabels && at(n, a.labelBounds.sourceRot), t.includeTargetLabels && at(n, a.labelBounds.targetRot))), n.w = n.x2 - n.x1, n.h = n.y2 - n.y1;
  }
  return n;
}, "cachedBoundingBoxImpl");
var Aa = { includeNodes: true, includeEdges: true, includeLabels: true, includeMainLabels: true, includeSourceLabels: true, includeTargetLabels: true, includeOverlays: true, includeUnderlays: true, includeOutlines: true, useCache: true };
var vl = Uv(Aa);
var fl = dr(Aa);
yt.boundingBox = function(r) {
  var e, t = r === void 0 || r.useCache === void 0 || r.useCache === true, a = Jt(function(f) {
    var c = f._private;
    return c.bbCache == null || c.styleDirty || c.bbCachePosKey !== Kv(f);
  }, function(f) {
    return f.id();
  });
  if (t && this.length === 1 && !a(this[0])) r === void 0 ? r = Aa : r = fl(r), e = ll(this[0], r);
  else {
    e = xr(), r = r || Aa;
    var n = fl(r), i = this, s = i.cy(), o = s.styleEnabled();
    this.edges().forEach(a), this.nodes().forEach(a), o && this.recalculateRenderedStyle(t), this.updateCompoundBounds(!t);
    for (var l = 0; l < i.length; l++) {
      var u = i[l];
      a(u) && u.dirtyBoundingBoxCache(), at(e, ll(u, n));
    }
  }
  return e.x1 = Rr(e.x1), e.y1 = Rr(e.y1), e.x2 = Rr(e.x2), e.y2 = Rr(e.y2), e.w = Rr(e.x2 - e.x1), e.h = Rr(e.y2 - e.y1), e;
};
yt.dirtyBoundingBoxCache = function() {
  for (var r = 0; r < this.length; r++) {
    var e = this[r]._private;
    e.bbCache = null, e.bbCachePosKey = null, e.bodyBounds = null, e.overlayBounds = null, e.labelBounds.all = null, e.labelBounds.source = null, e.labelBounds.target = null, e.labelBounds.main = null, e.labelBounds.sourceRot = null, e.labelBounds.targetRot = null, e.labelBounds.mainRot = null, e.arrowBounds.source = null, e.arrowBounds.target = null, e.arrowBounds["mid-source"] = null, e.arrowBounds["mid-target"] = null;
  }
  return this.emitAndNotify("bounds"), this;
};
yt.boundingBoxAt = function(r) {
  var e = this.nodes(), t = this.cy(), a = t.hasCompoundNodes(), n = t.collection();
  if (a && (n = e.filter(function(u) {
    return u.isParent();
  }), e = e.not(n)), Ie(r)) {
    var i = r;
    r = m(function() {
      return i;
    }, "fn");
  }
  var s = m(function(f, c) {
    return f._private.bbAtOldPos = r(f, c);
  }, "storeOldPos"), o = m(function(f) {
    return f._private.bbAtOldPos;
  }, "getOldPos");
  t.startBatch(), e.forEach(s).silentPositions(r), a && (n.dirtyCompoundBoundsCache(), n.dirtyBoundingBoxCache(), n.updateCompoundBounds(true));
  var l = kd(this.boundingBox({ useCache: false }));
  return e.silentPositions(o), a && (n.dirtyCompoundBoundsCache(), n.dirtyBoundingBoxCache(), n.updateCompoundBounds(true)), t.endBatch(), l;
};
Qt.boundingbox = Qt.bb = Qt.boundingBox;
Qt.renderedBoundingbox = Qt.renderedBoundingBox;
var Kg = yt;
var ba;
var _a;
ba = _a = {};
var Xv = m(function(e) {
  e.uppercaseName = ko(e.name), e.autoName = "auto" + e.uppercaseName, e.labelName = "label" + e.uppercaseName, e.outerName = "outer" + e.uppercaseName, e.uppercaseOuterName = ko(e.outerName), ba[e.name] = m(function() {
    var a = this[0], n = a._private, i = n.cy, s = i._private.styleEnabled;
    if (a) if (s) {
      if (a.isParent()) return a.updateCompoundBounds(), n[e.autoName] || 0;
      var o = a.pstyle(e.name);
      switch (o.strValue) {
        case "label":
          return a.recalculateRenderedStyle(), n.rstyle[e.labelName] || 0;
        default:
          return o.pfValue;
      }
    } else return 1;
  }, "dimImpl"), ba["outer" + e.uppercaseName] = m(function() {
    var a = this[0], n = a._private, i = n.cy, s = i._private.styleEnabled;
    if (a) if (s) {
      var o = a[e.name](), l = a.pstyle("border-position").value, u;
      l === "center" ? u = a.pstyle("border-width").pfValue : l === "outside" ? u = 2 * a.pstyle("border-width").pfValue : u = 0;
      var f = 2 * a.padding();
      return o + u + f;
    } else return 1;
  }, "outerDimImpl"), ba["rendered" + e.uppercaseName] = m(function() {
    var a = this[0];
    if (a) {
      var n = a[e.name]();
      return n * this.cy().zoom();
    }
  }, "renderedDimImpl"), ba["rendered" + e.uppercaseOuterName] = m(function() {
    var a = this[0];
    if (a) {
      var n = a[e.outerName]();
      return n * this.cy().zoom();
    }
  }, "renderedOuterDimImpl");
}, "defineDimFns");
Xv({ name: "width" });
Xv({ name: "height" });
_a.padding = function() {
  var r = this[0], e = r._private;
  return r.isParent() ? (r.updateCompoundBounds(), e.autoPadding !== void 0 ? e.autoPadding : r.pstyle("padding").pfValue) : r.pstyle("padding").pfValue;
};
_a.paddedHeight = function() {
  var r = this[0];
  return r.height() + 2 * r.padding();
};
_a.paddedWidth = function() {
  var r = this[0];
  return r.width() + 2 * r.padding();
};
var Xg = _a;
var Yg = m(function(e, t) {
  if (e.isEdge() && e.takesUpSpace()) return t(e);
}, "ifEdge");
var Zg = m(function(e, t) {
  if (e.isEdge() && e.takesUpSpace()) {
    var a = e.cy();
    return Nn(t(e), a.zoom(), a.pan());
  }
}, "ifEdgeRenderedPosition");
var Qg = m(function(e, t) {
  if (e.isEdge() && e.takesUpSpace()) {
    var a = e.cy(), n = a.pan(), i = a.zoom();
    return t(e).map(function(s) {
      return Nn(s, i, n);
    });
  }
}, "ifEdgeRenderedPositions");
var Jg = m(function(e) {
  return e.renderer().getControlPoints(e);
}, "controlPoints");
var jg = m(function(e) {
  return e.renderer().getSegmentPoints(e);
}, "segmentPoints");
var ep = m(function(e) {
  return e.renderer().getSourceEndpoint(e);
}, "sourceEndpoint");
var rp = m(function(e) {
  return e.renderer().getTargetEndpoint(e);
}, "targetEndpoint");
var tp = m(function(e) {
  return e.renderer().getEdgeMidpoint(e);
}, "midpoint");
var cl = { controlPoints: { get: Jg, mult: true }, segmentPoints: { get: jg, mult: true }, sourceEndpoint: { get: ep }, targetEndpoint: { get: rp }, midpoint: { get: tp } };
var ap = m(function(e) {
  return "rendered" + e[0].toUpperCase() + e.substr(1);
}, "renderedName");
var np = Object.keys(cl).reduce(function(r, e) {
  var t = cl[e], a = ap(e);
  return r[e] = function() {
    return Yg(this, t.get);
  }, t.mult ? r[a] = function() {
    return Qg(this, t.get);
  } : r[a] = function() {
    return Zg(this, t.get);
  }, r;
}, {});
var ip = we({}, Wg, Kg, Xg, np);
var Yv = m(function(e, t) {
  this.recycle(e, t);
}, "Event");
function da() {
  return false;
}
m(da, "returnFalse");
function rn() {
  return true;
}
m(rn, "returnTrue");
Yv.prototype = { instanceString: m(function() {
  return "event";
}, "instanceString"), recycle: m(function(e, t) {
  if (this.isImmediatePropagationStopped = this.isPropagationStopped = this.isDefaultPrevented = da, e != null && e.preventDefault ? (this.type = e.type, this.isDefaultPrevented = e.defaultPrevented ? rn : da) : e != null && e.type ? t = e : this.type = e, t != null && (this.originalEvent = t.originalEvent, this.type = t.type != null ? t.type : this.type, this.cy = t.cy, this.target = t.target, this.position = t.position, this.renderedPosition = t.renderedPosition, this.namespace = t.namespace, this.layout = t.layout), this.cy != null && this.position != null && this.renderedPosition == null) {
    var a = this.position, n = this.cy.zoom(), i = this.cy.pan();
    this.renderedPosition = { x: a.x * n + i.x, y: a.y * n + i.y };
  }
  this.timeStamp = e && e.timeStamp || Date.now();
}, "recycle"), preventDefault: m(function() {
  this.isDefaultPrevented = rn;
  var e = this.originalEvent;
  e && e.preventDefault && e.preventDefault();
}, "preventDefault"), stopPropagation: m(function() {
  this.isPropagationStopped = rn;
  var e = this.originalEvent;
  e && e.stopPropagation && e.stopPropagation();
}, "stopPropagation"), stopImmediatePropagation: m(function() {
  this.isImmediatePropagationStopped = rn, this.stopPropagation();
}, "stopImmediatePropagation"), isDefaultPrevented: da, isPropagationStopped: da, isImmediatePropagationStopped: da };
var Zv = /^([^.]+)(\.(?:[^.]+))?$/;
var sp = ".*";
var Qv = { qualifierCompare: m(function(e, t) {
  return e === t;
}, "qualifierCompare"), eventMatches: m(function() {
  return true;
}, "eventMatches"), addEventFields: m(function() {
}, "addEventFields"), callbackContext: m(function(e) {
  return e;
}, "callbackContext"), beforeEmit: m(function() {
}, "beforeEmit"), afterEmit: m(function() {
}, "afterEmit"), bubble: m(function() {
  return false;
}, "bubble"), parent: m(function() {
  return null;
}, "parent"), context: null };
var dl = Object.keys(Qv);
var op = {};
function Hn() {
  for (var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : op, e = arguments.length > 1 ? arguments[1] : void 0, t = 0; t < dl.length; t++) {
    var a = dl[t];
    this[a] = r[a] || Qv[a];
  }
  this.context = e || this.context, this.listeners = [], this.emitting = 0;
}
m(Hn, "Emitter");
var ht = Hn.prototype;
var Jv = m(function(e, t, a, n, i, s, o) {
  Ke(n) && (i = n, n = null), o && (s == null ? s = o : s = we({}, s, o));
  for (var l = Ge(a) ? a : a.split(/\s+/), u = 0; u < l.length; u++) {
    var f = l[u];
    if (!lt(f)) {
      var c = f.match(Zv);
      if (c) {
        var d = c[1], g = c[2] ? c[2] : null, h = t(e, f, d, g, n, i, s);
        if (h === false) break;
      }
    }
  }
}, "forEachEvent");
var hl = m(function(e, t) {
  return e.addEventFields(e.context, t), new Yv(t.type, t);
}, "makeEventObj");
var up = m(function(e, t, a) {
  if (hc(a)) {
    t(e, a);
    return;
  } else if (Ie(a)) {
    t(e, hl(e, a));
    return;
  }
  for (var n = Ge(a) ? a : a.split(/\s+/), i = 0; i < n.length; i++) {
    var s = n[i];
    if (!lt(s)) {
      var o = s.match(Zv);
      if (o) {
        var l = o[1], u = o[2] ? o[2] : null, f = hl(e, { type: l, namespace: u, target: e.context });
        t(e, f);
      }
    }
  }
}, "forEachEventObj");
ht.on = ht.addListener = function(r, e, t, a, n) {
  return Jv(this, function(i, s, o, l, u, f, c) {
    Ke(f) && i.listeners.push({ event: s, callback: f, type: o, namespace: l, qualifier: u, conf: c });
  }, r, e, t, a, n), this;
};
ht.one = function(r, e, t, a) {
  return this.on(r, e, t, a, { one: true });
};
ht.removeListener = ht.off = function(r, e, t, a) {
  var n = this;
  this.emitting !== 0 && (this.listeners = Zc(this.listeners));
  for (var i = this.listeners, s = m(function(u) {
    var f = i[u];
    Jv(n, function(c, d, g, h, m2, p) {
      if ((f.type === g || r === "*") && (!h && f.namespace !== ".*" || f.namespace === h) && (!m2 || c.qualifierCompare(f.qualifier, m2)) && (!p || f.callback === p)) return i.splice(u, 1), false;
    }, r, e, t, a);
  }, "_loop"), o = i.length - 1; o >= 0; o--) s(o);
  return this;
};
ht.removeAllListeners = function() {
  return this.removeListener("*");
};
ht.emit = ht.trigger = function(r, e, t) {
  var a = this.listeners, n = a.length;
  return this.emitting++, Ge(e) || (e = [e]), up(this, function(i, s) {
    t != null && (a = [{ event: s.event, type: s.type, namespace: s.namespace, callback: t }], n = a.length);
    for (var o = m(function() {
      var f = a[l];
      if (f.type === s.type && (!f.namespace || f.namespace === s.namespace || f.namespace === sp) && i.eventMatches(i.context, f, s)) {
        var c = [s];
        e != null && Jc(c, e), i.beforeEmit(i.context, f, s), f.conf && f.conf.one && (i.listeners = i.listeners.filter(function(h) {
          return h !== f;
        }));
        var d = i.callbackContext(i.context, f, s), g = f.callback.apply(d, c);
        i.afterEmit(i.context, f, s), g === false && (s.stopPropagation(), s.preventDefault());
      }
    }, "_loop2"), l = 0; l < n; l++) o();
    i.bubble(i.context) && !s.isPropagationStopped() && i.parent(i.context).emit(s, e);
  }, r), this.emitting--, this;
};
var lp = { qualifierCompare: m(function(e, t) {
  return e == null || t == null ? e == null && t == null : e.sameText(t);
}, "qualifierCompare"), eventMatches: m(function(e, t, a) {
  var n = t.qualifier;
  return n != null ? e !== a.target && Oa(a.target) && n.matches(a.target) : true;
}, "eventMatches"), addEventFields: m(function(e, t) {
  t.cy = e.cy(), t.target = e;
}, "addEventFields"), callbackContext: m(function(e, t, a) {
  return t.qualifier != null ? a.target : e;
}, "callbackContext"), beforeEmit: m(function(e, t) {
  t.conf && t.conf.once && t.conf.onceCollection.removeListener(t.event, t.qualifier, t.callback);
}, "beforeEmit"), bubble: m(function() {
  return true;
}, "bubble"), parent: m(function(e) {
  return e.isChild() ? e.parent() : e.cy();
}, "parent") };
var tn = m(function(e) {
  return pe(e) ? new ct(e) : e;
}, "argSelector");
var jv = { createEmitter: m(function() {
  for (var e = 0; e < this.length; e++) {
    var t = this[e], a = t._private;
    a.emitter || (a.emitter = new Hn(lp, t));
  }
  return this;
}, "createEmitter"), emitter: m(function() {
  return this._private.emitter;
}, "emitter"), on: m(function(e, t, a) {
  for (var n = tn(t), i = 0; i < this.length; i++) {
    var s = this[i];
    s.emitter().on(e, n, a);
  }
  return this;
}, "on"), removeListener: m(function(e, t, a) {
  for (var n = tn(t), i = 0; i < this.length; i++) {
    var s = this[i];
    s.emitter().removeListener(e, n, a);
  }
  return this;
}, "removeListener"), removeAllListeners: m(function() {
  for (var e = 0; e < this.length; e++) {
    var t = this[e];
    t.emitter().removeAllListeners();
  }
  return this;
}, "removeAllListeners"), one: m(function(e, t, a) {
  for (var n = tn(t), i = 0; i < this.length; i++) {
    var s = this[i];
    s.emitter().one(e, n, a);
  }
  return this;
}, "one"), once: m(function(e, t, a) {
  for (var n = tn(t), i = 0; i < this.length; i++) {
    var s = this[i];
    s.emitter().on(e, n, a, { once: true, onceCollection: this });
  }
}, "once"), emit: m(function(e, t) {
  for (var a = 0; a < this.length; a++) {
    var n = this[a];
    n.emitter().emit(e, t);
  }
  return this;
}, "emit"), emitAndNotify: m(function(e, t) {
  if (this.length !== 0) return this.cy().notify(e, this), this.emit(e, t), this;
}, "emitAndNotify") };
Ve.eventAliasesOn(jv);
var ef = { nodes: m(function(e) {
  return this.filter(function(t) {
    return t.isNode();
  }).filter(e);
}, "nodes"), edges: m(function(e) {
  return this.filter(function(t) {
    return t.isEdge();
  }).filter(e);
}, "edges"), byGroup: m(function() {
  for (var e = this.spawn(), t = this.spawn(), a = 0; a < this.length; a++) {
    var n = this[a];
    n.isNode() ? e.push(n) : t.push(n);
  }
  return { nodes: e, edges: t };
}, "byGroup"), filter: m(function(e, t) {
  if (e === void 0) return this;
  if (pe(e) || Br(e)) return new ct(e).filter(this);
  if (Ke(e)) {
    for (var a = this.spawn(), n = this, i = 0; i < n.length; i++) {
      var s = n[i], o = t ? e.apply(t, [s, i, n]) : e(s, i, n);
      o && a.push(s);
    }
    return a;
  }
  return this.spawn();
}, "filter"), not: m(function(e) {
  if (e) {
    pe(e) && (e = this.filter(e));
    for (var t = this.spawn(), a = 0; a < this.length; a++) {
      var n = this[a], i = e.has(n);
      i || t.push(n);
    }
    return t;
  } else return this;
}, "not"), absoluteComplement: m(function() {
  var e = this.cy();
  return e.mutableElements().not(this);
}, "absoluteComplement"), intersect: m(function(e) {
  if (pe(e)) {
    var t = e;
    return this.filter(t);
  }
  for (var a = this.spawn(), n = this, i = e, s = this.length < e.length, o = s ? n : i, l = s ? i : n, u = 0; u < o.length; u++) {
    var f = o[u];
    l.has(f) && a.push(f);
  }
  return a;
}, "intersect"), xor: m(function(e) {
  var t = this._private.cy;
  pe(e) && (e = t.$(e));
  var a = this.spawn(), n = this, i = e, s = m(function(l, u) {
    for (var f = 0; f < l.length; f++) {
      var c = l[f], d = c._private.data.id, g = u.hasElementWithId(d);
      g || a.push(c);
    }
  }, "add");
  return s(n, i), s(i, n), a;
}, "xor"), diff: m(function(e) {
  var t = this._private.cy;
  pe(e) && (e = t.$(e));
  var a = this.spawn(), n = this.spawn(), i = this.spawn(), s = this, o = e, l = m(function(f, c, d) {
    for (var g = 0; g < f.length; g++) {
      var h = f[g], m2 = h._private.data.id, p = c.hasElementWithId(m2);
      p ? i.merge(h) : d.push(h);
    }
  }, "add");
  return l(s, o, a), l(o, s, n), { left: a, right: n, both: i };
}, "diff"), add: m(function(e) {
  var t = this._private.cy;
  if (!e) return this;
  if (pe(e)) {
    var a = e;
    e = t.mutableElements().filter(a);
  }
  for (var n = this.spawnSelf(), i = 0; i < e.length; i++) {
    var s = e[i], o = !this.has(s);
    o && n.push(s);
  }
  return n;
}, "add"), merge: m(function(e) {
  var t = this._private, a = t.cy;
  if (!e) return this;
  if (e && pe(e)) {
    var n = e;
    e = a.mutableElements().filter(n);
  }
  for (var i = t.map, s = 0; s < e.length; s++) {
    var o = e[s], l = o._private.data.id, u = !i.has(l);
    if (u) {
      var f = this.length++;
      this[f] = o, i.set(l, { ele: o, index: f });
    }
  }
  return this;
}, "merge"), unmergeAt: m(function(e) {
  var t = this[e], a = t.id(), n = this._private, i = n.map;
  this[e] = void 0, i.delete(a);
  var s = e === this.length - 1;
  if (this.length > 1 && !s) {
    var o = this.length - 1, l = this[o], u = l._private.data.id;
    this[o] = void 0, this[e] = l, i.set(u, { ele: l, index: e });
  }
  return this.length--, this;
}, "unmergeAt"), unmergeOne: m(function(e) {
  e = e[0];
  var t = this._private, a = e._private.data.id, n = t.map, i = n.get(a);
  if (!i) return this;
  var s = i.index;
  return this.unmergeAt(s), this;
}, "unmergeOne"), unmerge: m(function(e) {
  var t = this._private.cy;
  if (!e) return this;
  if (e && pe(e)) {
    var a = e;
    e = t.mutableElements().filter(a);
  }
  for (var n = 0; n < e.length; n++) this.unmergeOne(e[n]);
  return this;
}, "unmerge"), unmergeBy: m(function(e) {
  for (var t = this.length - 1; t >= 0; t--) {
    var a = this[t];
    e(a) && this.unmergeAt(t);
  }
  return this;
}, "unmergeBy"), map: m(function(e, t) {
  for (var a = [], n = this, i = 0; i < n.length; i++) {
    var s = n[i], o = t ? e.apply(t, [s, i, n]) : e(s, i, n);
    a.push(o);
  }
  return a;
}, "map"), reduce: m(function(e, t) {
  for (var a = t, n = this, i = 0; i < n.length; i++) a = e(a, n[i], i, n);
  return a;
}, "reduce"), max: m(function(e, t) {
  for (var a = -1 / 0, n, i = this, s = 0; s < i.length; s++) {
    var o = i[s], l = t ? e.apply(t, [o, s, i]) : e(o, s, i);
    l > a && (a = l, n = o);
  }
  return { value: a, ele: n };
}, "max"), min: m(function(e, t) {
  for (var a = 1 / 0, n, i = this, s = 0; s < i.length; s++) {
    var o = i[s], l = t ? e.apply(t, [o, s, i]) : e(o, s, i);
    l < a && (a = l, n = o);
  }
  return { value: a, ele: n };
}, "min") };
var Oe = ef;
Oe.u = Oe["|"] = Oe["+"] = Oe.union = Oe.or = Oe.add;
Oe["\\"] = Oe["!"] = Oe["-"] = Oe.difference = Oe.relativeComplement = Oe.subtract = Oe.not;
Oe.n = Oe["&"] = Oe["."] = Oe.and = Oe.intersection = Oe.intersect;
Oe["^"] = Oe["(+)"] = Oe["(-)"] = Oe.symmetricDifference = Oe.symdiff = Oe.xor;
Oe.fnFilter = Oe.filterFn = Oe.stdFilter = Oe.filter;
Oe.complement = Oe.abscomp = Oe.absoluteComplement;
var vp = { isNode: m(function() {
  return this.group() === "nodes";
}, "isNode"), isEdge: m(function() {
  return this.group() === "edges";
}, "isEdge"), isLoop: m(function() {
  return this.isEdge() && this.source()[0] === this.target()[0];
}, "isLoop"), isSimple: m(function() {
  return this.isEdge() && this.source()[0] !== this.target()[0];
}, "isSimple"), group: m(function() {
  var e = this[0];
  if (e) return e._private.group;
}, "group") };
var rf = m(function(e, t) {
  var a = e.cy(), n = a.hasCompoundNodes();
  function i(f) {
    var c = f.pstyle("z-compound-depth");
    return c.value === "auto" ? n ? f.zDepth() : 0 : c.value === "bottom" ? -1 : c.value === "top" ? js : 0;
  }
  m(i, "getDepth");
  var s = i(e) - i(t);
  if (s !== 0) return s;
  function o(f) {
    var c = f.pstyle("z-index-compare");
    return c.value === "auto" && f.isNode() ? 1 : 0;
  }
  m(o, "getEleDepth");
  var l = o(e) - o(t);
  if (l !== 0) return l;
  var u = e.pstyle("z-index").value - t.pstyle("z-index").value;
  return u !== 0 ? u : e.poolIndex() - t.poolIndex();
}, "zIndexSort");
var kn = { forEach: m(function(e, t) {
  if (Ke(e)) for (var a = this.length, n = 0; n < a; n++) {
    var i = this[n], s = t ? e.apply(t, [i, n, this]) : e(i, n, this);
    if (s === false) break;
  }
  return this;
}, "forEach"), toArray: m(function() {
  for (var e = [], t = 0; t < this.length; t++) e.push(this[t]);
  return e;
}, "toArray"), slice: m(function(e, t) {
  var a = [], n = this.length;
  t == null && (t = n), e == null && (e = 0), e < 0 && (e = n + e), t < 0 && (t = n + t);
  for (var i = e; i >= 0 && i < t && i < n; i++) a.push(this[i]);
  return this.spawn(a);
}, "slice"), size: m(function() {
  return this.length;
}, "size"), eq: m(function(e) {
  return this[e] || this.spawn();
}, "eq"), first: m(function() {
  return this[0] || this.spawn();
}, "first"), last: m(function() {
  return this[this.length - 1] || this.spawn();
}, "last"), empty: m(function() {
  return this.length === 0;
}, "empty"), nonempty: m(function() {
  return !this.empty();
}, "nonempty"), sort: m(function(e) {
  if (!Ke(e)) return this;
  var t = this.toArray().sort(e);
  return this.spawn(t);
}, "sort"), sortByZIndex: m(function() {
  return this.sort(rf);
}, "sortByZIndex"), zDepth: m(function() {
  var e = this[0];
  if (e) {
    var t = e._private, a = t.group;
    if (a === "nodes") {
      var n = t.data.parent ? e.parents().size() : 0;
      return e.isParent() ? n : js - 1;
    } else {
      var i = t.source, s = t.target, o = i.zDepth(), l = s.zDepth();
      return Math.max(o, l, 0);
    }
  }
}, "zDepth") };
kn.each = kn.forEach;
var fp = m(function() {
  var e = "undefined", t = (typeof Symbol > "u" ? "undefined" : nr(Symbol)) != e && nr(Symbol.iterator) != e;
  t && (kn[Symbol.iterator] = function() {
    var a = this, n = { value: void 0, done: false }, i = 0, s = this.length;
    return jl({ next: m(function() {
      return i < s ? n.value = a[i++] : (n.value = void 0, n.done = true), n;
    }, "next") }, Symbol.iterator, function() {
      return this;
    });
  });
}, "defineSymbolIterator");
fp();
var cp = dr({ nodeDimensionsIncludeLabels: false });
var cn = { layoutDimensions: m(function(e) {
  e = cp(e);
  var t;
  if (!this.takesUpSpace()) t = { w: 0, h: 0 };
  else if (e.nodeDimensionsIncludeLabels) {
    var a = this.boundingBox();
    t = { w: a.w, h: a.h };
  } else t = { w: this.outerWidth(), h: this.outerHeight() };
  return (t.w === 0 || t.h === 0) && (t.w = t.h = 1), t;
}, "layoutDimensions"), layoutPositions: m(function(e, t, a) {
  var n = this.nodes().filter(function(C) {
    return !C.isParent();
  }), i = this.cy(), s = t.eles, o = m(function(T) {
    return T.id();
  }, "getMemoizeKey"), l = Jt(a, o);
  e.emit({ type: "layoutstart", layout: e }), e.animations = [];
  var u = m(function(T, E, S) {
    var D = { x: E.x1 + E.w / 2, y: E.y1 + E.h / 2 }, B = { x: (S.x - D.x) * T, y: (S.y - D.y) * T };
    return { x: D.x + B.x, y: D.y + B.y };
  }, "calculateSpacing"), f = t.spacingFactor && t.spacingFactor !== 1, c = m(function() {
    if (!f) return null;
    for (var T = xr(), E = 0; E < n.length; E++) {
      var S = n[E], D = l(S, E);
      bv(T, D.x, D.y);
    }
    return T;
  }, "spacingBb"), d = c(), g = Jt(function(C, T) {
    var E = l(C, T);
    if (f) {
      var S = Math.abs(t.spacingFactor);
      E = u(S, d, E);
    }
    return t.transform != null && (E = t.transform(C, E)), E;
  }, o);
  if (t.animate) {
    for (var h = 0; h < n.length; h++) {
      var m2 = n[h], p = g(m2, h), y = t.animateFilter == null || t.animateFilter(m2, h);
      if (y) {
        var b = m2.animation({ position: p, duration: t.animationDuration, easing: t.animationEasing });
        e.animations.push(b);
      } else m2.position(p);
    }
    if (t.fit) {
      var w = i.animation({ fit: { boundingBox: s.boundingBoxAt(g), padding: t.padding }, duration: t.animationDuration, easing: t.animationEasing });
      e.animations.push(w);
    } else if (t.zoom !== void 0 && t.pan !== void 0) {
      var x = i.animation({ zoom: t.zoom, pan: t.pan, duration: t.animationDuration, easing: t.animationEasing });
      e.animations.push(x);
    }
    e.animations.forEach(function(C) {
      return C.play();
    }), e.one("layoutready", t.ready), e.emit({ type: "layoutready", layout: e }), aa.all(e.animations.map(function(C) {
      return C.promise();
    })).then(function() {
      e.one("layoutstop", t.stop), e.emit({ type: "layoutstop", layout: e });
    });
  } else n.positions(g), t.fit && i.fit(t.eles, t.padding), t.zoom != null && i.zoom(t.zoom), t.pan && i.pan(t.pan), e.one("layoutready", t.ready), e.emit({ type: "layoutready", layout: e }), e.one("layoutstop", t.stop), e.emit({ type: "layoutstop", layout: e });
  return this;
}, "layoutPositions"), layout: m(function(e) {
  var t = this.cy();
  return t.makeLayout(we({}, e, { eles: this }));
}, "layout") };
cn.createLayout = cn.makeLayout = cn.layout;
function tf(r, e, t) {
  var a = t._private, n = a.styleCache = a.styleCache || [], i;
  return (i = n[r]) != null || (i = n[r] = e(t)), i;
}
m(tf, "styleCache");
function Wn(r, e) {
  return r = Pt(r), m(function(a) {
    return tf(r, e, a);
  }, "cachedStyleFunction");
}
m(Wn, "cacheStyleFunction");
function $n(r, e) {
  r = Pt(r);
  var t = m(function(n) {
    return e.call(n);
  }, "selfFn");
  return m(function() {
    var n = this[0];
    if (n) return tf(r, t, n);
  }, "cachedPrototypeStyleFunction");
}
m($n, "cachePrototypeStyleFunction");
var fr = { recalculateRenderedStyle: m(function(e) {
  var t = this.cy(), a = t.renderer(), n = t.styleEnabled();
  return a && n && a.recalculateRenderedStyle(this, e), this;
}, "recalculateRenderedStyle"), dirtyStyleCache: m(function() {
  var e = this.cy(), t = m(function(i) {
    return i._private.styleCache = null;
  }, "dirty");
  if (e.hasCompoundNodes()) {
    var a;
    a = this.spawnSelf().merge(this.descendants()).merge(this.parents()), a.merge(a.connectedEdges()), a.forEach(t);
  } else this.forEach(function(n) {
    t(n), n.connectedEdges().forEach(t);
  });
  return this;
}, "dirtyStyleCache"), updateStyle: m(function(e) {
  var t = this._private.cy;
  if (!t.styleEnabled()) return this;
  if (t.batching()) {
    var a = t._private.batchStyleEles;
    return a.merge(this), this;
  }
  var n = t.hasCompoundNodes(), i = this;
  e = !!(e || e === void 0), n && (i = this.spawnSelf().merge(this.descendants()).merge(this.parents()));
  var s = i;
  return e ? s.emitAndNotify("style") : s.emit("style"), i.forEach(function(o) {
    return o._private.styleDirty = true;
  }), this;
}, "updateStyle"), cleanStyle: m(function() {
  var e = this.cy();
  if (e.styleEnabled()) for (var t = 0; t < this.length; t++) {
    var a = this[t];
    a._private.styleDirty && (a._private.styleDirty = false, e.style().apply(a));
  }
}, "cleanStyle"), parsedStyle: m(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, a = this[0], n = a.cy();
  if (n.styleEnabled() && a) {
    a._private.styleDirty && (a._private.styleDirty = false, n.style().apply(a));
    var i = a._private.style[e];
    return i ?? (t ? n.style().getDefaultProperty(e) : null);
  }
}, "parsedStyle"), numericStyle: m(function(e) {
  var t = this[0];
  if (t.cy().styleEnabled() && t) {
    var a = t.pstyle(e);
    return a.pfValue !== void 0 ? a.pfValue : a.value;
  }
}, "numericStyle"), numericStyleUnits: m(function(e) {
  var t = this[0];
  if (t.cy().styleEnabled() && t) return t.pstyle(e).units;
}, "numericStyleUnits"), renderedStyle: m(function(e) {
  var t = this.cy();
  if (!t.styleEnabled()) return this;
  var a = this[0];
  if (a) return t.style().getRenderedStyle(a, e);
}, "renderedStyle"), style: m(function(e, t) {
  var a = this.cy();
  if (!a.styleEnabled()) return this;
  var n = false, i = a.style();
  if (Ie(e)) {
    var s = e;
    i.applyBypass(this, s, n), this.emitAndNotify("style");
  } else if (pe(e)) if (t === void 0) {
    var o = this[0];
    return o ? i.getStylePropertyValue(o, e) : void 0;
  } else i.applyBypass(this, e, t, n), this.emitAndNotify("style");
  else if (e === void 0) {
    var l = this[0];
    return l ? i.getRawStyle(l) : void 0;
  }
  return this;
}, "style"), removeStyle: m(function(e) {
  var t = this.cy();
  if (!t.styleEnabled()) return this;
  var a = false, n = t.style(), i = this;
  if (e === void 0) for (var s = 0; s < i.length; s++) {
    var o = i[s];
    n.removeAllBypasses(o, a);
  }
  else {
    e = e.split(/\s+/);
    for (var l = 0; l < i.length; l++) {
      var u = i[l];
      n.removeBypasses(u, e, a);
    }
  }
  return this.emitAndNotify("style"), this;
}, "removeStyle"), show: m(function() {
  return this.css("display", "element"), this;
}, "show"), hide: m(function() {
  return this.css("display", "none"), this;
}, "hide"), effectiveOpacity: m(function() {
  var e = this.cy();
  if (!e.styleEnabled()) return 1;
  var t = e.hasCompoundNodes(), a = this[0];
  if (a) {
    var n = a._private, i = a.pstyle("opacity").value;
    if (!t) return i;
    var s = n.data.parent ? a.parents() : null;
    if (s) for (var o = 0; o < s.length; o++) {
      var l = s[o], u = l.pstyle("opacity").value;
      i = u * i;
    }
    return i;
  }
}, "effectiveOpacity"), transparent: m(function() {
  var e = this.cy();
  if (!e.styleEnabled()) return false;
  var t = this[0], a = t.cy().hasCompoundNodes();
  if (t) return a ? t.effectiveOpacity() === 0 : t.pstyle("opacity").value === 0;
}, "transparent"), backgrounding: m(function() {
  var e = this.cy();
  if (!e.styleEnabled()) return false;
  var t = this[0];
  return !!t._private.backgrounding;
}, "backgrounding") };
function bs(r, e) {
  var t = r._private, a = t.data.parent ? r.parents() : null;
  if (a) for (var n = 0; n < a.length; n++) {
    var i = a[n];
    if (!e(i)) return false;
  }
  return true;
}
m(bs, "checkCompound");
function fo(r) {
  var e = r.ok, t = r.edgeOkViaNode || r.ok, a = r.parentOk || r.ok;
  return function() {
    var n = this.cy();
    if (!n.styleEnabled()) return true;
    var i = this[0], s = n.hasCompoundNodes();
    if (i) {
      var o = i._private;
      if (!e(i)) return false;
      if (i.isNode()) return !s || bs(i, a);
      var l = o.source, u = o.target;
      return t(l) && (!s || bs(l, t)) && (l === u || t(u) && (!s || bs(u, t)));
    }
  };
}
m(fo, "defineDerivedStateFunction");
var na = Wn("eleTakesUpSpace", function(r) {
  return r.pstyle("display").value === "element" && r.width() !== 0 && (r.isNode() ? r.height() !== 0 : true);
});
fr.takesUpSpace = $n("takesUpSpace", fo({ ok: na }));
var dp = Wn("eleInteractive", function(r) {
  return r.pstyle("events").value === "yes" && r.pstyle("visibility").value === "visible" && na(r);
});
var hp = Wn("parentInteractive", function(r) {
  return r.pstyle("visibility").value === "visible" && na(r);
});
fr.interactive = $n("interactive", fo({ ok: dp, parentOk: hp, edgeOkViaNode: na }));
fr.noninteractive = function() {
  var r = this[0];
  if (r) return !r.interactive();
};
var gp = Wn("eleVisible", function(r) {
  return r.pstyle("visibility").value === "visible" && r.pstyle("opacity").pfValue !== 0 && na(r);
});
var pp = na;
fr.visible = $n("visible", fo({ ok: gp, edgeOkViaNode: pp }));
fr.hidden = function() {
  var r = this[0];
  if (r) return !r.visible();
};
fr.isBundledBezier = $n("isBundledBezier", function() {
  return this.cy().styleEnabled() ? !this.removed() && this.pstyle("curve-style").value === "bezier" && this.takesUpSpace() : false;
});
fr.bypass = fr.css = fr.style;
fr.renderedCss = fr.renderedStyle;
fr.removeBypass = fr.removeCss = fr.removeStyle;
fr.pstyle = fr.parsedStyle;
var ut = {};
function gl(r) {
  return function() {
    var e = arguments, t = [];
    if (e.length === 2) {
      var a = e[0], n = e[1];
      this.on(r.event, a, n);
    } else if (e.length === 1 && Ke(e[0])) {
      var i = e[0];
      this.on(r.event, i);
    } else if (e.length === 0 || e.length === 1 && Ge(e[0])) {
      for (var s = e.length === 1 ? e[0] : null, o = 0; o < this.length; o++) {
        var l = this[o], u = !r.ableField || l._private[r.ableField], f = l._private[r.field] != r.value;
        if (r.overrideAble) {
          var c = r.overrideAble(l);
          if (c !== void 0 && (u = c, !c)) return this;
        }
        u && (l._private[r.field] = r.value, f && t.push(l));
      }
      var d = this.spawn(t);
      d.updateStyle(), d.emit(r.event), s && d.emit(s);
    }
    return this;
  };
}
m(gl, "defineSwitchFunction");
function ia(r) {
  ut[r.field] = function() {
    var e = this[0];
    if (e) {
      if (r.overrideField) {
        var t = r.overrideField(e);
        if (t !== void 0) return t;
      }
      return e._private[r.field];
    }
  }, ut[r.on] = gl({ event: r.on, field: r.field, ableField: r.ableField, overrideAble: r.overrideAble, value: true }), ut[r.off] = gl({ event: r.off, field: r.field, ableField: r.ableField, overrideAble: r.overrideAble, value: false });
}
m(ia, "defineSwitchSet");
ia({ field: "locked", overrideField: m(function(e) {
  return e.cy().autolock() ? true : void 0;
}, "overrideField"), on: "lock", off: "unlock" });
ia({ field: "grabbable", overrideField: m(function(e) {
  return e.cy().autoungrabify() || e.pannable() ? false : void 0;
}, "overrideField"), on: "grabify", off: "ungrabify" });
ia({ field: "selected", ableField: "selectable", overrideAble: m(function(e) {
  return e.cy().autounselectify() ? false : void 0;
}, "overrideAble"), on: "select", off: "unselect" });
ia({ field: "selectable", overrideField: m(function(e) {
  return e.cy().autounselectify() ? false : void 0;
}, "overrideField"), on: "selectify", off: "unselectify" });
ut.deselect = ut.unselect;
ut.grabbed = function() {
  var r = this[0];
  if (r) return r._private.grabbed;
};
ia({ field: "active", on: "activate", off: "unactivate" });
ia({ field: "pannable", on: "panify", off: "unpanify" });
ut.inactive = function() {
  var r = this[0];
  if (r) return !r._private.active;
};
var pr = {};
var pl = m(function(e) {
  return m(function(a) {
    for (var n = this, i = [], s = 0; s < n.length; s++) {
      var o = n[s];
      if (o.isNode()) {
        for (var l = false, u = o.connectedEdges(), f = 0; f < u.length; f++) {
          var c = u[f], d = c.source(), g = c.target();
          if (e.noIncomingEdges && g === o && d !== o || e.noOutgoingEdges && d === o && g !== o) {
            l = true;
            break;
          }
        }
        l || i.push(o);
      }
    }
    return this.spawn(i, true).filter(a);
  }, "dagExtremityImpl");
}, "defineDagExtremity");
var yl = m(function(e) {
  return function(t) {
    for (var a = this, n = [], i = 0; i < a.length; i++) {
      var s = a[i];
      if (s.isNode()) for (var o = s.connectedEdges(), l = 0; l < o.length; l++) {
        var u = o[l], f = u.source(), c = u.target();
        e.outgoing && f === s ? (n.push(u), n.push(c)) : e.incoming && c === s && (n.push(u), n.push(f));
      }
    }
    return this.spawn(n, true).filter(t);
  };
}, "defineDagOneHop");
var ml = m(function(e) {
  return function(t) {
    for (var a = this, n = [], i = {}; ; ) {
      var s = e.outgoing ? a.outgoers() : a.incomers();
      if (s.length === 0) break;
      for (var o = false, l = 0; l < s.length; l++) {
        var u = s[l], f = u.id();
        i[f] || (i[f] = true, n.push(u), o = true);
      }
      if (!o) break;
      a = s;
    }
    return this.spawn(n, true).filter(t);
  };
}, "defineDagAllHops");
pr.clearTraversalCache = function() {
  for (var r = 0; r < this.length; r++) this[r]._private.traversalCache = null;
};
we(pr, { roots: pl({ noIncomingEdges: true }), leaves: pl({ noOutgoingEdges: true }), outgoers: Mr(yl({ outgoing: true }), "outgoers"), successors: ml({ outgoing: true }), incomers: Mr(yl({ incoming: true }), "incomers"), predecessors: ml({}) });
we(pr, { neighborhood: Mr(function(r) {
  for (var e = [], t = this.nodes(), a = 0; a < t.length; a++) for (var n = t[a], i = n.connectedEdges(), s = 0; s < i.length; s++) {
    var o = i[s], l = o.source(), u = o.target(), f = n === l ? u : l;
    f.length > 0 && e.push(f[0]), e.push(o[0]);
  }
  return this.spawn(e, true).filter(r);
}, "neighborhood"), closedNeighborhood: m(function(e) {
  return this.neighborhood().add(this).filter(e);
}, "closedNeighborhood"), openNeighborhood: m(function(e) {
  return this.neighborhood(e);
}, "openNeighborhood") });
pr.neighbourhood = pr.neighborhood;
pr.closedNeighbourhood = pr.closedNeighborhood;
pr.openNeighbourhood = pr.openNeighborhood;
we(pr, { source: Mr(m(function(e) {
  var t = this[0], a;
  return t && (a = t._private.source || t.cy().collection()), a && e ? a.filter(e) : a;
}, "sourceImpl"), "source"), target: Mr(m(function(e) {
  var t = this[0], a;
  return t && (a = t._private.target || t.cy().collection()), a && e ? a.filter(e) : a;
}, "targetImpl"), "target"), sources: bl({ attr: "source" }), targets: bl({ attr: "target" }) });
function bl(r) {
  return m(function(t) {
    for (var a = [], n = 0; n < this.length; n++) {
      var i = this[n], s = i._private[r.attr];
      s && a.push(s);
    }
    return this.spawn(a, true).filter(t);
  }, "sourceImpl");
}
m(bl, "defineSourceFunction");
we(pr, { edgesWith: Mr(wl(), "edgesWith"), edgesTo: Mr(wl({ thisIsSrc: true }), "edgesTo") });
function wl(r) {
  return m(function(t) {
    var a = [], n = this._private.cy, i = r || {};
    pe(t) && (t = n.$(t));
    for (var s = 0; s < t.length; s++) for (var o = t[s]._private.edges, l = 0; l < o.length; l++) {
      var u = o[l], f = u._private.data, c = this.hasElementWithId(f.source) && t.hasElementWithId(f.target), d = t.hasElementWithId(f.source) && this.hasElementWithId(f.target), g = c || d;
      g && ((i.thisIsSrc || i.thisIsTgt) && (i.thisIsSrc && !c || i.thisIsTgt && !d) || a.push(u));
    }
    return this.spawn(a, true);
  }, "edgesWithImpl");
}
m(wl, "defineEdgesWithFunction");
we(pr, { connectedEdges: Mr(function(r) {
  for (var e = [], t = this, a = 0; a < t.length; a++) {
    var n = t[a];
    if (n.isNode()) for (var i = n._private.edges, s = 0; s < i.length; s++) {
      var o = i[s];
      e.push(o);
    }
  }
  return this.spawn(e, true).filter(r);
}, "connectedEdges"), connectedNodes: Mr(function(r) {
  for (var e = [], t = this, a = 0; a < t.length; a++) {
    var n = t[a];
    n.isEdge() && (e.push(n.source()[0]), e.push(n.target()[0]));
  }
  return this.spawn(e, true).filter(r);
}, "connectedNodes"), parallelEdges: Mr(xl(), "parallelEdges"), codirectedEdges: Mr(xl({ codirected: true }), "codirectedEdges") });
function xl(r) {
  var e = { codirected: false };
  return r = we({}, e, r), m(function(a) {
    for (var n = [], i = this.edges(), s = r, o = 0; o < i.length; o++) for (var l = i[o], u = l._private, f = u.source, c = f._private.data.id, d = u.data.target, g = f._private.edges, h = 0; h < g.length; h++) {
      var m2 = g[h], p = m2._private.data, y = p.target, b = p.source, w = y === d && b === c, x = c === y && d === b;
      (s.codirected && w || !s.codirected && (w || x)) && n.push(m2);
    }
    return this.spawn(n, true).filter(a);
  }, "parallelEdgesImpl");
}
m(xl, "defineParallelEdgesFunction");
we(pr, { components: m(function(e) {
  var t = this, a = t.cy(), n = a.collection(), i = e == null ? t.nodes() : e.nodes(), s = [];
  e != null && i.empty() && (i = e.sources());
  var o = m(function(f, c) {
    n.merge(f), i.unmerge(f), c.merge(f);
  }, "visitInComponent");
  if (i.empty()) return t.spawn();
  var l = m(function() {
    var f = a.collection();
    s.push(f);
    var c = i[0];
    o(c, f), t.bfs({ directed: false, roots: c, visit: m(function(g) {
      return o(g, f);
    }, "visit") }), f.forEach(function(d) {
      d.connectedEdges().forEach(function(g) {
        t.has(g) && f.has(g.source()) && f.has(g.target()) && f.merge(g);
      });
    });
  }, "_loop");
  do
    l();
  while (i.length > 0);
  return s;
}, "components"), component: m(function() {
  var e = this[0];
  return e.cy().mutableElements().components(e)[0];
}, "component") });
pr.componentsOf = pr.components;
var cr = m(function(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (e === void 0) {
    Ue("A collection must have a reference to the core");
    return;
  }
  var i = new Yr(), s = false;
  if (!t) t = [];
  else if (t.length > 0 && Ie(t[0]) && !Oa(t[0])) {
    s = true;
    for (var o = [], l = new ta(), u = 0, f = t.length; u < f; u++) {
      var c = t[u];
      c.data == null && (c.data = {});
      var d = c.data;
      if (d.id == null) d.id = pv();
      else if (e.hasElementWithId(d.id) || l.has(d.id)) continue;
      var g = new On(e, c, false);
      o.push(g), l.add(d.id);
    }
    t = o;
  }
  this.length = 0;
  for (var h = 0, m2 = t.length; h < m2; h++) {
    var p = t[h][0];
    if (p != null) {
      var y = p._private.data.id;
      (!a || !i.has(y)) && (a && i.set(y, { index: this.length, ele: p }), this[this.length] = p, this.length++);
    }
  }
  this._private = { eles: this, cy: e, get map() {
    return this.lazyMap == null && this.rebuildMap(), this.lazyMap;
  }, set map(b) {
    this.lazyMap = b;
  }, rebuildMap: m(function() {
    for (var w = this.lazyMap = new Yr(), x = this.eles, C = 0; C < x.length; C++) {
      var T = x[C];
      w.set(T.id(), { index: C, ele: T });
    }
  }, "rebuildMap") }, a && (this._private.map = i), s && !n && this.restore();
}, "Collection");
var We = On.prototype = cr.prototype = Object.create(Array.prototype);
We.instanceString = function() {
  return "collection";
};
We.spawn = function(r, e) {
  return new cr(this.cy(), r, e);
};
We.spawnSelf = function() {
  return this.spawn(this);
};
We.cy = function() {
  return this._private.cy;
};
We.renderer = function() {
  return this._private.cy.renderer();
};
We.element = function() {
  return this[0];
};
We.collection = function() {
  return tv(this) ? this : new cr(this._private.cy, [this]);
};
We.unique = function() {
  return new cr(this._private.cy, this, true);
};
We.hasElementWithId = function(r) {
  return r = "" + r, this._private.map.has(r);
};
We.getElementById = function(r) {
  r = "" + r;
  var e = this._private.cy, t = this._private.map.get(r);
  return t ? t.ele : new cr(e);
};
We.$id = We.getElementById;
We.poolIndex = function() {
  var r = this._private.cy, e = r._private.elements, t = this[0]._private.data.id;
  return e._private.map.get(t).index;
};
We.indexOf = function(r) {
  var e = r[0]._private.data.id;
  return this._private.map.get(e).index;
};
We.indexOfId = function(r) {
  return r = "" + r, this._private.map.get(r).index;
};
We.json = function(r) {
  var e = this.element(), t = this.cy();
  if (e == null && r) return this;
  if (e != null) {
    var a = e._private;
    if (Ie(r)) {
      if (t.startBatch(), r.data) {
        e.data(r.data);
        var n = a.data;
        if (e.isEdge()) {
          var i = false, s = {}, o = r.data.source, l = r.data.target;
          o != null && o != n.source && (s.source = "" + o, i = true), l != null && l != n.target && (s.target = "" + l, i = true), i && (e = e.move(s));
        } else {
          var u = "parent" in r.data, f = r.data.parent;
          u && (f != null || n.parent != null) && f != n.parent && (f === void 0 && (f = null), f != null && (f = "" + f), e = e.move({ parent: f }));
        }
      }
      r.position && e.position(r.position);
      var c = m(function(m2, p, y) {
        var b = r[m2];
        b != null && b !== a[m2] && (b ? e[p]() : e[y]());
      }, "checkSwitch");
      return c("removed", "remove", "restore"), c("selected", "select", "unselect"), c("selectable", "selectify", "unselectify"), c("locked", "lock", "unlock"), c("grabbable", "grabify", "ungrabify"), c("pannable", "panify", "unpanify"), r.classes != null && e.classes(r.classes), t.endBatch(), this;
    } else if (r === void 0) {
      var d = { data: _r(a.data), position: _r(a.position), group: a.group, removed: a.removed, selected: a.selected, selectable: a.selectable, locked: a.locked, grabbable: a.grabbable, pannable: a.pannable, classes: null };
      d.classes = "";
      var g = 0;
      return a.classes.forEach(function(h) {
        return d.classes += g++ === 0 ? h : " " + h;
      }), d;
    }
  }
};
We.jsons = function() {
  for (var r = [], e = 0; e < this.length; e++) {
    var t = this[e], a = t.json();
    r.push(a);
  }
  return r;
};
We.clone = function() {
  for (var r = this.cy(), e = [], t = 0; t < this.length; t++) {
    var a = this[t], n = a.json(), i = new On(r, n, false);
    e.push(i);
  }
  return new cr(r, e);
};
We.copy = We.clone;
We.restore = function() {
  for (var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, t = this, a = t.cy(), n = a._private, i = [], s = [], o, l = 0, u = t.length; l < u; l++) {
    var f = t[l];
    e && !f.removed() || (f.isNode() ? i.push(f) : s.push(f));
  }
  o = i.concat(s);
  var c, d = m(function() {
    o.splice(c, 1), c--;
  }, "removeFromElements");
  for (c = 0; c < o.length; c++) {
    var g = o[c], h = g._private, m2 = h.data;
    if (g.clearTraversalCache(), !(!e && !h.removed)) {
      if (m2.id === void 0) m2.id = pv();
      else if (ne(m2.id)) m2.id = "" + m2.id;
      else if (lt(m2.id) || !pe(m2.id)) {
        Ue("Can not create element with invalid string ID `" + m2.id + "`"), d();
        continue;
      } else if (a.hasElementWithId(m2.id)) {
        Ue("Can not create second element with ID `" + m2.id + "`"), d();
        continue;
      }
    }
    var p = m2.id;
    if (g.isNode()) {
      var y = h.position;
      y.x == null && (y.x = 0), y.y == null && (y.y = 0);
    }
    if (g.isEdge()) {
      for (var b = g, w = ["source", "target"], x = w.length, C = false, T = 0; T < x; T++) {
        var E = w[T], S = m2[E];
        ne(S) && (S = m2[E] = "" + m2[E]), S == null || S === "" ? (Ue("Can not create edge `" + p + "` with unspecified " + E), C = true) : a.hasElementWithId(S) || (Ue("Can not create edge `" + p + "` with nonexistant " + E + " `" + S + "`"), C = true);
      }
      if (C) {
        d();
        continue;
      }
      var D = a.getElementById(m2.source), B = a.getElementById(m2.target);
      D.same(B) ? D._private.edges.push(b) : (D._private.edges.push(b), B._private.edges.push(b)), b._private.source = D, b._private.target = B;
    }
    h.map = new Yr(), h.map.set(p, { ele: g, index: 0 }), h.removed = false, e && a.addToPool(g);
  }
  for (var P = 0; P < i.length; P++) {
    var A = i[P], R = A._private.data;
    ne(R.parent) && (R.parent = "" + R.parent);
    var M = R.parent, I = M != null;
    if (I || A._private.parent) {
      var O = A._private.parent ? a.collection().merge(A._private.parent) : a.getElementById(M);
      if (O.empty()) R.parent = void 0;
      else if (O[0].removed()) qe("Node added with missing parent, reference to parent removed"), R.parent = void 0, A._private.parent = null;
      else {
        for (var L = false, N = O; !N.empty(); ) {
          if (A.same(N)) {
            L = true, R.parent = void 0;
            break;
          }
          N = N.parent();
        }
        L || (O[0]._private.children.push(A), A._private.parent = O[0], n.hasCompoundNodes = true);
      }
    }
  }
  if (o.length > 0) {
    for (var q = o.length === t.length ? t : new cr(a, o), H = 0; H < q.length; H++) {
      var z = q[H];
      z.isNode() || (z.parallelEdges().clearTraversalCache(), z.source().clearTraversalCache(), z.target().clearTraversalCache());
    }
    var V;
    n.hasCompoundNodes ? V = a.collection().merge(q).merge(q.connectedNodes()).merge(q.parent()) : V = q, V.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(r), r ? q.emitAndNotify("add") : e && q.emit("add");
  }
  return t;
};
We.removed = function() {
  var r = this[0];
  return r && r._private.removed;
};
We.inside = function() {
  var r = this[0];
  return r && !r._private.removed;
};
We.remove = function() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, t = this, a = [], n = {}, i = t._private.cy;
  function s(M) {
    for (var I = M._private.edges, O = 0; O < I.length; O++) l(I[O]);
  }
  m(s, "addConnectedEdges");
  function o(M) {
    for (var I = M._private.children, O = 0; O < I.length; O++) l(I[O]);
  }
  m(o, "addChildren");
  function l(M) {
    var I = n[M.id()];
    e && M.removed() || I || (n[M.id()] = true, M.isNode() ? (a.push(M), s(M), o(M)) : a.unshift(M));
  }
  m(l, "add");
  for (var u = 0, f = t.length; u < f; u++) {
    var c = t[u];
    l(c);
  }
  function d(M, I) {
    var O = M._private.edges;
    vt(O, I), M.clearTraversalCache();
  }
  m(d, "removeEdgeRef");
  function g(M) {
    M.clearTraversalCache();
  }
  m(g, "removeParallelRef");
  var h = [];
  h.ids = {};
  function m2(M, I) {
    I = I[0], M = M[0];
    var O = M._private.children, L = M.id();
    vt(O, I), I._private.parent = null, h.ids[L] || (h.ids[L] = true, h.push(M));
  }
  m(m2, "removeChildRef"), t.dirtyCompoundBoundsCache(), e && i.removeFromPool(a);
  for (var p = 0; p < a.length; p++) {
    var y = a[p];
    if (y.isEdge()) {
      var b = y.source()[0], w = y.target()[0];
      d(b, y), d(w, y);
      for (var x = y.parallelEdges(), C = 0; C < x.length; C++) {
        var T = x[C];
        g(T), T.isBundledBezier() && T.dirtyBoundingBoxCache();
      }
    } else {
      var E = y.parent();
      E.length !== 0 && m2(E, y);
    }
    e && (y._private.removed = true);
  }
  var S = i._private.elements;
  i._private.hasCompoundNodes = false;
  for (var D = 0; D < S.length; D++) {
    var B = S[D];
    if (B.isParent()) {
      i._private.hasCompoundNodes = true;
      break;
    }
  }
  var P = new cr(this.cy(), a);
  P.size() > 0 && (r ? P.emitAndNotify("remove") : e && P.emit("remove"));
  for (var A = 0; A < h.length; A++) {
    var R = h[A];
    (!e || !R.removed()) && R.updateStyle();
  }
  return P;
};
We.move = function(r) {
  var e = this._private.cy, t = this, a = false, n = false, i = m(function(h) {
    return h == null ? h : "" + h;
  }, "toString");
  if (r.source !== void 0 || r.target !== void 0) {
    var s = i(r.source), o = i(r.target), l = s != null && e.hasElementWithId(s), u = o != null && e.hasElementWithId(o);
    (l || u) && (e.batch(function() {
      t.remove(a, n), t.emitAndNotify("moveout");
      for (var g = 0; g < t.length; g++) {
        var h = t[g], m2 = h._private.data;
        h.isEdge() && (l && (m2.source = s), u && (m2.target = o));
      }
      t.restore(a, n);
    }), t.emitAndNotify("move"));
  } else if (r.parent !== void 0) {
    var f = i(r.parent), c = f === null || e.hasElementWithId(f);
    if (c) {
      var d = f === null ? void 0 : f;
      e.batch(function() {
        var g = t.remove(a, n);
        g.emitAndNotify("moveout");
        for (var h = 0; h < t.length; h++) {
          var m2 = t[h], p = m2._private.data;
          m2.isNode() && (p.parent = d);
        }
        g.restore(a, n);
      }), t.emitAndNotify("move");
    }
  }
  return this;
};
[Bv, Dg, fn, ot, ea, Hg, Gn, ip, jv, ef, vp, kn, cn, fr, ut, pr].forEach(function(r) {
  we(We, r);
});
var yp = { add: m(function(e) {
  var t, a = this;
  if (Br(e)) {
    var n = e;
    if (n._private.cy === a) t = n.restore();
    else {
      for (var i = [], s = 0; s < n.length; s++) {
        var o = n[s];
        i.push(o.json());
      }
      t = new cr(a, i);
    }
  } else if (Ge(e)) {
    var l = e;
    t = new cr(a, l);
  } else if (Ie(e) && (Ge(e.nodes) || Ge(e.edges))) {
    for (var u = e, f = [], c = ["nodes", "edges"], d = 0, g = c.length; d < g; d++) {
      var h = c[d], m2 = u[h];
      if (Ge(m2)) for (var p = 0, y = m2.length; p < y; p++) {
        var b = we({ group: h }, m2[p]);
        f.push(b);
      }
    }
    t = new cr(a, f);
  } else {
    var w = e;
    t = new On(a, w).collection();
  }
  return t;
}, "add"), remove: m(function(e) {
  if (!Br(e)) {
    if (pe(e)) {
      var t = e;
      e = this.$(t);
    }
  }
  return e.remove();
}, "remove") };
function mp(r, e, t, a) {
  var n = 4, i = 1e-3, s = 1e-7, o = 10, l = 11, u = 1 / (l - 1), f = typeof Float32Array < "u";
  if (arguments.length !== 4) return false;
  for (var c = 0; c < 4; ++c) if (typeof arguments[c] != "number" || isNaN(arguments[c]) || !isFinite(arguments[c])) return false;
  r = Math.min(r, 1), t = Math.min(t, 1), r = Math.max(r, 0), t = Math.max(t, 0);
  var d = f ? new Float32Array(l) : new Array(l);
  function g(B, P) {
    return 1 - 3 * P + 3 * B;
  }
  m(g, "A");
  function h(B, P) {
    return 3 * P - 6 * B;
  }
  m(h, "B");
  function m2(B) {
    return 3 * B;
  }
  m(m2, "C");
  function p(B, P, A) {
    return ((g(P, A) * B + h(P, A)) * B + m2(P)) * B;
  }
  m(p, "calcBezier");
  function y(B, P, A) {
    return 3 * g(P, A) * B * B + 2 * h(P, A) * B + m2(P);
  }
  m(y, "getSlope");
  function b(B, P) {
    for (var A = 0; A < n; ++A) {
      var R = y(P, r, t);
      if (R === 0) return P;
      var M = p(P, r, t) - B;
      P -= M / R;
    }
    return P;
  }
  m(b, "newtonRaphsonIterate");
  function w() {
    for (var B = 0; B < l; ++B) d[B] = p(B * u, r, t);
  }
  m(w, "calcSampleValues");
  function x(B, P, A) {
    var R, M, I = 0;
    do
      M = P + (A - P) / 2, R = p(M, r, t) - B, R > 0 ? A = M : P = M;
    while (Math.abs(R) > s && ++I < o);
    return M;
  }
  m(x, "binarySubdivide");
  function C(B) {
    for (var P = 0, A = 1, R = l - 1; A !== R && d[A] <= B; ++A) P += u;
    --A;
    var M = (B - d[A]) / (d[A + 1] - d[A]), I = P + M * u, O = y(I, r, t);
    return O >= i ? b(B, I) : O === 0 ? I : x(B, P, P + u);
  }
  m(C, "getTForX");
  var T = false;
  function E() {
    T = true, (r !== e || t !== a) && w();
  }
  m(E, "precompute");
  var S = m(function(P) {
    return T || E(), r === e && t === a ? P : P === 0 ? 0 : P === 1 ? 1 : p(C(P), e, a);
  }, "f");
  S.getControlPoints = function() {
    return [{ x: r, y: e }, { x: t, y: a }];
  };
  var D = "generateBezier(" + [r, e, t, a] + ")";
  return S.toString = function() {
    return D;
  }, S;
}
m(mp, "generateCubicBezier");
var bp = function() {
  function r(a) {
    return -a.tension * a.x - a.friction * a.v;
  }
  m(r, "springAccelerationForState");
  function e(a, n, i) {
    var s = { x: a.x + i.dx * n, v: a.v + i.dv * n, tension: a.tension, friction: a.friction };
    return { dx: s.v, dv: r(s) };
  }
  m(e, "springEvaluateStateWithDerivative");
  function t(a, n) {
    var i = { dx: a.v, dv: r(a) }, s = e(a, n * 0.5, i), o = e(a, n * 0.5, s), l = e(a, n, o), u = 1 / 6 * (i.dx + 2 * (s.dx + o.dx) + l.dx), f = 1 / 6 * (i.dv + 2 * (s.dv + o.dv) + l.dv);
    return a.x = a.x + u * n, a.v = a.v + f * n, a;
  }
  return m(t, "springIntegrateState"), m(function a(n, i, s) {
    var o = { x: -1, v: 0, tension: null, friction: null }, l = [0], u = 0, f = 1 / 1e4, c = 16 / 1e3, d, g, h;
    for (n = parseFloat(n) || 500, i = parseFloat(i) || 20, s = s || null, o.tension = n, o.friction = i, d = s !== null, d ? (u = a(n, i), g = u / s * c) : g = c; h = t(h || o, g), l.push(1 + h.x), u += 16, Math.abs(h.x) > f && Math.abs(h.v) > f; ) ;
    return d ? function(m2) {
      return l[m2 * (l.length - 1) | 0];
    } : u;
  }, "springRK4Factory");
}();
var He = m(function(e, t, a, n) {
  var i = mp(e, t, a, n);
  return function(s, o, l) {
    return s + (o - s) * i(l);
  };
}, "cubicBezier");
var dn = { linear: m(function(e, t, a) {
  return e + (t - e) * a;
}, "linear"), ease: He(0.25, 0.1, 0.25, 1), "ease-in": He(0.42, 0, 1, 1), "ease-out": He(0, 0, 0.58, 1), "ease-in-out": He(0.42, 0, 0.58, 1), "ease-in-sine": He(0.47, 0, 0.745, 0.715), "ease-out-sine": He(0.39, 0.575, 0.565, 1), "ease-in-out-sine": He(0.445, 0.05, 0.55, 0.95), "ease-in-quad": He(0.55, 0.085, 0.68, 0.53), "ease-out-quad": He(0.25, 0.46, 0.45, 0.94), "ease-in-out-quad": He(0.455, 0.03, 0.515, 0.955), "ease-in-cubic": He(0.55, 0.055, 0.675, 0.19), "ease-out-cubic": He(0.215, 0.61, 0.355, 1), "ease-in-out-cubic": He(0.645, 0.045, 0.355, 1), "ease-in-quart": He(0.895, 0.03, 0.685, 0.22), "ease-out-quart": He(0.165, 0.84, 0.44, 1), "ease-in-out-quart": He(0.77, 0, 0.175, 1), "ease-in-quint": He(0.755, 0.05, 0.855, 0.06), "ease-out-quint": He(0.23, 1, 0.32, 1), "ease-in-out-quint": He(0.86, 0, 0.07, 1), "ease-in-expo": He(0.95, 0.05, 0.795, 0.035), "ease-out-expo": He(0.19, 1, 0.22, 1), "ease-in-out-expo": He(1, 0, 0, 1), "ease-in-circ": He(0.6, 0.04, 0.98, 0.335), "ease-out-circ": He(0.075, 0.82, 0.165, 1), "ease-in-out-circ": He(0.785, 0.135, 0.15, 0.86), spring: m(function(e, t, a) {
  if (a === 0) return dn.linear;
  var n = bp(e, t, a);
  return function(i, s, o) {
    return i + (s - i) * n(o);
  };
}, "spring"), "cubic-bezier": He };
function El(r, e, t, a, n) {
  if (a === 1 || e === t) return t;
  var i = n(e, t, a);
  return r == null || ((r.roundValue || r.color) && (i = Math.round(i)), r.min !== void 0 && (i = Math.max(i, r.min)), r.max !== void 0 && (i = Math.min(i, r.max))), i;
}
m(El, "getEasedValue");
function Cl(r, e) {
  return r.pfValue != null || r.value != null ? r.pfValue != null && (e == null || e.type.units !== "%") ? r.pfValue : r.value : r;
}
m(Cl, "getValue");
function Vt(r, e, t, a, n) {
  var i = n != null ? n.type : null;
  t < 0 ? t = 0 : t > 1 && (t = 1);
  var s = Cl(r, n), o = Cl(e, n);
  if (ne(s) && ne(o)) return El(i, s, o, t, a);
  if (Ge(s) && Ge(o)) {
    for (var l = [], u = 0; u < o.length; u++) {
      var f = s[u], c = o[u];
      if (f != null && c != null) {
        var d = El(i, f, c, t, a);
        l.push(d);
      } else l.push(c);
    }
    return l;
  }
}
m(Vt, "ease");
function wp(r, e, t, a) {
  var n = !a, i = r._private, s = e._private, o = s.easing, l = s.startTime, u = a ? r : r.cy(), f = u.style();
  if (!s.easingImpl) if (o == null) s.easingImpl = dn.linear;
  else {
    var c;
    if (pe(o)) {
      var d = f.parse("transition-timing-function", o);
      c = d.value;
    } else c = o;
    var g, h;
    pe(c) ? (g = c, h = []) : (g = c[1], h = c.slice(2).map(function(q) {
      return +q;
    })), h.length > 0 ? (g === "spring" && h.push(s.duration), s.easingImpl = dn[g].apply(null, h)) : s.easingImpl = dn[g];
  }
  var m2 = s.easingImpl, p;
  if (s.duration === 0 ? p = 1 : p = (t - l) / s.duration, s.applying && (p = s.progress), p < 0 ? p = 0 : p > 1 && (p = 1), s.delay == null) {
    var y = s.startPosition, b = s.position;
    if (b && n && !r.locked()) {
      var w = {};
      ha(y.x, b.x) && (w.x = Vt(y.x, b.x, p, m2)), ha(y.y, b.y) && (w.y = Vt(y.y, b.y, p, m2)), r.position(w);
    }
    var x = s.startPan, C = s.pan, T = i.pan, E = C != null && a;
    E && (ha(x.x, C.x) && (T.x = Vt(x.x, C.x, p, m2)), ha(x.y, C.y) && (T.y = Vt(x.y, C.y, p, m2)), r.emit("pan"));
    var S = s.startZoom, D = s.zoom, B = D != null && a;
    B && (ha(S, D) && (i.zoom = Da(i.minZoom, Vt(S, D, p, m2), i.maxZoom)), r.emit("zoom")), (E || B) && r.emit("viewport");
    var P = s.style;
    if (P && P.length > 0 && n) {
      for (var A = 0; A < P.length; A++) {
        var R = P[A], M = R.name, I = R, O = s.startStyle[M], L = f.properties[O.name], N = Vt(O, I, p, m2, L);
        f.overrideBypass(r, M, N);
      }
      r.emit("style");
    }
  }
  return s.progress = p, p;
}
m(wp, "step$1");
function ha(r, e) {
  return r == null || e == null ? false : ne(r) && ne(e) ? true : !!(r && e);
}
m(ha, "valid");
function xp(r, e, t, a) {
  var n = e._private;
  n.started = true, n.startTime = t - n.progress * n.duration;
}
m(xp, "startAnimation");
function Tl(r, e) {
  var t = e._private.aniEles, a = [];
  function n(f, c) {
    var d = f._private, g = d.animation.current, h = d.animation.queue, m2 = false;
    if (g.length === 0) {
      var p = h.shift();
      p && g.push(p);
    }
    for (var y = m(function(T) {
      for (var E = T.length - 1; E >= 0; E--) {
        var S = T[E];
        S();
      }
      T.splice(0, T.length);
    }, "callbacks"), b = g.length - 1; b >= 0; b--) {
      var w = g[b], x = w._private;
      if (x.stopped) {
        g.splice(b, 1), x.hooked = false, x.playing = false, x.started = false, y(x.frames);
        continue;
      }
      !x.playing && !x.applying || (x.playing && x.applying && (x.applying = false), x.started || xp(f, w, r), wp(f, w, r, c), x.applying && (x.applying = false), y(x.frames), x.step != null && x.step(r), w.completed() && (g.splice(b, 1), x.hooked = false, x.playing = false, x.started = false, y(x.completes)), m2 = true);
    }
    return !c && g.length === 0 && h.length === 0 && a.push(f), m2;
  }
  m(n, "stepOne");
  for (var i = false, s = 0; s < t.length; s++) {
    var o = t[s], l = n(o);
    i = i || l;
  }
  var u = n(e, true);
  (i || u) && (t.length > 0 ? e.notify("draw", t) : e.notify("draw")), t.unmerge(a), e.emit("step");
}
m(Tl, "stepAll");
var Ep = { animate: Ve.animate(), animation: Ve.animation(), animated: Ve.animated(), clearQueue: Ve.clearQueue(), delay: Ve.delay(), delayAnimation: Ve.delayAnimation(), stop: Ve.stop(), addToAnimationPool: m(function(e) {
  var t = this;
  t.styleEnabled() && t._private.aniEles.merge(e);
}, "addToAnimationPool"), stopAnimationLoop: m(function() {
  this._private.animationsRunning = false;
}, "stopAnimationLoop"), startAnimationLoop: m(function() {
  var e = this;
  if (e._private.animationsRunning = true, !e.styleEnabled()) return;
  function t() {
    e._private.animationsRunning && xn(m(function(i) {
      Tl(i, e), t();
    }, "animationStep"));
  }
  m(t, "headlessStep");
  var a = e.renderer();
  a && a.beforeRender ? a.beforeRender(m(function(i, s) {
    Tl(s, e);
  }, "rendererAnimationStep"), a.beforeRenderPriorities.animations) : t();
}, "startAnimationLoop") };
var Cp = { qualifierCompare: m(function(e, t) {
  return e == null || t == null ? e == null && t == null : e.sameText(t);
}, "qualifierCompare"), eventMatches: m(function(e, t, a) {
  var n = t.qualifier;
  return n != null ? e !== a.target && Oa(a.target) && n.matches(a.target) : true;
}, "eventMatches"), addEventFields: m(function(e, t) {
  t.cy = e, t.target = e;
}, "addEventFields"), callbackContext: m(function(e, t, a) {
  return t.qualifier != null ? a.target : e;
}, "callbackContext") };
var an = m(function(e) {
  return pe(e) ? new ct(e) : e;
}, "argSelector");
var af = { createEmitter: m(function() {
  var e = this._private;
  return e.emitter || (e.emitter = new Hn(Cp, this)), this;
}, "createEmitter"), emitter: m(function() {
  return this._private.emitter;
}, "emitter"), on: m(function(e, t, a) {
  return this.emitter().on(e, an(t), a), this;
}, "on"), removeListener: m(function(e, t, a) {
  return this.emitter().removeListener(e, an(t), a), this;
}, "removeListener"), removeAllListeners: m(function() {
  return this.emitter().removeAllListeners(), this;
}, "removeAllListeners"), one: m(function(e, t, a) {
  return this.emitter().one(e, an(t), a), this;
}, "one"), once: m(function(e, t, a) {
  return this.emitter().one(e, an(t), a), this;
}, "once"), emit: m(function(e, t) {
  return this.emitter().emit(e, t), this;
}, "emit"), emitAndNotify: m(function(e, t) {
  return this.emit(e), this.notify(e, t), this;
}, "emitAndNotify") };
Ve.eventAliasesOn(af);
var Fs = { png: m(function(e) {
  var t = this._private.renderer;
  return e = e || {}, t.png(e);
}, "png"), jpg: m(function(e) {
  var t = this._private.renderer;
  return e = e || {}, e.bg = e.bg || "#fff", t.jpg(e);
}, "jpg") };
Fs.jpeg = Fs.jpg;
var hn = { layout: m(function(e) {
  var t = this;
  if (e == null) {
    Ue("Layout options must be specified to make a layout");
    return;
  }
  if (e.name == null) {
    Ue("A `name` must be specified to make a layout");
    return;
  }
  var a = e.name, n = t.extension("layout", a);
  if (n == null) {
    Ue("No such layout `" + a + "` found.  Did you forget to import it and `cytoscape.use()` it?");
    return;
  }
  var i;
  pe(e.eles) ? i = t.$(e.eles) : i = e.eles != null ? e.eles : t.$();
  var s = new n(we({}, e, { cy: t, eles: i }));
  return s;
}, "layout") };
hn.createLayout = hn.makeLayout = hn.layout;
var Tp = { notify: m(function(e, t) {
  var a = this._private;
  if (this.batching()) {
    a.batchNotifications = a.batchNotifications || {};
    var n = a.batchNotifications[e] = a.batchNotifications[e] || this.collection();
    t != null && n.merge(t);
    return;
  }
  if (a.notificationsEnabled) {
    var i = this.renderer();
    this.destroyed() || !i || i.notify(e, t);
  }
}, "notify"), notifications: m(function(e) {
  var t = this._private;
  return e === void 0 ? t.notificationsEnabled : (t.notificationsEnabled = !!e, this);
}, "notifications"), noNotifications: m(function(e) {
  this.notifications(false), e(), this.notifications(true);
}, "noNotifications"), batching: m(function() {
  return this._private.batchCount > 0;
}, "batching"), startBatch: m(function() {
  var e = this._private;
  return e.batchCount == null && (e.batchCount = 0), e.batchCount === 0 && (e.batchStyleEles = this.collection(), e.batchNotifications = {}), e.batchCount++, this;
}, "startBatch"), endBatch: m(function() {
  var e = this._private;
  if (e.batchCount === 0) return this;
  if (e.batchCount--, e.batchCount === 0) {
    e.batchStyleEles.updateStyle();
    var t = this.renderer();
    Object.keys(e.batchNotifications).forEach(function(a) {
      var n = e.batchNotifications[a];
      n.empty() ? t.notify(a) : t.notify(a, n);
    });
  }
  return this;
}, "endBatch"), batch: m(function(e) {
  return this.startBatch(), e(), this.endBatch(), this;
}, "batch"), batchData: m(function(e) {
  var t = this;
  return this.batch(function() {
    for (var a = Object.keys(e), n = 0; n < a.length; n++) {
      var i = a[n], s = e[i], o = t.getElementById(i);
      o.data(s);
    }
  });
}, "batchData") };
var Sp = dr({ hideEdgesOnViewport: false, textureOnViewport: false, motionBlur: false, motionBlurOpacity: 0.05, pixelRatio: void 0, desktopTapThreshold: 4, touchTapThreshold: 8, wheelSensitivity: 1, debug: false, showFps: false, webgl: false, webglDebug: false, webglDebugShowAtlases: false, webglTexSize: 2048, webglTexRows: 36, webglTexRowsNodes: 18, webglBatchSize: 2048, webglTexPerBatch: 14, webglBgColor: [255, 255, 255] });
var Vs = { renderTo: m(function(e, t, a, n) {
  var i = this._private.renderer;
  return i.renderTo(e, t, a, n), this;
}, "renderTo"), renderer: m(function() {
  return this._private.renderer;
}, "renderer"), forceRender: m(function() {
  return this.notify("draw"), this;
}, "forceRender"), resize: m(function() {
  return this.invalidateSize(), this.emitAndNotify("resize"), this;
}, "resize"), initRenderer: m(function(e) {
  var t = this, a = t.extension("renderer", e.name);
  if (a == null) {
    Ue("Can not initialise: No such renderer `".concat(e.name, "` found. Did you forget to import it and `cytoscape.use()` it?"));
    return;
  }
  e.wheelSensitivity !== void 0 && qe("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");
  var n = Sp(e);
  n.cy = t, t._private.renderer = new a(n), this.notify("init");
}, "initRenderer"), destroyRenderer: m(function() {
  var e = this;
  e.notify("destroy");
  var t = e.container();
  if (t) for (t._cyreg = null; t.childNodes.length > 0; ) t.removeChild(t.childNodes[0]);
  e._private.renderer = null, e.mutableElements().forEach(function(a) {
    var n = a._private;
    n.rscratch = {}, n.rstyle = {}, n.animation.current = [], n.animation.queue = [];
  });
}, "destroyRenderer"), onRender: m(function(e) {
  return this.on("render", e);
}, "onRender"), offRender: m(function(e) {
  return this.off("render", e);
}, "offRender") };
Vs.invalidateDimensions = Vs.resize;
var gn = { collection: m(function(e, t) {
  return pe(e) ? this.$(e) : Br(e) ? e.collection() : Ge(e) ? (t || (t = {}), new cr(this, e, t.unique, t.removed)) : new cr(this);
}, "collection"), nodes: m(function(e) {
  var t = this.$(function(a) {
    return a.isNode();
  });
  return e ? t.filter(e) : t;
}, "nodes"), edges: m(function(e) {
  var t = this.$(function(a) {
    return a.isEdge();
  });
  return e ? t.filter(e) : t;
}, "edges"), $: m(function(e) {
  var t = this._private.elements;
  return e ? t.filter(e) : t.spawnSelf();
}, "$"), mutableElements: m(function() {
  return this._private.elements;
}, "mutableElements") };
gn.elements = gn.filter = gn.$;
var lr = {};
var xa = "t";
var kp = "f";
lr.apply = function(r) {
  for (var e = this, t = e._private, a = t.cy, n = a.collection(), i = 0; i < r.length; i++) {
    var s = r[i], o = e.getContextMeta(s);
    if (!o.empty) {
      var l = e.getContextStyle(o), u = e.applyContextStyle(o, l, s);
      s._private.appliedInitStyle ? e.updateTransitions(s, u.diffProps) : s._private.appliedInitStyle = true;
      var f = e.updateStyleHints(s);
      f && n.push(s);
    }
  }
  return n;
};
lr.getPropertiesDiff = function(r, e) {
  var t = this, a = t._private.propDiffs = t._private.propDiffs || {}, n = r + "-" + e, i = a[n];
  if (i) return i;
  for (var s = [], o = {}, l = 0; l < t.length; l++) {
    var u = t[l], f = r[l] === xa, c = e[l] === xa, d = f !== c, g = u.mappedProperties.length > 0;
    if (d || c && g) {
      var h = void 0;
      d && g || d ? h = u.properties : g && (h = u.mappedProperties);
      for (var m2 = 0; m2 < h.length; m2++) {
        for (var p = h[m2], y = p.name, b = false, w = l + 1; w < t.length; w++) {
          var x = t[w], C = e[w] === xa;
          if (C && (b = x.properties[p.name] != null, b)) break;
        }
        !o[y] && !b && (o[y] = true, s.push(y));
      }
    }
  }
  return a[n] = s, s;
};
lr.getContextMeta = function(r) {
  for (var e = this, t = "", a, n = r._private.styleCxtKey || "", i = 0; i < e.length; i++) {
    var s = e[i], o = s.selector && s.selector.matches(r);
    o ? t += xa : t += kp;
  }
  return a = e.getPropertiesDiff(n, t), r._private.styleCxtKey = t, { key: t, diffPropNames: a, empty: a.length === 0 };
};
lr.getContextStyle = function(r) {
  var e = r.key, t = this, a = this._private.contextStyles = this._private.contextStyles || {};
  if (a[e]) return a[e];
  for (var n = { _private: { key: e } }, i = 0; i < t.length; i++) {
    var s = t[i], o = e[i] === xa;
    if (o) for (var l = 0; l < s.properties.length; l++) {
      var u = s.properties[l];
      n[u.name] = u;
    }
  }
  return a[e] = n, n;
};
lr.applyContextStyle = function(r, e, t) {
  for (var a = this, n = r.diffPropNames, i = {}, s = a.types, o = 0; o < n.length; o++) {
    var l = n[o], u = e[l], f = t.pstyle(l);
    if (!u) if (f) f.bypass ? u = { name: l, deleteBypassed: true } : u = { name: l, delete: true };
    else continue;
    if (f !== u) {
      if (u.mapped === s.fn && f != null && f.mapping != null && f.mapping.value === u.value) {
        var c = f.mapping, d = c.fnValue = u.value(t);
        if (d === c.prevFnValue) continue;
      }
      var g = i[l] = { prev: f };
      a.applyParsedProperty(t, u), g.next = t.pstyle(l), g.next && g.next.bypass && (g.next = g.next.bypassed);
    }
  }
  return { diffProps: i };
};
lr.updateStyleHints = function(r) {
  var e = r._private, t = this, a = t.propertyGroupNames, n = t.propertyGroupKeys, i = m(function(W, Z, ae) {
    return t.getPropertiesHash(W, Z, ae);
  }, "propHash"), s = e.styleKey;
  if (r.removed()) return false;
  var o = e.group === "nodes", l = r._private.style;
  a = Object.keys(l);
  for (var u = 0; u < n.length; u++) {
    var f = n[u];
    e.styleKeys[f] = [kt, Wt];
  }
  for (var c = m(function(W, Z) {
    return e.styleKeys[Z][0] = Ta(W, e.styleKeys[Z][0]);
  }, "updateGrKey1"), d = m(function(W, Z) {
    return e.styleKeys[Z][1] = Sa(W, e.styleKeys[Z][1]);
  }, "updateGrKey2"), g = m(function(W, Z) {
    c(W, Z), d(W, Z);
  }, "updateGrKey"), h = m(function(W, Z) {
    for (var ae = 0; ae < W.length; ae++) {
      var de = W.charCodeAt(ae);
      c(de, Z), d(de, Z);
    }
  }, "updateGrKeyWStr"), m2 = 2e9, p = m(function(W) {
    return -128 < W && W < 128 && Math.floor(W) !== W ? m2 - (W * 1024 | 0) : W;
  }, "cleanNum"), y = 0; y < a.length; y++) {
    var b = a[y], w = l[b];
    if (w != null) {
      var x = this.properties[b], C = x.type, T = x.groupKey, E = void 0;
      x.hashOverride != null ? E = x.hashOverride(r, w) : w.pfValue != null && (E = w.pfValue);
      var S = x.enums == null ? w.value : null, D = E != null, B = S != null, P = D || B, A = w.units;
      if (C.number && P && !C.multiple) {
        var R = D ? E : S;
        g(p(R), T), !D && A != null && h(A, T);
      } else h(w.strValue, T);
    }
  }
  for (var M = [kt, Wt], I = 0; I < n.length; I++) {
    var O = n[I], L = e.styleKeys[O];
    M[0] = Ta(L[0], M[0]), M[1] = Sa(L[1], M[1]);
  }
  e.styleKey = Gc(M[0], M[1]);
  var N = e.styleKeys;
  e.labelDimsKey = rt(N.labelDimensions);
  var q = i(r, ["label"], N.labelDimensions);
  if (e.labelKey = rt(q), e.labelStyleKey = rt(Ya(N.commonLabel, q)), !o) {
    var H = i(r, ["source-label"], N.labelDimensions);
    e.sourceLabelKey = rt(H), e.sourceLabelStyleKey = rt(Ya(N.commonLabel, H));
    var z = i(r, ["target-label"], N.labelDimensions);
    e.targetLabelKey = rt(z), e.targetLabelStyleKey = rt(Ya(N.commonLabel, z));
  }
  if (o) {
    var V = e.styleKeys, K = V.nodeBody, J = V.nodeBorder, X = V.nodeOutline, ee = V.backgroundImage, te = V.compound, ie = V.pie, j = V.stripe, F = [K, J, X, ee, te, ie, j].filter(function(_) {
      return _ != null;
    }).reduce(Ya, [kt, Wt]);
    e.nodeKey = rt(F), e.hasPie = ie != null && ie[0] !== kt && ie[1] !== Wt, e.hasStripe = j != null && j[0] !== kt && j[1] !== Wt;
  }
  return s !== e.styleKey;
};
lr.clearStyleHints = function(r) {
  var e = r._private;
  e.styleCxtKey = "", e.styleKeys = {}, e.styleKey = null, e.labelKey = null, e.labelStyleKey = null, e.sourceLabelKey = null, e.sourceLabelStyleKey = null, e.targetLabelKey = null, e.targetLabelStyleKey = null, e.nodeKey = null, e.hasPie = null, e.hasStripe = null;
};
lr.applyParsedProperty = function(r, e) {
  var t = this, a = e, n = r._private.style, i, s = t.types, o = t.properties[a.name].type, l = a.bypass, u = n[a.name], f = u && u.bypass, c = r._private, d = "mapping", g = m(function(K) {
    return K == null ? null : K.pfValue != null ? K.pfValue : K.value;
  }, "getVal"), h = m(function() {
    var K = g(u), J = g(a);
    t.checkTriggers(r, a.name, K, J);
  }, "checkTriggers");
  if (e.name === "curve-style" && r.isEdge() && (e.value !== "bezier" && r.isLoop() || e.value === "haystack" && (r.source().isParent() || r.target().isParent())) && (a = e = this.parse(e.name, "bezier", l)), a.delete) return n[a.name] = void 0, h(), true;
  if (a.deleteBypassed) return u ? u.bypass ? (u.bypassed = void 0, h(), true) : false : (h(), true);
  if (a.deleteBypass) return u ? u.bypass ? (n[a.name] = u.bypassed, h(), true) : false : (h(), true);
  var m2 = m(function() {
    qe("Do not assign mappings to elements without corresponding data (i.e. ele `" + r.id() + "` has no mapping for property `" + a.name + "` with data field `" + a.field + "`); try a `[" + a.field + "]` selector to limit scope to elements with `" + a.field + "` defined");
  }, "printMappingErr");
  switch (a.mapped) {
    case s.mapData: {
      for (var p = a.field.split("."), y = c.data, b = 0; b < p.length && y; b++) {
        var w = p[b];
        y = y[w];
      }
      if (y == null) return m2(), false;
      var x;
      if (ne(y)) {
        var C = a.fieldMax - a.fieldMin;
        C === 0 ? x = 0 : x = (y - a.fieldMin) / C;
      } else return qe("Do not use continuous mappers without specifying numeric data (i.e. `" + a.field + ": " + y + "` for `" + r.id() + "` is non-numeric)"), false;
      if (x < 0 ? x = 0 : x > 1 && (x = 1), o.color) {
        var T = a.valueMin[0], E = a.valueMax[0], S = a.valueMin[1], D = a.valueMax[1], B = a.valueMin[2], P = a.valueMax[2], A = a.valueMin[3] == null ? 1 : a.valueMin[3], R = a.valueMax[3] == null ? 1 : a.valueMax[3], M = [Math.round(T + (E - T) * x), Math.round(S + (D - S) * x), Math.round(B + (P - B) * x), Math.round(A + (R - A) * x)];
        i = { bypass: a.bypass, name: a.name, value: M, strValue: "rgb(" + M[0] + ", " + M[1] + ", " + M[2] + ")" };
      } else if (o.number) {
        var I = a.valueMin + (a.valueMax - a.valueMin) * x;
        i = this.parse(a.name, I, a.bypass, d);
      } else return false;
      if (!i) return m2(), false;
      i.mapping = a, a = i;
      break;
    }
    case s.data: {
      for (var O = a.field.split("."), L = c.data, N = 0; N < O.length && L; N++) {
        var q = O[N];
        L = L[q];
      }
      if (L != null && (i = this.parse(a.name, L, a.bypass, d)), !i) return m2(), false;
      i.mapping = a, a = i;
      break;
    }
    case s.fn: {
      var H = a.value, z = a.fnValue != null ? a.fnValue : H(r);
      if (a.prevFnValue = z, z == null) return qe("Custom function mappers may not return null (i.e. `" + a.name + "` for ele `" + r.id() + "` is null)"), false;
      if (i = this.parse(a.name, z, a.bypass, d), !i) return qe("Custom function mappers may not return invalid values for the property type (i.e. `" + a.name + "` for ele `" + r.id() + "` is invalid)"), false;
      i.mapping = _r(a), a = i;
      break;
    }
    case void 0:
      break;
    default:
      return false;
  }
  return l ? (f ? a.bypassed = u.bypassed : a.bypassed = u, n[a.name] = a) : f ? u.bypassed = a : n[a.name] = a, h(), true;
};
lr.cleanElements = function(r, e) {
  for (var t = 0; t < r.length; t++) {
    var a = r[t];
    if (this.clearStyleHints(a), a.dirtyCompoundBoundsCache(), a.dirtyBoundingBoxCache(), !e) a._private.style = {};
    else for (var n = a._private.style, i = Object.keys(n), s = 0; s < i.length; s++) {
      var o = i[s], l = n[o];
      l != null && (l.bypass ? l.bypassed = null : n[o] = null);
    }
  }
};
lr.update = function() {
  var r = this._private.cy, e = r.mutableElements();
  e.updateStyle();
};
lr.updateTransitions = function(r, e) {
  var t = this, a = r._private, n = r.pstyle("transition-property").value, i = r.pstyle("transition-duration").pfValue, s = r.pstyle("transition-delay").pfValue;
  if (n.length > 0 && i > 0) {
    for (var o = {}, l = false, u = 0; u < n.length; u++) {
      var f = n[u], c = r.pstyle(f), d = e[f];
      if (d) {
        var g = d.prev, h = g, m2 = d.next != null ? d.next : c, p = false, y = void 0, b = 1e-6;
        h && (ne(h.pfValue) && ne(m2.pfValue) ? (p = m2.pfValue - h.pfValue, y = h.pfValue + b * p) : ne(h.value) && ne(m2.value) ? (p = m2.value - h.value, y = h.value + b * p) : Ge(h.value) && Ge(m2.value) && (p = h.value[0] !== m2.value[0] || h.value[1] !== m2.value[1] || h.value[2] !== m2.value[2], y = h.strValue), p && (o[f] = m2.strValue, this.applyBypass(r, f, y), l = true));
      }
    }
    if (!l) return;
    a.transitioning = true, new aa(function(w) {
      s > 0 ? r.delayAnimation(s).play().promise().then(w) : w();
    }).then(function() {
      return r.animation({ style: o, duration: i, easing: r.pstyle("transition-timing-function").value, queue: false }).play().promise();
    }).then(function() {
      t.removeBypasses(r, n), r.emitAndNotify("style"), a.transitioning = false;
    });
  } else a.transitioning && (this.removeBypasses(r, n), r.emitAndNotify("style"), a.transitioning = false);
};
lr.checkTrigger = function(r, e, t, a, n, i) {
  var s = this.properties[e], o = n(s);
  r.removed() || o != null && o(t, a, r) && i(s);
};
lr.checkZOrderTrigger = function(r, e, t, a) {
  var n = this;
  this.checkTrigger(r, e, t, a, function(i) {
    return i.triggersZOrder;
  }, function() {
    n._private.cy.notify("zorder", r);
  });
};
lr.checkBoundsTrigger = function(r, e, t, a) {
  this.checkTrigger(r, e, t, a, function(n) {
    return n.triggersBounds;
  }, function(n) {
    r.dirtyCompoundBoundsCache(), r.dirtyBoundingBoxCache();
  });
};
lr.checkConnectedEdgesBoundsTrigger = function(r, e, t, a) {
  this.checkTrigger(r, e, t, a, function(n) {
    return n.triggersBoundsOfConnectedEdges;
  }, function(n) {
    r.connectedEdges().forEach(function(i) {
      i.dirtyBoundingBoxCache();
    });
  });
};
lr.checkParallelEdgesBoundsTrigger = function(r, e, t, a) {
  this.checkTrigger(r, e, t, a, function(n) {
    return n.triggersBoundsOfParallelEdges;
  }, function(n) {
    r.parallelEdges().forEach(function(i) {
      i.dirtyBoundingBoxCache();
    });
  });
};
lr.checkTriggers = function(r, e, t, a) {
  r.dirtyStyleCache(), this.checkZOrderTrigger(r, e, t, a), this.checkBoundsTrigger(r, e, t, a), this.checkConnectedEdgesBoundsTrigger(r, e, t, a), this.checkParallelEdgesBoundsTrigger(r, e, t, a);
};
var Ga = {};
Ga.applyBypass = function(r, e, t, a) {
  var n = this, i = [], s = true;
  if (e === "*" || e === "**") {
    if (t !== void 0) for (var o = 0; o < n.properties.length; o++) {
      var l = n.properties[o], u = l.name, f = this.parse(u, t, true);
      f && i.push(f);
    }
  } else if (pe(e)) {
    var c = this.parse(e, t, true);
    c && i.push(c);
  } else if (Ie(e)) {
    var d = e;
    a = t;
    for (var g = Object.keys(d), h = 0; h < g.length; h++) {
      var m2 = g[h], p = d[m2];
      if (p === void 0 && (p = d[Ln(m2)]), p !== void 0) {
        var y = this.parse(m2, p, true);
        y && i.push(y);
      }
    }
  } else return false;
  if (i.length === 0) return false;
  for (var b = false, w = 0; w < r.length; w++) {
    for (var x = r[w], C = {}, T = void 0, E = 0; E < i.length; E++) {
      var S = i[E];
      if (a) {
        var D = x.pstyle(S.name);
        T = C[S.name] = { prev: D };
      }
      b = this.applyParsedProperty(x, _r(S)) || b, a && (T.next = x.pstyle(S.name));
    }
    b && this.updateStyleHints(x), a && this.updateTransitions(x, C, s);
  }
  return b;
};
Ga.overrideBypass = function(r, e, t) {
  e = Qs(e);
  for (var a = 0; a < r.length; a++) {
    var n = r[a], i = n._private.style[e], s = this.properties[e].type, o = s.color, l = s.mutiple, u = i ? i.pfValue != null ? i.pfValue : i.value : null;
    !i || !i.bypass ? this.applyBypass(n, e, t) : (i.value = t, i.pfValue != null && (i.pfValue = t), o ? i.strValue = "rgb(" + t.join(",") + ")" : l ? i.strValue = t.join(" ") : i.strValue = "" + t, this.updateStyleHints(n)), this.checkTriggers(n, e, u, t);
  }
};
Ga.removeAllBypasses = function(r, e) {
  return this.removeBypasses(r, this.propertyNames, e);
};
Ga.removeBypasses = function(r, e, t) {
  for (var a = true, n = 0; n < r.length; n++) {
    for (var i = r[n], s = {}, o = 0; o < e.length; o++) {
      var l = e[o], u = this.properties[l], f = i.pstyle(u.name);
      if (!(!f || !f.bypass)) {
        var c = "", d = this.parse(l, c, true), g = s[u.name] = { prev: f };
        this.applyParsedProperty(i, d), g.next = i.pstyle(u.name);
      }
    }
    this.updateStyleHints(i), t && this.updateTransitions(i, s, a);
  }
};
var co = {};
co.getEmSizeInPixels = function() {
  var r = this.containerCss("font-size");
  return r != null ? parseFloat(r) : 1;
};
co.containerCss = function(r) {
  var e = this._private.cy, t = e.container(), a = e.window();
  if (a && t && a.getComputedStyle) return a.getComputedStyle(t).getPropertyValue(r);
};
var Gr = {};
Gr.getRenderedStyle = function(r, e) {
  return e ? this.getStylePropertyValue(r, e, true) : this.getRawStyle(r, true);
};
Gr.getRawStyle = function(r, e) {
  var t = this;
  if (r = r[0], r) {
    for (var a = {}, n = 0; n < t.properties.length; n++) {
      var i = t.properties[n], s = t.getStylePropertyValue(r, i.name, e);
      s != null && (a[i.name] = s, a[Ln(i.name)] = s);
    }
    return a;
  }
};
Gr.getIndexedStyle = function(r, e, t, a) {
  var n = r.pstyle(e)[t][a];
  return n ?? r.cy().style().getDefaultProperty(e)[t][0];
};
Gr.getStylePropertyValue = function(r, e, t) {
  var a = this;
  if (r = r[0], r) {
    var n = a.properties[e];
    n.alias && (n = n.pointsTo);
    var i = n.type, s = r.pstyle(n.name);
    if (s) {
      var o = s.value, l = s.units, u = s.strValue;
      if (t && i.number && o != null && ne(o)) {
        var f = r.cy().zoom(), c = m(function(p) {
          return p * f;
        }, "getRenderedValue"), d = m(function(p, y) {
          return c(p) + y;
        }, "getValueStringWithUnits"), g = Ge(o), h = g ? l.every(function(m2) {
          return m2 != null;
        }) : l != null;
        return h ? g ? o.map(function(m2, p) {
          return d(m2, l[p]);
        }).join(" ") : d(o, l) : g ? o.map(function(m2) {
          return pe(m2) ? m2 : "" + c(m2);
        }).join(" ") : "" + c(o);
      } else if (u != null) return u;
    }
    return null;
  }
};
Gr.getAnimationStartStyle = function(r, e) {
  for (var t = {}, a = 0; a < e.length; a++) {
    var n = e[a], i = n.name, s = r.pstyle(i);
    s !== void 0 && (Ie(s) ? s = this.parse(i, s.strValue) : s = this.parse(i, s)), s && (t[i] = s);
  }
  return t;
};
Gr.getPropsList = function(r) {
  var e = this, t = [], a = r, n = e.properties;
  if (a) for (var i = Object.keys(a), s = 0; s < i.length; s++) {
    var o = i[s], l = a[o], u = n[o] || n[Qs(o)], f = this.parse(u.name, l);
    f && t.push(f);
  }
  return t;
};
Gr.getNonDefaultPropertiesHash = function(r, e, t) {
  var a = t.slice(), n, i, s, o, l, u;
  for (l = 0; l < e.length; l++) if (n = e[l], i = r.pstyle(n, false), i != null) if (i.pfValue != null) a[0] = Ta(o, a[0]), a[1] = Sa(o, a[1]);
  else for (s = i.strValue, u = 0; u < s.length; u++) o = s.charCodeAt(u), a[0] = Ta(o, a[0]), a[1] = Sa(o, a[1]);
  return a;
};
Gr.getPropertiesHash = Gr.getNonDefaultPropertiesHash;
var Un = {};
Un.appendFromJson = function(r) {
  for (var e = this, t = 0; t < r.length; t++) {
    var a = r[t], n = a.selector, i = a.style || a.css, s = Object.keys(i);
    e.selector(n);
    for (var o = 0; o < s.length; o++) {
      var l = s[o], u = i[l];
      e.css(l, u);
    }
  }
  return e;
};
Un.fromJson = function(r) {
  var e = this;
  return e.resetToDefault(), e.appendFromJson(r), e;
};
Un.json = function() {
  for (var r = [], e = this.defaultLength; e < this.length; e++) {
    for (var t = this[e], a = t.selector, n = t.properties, i = {}, s = 0; s < n.length; s++) {
      var o = n[s];
      i[o.name] = o.strValue;
    }
    r.push({ selector: a ? a.toString() : "core", style: i });
  }
  return r;
};
var ho = {};
ho.appendFromString = function(r) {
  var e = this, t = this, a = "" + r, n, i, s;
  a = a.replace(/[/][*](\s|.)+?[*][/]/g, "");
  function o() {
    a.length > n.length ? a = a.substr(n.length) : a = "";
  }
  m(o, "removeSelAndBlockFromRemaining");
  function l() {
    i.length > s.length ? i = i.substr(s.length) : i = "";
  }
  for (m(l, "removePropAndValFromRem"); ; ) {
    var u = a.match(/^\s*$/);
    if (u) break;
    var f = a.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);
    if (!f) {
      qe("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " + a);
      break;
    }
    n = f[0];
    var c = f[1];
    if (c !== "core") {
      var d = new ct(c);
      if (d.invalid) {
        qe("Skipping parsing of block: Invalid selector found in string stylesheet: " + c), o();
        continue;
      }
    }
    var g = f[2], h = false;
    i = g;
    for (var m2 = []; ; ) {
      var p = i.match(/^\s*$/);
      if (p) break;
      var y = i.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);
      if (!y) {
        qe("Skipping parsing of block: Invalid formatting of style property and value definitions found in:" + g), h = true;
        break;
      }
      s = y[0];
      var b = y[1], w = y[2], x = e.properties[b];
      if (!x) {
        qe("Skipping property: Invalid property name in: " + s), l();
        continue;
      }
      var C = t.parse(b, w);
      if (!C) {
        qe("Skipping property: Invalid property definition in: " + s), l();
        continue;
      }
      m2.push({ name: b, val: w }), l();
    }
    if (h) {
      o();
      break;
    }
    t.selector(c);
    for (var T = 0; T < m2.length; T++) {
      var E = m2[T];
      t.css(E.name, E.val);
    }
    o();
  }
  return t;
};
ho.fromString = function(r) {
  var e = this;
  return e.resetToDefault(), e.appendFromString(r), e;
};
var Je = {};
(function() {
  var r = ar, e = wc, t = Ec, a = Cc, n = Tc, i = m(function(_) {
    return "^" + _ + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$";
  }, "data"), s = m(function(_) {
    var W = r + "|\\w+|" + e + "|" + t + "|" + a + "|" + n;
    return "^" + _ + "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" + r + ")\\s*\\,\\s*(" + r + ")\\s*,\\s*(" + W + ")\\s*\\,\\s*(" + W + ")\\)$";
  }, "mapData"), o = [`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`, "^(none)$", "^(.+)$"];
  Je.types = { time: { number: true, min: 0, units: "s|ms", implicitUnits: "ms" }, percent: { number: true, min: 0, max: 100, units: "%", implicitUnits: "%" }, percentages: { number: true, min: 0, max: 100, units: "%", implicitUnits: "%", multiple: true }, zeroOneNumber: { number: true, min: 0, max: 1, unitless: true }, zeroOneNumbers: { number: true, min: 0, max: 1, unitless: true, multiple: true }, nOneOneNumber: { number: true, min: -1, max: 1, unitless: true }, nonNegativeInt: { number: true, min: 0, integer: true, unitless: true }, nonNegativeNumber: { number: true, min: 0, unitless: true }, position: { enums: ["parent", "origin"] }, nodeSize: { number: true, min: 0, enums: ["label"] }, number: { number: true, unitless: true }, numbers: { number: true, unitless: true, multiple: true }, positiveNumber: { number: true, unitless: true, min: 0, strictMin: true }, size: { number: true, min: 0 }, bidirectionalSize: { number: true }, bidirectionalSizeMaybePercent: { number: true, allowPercent: true }, bidirectionalSizes: { number: true, multiple: true }, sizeMaybePercent: { number: true, min: 0, allowPercent: true }, axisDirection: { enums: ["horizontal", "leftward", "rightward", "vertical", "upward", "downward", "auto"] }, axisDirectionExplicit: { enums: ["leftward", "rightward", "upward", "downward"] }, axisDirectionPrimary: { enums: ["horizontal", "vertical"] }, paddingRelativeTo: { enums: ["width", "height", "average", "min", "max"] }, bgWH: { number: true, min: 0, allowPercent: true, enums: ["auto"], multiple: true }, bgPos: { number: true, allowPercent: true, multiple: true }, bgRelativeTo: { enums: ["inner", "include-padding"], multiple: true }, bgRepeat: { enums: ["repeat", "repeat-x", "repeat-y", "no-repeat"], multiple: true }, bgFit: { enums: ["none", "contain", "cover"], multiple: true }, bgCrossOrigin: { enums: ["anonymous", "use-credentials", "null"], multiple: true }, bgClip: { enums: ["none", "node"], multiple: true }, bgContainment: { enums: ["inside", "over"], multiple: true }, boxSelection: { enums: ["contain", "overlap", "none"] }, color: { color: true }, colors: { color: true, multiple: true }, fill: { enums: ["solid", "linear-gradient", "radial-gradient"] }, bool: { enums: ["yes", "no"] }, bools: { enums: ["yes", "no"], multiple: true }, lineStyle: { enums: ["solid", "dotted", "dashed"] }, lineCap: { enums: ["butt", "round", "square"] }, linePosition: { enums: ["center", "inside", "outside"] }, lineJoin: { enums: ["round", "bevel", "miter"] }, borderStyle: { enums: ["solid", "dotted", "dashed", "double"] }, curveStyle: { enums: ["bezier", "unbundled-bezier", "haystack", "segments", "straight", "straight-triangle", "taxi", "round-segments", "round-taxi"] }, radiusType: { enums: ["arc-radius", "influence-radius"], multiple: true }, fontFamily: { regex: '^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$' }, fontStyle: { enums: ["italic", "normal", "oblique"] }, fontWeight: { enums: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "800", "900", 100, 200, 300, 400, 500, 600, 700, 800, 900] }, textDecoration: { enums: ["none", "underline", "overline", "line-through"] }, textTransform: { enums: ["none", "uppercase", "lowercase"] }, textWrap: { enums: ["none", "wrap", "ellipsis"] }, textOverflowWrap: { enums: ["whitespace", "anywhere"] }, textBackgroundShape: { enums: ["rectangle", "roundrectangle", "round-rectangle", "circle"] }, nodeShape: { enums: ["rectangle", "roundrectangle", "round-rectangle", "cutrectangle", "cut-rectangle", "bottomroundrectangle", "bottom-round-rectangle", "barrel", "ellipse", "triangle", "round-triangle", "square", "pentagon", "round-pentagon", "hexagon", "round-hexagon", "concavehexagon", "concave-hexagon", "heptagon", "round-heptagon", "octagon", "round-octagon", "tag", "round-tag", "star", "diamond", "round-diamond", "vee", "rhomboid", "right-rhomboid", "polygon"] }, overlayShape: { enums: ["roundrectangle", "round-rectangle", "ellipse"] }, cornerRadius: { number: true, min: 0, units: "px|em", implicitUnits: "px", enums: ["auto"] }, compoundIncludeLabels: { enums: ["include", "exclude"] }, arrowShape: { enums: ["tee", "triangle", "triangle-tee", "circle-triangle", "triangle-cross", "triangle-backcurve", "vee", "square", "circle", "diamond", "chevron", "none"] }, arrowFill: { enums: ["filled", "hollow"] }, arrowWidth: { number: true, units: "%|px|em", implicitUnits: "px", enums: ["match-line"] }, display: { enums: ["element", "none"] }, visibility: { enums: ["hidden", "visible"] }, zCompoundDepth: { enums: ["bottom", "orphan", "auto", "top"] }, zIndexCompare: { enums: ["auto", "manual"] }, valign: { enums: ["top", "center", "bottom"] }, halign: { enums: ["left", "center", "right"] }, justification: { enums: ["left", "center", "right", "auto"] }, text: { string: true }, data: { mapping: true, regex: i("data") }, layoutData: { mapping: true, regex: i("layoutData") }, scratch: { mapping: true, regex: i("scratch") }, mapData: { mapping: true, regex: s("mapData") }, mapLayoutData: { mapping: true, regex: s("mapLayoutData") }, mapScratch: { mapping: true, regex: s("mapScratch") }, fn: { mapping: true, fn: true }, url: { regexes: o, singleRegexMatchValue: true }, urls: { regexes: o, singleRegexMatchValue: true, multiple: true }, propList: { propList: true }, angle: { number: true, units: "deg|rad", implicitUnits: "rad" }, textRotation: { number: true, units: "deg|rad", implicitUnits: "rad", enums: ["none", "autorotate"] }, polygonPointList: { number: true, multiple: true, evenMultiple: true, min: -1, max: 1, unitless: true }, edgeDistances: { enums: ["intersection", "node-position", "endpoints"] }, edgeEndpoint: { number: true, multiple: true, units: "%|px|em|deg|rad", implicitUnits: "px", enums: ["inside-to-node", "outside-to-node", "outside-to-node-or-label", "outside-to-line", "outside-to-line-or-label"], singleEnum: true, validate: m(function(_, W) {
    switch (_.length) {
      case 2:
        return W[0] !== "deg" && W[0] !== "rad" && W[1] !== "deg" && W[1] !== "rad";
      case 1:
        return pe(_[0]) || W[0] === "deg" || W[0] === "rad";
      default:
        return false;
    }
  }, "validate") }, easing: { regexes: ["^(spring)\\s*\\(\\s*(" + r + ")\\s*,\\s*(" + r + ")\\s*\\)$", "^(cubic-bezier)\\s*\\(\\s*(" + r + ")\\s*,\\s*(" + r + ")\\s*,\\s*(" + r + ")\\s*,\\s*(" + r + ")\\s*\\)$"], enums: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "ease-in-sine", "ease-out-sine", "ease-in-out-sine", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-circ", "ease-out-circ", "ease-in-out-circ"] }, gradientDirection: { enums: ["to-bottom", "to-top", "to-left", "to-right", "to-bottom-right", "to-bottom-left", "to-top-right", "to-top-left", "to-right-bottom", "to-left-bottom", "to-right-top", "to-left-top"] }, boundsExpansion: { number: true, multiple: true, min: 0, validate: m(function(_) {
    var W = _.length;
    return W === 1 || W === 2 || W === 4;
  }, "validate") } };
  var l = { zeroNonZero: m(function(_, W) {
    return (_ == null || W == null) && _ !== W || _ == 0 && W != 0 ? true : _ != 0 && W == 0;
  }, "zeroNonZero"), any: m(function(_, W) {
    return _ != W;
  }, "any"), emptyNonEmpty: m(function(_, W) {
    var Z = lt(_), ae = lt(W);
    return Z && !ae || !Z && ae;
  }, "emptyNonEmpty") }, u = Je.types, f = [{ name: "label", type: u.text, triggersBounds: l.any, triggersZOrder: l.emptyNonEmpty }, { name: "text-rotation", type: u.textRotation, triggersBounds: l.any }, { name: "text-margin-x", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "text-margin-y", type: u.bidirectionalSize, triggersBounds: l.any }], c = [{ name: "source-label", type: u.text, triggersBounds: l.any }, { name: "source-text-rotation", type: u.textRotation, triggersBounds: l.any }, { name: "source-text-margin-x", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "source-text-margin-y", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "source-text-offset", type: u.size, triggersBounds: l.any }], d = [{ name: "target-label", type: u.text, triggersBounds: l.any }, { name: "target-text-rotation", type: u.textRotation, triggersBounds: l.any }, { name: "target-text-margin-x", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "target-text-margin-y", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "target-text-offset", type: u.size, triggersBounds: l.any }], g = [{ name: "font-family", type: u.fontFamily, triggersBounds: l.any }, { name: "font-style", type: u.fontStyle, triggersBounds: l.any }, { name: "font-weight", type: u.fontWeight, triggersBounds: l.any }, { name: "font-size", type: u.size, triggersBounds: l.any }, { name: "text-transform", type: u.textTransform, triggersBounds: l.any }, { name: "text-wrap", type: u.textWrap, triggersBounds: l.any }, { name: "text-overflow-wrap", type: u.textOverflowWrap, triggersBounds: l.any }, { name: "text-max-width", type: u.size, triggersBounds: l.any }, { name: "text-outline-width", type: u.size, triggersBounds: l.any }, { name: "line-height", type: u.positiveNumber, triggersBounds: l.any }], h = [{ name: "text-valign", type: u.valign, triggersBounds: l.any }, { name: "text-halign", type: u.halign, triggersBounds: l.any }, { name: "color", type: u.color }, { name: "text-outline-color", type: u.color }, { name: "text-outline-opacity", type: u.zeroOneNumber }, { name: "text-background-color", type: u.color }, { name: "text-background-opacity", type: u.zeroOneNumber }, { name: "text-background-padding", type: u.size, triggersBounds: l.any }, { name: "text-border-opacity", type: u.zeroOneNumber }, { name: "text-border-color", type: u.color }, { name: "text-border-width", type: u.size, triggersBounds: l.any }, { name: "text-border-style", type: u.borderStyle, triggersBounds: l.any }, { name: "text-background-shape", type: u.textBackgroundShape, triggersBounds: l.any }, { name: "text-justification", type: u.justification }, { name: "box-select-labels", type: u.bool, triggersBounds: l.any }], m2 = [{ name: "events", type: u.bool, triggersZOrder: l.any }, { name: "text-events", type: u.bool, triggersZOrder: l.any }, { name: "box-selection", type: u.boxSelection, triggersZOrder: l.any }], p = [{ name: "display", type: u.display, triggersZOrder: l.any, triggersBounds: l.any, triggersBoundsOfConnectedEdges: l.any, triggersBoundsOfParallelEdges: m(function(_, W, Z) {
    return _ === W ? false : Z.pstyle("curve-style").value === "bezier";
  }, "triggersBoundsOfParallelEdges") }, { name: "visibility", type: u.visibility, triggersZOrder: l.any }, { name: "opacity", type: u.zeroOneNumber, triggersZOrder: l.zeroNonZero }, { name: "text-opacity", type: u.zeroOneNumber }, { name: "min-zoomed-font-size", type: u.size }, { name: "z-compound-depth", type: u.zCompoundDepth, triggersZOrder: l.any }, { name: "z-index-compare", type: u.zIndexCompare, triggersZOrder: l.any }, { name: "z-index", type: u.number, triggersZOrder: l.any }], y = [{ name: "overlay-padding", type: u.size, triggersBounds: l.any }, { name: "overlay-color", type: u.color }, { name: "overlay-opacity", type: u.zeroOneNumber, triggersBounds: l.zeroNonZero }, { name: "overlay-shape", type: u.overlayShape, triggersBounds: l.any }, { name: "overlay-corner-radius", type: u.cornerRadius }], b = [{ name: "underlay-padding", type: u.size, triggersBounds: l.any }, { name: "underlay-color", type: u.color }, { name: "underlay-opacity", type: u.zeroOneNumber, triggersBounds: l.zeroNonZero }, { name: "underlay-shape", type: u.overlayShape, triggersBounds: l.any }, { name: "underlay-corner-radius", type: u.cornerRadius }], w = [{ name: "transition-property", type: u.propList }, { name: "transition-duration", type: u.time }, { name: "transition-delay", type: u.time }, { name: "transition-timing-function", type: u.easing }], x = m(function(_, W) {
    return W.value === "label" ? -_.poolIndex() : W.pfValue;
  }, "nodeSizeHashOverride"), C = [{ name: "height", type: u.nodeSize, triggersBounds: l.any, hashOverride: x }, { name: "width", type: u.nodeSize, triggersBounds: l.any, hashOverride: x }, { name: "shape", type: u.nodeShape, triggersBounds: l.any }, { name: "shape-polygon-points", type: u.polygonPointList, triggersBounds: l.any }, { name: "corner-radius", type: u.cornerRadius }, { name: "background-color", type: u.color }, { name: "background-fill", type: u.fill }, { name: "background-opacity", type: u.zeroOneNumber }, { name: "background-blacken", type: u.nOneOneNumber }, { name: "background-gradient-stop-colors", type: u.colors }, { name: "background-gradient-stop-positions", type: u.percentages }, { name: "background-gradient-direction", type: u.gradientDirection }, { name: "padding", type: u.sizeMaybePercent, triggersBounds: l.any }, { name: "padding-relative-to", type: u.paddingRelativeTo, triggersBounds: l.any }, { name: "bounds-expansion", type: u.boundsExpansion, triggersBounds: l.any }], T = [{ name: "border-color", type: u.color }, { name: "border-opacity", type: u.zeroOneNumber }, { name: "border-width", type: u.size, triggersBounds: l.any }, { name: "border-style", type: u.borderStyle }, { name: "border-cap", type: u.lineCap }, { name: "border-join", type: u.lineJoin }, { name: "border-dash-pattern", type: u.numbers }, { name: "border-dash-offset", type: u.number }, { name: "border-position", type: u.linePosition }], E = [{ name: "outline-color", type: u.color }, { name: "outline-opacity", type: u.zeroOneNumber }, { name: "outline-width", type: u.size, triggersBounds: l.any }, { name: "outline-style", type: u.borderStyle }, { name: "outline-offset", type: u.size, triggersBounds: l.any }], S = [{ name: "background-image", type: u.urls }, { name: "background-image-crossorigin", type: u.bgCrossOrigin }, { name: "background-image-opacity", type: u.zeroOneNumbers }, { name: "background-image-containment", type: u.bgContainment }, { name: "background-image-smoothing", type: u.bools }, { name: "background-position-x", type: u.bgPos }, { name: "background-position-y", type: u.bgPos }, { name: "background-width-relative-to", type: u.bgRelativeTo }, { name: "background-height-relative-to", type: u.bgRelativeTo }, { name: "background-repeat", type: u.bgRepeat }, { name: "background-fit", type: u.bgFit }, { name: "background-clip", type: u.bgClip }, { name: "background-width", type: u.bgWH }, { name: "background-height", type: u.bgWH }, { name: "background-offset-x", type: u.bgPos }, { name: "background-offset-y", type: u.bgPos }], D = [{ name: "position", type: u.position, triggersBounds: l.any }, { name: "compound-sizing-wrt-labels", type: u.compoundIncludeLabels, triggersBounds: l.any }, { name: "min-width", type: u.size, triggersBounds: l.any }, { name: "min-width-bias-left", type: u.sizeMaybePercent, triggersBounds: l.any }, { name: "min-width-bias-right", type: u.sizeMaybePercent, triggersBounds: l.any }, { name: "min-height", type: u.size, triggersBounds: l.any }, { name: "min-height-bias-top", type: u.sizeMaybePercent, triggersBounds: l.any }, { name: "min-height-bias-bottom", type: u.sizeMaybePercent, triggersBounds: l.any }], B = [{ name: "line-style", type: u.lineStyle }, { name: "line-color", type: u.color }, { name: "line-fill", type: u.fill }, { name: "line-cap", type: u.lineCap }, { name: "line-opacity", type: u.zeroOneNumber }, { name: "line-dash-pattern", type: u.numbers }, { name: "line-dash-offset", type: u.number }, { name: "line-outline-width", type: u.size }, { name: "line-outline-color", type: u.color }, { name: "line-gradient-stop-colors", type: u.colors }, { name: "line-gradient-stop-positions", type: u.percentages }, { name: "curve-style", type: u.curveStyle, triggersBounds: l.any, triggersBoundsOfParallelEdges: m(function(_, W) {
    return _ === W ? false : _ === "bezier" || W === "bezier";
  }, "triggersBoundsOfParallelEdges") }, { name: "haystack-radius", type: u.zeroOneNumber, triggersBounds: l.any }, { name: "source-endpoint", type: u.edgeEndpoint, triggersBounds: l.any }, { name: "target-endpoint", type: u.edgeEndpoint, triggersBounds: l.any }, { name: "control-point-step-size", type: u.size, triggersBounds: l.any }, { name: "control-point-distances", type: u.bidirectionalSizes, triggersBounds: l.any }, { name: "control-point-weights", type: u.numbers, triggersBounds: l.any }, { name: "segment-distances", type: u.bidirectionalSizes, triggersBounds: l.any }, { name: "segment-weights", type: u.numbers, triggersBounds: l.any }, { name: "segment-radii", type: u.numbers, triggersBounds: l.any }, { name: "radius-type", type: u.radiusType, triggersBounds: l.any }, { name: "taxi-turn", type: u.bidirectionalSizeMaybePercent, triggersBounds: l.any }, { name: "taxi-turn-min-distance", type: u.size, triggersBounds: l.any }, { name: "taxi-direction", type: u.axisDirection, triggersBounds: l.any }, { name: "taxi-radius", type: u.number, triggersBounds: l.any }, { name: "edge-distances", type: u.edgeDistances, triggersBounds: l.any }, { name: "arrow-scale", type: u.positiveNumber, triggersBounds: l.any }, { name: "loop-direction", type: u.angle, triggersBounds: l.any }, { name: "loop-sweep", type: u.angle, triggersBounds: l.any }, { name: "source-distance-from-node", type: u.size, triggersBounds: l.any }, { name: "target-distance-from-node", type: u.size, triggersBounds: l.any }], P = [{ name: "ghost", type: u.bool, triggersBounds: l.any }, { name: "ghost-offset-x", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "ghost-offset-y", type: u.bidirectionalSize, triggersBounds: l.any }, { name: "ghost-opacity", type: u.zeroOneNumber }], A = [{ name: "selection-box-color", type: u.color }, { name: "selection-box-opacity", type: u.zeroOneNumber }, { name: "selection-box-border-color", type: u.color }, { name: "selection-box-border-width", type: u.size }, { name: "active-bg-color", type: u.color }, { name: "active-bg-opacity", type: u.zeroOneNumber }, { name: "active-bg-size", type: u.size }, { name: "outside-texture-bg-color", type: u.color }, { name: "outside-texture-bg-opacity", type: u.zeroOneNumber }], R = [];
  Je.pieBackgroundN = 16, R.push({ name: "pie-size", type: u.sizeMaybePercent }), R.push({ name: "pie-hole", type: u.sizeMaybePercent }), R.push({ name: "pie-start-angle", type: u.angle });
  for (var M = 1; M <= Je.pieBackgroundN; M++) R.push({ name: "pie-" + M + "-background-color", type: u.color }), R.push({ name: "pie-" + M + "-background-size", type: u.percent }), R.push({ name: "pie-" + M + "-background-opacity", type: u.zeroOneNumber });
  var I = [];
  Je.stripeBackgroundN = 16, I.push({ name: "stripe-size", type: u.sizeMaybePercent }), I.push({ name: "stripe-direction", type: u.axisDirectionPrimary });
  for (var O = 1; O <= Je.stripeBackgroundN; O++) I.push({ name: "stripe-" + O + "-background-color", type: u.color }), I.push({ name: "stripe-" + O + "-background-size", type: u.percent }), I.push({ name: "stripe-" + O + "-background-opacity", type: u.zeroOneNumber });
  var L = [], N = Je.arrowPrefixes = ["source", "mid-source", "target", "mid-target"];
  [{ name: "arrow-shape", type: u.arrowShape, triggersBounds: l.any }, { name: "arrow-color", type: u.color }, { name: "arrow-fill", type: u.arrowFill }, { name: "arrow-width", type: u.arrowWidth }].forEach(function(F) {
    N.forEach(function(_) {
      var W = _ + "-" + F.name, Z = F.type, ae = F.triggersBounds;
      L.push({ name: W, type: Z, triggersBounds: ae });
    });
  }, {});
  var q = Je.properties = [].concat(m2, w, p, y, b, P, h, g, f, c, d, C, T, E, S, R, I, D, B, L, A), H = Je.propertyGroups = { behavior: m2, transition: w, visibility: p, overlay: y, underlay: b, ghost: P, commonLabel: h, labelDimensions: g, mainLabel: f, sourceLabel: c, targetLabel: d, nodeBody: C, nodeBorder: T, nodeOutline: E, backgroundImage: S, pie: R, stripe: I, compound: D, edgeLine: B, edgeArrow: L, core: A }, z = Je.propertyGroupNames = {}, V = Je.propertyGroupKeys = Object.keys(H);
  V.forEach(function(F) {
    z[F] = H[F].map(function(_) {
      return _.name;
    }), H[F].forEach(function(_) {
      return _.groupKey = F;
    });
  });
  var K = Je.aliases = [{ name: "content", pointsTo: "label" }, { name: "control-point-distance", pointsTo: "control-point-distances" }, { name: "control-point-weight", pointsTo: "control-point-weights" }, { name: "segment-distance", pointsTo: "segment-distances" }, { name: "segment-weight", pointsTo: "segment-weights" }, { name: "segment-radius", pointsTo: "segment-radii" }, { name: "edge-text-rotation", pointsTo: "text-rotation" }, { name: "padding-left", pointsTo: "padding" }, { name: "padding-right", pointsTo: "padding" }, { name: "padding-top", pointsTo: "padding" }, { name: "padding-bottom", pointsTo: "padding" }];
  Je.propertyNames = q.map(function(F) {
    return F.name;
  });
  for (var J = 0; J < q.length; J++) {
    var X = q[J];
    q[X.name] = X;
  }
  for (var ee = 0; ee < K.length; ee++) {
    var te = K[ee], ie = q[te.pointsTo], j = { name: te.name, alias: true, pointsTo: ie };
    q.push(j), q[te.name] = j;
  }
})();
Je.getDefaultProperty = function(r) {
  return this.getDefaultProperties()[r];
};
Je.getDefaultProperties = function() {
  var r = this._private;
  if (r.defaultProperties != null) return r.defaultProperties;
  for (var e = we({ "selection-box-color": "#ddd", "selection-box-opacity": 0.65, "selection-box-border-color": "#aaa", "selection-box-border-width": 1, "active-bg-color": "black", "active-bg-opacity": 0.15, "active-bg-size": 30, "outside-texture-bg-color": "#000", "outside-texture-bg-opacity": 0.125, events: "yes", "text-events": "no", "text-valign": "top", "text-halign": "center", "text-justification": "auto", "line-height": 1, color: "#000", "box-selection": "contain", "text-outline-color": "#000", "text-outline-width": 0, "text-outline-opacity": 1, "text-opacity": 1, "text-decoration": "none", "text-transform": "none", "text-wrap": "none", "text-overflow-wrap": "whitespace", "text-max-width": 9999, "text-background-color": "#000", "text-background-opacity": 0, "text-background-shape": "rectangle", "text-background-padding": 0, "text-border-opacity": 0, "text-border-width": 0, "text-border-style": "solid", "text-border-color": "#000", "font-family": "Helvetica Neue, Helvetica, sans-serif", "font-style": "normal", "font-weight": "normal", "font-size": 16, "min-zoomed-font-size": 0, "text-rotation": "none", "source-text-rotation": "none", "target-text-rotation": "none", visibility: "visible", display: "element", opacity: 1, "z-compound-depth": "auto", "z-index-compare": "auto", "z-index": 0, label: "", "text-margin-x": 0, "text-margin-y": 0, "source-label": "", "source-text-offset": 0, "source-text-margin-x": 0, "source-text-margin-y": 0, "target-label": "", "target-text-offset": 0, "target-text-margin-x": 0, "target-text-margin-y": 0, "overlay-opacity": 0, "overlay-color": "#000", "overlay-padding": 10, "overlay-shape": "round-rectangle", "overlay-corner-radius": "auto", "underlay-opacity": 0, "underlay-color": "#000", "underlay-padding": 10, "underlay-shape": "round-rectangle", "underlay-corner-radius": "auto", "transition-property": "none", "transition-duration": 0, "transition-delay": 0, "transition-timing-function": "linear", "box-select-labels": "no", "background-blacken": 0, "background-color": "#999", "background-fill": "solid", "background-opacity": 1, "background-image": "none", "background-image-crossorigin": "anonymous", "background-image-opacity": 1, "background-image-containment": "inside", "background-image-smoothing": "yes", "background-position-x": "50%", "background-position-y": "50%", "background-offset-x": 0, "background-offset-y": 0, "background-width-relative-to": "include-padding", "background-height-relative-to": "include-padding", "background-repeat": "no-repeat", "background-fit": "none", "background-clip": "node", "background-width": "auto", "background-height": "auto", "border-color": "#000", "border-opacity": 1, "border-width": 0, "border-style": "solid", "border-dash-pattern": [4, 2], "border-dash-offset": 0, "border-cap": "butt", "border-join": "miter", "border-position": "center", "outline-color": "#999", "outline-opacity": 1, "outline-width": 0, "outline-offset": 0, "outline-style": "solid", height: 30, width: 30, shape: "ellipse", "shape-polygon-points": "-1, -1,   1, -1,   1, 1,   -1, 1", "corner-radius": "auto", "bounds-expansion": 0, "background-gradient-direction": "to-bottom", "background-gradient-stop-colors": "#999", "background-gradient-stop-positions": "0%", ghost: "no", "ghost-offset-y": 0, "ghost-offset-x": 0, "ghost-opacity": 0, padding: 0, "padding-relative-to": "width", position: "origin", "compound-sizing-wrt-labels": "include", "min-width": 0, "min-width-bias-left": 0, "min-width-bias-right": 0, "min-height": 0, "min-height-bias-top": 0, "min-height-bias-bottom": 0 }, { "pie-size": "100%", "pie-hole": 0, "pie-start-angle": "0deg" }, [{ name: "pie-{{i}}-background-color", value: "black" }, { name: "pie-{{i}}-background-size", value: "0%" }, { name: "pie-{{i}}-background-opacity", value: 1 }].reduce(function(l, u) {
    for (var f = 1; f <= Je.pieBackgroundN; f++) {
      var c = u.name.replace("{{i}}", f), d = u.value;
      l[c] = d;
    }
    return l;
  }, {}), { "stripe-size": "100%", "stripe-direction": "horizontal" }, [{ name: "stripe-{{i}}-background-color", value: "black" }, { name: "stripe-{{i}}-background-size", value: "0%" }, { name: "stripe-{{i}}-background-opacity", value: 1 }].reduce(function(l, u) {
    for (var f = 1; f <= Je.stripeBackgroundN; f++) {
      var c = u.name.replace("{{i}}", f), d = u.value;
      l[c] = d;
    }
    return l;
  }, {}), { "line-style": "solid", "line-color": "#999", "line-fill": "solid", "line-cap": "butt", "line-opacity": 1, "line-outline-width": 0, "line-outline-color": "#000", "line-gradient-stop-colors": "#999", "line-gradient-stop-positions": "0%", "control-point-step-size": 40, "control-point-weights": 0.5, "segment-weights": 0.5, "segment-distances": 20, "segment-radii": 15, "radius-type": "arc-radius", "taxi-turn": "50%", "taxi-radius": 15, "taxi-turn-min-distance": 10, "taxi-direction": "auto", "edge-distances": "intersection", "curve-style": "haystack", "haystack-radius": 0, "arrow-scale": 1, "loop-direction": "-45deg", "loop-sweep": "-90deg", "source-distance-from-node": 0, "target-distance-from-node": 0, "source-endpoint": "outside-to-node", "target-endpoint": "outside-to-node", "line-dash-pattern": [6, 3], "line-dash-offset": 0 }, [{ name: "arrow-shape", value: "none" }, { name: "arrow-color", value: "#999" }, { name: "arrow-fill", value: "filled" }, { name: "arrow-width", value: 1 }].reduce(function(l, u) {
    return Je.arrowPrefixes.forEach(function(f) {
      var c = f + "-" + u.name, d = u.value;
      l[c] = d;
    }), l;
  }, {})), t = {}, a = 0; a < this.properties.length; a++) {
    var n = this.properties[a];
    if (!n.pointsTo) {
      var i = n.name, s = e[i], o = this.parse(i, s);
      t[i] = o;
    }
  }
  return r.defaultProperties = t, r.defaultProperties;
};
Je.addDefaultStylesheet = function() {
  this.selector(":parent").css({ shape: "rectangle", padding: 10, "background-color": "#eee", "border-color": "#ccc", "border-width": 1 }).selector("edge").css({ width: 3 }).selector(":loop").css({ "curve-style": "bezier" }).selector("edge:compound").css({ "curve-style": "bezier", "source-endpoint": "outside-to-line", "target-endpoint": "outside-to-line" }).selector(":selected").css({ "background-color": "#0169D9", "line-color": "#0169D9", "source-arrow-color": "#0169D9", "target-arrow-color": "#0169D9", "mid-source-arrow-color": "#0169D9", "mid-target-arrow-color": "#0169D9" }).selector(":parent:selected").css({ "background-color": "#CCE1F9", "border-color": "#aec8e5" }).selector(":active").css({ "overlay-color": "black", "overlay-padding": 10, "overlay-opacity": 0.25 }), this.defaultLength = this.length;
};
var Kn = {};
Kn.parse = function(r, e, t, a) {
  var n = this;
  if (Ke(e)) return n.parseImplWarn(r, e, t, a);
  var i = a === "mapping" || a === true || a === false || a == null ? "dontcare" : a, s = t ? "t" : "f", o = "" + e, l = dv(r, o, s, i), u = n.propCache = n.propCache || [], f;
  return (f = u[l]) || (f = u[l] = n.parseImplWarn(r, e, t, a)), (t || a === "mapping") && (f = _r(f), f && (f.value = _r(f.value))), f;
};
Kn.parseImplWarn = function(r, e, t, a) {
  var n = this.parseImpl(r, e, t, a);
  return !n && e != null && qe("The style property `".concat(r, ": ").concat(e, "` is invalid")), n && (n.name === "width" || n.name === "height") && e === "label" && qe("The style value of `label` is deprecated for `" + n.name + "`"), n;
};
Kn.parseImpl = function(r, e, t, a) {
  var n = this;
  r = Qs(r);
  var i = n.properties[r], s = e, o = n.types;
  if (!i || e === void 0) return null;
  i.alias && (i = i.pointsTo, r = i.name);
  var l = pe(e);
  l && (e = e.trim());
  var u = i.type;
  if (!u) return null;
  if (t && (e === "" || e === null)) return { name: r, value: e, bypass: true, deleteBypass: true };
  if (Ke(e)) return { name: r, value: e, strValue: "fn", mapped: o.fn, bypass: t };
  var f, c;
  if (!(!l || a || e.length < 7 || e[1] !== "a")) {
    if (e.length >= 7 && e[0] === "d" && (f = new RegExp(o.data.regex).exec(e))) {
      if (t) return false;
      var d = o.data;
      return { name: r, value: f, strValue: "" + e, mapped: d, field: f[1], bypass: t };
    } else if (e.length >= 10 && e[0] === "m" && (c = new RegExp(o.mapData.regex).exec(e))) {
      if (t || u.multiple) return false;
      var g = o.mapData;
      if (!(u.color || u.number)) return false;
      var h = this.parse(r, c[4]);
      if (!h || h.mapped) return false;
      var m2 = this.parse(r, c[5]);
      if (!m2 || m2.mapped) return false;
      if (h.pfValue === m2.pfValue || h.strValue === m2.strValue) return qe("`" + r + ": " + e + "` is not a valid mapper because the output range is zero; converting to `" + r + ": " + h.strValue + "`"), this.parse(r, h.strValue);
      if (u.color) {
        var p = h.value, y = m2.value, b = p[0] === y[0] && p[1] === y[1] && p[2] === y[2] && (p[3] === y[3] || (p[3] == null || p[3] === 1) && (y[3] == null || y[3] === 1));
        if (b) return false;
      }
      return { name: r, value: c, strValue: "" + e, mapped: g, field: c[1], fieldMin: parseFloat(c[2]), fieldMax: parseFloat(c[3]), valueMin: h.value, valueMax: m2.value, bypass: t };
    }
  }
  if (u.multiple && a !== "multiple") {
    var w;
    if (l ? w = e.split(/\s+/) : Ge(e) ? w = e : w = [e], u.evenMultiple && w.length % 2 !== 0) return null;
    for (var x = [], C = [], T = [], E = "", S = false, D = 0; D < w.length; D++) {
      var B = n.parse(r, w[D], t, "multiple");
      S = S || pe(B.value), x.push(B.value), T.push(B.pfValue != null ? B.pfValue : B.value), C.push(B.units), E += (D > 0 ? " " : "") + B.strValue;
    }
    return u.validate && !u.validate(x, C) ? null : u.singleEnum && S ? x.length === 1 && pe(x[0]) ? { name: r, value: x[0], strValue: x[0], bypass: t } : null : { name: r, value: x, pfValue: T, strValue: E, bypass: t, units: C };
  }
  var P = m(function() {
    for (var j = 0; j < u.enums.length; j++) {
      var F = u.enums[j];
      if (F === e) return { name: r, value: e, strValue: "" + e, bypass: t };
    }
    return null;
  }, "checkEnums");
  if (u.number) {
    var A, R = "px";
    if (u.units && (A = u.units), u.implicitUnits && (R = u.implicitUnits), !u.unitless) if (l) {
      var M = "px|em" + (u.allowPercent ? "|\\%" : "");
      A && (M = A);
      var I = e.match("^(" + ar + ")(" + M + ")?$");
      I && (e = I[1], A = I[2] || R);
    } else (!A || u.implicitUnits) && (A = R);
    if (e = parseFloat(e), isNaN(e) && u.enums === void 0) return null;
    if (isNaN(e) && u.enums !== void 0) return e = s, P();
    if (u.integer && !dc(e) || u.min !== void 0 && (e < u.min || u.strictMin && e === u.min) || u.max !== void 0 && (e > u.max || u.strictMax && e === u.max)) return null;
    var O = { name: r, value: e, strValue: "" + e + (A || ""), units: A, bypass: t };
    return u.unitless || A !== "px" && A !== "em" ? O.pfValue = e : O.pfValue = A === "px" || !A ? e : this.getEmSizeInPixels() * e, (A === "ms" || A === "s") && (O.pfValue = A === "ms" ? e : 1e3 * e), (A === "deg" || A === "rad") && (O.pfValue = A === "rad" ? e : Cd(e)), A === "%" && (O.pfValue = e / 100), O;
  } else if (u.propList) {
    var L = [], N = "" + e;
    if (N !== "none") {
      for (var q = N.split(/\s*,\s*|\s+/), H = 0; H < q.length; H++) {
        var z = q[H].trim();
        n.properties[z] ? L.push(z) : qe("`" + z + "` is not a valid property name");
      }
      if (L.length === 0) return null;
    }
    return { name: r, value: L, strValue: L.length === 0 ? "none" : L.join(" "), bypass: t };
  } else if (u.color) {
    var V = sv(e);
    return V ? { name: r, value: V, pfValue: V, strValue: "rgb(" + V[0] + "," + V[1] + "," + V[2] + ")", bypass: t } : null;
  } else if (u.regex || u.regexes) {
    if (u.enums) {
      var K = P();
      if (K) return K;
    }
    for (var J = u.regexes ? u.regexes : [u.regex], X = 0; X < J.length; X++) {
      var ee = new RegExp(J[X]), te = ee.exec(e);
      if (te) return { name: r, value: u.singleRegexMatchValue ? te[1] : te, strValue: "" + e, bypass: t };
    }
    return null;
  } else return u.string ? { name: r, value: "" + e, strValue: "" + e, bypass: t } : u.enums ? P() : null;
};
var ur = m(function(e) {
  if (!(this instanceof ur)) return new ur(e);
  if (!Zs(e)) {
    Ue("A style must have a core reference");
    return;
  }
  this._private = { cy: e, coreStyle: {} }, this.length = 0, this.resetToDefault();
}, "Style");
var yr = ur.prototype;
yr.instanceString = function() {
  return "style";
};
yr.clear = function() {
  for (var r = this._private, e = r.cy, t = e.elements(), a = 0; a < this.length; a++) this[a] = void 0;
  return this.length = 0, r.contextStyles = {}, r.propDiffs = {}, this.cleanElements(t, true), t.forEach(function(n) {
    var i = n[0]._private;
    i.styleDirty = true, i.appliedInitStyle = false;
  }), this;
};
yr.resetToDefault = function() {
  return this.clear(), this.addDefaultStylesheet(), this;
};
yr.core = function(r) {
  return this._private.coreStyle[r] || this.getDefaultProperty(r);
};
yr.selector = function(r) {
  var e = r === "core" ? null : new ct(r), t = this.length++;
  return this[t] = { selector: e, properties: [], mappedProperties: [], index: t }, this;
};
yr.css = function() {
  var r = this, e = arguments;
  if (e.length === 1) for (var t = e[0], a = 0; a < r.properties.length; a++) {
    var n = r.properties[a], i = t[n.name];
    i === void 0 && (i = t[Ln(n.name)]), i !== void 0 && this.cssRule(n.name, i);
  }
  else e.length === 2 && this.cssRule(e[0], e[1]);
  return this;
};
yr.style = yr.css;
yr.cssRule = function(r, e) {
  var t = this.parse(r, e);
  if (t) {
    var a = this.length - 1;
    this[a].properties.push(t), this[a].properties[t.name] = t, t.name.match(/pie-(\d+)-background-size/) && t.value && (this._private.hasPie = true), t.name.match(/stripe-(\d+)-background-size/) && t.value && (this._private.hasStripe = true), t.mapped && this[a].mappedProperties.push(t);
    var n = !this[a].selector;
    n && (this._private.coreStyle[t.name] = t);
  }
  return this;
};
yr.append = function(r) {
  return av(r) ? r.appendToStyle(this) : Ge(r) ? this.appendFromJson(r) : pe(r) && this.appendFromString(r), this;
};
ur.fromJson = function(r, e) {
  var t = new ur(r);
  return t.fromJson(e), t;
};
ur.fromString = function(r, e) {
  return new ur(r).fromString(e);
};
[lr, Ga, co, Gr, Un, ho, Je, Kn].forEach(function(r) {
  we(yr, r);
});
ur.types = yr.types;
ur.properties = yr.properties;
ur.propertyGroups = yr.propertyGroups;
ur.propertyGroupNames = yr.propertyGroupNames;
ur.propertyGroupKeys = yr.propertyGroupKeys;
var Dp = { style: m(function(e) {
  if (e) {
    var t = this.setStyle(e);
    t.update();
  }
  return this._private.style;
}, "style"), setStyle: m(function(e) {
  var t = this._private;
  return av(e) ? t.style = e.generateStyle(this) : Ge(e) ? t.style = ur.fromJson(this, e) : pe(e) ? t.style = ur.fromString(this, e) : t.style = ur(this), t.style;
}, "setStyle"), updateStyle: m(function() {
  this.mutableElements().updateStyle();
}, "updateStyle") };
var Bp = "single";
var Mt = { autolock: m(function(e) {
  if (e !== void 0) this._private.autolock = !!e;
  else return this._private.autolock;
  return this;
}, "autolock"), autoungrabify: m(function(e) {
  if (e !== void 0) this._private.autoungrabify = !!e;
  else return this._private.autoungrabify;
  return this;
}, "autoungrabify"), autounselectify: m(function(e) {
  if (e !== void 0) this._private.autounselectify = !!e;
  else return this._private.autounselectify;
  return this;
}, "autounselectify"), selectionType: m(function(e) {
  var t = this._private;
  if (t.selectionType == null && (t.selectionType = Bp), e !== void 0) (e === "additive" || e === "single") && (t.selectionType = e);
  else return t.selectionType;
  return this;
}, "selectionType"), panningEnabled: m(function(e) {
  if (e !== void 0) this._private.panningEnabled = !!e;
  else return this._private.panningEnabled;
  return this;
}, "panningEnabled"), userPanningEnabled: m(function(e) {
  if (e !== void 0) this._private.userPanningEnabled = !!e;
  else return this._private.userPanningEnabled;
  return this;
}, "userPanningEnabled"), zoomingEnabled: m(function(e) {
  if (e !== void 0) this._private.zoomingEnabled = !!e;
  else return this._private.zoomingEnabled;
  return this;
}, "zoomingEnabled"), userZoomingEnabled: m(function(e) {
  if (e !== void 0) this._private.userZoomingEnabled = !!e;
  else return this._private.userZoomingEnabled;
  return this;
}, "userZoomingEnabled"), boxSelectionEnabled: m(function(e) {
  if (e !== void 0) this._private.boxSelectionEnabled = !!e;
  else return this._private.boxSelectionEnabled;
  return this;
}, "boxSelectionEnabled"), pan: m(function() {
  var e = arguments, t = this._private.pan, a, n, i, s, o;
  switch (e.length) {
    case 0:
      return t;
    case 1:
      if (pe(e[0])) return a = e[0], t[a];
      if (Ie(e[0])) {
        if (!this._private.panningEnabled) return this;
        i = e[0], s = i.x, o = i.y, ne(s) && (t.x = s), ne(o) && (t.y = o), this.emit("pan viewport");
      }
      break;
    case 2:
      if (!this._private.panningEnabled) return this;
      a = e[0], n = e[1], (a === "x" || a === "y") && ne(n) && (t[a] = n), this.emit("pan viewport");
      break;
  }
  return this.notify("viewport"), this;
}, "pan"), panBy: m(function(e, t) {
  var a = arguments, n = this._private.pan, i, s, o, l, u;
  if (!this._private.panningEnabled) return this;
  switch (a.length) {
    case 1:
      Ie(e) && (o = a[0], l = o.x, u = o.y, ne(l) && (n.x += l), ne(u) && (n.y += u), this.emit("pan viewport"));
      break;
    case 2:
      i = e, s = t, (i === "x" || i === "y") && ne(s) && (n[i] += s), this.emit("pan viewport");
      break;
  }
  return this.notify("viewport"), this;
}, "panBy"), gc: m(function() {
  this.notify("gc");
}, "gc"), fit: m(function(e, t) {
  var a = this.getFitViewport(e, t);
  if (a) {
    var n = this._private;
    n.zoom = a.zoom, n.pan = a.pan, this.emit("pan zoom viewport"), this.notify("viewport");
  }
  return this;
}, "fit"), getFitViewport: m(function(e, t) {
  if (ne(e) && t === void 0 && (t = e, e = void 0), !(!this._private.panningEnabled || !this._private.zoomingEnabled)) {
    var a;
    if (pe(e)) {
      var n = e;
      e = this.$(n);
    } else if (pc(e)) {
      var i = e;
      a = { x1: i.x1, y1: i.y1, x2: i.x2, y2: i.y2 }, a.w = a.x2 - a.x1, a.h = a.y2 - a.y1;
    } else Br(e) || (e = this.mutableElements());
    if (!(Br(e) && e.empty())) {
      a = a || e.boundingBox();
      var s = this.width(), o = this.height(), l;
      if (t = ne(t) ? t : 0, !isNaN(s) && !isNaN(o) && s > 0 && o > 0 && !isNaN(a.w) && !isNaN(a.h) && a.w > 0 && a.h > 0) {
        l = Math.min((s - 2 * t) / a.w, (o - 2 * t) / a.h), l = l > this._private.maxZoom ? this._private.maxZoom : l, l = l < this._private.minZoom ? this._private.minZoom : l;
        var u = { x: (s - l * (a.x1 + a.x2)) / 2, y: (o - l * (a.y1 + a.y2)) / 2 };
        return { zoom: l, pan: u };
      }
    }
  }
}, "getFitViewport"), zoomRange: m(function(e, t) {
  var a = this._private;
  if (t == null) {
    var n = e;
    e = n.min, t = n.max;
  }
  return ne(e) && ne(t) && e <= t ? (a.minZoom = e, a.maxZoom = t) : ne(e) && t === void 0 && e <= a.maxZoom ? a.minZoom = e : ne(t) && e === void 0 && t >= a.minZoom && (a.maxZoom = t), this;
}, "zoomRange"), minZoom: m(function(e) {
  return e === void 0 ? this._private.minZoom : this.zoomRange({ min: e });
}, "minZoom"), maxZoom: m(function(e) {
  return e === void 0 ? this._private.maxZoom : this.zoomRange({ max: e });
}, "maxZoom"), getZoomedViewport: m(function(e) {
  var t = this._private, a = t.pan, n = t.zoom, i, s, o = false;
  if (t.zoomingEnabled || (o = true), ne(e) ? s = e : Ie(e) && (s = e.level, e.position != null ? i = Nn(e.position, n, a) : e.renderedPosition != null && (i = e.renderedPosition), i != null && !t.panningEnabled && (o = true)), s = s > t.maxZoom ? t.maxZoom : s, s = s < t.minZoom ? t.minZoom : s, o || !ne(s) || s === n || i != null && (!ne(i.x) || !ne(i.y))) return null;
  if (i != null) {
    var l = a, u = n, f = s, c = { x: -f / u * (i.x - l.x) + i.x, y: -f / u * (i.y - l.y) + i.y };
    return { zoomed: true, panned: true, zoom: f, pan: c };
  } else return { zoomed: true, panned: false, zoom: s, pan: a };
}, "getZoomedViewport"), zoom: m(function(e) {
  if (e === void 0) return this._private.zoom;
  var t = this.getZoomedViewport(e), a = this._private;
  return t == null || !t.zoomed ? this : (a.zoom = t.zoom, t.panned && (a.pan.x = t.pan.x, a.pan.y = t.pan.y), this.emit("zoom" + (t.panned ? " pan" : "") + " viewport"), this.notify("viewport"), this);
}, "zoom"), viewport: m(function(e) {
  var t = this._private, a = true, n = true, i = [], s = false, o = false;
  if (!e) return this;
  if (ne(e.zoom) || (a = false), Ie(e.pan) || (n = false), !a && !n) return this;
  if (a) {
    var l = e.zoom;
    l < t.minZoom || l > t.maxZoom || !t.zoomingEnabled ? s = true : (t.zoom = l, i.push("zoom"));
  }
  if (n && (!s || !e.cancelOnFailedZoom) && t.panningEnabled) {
    var u = e.pan;
    ne(u.x) && (t.pan.x = u.x, o = false), ne(u.y) && (t.pan.y = u.y, o = false), o || i.push("pan");
  }
  return i.length > 0 && (i.push("viewport"), this.emit(i.join(" ")), this.notify("viewport")), this;
}, "viewport"), center: m(function(e) {
  var t = this.getCenterPan(e);
  return t && (this._private.pan = t, this.emit("pan viewport"), this.notify("viewport")), this;
}, "center"), getCenterPan: m(function(e, t) {
  if (this._private.panningEnabled) {
    if (pe(e)) {
      var a = e;
      e = this.mutableElements().filter(a);
    } else Br(e) || (e = this.mutableElements());
    if (e.length !== 0) {
      var n = e.boundingBox(), i = this.width(), s = this.height();
      t = t === void 0 ? this._private.zoom : t;
      var o = { x: (i - t * (n.x1 + n.x2)) / 2, y: (s - t * (n.y1 + n.y2)) / 2 };
      return o;
    }
  }
}, "getCenterPan"), reset: m(function() {
  return !this._private.panningEnabled || !this._private.zoomingEnabled ? this : (this.viewport({ pan: { x: 0, y: 0 }, zoom: 1 }), this);
}, "reset"), invalidateSize: m(function() {
  this._private.sizeCache = null;
}, "invalidateSize"), size: m(function() {
  var e = this._private, t = e.container, a = this;
  return e.sizeCache = e.sizeCache || (t ? function() {
    var n = a.window().getComputedStyle(t), i = m(function(o) {
      return parseFloat(n.getPropertyValue(o));
    }, "val");
    return { width: t.clientWidth - i("padding-left") - i("padding-right"), height: t.clientHeight - i("padding-top") - i("padding-bottom") };
  }() : { width: 1, height: 1 });
}, "size"), width: m(function() {
  return this.size().width;
}, "width"), height: m(function() {
  return this.size().height;
}, "height"), extent: m(function() {
  var e = this._private.pan, t = this._private.zoom, a = this.renderedExtent(), n = { x1: (a.x1 - e.x) / t, x2: (a.x2 - e.x) / t, y1: (a.y1 - e.y) / t, y2: (a.y2 - e.y) / t };
  return n.w = n.x2 - n.x1, n.h = n.y2 - n.y1, n;
}, "extent"), renderedExtent: m(function() {
  var e = this.width(), t = this.height();
  return { x1: 0, y1: 0, x2: e, y2: t, w: e, h: t };
}, "renderedExtent"), multiClickDebounceTime: m(function(e) {
  if (e) this._private.multiClickDebounceTime = e;
  else return this._private.multiClickDebounceTime;
  return this;
}, "multiClickDebounceTime") };
Mt.centre = Mt.center;
Mt.autolockNodes = Mt.autolock;
Mt.autoungrabifyNodes = Mt.autoungrabify;
var Ra = { data: Ve.data({ field: "data", bindingEvent: "data", allowBinding: true, allowSetting: true, settingEvent: "data", settingTriggersEvent: true, triggerFnName: "trigger", allowGetting: true, updateStyle: true }), removeData: Ve.removeData({ field: "data", event: "data", triggerFnName: "trigger", triggerEvent: true, updateStyle: true }), scratch: Ve.data({ field: "scratch", bindingEvent: "scratch", allowBinding: true, allowSetting: true, settingEvent: "scratch", settingTriggersEvent: true, triggerFnName: "trigger", allowGetting: true, updateStyle: true }), removeScratch: Ve.removeData({ field: "scratch", event: "scratch", triggerFnName: "trigger", triggerEvent: true, updateStyle: true }) };
Ra.attr = Ra.data;
Ra.removeAttr = Ra.removeData;
var Ma = m(function(e) {
  var t = this;
  e = we({}, e);
  var a = e.container;
  a && !wn(a) && wn(a[0]) && (a = a[0]);
  var n = a ? a._cyreg : null;
  n = n || {}, n && n.cy && (n.cy.destroy(), n = {});
  var i = n.readies = n.readies || [];
  a && (a._cyreg = n), n.cy = t;
  var s = tr !== void 0 && a !== void 0 && !e.headless, o = e;
  o.layout = we({ name: s ? "grid" : "null" }, o.layout), o.renderer = we({ name: s ? "canvas" : "null" }, o.renderer);
  var l = m(function(h, m2, p) {
    return m2 !== void 0 ? m2 : p !== void 0 ? p : h;
  }, "defVal"), u = this._private = { container: a, ready: false, options: o, elements: new cr(this), listeners: [], aniEles: new cr(this), data: o.data || {}, scratch: {}, layout: null, renderer: null, destroyed: false, notificationsEnabled: true, minZoom: 1e-50, maxZoom: 1e50, zoomingEnabled: l(true, o.zoomingEnabled), userZoomingEnabled: l(true, o.userZoomingEnabled), panningEnabled: l(true, o.panningEnabled), userPanningEnabled: l(true, o.userPanningEnabled), boxSelectionEnabled: l(true, o.boxSelectionEnabled), autolock: l(false, o.autolock, o.autolockNodes), autoungrabify: l(false, o.autoungrabify, o.autoungrabifyNodes), autounselectify: l(false, o.autounselectify), styleEnabled: o.styleEnabled === void 0 ? s : o.styleEnabled, zoom: ne(o.zoom) ? o.zoom : 1, pan: { x: Ie(o.pan) && ne(o.pan.x) ? o.pan.x : 0, y: Ie(o.pan) && ne(o.pan.y) ? o.pan.y : 0 }, animation: { current: [], queue: [] }, hasCompoundNodes: false, multiClickDebounceTime: l(250, o.multiClickDebounceTime) };
  this.createEmitter(), this.selectionType(o.selectionType), this.zoomRange({ min: o.minZoom, max: o.maxZoom });
  var f = m(function(h, m2) {
    var p = h.some(yc);
    if (p) return aa.all(h).then(m2);
    m2(h);
  }, "loadExtData");
  u.styleEnabled && t.setStyle([]);
  var c = we({}, o, o.renderer);
  t.initRenderer(c);
  var d = m(function(h, m2, p) {
    t.notifications(false);
    var y = t.mutableElements();
    y.length > 0 && y.remove(), h != null && (Ie(h) || Ge(h)) && t.add(h), t.one("layoutready", function(w) {
      t.notifications(true), t.emit(w), t.one("load", m2), t.emitAndNotify("load");
    }).one("layoutstop", function() {
      t.one("done", p), t.emit("done");
    });
    var b = we({}, t._private.options.layout);
    b.eles = t.elements(), t.layout(b).run();
  }, "setElesAndLayout");
  f([o.style, o.elements], function(g) {
    var h = g[0], m2 = g[1];
    u.styleEnabled && t.style().append(h), d(m2, function() {
      t.startAnimationLoop(), u.ready = true, Ke(o.ready) && t.on("ready", o.ready);
      for (var p = 0; p < i.length; p++) {
        var y = i[p];
        t.on("ready", y);
      }
      n && (n.readies = []), t.emit("ready");
    }, o.done);
  });
}, "Core");
var Dn = Ma.prototype;
we(Dn, { instanceString: m(function() {
  return "core";
}, "instanceString"), isReady: m(function() {
  return this._private.ready;
}, "isReady"), destroyed: m(function() {
  return this._private.destroyed;
}, "destroyed"), ready: m(function(e) {
  return this.isReady() ? this.emitter().emit("ready", [], e) : this.on("ready", e), this;
}, "ready"), destroy: m(function() {
  var e = this;
  if (!e.destroyed()) return e.stopAnimationLoop(), e.destroyRenderer(), this.emit("destroy"), e._private.destroyed = true, e;
}, "destroy"), hasElementWithId: m(function(e) {
  return this._private.elements.hasElementWithId(e);
}, "hasElementWithId"), getElementById: m(function(e) {
  return this._private.elements.getElementById(e);
}, "getElementById"), hasCompoundNodes: m(function() {
  return this._private.hasCompoundNodes;
}, "hasCompoundNodes"), headless: m(function() {
  return this._private.renderer.isHeadless();
}, "headless"), styleEnabled: m(function() {
  return this._private.styleEnabled;
}, "styleEnabled"), addToPool: m(function(e) {
  return this._private.elements.merge(e), this;
}, "addToPool"), removeFromPool: m(function(e) {
  return this._private.elements.unmerge(e), this;
}, "removeFromPool"), container: m(function() {
  return this._private.container || null;
}, "container"), window: m(function() {
  var e = this._private.container;
  if (e == null) return tr;
  var t = this._private.container.ownerDocument;
  return t === void 0 || t == null ? tr : t.defaultView || tr;
}, "window"), mount: m(function(e) {
  if (e != null) {
    var t = this, a = t._private, n = a.options;
    return !wn(e) && wn(e[0]) && (e = e[0]), t.stopAnimationLoop(), t.destroyRenderer(), a.container = e, a.styleEnabled = true, t.invalidateSize(), t.initRenderer(we({}, n, n.renderer, { name: n.renderer.name === "null" ? "canvas" : n.renderer.name })), t.startAnimationLoop(), t.style(n.style), t.emit("mount"), t;
  }
}, "mount"), unmount: m(function() {
  var e = this;
  return e.stopAnimationLoop(), e.destroyRenderer(), e.initRenderer({ name: "null" }), e.emit("unmount"), e;
}, "unmount"), options: m(function() {
  return _r(this._private.options);
}, "options"), json: m(function(e) {
  var t = this, a = t._private, n = t.mutableElements(), i = m(function(x) {
    return t.getElementById(x.id());
  }, "getFreshRef");
  if (Ie(e)) {
    if (t.startBatch(), e.elements) {
      var s = {}, o = m(function(x, C) {
        for (var T = [], E = [], S = 0; S < x.length; S++) {
          var D = x[S];
          if (!D.data.id) {
            qe("cy.json() cannot handle elements without an ID attribute");
            continue;
          }
          var B = "" + D.data.id, P = t.getElementById(B);
          s[B] = true, P.length !== 0 ? E.push({ ele: P, json: D }) : (C && (D.group = C), T.push(D));
        }
        t.add(T);
        for (var A = 0; A < E.length; A++) {
          var R = E[A], M = R.ele, I = R.json;
          M.json(I);
        }
      }, "updateEles");
      if (Ge(e.elements)) o(e.elements);
      else for (var l = ["nodes", "edges"], u = 0; u < l.length; u++) {
        var f = l[u], c = e.elements[f];
        Ge(c) && o(c, f);
      }
      var d = t.collection();
      n.filter(function(w) {
        return !s[w.id()];
      }).forEach(function(w) {
        w.isParent() ? d.merge(w) : w.remove();
      }), d.forEach(function(w) {
        return w.children().move({ parent: null });
      }), d.forEach(function(w) {
        return i(w).remove();
      });
    }
    e.style && t.style(e.style), e.zoom != null && e.zoom !== a.zoom && t.zoom(e.zoom), e.pan && (e.pan.x !== a.pan.x || e.pan.y !== a.pan.y) && t.pan(e.pan), e.data && t.data(e.data);
    for (var g = ["minZoom", "maxZoom", "zoomingEnabled", "userZoomingEnabled", "panningEnabled", "userPanningEnabled", "boxSelectionEnabled", "autolock", "autoungrabify", "autounselectify", "multiClickDebounceTime"], h = 0; h < g.length; h++) {
      var m2 = g[h];
      e[m2] != null && t[m2](e[m2]);
    }
    return t.endBatch(), this;
  } else {
    var p = !!e, y = {};
    p ? y.elements = this.elements().map(function(w) {
      return w.json();
    }) : (y.elements = {}, n.forEach(function(w) {
      var x = w.group();
      y.elements[x] || (y.elements[x] = []), y.elements[x].push(w.json());
    })), this._private.styleEnabled && (y.style = t.style().json()), y.data = _r(t.data());
    var b = a.options;
    return y.zoomingEnabled = a.zoomingEnabled, y.userZoomingEnabled = a.userZoomingEnabled, y.zoom = a.zoom, y.minZoom = a.minZoom, y.maxZoom = a.maxZoom, y.panningEnabled = a.panningEnabled, y.userPanningEnabled = a.userPanningEnabled, y.pan = _r(a.pan), y.boxSelectionEnabled = a.boxSelectionEnabled, y.renderer = _r(b.renderer), y.hideEdgesOnViewport = b.hideEdgesOnViewport, y.textureOnViewport = b.textureOnViewport, y.wheelSensitivity = b.wheelSensitivity, y.motionBlur = b.motionBlur, y.multiClickDebounceTime = b.multiClickDebounceTime, y;
  }
}, "json") });
Dn.$id = Dn.getElementById;
[yp, Ep, af, Fs, hn, Tp, Vs, gn, Dp, Mt, Ra].forEach(function(r) {
  we(Dn, r);
});
var Pp = { fit: true, directed: false, direction: "downward", padding: 30, circle: false, grid: false, spacingFactor: 1.75, boundingBox: void 0, avoidOverlap: true, nodeDimensionsIncludeLabels: false, roots: void 0, depthSort: void 0, animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
var Ap = { maximal: false, acyclic: false };
var qt = m(function(e) {
  return e.scratch("breadthfirst");
}, "getInfo");
var Sl = m(function(e, t) {
  return e.scratch("breadthfirst", t);
}, "setInfo");
function nf(r) {
  this.options = we({}, Pp, Ap, r);
}
m(nf, "BreadthFirstLayout");
nf.prototype.run = function() {
  var r = this.options, e = r.cy, t = r.eles, a = t.nodes().filter(function(me) {
    return me.isChildless();
  }), n = t, i = r.directed, s = r.acyclic || r.maximal || r.maximalAdjustments > 0, o = !!r.boundingBox, l = xr(o ? r.boundingBox : structuredClone(e.extent())), u;
  if (Br(r.roots)) u = r.roots;
  else if (Ge(r.roots)) {
    for (var f = [], c = 0; c < r.roots.length; c++) {
      var d = r.roots[c], g = e.getElementById(d);
      f.push(g);
    }
    u = e.collection(f);
  } else if (pe(r.roots)) u = e.$(r.roots);
  else if (i) u = a.roots();
  else {
    var h = t.components();
    u = e.collection();
    for (var m2 = m(function() {
      var se = h[p], he = se.maxDegree(false), ge = se.filter(function(Ce) {
        return Ce.degree(false) === he;
      });
      u = u.add(ge);
    }, "_loop"), p = 0; p < h.length; p++) m2();
  }
  var y = [], b = {}, w = m(function(se, he) {
    y[he] == null && (y[he] = []);
    var ge = y[he].length;
    y[he].push(se), Sl(se, { index: ge, depth: he });
  }, "addToDepth"), x = m(function(se, he) {
    var ge = qt(se), Ce = ge.depth, ye = ge.index;
    y[Ce][ye] = null, se.isChildless() && w(se, he);
  }, "changeDepth");
  n.bfs({ roots: u, directed: r.directed, visit: m(function(se, he, ge, Ce, ye) {
    var ke = se[0], Me = ke.id();
    ke.isChildless() && w(ke, ye), b[Me] = true;
  }, "visit") });
  for (var C = [], T = 0; T < a.length; T++) {
    var E = a[T];
    b[E.id()] || C.push(E);
  }
  var S = m(function(se) {
    for (var he = y[se], ge = 0; ge < he.length; ge++) {
      var Ce = he[ge];
      if (Ce == null) {
        he.splice(ge, 1), ge--;
        continue;
      }
      Sl(Ce, { depth: se, index: ge });
    }
  }, "assignDepthsAt"), D = m(function(se, he) {
    for (var ge = qt(se), Ce = se.incomers().filter(function(Ee) {
      return Ee.isNode() && t.has(Ee);
    }), ye = -1, ke = se.id(), Me = 0; Me < Ce.length; Me++) {
      var Ne = Ce[Me], ze = qt(Ne);
      ye = Math.max(ye, ze.depth);
    }
    if (ge.depth <= ye) {
      if (!r.acyclic && he[ke]) return null;
      var Fe = ye + 1;
      return x(se, Fe), he[ke] = Fe, true;
    }
    return false;
  }, "adjustMaximally");
  if (i && s) {
    var B = [], P = {}, A = m(function(se) {
      return B.push(se);
    }, "enqueue"), R = m(function() {
      return B.shift();
    }, "dequeue");
    for (a.forEach(function(me) {
      return B.push(me);
    }); B.length > 0; ) {
      var M = R(), I = D(M, P);
      if (I) M.outgoers().filter(function(me) {
        return me.isNode() && t.has(me);
      }).forEach(A);
      else if (I === null) {
        qe("Detected double maximal shift for node `" + M.id() + "`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");
        break;
      }
    }
  }
  var O = 0;
  if (r.avoidOverlap) for (var L = 0; L < a.length; L++) {
    var N = a[L], q = N.layoutDimensions(r), H = q.w, z = q.h;
    O = Math.max(O, H, z);
  }
  var V = {}, K = m(function(se) {
    if (V[se.id()]) return V[se.id()];
    for (var he = qt(se).depth, ge = se.neighborhood(), Ce = 0, ye = 0, ke = 0; ke < ge.length; ke++) {
      var Me = ge[ke];
      if (!(Me.isEdge() || Me.isParent() || !a.has(Me))) {
        var Ne = qt(Me);
        if (Ne != null) {
          var ze = Ne.index, Fe = Ne.depth;
          if (!(ze == null || Fe == null)) {
            var Ee = y[Fe].length;
            Fe < he && (Ce += ze / Ee, ye++);
          }
        }
      }
    }
    return ye = Math.max(1, ye), Ce = Ce / ye, ye === 0 && (Ce = 0), V[se.id()] = Ce, Ce;
  }, "getWeightedPercent"), J = m(function(se, he) {
    var ge = K(se), Ce = K(he), ye = ge - Ce;
    return ye === 0 ? iv(se.id(), he.id()) : ye;
  }, "sortFn");
  r.depthSort !== void 0 && (J = r.depthSort);
  for (var X = y.length, ee = 0; ee < X; ee++) y[ee].sort(J), S(ee);
  for (var te = [], ie = 0; ie < C.length; ie++) te.push(C[ie]);
  var j = m(function() {
    for (var se = 0; se < X; se++) S(se);
  }, "assignDepths");
  te.length && (y.unshift(te), X = y.length, j());
  for (var F = 0, _ = 0; _ < X; _++) F = Math.max(y[_].length, F);
  var W = { x: l.x1 + l.w / 2, y: l.y1 + l.h / 2 }, Z = a.reduce(function(me, se) {
    return function(he) {
      return { w: me.w === -1 ? he.w : (me.w + he.w) / 2, h: me.h === -1 ? he.h : (me.h + he.h) / 2 };
    }(se.boundingBox({ includeLabels: r.nodeDimensionsIncludeLabels }));
  }, { w: -1, h: -1 }), ae = Math.max(X === 1 ? 0 : o ? (l.h - r.padding * 2 - Z.h) / (X - 1) : (l.h - r.padding * 2 - Z.h) / (X + 1), O), de = y.reduce(function(me, se) {
    return Math.max(me, se.length);
  }, 0), Re = m(function(se) {
    var he = qt(se), ge = he.depth, Ce = he.index;
    if (r.circle) {
      var ye = Math.min(l.w / 2 / X, l.h / 2 / X);
      ye = Math.max(ye, O);
      var ke = ye * ge + ye - (X > 0 && y[0].length <= 3 ? ye / 2 : 0), Me = 2 * Math.PI / y[ge].length * Ce;
      return ge === 0 && y[0].length === 1 && (ke = 1), { x: W.x + ke * Math.cos(Me), y: W.y + ke * Math.sin(Me) };
    } else {
      var Ne = y[ge].length, ze = Math.max(Ne === 1 ? 0 : o ? (l.w - r.padding * 2 - Z.w) / ((r.grid ? de : Ne) - 1) : (l.w - r.padding * 2 - Z.w) / ((r.grid ? de : Ne) + 1), O), Fe = { x: W.x + (Ce + 1 - (Ne + 1) / 2) * ze, y: W.y + (ge + 1 - (X + 1) / 2) * ae };
      return Fe;
    }
  }, "getPositionTopBottom"), Te = { downward: 0, leftward: 90, upward: 180, rightward: -90 };
  Object.keys(Te).indexOf(r.direction) === -1 && Ue("Invalid direction '".concat(r.direction, "' specified for breadthfirst layout. Valid values are: ").concat(Object.keys(Te).join(", ")));
  var xe = m(function(se) {
    return Uc(Re(se), l, Te[r.direction]);
  }, "getPosition");
  return t.nodes().layoutPositions(this, r, xe), this;
};
var Rp = { fit: true, padding: 30, boundingBox: void 0, avoidOverlap: true, nodeDimensionsIncludeLabels: false, spacingFactor: void 0, radius: void 0, startAngle: 3 / 2 * Math.PI, sweep: void 0, clockwise: true, sort: void 0, animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
function sf(r) {
  this.options = we({}, Rp, r);
}
m(sf, "CircleLayout");
sf.prototype.run = function() {
  var r = this.options, e = r, t = r.cy, a = e.eles, n = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, i = a.nodes().not(":parent");
  e.sort && (i = i.sort(e.sort));
  for (var s = xr(e.boundingBox ? e.boundingBox : { x1: 0, y1: 0, w: t.width(), h: t.height() }), o = { x: s.x1 + s.w / 2, y: s.y1 + s.h / 2 }, l = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / i.length : e.sweep, u = l / Math.max(1, i.length - 1), f, c = 0, d = 0; d < i.length; d++) {
    var g = i[d], h = g.layoutDimensions(e), m2 = h.w, p = h.h;
    c = Math.max(c, m2, p);
  }
  if (ne(e.radius) ? f = e.radius : i.length <= 1 ? f = 0 : f = Math.min(s.h, s.w) / 2 - c, i.length > 1 && e.avoidOverlap) {
    c *= 1.75;
    var y = Math.cos(u) - Math.cos(0), b = Math.sin(u) - Math.sin(0), w = Math.sqrt(c * c / (y * y + b * b));
    f = Math.max(w, f);
  }
  var x = m(function(T, E) {
    var S = e.startAngle + E * u * (n ? 1 : -1), D = f * Math.cos(S), B = f * Math.sin(S), P = { x: o.x + D, y: o.y + B };
    return P;
  }, "getPos");
  return a.nodes().layoutPositions(this, e, x), this;
};
var Mp = { fit: true, padding: 30, startAngle: 3 / 2 * Math.PI, sweep: void 0, clockwise: true, equidistant: false, minNodeSpacing: 10, boundingBox: void 0, avoidOverlap: true, nodeDimensionsIncludeLabels: false, height: void 0, width: void 0, spacingFactor: void 0, concentric: m(function(e) {
  return e.degree();
}, "concentric"), levelWidth: m(function(e) {
  return e.maxDegree() / 4;
}, "levelWidth"), animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
function of(r) {
  this.options = we({}, Mp, r);
}
m(of, "ConcentricLayout");
of.prototype.run = function() {
  for (var r = this.options, e = r, t = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, a = r.cy, n = e.eles, i = n.nodes().not(":parent"), s = xr(e.boundingBox ? e.boundingBox : { x1: 0, y1: 0, w: a.width(), h: a.height() }), o = { x: s.x1 + s.w / 2, y: s.y1 + s.h / 2 }, l = [], u = 0, f = 0; f < i.length; f++) {
    var c = i[f], d = void 0;
    d = e.concentric(c), l.push({ value: d, node: c }), c._private.scratch.concentric = d;
  }
  i.updateStyle();
  for (var g = 0; g < i.length; g++) {
    var h = i[g], m2 = h.layoutDimensions(e);
    u = Math.max(u, m2.w, m2.h);
  }
  l.sort(function(ae, de) {
    return de.value - ae.value;
  });
  for (var p = e.levelWidth(i), y = [[]], b = y[0], w = 0; w < l.length; w++) {
    var x = l[w];
    if (b.length > 0) {
      var C = Math.abs(b[0].value - x.value);
      C >= p && (b = [], y.push(b));
    }
    b.push(x);
  }
  var T = u + e.minNodeSpacing;
  if (!e.avoidOverlap) {
    var E = y.length > 0 && y[0].length > 1, S = Math.min(s.w, s.h) / 2 - T, D = S / (y.length + E ? 1 : 0);
    T = Math.min(T, D);
  }
  for (var B = 0, P = 0; P < y.length; P++) {
    var A = y[P], R = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / A.length : e.sweep, M = A.dTheta = R / Math.max(1, A.length - 1);
    if (A.length > 1 && e.avoidOverlap) {
      var I = Math.cos(M) - Math.cos(0), O = Math.sin(M) - Math.sin(0), L = Math.sqrt(T * T / (I * I + O * O));
      B = Math.max(L, B);
    }
    A.r = B, B += T;
  }
  if (e.equidistant) {
    for (var N = 0, q = 0, H = 0; H < y.length; H++) {
      var z = y[H], V = z.r - q;
      N = Math.max(N, V);
    }
    q = 0;
    for (var K = 0; K < y.length; K++) {
      var J = y[K];
      K === 0 && (q = J.r), J.r = q, q += N;
    }
  }
  for (var X = {}, ee = 0; ee < y.length; ee++) for (var te = y[ee], ie = te.dTheta, j = te.r, F = 0; F < te.length; F++) {
    var _ = te[F], W = e.startAngle + (t ? 1 : -1) * ie * F, Z = { x: o.x + j * Math.cos(W), y: o.y + j * Math.sin(W) };
    X[_.node.id()] = Z;
  }
  return n.nodes().layoutPositions(this, e, function(ae) {
    var de = ae.id();
    return X[de];
  }), this;
};
var ws;
var Lp = { ready: m(function() {
}, "ready"), stop: m(function() {
}, "stop"), animate: true, animationEasing: void 0, animationDuration: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), animationThreshold: 250, refresh: 20, fit: true, padding: 30, boundingBox: void 0, nodeDimensionsIncludeLabels: false, randomize: false, componentSpacing: 40, nodeRepulsion: m(function(e) {
  return 2048;
}, "nodeRepulsion"), nodeOverlap: 4, idealEdgeLength: m(function(e) {
  return 32;
}, "idealEdgeLength"), edgeElasticity: m(function(e) {
  return 32;
}, "edgeElasticity"), nestingFactor: 1.2, gravity: 1, numIter: 1e3, initialTemp: 1e3, coolingFactor: 0.99, minTemp: 1 };
function Xn(r) {
  this.options = we({}, Lp, r), this.options.layout = this;
  var e = this.options.eles.nodes(), t = this.options.eles.edges(), a = t.filter(function(n) {
    var i = n.source().data("id"), s = n.target().data("id"), o = e.some(function(u) {
      return u.data("id") === i;
    }), l = e.some(function(u) {
      return u.data("id") === s;
    });
    return !o || !l;
  });
  this.options.eles = this.options.eles.not(a);
}
m(Xn, "CoseLayout");
Xn.prototype.run = function() {
  var r = this.options, e = r.cy, t = this;
  t.stopped = false, (r.animate === true || r.animate === false) && t.emit({ type: "layoutstart", layout: t }), r.debug === true ? ws = true : ws = false;
  var a = Ip(e, t, r);
  ws && Np(a), r.randomize && zp(a);
  var n = Zr(), i = m(function() {
    Fp(a, e, r), r.fit === true && e.fit(r.padding);
  }, "refresh"), s = m(function(d) {
    return !(t.stopped || d >= r.numIter || (Vp(a, r), a.temperature = a.temperature * r.coolingFactor, a.temperature < r.minTemp));
  }, "mainLoop"), o = m(function() {
    if (r.animate === true || r.animate === false) i(), t.one("layoutstop", r.stop), t.emit({ type: "layoutstop", layout: t });
    else {
      var d = r.eles.nodes(), g = lf(a, r, d);
      d.layoutPositions(t, r, g);
    }
  }, "done"), l = 0, u = true;
  if (r.animate === true) {
    var f = m(function() {
      for (var d = 0; u && d < r.refresh; ) u = s(l), l++, d++;
      if (!u) Dl(a, r), o();
      else {
        var g = Zr();
        g - n >= r.animationThreshold && i(), xn(f);
      }
    }, "frame");
    f();
  } else {
    for (; u; ) u = s(l), l++;
    Dl(a, r), o();
  }
  return this;
};
Xn.prototype.stop = function() {
  return this.stopped = true, this.thread && this.thread.stop(), this.emit("layoutstop"), this;
};
Xn.prototype.destroy = function() {
  return this.thread && this.thread.stop(), this;
};
var Ip = m(function(e, t, a) {
  for (var n = a.eles.edges(), i = a.eles.nodes(), s = xr(a.boundingBox ? a.boundingBox : { x1: 0, y1: 0, w: e.width(), h: e.height() }), o = { isCompound: e.hasCompoundNodes(), layoutNodes: [], idToIndex: {}, nodeSize: i.size(), graphSet: [], indexToGraph: [], layoutEdges: [], edgeSize: n.size(), temperature: a.initialTemp, clientWidth: s.w, clientHeight: s.h, boundingBox: s }, l = a.eles.components(), u = {}, f = 0; f < l.length; f++) for (var c = l[f], d = 0; d < c.length; d++) {
    var g = c[d];
    u[g.id()] = f;
  }
  for (var f = 0; f < o.nodeSize; f++) {
    var h = i[f], m2 = h.layoutDimensions(a), p = {};
    p.isLocked = h.locked(), p.id = h.data("id"), p.parentId = h.data("parent"), p.cmptId = u[h.id()], p.children = [], p.positionX = h.position("x"), p.positionY = h.position("y"), p.offsetX = 0, p.offsetY = 0, p.height = m2.w, p.width = m2.h, p.maxX = p.positionX + p.width / 2, p.minX = p.positionX - p.width / 2, p.maxY = p.positionY + p.height / 2, p.minY = p.positionY - p.height / 2, p.padLeft = parseFloat(h.style("padding")), p.padRight = parseFloat(h.style("padding")), p.padTop = parseFloat(h.style("padding")), p.padBottom = parseFloat(h.style("padding")), p.nodeRepulsion = Ke(a.nodeRepulsion) ? a.nodeRepulsion(h) : a.nodeRepulsion, o.layoutNodes.push(p), o.idToIndex[p.id] = f;
  }
  for (var y = [], b = 0, w = -1, x = [], f = 0; f < o.nodeSize; f++) {
    var h = o.layoutNodes[f], C = h.parentId;
    C != null ? o.layoutNodes[o.idToIndex[C]].children.push(h.id) : (y[++w] = h.id, x.push(h.id));
  }
  for (o.graphSet.push(x); b <= w; ) {
    var T = y[b++], E = o.idToIndex[T], g = o.layoutNodes[E], S = g.children;
    if (S.length > 0) {
      o.graphSet.push(S);
      for (var f = 0; f < S.length; f++) y[++w] = S[f];
    }
  }
  for (var f = 0; f < o.graphSet.length; f++) for (var D = o.graphSet[f], d = 0; d < D.length; d++) {
    var B = o.idToIndex[D[d]];
    o.indexToGraph[B] = f;
  }
  for (var f = 0; f < o.edgeSize; f++) {
    var P = n[f], A = {};
    A.id = P.data("id"), A.sourceId = P.data("source"), A.targetId = P.data("target");
    var R = Ke(a.idealEdgeLength) ? a.idealEdgeLength(P) : a.idealEdgeLength, M = Ke(a.edgeElasticity) ? a.edgeElasticity(P) : a.edgeElasticity, I = o.idToIndex[A.sourceId], O = o.idToIndex[A.targetId], L = o.indexToGraph[I], N = o.indexToGraph[O];
    if (L != N) {
      for (var q = Op(A.sourceId, A.targetId, o), H = o.graphSet[q], z = 0, p = o.layoutNodes[I]; H.indexOf(p.id) === -1; ) p = o.layoutNodes[o.idToIndex[p.parentId]], z++;
      for (p = o.layoutNodes[O]; H.indexOf(p.id) === -1; ) p = o.layoutNodes[o.idToIndex[p.parentId]], z++;
      R *= z * a.nestingFactor;
    }
    A.idealLength = R, A.elasticity = M, o.layoutEdges.push(A);
  }
  return o;
}, "createLayoutInfo");
var Op = m(function(e, t, a) {
  var n = uf(e, t, 0, a);
  return 2 > n.count ? 0 : n.graph;
}, "findLCA");
var uf = m(function(e, t, a, n) {
  var i = n.graphSet[a];
  if (-1 < i.indexOf(e) && -1 < i.indexOf(t)) return { count: 2, graph: a };
  for (var s = 0, o = 0; o < i.length; o++) {
    var l = i[o], u = n.idToIndex[l], f = n.layoutNodes[u].children;
    if (f.length !== 0) {
      var c = n.indexToGraph[n.idToIndex[f[0]]], d = uf(e, t, c, n);
      if (d.count !== 0) if (d.count === 1) {
        if (s++, s === 2) break;
      } else return d;
    }
  }
  return { count: s, graph: a };
}, "findLCA_aux");
var Np;
var zp = m(function(e, t) {
  for (var a = e.clientWidth, n = e.clientHeight, i = 0; i < e.nodeSize; i++) {
    var s = e.layoutNodes[i];
    s.children.length === 0 && !s.isLocked && (s.positionX = Math.random() * a, s.positionY = Math.random() * n);
  }
}, "randomizePositions");
var lf = m(function(e, t, a) {
  var n = e.boundingBox, i = { x1: 1 / 0, x2: -1 / 0, y1: 1 / 0, y2: -1 / 0 };
  return t.boundingBox && (a.forEach(function(s) {
    var o = e.layoutNodes[e.idToIndex[s.data("id")]];
    i.x1 = Math.min(i.x1, o.positionX), i.x2 = Math.max(i.x2, o.positionX), i.y1 = Math.min(i.y1, o.positionY), i.y2 = Math.max(i.y2, o.positionY);
  }), i.w = i.x2 - i.x1, i.h = i.y2 - i.y1), function(s, o) {
    var l = e.layoutNodes[e.idToIndex[s.data("id")]];
    if (t.boundingBox) {
      var u = i.w === 0 ? 0.5 : (l.positionX - i.x1) / i.w, f = i.h === 0 ? 0.5 : (l.positionY - i.y1) / i.h;
      return { x: n.x1 + u * n.w, y: n.y1 + f * n.h };
    } else return { x: l.positionX, y: l.positionY };
  };
}, "getScaleInBoundsFn");
var Fp = m(function(e, t, a) {
  var n = a.layout, i = a.eles.nodes(), s = lf(e, a, i);
  i.positions(s), e.ready !== true && (e.ready = true, n.one("layoutready", a.ready), n.emit({ type: "layoutready", layout: this }));
}, "refreshPositions");
var Vp = m(function(e, t, a) {
  qp(e, t), Hp(e), Wp(e, t), $p(e), Up(e);
}, "step");
var qp = m(function(e, t) {
  for (var a = 0; a < e.graphSet.length; a++) for (var n = e.graphSet[a], i = n.length, s = 0; s < i; s++) for (var o = e.layoutNodes[e.idToIndex[n[s]]], l = s + 1; l < i; l++) {
    var u = e.layoutNodes[e.idToIndex[n[l]]];
    _p(o, u, e, t);
  }
}, "calculateNodeForces");
var kl = m(function(e) {
  return -1 + 2 * e * Math.random();
}, "randomDistance");
var _p = m(function(e, t, a, n) {
  var i = e.cmptId, s = t.cmptId;
  if (!(i !== s && !a.isCompound)) {
    var o = t.positionX - e.positionX, l = t.positionY - e.positionY, u = 1;
    o === 0 && l === 0 && (o = kl(u), l = kl(u));
    var f = Gp(e, t, o, l);
    if (f > 0) var c = n.nodeOverlap * f, d = Math.sqrt(o * o + l * l), g = c * o / d, h = c * l / d;
    else var m2 = Bn(e, o, l), p = Bn(t, -1 * o, -1 * l), y = p.x - m2.x, b = p.y - m2.y, w = y * y + b * b, d = Math.sqrt(w), c = (e.nodeRepulsion + t.nodeRepulsion) / w, g = c * y / d, h = c * b / d;
    e.isLocked || (e.offsetX -= g, e.offsetY -= h), t.isLocked || (t.offsetX += g, t.offsetY += h);
  }
}, "nodeRepulsion");
var Gp = m(function(e, t, a, n) {
  if (a > 0) var i = e.maxX - t.minX;
  else var i = t.maxX - e.minX;
  if (n > 0) var s = e.maxY - t.minY;
  else var s = t.maxY - e.minY;
  return i >= 0 && s >= 0 ? Math.sqrt(i * i + s * s) : 0;
}, "nodesOverlap");
var Bn = m(function(e, t, a) {
  var n = e.positionX, i = e.positionY, s = e.height || 1, o = e.width || 1, l = a / t, u = s / o, f = {};
  return t === 0 && 0 < a || t === 0 && 0 > a ? (f.x = n, f.y = i + s / 2, f) : 0 < t && -1 * u <= l && l <= u ? (f.x = n + o / 2, f.y = i + o * a / 2 / t, f) : 0 > t && -1 * u <= l && l <= u ? (f.x = n - o / 2, f.y = i - o * a / 2 / t, f) : 0 < a && (l <= -1 * u || l >= u) ? (f.x = n + s * t / 2 / a, f.y = i + s / 2, f) : (0 > a && (l <= -1 * u || l >= u) && (f.x = n - s * t / 2 / a, f.y = i - s / 2), f);
}, "findClippingPoint");
var Hp = m(function(e, t) {
  for (var a = 0; a < e.edgeSize; a++) {
    var n = e.layoutEdges[a], i = e.idToIndex[n.sourceId], s = e.layoutNodes[i], o = e.idToIndex[n.targetId], l = e.layoutNodes[o], u = l.positionX - s.positionX, f = l.positionY - s.positionY;
    if (!(u === 0 && f === 0)) {
      var c = Bn(s, u, f), d = Bn(l, -1 * u, -1 * f), g = d.x - c.x, h = d.y - c.y, m2 = Math.sqrt(g * g + h * h), p = Math.pow(n.idealLength - m2, 2) / n.elasticity;
      if (m2 !== 0) var y = p * g / m2, b = p * h / m2;
      else var y = 0, b = 0;
      s.isLocked || (s.offsetX += y, s.offsetY += b), l.isLocked || (l.offsetX -= y, l.offsetY -= b);
    }
  }
}, "calculateEdgeForces");
var Wp = m(function(e, t) {
  if (t.gravity !== 0) for (var a = 1, n = 0; n < e.graphSet.length; n++) {
    var i = e.graphSet[n], s = i.length;
    if (n === 0) var o = e.clientHeight / 2, l = e.clientWidth / 2;
    else var u = e.layoutNodes[e.idToIndex[i[0]]], f = e.layoutNodes[e.idToIndex[u.parentId]], o = f.positionX, l = f.positionY;
    for (var c = 0; c < s; c++) {
      var d = e.layoutNodes[e.idToIndex[i[c]]];
      if (!d.isLocked) {
        var g = o - d.positionX, h = l - d.positionY, m2 = Math.sqrt(g * g + h * h);
        if (m2 > a) {
          var p = t.gravity * g / m2, y = t.gravity * h / m2;
          d.offsetX += p, d.offsetY += y;
        }
      }
    }
  }
}, "calculateGravityForces");
var $p = m(function(e, t) {
  var a = [], n = 0, i = -1;
  for (a.push.apply(a, e.graphSet[0]), i += e.graphSet[0].length; n <= i; ) {
    var s = a[n++], o = e.idToIndex[s], l = e.layoutNodes[o], u = l.children;
    if (0 < u.length && !l.isLocked) {
      for (var f = l.offsetX, c = l.offsetY, d = 0; d < u.length; d++) {
        var g = e.layoutNodes[e.idToIndex[u[d]]];
        g.offsetX += f, g.offsetY += c, a[++i] = u[d];
      }
      l.offsetX = 0, l.offsetY = 0;
    }
  }
}, "propagateForces");
var Up = m(function(e, t) {
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    0 < n.children.length && (n.maxX = void 0, n.minX = void 0, n.maxY = void 0, n.minY = void 0);
  }
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    if (!(0 < n.children.length || n.isLocked)) {
      var i = Kp(n.offsetX, n.offsetY, e.temperature);
      n.positionX += i.x, n.positionY += i.y, n.offsetX = 0, n.offsetY = 0, n.minX = n.positionX - n.width, n.maxX = n.positionX + n.width, n.minY = n.positionY - n.height, n.maxY = n.positionY + n.height, vf(n, e);
    }
  }
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    0 < n.children.length && !n.isLocked && (n.positionX = (n.maxX + n.minX) / 2, n.positionY = (n.maxY + n.minY) / 2, n.width = n.maxX - n.minX, n.height = n.maxY - n.minY);
  }
}, "updatePositions");
var Kp = m(function(e, t, a) {
  var n = Math.sqrt(e * e + t * t);
  if (n > a) var i = { x: a * e / n, y: a * t / n };
  else var i = { x: e, y: t };
  return i;
}, "limitForce");
var vf = m(function(e, t) {
  var a = e.parentId;
  if (a != null) {
    var n = t.layoutNodes[t.idToIndex[a]], i = false;
    if ((n.maxX == null || e.maxX + n.padRight > n.maxX) && (n.maxX = e.maxX + n.padRight, i = true), (n.minX == null || e.minX - n.padLeft < n.minX) && (n.minX = e.minX - n.padLeft, i = true), (n.maxY == null || e.maxY + n.padBottom > n.maxY) && (n.maxY = e.maxY + n.padBottom, i = true), (n.minY == null || e.minY - n.padTop < n.minY) && (n.minY = e.minY - n.padTop, i = true), i) return vf(n, t);
  }
}, "updateAncestryBoundaries");
var Dl = m(function(e, t) {
  for (var a = e.layoutNodes, n = [], i = 0; i < a.length; i++) {
    var s = a[i], o = s.cmptId, l = n[o] = n[o] || [];
    l.push(s);
  }
  for (var u = 0, i = 0; i < n.length; i++) {
    var f = n[i];
    if (f) {
      f.x1 = 1 / 0, f.x2 = -1 / 0, f.y1 = 1 / 0, f.y2 = -1 / 0;
      for (var c = 0; c < f.length; c++) {
        var d = f[c];
        f.x1 = Math.min(f.x1, d.positionX - d.width / 2), f.x2 = Math.max(f.x2, d.positionX + d.width / 2), f.y1 = Math.min(f.y1, d.positionY - d.height / 2), f.y2 = Math.max(f.y2, d.positionY + d.height / 2);
      }
      f.w = f.x2 - f.x1, f.h = f.y2 - f.y1, u += f.w * f.h;
    }
  }
  n.sort(function(b, w) {
    return w.w * w.h - b.w * b.h;
  });
  for (var g = 0, h = 0, m2 = 0, p = 0, y = Math.sqrt(u) * e.clientWidth / e.clientHeight, i = 0; i < n.length; i++) {
    var f = n[i];
    if (f) {
      for (var c = 0; c < f.length; c++) {
        var d = f[c];
        d.isLocked || (d.positionX += g - f.x1, d.positionY += h - f.y1);
      }
      g += f.w + t.componentSpacing, m2 += f.w + t.componentSpacing, p = Math.max(p, f.h), m2 > y && (h += p + t.componentSpacing, g = 0, m2 = 0, p = 0);
    }
  }
}, "separateComponents");
var Xp = { fit: true, padding: 30, boundingBox: void 0, avoidOverlap: true, avoidOverlapPadding: 10, nodeDimensionsIncludeLabels: false, spacingFactor: void 0, condense: false, rows: void 0, cols: void 0, position: m(function(e) {
}, "position"), sort: void 0, animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
function ff(r) {
  this.options = we({}, Xp, r);
}
m(ff, "GridLayout");
ff.prototype.run = function() {
  var r = this.options, e = r, t = r.cy, a = e.eles, n = a.nodes().not(":parent");
  e.sort && (n = n.sort(e.sort));
  var i = xr(e.boundingBox ? e.boundingBox : { x1: 0, y1: 0, w: t.width(), h: t.height() });
  if (i.h === 0 || i.w === 0) a.nodes().layoutPositions(this, e, function(K) {
    return { x: i.x1, y: i.y1 };
  });
  else {
    var s = n.size(), o = Math.sqrt(s * i.h / i.w), l = Math.round(o), u = Math.round(i.w / i.h * o), f = m(function(J) {
      if (J == null) return Math.min(l, u);
      var X = Math.min(l, u);
      X == l ? l = J : u = J;
    }, "small"), c = m(function(J) {
      if (J == null) return Math.max(l, u);
      var X = Math.max(l, u);
      X == l ? l = J : u = J;
    }, "large"), d = e.rows, g = e.cols != null ? e.cols : e.columns;
    if (d != null && g != null) l = d, u = g;
    else if (d != null && g == null) l = d, u = Math.ceil(s / l);
    else if (d == null && g != null) u = g, l = Math.ceil(s / u);
    else if (u * l > s) {
      var h = f(), m2 = c();
      (h - 1) * m2 >= s ? f(h - 1) : (m2 - 1) * h >= s && c(m2 - 1);
    } else for (; u * l < s; ) {
      var p = f(), y = c();
      (y + 1) * p >= s ? c(y + 1) : f(p + 1);
    }
    var b = i.w / u, w = i.h / l;
    if (e.condense && (b = 0, w = 0), e.avoidOverlap) for (var x = 0; x < n.length; x++) {
      var C = n[x], T = C._private.position;
      (T.x == null || T.y == null) && (T.x = 0, T.y = 0);
      var E = C.layoutDimensions(e), S = e.avoidOverlapPadding, D = E.w + S, B = E.h + S;
      b = Math.max(b, D), w = Math.max(w, B);
    }
    for (var P = {}, A = m(function(J, X) {
      return !!P["c-" + J + "-" + X];
    }, "used"), R = m(function(J, X) {
      P["c-" + J + "-" + X] = true;
    }, "use"), M = 0, I = 0, O = m(function() {
      I++, I >= u && (I = 0, M++);
    }, "moveToNextCell"), L = {}, N = 0; N < n.length; N++) {
      var q = n[N], H = e.position(q);
      if (H && (H.row !== void 0 || H.col !== void 0)) {
        var z = { row: H.row, col: H.col };
        if (z.col === void 0) for (z.col = 0; A(z.row, z.col); ) z.col++;
        else if (z.row === void 0) for (z.row = 0; A(z.row, z.col); ) z.row++;
        L[q.id()] = z, R(z.row, z.col);
      }
    }
    var V = m(function(J, X) {
      var ee, te;
      if (J.locked() || J.isParent()) return false;
      var ie = L[J.id()];
      if (ie) ee = ie.col * b + b / 2 + i.x1, te = ie.row * w + w / 2 + i.y1;
      else {
        for (; A(M, I); ) O();
        ee = I * b + b / 2 + i.x1, te = M * w + w / 2 + i.y1, R(M, I), O();
      }
      return { x: ee, y: te };
    }, "getPos");
    n.layoutPositions(this, e, V);
  }
  return this;
};
var Yp = { ready: m(function() {
}, "ready"), stop: m(function() {
}, "stop") };
function go(r) {
  this.options = we({}, Yp, r);
}
m(go, "NullLayout");
go.prototype.run = function() {
  var r = this.options, e = r.eles, t = this;
  return r.cy, t.emit("layoutstart"), e.nodes().positions(function() {
    return { x: 0, y: 0 };
  }), t.one("layoutready", r.ready), t.emit("layoutready"), t.one("layoutstop", r.stop), t.emit("layoutstop"), this;
};
go.prototype.stop = function() {
  return this;
};
var Zp = { positions: void 0, zoom: void 0, pan: void 0, fit: true, padding: 30, spacingFactor: void 0, animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
function cf(r) {
  this.options = we({}, Zp, r);
}
m(cf, "PresetLayout");
cf.prototype.run = function() {
  var r = this.options, e = r.eles, t = e.nodes(), a = Ke(r.positions);
  function n(i) {
    if (r.positions == null) return md(i.position());
    if (a) return r.positions(i);
    var s = r.positions[i._private.data.id];
    return s ?? null;
  }
  return m(n, "getPosition"), t.layoutPositions(this, r, function(i, s) {
    var o = n(i);
    return i.locked() || o == null ? false : o;
  }), this;
};
var Qp = { fit: true, padding: 30, boundingBox: void 0, animate: false, animationDuration: 500, animationEasing: void 0, animateFilter: m(function(e, t) {
  return true;
}, "animateFilter"), ready: void 0, stop: void 0, transform: m(function(e, t) {
  return t;
}, "transform") };
function df(r) {
  this.options = we({}, Qp, r);
}
m(df, "RandomLayout");
df.prototype.run = function() {
  var r = this.options, e = r.cy, t = r.eles, a = xr(r.boundingBox ? r.boundingBox : { x1: 0, y1: 0, w: e.width(), h: e.height() }), n = m(function(s, o) {
    return { x: a.x1 + Math.round(Math.random() * a.w), y: a.y1 + Math.round(Math.random() * a.h) };
  }, "getPos");
  return t.nodes().layoutPositions(this, r, n), this;
};
var Jp = [{ name: "breadthfirst", impl: nf }, { name: "circle", impl: sf }, { name: "concentric", impl: of }, { name: "cose", impl: Xn }, { name: "grid", impl: ff }, { name: "null", impl: go }, { name: "preset", impl: cf }, { name: "random", impl: df }];
function hf(r) {
  this.options = r, this.notifications = 0;
}
m(hf, "NullRenderer");
var Bl = m(function() {
}, "noop");
var Pl = m(function() {
  throw new Error("A headless instance can not render images");
}, "throwImgErr");
hf.prototype = { recalculateRenderedStyle: Bl, notify: m(function() {
  this.notifications++;
}, "notify"), init: Bl, isHeadless: m(function() {
  return true;
}, "isHeadless"), png: Pl, jpg: Pl };
var po = {};
po.arrowShapeWidth = 0.3;
po.registerArrowShapes = function() {
  var r = this.arrowShapes = {}, e = this, t = m(function(u, f, c, d, g, h, m2) {
    var p = g.x - c / 2 - m2, y = g.x + c / 2 + m2, b = g.y - c / 2 - m2, w = g.y + c / 2 + m2, x = p <= u && u <= y && b <= f && f <= w;
    return x;
  }, "bbCollide"), a = m(function(u, f, c, d, g) {
    var h = u * Math.cos(d) - f * Math.sin(d), m2 = u * Math.sin(d) + f * Math.cos(d), p = h * c, y = m2 * c, b = p + g.x, w = y + g.y;
    return { x: b, y: w };
  }, "transform"), n = m(function(u, f, c, d) {
    for (var g = [], h = 0; h < u.length; h += 2) {
      var m2 = u[h], p = u[h + 1];
      g.push(a(m2, p, f, c, d));
    }
    return g;
  }, "transformPoints"), i = m(function(u) {
    for (var f = [], c = 0; c < u.length; c++) {
      var d = u[c];
      f.push(d.x, d.y);
    }
    return f;
  }, "pointsToArr"), s = m(function(u) {
    return u.pstyle("width").pfValue * u.pstyle("arrow-scale").pfValue * 2;
  }, "standardGap"), o = m(function(u, f) {
    pe(f) && (f = r[f]), r[u] = we({ name: u, points: [-0.15, -0.3, 0.15, -0.3, 0.15, 0.3, -0.15, 0.3], collide: m(function(d, g, h, m2, p, y) {
      var b = i(n(this.points, h + 2 * y, m2, p)), w = kr(d, g, b);
      return w;
    }, "collide"), roughCollide: t, draw: m(function(d, g, h, m2) {
      var p = n(this.points, g, h, m2);
      e.arrowShapeImpl("polygon")(d, p);
    }, "draw"), spacing: m(function(d) {
      return 0;
    }, "spacing"), gap: s }, f);
  }, "defineArrowShape");
  o("none", { collide: En, roughCollide: En, draw: eo, spacing: Ho, gap: Ho }), o("triangle", { points: [-0.15, -0.3, 0, 0, 0.15, -0.3] }), o("arrow", "triangle"), o("triangle-backcurve", { points: r.triangle.points, controlPoint: [0, -0.15], roughCollide: t, draw: m(function(u, f, c, d, g) {
    var h = n(this.points, f, c, d), m2 = this.controlPoint, p = a(m2[0], m2[1], f, c, d);
    e.arrowShapeImpl(this.name)(u, h, p);
  }, "draw"), gap: m(function(u) {
    return s(u) * 0.8;
  }, "gap") }), o("triangle-tee", { points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0], pointsTee: [-0.15, -0.4, -0.15, -0.5, 0.15, -0.5, 0.15, -0.4], collide: m(function(u, f, c, d, g, h, m2) {
    var p = i(n(this.points, c + 2 * m2, d, g)), y = i(n(this.pointsTee, c + 2 * m2, d, g)), b = kr(u, f, p) || kr(u, f, y);
    return b;
  }, "collide"), draw: m(function(u, f, c, d, g) {
    var h = n(this.points, f, c, d), m2 = n(this.pointsTee, f, c, d);
    e.arrowShapeImpl(this.name)(u, h, m2);
  }, "draw") }), o("circle-triangle", { radius: 0.15, pointsTr: [0, -0.15, 0.15, -0.45, -0.15, -0.45, 0, -0.15], collide: m(function(u, f, c, d, g, h, m2) {
    var p = g, y = Math.pow(p.x - u, 2) + Math.pow(p.y - f, 2) <= Math.pow((c + 2 * m2) * this.radius, 2), b = i(n(this.points, c + 2 * m2, d, g));
    return kr(u, f, b) || y;
  }, "collide"), draw: m(function(u, f, c, d, g) {
    var h = n(this.pointsTr, f, c, d);
    e.arrowShapeImpl(this.name)(u, h, d.x, d.y, this.radius * f);
  }, "draw"), spacing: m(function(u) {
    return e.getArrowWidth(u.pstyle("width").pfValue, u.pstyle("arrow-scale").value) * this.radius;
  }, "spacing") }), o("triangle-cross", { points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0], baseCrossLinePts: [-0.15, -0.4, -0.15, -0.4, 0.15, -0.4, 0.15, -0.4], crossLinePts: m(function(u, f) {
    var c = this.baseCrossLinePts.slice(), d = f / u, g = 3, h = 5;
    return c[g] = c[g] - d, c[h] = c[h] - d, c;
  }, "crossLinePts"), collide: m(function(u, f, c, d, g, h, m2) {
    var p = i(n(this.points, c + 2 * m2, d, g)), y = i(n(this.crossLinePts(c, h), c + 2 * m2, d, g)), b = kr(u, f, p) || kr(u, f, y);
    return b;
  }, "collide"), draw: m(function(u, f, c, d, g) {
    var h = n(this.points, f, c, d), m2 = n(this.crossLinePts(f, g), f, c, d);
    e.arrowShapeImpl(this.name)(u, h, m2);
  }, "draw") }), o("vee", { points: [-0.15, -0.3, 0, 0, 0.15, -0.3, 0, -0.15], gap: m(function(u) {
    return s(u) * 0.525;
  }, "gap") }), o("circle", { radius: 0.15, collide: m(function(u, f, c, d, g, h, m2) {
    var p = g, y = Math.pow(p.x - u, 2) + Math.pow(p.y - f, 2) <= Math.pow((c + 2 * m2) * this.radius, 2);
    return y;
  }, "collide"), draw: m(function(u, f, c, d, g) {
    e.arrowShapeImpl(this.name)(u, d.x, d.y, this.radius * f);
  }, "draw"), spacing: m(function(u) {
    return e.getArrowWidth(u.pstyle("width").pfValue, u.pstyle("arrow-scale").value) * this.radius;
  }, "spacing") }), o("tee", { points: [-0.15, 0, -0.15, -0.1, 0.15, -0.1, 0.15, 0], spacing: m(function(u) {
    return 1;
  }, "spacing"), gap: m(function(u) {
    return 1;
  }, "gap") }), o("square", { points: [-0.15, 0, 0.15, 0, 0.15, -0.3, -0.15, -0.3] }), o("diamond", { points: [-0.15, -0.15, 0, -0.3, 0.15, -0.15, 0, 0], gap: m(function(u) {
    return u.pstyle("width").pfValue * u.pstyle("arrow-scale").value;
  }, "gap") }), o("chevron", { points: [0, 0, -0.15, -0.15, -0.1, -0.2, 0, -0.1, 0.1, -0.2, 0.15, -0.15], gap: m(function(u) {
    return 0.95 * u.pstyle("width").pfValue * u.pstyle("arrow-scale").value;
  }, "gap") });
};
var It = {};
It.projectIntoViewport = function(r, e) {
  var t = this.cy, a = this.findContainerClientCoords(), n = a[0], i = a[1], s = a[4], o = t.pan(), l = t.zoom(), u = ((r - n) / s - o.x) / l, f = ((e - i) / s - o.y) / l;
  return [u, f];
};
It.findContainerClientCoords = function() {
  if (this.containerBB) return this.containerBB;
  var r = this.container, e = r.getBoundingClientRect(), t = this.cy.window().getComputedStyle(r), a = m(function(y) {
    return parseFloat(t.getPropertyValue(y));
  }, "styleValue"), n = { left: a("padding-left"), right: a("padding-right"), top: a("padding-top"), bottom: a("padding-bottom") }, i = { left: a("border-left-width"), right: a("border-right-width"), top: a("border-top-width"), bottom: a("border-bottom-width") }, s = r.clientWidth, o = r.clientHeight, l = n.left + n.right, u = n.top + n.bottom, f = i.left + i.right, c = e.width / (s + f), d = s - l, g = o - u, h = e.left + n.left + i.left, m2 = e.top + n.top + i.top;
  return this.containerBB = [h, m2, d, g, c];
};
It.invalidateContainerClientCoordsCache = function() {
  this.containerBB = null;
};
It.findNearestElement = function(r, e, t, a) {
  return this.findNearestElements(r, e, t, a)[0];
};
It.findNearestElements = function(r, e, t, a) {
  var n = this, i = this, s = i.getCachedZSortedEles(), o = [], l = i.cy.zoom(), u = i.cy.hasCompoundNodes(), f = (a ? 24 : 8) / l, c = (a ? 8 : 2) / l, d = (a ? 8 : 2) / l, g = 1 / 0, h, m2;
  t && (s = s.interactive);
  function p(E, S) {
    if (E.isNode()) {
      if (m2) return;
      m2 = E, o.push(E);
    }
    if (E.isEdge() && (S == null || S < g)) if (h) {
      if (h.pstyle("z-compound-depth").value === E.pstyle("z-compound-depth").value && h.pstyle("z-compound-depth").value === E.pstyle("z-compound-depth").value) {
        for (var D = 0; D < o.length; D++) if (o[D].isEdge()) {
          o[D] = E, h = E, g = S ?? g;
          break;
        }
      }
    } else o.push(E), h = E, g = S ?? g;
  }
  m(p, "addEle");
  function y(E) {
    var S = E.outerWidth() + 2 * c, D = E.outerHeight() + 2 * c, B = S / 2, P = D / 2, A = E.position(), R = E.pstyle("corner-radius").value === "auto" ? "auto" : E.pstyle("corner-radius").pfValue, M = E._private.rscratch;
    if (A.x - B <= r && r <= A.x + B && A.y - P <= e && e <= A.y + P) {
      var I = i.nodeShapes[n.getNodeShape(E)];
      if (I.checkPoint(r, e, 0, S, D, A.x, A.y, R, M)) return p(E, 0), true;
    }
  }
  m(y, "checkNode");
  function b(E) {
    var S = E._private, D = S.rscratch, B = E.pstyle("width").pfValue, P = E.pstyle("arrow-scale").value, A = B / 2 + f, R = A * A, M = A * 2, N = S.source, q = S.target, I;
    if (D.edgeType === "segments" || D.edgeType === "straight" || D.edgeType === "haystack") {
      for (var O = D.allpts, L = 0; L + 3 < O.length; L += 2) if (Md(r, e, O[L], O[L + 1], O[L + 2], O[L + 3], M) && R > (I = zd(r, e, O[L], O[L + 1], O[L + 2], O[L + 3]))) return p(E, I), true;
    } else if (D.edgeType === "bezier" || D.edgeType === "multibezier" || D.edgeType === "self" || D.edgeType === "compound") {
      for (var O = D.allpts, L = 0; L + 5 < D.allpts.length; L += 4) if (Ld(r, e, O[L], O[L + 1], O[L + 2], O[L + 3], O[L + 4], O[L + 5], M) && R > (I = Nd(r, e, O[L], O[L + 1], O[L + 2], O[L + 3], O[L + 4], O[L + 5]))) return p(E, I), true;
    }
    for (var N = N || S.source, q = q || S.target, H = n.getArrowWidth(B, P), z = [{ name: "source", x: D.arrowStartX, y: D.arrowStartY, angle: D.srcArrowAngle }, { name: "target", x: D.arrowEndX, y: D.arrowEndY, angle: D.tgtArrowAngle }, { name: "mid-source", x: D.midX, y: D.midY, angle: D.midsrcArrowAngle }, { name: "mid-target", x: D.midX, y: D.midY, angle: D.midtgtArrowAngle }], L = 0; L < z.length; L++) {
      var V = z[L], K = i.arrowShapes[E.pstyle(V.name + "-arrow-shape").value], J = E.pstyle("width").pfValue;
      if (K.roughCollide(r, e, H, V.angle, { x: V.x, y: V.y }, J, f) && K.collide(r, e, H, V.angle, { x: V.x, y: V.y }, J, f)) return p(E), true;
    }
    u && o.length > 0 && (y(N), y(q));
  }
  m(b, "checkEdge");
  function w(E, S, D) {
    return Sr(E, S, D);
  }
  m(w, "preprop");
  function x(E, S) {
    var D = E._private, B = d, P;
    S ? P = S + "-" : P = "", E.boundingBox();
    var A = D.labelBounds[S || "main"], R = E.pstyle(P + "label").value, M = E.pstyle("text-events").strValue === "yes";
    if (!(!M || !R)) {
      var I = w(D.rscratch, "labelX", S), O = w(D.rscratch, "labelY", S), L = w(D.rscratch, "labelAngle", S), N = E.pstyle(P + "text-margin-x").pfValue, q = E.pstyle(P + "text-margin-y").pfValue, H = A.x1 - B - N, z = A.x2 + B - N, V = A.y1 - B - q, K = A.y2 + B - q;
      if (L) {
        var J = Math.cos(L), X = Math.sin(L), ee = m(function(Z, ae) {
          return Z = Z - I, ae = ae - O, { x: Z * J - ae * X + I, y: Z * X + ae * J + O };
        }, "rotate"), te = ee(H, V), ie = ee(H, K), j = ee(z, V), F = ee(z, K), _ = [te.x + N, te.y + q, j.x + N, j.y + q, F.x + N, F.y + q, ie.x + N, ie.y + q];
        if (kr(r, e, _)) return p(E), true;
      } else if (it(A, r, e)) return p(E), true;
    }
  }
  m(x, "checkLabel");
  for (var C = s.length - 1; C >= 0; C--) {
    var T = s[C];
    T.isNode() ? y(T) || x(T) : b(T) || x(T) || x(T, "source") || x(T, "target");
  }
  return o;
};
It.getAllInBox = function(r, e, t, a) {
  var n = this.getCachedZSortedEles().interactive, i = this.cy.zoom(), s = 2 / i, o = [], l = Math.min(r, t), u = Math.max(r, t), f = Math.min(e, a), c = Math.max(e, a);
  r = l, t = u, e = f, a = c;
  var d = xr({ x1: r, y1: e, x2: t, y2: a }), g = [{ x: d.x1, y: d.y1 }, { x: d.x2, y: d.y1 }, { x: d.x2, y: d.y2 }, { x: d.x1, y: d.y2 }], h = [[g[0], g[1]], [g[1], g[2]], [g[2], g[3]], [g[3], g[0]]];
  function m2(Z, ae, de) {
    return Sr(Z, ae, de);
  }
  m(m2, "preprop");
  function p(Z, ae) {
    var de = Z._private, Re = s, Te = "";
    Z.boundingBox();
    var xe = de.labelBounds.main;
    if (!xe) return null;
    var me = m2(de.rscratch, "labelX", ae), se = m2(de.rscratch, "labelY", ae), he = m2(de.rscratch, "labelAngle", ae), ge = Z.pstyle(Te + "text-margin-x").pfValue, Ce = Z.pstyle(Te + "text-margin-y").pfValue, ye = xe.x1 - Re - ge, ke = xe.x2 + Re - ge, Me = xe.y1 - Re - Ce, Ne = xe.y2 + Re - Ce;
    if (he) {
      var ze = Math.cos(he), Fe = Math.sin(he), Ee = m(function(Y, k) {
        return Y = Y - me, k = k - se, { x: Y * ze - k * Fe + me, y: Y * Fe + k * ze + se };
      }, "rotate");
      return [Ee(ye, Me), Ee(ke, Me), Ee(ke, Ne), Ee(ye, Ne)];
    } else return [{ x: ye, y: Me }, { x: ke, y: Me }, { x: ke, y: Ne }, { x: ye, y: Ne }];
  }
  m(p, "getRotatedLabelBox");
  function y(Z, ae, de, Re) {
    function Te(xe, me, se) {
      return (se.y - xe.y) * (me.x - xe.x) > (me.y - xe.y) * (se.x - xe.x);
    }
    return m(Te, "ccw"), Te(Z, de, Re) !== Te(ae, de, Re) && Te(Z, ae, de) !== Te(Z, ae, Re);
  }
  m(y, "doLinesIntersect");
  for (var b = 0; b < n.length; b++) {
    var w = n[b];
    if (w.isNode()) {
      var x = w, C = x.pstyle("text-events").strValue === "yes", T = x.pstyle("box-selection").strValue, E = x.pstyle("box-select-labels").strValue === "yes";
      if (T === "none") continue;
      var S = (T === "overlap" || E) && C, D = x.boundingBox({ includeNodes: true, includeEdges: false, includeLabels: S });
      if (T === "contain") {
        var B = false;
        if (E && C) {
          var P = p(x);
          P && mi(P, g) && (o.push(x), B = true);
        }
        !B && wv(d, D) && o.push(x);
      } else if (T === "overlap" && no(d, D)) {
        var A = x.boundingBox({ includeNodes: true, includeEdges: true, includeLabels: false, includeMainLabels: false, includeSourceLabels: false, includeTargetLabels: false }), R = [{ x: A.x1, y: A.y1 }, { x: A.x2, y: A.y1 }, { x: A.x2, y: A.y2 }, { x: A.x1, y: A.y2 }];
        if (mi(R, g)) o.push(x);
        else {
          var M = p(x);
          M && mi(M, g) && o.push(x);
        }
      }
    } else {
      var I = w, O = I._private, L = O.rscratch, N = I.pstyle("box-selection").strValue;
      if (N === "none") continue;
      if (N === "contain") {
        if (L.startX != null && L.startY != null && !it(d, L.startX, L.startY) || L.endX != null && L.endY != null && !it(d, L.endX, L.endY)) continue;
        if (L.edgeType === "bezier" || L.edgeType === "multibezier" || L.edgeType === "self" || L.edgeType === "compound" || L.edgeType === "segments" || L.edgeType === "haystack") {
          for (var q = O.rstyle.bezierPts || O.rstyle.linePts || O.rstyle.haystackPts, H = true, z = 0; z < q.length; z++) if (!Xo(d, q[z])) {
            H = false;
            break;
          }
          H && o.push(I);
        } else L.edgeType === "straight" && o.push(I);
      } else if (N === "overlap") {
        var V = false;
        if (L.startX != null && L.startY != null && L.endX != null && L.endY != null && (it(d, L.startX, L.startY) || it(d, L.endX, L.endY))) o.push(I), V = true;
        else if (!V && L.edgeType === "haystack") {
          for (var K = O.rstyle.haystackPts, J = 0; J < K.length; J++) if (Xo(d, K[J])) {
            o.push(I), V = true;
            break;
          }
        }
        if (!V) {
          var X = O.rstyle.bezierPts || O.rstyle.linePts || O.rstyle.haystackPts;
          if ((!X || X.length < 2) && L.edgeType === "straight" && L.startX != null && L.startY != null && L.endX != null && L.endY != null && (X = [{ x: L.startX, y: L.startY }, { x: L.endX, y: L.endY }]), !X || X.length < 2) continue;
          for (var ee = 0; ee < X.length - 1; ee++) {
            for (var te = X[ee], ie = X[ee + 1], j = 0; j < h.length; j++) {
              var F = je(h[j], 2), _ = F[0], W = F[1];
              if (y(te, ie, _, W)) {
                o.push(I), V = true;
                break;
              }
            }
            if (V) break;
          }
        }
      }
    }
  }
  return o;
};
var Pn = {};
Pn.calculateArrowAngles = function(r) {
  var e = r._private.rscratch, t = e.edgeType === "haystack", a = e.edgeType === "bezier", n = e.edgeType === "multibezier", i = e.edgeType === "segments", s = e.edgeType === "compound", o = e.edgeType === "self", l, u, f, c, d, g, y, b;
  if (t ? (f = e.haystackPts[0], c = e.haystackPts[1], d = e.haystackPts[2], g = e.haystackPts[3]) : (f = e.arrowStartX, c = e.arrowStartY, d = e.arrowEndX, g = e.arrowEndY), y = e.midX, b = e.midY, i) l = f - e.segpts[0], u = c - e.segpts[1];
  else if (n || s || o || a) {
    var h = e.allpts, m2 = or(h[0], h[2], h[4], 0.1), p = or(h[1], h[3], h[5], 0.1);
    l = f - m2, u = c - p;
  } else l = f - y, u = c - b;
  e.srcArrowAngle = Za(l, u);
  var y = e.midX, b = e.midY;
  if (t && (y = (f + d) / 2, b = (c + g) / 2), l = d - f, u = g - c, i) {
    var h = e.allpts;
    if (h.length / 2 % 2 === 0) {
      var w = h.length / 2, x = w - 2;
      l = h[w] - h[x], u = h[w + 1] - h[x + 1];
    } else if (e.isRound) l = e.midVector[1], u = -e.midVector[0];
    else {
      var w = h.length / 2 - 1, x = w - 2;
      l = h[w] - h[x], u = h[w + 1] - h[x + 1];
    }
  } else if (n || s || o) {
    var h = e.allpts, C = e.ctrlpts, T, E, S, D;
    if (C.length / 2 % 2 === 0) {
      var B = h.length / 2 - 1, P = B + 2, A = P + 2;
      T = or(h[B], h[P], h[A], 0), E = or(h[B + 1], h[P + 1], h[A + 1], 0), S = or(h[B], h[P], h[A], 1e-4), D = or(h[B + 1], h[P + 1], h[A + 1], 1e-4);
    } else {
      var P = h.length / 2 - 1, B = P - 2, A = P + 2;
      T = or(h[B], h[P], h[A], 0.4999), E = or(h[B + 1], h[P + 1], h[A + 1], 0.4999), S = or(h[B], h[P], h[A], 0.5), D = or(h[B + 1], h[P + 1], h[A + 1], 0.5);
    }
    l = S - T, u = D - E;
  }
  if (e.midtgtArrowAngle = Za(l, u), e.midDispX = l, e.midDispY = u, l *= -1, u *= -1, i) {
    var h = e.allpts;
    if (h.length / 2 % 2 !== 0) {
      if (!e.isRound) {
        var w = h.length / 2 - 1, R = w + 2;
        l = -(h[R] - h[w]), u = -(h[R + 1] - h[w + 1]);
      }
    }
  }
  if (e.midsrcArrowAngle = Za(l, u), i) l = d - e.segpts[e.segpts.length - 2], u = g - e.segpts[e.segpts.length - 1];
  else if (n || s || o || a) {
    var h = e.allpts, M = h.length, m2 = or(h[M - 6], h[M - 4], h[M - 2], 0.9), p = or(h[M - 5], h[M - 3], h[M - 1], 0.9);
    l = d - m2, u = g - p;
  } else l = d - y, u = g - b;
  e.tgtArrowAngle = Za(l, u);
};
Pn.getArrowWidth = Pn.getArrowHeight = function(r, e) {
  var t = this.arrowWidthCache = this.arrowWidthCache || {}, a = t[r + ", " + e];
  return a || (a = Math.max(Math.pow(r * 13.37, 0.9), 29) * e, t[r + ", " + e] = a, a);
};
var qs;
var _s;
var qr = {};
var Ar = {};
var Al;
var Rl;
var Dt;
var pn;
var Kr;
var xt;
var St;
var Fr;
var _t;
var nn;
var gf;
var pf;
var Gs;
var Hs;
var Ml;
var Ll = m(function(e, t, a) {
  a.x = t.x - e.x, a.y = t.y - e.y, a.len = Math.sqrt(a.x * a.x + a.y * a.y), a.nx = a.x / a.len, a.ny = a.y / a.len, a.ang = Math.atan2(a.ny, a.nx);
}, "asVec");
var jp = m(function(e, t) {
  t.x = e.x * -1, t.y = e.y * -1, t.nx = e.nx * -1, t.ny = e.ny * -1, t.ang = e.ang > 0 ? -(Math.PI - e.ang) : Math.PI + e.ang;
}, "invertVec");
var ey = m(function(e, t, a, n, i) {
  if (e !== Ml ? Ll(t, e, qr) : jp(Ar, qr), Ll(t, a, Ar), Al = qr.nx * Ar.ny - qr.ny * Ar.nx, Rl = qr.nx * Ar.nx - qr.ny * -Ar.ny, Kr = Math.asin(Math.max(-1, Math.min(1, Al))), Math.abs(Kr) < 1e-6) {
    qs = t.x, _s = t.y, St = _t = 0;
    return;
  }
  Dt = 1, pn = false, Rl < 0 ? Kr < 0 ? Kr = Math.PI + Kr : (Kr = Math.PI - Kr, Dt = -1, pn = true) : Kr > 0 && (Dt = -1, pn = true), t.radius !== void 0 ? _t = t.radius : _t = n, xt = Kr / 2, nn = Math.min(qr.len / 2, Ar.len / 2), i ? (Fr = Math.abs(Math.cos(xt) * _t / Math.sin(xt)), Fr > nn ? (Fr = nn, St = Math.abs(Fr * Math.sin(xt) / Math.cos(xt))) : St = _t) : (Fr = Math.min(nn, _t), St = Math.abs(Fr * Math.sin(xt) / Math.cos(xt))), Gs = t.x + Ar.nx * Fr, Hs = t.y + Ar.ny * Fr, qs = Gs - Ar.ny * St * Dt, _s = Hs + Ar.nx * St * Dt, gf = t.x + qr.nx * Fr, pf = t.y + qr.ny * Fr, Ml = t;
}, "calcCornerArc");
function yf(r, e) {
  e.radius === 0 ? r.lineTo(e.cx, e.cy) : r.arc(e.cx, e.cy, e.radius, e.startAngle, e.endAngle, e.counterClockwise);
}
m(yf, "drawPreparedRoundCorner");
function yo(r, e, t, a) {
  var n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
  return a === 0 || e.radius === 0 ? { cx: e.x, cy: e.y, radius: 0, startX: e.x, startY: e.y, stopX: e.x, stopY: e.y, startAngle: void 0, endAngle: void 0, counterClockwise: void 0 } : (ey(r, e, t, a, n), { cx: qs, cy: _s, radius: St, startX: gf, startY: pf, stopX: Gs, stopY: Hs, startAngle: qr.ang + Math.PI / 2 * Dt, endAngle: Ar.ang - Math.PI / 2 * Dt, counterClockwise: pn });
}
m(yo, "getRoundCorner");
var La = 0.01;
var ry = Math.sqrt(2 * La);
var mr = {};
mr.findMidptPtsEtc = function(r, e) {
  var t = e.posPts, a = e.intersectionPts, n = e.vectorNormInverse, i, s = r.pstyle("source-endpoint"), o = r.pstyle("target-endpoint"), l = s.units != null && o.units != null, u = m(function(C, T, E, S) {
    var D = S - T, B = E - C, P = Math.sqrt(B * B + D * D);
    return { x: -D / P, y: B / P };
  }, "recalcVectorNormInverse"), f = r.pstyle("edge-distances").value;
  switch (f) {
    case "node-position":
      i = t;
      break;
    case "intersection":
      i = a;
      break;
    case "endpoints": {
      if (l) {
        var c = this.manualEndptToPx(r.source()[0], s), d = je(c, 2), g = d[0], h = d[1], m2 = this.manualEndptToPx(r.target()[0], o), p = je(m2, 2), y = p[0], b = p[1], w = { x1: g, y1: h, x2: y, y2: b };
        n = u(g, h, y, b), i = w;
      } else qe("Edge ".concat(r.id(), " has edge-distances:endpoints specified without manual endpoints specified via source-endpoint and target-endpoint.  Falling back on edge-distances:intersection (default).")), i = a;
      break;
    }
  }
  return { midptPts: i, vectorNormInverse: n };
};
mr.findHaystackPoints = function(r) {
  for (var e = 0; e < r.length; e++) {
    var t = r[e], a = t._private, n = a.rscratch;
    if (!n.haystack) {
      var i = Math.random() * 2 * Math.PI;
      n.source = { x: Math.cos(i), y: Math.sin(i) }, i = Math.random() * 2 * Math.PI, n.target = { x: Math.cos(i), y: Math.sin(i) };
    }
    var s = a.source, o = a.target, l = s.position(), u = o.position(), f = s.width(), c = o.width(), d = s.height(), g = o.height(), h = t.pstyle("haystack-radius").value, m2 = h / 2;
    n.haystackPts = n.allpts = [n.source.x * f * m2 + l.x, n.source.y * d * m2 + l.y, n.target.x * c * m2 + u.x, n.target.y * g * m2 + u.y], n.midX = (n.allpts[0] + n.allpts[2]) / 2, n.midY = (n.allpts[1] + n.allpts[3]) / 2, n.edgeType = "haystack", n.haystack = true, this.storeEdgeProjections(t), this.calculateArrowAngles(t), this.recalculateEdgeLabelProjections(t), this.calculateLabelAngles(t);
  }
};
mr.findSegmentsPoints = function(r, e) {
  var t = r._private.rscratch, a = r.pstyle("segment-weights"), n = r.pstyle("segment-distances"), i = r.pstyle("segment-radii"), s = r.pstyle("radius-type"), o = Math.min(a.pfValue.length, n.pfValue.length), l = i.pfValue[i.pfValue.length - 1], u = s.pfValue[s.pfValue.length - 1];
  t.edgeType = "segments", t.segpts = [], t.radii = [], t.isArcRadius = [];
  for (var f = 0; f < o; f++) {
    var c = a.pfValue[f], d = n.pfValue[f], g = 1 - c, h = c, m2 = this.findMidptPtsEtc(r, e), p = m2.midptPts, y = m2.vectorNormInverse, b = { x: p.x1 * g + p.x2 * h, y: p.y1 * g + p.y2 * h };
    t.segpts.push(b.x + y.x * d, b.y + y.y * d), t.radii.push(i.pfValue[f] !== void 0 ? i.pfValue[f] : l), t.isArcRadius.push((s.pfValue[f] !== void 0 ? s.pfValue[f] : u) === "arc-radius");
  }
};
mr.findLoopPoints = function(r, e, t, a) {
  var n = r._private.rscratch, i = e.dirCounts, s = e.srcPos, o = r.pstyle("control-point-distances"), l = o ? o.pfValue[0] : void 0, u = r.pstyle("loop-direction").pfValue, f = r.pstyle("loop-sweep").pfValue, c = r.pstyle("control-point-step-size").pfValue;
  n.edgeType = "self";
  var d = t, g = c;
  a && (d = 0, g = l);
  var h = u - Math.PI / 2, m2 = h - f / 2, p = h + f / 2, y = u + "_" + f;
  d = i[y] === void 0 ? i[y] = 0 : ++i[y], n.ctrlpts = [s.x + Math.cos(m2) * 1.4 * g * (d / 3 + 1), s.y + Math.sin(m2) * 1.4 * g * (d / 3 + 1), s.x + Math.cos(p) * 1.4 * g * (d / 3 + 1), s.y + Math.sin(p) * 1.4 * g * (d / 3 + 1)];
};
mr.findCompoundLoopPoints = function(r, e, t, a) {
  var n = r._private.rscratch;
  n.edgeType = "compound";
  var i = e.srcPos, s = e.tgtPos, o = e.srcW, l = e.srcH, u = e.tgtW, f = e.tgtH, c = r.pstyle("control-point-step-size").pfValue, d = r.pstyle("control-point-distances"), g = d ? d.pfValue[0] : void 0, h = t, m2 = c;
  a && (h = 0, m2 = g);
  var p = 50, y = { x: i.x - o / 2, y: i.y - l / 2 }, b = { x: s.x - u / 2, y: s.y - f / 2 }, w = { x: Math.min(y.x, b.x), y: Math.min(y.y, b.y) }, x = 0.5, C = Math.max(x, Math.log(o * La)), T = Math.max(x, Math.log(u * La));
  n.ctrlpts = [w.x, w.y - (1 + Math.pow(p, 1.12) / 100) * m2 * (h / 3 + 1) * C, w.x - (1 + Math.pow(p, 1.12) / 100) * m2 * (h / 3 + 1) * T, w.y];
};
mr.findStraightEdgePoints = function(r) {
  r._private.rscratch.edgeType = "straight";
};
mr.findBezierPoints = function(r, e, t, a, n) {
  var i = r._private.rscratch, s = r.pstyle("control-point-step-size").pfValue, o = r.pstyle("control-point-distances"), l = r.pstyle("control-point-weights"), u = o && l ? Math.min(o.value.length, l.value.length) : 1, f = o ? o.pfValue[0] : void 0, c = l.value[0], d = a;
  i.edgeType = d ? "multibezier" : "bezier", i.ctrlpts = [];
  for (var g = 0; g < u; g++) {
    var h = (0.5 - e.eles.length / 2 + t) * s * (n ? -1 : 1), m2 = void 0, p = ao(h);
    d && (f = o ? o.pfValue[g] : s, c = l.value[g]), a ? m2 = f : m2 = f !== void 0 ? p * f : void 0;
    var y = m2 !== void 0 ? m2 : h, b = 1 - c, w = c, x = this.findMidptPtsEtc(r, e), C = x.midptPts, T = x.vectorNormInverse, E = { x: C.x1 * b + C.x2 * w, y: C.y1 * b + C.y2 * w };
    i.ctrlpts.push(E.x + T.x * y, E.y + T.y * y);
  }
};
mr.findTaxiPoints = function(r, e) {
  var t = r._private.rscratch;
  t.edgeType = "segments";
  var a = "vertical", n = "horizontal", i = "leftward", s = "rightward", o = "downward", l = "upward", u = "auto", f = e.posPts, c = e.srcW, d = e.srcH, g = e.tgtW, h = e.tgtH, m2 = r.pstyle("edge-distances").value, p = m2 !== "node-position", y = r.pstyle("taxi-direction").value, b = y, w = r.pstyle("taxi-turn"), x = w.units === "%", C = w.pfValue, T = C < 0, E = r.pstyle("taxi-turn-min-distance").pfValue, S = p ? (c + g) / 2 : 0, D = p ? (d + h) / 2 : 0, B = f.x2 - f.x1, P = f.y2 - f.y1, A = m(function(k, G) {
    return k > 0 ? Math.max(k - G, 0) : Math.min(k + G, 0);
  }, "subDWH"), R = A(B, S), M = A(P, D), I = false;
  b === u ? y = Math.abs(R) > Math.abs(M) ? n : a : b === l || b === o ? (y = a, I = true) : (b === i || b === s) && (y = n, I = true);
  var O = y === a, L = O ? M : R, N = O ? P : B, q = ao(N), H = false;
  !(I && (x || T)) && (b === o && N < 0 || b === l && N > 0 || b === i && N > 0 || b === s && N < 0) && (q *= -1, L = q * Math.abs(L), H = true);
  var z;
  if (x) {
    var V = C < 0 ? 1 + C : C;
    z = V * L;
  } else {
    var K = C < 0 ? L : 0;
    z = K + C * q;
  }
  var J = m(function(k) {
    return Math.abs(k) < E || Math.abs(k) >= Math.abs(L);
  }, "getIsTooClose"), X = J(z), ee = J(Math.abs(L) - Math.abs(z)), te = X || ee;
  if (te && !H) if (O) {
    var ie = Math.abs(N) <= d / 2, j = Math.abs(B) <= g / 2;
    if (ie) {
      var F = (f.x1 + f.x2) / 2, _ = f.y1, W = f.y2;
      t.segpts = [F, _, F, W];
    } else if (j) {
      var Z = (f.y1 + f.y2) / 2, ae = f.x1, de = f.x2;
      t.segpts = [ae, Z, de, Z];
    } else t.segpts = [f.x1, f.y2];
  } else {
    var Re = Math.abs(N) <= c / 2, Te = Math.abs(P) <= h / 2;
    if (Re) {
      var xe = (f.y1 + f.y2) / 2, me = f.x1, se = f.x2;
      t.segpts = [me, xe, se, xe];
    } else if (Te) {
      var he = (f.x1 + f.x2) / 2, ge = f.y1, Ce = f.y2;
      t.segpts = [he, ge, he, Ce];
    } else t.segpts = [f.x2, f.y1];
  }
  else if (O) {
    var ye = f.y1 + z + (p ? d / 2 * q : 0), ke = f.x1, Me = f.x2;
    t.segpts = [ke, ye, Me, ye];
  } else {
    var Ne = f.x1 + z + (p ? c / 2 * q : 0), ze = f.y1, Fe = f.y2;
    t.segpts = [Ne, ze, Ne, Fe];
  }
  if (t.isRound) {
    var Ee = r.pstyle("taxi-radius").value, le = r.pstyle("radius-type").value[0] === "arc-radius";
    t.radii = new Array(t.segpts.length / 2).fill(Ee), t.isArcRadius = new Array(t.segpts.length / 2).fill(le);
  }
};
mr.tryToCorrectInvalidPoints = function(r, e) {
  var t = r._private.rscratch;
  if (t.edgeType === "bezier") {
    var a = e.srcPos, n = e.tgtPos, i = e.srcW, s = e.srcH, o = e.tgtW, l = e.tgtH, u = e.srcShape, f = e.tgtShape, c = e.srcCornerRadius, d = e.tgtCornerRadius, g = e.srcRs, h = e.tgtRs, m2 = !ne(t.startX) || !ne(t.startY), p = !ne(t.arrowStartX) || !ne(t.arrowStartY), y = !ne(t.endX) || !ne(t.endY), b = !ne(t.arrowEndX) || !ne(t.arrowEndY), w = 3, x = this.getArrowWidth(r.pstyle("width").pfValue, r.pstyle("arrow-scale").value) * this.arrowShapeWidth, C = w * x, T = At({ x: t.ctrlpts[0], y: t.ctrlpts[1] }, { x: t.startX, y: t.startY }), E = T < C, S = At({ x: t.ctrlpts[0], y: t.ctrlpts[1] }, { x: t.endX, y: t.endY }), D = S < C, B = false;
    if (m2 || p || E) {
      B = true;
      var P = { x: t.ctrlpts[0] - a.x, y: t.ctrlpts[1] - a.y }, A = Math.sqrt(P.x * P.x + P.y * P.y), R = { x: P.x / A, y: P.y / A }, M = Math.max(i, s), I = { x: t.ctrlpts[0] + R.x * 2 * M, y: t.ctrlpts[1] + R.y * 2 * M }, O = u.intersectLine(a.x, a.y, i, s, I.x, I.y, 0, c, g);
      E ? (t.ctrlpts[0] = t.ctrlpts[0] + R.x * (C - T), t.ctrlpts[1] = t.ctrlpts[1] + R.y * (C - T)) : (t.ctrlpts[0] = O[0] + R.x * C, t.ctrlpts[1] = O[1] + R.y * C);
    }
    if (y || b || D) {
      B = true;
      var L = { x: t.ctrlpts[0] - n.x, y: t.ctrlpts[1] - n.y }, N = Math.sqrt(L.x * L.x + L.y * L.y), q = { x: L.x / N, y: L.y / N }, H = Math.max(i, s), z = { x: t.ctrlpts[0] + q.x * 2 * H, y: t.ctrlpts[1] + q.y * 2 * H }, V = f.intersectLine(n.x, n.y, o, l, z.x, z.y, 0, d, h);
      D ? (t.ctrlpts[0] = t.ctrlpts[0] + q.x * (C - S), t.ctrlpts[1] = t.ctrlpts[1] + q.y * (C - S)) : (t.ctrlpts[0] = V[0] + q.x * C, t.ctrlpts[1] = V[1] + q.y * C);
    }
    B && this.findEndpoints(r);
  }
};
mr.storeAllpts = function(r) {
  var e = r._private.rscratch;
  if (e.edgeType === "multibezier" || e.edgeType === "bezier" || e.edgeType === "self" || e.edgeType === "compound") {
    e.allpts = [], e.allpts.push(e.startX, e.startY);
    for (var t = 0; t + 1 < e.ctrlpts.length; t += 2) e.allpts.push(e.ctrlpts[t], e.ctrlpts[t + 1]), t + 3 < e.ctrlpts.length && e.allpts.push((e.ctrlpts[t] + e.ctrlpts[t + 2]) / 2, (e.ctrlpts[t + 1] + e.ctrlpts[t + 3]) / 2);
    e.allpts.push(e.endX, e.endY);
    var a, n;
    e.ctrlpts.length / 2 % 2 === 0 ? (a = e.allpts.length / 2 - 1, e.midX = e.allpts[a], e.midY = e.allpts[a + 1]) : (a = e.allpts.length / 2 - 3, n = 0.5, e.midX = or(e.allpts[a], e.allpts[a + 2], e.allpts[a + 4], n), e.midY = or(e.allpts[a + 1], e.allpts[a + 3], e.allpts[a + 5], n));
  } else if (e.edgeType === "straight") e.allpts = [e.startX, e.startY, e.endX, e.endY], e.midX = (e.startX + e.endX + e.arrowStartX + e.arrowEndX) / 4, e.midY = (e.startY + e.endY + e.arrowStartY + e.arrowEndY) / 4;
  else if (e.edgeType === "segments") {
    if (e.allpts = [], e.allpts.push(e.startX, e.startY), e.allpts.push.apply(e.allpts, e.segpts), e.allpts.push(e.endX, e.endY), e.isRound) {
      e.roundCorners = [];
      for (var i = 2; i + 3 < e.allpts.length; i += 2) {
        var s = e.radii[i / 2 - 1], o = e.isArcRadius[i / 2 - 1];
        e.roundCorners.push(yo({ x: e.allpts[i - 2], y: e.allpts[i - 1] }, { x: e.allpts[i], y: e.allpts[i + 1], radius: s }, { x: e.allpts[i + 2], y: e.allpts[i + 3] }, s, o));
      }
    }
    if (e.segpts.length % 4 === 0) {
      var l = e.segpts.length / 2, u = l - 2;
      e.midX = (e.segpts[u] + e.segpts[l]) / 2, e.midY = (e.segpts[u + 1] + e.segpts[l + 1]) / 2;
    } else {
      var f = e.segpts.length / 2 - 1;
      if (!e.isRound) e.midX = e.segpts[f], e.midY = e.segpts[f + 1];
      else {
        var c = { x: e.segpts[f], y: e.segpts[f + 1] }, d = e.roundCorners[f / 2];
        if (d.radius === 0) {
          var g = { x: e.segpts[f + 2], y: e.segpts[f + 3] };
          e.midX = c.x, e.midY = c.y, e.midVector = [c.y - g.y, g.x - c.x];
        } else {
          var h = [c.x - d.cx, c.y - d.cy], m2 = d.radius / Math.sqrt(Math.pow(h[0], 2) + Math.pow(h[1], 2));
          h = h.map(function(p) {
            return p * m2;
          }), e.midX = d.cx + h[0], e.midY = d.cy + h[1], e.midVector = h;
        }
      }
    }
  }
};
mr.checkForInvalidEdgeWarning = function(r) {
  var e = r[0]._private.rscratch;
  e.nodesOverlap || ne(e.startX) && ne(e.startY) && ne(e.endX) && ne(e.endY) ? e.loggedErr = false : e.loggedErr || (e.loggedErr = true, qe("Edge `" + r.id() + "` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."));
};
mr.findEdgeControlPoints = function(r) {
  var e = this;
  if (!(!r || r.length === 0)) {
    for (var t = this, a = t.cy, n = a.hasCompoundNodes(), i = new Yr(), s = m(function(D, B) {
      return [].concat(bn(D), [B ? 1 : 0]).join("-");
    }, "getKey"), o = [], l = [], u = 0; u < r.length; u++) {
      var f = r[u], c = f._private, d = f.pstyle("curve-style").value;
      if (!(f.removed() || !f.takesUpSpace())) {
        if (d === "haystack") {
          l.push(f);
          continue;
        }
        var g = d === "unbundled-bezier" || nt(d, "segments") || d === "straight" || d === "straight-triangle" || nt(d, "taxi"), h = d === "unbundled-bezier" || d === "bezier", m2 = c.source, p = c.target, y = m2.poolIndex(), b = p.poolIndex(), w = [y, b].sort(), x = s(w, g), C = i.get(x);
        C == null && (C = { eles: [] }, o.push({ pairId: w, edgeIsUnbundled: g }), i.set(x, C)), C.eles.push(f), g && (C.hasUnbundled = true), h && (C.hasBezier = true);
      }
    }
    for (var T = m(function() {
      var D = o[E], B = D.pairId, P = D.edgeIsUnbundled, A = s(B, P), R = i.get(A), M;
      if (!R.hasUnbundled) {
        var I = R.eles[0].parallelEdges().filter(function(le) {
          return le.isBundledBezier();
        });
        ro(R.eles), I.forEach(function(le) {
          return R.eles.push(le);
        }), R.eles.sort(function(le, Y) {
          return le.poolIndex() - Y.poolIndex();
        });
      }
      var O = R.eles[0], L = O.source(), N = O.target();
      if (L.poolIndex() > N.poolIndex()) {
        var q = L;
        L = N, N = q;
      }
      var H = R.srcPos = L.position(), z = R.tgtPos = N.position(), V = R.srcW = L.outerWidth(), K = R.srcH = L.outerHeight(), J = R.tgtW = N.outerWidth(), X = R.tgtH = N.outerHeight(), ee = R.srcShape = t.nodeShapes[e.getNodeShape(L)], te = R.tgtShape = t.nodeShapes[e.getNodeShape(N)], ie = R.srcCornerRadius = L.pstyle("corner-radius").value === "auto" ? "auto" : L.pstyle("corner-radius").pfValue, j = R.tgtCornerRadius = N.pstyle("corner-radius").value === "auto" ? "auto" : N.pstyle("corner-radius").pfValue, F = R.tgtRs = N._private.rscratch, _ = R.srcRs = L._private.rscratch;
      R.dirCounts = { north: 0, west: 0, south: 0, east: 0, northwest: 0, southwest: 0, northeast: 0, southeast: 0 };
      for (var W = 0; W < R.eles.length; W++) {
        var Z = R.eles[W], ae = Z[0]._private.rscratch, de = Z.pstyle("curve-style").value, Re = de === "unbundled-bezier" || nt(de, "segments") || nt(de, "taxi"), Te = !L.same(Z.source());
        if (!R.calculatedIntersection && L !== N && (R.hasBezier || R.hasUnbundled)) {
          R.calculatedIntersection = true;
          var xe = ee.intersectLine(H.x, H.y, V, K, z.x, z.y, 0, ie, _), me = R.srcIntn = xe, se = te.intersectLine(z.x, z.y, J, X, H.x, H.y, 0, j, F), he = R.tgtIntn = se, ge = R.intersectionPts = { x1: xe[0], x2: se[0], y1: xe[1], y2: se[1] }, Ce = R.posPts = { x1: H.x, x2: z.x, y1: H.y, y2: z.y }, ye = se[1] - xe[1], ke = se[0] - xe[0], Me = Math.sqrt(ke * ke + ye * ye);
          ne(Me) && Me >= ry || (Me = Math.sqrt(Math.max(ke * ke, La) + Math.max(ye * ye, La)));
          var Ne = R.vector = { x: ke, y: ye }, ze = R.vectorNorm = { x: Ne.x / Me, y: Ne.y / Me }, Fe = { x: -ze.y, y: ze.x };
          R.nodesOverlap = !ne(Me) || te.checkPoint(xe[0], xe[1], 0, J, X, z.x, z.y, j, F) || ee.checkPoint(se[0], se[1], 0, V, K, H.x, H.y, ie, _), R.vectorNormInverse = Fe, M = { nodesOverlap: R.nodesOverlap, dirCounts: R.dirCounts, calculatedIntersection: true, hasBezier: R.hasBezier, hasUnbundled: R.hasUnbundled, eles: R.eles, srcPos: z, srcRs: F, tgtPos: H, tgtRs: _, srcW: J, srcH: X, tgtW: V, tgtH: K, srcIntn: he, tgtIntn: me, srcShape: te, tgtShape: ee, posPts: { x1: Ce.x2, y1: Ce.y2, x2: Ce.x1, y2: Ce.y1 }, intersectionPts: { x1: ge.x2, y1: ge.y2, x2: ge.x1, y2: ge.y1 }, vector: { x: -Ne.x, y: -Ne.y }, vectorNorm: { x: -ze.x, y: -ze.y }, vectorNormInverse: { x: -Fe.x, y: -Fe.y } };
        }
        var Ee = Te ? M : R;
        ae.nodesOverlap = Ee.nodesOverlap, ae.srcIntn = Ee.srcIntn, ae.tgtIntn = Ee.tgtIntn, ae.isRound = de.startsWith("round"), n && (L.isParent() || L.isChild() || N.isParent() || N.isChild()) && (L.parents().anySame(N) || N.parents().anySame(L) || L.same(N) && L.isParent()) ? e.findCompoundLoopPoints(Z, Ee, W, Re) : L === N ? e.findLoopPoints(Z, Ee, W, Re) : de.endsWith("segments") ? e.findSegmentsPoints(Z, Ee) : de.endsWith("taxi") ? e.findTaxiPoints(Z, Ee) : de === "straight" || !Re && R.eles.length % 2 === 1 && W === Math.floor(R.eles.length / 2) ? e.findStraightEdgePoints(Z) : e.findBezierPoints(Z, Ee, W, Re, Te), e.findEndpoints(Z), e.tryToCorrectInvalidPoints(Z, Ee), e.checkForInvalidEdgeWarning(Z), e.storeAllpts(Z), e.storeEdgeProjections(Z), e.calculateArrowAngles(Z), e.recalculateEdgeLabelProjections(Z), e.calculateLabelAngles(Z);
      }
    }, "_loop"), E = 0; E < o.length; E++) T();
    this.findHaystackPoints(l);
  }
};
function mf(r) {
  var e = [];
  if (r != null) {
    for (var t = 0; t < r.length; t += 2) {
      var a = r[t], n = r[t + 1];
      e.push({ x: a, y: n });
    }
    return e;
  }
}
m(mf, "getPts");
mr.getSegmentPoints = function(r) {
  var e = r[0]._private.rscratch;
  this.recalculateRenderedStyle(r);
  var t = e.edgeType;
  if (t === "segments") return mf(e.segpts);
};
mr.getControlPoints = function(r) {
  var e = r[0]._private.rscratch;
  this.recalculateRenderedStyle(r);
  var t = e.edgeType;
  if (t === "bezier" || t === "multibezier" || t === "self" || t === "compound") return mf(e.ctrlpts);
};
mr.getEdgeMidpoint = function(r) {
  var e = r[0]._private.rscratch;
  return this.recalculateRenderedStyle(r), { x: e.midX, y: e.midY };
};
var Ha = {};
Ha.manualEndptToPx = function(r, e) {
  var t = this, a = r.position(), n = r.outerWidth(), i = r.outerHeight(), s = r._private.rscratch;
  if (e.value.length === 2) {
    var o = [e.pfValue[0], e.pfValue[1]];
    return e.units[0] === "%" && (o[0] = o[0] * n), e.units[1] === "%" && (o[1] = o[1] * i), o[0] += a.x, o[1] += a.y, o;
  } else {
    var l = e.pfValue[0];
    l = -Math.PI / 2 + l;
    var u = 2 * Math.max(n, i), f = [a.x + Math.cos(l) * u, a.y + Math.sin(l) * u];
    return t.nodeShapes[this.getNodeShape(r)].intersectLine(a.x, a.y, n, i, f[0], f[1], 0, r.pstyle("corner-radius").value === "auto" ? "auto" : r.pstyle("corner-radius").pfValue, s);
  }
};
Ha.findEndpoints = function(r) {
  var e, t, a, n, i = this, s, o = r.source()[0], l = r.target()[0], u = o.position(), f = l.position(), c = r.pstyle("target-arrow-shape").value, d = r.pstyle("source-arrow-shape").value, g = r.pstyle("target-distance-from-node").pfValue, h = r.pstyle("source-distance-from-node").pfValue, m2 = o._private.rscratch, p = l._private.rscratch, y = r.pstyle("curve-style").value, b = r._private.rscratch, w = b.edgeType, x = nt(y, "taxi"), C = w === "self" || w === "compound", T = w === "bezier" || w === "multibezier" || C, E = w !== "bezier", S = w === "straight" || w === "segments", D = w === "segments", B = T || E || S, P = C || x, A = r.pstyle("source-endpoint"), R = P ? "outside-to-node" : A.value, M = o.pstyle("corner-radius").value === "auto" ? "auto" : o.pstyle("corner-radius").pfValue, I = r.pstyle("target-endpoint"), O = P ? "outside-to-node" : I.value, L = l.pstyle("corner-radius").value === "auto" ? "auto" : l.pstyle("corner-radius").pfValue;
  b.srcManEndpt = A, b.tgtManEndpt = I;
  var N, q, H, z, V = (e = (I == null || (t = I.pfValue) === null || t === void 0 ? void 0 : t.length) === 2 ? I.pfValue : null) !== null && e !== void 0 ? e : [0, 0], K = (a = (A == null || (n = A.pfValue) === null || n === void 0 ? void 0 : n.length) === 2 ? A.pfValue : null) !== null && a !== void 0 ? a : [0, 0];
  if (T) {
    var J = [b.ctrlpts[0], b.ctrlpts[1]], X = E ? [b.ctrlpts[b.ctrlpts.length - 2], b.ctrlpts[b.ctrlpts.length - 1]] : J;
    N = X, q = J;
  } else if (S) {
    var ee = D ? b.segpts.slice(0, 2) : [f.x + V[0], f.y + V[1]], te = D ? b.segpts.slice(b.segpts.length - 2) : [u.x + K[0], u.y + K[1]];
    N = te, q = ee;
  }
  if (O === "inside-to-node") s = [f.x, f.y];
  else if (I.units) s = this.manualEndptToPx(l, I);
  else if (O === "outside-to-line") s = b.tgtIntn;
  else if (O === "outside-to-node" || O === "outside-to-node-or-label" ? H = N : (O === "outside-to-line" || O === "outside-to-line-or-label") && (H = [u.x, u.y]), s = i.nodeShapes[this.getNodeShape(l)].intersectLine(f.x, f.y, l.outerWidth(), l.outerHeight(), H[0], H[1], 0, L, p), O === "outside-to-node-or-label" || O === "outside-to-line-or-label") {
    var ie = l._private.rscratch, j = ie.labelWidth, F = ie.labelHeight, _ = ie.labelX, W = ie.labelY, Z = j / 2, ae = F / 2, de = l.pstyle("text-valign").value;
    de === "top" ? W -= ae : de === "bottom" && (W += ae);
    var Re = l.pstyle("text-halign").value;
    Re === "left" ? _ -= Z : Re === "right" && (_ += Z);
    var Te = Ba(H[0], H[1], [_ - Z, W - ae, _ + Z, W - ae, _ + Z, W + ae, _ - Z, W + ae], f.x, f.y);
    if (Te.length > 0) {
      var xe = u, me = Tt(xe, $t(s)), se = Tt(xe, $t(Te)), he = me;
      if (se < me && (s = Te, he = se), Te.length > 2) {
        var ge = Tt(xe, { x: Te[2], y: Te[3] });
        ge < he && (s = [Te[2], Te[3]]);
      }
    }
  }
  var Ce = Qa(s, N, i.arrowShapes[c].spacing(r) + g), ye = Qa(s, N, i.arrowShapes[c].gap(r) + g);
  if (b.endX = ye[0], b.endY = ye[1], b.arrowEndX = Ce[0], b.arrowEndY = Ce[1], R === "inside-to-node") s = [u.x, u.y];
  else if (A.units) s = this.manualEndptToPx(o, A);
  else if (R === "outside-to-line") s = b.srcIntn;
  else if (R === "outside-to-node" || R === "outside-to-node-or-label" ? z = q : (R === "outside-to-line" || R === "outside-to-line-or-label") && (z = [f.x, f.y]), s = i.nodeShapes[this.getNodeShape(o)].intersectLine(u.x, u.y, o.outerWidth(), o.outerHeight(), z[0], z[1], 0, M, m2), R === "outside-to-node-or-label" || R === "outside-to-line-or-label") {
    var ke = o._private.rscratch, Me = ke.labelWidth, Ne = ke.labelHeight, ze = ke.labelX, Fe = ke.labelY, Ee = Me / 2, le = Ne / 2, Y = o.pstyle("text-valign").value;
    Y === "top" ? Fe -= le : Y === "bottom" && (Fe += le);
    var k = o.pstyle("text-halign").value;
    k === "left" ? ze -= Ee : k === "right" && (ze += Ee);
    var G = Ba(z[0], z[1], [ze - Ee, Fe - le, ze + Ee, Fe - le, ze + Ee, Fe + le, ze - Ee, Fe + le], u.x, u.y);
    if (G.length > 0) {
      var $ = f, U = Tt($, $t(s)), Q = Tt($, $t(G)), ue = U;
      if (Q < U && (s = [G[0], G[1]], ue = Q), G.length > 2) {
        var re = Tt($, { x: G[2], y: G[3] });
        re < ue && (s = [G[2], G[3]]);
      }
    }
  }
  var fe = Qa(s, q, i.arrowShapes[d].spacing(r) + h), ve = Qa(s, q, i.arrowShapes[d].gap(r) + h);
  b.startX = ve[0], b.startY = ve[1], b.arrowStartX = fe[0], b.arrowStartY = fe[1], B && (!ne(b.startX) || !ne(b.startY) || !ne(b.endX) || !ne(b.endY) ? b.badLine = true : b.badLine = false);
};
Ha.getSourceEndpoint = function(r) {
  var e = r[0]._private.rscratch;
  switch (this.recalculateRenderedStyle(r), e.edgeType) {
    case "haystack":
      return { x: e.haystackPts[0], y: e.haystackPts[1] };
    default:
      return { x: e.arrowStartX, y: e.arrowStartY };
  }
};
Ha.getTargetEndpoint = function(r) {
  var e = r[0]._private.rscratch;
  switch (this.recalculateRenderedStyle(r), e.edgeType) {
    case "haystack":
      return { x: e.haystackPts[2], y: e.haystackPts[3] };
    default:
      return { x: e.arrowEndX, y: e.arrowEndY };
  }
};
var mo = {};
function ty(r, e, t) {
  for (var a = m(function(u, f, c, d) {
    return or(u, f, c, d);
  }, "qbezierAt$1"), n = e._private, i = n.rstyle.bezierPts, s = 0; s < r.bezierProjPcts.length; s++) {
    var o = r.bezierProjPcts[s];
    i.push({ x: a(t[0], t[2], t[4], o), y: a(t[1], t[3], t[5], o) });
  }
}
m(ty, "pushBezierPts");
mo.storeEdgeProjections = function(r) {
  var e = r._private, t = e.rscratch, a = t.edgeType;
  if (e.rstyle.bezierPts = null, e.rstyle.linePts = null, e.rstyle.haystackPts = null, a === "multibezier" || a === "bezier" || a === "self" || a === "compound") {
    e.rstyle.bezierPts = [];
    for (var n = 0; n + 5 < t.allpts.length; n += 4) ty(this, r, t.allpts.slice(n, n + 6));
  } else if (a === "segments") for (var i = e.rstyle.linePts = [], n = 0; n + 1 < t.allpts.length; n += 2) i.push({ x: t.allpts[n], y: t.allpts[n + 1] });
  else if (a === "haystack") {
    var s = t.haystackPts;
    e.rstyle.haystackPts = [{ x: s[0], y: s[1] }, { x: s[2], y: s[3] }];
  }
  e.rstyle.arrowWidth = this.getArrowWidth(r.pstyle("width").pfValue, r.pstyle("arrow-scale").value) * this.arrowShapeWidth;
};
mo.recalculateEdgeProjections = function(r) {
  this.findEdgeControlPoints(r);
};
var Hr = {};
Hr.recalculateNodeLabelProjection = function(r) {
  var e = r.pstyle("label").strValue;
  if (!lt(e)) {
    var t, a, n = r._private, i = r.width(), s = r.height(), o = r.padding(), l = r.position(), u = r.pstyle("text-halign").strValue, f = r.pstyle("text-valign").strValue, c = n.rscratch, d = n.rstyle;
    switch (u) {
      case "left":
        t = l.x - i / 2 - o;
        break;
      case "right":
        t = l.x + i / 2 + o;
        break;
      default:
        t = l.x;
    }
    switch (f) {
      case "top":
        a = l.y - s / 2 - o;
        break;
      case "bottom":
        a = l.y + s / 2 + o;
        break;
      default:
        a = l.y;
    }
    c.labelX = t, c.labelY = a, d.labelX = t, d.labelY = a, this.calculateLabelAngles(r), this.applyLabelDimensions(r);
  }
};
var bf = m(function(e, t) {
  var a = Math.atan(t / e);
  return e === 0 && a < 0 && (a = a * -1), a;
}, "lineAngleFromDelta");
var wf = m(function(e, t) {
  var a = t.x - e.x, n = t.y - e.y;
  return bf(a, n);
}, "lineAngle");
var ay = m(function(e, t, a, n) {
  var i = Da(0, n - 1e-3, 1), s = Da(0, n + 1e-3, 1), o = Xt(e, t, a, i), l = Xt(e, t, a, s);
  return wf(o, l);
}, "bezierAngle");
Hr.recalculateEdgeLabelProjections = function(r) {
  var e, t = r._private, a = t.rscratch, n = this, i = { mid: r.pstyle("label").strValue, source: r.pstyle("source-label").strValue, target: r.pstyle("target-label").strValue };
  if (i.mid || i.source || i.target) {
    e = { x: a.midX, y: a.midY };
    var s = m(function(c, d, g) {
      Xr(t.rscratch, c, d, g), Xr(t.rstyle, c, d, g);
    }, "setRs");
    s("labelX", null, e.x), s("labelY", null, e.y);
    var o = bf(a.midDispX, a.midDispY);
    s("labelAutoAngle", null, o);
    var l = m(function() {
      if (l.cache) return l.cache;
      for (var c = [], d = 0; d + 5 < a.allpts.length; d += 4) {
        var g = { x: a.allpts[d], y: a.allpts[d + 1] }, h = { x: a.allpts[d + 2], y: a.allpts[d + 3] }, m2 = { x: a.allpts[d + 4], y: a.allpts[d + 5] };
        c.push({ p0: g, p1: h, p2: m2, startDist: 0, length: 0, segments: [] });
      }
      var p = t.rstyle.bezierPts, y = n.bezierProjPcts.length;
      function b(E, S, D, B, P) {
        var A = At(S, D), R = E.segments[E.segments.length - 1], M = { p0: S, p1: D, t0: B, t1: P, startDist: R ? R.startDist + R.length : 0, length: A };
        E.segments.push(M), E.length += A;
      }
      m(b, "addSegment");
      for (var w = 0; w < c.length; w++) {
        var x = c[w], C = c[w - 1];
        C && (x.startDist = C.startDist + C.length), b(x, x.p0, p[w * y], 0, n.bezierProjPcts[0]);
        for (var T = 0; T < y - 1; T++) b(x, p[w * y + T], p[w * y + T + 1], n.bezierProjPcts[T], n.bezierProjPcts[T + 1]);
        b(x, p[w * y + y - 1], x.p2, n.bezierProjPcts[y - 1], 1);
      }
      return l.cache = c;
    }, "createControlPointInfo"), u = m(function(c) {
      var d, g = c === "source";
      if (i[c]) {
        var h = r.pstyle(c + "-text-offset").pfValue;
        switch (a.edgeType) {
          case "self":
          case "compound":
          case "bezier":
          case "multibezier": {
            for (var m2 = l(), p, y = 0, b = 0, w = 0; w < m2.length; w++) {
              for (var x = m2[g ? w : m2.length - 1 - w], C = 0; C < x.segments.length; C++) {
                var T = x.segments[g ? C : x.segments.length - 1 - C], E = w === m2.length - 1 && C === x.segments.length - 1;
                if (y = b, b += T.length, b >= h || E) {
                  p = { cp: x, segment: T };
                  break;
                }
              }
              if (p) break;
            }
            var S = p.cp, D = p.segment, B = (h - y) / D.length, P = D.t1 - D.t0, A = g ? D.t0 + P * B : D.t1 - P * B;
            A = Da(0, A, 1), e = Xt(S.p0, S.p1, S.p2, A), d = ay(S.p0, S.p1, S.p2, A);
            break;
          }
          case "straight":
          case "segments":
          case "haystack": {
            for (var R = 0, M, I, O, L, N = a.allpts.length, q = 0; q + 3 < N && (g ? (O = { x: a.allpts[q], y: a.allpts[q + 1] }, L = { x: a.allpts[q + 2], y: a.allpts[q + 3] }) : (O = { x: a.allpts[N - 2 - q], y: a.allpts[N - 1 - q] }, L = { x: a.allpts[N - 4 - q], y: a.allpts[N - 3 - q] }), M = At(O, L), I = R, R += M, !(R >= h)); q += 2) ;
            var H = h - I, z = H / M;
            z = Da(0, z, 1), e = Sd(O, L, z), d = wf(O, L);
            break;
          }
        }
        s("labelX", c, e.x), s("labelY", c, e.y), s("labelAutoAngle", c, d);
      }
    }, "calculateEndProjection");
    u("source"), u("target"), this.applyLabelDimensions(r);
  }
};
Hr.applyLabelDimensions = function(r) {
  this.applyPrefixedLabelDimensions(r), r.isEdge() && (this.applyPrefixedLabelDimensions(r, "source"), this.applyPrefixedLabelDimensions(r, "target"));
};
Hr.applyPrefixedLabelDimensions = function(r, e) {
  var t = r._private, a = this.getLabelText(r, e), n = Pt(a, r._private.labelDimsKey);
  if (Sr(t.rscratch, "prefixedLabelDimsKey", e) !== n) {
    Xr(t.rscratch, "prefixedLabelDimsKey", e, n);
    var i = this.calculateLabelDimensions(r, a), s = r.pstyle("line-height").pfValue, o = r.pstyle("text-wrap").strValue, l = Sr(t.rscratch, "labelWrapCachedLines", e) || [], u = o !== "wrap" ? 1 : Math.max(l.length, 1), f = i.height / u, c = f * s, d = i.width, g = i.height + (u - 1) * (s - 1) * f;
    Xr(t.rstyle, "labelWidth", e, d), Xr(t.rscratch, "labelWidth", e, d), Xr(t.rstyle, "labelHeight", e, g), Xr(t.rscratch, "labelHeight", e, g), Xr(t.rscratch, "labelLineHeight", e, c);
  }
};
Hr.getLabelText = function(r, e) {
  var t = r._private, a = e ? e + "-" : "", n = r.pstyle(a + "label").strValue, i = r.pstyle("text-transform").value, s = m(function(K, J) {
    return J ? (Xr(t.rscratch, K, e, J), J) : Sr(t.rscratch, K, e);
  }, "rscratch");
  if (!n) return "";
  i == "none" || (i == "uppercase" ? n = n.toUpperCase() : i == "lowercase" && (n = n.toLowerCase()));
  var o = r.pstyle("text-wrap").value;
  if (o === "wrap") {
    var l = s("labelKey");
    if (l != null && s("labelWrapKey") === l) return s("labelWrapCachedText");
    for (var u = "​", f = n.split(`
`), c = r.pstyle("text-max-width").pfValue, d = r.pstyle("text-overflow-wrap").value, g = d === "anywhere", h = [], m2 = /[\s\u200b]+|$/g, p = 0; p < f.length; p++) {
      var y = f[p], b = this.calculateLabelDimensions(r, y), w = b.width;
      if (g) {
        var x = y.split("").join(u);
        y = x;
      }
      if (w > c) {
        var C = y.matchAll(m2), T = "", E = 0, S = Dr(C), D;
        try {
          for (S.s(); !(D = S.n()).done; ) {
            var B = D.value, P = B[0], A = y.substring(E, B.index);
            E = B.index + P.length;
            var R = T.length === 0 ? A : T + A + P, M = this.calculateLabelDimensions(r, R), I = M.width;
            I <= c ? T += A + P : (T && h.push(T), T = A + P);
          }
        } catch (V) {
          S.e(V);
        } finally {
          S.f();
        }
        T.match(/^[\s\u200b]+$/) || h.push(T);
      } else h.push(y);
    }
    s("labelWrapCachedLines", h), n = s("labelWrapCachedText", h.join(`
`)), s("labelWrapKey", l);
  } else if (o === "ellipsis") {
    var O = r.pstyle("text-max-width").pfValue, L = "", N = "…", q = false;
    if (this.calculateLabelDimensions(r, n).width < O) return n;
    for (var H = 0; H < n.length; H++) {
      var z = this.calculateLabelDimensions(r, L + n[H] + N).width;
      if (z > O) break;
      L += n[H], H === n.length - 1 && (q = true);
    }
    return q || (L += N), L;
  }
  return n;
};
Hr.getLabelJustification = function(r) {
  var e = r.pstyle("text-justification").strValue, t = r.pstyle("text-halign").strValue;
  if (e === "auto") if (r.isNode()) switch (t) {
    case "left":
      return "right";
    case "right":
      return "left";
    default:
      return "center";
  }
  else return "center";
  else return e;
};
Hr.calculateLabelDimensions = function(r, e) {
  var t = this, a = t.cy.window(), n = a.document, i = 0, s = r.pstyle("font-style").strValue, o = r.pstyle("font-size").pfValue, l = r.pstyle("font-family").strValue, u = r.pstyle("font-weight").strValue, f = this.labelCalcCanvas, c = this.labelCalcCanvasContext;
  if (!f) {
    f = this.labelCalcCanvas = n.createElement("canvas"), c = this.labelCalcCanvasContext = f.getContext("2d");
    var d = f.style;
    d.position = "absolute", d.left = "-9999px", d.top = "-9999px", d.zIndex = "-1", d.visibility = "hidden", d.pointerEvents = "none";
  }
  c.font = "".concat(s, " ").concat(u, " ").concat(o, "px ").concat(l);
  for (var g = 0, h = 0, m2 = e.split(`
`), p = 0; p < m2.length; p++) {
    var y = m2[p], b = c.measureText(y), w = Math.ceil(b.width), x = o;
    g = Math.max(w, g), h += x;
  }
  return g += i, h += i, { width: g, height: h };
};
Hr.calculateLabelAngle = function(r, e) {
  var t = r._private, a = t.rscratch, n = r.isEdge(), i = e ? e + "-" : "", s = r.pstyle(i + "text-rotation"), o = s.strValue;
  return o === "none" ? 0 : n && o === "autorotate" ? a.labelAutoAngle : o === "autorotate" ? 0 : s.pfValue;
};
Hr.calculateLabelAngles = function(r) {
  var e = this, t = r.isEdge(), a = r._private, n = a.rscratch;
  n.labelAngle = e.calculateLabelAngle(r), t && (n.sourceLabelAngle = e.calculateLabelAngle(r, "source"), n.targetLabelAngle = e.calculateLabelAngle(r, "target"));
};
var xf = {};
var Il = 28;
var Ol = false;
xf.getNodeShape = function(r) {
  var e = this, t = r.pstyle("shape").value;
  if (t === "cutrectangle" && (r.width() < Il || r.height() < Il)) return Ol || (qe("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"), Ol = true), "rectangle";
  if (r.isParent()) return t === "rectangle" || t === "roundrectangle" || t === "round-rectangle" || t === "cutrectangle" || t === "cut-rectangle" || t === "barrel" ? t : "rectangle";
  if (t === "polygon") {
    var a = r.pstyle("shape-polygon-points").value;
    return e.nodeShapes.makePolygon(a).name;
  }
  return t;
};
var Yn = {};
Yn.registerCalculationListeners = function() {
  var r = this.cy, e = r.collection(), t = this, a = m(function(s) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (e.merge(s), o) for (var l = 0; l < s.length; l++) {
      var u = s[l], f = u._private, c = f.rstyle;
      c.clean = false, c.cleanConnected = false;
    }
  }, "enqueue");
  t.binder(r).on("bounds.* dirty.*", m(function(s) {
    var o = s.target;
    a(o);
  }, "onDirtyBounds")).on("style.* background.*", m(function(s) {
    var o = s.target;
    a(o, false);
  }, "onDirtyStyle"));
  var n = m(function(s) {
    if (s) {
      var o = t.onUpdateEleCalcsFns;
      e.cleanStyle();
      for (var l = 0; l < e.length; l++) {
        var u = e[l], f = u._private.rstyle;
        u.isNode() && !f.cleanConnected && (a(u.connectedEdges()), f.cleanConnected = true);
      }
      if (o) for (var c = 0; c < o.length; c++) {
        var d = o[c];
        d(s, e);
      }
      t.recalculateRenderedStyle(e), e = r.collection();
    }
  }, "updateEleCalcs");
  t.flushRenderedStyleQueue = function() {
    n(true);
  }, t.beforeRender(n, t.beforeRenderPriorities.eleCalcs);
};
Yn.onUpdateEleCalcs = function(r) {
  var e = this.onUpdateEleCalcsFns = this.onUpdateEleCalcsFns || [];
  e.push(r);
};
Yn.recalculateRenderedStyle = function(r, e) {
  var t = m(function(x) {
    return x._private.rstyle.cleanConnected;
  }, "isCleanConnected");
  if (r.length !== 0) {
    var a = [], n = [];
    if (!this.destroyed) {
      e === void 0 && (e = true);
      for (var i = 0; i < r.length; i++) {
        var s = r[i], o = s._private, l = o.rstyle;
        s.isEdge() && (!t(s.source()) || !t(s.target())) && (l.clean = false), s.isEdge() && s.isBundledBezier() && s.parallelEdges().some(function(w) {
          return !w._private.rstyle.clean && w.isBundledBezier();
        }) && (l.clean = false), !(e && l.clean || s.removed()) && s.pstyle("display").value !== "none" && (o.group === "nodes" ? n.push(s) : a.push(s), l.clean = true);
      }
      for (var u = 0; u < n.length; u++) {
        var f = n[u], c = f._private, d = c.rstyle, g = f.position();
        this.recalculateNodeLabelProjection(f), d.nodeX = g.x, d.nodeY = g.y, d.nodeW = f.pstyle("width").pfValue, d.nodeH = f.pstyle("height").pfValue;
      }
      this.recalculateEdgeProjections(a);
      for (var h = 0; h < a.length; h++) {
        var m2 = a[h], p = m2._private, y = p.rstyle, b = p.rscratch;
        y.srcX = b.arrowStartX, y.srcY = b.arrowStartY, y.tgtX = b.arrowEndX, y.tgtY = b.arrowEndY, y.midX = b.midX, y.midY = b.midY, y.labelAngle = b.labelAngle, y.sourceLabelAngle = b.sourceLabelAngle, y.targetLabelAngle = b.targetLabelAngle;
      }
    }
  }
};
var Zn = {};
Zn.updateCachedGrabbedEles = function() {
  var r = this.cachedZSortedEles;
  if (r) {
    r.drag = [], r.nondrag = [];
    for (var e = [], t = 0; t < r.length; t++) {
      var a = r[t], n = a._private.rscratch;
      a.grabbed() && !a.isParent() ? e.push(a) : n.inDragLayer ? r.drag.push(a) : r.nondrag.push(a);
    }
    for (var t = 0; t < e.length; t++) {
      var a = e[t];
      r.drag.push(a);
    }
  }
};
Zn.invalidateCachedZSortedEles = function() {
  this.cachedZSortedEles = null;
};
Zn.getCachedZSortedEles = function(r) {
  if (r || !this.cachedZSortedEles) {
    var e = this.cy.mutableElements().toArray();
    e.sort(rf), e.interactive = e.filter(function(t) {
      return t.interactive();
    }), this.cachedZSortedEles = e, this.updateCachedGrabbedEles();
  } else e = this.cachedZSortedEles;
  return e;
};
var Ef = {};
[It, Pn, mr, Ha, mo, Hr, xf, Yn, Zn].forEach(function(r) {
  we(Ef, r);
});
var Cf = {};
Cf.getCachedImage = function(r, e, t) {
  var a = this, n = a.imageCache = a.imageCache || {}, i = n[r];
  if (i) return i.image.complete || i.image.addEventListener("load", t), i.image;
  i = n[r] = n[r] || {};
  var s = i.image = new Image();
  s.addEventListener("load", t), s.addEventListener("error", function() {
    s.error = true;
  });
  var o = "data:", l = r.substring(0, o.length).toLowerCase() === o;
  return l || (e = e === "null" ? null : e, s.crossOrigin = e), s.src = r, s;
};
var sa = {};
sa.registerBinding = function(r, e, t, a) {
  var n = Array.prototype.slice.apply(arguments, [1]);
  if (Array.isArray(r)) {
    for (var i = [], s = 0; s < r.length; s++) {
      var o = r[s];
      if (o !== void 0) {
        var l = this.binder(o);
        i.push(l.on.apply(l, n));
      }
    }
    return i;
  }
  var l = this.binder(r);
  return l.on.apply(l, n);
};
sa.binder = function(r) {
  var e = this, t = e.cy.window(), a = r === t || r === t.document || r === t.document.body || gc(r);
  if (e.supportsPassiveEvents == null) {
    var n = false;
    try {
      var i = Object.defineProperty({}, "passive", { get: m(function() {
        return n = true, true;
      }, "get") });
      t.addEventListener("test", null, i);
    } catch {
    }
    e.supportsPassiveEvents = n;
  }
  var s = m(function(l, u, f) {
    var c = Array.prototype.slice.call(arguments);
    return a && e.supportsPassiveEvents && (c[2] = { capture: f ?? false, passive: false, once: false }), e.bindings.push({ target: r, args: c }), (r.addEventListener || r.on).apply(r, c), this;
  }, "on");
  return { on: s, addEventListener: s, addListener: s, bind: s };
};
sa.nodeIsDraggable = function(r) {
  return r && r.isNode() && !r.locked() && r.grabbable();
};
sa.nodeIsGrabbable = function(r) {
  return this.nodeIsDraggable(r) && r.interactive();
};
sa.load = function() {
  var r = this, e = r.cy.window(), t = m(function(k) {
    return k.selected();
  }, "isSelected"), a = m(function(k) {
    var G = k.getRootNode();
    if (G && G.nodeType === 11 && G.host !== void 0) return G;
  }, "getShadowRoot"), n = m(function(k, G, $, U) {
    k == null && (k = r.cy);
    for (var Q = 0; Q < G.length; Q++) {
      var ue = G[Q];
      k.emit({ originalEvent: $, type: ue, position: U });
    }
  }, "triggerEvents"), i = m(function(k) {
    return k.shiftKey || k.metaKey || k.ctrlKey;
  }, "isMultSelKeyDown"), s = m(function(k, G) {
    var $ = true;
    if (r.cy.hasCompoundNodes() && k && k.pannable()) for (var U = 0; G && U < G.length; U++) {
      var k = G[U];
      if (k.isNode() && k.isParent() && !k.pannable()) {
        $ = false;
        break;
      }
    }
    else $ = true;
    return $;
  }, "allowPanningPassthrough"), o = m(function(k) {
    k[0]._private.grabbed = true;
  }, "setGrabbed"), l = m(function(k) {
    k[0]._private.grabbed = false;
  }, "setFreed"), u = m(function(k) {
    k[0]._private.rscratch.inDragLayer = true;
  }, "setInDragLayer"), f = m(function(k) {
    k[0]._private.rscratch.inDragLayer = false;
  }, "setOutDragLayer"), c = m(function(k) {
    k[0]._private.rscratch.isGrabTarget = true;
  }, "setGrabTarget"), d = m(function(k) {
    k[0]._private.rscratch.isGrabTarget = false;
  }, "removeGrabTarget"), g = m(function(k, G) {
    var $ = G.addToList, U = $.has(k);
    !U && k.grabbable() && !k.locked() && ($.merge(k), o(k));
  }, "addToDragList"), h = m(function(k, G) {
    if (k.cy().hasCompoundNodes() && !(G.inDragLayer == null && G.addToList == null)) {
      var $ = k.descendants();
      G.inDragLayer && ($.forEach(u), $.connectedEdges().forEach(u)), G.addToList && g($, G);
    }
  }, "addDescendantsToDrag"), m2 = m(function(k, G) {
    G = G || {};
    var $ = k.cy().hasCompoundNodes();
    G.inDragLayer && (k.forEach(u), k.neighborhood().stdFilter(function(U) {
      return !$ || U.isEdge();
    }).forEach(u)), G.addToList && k.forEach(function(U) {
      g(U, G);
    }), h(k, G), b(k, { inDragLayer: G.inDragLayer }), r.updateCachedGrabbedEles();
  }, "addNodesToDrag"), p = m2, y = m(function(k) {
    k && (r.getCachedZSortedEles().forEach(function(G) {
      l(G), f(G), d(G);
    }), r.updateCachedGrabbedEles());
  }, "freeDraggedElements"), b = m(function(k, G) {
    if (!(G.inDragLayer == null && G.addToList == null) && k.cy().hasCompoundNodes()) {
      var $ = k.ancestors().orphans();
      if (!$.same(k)) {
        var U = $.descendants().spawnSelf().merge($).unmerge(k).unmerge(k.descendants()), Q = U.connectedEdges();
        G.inDragLayer && (Q.forEach(u), U.forEach(u)), G.addToList && U.forEach(function(ue) {
          g(ue, G);
        });
      }
    }
  }, "updateAncestorsInDragLayer"), w = m(function() {
    document.activeElement != null && document.activeElement.blur != null && document.activeElement.blur();
  }, "blurActiveDomElement"), x = typeof MutationObserver < "u", C = typeof ResizeObserver < "u";
  x ? (r.removeObserver = new MutationObserver(function(Y) {
    for (var k = 0; k < Y.length; k++) {
      var G = Y[k], $ = G.removedNodes;
      if ($) for (var U = 0; U < $.length; U++) {
        var Q = $[U];
        if (Q === r.container) {
          r.destroy();
          break;
        }
      }
    }
  }), r.container.parentNode && r.removeObserver.observe(r.container.parentNode, { childList: true })) : r.registerBinding(r.container, "DOMNodeRemoved", function(Y) {
    r.destroy();
  });
  var T = Va(function() {
    r.cy.resize();
  }, 100);
  x && (r.styleObserver = new MutationObserver(T), r.styleObserver.observe(r.container, { attributes: true })), r.registerBinding(e, "resize", T), C && (r.resizeObserver = new ResizeObserver(T), r.resizeObserver.observe(r.container));
  var E = m(function(k, G) {
    for (; k != null; ) G(k), k = k.parentNode;
  }, "forEachUp"), S = m(function() {
    r.invalidateContainerClientCoordsCache();
  }, "invalidateCoords");
  E(r.container, function(Y) {
    r.registerBinding(Y, "transitionend", S), r.registerBinding(Y, "animationend", S), r.registerBinding(Y, "scroll", S);
  }), r.registerBinding(r.container, "contextmenu", function(Y) {
    Y.preventDefault();
  });
  var D = m(function() {
    return r.selection[4] !== 0;
  }, "inBoxSelection"), B = m(function(k) {
    for (var G = r.findContainerClientCoords(), $ = G[0], U = G[1], Q = G[2], ue = G[3], re = k.touches ? k.touches : [k], fe = false, ve = 0; ve < re.length; ve++) {
      var be = re[ve];
      if ($ <= be.clientX && be.clientX <= $ + Q && U <= be.clientY && be.clientY <= U + ue) {
        fe = true;
        break;
      }
    }
    if (!fe) return false;
    for (var Be = r.container, Se = k.target, ce = Se.parentNode, Ae = false; ce; ) {
      if (ce === Be) {
        Ae = true;
        break;
      }
      ce = ce.parentNode;
    }
    return !!Ae;
  }, "eventInContainer");
  r.registerBinding(r.container, "mousedown", m(function(k) {
    if (B(k) && !(r.hoverData.which === 1 && k.which !== 1)) {
      k.preventDefault(), w(), r.hoverData.capture = true, r.hoverData.which = k.which;
      var G = r.cy, $ = [k.clientX, k.clientY], U = r.projectIntoViewport($[0], $[1]), Q = r.selection, ue = r.findNearestElements(U[0], U[1], true, false), re = ue[0], fe = r.dragData.possibleDragElements;
      r.hoverData.mdownPos = U, r.hoverData.mdownGPos = $;
      var ve = m(function(Pe) {
        return { originalEvent: k, type: Pe, position: { x: U[0], y: U[1] } };
      }, "makeEvent"), be = m(function() {
        r.hoverData.tapholdCancelled = false, clearTimeout(r.hoverData.tapholdTimeout), r.hoverData.tapholdTimeout = setTimeout(function() {
          if (!r.hoverData.tapholdCancelled) {
            var Pe = r.hoverData.down;
            Pe ? Pe.emit(ve("taphold")) : G.emit(ve("taphold"));
          }
        }, r.tapholdDuration);
      }, "checkForTaphold");
      if (k.which == 3) {
        r.hoverData.cxtStarted = true;
        var Be = { originalEvent: k, type: "cxttapstart", position: { x: U[0], y: U[1] } };
        re ? (re.activate(), re.emit(Be), r.hoverData.down = re) : G.emit(Be), r.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime(), r.hoverData.cxtDragged = false;
      } else if (k.which == 1) {
        re && re.activate();
        {
          if (re != null && r.nodeIsGrabbable(re)) {
            var Se = m(function(Pe) {
              Pe.emit(ve("grab"));
            }, "triggerGrab");
            if (c(re), !re.selected()) fe = r.dragData.possibleDragElements = G.collection(), p(re, { addToList: fe }), re.emit(ve("grabon")).emit(ve("grab"));
            else {
              fe = r.dragData.possibleDragElements = G.collection();
              var ce = G.$(function(Ae) {
                return Ae.isNode() && Ae.selected() && r.nodeIsGrabbable(Ae);
              });
              m2(ce, { addToList: fe }), re.emit(ve("grabon")), ce.forEach(Se);
            }
            r.redrawHint("eles", true), r.redrawHint("drag", true);
          }
          r.hoverData.down = re, r.hoverData.downs = ue, r.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime();
        }
        n(re, ["mousedown", "tapstart", "vmousedown"], k, { x: U[0], y: U[1] }), re == null ? (Q[4] = 1, r.data.bgActivePosistion = { x: U[0], y: U[1] }, r.redrawHint("select", true), r.redraw()) : re.pannable() && (Q[4] = 1), be();
      }
      Q[0] = Q[2] = U[0], Q[1] = Q[3] = U[1];
    }
  }, "mousedownHandler"), false);
  var P = a(r.container);
  r.registerBinding([e, P], "mousemove", m(function(k) {
    var G = r.hoverData.capture;
    if (!(!G && !B(k))) {
      var $ = false, U = r.cy, Q = U.zoom(), ue = [k.clientX, k.clientY], re = r.projectIntoViewport(ue[0], ue[1]), fe = r.hoverData.mdownPos, ve = r.hoverData.mdownGPos, be = r.selection, Be = null;
      !r.hoverData.draggingEles && !r.hoverData.dragging && !r.hoverData.selecting && (Be = r.findNearestElement(re[0], re[1], true, false));
      var Se = r.hoverData.last, ce = r.hoverData.down, Ae = [re[0] - be[2], re[1] - be[3]], Pe = r.dragData.possibleDragElements, er;
      if (ve) {
        var Xe = ue[0] - ve[0], br = Xe * Xe, Ze = ue[1] - ve[1], sr = Ze * Ze, rr = br + sr;
        r.hoverData.isOverThresholdDrag = er = rr >= r.desktopTapThreshold2;
      }
      var vr = i(k);
      er && (r.hoverData.tapholdCancelled = true);
      var et = m(function() {
        var Pr = r.hoverData.dragDelta = r.hoverData.dragDelta || [];
        Pr.length === 0 ? (Pr.push(Ae[0]), Pr.push(Ae[1])) : (Pr[0] += Ae[0], Pr[1] += Ae[1]);
      }, "updateDragDelta");
      $ = true, n(Be, ["mousemove", "vmousemove", "tapdrag"], k, { x: re[0], y: re[1] });
      var Qe = m(function(Pr) {
        return { originalEvent: k, type: Pr, position: { x: re[0], y: re[1] } };
      }, "makeEvent"), $r = m(function() {
        r.data.bgActivePosistion = void 0, r.hoverData.selecting || U.emit(Qe("boxstart")), be[4] = 1, r.hoverData.selecting = true, r.redrawHint("select", true), r.redraw();
      }, "goIntoBoxMode");
      if (r.hoverData.which === 3) {
        if (er) {
          var Ur = Qe("cxtdrag");
          ce ? ce.emit(Ur) : U.emit(Ur), r.hoverData.cxtDragged = true, (!r.hoverData.cxtOver || Be !== r.hoverData.cxtOver) && (r.hoverData.cxtOver && r.hoverData.cxtOver.emit(Qe("cxtdragout")), r.hoverData.cxtOver = Be, Be && Be.emit(Qe("cxtdragover")));
        }
      } else if (r.hoverData.dragging) {
        if ($ = true, U.panningEnabled() && U.userPanningEnabled()) {
          var Nt;
          if (r.hoverData.justStartedPan) {
            var Ua = r.hoverData.mdownPos;
            Nt = { x: (re[0] - Ua[0]) * Q, y: (re[1] - Ua[1]) * Q }, r.hoverData.justStartedPan = false;
          } else Nt = { x: Ae[0] * Q, y: Ae[1] * Q };
          U.panBy(Nt), U.emit(Qe("dragpan")), r.hoverData.dragged = true;
        }
        re = r.projectIntoViewport(k.clientX, k.clientY);
      } else if (be[4] == 1 && (ce == null || ce.pannable())) {
        if (er) {
          if (!r.hoverData.dragging && U.boxSelectionEnabled() && (vr || !U.panningEnabled() || !U.userPanningEnabled())) $r();
          else if (!r.hoverData.selecting && U.panningEnabled() && U.userPanningEnabled()) {
            var wt = s(ce, r.hoverData.downs);
            wt && (r.hoverData.dragging = true, r.hoverData.justStartedPan = true, be[4] = 0, r.data.bgActivePosistion = $t(fe), r.redrawHint("select", true), r.redraw());
          }
          ce && ce.pannable() && ce.active() && ce.unactivate();
        }
      } else {
        if (ce && ce.pannable() && ce.active() && ce.unactivate(), (!ce || !ce.grabbed()) && Be != Se && (Se && n(Se, ["mouseout", "tapdragout"], k, { x: re[0], y: re[1] }), Be && n(Be, ["mouseover", "tapdragover"], k, { x: re[0], y: re[1] }), r.hoverData.last = Be), ce) if (er) {
          if (U.boxSelectionEnabled() && vr) ce && ce.grabbed() && (y(Pe), ce.emit(Qe("freeon")), Pe.emit(Qe("free")), r.dragData.didDrag && (ce.emit(Qe("dragfreeon")), Pe.emit(Qe("dragfree")))), $r();
          else if (ce && ce.grabbed() && r.nodeIsDraggable(ce)) {
            var Cr = !r.dragData.didDrag;
            Cr && r.redrawHint("eles", true), r.dragData.didDrag = true, r.hoverData.draggingEles || m2(Pe, { inDragLayer: true });
            var gr = { x: 0, y: 0 };
            if (ne(Ae[0]) && ne(Ae[1]) && (gr.x += Ae[0], gr.y += Ae[1], Cr)) {
              var Tr = r.hoverData.dragDelta;
              Tr && ne(Tr[0]) && ne(Tr[1]) && (gr.x += Tr[0], gr.y += Tr[1]);
            }
            r.hoverData.draggingEles = true, Pe.silentShift(gr).emit(Qe("position")).emit(Qe("drag")), r.redrawHint("drag", true), r.redraw();
          }
        } else et();
        $ = true;
      }
      if (be[2] = re[0], be[3] = re[1], $) return k.stopPropagation && k.stopPropagation(), k.preventDefault && k.preventDefault(), false;
    }
  }, "mousemoveHandler"), false);
  var A, R, M;
  r.registerBinding(e, "mouseup", m(function(k) {
    if (!(r.hoverData.which === 1 && k.which !== 1 && r.hoverData.capture)) {
      var G = r.hoverData.capture;
      if (G) {
        r.hoverData.capture = false;
        var $ = r.cy, U = r.projectIntoViewport(k.clientX, k.clientY), Q = r.selection, ue = r.findNearestElement(U[0], U[1], true, false), re = r.dragData.possibleDragElements, fe = r.hoverData.down, ve = i(k);
        r.data.bgActivePosistion && (r.redrawHint("select", true), r.redraw()), r.hoverData.tapholdCancelled = true, r.data.bgActivePosistion = void 0, fe && fe.unactivate();
        var be = m(function(Xe) {
          return { originalEvent: k, type: Xe, position: { x: U[0], y: U[1] } };
        }, "makeEvent");
        if (r.hoverData.which === 3) {
          var Be = be("cxttapend");
          if (fe ? fe.emit(Be) : $.emit(Be), !r.hoverData.cxtDragged) {
            var Se = be("cxttap");
            fe ? fe.emit(Se) : $.emit(Se);
          }
          r.hoverData.cxtDragged = false, r.hoverData.which = null;
        } else if (r.hoverData.which === 1) {
          if (n(ue, ["mouseup", "tapend", "vmouseup"], k, { x: U[0], y: U[1] }), !r.dragData.didDrag && !r.hoverData.dragged && !r.hoverData.selecting && !r.hoverData.isOverThresholdDrag && (n(fe, ["click", "tap", "vclick"], k, { x: U[0], y: U[1] }), R = false, k.timeStamp - M <= $.multiClickDebounceTime() ? (A && clearTimeout(A), R = true, M = null, n(fe, ["dblclick", "dbltap", "vdblclick"], k, { x: U[0], y: U[1] })) : (A = setTimeout(function() {
            R || n(fe, ["oneclick", "onetap", "voneclick"], k, { x: U[0], y: U[1] });
          }, $.multiClickDebounceTime()), M = k.timeStamp)), fe == null && !r.dragData.didDrag && !r.hoverData.selecting && !r.hoverData.dragged && !i(k) && ($.$(t).unselect(["tapunselect"]), re.length > 0 && r.redrawHint("eles", true), r.dragData.possibleDragElements = re = $.collection()), ue == fe && !r.dragData.didDrag && !r.hoverData.selecting && ue != null && ue._private.selectable && (r.hoverData.dragging || ($.selectionType() === "additive" || ve ? ue.selected() ? ue.unselect(["tapunselect"]) : ue.select(["tapselect"]) : ve || ($.$(t).unmerge(ue).unselect(["tapunselect"]), ue.select(["tapselect"]))), r.redrawHint("eles", true)), r.hoverData.selecting) {
            var ce = $.collection(r.getAllInBox(Q[0], Q[1], Q[2], Q[3]));
            r.redrawHint("select", true), ce.length > 0 && r.redrawHint("eles", true), $.emit(be("boxend"));
            var Ae = m(function(Xe) {
              return Xe.selectable() && !Xe.selected();
            }, "eleWouldBeSelected");
            $.selectionType() === "additive" || ve || $.$(t).unmerge(ce).unselect(), ce.emit(be("box")).stdFilter(Ae).select().emit(be("boxselect")), r.redraw();
          }
          if (r.hoverData.dragging && (r.hoverData.dragging = false, r.redrawHint("select", true), r.redrawHint("eles", true), r.redraw()), !Q[4]) {
            r.redrawHint("drag", true), r.redrawHint("eles", true);
            var Pe = fe && fe.grabbed();
            y(re), Pe && (fe.emit(be("freeon")), re.emit(be("free")), r.dragData.didDrag && (fe.emit(be("dragfreeon")), re.emit(be("dragfree"))));
          }
        }
        Q[4] = 0, r.hoverData.down = null, r.hoverData.cxtStarted = false, r.hoverData.draggingEles = false, r.hoverData.selecting = false, r.hoverData.isOverThresholdDrag = false, r.dragData.didDrag = false, r.hoverData.dragged = false, r.hoverData.dragDelta = [], r.hoverData.mdownPos = null, r.hoverData.mdownGPos = null, r.hoverData.which = null;
      }
    }
  }, "mouseupHandler"), false);
  var I = [], O = 4, L, N = 1e5, q = m(function(k, G) {
    for (var $ = 0; $ < k.length; $++) if (k[$] % G !== 0) return false;
    return true;
  }, "allAreDivisibleBy"), H = m(function(k) {
    for (var G = Math.abs(k[0]), $ = 1; $ < k.length; $++) if (Math.abs(k[$]) !== G) return false;
    return true;
  }, "allAreSameMagnitude"), z = m(function(k) {
    var G = false, $ = k.deltaY;
    if ($ == null && (k.wheelDeltaY != null ? $ = k.wheelDeltaY / 4 : k.wheelDelta != null && ($ = k.wheelDelta / 4)), $ !== 0) {
      if (L == null) if (I.length >= O) {
        var U = I;
        if (L = q(U, 5), !L) {
          var Q = Math.abs(U[0]);
          L = H(U) && Q > 5;
        }
        if (L) for (var ue = 0; ue < U.length; ue++) N = Math.min(Math.abs(U[ue]), N);
      } else I.push($), G = true;
      else L && (N = Math.min(Math.abs($), N));
      if (!r.scrollingPage) {
        var re = r.cy, fe = re.zoom(), ve = re.pan(), be = r.projectIntoViewport(k.clientX, k.clientY), Be = [be[0] * fe + ve.x, be[1] * fe + ve.y];
        if (r.hoverData.draggingEles || r.hoverData.dragging || r.hoverData.cxtStarted || D()) {
          k.preventDefault();
          return;
        }
        if (re.panningEnabled() && re.userPanningEnabled() && re.zoomingEnabled() && re.userZoomingEnabled()) {
          k.preventDefault(), r.data.wheelZooming = true, clearTimeout(r.data.wheelTimeout), r.data.wheelTimeout = setTimeout(function() {
            r.data.wheelZooming = false, r.redrawHint("eles", true), r.redraw();
          }, 150);
          var Se;
          G && Math.abs($) > 5 && ($ = ao($) * 5), Se = $ / -250, L && (Se /= N, Se *= 3), Se = Se * r.wheelSensitivity;
          var ce = k.deltaMode === 1;
          ce && (Se *= 33);
          var Ae = re.zoom() * Math.pow(10, Se);
          k.type === "gesturechange" && (Ae = r.gestureStartZoom * k.scale), re.zoom({ level: Ae, renderedPosition: { x: Be[0], y: Be[1] } }), re.emit({ type: k.type === "gesturechange" ? "pinchzoom" : "scrollzoom", originalEvent: k, position: { x: be[0], y: be[1] } });
        }
      }
    }
  }, "wheelHandler");
  r.registerBinding(r.container, "wheel", z, true), r.registerBinding(e, "scroll", m(function(k) {
    r.scrollingPage = true, clearTimeout(r.scrollingPageTimeout), r.scrollingPageTimeout = setTimeout(function() {
      r.scrollingPage = false;
    }, 250);
  }, "scrollHandler"), true), r.registerBinding(r.container, "gesturestart", m(function(k) {
    r.gestureStartZoom = r.cy.zoom(), r.hasTouchStarted || k.preventDefault();
  }, "gestureStartHandler"), true), r.registerBinding(r.container, "gesturechange", function(Y) {
    r.hasTouchStarted || z(Y);
  }, true), r.registerBinding(r.container, "mouseout", m(function(k) {
    var G = r.projectIntoViewport(k.clientX, k.clientY);
    r.cy.emit({ originalEvent: k, type: "mouseout", position: { x: G[0], y: G[1] } });
  }, "mouseOutHandler"), false), r.registerBinding(r.container, "mouseover", m(function(k) {
    var G = r.projectIntoViewport(k.clientX, k.clientY);
    r.cy.emit({ originalEvent: k, type: "mouseover", position: { x: G[0], y: G[1] } });
  }, "mouseOverHandler"), false);
  var V, K, J, X, ee, te, ie, j, F, _, W, Z, ae, de = m(function(k, G, $, U) {
    return Math.sqrt(($ - k) * ($ - k) + (U - G) * (U - G));
  }, "distance"), Re = m(function(k, G, $, U) {
    return ($ - k) * ($ - k) + (U - G) * (U - G);
  }, "distanceSq"), Te;
  r.registerBinding(r.container, "touchstart", Te = m(function(k) {
    if (r.hasTouchStarted = true, !!B(k)) {
      w(), r.touchData.capture = true, r.data.bgActivePosistion = void 0;
      var G = r.cy, $ = r.touchData.now, U = r.touchData.earlier;
      if (k.touches[0]) {
        var Q = r.projectIntoViewport(k.touches[0].clientX, k.touches[0].clientY);
        $[0] = Q[0], $[1] = Q[1];
      }
      if (k.touches[1]) {
        var Q = r.projectIntoViewport(k.touches[1].clientX, k.touches[1].clientY);
        $[2] = Q[0], $[3] = Q[1];
      }
      if (k.touches[2]) {
        var Q = r.projectIntoViewport(k.touches[2].clientX, k.touches[2].clientY);
        $[4] = Q[0], $[5] = Q[1];
      }
      var ue = m(function(vr) {
        return { originalEvent: k, type: vr, position: { x: $[0], y: $[1] } };
      }, "makeEvent");
      if (k.touches[1]) {
        r.touchData.singleTouchMoved = true, y(r.dragData.touchDragEles);
        var re = r.findContainerClientCoords();
        F = re[0], _ = re[1], W = re[2], Z = re[3], V = k.touches[0].clientX - F, K = k.touches[0].clientY - _, J = k.touches[1].clientX - F, X = k.touches[1].clientY - _, ae = 0 <= V && V <= W && 0 <= J && J <= W && 0 <= K && K <= Z && 0 <= X && X <= Z;
        var fe = G.pan(), ve = G.zoom();
        ee = de(V, K, J, X), te = Re(V, K, J, X), ie = [(V + J) / 2, (K + X) / 2], j = [(ie[0] - fe.x) / ve, (ie[1] - fe.y) / ve];
        var be = 200, Be = be * be;
        if (te < Be && !k.touches[2]) {
          var Se = r.findNearestElement($[0], $[1], true, true), ce = r.findNearestElement($[2], $[3], true, true);
          Se && Se.isNode() ? (Se.activate().emit(ue("cxttapstart")), r.touchData.start = Se) : ce && ce.isNode() ? (ce.activate().emit(ue("cxttapstart")), r.touchData.start = ce) : G.emit(ue("cxttapstart")), r.touchData.start && (r.touchData.start._private.grabbed = false), r.touchData.cxt = true, r.touchData.cxtDragged = false, r.data.bgActivePosistion = void 0, r.redraw();
          return;
        }
      }
      if (k.touches[2]) G.boxSelectionEnabled() && k.preventDefault();
      else if (!k.touches[1]) {
        if (k.touches[0]) {
          var Ae = r.findNearestElements($[0], $[1], true, true), Pe = Ae[0];
          if (Pe != null && (Pe.activate(), r.touchData.start = Pe, r.touchData.starts = Ae, r.nodeIsGrabbable(Pe))) {
            var er = r.dragData.touchDragEles = G.collection(), Xe = null;
            r.redrawHint("eles", true), r.redrawHint("drag", true), Pe.selected() ? (Xe = G.$(function(rr) {
              return rr.selected() && r.nodeIsGrabbable(rr);
            }), m2(Xe, { addToList: er })) : p(Pe, { addToList: er }), c(Pe), Pe.emit(ue("grabon")), Xe ? Xe.forEach(function(rr) {
              rr.emit(ue("grab"));
            }) : Pe.emit(ue("grab"));
          }
          n(Pe, ["touchstart", "tapstart", "vmousedown"], k, { x: $[0], y: $[1] }), Pe == null && (r.data.bgActivePosistion = { x: Q[0], y: Q[1] }, r.redrawHint("select", true), r.redraw()), r.touchData.singleTouchMoved = false, r.touchData.singleTouchStartTime = +/* @__PURE__ */ new Date(), clearTimeout(r.touchData.tapholdTimeout), r.touchData.tapholdTimeout = setTimeout(function() {
            r.touchData.singleTouchMoved === false && !r.pinching && !r.touchData.selecting && n(r.touchData.start, ["taphold"], k, { x: $[0], y: $[1] });
          }, r.tapholdDuration);
        }
      }
      if (k.touches.length >= 1) {
        for (var br = r.touchData.startPosition = [null, null, null, null, null, null], Ze = 0; Ze < $.length; Ze++) br[Ze] = U[Ze] = $[Ze];
        var sr = k.touches[0];
        r.touchData.startGPosition = [sr.clientX, sr.clientY];
      }
    }
  }, "touchstartHandler"), false);
  var xe;
  r.registerBinding(e, "touchmove", xe = m(function(k) {
    var G = r.touchData.capture;
    if (!(!G && !B(k))) {
      var $ = r.selection, U = r.cy, Q = r.touchData.now, ue = r.touchData.earlier, re = U.zoom();
      if (k.touches[0]) {
        var fe = r.projectIntoViewport(k.touches[0].clientX, k.touches[0].clientY);
        Q[0] = fe[0], Q[1] = fe[1];
      }
      if (k.touches[1]) {
        var fe = r.projectIntoViewport(k.touches[1].clientX, k.touches[1].clientY);
        Q[2] = fe[0], Q[3] = fe[1];
      }
      if (k.touches[2]) {
        var fe = r.projectIntoViewport(k.touches[2].clientX, k.touches[2].clientY);
        Q[4] = fe[0], Q[5] = fe[1];
      }
      var ve = m(function(ec) {
        return { originalEvent: k, type: ec, position: { x: Q[0], y: Q[1] } };
      }, "makeEvent"), be = r.touchData.startGPosition, Be;
      if (G && k.touches[0] && be) {
        for (var Se = [], ce = 0; ce < Q.length; ce++) Se[ce] = Q[ce] - ue[ce];
        var Ae = k.touches[0].clientX - be[0], Pe = Ae * Ae, er = k.touches[0].clientY - be[1], Xe = er * er, br = Pe + Xe;
        Be = br >= r.touchTapThreshold2;
      }
      if (G && r.touchData.cxt) {
        k.preventDefault();
        var Ze = k.touches[0].clientX - F, sr = k.touches[0].clientY - _, rr = k.touches[1].clientX - F, vr = k.touches[1].clientY - _, et = Re(Ze, sr, rr, vr), Qe = et / te, $r = 150, Ur = $r * $r, Nt = 1.5, Ua = Nt * Nt;
        if (Qe >= Ua || et >= Ur) {
          r.touchData.cxt = false, r.data.bgActivePosistion = void 0, r.redrawHint("select", true);
          var wt = ve("cxttapend");
          r.touchData.start ? (r.touchData.start.unactivate().emit(wt), r.touchData.start = null) : U.emit(wt);
        }
      }
      if (G && r.touchData.cxt) {
        var wt = ve("cxtdrag");
        r.data.bgActivePosistion = void 0, r.redrawHint("select", true), r.touchData.start ? r.touchData.start.emit(wt) : U.emit(wt), r.touchData.start && (r.touchData.start._private.grabbed = false), r.touchData.cxtDragged = true;
        var Cr = r.findNearestElement(Q[0], Q[1], true, true);
        (!r.touchData.cxtOver || Cr !== r.touchData.cxtOver) && (r.touchData.cxtOver && r.touchData.cxtOver.emit(ve("cxtdragout")), r.touchData.cxtOver = Cr, Cr && Cr.emit(ve("cxtdragover")));
      } else if (G && k.touches[2] && U.boxSelectionEnabled()) k.preventDefault(), r.data.bgActivePosistion = void 0, this.lastThreeTouch = +/* @__PURE__ */ new Date(), r.touchData.selecting || U.emit(ve("boxstart")), r.touchData.selecting = true, r.touchData.didSelect = true, $[4] = 1, !$ || $.length === 0 || $[0] === void 0 ? ($[0] = (Q[0] + Q[2] + Q[4]) / 3, $[1] = (Q[1] + Q[3] + Q[5]) / 3, $[2] = (Q[0] + Q[2] + Q[4]) / 3 + 1, $[3] = (Q[1] + Q[3] + Q[5]) / 3 + 1) : ($[2] = (Q[0] + Q[2] + Q[4]) / 3, $[3] = (Q[1] + Q[3] + Q[5]) / 3), r.redrawHint("select", true), r.redraw();
      else if (G && k.touches[1] && !r.touchData.didSelect && U.zoomingEnabled() && U.panningEnabled() && U.userZoomingEnabled() && U.userPanningEnabled()) {
        k.preventDefault(), r.data.bgActivePosistion = void 0, r.redrawHint("select", true);
        var gr = r.dragData.touchDragEles;
        if (gr) {
          r.redrawHint("drag", true);
          for (var Tr = 0; Tr < gr.length; Tr++) {
            var ua = gr[Tr]._private;
            ua.grabbed = false, ua.rscratch.inDragLayer = false;
          }
        }
        var Pr = r.touchData.start, Ze = k.touches[0].clientX - F, sr = k.touches[0].clientY - _, rr = k.touches[1].clientX - F, vr = k.touches[1].clientY - _, xo = de(Ze, sr, rr, vr), $f = xo / ee;
        if (ae) {
          var Uf = Ze - V, Kf = sr - K, Xf = rr - J, Yf = vr - X, Zf = (Uf + Xf) / 2, Qf = (Kf + Yf) / 2, la = U.zoom(), Qn = la * $f, Ka = U.pan(), Eo = j[0] * la + Ka.x, Co = j[1] * la + Ka.y, Jf = { x: -Qn / la * (Eo - Ka.x - Zf) + Eo, y: -Qn / la * (Co - Ka.y - Qf) + Co };
          if (Pr && Pr.active()) {
            var gr = r.dragData.touchDragEles;
            y(gr), r.redrawHint("drag", true), r.redrawHint("eles", true), Pr.unactivate().emit(ve("freeon")), gr.emit(ve("free")), r.dragData.didDrag && (Pr.emit(ve("dragfreeon")), gr.emit(ve("dragfree")));
          }
          U.viewport({ zoom: Qn, pan: Jf, cancelOnFailedZoom: true }), U.emit(ve("pinchzoom")), ee = xo, V = Ze, K = sr, J = rr, X = vr, r.pinching = true;
        }
        if (k.touches[0]) {
          var fe = r.projectIntoViewport(k.touches[0].clientX, k.touches[0].clientY);
          Q[0] = fe[0], Q[1] = fe[1];
        }
        if (k.touches[1]) {
          var fe = r.projectIntoViewport(k.touches[1].clientX, k.touches[1].clientY);
          Q[2] = fe[0], Q[3] = fe[1];
        }
        if (k.touches[2]) {
          var fe = r.projectIntoViewport(k.touches[2].clientX, k.touches[2].clientY);
          Q[4] = fe[0], Q[5] = fe[1];
        }
      } else if (k.touches[0] && !r.touchData.didSelect) {
        var Lr = r.touchData.start, Jn = r.touchData.last, Cr;
        if (!r.hoverData.draggingEles && !r.swipePanning && (Cr = r.findNearestElement(Q[0], Q[1], true, true)), G && Lr != null && k.preventDefault(), G && Lr != null && r.nodeIsDraggable(Lr)) if (Be) {
          var gr = r.dragData.touchDragEles, To = !r.dragData.didDrag;
          To && m2(gr, { inDragLayer: true }), r.dragData.didDrag = true;
          var va = { x: 0, y: 0 };
          if (ne(Se[0]) && ne(Se[1]) && (va.x += Se[0], va.y += Se[1], To)) {
            r.redrawHint("eles", true);
            var Ir = r.touchData.dragDelta;
            Ir && ne(Ir[0]) && ne(Ir[1]) && (va.x += Ir[0], va.y += Ir[1]);
          }
          r.hoverData.draggingEles = true, gr.silentShift(va).emit(ve("position")).emit(ve("drag")), r.redrawHint("drag", true), r.touchData.startPosition[0] == ue[0] && r.touchData.startPosition[1] == ue[1] && r.redrawHint("eles", true), r.redraw();
        } else {
          var Ir = r.touchData.dragDelta = r.touchData.dragDelta || [];
          Ir.length === 0 ? (Ir.push(Se[0]), Ir.push(Se[1])) : (Ir[0] += Se[0], Ir[1] += Se[1]);
        }
        if (n(Lr || Cr, ["touchmove", "tapdrag", "vmousemove"], k, { x: Q[0], y: Q[1] }), (!Lr || !Lr.grabbed()) && Cr != Jn && (Jn && Jn.emit(ve("tapdragout")), Cr && Cr.emit(ve("tapdragover"))), r.touchData.last = Cr, G) for (var Tr = 0; Tr < Q.length; Tr++) Q[Tr] && r.touchData.startPosition[Tr] && Be && (r.touchData.singleTouchMoved = true);
        if (G && (Lr == null || Lr.pannable()) && U.panningEnabled() && U.userPanningEnabled()) {
          var jf = s(Lr, r.touchData.starts);
          jf && (k.preventDefault(), r.data.bgActivePosistion || (r.data.bgActivePosistion = $t(r.touchData.startPosition)), r.swipePanning ? (U.panBy({ x: Se[0] * re, y: Se[1] * re }), U.emit(ve("dragpan"))) : Be && (r.swipePanning = true, U.panBy({ x: Ae * re, y: er * re }), U.emit(ve("dragpan")), Lr && (Lr.unactivate(), r.redrawHint("select", true), r.touchData.start = null)));
          var fe = r.projectIntoViewport(k.touches[0].clientX, k.touches[0].clientY);
          Q[0] = fe[0], Q[1] = fe[1];
        }
      }
      for (var ce = 0; ce < Q.length; ce++) ue[ce] = Q[ce];
      G && k.touches.length > 0 && !r.hoverData.draggingEles && !r.swipePanning && r.data.bgActivePosistion != null && (r.data.bgActivePosistion = void 0, r.redrawHint("select", true), r.redraw());
    }
  }, "touchmoveHandler"), false);
  var me;
  r.registerBinding(e, "touchcancel", me = m(function(k) {
    var G = r.touchData.start;
    r.touchData.capture = false, G && G.unactivate();
  }, "touchcancelHandler"));
  var se, he, ge, Ce;
  if (r.registerBinding(e, "touchend", se = m(function(k) {
    var G = r.touchData.start, $ = r.touchData.capture;
    if ($) k.touches.length === 0 && (r.touchData.capture = false), k.preventDefault();
    else return;
    var U = r.selection;
    r.swipePanning = false, r.hoverData.draggingEles = false;
    var Q = r.cy, ue = Q.zoom(), re = r.touchData.now, fe = r.touchData.earlier;
    if (k.touches[0]) {
      var ve = r.projectIntoViewport(k.touches[0].clientX, k.touches[0].clientY);
      re[0] = ve[0], re[1] = ve[1];
    }
    if (k.touches[1]) {
      var ve = r.projectIntoViewport(k.touches[1].clientX, k.touches[1].clientY);
      re[2] = ve[0], re[3] = ve[1];
    }
    if (k.touches[2]) {
      var ve = r.projectIntoViewport(k.touches[2].clientX, k.touches[2].clientY);
      re[4] = ve[0], re[5] = ve[1];
    }
    var be = m(function(Ur) {
      return { originalEvent: k, type: Ur, position: { x: re[0], y: re[1] } };
    }, "makeEvent");
    G && G.unactivate();
    var Be;
    if (r.touchData.cxt) {
      if (Be = be("cxttapend"), G ? G.emit(Be) : Q.emit(Be), !r.touchData.cxtDragged) {
        var Se = be("cxttap");
        G ? G.emit(Se) : Q.emit(Se);
      }
      r.touchData.start && (r.touchData.start._private.grabbed = false), r.touchData.cxt = false, r.touchData.start = null, r.redraw();
      return;
    }
    if (!k.touches[2] && Q.boxSelectionEnabled() && r.touchData.selecting) {
      r.touchData.selecting = false;
      var ce = Q.collection(r.getAllInBox(U[0], U[1], U[2], U[3]));
      U[0] = void 0, U[1] = void 0, U[2] = void 0, U[3] = void 0, U[4] = 0, r.redrawHint("select", true), Q.emit(be("boxend"));
      var Ae = m(function(Ur) {
        return Ur.selectable() && !Ur.selected();
      }, "eleWouldBeSelected");
      ce.emit(be("box")).stdFilter(Ae).select().emit(be("boxselect")), ce.nonempty() && r.redrawHint("eles", true), r.redraw();
    }
    if (G == null ? void 0 : G.unactivate(), k.touches[2]) r.data.bgActivePosistion = void 0, r.redrawHint("select", true);
    else if (!k.touches[1]) {
      if (!k.touches[0]) {
        if (!k.touches[0]) {
          r.data.bgActivePosistion = void 0, r.redrawHint("select", true);
          var Pe = r.dragData.touchDragEles;
          if (G != null) {
            var er = G._private.grabbed;
            y(Pe), r.redrawHint("drag", true), r.redrawHint("eles", true), er && (G.emit(be("freeon")), Pe.emit(be("free")), r.dragData.didDrag && (G.emit(be("dragfreeon")), Pe.emit(be("dragfree")))), n(G, ["touchend", "tapend", "vmouseup", "tapdragout"], k, { x: re[0], y: re[1] }), G.unactivate(), r.touchData.start = null;
          } else {
            var Xe = r.findNearestElement(re[0], re[1], true, true);
            n(Xe, ["touchend", "tapend", "vmouseup", "tapdragout"], k, { x: re[0], y: re[1] });
          }
          var br = r.touchData.startPosition[0] - re[0], Ze = br * br, sr = r.touchData.startPosition[1] - re[1], rr = sr * sr, vr = Ze + rr, et = vr * ue * ue;
          r.touchData.singleTouchMoved || (G || Q.$(":selected").unselect(["tapunselect"]), n(G, ["tap", "vclick"], k, { x: re[0], y: re[1] }), he = false, k.timeStamp - Ce <= Q.multiClickDebounceTime() ? (ge && clearTimeout(ge), he = true, Ce = null, n(G, ["dbltap", "vdblclick"], k, { x: re[0], y: re[1] })) : (ge = setTimeout(function() {
            he || n(G, ["onetap", "voneclick"], k, { x: re[0], y: re[1] });
          }, Q.multiClickDebounceTime()), Ce = k.timeStamp)), G != null && !r.dragData.didDrag && G._private.selectable && et < r.touchTapThreshold2 && !r.pinching && (Q.selectionType() === "single" ? (Q.$(t).unmerge(G).unselect(["tapunselect"]), G.select(["tapselect"])) : G.selected() ? G.unselect(["tapunselect"]) : G.select(["tapselect"]), r.redrawHint("eles", true)), r.touchData.singleTouchMoved = true;
        }
      }
    }
    for (var Qe = 0; Qe < re.length; Qe++) fe[Qe] = re[Qe];
    r.dragData.didDrag = false, k.touches.length === 0 && (r.touchData.dragDelta = [], r.touchData.startPosition = [null, null, null, null, null, null], r.touchData.startGPosition = null, r.touchData.didSelect = false), k.touches.length < 2 && (k.touches.length === 1 && (r.touchData.startGPosition = [k.touches[0].clientX, k.touches[0].clientY]), r.pinching = false, r.redrawHint("eles", true), r.redraw());
  }, "touchendHandler"), false), typeof TouchEvent > "u") {
    var ye = [], ke = m(function(k) {
      return { clientX: k.clientX, clientY: k.clientY, force: 1, identifier: k.pointerId, pageX: k.pageX, pageY: k.pageY, radiusX: k.width / 2, radiusY: k.height / 2, screenX: k.screenX, screenY: k.screenY, target: k.target };
    }, "makeTouch"), Me = m(function(k) {
      return { event: k, touch: ke(k) };
    }, "makePointer"), Ne = m(function(k) {
      ye.push(Me(k));
    }, "addPointer"), ze = m(function(k) {
      for (var G = 0; G < ye.length; G++) {
        var $ = ye[G];
        if ($.event.pointerId === k.pointerId) {
          ye.splice(G, 1);
          return;
        }
      }
    }, "removePointer"), Fe = m(function(k) {
      var G = ye.filter(function($) {
        return $.event.pointerId === k.pointerId;
      })[0];
      G.event = k, G.touch = ke(k);
    }, "updatePointer"), Ee = m(function(k) {
      k.touches = ye.map(function(G) {
        return G.touch;
      });
    }, "addTouchesToEvent"), le = m(function(k) {
      return k.pointerType === "mouse" || k.pointerType === 4;
    }, "pointerIsMouse");
    r.registerBinding(r.container, "pointerdown", function(Y) {
      le(Y) || (Y.preventDefault(), Ne(Y), Ee(Y), Te(Y));
    }), r.registerBinding(r.container, "pointerup", function(Y) {
      le(Y) || (ze(Y), Ee(Y), se(Y));
    }), r.registerBinding(r.container, "pointercancel", function(Y) {
      le(Y) || (ze(Y), Ee(Y), me(Y));
    }), r.registerBinding(r.container, "pointermove", function(Y) {
      le(Y) || (Y.preventDefault(), Fe(Y), Ee(Y), xe(Y));
    });
  }
};
var Jr = {};
Jr.generatePolygon = function(r, e) {
  return this.nodeShapes[r] = { renderer: this, name: r, points: e, draw: m(function(a, n, i, s, o, l) {
    this.renderer.nodeShapeImpl("polygon", a, n, i, s, o, this.points);
  }, "draw"), intersectLine: m(function(a, n, i, s, o, l, u, f) {
    return Ba(o, l, this.points, a, n, i / 2, s / 2, u);
  }, "intersectLine"), checkPoint: m(function(a, n, i, s, o, l, u, f) {
    return Qr(a, n, this.points, l, u, s, o, [0, -1], i);
  }, "checkPoint"), hasMiterBounds: r !== "rectangle", miterBounds: m(function(a, n, i, s, o, l) {
    return Rd(this.points, a, n, i, s, o);
  }, "miterBounds") };
};
Jr.generateEllipse = function() {
  return this.nodeShapes.ellipse = { renderer: this, name: "ellipse", draw: m(function(e, t, a, n, i, s) {
    this.renderer.nodeShapeImpl(this.name, e, t, a, n, i);
  }, "draw"), intersectLine: m(function(e, t, a, n, i, s, o, l) {
    return Vd(i, s, e, t, a / 2 + o, n / 2 + o);
  }, "intersectLine"), checkPoint: m(function(e, t, a, n, i, s, o, l) {
    return Bt(e, t, n, i, s, o, a);
  }, "checkPoint") };
};
Jr.generateRoundPolygon = function(r, e) {
  return this.nodeShapes[r] = { renderer: this, name: r, points: e, getOrCreateCorners: m(function(a, n, i, s, o, l, u) {
    if (l[u] !== void 0 && l[u + "-cx"] === a && l[u + "-cy"] === n) return l[u];
    l[u] = new Array(e.length / 2), l[u + "-cx"] = a, l[u + "-cy"] = n;
    var f = i / 2, c = s / 2;
    o = o === "auto" ? Cv(i, s) : o;
    for (var d = new Array(e.length / 2), g = 0; g < e.length / 2; g++) d[g] = { x: a + f * e[g * 2], y: n + c * e[g * 2 + 1] };
    var h, m2, p, y, b = d.length;
    for (m2 = d[b - 1], h = 0; h < b; h++) p = d[h % b], y = d[(h + 1) % b], l[u][h] = yo(m2, p, y, o), m2 = p, p = y;
    return l[u];
  }, "getOrCreateCorners"), draw: m(function(a, n, i, s, o, l, u) {
    this.renderer.nodeShapeImpl("round-polygon", a, n, i, s, o, this.points, this.getOrCreateCorners(n, i, s, o, l, u, "drawCorners"));
  }, "draw"), intersectLine: m(function(a, n, i, s, o, l, u, f, c) {
    return _d(o, l, this.points, a, n, i, s, u, this.getOrCreateCorners(a, n, i, s, f, c, "corners"));
  }, "intersectLine"), checkPoint: m(function(a, n, i, s, o, l, u, f, c) {
    return Fd(a, n, this.points, l, u, s, o, this.getOrCreateCorners(l, u, s, o, f, c, "corners"));
  }, "checkPoint") };
};
Jr.generateRoundRectangle = function() {
  return this.nodeShapes["round-rectangle"] = this.nodeShapes.roundrectangle = { renderer: this, name: "round-rectangle", points: wr(4, 0), draw: m(function(e, t, a, n, i, s) {
    this.renderer.nodeShapeImpl(this.name, e, t, a, n, i, this.points, s);
  }, "draw"), intersectLine: m(function(e, t, a, n, i, s, o, l) {
    return xv(i, s, e, t, a, n, o, l);
  }, "intersectLine"), checkPoint: m(function(e, t, a, n, i, s, o, l) {
    var u = n / 2, f = i / 2;
    l = l === "auto" ? ft(n, i) : l, l = Math.min(u, f, l);
    var c = l * 2;
    return !!(Qr(e, t, this.points, s, o, n, i - c, [0, -1], a) || Qr(e, t, this.points, s, o, n - c, i, [0, -1], a) || Bt(e, t, c, c, s - u + l, o - f + l, a) || Bt(e, t, c, c, s + u - l, o - f + l, a) || Bt(e, t, c, c, s + u - l, o + f - l, a) || Bt(e, t, c, c, s - u + l, o + f - l, a));
  }, "checkPoint") };
};
Jr.generateCutRectangle = function() {
  return this.nodeShapes["cut-rectangle"] = this.nodeShapes.cutrectangle = { renderer: this, name: "cut-rectangle", cornerLength: io(), points: wr(4, 0), draw: m(function(e, t, a, n, i, s) {
    this.renderer.nodeShapeImpl(this.name, e, t, a, n, i, null, s);
  }, "draw"), generateCutTrianglePts: m(function(e, t, a, n, i) {
    var s = i === "auto" ? this.cornerLength : i, o = t / 2, l = e / 2, u = a - l, f = a + l, c = n - o, d = n + o;
    return { topLeft: [u, c + s, u + s, c, u + s, c + s], topRight: [f - s, c, f, c + s, f - s, c + s], bottomRight: [f, d - s, f - s, d, f - s, d - s], bottomLeft: [u + s, d, u, d - s, u + s, d - s] };
  }, "generateCutTrianglePts"), intersectLine: m(function(e, t, a, n, i, s, o, l) {
    var u = this.generateCutTrianglePts(a + 2 * o, n + 2 * o, e, t, l), f = [].concat.apply([], [u.topLeft.splice(0, 4), u.topRight.splice(0, 4), u.bottomRight.splice(0, 4), u.bottomLeft.splice(0, 4)]);
    return Ba(i, s, f, e, t);
  }, "intersectLine"), checkPoint: m(function(e, t, a, n, i, s, o, l) {
    var u = l === "auto" ? this.cornerLength : l;
    if (Qr(e, t, this.points, s, o, n, i - 2 * u, [0, -1], a) || Qr(e, t, this.points, s, o, n - 2 * u, i, [0, -1], a)) return true;
    var f = this.generateCutTrianglePts(n, i, s, o);
    return kr(e, t, f.topLeft) || kr(e, t, f.topRight) || kr(e, t, f.bottomRight) || kr(e, t, f.bottomLeft);
  }, "checkPoint") };
};
Jr.generateBarrel = function() {
  return this.nodeShapes.barrel = { renderer: this, name: "barrel", points: wr(4, 0), draw: m(function(e, t, a, n, i, s) {
    this.renderer.nodeShapeImpl(this.name, e, t, a, n, i);
  }, "draw"), intersectLine: m(function(e, t, a, n, i, s, o, l) {
    var u = 0.15, f = 0.5, c = 0.85, d = this.generateBarrelBezierPts(a + 2 * o, n + 2 * o, e, t), g = m(function(p) {
      var y = Xt({ x: p[0], y: p[1] }, { x: p[2], y: p[3] }, { x: p[4], y: p[5] }, u), b = Xt({ x: p[0], y: p[1] }, { x: p[2], y: p[3] }, { x: p[4], y: p[5] }, f), w = Xt({ x: p[0], y: p[1] }, { x: p[2], y: p[3] }, { x: p[4], y: p[5] }, c);
      return [p[0], p[1], y.x, y.y, b.x, b.y, w.x, w.y, p[4], p[5]];
    }, "approximateBarrelCurvePts"), h = [].concat(g(d.topLeft), g(d.topRight), g(d.bottomRight), g(d.bottomLeft));
    return Ba(i, s, h, e, t);
  }, "intersectLine"), generateBarrelBezierPts: m(function(e, t, a, n) {
    var i = t / 2, s = e / 2, o = a - s, l = a + s, u = n - i, f = n + i, c = Rs(e, t), d = c.heightOffset, g = c.widthOffset, h = c.ctrlPtOffsetPct * e, m2 = { topLeft: [o, u + d, o + h, u, o + g, u], topRight: [l - g, u, l - h, u, l, u + d], bottomRight: [l, f - d, l - h, f, l - g, f], bottomLeft: [o + g, f, o + h, f, o, f - d] };
    return m2.topLeft.isTop = true, m2.topRight.isTop = true, m2.bottomLeft.isBottom = true, m2.bottomRight.isBottom = true, m2;
  }, "generateBarrelBezierPts"), checkPoint: m(function(e, t, a, n, i, s, o, l) {
    var u = Rs(n, i), f = u.heightOffset, c = u.widthOffset;
    if (Qr(e, t, this.points, s, o, n, i - 2 * f, [0, -1], a) || Qr(e, t, this.points, s, o, n - 2 * c, i, [0, -1], a)) return true;
    for (var d = this.generateBarrelBezierPts(n, i, s, o), g = m(function(S, D, B) {
      var P = B[4], A = B[2], R = B[0], M = B[5], I = B[1], O = Math.min(P, R), L = Math.max(P, R), N = Math.min(M, I), q = Math.max(M, I);
      if (O <= S && S <= L && N <= D && D <= q) {
        var H = Gd(P, A, R), z = Id(H[0], H[1], H[2], S), V = z.filter(function(K) {
          return 0 <= K && K <= 1;
        });
        if (V.length > 0) return V[0];
      }
      return null;
    }, "getCurveT"), h = Object.keys(d), m2 = 0; m2 < h.length; m2++) {
      var p = h[m2], y = d[p], b = g(e, t, y);
      if (b != null) {
        var w = y[5], x = y[3], C = y[1], T = or(w, x, C, b);
        if (y.isTop && T <= t || y.isBottom && t <= T) return true;
      }
    }
    return false;
  }, "checkPoint") };
};
Jr.generateBottomRoundrectangle = function() {
  return this.nodeShapes["bottom-round-rectangle"] = this.nodeShapes.bottomroundrectangle = { renderer: this, name: "bottom-round-rectangle", points: wr(4, 0), draw: m(function(e, t, a, n, i, s) {
    this.renderer.nodeShapeImpl(this.name, e, t, a, n, i, this.points, s);
  }, "draw"), intersectLine: m(function(e, t, a, n, i, s, o, l) {
    var u = e - (a / 2 + o), f = t - (n / 2 + o), c = f, d = e + (a / 2 + o), g = st(i, s, e, t, u, f, d, c, false);
    return g.length > 0 ? g : xv(i, s, e, t, a, n, o, l);
  }, "intersectLine"), checkPoint: m(function(e, t, a, n, i, s, o, l) {
    l = l === "auto" ? ft(n, i) : l;
    var u = 2 * l;
    if (Qr(e, t, this.points, s, o, n, i - u, [0, -1], a) || Qr(e, t, this.points, s, o, n - u, i, [0, -1], a)) return true;
    var f = n / 2 + 2 * a, c = i / 2 + 2 * a, d = [s - f, o - c, s - f, o, s + f, o, s + f, o - c];
    return !!(kr(e, t, d) || Bt(e, t, u, u, s + n / 2 - l, o + i / 2 - l, a) || Bt(e, t, u, u, s - n / 2 + l, o + i / 2 - l, a));
  }, "checkPoint") };
};
Jr.registerNodeShapes = function() {
  var r = this.nodeShapes = {}, e = this;
  this.generateEllipse(), this.generatePolygon("triangle", wr(3, 0)), this.generateRoundPolygon("round-triangle", wr(3, 0)), this.generatePolygon("rectangle", wr(4, 0)), r.square = r.rectangle, this.generateRoundRectangle(), this.generateCutRectangle(), this.generateBarrel(), this.generateBottomRoundrectangle();
  {
    var t = [0, 1, 1, 0, 0, -1, -1, 0];
    this.generatePolygon("diamond", t), this.generateRoundPolygon("round-diamond", t);
  }
  this.generatePolygon("pentagon", wr(5, 0)), this.generateRoundPolygon("round-pentagon", wr(5, 0)), this.generatePolygon("hexagon", wr(6, 0)), this.generateRoundPolygon("round-hexagon", wr(6, 0)), this.generatePolygon("heptagon", wr(7, 0)), this.generateRoundPolygon("round-heptagon", wr(7, 0)), this.generatePolygon("octagon", wr(8, 0)), this.generateRoundPolygon("round-octagon", wr(8, 0));
  var a = new Array(20);
  {
    var n = As(5, 0), i = As(5, Math.PI / 5), s = 0.5 * (3 - Math.sqrt(5));
    s *= 1.57;
    for (var o = 0; o < i.length / 2; o++) i[o * 2] *= s, i[o * 2 + 1] *= s;
    for (var o = 0; o < 20 / 4; o++) a[o * 4] = n[o * 2], a[o * 4 + 1] = n[o * 2 + 1], a[o * 4 + 2] = i[o * 2], a[o * 4 + 3] = i[o * 2 + 1];
  }
  a = Ev(a), this.generatePolygon("star", a), this.generatePolygon("vee", [-1, -1, 0, -0.333, 1, -1, 0, 1]), this.generatePolygon("rhomboid", [-1, -1, 0.333, -1, 1, 1, -0.333, 1]), this.generatePolygon("right-rhomboid", [-0.333, -1, 1, -1, 0.333, 1, -1, 1]), this.nodeShapes.concavehexagon = this.generatePolygon("concave-hexagon", [-1, -0.95, -0.75, 0, -1, 0.95, 1, 0.95, 0.75, 0, 1, -0.95]);
  {
    var l = [-1, -1, 0.25, -1, 1, 0, 0.25, 1, -1, 1];
    this.generatePolygon("tag", l), this.generateRoundPolygon("round-tag", l);
  }
  r.makePolygon = function(u) {
    var f = u.join("$"), c = "polygon-" + f, d;
    return (d = this[c]) ? d : e.generatePolygon(c, u);
  };
};
var Wa = {};
Wa.timeToRender = function() {
  return this.redrawTotalTime / this.redrawCount;
};
Wa.redraw = function(r) {
  r = r || yv();
  var e = this;
  e.averageRedrawTime === void 0 && (e.averageRedrawTime = 0), e.lastRedrawTime === void 0 && (e.lastRedrawTime = 0), e.lastDrawTime === void 0 && (e.lastDrawTime = 0), e.requestedFrame = true, e.renderOptions = r;
};
Wa.beforeRender = function(r, e) {
  if (!this.destroyed) {
    e == null && Ue("Priority is not optional for beforeRender");
    var t = this.beforeRenderCallbacks;
    t.push({ fn: r, priority: e }), t.sort(function(a, n) {
      return n.priority - a.priority;
    });
  }
};
var Nl = m(function(e, t, a) {
  for (var n = e.beforeRenderCallbacks, i = 0; i < n.length; i++) n[i].fn(t, a);
}, "beforeRenderCallbacks");
Wa.startRenderLoop = function() {
  var r = this, e = r.cy;
  if (!r.renderLoopStarted) {
    r.renderLoopStarted = true;
    var t = m(function(n) {
      if (!r.destroyed) {
        if (!e.batching()) if (r.requestedFrame && !r.skipFrame) {
          Nl(r, true, n);
          var i = Zr();
          r.render(r.renderOptions);
          var s = r.lastDrawTime = Zr();
          r.averageRedrawTime === void 0 && (r.averageRedrawTime = s - i), r.redrawCount === void 0 && (r.redrawCount = 0), r.redrawCount++, r.redrawTotalTime === void 0 && (r.redrawTotalTime = 0);
          var o = s - i;
          r.redrawTotalTime += o, r.lastRedrawTime = o, r.averageRedrawTime = r.averageRedrawTime / 2 + o / 2, r.requestedFrame = false;
        } else Nl(r, false, n);
        r.skipFrame = false, xn(t);
      }
    }, "renderFn");
    xn(t);
  }
};
var ny = m(function(e) {
  this.init(e);
}, "BaseRenderer");
var Tf = ny;
var oa = Tf.prototype;
oa.clientFunctions = ["redrawHint", "render", "renderTo", "matchCanvasSize", "nodeShapeImpl", "arrowShapeImpl"];
oa.init = function(r) {
  var e = this;
  e.options = r, e.cy = r.cy;
  var t = e.container = r.cy.container(), a = e.cy.window();
  if (a) {
    var n = a.document, i = n.head, s = "__________cytoscape_stylesheet", o = "__________cytoscape_container", l = n.getElementById(s) != null;
    if (t.className.indexOf(o) < 0 && (t.className = (t.className || "") + " " + o), !l) {
      var u = n.createElement("style");
      u.id = s, u.textContent = "." + o + " { position: relative; }", i.insertBefore(u, i.children[0]);
    }
    var f = a.getComputedStyle(t), c = f.getPropertyValue("position");
    c === "static" && qe("A Cytoscape container has style position:static and so can not use UI extensions properly");
  }
  e.selection = [void 0, void 0, void 0, void 0, 0], e.bezierProjPcts = [0.05, 0.225, 0.4, 0.5, 0.6, 0.775, 0.95], e.hoverData = { down: null, last: null, downTime: null, triggerMode: null, dragging: false, initialPan: [null, null], capture: false }, e.dragData = { possibleDragElements: [] }, e.touchData = { start: null, capture: false, startPosition: [null, null, null, null, null, null], singleTouchStartTime: null, singleTouchMoved: true, now: [null, null, null, null, null, null], earlier: [null, null, null, null, null, null] }, e.redraws = 0, e.showFps = r.showFps, e.debug = r.debug, e.webgl = r.webgl, e.hideEdgesOnViewport = r.hideEdgesOnViewport, e.textureOnViewport = r.textureOnViewport, e.wheelSensitivity = r.wheelSensitivity, e.motionBlurEnabled = r.motionBlur, e.forcedPixelRatio = ne(r.pixelRatio) ? r.pixelRatio : null, e.motionBlur = r.motionBlur, e.motionBlurOpacity = r.motionBlurOpacity, e.motionBlurTransparency = 1 - e.motionBlurOpacity, e.motionBlurPxRatio = 1, e.mbPxRBlurry = 1, e.minMbLowQualFrames = 4, e.fullQualityMb = false, e.clearedForMotionBlur = [], e.desktopTapThreshold = r.desktopTapThreshold, e.desktopTapThreshold2 = r.desktopTapThreshold * r.desktopTapThreshold, e.touchTapThreshold = r.touchTapThreshold, e.touchTapThreshold2 = r.touchTapThreshold * r.touchTapThreshold, e.tapholdDuration = 500, e.bindings = [], e.beforeRenderCallbacks = [], e.beforeRenderPriorities = { animations: 400, eleCalcs: 300, eleTxrDeq: 200, lyrTxrDeq: 150, lyrTxrSkip: 100 }, e.registerNodeShapes(), e.registerArrowShapes(), e.registerCalculationListeners();
};
oa.notify = function(r, e) {
  var t = this, a = t.cy;
  if (!this.destroyed) {
    if (r === "init") {
      t.load();
      return;
    }
    if (r === "destroy") {
      t.destroy();
      return;
    }
    (r === "add" || r === "remove" || r === "move" && a.hasCompoundNodes() || r === "load" || r === "zorder" || r === "mount") && t.invalidateCachedZSortedEles(), r === "viewport" && t.redrawHint("select", true), r === "gc" && t.redrawHint("gc", true), (r === "load" || r === "resize" || r === "mount") && (t.invalidateContainerClientCoordsCache(), t.matchCanvasSize(t.container)), t.redrawHint("eles", true), t.redrawHint("drag", true), this.startRenderLoop(), this.redraw();
  }
};
oa.destroy = function() {
  var r = this;
  r.destroyed = true, r.cy.stopAnimationLoop();
  for (var e = 0; e < r.bindings.length; e++) {
    var t = r.bindings[e], a = t, n = a.target;
    (n.off || n.removeEventListener).apply(n, a.args);
  }
  if (r.bindings = [], r.beforeRenderCallbacks = [], r.onUpdateEleCalcsFns = [], r.removeObserver && r.removeObserver.disconnect(), r.styleObserver && r.styleObserver.disconnect(), r.resizeObserver && r.resizeObserver.disconnect(), r.labelCalcDiv) try {
    document.body.removeChild(r.labelCalcDiv);
  } catch {
  }
};
oa.isHeadless = function() {
  return false;
};
[po, Ef, Cf, sa, Jr, Wa].forEach(function(r) {
  we(oa, r);
});
var xs = 1e3 / 60;
var Sf = { setupDequeueing: m(function(e) {
  return m(function() {
    var a = this, n = this.renderer;
    if (!a.dequeueingSetup) {
      a.dequeueingSetup = true;
      var i = Va(function() {
        n.redrawHint("eles", true), n.redrawHint("drag", true), n.redraw();
      }, e.deqRedrawThreshold), s = m(function(u, f) {
        var c = Zr(), d = n.averageRedrawTime, g = n.lastRedrawTime, h = [], m2 = n.cy.extent(), p = n.getPixelRatio();
        for (u || n.flushRenderedStyleQueue(); ; ) {
          var y = Zr(), b = y - c, w = y - f;
          if (g < xs) {
            var x = xs - (u ? d : 0);
            if (w >= e.deqFastCost * x) break;
          } else if (u) {
            if (b >= e.deqCost * g || b >= e.deqAvgCost * d) break;
          } else if (w >= e.deqNoDrawCost * xs) break;
          var C = e.deq(a, p, m2);
          if (C.length > 0) for (var T = 0; T < C.length; T++) h.push(C[T]);
          else break;
        }
        h.length > 0 && (e.onDeqd(a, h), !u && e.shouldRedraw(a, h, p, m2) && i());
      }, "dequeue"), o = e.priority || eo;
      n.beforeRender(s, o(a));
    }
  }, "setupDequeueingImpl");
}, "setupDequeueing") };
var iy = function() {
  function r(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : En;
    gt(this, r), this.idsByKey = new Yr(), this.keyForId = new Yr(), this.cachesByLvl = new Yr(), this.lvls = [], this.getKey = e, this.doesEleInvalidateKey = t;
  }
  return m(r, "ElementTextureCacheLookup"), pt(r, [{ key: "getIdsFor", value: m(function(t) {
    t == null && Ue("Can not get id list for null key");
    var a = this.idsByKey, n = this.idsByKey.get(t);
    return n || (n = new ta(), a.set(t, n)), n;
  }, "getIdsFor") }, { key: "addIdForKey", value: m(function(t, a) {
    t != null && this.getIdsFor(t).add(a);
  }, "addIdForKey") }, { key: "deleteIdForKey", value: m(function(t, a) {
    t != null && this.getIdsFor(t).delete(a);
  }, "deleteIdForKey") }, { key: "getNumberOfIdsForKey", value: m(function(t) {
    return t == null ? 0 : this.getIdsFor(t).size;
  }, "getNumberOfIdsForKey") }, { key: "updateKeyMappingFor", value: m(function(t) {
    var a = t.id(), n = this.keyForId.get(a), i = this.getKey(t);
    this.deleteIdForKey(n, a), this.addIdForKey(i, a), this.keyForId.set(a, i);
  }, "updateKeyMappingFor") }, { key: "deleteKeyMappingFor", value: m(function(t) {
    var a = t.id(), n = this.keyForId.get(a);
    this.deleteIdForKey(n, a), this.keyForId.delete(a);
  }, "deleteKeyMappingFor") }, { key: "keyHasChangedFor", value: m(function(t) {
    var a = t.id(), n = this.keyForId.get(a), i = this.getKey(t);
    return n !== i;
  }, "keyHasChangedFor") }, { key: "isInvalid", value: m(function(t) {
    return this.keyHasChangedFor(t) || this.doesEleInvalidateKey(t);
  }, "isInvalid") }, { key: "getCachesAt", value: m(function(t) {
    var a = this.cachesByLvl, n = this.lvls, i = a.get(t);
    return i || (i = new Yr(), a.set(t, i), n.push(t)), i;
  }, "getCachesAt") }, { key: "getCache", value: m(function(t, a) {
    return this.getCachesAt(a).get(t);
  }, "getCache") }, { key: "get", value: m(function(t, a) {
    var n = this.getKey(t), i = this.getCache(n, a);
    return i != null && this.updateKeyMappingFor(t), i;
  }, "get") }, { key: "getForCachedKey", value: m(function(t, a) {
    var n = this.keyForId.get(t.id()), i = this.getCache(n, a);
    return i;
  }, "getForCachedKey") }, { key: "hasCache", value: m(function(t, a) {
    return this.getCachesAt(a).has(t);
  }, "hasCache") }, { key: "has", value: m(function(t, a) {
    var n = this.getKey(t);
    return this.hasCache(n, a);
  }, "has") }, { key: "setCache", value: m(function(t, a, n) {
    n.key = t, this.getCachesAt(a).set(t, n);
  }, "setCache") }, { key: "set", value: m(function(t, a, n) {
    var i = this.getKey(t);
    this.setCache(i, a, n), this.updateKeyMappingFor(t);
  }, "set") }, { key: "deleteCache", value: m(function(t, a) {
    this.getCachesAt(a).delete(t);
  }, "deleteCache") }, { key: "delete", value: m(function(t, a) {
    var n = this.getKey(t);
    this.deleteCache(n, a);
  }, "_delete") }, { key: "invalidateKey", value: m(function(t) {
    var a = this;
    this.lvls.forEach(function(n) {
      return a.deleteCache(t, n);
    });
  }, "invalidateKey") }, { key: "invalidate", value: m(function(t) {
    var a = t.id(), n = this.keyForId.get(a);
    this.deleteKeyMappingFor(t);
    var i = this.doesEleInvalidateKey(t);
    return i && this.invalidateKey(n), i || this.getNumberOfIdsForKey(n) === 0;
  }, "invalidate") }]);
}();
var zl = 25;
var sn = 50;
var yn = -4;
var Ws = 3;
var kf = 7.99;
var sy = 8;
var oy = 1024;
var uy = 1024;
var ly = 1024;
var vy = 0.2;
var fy = 0.8;
var cy = 10;
var dy = 0.15;
var hy = 0.1;
var gy = 0.9;
var py = 0.9;
var yy = 100;
var my = 1;
var Kt = { dequeue: "dequeue", downscale: "downscale", highQuality: "highQuality" };
var by = dr({ getKey: null, doesEleInvalidateKey: En, drawElement: null, getBoundingBox: null, getRotationPoint: null, getRotationOffset: null, isVisible: hv, allowEdgeTxrCaching: true, allowParentTxrCaching: true });
var wa = m(function(e, t) {
  var a = this;
  a.renderer = e, a.onDequeues = [];
  var n = by(t);
  we(a, n), a.lookup = new iy(n.getKey, n.doesEleInvalidateKey), a.setupDequeueing();
}, "ElementTextureCache");
var ir = wa.prototype;
ir.reasons = Kt;
ir.getTextureQueue = function(r) {
  var e = this;
  return e.eleImgCaches = e.eleImgCaches || {}, e.eleImgCaches[r] = e.eleImgCaches[r] || [];
};
ir.getRetiredTextureQueue = function(r) {
  var e = this, t = e.eleImgCaches.retired = e.eleImgCaches.retired || {}, a = t[r] = t[r] || [];
  return a;
};
ir.getElementQueue = function() {
  var r = this, e = r.eleCacheQueue = r.eleCacheQueue || new qa(function(t, a) {
    return a.reqs - t.reqs;
  });
  return e;
};
ir.getElementKeyToQueue = function() {
  var r = this, e = r.eleKeyToCacheQueue = r.eleKeyToCacheQueue || {};
  return e;
};
ir.getElement = function(r, e, t, a, n) {
  var i = this, s = this.renderer, o = s.cy.zoom(), l = this.lookup;
  if (!e || e.w === 0 || e.h === 0 || isNaN(e.w) || isNaN(e.h) || !r.visible() || r.removed() || !i.allowEdgeTxrCaching && r.isEdge() || !i.allowParentTxrCaching && r.isParent()) return null;
  if (a == null && (a = Math.ceil(to(o * t))), a < yn) a = yn;
  else if (o >= kf || a > Ws) return null;
  var u = Math.pow(2, a), f = e.h * u, c = e.w * u, d = s.eleTextBiggerThanMin(r, u);
  if (!this.isVisible(r, d)) return null;
  var g = l.get(r, a);
  if (g && g.invalidated && (g.invalidated = false, g.texture.invalidatedWidth -= g.width), g) return g;
  var h;
  if (f <= zl ? h = zl : f <= sn ? h = sn : h = Math.ceil(f / sn) * sn, f > ly || c > uy) return null;
  var m2 = i.getTextureQueue(h), p = m2[m2.length - 2], y = m(function() {
    return i.recycleTexture(h, c) || i.addTexture(h, c);
  }, "addNewTxr");
  p || (p = m2[m2.length - 1]), p || (p = y()), p.width - p.usedWidth < c && (p = y());
  for (var b = m(function(O) {
    return O && O.scaledLabelShown === d;
  }, "scalableFrom"), w = n && n === Kt.dequeue, x = n && n === Kt.highQuality, C = n && n === Kt.downscale, T, E = a + 1; E <= Ws; E++) {
    var S = l.get(r, E);
    if (S) {
      T = S;
      break;
    }
  }
  var D = T && T.level === a + 1 ? T : null, B = m(function() {
    p.context.drawImage(D.texture.canvas, D.x, 0, D.width, D.height, p.usedWidth, 0, c, f);
  }, "downscale");
  if (p.context.setTransform(1, 0, 0, 1, 0, 0), p.context.clearRect(p.usedWidth, 0, c, h), b(D)) B();
  else if (b(T)) if (x) {
    for (var P = T.level; P > a; P--) D = i.getElement(r, e, t, P, Kt.downscale);
    B();
  } else return i.queueElement(r, T.level - 1), T;
  else {
    var A;
    if (!w && !x && !C) for (var R = a - 1; R >= yn; R--) {
      var M = l.get(r, R);
      if (M) {
        A = M;
        break;
      }
    }
    if (b(A)) return i.queueElement(r, a), A;
    p.context.translate(p.usedWidth, 0), p.context.scale(u, u), this.drawElement(p.context, r, e, d, false), p.context.scale(1 / u, 1 / u), p.context.translate(-p.usedWidth, 0);
  }
  return g = { x: p.usedWidth, texture: p, level: a, scale: u, width: c, height: f, scaledLabelShown: d }, p.usedWidth += Math.ceil(c + sy), p.eleCaches.push(g), l.set(r, a, g), i.checkTextureFullness(p), g;
};
ir.invalidateElements = function(r) {
  for (var e = 0; e < r.length; e++) this.invalidateElement(r[e]);
};
ir.invalidateElement = function(r) {
  var e = this, t = e.lookup, a = [], n = t.isInvalid(r);
  if (n) {
    for (var i = yn; i <= Ws; i++) {
      var s = t.getForCachedKey(r, i);
      s && a.push(s);
    }
    var o = t.invalidate(r);
    if (o) for (var l = 0; l < a.length; l++) {
      var u = a[l], f = u.texture;
      f.invalidatedWidth += u.width, u.invalidated = true, e.checkTextureUtility(f);
    }
    e.removeFromQueue(r);
  }
};
ir.checkTextureUtility = function(r) {
  r.invalidatedWidth >= vy * r.width && this.retireTexture(r);
};
ir.checkTextureFullness = function(r) {
  var e = this, t = e.getTextureQueue(r.height);
  r.usedWidth / r.width > fy && r.fullnessChecks >= cy ? vt(t, r) : r.fullnessChecks++;
};
ir.retireTexture = function(r) {
  var e = this, t = r.height, a = e.getTextureQueue(t), n = this.lookup;
  vt(a, r), r.retired = true;
  for (var i = r.eleCaches, s = 0; s < i.length; s++) {
    var o = i[s];
    n.deleteCache(o.key, o.level);
  }
  ro(i);
  var l = e.getRetiredTextureQueue(t);
  l.push(r);
};
ir.addTexture = function(r, e) {
  var t = this, a = t.getTextureQueue(r), n = {};
  return a.push(n), n.eleCaches = [], n.height = r, n.width = Math.max(oy, e), n.usedWidth = 0, n.invalidatedWidth = 0, n.fullnessChecks = 0, n.canvas = t.renderer.makeOffscreenCanvas(n.width, n.height), n.context = n.canvas.getContext("2d"), n;
};
ir.recycleTexture = function(r, e) {
  for (var t = this, a = t.getTextureQueue(r), n = t.getRetiredTextureQueue(r), i = 0; i < n.length; i++) {
    var s = n[i];
    if (s.width >= e) return s.retired = false, s.usedWidth = 0, s.invalidatedWidth = 0, s.fullnessChecks = 0, ro(s.eleCaches), s.context.setTransform(1, 0, 0, 1, 0, 0), s.context.clearRect(0, 0, s.width, s.height), vt(n, s), a.push(s), s;
  }
};
ir.queueElement = function(r, e) {
  var t = this, a = t.getElementQueue(), n = t.getElementKeyToQueue(), i = this.getKey(r), s = n[i];
  if (s) s.level = Math.max(s.level, e), s.eles.merge(r), s.reqs++, a.updateItem(s);
  else {
    var o = { eles: r.spawn().merge(r), level: e, reqs: 1, key: i };
    a.push(o), n[i] = o;
  }
};
ir.dequeue = function(r) {
  for (var e = this, t = e.getElementQueue(), a = e.getElementKeyToQueue(), n = [], i = e.lookup, s = 0; s < my && t.size() > 0; s++) {
    var o = t.pop(), l = o.key, u = o.eles[0], f = i.hasCache(u, o.level);
    if (a[l] = null, f) continue;
    n.push(o);
    var c = e.getBoundingBox(u);
    e.getElement(u, c, r, o.level, Kt.dequeue);
  }
  return n;
};
ir.removeFromQueue = function(r) {
  var e = this, t = e.getElementQueue(), a = e.getElementKeyToQueue(), n = this.getKey(r), i = a[n];
  i != null && (i.eles.length === 1 ? (i.reqs = js, t.updateItem(i), t.pop(), a[n] = null) : i.eles.unmerge(r));
};
ir.onDequeue = function(r) {
  this.onDequeues.push(r);
};
ir.offDequeue = function(r) {
  vt(this.onDequeues, r);
};
ir.setupDequeueing = Sf.setupDequeueing({ deqRedrawThreshold: yy, deqCost: dy, deqAvgCost: hy, deqNoDrawCost: gy, deqFastCost: py, deq: m(function(e, t, a) {
  return e.dequeue(t, a);
}, "deq"), onDeqd: m(function(e, t) {
  for (var a = 0; a < e.onDequeues.length; a++) {
    var n = e.onDequeues[a];
    n(t);
  }
}, "onDeqd"), shouldRedraw: m(function(e, t, a, n) {
  for (var i = 0; i < t.length; i++) for (var s = t[i].eles, o = 0; o < s.length; o++) {
    var l = s[o].boundingBox();
    if (no(l, n)) return true;
  }
  return false;
}, "shouldRedraw"), priority: m(function(e) {
  return e.renderer.beforeRenderPriorities.eleTxrDeq;
}, "priority") });
var wy = 1;
var Ea = -4;
var An = 2;
var xy = 3.99;
var Ey = 50;
var Cy = 50;
var Ty = 0.15;
var Sy = 0.1;
var ky = 0.9;
var Dy = 0.9;
var By = 1;
var Fl = 250;
var Py = 4e3 * 4e3;
var Vl = 32767;
var Ay = true;
var Df = m(function(e) {
  var t = this, a = t.renderer = e, n = a.cy;
  t.layersByLevel = {}, t.firstGet = true, t.lastInvalidationTime = Zr() - 2 * Fl, t.skipping = false, t.eleTxrDeqs = n.collection(), t.scheduleElementRefinement = Va(function() {
    t.refineElementTextures(t.eleTxrDeqs), t.eleTxrDeqs.unmerge(t.eleTxrDeqs);
  }, Cy), a.beforeRender(function(s, o) {
    o - t.lastInvalidationTime <= Fl ? t.skipping = true : t.skipping = false;
  }, a.beforeRenderPriorities.lyrTxrSkip);
  var i = m(function(o, l) {
    return l.reqs - o.reqs;
  }, "qSort");
  t.layersQueue = new qa(i), t.setupDequeueing();
}, "LayeredTextureCache");
var hr = Df.prototype;
var ql = 0;
var Ry = Math.pow(2, 53) - 1;
hr.makeLayer = function(r, e) {
  var t = Math.pow(2, e), a = Math.ceil(r.w * t), n = Math.ceil(r.h * t), i = this.renderer.makeOffscreenCanvas(a, n), s = { id: ql = ++ql % Ry, bb: r, level: e, width: a, height: n, canvas: i, context: i.getContext("2d"), eles: [], elesQueue: [], reqs: 0 }, o = s.context, l = -s.bb.x1, u = -s.bb.y1;
  return o.scale(t, t), o.translate(l, u), s;
};
hr.getLayers = function(r, e, t) {
  var a = this, n = a.renderer, i = n.cy, s = i.zoom(), o = a.firstGet;
  if (a.firstGet = false, t == null) {
    if (t = Math.ceil(to(s * e)), t < Ea) t = Ea;
    else if (s >= xy || t > An) return null;
  }
  a.validateLayersElesOrdering(t, r);
  var l = a.layersByLevel, u = Math.pow(2, t), f = l[t] = l[t] || [], c, d = a.levelIsComplete(t, r), g, h = m(function() {
    var B = m(function(I) {
      if (a.validateLayersElesOrdering(I, r), a.levelIsComplete(I, r)) return g = l[I], true;
    }, "canUseAsTmpLvl"), P = m(function(I) {
      if (!g) for (var O = t + I; Ea <= O && O <= An && !B(O); O += I) ;
    }, "checkLvls");
    P(1), P(-1);
    for (var A = f.length - 1; A >= 0; A--) {
      var R = f[A];
      R.invalid && vt(f, R);
    }
  }, "checkTempLevels");
  if (!d) h();
  else return f;
  var m2 = m(function() {
    if (!c) {
      c = xr();
      for (var B = 0; B < r.length; B++) Bd(c, r[B].boundingBox());
    }
    return c;
  }, "getBb"), p = m(function(B) {
    B = B || {};
    var P = B.after;
    m2();
    var A = Math.ceil(c.w * u), R = Math.ceil(c.h * u);
    if (A > Vl || R > Vl) return null;
    var M = A * R;
    if (M > Py) return null;
    var I = a.makeLayer(c, t);
    if (P != null) {
      var O = f.indexOf(P) + 1;
      f.splice(O, 0, I);
    } else (B.insert === void 0 || B.insert) && f.unshift(I);
    return I;
  }, "makeLayer");
  if (a.skipping && !o) return null;
  for (var y = null, b = r.length / wy, w = !o, x = 0; x < r.length; x++) {
    var C = r[x], T = C._private.rscratch, E = T.imgLayerCaches = T.imgLayerCaches || {}, S = E[t];
    if (S) {
      y = S;
      continue;
    }
    if ((!y || y.eles.length >= b || !wv(y.bb, C.boundingBox())) && (y = p({ insert: true, after: y }), !y)) return null;
    g || w ? a.queueLayer(y, C) : a.drawEleInLayer(y, C, t, e), y.eles.push(C), E[t] = y;
  }
  return g || (w ? null : f);
};
hr.getEleLevelForLayerLevel = function(r, e) {
  return r;
};
hr.drawEleInLayer = function(r, e, t, a) {
  var n = this, i = this.renderer, s = r.context, o = e.boundingBox();
  o.w === 0 || o.h === 0 || !e.visible() || (t = n.getEleLevelForLayerLevel(t, a), i.setImgSmoothing(s, false), i.drawCachedElement(s, e, null, null, t, Ay), i.setImgSmoothing(s, true));
};
hr.levelIsComplete = function(r, e) {
  var t = this, a = t.layersByLevel[r];
  if (!a || a.length === 0) return false;
  for (var n = 0, i = 0; i < a.length; i++) {
    var s = a[i];
    if (s.reqs > 0 || s.invalid) return false;
    n += s.eles.length;
  }
  return n === e.length;
};
hr.validateLayersElesOrdering = function(r, e) {
  var t = this.layersByLevel[r];
  if (t) for (var a = 0; a < t.length; a++) {
    for (var n = t[a], i = -1, s = 0; s < e.length; s++) if (n.eles[0] === e[s]) {
      i = s;
      break;
    }
    if (i < 0) {
      this.invalidateLayer(n);
      continue;
    }
    for (var o = i, s = 0; s < n.eles.length; s++) if (n.eles[s] !== e[o + s]) {
      this.invalidateLayer(n);
      break;
    }
  }
};
hr.updateElementsInLayers = function(r, e) {
  for (var t = this, a = Oa(r[0]), n = 0; n < r.length; n++) for (var i = a ? null : r[n], s = a ? r[n] : r[n].ele, o = s._private.rscratch, l = o.imgLayerCaches = o.imgLayerCaches || {}, u = Ea; u <= An; u++) {
    var f = l[u];
    f && (i && t.getEleLevelForLayerLevel(f.level) !== i.level || e(f, s, i));
  }
};
hr.haveLayers = function() {
  for (var r = this, e = false, t = Ea; t <= An; t++) {
    var a = r.layersByLevel[t];
    if (a && a.length > 0) {
      e = true;
      break;
    }
  }
  return e;
};
hr.invalidateElements = function(r) {
  var e = this;
  r.length !== 0 && (e.lastInvalidationTime = Zr(), !(r.length === 0 || !e.haveLayers()) && e.updateElementsInLayers(r, m(function(a, n, i) {
    e.invalidateLayer(a);
  }, "invalAssocLayers")));
};
hr.invalidateLayer = function(r) {
  if (this.lastInvalidationTime = Zr(), !r.invalid) {
    var e = r.level, t = r.eles, a = this.layersByLevel[e];
    vt(a, r), r.elesQueue = [], r.invalid = true, r.replacement && (r.replacement.invalid = true);
    for (var n = 0; n < t.length; n++) {
      var i = t[n]._private.rscratch.imgLayerCaches;
      i && (i[e] = null);
    }
  }
};
hr.refineElementTextures = function(r) {
  var e = this;
  e.updateElementsInLayers(r, m(function(a, n, i) {
    var s = a.replacement;
    if (s || (s = a.replacement = e.makeLayer(a.bb, a.level), s.replaces = a, s.eles = a.eles), !s.reqs) for (var o = 0; o < s.eles.length; o++) e.queueLayer(s, s.eles[o]);
  }, "refineEachEle"));
};
hr.enqueueElementRefinement = function(r) {
  this.eleTxrDeqs.merge(r), this.scheduleElementRefinement();
};
hr.queueLayer = function(r, e) {
  var t = this, a = t.layersQueue, n = r.elesQueue, i = n.hasId = n.hasId || {};
  if (!r.replacement) {
    if (e) {
      if (i[e.id()]) return;
      n.push(e), i[e.id()] = true;
    }
    r.reqs ? (r.reqs++, a.updateItem(r)) : (r.reqs = 1, a.push(r));
  }
};
hr.dequeue = function(r) {
  for (var e = this, t = e.layersQueue, a = [], n = 0; n < By && t.size() !== 0; ) {
    var i = t.peek();
    if (i.replacement) {
      t.pop();
      continue;
    }
    if (i.replaces && i !== i.replaces.replacement) {
      t.pop();
      continue;
    }
    if (i.invalid) {
      t.pop();
      continue;
    }
    var s = i.elesQueue.shift();
    s && (e.drawEleInLayer(i, s, i.level, r), n++), a.length === 0 && a.push(true), i.elesQueue.length === 0 && (t.pop(), i.reqs = 0, i.replaces && e.applyLayerReplacement(i), e.requestRedraw());
  }
  return a;
};
hr.applyLayerReplacement = function(r) {
  var e = this, t = e.layersByLevel[r.level], a = r.replaces, n = t.indexOf(a);
  if (!(n < 0 || a.invalid)) {
    t[n] = r;
    for (var i = 0; i < r.eles.length; i++) {
      var s = r.eles[i]._private, o = s.imgLayerCaches = s.imgLayerCaches || {};
      o && (o[r.level] = r);
    }
    e.requestRedraw();
  }
};
hr.requestRedraw = Va(function() {
  var r = this.renderer;
  r.redrawHint("eles", true), r.redrawHint("drag", true), r.redraw();
}, 100);
hr.setupDequeueing = Sf.setupDequeueing({ deqRedrawThreshold: Ey, deqCost: Ty, deqAvgCost: Sy, deqNoDrawCost: ky, deqFastCost: Dy, deq: m(function(e, t) {
  return e.dequeue(t);
}, "deq"), onDeqd: eo, shouldRedraw: hv, priority: m(function(e) {
  return e.renderer.beforeRenderPriorities.lyrTxrDeq;
}, "priority") });
var Bf = {};
var _l;
function My(r, e) {
  for (var t = 0; t < e.length; t++) {
    var a = e[t];
    r.lineTo(a.x, a.y);
  }
}
m(My, "polygon");
function Ly(r, e, t) {
  for (var a, n = 0; n < e.length; n++) {
    var i = e[n];
    n === 0 && (a = i), r.lineTo(i.x, i.y);
  }
  r.quadraticCurveTo(t.x, t.y, a.x, a.y);
}
m(Ly, "triangleBackcurve");
function Gl(r, e, t) {
  r.beginPath && r.beginPath();
  for (var a = e, n = 0; n < a.length; n++) {
    var i = a[n];
    r.lineTo(i.x, i.y);
  }
  var s = t, o = t[0];
  r.moveTo(o.x, o.y);
  for (var n = 1; n < s.length; n++) {
    var i = s[n];
    r.lineTo(i.x, i.y);
  }
  r.closePath && r.closePath();
}
m(Gl, "triangleTee");
function Iy(r, e, t, a, n) {
  r.beginPath && r.beginPath(), r.arc(t, a, n, 0, Math.PI * 2, false);
  var i = e, s = i[0];
  r.moveTo(s.x, s.y);
  for (var o = 0; o < i.length; o++) {
    var l = i[o];
    r.lineTo(l.x, l.y);
  }
  r.closePath && r.closePath();
}
m(Iy, "circleTriangle");
function Oy(r, e, t, a) {
  r.arc(e, t, a, 0, Math.PI * 2, false);
}
m(Oy, "circle$1");
Bf.arrowShapeImpl = function(r) {
  return (_l || (_l = { polygon: My, "triangle-backcurve": Ly, "triangle-tee": Gl, "circle-triangle": Iy, "triangle-cross": Gl, circle: Oy }))[r];
};
var Wr = {};
Wr.drawElement = function(r, e, t, a, n, i) {
  var s = this;
  e.isNode() ? s.drawNode(r, e, t, a, n, i) : s.drawEdge(r, e, t, a, n, i);
};
Wr.drawElementOverlay = function(r, e) {
  var t = this;
  e.isNode() ? t.drawNodeOverlay(r, e) : t.drawEdgeOverlay(r, e);
};
Wr.drawElementUnderlay = function(r, e) {
  var t = this;
  e.isNode() ? t.drawNodeUnderlay(r, e) : t.drawEdgeUnderlay(r, e);
};
Wr.drawCachedElementPortion = function(r, e, t, a, n, i, s, o) {
  var l = this, u = t.getBoundingBox(e);
  if (!(u.w === 0 || u.h === 0)) {
    var f = t.getElement(e, u, a, n, i);
    if (f != null) {
      var c = o(l, e);
      if (c === 0) return;
      var d = s(l, e), g = u.x1, h = u.y1, m2 = u.w, p = u.h, y, b, w, x, C;
      if (d !== 0) {
        var T = t.getRotationPoint(e);
        w = T.x, x = T.y, r.translate(w, x), r.rotate(d), C = l.getImgSmoothing(r), C || l.setImgSmoothing(r, true);
        var E = t.getRotationOffset(e);
        y = E.x, b = E.y;
      } else y = g, b = h;
      var S;
      c !== 1 && (S = r.globalAlpha, r.globalAlpha = S * c), r.drawImage(f.texture.canvas, f.x, 0, f.width, f.height, y, b, m2, p), c !== 1 && (r.globalAlpha = S), d !== 0 && (r.rotate(-d), r.translate(-w, -x), C || l.setImgSmoothing(r, false));
    } else t.drawElement(r, e);
  }
};
var Ny = m(function() {
  return 0;
}, "getZeroRotation");
var zy = m(function(e, t) {
  return e.getTextAngle(t, null);
}, "getLabelRotation");
var Fy = m(function(e, t) {
  return e.getTextAngle(t, "source");
}, "getSourceLabelRotation");
var Vy = m(function(e, t) {
  return e.getTextAngle(t, "target");
}, "getTargetLabelRotation");
var qy = m(function(e, t) {
  return t.effectiveOpacity();
}, "getOpacity");
var Es = m(function(e, t) {
  return t.pstyle("text-opacity").pfValue * t.effectiveOpacity();
}, "getTextOpacity");
Wr.drawCachedElement = function(r, e, t, a, n, i) {
  var s = this, o = s.data, l = o.eleTxrCache, u = o.lblTxrCache, f = o.slbTxrCache, c = o.tlbTxrCache, d = e.boundingBox(), g = i === true ? l.reasons.highQuality : null;
  if (!(d.w === 0 || d.h === 0 || !e.visible()) && (!a || no(d, a))) {
    var h = e.isEdge(), m2 = e.element()._private.rscratch.badLine;
    s.drawElementUnderlay(r, e), s.drawCachedElementPortion(r, e, l, t, n, g, Ny, qy), (!h || !m2) && s.drawCachedElementPortion(r, e, u, t, n, g, zy, Es), h && !m2 && (s.drawCachedElementPortion(r, e, f, t, n, g, Fy, Es), s.drawCachedElementPortion(r, e, c, t, n, g, Vy, Es)), s.drawElementOverlay(r, e);
  }
};
Wr.drawElements = function(r, e) {
  for (var t = this, a = 0; a < e.length; a++) {
    var n = e[a];
    t.drawElement(r, n);
  }
};
Wr.drawCachedElements = function(r, e, t, a) {
  for (var n = this, i = 0; i < e.length; i++) {
    var s = e[i];
    n.drawCachedElement(r, s, t, a);
  }
};
Wr.drawCachedNodes = function(r, e, t, a) {
  for (var n = this, i = 0; i < e.length; i++) {
    var s = e[i];
    s.isNode() && n.drawCachedElement(r, s, t, a);
  }
};
Wr.drawLayeredElements = function(r, e, t, a) {
  var n = this, i = n.data.lyrTxrCache.getLayers(e, t);
  if (i) for (var s = 0; s < i.length; s++) {
    var o = i[s], l = o.bb;
    l.w === 0 || l.h === 0 || r.drawImage(o.canvas, l.x1, l.y1, l.w, l.h);
  }
  else n.drawCachedElements(r, e, t, a);
};
var jr = {};
jr.drawEdge = function(r, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true, s = this, o = e._private.rscratch;
  if (!(i && !e.visible()) && !(o.badLine || o.allpts == null || isNaN(o.allpts[0]))) {
    var l;
    t && (l = t, r.translate(-l.x1, -l.y1));
    var u = i ? e.pstyle("opacity").value : 1, f = i ? e.pstyle("line-opacity").value : 1, c = e.pstyle("curve-style").value, d = e.pstyle("line-style").value, g = e.pstyle("width").pfValue, h = e.pstyle("line-cap").value, m2 = e.pstyle("line-outline-width").value, p = e.pstyle("line-outline-color").value, y = u * f, b = u * f, w = m(function() {
      var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y;
      c === "straight-triangle" ? (s.eleStrokeStyle(r, e, I), s.drawEdgeTrianglePath(e, r, o.allpts)) : (r.lineWidth = g, r.lineCap = h, s.eleStrokeStyle(r, e, I), s.drawEdgePath(e, r, o.allpts, d), r.lineCap = "butt");
    }, "drawLine"), x = m(function() {
      var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y;
      if (r.lineWidth = g + m2, r.lineCap = h, m2 > 0) s.colorStrokeStyle(r, p[0], p[1], p[2], I);
      else {
        r.lineCap = "butt";
        return;
      }
      c === "straight-triangle" ? s.drawEdgeTrianglePath(e, r, o.allpts) : (s.drawEdgePath(e, r, o.allpts, d), r.lineCap = "butt");
    }, "drawLineOutline"), C = m(function() {
      n && s.drawEdgeOverlay(r, e);
    }, "drawOverlay"), T = m(function() {
      n && s.drawEdgeUnderlay(r, e);
    }, "drawUnderlay"), E = m(function() {
      var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : b;
      s.drawArrowheads(r, e, I);
    }, "drawArrows"), S = m(function() {
      s.drawElementText(r, e, null, a);
    }, "drawText");
    r.lineJoin = "round";
    var D = e.pstyle("ghost").value === "yes";
    if (D) {
      var B = e.pstyle("ghost-offset-x").pfValue, P = e.pstyle("ghost-offset-y").pfValue, A = e.pstyle("ghost-opacity").value, R = y * A;
      r.translate(B, P), w(R), E(R), r.translate(-B, -P);
    } else x();
    T(), w(), E(), C(), S(), t && r.translate(l.x1, l.y1);
  }
};
var Pf = m(function(e) {
  if (!["overlay", "underlay"].includes(e)) throw new Error("Invalid state");
  return function(t, a) {
    if (a.visible()) {
      var n = a.pstyle("".concat(e, "-opacity")).value;
      if (n !== 0) {
        var i = this, s = i.usePaths(), o = a._private.rscratch, l = a.pstyle("".concat(e, "-padding")).pfValue, u = 2 * l, f = a.pstyle("".concat(e, "-color")).value;
        t.lineWidth = u, o.edgeType === "self" && !s ? t.lineCap = "butt" : t.lineCap = "round", i.colorStrokeStyle(t, f[0], f[1], f[2], n), i.drawEdgePath(a, t, o.allpts, "solid");
      }
    }
  };
}, "drawEdgeOverlayUnderlay");
jr.drawEdgeOverlay = Pf("overlay");
jr.drawEdgeUnderlay = Pf("underlay");
jr.drawEdgePath = function(r, e, t, a) {
  var n = r._private.rscratch, i = e, s, o = false, l = this.usePaths(), u = r.pstyle("line-dash-pattern").pfValue, f = r.pstyle("line-dash-offset").pfValue;
  if (l) {
    var c = t.join("$"), d = n.pathCacheKey && n.pathCacheKey === c;
    d ? (s = e = n.pathCache, o = true) : (s = e = new Path2D(), n.pathCacheKey = c, n.pathCache = s);
  }
  if (i.setLineDash) switch (a) {
    case "dotted":
      i.setLineDash([1, 1]);
      break;
    case "dashed":
      i.setLineDash(u), i.lineDashOffset = f;
      break;
    case "solid":
      i.setLineDash([]);
      break;
  }
  if (!o && !n.badLine) switch (e.beginPath && e.beginPath(), e.moveTo(t[0], t[1]), n.edgeType) {
    case "bezier":
    case "self":
    case "compound":
    case "multibezier":
      for (var g = 2; g + 3 < t.length; g += 4) e.quadraticCurveTo(t[g], t[g + 1], t[g + 2], t[g + 3]);
      break;
    case "straight":
    case "haystack":
      for (var h = 2; h + 1 < t.length; h += 2) e.lineTo(t[h], t[h + 1]);
      break;
    case "segments":
      if (n.isRound) {
        var m2 = Dr(n.roundCorners), p;
        try {
          for (m2.s(); !(p = m2.n()).done; ) {
            var y = p.value;
            yf(e, y);
          }
        } catch (w) {
          m2.e(w);
        } finally {
          m2.f();
        }
        e.lineTo(t[t.length - 2], t[t.length - 1]);
      } else for (var b = 2; b + 1 < t.length; b += 2) e.lineTo(t[b], t[b + 1]);
      break;
  }
  e = i, l ? e.stroke(s) : e.stroke(), e.setLineDash && e.setLineDash([]);
};
jr.drawEdgeTrianglePath = function(r, e, t) {
  e.fillStyle = e.strokeStyle;
  for (var a = r.pstyle("width").pfValue, n = 0; n + 1 < t.length; n += 2) {
    var i = [t[n + 2] - t[n], t[n + 3] - t[n + 1]], s = Math.sqrt(i[0] * i[0] + i[1] * i[1]), o = [i[1] / s, -i[0] / s], l = [o[0] * a / 2, o[1] * a / 2];
    e.beginPath(), e.moveTo(t[n] - l[0], t[n + 1] - l[1]), e.lineTo(t[n] + l[0], t[n + 1] + l[1]), e.lineTo(t[n + 2], t[n + 3]), e.closePath(), e.fill();
  }
};
jr.drawArrowheads = function(r, e, t) {
  var a = e._private.rscratch, n = a.edgeType === "haystack";
  n || this.drawArrowhead(r, e, "source", a.arrowStartX, a.arrowStartY, a.srcArrowAngle, t), this.drawArrowhead(r, e, "mid-target", a.midX, a.midY, a.midtgtArrowAngle, t), this.drawArrowhead(r, e, "mid-source", a.midX, a.midY, a.midsrcArrowAngle, t), n || this.drawArrowhead(r, e, "target", a.arrowEndX, a.arrowEndY, a.tgtArrowAngle, t);
};
jr.drawArrowhead = function(r, e, t, a, n, i, s) {
  if (!(isNaN(a) || a == null || isNaN(n) || n == null || isNaN(i) || i == null)) {
    var o = this, l = e.pstyle(t + "-arrow-shape").value;
    if (l !== "none") {
      var u = e.pstyle(t + "-arrow-fill").value === "hollow" ? "both" : "filled", f = e.pstyle(t + "-arrow-fill").value, c = e.pstyle("width").pfValue, d = e.pstyle(t + "-arrow-width"), g = d.value === "match-line" ? c : d.pfValue;
      d.units === "%" && (g *= c);
      var h = e.pstyle("opacity").value;
      s === void 0 && (s = h);
      var m2 = r.globalCompositeOperation;
      (s !== 1 || f === "hollow") && (r.globalCompositeOperation = "destination-out", o.colorFillStyle(r, 255, 255, 255, 1), o.colorStrokeStyle(r, 255, 255, 255, 1), o.drawArrowShape(e, r, u, c, l, g, a, n, i), r.globalCompositeOperation = m2);
      var p = e.pstyle(t + "-arrow-color").value;
      o.colorFillStyle(r, p[0], p[1], p[2], s), o.colorStrokeStyle(r, p[0], p[1], p[2], s), o.drawArrowShape(e, r, f, c, l, g, a, n, i);
    }
  }
};
jr.drawArrowShape = function(r, e, t, a, n, i, s, o, l) {
  var u = this, f = this.usePaths() && n !== "triangle-cross", c = false, d, g = e, h = { x: s, y: o }, m2 = r.pstyle("arrow-scale").value, p = this.getArrowWidth(a, m2), y = u.arrowShapes[n];
  if (f) {
    var b = u.arrowPathCache = u.arrowPathCache || [], w = Pt(n), x = b[w];
    x != null ? (d = e = x, c = true) : (d = e = new Path2D(), b[w] = d);
  }
  c || (e.beginPath && e.beginPath(), f ? y.draw(e, 1, 0, { x: 0, y: 0 }, 1) : y.draw(e, p, l, h, a), e.closePath && e.closePath()), e = g, f && (e.translate(s, o), e.rotate(l), e.scale(p, p)), (t === "filled" || t === "both") && (f ? e.fill(d) : e.fill()), (t === "hollow" || t === "both") && (e.lineWidth = i / (f ? p : 1), e.lineJoin = "miter", f ? e.stroke(d) : e.stroke()), f && (e.scale(1 / p, 1 / p), e.rotate(-l), e.translate(-s, -o));
};
var bo = {};
bo.safeDrawImage = function(r, e, t, a, n, i, s, o, l, u) {
  if (!(n <= 0 || i <= 0 || l <= 0 || u <= 0)) try {
    r.drawImage(e, t, a, n, i, s, o, l, u);
  } catch (f) {
    qe(f);
  }
};
bo.drawInscribedImage = function(r, e, t, a, n) {
  var i = this, s = t.position(), o = s.x, l = s.y, u = t.cy().style(), f = u.getIndexedStyle.bind(u), c = f(t, "background-fit", "value", a), d = f(t, "background-repeat", "value", a), g = t.width(), h = t.height(), m2 = t.padding() * 2, p = g + (f(t, "background-width-relative-to", "value", a) === "inner" ? 0 : m2), y = h + (f(t, "background-height-relative-to", "value", a) === "inner" ? 0 : m2), b = t._private.rscratch, w = f(t, "background-clip", "value", a), x = w === "node", C = f(t, "background-image-opacity", "value", a) * n, T = f(t, "background-image-smoothing", "value", a), E = t.pstyle("corner-radius").value;
  E !== "auto" && (E = t.pstyle("corner-radius").pfValue);
  var S = e.width || e.cachedW, D = e.height || e.cachedH;
  (S == null || D == null) && (document.body.appendChild(e), S = e.cachedW = e.width || e.offsetWidth, D = e.cachedH = e.height || e.offsetHeight, document.body.removeChild(e));
  var B = S, P = D;
  if (f(t, "background-width", "value", a) !== "auto" && (f(t, "background-width", "units", a) === "%" ? B = f(t, "background-width", "pfValue", a) * p : B = f(t, "background-width", "pfValue", a)), f(t, "background-height", "value", a) !== "auto" && (f(t, "background-height", "units", a) === "%" ? P = f(t, "background-height", "pfValue", a) * y : P = f(t, "background-height", "pfValue", a)), !(B === 0 || P === 0)) {
    if (c === "contain") {
      var A = Math.min(p / B, y / P);
      B *= A, P *= A;
    } else if (c === "cover") {
      var A = Math.max(p / B, y / P);
      B *= A, P *= A;
    }
    var R = o - p / 2, M = f(t, "background-position-x", "units", a), I = f(t, "background-position-x", "pfValue", a);
    M === "%" ? R += (p - B) * I : R += I;
    var O = f(t, "background-offset-x", "units", a), L = f(t, "background-offset-x", "pfValue", a);
    O === "%" ? R += (p - B) * L : R += L;
    var N = l - y / 2, q = f(t, "background-position-y", "units", a), H = f(t, "background-position-y", "pfValue", a);
    q === "%" ? N += (y - P) * H : N += H;
    var z = f(t, "background-offset-y", "units", a), V = f(t, "background-offset-y", "pfValue", a);
    z === "%" ? N += (y - P) * V : N += V, b.pathCache && (R -= o, N -= l, o = 0, l = 0);
    var K = r.globalAlpha;
    r.globalAlpha = C;
    var J = i.getImgSmoothing(r), X = false;
    if (T === "no" && J ? (i.setImgSmoothing(r, false), X = true) : T === "yes" && !J && (i.setImgSmoothing(r, true), X = true), d === "no-repeat") x && (r.save(), b.pathCache ? r.clip(b.pathCache) : (i.nodeShapes[i.getNodeShape(t)].draw(r, o, l, p, y, E, b), r.clip())), i.safeDrawImage(r, e, 0, 0, S, D, R, N, B, P), x && r.restore();
    else {
      var ee = r.createPattern(e, d);
      r.fillStyle = ee, i.nodeShapes[i.getNodeShape(t)].draw(r, o, l, p, y, E, b), r.translate(R, N), r.fill(), r.translate(-R, -N);
    }
    r.globalAlpha = K, X && i.setImgSmoothing(r, J);
  }
};
var Ot = {};
Ot.eleTextBiggerThanMin = function(r, e) {
  if (!e) {
    var t = r.cy().zoom(), a = this.getPixelRatio(), n = Math.ceil(to(t * a));
    e = Math.pow(2, n);
  }
  var i = r.pstyle("font-size").pfValue * e, s = r.pstyle("min-zoomed-font-size").pfValue;
  return !(i < s);
};
Ot.drawElementText = function(r, e, t, a, n) {
  var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true, s = this;
  if (a == null) {
    if (i && !s.eleTextBiggerThanMin(e)) return;
  } else if (a === false) return;
  if (e.isNode()) {
    var o = e.pstyle("label");
    if (!o || !o.value) return;
    var l = s.getLabelJustification(e);
    r.textAlign = l, r.textBaseline = "bottom";
  } else {
    var u = e.element()._private.rscratch.badLine, f = e.pstyle("label"), c = e.pstyle("source-label"), d = e.pstyle("target-label");
    if (u || (!f || !f.value) && (!c || !c.value) && (!d || !d.value)) return;
    r.textAlign = "center", r.textBaseline = "bottom";
  }
  var g = !t, h;
  t && (h = t, r.translate(-h.x1, -h.y1)), n == null ? (s.drawText(r, e, null, g, i), e.isEdge() && (s.drawText(r, e, "source", g, i), s.drawText(r, e, "target", g, i))) : s.drawText(r, e, n, g, i), t && r.translate(h.x1, h.y1);
};
Ot.getFontCache = function(r) {
  var e;
  this.fontCaches = this.fontCaches || [];
  for (var t = 0; t < this.fontCaches.length; t++) if (e = this.fontCaches[t], e.context === r) return e;
  return e = { context: r }, this.fontCaches.push(e), e;
};
Ot.setupTextStyle = function(r, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, a = e.pstyle("font-style").strValue, n = e.pstyle("font-size").pfValue + "px", i = e.pstyle("font-family").strValue, s = e.pstyle("font-weight").strValue, o = t ? e.effectiveOpacity() * e.pstyle("text-opacity").value : 1, l = e.pstyle("text-outline-opacity").value * o, u = e.pstyle("color").value, f = e.pstyle("text-outline-color").value;
  r.font = a + " " + s + " " + n + " " + i, r.lineJoin = "round", this.colorFillStyle(r, u[0], u[1], u[2], o), this.colorStrokeStyle(r, f[0], f[1], f[2], l);
};
function _y(r, e, t, a, n) {
  var i = Math.min(a, n), s = i / 2, o = e + a / 2, l = t + n / 2;
  r.beginPath(), r.arc(o, l, s, 0, Math.PI * 2), r.closePath();
}
m(_y, "circle");
function Hl(r, e, t, a, n) {
  var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 5, s = Math.min(i, a / 2, n / 2);
  r.beginPath(), r.moveTo(e + s, t), r.lineTo(e + a - s, t), r.quadraticCurveTo(e + a, t, e + a, t + s), r.lineTo(e + a, t + n - s), r.quadraticCurveTo(e + a, t + n, e + a - s, t + n), r.lineTo(e + s, t + n), r.quadraticCurveTo(e, t + n, e, t + n - s), r.lineTo(e, t + s), r.quadraticCurveTo(e, t, e + s, t), r.closePath();
}
m(Hl, "roundRect");
Ot.getTextAngle = function(r, e) {
  var t, a = r._private, n = a.rscratch, i = e ? e + "-" : "", s = r.pstyle(i + "text-rotation");
  if (s.strValue === "autorotate") {
    var o = Sr(n, "labelAngle", e);
    t = r.isEdge() ? o : 0;
  } else s.strValue === "none" ? t = 0 : t = s.pfValue;
  return t;
};
Ot.drawText = function(r, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, i = e._private, s = i.rscratch, o = n ? e.effectiveOpacity() : 1;
  if (!(n && (o === 0 || e.pstyle("text-opacity").value === 0))) {
    t === "main" && (t = null);
    var l = Sr(s, "labelX", t), u = Sr(s, "labelY", t), f, c, d = this.getLabelText(e, t);
    if (d != null && d !== "" && !isNaN(l) && !isNaN(u)) {
      this.setupTextStyle(r, e, n);
      var g = t ? t + "-" : "", h = Sr(s, "labelWidth", t), m2 = Sr(s, "labelHeight", t), p = e.pstyle(g + "text-margin-x").pfValue, y = e.pstyle(g + "text-margin-y").pfValue, b = e.isEdge(), w = e.pstyle("text-halign").value, x = e.pstyle("text-valign").value;
      b && (w = "center", x = "center"), l += p, u += y;
      var C;
      switch (a ? C = this.getTextAngle(e, t) : C = 0, C !== 0 && (f = l, c = u, r.translate(f, c), r.rotate(C), l = 0, u = 0), x) {
        case "top":
          break;
        case "center":
          u += m2 / 2;
          break;
        case "bottom":
          u += m2;
          break;
      }
      var T = e.pstyle("text-background-opacity").value, E = e.pstyle("text-border-opacity").value, S = e.pstyle("text-border-width").pfValue, D = e.pstyle("text-background-padding").pfValue, B = e.pstyle("text-background-shape").strValue, P = B === "round-rectangle" || B === "roundrectangle", A = B === "circle", R = 2;
      if (T > 0 || S > 0 && E > 0) {
        var M = r.fillStyle, I = r.strokeStyle, O = r.lineWidth, L = e.pstyle("text-background-color").value, N = e.pstyle("text-border-color").value, q = e.pstyle("text-border-style").value, H = T > 0, z = S > 0 && E > 0, V = l - D;
        switch (w) {
          case "left":
            V -= h;
            break;
          case "center":
            V -= h / 2;
            break;
        }
        var K = u - m2 - D, J = h + 2 * D, X = m2 + 2 * D;
        if (H && (r.fillStyle = "rgba(".concat(L[0], ",").concat(L[1], ",").concat(L[2], ",").concat(T * o, ")")), z && (r.strokeStyle = "rgba(".concat(N[0], ",").concat(N[1], ",").concat(N[2], ",").concat(E * o, ")"), r.lineWidth = S, r.setLineDash)) switch (q) {
          case "dotted":
            r.setLineDash([1, 1]);
            break;
          case "dashed":
            r.setLineDash([4, 2]);
            break;
          case "double":
            r.lineWidth = S / 4, r.setLineDash([]);
            break;
          case "solid":
          default:
            r.setLineDash([]);
            break;
        }
        if (P ? (r.beginPath(), Hl(r, V, K, J, X, R)) : A ? (r.beginPath(), _y(r, V, K, J, X)) : (r.beginPath(), r.rect(V, K, J, X)), H && r.fill(), z && r.stroke(), z && q === "double") {
          var ee = S / 2;
          r.beginPath(), P ? Hl(r, V + ee, K + ee, J - 2 * ee, X - 2 * ee, R) : r.rect(V + ee, K + ee, J - 2 * ee, X - 2 * ee), r.stroke();
        }
        r.fillStyle = M, r.strokeStyle = I, r.lineWidth = O, r.setLineDash && r.setLineDash([]);
      }
      var te = 2 * e.pstyle("text-outline-width").pfValue;
      if (te > 0 && (r.lineWidth = te), e.pstyle("text-wrap").value === "wrap") {
        var ie = Sr(s, "labelWrapCachedLines", t), j = Sr(s, "labelLineHeight", t), F = h / 2, _ = this.getLabelJustification(e);
        switch (_ === "auto" || (w === "left" ? _ === "left" ? l += -h : _ === "center" && (l += -F) : w === "center" ? _ === "left" ? l += -F : _ === "right" && (l += F) : w === "right" && (_ === "center" ? l += F : _ === "right" && (l += h))), x) {
          case "top":
            u -= (ie.length - 1) * j;
            break;
          case "center":
          case "bottom":
            u -= (ie.length - 1) * j;
            break;
        }
        for (var W = 0; W < ie.length; W++) te > 0 && r.strokeText(ie[W], l, u), r.fillText(ie[W], l, u), u += j;
      } else te > 0 && r.strokeText(d, l, u), r.fillText(d, l, u);
      C !== 0 && (r.rotate(-C), r.translate(-f, -c));
    }
  }
};
var mt = {};
mt.drawNode = function(r, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true, s = this, o, l, u = e._private, f = u.rscratch, c = e.position();
  if (!(!ne(c.x) || !ne(c.y)) && !(i && !e.visible())) {
    var d = i ? e.effectiveOpacity() : 1, g = s.usePaths(), h, m2 = false, p = e.padding();
    o = e.width() + 2 * p, l = e.height() + 2 * p;
    var y;
    t && (y = t, r.translate(-y.x1, -y.y1));
    for (var b = e.pstyle("background-image"), w = b.value, x = new Array(w.length), C = new Array(w.length), T = 0, E = 0; E < w.length; E++) {
      var S = w[E], D = x[E] = S != null && S !== "none";
      if (D) {
        var B = e.cy().style().getIndexedStyle(e, "background-image-crossorigin", "value", E);
        T++, C[E] = s.getCachedImage(S, B, function() {
          u.backgroundTimestamp = Date.now(), e.emitAndNotify("background");
        });
      }
    }
    var P = e.pstyle("background-blacken").value, A = e.pstyle("border-width").pfValue, R = e.pstyle("background-opacity").value * d, M = e.pstyle("border-color").value, I = e.pstyle("border-style").value, O = e.pstyle("border-join").value, L = e.pstyle("border-cap").value, N = e.pstyle("border-position").value, q = e.pstyle("border-dash-pattern").pfValue, H = e.pstyle("border-dash-offset").pfValue, z = e.pstyle("border-opacity").value * d, V = e.pstyle("outline-width").pfValue, K = e.pstyle("outline-color").value, J = e.pstyle("outline-style").value, X = e.pstyle("outline-opacity").value * d, ee = e.pstyle("outline-offset").value, te = e.pstyle("corner-radius").value;
    te !== "auto" && (te = e.pstyle("corner-radius").pfValue);
    var ie = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : R;
      s.eleFillStyle(r, e, le);
    }, "setupShapeColor"), j = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : z;
      s.colorStrokeStyle(r, M[0], M[1], M[2], le);
    }, "setupBorderColor"), F = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : X;
      s.colorStrokeStyle(r, K[0], K[1], K[2], le);
    }, "setupOutlineColor"), _ = m(function(le, Y, k, G) {
      var $ = s.nodePathCache = s.nodePathCache || [], U = dv(k === "polygon" ? k + "," + G.join(",") : k, "" + Y, "" + le, "" + te), Q = $[U], ue, re = false;
      return Q != null ? (ue = Q, re = true, f.pathCache = ue) : (ue = new Path2D(), $[U] = f.pathCache = ue), { path: ue, cacheHit: re };
    }, "getPath"), W = e.pstyle("shape").strValue, Z = e.pstyle("shape-polygon-points").pfValue;
    if (g) {
      r.translate(c.x, c.y);
      var ae = _(o, l, W, Z);
      h = ae.path, m2 = ae.cacheHit;
    }
    var de = m(function() {
      if (!m2) {
        var le = c;
        g && (le = { x: 0, y: 0 }), s.nodeShapes[s.getNodeShape(e)].draw(h || r, le.x, le.y, o, l, te, f);
      }
      g ? r.fill(h) : r.fill();
    }, "drawShape"), Re = m(function() {
      for (var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : d, Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, k = u.backgrounding, G = 0, $ = 0; $ < C.length; $++) {
        var U = e.cy().style().getIndexedStyle(e, "background-image-containment", "value", $);
        if (Y && U === "over" || !Y && U === "inside") {
          G++;
          continue;
        }
        x[$] && C[$].complete && !C[$].error && (G++, s.drawInscribedImage(r, C[$], e, $, le));
      }
      u.backgrounding = G !== T, k !== u.backgrounding && e.updateStyle(false);
    }, "drawImages"), Te = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d;
      s.hasPie(e) && (s.drawPie(r, e, Y), le && (g || s.nodeShapes[s.getNodeShape(e)].draw(r, c.x, c.y, o, l, te, f)));
    }, "drawPie"), xe = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d;
      s.hasStripe(e) && (r.save(), g ? r.clip(f.pathCache) : (s.nodeShapes[s.getNodeShape(e)].draw(r, c.x, c.y, o, l, te, f), r.clip()), s.drawStripe(r, e, Y), r.restore(), le && (g || s.nodeShapes[s.getNodeShape(e)].draw(r, c.x, c.y, o, l, te, f)));
    }, "drawStripe"), me = m(function() {
      var le = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : d, Y = (P > 0 ? P : -P) * le, k = P > 0 ? 0 : 255;
      P !== 0 && (s.colorFillStyle(r, k, k, k, Y), g ? r.fill(h) : r.fill());
    }, "darken"), se = m(function() {
      if (A > 0) {
        if (r.lineWidth = A, r.lineCap = L, r.lineJoin = O, r.setLineDash) switch (I) {
          case "dotted":
            r.setLineDash([1, 1]);
            break;
          case "dashed":
            r.setLineDash(q), r.lineDashOffset = H;
            break;
          case "solid":
          case "double":
            r.setLineDash([]);
            break;
        }
        if (N !== "center") {
          if (r.save(), r.lineWidth *= 2, N === "inside") g ? r.clip(h) : r.clip();
          else {
            var le = new Path2D();
            le.rect(-o / 2 - A, -l / 2 - A, o + 2 * A, l + 2 * A), le.addPath(h), r.clip(le, "evenodd");
          }
          g ? r.stroke(h) : r.stroke(), r.restore();
        } else g ? r.stroke(h) : r.stroke();
        if (I === "double") {
          r.lineWidth = A / 3;
          var Y = r.globalCompositeOperation;
          r.globalCompositeOperation = "destination-out", g ? r.stroke(h) : r.stroke(), r.globalCompositeOperation = Y;
        }
        r.setLineDash && r.setLineDash([]);
      }
    }, "drawBorder"), he = m(function() {
      if (V > 0) {
        if (r.lineWidth = V, r.lineCap = "butt", r.setLineDash) switch (J) {
          case "dotted":
            r.setLineDash([1, 1]);
            break;
          case "dashed":
            r.setLineDash([4, 2]);
            break;
          case "solid":
          case "double":
            r.setLineDash([]);
            break;
        }
        var le = c;
        g && (le = { x: 0, y: 0 });
        var Y = s.getNodeShape(e), k = A;
        N === "inside" && (k = 0), N === "outside" && (k *= 2);
        var G = (o + k + (V + ee)) / o, $ = (l + k + (V + ee)) / l, U = o * G, Q = l * $, ue = s.nodeShapes[Y].points, re;
        if (g) {
          var fe = _(U, Q, Y, ue);
          re = fe.path;
        }
        if (Y === "ellipse") s.drawEllipsePath(re || r, le.x, le.y, U, Q);
        else if (["round-diamond", "round-heptagon", "round-hexagon", "round-octagon", "round-pentagon", "round-polygon", "round-triangle", "round-tag"].includes(Y)) {
          var ve = 0, be = 0, Be = 0;
          Y === "round-diamond" ? ve = (k + ee + V) * 1.4 : Y === "round-heptagon" ? (ve = (k + ee + V) * 1.075, Be = -(k / 2 + ee + V) / 35) : Y === "round-hexagon" ? ve = (k + ee + V) * 1.12 : Y === "round-pentagon" ? (ve = (k + ee + V) * 1.13, Be = -(k / 2 + ee + V) / 15) : Y === "round-tag" ? (ve = (k + ee + V) * 1.12, be = (k / 2 + V + ee) * 0.07) : Y === "round-triangle" && (ve = (k + ee + V) * (Math.PI / 2), Be = -(k + ee / 2 + V) / Math.PI), ve !== 0 && (G = (o + ve) / o, U = o * G, ["round-hexagon", "round-tag"].includes(Y) || ($ = (l + ve) / l, Q = l * $)), te = te === "auto" ? Cv(U, Q) : te;
          for (var Se = U / 2, ce = Q / 2, Ae = te + (k + V + ee) / 2, Pe = new Array(ue.length / 2), er = new Array(ue.length / 2), Xe = 0; Xe < ue.length / 2; Xe++) Pe[Xe] = { x: le.x + be + Se * ue[Xe * 2], y: le.y + Be + ce * ue[Xe * 2 + 1] };
          var br, Ze, sr, rr, vr = Pe.length;
          for (Ze = Pe[vr - 1], br = 0; br < vr; br++) sr = Pe[br % vr], rr = Pe[(br + 1) % vr], er[br] = yo(Ze, sr, rr, Ae), Ze = sr, sr = rr;
          s.drawRoundPolygonPath(re || r, le.x + be, le.y + Be, o * G, l * $, ue, er);
        } else if (["roundrectangle", "round-rectangle"].includes(Y)) te = te === "auto" ? ft(U, Q) : te, s.drawRoundRectanglePath(re || r, le.x, le.y, U, Q, te + (k + V + ee) / 2);
        else if (["cutrectangle", "cut-rectangle"].includes(Y)) te = te === "auto" ? io() : te, s.drawCutRectanglePath(re || r, le.x, le.y, U, Q, null, te + (k + V + ee) / 4);
        else if (["bottomroundrectangle", "bottom-round-rectangle"].includes(Y)) te = te === "auto" ? ft(U, Q) : te, s.drawBottomRoundRectanglePath(re || r, le.x, le.y, U, Q, te + (k + V + ee) / 2);
        else if (Y === "barrel") s.drawBarrelPath(re || r, le.x, le.y, U, Q);
        else if (Y.startsWith("polygon") || ["rhomboid", "right-rhomboid", "round-tag", "tag", "vee"].includes(Y)) {
          var et = (k + V + ee) / o;
          ue = Cn(Tn(ue, et)), s.drawPolygonPath(re || r, le.x, le.y, o, l, ue);
        } else {
          var Qe = (k + V + ee) / o;
          ue = Cn(Tn(ue, -Qe)), s.drawPolygonPath(re || r, le.x, le.y, o, l, ue);
        }
        if (g ? r.stroke(re) : r.stroke(), J === "double") {
          r.lineWidth = k / 3;
          var $r = r.globalCompositeOperation;
          r.globalCompositeOperation = "destination-out", g ? r.stroke(re) : r.stroke(), r.globalCompositeOperation = $r;
        }
        r.setLineDash && r.setLineDash([]);
      }
    }, "drawOutline"), ge = m(function() {
      n && s.drawNodeOverlay(r, e, c, o, l);
    }, "drawOverlay"), Ce = m(function() {
      n && s.drawNodeUnderlay(r, e, c, o, l);
    }, "drawUnderlay"), ye = m(function() {
      s.drawElementText(r, e, null, a);
    }, "drawText"), ke = e.pstyle("ghost").value === "yes";
    if (ke) {
      var Me = e.pstyle("ghost-offset-x").pfValue, Ne = e.pstyle("ghost-offset-y").pfValue, ze = e.pstyle("ghost-opacity").value, Fe = ze * d;
      r.translate(Me, Ne), F(), he(), ie(ze * R), de(), Re(Fe, true), j(ze * z), se(), Te(P !== 0 || A !== 0), xe(P !== 0 || A !== 0), Re(Fe, false), me(Fe), r.translate(-Me, -Ne);
    }
    g && r.translate(-c.x, -c.y), Ce(), g && r.translate(c.x, c.y), F(), he(), ie(), de(), Re(d, true), j(), se(), Te(P !== 0 || A !== 0), xe(P !== 0 || A !== 0), Re(d, false), me(), g && r.translate(-c.x, -c.y), ye(), ge(), t && r.translate(y.x1, y.y1);
  }
};
var Af = m(function(e) {
  if (!["overlay", "underlay"].includes(e)) throw new Error("Invalid state");
  return function(t, a, n, i, s) {
    var o = this;
    if (a.visible()) {
      var l = a.pstyle("".concat(e, "-padding")).pfValue, u = a.pstyle("".concat(e, "-opacity")).value, f = a.pstyle("".concat(e, "-color")).value, c = a.pstyle("".concat(e, "-shape")).value, d = a.pstyle("".concat(e, "-corner-radius")).value;
      if (u > 0) {
        if (n = n || a.position(), i == null || s == null) {
          var g = a.padding();
          i = a.width() + 2 * g, s = a.height() + 2 * g;
        }
        o.colorFillStyle(t, f[0], f[1], f[2], u), o.nodeShapes[c].draw(t, n.x, n.y, i + l * 2, s + l * 2, d), t.fill();
      }
    }
  };
}, "drawNodeOverlayUnderlay");
mt.drawNodeOverlay = Af("overlay");
mt.drawNodeUnderlay = Af("underlay");
mt.hasPie = function(r) {
  return r = r[0], r._private.hasPie;
};
mt.hasStripe = function(r) {
  return r = r[0], r._private.hasStripe;
};
mt.drawPie = function(r, e, t, a) {
  e = e[0], a = a || e.position();
  var n = e.cy().style(), i = e.pstyle("pie-size"), s = e.pstyle("pie-hole"), o = e.pstyle("pie-start-angle").pfValue, l = a.x, u = a.y, f = e.width(), c = e.height(), d = Math.min(f, c) / 2, g, h = 0, m2 = this.usePaths();
  if (m2 && (l = 0, u = 0), i.units === "%" ? d = d * i.pfValue : i.pfValue !== void 0 && (d = i.pfValue / 2), s.units === "%" ? g = d * s.pfValue : s.pfValue !== void 0 && (g = s.pfValue / 2), !(g >= d)) for (var p = 1; p <= n.pieBackgroundN; p++) {
    var y = e.pstyle("pie-" + p + "-background-size").value, b = e.pstyle("pie-" + p + "-background-color").value, w = e.pstyle("pie-" + p + "-background-opacity").value * t, x = y / 100;
    x + h > 1 && (x = 1 - h);
    var C = 1.5 * Math.PI + 2 * Math.PI * h;
    C += o;
    var T = 2 * Math.PI * x, E = C + T;
    y === 0 || h >= 1 || h + x > 1 || (g === 0 ? (r.beginPath(), r.moveTo(l, u), r.arc(l, u, d, C, E), r.closePath()) : (r.beginPath(), r.arc(l, u, d, C, E), r.arc(l, u, g, E, C, true), r.closePath()), this.colorFillStyle(r, b[0], b[1], b[2], w), r.fill(), h += x);
  }
};
mt.drawStripe = function(r, e, t, a) {
  e = e[0], a = a || e.position();
  var n = e.cy().style(), i = a.x, s = a.y, o = e.width(), l = e.height(), u = 0, f = this.usePaths();
  r.save();
  var c = e.pstyle("stripe-direction").value, d = e.pstyle("stripe-size");
  switch (c) {
    case "vertical":
      break;
    case "righward":
      r.rotate(-Math.PI / 2);
      break;
  }
  var g = o, h = l;
  d.units === "%" ? (g = g * d.pfValue, h = h * d.pfValue) : d.pfValue !== void 0 && (g = d.pfValue, h = d.pfValue), f && (i = 0, s = 0), s -= g / 2, i -= h / 2;
  for (var m2 = 1; m2 <= n.stripeBackgroundN; m2++) {
    var p = e.pstyle("stripe-" + m2 + "-background-size").value, y = e.pstyle("stripe-" + m2 + "-background-color").value, b = e.pstyle("stripe-" + m2 + "-background-opacity").value * t, w = p / 100;
    w + u > 1 && (w = 1 - u), !(p === 0 || u >= 1 || u + w > 1) && (r.beginPath(), r.rect(i, s + h * u, g, h * w), r.closePath(), this.colorFillStyle(r, y[0], y[1], y[2], b), r.fill(), u += w);
  }
  r.restore();
};
var Er = {};
var Gy = 100;
Er.getPixelRatio = function() {
  var r = this.data.contexts[0];
  if (this.forcedPixelRatio != null) return this.forcedPixelRatio;
  var e = this.cy.window(), t = r.backingStorePixelRatio || r.webkitBackingStorePixelRatio || r.mozBackingStorePixelRatio || r.msBackingStorePixelRatio || r.oBackingStorePixelRatio || r.backingStorePixelRatio || 1;
  return (e.devicePixelRatio || 1) / t;
};
Er.paintCache = function(r) {
  for (var e = this.paintCaches = this.paintCaches || [], t = true, a, n = 0; n < e.length; n++) if (a = e[n], a.context === r) {
    t = false;
    break;
  }
  return t && (a = { context: r }, e.push(a)), a;
};
Er.createGradientStyleFor = function(r, e, t, a, n) {
  var i, s = this.usePaths(), o = t.pstyle(e + "-gradient-stop-colors").value, l = t.pstyle(e + "-gradient-stop-positions").pfValue;
  if (a === "radial-gradient") if (t.isEdge()) {
    var u = t.sourceEndpoint(), f = t.targetEndpoint(), c = t.midpoint(), d = At(u, c), g = At(f, c);
    i = r.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(d, g));
  } else {
    var h = s ? { x: 0, y: 0 } : t.position(), m2 = t.paddedWidth(), p = t.paddedHeight();
    i = r.createRadialGradient(h.x, h.y, 0, h.x, h.y, Math.max(m2, p));
  }
  else if (t.isEdge()) {
    var y = t.sourceEndpoint(), b = t.targetEndpoint();
    i = r.createLinearGradient(y.x, y.y, b.x, b.y);
  } else {
    var w = s ? { x: 0, y: 0 } : t.position(), x = t.paddedWidth(), C = t.paddedHeight(), T = x / 2, E = C / 2, S = t.pstyle("background-gradient-direction").value;
    switch (S) {
      case "to-bottom":
        i = r.createLinearGradient(w.x, w.y - E, w.x, w.y + E);
        break;
      case "to-top":
        i = r.createLinearGradient(w.x, w.y + E, w.x, w.y - E);
        break;
      case "to-left":
        i = r.createLinearGradient(w.x + T, w.y, w.x - T, w.y);
        break;
      case "to-right":
        i = r.createLinearGradient(w.x - T, w.y, w.x + T, w.y);
        break;
      case "to-bottom-right":
      case "to-right-bottom":
        i = r.createLinearGradient(w.x - T, w.y - E, w.x + T, w.y + E);
        break;
      case "to-top-right":
      case "to-right-top":
        i = r.createLinearGradient(w.x - T, w.y + E, w.x + T, w.y - E);
        break;
      case "to-bottom-left":
      case "to-left-bottom":
        i = r.createLinearGradient(w.x + T, w.y - E, w.x - T, w.y + E);
        break;
      case "to-top-left":
      case "to-left-top":
        i = r.createLinearGradient(w.x + T, w.y + E, w.x - T, w.y - E);
        break;
    }
  }
  if (!i) return null;
  for (var D = l.length === o.length, B = o.length, P = 0; P < B; P++) i.addColorStop(D ? l[P] : P / (B - 1), "rgba(" + o[P][0] + "," + o[P][1] + "," + o[P][2] + "," + n + ")");
  return i;
};
Er.gradientFillStyle = function(r, e, t, a) {
  var n = this.createGradientStyleFor(r, "background", e, t, a);
  if (!n) return null;
  r.fillStyle = n;
};
Er.colorFillStyle = function(r, e, t, a, n) {
  r.fillStyle = "rgba(" + e + "," + t + "," + a + "," + n + ")";
};
Er.eleFillStyle = function(r, e, t) {
  var a = e.pstyle("background-fill").value;
  if (a === "linear-gradient" || a === "radial-gradient") this.gradientFillStyle(r, e, a, t);
  else {
    var n = e.pstyle("background-color").value;
    this.colorFillStyle(r, n[0], n[1], n[2], t);
  }
};
Er.gradientStrokeStyle = function(r, e, t, a) {
  var n = this.createGradientStyleFor(r, "line", e, t, a);
  if (!n) return null;
  r.strokeStyle = n;
};
Er.colorStrokeStyle = function(r, e, t, a, n) {
  r.strokeStyle = "rgba(" + e + "," + t + "," + a + "," + n + ")";
};
Er.eleStrokeStyle = function(r, e, t) {
  var a = e.pstyle("line-fill").value;
  if (a === "linear-gradient" || a === "radial-gradient") this.gradientStrokeStyle(r, e, a, t);
  else {
    var n = e.pstyle("line-color").value;
    this.colorStrokeStyle(r, n[0], n[1], n[2], t);
  }
};
Er.matchCanvasSize = function(r) {
  var e = this, t = e.data, a = e.findContainerClientCoords(), n = a[2], i = a[3], s = e.getPixelRatio(), o = e.motionBlurPxRatio;
  (r === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE] || r === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG]) && (s = o);
  var l = n * s, u = i * s, f;
  if (!(l === e.canvasWidth && u === e.canvasHeight)) {
    e.fontCaches = null;
    var c = t.canvasContainer;
    c.style.width = n + "px", c.style.height = i + "px";
    for (var d = 0; d < e.CANVAS_LAYERS; d++) f = t.canvases[d], f.width = l, f.height = u, f.style.width = n + "px", f.style.height = i + "px";
    for (var d = 0; d < e.BUFFER_COUNT; d++) f = t.bufferCanvases[d], f.width = l, f.height = u, f.style.width = n + "px", f.style.height = i + "px";
    e.textureMult = 1, s <= 1 && (f = t.bufferCanvases[e.TEXTURE_BUFFER], e.textureMult = 2, f.width = l * e.textureMult, f.height = u * e.textureMult), e.canvasWidth = l, e.canvasHeight = u, e.pixelRatio = s;
  }
};
Er.renderTo = function(r, e, t, a) {
  this.render({ forcedContext: r, forcedZoom: e, forcedPan: t, drawAllLayers: true, forcedPxRatio: a });
};
Er.clearCanvas = function() {
  var r = this, e = r.data;
  function t(a) {
    a.clearRect(0, 0, r.canvasWidth, r.canvasHeight);
  }
  m(t, "clear"), t(e.contexts[r.NODE]), t(e.contexts[r.DRAG]);
};
Er.render = function(r) {
  var e = this;
  r = r || yv();
  var t = e.cy, a = r.forcedContext, n = r.drawAllLayers, i = r.drawOnlyNodeLayer, s = r.forcedZoom, o = r.forcedPan, l = r.forcedPxRatio === void 0 ? this.getPixelRatio() : r.forcedPxRatio, u = e.data, f = u.canvasNeedsRedraw, c = e.textureOnViewport && !a && (e.pinching || e.hoverData.dragging || e.swipePanning || e.data.wheelZooming), d = r.motionBlur !== void 0 ? r.motionBlur : e.motionBlur, g = e.motionBlurPxRatio, h = t.hasCompoundNodes(), m2 = e.hoverData.draggingEles, p = !!(e.hoverData.selecting || e.touchData.selecting);
  d = d && !a && e.motionBlurEnabled && !p;
  var y = d;
  a || (e.prevPxRatio !== l && (e.invalidateContainerClientCoordsCache(), e.matchCanvasSize(e.container), e.redrawHint("eles", true), e.redrawHint("drag", true)), e.prevPxRatio = l), !a && e.motionBlurTimeout && clearTimeout(e.motionBlurTimeout), d && (e.mbFrames == null && (e.mbFrames = 0), e.mbFrames++, e.mbFrames < 3 && (y = false), e.mbFrames > e.minMbLowQualFrames && (e.motionBlurPxRatio = e.mbPxRBlurry)), e.clearingMotionBlur && (e.motionBlurPxRatio = 1), e.textureDrawLastFrame && !c && (f[e.NODE] = true, f[e.SELECT_BOX] = true);
  var b = t.style(), w = t.zoom(), x = s !== void 0 ? s : w, C = t.pan(), T = { x: C.x, y: C.y }, E = { zoom: w, pan: { x: C.x, y: C.y } }, S = e.prevViewport, D = S === void 0 || E.zoom !== S.zoom || E.pan.x !== S.pan.x || E.pan.y !== S.pan.y;
  !D && !(m2 && !h) && (e.motionBlurPxRatio = 1), o && (T = o), x *= l, T.x *= l, T.y *= l;
  var B = e.getCachedZSortedEles();
  function P(j, F, _, W, Z) {
    var ae = j.globalCompositeOperation;
    j.globalCompositeOperation = "destination-out", e.colorFillStyle(j, 255, 255, 255, e.motionBlurTransparency), j.fillRect(F, _, W, Z), j.globalCompositeOperation = ae;
  }
  m(P, "mbclear");
  function A(j, F) {
    var _, W, Z, ae;
    !e.clearingMotionBlur && (j === u.bufferContexts[e.MOTIONBLUR_BUFFER_NODE] || j === u.bufferContexts[e.MOTIONBLUR_BUFFER_DRAG]) ? (_ = { x: C.x * g, y: C.y * g }, W = w * g, Z = e.canvasWidth * g, ae = e.canvasHeight * g) : (_ = T, W = x, Z = e.canvasWidth, ae = e.canvasHeight), j.setTransform(1, 0, 0, 1, 0, 0), F === "motionBlur" ? P(j, 0, 0, Z, ae) : !a && (F === void 0 || F) && j.clearRect(0, 0, Z, ae), n || (j.translate(_.x, _.y), j.scale(W, W)), o && j.translate(o.x, o.y), s && j.scale(s, s);
  }
  if (m(A, "setContextTransform"), c || (e.textureDrawLastFrame = false), c) {
    if (e.textureDrawLastFrame = true, !e.textureCache) {
      e.textureCache = {}, e.textureCache.bb = t.mutableElements().boundingBox(), e.textureCache.texture = e.data.bufferCanvases[e.TEXTURE_BUFFER];
      var R = e.data.bufferContexts[e.TEXTURE_BUFFER];
      R.setTransform(1, 0, 0, 1, 0, 0), R.clearRect(0, 0, e.canvasWidth * e.textureMult, e.canvasHeight * e.textureMult), e.render({ forcedContext: R, drawOnlyNodeLayer: true, forcedPxRatio: l * e.textureMult });
      var E = e.textureCache.viewport = { zoom: t.zoom(), pan: t.pan(), width: e.canvasWidth, height: e.canvasHeight };
      E.mpan = { x: (0 - E.pan.x) / E.zoom, y: (0 - E.pan.y) / E.zoom };
    }
    f[e.DRAG] = false, f[e.NODE] = false;
    var M = u.contexts[e.NODE], I = e.textureCache.texture, E = e.textureCache.viewport;
    M.setTransform(1, 0, 0, 1, 0, 0), d ? P(M, 0, 0, E.width, E.height) : M.clearRect(0, 0, E.width, E.height);
    var O = b.core("outside-texture-bg-color").value, L = b.core("outside-texture-bg-opacity").value;
    e.colorFillStyle(M, O[0], O[1], O[2], L), M.fillRect(0, 0, E.width, E.height);
    var w = t.zoom();
    A(M, false), M.clearRect(E.mpan.x, E.mpan.y, E.width / E.zoom / l, E.height / E.zoom / l), M.drawImage(I, E.mpan.x, E.mpan.y, E.width / E.zoom / l, E.height / E.zoom / l);
  } else e.textureOnViewport && !a && (e.textureCache = null);
  var N = t.extent(), q = e.pinching || e.hoverData.dragging || e.swipePanning || e.data.wheelZooming || e.hoverData.draggingEles || e.cy.animated(), H = e.hideEdgesOnViewport && q, z = [];
  if (z[e.NODE] = !f[e.NODE] && d && !e.clearedForMotionBlur[e.NODE] || e.clearingMotionBlur, z[e.NODE] && (e.clearedForMotionBlur[e.NODE] = true), z[e.DRAG] = !f[e.DRAG] && d && !e.clearedForMotionBlur[e.DRAG] || e.clearingMotionBlur, z[e.DRAG] && (e.clearedForMotionBlur[e.DRAG] = true), f[e.NODE] || n || i || z[e.NODE]) {
    var V = d && !z[e.NODE] && g !== 1, M = a || (V ? e.data.bufferContexts[e.MOTIONBLUR_BUFFER_NODE] : u.contexts[e.NODE]), K = d && !V ? "motionBlur" : void 0;
    A(M, K), H ? e.drawCachedNodes(M, B.nondrag, l, N) : e.drawLayeredElements(M, B.nondrag, l, N), e.debug && e.drawDebugPoints(M, B.nondrag), !n && !d && (f[e.NODE] = false);
  }
  if (!i && (f[e.DRAG] || n || z[e.DRAG])) {
    var V = d && !z[e.DRAG] && g !== 1, M = a || (V ? e.data.bufferContexts[e.MOTIONBLUR_BUFFER_DRAG] : u.contexts[e.DRAG]);
    A(M, d && !V ? "motionBlur" : void 0), H ? e.drawCachedNodes(M, B.drag, l, N) : e.drawCachedElements(M, B.drag, l, N), e.debug && e.drawDebugPoints(M, B.drag), !n && !d && (f[e.DRAG] = false);
  }
  if (this.drawSelectionRectangle(r, A), d && g !== 1) {
    var J = u.contexts[e.NODE], X = e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE], ee = u.contexts[e.DRAG], te = e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG], ie = m(function(F, _, W) {
      F.setTransform(1, 0, 0, 1, 0, 0), W || !y ? F.clearRect(0, 0, e.canvasWidth, e.canvasHeight) : P(F, 0, 0, e.canvasWidth, e.canvasHeight);
      var Z = g;
      F.drawImage(_, 0, 0, e.canvasWidth * Z, e.canvasHeight * Z, 0, 0, e.canvasWidth, e.canvasHeight);
    }, "drawMotionBlur");
    (f[e.NODE] || z[e.NODE]) && (ie(J, X, z[e.NODE]), f[e.NODE] = false), (f[e.DRAG] || z[e.DRAG]) && (ie(ee, te, z[e.DRAG]), f[e.DRAG] = false);
  }
  e.prevViewport = E, e.clearingMotionBlur && (e.clearingMotionBlur = false, e.motionBlurCleared = true, e.motionBlur = true), d && (e.motionBlurTimeout = setTimeout(function() {
    e.motionBlurTimeout = null, e.clearedForMotionBlur[e.NODE] = false, e.clearedForMotionBlur[e.DRAG] = false, e.motionBlur = false, e.clearingMotionBlur = !c, e.mbFrames = 0, f[e.NODE] = true, f[e.DRAG] = true, e.redraw();
  }, Gy)), a || t.emit("render");
};
var ga;
Er.drawSelectionRectangle = function(r, e) {
  var t = this, a = t.cy, n = t.data, i = a.style(), s = r.drawOnlyNodeLayer, o = r.drawAllLayers, l = n.canvasNeedsRedraw, u = r.forcedContext;
  if (t.showFps || !s && l[t.SELECT_BOX] && !o) {
    var f = u || n.contexts[t.SELECT_BOX];
    if (e(f), t.selection[4] == 1 && (t.hoverData.selecting || t.touchData.selecting)) {
      var c = t.cy.zoom(), d = i.core("selection-box-border-width").value / c;
      f.lineWidth = d, f.fillStyle = "rgba(" + i.core("selection-box-color").value[0] + "," + i.core("selection-box-color").value[1] + "," + i.core("selection-box-color").value[2] + "," + i.core("selection-box-opacity").value + ")", f.fillRect(t.selection[0], t.selection[1], t.selection[2] - t.selection[0], t.selection[3] - t.selection[1]), d > 0 && (f.strokeStyle = "rgba(" + i.core("selection-box-border-color").value[0] + "," + i.core("selection-box-border-color").value[1] + "," + i.core("selection-box-border-color").value[2] + "," + i.core("selection-box-opacity").value + ")", f.strokeRect(t.selection[0], t.selection[1], t.selection[2] - t.selection[0], t.selection[3] - t.selection[1]));
    }
    if (n.bgActivePosistion && !t.hoverData.selecting) {
      var c = t.cy.zoom(), g = n.bgActivePosistion;
      f.fillStyle = "rgba(" + i.core("active-bg-color").value[0] + "," + i.core("active-bg-color").value[1] + "," + i.core("active-bg-color").value[2] + "," + i.core("active-bg-opacity").value + ")", f.beginPath(), f.arc(g.x, g.y, i.core("active-bg-size").pfValue / c, 0, 2 * Math.PI), f.fill();
    }
    var h = t.lastRedrawTime;
    if (t.showFps && h) {
      h = Math.round(h);
      var m2 = Math.round(1e3 / h), p = "1 frame = " + h + " ms = " + m2 + " fps";
      if (f.setTransform(1, 0, 0, 1, 0, 0), f.fillStyle = "rgba(255, 0, 0, 0.75)", f.strokeStyle = "rgba(255, 0, 0, 0.75)", f.font = "30px Arial", !ga) {
        var y = f.measureText(p);
        ga = y.actualBoundingBoxAscent;
      }
      f.fillText(p, 0, ga);
      var b = 60;
      f.strokeRect(0, ga + 10, 250, 20), f.fillRect(0, ga + 10, 250 * Math.min(m2 / b, 1), 20);
    }
    o || (l[t.SELECT_BOX] = false);
  }
};
function Wl(r, e, t) {
  var a = r.createShader(e);
  if (r.shaderSource(a, t), r.compileShader(a), !r.getShaderParameter(a, r.COMPILE_STATUS)) throw new Error(r.getShaderInfoLog(a));
  return a;
}
m(Wl, "compileShader");
function Hy(r, e, t) {
  var a = Wl(r, r.VERTEX_SHADER, e), n = Wl(r, r.FRAGMENT_SHADER, t), i = r.createProgram();
  if (r.attachShader(i, a), r.attachShader(i, n), r.linkProgram(i), !r.getProgramParameter(i, r.LINK_STATUS)) throw new Error("Could not initialize shaders");
  return i;
}
m(Hy, "createProgram");
function Wy(r, e, t) {
  t === void 0 && (t = e);
  var a = r.makeOffscreenCanvas(e, t), n = a.context = a.getContext("2d");
  return a.clear = function() {
    return n.clearRect(0, 0, a.width, a.height);
  }, a.clear(), a;
}
m(Wy, "createTextureCanvas");
function wo(r) {
  var e = r.pixelRatio, t = r.cy.zoom(), a = r.cy.pan();
  return { zoom: t * e, pan: { x: a.x * e, y: a.y * e } };
}
m(wo, "getEffectivePanZoom");
function $y(r) {
  var e = r.pixelRatio, t = r.cy.zoom();
  return t * e;
}
m($y, "getEffectiveZoom");
function Uy(r, e, t, a, n) {
  var i = a * t + e.x, s = n * t + e.y;
  return s = Math.round(r.canvasHeight - s), [i, s];
}
m(Uy, "modelToRenderedPosition");
function Ky(r) {
  return r.pstyle("background-fill").value !== "solid" || r.pstyle("background-image").strValue !== "none" ? false : r.pstyle("border-width").value === 0 || r.pstyle("border-opacity").value === 0 ? true : r.pstyle("border-style").value === "solid";
}
m(Ky, "isSimpleShape");
function Xy(r, e) {
  if (r.length !== e.length) return false;
  for (var t = 0; t < r.length; t++) if (r[t] !== e[t]) return false;
  return true;
}
m(Xy, "arrayEqual");
function Et(r, e, t) {
  var a = r[0] / 255, n = r[1] / 255, i = r[2] / 255, s = e, o = t || new Array(4);
  return o[0] = a * s, o[1] = n * s, o[2] = i * s, o[3] = s, o;
}
m(Et, "toWebGLColor");
function Gt(r, e) {
  var t = e || new Array(4);
  return t[0] = (r >> 0 & 255) / 255, t[1] = (r >> 8 & 255) / 255, t[2] = (r >> 16 & 255) / 255, t[3] = (r >> 24 & 255) / 255, t;
}
m(Gt, "indexToVec4");
function Yy(r) {
  return r[0] + (r[1] << 8) + (r[2] << 16) + (r[3] << 24);
}
m(Yy, "vec4ToIndex");
function Zy(r, e) {
  var t = r.createTexture();
  return t.buffer = function(a) {
    r.bindTexture(r.TEXTURE_2D, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_NEAREST), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, a), r.generateMipmap(r.TEXTURE_2D), r.bindTexture(r.TEXTURE_2D, null);
  }, t.deleteTexture = function() {
    r.deleteTexture(t);
  }, t;
}
m(Zy, "createTexture");
function Rf(r, e) {
  switch (e) {
    case "float":
      return [1, r.FLOAT, 4];
    case "vec2":
      return [2, r.FLOAT, 4];
    case "vec3":
      return [3, r.FLOAT, 4];
    case "vec4":
      return [4, r.FLOAT, 4];
    case "int":
      return [1, r.INT, 4];
    case "ivec2":
      return [2, r.INT, 4];
  }
}
m(Rf, "getTypeInfo");
function Mf(r, e, t) {
  switch (e) {
    case r.FLOAT:
      return new Float32Array(t);
    case r.INT:
      return new Int32Array(t);
  }
}
m(Mf, "createTypedArray");
function Qy(r, e, t, a, n, i) {
  switch (e) {
    case r.FLOAT:
      return new Float32Array(t.buffer, i * a, n);
    case r.INT:
      return new Int32Array(t.buffer, i * a, n);
  }
}
m(Qy, "createTypedArrayView");
function Jy(r, e, t, a) {
  var n = Rf(r, e), i = je(n, 2), s = i[0], o = i[1], l = Mf(r, o, a), u = r.createBuffer();
  return r.bindBuffer(r.ARRAY_BUFFER, u), r.bufferData(r.ARRAY_BUFFER, l, r.STATIC_DRAW), o === r.FLOAT ? r.vertexAttribPointer(t, s, o, false, 0, 0) : o === r.INT && r.vertexAttribIPointer(t, s, o, 0, 0), r.enableVertexAttribArray(t), r.bindBuffer(r.ARRAY_BUFFER, null), u;
}
m(Jy, "createBufferStaticDraw");
function Vr(r, e, t, a) {
  var n = Rf(r, t), i = je(n, 3), s = i[0], o = i[1], l = i[2], u = Mf(r, o, e * s), f = s * l, c = r.createBuffer();
  r.bindBuffer(r.ARRAY_BUFFER, c), r.bufferData(r.ARRAY_BUFFER, e * f, r.DYNAMIC_DRAW), r.enableVertexAttribArray(a), o === r.FLOAT ? r.vertexAttribPointer(a, s, o, false, f, 0) : o === r.INT && r.vertexAttribIPointer(a, s, o, f, 0), r.vertexAttribDivisor(a, 1), r.bindBuffer(r.ARRAY_BUFFER, null);
  for (var d = new Array(e), g = 0; g < e; g++) d[g] = Qy(r, o, u, f, s, g);
  return c.dataArray = u, c.stride = f, c.size = s, c.getView = function(h) {
    return d[h];
  }, c.setPoint = function(h, m2, p) {
    var y = d[h];
    y[0] = m2, y[1] = p;
  }, c.bufferSubData = function(h) {
    r.bindBuffer(r.ARRAY_BUFFER, c), h ? r.bufferSubData(r.ARRAY_BUFFER, 0, u, 0, h * s) : r.bufferSubData(r.ARRAY_BUFFER, 0, u);
  }, c;
}
m(Vr, "createBufferDynamicDraw");
function jy(r, e, t) {
  for (var a = 9, n = new Float32Array(e * a), i = new Array(e), s = 0; s < e; s++) {
    var o = s * a * 4;
    i[s] = new Float32Array(n.buffer, o, a);
  }
  var l = r.createBuffer();
  r.bindBuffer(r.ARRAY_BUFFER, l), r.bufferData(r.ARRAY_BUFFER, n.byteLength, r.DYNAMIC_DRAW);
  for (var u = 0; u < 3; u++) {
    var f = t + u;
    r.enableVertexAttribArray(f), r.vertexAttribPointer(f, 3, r.FLOAT, false, 36, u * 12), r.vertexAttribDivisor(f, 1);
  }
  return r.bindBuffer(r.ARRAY_BUFFER, null), l.getMatrixView = function(c) {
    return i[c];
  }, l.setData = function(c, d) {
    i[d].set(c, 0);
  }, l.bufferSubData = function() {
    r.bindBuffer(r.ARRAY_BUFFER, l), r.bufferSubData(r.ARRAY_BUFFER, 0, n);
  }, l;
}
m(jy, "create3x3MatrixBufferDynamicDraw");
function em(r) {
  var e = r.createFramebuffer();
  r.bindFramebuffer(r.FRAMEBUFFER, e);
  var t = r.createTexture();
  return r.bindTexture(r.TEXTURE_2D, t), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, t, 0), r.bindFramebuffer(r.FRAMEBUFFER, null), e.setFramebufferAttachmentSizes = function(a, n) {
    r.bindTexture(r.TEXTURE_2D, t), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, a, n, 0, r.RGBA, r.UNSIGNED_BYTE, null);
  }, e;
}
m(em, "createPickingFrameBuffer");
var $l = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var r = 0, e = arguments.length; e--; ) r += arguments[e] * arguments[e];
  return Math.sqrt(r);
});
function Cs() {
  var r = new $l(9);
  return $l != Float32Array && (r[1] = 0, r[2] = 0, r[3] = 0, r[5] = 0, r[6] = 0, r[7] = 0), r[0] = 1, r[4] = 1, r[8] = 1, r;
}
m(Cs, "create");
function Ul(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r;
}
m(Ul, "identity");
function rm(r, e, t) {
  var a = e[0], n = e[1], i = e[2], s = e[3], o = e[4], l = e[5], u = e[6], f = e[7], c = e[8], d = t[0], g = t[1], h = t[2], m2 = t[3], p = t[4], y = t[5], b = t[6], w = t[7], x = t[8];
  return r[0] = d * a + g * s + h * u, r[1] = d * n + g * o + h * f, r[2] = d * i + g * l + h * c, r[3] = m2 * a + p * s + y * u, r[4] = m2 * n + p * o + y * f, r[5] = m2 * i + p * l + y * c, r[6] = b * a + w * s + x * u, r[7] = b * n + w * o + x * f, r[8] = b * i + w * l + x * c, r;
}
m(rm, "multiply");
function mn(r, e, t) {
  var a = e[0], n = e[1], i = e[2], s = e[3], o = e[4], l = e[5], u = e[6], f = e[7], c = e[8], d = t[0], g = t[1];
  return r[0] = a, r[1] = n, r[2] = i, r[3] = s, r[4] = o, r[5] = l, r[6] = d * a + g * s + u, r[7] = d * n + g * o + f, r[8] = d * i + g * l + c, r;
}
m(mn, "translate");
function Kl(r, e, t) {
  var a = e[0], n = e[1], i = e[2], s = e[3], o = e[4], l = e[5], u = e[6], f = e[7], c = e[8], d = Math.sin(t), g = Math.cos(t);
  return r[0] = g * a + d * s, r[1] = g * n + d * o, r[2] = g * i + d * l, r[3] = g * s - d * a, r[4] = g * o - d * n, r[5] = g * l - d * i, r[6] = u, r[7] = f, r[8] = c, r;
}
m(Kl, "rotate");
function $s(r, e, t) {
  var a = t[0], n = t[1];
  return r[0] = a * e[0], r[1] = a * e[1], r[2] = a * e[2], r[3] = n * e[3], r[4] = n * e[4], r[5] = n * e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r;
}
m($s, "scale");
function tm(r, e, t) {
  return r[0] = 2 / e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = -2 / t, r[5] = 0, r[6] = -1, r[7] = 1, r[8] = 1, r;
}
m(tm, "projection");
var am = function() {
  function r(e, t, a, n) {
    gt(this, r), this.debugID = Math.floor(Math.random() * 1e4), this.r = e, this.texSize = t, this.texRows = a, this.texHeight = Math.floor(t / a), this.enableWrapping = true, this.locked = false, this.texture = null, this.needsBuffer = true, this.freePointer = { x: 0, row: 0 }, this.keyToLocation = /* @__PURE__ */ new Map(), this.canvas = n(e, t, t), this.scratch = n(e, t, this.texHeight, "scratch");
  }
  return m(r, "Atlas"), pt(r, [{ key: "lock", value: m(function() {
    this.locked = true;
  }, "lock") }, { key: "getKeys", value: m(function() {
    return new Set(this.keyToLocation.keys());
  }, "getKeys") }, { key: "getScale", value: m(function(t) {
    var a = t.w, n = t.h, i = this.texHeight, s = this.texSize, o = i / n, l = a * o, u = n * o;
    return l > s && (o = s / a, l = a * o, u = n * o), { scale: o, texW: l, texH: u };
  }, "getScale") }, { key: "draw", value: m(function(t, a, n) {
    var i = this;
    if (this.locked) throw new Error("can't draw, atlas is locked");
    var s = this.texSize, o = this.texRows, l = this.texHeight, u = this.getScale(a), f = u.scale, c = u.texW, d = u.texH, g = m(function(w, x) {
      if (n && x) {
        var C = x.context, T = w.x, E = w.row, S = T, D = l * E;
        C.save(), C.translate(S, D), C.scale(f, f), n(C, a), C.restore();
      }
    }, "drawAt"), h = [null, null], m2 = m(function() {
      g(i.freePointer, i.canvas), h[0] = { x: i.freePointer.x, y: i.freePointer.row * l, w: c, h: d }, h[1] = { x: i.freePointer.x + c, y: i.freePointer.row * l, w: 0, h: d }, i.freePointer.x += c, i.freePointer.x == s && (i.freePointer.x = 0, i.freePointer.row++);
    }, "drawNormal"), p = m(function() {
      var w = i.scratch, x = i.canvas;
      w.clear(), g({ x: 0, row: 0 }, w);
      var C = s - i.freePointer.x, T = c - C, E = l;
      {
        var S = i.freePointer.x, D = i.freePointer.row * l, B = C;
        x.context.drawImage(w, 0, 0, B, E, S, D, B, E), h[0] = { x: S, y: D, w: B, h: d };
      }
      {
        var P = C, A = (i.freePointer.row + 1) * l, R = T;
        x && x.context.drawImage(w, P, 0, R, E, 0, A, R, E), h[1] = { x: 0, y: A, w: R, h: d };
      }
      i.freePointer.x = T, i.freePointer.row++;
    }, "drawWrapped"), y = m(function() {
      i.freePointer.x = 0, i.freePointer.row++;
    }, "moveToStartOfNextRow");
    if (this.freePointer.x + c <= s) m2();
    else {
      if (this.freePointer.row >= o - 1) return false;
      this.freePointer.x === s ? (y(), m2()) : this.enableWrapping ? p() : (y(), m2());
    }
    return this.keyToLocation.set(t, h), this.needsBuffer = true, h;
  }, "draw") }, { key: "getOffsets", value: m(function(t) {
    return this.keyToLocation.get(t);
  }, "getOffsets") }, { key: "isEmpty", value: m(function() {
    return this.freePointer.x === 0 && this.freePointer.row === 0;
  }, "isEmpty") }, { key: "canFit", value: m(function(t) {
    if (this.locked) return false;
    var a = this.texSize, n = this.texRows, i = this.getScale(t), s = i.texW;
    return this.freePointer.x + s > a ? this.freePointer.row < n - 1 : true;
  }, "canFit") }, { key: "bufferIfNeeded", value: m(function(t) {
    this.texture || (this.texture = Zy(t, this.debugID)), this.needsBuffer && (this.texture.buffer(this.canvas), this.needsBuffer = false, this.locked && (this.canvas = null, this.scratch = null));
  }, "bufferIfNeeded") }, { key: "dispose", value: m(function() {
    this.texture && (this.texture.deleteTexture(), this.texture = null), this.canvas = null, this.scratch = null, this.locked = true;
  }, "dispose") }]);
}();
var nm = function() {
  function r(e, t, a, n) {
    gt(this, r), this.r = e, this.texSize = t, this.texRows = a, this.createTextureCanvas = n, this.atlases = [], this.styleKeyToAtlas = /* @__PURE__ */ new Map(), this.markedKeys = /* @__PURE__ */ new Set();
  }
  return m(r, "AtlasCollection"), pt(r, [{ key: "getKeys", value: m(function() {
    return new Set(this.styleKeyToAtlas.keys());
  }, "getKeys") }, { key: "_createAtlas", value: m(function() {
    var t = this.r, a = this.texSize, n = this.texRows, i = this.createTextureCanvas;
    return new am(t, a, n, i);
  }, "_createAtlas") }, { key: "_getScratchCanvas", value: m(function() {
    if (!this.scratch) {
      var t = this.r, a = this.texSize, n = this.texRows, i = this.createTextureCanvas, s = Math.floor(a / n);
      this.scratch = i(t, a, s, "scratch");
    }
    return this.scratch;
  }, "_getScratchCanvas") }, { key: "draw", value: m(function(t, a, n) {
    var i = this.styleKeyToAtlas.get(t);
    return i || (i = this.atlases[this.atlases.length - 1], (!i || !i.canFit(a)) && (i && i.lock(), i = this._createAtlas(), this.atlases.push(i)), i.draw(t, a, n), this.styleKeyToAtlas.set(t, i)), i;
  }, "draw") }, { key: "getAtlas", value: m(function(t) {
    return this.styleKeyToAtlas.get(t);
  }, "getAtlas") }, { key: "hasAtlas", value: m(function(t) {
    return this.styleKeyToAtlas.has(t);
  }, "hasAtlas") }, { key: "markKeyForGC", value: m(function(t) {
    this.markedKeys.add(t);
  }, "markKeyForGC") }, { key: "gc", value: m(function() {
    var t = this, a = this.markedKeys;
    if (a.size === 0) {
      console.log("nothing to garbage collect");
      return;
    }
    var n = [], i = /* @__PURE__ */ new Map(), s = null, o = Dr(this.atlases), l;
    try {
      var u = m(function() {
        var c = l.value, d = c.getKeys(), g = im(a, d);
        if (g.size === 0) return n.push(c), d.forEach(function(C) {
          return i.set(C, c);
        }), 1;
        s || (s = t._createAtlas(), n.push(s));
        var h = Dr(d), m2;
        try {
          for (h.s(); !(m2 = h.n()).done; ) {
            var p = m2.value;
            if (!g.has(p)) {
              var y = c.getOffsets(p), b = je(y, 2), w = b[0], x = b[1];
              s.canFit({ w: w.w + x.w, h: w.h }) || (s.lock(), s = t._createAtlas(), n.push(s)), c.canvas && (t._copyTextureToNewAtlas(p, c, s), i.set(p, s));
            }
          }
        } catch (C) {
          h.e(C);
        } finally {
          h.f();
        }
        c.dispose();
      }, "_loop");
      for (o.s(); !(l = o.n()).done; ) u();
    } catch (f) {
      o.e(f);
    } finally {
      o.f();
    }
    this.atlases = n, this.styleKeyToAtlas = i, this.markedKeys = /* @__PURE__ */ new Set();
  }, "gc") }, { key: "_copyTextureToNewAtlas", value: m(function(t, a, n) {
    var i = a.getOffsets(t), s = je(i, 2), o = s[0], l = s[1];
    if (l.w === 0) n.draw(t, o, function(d) {
      d.drawImage(a.canvas, o.x, o.y, o.w, o.h, 0, 0, o.w, o.h);
    });
    else {
      var u = this._getScratchCanvas();
      u.clear(), u.context.drawImage(a.canvas, o.x, o.y, o.w, o.h, 0, 0, o.w, o.h), u.context.drawImage(a.canvas, l.x, l.y, l.w, l.h, o.w, 0, l.w, l.h);
      var f = o.w + l.w, c = o.h;
      n.draw(t, { w: f, h: c }, function(d) {
        d.drawImage(u, 0, 0, f, c, 0, 0, f, c);
      });
    }
  }, "_copyTextureToNewAtlas") }, { key: "getCounts", value: m(function() {
    return { keyCount: this.styleKeyToAtlas.size, atlasCount: new Set(this.styleKeyToAtlas.values()).size };
  }, "getCounts") }]);
}();
function im(r, e) {
  return r.intersection ? r.intersection(e) : new Set(bn(r).filter(function(t) {
    return e.has(t);
  }));
}
m(im, "intersection");
var sm = function() {
  function r(e, t) {
    gt(this, r), this.r = e, this.globalOptions = t, this.atlasSize = t.webglTexSize, this.maxAtlasesPerBatch = t.webglTexPerBatch, this.renderTypes = /* @__PURE__ */ new Map(), this.collections = /* @__PURE__ */ new Map(), this.typeAndIdToKey = /* @__PURE__ */ new Map();
  }
  return m(r, "AtlasManager"), pt(r, [{ key: "getAtlasSize", value: m(function() {
    return this.atlasSize;
  }, "getAtlasSize") }, { key: "addAtlasCollection", value: m(function(t, a) {
    var n = this.globalOptions, i = n.webglTexSize, s = n.createTextureCanvas, o = a.texRows, l = this._cacheScratchCanvas(s), u = new nm(this.r, i, o, l);
    this.collections.set(t, u);
  }, "addAtlasCollection") }, { key: "addRenderType", value: m(function(t, a) {
    var n = a.collection;
    if (!this.collections.has(n)) throw new Error("invalid atlas collection name '".concat(n, "'"));
    var i = this.collections.get(n), s = we({ type: t, atlasCollection: i }, a);
    this.renderTypes.set(t, s);
  }, "addRenderType") }, { key: "getRenderTypeOpts", value: m(function(t) {
    return this.renderTypes.get(t);
  }, "getRenderTypeOpts") }, { key: "getAtlasCollection", value: m(function(t) {
    return this.collections.get(t);
  }, "getAtlasCollection") }, { key: "_cacheScratchCanvas", value: m(function(t) {
    var a = -1, n = -1, i = null;
    return function(s, o, l, u) {
      return u ? ((!i || o != a || l != n) && (a = o, n = l, i = t(s, o, l)), i) : t(s, o, l);
    };
  }, "_cacheScratchCanvas") }, { key: "_key", value: m(function(t, a) {
    return "".concat(t, "-").concat(a);
  }, "_key") }, { key: "invalidate", value: m(function(t) {
    var a = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.forceRedraw, s = i === void 0 ? false : i, o = n.filterEle, l = o === void 0 ? function() {
      return true;
    } : o, u = n.filterType, f = u === void 0 ? function() {
      return true;
    } : u, c = false, d = false, g = Dr(t), h;
    try {
      for (g.s(); !(h = g.n()).done; ) {
        var m2 = h.value;
        if (l(m2)) {
          var p = Dr(this.renderTypes.values()), y;
          try {
            var b = m(function() {
              var x = y.value, C = x.type;
              if (f(C)) {
                var T = a.collections.get(x.collection), E = x.getKey(m2), S = Array.isArray(E) ? E : [E];
                if (s) S.forEach(function(A) {
                  return T.markKeyForGC(A);
                }), d = true;
                else {
                  var D = x.getID ? x.getID(m2) : m2.id(), B = a._key(C, D), P = a.typeAndIdToKey.get(B);
                  P !== void 0 && !Xy(S, P) && (c = true, a.typeAndIdToKey.delete(B), P.forEach(function(A) {
                    return T.markKeyForGC(A);
                  }));
                }
              }
            }, "_loop2");
            for (p.s(); !(y = p.n()).done; ) b();
          } catch (w) {
            p.e(w);
          } finally {
            p.f();
          }
        }
      }
    } catch (w) {
      g.e(w);
    } finally {
      g.f();
    }
    return d && (this.gc(), c = false), c;
  }, "invalidate") }, { key: "gc", value: m(function() {
    var t = Dr(this.collections.values()), a;
    try {
      for (t.s(); !(a = t.n()).done; ) {
        var n = a.value;
        n.gc();
      }
    } catch (i) {
      t.e(i);
    } finally {
      t.f();
    }
  }, "gc") }, { key: "getOrCreateAtlas", value: m(function(t, a, n, i) {
    var s = this.renderTypes.get(a), o = this.collections.get(s.collection), l = false, u = o.draw(i, n, function(d) {
      s.drawClipped ? (d.save(), d.beginPath(), d.rect(0, 0, n.w, n.h), d.clip(), s.drawElement(d, t, n, true, true), d.restore()) : s.drawElement(d, t, n, true, true), l = true;
    });
    if (l) {
      var f = s.getID ? s.getID(t) : t.id(), c = this._key(a, f);
      this.typeAndIdToKey.has(c) ? this.typeAndIdToKey.get(c).push(i) : this.typeAndIdToKey.set(c, [i]);
    }
    return u;
  }, "getOrCreateAtlas") }, { key: "getAtlasInfo", value: m(function(t, a) {
    var n = this, i = this.renderTypes.get(a), s = i.getKey(t), o = Array.isArray(s) ? s : [s];
    return o.map(function(l) {
      var u = i.getBoundingBox(t, l), f = n.getOrCreateAtlas(t, a, u, l), c = f.getOffsets(l), d = je(c, 2), g = d[0], h = d[1];
      return { atlas: f, tex: g, tex1: g, tex2: h, bb: u };
    });
  }, "getAtlasInfo") }, { key: "getDebugInfo", value: m(function() {
    var t = [], a = Dr(this.collections), n;
    try {
      for (a.s(); !(n = a.n()).done; ) {
        var i = je(n.value, 2), s = i[0], o = i[1], l = o.getCounts(), u = l.keyCount, f = l.atlasCount;
        t.push({ type: s, keyCount: u, atlasCount: f });
      }
    } catch (c) {
      a.e(c);
    } finally {
      a.f();
    }
    return t;
  }, "getDebugInfo") }]);
}();
var om = function() {
  function r(e) {
    gt(this, r), this.globalOptions = e, this.atlasSize = e.webglTexSize, this.maxAtlasesPerBatch = e.webglTexPerBatch, this.batchAtlases = [];
  }
  return m(r, "AtlasBatchManager"), pt(r, [{ key: "getMaxAtlasesPerBatch", value: m(function() {
    return this.maxAtlasesPerBatch;
  }, "getMaxAtlasesPerBatch") }, { key: "getAtlasSize", value: m(function() {
    return this.atlasSize;
  }, "getAtlasSize") }, { key: "getIndexArray", value: m(function() {
    return Array.from({ length: this.maxAtlasesPerBatch }, function(t, a) {
      return a;
    });
  }, "getIndexArray") }, { key: "startBatch", value: m(function() {
    this.batchAtlases = [];
  }, "startBatch") }, { key: "getAtlasCount", value: m(function() {
    return this.batchAtlases.length;
  }, "getAtlasCount") }, { key: "getAtlases", value: m(function() {
    return this.batchAtlases;
  }, "getAtlases") }, { key: "canAddToCurrentBatch", value: m(function(t) {
    return this.batchAtlases.length === this.maxAtlasesPerBatch ? this.batchAtlases.includes(t) : true;
  }, "canAddToCurrentBatch") }, { key: "getAtlasIndexForBatch", value: m(function(t) {
    var a = this.batchAtlases.indexOf(t);
    if (a < 0) {
      if (this.batchAtlases.length === this.maxAtlasesPerBatch) throw new Error("cannot add more atlases to batch");
      this.batchAtlases.push(t), a = this.batchAtlases.length - 1;
    }
    return a;
  }, "getAtlasIndexForBatch") }]);
}();
var um = `
  float circleSD(vec2 p, float r) {
    return distance(vec2(0), p) - r; // signed distance
  }
`;
var lm = `
  float rectangleSD(vec2 p, vec2 b) {
    vec2 d = abs(p)-b;
    return distance(vec2(0),max(d,0.0)) + min(max(d.x,d.y),0.0);
  }
`;
var vm = `
  float roundRectangleSD(vec2 p, vec2 b, vec4 cr) {
    cr.xy = (p.x > 0.0) ? cr.xy : cr.zw;
    cr.x  = (p.y > 0.0) ? cr.x  : cr.y;
    vec2 q = abs(p) - b + cr.x;
    return min(max(q.x, q.y), 0.0) + distance(vec2(0), max(q, 0.0)) - cr.x;
  }
`;
var fm = `
  float ellipseSD(vec2 p, vec2 ab) {
    p = abs( p ); // symmetry

    // find root with Newton solver
    vec2 q = ab*(p-ab);
    float w = (q.x<q.y)? 1.570796327 : 0.0;
    for( int i=0; i<5; i++ ) {
      vec2 cs = vec2(cos(w),sin(w));
      vec2 u = ab*vec2( cs.x,cs.y);
      vec2 v = ab*vec2(-cs.y,cs.x);
      w = w + dot(p-u,v)/(dot(p-u,u)+dot(v,v));
    }
    
    // compute final point and distance
    float d = length(p-ab*vec2(cos(w),sin(w)));
    
    // return signed distance
    return (dot(p/ab,p/ab)>1.0) ? d : -d;
  }
`;
var Ca = { SCREEN: { name: "screen", screen: true }, PICKING: { name: "picking", picking: true } };
var Rn = { IGNORE: 1, USE_BB: 2 };
var Ts = 0;
var Xl = 1;
var Yl = 2;
var Ss = 3;
var Ht = 4;
var on = 5;
var pa = 6;
var ya = 7;
var cm = function() {
  function r(e, t, a) {
    gt(this, r), this.r = e, this.gl = t, this.maxInstances = a.webglBatchSize, this.atlasSize = a.webglTexSize, this.bgColor = a.bgColor, this.debug = a.webglDebug, this.batchDebugInfo = [], a.enableWrapping = true, a.createTextureCanvas = Wy, this.atlasManager = new sm(e, a), this.batchManager = new om(a), this.simpleShapeOptions = /* @__PURE__ */ new Map(), this.program = this._createShaderProgram(Ca.SCREEN), this.pickingProgram = this._createShaderProgram(Ca.PICKING), this.vao = this._createVAO();
  }
  return m(r, "ElementDrawingWebGL"), pt(r, [{ key: "addAtlasCollection", value: m(function(t, a) {
    this.atlasManager.addAtlasCollection(t, a);
  }, "addAtlasCollection") }, { key: "addTextureAtlasRenderType", value: m(function(t, a) {
    this.atlasManager.addRenderType(t, a);
  }, "addTextureAtlasRenderType") }, { key: "addSimpleShapeRenderType", value: m(function(t, a) {
    this.simpleShapeOptions.set(t, a);
  }, "addSimpleShapeRenderType") }, { key: "invalidate", value: m(function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = a.type, i = this.atlasManager;
    return n ? i.invalidate(t, { filterType: m(function(o) {
      return o === n;
    }, "filterType"), forceRedraw: true }) : i.invalidate(t);
  }, "invalidate") }, { key: "gc", value: m(function() {
    this.atlasManager.gc();
  }, "gc") }, { key: "_createShaderProgram", value: m(function(t) {
    var a = this.gl, n = `#version 300 es
      precision highp float;

      uniform mat3 uPanZoomMatrix;
      uniform int  uAtlasSize;
      
      // instanced
      in vec2 aPosition; // a vertex from the unit square
      
      in mat3 aTransform; // used to transform verticies, eg into a bounding box
      in int aVertType; // the type of thing we are rendering

      // the z-index that is output when using picking mode
      in vec4 aIndex;
      
      // For textures
      in int aAtlasId; // which shader unit/atlas to use
      in vec4 aTex; // x/y/w/h of texture in atlas

      // for edges
      in vec4 aPointAPointB;
      in vec4 aPointCPointD;
      in vec2 aLineWidth; // also used for node border width

      // simple shapes
      in vec4 aCornerRadius; // for round-rectangle [top-right, bottom-right, top-left, bottom-left]
      in vec4 aColor; // also used for edges
      in vec4 aBorderColor; // aLineWidth is used for border width

      // output values passed to the fragment shader
      out vec2 vTexCoord;
      out vec4 vColor;
      out vec2 vPosition;
      // flat values are not interpolated
      flat out int vAtlasId; 
      flat out int vVertType;
      flat out vec2 vTopRight;
      flat out vec2 vBotLeft;
      flat out vec4 vCornerRadius;
      flat out vec4 vBorderColor;
      flat out vec2 vBorderWidth;
      flat out vec4 vIndex;
      
      void main(void) {
        int vid = gl_VertexID;
        vec2 position = aPosition; // TODO make this a vec3, simplifies some code below

        if(aVertType == `.concat(Ts, `) {
          float texX = aTex.x; // texture coordinates
          float texY = aTex.y;
          float texW = aTex.z;
          float texH = aTex.w;

          if(vid == 1 || vid == 2 || vid == 4) {
            texX += texW;
          }
          if(vid == 2 || vid == 4 || vid == 5) {
            texY += texH;
          }

          float d = float(uAtlasSize);
          vTexCoord = vec2(texX / d, texY / d); // tex coords must be between 0 and 1

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
        }
        else if(aVertType == `).concat(Ht, " || aVertType == ").concat(ya, ` 
             || aVertType == `).concat(on, " || aVertType == ").concat(pa, `) { // simple shapes

          // the bounding box is needed by the fragment shader
          vBotLeft  = (aTransform * vec3(0, 0, 1)).xy; // flat
          vTopRight = (aTransform * vec3(1, 1, 1)).xy; // flat
          vPosition = (aTransform * vec3(position, 1)).xy; // will be interpolated

          // calculations are done in the fragment shader, just pass these along
          vColor = aColor;
          vCornerRadius = aCornerRadius;
          vBorderColor = aBorderColor;
          vBorderWidth = aLineWidth;

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
        }
        else if(aVertType == `).concat(Xl, `) {
          vec2 source = aPointAPointB.xy;
          vec2 target = aPointAPointB.zw;

          // adjust the geometry so that the line is centered on the edge
          position.y = position.y - 0.5;

          // stretch the unit square into a long skinny rectangle
          vec2 xBasis = target - source;
          vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));
          vec2 point = source + xBasis * position.x + yBasis * aLineWidth[0] * position.y;

          gl_Position = vec4(uPanZoomMatrix * vec3(point, 1.0), 1.0);
          vColor = aColor;
        } 
        else if(aVertType == `).concat(Yl, `) {
          vec2 pointA = aPointAPointB.xy;
          vec2 pointB = aPointAPointB.zw;
          vec2 pointC = aPointCPointD.xy;
          vec2 pointD = aPointCPointD.zw;

          // adjust the geometry so that the line is centered on the edge
          position.y = position.y - 0.5;

          vec2 p0, p1, p2, pos;
          if(position.x == 0.0) { // The left side of the unit square
            p0 = pointA;
            p1 = pointB;
            p2 = pointC;
            pos = position;
          } else { // The right side of the unit square, use same approach but flip the geometry upside down
            p0 = pointD;
            p1 = pointC;
            p2 = pointB;
            pos = vec2(0.0, -position.y);
          }

          vec2 p01 = p1 - p0;
          vec2 p12 = p2 - p1;
          vec2 p21 = p1 - p2;

          // Find the normal vector.
          vec2 tangent = normalize(normalize(p12) + normalize(p01));
          vec2 normal = vec2(-tangent.y, tangent.x);

          // Find the vector perpendicular to p0 -> p1.
          vec2 p01Norm = normalize(vec2(-p01.y, p01.x));

          // Determine the bend direction.
          float sigma = sign(dot(p01 + p21, normal));
          float width = aLineWidth[0];

          if(sign(pos.y) == -sigma) {
            // This is an intersecting vertex. Adjust the position so that there's no overlap.
            vec2 point = 0.5 * width * normal * -sigma / dot(normal, p01Norm);
            gl_Position = vec4(uPanZoomMatrix * vec3(p1 + point, 1.0), 1.0);
          } else {
            // This is a non-intersecting vertex. Treat it like a mitre join.
            vec2 point = 0.5 * width * normal * sigma * dot(normal, p01Norm);
            gl_Position = vec4(uPanZoomMatrix * vec3(p1 + point, 1.0), 1.0);
          }

          vColor = aColor;
        } 
        else if(aVertType == `).concat(Ss, ` && vid < 3) {
          // massage the first triangle into an edge arrow
          if(vid == 0)
            position = vec2(-0.15, -0.3);
          if(vid == 1)
            position = vec2(  0.0,  0.0);
          if(vid == 2)
            position = vec2( 0.15, -0.3);

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
          vColor = aColor;
        }
        else {
          gl_Position = vec4(2.0, 0.0, 0.0, 1.0); // discard vertex by putting it outside webgl clip space
        }

        vAtlasId = aAtlasId;
        vVertType = aVertType;
        vIndex = aIndex;
      }
    `), i = this.batchManager.getIndexArray(), s = `#version 300 es
      precision highp float;

      // declare texture unit for each texture atlas in the batch
      `.concat(i.map(function(u) {
      return "uniform sampler2D uTexture".concat(u, ";");
    }).join(`
	`), `

      uniform vec4 uBGColor;
      uniform float uZoom;

      in vec2 vTexCoord;
      in vec4 vColor;
      in vec2 vPosition; // model coordinates

      flat in int vAtlasId;
      flat in vec4 vIndex;
      flat in int vVertType;
      flat in vec2 vTopRight;
      flat in vec2 vBotLeft;
      flat in vec4 vCornerRadius;
      flat in vec4 vBorderColor;
      flat in vec2 vBorderWidth;

      out vec4 outColor;

      `).concat(um, `
      `).concat(lm, `
      `).concat(vm, `
      `).concat(fm, `

      vec4 blend(vec4 top, vec4 bot) { // blend colors with premultiplied alpha
        return vec4( 
          top.rgb + (bot.rgb * (1.0 - top.a)),
          top.a   + (bot.a   * (1.0 - top.a)) 
        );
      }

      vec4 distInterp(vec4 cA, vec4 cB, float d) { // interpolate color using Signed Distance
        // scale to the zoom level so that borders don't look blurry when zoomed in
        // note 1.5 is an aribitrary value chosen because it looks good
        return mix(cA, cB, 1.0 - smoothstep(0.0, 1.5 / uZoom, abs(d))); 
      }

      void main(void) {
        if(vVertType == `).concat(Ts, `) {
          // look up the texel from the texture unit
          `).concat(i.map(function(u) {
      return "if(vAtlasId == ".concat(u, ") outColor = texture(uTexture").concat(u, ", vTexCoord);");
    }).join(`
	else `), `
        } 
        else if(vVertType == `).concat(Ss, `) {
          // mimics how canvas renderer uses context.globalCompositeOperation = 'destination-out';
          outColor = blend(vColor, uBGColor);
          outColor.a = 1.0; // make opaque, masks out line under arrow
        }
        else if(vVertType == `).concat(Ht, ` && vBorderWidth == vec2(0.0)) { // simple rectangle with no border
          outColor = vColor; // unit square is already transformed to the rectangle, nothing else needs to be done
        }
        else if(vVertType == `).concat(Ht, " || vVertType == ").concat(ya, ` 
          || vVertType == `).concat(on, " || vVertType == ").concat(pa, `) { // use SDF

          float outerBorder = vBorderWidth[0];
          float innerBorder = vBorderWidth[1];
          float borderPadding = outerBorder * 2.0;
          float w = vTopRight.x - vBotLeft.x - borderPadding;
          float h = vTopRight.y - vBotLeft.y - borderPadding;
          vec2 b = vec2(w/2.0, h/2.0); // half width, half height
          vec2 p = vPosition - vec2(vTopRight.x - b[0] - outerBorder, vTopRight.y - b[1] - outerBorder); // translate to center

          float d; // signed distance
          if(vVertType == `).concat(Ht, `) {
            d = rectangleSD(p, b);
          } else if(vVertType == `).concat(ya, ` && w == h) {
            d = circleSD(p, b.x); // faster than ellipse
          } else if(vVertType == `).concat(ya, `) {
            d = ellipseSD(p, b);
          } else {
            d = roundRectangleSD(p, b, vCornerRadius.wzyx);
          }

          // use the distance to interpolate a color to smooth the edges of the shape, doesn't need multisampling
          // we must smooth colors inwards, because we can't change pixels outside the shape's bounding box
          if(d > 0.0) {
            if(d > outerBorder) {
              discard;
            } else {
              outColor = distInterp(vBorderColor, vec4(0), d - outerBorder);
            }
          } else {
            if(d > innerBorder) {
              vec4 outerColor = outerBorder == 0.0 ? vec4(0) : vBorderColor;
              vec4 innerBorderColor = blend(vBorderColor, vColor);
              outColor = distInterp(innerBorderColor, outerColor, d);
            } 
            else {
              vec4 outerColor;
              if(innerBorder == 0.0 && outerBorder == 0.0) {
                outerColor = vec4(0);
              } else if(innerBorder == 0.0) {
                outerColor = vBorderColor;
              } else {
                outerColor = blend(vBorderColor, vColor);
              }
              outColor = distInterp(vColor, outerColor, d - innerBorder);
            }
          }
        }
        else {
          outColor = vColor;
        }

        `).concat(t.picking ? `if(outColor.a == 0.0) discard;
             else outColor = vIndex;` : "", `
      }
    `), o = Hy(a, n, s);
    o.aPosition = a.getAttribLocation(o, "aPosition"), o.aIndex = a.getAttribLocation(o, "aIndex"), o.aVertType = a.getAttribLocation(o, "aVertType"), o.aTransform = a.getAttribLocation(o, "aTransform"), o.aAtlasId = a.getAttribLocation(o, "aAtlasId"), o.aTex = a.getAttribLocation(o, "aTex"), o.aPointAPointB = a.getAttribLocation(o, "aPointAPointB"), o.aPointCPointD = a.getAttribLocation(o, "aPointCPointD"), o.aLineWidth = a.getAttribLocation(o, "aLineWidth"), o.aColor = a.getAttribLocation(o, "aColor"), o.aCornerRadius = a.getAttribLocation(o, "aCornerRadius"), o.aBorderColor = a.getAttribLocation(o, "aBorderColor"), o.uPanZoomMatrix = a.getUniformLocation(o, "uPanZoomMatrix"), o.uAtlasSize = a.getUniformLocation(o, "uAtlasSize"), o.uBGColor = a.getUniformLocation(o, "uBGColor"), o.uZoom = a.getUniformLocation(o, "uZoom"), o.uTextures = [];
    for (var l = 0; l < this.batchManager.getMaxAtlasesPerBatch(); l++) o.uTextures.push(a.getUniformLocation(o, "uTexture".concat(l)));
    return o;
  }, "_createShaderProgram") }, { key: "_createVAO", value: m(function() {
    var t = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
    this.vertexCount = t.length / 2;
    var a = this.maxInstances, n = this.gl, i = this.program, s = n.createVertexArray();
    return n.bindVertexArray(s), Jy(n, "vec2", i.aPosition, t), this.transformBuffer = jy(n, a, i.aTransform), this.indexBuffer = Vr(n, a, "vec4", i.aIndex), this.vertTypeBuffer = Vr(n, a, "int", i.aVertType), this.atlasIdBuffer = Vr(n, a, "int", i.aAtlasId), this.texBuffer = Vr(n, a, "vec4", i.aTex), this.pointAPointBBuffer = Vr(n, a, "vec4", i.aPointAPointB), this.pointCPointDBuffer = Vr(n, a, "vec4", i.aPointCPointD), this.lineWidthBuffer = Vr(n, a, "vec2", i.aLineWidth), this.colorBuffer = Vr(n, a, "vec4", i.aColor), this.cornerRadiusBuffer = Vr(n, a, "vec4", i.aCornerRadius), this.borderColorBuffer = Vr(n, a, "vec4", i.aBorderColor), n.bindVertexArray(null), s;
  }, "_createVAO") }, { key: "buffers", get: m(function() {
    var t = this;
    return this._buffers || (this._buffers = Object.keys(this).filter(function(a) {
      return nt(a, "Buffer");
    }).map(function(a) {
      return t[a];
    })), this._buffers;
  }, "get") }, { key: "startFrame", value: m(function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ca.SCREEN;
    this.panZoomMatrix = t, this.renderTarget = a, this.batchDebugInfo = [], this.wrappedCount = 0, this.simpleCount = 0, this.startBatch();
  }, "startFrame") }, { key: "startBatch", value: m(function() {
    this.instanceCount = 0, this.batchManager.startBatch();
  }, "startBatch") }, { key: "endFrame", value: m(function() {
    this.endBatch();
  }, "endFrame") }, { key: "_isVisible", value: m(function(t, a) {
    return t.visible() ? a && a.isVisible ? a.isVisible(t) : true : false;
  }, "_isVisible") }, { key: "drawTexture", value: m(function(t, a, n) {
    var i = this.atlasManager, s = this.batchManager, o = i.getRenderTypeOpts(n);
    if (this._isVisible(t, o) && !(t.isEdge() && !this._isValidEdge(t))) {
      if (this.renderTarget.picking && o.getTexPickingMode) {
        var l = o.getTexPickingMode(t);
        if (l === Rn.IGNORE) return;
        if (l == Rn.USE_BB) {
          this.drawPickingRectangle(t, a, n);
          return;
        }
      }
      var u = i.getAtlasInfo(t, n), f = Dr(u), c;
      try {
        for (f.s(); !(c = f.n()).done; ) {
          var d = c.value, g = d.atlas, h = d.tex1, m2 = d.tex2;
          s.canAddToCurrentBatch(g) || this.endBatch();
          for (var p = s.getAtlasIndexForBatch(g), y = 0, b = [[h, true], [m2, false]]; y < b.length; y++) {
            var w = je(b[y], 2), x = w[0], C = w[1];
            if (x.w != 0) {
              var T = this.instanceCount;
              this.vertTypeBuffer.getView(T)[0] = Ts;
              var E = this.indexBuffer.getView(T);
              Gt(a, E);
              var S = this.atlasIdBuffer.getView(T);
              S[0] = p;
              var D = this.texBuffer.getView(T);
              D[0] = x.x, D[1] = x.y, D[2] = x.w, D[3] = x.h;
              var B = this.transformBuffer.getMatrixView(T);
              this.setTransformMatrix(t, B, o, d, C), this.instanceCount++, C || this.wrappedCount++, this.instanceCount >= this.maxInstances && this.endBatch();
            }
          }
        }
      } catch (P) {
        f.e(P);
      } finally {
        f.f();
      }
    }
  }, "drawTexture") }, { key: "setTransformMatrix", value: m(function(t, a, n, i) {
    var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, o = 0;
    if (n.shapeProps && n.shapeProps.padding && (o = t.pstyle(n.shapeProps.padding).pfValue), i) {
      var l = i.bb, u = i.tex1, f = i.tex2, c = u.w / (u.w + f.w);
      s || (c = 1 - c);
      var d = this._getAdjustedBB(l, o, s, c);
      this._applyTransformMatrix(a, d, n, t);
    } else {
      var g = n.getBoundingBox(t), h = this._getAdjustedBB(g, o, true, 1);
      this._applyTransformMatrix(a, h, n, t);
    }
  }, "setTransformMatrix") }, { key: "_applyTransformMatrix", value: m(function(t, a, n, i) {
    var s, o;
    Ul(t);
    var l = n.getRotation ? n.getRotation(i) : 0;
    if (l !== 0) {
      var u = n.getRotationPoint(i), f = u.x, c = u.y;
      mn(t, t, [f, c]), Kl(t, t, l);
      var d = n.getRotationOffset(i);
      s = d.x + (a.xOffset || 0), o = d.y + (a.yOffset || 0);
    } else s = a.x1, o = a.y1;
    mn(t, t, [s, o]), $s(t, t, [a.w, a.h]);
  }, "_applyTransformMatrix") }, { key: "_getAdjustedBB", value: m(function(t, a, n, i) {
    var s = t.x1, o = t.y1, l = t.w, u = t.h, f = t.yOffset;
    a && (s -= a, o -= a, l += 2 * a, u += 2 * a);
    var c = 0, d = l * i;
    return n && i < 1 ? l = d : !n && i < 1 && (c = l - d, s += c, l = d), { x1: s, y1: o, w: l, h: u, xOffset: c, yOffset: f };
  }, "_getAdjustedBB") }, { key: "drawPickingRectangle", value: m(function(t, a, n) {
    var i = this.atlasManager.getRenderTypeOpts(n), s = this.instanceCount;
    this.vertTypeBuffer.getView(s)[0] = Ht;
    var o = this.indexBuffer.getView(s);
    Gt(a, o);
    var l = this.colorBuffer.getView(s);
    Et([0, 0, 0], 1, l);
    var u = this.transformBuffer.getMatrixView(s);
    this.setTransformMatrix(t, u, i), this.simpleCount++, this.instanceCount++, this.instanceCount >= this.maxInstances && this.endBatch();
  }, "drawPickingRectangle") }, { key: "drawNode", value: m(function(t, a, n) {
    var i = this.simpleShapeOptions.get(n);
    if (this._isVisible(t, i)) {
      var s = i.shapeProps, o = this._getVertTypeForShape(t, s.shape);
      if (o === void 0 || i.isSimple && !i.isSimple(t)) {
        this.drawTexture(t, a, n);
        return;
      }
      var l = this.instanceCount;
      if (this.vertTypeBuffer.getView(l)[0] = o, o === on || o === pa) {
        var u = i.getBoundingBox(t), f = this._getCornerRadius(t, s.radius, u), c = this.cornerRadiusBuffer.getView(l);
        c[0] = f, c[1] = f, c[2] = f, c[3] = f, o === pa && (c[0] = 0, c[2] = 0);
      }
      var d = this.indexBuffer.getView(l);
      Gt(a, d);
      var g = t.pstyle(s.color).value, h = t.pstyle(s.opacity).value, m2 = this.colorBuffer.getView(l);
      Et(g, h, m2);
      var p = this.lineWidthBuffer.getView(l);
      if (p[0] = 0, p[1] = 0, s.border) {
        var y = t.pstyle("border-width").value;
        if (y > 0) {
          var b = t.pstyle("border-color").value, w = t.pstyle("border-opacity").value, x = this.borderColorBuffer.getView(l);
          Et(b, w, x);
          var C = t.pstyle("border-position").value;
          if (C === "inside") p[0] = 0, p[1] = -y;
          else if (C === "outside") p[0] = y, p[1] = 0;
          else {
            var T = y / 2;
            p[0] = T, p[1] = -T;
          }
        }
      }
      var E = this.transformBuffer.getMatrixView(l);
      this.setTransformMatrix(t, E, i), this.simpleCount++, this.instanceCount++, this.instanceCount >= this.maxInstances && this.endBatch();
    }
  }, "drawNode") }, { key: "_getVertTypeForShape", value: m(function(t, a) {
    var n = t.pstyle(a).value;
    switch (n) {
      case "rectangle":
        return Ht;
      case "ellipse":
        return ya;
      case "roundrectangle":
      case "round-rectangle":
        return on;
      case "bottom-round-rectangle":
        return pa;
      default:
        return;
    }
  }, "_getVertTypeForShape") }, { key: "_getCornerRadius", value: m(function(t, a, n) {
    var i = n.w, s = n.h;
    if (t.pstyle(a).value === "auto") return ft(i, s);
    var o = t.pstyle(a).pfValue, l = i / 2, u = s / 2;
    return Math.min(o, u, l);
  }, "_getCornerRadius") }, { key: "drawEdgeArrow", value: m(function(t, a, n) {
    if (t.visible()) {
      var i = t._private.rscratch, s, o, l;
      if (n === "source" ? (s = i.arrowStartX, o = i.arrowStartY, l = i.srcArrowAngle) : (s = i.arrowEndX, o = i.arrowEndY, l = i.tgtArrowAngle), !(isNaN(s) || s == null || isNaN(o) || o == null || isNaN(l) || l == null)) {
        var u = t.pstyle(n + "-arrow-shape").value;
        if (u !== "none") {
          var f = t.pstyle(n + "-arrow-color").value, c = t.pstyle("opacity").value, d = t.pstyle("line-opacity").value, g = c * d, h = t.pstyle("width").pfValue, m2 = t.pstyle("arrow-scale").value, p = this.r.getArrowWidth(h, m2), y = this.instanceCount, b = this.transformBuffer.getMatrixView(y);
          Ul(b), mn(b, b, [s, o]), $s(b, b, [p, p]), Kl(b, b, l), this.vertTypeBuffer.getView(y)[0] = Ss;
          var w = this.indexBuffer.getView(y);
          Gt(a, w);
          var x = this.colorBuffer.getView(y);
          Et(f, g, x), this.instanceCount++, this.instanceCount >= this.maxInstances && this.endBatch();
        }
      }
    }
  }, "drawEdgeArrow") }, { key: "drawEdgeLine", value: m(function(t, a) {
    if (t.visible()) {
      var n = this._getEdgePoints(t);
      if (n) {
        var i = t.pstyle("opacity").value, s = t.pstyle("line-opacity").value, o = t.pstyle("width").pfValue, l = t.pstyle("line-color").value, u = i * s;
        if (n.length / 2 + this.instanceCount > this.maxInstances && this.endBatch(), n.length == 4) {
          var f = this.instanceCount;
          this.vertTypeBuffer.getView(f)[0] = Xl;
          var c = this.indexBuffer.getView(f);
          Gt(a, c);
          var d = this.colorBuffer.getView(f);
          Et(l, u, d);
          var g = this.lineWidthBuffer.getView(f);
          g[0] = o;
          var h = this.pointAPointBBuffer.getView(f);
          h[0] = n[0], h[1] = n[1], h[2] = n[2], h[3] = n[3], this.instanceCount++, this.instanceCount >= this.maxInstances && this.endBatch();
        } else for (var m2 = 0; m2 < n.length - 2; m2 += 2) {
          var p = this.instanceCount;
          this.vertTypeBuffer.getView(p)[0] = Yl;
          var y = this.indexBuffer.getView(p);
          Gt(a, y);
          var b = this.colorBuffer.getView(p);
          Et(l, u, b);
          var w = this.lineWidthBuffer.getView(p);
          w[0] = o;
          var x = n[m2 - 2], C = n[m2 - 1], T = n[m2], E = n[m2 + 1], S = n[m2 + 2], D = n[m2 + 3], B = n[m2 + 4], P = n[m2 + 5];
          m2 == 0 && (x = 2 * T - S + 1e-3, C = 2 * E - D + 1e-3), m2 == n.length - 4 && (B = 2 * S - T + 1e-3, P = 2 * D - E + 1e-3);
          var A = this.pointAPointBBuffer.getView(p);
          A[0] = x, A[1] = C, A[2] = T, A[3] = E;
          var R = this.pointCPointDBuffer.getView(p);
          R[0] = S, R[1] = D, R[2] = B, R[3] = P, this.instanceCount++, this.instanceCount >= this.maxInstances && this.endBatch();
        }
      }
    }
  }, "drawEdgeLine") }, { key: "_isValidEdge", value: m(function(t) {
    var a = t._private.rscratch;
    return !(a.badLine || a.allpts == null || isNaN(a.allpts[0]));
  }, "_isValidEdge") }, { key: "_getEdgePoints", value: m(function(t) {
    var a = t._private.rscratch;
    if (this._isValidEdge(t)) {
      var n = a.allpts;
      if (n.length == 4) return n;
      var i = this._getNumSegments(t);
      return this._getCurveSegmentPoints(n, i);
    }
  }, "_getEdgePoints") }, { key: "_getNumSegments", value: m(function(t) {
    var a = 15;
    return Math.min(Math.max(a, 5), this.maxInstances);
  }, "_getNumSegments") }, { key: "_getCurveSegmentPoints", value: m(function(t, a) {
    if (t.length == 4) return t;
    for (var n = Array((a + 1) * 2), i = 0; i <= a; i++) if (i == 0) n[0] = t[0], n[1] = t[1];
    else if (i == a) n[i * 2] = t[t.length - 2], n[i * 2 + 1] = t[t.length - 1];
    else {
      var s = i / a;
      this._setCurvePoint(t, s, n, i * 2);
    }
    return n;
  }, "_getCurveSegmentPoints") }, { key: "_setCurvePoint", value: m(function(t, a, n, i) {
    if (t.length <= 2) n[i] = t[0], n[i + 1] = t[1];
    else {
      for (var s = Array(t.length - 2), o = 0; o < s.length; o += 2) {
        var l = (1 - a) * t[o] + a * t[o + 2], u = (1 - a) * t[o + 1] + a * t[o + 3];
        s[o] = l, s[o + 1] = u;
      }
      return this._setCurvePoint(s, a, n, i);
    }
  }, "_setCurvePoint") }, { key: "endBatch", value: m(function() {
    var t = this.gl, a = this.vao, n = this.vertexCount, i = this.instanceCount;
    if (i !== 0) {
      var s = this.renderTarget.picking ? this.pickingProgram : this.program;
      t.useProgram(s), t.bindVertexArray(a);
      var o = Dr(this.buffers), l;
      try {
        for (o.s(); !(l = o.n()).done; ) {
          var u = l.value;
          u.bufferSubData(i);
        }
      } catch (h) {
        o.e(h);
      } finally {
        o.f();
      }
      for (var f = this.batchManager.getAtlases(), c = 0; c < f.length; c++) f[c].bufferIfNeeded(t);
      for (var d = 0; d < f.length; d++) t.activeTexture(t.TEXTURE0 + d), t.bindTexture(t.TEXTURE_2D, f[d].texture), t.uniform1i(s.uTextures[d], d);
      t.uniform1f(s.uZoom, $y(this.r)), t.uniformMatrix3fv(s.uPanZoomMatrix, false, this.panZoomMatrix), t.uniform1i(s.uAtlasSize, this.batchManager.getAtlasSize());
      var g = Et(this.bgColor, 1);
      t.uniform4fv(s.uBGColor, g), t.drawArraysInstanced(t.TRIANGLES, 0, n, i), t.bindVertexArray(null), t.bindTexture(t.TEXTURE_2D, null), this.debug && this.batchDebugInfo.push({ count: i, atlasCount: f.length }), this.startBatch();
    }
  }, "endBatch") }, { key: "getDebugInfo", value: m(function() {
    var t = this.atlasManager.getDebugInfo(), a = t.reduce(function(s, o) {
      return s + o.atlasCount;
    }, 0), n = this.batchDebugInfo, i = n.reduce(function(s, o) {
      return s + o.count;
    }, 0);
    return { atlasInfo: t, totalAtlases: a, wrappedCount: this.wrappedCount, simpleCount: this.simpleCount, batchCount: n.length, batchInfo: n, totalInstances: i };
  }, "getDebugInfo") }]);
}();
var Lf = {};
Lf.initWebgl = function(r, e) {
  var t = this, a = t.data.contexts[t.WEBGL];
  r.bgColor = dm(t), r.webglTexSize = Math.min(r.webglTexSize, a.getParameter(a.MAX_TEXTURE_SIZE)), r.webglTexRows = Math.min(r.webglTexRows, 54), r.webglTexRowsNodes = Math.min(r.webglTexRowsNodes, 54), r.webglBatchSize = Math.min(r.webglBatchSize, 16384), r.webglTexPerBatch = Math.min(r.webglTexPerBatch, a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)), t.webglDebug = r.webglDebug, t.webglDebugShowAtlases = r.webglDebugShowAtlases, t.pickingFrameBuffer = em(a), t.pickingFrameBuffer.needsDraw = true, t.drawing = new cm(t, a, r);
  var n = m(function(c) {
    return function(d) {
      return t.getTextAngle(d, c);
    };
  }, "getLabelRotation"), i = m(function(c) {
    return function(d) {
      var g = d.pstyle(c);
      return g && g.value;
    };
  }, "isLabelVisible"), s = m(function(c) {
    return function(d) {
      return d.pstyle("".concat(c, "-opacity")).value > 0;
    };
  }, "isLayerVisible"), o = m(function(c) {
    var d = c.pstyle("text-events").strValue === "yes";
    return d ? Rn.USE_BB : Rn.IGNORE;
  }, "getTexPickingMode"), l = m(function(c) {
    var d = c.position(), g = d.x, h = d.y, m2 = c.outerWidth(), p = c.outerHeight();
    return { w: m2, h: p, x1: g - m2 / 2, y1: h - p / 2 };
  }, "getBBForSimpleShape");
  t.drawing.addAtlasCollection("node", { texRows: r.webglTexRowsNodes }), t.drawing.addAtlasCollection("label", { texRows: r.webglTexRows }), t.drawing.addTextureAtlasRenderType("node-body", { collection: "node", getKey: e.getStyleKey, getBoundingBox: e.getElementBox, drawElement: e.drawElement }), t.drawing.addSimpleShapeRenderType("node-body", { getBoundingBox: l, isSimple: Ky, shapeProps: { shape: "shape", color: "background-color", opacity: "background-opacity", radius: "corner-radius", border: true } }), t.drawing.addSimpleShapeRenderType("node-overlay", { getBoundingBox: l, isVisible: s("overlay"), shapeProps: { shape: "overlay-shape", color: "overlay-color", opacity: "overlay-opacity", padding: "overlay-padding", radius: "overlay-corner-radius" } }), t.drawing.addSimpleShapeRenderType("node-underlay", { getBoundingBox: l, isVisible: s("underlay"), shapeProps: { shape: "underlay-shape", color: "underlay-color", opacity: "underlay-opacity", padding: "underlay-padding", radius: "underlay-corner-radius" } }), t.drawing.addTextureAtlasRenderType("label", { collection: "label", getTexPickingMode: o, getKey: ks(e.getLabelKey, null), getBoundingBox: Ds(e.getLabelBox, null), drawClipped: true, drawElement: e.drawLabel, getRotation: n(null), getRotationPoint: e.getLabelRotationPoint, getRotationOffset: e.getLabelRotationOffset, isVisible: i("label") }), t.drawing.addTextureAtlasRenderType("edge-source-label", { collection: "label", getTexPickingMode: o, getKey: ks(e.getSourceLabelKey, "source"), getBoundingBox: Ds(e.getSourceLabelBox, "source"), drawClipped: true, drawElement: e.drawSourceLabel, getRotation: n("source"), getRotationPoint: e.getSourceLabelRotationPoint, getRotationOffset: e.getSourceLabelRotationOffset, isVisible: i("source-label") }), t.drawing.addTextureAtlasRenderType("edge-target-label", { collection: "label", getTexPickingMode: o, getKey: ks(e.getTargetLabelKey, "target"), getBoundingBox: Ds(e.getTargetLabelBox, "target"), drawClipped: true, drawElement: e.drawTargetLabel, getRotation: n("target"), getRotationPoint: e.getTargetLabelRotationPoint, getRotationOffset: e.getTargetLabelRotationOffset, isVisible: i("target-label") });
  var u = Va(function() {
    console.log("garbage collect flag set"), t.data.gc = true;
  }, 1e4);
  t.onUpdateEleCalcs(function(f, c) {
    var d = false;
    c && c.length > 0 && (d |= t.drawing.invalidate(c)), d && u();
  }), hm(t);
};
function dm(r) {
  var e = r.cy.container(), t = e && e.style && e.style.backgroundColor || "white";
  return sv(t);
}
m(dm, "getBGColor");
function If(r, e) {
  var t = r._private.rscratch;
  return Sr(t, "labelWrapCachedLines", e) || [];
}
m(If, "getLabelLines");
var ks = m(function(e, t) {
  return function(a) {
    var n = e(a), i = If(a, t);
    return i.length > 1 ? i.map(function(s, o) {
      return "".concat(n, "_").concat(o);
    }) : n;
  };
}, "getStyleKeysForLabel");
var Ds = m(function(e, t) {
  return function(a, n) {
    var i = e(a);
    if (typeof n == "string") {
      var s = n.indexOf("_");
      if (s > 0) {
        var o = Number(n.substring(s + 1)), l = If(a, t), u = i.h / l.length, f = u * o, c = i.y1 + f;
        return { x1: i.x1, w: i.w, y1: c, h: u, yOffset: f };
      }
    }
    return i;
  };
}, "getBoundingBoxForLabel");
function hm(r) {
  {
    var e = r.render;
    r.render = function(i) {
      i = i || {};
      var s = r.cy;
      r.webgl && (s.zoom() > kf ? (gm(r), e.call(r, i)) : (pm(r), Nf(r, i, Ca.SCREEN)));
    };
  }
  {
    var t = r.matchCanvasSize;
    r.matchCanvasSize = function(i) {
      t.call(r, i), r.pickingFrameBuffer.setFramebufferAttachmentSizes(r.canvasWidth, r.canvasHeight), r.pickingFrameBuffer.needsDraw = true;
    };
  }
  r.findNearestElements = function(i, s, o, l) {
    return Em(r, i, s);
  };
  {
    var a = r.invalidateCachedZSortedEles;
    r.invalidateCachedZSortedEles = function() {
      a.call(r), r.pickingFrameBuffer.needsDraw = true;
    };
  }
  {
    var n = r.notify;
    r.notify = function(i, s) {
      n.call(r, i, s), i === "viewport" || i === "bounds" ? r.pickingFrameBuffer.needsDraw = true : i === "background" && r.drawing.invalidate(s, { type: "node-body" });
    };
  }
}
m(hm, "overrideCanvasRendererFunctions");
function gm(r) {
  var e = r.data.contexts[r.WEBGL];
  e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
}
m(gm, "clearWebgl");
function pm(r) {
  var e = m(function(a) {
    a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, r.canvasWidth, r.canvasHeight), a.restore();
  }, "clear");
  e(r.data.contexts[r.NODE]), e(r.data.contexts[r.DRAG]);
}
m(pm, "clearCanvas");
function ym(r) {
  var e = r.canvasWidth, t = r.canvasHeight, a = wo(r), n = a.pan, i = a.zoom, s = Cs();
  mn(s, s, [n.x, n.y]), $s(s, s, [i, i]);
  var o = Cs();
  tm(o, e, t);
  var l = Cs();
  return rm(l, o, s), l;
}
m(ym, "createPanZoomMatrix");
function Of(r, e) {
  var t = r.canvasWidth, a = r.canvasHeight, n = wo(r), i = n.pan, s = n.zoom;
  e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t, a), e.translate(i.x, i.y), e.scale(s, s);
}
m(Of, "setContextTransform");
function mm(r, e) {
  r.drawSelectionRectangle(e, function(t) {
    return Of(r, t);
  });
}
m(mm, "drawSelectionRectangle");
function bm(r) {
  var e = r.data.contexts[r.NODE];
  e.save(), Of(r, e), e.strokeStyle = "rgba(0, 0, 0, 0.3)", e.beginPath(), e.moveTo(-1e3, 0), e.lineTo(1e3, 0), e.stroke(), e.beginPath(), e.moveTo(0, -1e3), e.lineTo(0, 1e3), e.stroke(), e.restore();
}
m(bm, "drawAxes");
function wm(r) {
  var e = m(function(n, i, s) {
    for (var o = n.atlasManager.getAtlasCollection(i), l = r.data.contexts[r.NODE], u = o.atlases, f = 0; f < u.length; f++) {
      var c = u[f], d = c.canvas;
      if (d) {
        var g = d.width, h = d.height, m2 = g * f, p = d.height * s, y = 0.4;
        l.save(), l.scale(y, y), l.drawImage(d, m2, p), l.strokeStyle = "black", l.rect(m2, p, g, h), l.stroke(), l.restore();
      }
    }
  }, "draw"), t = 0;
  e(r.drawing, "node", t++), e(r.drawing, "label", t++);
}
m(wm, "drawAtlases");
function xm(r, e, t, a, n) {
  var i, s, o, l, u = wo(r), f = u.pan, c = u.zoom;
  {
    var d = Uy(r, f, c, e, t), g = je(d, 2), h = g[0], m2 = g[1], p = 6;
    i = h - p / 2, s = m2 - p / 2, o = p, l = p;
  }
  if (o === 0 || l === 0) return [];
  var y = r.data.contexts[r.WEBGL];
  y.bindFramebuffer(y.FRAMEBUFFER, r.pickingFrameBuffer), r.pickingFrameBuffer.needsDraw && (y.viewport(0, 0, y.canvas.width, y.canvas.height), Nf(r, null, Ca.PICKING), r.pickingFrameBuffer.needsDraw = false);
  var b = o * l, w = new Uint8Array(b * 4);
  y.readPixels(i, s, o, l, y.RGBA, y.UNSIGNED_BYTE, w), y.bindFramebuffer(y.FRAMEBUFFER, null);
  for (var x = /* @__PURE__ */ new Set(), C = 0; C < b; C++) {
    var T = w.slice(C * 4, C * 4 + 4), E = Yy(T) - 1;
    E >= 0 && x.add(E);
  }
  return x;
}
m(xm, "getPickingIndexes");
function Em(r, e, t) {
  var a = xm(r, e, t), n = r.getCachedZSortedEles(), i, s, o = Dr(a), l;
  try {
    for (o.s(); !(l = o.n()).done; ) {
      var u = l.value, f = n[u];
      if (!i && f.isNode() && (i = f), !s && f.isEdge() && (s = f), i && s) break;
    }
  } catch (c) {
    o.e(c);
  } finally {
    o.f();
  }
  return [i, s].filter(Boolean);
}
m(Em, "findNearestElementsWebgl");
function Bs(r, e, t) {
  var a = r.drawing;
  e += 1, t.isNode() ? (a.drawNode(t, e, "node-underlay"), a.drawNode(t, e, "node-body"), a.drawTexture(t, e, "label"), a.drawNode(t, e, "node-overlay")) : (a.drawEdgeLine(t, e), a.drawEdgeArrow(t, e, "source"), a.drawEdgeArrow(t, e, "target"), a.drawTexture(t, e, "label"), a.drawTexture(t, e, "edge-source-label"), a.drawTexture(t, e, "edge-target-label"));
}
m(Bs, "drawEle");
function Nf(r, e, t) {
  var a;
  r.webglDebug && (a = performance.now());
  var n = r.drawing, i = 0;
  if (t.screen && r.data.canvasNeedsRedraw[r.SELECT_BOX] && mm(r, e), r.data.canvasNeedsRedraw[r.NODE] || t.picking) {
    var s = r.data.contexts[r.WEBGL];
    t.screen ? (s.clearColor(0, 0, 0, 0), s.enable(s.BLEND), s.blendFunc(s.ONE, s.ONE_MINUS_SRC_ALPHA)) : s.disable(s.BLEND), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.viewport(0, 0, s.canvas.width, s.canvas.height);
    var o = ym(r), l = r.getCachedZSortedEles();
    if (i = l.length, n.startFrame(o, t), t.screen) {
      for (var u = 0; u < l.nondrag.length; u++) Bs(r, u, l.nondrag[u]);
      for (var f = 0; f < l.drag.length; f++) Bs(r, f, l.drag[f]);
    } else if (t.picking) for (var c = 0; c < l.length; c++) Bs(r, c, l[c]);
    n.endFrame(), t.screen && r.webglDebugShowAtlases && (bm(r), wm(r)), r.data.canvasNeedsRedraw[r.NODE] = false, r.data.canvasNeedsRedraw[r.DRAG] = false;
  }
  if (r.webglDebug) {
    var d = performance.now(), g = false, h = Math.ceil(d - a), m2 = n.getDebugInfo(), p = ["".concat(i, " elements"), "".concat(m2.totalInstances, " instances"), "".concat(m2.batchCount, " batches"), "".concat(m2.totalAtlases, " atlases"), "".concat(m2.wrappedCount, " wrapped textures"), "".concat(m2.simpleCount, " simple shapes")].join(", ");
    if (g) console.log("WebGL (".concat(t.name, ") - time ").concat(h, "ms, ").concat(p));
    else {
      console.log("WebGL (".concat(t.name, ") - frame time ").concat(h, "ms")), console.log("Totals:"), console.log("  ".concat(p)), console.log("Texture Atlases Used:");
      var y = m2.atlasInfo, b = Dr(y), w;
      try {
        for (b.s(); !(w = b.n()).done; ) {
          var x = w.value;
          console.log("  ".concat(x.type, ": ").concat(x.keyCount, " keys, ").concat(x.atlasCount, " atlases"));
        }
      } catch (C) {
        b.e(C);
      } finally {
        b.f();
      }
      console.log("");
    }
  }
  r.data.gc && (console.log("Garbage Collect!"), r.data.gc = false, n.gc());
}
m(Nf, "renderWebgl");
var bt = {};
bt.drawPolygonPath = function(r, e, t, a, n, i) {
  var s = a / 2, o = n / 2;
  r.beginPath && r.beginPath(), r.moveTo(e + s * i[0], t + o * i[1]);
  for (var l = 1; l < i.length / 2; l++) r.lineTo(e + s * i[l * 2], t + o * i[l * 2 + 1]);
  r.closePath();
};
bt.drawRoundPolygonPath = function(r, e, t, a, n, i, s) {
  s.forEach(function(o) {
    return yf(r, o);
  }), r.closePath();
};
bt.drawRoundRectanglePath = function(r, e, t, a, n, i) {
  var s = a / 2, o = n / 2, l = i === "auto" ? ft(a, n) : Math.min(i, o, s);
  r.beginPath && r.beginPath(), r.moveTo(e, t - o), r.arcTo(e + s, t - o, e + s, t, l), r.arcTo(e + s, t + o, e, t + o, l), r.arcTo(e - s, t + o, e - s, t, l), r.arcTo(e - s, t - o, e, t - o, l), r.lineTo(e, t - o), r.closePath();
};
bt.drawBottomRoundRectanglePath = function(r, e, t, a, n, i) {
  var s = a / 2, o = n / 2, l = i === "auto" ? ft(a, n) : i;
  r.beginPath && r.beginPath(), r.moveTo(e, t - o), r.lineTo(e + s, t - o), r.lineTo(e + s, t), r.arcTo(e + s, t + o, e, t + o, l), r.arcTo(e - s, t + o, e - s, t, l), r.lineTo(e - s, t - o), r.lineTo(e, t - o), r.closePath();
};
bt.drawCutRectanglePath = function(r, e, t, a, n, i, s) {
  var o = a / 2, l = n / 2, u = s === "auto" ? io() : s;
  r.beginPath && r.beginPath(), r.moveTo(e - o + u, t - l), r.lineTo(e + o - u, t - l), r.lineTo(e + o, t - l + u), r.lineTo(e + o, t + l - u), r.lineTo(e + o - u, t + l), r.lineTo(e - o + u, t + l), r.lineTo(e - o, t + l - u), r.lineTo(e - o, t - l + u), r.closePath();
};
bt.drawBarrelPath = function(r, e, t, a, n) {
  var i = a / 2, s = n / 2, o = e - i, l = e + i, u = t - s, f = t + s, c = Rs(a, n), d = c.widthOffset, g = c.heightOffset, h = c.ctrlPtOffsetPct * d;
  r.beginPath && r.beginPath(), r.moveTo(o, u + g), r.lineTo(o, f - g), r.quadraticCurveTo(o + h, f, o + d, f), r.lineTo(l - d, f), r.quadraticCurveTo(l - h, f, l, f - g), r.lineTo(l, u + g), r.quadraticCurveTo(l - h, u, l - d, u), r.lineTo(o + d, u), r.quadraticCurveTo(o + h, u, o, u + g), r.closePath();
};
var Zl = Math.sin(0);
var Ql = Math.cos(0);
var Us = {};
var Ks = {};
var zf = Math.PI / 40;
for (Ct = 0 * Math.PI; Ct < 2 * Math.PI; Ct += zf) Us[Ct] = Math.sin(Ct), Ks[Ct] = Math.cos(Ct);
var Ct;
bt.drawEllipsePath = function(r, e, t, a, n) {
  if (r.beginPath && r.beginPath(), r.ellipse) r.ellipse(e, t, a / 2, n / 2, 0, 0, 2 * Math.PI);
  else for (var i, s, o = a / 2, l = n / 2, u = 0 * Math.PI; u < 2 * Math.PI; u += zf) i = e - o * Us[u] * Zl + o * Ks[u] * Ql, s = t + l * Ks[u] * Zl + l * Us[u] * Ql, u === 0 ? r.moveTo(i, s) : r.lineTo(i, s);
  r.closePath();
};
var $a = {};
$a.createBuffer = function(r, e) {
  var t = document.createElement("canvas");
  return t.width = r, t.height = e, [t, t.getContext("2d")];
};
$a.bufferCanvasImage = function(r) {
  var e = this.cy, t = e.mutableElements(), a = t.boundingBox(), n = this.findContainerClientCoords(), i = r.full ? Math.ceil(a.w) : n[2], s = r.full ? Math.ceil(a.h) : n[3], o = ne(r.maxWidth) || ne(r.maxHeight), l = this.getPixelRatio(), u = 1;
  if (r.scale !== void 0) i *= r.scale, s *= r.scale, u = r.scale;
  else if (o) {
    var f = 1 / 0, c = 1 / 0;
    ne(r.maxWidth) && (f = u * r.maxWidth / i), ne(r.maxHeight) && (c = u * r.maxHeight / s), u = Math.min(f, c), i *= u, s *= u;
  }
  o || (i *= l, s *= l, u *= l);
  var d = document.createElement("canvas");
  d.width = i, d.height = s, d.style.width = i + "px", d.style.height = s + "px";
  var g = d.getContext("2d");
  if (i > 0 && s > 0) {
    g.clearRect(0, 0, i, s), g.globalCompositeOperation = "source-over";
    var h = this.getCachedZSortedEles();
    if (r.full) g.translate(-a.x1 * u, -a.y1 * u), g.scale(u, u), this.drawElements(g, h), g.scale(1 / u, 1 / u), g.translate(a.x1 * u, a.y1 * u);
    else {
      var m2 = e.pan(), p = { x: m2.x * u, y: m2.y * u };
      u *= e.zoom(), g.translate(p.x, p.y), g.scale(u, u), this.drawElements(g, h), g.scale(1 / u, 1 / u), g.translate(-p.x, -p.y);
    }
    r.bg && (g.globalCompositeOperation = "destination-over", g.fillStyle = r.bg, g.rect(0, 0, i, s), g.fill());
  }
  return d;
};
function Cm(r, e) {
  for (var t = atob(r), a = new ArrayBuffer(t.length), n = new Uint8Array(a), i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
  return new Blob([a], { type: e });
}
m(Cm, "b64ToBlob");
function Jl(r) {
  var e = r.indexOf(",");
  return r.substr(e + 1);
}
m(Jl, "b64UriToB64");
function Ff(r, e, t) {
  var a = m(function() {
    return e.toDataURL(t, r.quality);
  }, "getB64Uri");
  switch (r.output) {
    case "blob-promise":
      return new aa(function(n, i) {
        try {
          e.toBlob(function(s) {
            s != null ? n(s) : i(new Error("`canvas.toBlob()` sent a null value in its callback"));
          }, t, r.quality);
        } catch (s) {
          i(s);
        }
      });
    case "blob":
      return Cm(Jl(a()), t);
    case "base64":
      return Jl(a());
    case "base64uri":
    default:
      return a();
  }
}
m(Ff, "output");
$a.png = function(r) {
  return Ff(r, this.bufferCanvasImage(r), "image/png");
};
$a.jpg = function(r) {
  return Ff(r, this.bufferCanvasImage(r), "image/jpeg");
};
var Vf = {};
Vf.nodeShapeImpl = function(r, e, t, a, n, i, s, o) {
  switch (r) {
    case "ellipse":
      return this.drawEllipsePath(e, t, a, n, i);
    case "polygon":
      return this.drawPolygonPath(e, t, a, n, i, s);
    case "round-polygon":
      return this.drawRoundPolygonPath(e, t, a, n, i, s, o);
    case "roundrectangle":
    case "round-rectangle":
      return this.drawRoundRectanglePath(e, t, a, n, i, o);
    case "cutrectangle":
    case "cut-rectangle":
      return this.drawCutRectanglePath(e, t, a, n, i, s, o);
    case "bottomroundrectangle":
    case "bottom-round-rectangle":
      return this.drawBottomRoundRectanglePath(e, t, a, n, i, o);
    case "barrel":
      return this.drawBarrelPath(e, t, a, n, i);
  }
};
var Tm = qf;
var De = qf.prototype;
De.CANVAS_LAYERS = 3;
De.SELECT_BOX = 0;
De.DRAG = 1;
De.NODE = 2;
De.WEBGL = 3;
De.CANVAS_TYPES = ["2d", "2d", "2d", "webgl2"];
De.BUFFER_COUNT = 3;
De.TEXTURE_BUFFER = 0;
De.MOTIONBLUR_BUFFER_NODE = 1;
De.MOTIONBLUR_BUFFER_DRAG = 2;
function qf(r) {
  var e = this, t = e.cy.window(), a = t.document;
  r.webgl && (De.CANVAS_LAYERS = e.CANVAS_LAYERS = 4, console.log("webgl rendering enabled")), e.data = { canvases: new Array(De.CANVAS_LAYERS), contexts: new Array(De.CANVAS_LAYERS), canvasNeedsRedraw: new Array(De.CANVAS_LAYERS), bufferCanvases: new Array(De.BUFFER_COUNT), bufferContexts: new Array(De.CANVAS_LAYERS) };
  var n = "-webkit-tap-highlight-color", i = "rgba(0,0,0,0)";
  e.data.canvasContainer = a.createElement("div");
  var s = e.data.canvasContainer.style;
  e.data.canvasContainer.style[n] = i, s.position = "relative", s.zIndex = "0", s.overflow = "hidden";
  var o = r.cy.container();
  o.appendChild(e.data.canvasContainer), o.style[n] = i;
  var l = { "-webkit-user-select": "none", "-moz-user-select": "-moz-none", "user-select": "none", "-webkit-tap-highlight-color": "rgba(0,0,0,0)", "outline-style": "none" };
  mc() && (l["-ms-touch-action"] = "none", l["touch-action"] = "none");
  for (var u = 0; u < De.CANVAS_LAYERS; u++) {
    var f = e.data.canvases[u] = a.createElement("canvas"), c = De.CANVAS_TYPES[u];
    e.data.contexts[u] = f.getContext(c), e.data.contexts[u] || Ue("Could not create canvas of type " + c), Object.keys(l).forEach(function(j) {
      f.style[j] = l[j];
    }), f.style.position = "absolute", f.setAttribute("data-id", "layer" + u), f.style.zIndex = String(De.CANVAS_LAYERS - u), e.data.canvasContainer.appendChild(f), e.data.canvasNeedsRedraw[u] = false;
  }
  e.data.topCanvas = e.data.canvases[0], e.data.canvases[De.NODE].setAttribute("data-id", "layer" + De.NODE + "-node"), e.data.canvases[De.SELECT_BOX].setAttribute("data-id", "layer" + De.SELECT_BOX + "-selectbox"), e.data.canvases[De.DRAG].setAttribute("data-id", "layer" + De.DRAG + "-drag"), e.data.canvases[De.WEBGL] && e.data.canvases[De.WEBGL].setAttribute("data-id", "layer" + De.WEBGL + "-webgl");
  for (var u = 0; u < De.BUFFER_COUNT; u++) e.data.bufferCanvases[u] = a.createElement("canvas"), e.data.bufferContexts[u] = e.data.bufferCanvases[u].getContext("2d"), e.data.bufferCanvases[u].style.position = "absolute", e.data.bufferCanvases[u].setAttribute("data-id", "buffer" + u), e.data.bufferCanvases[u].style.zIndex = String(-u - 1), e.data.bufferCanvases[u].style.visibility = "hidden";
  e.pathsEnabled = true;
  var d = xr(), g = m(function(F) {
    return { x: (F.x1 + F.x2) / 2, y: (F.y1 + F.y2) / 2 };
  }, "getBoxCenter"), h = m(function(F) {
    return { x: -F.w / 2, y: -F.h / 2 };
  }, "getCenterOffset"), m2 = m(function(F) {
    var _ = F[0]._private, W = _.oldBackgroundTimestamp === _.backgroundTimestamp;
    return !W;
  }, "backgroundTimestampHasChanged"), p = m(function(F) {
    return F[0]._private.nodeKey;
  }, "getStyleKey"), y = m(function(F) {
    return F[0]._private.labelStyleKey;
  }, "getLabelKey"), b = m(function(F) {
    return F[0]._private.sourceLabelStyleKey;
  }, "getSourceLabelKey"), w = m(function(F) {
    return F[0]._private.targetLabelStyleKey;
  }, "getTargetLabelKey"), x = m(function(F, _, W, Z, ae) {
    return e.drawElement(F, _, W, false, false, ae);
  }, "drawElement"), C = m(function(F, _, W, Z, ae) {
    return e.drawElementText(F, _, W, Z, "main", ae);
  }, "drawLabel"), T = m(function(F, _, W, Z, ae) {
    return e.drawElementText(F, _, W, Z, "source", ae);
  }, "drawSourceLabel"), E = m(function(F, _, W, Z, ae) {
    return e.drawElementText(F, _, W, Z, "target", ae);
  }, "drawTargetLabel"), S = m(function(F) {
    return F.boundingBox(), F[0]._private.bodyBounds;
  }, "getElementBox"), D = m(function(F) {
    return F.boundingBox(), F[0]._private.labelBounds.main || d;
  }, "getLabelBox"), B = m(function(F) {
    return F.boundingBox(), F[0]._private.labelBounds.source || d;
  }, "getSourceLabelBox"), P = m(function(F) {
    return F.boundingBox(), F[0]._private.labelBounds.target || d;
  }, "getTargetLabelBox"), A = m(function(F, _) {
    return _;
  }, "isLabelVisibleAtScale"), R = m(function(F) {
    return g(S(F));
  }, "getElementRotationPoint"), M = m(function(F, _, W) {
    var Z = F ? F + "-" : "";
    return { x: _.x + W.pstyle(Z + "text-margin-x").pfValue, y: _.y + W.pstyle(Z + "text-margin-y").pfValue };
  }, "addTextMargin"), I = m(function(F, _, W) {
    var Z = F[0]._private.rscratch;
    return { x: Z[_], y: Z[W] };
  }, "getRsPt"), O = m(function(F) {
    return M("", I(F, "labelX", "labelY"), F);
  }, "getLabelRotationPoint"), L = m(function(F) {
    return M("source", I(F, "sourceLabelX", "sourceLabelY"), F);
  }, "getSourceLabelRotationPoint"), N = m(function(F) {
    return M("target", I(F, "targetLabelX", "targetLabelY"), F);
  }, "getTargetLabelRotationPoint"), q = m(function(F) {
    return h(S(F));
  }, "getElementRotationOffset"), H = m(function(F) {
    return h(B(F));
  }, "getSourceLabelRotationOffset"), z = m(function(F) {
    return h(P(F));
  }, "getTargetLabelRotationOffset"), V = m(function(F) {
    var _ = D(F), W = h(D(F));
    if (F.isNode()) {
      switch (F.pstyle("text-halign").value) {
        case "left":
          W.x = -_.w - (_.leftPad || 0);
          break;
        case "right":
          W.x = -(_.rightPad || 0);
          break;
      }
      switch (F.pstyle("text-valign").value) {
        case "top":
          W.y = -_.h - (_.topPad || 0);
          break;
        case "bottom":
          W.y = -(_.botPad || 0);
          break;
      }
    }
    return W;
  }, "getLabelRotationOffset"), K = e.data.eleTxrCache = new wa(e, { getKey: p, doesEleInvalidateKey: m2, drawElement: x, getBoundingBox: S, getRotationPoint: R, getRotationOffset: q, allowEdgeTxrCaching: false, allowParentTxrCaching: false }), J = e.data.lblTxrCache = new wa(e, { getKey: y, drawElement: C, getBoundingBox: D, getRotationPoint: O, getRotationOffset: V, isVisible: A }), X = e.data.slbTxrCache = new wa(e, { getKey: b, drawElement: T, getBoundingBox: B, getRotationPoint: L, getRotationOffset: H, isVisible: A }), ee = e.data.tlbTxrCache = new wa(e, { getKey: w, drawElement: E, getBoundingBox: P, getRotationPoint: N, getRotationOffset: z, isVisible: A }), te = e.data.lyrTxrCache = new Df(e);
  e.onUpdateEleCalcs(m(function(F, _) {
    K.invalidateElements(_), J.invalidateElements(_), X.invalidateElements(_), ee.invalidateElements(_), te.invalidateElements(_);
    for (var W = 0; W < _.length; W++) {
      var Z = _[W]._private;
      Z.oldBackgroundTimestamp = Z.backgroundTimestamp;
    }
  }, "invalidateTextureCaches"));
  var ie = m(function(F) {
    for (var _ = 0; _ < F.length; _++) te.enqueueElementRefinement(F[_].ele);
  }, "refineInLayers");
  K.onDequeue(ie), J.onDequeue(ie), X.onDequeue(ie), ee.onDequeue(ie), r.webgl && e.initWebgl(r, { getStyleKey: p, getLabelKey: y, getSourceLabelKey: b, getTargetLabelKey: w, drawElement: x, drawLabel: C, drawSourceLabel: T, drawTargetLabel: E, getElementBox: S, getLabelBox: D, getSourceLabelBox: B, getTargetLabelBox: P, getElementRotationPoint: R, getElementRotationOffset: q, getLabelRotationPoint: O, getSourceLabelRotationPoint: L, getTargetLabelRotationPoint: N, getLabelRotationOffset: V, getSourceLabelRotationOffset: H, getTargetLabelRotationOffset: z });
}
m(qf, "CanvasRenderer");
De.redrawHint = function(r, e) {
  var t = this;
  switch (r) {
    case "eles":
      t.data.canvasNeedsRedraw[De.NODE] = e;
      break;
    case "drag":
      t.data.canvasNeedsRedraw[De.DRAG] = e;
      break;
    case "select":
      t.data.canvasNeedsRedraw[De.SELECT_BOX] = e;
      break;
    case "gc":
      t.data.gc = true;
      break;
  }
};
var Sm = typeof Path2D < "u";
De.path2dEnabled = function(r) {
  if (r === void 0) return this.pathsEnabled;
  this.pathsEnabled = !!r;
};
De.usePaths = function() {
  return Sm && this.pathsEnabled;
};
De.setImgSmoothing = function(r, e) {
  r.imageSmoothingEnabled != null ? r.imageSmoothingEnabled = e : (r.webkitImageSmoothingEnabled = e, r.mozImageSmoothingEnabled = e, r.msImageSmoothingEnabled = e);
};
De.getImgSmoothing = function(r) {
  return r.imageSmoothingEnabled != null ? r.imageSmoothingEnabled : r.webkitImageSmoothingEnabled || r.mozImageSmoothingEnabled || r.msImageSmoothingEnabled;
};
De.makeOffscreenCanvas = function(r, e) {
  var t;
  if ((typeof OffscreenCanvas > "u" ? "undefined" : nr(OffscreenCanvas)) !== "undefined") t = new OffscreenCanvas(r, e);
  else {
    var a = this.cy.window(), n = a.document;
    t = n.createElement("canvas"), t.width = r, t.height = e;
  }
  return t;
};
[Bf, Wr, jr, bo, Ot, mt, Er, Lf, bt, $a, Vf].forEach(function(r) {
  we(De, r);
});
var km = [{ name: "null", impl: hf }, { name: "base", impl: Tf }, { name: "canvas", impl: Tm }];
var Dm = [{ type: "layout", extensions: Jp }, { type: "renderer", extensions: km }];
var _f = {};
var Gf = {};
function Hf(r, e, t) {
  var a = t, n = m(function(S) {
    qe("Can not register `" + e + "` for `" + r + "` since `" + S + "` already exists in the prototype and can not be overridden");
  }, "overrideErr");
  if (r === "core") {
    if (Ma.prototype[e]) return n(e);
    Ma.prototype[e] = t;
  } else if (r === "collection") {
    if (cr.prototype[e]) return n(e);
    cr.prototype[e] = t;
  } else if (r === "layout") {
    for (var i = m(function(S) {
      this.options = S, t.call(this, S), Ie(this._private) || (this._private = {}), this._private.cy = S.cy, this._private.listeners = [], this.createEmitter();
    }, "Layout"), s = i.prototype = Object.create(t.prototype), o = [], l = 0; l < o.length; l++) {
      var u = o[l];
      s[u] = s[u] || function() {
        return this;
      };
    }
    s.start && !s.run ? s.run = function() {
      return this.start(), this;
    } : !s.start && s.run && (s.start = function() {
      return this.run(), this;
    });
    var f = t.prototype.stop;
    s.stop = function() {
      var E = this.options;
      if (E && E.animate) {
        var S = this.animations;
        if (S) for (var D = 0; D < S.length; D++) S[D].stop();
      }
      return f ? f.call(this) : this.emit("layoutstop"), this;
    }, s.destroy || (s.destroy = function() {
      return this;
    }), s.cy = function() {
      return this._private.cy;
    };
    var c = m(function(S) {
      return S._private.cy;
    }, "getCy"), d = { addEventFields: m(function(S, D) {
      D.layout = S, D.cy = c(S), D.target = S;
    }, "addEventFields"), bubble: m(function() {
      return true;
    }, "bubble"), parent: m(function(S) {
      return c(S);
    }, "parent") };
    we(s, { createEmitter: m(function() {
      return this._private.emitter = new Hn(d, this), this;
    }, "createEmitter"), emitter: m(function() {
      return this._private.emitter;
    }, "emitter"), on: m(function(S, D) {
      return this.emitter().on(S, D), this;
    }, "on"), one: m(function(S, D) {
      return this.emitter().one(S, D), this;
    }, "one"), once: m(function(S, D) {
      return this.emitter().one(S, D), this;
    }, "once"), removeListener: m(function(S, D) {
      return this.emitter().removeListener(S, D), this;
    }, "removeListener"), removeAllListeners: m(function() {
      return this.emitter().removeAllListeners(), this;
    }, "removeAllListeners"), emit: m(function(S, D) {
      return this.emitter().emit(S, D), this;
    }, "emit") }), Ve.eventAliasesOn(s), a = i;
  } else if (r === "renderer" && e !== "null" && e !== "base") {
    var g = Wf("renderer", "base"), h = g.prototype, m2 = t, p = t.prototype, y = m(function() {
      g.apply(this, arguments), m2.apply(this, arguments);
    }, "Renderer"), b = y.prototype;
    for (var w in h) {
      var x = h[w], C = p[w] != null;
      if (C) return n(w);
      b[w] = x;
    }
    for (var T in p) b[T] = p[T];
    h.clientFunctions.forEach(function(E) {
      b[E] = b[E] || function() {
        Ue("Renderer does not implement `renderer." + E + "()` on its prototype");
      };
    }), a = y;
  } else if (r === "__proto__" || r === "constructor" || r === "prototype") return Ue(r + " is an illegal type to be registered, possibly lead to prototype pollutions");
  return ov({ map: _f, keys: [r, e], value: a });
}
m(Hf, "setExtension");
function Wf(r, e) {
  return uv({ map: _f, keys: [r, e] });
}
m(Wf, "getExtension");
function Bm(r, e, t, a, n) {
  return ov({ map: Gf, keys: [r, e, t, a], value: n });
}
m(Bm, "setModule");
function Pm(r, e, t, a) {
  return uv({ map: Gf, keys: [r, e, t, a] });
}
m(Pm, "getModule");
var Xs = m(function() {
  if (arguments.length === 2) return Wf.apply(null, arguments);
  if (arguments.length === 3) return Hf.apply(null, arguments);
  if (arguments.length === 4) return Pm.apply(null, arguments);
  if (arguments.length === 5) return Bm.apply(null, arguments);
  Ue("Invalid extension access syntax");
}, "extension");
Ma.prototype.extension = Xs;
Dm.forEach(function(r) {
  r.extensions.forEach(function(e) {
    Hf(r.type, e.name, e.impl);
  });
});
var Mn = m(function() {
  if (!(this instanceof Mn)) return new Mn();
  this.length = 0;
}, "Stylesheet");
var Lt = Mn.prototype;
Lt.instanceString = function() {
  return "stylesheet";
};
Lt.selector = function(r) {
  var e = this.length++;
  return this[e] = { selector: r, properties: [] }, this;
};
Lt.css = function(r, e) {
  var t = this.length - 1;
  if (pe(r)) this[t].properties.push({ name: r, value: e });
  else if (Ie(r)) for (var a = r, n = Object.keys(a), i = 0; i < n.length; i++) {
    var s = n[i], o = a[s];
    if (o != null) {
      var l = ur.properties[s] || ur.properties[Ln(s)];
      if (l != null) {
        var u = l.name, f = o;
        this[t].properties.push({ name: u, value: f });
      }
    }
  }
  return this;
};
Lt.style = Lt.css;
Lt.generateStyle = function(r) {
  var e = new ur(r);
  return this.appendToStyle(e);
};
Lt.appendToStyle = function(r) {
  for (var e = 0; e < this.length; e++) {
    var t = this[e], a = t.selector, n = t.properties;
    r.selector(a);
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      r.css(s.name, s.value);
    }
  }
  return r;
};
var Am = "3.33.1";
var ra = m(function(e) {
  if (e === void 0 && (e = {}), Ie(e)) return new Ma(e);
  if (pe(e)) return Xs.apply(Xs, arguments);
}, "cytoscape");
ra.use = function(r) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.unshift(ra), r.apply(null, e), this;
};
ra.warnings = function(r) {
  return gv(r);
};
ra.version = Am;
ra.stylesheet = ra.Stylesheet = Mn;

export {
  ra
};
/*! Bundled license information:

mermaid/dist/chunks/mermaid.esm.min/chunk-7RZVMHOQ.mjs:
  (*! Bundled license information:
  
  cytoscape/dist/cytoscape.esm.mjs:
    (*!
    Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
    Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
    Licensed under The MIT License (http://opensource.org/licenses/MIT)
    *)
    (*!
    Event object based on jQuery events, MIT license
    
    https://jquery.org/license/
    https://tldrlegal.com/license/mit-license
    https://github.com/jquery/jquery/blob/master/src/event.js
    *)
    (*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
    (*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
  *)
*/
//# sourceMappingURL=chunk-D7XFU3CV.js.map

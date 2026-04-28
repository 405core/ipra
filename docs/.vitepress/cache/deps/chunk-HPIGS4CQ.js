import {
  Wh,
  pt
} from "./chunk-LKDN26KO.js";
import {
  m,
  p
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-5YUVU3PZ.mjs
var vr = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s;
var qr = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi;
var Mr = /\s*%%.*\n/gm;
var _a;
var Vt = (_a = class extends Error {
  constructor(t) {
    super(t), this.name = "UnknownDiagramError";
  }
}, m(_a, "UnknownDiagramError"), _a);
var Yt = {};
var Ts = m(function(r, t) {
  r = r.replace(vr, "").replace(qr, "").replace(Mr, `
`);
  for (let [i, { detector: e }] of Object.entries(Yt)) if (e(r, t)) return i;
  throw new Vt(`No diagram type detected matching given configuration for text: ${r}`);
}, "detectType");
var ks = m((...r) => {
  for (let { id: t, detector: i, loader: e } of r) Li(t, i, e);
}, "registerLazyLoadedDiagrams");
var Li = m((r, t, i) => {
  Yt[r] && pt.warn(`Detector with key ${r} already exists. Overwriting.`), Yt[r] = { detector: t, loader: i }, pt.debug(`Detector with key ${r} added${i ? " with loader" : ""}`);
}, "addDetector");
var Bs = m((r) => Yt[r].loader, "getDiagramLoader");
var Ei = m((r, t, { depth: i = 2, clobber: e = false } = {}) => {
  let d = { depth: i, clobber: e };
  return Array.isArray(t) && !Array.isArray(r) ? (t.forEach((h) => Ei(r, h, d)), r) : Array.isArray(t) && Array.isArray(r) ? (t.forEach((h) => {
    r.includes(h) || r.push(h);
  }), r) : r === void 0 || i <= 0 ? r != null && typeof r == "object" && typeof t == "object" ? Object.assign(r, t) : t : (t !== void 0 && typeof r == "object" && typeof t == "object" && Object.keys(t).forEach((h) => {
    typeof t[h] == "object" && t[h] !== null && (r[h] === void 0 || typeof r[h] == "object") ? (r[h] === void 0 && (r[h] = Array.isArray(t[h]) ? [] : {}), r[h] = Ei(r[h], t[h], { depth: i - 1, clobber: e })) : (e || typeof r[h] != "object" && typeof t[h] != "object") && (r[h] = t[h]);
  }), r);
}, "assignWithDepth");
var w = Ei;
var Xt = { min: { r: 0, g: 0, b: 0, s: 0, l: 0, a: 0 }, max: { r: 255, g: 255, b: 255, h: 360, s: 100, l: 100, a: 1 }, clamp: { r: m((r) => r >= 255 ? 255 : r < 0 ? 0 : r, "r"), g: m((r) => r >= 255 ? 255 : r < 0 ? 0 : r, "g"), b: m((r) => r >= 255 ? 255 : r < 0 ? 0 : r, "b"), h: m((r) => r % 360, "h"), s: m((r) => r >= 100 ? 100 : r < 0 ? 0 : r, "s"), l: m((r) => r >= 100 ? 100 : r < 0 ? 0 : r, "l"), a: m((r) => r >= 1 ? 1 : r < 0 ? 0 : r, "a") }, toLinear: m((r) => {
  let t = r / 255;
  return r > 0.03928 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92;
}, "toLinear"), hue2rgb: m((r, t, i) => (i < 0 && (i += 1), i > 1 && (i -= 1), i < 0.16666666666666666 ? r + (t - r) * 6 * i : i < 0.5 ? t : i < 0.6666666666666666 ? r + (t - r) * (0.6666666666666666 - i) * 6 : r), "hue2rgb"), hsl2rgb: m(({ h: r, s: t, l: i }, e) => {
  if (!t) return i * 2.55;
  r /= 360, t /= 100, i /= 100;
  let d = i < 0.5 ? i * (1 + t) : i + t - i * t, h = 2 * i - d;
  switch (e) {
    case "r":
      return Xt.hue2rgb(h, d, r + 0.3333333333333333) * 255;
    case "g":
      return Xt.hue2rgb(h, d, r) * 255;
    case "b":
      return Xt.hue2rgb(h, d, r - 0.3333333333333333) * 255;
  }
}, "hsl2rgb"), rgb2hsl: m(({ r, g: t, b: i }, e) => {
  r /= 255, t /= 255, i /= 255;
  let d = Math.max(r, t, i), h = Math.min(r, t, i), y = (d + h) / 2;
  if (e === "l") return y * 100;
  if (d === h) return 0;
  let f = d - h, q = y > 0.5 ? f / (2 - d - h) : f / (d + h);
  if (e === "s") return q * 100;
  switch (d) {
    case r:
      return ((t - i) / f + (t < i ? 6 : 0)) * 60;
    case t:
      return ((i - r) / f + 2) * 60;
    case i:
      return ((r - t) / f + 4) * 60;
    default:
      return -1;
  }
}, "rgb2hsl") };
var Or = Xt;
var Xo = { clamp: m((r, t, i) => t > i ? Math.min(t, Math.max(i, r)) : Math.min(i, Math.max(t, r)), "clamp"), round: m((r) => Math.round(r * 1e10) / 1e10, "round") };
var Ir = Xo;
var Ko = { dec2hex: m((r) => {
  let t = Math.round(r).toString(16);
  return t.length > 1 ? t : `0${t}`;
}, "dec2hex") };
var Dr = Ko;
var Zo = { channel: Or, lang: Ir, unit: Dr };
var u = Zo;
var it = {};
for (let r = 0; r <= 255; r++) it[r] = u.unit.dec2hex(r);
var _ = { ALL: 0, RGB: 1, HSL: 2 };
var _a2;
var _i = (_a2 = class {
  constructor() {
    this.type = _.ALL;
  }
  get() {
    return this.type;
  }
  set(t) {
    if (this.type && this.type !== t) throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = t;
  }
  reset() {
    this.type = _.ALL;
  }
  is(t) {
    return this.type === t;
  }
}, m(_a2, "Type"), _a2);
var wr = _i;
var _a3;
var Ai = (_a3 = class {
  constructor(t, i) {
    this.color = i, this.changed = false, this.data = t, this.type = new wr();
  }
  set(t, i) {
    return this.color = i, this.changed = false, this.data = t, this.type.type = _.ALL, this;
  }
  _ensureHSL() {
    let t = this.data, { h: i, s: e, l: d } = t;
    i === void 0 && (t.h = u.channel.rgb2hsl(t, "h")), e === void 0 && (t.s = u.channel.rgb2hsl(t, "s")), d === void 0 && (t.l = u.channel.rgb2hsl(t, "l"));
  }
  _ensureRGB() {
    let t = this.data, { r: i, g: e, b: d } = t;
    i === void 0 && (t.r = u.channel.hsl2rgb(t, "r")), e === void 0 && (t.g = u.channel.hsl2rgb(t, "g")), d === void 0 && (t.b = u.channel.hsl2rgb(t, "b"));
  }
  get r() {
    let t = this.data, i = t.r;
    return !this.type.is(_.HSL) && i !== void 0 ? i : (this._ensureHSL(), u.channel.hsl2rgb(t, "r"));
  }
  get g() {
    let t = this.data, i = t.g;
    return !this.type.is(_.HSL) && i !== void 0 ? i : (this._ensureHSL(), u.channel.hsl2rgb(t, "g"));
  }
  get b() {
    let t = this.data, i = t.b;
    return !this.type.is(_.HSL) && i !== void 0 ? i : (this._ensureHSL(), u.channel.hsl2rgb(t, "b"));
  }
  get h() {
    let t = this.data, i = t.h;
    return !this.type.is(_.RGB) && i !== void 0 ? i : (this._ensureRGB(), u.channel.rgb2hsl(t, "h"));
  }
  get s() {
    let t = this.data, i = t.s;
    return !this.type.is(_.RGB) && i !== void 0 ? i : (this._ensureRGB(), u.channel.rgb2hsl(t, "s"));
  }
  get l() {
    let t = this.data, i = t.l;
    return !this.type.is(_.RGB) && i !== void 0 ? i : (this._ensureRGB(), u.channel.rgb2hsl(t, "l"));
  }
  get a() {
    return this.data.a;
  }
  set r(t) {
    this.type.set(_.RGB), this.changed = true, this.data.r = t;
  }
  set g(t) {
    this.type.set(_.RGB), this.changed = true, this.data.g = t;
  }
  set b(t) {
    this.type.set(_.RGB), this.changed = true, this.data.b = t;
  }
  set h(t) {
    this.type.set(_.HSL), this.changed = true, this.data.h = t;
  }
  set s(t) {
    this.type.set(_.HSL), this.changed = true, this.data.s = t;
  }
  set l(t) {
    this.type.set(_.HSL), this.changed = true, this.data.l = t;
  }
  set a(t) {
    this.changed = true, this.data.a = t;
  }
}, m(_a3, "Channels"), _a3);
var zr = Ai;
var Jo = new zr({ r: 0, g: 0, b: 0, a: 0 }, "transparent");
var ot = Jo;
var Wr = { re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i, parse: m((r) => {
  if (r.charCodeAt(0) !== 35) return;
  let t = r.match(Wr.re);
  if (!t) return;
  let i = t[1], e = parseInt(i, 16), d = i.length, h = d % 4 === 0, y = d > 4, f = y ? 1 : 17, q = y ? 8 : 4, M = h ? 0 : -1, V = y ? 255 : 15;
  return ot.set({ r: (e >> q * (M + 3) & V) * f, g: (e >> q * (M + 2) & V) * f, b: (e >> q * (M + 1) & V) * f, a: h ? (e & V) * f / 255 : 1 }, r);
}, "parse"), stringify: m((r) => {
  let { r: t, g: i, b: e, a: d } = r;
  return d < 1 ? `#${it[Math.round(t)]}${it[Math.round(i)]}${it[Math.round(e)]}${it[Math.round(d * 255)]}` : `#${it[Math.round(t)]}${it[Math.round(i)]}${it[Math.round(e)]}`;
}, "stringify") };
var ht = Wr;
var Kt = { re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i, hueRe: /^(.+?)(deg|grad|rad|turn)$/i, _hue2deg: m((r) => {
  let t = r.match(Kt.hueRe);
  if (t) {
    let [, i, e] = t;
    switch (e) {
      case "grad":
        return u.channel.clamp.h(parseFloat(i) * 0.9);
      case "rad":
        return u.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
      case "turn":
        return u.channel.clamp.h(parseFloat(i) * 360);
    }
  }
  return u.channel.clamp.h(parseFloat(r));
}, "_hue2deg"), parse: m((r) => {
  let t = r.charCodeAt(0);
  if (t !== 104 && t !== 72) return;
  let i = r.match(Kt.re);
  if (!i) return;
  let [, e, d, h, y, f] = i;
  return ot.set({ h: Kt._hue2deg(e), s: u.channel.clamp.s(parseFloat(d)), l: u.channel.clamp.l(parseFloat(h)), a: y ? u.channel.clamp.a(f ? parseFloat(y) / 100 : parseFloat(y)) : 1 }, r);
}, "parse"), stringify: m((r) => {
  let { h: t, s: i, l: e, a: d } = r;
  return d < 1 ? `hsla(${u.lang.round(t)}, ${u.lang.round(i)}%, ${u.lang.round(e)}%, ${d})` : `hsl(${u.lang.round(t)}, ${u.lang.round(i)}%, ${u.lang.round(e)}%)`;
}, "stringify") };
var At = Kt;
var Zt = { colors: { aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyanaqua: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", rebeccapurple: "#663399", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", transparent: "#00000000", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#ffffff", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32" }, parse: m((r) => {
  r = r.toLowerCase();
  let t = Zt.colors[r];
  if (t) return ht.parse(t);
}, "parse"), stringify: m((r) => {
  let t = ht.stringify(r);
  for (let i in Zt.colors) if (Zt.colors[i] === t) return i;
}, "stringify") };
var vi = Zt;
var Rr = { re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i, parse: m((r) => {
  let t = r.charCodeAt(0);
  if (t !== 114 && t !== 82) return;
  let i = r.match(Rr.re);
  if (!i) return;
  let [, e, d, h, y, f, q, M, V] = i;
  return ot.set({ r: u.channel.clamp.r(d ? parseFloat(e) * 2.55 : parseFloat(e)), g: u.channel.clamp.g(y ? parseFloat(h) * 2.55 : parseFloat(h)), b: u.channel.clamp.b(q ? parseFloat(f) * 2.55 : parseFloat(f)), a: M ? u.channel.clamp.a(V ? parseFloat(M) / 100 : parseFloat(M)) : 1 }, r);
}, "parse"), stringify: m((r) => {
  let { r: t, g: i, b: e, a: d } = r;
  return d < 1 ? `rgba(${u.lang.round(t)}, ${u.lang.round(i)}, ${u.lang.round(e)}, ${u.lang.round(d)})` : `rgb(${u.lang.round(t)}, ${u.lang.round(i)}, ${u.lang.round(e)})`;
}, "stringify") };
var vt = Rr;
var Qo = { format: { keyword: vi, hex: ht, rgb: vt, rgba: vt, hsl: At, hsla: At }, parse: m((r) => {
  if (typeof r != "string") return r;
  let t = ht.parse(r) || vt.parse(r) || At.parse(r) || vi.parse(r);
  if (t) return t;
  throw new Error(`Unsupported color format: "${r}"`);
}, "parse"), stringify: m((r) => !r.changed && r.color ? r.color : r.type.is(_.HSL) || r.data.r === void 0 ? At.stringify(r) : r.a < 1 || !Number.isInteger(r.r) || !Number.isInteger(r.g) || !Number.isInteger(r.b) ? vt.stringify(r) : ht.stringify(r), "stringify") };
var A = Qo;
var te = m((r, t) => {
  let i = A.parse(r);
  for (let e in t) i[e] = u.channel.clamp[e](t[e]);
  return A.stringify(i);
}, "change");
var Jt = te;
var ie = m((r, t, i = 0, e = 1) => {
  if (typeof r != "number") return Jt(r, { a: t });
  let d = ot.set({ r: u.channel.clamp.r(r), g: u.channel.clamp.g(t), b: u.channel.clamp.b(i), a: u.channel.clamp.a(e) });
  return A.stringify(d);
}, "rgba");
var R = ie;
var re = m((r, t) => u.lang.round(A.parse(r)[t]), "channel");
var oe = re;
var ee = m((r) => {
  let { r: t, g: i, b: e } = A.parse(r), d = 0.2126 * u.channel.toLinear(t) + 0.7152 * u.channel.toLinear(i) + 0.0722 * u.channel.toLinear(e);
  return u.lang.round(d);
}, "luminance");
var Pr = ee;
var se = m((r) => Pr(r) >= 0.5, "isLight");
var Nr = se;
var ae = m((r) => !Nr(r), "isDark");
var k = ae;
var le = m((r, t, i) => {
  let e = A.parse(r), d = e[t], h = u.channel.clamp[t](d + i);
  return d !== h && (e[t] = h), A.stringify(e);
}, "adjustChannel");
var kt = le;
var he = m((r, t) => kt(r, "l", t), "lighten");
var c = he;
var ne = m((r, t) => kt(r, "l", -t), "darken");
var n = ne;
var ce = m((r, t) => kt(r, "a", -t), "transparentize");
var de = ce;
var Ce = m((r, t) => {
  let i = A.parse(r), e = {};
  for (let d in t) t[d] && (e[d] = i[d] + t[d]);
  return Jt(r, e);
}, "adjust");
var o = Ce;
var ge = m((r, t, i = 50) => {
  let { r: e, g: d, b: h, a: y } = A.parse(r), { r: f, g: q, b: M, a: V } = A.parse(t), bt = i / 100, ct = bt * 2 - 1, rt = y - V, Ct = ((ct * rt === -1 ? ct : (ct + rt) / (1 + ct * rt)) + 1) / 2, St = 1 - Ct, hi = e * Ct + f * St, ni = d * Ct + q * St, gt = h * Ct + M * St, O = y * bt + V * (1 - bt);
  return R(hi, ni, gt, O);
}, "mix");
var Hr = ge;
var pe = m((r, t = 100) => {
  let i = A.parse(r);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, Hr(i, r, t);
}, "invert");
var l = pe;
var F = "#ffffff";
var L = "#f2f2f2";
var p2 = m((r, t) => t ? o(r, { s: -40, l: 10 }) : o(r, { s: -40, l: -10 }), "mkBorder");
var _a4;
var qi = (_a4 = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.useGradient = true, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o2, _p, _q, _r, _s, _t, _u, _v;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || c(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.vertLineColor = this.vertLineColor || "navy", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.darkMode ? (this.rowOdd = this.rowOdd || n(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || n(this.mainBkg, 10)) : (this.rowOdd = this.rowOdd || c(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || c(this.mainBkg, 5)), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 }), this.darkMode) for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 75);
    else for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleInv" + i] = this["cScaleInv" + i] || l(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || c(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || n(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    let t = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++) this["surface" + i] = this["surface" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || o(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || o(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || o(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || o(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || o(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || o(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? o(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? o(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? o(this.tertiaryColor, { l: -30 }), this.venn4 = this.venn4 ?? o(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? o(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? o(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? o(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? o(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.radar = { axisColor: ((_a16 = this.radar) == null ? void 0 : _a16.axisColor) || this.lineColor, axisStrokeWidth: ((_b = this.radar) == null ? void 0 : _b.axisStrokeWidth) || 2, axisLabelFontSize: ((_c = this.radar) == null ? void 0 : _c.axisLabelFontSize) || 12, curveOpacity: ((_d = this.radar) == null ? void 0 : _d.curveOpacity) || 0.5, curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2, graticuleColor: ((_f = this.radar) == null ? void 0 : _f.graticuleColor) || "#DEDEDE", graticuleStrokeWidth: ((_g = this.radar) == null ? void 0 : _g.graticuleStrokeWidth) || 1, graticuleOpacity: ((_h = this.radar) == null ? void 0 : _h.graticuleOpacity) || 0.3, legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12, legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12 }, this.archEdgeColor = this.archEdgeColor || "#777", this.archEdgeArrowColor = this.archEdgeArrowColor || "#777", this.archEdgeWidth = this.archEdgeWidth || "3", this.archGroupBorderColor = this.archGroupBorderColor || "#000", this.archGroupBorderWidth = this.archGroupBorderWidth || "2px", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background, titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor, dataLabelColor: ((_m = this.xyChart) == null ? void 0 : _m.dataLabelColor) || this.primaryTextColor, xAxisTitleColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_o2 = this.xyChart) == null ? void 0 : _o2.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_q = this.xyChart) == null ? void 0 : _q.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_u = this.xyChart) == null ? void 0 : _u.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_v = this.xyChart) == null ? void 0 : _v.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || o(this.primaryColor, { h: -30 }), this.git4 = this.git4 || o(this.primaryColor, { h: -60 }), this.git5 = this.git5 || o(this.primaryColor, { h: -90 }), this.git6 = this.git6 || o(this.primaryColor, { h: 60 }), this.git7 = this.git7 || o(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a4, "Theme"), _a4);
var Gr = m((r) => {
  let t = new qi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a5;
var Mi = (_a5 = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = c(this.primaryColor, 16), this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = l(this.background), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.lineColor = l(this.background), this.textColor = l(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = c(l("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#ccc", this.border2 = R(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.clusterBkg = "#302F3D", this.sectionBkgColor = n("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = n(this.sectionBkgColor, 10), this.taskBorderColor = R(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = R(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = this.rowOdd || c(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || n(this.mainBkg, 10), this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd", this.useGradient = true, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o2, _p, _q, _r, _s, _t, _u, _v;
    this.secondBkg = c(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = c(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.actorBorder, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = c(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = l(this.doneTaskBkgColor), this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = o(this.primaryColor, { h: 64 }), this.fillType3 = o(this.secondaryColor, { h: 64 }), this.fillType4 = o(this.primaryColor, { h: -64 }), this.fillType5 = o(this.secondaryColor, { h: -64 }), this.fillType6 = o(this.primaryColor, { h: 128 }), this.fillType7 = o(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 });
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleInv" + t] = this["cScaleInv" + t] || l(this["cScale" + t]);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScalePeer" + t] = this["cScalePeer" + t] || c(this["cScale" + t], 10);
    for (let t = 0; t < 5; t++) this["surface" + t] = this["surface" + t] || o(this.mainBkg, { h: 30, s: -30, l: -(-10 + t * 4) }), this["surfacePeer" + t] = this["surfacePeer" + t] || o(this.mainBkg, { h: 30, s: -30, l: -(-7 + t * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["pie" + t] = this["cScale" + t];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.mainContrastColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.mainContrastColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let t = 0; t < 8; t++) this["venn" + (t + 1)] = this["venn" + (t + 1)] ?? c(this["cScale" + t], 30);
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, dataLabelColor: ((_c = this.xyChart) == null ? void 0 : _c.dataLabelColor) || this.primaryTextColor, xAxisTitleColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_g = this.xyChart) == null ? void 0 : _g.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_k = this.xyChart) == null ? void 0 : _k.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_l = this.xyChart) == null ? void 0 : _l.plotColorPalette) || "#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22" }, this.packet = { startByteColor: this.primaryTextColor, endByteColor: this.primaryTextColor, labelColor: this.primaryTextColor, titleColor: this.primaryTextColor, blockStrokeColor: this.primaryTextColor, blockFillColor: this.background }, this.radar = { axisColor: ((_m = this.radar) == null ? void 0 : _m.axisColor) || this.lineColor, axisStrokeWidth: ((_n = this.radar) == null ? void 0 : _n.axisStrokeWidth) || 2, axisLabelFontSize: ((_o2 = this.radar) == null ? void 0 : _o2.axisLabelFontSize) || 12, curveOpacity: ((_p = this.radar) == null ? void 0 : _p.curveOpacity) || 0.5, curveStrokeWidth: ((_q = this.radar) == null ? void 0 : _q.curveStrokeWidth) || 2, graticuleColor: ((_r = this.radar) == null ? void 0 : _r.graticuleColor) || "#DEDEDE", graticuleStrokeWidth: ((_s = this.radar) == null ? void 0 : _s.graticuleStrokeWidth) || 1, graticuleOpacity: ((_t = this.radar) == null ? void 0 : _t.graticuleOpacity) || 0.3, legendBoxSize: ((_u = this.radar) == null ? void 0 : _u.legendBoxSize) || 12, legendFontSize: ((_v = this.radar) == null ? void 0 : _v.legendFontSize) || 12 }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = c(this.secondaryColor, 20), this.git1 = c(this.pie2 || this.secondaryColor, 20), this.git2 = c(this.pie3 || this.tertiaryColor, 20), this.git3 = c(this.pie4 || o(this.primaryColor, { h: -30 }), 20), this.git4 = c(this.pie5 || o(this.primaryColor, { h: -60 }), 20), this.git5 = c(this.pie6 || o(this.primaryColor, { h: -90 }), 10), this.git6 = c(this.pie7 || o(this.primaryColor, { h: 60 }), 10), this.git7 = c(this.pie8 || o(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || l(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || l(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || c(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || c(this.background, 2), this.nodeBorder = this.nodeBorder || "#999";
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a5, "Theme"), _a5);
var $r = m((r) => {
  let t = new Mi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a6;
var Oi = (_a6 = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = o(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.lineColor = l(this.background), this.textColor = l(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "rgba(232,232,232, 0.8)", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.clusterBkg = "#FBFBFF", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.sectionBkgColor = R(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "navy", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = "calculated", this.rowEven = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = false, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow(1px 2px 2px rgba(185, 185, 185, 1))", this.updateColors();
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o2, _p, _q, _r, _s, _t, _u, _v;
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || n(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || n(this.tertiaryColor, 40);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScale" + t] = n(this["cScale" + t], 10), this["cScalePeer" + t] = this["cScalePeer" + t] || n(this["cScale" + t], 25);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleInv" + t] = this["cScaleInv" + t] || o(this["cScale" + t], { h: 180 });
    for (let t = 0; t < 5; t++) this["surface" + t] = this["surface" + t] || o(this.mainBkg, { h: 30, l: -(5 + t * 5) }), this["surfacePeer" + t] = this["surfacePeer" + t] || o(this.mainBkg, { h: 30, l: -(7 + t * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || l(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || l(this.labelTextColor);
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || c(this.primaryColor, 75) || "#ffffff", this.rowEven = this.rowEven || c(this.primaryColor, 1), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = o(this.primaryColor, { h: 64 }), this.fillType3 = o(this.secondaryColor, { h: 64 }), this.fillType4 = o(this.primaryColor, { h: -64 }), this.fillType5 = o(this.secondaryColor, { h: -64 }), this.fillType6 = o(this.primaryColor, { h: 128 }), this.fillType7 = o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || o(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || o(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? o(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? o(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? o(this.tertiaryColor, { l: -40 }), this.venn4 = this.venn4 ?? o(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? o(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? o(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? o(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? o(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.radar = { axisColor: ((_a16 = this.radar) == null ? void 0 : _a16.axisColor) || this.lineColor, axisStrokeWidth: ((_b = this.radar) == null ? void 0 : _b.axisStrokeWidth) || 2, axisLabelFontSize: ((_c = this.radar) == null ? void 0 : _c.axisLabelFontSize) || 12, curveOpacity: ((_d = this.radar) == null ? void 0 : _d.curveOpacity) || 0.5, curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2, graticuleColor: ((_f = this.radar) == null ? void 0 : _f.graticuleColor) || "#DEDEDE", graticuleStrokeWidth: ((_g = this.radar) == null ? void 0 : _g.graticuleStrokeWidth) || 1, graticuleOpacity: ((_h = this.radar) == null ? void 0 : _h.graticuleOpacity) || 0.3, legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12, legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12 }, this.xyChart = { backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background, titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor, dataLabelColor: ((_m = this.xyChart) == null ? void 0 : _m.dataLabelColor) || this.primaryTextColor, xAxisTitleColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_o2 = this.xyChart) == null ? void 0 : _o2.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_q = this.xyChart) == null ? void 0 : _q.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_u = this.xyChart) == null ? void 0 : _u.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_v = this.xyChart) == null ? void 0 : _v.plotColorPalette) || "#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || o(this.primaryColor, { h: -30 }), this.git4 = this.git4 || o(this.primaryColor, { h: -60 }), this.git5 = this.git5 || o(this.primaryColor, { h: -90 }), this.git6 = this.git6 || o(this.primaryColor, { h: 60 }), this.git7 = this.git7 || o(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || n(l(this.git0), 25), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || l(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || l(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (Object.keys(this).forEach((e) => {
      this[e] === "calculated" && (this[e] = void 0);
    }), typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a6, "Theme"), _a6);
var Ur = m((r) => {
  let t = new Oi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a7;
var Ii = (_a7 = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = c("#cde498", 10), this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.primaryColor), this.lineColor = l(this.background), this.textColor = l(this.background), this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = true, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,0.5))";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o2, _p, _q, _r, _s, _t, _u, _v;
    this.actorBorder = n(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || n(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || n(this.tertiaryColor, 40);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScale" + t] = n(this["cScale" + t], 10), this["cScalePeer" + t] = this["cScalePeer" + t] || n(this["cScale" + t], 25);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleInv" + t] = this["cScaleInv" + t] || o(this["cScale" + t], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    for (let t = 0; t < 5; t++) this["surface" + t] = this["surface" + t] || o(this.mainBkg, { h: 30, s: -30, l: -(5 + t * 5) }), this["surfacePeer" + t] = this["surfacePeer" + t] || o(this.mainBkg, { h: 30, s: -30, l: -(8 + t * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || c(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || c(this.mainBkg, 20), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = o(this.primaryColor, { h: 64 }), this.fillType3 = o(this.secondaryColor, { h: 64 }), this.fillType4 = o(this.primaryColor, { h: -64 }), this.fillType5 = o(this.secondaryColor, { h: -64 }), this.fillType6 = o(this.primaryColor, { h: 128 }), this.fillType7 = o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || o(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? o(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? o(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? o(this.tertiaryColor, { l: -30 }), this.venn4 = this.venn4 ?? o(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? o(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? o(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? o(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? o(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.packet = { startByteColor: this.primaryTextColor, endByteColor: this.primaryTextColor, labelColor: this.primaryTextColor, titleColor: this.primaryTextColor, blockStrokeColor: this.primaryTextColor, blockFillColor: this.mainBkg }, this.radar = { axisColor: ((_a16 = this.radar) == null ? void 0 : _a16.axisColor) || this.lineColor, axisStrokeWidth: ((_b = this.radar) == null ? void 0 : _b.axisStrokeWidth) || 2, axisLabelFontSize: ((_c = this.radar) == null ? void 0 : _c.axisLabelFontSize) || 12, curveOpacity: ((_d = this.radar) == null ? void 0 : _d.curveOpacity) || 0.5, curveStrokeWidth: ((_e2 = this.radar) == null ? void 0 : _e2.curveStrokeWidth) || 2, graticuleColor: ((_f = this.radar) == null ? void 0 : _f.graticuleColor) || "#DEDEDE", graticuleStrokeWidth: ((_g = this.radar) == null ? void 0 : _g.graticuleStrokeWidth) || 1, graticuleOpacity: ((_h = this.radar) == null ? void 0 : _h.graticuleOpacity) || 0.3, legendBoxSize: ((_i2 = this.radar) == null ? void 0 : _i2.legendBoxSize) || 12, legendFontSize: ((_j = this.radar) == null ? void 0 : _j.legendFontSize) || 12 }, this.xyChart = { backgroundColor: ((_k = this.xyChart) == null ? void 0 : _k.backgroundColor) || this.background, titleColor: ((_l = this.xyChart) == null ? void 0 : _l.titleColor) || this.primaryTextColor, dataLabelColor: ((_m = this.xyChart) == null ? void 0 : _m.dataLabelColor) || this.primaryTextColor, xAxisTitleColor: ((_n = this.xyChart) == null ? void 0 : _n.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_o2 = this.xyChart) == null ? void 0 : _o2.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_p = this.xyChart) == null ? void 0 : _p.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_q = this.xyChart) == null ? void 0 : _q.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_r = this.xyChart) == null ? void 0 : _r.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_s = this.xyChart) == null ? void 0 : _s.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_t = this.xyChart) == null ? void 0 : _t.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_u = this.xyChart) == null ? void 0 : _u.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_v = this.xyChart) == null ? void 0 : _v.plotColorPalette) || "#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || o(this.primaryColor, { h: -30 }), this.git4 = this.git4 || o(this.primaryColor, { h: -60 }), this.git5 = this.git5 || o(this.primaryColor, { h: -90 }), this.git6 = this.git6 || o(this.primaryColor, { h: 60 }), this.git7 = this.git7 || o(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || l(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || l(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a7, "Theme"), _a7);
var jr = m((r) => {
  let t = new Ii();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a8;
var Di = (_a8 = class {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = c(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.lineColor = l(this.background), this.textColor = l(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = this.actorBorder, this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal", this.rowOdd = this.rowOdd || c(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || "#f4f4f4", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = true, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o2, _p, _q, _r, _s, _t, _u, _v;
    this.secondBkg = c(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = c(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.actorBorder, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleInv" + t] = this["cScaleInv" + t] || l(this["cScale" + t]);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this.darkMode ? this["cScalePeer" + t] = this["cScalePeer" + t] || c(this["cScale" + t], 10) : this["cScalePeer" + t] = this["cScalePeer" + t] || n(this["cScale" + t], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    for (let t = 0; t < 5; t++) this["surface" + t] = this["surface" + t] || o(this.mainBkg, { l: -(5 + t * 5) }), this["surfacePeer" + t] = this["surfacePeer" + t] || o(this.mainBkg, { l: -(8 + t * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = c(this.contrast, 30), this.sectionBkgColor2 = c(this.contrast, 30), this.taskBorderColor = n(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = c(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = n(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.vertLineColor = this.critBkgColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = o(this.primaryColor, { h: 64 }), this.fillType3 = o(this.secondaryColor, { h: 64 }), this.fillType4 = o(this.primaryColor, { h: -64 }), this.fillType5 = o(this.secondaryColor, { h: -64 }), this.fillType6 = o(this.primaryColor, { h: 128 }), this.fillType7 = o(this.secondaryColor, { h: 128 });
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++) this["pie" + t] = this["cScale" + t];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let t = 0; t < 8; t++) this["venn" + (t + 1)] = this["venn" + (t + 1)] ?? this["cScale" + t];
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, dataLabelColor: ((_c = this.xyChart) == null ? void 0 : _c.dataLabelColor) || this.primaryTextColor, xAxisTitleColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_g = this.xyChart) == null ? void 0 : _g.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_k = this.xyChart) == null ? void 0 : _k.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_l = this.xyChart) == null ? void 0 : _l.plotColorPalette) || "#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0" }, this.radar = { axisColor: ((_m = this.radar) == null ? void 0 : _m.axisColor) || this.lineColor, axisStrokeWidth: ((_n = this.radar) == null ? void 0 : _n.axisStrokeWidth) || 2, axisLabelFontSize: ((_o2 = this.radar) == null ? void 0 : _o2.axisLabelFontSize) || 12, curveOpacity: ((_p = this.radar) == null ? void 0 : _p.curveOpacity) || 0.5, curveStrokeWidth: ((_q = this.radar) == null ? void 0 : _q.curveStrokeWidth) || 2, graticuleColor: ((_r = this.radar) == null ? void 0 : _r.graticuleColor) || "#DEDEDE", graticuleStrokeWidth: ((_s = this.radar) == null ? void 0 : _s.graticuleStrokeWidth) || 1, graticuleOpacity: ((_t = this.radar) == null ? void 0 : _t.graticuleOpacity) || 0.3, legendBoxSize: ((_u = this.radar) == null ? void 0 : _u.legendBoxSize) || 12, legendFontSize: ((_v = this.radar) == null ? void 0 : _v.legendFontSize) || 12 }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = n(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || o(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || o(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || o(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || o(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || o(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a8, "Theme"), _a8);
var Vr = m((r) => {
  let t = new Di();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a9;
var wi = (_a9 = class {
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 3, this.strokeWidth = 2, this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.nodeBorder = "#000000", this.stateBorder = "#000000", this.useGradient = true, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "drop-shadow( 0px 1px 2px rgba(0, 0, 0, 0.25));", this.tertiaryColor = "#ffffff", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor);
    let t = "#ECECFE", i = "#E9E9F1", e = o(t, { h: 180, l: 5 });
    if (this.sectionBkgColor = this.sectionBkgColor || e, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || i, this.sectionBkgColor2 = this.sectionBkgColor2 || t, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || t, this.activeTaskBorderColor = this.activeTaskBorderColor || t, this.activeTaskBkgColor = this.activeTaskBkgColor || c(t, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || t, this.cScale1 = this.cScale1 || i, this.cScale2 = this.cScale2 || e, this.cScale3 = this.cScale3 || o(t, { h: 30 }), this.cScale4 = this.cScale4 || o(t, { h: 60 }), this.cScale5 = this.cScale5 || o(t, { h: 90 }), this.cScale6 = this.cScale6 || o(t, { h: 120 }), this.cScale7 = this.cScale7 || o(t, { h: 150 }), this.cScale8 = this.cScale8 || o(t, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || o(t, { h: 270 }), this.cScale10 = this.cScale10 || o(t, { h: 300 }), this.cScale11 = this.cScale11 || o(t, { h: 330 }), this.darkMode) for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScale" + h] = n(this["cScale" + h], 75);
    else for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScale" + h] = n(this["cScale" + h], 25);
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleInv" + h] = this["cScaleInv" + h] || l(this["cScale" + h]);
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this.darkMode ? this["cScalePeer" + h] = this["cScalePeer" + h] || c(this["cScale" + h], 10) : this["cScalePeer" + h] = this["cScalePeer" + h] || n(this["cScale" + h], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleLabel" + h] = this["cScaleLabel" + h] || this.scaleLabelColor;
    let d = this.darkMode ? -4 : -1;
    for (let h = 0; h < 5; h++) this["surface" + h] = this["surface" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (5 + h * 3) }), this["surfacePeer" + h] = this["surfacePeer" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (8 + h * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || t, this.fillType1 = this.fillType1 || i, this.fillType2 = this.fillType2 || o(t, { h: 64 }), this.fillType3 = this.fillType3 || o(i, { h: 64 }), this.fillType4 = this.fillType4 || o(t, { h: -64 }), this.fillType5 = this.fillType5 || o(i, { h: -64 }), this.fillType6 = this.fillType6 || o(t, { h: 128 }), this.fillType7 = this.fillType7 || o(i, { h: 128 }), this.pie1 = this.pie1 || t, this.pie2 = this.pie2 || i, this.pie3 = this.pie3 || e, this.pie4 = this.pie4 || o(t, { l: -10 }), this.pie5 = this.pie5 || o(i, { l: -10 }), this.pie6 = this.pie6 || o(e, { l: -10 }), this.pie7 = this.pie7 || o(t, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(t, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(t, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(t, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(t, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(t, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || t, this.quadrant2Fill = this.quadrant2Fill || o(t, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(t, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(t, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || t, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || t, this.git1 = this.git1 || i, this.git2 = this.git2 || e, this.git3 = this.git3 || o(t, { h: -30 }), this.git4 = this.git4 || o(t, { h: -60 }), this.git5 = this.git5 || o(t, { h: -90 }), this.git6 = this.git6 || o(t, { h: 60 }), this.git7 = this.git7 || o(t, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a9, "Theme"), _a9);
var Yr = m((r) => {
  let t = new wi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a10;
var zi = (_a10 = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = c(this.primaryColor, 16), this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = l(this.background), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.mainBkg = "#2a2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = c(l("#323D47"), 10), this.border1 = "#ccc", this.border2 = R(255, 255, 255, 0.25), this.arrowheadColor = l(this.background), this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 3, this.strokeWidth = 1, this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.useGradient = true, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,0.2))", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || c(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 }), this.darkMode) for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 75);
    else for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleInv" + i] = this["cScaleInv" + i] || l(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || c(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || n(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    let t = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++) this["surface" + i] = this["surface" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || o(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || o(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || o(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || o(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || o(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || o(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || "#0b0000", this.git1 = this.git1 || "#4d1037", this.git2 = this.git2 || "#3f5258", this.git3 = this.git3 || "#4f2f1b", this.git4 = this.git4 || "#6e0a0a", this.git5 = this.git5 || "#3b0048", this.git6 = this.git6 || "#995a01", this.git7 = this.git7 || "#154706", this.gitDarkMode = true, this.gitDarkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a10, "Theme"), _a10);
var Xr = m((r) => {
  let t = new zi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a11;
var Wi = (_a11 = class {
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#28253D", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.primaryBorderColor = p2("#28253D", this.darkMode), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#28253D", this.stateBorder = "#28253D", this.useGradient = false, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = true, this.tertiaryColor = "#ffffff", this.clusterBkg = "#F9F9FB", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.actorBorder = "#28253D", this.filterColor = "#000000";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#28253D"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#FEF9C3", this.noteTextColor = this.noteTextColor || "#28253D", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.noteFontWeight = 600, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor);
    let t = "#ECECFE", i = "#E9E9F1", e = o(t, { h: 180, l: 5 });
    this.sectionBkgColor = this.sectionBkgColor || e, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || i, this.sectionBkgColor2 = this.sectionBkgColor2 || t, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || t, this.activeTaskBorderColor = this.activeTaskBorderColor || t, this.activeTaskBkgColor = this.activeTaskBkgColor || c(t, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.compositeTitleBackground = "#F9F9FB", this.altBackground = "#F9F9FB", this.stateEdgeLabelBackground = "#FFFFFF", this.fontWeight = 600, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor;
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScale" + h] = this.mainBkg;
    if (this.darkMode) for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScale" + h] = n(this["cScale" + h], 75);
    else for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScale" + h] = n(this["cScale" + h], 25);
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleInv" + h] = this["cScaleInv" + h] || l(this["cScale" + h]);
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this.darkMode ? this["cScalePeer" + h] = this["cScalePeer" + h] || c(this["cScale" + h], 10) : this["cScalePeer" + h] = this["cScalePeer" + h] || n(this["cScale" + h], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleLabel" + h] = this["cScaleLabel" + h] || this.scaleLabelColor;
    let d = this.darkMode ? -4 : -1;
    for (let h = 0; h < 5; h++) this["surface" + h] = this["surface" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (5 + h * 3) }), this["surfacePeer" + h] = this["surfacePeer" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (8 + h * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || t, this.fillType1 = this.fillType1 || i, this.fillType2 = this.fillType2 || o(t, { h: 64 }), this.fillType3 = this.fillType3 || o(i, { h: 64 }), this.fillType4 = this.fillType4 || o(t, { h: -64 }), this.fillType5 = this.fillType5 || o(i, { h: -64 }), this.fillType6 = this.fillType6 || o(t, { h: 128 }), this.fillType7 = this.fillType7 || o(i, { h: 128 }), this.pie1 = this.pie1 || t, this.pie2 = this.pie2 || i, this.pie3 = this.pie3 || e, this.pie4 = this.pie4 || o(t, { l: -10 }), this.pie5 = this.pie5 || o(i, { l: -10 }), this.pie6 = this.pie6 || o(e, { l: -10 }), this.pie7 = this.pie7 || o(t, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(t, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(t, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(t, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(t, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(t, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || t, this.quadrant2Fill = this.quadrant2Fill || o(t, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(t, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(t, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || t, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#FFFFFF", this.git0 = this.git0 || t, this.git1 = this.git1 || i, this.git2 = this.git2 || e, this.git3 = this.git3 || o(t, { h: -30 }), this.git4 = this.git4 || o(t, { h: -60 }), this.git5 = this.git5 || o(t, { h: -90 }), this.git6 = this.git6 || o(t, { h: 60 }), this.git7 = this.git7 || o(t, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.erEdgeLabelBackground = "#FFFFFF", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a11, "Theme"), _a11);
var Kr = m((r) => {
  let t = new Wi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a12;
var Ri = (_a12 = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = c(this.primaryColor, 16), this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = l(this.background), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.mainBkg = "#111113", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = c(l("#323D47"), 10), this.border1 = "#ccc", this.border2 = R(255, 255, 255, 0.25), this.arrowheadColor = l(this.background), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.labelBackground = "#111113", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.noteBkgColor = this.noteBkgColor ?? "#FEF9C3", this.noteTextColor = this.noteTextColor ?? "#28253D", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#FFFFFF", this.stateBorder = "#FFFFFF", this.useGradient = false, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = true, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.clusterBkg = "#1E1A2E", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.filterColor = "#FFFFFF";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#FFFFFF"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#FFFFFF", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = "#FFFFFF", this.signalColor = "#FFFFFF", this.labelBoxBorderColor = "#BDBCCC", this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || c(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.compositeBackground = "#16141F", this.altBackground = "#16141F", this.compositeTitleBackground = "#16141F", this.stateEdgeLabelBackground = "#16141F", this.fontWeight = 600, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || o(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || o(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || o(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || o(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || o(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || o(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || o(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || o(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || o(this.primaryColor, { h: 330 }), this.darkMode) for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 75);
    else for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScale" + i] = n(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleInv" + i] = this["cScaleInv" + i] || l(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || c(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || n(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    let t = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++) this["surface" + i] = this["surface" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || o(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || o(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || o(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || o(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || o(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || o(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#16141F", this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || o(this.primaryColor, { h: -30 }), this.git4 = this.git4 || o(this.primaryColor, { h: -60 }), this.git5 = this.git5 || o(this.primaryColor, { h: -90 }), this.git6 = this.git6 || o(this.primaryColor, { h: 60 }), this.git7 = this.git7 || o(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.erEdgeLabelBackground = "#16141F", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a12, "Theme"), _a12);
var Zr = m((r) => {
  let t = new Ri();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a13;
var Pi = (_a13 = class {
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#28253D", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.primaryBorderColor = p2(this.primaryColor, this.darkMode), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#28253D", this.stateBorder = "#28253D", this.useGradient = false, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = true, this.tertiaryColor = "#ffffff", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.actorBorder = "#28253D", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.borderColorArray = ["#E879F9", "#2DD4BF", "#FB923C", "#22D3EE", "#4ADE80", "#A78BFA", "#F87171", "#FACC15", "#818CF8", "#A3E635 ", "#38BDF8", "#FB7185"], this.bkgColorArray = ["#FDF4FF", "#F0FDFA", "#FFF7ED", "#ECFEFF", "#F0FDF4", "#F5F3FF", "#FEF2F2", "#FEFCE8", "#EEF2FF", "#F7FEE7", "#F0F9FF", "#FFF1F2"], this.filterColor = "#000000";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#28253D"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#28253D", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor);
    let t = "#ECECFE", i = "#E9E9F1", e = o(t, { h: 180, l: 5 });
    this.sectionBkgColor = this.sectionBkgColor || e, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || i, this.sectionBkgColor2 = this.sectionBkgColor2 || t, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || t, this.activeTaskBorderColor = this.activeTaskBorderColor || t, this.activeTaskBkgColor = this.activeTaskBkgColor || c(t, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || "#f4a8ff", this.cScale1 = this.cScale1 || "#46ecd5", this.cScale2 = this.cScale2 || "#ffb86a", this.cScale3 = this.cScale3 || "#dab2ff", this.cScale4 = this.cScale4 || "#7bf1a8", this.cScale5 = this.cScale5 || "#c4b4ff", this.cScale6 = this.cScale6 || "#ffa2a2", this.cScale7 = this.cScale7 || "#ffdf20", this.cScale8 = this.cScale8 || "#a3b3ff", this.cScale9 = this.cScale9 || "#bbf451", this.cScale10 = this.cScale10 || "#74d4ff", this.cScale11 = this.cScale11 || "#ffa1ad";
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleInv" + h] = this["cScaleInv" + h] || l(this["cScale" + h]);
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this.darkMode ? this["cScalePeer" + h] = this["cScalePeer" + h] || c(this["cScale" + h], 10) : this["cScalePeer" + h] = this["cScalePeer" + h] || n(this["cScale" + h], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let h = 0; h < this.THEME_COLOR_LIMIT; h++) this["cScaleLabel" + h] = this["cScaleLabel" + h] || this.scaleLabelColor;
    let d = this.darkMode ? -4 : -1;
    for (let h = 0; h < 5; h++) this["surface" + h] = this["surface" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (5 + h * 3) }), this["surfacePeer" + h] = this["surfacePeer" + h] || o(this.mainBkg, { h: 180, s: -15, l: d * (8 + h * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || t, this.fillType1 = this.fillType1 || i, this.fillType2 = this.fillType2 || o(t, { h: 64 }), this.fillType3 = this.fillType3 || o(i, { h: 64 }), this.fillType4 = this.fillType4 || o(t, { h: -64 }), this.fillType5 = this.fillType5 || o(i, { h: -64 }), this.fillType6 = this.fillType6 || o(t, { h: 128 }), this.fillType7 = this.fillType7 || o(i, { h: 128 }), this.pie1 = this.pie1 || t, this.pie2 = this.pie2 || i, this.pie3 = this.pie3 || e, this.pie4 = this.pie4 || o(t, { l: -10 }), this.pie5 = this.pie5 || o(i, { l: -10 }), this.pie6 = this.pie6 || o(e, { l: -10 }), this.pie7 = this.pie7 || o(t, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(t, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(t, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(t, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(t, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(t, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || t, this.quadrant2Fill = this.quadrant2Fill || o(t, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(t, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(t, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || t, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || t, this.git1 = this.git1 || i, this.git2 = this.git2 || e, this.git3 = this.git3 || o(t, { h: -30 }), this.git4 = this.git4 || o(t, { h: -60 }), this.git5 = this.git5 || o(t, { h: -90 }), this.git6 = this.git6 || o(t, { h: 60 }), this.git7 = this.git7 || o(t, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.fontWeight = 600, this.erEdgeLabelBackground = "#FFFFFF", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a13, "Theme"), _a13);
var Jr = m((r) => {
  let t = new Pi();
  return t.calculate(r), t;
}, "getThemeVariables");
var _a14;
var Ni = (_a14 = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = c(this.primaryColor, 16), this.tertiaryColor = o(this.primaryColor, { h: -160 }), this.primaryBorderColor = l(this.background), this.secondaryBorderColor = p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = p2(this.tertiaryColor, this.darkMode), this.primaryTextColor = l(this.primaryColor), this.secondaryTextColor = l(this.secondaryColor), this.tertiaryTextColor = l(this.tertiaryColor), this.mainBkg = "#111113", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = c(l("#323D47"), 10), this.border1 = "#ccc", this.border2 = R(255, 255, 255, 0.25), this.arrowheadColor = l(this.background), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.labelBackground = "#111113", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.noteBkgColor = this.noteBkgColor ?? "#FEF9C3", this.noteTextColor = this.noteTextColor ?? "#28253D", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#FFFFFF", this.stateBorder = "#FFFFFF", this.useGradient = false, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = true, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.clusterBkg = "#1E1A2E", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.borderColorArray = ["#E879F9", "#2DD4BF", "#FB923C", "#22D3EE", "#4ADE80", "#A78BFA", "#F87171", "#FACC15", "#818CF8", "#A3E635 ", "#38BDF8", "#FB7185"], this.bkgColorArray = [], this.filterColor = "#FFFFFF";
  }
  updateColors() {
    var _a16, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#FFFFFF"), this.secondaryColor = this.secondaryColor || o(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || o(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || p2(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || p2(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || p2(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || p2(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#FFFFFF", this.secondaryTextColor = this.secondaryTextColor || l(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || l(this.tertiaryColor), this.lineColor = this.lineColor || l(this.background), this.arrowheadColor = this.arrowheadColor || l(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = "#FFFFFF", this.signalColor = "#FFFFFF", this.labelBoxBorderColor = "#BDBCCC", this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || n(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || l(this.lineColor), this.rootLabelColor = "#FFFFFF", this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || c(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || "#f4a8ff", this.cScale1 = this.cScale1 || "#46ecd5", this.cScale2 = this.cScale2 || "#ffb86a", this.cScale3 = this.cScale3 || "#dab2ff", this.cScale4 = this.cScale4 || "#7bf1a8", this.cScale5 = this.cScale5 || "#c4b4ff", this.cScale6 = this.cScale6 || "#ffa2a2", this.cScale7 = this.cScale7 || "#ffdf20", this.cScale8 = this.cScale8 || "#a3b3ff", this.cScale9 = this.cScale9 || "#bbf451", this.cScale10 = this.cScale10 || "#74d4ff", this.cScale11 = this.cScale11 || "#ffa1ad";
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleInv" + i] = this["cScaleInv" + i] || l(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || c(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || n(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++) this["cScaleLabel" + i] = n(this["cScale" + i], 75);
    let t = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++) this["surface" + i] = this["surface" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || o(this.mainBkg, { h: 180, s: -15, l: t * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || o(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || o(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || o(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || o(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || o(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || o(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || o(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || o(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || o(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || o(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || o(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || o(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || o(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || o(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || o(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || o(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || o(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || o(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || o(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || o(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || o(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || k(this.quadrant1Fill) ? c(this.quadrant1Fill) : n(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = { backgroundColor: ((_a16 = this.xyChart) == null ? void 0 : _a16.backgroundColor) || this.background, titleColor: ((_b = this.xyChart) == null ? void 0 : _b.titleColor) || this.primaryTextColor, xAxisTitleColor: ((_c = this.xyChart) == null ? void 0 : _c.xAxisTitleColor) || this.primaryTextColor, xAxisLabelColor: ((_d = this.xyChart) == null ? void 0 : _d.xAxisLabelColor) || this.primaryTextColor, xAxisTickColor: ((_e2 = this.xyChart) == null ? void 0 : _e2.xAxisTickColor) || this.primaryTextColor, xAxisLineColor: ((_f = this.xyChart) == null ? void 0 : _f.xAxisLineColor) || this.primaryTextColor, yAxisTitleColor: ((_g = this.xyChart) == null ? void 0 : _g.yAxisTitleColor) || this.primaryTextColor, yAxisLabelColor: ((_h = this.xyChart) == null ? void 0 : _h.yAxisLabelColor) || this.primaryTextColor, yAxisTickColor: ((_i2 = this.xyChart) == null ? void 0 : _i2.yAxisTickColor) || this.primaryTextColor, yAxisLineColor: ((_j = this.xyChart) == null ? void 0 : _j.yAxisLineColor) || this.primaryTextColor, plotColorPalette: ((_k = this.xyChart) == null ? void 0 : _k.plotColorPalette) || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0" }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? n(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || o(this.primaryColor, { h: -30 }), this.git4 = this.git4 || o(this.primaryColor, { h: -60 }), this.git5 = this.git5 || o(this.primaryColor, { h: -90 }), this.git6 = this.git6 || o(this.primaryColor, { h: 60 }), this.git7 = this.git7 || o(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = c(this.git0, 25), this.git1 = c(this.git1, 25), this.git2 = c(this.git2, 25), this.git3 = c(this.git3, 25), this.git4 = c(this.git4, 25), this.git5 = c(this.git5, 25), this.git6 = c(this.git6, 25), this.git7 = c(this.git7, 25)) : (this.git0 = n(this.git0, 25), this.git1 = n(this.git1, 25), this.git2 = n(this.git2, 25), this.git3 = n(this.git3, 25), this.git4 = n(this.git4, 25), this.git5 = n(this.git5, 25), this.git6 = n(this.git6, 25), this.git7 = n(this.git7, 25)), this.gitInv0 = this.gitInv0 || l(this.git0), this.gitInv1 = this.gitInv1 || l(this.git1), this.gitInv2 = this.gitInv2 || l(this.git2), this.gitInv3 = this.gitInv3 || l(this.git3), this.gitInv4 = this.gitInv4 || l(this.git4), this.gitInv5 = this.gitInv5 || l(this.git5), this.gitInv6 = this.gitInv6 || l(this.git6), this.gitInv7 = this.gitInv7 || l(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.fontWeight = 600, this.erEdgeLabelBackground = "#16141F", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || F, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || L;
  }
  calculate(t) {
    if (typeof t != "object") {
      this.updateColors();
      return;
    }
    let i = Object.keys(t);
    i.forEach((e) => {
      this[e] = t[e];
    }), this.updateColors(), i.forEach((e) => {
      this[e] = t[e];
    });
  }
}, m(_a14, "Theme"), _a14);
var Qr = m((r) => {
  let t = new Ni();
  return t.calculate(r), t;
}, "getThemeVariables");
var et = { base: { getThemeVariables: Gr }, dark: { getThemeVariables: $r }, default: { getThemeVariables: Ur }, forest: { getThemeVariables: jr }, neutral: { getThemeVariables: Vr }, neo: { getThemeVariables: Yr }, "neo-dark": { getThemeVariables: Xr }, redux: { getThemeVariables: Kr }, "redux-dark": { getThemeVariables: Zr }, "redux-color": { getThemeVariables: Jr }, "redux-dark-color": { getThemeVariables: Qr } };
var $ = { flowchart: { useMaxWidth: true, titleTopMargin: 25, subGraphTitleMargin: { top: 0, bottom: 0 }, diagramPadding: 8, htmlLabels: null, nodeSpacing: 50, rankSpacing: 50, curve: "basis", padding: 15, defaultRenderer: "dagre-wrapper", wrappingWidth: 200, inheritDir: false }, sequence: { useMaxWidth: true, hideUnusedParticipants: false, activationWidth: 10, diagramMarginX: 50, diagramMarginY: 10, actorMargin: 50, width: 150, height: 65, boxMargin: 10, boxTextMargin: 5, noteMargin: 10, messageMargin: 35, messageAlign: "center", mirrorActors: true, forceMenus: false, bottomMarginAdj: 1, rightAngles: false, showSequenceNumbers: false, actorFontSize: 14, actorFontFamily: '"Open Sans", sans-serif', actorFontWeight: 400, noteFontSize: 14, noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif', noteFontWeight: 400, noteAlign: "center", messageFontSize: 16, messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif', messageFontWeight: 400, wrap: false, wrapPadding: 10, labelBoxWidth: 50, labelBoxHeight: 20 }, gantt: { useMaxWidth: true, titleTopMargin: 25, barHeight: 20, barGap: 4, topPadding: 50, rightPadding: 75, leftPadding: 75, gridLineStartPadding: 35, fontSize: 11, sectionFontSize: 11, numberSectionStyles: 4, axisFormat: "%Y-%m-%d", topAxis: false, displayMode: "", weekday: "sunday" }, journey: { useMaxWidth: true, diagramMarginX: 50, diagramMarginY: 10, leftMargin: 150, maxLabelWidth: 360, width: 150, height: 50, boxMargin: 10, boxTextMargin: 5, noteMargin: 10, messageMargin: 35, messageAlign: "center", bottomMarginAdj: 1, rightAngles: false, taskFontSize: 14, taskFontFamily: '"Open Sans", sans-serif', taskMargin: 50, activationWidth: 10, textPlacement: "fo", actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"], sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"], sectionColours: ["#fff"], titleColor: "", titleFontFamily: '"trebuchet ms", verdana, arial, sans-serif', titleFontSize: "4ex" }, class: { useMaxWidth: true, titleTopMargin: 25, arrowMarkerAbsolute: false, dividerMargin: 10, padding: 5, textHeight: 10, defaultRenderer: "dagre-wrapper", htmlLabels: false, hideEmptyMembersBox: false }, state: { useMaxWidth: true, titleTopMargin: 25, dividerMargin: 10, sizeUnit: 5, padding: 8, textHeight: 10, titleShift: -15, noteMargin: 10, forkWidth: 70, forkHeight: 7, miniPadding: 2, fontSizeFactor: 5.02, fontSize: 24, labelHeight: 16, edgeLengthFactor: "20", compositTitleSize: 35, radius: 5, defaultRenderer: "dagre-wrapper" }, er: { useMaxWidth: true, titleTopMargin: 25, diagramPadding: 20, layoutDirection: "TB", minEntityWidth: 100, minEntityHeight: 75, entityPadding: 15, nodeSpacing: 140, rankSpacing: 80, stroke: "gray", fill: "honeydew", fontSize: 12 }, pie: { useMaxWidth: true, textPosition: 0.75 }, quadrantChart: { useMaxWidth: true, chartWidth: 500, chartHeight: 500, titleFontSize: 20, titlePadding: 10, quadrantPadding: 5, xAxisLabelPadding: 5, yAxisLabelPadding: 5, xAxisLabelFontSize: 16, yAxisLabelFontSize: 16, quadrantLabelFontSize: 16, quadrantTextTopPadding: 5, pointTextPadding: 5, pointLabelFontSize: 12, pointRadius: 5, xAxisPosition: "top", yAxisPosition: "left", quadrantInternalBorderStrokeWidth: 1, quadrantExternalBorderStrokeWidth: 2 }, xyChart: { useMaxWidth: true, width: 700, height: 500, titleFontSize: 20, titlePadding: 10, showDataLabel: false, showDataLabelOutsideBar: false, showTitle: true, xAxis: { $ref: "#/$defs/XYChartAxisConfig", showLabel: true, labelFontSize: 14, labelPadding: 5, showTitle: true, titleFontSize: 16, titlePadding: 5, showTick: true, tickLength: 5, tickWidth: 2, showAxisLine: true, axisLineWidth: 2 }, yAxis: { $ref: "#/$defs/XYChartAxisConfig", showLabel: true, labelFontSize: 14, labelPadding: 5, showTitle: true, titleFontSize: 16, titlePadding: 5, showTick: true, tickLength: 5, tickWidth: 2, showAxisLine: true, axisLineWidth: 2 }, chartOrientation: "vertical", plotReservedSpacePercent: 50 }, requirement: { useMaxWidth: true, rect_fill: "#f9f9f9", text_color: "#333", rect_border_size: "0.5px", rect_border_color: "#bbb", rect_min_width: 200, rect_min_height: 200, fontSize: 14, rect_padding: 10, line_height: 20 }, mindmap: { useMaxWidth: true, padding: 10, maxNodeWidth: 200, layoutAlgorithm: "cose-bilkent" }, ishikawa: { useMaxWidth: true, diagramPadding: 20 }, kanban: { useMaxWidth: true, padding: 8, sectionWidth: 200, ticketBaseUrl: "" }, timeline: { useMaxWidth: true, diagramMarginX: 50, diagramMarginY: 10, leftMargin: 150, width: 150, height: 50, boxMargin: 10, boxTextMargin: 5, noteMargin: 10, messageMargin: 35, messageAlign: "center", bottomMarginAdj: 1, rightAngles: false, taskFontSize: 14, taskFontFamily: '"Open Sans", sans-serif', taskMargin: 50, activationWidth: 10, textPlacement: "fo", actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"], sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"], sectionColours: ["#fff"], disableMulticolor: false }, gitGraph: { useMaxWidth: true, titleTopMargin: 25, diagramPadding: 8, nodeLabel: { width: 75, height: 100, x: -25, y: 0 }, mainBranchName: "main", mainBranchOrder: 0, showCommitLabel: true, showBranches: true, rotateCommitLabel: true, parallelCommits: false, arrowMarkerAbsolute: false }, c4: { useMaxWidth: true, diagramMarginX: 50, diagramMarginY: 10, c4ShapeMargin: 50, c4ShapePadding: 20, width: 216, height: 60, boxMargin: 10, c4ShapeInRow: 4, nextLinePaddingX: 0, c4BoundaryInRow: 2, personFontSize: 14, personFontFamily: '"Open Sans", sans-serif', personFontWeight: "normal", external_personFontSize: 14, external_personFontFamily: '"Open Sans", sans-serif', external_personFontWeight: "normal", systemFontSize: 14, systemFontFamily: '"Open Sans", sans-serif', systemFontWeight: "normal", external_systemFontSize: 14, external_systemFontFamily: '"Open Sans", sans-serif', external_systemFontWeight: "normal", system_dbFontSize: 14, system_dbFontFamily: '"Open Sans", sans-serif', system_dbFontWeight: "normal", external_system_dbFontSize: 14, external_system_dbFontFamily: '"Open Sans", sans-serif', external_system_dbFontWeight: "normal", system_queueFontSize: 14, system_queueFontFamily: '"Open Sans", sans-serif', system_queueFontWeight: "normal", external_system_queueFontSize: 14, external_system_queueFontFamily: '"Open Sans", sans-serif', external_system_queueFontWeight: "normal", boundaryFontSize: 14, boundaryFontFamily: '"Open Sans", sans-serif', boundaryFontWeight: "normal", messageFontSize: 12, messageFontFamily: '"Open Sans", sans-serif', messageFontWeight: "normal", containerFontSize: 14, containerFontFamily: '"Open Sans", sans-serif', containerFontWeight: "normal", external_containerFontSize: 14, external_containerFontFamily: '"Open Sans", sans-serif', external_containerFontWeight: "normal", container_dbFontSize: 14, container_dbFontFamily: '"Open Sans", sans-serif', container_dbFontWeight: "normal", external_container_dbFontSize: 14, external_container_dbFontFamily: '"Open Sans", sans-serif', external_container_dbFontWeight: "normal", container_queueFontSize: 14, container_queueFontFamily: '"Open Sans", sans-serif', container_queueFontWeight: "normal", external_container_queueFontSize: 14, external_container_queueFontFamily: '"Open Sans", sans-serif', external_container_queueFontWeight: "normal", componentFontSize: 14, componentFontFamily: '"Open Sans", sans-serif', componentFontWeight: "normal", external_componentFontSize: 14, external_componentFontFamily: '"Open Sans", sans-serif', external_componentFontWeight: "normal", component_dbFontSize: 14, component_dbFontFamily: '"Open Sans", sans-serif', component_dbFontWeight: "normal", external_component_dbFontSize: 14, external_component_dbFontFamily: '"Open Sans", sans-serif', external_component_dbFontWeight: "normal", component_queueFontSize: 14, component_queueFontFamily: '"Open Sans", sans-serif', component_queueFontWeight: "normal", external_component_queueFontSize: 14, external_component_queueFontFamily: '"Open Sans", sans-serif', external_component_queueFontWeight: "normal", wrap: true, wrapPadding: 10, person_bg_color: "#08427B", person_border_color: "#073B6F", external_person_bg_color: "#686868", external_person_border_color: "#8A8A8A", system_bg_color: "#1168BD", system_border_color: "#3C7FC0", system_db_bg_color: "#1168BD", system_db_border_color: "#3C7FC0", system_queue_bg_color: "#1168BD", system_queue_border_color: "#3C7FC0", external_system_bg_color: "#999999", external_system_border_color: "#8A8A8A", external_system_db_bg_color: "#999999", external_system_db_border_color: "#8A8A8A", external_system_queue_bg_color: "#999999", external_system_queue_border_color: "#8A8A8A", container_bg_color: "#438DD5", container_border_color: "#3C7FC0", container_db_bg_color: "#438DD5", container_db_border_color: "#3C7FC0", container_queue_bg_color: "#438DD5", container_queue_border_color: "#3C7FC0", external_container_bg_color: "#B3B3B3", external_container_border_color: "#A6A6A6", external_container_db_bg_color: "#B3B3B3", external_container_db_border_color: "#A6A6A6", external_container_queue_bg_color: "#B3B3B3", external_container_queue_border_color: "#A6A6A6", component_bg_color: "#85BBF0", component_border_color: "#78A8D8", component_db_bg_color: "#85BBF0", component_db_border_color: "#78A8D8", component_queue_bg_color: "#85BBF0", component_queue_border_color: "#78A8D8", external_component_bg_color: "#CCCCCC", external_component_border_color: "#BFBFBF", external_component_db_bg_color: "#CCCCCC", external_component_db_border_color: "#BFBFBF", external_component_queue_bg_color: "#CCCCCC", external_component_queue_border_color: "#BFBFBF" }, sankey: { useMaxWidth: true, width: 600, height: 400, linkColor: "gradient", nodeAlignment: "justify", showValues: true, prefix: "", suffix: "" }, block: { useMaxWidth: true, padding: 8 }, packet: { useMaxWidth: true, rowHeight: 32, bitWidth: 32, bitsPerRow: 32, showBits: true, paddingX: 5, paddingY: 5 }, treeView: { useMaxWidth: true, rowIndent: 10, paddingX: 5, paddingY: 5, lineThickness: 1 }, architecture: { useMaxWidth: true, padding: 40, iconSize: 80, fontSize: 16, randomize: false }, radar: { useMaxWidth: true, width: 600, height: 600, marginTop: 50, marginRight: 50, marginBottom: 50, marginLeft: 50, axisScaleFactor: 1, axisLabelFactor: 1.05, curveTension: 0.17 }, venn: { useMaxWidth: true, width: 800, height: 450, padding: 8, useDebugLayout: false }, theme: "default", look: "classic", handDrawnSeed: 0, layout: "dagre", maxTextSize: 5e4, maxEdges: 500, darkMode: false, fontFamily: '"trebuchet ms", verdana, arial, sans-serif;', logLevel: 5, securityLevel: "strict", startOnLoad: true, arrowMarkerAbsolute: false, secure: ["secure", "securityLevel", "startOnLoad", "maxTextSize", "suppressErrorRendering", "maxEdges"], legacyMathML: false, forceLegacyMathML: false, deterministicIds: false, fontSize: 16, markdownAutoWrap: true, suppressErrorRendering: false };
var to = { ...$, deterministicIDSeed: void 0, elk: { mergeEdges: false, nodePlacementStrategy: "BRANDES_KOEPF", forceNodeModelOrder: false, considerModelOrder: "NODES_AND_EDGES" }, themeCSS: void 0, themeVariables: et.default.getThemeVariables(), sequence: { ...$.sequence, messageFont: m(function() {
  return { fontFamily: this.messageFontFamily, fontSize: this.messageFontSize, fontWeight: this.messageFontWeight };
}, "messageFont"), noteFont: m(function() {
  return { fontFamily: this.noteFontFamily, fontSize: this.noteFontSize, fontWeight: this.noteFontWeight };
}, "noteFont"), actorFont: m(function() {
  return { fontFamily: this.actorFontFamily, fontSize: this.actorFontSize, fontWeight: this.actorFontWeight };
}, "actorFont") }, class: { hideEmptyMembersBox: false }, gantt: { ...$.gantt, tickInterval: void 0, useWidth: void 0 }, c4: { ...$.c4, useWidth: void 0, personFont: m(function() {
  return { fontFamily: this.personFontFamily, fontSize: this.personFontSize, fontWeight: this.personFontWeight };
}, "personFont"), flowchart: { ...$.flowchart, inheritDir: false }, external_personFont: m(function() {
  return { fontFamily: this.external_personFontFamily, fontSize: this.external_personFontSize, fontWeight: this.external_personFontWeight };
}, "external_personFont"), systemFont: m(function() {
  return { fontFamily: this.systemFontFamily, fontSize: this.systemFontSize, fontWeight: this.systemFontWeight };
}, "systemFont"), external_systemFont: m(function() {
  return { fontFamily: this.external_systemFontFamily, fontSize: this.external_systemFontSize, fontWeight: this.external_systemFontWeight };
}, "external_systemFont"), system_dbFont: m(function() {
  return { fontFamily: this.system_dbFontFamily, fontSize: this.system_dbFontSize, fontWeight: this.system_dbFontWeight };
}, "system_dbFont"), external_system_dbFont: m(function() {
  return { fontFamily: this.external_system_dbFontFamily, fontSize: this.external_system_dbFontSize, fontWeight: this.external_system_dbFontWeight };
}, "external_system_dbFont"), system_queueFont: m(function() {
  return { fontFamily: this.system_queueFontFamily, fontSize: this.system_queueFontSize, fontWeight: this.system_queueFontWeight };
}, "system_queueFont"), external_system_queueFont: m(function() {
  return { fontFamily: this.external_system_queueFontFamily, fontSize: this.external_system_queueFontSize, fontWeight: this.external_system_queueFontWeight };
}, "external_system_queueFont"), containerFont: m(function() {
  return { fontFamily: this.containerFontFamily, fontSize: this.containerFontSize, fontWeight: this.containerFontWeight };
}, "containerFont"), external_containerFont: m(function() {
  return { fontFamily: this.external_containerFontFamily, fontSize: this.external_containerFontSize, fontWeight: this.external_containerFontWeight };
}, "external_containerFont"), container_dbFont: m(function() {
  return { fontFamily: this.container_dbFontFamily, fontSize: this.container_dbFontSize, fontWeight: this.container_dbFontWeight };
}, "container_dbFont"), external_container_dbFont: m(function() {
  return { fontFamily: this.external_container_dbFontFamily, fontSize: this.external_container_dbFontSize, fontWeight: this.external_container_dbFontWeight };
}, "external_container_dbFont"), container_queueFont: m(function() {
  return { fontFamily: this.container_queueFontFamily, fontSize: this.container_queueFontSize, fontWeight: this.container_queueFontWeight };
}, "container_queueFont"), external_container_queueFont: m(function() {
  return { fontFamily: this.external_container_queueFontFamily, fontSize: this.external_container_queueFontSize, fontWeight: this.external_container_queueFontWeight };
}, "external_container_queueFont"), componentFont: m(function() {
  return { fontFamily: this.componentFontFamily, fontSize: this.componentFontSize, fontWeight: this.componentFontWeight };
}, "componentFont"), external_componentFont: m(function() {
  return { fontFamily: this.external_componentFontFamily, fontSize: this.external_componentFontSize, fontWeight: this.external_componentFontWeight };
}, "external_componentFont"), component_dbFont: m(function() {
  return { fontFamily: this.component_dbFontFamily, fontSize: this.component_dbFontSize, fontWeight: this.component_dbFontWeight };
}, "component_dbFont"), external_component_dbFont: m(function() {
  return { fontFamily: this.external_component_dbFontFamily, fontSize: this.external_component_dbFontSize, fontWeight: this.external_component_dbFontWeight };
}, "external_component_dbFont"), component_queueFont: m(function() {
  return { fontFamily: this.component_queueFontFamily, fontSize: this.component_queueFontSize, fontWeight: this.component_queueFontWeight };
}, "component_queueFont"), external_component_queueFont: m(function() {
  return { fontFamily: this.external_component_queueFontFamily, fontSize: this.external_component_queueFontSize, fontWeight: this.external_component_queueFontWeight };
}, "external_component_queueFont"), boundaryFont: m(function() {
  return { fontFamily: this.boundaryFontFamily, fontSize: this.boundaryFontSize, fontWeight: this.boundaryFontWeight };
}, "boundaryFont"), messageFont: m(function() {
  return { fontFamily: this.messageFontFamily, fontSize: this.messageFontSize, fontWeight: this.messageFontWeight };
}, "messageFont") }, pie: { ...$.pie, useWidth: 984 }, xyChart: { ...$.xyChart, useWidth: void 0 }, requirement: { ...$.requirement, useWidth: void 0 }, packet: { ...$.packet }, treeView: { ...$.treeView, useWidth: void 0 }, radar: { ...$.radar }, ishikawa: { ...$.ishikawa }, treemap: { useMaxWidth: true, padding: 10, diagramPadding: 8, showValues: true, nodeWidth: 100, nodeHeight: 40, borderWidth: 1, valueFontSize: 12, labelFontSize: 14, valueFormat: "," }, venn: { ...$.venn } };
var io = m((r, t = "") => Object.keys(r).reduce((i, e) => Array.isArray(r[e]) ? i : typeof r[e] == "object" && r[e] !== null ? [...i, t + e, ...io(r[e], "")] : [...i, t + e], []), "keyify");
var ro = new Set(io(to, ""));
var oo = to;
var Qt = m((r) => {
  if (pt.debug("sanitizeDirective called with", r), !(typeof r != "object" || r == null)) {
    if (Array.isArray(r)) {
      r.forEach((t) => Qt(t));
      return;
    }
    for (let t of Object.keys(r)) {
      if (pt.debug("Checking key", t), t.startsWith("__") || t.includes("proto") || t.includes("constr") || !ro.has(t) || r[t] == null) {
        pt.debug("sanitize deleting key: ", t), delete r[t];
        continue;
      }
      if (typeof r[t] == "object") {
        pt.debug("sanitizing object", t), Qt(r[t]);
        continue;
      }
      let i = ["themeCSS", "fontFamily", "altFontFamily"];
      for (let e of i) t.includes(e) && (pt.debug("sanitizing css option", t), r[t] = ue(r[t]));
    }
    if (r.themeVariables) for (let t of Object.keys(r.themeVariables)) {
      let i = r.themeVariables[t];
      (i == null ? void 0 : i.match) && !i.match(/^[\d "#%(),.;A-Za-z]+$/) && (r.themeVariables[t] = "");
    }
    pt.debug("After sanitization", r);
  }
}, "sanitizeDirective");
var ue = m((r) => {
  let t = 0, i = 0;
  for (let e of r) {
    if (t < i) return "{ /* ERROR: Unbalanced CSS */ }";
    e === "{" ? t++ : e === "}" && i++;
  }
  return t !== i ? "{ /* ERROR: Unbalanced CSS */ }" : r;
}, "sanitizeCss");
var Mt = Object.freeze(oo);
var Hi = m((r) => !(r === false || ["false", "null", "0"].includes(String(r).trim().toLowerCase())), "evaluate");
var U = w({}, Mt);
var ti;
var nt = [];
var qt = w({}, Mt);
var ii = m((r, t) => {
  let i = w({}, r), e = {};
  for (let d of t) ao(d), e = w(e, d);
  if (i = w(i, e), e.theme && e.theme in et) {
    let d = w({}, ti), h = w(d.themeVariables || {}, e.themeVariables);
    i.theme && i.theme in et && (i.themeVariables = et[i.theme].getThemeVariables(h));
  }
  return qt = i, ho(qt), qt;
}, "updateCurrentConfig");
var me = m((r) => (U = w({}, Mt), U = w(U, r), r.theme && et[r.theme] && (U.themeVariables = et[r.theme].getThemeVariables(r.themeVariables)), ii(U, nt), U), "setSiteConfig");
var Zh = m((r) => {
  ti = w({}, r);
}, "saveConfigFromInitialize");
var Jh = m((r) => (U = w(U, r), ii(U, nt), U), "updateSiteConfig");
var Qh = m(() => w({}, U), "getSiteConfig");
var so = m((r) => (ho(r), w(qt, r), Ot()), "setConfig");
var Ot = m(() => w({}, qt), "getConfig");
var ao = m((r) => {
  r && (["secure", ...U.secure ?? []].forEach((t) => {
    Object.hasOwn(r, t) && (pt.debug(`Denied attempt to modify a secure key ${t}`, r[t]), delete r[t]);
  }), Object.keys(r).forEach((t) => {
    t.startsWith("__") && delete r[t];
  }), Object.keys(r).forEach((t) => {
    typeof r[t] == "string" && (r[t].includes("<") || r[t].includes(">") || r[t].includes("url(data:")) && delete r[t], typeof r[t] == "object" && ao(r[t]);
  }));
}, "sanitize");
var tn = m((r) => {
  var _a16;
  Qt(r), r.fontFamily && !((_a16 = r.themeVariables) == null ? void 0 : _a16.fontFamily) && (r.themeVariables = { ...r.themeVariables, fontFamily: r.fontFamily }), nt.push(r), ii(U, nt);
}, "addDirective");
var rn = m((r = U) => {
  nt = [], ii(r, nt);
}, "reset");
var xe = { LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", FLOWCHART_HTML_LABELS_DEPRECATED: "flowchart.htmlLabels is deprecated. Please use global htmlLabels instead." };
var eo = {};
var lo = m((r) => {
  eo[r] || (pt.warn(xe[r]), eo[r] = true);
}, "issueWarning");
var ho = m((r) => {
  r && (r.lazyLoadedDiagrams || r.loadExternalDiagramsAtStartup) && lo("LAZY_LOAD_DEPRECATED");
}, "checkConfig");
var on = m(() => {
  let r = {};
  ti && (r = w(r, ti));
  for (let t of nt) r = w(r, t);
  return r;
}, "getUserDefinedConfig");
var no = m((r) => {
  var _a16, _b;
  return ((_a16 = r.flowchart) == null ? void 0 : _a16.htmlLabels) != null && lo("FLOWCHART_HTML_LABELS_DEPRECATED"), Hi(r.htmlLabels ?? ((_b = r.flowchart) == null ? void 0 : _b.htmlLabels) ?? true);
}, "getEffectiveHtmlLabels");
var { entries: fo, setPrototypeOf: co, isFrozen: ye, getPrototypeOf: fe, getOwnPropertyDescriptor: Te } = Object;
var { freeze: N, seal: j, create: Xi } = Object;
var { apply: Ki, construct: Zi } = typeof Reflect < "u" && Reflect;
N || (N = m(function(t) {
  return t;
}, "freeze"));
j || (j = m(function(t) {
  return t;
}, "seal"));
Ki || (Ki = m(function(t, i) {
  for (var e = arguments.length, d = new Array(e > 2 ? e - 2 : 0), h = 2; h < e; h++) d[h - 2] = arguments[h];
  return t.apply(i, d);
}, "apply"));
Zi || (Zi = m(function(t) {
  for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), d = 1; d < i; d++) e[d - 1] = arguments[d];
  return new t(...e);
}, "construct"));
var ri = H(Array.prototype.forEach);
var ke = H(Array.prototype.lastIndexOf);
var Co = H(Array.prototype.pop);
var It = H(Array.prototype.push);
var Be = H(Array.prototype.splice);
var ei = H(String.prototype.toLowerCase);
var Gi = H(String.prototype.toString);
var $i = H(String.prototype.match);
var Dt = H(String.prototype.replace);
var be = H(String.prototype.indexOf);
var Se = H(String.prototype.trim);
var Y = H(Object.prototype.hasOwnProperty);
var P = H(RegExp.prototype.test);
var wt = Fe(TypeError);
function H(r) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), d = 1; d < i; d++) e[d - 1] = arguments[d];
    return Ki(r, t, e);
  };
}
m(H, "unapply");
function Fe(r) {
  return function() {
    for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
    return Zi(r, i);
  };
}
m(Fe, "unconstruct");
function x(r, t) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ei;
  co && co(r, null);
  let e = t.length;
  for (; e--; ) {
    let d = t[e];
    if (typeof d == "string") {
      let h = i(d);
      h !== d && (ye(t) || (t[e] = h), d = h);
    }
    r[d] = true;
  }
  return r;
}
m(x, "addToSet");
function Le(r) {
  for (let t = 0; t < r.length; t++) Y(r, t) || (r[t] = null);
  return r;
}
m(Le, "cleanArray");
function Z(r) {
  let t = Xi(null);
  for (let [i, e] of fo(r)) Y(r, i) && (Array.isArray(e) ? t[i] = Le(e) : e && typeof e == "object" && e.constructor === Object ? t[i] = Z(e) : t[i] = e);
  return t;
}
m(Z, "clone");
function zt(r, t) {
  for (; r !== null; ) {
    let e = Te(r, t);
    if (e) {
      if (e.get) return H(e.get);
      if (typeof e.value == "function") return H(e.value);
    }
    r = fe(r);
  }
  function i() {
    return null;
  }
  return m(i, "fallbackValue"), i;
}
m(zt, "lookupGetter");
var go = N(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
var Ui = N(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
var ji = N(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
var Ee = N(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
var Vi = N(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
var _e = N(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
var po = N(["#text"]);
var uo = N(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
var Yi = N(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
var mo = N(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
var oi = N(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
var Ae = j(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ve = j(/<%[\w\W]*|[\w\W]*%>/gm);
var qe = j(/\$\{[\w\W]*/gm);
var Me = j(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var Oe = j(/^aria-[\-\w]+$/);
var To = j(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var Ie = j(/^(?:\w+script|data):/i);
var De = j(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var ko = j(/^html$/i);
var we = j(/^[a-z][.\w]*(-[.\w]+)+$/i);
var xo = Object.freeze({ __proto__: null, ARIA_ATTR: Oe, ATTR_WHITESPACE: De, CUSTOM_ELEMENT: we, DATA_ATTR: Me, DOCTYPE_NAME: ko, ERB_EXPR: ve, IS_ALLOWED_URI: To, IS_SCRIPT_OR_DATA: Ie, MUSTACHE_EXPR: Ae, TMPLIT_EXPR: qe });
var Wt = { element: 1, attribute: 2, text: 3, cdataSection: 4, entityReference: 5, entityNode: 6, progressingInstruction: 7, comment: 8, document: 9, documentType: 10, documentFragment: 11, notation: 12 };
var ze = m(function() {
  return typeof window > "u" ? null : window;
}, "getGlobal");
var We = m(function(t, i) {
  if (typeof t != "object" || typeof t.createPolicy != "function") return null;
  let e = null, d = "data-tt-policy-suffix";
  i && i.hasAttribute(d) && (e = i.getAttribute(d));
  let h = "dompurify" + (e ? "#" + e : "");
  try {
    return t.createPolicy(h, { createHTML(y) {
      return y;
    }, createScriptURL(y) {
      return y;
    } });
  } catch {
    return console.warn("TrustedTypes policy " + h + " could not be created."), null;
  }
}, "_createTrustedTypesPolicy");
var yo = m(function() {
  return { afterSanitizeAttributes: [], afterSanitizeElements: [], afterSanitizeShadowDOM: [], beforeSanitizeAttributes: [], beforeSanitizeElements: [], beforeSanitizeShadowDOM: [], uponSanitizeAttribute: [], uponSanitizeElement: [], uponSanitizeShadowNode: [] };
}, "_createHooksMap");
function Bo() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ze(), t = m((m2) => Bo(m2), "DOMPurify");
  if (t.version = "3.3.1", t.removed = [], !r || !r.document || r.document.nodeType !== Wt.document || !r.Element) return t.isSupported = false, t;
  let { document: i } = r, e = i, d = e.currentScript, { DocumentFragment: h, HTMLTemplateElement: y, Node: f, Element: q, NodeFilter: M, NamedNodeMap: V = r.NamedNodeMap || r.MozNamedAttrMap, HTMLFormElement: bt, DOMParser: ct, trustedTypes: rt } = r, dt = q.prototype, Ct = zt(dt, "cloneNode"), St = zt(dt, "remove"), hi = zt(dt, "nextSibling"), ni = zt(dt, "childNodes"), gt = zt(dt, "parentNode");
  if (typeof y == "function") {
    let m2 = i.createElement("template");
    m2.content && m2.content.ownerDocument && (i = m2.content.ownerDocument);
  }
  let O, Ft = "", { implementation: ci, createNodeIterator: Mo, createDocumentFragment: Oo, getElementsByTagName: Io } = i, { importNode: Do } = e, W = yo();
  t.isSupported = typeof fo == "function" && typeof gt == "function" && ci && ci.createHTMLDocument !== void 0;
  let { MUSTACHE_EXPR: di, ERB_EXPR: Ci, TMPLIT_EXPR: gi, DATA_ATTR: wo, ARIA_ATTR: zo, IS_SCRIPT_OR_DATA: Wo, ATTR_WHITESPACE: sr, CUSTOM_ELEMENT: Ro } = xo, { IS_ALLOWED_URI: ar } = xo, v = null, lr = x({}, [...go, ...Ui, ...ji, ...Vi, ...po]), I = null, hr = x({}, [...uo, ...Yi, ...mo, ...oi]), B = Object.seal(Xi(null, { tagNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, attributeNameCheck: { writable: true, configurable: false, enumerable: true, value: null }, allowCustomizedBuiltInElements: { writable: true, configurable: false, enumerable: true, value: false } })), Lt = null, pi = null, pt2 = Object.seal(Xi(null, { tagCheck: { writable: true, configurable: false, enumerable: true, value: null }, attributeCheck: { writable: true, configurable: false, enumerable: true, value: null } })), nr = true, ui = true, cr = false, dr = true, ut = false, Pt = true, at = false, mi = false, xi = false, mt = false, Nt = false, Ht = false, Cr = true, gr = false, Po = "user-content-", yi = true, Et = false, xt = {}, X = null, fi = x({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), pr = null, ur = x({}, ["audio", "video", "img", "source", "image", "track"]), Ti = null, mr = x({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Gt = "http://www.w3.org/1998/Math/MathML", $t = "http://www.w3.org/2000/svg", J = "http://www.w3.org/1999/xhtml", yt = J, ki = false, Bi = null, No = x({}, [Gt, $t, J], Gi), Ut = x({}, ["mi", "mo", "mn", "ms", "mtext"]), jt = x({}, ["annotation-xml"]), Ho = x({}, ["title", "style", "font", "a", "script"]), _t = null, Go = ["application/xhtml+xml", "text/html"], $o = "text/html", E = null, ft = null, Uo = i.createElement("form"), xr = m(function(a) {
    return a instanceof RegExp || a instanceof Function;
  }, "isRegexOrFunction"), bi = m(function() {
    let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(ft && ft === a)) {
      if ((!a || typeof a != "object") && (a = {}), a = Z(a), _t = Go.indexOf(a.PARSER_MEDIA_TYPE) === -1 ? $o : a.PARSER_MEDIA_TYPE, E = _t === "application/xhtml+xml" ? Gi : ei, v = Y(a, "ALLOWED_TAGS") ? x({}, a.ALLOWED_TAGS, E) : lr, I = Y(a, "ALLOWED_ATTR") ? x({}, a.ALLOWED_ATTR, E) : hr, Bi = Y(a, "ALLOWED_NAMESPACES") ? x({}, a.ALLOWED_NAMESPACES, Gi) : No, Ti = Y(a, "ADD_URI_SAFE_ATTR") ? x(Z(mr), a.ADD_URI_SAFE_ATTR, E) : mr, pr = Y(a, "ADD_DATA_URI_TAGS") ? x(Z(ur), a.ADD_DATA_URI_TAGS, E) : ur, X = Y(a, "FORBID_CONTENTS") ? x({}, a.FORBID_CONTENTS, E) : fi, Lt = Y(a, "FORBID_TAGS") ? x({}, a.FORBID_TAGS, E) : Z({}), pi = Y(a, "FORBID_ATTR") ? x({}, a.FORBID_ATTR, E) : Z({}), xt = Y(a, "USE_PROFILES") ? a.USE_PROFILES : false, nr = a.ALLOW_ARIA_ATTR !== false, ui = a.ALLOW_DATA_ATTR !== false, cr = a.ALLOW_UNKNOWN_PROTOCOLS || false, dr = a.ALLOW_SELF_CLOSE_IN_ATTR !== false, ut = a.SAFE_FOR_TEMPLATES || false, Pt = a.SAFE_FOR_XML !== false, at = a.WHOLE_DOCUMENT || false, mt = a.RETURN_DOM || false, Nt = a.RETURN_DOM_FRAGMENT || false, Ht = a.RETURN_TRUSTED_TYPE || false, xi = a.FORCE_BODY || false, Cr = a.SANITIZE_DOM !== false, gr = a.SANITIZE_NAMED_PROPS || false, yi = a.KEEP_CONTENT !== false, Et = a.IN_PLACE || false, ar = a.ALLOWED_URI_REGEXP || To, yt = a.NAMESPACE || J, Ut = a.MATHML_TEXT_INTEGRATION_POINTS || Ut, jt = a.HTML_INTEGRATION_POINTS || jt, B = a.CUSTOM_ELEMENT_HANDLING || {}, a.CUSTOM_ELEMENT_HANDLING && xr(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (B.tagNameCheck = a.CUSTOM_ELEMENT_HANDLING.tagNameCheck), a.CUSTOM_ELEMENT_HANDLING && xr(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (B.attributeNameCheck = a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), a.CUSTOM_ELEMENT_HANDLING && typeof a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (B.allowCustomizedBuiltInElements = a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ut && (ui = false), Nt && (mt = true), xt && (v = x({}, po), I = [], xt.html === true && (x(v, go), x(I, uo)), xt.svg === true && (x(v, Ui), x(I, Yi), x(I, oi)), xt.svgFilters === true && (x(v, ji), x(I, Yi), x(I, oi)), xt.mathMl === true && (x(v, Vi), x(I, mo), x(I, oi))), a.ADD_TAGS && (typeof a.ADD_TAGS == "function" ? pt2.tagCheck = a.ADD_TAGS : (v === lr && (v = Z(v)), x(v, a.ADD_TAGS, E))), a.ADD_ATTR && (typeof a.ADD_ATTR == "function" ? pt2.attributeCheck = a.ADD_ATTR : (I === hr && (I = Z(I)), x(I, a.ADD_ATTR, E))), a.ADD_URI_SAFE_ATTR && x(Ti, a.ADD_URI_SAFE_ATTR, E), a.FORBID_CONTENTS && (X === fi && (X = Z(X)), x(X, a.FORBID_CONTENTS, E)), a.ADD_FORBID_CONTENTS && (X === fi && (X = Z(X)), x(X, a.ADD_FORBID_CONTENTS, E)), yi && (v["#text"] = true), at && x(v, ["html", "head", "body"]), v.table && (x(v, ["tbody"]), delete Lt.tbody), a.TRUSTED_TYPES_POLICY) {
        if (typeof a.TRUSTED_TYPES_POLICY.createHTML != "function") throw wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof a.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        O = a.TRUSTED_TYPES_POLICY, Ft = O.createHTML("");
      } else O === void 0 && (O = We(rt, d)), O !== null && typeof Ft == "string" && (Ft = O.createHTML(""));
      N && N(a), ft = a;
    }
  }, "_parseConfig"), yr = x({}, [...Ui, ...ji, ...Ee]), fr = x({}, [...Vi, ..._e]), jo = m(function(a) {
    let C = gt(a);
    (!C || !C.tagName) && (C = { namespaceURI: yt, tagName: "template" });
    let g = ei(a.tagName), T = ei(C.tagName);
    return Bi[a.namespaceURI] ? a.namespaceURI === $t ? C.namespaceURI === J ? g === "svg" : C.namespaceURI === Gt ? g === "svg" && (T === "annotation-xml" || Ut[T]) : !!yr[g] : a.namespaceURI === Gt ? C.namespaceURI === J ? g === "math" : C.namespaceURI === $t ? g === "math" && jt[T] : !!fr[g] : a.namespaceURI === J ? C.namespaceURI === $t && !jt[T] || C.namespaceURI === Gt && !Ut[T] ? false : !fr[g] && (Ho[g] || !yr[g]) : !!(_t === "application/xhtml+xml" && Bi[a.namespaceURI]) : false;
  }, "_checkValidNamespace"), K = m(function(a) {
    It(t.removed, { element: a });
    try {
      gt(a).removeChild(a);
    } catch {
      St(a);
    }
  }, "_forceRemove"), lt = m(function(a, C) {
    try {
      It(t.removed, { attribute: C.getAttributeNode(a), from: C });
    } catch {
      It(t.removed, { attribute: null, from: C });
    }
    if (C.removeAttribute(a), a === "is") if (mt || Nt) try {
      K(C);
    } catch {
    }
    else try {
      C.setAttribute(a, "");
    } catch {
    }
  }, "_removeAttribute"), Tr = m(function(a) {
    let C = null, g = null;
    if (xi) a = "<remove></remove>" + a;
    else {
      let S = $i(a, /^[\r\n\t ]+/);
      g = S && S[0];
    }
    _t === "application/xhtml+xml" && yt === J && (a = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + a + "</body></html>");
    let T = O ? O.createHTML(a) : a;
    if (yt === J) try {
      C = new ct().parseFromString(T, _t);
    } catch {
    }
    if (!C || !C.documentElement) {
      C = ci.createDocument(yt, "template", null);
      try {
        C.documentElement.innerHTML = ki ? Ft : T;
      } catch {
      }
    }
    let z = C.body || C.documentElement;
    return a && g && z.insertBefore(i.createTextNode(g), z.childNodes[0] || null), yt === J ? Io.call(C, at ? "html" : "body")[0] : at ? C.documentElement : z;
  }, "_initDocument"), kr = m(function(a) {
    return Mo.call(a.ownerDocument || a, a, M.SHOW_ELEMENT | M.SHOW_COMMENT | M.SHOW_TEXT | M.SHOW_PROCESSING_INSTRUCTION | M.SHOW_CDATA_SECTION, null);
  }, "_createNodeIterator"), Si = m(function(a) {
    return a instanceof bt && (typeof a.nodeName != "string" || typeof a.textContent != "string" || typeof a.removeChild != "function" || !(a.attributes instanceof V) || typeof a.removeAttribute != "function" || typeof a.setAttribute != "function" || typeof a.namespaceURI != "string" || typeof a.insertBefore != "function" || typeof a.hasChildNodes != "function");
  }, "_isClobbered"), Br = m(function(a) {
    return typeof f == "function" && a instanceof f;
  }, "_isNode");
  function Q(m2, a, C) {
    ri(m2, (g) => {
      g.call(t, a, C, ft);
    });
  }
  m(Q, "_executeHooks");
  let br = m(function(a) {
    let C = null;
    if (Q(W.beforeSanitizeElements, a, null), Si(a)) return K(a), true;
    let g = E(a.nodeName);
    if (Q(W.uponSanitizeElement, a, { tagName: g, allowedTags: v }), Pt && a.hasChildNodes() && !Br(a.firstElementChild) && P(/<[/\w!]/g, a.innerHTML) && P(/<[/\w!]/g, a.textContent) || a.nodeType === Wt.progressingInstruction || Pt && a.nodeType === Wt.comment && P(/<[/\w]/g, a.data)) return K(a), true;
    if (!(pt2.tagCheck instanceof Function && pt2.tagCheck(g)) && (!v[g] || Lt[g])) {
      if (!Lt[g] && Fr(g) && (B.tagNameCheck instanceof RegExp && P(B.tagNameCheck, g) || B.tagNameCheck instanceof Function && B.tagNameCheck(g))) return false;
      if (yi && !X[g]) {
        let T = gt(a) || a.parentNode, z = ni(a) || a.childNodes;
        if (z && T) {
          let S = z.length;
          for (let G = S - 1; G >= 0; --G) {
            let tt = Ct(z[G], true);
            tt.__removalCount = (a.__removalCount || 0) + 1, T.insertBefore(tt, hi(a));
          }
        }
      }
      return K(a), true;
    }
    return a instanceof q && !jo(a) || (g === "noscript" || g === "noembed" || g === "noframes") && P(/<\/no(script|embed|frames)/i, a.innerHTML) ? (K(a), true) : (ut && a.nodeType === Wt.text && (C = a.textContent, ri([di, Ci, gi], (T) => {
      C = Dt(C, T, " ");
    }), a.textContent !== C && (It(t.removed, { element: a.cloneNode() }), a.textContent = C)), Q(W.afterSanitizeElements, a, null), false);
  }, "_sanitizeElements"), Sr = m(function(a, C, g) {
    if (Cr && (C === "id" || C === "name") && (g in i || g in Uo)) return false;
    if (!(ui && !pi[C] && P(wo, C))) {
      if (!(nr && P(zo, C))) {
        if (!(pt2.attributeCheck instanceof Function && pt2.attributeCheck(C, a))) {
          if (!I[C] || pi[C]) {
            if (!(Fr(a) && (B.tagNameCheck instanceof RegExp && P(B.tagNameCheck, a) || B.tagNameCheck instanceof Function && B.tagNameCheck(a)) && (B.attributeNameCheck instanceof RegExp && P(B.attributeNameCheck, C) || B.attributeNameCheck instanceof Function && B.attributeNameCheck(C, a)) || C === "is" && B.allowCustomizedBuiltInElements && (B.tagNameCheck instanceof RegExp && P(B.tagNameCheck, g) || B.tagNameCheck instanceof Function && B.tagNameCheck(g)))) return false;
          } else if (!Ti[C]) {
            if (!P(ar, Dt(g, sr, ""))) {
              if (!((C === "src" || C === "xlink:href" || C === "href") && a !== "script" && be(g, "data:") === 0 && pr[a])) {
                if (!(cr && !P(Wo, Dt(g, sr, "")))) {
                  if (g) return false;
                }
              }
            }
          }
        }
      }
    }
    return true;
  }, "_isValidAttribute"), Fr = m(function(a) {
    return a !== "annotation-xml" && $i(a, Ro);
  }, "_isBasicCustomElement"), Lr = m(function(a) {
    Q(W.beforeSanitizeAttributes, a, null);
    let { attributes: C } = a;
    if (!C || Si(a)) return;
    let g = { attrName: "", attrValue: "", keepAttr: true, allowedAttributes: I, forceKeepAttr: void 0 }, T = C.length;
    for (; T--; ) {
      let z = C[T], { name: S, namespaceURI: G, value: tt } = z, Tt = E(S), Fi = tt, D = S === "value" ? Fi : Se(Fi);
      if (g.attrName = Tt, g.attrValue = D, g.keepAttr = true, g.forceKeepAttr = void 0, Q(W.uponSanitizeAttribute, a, g), D = g.attrValue, gr && (Tt === "id" || Tt === "name") && (lt(S, a), D = Po + D), Pt && P(/((--!?|])>)|<\/(style|title|textarea)/i, D)) {
        lt(S, a);
        continue;
      }
      if (Tt === "attributename" && $i(D, "href")) {
        lt(S, a);
        continue;
      }
      if (g.forceKeepAttr) continue;
      if (!g.keepAttr) {
        lt(S, a);
        continue;
      }
      if (!dr && P(/\/>/i, D)) {
        lt(S, a);
        continue;
      }
      ut && ri([di, Ci, gi], (_r) => {
        D = Dt(D, _r, " ");
      });
      let Er = E(a.nodeName);
      if (!Sr(Er, Tt, D)) {
        lt(S, a);
        continue;
      }
      if (O && typeof rt == "object" && typeof rt.getAttributeType == "function" && !G) switch (rt.getAttributeType(Er, Tt)) {
        case "TrustedHTML": {
          D = O.createHTML(D);
          break;
        }
        case "TrustedScriptURL": {
          D = O.createScriptURL(D);
          break;
        }
      }
      if (D !== Fi) try {
        G ? a.setAttributeNS(G, S, D) : a.setAttribute(S, D), Si(a) ? K(a) : Co(t.removed);
      } catch {
        lt(S, a);
      }
    }
    Q(W.afterSanitizeAttributes, a, null);
  }, "_sanitizeAttributes"), Vo = m(function m2(a) {
    let C = null, g = kr(a);
    for (Q(W.beforeSanitizeShadowDOM, a, null); C = g.nextNode(); ) Q(W.uponSanitizeShadowNode, C, null), br(C), Lr(C), C.content instanceof h && m2(C.content);
    Q(W.afterSanitizeShadowDOM, a, null);
  }, "_sanitizeShadowDOM");
  return t.sanitize = function(m2) {
    let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = null, g = null, T = null, z = null;
    if (ki = !m2, ki && (m2 = "<!-->"), typeof m2 != "string" && !Br(m2)) if (typeof m2.toString == "function") {
      if (m2 = m2.toString(), typeof m2 != "string") throw wt("dirty is not a string, aborting");
    } else throw wt("toString is not a function");
    if (!t.isSupported) return m2;
    if (mi || bi(a), t.removed = [], typeof m2 == "string" && (Et = false), Et) {
      if (m2.nodeName) {
        let tt = E(m2.nodeName);
        if (!v[tt] || Lt[tt]) throw wt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (m2 instanceof f) C = Tr("<!---->"), g = C.ownerDocument.importNode(m2, true), g.nodeType === Wt.element && g.nodeName === "BODY" || g.nodeName === "HTML" ? C = g : C.appendChild(g);
    else {
      if (!mt && !ut && !at && m2.indexOf("<") === -1) return O && Ht ? O.createHTML(m2) : m2;
      if (C = Tr(m2), !C) return mt ? null : Ht ? Ft : "";
    }
    C && xi && K(C.firstChild);
    let S = kr(Et ? m2 : C);
    for (; T = S.nextNode(); ) br(T), Lr(T), T.content instanceof h && Vo(T.content);
    if (Et) return m2;
    if (mt) {
      if (Nt) for (z = Oo.call(C.ownerDocument); C.firstChild; ) z.appendChild(C.firstChild);
      else z = C;
      return (I.shadowroot || I.shadowrootmode) && (z = Do.call(e, z, true)), z;
    }
    let G = at ? C.outerHTML : C.innerHTML;
    return at && v["!doctype"] && C.ownerDocument && C.ownerDocument.doctype && C.ownerDocument.doctype.name && P(ko, C.ownerDocument.doctype.name) && (G = "<!DOCTYPE " + C.ownerDocument.doctype.name + `>
` + G), ut && ri([di, Ci, gi], (tt) => {
      G = Dt(G, tt, " ");
    }), O && Ht ? O.createHTML(G) : G;
  }, t.setConfig = function() {
    let m2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    bi(m2), mi = true;
  }, t.clearConfig = function() {
    ft = null, mi = false;
  }, t.isValidAttribute = function(m2, a, C) {
    ft || bi({});
    let g = E(m2), T = E(a);
    return Sr(g, T, C);
  }, t.addHook = function(m2, a) {
    typeof a == "function" && It(W[m2], a);
  }, t.removeHook = function(m2, a) {
    if (a !== void 0) {
      let C = ke(W[m2], a);
      return C === -1 ? void 0 : Be(W[m2], C, 1)[0];
    }
    return Co(W[m2]);
  }, t.removeHooks = function(m2) {
    W[m2] = [];
  }, t.removeAllHooks = function() {
    W = yo();
  }, t;
}
m(Bo, "createDOMPurify");
var Bt = Bo();
var Rt = /<br\s*\/?>/gi;
var Re = m((r) => r ? Eo(r).replace(/\\n/g, "#br#").split("#br#") : [""], "getRows");
var Pe = /* @__PURE__ */ (() => {
  let r = false;
  return () => {
    r || (Ne(), r = true);
  };
})();
function Ne() {
  let r = "data-temp-href-target";
  Bt.addHook("beforeSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute("target") && t.setAttribute(r, t.getAttribute("target") ?? "");
  }), Bt.addHook("afterSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute(r) && (t.setAttribute("target", t.getAttribute(r) ?? ""), t.removeAttribute(r), t.getAttribute("target") === "_blank" && t.setAttribute("rel", "noopener"));
  });
}
m(Ne, "setupDompurifyHooks");
var Lo = m((r) => (Pe(), Bt.sanitize(r)), "removeScript");
var bo = m((r, t) => {
  if (no(t)) {
    let i = t.securityLevel;
    i === "antiscript" || i === "strict" || i === "sandbox" ? r = Lo(r) : i !== "loose" && (r = Eo(r), r = r.replace(/</g, "&lt;").replace(/>/g, "&gt;"), r = r.replace(/=/g, "&equals;"), r = Ue(r));
  }
  return r;
}, "sanitizeMore");
var st = m((r, t) => r && (t.dompurifyConfig ? r = Bt.sanitize(bo(r, t), t.dompurifyConfig).toString() : r = Bt.sanitize(bo(r, t), { FORBID_TAGS: ["style"] }).toString(), r), "sanitizeText");
var He = m((r, t) => typeof r == "string" ? st(r, t) : r.flat().map((i) => st(i, t)), "sanitizeTextOrArray");
var Ge = m((r) => Rt.test(r), "hasBreaks");
var $e = m((r) => r.split(Rt), "splitBreaks");
var Ue = m((r) => r.replace(/#br#/g, "<br/>"), "placeholderToBreak");
var Eo = m((r) => r.replace(Rt, "#br#"), "breakToPlaceholder");
var je = m((r) => {
  let t = "";
  return r && (t = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, t = CSS.escape(t)), t;
}, "getUrl");
var Ve = m(function(...r) {
  let t = r.filter((i) => !isNaN(i));
  return Math.max(...t);
}, "getMax");
var Ye = m(function(...r) {
  let t = r.filter((i) => !isNaN(i));
  return Math.min(...t);
}, "getMin");
var cn = m(function(r) {
  let t = r.split(/(,)/), i = [];
  for (let e = 0; e < t.length; e++) {
    let d = t[e];
    if (d === "," && e > 0 && e + 1 < t.length) {
      let h = t[e - 1], y = t[e + 1];
      Xe(h, y) && (d = h + "," + y, e++, i.pop());
    }
    i.push(Ke(d));
  }
  return i.join("");
}, "parseGenericTypes");
var Ji = m((r, t) => Math.max(0, r.split(t).length - 1), "countOccurrence");
var Xe = m((r, t) => {
  let i = Ji(r, "~"), e = Ji(t, "~");
  return i === 1 && e === 1;
}, "shouldCombineSets");
var Ke = m((r) => {
  let t = Ji(r, "~"), i = false;
  if (t <= 1) return r;
  t % 2 !== 0 && r.startsWith("~") && (r = r.substring(1), i = true);
  let e = [...r], d = e.indexOf("~"), h = e.lastIndexOf("~");
  for (; d !== -1 && h !== -1 && d !== h; ) e[d] = "<", e[h] = ">", d = e.indexOf("~"), h = e.lastIndexOf("~");
  return i && e.unshift("~"), e.join("");
}, "processSet");
var So = m(() => window.MathMLElement !== void 0, "isMathMLSupported");
var si = /\$\$(.*)\$\$/g;
var Fo = m((r) => {
  var _a16;
  return (((_a16 = r.match(si)) == null ? void 0 : _a16.length) ?? 0) > 0;
}, "hasKatex");
var dn = m(async (r, t) => {
  var _a16;
  let i = document.createElement("div");
  i.innerHTML = await Je(r, t), i.id = "katex-temp", i.style.visibility = "hidden", i.style.position = "absolute", i.style.top = "0", (_a16 = document.querySelector("body")) == null ? void 0 : _a16.insertAdjacentElement("beforeend", i);
  let d = { width: i.clientWidth, height: i.clientHeight };
  return i.remove(), d;
}, "calculateMathMLDimensions");
var Ze = m(async (r, t) => {
  if (!Fo(r)) return r;
  if (!(So() || t.legacyMathML || t.forceLegacyMathML)) return r.replace(si, "MathML is unsupported in this environment.");
  {
    let { default: i } = await import("./katex-GD7MH7QM-X7TSEN5B.js"), e = t.forceLegacyMathML || !So() && t.legacyMathML ? "htmlAndMathml" : "mathml";
    return r.split(Rt).map((d) => Fo(d) ? `<div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">${d}</div>` : `<div>${d}</div>`).join("").replace(si, (d, h) => i.renderToString(h, { throwOnError: true, displayMode: true, output: e }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, ""));
  }
  return r.replace(si, "Katex is not supported in @mermaid-js/tiny. Please use the full mermaid library.");
}, "renderKatexUnsanitized");
var Je = m(async (r, t) => st(await Ze(r, t), t), "renderKatexSanitized");
var Cn = { getRows: Re, sanitizeText: st, sanitizeTextOrArray: He, hasBreaks: Ge, splitBreaks: $e, lineBreakRegex: Rt, removeScript: Lo, getUrl: je, evaluate: Hi, getMax: Ve, getMin: Ye };
var Qe = m(function(r, t) {
  for (let i of t) r.attr(i[0], i[1]);
}, "d3Attrs");
var ts = m(function(r, t, i) {
  let e = /* @__PURE__ */ new Map();
  return i ? (e.set("width", "100%"), e.set("style", `max-width: ${t}px;`)) : (e.set("height", r), e.set("width", t)), e;
}, "calculateSvgSizeAttrs");
var is = m(function(r, t, i, e) {
  let d = ts(t, i, e);
  Qe(r, d);
}, "configureSvgSize");
var _o = m(function(r, t, i, e) {
  let d = t.node().getBBox(), h = d.width, y = d.height;
  pt.info(`SVG bounds: ${h}x${y}`, d);
  let f = 0, q = 0;
  pt.info(`Graph bounds: ${f}x${q}`, r), f = h + i * 2, q = y + i * 2, pt.info(`Calculated bounds: ${f}x${q}`), is(t, q, f, e);
  let M = `${d.x - i} ${d.y - i} ${d.width + 2 * i} ${d.height + 2 * i}`;
  t.attr("viewBox", M);
}, "setupGraphViewbox");
var ai = {};
var rs = m((r, t, i, e) => {
  let d = "";
  return r in ai && ai[r] ? d = ai[r]({ ...i, svgId: e }) : pt.warn(`No theme found for ${r}`), ` & {
    font-family: ${i.fontFamily};
    font-size: ${i.fontSize};
    fill: ${i.textColor}
  }
  @keyframes edge-animation-frame {
    from {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
  & .edge-animation-slow {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 50s linear infinite;
    stroke-linecap: round;
  }
  & .edge-animation-fast {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 20s linear infinite;
    stroke-linecap: round;
  }
  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${i.errorBkgColor};
  }
  & .error-text {
    fill: ${i.errorTextColor};
    stroke: ${i.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: ${i.strokeWidth ?? 1}px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }
  & .edge-thickness-invisible {
    stroke-width: 0;
    fill: none;
  }
  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${i.lineColor};
    stroke: ${i.lineColor};
  }
  & .marker.cross {
    stroke: ${i.lineColor};
  }

  & svg {
    font-family: ${i.fontFamily};
    font-size: ${i.fontSize};
  }
   & p {
    margin: 0
   }

  ${d}
  .node .neo-node {
    stroke: ${i.nodeBorder};
  }

  [data-look="neo"].node rect, [data-look="neo"].cluster rect, [data-look="neo"].node polygon {
    stroke: ${i.useGradient ? "url(" + e + "-gradient)" : i.nodeBorder};
    filter: ${i.dropShadow ? i.dropShadow.replace("url(#drop-shadow)", `url(${e}-drop-shadow)`) : "none"};
  }


  [data-look="neo"].node path {
    stroke: ${i.useGradient ? "url(" + e + "-gradient)" : i.nodeBorder};
    stroke-width: ${i.strokeWidth ?? 1}px;
  }

  [data-look="neo"].node .outer-path {
    filter: ${i.dropShadow ? i.dropShadow.replace("url(#drop-shadow)", `url(${e}-drop-shadow)`) : "none"};
  }

  [data-look="neo"].node .neo-line path {
    stroke: ${i.nodeBorder};
    filter: none;
  }

  [data-look="neo"].node circle{
    stroke: ${i.useGradient ? "url(" + e + "-gradient)" : i.nodeBorder};
    filter: ${i.dropShadow ? i.dropShadow.replace("url(#drop-shadow)", `url(${e}-drop-shadow)`) : "none"};
  }

  [data-look="neo"].node circle .state-start{
    fill: #000000;
  }

  [data-look="neo"].icon-shape .icon {
    fill: ${i.useGradient ? "url(" + e + "-gradient)" : i.nodeBorder};
    filter: ${i.dropShadow ? i.dropShadow.replace("url(#drop-shadow)", `url(${e}-drop-shadow)`) : "none"};
  }

    [data-look="neo"].icon-shape .icon-neo path {
    stroke: ${i.useGradient ? "url(" + e + "-gradient)" : i.nodeBorder};
    filter: ${i.dropShadow ? i.dropShadow.replace("url(#drop-shadow)", `url(${e}-drop-shadow)`) : "none"};
  }

  ${t}
`;
}, "getStyles");
var Ao = m((r, t) => {
  t !== void 0 && (ai[r] = t);
}, "addStylesForDiagram");
var fn = rs;
var or = {};
p(or, { clear: () => os, getAccDescription: () => ls, getAccTitle: () => ss, getDiagramTitle: () => ns, setAccDescription: () => as, setAccTitle: () => es, setDiagramTitle: () => hs });
var Qi = "";
var tr = "";
var ir = "";
var rr = m((r) => st(r, Ot()), "sanitizeText");
var os = m(() => {
  Qi = "", ir = "", tr = "";
}, "clear");
var es = m((r) => {
  Qi = rr(r).replace(/^\s+/g, "");
}, "setAccTitle");
var ss = m(() => Qi, "getAccTitle");
var as = m((r) => {
  ir = rr(r).replace(/\n\s+/g, `
`);
}, "setAccDescription");
var ls = m(() => ir, "getAccDescription");
var hs = m((r) => {
  tr = rr(r);
}, "setDiagramTitle");
var ns = m(() => tr, "getDiagramTitle");
var vo = pt;
var cs = Wh;
var qo = Ot;
var qn = so;
var Mn = Mt;
var ds = m((r) => st(r, qo()), "sanitizeText");
var Cs = _o;
var gs = m(() => or, "getCommonDb");
var li = {};
var On = m((r, t, i) => {
  var _a16;
  li[r] && vo.warn(`Diagram with id ${r} already registered. Overwriting.`), li[r] = t, i && Li(r, i), Ao(r, t.styles), (_a16 = t.injectUtils) == null ? void 0 : _a16.call(t, vo, cs, qo, ds, Cs, gs(), () => {
  });
}, "registerDiagram");
var In = m((r) => {
  if (r in li) return li[r];
  throw new er(r);
}, "getDiagram");
var _a15;
var er = (_a15 = class extends Error {
  constructor(t) {
    super(`Diagram ${t} not found.`);
  }
}, m(_a15, "DiagramNotFoundError"), _a15);

export {
  vr,
  qr,
  Vt,
  Yt,
  Ts,
  ks,
  Bs,
  w,
  R,
  oe,
  k,
  c,
  n,
  de,
  Ur,
  et,
  oo,
  Qt,
  Mt,
  Hi,
  me,
  Zh,
  Jh,
  Qh,
  so,
  Ot,
  tn,
  rn,
  on,
  no,
  Bt,
  Rt,
  st,
  je,
  cn,
  Fo,
  dn,
  Je,
  Cn,
  is,
  _o,
  fn,
  or,
  os,
  es,
  ss,
  as,
  ls,
  hs,
  ns,
  qo,
  qn,
  Mn,
  ds,
  Cs,
  On,
  In
};
/*! Bundled license information:

mermaid/dist/chunks/mermaid.esm.min/chunk-5YUVU3PZ.mjs:
  (*! Bundled license information:
  
  dompurify/dist/purify.es.mjs:
    (*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE *)
  *)
*/
//# sourceMappingURL=chunk-HPIGS4CQ.js.map

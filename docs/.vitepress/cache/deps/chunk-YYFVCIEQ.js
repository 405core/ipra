import {
  m
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-NN2NZ22Q.mjs
function _e(e) {
  return typeof e > "u" || e === null;
}
m(_e, "isNothing");
function Ve(e) {
  return typeof e == "object" && e !== null;
}
m(Ve, "isObject");
function Xe(e) {
  return Array.isArray(e) ? e : _e(e) ? [] : [e];
}
m(Xe, "toArray");
function Ze(e, n) {
  var i, l, r, u;
  if (n) for (u = Object.keys(n), i = 0, l = u.length; i < l; i += 1) r = u[i], e[r] = n[r];
  return e;
}
m(Ze, "extend");
function ze(e, n) {
  var i = "", l;
  for (l = 0; l < n; l += 1) i += e;
  return i;
}
m(ze, "repeat");
function Je(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
m(Je, "isNegativeZero");
var en = _e;
var nn = Ve;
var rn = Xe;
var ln = ze;
var on = Je;
var un = Ze;
var C = { isNothing: en, isObject: nn, toArray: rn, repeat: ln, isNegativeZero: on, extend: un };
function we(e, n) {
  var i = "", l = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (i += 'in "' + e.mark.name + '" '), i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (i += `

` + e.mark.snippet), l + " " + i) : l;
}
m(we, "formatError");
function B(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = we(this, false), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
m(B, "YAMLException$1");
B.prototype = Object.create(Error.prototype);
B.prototype.constructor = B;
B.prototype.toString = m(function(n) {
  return this.name + ": " + we(this, n);
}, "toString");
var E = B;
function Q(e, n, i, l, r) {
  var u = "", o = "", f = Math.floor(r / 2) - 1;
  return l - n > f && (u = " ... ", n = l - f + u.length), i - l > f && (o = " ...", i = l + f - o.length), { str: u + e.slice(n, i).replace(/\t/g, "→") + o, pos: l - n + u.length };
}
m(Q, "getLine");
function V(e, n) {
  return C.repeat(" ", n - e.length) + e;
}
m(V, "padStart");
function fn(e, n) {
  if (n = Object.create(n || null), !e.buffer) return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var i = /\r?\n|\r|\0/g, l = [0], r = [], u, o = -1; u = i.exec(e.buffer); ) r.push(u.index), l.push(u.index + u[0].length), e.position <= u.index && o < 0 && (o = l.length - 2);
  o < 0 && (o = l.length - 1);
  var f = "", a, p, h = Math.min(e.line + n.linesAfter, r.length).toString().length, t = n.maxLength - (n.indent + h + 3);
  for (a = 1; a <= n.linesBefore && !(o - a < 0); a++) p = Q(e.buffer, l[o - a], r[o - a], e.position - (l[o] - l[o - a]), t), f = C.repeat(" ", n.indent) + V((e.line - a + 1).toString(), h) + " | " + p.str + `
` + f;
  for (p = Q(e.buffer, l[o], r[o], e.position, t), f += C.repeat(" ", n.indent) + V((e.line + 1).toString(), h) + " | " + p.str + `
`, f += C.repeat("-", n.indent + h + 3 + p.pos) + `^
`, a = 1; a <= n.linesAfter && !(o + a >= r.length); a++) p = Q(e.buffer, l[o + a], r[o + a], e.position - (l[o] - l[o + a]), t), f += C.repeat(" ", n.indent) + V((e.line + a + 1).toString(), h) + " | " + p.str + `
`;
  return f.replace(/\n$/, "");
}
m(fn, "makeSnippet");
var cn = fn;
var an = ["kind", "multi", "resolve", "construct", "instanceOf", "predicate", "represent", "representName", "defaultStyle", "styleAliases"];
var pn = ["scalar", "sequence", "mapping"];
function tn(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(i) {
    e[i].forEach(function(l) {
      n[String(l)] = i;
    });
  }), n;
}
m(tn, "compileStyleAliases");
function hn(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(i) {
    if (an.indexOf(i) === -1) throw new E('Unknown option "' + i + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return true;
  }, this.construct = n.construct || function(i) {
    return i;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || false, this.styleAliases = tn(n.styleAliases || null), pn.indexOf(this.kind) === -1) throw new E('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
m(hn, "Type$1");
var _ = hn;
function fe(e, n) {
  var i = [];
  return e[n].forEach(function(l) {
    var r = i.length;
    i.forEach(function(u, o) {
      u.tag === l.tag && u.kind === l.kind && u.multi === l.multi && (r = o);
    }), i[r] = l;
  }), i;
}
m(fe, "compileList");
function dn() {
  var e = { scalar: {}, sequence: {}, mapping: {}, fallback: {}, multi: { scalar: [], sequence: [], mapping: [], fallback: [] } }, n, i;
  function l(r) {
    r.multi ? (e.multi[r.kind].push(r), e.multi.fallback.push(r)) : e[r.kind][r.tag] = e.fallback[r.tag] = r;
  }
  for (m(l, "collectType"), n = 0, i = arguments.length; n < i; n += 1) arguments[n].forEach(l);
  return e;
}
m(dn, "compileMap");
function Z(e) {
  return this.extend(e);
}
m(Z, "Schema$1");
Z.prototype.extend = m(function(n) {
  var i = [], l = [];
  if (n instanceof _) l.push(n);
  else if (Array.isArray(n)) l = l.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit))) n.implicit && (i = i.concat(n.implicit)), n.explicit && (l = l.concat(n.explicit));
  else throw new E("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  i.forEach(function(u) {
    if (!(u instanceof _)) throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (u.loadKind && u.loadKind !== "scalar") throw new E("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (u.multi) throw new E("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), l.forEach(function(u) {
    if (!(u instanceof _)) throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var r = Object.create(Z.prototype);
  return r.implicit = (this.implicit || []).concat(i), r.explicit = (this.explicit || []).concat(l), r.compiledImplicit = fe(r, "implicit"), r.compiledExplicit = fe(r, "explicit"), r.compiledTypeMap = dn(r.compiledImplicit, r.compiledExplicit), r;
}, "extend");
var sn = Z;
var mn = new _("tag:yaml.org,2002:str", { kind: "scalar", construct: m(function(e) {
  return e !== null ? e : "";
}, "construct") });
var xn = new _("tag:yaml.org,2002:seq", { kind: "sequence", construct: m(function(e) {
  return e !== null ? e : [];
}, "construct") });
var gn = new _("tag:yaml.org,2002:map", { kind: "mapping", construct: m(function(e) {
  return e !== null ? e : {};
}, "construct") });
var An = new sn({ explicit: [mn, xn, gn] });
function vn(e) {
  if (e === null) return true;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
m(vn, "resolveYamlNull");
function yn() {
  return null;
}
m(yn, "constructYamlNull");
function Cn(e) {
  return e === null;
}
m(Cn, "isNull");
var _n = new _("tag:yaml.org,2002:null", { kind: "scalar", resolve: vn, construct: yn, predicate: Cn, represent: { canonical: m(function() {
  return "~";
}, "canonical"), lowercase: m(function() {
  return "null";
}, "lowercase"), uppercase: m(function() {
  return "NULL";
}, "uppercase"), camelcase: m(function() {
  return "Null";
}, "camelcase"), empty: m(function() {
  return "";
}, "empty") }, defaultStyle: "lowercase" });
function wn(e) {
  if (e === null) return false;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
m(wn, "resolveYamlBoolean");
function En(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
m(En, "constructYamlBoolean");
function Sn(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
m(Sn, "isBoolean");
var Fn = new _("tag:yaml.org,2002:bool", { kind: "scalar", resolve: wn, construct: En, predicate: Sn, represent: { lowercase: m(function(e) {
  return e ? "true" : "false";
}, "lowercase"), uppercase: m(function(e) {
  return e ? "TRUE" : "FALSE";
}, "uppercase"), camelcase: m(function(e) {
  return e ? "True" : "False";
}, "camelcase") }, defaultStyle: "lowercase" });
function bn(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
m(bn, "isHexCode");
function Tn(e) {
  return 48 <= e && e <= 55;
}
m(Tn, "isOctCode");
function On(e) {
  return 48 <= e && e <= 57;
}
m(On, "isDecCode");
function In(e) {
  if (e === null) return false;
  var n = e.length, i = 0, l = false, r;
  if (!n) return false;
  if (r = e[i], (r === "-" || r === "+") && (r = e[++i]), r === "0") {
    if (i + 1 === n) return true;
    if (r = e[++i], r === "b") {
      for (i++; i < n; i++) if (r = e[i], r !== "_") {
        if (r !== "0" && r !== "1") return false;
        l = true;
      }
      return l && r !== "_";
    }
    if (r === "x") {
      for (i++; i < n; i++) if (r = e[i], r !== "_") {
        if (!bn(e.charCodeAt(i))) return false;
        l = true;
      }
      return l && r !== "_";
    }
    if (r === "o") {
      for (i++; i < n; i++) if (r = e[i], r !== "_") {
        if (!Tn(e.charCodeAt(i))) return false;
        l = true;
      }
      return l && r !== "_";
    }
  }
  if (r === "_") return false;
  for (; i < n; i++) if (r = e[i], r !== "_") {
    if (!On(e.charCodeAt(i))) return false;
    l = true;
  }
  return !(!l || r === "_");
}
m(In, "resolveYamlInteger");
function Ln(e) {
  var n = e, i = 1, l;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), l = n[0], (l === "-" || l === "+") && (l === "-" && (i = -1), n = n.slice(1), l = n[0]), n === "0") return 0;
  if (l === "0") {
    if (n[1] === "b") return i * parseInt(n.slice(2), 2);
    if (n[1] === "x") return i * parseInt(n.slice(2), 16);
    if (n[1] === "o") return i * parseInt(n.slice(2), 8);
  }
  return i * parseInt(n, 10);
}
m(Ln, "constructYamlInteger");
function kn(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !C.isNegativeZero(e);
}
m(kn, "isInteger");
var Nn = new _("tag:yaml.org,2002:int", { kind: "scalar", resolve: In, construct: Ln, predicate: kn, represent: { binary: m(function(e) {
  return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
}, "binary"), octal: m(function(e) {
  return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
}, "octal"), decimal: m(function(e) {
  return e.toString(10);
}, "decimal"), hexadecimal: m(function(e) {
  return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
}, "hexadecimal") }, defaultStyle: "decimal", styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] } });
var Rn = new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function Dn(e) {
  return !(e === null || !Rn.test(e) || e[e.length - 1] === "_");
}
m(Dn, "resolveYamlFloat");
function Mn(e) {
  var n, i;
  return n = e.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
}
m(Mn, "constructYamlFloat");
var Yn = /^[-+]?[0-9]+e/;
function Bn(e, n) {
  var i;
  if (isNaN(e)) switch (n) {
    case "lowercase":
      return ".nan";
    case "uppercase":
      return ".NAN";
    case "camelcase":
      return ".NaN";
  }
  else if (Number.POSITIVE_INFINITY === e) switch (n) {
    case "lowercase":
      return ".inf";
    case "uppercase":
      return ".INF";
    case "camelcase":
      return ".Inf";
  }
  else if (Number.NEGATIVE_INFINITY === e) switch (n) {
    case "lowercase":
      return "-.inf";
    case "uppercase":
      return "-.INF";
    case "camelcase":
      return "-.Inf";
  }
  else if (C.isNegativeZero(e)) return "-0.0";
  return i = e.toString(10), Yn.test(i) ? i.replace("e", ".e") : i;
}
m(Bn, "representYamlFloat");
function Pn(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || C.isNegativeZero(e));
}
m(Pn, "isFloat");
var Hn = new _("tag:yaml.org,2002:float", { kind: "scalar", resolve: Dn, construct: Mn, predicate: Pn, represent: Bn, defaultStyle: "lowercase" });
var Ee = An.extend({ implicit: [_n, Fn, Nn, Hn] });
var jn = Ee;
var Se = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var Fe = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function Un(e) {
  return e === null ? false : Se.exec(e) !== null || Fe.exec(e) !== null;
}
m(Un, "resolveYamlTimestamp");
function Kn(e) {
  var n, i, l, r, u, o, f, a = 0, p = null, h, t, s;
  if (n = Se.exec(e), n === null && (n = Fe.exec(e)), n === null) throw new Error("Date resolve error");
  if (i = +n[1], l = +n[2] - 1, r = +n[3], !n[4]) return new Date(Date.UTC(i, l, r));
  if (u = +n[4], o = +n[5], f = +n[6], n[7]) {
    for (a = n[7].slice(0, 3); a.length < 3; ) a += "0";
    a = +a;
  }
  return n[9] && (h = +n[10], t = +(n[11] || 0), p = (h * 60 + t) * 6e4, n[9] === "-" && (p = -p)), s = new Date(Date.UTC(i, l, r, u, o, f, a)), p && s.setTime(s.getTime() - p), s;
}
m(Kn, "constructYamlTimestamp");
function qn(e) {
  return e.toISOString();
}
m(qn, "representYamlTimestamp");
var Gn = new _("tag:yaml.org,2002:timestamp", { kind: "scalar", resolve: Un, construct: Kn, instanceOf: Date, represent: qn });
function Wn(e) {
  return e === "<<" || e === null;
}
m(Wn, "resolveYamlMerge");
var $n = new _("tag:yaml.org,2002:merge", { kind: "scalar", resolve: Wn });
var ie = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Qn(e) {
  if (e === null) return false;
  var n, i, l = 0, r = e.length, u = ie;
  for (i = 0; i < r; i++) if (n = u.indexOf(e.charAt(i)), !(n > 64)) {
    if (n < 0) return false;
    l += 6;
  }
  return l % 8 === 0;
}
m(Qn, "resolveYamlBinary");
function Vn(e) {
  var n, i, l = e.replace(/[\r\n=]/g, ""), r = l.length, u = ie, o = 0, f = [];
  for (n = 0; n < r; n++) n % 4 === 0 && n && (f.push(o >> 16 & 255), f.push(o >> 8 & 255), f.push(o & 255)), o = o << 6 | u.indexOf(l.charAt(n));
  return i = r % 4 * 6, i === 0 ? (f.push(o >> 16 & 255), f.push(o >> 8 & 255), f.push(o & 255)) : i === 18 ? (f.push(o >> 10 & 255), f.push(o >> 2 & 255)) : i === 12 && f.push(o >> 4 & 255), new Uint8Array(f);
}
m(Vn, "constructYamlBinary");
function Xn(e) {
  var n = "", i = 0, l, r, u = e.length, o = ie;
  for (l = 0; l < u; l++) l % 3 === 0 && l && (n += o[i >> 18 & 63], n += o[i >> 12 & 63], n += o[i >> 6 & 63], n += o[i & 63]), i = (i << 8) + e[l];
  return r = u % 3, r === 0 ? (n += o[i >> 18 & 63], n += o[i >> 12 & 63], n += o[i >> 6 & 63], n += o[i & 63]) : r === 2 ? (n += o[i >> 10 & 63], n += o[i >> 4 & 63], n += o[i << 2 & 63], n += o[64]) : r === 1 && (n += o[i >> 2 & 63], n += o[i << 4 & 63], n += o[64], n += o[64]), n;
}
m(Xn, "representYamlBinary");
function Zn(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
m(Zn, "isBinary");
var zn = new _("tag:yaml.org,2002:binary", { kind: "scalar", resolve: Qn, construct: Vn, predicate: Zn, represent: Xn });
var Jn = Object.prototype.hasOwnProperty;
var ei = Object.prototype.toString;
function ni(e) {
  if (e === null) return true;
  var n = [], i, l, r, u, o, f = e;
  for (i = 0, l = f.length; i < l; i += 1) {
    if (r = f[i], o = false, ei.call(r) !== "[object Object]") return false;
    for (u in r) if (Jn.call(r, u)) if (!o) o = true;
    else return false;
    if (!o) return false;
    if (n.indexOf(u) === -1) n.push(u);
    else return false;
  }
  return true;
}
m(ni, "resolveYamlOmap");
function ii(e) {
  return e !== null ? e : [];
}
m(ii, "constructYamlOmap");
var ri = new _("tag:yaml.org,2002:omap", { kind: "sequence", resolve: ni, construct: ii });
var li = Object.prototype.toString;
function oi(e) {
  if (e === null) return true;
  var n, i, l, r, u, o = e;
  for (u = new Array(o.length), n = 0, i = o.length; n < i; n += 1) {
    if (l = o[n], li.call(l) !== "[object Object]" || (r = Object.keys(l), r.length !== 1)) return false;
    u[n] = [r[0], l[r[0]]];
  }
  return true;
}
m(oi, "resolveYamlPairs");
function ui(e) {
  if (e === null) return [];
  var n, i, l, r, u, o = e;
  for (u = new Array(o.length), n = 0, i = o.length; n < i; n += 1) l = o[n], r = Object.keys(l), u[n] = [r[0], l[r[0]]];
  return u;
}
m(ui, "constructYamlPairs");
var fi = new _("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: oi, construct: ui });
var ci = Object.prototype.hasOwnProperty;
function ai(e) {
  if (e === null) return true;
  var n, i = e;
  for (n in i) if (ci.call(i, n) && i[n] !== null) return false;
  return true;
}
m(ai, "resolveYamlSet");
function pi(e) {
  return e !== null ? e : {};
}
m(pi, "constructYamlSet");
var ti = new _("tag:yaml.org,2002:set", { kind: "mapping", resolve: ai, construct: pi });
var be = jn.extend({ implicit: [Gn, $n], explicit: [zn, ri, fi, ti] });
var I = Object.prototype.hasOwnProperty;
var U = 1;
var Te = 2;
var Oe = 3;
var K = 4;
var X = 1;
var hi = 2;
var ce = 3;
var di = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var si = /[\x85\u2028\u2029]/;
var mi = /[,\[\]\{\}]/;
var Ie = /^(?:!|!!|![a-z\-]+!)$/i;
var Le = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ae(e) {
  return Object.prototype.toString.call(e);
}
m(ae, "_class");
function b(e) {
  return e === 10 || e === 13;
}
m(b, "is_EOL");
function k(e) {
  return e === 9 || e === 32;
}
m(k, "is_WHITE_SPACE");
function S(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
m(S, "is_WS_OR_EOL");
function R(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
m(R, "is_FLOW_INDICATOR");
function xi(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
m(xi, "fromHexCode");
function gi(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
m(gi, "escapedHexLen");
function Ai(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
m(Ai, "fromDecimalCode");
function pe(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
m(pe, "simpleEscapeSequence");
function vi(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
}
m(vi, "charFromCodepoint");
function ke(e, n, i) {
  n === "__proto__" ? Object.defineProperty(e, n, { configurable: true, enumerable: true, writable: true, value: i }) : e[n] = i;
}
m(ke, "setProperty");
var Ne = new Array(256);
var Re = new Array(256);
for (L = 0; L < 256; L++) Ne[L] = pe(L) ? 1 : 0, Re[L] = pe(L);
var L;
function yi(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || be, this.onWarning = n.onWarning || null, this.legacy = n.legacy || false, this.json = n.json || false, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
m(yi, "State$1");
function De(e, n) {
  var i = { name: e.filename, buffer: e.input.slice(0, -1), position: e.position, line: e.line, column: e.position - e.lineStart };
  return i.snippet = cn(i), new E(n, i);
}
m(De, "generateError");
function d(e, n) {
  throw De(e, n);
}
m(d, "throwError");
function q(e, n) {
  e.onWarning && e.onWarning.call(null, De(e, n));
}
m(q, "throwWarning");
var te = { YAML: m(function(n, i, l) {
  var r, u, o;
  n.version !== null && d(n, "duplication of %YAML directive"), l.length !== 1 && d(n, "YAML directive accepts exactly one argument"), r = /^([0-9]+)\.([0-9]+)$/.exec(l[0]), r === null && d(n, "ill-formed argument of the YAML directive"), u = parseInt(r[1], 10), o = parseInt(r[2], 10), u !== 1 && d(n, "unacceptable YAML version of the document"), n.version = l[0], n.checkLineBreaks = o < 2, o !== 1 && o !== 2 && q(n, "unsupported YAML version of the document");
}, "handleYamlDirective"), TAG: m(function(n, i, l) {
  var r, u;
  l.length !== 2 && d(n, "TAG directive accepts exactly two arguments"), r = l[0], u = l[1], Ie.test(r) || d(n, "ill-formed tag handle (first argument) of the TAG directive"), I.call(n.tagMap, r) && d(n, 'there is a previously declared suffix for "' + r + '" tag handle'), Le.test(u) || d(n, "ill-formed tag prefix (second argument) of the TAG directive");
  try {
    u = decodeURIComponent(u);
  } catch {
    d(n, "tag prefix is malformed: " + u);
  }
  n.tagMap[r] = u;
}, "handleTagDirective") };
function O(e, n, i, l) {
  var r, u, o, f;
  if (n < i) {
    if (f = e.input.slice(n, i), l) for (r = 0, u = f.length; r < u; r += 1) o = f.charCodeAt(r), o === 9 || 32 <= o && o <= 1114111 || d(e, "expected valid JSON character");
    else di.test(f) && d(e, "the stream contains non-printable characters");
    e.result += f;
  }
}
m(O, "captureSegment");
function he(e, n, i, l) {
  var r, u, o, f;
  for (C.isObject(i) || d(e, "cannot merge mappings; the provided source object is unacceptable"), r = Object.keys(i), o = 0, f = r.length; o < f; o += 1) u = r[o], I.call(n, u) || (ke(n, u, i[u]), l[u] = true);
}
m(he, "mergeMappings");
function D(e, n, i, l, r, u, o, f, a) {
  var p, h;
  if (Array.isArray(r)) for (r = Array.prototype.slice.call(r), p = 0, h = r.length; p < h; p += 1) Array.isArray(r[p]) && d(e, "nested arrays are not supported inside keys"), typeof r == "object" && ae(r[p]) === "[object Object]" && (r[p] = "[object Object]");
  if (typeof r == "object" && ae(r) === "[object Object]" && (r = "[object Object]"), r = String(r), n === null && (n = {}), l === "tag:yaml.org,2002:merge") if (Array.isArray(u)) for (p = 0, h = u.length; p < h; p += 1) he(e, n, u[p], i);
  else he(e, n, u, i);
  else !e.json && !I.call(i, r) && I.call(n, r) && (e.line = o || e.line, e.lineStart = f || e.lineStart, e.position = a || e.position, d(e, "duplicated mapping key")), ke(n, r, u), delete i[r];
  return n;
}
m(D, "storeMappingPair");
function re(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : d(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
m(re, "readLineBreak");
function y(e, n, i) {
  for (var l = 0, r = e.input.charCodeAt(e.position); r !== 0; ) {
    for (; k(r); ) r === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), r = e.input.charCodeAt(++e.position);
    if (n && r === 35) do
      r = e.input.charCodeAt(++e.position);
    while (r !== 10 && r !== 13 && r !== 0);
    if (b(r)) for (re(e), r = e.input.charCodeAt(e.position), l++, e.lineIndent = 0; r === 32; ) e.lineIndent++, r = e.input.charCodeAt(++e.position);
    else break;
  }
  return i !== -1 && l !== 0 && e.lineIndent < i && q(e, "deficient indentation"), l;
}
m(y, "skipSeparationSpace");
function $(e) {
  var n = e.position, i;
  return i = e.input.charCodeAt(n), !!((i === 45 || i === 46) && i === e.input.charCodeAt(n + 1) && i === e.input.charCodeAt(n + 2) && (n += 3, i = e.input.charCodeAt(n), i === 0 || S(i)));
}
m($, "testDocumentSeparator");
function le(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += C.repeat(`
`, n - 1));
}
m(le, "writeFoldedLines");
function Ci(e, n, i) {
  var l, r, u, o, f, a, p, h, t = e.kind, s = e.result, m2;
  if (m2 = e.input.charCodeAt(e.position), S(m2) || R(m2) || m2 === 35 || m2 === 38 || m2 === 42 || m2 === 33 || m2 === 124 || m2 === 62 || m2 === 39 || m2 === 34 || m2 === 37 || m2 === 64 || m2 === 96 || (m2 === 63 || m2 === 45) && (r = e.input.charCodeAt(e.position + 1), S(r) || i && R(r))) return false;
  for (e.kind = "scalar", e.result = "", u = o = e.position, f = false; m2 !== 0; ) {
    if (m2 === 58) {
      if (r = e.input.charCodeAt(e.position + 1), S(r) || i && R(r)) break;
    } else if (m2 === 35) {
      if (l = e.input.charCodeAt(e.position - 1), S(l)) break;
    } else {
      if (e.position === e.lineStart && $(e) || i && R(m2)) break;
      if (b(m2)) if (a = e.line, p = e.lineStart, h = e.lineIndent, y(e, false, -1), e.lineIndent >= n) {
        f = true, m2 = e.input.charCodeAt(e.position);
        continue;
      } else {
        e.position = o, e.line = a, e.lineStart = p, e.lineIndent = h;
        break;
      }
    }
    f && (O(e, u, o, false), le(e, e.line - a), u = o = e.position, f = false), k(m2) || (o = e.position + 1), m2 = e.input.charCodeAt(++e.position);
  }
  return O(e, u, o, false), e.result ? true : (e.kind = t, e.result = s, false);
}
m(Ci, "readPlainScalar");
function _i(e, n) {
  var i, l, r;
  if (i = e.input.charCodeAt(e.position), i !== 39) return false;
  for (e.kind = "scalar", e.result = "", e.position++, l = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; ) if (i === 39) if (O(e, l, e.position, true), i = e.input.charCodeAt(++e.position), i === 39) l = e.position, e.position++, r = e.position;
  else return true;
  else b(i) ? (O(e, l, r, true), le(e, y(e, false, n)), l = r = e.position) : e.position === e.lineStart && $(e) ? d(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position);
  d(e, "unexpected end of the stream within a single quoted scalar");
}
m(_i, "readSingleQuotedScalar");
function wi(e, n) {
  var i, l, r, u, o, f;
  if (f = e.input.charCodeAt(e.position), f !== 34) return false;
  for (e.kind = "scalar", e.result = "", e.position++, i = l = e.position; (f = e.input.charCodeAt(e.position)) !== 0; ) {
    if (f === 34) return O(e, i, e.position, true), e.position++, true;
    if (f === 92) {
      if (O(e, i, e.position, true), f = e.input.charCodeAt(++e.position), b(f)) y(e, false, n);
      else if (f < 256 && Ne[f]) e.result += Re[f], e.position++;
      else if ((o = gi(f)) > 0) {
        for (r = o, u = 0; r > 0; r--) f = e.input.charCodeAt(++e.position), (o = xi(f)) >= 0 ? u = (u << 4) + o : d(e, "expected hexadecimal character");
        e.result += vi(u), e.position++;
      } else d(e, "unknown escape sequence");
      i = l = e.position;
    } else b(f) ? (O(e, i, l, true), le(e, y(e, false, n)), i = l = e.position) : e.position === e.lineStart && $(e) ? d(e, "unexpected end of the document within a double quoted scalar") : (e.position++, l = e.position);
  }
  d(e, "unexpected end of the stream within a double quoted scalar");
}
m(wi, "readDoubleQuotedScalar");
function Ei(e, n) {
  var i = true, l, r, u, o = e.tag, f, a = e.anchor, p, h, t, s, m2, x = /* @__PURE__ */ Object.create(null), A, v, F, g;
  if (g = e.input.charCodeAt(e.position), g === 91) h = 93, m2 = false, f = [];
  else if (g === 123) h = 125, m2 = true, f = {};
  else return false;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), g = e.input.charCodeAt(++e.position); g !== 0; ) {
    if (y(e, true, n), g = e.input.charCodeAt(e.position), g === h) return e.position++, e.tag = o, e.anchor = a, e.kind = m2 ? "mapping" : "sequence", e.result = f, true;
    i ? g === 44 && d(e, "expected the node content, but found ','") : d(e, "missed comma between flow collection entries"), v = A = F = null, t = s = false, g === 63 && (p = e.input.charCodeAt(e.position + 1), S(p) && (t = s = true, e.position++, y(e, true, n))), l = e.line, r = e.lineStart, u = e.position, M(e, n, U, false, true), v = e.tag, A = e.result, y(e, true, n), g = e.input.charCodeAt(e.position), (s || e.line === l) && g === 58 && (t = true, g = e.input.charCodeAt(++e.position), y(e, true, n), M(e, n, U, false, true), F = e.result), m2 ? D(e, f, x, v, A, F, l, r, u) : t ? f.push(D(e, null, x, v, A, F, l, r, u)) : f.push(A), y(e, true, n), g = e.input.charCodeAt(e.position), g === 44 ? (i = true, g = e.input.charCodeAt(++e.position)) : i = false;
  }
  d(e, "unexpected end of the stream within a flow collection");
}
m(Ei, "readFlowCollection");
function Si(e, n) {
  var i, l, r = X, u = false, o = false, f = n, a = 0, p = false, h, t;
  if (t = e.input.charCodeAt(e.position), t === 124) l = false;
  else if (t === 62) l = true;
  else return false;
  for (e.kind = "scalar", e.result = ""; t !== 0; ) if (t = e.input.charCodeAt(++e.position), t === 43 || t === 45) X === r ? r = t === 43 ? ce : hi : d(e, "repeat of a chomping mode identifier");
  else if ((h = Ai(t)) >= 0) h === 0 ? d(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? d(e, "repeat of an indentation width identifier") : (f = n + h - 1, o = true);
  else break;
  if (k(t)) {
    do
      t = e.input.charCodeAt(++e.position);
    while (k(t));
    if (t === 35) do
      t = e.input.charCodeAt(++e.position);
    while (!b(t) && t !== 0);
  }
  for (; t !== 0; ) {
    for (re(e), e.lineIndent = 0, t = e.input.charCodeAt(e.position); (!o || e.lineIndent < f) && t === 32; ) e.lineIndent++, t = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > f && (f = e.lineIndent), b(t)) {
      a++;
      continue;
    }
    if (e.lineIndent < f) {
      r === ce ? e.result += C.repeat(`
`, u ? 1 + a : a) : r === X && u && (e.result += `
`);
      break;
    }
    for (l ? k(t) ? (p = true, e.result += C.repeat(`
`, u ? 1 + a : a)) : p ? (p = false, e.result += C.repeat(`
`, a + 1)) : a === 0 ? u && (e.result += " ") : e.result += C.repeat(`
`, a) : e.result += C.repeat(`
`, u ? 1 + a : a), u = true, o = true, a = 0, i = e.position; !b(t) && t !== 0; ) t = e.input.charCodeAt(++e.position);
    O(e, i, e.position, false);
  }
  return true;
}
m(Si, "readBlockScalar");
function de(e, n) {
  var i, l = e.tag, r = e.anchor, u = [], o, f = false, a;
  if (e.firstTabInLine !== -1) return false;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), a = e.input.charCodeAt(e.position); a !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), !(a !== 45 || (o = e.input.charCodeAt(e.position + 1), !S(o)))); ) {
    if (f = true, e.position++, y(e, true, -1) && e.lineIndent <= n) {
      u.push(null), a = e.input.charCodeAt(e.position);
      continue;
    }
    if (i = e.line, M(e, n, Oe, false, true), u.push(e.result), y(e, true, -1), a = e.input.charCodeAt(e.position), (e.line === i || e.lineIndent > n) && a !== 0) d(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n) break;
  }
  return f ? (e.tag = l, e.anchor = r, e.kind = "sequence", e.result = u, true) : false;
}
m(de, "readBlockSequence");
function Fi(e, n, i) {
  var l, r, u, o, f, a, p = e.tag, h = e.anchor, t = {}, s = /* @__PURE__ */ Object.create(null), m2 = null, x = null, A = null, v = false, F = false, g;
  if (e.firstTabInLine !== -1) return false;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = t), g = e.input.charCodeAt(e.position); g !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, d(e, "tab characters must not be used in indentation")), l = e.input.charCodeAt(e.position + 1), u = e.line, (g === 63 || g === 58) && S(l)) g === 63 ? (v && (D(e, t, s, m2, x, null, o, f, a), m2 = x = A = null), F = true, v = true, r = true) : v ? (v = false, r = true) : d(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, g = l;
    else {
      if (o = e.line, f = e.lineStart, a = e.position, !M(e, i, Te, false, true)) break;
      if (e.line === u) {
        for (g = e.input.charCodeAt(e.position); k(g); ) g = e.input.charCodeAt(++e.position);
        if (g === 58) g = e.input.charCodeAt(++e.position), S(g) || d(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (D(e, t, s, m2, x, null, o, f, a), m2 = x = A = null), F = true, v = false, r = false, m2 = e.tag, x = e.result;
        else if (F) d(e, "can not read an implicit mapping pair; a colon is missed");
        else return e.tag = p, e.anchor = h, true;
      } else if (F) d(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else return e.tag = p, e.anchor = h, true;
    }
    if ((e.line === u || e.lineIndent > n) && (v && (o = e.line, f = e.lineStart, a = e.position), M(e, n, K, true, r) && (v ? x = e.result : A = e.result), v || (D(e, t, s, m2, x, A, o, f, a), m2 = x = A = null), y(e, true, -1), g = e.input.charCodeAt(e.position)), (e.line === u || e.lineIndent > n) && g !== 0) d(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n) break;
  }
  return v && D(e, t, s, m2, x, null, o, f, a), F && (e.tag = p, e.anchor = h, e.kind = "mapping", e.result = t), F;
}
m(Fi, "readBlockMapping");
function bi(e) {
  var n, i = false, l = false, r, u, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return false;
  if (e.tag !== null && d(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (i = true, o = e.input.charCodeAt(++e.position)) : o === 33 ? (l = true, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!", n = e.position, i) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (u = e.input.slice(n, e.position), o = e.input.charCodeAt(++e.position)) : d(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !S(o); ) o === 33 && (l ? d(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(n - 1, e.position + 1), Ie.test(r) || d(e, "named tag handle cannot contain such characters"), l = true, n = e.position + 1)), o = e.input.charCodeAt(++e.position);
    u = e.input.slice(n, e.position), mi.test(u) && d(e, "tag suffix cannot contain flow indicator characters");
  }
  u && !Le.test(u) && d(e, "tag name cannot contain such characters: " + u);
  try {
    u = decodeURIComponent(u);
  } catch {
    d(e, "tag name is malformed: " + u);
  }
  return i ? e.tag = u : I.call(e.tagMap, r) ? e.tag = e.tagMap[r] + u : r === "!" ? e.tag = "!" + u : r === "!!" ? e.tag = "tag:yaml.org,2002:" + u : d(e, 'undeclared tag handle "' + r + '"'), true;
}
m(bi, "readTagProperty");
function Ti(e) {
  var n, i;
  if (i = e.input.charCodeAt(e.position), i !== 38) return false;
  for (e.anchor !== null && d(e, "duplication of an anchor property"), i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !S(i) && !R(i); ) i = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), true;
}
m(Ti, "readAnchorProperty");
function Oi(e) {
  var n, i, l;
  if (l = e.input.charCodeAt(e.position), l !== 42) return false;
  for (l = e.input.charCodeAt(++e.position), n = e.position; l !== 0 && !S(l) && !R(l); ) l = e.input.charCodeAt(++e.position);
  return e.position === n && d(e, "name of an alias node must contain at least one character"), i = e.input.slice(n, e.position), I.call(e.anchorMap, i) || d(e, 'unidentified alias "' + i + '"'), e.result = e.anchorMap[i], y(e, true, -1), true;
}
m(Oi, "readAlias");
function M(e, n, i, l, r) {
  var u, o, f, a = 1, p = false, h = false, t, s, m2, x, A, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, u = o = f = K === i || Oe === i, l && y(e, true, -1) && (p = true, e.lineIndent > n ? a = 1 : e.lineIndent === n ? a = 0 : e.lineIndent < n && (a = -1)), a === 1) for (; bi(e) || Ti(e); ) y(e, true, -1) ? (p = true, f = u, e.lineIndent > n ? a = 1 : e.lineIndent === n ? a = 0 : e.lineIndent < n && (a = -1)) : f = false;
  if (f && (f = p || r), (a === 1 || K === i) && (U === i || Te === i ? A = n : A = n + 1, v = e.position - e.lineStart, a === 1 ? f && (de(e, v) || Fi(e, v, A)) || Ei(e, A) ? h = true : (o && Si(e, A) || _i(e, A) || wi(e, A) ? h = true : Oi(e) ? (h = true, (e.tag !== null || e.anchor !== null) && d(e, "alias node should not have any properties")) : Ci(e, A, U === i) && (h = true, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : a === 0 && (h = f && de(e, v))), e.tag === null) e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && d(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), t = 0, s = e.implicitTypes.length; t < s; t += 1) if (x = e.implicitTypes[t], x.resolve(e.result)) {
      e.result = x.construct(e.result), e.tag = x.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
      break;
    }
  } else if (e.tag !== "!") {
    if (I.call(e.typeMap[e.kind || "fallback"], e.tag)) x = e.typeMap[e.kind || "fallback"][e.tag];
    else for (x = null, m2 = e.typeMap.multi[e.kind || "fallback"], t = 0, s = m2.length; t < s; t += 1) if (e.tag.slice(0, m2[t].tag.length) === m2[t].tag) {
      x = m2[t];
      break;
    }
    x || d(e, "unknown tag !<" + e.tag + ">"), e.result !== null && x.kind !== e.kind && d(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + x.kind + '", not "' + e.kind + '"'), x.resolve(e.result, e.tag) ? (e.result = x.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : d(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || h;
}
m(M, "composeNode");
function Ii(e) {
  var n = e.position, i, l, r, u = false, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (y(e, true, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (u = true, o = e.input.charCodeAt(++e.position), i = e.position; o !== 0 && !S(o); ) o = e.input.charCodeAt(++e.position);
    for (l = e.input.slice(i, e.position), r = [], l.length < 1 && d(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; k(o); ) o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !b(o));
        break;
      }
      if (b(o)) break;
      for (i = e.position; o !== 0 && !S(o); ) o = e.input.charCodeAt(++e.position);
      r.push(e.input.slice(i, e.position));
    }
    o !== 0 && re(e), I.call(te, l) ? te[l](e, l, r) : q(e, 'unknown document directive "' + l + '"');
  }
  if (y(e, true, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, y(e, true, -1)) : u && d(e, "directives end mark is expected"), M(e, e.lineIndent - 1, K, false, true), y(e, true, -1), e.checkLineBreaks && si.test(e.input.slice(n, e.position)) && q(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && $(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, y(e, true, -1));
    return;
  }
  if (e.position < e.length - 1) d(e, "end of the stream or a document separator is expected");
  else return;
}
m(Ii, "readDocument");
function Me(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var i = new yi(e, n), l = e.indexOf("\0");
  for (l !== -1 && (i.position = l, d(i, "null byte is not allowed in input")), i.input += "\0"; i.input.charCodeAt(i.position) === 32; ) i.lineIndent += 1, i.position += 1;
  for (; i.position < i.length - 1; ) Ii(i);
  return i.documents;
}
m(Me, "loadDocuments");
function Li(e, n, i) {
  n !== null && typeof n == "object" && typeof i > "u" && (i = n, n = null);
  var l = Me(e, i);
  if (typeof n != "function") return l;
  for (var r = 0, u = l.length; r < u; r += 1) n(l[r]);
}
m(Li, "loadAll$1");
function ki(e, n) {
  var i = Me(e, n);
  if (i.length !== 0) {
    if (i.length === 1) return i[0];
    throw new E("expected a single document in the stream, but found more");
  }
}
m(ki, "load$1");
var Ni = Li;
var Ri = ki;
var Ye = { loadAll: Ni, load: Ri };
var Be = Object.prototype.toString;
var Pe = Object.prototype.hasOwnProperty;
var oe = 65279;
var Di = 9;
var P = 10;
var Mi = 13;
var Yi = 32;
var Bi = 33;
var Pi = 34;
var z = 35;
var Hi = 37;
var ji = 38;
var Ui = 39;
var Ki = 42;
var He = 44;
var qi = 45;
var G = 58;
var Gi = 61;
var Wi = 62;
var $i = 63;
var Qi = 64;
var je = 91;
var Ue = 93;
var Vi = 96;
var Ke = 123;
var Xi = 124;
var qe = 125;
var w = {};
w[0] = "\\0";
w[7] = "\\a";
w[8] = "\\b";
w[9] = "\\t";
w[10] = "\\n";
w[11] = "\\v";
w[12] = "\\f";
w[13] = "\\r";
w[27] = "\\e";
w[34] = '\\"';
w[92] = "\\\\";
w[133] = "\\N";
w[160] = "\\_";
w[8232] = "\\L";
w[8233] = "\\P";
var Zi = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"];
var zi = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Ji(e, n) {
  var i, l, r, u, o, f, a;
  if (n === null) return {};
  for (i = {}, l = Object.keys(n), r = 0, u = l.length; r < u; r += 1) o = l[r], f = String(n[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), a = e.compiledTypeMap.fallback[o], a && Pe.call(a.styleAliases, f) && (f = a.styleAliases[f]), i[o] = f;
  return i;
}
m(Ji, "compileStyleMap");
function er(e) {
  var n, i, l;
  if (n = e.toString(16).toUpperCase(), e <= 255) i = "x", l = 2;
  else if (e <= 65535) i = "u", l = 4;
  else if (e <= 4294967295) i = "U", l = 8;
  else throw new E("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + i + C.repeat("0", l - n.length) + n;
}
m(er, "encodeHex");
var nr = 1;
var H = 2;
function ir(e) {
  this.schema = e.schema || be, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || false, this.skipInvalid = e.skipInvalid || false, this.flowLevel = C.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Ji(this.schema, e.styles || null), this.sortKeys = e.sortKeys || false, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || false, this.noCompatMode = e.noCompatMode || false, this.condenseFlow = e.condenseFlow || false, this.quotingType = e.quotingType === '"' ? H : nr, this.forceQuotes = e.forceQuotes || false, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
m(ir, "State");
function se(e, n) {
  for (var i = C.repeat(" ", n), l = 0, r = -1, u = "", o, f = e.length; l < f; ) r = e.indexOf(`
`, l), r === -1 ? (o = e.slice(l), l = f) : (o = e.slice(l, r + 1), l = r + 1), o.length && o !== `
` && (u += i), u += o;
  return u;
}
m(se, "indentString");
function J(e, n) {
  return `
` + C.repeat(" ", e.indent * n);
}
m(J, "generateNextLine");
function rr(e, n) {
  var i, l, r;
  for (i = 0, l = e.implicitTypes.length; i < l; i += 1) if (r = e.implicitTypes[i], r.resolve(n)) return true;
  return false;
}
m(rr, "testImplicitResolving");
function W(e) {
  return e === Yi || e === Di;
}
m(W, "isWhitespace");
function j(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== oe || 65536 <= e && e <= 1114111;
}
m(j, "isPrintable");
function me(e) {
  return j(e) && e !== oe && e !== Mi && e !== P;
}
m(me, "isNsCharOrWhitespace");
function xe(e, n, i) {
  var l = me(e), r = l && !W(e);
  return (i ? l : l && e !== He && e !== je && e !== Ue && e !== Ke && e !== qe) && e !== z && !(n === G && !r) || me(n) && !W(n) && e === z || n === G && r;
}
m(xe, "isPlainSafe");
function lr(e) {
  return j(e) && e !== oe && !W(e) && e !== qi && e !== $i && e !== G && e !== He && e !== je && e !== Ue && e !== Ke && e !== qe && e !== z && e !== ji && e !== Ki && e !== Bi && e !== Xi && e !== Gi && e !== Wi && e !== Ui && e !== Pi && e !== Hi && e !== Qi && e !== Vi;
}
m(lr, "isPlainSafeFirst");
function or(e) {
  return !W(e) && e !== G;
}
m(or, "isPlainSafeLast");
function Y(e, n) {
  var i = e.charCodeAt(n), l;
  return i >= 55296 && i <= 56319 && n + 1 < e.length && (l = e.charCodeAt(n + 1), l >= 56320 && l <= 57343) ? (i - 55296) * 1024 + l - 56320 + 65536 : i;
}
m(Y, "codePointAt");
function Ge(e) {
  var n = /^\n* /;
  return n.test(e);
}
m(Ge, "needIndentIndicator");
var We = 1;
var ee = 2;
var $e = 3;
var Qe = 4;
var N = 5;
function ur(e, n, i, l, r, u, o, f) {
  var a, p = 0, h = null, t = false, s = false, m2 = l !== -1, x = -1, A = lr(Y(e, 0)) && or(Y(e, e.length - 1));
  if (n || o) for (a = 0; a < e.length; p >= 65536 ? a += 2 : a++) {
    if (p = Y(e, a), !j(p)) return N;
    A = A && xe(p, h, f), h = p;
  }
  else {
    for (a = 0; a < e.length; p >= 65536 ? a += 2 : a++) {
      if (p = Y(e, a), p === P) t = true, m2 && (s = s || a - x - 1 > l && e[x + 1] !== " ", x = a);
      else if (!j(p)) return N;
      A = A && xe(p, h, f), h = p;
    }
    s = s || m2 && a - x - 1 > l && e[x + 1] !== " ";
  }
  return !t && !s ? A && !o && !r(e) ? We : u === H ? N : ee : i > 9 && Ge(e) ? N : o ? u === H ? N : ee : s ? Qe : $e;
}
m(ur, "chooseScalarStyle");
function fr(e, n, i, l, r) {
  e.dump = function() {
    if (n.length === 0) return e.quotingType === H ? '""' : "''";
    if (!e.noCompatMode && (Zi.indexOf(n) !== -1 || zi.test(n))) return e.quotingType === H ? '"' + n + '"' : "'" + n + "'";
    var u = e.indent * Math.max(1, i), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - u), f = l || e.flowLevel > -1 && i >= e.flowLevel;
    function a(p) {
      return rr(e, p);
    }
    switch (m(a, "testAmbiguity"), ur(n, f, e.indent, o, a, e.quotingType, e.forceQuotes && !l, r)) {
      case We:
        return n;
      case ee:
        return "'" + n.replace(/'/g, "''") + "'";
      case $e:
        return "|" + ge(n, e.indent) + Ae(se(n, u));
      case Qe:
        return ">" + ge(n, e.indent) + Ae(se(cr(n, o), u));
      case N:
        return '"' + ar(n) + '"';
      default:
        throw new E("impossible error: invalid scalar style");
    }
  }();
}
m(fr, "writeScalar");
function ge(e, n) {
  var i = Ge(e) ? String(n) : "", l = e[e.length - 1] === `
`, r = l && (e[e.length - 2] === `
` || e === `
`), u = r ? "+" : l ? "" : "-";
  return i + u + `
`;
}
m(ge, "blockHeader");
function Ae(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
m(Ae, "dropEndingNewline");
function cr(e, n) {
  for (var i = /(\n+)([^\n]*)/g, l = function() {
    var p = e.indexOf(`
`);
    return p = p !== -1 ? p : e.length, i.lastIndex = p, ve(e.slice(0, p), n);
  }(), r = e[0] === `
` || e[0] === " ", u, o; o = i.exec(e); ) {
    var f = o[1], a = o[2];
    u = a[0] === " ", l += f + (!r && !u && a !== "" ? `
` : "") + ve(a, n), r = u;
  }
  return l;
}
m(cr, "foldString");
function ve(e, n) {
  if (e === "" || e[0] === " ") return e;
  for (var i = / [^ ]/g, l, r = 0, u, o = 0, f = 0, a = ""; l = i.exec(e); ) f = l.index, f - r > n && (u = o > r ? o : f, a += `
` + e.slice(r, u), r = u + 1), o = f;
  return a += `
`, e.length - r > n && o > r ? a += e.slice(r, o) + `
` + e.slice(o + 1) : a += e.slice(r), a.slice(1);
}
m(ve, "foldLine");
function ar(e) {
  for (var n = "", i = 0, l, r = 0; r < e.length; i >= 65536 ? r += 2 : r++) i = Y(e, r), l = w[i], !l && j(i) ? (n += e[r], i >= 65536 && (n += e[r + 1])) : n += l || er(i);
  return n;
}
m(ar, "escapeString");
function pr(e, n, i) {
  var l = "", r = e.tag, u, o, f;
  for (u = 0, o = i.length; u < o; u += 1) f = i[u], e.replacer && (f = e.replacer.call(i, String(u), f)), (T(e, n, f, false, false) || typeof f > "u" && T(e, n, null, false, false)) && (l !== "" && (l += "," + (e.condenseFlow ? "" : " ")), l += e.dump);
  e.tag = r, e.dump = "[" + l + "]";
}
m(pr, "writeFlowSequence");
function ye(e, n, i, l) {
  var r = "", u = e.tag, o, f, a;
  for (o = 0, f = i.length; o < f; o += 1) a = i[o], e.replacer && (a = e.replacer.call(i, String(o), a)), (T(e, n + 1, a, true, true, false, true) || typeof a > "u" && T(e, n + 1, null, true, true, false, true)) && ((!l || r !== "") && (r += J(e, n)), e.dump && P === e.dump.charCodeAt(0) ? r += "-" : r += "- ", r += e.dump);
  e.tag = u, e.dump = r || "[]";
}
m(ye, "writeBlockSequence");
function tr(e, n, i) {
  var l = "", r = e.tag, u = Object.keys(i), o, f, a, p, h;
  for (o = 0, f = u.length; o < f; o += 1) h = "", l !== "" && (h += ", "), e.condenseFlow && (h += '"'), a = u[o], p = i[a], e.replacer && (p = e.replacer.call(i, a, p)), T(e, n, a, false, false) && (e.dump.length > 1024 && (h += "? "), h += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), T(e, n, p, false, false) && (h += e.dump, l += h));
  e.tag = r, e.dump = "{" + l + "}";
}
m(tr, "writeFlowMapping");
function hr(e, n, i, l) {
  var r = "", u = e.tag, o = Object.keys(i), f, a, p, h, t, s;
  if (e.sortKeys === true) o.sort();
  else if (typeof e.sortKeys == "function") o.sort(e.sortKeys);
  else if (e.sortKeys) throw new E("sortKeys must be a boolean or a function");
  for (f = 0, a = o.length; f < a; f += 1) s = "", (!l || r !== "") && (s += J(e, n)), p = o[f], h = i[p], e.replacer && (h = e.replacer.call(i, p, h)), T(e, n + 1, p, true, true, true) && (t = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, t && (e.dump && P === e.dump.charCodeAt(0) ? s += "?" : s += "? "), s += e.dump, t && (s += J(e, n)), T(e, n + 1, h, true, t) && (e.dump && P === e.dump.charCodeAt(0) ? s += ":" : s += ": ", s += e.dump, r += s));
  e.tag = u, e.dump = r || "{}";
}
m(hr, "writeBlockMapping");
function Ce(e, n, i) {
  var l, r, u, o, f, a;
  for (r = i ? e.explicitTypes : e.implicitTypes, u = 0, o = r.length; u < o; u += 1) if (f = r[u], (f.instanceOf || f.predicate) && (!f.instanceOf || typeof n == "object" && n instanceof f.instanceOf) && (!f.predicate || f.predicate(n))) {
    if (i ? f.multi && f.representName ? e.tag = f.representName(n) : e.tag = f.tag : e.tag = "?", f.represent) {
      if (a = e.styleMap[f.tag] || f.defaultStyle, Be.call(f.represent) === "[object Function]") l = f.represent(n, a);
      else if (Pe.call(f.represent, a)) l = f.represent[a](n, a);
      else throw new E("!<" + f.tag + '> tag resolver accepts not "' + a + '" style');
      e.dump = l;
    }
    return true;
  }
  return false;
}
m(Ce, "detectType");
function T(e, n, i, l, r, u, o) {
  e.tag = null, e.dump = i, Ce(e, i, false) || Ce(e, i, true);
  var f = Be.call(e.dump), a = l, p;
  l && (l = e.flowLevel < 0 || e.flowLevel > n);
  var h = f === "[object Object]" || f === "[object Array]", t, s;
  if (h && (t = e.duplicates.indexOf(i), s = t !== -1), (e.tag !== null && e.tag !== "?" || s || e.indent !== 2 && n > 0) && (r = false), s && e.usedDuplicates[t]) e.dump = "*ref_" + t;
  else {
    if (h && s && !e.usedDuplicates[t] && (e.usedDuplicates[t] = true), f === "[object Object]") l && Object.keys(e.dump).length !== 0 ? (hr(e, n, e.dump, r), s && (e.dump = "&ref_" + t + e.dump)) : (tr(e, n, e.dump), s && (e.dump = "&ref_" + t + " " + e.dump));
    else if (f === "[object Array]") l && e.dump.length !== 0 ? (e.noArrayIndent && !o && n > 0 ? ye(e, n - 1, e.dump, r) : ye(e, n, e.dump, r), s && (e.dump = "&ref_" + t + e.dump)) : (pr(e, n, e.dump), s && (e.dump = "&ref_" + t + " " + e.dump));
    else if (f === "[object String]") e.tag !== "?" && fr(e, e.dump, n, u, a);
    else {
      if (f === "[object Undefined]") return false;
      if (e.skipInvalid) return false;
      throw new E("unacceptable kind of an object to dump " + f);
    }
    e.tag !== null && e.tag !== "?" && (p = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21"), e.tag[0] === "!" ? p = "!" + p : p.slice(0, 18) === "tag:yaml.org,2002:" ? p = "!!" + p.slice(18) : p = "!<" + p + ">", e.dump = p + " " + e.dump);
  }
  return true;
}
m(T, "writeNode");
function dr(e, n) {
  var i = [], l = [], r, u;
  for (ne(e, i, l), r = 0, u = l.length; r < u; r += 1) n.duplicates.push(i[l[r]]);
  n.usedDuplicates = new Array(u);
}
m(dr, "getDuplicateReferences");
function ne(e, n, i) {
  var l, r, u;
  if (e !== null && typeof e == "object") if (r = n.indexOf(e), r !== -1) i.indexOf(r) === -1 && i.push(r);
  else if (n.push(e), Array.isArray(e)) for (r = 0, u = e.length; r < u; r += 1) ne(e[r], n, i);
  else for (l = Object.keys(e), r = 0, u = l.length; r < u; r += 1) ne(e[l[r]], n, i);
}
m(ne, "inspectNode");
function sr(e, n) {
  n = n || {};
  var i = new ir(n);
  i.noRefs || dr(e, i);
  var l = e;
  return i.replacer && (l = i.replacer.call({ "": l }, "", l)), T(i, 0, l, true, true) ? i.dump + `
` : "";
}
m(sr, "dump$1");
var mr = sr;
var xr = { dump: mr };
function ue(e, n) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + n + " instead, which is now safe by default.");
  };
}
m(ue, "renamed");
var gr = Ee;
var Ar = Ye.load;
var vr = Ye.loadAll;
var yr = xr.dump;
var Cr = ue("safeLoad", "load");
var _r = ue("safeLoadAll", "loadAll");
var wr = ue("safeDump", "dump");

export {
  gr,
  Ar
};
/*! Bundled license information:

mermaid/dist/chunks/mermaid.esm.min/chunk-NN2NZ22Q.mjs:
  (*! Bundled license information:
  
  js-yaml/dist/js-yaml.mjs:
    (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
  *)
*/
//# sourceMappingURL=chunk-YYFVCIEQ.js.map

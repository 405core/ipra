import {
  Cn,
  Mn,
  _o,
  as,
  es,
  hs,
  ls,
  ns,
  os,
  qo,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  $c,
  He,
  ia
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/sankeyDiagram-L3NBLAOT.mjs
var lt = function() {
  var t = m(function(x, o, a, l) {
    for (a = a || {}, l = x.length; l--; a[x[l]] = o) ;
    return a;
  }, "o"), r = [1, 9], i = [1, 10], u = [1, 5, 10, 12], c = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, SANKEY: 4, NEWLINE: 5, csv: 6, opt_eof: 7, record: 8, csv_tail: 9, EOF: 10, "field[source]": 11, COMMA: 12, "field[target]": 13, "field[value]": 14, field: 15, escaped: 16, non_escaped: 17, DQUOTE: 18, ESCAPED_TEXT: 19, NON_ESCAPED_TEXT: 20, $accept: 0, $end: 1 }, terminals_: { 2: "error", 4: "SANKEY", 5: "NEWLINE", 10: "EOF", 11: "field[source]", 12: "COMMA", 13: "field[target]", 14: "field[value]", 18: "DQUOTE", 19: "ESCAPED_TEXT", 20: "NON_ESCAPED_TEXT" }, productions_: [0, [3, 4], [6, 2], [9, 2], [9, 0], [7, 1], [7, 0], [8, 5], [15, 1], [15, 1], [16, 3], [17, 1]], performAction: m(function(o, a, l, k, _, p, v) {
    var C = p.length - 1;
    switch (_) {
      case 7:
        let E = k.findOrCreateNode(p[C - 4].trim().replaceAll('""', '"')), M = k.findOrCreateNode(p[C - 2].trim().replaceAll('""', '"')), D = parseFloat(p[C].trim());
        k.addLink(E, M, D);
        break;
      case 8:
      case 9:
      case 11:
        this.$ = p[C];
        break;
      case 10:
        this.$ = p[C - 1];
        break;
    }
  }, "anonymous"), table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3] }, { 6: 4, 8: 5, 15: 6, 16: 7, 17: 8, 18: r, 20: i }, { 1: [2, 6], 7: 11, 10: [1, 12] }, t(i, [2, 4], { 9: 13, 5: [1, 14] }), { 12: [1, 15] }, t(u, [2, 8]), t(u, [2, 9]), { 19: [1, 16] }, t(u, [2, 11]), { 1: [2, 1] }, { 1: [2, 5] }, t(i, [2, 2]), { 6: 17, 8: 5, 15: 6, 16: 7, 17: 8, 18: r, 20: i }, { 15: 18, 16: 7, 17: 8, 18: r, 20: i }, { 18: [1, 19] }, t(i, [2, 3]), { 12: [1, 20] }, t(u, [2, 10]), { 15: 21, 16: 7, 17: 8, 18: r, 20: i }, t([1, 5, 10], [2, 7])], defaultActions: { 11: [2, 1], 12: [2, 5] }, parseError: m(function(o, a) {
    if (a.recoverable) this.trace(o);
    else {
      var l = new Error(o);
      throw l.hash = a, l;
    }
  }, "parseError"), parse: m(function(o) {
    var a = this, l = [0], k = [], _ = [null], p = [], v = this.table, C = "", E = 0, M = 0, D = 0, z = 2, B = 1, R = p.slice.call(arguments, 1), w = Object.create(this.lexer), N = { yy: {} };
    for (var P in this.yy) Object.prototype.hasOwnProperty.call(this.yy, P) && (N.yy[P] = this.yy[P]);
    w.setInput(o, N.yy), N.yy.lexer = w, N.yy.parser = this, typeof w.yylloc > "u" && (w.yylloc = {});
    var O = w.yylloc;
    p.push(O);
    var y = w.options && w.options.ranges;
    typeof N.yy.parseError == "function" ? this.parseError = N.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function T(L) {
      l.length = l.length - 2 * L, _.length = _.length - L, p.length = p.length - L;
    }
    m(T, "popStack");
    function st() {
      var L;
      return L = k.pop() || w.lex() || B, typeof L != "number" && (L instanceof Array && (k = L, L = k.pop()), L = a.symbols_[L] || L), L;
    }
    m(st, "lex");
    for (var A, Y, n, f, h, d, s = {}, g, b, $, I; ; ) {
      if (n = l[l.length - 1], this.defaultActions[n] ? f = this.defaultActions[n] : ((A === null || typeof A > "u") && (A = st()), f = v[n] && v[n][A]), typeof f > "u" || !f.length || !f[0]) {
        var j = "";
        I = [];
        for (g in v[n]) this.terminals_[g] && g > z && I.push("'" + this.terminals_[g] + "'");
        w.showPosition ? j = "Parse error on line " + (E + 1) + `:
` + w.showPosition() + `
Expecting ` + I.join(", ") + ", got '" + (this.terminals_[A] || A) + "'" : j = "Parse error on line " + (E + 1) + ": Unexpected " + (A == B ? "end of input" : "'" + (this.terminals_[A] || A) + "'"), this.parseError(j, { text: w.match, token: this.terminals_[A] || A, line: w.yylineno, loc: O, expected: I });
      }
      if (f[0] instanceof Array && f.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + n + ", token: " + A);
      switch (f[0]) {
        case 1:
          l.push(A), _.push(w.yytext), p.push(w.yylloc), l.push(f[1]), A = null, Y ? (A = Y, Y = null) : (M = w.yyleng, C = w.yytext, E = w.yylineno, O = w.yylloc, D > 0 && D--);
          break;
        case 2:
          if (b = this.productions_[f[1]][1], s.$ = _[_.length - b], s._$ = { first_line: p[p.length - (b || 1)].first_line, last_line: p[p.length - 1].last_line, first_column: p[p.length - (b || 1)].first_column, last_column: p[p.length - 1].last_column }, y && (s._$.range = [p[p.length - (b || 1)].range[0], p[p.length - 1].range[1]]), d = this.performAction.apply(s, [C, M, E, N.yy, f[1], _, p].concat(R)), typeof d < "u") return d;
          b && (l = l.slice(0, -1 * b * 2), _ = _.slice(0, -1 * b), p = p.slice(0, -1 * b)), l.push(this.productions_[f[1]][0]), _.push(s.$), p.push(s._$), $ = v[l[l.length - 2]][l[l.length - 1]], l.push($);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, S = function() {
    var x = { EOF: 1, parseError: m(function(a, l) {
      if (this.yy.parser) this.yy.parser.parseError(a, l);
      else throw new Error(a);
    }, "parseError"), setInput: m(function(o, a) {
      return this.yy = a || this.yy || {}, this._input = o, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var o = this._input[0];
      this.yytext += o, this.yyleng++, this.offset++, this.match += o, this.matched += o;
      var a = o.match(/(?:\r\n?|\n).*/g);
      return a ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), o;
    }, "input"), unput: m(function(o) {
      var a = o.length, l = o.split(/(?:\r\n?|\n)/g);
      this._input = o + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - a), this.offset -= a;
      var k = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), l.length - 1 && (this.yylineno -= l.length - 1);
      var _ = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: l ? (l.length === k.length ? this.yylloc.first_column : 0) + k[k.length - l.length].length - l[0].length : this.yylloc.first_column - a }, this.options.ranges && (this.yylloc.range = [_[0], _[0] + this.yyleng - a]), this.yyleng = this.yytext.length, this;
    }, "unput"), more: m(function() {
      return this._more = true, this;
    }, "more"), reject: m(function() {
      if (this.options.backtrack_lexer) this._backtrack = true;
      else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
      return this;
    }, "reject"), less: m(function(o) {
      this.unput(this.match.slice(o));
    }, "less"), pastInput: m(function() {
      var o = this.matched.substr(0, this.matched.length - this.match.length);
      return (o.length > 20 ? "..." : "") + o.substr(-20).replace(/\n/g, "");
    }, "pastInput"), upcomingInput: m(function() {
      var o = this.match;
      return o.length < 20 && (o += this._input.substr(0, 20 - o.length)), (o.substr(0, 20) + (o.length > 20 ? "..." : "")).replace(/\n/g, "");
    }, "upcomingInput"), showPosition: m(function() {
      var o = this.pastInput(), a = new Array(o.length + 1).join("-");
      return o + this.upcomingInput() + `
` + a + "^";
    }, "showPosition"), test_match: m(function(o, a) {
      var l, k, _;
      if (this.options.backtrack_lexer && (_ = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (_.yylloc.range = this.yylloc.range.slice(0))), k = o[0].match(/(?:\r\n?|\n).*/g), k && (this.yylineno += k.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: k ? k[k.length - 1].length - k[k.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + o[0].length }, this.yytext += o[0], this.match += o[0], this.matches = o, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(o[0].length), this.matched += o[0], l = this.performAction.call(this, this.yy, this, a, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), l) return l;
      if (this._backtrack) {
        for (var p in _) this[p] = _[p];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var o, a, l, k;
      this._more || (this.yytext = "", this.match = "");
      for (var _ = this._currentRules(), p = 0; p < _.length; p++) if (l = this._input.match(this.rules[_[p]]), l && (!a || l[0].length > a[0].length)) {
        if (a = l, k = p, this.options.backtrack_lexer) {
          if (o = this.test_match(l, _[p]), o !== false) return o;
          if (this._backtrack) {
            a = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return a ? (o = this.test_match(a, _[k]), o !== false ? o : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var a = this.next();
      return a || this.lex();
    }, "lex"), begin: m(function(a) {
      this.conditionStack.push(a);
    }, "begin"), popState: m(function() {
      var a = this.conditionStack.length - 1;
      return a > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(a) {
      return a = this.conditionStack.length - 1 - Math.abs(a || 0), a >= 0 ? this.conditionStack[a] : "INITIAL";
    }, "topState"), pushState: m(function(a) {
      this.begin(a);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(a, l, k, _) {
      var p = _;
      switch (k) {
        case 0:
          return this.pushState("csv"), 4;
          break;
        case 1:
          return this.pushState("csv"), 4;
          break;
        case 2:
          return 10;
        case 3:
          return 5;
        case 4:
          return 12;
        case 5:
          return this.pushState("escaped_text"), 18;
          break;
        case 6:
          return 20;
        case 7:
          return this.popState("escaped_text"), 18;
          break;
        case 8:
          return 19;
      }
    }, "anonymous"), rules: [/^(?:sankey-beta\b)/i, /^(?:sankey\b)/i, /^(?:$)/i, /^(?:((\u000D\u000A)|(\u000A)))/i, /^(?:(\u002C))/i, /^(?:(\u0022))/i, /^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i, /^(?:(\u0022)(?!(\u0022)))/i, /^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i], conditions: { csv: { rules: [2, 3, 4, 5, 6, 7, 8], inclusive: false }, escaped_text: { rules: [7, 8], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8], inclusive: true } } };
    return x;
  }();
  c.lexer = S;
  function m2() {
    this.yy = {};
  }
  return m(m2, "Parser"), m2.prototype = c, c.Parser = m2, new m2();
}();
lt.parser = lt;
var G = lt;
var tt = [];
var et = [];
var Z = /* @__PURE__ */ new Map();
var Ht = m(() => {
  tt = [], et = [], Z = /* @__PURE__ */ new Map(), os();
}, "clear");
var _a;
var ut = (_a = class {
  constructor(r, i, u = 0) {
    this.source = r;
    this.target = i;
    this.value = u;
  }
}, m(_a, "SankeyLink"), _a);
var Yt = m((t, r, i) => {
  tt.push(new ut(t, r, i));
}, "addLink");
var _a2;
var ft = (_a2 = class {
  constructor(r) {
    this.ID = r;
  }
}, m(_a2, "SankeyNode"), _a2);
var qt = m((t) => {
  t = Cn.sanitizeText(t, qo());
  let r = Z.get(t);
  return r === void 0 && (r = new ft(t), Z.set(t, r), et.push(r)), r;
}, "findOrCreateNode");
var Ut = m(() => et, "getNodes");
var Xt = m(() => tt, "getLinks");
var Gt = m(() => ({ nodes: et.map((t) => ({ id: t.ID })), links: tt.map((t) => ({ source: t.source.ID, target: t.target.ID, value: t.value })) }), "getGraph");
var Ot = { nodesMap: Z, getConfig: m(() => qo().sankey, "getConfig"), getNodes: Ut, getLinks: Xt, getGraph: Gt, addLink: Yt, findOrCreateNode: qt, getAccTitle: ss, setAccTitle: es, getAccDescription: ls, setAccDescription: as, getDiagramTitle: ns, setDiagramTitle: hs, clear: Ht };
function J(t, r) {
  let i;
  if (r === void 0) for (let u of t) u != null && (i < u || i === void 0 && u >= u) && (i = u);
  else {
    let u = -1;
    for (let c of t) (c = r(c, ++u, t)) != null && (i < c || i === void 0 && c >= c) && (i = c);
  }
  return i;
}
m(J, "max");
function F(t, r) {
  let i;
  if (r === void 0) for (let u of t) u != null && (i > u || i === void 0 && u >= u) && (i = u);
  else {
    let u = -1;
    for (let c of t) (c = r(c, ++u, t)) != null && (i > c || i === void 0 && c >= c) && (i = c);
  }
  return i;
}
m(F, "min");
function W(t, r) {
  let i = 0;
  if (r === void 0) for (let u of t) (u = +u) && (i += u);
  else {
    let u = -1;
    for (let c of t) (c = +r(c, ++u, t)) && (i += c);
  }
  return i;
}
m(W, "sum");
function Jt(t) {
  return t.target.depth;
}
m(Jt, "targetDepth");
function ct(t) {
  return t.depth;
}
m(ct, "left");
function ht(t, r) {
  return r - 1 - t.height;
}
m(ht, "right");
function Q(t, r) {
  return t.sourceLinks.length ? t.depth : r - 1;
}
m(Q, "justify");
function dt(t) {
  return t.targetLinks.length ? t.depth : t.sourceLinks.length ? F(t.sourceLinks, Jt) - 1 : 0;
}
m(dt, "center");
function H(t) {
  return function() {
    return t;
  };
}
m(H, "constant");
function It(t, r) {
  return nt(t.source, r.source) || t.index - r.index;
}
m(It, "ascendingSourceBreadth");
function Dt(t, r) {
  return nt(t.target, r.target) || t.index - r.index;
}
m(Dt, "ascendingTargetBreadth");
function nt(t, r) {
  return t.y0 - r.y0;
}
m(nt, "ascendingBreadth");
function pt(t) {
  return t.value;
}
m(pt, "value");
function Qt(t) {
  return t.index;
}
m(Qt, "defaultId");
function Kt(t) {
  return t.nodes;
}
m(Kt, "defaultNodes");
function Zt(t) {
  return t.links;
}
m(Zt, "defaultLinks");
function Pt(t, r) {
  let i = t.get(r);
  if (!i) throw new Error("missing: " + r);
  return i;
}
m(Pt, "find");
function Rt({ nodes: t }) {
  for (let r of t) {
    let i = r.y0, u = i;
    for (let c of r.sourceLinks) c.y0 = i + c.width / 2, i += c.width;
    for (let c of r.targetLinks) c.y1 = u + c.width / 2, u += c.width;
  }
}
m(Rt, "computeLinkBreadths");
function rt() {
  let t = 0, r = 0, i = 1, u = 1, c = 24, S = 8, m2, x = Qt, o = Q, a, l, k = Kt, _ = Zt, p = 6;
  function v() {
    let n = { nodes: k.apply(null, arguments), links: _.apply(null, arguments) };
    return C(n), E(n), M(n), D(n), R(n), Rt(n), n;
  }
  m(v, "sankey"), v.update = function(n) {
    return Rt(n), n;
  }, v.nodeId = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : H(n), v) : x;
  }, v.nodeAlign = function(n) {
    return arguments.length ? (o = typeof n == "function" ? n : H(n), v) : o;
  }, v.nodeSort = function(n) {
    return arguments.length ? (a = n, v) : a;
  }, v.nodeWidth = function(n) {
    return arguments.length ? (c = +n, v) : c;
  }, v.nodePadding = function(n) {
    return arguments.length ? (S = m2 = +n, v) : S;
  }, v.nodes = function(n) {
    return arguments.length ? (k = typeof n == "function" ? n : H(n), v) : k;
  }, v.links = function(n) {
    return arguments.length ? (_ = typeof n == "function" ? n : H(n), v) : _;
  }, v.linkSort = function(n) {
    return arguments.length ? (l = n, v) : l;
  }, v.size = function(n) {
    return arguments.length ? (t = r = 0, i = +n[0], u = +n[1], v) : [i - t, u - r];
  }, v.extent = function(n) {
    return arguments.length ? (t = +n[0][0], i = +n[1][0], r = +n[0][1], u = +n[1][1], v) : [[t, r], [i, u]];
  }, v.iterations = function(n) {
    return arguments.length ? (p = +n, v) : p;
  };
  function C({ nodes: n, links: f }) {
    for (let [d, s] of n.entries()) s.index = d, s.sourceLinks = [], s.targetLinks = [];
    let h = new Map(n.map((d, s) => [x(d, s, n), d]));
    for (let [d, s] of f.entries()) {
      s.index = d;
      let { source: g, target: b } = s;
      typeof g != "object" && (g = s.source = Pt(h, g)), typeof b != "object" && (b = s.target = Pt(h, b)), g.sourceLinks.push(s), b.targetLinks.push(s);
    }
    if (l != null) for (let { sourceLinks: d, targetLinks: s } of n) d.sort(l), s.sort(l);
  }
  m(C, "computeNodeLinks");
  function E({ nodes: n }) {
    for (let f of n) f.value = f.fixedValue === void 0 ? Math.max(W(f.sourceLinks, pt), W(f.targetLinks, pt)) : f.fixedValue;
  }
  m(E, "computeNodeValues");
  function M({ nodes: n }) {
    let f = n.length, h = new Set(n), d = /* @__PURE__ */ new Set(), s = 0;
    for (; h.size; ) {
      for (let g of h) {
        g.depth = s;
        for (let { target: b } of g.sourceLinks) d.add(b);
      }
      if (++s > f) throw new Error("circular link");
      h = d, d = /* @__PURE__ */ new Set();
    }
  }
  m(M, "computeNodeDepths");
  function D({ nodes: n }) {
    let f = n.length, h = new Set(n), d = /* @__PURE__ */ new Set(), s = 0;
    for (; h.size; ) {
      for (let g of h) {
        g.height = s;
        for (let { source: b } of g.targetLinks) d.add(b);
      }
      if (++s > f) throw new Error("circular link");
      h = d, d = /* @__PURE__ */ new Set();
    }
  }
  m(D, "computeNodeHeights");
  function z({ nodes: n }) {
    let f = J(n, (s) => s.depth) + 1, h = (i - t - c) / (f - 1), d = new Array(f);
    for (let s of n) {
      let g = Math.max(0, Math.min(f - 1, Math.floor(o.call(null, s, f))));
      s.layer = g, s.x0 = t + g * h, s.x1 = s.x0 + c, d[g] ? d[g].push(s) : d[g] = [s];
    }
    if (a) for (let s of d) s.sort(a);
    return d;
  }
  m(z, "computeNodeLayers");
  function B(n) {
    let f = F(n, (h) => (u - r - (h.length - 1) * m2) / W(h, pt));
    for (let h of n) {
      let d = r;
      for (let s of h) {
        s.y0 = d, s.y1 = d + s.value * f, d = s.y1 + m2;
        for (let g of s.sourceLinks) g.width = g.value * f;
      }
      d = (u - d + m2) / (h.length + 1);
      for (let s = 0; s < h.length; ++s) {
        let g = h[s];
        g.y0 += d * (s + 1), g.y1 += d * (s + 1);
      }
      st(h);
    }
  }
  m(B, "initializeNodeBreadths");
  function R(n) {
    let f = z(n);
    m2 = Math.min(S, (u - r) / (J(f, (h) => h.length) - 1)), B(f);
    for (let h = 0; h < p; ++h) {
      let d = Math.pow(0.99, h), s = Math.max(1 - d, (h + 1) / p);
      N(f, d, s), w(f, d, s);
    }
  }
  m(R, "computeNodeBreadths");
  function w(n, f, h) {
    for (let d = 1, s = n.length; d < s; ++d) {
      let g = n[d];
      for (let b of g) {
        let $ = 0, I = 0;
        for (let { source: L, value: at } of b.targetLinks) {
          let q = at * (b.layer - L.layer);
          $ += A(L, b) * q, I += q;
        }
        if (!(I > 0)) continue;
        let j = ($ / I - b.y0) * f;
        b.y0 += j, b.y1 += j, T(b);
      }
      a === void 0 && g.sort(nt), P(g, h);
    }
  }
  m(w, "relaxLeftToRight");
  function N(n, f, h) {
    for (let d = n.length, s = d - 2; s >= 0; --s) {
      let g = n[s];
      for (let b of g) {
        let $ = 0, I = 0;
        for (let { target: L, value: at } of b.sourceLinks) {
          let q = at * (L.layer - b.layer);
          $ += Y(b, L) * q, I += q;
        }
        if (!(I > 0)) continue;
        let j = ($ / I - b.y0) * f;
        b.y0 += j, b.y1 += j, T(b);
      }
      a === void 0 && g.sort(nt), P(g, h);
    }
  }
  m(N, "relaxRightToLeft");
  function P(n, f) {
    let h = n.length >> 1, d = n[h];
    y(n, d.y0 - m2, h - 1, f), O(n, d.y1 + m2, h + 1, f), y(n, u, n.length - 1, f), O(n, r, 0, f);
  }
  m(P, "resolveCollisions");
  function O(n, f, h, d) {
    for (; h < n.length; ++h) {
      let s = n[h], g = (f - s.y0) * d;
      g > 1e-6 && (s.y0 += g, s.y1 += g), f = s.y1 + m2;
    }
  }
  m(O, "resolveCollisionsTopToBottom");
  function y(n, f, h, d) {
    for (; h >= 0; --h) {
      let s = n[h], g = (s.y1 - f) * d;
      g > 1e-6 && (s.y0 -= g, s.y1 -= g), f = s.y0 - m2;
    }
  }
  m(y, "resolveCollisionsBottomToTop");
  function T({ sourceLinks: n, targetLinks: f }) {
    if (l === void 0) {
      for (let { source: { sourceLinks: h } } of f) h.sort(Dt);
      for (let { target: { targetLinks: h } } of n) h.sort(It);
    }
  }
  m(T, "reorderNodeLinks");
  function st(n) {
    if (l === void 0) for (let { sourceLinks: f, targetLinks: h } of n) f.sort(Dt), h.sort(It);
  }
  m(st, "reorderLinks");
  function A(n, f) {
    let h = n.y0 - (n.sourceLinks.length - 1) * m2 / 2;
    for (let { target: d, width: s } of n.sourceLinks) {
      if (d === f) break;
      h += s + m2;
    }
    for (let { source: d, width: s } of f.targetLinks) {
      if (d === n) break;
      h -= s;
    }
    return h;
  }
  m(A, "targetTop");
  function Y(n, f) {
    let h = f.y0 - (f.targetLinks.length - 1) * m2 / 2;
    for (let { source: d, width: s } of f.targetLinks) {
      if (d === n) break;
      h += s + m2;
    }
    for (let { target: d, width: s } of n.sourceLinks) {
      if (d === f) break;
      h -= s;
    }
    return h;
  }
  return m(Y, "sourceTop"), v;
}
m(rt, "Sankey");
var yt = Math.PI;
var mt = 2 * yt;
var V = 1e-6;
var te = mt - V;
function gt() {
  this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
}
m(gt, "Path");
function jt() {
  return new gt();
}
m(jt, "path");
gt.prototype = jt.prototype = { constructor: gt, moveTo: m(function(t, r) {
  this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +r);
}, "moveTo"), closePath: m(function() {
  this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
}, "closePath"), lineTo: m(function(t, r) {
  this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +r);
}, "lineTo"), quadraticCurveTo: m(function(t, r, i, u) {
  this._ += "Q" + +t + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +u);
}, "quadraticCurveTo"), bezierCurveTo: m(function(t, r, i, u, c, S) {
  this._ += "C" + +t + "," + +r + "," + +i + "," + +u + "," + (this._x1 = +c) + "," + (this._y1 = +S);
}, "bezierCurveTo"), arcTo: m(function(t, r, i, u, c) {
  t = +t, r = +r, i = +i, u = +u, c = +c;
  var S = this._x1, m2 = this._y1, x = i - t, o = u - r, a = S - t, l = m2 - r, k = a * a + l * l;
  if (c < 0) throw new Error("negative radius: " + c);
  if (this._x1 === null) this._ += "M" + (this._x1 = t) + "," + (this._y1 = r);
  else if (k > V) if (!(Math.abs(l * x - o * a) > V) || !c) this._ += "L" + (this._x1 = t) + "," + (this._y1 = r);
  else {
    var _ = i - S, p = u - m2, v = x * x + o * o, C = _ * _ + p * p, E = Math.sqrt(v), M = Math.sqrt(k), D = c * Math.tan((yt - Math.acos((v + k - C) / (2 * E * M))) / 2), z = D / M, B = D / E;
    Math.abs(z - 1) > V && (this._ += "L" + (t + z * a) + "," + (r + z * l)), this._ += "A" + c + "," + c + ",0,0," + +(l * _ > a * p) + "," + (this._x1 = t + B * x) + "," + (this._y1 = r + B * o);
  }
}, "arcTo"), arc: m(function(t, r, i, u, c, S) {
  t = +t, r = +r, i = +i, S = !!S;
  var m2 = i * Math.cos(u), x = i * Math.sin(u), o = t + m2, a = r + x, l = 1 ^ S, k = S ? u - c : c - u;
  if (i < 0) throw new Error("negative radius: " + i);
  this._x1 === null ? this._ += "M" + o + "," + a : (Math.abs(this._x1 - o) > V || Math.abs(this._y1 - a) > V) && (this._ += "L" + o + "," + a), i && (k < 0 && (k = k % mt + mt), k > te ? this._ += "A" + i + "," + i + ",0,1," + l + "," + (t - m2) + "," + (r - x) + "A" + i + "," + i + ",0,1," + l + "," + (this._x1 = o) + "," + (this._y1 = a) : k > V && (this._ += "A" + i + "," + i + ",0," + +(k >= yt) + "," + l + "," + (this._x1 = t + i * Math.cos(c)) + "," + (this._y1 = r + i * Math.sin(c))));
}, "arc"), rect: m(function(t, r, i, u) {
  this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +r) + "h" + +i + "v" + +u + "h" + -i + "Z";
}, "rect"), toString: m(function() {
  return this._;
}, "toString") };
var xt = jt;
function ot(t) {
  return m(function() {
    return t;
  }, "constant");
}
m(ot, "default");
function zt(t) {
  return t[0];
}
m(zt, "x");
function Bt(t) {
  return t[1];
}
m(Bt, "y");
var $t = Array.prototype.slice;
function ee(t) {
  return t.source;
}
m(ee, "linkSource");
function ne(t) {
  return t.target;
}
m(ne, "linkTarget");
function re(t) {
  var r = ee, i = ne, u = zt, c = Bt, S = null;
  function m2() {
    var x, o = $t.call(arguments), a = r.apply(this, o), l = i.apply(this, o);
    if (S || (S = x = xt()), t(S, +u.apply(this, (o[0] = a, o)), +c.apply(this, o), +u.apply(this, (o[0] = l, o)), +c.apply(this, o)), x) return S = null, x + "" || null;
  }
  return m(m2, "link"), m2.source = function(x) {
    return arguments.length ? (r = x, m2) : r;
  }, m2.target = function(x) {
    return arguments.length ? (i = x, m2) : i;
  }, m2.x = function(x) {
    return arguments.length ? (u = typeof x == "function" ? x : ot(+x), m2) : u;
  }, m2.y = function(x) {
    return arguments.length ? (c = typeof x == "function" ? x : ot(+x), m2) : c;
  }, m2.context = function(x) {
    return arguments.length ? (S = x ?? null, m2) : S;
  }, m2;
}
m(re, "link");
function oe(t, r, i, u, c) {
  t.moveTo(r, i), t.bezierCurveTo(r = (r + u) / 2, i, r, c, u, c);
}
m(oe, "curveHorizontal");
function kt() {
  return re(oe);
}
m(kt, "linkHorizontal");
function ie(t) {
  return [t.source.x1, t.y0];
}
m(ie, "horizontalSource");
function se(t) {
  return [t.target.x0, t.y1];
}
m(se, "horizontalTarget");
function it() {
  return kt().source(ie).target(se);
}
m(it, "default");
var _a3;
var K = (_a3 = class {
  static next(r) {
    return new _a3(r + ++_a3.count);
  }
  constructor(r) {
    this.id = r, this.href = `#${r}`;
  }
  toString() {
    return "url(" + this.href + ")";
  }
}, m(_a3, "Uid"), _a3.count = 0, _a3);
var ae = { left: ct, right: ht, center: dt, justify: Q };
var le = m(function(t, r, i, u) {
  let { securityLevel: c, sankey: S } = qo(), m2 = Mn.sankey, x;
  c === "sandbox" && (x = ia("#i" + r));
  let o = c === "sandbox" ? ia(x.nodes()[0].contentDocument.body) : ia("body"), a = c === "sandbox" ? o.select(`[id="${r}"]`) : ia(`[id="${r}"]`), l = (S == null ? void 0 : S.width) ?? m2.width, k = (S == null ? void 0 : S.height) ?? m2.width, _ = (S == null ? void 0 : S.useMaxWidth) ?? m2.useMaxWidth, p = (S == null ? void 0 : S.nodeAlignment) ?? m2.nodeAlignment, v = (S == null ? void 0 : S.prefix) ?? m2.prefix, C = (S == null ? void 0 : S.suffix) ?? m2.suffix, E = (S == null ? void 0 : S.showValues) ?? m2.showValues, M = u.db.getGraph(), D = ae[p];
  rt().nodeId((y) => y.id).nodeWidth(10).nodePadding(10 + (E ? 15 : 0)).nodeAlign(D).extent([[0, 0], [l, k]])(M);
  let R = He($c);
  a.append("g").attr("class", "nodes").selectAll(".node").data(M.nodes).join("g").attr("class", "node").attr("id", (y) => (y.uid = K.next("node-")).id).attr("transform", function(y) {
    return "translate(" + y.x0 + "," + y.y0 + ")";
  }).attr("x", (y) => y.x0).attr("y", (y) => y.y0).append("rect").attr("height", (y) => y.y1 - y.y0).attr("width", (y) => y.x1 - y.x0).attr("fill", (y) => R(y.id));
  let w = m(({ id: y, value: T }) => E ? `${y}
${v}${Math.round(T * 100) / 100}${C}` : y, "getText");
  a.append("g").attr("class", "node-labels").attr("font-size", 14).selectAll("text").data(M.nodes).join("text").attr("x", (y) => y.x0 < l / 2 ? y.x1 + 6 : y.x0 - 6).attr("y", (y) => (y.y1 + y.y0) / 2).attr("dy", `${E ? "0" : "0.35"}em`).attr("text-anchor", (y) => y.x0 < l / 2 ? "start" : "end").text(w);
  let N = a.append("g").attr("class", "links").attr("fill", "none").attr("stroke-opacity", 0.5).selectAll(".link").data(M.links).join("g").attr("class", "link").style("mix-blend-mode", "multiply"), P = (S == null ? void 0 : S.linkColor) ?? "gradient";
  if (P === "gradient") {
    let y = N.append("linearGradient").attr("id", (T) => (T.uid = K.next("linearGradient-")).id).attr("gradientUnits", "userSpaceOnUse").attr("x1", (T) => T.source.x1).attr("x2", (T) => T.target.x0);
    y.append("stop").attr("offset", "0%").attr("stop-color", (T) => R(T.source.id)), y.append("stop").attr("offset", "100%").attr("stop-color", (T) => R(T.target.id));
  }
  let O;
  switch (P) {
    case "gradient":
      O = m((y) => y.uid, "coloring");
      break;
    case "source":
      O = m((y) => R(y.source.id), "coloring");
      break;
    case "target":
      O = m((y) => R(y.target.id), "coloring");
      break;
    default:
      O = P;
  }
  N.append("path").attr("d", it()).attr("stroke", O).attr("stroke-width", (y) => Math.max(1, y.width)), _o(void 0, a, 0, _);
}, "draw");
var Vt = { draw: le };
var Ft = m((t) => t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g, "").replaceAll(/([\n\r])+/g, `
`).trim(), "prepareTextForParsing");
var ue = m((t) => `.label {
      font-family: ${t.fontFamily};
    }`, "getStyles");
var Wt = ue;
var fe = G.parse.bind(G);
G.parse = (t) => fe(Ft(t));
var Cn2 = { styles: Wt, parser: G, db: Ot, renderer: Vt };
export {
  Cn2 as diagram
};
//# sourceMappingURL=sankeyDiagram-L3NBLAOT-MG75WST5.js.map

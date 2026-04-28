import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Vt
} from "./chunk-37DMPFOG.js";
import {
  $
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Cn,
  as,
  es,
  hs,
  is,
  ls,
  ns,
  os,
  qo,
  ss
} from "./chunk-HPIGS4CQ.js";
import "./chunk-LKDN26KO.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/ishikawaDiagram-YMYX4NHK.mjs
var et = function() {
  var e = m(function(N, t, n, i) {
    for (n = n || {}, i = N.length; i--; n[N[i]] = t) ;
    return n;
  }, "o"), h = [1, 4], o = [1, 14], a = [1, 12], l = [1, 13], f = [6, 7, 8], p = [1, 20], d2 = [1, 18], b = [1, 19], u = [6, 7, 11], k = [1, 6, 13, 14], g = [1, 23], x = [1, 24], _ = [1, 6, 7, 11, 13, 14], B = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, ishikawa: 4, spaceLines: 5, SPACELINE: 6, NL: 7, ISHIKAWA: 8, document: 9, stop: 10, EOF: 11, statement: 12, SPACELIST: 13, TEXT: 14, $accept: 0, $end: 1 }, terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "ISHIKAWA", 11: "EOF", 13: "SPACELIST", 14: "TEXT" }, productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 2], [12, 1], [12, 1], [12, 1]], performAction: m(function(t, n, i, c, y, s, S) {
    var w = s.length - 1;
    switch (y) {
      case 6:
      case 7:
        return c;
      case 15:
        c.addNode(s[w - 1].length, s[w].trim());
        break;
      case 16:
        c.addNode(0, s[w].trim());
        break;
    }
  }, "anonymous"), table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: h }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: h }, { 6: o, 7: [1, 10], 9: 9, 12: 11, 13: a, 14: l }, e(f, [2, 3]), { 1: [2, 2] }, e(f, [2, 4]), e(f, [2, 5]), { 1: [2, 6], 6: o, 12: 15, 13: a, 14: l }, { 6: o, 9: 16, 12: 11, 13: a, 14: l }, { 6: p, 7: d2, 10: 17, 11: b }, e(u, [2, 18], { 14: [1, 21] }), e(u, [2, 16]), e(u, [2, 17]), { 6: p, 7: d2, 10: 22, 11: b }, { 1: [2, 7], 6: o, 12: 15, 13: a, 14: l }, e(k, [2, 14], { 7: g, 11: x }), e(_, [2, 8]), e(_, [2, 9]), e(_, [2, 10]), e(u, [2, 15]), e(k, [2, 13], { 7: g, 11: x }), e(_, [2, 11]), e(_, [2, 12])], defaultActions: { 2: [2, 1], 6: [2, 2] }, parseError: m(function(t, n) {
    if (n.recoverable) this.trace(t);
    else {
      var i = new Error(t);
      throw i.hash = n, i;
    }
  }, "parseError"), parse: m(function(t) {
    var n = this, i = [0], c = [], y = [null], s = [], S = this.table, w = "", A = 0, v = 0, E = 0, D = 2, P = 1, Y = s.slice.call(arguments, 1), m2 = Object.create(this.lexer), I = { yy: {} };
    for (var G in this.yy) Object.prototype.hasOwnProperty.call(this.yy, G) && (I.yy[G] = this.yy[G]);
    m2.setInput(t, I.yy), I.yy.lexer = m2, I.yy.parser = this, typeof m2.yylloc > "u" && (m2.yylloc = {});
    var R = m2.yylloc;
    s.push(R);
    var K = m2.options && m2.options.ranges;
    typeof I.yy.parseError == "function" ? this.parseError = I.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function Vt2(T) {
      i.length = i.length - 2 * T, y.length = y.length - T, s.length = s.length - T;
    }
    m(Vt2, "popStack");
    function It() {
      var T;
      return T = c.pop() || m2.lex() || P, typeof T != "number" && (T instanceof Array && (c = T, T = c.pop()), T = n.symbols_[T] || T), T;
    }
    m(It, "lex");
    for (var L, q, O, C, Gt, Q, j = {}, z, V, nt, H; ; ) {
      if (O = i[i.length - 1], this.defaultActions[O] ? C = this.defaultActions[O] : ((L === null || typeof L > "u") && (L = It()), C = S[O] && S[O][L]), typeof C > "u" || !C.length || !C[0]) {
        var J = "";
        H = [];
        for (z in S[O]) this.terminals_[z] && z > D && H.push("'" + this.terminals_[z] + "'");
        m2.showPosition ? J = "Parse error on line " + (A + 1) + `:
` + m2.showPosition() + `
Expecting ` + H.join(", ") + ", got '" + (this.terminals_[L] || L) + "'" : J = "Parse error on line " + (A + 1) + ": Unexpected " + (L == P ? "end of input" : "'" + (this.terminals_[L] || L) + "'"), this.parseError(J, { text: m2.match, token: this.terminals_[L] || L, line: m2.yylineno, loc: R, expected: H });
      }
      if (C[0] instanceof Array && C.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + O + ", token: " + L);
      switch (C[0]) {
        case 1:
          i.push(L), y.push(m2.yytext), s.push(m2.yylloc), i.push(C[1]), L = null, q ? (L = q, q = null) : (v = m2.yyleng, w = m2.yytext, A = m2.yylineno, R = m2.yylloc, E > 0 && E--);
          break;
        case 2:
          if (V = this.productions_[C[1]][1], j.$ = y[y.length - V], j._$ = { first_line: s[s.length - (V || 1)].first_line, last_line: s[s.length - 1].last_line, first_column: s[s.length - (V || 1)].first_column, last_column: s[s.length - 1].last_column }, K && (j._$.range = [s[s.length - (V || 1)].range[0], s[s.length - 1].range[1]]), Q = this.performAction.apply(j, [w, v, A, I.yy, C[1], y, s].concat(Y)), typeof Q < "u") return Q;
          V && (i = i.slice(0, -1 * V * 2), y = y.slice(0, -1 * V), s = s.slice(0, -1 * V)), i.push(this.productions_[C[1]][0]), y.push(j.$), s.push(j._$), nt = S[i[i.length - 2]][i[i.length - 1]], i.push(nt);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, M = function() {
    var N = { EOF: 1, parseError: m(function(n, i) {
      if (this.yy.parser) this.yy.parser.parseError(n, i);
      else throw new Error(n);
    }, "parseError"), setInput: m(function(t, n) {
      return this.yy = n || this.yy || {}, this._input = t, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var t = this._input[0];
      this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t;
      var n = t.match(/(?:\r\n?|\n).*/g);
      return n ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t;
    }, "input"), unput: m(function(t) {
      var n = t.length, i = t.split(/(?:\r\n?|\n)/g);
      this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - n), this.offset -= n;
      var c = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), i.length - 1 && (this.yylineno -= i.length - 1);
      var y = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: i ? (i.length === c.length ? this.yylloc.first_column : 0) + c[c.length - i.length].length - i[0].length : this.yylloc.first_column - n }, this.options.ranges && (this.yylloc.range = [y[0], y[0] + this.yyleng - n]), this.yyleng = this.yytext.length, this;
    }, "unput"), more: m(function() {
      return this._more = true, this;
    }, "more"), reject: m(function() {
      if (this.options.backtrack_lexer) this._backtrack = true;
      else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
      return this;
    }, "reject"), less: m(function(t) {
      this.unput(this.match.slice(t));
    }, "less"), pastInput: m(function() {
      var t = this.matched.substr(0, this.matched.length - this.match.length);
      return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
    }, "pastInput"), upcomingInput: m(function() {
      var t = this.match;
      return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
    }, "upcomingInput"), showPosition: m(function() {
      var t = this.pastInput(), n = new Array(t.length + 1).join("-");
      return t + this.upcomingInput() + `
` + n + "^";
    }, "showPosition"), test_match: m(function(t, n) {
      var i, c, y;
      if (this.options.backtrack_lexer && (y = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (y.yylloc.range = this.yylloc.range.slice(0))), c = t[0].match(/(?:\r\n?|\n).*/g), c && (this.yylineno += c.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: c ? c[c.length - 1].length - c[c.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(t[0].length), this.matched += t[0], i = this.performAction.call(this, this.yy, this, n, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), i) return i;
      if (this._backtrack) {
        for (var s in y) this[s] = y[s];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var t, n, i, c;
      this._more || (this.yytext = "", this.match = "");
      for (var y = this._currentRules(), s = 0; s < y.length; s++) if (i = this._input.match(this.rules[y[s]]), i && (!n || i[0].length > n[0].length)) {
        if (n = i, c = s, this.options.backtrack_lexer) {
          if (t = this.test_match(i, y[s]), t !== false) return t;
          if (this._backtrack) {
            n = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return n ? (t = this.test_match(n, y[c]), t !== false ? t : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var n = this.next();
      return n || this.lex();
    }, "lex"), begin: m(function(n) {
      this.conditionStack.push(n);
    }, "begin"), popState: m(function() {
      var n = this.conditionStack.length - 1;
      return n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(n) {
      return n = this.conditionStack.length - 1 - Math.abs(n || 0), n >= 0 ? this.conditionStack[n] : "INITIAL";
    }, "topState"), pushState: m(function(n) {
      this.begin(n);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(n, i, c, y) {
      var s = y;
      switch (c) {
        case 0:
          return 6;
        case 1:
          return 8;
        case 2:
          return 8;
        case 3:
          return 6;
        case 4:
          return 7;
        case 5:
          return 13;
        case 6:
          return 14;
        case 7:
          return 11;
      }
    }, "anonymous"), rules: [/^(?:\s*%%.*)/i, /^(?:ishikawa-beta\b)/i, /^(?:ishikawa\b)/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[\s]+)/i, /^(?:[^\n]+)/i, /^(?:$)/i], conditions: { INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7], inclusive: true } } };
    return N;
  }();
  B.lexer = M;
  function $2() {
    this.yy = {};
  }
  return m($2, "Parser"), $2.prototype = B, B.Parser = $2, new $2();
}();
et.parser = et;
var yt = et;
var _a;
var Z = (_a = class {
  constructor() {
    this.stack = [];
    this.clear = this.clear.bind(this), this.addNode = this.addNode.bind(this), this.getRoot = this.getRoot.bind(this);
  }
  clear() {
    this.root = void 0, this.stack = [], this.baseLevel = void 0, os();
  }
  getRoot() {
    return this.root;
  }
  addNode(h, o) {
    let a = Cn.sanitizeText(o, qo());
    if (!this.root) {
      this.root = { text: a, children: [] }, this.stack = [{ level: 0, node: this.root }], hs(a);
      return;
    }
    this.baseLevel ?? (this.baseLevel = h);
    let l = h - this.baseLevel + 1;
    for (l <= 0 && (l = 1); this.stack.length > 1 && this.stack[this.stack.length - 1].level >= l; ) this.stack.pop();
    let f = this.stack[this.stack.length - 1].node, p = { text: a, children: [] };
    f.children.push(p), this.stack.push({ level: l, node: p });
  }
  getAccTitle() {
    return ss();
  }
  setAccTitle(h) {
    es(h);
  }
  getAccDescription() {
    return ls();
  }
  setAccDescription(h) {
    as(h);
  }
  getDiagramTitle() {
    return ns();
  }
  setDiagramTitle(h) {
    hs(h);
  }
}, m(_a, "IshikawaDB"), _a);
var Et = 14;
var W = 250;
var $t = 30;
var At = 60;
var Dt = 5;
var xt = 82 * Math.PI / 180;
var mt = Math.cos(xt);
var gt = Math.sin(xt);
var kt = m((e, h, o) => {
  let a = e.node().getBBox(), l = a.width + h * 2, f = a.height + h * 2;
  is(e, f, l, o), e.attr("viewBox", `${a.x - h} ${a.y - h} ${l} ${f}`);
}, "applyPaddedViewBox");
var Lt = m((e, h, o, a) => {
  var _a2, _b;
  let f = a.db.getRoot();
  if (!f) return;
  let p = qo(), { look: d2, handDrawnSeed: b, themeVariables: u } = p, k = $(p.fontSize)[0] ?? Et, g = d2 === "handDrawn", x = f.children ?? [], _ = ((_a2 = p.ishikawa) == null ? void 0 : _a2.diagramPadding) ?? 20, B = ((_b = p.ishikawa) == null ? void 0 : _b.useMaxWidth) ?? false, M = d(h), $2 = M.append("g").attr("class", "ishikawa"), N = g ? Vt.svg(M.node()) : void 0, t = N ? { roughSvg: N, seed: b ?? 0, lineColor: (u == null ? void 0 : u.lineColor) ?? "#333", fillColor: (u == null ? void 0 : u.mainBkg) ?? "#fff" } : void 0, n = `ishikawa-arrow-${h}`;
  g || $2.append("defs").append("marker").attr("id", n).attr("viewBox", "0 0 10 10").attr("refX", 0).attr("refY", 5).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("d", "M 10 0 L 0 5 L 10 10 Z").attr("class", "ishikawa-arrow");
  let i = 0, c = W, y = g ? void 0 : F($2, i, c, i, c, "ishikawa-spine");
  if (Nt($2, i, c, f.text, k, t), !x.length) {
    g && F($2, i, c, i, c, "ishikawa-spine", t), kt(M, _, B);
    return;
  }
  i -= 20;
  let s = x.filter((m2, I) => I % 2 === 0), S = x.filter((m2, I) => I % 2 === 1), w = bt(s), A = bt(S), v = w.total + A.total, E = W, D = W;
  if (v > 0) {
    let m2 = W * 2, I = W * 0.3;
    E = Math.max(I, m2 * (w.total / v)), D = Math.max(I, m2 * (A.total / v));
  }
  let P = k * 2;
  E = Math.max(E, w.max * P), D = Math.max(D, A.max * P), c = Math.max(E, W), y && y.attr("y1", c).attr("y2", c), $2.select(".ishikawa-head-group").attr("transform", `translate(0,${c})`);
  let Y = Math.ceil(x.length / 2);
  for (let m2 = 0; m2 < Y; m2++) {
    let I = $2.append("g").attr("class", "ishikawa-pair");
    for (let [G, R, K] of [[x[m2 * 2], -1, E], [x[m2 * 2 + 1], 1, D]]) G && Bt(I, G, i, c, R, K, k, t);
    i = I.selectAll("text").nodes().reduce((G, R) => Math.min(G, R.getBBox().x), 1 / 0);
  }
  if (g) F($2, i, c, 0, c, "ishikawa-spine", t);
  else {
    y.attr("x1", i);
    let m2 = `url(#${n})`;
    $2.selectAll("line.ishikawa-branch, line.ishikawa-sub-branch").attr("marker-start", m2);
  }
  kt(M, _, B);
}, "draw");
var bt = m((e) => {
  let h = m((o) => o.children.reduce((a, l) => a + 1 + h(l), 0), "countDescendants");
  return e.reduce((o, a) => {
    let l = h(a);
    return o.total += l, o.max = Math.max(o.max, l), o;
  }, { total: 0, max: 0 });
}, "sideStats");
var Nt = m((e, h, o, a, l, f) => {
  let p = Math.max(6, Math.floor(110 / (l * 0.6))), d2 = e.append("g").attr("class", "ishikawa-head-group").attr("transform", `translate(${h},${o})`), b = X(d2, _t(a, p), 0, 0, "ishikawa-head-label", "start", l), u = b.node().getBBox(), k = Math.max(60, u.width + 6), g = Math.max(40, u.height * 2 + 40), x = `M 0 ${-g / 2} L 0 ${g / 2} Q ${k * 2.4} 0 0 ${-g / 2} Z`;
  if (f) {
    let _ = f.roughSvg.path(x, { roughness: 1.5, seed: f.seed, fill: f.fillColor, fillStyle: "hachure", fillWeight: 2.5, hachureGap: 5, stroke: f.lineColor, strokeWidth: 2 });
    d2.insert(() => _, ":first-child").attr("class", "ishikawa-head");
  } else d2.insert("path", ":first-child").attr("class", "ishikawa-head").attr("d", x);
  b.attr("transform", `translate(${(k - u.width) / 2 - u.x + 3},${-u.y - u.height / 2})`);
}, "drawHead");
var Tt = m((e, h) => {
  let o = [], a = [], l = m((f, p, d2) => {
    let b = h === -1 ? [...f].reverse() : f;
    for (let u of b) {
      let k = o.length, g = u.children ?? [];
      o.push({ depth: d2, text: _t(u.text, 15), parentIndex: p, childCount: g.length }), d2 % 2 === 0 ? (a.push(k), g.length && l(g, k, d2 + 1)) : (g.length && l(g, k, d2 + 1), a.push(k));
    }
  }, "walk");
  return l(e, -1, 2), { entries: o, yOrder: a };
}, "flattenTree");
var Ct = m((e, h, o, a, l, f, p) => {
  let d2 = e.append("g").attr("class", "ishikawa-label-group"), u = X(d2, h, o, a + 11 * l, "ishikawa-label cause", "middle", f).node().getBBox();
  if (p) {
    let k = p.roughSvg.rectangle(u.x - 20, u.y - 2, u.width + 40, u.height + 4, { roughness: 1.5, seed: p.seed, fill: p.fillColor, fillStyle: "hachure", fillWeight: 2.5, hachureGap: 5, stroke: p.lineColor, strokeWidth: 2 });
    d2.insert(() => k, ":first-child").attr("class", "ishikawa-label-box");
  } else d2.insert("rect", ":first-child").attr("class", "ishikawa-label-box").attr("x", u.x - 20).attr("y", u.y - 2).attr("width", u.width + 40).attr("height", u.height + 4);
}, "drawCauseLabel");
var it = m((e, h, o, a, l, f) => {
  let p = Math.sqrt(a * a + l * l);
  if (p === 0) return;
  let d2 = a / p, b = l / p, u = 6, k = -b * u, g = d2 * u, x = h, _ = o, B = `M ${x} ${_} L ${x - d2 * u * 2 + k} ${_ - b * u * 2 + g} L ${x - d2 * u * 2 - k} ${_ - b * u * 2 - g} Z`, M = f.roughSvg.path(B, { roughness: 1, seed: f.seed, fill: f.lineColor, fillStyle: "solid", stroke: f.lineColor, strokeWidth: 1 });
  e.append(() => M);
}, "drawArrowMarker");
var Bt = m((e, h, o, a, l, f, p, d2) => {
  let b = h.children ?? [], u = f * (b.length ? 1 : 0.2), k = -mt * u, g = gt * u * l, x = o + k, _ = a + g;
  if (F(e, o, a, x, _, "ishikawa-branch", d2), d2 && it(e, o, a, o - x, a - _, d2), Ct(e, h.text, x, _, l, p, d2), !b.length) return;
  let { entries: B, yOrder: M } = Tt(b, l), $2 = B.length, N = new Array($2);
  for (let [y, s] of M.entries()) N[s] = a + g * ((y + 1) / ($2 + 1));
  let t = /* @__PURE__ */ new Map();
  t.set(-1, { x0: o, y0: a, x1: x, y1: _, childCount: b.length, childrenDrawn: 0 });
  let n = -mt, i = gt * l, c = l < 0 ? "ishikawa-label up" : "ishikawa-label down";
  for (let [y, s] of B.entries()) {
    let S = N[y], w = t.get(s.parentIndex), A = e.append("g").attr("class", "ishikawa-sub-group"), v = 0, E = 0, D = 0;
    if (s.depth % 2 === 0) {
      let P = w.y1 - w.y0;
      v = wt(w.x0, w.x1, P ? (S - w.y0) / P : 0.5), E = S, D = v - (s.childCount > 0 ? At + s.childCount * Dt : $t), F(A, v, S, D, S, "ishikawa-sub-branch", d2), d2 && it(A, v, S, 1, 0, d2), X(A, s.text, D, S, "ishikawa-label align", "end", p);
    } else {
      let P = w.childrenDrawn++;
      v = wt(w.x0, w.x1, (w.childCount - P) / (w.childCount + 1)), E = w.y0, D = v + n * ((S - E) / i), F(A, v, E, D, S, "ishikawa-sub-branch", d2), d2 && it(A, v, E, v - D, E - S, d2), X(A, s.text, D, S, c, "end", p);
    }
    s.childCount > 0 && t.set(y, { x0: v, y0: E, x1: D, y1: S, childCount: s.childCount, childrenDrawn: 0 });
  }
}, "drawBranch");
var Mt = m((e) => e.split(/<br\s*\/?>|\n/), "splitLines");
var _t = m((e, h) => {
  if (e.length <= h) return e;
  let o = [];
  for (let a of e.split(/\s+/)) {
    let l = o.length - 1;
    l >= 0 && o[l].length + 1 + a.length <= h ? o[l] += " " + a : o.push(a);
  }
  return o.join(`
`);
}, "wrapText");
var X = m((e, h, o, a, l, f, p) => {
  let d2 = Mt(h), b = p * 1.05, u = e.append("text").attr("class", l).attr("text-anchor", f).attr("x", o).attr("y", a - (d2.length - 1) * b / 2);
  for (let [k, g] of d2.entries()) u.append("tspan").attr("x", o).attr("dy", k === 0 ? 0 : b).text(g);
  return u;
}, "drawMultilineText");
var wt = m((e, h, o) => e + (h - e) * o, "lerp");
var F = m((e, h, o, a, l, f, p) => {
  if (p) {
    let d2 = p.roughSvg.line(h, o, a, l, { roughness: 1.5, seed: p.seed, stroke: p.lineColor, strokeWidth: 2 });
    e.append(() => d2).attr("class", f);
    return;
  }
  return e.append("line").attr("class", f).attr("x1", h).attr("y1", o).attr("x2", a).attr("y2", l);
}, "drawLine");
var St = { draw: Lt };
var Pt = m((e) => `
.ishikawa .ishikawa-spine,
.ishikawa .ishikawa-branch,
.ishikawa .ishikawa-sub-branch {
  stroke: ${e.lineColor};
  stroke-width: 2;
  fill: none;
}

.ishikawa .ishikawa-sub-branch {
  stroke-width: 1;
}

.ishikawa .ishikawa-arrow {
  fill: ${e.lineColor};
}

.ishikawa .ishikawa-head {
  fill: ${e.mainBkg};
  stroke: ${e.lineColor};
  stroke-width: 2;
}

.ishikawa .ishikawa-label-box {
  fill: ${e.mainBkg};
  stroke: ${e.lineColor};
  stroke-width: 2;
}

.ishikawa text {
  font-family: ${e.fontFamily};
  font-size: ${e.fontSize};
  fill: ${e.textColor};
}

.ishikawa .ishikawa-head-label {
  font-weight: 600;
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 14px;
}

.ishikawa .ishikawa-label {
  text-anchor: end;
}

.ishikawa .ishikawa-label.cause {
  text-anchor: middle;
  dominant-baseline: middle;
}

.ishikawa .ishikawa-label.align {
  text-anchor: end;
  dominant-baseline: middle;
}

.ishikawa .ishikawa-label.up {
  dominant-baseline: baseline;
}

.ishikawa .ishikawa-label.down {
  dominant-baseline: hanging;
}
`, "getStyles");
var vt = Pt;
var re = { parser: yt, get db() {
  return new Z();
}, renderer: St, styles: vt };
export {
  re as diagram
};
//# sourceMappingURL=ishikawaDiagram-YMYX4NHK-OKR5SJQS.js.map

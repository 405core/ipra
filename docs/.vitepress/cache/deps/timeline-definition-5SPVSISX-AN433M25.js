import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  $
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  _o,
  c,
  k,
  n,
  or,
  os,
  qo
} from "./chunk-HPIGS4CQ.js";
import {
  ia,
  ks,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-EQAKJMPU.js";
import {
  m,
  p
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/timeline-definition-5SPVSISX.mjs
var at = function() {
  var e = m(function(b, i, d2, l) {
    for (d2 = d2 || {}, l = b.length; l--; d2[b[l]] = i) ;
    return d2;
  }, "o"), t = [6, 11, 13, 14, 15, 17, 19, 20, 23, 24], n2 = [1, 12], a = [1, 13], r = [1, 14], h = [1, 15], c2 = [1, 16], o = [1, 19], f = [1, 20], g = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, timeline_header: 4, document: 5, EOF: 6, timeline: 7, timeline_lr: 8, timeline_td: 9, line: 10, SPACE: 11, statement: 12, NEWLINE: 13, title: 14, acc_title: 15, acc_title_value: 16, acc_descr: 17, acc_descr_value: 18, acc_descr_multiline_value: 19, section: 20, period_statement: 21, event_statement: 22, period: 23, event: 24, $accept: 0, $end: 1 }, terminals_: { 2: "error", 6: "EOF", 7: "timeline", 8: "timeline_lr", 9: "timeline_td", 11: "SPACE", 13: "NEWLINE", 14: "title", 15: "acc_title", 16: "acc_title_value", 17: "acc_descr", 18: "acc_descr_value", 19: "acc_descr_multiline_value", 20: "section", 23: "period", 24: "event" }, productions_: [0, [3, 3], [4, 1], [4, 1], [4, 1], [5, 0], [5, 2], [10, 2], [10, 1], [10, 1], [10, 1], [12, 1], [12, 2], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [21, 1], [22, 1]], performAction: m(function(i, d2, l, p2, y, u, v) {
    var k2 = u.length - 1;
    switch (y) {
      case 1:
        return u[k2 - 1];
      case 3:
        p2.setDirection("LR");
        break;
      case 4:
        p2.setDirection("TD");
        break;
      case 5:
        this.$ = [];
        break;
      case 6:
        u[k2 - 1].push(u[k2]), this.$ = u[k2 - 1];
        break;
      case 7:
      case 8:
        this.$ = u[k2];
        break;
      case 9:
      case 10:
        this.$ = [];
        break;
      case 11:
        p2.getCommonDb().setDiagramTitle(u[k2].substr(6)), this.$ = u[k2].substr(6);
        break;
      case 12:
        this.$ = u[k2].trim(), p2.getCommonDb().setAccTitle(this.$);
        break;
      case 13:
      case 14:
        this.$ = u[k2].trim(), p2.getCommonDb().setAccDescription(this.$);
        break;
      case 15:
        p2.addSection(u[k2].substr(8)), this.$ = u[k2].substr(8);
        break;
      case 18:
        p2.addTask(u[k2], 0, ""), this.$ = u[k2];
        break;
      case 19:
        p2.addEvent(u[k2].substr(2)), this.$ = u[k2];
        break;
    }
  }, "anonymous"), table: [{ 3: 1, 4: 2, 7: [1, 3], 8: [1, 4], 9: [1, 5] }, { 1: [3] }, e(t, [2, 5], { 5: 6 }), e(t, [2, 2]), e(t, [2, 3]), e(t, [2, 4]), { 6: [1, 7], 10: 8, 11: [1, 9], 12: 10, 13: [1, 11], 14: n2, 15: a, 17: r, 19: h, 20: c2, 21: 17, 22: 18, 23: o, 24: f }, e(t, [2, 10], { 1: [2, 1] }), e(t, [2, 6]), { 12: 21, 14: n2, 15: a, 17: r, 19: h, 20: c2, 21: 17, 22: 18, 23: o, 24: f }, e(t, [2, 8]), e(t, [2, 9]), e(t, [2, 11]), { 16: [1, 22] }, { 18: [1, 23] }, e(t, [2, 14]), e(t, [2, 15]), e(t, [2, 16]), e(t, [2, 17]), e(t, [2, 18]), e(t, [2, 19]), e(t, [2, 7]), e(t, [2, 12]), e(t, [2, 13])], defaultActions: {}, parseError: m(function(i, d2) {
    if (d2.recoverable) this.trace(i);
    else {
      var l = new Error(i);
      throw l.hash = d2, l;
    }
  }, "parseError"), parse: m(function(i) {
    var d2 = this, l = [0], p2 = [], y = [null], u = [], v = this.table, k2 = "", H = 0, V = 0, R = 0, O = 2, L = 1, C = u.slice.call(arguments, 1), T = Object.create(this.lexer), B = { yy: {} };
    for (var P in this.yy) Object.prototype.hasOwnProperty.call(this.yy, P) && (B.yy[P] = this.yy[P]);
    T.setInput(i, B.yy), B.yy.lexer = T, B.yy.parser = this, typeof T.yylloc > "u" && (T.yylloc = {});
    var D = T.yylloc;
    u.push(D);
    var $2 = T.options && T.options.ranges;
    typeof B.yy.parseError == "function" ? this.parseError = B.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function _(W) {
      l.length = l.length - 2 * W, y.length = y.length - W, u.length = u.length - W;
    }
    m(_, "popStack");
    function E() {
      var W;
      return W = p2.pop() || T.lex() || L, typeof W != "number" && (W instanceof Array && (p2 = W, W = p2.pop()), W = d2.symbols_[W] || W), W;
    }
    m(E, "lex");
    for (var S, I, A, N, nt, X, z = {}, Z, F, pt2, q; ; ) {
      if (A = l[l.length - 1], this.defaultActions[A] ? N = this.defaultActions[A] : ((S === null || typeof S > "u") && (S = E()), N = v[A] && v[A][S]), typeof N > "u" || !N.length || !N[0]) {
        var rt = "";
        q = [];
        for (Z in v[A]) this.terminals_[Z] && Z > O && q.push("'" + this.terminals_[Z] + "'");
        T.showPosition ? rt = "Parse error on line " + (H + 1) + `:
` + T.showPosition() + `
Expecting ` + q.join(", ") + ", got '" + (this.terminals_[S] || S) + "'" : rt = "Parse error on line " + (H + 1) + ": Unexpected " + (S == L ? "end of input" : "'" + (this.terminals_[S] || S) + "'"), this.parseError(rt, { text: T.match, token: this.terminals_[S] || S, line: T.yylineno, loc: D, expected: q });
      }
      if (N[0] instanceof Array && N.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + A + ", token: " + S);
      switch (N[0]) {
        case 1:
          l.push(S), y.push(T.yytext), u.push(T.yylloc), l.push(N[1]), S = null, I ? (S = I, I = null) : (V = T.yyleng, k2 = T.yytext, H = T.yylineno, D = T.yylloc, R > 0 && R--);
          break;
        case 2:
          if (F = this.productions_[N[1]][1], z.$ = y[y.length - F], z._$ = { first_line: u[u.length - (F || 1)].first_line, last_line: u[u.length - 1].last_line, first_column: u[u.length - (F || 1)].first_column, last_column: u[u.length - 1].last_column }, $2 && (z._$.range = [u[u.length - (F || 1)].range[0], u[u.length - 1].range[1]]), X = this.performAction.apply(z, [k2, V, H, B.yy, N[1], y, u].concat(C)), typeof X < "u") return X;
          F && (l = l.slice(0, -1 * F * 2), y = y.slice(0, -1 * F), u = u.slice(0, -1 * F)), l.push(this.productions_[N[1]][0]), y.push(z.$), u.push(z._$), pt2 = v[l[l.length - 2]][l[l.length - 1]], l.push(pt2);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, x = function() {
    var b = { EOF: 1, parseError: m(function(d2, l) {
      if (this.yy.parser) this.yy.parser.parseError(d2, l);
      else throw new Error(d2);
    }, "parseError"), setInput: m(function(i, d2) {
      return this.yy = d2 || this.yy || {}, this._input = i, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var i = this._input[0];
      this.yytext += i, this.yyleng++, this.offset++, this.match += i, this.matched += i;
      var d2 = i.match(/(?:\r\n?|\n).*/g);
      return d2 ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), i;
    }, "input"), unput: m(function(i) {
      var d2 = i.length, l = i.split(/(?:\r\n?|\n)/g);
      this._input = i + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - d2), this.offset -= d2;
      var p2 = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), l.length - 1 && (this.yylineno -= l.length - 1);
      var y = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: l ? (l.length === p2.length ? this.yylloc.first_column : 0) + p2[p2.length - l.length].length - l[0].length : this.yylloc.first_column - d2 }, this.options.ranges && (this.yylloc.range = [y[0], y[0] + this.yyleng - d2]), this.yyleng = this.yytext.length, this;
    }, "unput"), more: m(function() {
      return this._more = true, this;
    }, "more"), reject: m(function() {
      if (this.options.backtrack_lexer) this._backtrack = true;
      else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
      return this;
    }, "reject"), less: m(function(i) {
      this.unput(this.match.slice(i));
    }, "less"), pastInput: m(function() {
      var i = this.matched.substr(0, this.matched.length - this.match.length);
      return (i.length > 20 ? "..." : "") + i.substr(-20).replace(/\n/g, "");
    }, "pastInput"), upcomingInput: m(function() {
      var i = this.match;
      return i.length < 20 && (i += this._input.substr(0, 20 - i.length)), (i.substr(0, 20) + (i.length > 20 ? "..." : "")).replace(/\n/g, "");
    }, "upcomingInput"), showPosition: m(function() {
      var i = this.pastInput(), d2 = new Array(i.length + 1).join("-");
      return i + this.upcomingInput() + `
` + d2 + "^";
    }, "showPosition"), test_match: m(function(i, d2) {
      var l, p2, y;
      if (this.options.backtrack_lexer && (y = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (y.yylloc.range = this.yylloc.range.slice(0))), p2 = i[0].match(/(?:\r\n?|\n).*/g), p2 && (this.yylineno += p2.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: p2 ? p2[p2.length - 1].length - p2[p2.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + i[0].length }, this.yytext += i[0], this.match += i[0], this.matches = i, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(i[0].length), this.matched += i[0], l = this.performAction.call(this, this.yy, this, d2, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), l) return l;
      if (this._backtrack) {
        for (var u in y) this[u] = y[u];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var i, d2, l, p2;
      this._more || (this.yytext = "", this.match = "");
      for (var y = this._currentRules(), u = 0; u < y.length; u++) if (l = this._input.match(this.rules[y[u]]), l && (!d2 || l[0].length > d2[0].length)) {
        if (d2 = l, p2 = u, this.options.backtrack_lexer) {
          if (i = this.test_match(l, y[u]), i !== false) return i;
          if (this._backtrack) {
            d2 = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return d2 ? (i = this.test_match(d2, y[p2]), i !== false ? i : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var d2 = this.next();
      return d2 || this.lex();
    }, "lex"), begin: m(function(d2) {
      this.conditionStack.push(d2);
    }, "begin"), popState: m(function() {
      var d2 = this.conditionStack.length - 1;
      return d2 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(d2) {
      return d2 = this.conditionStack.length - 1 - Math.abs(d2 || 0), d2 >= 0 ? this.conditionStack[d2] : "INITIAL";
    }, "topState"), pushState: m(function(d2) {
      this.begin(d2);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(d2, l, p2, y) {
      var u = y;
      switch (p2) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          return 13;
        case 3:
          break;
        case 4:
          break;
        case 5:
          return 8;
        case 6:
          return 9;
        case 7:
          return 7;
        case 8:
          return 14;
        case 9:
          return this.begin("acc_title"), 15;
          break;
        case 10:
          return this.popState(), "acc_title_value";
          break;
        case 11:
          return this.begin("acc_descr"), 17;
          break;
        case 12:
          return this.popState(), "acc_descr_value";
          break;
        case 13:
          this.begin("acc_descr_multiline");
          break;
        case 14:
          this.popState();
          break;
        case 15:
          return "acc_descr_multiline_value";
        case 16:
          return 20;
        case 17:
          return 24;
        case 18:
          return 23;
        case 19:
          return 6;
        case 20:
          return "INVALID";
      }
    }, "anonymous"), rules: [/^(?:%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:timeline[ \t]+LR\b)/i, /^(?:timeline[ \t]+TD\b)/i, /^(?:timeline\b)/i, /^(?:title\s[^\n]+)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:section\s[^:\n]+)/i, /^(?::\s(?:[^:\n]|:(?!\s))+)/i, /^(?:[^#:\n]+)/i, /^(?:$)/i, /^(?:.)/i], conditions: { acc_descr_multiline: { rules: [14, 15], inclusive: false }, acc_descr: { rules: [12], inclusive: false }, acc_title: { rules: [10], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 16, 17, 18, 19, 20], inclusive: true } } };
    return b;
  }();
  g.lexer = x;
  function m2() {
    this.yy = {};
  }
  return m(m2, "Parser"), m2.prototype = g, g.Parser = m2, new m2();
}();
at.parser = at;
var _t = at;
var lt = {};
p(lt, { addEvent: () => Lt, addSection: () => Nt, addTask: () => Mt, addTaskOrg: () => At, clear: () => Tt, default: () => Zt, getCommonDb: () => St, getDirection: () => $t, getSections: () => Ht, getTasks: () => It, setDirection: () => Et });
var K = "";
var vt = 0;
var ot = "LR";
var ct = [];
var Y = [];
var U = [];
var St = m(() => or, "getCommonDb");
var Tt = m(function() {
  ct.length = 0, Y.length = 0, K = "", U.length = 0, ot = "LR", os();
}, "clear");
var Et = m(function(e) {
  ot = e;
}, "setDirection");
var $t = m(function() {
  return ot;
}, "getDirection");
var Nt = m(function(e) {
  K = e, ct.push(e);
}, "addSection");
var Ht = m(function() {
  return ct;
}, "getSections");
var It = m(function() {
  let e = wt(), t = 100, n2 = 0;
  for (; !e && n2 < t; ) e = wt(), n2++;
  return Y.push(...U), Y;
}, "getTasks");
var Mt = m(function(e, t, n2) {
  let a = { id: vt++, section: K, type: K, task: e, score: t || 0, events: n2 ? [n2] : [] };
  U.push(a);
}, "addTask");
var Lt = m(function(e) {
  U.find((n2) => n2.id === vt - 1).events.push(e);
}, "addEvent");
var At = m(function(e) {
  let t = { section: K, type: K, description: e, task: e, classes: [] };
  Y.push(t);
}, "addTaskOrg");
var wt = m(function() {
  let e = m(function(n2) {
    return U[n2].processed;
  }, "compileTask"), t = true;
  for (let [n2, a] of U.entries()) e(n2), t = t && a.processed;
  return t;
}, "compileTasks");
var Zt = { clear: Tt, getCommonDb: St, getDirection: $t, setDirection: Et, addSection: Nt, getSections: Ht, getTasks: It, addTask: Mt, addTaskOrg: At, addEvent: Lt };
var Bt = 0;
var tt = m(function(e, t) {
  let n2 = e.append("rect");
  return n2.attr("x", t.x), n2.attr("y", t.y), n2.attr("fill", t.fill), n2.attr("stroke", t.stroke), n2.attr("width", t.width), n2.attr("height", t.height), n2.attr("rx", t.rx), n2.attr("ry", t.ry), t.class !== void 0 && n2.attr("class", t.class), n2;
}, "drawRect");
var qt = m(function(e, t) {
  let a = e.append("circle").attr("cx", t.cx).attr("cy", t.cy).attr("class", "face").attr("r", 15).attr("stroke-width", 2).attr("overflow", "visible"), r = e.append("g");
  r.append("circle").attr("cx", t.cx - 15 / 3).attr("cy", t.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666"), r.append("circle").attr("cx", t.cx + 15 / 3).attr("cy", t.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666");
  function h(f) {
    let g = ks().startAngle(Math.PI / 2).endAngle(3 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    f.append("path").attr("class", "mouth").attr("d", g).attr("transform", "translate(" + t.cx + "," + (t.cy + 2) + ")");
  }
  m(h, "smile");
  function c2(f) {
    let g = ks().startAngle(3 * Math.PI / 2).endAngle(5 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    f.append("path").attr("class", "mouth").attr("d", g).attr("transform", "translate(" + t.cx + "," + (t.cy + 7) + ")");
  }
  m(c2, "sad");
  function o(f) {
    f.append("line").attr("class", "mouth").attr("stroke", 2).attr("x1", t.cx - 5).attr("y1", t.cy + 7).attr("x2", t.cx + 5).attr("y2", t.cy + 7).attr("class", "mouth").attr("stroke-width", "1px").attr("stroke", "#666");
  }
  return m(o, "ambivalent"), t.score > 3 ? h(r) : t.score < 3 ? c2(r) : o(r), a;
}, "drawFace");
var Jt = m(function(e, t) {
  let n2 = e.append("circle");
  return n2.attr("cx", t.cx), n2.attr("cy", t.cy), n2.attr("class", "actor-" + t.pos), n2.attr("fill", t.fill), n2.attr("stroke", t.stroke), n2.attr("r", t.r), n2.class !== void 0 && n2.attr("class", n2.class), t.title !== void 0 && n2.append("title").text(t.title), n2;
}, "drawCircle");
var Ct = m(function(e, t) {
  let n2 = t.text.replace(/<br\s*\/?>/gi, " "), a = e.append("text");
  a.attr("x", t.x), a.attr("y", t.y), a.attr("class", "legend"), a.style("text-anchor", t.anchor), t.class !== void 0 && a.attr("class", t.class);
  let r = a.append("tspan");
  return r.attr("x", t.x + t.textMargin * 2), r.text(n2), a;
}, "drawText");
var Qt = m(function(e, t) {
  function n2(r, h, c2, o, f) {
    return r + "," + h + " " + (r + c2) + "," + h + " " + (r + c2) + "," + (h + o - f) + " " + (r + c2 - f * 1.2) + "," + (h + o) + " " + r + "," + (h + o);
  }
  m(n2, "genPoints");
  let a = e.append("polygon");
  a.attr("points", n2(t.x, t.y, 50, 20, 7)), a.attr("class", "labelBox"), t.y = t.y + t.labelMargin, t.x = t.x + 0.5 * t.labelMargin, Ct(e, t);
}, "drawLabel");
var Yt = m(function(e, t, n2) {
  let a = e.append("g"), r = dt();
  r.x = t.x, r.y = t.y, r.fill = t.fill, r.width = n2.width, r.height = n2.height, r.class = "journey-section section-type-" + t.num, r.rx = 3, r.ry = 3, tt(a, r), Wt(n2)(t.text, a, r.x, r.y, r.width, r.height, { class: "journey-section section-type-" + t.num }, n2, t.colour);
}, "drawSection");
var ht = -1;
var te = m(function(e, t, n2, a) {
  let r = t.x + n2.width / 2, h = e.append("g");
  ht++, h.append("line").attr("id", a + "-task" + ht).attr("x1", r).attr("y1", t.y).attr("x2", r).attr("y2", 450).attr("class", "task-line").attr("stroke-width", "1px").attr("stroke-dasharray", "4 2").attr("stroke", "#666"), qt(h, { cx: r, cy: 300 + (5 - t.score) * 30, score: t.score });
  let o = dt();
  o.x = t.x, o.y = t.y, o.fill = t.fill, o.width = n2.width, o.height = n2.height, o.class = "task task-type-" + t.num, o.rx = 3, o.ry = 3, tt(h, o), Wt(n2)(t.task, h, o.x, o.y, o.width, o.height, { class: "task" }, n2, t.colour);
}, "drawTask");
var ee = m(function(e, t) {
  tt(e, { x: t.startx, y: t.starty, width: t.stopx - t.startx, height: t.stopy - t.starty, fill: t.fill, class: "rect" }).lower();
}, "drawBackgroundRect");
var ne = m(function() {
  return { x: 0, y: 0, fill: void 0, "text-anchor": "start", width: 100, height: 100, textMargin: 0, rx: 0, ry: 0 };
}, "getTextObj");
var dt = m(function() {
  return { x: 0, y: 0, width: 100, anchor: "start", height: 100, rx: 0, ry: 0 };
}, "getNoteRect");
var Wt = function() {
  function e(r, h, c2, o, f, g, x, m2) {
    let b = h.append("text").attr("x", c2 + f / 2).attr("y", o + g / 2 + 5).style("font-color", m2).style("text-anchor", "middle").text(r);
    a(b, x);
  }
  m(e, "byText");
  function t(r, h, c2, o, f, g, x, m2, b) {
    let { taskFontSize: i, taskFontFamily: d2 } = m2, l = r.split(/<br\s*\/?>/gi);
    for (let p2 = 0; p2 < l.length; p2++) {
      let y = p2 * i - i * (l.length - 1) / 2, u = h.append("text").attr("x", c2 + f / 2).attr("y", o).attr("fill", b).style("text-anchor", "middle").style("font-size", i).style("font-family", d2);
      u.append("tspan").attr("x", c2 + f / 2).attr("dy", y).text(l[p2]), u.attr("y", o + g / 2).attr("dominant-baseline", "central").attr("alignment-baseline", "central"), a(u, x);
    }
  }
  m(t, "byTspan");
  function n2(r, h, c2, o, f, g, x, m2) {
    let b = h.append("switch"), d2 = b.append("foreignObject").attr("x", c2).attr("y", o).attr("width", f).attr("height", g).attr("position", "fixed").append("xhtml:div").style("display", "table").style("height", "100%").style("width", "100%");
    d2.append("div").attr("class", "label").style("display", "table-cell").style("text-align", "center").style("vertical-align", "middle").text(r), t(r, b, c2, o, f, g, x, m2), a(d2, x);
  }
  m(n2, "byFo");
  function a(r, h) {
    for (let c2 in h) c2 in h && r.attr(c2, h[c2]);
  }
  return m(a, "_setTextAttrs"), function(r) {
    return r.textPlacement === "fo" ? n2 : r.textPlacement === "old" ? e : t;
  };
}();
var re = m(function(e, t) {
  Bt = 0, ht = -1, e.append("defs").append("marker").attr("id", t + "-arrowhead").attr("refX", 5).attr("refY", 2).attr("markerWidth", 6).attr("markerHeight", 4).attr("orient", "auto").append("path").attr("d", "M 0,0 V 4 L6,2 Z");
}, "initGraphics");
function Vt(e, t) {
  e.each(function() {
    var n2 = ia(this), a = n2.text().split(/(\s+|<br>)/).reverse(), r, h = [], c2 = 1.1, o = n2.attr("y"), f = parseFloat(n2.attr("dy")), g = n2.text(null).append("tspan").attr("x", 0).attr("y", o).attr("dy", f + "em");
    for (let x = 0; x < a.length; x++) r = a[a.length - 1 - x], h.push(r), g.text(h.join(" ").trim()), (g.node().getComputedTextLength() > t || r === "<br>") && (h.pop(), g.text(h.join(" ").trim()), r === "<br>" ? h = [""] : h = [r], g = n2.append("tspan").attr("x", 0).attr("y", o).attr("dy", c2 + "em").text(r));
  });
}
m(Vt, "wrap");
var ie = m(function(e, t, n2, a, r, h = false) {
  var _a, _b, _c;
  let { theme: c2, look: o } = a, f = c2 == null ? void 0 : c2.includes("redux"), g = ((_a = a == null ? void 0 : a.themeVariables) == null ? void 0 : _a.THEME_COLOR_LIMIT) ?? 12, x = n2 % g - 1, m2 = e.append("g");
  t.section = x, m2.attr("class", (t.class ? t.class + " " : "") + "timeline-node " + ("section-" + x));
  let b = m2.append("g"), i = m2.append("g"), l = i.append("text").text(t.descr).attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle").call(Vt, t.width).node().getBBox(), p2 = ((_b = a.fontSize) == null ? void 0 : _b.replace) ? a.fontSize.replace("px", "") : a.fontSize;
  if (t.height = l.height + p2 * 1.1 * 0.5 + t.padding, t.height = Math.max(t.height, t.maxHeight), t.width = t.width + 2 * t.padding, i.attr("transform", "translate(" + t.width / 2 + ", " + t.padding / 2 + ")"), f && i.attr("transform", `translate(${t.width / 2}, ${h ? t.padding / 2 + 3 : t.padding})`), ae(b, t, x, r, a), o === "neo" && (m2.attr("data-look", "neo"), f)) {
    let y = c2.includes("dark"), u = ((_c = e.node()) == null ? void 0 : _c.ownerSVGElement) ?? e.node(), v = ia(u), k2 = v.attr("id") ?? "", H = k2 ? `${k2}-drop-shadow` : "drop-shadow";
    if (v.select(`#${H}`).empty()) {
      let V = v.select("defs");
      (V.empty() ? v.append("defs") : V).append("filter").attr("id", H).attr("height", "130%").attr("width", "130%").append("feDropShadow").attr("dx", "4").attr("dy", "4").attr("stdDeviation", 0).attr("flood-opacity", y ? "0.2" : "0.06").attr("flood-color", y ? "#FFFFFF" : "#000000");
    }
  }
  return t;
}, "drawNode");
var se = m(function(e, t, n2) {
  var _a;
  let a = e.append("g"), h = a.append("text").text(t.descr).attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle").call(Vt, t.width).node().getBBox(), c2 = ((_a = n2.fontSize) == null ? void 0 : _a.replace) ? n2.fontSize.replace("px", "") : n2.fontSize;
  return a.remove(), h.height + c2 * 1.1 * 0.5 + t.padding;
}, "getVirtualNodeHeight");
var ae = m(function(e, t, n2, a, r) {
  let { theme: h } = r, c2 = (h == null ? void 0 : h.includes("redux")) ? 0 : 5, o = 5, f = c2 > 0 ? `M0 ${t.height - o} v${-t.height + 2 * o} q0,-${c2},${c2},-${c2} h${t.width - 2 * o} q${c2},0,${c2},${c2} v${t.height - o} H0 Z` : `M0 ${t.height - o} v${-(t.height - o)} h${t.width} v${t.height} H0 Z`;
  e.append("path").attr("id", a + "-node-" + Bt++).attr("class", "node-bkg node-" + t.type).attr("d", f), (h == null ? void 0 : h.includes("redux")) || e.append("line").attr("class", "node-line-" + n2).attr("x1", 0).attr("y1", t.height).attr("x2", t.width).attr("y2", t.height);
}, "defaultBkg");
var M = { drawRect: tt, drawCircle: Jt, drawSection: Yt, drawText: Ct, drawLabel: Qt, drawTask: te, drawBackgroundRect: ee, getTextObj: ne, getNoteRect: dt, initGraphics: re, drawNode: ie, getVirtualNodeHeight: se };
var oe = m(function(e, t, n2, a) {
  var _a, _b, _c;
  let r = qo(), { look: h, theme: c2, themeVariables: o } = r, { useGradient: f, gradientStart: g, gradientStop: x } = o, m2 = ((_a = r.timeline) == null ? void 0 : _a.leftMargin) ?? 50;
  pt.debug("timeline", a.db);
  let b = r.securityLevel, i;
  b === "sandbox" && (i = ia("#i" + t));
  let l = (b === "sandbox" ? ia(i.nodes()[0].contentDocument.body) : ia("body")).select("#" + t);
  l.append("g");
  let p2 = a.db.getTasks(), y = a.db.getCommonDb().getDiagramTitle();
  pt.debug("task", p2), M.initGraphics(l, t);
  let u = a.db.getSections();
  pt.debug("sections", u);
  let v = 0, k2 = 0, H = 0, V = 0, R = 50 + m2, O = 50;
  V = 50;
  let L = 0, C = true;
  u.forEach(function($2) {
    let _ = { number: L, descr: $2, section: L, width: 150, padding: 20, maxHeight: v }, E = M.getVirtualNodeHeight(l, _, r);
    pt.debug("sectionHeight before draw", E), v = Math.max(v, E + 20);
  });
  let T = 0, B = 0;
  pt.debug("tasks.length", p2.length);
  for (let [$2, _] of p2.entries()) {
    let E = { number: $2, descr: _, section: _.section, width: 150, padding: 20, maxHeight: k2 }, S = M.getVirtualNodeHeight(l, E, r);
    pt.debug("taskHeight before draw", S), k2 = Math.max(k2, S + 20), T = Math.max(T, _.events.length);
    let I = 0;
    for (let A of _.events) {
      let N = { descr: A, section: _.section, number: _.section, width: 150, padding: 20, maxHeight: 50 };
      I += M.getVirtualNodeHeight(l, N, r);
    }
    _.events.length > 0 && (I += (_.events.length - 1) * 10), B = Math.max(B, I);
  }
  pt.debug("maxSectionHeight before draw", v), pt.debug("maxTaskHeight before draw", k2), u && u.length > 0 ? u.forEach(($2) => {
    let _ = p2.filter((A) => A.section === $2), E = { number: L, descr: $2, section: L, width: 200 * Math.max(_.length, 1) - 50, padding: 20, maxHeight: v };
    pt.debug("sectionNode", E);
    let S = l.append("g"), I = M.drawNode(S, E, L, r, t);
    pt.debug("sectionNode output", I), S.attr("transform", `translate(${R}, ${V})`), O += v + 50, _.length > 0 && Rt(l, _, L, R, O, k2, r, T, B, v, false, t), R += 200 * Math.max(_.length, 1), O = V, L++;
  }) : (C = false, Rt(l, p2, L, R, O, k2, r, T, B, v, true, t));
  let P = l.node().getBBox();
  if (pt.debug("bounds", P), y && l.append("text").text(y).attr("x", h === "neo" ? P.x * 2 + m2 : P.width / 2 - m2).attr("font-size", "4ex").attr("font-weight", "bold").attr("y", 20), H = C ? v + k2 + 150 : k2 + 100, l.append("g").attr("class", "lineWrapper").append("line").attr("x1", m2).attr("y1", H).attr("x2", P.width + 3 * m2).attr("y2", H).attr("stroke-width", 4).attr("stroke", "black").attr("marker-end", `url(#${t}-arrowhead)`), h === "neo" && f && c2 !== "neutral") {
    let $2 = l.select("defs"), E = ($2.empty() ? l.append("defs") : $2).append("linearGradient").attr("id", l.attr("id") + "-gradient").attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    E.append("stop").attr("offset", "0%").attr("stop-color", g).attr("stop-opacity", 1), E.append("stop").attr("offset", "100%").attr("stop-color", x).attr("stop-opacity", 1);
  }
  _o(void 0, l, ((_b = r.timeline) == null ? void 0 : _b.padding) ?? 50, ((_c = r.timeline) == null ? void 0 : _c.useMaxWidth) ?? false);
}, "draw");
var Rt = m(function(e, t, n2, a, r, h, c2, o, f, g, x, m2) {
  var _a;
  for (let b of t) {
    let i = { descr: b.task, section: n2, number: n2, width: 150, padding: 20, maxHeight: h };
    pt.debug("taskNode", i);
    let d2 = e.append("g").attr("class", "taskWrapper"), p2 = M.drawNode(d2, i, n2, c2, m2).height;
    if (pt.debug("taskHeight after draw", p2), d2.attr("transform", `translate(${a}, ${r})`), h = Math.max(h, p2), b.events) {
      let y = e.append("g").attr("class", "lineWrapper"), u = h;
      r += 100, u = u + ce(e, b.events, n2, a, r, c2, m2), r -= 100, y.append("line").attr("x1", a + 190 / 2).attr("y1", r + h).attr("x2", a + 190 / 2).attr("y2", r + h + 100 + f + 100).attr("stroke-width", 2).attr("stroke", "black").attr("marker-end", `url(#${m2}-arrowhead)`).attr("stroke-dasharray", "5,5");
    }
    a = a + 200, x && !((_a = c2.timeline) == null ? void 0 : _a.disableMulticolor) && n2++;
  }
  r = r - 10;
}, "drawTasks");
var ce = m(function(e, t, n2, a, r, h, c2) {
  let o = 0, f = r;
  r = r + 100;
  for (let g of t) {
    let x = { descr: g, section: n2, number: n2, width: 150, padding: 20, maxHeight: 50 };
    pt.debug("eventNode", x);
    let m2 = e.append("g").attr("class", "eventWrapper"), i = M.drawNode(m2, x, n2, h, c2, true).height;
    o = o + i, m2.attr("transform", `translate(${a}, ${r})`), r = r + 10 + i;
  }
  return r = f, o;
}, "drawEvents");
var Pt = { setConf: m(() => {
}, "setConf"), draw: oe };
var et = 200;
var G = 5;
var le = et + G * 2;
var ut = et + 100;
var he = ut + G * 2;
var Ot2 = 10;
var de = 0;
var Ft = 20;
var Dt = 20;
var Gt = 30;
var jt = 50;
var ue = m(function(e, t, n2, a) {
  var _a, _b, _c, _d, _e;
  let r = qo(), h = ((_a = r.timeline) == null ? void 0 : _a.leftMargin) ?? 50;
  pt.debug("timeline", a.db);
  let c2 = d(t);
  c2.append("g");
  let o = a.db.getTasks(), f = a.db.getCommonDb().getDiagramTitle();
  pt.debug("task", o), M.initGraphics(c2);
  let g = a.db.getSections();
  pt.debug("sections", g);
  let x = 0, m2 = 0, b = 50 + h, i = 50, d2 = i, l = b, p2 = le + Dt, y = he + jt, u = l + p2, v = 0, k2 = g && g.length > 0, H = k2 ? u : b + p2, V = Math.max(50, p2 + y - G * 2);
  g.forEach(function($2) {
    let _ = { number: v, descr: $2, section: v, width: V, padding: G, maxHeight: x }, E = M.getVirtualNodeHeight(c2, _, r);
    pt.debug("sectionHeight before draw", E), x = Math.max(x, E);
  });
  let R = 0;
  pt.debug("tasks.length", o.length);
  for (let [$2, _] of o.entries()) {
    let E = { number: $2, descr: _, section: _.section, width: et, padding: G, maxHeight: m2 }, S = M.getVirtualNodeHeight(c2, E, r);
    pt.debug("taskHeight before draw", S), m2 = Math.max(m2, S);
    let I = 0;
    for (let A of _.events) {
      let N = { descr: A, section: _.section, number: _.section, width: ut, padding: G, maxHeight: 50 };
      I += M.getVirtualNodeHeight(c2, N, r);
    }
    _.events.length > 0 && (I += (_.events.length - 1) * Ot2), R = Math.max(R, I) + de;
  }
  pt.debug("maxSectionHeight before draw", x), pt.debug("maxTaskHeight before draw", m2);
  let L = Math.max(m2, R) + Gt;
  k2 ? g.forEach(($2) => {
    let _ = o.filter((z) => z.section === $2), E = { number: v, descr: $2, section: v, width: V, padding: G, maxHeight: x };
    pt.debug("sectionNode", E);
    let S = c2.append("g"), I = M.drawNode(S, E, v, r);
    pt.debug("sectionNode output", I);
    let A = H - p2;
    S.attr("transform", `translate(${A}, ${i})`);
    let N = i + I.height + Ft;
    _.length > 0 && zt(c2, _, v, H, N, m2, r, L, false);
    let nt = _.length, X = I.height + Ft + L * Math.max(nt, 1) - (nt > 0 ? Gt * 2 : 0);
    i += X, v++;
  }) : zt(c2, o, v, H, i, m2, r, L, true);
  let C = (_b = c2.node()) == null ? void 0 : _b.getBBox();
  if (!C) throw new Error("bbox not found");
  if (pt.debug("bounds", C), f) {
    if (c2.append("text").text(f).attr("x", C.width / 2 - h).attr("font-size", "4ex").attr("font-weight", "bold").attr("y", 20), C = (_c = c2.node()) == null ? void 0 : _c.getBBox(), !C) throw new Error("bbox not found");
    pt.debug("bounds after title", C);
  }
  let [T] = $(r.fontSize), B = (T ?? 16) * 2, P = (T ?? 16) * 0.5 + 20, D = c2.append("g").attr("class", "lineWrapper");
  D.append("line").attr("x1", H).attr("y1", d2 - B).attr("x2", H).attr("y2", C.y + C.height + P).attr("stroke-width", 4).attr("stroke", "black").attr("marker-end", "url(#arrowhead)"), D.lower(), _o(void 0, c2, ((_d = r.timeline) == null ? void 0 : _d.padding) ?? 50, ((_e = r.timeline) == null ? void 0 : _e.useMaxWidth) ?? false);
}, "draw");
var zt = m(function(e, t, n2, a, r, h, c2, o, f) {
  var _a;
  for (let g of t) {
    let x = { descr: g.task, section: n2, number: n2, width: et, padding: G, maxHeight: h };
    pt.debug("taskNode", x);
    let m2 = e.append("g").attr("class", "taskWrapper"), b = M.drawNode(m2, x, n2, c2), i = b.height;
    pt.debug("taskHeight after draw", i);
    let d2 = a - Dt - b.width;
    if (m2.attr("transform", `translate(${d2}, ${r})`), h = Math.max(h, i), g.events && g.events.length > 0) {
      let l = r, p2 = a + jt;
      pe(e, g.events, n2, a, p2, l, c2);
    }
    r = r + o, f && !((_a = c2.timeline) == null ? void 0 : _a.disableMulticolor) && n2++;
  }
}, "drawTasks");
var pe = m(function(e, t, n2, a, r, h, c2) {
  let o = h;
  for (let f of t) {
    let g = { descr: f, section: n2, number: n2, width: ut, padding: G, maxHeight: 0 };
    pt.debug("eventNode", g);
    let x = e.append("g").attr("class", "eventWrapper"), b = M.drawNode(x, g, n2, c2).height;
    x.attr("transform", `translate(${r}, ${o})`);
    let i = e.append("g").attr("class", "lineWrapper"), d2 = o + b / 2;
    i.append("line").attr("x1", a).attr("y1", d2).attr("x2", r).attr("y2", d2).attr("stroke-width", 2).attr("stroke", "black").attr("marker-end", "url(#arrowhead)").attr("stroke-dasharray", "5,5"), o = o + b + Ot2;
  }
  return o - h;
}, "drawEvents");
var Kt = { setConf: m(() => {
}, "setConf"), draw: ue };
var ge = m((e) => {
  var _a;
  let { theme: t } = Ot(), n2 = t == null ? void 0 : t.includes("dark"), a = t == null ? void 0 : t.includes("color"), r = ((_a = e.svgId) == null ? void 0 : _a.replace(/^#/, "")) ?? "", h = r ? `url(#${r}-drop-shadow)` : e.dropShadow ?? "none", c2 = "";
  for (let o = 0; o < e.THEME_COLOR_LIMIT; o++) {
    let f = `${17 - 3 * o}`, g = a ? e.borderColorArray[o] : e.mainBkg, x = a ? e.borderColorArray[o] : e.nodeBorder;
    c2 += `
    .section-${o - 1} rect,
    .section-${o - 1} path,
    .section-${o - 1} circle {
      fill: ${n2 && a ? e.mainBkg : g};
      stroke: ${x};
      stroke-width: ${e.strokeWidth};
      filter: ${h};
    }

    .section-${o - 1} text {
      fill: ${e.nodeBorder};
      font-weight: ${e.fontWeight}
    }

    .node-icon-${o - 1} {
      font-size: 40px;
      color: ${e["cScaleLabel" + o]};
    }

    .section-edge-${o - 1} {
      stroke: ${e["cScale" + o]};
    }

    .edge-depth-${o - 1} {
      stroke-width: ${f};
    }

    .section-${o - 1} line {
      stroke: ${e["cScaleInv" + o]};
      stroke-width: 3;
    }

    .lineWrapper line {
      stroke: ${e.nodeBorder};
      stroke-width:${e.strokeWidth}
    }

    .disabled,
    .disabled circle,
    .disabled text {
      fill: ${e.tertiaryColor ?? "lightgray"};
    }

    .disabled text {
      fill: ${e.clusterBorder ?? "#efefef"};
    }
    `;
  }
  return c2;
}, "genReduxSections");
var fe = m((e) => {
  let t = "";
  for (let n2 = 0; n2 < e.THEME_COLOR_LIMIT; n2++) e["lineColor" + n2] = e["lineColor" + n2] || e["cScaleInv" + n2], k(e["lineColor" + n2]) ? e["lineColor" + n2] = c(e["lineColor" + n2], 20) : e["lineColor" + n2] = n(e["lineColor" + n2], 20);
  for (let n2 = 0; n2 < e.THEME_COLOR_LIMIT; n2++) {
    let a = "" + (17 - 3 * n2);
    t += `
    .section-${n2 - 1} rect, .section-${n2 - 1} path, .section-${n2 - 1} circle, .section-${n2 - 1} path  {
      fill: ${e["cScale" + n2]};
    }
    .section-${n2 - 1} text {
     fill: ${e["cScaleLabel" + n2]};
    }
    .node-icon-${n2 - 1} {
      font-size: 40px;
      color: ${e["cScaleLabel" + n2]};
    }
    .section-edge-${n2 - 1}{
      stroke: ${e["cScale" + n2]};
    }
    .edge-depth-${n2 - 1}{
      stroke-width: ${a};
    }
    .section-${n2 - 1} line {
      stroke: ${e["cScaleInv" + n2]} ;
      stroke-width: 3;
    }

    .lineWrapper line{
      stroke: ${e["cScaleLabel" + n2]} ;
    }

    .disabled, .disabled circle, .disabled text {
      fill: ${e.tertiaryColor ?? "lightgray"};
    }
    .disabled text {
      fill: ${e.clusterBorder ?? "#efefef"};
    }
    `;
  }
  return t;
}, "genSections");
var me = m((e) => {
  var _a;
  let { theme: t } = Ot(), n2 = t == null ? void 0 : t.includes("redux"), a = t === "neutral", r = ((_a = e.svgId) == null ? void 0 : _a.replace(/^#/, "")) ?? "", h = "";
  if (e.useGradient && r && e.THEME_COLOR_LIMIT && !a) for (let c2 = 0; c2 < e.THEME_COLOR_LIMIT; c2++) h += `
      .section-${c2 - 1}[data-look="neo"] rect,
      .section-${c2 - 1}[data-look="neo"] path,
      .section-${c2 - 1}[data-look="neo"] circle {
        fill: ${e.mainBkg};
        stroke: url(#${r}-gradient);
        stroke-width: 2;
      }
      .section-${c2 - 1}[data-look="neo"] line {
        stroke: url(#${r}-gradient);
        stroke-width: 2;
      }`;
  return `
  .edge {
    stroke-width: 3;
  }
  ${n2 ? ge(e) : fe(e)}
  ${h}
  .section-root rect, .section-root path, .section-root circle  {
    fill: ${e.git0};
  }
  .section-root text {
    fill: ${e.gitBranchLabel0};
  }
  .icon-container {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edge {
    fill: none;
  }
  .eventWrapper  {
   filter: brightness(120%);
  }
`;
}, "getStyles");
var Ut = me;
var ye = { setConf: m(() => {
}, "setConf"), draw: m((e, t, n2, a) => {
  var _a, _b;
  return (((_b = (_a = a == null ? void 0 : a.db) == null ? void 0 : _a.getDirection) == null ? void 0 : _b.call(_a)) ?? "LR") === "TD" ? Kt.draw(e, t, n2, a) : Pt.draw(e, t, n2, a);
}, "draw") };
var Ue = { db: lt, renderer: ye, parser: _t, styles: Ut };
export {
  Ue as diagram
};
//# sourceMappingURL=timeline-definition-5SPVSISX-AN433M25.js.map

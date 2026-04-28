import {
  o
} from "./chunk-NFYNFPBA.js";
import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Ar,
  gr
} from "./chunk-YYFVCIEQ.js";
import {
  Cr,
  Fg,
  Wg
} from "./chunk-OB6FDEYX.js";
import "./chunk-KKUK5XSX.js";
import "./chunk-37DMPFOG.js";
import "./chunk-BIOJLABG.js";
import "./chunk-GYGMMI4F.js";
import "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  _o,
  c,
  k,
  n,
  oo,
  qo,
  st
} from "./chunk-HPIGS4CQ.js";
import {
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/kanban-definition-LJHFXRCJ.mjs
var ie = function() {
  var e = m(function(v, i, n2, s) {
    for (n2 = n2 || {}, s = v.length; s--; n2[v[s]] = i) ;
    return n2;
  }, "o"), g = [1, 4], p = [1, 13], r = [1, 12], d2 = [1, 15], k2 = [1, 16], y = [1, 20], l = [1, 19], L = [6, 7, 8], C = [1, 26], u = [1, 24], w = [1, 25], E = [6, 7, 11], K = [1, 31], N = [6, 7, 11, 24], M = [1, 6, 13, 16, 17, 20, 23], f = [1, 35], A = [1, 36], O = [1, 6, 7, 11, 13, 16, 17, 20, 23], U = [1, 38], T = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, mindMap: 4, spaceLines: 5, SPACELINE: 6, NL: 7, KANBAN: 8, document: 9, stop: 10, EOF: 11, statement: 12, SPACELIST: 13, node: 14, shapeData: 15, ICON: 16, CLASS: 17, nodeWithId: 18, nodeWithoutId: 19, NODE_DSTART: 20, NODE_DESCR: 21, NODE_DEND: 22, NODE_ID: 23, SHAPE_DATA: 24, $accept: 0, $end: 1 }, terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "KANBAN", 11: "EOF", 13: "SPACELIST", 16: "ICON", 17: "CLASS", 20: "NODE_DSTART", 21: "NODE_DESCR", 22: "NODE_DEND", 23: "NODE_ID", 24: "SHAPE_DATA" }, productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 3], [12, 2], [12, 2], [12, 2], [12, 1], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [14, 1], [14, 1], [19, 3], [18, 1], [18, 4], [15, 2], [15, 1]], performAction: m(function(i, n2, s, a, h, t, R) {
    var c2 = t.length - 1;
    switch (h) {
      case 6:
      case 7:
        return a;
      case 8:
        a.getLogger().trace("Stop NL ");
        break;
      case 9:
        a.getLogger().trace("Stop EOF ");
        break;
      case 11:
        a.getLogger().trace("Stop NL2 ");
        break;
      case 12:
        a.getLogger().trace("Stop EOF2 ");
        break;
      case 15:
        a.getLogger().info("Node: ", t[c2 - 1].id), a.addNode(t[c2 - 2].length, t[c2 - 1].id, t[c2 - 1].descr, t[c2 - 1].type, t[c2]);
        break;
      case 16:
        a.getLogger().info("Node: ", t[c2].id), a.addNode(t[c2 - 1].length, t[c2].id, t[c2].descr, t[c2].type);
        break;
      case 17:
        a.getLogger().trace("Icon: ", t[c2]), a.decorateNode({ icon: t[c2] });
        break;
      case 18:
      case 23:
        a.decorateNode({ class: t[c2] });
        break;
      case 19:
        a.getLogger().trace("SPACELIST");
        break;
      case 20:
        a.getLogger().trace("Node: ", t[c2 - 1].id), a.addNode(0, t[c2 - 1].id, t[c2 - 1].descr, t[c2 - 1].type, t[c2]);
        break;
      case 21:
        a.getLogger().trace("Node: ", t[c2].id), a.addNode(0, t[c2].id, t[c2].descr, t[c2].type);
        break;
      case 22:
        a.decorateNode({ icon: t[c2] });
        break;
      case 27:
        a.getLogger().trace("node found ..", t[c2 - 2]), this.$ = { id: t[c2 - 1], descr: t[c2 - 1], type: a.getType(t[c2 - 2], t[c2]) };
        break;
      case 28:
        this.$ = { id: t[c2], descr: t[c2], type: 0 };
        break;
      case 29:
        a.getLogger().trace("node found ..", t[c2 - 3]), this.$ = { id: t[c2 - 3], descr: t[c2 - 1], type: a.getType(t[c2 - 2], t[c2]) };
        break;
      case 30:
        this.$ = t[c2 - 1] + t[c2];
        break;
      case 31:
        this.$ = t[c2];
        break;
    }
  }, "anonymous"), table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: g }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: g }, { 6: p, 7: [1, 10], 9: 9, 12: 11, 13: r, 14: 14, 16: d2, 17: k2, 18: 17, 19: 18, 20: y, 23: l }, e(L, [2, 3]), { 1: [2, 2] }, e(L, [2, 4]), e(L, [2, 5]), { 1: [2, 6], 6: p, 12: 21, 13: r, 14: 14, 16: d2, 17: k2, 18: 17, 19: 18, 20: y, 23: l }, { 6: p, 9: 22, 12: 11, 13: r, 14: 14, 16: d2, 17: k2, 18: 17, 19: 18, 20: y, 23: l }, { 6: C, 7: u, 10: 23, 11: w }, e(E, [2, 24], { 18: 17, 19: 18, 14: 27, 16: [1, 28], 17: [1, 29], 20: y, 23: l }), e(E, [2, 19]), e(E, [2, 21], { 15: 30, 24: K }), e(E, [2, 22]), e(E, [2, 23]), e(N, [2, 25]), e(N, [2, 26]), e(N, [2, 28], { 20: [1, 32] }), { 21: [1, 33] }, { 6: C, 7: u, 10: 34, 11: w }, { 1: [2, 7], 6: p, 12: 21, 13: r, 14: 14, 16: d2, 17: k2, 18: 17, 19: 18, 20: y, 23: l }, e(M, [2, 14], { 7: f, 11: A }), e(O, [2, 8]), e(O, [2, 9]), e(O, [2, 10]), e(E, [2, 16], { 15: 37, 24: K }), e(E, [2, 17]), e(E, [2, 18]), e(E, [2, 20], { 24: U }), e(N, [2, 31]), { 21: [1, 39] }, { 22: [1, 40] }, e(M, [2, 13], { 7: f, 11: A }), e(O, [2, 11]), e(O, [2, 12]), e(E, [2, 15], { 24: U }), e(N, [2, 30]), { 22: [1, 41] }, e(N, [2, 27]), e(N, [2, 29])], defaultActions: { 2: [2, 1], 6: [2, 2] }, parseError: m(function(i, n2) {
    if (n2.recoverable) this.trace(i);
    else {
      var s = new Error(i);
      throw s.hash = n2, s;
    }
  }, "parseError"), parse: m(function(i) {
    var n2 = this, s = [0], a = [], h = [null], t = [], R = this.table, c2 = "", z = 0, ae = 0, ce = 0, xe = 2, le = 1, Le = t.slice.call(arguments, 1), b = Object.create(this.lexer), P = { yy: {} };
    for (var q in this.yy) Object.prototype.hasOwnProperty.call(this.yy, q) && (P.yy[q] = this.yy[q]);
    b.setInput(i, P.yy), P.yy.lexer = b, P.yy.parser = this, typeof b.yylloc > "u" && (b.yylloc = {});
    var Q = b.yylloc;
    t.push(Q);
    var Oe = b.options && b.options.ranges;
    typeof P.yy.parseError == "function" ? this.parseError = P.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function Ue(S) {
      s.length = s.length - 2 * S, h.length = h.length - S, t.length = t.length - S;
    }
    m(Ue, "popStack");
    function ve() {
      var S;
      return S = a.pop() || b.lex() || le, typeof S != "number" && (S instanceof Array && (a = S, S = a.pop()), S = n2.symbols_[S] || S), S;
    }
    m(ve, "lex");
    for (var _, Z, j, D, He, $, G = {}, X, I, he, Y; ; ) {
      if (j = s[s.length - 1], this.defaultActions[j] ? D = this.defaultActions[j] : ((_ === null || typeof _ > "u") && (_ = ve()), D = R[j] && R[j][_]), typeof D > "u" || !D.length || !D[0]) {
        var ee = "";
        Y = [];
        for (X in R[j]) this.terminals_[X] && X > xe && Y.push("'" + this.terminals_[X] + "'");
        b.showPosition ? ee = "Parse error on line " + (z + 1) + `:
` + b.showPosition() + `
Expecting ` + Y.join(", ") + ", got '" + (this.terminals_[_] || _) + "'" : ee = "Parse error on line " + (z + 1) + ": Unexpected " + (_ == le ? "end of input" : "'" + (this.terminals_[_] || _) + "'"), this.parseError(ee, { text: b.match, token: this.terminals_[_] || _, line: b.yylineno, loc: Q, expected: Y });
      }
      if (D[0] instanceof Array && D.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + j + ", token: " + _);
      switch (D[0]) {
        case 1:
          s.push(_), h.push(b.yytext), t.push(b.yylloc), s.push(D[1]), _ = null, Z ? (_ = Z, Z = null) : (ae = b.yyleng, c2 = b.yytext, z = b.yylineno, Q = b.yylloc, ce > 0 && ce--);
          break;
        case 2:
          if (I = this.productions_[D[1]][1], G.$ = h[h.length - I], G._$ = { first_line: t[t.length - (I || 1)].first_line, last_line: t[t.length - 1].last_line, first_column: t[t.length - (I || 1)].first_column, last_column: t[t.length - 1].last_column }, Oe && (G._$.range = [t[t.length - (I || 1)].range[0], t[t.length - 1].range[1]]), $ = this.performAction.apply(G, [c2, ae, z, P.yy, D[1], h, t].concat(Le)), typeof $ < "u") return $;
          I && (s = s.slice(0, -1 * I * 2), h = h.slice(0, -1 * I), t = t.slice(0, -1 * I)), s.push(this.productions_[D[1]][0]), h.push(G.$), t.push(G._$), he = R[s[s.length - 2]][s[s.length - 1]], s.push(he);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, J = function() {
    var v = { EOF: 1, parseError: m(function(n2, s) {
      if (this.yy.parser) this.yy.parser.parseError(n2, s);
      else throw new Error(n2);
    }, "parseError"), setInput: m(function(i, n2) {
      return this.yy = n2 || this.yy || {}, this._input = i, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var i = this._input[0];
      this.yytext += i, this.yyleng++, this.offset++, this.match += i, this.matched += i;
      var n2 = i.match(/(?:\r\n?|\n).*/g);
      return n2 ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), i;
    }, "input"), unput: m(function(i) {
      var n2 = i.length, s = i.split(/(?:\r\n?|\n)/g);
      this._input = i + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - n2), this.offset -= n2;
      var a = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), s.length - 1 && (this.yylineno -= s.length - 1);
      var h = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: s ? (s.length === a.length ? this.yylloc.first_column : 0) + a[a.length - s.length].length - s[0].length : this.yylloc.first_column - n2 }, this.options.ranges && (this.yylloc.range = [h[0], h[0] + this.yyleng - n2]), this.yyleng = this.yytext.length, this;
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
      var i = this.pastInput(), n2 = new Array(i.length + 1).join("-");
      return i + this.upcomingInput() + `
` + n2 + "^";
    }, "showPosition"), test_match: m(function(i, n2) {
      var s, a, h;
      if (this.options.backtrack_lexer && (h = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (h.yylloc.range = this.yylloc.range.slice(0))), a = i[0].match(/(?:\r\n?|\n).*/g), a && (this.yylineno += a.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: a ? a[a.length - 1].length - a[a.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + i[0].length }, this.yytext += i[0], this.match += i[0], this.matches = i, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(i[0].length), this.matched += i[0], s = this.performAction.call(this, this.yy, this, n2, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), s) return s;
      if (this._backtrack) {
        for (var t in h) this[t] = h[t];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var i, n2, s, a;
      this._more || (this.yytext = "", this.match = "");
      for (var h = this._currentRules(), t = 0; t < h.length; t++) if (s = this._input.match(this.rules[h[t]]), s && (!n2 || s[0].length > n2[0].length)) {
        if (n2 = s, a = t, this.options.backtrack_lexer) {
          if (i = this.test_match(s, h[t]), i !== false) return i;
          if (this._backtrack) {
            n2 = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return n2 ? (i = this.test_match(n2, h[a]), i !== false ? i : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var n2 = this.next();
      return n2 || this.lex();
    }, "lex"), begin: m(function(n2) {
      this.conditionStack.push(n2);
    }, "begin"), popState: m(function() {
      var n2 = this.conditionStack.length - 1;
      return n2 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(n2) {
      return n2 = this.conditionStack.length - 1 - Math.abs(n2 || 0), n2 >= 0 ? this.conditionStack[n2] : "INITIAL";
    }, "topState"), pushState: m(function(n2) {
      this.begin(n2);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(n2, s, a, h) {
      var t = h;
      switch (a) {
        case 0:
          return this.pushState("shapeData"), s.yytext = "", 24;
          break;
        case 1:
          return this.pushState("shapeDataStr"), 24;
          break;
        case 2:
          return this.popState(), 24;
          break;
        case 3:
          let R = /\n\s*/g;
          return s.yytext = s.yytext.replace(R, "<br/>"), 24;
          break;
        case 4:
          return 24;
        case 5:
          this.popState();
          break;
        case 6:
          return n2.getLogger().trace("Found comment", s.yytext), 6;
          break;
        case 7:
          return 8;
        case 8:
          this.begin("CLASS");
          break;
        case 9:
          return this.popState(), 17;
          break;
        case 10:
          this.popState();
          break;
        case 11:
          n2.getLogger().trace("Begin icon"), this.begin("ICON");
          break;
        case 12:
          return n2.getLogger().trace("SPACELINE"), 6;
          break;
        case 13:
          return 7;
        case 14:
          return 16;
        case 15:
          n2.getLogger().trace("end icon"), this.popState();
          break;
        case 16:
          return n2.getLogger().trace("Exploding node"), this.begin("NODE"), 20;
          break;
        case 17:
          return n2.getLogger().trace("Cloud"), this.begin("NODE"), 20;
          break;
        case 18:
          return n2.getLogger().trace("Explosion Bang"), this.begin("NODE"), 20;
          break;
        case 19:
          return n2.getLogger().trace("Cloud Bang"), this.begin("NODE"), 20;
          break;
        case 20:
          return this.begin("NODE"), 20;
          break;
        case 21:
          return this.begin("NODE"), 20;
          break;
        case 22:
          return this.begin("NODE"), 20;
          break;
        case 23:
          return this.begin("NODE"), 20;
          break;
        case 24:
          return 13;
        case 25:
          return 23;
        case 26:
          return 11;
        case 27:
          this.begin("NSTR2");
          break;
        case 28:
          return "NODE_DESCR";
        case 29:
          this.popState();
          break;
        case 30:
          n2.getLogger().trace("Starting NSTR"), this.begin("NSTR");
          break;
        case 31:
          return n2.getLogger().trace("description:", s.yytext), "NODE_DESCR";
          break;
        case 32:
          this.popState();
          break;
        case 33:
          return this.popState(), n2.getLogger().trace("node end ))"), "NODE_DEND";
          break;
        case 34:
          return this.popState(), n2.getLogger().trace("node end )"), "NODE_DEND";
          break;
        case 35:
          return this.popState(), n2.getLogger().trace("node end ...", s.yytext), "NODE_DEND";
          break;
        case 36:
          return this.popState(), n2.getLogger().trace("node end (("), "NODE_DEND";
          break;
        case 37:
          return this.popState(), n2.getLogger().trace("node end (-"), "NODE_DEND";
          break;
        case 38:
          return this.popState(), n2.getLogger().trace("node end (-"), "NODE_DEND";
          break;
        case 39:
          return this.popState(), n2.getLogger().trace("node end (("), "NODE_DEND";
          break;
        case 40:
          return this.popState(), n2.getLogger().trace("node end (("), "NODE_DEND";
          break;
        case 41:
          return n2.getLogger().trace("Long description:", s.yytext), 21;
          break;
        case 42:
          return n2.getLogger().trace("Long description:", s.yytext), 21;
          break;
      }
    }, "anonymous"), rules: [/^(?:@\{)/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^\"]+)/i, /^(?:[^}^"]+)/i, /^(?:\})/i, /^(?:\s*%%.*)/i, /^(?:kanban\b)/i, /^(?::::)/i, /^(?:.+)/i, /^(?:\n)/i, /^(?:::icon\()/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[^\)]+)/i, /^(?:\))/i, /^(?:-\))/i, /^(?:\(-)/i, /^(?:\)\))/i, /^(?:\))/i, /^(?:\(\()/i, /^(?:\{\{)/i, /^(?:\()/i, /^(?:\[)/i, /^(?:[\s]+)/i, /^(?:[^\(\[\n\)\{\}@]+)/i, /^(?:$)/i, /^(?:["][`])/i, /^(?:[^`"]+)/i, /^(?:[`]["])/i, /^(?:["])/i, /^(?:[^"]+)/i, /^(?:["])/i, /^(?:[\)]\))/i, /^(?:[\)])/i, /^(?:[\]])/i, /^(?:\}\})/i, /^(?:\(-)/i, /^(?:-\))/i, /^(?:\(\()/i, /^(?:\()/i, /^(?:[^\)\]\(\}]+)/i, /^(?:.+(?!\(\())/i], conditions: { shapeDataEndBracket: { rules: [], inclusive: false }, shapeDataStr: { rules: [2, 3], inclusive: false }, shapeData: { rules: [1, 4, 5], inclusive: false }, CLASS: { rules: [9, 10], inclusive: false }, ICON: { rules: [14, 15], inclusive: false }, NSTR2: { rules: [28, 29], inclusive: false }, NSTR: { rules: [31, 32], inclusive: false }, NODE: { rules: [27, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], inclusive: false }, INITIAL: { rules: [0, 6, 7, 8, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], inclusive: true } } };
    return v;
  }();
  T.lexer = J;
  function H() {
    this.yy = {};
  }
  return m(H, "Parser"), H.prototype = T, T.Parser = H, new H();
}();
ie.parser = ie;
var Ee = ie;
var x = [];
var se = [];
var re = 0;
var oe = {};
var Ce = m(() => {
  x = [], se = [], re = 0, oe = {};
}, "clear");
var Ie = m((e) => {
  if (x.length === 0) return null;
  let g = x[0].level, p = null;
  for (let r = x.length - 1; r >= 0; r--) if (x[r].level === g && !p && (p = x[r]), x[r].level < g) throw new Error('Items without section detected, found section ("' + x[r].label + '")');
  return e === (p == null ? void 0 : p.level) ? null : p;
}, "getSection");
var _e = m(function() {
  return se;
}, "getSections");
var we = m(function() {
  let e = [], g = [], p = _e(), r = qo();
  for (let d2 of p) {
    let k2 = { id: d2.id, label: st(d2.label ?? "", r), labelType: "markdown", isGroup: true, ticket: d2.ticket, shape: "kanbanSection", level: d2.level, look: r.look };
    g.push(k2);
    let y = x.filter((l) => l.parentId === d2.id);
    for (let l of y) {
      let L = { id: l.id, parentId: d2.id, label: st(l.label ?? "", r), labelType: "markdown", isGroup: false, ticket: l == null ? void 0 : l.ticket, priority: l == null ? void 0 : l.priority, assigned: l == null ? void 0 : l.assigned, icon: l == null ? void 0 : l.icon, shape: "kanbanItem", level: l.level, rx: 5, ry: 5, cssStyles: ["text-align: left"] };
      g.push(L);
    }
  }
  return { nodes: g, edges: e, other: {}, config: qo() };
}, "getData");
var Ae = m((e, g, p, r, d2) => {
  var _a, _b;
  let k2 = qo(), y = ((_a = k2.mindmap) == null ? void 0 : _a.padding) ?? oo.mindmap.padding;
  switch (r) {
    case m2.ROUNDED_RECT:
    case m2.RECT:
    case m2.HEXAGON:
      y *= 2;
  }
  let l = { id: st(g, k2) || "kbn" + re++, level: e, label: st(p, k2), width: ((_b = k2.mindmap) == null ? void 0 : _b.maxNodeWidth) ?? oo.mindmap.maxNodeWidth, padding: y, isGroup: false };
  if (d2 !== void 0) {
    let C;
    d2.includes(`
`) ? C = d2 + `
` : C = `{
` + d2 + `
}`;
    let u = Ar(C, { schema: gr });
    if (u.shape && (u.shape !== u.shape.toLowerCase() || u.shape.includes("_"))) throw new Error(`No such shape: ${u.shape}. Shape names should be lowercase.`);
    (u == null ? void 0 : u.shape) && u.shape === "kanbanItem" && (l.shape = u == null ? void 0 : u.shape), (u == null ? void 0 : u.label) && (l.label = u == null ? void 0 : u.label), (u == null ? void 0 : u.icon) && (l.icon = u == null ? void 0 : u.icon.toString()), (u == null ? void 0 : u.assigned) && (l.assigned = u == null ? void 0 : u.assigned.toString()), (u == null ? void 0 : u.ticket) && (l.ticket = u == null ? void 0 : u.ticket.toString()), (u == null ? void 0 : u.priority) && (l.priority = u == null ? void 0 : u.priority);
  }
  let L = Ie(e);
  L ? l.parentId = L.id || "kbn" + re++ : se.push(l), x.push(l);
}, "addNode");
var m2 = { DEFAULT: 0, NO_BORDER: 0, ROUNDED_RECT: 1, RECT: 2, CIRCLE: 3, CLOUD: 4, BANG: 5, HEXAGON: 6 };
var Te = m((e, g) => {
  switch (pt.debug("In get type", e, g), e) {
    case "[":
      return m2.RECT;
    case "(":
      return g === ")" ? m2.ROUNDED_RECT : m2.CLOUD;
    case "((":
      return m2.CIRCLE;
    case ")":
      return m2.CLOUD;
    case "))":
      return m2.BANG;
    case "{{":
      return m2.HEXAGON;
    default:
      return m2.DEFAULT;
  }
}, "getType");
var Re = m((e, g) => {
  oe[e] = g;
}, "setElementForId");
var Pe = m((e) => {
  if (!e) return;
  let g = qo(), p = x[x.length - 1];
  e.icon && (p.icon = st(e.icon, g)), e.class && (p.cssClasses = st(e.class, g));
}, "decorateNode");
var je = m((e) => {
  switch (e) {
    case m2.DEFAULT:
      return "no-border";
    case m2.RECT:
      return "rect";
    case m2.ROUNDED_RECT:
      return "rounded-rect";
    case m2.CIRCLE:
      return "circle";
    case m2.CLOUD:
      return "cloud";
    case m2.BANG:
      return "bang";
    case m2.HEXAGON:
      return "hexgon";
    default:
      return "no-border";
  }
}, "type2Str");
var Be = m(() => pt, "getLogger");
var Ve = m((e) => oe[e], "getElementById");
var Me = { clear: Ce, addNode: Ae, getSections: _e, getData: we, nodeType: m2, getType: Te, setElementForId: Re, decorateNode: Pe, type2Str: je, getLogger: Be, getElementById: Ve };
var Se = Me;
var Ge = m(async (e, g, p, r) => {
  var _a, _b, _c, _d, _e2;
  pt.debug(`Rendering kanban diagram
` + e);
  let k2 = r.db.getData(), y = qo();
  y.htmlLabels = false;
  let l = d(g);
  for (let f of k2.nodes) f.domId = `${g}-${f.id}`;
  let L = l.append("g");
  L.attr("class", "sections");
  let C = l.append("g");
  C.attr("class", "items");
  let u = k2.nodes.filter((f) => f.isGroup), w = 0, E = 10, K = [], N = 25;
  for (let f of u) {
    let A = ((_a = y == null ? void 0 : y.kanban) == null ? void 0 : _a.sectionWidth) || 200;
    w = w + 1, f.x = A * w + (w - 1) * E / 2, f.width = A, f.y = 0, f.height = A * 3, f.rx = 5, f.ry = 5, f.cssClasses = f.cssClasses + " section-" + w;
    let O = await Cr(L, f);
    N = Math.max(N, (_b = O == null ? void 0 : O.labelBBox) == null ? void 0 : _b.height), K.push(O);
  }
  let M = 0;
  for (let f of u) {
    let A = K[M];
    M = M + 1;
    let O = ((_c = y == null ? void 0 : y.kanban) == null ? void 0 : _c.sectionWidth) || 200, U = -O * 3 / 2 + N, T = U, J = k2.nodes.filter((i) => i.parentId === f.id);
    for (let i of J) {
      if (i.isGroup) throw new Error("Groups within groups are not allowed in Kanban diagrams");
      i.x = f.x, i.width = O - 1.5 * E;
      let s = (await Wg(C, i, { config: y })).node().getBBox();
      i.y = T + s.height / 2, await Fg(i), T = i.y + s.height / 2 + E / 2;
    }
    let H = A.cluster.select("rect"), v = Math.max(T - U + 3 * E, 50) + (N - 25);
    H.attr("height", v);
  }
  _o(void 0, l, ((_d = y.mindmap) == null ? void 0 : _d.padding) ?? oo.kanban.padding, ((_e2 = y.mindmap) == null ? void 0 : _e2.useMaxWidth) ?? oo.kanban.useMaxWidth);
}, "draw");
var Ne = { draw: Ge };
var Fe = m((e) => {
  let g = "";
  for (let r = 0; r < e.THEME_COLOR_LIMIT; r++) e["lineColor" + r] = e["lineColor" + r] || e["cScaleInv" + r], k(e["lineColor" + r]) ? e["lineColor" + r] = c(e["lineColor" + r], 20) : e["lineColor" + r] = n(e["lineColor" + r], 20);
  let p = m((r, d2) => e.darkMode ? n(r, d2) : c(r, d2), "adjuster");
  for (let r = 0; r < e.THEME_COLOR_LIMIT; r++) {
    let d2 = "" + (17 - 3 * r);
    g += `
    .section-${r - 1} rect, .section-${r - 1} path, .section-${r - 1} circle, .section-${r - 1} polygon, .section-${r - 1} path  {
      fill: ${p(e["cScale" + r], 10)};
      stroke: ${p(e["cScale" + r], 10)};

    }
    .section-${r - 1} text {
     fill: ${e["cScaleLabel" + r]};
    }
    .node-icon-${r - 1} {
      font-size: 40px;
      color: ${e["cScaleLabel" + r]};
    }
    .section-edge-${r - 1}{
      stroke: ${e["cScale" + r]};
    }
    .edge-depth-${r - 1}{
      stroke-width: ${d2};
    }
    .section-${r - 1} line {
      stroke: ${e["cScaleInv" + r]} ;
      stroke-width: 3;
    }

    .disabled, .disabled circle, .disabled text {
      fill: lightgray;
    }
    .disabled text {
      fill: #efefef;
    }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.background};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }

  .kanban-ticket-link {
    fill: ${e.background};
    stroke: ${e.nodeBorder};
    text-decoration: underline;
  }
    `;
  }
  return g;
}, "genSections");
var Ke = m((e) => `
  .edge {
    stroke-width: 3;
  }
  ${Fe(e)}
  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {
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
  .cluster-label, .label {
    color: ${e.textColor};
    fill: ${e.textColor};
    }
  .kanban-label {
    dy: 1em;
    alignment-baseline: middle;
    text-anchor: middle;
    dominant-baseline: middle;
    text-align: center;
  }
    ${o()}
`, "getStyles");
var De = Ke;
var bt = { db: Se, renderer: Ne, parser: Ee, styles: De };
export {
  bt as diagram
};
//# sourceMappingURL=kanban-definition-LJHFXRCJ-YDYOWYCA.js.map

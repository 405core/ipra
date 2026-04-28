import {
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Vt
} from "./chunk-37DMPFOG.js";
import {
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  as,
  c,
  de,
  es,
  hs,
  is,
  k,
  ls,
  n,
  ns,
  oo,
  os,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  ia
} from "./chunk-LKDN26KO.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/vennDiagram-IE5QUKF5.mjs
var ut = function() {
  var t = m(function(D, x, b, k2) {
    for (b = b || {}, k2 = D.length; k2--; b[D[k2]] = x) ;
    return b;
  }, "o"), n2 = [5, 8], s = [7, 8, 11, 12, 17, 19, 22, 24], e = [1, 17], i = [1, 18], r = [7, 8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 24, 27], a = [1, 31], c2 = [1, 39], h = [7, 8, 11, 12, 17, 19, 22, 24, 27], u = [1, 57], o = [1, 56], p = [1, 58], g = [1, 59], v = [1, 60], y = [7, 8, 11, 12, 16, 17, 19, 20, 22, 24, 27, 31, 32, 33], S = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, optNewlines: 4, VENN: 5, document: 6, EOF: 7, NEWLINE: 8, line: 9, statement: 10, TITLE: 11, SET: 12, identifier: 13, BRACKET_LABEL: 14, COLON: 15, NUMERIC: 16, UNION: 17, identifierList: 18, TEXT: 19, IDENTIFIER: 20, STRING: 21, INDENT_TEXT: 22, indentedTextTail: 23, STYLE: 24, stylesOpt: 25, styleField: 26, COMMA: 27, styleValue: 28, valueTokens: 29, valueToken: 30, HEXCOLOR: 31, RGBCOLOR: 32, RGBACOLOR: 33, $accept: 0, $end: 1 }, terminals_: { 2: "error", 5: "VENN", 7: "EOF", 8: "NEWLINE", 11: "TITLE", 12: "SET", 14: "BRACKET_LABEL", 15: "COLON", 16: "NUMERIC", 17: "UNION", 19: "TEXT", 20: "IDENTIFIER", 21: "STRING", 22: "INDENT_TEXT", 24: "STYLE", 27: "COMMA", 31: "HEXCOLOR", 32: "RGBCOLOR", 33: "RGBACOLOR" }, productions_: [0, [3, 4], [4, 0], [4, 2], [6, 0], [6, 2], [9, 1], [9, 1], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 2], [10, 3], [10, 4], [10, 5], [10, 3], [10, 3], [10, 3], [10, 4], [10, 4], [10, 2], [10, 3], [23, 1], [23, 1], [23, 1], [23, 2], [23, 2], [25, 1], [25, 3], [26, 3], [28, 1], [28, 1], [29, 1], [29, 2], [30, 1], [30, 1], [30, 1], [30, 1], [30, 1], [18, 1], [18, 3], [13, 1], [13, 1]], performAction: m(function(x, b, k2, l, m2, f, V) {
    var I = f.length - 1;
    switch (m2) {
      case 1:
        return f[I - 1];
      case 2:
      case 3:
      case 4:
        this.$ = [];
        break;
      case 5:
        f[I - 1].push(f[I]), this.$ = f[I - 1];
        break;
      case 6:
        this.$ = [];
        break;
      case 7:
      case 22:
      case 32:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
        this.$ = f[I];
        break;
      case 8:
        l.setDiagramTitle(f[I].substr(6)), this.$ = f[I].substr(6);
        break;
      case 9:
        l.addSubsetData([f[I]], void 0, void 0), l.setIndentMode && l.setIndentMode(true);
        break;
      case 10:
        l.addSubsetData([f[I - 1]], f[I], void 0), l.setIndentMode && l.setIndentMode(true);
        break;
      case 11:
        l.addSubsetData([f[I - 2]], void 0, parseFloat(f[I])), l.setIndentMode && l.setIndentMode(true);
        break;
      case 12:
        l.addSubsetData([f[I - 3]], f[I - 2], parseFloat(f[I])), l.setIndentMode && l.setIndentMode(true);
        break;
      case 13:
        if (f[I].length < 2) throw new Error("union requires multiple identifiers");
        l.validateUnionIdentifiers && l.validateUnionIdentifiers(f[I]), l.addSubsetData(f[I], void 0, void 0), l.setIndentMode && l.setIndentMode(true);
        break;
      case 14:
        if (f[I - 1].length < 2) throw new Error("union requires multiple identifiers");
        l.validateUnionIdentifiers && l.validateUnionIdentifiers(f[I - 1]), l.addSubsetData(f[I - 1], f[I], void 0), l.setIndentMode && l.setIndentMode(true);
        break;
      case 15:
        if (f[I - 2].length < 2) throw new Error("union requires multiple identifiers");
        l.validateUnionIdentifiers && l.validateUnionIdentifiers(f[I - 2]), l.addSubsetData(f[I - 2], void 0, parseFloat(f[I])), l.setIndentMode && l.setIndentMode(true);
        break;
      case 16:
        if (f[I - 3].length < 2) throw new Error("union requires multiple identifiers");
        l.validateUnionIdentifiers && l.validateUnionIdentifiers(f[I - 3]), l.addSubsetData(f[I - 3], f[I - 2], parseFloat(f[I])), l.setIndentMode && l.setIndentMode(true);
        break;
      case 17:
      case 18:
      case 19:
        l.addTextData(f[I - 1], f[I], void 0);
        break;
      case 20:
      case 21:
        l.addTextData(f[I - 2], f[I - 1], f[I]);
        break;
      case 23:
        l.addStyleData(f[I - 1], f[I]);
        break;
      case 24:
      case 25:
      case 26:
        var C = l.getCurrentSets();
        if (!C) throw new Error("text requires set");
        l.addTextData(C, f[I], void 0);
        break;
      case 27:
      case 28:
        var C = l.getCurrentSets();
        if (!C) throw new Error("text requires set");
        l.addTextData(C, f[I - 1], f[I]);
        break;
      case 29:
      case 41:
        this.$ = [f[I]];
        break;
      case 30:
      case 42:
        this.$ = [...f[I - 2], f[I]];
        break;
      case 31:
        this.$ = [f[I - 2], f[I]];
        break;
      case 33:
        this.$ = f[I].join(" ");
        break;
      case 34:
        this.$ = [f[I]];
        break;
      case 35:
        f[I - 1].push(f[I]), this.$ = f[I - 1];
        break;
      case 43:
      case 44:
        this.$ = f[I];
        break;
    }
  }, "anonymous"), table: [t(n2, [2, 2], { 3: 1, 4: 2 }), { 1: [3] }, { 5: [1, 3], 8: [1, 4] }, t(s, [2, 4], { 6: 5 }), t(n2, [2, 3]), { 7: [1, 6], 8: [1, 8], 9: 7, 10: 9, 11: [1, 10], 12: [1, 11], 17: [1, 12], 19: [1, 13], 22: [1, 14], 24: [1, 15] }, { 1: [2, 1] }, t(s, [2, 5]), t(s, [2, 6]), t(s, [2, 7]), t(s, [2, 8]), { 13: 16, 20: e, 21: i }, { 13: 20, 18: 19, 20: e, 21: i }, { 13: 20, 18: 21, 20: e, 21: i }, { 16: [1, 25], 20: [1, 23], 21: [1, 24], 23: 22 }, { 13: 20, 18: 26, 20: e, 21: i }, t(s, [2, 9], { 14: [1, 27], 15: [1, 28] }), t(r, [2, 43]), t(r, [2, 44]), t(s, [2, 13], { 14: [1, 29], 15: [1, 30], 27: a }), t(r, [2, 41]), { 16: [1, 34], 20: [1, 32], 21: [1, 33], 27: a }, t(s, [2, 22]), t(s, [2, 24], { 14: [1, 35] }), t(s, [2, 25], { 14: [1, 36] }), t(s, [2, 26]), { 20: c2, 25: 37, 26: 38, 27: a }, t(s, [2, 10], { 15: [1, 40] }), { 16: [1, 41] }, t(s, [2, 14], { 15: [1, 42] }), { 16: [1, 43] }, { 13: 44, 20: e, 21: i }, t(s, [2, 17], { 14: [1, 45] }), t(s, [2, 18], { 14: [1, 46] }), t(s, [2, 19]), t(s, [2, 27]), t(s, [2, 28]), t(s, [2, 23], { 27: [1, 47] }), t(h, [2, 29]), { 15: [1, 48] }, { 16: [1, 49] }, t(s, [2, 11]), { 16: [1, 50] }, t(s, [2, 15]), t(r, [2, 42]), t(s, [2, 20]), t(s, [2, 21]), { 20: c2, 26: 51 }, { 16: u, 20: o, 21: [1, 53], 28: 52, 29: 54, 30: 55, 31: p, 32: g, 33: v }, t(s, [2, 12]), t(s, [2, 16]), t(h, [2, 30]), t(h, [2, 31]), t(h, [2, 32]), t(h, [2, 33], { 30: 61, 16: u, 20: o, 31: p, 32: g, 33: v }), t(y, [2, 34]), t(y, [2, 36]), t(y, [2, 37]), t(y, [2, 38]), t(y, [2, 39]), t(y, [2, 40]), t(y, [2, 35])], defaultActions: { 6: [2, 1] }, parseError: m(function(x, b) {
    if (b.recoverable) this.trace(x);
    else {
      var k2 = new Error(x);
      throw k2.hash = b, k2;
    }
  }, "parseError"), parse: m(function(x) {
    var b = this, k2 = [0], l = [], m2 = [null], f = [], V = this.table, I = "", C = 0, G = 0, F = 0, T = 2, R = 1, z = f.slice.call(arguments, 1), _ = Object.create(this.lexer), O = { yy: {} };
    for (var N in this.yy) Object.prototype.hasOwnProperty.call(this.yy, N) && (O.yy[N] = this.yy[N]);
    _.setInput(x, O.yy), O.yy.lexer = _, O.yy.parser = this, typeof _.yylloc > "u" && (_.yylloc = {});
    var L = _.yylloc;
    f.push(L);
    var H = _.options && _.options.ranges;
    typeof O.yy.parseError == "function" ? this.parseError = O.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function Y(W) {
      k2.length = k2.length - 2 * W, m2.length = m2.length - W, f.length = f.length - W;
    }
    m(Y, "popStack");
    function j() {
      var W;
      return W = l.pop() || _.lex() || R, typeof W != "number" && (W instanceof Array && (l = W, W = l.pop()), W = b.symbols_[W] || W), W;
    }
    m(j, "lex");
    for (var A, K, U, M, B, et, Z = {}, X, P, wt, st; ; ) {
      if (U = k2[k2.length - 1], this.defaultActions[U] ? M = this.defaultActions[U] : ((A === null || typeof A > "u") && (A = j()), M = V[U] && V[U][A]), typeof M > "u" || !M.length || !M[0]) {
        var lt = "";
        st = [];
        for (X in V[U]) this.terminals_[X] && X > T && st.push("'" + this.terminals_[X] + "'");
        _.showPosition ? lt = "Parse error on line " + (C + 1) + `:
` + _.showPosition() + `
Expecting ` + st.join(", ") + ", got '" + (this.terminals_[A] || A) + "'" : lt = "Parse error on line " + (C + 1) + ": Unexpected " + (A == R ? "end of input" : "'" + (this.terminals_[A] || A) + "'"), this.parseError(lt, { text: _.match, token: this.terminals_[A] || A, line: _.yylineno, loc: L, expected: st });
      }
      if (M[0] instanceof Array && M.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + U + ", token: " + A);
      switch (M[0]) {
        case 1:
          k2.push(A), m2.push(_.yytext), f.push(_.yylloc), k2.push(M[1]), A = null, K ? (A = K, K = null) : (G = _.yyleng, I = _.yytext, C = _.yylineno, L = _.yylloc, F > 0 && F--);
          break;
        case 2:
          if (P = this.productions_[M[1]][1], Z.$ = m2[m2.length - P], Z._$ = { first_line: f[f.length - (P || 1)].first_line, last_line: f[f.length - 1].last_line, first_column: f[f.length - (P || 1)].first_column, last_column: f[f.length - 1].last_column }, H && (Z._$.range = [f[f.length - (P || 1)].range[0], f[f.length - 1].range[1]]), et = this.performAction.apply(Z, [I, G, C, O.yy, M[1], m2, f].concat(z)), typeof et < "u") return et;
          P && (k2 = k2.slice(0, -1 * P * 2), m2 = m2.slice(0, -1 * P), f = f.slice(0, -1 * P)), k2.push(this.productions_[M[1]][0]), m2.push(Z.$), f.push(Z._$), wt = V[k2[k2.length - 2]][k2[k2.length - 1]], k2.push(wt);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, E = function() {
    var D = { EOF: 1, parseError: m(function(b, k2) {
      if (this.yy.parser) this.yy.parser.parseError(b, k2);
      else throw new Error(b);
    }, "parseError"), setInput: m(function(x, b) {
      return this.yy = b || this.yy || {}, this._input = x, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var x = this._input[0];
      this.yytext += x, this.yyleng++, this.offset++, this.match += x, this.matched += x;
      var b = x.match(/(?:\r\n?|\n).*/g);
      return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), x;
    }, "input"), unput: m(function(x) {
      var b = x.length, k2 = x.split(/(?:\r\n?|\n)/g);
      this._input = x + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b), this.offset -= b;
      var l = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), k2.length - 1 && (this.yylineno -= k2.length - 1);
      var m2 = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: k2 ? (k2.length === l.length ? this.yylloc.first_column : 0) + l[l.length - k2.length].length - k2[0].length : this.yylloc.first_column - b }, this.options.ranges && (this.yylloc.range = [m2[0], m2[0] + this.yyleng - b]), this.yyleng = this.yytext.length, this;
    }, "unput"), more: m(function() {
      return this._more = true, this;
    }, "more"), reject: m(function() {
      if (this.options.backtrack_lexer) this._backtrack = true;
      else return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
      return this;
    }, "reject"), less: m(function(x) {
      this.unput(this.match.slice(x));
    }, "less"), pastInput: m(function() {
      var x = this.matched.substr(0, this.matched.length - this.match.length);
      return (x.length > 20 ? "..." : "") + x.substr(-20).replace(/\n/g, "");
    }, "pastInput"), upcomingInput: m(function() {
      var x = this.match;
      return x.length < 20 && (x += this._input.substr(0, 20 - x.length)), (x.substr(0, 20) + (x.length > 20 ? "..." : "")).replace(/\n/g, "");
    }, "upcomingInput"), showPosition: m(function() {
      var x = this.pastInput(), b = new Array(x.length + 1).join("-");
      return x + this.upcomingInput() + `
` + b + "^";
    }, "showPosition"), test_match: m(function(x, b) {
      var k2, l, m2;
      if (this.options.backtrack_lexer && (m2 = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (m2.yylloc.range = this.yylloc.range.slice(0))), l = x[0].match(/(?:\r\n?|\n).*/g), l && (this.yylineno += l.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: l ? l[l.length - 1].length - l[l.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + x[0].length }, this.yytext += x[0], this.match += x[0], this.matches = x, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(x[0].length), this.matched += x[0], k2 = this.performAction.call(this, this.yy, this, b, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), k2) return k2;
      if (this._backtrack) {
        for (var f in m2) this[f] = m2[f];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var x, b, k2, l;
      this._more || (this.yytext = "", this.match = "");
      for (var m2 = this._currentRules(), f = 0; f < m2.length; f++) if (k2 = this._input.match(this.rules[m2[f]]), k2 && (!b || k2[0].length > b[0].length)) {
        if (b = k2, l = f, this.options.backtrack_lexer) {
          if (x = this.test_match(k2, m2[f]), x !== false) return x;
          if (this._backtrack) {
            b = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return b ? (x = this.test_match(b, m2[l]), x !== false ? x : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var b = this.next();
      return b || this.lex();
    }, "lex"), begin: m(function(b) {
      this.conditionStack.push(b);
    }, "begin"), popState: m(function() {
      var b = this.conditionStack.length - 1;
      return b > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(b) {
      return b = this.conditionStack.length - 1 - Math.abs(b || 0), b >= 0 ? this.conditionStack[b] : "INITIAL";
    }, "topState"), pushState: m(function(b) {
      this.begin(b);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(b, k2, l, m2) {
      var f = m2;
      switch (l) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          if (b.getIndentMode && b.getIndentMode()) return b.consumeIndentText = true, this.begin("INITIAL"), 22;
          break;
        case 4:
          break;
        case 5:
          b.setIndentMode && b.setIndentMode(false), this.begin("INITIAL"), this.unput(k2.yytext);
          break;
        case 6:
          return this.begin("bol"), 8;
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          return 7;
        case 10:
          return 11;
        case 11:
          return 5;
        case 12:
          return 12;
        case 13:
          return 17;
        case 14:
          if (b.consumeIndentText) b.consumeIndentText = false;
          else return 19;
          break;
        case 15:
          return 24;
        case 16:
          return k2.yytext = k2.yytext.slice(2, -2), 14;
          break;
        case 17:
          return k2.yytext = k2.yytext.slice(1, -1).trim(), 14;
          break;
        case 18:
          return 16;
        case 19:
          return 31;
        case 20:
          return 33;
        case 21:
          return 32;
        case 22:
          return 20;
        case 23:
          return 21;
        case 24:
          return 27;
        case 25:
          return 15;
      }
    }, "anonymous"), rules: [/^(?:%%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[ \t]+(?=[\n\r]))/i, /^(?:[ \t]+(?=text\b))/i, /^(?:[ \t]+)/i, /^(?:[^ \t\n\r])/i, /^(?:[\n\r]+)/i, /^(?:%%[^\n]*)/i, /^(?:[ \t]+)/i, /^(?:$)/i, /^(?:title\s[^#\n;]+)/i, /^(?:venn-beta\b)/i, /^(?:set\b)/i, /^(?:union\b)/i, /^(?:text\b)/i, /^(?:style\b)/i, /^(?:\["[^\"]*"\])/i, /^(?:\[[^\]\"]+\])/i, /^(?:[+-]?(\d+(\.\d+)?|\.\d+))/i, /^(?:#[0-9a-fA-F]{3,8})/i, /^(?:rgba\(\s*[0-9.]+\s*[,]\s*[0-9.]+\s*[,]\s*[0-9.]+\s*[,]\s*[0-9.]+\s*\))/i, /^(?:rgb\(\s*[0-9.]+\s*[,]\s*[0-9.]+\s*[,]\s*[0-9.]+\s*\))/i, /^(?:[A-Za-z_][A-Za-z0-9\-_]*)/i, /^(?:"[^\"]*")/i, /^(?:,)/i, /^(?::)/i], conditions: { bol: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], inclusive: true }, INITIAL: { rules: [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], inclusive: true } } };
    return D;
  }();
  S.lexer = E;
  function w() {
    this.yy = {};
  }
  return m(w, "Parser"), w.prototype = S, S.Parser = w, new w();
}();
ut.parser = ut;
var qt = ut;
var ft = [];
var ht = [];
var dt = [];
var gt = /* @__PURE__ */ new Set();
var xt;
var yt = false;
var ue = m((t, n2, s) => {
  let e = ot(t).sort(), i = s ?? 10 / Math.pow(t.length, 2);
  xt = e, e.length === 1 && gt.add(e[0]), ft.push({ sets: e, size: i, label: n2 ? nt(n2) : void 0 });
}, "addSubsetData");
var fe = m(() => ft, "getSubsetData");
var nt = m((t) => {
  let n2 = t.trim();
  return n2.length >= 2 && n2.startsWith('"') && n2.endsWith('"') ? n2.slice(1, -1) : n2;
}, "normalizeText");
var he = m((t) => t && nt(t), "normalizeStyleValue");
var de2 = m((t, n2, s) => {
  let e = nt(n2);
  ht.push({ sets: ot(t).sort(), id: e, label: s ? nt(s) : void 0 });
}, "addTextData");
var ge = m((t, n2) => {
  let s = ot(t).sort(), e = {};
  for (let [i, r] of n2) e[i] = he(r) ?? r;
  dt.push({ targets: s, styles: e });
}, "addStyleData");
var xe = m(() => dt, "getStyleData");
var ot = m((t) => t.map((n2) => nt(n2)), "normalizeIdentifierList");
var ye = m((t) => {
  let s = ot(t).filter((e) => !gt.has(e));
  if (s.length > 0) throw new Error(`unknown set identifier: ${s.join(", ")}`);
}, "validateUnionIdentifiers");
var pe = m(() => ht, "getTextData");
var me = m(() => xt, "getCurrentSets");
var be = m(() => yt, "getIndentMode");
var ve = m((t) => {
  yt = t;
}, "setIndentMode");
var ke = oo.venn;
function Me() {
  return Lt(ke, Ot().venn);
}
m(Me, "getConfig");
var Ie = m(() => {
  os(), ft.length = 0, ht.length = 0, dt.length = 0, gt.clear(), xt = void 0, yt = false;
}, "customClear");
var Gt = { getConfig: Me, clear: Ie, setAccTitle: es, getAccTitle: ss, setDiagramTitle: hs, getDiagramTitle: ns, getAccDescription: ls, setAccDescription: as, addSubsetData: ue, getSubsetData: fe, addTextData: de2, addStyleData: ge, validateUnionIdentifiers: ye, getTextData: pe, getStyleData: xe, getCurrentSets: me, getIndentMode: be, setIndentMode: ve };
var Se = m((t) => `
  .venn-title {
    font-size: 32px;
    fill: ${t.vennTitleTextColor};
    font-family: ${t.fontFamily};
  }

  .venn-circle text {
    font-size: 48px;
    font-family: ${t.fontFamily};
  }

  .venn-intersection text {
    font-size: 48px;
    fill: ${t.vennSetTextColor};
    font-family: ${t.fontFamily};
  }

  .venn-text-node {
    font-family: ${t.fontFamily};
    color: ${t.vennSetTextColor};
  }
`, "getStyles");
var Ut = Se;
function at(t, n2) {
  let s = we(t), e = s.filter((c2) => De(c2, t)), i = 0, r = 0, a = [];
  if (e.length > 1) {
    let c2 = Yt(e);
    for (let u = 0; u < e.length; ++u) {
      let o = e[u];
      o.angle = Math.atan2(o.x - c2.x, o.y - c2.y);
    }
    e.sort((u, o) => o.angle - u.angle);
    let h = e[e.length - 1];
    for (let u = 0; u < e.length; ++u) {
      let o = e[u];
      r += (h.x + o.x) * (o.y - h.y);
      let p = { x: (o.x + h.x) / 2, y: (o.y + h.y) / 2 }, g = null;
      for (let v = 0; v < o.parentIndex.length; ++v) if (h.parentIndex.includes(o.parentIndex[v])) {
        let y = t[o.parentIndex[v]], S = Math.atan2(o.x - y.x, o.y - y.y), E = Math.atan2(h.x - y.x, h.y - y.y), w = E - S;
        w < 0 && (w += 2 * Math.PI);
        let D = E - w / 2, x = q(p, { x: y.x + y.radius * Math.sin(D), y: y.y + y.radius * Math.cos(D) });
        x > y.radius * 2 && (x = y.radius * 2), (g == null || g.width > x) && (g = { circle: y, width: x, p1: o, p2: h, large: x > y.radius, sweep: true });
      }
      g != null && (a.push(g), i += bt(g.circle.radius, g.width), h = o);
    }
  } else {
    let c2 = t[0];
    for (let u = 1; u < t.length; ++u) t[u].radius < c2.radius && (c2 = t[u]);
    let h = false;
    for (let u = 0; u < t.length; ++u) if (q(t[u], c2) > Math.abs(c2.radius - t[u].radius)) {
      h = true;
      break;
    }
    h ? i = r = 0 : (i = c2.radius * c2.radius * Math.PI, a.push({ circle: c2, p1: { x: c2.x, y: c2.y + c2.radius }, p2: { x: c2.x - 1e-10, y: c2.y + c2.radius }, width: c2.radius * 2, large: true, sweep: true }));
  }
  return r /= 2, n2 && (n2.area = i + r, n2.arcArea = i, n2.polygonArea = r, n2.arcs = a, n2.innerPoints = e, n2.intersectionPoints = s), i + r;
}
m(at, "intersectionArea");
function De(t, n2) {
  return n2.every((s) => q(t, s) < s.radius + 1e-10);
}
m(De, "containedInCircles");
function we(t) {
  let n2 = [];
  for (let s = 0; s < t.length; ++s) for (let e = s + 1; e < t.length; ++e) {
    let i = Kt(t[s], t[e]);
    for (let r of i) r.parentIndex = [s, e], n2.push(r);
  }
  return n2;
}
m(we, "getIntersectionPoints");
function bt(t, n2) {
  return t * t * Math.acos(1 - n2 / t) - (t - n2) * Math.sqrt(n2 * (2 * t - n2));
}
m(bt, "circleArea");
function q(t, n2) {
  return Math.sqrt((t.x - n2.x) * (t.x - n2.x) + (t.y - n2.y) * (t.y - n2.y));
}
m(q, "distance");
function Dt(t, n2, s) {
  if (s >= t + n2) return 0;
  if (s <= Math.abs(t - n2)) return Math.PI * Math.min(t, n2) * Math.min(t, n2);
  let e = t - (s * s - n2 * n2 + t * t) / (2 * s), i = n2 - (s * s - t * t + n2 * n2) / (2 * s);
  return bt(t, e) + bt(n2, i);
}
m(Dt, "circleOverlap");
function Kt(t, n2) {
  let s = q(t, n2), e = t.radius, i = n2.radius;
  if (s >= e + i || s <= Math.abs(e - i)) return [];
  let r = (e * e - i * i + s * s) / (2 * s), a = Math.sqrt(e * e - r * r), c2 = t.x + r * (n2.x - t.x) / s, h = t.y + r * (n2.y - t.y) / s, u = -(n2.y - t.y) * (a / s), o = -(n2.x - t.x) * (a / s);
  return [{ x: c2 + u, y: h - o }, { x: c2 - u, y: h + o }];
}
m(Kt, "circleCircleIntersection");
function Yt(t) {
  let n2 = { x: 0, y: 0 };
  for (let s of t) n2.x += s.x, n2.y += s.y;
  return n2.x /= t.length, n2.y /= t.length, n2;
}
m(Yt, "getCenter");
function Te(t, n2, s, e) {
  e = e || {};
  let i = e.maxIterations || 100, r = e.tolerance || 1e-10, a = t(n2), c2 = t(s), h = s - n2;
  if (a * c2 > 0) throw "Initial bisect points must have opposite signs";
  if (a === 0) return n2;
  if (c2 === 0) return s;
  for (let u = 0; u < i; ++u) {
    h /= 2;
    let o = n2 + h, p = t(o);
    if (p * a >= 0 && (n2 = o), Math.abs(h) < r || p === 0) return o;
  }
  return n2 + h;
}
m(Te, "bisect");
function vt(t) {
  let n2 = new Array(t);
  for (let s = 0; s < t; ++s) n2[s] = 0;
  return n2;
}
m(vt, "zeros");
function Wt(t, n2) {
  return vt(t).map(() => vt(n2));
}
m(Wt, "zerosM");
function $(t, n2) {
  let s = 0;
  for (let e = 0; e < t.length; ++e) s += t[e] * n2[e];
  return s;
}
m($, "dot");
function kt(t) {
  return Math.sqrt($(t, t));
}
m(kt, "norm2");
function Mt(t, n2, s) {
  for (let e = 0; e < n2.length; ++e) t[e] = n2[e] * s;
}
m(Mt, "scale");
function J(t, n2, s, e, i) {
  for (let r = 0; r < t.length; ++r) t[r] = n2 * s[r] + e * i[r];
}
m(J, "weightedSum");
function Xt(t, n2, s) {
  s = s || {};
  let e = s.maxIterations || n2.length * 200, i = s.nonZeroDelta || 1.05, r = s.zeroDelta || 1e-3, a = s.minErrorDelta || 1e-6, c2 = s.minErrorDelta || 1e-5, h = s.rho !== void 0 ? s.rho : 1, u = s.chi !== void 0 ? s.chi : 2, o = s.psi !== void 0 ? s.psi : -0.5, p = s.sigma !== void 0 ? s.sigma : 0.5, g, v = n2.length, y = new Array(v + 1);
  y[0] = n2, y[0].fx = t(n2), y[0].id = 0;
  for (let k2 = 0; k2 < v; ++k2) {
    let l = n2.slice();
    l[k2] = l[k2] ? l[k2] * i : r, y[k2 + 1] = l, y[k2 + 1].fx = t(l), y[k2 + 1].id = k2 + 1;
  }
  function S(k2) {
    for (let l = 0; l < k2.length; l++) y[v][l] = k2[l];
    y[v].fx = k2.fx;
  }
  m(S, "updateSimplex");
  let E = m((k2, l) => k2.fx - l.fx, "sortOrder"), w = n2.slice(), D = n2.slice(), x = n2.slice(), b = n2.slice();
  for (let k2 = 0; k2 < e; ++k2) {
    if (y.sort(E), s.history) {
      let m2 = y.map((f) => {
        let V = f.slice();
        return V.fx = f.fx, V.id = f.id, V;
      });
      m2.sort((f, V) => f.id - V.id), s.history.push({ x: y[0].slice(), fx: y[0].fx, simplex: m2 });
    }
    g = 0;
    for (let m2 = 0; m2 < v; ++m2) g = Math.max(g, Math.abs(y[0][m2] - y[1][m2]));
    if (Math.abs(y[0].fx - y[v].fx) < a && g < c2) break;
    for (let m2 = 0; m2 < v; ++m2) {
      w[m2] = 0;
      for (let f = 0; f < v; ++f) w[m2] += y[f][m2];
      w[m2] /= v;
    }
    let l = y[v];
    if (J(D, 1 + h, w, -h, l), D.fx = t(D), D.fx < y[0].fx) J(b, 1 + u, w, -u, l), b.fx = t(b), b.fx < D.fx ? S(b) : S(D);
    else if (D.fx >= y[v - 1].fx) {
      let m2 = false;
      if (D.fx > l.fx ? (J(x, 1 + o, w, -o, l), x.fx = t(x), x.fx < l.fx ? S(x) : m2 = true) : (J(x, 1 - o * h, w, o * h, l), x.fx = t(x), x.fx < D.fx ? S(x) : m2 = true), m2) {
        if (p >= 1) break;
        for (let f = 1; f < y.length; ++f) J(y[f], 1 - p, y[0], p, y[f]), y[f].fx = t(y[f]);
      }
    } else S(D);
  }
  return y.sort(E), { fx: y[0].fx, x: y[0] };
}
m(Xt, "nelderMead");
function Ee(t, n2, s, e, i, r, a) {
  let c2 = s.fx, h = $(s.fxprime, n2), u = c2, o = c2, p = h, g = 0;
  i = i || 1, r = r || 1e-6, a = a || 0.1;
  function v(y, S, E) {
    for (let w = 0; w < 16; ++w) if (i = (y + S) / 2, J(e.x, 1, s.x, i, n2), u = e.fx = t(e.x, e.fxprime), p = $(e.fxprime, n2), u > c2 + r * i * h || u >= E) S = i;
    else {
      if (Math.abs(p) <= -a * h) return i;
      p * (S - y) >= 0 && (S = y), y = i, E = u;
    }
    return 0;
  }
  m(v, "zoom");
  for (let y = 0; y < 10; ++y) {
    if (J(e.x, 1, s.x, i, n2), u = e.fx = t(e.x, e.fxprime), p = $(e.fxprime, n2), u > c2 + r * i * h || y && u >= o) return v(g, i, o);
    if (Math.abs(p) <= -a * h) return i;
    if (p >= 0) return v(i, g, u);
    o = u, g = i, i *= 2;
  }
  return i;
}
m(Ee, "wolfeLineSearch");
function _e(t, n2, s) {
  let e = { x: n2.slice(), fx: 0, fxprime: n2.slice() }, i = { x: n2.slice(), fx: 0, fxprime: n2.slice() }, r = n2.slice(), a, c2, h = 1, u;
  s = s || {}, u = s.maxIterations || n2.length * 20, e.fx = t(e.x, e.fxprime), a = e.fxprime.slice(), Mt(a, e.fxprime, -1);
  for (let o = 0; o < u; ++o) {
    if (h = Ee(t, a, e, i, h), s.history && s.history.push({ x: e.x.slice(), fx: e.fx, fxprime: e.fxprime.slice(), alpha: h }), !h) Mt(a, e.fxprime, -1);
    else {
      J(r, 1, i.fxprime, -1, e.fxprime);
      let p = $(e.fxprime, e.fxprime), g = Math.max(0, $(r, i.fxprime) / p);
      J(a, g, a, -1, i.fxprime), c2 = e, e = i, i = c2;
    }
    if (kt(e.fxprime) <= 1e-5) break;
  }
  return s.history && s.history.push({ x: e.x.slice(), fx: e.fx, fxprime: e.fxprime.slice(), alpha: h }), e;
}
m(_e, "conjugateGradient");
function Zt(t, n2 = {}) {
  n2.maxIterations = n2.maxIterations || 500;
  let s = n2.initialLayout || Ce, e = n2.lossFunction || tt, i = Ae(t, n2), r = s(i, n2), a = Object.keys(r), c2 = [];
  for (let o of a) c2.push(r[o].x), c2.push(r[o].y);
  let u = Xt((o) => {
    let p = {};
    for (let g = 0; g < a.length; ++g) {
      let v = a[g];
      p[v] = { x: o[2 * g], y: o[2 * g + 1], radius: r[v].radius };
    }
    return e(p, i);
  }, c2, n2).x;
  for (let o = 0; o < a.length; ++o) {
    let p = a[o];
    r[p].x = u[2 * o], r[p].y = u[2 * o + 1];
  }
  return r;
}
m(Zt, "venn");
var Jt = 1e-10;
function It(t, n2, s) {
  return Math.min(t, n2) * Math.min(t, n2) * Math.PI <= s + Jt ? Math.abs(t - n2) : Te((e) => Dt(t, n2, e) - s, 0, t + n2);
}
m(It, "distanceFromIntersectArea");
function Ae(t, n2 = {}) {
  let s = n2.distinct, e = t.map((c2) => Object.assign({}, c2));
  function i(c2) {
    return c2.join(";");
  }
  if (m(i, "toKey"), s) {
    let c2 = /* @__PURE__ */ new Map();
    for (let h of e) for (let u = 0; u < h.sets.length; u++) {
      let o = String(h.sets[u]);
      c2.set(o, h.size + (c2.get(o) || 0));
      for (let p = u + 1; p < h.sets.length; p++) {
        let g = String(h.sets[p]), v = `${o};${g}`, y = `${g};${o}`;
        c2.set(v, h.size + (c2.get(v) || 0)), c2.set(y, h.size + (c2.get(y) || 0));
      }
    }
    for (let h of e) h.sets.length < 3 && (h.size = c2.get(i(h.sets)));
  }
  let r = [], a = /* @__PURE__ */ new Set();
  for (let c2 of e) if (c2.sets.length === 1) r.push(c2.sets[0]);
  else if (c2.sets.length === 2) {
    let h = c2.sets[0], u = c2.sets[1];
    a.add(i(c2.sets)), a.add(i([u, h]));
  }
  r.sort((c2, h) => c2 === h ? 0 : c2 < h ? -1 : 1);
  for (let c2 = 0; c2 < r.length; ++c2) {
    let h = r[c2];
    for (let u = c2 + 1; u < r.length; ++u) {
      let o = r[u];
      a.has(i([h, o])) || e.push({ sets: [h, o], size: 0 });
    }
  }
  return e;
}
m(Ae, "addMissingAreas");
function Re(t, n2, s) {
  let e = Wt(n2.length, n2.length), i = Wt(n2.length, n2.length);
  return t.filter((r) => r.sets.length === 2).forEach((r) => {
    let a = s[r.sets[0]], c2 = s[r.sets[1]], h = Math.sqrt(n2[a].size / Math.PI), u = Math.sqrt(n2[c2].size / Math.PI), o = It(h, u, r.size);
    e[a][c2] = e[c2][a] = o;
    let p = 0;
    r.size + 1e-10 >= Math.min(n2[a].size, n2[c2].size) ? p = 1 : r.size <= 1e-10 && (p = -1), i[a][c2] = i[c2][a] = p;
  }), { distances: e, constraints: i };
}
m(Re, "getDistanceMatrices");
function ze(t, n2, s, e) {
  for (let r = 0; r < n2.length; ++r) n2[r] = 0;
  let i = 0;
  for (let r = 0; r < s.length; ++r) {
    let a = t[2 * r], c2 = t[2 * r + 1];
    for (let h = r + 1; h < s.length; ++h) {
      let u = t[2 * h], o = t[2 * h + 1], p = s[r][h], g = e[r][h], v = (u - a) * (u - a) + (o - c2) * (o - c2), y = Math.sqrt(v), S = v - p * p;
      g > 0 && y <= p || g < 0 && y >= p || (i += 2 * S * S, n2[2 * r] += 4 * S * (a - u), n2[2 * r + 1] += 4 * S * (c2 - o), n2[2 * h] += 4 * S * (u - a), n2[2 * h + 1] += 4 * S * (o - c2));
    }
  }
  return i;
}
m(ze, "constrainedMDSGradient");
function Ce(t, n2 = {}) {
  let s = Ve(t, n2), e = n2.lossFunction || tt;
  if (t.length >= 8) {
    let i = Oe(t, n2), r = e(i, t), a = e(s, t);
    r + 1e-8 < a && (s = i);
  }
  return s;
}
m(Ce, "bestInitialLayout");
function Oe(t, n2 = {}) {
  let s = n2.restarts || 10, e = [], i = {};
  for (let g of t) g.sets.length === 1 && (i[g.sets[0]] = e.length, e.push(g));
  let { distances: r, constraints: a } = Re(t, e, i), c2 = kt(r.map(kt)) / r.length;
  r = r.map((g) => g.map((v) => v / c2));
  let h = m((g, v) => ze(g, v, r, a), "obj"), u = null;
  for (let g = 0; g < s; ++g) {
    let v = vt(r.length * 2).map(Math.random), y = _e(h, v, n2);
    (!u || y.fx < u.fx) && (u = y);
  }
  let o = u.x, p = {};
  for (let g = 0; g < e.length; ++g) {
    let v = e[g];
    p[v.sets[0]] = { x: o[2 * g] * c2, y: o[2 * g + 1] * c2, radius: Math.sqrt(v.size / Math.PI) };
  }
  if (n2.history) for (let g of n2.history) Mt(g.x, c2);
  return p;
}
m(Oe, "constrainedMDSLayout");
function Ve(t, n2) {
  let s = n2 && n2.lossFunction ? n2.lossFunction : tt, e = {}, i = {};
  for (let p of t) if (p.sets.length === 1) {
    let g = p.sets[0];
    e[g] = { x: 1e10, y: 1e10, rowid: e.length, size: p.size, radius: Math.sqrt(p.size / Math.PI) }, i[g] = [];
  }
  t = t.filter((p) => p.sets.length === 2);
  for (let p of t) {
    let g = p.weight != null ? p.weight : 1, v = p.sets[0], y = p.sets[1];
    p.size + Jt >= Math.min(e[v].size, e[y].size) && (g = 0), i[v].push({ set: y, size: p.size, weight: g }), i[y].push({ set: v, size: p.size, weight: g });
  }
  let r = [];
  Object.keys(i).forEach((p) => {
    let g = 0;
    for (let v = 0; v < i[p].length; ++v) g += i[p][v].size * i[p][v].weight;
    r.push({ set: p, size: g });
  });
  function a(p, g) {
    return g.size - p.size;
  }
  m(a, "sortOrder"), r.sort(a);
  let c2 = {};
  function h(p) {
    return p.set in c2;
  }
  m(h, "isPositioned");
  function u(p, g) {
    e[g].x = p.x, e[g].y = p.y, c2[g] = true;
  }
  m(u, "positionSet"), u({ x: 0, y: 0 }, r[0].set);
  for (let p = 1; p < r.length; ++p) {
    let g = r[p].set, v = i[g].filter(h), y = e[g];
    if (v.sort(a), v.length === 0) throw "ERROR: missing pairwise overlap information";
    let S = [];
    for (var o = 0; o < v.length; ++o) {
      let D = e[v[o].set], x = It(y.radius, D.radius, v[o].size);
      S.push({ x: D.x + x, y: D.y }), S.push({ x: D.x - x, y: D.y }), S.push({ y: D.y + x, x: D.x }), S.push({ y: D.y - x, x: D.x });
      for (let b = o + 1; b < v.length; ++b) {
        let k2 = e[v[b].set], l = It(y.radius, k2.radius, v[b].size), m2 = Kt({ x: D.x, y: D.y, radius: x }, { x: k2.x, y: k2.y, radius: l });
        S.push(...m2);
      }
    }
    let E = 1e50, w = S[0];
    for (let D of S) {
      e[g].x = D.x, e[g].y = D.y;
      let x = s(e, t);
      x < E && (E = x, w = D);
    }
    u(w, g);
  }
  return e;
}
m(Ve, "greedyLayout");
function tt(t, n2) {
  let s = 0;
  for (let e of n2) {
    if (e.sets.length === 1) continue;
    let i;
    if (e.sets.length === 2) {
      let a = t[e.sets[0]], c2 = t[e.sets[1]];
      i = Dt(a.radius, c2.radius, q(a, c2));
    } else i = at(e.sets.map((a) => t[a]));
    let r = e.weight != null ? e.weight : 1;
    s += r * (i - e.size) * (i - e.size);
  }
  return s;
}
m(tt, "lossFunction");
function Qt(t, n2) {
  let s = 0;
  for (let e of n2) {
    if (e.sets.length === 1) continue;
    let i;
    if (e.sets.length === 2) {
      let c2 = t[e.sets[0]], h = t[e.sets[1]];
      i = Dt(c2.radius, h.radius, q(c2, h));
    } else i = at(e.sets.map((c2) => t[c2]));
    let r = e.weight != null ? e.weight : 1, a = Math.log((i + 1) / (e.size + 1));
    s += r * a * a;
  }
  return s;
}
m(Qt, "logRatioLossFunction");
function Ne(t, n2, s) {
  if (s == null ? t.sort((i, r) => r.radius - i.radius) : t.sort(s), t.length > 0) {
    let i = t[0].x, r = t[0].y;
    for (let a of t) a.x -= i, a.y -= r;
  }
  if (t.length === 2 && q(t[0], t[1]) < Math.abs(t[1].radius - t[0].radius) && (t[1].x = t[0].x + t[0].radius - t[1].radius - 1e-10, t[1].y = t[0].y), t.length > 1) {
    let i = Math.atan2(t[1].x, t[1].y) - n2, r = Math.cos(i), a = Math.sin(i);
    for (let c2 of t) {
      let h = c2.x, u = c2.y;
      c2.x = r * h - a * u, c2.y = a * h + r * u;
    }
  }
  if (t.length > 2) {
    let i = Math.atan2(t[2].x, t[2].y) - n2;
    for (; i < 0; ) i += 2 * Math.PI;
    for (; i > 2 * Math.PI; ) i -= 2 * Math.PI;
    if (i > Math.PI) {
      let r = t[1].y / (1e-10 + t[1].x);
      for (let a of t) {
        var e = (a.x + r * a.y) / (1 + r * r);
        a.x = 2 * e - a.x, a.y = 2 * e * r - a.y;
      }
    }
  }
}
m(Ne, "orientateCircles");
function Le(t) {
  t.forEach((i) => {
    i.parent = i;
  });
  function n2(i) {
    return i.parent !== i && (i.parent = n2(i.parent)), i.parent;
  }
  m(n2, "find");
  function s(i, r) {
    let a = n2(i), c2 = n2(r);
    a.parent = c2;
  }
  m(s, "union");
  for (let i = 0; i < t.length; ++i) for (let r = i + 1; r < t.length; ++r) {
    let a = t[i].radius + t[r].radius;
    q(t[i], t[r]) + 1e-10 < a && s(t[r], t[i]);
  }
  let e = /* @__PURE__ */ new Map();
  for (let i = 0; i < t.length; ++i) {
    let r = n2(t[i]).parent.setid;
    e.has(r) || e.set(r, []), e.get(r).push(t[i]);
  }
  return t.forEach((i) => {
    delete i.parent;
  }), Array.from(e.values());
}
m(Le, "disjointCluster");
function St(t) {
  let n2 = m((s) => {
    let e = t.reduce((r, a) => Math.max(r, a[s] + a.radius), Number.NEGATIVE_INFINITY), i = t.reduce((r, a) => Math.min(r, a[s] - a.radius), Number.POSITIVE_INFINITY);
    return { max: e, min: i };
  }, "minMax");
  return { xRange: n2("x"), yRange: n2("y") };
}
m(St, "getBoundingBox");
function $t(t, n2, s) {
  n2 == null && (n2 = Math.PI / 2);
  let e = ne(t).map((u) => Object.assign({}, u)), i = Le(e);
  for (let u of i) {
    Ne(u, n2, s);
    let o = St(u);
    u.size = (o.xRange.max - o.xRange.min) * (o.yRange.max - o.yRange.min), u.bounds = o;
  }
  i.sort((u, o) => o.size - u.size), e = i[0];
  let r = e.bounds, a = (r.xRange.max - r.xRange.min) / 50;
  function c2(u, o, p) {
    if (!u) return;
    let g = u.bounds, v, y;
    if (o) v = r.xRange.max - g.xRange.min + a;
    else {
      v = r.xRange.max - g.xRange.max;
      let S = (g.xRange.max - g.xRange.min) / 2 - (r.xRange.max - r.xRange.min) / 2;
      S < 0 && (v += S);
    }
    if (p) y = r.yRange.max - g.yRange.min + a;
    else {
      y = r.yRange.max - g.yRange.max;
      let S = (g.yRange.max - g.yRange.min) / 2 - (r.yRange.max - r.yRange.min) / 2;
      S < 0 && (y += S);
    }
    for (let S of u) S.x += v, S.y += y, e.push(S);
  }
  m(c2, "addCluster");
  let h = 1;
  for (; h < i.length; ) c2(i[h], true, false), c2(i[h + 1], false, true), c2(i[h + 2], true, true), h += 3, r = St(e);
  return ee(e);
}
m($t, "normalizeSolution");
function te(t, n2, s, e, i) {
  let r = ne(t);
  n2 -= 2 * e, s -= 2 * e;
  let { xRange: a, yRange: c2 } = St(r);
  if (a.max === a.min || c2.max === c2.min) return console.log("not scaling solution: zero size detected"), t;
  let h, u;
  if (i) {
    let v = Math.sqrt(i / Math.PI) * 2;
    h = n2 / v, u = s / v;
  } else h = n2 / (a.max - a.min), u = s / (c2.max - c2.min);
  let o = Math.min(u, h), p = (n2 - (a.max - a.min) * o) / 2, g = (s - (c2.max - c2.min) * o) / 2;
  return ee(r.map((v) => ({ radius: o * v.radius, x: e + p + (v.x - a.min) * o, y: e + g + (v.y - c2.min) * o, setid: v.setid })));
}
m(te, "scaleSolution");
function ee(t) {
  let n2 = {};
  for (let s of t) n2[s.setid] = s;
  return n2;
}
m(ee, "toObjectNotation");
function ne(t) {
  return Object.keys(t).map((s) => Object.assign(t[s], { setid: s }));
}
m(ne, "fromObjectNotation");
function se(t = {}) {
  let n2 = false, s = 600, e = 350, i = 15, r = 1e3, a = Math.PI / 2, c2 = true, h = null, u = true, o = true, p = null, g = null, v = false, y = null, S = t && t.symmetricalTextCentre ? t.symmetricalTextCentre : false, E = {}, w = t && t.colourScheme ? t.colourScheme : t && t.colorScheme ? t.colorScheme : ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"], D = 0, x = m(function(m2) {
    if (m2 in E) return E[m2];
    var f = E[m2] = w[D];
    return D += 1, D >= w.length && (D = 0), f;
  }, "colours"), b = Zt, k2 = tt;
  function l(m2) {
    let f = m2.datum(), V = /* @__PURE__ */ new Set();
    f.forEach((M) => {
      M.size == 0 && M.sets.length == 1 && V.add(M.sets[0]);
    }), f = f.filter((M) => !M.sets.some((B) => V.has(B)));
    let I = {}, C = {};
    if (f.length > 0) {
      let M = b(f, { lossFunction: k2, distinct: v });
      c2 && (M = $t(M, a, g)), I = te(M, s, e, i, h), C = re(I, f, S);
    }
    let G = {};
    f.forEach((M) => {
      M.label && (G[M.sets] = M.label);
    });
    function F(M) {
      if (M.sets in G) return G[M.sets];
      if (M.sets.length == 1) return "" + M.sets[0];
    }
    m(F, "label"), m2.selectAll("svg").data([I]).enter().append("svg");
    let T = m2.select("svg");
    n2 ? T.attr("viewBox", `0 0 ${s} ${e}`) : T.attr("width", s).attr("height", e);
    let R = {}, z = false;
    T.selectAll(".venn-area path").each(function(M) {
      let B = this.getAttribute("d");
      M.sets.length == 1 && B && !v && (z = true, R[M.sets[0]] = Pe(B));
    });
    function _(M) {
      return (B) => {
        let et = M.sets.map((Z) => {
          let X = R[Z], P = I[Z];
          return X || (X = { x: s / 2, y: e / 2, radius: 1 }), P || (P = { x: s / 2, y: e / 2, radius: 1 }), { x: X.x * (1 - B) + P.x * B, y: X.y * (1 - B) + P.y * B, radius: X.radius * (1 - B) + P.radius * B };
        });
        return Ht(et, y);
      };
    }
    m(_, "pathTween");
    let O = T.selectAll(".venn-area").data(f, (M) => M.sets), N = O.enter().append("g").attr("class", (M) => `venn-area venn-${M.sets.length == 1 ? "circle" : "intersection"}${M.colour || M.color ? " venn-coloured" : ""}`).attr("data-venn-sets", (M) => M.sets.join("_")), L = N.append("path"), H = N.append("text").attr("class", "label").text((M) => F(M)).attr("text-anchor", "middle").attr("dy", ".35em").attr("x", s / 2).attr("y", e / 2);
    o && (L.style("fill-opacity", "0").filter((M) => M.sets.length == 1).style("fill", (M) => M.colour ? M.colour : M.color ? M.color : x(M.sets)).style("fill-opacity", ".25"), H.style("fill", (M) => M.colour || M.color ? "#FFF" : t.textFill ? t.textFill : M.sets.length == 1 ? x(M.sets) : "#444"));
    function Y(M) {
      return typeof M.transition == "function" ? M.transition("venn").duration(r) : M;
    }
    m(Y, "asTransition");
    let j = m2;
    z && typeof j.transition == "function" ? (j = Y(m2), j.selectAll("path").attrTween("d", _)) : j.selectAll("path").attr("d", (M) => Ht(M.sets.map((B) => I[B])), y);
    let A = j.selectAll("text").filter((M) => M.sets in C).text((M) => F(M)).attr("x", (M) => Math.floor(C[M.sets].x)).attr("y", (M) => Math.floor(C[M.sets].y));
    u && (z ? "on" in A ? A.on("end", pt(I, F)) : A.each("end", pt(I, F)) : A.each(pt(I, F)));
    let K = Y(O.exit()).remove();
    typeof O.transition == "function" && K.selectAll("path").attrTween("d", _);
    let U = K.selectAll("text").attr("x", s / 2).attr("y", e / 2);
    return p !== null && (H.style("font-size", "0px"), A.style("font-size", p), U.style("font-size", "0px")), { circles: I, textCentres: C, nodes: O, enter: N, update: j, exit: K };
  }
  return m(l, "chart"), l.wrap = function(m2) {
    return arguments.length ? (u = m2, l) : u;
  }, l.useViewBox = function() {
    return n2 = true, l;
  }, l.width = function(m2) {
    return arguments.length ? (s = m2, l) : s;
  }, l.height = function(m2) {
    return arguments.length ? (e = m2, l) : e;
  }, l.padding = function(m2) {
    return arguments.length ? (i = m2, l) : i;
  }, l.distinct = function(m2) {
    return arguments.length ? (v = m2, l) : v;
  }, l.colours = function(m2) {
    return arguments.length ? (x = m2, l) : x;
  }, l.colors = function(m2) {
    return arguments.length ? (x = m2, l) : x;
  }, l.fontSize = function(m2) {
    return arguments.length ? (p = m2, l) : p;
  }, l.round = function(m2) {
    return arguments.length ? (y = m2, l) : y;
  }, l.duration = function(m2) {
    return arguments.length ? (r = m2, l) : r;
  }, l.layoutFunction = function(m2) {
    return arguments.length ? (b = m2, l) : b;
  }, l.normalize = function(m2) {
    return arguments.length ? (c2 = m2, l) : c2;
  }, l.scaleToFit = function(m2) {
    return arguments.length ? (h = m2, l) : h;
  }, l.styled = function(m2) {
    return arguments.length ? (o = m2, l) : o;
  }, l.orientation = function(m2) {
    return arguments.length ? (a = m2, l) : a;
  }, l.orientationOrder = function(m2) {
    return arguments.length ? (g = m2, l) : g;
  }, l.lossFunction = function(m2) {
    return arguments.length ? (k2 = m2 === "default" ? tt : m2 === "logRatio" ? Qt : m2, l) : k2;
  }, l;
}
m(se, "VennDiagram");
function pt(t, n2) {
  return function(s) {
    let e = this, i = t[s.sets[0]].radius || 50, r = n2(s) || "", a = r.split(/\s+/).reverse(), h = (r.length + a.length) / 3, u = a.pop(), o = [u], p = 0, g = 1.1;
    e.textContent = null;
    let v = [];
    function y(x) {
      let b = e.ownerDocument.createElementNS(e.namespaceURI, "tspan");
      return b.textContent = x, v.push(b), e.append(b), b;
    }
    m(y, "append");
    let S = y(u);
    for (; u = a.pop(), !!u; ) {
      o.push(u);
      let x = o.join(" ");
      S.textContent = x, x.length > h && S.getComputedTextLength() > i && (o.pop(), S.textContent = o.join(" "), o = [u], S = y(u), p++);
    }
    let E = 0.35 - p * g / 2, w = e.getAttribute("x"), D = e.getAttribute("y");
    v.forEach((x, b) => {
      x.setAttribute("x", w), x.setAttribute("y", D), x.setAttribute("dy", `${E + b * g}em`);
    });
  };
}
m(pt, "wrapText");
function mt(t, n2, s) {
  let e = n2[0].radius - q(n2[0], t);
  for (let i = 1; i < n2.length; ++i) {
    let r = n2[i].radius - q(n2[i], t);
    r <= e && (e = r);
  }
  for (let i = 0; i < s.length; ++i) {
    let r = q(s[i], t) - s[i].radius;
    r <= e && (e = r);
  }
  return e;
}
m(mt, "circleMargin");
function ie(t, n2, s) {
  let e = [];
  for (let o of t) e.push({ x: o.x, y: o.y }), e.push({ x: o.x + o.radius / 2, y: o.y }), e.push({ x: o.x - o.radius / 2, y: o.y }), e.push({ x: o.x, y: o.y + o.radius / 2 }), e.push({ x: o.x, y: o.y - o.radius / 2 });
  let i = e[0], r = mt(e[0], t, n2);
  for (let o = 1; o < e.length; ++o) {
    let p = mt(e[o], t, n2);
    p >= r && (i = e[o], r = p);
  }
  let a = Xt((o) => -1 * mt({ x: o[0], y: o[1] }, t, n2), [i.x, i.y], { maxIterations: 500, minErrorDelta: 1e-10 }).x, c2 = { x: s ? 0 : a[0], y: a[1] }, h = true;
  for (let o of t) if (q(c2, o) > o.radius) {
    h = false;
    break;
  }
  for (let o of n2) if (q(c2, o) < o.radius) {
    h = false;
    break;
  }
  if (h) return c2;
  if (t.length == 1) return { x: t[0].x, y: t[0].y };
  let u = {};
  return at(t, u), u.arcs.length === 0 ? { x: 0, y: -1e3, disjoint: true } : u.arcs.length == 1 ? { x: u.arcs[0].circle.x, y: u.arcs[0].circle.y } : n2.length ? ie(t, []) : Yt(u.arcs.map((o) => o.p1));
}
m(ie, "computeTextCentre");
function Fe(t) {
  let n2 = {}, s = Object.keys(t);
  for (let e of s) n2[e] = [];
  for (let e = 0; e < s.length; e++) {
    let i = s[e], r = t[i];
    for (let a = e + 1; a < s.length; ++a) {
      let c2 = s[a], h = t[c2], u = q(r, h);
      u + h.radius <= r.radius + 1e-10 ? n2[c2].push(i) : u + r.radius <= h.radius + 1e-10 && n2[i].push(c2);
    }
  }
  return n2;
}
m(Fe, "getOverlappingCircles");
function re(t, n2, s) {
  let e = {}, i = Fe(t);
  for (let r = 0; r < n2.length; ++r) {
    let a = n2[r].sets, c2 = {}, h = {};
    for (let g = 0; g < a.length; ++g) {
      c2[a[g]] = true;
      let v = i[a[g]];
      for (let y = 0; y < v.length; ++y) h[v[y]] = true;
    }
    let u = [], o = [];
    for (let g in t) g in c2 ? u.push(t[g]) : g in h || o.push(t[g]);
    let p = ie(u, o, s);
    e[a] = p, p.disjoint && n2[r].size > 0 && console.log("WARNING: area " + a + " not represented on screen");
  }
  return e;
}
m(re, "computeTextCentres");
function je(t, n2, s) {
  let e = [];
  return e.push(`
M`, t, n2), e.push(`
m`, -s, 0), e.push(`
a`, s, s, 0, 1, 0, s * 2, 0), e.push(`
a`, s, s, 0, 1, 0, -s * 2, 0), e.join(" ");
}
m(je, "circlePath");
function Pe(t) {
  let n2 = t.split(" ");
  return { x: Number.parseFloat(n2[1]), y: Number.parseFloat(n2[2]), radius: -Number.parseFloat(n2[4]) };
}
m(Pe, "circleFromPath");
function oe(t) {
  if (t.length === 0) return [];
  let n2 = {};
  return at(t, n2), n2.arcs;
}
m(oe, "intersectionAreaArcs");
function ae(t, n2) {
  if (t.length === 0) return "M 0 0";
  let s = Math.pow(10, n2 || 0), e = n2 != null ? (r) => Math.round(r * s) / s : (r) => r;
  if (t.length == 1) {
    let r = t[0].circle;
    return je(e(r.x), e(r.y), e(r.radius));
  }
  let i = [`
M`, e(t[0].p2.x), e(t[0].p2.y)];
  for (let r of t) {
    let a = e(r.circle.radius);
    i.push(`
A`, a, a, 0, r.large ? 1 : 0, r.sweep ? 1 : 0, e(r.p1.x), e(r.p1.y));
  }
  return i.join(" ");
}
m(ae, "arcsToPath");
function Ht(t, n2) {
  return ae(oe(t), n2);
}
m(Ht, "intersectionAreaPath");
function le(t, n2 = {}) {
  let { lossFunction: s, layoutFunction: e = Zt, normalize: i = true, orientation: r = Math.PI / 2, orientationOrder: a, width: c2 = 600, height: h = 350, padding: u = 15, scaleToFit: o = false, symmetricalTextCentre: p = false, distinct: g, round: v = 2 } = n2, y = e(t, { lossFunction: s === "default" || !s ? tt : s === "logRatio" ? Qt : s, distinct: g });
  i && (y = $t(y, r, a));
  let S = te(y, c2, h, u, o), E = re(S, t, p), w = new Map(Object.keys(S).map((b) => [b, { set: b, x: S[b].x, y: S[b].y, radius: S[b].radius }])), D = t.map((b) => {
    let k2 = b.sets.map((f) => w.get(f)), l = oe(k2), m2 = ae(l, v);
    return { circles: k2, arcs: l, path: m2, area: b, has: new Set(b.sets) };
  });
  function x(b) {
    let k2 = "";
    for (let l of D) l.has.size > b.length && b.every((m2) => l.has.has(m2)) && (k2 += " " + l.path);
    return k2;
  }
  return m(x, "genDistinctPath"), D.map(({ circles: b, arcs: k2, path: l, area: m2 }) => ({ data: m2, text: E[m2.sets], circles: b, arcs: k2, path: l, distinctPath: l + x(m2.sets) }));
}
m(le, "layout");
function qe(t) {
  let n2 = /* @__PURE__ */ new Map();
  for (let s of t) {
    let e = s.targets.join("|"), i = n2.get(e);
    i ? Object.assign(i, s.styles) : n2.set(e, { ...s.styles });
  }
  return n2;
}
m(qe, "buildStyleByKey");
var Ge = m((t, n2, s, e) => {
  var _a, _b, _c;
  let i = e.db, r = (_a = i.getConfig) == null ? void 0 : _a.call(i), { themeVariables: a, look: c2, handDrawnSeed: h } = Ot(), u = c2 === "handDrawn", o = [a.venn1, a.venn2, a.venn3, a.venn4, a.venn5, a.venn6, a.venn7, a.venn8].filter(Boolean), p = (_b = i.getDiagramTitle) == null ? void 0 : _b.call(i), g = i.getSubsetData(), v = i.getTextData(), y = qe(i.getStyleData()), S = (r == null ? void 0 : r.width) ?? 800, E = (r == null ? void 0 : r.height) ?? 450, D = S / 1600, x = p ? 48 * D : 0, b = a.primaryTextColor ?? a.textColor, k2 = d(n2);
  k2.attr("viewBox", `0 0 ${S} ${E}`), p && k2.append("text").text(p).attr("class", "venn-title").attr("font-size", `${32 * D}px`).attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("x", "50%").attr("y", 32 * D).style("fill", a.vennTitleTextColor || a.titleColor);
  let l = ia(document.createElement("div")), m2 = se().width(S).height(E - x);
  l.datum(g).call(m2);
  let f = u ? Vt.svg(l.select("svg").node()) : void 0, V = le(g, { width: S, height: E - x, padding: (r == null ? void 0 : r.padding) ?? 15 }), I = /* @__PURE__ */ new Map();
  for (let T of V) {
    let R = Q([...T.data.sets].sort());
    I.set(R, T);
  }
  v.length > 0 && Ue(r, I, l, v, D, y);
  let C = k(a.background || "#f4f4f4");
  l.selectAll(".venn-circle").each(function(T, R) {
    var _a2;
    let z = ia(this), O = Q([...T.sets].sort()), N = y.get(O), L = (N == null ? void 0 : N.fill) || o[R % o.length] || a.primaryColor;
    z.classed(`venn-set-${R % 8}`, true);
    let H = (N == null ? void 0 : N["fill-opacity"]) ?? 0.1, Y = (N == null ? void 0 : N.stroke) || L, j = (N == null ? void 0 : N["stroke-width"]) || `${5 * D}`;
    if (u && f) {
      let K = I.get(O);
      if (K && K.circles.length > 0) {
        let U = K.circles[0], M = f.circle(U.x, U.y, U.radius * 2, { roughness: 0.7, seed: h, fill: de(L, 0.7), fillStyle: "hachure", fillWeight: 2, hachureGap: 8, hachureAngle: -41 + R * 60, stroke: Y, strokeWidth: parseFloat(String(j)) });
        z.select("path").remove(), (_a2 = z.node()) == null ? void 0 : _a2.insertBefore(M, z.select("text").node());
      }
    } else z.select("path").style("fill", L).style("fill-opacity", H).style("stroke", Y).style("stroke-width", j).style("stroke-opacity", 0.95);
    let A = (N == null ? void 0 : N.color) || (C ? c(L, 30) : n(L, 30));
    z.select("text").style("font-size", `${48 * D}px`).style("fill", A);
  }), u && f ? l.selectAll(".venn-intersection").each(function(T) {
    var _a2;
    let R = ia(this), _ = Q([...T.sets].sort()), O = y.get(_), N = O == null ? void 0 : O.fill;
    if (N) {
      let L = R.select("path"), H = L.attr("d");
      if (H) {
        let Y = f.path(H, { roughness: 0.7, seed: h, fill: de(N, 0.3), fillStyle: "cross-hatch", fillWeight: 2, hachureGap: 6, hachureAngle: 60, stroke: "none" }), j = L.node();
        (_a2 = j == null ? void 0 : j.parentNode) == null ? void 0 : _a2.insertBefore(Y, j), L.remove();
      }
    } else R.select("path").style("fill-opacity", 0);
    R.select("text").style("font-size", `${48 * D}px`).style("fill", (O == null ? void 0 : O.color) ?? a.vennSetTextColor ?? b);
  }) : (l.selectAll(".venn-intersection text").style("font-size", `${48 * D}px`).style("fill", (T) => {
    var _a2;
    let z = Q([...T.sets].sort());
    return ((_a2 = y.get(z)) == null ? void 0 : _a2.color) ?? a.vennSetTextColor ?? b;
  }), l.selectAll(".venn-intersection path").style("fill-opacity", (T) => {
    var _a2;
    let z = Q([...T.sets].sort());
    return ((_a2 = y.get(z)) == null ? void 0 : _a2.fill) ? 1 : 0;
  }).style("fill", (T) => {
    var _a2;
    let z = Q([...T.sets].sort());
    return ((_a2 = y.get(z)) == null ? void 0 : _a2.fill) ?? "transparent";
  }));
  let G = k2.append("g").attr("transform", `translate(0, ${x})`), F = l.select("svg").node();
  if (F && "childNodes" in F) for (let T of [...F.childNodes]) (_c = G.node()) == null ? void 0 : _c.appendChild(T);
  is(k2, E, S, (r == null ? void 0 : r.useMaxWidth) ?? true);
}, "draw");
function Q(t) {
  return t.join("|");
}
m(Q, "stableSetsKey");
function Ue(t, n2, s, e, i, r) {
  var _a;
  let a = (t == null ? void 0 : t.useDebugLayout) ?? false, h = s.select("svg").append("g").attr("class", "venn-text-nodes"), u = /* @__PURE__ */ new Map();
  for (let o of e) {
    let p = Q(o.sets), g = u.get(p);
    g ? g.push(o) : u.set(p, [o]);
  }
  for (let [o, p] of u.entries()) {
    let g = n2.get(o);
    if (!(g == null ? void 0 : g.text)) continue;
    let v = g.text.x, y = g.text.y, S = Math.min(...g.circles.map((T) => T.radius)), E = Math.min(...g.circles.map((T) => T.radius - Math.hypot(v - T.x, y - T.y))), w = Number.isFinite(E) ? Math.max(0, E) : 0;
    w === 0 && Number.isFinite(S) && (w = S * 0.6);
    let D = h.append("g").attr("class", "venn-text-area").attr("font-size", `${40 * i}px`);
    a && D.append("circle").attr("class", "venn-text-debug-circle").attr("cx", v).attr("cy", y).attr("r", w).attr("fill", "none").attr("stroke", "purple").attr("stroke-width", 1.5 * i).attr("stroke-dasharray", `${6 * i} ${4 * i}`);
    let x = Math.max(80 * i, w * 2 * 0.95), b = Math.max(60 * i, w * 2 * 0.95), m2 = (g.data.label && g.data.label.length > 0 ? Math.min(32 * i, w * 0.25) : 0) + (p.length <= 2 ? 30 * i : 0), f = v - x / 2, V = y - b / 2 + m2, I = Math.max(1, Math.ceil(Math.sqrt(p.length))), C = Math.max(1, Math.ceil(p.length / I)), G = x / I, F = b / C;
    for (let [T, R] of p.entries()) {
      let z = T % I, _ = Math.floor(T / I), O = f + G * (z + 0.5), N = V + F * (_ + 0.5);
      a && D.append("rect").attr("class", "venn-text-debug-cell").attr("x", f + G * z).attr("y", V + F * _).attr("width", G).attr("height", F).attr("fill", "none").attr("stroke", "teal").attr("stroke-width", 1 * i).attr("stroke-dasharray", `${4 * i} ${3 * i}`);
      let L = G * 0.9, H = F * 0.9, Y = D.append("foreignObject").attr("class", "venn-text-node-fo").attr("width", L).attr("height", H).attr("x", O - L / 2).attr("y", N - H / 2).attr("overflow", "visible"), j = (_a = r.get(R.id)) == null ? void 0 : _a.color, A = Y.append("xhtml:span").attr("class", "venn-text-node").style("display", "flex").style("width", "100%").style("height", "100%").style("white-space", "normal").style("align-items", "center").style("justify-content", "center").style("text-align", "center").style("overflow-wrap", "normal").style("word-break", "normal").text(R.label ?? R.id);
      j && A.style("color", j);
    }
  }
}
m(Ue, "renderTextNodes");
var ce = { draw: Ge };
var xn = { parser: qt, db: Gt, renderer: ce, styles: Ut };
export {
  xn as diagram
};
//# sourceMappingURL=vennDiagram-IE5QUKF5-O2RN4BXX.js.map

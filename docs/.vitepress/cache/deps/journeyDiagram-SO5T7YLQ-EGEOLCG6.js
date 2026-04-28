import {
  o
} from "./chunk-NFYNFPBA.js";
import {
  f,
  g,
  u,
  x
} from "./chunk-TEJXR2YZ.js";
import "./chunk-DJX4MEFN.js";
import {
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
import {
  ia,
  ks
} from "./chunk-LKDN26KO.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/journeyDiagram-SO5T7YLQ.mjs
var Z = function() {
  var t = m(function(h, i, r, o2) {
    for (r = r || {}, o2 = h.length; o2--; r[h[o2]] = i) ;
    return r;
  }, "o"), e = [6, 8, 10, 11, 12, 14, 16, 17, 18], a = [1, 9], d = [1, 10], n = [1, 11], u2 = [1, 12], p = [1, 13], c = [1, 14], g2 = { trace: m(function() {
  }, "trace"), yy: {}, symbols_: { error: 2, start: 3, journey: 4, document: 5, EOF: 6, line: 7, SPACE: 8, statement: 9, NEWLINE: 10, title: 11, acc_title: 12, acc_title_value: 13, acc_descr: 14, acc_descr_value: 15, acc_descr_multiline_value: 16, section: 17, taskName: 18, taskData: 19, $accept: 0, $end: 1 }, terminals_: { 2: "error", 4: "journey", 6: "EOF", 8: "SPACE", 10: "NEWLINE", 11: "title", 12: "acc_title", 13: "acc_title_value", 14: "acc_descr", 15: "acc_descr_value", 16: "acc_descr_multiline_value", 17: "section", 18: "taskName", 19: "taskData" }, productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [9, 1], [9, 2], [9, 2], [9, 1], [9, 1], [9, 2]], performAction: m(function(i, r, o2, y, f2, l, _) {
    var k = l.length - 1;
    switch (f2) {
      case 1:
        return l[k - 1];
      case 2:
        this.$ = [];
        break;
      case 3:
        l[k - 1].push(l[k]), this.$ = l[k - 1];
        break;
      case 4:
      case 5:
        this.$ = l[k];
        break;
      case 6:
      case 7:
        this.$ = [];
        break;
      case 8:
        y.setDiagramTitle(l[k].substr(6)), this.$ = l[k].substr(6);
        break;
      case 9:
        this.$ = l[k].trim(), y.setAccTitle(this.$);
        break;
      case 10:
      case 11:
        this.$ = l[k].trim(), y.setAccDescription(this.$);
        break;
      case 12:
        y.addSection(l[k].substr(8)), this.$ = l[k].substr(8);
        break;
      case 13:
        y.addTask(l[k - 1], l[k]), this.$ = "task";
        break;
    }
  }, "anonymous"), table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, t(e, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: a, 12: d, 14: n, 16: u2, 17: p, 18: c }, t(e, [2, 7], { 1: [2, 1] }), t(e, [2, 3]), { 9: 15, 11: a, 12: d, 14: n, 16: u2, 17: p, 18: c }, t(e, [2, 5]), t(e, [2, 6]), t(e, [2, 8]), { 13: [1, 16] }, { 15: [1, 17] }, t(e, [2, 11]), t(e, [2, 12]), { 19: [1, 18] }, t(e, [2, 4]), t(e, [2, 9]), t(e, [2, 10]), t(e, [2, 13])], defaultActions: {}, parseError: m(function(i, r) {
    if (r.recoverable) this.trace(i);
    else {
      var o2 = new Error(i);
      throw o2.hash = r, o2;
    }
  }, "parseError"), parse: m(function(i) {
    var r = this, o2 = [0], y = [], f2 = [null], l = [], _ = this.table, k = "", E = 0, it = 0, rt = 0, St = 2, st = 1, Mt = l.slice.call(arguments, 1), b = Object.create(this.lexer), A = { yy: {} };
    for (var Y in this.yy) Object.prototype.hasOwnProperty.call(this.yy, Y) && (A.yy[Y] = this.yy[Y]);
    b.setInput(i, A.yy), A.yy.lexer = b, A.yy.parser = this, typeof b.yylloc > "u" && (b.yylloc = {});
    var q = b.yylloc;
    l.push(q);
    var Ct = b.options && b.options.ranges;
    typeof A.yy.parseError == "function" ? this.parseError = A.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
    function Ut(w) {
      o2.length = o2.length - 2 * w, f2.length = f2.length - w, l.length = l.length - w;
    }
    m(Ut, "popStack");
    function Et() {
      var w;
      return w = y.pop() || b.lex() || st, typeof w != "number" && (w instanceof Array && (y = w, w = y.pop()), w = r.symbols_[w] || w), w;
    }
    m(Et, "lex");
    for (var v, D, F, T, Zt, H, V = {}, j, M, at, W; ; ) {
      if (F = o2[o2.length - 1], this.defaultActions[F] ? T = this.defaultActions[F] : ((v === null || typeof v > "u") && (v = Et()), T = _[F] && _[F][v]), typeof T > "u" || !T.length || !T[0]) {
        var X = "";
        W = [];
        for (j in _[F]) this.terminals_[j] && j > St && W.push("'" + this.terminals_[j] + "'");
        b.showPosition ? X = "Parse error on line " + (E + 1) + `:
` + b.showPosition() + `
Expecting ` + W.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : X = "Parse error on line " + (E + 1) + ": Unexpected " + (v == st ? "end of input" : "'" + (this.terminals_[v] || v) + "'"), this.parseError(X, { text: b.match, token: this.terminals_[v] || v, line: b.yylineno, loc: q, expected: W });
      }
      if (T[0] instanceof Array && T.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + F + ", token: " + v);
      switch (T[0]) {
        case 1:
          o2.push(v), f2.push(b.yytext), l.push(b.yylloc), o2.push(T[1]), v = null, D ? (v = D, D = null) : (it = b.yyleng, k = b.yytext, E = b.yylineno, q = b.yylloc, rt > 0 && rt--);
          break;
        case 2:
          if (M = this.productions_[T[1]][1], V.$ = f2[f2.length - M], V._$ = { first_line: l[l.length - (M || 1)].first_line, last_line: l[l.length - 1].last_line, first_column: l[l.length - (M || 1)].first_column, last_column: l[l.length - 1].last_column }, Ct && (V._$.range = [l[l.length - (M || 1)].range[0], l[l.length - 1].range[1]]), H = this.performAction.apply(V, [k, it, E, A.yy, T[1], f2, l].concat(Mt)), typeof H < "u") return H;
          M && (o2 = o2.slice(0, -1 * M * 2), f2 = f2.slice(0, -1 * M), l = l.slice(0, -1 * M)), o2.push(this.productions_[T[1]][0]), f2.push(V.$), l.push(V._$), at = _[o2[o2.length - 2]][o2[o2.length - 1]], o2.push(at);
          break;
        case 3:
          return true;
      }
    }
    return true;
  }, "parse") }, m2 = function() {
    var h = { EOF: 1, parseError: m(function(r, o2) {
      if (this.yy.parser) this.yy.parser.parseError(r, o2);
      else throw new Error(r);
    }, "parseError"), setInput: m(function(i, r) {
      return this.yy = r || this.yy || {}, this._input = i, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
    }, "setInput"), input: m(function() {
      var i = this._input[0];
      this.yytext += i, this.yyleng++, this.offset++, this.match += i, this.matched += i;
      var r = i.match(/(?:\r\n?|\n).*/g);
      return r ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), i;
    }, "input"), unput: m(function(i) {
      var r = i.length, o2 = i.split(/(?:\r\n?|\n)/g);
      this._input = i + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - r), this.offset -= r;
      var y = this.match.split(/(?:\r\n?|\n)/g);
      this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), o2.length - 1 && (this.yylineno -= o2.length - 1);
      var f2 = this.yylloc.range;
      return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: o2 ? (o2.length === y.length ? this.yylloc.first_column : 0) + y[y.length - o2.length].length - o2[0].length : this.yylloc.first_column - r }, this.options.ranges && (this.yylloc.range = [f2[0], f2[0] + this.yyleng - r]), this.yyleng = this.yytext.length, this;
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
      var i = this.pastInput(), r = new Array(i.length + 1).join("-");
      return i + this.upcomingInput() + `
` + r + "^";
    }, "showPosition"), test_match: m(function(i, r) {
      var o2, y, f2;
      if (this.options.backtrack_lexer && (f2 = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (f2.yylloc.range = this.yylloc.range.slice(0))), y = i[0].match(/(?:\r\n?|\n).*/g), y && (this.yylineno += y.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: y ? y[y.length - 1].length - y[y.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + i[0].length }, this.yytext += i[0], this.match += i[0], this.matches = i, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(i[0].length), this.matched += i[0], o2 = this.performAction.call(this, this.yy, this, r, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), o2) return o2;
      if (this._backtrack) {
        for (var l in f2) this[l] = f2[l];
        return false;
      }
      return false;
    }, "test_match"), next: m(function() {
      if (this.done) return this.EOF;
      this._input || (this.done = true);
      var i, r, o2, y;
      this._more || (this.yytext = "", this.match = "");
      for (var f2 = this._currentRules(), l = 0; l < f2.length; l++) if (o2 = this._input.match(this.rules[f2[l]]), o2 && (!r || o2[0].length > r[0].length)) {
        if (r = o2, y = l, this.options.backtrack_lexer) {
          if (i = this.test_match(o2, f2[l]), i !== false) return i;
          if (this._backtrack) {
            r = false;
            continue;
          } else return false;
        } else if (!this.options.flex) break;
      }
      return r ? (i = this.test_match(r, f2[y]), i !== false ? i : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
    }, "next"), lex: m(function() {
      var r = this.next();
      return r || this.lex();
    }, "lex"), begin: m(function(r) {
      this.conditionStack.push(r);
    }, "begin"), popState: m(function() {
      var r = this.conditionStack.length - 1;
      return r > 0 ? this.conditionStack.pop() : this.conditionStack[0];
    }, "popState"), _currentRules: m(function() {
      return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
    }, "_currentRules"), topState: m(function(r) {
      return r = this.conditionStack.length - 1 - Math.abs(r || 0), r >= 0 ? this.conditionStack[r] : "INITIAL";
    }, "topState"), pushState: m(function(r) {
      this.begin(r);
    }, "pushState"), stateStackSize: m(function() {
      return this.conditionStack.length;
    }, "stateStackSize"), options: { "case-insensitive": true }, performAction: m(function(r, o2, y, f2) {
      var l = f2;
      switch (y) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          return 10;
        case 3:
          break;
        case 4:
          break;
        case 5:
          return 4;
        case 6:
          return 11;
        case 7:
          return this.begin("acc_title"), 12;
          break;
        case 8:
          return this.popState(), "acc_title_value";
          break;
        case 9:
          return this.begin("acc_descr"), 14;
          break;
        case 10:
          return this.popState(), "acc_descr_value";
          break;
        case 11:
          this.begin("acc_descr_multiline");
          break;
        case 12:
          this.popState();
          break;
        case 13:
          return "acc_descr_multiline_value";
        case 14:
          return 17;
        case 15:
          return 18;
        case 16:
          return 19;
        case 17:
          return ":";
        case 18:
          return 6;
        case 19:
          return "INVALID";
      }
    }, "anonymous"), rules: [/^(?:%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:journey\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i], conditions: { acc_descr_multiline: { rules: [12, 13], inclusive: false }, acc_descr: { rules: [10], inclusive: false }, acc_title: { rules: [8], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 19], inclusive: true } } };
    return h;
  }();
  g2.lexer = m2;
  function x2() {
    this.yy = {};
  }
  return m(x2, "Parser"), x2.prototype = g2, g2.Parser = x2, new x2();
}();
Z.parser = Z;
var kt = Z;
var L = "";
var J = [];
var B = [];
var N = [];
var Pt = m(function() {
  J.length = 0, B.length = 0, L = "", N.length = 0, os();
}, "clear");
var It = m(function(t) {
  L = t, J.push(t);
}, "addSection");
var At = m(function() {
  return J;
}, "getSections");
var Ft = m(function() {
  let t = bt(), e = 100, a = 0;
  for (; !t && a < e; ) t = bt(), a++;
  return B.push(...N), B;
}, "getTasks");
var Vt = m(function() {
  let t = [];
  return B.forEach((a) => {
    a.people && t.push(...a.people);
  }), [...new Set(t)].sort();
}, "updateActors");
var Lt = m(function(t, e) {
  let a = e.substr(1).split(":"), d = 0, n = [];
  a.length === 1 ? (d = Number(a[0]), n = []) : (d = Number(a[0]), n = a[1].split(","));
  let u2 = n.map((c) => c.trim()), p = { section: L, type: L, people: u2, task: t, score: d };
  N.push(p);
}, "addTask");
var Rt = m(function(t) {
  let e = { section: L, type: L, description: t, task: t, classes: [] };
  B.push(e);
}, "addTaskOrg");
var bt = m(function() {
  let t = m(function(a) {
    return N[a].processed;
  }, "compileTask"), e = true;
  for (let [a, d] of N.entries()) t(a), e = e && d.processed;
  return e;
}, "compileTasks");
var Bt = m(function() {
  return Vt();
}, "getActors");
var K = { getConfig: m(() => qo().journey, "getConfig"), clear: Pt, setDiagramTitle: hs, getDiagramTitle: ns, setAccTitle: es, getAccTitle: ss, setAccDescription: as, getAccDescription: ls, addSection: It, getSections: At, getTasks: Ft, addTask: Lt, addTaskOrg: Rt, getActors: Bt };
var Nt = m((t) => `.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor ? `fill: ${t.faceColor}` : "fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0 ? `fill: ${t.fillType0}` : ""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0 ? `fill: ${t.fillType1}` : ""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0 ? `fill: ${t.fillType2}` : ""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0 ? `fill: ${t.fillType3}` : ""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0 ? `fill: ${t.fillType4}` : ""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0 ? `fill: ${t.fillType5}` : ""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0 ? `fill: ${t.fillType6}` : ""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0 ? `fill: ${t.fillType7}` : ""};
  }

  .actor-0 {
    ${t.actor0 ? `fill: ${t.actor0}` : ""};
  }
  .actor-1 {
    ${t.actor1 ? `fill: ${t.actor1}` : ""};
  }
  .actor-2 {
    ${t.actor2 ? `fill: ${t.actor2}` : ""};
  }
  .actor-3 {
    ${t.actor3 ? `fill: ${t.actor3}` : ""};
  }
  .actor-4 {
    ${t.actor4 ? `fill: ${t.actor4}` : ""};
  }
  .actor-5 {
    ${t.actor5 ? `fill: ${t.actor5}` : ""};
  }
  ${o()}
`, "getStyles");
var _t = Nt;
var tt = m(function(t, e) {
  return x(t, e);
}, "drawRect");
var jt = m(function(t, e) {
  let d = t.append("circle").attr("cx", e.cx).attr("cy", e.cy).attr("class", "face").attr("r", 15).attr("stroke-width", 2).attr("overflow", "visible"), n = t.append("g");
  n.append("circle").attr("cx", e.cx - 15 / 3).attr("cy", e.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666"), n.append("circle").attr("cx", e.cx + 15 / 3).attr("cy", e.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666");
  function u2(g2) {
    let m2 = ks().startAngle(Math.PI / 2).endAngle(3 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    g2.append("path").attr("class", "mouth").attr("d", m2).attr("transform", "translate(" + e.cx + "," + (e.cy + 2) + ")");
  }
  m(u2, "smile");
  function p(g2) {
    let m2 = ks().startAngle(3 * Math.PI / 2).endAngle(5 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    g2.append("path").attr("class", "mouth").attr("d", m2).attr("transform", "translate(" + e.cx + "," + (e.cy + 7) + ")");
  }
  m(p, "sad");
  function c(g2) {
    g2.append("line").attr("class", "mouth").attr("stroke", 2).attr("x1", e.cx - 5).attr("y1", e.cy + 7).attr("x2", e.cx + 5).attr("y2", e.cy + 7).attr("class", "mouth").attr("stroke-width", "1px").attr("stroke", "#666");
  }
  return m(c, "ambivalent"), e.score > 3 ? u2(n) : e.score < 3 ? p(n) : c(n), d;
}, "drawFace");
var vt = m(function(t, e) {
  let a = t.append("circle");
  return a.attr("cx", e.cx), a.attr("cy", e.cy), a.attr("class", "actor-" + e.pos), a.attr("fill", e.fill), a.attr("stroke", e.stroke), a.attr("r", e.r), a.class !== void 0 && a.attr("class", a.class), e.title !== void 0 && a.append("title").text(e.title), a;
}, "drawCircle");
var wt = m(function(t, e) {
  return f(t, e);
}, "drawText");
var Wt = m(function(t, e) {
  function a(n, u2, p, c, g2) {
    return n + "," + u2 + " " + (n + p) + "," + u2 + " " + (n + p) + "," + (u2 + c - g2) + " " + (n + p - g2 * 1.2) + "," + (u2 + c) + " " + n + "," + (u2 + c);
  }
  m(a, "genPoints");
  let d = t.append("polygon");
  d.attr("points", a(e.x, e.y, 50, 20, 7)), d.attr("class", "labelBox"), e.y = e.y + e.labelMargin, e.x = e.x + 0.5 * e.labelMargin, wt(t, e);
}, "drawLabel");
var zt = m(function(t, e, a) {
  let d = t.append("g"), n = u();
  n.x = e.x, n.y = e.y, n.fill = e.fill, n.width = a.width * e.taskCount + a.diagramMarginX * (e.taskCount - 1), n.height = a.height, n.class = "journey-section section-type-" + e.num, n.rx = 3, n.ry = 3, tt(d, n), Tt(a)(e.text, d, n.x, n.y, n.width, n.height, { class: "journey-section section-type-" + e.num }, a, e.colour);
}, "drawSection");
var Q = -1;
var Ot = m(function(t, e, a, d) {
  let n = e.x + a.width / 2, u2 = t.append("g");
  Q++, u2.append("line").attr("id", d + "-task" + Q).attr("x1", n).attr("y1", e.y).attr("x2", n).attr("y2", 450).attr("class", "task-line").attr("stroke-width", "1px").attr("stroke-dasharray", "4 2").attr("stroke", "#666"), jt(u2, { cx: n, cy: 300 + (5 - e.score) * 30, score: e.score });
  let c = u();
  c.x = e.x, c.y = e.y, c.fill = e.fill, c.width = a.width, c.height = a.height, c.class = "task task-type-" + e.num, c.rx = 3, c.ry = 3, tt(u2, c);
  let g2 = e.x + 14;
  e.people.forEach((m2) => {
    let x2 = e.actors[m2].color, h = { cx: g2, cy: e.y, r: 7, fill: x2, stroke: "#000", title: m2, pos: e.actors[m2].position };
    vt(u2, h), g2 += 10;
  }), Tt(a)(e.task, u2, c.x, c.y, c.width, c.height, { class: "task" }, a, e.colour);
}, "drawTask");
var Yt = m(function(t, e) {
  g(t, e);
}, "drawBackgroundRect");
var Tt = function() {
  function t(n, u2, p, c, g2, m2, x2, h) {
    let i = u2.append("text").attr("x", p + g2 / 2).attr("y", c + m2 / 2 + 5).style("font-color", h).style("text-anchor", "middle").text(n);
    d(i, x2);
  }
  m(t, "byText");
  function e(n, u2, p, c, g2, m2, x2, h, i) {
    let { taskFontSize: r, taskFontFamily: o2 } = h, y = n.split(/<br\s*\/?>/gi);
    for (let f2 = 0; f2 < y.length; f2++) {
      let l = f2 * r - r * (y.length - 1) / 2, _ = u2.append("text").attr("x", p + g2 / 2).attr("y", c).attr("fill", i).style("text-anchor", "middle").style("font-size", r).style("font-family", o2);
      _.append("tspan").attr("x", p + g2 / 2).attr("dy", l).text(y[f2]), _.attr("y", c + m2 / 2).attr("dominant-baseline", "central").attr("alignment-baseline", "central"), d(_, x2);
    }
  }
  m(e, "byTspan");
  function a(n, u2, p, c, g2, m2, x2, h) {
    let i = u2.append("switch"), o2 = i.append("foreignObject").attr("x", p).attr("y", c).attr("width", g2).attr("height", m2).attr("position", "fixed").append("xhtml:div").style("display", "table").style("height", "100%").style("width", "100%");
    o2.append("div").attr("class", "label").style("display", "table-cell").style("text-align", "center").style("vertical-align", "middle").text(n), e(n, i, p, c, g2, m2, x2, h), d(o2, x2);
  }
  m(a, "byFo");
  function d(n, u2) {
    for (let p in u2) p in u2 && n.attr(p, u2[p]);
  }
  return m(d, "_setTextAttrs"), function(n) {
    return n.textPlacement === "fo" ? a : n.textPlacement === "old" ? t : e;
  };
}();
var qt = m(function(t, e) {
  Q = -1, t.append("defs").append("marker").attr("id", e + "-arrowhead").attr("refX", 5).attr("refY", 2).attr("markerWidth", 6).attr("markerHeight", 4).attr("orient", "auto").append("path").attr("d", "M 0,0 V 4 L6,2 Z");
}, "initGraphics");
var R = { drawRect: tt, drawCircle: vt, drawSection: zt, drawText: wt, drawLabel: Wt, drawTask: Ot, drawBackgroundRect: Yt, initGraphics: qt };
var Dt = m(function(t) {
  Object.keys(t).forEach(function(a) {
    S[a] = t[a];
  });
}, "setConf");
var C = {};
var O = 0;
function Ht(t) {
  let e = qo().journey, a = e.maxLabelWidth;
  O = 0;
  let d = 60;
  Object.keys(C).forEach((n) => {
    let u2 = C[n].color, p = { cx: 20, cy: d, r: 7, fill: u2, stroke: "#000", pos: C[n].position };
    R.drawCircle(t, p);
    let c = t.append("text").attr("visibility", "hidden").text(n), g2 = c.node().getBoundingClientRect().width;
    c.remove();
    let m2 = [];
    if (g2 <= a) m2 = [n];
    else {
      let x2 = n.split(" "), h = "";
      c = t.append("text").attr("visibility", "hidden"), x2.forEach((i) => {
        let r = h ? `${h} ${i}` : i;
        if (c.text(r), c.node().getBoundingClientRect().width > a) {
          if (h && m2.push(h), h = i, c.text(i), c.node().getBoundingClientRect().width > a) {
            let y = "";
            for (let f2 of i) y += f2, c.text(y + "-"), c.node().getBoundingClientRect().width > a && (m2.push(y.slice(0, -1) + "-"), y = f2);
            h = y;
          }
        } else h = r;
      }), h && m2.push(h), c.remove();
    }
    m2.forEach((x2, h) => {
      let i = { x: 40, y: d + 7 + h * 20, fill: "#666", text: x2, textMargin: e.boxTextMargin ?? 5 }, o2 = R.drawText(t, i).node().getBoundingClientRect().width;
      o2 > O && o2 > e.leftMargin - o2 && (O = o2);
    }), d += Math.max(20, m2.length * 20);
  });
}
m(Ht, "drawActorLegend");
var S = qo().journey;
var I = 0;
var Xt = m(function(t, e, a, d) {
  let n = qo(), u2 = n.journey.titleColor, p = n.journey.titleFontSize, c = n.journey.titleFontFamily, g2 = n.securityLevel, m2;
  g2 === "sandbox" && (m2 = ia("#i" + e));
  let x2 = g2 === "sandbox" ? ia(m2.nodes()[0].contentDocument.body) : ia("body");
  $.init();
  let h = x2.select("#" + e);
  R.initGraphics(h, e);
  let i = d.db.getTasks(), r = d.db.getDiagramTitle(), o2 = d.db.getActors();
  for (let E in C) delete C[E];
  let y = 0;
  o2.forEach((E) => {
    C[E] = { color: S.actorColours[y % S.actorColours.length], position: y }, y++;
  }), Ht(h), I = S.leftMargin + O, $.insert(0, 0, I, Object.keys(C).length * 50), Gt(h, i, 0, e);
  let f2 = $.getBounds();
  r && h.append("text").text(r).attr("x", I).attr("font-size", p).attr("font-weight", "bold").attr("y", 25).attr("fill", u2).attr("font-family", c);
  let l = f2.stopy - f2.starty + 2 * S.diagramMarginY, _ = I + f2.stopx + 2 * S.diagramMarginX;
  is(h, l, _, S.useMaxWidth), h.append("line").attr("x1", I).attr("y1", S.height * 4).attr("x2", _ - I - 4).attr("y2", S.height * 4).attr("stroke-width", 4).attr("stroke", "black").attr("marker-end", "url(#" + e + "-arrowhead)");
  let k = r ? 70 : 0;
  h.attr("viewBox", `${f2.startx} -25 ${_} ${l + k}`), h.attr("preserveAspectRatio", "xMinYMin meet"), h.attr("height", l + k + 25);
}, "draw");
var $ = { data: { startx: void 0, stopx: void 0, starty: void 0, stopy: void 0 }, verticalPos: 0, sequenceItems: [], init: m(function() {
  this.sequenceItems = [], this.data = { startx: void 0, stopx: void 0, starty: void 0, stopy: void 0 }, this.verticalPos = 0;
}, "init"), updateVal: m(function(t, e, a, d) {
  t[e] === void 0 ? t[e] = a : t[e] = d(a, t[e]);
}, "updateVal"), updateBounds: m(function(t, e, a, d) {
  let n = qo().journey, u2 = this, p = 0;
  function c(g2) {
    return m(function(x2) {
      p++;
      let h = u2.sequenceItems.length - p + 1;
      u2.updateVal(x2, "starty", e - h * n.boxMargin, Math.min), u2.updateVal(x2, "stopy", d + h * n.boxMargin, Math.max), u2.updateVal($.data, "startx", t - h * n.boxMargin, Math.min), u2.updateVal($.data, "stopx", a + h * n.boxMargin, Math.max), g2 !== "activation" && (u2.updateVal(x2, "startx", t - h * n.boxMargin, Math.min), u2.updateVal(x2, "stopx", a + h * n.boxMargin, Math.max), u2.updateVal($.data, "starty", e - h * n.boxMargin, Math.min), u2.updateVal($.data, "stopy", d + h * n.boxMargin, Math.max));
    }, "updateItemBounds");
  }
  m(c, "updateFn"), this.sequenceItems.forEach(c());
}, "updateBounds"), insert: m(function(t, e, a, d) {
  let n = Math.min(t, a), u2 = Math.max(t, a), p = Math.min(e, d), c = Math.max(e, d);
  this.updateVal($.data, "startx", n, Math.min), this.updateVal($.data, "starty", p, Math.min), this.updateVal($.data, "stopx", u2, Math.max), this.updateVal($.data, "stopy", c, Math.max), this.updateBounds(n, p, u2, c);
}, "insert"), bumpVerticalPos: m(function(t) {
  this.verticalPos = this.verticalPos + t, this.data.stopy = this.verticalPos;
}, "bumpVerticalPos"), getVerticalPos: m(function() {
  return this.verticalPos;
}, "getVerticalPos"), getBounds: m(function() {
  return this.data;
}, "getBounds") };
var et = S.sectionFills;
var $t = S.sectionColours;
var Gt = m(function(t, e, a, d) {
  let n = qo().journey, u2 = "", p = n.height * 2 + n.diagramMarginY, c = a + p, g2 = 0, m2 = "#CCC", x2 = "black", h = 0;
  for (let [i, r] of e.entries()) {
    if (u2 !== r.section) {
      m2 = et[g2 % et.length], h = g2 % et.length, x2 = $t[g2 % $t.length];
      let y = 0, f2 = r.section;
      for (let _ = i; _ < e.length && e[_].section == f2; _++) y = y + 1;
      let l = { x: i * n.taskMargin + i * n.width + I, y: 50, text: r.section, fill: m2, num: h, colour: x2, taskCount: y };
      R.drawSection(t, l, n), u2 = r.section, g2++;
    }
    let o2 = r.people.reduce((y, f2) => (C[f2] && (y[f2] = C[f2]), y), {});
    r.x = i * n.taskMargin + i * n.width + I, r.y = c, r.width = n.diagramMarginX, r.height = n.diagramMarginY, r.colour = x2, r.fill = m2, r.num = h, r.actors = o2, R.drawTask(t, r, n, d), $.insert(r.x, r.y, r.x + r.width + n.taskMargin, 450);
  }
}, "drawTasks");
var nt = { setConf: Dt, draw: Xt };
var be = { parser: kt, db: K, renderer: nt, styles: _t, init: m((t) => {
  nt.setConf(t.journey), K.clear();
}, "init") };
export {
  be as diagram
};
//# sourceMappingURL=journeyDiagram-SO5T7YLQ-EGEOLCG6.js.map

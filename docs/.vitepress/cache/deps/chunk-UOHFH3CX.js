import {
  Ai,
  De,
  Df,
  Jr,
  Ki,
  Mi,
  Nf,
  Qm,
  Qr,
  Ri,
  Rn,
  Tm,
  Ui,
  Vi,
  Xr,
  Zr,
  _f,
  _i,
  cm,
  fi,
  fm,
  fn,
  fp,
  h,
  kr,
  lm,
  mp,
  pm,
  pr,
  s0,
  sn,
  ym,
  zi
} from "./chunk-3DBRZS4A.js";
import {
  Cr
} from "./chunk-TIOLQL7Q.js";
import {
  N,
  T,
  Y,
  m as m2
} from "./chunk-EQAKJMPU.js";
import {
  m,
  n,
  o,
  p,
  q,
  r,
  s
} from "./chunk-NOL3LC7I.js";
import {
  __publicField
} from "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-FXACKDTF.mjs
var fu = {};
p(fu, { AnnotatedTextEdit: () => Jr2, ChangeAnnotation: () => si, ChangeAnnotationIdentifier: () => lt, CodeAction: () => _d, CodeActionContext: () => bd, CodeActionKind: () => Id, CodeActionTriggerKind: () => Wa, CodeDescription: () => od, CodeLens: () => Pd, Color: () => iu, ColorInformation: () => td, ColorPresentation: () => rd, Command: () => ai, CompletionItem: () => Td, CompletionItemKind: () => dd, CompletionItemLabelDetails: () => yd, CompletionItemTag: () => md, CompletionList: () => Rd, CreateFile: () => ls, DeleteFile: () => cs, Diagnostic: () => za, DiagnosticRelatedInformation: () => su, DiagnosticSeverity: () => sd, DiagnosticTag: () => ad, DocumentHighlight: () => Ad, DocumentHighlightKind: () => Ed, DocumentLink: () => Ld, DocumentSymbol: () => wd, DocumentUri: () => Zf, EOL: () => QE, FoldingRange: () => id, FoldingRangeKind: () => nd, FormattingOptions: () => Od, Hover: () => $d, InlayHint: () => Bd, InlayHintKind: () => uu, InlayHintLabelPart: () => cu, InlineCompletionContext: () => Xd, InlineCompletionItem: () => Kd, InlineCompletionList: () => Vd, InlineCompletionTriggerKind: () => Hd, InlineValueContext: () => jd, InlineValueEvaluatableExpression: () => qd, InlineValueText: () => Ud, InlineValueVariableLookup: () => zd, InsertReplaceEdit: () => hd, InsertTextFormat: () => pd, InsertTextMode: () => gd, Location: () => Ua, LocationLink: () => ed, MarkedString: () => Ba, MarkupContent: () => fs, MarkupKind: () => lu, OptionalVersionedTextDocumentIdentifier: () => ja, ParameterInformation: () => xd, Position: () => le, Range: () => ie, RenameFile: () => us, SelectedCompletionInfo: () => Yd, SelectionRange: () => Dd, SemanticTokenModifiers: () => Fd, SemanticTokenTypes: () => Md, SemanticTokens: () => Gd, SignatureInformation: () => vd, StringValue: () => Wd, SymbolInformation: () => kd, SymbolKind: () => Cd, SymbolTag: () => Sd, TextDocument: () => Zd, TextDocumentEdit: () => qa, TextDocumentIdentifier: () => ud, TextDocumentItem: () => fd, TextEdit: () => Cr2, URI: () => nu, VersionedTextDocumentIdentifier: () => cd, WorkspaceChange: () => ld, WorkspaceEdit: () => au, WorkspaceFolder: () => Jd, WorkspaceSymbol: () => Nd, integer: () => Qf, uinteger: () => Ga });
var Zf;
var nu;
var Qf;
var Ga;
var le;
var ie;
var Ua;
var ed;
var iu;
var td;
var rd;
var nd;
var id;
var su;
var sd;
var ad;
var od;
var za;
var ai;
var Cr2;
var si;
var lt;
var Jr2;
var qa;
var ls;
var us;
var cs;
var au;
var os;
var ou;
var ld;
var ud;
var cd;
var ja;
var fd;
var lu;
var fs;
var dd;
var pd;
var md;
var hd;
var gd;
var yd;
var Td;
var Rd;
var Ba;
var $d;
var xd;
var vd;
var Ed;
var Ad;
var Cd;
var Sd;
var kd;
var Nd;
var wd;
var Id;
var Wa;
var bd;
var _d;
var Pd;
var Od;
var Ld;
var Dd;
var Md;
var Fd;
var Gd;
var Ud;
var zd;
var qd;
var jd;
var uu;
var cu;
var Bd;
var Wd;
var Kd;
var Vd;
var Hd;
var Yd;
var Xd;
var Jd;
var QE;
var Zd;
var Qd;
var g;
var ds = n(() => {
  "use strict";
  var _a135, _b, _c2, _d2;
  (function(t) {
    function e(r2) {
      return typeof r2 == "string";
    }
    m(e, "is"), t.is = e;
  })(Zf || (Zf = {}));
  (function(t) {
    function e(r2) {
      return typeof r2 == "string";
    }
    m(e, "is"), t.is = e;
  })(nu || (nu = {}));
  (function(t) {
    t.MIN_VALUE = -2147483648, t.MAX_VALUE = 2147483647;
    function e(r2) {
      return typeof r2 == "number" && t.MIN_VALUE <= r2 && r2 <= t.MAX_VALUE;
    }
    m(e, "is"), t.is = e;
  })(Qf || (Qf = {}));
  (function(t) {
    t.MIN_VALUE = 0, t.MAX_VALUE = 2147483647;
    function e(r2) {
      return typeof r2 == "number" && t.MIN_VALUE <= r2 && r2 <= t.MAX_VALUE;
    }
    m(e, "is"), t.is = e;
  })(Ga || (Ga = {}));
  (function(t) {
    function e(n2, i) {
      return n2 === Number.MAX_VALUE && (n2 = Ga.MAX_VALUE), i === Number.MAX_VALUE && (i = Ga.MAX_VALUE), { line: n2, character: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && g.uinteger(i.line) && g.uinteger(i.character);
    }
    m(r2, "is"), t.is = r2;
  })(le || (le = {}));
  (function(t) {
    function e(n2, i, a, o2) {
      if (g.uinteger(n2) && g.uinteger(i) && g.uinteger(a) && g.uinteger(o2)) return { start: le.create(n2, i), end: le.create(a, o2) };
      if (le.is(n2) && le.is(i)) return { start: n2, end: i };
      throw new Error(`Range#create called with invalid arguments[${n2}, ${i}, ${a}, ${o2}]`);
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && le.is(i.start) && le.is(i.end);
    }
    m(r2, "is"), t.is = r2;
  })(ie || (ie = {}));
  (function(t) {
    function e(n2, i) {
      return { uri: n2, range: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && ie.is(i.range) && (g.string(i.uri) || g.undefined(i.uri));
    }
    m(r2, "is"), t.is = r2;
  })(Ua || (Ua = {}));
  (function(t) {
    function e(n2, i, a, o2) {
      return { targetUri: n2, targetRange: i, targetSelectionRange: a, originSelectionRange: o2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && ie.is(i.targetRange) && g.string(i.targetUri) && ie.is(i.targetSelectionRange) && (ie.is(i.originSelectionRange) || g.undefined(i.originSelectionRange));
    }
    m(r2, "is"), t.is = r2;
  })(ed || (ed = {}));
  (function(t) {
    function e(n2, i, a, o2) {
      return { red: n2, green: i, blue: a, alpha: o2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && g.numberRange(i.red, 0, 1) && g.numberRange(i.green, 0, 1) && g.numberRange(i.blue, 0, 1) && g.numberRange(i.alpha, 0, 1);
    }
    m(r2, "is"), t.is = r2;
  })(iu || (iu = {}));
  (function(t) {
    function e(n2, i) {
      return { range: n2, color: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && ie.is(i.range) && iu.is(i.color);
    }
    m(r2, "is"), t.is = r2;
  })(td || (td = {}));
  (function(t) {
    function e(n2, i, a) {
      return { label: n2, textEdit: i, additionalTextEdits: a };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && g.string(i.label) && (g.undefined(i.textEdit) || Cr2.is(i)) && (g.undefined(i.additionalTextEdits) || g.typedArray(i.additionalTextEdits, Cr2.is));
    }
    m(r2, "is"), t.is = r2;
  })(rd || (rd = {}));
  (function(t) {
    t.Comment = "comment", t.Imports = "imports", t.Region = "region";
  })(nd || (nd = {}));
  (function(t) {
    function e(n2, i, a, o2, l, u) {
      let c = { startLine: n2, endLine: i };
      return g.defined(a) && (c.startCharacter = a), g.defined(o2) && (c.endCharacter = o2), g.defined(l) && (c.kind = l), g.defined(u) && (c.collapsedText = u), c;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && g.uinteger(i.startLine) && g.uinteger(i.startLine) && (g.undefined(i.startCharacter) || g.uinteger(i.startCharacter)) && (g.undefined(i.endCharacter) || g.uinteger(i.endCharacter)) && (g.undefined(i.kind) || g.string(i.kind));
    }
    m(r2, "is"), t.is = r2;
  })(id || (id = {}));
  (function(t) {
    function e(n2, i) {
      return { location: n2, message: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && Ua.is(i.location) && g.string(i.message);
    }
    m(r2, "is"), t.is = r2;
  })(su || (su = {}));
  (function(t) {
    t.Error = 1, t.Warning = 2, t.Information = 3, t.Hint = 4;
  })(sd || (sd = {}));
  (function(t) {
    t.Unnecessary = 1, t.Deprecated = 2;
  })(ad || (ad = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return g.objectLiteral(n2) && g.string(n2.href);
    }
    m(e, "is"), t.is = e;
  })(od || (od = {}));
  (function(t) {
    function e(n2, i, a, o2, l, u) {
      let c = { range: n2, message: i };
      return g.defined(a) && (c.severity = a), g.defined(o2) && (c.code = o2), g.defined(l) && (c.source = l), g.defined(u) && (c.relatedInformation = u), c;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      var i;
      let a = n2;
      return g.defined(a) && ie.is(a.range) && g.string(a.message) && (g.number(a.severity) || g.undefined(a.severity)) && (g.integer(a.code) || g.string(a.code) || g.undefined(a.code)) && (g.undefined(a.codeDescription) || g.string((i = a.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (g.string(a.source) || g.undefined(a.source)) && (g.undefined(a.relatedInformation) || g.typedArray(a.relatedInformation, su.is));
    }
    m(r2, "is"), t.is = r2;
  })(za || (za = {}));
  (function(t) {
    function e(n2, i, ...a) {
      let o2 = { title: n2, command: i };
      return g.defined(a) && a.length > 0 && (o2.arguments = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.string(i.title) && g.string(i.command);
    }
    m(r2, "is"), t.is = r2;
  })(ai || (ai = {}));
  (function(t) {
    function e(a, o2) {
      return { range: a, newText: o2 };
    }
    m(e, "replace"), t.replace = e;
    function r2(a, o2) {
      return { range: { start: a, end: a }, newText: o2 };
    }
    m(r2, "insert"), t.insert = r2;
    function n2(a) {
      return { range: a, newText: "" };
    }
    m(n2, "del"), t.del = n2;
    function i(a) {
      let o2 = a;
      return g.objectLiteral(o2) && g.string(o2.newText) && ie.is(o2.range);
    }
    m(i, "is"), t.is = i;
  })(Cr2 || (Cr2 = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { label: n2 };
      return i !== void 0 && (o2.needsConfirmation = i), a !== void 0 && (o2.description = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && g.string(i.label) && (g.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (g.string(i.description) || i.description === void 0);
    }
    m(r2, "is"), t.is = r2;
  })(si || (si = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return g.string(n2);
    }
    m(e, "is"), t.is = e;
  })(lt || (lt = {}));
  (function(t) {
    function e(a, o2, l) {
      return { range: a, newText: o2, annotationId: l };
    }
    m(e, "replace"), t.replace = e;
    function r2(a, o2, l) {
      return { range: { start: a, end: a }, newText: o2, annotationId: l };
    }
    m(r2, "insert"), t.insert = r2;
    function n2(a, o2) {
      return { range: a, newText: "", annotationId: o2 };
    }
    m(n2, "del"), t.del = n2;
    function i(a) {
      let o2 = a;
      return Cr2.is(o2) && (si.is(o2.annotationId) || lt.is(o2.annotationId));
    }
    m(i, "is"), t.is = i;
  })(Jr2 || (Jr2 = {}));
  (function(t) {
    function e(n2, i) {
      return { textDocument: n2, edits: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && ja.is(i.textDocument) && Array.isArray(i.edits);
    }
    m(r2, "is"), t.is = r2;
  })(qa || (qa = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { kind: "create", uri: n2 };
      return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (o2.options = i), a !== void 0 && (o2.annotationId = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && i.kind === "create" && g.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || g.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || g.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || lt.is(i.annotationId));
    }
    m(r2, "is"), t.is = r2;
  })(ls || (ls = {}));
  (function(t) {
    function e(n2, i, a, o2) {
      let l = { kind: "rename", oldUri: n2, newUri: i };
      return a !== void 0 && (a.overwrite !== void 0 || a.ignoreIfExists !== void 0) && (l.options = a), o2 !== void 0 && (l.annotationId = o2), l;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && i.kind === "rename" && g.string(i.oldUri) && g.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || g.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || g.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || lt.is(i.annotationId));
    }
    m(r2, "is"), t.is = r2;
  })(us || (us = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { kind: "delete", uri: n2 };
      return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (o2.options = i), a !== void 0 && (o2.annotationId = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && i.kind === "delete" && g.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || g.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || g.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || lt.is(i.annotationId));
    }
    m(r2, "is"), t.is = r2;
  })(cs || (cs = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && (n2.changes !== void 0 || n2.documentChanges !== void 0) && (n2.documentChanges === void 0 || n2.documentChanges.every((i) => g.string(i.kind) ? ls.is(i) || us.is(i) || cs.is(i) : qa.is(i)));
    }
    m(e, "is"), t.is = e;
  })(au || (au = {}));
  os = (_a135 = class {
    constructor(e, r2) {
      this.edits = e, this.changeAnnotations = r2;
    }
    insert(e, r2, n2) {
      let i, a;
      if (n2 === void 0 ? i = Cr2.insert(e, r2) : lt.is(n2) ? (a = n2, i = Jr2.insert(e, r2, n2)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(n2), i = Jr2.insert(e, r2, a)), this.edits.push(i), a !== void 0) return a;
    }
    replace(e, r2, n2) {
      let i, a;
      if (n2 === void 0 ? i = Cr2.replace(e, r2) : lt.is(n2) ? (a = n2, i = Jr2.replace(e, r2, n2)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(n2), i = Jr2.replace(e, r2, a)), this.edits.push(i), a !== void 0) return a;
    }
    delete(e, r2) {
      let n2, i;
      if (r2 === void 0 ? n2 = Cr2.del(e) : lt.is(r2) ? (i = r2, n2 = Jr2.del(e, r2)) : (this.assertChangeAnnotations(this.changeAnnotations), i = this.changeAnnotations.manage(r2), n2 = Jr2.del(e, i)), this.edits.push(n2), i !== void 0) return i;
    }
    add(e) {
      this.edits.push(e);
    }
    all() {
      return this.edits;
    }
    clear() {
      this.edits.splice(0, this.edits.length);
    }
    assertChangeAnnotations(e) {
      if (e === void 0) throw new Error("Text edit change is not configured to manage change annotations.");
    }
  }, m(_a135, "TextEditChangeImpl"), _a135), ou = (_b = class {
    constructor(e) {
      this._annotations = e === void 0 ? /* @__PURE__ */ Object.create(null) : e, this._counter = 0, this._size = 0;
    }
    all() {
      return this._annotations;
    }
    get size() {
      return this._size;
    }
    manage(e, r2) {
      let n2;
      if (lt.is(e) ? n2 = e : (n2 = this.nextId(), r2 = e), this._annotations[n2] !== void 0) throw new Error(`Id ${n2} is already in use.`);
      if (r2 === void 0) throw new Error(`No annotation provided for id ${n2}`);
      return this._annotations[n2] = r2, this._size++, n2;
    }
    nextId() {
      return this._counter++, this._counter.toString();
    }
  }, m(_b, "ChangeAnnotations"), _b), ld = (_c2 = class {
    constructor(e) {
      this._textEditChanges = /* @__PURE__ */ Object.create(null), e !== void 0 ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new ou(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((r2) => {
        if (qa.is(r2)) {
          let n2 = new os(r2.edits, this._changeAnnotations);
          this._textEditChanges[r2.textDocument.uri] = n2;
        }
      })) : e.changes && Object.keys(e.changes).forEach((r2) => {
        let n2 = new os(e.changes[r2]);
        this._textEditChanges[r2] = n2;
      })) : this._workspaceEdit = {};
    }
    get edit() {
      return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
    }
    getTextEditChange(e) {
      if (ja.is(e)) {
        if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
        let r2 = { uri: e.uri, version: e.version }, n2 = this._textEditChanges[r2.uri];
        if (!n2) {
          let i = [], a = { textDocument: r2, edits: i };
          this._workspaceEdit.documentChanges.push(a), n2 = new os(i, this._changeAnnotations), this._textEditChanges[r2.uri] = n2;
        }
        return n2;
      } else {
        if (this.initChanges(), this._workspaceEdit.changes === void 0) throw new Error("Workspace edit is not configured for normal text edit changes.");
        let r2 = this._textEditChanges[e];
        if (!r2) {
          let n2 = [];
          this._workspaceEdit.changes[e] = n2, r2 = new os(n2), this._textEditChanges[e] = r2;
        }
        return r2;
      }
    }
    initDocumentChanges() {
      this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new ou(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
    }
    initChanges() {
      this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
    }
    createFile(e, r2, n2) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
      let i;
      si.is(r2) || lt.is(r2) ? i = r2 : n2 = r2;
      let a, o2;
      if (i === void 0 ? a = ls.create(e, n2) : (o2 = lt.is(i) ? i : this._changeAnnotations.manage(i), a = ls.create(e, n2, o2)), this._workspaceEdit.documentChanges.push(a), o2 !== void 0) return o2;
    }
    renameFile(e, r2, n2, i) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
      let a;
      si.is(n2) || lt.is(n2) ? a = n2 : i = n2;
      let o2, l;
      if (a === void 0 ? o2 = us.create(e, r2, i) : (l = lt.is(a) ? a : this._changeAnnotations.manage(a), o2 = us.create(e, r2, i, l)), this._workspaceEdit.documentChanges.push(o2), l !== void 0) return l;
    }
    deleteFile(e, r2, n2) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes.");
      let i;
      si.is(r2) || lt.is(r2) ? i = r2 : n2 = r2;
      let a, o2;
      if (i === void 0 ? a = cs.create(e, n2) : (o2 = lt.is(i) ? i : this._changeAnnotations.manage(i), a = cs.create(e, n2, o2)), this._workspaceEdit.documentChanges.push(a), o2 !== void 0) return o2;
    }
  }, m(_c2, "WorkspaceChange"), _c2);
  (function(t) {
    function e(n2) {
      return { uri: n2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.string(i.uri);
    }
    m(r2, "is"), t.is = r2;
  })(ud || (ud = {}));
  (function(t) {
    function e(n2, i) {
      return { uri: n2, version: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.string(i.uri) && g.integer(i.version);
    }
    m(r2, "is"), t.is = r2;
  })(cd || (cd = {}));
  (function(t) {
    function e(n2, i) {
      return { uri: n2, version: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.string(i.uri) && (i.version === null || g.integer(i.version));
    }
    m(r2, "is"), t.is = r2;
  })(ja || (ja = {}));
  (function(t) {
    function e(n2, i, a, o2) {
      return { uri: n2, languageId: i, version: a, text: o2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.string(i.uri) && g.string(i.languageId) && g.integer(i.version) && g.string(i.text);
    }
    m(r2, "is"), t.is = r2;
  })(fd || (fd = {}));
  (function(t) {
    t.PlainText = "plaintext", t.Markdown = "markdown";
    function e(r2) {
      let n2 = r2;
      return n2 === t.PlainText || n2 === t.Markdown;
    }
    m(e, "is"), t.is = e;
  })(lu || (lu = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return g.objectLiteral(r2) && lu.is(n2.kind) && g.string(n2.value);
    }
    m(e, "is"), t.is = e;
  })(fs || (fs = {}));
  (function(t) {
    t.Text = 1, t.Method = 2, t.Function = 3, t.Constructor = 4, t.Field = 5, t.Variable = 6, t.Class = 7, t.Interface = 8, t.Module = 9, t.Property = 10, t.Unit = 11, t.Value = 12, t.Enum = 13, t.Keyword = 14, t.Snippet = 15, t.Color = 16, t.File = 17, t.Reference = 18, t.Folder = 19, t.EnumMember = 20, t.Constant = 21, t.Struct = 22, t.Event = 23, t.Operator = 24, t.TypeParameter = 25;
  })(dd || (dd = {}));
  (function(t) {
    t.PlainText = 1, t.Snippet = 2;
  })(pd || (pd = {}));
  (function(t) {
    t.Deprecated = 1;
  })(md || (md = {}));
  (function(t) {
    function e(n2, i, a) {
      return { newText: n2, insert: i, replace: a };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && g.string(i.newText) && ie.is(i.insert) && ie.is(i.replace);
    }
    m(r2, "is"), t.is = r2;
  })(hd || (hd = {}));
  (function(t) {
    t.asIs = 1, t.adjustIndentation = 2;
  })(gd || (gd = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && (g.string(n2.detail) || n2.detail === void 0) && (g.string(n2.description) || n2.description === void 0);
    }
    m(e, "is"), t.is = e;
  })(yd || (yd = {}));
  (function(t) {
    function e(r2) {
      return { label: r2 };
    }
    m(e, "create"), t.create = e;
  })(Td || (Td = {}));
  (function(t) {
    function e(r2, n2) {
      return { items: r2 || [], isIncomplete: !!n2 };
    }
    m(e, "create"), t.create = e;
  })(Rd || (Rd = {}));
  (function(t) {
    function e(n2) {
      return n2.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    m(e, "fromPlainText"), t.fromPlainText = e;
    function r2(n2) {
      let i = n2;
      return g.string(i) || g.objectLiteral(i) && g.string(i.language) && g.string(i.value);
    }
    m(r2, "is"), t.is = r2;
  })(Ba || (Ba = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return !!n2 && g.objectLiteral(n2) && (fs.is(n2.contents) || Ba.is(n2.contents) || g.typedArray(n2.contents, Ba.is)) && (r2.range === void 0 || ie.is(r2.range));
    }
    m(e, "is"), t.is = e;
  })($d || ($d = {}));
  (function(t) {
    function e(r2, n2) {
      return n2 ? { label: r2, documentation: n2 } : { label: r2 };
    }
    m(e, "create"), t.create = e;
  })(xd || (xd = {}));
  (function(t) {
    function e(r2, n2, ...i) {
      let a = { label: r2 };
      return g.defined(n2) && (a.documentation = n2), g.defined(i) ? a.parameters = i : a.parameters = [], a;
    }
    m(e, "create"), t.create = e;
  })(vd || (vd = {}));
  (function(t) {
    t.Text = 1, t.Read = 2, t.Write = 3;
  })(Ed || (Ed = {}));
  (function(t) {
    function e(r2, n2) {
      let i = { range: r2 };
      return g.number(n2) && (i.kind = n2), i;
    }
    m(e, "create"), t.create = e;
  })(Ad || (Ad = {}));
  (function(t) {
    t.File = 1, t.Module = 2, t.Namespace = 3, t.Package = 4, t.Class = 5, t.Method = 6, t.Property = 7, t.Field = 8, t.Constructor = 9, t.Enum = 10, t.Interface = 11, t.Function = 12, t.Variable = 13, t.Constant = 14, t.String = 15, t.Number = 16, t.Boolean = 17, t.Array = 18, t.Object = 19, t.Key = 20, t.Null = 21, t.EnumMember = 22, t.Struct = 23, t.Event = 24, t.Operator = 25, t.TypeParameter = 26;
  })(Cd || (Cd = {}));
  (function(t) {
    t.Deprecated = 1;
  })(Sd || (Sd = {}));
  (function(t) {
    function e(r2, n2, i, a, o2) {
      let l = { name: r2, kind: n2, location: { uri: a, range: i } };
      return o2 && (l.containerName = o2), l;
    }
    m(e, "create"), t.create = e;
  })(kd || (kd = {}));
  (function(t) {
    function e(r2, n2, i, a) {
      return a !== void 0 ? { name: r2, kind: n2, location: { uri: i, range: a } } : { name: r2, kind: n2, location: { uri: i } };
    }
    m(e, "create"), t.create = e;
  })(Nd || (Nd = {}));
  (function(t) {
    function e(n2, i, a, o2, l, u) {
      let c = { name: n2, detail: i, kind: a, range: o2, selectionRange: l };
      return u !== void 0 && (c.children = u), c;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && g.string(i.name) && g.number(i.kind) && ie.is(i.range) && ie.is(i.selectionRange) && (i.detail === void 0 || g.string(i.detail)) && (i.deprecated === void 0 || g.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
    }
    m(r2, "is"), t.is = r2;
  })(wd || (wd = {}));
  (function(t) {
    t.Empty = "", t.QuickFix = "quickfix", t.Refactor = "refactor", t.RefactorExtract = "refactor.extract", t.RefactorInline = "refactor.inline", t.RefactorRewrite = "refactor.rewrite", t.Source = "source", t.SourceOrganizeImports = "source.organizeImports", t.SourceFixAll = "source.fixAll";
  })(Id || (Id = {}));
  (function(t) {
    t.Invoked = 1, t.Automatic = 2;
  })(Wa || (Wa = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { diagnostics: n2 };
      return i != null && (o2.only = i), a != null && (o2.triggerKind = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.typedArray(i.diagnostics, za.is) && (i.only === void 0 || g.typedArray(i.only, g.string)) && (i.triggerKind === void 0 || i.triggerKind === Wa.Invoked || i.triggerKind === Wa.Automatic);
    }
    m(r2, "is"), t.is = r2;
  })(bd || (bd = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { title: n2 }, l = true;
      return typeof i == "string" ? (l = false, o2.kind = i) : ai.is(i) ? o2.command = i : o2.edit = i, l && a !== void 0 && (o2.kind = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i && g.string(i.title) && (i.diagnostics === void 0 || g.typedArray(i.diagnostics, za.is)) && (i.kind === void 0 || g.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || ai.is(i.command)) && (i.isPreferred === void 0 || g.boolean(i.isPreferred)) && (i.edit === void 0 || au.is(i.edit));
    }
    m(r2, "is"), t.is = r2;
  })(_d || (_d = {}));
  (function(t) {
    function e(n2, i) {
      let a = { range: n2 };
      return g.defined(i) && (a.data = i), a;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && ie.is(i.range) && (g.undefined(i.command) || ai.is(i.command));
    }
    m(r2, "is"), t.is = r2;
  })(Pd || (Pd = {}));
  (function(t) {
    function e(n2, i) {
      return { tabSize: n2, insertSpaces: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && g.uinteger(i.tabSize) && g.boolean(i.insertSpaces);
    }
    m(r2, "is"), t.is = r2;
  })(Od || (Od = {}));
  (function(t) {
    function e(n2, i, a) {
      return { range: n2, target: i, data: a };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && ie.is(i.range) && (g.undefined(i.target) || g.string(i.target));
    }
    m(r2, "is"), t.is = r2;
  })(Ld || (Ld = {}));
  (function(t) {
    function e(n2, i) {
      return { range: n2, parent: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && ie.is(i.range) && (i.parent === void 0 || t.is(i.parent));
    }
    m(r2, "is"), t.is = r2;
  })(Dd || (Dd = {}));
  (function(t) {
    t.namespace = "namespace", t.type = "type", t.class = "class", t.enum = "enum", t.interface = "interface", t.struct = "struct", t.typeParameter = "typeParameter", t.parameter = "parameter", t.variable = "variable", t.property = "property", t.enumMember = "enumMember", t.event = "event", t.function = "function", t.method = "method", t.macro = "macro", t.keyword = "keyword", t.modifier = "modifier", t.comment = "comment", t.string = "string", t.number = "number", t.regexp = "regexp", t.operator = "operator", t.decorator = "decorator";
  })(Md || (Md = {}));
  (function(t) {
    t.declaration = "declaration", t.definition = "definition", t.readonly = "readonly", t.static = "static", t.deprecated = "deprecated", t.abstract = "abstract", t.async = "async", t.modification = "modification", t.documentation = "documentation", t.defaultLibrary = "defaultLibrary";
  })(Fd || (Fd = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return g.objectLiteral(n2) && (n2.resultId === void 0 || typeof n2.resultId == "string") && Array.isArray(n2.data) && (n2.data.length === 0 || typeof n2.data[0] == "number");
    }
    m(e, "is"), t.is = e;
  })(Gd || (Gd = {}));
  (function(t) {
    function e(n2, i) {
      return { range: n2, text: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i != null && ie.is(i.range) && g.string(i.text);
    }
    m(r2, "is"), t.is = r2;
  })(Ud || (Ud = {}));
  (function(t) {
    function e(n2, i, a) {
      return { range: n2, variableName: i, caseSensitiveLookup: a };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i != null && ie.is(i.range) && g.boolean(i.caseSensitiveLookup) && (g.string(i.variableName) || i.variableName === void 0);
    }
    m(r2, "is"), t.is = r2;
  })(zd || (zd = {}));
  (function(t) {
    function e(n2, i) {
      return { range: n2, expression: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return i != null && ie.is(i.range) && (g.string(i.expression) || i.expression === void 0);
    }
    m(r2, "is"), t.is = r2;
  })(qd || (qd = {}));
  (function(t) {
    function e(n2, i) {
      return { frameId: n2, stoppedLocation: i };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.defined(i) && ie.is(n2.stoppedLocation);
    }
    m(r2, "is"), t.is = r2;
  })(jd || (jd = {}));
  (function(t) {
    t.Type = 1, t.Parameter = 2;
    function e(r2) {
      return r2 === 1 || r2 === 2;
    }
    m(e, "is"), t.is = e;
  })(uu || (uu = {}));
  (function(t) {
    function e(n2) {
      return { value: n2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && (i.tooltip === void 0 || g.string(i.tooltip) || fs.is(i.tooltip)) && (i.location === void 0 || Ua.is(i.location)) && (i.command === void 0 || ai.is(i.command));
    }
    m(r2, "is"), t.is = r2;
  })(cu || (cu = {}));
  (function(t) {
    function e(n2, i, a) {
      let o2 = { position: n2, label: i };
      return a !== void 0 && (o2.kind = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return g.objectLiteral(i) && le.is(i.position) && (g.string(i.label) || g.typedArray(i.label, cu.is)) && (i.kind === void 0 || uu.is(i.kind)) && i.textEdits === void 0 || g.typedArray(i.textEdits, Cr2.is) && (i.tooltip === void 0 || g.string(i.tooltip) || fs.is(i.tooltip)) && (i.paddingLeft === void 0 || g.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || g.boolean(i.paddingRight));
    }
    m(r2, "is"), t.is = r2;
  })(Bd || (Bd = {}));
  (function(t) {
    function e(r2) {
      return { kind: "snippet", value: r2 };
    }
    m(e, "createSnippet"), t.createSnippet = e;
  })(Wd || (Wd = {}));
  (function(t) {
    function e(r2, n2, i, a) {
      return { insertText: r2, filterText: n2, range: i, command: a };
    }
    m(e, "create"), t.create = e;
  })(Kd || (Kd = {}));
  (function(t) {
    function e(r2) {
      return { items: r2 };
    }
    m(e, "create"), t.create = e;
  })(Vd || (Vd = {}));
  (function(t) {
    t.Invoked = 0, t.Automatic = 1;
  })(Hd || (Hd = {}));
  (function(t) {
    function e(r2, n2) {
      return { range: r2, text: n2 };
    }
    m(e, "create"), t.create = e;
  })(Yd || (Yd = {}));
  (function(t) {
    function e(r2, n2) {
      return { triggerKind: r2, selectedCompletionInfo: n2 };
    }
    m(e, "create"), t.create = e;
  })(Xd || (Xd = {}));
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return g.objectLiteral(n2) && nu.is(n2.uri) && g.string(n2.name);
    }
    m(e, "is"), t.is = e;
  })(Jd || (Jd = {}));
  QE = [`
`, `\r
`, "\r"];
  (function(t) {
    function e(a, o2, l, u) {
      return new Qd(a, o2, l, u);
    }
    m(e, "create"), t.create = e;
    function r2(a) {
      let o2 = a;
      return !!(g.defined(o2) && g.string(o2.uri) && (g.undefined(o2.languageId) || g.string(o2.languageId)) && g.uinteger(o2.lineCount) && g.func(o2.getText) && g.func(o2.positionAt) && g.func(o2.offsetAt));
    }
    m(r2, "is"), t.is = r2;
    function n2(a, o2) {
      let l = a.getText(), u = i(o2, (d, m3) => {
        let h2 = d.range.start.line - m3.range.start.line;
        return h2 === 0 ? d.range.start.character - m3.range.start.character : h2;
      }), c = l.length;
      for (let d = u.length - 1; d >= 0; d--) {
        let m3 = u[d], h2 = a.offsetAt(m3.range.start), y = a.offsetAt(m3.range.end);
        if (y <= c) l = l.substring(0, h2) + m3.newText + l.substring(y, l.length);
        else throw new Error("Overlapping edit");
        c = h2;
      }
      return l;
    }
    m(n2, "applyEdits"), t.applyEdits = n2;
    function i(a, o2) {
      if (a.length <= 1) return a;
      let l = a.length / 2 | 0, u = a.slice(0, l), c = a.slice(l);
      i(u, o2), i(c, o2);
      let d = 0, m3 = 0, h2 = 0;
      for (; d < u.length && m3 < c.length; ) o2(u[d], c[m3]) <= 0 ? a[h2++] = u[d++] : a[h2++] = c[m3++];
      for (; d < u.length; ) a[h2++] = u[d++];
      for (; m3 < c.length; ) a[h2++] = c[m3++];
      return a;
    }
    m(i, "mergeSort");
  })(Zd || (Zd = {}));
  Qd = (_d2 = class {
    constructor(e, r2, n2, i) {
      this._uri = e, this._languageId = r2, this._version = n2, this._content = i, this._lineOffsets = void 0;
    }
    get uri() {
      return this._uri;
    }
    get languageId() {
      return this._languageId;
    }
    get version() {
      return this._version;
    }
    getText(e) {
      if (e) {
        let r2 = this.offsetAt(e.start), n2 = this.offsetAt(e.end);
        return this._content.substring(r2, n2);
      }
      return this._content;
    }
    update(e, r2) {
      this._content = e.text, this._version = r2, this._lineOffsets = void 0;
    }
    getLineOffsets() {
      if (this._lineOffsets === void 0) {
        let e = [], r2 = this._content, n2 = true;
        for (let i = 0; i < r2.length; i++) {
          n2 && (e.push(i), n2 = false);
          let a = r2.charAt(i);
          n2 = a === "\r" || a === `
`, a === "\r" && i + 1 < r2.length && r2.charAt(i + 1) === `
` && i++;
        }
        n2 && r2.length > 0 && e.push(r2.length), this._lineOffsets = e;
      }
      return this._lineOffsets;
    }
    positionAt(e) {
      e = Math.max(Math.min(e, this._content.length), 0);
      let r2 = this.getLineOffsets(), n2 = 0, i = r2.length;
      if (i === 0) return le.create(0, e);
      for (; n2 < i; ) {
        let o2 = Math.floor((n2 + i) / 2);
        r2[o2] > e ? i = o2 : n2 = o2 + 1;
      }
      let a = n2 - 1;
      return le.create(a, e - r2[a]);
    }
    offsetAt(e) {
      let r2 = this.getLineOffsets();
      if (e.line >= r2.length) return this._content.length;
      if (e.line < 0) return 0;
      let n2 = r2[e.line], i = e.line + 1 < r2.length ? r2[e.line + 1] : this._content.length;
      return Math.max(Math.min(n2 + e.character, i), n2);
    }
    get lineCount() {
      return this.getLineOffsets().length;
    }
  }, m(_d2, "FullTextDocument"), _d2);
  (function(t) {
    let e = Object.prototype.toString;
    function r2(y) {
      return typeof y < "u";
    }
    m(r2, "defined"), t.defined = r2;
    function n2(y) {
      return typeof y > "u";
    }
    m(n2, "undefined"), t.undefined = n2;
    function i(y) {
      return y === true || y === false;
    }
    m(i, "boolean"), t.boolean = i;
    function a(y) {
      return e.call(y) === "[object String]";
    }
    m(a, "string"), t.string = a;
    function o2(y) {
      return e.call(y) === "[object Number]";
    }
    m(o2, "number"), t.number = o2;
    function l(y, k, w) {
      return e.call(y) === "[object Number]" && k <= y && y <= w;
    }
    m(l, "numberRange"), t.numberRange = l;
    function u(y) {
      return e.call(y) === "[object Number]" && -2147483648 <= y && y <= 2147483647;
    }
    m(u, "integer"), t.integer = u;
    function c(y) {
      return e.call(y) === "[object Number]" && 0 <= y && y <= 2147483647;
    }
    m(c, "uinteger"), t.uinteger = c;
    function d(y) {
      return e.call(y) === "[object Function]";
    }
    m(d, "func"), t.func = d;
    function m3(y) {
      return y !== null && typeof y == "object";
    }
    m(m3, "objectLiteral"), t.objectLiteral = m3;
    function h2(y, k) {
      return Array.isArray(y) && y.every(k);
    }
    m(h2, "typedArray"), t.typedArray = h2;
  })(g || (g = {}));
});
var vn = o((up) => {
  "use strict";
  Object.defineProperty(up, "__esModule", { value: true });
  var op;
  function lp() {
    if (op === void 0) throw new Error("No runtime abstraction layer installed");
    return op;
  }
  m(lp, "RAL");
  (function(t) {
    function e(r2) {
      if (r2 === void 0) throw new Error("No runtime abstraction layer provided");
      op = r2;
    }
    m(e, "install"), t.install = e;
  })(lp || (lp = {}));
  up.default = lp;
});
var hs = o((yt) => {
  "use strict";
  Object.defineProperty(yt, "__esModule", { value: true });
  yt.stringArray = yt.array = yt.func = yt.error = yt.number = yt.string = yt.boolean = void 0;
  function fA(t) {
    return t === true || t === false;
  }
  m(fA, "boolean");
  yt.boolean = fA;
  function hy(t) {
    return typeof t == "string" || t instanceof String;
  }
  m(hy, "string");
  yt.string = hy;
  function dA(t) {
    return typeof t == "number" || t instanceof Number;
  }
  m(dA, "number");
  yt.number = dA;
  function pA(t) {
    return t instanceof Error;
  }
  m(pA, "error");
  yt.error = pA;
  function mA(t) {
    return typeof t == "function";
  }
  m(mA, "func");
  yt.func = mA;
  function gy(t) {
    return Array.isArray(t);
  }
  m(gy, "array");
  yt.array = gy;
  function hA(t) {
    return gy(t) && t.every((e) => hy(e));
  }
  m(hA, "stringArray");
  yt.stringArray = hA;
});
var fi2 = o((gs) => {
  "use strict";
  var _a135, _b;
  Object.defineProperty(gs, "__esModule", { value: true });
  gs.Emitter = gs.Event = void 0;
  var gA = vn(), yy;
  (function(t) {
    let e = { dispose() {
    } };
    t.None = function() {
      return e;
    };
  })(yy || (gs.Event = yy = {}));
  var cp = (_a135 = class {
    add(e, r2 = null, n2) {
      this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(r2), Array.isArray(n2) && n2.push({ dispose: m(() => this.remove(e, r2), "dispose") });
    }
    remove(e, r2 = null) {
      if (!this._callbacks) return;
      let n2 = false;
      for (let i = 0, a = this._callbacks.length; i < a; i++) if (this._callbacks[i] === e) if (this._contexts[i] === r2) {
        this._callbacks.splice(i, 1), this._contexts.splice(i, 1);
        return;
      } else n2 = true;
      if (n2) throw new Error("When adding a listener with a context, you should remove it with the same context");
    }
    invoke(...e) {
      if (!this._callbacks) return [];
      let r2 = [], n2 = this._callbacks.slice(0), i = this._contexts.slice(0);
      for (let a = 0, o2 = n2.length; a < o2; a++) try {
        r2.push(n2[a].apply(i[a], e));
      } catch (l) {
        (0, gA.default)().console.error(l);
      }
      return r2;
    }
    isEmpty() {
      return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
      this._callbacks = void 0, this._contexts = void 0;
    }
  }, m(_a135, "CallbackList"), _a135), gu = (_b = class {
    constructor(e) {
      this._options = e;
    }
    get event() {
      return this._event || (this._event = (e, r2, n2) => {
        this._callbacks || (this._callbacks = new cp()), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(e, r2);
        let i = { dispose: m(() => {
          this._callbacks && (this._callbacks.remove(e, r2), i.dispose = _b._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this));
        }, "dispose") };
        return Array.isArray(n2) && n2.push(i), i;
      }), this._event;
    }
    fire(e) {
      this._callbacks && this._callbacks.invoke.call(this._callbacks, e);
    }
    dispose() {
      this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0);
    }
  }, m(_b, "Emitter"), _b);
  gs.Emitter = gu;
  gu._noop = function() {
  };
});
var Za = o((ys) => {
  "use strict";
  var _a135, _b;
  Object.defineProperty(ys, "__esModule", { value: true });
  ys.CancellationTokenSource = ys.CancellationToken = void 0;
  var yA = vn(), TA = hs(), fp2 = fi2(), yu;
  (function(t) {
    t.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: fp2.Event.None }), t.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: fp2.Event.None });
    function e(r2) {
      let n2 = r2;
      return n2 && (n2 === t.None || n2 === t.Cancelled || TA.boolean(n2.isCancellationRequested) && !!n2.onCancellationRequested);
    }
    m(e, "is"), t.is = e;
  })(yu || (ys.CancellationToken = yu = {}));
  var RA = Object.freeze(function(t, e) {
    let r2 = (0, yA.default)().timer.setTimeout(t.bind(e), 0);
    return { dispose() {
      r2.dispose();
    } };
  }), Tu = (_a135 = class {
    constructor() {
      this._isCancelled = false;
    }
    cancel() {
      this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
    }
    get isCancellationRequested() {
      return this._isCancelled;
    }
    get onCancellationRequested() {
      return this._isCancelled ? RA : (this._emitter || (this._emitter = new fp2.Emitter()), this._emitter.event);
    }
    dispose() {
      this._emitter && (this._emitter.dispose(), this._emitter = void 0);
    }
  }, m(_a135, "MutableToken"), _a135), dp = (_b = class {
    get token() {
      return this._token || (this._token = new Tu()), this._token;
    }
    cancel() {
      this._token ? this._token.cancel() : this._token = yu.Cancelled;
    }
    dispose() {
      this._token ? this._token instanceof Tu && this._token.dispose() : this._token = yu.None;
    }
  }, m(_b, "CancellationTokenSource"), _b);
  ys.CancellationTokenSource = dp;
});
var zp = o((j) => {
  "use strict";
  var _a135, _b, _c2, _d2, _e, _f3, _g2, _h2, _i3, _j, _k, _l2, _m, _n, _o2, _p2, _q, _r, _s, _t2, _u, _v2, _w, _x2, _y2;
  Object.defineProperty(j, "__esModule", { value: true });
  j.Message = j.NotificationType9 = j.NotificationType8 = j.NotificationType7 = j.NotificationType6 = j.NotificationType5 = j.NotificationType4 = j.NotificationType3 = j.NotificationType2 = j.NotificationType1 = j.NotificationType0 = j.NotificationType = j.RequestType9 = j.RequestType8 = j.RequestType7 = j.RequestType6 = j.RequestType5 = j.RequestType4 = j.RequestType3 = j.RequestType2 = j.RequestType1 = j.RequestType = j.RequestType0 = j.AbstractMessageSignature = j.ParameterStructures = j.ResponseError = j.ErrorCodes = void 0;
  var gi = hs(), yp;
  (function(t) {
    t.ParseError = -32700, t.InvalidRequest = -32600, t.MethodNotFound = -32601, t.InvalidParams = -32602, t.InternalError = -32603, t.jsonrpcReservedErrorRangeStart = -32099, t.serverErrorStart = -32099, t.MessageWriteError = -32099, t.MessageReadError = -32098, t.PendingResponseRejected = -32097, t.ConnectionInactive = -32096, t.ServerNotInitialized = -32002, t.UnknownErrorCode = -32001, t.jsonrpcReservedErrorRangeEnd = -32e3, t.serverErrorEnd = -32e3;
  })(yp || (j.ErrorCodes = yp = {}));
  var Tp = (_a135 = class extends Error {
    constructor(e, r2, n2) {
      super(r2), this.code = gi.number(e) ? e : yp.UnknownErrorCode, this.data = n2, Object.setPrototypeOf(this, _a135.prototype);
    }
    toJson() {
      let e = { code: this.code, message: this.message };
      return this.data !== void 0 && (e.data = this.data), e;
    }
  }, m(_a135, "ResponseError"), _a135);
  j.ResponseError = Tp;
  var Lt = (_b = class {
    constructor(e) {
      this.kind = e;
    }
    static is(e) {
      return e === _b.auto || e === _b.byName || e === _b.byPosition;
    }
    toString() {
      return this.kind;
    }
  }, m(_b, "ParameterStructures"), _b);
  j.ParameterStructures = Lt;
  Lt.auto = new Lt("auto");
  Lt.byPosition = new Lt("byPosition");
  Lt.byName = new Lt("byName");
  var ke = (_c2 = class {
    constructor(e, r2) {
      this.method = e, this.numberOfParams = r2;
    }
    get parameterStructures() {
      return Lt.auto;
    }
  }, m(_c2, "AbstractMessageSignature"), _c2);
  j.AbstractMessageSignature = ke;
  var Rp = (_d2 = class extends ke {
    constructor(e) {
      super(e, 0);
    }
  }, m(_d2, "RequestType0"), _d2);
  j.RequestType0 = Rp;
  var $p = (_e = class extends ke {
    constructor(e, r2 = Lt.auto) {
      super(e, 1), this._parameterStructures = r2;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }, m(_e, "RequestType"), _e);
  j.RequestType = $p;
  var xp = (_f3 = class extends ke {
    constructor(e, r2 = Lt.auto) {
      super(e, 1), this._parameterStructures = r2;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }, m(_f3, "RequestType1"), _f3);
  j.RequestType1 = xp;
  var vp = (_g2 = class extends ke {
    constructor(e) {
      super(e, 2);
    }
  }, m(_g2, "RequestType2"), _g2);
  j.RequestType2 = vp;
  var Ep = (_h2 = class extends ke {
    constructor(e) {
      super(e, 3);
    }
  }, m(_h2, "RequestType3"), _h2);
  j.RequestType3 = Ep;
  var Ap = (_i3 = class extends ke {
    constructor(e) {
      super(e, 4);
    }
  }, m(_i3, "RequestType4"), _i3);
  j.RequestType4 = Ap;
  var Cp = (_j = class extends ke {
    constructor(e) {
      super(e, 5);
    }
  }, m(_j, "RequestType5"), _j);
  j.RequestType5 = Cp;
  var Sp = (_k = class extends ke {
    constructor(e) {
      super(e, 6);
    }
  }, m(_k, "RequestType6"), _k);
  j.RequestType6 = Sp;
  var kp = (_l2 = class extends ke {
    constructor(e) {
      super(e, 7);
    }
  }, m(_l2, "RequestType7"), _l2);
  j.RequestType7 = kp;
  var Np = (_m = class extends ke {
    constructor(e) {
      super(e, 8);
    }
  }, m(_m, "RequestType8"), _m);
  j.RequestType8 = Np;
  var wp = (_n = class extends ke {
    constructor(e) {
      super(e, 9);
    }
  }, m(_n, "RequestType9"), _n);
  j.RequestType9 = wp;
  var Ip = (_o2 = class extends ke {
    constructor(e, r2 = Lt.auto) {
      super(e, 1), this._parameterStructures = r2;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }, m(_o2, "NotificationType"), _o2);
  j.NotificationType = Ip;
  var bp = (_p2 = class extends ke {
    constructor(e) {
      super(e, 0);
    }
  }, m(_p2, "NotificationType0"), _p2);
  j.NotificationType0 = bp;
  var _p = (_q = class extends ke {
    constructor(e, r2 = Lt.auto) {
      super(e, 1), this._parameterStructures = r2;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }, m(_q, "NotificationType1"), _q);
  j.NotificationType1 = _p;
  var Pp = (_r = class extends ke {
    constructor(e) {
      super(e, 2);
    }
  }, m(_r, "NotificationType2"), _r);
  j.NotificationType2 = Pp;
  var Op = (_s = class extends ke {
    constructor(e) {
      super(e, 3);
    }
  }, m(_s, "NotificationType3"), _s);
  j.NotificationType3 = Op;
  var Lp = (_t2 = class extends ke {
    constructor(e) {
      super(e, 4);
    }
  }, m(_t2, "NotificationType4"), _t2);
  j.NotificationType4 = Lp;
  var Dp = (_u = class extends ke {
    constructor(e) {
      super(e, 5);
    }
  }, m(_u, "NotificationType5"), _u);
  j.NotificationType5 = Dp;
  var Mp = (_v2 = class extends ke {
    constructor(e) {
      super(e, 6);
    }
  }, m(_v2, "NotificationType6"), _v2);
  j.NotificationType6 = Mp;
  var Fp = (_w = class extends ke {
    constructor(e) {
      super(e, 7);
    }
  }, m(_w, "NotificationType7"), _w);
  j.NotificationType7 = Fp;
  var Gp = (_x2 = class extends ke {
    constructor(e) {
      super(e, 8);
    }
  }, m(_x2, "NotificationType8"), _x2);
  j.NotificationType8 = Gp;
  var Up = (_y2 = class extends ke {
    constructor(e) {
      super(e, 9);
    }
  }, m(_y2, "NotificationType9"), _y2);
  j.NotificationType9 = Up;
  var wy;
  (function(t) {
    function e(i) {
      let a = i;
      return a && gi.string(a.method) && (gi.string(a.id) || gi.number(a.id));
    }
    m(e, "isRequest"), t.isRequest = e;
    function r2(i) {
      let a = i;
      return a && gi.string(a.method) && i.id === void 0;
    }
    m(r2, "isNotification"), t.isNotification = r2;
    function n2(i) {
      let a = i;
      return a && (a.result !== void 0 || !!a.error) && (gi.string(a.id) || gi.number(a.id) || a.id === null);
    }
    m(n2, "isResponse"), t.isResponse = n2;
  })(wy || (j.Message = wy = {}));
});
var jp = o((En) => {
  "use strict";
  var _a135, _b;
  var Iy;
  Object.defineProperty(En, "__esModule", { value: true });
  En.LRUCache = En.LinkedMap = En.Touch = void 0;
  var Rt;
  (function(t) {
    t.None = 0, t.First = 1, t.AsOld = t.First, t.Last = 2, t.AsNew = t.Last;
  })(Rt || (En.Touch = Rt = {}));
  var Cu = (_a135 = class {
    constructor() {
      this[Iy] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
    }
    clear() {
      this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
    }
    isEmpty() {
      return !this._head && !this._tail;
    }
    get size() {
      return this._size;
    }
    get first() {
      var _a136;
      return (_a136 = this._head) == null ? void 0 : _a136.value;
    }
    get last() {
      var _a136;
      return (_a136 = this._tail) == null ? void 0 : _a136.value;
    }
    has(e) {
      return this._map.has(e);
    }
    get(e, r2 = Rt.None) {
      let n2 = this._map.get(e);
      if (n2) return r2 !== Rt.None && this.touch(n2, r2), n2.value;
    }
    set(e, r2, n2 = Rt.None) {
      let i = this._map.get(e);
      if (i) i.value = r2, n2 !== Rt.None && this.touch(i, n2);
      else {
        switch (i = { key: e, value: r2, next: void 0, previous: void 0 }, n2) {
          case Rt.None:
            this.addItemLast(i);
            break;
          case Rt.First:
            this.addItemFirst(i);
            break;
          case Rt.Last:
            this.addItemLast(i);
            break;
          default:
            this.addItemLast(i);
            break;
        }
        this._map.set(e, i), this._size++;
      }
      return this;
    }
    delete(e) {
      return !!this.remove(e);
    }
    remove(e) {
      let r2 = this._map.get(e);
      if (r2) return this._map.delete(e), this.removeItem(r2), this._size--, r2.value;
    }
    shift() {
      if (!this._head && !this._tail) return;
      if (!this._head || !this._tail) throw new Error("Invalid list");
      let e = this._head;
      return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
    }
    forEach(e, r2) {
      let n2 = this._state, i = this._head;
      for (; i; ) {
        if (r2 ? e.bind(r2)(i.value, i.key, this) : e(i.value, i.key, this), this._state !== n2) throw new Error("LinkedMap got modified during iteration.");
        i = i.next;
      }
    }
    keys() {
      let e = this._state, r2 = this._head, n2 = { [Symbol.iterator]: () => n2, next: m(() => {
        if (this._state !== e) throw new Error("LinkedMap got modified during iteration.");
        if (r2) {
          let i = { value: r2.key, done: false };
          return r2 = r2.next, i;
        } else return { value: void 0, done: true };
      }, "next") };
      return n2;
    }
    values() {
      let e = this._state, r2 = this._head, n2 = { [Symbol.iterator]: () => n2, next: m(() => {
        if (this._state !== e) throw new Error("LinkedMap got modified during iteration.");
        if (r2) {
          let i = { value: r2.value, done: false };
          return r2 = r2.next, i;
        } else return { value: void 0, done: true };
      }, "next") };
      return n2;
    }
    entries() {
      let e = this._state, r2 = this._head, n2 = { [Symbol.iterator]: () => n2, next: m(() => {
        if (this._state !== e) throw new Error("LinkedMap got modified during iteration.");
        if (r2) {
          let i = { value: [r2.key, r2.value], done: false };
          return r2 = r2.next, i;
        } else return { value: void 0, done: true };
      }, "next") };
      return n2;
    }
    [(Iy = Symbol.toStringTag, Symbol.iterator)]() {
      return this.entries();
    }
    trimOld(e) {
      if (e >= this.size) return;
      if (e === 0) {
        this.clear();
        return;
      }
      let r2 = this._head, n2 = this.size;
      for (; r2 && n2 > e; ) this._map.delete(r2.key), r2 = r2.next, n2--;
      this._head = r2, this._size = n2, r2 && (r2.previous = void 0), this._state++;
    }
    addItemFirst(e) {
      if (!this._head && !this._tail) this._tail = e;
      else if (this._head) e.next = this._head, this._head.previous = e;
      else throw new Error("Invalid list");
      this._head = e, this._state++;
    }
    addItemLast(e) {
      if (!this._head && !this._tail) this._head = e;
      else if (this._tail) e.previous = this._tail, this._tail.next = e;
      else throw new Error("Invalid list");
      this._tail = e, this._state++;
    }
    removeItem(e) {
      if (e === this._head && e === this._tail) this._head = void 0, this._tail = void 0;
      else if (e === this._head) {
        if (!e.next) throw new Error("Invalid list");
        e.next.previous = void 0, this._head = e.next;
      } else if (e === this._tail) {
        if (!e.previous) throw new Error("Invalid list");
        e.previous.next = void 0, this._tail = e.previous;
      } else {
        let r2 = e.next, n2 = e.previous;
        if (!r2 || !n2) throw new Error("Invalid list");
        r2.previous = n2, n2.next = r2;
      }
      e.next = void 0, e.previous = void 0, this._state++;
    }
    touch(e, r2) {
      if (!this._head || !this._tail) throw new Error("Invalid list");
      if (!(r2 !== Rt.First && r2 !== Rt.Last)) {
        if (r2 === Rt.First) {
          if (e === this._head) return;
          let n2 = e.next, i = e.previous;
          e === this._tail ? (i.next = void 0, this._tail = i) : (n2.previous = i, i.next = n2), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
        } else if (r2 === Rt.Last) {
          if (e === this._tail) return;
          let n2 = e.next, i = e.previous;
          e === this._head ? (n2.previous = void 0, this._head = n2) : (n2.previous = i, i.next = n2), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
        }
      }
    }
    toJSON() {
      let e = [];
      return this.forEach((r2, n2) => {
        e.push([n2, r2]);
      }), e;
    }
    fromJSON(e) {
      this.clear();
      for (let [r2, n2] of e) this.set(r2, n2);
    }
  }, m(_a135, "LinkedMap"), _a135);
  En.LinkedMap = Cu;
  var qp = (_b = class extends Cu {
    constructor(e, r2 = 1) {
      super(), this._limit = e, this._ratio = Math.min(Math.max(0, r2), 1);
    }
    get limit() {
      return this._limit;
    }
    set limit(e) {
      this._limit = e, this.checkTrim();
    }
    get ratio() {
      return this._ratio;
    }
    set ratio(e) {
      this._ratio = Math.min(Math.max(0, e), 1), this.checkTrim();
    }
    get(e, r2 = Rt.AsNew) {
      return super.get(e, r2);
    }
    peek(e) {
      return super.get(e, Rt.None);
    }
    set(e, r2) {
      return super.set(e, r2, Rt.Last), this.checkTrim(), this;
    }
    checkTrim() {
      this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio));
    }
  }, m(_b, "LRUCache"), _b);
  En.LRUCache = qp;
});
var _y = o((Su) => {
  "use strict";
  Object.defineProperty(Su, "__esModule", { value: true });
  Su.Disposable = void 0;
  var by;
  (function(t) {
    function e(r2) {
      return { dispose: r2 };
    }
    m(e, "create"), t.create = e;
  })(by || (Su.Disposable = by = {}));
});
var Py = o((As) => {
  "use strict";
  var _a135, _b, _c2, _d2;
  Object.defineProperty(As, "__esModule", { value: true });
  As.SharedArrayReceiverStrategy = As.SharedArraySenderStrategy = void 0;
  var vA = Za(), yo;
  (function(t) {
    t.Continue = 0, t.Cancelled = 1;
  })(yo || (yo = {}));
  var Bp = (_a135 = class {
    constructor() {
      this.buffers = /* @__PURE__ */ new Map();
    }
    enableCancellation(e) {
      if (e.id === null) return;
      let r2 = new SharedArrayBuffer(4), n2 = new Int32Array(r2, 0, 1);
      n2[0] = yo.Continue, this.buffers.set(e.id, r2), e.$cancellationData = r2;
    }
    async sendCancellation(e, r2) {
      let n2 = this.buffers.get(r2);
      if (n2 === void 0) return;
      let i = new Int32Array(n2, 0, 1);
      Atomics.store(i, 0, yo.Cancelled);
    }
    cleanup(e) {
      this.buffers.delete(e);
    }
    dispose() {
      this.buffers.clear();
    }
  }, m(_a135, "SharedArraySenderStrategy"), _a135);
  As.SharedArraySenderStrategy = Bp;
  var Wp = (_b = class {
    constructor(e) {
      this.data = new Int32Array(e, 0, 1);
    }
    get isCancellationRequested() {
      return Atomics.load(this.data, 0) === yo.Cancelled;
    }
    get onCancellationRequested() {
      throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
    }
  }, m(_b, "SharedArrayBufferCancellationToken"), _b), Kp = (_c2 = class {
    constructor(e) {
      this.token = new Wp(e);
    }
    cancel() {
    }
    dispose() {
    }
  }, m(_c2, "SharedArrayBufferCancellationTokenSource"), _c2), Vp = (_d2 = class {
    constructor() {
      this.kind = "request";
    }
    createCancellationTokenSource(e) {
      let r2 = e.$cancellationData;
      return r2 === void 0 ? new vA.CancellationTokenSource() : new Kp(r2);
    }
  }, m(_d2, "SharedArrayReceiverStrategy"), _d2);
  As.SharedArrayReceiverStrategy = Vp;
});
var Yp = o((ku) => {
  "use strict";
  var _a135;
  Object.defineProperty(ku, "__esModule", { value: true });
  ku.Semaphore = void 0;
  var EA = vn(), Hp = (_a135 = class {
    constructor(e = 1) {
      if (e <= 0) throw new Error("Capacity must be greater than 0");
      this._capacity = e, this._active = 0, this._waiting = [];
    }
    lock(e) {
      return new Promise((r2, n2) => {
        this._waiting.push({ thunk: e, resolve: r2, reject: n2 }), this.runNext();
      });
    }
    get active() {
      return this._active;
    }
    runNext() {
      this._waiting.length === 0 || this._active === this._capacity || (0, EA.default)().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
      if (this._waiting.length === 0 || this._active === this._capacity) return;
      let e = this._waiting.shift();
      if (this._active++, this._active > this._capacity) throw new Error("To many thunks active");
      try {
        let r2 = e.thunk();
        r2 instanceof Promise ? r2.then((n2) => {
          this._active--, e.resolve(n2), this.runNext();
        }, (n2) => {
          this._active--, e.reject(n2), this.runNext();
        }) : (this._active--, e.resolve(r2), this.runNext());
      } catch (r2) {
        this._active--, e.reject(r2), this.runNext();
      }
    }
  }, m(_a135, "Semaphore"), _a135);
  ku.Semaphore = Hp;
});
var Ly = o((An) => {
  "use strict";
  var _a135, _b;
  Object.defineProperty(An, "__esModule", { value: true });
  An.ReadableStreamMessageReader = An.AbstractMessageReader = An.MessageReader = void 0;
  var Jp = vn(), Cs = hs(), Xp = fi2(), AA = Yp(), Oy;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && Cs.func(n2.listen) && Cs.func(n2.dispose) && Cs.func(n2.onError) && Cs.func(n2.onClose) && Cs.func(n2.onPartialMessage);
    }
    m(e, "is"), t.is = e;
  })(Oy || (An.MessageReader = Oy = {}));
  var Nu = (_a135 = class {
    constructor() {
      this.errorEmitter = new Xp.Emitter(), this.closeEmitter = new Xp.Emitter(), this.partialMessageEmitter = new Xp.Emitter();
    }
    dispose() {
      this.errorEmitter.dispose(), this.closeEmitter.dispose();
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(e) {
      this.errorEmitter.fire(this.asError(e));
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    get onPartialMessage() {
      return this.partialMessageEmitter.event;
    }
    firePartialMessage(e) {
      this.partialMessageEmitter.fire(e);
    }
    asError(e) {
      return e instanceof Error ? e : new Error(`Reader received error. Reason: ${Cs.string(e.message) ? e.message : "unknown"}`);
    }
  }, m(_a135, "AbstractMessageReader"), _a135);
  An.AbstractMessageReader = Nu;
  var Zp;
  (function(t) {
    function e(r2) {
      let n2, i, a, o2 = /* @__PURE__ */ new Map(), l, u = /* @__PURE__ */ new Map();
      if (r2 === void 0 || typeof r2 == "string") n2 = r2 ?? "utf-8";
      else {
        if (n2 = r2.charset ?? "utf-8", r2.contentDecoder !== void 0 && (a = r2.contentDecoder, o2.set(a.name, a)), r2.contentDecoders !== void 0) for (let c of r2.contentDecoders) o2.set(c.name, c);
        if (r2.contentTypeDecoder !== void 0 && (l = r2.contentTypeDecoder, u.set(l.name, l)), r2.contentTypeDecoders !== void 0) for (let c of r2.contentTypeDecoders) u.set(c.name, c);
      }
      return l === void 0 && (l = (0, Jp.default)().applicationJson.decoder, u.set(l.name, l)), { charset: n2, contentDecoder: a, contentDecoders: o2, contentTypeDecoder: l, contentTypeDecoders: u };
    }
    m(e, "fromOptions"), t.fromOptions = e;
  })(Zp || (Zp = {}));
  var Qp = (_b = class extends Nu {
    constructor(e, r2) {
      super(), this.readable = e, this.options = Zp.fromOptions(r2), this.buffer = (0, Jp.default)().messageBuffer.create(this.options.charset), this._partialMessageTimeout = 1e4, this.nextMessageLength = -1, this.messageToken = 0, this.readSemaphore = new AA.Semaphore(1);
    }
    set partialMessageTimeout(e) {
      this._partialMessageTimeout = e;
    }
    get partialMessageTimeout() {
      return this._partialMessageTimeout;
    }
    listen(e) {
      this.nextMessageLength = -1, this.messageToken = 0, this.partialMessageTimer = void 0, this.callback = e;
      let r2 = this.readable.onData((n2) => {
        this.onData(n2);
      });
      return this.readable.onError((n2) => this.fireError(n2)), this.readable.onClose(() => this.fireClose()), r2;
    }
    onData(e) {
      try {
        for (this.buffer.append(e); ; ) {
          if (this.nextMessageLength === -1) {
            let n2 = this.buffer.tryReadHeaders(true);
            if (!n2) return;
            let i = n2.get("content-length");
            if (!i) {
              this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(n2))}`));
              return;
            }
            let a = parseInt(i);
            if (isNaN(a)) {
              this.fireError(new Error(`Content-Length value must be a number. Got ${i}`));
              return;
            }
            this.nextMessageLength = a;
          }
          let r2 = this.buffer.tryReadBody(this.nextMessageLength);
          if (r2 === void 0) {
            this.setPartialMessageTimer();
            return;
          }
          this.clearPartialMessageTimer(), this.nextMessageLength = -1, this.readSemaphore.lock(async () => {
            let n2 = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(r2) : r2, i = await this.options.contentTypeDecoder.decode(n2, this.options);
            this.callback(i);
          }).catch((n2) => {
            this.fireError(n2);
          });
        }
      } catch (r2) {
        this.fireError(r2);
      }
    }
    clearPartialMessageTimer() {
      this.partialMessageTimer && (this.partialMessageTimer.dispose(), this.partialMessageTimer = void 0);
    }
    setPartialMessageTimer() {
      this.clearPartialMessageTimer(), !(this._partialMessageTimeout <= 0) && (this.partialMessageTimer = (0, Jp.default)().timer.setTimeout((e, r2) => {
        this.partialMessageTimer = void 0, e === this.messageToken && (this.firePartialMessage({ messageToken: e, waitingTime: r2 }), this.setPartialMessageTimer());
      }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout));
    }
  }, m(_b, "ReadableStreamMessageReader"), _b);
  An.ReadableStreamMessageReader = Qp;
});
var Uy = o((Cn) => {
  "use strict";
  var _a135, _b;
  Object.defineProperty(Cn, "__esModule", { value: true });
  Cn.WriteableStreamMessageWriter = Cn.AbstractMessageWriter = Cn.MessageWriter = void 0;
  var Dy = vn(), To = hs(), CA = Yp(), My = fi2(), SA = "Content-Length: ", Fy = `\r
`, Gy;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && To.func(n2.dispose) && To.func(n2.onClose) && To.func(n2.onError) && To.func(n2.write);
    }
    m(e, "is"), t.is = e;
  })(Gy || (Cn.MessageWriter = Gy = {}));
  var wu = (_a135 = class {
    constructor() {
      this.errorEmitter = new My.Emitter(), this.closeEmitter = new My.Emitter();
    }
    dispose() {
      this.errorEmitter.dispose(), this.closeEmitter.dispose();
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(e, r2, n2) {
      this.errorEmitter.fire([this.asError(e), r2, n2]);
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    asError(e) {
      return e instanceof Error ? e : new Error(`Writer received error. Reason: ${To.string(e.message) ? e.message : "unknown"}`);
    }
  }, m(_a135, "AbstractMessageWriter"), _a135);
  Cn.AbstractMessageWriter = wu;
  var em;
  (function(t) {
    function e(r2) {
      return r2 === void 0 || typeof r2 == "string" ? { charset: r2 ?? "utf-8", contentTypeEncoder: (0, Dy.default)().applicationJson.encoder } : { charset: r2.charset ?? "utf-8", contentEncoder: r2.contentEncoder, contentTypeEncoder: r2.contentTypeEncoder ?? (0, Dy.default)().applicationJson.encoder };
    }
    m(e, "fromOptions"), t.fromOptions = e;
  })(em || (em = {}));
  var tm = (_b = class extends wu {
    constructor(e, r2) {
      super(), this.writable = e, this.options = em.fromOptions(r2), this.errorCount = 0, this.writeSemaphore = new CA.Semaphore(1), this.writable.onError((n2) => this.fireError(n2)), this.writable.onClose(() => this.fireClose());
    }
    async write(e) {
      return this.writeSemaphore.lock(async () => this.options.contentTypeEncoder.encode(e, this.options).then((n2) => this.options.contentEncoder !== void 0 ? this.options.contentEncoder.encode(n2) : n2).then((n2) => {
        let i = [];
        return i.push(SA, n2.byteLength.toString(), Fy), i.push(Fy), this.doWrite(e, i, n2);
      }, (n2) => {
        throw this.fireError(n2), n2;
      }));
    }
    async doWrite(e, r2, n2) {
      try {
        return await this.writable.write(r2.join(""), "ascii"), this.writable.write(n2);
      } catch (i) {
        return this.handleError(i, e), Promise.reject(i);
      }
    }
    handleError(e, r2) {
      this.errorCount++, this.fireError(e, r2, this.errorCount);
    }
    end() {
      this.writable.end();
    }
  }, m(_b, "WriteableStreamMessageWriter"), _b);
  Cn.WriteableStreamMessageWriter = tm;
});
var zy = o((Iu) => {
  "use strict";
  var _a135;
  Object.defineProperty(Iu, "__esModule", { value: true });
  Iu.AbstractMessageBuffer = void 0;
  var kA = 13, NA = 10, wA = `\r
`, rm = (_a135 = class {
    constructor(e = "utf-8") {
      this._encoding = e, this._chunks = [], this._totalLength = 0;
    }
    get encoding() {
      return this._encoding;
    }
    append(e) {
      let r2 = typeof e == "string" ? this.fromString(e, this._encoding) : e;
      this._chunks.push(r2), this._totalLength += r2.byteLength;
    }
    tryReadHeaders(e = false) {
      if (this._chunks.length === 0) return;
      let r2 = 0, n2 = 0, i = 0, a = 0;
      e: for (; n2 < this._chunks.length; ) {
        let c = this._chunks[n2];
        for (i = 0; i < c.length; ) {
          switch (c[i]) {
            case kA:
              switch (r2) {
                case 0:
                  r2 = 1;
                  break;
                case 2:
                  r2 = 3;
                  break;
                default:
                  r2 = 0;
              }
              break;
            case NA:
              switch (r2) {
                case 1:
                  r2 = 2;
                  break;
                case 3:
                  r2 = 4, i++;
                  break e;
                default:
                  r2 = 0;
              }
              break;
            default:
              r2 = 0;
          }
          i++;
        }
        a += c.byteLength, n2++;
      }
      if (r2 !== 4) return;
      let o2 = this._read(a + i), l = /* @__PURE__ */ new Map(), u = this.toString(o2, "ascii").split(wA);
      if (u.length < 2) return l;
      for (let c = 0; c < u.length - 2; c++) {
        let d = u[c], m3 = d.indexOf(":");
        if (m3 === -1) throw new Error(`Message header must separate key and value using ':'
${d}`);
        let h2 = d.substr(0, m3), y = d.substr(m3 + 1).trim();
        l.set(e ? h2.toLowerCase() : h2, y);
      }
      return l;
    }
    tryReadBody(e) {
      if (!(this._totalLength < e)) return this._read(e);
    }
    get numberOfBytes() {
      return this._totalLength;
    }
    _read(e) {
      if (e === 0) return this.emptyBuffer();
      if (e > this._totalLength) throw new Error("Cannot read so many bytes!");
      if (this._chunks[0].byteLength === e) {
        let a = this._chunks[0];
        return this._chunks.shift(), this._totalLength -= e, this.asNative(a);
      }
      if (this._chunks[0].byteLength > e) {
        let a = this._chunks[0], o2 = this.asNative(a, e);
        return this._chunks[0] = a.slice(e), this._totalLength -= e, o2;
      }
      let r2 = this.allocNative(e), n2 = 0, i = 0;
      for (; e > 0; ) {
        let a = this._chunks[i];
        if (a.byteLength > e) {
          let o2 = a.slice(0, e);
          r2.set(o2, n2), n2 += e, this._chunks[i] = a.slice(e), this._totalLength -= e, e -= e;
        } else r2.set(a, n2), n2 += a.byteLength, this._chunks.shift(), this._totalLength -= a.byteLength, e -= a.byteLength;
      }
      return r2;
    }
  }, m(_a135, "AbstractMessageBuffer"), _a135);
  Iu.AbstractMessageBuffer = rm;
});
var Ky = o((Z) => {
  "use strict";
  var _a135, _b;
  Object.defineProperty(Z, "__esModule", { value: true });
  Z.createMessageConnection = Z.ConnectionOptions = Z.MessageStrategy = Z.CancellationStrategy = Z.CancellationSenderStrategy = Z.CancellationReceiverStrategy = Z.RequestCancellationReceiverStrategy = Z.IdCancellationReceiverStrategy = Z.ConnectionStrategy = Z.ConnectionError = Z.ConnectionErrors = Z.LogTraceNotification = Z.SetTraceNotification = Z.TraceFormat = Z.TraceValues = Z.Trace = Z.NullLogger = Z.ProgressType = Z.ProgressToken = void 0;
  var qy = vn(), Me = hs(), V = zp(), jy = jp(), Ro = fi2(), nm = Za(), vo;
  (function(t) {
    t.type = new V.NotificationType("$/cancelRequest");
  })(vo || (vo = {}));
  var im;
  (function(t) {
    function e(r2) {
      return typeof r2 == "string" || typeof r2 == "number";
    }
    m(e, "is"), t.is = e;
  })(im || (Z.ProgressToken = im = {}));
  var $o;
  (function(t) {
    t.type = new V.NotificationType("$/progress");
  })($o || ($o = {}));
  var sm = (_a135 = class {
    constructor() {
    }
  }, m(_a135, "ProgressType"), _a135);
  Z.ProgressType = sm;
  var am;
  (function(t) {
    function e(r2) {
      return Me.func(r2);
    }
    m(e, "is"), t.is = e;
  })(am || (am = {}));
  Z.NullLogger = Object.freeze({ error: m(() => {
  }, "error"), warn: m(() => {
  }, "warn"), info: m(() => {
  }, "info"), log: m(() => {
  }, "log") });
  var fe;
  (function(t) {
    t[t.Off = 0] = "Off", t[t.Messages = 1] = "Messages", t[t.Compact = 2] = "Compact", t[t.Verbose = 3] = "Verbose";
  })(fe || (Z.Trace = fe = {}));
  var By;
  (function(t) {
    t.Off = "off", t.Messages = "messages", t.Compact = "compact", t.Verbose = "verbose";
  })(By || (Z.TraceValues = By = {}));
  (function(t) {
    function e(n2) {
      if (!Me.string(n2)) return t.Off;
      switch (n2 = n2.toLowerCase(), n2) {
        case "off":
          return t.Off;
        case "messages":
          return t.Messages;
        case "compact":
          return t.Compact;
        case "verbose":
          return t.Verbose;
        default:
          return t.Off;
      }
    }
    m(e, "fromString"), t.fromString = e;
    function r2(n2) {
      switch (n2) {
        case t.Off:
          return "off";
        case t.Messages:
          return "messages";
        case t.Compact:
          return "compact";
        case t.Verbose:
          return "verbose";
        default:
          return "off";
      }
    }
    m(r2, "toString"), t.toString = r2;
  })(fe || (Z.Trace = fe = {}));
  var Wt;
  (function(t) {
    t.Text = "text", t.JSON = "json";
  })(Wt || (Z.TraceFormat = Wt = {}));
  (function(t) {
    function e(r2) {
      return Me.string(r2) ? (r2 = r2.toLowerCase(), r2 === "json" ? t.JSON : t.Text) : t.Text;
    }
    m(e, "fromString"), t.fromString = e;
  })(Wt || (Z.TraceFormat = Wt = {}));
  var om;
  (function(t) {
    t.type = new V.NotificationType("$/setTrace");
  })(om || (Z.SetTraceNotification = om = {}));
  var bu;
  (function(t) {
    t.type = new V.NotificationType("$/logTrace");
  })(bu || (Z.LogTraceNotification = bu = {}));
  var xo;
  (function(t) {
    t[t.Closed = 1] = "Closed", t[t.Disposed = 2] = "Disposed", t[t.AlreadyListening = 3] = "AlreadyListening";
  })(xo || (Z.ConnectionErrors = xo = {}));
  var Ss = (_b = class extends Error {
    constructor(e, r2) {
      super(r2), this.code = e, Object.setPrototypeOf(this, _b.prototype);
    }
  }, m(_b, "ConnectionError"), _b);
  Z.ConnectionError = Ss;
  var lm2;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && Me.func(n2.cancelUndispatched);
    }
    m(e, "is"), t.is = e;
  })(lm2 || (Z.ConnectionStrategy = lm2 = {}));
  var _u;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && (n2.kind === void 0 || n2.kind === "id") && Me.func(n2.createCancellationTokenSource) && (n2.dispose === void 0 || Me.func(n2.dispose));
    }
    m(e, "is"), t.is = e;
  })(_u || (Z.IdCancellationReceiverStrategy = _u = {}));
  var um;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && n2.kind === "request" && Me.func(n2.createCancellationTokenSource) && (n2.dispose === void 0 || Me.func(n2.dispose));
    }
    m(e, "is"), t.is = e;
  })(um || (Z.RequestCancellationReceiverStrategy = um = {}));
  var Pu;
  (function(t) {
    t.Message = Object.freeze({ createCancellationTokenSource(r2) {
      return new nm.CancellationTokenSource();
    } });
    function e(r2) {
      return _u.is(r2) || um.is(r2);
    }
    m(e, "is"), t.is = e;
  })(Pu || (Z.CancellationReceiverStrategy = Pu = {}));
  var Ou;
  (function(t) {
    t.Message = Object.freeze({ sendCancellation(r2, n2) {
      return r2.sendNotification(vo.type, { id: n2 });
    }, cleanup(r2) {
    } });
    function e(r2) {
      let n2 = r2;
      return n2 && Me.func(n2.sendCancellation) && Me.func(n2.cleanup);
    }
    m(e, "is"), t.is = e;
  })(Ou || (Z.CancellationSenderStrategy = Ou = {}));
  var Lu;
  (function(t) {
    t.Message = Object.freeze({ receiver: Pu.Message, sender: Ou.Message });
    function e(r2) {
      let n2 = r2;
      return n2 && Pu.is(n2.receiver) && Ou.is(n2.sender);
    }
    m(e, "is"), t.is = e;
  })(Lu || (Z.CancellationStrategy = Lu = {}));
  var Du;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && Me.func(n2.handleMessage);
    }
    m(e, "is"), t.is = e;
  })(Du || (Z.MessageStrategy = Du = {}));
  var Wy;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && (Lu.is(n2.cancellationStrategy) || lm2.is(n2.connectionStrategy) || Du.is(n2.messageStrategy));
    }
    m(e, "is"), t.is = e;
  })(Wy || (Z.ConnectionOptions = Wy = {}));
  var dr;
  (function(t) {
    t[t.New = 1] = "New", t[t.Listening = 2] = "Listening", t[t.Closed = 3] = "Closed", t[t.Disposed = 4] = "Disposed";
  })(dr || (dr = {}));
  function IA(t, e, r2, n2) {
    let i = r2 !== void 0 ? r2 : Z.NullLogger, a = 0, o2 = 0, l = 0, u = "2.0", c, d = /* @__PURE__ */ new Map(), m3, h2 = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), k, w = new jy.LinkedMap(), q2 = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Map(), E = fe.Off, H = Wt.Text, U, he = dr.New, mr = new Ro.Emitter(), Xe = new Ro.Emitter(), tr = new Ro.Emitter(), Vt = new Ro.Emitter(), C = new Ro.Emitter(), T2 = n2 && n2.cancellationStrategy ? n2.cancellationStrategy : Lu.Message;
    function L(p2) {
      if (p2 === null) throw new Error("Can't send requests with id null since the response can't be correlated.");
      return "req-" + p2.toString();
    }
    m(L, "createRequestQueueKey");
    function O(p2) {
      return p2 === null ? "res-unknown-" + (++l).toString() : "res-" + p2.toString();
    }
    m(O, "createResponseQueueKey");
    function R() {
      return "not-" + (++o2).toString();
    }
    m(R, "createNotificationQueueKey");
    function x(p2, v) {
      V.Message.isRequest(v) ? p2.set(L(v.id), v) : V.Message.isResponse(v) ? p2.set(O(v.id), v) : p2.set(R(), v);
    }
    m(x, "addMessageToQueue");
    function A(p2) {
    }
    m(A, "cancelUndispatched");
    function _() {
      return he === dr.Listening;
    }
    m(_, "isListening");
    function F() {
      return he === dr.Closed;
    }
    m(F, "isClosed");
    function N2() {
      return he === dr.Disposed;
    }
    m(N2, "isDisposed");
    function Y2() {
      (he === dr.New || he === dr.Listening) && (he = dr.Closed, Xe.fire(void 0));
    }
    m(Y2, "closeHandler");
    function Q(p2) {
      mr.fire([p2, void 0, void 0]);
    }
    m(Q, "readErrorHandler");
    function Be(p2) {
      mr.fire(p2);
    }
    m(Be, "writeErrorHandler"), t.onClose(Y2), t.onError(Q), e.onClose(Y2), e.onError(Be);
    function ce() {
      k || w.size === 0 || (k = (0, qy.default)().timer.setImmediate(() => {
        k = void 0, hr();
      }));
    }
    m(ce, "triggerMessageQueue");
    function _e(p2) {
      V.Message.isRequest(p2) ? bt(p2) : V.Message.isNotification(p2) ? xt(p2) : V.Message.isResponse(p2) ? tn(p2) : rr(p2);
    }
    m(_e, "handleMessage");
    function hr() {
      if (w.size === 0) return;
      let p2 = w.shift();
      try {
        let v = n2 == null ? void 0 : n2.messageStrategy;
        Du.is(v) ? v.handleMessage(p2, _e) : _e(p2);
      } finally {
        ce();
      }
    }
    m(hr, "processMessageQueue");
    let rt = m((p2) => {
      try {
        if (V.Message.isNotification(p2) && p2.method === vo.type.method) {
          let v = p2.params.id, I = L(v), z = w.get(I);
          if (V.Message.isRequest(z)) {
            let ge = n2 == null ? void 0 : n2.connectionStrategy, Fe = ge && ge.cancelUndispatched ? ge.cancelUndispatched(z, A) : void 0;
            if (Fe && (Fe.error !== void 0 || Fe.result !== void 0)) {
              w.delete(I), P.delete(v), Fe.id = z.id, rn(Fe, p2.method, Date.now()), e.write(Fe).catch(() => i.error("Sending response for canceled message failed."));
              return;
            }
          }
          let Ee = P.get(v);
          if (Ee !== void 0) {
            Ee.cancel(), vc(p2);
            return;
          } else M.add(v);
        }
        x(w, p2);
      } finally {
        ce();
      }
    }, "callback");
    function bt(p2) {
      if (N2()) return;
      function v(oe, Pe, me) {
        let Je = { jsonrpc: u, id: p2.id };
        oe instanceof V.ResponseError ? Je.error = oe.toJson() : Je.result = oe === void 0 ? null : oe, rn(Je, Pe, me), e.write(Je).catch(() => i.error("Sending response failed."));
      }
      m(v, "reply");
      function I(oe, Pe, me) {
        let Je = { jsonrpc: u, id: p2.id, error: oe.toJson() };
        rn(Je, Pe, me), e.write(Je).catch(() => i.error("Sending response failed."));
      }
      m(I, "replyError");
      function z(oe, Pe, me) {
        oe === void 0 && (oe = null);
        let Je = { jsonrpc: u, id: p2.id, result: oe };
        rn(Je, Pe, me), e.write(Je).catch(() => i.error("Sending response failed."));
      }
      m(z, "replySuccess"), Bo(p2);
      let Ee = d.get(p2.method), ge, Fe;
      Ee && (ge = Ee.type, Fe = Ee.handler);
      let qe = Date.now();
      if (Fe || c) {
        let oe = p2.id ?? String(Date.now()), Pe = _u.is(T2.receiver) ? T2.receiver.createCancellationTokenSource(oe) : T2.receiver.createCancellationTokenSource(p2);
        p2.id !== null && M.has(p2.id) && Pe.cancel(), p2.id !== null && P.set(oe, Pe);
        try {
          let me;
          if (Fe) if (p2.params === void 0) {
            if (ge !== void 0 && ge.numberOfParams !== 0) {
              I(new V.ResponseError(V.ErrorCodes.InvalidParams, `Request ${p2.method} defines ${ge.numberOfParams} params but received none.`), p2.method, qe);
              return;
            }
            me = Fe(Pe.token);
          } else if (Array.isArray(p2.params)) {
            if (ge !== void 0 && ge.parameterStructures === V.ParameterStructures.byName) {
              I(new V.ResponseError(V.ErrorCodes.InvalidParams, `Request ${p2.method} defines parameters by name but received parameters by position`), p2.method, qe);
              return;
            }
            me = Fe(...p2.params, Pe.token);
          } else {
            if (ge !== void 0 && ge.parameterStructures === V.ParameterStructures.byPosition) {
              I(new V.ResponseError(V.ErrorCodes.InvalidParams, `Request ${p2.method} defines parameters by position but received parameters by name`), p2.method, qe);
              return;
            }
            me = Fe(p2.params, Pe.token);
          }
          else c && (me = c(p2.method, p2.params, Pe.token));
          let Je = me;
          me ? Je.then ? Je.then((vt) => {
            P.delete(oe), v(vt, p2.method, qe);
          }, (vt) => {
            P.delete(oe), vt instanceof V.ResponseError ? I(vt, p2.method, qe) : vt && Me.string(vt.message) ? I(new V.ResponseError(V.ErrorCodes.InternalError, `Request ${p2.method} failed with message: ${vt.message}`), p2.method, qe) : I(new V.ResponseError(V.ErrorCodes.InternalError, `Request ${p2.method} failed unexpectedly without providing any details.`), p2.method, qe);
          }) : (P.delete(oe), v(me, p2.method, qe)) : (P.delete(oe), z(me, p2.method, qe));
        } catch (me) {
          P.delete(oe), me instanceof V.ResponseError ? v(me, p2.method, qe) : me && Me.string(me.message) ? I(new V.ResponseError(V.ErrorCodes.InternalError, `Request ${p2.method} failed with message: ${me.message}`), p2.method, qe) : I(new V.ResponseError(V.ErrorCodes.InternalError, `Request ${p2.method} failed unexpectedly without providing any details.`), p2.method, qe);
        }
      } else I(new V.ResponseError(V.ErrorCodes.MethodNotFound, `Unhandled method ${p2.method}`), p2.method, qe);
    }
    m(bt, "handleRequest");
    function tn(p2) {
      if (!N2()) if (p2.id === null) p2.error ? i.error(`Received response message without id: Error is: 
${JSON.stringify(p2.error, void 0, 4)}`) : i.error("Received response message without id. No further error information provided.");
      else {
        let v = p2.id, I = q2.get(v);
        if (vx(p2, I), I !== void 0) {
          q2.delete(v);
          try {
            if (p2.error) {
              let z = p2.error;
              I.reject(new V.ResponseError(z.code, z.message, z.data));
            } else if (p2.result !== void 0) I.resolve(p2.result);
            else throw new Error("Should never happen.");
          } catch (z) {
            z.message ? i.error(`Response handler '${I.method}' failed with message: ${z.message}`) : i.error(`Response handler '${I.method}' failed unexpectedly.`);
          }
        }
      }
    }
    m(tn, "handleResponse");
    function xt(p2) {
      if (N2()) return;
      let v, I;
      if (p2.method === vo.type.method) {
        let z = p2.params.id;
        M.delete(z), vc(p2);
        return;
      } else {
        let z = h2.get(p2.method);
        z && (I = z.handler, v = z.type);
      }
      if (I || m3) try {
        if (vc(p2), I) if (p2.params === void 0) v !== void 0 && v.numberOfParams !== 0 && v.parameterStructures !== V.ParameterStructures.byName && i.error(`Notification ${p2.method} defines ${v.numberOfParams} params but received none.`), I();
        else if (Array.isArray(p2.params)) {
          let z = p2.params;
          p2.method === $o.type.method && z.length === 2 && im.is(z[0]) ? I({ token: z[0], value: z[1] }) : (v !== void 0 && (v.parameterStructures === V.ParameterStructures.byName && i.error(`Notification ${p2.method} defines parameters by name but received parameters by position`), v.numberOfParams !== p2.params.length && i.error(`Notification ${p2.method} defines ${v.numberOfParams} params but received ${z.length} arguments`)), I(...z));
        } else v !== void 0 && v.parameterStructures === V.ParameterStructures.byPosition && i.error(`Notification ${p2.method} defines parameters by position but received parameters by name`), I(p2.params);
        else m3 && m3(p2.method, p2.params);
      } catch (z) {
        z.message ? i.error(`Notification handler '${p2.method}' failed with message: ${z.message}`) : i.error(`Notification handler '${p2.method}' failed unexpectedly.`);
      }
      else tr.fire(p2);
    }
    m(xt, "handleNotification");
    function rr(p2) {
      if (!p2) {
        i.error("Received empty message.");
        return;
      }
      i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(p2, null, 4)}`);
      let v = p2;
      if (Me.string(v.id) || Me.number(v.id)) {
        let I = v.id, z = q2.get(I);
        z && z.reject(new Error("The received response has neither a result nor an error property."));
      }
    }
    m(rr, "handleInvalidMessage");
    function at(p2) {
      if (p2 != null) switch (E) {
        case fe.Verbose:
          return JSON.stringify(p2, null, 4);
        case fe.Compact:
          return JSON.stringify(p2);
        default:
          return;
      }
    }
    m(at, "stringifyTrace");
    function nr(p2) {
      if (!(E === fe.Off || !U)) if (H === Wt.Text) {
        let v;
        (E === fe.Verbose || E === fe.Compact) && p2.params && (v = `Params: ${at(p2.params)}

`), U.log(`Sending request '${p2.method} - (${p2.id})'.`, v);
      } else Si("send-request", p2);
    }
    m(nr, "traceSendingRequest");
    function Or(p2) {
      if (!(E === fe.Off || !U)) if (H === Wt.Text) {
        let v;
        (E === fe.Verbose || E === fe.Compact) && (p2.params ? v = `Params: ${at(p2.params)}

` : v = `No parameters provided.

`), U.log(`Sending notification '${p2.method}'.`, v);
      } else Si("send-notification", p2);
    }
    m(Or, "traceSendingNotification");
    function rn(p2, v, I) {
      if (!(E === fe.Off || !U)) if (H === Wt.Text) {
        let z;
        (E === fe.Verbose || E === fe.Compact) && (p2.error && p2.error.data ? z = `Error data: ${at(p2.error.data)}

` : p2.result ? z = `Result: ${at(p2.result)}

` : p2.error === void 0 && (z = `No result returned.

`)), U.log(`Sending response '${v} - (${p2.id})'. Processing request took ${Date.now() - I}ms`, z);
      } else Si("send-response", p2);
    }
    m(rn, "traceSendingResponse");
    function Bo(p2) {
      if (!(E === fe.Off || !U)) if (H === Wt.Text) {
        let v;
        (E === fe.Verbose || E === fe.Compact) && p2.params && (v = `Params: ${at(p2.params)}

`), U.log(`Received request '${p2.method} - (${p2.id})'.`, v);
      } else Si("receive-request", p2);
    }
    m(Bo, "traceReceivedRequest");
    function vc(p2) {
      if (!(E === fe.Off || !U || p2.method === bu.type.method)) if (H === Wt.Text) {
        let v;
        (E === fe.Verbose || E === fe.Compact) && (p2.params ? v = `Params: ${at(p2.params)}

` : v = `No parameters provided.

`), U.log(`Received notification '${p2.method}'.`, v);
      } else Si("receive-notification", p2);
    }
    m(vc, "traceReceivedNotification");
    function vx(p2, v) {
      if (!(E === fe.Off || !U)) if (H === Wt.Text) {
        let I;
        if ((E === fe.Verbose || E === fe.Compact) && (p2.error && p2.error.data ? I = `Error data: ${at(p2.error.data)}

` : p2.result ? I = `Result: ${at(p2.result)}

` : p2.error === void 0 && (I = `No result returned.

`)), v) {
          let z = p2.error ? ` Request failed: ${p2.error.message} (${p2.error.code}).` : "";
          U.log(`Received response '${v.method} - (${p2.id})' in ${Date.now() - v.timerStart}ms.${z}`, I);
        } else U.log(`Received response ${p2.id} without active response promise.`, I);
      } else Si("receive-response", p2);
    }
    m(vx, "traceReceivedResponse");
    function Si(p2, v) {
      if (!U || E === fe.Off) return;
      let I = { isLSPMessage: true, type: p2, message: v, timestamp: Date.now() };
      U.log(I);
    }
    m(Si, "logLSPMessage");
    function Hs() {
      if (F()) throw new Ss(xo.Closed, "Connection is closed.");
      if (N2()) throw new Ss(xo.Disposed, "Connection is disposed.");
    }
    m(Hs, "throwIfClosedOrDisposed");
    function Ex() {
      if (_()) throw new Ss(xo.AlreadyListening, "Connection is already listening");
    }
    m(Ex, "throwIfListening");
    function Ax() {
      if (!_()) throw new Error("Call listen() first.");
    }
    m(Ax, "throwIfNotListening");
    function Ys(p2) {
      return p2 === void 0 ? null : p2;
    }
    m(Ys, "undefinedToNull");
    function Th(p2) {
      if (p2 !== null) return p2;
    }
    m(Th, "nullToUndefined");
    function Rh(p2) {
      return p2 != null && !Array.isArray(p2) && typeof p2 == "object";
    }
    m(Rh, "isNamedParam");
    function Ec(p2, v) {
      switch (p2) {
        case V.ParameterStructures.auto:
          return Rh(v) ? Th(v) : [Ys(v)];
        case V.ParameterStructures.byName:
          if (!Rh(v)) throw new Error("Received parameters by name but param is not an object literal.");
          return Th(v);
        case V.ParameterStructures.byPosition:
          return [Ys(v)];
        default:
          throw new Error(`Unknown parameter structure ${p2.toString()}`);
      }
    }
    m(Ec, "computeSingleParam");
    function $h(p2, v) {
      let I, z = p2.numberOfParams;
      switch (z) {
        case 0:
          I = void 0;
          break;
        case 1:
          I = Ec(p2.parameterStructures, v[0]);
          break;
        default:
          I = [];
          for (let Ee = 0; Ee < v.length && Ee < z; Ee++) I.push(Ys(v[Ee]));
          if (v.length < z) for (let Ee = v.length; Ee < z; Ee++) I.push(null);
          break;
      }
      return I;
    }
    m($h, "computeMessageParams");
    let ki = { sendNotification: m((p2, ...v) => {
      Hs();
      let I, z;
      if (Me.string(p2)) {
        I = p2;
        let ge = v[0], Fe = 0, qe = V.ParameterStructures.auto;
        V.ParameterStructures.is(ge) && (Fe = 1, qe = ge);
        let oe = v.length, Pe = oe - Fe;
        switch (Pe) {
          case 0:
            z = void 0;
            break;
          case 1:
            z = Ec(qe, v[Fe]);
            break;
          default:
            if (qe === V.ParameterStructures.byName) throw new Error(`Received ${Pe} parameters for 'by Name' notification parameter structure.`);
            z = v.slice(Fe, oe).map((me) => Ys(me));
            break;
        }
      } else {
        let ge = v;
        I = p2.method, z = $h(p2, ge);
      }
      let Ee = { jsonrpc: u, method: I, params: z };
      return Or(Ee), e.write(Ee).catch((ge) => {
        throw i.error("Sending notification failed."), ge;
      });
    }, "sendNotification"), onNotification: m((p2, v) => {
      Hs();
      let I;
      return Me.func(p2) ? m3 = p2 : v && (Me.string(p2) ? (I = p2, h2.set(p2, { type: void 0, handler: v })) : (I = p2.method, h2.set(p2.method, { type: p2, handler: v }))), { dispose: m(() => {
        I !== void 0 ? h2.delete(I) : m3 = void 0;
      }, "dispose") };
    }, "onNotification"), onProgress: m((p2, v, I) => {
      if (y.has(v)) throw new Error(`Progress handler for token ${v} already registered`);
      return y.set(v, I), { dispose: m(() => {
        y.delete(v);
      }, "dispose") };
    }, "onProgress"), sendProgress: m((p2, v, I) => ki.sendNotification($o.type, { token: v, value: I }), "sendProgress"), onUnhandledProgress: Vt.event, sendRequest: m((p2, ...v) => {
      Hs(), Ax();
      let I, z, Ee;
      if (Me.string(p2)) {
        I = p2;
        let oe = v[0], Pe = v[v.length - 1], me = 0, Je = V.ParameterStructures.auto;
        V.ParameterStructures.is(oe) && (me = 1, Je = oe);
        let vt = v.length;
        nm.CancellationToken.is(Pe) && (vt = vt - 1, Ee = Pe);
        let gr = vt - me;
        switch (gr) {
          case 0:
            z = void 0;
            break;
          case 1:
            z = Ec(Je, v[me]);
            break;
          default:
            if (Je === V.ParameterStructures.byName) throw new Error(`Received ${gr} parameters for 'by Name' request parameter structure.`);
            z = v.slice(me, vt).map((Cx) => Ys(Cx));
            break;
        }
      } else {
        let oe = v;
        I = p2.method, z = $h(p2, oe);
        let Pe = p2.numberOfParams;
        Ee = nm.CancellationToken.is(oe[Pe]) ? oe[Pe] : void 0;
      }
      let ge = a++, Fe;
      Ee && (Fe = Ee.onCancellationRequested(() => {
        let oe = T2.sender.sendCancellation(ki, ge);
        return oe === void 0 ? (i.log(`Received no promise from cancellation strategy when cancelling id ${ge}`), Promise.resolve()) : oe.catch(() => {
          i.log(`Sending cancellation messages for id ${ge} failed`);
        });
      }));
      let qe = { jsonrpc: u, id: ge, method: I, params: z };
      return nr(qe), typeof T2.sender.enableCancellation == "function" && T2.sender.enableCancellation(qe), new Promise(async (oe, Pe) => {
        let me = m((gr) => {
          oe(gr), T2.sender.cleanup(ge), Fe == null ? void 0 : Fe.dispose();
        }, "resolveWithCleanup"), Je = m((gr) => {
          Pe(gr), T2.sender.cleanup(ge), Fe == null ? void 0 : Fe.dispose();
        }, "rejectWithCleanup"), vt = { method: I, timerStart: Date.now(), resolve: me, reject: Je };
        try {
          await e.write(qe), q2.set(ge, vt);
        } catch (gr) {
          throw i.error("Sending request failed."), vt.reject(new V.ResponseError(V.ErrorCodes.MessageWriteError, gr.message ? gr.message : "Unknown reason")), gr;
        }
      });
    }, "sendRequest"), onRequest: m((p2, v) => {
      Hs();
      let I = null;
      return am.is(p2) ? (I = void 0, c = p2) : Me.string(p2) ? (I = null, v !== void 0 && (I = p2, d.set(p2, { handler: v, type: void 0 }))) : v !== void 0 && (I = p2.method, d.set(p2.method, { type: p2, handler: v })), { dispose: m(() => {
        I !== null && (I !== void 0 ? d.delete(I) : c = void 0);
      }, "dispose") };
    }, "onRequest"), hasPendingResponse: m(() => q2.size > 0, "hasPendingResponse"), trace: m(async (p2, v, I) => {
      let z = false, Ee = Wt.Text;
      I !== void 0 && (Me.boolean(I) ? z = I : (z = I.sendNotification || false, Ee = I.traceFormat || Wt.Text)), E = p2, H = Ee, E === fe.Off ? U = void 0 : U = v, z && !F() && !N2() && await ki.sendNotification(om.type, { value: fe.toString(p2) });
    }, "trace"), onError: mr.event, onClose: Xe.event, onUnhandledNotification: tr.event, onDispose: C.event, end: m(() => {
      e.end();
    }, "end"), dispose: m(() => {
      if (N2()) return;
      he = dr.Disposed, C.fire(void 0);
      let p2 = new V.ResponseError(V.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
      for (let v of q2.values()) v.reject(p2);
      q2 = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set(), w = new jy.LinkedMap(), Me.func(e.dispose) && e.dispose(), Me.func(t.dispose) && t.dispose();
    }, "dispose"), listen: m(() => {
      Hs(), Ex(), he = dr.Listening, t.listen(rt);
    }, "listen"), inspect: m(() => {
      (0, qy.default)().console.log("inspect");
    }, "inspect") };
    return ki.onNotification(bu.type, (p2) => {
      if (E === fe.Off || !U) return;
      let v = E === fe.Verbose || E === fe.Compact;
      U.log(p2.message, v ? p2.verbose : void 0);
    }), ki.onNotification($o.type, (p2) => {
      let v = y.get(p2.token);
      v ? v(p2.value) : Vt.fire(p2);
    }), ki;
  }
  m(IA, "createMessageConnection");
  Z.createMessageConnection = IA;
});
var Mu = o(($) => {
  "use strict";
  Object.defineProperty($, "__esModule", { value: true });
  $.ProgressType = $.ProgressToken = $.createMessageConnection = $.NullLogger = $.ConnectionOptions = $.ConnectionStrategy = $.AbstractMessageBuffer = $.WriteableStreamMessageWriter = $.AbstractMessageWriter = $.MessageWriter = $.ReadableStreamMessageReader = $.AbstractMessageReader = $.MessageReader = $.SharedArrayReceiverStrategy = $.SharedArraySenderStrategy = $.CancellationToken = $.CancellationTokenSource = $.Emitter = $.Event = $.Disposable = $.LRUCache = $.Touch = $.LinkedMap = $.ParameterStructures = $.NotificationType9 = $.NotificationType8 = $.NotificationType7 = $.NotificationType6 = $.NotificationType5 = $.NotificationType4 = $.NotificationType3 = $.NotificationType2 = $.NotificationType1 = $.NotificationType0 = $.NotificationType = $.ErrorCodes = $.ResponseError = $.RequestType9 = $.RequestType8 = $.RequestType7 = $.RequestType6 = $.RequestType5 = $.RequestType4 = $.RequestType3 = $.RequestType2 = $.RequestType1 = $.RequestType0 = $.RequestType = $.Message = $.RAL = void 0;
  $.MessageStrategy = $.CancellationStrategy = $.CancellationSenderStrategy = $.CancellationReceiverStrategy = $.ConnectionError = $.ConnectionErrors = $.LogTraceNotification = $.SetTraceNotification = $.TraceFormat = $.TraceValues = $.Trace = void 0;
  var ve = zp();
  Object.defineProperty($, "Message", { enumerable: true, get: m(function() {
    return ve.Message;
  }, "get") });
  Object.defineProperty($, "RequestType", { enumerable: true, get: m(function() {
    return ve.RequestType;
  }, "get") });
  Object.defineProperty($, "RequestType0", { enumerable: true, get: m(function() {
    return ve.RequestType0;
  }, "get") });
  Object.defineProperty($, "RequestType1", { enumerable: true, get: m(function() {
    return ve.RequestType1;
  }, "get") });
  Object.defineProperty($, "RequestType2", { enumerable: true, get: m(function() {
    return ve.RequestType2;
  }, "get") });
  Object.defineProperty($, "RequestType3", { enumerable: true, get: m(function() {
    return ve.RequestType3;
  }, "get") });
  Object.defineProperty($, "RequestType4", { enumerable: true, get: m(function() {
    return ve.RequestType4;
  }, "get") });
  Object.defineProperty($, "RequestType5", { enumerable: true, get: m(function() {
    return ve.RequestType5;
  }, "get") });
  Object.defineProperty($, "RequestType6", { enumerable: true, get: m(function() {
    return ve.RequestType6;
  }, "get") });
  Object.defineProperty($, "RequestType7", { enumerable: true, get: m(function() {
    return ve.RequestType7;
  }, "get") });
  Object.defineProperty($, "RequestType8", { enumerable: true, get: m(function() {
    return ve.RequestType8;
  }, "get") });
  Object.defineProperty($, "RequestType9", { enumerable: true, get: m(function() {
    return ve.RequestType9;
  }, "get") });
  Object.defineProperty($, "ResponseError", { enumerable: true, get: m(function() {
    return ve.ResponseError;
  }, "get") });
  Object.defineProperty($, "ErrorCodes", { enumerable: true, get: m(function() {
    return ve.ErrorCodes;
  }, "get") });
  Object.defineProperty($, "NotificationType", { enumerable: true, get: m(function() {
    return ve.NotificationType;
  }, "get") });
  Object.defineProperty($, "NotificationType0", { enumerable: true, get: m(function() {
    return ve.NotificationType0;
  }, "get") });
  Object.defineProperty($, "NotificationType1", { enumerable: true, get: m(function() {
    return ve.NotificationType1;
  }, "get") });
  Object.defineProperty($, "NotificationType2", { enumerable: true, get: m(function() {
    return ve.NotificationType2;
  }, "get") });
  Object.defineProperty($, "NotificationType3", { enumerable: true, get: m(function() {
    return ve.NotificationType3;
  }, "get") });
  Object.defineProperty($, "NotificationType4", { enumerable: true, get: m(function() {
    return ve.NotificationType4;
  }, "get") });
  Object.defineProperty($, "NotificationType5", { enumerable: true, get: m(function() {
    return ve.NotificationType5;
  }, "get") });
  Object.defineProperty($, "NotificationType6", { enumerable: true, get: m(function() {
    return ve.NotificationType6;
  }, "get") });
  Object.defineProperty($, "NotificationType7", { enumerable: true, get: m(function() {
    return ve.NotificationType7;
  }, "get") });
  Object.defineProperty($, "NotificationType8", { enumerable: true, get: m(function() {
    return ve.NotificationType8;
  }, "get") });
  Object.defineProperty($, "NotificationType9", { enumerable: true, get: m(function() {
    return ve.NotificationType9;
  }, "get") });
  Object.defineProperty($, "ParameterStructures", { enumerable: true, get: m(function() {
    return ve.ParameterStructures;
  }, "get") });
  var cm2 = jp();
  Object.defineProperty($, "LinkedMap", { enumerable: true, get: m(function() {
    return cm2.LinkedMap;
  }, "get") });
  Object.defineProperty($, "LRUCache", { enumerable: true, get: m(function() {
    return cm2.LRUCache;
  }, "get") });
  Object.defineProperty($, "Touch", { enumerable: true, get: m(function() {
    return cm2.Touch;
  }, "get") });
  var bA = _y();
  Object.defineProperty($, "Disposable", { enumerable: true, get: m(function() {
    return bA.Disposable;
  }, "get") });
  var Vy = fi2();
  Object.defineProperty($, "Event", { enumerable: true, get: m(function() {
    return Vy.Event;
  }, "get") });
  Object.defineProperty($, "Emitter", { enumerable: true, get: m(function() {
    return Vy.Emitter;
  }, "get") });
  var Hy = Za();
  Object.defineProperty($, "CancellationTokenSource", { enumerable: true, get: m(function() {
    return Hy.CancellationTokenSource;
  }, "get") });
  Object.defineProperty($, "CancellationToken", { enumerable: true, get: m(function() {
    return Hy.CancellationToken;
  }, "get") });
  var Yy = Py();
  Object.defineProperty($, "SharedArraySenderStrategy", { enumerable: true, get: m(function() {
    return Yy.SharedArraySenderStrategy;
  }, "get") });
  Object.defineProperty($, "SharedArrayReceiverStrategy", { enumerable: true, get: m(function() {
    return Yy.SharedArrayReceiverStrategy;
  }, "get") });
  var fm2 = Ly();
  Object.defineProperty($, "MessageReader", { enumerable: true, get: m(function() {
    return fm2.MessageReader;
  }, "get") });
  Object.defineProperty($, "AbstractMessageReader", { enumerable: true, get: m(function() {
    return fm2.AbstractMessageReader;
  }, "get") });
  Object.defineProperty($, "ReadableStreamMessageReader", { enumerable: true, get: m(function() {
    return fm2.ReadableStreamMessageReader;
  }, "get") });
  var dm = Uy();
  Object.defineProperty($, "MessageWriter", { enumerable: true, get: m(function() {
    return dm.MessageWriter;
  }, "get") });
  Object.defineProperty($, "AbstractMessageWriter", { enumerable: true, get: m(function() {
    return dm.AbstractMessageWriter;
  }, "get") });
  Object.defineProperty($, "WriteableStreamMessageWriter", { enumerable: true, get: m(function() {
    return dm.WriteableStreamMessageWriter;
  }, "get") });
  var _A = zy();
  Object.defineProperty($, "AbstractMessageBuffer", { enumerable: true, get: m(function() {
    return _A.AbstractMessageBuffer;
  }, "get") });
  var ut = Ky();
  Object.defineProperty($, "ConnectionStrategy", { enumerable: true, get: m(function() {
    return ut.ConnectionStrategy;
  }, "get") });
  Object.defineProperty($, "ConnectionOptions", { enumerable: true, get: m(function() {
    return ut.ConnectionOptions;
  }, "get") });
  Object.defineProperty($, "NullLogger", { enumerable: true, get: m(function() {
    return ut.NullLogger;
  }, "get") });
  Object.defineProperty($, "createMessageConnection", { enumerable: true, get: m(function() {
    return ut.createMessageConnection;
  }, "get") });
  Object.defineProperty($, "ProgressToken", { enumerable: true, get: m(function() {
    return ut.ProgressToken;
  }, "get") });
  Object.defineProperty($, "ProgressType", { enumerable: true, get: m(function() {
    return ut.ProgressType;
  }, "get") });
  Object.defineProperty($, "Trace", { enumerable: true, get: m(function() {
    return ut.Trace;
  }, "get") });
  Object.defineProperty($, "TraceValues", { enumerable: true, get: m(function() {
    return ut.TraceValues;
  }, "get") });
  Object.defineProperty($, "TraceFormat", { enumerable: true, get: m(function() {
    return ut.TraceFormat;
  }, "get") });
  Object.defineProperty($, "SetTraceNotification", { enumerable: true, get: m(function() {
    return ut.SetTraceNotification;
  }, "get") });
  Object.defineProperty($, "LogTraceNotification", { enumerable: true, get: m(function() {
    return ut.LogTraceNotification;
  }, "get") });
  Object.defineProperty($, "ConnectionErrors", { enumerable: true, get: m(function() {
    return ut.ConnectionErrors;
  }, "get") });
  Object.defineProperty($, "ConnectionError", { enumerable: true, get: m(function() {
    return ut.ConnectionError;
  }, "get") });
  Object.defineProperty($, "CancellationReceiverStrategy", { enumerable: true, get: m(function() {
    return ut.CancellationReceiverStrategy;
  }, "get") });
  Object.defineProperty($, "CancellationSenderStrategy", { enumerable: true, get: m(function() {
    return ut.CancellationSenderStrategy;
  }, "get") });
  Object.defineProperty($, "CancellationStrategy", { enumerable: true, get: m(function() {
    return ut.CancellationStrategy;
  }, "get") });
  Object.defineProperty($, "MessageStrategy", { enumerable: true, get: m(function() {
    return ut.MessageStrategy;
  }, "get") });
  var PA = vn();
  $.RAL = PA.default;
});
var Jy = o((gm) => {
  "use strict";
  var _a135, _b, _c2;
  Object.defineProperty(gm, "__esModule", { value: true });
  var wr = Mu(), Fu = (_a135 = class extends wr.AbstractMessageBuffer {
    constructor(e = "utf-8") {
      super(e), this.asciiDecoder = new TextDecoder("ascii");
    }
    emptyBuffer() {
      return _a135.emptyBuffer;
    }
    fromString(e, r2) {
      return new TextEncoder().encode(e);
    }
    toString(e, r2) {
      return r2 === "ascii" ? this.asciiDecoder.decode(e) : new TextDecoder(r2).decode(e);
    }
    asNative(e, r2) {
      return r2 === void 0 ? e : e.slice(0, r2);
    }
    allocNative(e) {
      return new Uint8Array(e);
    }
  }, m(_a135, "MessageBuffer"), _a135);
  Fu.emptyBuffer = new Uint8Array(0);
  var pm2 = (_b = class {
    constructor(e) {
      this.socket = e, this._onData = new wr.Emitter(), this._messageListener = (r2) => {
        r2.data.arrayBuffer().then((i) => {
          this._onData.fire(new Uint8Array(i));
        }, () => {
          (0, wr.RAL)().console.error("Converting blob to array buffer failed.");
        });
      }, this.socket.addEventListener("message", this._messageListener);
    }
    onClose(e) {
      return this.socket.addEventListener("close", e), wr.Disposable.create(() => this.socket.removeEventListener("close", e));
    }
    onError(e) {
      return this.socket.addEventListener("error", e), wr.Disposable.create(() => this.socket.removeEventListener("error", e));
    }
    onEnd(e) {
      return this.socket.addEventListener("end", e), wr.Disposable.create(() => this.socket.removeEventListener("end", e));
    }
    onData(e) {
      return this._onData.event(e);
    }
  }, m(_b, "ReadableStreamWrapper"), _b), mm = (_c2 = class {
    constructor(e) {
      this.socket = e;
    }
    onClose(e) {
      return this.socket.addEventListener("close", e), wr.Disposable.create(() => this.socket.removeEventListener("close", e));
    }
    onError(e) {
      return this.socket.addEventListener("error", e), wr.Disposable.create(() => this.socket.removeEventListener("error", e));
    }
    onEnd(e) {
      return this.socket.addEventListener("end", e), wr.Disposable.create(() => this.socket.removeEventListener("end", e));
    }
    write(e, r2) {
      if (typeof e == "string") {
        if (r2 !== void 0 && r2 !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r2}`);
        this.socket.send(e);
      } else this.socket.send(e);
      return Promise.resolve();
    }
    end() {
      this.socket.close();
    }
  }, m(_c2, "WritableStreamWrapper"), _c2), OA = new TextEncoder(), Xy = Object.freeze({ messageBuffer: Object.freeze({ create: m((t) => new Fu(t), "create") }), applicationJson: Object.freeze({ encoder: Object.freeze({ name: "application/json", encode: m((t, e) => {
    if (e.charset !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);
    return Promise.resolve(OA.encode(JSON.stringify(t, void 0, 0)));
  }, "encode") }), decoder: Object.freeze({ name: "application/json", decode: m((t, e) => {
    if (!(t instanceof Uint8Array)) throw new Error("In a Browser environments only Uint8Arrays are supported.");
    return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)));
  }, "decode") }) }), stream: Object.freeze({ asReadableStream: m((t) => new pm2(t), "asReadableStream"), asWritableStream: m((t) => new mm(t), "asWritableStream") }), console, timer: Object.freeze({ setTimeout(t, e, ...r2) {
    let n2 = setTimeout(t, e, ...r2);
    return { dispose: m(() => clearTimeout(n2), "dispose") };
  }, setImmediate(t, ...e) {
    let r2 = setTimeout(t, 0, ...e);
    return { dispose: m(() => clearTimeout(r2), "dispose") };
  }, setInterval(t, e, ...r2) {
    let n2 = setInterval(t, e, ...r2);
    return { dispose: m(() => clearInterval(n2), "dispose") };
  } }) });
  function hm() {
    return Xy;
  }
  m(hm, "RIL");
  (function(t) {
    function e() {
      wr.RAL.install(Xy);
    }
    m(e, "install"), t.install = e;
  })(hm || (hm = {}));
  gm.default = hm;
});
var yi = o((Kt) => {
  "use strict";
  var _a135, _b;
  var LA = Kt && Kt.__createBinding || (Object.create ? function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2);
    var i = Object.getOwnPropertyDescriptor(e, r2);
    (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: true, get: m(function() {
      return e[r2];
    }, "get") }), Object.defineProperty(t, n2, i);
  } : function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2), t[n2] = e[r2];
  }), DA = Kt && Kt.__exportStar || function(t, e) {
    for (var r2 in t) r2 !== "default" && !Object.prototype.hasOwnProperty.call(e, r2) && LA(e, t, r2);
  };
  Object.defineProperty(Kt, "__esModule", { value: true });
  Kt.createMessageConnection = Kt.BrowserMessageWriter = Kt.BrowserMessageReader = void 0;
  var MA = Jy();
  MA.default.install();
  var ks = Mu();
  DA(Mu(), Kt);
  var ym2 = (_a135 = class extends ks.AbstractMessageReader {
    constructor(e) {
      super(), this._onData = new ks.Emitter(), this._messageListener = (r2) => {
        this._onData.fire(r2.data);
      }, e.addEventListener("error", (r2) => this.fireError(r2)), e.onmessage = this._messageListener;
    }
    listen(e) {
      return this._onData.event(e);
    }
  }, m(_a135, "BrowserMessageReader"), _a135);
  Kt.BrowserMessageReader = ym2;
  var Tm2 = (_b = class extends ks.AbstractMessageWriter {
    constructor(e) {
      super(), this.port = e, this.errorCount = 0, e.addEventListener("error", (r2) => this.fireError(r2));
    }
    write(e) {
      try {
        return this.port.postMessage(e), Promise.resolve();
      } catch (r2) {
        return this.handleError(r2, e), Promise.reject(r2);
      }
    }
    handleError(e, r2) {
      this.errorCount++, this.fireError(e, r2, this.errorCount);
    }
    end() {
    }
  }, m(_b, "BrowserMessageWriter"), _b);
  Kt.BrowserMessageWriter = Tm2;
  function FA(t, e, r2, n2) {
    return r2 === void 0 && (r2 = ks.NullLogger), ks.ConnectionStrategy.is(n2) && (n2 = { connectionStrategy: n2 }), (0, ks.createMessageConnection)(t, e, r2, n2);
  }
  m(FA, "createMessageConnection");
  Kt.createMessageConnection = FA;
});
var Rm = o((lL, Zy) => {
  "use strict";
  Zy.exports = yi();
});
var be = o((Dt) => {
  "use strict";
  var _a135, _b, _c2, _d2, _e;
  Object.defineProperty(Dt, "__esModule", { value: true });
  Dt.ProtocolNotificationType = Dt.ProtocolNotificationType0 = Dt.ProtocolRequestType = Dt.ProtocolRequestType0 = Dt.RegistrationType = Dt.MessageDirection = void 0;
  var Ns = yi(), Qy;
  (function(t) {
    t.clientToServer = "clientToServer", t.serverToClient = "serverToClient", t.both = "both";
  })(Qy || (Dt.MessageDirection = Qy = {}));
  var $m = (_a135 = class {
    constructor(e) {
      this.method = e;
    }
  }, m(_a135, "RegistrationType"), _a135);
  Dt.RegistrationType = $m;
  var xm = (_b = class extends Ns.RequestType0 {
    constructor(e) {
      super(e);
    }
  }, m(_b, "ProtocolRequestType0"), _b);
  Dt.ProtocolRequestType0 = xm;
  var vm = (_c2 = class extends Ns.RequestType {
    constructor(e) {
      super(e, Ns.ParameterStructures.byName);
    }
  }, m(_c2, "ProtocolRequestType"), _c2);
  Dt.ProtocolRequestType = vm;
  var Em = (_d2 = class extends Ns.NotificationType0 {
    constructor(e) {
      super(e);
    }
  }, m(_d2, "ProtocolNotificationType0"), _d2);
  Dt.ProtocolNotificationType0 = Em;
  var Am = (_e = class extends Ns.NotificationType {
    constructor(e) {
      super(e, Ns.ParameterStructures.byName);
    }
  }, m(_e, "ProtocolNotificationType"), _e);
  Dt.ProtocolNotificationType = Am;
});
var Gu = o((Ye) => {
  "use strict";
  Object.defineProperty(Ye, "__esModule", { value: true });
  Ye.objectLiteral = Ye.typedArray = Ye.stringArray = Ye.array = Ye.func = Ye.error = Ye.number = Ye.string = Ye.boolean = void 0;
  function GA(t) {
    return t === true || t === false;
  }
  m(GA, "boolean");
  Ye.boolean = GA;
  function eT(t) {
    return typeof t == "string" || t instanceof String;
  }
  m(eT, "string");
  Ye.string = eT;
  function UA(t) {
    return typeof t == "number" || t instanceof Number;
  }
  m(UA, "number");
  Ye.number = UA;
  function zA(t) {
    return t instanceof Error;
  }
  m(zA, "error");
  Ye.error = zA;
  function qA(t) {
    return typeof t == "function";
  }
  m(qA, "func");
  Ye.func = qA;
  function tT(t) {
    return Array.isArray(t);
  }
  m(tT, "array");
  Ye.array = tT;
  function jA(t) {
    return tT(t) && t.every((e) => eT(e));
  }
  m(jA, "stringArray");
  Ye.stringArray = jA;
  function BA(t, e) {
    return Array.isArray(t) && t.every(e);
  }
  m(BA, "typedArray");
  Ye.typedArray = BA;
  function WA(t) {
    return t !== null && typeof t == "object";
  }
  m(WA, "objectLiteral");
  Ye.objectLiteral = WA;
});
var iT = o((Uu) => {
  "use strict";
  Object.defineProperty(Uu, "__esModule", { value: true });
  Uu.ImplementationRequest = void 0;
  var rT = be(), nT;
  (function(t) {
    t.method = "textDocument/implementation", t.messageDirection = rT.MessageDirection.clientToServer, t.type = new rT.ProtocolRequestType(t.method);
  })(nT || (Uu.ImplementationRequest = nT = {}));
});
var oT = o((zu) => {
  "use strict";
  Object.defineProperty(zu, "__esModule", { value: true });
  zu.TypeDefinitionRequest = void 0;
  var sT = be(), aT;
  (function(t) {
    t.method = "textDocument/typeDefinition", t.messageDirection = sT.MessageDirection.clientToServer, t.type = new sT.ProtocolRequestType(t.method);
  })(aT || (zu.TypeDefinitionRequest = aT = {}));
});
var cT = o((ws) => {
  "use strict";
  Object.defineProperty(ws, "__esModule", { value: true });
  ws.DidChangeWorkspaceFoldersNotification = ws.WorkspaceFoldersRequest = void 0;
  var qu = be(), lT;
  (function(t) {
    t.method = "workspace/workspaceFolders", t.messageDirection = qu.MessageDirection.serverToClient, t.type = new qu.ProtocolRequestType0(t.method);
  })(lT || (ws.WorkspaceFoldersRequest = lT = {}));
  var uT;
  (function(t) {
    t.method = "workspace/didChangeWorkspaceFolders", t.messageDirection = qu.MessageDirection.clientToServer, t.type = new qu.ProtocolNotificationType(t.method);
  })(uT || (ws.DidChangeWorkspaceFoldersNotification = uT = {}));
});
var pT = o((ju) => {
  "use strict";
  Object.defineProperty(ju, "__esModule", { value: true });
  ju.ConfigurationRequest = void 0;
  var fT = be(), dT;
  (function(t) {
    t.method = "workspace/configuration", t.messageDirection = fT.MessageDirection.serverToClient, t.type = new fT.ProtocolRequestType(t.method);
  })(dT || (ju.ConfigurationRequest = dT = {}));
});
var gT = o((Is) => {
  "use strict";
  Object.defineProperty(Is, "__esModule", { value: true });
  Is.ColorPresentationRequest = Is.DocumentColorRequest = void 0;
  var Bu = be(), mT;
  (function(t) {
    t.method = "textDocument/documentColor", t.messageDirection = Bu.MessageDirection.clientToServer, t.type = new Bu.ProtocolRequestType(t.method);
  })(mT || (Is.DocumentColorRequest = mT = {}));
  var hT;
  (function(t) {
    t.method = "textDocument/colorPresentation", t.messageDirection = Bu.MessageDirection.clientToServer, t.type = new Bu.ProtocolRequestType(t.method);
  })(hT || (Is.ColorPresentationRequest = hT = {}));
});
var RT = o((bs) => {
  "use strict";
  Object.defineProperty(bs, "__esModule", { value: true });
  bs.FoldingRangeRefreshRequest = bs.FoldingRangeRequest = void 0;
  var Wu = be(), yT;
  (function(t) {
    t.method = "textDocument/foldingRange", t.messageDirection = Wu.MessageDirection.clientToServer, t.type = new Wu.ProtocolRequestType(t.method);
  })(yT || (bs.FoldingRangeRequest = yT = {}));
  var TT;
  (function(t) {
    t.method = "workspace/foldingRange/refresh", t.messageDirection = Wu.MessageDirection.serverToClient, t.type = new Wu.ProtocolRequestType0(t.method);
  })(TT || (bs.FoldingRangeRefreshRequest = TT = {}));
});
var vT = o((Ku) => {
  "use strict";
  Object.defineProperty(Ku, "__esModule", { value: true });
  Ku.DeclarationRequest = void 0;
  var $T = be(), xT;
  (function(t) {
    t.method = "textDocument/declaration", t.messageDirection = $T.MessageDirection.clientToServer, t.type = new $T.ProtocolRequestType(t.method);
  })(xT || (Ku.DeclarationRequest = xT = {}));
});
var CT = o((Vu) => {
  "use strict";
  Object.defineProperty(Vu, "__esModule", { value: true });
  Vu.SelectionRangeRequest = void 0;
  var ET = be(), AT;
  (function(t) {
    t.method = "textDocument/selectionRange", t.messageDirection = ET.MessageDirection.clientToServer, t.type = new ET.ProtocolRequestType(t.method);
  })(AT || (Vu.SelectionRangeRequest = AT = {}));
});
var wT = o((Sn) => {
  "use strict";
  Object.defineProperty(Sn, "__esModule", { value: true });
  Sn.WorkDoneProgressCancelNotification = Sn.WorkDoneProgressCreateRequest = Sn.WorkDoneProgress = void 0;
  var KA = yi(), Hu = be(), ST;
  (function(t) {
    t.type = new KA.ProgressType();
    function e(r2) {
      return r2 === t.type;
    }
    m(e, "is"), t.is = e;
  })(ST || (Sn.WorkDoneProgress = ST = {}));
  var kT;
  (function(t) {
    t.method = "window/workDoneProgress/create", t.messageDirection = Hu.MessageDirection.serverToClient, t.type = new Hu.ProtocolRequestType(t.method);
  })(kT || (Sn.WorkDoneProgressCreateRequest = kT = {}));
  var NT;
  (function(t) {
    t.method = "window/workDoneProgress/cancel", t.messageDirection = Hu.MessageDirection.clientToServer, t.type = new Hu.ProtocolNotificationType(t.method);
  })(NT || (Sn.WorkDoneProgressCancelNotification = NT = {}));
});
var PT = o((kn) => {
  "use strict";
  Object.defineProperty(kn, "__esModule", { value: true });
  kn.CallHierarchyOutgoingCallsRequest = kn.CallHierarchyIncomingCallsRequest = kn.CallHierarchyPrepareRequest = void 0;
  var _s = be(), IT;
  (function(t) {
    t.method = "textDocument/prepareCallHierarchy", t.messageDirection = _s.MessageDirection.clientToServer, t.type = new _s.ProtocolRequestType(t.method);
  })(IT || (kn.CallHierarchyPrepareRequest = IT = {}));
  var bT;
  (function(t) {
    t.method = "callHierarchy/incomingCalls", t.messageDirection = _s.MessageDirection.clientToServer, t.type = new _s.ProtocolRequestType(t.method);
  })(bT || (kn.CallHierarchyIncomingCallsRequest = bT = {}));
  var _T;
  (function(t) {
    t.method = "callHierarchy/outgoingCalls", t.messageDirection = _s.MessageDirection.clientToServer, t.type = new _s.ProtocolRequestType(t.method);
  })(_T || (kn.CallHierarchyOutgoingCallsRequest = _T = {}));
});
var GT = o((Mt) => {
  "use strict";
  Object.defineProperty(Mt, "__esModule", { value: true });
  Mt.SemanticTokensRefreshRequest = Mt.SemanticTokensRangeRequest = Mt.SemanticTokensDeltaRequest = Mt.SemanticTokensRequest = Mt.SemanticTokensRegistrationType = Mt.TokenFormat = void 0;
  var Qr2 = be(), OT;
  (function(t) {
    t.Relative = "relative";
  })(OT || (Mt.TokenFormat = OT = {}));
  var Eo;
  (function(t) {
    t.method = "textDocument/semanticTokens", t.type = new Qr2.RegistrationType(t.method);
  })(Eo || (Mt.SemanticTokensRegistrationType = Eo = {}));
  var LT;
  (function(t) {
    t.method = "textDocument/semanticTokens/full", t.messageDirection = Qr2.MessageDirection.clientToServer, t.type = new Qr2.ProtocolRequestType(t.method), t.registrationMethod = Eo.method;
  })(LT || (Mt.SemanticTokensRequest = LT = {}));
  var DT;
  (function(t) {
    t.method = "textDocument/semanticTokens/full/delta", t.messageDirection = Qr2.MessageDirection.clientToServer, t.type = new Qr2.ProtocolRequestType(t.method), t.registrationMethod = Eo.method;
  })(DT || (Mt.SemanticTokensDeltaRequest = DT = {}));
  var MT;
  (function(t) {
    t.method = "textDocument/semanticTokens/range", t.messageDirection = Qr2.MessageDirection.clientToServer, t.type = new Qr2.ProtocolRequestType(t.method), t.registrationMethod = Eo.method;
  })(MT || (Mt.SemanticTokensRangeRequest = MT = {}));
  var FT;
  (function(t) {
    t.method = "workspace/semanticTokens/refresh", t.messageDirection = Qr2.MessageDirection.serverToClient, t.type = new Qr2.ProtocolRequestType0(t.method);
  })(FT || (Mt.SemanticTokensRefreshRequest = FT = {}));
});
var qT = o((Yu) => {
  "use strict";
  Object.defineProperty(Yu, "__esModule", { value: true });
  Yu.ShowDocumentRequest = void 0;
  var UT = be(), zT;
  (function(t) {
    t.method = "window/showDocument", t.messageDirection = UT.MessageDirection.serverToClient, t.type = new UT.ProtocolRequestType(t.method);
  })(zT || (Yu.ShowDocumentRequest = zT = {}));
});
var WT = o((Xu) => {
  "use strict";
  Object.defineProperty(Xu, "__esModule", { value: true });
  Xu.LinkedEditingRangeRequest = void 0;
  var jT = be(), BT;
  (function(t) {
    t.method = "textDocument/linkedEditingRange", t.messageDirection = jT.MessageDirection.clientToServer, t.type = new jT.ProtocolRequestType(t.method);
  })(BT || (Xu.LinkedEditingRangeRequest = BT = {}));
});
var QT = o(($t) => {
  "use strict";
  Object.defineProperty($t, "__esModule", { value: true });
  $t.WillDeleteFilesRequest = $t.DidDeleteFilesNotification = $t.DidRenameFilesNotification = $t.WillRenameFilesRequest = $t.DidCreateFilesNotification = $t.WillCreateFilesRequest = $t.FileOperationPatternKind = void 0;
  var Jt = be(), KT;
  (function(t) {
    t.file = "file", t.folder = "folder";
  })(KT || ($t.FileOperationPatternKind = KT = {}));
  var VT;
  (function(t) {
    t.method = "workspace/willCreateFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolRequestType(t.method);
  })(VT || ($t.WillCreateFilesRequest = VT = {}));
  var HT;
  (function(t) {
    t.method = "workspace/didCreateFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolNotificationType(t.method);
  })(HT || ($t.DidCreateFilesNotification = HT = {}));
  var YT;
  (function(t) {
    t.method = "workspace/willRenameFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolRequestType(t.method);
  })(YT || ($t.WillRenameFilesRequest = YT = {}));
  var XT;
  (function(t) {
    t.method = "workspace/didRenameFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolNotificationType(t.method);
  })(XT || ($t.DidRenameFilesNotification = XT = {}));
  var JT;
  (function(t) {
    t.method = "workspace/didDeleteFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolNotificationType(t.method);
  })(JT || ($t.DidDeleteFilesNotification = JT = {}));
  var ZT;
  (function(t) {
    t.method = "workspace/willDeleteFiles", t.messageDirection = Jt.MessageDirection.clientToServer, t.type = new Jt.ProtocolRequestType(t.method);
  })(ZT || ($t.WillDeleteFilesRequest = ZT = {}));
});
var iR = o((Nn) => {
  "use strict";
  Object.defineProperty(Nn, "__esModule", { value: true });
  Nn.MonikerRequest = Nn.MonikerKind = Nn.UniquenessLevel = void 0;
  var eR = be(), tR;
  (function(t) {
    t.document = "document", t.project = "project", t.group = "group", t.scheme = "scheme", t.global = "global";
  })(tR || (Nn.UniquenessLevel = tR = {}));
  var rR;
  (function(t) {
    t.$import = "import", t.$export = "export", t.local = "local";
  })(rR || (Nn.MonikerKind = rR = {}));
  var nR;
  (function(t) {
    t.method = "textDocument/moniker", t.messageDirection = eR.MessageDirection.clientToServer, t.type = new eR.ProtocolRequestType(t.method);
  })(nR || (Nn.MonikerRequest = nR = {}));
});
var lR = o((wn) => {
  "use strict";
  Object.defineProperty(wn, "__esModule", { value: true });
  wn.TypeHierarchySubtypesRequest = wn.TypeHierarchySupertypesRequest = wn.TypeHierarchyPrepareRequest = void 0;
  var Ps = be(), sR;
  (function(t) {
    t.method = "textDocument/prepareTypeHierarchy", t.messageDirection = Ps.MessageDirection.clientToServer, t.type = new Ps.ProtocolRequestType(t.method);
  })(sR || (wn.TypeHierarchyPrepareRequest = sR = {}));
  var aR;
  (function(t) {
    t.method = "typeHierarchy/supertypes", t.messageDirection = Ps.MessageDirection.clientToServer, t.type = new Ps.ProtocolRequestType(t.method);
  })(aR || (wn.TypeHierarchySupertypesRequest = aR = {}));
  var oR;
  (function(t) {
    t.method = "typeHierarchy/subtypes", t.messageDirection = Ps.MessageDirection.clientToServer, t.type = new Ps.ProtocolRequestType(t.method);
  })(oR || (wn.TypeHierarchySubtypesRequest = oR = {}));
});
var fR = o((Os) => {
  "use strict";
  Object.defineProperty(Os, "__esModule", { value: true });
  Os.InlineValueRefreshRequest = Os.InlineValueRequest = void 0;
  var Ju = be(), uR;
  (function(t) {
    t.method = "textDocument/inlineValue", t.messageDirection = Ju.MessageDirection.clientToServer, t.type = new Ju.ProtocolRequestType(t.method);
  })(uR || (Os.InlineValueRequest = uR = {}));
  var cR;
  (function(t) {
    t.method = "workspace/inlineValue/refresh", t.messageDirection = Ju.MessageDirection.serverToClient, t.type = new Ju.ProtocolRequestType0(t.method);
  })(cR || (Os.InlineValueRefreshRequest = cR = {}));
});
var hR = o((In) => {
  "use strict";
  Object.defineProperty(In, "__esModule", { value: true });
  In.InlayHintRefreshRequest = In.InlayHintResolveRequest = In.InlayHintRequest = void 0;
  var Ls = be(), dR;
  (function(t) {
    t.method = "textDocument/inlayHint", t.messageDirection = Ls.MessageDirection.clientToServer, t.type = new Ls.ProtocolRequestType(t.method);
  })(dR || (In.InlayHintRequest = dR = {}));
  var pR;
  (function(t) {
    t.method = "inlayHint/resolve", t.messageDirection = Ls.MessageDirection.clientToServer, t.type = new Ls.ProtocolRequestType(t.method);
  })(pR || (In.InlayHintResolveRequest = pR = {}));
  var mR;
  (function(t) {
    t.method = "workspace/inlayHint/refresh", t.messageDirection = Ls.MessageDirection.serverToClient, t.type = new Ls.ProtocolRequestType0(t.method);
  })(mR || (In.InlayHintRefreshRequest = mR = {}));
});
var vR = o((Zt) => {
  "use strict";
  Object.defineProperty(Zt, "__esModule", { value: true });
  Zt.DiagnosticRefreshRequest = Zt.WorkspaceDiagnosticRequest = Zt.DocumentDiagnosticRequest = Zt.DocumentDiagnosticReportKind = Zt.DiagnosticServerCancellationData = void 0;
  var xR = yi(), VA = Gu(), Ds = be(), gR;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && VA.boolean(n2.retriggerRequest);
    }
    m(e, "is"), t.is = e;
  })(gR || (Zt.DiagnosticServerCancellationData = gR = {}));
  var yR;
  (function(t) {
    t.Full = "full", t.Unchanged = "unchanged";
  })(yR || (Zt.DocumentDiagnosticReportKind = yR = {}));
  var TR;
  (function(t) {
    t.method = "textDocument/diagnostic", t.messageDirection = Ds.MessageDirection.clientToServer, t.type = new Ds.ProtocolRequestType(t.method), t.partialResult = new xR.ProgressType();
  })(TR || (Zt.DocumentDiagnosticRequest = TR = {}));
  var RR;
  (function(t) {
    t.method = "workspace/diagnostic", t.messageDirection = Ds.MessageDirection.clientToServer, t.type = new Ds.ProtocolRequestType(t.method), t.partialResult = new xR.ProgressType();
  })(RR || (Zt.WorkspaceDiagnosticRequest = RR = {}));
  var $R;
  (function(t) {
    t.method = "workspace/diagnostic/refresh", t.messageDirection = Ds.MessageDirection.serverToClient, t.type = new Ds.ProtocolRequestType0(t.method);
  })($R || (Zt.DiagnosticRefreshRequest = $R = {}));
});
var wR = o((ze) => {
  "use strict";
  Object.defineProperty(ze, "__esModule", { value: true });
  ze.DidCloseNotebookDocumentNotification = ze.DidSaveNotebookDocumentNotification = ze.DidChangeNotebookDocumentNotification = ze.NotebookCellArrayChange = ze.DidOpenNotebookDocumentNotification = ze.NotebookDocumentSyncRegistrationType = ze.NotebookDocument = ze.NotebookCell = ze.ExecutionSummary = ze.NotebookCellKind = void 0;
  var Ao = (ds(), s(fu)), pr2 = Gu(), Ir = be(), Cm;
  (function(t) {
    t.Markup = 1, t.Code = 2;
    function e(r2) {
      return r2 === 1 || r2 === 2;
    }
    m(e, "is"), t.is = e;
  })(Cm || (ze.NotebookCellKind = Cm = {}));
  var Sm;
  (function(t) {
    function e(i, a) {
      let o2 = { executionOrder: i };
      return (a === true || a === false) && (o2.success = a), o2;
    }
    m(e, "create"), t.create = e;
    function r2(i) {
      let a = i;
      return pr2.objectLiteral(a) && Ao.uinteger.is(a.executionOrder) && (a.success === void 0 || pr2.boolean(a.success));
    }
    m(r2, "is"), t.is = r2;
    function n2(i, a) {
      return i === a ? true : i == null || a === null || a === void 0 ? false : i.executionOrder === a.executionOrder && i.success === a.success;
    }
    m(n2, "equals"), t.equals = n2;
  })(Sm || (ze.ExecutionSummary = Sm = {}));
  var Zu;
  (function(t) {
    function e(a, o2) {
      return { kind: a, document: o2 };
    }
    m(e, "create"), t.create = e;
    function r2(a) {
      let o2 = a;
      return pr2.objectLiteral(o2) && Cm.is(o2.kind) && Ao.DocumentUri.is(o2.document) && (o2.metadata === void 0 || pr2.objectLiteral(o2.metadata));
    }
    m(r2, "is"), t.is = r2;
    function n2(a, o2) {
      let l = /* @__PURE__ */ new Set();
      return a.document !== o2.document && l.add("document"), a.kind !== o2.kind && l.add("kind"), a.executionSummary !== o2.executionSummary && l.add("executionSummary"), (a.metadata !== void 0 || o2.metadata !== void 0) && !i(a.metadata, o2.metadata) && l.add("metadata"), (a.executionSummary !== void 0 || o2.executionSummary !== void 0) && !Sm.equals(a.executionSummary, o2.executionSummary) && l.add("executionSummary"), l;
    }
    m(n2, "diff"), t.diff = n2;
    function i(a, o2) {
      if (a === o2) return true;
      if (a == null || o2 === null || o2 === void 0 || typeof a != typeof o2 || typeof a != "object") return false;
      let l = Array.isArray(a), u = Array.isArray(o2);
      if (l !== u) return false;
      if (l && u) {
        if (a.length !== o2.length) return false;
        for (let c = 0; c < a.length; c++) if (!i(a[c], o2[c])) return false;
      }
      if (pr2.objectLiteral(a) && pr2.objectLiteral(o2)) {
        let c = Object.keys(a), d = Object.keys(o2);
        if (c.length !== d.length || (c.sort(), d.sort(), !i(c, d))) return false;
        for (let m3 = 0; m3 < c.length; m3++) {
          let h2 = c[m3];
          if (!i(a[h2], o2[h2])) return false;
        }
      }
      return true;
    }
    m(i, "equalsMetadata");
  })(Zu || (ze.NotebookCell = Zu = {}));
  var ER;
  (function(t) {
    function e(n2, i, a, o2) {
      return { uri: n2, notebookType: i, version: a, cells: o2 };
    }
    m(e, "create"), t.create = e;
    function r2(n2) {
      let i = n2;
      return pr2.objectLiteral(i) && pr2.string(i.uri) && Ao.integer.is(i.version) && pr2.typedArray(i.cells, Zu.is);
    }
    m(r2, "is"), t.is = r2;
  })(ER || (ze.NotebookDocument = ER = {}));
  var Ms;
  (function(t) {
    t.method = "notebookDocument/sync", t.messageDirection = Ir.MessageDirection.clientToServer, t.type = new Ir.RegistrationType(t.method);
  })(Ms || (ze.NotebookDocumentSyncRegistrationType = Ms = {}));
  var AR;
  (function(t) {
    t.method = "notebookDocument/didOpen", t.messageDirection = Ir.MessageDirection.clientToServer, t.type = new Ir.ProtocolNotificationType(t.method), t.registrationMethod = Ms.method;
  })(AR || (ze.DidOpenNotebookDocumentNotification = AR = {}));
  var CR;
  (function(t) {
    function e(n2) {
      let i = n2;
      return pr2.objectLiteral(i) && Ao.uinteger.is(i.start) && Ao.uinteger.is(i.deleteCount) && (i.cells === void 0 || pr2.typedArray(i.cells, Zu.is));
    }
    m(e, "is"), t.is = e;
    function r2(n2, i, a) {
      let o2 = { start: n2, deleteCount: i };
      return a !== void 0 && (o2.cells = a), o2;
    }
    m(r2, "create"), t.create = r2;
  })(CR || (ze.NotebookCellArrayChange = CR = {}));
  var SR;
  (function(t) {
    t.method = "notebookDocument/didChange", t.messageDirection = Ir.MessageDirection.clientToServer, t.type = new Ir.ProtocolNotificationType(t.method), t.registrationMethod = Ms.method;
  })(SR || (ze.DidChangeNotebookDocumentNotification = SR = {}));
  var kR;
  (function(t) {
    t.method = "notebookDocument/didSave", t.messageDirection = Ir.MessageDirection.clientToServer, t.type = new Ir.ProtocolNotificationType(t.method), t.registrationMethod = Ms.method;
  })(kR || (ze.DidSaveNotebookDocumentNotification = kR = {}));
  var NR;
  (function(t) {
    t.method = "notebookDocument/didClose", t.messageDirection = Ir.MessageDirection.clientToServer, t.type = new Ir.ProtocolNotificationType(t.method), t.registrationMethod = Ms.method;
  })(NR || (ze.DidCloseNotebookDocumentNotification = NR = {}));
});
var _R = o((Qu) => {
  "use strict";
  Object.defineProperty(Qu, "__esModule", { value: true });
  Qu.InlineCompletionRequest = void 0;
  var IR = be(), bR;
  (function(t) {
    t.method = "textDocument/inlineCompletion", t.messageDirection = IR.MessageDirection.clientToServer, t.type = new IR.ProtocolRequestType(t.method);
  })(bR || (Qu.InlineCompletionRequest = bR = {}));
});
var W$ = o((f) => {
  "use strict";
  Object.defineProperty(f, "__esModule", { value: true });
  f.WorkspaceSymbolRequest = f.CodeActionResolveRequest = f.CodeActionRequest = f.DocumentSymbolRequest = f.DocumentHighlightRequest = f.ReferencesRequest = f.DefinitionRequest = f.SignatureHelpRequest = f.SignatureHelpTriggerKind = f.HoverRequest = f.CompletionResolveRequest = f.CompletionRequest = f.CompletionTriggerKind = f.PublishDiagnosticsNotification = f.WatchKind = f.RelativePattern = f.FileChangeType = f.DidChangeWatchedFilesNotification = f.WillSaveTextDocumentWaitUntilRequest = f.WillSaveTextDocumentNotification = f.TextDocumentSaveReason = f.DidSaveTextDocumentNotification = f.DidCloseTextDocumentNotification = f.DidChangeTextDocumentNotification = f.TextDocumentContentChangeEvent = f.DidOpenTextDocumentNotification = f.TextDocumentSyncKind = f.TelemetryEventNotification = f.LogMessageNotification = f.ShowMessageRequest = f.ShowMessageNotification = f.MessageType = f.DidChangeConfigurationNotification = f.ExitNotification = f.ShutdownRequest = f.InitializedNotification = f.InitializeErrorCodes = f.InitializeRequest = f.WorkDoneProgressOptions = f.TextDocumentRegistrationOptions = f.StaticRegistrationOptions = f.PositionEncodingKind = f.FailureHandlingKind = f.ResourceOperationKind = f.UnregistrationRequest = f.RegistrationRequest = f.DocumentSelector = f.NotebookCellTextDocumentFilter = f.NotebookDocumentFilter = f.TextDocumentFilter = void 0;
  f.MonikerRequest = f.MonikerKind = f.UniquenessLevel = f.WillDeleteFilesRequest = f.DidDeleteFilesNotification = f.WillRenameFilesRequest = f.DidRenameFilesNotification = f.WillCreateFilesRequest = f.DidCreateFilesNotification = f.FileOperationPatternKind = f.LinkedEditingRangeRequest = f.ShowDocumentRequest = f.SemanticTokensRegistrationType = f.SemanticTokensRefreshRequest = f.SemanticTokensRangeRequest = f.SemanticTokensDeltaRequest = f.SemanticTokensRequest = f.TokenFormat = f.CallHierarchyPrepareRequest = f.CallHierarchyOutgoingCallsRequest = f.CallHierarchyIncomingCallsRequest = f.WorkDoneProgressCancelNotification = f.WorkDoneProgressCreateRequest = f.WorkDoneProgress = f.SelectionRangeRequest = f.DeclarationRequest = f.FoldingRangeRefreshRequest = f.FoldingRangeRequest = f.ColorPresentationRequest = f.DocumentColorRequest = f.ConfigurationRequest = f.DidChangeWorkspaceFoldersNotification = f.WorkspaceFoldersRequest = f.TypeDefinitionRequest = f.ImplementationRequest = f.ApplyWorkspaceEditRequest = f.ExecuteCommandRequest = f.PrepareRenameRequest = f.RenameRequest = f.PrepareSupportDefaultBehavior = f.DocumentOnTypeFormattingRequest = f.DocumentRangesFormattingRequest = f.DocumentRangeFormattingRequest = f.DocumentFormattingRequest = f.DocumentLinkResolveRequest = f.DocumentLinkRequest = f.CodeLensRefreshRequest = f.CodeLensResolveRequest = f.CodeLensRequest = f.WorkspaceSymbolResolveRequest = void 0;
  f.InlineCompletionRequest = f.DidCloseNotebookDocumentNotification = f.DidSaveNotebookDocumentNotification = f.DidChangeNotebookDocumentNotification = f.NotebookCellArrayChange = f.DidOpenNotebookDocumentNotification = f.NotebookDocumentSyncRegistrationType = f.NotebookDocument = f.NotebookCell = f.ExecutionSummary = f.NotebookCellKind = f.DiagnosticRefreshRequest = f.WorkspaceDiagnosticRequest = f.DocumentDiagnosticRequest = f.DocumentDiagnosticReportKind = f.DiagnosticServerCancellationData = f.InlayHintRefreshRequest = f.InlayHintResolveRequest = f.InlayHintRequest = f.InlineValueRefreshRequest = f.InlineValueRequest = f.TypeHierarchySupertypesRequest = f.TypeHierarchySubtypesRequest = f.TypeHierarchyPrepareRequest = void 0;
  var S = be(), PR = (ds(), s(fu)), st = Gu(), HA = iT();
  Object.defineProperty(f, "ImplementationRequest", { enumerable: true, get: m(function() {
    return HA.ImplementationRequest;
  }, "get") });
  var YA = oT();
  Object.defineProperty(f, "TypeDefinitionRequest", { enumerable: true, get: m(function() {
    return YA.TypeDefinitionRequest;
  }, "get") });
  var z$ = cT();
  Object.defineProperty(f, "WorkspaceFoldersRequest", { enumerable: true, get: m(function() {
    return z$.WorkspaceFoldersRequest;
  }, "get") });
  Object.defineProperty(f, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: m(function() {
    return z$.DidChangeWorkspaceFoldersNotification;
  }, "get") });
  var XA = pT();
  Object.defineProperty(f, "ConfigurationRequest", { enumerable: true, get: m(function() {
    return XA.ConfigurationRequest;
  }, "get") });
  var q$ = gT();
  Object.defineProperty(f, "DocumentColorRequest", { enumerable: true, get: m(function() {
    return q$.DocumentColorRequest;
  }, "get") });
  Object.defineProperty(f, "ColorPresentationRequest", { enumerable: true, get: m(function() {
    return q$.ColorPresentationRequest;
  }, "get") });
  var j$ = RT();
  Object.defineProperty(f, "FoldingRangeRequest", { enumerable: true, get: m(function() {
    return j$.FoldingRangeRequest;
  }, "get") });
  Object.defineProperty(f, "FoldingRangeRefreshRequest", { enumerable: true, get: m(function() {
    return j$.FoldingRangeRefreshRequest;
  }, "get") });
  var JA = vT();
  Object.defineProperty(f, "DeclarationRequest", { enumerable: true, get: m(function() {
    return JA.DeclarationRequest;
  }, "get") });
  var ZA = CT();
  Object.defineProperty(f, "SelectionRangeRequest", { enumerable: true, get: m(function() {
    return ZA.SelectionRangeRequest;
  }, "get") });
  var bm = wT();
  Object.defineProperty(f, "WorkDoneProgress", { enumerable: true, get: m(function() {
    return bm.WorkDoneProgress;
  }, "get") });
  Object.defineProperty(f, "WorkDoneProgressCreateRequest", { enumerable: true, get: m(function() {
    return bm.WorkDoneProgressCreateRequest;
  }, "get") });
  Object.defineProperty(f, "WorkDoneProgressCancelNotification", { enumerable: true, get: m(function() {
    return bm.WorkDoneProgressCancelNotification;
  }, "get") });
  var _m = PT();
  Object.defineProperty(f, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: m(function() {
    return _m.CallHierarchyIncomingCallsRequest;
  }, "get") });
  Object.defineProperty(f, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: m(function() {
    return _m.CallHierarchyOutgoingCallsRequest;
  }, "get") });
  Object.defineProperty(f, "CallHierarchyPrepareRequest", { enumerable: true, get: m(function() {
    return _m.CallHierarchyPrepareRequest;
  }, "get") });
  var Fs = GT();
  Object.defineProperty(f, "TokenFormat", { enumerable: true, get: m(function() {
    return Fs.TokenFormat;
  }, "get") });
  Object.defineProperty(f, "SemanticTokensRequest", { enumerable: true, get: m(function() {
    return Fs.SemanticTokensRequest;
  }, "get") });
  Object.defineProperty(f, "SemanticTokensDeltaRequest", { enumerable: true, get: m(function() {
    return Fs.SemanticTokensDeltaRequest;
  }, "get") });
  Object.defineProperty(f, "SemanticTokensRangeRequest", { enumerable: true, get: m(function() {
    return Fs.SemanticTokensRangeRequest;
  }, "get") });
  Object.defineProperty(f, "SemanticTokensRefreshRequest", { enumerable: true, get: m(function() {
    return Fs.SemanticTokensRefreshRequest;
  }, "get") });
  Object.defineProperty(f, "SemanticTokensRegistrationType", { enumerable: true, get: m(function() {
    return Fs.SemanticTokensRegistrationType;
  }, "get") });
  var QA = qT();
  Object.defineProperty(f, "ShowDocumentRequest", { enumerable: true, get: m(function() {
    return QA.ShowDocumentRequest;
  }, "get") });
  var eC = WT();
  Object.defineProperty(f, "LinkedEditingRangeRequest", { enumerable: true, get: m(function() {
    return eC.LinkedEditingRangeRequest;
  }, "get") });
  var Ti = QT();
  Object.defineProperty(f, "FileOperationPatternKind", { enumerable: true, get: m(function() {
    return Ti.FileOperationPatternKind;
  }, "get") });
  Object.defineProperty(f, "DidCreateFilesNotification", { enumerable: true, get: m(function() {
    return Ti.DidCreateFilesNotification;
  }, "get") });
  Object.defineProperty(f, "WillCreateFilesRequest", { enumerable: true, get: m(function() {
    return Ti.WillCreateFilesRequest;
  }, "get") });
  Object.defineProperty(f, "DidRenameFilesNotification", { enumerable: true, get: m(function() {
    return Ti.DidRenameFilesNotification;
  }, "get") });
  Object.defineProperty(f, "WillRenameFilesRequest", { enumerable: true, get: m(function() {
    return Ti.WillRenameFilesRequest;
  }, "get") });
  Object.defineProperty(f, "DidDeleteFilesNotification", { enumerable: true, get: m(function() {
    return Ti.DidDeleteFilesNotification;
  }, "get") });
  Object.defineProperty(f, "WillDeleteFilesRequest", { enumerable: true, get: m(function() {
    return Ti.WillDeleteFilesRequest;
  }, "get") });
  var Pm = iR();
  Object.defineProperty(f, "UniquenessLevel", { enumerable: true, get: m(function() {
    return Pm.UniquenessLevel;
  }, "get") });
  Object.defineProperty(f, "MonikerKind", { enumerable: true, get: m(function() {
    return Pm.MonikerKind;
  }, "get") });
  Object.defineProperty(f, "MonikerRequest", { enumerable: true, get: m(function() {
    return Pm.MonikerRequest;
  }, "get") });
  var Om = lR();
  Object.defineProperty(f, "TypeHierarchyPrepareRequest", { enumerable: true, get: m(function() {
    return Om.TypeHierarchyPrepareRequest;
  }, "get") });
  Object.defineProperty(f, "TypeHierarchySubtypesRequest", { enumerable: true, get: m(function() {
    return Om.TypeHierarchySubtypesRequest;
  }, "get") });
  Object.defineProperty(f, "TypeHierarchySupertypesRequest", { enumerable: true, get: m(function() {
    return Om.TypeHierarchySupertypesRequest;
  }, "get") });
  var B$ = fR();
  Object.defineProperty(f, "InlineValueRequest", { enumerable: true, get: m(function() {
    return B$.InlineValueRequest;
  }, "get") });
  Object.defineProperty(f, "InlineValueRefreshRequest", { enumerable: true, get: m(function() {
    return B$.InlineValueRefreshRequest;
  }, "get") });
  var Lm = hR();
  Object.defineProperty(f, "InlayHintRequest", { enumerable: true, get: m(function() {
    return Lm.InlayHintRequest;
  }, "get") });
  Object.defineProperty(f, "InlayHintResolveRequest", { enumerable: true, get: m(function() {
    return Lm.InlayHintResolveRequest;
  }, "get") });
  Object.defineProperty(f, "InlayHintRefreshRequest", { enumerable: true, get: m(function() {
    return Lm.InlayHintRefreshRequest;
  }, "get") });
  var Co = vR();
  Object.defineProperty(f, "DiagnosticServerCancellationData", { enumerable: true, get: m(function() {
    return Co.DiagnosticServerCancellationData;
  }, "get") });
  Object.defineProperty(f, "DocumentDiagnosticReportKind", { enumerable: true, get: m(function() {
    return Co.DocumentDiagnosticReportKind;
  }, "get") });
  Object.defineProperty(f, "DocumentDiagnosticRequest", { enumerable: true, get: m(function() {
    return Co.DocumentDiagnosticRequest;
  }, "get") });
  Object.defineProperty(f, "WorkspaceDiagnosticRequest", { enumerable: true, get: m(function() {
    return Co.WorkspaceDiagnosticRequest;
  }, "get") });
  Object.defineProperty(f, "DiagnosticRefreshRequest", { enumerable: true, get: m(function() {
    return Co.DiagnosticRefreshRequest;
  }, "get") });
  var br = wR();
  Object.defineProperty(f, "NotebookCellKind", { enumerable: true, get: m(function() {
    return br.NotebookCellKind;
  }, "get") });
  Object.defineProperty(f, "ExecutionSummary", { enumerable: true, get: m(function() {
    return br.ExecutionSummary;
  }, "get") });
  Object.defineProperty(f, "NotebookCell", { enumerable: true, get: m(function() {
    return br.NotebookCell;
  }, "get") });
  Object.defineProperty(f, "NotebookDocument", { enumerable: true, get: m(function() {
    return br.NotebookDocument;
  }, "get") });
  Object.defineProperty(f, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: m(function() {
    return br.NotebookDocumentSyncRegistrationType;
  }, "get") });
  Object.defineProperty(f, "DidOpenNotebookDocumentNotification", { enumerable: true, get: m(function() {
    return br.DidOpenNotebookDocumentNotification;
  }, "get") });
  Object.defineProperty(f, "NotebookCellArrayChange", { enumerable: true, get: m(function() {
    return br.NotebookCellArrayChange;
  }, "get") });
  Object.defineProperty(f, "DidChangeNotebookDocumentNotification", { enumerable: true, get: m(function() {
    return br.DidChangeNotebookDocumentNotification;
  }, "get") });
  Object.defineProperty(f, "DidSaveNotebookDocumentNotification", { enumerable: true, get: m(function() {
    return br.DidSaveNotebookDocumentNotification;
  }, "get") });
  Object.defineProperty(f, "DidCloseNotebookDocumentNotification", { enumerable: true, get: m(function() {
    return br.DidCloseNotebookDocumentNotification;
  }, "get") });
  var tC = _R();
  Object.defineProperty(f, "InlineCompletionRequest", { enumerable: true, get: m(function() {
    return tC.InlineCompletionRequest;
  }, "get") });
  var km;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return st.string(n2) || st.string(n2.language) || st.string(n2.scheme) || st.string(n2.pattern);
    }
    m(e, "is"), t.is = e;
  })(km || (f.TextDocumentFilter = km = {}));
  var Nm;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return st.objectLiteral(n2) && (st.string(n2.notebookType) || st.string(n2.scheme) || st.string(n2.pattern));
    }
    m(e, "is"), t.is = e;
  })(Nm || (f.NotebookDocumentFilter = Nm = {}));
  var wm;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return st.objectLiteral(n2) && (st.string(n2.notebook) || Nm.is(n2.notebook)) && (n2.language === void 0 || st.string(n2.language));
    }
    m(e, "is"), t.is = e;
  })(wm || (f.NotebookCellTextDocumentFilter = wm = {}));
  var Im;
  (function(t) {
    function e(r2) {
      if (!Array.isArray(r2)) return false;
      for (let n2 of r2) if (!st.string(n2) && !km.is(n2) && !wm.is(n2)) return false;
      return true;
    }
    m(e, "is"), t.is = e;
  })(Im || (f.DocumentSelector = Im = {}));
  var OR;
  (function(t) {
    t.method = "client/registerCapability", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolRequestType(t.method);
  })(OR || (f.RegistrationRequest = OR = {}));
  var LR;
  (function(t) {
    t.method = "client/unregisterCapability", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolRequestType(t.method);
  })(LR || (f.UnregistrationRequest = LR = {}));
  var DR;
  (function(t) {
    t.Create = "create", t.Rename = "rename", t.Delete = "delete";
  })(DR || (f.ResourceOperationKind = DR = {}));
  var MR;
  (function(t) {
    t.Abort = "abort", t.Transactional = "transactional", t.TextOnlyTransactional = "textOnlyTransactional", t.Undo = "undo";
  })(MR || (f.FailureHandlingKind = MR = {}));
  var FR;
  (function(t) {
    t.UTF8 = "utf-8", t.UTF16 = "utf-16", t.UTF32 = "utf-32";
  })(FR || (f.PositionEncodingKind = FR = {}));
  var GR;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && st.string(n2.id) && n2.id.length > 0;
    }
    m(e, "hasId"), t.hasId = e;
  })(GR || (f.StaticRegistrationOptions = GR = {}));
  var UR;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return n2 && (n2.documentSelector === null || Im.is(n2.documentSelector));
    }
    m(e, "is"), t.is = e;
  })(UR || (f.TextDocumentRegistrationOptions = UR = {}));
  var zR;
  (function(t) {
    function e(n2) {
      let i = n2;
      return st.objectLiteral(i) && (i.workDoneProgress === void 0 || st.boolean(i.workDoneProgress));
    }
    m(e, "is"), t.is = e;
    function r2(n2) {
      let i = n2;
      return i && st.boolean(i.workDoneProgress);
    }
    m(r2, "hasWorkDoneProgress"), t.hasWorkDoneProgress = r2;
  })(zR || (f.WorkDoneProgressOptions = zR = {}));
  var qR;
  (function(t) {
    t.method = "initialize", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(qR || (f.InitializeRequest = qR = {}));
  var jR;
  (function(t) {
    t.unknownProtocolVersion = 1;
  })(jR || (f.InitializeErrorCodes = jR = {}));
  var BR;
  (function(t) {
    t.method = "initialized", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(BR || (f.InitializedNotification = BR = {}));
  var WR;
  (function(t) {
    t.method = "shutdown", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType0(t.method);
  })(WR || (f.ShutdownRequest = WR = {}));
  var KR;
  (function(t) {
    t.method = "exit", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType0(t.method);
  })(KR || (f.ExitNotification = KR = {}));
  var VR;
  (function(t) {
    t.method = "workspace/didChangeConfiguration", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(VR || (f.DidChangeConfigurationNotification = VR = {}));
  var HR;
  (function(t) {
    t.Error = 1, t.Warning = 2, t.Info = 3, t.Log = 4, t.Debug = 5;
  })(HR || (f.MessageType = HR = {}));
  var YR;
  (function(t) {
    t.method = "window/showMessage", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolNotificationType(t.method);
  })(YR || (f.ShowMessageNotification = YR = {}));
  var XR;
  (function(t) {
    t.method = "window/showMessageRequest", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolRequestType(t.method);
  })(XR || (f.ShowMessageRequest = XR = {}));
  var JR;
  (function(t) {
    t.method = "window/logMessage", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolNotificationType(t.method);
  })(JR || (f.LogMessageNotification = JR = {}));
  var ZR;
  (function(t) {
    t.method = "telemetry/event", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolNotificationType(t.method);
  })(ZR || (f.TelemetryEventNotification = ZR = {}));
  var QR;
  (function(t) {
    t.None = 0, t.Full = 1, t.Incremental = 2;
  })(QR || (f.TextDocumentSyncKind = QR = {}));
  var e$;
  (function(t) {
    t.method = "textDocument/didOpen", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(e$ || (f.DidOpenTextDocumentNotification = e$ = {}));
  var t$;
  (function(t) {
    function e(n2) {
      let i = n2;
      return i != null && typeof i.text == "string" && i.range !== void 0 && (i.rangeLength === void 0 || typeof i.rangeLength == "number");
    }
    m(e, "isIncremental"), t.isIncremental = e;
    function r2(n2) {
      let i = n2;
      return i != null && typeof i.text == "string" && i.range === void 0 && i.rangeLength === void 0;
    }
    m(r2, "isFull"), t.isFull = r2;
  })(t$ || (f.TextDocumentContentChangeEvent = t$ = {}));
  var r$;
  (function(t) {
    t.method = "textDocument/didChange", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(r$ || (f.DidChangeTextDocumentNotification = r$ = {}));
  var n$;
  (function(t) {
    t.method = "textDocument/didClose", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(n$ || (f.DidCloseTextDocumentNotification = n$ = {}));
  var i$;
  (function(t) {
    t.method = "textDocument/didSave", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(i$ || (f.DidSaveTextDocumentNotification = i$ = {}));
  var s$;
  (function(t) {
    t.Manual = 1, t.AfterDelay = 2, t.FocusOut = 3;
  })(s$ || (f.TextDocumentSaveReason = s$ = {}));
  var a$;
  (function(t) {
    t.method = "textDocument/willSave", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(a$ || (f.WillSaveTextDocumentNotification = a$ = {}));
  var o$;
  (function(t) {
    t.method = "textDocument/willSaveWaitUntil", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(o$ || (f.WillSaveTextDocumentWaitUntilRequest = o$ = {}));
  var l$;
  (function(t) {
    t.method = "workspace/didChangeWatchedFiles", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolNotificationType(t.method);
  })(l$ || (f.DidChangeWatchedFilesNotification = l$ = {}));
  var u$;
  (function(t) {
    t.Created = 1, t.Changed = 2, t.Deleted = 3;
  })(u$ || (f.FileChangeType = u$ = {}));
  var c$;
  (function(t) {
    function e(r2) {
      let n2 = r2;
      return st.objectLiteral(n2) && (PR.URI.is(n2.baseUri) || PR.WorkspaceFolder.is(n2.baseUri)) && st.string(n2.pattern);
    }
    m(e, "is"), t.is = e;
  })(c$ || (f.RelativePattern = c$ = {}));
  var f$;
  (function(t) {
    t.Create = 1, t.Change = 2, t.Delete = 4;
  })(f$ || (f.WatchKind = f$ = {}));
  var d$;
  (function(t) {
    t.method = "textDocument/publishDiagnostics", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolNotificationType(t.method);
  })(d$ || (f.PublishDiagnosticsNotification = d$ = {}));
  var p$;
  (function(t) {
    t.Invoked = 1, t.TriggerCharacter = 2, t.TriggerForIncompleteCompletions = 3;
  })(p$ || (f.CompletionTriggerKind = p$ = {}));
  var m$;
  (function(t) {
    t.method = "textDocument/completion", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(m$ || (f.CompletionRequest = m$ = {}));
  var h$;
  (function(t) {
    t.method = "completionItem/resolve", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(h$ || (f.CompletionResolveRequest = h$ = {}));
  var g$;
  (function(t) {
    t.method = "textDocument/hover", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(g$ || (f.HoverRequest = g$ = {}));
  var y$;
  (function(t) {
    t.Invoked = 1, t.TriggerCharacter = 2, t.ContentChange = 3;
  })(y$ || (f.SignatureHelpTriggerKind = y$ = {}));
  var T$;
  (function(t) {
    t.method = "textDocument/signatureHelp", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(T$ || (f.SignatureHelpRequest = T$ = {}));
  var R$;
  (function(t) {
    t.method = "textDocument/definition", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(R$ || (f.DefinitionRequest = R$ = {}));
  var $$;
  (function(t) {
    t.method = "textDocument/references", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })($$ || (f.ReferencesRequest = $$ = {}));
  var x$;
  (function(t) {
    t.method = "textDocument/documentHighlight", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(x$ || (f.DocumentHighlightRequest = x$ = {}));
  var v$;
  (function(t) {
    t.method = "textDocument/documentSymbol", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(v$ || (f.DocumentSymbolRequest = v$ = {}));
  var E$;
  (function(t) {
    t.method = "textDocument/codeAction", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(E$ || (f.CodeActionRequest = E$ = {}));
  var A$;
  (function(t) {
    t.method = "codeAction/resolve", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(A$ || (f.CodeActionResolveRequest = A$ = {}));
  var C$;
  (function(t) {
    t.method = "workspace/symbol", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(C$ || (f.WorkspaceSymbolRequest = C$ = {}));
  var S$;
  (function(t) {
    t.method = "workspaceSymbol/resolve", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(S$ || (f.WorkspaceSymbolResolveRequest = S$ = {}));
  var k$;
  (function(t) {
    t.method = "textDocument/codeLens", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(k$ || (f.CodeLensRequest = k$ = {}));
  var N$;
  (function(t) {
    t.method = "codeLens/resolve", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(N$ || (f.CodeLensResolveRequest = N$ = {}));
  var w$;
  (function(t) {
    t.method = "workspace/codeLens/refresh", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolRequestType0(t.method);
  })(w$ || (f.CodeLensRefreshRequest = w$ = {}));
  var I$;
  (function(t) {
    t.method = "textDocument/documentLink", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(I$ || (f.DocumentLinkRequest = I$ = {}));
  var b$;
  (function(t) {
    t.method = "documentLink/resolve", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(b$ || (f.DocumentLinkResolveRequest = b$ = {}));
  var _$;
  (function(t) {
    t.method = "textDocument/formatting", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(_$ || (f.DocumentFormattingRequest = _$ = {}));
  var P$;
  (function(t) {
    t.method = "textDocument/rangeFormatting", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(P$ || (f.DocumentRangeFormattingRequest = P$ = {}));
  var O$;
  (function(t) {
    t.method = "textDocument/rangesFormatting", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(O$ || (f.DocumentRangesFormattingRequest = O$ = {}));
  var L$;
  (function(t) {
    t.method = "textDocument/onTypeFormatting", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(L$ || (f.DocumentOnTypeFormattingRequest = L$ = {}));
  var D$;
  (function(t) {
    t.Identifier = 1;
  })(D$ || (f.PrepareSupportDefaultBehavior = D$ = {}));
  var M$;
  (function(t) {
    t.method = "textDocument/rename", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(M$ || (f.RenameRequest = M$ = {}));
  var F$;
  (function(t) {
    t.method = "textDocument/prepareRename", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(F$ || (f.PrepareRenameRequest = F$ = {}));
  var G$;
  (function(t) {
    t.method = "workspace/executeCommand", t.messageDirection = S.MessageDirection.clientToServer, t.type = new S.ProtocolRequestType(t.method);
  })(G$ || (f.ExecuteCommandRequest = G$ = {}));
  var U$;
  (function(t) {
    t.method = "workspace/applyEdit", t.messageDirection = S.MessageDirection.serverToClient, t.type = new S.ProtocolRequestType("workspace/applyEdit");
  })(U$ || (f.ApplyWorkspaceEditRequest = U$ = {}));
});
var V$ = o((ec) => {
  "use strict";
  Object.defineProperty(ec, "__esModule", { value: true });
  ec.createProtocolConnection = void 0;
  var K$ = yi();
  function rC(t, e, r2, n2) {
    return K$.ConnectionStrategy.is(n2) && (n2 = { connectionStrategy: n2 }), (0, K$.createMessageConnection)(t, e, r2, n2);
  }
  m(rC, "createProtocolConnection");
  ec.createProtocolConnection = rC;
});
var Y$ = o((Ft) => {
  "use strict";
  var nC = Ft && Ft.__createBinding || (Object.create ? function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2);
    var i = Object.getOwnPropertyDescriptor(e, r2);
    (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: true, get: m(function() {
      return e[r2];
    }, "get") }), Object.defineProperty(t, n2, i);
  } : function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2), t[n2] = e[r2];
  }), tc = Ft && Ft.__exportStar || function(t, e) {
    for (var r2 in t) r2 !== "default" && !Object.prototype.hasOwnProperty.call(e, r2) && nC(e, t, r2);
  };
  Object.defineProperty(Ft, "__esModule", { value: true });
  Ft.LSPErrorCodes = Ft.createProtocolConnection = void 0;
  tc(yi(), Ft);
  tc((ds(), s(fu)), Ft);
  tc(be(), Ft);
  tc(W$(), Ft);
  var iC = V$();
  Object.defineProperty(Ft, "createProtocolConnection", { enumerable: true, get: m(function() {
    return iC.createProtocolConnection;
  }, "get") });
  var H$;
  (function(t) {
    t.lspReservedErrorRangeStart = -32899, t.RequestFailed = -32803, t.ServerCancelled = -32802, t.ContentModified = -32801, t.RequestCancelled = -32800, t.lspReservedErrorRangeEnd = -32800;
  })(H$ || (Ft.LSPErrorCodes = H$ = {}));
});
var J$ = o((_r) => {
  "use strict";
  var sC = _r && _r.__createBinding || (Object.create ? function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2);
    var i = Object.getOwnPropertyDescriptor(e, r2);
    (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: true, get: m(function() {
      return e[r2];
    }, "get") }), Object.defineProperty(t, n2, i);
  } : function(t, e, r2, n2) {
    n2 === void 0 && (n2 = r2), t[n2] = e[r2];
  }), X$ = _r && _r.__exportStar || function(t, e) {
    for (var r2 in t) r2 !== "default" && !Object.prototype.hasOwnProperty.call(e, r2) && sC(e, t, r2);
  };
  Object.defineProperty(_r, "__esModule", { value: true });
  _r.createProtocolConnection = void 0;
  var aC = Rm();
  X$(Rm(), _r);
  X$(Y$(), _r);
  function oC(t, e, r2, n2) {
    return (0, aC.createMessageConnection)(t, e, r2, n2);
  }
  m(oC, "createProtocolConnection");
  _r.createProtocolConnection = oC;
});
var Ue = {};
p(Ue, { AbstractAstReflection: () => On, AbstractCstNode: () => Va, AbstractLangiumParser: () => Ha, AbstractParserErrorMessageProvider: () => pu, AbstractThreadedAsyncParser: () => jm, AstUtils: () => Ho, BiMap: () => pi, Cancellation: () => W, CompositeCstNodeImpl: () => li, ContextCache: () => mi, CstNodeBuilder: () => Ka, CstUtils: () => ml, DEFAULT_TOKENIZE_OPTIONS: () => rc, DONE_RESULT: () => ht, DatatypeSymbol: () => du, DefaultAstNodeDescriptionProvider: () => po, DefaultAstNodeLocator: () => ho, DefaultAsyncParser: () => Oo, DefaultCommentProvider: () => Po, DefaultConfigurationProvider: () => go, DefaultDocumentBuilder: () => So, DefaultDocumentValidator: () => fo, DefaultHydrator: () => Do, DefaultIndexManager: () => ko, DefaultJsonSerializer: () => lo, DefaultLangiumDocumentFactory: () => Qa, DefaultLangiumDocuments: () => eo, DefaultLangiumProfiler: () => Jm, DefaultLexer: () => Ri2, DefaultLexerErrorMessageProvider: () => wo, DefaultLinker: () => to, DefaultNameProvider: () => ro, DefaultReferenceDescriptionProvider: () => mo, DefaultReferences: () => no, DefaultScopeComputation: () => io, DefaultScopeProvider: () => oo, DefaultServiceRegistry: () => uo, DefaultTokenBuilder: () => Zr2, DefaultValueConverter: () => ci, DefaultWorkspaceLock: () => Lo, DefaultWorkspaceManager: () => No, Deferred: () => It, Disposable: () => bn, DisposableCache: () => vs, DocumentCache: () => vu, DocumentState: () => ee, DocumentValidator: () => Xt, EMPTY_SCOPE: () => xA, EMPTY_STREAM: () => on, EmptyFileSystem: () => Xm, EmptyFileSystemProvider: () => lc, ErrorWithLocation: () => Yn, GrammarAST: () => ca, GrammarUtils: () => $l, IndentationAwareLexer: () => Ym, IndentationAwareTokenBuilder: () => oc, JSDocDocumentationProvider: () => _o, LangiumCompletionParser: () => Xa, LangiumParser: () => Ya, LangiumParserErrorMessageProvider: () => ms, LeafCstNodeImpl: () => oi, LexingMode: () => $i, MapScope: () => hp, Module: () => Vm, MultiMap: () => Tt, MultiMapScope: () => so, OperationCancelled: () => Yt, ParserWorker: () => Bm, ProfilingTask: () => uc, Reduction: () => Ni, RefResolving: () => di, RegExpUtils: () => yl, RootCstNodeImpl: () => ps, SimpleCache: () => ao, StreamImpl: () => zt, StreamScope: () => xs, TextDocument: () => Ts, TreeStreamImpl: () => Rr, URI: () => tt, UriTrie: () => $s, UriUtils: () => je, VALIDATE_EACH_NODE: () => Sy, ValidationCategory: () => Eu, ValidationRegistry: () => co, ValueConverter: () => kr2, WorkspaceCache: () => Es, assertCondition: () => bh, assertUnreachable: () => vr, createCompletionParser: () => sp, createDefaultCoreModule: () => Wm, createDefaultSharedCoreModule: () => Km, createGrammarConfig: () => Rf, createLangiumParser: () => ap, createParser: () => Ja, delayNextTick: () => pp, diagnosticData: () => hi, eagerLoad: () => ox, getDiagnosticRange: () => ky, indentationBuilderDefaultOptions: () => Hm, inject: () => ac, interruptAndCheck: () => De2, isAstNode: () => Le, isAstNodeDescription: () => Nc, isAstNodeWithComment: () => gp, isCompositeCstNode: () => sr, isIMultiModeLexerDefinition: () => Mm, isJSDoc: () => zm, isLeafCstNode: () => an, isLinkingError: () => Ln, isMultiReference: () => Ut, isNamed: () => Ay, isOperationCancelled: () => Nr, isReference: () => Qe, isRootCstNode: () => Zs, isTokenTypeArray: () => nc, isTokenTypeDictionary: () => Dm, loadGrammarFromJson: () => Qt, parseJSDoc: () => Um, prepareLangiumParser: () => my, setInterruptionPeriod: () => Ry, startCancelableOperation: () => $u, stream: () => re, toDiagnosticData: () => Ny, toDiagnosticSeverity: () => Au });
var ml = {};
p(ml, { DefaultNameRegexp: () => pl, RangeComparison: () => xr, compareRange: () => kh, findCommentNode: () => Qc, findDeclarationNodeAtOffset: () => Yx, findLeafNodeAtOffset: () => ef, findLeafNodeBeforeOffset: () => Nh, flattenCst: () => Hx, getDatatypeNode: () => Vx, getInteriorNodes: () => Zx, getNextNode: () => Xx, getPreviousNode: () => Ih, getStartlineNode: () => Jx, inRange: () => _c, isChildNode: () => Zc, isCommentNode: () => Jc, streamCst: () => Vn, toDocumentSegment: () => Hn, tokenToRange: () => Gi });
function Le(t) {
  return typeof t == "object" && t !== null && typeof t.$type == "string";
}
m(Le, "isAstNode");
function Qe(t) {
  return typeof t == "object" && t !== null && typeof t.$refText == "string" && "ref" in t;
}
m(Qe, "isReference");
function Ut(t) {
  return typeof t == "object" && t !== null && typeof t.$refText == "string" && "items" in t;
}
m(Ut, "isMultiReference");
function Nc(t) {
  return typeof t == "object" && t !== null && typeof t.name == "string" && typeof t.type == "string" && typeof t.path == "string";
}
m(Nc, "isAstNodeDescription");
function Ln(t) {
  return typeof t == "object" && t !== null && typeof t.info == "object" && typeof t.message == "string";
}
m(Ln, "isLinkingError");
var _a;
var On = (_a = class {
  constructor() {
    this.subtypes = {}, this.allSubtypes = {};
  }
  getAllTypes() {
    return Object.keys(this.types);
  }
  getReferenceType(e) {
    var _a135;
    let r2 = this.types[e.container.$type];
    if (!r2) throw new Error(`Type ${e.container.$type || "undefined"} not found.`);
    let n2 = (_a135 = r2.properties[e.property]) == null ? void 0 : _a135.referenceType;
    if (!n2) throw new Error(`Property ${e.property || "undefined"} of type ${e.container.$type} is not a reference.`);
    return n2;
  }
  getTypeMetaData(e) {
    let r2 = this.types[e];
    return r2 || { name: e, properties: {}, superTypes: [] };
  }
  isInstance(e, r2) {
    return Le(e) && this.isSubtype(e.$type, r2);
  }
  isSubtype(e, r2) {
    if (e === r2) return true;
    let n2 = this.subtypes[e];
    n2 || (n2 = this.subtypes[e] = {});
    let i = n2[r2];
    if (i !== void 0) return i;
    {
      let a = this.types[e], o2 = a ? a.superTypes.some((l) => this.isSubtype(l, r2)) : false;
      return n2[r2] = o2, o2;
    }
  }
  getAllSubTypes(e) {
    let r2 = this.allSubtypes[e];
    if (r2) return r2;
    {
      let n2 = this.getAllTypes(), i = [];
      for (let a of n2) this.isSubtype(a, e) && i.push(a);
      return this.allSubtypes[e] = i, i;
    }
  }
}, m(_a, "AbstractAstReflection"), _a);
function sr(t) {
  return typeof t == "object" && t !== null && Array.isArray(t.content);
}
m(sr, "isCompositeCstNode");
function an(t) {
  return typeof t == "object" && t !== null && typeof t.tokenType == "object";
}
m(an, "isLeafCstNode");
function Zs(t) {
  return sr(t) && typeof t.fullText == "string";
}
m(Zs, "isRootCstNode");
var _a2;
var zt = (_a2 = class {
  constructor(e, r2) {
    this.startFn = e, this.nextFn = r2;
  }
  iterator() {
    let e = { state: this.startFn(), next: m(() => this.nextFn(e.state), "next"), [Symbol.iterator]: () => e };
    return e;
  }
  [Symbol.iterator]() {
    return this.iterator();
  }
  isEmpty() {
    return !!this.iterator().next().done;
  }
  count() {
    let e = this.iterator(), r2 = 0, n2 = e.next();
    for (; !n2.done; ) r2++, n2 = e.next();
    return r2;
  }
  toArray() {
    let e = [], r2 = this.iterator(), n2;
    do
      n2 = r2.next(), n2.value !== void 0 && e.push(n2.value);
    while (!n2.done);
    return e;
  }
  toSet() {
    return new Set(this);
  }
  toMap(e, r2) {
    let n2 = this.map((i) => [e ? e(i) : i, r2 ? r2(i) : i]);
    return new Map(n2);
  }
  toString() {
    return this.join();
  }
  concat(e) {
    return new _a2(() => ({ first: this.startFn(), firstDone: false, iterator: e[Symbol.iterator]() }), (r2) => {
      let n2;
      if (!r2.firstDone) {
        do
          if (n2 = this.nextFn(r2.first), !n2.done) return n2;
        while (!n2.done);
        r2.firstDone = true;
      }
      do
        if (n2 = r2.iterator.next(), !n2.done) return n2;
      while (!n2.done);
      return ht;
    });
  }
  join(e = ",") {
    let r2 = this.iterator(), n2 = "", i, a = false;
    do
      i = r2.next(), i.done || (a && (n2 += e), n2 += Nx(i.value)), a = true;
    while (!i.done);
    return n2;
  }
  indexOf(e, r2 = 0) {
    let n2 = this.iterator(), i = 0, a = n2.next();
    for (; !a.done; ) {
      if (i >= r2 && a.value === e) return i;
      a = n2.next(), i++;
    }
    return -1;
  }
  every(e) {
    let r2 = this.iterator(), n2 = r2.next();
    for (; !n2.done; ) {
      if (!e(n2.value)) return false;
      n2 = r2.next();
    }
    return true;
  }
  some(e) {
    let r2 = this.iterator(), n2 = r2.next();
    for (; !n2.done; ) {
      if (e(n2.value)) return true;
      n2 = r2.next();
    }
    return false;
  }
  forEach(e) {
    let r2 = this.iterator(), n2 = 0, i = r2.next();
    for (; !i.done; ) e(i.value, n2), i = r2.next(), n2++;
  }
  map(e) {
    return new _a2(this.startFn, (r2) => {
      let { done: n2, value: i } = this.nextFn(r2);
      return n2 ? ht : { done: false, value: e(i) };
    });
  }
  filter(e) {
    return new _a2(this.startFn, (r2) => {
      let n2;
      do
        if (n2 = this.nextFn(r2), !n2.done && e(n2.value)) return n2;
      while (!n2.done);
      return ht;
    });
  }
  nonNullable() {
    return this.filter((e) => e != null);
  }
  reduce(e, r2) {
    let n2 = this.iterator(), i = r2, a = n2.next();
    for (; !a.done; ) i === void 0 ? i = a.value : i = e(i, a.value), a = n2.next();
    return i;
  }
  reduceRight(e, r2) {
    return this.recursiveReduce(this.iterator(), e, r2);
  }
  recursiveReduce(e, r2, n2) {
    let i = e.next();
    if (i.done) return n2;
    let a = this.recursiveReduce(e, r2, n2);
    return a === void 0 ? i.value : r2(a, i.value);
  }
  find(e) {
    let r2 = this.iterator(), n2 = r2.next();
    for (; !n2.done; ) {
      if (e(n2.value)) return n2.value;
      n2 = r2.next();
    }
  }
  findIndex(e) {
    let r2 = this.iterator(), n2 = 0, i = r2.next();
    for (; !i.done; ) {
      if (e(i.value)) return n2;
      i = r2.next(), n2++;
    }
    return -1;
  }
  includes(e) {
    let r2 = this.iterator(), n2 = r2.next();
    for (; !n2.done; ) {
      if (n2.value === e) return true;
      n2 = r2.next();
    }
    return false;
  }
  flatMap(e) {
    return new _a2(() => ({ this: this.startFn() }), (r2) => {
      do {
        if (r2.iterator) {
          let a = r2.iterator.next();
          if (a.done) r2.iterator = void 0;
          else return a;
        }
        let { done: n2, value: i } = this.nextFn(r2.this);
        if (!n2) {
          let a = e(i);
          if (Ko(a)) r2.iterator = a[Symbol.iterator]();
          else return { done: false, value: a };
        }
      } while (r2.iterator);
      return ht;
    });
  }
  flat(e) {
    if (e === void 0 && (e = 1), e <= 0) return this;
    let r2 = e > 1 ? this.flat(e - 1) : this;
    return new _a2(() => ({ this: r2.startFn() }), (n2) => {
      do {
        if (n2.iterator) {
          let o2 = n2.iterator.next();
          if (o2.done) n2.iterator = void 0;
          else return o2;
        }
        let { done: i, value: a } = r2.nextFn(n2.this);
        if (!i) if (Ko(a)) n2.iterator = a[Symbol.iterator]();
        else return { done: false, value: a };
      } while (n2.iterator);
      return ht;
    });
  }
  head() {
    let r2 = this.iterator().next();
    if (!r2.done) return r2.value;
  }
  tail(e = 1) {
    return new _a2(() => {
      let r2 = this.startFn();
      for (let n2 = 0; n2 < e; n2++) if (this.nextFn(r2).done) return r2;
      return r2;
    }, this.nextFn);
  }
  limit(e) {
    return new _a2(() => ({ size: 0, state: this.startFn() }), (r2) => (r2.size++, r2.size > e ? ht : this.nextFn(r2.state)));
  }
  distinct(e) {
    return new _a2(() => ({ set: /* @__PURE__ */ new Set(), internalState: this.startFn() }), (r2) => {
      let n2;
      do
        if (n2 = this.nextFn(r2.internalState), !n2.done) {
          let i = e ? e(n2.value) : n2.value;
          if (!r2.set.has(i)) return r2.set.add(i), n2;
        }
      while (!n2.done);
      return ht;
    });
  }
  exclude(e, r2) {
    let n2 = /* @__PURE__ */ new Set();
    for (let i of e) {
      let a = r2 ? r2(i) : i;
      n2.add(a);
    }
    return this.filter((i) => {
      let a = r2 ? r2(i) : i;
      return !n2.has(a);
    });
  }
}, m(_a2, "StreamImpl"), _a2);
function Nx(t) {
  return typeof t == "string" ? t : typeof t > "u" ? "undefined" : typeof t.toString == "function" ? t.toString() : Object.prototype.toString.call(t);
}
m(Nx, "toString");
function Ko(t) {
  return !!t && typeof t[Symbol.iterator] == "function";
}
m(Ko, "isIterable");
var on = new zt(() => {
}, () => ht);
var ht = Object.freeze({ done: true, value: void 0 });
function re(...t) {
  if (t.length === 1) {
    let e = t[0];
    if (e instanceof zt) return e;
    if (Ko(e)) return new zt(() => e[Symbol.iterator](), (r2) => r2.next());
    if (typeof e.length == "number") return new zt(() => ({ index: 0 }), (r2) => r2.index < e.length ? { done: false, value: e[r2.index++] } : ht);
  }
  return t.length > 1 ? new zt(() => ({ collIndex: 0, arrIndex: 0 }), (e) => {
    do {
      if (e.iterator) {
        let r2 = e.iterator.next();
        if (!r2.done) return r2;
        e.iterator = void 0;
      }
      if (e.array) {
        if (e.arrIndex < e.array.length) return { done: false, value: e.array[e.arrIndex++] };
        e.array = void 0, e.arrIndex = 0;
      }
      if (e.collIndex < t.length) {
        let r2 = t[e.collIndex++];
        Ko(r2) ? e.iterator = r2[Symbol.iterator]() : r2 && typeof r2.length == "number" && (e.array = r2);
      }
    } while (e.iterator || e.array || e.collIndex < t.length);
    return ht;
  }) : on;
}
m(re, "stream");
var _a3;
var Rr = (_a3 = class extends zt {
  constructor(e, r2, n2) {
    super(() => ({ iterators: (n2 == null ? void 0 : n2.includeRoot) ? [[e][Symbol.iterator]()] : [r2(e)[Symbol.iterator]()], pruned: false }), (i) => {
      for (i.pruned && (i.iterators.pop(), i.pruned = false); i.iterators.length > 0; ) {
        let o2 = i.iterators[i.iterators.length - 1].next();
        if (o2.done) i.iterators.pop();
        else return i.iterators.push(r2(o2.value)[Symbol.iterator]()), o2;
      }
      return ht;
    });
  }
  iterator() {
    let e = { state: this.startFn(), next: m(() => this.nextFn(e.state), "next"), prune: m(() => {
      e.state.pruned = true;
    }, "prune"), [Symbol.iterator]: () => e };
    return e;
  }
}, m(_a3, "TreeStreamImpl"), _a3);
var Ni;
(function(t) {
  function e(a) {
    return a.reduce((o2, l) => o2 + l, 0);
  }
  m(e, "sum"), t.sum = e;
  function r2(a) {
    return a.reduce((o2, l) => o2 * l, 0);
  }
  m(r2, "product"), t.product = r2;
  function n2(a) {
    return a.reduce((o2, l) => Math.min(o2, l));
  }
  m(n2, "min"), t.min = n2;
  function i(a) {
    return a.reduce((o2, l) => Math.max(o2, l));
  }
  m(i, "max"), t.max = i;
})(Ni || (Ni = {}));
var Ho = {};
p(Ho, { assignMandatoryProperties: () => bc, copyAstNode: () => Ic, findRootNode: () => Ii, getContainerOfType: () => Fr, getDocument: () => gt, getReferenceNodes: () => Vo, hasContainerOfType: () => wx, linkContentToContainer: () => wi, streamAllContents: () => ar, streamAst: () => Ct, streamContents: () => Qs, streamReferences: () => ln });
function wi(t, e = {}) {
  for (let [r2, n2] of Object.entries(t)) r2.startsWith("$") || (Array.isArray(n2) ? n2.forEach((i, a) => {
    Le(i) && (i.$container = t, i.$containerProperty = r2, i.$containerIndex = a, e.deep && wi(i, e));
  }) : Le(n2) && (n2.$container = t, n2.$containerProperty = r2, e.deep && wi(n2, e)));
}
m(wi, "linkContentToContainer");
function Fr(t, e) {
  let r2 = t;
  for (; r2; ) {
    if (e(r2)) return r2;
    r2 = r2.$container;
  }
}
m(Fr, "getContainerOfType");
function wx(t, e) {
  let r2 = t;
  for (; r2; ) {
    if (e(r2)) return true;
    r2 = r2.$container;
  }
  return false;
}
m(wx, "hasContainerOfType");
function gt(t) {
  let r2 = Ii(t).$document;
  if (!r2) throw new Error("AST node has no document.");
  return r2;
}
m(gt, "getDocument");
function Ii(t) {
  for (; t.$container; ) t = t.$container;
  return t;
}
m(Ii, "findRootNode");
function Vo(t) {
  return Qe(t) ? t.ref ? [t.ref] : [] : Ut(t) ? t.items.map((e) => e.ref) : [];
}
m(Vo, "getReferenceNodes");
function Qs(t, e) {
  if (!t) throw new Error("Node must be an AstNode.");
  let r2 = e == null ? void 0 : e.range;
  return new zt(() => ({ keys: Object.keys(t), keyIndex: 0, arrayIndex: 0 }), (n2) => {
    for (; n2.keyIndex < n2.keys.length; ) {
      let i = n2.keys[n2.keyIndex];
      if (!i.startsWith("$")) {
        let a = t[i];
        if (Le(a)) {
          if (n2.keyIndex++, wc(a, r2)) return { done: false, value: a };
        } else if (Array.isArray(a)) {
          for (; n2.arrayIndex < a.length; ) {
            let o2 = n2.arrayIndex++, l = a[o2];
            if (Le(l) && wc(l, r2)) return { done: false, value: l };
          }
          n2.arrayIndex = 0;
        }
      }
      n2.keyIndex++;
    }
    return ht;
  });
}
m(Qs, "streamContents");
function ar(t, e) {
  if (!t) throw new Error("Root node must be an AstNode.");
  return new Rr(t, (r2) => Qs(r2, e));
}
m(ar, "streamAllContents");
function Ct(t, e) {
  if (t) {
    if ((e == null ? void 0 : e.range) && !wc(t, e.range)) return new Rr(t, () => []);
  } else throw new Error("Root node must be an AstNode.");
  return new Rr(t, (r2) => Qs(r2, e), { includeRoot: true });
}
m(Ct, "streamAst");
function wc(t, e) {
  var _a135;
  if (!e) return true;
  let r2 = (_a135 = t.$cstNode) == null ? void 0 : _a135.range;
  return r2 ? _c(r2, e) : false;
}
m(wc, "isAstNodeInRange");
function ln(t) {
  return new zt(() => ({ keys: Object.keys(t), keyIndex: 0, arrayIndex: 0 }), (e) => {
    for (; e.keyIndex < e.keys.length; ) {
      let r2 = e.keys[e.keyIndex];
      if (!r2.startsWith("$")) {
        let n2 = t[r2];
        if (Qe(n2) || Ut(n2)) return e.keyIndex++, { done: false, value: { reference: n2, container: t, property: r2 } };
        if (Array.isArray(n2)) {
          for (; e.arrayIndex < n2.length; ) {
            let i = e.arrayIndex++, a = n2[i];
            if (Qe(a) || Ut(n2)) return { done: false, value: { reference: a, container: t, property: r2, index: i } };
          }
          e.arrayIndex = 0;
        }
      }
      e.keyIndex++;
    }
    return ht;
  });
}
m(ln, "streamReferences");
function bc(t, e) {
  let r2 = t.getTypeMetaData(e.$type), n2 = e;
  for (let i of Object.values(r2.properties)) i.defaultValue !== void 0 && n2[i.name] === void 0 && (n2[i.name] = Ch(i.defaultValue));
}
m(bc, "assignMandatoryProperties");
function Ch(t) {
  return Array.isArray(t) ? [...t.map(Ch)] : t;
}
m(Ch, "copyDefaultValue");
function Ic(t, e, r2) {
  let n2 = { $type: t.$type };
  r2 && (r2.set(t, n2), r2.set(n2, t));
  for (let [i, a] of Object.entries(t)) if (!i.startsWith("$")) if (Le(a)) n2[i] = Ic(a, e, r2);
  else if (Qe(a)) n2[i] = e(n2, i, a.$refNode, a.$refText, a);
  else if (Array.isArray(a)) {
    let o2 = [];
    for (let l of a) Le(l) ? o2.push(Ic(l, e, r2)) : Qe(l) ? o2.push(e(n2, i, l.$refNode, l.$refText, l)) : o2.push(l);
    n2[i] = o2;
  } else n2[i] = a;
  return wi(n2, { deep: true }), n2;
}
m(Ic, "copyAstNode");
var ca = {};
p(ca, { AbstractElement: () => _t, AbstractParserRule: () => ea, AbstractRule: () => bi, AbstractType: () => qt, Action: () => un, Alternatives: () => ta, ArrayLiteral: () => Yo, ArrayType: () => Xo, Assignment: () => cn, BooleanLiteral: () => Jo, CharacterRange: () => fn2, Condition: () => dn, Conjunction: () => ra, CrossReference: () => pn, Disjunction: () => na, EndOfFile: () => Zo, Grammar: () => Gr, GrammarImport: () => Qo, Group: () => Dn, InferredType: () => el, InfixRule: () => $r, InfixRuleOperatorList: () => ia, InfixRuleOperators: () => tl, Interface: () => _i2, Keyword: () => Pi, LangiumGrammarAstReflection: () => Fi, LangiumGrammarTerminals: () => Ix, NamedArgument: () => Oi, NegatedToken: () => Mn, Negation: () => rl, NumberLiteral: () => nl, Parameter: () => Li, ParameterReference: () => il, ParserRule: () => or, ReferenceType: () => sa, RegexToken: () => Fn, ReturnType: () => sl, RuleCall: () => Gn, SimpleType: () => Di, StringLiteral: () => al, TerminalAlternatives: () => Un, TerminalElement: () => Pt, TerminalGroup: () => zn, TerminalRule: () => Ur, TerminalRuleCall: () => qn, Type: () => aa, TypeAttribute: () => jn, TypeDefinition: () => Bn, UnionType: () => ol, UnorderedGroup: () => oa, UntilToken: () => Wn, ValueLiteral: () => Kn, Wildcard: () => Mi2, isAbstractElement: () => la, isAbstractParserRule: () => zr, isAbstractRule: () => bx, isAbstractType: () => _x, isAction: () => qr, isAlternatives: () => ll, isArrayLiteral: () => Px, isArrayType: () => Pc, isAssignment: () => lr, isBooleanLiteral: () => Oc, isCharacterRange: () => Lc, isCondition: () => Ox, isConjunction: () => Dc, isCrossReference: () => ur, isDisjunction: () => Mc, isEndOfFile: () => Fc, isGrammar: () => Lx, isGrammarImport: () => Dx, isGroup: () => mn, isInferredType: () => ua, isInfixRule: () => hn, isInfixRuleOperatorList: () => Mx, isInfixRuleOperators: () => Fx, isInterface: () => Gc, isKeyword: () => Ht, isNamedArgument: () => Gx, isNegatedToken: () => Uc, isNegation: () => zc, isNumberLiteral: () => Ux, isParameter: () => zx, isParameterReference: () => qc, isParserRule: () => nt, isReferenceType: () => jc, isRegexToken: () => Bc, isReturnType: () => Wc, isRuleCall: () => cr, isSimpleType: () => ul, isStringLiteral: () => qx, isTerminalAlternatives: () => Kc, isTerminalElement: () => jx, isTerminalGroup: () => Vc, isTerminalRule: () => St, isTerminalRuleCall: () => cl, isType: () => fl, isTypeAttribute: () => Bx, isTypeDefinition: () => Wx, isUnionType: () => Hc, isUnorderedGroup: () => dl, isUntilToken: () => Yc, isValueLiteral: () => Kx, isWildcard: () => Xc, reflection: () => B });
var Ix = { ID: /\^?[_a-zA-Z][\w_]*/, STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/, NUMBER: /NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity)/, RegexLiteral: /\/(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+\/[a-z]*/, WS: /\s+/, ML_COMMENT: /\/\*[\s\S]*?\*\//, SL_COMMENT: /\/\/[^\n\r]*/ };
var _t = { $type: "AbstractElement", cardinality: "cardinality" };
function la(t) {
  return B.isInstance(t, _t.$type);
}
m(la, "isAbstractElement");
var ea = { $type: "AbstractParserRule" };
function zr(t) {
  return B.isInstance(t, ea.$type);
}
m(zr, "isAbstractParserRule");
var bi = { $type: "AbstractRule" };
function bx(t) {
  return B.isInstance(t, bi.$type);
}
m(bx, "isAbstractRule");
var qt = { $type: "AbstractType" };
function _x(t) {
  return B.isInstance(t, qt.$type);
}
m(_x, "isAbstractType");
var un = { $type: "Action", cardinality: "cardinality", feature: "feature", inferredType: "inferredType", operator: "operator", type: "type" };
function qr(t) {
  return B.isInstance(t, un.$type);
}
m(qr, "isAction");
var ta = { $type: "Alternatives", cardinality: "cardinality", elements: "elements" };
function ll(t) {
  return B.isInstance(t, ta.$type);
}
m(ll, "isAlternatives");
var Yo = { $type: "ArrayLiteral", elements: "elements" };
function Px(t) {
  return B.isInstance(t, Yo.$type);
}
m(Px, "isArrayLiteral");
var Xo = { $type: "ArrayType", elementType: "elementType" };
function Pc(t) {
  return B.isInstance(t, Xo.$type);
}
m(Pc, "isArrayType");
var cn = { $type: "Assignment", cardinality: "cardinality", feature: "feature", operator: "operator", predicate: "predicate", terminal: "terminal" };
function lr(t) {
  return B.isInstance(t, cn.$type);
}
m(lr, "isAssignment");
var Jo = { $type: "BooleanLiteral", true: "true" };
function Oc(t) {
  return B.isInstance(t, Jo.$type);
}
m(Oc, "isBooleanLiteral");
var fn2 = { $type: "CharacterRange", cardinality: "cardinality", left: "left", lookahead: "lookahead", parenthesized: "parenthesized", right: "right" };
function Lc(t) {
  return B.isInstance(t, fn2.$type);
}
m(Lc, "isCharacterRange");
var dn = { $type: "Condition" };
function Ox(t) {
  return B.isInstance(t, dn.$type);
}
m(Ox, "isCondition");
var ra = { $type: "Conjunction", left: "left", right: "right" };
function Dc(t) {
  return B.isInstance(t, ra.$type);
}
m(Dc, "isConjunction");
var pn = { $type: "CrossReference", cardinality: "cardinality", deprecatedSyntax: "deprecatedSyntax", isMulti: "isMulti", terminal: "terminal", type: "type" };
function ur(t) {
  return B.isInstance(t, pn.$type);
}
m(ur, "isCrossReference");
var na = { $type: "Disjunction", left: "left", right: "right" };
function Mc(t) {
  return B.isInstance(t, na.$type);
}
m(Mc, "isDisjunction");
var Zo = { $type: "EndOfFile", cardinality: "cardinality" };
function Fc(t) {
  return B.isInstance(t, Zo.$type);
}
m(Fc, "isEndOfFile");
var Gr = { $type: "Grammar", imports: "imports", interfaces: "interfaces", isDeclared: "isDeclared", name: "name", rules: "rules", types: "types" };
function Lx(t) {
  return B.isInstance(t, Gr.$type);
}
m(Lx, "isGrammar");
var Qo = { $type: "GrammarImport", path: "path" };
function Dx(t) {
  return B.isInstance(t, Qo.$type);
}
m(Dx, "isGrammarImport");
var Dn = { $type: "Group", cardinality: "cardinality", elements: "elements", guardCondition: "guardCondition", predicate: "predicate" };
function mn(t) {
  return B.isInstance(t, Dn.$type);
}
m(mn, "isGroup");
var el = { $type: "InferredType", name: "name" };
function ua(t) {
  return B.isInstance(t, el.$type);
}
m(ua, "isInferredType");
var $r = { $type: "InfixRule", call: "call", dataType: "dataType", inferredType: "inferredType", name: "name", operators: "operators", parameters: "parameters", returnType: "returnType" };
function hn(t) {
  return B.isInstance(t, $r.$type);
}
m(hn, "isInfixRule");
var ia = { $type: "InfixRuleOperatorList", associativity: "associativity", operators: "operators" };
function Mx(t) {
  return B.isInstance(t, ia.$type);
}
m(Mx, "isInfixRuleOperatorList");
var tl = { $type: "InfixRuleOperators", precedences: "precedences" };
function Fx(t) {
  return B.isInstance(t, tl.$type);
}
m(Fx, "isInfixRuleOperators");
var _i2 = { $type: "Interface", attributes: "attributes", name: "name", superTypes: "superTypes" };
function Gc(t) {
  return B.isInstance(t, _i2.$type);
}
m(Gc, "isInterface");
var Pi = { $type: "Keyword", cardinality: "cardinality", predicate: "predicate", value: "value" };
function Ht(t) {
  return B.isInstance(t, Pi.$type);
}
m(Ht, "isKeyword");
var Oi = { $type: "NamedArgument", calledByName: "calledByName", parameter: "parameter", value: "value" };
function Gx(t) {
  return B.isInstance(t, Oi.$type);
}
m(Gx, "isNamedArgument");
var Mn = { $type: "NegatedToken", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized", terminal: "terminal" };
function Uc(t) {
  return B.isInstance(t, Mn.$type);
}
m(Uc, "isNegatedToken");
var rl = { $type: "Negation", value: "value" };
function zc(t) {
  return B.isInstance(t, rl.$type);
}
m(zc, "isNegation");
var nl = { $type: "NumberLiteral", value: "value" };
function Ux(t) {
  return B.isInstance(t, nl.$type);
}
m(Ux, "isNumberLiteral");
var Li = { $type: "Parameter", name: "name" };
function zx(t) {
  return B.isInstance(t, Li.$type);
}
m(zx, "isParameter");
var il = { $type: "ParameterReference", parameter: "parameter" };
function qc(t) {
  return B.isInstance(t, il.$type);
}
m(qc, "isParameterReference");
var or = { $type: "ParserRule", dataType: "dataType", definition: "definition", entry: "entry", fragment: "fragment", inferredType: "inferredType", name: "name", parameters: "parameters", returnType: "returnType" };
function nt(t) {
  return B.isInstance(t, or.$type);
}
m(nt, "isParserRule");
var sa = { $type: "ReferenceType", isMulti: "isMulti", referenceType: "referenceType" };
function jc(t) {
  return B.isInstance(t, sa.$type);
}
m(jc, "isReferenceType");
var Fn = { $type: "RegexToken", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized", regex: "regex" };
function Bc(t) {
  return B.isInstance(t, Fn.$type);
}
m(Bc, "isRegexToken");
var sl = { $type: "ReturnType", name: "name" };
function Wc(t) {
  return B.isInstance(t, sl.$type);
}
m(Wc, "isReturnType");
var Gn = { $type: "RuleCall", arguments: "arguments", cardinality: "cardinality", predicate: "predicate", rule: "rule" };
function cr(t) {
  return B.isInstance(t, Gn.$type);
}
m(cr, "isRuleCall");
var Di = { $type: "SimpleType", primitiveType: "primitiveType", stringType: "stringType", typeRef: "typeRef" };
function ul(t) {
  return B.isInstance(t, Di.$type);
}
m(ul, "isSimpleType");
var al = { $type: "StringLiteral", value: "value" };
function qx(t) {
  return B.isInstance(t, al.$type);
}
m(qx, "isStringLiteral");
var Un = { $type: "TerminalAlternatives", cardinality: "cardinality", elements: "elements", lookahead: "lookahead", parenthesized: "parenthesized" };
function Kc(t) {
  return B.isInstance(t, Un.$type);
}
m(Kc, "isTerminalAlternatives");
var Pt = { $type: "TerminalElement", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized" };
function jx(t) {
  return B.isInstance(t, Pt.$type);
}
m(jx, "isTerminalElement");
var zn = { $type: "TerminalGroup", cardinality: "cardinality", elements: "elements", lookahead: "lookahead", parenthesized: "parenthesized" };
function Vc(t) {
  return B.isInstance(t, zn.$type);
}
m(Vc, "isTerminalGroup");
var Ur = { $type: "TerminalRule", definition: "definition", fragment: "fragment", hidden: "hidden", name: "name", type: "type" };
function St(t) {
  return B.isInstance(t, Ur.$type);
}
m(St, "isTerminalRule");
var qn = { $type: "TerminalRuleCall", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized", rule: "rule" };
function cl(t) {
  return B.isInstance(t, qn.$type);
}
m(cl, "isTerminalRuleCall");
var aa = { $type: "Type", name: "name", type: "type" };
function fl(t) {
  return B.isInstance(t, aa.$type);
}
m(fl, "isType");
var jn = { $type: "TypeAttribute", defaultValue: "defaultValue", isOptional: "isOptional", name: "name", type: "type" };
function Bx(t) {
  return B.isInstance(t, jn.$type);
}
m(Bx, "isTypeAttribute");
var Bn = { $type: "TypeDefinition" };
function Wx(t) {
  return B.isInstance(t, Bn.$type);
}
m(Wx, "isTypeDefinition");
var ol = { $type: "UnionType", types: "types" };
function Hc(t) {
  return B.isInstance(t, ol.$type);
}
m(Hc, "isUnionType");
var oa = { $type: "UnorderedGroup", cardinality: "cardinality", elements: "elements" };
function dl(t) {
  return B.isInstance(t, oa.$type);
}
m(dl, "isUnorderedGroup");
var Wn = { $type: "UntilToken", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized", terminal: "terminal" };
function Yc(t) {
  return B.isInstance(t, Wn.$type);
}
m(Yc, "isUntilToken");
var Kn = { $type: "ValueLiteral" };
function Kx(t) {
  return B.isInstance(t, Kn.$type);
}
m(Kx, "isValueLiteral");
var Mi2 = { $type: "Wildcard", cardinality: "cardinality", lookahead: "lookahead", parenthesized: "parenthesized" };
function Xc(t) {
  return B.isInstance(t, Mi2.$type);
}
m(Xc, "isWildcard");
var _a4;
var Fi = (_a4 = class extends On {
  constructor() {
    super(...arguments), this.types = { AbstractElement: { name: _t.$type, properties: { cardinality: { name: _t.cardinality } }, superTypes: [] }, AbstractParserRule: { name: ea.$type, properties: {}, superTypes: [bi.$type, qt.$type] }, AbstractRule: { name: bi.$type, properties: {}, superTypes: [] }, AbstractType: { name: qt.$type, properties: {}, superTypes: [] }, Action: { name: un.$type, properties: { cardinality: { name: un.cardinality }, feature: { name: un.feature }, inferredType: { name: un.inferredType }, operator: { name: un.operator }, type: { name: un.type, referenceType: qt.$type } }, superTypes: [_t.$type] }, Alternatives: { name: ta.$type, properties: { cardinality: { name: ta.cardinality }, elements: { name: ta.elements, defaultValue: [] } }, superTypes: [_t.$type] }, ArrayLiteral: { name: Yo.$type, properties: { elements: { name: Yo.elements, defaultValue: [] } }, superTypes: [Kn.$type] }, ArrayType: { name: Xo.$type, properties: { elementType: { name: Xo.elementType } }, superTypes: [Bn.$type] }, Assignment: { name: cn.$type, properties: { cardinality: { name: cn.cardinality }, feature: { name: cn.feature }, operator: { name: cn.operator }, predicate: { name: cn.predicate }, terminal: { name: cn.terminal } }, superTypes: [_t.$type] }, BooleanLiteral: { name: Jo.$type, properties: { true: { name: Jo.true, defaultValue: false } }, superTypes: [dn.$type, Kn.$type] }, CharacterRange: { name: fn2.$type, properties: { cardinality: { name: fn2.cardinality }, left: { name: fn2.left }, lookahead: { name: fn2.lookahead }, parenthesized: { name: fn2.parenthesized, defaultValue: false }, right: { name: fn2.right } }, superTypes: [Pt.$type] }, Condition: { name: dn.$type, properties: {}, superTypes: [] }, Conjunction: { name: ra.$type, properties: { left: { name: ra.left }, right: { name: ra.right } }, superTypes: [dn.$type] }, CrossReference: { name: pn.$type, properties: { cardinality: { name: pn.cardinality }, deprecatedSyntax: { name: pn.deprecatedSyntax, defaultValue: false }, isMulti: { name: pn.isMulti, defaultValue: false }, terminal: { name: pn.terminal }, type: { name: pn.type, referenceType: qt.$type } }, superTypes: [_t.$type] }, Disjunction: { name: na.$type, properties: { left: { name: na.left }, right: { name: na.right } }, superTypes: [dn.$type] }, EndOfFile: { name: Zo.$type, properties: { cardinality: { name: Zo.cardinality } }, superTypes: [_t.$type] }, Grammar: { name: Gr.$type, properties: { imports: { name: Gr.imports, defaultValue: [] }, interfaces: { name: Gr.interfaces, defaultValue: [] }, isDeclared: { name: Gr.isDeclared, defaultValue: false }, name: { name: Gr.name }, rules: { name: Gr.rules, defaultValue: [] }, types: { name: Gr.types, defaultValue: [] } }, superTypes: [] }, GrammarImport: { name: Qo.$type, properties: { path: { name: Qo.path } }, superTypes: [] }, Group: { name: Dn.$type, properties: { cardinality: { name: Dn.cardinality }, elements: { name: Dn.elements, defaultValue: [] }, guardCondition: { name: Dn.guardCondition }, predicate: { name: Dn.predicate } }, superTypes: [_t.$type] }, InferredType: { name: el.$type, properties: { name: { name: el.name } }, superTypes: [qt.$type] }, InfixRule: { name: $r.$type, properties: { call: { name: $r.call }, dataType: { name: $r.dataType }, inferredType: { name: $r.inferredType }, name: { name: $r.name }, operators: { name: $r.operators }, parameters: { name: $r.parameters, defaultValue: [] }, returnType: { name: $r.returnType, referenceType: qt.$type } }, superTypes: [ea.$type] }, InfixRuleOperatorList: { name: ia.$type, properties: { associativity: { name: ia.associativity }, operators: { name: ia.operators, defaultValue: [] } }, superTypes: [] }, InfixRuleOperators: { name: tl.$type, properties: { precedences: { name: tl.precedences, defaultValue: [] } }, superTypes: [] }, Interface: { name: _i2.$type, properties: { attributes: { name: _i2.attributes, defaultValue: [] }, name: { name: _i2.name }, superTypes: { name: _i2.superTypes, defaultValue: [], referenceType: qt.$type } }, superTypes: [qt.$type] }, Keyword: { name: Pi.$type, properties: { cardinality: { name: Pi.cardinality }, predicate: { name: Pi.predicate }, value: { name: Pi.value } }, superTypes: [_t.$type] }, NamedArgument: { name: Oi.$type, properties: { calledByName: { name: Oi.calledByName, defaultValue: false }, parameter: { name: Oi.parameter, referenceType: Li.$type }, value: { name: Oi.value } }, superTypes: [] }, NegatedToken: { name: Mn.$type, properties: { cardinality: { name: Mn.cardinality }, lookahead: { name: Mn.lookahead }, parenthesized: { name: Mn.parenthesized, defaultValue: false }, terminal: { name: Mn.terminal } }, superTypes: [Pt.$type] }, Negation: { name: rl.$type, properties: { value: { name: rl.value } }, superTypes: [dn.$type] }, NumberLiteral: { name: nl.$type, properties: { value: { name: nl.value } }, superTypes: [Kn.$type] }, Parameter: { name: Li.$type, properties: { name: { name: Li.name } }, superTypes: [] }, ParameterReference: { name: il.$type, properties: { parameter: { name: il.parameter, referenceType: Li.$type } }, superTypes: [dn.$type] }, ParserRule: { name: or.$type, properties: { dataType: { name: or.dataType }, definition: { name: or.definition }, entry: { name: or.entry, defaultValue: false }, fragment: { name: or.fragment, defaultValue: false }, inferredType: { name: or.inferredType }, name: { name: or.name }, parameters: { name: or.parameters, defaultValue: [] }, returnType: { name: or.returnType, referenceType: qt.$type } }, superTypes: [ea.$type] }, ReferenceType: { name: sa.$type, properties: { isMulti: { name: sa.isMulti, defaultValue: false }, referenceType: { name: sa.referenceType } }, superTypes: [Bn.$type] }, RegexToken: { name: Fn.$type, properties: { cardinality: { name: Fn.cardinality }, lookahead: { name: Fn.lookahead }, parenthesized: { name: Fn.parenthesized, defaultValue: false }, regex: { name: Fn.regex } }, superTypes: [Pt.$type] }, ReturnType: { name: sl.$type, properties: { name: { name: sl.name } }, superTypes: [] }, RuleCall: { name: Gn.$type, properties: { arguments: { name: Gn.arguments, defaultValue: [] }, cardinality: { name: Gn.cardinality }, predicate: { name: Gn.predicate }, rule: { name: Gn.rule, referenceType: bi.$type } }, superTypes: [_t.$type] }, SimpleType: { name: Di.$type, properties: { primitiveType: { name: Di.primitiveType }, stringType: { name: Di.stringType }, typeRef: { name: Di.typeRef, referenceType: qt.$type } }, superTypes: [Bn.$type] }, StringLiteral: { name: al.$type, properties: { value: { name: al.value } }, superTypes: [Kn.$type] }, TerminalAlternatives: { name: Un.$type, properties: { cardinality: { name: Un.cardinality }, elements: { name: Un.elements, defaultValue: [] }, lookahead: { name: Un.lookahead }, parenthesized: { name: Un.parenthesized, defaultValue: false } }, superTypes: [Pt.$type] }, TerminalElement: { name: Pt.$type, properties: { cardinality: { name: Pt.cardinality }, lookahead: { name: Pt.lookahead }, parenthesized: { name: Pt.parenthesized, defaultValue: false } }, superTypes: [_t.$type] }, TerminalGroup: { name: zn.$type, properties: { cardinality: { name: zn.cardinality }, elements: { name: zn.elements, defaultValue: [] }, lookahead: { name: zn.lookahead }, parenthesized: { name: zn.parenthesized, defaultValue: false } }, superTypes: [Pt.$type] }, TerminalRule: { name: Ur.$type, properties: { definition: { name: Ur.definition }, fragment: { name: Ur.fragment, defaultValue: false }, hidden: { name: Ur.hidden, defaultValue: false }, name: { name: Ur.name }, type: { name: Ur.type } }, superTypes: [bi.$type] }, TerminalRuleCall: { name: qn.$type, properties: { cardinality: { name: qn.cardinality }, lookahead: { name: qn.lookahead }, parenthesized: { name: qn.parenthesized, defaultValue: false }, rule: { name: qn.rule, referenceType: Ur.$type } }, superTypes: [Pt.$type] }, Type: { name: aa.$type, properties: { name: { name: aa.name }, type: { name: aa.type } }, superTypes: [qt.$type] }, TypeAttribute: { name: jn.$type, properties: { defaultValue: { name: jn.defaultValue }, isOptional: { name: jn.isOptional, defaultValue: false }, name: { name: jn.name }, type: { name: jn.type } }, superTypes: [] }, TypeDefinition: { name: Bn.$type, properties: {}, superTypes: [] }, UnionType: { name: ol.$type, properties: { types: { name: ol.types, defaultValue: [] } }, superTypes: [Bn.$type] }, UnorderedGroup: { name: oa.$type, properties: { cardinality: { name: oa.cardinality }, elements: { name: oa.elements, defaultValue: [] } }, superTypes: [_t.$type] }, UntilToken: { name: Wn.$type, properties: { cardinality: { name: Wn.cardinality }, lookahead: { name: Wn.lookahead }, parenthesized: { name: Wn.parenthesized, defaultValue: false }, terminal: { name: Wn.terminal } }, superTypes: [Pt.$type] }, ValueLiteral: { name: Kn.$type, properties: {}, superTypes: [] }, Wildcard: { name: Mi2.$type, properties: { cardinality: { name: Mi2.cardinality }, lookahead: { name: Mi2.lookahead }, parenthesized: { name: Mi2.parenthesized, defaultValue: false } }, superTypes: [Pt.$type] } };
  }
}, m(_a4, "LangiumGrammarAstReflection"), _a4);
var B = new Fi();
function Vx(t) {
  let e = t, r2 = false;
  for (; e; ) {
    let n2 = Fr(e.grammarSource, nt);
    if (n2 && n2.dataType) e = e.container, r2 = true;
    else return r2 ? e : void 0;
  }
}
m(Vx, "getDatatypeNode");
function Vn(t) {
  return new Rr(t, (e) => sr(e) ? e.content : [], { includeRoot: true });
}
m(Vn, "streamCst");
function Hx(t) {
  return Vn(t).filter(an);
}
m(Hx, "flattenCst");
function Zc(t, e) {
  for (; t.container; ) if (t = t.container, t === e) return true;
  return false;
}
m(Zc, "isChildNode");
function Gi(t) {
  return { start: { character: t.startColumn - 1, line: t.startLine - 1 }, end: { character: t.endColumn, line: t.endLine - 1 } };
}
m(Gi, "tokenToRange");
function Hn(t) {
  if (!t) return;
  let { offset: e, end: r2, range: n2 } = t;
  return { range: n2, offset: e, end: r2, length: r2 - e };
}
m(Hn, "toDocumentSegment");
var xr;
(function(t) {
  t[t.Before = 0] = "Before", t[t.After = 1] = "After", t[t.OverlapFront = 2] = "OverlapFront", t[t.OverlapBack = 3] = "OverlapBack", t[t.Inside = 4] = "Inside", t[t.Outside = 5] = "Outside";
})(xr || (xr = {}));
function kh(t, e) {
  if (t.end.line < e.start.line || t.end.line === e.start.line && t.end.character <= e.start.character) return xr.Before;
  if (t.start.line > e.end.line || t.start.line === e.end.line && t.start.character >= e.end.character) return xr.After;
  let r2 = t.start.line > e.start.line || t.start.line === e.start.line && t.start.character >= e.start.character, n2 = t.end.line < e.end.line || t.end.line === e.end.line && t.end.character <= e.end.character;
  return r2 && n2 ? xr.Inside : r2 ? xr.OverlapBack : n2 ? xr.OverlapFront : xr.Outside;
}
m(kh, "compareRange");
function _c(t, e) {
  return kh(t, e) > xr.After;
}
m(_c, "inRange");
var pl = /^[\w\p{L}]$/u;
function Yx(t, e, r2 = pl) {
  if (t) {
    if (e > 0) {
      let n2 = e - t.offset, i = t.text.charAt(n2);
      r2.test(i) || e--;
    }
    return ef(t, e);
  }
}
m(Yx, "findDeclarationNodeAtOffset");
function Qc(t, e) {
  if (t) {
    let r2 = Ih(t, true);
    if (r2 && Jc(r2, e)) return r2;
    if (Zs(t)) {
      let n2 = t.content.findIndex((i) => !i.hidden);
      for (let i = n2 - 1; i >= 0; i--) {
        let a = t.content[i];
        if (Jc(a, e)) return a;
      }
    }
  }
}
m(Qc, "findCommentNode");
function Jc(t, e) {
  return an(t) && e.includes(t.tokenType.name);
}
m(Jc, "isCommentNode");
function ef(t, e) {
  if (an(t)) return t;
  if (sr(t)) {
    let r2 = wh(t, e, false);
    if (r2) return ef(r2, e);
  }
}
m(ef, "findLeafNodeAtOffset");
function Nh(t, e) {
  if (an(t)) return t;
  if (sr(t)) {
    let r2 = wh(t, e, true);
    if (r2) return Nh(r2, e);
  }
}
m(Nh, "findLeafNodeBeforeOffset");
function wh(t, e, r2) {
  let n2 = 0, i = t.content.length - 1, a;
  for (; n2 <= i; ) {
    let o2 = Math.floor((n2 + i) / 2), l = t.content[o2];
    if (l.offset <= e && l.end > e) return l;
    l.end <= e ? (a = r2 ? l : void 0, n2 = o2 + 1) : i = o2 - 1;
  }
  return a;
}
m(wh, "binarySearch");
function Ih(t, e = true) {
  for (; t.container; ) {
    let r2 = t.container, n2 = r2.content.indexOf(t);
    for (; n2 > 0; ) {
      n2--;
      let i = r2.content[n2];
      if (e || !i.hidden) return i;
    }
    t = r2;
  }
}
m(Ih, "getPreviousNode");
function Xx(t, e = true) {
  for (; t.container; ) {
    let r2 = t.container, n2 = r2.content.indexOf(t), i = r2.content.length - 1;
    for (; n2 < i; ) {
      n2++;
      let a = r2.content[n2];
      if (e || !a.hidden) return a;
    }
    t = r2;
  }
}
m(Xx, "getNextNode");
function Jx(t) {
  if (t.range.start.character === 0) return t;
  let e = t.range.start.line, r2 = t, n2;
  for (; t.container; ) {
    let i = t.container, a = n2 ?? i.content.indexOf(t);
    if (a === 0 ? (t = i, n2 = void 0) : (n2 = a - 1, t = i.content[n2]), t.range.start.line !== e) break;
    r2 = t;
  }
  return r2;
}
m(Jx, "getStartlineNode");
function Zx(t, e) {
  let r2 = Qx(t, e);
  return r2 ? r2.parent.content.slice(r2.a + 1, r2.b) : [];
}
m(Zx, "getInteriorNodes");
function Qx(t, e) {
  let r2 = Sh(t), n2 = Sh(e), i;
  for (let a = 0; a < r2.length && a < n2.length; a++) {
    let o2 = r2[a], l = n2[a];
    if (o2.parent === l.parent) i = { parent: o2.parent, a: o2.index, b: l.index };
    else break;
  }
  return i;
}
m(Qx, "getCommonParent");
function Sh(t) {
  let e = [];
  for (; t.container; ) {
    let r2 = t.container, n2 = r2.content.indexOf(t);
    e.push({ parent: r2, index: n2 }), t = r2;
  }
  return e.reverse();
}
m(Sh, "getParentChain");
var $l = {};
p($l, { findAssignment: () => gf, findNameAssignment: () => Tl, findNodeForKeyword: () => mf, findNodeForProperty: () => ga, findNodesForKeyword: () => iv, findNodesForKeywordInternal: () => hf, findNodesForProperty: () => df, getActionAtElement: () => Gh, getActionType: () => zh, getAllReachableRules: () => ha, getAllRulesUsedForCrossReferences: () => nv, getCrossReferenceTerminal: () => cf, getEntryRule: () => Lh, getExplicitRuleType: () => Rl, getHiddenRules: () => Dh, getRuleType: () => yf, getRuleTypeName: () => uv, getTypeName: () => yn, isArrayCardinality: () => av, isArrayOperator: () => ov, isCommentTerminal: () => ff, isDataType: () => lv, isDataTypeRule: () => ya, isOptionalCardinality: () => sv, terminalRegex: () => zi2 });
var _a5;
var Yn = (_a5 = class extends Error {
  constructor(e, r2) {
    super(e ? `${r2} at ${e.range.start.line}:${e.range.start.character}` : r2);
  }
}, m(_a5, "ErrorWithLocation"), _a5);
function vr(t, e = "Error: Got unexpected value.") {
  throw new Error(e);
}
m(vr, "assertUnreachable");
function bh(t, e = "Error: Condition is violated.") {
  if (!t) throw new Error(e);
}
m(bh, "assertCondition");
var yl = {};
p(yl, { NEWLINE_REGEXP: () => sf, escapeRegExp: () => gn, getTerminalParts: () => rv, isMultilineComment: () => af, isWhitespace: () => ma, partialMatches: () => of, partialRegExp: () => Oh, whitespaceCharacters: () => Ph });
function K(t) {
  return t.charCodeAt(0);
}
m(K, "cc");
function hl(t, e) {
  Array.isArray(t) ? t.forEach(function(r2) {
    e.push(r2);
  }) : e.push(t);
}
m(hl, "insertToSet");
function Ui2(t, e) {
  if (t[e] === true) throw "duplicate flag " + e;
  let r2 = t[e];
  t[e] = true;
}
m(Ui2, "addFlag");
function Xn(t) {
  if (t === void 0) throw Error("Internal Error - Should never get here!");
  return true;
}
m(Xn, "ASSERT_EXISTS");
function fa() {
  throw Error("Internal Error - Should never get here!");
}
m(fa, "ASSERT_NEVER_REACH_HERE");
function tf(t) {
  return t.type === "Character";
}
m(tf, "isCharacter");
var da = [];
for (let t = K("0"); t <= K("9"); t++) da.push(t);
var pa = [K("_")].concat(da);
for (let t = K("a"); t <= K("z"); t++) pa.push(t);
for (let t = K("A"); t <= K("Z"); t++) pa.push(t);
var rf = [K(" "), K("\f"), K(`
`), K("\r"), K("	"), K("\v"), K("	"), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K(" "), K("\u2028"), K("\u2029"), K(" "), K(" "), K("　"), K("\uFEFF")];
var ev = /[0-9a-fA-F]/;
var gl = /[0-9]/;
var tv = /[1-9]/;
var _a6;
var Jn = (_a6 = class {
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return { idx: this.idx, input: this.input, groupIdx: this.groupIdx };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    let r2 = this.disjunction();
    this.consumeChar("/");
    let n2 = { type: "Flags", loc: { begin: this.idx, end: e.length }, global: false, ignoreCase: false, multiLine: false, unicode: false, sticky: false };
    for (; this.isRegExpFlag(); ) switch (this.popChar()) {
      case "g":
        Ui2(n2, "global");
        break;
      case "i":
        Ui2(n2, "ignoreCase");
        break;
      case "m":
        Ui2(n2, "multiLine");
        break;
      case "u":
        Ui2(n2, "unicode");
        break;
      case "y":
        Ui2(n2, "sticky");
        break;
    }
    if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
    return { type: "Pattern", flags: n2, value: r2, loc: this.loc(0) };
  }
  disjunction() {
    let e = [], r2 = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; ) this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(r2) };
  }
  alternative() {
    let e = [], r2 = this.idx;
    for (; this.isTerm(); ) e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(r2) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    let e = this.idx;
    switch (this.popChar()) {
      case "^":
        return { type: "StartAnchor", loc: this.loc(e) };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      case "\\":
        switch (this.popChar()) {
          case "b":
            return { type: "WordBoundary", loc: this.loc(e) };
          case "B":
            return { type: "NonWordBoundary", loc: this.loc(e) };
        }
        throw Error("Invalid Assertion Escape");
      case "(":
        this.consumeChar("?");
        let r2;
        switch (this.popChar()) {
          case "=":
            r2 = "Lookahead";
            break;
          case "!":
            r2 = "NegativeLookahead";
            break;
          case "<": {
            switch (this.popChar()) {
              case "=":
                r2 = "Lookbehind";
                break;
              case "!":
                r2 = "NegativeLookbehind";
            }
            break;
          }
        }
        Xn(r2);
        let n2 = this.disjunction();
        return this.consumeChar(")"), { type: r2, value: n2, loc: this.loc(e) };
    }
    return fa();
  }
  quantifier(e = false) {
    let r2, n2 = this.idx;
    switch (this.popChar()) {
      case "*":
        r2 = { atLeast: 0, atMost: 1 / 0 };
        break;
      case "+":
        r2 = { atLeast: 1, atMost: 1 / 0 };
        break;
      case "?":
        r2 = { atLeast: 0, atMost: 1 };
        break;
      case "{":
        let i = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            r2 = { atLeast: i, atMost: i };
            break;
          case ",":
            let a;
            this.isDigit() ? (a = this.integerIncludingZero(), r2 = { atLeast: i, atMost: a }) : r2 = { atLeast: i, atMost: 1 / 0 }, this.consumeChar("}");
            break;
        }
        if (e === true && r2 === void 0) return;
        Xn(r2);
        break;
    }
    if (!(e === true && r2 === void 0) && Xn(r2)) return this.peekChar(0) === "?" ? (this.consumeChar("?"), r2.greedy = false) : r2.greedy = true, r2.type = "Quantifier", r2.loc = this.loc(n2), r2;
  }
  atom() {
    let e, r2 = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    return e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), Xn(e) ? (e.loc = this.loc(r2), this.isQuantifier() && (e.quantifier = this.quantifier()), e) : fa();
  }
  dotAll() {
    return this.consumeChar("."), { type: "Set", complement: true, value: [K(`
`), K("\r"), K("\u2028"), K("\u2029")] };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, r2 = false;
    switch (this.popChar()) {
      case "d":
        e = da;
        break;
      case "D":
        e = da, r2 = true;
        break;
      case "s":
        e = rf;
        break;
      case "S":
        e = rf, r2 = true;
        break;
      case "w":
        e = pa;
        break;
      case "W":
        e = pa, r2 = true;
        break;
    }
    return Xn(e) ? { type: "Set", value: e, complement: r2 } : fa();
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = K("\f");
        break;
      case "n":
        e = K(`
`);
        break;
      case "r":
        e = K("\r");
        break;
      case "t":
        e = K("	");
        break;
      case "v":
        e = K("\v");
        break;
    }
    return Xn(e) ? { type: "Character", value: e } : fa();
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    let e = this.popChar();
    if (/[a-zA-Z]/.test(e) === false) throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: K("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    let e = this.popChar();
    return { type: "Character", value: K(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "\\":
      case "]":
        throw Error("TBD");
      default:
        let e = this.popChar();
        return { type: "Character", value: K(e) };
    }
  }
  characterClass() {
    let e = [], r2 = false;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), r2 = true); this.isClassAtom(); ) {
      let n2 = this.classAtom(), i = n2.type === "Character";
      if (tf(n2) && this.isRangeDash()) {
        this.consumeChar("-");
        let a = this.classAtom(), o2 = a.type === "Character";
        if (tf(a)) {
          if (a.value < n2.value) throw Error("Range out of order in character class");
          e.push({ from: n2.value, to: a.value });
        } else hl(n2.value, e), e.push(K("-")), hl(a.value, e);
      } else hl(n2.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: r2, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "b":
        return this.consumeChar("b"), { type: "Character", value: K("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = true;
    switch (this.consumeChar("("), this.peekChar(0)) {
      case "?":
        this.consumeChar("?"), this.consumeChar(":"), e = false;
        break;
      default:
        this.groupIdx++;
        break;
    }
    let r2 = this.disjunction();
    this.consumeChar(")");
    let n2 = { type: "Group", capturing: e, value: r2 };
    return e && (n2.idx = this.groupIdx), n2;
  }
  positiveInteger() {
    let e = this.popChar();
    if (tv.test(e) === false) throw Error("Expecting a positive integer");
    for (; gl.test(this.peekChar(0)); ) e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (gl.test(e) === false) throw Error("Expecting an integer");
    for (; gl.test(this.peekChar(0)); ) e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    let e = this.popChar();
    switch (e) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: K(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return true;
      default:
        return false;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return gl.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter()) return true;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      case "[":
      case "(":
        return true;
      default:
        return false;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return true;
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return true;
          default:
            return false;
        }
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
      default:
        return false;
    }
  }
  isQuantifier() {
    let e = this.saveState();
    try {
      return this.quantifier(true) !== void 0;
    } catch {
      return false;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  parseHexDigits(e) {
    let r2 = "";
    for (let i = 0; i < e; i++) {
      let a = this.popChar();
      if (ev.test(a) === false) throw Error("Expecting a HexDecimal digits");
      r2 += a;
    }
    return { type: "Character", value: parseInt(r2, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    let e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e) throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length) throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}, m(_a6, "RegExpParser"), _a6);
var _a7;
var Er = (_a7 = class {
  visitChildren(e) {
    for (let r2 in e) {
      let n2 = e[r2];
      e.hasOwnProperty(r2) && (n2.type !== void 0 ? this.visit(n2) : Array.isArray(n2) && n2.forEach((i) => {
        this.visit(i);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Lookbehind":
        this.visitLookbehind(e);
        break;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  visitLookbehind(e) {
  }
  visitNegativeLookbehind(e) {
  }
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}, m(_a7, "BaseRegExpVisitor"), _a7);
var sf = /\r?\n/gm;
var _h = new Jn();
var _a8;
var nf = (_a8 = class extends Er {
  constructor() {
    super(...arguments), this.isStarting = true, this.endRegexpStack = [], this.multiline = false;
  }
  get endRegex() {
    return this.endRegexpStack.join("");
  }
  reset(e) {
    this.multiline = false, this.regex = e, this.startRegexp = "", this.isStarting = true, this.endRegexpStack = [];
  }
  visitGroup(e) {
    e.quantifier && (this.isStarting = false, this.endRegexpStack = []);
  }
  visitCharacter(e) {
    let r2 = String.fromCharCode(e.value);
    if (!this.multiline && r2 === `
` && (this.multiline = true), e.quantifier) this.isStarting = false, this.endRegexpStack = [];
    else {
      let n2 = gn(r2);
      this.endRegexpStack.push(n2), this.isStarting && (this.startRegexp += n2);
    }
  }
  visitSet(e) {
    if (!this.multiline) {
      let r2 = this.regex.substring(e.loc.begin, e.loc.end), n2 = new RegExp(r2);
      this.multiline = !!`
`.match(n2);
    }
    if (e.quantifier) this.isStarting = false, this.endRegexpStack = [];
    else {
      let r2 = this.regex.substring(e.loc.begin, e.loc.end);
      this.endRegexpStack.push(r2), this.isStarting && (this.startRegexp += r2);
    }
  }
  visitChildren(e) {
    e.type === "Group" && e.quantifier || super.visitChildren(e);
  }
}, m(_a8, "TerminalRegExpVisitor"), _a8);
var Zn = new nf();
function rv(t) {
  try {
    typeof t != "string" && (t = t.source), t = `/${t}/`;
    let e = _h.pattern(t), r2 = [];
    for (let n2 of e.value.value) Zn.reset(t), Zn.visit(n2), r2.push({ start: Zn.startRegexp, end: Zn.endRegex });
    return r2;
  } catch {
    return [];
  }
}
m(rv, "getTerminalParts");
function af(t) {
  try {
    return typeof t == "string" && (t = new RegExp(t)), t = t.toString(), Zn.reset(t), Zn.visit(_h.pattern(t)), Zn.multiline;
  } catch {
    return false;
  }
}
m(af, "isMultilineComment");
var Ph = `\f
\r	\v              \u2028\u2029  　\uFEFF`.split("");
function ma(t) {
  let e = typeof t == "string" ? new RegExp(t) : t;
  return Ph.some((r2) => e.test(r2));
}
m(ma, "isWhitespace");
function gn(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
m(gn, "escapeRegExp");
function of(t, e) {
  let r2 = Oh(t), n2 = e.match(r2);
  return !!n2 && n2[0].length > 0;
}
m(of, "partialMatches");
function Oh(t) {
  typeof t == "string" && (t = new RegExp(t));
  let e = t, r2 = t.source, n2 = 0;
  function i() {
    let a = "", o2;
    function l(c) {
      a += r2.substr(n2, c), n2 += c;
    }
    m(l, "appendRaw");
    function u(c) {
      a += "(?:" + r2.substr(n2, c) + "|$)", n2 += c;
    }
    for (m(u, "appendOptional"); n2 < r2.length; ) switch (r2[n2]) {
      case "\\":
        switch (r2[n2 + 1]) {
          case "c":
            u(3);
            break;
          case "x":
            u(4);
            break;
          case "u":
            e.unicode ? r2[n2 + 2] === "{" ? u(r2.indexOf("}", n2) - n2 + 1) : u(6) : u(2);
            break;
          case "p":
          case "P":
            e.unicode ? u(r2.indexOf("}", n2) - n2 + 1) : u(2);
            break;
          case "k":
            u(r2.indexOf(">", n2) - n2 + 1);
            break;
          default:
            u(2);
            break;
        }
        break;
      case "[":
        o2 = /\[(?:\\.|.)*?\]/g, o2.lastIndex = n2, o2 = o2.exec(r2) || [], u(o2[0].length);
        break;
      case "|":
      case "^":
      case "$":
      case "*":
      case "+":
      case "?":
        l(1);
        break;
      case "{":
        o2 = /\{\d+,?\d*\}/g, o2.lastIndex = n2, o2 = o2.exec(r2), o2 ? l(o2[0].length) : u(1);
        break;
      case "(":
        if (r2[n2 + 1] === "?") switch (r2[n2 + 2]) {
          case ":":
            a += "(?:", n2 += 3, a += i() + "|$)";
            break;
          case "=":
            a += "(?=", n2 += 3, a += i() + ")";
            break;
          case "!":
            o2 = n2, n2 += 3, i(), a += r2.substr(o2, n2 - o2);
            break;
          case "<":
            switch (r2[n2 + 3]) {
              case "=":
              case "!":
                o2 = n2, n2 += 4, i(), a += r2.substr(o2, n2 - o2);
                break;
              default:
                l(r2.indexOf(">", n2) - n2 + 1), a += i() + "|$)";
                break;
            }
            break;
        }
        else l(1), a += i() + "|$)";
        break;
      case ")":
        return ++n2, a;
      default:
        u(1);
        break;
    }
    return a;
  }
  return m(i, "process"), new RegExp(i(), t.flags);
}
m(Oh, "partialRegExp");
function Lh(t) {
  return t.rules.find((e) => nt(e) && e.entry);
}
m(Lh, "getEntryRule");
function Dh(t) {
  return t.rules.filter((e) => St(e) && e.hidden);
}
m(Dh, "getHiddenRules");
function ha(t, e) {
  let r2 = /* @__PURE__ */ new Set(), n2 = Lh(t);
  if (!n2) return new Set(t.rules);
  let i = [n2].concat(Dh(t));
  for (let o2 of i) Mh(o2, r2, e);
  let a = /* @__PURE__ */ new Set();
  for (let o2 of t.rules) (r2.has(o2.name) || St(o2) && o2.hidden) && a.add(o2);
  return a;
}
m(ha, "getAllReachableRules");
function Mh(t, e, r2) {
  e.add(t.name), ar(t).forEach((n2) => {
    if (cr(n2) || r2 && cl(n2)) {
      let i = n2.rule.ref;
      i && !e.has(i.name) && Mh(i, e, r2);
    }
  });
}
m(Mh, "ruleDfs");
function nv(t) {
  let e = /* @__PURE__ */ new Set();
  return ar(t).forEach((r2) => {
    ur(r2) && (nt(r2.type.ref) && e.add(r2.type.ref), ua(r2.type.ref) && nt(r2.type.ref.$container) && e.add(r2.type.ref.$container));
  }), e;
}
m(nv, "getAllRulesUsedForCrossReferences");
function cf(t) {
  var _a135;
  if (t.terminal) return t.terminal;
  if (t.type.ref) return (_a135 = Tl(t.type.ref)) == null ? void 0 : _a135.terminal;
}
m(cf, "getCrossReferenceTerminal");
function ff(t) {
  return t.hidden && !ma(zi2(t));
}
m(ff, "isCommentTerminal");
function df(t, e) {
  return !t || !e ? [] : pf(t, e, t.astNode, true);
}
m(df, "findNodesForProperty");
function ga(t, e, r2) {
  if (!t || !e) return;
  let n2 = pf(t, e, t.astNode, true);
  if (n2.length !== 0) return r2 !== void 0 ? r2 = Math.max(0, Math.min(r2, n2.length - 1)) : r2 = 0, n2[r2];
}
m(ga, "findNodeForProperty");
function pf(t, e, r2, n2) {
  if (!n2) {
    let i = Fr(t.grammarSource, lr);
    if (i && i.feature === e) return [t];
  }
  return sr(t) && t.astNode === r2 ? t.content.flatMap((i) => pf(i, e, r2, false)) : [];
}
m(pf, "findNodesForPropertyInternal");
function iv(t, e) {
  return t ? hf(t, e, t == null ? void 0 : t.astNode) : [];
}
m(iv, "findNodesForKeyword");
function mf(t, e, r2) {
  if (!t) return;
  let n2 = hf(t, e, t == null ? void 0 : t.astNode);
  if (n2.length !== 0) return r2 !== void 0 ? r2 = Math.max(0, Math.min(r2, n2.length - 1)) : r2 = 0, n2[r2];
}
m(mf, "findNodeForKeyword");
function hf(t, e, r2) {
  if (t.astNode !== r2) return [];
  if (Ht(t.grammarSource) && t.grammarSource.value === e) return [t];
  let n2 = Vn(t).iterator(), i, a = [];
  do
    if (i = n2.next(), !i.done) {
      let o2 = i.value;
      o2.astNode === r2 ? Ht(o2.grammarSource) && o2.grammarSource.value === e && a.push(o2) : n2.prune();
    }
  while (!i.done);
  return a;
}
m(hf, "findNodesForKeywordInternal");
function gf(t) {
  var _a135;
  let e = t.astNode;
  for (; e === ((_a135 = t.container) == null ? void 0 : _a135.astNode); ) {
    let r2 = Fr(t.grammarSource, lr);
    if (r2) return r2;
    t = t.container;
  }
}
m(gf, "findAssignment");
function Tl(t) {
  let e = t;
  return ua(e) && (qr(e.$container) ? e = e.$container.$container : zr(e.$container) ? e = e.$container : vr(e.$container)), Fh(t, e, /* @__PURE__ */ new Map());
}
m(Tl, "findNameAssignment");
function Fh(t, e, r2) {
  var _a135;
  function n2(i, a) {
    let o2;
    return Fr(i, lr) || (o2 = Fh(a, a, r2)), r2.set(t, o2), o2;
  }
  if (m(n2, "go"), r2.has(t)) return r2.get(t);
  r2.set(t, void 0);
  for (let i of ar(e)) {
    if (lr(i) && i.feature.toLowerCase() === "name") return r2.set(t, i), i;
    if (cr(i) && nt(i.rule.ref)) return n2(i, i.rule.ref);
    if (ul(i) && ((_a135 = i.typeRef) == null ? void 0 : _a135.ref)) return n2(i, i.typeRef.ref);
  }
}
m(Fh, "findNameAssignmentInternal");
function Gh(t) {
  let e = t.$container;
  if (mn(e)) {
    let r2 = e.elements, n2 = r2.indexOf(t);
    for (let i = n2 - 1; i >= 0; i--) {
      let a = r2[i];
      if (qr(a)) return a;
      {
        let o2 = ar(r2[i]).find(qr);
        if (o2) return o2;
      }
    }
  }
  if (la(e)) return Gh(e);
}
m(Gh, "getActionAtElement");
function sv(t, e) {
  return t === "?" || t === "*" || mn(e) && !!e.guardCondition;
}
m(sv, "isOptionalCardinality");
function av(t) {
  return t === "*" || t === "+";
}
m(av, "isArrayCardinality");
function ov(t) {
  return t === "+=";
}
m(ov, "isArrayOperator");
function ya(t) {
  return Uh(t, /* @__PURE__ */ new Set());
}
m(ya, "isDataTypeRule");
function Uh(t, e) {
  if (e.has(t)) return true;
  e.add(t);
  for (let r2 of ar(t)) if (cr(r2)) {
    if (!r2.rule.ref || nt(r2.rule.ref) && !Uh(r2.rule.ref, e) || hn(r2.rule.ref)) return false;
  } else {
    if (lr(r2)) return false;
    if (qr(r2)) return false;
  }
  return !!t.definition;
}
m(Uh, "isDataTypeRuleInternal");
function lv(t) {
  return uf(t.type, /* @__PURE__ */ new Set());
}
m(lv, "isDataType");
function uf(t, e) {
  if (e.has(t)) return true;
  if (e.add(t), Pc(t)) return false;
  if (jc(t)) return false;
  if (Hc(t)) return t.types.every((r2) => uf(r2, e));
  if (ul(t)) {
    if (t.primitiveType !== void 0) return true;
    if (t.stringType !== void 0) return true;
    if (t.typeRef !== void 0) {
      let r2 = t.typeRef.ref;
      return fl(r2) ? uf(r2.type, e) : false;
    } else return false;
  } else return false;
}
m(uf, "isDataTypeInternal");
function Rl(t) {
  if (!St(t)) {
    if (t.inferredType) return t.inferredType.name;
    if (t.dataType) return t.dataType;
    if (t.returnType) {
      let e = t.returnType.ref;
      if (e) return e.name;
    }
  }
}
m(Rl, "getExplicitRuleType");
function yn(t) {
  if (zr(t)) return nt(t) && ya(t) ? t.name : Rl(t) ?? t.name;
  if (Gc(t) || fl(t) || Wc(t)) return t.name;
  if (qr(t)) {
    let e = zh(t);
    if (e) return e;
  } else if (ua(t)) return t.name;
  throw new Error("Cannot get name of Unknown Type");
}
m(yn, "getTypeName");
function zh(t) {
  var _a135;
  if (t.inferredType) return t.inferredType.name;
  if ((_a135 = t.type) == null ? void 0 : _a135.ref) return yn(t.type.ref);
}
m(zh, "getActionType");
function uv(t) {
  var _a135;
  return St(t) ? ((_a135 = t.type) == null ? void 0 : _a135.name) ?? "string" : nt(t) && ya(t) ? t.name : Rl(t) ?? t.name;
}
m(uv, "getRuleTypeName");
function yf(t) {
  var _a135;
  return St(t) ? ((_a135 = t.type) == null ? void 0 : _a135.name) ?? "string" : Rl(t) ?? t.name;
}
m(yf, "getRuleType");
function zi2(t) {
  let e = { s: false, i: false, u: false }, r2 = qi(t.definition, e), n2 = Object.entries(e).filter(([, i]) => i).map(([i]) => i).join("");
  return new RegExp(r2, n2);
}
m(zi2, "terminalRegex");
var Tf = /[\s\S]/.source;
function qi(t, e) {
  var _a135;
  if (Kc(t)) return cv(t);
  if (Vc(t)) return fv(t);
  if (Lc(t)) return mv(t);
  if (cl(t)) {
    let r2 = t.rule.ref;
    if (!r2) throw new Error("Missing rule reference.");
    return jr(qi(r2.definition), { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized });
  } else {
    if (Uc(t)) return pv(t);
    if (Yc(t)) return dv(t);
    if (Bc(t)) {
      let r2 = t.regex.lastIndexOf("/"), n2 = t.regex.substring(1, r2), i = t.regex.substring(r2 + 1);
      return e && (e.i = i.includes("i"), e.s = i.includes("s"), e.u = i.includes("u")), jr(n2, { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized, wrap: false });
    } else {
      if (Xc(t)) return jr(Tf, { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized });
      throw new Error(`Invalid terminal element: ${t == null ? void 0 : t.$type}, ${(_a135 = t == null ? void 0 : t.$cstNode) == null ? void 0 : _a135.text}`);
    }
  }
}
m(qi, "abstractElementToRegex");
function cv(t) {
  return jr(t.elements.map((e) => qi(e)).join("|"), { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized, wrap: false });
}
m(cv, "terminalAlternativesToRegex");
function fv(t) {
  return jr(t.elements.map((e) => qi(e)).join(""), { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized, wrap: false });
}
m(fv, "terminalGroupToRegex");
function dv(t) {
  return jr(`${Tf}*?${qi(t.terminal)}`, { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized });
}
m(dv, "untilTokenToRegex");
function pv(t) {
  return jr(`(?!${qi(t.terminal)})${Tf}*?`, { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized });
}
m(pv, "negateTokenToRegex");
function mv(t) {
  return t.right ? jr(`[${lf(t.left)}-${lf(t.right)}]`, { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized, wrap: false }) : jr(lf(t.left), { cardinality: t.cardinality, lookahead: t.lookahead, parenthesized: t.parenthesized, wrap: false });
}
m(mv, "characterRangeToRegex");
function lf(t) {
  return gn(t.value);
}
m(lf, "keywordToRegex");
function jr(t, e) {
  return (e.parenthesized || e.lookahead || e.wrap !== false) && (t = `(${e.lookahead ?? (e.parenthesized ? "" : "?:")}${t})`), e.cardinality ? `${t}${e.cardinality}` : t;
}
m(jr, "withCardinality");
function Rf(t) {
  let e = [], r2 = t.Grammar;
  for (let n2 of r2.rules) St(n2) && ff(n2) && af(zi2(n2)) && e.push(n2.name);
  return { multilineCommentRules: e, nameRegexp: pl };
}
m(Rf, "createGrammarConfig");
function ji(t) {
  console && console.error && console.error(`Error: ${t}`);
}
m(ji, "PRINT_ERROR");
function Ta(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
m(Ta, "PRINT_WARNING");
function Ra(t) {
  let e = (/* @__PURE__ */ new Date()).getTime(), r2 = t();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: r2 };
}
m(Ra, "timer");
function $a(t) {
  function e() {
  }
  m(e, "FakeConstructor"), e.prototype = t;
  let r2 = new e();
  function n2() {
    return typeof r2.bar;
  }
  return m(n2, "fakeAccess"), n2(), n2(), t;
  (0, eval)(t);
}
m($a, "toFastProperties");
function hv(t) {
  return gv(t) ? t.LABEL : t.name;
}
m(hv, "tokenLabel");
function gv(t) {
  return pr(t.LABEL) && t.LABEL !== "";
}
m(gv, "hasTokenLabel");
var _a9;
var jt = (_a9 = class {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), Zr(this.definition, (r2) => {
      r2.accept(e);
    });
  }
}, m(_a9, "AbstractProduction"), _a9);
var _a10;
var de = (_a10 = class extends jt {
  constructor(e) {
    super([]), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}, m(_a10, "NonTerminal"), _a10);
var _a11;
var kt = (_a11 = class extends jt {
  constructor(e) {
    super(e.definition), this.orgText = "", fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a11, "Rule"), _a11);
var _a12;
var Re = (_a12 = class extends jt {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = false, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a12, "Alternative"), _a12);
var _a13;
var pe = (_a13 = class extends jt {
  constructor(e) {
    super(e.definition), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a13, "Option"), _a13);
var _a14;
var $e = (_a14 = class extends jt {
  constructor(e) {
    super(e.definition), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a14, "RepetitionMandatory"), _a14);
var _a15;
var xe = (_a15 = class extends jt {
  constructor(e) {
    super(e.definition), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a15, "RepetitionMandatoryWithSeparator"), _a15);
var _a16;
var se = (_a16 = class extends jt {
  constructor(e) {
    super(e.definition), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a16, "Repetition"), _a16);
var _a17;
var ye = (_a17 = class extends jt {
  constructor(e) {
    super(e.definition), this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a17, "RepetitionWithSeparator"), _a17);
var _a18;
var Te = (_a18 = class extends jt {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = false, this.hasPredicates = false, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
}, m(_a18, "Alternation"), _a18);
var _a19;
var ne = (_a19 = class {
  constructor(e) {
    this.idx = 1, fi(this, Tm(e, (r2) => r2 !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}, m(_a19, "Terminal"), _a19);
function xl(t) {
  return Jr(t, Bi);
}
m(xl, "serializeGrammar");
function Bi(t) {
  function e(r2) {
    return Jr(r2, Bi);
  }
  if (m(e, "convertDefinition"), t instanceof de) {
    let r2 = { type: "NonTerminal", name: t.nonTerminalName, idx: t.idx };
    return pr(t.label) && (r2.label = t.label), r2;
  } else {
    if (t instanceof Re) return { type: "Alternative", definition: e(t.definition) };
    if (t instanceof pe) return { type: "Option", idx: t.idx, definition: e(t.definition) };
    if (t instanceof $e) return { type: "RepetitionMandatory", idx: t.idx, definition: e(t.definition) };
    if (t instanceof xe) return { type: "RepetitionMandatoryWithSeparator", idx: t.idx, separator: Bi(new ne({ terminalType: t.separator })), definition: e(t.definition) };
    if (t instanceof ye) return { type: "RepetitionWithSeparator", idx: t.idx, separator: Bi(new ne({ terminalType: t.separator })), definition: e(t.definition) };
    if (t instanceof se) return { type: "Repetition", idx: t.idx, definition: e(t.definition) };
    if (t instanceof Te) return { type: "Alternation", idx: t.idx, definition: e(t.definition) };
    if (t instanceof ne) {
      let r2 = { type: "Terminal", name: t.terminalType.name, label: hv(t.terminalType), idx: t.idx };
      pr(t.label) && (r2.terminalLabel = t.label);
      let n2 = t.terminalType.PATTERN;
      return t.terminalType.PATTERN && (r2.pattern = cm(n2) ? n2.source : n2), r2;
    } else {
      if (t instanceof kt) return { type: "Rule", name: t.name, orgText: t.orgText, definition: e(t.definition) };
      throw Error("non exhaustive match");
    }
  }
}
m(Bi, "serializeProduction");
var _a20;
var Nt = (_a20 = class {
  visit(e) {
    let r2 = e;
    switch (r2.constructor) {
      case de:
        return this.visitNonTerminal(r2);
      case Re:
        return this.visitAlternative(r2);
      case pe:
        return this.visitOption(r2);
      case $e:
        return this.visitRepetitionMandatory(r2);
      case xe:
        return this.visitRepetitionMandatoryWithSeparator(r2);
      case ye:
        return this.visitRepetitionWithSeparator(r2);
      case se:
        return this.visitRepetition(r2);
      case Te:
        return this.visitAlternation(r2);
      case ne:
        return this.visitTerminal(r2);
      case kt:
        return this.visitRule(r2);
      default:
        throw Error("non exhaustive match");
    }
  }
  visitNonTerminal(e) {
  }
  visitAlternative(e) {
  }
  visitOption(e) {
  }
  visitRepetition(e) {
  }
  visitRepetitionMandatory(e) {
  }
  visitRepetitionMandatoryWithSeparator(e) {
  }
  visitRepetitionWithSeparator(e) {
  }
  visitAlternation(e) {
  }
  visitTerminal(e) {
  }
  visitRule(e) {
  }
}, m(_a20, "GAstVisitor"), _a20);
function $f(t) {
  return t instanceof Re || t instanceof pe || t instanceof se || t instanceof $e || t instanceof xe || t instanceof ye || t instanceof ne || t instanceof kt;
}
m($f, "isSequenceProd");
function Qn(t, e = []) {
  return t instanceof pe || t instanceof se || t instanceof ye ? true : t instanceof Te ? fp(t.definition, (n2) => Qn(n2, e)) : t instanceof de && pm(e, t) ? false : t instanceof jt ? (t instanceof de && e.push(t), Ui(t.definition, (n2) => Qn(n2, e))) : false;
}
m(Qn, "isOptionalProd");
function xf(t) {
  return t instanceof Te;
}
m(xf, "isBranchingProd");
function Ot(t) {
  if (t instanceof de) return "SUBRULE";
  if (t instanceof pe) return "OPTION";
  if (t instanceof Te) return "OR";
  if (t instanceof $e) return "AT_LEAST_ONE";
  if (t instanceof xe) return "AT_LEAST_ONE_SEP";
  if (t instanceof ye) return "MANY_SEP";
  if (t instanceof se) return "MANY";
  if (t instanceof ne) return "CONSUME";
  throw Error("non exhaustive match");
}
m(Ot, "getProductionDslName");
var _a21;
var Br = (_a21 = class {
  walk(e, r2 = []) {
    Zr(e.definition, (n2, i) => {
      let a = Mi(e.definition, i + 1);
      if (n2 instanceof de) this.walkProdRef(n2, a, r2);
      else if (n2 instanceof ne) this.walkTerminal(n2, a, r2);
      else if (n2 instanceof Re) this.walkFlat(n2, a, r2);
      else if (n2 instanceof pe) this.walkOption(n2, a, r2);
      else if (n2 instanceof $e) this.walkAtLeastOne(n2, a, r2);
      else if (n2 instanceof xe) this.walkAtLeastOneSep(n2, a, r2);
      else if (n2 instanceof ye) this.walkManySep(n2, a, r2);
      else if (n2 instanceof se) this.walkMany(n2, a, r2);
      else if (n2 instanceof Te) this.walkOr(n2, a, r2);
      else throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, r2, n2) {
  }
  walkProdRef(e, r2, n2) {
  }
  walkFlat(e, r2, n2) {
    let i = r2.concat(n2);
    this.walk(e, i);
  }
  walkOption(e, r2, n2) {
    let i = r2.concat(n2);
    this.walk(e, i);
  }
  walkAtLeastOne(e, r2, n2) {
    let i = [new pe({ definition: e.definition })].concat(r2, n2);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, r2, n2) {
    let i = qh(e, r2, n2);
    this.walk(e, i);
  }
  walkMany(e, r2, n2) {
    let i = [new pe({ definition: e.definition })].concat(r2, n2);
    this.walk(e, i);
  }
  walkManySep(e, r2, n2) {
    let i = qh(e, r2, n2);
    this.walk(e, i);
  }
  walkOr(e, r2, n2) {
    let i = r2.concat(n2);
    Zr(e.definition, (a) => {
      let o2 = new Re({ definition: [a] });
      this.walk(o2, i);
    });
  }
}, m(_a21, "RestWalker"), _a21);
function qh(t, e, r2) {
  return [new pe({ definition: [new ne({ terminalType: t.separator })].concat(t.definition) })].concat(e, r2);
}
m(qh, "restForRepetitionWithSeparator");
function ei(t) {
  if (t instanceof de) return ei(t.referencedRule);
  if (t instanceof ne) return Rv(t);
  if ($f(t)) return yv(t);
  if (xf(t)) return Tv(t);
  throw Error("non exhaustive match");
}
m(ei, "first");
function yv(t) {
  let e = [], r2 = t.definition, n2 = 0, i = r2.length > n2, a, o2 = true;
  for (; i && o2; ) a = r2[n2], o2 = Qn(a), e = e.concat(ei(a)), n2 = n2 + 1, i = r2.length > n2;
  return mp(e);
}
m(yv, "firstForSequence");
function Tv(t) {
  let e = Jr(t.definition, (r2) => ei(r2));
  return mp(Qr(e));
}
m(Tv, "firstForBranching");
function Rv(t) {
  return [t.terminalType];
}
m(Rv, "firstForTerminal");
var vl = "_~IN~_";
var _a22;
var vf = (_a22 = class extends Br {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, r2, n2) {
  }
  walkProdRef(e, r2, n2) {
    let i = $v(e.referencedRule, e.idx) + this.topProd.name, a = r2.concat(n2), o2 = new Re({ definition: a }), l = ei(o2);
    this.follows[i] = l;
  }
}, m(_a22, "ResyncFollowsWalker"), _a22);
function jh(t) {
  let e = {};
  return Zr(t, (r2) => {
    let n2 = new vf(r2).startWalking();
    fi(e, n2);
  }), e;
}
m(jh, "computeAllProdsFollows");
function $v(t, e) {
  return t.name + e + vl;
}
m($v, "buildBetweenProdsFollowPrefix");
var El = {};
var xv = new Jn();
function Wi(t) {
  let e = t.toString();
  if (El.hasOwnProperty(e)) return El[e];
  {
    let r2 = xv.pattern(e);
    return El[e] = r2, r2;
  }
}
m(Wi, "getRegExpAst");
function Bh() {
  El = {};
}
m(Bh, "clearRegExpParserCache");
var Kh = "Complement Sets are not supported for first char optimization";
var xa = `Unable to use "first char" lexer optimizations:
`;
function Vh(t, e = false) {
  try {
    let r2 = Wi(t);
    return Ef(r2.value, {}, r2.flags.ignoreCase);
  } catch (r2) {
    if (r2.message === Kh) e && Ta(`${xa}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let n2 = "";
      e && (n2 = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), ji(`${xa}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + n2);
    }
  }
  return [];
}
m(Vh, "getOptimizedStartCodesIndices");
function Ef(t, e, r2) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++) Ef(t.value[i], e, r2);
      break;
    case "Alternative":
      let n2 = t.value;
      for (let i = 0; i < n2.length; i++) {
        let a = n2[i];
        switch (a.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "Lookbehind":
          case "NegativeLookbehind":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        let o2 = a;
        switch (o2.type) {
          case "Character":
            Al(o2.value, e, r2);
            break;
          case "Set":
            if (o2.complement === true) throw Error(Kh);
            Zr(o2.value, (u) => {
              if (typeof u == "number") Al(u, e, r2);
              else {
                let c = u;
                if (r2 === true) for (let d = c.from; d <= c.to; d++) Al(d, e, r2);
                else {
                  for (let d = c.from; d <= c.to && d < Ki2; d++) Al(d, e, r2);
                  if (c.to >= Ki2) {
                    let d = c.from >= Ki2 ? c.from : Ki2, m3 = c.to, h2 = Ar(d), y = Ar(m3);
                    for (let k = h2; k <= y; k++) e[k] = k;
                  }
                }
              }
            });
            break;
          case "Group":
            Ef(o2.value, e, r2);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        let l = o2.quantifier !== void 0 && o2.quantifier.atLeast === 0;
        if (o2.type === "Group" && Af(o2) === false || o2.type !== "Group" && l === false) break;
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return Xr(e);
}
m(Ef, "firstCharOptimizedIndices");
function Al(t, e, r2) {
  let n2 = Ar(t);
  e[n2] = n2, r2 === true && vv(t, e);
}
m(Al, "addOptimizedIdxToResult");
function vv(t, e) {
  let r2 = String.fromCharCode(t), n2 = r2.toUpperCase();
  if (n2 !== r2) {
    let i = Ar(n2.charCodeAt(0));
    e[i] = i;
  } else {
    let i = r2.toLowerCase();
    if (i !== r2) {
      let a = Ar(i.charCodeAt(0));
      e[a] = a;
    }
  }
}
m(vv, "handleIgnoreCase");
function Wh(t, e) {
  return Ki(t.value, (r2) => {
    if (typeof r2 == "number") return pm(e, r2);
    {
      let n2 = r2;
      return Ki(e, (i) => n2.from <= i && i <= n2.to) !== void 0;
    }
  });
}
m(Wh, "findCode");
function Af(t) {
  let e = t.quantifier;
  return e && e.atLeast === 0 ? true : t.value ? N(t.value) ? Ui(t.value, Af) : Af(t.value) : false;
}
m(Af, "isWholeOptional");
var _a23;
var Cf = (_a23 = class extends Er {
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = false;
  }
  visitChildren(e) {
    if (this.found !== true) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
        case "Lookbehind":
          this.visitLookbehind(e);
          return;
        case "NegativeLookbehind":
          this.visitNegativeLookbehind(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    pm(this.targetCharCodes, e.value) && (this.found = true);
  }
  visitSet(e) {
    e.complement ? Wh(e, this.targetCharCodes) === void 0 && (this.found = true) : Wh(e, this.targetCharCodes) !== void 0 && (this.found = true);
  }
}, m(_a23, "CharCodeFinder"), _a23);
function Cl(t, e) {
  if (e instanceof RegExp) {
    let r2 = Wi(e), n2 = new Cf(t);
    return n2.visit(r2), n2.found;
  } else return Ki(e, (r2) => pm(t, r2.charCodeAt(0))) !== void 0;
}
m(Cl, "canMatchCharCode");
var ti = "PATTERN";
var Vi2 = "defaultMode";
var Sl = "modes";
var kf = typeof new RegExp("(?:)").sticky == "boolean";
function Xh(t, e) {
  e = Nf(e, { useSticky: kf, debug: false, safeMode: false, positionTracking: "full", lineTerminatorCharacters: ["\r", `
`], tracer: m((P, E) => E(), "tracer") });
  let r2 = e.tracer;
  r2("initCharCodeToOptimizedIndexMap", () => {
    zv();
  });
  let n2;
  r2("Reject Lexer.NA", () => {
    n2 = Qm(t, (P) => P[ti] === we.NA);
  });
  let i = false, a;
  r2("Transform Patterns", () => {
    i = false, a = Jr(n2, (P) => {
      let E = P[ti];
      if (cm(E)) {
        let H = E.source;
        return H.length === 1 && H !== "^" && H !== "$" && H !== "." && !E.ignoreCase ? H : H.length === 2 && H[0] === "\\" && !pm(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], H[1]) ? H[1] : e.useSticky ? Yh(E) : Hh(E);
      } else {
        if (T(E)) return i = true, { exec: E };
        if (typeof E == "object") return i = true, E;
        if (typeof E == "string") {
          if (E.length === 1) return E;
          {
            let H = E.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), U = new RegExp(H);
            return e.useSticky ? Yh(U) : Hh(U);
          }
        } else throw Error("non exhaustive match");
      }
    });
  });
  let o2, l, u, c, d;
  r2("misc mapping", () => {
    o2 = Jr(n2, (P) => P.tokenTypeIdx), l = Jr(n2, (P) => {
      let E = P.GROUP;
      if (E !== we.SKIPPED) {
        if (pr(E)) return E;
        if (sn(E)) return false;
        throw Error("non exhaustive match");
      }
    }), u = Jr(n2, (P) => {
      let E = P.LONGER_ALT;
      if (E) return N(E) ? Jr(E, (U) => lm(n2, U)) : [lm(n2, E)];
    }), c = Jr(n2, (P) => P.PUSH_MODE), d = Jr(n2, (P) => fm(P, "POP_MODE"));
  });
  let m3;
  r2("Line Terminator Handling", () => {
    let P = ig(e.lineTerminatorCharacters);
    m3 = Jr(n2, (E) => false), e.positionTracking !== "onlyOffset" && (m3 = Jr(n2, (E) => fm(E, "LINE_BREAKS") ? !!E.LINE_BREAKS : ng(E, P) === false && Cl(P, E.PATTERN)));
  });
  let h2, y, k, w;
  r2("Misc Mapping #2", () => {
    h2 = Jr(n2, tg), y = Jr(a, Gv), k = Rn(n2, (P, E) => {
      let H = E.GROUP;
      return pr(H) && H !== we.SKIPPED && (P[H] = []), P;
    }, {}), w = Jr(a, (P, E) => ({ pattern: a[E], longerAlt: u[E], canLineTerminator: m3[E], isCustom: h2[E], short: y[E], group: l[E], push: c[E], pop: d[E], tokenTypeIdx: o2[E], tokenType: n2[E] }));
  });
  let q2 = true, M = [];
  return e.safeMode || r2("First Char Optimization", () => {
    M = Rn(n2, (P, E, H) => {
      if (typeof E.PATTERN == "string") {
        let U = E.PATTERN.charCodeAt(0), he = Ar(U);
        Sf(P, he, w[H]);
      } else if (N(E.START_CHARS_HINT)) {
        let U;
        Zr(E.START_CHARS_HINT, (he) => {
          let mr = typeof he == "string" ? he.charCodeAt(0) : he, Xe = Ar(mr);
          U !== Xe && (U = Xe, Sf(P, Xe, w[H]));
        });
      } else if (cm(E.PATTERN)) if (E.PATTERN.unicode) q2 = false, e.ensureOptimizations && ji(`${xa}	Unable to analyze < ${E.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
      else {
        let U = Vh(E.PATTERN, e.ensureOptimizations);
        Cr(U) && (q2 = false), Zr(U, (he) => {
          Sf(P, he, w[H]);
        });
      }
      else e.ensureOptimizations && ji(`${xa}	TokenType: <${E.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), q2 = false;
      return P;
    }, []);
  }), { emptyGroups: k, patternIdxToConfig: w, charCodeToPatternIdxToConfig: M, hasCustom: i, canBeOptimized: q2 };
}
m(Xh, "analyzeTokenTypes");
function Jh(t, e) {
  let r2 = [], n2 = Av(t);
  r2 = r2.concat(n2.errors);
  let i = Cv(n2.valid), a = i.valid;
  return r2 = r2.concat(i.errors), r2 = r2.concat(Ev(a)), r2 = r2.concat(Pv(a)), r2 = r2.concat(Ov(a, e)), r2 = r2.concat(Lv(a)), r2;
}
m(Jh, "validatePatterns");
function Ev(t) {
  let e = [], r2 = fn(t, (n2) => cm(n2[ti]));
  return e = e.concat(kv(r2)), e = e.concat(Iv(r2)), e = e.concat(bv(r2)), e = e.concat(_v(r2)), e = e.concat(Nv(r2)), e;
}
m(Ev, "validateRegExpPattern");
function Av(t) {
  let e = fn(t, (i) => !fm(i, ti)), r2 = Jr(e, (i) => ({ message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property", type: Ne.MISSING_PATTERN, tokenTypes: [i] })), n2 = Ri(t, e);
  return { errors: r2, valid: n2 };
}
m(Av, "findMissingPatterns");
function Cv(t) {
  let e = fn(t, (i) => {
    let a = i[ti];
    return !cm(a) && !T(a) && !fm(a, "exec") && !pr(a);
  }), r2 = Jr(e, (i) => ({ message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.", type: Ne.INVALID_PATTERN, tokenTypes: [i] })), n2 = Ri(t, e);
  return { errors: r2, valid: n2 };
}
m(Cv, "findInvalidPatterns");
var Sv = /[^\\][$]/;
function kv(t) {
  const _e = class _e extends Er {
    constructor() {
      super(...arguments), this.found = false;
    }
    visitEndAnchor(a) {
      this.found = true;
    }
  };
  m(_e, "EndAnchorFinder");
  let e = _e;
  let r2 = fn(t, (i) => {
    let a = i.PATTERN;
    try {
      let o2 = Wi(a), l = new e();
      return l.visit(o2), l.found;
    } catch {
      return Sv.test(a.source);
    }
  });
  return Jr(r2, (i) => ({ message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: Ne.EOI_ANCHOR_FOUND, tokenTypes: [i] }));
}
m(kv, "findEndOfInputAnchor");
function Nv(t) {
  let e = fn(t, (n2) => n2.PATTERN.test(""));
  return Jr(e, (n2) => ({ message: "Token Type: ->" + n2.name + "<- static 'PATTERN' must not match an empty string", type: Ne.EMPTY_MATCH_PATTERN, tokenTypes: [n2] }));
}
m(Nv, "findEmptyMatchRegExps");
var wv = /[^\\[][\^]|^\^/;
function Iv(t) {
  const _e = class _e extends Er {
    constructor() {
      super(...arguments), this.found = false;
    }
    visitStartAnchor(a) {
      this.found = true;
    }
  };
  m(_e, "StartAnchorFinder");
  let e = _e;
  let r2 = fn(t, (i) => {
    let a = i.PATTERN;
    try {
      let o2 = Wi(a), l = new e();
      return l.visit(o2), l.found;
    } catch {
      return wv.test(a.source);
    }
  });
  return Jr(r2, (i) => ({ message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: Ne.SOI_ANCHOR_FOUND, tokenTypes: [i] }));
}
m(Iv, "findStartOfInputAnchor");
function bv(t) {
  let e = fn(t, (n2) => {
    let i = n2[ti];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return Jr(e, (n2) => ({ message: "Token Type: ->" + n2.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: Ne.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [n2] }));
}
m(bv, "findUnsupportedFlags");
function _v(t) {
  let e = [], r2 = Jr(t, (a) => Rn(t, (o2, l) => (a.PATTERN.source === l.PATTERN.source && !pm(e, l) && l.PATTERN !== we.NA && (e.push(l), o2.push(l)), o2), []));
  r2 = Ai(r2);
  let n2 = fn(r2, (a) => a.length > 1);
  return Jr(n2, (a) => {
    let o2 = Jr(a, (u) => u.name);
    return { message: `The same RegExp pattern ->${De(a).PATTERN}<-has been used in all of the following Token Types: ${o2.join(", ")} <-`, type: Ne.DUPLICATE_PATTERNS_FOUND, tokenTypes: a };
  });
}
m(_v, "findDuplicatePatterns");
function Pv(t) {
  let e = fn(t, (n2) => {
    if (!fm(n2, "GROUP")) return false;
    let i = n2.GROUP;
    return i !== we.SKIPPED && i !== we.NA && !pr(i);
  });
  return Jr(e, (n2) => ({ message: "Token Type: ->" + n2.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: Ne.INVALID_GROUP_TYPE_FOUND, tokenTypes: [n2] }));
}
m(Pv, "findInvalidGroupType");
function Ov(t, e) {
  let r2 = fn(t, (i) => i.PUSH_MODE !== void 0 && !pm(e, i.PUSH_MODE));
  return Jr(r2, (i) => ({ message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`, type: Ne.PUSH_MODE_DOES_NOT_EXIST, tokenTypes: [i] }));
}
m(Ov, "findModesThatDoNotExist");
function Lv(t) {
  let e = [], r2 = Rn(t, (n2, i, a) => {
    let o2 = i.PATTERN;
    return o2 === we.NA || (pr(o2) ? n2.push({ str: o2, idx: a, tokenType: i }) : cm(o2) && Mv(o2) && n2.push({ str: o2.source, idx: a, tokenType: i })), n2;
  }, []);
  return Zr(t, (n2, i) => {
    Zr(r2, ({ str: a, idx: o2, tokenType: l }) => {
      if (i < o2 && Dv(a, n2.PATTERN)) {
        let u = `Token: ->${l.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n2.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({ message: u, type: Ne.UNREACHABLE_PATTERN, tokenTypes: [n2, l] });
      }
    });
  }), e;
}
m(Lv, "findUnreachablePatterns");
function Dv(t, e) {
  if (cm(e)) {
    if (Fv(e)) return false;
    let r2 = e.exec(t);
    return r2 !== null && r2.index === 0;
  } else {
    if (T(e)) return e(t, 0, [], {});
    if (fm(e, "exec")) return e.exec(t, 0, [], {});
    if (typeof e == "string") return e === t;
    throw Error("non exhaustive match");
  }
}
m(Dv, "tryToMatchStrToPattern");
function Mv(t) {
  return Ki([".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"], (r2) => t.source.indexOf(r2) !== -1) === void 0;
}
m(Mv, "noMetaChar");
function Fv(t) {
  return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(t.source);
}
m(Fv, "usesLookAheadOrBehind");
function Hh(t) {
  let e = t.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${t.source})`, e);
}
m(Hh, "addStartOfInput");
function Yh(t) {
  let e = t.ignoreCase ? "iy" : "y";
  return new RegExp(`${t.source}`, e);
}
m(Yh, "addStickyFlag");
function Zh(t, e, r2) {
  let n2 = [];
  return fm(t, Vi2) || n2.push({ message: "A MultiMode Lexer cannot be initialized without a <" + Vi2 + `> property in its definition
`, type: Ne.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE }), fm(t, Sl) || n2.push({ message: "A MultiMode Lexer cannot be initialized without a <" + Sl + `> property in its definition
`, type: Ne.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY }), fm(t, Sl) && fm(t, Vi2) && !fm(t.modes, t.defaultMode) && n2.push({ message: `A MultiMode Lexer cannot be initialized with a ${Vi2}: <${t.defaultMode}>which does not exist
`, type: Ne.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST }), fm(t, Sl) && Zr(t.modes, (i, a) => {
    Zr(i, (o2, l) => {
      if (sn(o2)) n2.push({ message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${a}> at index: <${l}>
`, type: Ne.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED });
      else if (fm(o2, "LONGER_ALT")) {
        let u = N(o2.LONGER_ALT) ? o2.LONGER_ALT : [o2.LONGER_ALT];
        Zr(u, (c) => {
          !sn(c) && !pm(i, c) && n2.push({ message: `A MultiMode Lexer cannot be initialized with a longer_alt <${c.name}> on token <${o2.name}> outside of mode <${a}>
`, type: Ne.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE });
        });
      }
    });
  }), n2;
}
m(Zh, "performRuntimeChecks");
function Qh(t, e, r2) {
  let n2 = [], i = false, a = Ai(Qr(Xr(t.modes))), o2 = Qm(a, (u) => u[ti] === we.NA), l = ig(r2);
  return e && Zr(o2, (u) => {
    let c = ng(u, l);
    if (c !== false) {
      let m3 = { message: Uv(u, c), type: c.issue, tokenType: u };
      n2.push(m3);
    } else fm(u, "LINE_BREAKS") ? u.LINE_BREAKS === true && (i = true) : Cl(l, u.PATTERN) && (i = true);
  }), e && !i && n2.push({ message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`, type: Ne.NO_LINE_BREAKS_FLAGS }), n2;
}
m(Qh, "performWarningRuntimeChecks");
function eg(t) {
  let e = {}, r2 = h(t);
  return Zr(r2, (n2) => {
    let i = t[n2];
    if (N(i)) e[n2] = [];
    else throw Error("non exhaustive match");
  }), e;
}
m(eg, "cloneEmptyGroups");
function tg(t) {
  let e = t.PATTERN;
  if (cm(e)) return false;
  if (T(e)) return true;
  if (fm(e, "exec")) return true;
  if (pr(e)) return false;
  throw Error("non exhaustive match");
}
m(tg, "isCustomPattern");
function Gv(t) {
  return pr(t) && t.length === 1 ? t.charCodeAt(0) : false;
}
m(Gv, "isShortPattern");
var rg = { test: m(function(t) {
  let e = t.length;
  for (let r2 = this.lastIndex; r2 < e; r2++) {
    let n2 = t.charCodeAt(r2);
    if (n2 === 10) return this.lastIndex = r2 + 1, true;
    if (n2 === 13) return t.charCodeAt(r2 + 1) === 10 ? this.lastIndex = r2 + 2 : this.lastIndex = r2 + 1, true;
  }
  return false;
}, "test"), lastIndex: 0 };
function ng(t, e) {
  if (fm(t, "LINE_BREAKS")) return false;
  if (cm(t.PATTERN)) {
    try {
      Cl(e, t.PATTERN);
    } catch (r2) {
      return { issue: Ne.IDENTIFY_TERMINATOR, errMsg: r2.message };
    }
    return false;
  } else {
    if (pr(t.PATTERN)) return false;
    if (tg(t)) return { issue: Ne.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
m(ng, "checkLineBreaksIssues");
function Uv(t, e) {
  if (e.issue === Ne.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === Ne.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
m(Uv, "buildLineBreakIssueMessage");
function ig(t) {
  return Jr(t, (r2) => pr(r2) ? r2.charCodeAt(0) : r2);
}
m(ig, "getCharCodes");
function Sf(t, e, r2) {
  t[e] === void 0 ? t[e] = [r2] : t[e].push(r2);
}
m(Sf, "addToMapOfArrays");
var Ki2 = 256;
var kl = [];
function Ar(t) {
  return t < Ki2 ? t : kl[t];
}
m(Ar, "charCodeToOptimizedIndex");
function zv() {
  if (Cr(kl)) {
    kl = new Array(65536);
    for (let t = 0; t < 65536; t++) kl[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
m(zv, "initCharCodeToOptimizedIndexMap");
function Wr(t, e) {
  let r2 = t.tokenTypeIdx;
  return r2 === e.tokenTypeIdx ? true : e.isParent === true && e.categoryMatchesMap[r2] === true;
}
m(Wr, "tokenStructuredMatcher");
function Hi(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
m(Hi, "tokenStructuredMatcherNoCategories");
var sg = 1;
var og = {};
function Kr(t) {
  let e = qv(t);
  jv(e), Wv(e), Bv(e), Zr(e, (r2) => {
    r2.isParent = r2.categoryMatches.length > 0;
  });
}
m(Kr, "augmentTokenTypes");
function qv(t) {
  let e = _f(t), r2 = t, n2 = true;
  for (; n2; ) {
    r2 = Ai(Qr(Jr(r2, (a) => a.CATEGORIES)));
    let i = Ri(r2, e);
    e = e.concat(i), Cr(i) ? n2 = false : r2 = i;
  }
  return e;
}
m(qv, "expandCategories");
function jv(t) {
  Zr(t, (e) => {
    Nf2(e) || (og[sg] = e, e.tokenTypeIdx = sg++), ag(e) && !N(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), ag(e) || (e.CATEGORIES = []), Kv(e) || (e.categoryMatches = []), Vv(e) || (e.categoryMatchesMap = {});
  });
}
m(jv, "assignTokenDefaultProps");
function Bv(t) {
  Zr(t, (e) => {
    e.categoryMatches = [], Zr(e.categoryMatchesMap, (r2, n2) => {
      e.categoryMatches.push(og[n2].tokenTypeIdx);
    });
  });
}
m(Bv, "assignCategoriesTokensProp");
function Wv(t) {
  Zr(t, (e) => {
    lg([], e);
  });
}
m(Wv, "assignCategoriesMapProp");
function lg(t, e) {
  Zr(t, (r2) => {
    e.categoryMatchesMap[r2.tokenTypeIdx] = true;
  }), Zr(e.CATEGORIES, (r2) => {
    let n2 = t.concat(e);
    pm(n2, r2) || lg(n2, r2);
  });
}
m(lg, "singleAssignCategoriesToksMap");
function Nf2(t) {
  return fm(t, "tokenTypeIdx");
}
m(Nf2, "hasShortKeyProperty");
function ag(t) {
  return fm(t, "CATEGORIES");
}
m(ag, "hasCategoriesProperty");
function Kv(t) {
  return fm(t, "categoryMatches");
}
m(Kv, "hasExtendingTokensTypesProperty");
function Vv(t) {
  return fm(t, "categoryMatchesMap");
}
m(Vv, "hasExtendingTokensTypesMapProperty");
function ug(t) {
  return fm(t, "tokenTypeIdx");
}
m(ug, "isTokenType");
var Yi = { buildUnableToPopLexerModeMessage(t) {
  return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
}, buildUnexpectedCharactersMessage(t, e, r2, n2, i, a) {
  return `unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r2} characters.`;
} };
var Ne;
(function(t) {
  t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(Ne || (Ne = {}));
var va = { deferDefinitionErrorsHandling: false, positionTracking: "full", lineTerminatorsPattern: /\n|\r\n?/g, lineTerminatorCharacters: [`
`, "\r"], ensureOptimizations: false, safeMode: false, errorMessageProvider: Yi, traceInitPerf: false, skipValidations: false, recoveryEnabled: true };
Object.freeze(va);
var _a24;
var we = (_a24 = class {
  constructor(e, r2 = va) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = true, this.trackEndLines = true, this.hasCustom = false, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, a) => {
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        let o2 = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${o2}--> <${i}>`);
        let { time: l, value: u } = Ra(a), c = l > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && c(`${o2}<-- <${i}> time: ${l}ms`), this.traceInitIndent--, u;
      } else return a();
    }, typeof r2 == "boolean") throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = fi({}, va, r2);
    let n2 = this.config.traceInitPerf;
    n2 === true ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = true) : typeof n2 == "number" && (this.traceInitMaxIdent = n2, this.traceInitPerf = true), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, a = true;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === va.lineTerminatorsPattern) this.config.lineTerminatorsPattern = rg;
        else if (this.config.lineTerminatorCharacters === va.lineTerminatorCharacters) throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (r2.safeMode && r2.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), N(e) ? i = { modes: { defaultMode: _f(e) }, defaultMode: Vi2 } : (a = false, i = _f(e));
      }), this.config.skipValidations === false && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Zh(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Qh(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, Zr(i.modes, (l, u) => {
        i.modes[u] = Qm(l, (c) => sn(c));
      });
      let o2 = h(i.modes);
      if (Zr(i.modes, (l, u) => {
        this.TRACE_INIT(`Mode: <${u}> processing`, () => {
          if (this.modes.push(u), this.config.skipValidations === false && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Jh(l, o2));
          }), Cr(this.lexerDefinitionErrors)) {
            Kr(l);
            let c;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              c = Xh(l, { lineTerminatorCharacters: this.config.lineTerminatorCharacters, positionTracking: r2.positionTracking, ensureOptimizations: r2.ensureOptimizations, safeMode: r2.safeMode, tracer: this.TRACE_INIT });
            }), this.patternIdxToConfig[u] = c.patternIdxToConfig, this.charCodeToPatternIdxToConfig[u] = c.charCodeToPatternIdxToConfig, this.emptyGroups = fi({}, this.emptyGroups, c.emptyGroups), this.hasCustom = c.hasCustom || this.hasCustom, this.canModeBeOptimized[u] = c.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !Cr(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        let u = Jr(this.lexerDefinitionErrors, (c) => c.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + u);
      }
      Zr(this.lexerDefinitionWarning, (l) => {
        Ta(l.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (kf ? (this.chopInput = Y, this.match = this.matchWithTest) : (this.updateLastIndex = kr, this.match = this.matchWithExec), a && (this.handleModes = kr), this.trackStartLines === false && (this.computeNewColumn = Y), this.trackEndLines === false && (this.updateTokenEndLineColumnLocation = kr), /full/i.test(this.config.positionTracking)) this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking)) this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking)) this.createTokenInstance = this.createOffsetOnlyToken;
        else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        let l = Rn(this.canModeBeOptimized, (u, c, d) => (c === false && u.push(d), u), []);
        if (r2.ensureOptimizations && !Cr(l)) throw Error(`Lexer Modes: < ${l.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        Bh();
      }), this.TRACE_INIT("toFastProperties", () => {
        $a(this);
      });
    });
  }
  tokenize(e, r2 = this.defaultMode) {
    if (!Cr(this.lexerDefinitionErrors)) {
      let i = Jr(this.lexerDefinitionErrors, (a) => a.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + i);
    }
    return this.tokenizeInternal(e, r2);
  }
  tokenizeInternal(e, r2) {
    let n2, i, a, o2, l, u, c, d, m3, h2, y, k, w, q2, M, P, E = e, H = E.length, U = 0, he = 0, mr = this.hasCustom ? 0 : Math.floor(e.length / 10), Xe = new Array(mr), tr = [], Vt = this.trackStartLines ? 1 : void 0, C = this.trackStartLines ? 1 : void 0, T2 = eg(this.emptyGroups), L = this.trackStartLines, O = this.config.lineTerminatorsPattern, R = 0, x = [], A = [], _ = [], F = [];
    Object.freeze(F);
    let N2;
    function Y2() {
      return x;
    }
    m(Y2, "getPossiblePatternsSlow");
    function Q(rt) {
      let bt = Ar(rt), tn = A[bt];
      return tn === void 0 ? F : tn;
    }
    m(Q, "getPossiblePatternsOptimized");
    let Be = m((rt) => {
      if (_.length === 1 && rt.tokenType.PUSH_MODE === void 0) {
        let bt = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(rt);
        tr.push({ offset: rt.startOffset, line: rt.startLine, column: rt.startColumn, length: rt.image.length, message: bt });
      } else {
        _.pop();
        let bt = Df(_);
        x = this.patternIdxToConfig[bt], A = this.charCodeToPatternIdxToConfig[bt], R = x.length;
        let tn = this.canModeBeOptimized[bt] && this.config.safeMode === false;
        A && tn ? N2 = Q : N2 = Y2;
      }
    }, "pop_mode");
    function ce(rt) {
      _.push(rt), A = this.charCodeToPatternIdxToConfig[rt], x = this.patternIdxToConfig[rt], R = x.length, R = x.length;
      let bt = this.canModeBeOptimized[rt] && this.config.safeMode === false;
      A && bt ? N2 = Q : N2 = Y2;
    }
    m(ce, "push_mode"), ce.call(this, r2);
    let _e, hr = this.config.recoveryEnabled;
    for (; U < H; ) {
      u = null;
      let rt = E.charCodeAt(U), bt = N2(rt), tn = bt.length;
      for (n2 = 0; n2 < tn; n2++) {
        _e = bt[n2];
        let xt = _e.pattern;
        c = null;
        let rr = _e.short;
        if (rr !== false ? rt === rr && (u = xt) : _e.isCustom === true ? (P = xt.exec(E, U, Xe, T2), P !== null ? (u = P[0], P.payload !== void 0 && (c = P.payload)) : u = null) : (this.updateLastIndex(xt, U), u = this.match(xt, e, U)), u !== null) {
          if (l = _e.longerAlt, l !== void 0) {
            let at = l.length;
            for (a = 0; a < at; a++) {
              let nr = x[l[a]], Or = nr.pattern;
              if (d = null, nr.isCustom === true ? (P = Or.exec(E, U, Xe, T2), P !== null ? (o2 = P[0], P.payload !== void 0 && (d = P.payload)) : o2 = null) : (this.updateLastIndex(Or, U), o2 = this.match(Or, e, U)), o2 && o2.length > u.length) {
                u = o2, c = d, _e = nr;
                break;
              }
            }
          }
          break;
        }
      }
      if (u !== null) {
        if (m3 = u.length, h2 = _e.group, h2 !== void 0 && (y = _e.tokenTypeIdx, k = this.createTokenInstance(u, U, y, _e.tokenType, Vt, C, m3), this.handlePayload(k, c), h2 === false ? he = this.addToken(Xe, he, k) : T2[h2].push(k)), e = this.chopInput(e, m3), U = U + m3, C = this.computeNewColumn(C, m3), L === true && _e.canLineTerminator === true) {
          let xt = 0, rr, at;
          O.lastIndex = 0;
          do
            rr = O.test(u), rr === true && (at = O.lastIndex - 1, xt++);
          while (rr === true);
          xt !== 0 && (Vt = Vt + xt, C = m3 - at, this.updateTokenEndLineColumnLocation(k, h2, at, xt, Vt, C, m3));
        }
        this.handleModes(_e, Be, ce, k);
      } else {
        let xt = U, rr = Vt, at = C, nr = hr === false;
        for (; nr === false && U < H; ) for (e = this.chopInput(e, 1), U++, i = 0; i < R; i++) {
          let Or = x[i], rn = Or.pattern, Bo = Or.short;
          if (Bo !== false ? E.charCodeAt(U) === Bo && (nr = true) : Or.isCustom === true ? nr = rn.exec(E, U, Xe, T2) !== null : (this.updateLastIndex(rn, U), nr = rn.exec(e) !== null), nr === true) break;
        }
        if (w = U - xt, C = this.computeNewColumn(C, w), M = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(E, xt, w, rr, at, Df(_)), tr.push({ offset: xt, line: rr, column: at, length: w, message: M }), hr === false) break;
      }
    }
    return this.hasCustom || (Xe.length = he), { tokens: Xe, groups: T2, errors: tr };
  }
  handleModes(e, r2, n2, i) {
    if (e.pop === true) {
      let a = e.push;
      r2(i), a !== void 0 && n2.call(this, a);
    } else e.push !== void 0 && n2.call(this, e.push);
  }
  chopInput(e, r2) {
    return e.substring(r2);
  }
  updateLastIndex(e, r2) {
    e.lastIndex = r2;
  }
  updateTokenEndLineColumnLocation(e, r2, n2, i, a, o2, l) {
    let u, c;
    r2 !== void 0 && (u = n2 === l - 1, c = u ? -1 : 0, i === 1 && u === true || (e.endLine = a + c, e.endColumn = o2 - 1 + -c));
  }
  computeNewColumn(e, r2) {
    return e + r2;
  }
  createOffsetOnlyToken(e, r2, n2, i) {
    return { image: e, startOffset: r2, tokenTypeIdx: n2, tokenType: i };
  }
  createStartOnlyToken(e, r2, n2, i, a, o2) {
    return { image: e, startOffset: r2, startLine: a, startColumn: o2, tokenTypeIdx: n2, tokenType: i };
  }
  createFullToken(e, r2, n2, i, a, o2, l) {
    return { image: e, startOffset: r2, endOffset: r2 + l - 1, startLine: a, endLine: a, startColumn: o2, endColumn: o2 + l - 1, tokenTypeIdx: n2, tokenType: i };
  }
  addTokenUsingPush(e, r2, n2) {
    return e.push(n2), r2;
  }
  addTokenUsingMemberAccess(e, r2, n2) {
    return e[r2] = n2, r2++, r2;
  }
  handlePayloadNoCustom(e, r2) {
  }
  handlePayloadWithCustom(e, r2) {
    r2 !== null && (e.payload = r2);
  }
  matchWithTest(e, r2, n2) {
    return e.test(r2) === true ? r2.substring(n2, e.lastIndex) : null;
  }
  matchWithExec(e, r2) {
    let n2 = e.exec(r2);
    return n2 !== null ? n2[0] : null;
  }
}, m(_a24, "Lexer"), _a24);
we.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
we.NA = /NOT_APPLICABLE/;
function Vr(t) {
  return wf(t) ? t.LABEL : t.name;
}
m(Vr, "tokenLabel");
function wf(t) {
  return pr(t.LABEL) && t.LABEL !== "";
}
m(wf, "hasTokenLabel");
var Hv = "parent";
var cg = "categories";
var fg = "label";
var dg = "group";
var pg = "push_mode";
var mg = "pop_mode";
var hg = "longer_alt";
var gg = "line_breaks";
var yg = "start_chars_hint";
function Tn(t) {
  return Yv(t);
}
m(Tn, "createToken");
function Yv(t) {
  let e = t.pattern, r2 = {};
  if (r2.name = t.name, sn(e) || (r2.PATTERN = e), fm(t, Hv)) throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return fm(t, cg) && (r2.CATEGORIES = t[cg]), Kr([r2]), fm(t, fg) && (r2.LABEL = t[fg]), fm(t, dg) && (r2.GROUP = t[dg]), fm(t, mg) && (r2.POP_MODE = t[mg]), fm(t, pg) && (r2.PUSH_MODE = t[pg]), fm(t, hg) && (r2.LONGER_ALT = t[hg]), fm(t, gg) && (r2.LINE_BREAKS = t[gg]), fm(t, yg) && (r2.START_CHARS_HINT = t[yg]), r2;
}
m(Yv, "createTokenInternal");
var Bt = Tn({ name: "EOF", pattern: we.NA });
Kr([Bt]);
function Hr(t, e, r2, n2, i, a, o2, l) {
  return { image: e, startOffset: r2, endOffset: n2, startLine: i, endLine: a, startColumn: o2, endColumn: l, tokenTypeIdx: t.tokenTypeIdx, tokenType: t };
}
m(Hr, "createTokenInstance");
function Ea(t, e) {
  return Wr(t, e);
}
m(Ea, "tokenMatcher");
var Yr = { buildMismatchTokenMessage({ expected: t, actual: e, previous: r2, ruleName: n2 }) {
  return `Expecting ${wf(t) ? `--> ${Vr(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
}, buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
  return "Redundant input, expecting EOF but found: " + t.image;
}, buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: r2, customUserDescription: n2, ruleName: i }) {
  let a = "Expecting: ", l = `
but found: '` + De(e).image + "'";
  if (n2) return a + n2 + l;
  {
    let u = Rn(t, (h2, y) => h2.concat(y), []), c = Jr(u, (h2) => `[${Jr(h2, (y) => Vr(y)).join(", ")}]`), m3 = `one of these possible Token sequences:
${Jr(c, (h2, y) => `  ${y + 1}. ${h2}`).join(`
`)}`;
    return a + m3 + l;
  }
}, buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: r2, ruleName: n2 }) {
  let i = "Expecting: ", o2 = `
but found: '` + De(e).image + "'";
  if (r2) return i + r2 + o2;
  {
    let u = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${Jr(t, (c) => `[${Jr(c, (d) => Vr(d)).join(",")}]`).join(" ,")}>`;
    return i + u + o2;
  }
} };
Object.freeze(Yr);
var Tg = { buildRuleNotFoundError(t, e) {
  return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
} };
var fr = { buildDuplicateFoundError(t, e) {
  function r2(d) {
    return d instanceof ne ? d.terminalType.name : d instanceof de ? d.nonTerminalName : "";
  }
  m(r2, "getExtraProductionArgument");
  let n2 = t.name, i = De(e), a = i.idx, o2 = Ot(i), l = r2(i), u = a > 0, c = `->${o2}${u ? a : ""}<- ${l ? `with argument: ->${l}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${n2}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
  return c = c.replace(/[ \t]+/g, " "), c = c.replace(/\s\s+/g, `
`), c;
}, buildNamespaceConflictError(t) {
  return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
}, buildAlternationPrefixAmbiguityError(t) {
  let e = Jr(t.prefixPath, (i) => Vr(i)).join(", "), r2 = t.alternation.idx === 0 ? "" : t.alternation.idx;
  return `Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r2}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
}, buildAlternationAmbiguityError(t) {
  let e = Jr(t.prefixPath, (i) => Vr(i)).join(", "), r2 = t.alternation.idx === 0 ? "" : t.alternation.idx, n2 = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r2}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
  return n2 = n2 + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n2;
}, buildEmptyRepetitionError(t) {
  let e = Ot(t.repetition);
  return t.repetition.idx !== 0 && (e += t.repetition.idx), `The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
}, buildTokenNameError(t) {
  return "deprecated";
}, buildEmptyAlternationError(t) {
  return `Ambiguous empty alternative: <${t.emptyChoiceIdx + 1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
}, buildTooManyAlternativesError(t) {
  return `An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length + 1} alternatives.`;
}, buildLeftRecursionError(t) {
  let e = t.topLevelRule.name, r2 = Jr(t.leftRecursionPath, (a) => a.name), n2 = `${e} --> ${r2.concat([e]).join(" --> ")}`;
  return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n2}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
}, buildInvalidRuleNameError(t) {
  return "deprecated";
}, buildDuplicateRuleNameError(t) {
  let e;
  return t.topLevelRule instanceof kt ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`;
} };
function Rg(t, e) {
  let r2 = new If(t, e);
  return r2.resolveRefs(), r2.errors;
}
m(Rg, "resolveGrammar");
var _a25;
var If = (_a25 = class extends Nt {
  constructor(e, r2) {
    super(), this.nameToTopRule = e, this.errMsgProvider = r2, this.errors = [];
  }
  resolveRefs() {
    Zr(Xr(this.nameToTopRule), (e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    let r2 = this.nameToTopRule[e.nonTerminalName];
    if (r2) e.referencedRule = r2;
    else {
      let n2 = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({ message: n2, type: et.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: e.nonTerminalName });
    }
  }
}, m(_a25, "GastRefResolverVisitor"), _a25);
var _a26;
var bf = (_a26 = class extends Br {
  constructor(e, r2) {
    super(), this.topProd = e, this.path = r2, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = false, this.isAtEndOfPath = false;
  }
  startWalking() {
    if (this.found = false, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = _f(this.path.ruleStack).reverse(), this.occurrenceStack = _f(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, r2 = []) {
    this.found || super.walk(e, r2);
  }
  walkProdRef(e, r2, n2) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      let i = r2.concat(n2);
      this.updateExpectedNext(), this.walk(e.referencedRule, i);
    }
  }
  updateExpectedNext() {
    Cr(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = true) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}, m(_a26, "AbstractNextPossibleTokensWalker"), _a26);
var _a27;
var Nl = (_a27 = class extends bf {
  constructor(e, r2) {
    super(e, r2), this.path = r2, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, r2, n2) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      let i = r2.concat(n2), a = new Re({ definition: i });
      this.possibleTokTypes = ei(a), this.found = true;
    }
  }
}, m(_a27, "NextAfterTokenWalker"), _a27);
var _a28;
var Xi = (_a28 = class extends Br {
  constructor(e, r2) {
    super(), this.topRule = e, this.occurrence = r2, this.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}, m(_a28, "AbstractNextTerminalAfterProductionWalker"), _a28);
var _a29;
var wl = (_a29 = class extends Xi {
  walkMany(e, r2, n2) {
    if (e.idx === this.occurrence) {
      let i = De(r2.concat(n2));
      this.result.isEndOfRule = i === void 0, i instanceof ne && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else super.walkMany(e, r2, n2);
  }
}, m(_a29, "NextTerminalAfterManyWalker"), _a29);
var _a30;
var Aa = (_a30 = class extends Xi {
  walkManySep(e, r2, n2) {
    if (e.idx === this.occurrence) {
      let i = De(r2.concat(n2));
      this.result.isEndOfRule = i === void 0, i instanceof ne && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else super.walkManySep(e, r2, n2);
  }
}, m(_a30, "NextTerminalAfterManySepWalker"), _a30);
var _a31;
var Il = (_a31 = class extends Xi {
  walkAtLeastOne(e, r2, n2) {
    if (e.idx === this.occurrence) {
      let i = De(r2.concat(n2));
      this.result.isEndOfRule = i === void 0, i instanceof ne && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else super.walkAtLeastOne(e, r2, n2);
  }
}, m(_a31, "NextTerminalAfterAtLeastOneWalker"), _a31);
var _a32;
var Ca = (_a32 = class extends Xi {
  walkAtLeastOneSep(e, r2, n2) {
    if (e.idx === this.occurrence) {
      let i = De(r2.concat(n2));
      this.result.isEndOfRule = i === void 0, i instanceof ne && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else super.walkAtLeastOneSep(e, r2, n2);
  }
}, m(_a32, "NextTerminalAfterAtLeastOneSepWalker"), _a32);
function bl(t, e, r2 = []) {
  r2 = _f(r2);
  let n2 = [], i = 0;
  function a(l) {
    return l.concat(Mi(t, i + 1));
  }
  m(a, "remainingPathWith");
  function o2(l) {
    let u = bl(a(l), e, r2);
    return n2.concat(u);
  }
  for (m(o2, "getAlternativesForProd"); r2.length < e && i < t.length; ) {
    let l = t[i];
    if (l instanceof Re) return o2(l.definition);
    if (l instanceof de) return o2(l.definition);
    if (l instanceof pe) n2 = o2(l.definition);
    else if (l instanceof $e) {
      let u = l.definition.concat([new se({ definition: l.definition })]);
      return o2(u);
    } else if (l instanceof xe) {
      let u = [new Re({ definition: l.definition }), new se({ definition: [new ne({ terminalType: l.separator })].concat(l.definition) })];
      return o2(u);
    } else if (l instanceof ye) {
      let u = l.definition.concat([new se({ definition: [new ne({ terminalType: l.separator })].concat(l.definition) })]);
      n2 = o2(u);
    } else if (l instanceof se) {
      let u = l.definition.concat([new se({ definition: l.definition })]);
      n2 = o2(u);
    } else {
      if (l instanceof Te) return Zr(l.definition, (u) => {
        Cr(u.definition) === false && (n2 = o2(u.definition));
      }), n2;
      if (l instanceof ne) r2.push(l.terminalType);
      else throw Error("non exhaustive match");
    }
    i++;
  }
  return n2.push({ partialPath: r2, suffixDef: Mi(t, i) }), n2;
}
m(bl, "possiblePathsFrom");
function _l(t, e, r2, n2) {
  let i = "EXIT_NONE_TERMINAL", a = [i], o2 = "EXIT_ALTERNATIVE", l = false, u = e.length, c = u - n2 - 1, d = [], m3 = [];
  for (m3.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !Cr(m3); ) {
    let h2 = m3.pop();
    if (h2 === o2) {
      l && Df(m3).idx <= c && m3.pop();
      continue;
    }
    let y = h2.def, k = h2.idx, w = h2.ruleStack, q2 = h2.occurrenceStack;
    if (Cr(y)) continue;
    let M = y[0];
    if (M === i) {
      let P = { idx: k, def: Mi(y), ruleStack: _i(w), occurrenceStack: _i(q2) };
      m3.push(P);
    } else if (M instanceof ne) if (k < u - 1) {
      let P = k + 1, E = e[P];
      if (r2(E, M.terminalType)) {
        let H = { idx: P, def: Mi(y), ruleStack: w, occurrenceStack: q2 };
        m3.push(H);
      }
    } else if (k === u - 1) d.push({ nextTokenType: M.terminalType, nextTokenOccurrence: M.idx, ruleStack: w, occurrenceStack: q2 }), l = true;
    else throw Error("non exhaustive match");
    else if (M instanceof de) {
      let P = _f(w);
      P.push(M.nonTerminalName);
      let E = _f(q2);
      E.push(M.idx);
      let H = { idx: k, def: M.definition.concat(a, Mi(y)), ruleStack: P, occurrenceStack: E };
      m3.push(H);
    } else if (M instanceof pe) {
      let P = { idx: k, def: Mi(y), ruleStack: w, occurrenceStack: q2 };
      m3.push(P), m3.push(o2);
      let E = { idx: k, def: M.definition.concat(Mi(y)), ruleStack: w, occurrenceStack: q2 };
      m3.push(E);
    } else if (M instanceof $e) {
      let P = new se({ definition: M.definition, idx: M.idx }), E = M.definition.concat([P], Mi(y)), H = { idx: k, def: E, ruleStack: w, occurrenceStack: q2 };
      m3.push(H);
    } else if (M instanceof xe) {
      let P = new ne({ terminalType: M.separator }), E = new se({ definition: [P].concat(M.definition), idx: M.idx }), H = M.definition.concat([E], Mi(y)), U = { idx: k, def: H, ruleStack: w, occurrenceStack: q2 };
      m3.push(U);
    } else if (M instanceof ye) {
      let P = { idx: k, def: Mi(y), ruleStack: w, occurrenceStack: q2 };
      m3.push(P), m3.push(o2);
      let E = new ne({ terminalType: M.separator }), H = new se({ definition: [E].concat(M.definition), idx: M.idx }), U = M.definition.concat([H], Mi(y)), he = { idx: k, def: U, ruleStack: w, occurrenceStack: q2 };
      m3.push(he);
    } else if (M instanceof se) {
      let P = { idx: k, def: Mi(y), ruleStack: w, occurrenceStack: q2 };
      m3.push(P), m3.push(o2);
      let E = new se({ definition: M.definition, idx: M.idx }), H = M.definition.concat([E], Mi(y)), U = { idx: k, def: H, ruleStack: w, occurrenceStack: q2 };
      m3.push(U);
    } else if (M instanceof Te) for (let P = M.definition.length - 1; P >= 0; P--) {
      let E = M.definition[P], H = { idx: k, def: E.definition.concat(Mi(y)), ruleStack: w, occurrenceStack: q2 };
      m3.push(H), m3.push(o2);
    }
    else if (M instanceof Re) m3.push({ idx: k, def: M.definition.concat(Mi(y)), ruleStack: w, occurrenceStack: q2 });
    else if (M instanceof kt) m3.push(Xv(M, k, w, q2));
    else throw Error("non exhaustive match");
  }
  return d;
}
m(_l, "nextPossibleTokensAfter");
function Xv(t, e, r2, n2) {
  let i = _f(r2);
  i.push(t.name);
  let a = _f(n2);
  return a.push(1), { idx: e, def: t.definition, ruleStack: i, occurrenceStack: a };
}
m(Xv, "expandTopLevelRule");
var Ie;
(function(t) {
  t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
})(Ie || (Ie = {}));
function Sa(t) {
  if (t instanceof pe || t === "Option") return Ie.OPTION;
  if (t instanceof se || t === "Repetition") return Ie.REPETITION;
  if (t instanceof $e || t === "RepetitionMandatory") return Ie.REPETITION_MANDATORY;
  if (t instanceof xe || t === "RepetitionMandatoryWithSeparator") return Ie.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof ye || t === "RepetitionWithSeparator") return Ie.REPETITION_WITH_SEPARATOR;
  if (t instanceof Te || t === "Alternation") return Ie.ALTERNATION;
  throw Error("non exhaustive match");
}
m(Sa, "getProdType");
function Ol(t) {
  let { occurrence: e, rule: r2, prodType: n2, maxLookahead: i } = t, a = Sa(n2);
  return a === Ie.ALTERNATION ? Ji(e, r2, i) : Zi(e, r2, a, i);
}
m(Ol, "getLookaheadPaths");
function xg(t, e, r2, n2, i, a) {
  let o2 = Ji(t, e, r2), l = kg(o2) ? Hi : Wr;
  return a(o2, n2, l, i);
}
m(xg, "buildLookaheadFuncForOr");
function vg(t, e, r2, n2, i, a) {
  let o2 = Zi(t, e, i, r2), l = kg(o2) ? Hi : Wr;
  return a(o2[0], l, n2);
}
m(vg, "buildLookaheadFuncForOptionalProd");
function Eg(t, e, r2, n2) {
  let i = t.length, a = Ui(t, (o2) => Ui(o2, (l) => l.length === 1));
  if (e) return function(o2) {
    let l = Jr(o2, (u) => u.GATE);
    for (let u = 0; u < i; u++) {
      let c = t[u], d = c.length, m3 = l[u];
      if (!(m3 !== void 0 && m3.call(this) === false)) e: for (let h2 = 0; h2 < d; h2++) {
        let y = c[h2], k = y.length;
        for (let w = 0; w < k; w++) {
          let q2 = this.LA(w + 1);
          if (r2(q2, y[w]) === false) continue e;
        }
        return u;
      }
    }
  };
  if (a && !n2) {
    let o2 = Jr(t, (u) => Qr(u)), l = Rn(o2, (u, c, d) => (Zr(c, (m3) => {
      fm(u, m3.tokenTypeIdx) || (u[m3.tokenTypeIdx] = d), Zr(m3.categoryMatches, (h2) => {
        fm(u, h2) || (u[h2] = d);
      });
    }), u), {});
    return function() {
      let u = this.LA(1);
      return l[u.tokenTypeIdx];
    };
  } else return function() {
    for (let o2 = 0; o2 < i; o2++) {
      let l = t[o2], u = l.length;
      e: for (let c = 0; c < u; c++) {
        let d = l[c], m3 = d.length;
        for (let h2 = 0; h2 < m3; h2++) {
          let y = this.LA(h2 + 1);
          if (r2(y, d[h2]) === false) continue e;
        }
        return o2;
      }
    }
  };
}
m(Eg, "buildAlternativesLookAheadFunc");
function Ag(t, e, r2) {
  let n2 = Ui(t, (a) => a.length === 1), i = t.length;
  if (n2 && !r2) {
    let a = Qr(t);
    if (a.length === 1 && Cr(a[0].categoryMatches)) {
      let l = a[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === l;
      };
    } else {
      let o2 = Rn(a, (l, u, c) => (l[u.tokenTypeIdx] = true, Zr(u.categoryMatches, (d) => {
        l[d] = true;
      }), l), []);
      return function() {
        let l = this.LA(1);
        return o2[l.tokenTypeIdx] === true;
      };
    }
  } else return function() {
    e: for (let a = 0; a < i; a++) {
      let o2 = t[a], l = o2.length;
      for (let u = 0; u < l; u++) {
        let c = this.LA(u + 1);
        if (e(c, o2[u]) === false) continue e;
      }
      return true;
    }
    return false;
  };
}
m(Ag, "buildSingleAlternativeLookaheadFunction");
var _a33;
var Pf = (_a33 = class extends Br {
  constructor(e, r2, n2) {
    super(), this.topProd = e, this.targetOccurrence = r2, this.targetProdType = n2;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, r2, n2, i) {
    return e.idx === this.targetOccurrence && this.targetProdType === r2 ? (this.restDef = n2.concat(i), true) : false;
  }
  walkOption(e, r2, n2) {
    this.checkIsTarget(e, Ie.OPTION, r2, n2) || super.walkOption(e, r2, n2);
  }
  walkAtLeastOne(e, r2, n2) {
    this.checkIsTarget(e, Ie.REPETITION_MANDATORY, r2, n2) || super.walkOption(e, r2, n2);
  }
  walkAtLeastOneSep(e, r2, n2) {
    this.checkIsTarget(e, Ie.REPETITION_MANDATORY_WITH_SEPARATOR, r2, n2) || super.walkOption(e, r2, n2);
  }
  walkMany(e, r2, n2) {
    this.checkIsTarget(e, Ie.REPETITION, r2, n2) || super.walkOption(e, r2, n2);
  }
  walkManySep(e, r2, n2) {
    this.checkIsTarget(e, Ie.REPETITION_WITH_SEPARATOR, r2, n2) || super.walkOption(e, r2, n2);
  }
}, m(_a33, "RestDefinitionFinderWalker"), _a33);
var _a34;
var Pl = (_a34 = class extends Nt {
  constructor(e, r2, n2) {
    super(), this.targetOccurrence = e, this.targetProdType = r2, this.targetRef = n2, this.result = [];
  }
  checkIsTarget(e, r2) {
    e.idx === this.targetOccurrence && this.targetProdType === r2 && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, Ie.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, Ie.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, Ie.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, Ie.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, Ie.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, Ie.ALTERNATION);
  }
}, m(_a34, "InsideDefinitionFinderVisitor"), _a34);
function $g(t) {
  let e = new Array(t);
  for (let r2 = 0; r2 < t; r2++) e[r2] = [];
  return e;
}
m($g, "initializeArrayOfArrays");
function _f2(t) {
  let e = [""];
  for (let r2 = 0; r2 < t.length; r2++) {
    let n2 = t[r2], i = [];
    for (let a = 0; a < e.length; a++) {
      let o2 = e[a];
      i.push(o2 + "_" + n2.tokenTypeIdx);
      for (let l = 0; l < n2.categoryMatches.length; l++) {
        let u = "_" + n2.categoryMatches[l];
        i.push(o2 + u);
      }
    }
    e = i;
  }
  return e;
}
m(_f2, "pathToHashKeys");
function Jv(t, e, r2) {
  for (let n2 = 0; n2 < t.length; n2++) {
    if (n2 === r2) continue;
    let i = t[n2];
    for (let a = 0; a < e.length; a++) {
      let o2 = e[a];
      if (i[o2] === true) return false;
    }
  }
  return true;
}
m(Jv, "isUniquePrefixHash");
function Cg(t, e) {
  let r2 = Jr(t, (o2) => bl([o2], 1)), n2 = $g(r2.length), i = Jr(r2, (o2) => {
    let l = {};
    return Zr(o2, (u) => {
      let c = _f2(u.partialPath);
      Zr(c, (d) => {
        l[d] = true;
      });
    }), l;
  }), a = r2;
  for (let o2 = 1; o2 <= e; o2++) {
    let l = a;
    a = $g(l.length);
    for (let u = 0; u < l.length; u++) {
      let c = l[u];
      for (let d = 0; d < c.length; d++) {
        let m3 = c[d].partialPath, h2 = c[d].suffixDef, y = _f2(m3);
        if (Jv(i, y, u) || Cr(h2) || m3.length === e) {
          let w = n2[u];
          if (Ll(w, m3) === false) {
            w.push(m3);
            for (let q2 = 0; q2 < y.length; q2++) {
              let M = y[q2];
              i[u][M] = true;
            }
          }
        } else {
          let w = bl(h2, o2 + 1, m3);
          a[u] = a[u].concat(w), Zr(w, (q2) => {
            let M = _f2(q2.partialPath);
            Zr(M, (P) => {
              i[u][P] = true;
            });
          });
        }
      }
    }
  }
  return n2;
}
m(Cg, "lookAheadSequenceFromAlternatives");
function Ji(t, e, r2, n2) {
  let i = new Pl(t, Ie.ALTERNATION, n2);
  return e.accept(i), Cg(i.result, r2);
}
m(Ji, "getLookaheadPathsForOr");
function Zi(t, e, r2, n2) {
  let i = new Pl(t, r2);
  e.accept(i);
  let a = i.result, l = new Pf(e, t, r2).startWalking(), u = new Re({ definition: a }), c = new Re({ definition: l });
  return Cg([u, c], n2);
}
m(Zi, "getLookaheadPathsForOptionalProd");
function Ll(t, e) {
  e: for (let r2 = 0; r2 < t.length; r2++) {
    let n2 = t[r2];
    if (n2.length === e.length) {
      for (let i = 0; i < n2.length; i++) {
        let a = e[i], o2 = n2[i];
        if ((a === o2 || o2.categoryMatchesMap[a.tokenTypeIdx] !== void 0) === false) continue e;
      }
      return true;
    }
  }
  return false;
}
m(Ll, "containsPath");
function Sg(t, e) {
  return t.length < e.length && Ui(t, (r2, n2) => {
    let i = e[n2];
    return r2 === i || i.categoryMatchesMap[r2.tokenTypeIdx];
  });
}
m(Sg, "isStrictPrefixOfPath");
function kg(t) {
  return Ui(t, (e) => Ui(e, (r2) => Ui(r2, (n2) => Cr(n2.categoryMatches))));
}
m(kg, "areTokenCategoriesNotUsed");
function Ng(t) {
  let e = t.lookaheadStrategy.validate({ rules: t.rules, tokenTypes: t.tokenTypes, grammarName: t.grammarName });
  return Jr(e, (r2) => Object.assign({ type: et.CUSTOM_LOOKAHEAD_VALIDATION }, r2));
}
m(Ng, "validateLookahead");
function wg(t, e, r2, n2) {
  let i = zi(t, (u) => Zv(u, r2)), a = iE(t, e, r2), o2 = zi(t, (u) => tE(u, r2)), l = zi(t, (u) => eE(u, t, n2, r2));
  return i.concat(a, o2, l);
}
m(wg, "validateGrammar");
function Zv(t, e) {
  let r2 = new Of();
  t.accept(r2);
  let n2 = r2.allProductions, i = Vi(n2, Qv), a = Tm(i, (l) => l.length > 1);
  return Jr(Xr(a), (l) => {
    let u = De(l), c = e.buildDuplicateFoundError(t, l), d = Ot(u), m3 = { message: c, type: et.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: d, occurrence: u.idx }, h2 = Ig(u);
    return h2 && (m3.parameter = h2), m3;
  });
}
m(Zv, "validateDuplicateProductions");
function Qv(t) {
  return `${Ot(t)}_#_${t.idx}_#_${Ig(t)}`;
}
m(Qv, "identifyProductionForDuplicates");
function Ig(t) {
  return t instanceof ne ? t.terminalType.name : t instanceof de ? t.nonTerminalName : "";
}
m(Ig, "getExtraProductionArgument");
var _a35;
var Of = (_a35 = class extends Nt {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
}, m(_a35, "OccurrenceValidationCollector"), _a35);
function eE(t, e, r2, n2) {
  let i = [];
  if (Rn(e, (o2, l) => l.name === t.name ? o2 + 1 : o2, 0) > 1) {
    let o2 = n2.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: r2 });
    i.push({ message: o2, type: et.DUPLICATE_RULE_NAME, ruleName: t.name });
  }
  return i;
}
m(eE, "validateRuleDoesNotAlreadyExist");
function bg(t, e, r2) {
  let n2 = [], i;
  return pm(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r2}<-as it is not defined in any of the super grammars `, n2.push({ message: i, type: et.INVALID_RULE_OVERRIDE, ruleName: t })), n2;
}
m(bg, "validateRuleIsOverridden");
function Df2(t, e, r2, n2 = []) {
  let i = [], a = Dl(e.definition);
  if (Cr(a)) return [];
  {
    let o2 = t.name;
    pm(a, t) && i.push({ message: r2.buildLeftRecursionError({ topLevelRule: t, leftRecursionPath: n2 }), type: et.LEFT_RECURSION, ruleName: o2 });
    let u = Ri(a, n2.concat([t])), c = zi(u, (d) => {
      let m3 = _f(n2);
      return m3.push(d), Df2(t, d, r2, m3);
    });
    return i.concat(c);
  }
}
m(Df2, "validateNoLeftRecursion");
function Dl(t) {
  let e = [];
  if (Cr(t)) return e;
  let r2 = De(t);
  if (r2 instanceof de) e.push(r2.referencedRule);
  else if (r2 instanceof Re || r2 instanceof pe || r2 instanceof $e || r2 instanceof xe || r2 instanceof ye || r2 instanceof se) e = e.concat(Dl(r2.definition));
  else if (r2 instanceof Te) e = Qr(Jr(r2.definition, (a) => Dl(a.definition)));
  else if (!(r2 instanceof ne)) throw Error("non exhaustive match");
  let n2 = Qn(r2), i = t.length > 1;
  if (n2 && i) {
    let a = Mi(t);
    return e.concat(Dl(a));
  } else return e;
}
m(Dl, "getFirstNoneTerminal");
var _a36;
var ka = (_a36 = class extends Nt {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}, m(_a36, "OrCollector"), _a36);
function _g(t, e) {
  let r2 = new ka();
  t.accept(r2);
  let n2 = r2.alternations;
  return zi(n2, (a) => {
    let o2 = _i(a.definition);
    return zi(o2, (l, u) => {
      let c = _l([l], [], Wr, 1);
      return Cr(c) ? [{ message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: a, emptyChoiceIdx: u }), type: et.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: a.idx, alternative: u + 1 }] : [];
    });
  });
}
m(_g, "validateEmptyOrAlternative");
function Pg(t, e, r2) {
  let n2 = new ka();
  t.accept(n2);
  let i = n2.alternations;
  return i = Qm(i, (o2) => o2.ignoreAmbiguities === true), zi(i, (o2) => {
    let l = o2.idx, u = o2.maxLookahead || e, c = Ji(l, t, u, o2), d = rE(c, o2, t, r2), m3 = nE(c, o2, t, r2);
    return d.concat(m3);
  });
}
m(Pg, "validateAmbiguousAlternationAlternatives");
var _a37;
var Lf = (_a37 = class extends Nt {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
}, m(_a37, "RepetitionCollector"), _a37);
function tE(t, e) {
  let r2 = new ka();
  t.accept(r2);
  let n2 = r2.alternations;
  return zi(n2, (a) => a.definition.length > 255 ? [{ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: a }), type: et.TOO_MANY_ALTS, ruleName: t.name, occurrence: a.idx }] : []);
}
m(tE, "validateTooManyAlts");
function Og(t, e, r2) {
  let n2 = [];
  return Zr(t, (i) => {
    let a = new Lf();
    i.accept(a);
    let o2 = a.allProductions;
    Zr(o2, (l) => {
      let u = Sa(l), c = l.maxLookahead || e, d = l.idx, h2 = Zi(d, i, u, c)[0];
      if (Cr(Qr(h2))) {
        let y = r2.buildEmptyRepetitionError({ topLevelRule: i, repetition: l });
        n2.push({ message: y, type: et.NO_NON_EMPTY_LOOKAHEAD, ruleName: i.name });
      }
    });
  }), n2;
}
m(Og, "validateSomeNonEmptyLookaheadPath");
function rE(t, e, r2, n2) {
  let i = [], a = Rn(t, (l, u, c) => (e.definition[c].ignoreAmbiguities === true || Zr(u, (d) => {
    let m3 = [c];
    Zr(t, (h2, y) => {
      c !== y && Ll(h2, d) && e.definition[y].ignoreAmbiguities !== true && m3.push(y);
    }), m3.length > 1 && !Ll(i, d) && (i.push(d), l.push({ alts: m3, path: d }));
  }), l), []);
  return Jr(a, (l) => {
    let u = Jr(l.alts, (d) => d + 1);
    return { message: n2.buildAlternationAmbiguityError({ topLevelRule: r2, alternation: e, ambiguityIndices: u, prefixPath: l.path }), type: et.AMBIGUOUS_ALTS, ruleName: r2.name, occurrence: e.idx, alternatives: l.alts };
  });
}
m(rE, "checkAlternativesAmbiguities");
function nE(t, e, r2, n2) {
  let i = Rn(t, (o2, l, u) => {
    let c = Jr(l, (d) => ({ idx: u, path: d }));
    return o2.concat(c);
  }, []);
  return Ai(zi(i, (o2) => {
    if (e.definition[o2.idx].ignoreAmbiguities === true) return [];
    let u = o2.idx, c = o2.path, d = fn(i, (h2) => e.definition[h2.idx].ignoreAmbiguities !== true && h2.idx < u && Sg(h2.path, c));
    return Jr(d, (h2) => {
      let y = [h2.idx + 1, u + 1], k = e.idx === 0 ? "" : e.idx;
      return { message: n2.buildAlternationPrefixAmbiguityError({ topLevelRule: r2, alternation: e, ambiguityIndices: y, prefixPath: h2.path }), type: et.AMBIGUOUS_PREFIX_ALTS, ruleName: r2.name, occurrence: k, alternatives: y };
    });
  }));
}
m(nE, "checkPrefixAlternativesAmbiguities");
function iE(t, e, r2) {
  let n2 = [], i = Jr(e, (a) => a.name);
  return Zr(t, (a) => {
    let o2 = a.name;
    if (pm(i, o2)) {
      let l = r2.buildNamespaceConflictError(a);
      n2.push({ message: l, type: et.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: o2 });
    }
  }), n2;
}
m(iE, "checkTerminalAndNoneTerminalsNameSpace");
function Lg(t) {
  let e = Nf(t, { errMsgProvider: Tg }), r2 = {};
  return Zr(t.rules, (n2) => {
    r2[n2.name] = n2;
  }), Rg(r2, e.errMsgProvider);
}
m(Lg, "resolveGrammar");
function Dg(t) {
  return t = Nf(t, { errMsgProvider: fr }), wg(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
m(Dg, "validateGrammar");
var Mg = "MismatchedTokenException";
var Fg = "NoViableAltException";
var Gg = "EarlyExitException";
var Ug = "NotAllInputParsedException";
var zg = [Mg, Fg, Gg, Ug];
Object.freeze(zg);
function Rn2(t) {
  return pm(zg, t.name);
}
m(Rn2, "isRecognitionException");
var _a38;
var Qi = (_a38 = class extends Error {
  constructor(e, r2) {
    super(e), this.token = r2, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}, m(_a38, "RecognitionException"), _a38);
var _a39;
var ri = (_a39 = class extends Qi {
  constructor(e, r2, n2) {
    super(e, r2), this.previousToken = n2, this.name = Mg;
  }
}, m(_a39, "MismatchedTokenException"), _a39);
var _a40;
var Na = (_a40 = class extends Qi {
  constructor(e, r2, n2) {
    super(e, r2), this.previousToken = n2, this.name = Fg;
  }
}, m(_a40, "NoViableAltException"), _a40);
var _a41;
var wa = (_a41 = class extends Qi {
  constructor(e, r2) {
    super(e, r2), this.name = Ug;
  }
}, m(_a41, "NotAllInputParsedException"), _a41);
var _a42;
var Ia = (_a42 = class extends Qi {
  constructor(e, r2, n2) {
    super(e, r2), this.previousToken = n2, this.name = Gg;
  }
}, m(_a42, "EarlyExitException"), _a42);
var Mf = {};
var Gf = "InRuleRecoveryException";
var _a43;
var Ff = (_a43 = class extends Error {
  constructor(e) {
    super(e), this.name = Gf;
  }
}, m(_a43, "InRuleRecoveryException"), _a43);
var _a44;
var Ml = (_a44 = class {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = fm(e, "recoveryEnabled") ? e.recoveryEnabled : wt.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = sE);
  }
  getTokenToInsert(e) {
    let r2 = Hr(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return r2.isInsertedInRecovery = true, r2;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return true;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return true;
  }
  tryInRepetitionRecovery(e, r2, n2, i) {
    let a = this.findReSyncTokenType(), o2 = this.exportLexerState(), l = [], u = false, c = this.LA(1), d = this.LA(1), m3 = m(() => {
      let h2 = this.LA(0), y = this.errorMessageProvider.buildMismatchTokenMessage({ expected: i, actual: c, previous: h2, ruleName: this.getCurrRuleFullName() }), k = new ri(y, c, this.LA(0));
      k.resyncedTokens = _i(l), this.SAVE_ERROR(k);
    }, "generateErrorMessage");
    for (; !u; ) if (this.tokenMatcher(d, i)) {
      m3();
      return;
    } else if (n2.call(this)) {
      m3(), e.apply(this, r2);
      return;
    } else this.tokenMatcher(d, a) ? u = true : (d = this.SKIP_TOKEN(), this.addToResyncTokens(d, l));
    this.importLexerState(o2);
  }
  shouldInRepetitionRecoveryBeTried(e, r2, n2) {
    return !(n2 === false || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, r2)));
  }
  getFollowsForInRuleRecovery(e, r2) {
    let n2 = this.getCurrentGrammarPath(e, r2);
    return this.getNextPossibleTokenTypes(n2);
  }
  tryInRuleRecovery(e, r2) {
    if (this.canRecoverWithSingleTokenInsertion(e, r2)) return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      let n2 = this.SKIP_TOKEN();
      return this.consumeToken(), n2;
    }
    throw new Ff("sad sad panda");
  }
  canPerformInRuleRecovery(e, r2) {
    return this.canRecoverWithSingleTokenInsertion(e, r2) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, r2) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || Cr(r2)) return false;
    let n2 = this.LA(1);
    return Ki(r2, (a) => this.tokenMatcher(n2, a)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : false;
  }
  isInCurrentRuleReSyncSet(e) {
    let r2 = this.getCurrFollowKey(), n2 = this.getFollowSetFromFollowKey(r2);
    return pm(n2, e);
  }
  findReSyncTokenType() {
    let e = this.flattenFollowSet(), r2 = this.LA(1), n2 = 2;
    for (; ; ) {
      let i = Ki(e, (a) => Ea(r2, a));
      if (i !== void 0) return i;
      r2 = this.LA(n2), n2++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1) return Mf;
    let e = this.getLastExplicitRuleShortName(), r2 = this.getLastExplicitRuleOccurrenceIndex(), n2 = this.getPreviousExplicitRuleShortName();
    return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: r2, inRule: this.shortRuleNameToFullName(n2) };
  }
  buildFullFollowKeyStack() {
    let e = this.RULE_STACK, r2 = this.RULE_OCCURRENCE_STACK;
    return Jr(e, (n2, i) => i === 0 ? Mf : { ruleName: this.shortRuleNameToFullName(n2), idxInCallingRule: r2[i], inRule: this.shortRuleNameToFullName(e[i - 1]) });
  }
  flattenFollowSet() {
    let e = Jr(this.buildFullFollowKeyStack(), (r2) => this.getFollowSetFromFollowKey(r2));
    return Qr(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === Mf) return [Bt];
    let r2 = e.ruleName + e.idxInCallingRule + vl + e.inRule;
    return this.resyncFollows[r2];
  }
  addToResyncTokens(e, r2) {
    return this.tokenMatcher(e, Bt) || r2.push(e), r2;
  }
  reSyncTo(e) {
    let r2 = [], n2 = this.LA(1);
    for (; this.tokenMatcher(n2, e) === false; ) n2 = this.SKIP_TOKEN(), this.addToResyncTokens(n2, r2);
    return _i(r2);
  }
  attemptInRepetitionRecovery(e, r2, n2, i, a, o2, l) {
  }
  getCurrentGrammarPath(e, r2) {
    let n2 = this.getHumanReadableRuleStack(), i = _f(this.RULE_OCCURRENCE_STACK);
    return { ruleStack: n2, occurrenceStack: i, lastTok: e, lastTokOccurrence: r2 };
  }
  getHumanReadableRuleStack() {
    return Jr(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
  }
}, m(_a44, "Recoverable"), _a44);
function sE(t, e, r2, n2, i, a, o2) {
  let l = this.getKeyForAutomaticLookahead(n2, i), u = this.firstAfterRepMap[l];
  if (u === void 0) {
    let h2 = this.getCurrRuleFullName(), y = this.getGAstProductions()[h2];
    u = new a(y, i).startWalking(), this.firstAfterRepMap[l] = u;
  }
  let c = u.token, d = u.occurrence, m3 = u.isEndOfRule;
  this.RULE_STACK.length === 1 && m3 && c === void 0 && (c = Bt, d = 1), !(c === void 0 || d === void 0) && this.shouldInRepetitionRecoveryBeTried(c, d, o2) && this.tryInRepetitionRecovery(t, e, r2, c);
}
m(sE, "attemptInRepetitionRecovery");
function Fl(t, e, r2) {
  return r2 | e | t;
}
m(Fl, "getKeyForAutomaticLookahead");
var _a45;
var Xr2 = (_a45 = class {
  constructor(e) {
    var r2;
    this.maxLookahead = (r2 = e == null ? void 0 : e.maxLookahead) !== null && r2 !== void 0 ? r2 : wt.maxLookahead;
  }
  validate(e) {
    let r2 = this.validateNoLeftRecursion(e.rules);
    if (Cr(r2)) {
      let n2 = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), a = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [...r2, ...n2, ...i, ...a];
    }
    return r2;
  }
  validateNoLeftRecursion(e) {
    return zi(e, (r2) => Df2(r2, r2, fr));
  }
  validateEmptyOrAlternatives(e) {
    return zi(e, (r2) => _g(r2, fr));
  }
  validateAmbiguousAlternationAlternatives(e, r2) {
    return zi(e, (n2) => Pg(n2, r2, fr));
  }
  validateSomeNonEmptyLookaheadPath(e, r2) {
    return Og(e, r2, fr);
  }
  buildLookaheadForAlternation(e) {
    return xg(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Eg);
  }
  buildLookaheadForOptional(e) {
    return vg(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, Sa(e.prodType), Ag);
  }
}, m(_a45, "LLkLookaheadStrategy"), _a45);
var _a46;
var Ul = (_a46 = class {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = fm(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : wt.dynamicTokensEnabled, this.maxLookahead = fm(e, "maxLookahead") ? e.maxLookahead : wt.maxLookahead, this.lookaheadStrategy = fm(e, "lookaheadStrategy") ? e.lookaheadStrategy : new Xr2({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    Zr(e, (r2) => {
      this.TRACE_INIT(`${r2.name} Rule Lookahead`, () => {
        let { alternation: n2, repetition: i, option: a, repetitionMandatory: o2, repetitionMandatoryWithSeparator: l, repetitionWithSeparator: u } = aE(r2);
        Zr(n2, (c) => {
          let d = c.idx === 0 ? "" : c.idx;
          this.TRACE_INIT(`${Ot(c)}${d}`, () => {
            let m3 = this.lookaheadStrategy.buildLookaheadForAlternation({ prodOccurrence: c.idx, rule: r2, maxLookahead: c.maxLookahead || this.maxLookahead, hasPredicates: c.hasPredicates, dynamicTokensEnabled: this.dynamicTokensEnabled }), h2 = Fl(this.fullRuleNameToShort[r2.name], 256, c.idx);
            this.setLaFuncCache(h2, m3);
          });
        }), Zr(i, (c) => {
          this.computeLookaheadFunc(r2, c.idx, 768, "Repetition", c.maxLookahead, Ot(c));
        }), Zr(a, (c) => {
          this.computeLookaheadFunc(r2, c.idx, 512, "Option", c.maxLookahead, Ot(c));
        }), Zr(o2, (c) => {
          this.computeLookaheadFunc(r2, c.idx, 1024, "RepetitionMandatory", c.maxLookahead, Ot(c));
        }), Zr(l, (c) => {
          this.computeLookaheadFunc(r2, c.idx, 1536, "RepetitionMandatoryWithSeparator", c.maxLookahead, Ot(c));
        }), Zr(u, (c) => {
          this.computeLookaheadFunc(r2, c.idx, 1280, "RepetitionWithSeparator", c.maxLookahead, Ot(c));
        });
      });
    });
  }
  computeLookaheadFunc(e, r2, n2, i, a, o2) {
    this.TRACE_INIT(`${o2}${r2 === 0 ? "" : r2}`, () => {
      let l = this.lookaheadStrategy.buildLookaheadForOptional({ prodOccurrence: r2, rule: e, maxLookahead: a || this.maxLookahead, dynamicTokensEnabled: this.dynamicTokensEnabled, prodType: i }), u = Fl(this.fullRuleNameToShort[e.name], n2, r2);
      this.setLaFuncCache(u, l);
    });
  }
  getKeyForAutomaticLookahead(e, r2) {
    let n2 = this.getLastExplicitRuleShortName();
    return Fl(n2, e, r2);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  setLaFuncCache(e, r2) {
    this.lookAheadFuncsCache.set(e, r2);
  }
}, m(_a46, "LooksAhead"), _a46);
var _a47;
var Uf = (_a47 = class extends Nt {
  constructor() {
    super(...arguments), this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
  }
  reset() {
    this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}, m(_a47, "DslMethodsCollectorVisitor"), _a47);
var Gl = new Uf();
function aE(t) {
  Gl.reset(), t.accept(Gl);
  let e = Gl.dslMethods;
  return Gl.reset(), e;
}
m(aE, "collectMethods");
function jf(t, e) {
  isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
m(jf, "setNodeLocationOnlyOffset");
function Bf(t, e) {
  isNaN(t.startOffset) === true ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
m(Bf, "setNodeLocationFull");
function qg(t, e, r2) {
  t.children[r2] === void 0 ? t.children[r2] = [e] : t.children[r2].push(e);
}
m(qg, "addTerminalToCst");
function jg(t, e, r2) {
  t.children[e] === void 0 ? t.children[e] = [r2] : t.children[e].push(r2);
}
m(jg, "addNoneTerminalToCst");
var oE = "name";
function Wf(t, e) {
  Object.defineProperty(t, oE, { enumerable: false, configurable: true, writable: false, value: e });
}
m(Wf, "defineNameProp");
function lE(t, e) {
  let r2 = h(t), n2 = r2.length;
  for (let i = 0; i < n2; i++) {
    let a = r2[i], o2 = t[a], l = o2.length;
    for (let u = 0; u < l; u++) {
      let c = o2[u];
      c.tokenTypeIdx === void 0 && this[c.name](c.children, e);
    }
  }
}
m(lE, "defaultVisit");
function Bg(t, e) {
  let r2 = m(function() {
  }, "derivedConstructor");
  Wf(r2, t + "BaseSemantics");
  let n2 = { visit: m(function(i, a) {
    if (N(i) && (i = i[0]), !sn(i)) return this[i.name](i.children, a);
  }, "visit"), validateVisitor: m(function() {
    let i = uE(this, e);
    if (!Cr(i)) {
      let a = Jr(i, (o2) => o2.msg);
      throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${a.join(`

`).replace(/\n/g, `
	`)}`);
    }
  }, "validateVisitor") };
  return r2.prototype = n2, r2.prototype.constructor = r2, r2._RULE_NAMES = e, r2;
}
m(Bg, "createBaseSemanticVisitorConstructor");
function Wg(t, e, r2) {
  let n2 = m(function() {
  }, "derivedConstructor");
  Wf(n2, t + "BaseSemanticsWithDefaults");
  let i = Object.create(r2.prototype);
  return Zr(e, (a) => {
    i[a] = lE;
  }), n2.prototype = i, n2.prototype.constructor = n2, n2;
}
m(Wg, "createBaseVisitorConstructorWithDefaults");
var Kf;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Kf || (Kf = {}));
function uE(t, e) {
  return cE(t, e);
}
m(uE, "validateVisitor");
function cE(t, e) {
  let r2 = fn(e, (i) => T(t[i]) === false), n2 = Jr(r2, (i) => ({ msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`, type: Kf.MISSING_METHOD, methodName: i }));
  return Ai(n2);
}
m(cE, "validateMissingCstMethods");
var _a48;
var Bl = (_a48 = class {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = fm(e, "nodeLocationTracking") ? e.nodeLocationTracking : wt.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = kr, this.cstFinallyStateUpdate = kr, this.cstPostTerminal = kr, this.cstPostNonTerminal = kr, this.cstPostRule = kr;
    else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Bf, this.setNodeLocationFromNode = Bf, this.cstPostRule = kr, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = kr, this.setNodeLocationFromNode = kr, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = jf, this.setNodeLocationFromNode = jf, this.cstPostRule = kr, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = kr, this.setNodeLocationFromNode = kr, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = kr, this.setNodeLocationFromNode = kr, this.cstPostRule = kr, this.setInitialNodeLocation = kr;
    else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = { startOffset: NaN, endOffset: NaN };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN };
  }
  setInitialNodeLocationFullRegular(e) {
    let r2 = this.LA(1);
    e.location = { startOffset: r2.startOffset, startLine: r2.startLine, startColumn: r2.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN };
  }
  cstInvocationStateUpdate(e) {
    let r2 = { name: e, children: /* @__PURE__ */ Object.create(null) };
    this.setInitialNodeLocation(r2), this.CST_STACK.push(r2);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    let r2 = this.LA(0), n2 = e.location;
    n2.startOffset <= r2.startOffset ? (n2.endOffset = r2.endOffset, n2.endLine = r2.endLine, n2.endColumn = r2.endColumn) : (n2.startOffset = NaN, n2.startLine = NaN, n2.startColumn = NaN);
  }
  cstPostRuleOnlyOffset(e) {
    let r2 = this.LA(0), n2 = e.location;
    n2.startOffset <= r2.startOffset ? n2.endOffset = r2.endOffset : n2.startOffset = NaN;
  }
  cstPostTerminal(e, r2) {
    let n2 = this.CST_STACK[this.CST_STACK.length - 1];
    qg(n2, r2, e), this.setNodeLocationFromToken(n2.location, r2);
  }
  cstPostNonTerminal(e, r2) {
    let n2 = this.CST_STACK[this.CST_STACK.length - 1];
    jg(n2, r2, e), this.setNodeLocationFromNode(n2.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (sn(this.baseCstVisitorConstructor)) {
      let e = Bg(this.className, h(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (sn(this.baseCstVisitorWithDefaultsConstructor)) {
      let e = Wg(this.className, h(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    let e = this.RULE_STACK;
    return e[e.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    let e = this.RULE_STACK;
    return e[e.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    let e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }
}, m(_a48, "TreeBuilder"), _a48);
var _a49;
var Wl = (_a49 = class {
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== true) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : es;
  }
  LA(e) {
    let r2 = this.currIdx + e;
    return r2 < 0 || this.tokVectorLength <= r2 ? es : this.tokVector[r2];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}, m(_a49, "LexerAdapter"), _a49);
var _a50;
var Kl = (_a50 = class {
  ACTION(e) {
    return e.call(this);
  }
  consume(e, r2, n2) {
    return this.consumeInternal(r2, e, n2);
  }
  subrule(e, r2, n2) {
    return this.subruleInternal(r2, e, n2);
  }
  option(e, r2) {
    return this.optionInternal(r2, e);
  }
  or(e, r2) {
    return this.orInternal(r2, e);
  }
  many(e, r2) {
    return this.manyInternal(e, r2);
  }
  atLeastOne(e, r2) {
    return this.atLeastOneInternal(e, r2);
  }
  CONSUME(e, r2) {
    return this.consumeInternal(e, 0, r2);
  }
  CONSUME1(e, r2) {
    return this.consumeInternal(e, 1, r2);
  }
  CONSUME2(e, r2) {
    return this.consumeInternal(e, 2, r2);
  }
  CONSUME3(e, r2) {
    return this.consumeInternal(e, 3, r2);
  }
  CONSUME4(e, r2) {
    return this.consumeInternal(e, 4, r2);
  }
  CONSUME5(e, r2) {
    return this.consumeInternal(e, 5, r2);
  }
  CONSUME6(e, r2) {
    return this.consumeInternal(e, 6, r2);
  }
  CONSUME7(e, r2) {
    return this.consumeInternal(e, 7, r2);
  }
  CONSUME8(e, r2) {
    return this.consumeInternal(e, 8, r2);
  }
  CONSUME9(e, r2) {
    return this.consumeInternal(e, 9, r2);
  }
  SUBRULE(e, r2) {
    return this.subruleInternal(e, 0, r2);
  }
  SUBRULE1(e, r2) {
    return this.subruleInternal(e, 1, r2);
  }
  SUBRULE2(e, r2) {
    return this.subruleInternal(e, 2, r2);
  }
  SUBRULE3(e, r2) {
    return this.subruleInternal(e, 3, r2);
  }
  SUBRULE4(e, r2) {
    return this.subruleInternal(e, 4, r2);
  }
  SUBRULE5(e, r2) {
    return this.subruleInternal(e, 5, r2);
  }
  SUBRULE6(e, r2) {
    return this.subruleInternal(e, 6, r2);
  }
  SUBRULE7(e, r2) {
    return this.subruleInternal(e, 7, r2);
  }
  SUBRULE8(e, r2) {
    return this.subruleInternal(e, 8, r2);
  }
  SUBRULE9(e, r2) {
    return this.subruleInternal(e, 9, r2);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, r2, n2 = ts) {
    if (pm(this.definedRulesNames, e)) {
      let o2 = { message: fr.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), type: et.DUPLICATE_RULE_NAME, ruleName: e };
      this.definitionErrors.push(o2);
    }
    this.definedRulesNames.push(e);
    let i = this.defineRule(e, r2, n2);
    return this[e] = i, i;
  }
  OVERRIDE_RULE(e, r2, n2 = ts) {
    let i = bg(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(i);
    let a = this.defineRule(e, r2, n2);
    return this[e] = a, a;
  }
  BACKTRACK(e, r2) {
    return function() {
      this.isBackTrackingStack.push(1);
      let n2 = this.saveRecogState();
      try {
        return e.apply(this, r2), true;
      } catch (i) {
        if (Rn2(i)) return false;
        throw i;
      } finally {
        this.reloadRecogState(n2), this.isBackTrackingStack.pop();
      }
    };
  }
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return xl(Xr(this.gastProductionsCache));
  }
}, m(_a50, "RecognizerApi"), _a50);
var _a51;
var Vl = (_a51 = class {
  initRecognizerEngine(e, r2) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Hi, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, fm(r2, "serializedGrammar")) throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (N(e)) {
      if (Cr(e)) throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number") throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (N(e)) this.tokensMap = Rn(e, (a, o2) => (a[o2.name] = o2, a), {});
    else if (fm(e, "modes") && Ui(Qr(Xr(e.modes)), ug)) {
      let a = Qr(Xr(e.modes)), o2 = mp(a);
      this.tokensMap = Rn(o2, (l, u) => (l[u.name] = u, l), {});
    } else if (m2(e)) this.tokensMap = _f(e);
    else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = Bt;
    let n2 = fm(e, "modes") ? Qr(Xr(e.modes)) : Xr(e), i = Ui(n2, (a) => Cr(a.categoryMatches));
    this.tokenMatcher = i ? Hi : Wr, Kr(Xr(this.tokensMap));
  }
  defineRule(e, r2, n2) {
    if (this.selfAnalysisDone) throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    let i = fm(n2, "resyncEnabled") ? n2.resyncEnabled : ts.resyncEnabled, a = fm(n2, "recoveryValueFunc") ? n2.recoveryValueFunc : ts.recoveryValueFunc, o2 = this.ruleShortNameIdx << 12;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[o2] = e, this.fullRuleNameToShort[e] = o2;
    let l;
    return this.outputCst === true ? l = m(function(...d) {
      try {
        this.ruleInvocationStateUpdate(o2, e, this.subruleIdx), r2.apply(this, d);
        let m3 = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(m3), m3;
      } catch (m3) {
        return this.invokeRuleCatch(m3, i, a);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, "invokeRuleWithTry") : l = m(function(...d) {
      try {
        return this.ruleInvocationStateUpdate(o2, e, this.subruleIdx), r2.apply(this, d);
      } catch (m3) {
        return this.invokeRuleCatch(m3, i, a);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, "invokeRuleWithTryCst"), Object.assign(l, { ruleName: e, originalGrammarAction: r2 });
  }
  invokeRuleCatch(e, r2, n2) {
    let i = this.RULE_STACK.length === 1, a = r2 && !this.isBackTracking() && this.recoveryEnabled;
    if (Rn2(e)) {
      let o2 = e;
      if (a) {
        let l = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(l)) if (o2.resyncedTokens = this.reSyncTo(l), this.outputCst) {
          let u = this.CST_STACK[this.CST_STACK.length - 1];
          return u.recoveredNode = true, u;
        } else return n2(e);
        else {
          if (this.outputCst) {
            let u = this.CST_STACK[this.CST_STACK.length - 1];
            u.recoveredNode = true, o2.partialCstResult = u;
          }
          throw o2;
        }
      } else {
        if (i) return this.moveToTerminatedState(), n2(e);
        throw o2;
      }
    } else throw e;
  }
  optionInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(512, r2);
    return this.optionInternalLogic(e, r2, n2);
  }
  optionInternalLogic(e, r2, n2) {
    let i = this.getLaFuncFromCache(n2), a;
    if (typeof e != "function") {
      a = e.DEF;
      let o2 = e.GATE;
      if (o2 !== void 0) {
        let l = i;
        i = m(() => o2.call(this) && l.call(this), "lookAheadFunc");
      }
    } else a = e;
    if (i.call(this) === true) return a.call(this);
  }
  atLeastOneInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(1024, e);
    return this.atLeastOneInternalLogic(e, r2, n2);
  }
  atLeastOneInternalLogic(e, r2, n2) {
    let i = this.getLaFuncFromCache(n2), a;
    if (typeof r2 != "function") {
      a = r2.DEF;
      let o2 = r2.GATE;
      if (o2 !== void 0) {
        let l = i;
        i = m(() => o2.call(this) && l.call(this), "lookAheadFunc");
      }
    } else a = r2;
    if (i.call(this) === true) {
      let o2 = this.doSingleRepetition(a);
      for (; i.call(this) === true && o2 === true; ) o2 = this.doSingleRepetition(a);
    } else throw this.raiseEarlyExitException(e, Ie.REPETITION_MANDATORY, r2.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, r2], i, 1024, e, Il);
  }
  atLeastOneSepFirstInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(1536, e);
    this.atLeastOneSepFirstInternalLogic(e, r2, n2);
  }
  atLeastOneSepFirstInternalLogic(e, r2, n2) {
    let i = r2.DEF, a = r2.SEP;
    if (this.getLaFuncFromCache(n2).call(this) === true) {
      i.call(this);
      let l = m(() => this.tokenMatcher(this.LA(1), a), "separatorLookAheadFunc");
      for (; this.tokenMatcher(this.LA(1), a) === true; ) this.CONSUME(a), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, a, l, i, Ca], l, 1536, e, Ca);
    } else throw this.raiseEarlyExitException(e, Ie.REPETITION_MANDATORY_WITH_SEPARATOR, r2.ERR_MSG);
  }
  manyInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(768, e);
    return this.manyInternalLogic(e, r2, n2);
  }
  manyInternalLogic(e, r2, n2) {
    let i = this.getLaFuncFromCache(n2), a;
    if (typeof r2 != "function") {
      a = r2.DEF;
      let l = r2.GATE;
      if (l !== void 0) {
        let u = i;
        i = m(() => l.call(this) && u.call(this), "lookaheadFunction");
      }
    } else a = r2;
    let o2 = true;
    for (; i.call(this) === true && o2 === true; ) o2 = this.doSingleRepetition(a);
    this.attemptInRepetitionRecovery(this.manyInternal, [e, r2], i, 768, e, wl, o2);
  }
  manySepFirstInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(1280, e);
    this.manySepFirstInternalLogic(e, r2, n2);
  }
  manySepFirstInternalLogic(e, r2, n2) {
    let i = r2.DEF, a = r2.SEP;
    if (this.getLaFuncFromCache(n2).call(this) === true) {
      i.call(this);
      let l = m(() => this.tokenMatcher(this.LA(1), a), "separatorLookAheadFunc");
      for (; this.tokenMatcher(this.LA(1), a) === true; ) this.CONSUME(a), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, a, l, i, Aa], l, 1280, e, Aa);
    }
  }
  repetitionSepSecondInternal(e, r2, n2, i, a) {
    for (; n2(); ) this.CONSUME(r2), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, r2, n2, i, a], n2, 1536, e, a);
  }
  doSingleRepetition(e) {
    let r2 = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > r2;
  }
  orInternal(e, r2) {
    let n2 = this.getKeyForAutomaticLookahead(256, r2), i = N(e) ? e : e.DEF, o2 = this.getLaFuncFromCache(n2).call(this, i);
    if (o2 !== void 0) return i[o2].ALT.call(this);
    this.raiseNoAltException(r2, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
      let e = this.LA(1), r2 = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: this.getCurrRuleFullName() });
      this.SAVE_ERROR(new wa(r2, e));
    }
  }
  subruleInternal(e, r2, n2) {
    let i;
    try {
      let a = n2 !== void 0 ? n2.ARGS : void 0;
      return this.subruleIdx = r2, i = e.apply(this, a), this.cstPostNonTerminal(i, n2 !== void 0 && n2.LABEL !== void 0 ? n2.LABEL : e.ruleName), i;
    } catch (a) {
      throw this.subruleInternalError(a, n2, e.ruleName);
    }
  }
  subruleInternalError(e, r2, n2) {
    throw Rn2(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, r2 !== void 0 && r2.LABEL !== void 0 ? r2.LABEL : n2), delete e.partialCstResult), e;
  }
  consumeInternal(e, r2, n2) {
    let i;
    try {
      let a = this.LA(1);
      this.tokenMatcher(a, e) === true ? (this.consumeToken(), i = a) : this.consumeInternalError(e, a, n2);
    } catch (a) {
      i = this.consumeInternalRecovery(e, r2, a);
    }
    return this.cstPostTerminal(n2 !== void 0 && n2.LABEL !== void 0 ? n2.LABEL : e.name, i), i;
  }
  consumeInternalError(e, r2, n2) {
    let i, a = this.LA(0);
    throw n2 !== void 0 && n2.ERR_MSG ? i = n2.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: r2, previous: a, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new ri(i, r2, a));
  }
  consumeInternalRecovery(e, r2, n2) {
    if (this.recoveryEnabled && n2.name === "MismatchedTokenException" && !this.isBackTracking()) {
      let i = this.getFollowsForInRuleRecovery(e, r2);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (a) {
        throw a.name === Gf ? n2 : a;
      }
    } else throw n2;
  }
  saveRecogState() {
    let e = this.errors, r2 = _f(this.RULE_STACK);
    return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: r2, CST_STACK: this.CST_STACK };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }
  ruleInvocationStateUpdate(e, r2, n2) {
    this.RULE_OCCURRENCE_STACK.push(n2), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(r2);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    let e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), Bt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}, m(_a51, "RecognizerEngine"), _a51);
var _a52;
var Hl = (_a52 = class {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = fm(e, "errorMessageProvider") ? e.errorMessageProvider : wt.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (Rn2(e)) return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: _f(this.RULE_OCCURRENCE_STACK) }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return _f(this._errors);
  }
  set errors(e) {
    this._errors = e;
  }
  raiseEarlyExitException(e, r2, n2) {
    let i = this.getCurrRuleFullName(), a = this.getGAstProductions()[i], l = Zi(e, a, r2, this.maxLookahead)[0], u = [];
    for (let d = 1; d <= this.maxLookahead; d++) u.push(this.LA(d));
    let c = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: l, actual: u, previous: this.LA(0), customUserDescription: n2, ruleName: i });
    throw this.SAVE_ERROR(new Ia(c, this.LA(1), this.LA(0)));
  }
  raiseNoAltException(e, r2) {
    let n2 = this.getCurrRuleFullName(), i = this.getGAstProductions()[n2], a = Ji(e, i, this.maxLookahead), o2 = [];
    for (let c = 1; c <= this.maxLookahead; c++) o2.push(this.LA(c));
    let l = this.LA(0), u = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: a, actual: o2, previous: l, customUserDescription: r2, ruleName: this.getCurrRuleFullName() });
    throw this.SAVE_ERROR(new Na(u, this.LA(1), l));
  }
}, m(_a52, "ErrorHandler"), _a52);
var _a53;
var Yl = (_a53 = class {
  initContentAssist() {
  }
  computeContentAssist(e, r2) {
    let n2 = this.gastProductionsCache[e];
    if (sn(n2)) throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return _l([n2], r2, this.tokenMatcher, this.maxLookahead);
  }
  getNextPossibleTokenTypes(e) {
    let r2 = De(e.ruleStack), i = this.getGAstProductions()[r2];
    return new Nl(i, e).startWalking();
  }
}, m(_a53, "ContentAssist"), _a53);
var Zl = { description: "This Object indicates the Parser is during Recording Phase" };
Object.freeze(Zl);
var Kg = true;
var Vg = Math.pow(2, 8) - 1;
var Yg = Tn({ name: "RECORDING_PHASE_TOKEN", pattern: we.NA });
Kr([Yg]);
var Xg = Hr(Yg, `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, -1, -1, -1, -1, -1, -1);
Object.freeze(Xg);
var dE = { name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, children: {} };
var _a54;
var Xl = (_a54 = class {
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = false;
  }
  enableRecording() {
    this.RECORDING_PHASE = true, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        let r2 = e > 0 ? e : "";
        this[`CONSUME${r2}`] = function(n2, i) {
          return this.consumeInternalRecord(n2, e, i);
        }, this[`SUBRULE${r2}`] = function(n2, i) {
          return this.subruleInternalRecord(n2, e, i);
        }, this[`OPTION${r2}`] = function(n2) {
          return this.optionInternalRecord(n2, e);
        }, this[`OR${r2}`] = function(n2) {
          return this.orInternalRecord(n2, e);
        }, this[`MANY${r2}`] = function(n2) {
          this.manyInternalRecord(e, n2);
        }, this[`MANY_SEP${r2}`] = function(n2) {
          this.manySepFirstInternalRecord(e, n2);
        }, this[`AT_LEAST_ONE${r2}`] = function(n2) {
          this.atLeastOneInternalRecord(e, n2);
        }, this[`AT_LEAST_ONE_SEP${r2}`] = function(n2) {
          this.atLeastOneSepFirstInternalRecord(e, n2);
        };
      }
      this.consume = function(e, r2, n2) {
        return this.consumeInternalRecord(r2, e, n2);
      }, this.subrule = function(e, r2, n2) {
        return this.subruleInternalRecord(r2, e, n2);
      }, this.option = function(e, r2) {
        return this.optionInternalRecord(r2, e);
      }, this.or = function(e, r2) {
        return this.orInternalRecord(r2, e);
      }, this.many = function(e, r2) {
        this.manyInternalRecord(e, r2);
      }, this.atLeastOne = function(e, r2) {
        this.atLeastOneInternalRecord(e, r2);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = false, this.TRACE_INIT("Deleting Recording methods", () => {
      let e = this;
      for (let r2 = 0; r2 < 10; r2++) {
        let n2 = r2 > 0 ? r2 : "";
        delete e[`CONSUME${n2}`], delete e[`SUBRULE${n2}`], delete e[`OPTION${n2}`], delete e[`OR${n2}`], delete e[`MANY${n2}`], delete e[`MANY_SEP${n2}`], delete e[`AT_LEAST_ONE${n2}`], delete e[`AT_LEAST_ONE_SEP${n2}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  ACTION_RECORD(e) {
  }
  BACKTRACK_RECORD(e, r2) {
    return () => true;
  }
  LA_RECORD(e) {
    return es;
  }
  topLevelRuleRecord(e, r2) {
    try {
      let n2 = new kt({ definition: [], name: e });
      return n2.name = e, this.recordingProdStack.push(n2), r2.call(this), this.recordingProdStack.pop(), n2;
    } catch (n2) {
      if (n2.KNOWN_RECORDER_ERROR !== true) try {
        n2.message = n2.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
      } catch {
        throw n2;
      }
      throw n2;
    }
  }
  optionInternalRecord(e, r2) {
    return _a55.call(this, pe, e, r2);
  }
  atLeastOneInternalRecord(e, r2) {
    _a55.call(this, $e, r2, e);
  }
  atLeastOneSepFirstInternalRecord(e, r2) {
    _a55.call(this, xe, r2, e, Kg);
  }
  manyInternalRecord(e, r2) {
    _a55.call(this, se, r2, e);
  }
  manySepFirstInternalRecord(e, r2) {
    _a55.call(this, ye, r2, e, Kg);
  }
  orInternalRecord(e, r2) {
    return pE.call(this, e, r2);
  }
  subruleInternalRecord(e, r2, n2) {
    if (Jl(r2), !e || fm(e, "ruleName") === false) {
      let l = new Error(`<SUBRULE${Hg(r2)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw l.KNOWN_RECORDER_ERROR = true, l;
    }
    let i = Df(this.recordingProdStack), a = e.ruleName, o2 = new de({ idx: r2, nonTerminalName: a, label: n2 == null ? void 0 : n2.LABEL, referencedRule: void 0 });
    return i.definition.push(o2), this.outputCst ? dE : Zl;
  }
  consumeInternalRecord(e, r2, n2) {
    if (Jl(r2), !Nf2(e)) {
      let o2 = new Error(`<CONSUME${Hg(r2)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw o2.KNOWN_RECORDER_ERROR = true, o2;
    }
    let i = Df(this.recordingProdStack), a = new ne({ idx: r2, terminalType: e, label: n2 == null ? void 0 : n2.LABEL });
    return i.definition.push(a), Xg;
  }
}, m(_a54, "GastRecorder"), _a54);
function _a55(t, e, r2, n2 = false) {
  Jl(r2);
  let i = Df(this.recordingProdStack), a = T(e) ? e : e.DEF, o2 = new t({ definition: [], idx: r2 });
  return n2 && (o2.separator = e.SEP), fm(e, "MAX_LOOKAHEAD") && (o2.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(o2), a.call(this), i.definition.push(o2), this.recordingProdStack.pop(), Zl;
}
m(_a55, "recordProd");
function pE(t, e) {
  Jl(e);
  let r2 = Df(this.recordingProdStack), n2 = N(t) === false, i = n2 === false ? t : t.DEF, a = new Te({ definition: [], idx: e, ignoreAmbiguities: n2 && t.IGNORE_AMBIGUITIES === true });
  fm(t, "MAX_LOOKAHEAD") && (a.maxLookahead = t.MAX_LOOKAHEAD);
  let o2 = fp(i, (l) => T(l.GATE));
  return a.hasPredicates = o2, r2.definition.push(a), Zr(i, (l) => {
    let u = new Re({ definition: [] });
    a.definition.push(u), fm(l, "IGNORE_AMBIGUITIES") ? u.ignoreAmbiguities = l.IGNORE_AMBIGUITIES : fm(l, "GATE") && (u.ignoreAmbiguities = true), this.recordingProdStack.push(u), l.ALT.call(this), this.recordingProdStack.pop();
  }), Zl;
}
m(pE, "recordOrProd");
function Hg(t) {
  return t === 0 ? "" : `${t}`;
}
m(Hg, "getIdxSuffix");
function Jl(t) {
  if (t < 0 || t > Vg) {
    let e = new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${Vg + 1}`);
    throw e.KNOWN_RECORDER_ERROR = true, e;
  }
}
m(Jl, "assertMethodIdxIsValid");
var _a56;
var Ql = (_a56 = class {
  initPerformanceTracer(e) {
    if (fm(e, "traceInitPerf")) {
      let r2 = e.traceInitPerf, n2 = typeof r2 == "number";
      this.traceInitMaxIdent = n2 ? r2 : 1 / 0, this.traceInitPerf = n2 ? r2 > 0 : r2;
    } else this.traceInitMaxIdent = 0, this.traceInitPerf = wt.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, r2) {
    if (this.traceInitPerf === true) {
      this.traceInitIndent++;
      let n2 = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${n2}--> <${e}>`);
      let { time: i, value: a } = Ra(r2), o2 = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && o2(`${n2}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, a;
    } else return r2();
  }
}, m(_a56, "PerformanceTracer"), _a56);
function Jg(t, e) {
  e.forEach((r2) => {
    let n2 = r2.prototype;
    Object.getOwnPropertyNames(n2).forEach((i) => {
      if (i === "constructor") return;
      let a = Object.getOwnPropertyDescriptor(n2, i);
      a && (a.get || a.set) ? Object.defineProperty(t.prototype, i, a) : t.prototype[i] = r2.prototype[i];
    });
  });
}
m(Jg, "applyMixins");
var es = Hr(Bt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(es);
var wt = Object.freeze({ recoveryEnabled: false, maxLookahead: 3, dynamicTokensEnabled: false, outputCst: true, errorMessageProvider: Yr, nodeLocationTracking: "none", traceInitPerf: false, skipValidations: false });
var ts = Object.freeze({ recoveryValueFunc: m(() => {
}, "recoveryValueFunc"), resyncEnabled: true });
var et;
(function(t) {
  t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(et || (et = {}));
function eu(t = void 0) {
  return function() {
    return t;
  };
}
m(eu, "EMPTY_ALT");
var _a57;
var Pa = (_a57 = class {
  static performSelfAnalysis(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e;
      this.selfAnalysisDone = true;
      let r2 = this.className;
      this.TRACE_INIT("toFastProps", () => {
        $a(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), Zr(this.definedRulesNames, (i) => {
            let o2 = this[i].originalGrammarAction, l;
            this.TRACE_INIT(`${i} Rule`, () => {
              l = this.topLevelRuleRecord(i, o2);
            }), this.gastProductionsCache[i] = l;
          });
        } finally {
          this.disableRecording();
        }
      });
      let n2 = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        n2 = Lg({ rules: Xr(this.gastProductionsCache) }), this.definitionErrors = this.definitionErrors.concat(n2);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (Cr(n2) && this.skipValidations === false) {
          let i = Dg({ rules: Xr(this.gastProductionsCache), tokenTypes: Xr(this.tokensMap), errMsgProvider: fr, grammarName: r2 }), a = Ng({ lookaheadStrategy: this.lookaheadStrategy, rules: Xr(this.gastProductionsCache), tokenTypes: Xr(this.tokensMap), grammarName: r2 });
          this.definitionErrors = this.definitionErrors.concat(i, a);
        }
      }), Cr(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        let i = jh(Xr(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, a;
        (a = (i = this.lookaheadStrategy).initialize) === null || a === void 0 || a.call(i, { rules: Xr(this.gastProductionsCache) }), this.preComputeLookaheadFunctions(Xr(this.gastProductionsCache));
      })), !_a57.DEFER_DEFINITION_ERRORS_HANDLING && !Cr(this.definitionErrors)) throw e = Jr(this.definitionErrors, (i) => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
    });
  }
  constructor(e, r2) {
    this.definitionErrors = [], this.selfAnalysisDone = false;
    let n2 = this;
    if (n2.initErrorHandler(r2), n2.initLexerAdapter(), n2.initLooksAhead(r2), n2.initRecognizerEngine(e, r2), n2.initRecoverable(r2), n2.initTreeBuilder(r2), n2.initContentAssist(), n2.initGastRecorder(r2), n2.initPerformanceTracer(r2), fm(r2, "ignoredIssues")) throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = fm(r2, "skipValidations") ? r2.skipValidations : wt.skipValidations;
  }
}, m(_a57, "Parser"), _a57);
Pa.DEFER_DEFINITION_ERRORS_HANDLING = false;
Jg(Pa, [Ml, Ul, Bl, Wl, Vl, Kl, Hl, Yl, Xl, Ql]);
var _a58;
var Oa = (_a58 = class extends Pa {
  constructor(e, r2 = wt) {
    let n2 = _f(r2);
    n2.outputCst = false, super(e, n2);
  }
}, m(_a58, "EmbeddedActionsParser"), _a58);
function ni(t, e, r2) {
  return `${t.name}_${e}_${r2}`;
}
m(ni, "buildATNKey");
var $n = 1;
var hE = 2;
var Zg = 4;
var Qg = 5;
var is = 7;
var gE = 8;
var yE = 9;
var TE = 10;
var RE = 11;
var ey = 12;
var _a59;
var La = (_a59 = class {
  constructor(e) {
    this.target = e;
  }
  isEpsilon() {
    return false;
  }
}, m(_a59, "AbstractTransition"), _a59);
var _a60;
var rs = (_a60 = class extends La {
  constructor(e, r2) {
    super(e), this.tokenType = r2;
  }
}, m(_a60, "AtomTransition"), _a60);
var _a61;
var Da = (_a61 = class extends La {
  constructor(e) {
    super(e);
  }
  isEpsilon() {
    return true;
  }
}, m(_a61, "EpsilonTransition"), _a61);
var _a62;
var ns = (_a62 = class extends La {
  constructor(e, r2, n2) {
    super(e), this.rule = r2, this.followState = n2;
  }
  isEpsilon() {
    return true;
  }
}, m(_a62, "RuleTransition"), _a62);
function ty(t) {
  let e = { decisionMap: {}, decisionStates: [], ruleToStartState: /* @__PURE__ */ new Map(), ruleToStopState: /* @__PURE__ */ new Map(), states: [] };
  $E(e, t);
  let r2 = t.length;
  for (let n2 = 0; n2 < r2; n2++) {
    let i = t[n2], a = ii(e, i, i);
    a !== void 0 && bE(e, i, a);
  }
  return e;
}
m(ty, "createATN");
function $E(t, e) {
  let r2 = e.length;
  for (let n2 = 0; n2 < r2; n2++) {
    let i = e[n2], a = it(t, i, void 0, { type: hE }), o2 = it(t, i, void 0, { type: is });
    a.stop = o2, t.ruleToStartState.set(i, a), t.ruleToStopState.set(i, o2);
  }
}
m($E, "createRuleStartAndStopATNStates");
function ry(t, e, r2) {
  return r2 instanceof ne ? Hf(t, e, r2.terminalType, r2) : r2 instanceof de ? IE(t, e, r2) : r2 instanceof Te ? CE(t, e, r2) : r2 instanceof pe ? SE(t, e, r2) : r2 instanceof se ? xE(t, e, r2) : r2 instanceof ye ? vE(t, e, r2) : r2 instanceof $e ? EE(t, e, r2) : r2 instanceof xe ? AE(t, e, r2) : ii(t, e, r2);
}
m(ry, "atom");
function xE(t, e, r2) {
  let n2 = it(t, e, r2, { type: Qg });
  xn(t, n2);
  let i = ss(t, e, n2, r2, ii(t, e, r2));
  return iy(t, e, r2, i);
}
m(xE, "repetition");
function vE(t, e, r2) {
  let n2 = it(t, e, r2, { type: Qg });
  xn(t, n2);
  let i = ss(t, e, n2, r2, ii(t, e, r2)), a = Hf(t, e, r2.separator, r2);
  return iy(t, e, r2, i, a);
}
m(vE, "repetitionSep");
function EE(t, e, r2) {
  let n2 = it(t, e, r2, { type: Zg });
  xn(t, n2);
  let i = ss(t, e, n2, r2, ii(t, e, r2));
  return ny(t, e, r2, i);
}
m(EE, "repetitionMandatory");
function AE(t, e, r2) {
  let n2 = it(t, e, r2, { type: Zg });
  xn(t, n2);
  let i = ss(t, e, n2, r2, ii(t, e, r2)), a = Hf(t, e, r2.separator, r2);
  return ny(t, e, r2, i, a);
}
m(AE, "repetitionMandatorySep");
function CE(t, e, r2) {
  let n2 = it(t, e, r2, { type: $n });
  xn(t, n2);
  let i = Jr(r2.definition, (o2) => ry(t, e, o2));
  return ss(t, e, n2, r2, ...i);
}
m(CE, "alternation");
function SE(t, e, r2) {
  let n2 = it(t, e, r2, { type: $n });
  xn(t, n2);
  let i = ss(t, e, n2, r2, ii(t, e, r2));
  return kE(t, e, r2, i);
}
m(SE, "option");
function ii(t, e, r2) {
  let n2 = fn(Jr(r2.definition, (i) => ry(t, e, i)), (i) => i !== void 0);
  return n2.length === 1 ? n2[0] : n2.length === 0 ? void 0 : wE(t, n2);
}
m(ii, "block");
function ny(t, e, r2, n2, i) {
  let a = n2.left, o2 = n2.right, l = it(t, e, r2, { type: RE });
  xn(t, l);
  let u = it(t, e, r2, { type: ey });
  return a.loopback = l, u.loopback = l, t.decisionMap[ni(e, i ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", r2.idx)] = l, He(o2, l), i === void 0 ? (He(l, a), He(l, u)) : (He(l, u), He(l, i.left), He(i.right, a)), { left: a, right: u };
}
m(ny, "plus");
function iy(t, e, r2, n2, i) {
  let a = n2.left, o2 = n2.right, l = it(t, e, r2, { type: TE });
  xn(t, l);
  let u = it(t, e, r2, { type: ey }), c = it(t, e, r2, { type: yE });
  return l.loopback = c, u.loopback = c, He(l, a), He(l, u), He(o2, c), i !== void 0 ? (He(c, u), He(c, i.left), He(i.right, a)) : He(c, l), t.decisionMap[ni(e, i ? "RepetitionWithSeparator" : "Repetition", r2.idx)] = l, { left: l, right: u };
}
m(iy, "star");
function kE(t, e, r2, n2) {
  let i = n2.left, a = n2.right;
  return He(i, a), t.decisionMap[ni(e, "Option", r2.idx)] = i, n2;
}
m(kE, "optional");
function xn(t, e) {
  return t.decisionStates.push(e), e.decision = t.decisionStates.length - 1, e.decision;
}
m(xn, "defineDecisionState");
function ss(t, e, r2, n2, ...i) {
  let a = it(t, e, n2, { type: gE, start: r2 });
  r2.end = a;
  for (let l of i) l !== void 0 ? (He(r2, l.left), He(l.right, a)) : He(r2, a);
  let o2 = { left: r2, right: a };
  return t.decisionMap[ni(e, NE(n2), n2.idx)] = r2, o2;
}
m(ss, "makeAlts");
function NE(t) {
  if (t instanceof Te) return "Alternation";
  if (t instanceof pe) return "Option";
  if (t instanceof se) return "Repetition";
  if (t instanceof ye) return "RepetitionWithSeparator";
  if (t instanceof $e) return "RepetitionMandatory";
  if (t instanceof xe) return "RepetitionMandatoryWithSeparator";
  throw new Error("Invalid production type encountered");
}
m(NE, "getProdType");
function wE(t, e) {
  let r2 = e.length;
  for (let a = 0; a < r2 - 1; a++) {
    let o2 = e[a], l;
    o2.left.transitions.length === 1 && (l = o2.left.transitions[0]);
    let u = l instanceof ns, c = l, d = e[a + 1].left;
    o2.left.type === $n && o2.right.type === $n && l !== void 0 && (u && c.followState === o2.right || l.target === o2.right) ? (u ? c.followState = d : l.target = d, _E(t, o2.right)) : He(o2.right, d);
  }
  let n2 = e[0], i = e[r2 - 1];
  return { left: n2.left, right: i.right };
}
m(wE, "makeBlock");
function Hf(t, e, r2, n2) {
  let i = it(t, e, n2, { type: $n }), a = it(t, e, n2, { type: $n });
  return Yf(i, new rs(a, r2)), { left: i, right: a };
}
m(Hf, "tokenRef");
function IE(t, e, r2) {
  let n2 = r2.referencedRule, i = t.ruleToStartState.get(n2), a = it(t, e, r2, { type: $n }), o2 = it(t, e, r2, { type: $n }), l = new ns(i, n2, o2);
  return Yf(a, l), { left: a, right: o2 };
}
m(IE, "ruleRef");
function bE(t, e, r2) {
  let n2 = t.ruleToStartState.get(e);
  He(n2, r2.left);
  let i = t.ruleToStopState.get(e);
  return He(r2.right, i), { left: n2, right: i };
}
m(bE, "buildRuleHandle");
function He(t, e) {
  let r2 = new Da(e);
  Yf(t, r2);
}
m(He, "epsilon");
function it(t, e, r2, n2) {
  let i = Object.assign({ atn: t, production: r2, epsilonOnlyTransitions: false, rule: e, transitions: [], nextTokenWithinRule: [], stateNumber: t.states.length }, n2);
  return t.states.push(i), i;
}
m(it, "newState");
function Yf(t, e) {
  t.transitions.length === 0 && (t.epsilonOnlyTransitions = e.isEpsilon()), t.transitions.push(e);
}
m(Yf, "addTransition");
function _E(t, e) {
  t.states.splice(t.states.indexOf(e), 1);
}
m(_E, "removeState");
var Ma = {};
var _a63;
var as = (_a63 = class {
  constructor() {
    this.map = {}, this.configs = [];
  }
  get size() {
    return this.configs.length;
  }
  finalize() {
    this.map = {};
  }
  add(e) {
    let r2 = Xf(e);
    r2 in this.map || (this.map[r2] = this.configs.length, this.configs.push(e));
  }
  get elements() {
    return this.configs;
  }
  get alts() {
    return Jr(this.configs, (e) => e.alt);
  }
  get key() {
    let e = "";
    for (let r2 in this.map) e += r2 + ":";
    return e;
  }
}, m(_a63, "ATNConfigSet"), _a63);
function Xf(t, e = true) {
  return `${e ? `a${t.alt}` : ""}s${t.state.stateNumber}:${t.stack.map((r2) => r2.stateNumber.toString()).join("_")}`;
}
m(Xf, "getATNConfigKey");
function PE(t, e) {
  let r2 = {};
  return (n2) => {
    let i = n2.toString(), a = r2[i];
    return a !== void 0 || (a = { atnStartState: t, decision: e, states: {} }, r2[i] = a), a;
  };
}
m(PE, "createDFACache");
var _a64;
var tu = (_a64 = class {
  constructor() {
    this.predicates = [];
  }
  is(e) {
    return e >= this.predicates.length || this.predicates[e];
  }
  set(e, r2) {
    this.predicates[e] = r2;
  }
  toString() {
    let e = "", r2 = this.predicates.length;
    for (let n2 = 0; n2 < r2; n2++) e += this.predicates[n2] === true ? "1" : "0";
    return e;
  }
}, m(_a64, "PredicateSet"), _a64);
var sy = new tu();
var _a65;
var Fa = (_a65 = class extends Xr2 {
  constructor(e) {
    var r2;
    super(), this.logging = (r2 = e == null ? void 0 : e.logging) !== null && r2 !== void 0 ? r2 : (n2) => console.log(n2);
  }
  initialize(e) {
    this.atn = ty(e.rules), this.dfas = OE(this.atn);
  }
  validateAmbiguousAlternationAlternatives() {
    return [];
  }
  validateEmptyOrAlternatives() {
    return [];
  }
  buildLookaheadForAlternation(e) {
    let { prodOccurrence: r2, rule: n2, hasPredicates: i, dynamicTokensEnabled: a } = e, o2 = this.dfas, l = this.logging, u = ni(n2, "Alternation", r2), d = this.atn.decisionMap[u].decision, m3 = Jr(Ol({ maxLookahead: 1, occurrence: r2, prodType: "Alternation", rule: n2 }), (h2) => Jr(h2, (y) => y[0]));
    if (ay(m3, false) && !a) {
      let h2 = Rn(m3, (y, k, w) => (Zr(k, (q2) => {
        q2 && (y[q2.tokenTypeIdx] = w, Zr(q2.categoryMatches, (M) => {
          y[M] = w;
        }));
      }), y), {});
      return i ? function(y) {
        var k;
        let w = this.LA(1), q2 = h2[w.tokenTypeIdx];
        if (y !== void 0 && q2 !== void 0) {
          let M = (k = y[q2]) === null || k === void 0 ? void 0 : k.GATE;
          if (M !== void 0 && M.call(this) === false) return;
        }
        return q2;
      } : function() {
        let y = this.LA(1);
        return h2[y.tokenTypeIdx];
      };
    } else return i ? function(h2) {
      let y = new tu(), k = h2 === void 0 ? 0 : h2.length;
      for (let q2 = 0; q2 < k; q2++) {
        let M = h2 == null ? void 0 : h2[q2].GATE;
        y.set(q2, M === void 0 || M.call(this));
      }
      let w = Jf.call(this, o2, d, y, l);
      return typeof w == "number" ? w : void 0;
    } : function() {
      let h2 = Jf.call(this, o2, d, sy, l);
      return typeof h2 == "number" ? h2 : void 0;
    };
  }
  buildLookaheadForOptional(e) {
    let { prodOccurrence: r2, rule: n2, prodType: i, dynamicTokensEnabled: a } = e, o2 = this.dfas, l = this.logging, u = ni(n2, i, r2), d = this.atn.decisionMap[u].decision, m3 = Jr(Ol({ maxLookahead: 1, occurrence: r2, prodType: i, rule: n2 }), (h2) => Jr(h2, (y) => y[0]));
    if (ay(m3) && m3[0][0] && !a) {
      let h2 = m3[0], y = Qr(h2);
      if (y.length === 1 && Cr(y[0].categoryMatches)) {
        let w = y[0].tokenTypeIdx;
        return function() {
          return this.LA(1).tokenTypeIdx === w;
        };
      } else {
        let k = Rn(y, (w, q2) => (q2 !== void 0 && (w[q2.tokenTypeIdx] = true, Zr(q2.categoryMatches, (M) => {
          w[M] = true;
        })), w), {});
        return function() {
          let w = this.LA(1);
          return k[w.tokenTypeIdx] === true;
        };
      }
    }
    return function() {
      let h2 = Jf.call(this, o2, d, sy, l);
      return typeof h2 == "object" ? false : h2 === 0;
    };
  }
}, m(_a65, "LLStarLookaheadStrategy"), _a65);
function ay(t, e = true) {
  let r2 = /* @__PURE__ */ new Set();
  for (let n2 of t) {
    let i = /* @__PURE__ */ new Set();
    for (let a of n2) {
      if (a === void 0) {
        if (e) break;
        return false;
      }
      let o2 = [a.tokenTypeIdx].concat(a.categoryMatches);
      for (let l of o2) if (r2.has(l)) {
        if (!i.has(l)) return false;
      } else r2.add(l), i.add(l);
    }
  }
  return true;
}
m(ay, "isLL1Sequence");
function OE(t) {
  let e = t.decisionStates.length, r2 = Array(e);
  for (let n2 = 0; n2 < e; n2++) r2[n2] = PE(t.decisionStates[n2], n2);
  return r2;
}
m(OE, "initATNSimulator");
function Jf(t, e, r2, n2) {
  let i = t[e](r2), a = i.start;
  if (a === void 0) {
    let l = WE(i.atnStartState);
    a = uy(i, ly(l)), i.start = a;
  }
  return LE.apply(this, [i, a, r2, n2]);
}
m(Jf, "adaptivePredict");
function LE(t, e, r2, n2) {
  let i = e, a = 1, o2 = [], l = this.LA(a++);
  for (; ; ) {
    let u = zE(i, l);
    if (u === void 0 && (u = DE.apply(this, [t, i, l, a, r2, n2])), u === Ma) return UE(o2, i, l);
    if (u.isAcceptState === true) return u.prediction;
    i = u, o2.push(l), l = this.LA(a++);
  }
}
m(LE, "performLookahead");
function DE(t, e, r2, n2, i, a) {
  let o2 = qE(e.configs, r2, i);
  if (o2.size === 0) return oy(t, e, r2, Ma), Ma;
  let l = ly(o2), u = BE(o2, i);
  if (u !== void 0) l.isAcceptState = true, l.prediction = u, l.configs.uniqueAlt = u;
  else if (YE(o2)) {
    let c = ym(o2.alts);
    l.isAcceptState = true, l.prediction = c, l.configs.uniqueAlt = c, ME.apply(this, [t, n2, o2.alts, a]);
  }
  return l = oy(t, e, r2, l), l;
}
m(DE, "computeLookaheadTarget");
function ME(t, e, r2, n2) {
  let i = [];
  for (let c = 1; c <= e; c++) i.push(this.LA(c).tokenType);
  let a = t.atnStartState, o2 = a.rule, l = a.production, u = FE({ topLevelRule: o2, ambiguityIndices: r2, production: l, prefixPath: i });
  n2(u);
}
m(ME, "reportLookaheadAmbiguity");
function FE(t) {
  let e = Jr(t.prefixPath, (i) => Vr(i)).join(", "), r2 = t.production.idx === 0 ? "" : t.production.idx, n2 = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${GE(t.production)}${r2}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
  return n2 = n2 + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n2;
}
m(FE, "buildAmbiguityError");
function GE(t) {
  if (t instanceof de) return "SUBRULE";
  if (t instanceof pe) return "OPTION";
  if (t instanceof Te) return "OR";
  if (t instanceof $e) return "AT_LEAST_ONE";
  if (t instanceof xe) return "AT_LEAST_ONE_SEP";
  if (t instanceof ye) return "MANY_SEP";
  if (t instanceof se) return "MANY";
  if (t instanceof ne) return "CONSUME";
  throw Error("non exhaustive match");
}
m(GE, "getProductionDslName");
function UE(t, e, r2) {
  let n2 = zi(e.configs.elements, (a) => a.state.transitions), i = s0(n2.filter((a) => a instanceof rs).map((a) => a.tokenType), (a) => a.tokenTypeIdx);
  return { actualToken: r2, possibleTokenTypes: i, tokenPath: t };
}
m(UE, "buildAdaptivePredictError");
function zE(t, e) {
  return t.edges[e.tokenTypeIdx];
}
m(zE, "getExistingTargetState");
function qE(t, e, r2) {
  let n2 = new as(), i = [];
  for (let o2 of t.elements) {
    if (r2.is(o2.alt) === false) continue;
    if (o2.state.type === is) {
      i.push(o2);
      continue;
    }
    let l = o2.state.transitions.length;
    for (let u = 0; u < l; u++) {
      let c = o2.state.transitions[u], d = jE(c, e);
      d !== void 0 && n2.add({ state: d, alt: o2.alt, stack: o2.stack });
    }
  }
  let a;
  if (i.length === 0 && n2.size === 1 && (a = n2), a === void 0) {
    a = new as();
    for (let o2 of n2.elements) ru(o2, a);
  }
  if (i.length > 0 && !VE(a)) for (let o2 of i) a.add(o2);
  return a;
}
m(qE, "computeReachSet");
function jE(t, e) {
  if (t instanceof rs && Ea(e, t.tokenType)) return t.target;
}
m(jE, "getReachableTarget");
function BE(t, e) {
  let r2;
  for (let n2 of t.elements) if (e.is(n2.alt) === true) {
    if (r2 === void 0) r2 = n2.alt;
    else if (r2 !== n2.alt) return;
  }
  return r2;
}
m(BE, "getUniqueAlt");
function ly(t) {
  return { configs: t, edges: {}, isAcceptState: false, prediction: -1 };
}
m(ly, "newDFAState");
function oy(t, e, r2, n2) {
  return n2 = uy(t, n2), e.edges[r2.tokenTypeIdx] = n2, n2;
}
m(oy, "addDFAEdge");
function uy(t, e) {
  if (e === Ma) return e;
  let r2 = e.configs.key, n2 = t.states[r2];
  return n2 !== void 0 ? n2 : (e.configs.finalize(), t.states[r2] = e, e);
}
m(uy, "addDFAState");
function WE(t) {
  let e = new as(), r2 = t.transitions.length;
  for (let n2 = 0; n2 < r2; n2++) {
    let a = { state: t.transitions[n2].target, alt: n2, stack: [] };
    ru(a, e);
  }
  return e;
}
m(WE, "computeStartState");
function ru(t, e) {
  let r2 = t.state;
  if (r2.type === is) {
    if (t.stack.length > 0) {
      let i = [...t.stack], o2 = { state: i.pop(), alt: t.alt, stack: i };
      ru(o2, e);
    } else e.add(t);
    return;
  }
  r2.epsilonOnlyTransitions || e.add(t);
  let n2 = r2.transitions.length;
  for (let i = 0; i < n2; i++) {
    let a = r2.transitions[i], o2 = KE(t, a);
    o2 !== void 0 && ru(o2, e);
  }
}
m(ru, "closure");
function KE(t, e) {
  if (e instanceof Da) return { state: e.target, alt: t.alt, stack: t.stack };
  if (e instanceof ns) {
    let r2 = [...t.stack, e.followState];
    return { state: e.target, alt: t.alt, stack: r2 };
  }
}
m(KE, "getEpsilonTarget");
function VE(t) {
  for (let e of t.elements) if (e.state.type === is) return true;
  return false;
}
m(VE, "hasConfigInRuleStopState");
function HE(t) {
  for (let e of t.elements) if (e.state.type !== is) return false;
  return true;
}
m(HE, "allConfigsInRuleStopStates");
function YE(t) {
  if (HE(t)) return true;
  let e = XE(t.elements);
  return JE(e) && !ZE(e);
}
m(YE, "hasConflictTerminatingPrediction");
function XE(t) {
  let e = /* @__PURE__ */ new Map();
  for (let r2 of t) {
    let n2 = Xf(r2, false), i = e.get(n2);
    i === void 0 && (i = {}, e.set(n2, i)), i[r2.alt] = true;
  }
  return e;
}
m(XE, "getConflictingAltSets");
function JE(t) {
  for (let e of Array.from(t.values())) if (Object.keys(e).length > 1) return true;
  return false;
}
m(JE, "hasConflictingAltSet");
function ZE(t) {
  for (let e of Array.from(t.values())) if (Object.keys(e).length === 1) return true;
  return false;
}
m(ZE, "hasStateAssociatedWithOneAlt");
ds();
var _a66;
var Ka = (_a66 = class {
  constructor() {
    this.nodeStack = [];
  }
  get current() {
    return this.nodeStack[this.nodeStack.length - 1] ?? this.rootNode;
  }
  buildRootNode(e) {
    return this.rootNode = new ps(e), this.rootNode.root = this.rootNode, this.nodeStack = [this.rootNode], this.rootNode;
  }
  buildCompositeNode(e) {
    let r2 = new li();
    return r2.grammarSource = e, r2.root = this.rootNode, this.current.content.push(r2), this.nodeStack.push(r2), r2;
  }
  buildLeafNode(e, r2) {
    let n2 = new oi(e.startOffset, e.image.length, Gi(e), e.tokenType, !r2);
    return n2.grammarSource = r2, n2.root = this.rootNode, this.current.content.push(n2), n2;
  }
  removeNode(e) {
    let r2 = e.container;
    if (r2) {
      let n2 = r2.content.indexOf(e);
      n2 >= 0 && r2.content.splice(n2, 1);
    }
  }
  addHiddenNodes(e) {
    let r2 = [];
    for (let a of e) {
      let o2 = new oi(a.startOffset, a.image.length, Gi(a), a.tokenType, true);
      o2.root = this.rootNode, r2.push(o2);
    }
    let n2 = this.current, i = false;
    if (n2.content.length > 0) {
      n2.content.push(...r2);
      return;
    }
    for (; n2.container; ) {
      let a = n2.container.content.indexOf(n2);
      if (a > 0) {
        n2.container.content.splice(a, 0, ...r2), i = true;
        break;
      }
      n2 = n2.container;
    }
    i || this.rootNode.content.unshift(...r2);
  }
  construct(e) {
    let r2 = this.current;
    typeof e.$type == "string" && !e.$infix && (this.current.astNode = e), e.$cstNode = r2;
    let n2 = this.nodeStack.pop();
    (n2 == null ? void 0 : n2.content.length) === 0 && this.removeNode(n2);
  }
}, m(_a66, "CstNodeBuilder"), _a66);
var _a67;
var Va = (_a67 = class {
  get hidden() {
    return false;
  }
  get astNode() {
    var _a135, _b;
    let e = typeof ((_a135 = this._astNode) == null ? void 0 : _a135.$type) == "string" ? this._astNode : (_b = this.container) == null ? void 0 : _b.astNode;
    if (!e) throw new Error("This node has no associated AST element");
    return e;
  }
  set astNode(e) {
    this._astNode = e;
  }
  get text() {
    return this.root.fullText.substring(this.offset, this.end);
  }
}, m(_a67, "AbstractCstNode"), _a67);
var _a68;
var oi = (_a68 = class extends Va {
  get offset() {
    return this._offset;
  }
  get length() {
    return this._length;
  }
  get end() {
    return this._offset + this._length;
  }
  get hidden() {
    return this._hidden;
  }
  get tokenType() {
    return this._tokenType;
  }
  get range() {
    return this._range;
  }
  constructor(e, r2, n2, i, a = false) {
    super(), this._hidden = a, this._offset = e, this._tokenType = i, this._length = r2, this._range = n2;
  }
}, m(_a68, "LeafCstNodeImpl"), _a68);
var _a69;
var li = (_a69 = class extends Va {
  constructor() {
    super(...arguments), this.content = new ep(this);
  }
  get offset() {
    var _a135;
    return ((_a135 = this.firstNonHiddenNode) == null ? void 0 : _a135.offset) ?? 0;
  }
  get length() {
    return this.end - this.offset;
  }
  get end() {
    var _a135;
    return ((_a135 = this.lastNonHiddenNode) == null ? void 0 : _a135.end) ?? 0;
  }
  get range() {
    let e = this.firstNonHiddenNode, r2 = this.lastNonHiddenNode;
    if (e && r2) {
      if (this._rangeCache === void 0) {
        let { range: n2 } = e, { range: i } = r2;
        this._rangeCache = { start: n2.start, end: i.end.line < n2.start.line ? n2.start : i.end };
      }
      return this._rangeCache;
    } else return { start: le.create(0, 0), end: le.create(0, 0) };
  }
  get firstNonHiddenNode() {
    for (let e of this.content) if (!e.hidden) return e;
    return this.content[0];
  }
  get lastNonHiddenNode() {
    for (let e = this.content.length - 1; e >= 0; e--) {
      let r2 = this.content[e];
      if (!r2.hidden) return r2;
    }
    return this.content[this.content.length - 1];
  }
}, m(_a69, "CompositeCstNodeImpl"), _a69);
var _a70;
var ep = (_a70 = class extends Array {
  constructor(e) {
    super(), this.parent = e, Object.setPrototypeOf(this, _a70.prototype);
  }
  push(...e) {
    return this.addParents(e), super.push(...e);
  }
  unshift(...e) {
    return this.addParents(e), super.unshift(...e);
  }
  splice(e, r2, ...n2) {
    return this.addParents(n2), super.splice(e, r2, ...n2);
  }
  addParents(e) {
    for (let r2 of e) r2.container = this.parent;
  }
}, m(_a70, "CstNodeContainer"), _a70);
var _a71;
var ps = (_a71 = class extends li {
  get text() {
    return this._text.substring(this.offset, this.end);
  }
  get fullText() {
    return this._text;
  }
  constructor(e) {
    super(), this._text = "", this._text = e ?? "";
  }
}, m(_a71, "RootCstNodeImpl"), _a71);
var du = Symbol("Datatype");
function tp(t) {
  return t.$type === du;
}
m(tp, "isDataTypeNode");
var cy = "​";
var fy = m((t) => t.endsWith(cy) ? t : t + cy, "withRuleSuffix");
var _a72;
var Ha = (_a72 = class {
  constructor(e) {
    var _a135;
    this._unorderedGroups = /* @__PURE__ */ new Map(), this.allRules = /* @__PURE__ */ new Map(), this.lexer = e.parser.Lexer;
    let r2 = this.lexer.definition, n2 = e.LanguageMetaData.mode === "production";
    ((_a135 = e.shared.profilers.LangiumProfiler) == null ? void 0 : _a135.isActive("parsing")) ? this.wrapper = new rp(r2, { ...e.parser.ParserConfig, skipValidations: n2, errorMessageProvider: e.parser.ParserErrorMessageProvider }, e.shared.profilers.LangiumProfiler.createTask("parsing", e.LanguageMetaData.languageId)) : this.wrapper = new mu(r2, { ...e.parser.ParserConfig, skipValidations: n2, errorMessageProvider: e.parser.ParserErrorMessageProvider });
  }
  alternatives(e, r2) {
    this.wrapper.wrapOr(e, r2);
  }
  optional(e, r2) {
    this.wrapper.wrapOption(e, r2);
  }
  many(e, r2) {
    this.wrapper.wrapMany(e, r2);
  }
  atLeastOne(e, r2) {
    this.wrapper.wrapAtLeastOne(e, r2);
  }
  getRule(e) {
    return this.allRules.get(e);
  }
  isRecording() {
    return this.wrapper.IS_RECORDING;
  }
  get unorderedGroups() {
    return this._unorderedGroups;
  }
  getRuleStack() {
    return this.wrapper.RULE_STACK;
  }
  finalize() {
    this.wrapper.wrapSelfAnalysis();
  }
}, m(_a72, "AbstractLangiumParser"), _a72);
var _a73;
var Ya = (_a73 = class extends Ha {
  get current() {
    return this.stack[this.stack.length - 1];
  }
  constructor(e) {
    super(e), this.nodeBuilder = new Ka(), this.stack = [], this.assignmentMap = /* @__PURE__ */ new Map(), this.operatorPrecedence = /* @__PURE__ */ new Map(), this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection;
  }
  rule(e, r2) {
    let n2 = this.computeRuleType(e), i;
    hn(e) && (i = e.name, this.registerPrecedenceMap(e));
    let a = this.wrapper.DEFINE_RULE(fy(e.name), this.startImplementation(n2, i, r2).bind(this));
    return this.allRules.set(e.name, a), nt(e) && e.entry && (this.mainRule = a), a;
  }
  registerPrecedenceMap(e) {
    let r2 = e.name, n2 = /* @__PURE__ */ new Map();
    for (let i = 0; i < e.operators.precedences.length; i++) {
      let a = e.operators.precedences[i];
      for (let o2 of a.operators) n2.set(o2.value, { precedence: i, rightAssoc: a.associativity === "right" });
    }
    this.operatorPrecedence.set(r2, n2);
  }
  computeRuleType(e) {
    return hn(e) ? yn(e) : e.fragment ? void 0 : ya(e) ? du : yn(e);
  }
  parse(e, r2 = {}) {
    this.nodeBuilder.buildRootNode(e);
    let n2 = this.lexerResult = this.lexer.tokenize(e);
    this.wrapper.input = n2.tokens;
    let i = r2.rule ? this.allRules.get(r2.rule) : this.mainRule;
    if (!i) throw new Error(r2.rule ? `No rule found with name '${r2.rule}'` : "No main rule available.");
    let a = this.doParse(i);
    return this.nodeBuilder.addHiddenNodes(n2.hidden), this.unorderedGroups.clear(), this.lexerResult = void 0, wi(a, { deep: true }), { value: a, lexerErrors: n2.errors, lexerReport: n2.report, parserErrors: this.wrapper.errors };
  }
  doParse(e) {
    let r2 = this.wrapper.rule(e);
    if (this.stack.length > 0 && (r2 = this.construct()), r2 === void 0) throw new Error("No result from parser");
    if (this.stack.length > 0) throw new Error("Parser stack is not empty after parsing");
    return r2;
  }
  startImplementation(e, r2, n2) {
    return (i) => {
      let a = !this.isRecording() && e !== void 0;
      if (a) {
        let o2 = { $type: e };
        this.stack.push(o2), e === du ? o2.value = "" : r2 !== void 0 && (o2.$infixName = r2);
      }
      return n2(i), a ? this.construct() : void 0;
    };
  }
  extractHiddenTokens(e) {
    let r2 = this.lexerResult.hidden;
    if (!r2.length) return [];
    let n2 = e.startOffset;
    for (let i = 0; i < r2.length; i++) if (r2[i].startOffset > n2) return r2.splice(0, i);
    return r2.splice(0, r2.length);
  }
  consume(e, r2, n2) {
    let i = this.wrapper.wrapConsume(e, r2);
    if (!this.isRecording() && this.isValidToken(i)) {
      let a = this.extractHiddenTokens(i);
      this.nodeBuilder.addHiddenNodes(a);
      let o2 = this.nodeBuilder.buildLeafNode(i, n2), { assignment: l, crossRef: u } = this.getAssignment(n2), c = this.current;
      if (l) {
        let d = Ht(n2) ? i.image : this.converter.convert(i.image, o2);
        this.assign(l.operator, l.feature, d, o2, u);
      } else if (tp(c)) {
        let d = i.image;
        Ht(n2) || (d = this.converter.convert(d, o2).toString()), c.value += d;
      }
    }
  }
  isValidToken(e) {
    return !e.isInsertedInRecovery && !isNaN(e.startOffset) && typeof e.endOffset == "number" && !isNaN(e.endOffset);
  }
  subrule(e, r2, n2, i, a) {
    let o2;
    !this.isRecording() && !n2 && (o2 = this.nodeBuilder.buildCompositeNode(i));
    let l;
    try {
      l = this.wrapper.wrapSubrule(e, r2, a);
    } finally {
      this.isRecording() || (l === void 0 && !n2 && (l = this.construct()), l !== void 0 && o2 && o2.length > 0 && this.performSubruleAssignment(l, i, o2));
    }
  }
  performSubruleAssignment(e, r2, n2) {
    let { assignment: i, crossRef: a } = this.getAssignment(r2);
    if (i) this.assign(i.operator, i.feature, e, n2, a);
    else if (!i) {
      let o2 = this.current;
      if (tp(o2)) o2.value += e.toString();
      else if (typeof e == "object" && e) {
        let u = this.assignWithoutOverride(e, o2);
        this.stack.pop(), this.stack.push(u);
      }
    }
  }
  action(e, r2) {
    if (!this.isRecording()) {
      let n2 = this.current;
      if (r2.feature && r2.operator) {
        n2 = this.construct(), this.nodeBuilder.removeNode(n2.$cstNode), this.nodeBuilder.buildCompositeNode(r2).content.push(n2.$cstNode);
        let a = { $type: e };
        this.stack.push(a), this.assign(r2.operator, r2.feature, n2, n2.$cstNode);
      } else n2.$type = e;
    }
  }
  construct() {
    if (this.isRecording()) return;
    let e = this.stack.pop();
    return this.nodeBuilder.construct(e), "$infixName" in e ? this.constructInfix(e, this.operatorPrecedence.get(e.$infixName)) : tp(e) ? this.converter.convert(e.value, e.$cstNode) : (bc(this.astReflection, e), e);
  }
  constructInfix(e, r2) {
    let n2 = e.parts;
    if (!Array.isArray(n2) || n2.length === 0) return;
    let i = e.operators;
    if (!Array.isArray(i) || n2.length < 2) return n2[0];
    let a = 0, o2 = -1;
    for (let w = 0; w < i.length; w++) {
      let q2 = i[w], M = r2.get(q2) ?? { precedence: 1 / 0, rightAssoc: false };
      M.precedence > o2 ? (o2 = M.precedence, a = w) : M.precedence === o2 && (M.rightAssoc || (a = w));
    }
    let l = i.slice(0, a), u = i.slice(a + 1), c = n2.slice(0, a + 1), d = n2.slice(a + 1), m3 = { $infixName: e.$infixName, $type: e.$type, $cstNode: e.$cstNode, parts: c, operators: l }, h2 = { $infixName: e.$infixName, $type: e.$type, $cstNode: e.$cstNode, parts: d, operators: u }, y = this.constructInfix(m3, r2), k = this.constructInfix(h2, r2);
    return { $type: e.$type, $cstNode: e.$cstNode, left: y, operator: i[a], right: k };
  }
  getAssignment(e) {
    if (!this.assignmentMap.has(e)) {
      let r2 = Fr(e, lr);
      this.assignmentMap.set(e, { assignment: r2, crossRef: r2 && ur(r2.terminal) ? r2.terminal.isMulti ? "multi" : "single" : void 0 });
    }
    return this.assignmentMap.get(e);
  }
  assign(e, r2, n2, i, a) {
    let o2 = this.current, l;
    switch (a === "single" && typeof n2 == "string" ? l = this.linker.buildReference(o2, r2, i, n2) : a === "multi" && typeof n2 == "string" ? l = this.linker.buildMultiReference(o2, r2, i, n2) : l = n2, e) {
      case "=": {
        o2[r2] = l;
        break;
      }
      case "?=": {
        o2[r2] = true;
        break;
      }
      case "+=":
        Array.isArray(o2[r2]) || (o2[r2] = []), o2[r2].push(l);
    }
  }
  assignWithoutOverride(e, r2) {
    for (let [i, a] of Object.entries(r2)) {
      let o2 = e[i];
      o2 === void 0 ? e[i] = a : Array.isArray(o2) && Array.isArray(a) && (a.push(...o2), e[i] = a);
    }
    let n2 = e.$cstNode;
    return n2 && (n2.astNode = void 0, e.$cstNode = void 0), e;
  }
  get definitionErrors() {
    return this.wrapper.definitionErrors;
  }
}, m(_a73, "LangiumParser"), _a73);
var _a74;
var pu = (_a74 = class {
  buildMismatchTokenMessage(e) {
    return Yr.buildMismatchTokenMessage(e);
  }
  buildNotAllInputParsedMessage(e) {
    return Yr.buildNotAllInputParsedMessage(e);
  }
  buildNoViableAltMessage(e) {
    return Yr.buildNoViableAltMessage(e);
  }
  buildEarlyExitMessage(e) {
    return Yr.buildEarlyExitMessage(e);
  }
}, m(_a74, "AbstractParserErrorMessageProvider"), _a74);
var _a75;
var ms = (_a75 = class extends pu {
  buildMismatchTokenMessage({ expected: e, actual: r2 }) {
    return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${r2.image}\`.`;
  }
  buildNotAllInputParsedMessage({ firstRedundant: e }) {
    return `Expecting end of file but found \`${e.image}\`.`;
  }
}, m(_a75, "LangiumParserErrorMessageProvider"), _a75);
var _a76;
var Xa = (_a76 = class extends Ha {
  constructor() {
    super(...arguments), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  action() {
  }
  construct() {
  }
  parse(e) {
    this.resetState();
    let r2 = this.lexer.tokenize(e, { mode: "partial" });
    return this.tokens = r2.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), { tokens: this.tokens, elementStack: [...this.lastElementStack], tokenIndex: this.nextTokenIndex };
  }
  rule(e, r2) {
    let n2 = this.wrapper.DEFINE_RULE(fy(e.name), this.startImplementation(r2).bind(this));
    return this.allRules.set(e.name, n2), e.entry && (this.mainRule = n2), n2;
  }
  resetState() {
    this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  startImplementation(e) {
    return (r2) => {
      let n2 = this.keepStackSize();
      try {
        e(r2);
      } finally {
        this.resetStackSize(n2);
      }
    };
  }
  removeUnexpectedElements() {
    this.elementStack.splice(this.stackSize);
  }
  keepStackSize() {
    let e = this.elementStack.length;
    return this.stackSize = e, e;
  }
  resetStackSize(e) {
    this.removeUnexpectedElements(), this.stackSize = e;
  }
  consume(e, r2, n2) {
    this.wrapper.wrapConsume(e, r2), this.isRecording() || (this.lastElementStack = [...this.elementStack, n2], this.nextTokenIndex = this.currIdx + 1);
  }
  subrule(e, r2, n2, i, a) {
    this.before(i), this.wrapper.wrapSubrule(e, r2, a), this.after(i);
  }
  before(e) {
    this.isRecording() || this.elementStack.push(e);
  }
  after(e) {
    if (!this.isRecording()) {
      let r2 = this.elementStack.lastIndexOf(e);
      r2 >= 0 && this.elementStack.splice(r2);
    }
  }
  get currIdx() {
    return this.wrapper.currIdx;
  }
}, m(_a76, "LangiumCompletionParser"), _a76);
var eA = { recoveryEnabled: true, nodeLocationTracking: "full", skipValidations: true, errorMessageProvider: new ms() };
var _a77;
var mu = (_a77 = class extends Oa {
  constructor(e, r2) {
    let n2 = r2 && "maxLookahead" in r2;
    super(e, { ...eA, lookaheadStrategy: n2 ? new Xr2({ maxLookahead: r2.maxLookahead }) : new Fa({ logging: r2.skipValidations ? () => {
    } : void 0 }), ...r2 });
  }
  get IS_RECORDING() {
    return this.RECORDING_PHASE;
  }
  DEFINE_RULE(e, r2, n2) {
    return this.RULE(e, r2, n2);
  }
  wrapSelfAnalysis() {
    this.performSelfAnalysis();
  }
  wrapConsume(e, r2) {
    return this.consume(e, r2, void 0);
  }
  wrapSubrule(e, r2, n2) {
    return this.subrule(e, r2, { ARGS: [n2] });
  }
  wrapOr(e, r2) {
    this.or(e, r2);
  }
  wrapOption(e, r2) {
    this.option(e, r2);
  }
  wrapMany(e, r2) {
    this.many(e, r2);
  }
  wrapAtLeastOne(e, r2) {
    this.atLeastOne(e, r2);
  }
  rule(e) {
    return e.call(this, {});
  }
}, m(_a77, "ChevrotainWrapper"), _a77);
var _a78;
var rp = (_a78 = class extends mu {
  constructor(e, r2, n2) {
    super(e, r2), this.task = n2;
  }
  rule(e) {
    this.task.start(), this.task.startSubTask(this.ruleName(e));
    try {
      return super.rule(e);
    } finally {
      this.task.stopSubTask(this.ruleName(e)), this.task.stop();
    }
  }
  ruleName(e) {
    return e.ruleName;
  }
  subrule(e, r2, n2) {
    this.task.startSubTask(this.ruleName(r2));
    try {
      return super.subrule(e, r2, n2);
    } finally {
      this.task.stopSubTask(this.ruleName(r2));
    }
  }
}, m(_a78, "ProfilerWrapper"), _a78);
function Ja(t, e, r2) {
  return tA({ parser: e, tokens: r2, ruleNames: /* @__PURE__ */ new Map() }, t), e;
}
m(Ja, "createParser");
function tA(t, e) {
  let r2 = ha(e, false), n2 = re(e.rules).filter(nt).filter((a) => r2.has(a));
  for (let a of n2) {
    let o2 = { ...t, consume: 1, optional: 1, subrule: 1, many: 1, or: 1 };
    t.parser.rule(a, ui(o2, a.definition));
  }
  let i = re(e.rules).filter(hn).filter((a) => r2.has(a));
  for (let a of i) t.parser.rule(a, rA(t, a));
}
m(tA, "buildRules");
function rA(t, e) {
  let r2 = e.call.rule.ref;
  if (!r2) throw new Error("Could not resolve reference to infix operator rule: " + e.call.rule.$refText);
  if (St(r2)) throw new Error("Cannot use terminal rule in infix expression");
  let n2 = e.operators.precedences.flatMap((y) => y.operators), i = { $type: "Group", elements: [] }, a = { $container: i, $type: "Assignment", feature: "parts", operator: "+=", terminal: e.call }, o2 = { $container: i, $type: "Group", elements: [], cardinality: "*" };
  i.elements.push(a, o2);
  let u = { $container: o2, $type: "Assignment", feature: "operators", operator: "+=", terminal: { $type: "Alternatives", elements: n2 } }, c = { ...a, $container: o2 };
  o2.elements.push(u, c);
  let m3 = n2.map((y) => t.tokens[y.value]).map((y, k) => ({ ALT: m(() => t.parser.consume(k, y, u), "ALT") })), h2;
  return (y) => {
    h2 ?? (h2 = ip(t, r2)), t.parser.subrule(0, h2, false, a, y), t.parser.many(0, { DEF: m(() => {
      t.parser.alternatives(0, m3), t.parser.subrule(1, h2, false, c, y);
    }, "DEF") });
  };
}
m(rA, "buildInfixRule");
function ui(t, e, r2 = false) {
  let n2;
  if (Ht(e)) n2 = uA(t, e);
  else if (qr(e)) n2 = nA(t, e);
  else if (lr(e)) n2 = ui(t, e.terminal);
  else if (ur(e)) n2 = dy(t, e);
  else if (cr(e)) n2 = iA(t, e);
  else if (ll(e)) n2 = aA(t, e);
  else if (dl(e)) n2 = oA(t, e);
  else if (mn(e)) n2 = lA(t, e);
  else if (Fc(e)) {
    let i = t.consume++;
    n2 = m(() => t.parser.consume(i, Bt, e), "method");
  } else throw new Yn(e.$cstNode, `Unexpected element type: ${e.$type}`);
  return py(t, r2 ? void 0 : hu(e), n2, e.cardinality);
}
m(ui, "buildElement");
function nA(t, e) {
  let r2 = yn(e);
  return () => t.parser.action(r2, e);
}
m(nA, "buildAction");
function iA(t, e) {
  let r2 = e.rule.ref;
  if (zr(r2)) {
    let n2 = t.subrule++, i = nt(r2) && r2.fragment, a = e.arguments.length > 0 ? sA(r2, e.arguments) : () => ({}), o2;
    return (l) => {
      o2 ?? (o2 = ip(t, r2)), t.parser.subrule(n2, o2, i, e, a(l));
    };
  } else if (St(r2)) {
    let n2 = t.consume++, i = np(t, r2.name);
    return () => t.parser.consume(n2, i, e);
  } else if (r2) vr(r2);
  else throw new Yn(e.$cstNode, `Undefined rule: ${e.rule.$refText}`);
}
m(iA, "buildRuleCall");
function sA(t, e) {
  if (e.some((n2) => n2.calledByName)) {
    let n2 = e.map((i) => {
      var _a135, _b;
      return { parameterName: (_b = (_a135 = i.parameter) == null ? void 0 : _a135.ref) == null ? void 0 : _b.name, predicate: Sr(i.value) };
    });
    return (i) => {
      let a = {};
      for (let { parameterName: o2, predicate: l } of n2) o2 && (a[o2] = l(i));
      return a;
    };
  } else {
    let n2 = e.map((i) => Sr(i.value));
    return (i) => {
      let a = {};
      for (let o2 = 0; o2 < n2.length; o2++) if (o2 < t.parameters.length) {
        let l = t.parameters[o2].name, u = n2[o2];
        a[l] = u(i);
      }
      return a;
    };
  }
}
m(sA, "buildRuleCallPredicate");
function Sr(t) {
  if (Mc(t)) {
    let e = Sr(t.left), r2 = Sr(t.right);
    return (n2) => e(n2) || r2(n2);
  } else if (Dc(t)) {
    let e = Sr(t.left), r2 = Sr(t.right);
    return (n2) => e(n2) && r2(n2);
  } else if (zc(t)) {
    let e = Sr(t.value);
    return (r2) => !e(r2);
  } else if (qc(t)) {
    let e = t.parameter.ref.name;
    return (r2) => r2 !== void 0 && r2[e] === true;
  } else if (Oc(t)) {
    let e = !!t.true;
    return () => e;
  }
  vr(t);
}
m(Sr, "buildPredicate");
function aA(t, e) {
  if (e.elements.length === 1) return ui(t, e.elements[0]);
  {
    let r2 = [];
    for (let i of e.elements) {
      let a = { ALT: ui(t, i, true) }, o2 = hu(i);
      o2 && (a.GATE = Sr(o2)), r2.push(a);
    }
    let n2 = t.or++;
    return (i) => t.parser.alternatives(n2, r2.map((a) => {
      let o2 = { ALT: m(() => a.ALT(i), "ALT") }, l = a.GATE;
      return l && (o2.GATE = () => l(i)), o2;
    }));
  }
}
m(aA, "buildAlternatives");
function oA(t, e) {
  if (e.elements.length === 1) return ui(t, e.elements[0]);
  let r2 = [];
  for (let l of e.elements) {
    let u = { ALT: ui(t, l, true) }, c = hu(l);
    c && (u.GATE = Sr(c)), r2.push(u);
  }
  let n2 = t.or++, i = m((l, u) => {
    let c = u.getRuleStack().join("-");
    return `uGroup_${l}_${c}`;
  }, "idFunc"), a = m((l) => t.parser.alternatives(n2, r2.map((u, c) => {
    let d = { ALT: m(() => true, "ALT") }, m3 = t.parser;
    d.ALT = () => {
      if (u.ALT(l), !m3.isRecording()) {
        let y = i(n2, m3);
        m3.unorderedGroups.get(y) || m3.unorderedGroups.set(y, []);
        let k = m3.unorderedGroups.get(y);
        typeof (k == null ? void 0 : k[c]) > "u" && (k[c] = true);
      }
    };
    let h2 = u.GATE;
    return h2 ? d.GATE = () => h2(l) : d.GATE = () => {
      var _a135;
      return !((_a135 = m3.unorderedGroups.get(i(n2, m3))) == null ? void 0 : _a135[c]);
    }, d;
  })), "alternatives"), o2 = py(t, hu(e), a, "*");
  return (l) => {
    o2(l), t.parser.isRecording() || t.parser.unorderedGroups.delete(i(n2, t.parser));
  };
}
m(oA, "buildUnorderedGroup");
function lA(t, e) {
  let r2 = e.elements.map((n2) => ui(t, n2));
  return (n2) => r2.forEach((i) => i(n2));
}
m(lA, "buildGroup");
function hu(t) {
  if (mn(t)) return t.guardCondition;
}
m(hu, "getGuardCondition");
function dy(t, e, r2 = e.terminal) {
  var _a135;
  if (r2) if (cr(r2) && nt(r2.rule.ref)) {
    let n2 = r2.rule.ref, i = t.subrule++, a;
    return (o2) => {
      a ?? (a = ip(t, n2)), t.parser.subrule(i, a, false, e, o2);
    };
  } else if (cr(r2) && St(r2.rule.ref)) {
    let n2 = t.consume++, i = np(t, r2.rule.ref.name);
    return () => t.parser.consume(n2, i, e);
  } else if (Ht(r2)) {
    let n2 = t.consume++, i = np(t, r2.value);
    return () => t.parser.consume(n2, i, e);
  } else throw new Error("Could not build cross reference parser");
  else {
    if (!e.type.ref) throw new Error("Could not resolve reference to type: " + e.type.$refText);
    let i = (_a135 = Tl(e.type.ref)) == null ? void 0 : _a135.terminal;
    if (!i) throw new Error("Could not find name assignment for type: " + yn(e.type.ref));
    return dy(t, e, i);
  }
}
m(dy, "buildCrossReference");
function uA(t, e) {
  let r2 = t.consume++, n2 = t.tokens[e.value];
  if (!n2) throw new Error("Could not find token for keyword: " + e.value);
  return () => t.parser.consume(r2, n2, e);
}
m(uA, "buildKeyword");
function py(t, e, r2, n2) {
  let i = e && Sr(e);
  if (!n2) if (i) {
    let a = t.or++;
    return (o2) => t.parser.alternatives(a, [{ ALT: m(() => r2(o2), "ALT"), GATE: m(() => i(o2), "GATE") }, { ALT: eu(), GATE: m(() => !i(o2), "GATE") }]);
  } else return r2;
  if (n2 === "*") {
    let a = t.many++;
    return (o2) => t.parser.many(a, { DEF: m(() => r2(o2), "DEF"), GATE: i ? () => i(o2) : void 0 });
  } else if (n2 === "+") {
    let a = t.many++;
    if (i) {
      let o2 = t.or++;
      return (l) => t.parser.alternatives(o2, [{ ALT: m(() => t.parser.atLeastOne(a, { DEF: m(() => r2(l), "DEF") }), "ALT"), GATE: m(() => i(l), "GATE") }, { ALT: eu(), GATE: m(() => !i(l), "GATE") }]);
    } else return (o2) => t.parser.atLeastOne(a, { DEF: m(() => r2(o2), "DEF") });
  } else if (n2 === "?") {
    let a = t.optional++;
    return (o2) => t.parser.optional(a, { DEF: m(() => r2(o2), "DEF"), GATE: i ? () => i(o2) : void 0 });
  } else vr(n2);
}
m(py, "wrap");
function ip(t, e) {
  let r2 = cA(t, e), n2 = t.parser.getRule(r2);
  if (!n2) throw new Error(`Rule "${r2}" not found."`);
  return n2;
}
m(ip, "getRule");
function cA(t, e) {
  if (zr(e)) return e.name;
  if (t.ruleNames.has(e)) return t.ruleNames.get(e);
  {
    let r2 = e, n2 = r2.$container, i = e.$type;
    for (; !nt(n2); ) (mn(n2) || ll(n2) || dl(n2)) && (i = n2.elements.indexOf(r2).toString() + ":" + i), r2 = n2, n2 = n2.$container;
    return i = n2.name + ":" + i, t.ruleNames.set(e, i), i;
  }
}
m(cA, "getRuleName");
function np(t, e) {
  let r2 = t.tokens[e];
  if (!r2) throw new Error(`Token "${e}" not found."`);
  return r2;
}
m(np, "getToken");
function sp(t) {
  let e = t.Grammar, r2 = t.parser.Lexer, n2 = new Xa(t);
  return Ja(e, n2, r2.definition), n2.finalize(), n2;
}
m(sp, "createCompletionParser");
function ap(t) {
  let e = my(t);
  return e.finalize(), e;
}
m(ap, "createLangiumParser");
function my(t) {
  let e = t.Grammar, r2 = t.parser.Lexer, n2 = new Ya(t);
  return Ja(e, n2, r2.definition);
}
m(my, "prepareLangiumParser");
var _a79;
var Zr2 = (_a79 = class {
  constructor() {
    this.diagnostics = [];
  }
  buildTokens(e, r2) {
    let n2 = re(ha(e, false)), i = this.buildTerminalTokens(n2), a = this.buildKeywordTokens(n2, i, r2);
    return a.push(...i), a;
  }
  flushLexingReport(e) {
    return { diagnostics: this.popDiagnostics() };
  }
  popDiagnostics() {
    let e = [...this.diagnostics];
    return this.diagnostics = [], e;
  }
  buildTerminalTokens(e) {
    return e.filter(St).filter((r2) => !r2.fragment).map((r2) => this.buildTerminalToken(r2)).toArray();
  }
  buildTerminalToken(e) {
    let r2 = zi2(e), n2 = this.requiresCustomPattern(r2) ? this.regexPatternFunction(r2) : r2, i = { name: e.name, PATTERN: n2 };
    return typeof n2 == "function" && (i.LINE_BREAKS = true), e.hidden && (i.GROUP = ma(r2) ? we.SKIPPED : "hidden"), i;
  }
  requiresCustomPattern(e) {
    return !!(e.flags.includes("u") || e.flags.includes("s"));
  }
  regexPatternFunction(e) {
    let r2 = new RegExp(e, e.flags + "y");
    return (n2, i) => (r2.lastIndex = i, r2.exec(n2));
  }
  buildKeywordTokens(e, r2, n2) {
    return e.filter(zr).flatMap((i) => ar(i).filter(Ht)).distinct((i) => i.value).toArray().sort((i, a) => a.value.length - i.value.length).map((i) => this.buildKeywordToken(i, r2, !!(n2 == null ? void 0 : n2.caseInsensitive)));
  }
  buildKeywordToken(e, r2, n2) {
    let i = this.buildKeywordPattern(e, n2), a = { name: e.value, PATTERN: i, LONGER_ALT: this.findLongerAlt(e, r2) };
    return typeof i == "function" && (a.LINE_BREAKS = true), a;
  }
  buildKeywordPattern(e, r2) {
    return r2 ? new RegExp(gn(e.value), "i") : e.value;
  }
  findLongerAlt(e, r2) {
    return r2.reduce((n2, i) => {
      let a = i == null ? void 0 : i.PATTERN;
      return (a == null ? void 0 : a.source) && of("^" + a.source + "$", e.value) && n2.push(i), n2;
    }, []);
  }
}, m(_a79, "DefaultTokenBuilder"), _a79);
var _a80;
var ci = (_a80 = class {
  convert(e, r2) {
    let n2 = r2.grammarSource;
    if (ur(n2) && (n2 = cf(n2)), cr(n2)) {
      let i = n2.rule.ref;
      if (!i) throw new Error("This cst node was not parsed by a rule.");
      return this.runConverter(i, e, r2);
    }
    return e;
  }
  runConverter(e, r2, n2) {
    var _a135;
    switch (e.name.toUpperCase()) {
      case "INT":
        return kr2.convertInt(r2);
      case "STRING":
        return kr2.convertString(r2);
      case "ID":
        return kr2.convertID(r2);
    }
    switch ((_a135 = yf(e)) == null ? void 0 : _a135.toLowerCase()) {
      case "number":
        return kr2.convertNumber(r2);
      case "boolean":
        return kr2.convertBoolean(r2);
      case "bigint":
        return kr2.convertBigint(r2);
      case "date":
        return kr2.convertDate(r2);
      default:
        return r2;
    }
  }
}, m(_a80, "DefaultValueConverter"), _a80);
var kr2;
(function(t) {
  function e(c) {
    let d = "";
    for (let m3 = 1; m3 < c.length - 1; m3++) {
      let h2 = c.charAt(m3);
      if (h2 === "\\") {
        let y = c.charAt(++m3);
        d += r2(y);
      } else d += h2;
    }
    return d;
  }
  m(e, "convertString"), t.convertString = e;
  function r2(c) {
    switch (c) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return `
`;
      case "r":
        return "\r";
      case "t":
        return "	";
      case "v":
        return "\v";
      case "0":
        return "\0";
      default:
        return c;
    }
  }
  m(r2, "convertEscapeCharacter");
  function n2(c) {
    return c.charAt(0) === "^" ? c.substring(1) : c;
  }
  m(n2, "convertID"), t.convertID = n2;
  function i(c) {
    return parseInt(c);
  }
  m(i, "convertInt"), t.convertInt = i;
  function a(c) {
    return BigInt(c);
  }
  m(a, "convertBigint"), t.convertBigint = a;
  function o2(c) {
    return new Date(c);
  }
  m(o2, "convertDate"), t.convertDate = o2;
  function l(c) {
    return Number(c);
  }
  m(l, "convertNumber"), t.convertNumber = l;
  function u(c) {
    return c.toLowerCase() === "true";
  }
  m(u, "convertBoolean"), t.convertBoolean = u;
})(kr2 || (kr2 = {}));
var W = {};
q(W, r(Za(), 1));
function pp() {
  return new Promise((t) => {
    typeof setImmediate > "u" ? setTimeout(t, 0) : setImmediate(t);
  });
}
m(pp, "delayNextTick");
var Ru = 0;
var Ty = 10;
function $u() {
  return Ru = performance.now(), new W.CancellationTokenSource();
}
m($u, "startCancelableOperation");
function Ry(t) {
  Ty = t;
}
m(Ry, "setInterruptionPeriod");
var Yt = Symbol("OperationCancelled");
function Nr(t) {
  return t === Yt;
}
m(Nr, "isOperationCancelled");
async function De2(t) {
  if (t === W.CancellationToken.None) return;
  let e = performance.now();
  if (e - Ru >= Ty && (Ru = e, await pp(), Ru = performance.now()), t.isCancellationRequested) throw Yt;
}
m(De2, "interruptAndCheck");
var _a81;
var It = (_a81 = class {
  constructor() {
    this.promise = new Promise((e, r2) => {
      this.resolve = (n2) => (e(n2), this), this.reject = (n2) => (r2(n2), this);
    });
  }
}, m(_a81, "Deferred"), _a81);
var _a82;
var xu = (_a82 = class {
  constructor(e, r2, n2, i) {
    this._uri = e, this._languageId = r2, this._version = n2, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      let r2 = this.offsetAt(e.start), n2 = this.offsetAt(e.end);
      return this._content.substring(r2, n2);
    }
    return this._content;
  }
  update(e, r2) {
    for (let n2 of e) if (_a82.isIncremental(n2)) {
      let i = vy(n2.range), a = this.offsetAt(i.start), o2 = this.offsetAt(i.end);
      this._content = this._content.substring(0, a) + n2.text + this._content.substring(o2, this._content.length);
      let l = Math.max(i.start.line, 0), u = Math.max(i.end.line, 0), c = this._lineOffsets, d = $y(n2.text, false, a);
      if (u - l === d.length) for (let h2 = 0, y = d.length; h2 < y; h2++) c[h2 + l + 1] = d[h2];
      else d.length < 1e4 ? c.splice(l + 1, u - l, ...d) : this._lineOffsets = c = c.slice(0, l + 1).concat(d, c.slice(u + 1));
      let m3 = n2.text.length - (o2 - a);
      if (m3 !== 0) for (let h2 = l + 1 + d.length, y = c.length; h2 < y; h2++) c[h2] = c[h2] + m3;
    } else if (_a82.isFull(n2)) this._content = n2.text, this._lineOffsets = void 0;
    else throw new Error("Unknown change event received");
    this._version = r2;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = $y(this._content, true)), this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let r2 = this.getLineOffsets(), n2 = 0, i = r2.length;
    if (i === 0) return { line: 0, character: e };
    for (; n2 < i; ) {
      let o2 = Math.floor((n2 + i) / 2);
      r2[o2] > e ? i = o2 : n2 = o2 + 1;
    }
    let a = n2 - 1;
    return e = this.ensureBeforeEOL(e, r2[a]), { line: a, character: e - r2[a] };
  }
  offsetAt(e) {
    let r2 = this.getLineOffsets();
    if (e.line >= r2.length) return this._content.length;
    if (e.line < 0) return 0;
    let n2 = r2[e.line];
    if (e.character <= 0) return n2;
    let i = e.line + 1 < r2.length ? r2[e.line + 1] : this._content.length, a = Math.min(n2 + e.character, i);
    return this.ensureBeforeEOL(a, n2);
  }
  ensureBeforeEOL(e, r2) {
    for (; e > r2 && xy(this._content.charCodeAt(e - 1)); ) e--;
    return e;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(e) {
    let r2 = e;
    return r2 != null && typeof r2.text == "string" && r2.range !== void 0 && (r2.rangeLength === void 0 || typeof r2.rangeLength == "number");
  }
  static isFull(e) {
    let r2 = e;
    return r2 != null && typeof r2.text == "string" && r2.range === void 0 && r2.rangeLength === void 0;
  }
}, m(_a82, "FullTextDocument"), _a82);
var Ts;
(function(t) {
  function e(i, a, o2, l) {
    return new xu(i, a, o2, l);
  }
  m(e, "create"), t.create = e;
  function r2(i, a, o2) {
    if (i instanceof xu) return i.update(a, o2), i;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  m(r2, "update"), t.update = r2;
  function n2(i, a) {
    let o2 = i.getText(), l = mp2(a.map($A), (d, m3) => {
      let h2 = d.range.start.line - m3.range.start.line;
      return h2 === 0 ? d.range.start.character - m3.range.start.character : h2;
    }), u = 0, c = [];
    for (let d of l) {
      let m3 = i.offsetAt(d.range.start);
      if (m3 < u) throw new Error("Overlapping edit");
      m3 > u && c.push(o2.substring(u, m3)), d.newText.length && c.push(d.newText), u = i.offsetAt(d.range.end);
    }
    return c.push(o2.substr(u)), c.join("");
  }
  m(n2, "applyEdits"), t.applyEdits = n2;
})(Ts || (Ts = {}));
function mp2(t, e) {
  if (t.length <= 1) return t;
  let r2 = t.length / 2 | 0, n2 = t.slice(0, r2), i = t.slice(r2);
  mp2(n2, e), mp2(i, e);
  let a = 0, o2 = 0, l = 0;
  for (; a < n2.length && o2 < i.length; ) e(n2[a], i[o2]) <= 0 ? t[l++] = n2[a++] : t[l++] = i[o2++];
  for (; a < n2.length; ) t[l++] = n2[a++];
  for (; o2 < i.length; ) t[l++] = i[o2++];
  return t;
}
m(mp2, "mergeSort");
function $y(t, e, r2 = 0) {
  let n2 = e ? [r2] : [];
  for (let i = 0; i < t.length; i++) {
    let a = t.charCodeAt(i);
    xy(a) && (a === 13 && i + 1 < t.length && t.charCodeAt(i + 1) === 10 && i++, n2.push(r2 + i + 1));
  }
  return n2;
}
m($y, "computeLineOffsets");
function xy(t) {
  return t === 13 || t === 10;
}
m(xy, "isEOL");
function vy(t) {
  let e = t.start, r2 = t.end;
  return e.line > r2.line || e.line === r2.line && e.character > r2.character ? { start: r2, end: e } : t;
}
m(vy, "getWellformedRange");
function $A(t) {
  let e = vy(t.range);
  return e !== t.range ? { newText: t.newText, range: e } : t;
}
m($A, "getWellformedEdit");
var Ey;
(() => {
  "use strict";
  var t = { 975: (C) => {
    function T2(R) {
      if (typeof R != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(R));
    }
    m(T2, "e");
    function L(R, x) {
      for (var A, _ = "", F = 0, N2 = -1, Y2 = 0, Q = 0; Q <= R.length; ++Q) {
        if (Q < R.length) A = R.charCodeAt(Q);
        else {
          if (A === 47) break;
          A = 47;
        }
        if (A === 47) {
          if (!(N2 === Q - 1 || Y2 === 1)) if (N2 !== Q - 1 && Y2 === 2) {
            if (_.length < 2 || F !== 2 || _.charCodeAt(_.length - 1) !== 46 || _.charCodeAt(_.length - 2) !== 46) {
              if (_.length > 2) {
                var Be = _.lastIndexOf("/");
                if (Be !== _.length - 1) {
                  Be === -1 ? (_ = "", F = 0) : F = (_ = _.slice(0, Be)).length - 1 - _.lastIndexOf("/"), N2 = Q, Y2 = 0;
                  continue;
                }
              } else if (_.length === 2 || _.length === 1) {
                _ = "", F = 0, N2 = Q, Y2 = 0;
                continue;
              }
            }
            x && (_.length > 0 ? _ += "/.." : _ = "..", F = 2);
          } else _.length > 0 ? _ += "/" + R.slice(N2 + 1, Q) : _ = R.slice(N2 + 1, Q), F = Q - N2 - 1;
          N2 = Q, Y2 = 0;
        } else A === 46 && Y2 !== -1 ? ++Y2 : Y2 = -1;
      }
      return _;
    }
    m(L, "r");
    var O = { resolve: m(function() {
      for (var R, x = "", A = false, _ = arguments.length - 1; _ >= -1 && !A; _--) {
        var F;
        _ >= 0 ? F = arguments[_] : (R === void 0 && (R = process.cwd()), F = R), T2(F), F.length !== 0 && (x = F + "/" + x, A = F.charCodeAt(0) === 47);
      }
      return x = L(x, !A), A ? x.length > 0 ? "/" + x : "/" : x.length > 0 ? x : ".";
    }, "resolve"), normalize: m(function(R) {
      if (T2(R), R.length === 0) return ".";
      var x = R.charCodeAt(0) === 47, A = R.charCodeAt(R.length - 1) === 47;
      return (R = L(R, !x)).length !== 0 || x || (R = "."), R.length > 0 && A && (R += "/"), x ? "/" + R : R;
    }, "normalize"), isAbsolute: m(function(R) {
      return T2(R), R.length > 0 && R.charCodeAt(0) === 47;
    }, "isAbsolute"), join: m(function() {
      if (arguments.length === 0) return ".";
      for (var R, x = 0; x < arguments.length; ++x) {
        var A = arguments[x];
        T2(A), A.length > 0 && (R === void 0 ? R = A : R += "/" + A);
      }
      return R === void 0 ? "." : O.normalize(R);
    }, "join"), relative: m(function(R, x) {
      if (T2(R), T2(x), R === x || (R = O.resolve(R)) === (x = O.resolve(x))) return "";
      for (var A = 1; A < R.length && R.charCodeAt(A) === 47; ++A) ;
      for (var _ = R.length, F = _ - A, N2 = 1; N2 < x.length && x.charCodeAt(N2) === 47; ++N2) ;
      for (var Y2 = x.length - N2, Q = F < Y2 ? F : Y2, Be = -1, ce = 0; ce <= Q; ++ce) {
        if (ce === Q) {
          if (Y2 > Q) {
            if (x.charCodeAt(N2 + ce) === 47) return x.slice(N2 + ce + 1);
            if (ce === 0) return x.slice(N2 + ce);
          } else F > Q && (R.charCodeAt(A + ce) === 47 ? Be = ce : ce === 0 && (Be = 0));
          break;
        }
        var _e = R.charCodeAt(A + ce);
        if (_e !== x.charCodeAt(N2 + ce)) break;
        _e === 47 && (Be = ce);
      }
      var hr = "";
      for (ce = A + Be + 1; ce <= _; ++ce) ce !== _ && R.charCodeAt(ce) !== 47 || (hr.length === 0 ? hr += ".." : hr += "/..");
      return hr.length > 0 ? hr + x.slice(N2 + Be) : (N2 += Be, x.charCodeAt(N2) === 47 && ++N2, x.slice(N2));
    }, "relative"), _makeLong: m(function(R) {
      return R;
    }, "_makeLong"), dirname: m(function(R) {
      if (T2(R), R.length === 0) return ".";
      for (var x = R.charCodeAt(0), A = x === 47, _ = -1, F = true, N2 = R.length - 1; N2 >= 1; --N2) if ((x = R.charCodeAt(N2)) === 47) {
        if (!F) {
          _ = N2;
          break;
        }
      } else F = false;
      return _ === -1 ? A ? "/" : "." : A && _ === 1 ? "//" : R.slice(0, _);
    }, "dirname"), basename: m(function(R, x) {
      if (x !== void 0 && typeof x != "string") throw new TypeError('"ext" argument must be a string');
      T2(R);
      var A, _ = 0, F = -1, N2 = true;
      if (x !== void 0 && x.length > 0 && x.length <= R.length) {
        if (x.length === R.length && x === R) return "";
        var Y2 = x.length - 1, Q = -1;
        for (A = R.length - 1; A >= 0; --A) {
          var Be = R.charCodeAt(A);
          if (Be === 47) {
            if (!N2) {
              _ = A + 1;
              break;
            }
          } else Q === -1 && (N2 = false, Q = A + 1), Y2 >= 0 && (Be === x.charCodeAt(Y2) ? --Y2 == -1 && (F = A) : (Y2 = -1, F = Q));
        }
        return _ === F ? F = Q : F === -1 && (F = R.length), R.slice(_, F);
      }
      for (A = R.length - 1; A >= 0; --A) if (R.charCodeAt(A) === 47) {
        if (!N2) {
          _ = A + 1;
          break;
        }
      } else F === -1 && (N2 = false, F = A + 1);
      return F === -1 ? "" : R.slice(_, F);
    }, "basename"), extname: m(function(R) {
      T2(R);
      for (var x = -1, A = 0, _ = -1, F = true, N2 = 0, Y2 = R.length - 1; Y2 >= 0; --Y2) {
        var Q = R.charCodeAt(Y2);
        if (Q !== 47) _ === -1 && (F = false, _ = Y2 + 1), Q === 46 ? x === -1 ? x = Y2 : N2 !== 1 && (N2 = 1) : x !== -1 && (N2 = -1);
        else if (!F) {
          A = Y2 + 1;
          break;
        }
      }
      return x === -1 || _ === -1 || N2 === 0 || N2 === 1 && x === _ - 1 && x === A + 1 ? "" : R.slice(x, _);
    }, "extname"), format: m(function(R) {
      if (R === null || typeof R != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof R);
      return function(x, A) {
        var _ = A.dir || A.root, F = A.base || (A.name || "") + (A.ext || "");
        return _ ? _ === A.root ? _ + F : _ + "/" + F : F;
      }(0, R);
    }, "format"), parse: m(function(R) {
      T2(R);
      var x = { root: "", dir: "", base: "", ext: "", name: "" };
      if (R.length === 0) return x;
      var A, _ = R.charCodeAt(0), F = _ === 47;
      F ? (x.root = "/", A = 1) : A = 0;
      for (var N2 = -1, Y2 = 0, Q = -1, Be = true, ce = R.length - 1, _e = 0; ce >= A; --ce) if ((_ = R.charCodeAt(ce)) !== 47) Q === -1 && (Be = false, Q = ce + 1), _ === 46 ? N2 === -1 ? N2 = ce : _e !== 1 && (_e = 1) : N2 !== -1 && (_e = -1);
      else if (!Be) {
        Y2 = ce + 1;
        break;
      }
      return N2 === -1 || Q === -1 || _e === 0 || _e === 1 && N2 === Q - 1 && N2 === Y2 + 1 ? Q !== -1 && (x.base = x.name = Y2 === 0 && F ? R.slice(1, Q) : R.slice(Y2, Q)) : (Y2 === 0 && F ? (x.name = R.slice(1, N2), x.base = R.slice(1, Q)) : (x.name = R.slice(Y2, N2), x.base = R.slice(Y2, Q)), x.ext = R.slice(N2, Q)), Y2 > 0 ? x.dir = R.slice(0, Y2 - 1) : F && (x.dir = "/"), x;
    }, "parse"), sep: "/", delimiter: ":", win32: null, posix: null };
    O.posix = O, C.exports = O;
  } }, e = {};
  function r2(C) {
    var T2 = e[C];
    if (T2 !== void 0) return T2.exports;
    var L = e[C] = { exports: {} };
    return t[C](L, L.exports, r2), L.exports;
  }
  m(r2, "r"), r2.d = (C, T2) => {
    for (var L in T2) r2.o(T2, L) && !r2.o(C, L) && Object.defineProperty(C, L, { enumerable: true, get: T2[L] });
  }, r2.o = (C, T2) => Object.prototype.hasOwnProperty.call(C, T2), r2.r = (C) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(C, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(C, "__esModule", { value: true });
  };
  var n2 = {};
  let i;
  r2.r(n2), r2.d(n2, { URI: m(() => h2, "URI"), Utils: m(() => Vt, "Utils") }), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
  let a = /^\w[\w\d+.-]*$/, o2 = /^\//, l = /^\/\//;
  function u(C, T2) {
    if (!C.scheme && T2) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${C.authority}", path: "${C.path}", query: "${C.query}", fragment: "${C.fragment}"}`);
    if (C.scheme && !a.test(C.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
    if (C.path) {
      if (C.authority) {
        if (!o2.test(C.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
      } else if (l.test(C.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
    }
  }
  m(u, "a");
  let c = "", d = "/", m3 = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  const _h2 = class _h2 {
    constructor(T2, L, O, R, x, A = false) {
      __publicField(this, "scheme");
      __publicField(this, "authority");
      __publicField(this, "path");
      __publicField(this, "query");
      __publicField(this, "fragment");
      typeof T2 == "object" ? (this.scheme = T2.scheme || c, this.authority = T2.authority || c, this.path = T2.path || c, this.query = T2.query || c, this.fragment = T2.fragment || c) : (this.scheme = /* @__PURE__ */ function(_, F) {
        return _ || F ? _ : "file";
      }(T2, A), this.authority = L || c, this.path = function(_, F) {
        switch (_) {
          case "https":
          case "http":
          case "file":
            F ? F[0] !== d && (F = d + F) : F = d;
        }
        return F;
      }(this.scheme, O || c), this.query = R || c, this.fragment = x || c, u(this, A));
    }
    static isUri(T2) {
      return T2 instanceof _h2 || !!T2 && typeof T2.authority == "string" && typeof T2.fragment == "string" && typeof T2.path == "string" && typeof T2.query == "string" && typeof T2.scheme == "string" && typeof T2.fsPath == "string" && typeof T2.with == "function" && typeof T2.toString == "function";
    }
    get fsPath() {
      return P(this, false);
    }
    with(T2) {
      if (!T2) return this;
      let { scheme: L, authority: O, path: R, query: x, fragment: A } = T2;
      return L === void 0 ? L = this.scheme : L === null && (L = c), O === void 0 ? O = this.authority : O === null && (O = c), R === void 0 ? R = this.path : R === null && (R = c), x === void 0 ? x = this.query : x === null && (x = c), A === void 0 ? A = this.fragment : A === null && (A = c), L === this.scheme && O === this.authority && R === this.path && x === this.query && A === this.fragment ? this : new k(L, O, R, x, A);
    }
    static parse(T2, L = false) {
      let O = m3.exec(T2);
      return O ? new k(O[2] || c, he(O[4] || c), he(O[5] || c), he(O[7] || c), he(O[9] || c), L) : new k(c, c, c, c, c);
    }
    static file(T2) {
      let L = c;
      if (i && (T2 = T2.replace(/\\/g, d)), T2[0] === d && T2[1] === d) {
        let O = T2.indexOf(d, 2);
        O === -1 ? (L = T2.substring(2), T2 = d) : (L = T2.substring(2, O), T2 = T2.substring(O) || d);
      }
      return new k("file", L, T2, c, c);
    }
    static from(T2) {
      let L = new k(T2.scheme, T2.authority, T2.path, T2.query, T2.fragment);
      return u(L, true), L;
    }
    toString(T2 = false) {
      return E(this, T2);
    }
    toJSON() {
      return this;
    }
    static revive(T2) {
      if (T2) {
        if (T2 instanceof _h2) return T2;
        {
          let L = new k(T2);
          return L._formatted = T2.external, L._fsPath = T2._sep === y ? T2.fsPath : null, L;
        }
      }
      return T2;
    }
  };
  m(_h2, "l");
  let h2 = _h2;
  let y = i ? 1 : void 0;
  const _k = class _k extends h2 {
    constructor() {
      super(...arguments);
      __publicField(this, "_formatted", null);
      __publicField(this, "_fsPath", null);
    }
    get fsPath() {
      return this._fsPath || (this._fsPath = P(this, false)), this._fsPath;
    }
    toString(T2 = false) {
      return T2 ? E(this, true) : (this._formatted || (this._formatted = E(this, false)), this._formatted);
    }
    toJSON() {
      let T2 = { $mid: 1 };
      return this._fsPath && (T2.fsPath = this._fsPath, T2._sep = y), this._formatted && (T2.external = this._formatted), this.path && (T2.path = this.path), this.scheme && (T2.scheme = this.scheme), this.authority && (T2.authority = this.authority), this.query && (T2.query = this.query), this.fragment && (T2.fragment = this.fragment), T2;
    }
  };
  m(_k, "d");
  let k = _k;
  let w = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
  function q2(C, T2, L) {
    let O, R = -1;
    for (let x = 0; x < C.length; x++) {
      let A = C.charCodeAt(x);
      if (A >= 97 && A <= 122 || A >= 65 && A <= 90 || A >= 48 && A <= 57 || A === 45 || A === 46 || A === 95 || A === 126 || T2 && A === 47 || L && A === 91 || L && A === 93 || L && A === 58) R !== -1 && (O += encodeURIComponent(C.substring(R, x)), R = -1), O !== void 0 && (O += C.charAt(x));
      else {
        O === void 0 && (O = C.substr(0, x));
        let _ = w[A];
        _ !== void 0 ? (R !== -1 && (O += encodeURIComponent(C.substring(R, x)), R = -1), O += _) : R === -1 && (R = x);
      }
    }
    return R !== -1 && (O += encodeURIComponent(C.substring(R))), O !== void 0 ? O : C;
  }
  m(q2, "m");
  function M(C) {
    let T2;
    for (let L = 0; L < C.length; L++) {
      let O = C.charCodeAt(L);
      O === 35 || O === 63 ? (T2 === void 0 && (T2 = C.substr(0, L)), T2 += w[O]) : T2 !== void 0 && (T2 += C[L]);
    }
    return T2 !== void 0 ? T2 : C;
  }
  m(M, "y");
  function P(C, T2) {
    let L;
    return L = C.authority && C.path.length > 1 && C.scheme === "file" ? `//${C.authority}${C.path}` : C.path.charCodeAt(0) === 47 && (C.path.charCodeAt(1) >= 65 && C.path.charCodeAt(1) <= 90 || C.path.charCodeAt(1) >= 97 && C.path.charCodeAt(1) <= 122) && C.path.charCodeAt(2) === 58 ? T2 ? C.path.substr(1) : C.path[1].toLowerCase() + C.path.substr(2) : C.path, i && (L = L.replace(/\//g, "\\")), L;
  }
  m(P, "v");
  function E(C, T2) {
    let L = T2 ? M : q2, O = "", { scheme: R, authority: x, path: A, query: _, fragment: F } = C;
    if (R && (O += R, O += ":"), (x || R === "file") && (O += d, O += d), x) {
      let N2 = x.indexOf("@");
      if (N2 !== -1) {
        let Y2 = x.substr(0, N2);
        x = x.substr(N2 + 1), N2 = Y2.lastIndexOf(":"), N2 === -1 ? O += L(Y2, false, false) : (O += L(Y2.substr(0, N2), false, false), O += ":", O += L(Y2.substr(N2 + 1), false, true)), O += "@";
      }
      x = x.toLowerCase(), N2 = x.lastIndexOf(":"), N2 === -1 ? O += L(x, false, true) : (O += L(x.substr(0, N2), false, true), O += x.substr(N2));
    }
    if (A) {
      if (A.length >= 3 && A.charCodeAt(0) === 47 && A.charCodeAt(2) === 58) {
        let N2 = A.charCodeAt(1);
        N2 >= 65 && N2 <= 90 && (A = `/${String.fromCharCode(N2 + 32)}:${A.substr(3)}`);
      } else if (A.length >= 2 && A.charCodeAt(1) === 58) {
        let N2 = A.charCodeAt(0);
        N2 >= 65 && N2 <= 90 && (A = `${String.fromCharCode(N2 + 32)}:${A.substr(2)}`);
      }
      O += L(A, true, false);
    }
    return _ && (O += "?", O += L(_, false, false)), F && (O += "#", O += T2 ? F : q2(F, false, false)), O;
  }
  m(E, "b");
  function H(C) {
    try {
      return decodeURIComponent(C);
    } catch {
      return C.length > 3 ? C.substr(0, 3) + H(C.substr(3)) : C;
    }
  }
  m(H, "C");
  let U = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
  function he(C) {
    return C.match(U) ? C.replace(U, (T2) => H(T2)) : C;
  }
  m(he, "w");
  var mr = r2(975);
  let Xe = mr.posix || mr, tr = "/";
  var Vt;
  (function(C) {
    C.joinPath = function(T2, ...L) {
      return T2.with({ path: Xe.join(T2.path, ...L) });
    }, C.resolvePath = function(T2, ...L) {
      let O = T2.path, R = false;
      O[0] !== tr && (O = tr + O, R = true);
      let x = Xe.resolve(O, ...L);
      return R && x[0] === tr && !T2.authority && (x = x.substring(1)), T2.with({ path: x });
    }, C.dirname = function(T2) {
      if (T2.path.length === 0 || T2.path === tr) return T2;
      let L = Xe.dirname(T2.path);
      return L.length === 1 && L.charCodeAt(0) === 46 && (L = ""), T2.with({ path: L });
    }, C.basename = function(T2) {
      return Xe.basename(T2.path);
    }, C.extname = function(T2) {
      return Xe.extname(T2.path);
    };
  })(Vt || (Vt = {})), Ey = n2;
})();
var { URI: tt, Utils: Rs } = Ey;
var je;
(function(t) {
  t.basename = Rs.basename, t.dirname = Rs.dirname, t.extname = Rs.extname, t.joinPath = Rs.joinPath, t.resolvePath = Rs.resolvePath;
  let e = typeof process == "object" && (process == null ? void 0 : process.platform) === "win32";
  function r2(o2, l) {
    return (o2 == null ? void 0 : o2.toString()) === (l == null ? void 0 : l.toString());
  }
  m(r2, "equals"), t.equals = r2;
  function n2(o2, l) {
    let u = typeof o2 == "string" ? tt.parse(o2).path : o2.path, c = typeof l == "string" ? tt.parse(l).path : l.path, d = u.split("/").filter((w) => w.length > 0), m3 = c.split("/").filter((w) => w.length > 0);
    if (e) {
      let w = /^[A-Z]:$/;
      if (d[0] && w.test(d[0]) && (d[0] = d[0].toLowerCase()), m3[0] && w.test(m3[0]) && (m3[0] = m3[0].toLowerCase()), d[0] !== m3[0]) return c.substring(1);
    }
    let h2 = 0;
    for (; h2 < d.length && d[h2] === m3[h2]; h2++) ;
    let y = "../".repeat(d.length - h2), k = m3.slice(h2).join("/");
    return y + k;
  }
  m(n2, "relative"), t.relative = n2;
  function i(o2) {
    return tt.parse(o2.toString()).toString();
  }
  m(i, "normalize"), t.normalize = i;
  function a(o2, l) {
    let u = typeof o2 == "string" ? o2 : o2.path, c = typeof l == "string" ? l : l.path;
    return c.charAt(c.length - 1) === "/" && (c = c.slice(0, -1)), u.charAt(u.length - 1) === "/" && (u = u.slice(0, -1)), c === u ? true : c.length < u.length || c.charAt(u.length) !== "/" ? false : c.startsWith(u);
  }
  m(a, "contains"), t.contains = a;
})(je || (je = {}));
var _a83;
var $s = (_a83 = class {
  constructor() {
    this.root = { name: "", children: /* @__PURE__ */ new Map() };
  }
  normalizeUri(e) {
    return je.normalize(e);
  }
  clear() {
    this.root.children.clear();
  }
  insert(e, r2) {
    let n2 = this.getNode(this.normalizeUri(e), true);
    n2.element = r2;
  }
  delete(e) {
    let r2 = this.getNode(this.normalizeUri(e), false);
    (r2 == null ? void 0 : r2.parent) && r2.parent.children.delete(r2.name);
  }
  has(e) {
    var _a135;
    return ((_a135 = this.getNode(this.normalizeUri(e), false)) == null ? void 0 : _a135.element) !== void 0;
  }
  hasNode(e) {
    return this.getNode(this.normalizeUri(e), false) !== void 0;
  }
  find(e) {
    var _a135;
    return (_a135 = this.getNode(this.normalizeUri(e), false)) == null ? void 0 : _a135.element;
  }
  findNode(e) {
    let r2 = this.normalizeUri(e), n2 = this.getNode(r2, false);
    if (n2) return { name: n2.name, uri: je.joinPath(tt.parse(r2), n2.name).toString(), element: n2.element };
  }
  findChildren(e) {
    let r2 = this.normalizeUri(e), n2 = this.getNode(r2, false);
    return n2 ? Array.from(n2.children.values()).map((i) => ({ name: i.name, uri: je.joinPath(tt.parse(r2), i.name).toString(), element: i.element })) : [];
  }
  all() {
    return this.collectValues(this.root);
  }
  findAll(e) {
    let r2 = this.getNode(je.normalize(e), false);
    return r2 ? this.collectValues(r2) : [];
  }
  getNode(e, r2) {
    let n2 = e.split("/");
    e.charAt(e.length - 1) === "/" && n2.pop();
    let i = this.root;
    for (let a of n2) {
      let o2 = i.children.get(a);
      if (!o2) if (r2) o2 = { name: a, children: /* @__PURE__ */ new Map(), parent: i }, i.children.set(a, o2);
      else return;
      i = o2;
    }
    return i;
  }
  collectValues(e) {
    let r2 = [];
    e.element && r2.push(e.element);
    for (let n2 of e.children.values()) r2.push(...this.collectValues(n2));
    return r2;
  }
}, m(_a83, "UriTrie"), _a83);
var ee;
(function(t) {
  t[t.Changed = 0] = "Changed", t[t.Parsed = 1] = "Parsed", t[t.IndexedContent = 2] = "IndexedContent", t[t.ComputedScopes = 3] = "ComputedScopes", t[t.Linked = 4] = "Linked", t[t.IndexedReferences = 5] = "IndexedReferences", t[t.Validated = 6] = "Validated";
})(ee || (ee = {}));
var _a84;
var Qa = (_a84 = class {
  constructor(e) {
    this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider;
  }
  async fromUri(e, r2 = W.CancellationToken.None) {
    let n2 = await this.fileSystemProvider.readFile(e);
    return this.createAsync(e, n2, r2);
  }
  fromTextDocument(e, r2, n2) {
    return r2 = r2 ?? tt.parse(e.uri), W.CancellationToken.is(n2) ? this.createAsync(r2, e, n2) : this.create(r2, e, n2);
  }
  fromString(e, r2, n2) {
    return W.CancellationToken.is(n2) ? this.createAsync(r2, e, n2) : this.create(r2, e, n2);
  }
  fromModel(e, r2) {
    return this.create(r2, { $model: e });
  }
  create(e, r2, n2) {
    if (typeof r2 == "string") {
      let i = this.parse(e, r2, n2);
      return this.createLangiumDocument(i, e, void 0, r2);
    } else if ("$model" in r2) {
      let i = { value: r2.$model, parserErrors: [], lexerErrors: [] };
      return this.createLangiumDocument(i, e);
    } else {
      let i = this.parse(e, r2.getText(), n2);
      return this.createLangiumDocument(i, e, r2);
    }
  }
  async createAsync(e, r2, n2) {
    if (typeof r2 == "string") {
      let i = await this.parseAsync(e, r2, n2);
      return this.createLangiumDocument(i, e, void 0, r2);
    } else {
      let i = await this.parseAsync(e, r2.getText(), n2);
      return this.createLangiumDocument(i, e, r2);
    }
  }
  createLangiumDocument(e, r2, n2, i) {
    let a;
    if (n2) a = { parseResult: e, uri: r2, state: ee.Parsed, references: [], textDocument: n2 };
    else {
      let o2 = this.createTextDocumentGetter(r2, i);
      a = { parseResult: e, uri: r2, state: ee.Parsed, references: [], get textDocument() {
        return o2();
      } };
    }
    return e.value.$document = a, a;
  }
  async update(e, r2) {
    var _a135, _b;
    let n2 = (_a135 = e.parseResult.value.$cstNode) == null ? void 0 : _a135.root.fullText, i = (_b = this.textDocuments) == null ? void 0 : _b.get(e.uri.toString()), a = i ? i.getText() : await this.fileSystemProvider.readFile(e.uri);
    if (i) Object.defineProperty(e, "textDocument", { value: i });
    else {
      let o2 = this.createTextDocumentGetter(e.uri, a);
      Object.defineProperty(e, "textDocument", { get: o2 });
    }
    return n2 !== a && (e.parseResult = await this.parseAsync(e.uri, a, r2), e.parseResult.value.$document = e), e.state = ee.Parsed, e;
  }
  parse(e, r2, n2) {
    return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r2, n2);
  }
  parseAsync(e, r2, n2) {
    return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(r2, n2);
  }
  createTextDocumentGetter(e, r2) {
    let n2 = this.serviceRegistry, i;
    return () => i ?? (i = Ts.create(e.toString(), n2.getServices(e).LanguageMetaData.languageId, 0, r2 ?? ""));
  }
}, m(_a84, "DefaultLangiumDocumentFactory"), _a84);
var _a85;
var eo = (_a85 = class {
  constructor(e) {
    this.documentTrie = new $s(), this.services = e, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.documentBuilder = () => e.workspace.DocumentBuilder;
  }
  get all() {
    return re(this.documentTrie.all());
  }
  addDocument(e) {
    let r2 = e.uri.toString();
    if (this.documentTrie.has(r2)) throw new Error(`A document with the URI '${r2}' is already present.`);
    this.documentTrie.insert(r2, e);
  }
  getDocument(e) {
    let r2 = e.toString();
    return this.documentTrie.find(r2);
  }
  getDocuments(e) {
    let r2 = e.toString();
    return this.documentTrie.findAll(r2);
  }
  async getOrCreateDocument(e, r2) {
    let n2 = this.getDocument(e);
    return n2 || (n2 = await this.langiumDocumentFactory.fromUri(e, r2), this.addDocument(n2), n2);
  }
  createDocument(e, r2, n2) {
    if (n2) return this.langiumDocumentFactory.fromString(r2, e, n2).then((i) => (this.addDocument(i), i));
    {
      let i = this.langiumDocumentFactory.fromString(r2, e);
      return this.addDocument(i), i;
    }
  }
  hasDocument(e) {
    return this.documentTrie.has(e.toString());
  }
  invalidateDocument(e) {
    let r2 = e.toString(), n2 = this.documentTrie.find(r2);
    return n2 && this.documentBuilder().resetToState(n2, ee.Changed), n2;
  }
  deleteDocument(e) {
    let r2 = e.toString(), n2 = this.documentTrie.find(r2);
    return n2 && (n2.state = ee.Changed, this.documentTrie.delete(r2)), n2;
  }
  deleteDocuments(e) {
    let r2 = e.toString(), n2 = this.documentTrie.findAll(r2);
    for (let i of n2) i.state = ee.Changed;
    return this.documentTrie.delete(r2), n2;
  }
}, m(_a85, "DefaultLangiumDocuments"), _a85);
var di = Symbol("RefResolving");
var _a86;
var to = (_a86 = class {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId;
  }
  async link(e, r2 = W.CancellationToken.None) {
    var _a135;
    if ((_a135 = this.profiler) == null ? void 0 : _a135.isActive("linking")) {
      let n2 = this.profiler.createTask("linking", this.languageId);
      n2.start();
      try {
        for (let i of Ct(e.parseResult.value)) await De2(r2), ln(i).forEach((a) => {
          let o2 = `${i.$type}:${a.property}`;
          n2.startSubTask(o2);
          try {
            this.doLink(a, e);
          } finally {
            n2.stopSubTask(o2);
          }
        });
      } finally {
        n2.stop();
      }
    } else for (let n2 of Ct(e.parseResult.value)) await De2(r2), ln(n2).forEach((i) => this.doLink(i, e));
  }
  doLink(e, r2) {
    let n2 = e.reference;
    if ("_ref" in n2 && n2._ref === void 0) {
      n2._ref = di;
      try {
        let i = this.getCandidate(e);
        if (Ln(i)) n2._ref = i;
        else {
          n2._nodeDescription = i;
          let a = this.loadAstNode(i);
          n2._ref = a ?? this.createLinkingError(e, i);
        }
      } catch (i) {
        console.error(`An error occurred while resolving reference to '${n2.$refText}':`, i);
        let a = i.message ?? String(i);
        n2._ref = { info: e, message: `An error occurred while resolving reference to '${n2.$refText}': ${a}` };
      }
      r2.references.push(n2);
    } else if ("_items" in n2 && n2._items === void 0) {
      n2._items = di;
      try {
        let i = this.getCandidates(e), a = [];
        if (Ln(i)) n2._linkingError = i;
        else for (let o2 of i) {
          let l = this.loadAstNode(o2);
          l && a.push({ ref: l, $nodeDescription: o2 });
        }
        n2._items = a;
      } catch (i) {
        n2._linkingError = { info: e, message: `An error occurred while resolving reference to '${n2.$refText}': ${i}` }, n2._items = [];
      }
      r2.references.push(n2);
    }
  }
  unlink(e) {
    for (let r2 of e.references) "_ref" in r2 ? (r2._ref = void 0, delete r2._nodeDescription) : "_items" in r2 && (r2._items = void 0, delete r2._linkingError);
    e.references = [];
  }
  getCandidate(e) {
    return this.scopeProvider.getScope(e).getElement(e.reference.$refText) ?? this.createLinkingError(e);
  }
  getCandidates(e) {
    let n2 = this.scopeProvider.getScope(e).getElements(e.reference.$refText).distinct((i) => `${i.documentUri}#${i.path}`).toArray();
    return n2.length > 0 ? n2 : this.createLinkingError(e);
  }
  buildReference(e, r2, n2, i) {
    let a = this, o2 = { $refNode: n2, $refText: i, _ref: void 0, get ref() {
      if (Le(this._ref)) return this._ref;
      if (Nc(this._nodeDescription)) {
        let l = a.loadAstNode(this._nodeDescription);
        this._ref = l ?? a.createLinkingError({ reference: o2, container: e, property: r2 }, this._nodeDescription);
      } else if (this._ref === void 0) {
        this._ref = di;
        let l = Ii(e).$document, u = a.getLinkedNode({ reference: o2, container: e, property: r2 });
        if (u.error && l && l.state < ee.ComputedScopes) return this._ref = void 0;
        this._ref = u.node ?? u.error, this._nodeDescription = u.descr, l == null ? void 0 : l.references.push(this);
      } else this._ref === di && a.throwCyclicReferenceError(e, r2, i);
      return Le(this._ref) ? this._ref : void 0;
    }, get $nodeDescription() {
      return this._nodeDescription;
    }, get error() {
      return Ln(this._ref) ? this._ref : void 0;
    } };
    return o2;
  }
  buildMultiReference(e, r2, n2, i) {
    let a = this, o2 = { $refNode: n2, $refText: i, _items: void 0, get items() {
      if (Array.isArray(this._items)) return this._items;
      if (this._items === void 0) {
        this._items = di;
        let l = Ii(e).$document, u = a.getCandidates({ reference: o2, container: e, property: r2 }), c = [];
        if (Ln(u)) this._linkingError = u;
        else for (let d of u) {
          let m3 = a.loadAstNode(d);
          m3 && c.push({ ref: m3, $nodeDescription: d });
        }
        this._items = c, l == null ? void 0 : l.references.push(this);
      } else this._items === di && a.throwCyclicReferenceError(e, r2, i);
      return Array.isArray(this._items) ? this._items : [];
    }, get error() {
      if (this._linkingError) return this._linkingError;
      if (!(this.items.length > 0)) return this._linkingError = a.createLinkingError({ reference: o2, container: e, property: r2 });
    } };
    return o2;
  }
  throwCyclicReferenceError(e, r2, n2) {
    throw new Error(`Cyclic reference resolution detected: ${this.astNodeLocator.getAstNodePath(e)}/${r2} (symbol '${n2}')`);
  }
  getLinkedNode(e) {
    try {
      let r2 = this.getCandidate(e);
      if (Ln(r2)) return { error: r2 };
      let n2 = this.loadAstNode(r2);
      return n2 ? { node: n2, descr: r2 } : { descr: r2, error: this.createLinkingError(e, r2) };
    } catch (r2) {
      console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`, r2);
      let n2 = r2.message ?? String(r2);
      return { error: { info: e, message: `An error occurred while resolving reference to '${e.reference.$refText}': ${n2}` } };
    }
  }
  loadAstNode(e) {
    if (e.node) return e.node;
    let r2 = this.langiumDocuments().getDocument(e.documentUri);
    if (r2) return this.astNodeLocator.getAstNode(r2.parseResult.value, e.path);
  }
  createLinkingError(e, r2) {
    let n2 = Ii(e.container).$document;
    n2 && n2.state < ee.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n2.uri}).`);
    let i = this.reflection.getReferenceType(e);
    return { info: e, message: `Could not resolve reference to ${i} named '${e.reference.$refText}'.`, targetDescription: r2 };
  }
}, m(_a86, "DefaultLinker"), _a86);
function Ay(t) {
  return typeof t.name == "string";
}
m(Ay, "isNamed");
var _a87;
var ro = (_a87 = class {
  getName(e) {
    if (Ay(e)) return e.name;
  }
  getNameNode(e) {
    return ga(e.$cstNode, "name");
  }
}, m(_a87, "DefaultNameProvider"), _a87);
var _a88;
var no = (_a88 = class {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator, this.documents = e.shared.workspace.LangiumDocuments, this.hasMultiReference = Ct(e.Grammar).some((r2) => ur(r2) && r2.isMulti);
  }
  findDeclarations(e) {
    if (e) {
      let r2 = gf(e), n2 = e.astNode;
      if (r2 && n2) {
        let i = n2[r2.feature];
        if (Qe(i) || Ut(i)) return Vo(i);
        if (Array.isArray(i)) {
          for (let a of i) if ((Qe(a) || Ut(a)) && a.$refNode && a.$refNode.offset <= e.offset && a.$refNode.end >= e.end) return Vo(a);
        }
      }
      if (n2) {
        let i = this.nameProvider.getNameNode(n2);
        if (i && (i === e || Zc(e, i))) return this.getSelfNodes(n2);
      }
    }
    return [];
  }
  getSelfNodes(e) {
    if (this.hasMultiReference) {
      let r2 = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e)), n2 = this.getNodeFromReferenceDescription(r2.head());
      if (n2) {
        for (let i of ln(n2)) if (Ut(i.reference) && i.reference.items.some((a) => a.ref === e)) return i.reference.items.map((a) => a.ref);
      }
      return [e];
    } else return [e];
  }
  getNodeFromReferenceDescription(e) {
    if (!e) return;
    let r2 = this.documents.getDocument(e.sourceUri);
    if (r2) return this.nodeLocator.getAstNode(r2.parseResult.value, e.sourcePath);
  }
  findDeclarationNodes(e) {
    let r2 = this.findDeclarations(e), n2 = [];
    for (let i of r2) {
      let a = this.nameProvider.getNameNode(i) ?? i.$cstNode;
      a && n2.push(a);
    }
    return n2;
  }
  findReferences(e, r2) {
    let n2 = [];
    r2.includeDeclaration && n2.push(...this.getSelfReferences(e));
    let i = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e));
    return r2.documentUri && (i = i.filter((a) => je.equals(a.sourceUri, r2.documentUri))), n2.push(...i), re(n2);
  }
  getSelfReferences(e) {
    let r2 = this.getSelfNodes(e), n2 = [];
    for (let i of r2) {
      let a = this.nameProvider.getNameNode(i);
      if (a) {
        let o2 = gt(i), l = this.nodeLocator.getAstNodePath(i);
        n2.push({ sourceUri: o2.uri, sourcePath: l, targetUri: o2.uri, targetPath: l, segment: Hn(a), local: true });
      }
    }
    return n2;
  }
}, m(_a88, "DefaultReferences"), _a88);
var _a89;
var Tt = (_a89 = class {
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), e) for (let [r2, n2] of e) this.add(r2, n2);
  }
  get size() {
    return Ni.sum(re(this.map.values()).map((e) => e.length));
  }
  clear() {
    this.map.clear();
  }
  delete(e, r2) {
    if (r2 === void 0) return this.map.delete(e);
    {
      let n2 = this.map.get(e);
      if (n2) {
        let i = n2.indexOf(r2);
        if (i >= 0) return n2.length === 1 ? this.map.delete(e) : n2.splice(i, 1), true;
      }
      return false;
    }
  }
  get(e) {
    return this.map.get(e) ?? [];
  }
  getStream(e) {
    let r2 = this.map.get(e);
    return r2 ? re(r2) : on;
  }
  has(e, r2) {
    if (r2 === void 0) return this.map.has(e);
    {
      let n2 = this.map.get(e);
      return n2 ? n2.indexOf(r2) >= 0 : false;
    }
  }
  add(e, r2) {
    return this.map.has(e) ? this.map.get(e).push(r2) : this.map.set(e, [r2]), this;
  }
  addAll(e, r2) {
    return this.map.has(e) ? this.map.get(e).push(...r2) : this.map.set(e, Array.from(r2)), this;
  }
  forEach(e) {
    this.map.forEach((r2, n2) => r2.forEach((i) => e(i, n2, this)));
  }
  [Symbol.iterator]() {
    return this.entries().iterator();
  }
  entries() {
    return re(this.map.entries()).flatMap(([e, r2]) => r2.map((n2) => [e, n2]));
  }
  keys() {
    return re(this.map.keys());
  }
  values() {
    return re(this.map.values()).flat();
  }
  entriesGroupedByKey() {
    return re(this.map.entries());
  }
}, m(_a89, "MultiMap"), _a89);
var _a90;
var pi = (_a90 = class {
  get size() {
    return this.map.size;
  }
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), this.inverse = /* @__PURE__ */ new Map(), e) for (let [r2, n2] of e) this.set(r2, n2);
  }
  clear() {
    this.map.clear(), this.inverse.clear();
  }
  set(e, r2) {
    return this.map.set(e, r2), this.inverse.set(r2, e), this;
  }
  get(e) {
    return this.map.get(e);
  }
  getKey(e) {
    return this.inverse.get(e);
  }
  delete(e) {
    let r2 = this.map.get(e);
    return r2 !== void 0 ? (this.map.delete(e), this.inverse.delete(r2), true) : false;
  }
}, m(_a90, "BiMap"), _a90);
var _a91;
var io = (_a91 = class {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider;
  }
  async collectExportedSymbols(e, r2 = W.CancellationToken.None) {
    return this.collectExportedSymbolsForNode(e.parseResult.value, e, void 0, r2);
  }
  async collectExportedSymbolsForNode(e, r2, n2 = Qs, i = W.CancellationToken.None) {
    let a = [];
    this.addExportedSymbol(e, a, r2);
    for (let o2 of n2(e)) await De2(i), this.addExportedSymbol(o2, a, r2);
    return a;
  }
  addExportedSymbol(e, r2, n2) {
    let i = this.nameProvider.getName(e);
    i && r2.push(this.descriptions.createDescription(e, i, n2));
  }
  async collectLocalSymbols(e, r2 = W.CancellationToken.None) {
    let n2 = e.parseResult.value, i = new Tt();
    for (let a of ar(n2)) await De2(r2), this.addLocalSymbol(a, e, i);
    return i;
  }
  addLocalSymbol(e, r2, n2) {
    let i = e.$container;
    if (i) {
      let a = this.nameProvider.getName(e);
      a && n2.add(i, this.descriptions.createDescription(e, a, r2));
    }
  }
}, m(_a91, "DefaultScopeComputation"), _a91);
var _a92;
var xs = (_a92 = class {
  constructor(e, r2, n2) {
    this.elements = e, this.outerScope = r2, this.caseInsensitive = (n2 == null ? void 0 : n2.caseInsensitive) ?? false, this.concatOuterScope = (n2 == null ? void 0 : n2.concatOuterScope) ?? true;
  }
  getAllElements() {
    return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements;
  }
  getElement(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.caseInsensitive ? this.elements.find((i) => i.name.toLowerCase() === r2) : this.elements.find((i) => i.name === e);
    if (n2) return n2;
    if (this.outerScope) return this.outerScope.getElement(e);
  }
  getElements(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.caseInsensitive ? this.elements.filter((i) => i.name.toLowerCase() === r2) : this.elements.filter((i) => i.name === e);
    return (this.concatOuterScope || n2.isEmpty()) && this.outerScope ? n2.concat(this.outerScope.getElements(e)) : n2;
  }
}, m(_a92, "StreamScope"), _a92);
var _a93;
var hp = (_a93 = class {
  constructor(e, r2, n2) {
    this.elements = /* @__PURE__ */ new Map(), this.caseInsensitive = (n2 == null ? void 0 : n2.caseInsensitive) ?? false, this.concatOuterScope = (n2 == null ? void 0 : n2.concatOuterScope) ?? true;
    for (let i of e) {
      let a = this.caseInsensitive ? i.name.toLowerCase() : i.name;
      this.elements.set(a, i);
    }
    this.outerScope = r2;
  }
  getElement(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.elements.get(r2);
    if (n2) return n2;
    if (this.outerScope) return this.outerScope.getElement(e);
  }
  getElements(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.elements.get(r2), i = n2 ? [n2] : [];
    return (this.concatOuterScope || i.length > 0) && this.outerScope ? re(i).concat(this.outerScope.getElements(e)) : re(i);
  }
  getAllElements() {
    let e = re(this.elements.values());
    return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
  }
}, m(_a93, "MapScope"), _a93);
var _a94;
var so = (_a94 = class {
  constructor(e, r2, n2) {
    this.elements = new Tt(), this.caseInsensitive = (n2 == null ? void 0 : n2.caseInsensitive) ?? false, this.concatOuterScope = (n2 == null ? void 0 : n2.concatOuterScope) ?? true;
    for (let i of e) {
      let a = this.caseInsensitive ? i.name.toLowerCase() : i.name;
      this.elements.add(a, i);
    }
    this.outerScope = r2;
  }
  getElement(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.elements.get(r2)[0];
    if (n2) return n2;
    if (this.outerScope) return this.outerScope.getElement(e);
  }
  getElements(e) {
    let r2 = this.caseInsensitive ? e.toLowerCase() : e, n2 = this.elements.get(r2);
    return (this.concatOuterScope || n2.length === 0) && this.outerScope ? re(n2).concat(this.outerScope.getElements(e)) : re(n2);
  }
  getAllElements() {
    let e = re(this.elements.values());
    return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
  }
}, m(_a94, "MultiMapScope"), _a94);
var xA = { getElement() {
}, getElements() {
  return on;
}, getAllElements() {
  return on;
} };
var _a95;
var vs = (_a95 = class {
  constructor() {
    this.toDispose = [], this.isDisposed = false;
  }
  onDispose(e) {
    this.toDispose.push(e);
  }
  dispose() {
    this.throwIfDisposed(), this.clear(), this.isDisposed = true, this.toDispose.forEach((e) => e.dispose());
  }
  throwIfDisposed() {
    if (this.isDisposed) throw new Error("This cache has already been disposed");
  }
}, m(_a95, "DisposableCache"), _a95);
var _a96;
var ao = (_a96 = class extends vs {
  constructor() {
    super(...arguments), this.cache = /* @__PURE__ */ new Map();
  }
  has(e) {
    return this.throwIfDisposed(), this.cache.has(e);
  }
  set(e, r2) {
    this.throwIfDisposed(), this.cache.set(e, r2);
  }
  get(e, r2) {
    if (this.throwIfDisposed(), this.cache.has(e)) return this.cache.get(e);
    if (r2) {
      let n2 = r2();
      return this.cache.set(e, n2), n2;
    } else return;
  }
  delete(e) {
    return this.throwIfDisposed(), this.cache.delete(e);
  }
  clear() {
    this.throwIfDisposed(), this.cache.clear();
  }
}, m(_a96, "SimpleCache"), _a96);
var _a97;
var mi = (_a97 = class extends vs {
  constructor(e) {
    super(), this.cache = /* @__PURE__ */ new Map(), this.converter = e ?? ((r2) => r2);
  }
  has(e, r2) {
    return this.throwIfDisposed(), this.cacheForContext(e).has(r2);
  }
  set(e, r2, n2) {
    this.throwIfDisposed(), this.cacheForContext(e).set(r2, n2);
  }
  get(e, r2, n2) {
    this.throwIfDisposed();
    let i = this.cacheForContext(e);
    if (i.has(r2)) return i.get(r2);
    if (n2) {
      let a = n2();
      return i.set(r2, a), a;
    } else return;
  }
  delete(e, r2) {
    return this.throwIfDisposed(), this.cacheForContext(e).delete(r2);
  }
  clear(e) {
    if (this.throwIfDisposed(), e) {
      let r2 = this.converter(e);
      this.cache.delete(r2);
    } else this.cache.clear();
  }
  cacheForContext(e) {
    let r2 = this.converter(e), n2 = this.cache.get(r2);
    return n2 || (n2 = /* @__PURE__ */ new Map(), this.cache.set(r2, n2)), n2;
  }
}, m(_a97, "ContextCache"), _a97);
var _a98;
var vu = (_a98 = class extends mi {
  constructor(e, r2) {
    super((n2) => n2.toString()), r2 ? (this.toDispose.push(e.workspace.DocumentBuilder.onDocumentPhase(r2, (n2) => {
      this.clear(n2.uri.toString());
    })), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n2, i) => {
      for (let a of i) this.clear(a);
    }))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n2, i) => {
      let a = n2.concat(i);
      for (let o2 of a) this.clear(o2);
    }));
  }
}, m(_a98, "DocumentCache"), _a98);
var _a99;
var Es = (_a99 = class extends ao {
  constructor(e, r2) {
    super(), r2 ? (this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(r2, () => {
      this.clear();
    })), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n2, i) => {
      i.length > 0 && this.clear();
    }))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(() => {
      this.clear();
    }));
  }
}, m(_a99, "WorkspaceCache"), _a99);
var _a100;
var oo = (_a100 = class {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager, this.globalScopeCache = new Es(e.shared);
  }
  getScope(e) {
    let r2 = [], n2 = this.reflection.getReferenceType(e), i = gt(e.container).localSymbols;
    if (i) {
      let o2 = e.container;
      do
        i.has(o2) && r2.push(i.getStream(o2).filter((l) => this.reflection.isSubtype(l.type, n2))), o2 = o2.$container;
      while (o2);
    }
    let a = this.getGlobalScope(n2, e);
    for (let o2 = r2.length - 1; o2 >= 0; o2--) a = this.createScope(r2[o2], a);
    return a;
  }
  createScope(e, r2, n2) {
    return new xs(re(e), r2, n2);
  }
  createScopeForNodes(e, r2, n2) {
    let i = re(e).map((a) => {
      let o2 = this.nameProvider.getName(a);
      if (o2) return this.descriptions.createDescription(a, o2);
    }).nonNullable();
    return new xs(i, r2, n2);
  }
  getGlobalScope(e, r2) {
    return this.globalScopeCache.get(e, () => new so(this.indexManager.allElements(e)));
  }
}, m(_a100, "DefaultScopeProvider"), _a100);
function gp(t) {
  return typeof t.$comment == "string";
}
m(gp, "isAstNodeWithComment");
function Cy(t) {
  return typeof t == "object" && !!t && ("$ref" in t || "$error" in t);
}
m(Cy, "isIntermediateReference");
var _a101;
var lo = (_a101 = class {
  constructor(e) {
    this.ignoreProperties = /* @__PURE__ */ new Set(["$container", "$containerProperty", "$containerIndex", "$document", "$cstNode"]), this.langiumDocuments = e.shared.workspace.LangiumDocuments, this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider, this.commentProvider = e.documentation.CommentProvider;
  }
  serialize(e, r2) {
    let n2 = r2 ?? {}, i = r2 == null ? void 0 : r2.replacer, a = m((l, u) => this.replacer(l, u, n2), "defaultReplacer"), o2 = i ? (l, u) => i(l, u, a) : a;
    try {
      return this.currentDocument = gt(e), JSON.stringify(e, o2, r2 == null ? void 0 : r2.space);
    } finally {
      this.currentDocument = void 0;
    }
  }
  deserialize(e, r2) {
    let n2 = r2 ?? {}, i = JSON.parse(e);
    return this.linkNode(i, i, n2), i;
  }
  replacer(e, r2, { refText: n2, sourceText: i, textRegions: a, comments: o2, uriConverter: l }) {
    var _a135, _b, _c2;
    if (!this.ignoreProperties.has(e)) if (Qe(r2)) {
      let u = r2.ref, c = n2 ? r2.$refText : void 0;
      if (u) {
        let d = gt(u), m3 = "";
        this.currentDocument && this.currentDocument !== d && (l ? m3 = l(d.uri, u) : m3 = d.uri.toString());
        let h2 = this.astNodeLocator.getAstNodePath(u);
        return { $ref: `${m3}#${h2}`, $refText: c };
      } else return { $error: ((_a135 = r2.error) == null ? void 0 : _a135.message) ?? "Could not resolve reference", $refText: c };
    } else if (Ut(r2)) {
      let u = n2 ? r2.$refText : void 0, c = [];
      for (let d of r2.items) {
        let m3 = d.ref, h2 = gt(d.ref), y = "";
        this.currentDocument && this.currentDocument !== h2 && (l ? y = l(h2.uri, m3) : y = h2.uri.toString());
        let k = this.astNodeLocator.getAstNodePath(m3);
        c.push(`${y}#${k}`);
      }
      return { $refs: c, $refText: u };
    } else if (Le(r2)) {
      let u;
      if (a && (u = this.addAstNodeRegionWithAssignmentsTo({ ...r2 }), (!e || r2.$document) && (u == null ? void 0 : u.$textRegion) && (u.$textRegion.documentURI = (_b = this.currentDocument) == null ? void 0 : _b.uri.toString())), i && !e && (u ?? (u = { ...r2 }), u.$sourceText = (_c2 = r2.$cstNode) == null ? void 0 : _c2.text), o2) {
        u ?? (u = { ...r2 });
        let c = this.commentProvider.getComment(r2);
        c && (u.$comment = c.replace(/\r/g, ""));
      }
      return u ?? r2;
    } else return r2;
  }
  addAstNodeRegionWithAssignmentsTo(e) {
    let r2 = m((n2) => ({ offset: n2.offset, end: n2.end, length: n2.length, range: n2.range }), "createDocumentSegment");
    if (e.$cstNode) {
      let n2 = e.$textRegion = r2(e.$cstNode), i = n2.assignments = {};
      return Object.keys(e).filter((a) => !a.startsWith("$")).forEach((a) => {
        let o2 = df(e.$cstNode, a).map(r2);
        o2.length !== 0 && (i[a] = o2);
      }), e;
    }
  }
  linkNode(e, r2, n2, i, a, o2) {
    for (let [u, c] of Object.entries(e)) if (Array.isArray(c)) for (let d = 0; d < c.length; d++) {
      let m3 = c[d];
      Cy(m3) ? c[d] = this.reviveReference(e, u, r2, m3, n2) : Le(m3) && this.linkNode(m3, r2, n2, e, u, d);
    }
    else Cy(c) ? e[u] = this.reviveReference(e, u, r2, c, n2) : Le(c) && this.linkNode(c, r2, n2, e, u);
    let l = e;
    l.$container = i, l.$containerProperty = a, l.$containerIndex = o2;
  }
  reviveReference(e, r2, n2, i, a) {
    let o2 = i.$refText, l = i.$error, u;
    if (i.$ref) {
      let c = this.getRefNode(n2, i.$ref, a.uriConverter);
      if (Le(c)) return o2 || (o2 = this.nameProvider.getName(c)), { $refText: o2 ?? "", ref: c };
      l = c;
    } else if (i.$refs) {
      let c = [];
      for (let d of i.$refs) {
        let m3 = this.getRefNode(n2, d, a.uriConverter);
        Le(m3) && c.push({ ref: m3 });
      }
      if (c.length === 0) u = { $refText: o2 ?? "", items: c }, l ?? (l = "Could not resolve multi-reference");
      else return { $refText: o2 ?? "", items: c };
    }
    if (l) return u ?? (u = { $refText: o2 ?? "", ref: void 0 }), u.error = { info: { container: e, property: r2, reference: u }, message: l }, u;
  }
  getRefNode(e, r2, n2) {
    try {
      let i = r2.indexOf("#");
      if (i === 0) {
        let u = this.astNodeLocator.getAstNode(e, r2.substring(1));
        return u || "Could not resolve path: " + r2;
      }
      if (i < 0) {
        let u = n2 ? n2(r2) : tt.parse(r2), c = this.langiumDocuments.getDocument(u);
        return c ? c.parseResult.value : "Could not find document for URI: " + r2;
      }
      let a = n2 ? n2(r2.substring(0, i)) : tt.parse(r2.substring(0, i)), o2 = this.langiumDocuments.getDocument(a);
      if (!o2) return "Could not find document for URI: " + r2;
      if (i === r2.length - 1) return o2.parseResult.value;
      let l = this.astNodeLocator.getAstNode(o2.parseResult.value, r2.substring(i + 1));
      return l || "Could not resolve URI: " + r2;
    } catch (i) {
      return String(i);
    }
  }
}, m(_a101, "DefaultJsonSerializer"), _a101);
var _a102;
var uo = (_a102 = class {
  get map() {
    return this.fileExtensionMap;
  }
  constructor(e) {
    this.languageIdMap = /* @__PURE__ */ new Map(), this.fileExtensionMap = /* @__PURE__ */ new Map(), this.fileNameMap = /* @__PURE__ */ new Map(), this.textDocuments = e == null ? void 0 : e.workspace.TextDocuments;
  }
  register(e) {
    let r2 = e.LanguageMetaData;
    for (let n2 of r2.fileExtensions) this.fileExtensionMap.has(n2) && console.warn(`The file extension ${n2} is used by multiple languages. It is now assigned to '${r2.languageId}'.`), this.fileExtensionMap.set(n2, e);
    if (r2.fileNames) for (let n2 of r2.fileNames) this.fileNameMap.has(n2) && console.warn(`The file name ${n2} is used by multiple languages. It is now assigned to '${r2.languageId}'.`), this.fileNameMap.set(n2, e);
    this.languageIdMap.set(r2.languageId, e);
  }
  getServices(e) {
    var _a135, _b;
    if (this.languageIdMap.size === 0) throw new Error("The service registry is empty. Use `register` to register the services of a language.");
    let r2 = (_b = (_a135 = this.textDocuments) == null ? void 0 : _a135.get(e)) == null ? void 0 : _b.languageId;
    if (r2 !== void 0) {
      let o2 = this.languageIdMap.get(r2);
      if (o2) return o2;
    }
    let n2 = je.extname(e), i = je.basename(e), a = this.fileNameMap.get(i) ?? this.fileExtensionMap.get(n2);
    if (!a) throw r2 ? new Error(`The service registry contains no services for the extension '${n2}' for language '${r2}'.`) : new Error(`The service registry contains no services for the extension '${n2}'.`);
    return a;
  }
  hasServices(e) {
    try {
      return this.getServices(e), true;
    } catch {
      return false;
    }
  }
  get all() {
    return Array.from(this.languageIdMap.values());
  }
}, m(_a102, "DefaultServiceRegistry"), _a102);
function hi(t) {
  return { code: t };
}
m(hi, "diagnosticData");
var Eu;
(function(t) {
  t.defaults = ["fast", "slow", "built-in"], t.all = t.defaults;
})(Eu || (Eu = {}));
var _a103;
var co = (_a103 = class {
  constructor(e) {
    this.entries = new Tt(), this.knownCategories = new Set(Eu.defaults), this.entriesBefore = [], this.entriesAfter = [], this.reflection = e.shared.AstReflection;
  }
  register(e, r2 = this, n2 = "fast") {
    if (n2 === "built-in") throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
    this.knownCategories.add(n2);
    for (let [i, a] of Object.entries(e)) {
      let o2 = a;
      if (Array.isArray(o2)) for (let l of o2) {
        let u = { check: this.wrapValidationException(l, r2), category: n2 };
        this.addEntry(i, u);
      }
      else if (typeof o2 == "function") {
        let l = { check: this.wrapValidationException(o2, r2), category: n2 };
        this.addEntry(i, l);
      } else vr(o2);
    }
  }
  wrapValidationException(e, r2) {
    return async (n2, i, a) => {
      await this.handleException(() => e.call(r2, n2, i, a), "An error occurred during validation", i, n2);
    };
  }
  async handleException(e, r2, n2, i) {
    try {
      await e();
    } catch (a) {
      if (Nr(a)) throw a;
      console.error(`${r2}:`, a), a instanceof Error && a.stack && console.error(a.stack);
      let o2 = a instanceof Error ? a.message : String(a);
      n2("error", `${r2}: ${o2}`, { node: i });
    }
  }
  addEntry(e, r2) {
    if (e === "AstNode") {
      this.entries.add("AstNode", r2);
      return;
    }
    for (let n2 of this.reflection.getAllSubTypes(e)) this.entries.add(n2, r2);
  }
  getChecks(e, r2) {
    let n2 = re(this.entries.get(e)).concat(this.entries.get("AstNode"));
    return r2 && (n2 = n2.filter((i) => r2.includes(i.category))), n2.map((i) => i.check);
  }
  registerBeforeDocument(e, r2 = this) {
    this.entriesBefore.push(this.wrapPreparationException(e, "An error occurred during set-up of the validation", r2));
  }
  registerAfterDocument(e, r2 = this) {
    this.entriesAfter.push(this.wrapPreparationException(e, "An error occurred during tear-down of the validation", r2));
  }
  wrapPreparationException(e, r2, n2) {
    return async (i, a, o2, l) => {
      await this.handleException(() => e.call(n2, i, a, o2, l), r2, a, i);
    };
  }
  get checksBefore() {
    return this.entriesBefore;
  }
  get checksAfter() {
    return this.entriesAfter;
  }
  getAllValidationCategories(e) {
    return this.knownCategories;
  }
}, m(_a103, "ValidationRegistry"), _a103);
var Sy = Object.freeze({ validateNode: true, validateChildren: true });
var _a104;
var fo = (_a104 = class {
  constructor(e) {
    this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId;
  }
  async validateDocument(e, r2 = {}, n2 = W.CancellationToken.None) {
    let i = e.parseResult, a = [];
    if (await De2(n2), (!r2.categories || r2.categories.includes("built-in")) && (this.processLexingErrors(i, a, r2), r2.stopAfterLexingErrors && a.some((o2) => {
      var _a135;
      return ((_a135 = o2.data) == null ? void 0 : _a135.code) === Xt.LexingError;
    }) || (this.processParsingErrors(i, a, r2), r2.stopAfterParsingErrors && a.some((o2) => {
      var _a135;
      return ((_a135 = o2.data) == null ? void 0 : _a135.code) === Xt.ParsingError;
    })) || (this.processLinkingErrors(e, a, r2), r2.stopAfterLinkingErrors && a.some((o2) => {
      var _a135;
      return ((_a135 = o2.data) == null ? void 0 : _a135.code) === Xt.LinkingError;
    })))) return a;
    try {
      a.push(...await this.validateAst(i.value, r2, n2));
    } catch (o2) {
      if (Nr(o2)) throw o2;
      console.error("An error occurred during validation:", o2);
    }
    return await De2(n2), a;
  }
  processLexingErrors(e, r2, n2) {
    var _a135;
    let i = [...e.lexerErrors, ...((_a135 = e.lexerReport) == null ? void 0 : _a135.diagnostics) ?? []];
    for (let a of i) {
      let o2 = a.severity ?? "error", l = { severity: Au(o2), range: { start: { line: a.line - 1, character: a.column - 1 }, end: { line: a.line - 1, character: a.column + a.length - 1 } }, message: a.message, data: Ny(o2), source: this.getSource() };
      r2.push(l);
    }
  }
  processParsingErrors(e, r2, n2) {
    for (let i of e.parserErrors) {
      let a;
      if (isNaN(i.token.startOffset)) {
        if ("previousToken" in i) {
          let o2 = i.previousToken;
          if (isNaN(o2.startOffset)) {
            let l = { line: 0, character: 0 };
            a = { start: l, end: l };
          } else {
            let l = { line: o2.endLine - 1, character: o2.endColumn };
            a = { start: l, end: l };
          }
        }
      } else a = Gi(i.token);
      if (a) {
        let o2 = { severity: Au("error"), range: a, message: i.message, data: hi(Xt.ParsingError), source: this.getSource() };
        r2.push(o2);
      }
    }
  }
  processLinkingErrors(e, r2, n2) {
    var _a135;
    for (let i of e.references) {
      let a = i.error;
      if (a) {
        let o2 = { node: a.info.container, range: (_a135 = i.$refNode) == null ? void 0 : _a135.range, property: a.info.property, index: a.info.index, data: { code: Xt.LinkingError, containerType: a.info.container.$type, property: a.info.property, refText: a.info.reference.$refText } };
        r2.push(this.toDiagnostic("error", a.message, o2));
      }
    }
  }
  async validateAst(e, r2, n2 = W.CancellationToken.None) {
    let i = [], a = m((o2, l, u) => {
      i.push(this.toDiagnostic(o2, l, u));
    }, "acceptor");
    return await this.validateAstBefore(e, r2, a, n2), await this.validateAstNodes(e, r2, a, n2), await this.validateAstAfter(e, r2, a, n2), i;
  }
  async validateAstBefore(e, r2, n2, i = W.CancellationToken.None) {
    let a = this.validationRegistry.checksBefore;
    for (let o2 of a) await De2(i), await o2(e, n2, r2.categories ?? [], i);
  }
  async validateAstNodes(e, r2, n2, i = W.CancellationToken.None) {
    var _a135;
    if ((_a135 = this.profiler) == null ? void 0 : _a135.isActive("validating")) {
      let a = this.profiler.createTask("validating", this.languageId);
      a.start();
      try {
        let o2 = Ct(e).iterator();
        for (let l of o2) {
          a.startSubTask(l.$type);
          let u = this.validateSingleNodeOptions(l, r2);
          if (u.validateNode) try {
            let c = this.validationRegistry.getChecks(l.$type, r2.categories);
            for (let d of c) await d(l, n2, i);
          } finally {
            a.stopSubTask(l.$type);
          }
          u.validateChildren || o2.prune();
        }
      } finally {
        a.stop();
      }
    } else {
      let a = Ct(e).iterator();
      for (let o2 of a) {
        await De2(i);
        let l = this.validateSingleNodeOptions(o2, r2);
        if (l.validateNode) {
          let u = this.validationRegistry.getChecks(o2.$type, r2.categories);
          for (let c of u) await c(o2, n2, i);
        }
        l.validateChildren || a.prune();
      }
    }
  }
  validateSingleNodeOptions(e, r2) {
    return Sy;
  }
  async validateAstAfter(e, r2, n2, i = W.CancellationToken.None) {
    let a = this.validationRegistry.checksAfter;
    for (let o2 of a) await De2(i), await o2(e, n2, r2.categories ?? [], i);
  }
  toDiagnostic(e, r2, n2) {
    return { message: r2, range: ky(n2), severity: Au(e), code: n2.code, codeDescription: n2.codeDescription, tags: n2.tags, relatedInformation: n2.relatedInformation, data: n2.data, source: this.getSource() };
  }
  getSource() {
    return this.metadata.languageId;
  }
}, m(_a104, "DefaultDocumentValidator"), _a104);
function ky(t) {
  if (t.range) return t.range;
  let e;
  return typeof t.property == "string" ? e = ga(t.node.$cstNode, t.property, t.index) : typeof t.keyword == "string" && (e = mf(t.node.$cstNode, t.keyword, t.index)), e ?? (e = t.node.$cstNode), e ? e.range : { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
}
m(ky, "getDiagnosticRange");
function Au(t) {
  switch (t) {
    case "error":
      return 1;
    case "warning":
      return 2;
    case "info":
      return 3;
    case "hint":
      return 4;
    default:
      throw new Error("Invalid diagnostic severity: " + t);
  }
}
m(Au, "toDiagnosticSeverity");
function Ny(t) {
  switch (t) {
    case "error":
      return hi(Xt.LexingError);
    case "warning":
      return hi(Xt.LexingWarning);
    case "info":
      return hi(Xt.LexingInfo);
    case "hint":
      return hi(Xt.LexingHint);
    default:
      throw new Error("Invalid diagnostic severity: " + t);
  }
}
m(Ny, "toDiagnosticData");
var Xt;
(function(t) {
  t.LexingError = "lexing-error", t.LexingWarning = "lexing-warning", t.LexingInfo = "lexing-info", t.LexingHint = "lexing-hint", t.ParsingError = "parsing-error", t.LinkingError = "linking-error";
})(Xt || (Xt = {}));
var _a105;
var po = (_a105 = class {
  constructor(e) {
    this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider;
  }
  createDescription(e, r2, n2) {
    let i = n2 ?? gt(e);
    r2 ?? (r2 = this.nameProvider.getName(e));
    let a = this.astNodeLocator.getAstNodePath(e);
    if (!r2) throw new Error(`Node at path ${a} has no name.`);
    let o2, l = m(() => o2 ?? (o2 = Hn(this.nameProvider.getNameNode(e) ?? e.$cstNode)), "nameSegmentGetter");
    return { node: e, name: r2, get nameSegment() {
      return l();
    }, selectionSegment: Hn(e.$cstNode), type: e.$type, documentUri: i.uri, path: a };
  }
}, m(_a105, "DefaultAstNodeDescriptionProvider"), _a105);
var _a106;
var mo = (_a106 = class {
  constructor(e) {
    this.nodeLocator = e.workspace.AstNodeLocator;
  }
  async createDescriptions(e, r2 = W.CancellationToken.None) {
    let n2 = [], i = e.parseResult.value;
    for (let a of Ct(i)) await De2(r2), ln(a).forEach((o2) => {
      o2.reference.error || n2.push(...this.createInfoDescriptions(o2));
    });
    return n2;
  }
  createInfoDescriptions(e) {
    let r2 = e.reference;
    if (r2.error || !r2.$refNode) return [];
    let n2 = [];
    Qe(r2) && r2.$nodeDescription ? n2 = [r2.$nodeDescription] : Ut(r2) && (n2 = r2.items.map((u) => u.$nodeDescription).filter((u) => u !== void 0));
    let i = gt(e.container).uri, a = this.nodeLocator.getAstNodePath(e.container), o2 = [], l = Hn(r2.$refNode);
    for (let u of n2) o2.push({ sourceUri: i, sourcePath: a, targetUri: u.documentUri, targetPath: u.path, segment: l, local: je.equals(u.documentUri, i) });
    return o2;
  }
}, m(_a106, "DefaultReferenceDescriptionProvider"), _a106);
var _a107;
var ho = (_a107 = class {
  constructor() {
    this.segmentSeparator = "/", this.indexSeparator = "@";
  }
  getAstNodePath(e) {
    if (e.$container) {
      let r2 = this.getAstNodePath(e.$container), n2 = this.getPathSegment(e);
      return r2 + this.segmentSeparator + n2;
    }
    return "";
  }
  getPathSegment({ $containerProperty: e, $containerIndex: r2 }) {
    if (!e) throw new Error("Missing '$containerProperty' in AST node.");
    return r2 !== void 0 ? e + this.indexSeparator + r2 : e;
  }
  getAstNode(e, r2) {
    return r2.split(this.segmentSeparator).reduce((i, a) => {
      var _a135;
      if (!i || a.length === 0) return i;
      let o2 = a.indexOf(this.indexSeparator);
      if (o2 > 0) {
        let l = a.substring(0, o2), u = parseInt(a.substring(o2 + 1));
        return (_a135 = i[l]) == null ? void 0 : _a135[u];
      }
      return i[a];
    }, e);
  }
}, m(_a107, "DefaultAstNodeLocator"), _a107);
var Se = {};
q(Se, r(fi2(), 1));
var _a108;
var go = (_a108 = class {
  constructor(e) {
    this._ready = new It(), this.onConfigurationSectionUpdateEmitter = new Se.Emitter(), this.settings = {}, this.workspaceConfig = false, this.serviceRegistry = e.ServiceRegistry;
  }
  get ready() {
    return this._ready.promise;
  }
  initialize(e) {
    var _a135;
    this.workspaceConfig = ((_a135 = e.capabilities.workspace) == null ? void 0 : _a135.configuration) ?? false;
  }
  async initialized(e) {
    if (this.workspaceConfig) {
      if (e.register) {
        let r2 = this.serviceRegistry.all;
        e.register({ section: r2.map((n2) => this.toSectionName(n2.LanguageMetaData.languageId)) });
      }
      if (e.fetchConfiguration) {
        let r2 = this.serviceRegistry.all.map((i) => ({ section: this.toSectionName(i.LanguageMetaData.languageId) })), n2 = await e.fetchConfiguration(r2);
        r2.forEach((i, a) => {
          this.updateSectionConfiguration(i.section, n2[a]);
        });
      }
    }
    this._ready.resolve();
  }
  updateConfiguration(e) {
    typeof e.settings != "object" || e.settings === null || Object.entries(e.settings).forEach(([r2, n2]) => {
      this.updateSectionConfiguration(r2, n2), this.onConfigurationSectionUpdateEmitter.fire({ section: r2, configuration: n2 });
    });
  }
  updateSectionConfiguration(e, r2) {
    this.settings[e] = r2;
  }
  async getConfiguration(e, r2) {
    await this.ready;
    let n2 = this.toSectionName(e);
    if (this.settings[n2]) return this.settings[n2][r2];
  }
  toSectionName(e) {
    return `${e}`;
  }
  get onConfigurationSectionUpdate() {
    return this.onConfigurationSectionUpdateEmitter.event;
  }
}, m(_a108, "DefaultConfigurationProvider"), _a108);
var Gs = r(J$(), 1);
var bn;
(function(t) {
  function e(r2) {
    return { dispose: m(async () => await r2(), "dispose") };
  }
  m(e, "create"), t.create = e;
})(bn || (bn = {}));
var _a109;
var So = (_a109 = class {
  constructor(e) {
    this.updateBuildOptions = { validation: { categories: ["built-in", "fast"] } }, this.updateListeners = [], this.buildPhaseListeners = new Tt(), this.documentPhaseListeners = new Tt(), this.buildState = /* @__PURE__ */ new Map(), this.documentBuildWaiters = /* @__PURE__ */ new Map(), this.currentState = ee.Changed, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.textDocuments = e.workspace.TextDocuments, this.indexManager = e.workspace.IndexManager, this.fileSystemProvider = e.workspace.FileSystemProvider, this.workspaceManager = () => e.workspace.WorkspaceManager, this.serviceRegistry = e.ServiceRegistry;
  }
  async build(e, r2 = {}, n2 = W.CancellationToken.None) {
    var _a135;
    for (let i of e) {
      let a = i.uri.toString();
      if (i.state === ee.Validated) {
        if (typeof r2.validation == "boolean" && r2.validation) this.resetToState(i, ee.IndexedReferences);
        else if (typeof r2.validation == "object") {
          let o2 = this.findMissingValidationCategories(i, r2);
          o2.length > 0 && (this.buildState.set(a, { completed: false, options: { validation: { categories: o2 } }, result: (_a135 = this.buildState.get(a)) == null ? void 0 : _a135.result }), i.state = ee.IndexedReferences);
        }
      } else this.buildState.delete(a);
    }
    this.currentState = ee.Changed, await this.emitUpdate(e.map((i) => i.uri), []), await this.buildDocuments(e, r2, n2);
  }
  async update(e, r2, n2 = W.CancellationToken.None) {
    this.currentState = ee.Changed;
    let i = [];
    for (let u of r2) {
      let c = this.langiumDocuments.deleteDocuments(u);
      for (let d of c) i.push(d.uri), this.cleanUpDeleted(d);
    }
    let a = (await Promise.all(e.map((u) => this.findChangedUris(u)))).flat();
    for (let u of a) {
      let c = this.langiumDocuments.getDocument(u);
      c === void 0 && (c = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, u), c.state = ee.Changed, this.langiumDocuments.addDocument(c)), this.resetToState(c, ee.Changed);
    }
    let o2 = re(a).concat(i).map((u) => u.toString()).toSet();
    this.langiumDocuments.all.filter((u) => !o2.has(u.uri.toString()) && this.shouldRelink(u, o2)).forEach((u) => this.resetToState(u, ee.ComputedScopes)), await this.emitUpdate(a, i), await De2(n2);
    let l = this.sortDocuments(this.langiumDocuments.all.filter((u) => {
      var _a135;
      return u.state < ee.Validated || !((_a135 = this.buildState.get(u.uri.toString())) == null ? void 0 : _a135.completed) || this.resultsAreIncomplete(u, this.updateBuildOptions);
    }).toArray());
    await this.buildDocuments(l, this.updateBuildOptions, n2);
  }
  resultsAreIncomplete(e, r2) {
    return this.findMissingValidationCategories(e, r2).length >= 1;
  }
  findMissingValidationCategories(e, r2) {
    var _a135, _b;
    let n2 = this.buildState.get(e.uri.toString()), i = this.serviceRegistry.getServices(e.uri).validation.ValidationRegistry.getAllValidationCategories(e), a = ((_a135 = n2 == null ? void 0 : n2.result) == null ? void 0 : _a135.validationChecks) ? new Set((_b = n2 == null ? void 0 : n2.result) == null ? void 0 : _b.validationChecks) : (n2 == null ? void 0 : n2.completed) ? i : /* @__PURE__ */ new Set(), o2 = r2 === void 0 || r2.validation === true ? i : typeof r2.validation == "object" ? r2.validation.categories ?? i : [];
    return re(o2).filter((l) => !a.has(l)).toArray();
  }
  async findChangedUris(e) {
    var _a135;
    if (this.langiumDocuments.getDocument(e) ?? ((_a135 = this.textDocuments) == null ? void 0 : _a135.get(e))) return [e];
    try {
      let n2 = await this.fileSystemProvider.stat(e);
      if (n2.isDirectory) return await this.workspaceManager().searchFolder(e);
      if (this.workspaceManager().shouldIncludeEntry(n2)) return [e];
    } catch {
    }
    return [];
  }
  async emitUpdate(e, r2) {
    await Promise.all(this.updateListeners.map((n2) => n2(e, r2)));
  }
  sortDocuments(e) {
    let r2 = 0, n2 = e.length - 1;
    for (; r2 < n2; ) {
      for (; r2 < e.length && this.hasTextDocument(e[r2]); ) r2++;
      for (; n2 >= 0 && !this.hasTextDocument(e[n2]); ) n2--;
      r2 < n2 && ([e[r2], e[n2]] = [e[n2], e[r2]]);
    }
    return e;
  }
  hasTextDocument(e) {
    var _a135;
    return !!((_a135 = this.textDocuments) == null ? void 0 : _a135.get(e.uri));
  }
  shouldRelink(e, r2) {
    return e.references.some((n2) => n2.error !== void 0) ? true : this.indexManager.isAffected(e, r2);
  }
  onUpdate(e) {
    return this.updateListeners.push(e), bn.create(() => {
      let r2 = this.updateListeners.indexOf(e);
      r2 >= 0 && this.updateListeners.splice(r2, 1);
    });
  }
  resetToState(e, r2) {
    switch (r2) {
      case ee.Changed:
      case ee.Parsed:
        this.indexManager.removeContent(e.uri);
      case ee.IndexedContent:
        e.localSymbols = void 0;
      case ee.ComputedScopes:
        this.serviceRegistry.getServices(e.uri).references.Linker.unlink(e);
      case ee.Linked:
        this.indexManager.removeReferences(e.uri);
      case ee.IndexedReferences:
        e.diagnostics = void 0, this.buildState.delete(e.uri.toString());
      case ee.Validated:
    }
    e.state > r2 && (e.state = r2);
  }
  cleanUpDeleted(e) {
    this.buildState.delete(e.uri.toString()), this.indexManager.remove(e.uri), e.state = ee.Changed;
  }
  async buildDocuments(e, r2, n2) {
    this.prepareBuild(e, r2), await this.runCancelable(e, ee.Parsed, n2, (o2) => this.langiumDocumentFactory.update(o2, n2)), await this.runCancelable(e, ee.IndexedContent, n2, (o2) => this.indexManager.updateContent(o2, n2)), await this.runCancelable(e, ee.ComputedScopes, n2, async (o2) => {
      let l = this.serviceRegistry.getServices(o2.uri).references.ScopeComputation;
      o2.localSymbols = await l.collectLocalSymbols(o2, n2);
    });
    let i = e.filter((o2) => this.shouldLink(o2));
    await this.runCancelable(i, ee.Linked, n2, (o2) => this.serviceRegistry.getServices(o2.uri).references.Linker.link(o2, n2)), await this.runCancelable(i, ee.IndexedReferences, n2, (o2) => this.indexManager.updateReferences(o2, n2));
    let a = e.filter((o2) => this.shouldValidate(o2) ? true : (this.markAsCompleted(o2), false));
    await this.runCancelable(a, ee.Validated, n2, async (o2) => {
      await this.validate(o2, n2), this.markAsCompleted(o2);
    });
  }
  markAsCompleted(e) {
    let r2 = this.buildState.get(e.uri.toString());
    r2 && (r2.completed = true);
  }
  prepareBuild(e, r2) {
    for (let n2 of e) {
      let i = n2.uri.toString(), a = this.buildState.get(i);
      (!a || a.completed) && this.buildState.set(i, { completed: false, options: r2, result: a == null ? void 0 : a.result });
    }
  }
  async runCancelable(e, r2, n2, i) {
    for (let o2 of e) o2.state < r2 && (await De2(n2), await i(o2), o2.state = r2, await this.notifyDocumentPhase(o2, r2, n2));
    let a = e.filter((o2) => o2.state === r2);
    await this.notifyBuildPhase(a, r2, n2), this.currentState = r2;
  }
  onBuildPhase(e, r2) {
    return this.buildPhaseListeners.add(e, r2), bn.create(() => {
      this.buildPhaseListeners.delete(e, r2);
    });
  }
  onDocumentPhase(e, r2) {
    return this.documentPhaseListeners.add(e, r2), bn.create(() => {
      this.documentPhaseListeners.delete(e, r2);
    });
  }
  waitUntil(e, r2, n2) {
    let i;
    return r2 && "path" in r2 ? i = r2 : n2 = r2, n2 ?? (n2 = W.CancellationToken.None), i ? this.awaitDocumentState(e, i, n2) : this.awaitBuilderState(e, n2);
  }
  awaitDocumentState(e, r2, n2) {
    let i = this.langiumDocuments.getDocument(r2);
    if (i) {
      if (i.state >= e) return Promise.resolve(r2);
      if (n2.isCancellationRequested) return Promise.reject(Yt);
      if (this.currentState >= e && e > i.state) return Promise.reject(new Gs.ResponseError(Gs.LSPErrorCodes.RequestFailed, `Document state of ${r2.toString()} is ${ee[i.state]}, requiring ${ee[e]}, but workspace state is already ${ee[this.currentState]}. Returning undefined.`));
    } else return Promise.reject(new Gs.ResponseError(Gs.LSPErrorCodes.ServerCancelled, `No document found for URI: ${r2.toString()}`));
    return new Promise((a, o2) => {
      let l = this.onDocumentPhase(e, (c) => {
        je.equals(c.uri, r2) && (l.dispose(), u.dispose(), a(c.uri));
      }), u = n2.onCancellationRequested(() => {
        l.dispose(), u.dispose(), o2(Yt);
      });
    });
  }
  awaitBuilderState(e, r2) {
    return this.currentState >= e ? Promise.resolve() : r2.isCancellationRequested ? Promise.reject(Yt) : new Promise((n2, i) => {
      let a = this.onBuildPhase(e, () => {
        a.dispose(), o2.dispose(), n2();
      }), o2 = r2.onCancellationRequested(() => {
        a.dispose(), o2.dispose(), i(Yt);
      });
    });
  }
  async notifyDocumentPhase(e, r2, n2) {
    let a = this.documentPhaseListeners.get(r2).slice();
    for (let o2 of a) try {
      await De2(n2), await o2(e, n2);
    } catch (l) {
      if (!Nr(l)) throw l;
    }
  }
  async notifyBuildPhase(e, r2, n2) {
    if (e.length === 0) return;
    let a = this.buildPhaseListeners.get(r2).slice();
    for (let o2 of a) await De2(n2), await o2(e, n2);
  }
  shouldLink(e) {
    return this.getBuildOptions(e).eagerLinking ?? true;
  }
  shouldValidate(e) {
    return !!this.getBuildOptions(e).validation;
  }
  async validate(e, r2) {
    let n2 = this.serviceRegistry.getServices(e.uri).validation.DocumentValidator, i = this.getBuildOptions(e), a = typeof i.validation == "object" ? { ...i.validation } : {};
    a.categories = this.findMissingValidationCategories(e, i);
    let o2 = await n2.validateDocument(e, a, r2);
    e.diagnostics ? e.diagnostics.push(...o2) : e.diagnostics = o2;
    let l = this.buildState.get(e.uri.toString());
    l && (l.result ?? (l.result = {}), l.result.validationChecks ? l.result.validationChecks = re(l.result.validationChecks).concat(a.categories).distinct().toArray() : l.result.validationChecks = [...a.categories]);
  }
  getBuildOptions(e) {
    var _a135;
    return ((_a135 = this.buildState.get(e.uri.toString())) == null ? void 0 : _a135.options) ?? {};
  }
}, m(_a109, "DefaultDocumentBuilder"), _a109);
var _a110;
var ko = (_a110 = class {
  constructor(e) {
    this.symbolIndex = /* @__PURE__ */ new Map(), this.symbolByTypeIndex = new mi(), this.referenceIndex = /* @__PURE__ */ new Map(), this.documents = e.workspace.LangiumDocuments, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection;
  }
  findAllReferences(e, r2) {
    let n2 = gt(e).uri, i = [];
    return this.referenceIndex.forEach((a) => {
      a.forEach((o2) => {
        je.equals(o2.targetUri, n2) && o2.targetPath === r2 && i.push(o2);
      });
    }), re(i);
  }
  allElements(e, r2) {
    let n2 = re(this.symbolIndex.keys());
    return r2 && (n2 = n2.filter((i) => !r2 || r2.has(i))), n2.map((i) => this.getFileDescriptions(i, e)).flat();
  }
  getFileDescriptions(e, r2) {
    return r2 ? this.symbolByTypeIndex.get(e, r2, () => (this.symbolIndex.get(e) ?? []).filter((a) => this.astReflection.isSubtype(a.type, r2))) : this.symbolIndex.get(e) ?? [];
  }
  remove(e) {
    this.removeContent(e), this.removeReferences(e);
  }
  removeContent(e) {
    let r2 = e.toString();
    this.symbolIndex.delete(r2), this.symbolByTypeIndex.clear(r2);
  }
  removeReferences(e) {
    let r2 = e.toString();
    this.referenceIndex.delete(r2);
  }
  async updateContent(e, r2 = W.CancellationToken.None) {
    let i = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.collectExportedSymbols(e, r2), a = e.uri.toString();
    this.symbolIndex.set(a, i), this.symbolByTypeIndex.clear(a);
  }
  async updateReferences(e, r2 = W.CancellationToken.None) {
    let i = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, r2);
    this.referenceIndex.set(e.uri.toString(), i);
  }
  isAffected(e, r2) {
    let n2 = this.referenceIndex.get(e.uri.toString());
    return n2 ? n2.some((i) => !i.local && r2.has(i.targetUri.toString())) : false;
  }
}, m(_a110, "DefaultIndexManager"), _a110);
var _a111;
var No = (_a111 = class {
  constructor(e) {
    this.initialBuildOptions = {}, this._ready = new It(), this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.WorkspaceLock;
  }
  get ready() {
    return this._ready.promise;
  }
  get workspaceFolders() {
    return this.folders;
  }
  initialize(e) {
    this.folders = e.workspaceFolders ?? void 0;
  }
  initialized(e) {
    return this.mutex.write((r2) => this.initializeWorkspace(this.folders ?? [], r2));
  }
  async initializeWorkspace(e, r2 = W.CancellationToken.None) {
    let n2 = await this.performStartup(e);
    await De2(r2), await this.documentBuilder.build(n2, this.initialBuildOptions, r2);
  }
  async performStartup(e) {
    let r2 = [], n2 = m((o2) => {
      r2.push(o2), this.langiumDocuments.hasDocument(o2.uri) || this.langiumDocuments.addDocument(o2);
    }, "collector");
    await this.loadAdditionalDocuments(e, n2);
    let i = [];
    await Promise.all(e.map((o2) => this.getRootFolder(o2)).map(async (o2) => this.traverseFolder(o2, i)));
    let a = re(i).distinct((o2) => o2.toString()).filter((o2) => !this.langiumDocuments.hasDocument(o2));
    return await this.loadWorkspaceDocuments(a, n2), this._ready.resolve(), r2;
  }
  async loadWorkspaceDocuments(e, r2) {
    await Promise.all(e.map(async (n2) => {
      let i = await this.langiumDocuments.getOrCreateDocument(n2);
      r2(i);
    }));
  }
  loadAdditionalDocuments(e, r2) {
    return Promise.resolve();
  }
  getRootFolder(e) {
    return tt.parse(e.uri);
  }
  async traverseFolder(e, r2) {
    try {
      let n2 = await this.fileSystemProvider.readDirectory(e);
      await Promise.all(n2.map(async (i) => {
        this.shouldIncludeEntry(i) && (i.isDirectory ? await this.traverseFolder(i.uri, r2) : i.isFile && r2.push(i.uri));
      }));
    } catch (n2) {
      console.error("Failure to read directory content of " + e.toString(true), n2);
    }
  }
  async searchFolder(e) {
    let r2 = [];
    return await this.traverseFolder(e, r2), r2;
  }
  shouldIncludeEntry(e) {
    let r2 = je.basename(e.uri);
    return r2.startsWith(".") ? false : e.isDirectory ? r2 !== "node_modules" && r2 !== "out" : e.isFile ? this.serviceRegistry.hasServices(e.uri) : false;
  }
}, m(_a111, "DefaultWorkspaceManager"), _a111);
var _a112;
var wo = (_a112 = class {
  buildUnexpectedCharactersMessage(e, r2, n2, i, a) {
    return Yi.buildUnexpectedCharactersMessage(e, r2, n2, i, a);
  }
  buildUnableToPopLexerModeMessage(e) {
    return Yi.buildUnableToPopLexerModeMessage(e);
  }
}, m(_a112, "DefaultLexerErrorMessageProvider"), _a112);
var rc = { mode: "full" };
var _a113;
var Ri2 = (_a113 = class {
  constructor(e) {
    this.errorMessageProvider = e.parser.LexerErrorMessageProvider, this.tokenBuilder = e.parser.TokenBuilder;
    let r2 = this.tokenBuilder.buildTokens(e.Grammar, { caseInsensitive: e.LanguageMetaData.caseInsensitive });
    this.tokenTypes = this.toTokenTypeDictionary(r2);
    let n2 = Dm(r2) ? Object.values(r2) : r2, i = e.LanguageMetaData.mode === "production";
    this.chevrotainLexer = new we(n2, { positionTracking: "full", skipValidations: i, errorMessageProvider: this.errorMessageProvider });
  }
  get definition() {
    return this.tokenTypes;
  }
  tokenize(e, r2 = rc) {
    var _a135, _b;
    let n2 = this.chevrotainLexer.tokenize(e);
    return { tokens: n2.tokens, errors: n2.errors, hidden: n2.groups.hidden ?? [], report: (_b = (_a135 = this.tokenBuilder).flushLexingReport) == null ? void 0 : _b.call(_a135, e) };
  }
  toTokenTypeDictionary(e) {
    if (Dm(e)) return e;
    let r2 = Mm(e) ? Object.values(e.modes).flat() : e, n2 = {};
    return r2.forEach((i) => n2[i.name] = i), n2;
  }
}, m(_a113, "DefaultLexer"), _a113);
function nc(t) {
  return Array.isArray(t) && (t.length === 0 || "name" in t[0]);
}
m(nc, "isTokenTypeArray");
function Mm(t) {
  return t && "modes" in t && "defaultMode" in t;
}
m(Mm, "isIMultiModeLexerDefinition");
function Dm(t) {
  return !nc(t) && !Mm(t);
}
m(Dm, "isTokenTypeDictionary");
ds();
function Um(t, e, r2) {
  let n2, i;
  typeof t == "string" ? (i = e, n2 = r2) : (i = t.range.start, n2 = e), i || (i = le.create(0, 0));
  let a = ex(t), o2 = qm(n2), l = uC({ lines: a, position: i, options: o2 });
  return mC({ index: 0, tokens: l, position: i });
}
m(Um, "parseJSDoc");
function zm(t, e) {
  let r2 = qm(e), n2 = ex(t);
  if (n2.length === 0) return false;
  let i = n2[0], a = n2[n2.length - 1], o2 = r2.start, l = r2.end;
  return !!(o2 == null ? void 0 : o2.exec(i)) && !!(l == null ? void 0 : l.exec(a));
}
m(zm, "isJSDoc");
function ex(t) {
  let e = "";
  return typeof t == "string" ? e = t : e = t.text, e.split(sf);
}
m(ex, "getLines");
var Z$ = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy;
var lC = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function uC(t) {
  var _a135, _b, _c2;
  let e = [], r2 = t.position.line, n2 = t.position.character;
  for (let i = 0; i < t.lines.length; i++) {
    let a = i === 0, o2 = i === t.lines.length - 1, l = t.lines[i], u = 0;
    if (a && t.options.start) {
      let d = (_a135 = t.options.start) == null ? void 0 : _a135.exec(l);
      d && (u = d.index + d[0].length);
    } else {
      let d = (_b = t.options.line) == null ? void 0 : _b.exec(l);
      d && (u = d.index + d[0].length);
    }
    if (o2) {
      let d = (_c2 = t.options.end) == null ? void 0 : _c2.exec(l);
      d && (l = l.substring(0, d.index));
    }
    if (l = l.substring(0, pC(l)), Gm(l, u) >= l.length) {
      if (e.length > 0) {
        let d = le.create(r2, n2);
        e.push({ type: "break", content: "", range: ie.create(d, d) });
      }
    } else {
      Z$.lastIndex = u;
      let d = Z$.exec(l);
      if (d) {
        let m3 = d[0], h2 = d[1], y = le.create(r2, n2 + u), k = le.create(r2, n2 + u + m3.length);
        e.push({ type: "tag", content: h2, range: ie.create(y, k) }), u += m3.length, u = Gm(l, u);
      }
      if (u < l.length) {
        let m3 = l.substring(u), h2 = Array.from(m3.matchAll(lC));
        e.push(...cC(h2, m3, r2, n2 + u));
      }
    }
    r2++, n2 = 0;
  }
  return e.length > 0 && e[e.length - 1].type === "break" ? e.slice(0, -1) : e;
}
m(uC, "tokenize");
function cC(t, e, r2, n2) {
  let i = [];
  if (t.length === 0) {
    let a = le.create(r2, n2), o2 = le.create(r2, n2 + e.length);
    i.push({ type: "text", content: e, range: ie.create(a, o2) });
  } else {
    let a = 0;
    for (let l of t) {
      let u = l.index, c = e.substring(a, u);
      c.length > 0 && i.push({ type: "text", content: e.substring(a, u), range: ie.create(le.create(r2, a + n2), le.create(r2, u + n2)) });
      let d = c.length + 1, m3 = l[1];
      if (i.push({ type: "inline-tag", content: m3, range: ie.create(le.create(r2, a + d + n2), le.create(r2, a + d + m3.length + n2)) }), d += m3.length, l.length === 4) {
        d += l[2].length;
        let h2 = l[3];
        i.push({ type: "text", content: h2, range: ie.create(le.create(r2, a + d + n2), le.create(r2, a + d + h2.length + n2)) });
      } else i.push({ type: "text", content: "", range: ie.create(le.create(r2, a + d + n2), le.create(r2, a + d + n2)) });
      a = u + l[0].length;
    }
    let o2 = e.substring(a);
    o2.length > 0 && i.push({ type: "text", content: o2, range: ie.create(le.create(r2, a + n2), le.create(r2, a + n2 + o2.length)) });
  }
  return i;
}
m(cC, "buildInlineTokens");
var fC = /\S/;
var dC = /\s*$/;
function Gm(t, e) {
  let r2 = t.substring(e).match(fC);
  return r2 ? e + r2.index : t.length;
}
m(Gm, "skipWhitespace");
function pC(t) {
  let e = t.match(dC);
  if (e && typeof e.index == "number") return e.index;
}
m(pC, "lastCharacter");
function mC(t) {
  var _a135, _b;
  let e = le.create(t.position.line, t.position.character);
  if (t.tokens.length === 0) return new ic([], ie.create(e, e));
  let r2 = [];
  for (; t.index < t.tokens.length; ) {
    let a = hC(t, r2[r2.length - 1]);
    a && r2.push(a);
  }
  let n2 = ((_a135 = r2[0]) == null ? void 0 : _a135.range.start) ?? e, i = ((_b = r2[r2.length - 1]) == null ? void 0 : _b.range.end) ?? e;
  return new ic(r2, ie.create(n2, i));
}
m(mC, "parseJSDocComment");
function hC(t, e) {
  let r2 = t.tokens[t.index];
  if (r2.type === "tag") return rx(t, false);
  if (r2.type === "text" || r2.type === "inline-tag") return tx(t);
  gC(r2, e), t.index++;
}
m(hC, "parseJSDocElement");
function gC(t, e) {
  if (e) {
    let r2 = new sc("", t.range);
    "inlines" in e ? e.inlines.push(r2) : e.content.inlines.push(r2);
  }
}
m(gC, "appendEmptyLine");
function tx(t) {
  let e = t.tokens[t.index], r2 = e, n2 = e, i = [];
  for (; e && e.type !== "break" && e.type !== "tag"; ) i.push(yC(t)), n2 = e, e = t.tokens[t.index];
  return new bo(i, ie.create(r2.range.start, n2.range.end));
}
m(tx, "parseJSDocText");
function yC(t) {
  return t.tokens[t.index].type === "inline-tag" ? rx(t, true) : nx(t);
}
m(yC, "parseJSDocInline");
function rx(t, e) {
  var _a135;
  let r2 = t.tokens[t.index++], n2 = r2.content.substring(1);
  if (((_a135 = t.tokens[t.index]) == null ? void 0 : _a135.type) === "text") if (e) {
    let a = nx(t);
    return new Io(n2, new bo([a], a.range), e, ie.create(r2.range.start, a.range.end));
  } else {
    let a = tx(t);
    return new Io(n2, a, e, ie.create(r2.range.start, a.range.end));
  }
  else {
    let a = r2.range;
    return new Io(n2, new bo([], a), e, a);
  }
}
m(rx, "parseJSDocTag");
function nx(t) {
  let e = t.tokens[t.index++];
  return new sc(e.content, e.range);
}
m(nx, "parseJSDocLine");
function qm(t) {
  if (!t) return qm({ start: "/**", end: "*/", line: "*" });
  let { start: e, end: r2, line: n2 } = t;
  return { start: Fm(e, true), end: Fm(r2, false), line: Fm(n2, true) };
}
m(qm, "normalizeOptions");
function Fm(t, e) {
  if (typeof t == "string" || typeof t == "object") {
    let r2 = typeof t == "string" ? gn(t) : t.source;
    return e ? new RegExp(`^\\s*${r2}`) : new RegExp(`\\s*${r2}\\s*$`);
  } else return t;
}
m(Fm, "normalizeOption");
var _a114;
var ic = (_a114 = class {
  constructor(e, r2) {
    this.elements = e, this.range = r2;
  }
  getTag(e) {
    return this.getAllTags().find((r2) => r2.name === e);
  }
  getTags(e) {
    return this.getAllTags().filter((r2) => r2.name === e);
  }
  getAllTags() {
    return this.elements.filter((e) => "name" in e);
  }
  toString() {
    let e = "";
    for (let r2 of this.elements) if (e.length === 0) e = r2.toString();
    else {
      let n2 = r2.toString();
      e += Q$(e) + n2;
    }
    return e.trim();
  }
  toMarkdown(e) {
    let r2 = "";
    for (let n2 of this.elements) if (r2.length === 0) r2 = n2.toMarkdown(e);
    else {
      let i = n2.toMarkdown(e);
      r2 += Q$(r2) + i;
    }
    return r2.trim();
  }
}, m(_a114, "JSDocCommentImpl"), _a114);
var _a115;
var Io = (_a115 = class {
  constructor(e, r2, n2, i) {
    this.name = e, this.content = r2, this.inline = n2, this.range = i;
  }
  toString() {
    let e = `@${this.name}`, r2 = this.content.toString();
    return this.content.inlines.length === 1 ? e = `${e} ${r2}` : this.content.inlines.length > 1 && (e = `${e}
${r2}`), this.inline ? `{${e}}` : e;
  }
  toMarkdown(e) {
    var _a135;
    return ((_a135 = e == null ? void 0 : e.renderTag) == null ? void 0 : _a135.call(e, this)) ?? this.toMarkdownDefault(e);
  }
  toMarkdownDefault(e) {
    let r2 = this.content.toMarkdown(e);
    if (this.inline) {
      let a = TC(this.name, r2, e ?? {});
      if (typeof a == "string") return a;
    }
    let n2 = "";
    (e == null ? void 0 : e.tag) === "italic" || (e == null ? void 0 : e.tag) === void 0 ? n2 = "*" : (e == null ? void 0 : e.tag) === "bold" ? n2 = "**" : (e == null ? void 0 : e.tag) === "bold-italic" && (n2 = "***");
    let i = `${n2}@${this.name}${n2}`;
    return this.content.inlines.length === 1 ? i = `${i} — ${r2}` : this.content.inlines.length > 1 && (i = `${i}
${r2}`), this.inline ? `{${i}}` : i;
  }
}, m(_a115, "JSDocTagImpl"), _a115);
function TC(t, e, r2) {
  var _a135;
  if (t === "linkplain" || t === "linkcode" || t === "link") {
    let n2 = e.indexOf(" "), i = e;
    if (n2 > 0) {
      let o2 = Gm(e, n2);
      i = e.substring(o2), e = e.substring(0, n2);
    }
    return (t === "linkcode" || t === "link" && r2.link === "code") && (i = `\`${i}\``), ((_a135 = r2.renderLink) == null ? void 0 : _a135.call(r2, e, i)) ?? RC(e, i);
  }
}
m(TC, "renderInlineTag");
function RC(t, e) {
  try {
    return tt.parse(t, true), `[${e}](${t})`;
  } catch {
    return t;
  }
}
m(RC, "renderLinkDefault");
var _a116;
var bo = (_a116 = class {
  constructor(e, r2) {
    this.inlines = e, this.range = r2;
  }
  toString() {
    let e = "";
    for (let r2 = 0; r2 < this.inlines.length; r2++) {
      let n2 = this.inlines[r2], i = this.inlines[r2 + 1];
      e += n2.toString(), i && i.range.start.line > n2.range.start.line && (e += `
`);
    }
    return e;
  }
  toMarkdown(e) {
    let r2 = "";
    for (let n2 = 0; n2 < this.inlines.length; n2++) {
      let i = this.inlines[n2], a = this.inlines[n2 + 1];
      r2 += i.toMarkdown(e), a && a.range.start.line > i.range.start.line && (r2 += `
`);
    }
    return r2;
  }
}, m(_a116, "JSDocTextImpl"), _a116);
var _a117;
var sc = (_a117 = class {
  constructor(e, r2) {
    this.text = e, this.range = r2;
  }
  toString() {
    return this.text;
  }
  toMarkdown() {
    return this.text;
  }
}, m(_a117, "JSDocLineImpl"), _a117);
function Q$(t) {
  return t.endsWith(`
`) ? `
` : `

`;
}
m(Q$, "fillNewlines");
var _a118;
var _o = (_a118 = class {
  constructor(e) {
    this.indexManager = e.shared.workspace.IndexManager, this.commentProvider = e.documentation.CommentProvider;
  }
  getDocumentation(e) {
    let r2 = this.commentProvider.getComment(e);
    if (r2 && zm(r2)) return Um(r2).toMarkdown({ renderLink: m((i, a) => this.documentationLinkRenderer(e, i, a), "renderLink"), renderTag: m((i) => this.documentationTagRenderer(e, i), "renderTag") });
  }
  documentationLinkRenderer(e, r2, n2) {
    let i = this.findNameInLocalSymbols(e, r2) ?? this.findNameInGlobalScope(e, r2);
    if (i && i.nameSegment) {
      let a = i.nameSegment.range.start.line + 1, o2 = i.nameSegment.range.start.character + 1, l = i.documentUri.with({ fragment: `L${a},${o2}` });
      return `[${n2}](${l.toString()})`;
    } else return;
  }
  documentationTagRenderer(e, r2) {
  }
  findNameInLocalSymbols(e, r2) {
    let i = gt(e).localSymbols;
    if (!i) return;
    let a = e;
    do {
      let l = i.getStream(a).find((u) => u.name === r2);
      if (l) return l;
      a = a.$container;
    } while (a);
  }
  findNameInGlobalScope(e, r2) {
    return this.indexManager.allElements().find((i) => i.name === r2);
  }
}, m(_a118, "JSDocDocumentationProvider"), _a118);
var _a119;
var Po = (_a119 = class {
  constructor(e) {
    this.grammarConfig = () => e.parser.GrammarConfig;
  }
  getComment(e) {
    var _a135;
    return gp(e) ? e.$comment : (_a135 = Qc(e.$cstNode, this.grammarConfig().multilineCommentRules)) == null ? void 0 : _a135.text;
  }
}, m(_a119, "DefaultCommentProvider"), _a119);
var _a120;
var Oo = (_a120 = class {
  constructor(e) {
    this.syncParser = e.parser.LangiumParser;
  }
  parse(e, r2) {
    return Promise.resolve(this.syncParser.parse(e));
  }
}, m(_a120, "DefaultAsyncParser"), _a120);
var _a121;
var jm = (_a121 = class {
  constructor(e) {
    this.threadCount = 8, this.terminationDelay = 200, this.workerPool = [], this.queue = [], this.hydrator = e.serializer.Hydrator;
  }
  initializeWorkers() {
    for (; this.workerPool.length < this.threadCount; ) {
      let e = this.createWorker();
      e.onReady(() => {
        if (this.queue.length > 0) {
          let r2 = this.queue.shift();
          r2 && (e.lock(), r2.resolve(e));
        }
      }), this.workerPool.push(e);
    }
  }
  async parse(e, r2) {
    let n2 = await this.acquireParserWorker(r2), i = new It(), a, o2 = r2.onCancellationRequested(() => {
      a = setTimeout(() => {
        this.terminateWorker(n2);
      }, this.terminationDelay);
    });
    return n2.parse(e).then((l) => {
      let u = this.hydrator.hydrate(l);
      i.resolve(u);
    }).catch((l) => {
      i.reject(l);
    }).finally(() => {
      o2.dispose(), clearTimeout(a);
    }), i.promise;
  }
  terminateWorker(e) {
    e.terminate();
    let r2 = this.workerPool.indexOf(e);
    r2 >= 0 && this.workerPool.splice(r2, 1);
  }
  async acquireParserWorker(e) {
    this.initializeWorkers();
    for (let n2 of this.workerPool) if (n2.ready) return n2.lock(), n2;
    let r2 = new It();
    return e.onCancellationRequested(() => {
      let n2 = this.queue.indexOf(r2);
      n2 >= 0 && this.queue.splice(n2, 1), r2.reject(Yt);
    }), this.queue.push(r2), r2.promise;
  }
}, m(_a121, "AbstractThreadedAsyncParser"), _a121);
var _a122;
var Bm = (_a122 = class {
  get ready() {
    return this._ready;
  }
  get onReady() {
    return this.onReadyEmitter.event;
  }
  constructor(e, r2, n2, i) {
    this.onReadyEmitter = new Se.Emitter(), this.deferred = new It(), this._ready = true, this._parsing = false, this.sendMessage = e, this._terminate = i, r2((a) => {
      let o2 = a;
      this.deferred.resolve(o2), this.unlock();
    }), n2((a) => {
      this.deferred.reject(a), this.unlock();
    });
  }
  terminate() {
    this.deferred.reject(Yt), this._terminate();
  }
  lock() {
    this._ready = false;
  }
  unlock() {
    this._parsing = false, this._ready = true, this.onReadyEmitter.fire();
  }
  parse(e) {
    if (this._parsing) throw new Error("Parser worker is busy");
    return this._parsing = true, this.deferred = new It(), this.sendMessage(e), this.deferred.promise;
  }
}, m(_a122, "ParserWorker"), _a122);
var _a123;
var Lo = (_a123 = class {
  constructor() {
    this.previousTokenSource = new W.CancellationTokenSource(), this.writeQueue = [], this.readQueue = [], this.done = true;
  }
  write(e) {
    this.cancelWrite();
    let r2 = $u();
    return this.previousTokenSource = r2, this.enqueue(this.writeQueue, e, r2.token);
  }
  read(e) {
    return this.enqueue(this.readQueue, e);
  }
  enqueue(e, r2, n2 = W.CancellationToken.None) {
    let i = new It(), a = { action: r2, deferred: i, cancellationToken: n2 };
    return e.push(a), this.performNextOperation(), i.promise;
  }
  async performNextOperation() {
    if (!this.done) return;
    let e = [];
    if (this.writeQueue.length > 0) e.push(this.writeQueue.shift());
    else if (this.readQueue.length > 0) e.push(...this.readQueue.splice(0, this.readQueue.length));
    else return;
    this.done = false, await Promise.all(e.map(async ({ action: r2, deferred: n2, cancellationToken: i }) => {
      try {
        let a = await Promise.resolve().then(() => r2(i));
        n2.resolve(a);
      } catch (a) {
        Nr(a) ? n2.resolve(void 0) : n2.reject(a);
      }
    })), this.done = true, this.performNextOperation();
  }
  cancelWrite() {
    this.previousTokenSource.cancel();
  }
}, m(_a123, "DefaultWorkspaceLock"), _a123);
var _a124;
var Do = (_a124 = class {
  constructor(e) {
    this.grammarElementIdMap = new pi(), this.tokenTypeIdMap = new pi(), this.grammar = e.Grammar, this.lexer = e.parser.Lexer, this.linker = e.references.Linker;
  }
  dehydrate(e) {
    return { lexerErrors: e.lexerErrors, lexerReport: e.lexerReport ? this.dehydrateLexerReport(e.lexerReport) : void 0, parserErrors: e.parserErrors.map((r2) => ({ ...r2, message: r2.message })), value: this.dehydrateAstNode(e.value, this.createDehyrationContext(e.value)) };
  }
  dehydrateLexerReport(e) {
    return e;
  }
  createDehyrationContext(e) {
    let r2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Map();
    for (let i of Ct(e)) r2.set(i, {});
    if (e.$cstNode) for (let i of Vn(e.$cstNode)) n2.set(i, {});
    return { astNodes: r2, cstNodes: n2 };
  }
  dehydrateAstNode(e, r2) {
    let n2 = r2.astNodes.get(e);
    n2.$type = e.$type, n2.$containerIndex = e.$containerIndex, n2.$containerProperty = e.$containerProperty, e.$cstNode !== void 0 && (n2.$cstNode = this.dehydrateCstNode(e.$cstNode, r2));
    for (let [i, a] of Object.entries(e)) if (!i.startsWith("$")) if (Array.isArray(a)) {
      let o2 = [];
      n2[i] = o2;
      for (let l of a) Le(l) ? o2.push(this.dehydrateAstNode(l, r2)) : Qe(l) ? o2.push(this.dehydrateReference(l, r2)) : o2.push(l);
    } else Le(a) ? n2[i] = this.dehydrateAstNode(a, r2) : Qe(a) ? n2[i] = this.dehydrateReference(a, r2) : a !== void 0 && (n2[i] = a);
    return n2;
  }
  dehydrateReference(e, r2) {
    let n2 = {};
    return n2.$refText = e.$refText, e.$refNode && (n2.$refNode = r2.cstNodes.get(e.$refNode)), n2;
  }
  dehydrateCstNode(e, r2) {
    let n2 = r2.cstNodes.get(e);
    return Zs(e) ? n2.fullText = e.fullText : n2.grammarSource = this.getGrammarElementId(e.grammarSource), n2.hidden = e.hidden, n2.astNode = r2.astNodes.get(e.astNode), sr(e) ? n2.content = e.content.map((i) => this.dehydrateCstNode(i, r2)) : an(e) && (n2.tokenType = e.tokenType.name, n2.offset = e.offset, n2.length = e.length, n2.startLine = e.range.start.line, n2.startColumn = e.range.start.character, n2.endLine = e.range.end.line, n2.endColumn = e.range.end.character), n2;
  }
  hydrate(e) {
    let r2 = e.value, n2 = this.createHydrationContext(r2);
    return "$cstNode" in r2 && this.hydrateCstNode(r2.$cstNode, n2), { lexerErrors: e.lexerErrors, lexerReport: e.lexerReport, parserErrors: e.parserErrors, value: this.hydrateAstNode(r2, n2) };
  }
  createHydrationContext(e) {
    let r2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Map();
    for (let a of Ct(e)) r2.set(a, {});
    let i;
    if (e.$cstNode) for (let a of Vn(e.$cstNode)) {
      let o2;
      "fullText" in a ? (o2 = new ps(a.fullText), i = o2) : "content" in a ? o2 = new li() : "tokenType" in a && (o2 = this.hydrateCstLeafNode(a)), o2 && (n2.set(a, o2), o2.root = i);
    }
    return { astNodes: r2, cstNodes: n2 };
  }
  hydrateAstNode(e, r2) {
    let n2 = r2.astNodes.get(e);
    n2.$type = e.$type, n2.$containerIndex = e.$containerIndex, n2.$containerProperty = e.$containerProperty, e.$cstNode && (n2.$cstNode = r2.cstNodes.get(e.$cstNode));
    for (let [i, a] of Object.entries(e)) if (!i.startsWith("$")) if (Array.isArray(a)) {
      let o2 = [];
      n2[i] = o2;
      for (let l of a) Le(l) ? o2.push(this.setParent(this.hydrateAstNode(l, r2), n2)) : Qe(l) ? o2.push(this.hydrateReference(l, n2, i, r2)) : o2.push(l);
    } else Le(a) ? n2[i] = this.setParent(this.hydrateAstNode(a, r2), n2) : Qe(a) ? n2[i] = this.hydrateReference(a, n2, i, r2) : a !== void 0 && (n2[i] = a);
    return n2;
  }
  setParent(e, r2) {
    return e.$container = r2, e;
  }
  hydrateReference(e, r2, n2, i) {
    return this.linker.buildReference(r2, n2, i.cstNodes.get(e.$refNode), e.$refText);
  }
  hydrateCstNode(e, r2, n2 = 0) {
    let i = r2.cstNodes.get(e);
    if (typeof e.grammarSource == "number" && (i.grammarSource = this.getGrammarElement(e.grammarSource)), i.astNode = r2.astNodes.get(e.astNode), sr(i)) for (let a of e.content) {
      let o2 = this.hydrateCstNode(a, r2, n2++);
      i.content.push(o2);
    }
    return i;
  }
  hydrateCstLeafNode(e) {
    let r2 = this.getTokenType(e.tokenType), n2 = e.offset, i = e.length, a = e.startLine, o2 = e.startColumn, l = e.endLine, u = e.endColumn, c = e.hidden;
    return new oi(n2, i, { start: { line: a, character: o2 }, end: { line: l, character: u } }, r2, c);
  }
  getTokenType(e) {
    return this.lexer.definition[e];
  }
  getGrammarElementId(e) {
    if (e) return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.get(e);
  }
  getGrammarElement(e) {
    return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.getKey(e);
  }
  createGrammarElementIdMap() {
    let e = 0;
    for (let r2 of Ct(this.grammar)) la(r2) && this.grammarElementIdMap.set(r2, e++);
  }
}, m(_a124, "DefaultHydrator"), _a124);
function Wm(t) {
  return { documentation: { CommentProvider: m((e) => new Po(e), "CommentProvider"), DocumentationProvider: m((e) => new _o(e), "DocumentationProvider") }, parser: { AsyncParser: m((e) => new Oo(e), "AsyncParser"), GrammarConfig: m((e) => Rf(e), "GrammarConfig"), LangiumParser: m((e) => ap(e), "LangiumParser"), CompletionParser: m((e) => sp(e), "CompletionParser"), ValueConverter: m(() => new ci(), "ValueConverter"), TokenBuilder: m(() => new Zr2(), "TokenBuilder"), Lexer: m((e) => new Ri2(e), "Lexer"), ParserErrorMessageProvider: m(() => new ms(), "ParserErrorMessageProvider"), LexerErrorMessageProvider: m(() => new wo(), "LexerErrorMessageProvider") }, workspace: { AstNodeLocator: m(() => new ho(), "AstNodeLocator"), AstNodeDescriptionProvider: m((e) => new po(e), "AstNodeDescriptionProvider"), ReferenceDescriptionProvider: m((e) => new mo(e), "ReferenceDescriptionProvider") }, references: { Linker: m((e) => new to(e), "Linker"), NameProvider: m(() => new ro(), "NameProvider"), ScopeProvider: m((e) => new oo(e), "ScopeProvider"), ScopeComputation: m((e) => new io(e), "ScopeComputation"), References: m((e) => new no(e), "References") }, serializer: { Hydrator: m((e) => new Do(e), "Hydrator"), JsonSerializer: m((e) => new lo(e), "JsonSerializer") }, validation: { DocumentValidator: m((e) => new fo(e), "DocumentValidator"), ValidationRegistry: m((e) => new co(e), "ValidationRegistry") }, shared: m(() => t.shared, "shared") };
}
m(Wm, "createDefaultCoreModule");
function Km(t) {
  return { ServiceRegistry: m((e) => new uo(e), "ServiceRegistry"), workspace: { LangiumDocuments: m((e) => new eo(e), "LangiumDocuments"), LangiumDocumentFactory: m((e) => new Qa(e), "LangiumDocumentFactory"), DocumentBuilder: m((e) => new So(e), "DocumentBuilder"), IndexManager: m((e) => new ko(e), "IndexManager"), WorkspaceManager: m((e) => new No(e), "WorkspaceManager"), FileSystemProvider: m((e) => t.fileSystemProvider(e), "FileSystemProvider"), WorkspaceLock: m(() => new Lo(), "WorkspaceLock"), ConfigurationProvider: m((e) => new go(e), "ConfigurationProvider") }, profilers: {} };
}
m(Km, "createDefaultSharedCoreModule");
var Vm;
(function(t) {
  t.merge = (e, r2) => Mo(Mo({}, e), r2);
})(Vm || (Vm = {}));
function ac(t, e, r2, n2, i, a, o2, l, u) {
  let c = [t, e, r2, n2, i, a, o2, l, u].reduce(Mo, {});
  return lx(c);
}
m(ac, "inject");
var ax = Symbol("isProxy");
function ox(t) {
  if (t && t[ax]) for (let e of Object.values(t)) ox(e);
  return t;
}
m(ox, "eagerLoad");
function lx(t, e) {
  let r2 = new Proxy({}, { deleteProperty: m(() => false, "deleteProperty"), set: m(() => {
    throw new Error("Cannot set property on injected service container");
  }, "set"), get: m((n2, i) => i === ax ? true : sx(n2, i, t, e || r2), "get"), getOwnPropertyDescriptor: m((n2, i) => (sx(n2, i, t, e || r2), Object.getOwnPropertyDescriptor(n2, i)), "getOwnPropertyDescriptor"), has: m((n2, i) => i in t, "has"), ownKeys: m(() => [...Object.getOwnPropertyNames(t)], "ownKeys") });
  return r2;
}
m(lx, "_inject");
var ix = Symbol();
function sx(t, e, r2, n2) {
  if (e in t) {
    if (t[e] instanceof Error) throw new Error("Construction failure. Please make sure that your dependencies are constructable. Cause: " + t[e]);
    if (t[e] === ix) throw new Error('Cycle detected. Please make "' + String(e) + '" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');
    return t[e];
  } else if (e in r2) {
    let i = r2[e];
    t[e] = ix;
    try {
      t[e] = typeof i == "function" ? i(n2) : lx(i, n2);
    } catch (a) {
      throw t[e] = a instanceof Error ? a : void 0, a;
    }
    return t[e];
  } else return;
}
m(sx, "_resolve");
function Mo(t, e) {
  if (e) {
    for (let [r2, n2] of Object.entries(e)) if (n2 != null) if (typeof n2 == "object") {
      let i = t[r2];
      typeof i == "object" && i !== null ? t[r2] = Mo(i, n2) : t[r2] = Mo({}, n2);
    } else t[r2] = n2;
  }
  return t;
}
m(Mo, "_merge");
var Hm = { indentTokenName: "INDENT", dedentTokenName: "DEDENT", whitespaceTokenName: "WS", ignoreIndentationDelimiters: [] };
var $i;
(function(t) {
  t.REGULAR = "indentation-sensitive", t.IGNORE_INDENTATION = "ignore-indentation";
})($i || ($i = {}));
var _a125;
var oc = (_a125 = class extends Zr2 {
  constructor(e = Hm) {
    super(), this.indentationStack = [0], this.whitespaceRegExp = /[ \t]+/y, this.options = { ...Hm, ...e }, this.indentTokenType = Tn({ name: this.options.indentTokenName, pattern: this.indentMatcher.bind(this), line_breaks: false }), this.dedentTokenType = Tn({ name: this.options.dedentTokenName, pattern: this.dedentMatcher.bind(this), line_breaks: false });
  }
  buildTokens(e, r2) {
    let n2 = super.buildTokens(e, r2);
    if (!nc(n2)) throw new Error("Invalid tokens built by default builder");
    let { indentTokenName: i, dedentTokenName: a, whitespaceTokenName: o2, ignoreIndentationDelimiters: l } = this.options, u, c, d, m3 = [];
    for (let h2 of n2) {
      for (let [y, k] of l) h2.name === y ? h2.PUSH_MODE = $i.IGNORE_INDENTATION : h2.name === k && (h2.POP_MODE = true);
      h2.name === a ? u = h2 : h2.name === i ? c = h2 : h2.name === o2 ? d = h2 : m3.push(h2);
    }
    if (!u || !c || !d) throw new Error("Some indentation/whitespace tokens not found!");
    return l.length > 0 ? { modes: { [$i.REGULAR]: [u, c, ...m3, d], [$i.IGNORE_INDENTATION]: [...m3, d] }, defaultMode: $i.REGULAR } : [u, c, d, ...m3];
  }
  flushLexingReport(e) {
    return { ...super.flushLexingReport(e), remainingDedents: this.flushRemainingDedents(e) };
  }
  isStartOfLine(e, r2) {
    return r2 === 0 || `\r
`.includes(e[r2 - 1]);
  }
  matchWhitespace(e, r2, n2, i) {
    this.whitespaceRegExp.lastIndex = r2;
    let a = this.whitespaceRegExp.exec(e);
    return { currIndentLevel: (a == null ? void 0 : a[0].length) ?? 0, prevIndentLevel: this.indentationStack.at(-1), match: a };
  }
  createIndentationTokenInstance(e, r2, n2, i) {
    let a = this.getLineNumber(r2, i);
    return Hr(e, n2, i, i + n2.length, a, a, 1, n2.length);
  }
  getLineNumber(e, r2) {
    return e.substring(0, r2).split(/\r\n|\r|\n/).length;
  }
  indentMatcher(e, r2, n2, i) {
    if (!this.isStartOfLine(e, r2)) return null;
    let { currIndentLevel: a, prevIndentLevel: o2, match: l } = this.matchWhitespace(e, r2, n2, i);
    return a <= o2 ? null : (this.indentationStack.push(a), l);
  }
  dedentMatcher(e, r2, n2, i) {
    var _a135, _b;
    if (!this.isStartOfLine(e, r2)) return null;
    let { currIndentLevel: a, prevIndentLevel: o2, match: l } = this.matchWhitespace(e, r2, n2, i);
    if (a >= o2) return null;
    let u = this.indentationStack.lastIndexOf(a);
    if (u === -1) return this.diagnostics.push({ severity: "error", message: `Invalid dedent level ${a} at offset: ${r2}. Current indentation stack: ${this.indentationStack}`, offset: r2, length: ((_a135 = l == null ? void 0 : l[0]) == null ? void 0 : _a135.length) ?? 0, line: this.getLineNumber(e, r2), column: 1 }), null;
    let c = this.indentationStack.length - u - 1, d = ((_b = e.substring(0, r2).match(/[\r\n]+$/)) == null ? void 0 : _b[0].length) ?? 1;
    for (let m3 = 0; m3 < c; m3++) {
      let h2 = this.createIndentationTokenInstance(this.dedentTokenType, e, "", r2 - (d - 1));
      n2.push(h2), this.indentationStack.pop();
    }
    return null;
  }
  buildTerminalToken(e) {
    let r2 = super.buildTerminalToken(e), { indentTokenName: n2, dedentTokenName: i, whitespaceTokenName: a } = this.options;
    return r2.name === n2 ? this.indentTokenType : r2.name === i ? this.dedentTokenType : r2.name === a ? Tn({ name: a, pattern: this.whitespaceRegExp, group: we.SKIPPED }) : r2;
  }
  flushRemainingDedents(e) {
    let r2 = [];
    for (; this.indentationStack.length > 1; ) r2.push(this.createIndentationTokenInstance(this.dedentTokenType, e, "", e.length)), this.indentationStack.pop();
    return this.indentationStack = [0], r2;
  }
}, m(_a125, "IndentationAwareTokenBuilder"), _a125);
var _a126;
var Ym = (_a126 = class extends Ri2 {
  constructor(e) {
    if (super(e), e.parser.TokenBuilder instanceof oc) this.indentationTokenBuilder = e.parser.TokenBuilder;
    else throw new Error("IndentationAwareLexer requires an accompanying IndentationAwareTokenBuilder");
  }
  tokenize(e, r2 = rc) {
    let n2 = super.tokenize(e), i = n2.report;
    (r2 == null ? void 0 : r2.mode) === "full" && n2.tokens.push(...i.remainingDedents), i.remainingDedents = [];
    let { indentTokenType: a, dedentTokenType: o2 } = this.indentationTokenBuilder, l = a.tokenTypeIdx, u = o2.tokenTypeIdx, c = [], d = n2.tokens.length - 1;
    for (let m3 = 0; m3 < d; m3++) {
      let h2 = n2.tokens[m3], y = n2.tokens[m3 + 1];
      if (h2.tokenTypeIdx === l && y.tokenTypeIdx === u) {
        m3++;
        continue;
      }
      c.push(h2);
    }
    return d >= 0 && c.push(n2.tokens[d]), n2.tokens = c, n2;
  }
}, m(_a126, "IndentationAwareLexer"), _a126);
var ue = {};
p(ue, { AstUtils: () => Ho, BiMap: () => pi, Cancellation: () => W, ContextCache: () => mi, CstUtils: () => ml, DONE_RESULT: () => ht, Deferred: () => It, Disposable: () => bn, DisposableCache: () => vs, DocumentCache: () => vu, EMPTY_STREAM: () => on, ErrorWithLocation: () => Yn, GrammarUtils: () => $l, MultiMap: () => Tt, OperationCancelled: () => Yt, Reduction: () => Ni, RegExpUtils: () => yl, SimpleCache: () => ao, StreamImpl: () => zt, TreeStreamImpl: () => Rr, URI: () => tt, UriTrie: () => $s, UriUtils: () => je, WorkspaceCache: () => Es, assertCondition: () => bh, assertUnreachable: () => vr, delayNextTick: () => pp, interruptAndCheck: () => De2, isOperationCancelled: () => Nr, loadGrammarFromJson: () => Qt, setInterruptionPeriod: () => Ry, startCancelableOperation: () => $u, stream: () => re });
q(ue, Se);
var _a127;
var lc = (_a127 = class {
  stat(e) {
    throw new Error("No file system is available.");
  }
  statSync(e) {
    throw new Error("No file system is available.");
  }
  async exists() {
    return false;
  }
  existsSync() {
    return false;
  }
  readBinary() {
    throw new Error("No file system is available.");
  }
  readBinarySync() {
    throw new Error("No file system is available.");
  }
  readFile() {
    throw new Error("No file system is available.");
  }
  readFileSync() {
    throw new Error("No file system is available.");
  }
  async readDirectory() {
    return [];
  }
  readDirectorySync() {
    return [];
  }
}, m(_a127, "EmptyFileSystemProvider"), _a127);
var Xm = { fileSystemProvider: m(() => new lc(), "fileSystemProvider") };
var $C = { Grammar: m(() => {
}, "Grammar"), LanguageMetaData: m(() => ({ caseInsensitive: false, fileExtensions: [".langium"], languageId: "langium" }), "LanguageMetaData") };
var xC = { AstReflection: m(() => new Fi(), "AstReflection") };
function vC() {
  let t = ac(Km(Xm), xC), e = ac(Wm({ shared: t }), $C);
  return t.ServiceRegistry.register(e), e;
}
m(vC, "createMinimalGrammarServices");
function Qt(t) {
  let e = vC(), r2 = e.serializer.JsonSerializer.deserialize(t);
  return e.shared.workspace.LangiumDocumentFactory.fromModel(r2, tt.parse(`memory:/${r2.name ?? "grammar"}.langium`)), r2;
}
m(Qt, "loadGrammarFromJson");
q(Ue, ue);
var _a128;
var Jm = (_a128 = class {
  constructor(e) {
    this.activeCategories = /* @__PURE__ */ new Set(), this.allCategories = /* @__PURE__ */ new Set(["validating", "parsing", "linking"]), this.activeCategories = e ?? new Set(this.allCategories), this.records = new Tt();
  }
  isActive(e) {
    return this.activeCategories.has(e);
  }
  start(...e) {
    e ? e.forEach((r2) => this.activeCategories.add(r2)) : this.activeCategories = new Set(this.allCategories);
  }
  stop(...e) {
    e ? e.forEach((r2) => this.activeCategories.delete(r2)) : this.activeCategories.clear();
  }
  createTask(e, r2) {
    if (!this.isActive(e)) throw new Error(`Category "${e}" is not active.`);
    return console.log(`Creating profiling task for '${e}.${r2}'.`), new uc((n2) => this.records.add(e, this.dumpRecord(e, n2)), r2);
  }
  dumpRecord(e, r2) {
    console.info(`Task ${e}.${r2.identifier} executed in ${r2.duration.toFixed(2)}ms and ended at ${r2.date.toISOString()}`);
    let n2 = [];
    for (let o2 of r2.entries.keys()) {
      let l = r2.entries.get(o2), u = l.reduce((c, d) => c + d);
      n2.push({ name: `${r2.identifier}.${o2}`, count: l.length, duration: u });
    }
    let i = r2.duration - n2.map((o2) => o2.duration).reduce((o2, l) => o2 + l, 0);
    n2.push({ name: r2.identifier, count: 1, duration: i }), n2.sort((o2, l) => l.duration - o2.duration);
    function a(o2) {
      return Math.round(100 * o2) / 100;
    }
    return m(a, "Round"), console.table(n2.map((o2) => ({ Element: o2.name, Count: o2.count, "Self %": a(100 * o2.duration / r2.duration), "Time (ms)": a(o2.duration) }))), r2;
  }
  getRecords(...e) {
    return e.length === 0 ? this.records.values() : this.records.entries().filter((r2) => e.some((n2) => n2 === r2[0])).flatMap((r2) => r2[1]);
  }
}, m(_a128, "DefaultLangiumProfiler"), _a128);
var _a129;
var uc = (_a129 = class {
  constructor(e, r2) {
    this.stack = [], this.entries = new Tt(), this.addRecord = e, this.identifier = r2;
  }
  start() {
    if (this.startTime !== void 0) throw new Error(`Task "${this.identifier}" is already started.`);
    this.startTime = performance.now();
  }
  stop() {
    if (this.startTime === void 0) throw new Error(`Task "${this.identifier}" was not started.`);
    if (this.stack.length !== 0) throw new Error(`Task "${this.identifier}" cannot be stopped before sub-task(s): ${this.stack.map((r2) => r2.id).join(", ")}.`);
    let e = { identifier: this.identifier, date: /* @__PURE__ */ new Date(), duration: performance.now() - this.startTime, entries: this.entries };
    this.addRecord(e), this.startTime = void 0, this.entries.clear();
  }
  startSubTask(e) {
    this.stack.push({ id: e, start: performance.now(), content: 0 });
  }
  stopSubTask(e) {
    let r2 = this.stack.pop();
    if (!r2) throw new Error(`Task "${this.identifier}.${e}" was not started.`);
    if (r2.id !== e) throw new Error(`Sub-Task "${r2.id}" is not already stopped.`);
    let n2 = performance.now() - r2.start;
    this.stack.at(-1) !== void 0 && (this.stack[this.stack.length - 1].content += n2);
    let i = n2 - r2.content;
    this.entries.add(e, i);
  }
}, m(_a129, "ProfilingTask"), _a129);
var EC = Object.defineProperty;
var X = m((t, e) => EC(t, "name", { value: e, configurable: true }), "__name");
var uh;
((t) => {
  t.Terminals = { ARROW_DIRECTION: /L|R|T|B/, ARROW_GROUP: /\{group\}/, ARROW_INTO: /<|>/, ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, ID: /[\w]([-\w]*\w)?/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/, ARCH_ICON: /\([\w-:]+\)/, ARCH_TITLE: /\[(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[\w ]+)\]/ };
})(uh || (uh = {}));
var ch;
((t) => {
  t.Terminals = { ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, INT: /0|[1-9][0-9]*(?!\.)/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/, REFERENCE: /\w([-\./\w]*[-\w])?/ };
})(ch || (ch = {}));
var fh;
((t) => {
  t.Terminals = { ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/ };
})(fh || (fh = {}));
var dh;
((t) => {
  t.Terminals = { ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, INT: /0|[1-9][0-9]*(?!\.)/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/ };
})(dh || (dh = {}));
var ph;
((t) => {
  t.Terminals = { NUMBER_PIE: /(?:-?[0-9]+\.[0-9]+(?!\.))|(?:-?(0|[1-9][0-9]*)(?!\.))/, ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/ };
})(ph || (ph = {}));
var mh;
((t) => {
  t.Terminals = { GRATICULE: /circle|polygon/, BOOLEAN: /true|false/, ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, NUMBER: /(?:[0-9]+\.[0-9]+(?!\.))|(?:0|[1-9][0-9]*(?!\.))/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, ID: /[\w]([-\w]*\w)?/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/ };
})(mh || (mh = {}));
var hh;
((t) => {
  t.Terminals = { ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, TREEMAP_KEYWORD: /treemap-beta|treemap/, CLASS_DEF: /classDef\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\s+([^;\r\n]*))?(?:;)?/, STYLE_SEPARATOR: /:::/, SEPARATOR: /:/, COMMA: /,/, INDENTATION: /[ \t]{1,}/, WS: /[ \t]+/, ML_COMMENT: /\%\%[^\n]*/, NL: /\r?\n/, ID2: /[a-zA-Z_][a-zA-Z0-9_]*/, NUMBER2: /[0-9_\.\,]+/, STRING2: /"[^"]*"|'[^']*'/ };
})(hh || (hh = {}));
var gh;
((t) => {
  t.Terminals = { ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, INDENTATION: /[ \t]{1,}/, WS: /[ \t]+/, ML_COMMENT: /\%\%[^\n]*/, NL: /\r?\n/, STRING2: /"[^"]*"|'[^']*'/ };
})(gh || (gh = {}));
var yh;
((t) => {
  t.Terminals = { WARDLEY_NUMBER: /[0-9]+\.[0-9]+/, ARROW: /->/, LINK_PORT: /\+<>|\+>|\+</, LINK_ARROW: /-->|-\.->|>|\+'[^']*'<>|\+'[^']*'<|\+'[^']*'>/, LINK_LABEL: /;[^\n\r]+/, STRATEGY: /build|buy|outsource|market/, KW_WARDLEY: /wardley-beta/, KW_SIZE: /size/, KW_EVOLUTION: /evolution/, KW_ANCHOR: /anchor/, KW_COMPONENT: /component/, KW_LABEL: /label/, KW_INERTIA: /inertia/, KW_EVOLVE: /evolve/, KW_PIPELINE: /pipeline/, KW_NOTE: /note/, KW_ANNOTATIONS: /annotations/, KW_ANNOTATION: /annotation/, KW_ACCELERATOR: /accelerator/, KW_DEACCELERATOR: /deaccelerator/, NAME_WITH_SPACES: /(?!title\s|accTitle|accDescr)[A-Za-z][A-Za-z0-9_()&]*(?:[ \t]+[A-Za-z(][A-Za-z0-9_()&]*)*/, WS: /[ \t]+/, ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/, ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/, TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/, INT: /0|[1-9][0-9]*(?!\.)/, STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/, ID: /[\w]([-\w]*\w)?/, NEWLINE: /\r?\n/, WHITESPACE: /[\t ]+/, YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/, DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/, SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/ };
})(yh || (yh = {}));
var u0 = { ...uh.Terminals, ...ch.Terminals, ...fh.Terminals, ...dh.Terminals, ...ph.Terminals, ...mh.Terminals, ...gh.Terminals, ...hh.Terminals, ...yh.Terminals };
var cc = { $type: "Accelerator", name: "name", x: "x", y: "y" };
var fc = { $type: "Anchor", evolution: "evolution", name: "name", visibility: "visibility" };
var Fo = { $type: "Annotation", number: "number", text: "text", x: "x", y: "y" };
var Zm = { $type: "Annotations", x: "x", y: "y" };
var en = { $type: "Architecture", accDescr: "accDescr", accTitle: "accTitle", edges: "edges", groups: "groups", junctions: "junctions", services: "services", title: "title" };
function AC(t) {
  return er.isInstance(t, en.$type);
}
m(AC, "isArchitecture");
X(AC, "isArchitecture");
var dc = { $type: "Axis", label: "label", name: "name" };
var $c = { $type: "Branch", name: "name", order: "order" };
function CC(t) {
  return er.isInstance(t, $c.$type);
}
m(CC, "isBranch");
X(CC, "isBranch");
var ux = { $type: "Checkout", branch: "branch" };
var pc = { $type: "CherryPicking", id: "id", parent: "parent", tags: "tags" };
var Qm2 = { $type: "ClassDefStatement", className: "className", styleText: "styleText" };
var js = { $type: "Commit", id: "id", message: "message", tags: "tags", type: "type" };
function SC(t) {
  return er.isInstance(t, js.$type);
}
m(SC, "isCommit");
X(SC, "isCommit");
var xi = { $type: "Component", decorator: "decorator", evolution: "evolution", inertia: "inertia", label: "label", name: "name", visibility: "visibility" };
var mc = { $type: "Curve", entries: "entries", label: "label", name: "name" };
var hc = { $type: "Deaccelerator", name: "name", x: "x", y: "y" };
var cx = { $type: "Decorator", strategy: "strategy" };
var Us = { $type: "Direction", accDescr: "accDescr", accTitle: "accTitle", dir: "dir", statements: "statements", title: "title" };
var Pr = { $type: "Edge", lhsDir: "lhsDir", lhsGroup: "lhsGroup", lhsId: "lhsId", lhsInto: "lhsInto", rhsDir: "rhsDir", rhsGroup: "rhsGroup", rhsId: "rhsId", rhsInto: "rhsInto", title: "title" };
var eh = { $type: "Entry", axis: "axis", value: "value" };
var fx = { $type: "Evolution", stages: "stages" };
var gc = { $type: "EvolutionStage", boundary: "boundary", name: "name", secondName: "secondName" };
var th = { $type: "Evolve", component: "component", target: "target" };
var Ai2 = { $type: "GitGraph", accDescr: "accDescr", accTitle: "accTitle", statements: "statements", title: "title" };
function kC(t) {
  return er.isInstance(t, Ai2.$type);
}
m(kC, "isGitGraph");
X(kC, "isGitGraph");
var Go = { $type: "Group", icon: "icon", id: "id", in: "in", title: "title" };
var jo = { $type: "Info", accDescr: "accDescr", accTitle: "accTitle", title: "title" };
function NC(t) {
  return er.isInstance(t, jo.$type);
}
m(NC, "isInfo");
X(NC, "isInfo");
var Uo = { $type: "Item", classSelector: "classSelector", name: "name" };
var rh = { $type: "Junction", id: "id", in: "in" };
var zo = { $type: "Label", negX: "negX", negY: "negY", offsetX: "offsetX", offsetY: "offsetY" };
var yc = { $type: "Leaf", classSelector: "classSelector", name: "name", value: "value" };
var vi = { $type: "Link", arrow: "arrow", from: "from", fromPort: "fromPort", linkLabel: "linkLabel", to: "to", toPort: "toPort" };
var Bs = { $type: "Merge", branch: "branch", id: "id", tags: "tags", type: "type" };
function wC(t) {
  return er.isInstance(t, Bs.$type);
}
m(wC, "isMerge");
X(wC, "isMerge");
var Tc = { $type: "Note", evolution: "evolution", text: "text", visibility: "visibility" };
var nh = { $type: "Option", name: "name", value: "value" };
var Ws = { $type: "Packet", accDescr: "accDescr", accTitle: "accTitle", blocks: "blocks", title: "title" };
function IC(t) {
  return er.isInstance(t, Ws.$type);
}
m(IC, "isPacket");
X(IC, "isPacket");
var Ks = { $type: "PacketBlock", bits: "bits", end: "end", label: "label", start: "start" };
function bC(t) {
  return er.isInstance(t, Ks.$type);
}
m(bC, "isPacketBlock");
X(bC, "isPacketBlock");
var Ci = { $type: "Pie", accDescr: "accDescr", accTitle: "accTitle", sections: "sections", showData: "showData", title: "title" };
function _C(t) {
  return er.isInstance(t, Ci.$type);
}
m(_C, "isPie");
X(_C, "isPie");
var xc = { $type: "PieSection", label: "label", value: "value" };
function PC(t) {
  return er.isInstance(t, xc.$type);
}
m(PC, "isPieSection");
X(PC, "isPieSection");
var ih = { $type: "Pipeline", components: "components", parent: "parent" };
var Rc = { $type: "PipelineComponent", evolution: "evolution", label: "label", name: "name" };
var Ei = { $type: "Radar", accDescr: "accDescr", accTitle: "accTitle", axes: "axes", curves: "curves", options: "options", title: "title" };
var sh = { $type: "Section", classSelector: "classSelector", name: "name" };
var zs = { $type: "Service", icon: "icon", iconText: "iconText", id: "id", in: "in", title: "title" };
var ah = { $type: "Size", height: "height", width: "width" };
var qs = { $type: "Statement" };
var Vs = { $type: "Treemap", accDescr: "accDescr", accTitle: "accTitle", title: "title", TreemapRows: "TreemapRows" };
function OC(t) {
  return er.isInstance(t, Vs.$type);
}
m(OC, "isTreemap");
X(OC, "isTreemap");
var oh = { $type: "TreemapRow", indent: "indent", item: "item" };
var lh = { $type: "TreeNode", indent: "indent", name: "name" };
var qo = { $type: "TreeView", accDescr: "accDescr", accTitle: "accTitle", nodes: "nodes", title: "title" };
var ct = { $type: "Wardley", accDescr: "accDescr", accelerators: "accelerators", accTitle: "accTitle", anchors: "anchors", annotation: "annotation", annotations: "annotations", components: "components", deaccelerators: "deaccelerators", evolution: "evolution", evolves: "evolves", links: "links", notes: "notes", pipelines: "pipelines", size: "size", title: "title" };
function LC(t) {
  return er.isInstance(t, ct.$type);
}
m(LC, "isWardley");
X(LC, "isWardley");
var _a130;
var xx = (_a130 = class extends On {
  constructor() {
    super(...arguments), this.types = { Accelerator: { name: cc.$type, properties: { name: { name: cc.name }, x: { name: cc.x }, y: { name: cc.y } }, superTypes: [] }, Anchor: { name: fc.$type, properties: { evolution: { name: fc.evolution }, name: { name: fc.name }, visibility: { name: fc.visibility } }, superTypes: [] }, Annotation: { name: Fo.$type, properties: { number: { name: Fo.number }, text: { name: Fo.text }, x: { name: Fo.x }, y: { name: Fo.y } }, superTypes: [] }, Annotations: { name: Zm.$type, properties: { x: { name: Zm.x }, y: { name: Zm.y } }, superTypes: [] }, Architecture: { name: en.$type, properties: { accDescr: { name: en.accDescr }, accTitle: { name: en.accTitle }, edges: { name: en.edges, defaultValue: [] }, groups: { name: en.groups, defaultValue: [] }, junctions: { name: en.junctions, defaultValue: [] }, services: { name: en.services, defaultValue: [] }, title: { name: en.title } }, superTypes: [] }, Axis: { name: dc.$type, properties: { label: { name: dc.label }, name: { name: dc.name } }, superTypes: [] }, Branch: { name: $c.$type, properties: { name: { name: $c.name }, order: { name: $c.order } }, superTypes: [qs.$type] }, Checkout: { name: ux.$type, properties: { branch: { name: ux.branch } }, superTypes: [qs.$type] }, CherryPicking: { name: pc.$type, properties: { id: { name: pc.id }, parent: { name: pc.parent }, tags: { name: pc.tags, defaultValue: [] } }, superTypes: [qs.$type] }, ClassDefStatement: { name: Qm2.$type, properties: { className: { name: Qm2.className }, styleText: { name: Qm2.styleText } }, superTypes: [] }, Commit: { name: js.$type, properties: { id: { name: js.id }, message: { name: js.message }, tags: { name: js.tags, defaultValue: [] }, type: { name: js.type } }, superTypes: [qs.$type] }, Component: { name: xi.$type, properties: { decorator: { name: xi.decorator }, evolution: { name: xi.evolution }, inertia: { name: xi.inertia, defaultValue: false }, label: { name: xi.label }, name: { name: xi.name }, visibility: { name: xi.visibility } }, superTypes: [] }, Curve: { name: mc.$type, properties: { entries: { name: mc.entries, defaultValue: [] }, label: { name: mc.label }, name: { name: mc.name } }, superTypes: [] }, Deaccelerator: { name: hc.$type, properties: { name: { name: hc.name }, x: { name: hc.x }, y: { name: hc.y } }, superTypes: [] }, Decorator: { name: cx.$type, properties: { strategy: { name: cx.strategy } }, superTypes: [] }, Direction: { name: Us.$type, properties: { accDescr: { name: Us.accDescr }, accTitle: { name: Us.accTitle }, dir: { name: Us.dir }, statements: { name: Us.statements, defaultValue: [] }, title: { name: Us.title } }, superTypes: [Ai2.$type] }, Edge: { name: Pr.$type, properties: { lhsDir: { name: Pr.lhsDir }, lhsGroup: { name: Pr.lhsGroup, defaultValue: false }, lhsId: { name: Pr.lhsId }, lhsInto: { name: Pr.lhsInto, defaultValue: false }, rhsDir: { name: Pr.rhsDir }, rhsGroup: { name: Pr.rhsGroup, defaultValue: false }, rhsId: { name: Pr.rhsId }, rhsInto: { name: Pr.rhsInto, defaultValue: false }, title: { name: Pr.title } }, superTypes: [] }, Entry: { name: eh.$type, properties: { axis: { name: eh.axis, referenceType: dc.$type }, value: { name: eh.value } }, superTypes: [] }, Evolution: { name: fx.$type, properties: { stages: { name: fx.stages, defaultValue: [] } }, superTypes: [] }, EvolutionStage: { name: gc.$type, properties: { boundary: { name: gc.boundary }, name: { name: gc.name }, secondName: { name: gc.secondName } }, superTypes: [] }, Evolve: { name: th.$type, properties: { component: { name: th.component }, target: { name: th.target } }, superTypes: [] }, GitGraph: { name: Ai2.$type, properties: { accDescr: { name: Ai2.accDescr }, accTitle: { name: Ai2.accTitle }, statements: { name: Ai2.statements, defaultValue: [] }, title: { name: Ai2.title } }, superTypes: [] }, Group: { name: Go.$type, properties: { icon: { name: Go.icon }, id: { name: Go.id }, in: { name: Go.in }, title: { name: Go.title } }, superTypes: [] }, Info: { name: jo.$type, properties: { accDescr: { name: jo.accDescr }, accTitle: { name: jo.accTitle }, title: { name: jo.title } }, superTypes: [] }, Item: { name: Uo.$type, properties: { classSelector: { name: Uo.classSelector }, name: { name: Uo.name } }, superTypes: [] }, Junction: { name: rh.$type, properties: { id: { name: rh.id }, in: { name: rh.in } }, superTypes: [] }, Label: { name: zo.$type, properties: { negX: { name: zo.negX, defaultValue: false }, negY: { name: zo.negY, defaultValue: false }, offsetX: { name: zo.offsetX }, offsetY: { name: zo.offsetY } }, superTypes: [] }, Leaf: { name: yc.$type, properties: { classSelector: { name: yc.classSelector }, name: { name: yc.name }, value: { name: yc.value } }, superTypes: [Uo.$type] }, Link: { name: vi.$type, properties: { arrow: { name: vi.arrow }, from: { name: vi.from }, fromPort: { name: vi.fromPort }, linkLabel: { name: vi.linkLabel }, to: { name: vi.to }, toPort: { name: vi.toPort } }, superTypes: [] }, Merge: { name: Bs.$type, properties: { branch: { name: Bs.branch }, id: { name: Bs.id }, tags: { name: Bs.tags, defaultValue: [] }, type: { name: Bs.type } }, superTypes: [qs.$type] }, Note: { name: Tc.$type, properties: { evolution: { name: Tc.evolution }, text: { name: Tc.text }, visibility: { name: Tc.visibility } }, superTypes: [] }, Option: { name: nh.$type, properties: { name: { name: nh.name }, value: { name: nh.value, defaultValue: false } }, superTypes: [] }, Packet: { name: Ws.$type, properties: { accDescr: { name: Ws.accDescr }, accTitle: { name: Ws.accTitle }, blocks: { name: Ws.blocks, defaultValue: [] }, title: { name: Ws.title } }, superTypes: [] }, PacketBlock: { name: Ks.$type, properties: { bits: { name: Ks.bits }, end: { name: Ks.end }, label: { name: Ks.label }, start: { name: Ks.start } }, superTypes: [] }, Pie: { name: Ci.$type, properties: { accDescr: { name: Ci.accDescr }, accTitle: { name: Ci.accTitle }, sections: { name: Ci.sections, defaultValue: [] }, showData: { name: Ci.showData, defaultValue: false }, title: { name: Ci.title } }, superTypes: [] }, PieSection: { name: xc.$type, properties: { label: { name: xc.label }, value: { name: xc.value } }, superTypes: [] }, Pipeline: { name: ih.$type, properties: { components: { name: ih.components, defaultValue: [] }, parent: { name: ih.parent } }, superTypes: [] }, PipelineComponent: { name: Rc.$type, properties: { evolution: { name: Rc.evolution }, label: { name: Rc.label }, name: { name: Rc.name } }, superTypes: [] }, Radar: { name: Ei.$type, properties: { accDescr: { name: Ei.accDescr }, accTitle: { name: Ei.accTitle }, axes: { name: Ei.axes, defaultValue: [] }, curves: { name: Ei.curves, defaultValue: [] }, options: { name: Ei.options, defaultValue: [] }, title: { name: Ei.title } }, superTypes: [] }, Section: { name: sh.$type, properties: { classSelector: { name: sh.classSelector }, name: { name: sh.name } }, superTypes: [Uo.$type] }, Service: { name: zs.$type, properties: { icon: { name: zs.icon }, iconText: { name: zs.iconText }, id: { name: zs.id }, in: { name: zs.in }, title: { name: zs.title } }, superTypes: [] }, Size: { name: ah.$type, properties: { height: { name: ah.height }, width: { name: ah.width } }, superTypes: [] }, Statement: { name: qs.$type, properties: {}, superTypes: [] }, TreeNode: { name: lh.$type, properties: { indent: { name: lh.indent }, name: { name: lh.name } }, superTypes: [] }, TreeView: { name: qo.$type, properties: { accDescr: { name: qo.accDescr }, accTitle: { name: qo.accTitle }, nodes: { name: qo.nodes, defaultValue: [] }, title: { name: qo.title } }, superTypes: [] }, Treemap: { name: Vs.$type, properties: { accDescr: { name: Vs.accDescr }, accTitle: { name: Vs.accTitle }, title: { name: Vs.title }, TreemapRows: { name: Vs.TreemapRows, defaultValue: [] } }, superTypes: [] }, TreemapRow: { name: oh.$type, properties: { indent: { name: oh.indent }, item: { name: oh.item } }, superTypes: [] }, Wardley: { name: ct.$type, properties: { accDescr: { name: ct.accDescr }, accelerators: { name: ct.accelerators, defaultValue: [] }, accTitle: { name: ct.accTitle }, anchors: { name: ct.anchors, defaultValue: [] }, annotation: { name: ct.annotation, defaultValue: [] }, annotations: { name: ct.annotations, defaultValue: [] }, components: { name: ct.components, defaultValue: [] }, deaccelerators: { name: ct.deaccelerators, defaultValue: [] }, evolution: { name: ct.evolution }, evolves: { name: ct.evolves, defaultValue: [] }, links: { name: ct.links, defaultValue: [] }, notes: { name: ct.notes, defaultValue: [] }, pipelines: { name: ct.pipelines, defaultValue: [] }, size: { name: ct.size }, title: { name: ct.title } }, superTypes: [] } };
  }
}, m(_a130, "MermaidAstReflection"), X(_a130, "MermaidAstReflection"), _a130);
var er = new xx();
var dx;
var DC = X(() => dx ?? (dx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"ArchitectureGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Architecture","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"architecture-beta"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"groups","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"services","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"junctions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Assignment","feature":"edges","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"LeftPort","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"lhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"RightPort","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Keyword","value":":"}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Arrow","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Assignment","feature":"lhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"--"},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":"-"}]}]},{"$type":"Assignment","feature":"rhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Group","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"group"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Service","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"service"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"iconText","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Junction","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"junction"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Edge","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"lhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"lhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Assignment","feature":"rhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"rhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"ARROW_DIRECTION","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"L"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"R"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"T"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"B"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_GROUP","definition":{"$type":"RegexToken","regex":"/\\\\{group\\\\}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_INTO","definition":{"$type":"RegexToken","regex":"/<|>/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@18"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@19"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","name":"ARCH_ICON","definition":{"$type":"RegexToken","regex":"/\\\\([\\\\w-:]+\\\\)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARCH_TITLE","definition":{"$type":"RegexToken","regex":"/\\\\[(?:\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'|[\\\\w ]+)\\\\]/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[],"types":[]}`)), "ArchitectureGrammarGrammar");
var px;
var MC = X(() => px ?? (px = Qt(`{"$type":"Grammar","isDeclared":true,"name":"GitGraphGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"GitGraph","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Keyword","value":":"}]},{"$type":"Keyword","value":"gitGraph:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Keyword","value":":"}]}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"Assignment","feature":"statements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Direction","definition":{"$type":"Assignment","feature":"dir","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"LR"},{"$type":"Keyword","value":"TB"},{"$type":"Keyword","value":"BT"}]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Commit","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"commit"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"msg:","cardinality":"?"},{"$type":"Assignment","feature":"message","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Branch","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"branch"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"order:"},{"$type":"Assignment","feature":"order","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Merge","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"merge"},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Checkout","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"checkout"},{"$type":"Keyword","value":"switch"}]},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"CherryPicking","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"cherry-pick"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"parent:"},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@14"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","name":"REFERENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[],"types":[]}`)), "GitGraphGrammarGrammar");
var mx;
var FC = X(() => mx ?? (mx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"InfoGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Info","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"info"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"showInfo"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[],"cardinality":"?"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@7"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "InfoGrammarGrammar");
var hx;
var GC = X(() => hx ?? (hx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"PacketGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Packet","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"packet"},{"$type":"Keyword","value":"packet-beta"}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"blocks","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PacketBlock","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"start","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"end","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}],"cardinality":"?"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"+"},{"$type":"Assignment","feature":"bits","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "PacketGrammarGrammar");
var gx;
var UC = X(() => gx ?? (gx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"PieGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Pie","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"pie"},{"$type":"Assignment","feature":"showData","operator":"?=","terminal":{"$type":"Keyword","value":"showData"},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Assignment","feature":"sections","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PieSection","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"FLOAT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?(0|[1-9][0-9]*)(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@2"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@3"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@11"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@12"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "PieGrammarGrammar");
var yx;
var zC = X(() => yx ?? (yx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"RadarGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Radar","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":"radar-beta:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":":"}]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"axis"},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"curve"},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Label","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Axis","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Curve","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":"}"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Entries","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"DetailedEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"axis","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@2"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"Keyword","value":":","cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"NumberEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Option","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"showLegend"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"ticks"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"max"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"min"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"graticule"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"GRATICULE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"circle"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"polygon"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@16"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[{"$type":"Interface","name":"Entry","attributes":[{"$type":"TypeAttribute","name":"axis","isOptional":true,"type":{"$type":"ReferenceType","referenceType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@2"}},"isMulti":false}},{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}],"superTypes":[]}],"types":[]}`)), "RadarGrammarGrammar");
var Tx;
var qC = X(() => Tx ?? (Tx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"TreemapGrammar","rules":[{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"Treemap","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]},{"$type":"Assignment","feature":"TreemapRows","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"TREEMAP_KEYWORD","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap-beta"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"CLASS_DEF","definition":{"$type":"RegexToken","regex":"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STYLE_SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":::"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"COMMA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":","},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false},{"$type":"ParserRule","name":"TreemapRow","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"item","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"ClassDef","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Item","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Section","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Leaf","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[],"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"ID2","definition":{"$type":"RegexToken","regex":"/[a-zA-Z_][a-zA-Z0-9_]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER2","definition":{"$type":"RegexToken","regex":"/[0-9_\\\\.\\\\,]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"MyNumber","dataType":"number","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"Item","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"classSelector","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"Section","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[]},{"$type":"Interface","name":"Leaf","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}]},{"$type":"Interface","name":"ClassDefStatement","attributes":[{"$type":"TypeAttribute","name":"className","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"styleText","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"Treemap","attributes":[{"$type":"TypeAttribute","name":"TreemapRows","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@15"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"imports":[],"types":[],"$comment":"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */"}`)), "TreemapGrammarGrammar");
var Rx;
var jC = X(() => Rx ?? (Rx = Qt(`{"$type":"Grammar","isDeclared":true,"name":"TreeViewGrammar","rules":[{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"TreeView","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"treeView-beta"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"nodes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false},{"$type":"ParserRule","name":"TreeNode","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"TreeView","attributes":[{"$type":"TypeAttribute","name":"nodes","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@9"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"imports":[],"types":[],"$comment":"/**\\n * TreeView grammar for Langium\\n * Converted from treemap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treeView declaration.\\n */"}`)), "TreeViewGrammarGrammar");
var $x;
var BC = X(() => $x ?? ($x = Qt(`{"$type":"Grammar","isDeclared":true,"name":"WardleyGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Wardley","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"size","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"anchors","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"components","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"links","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"evolves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"Assignment","feature":"pipelines","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"notes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"annotations","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Assignment","feature":"annotation","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accelerators","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Assignment","feature":"deaccelerators","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Size","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"width","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"height","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Evolution","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]},{"$type":"Assignment","feature":"stages","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Assignment","feature":"stages","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EvolutionStage","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"boundary","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"/"},{"$type":"Assignment","feature":"secondName","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Anchor","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Component","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"decorator","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"inertia","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"inertia","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}},{"$type":"Keyword","value":")"}]}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Label","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"negX","operator":"?=","terminal":{"$type":"Keyword","value":"-"},"cardinality":"?"},{"$type":"Assignment","feature":"offsetX","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"negY","operator":"?=","terminal":{"$type":"Keyword","value":"-"},"cardinality":"?"},{"$type":"Assignment","feature":"offsetY","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Decorator","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"strategy","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Link","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"from","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"fromPort","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"arrow","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}]},"cardinality":"?"},{"$type":"Assignment","feature":"to","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"toPort","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"linkLabel","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Evolve","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Assignment","feature":"component","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"target","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Pipeline","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"+"},{"$type":"Assignment","feature":"components","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"+"},{"$type":"Keyword","value":"}"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PipelineComponent","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Note","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Annotations","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Annotation","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"Assignment","feature":"number","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"CoordinateValue","dataType":"number","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Accelerator","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Deaccelerator","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"WARDLEY_NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"->"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_PORT","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+<>"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+>"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+<"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_ARROW","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"-->"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"-.->"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":">"},"parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'<>/","parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'</","parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'>/","parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_LABEL","definition":{"$type":"RegexToken","regex":"/;[^\\\\n\\\\r]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRATEGY","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"build"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"buy"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"outsource"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"market"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_WARDLEY","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"wardley-beta"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_SIZE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"size"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_EVOLUTION","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"evolution"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANCHOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"anchor"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_COMPONENT","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"component"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_LABEL","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"label"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_INERTIA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"inertia"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_EVOLVE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"evolve"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_PIPELINE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"pipeline"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_NOTE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"note"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANNOTATIONS","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"annotations"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANNOTATION","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"annotation"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ACCELERATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"accelerator"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_DEACCELERATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"deaccelerator"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NAME_WITH_SPACES","definition":{"$type":"RegexToken","regex":"/(?!title\\\\s|accTitle|accDescr)[A-Za-z][A-Za-z0-9_()&]*(?:[ \\\\t]+[A-Za-z(][A-Za-z0-9_()&]*)*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@47"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@48"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "WardleyGrammarGrammar");
var WC = { languageId: "architecture", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var KC = { languageId: "gitGraph", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var VC = { languageId: "info", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var HC = { languageId: "packet", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var YC = { languageId: "pie", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var XC = { languageId: "radar", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var JC = { languageId: "treemap", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var ZC = { languageId: "treeView", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var QC = { languageId: "wardley", fileExtensions: [".mmd", ".mermaid"], caseInsensitive: false, mode: "production" };
var f0 = { AstReflection: X(() => new xx(), "AstReflection") };
var d0 = { Grammar: X(() => DC(), "Grammar"), LanguageMetaData: X(() => WC, "LanguageMetaData"), parser: {} };
var p0 = { Grammar: X(() => MC(), "Grammar"), LanguageMetaData: X(() => KC, "LanguageMetaData"), parser: {} };
var m0 = { Grammar: X(() => FC(), "Grammar"), LanguageMetaData: X(() => VC, "LanguageMetaData"), parser: {} };
var h0 = { Grammar: X(() => GC(), "Grammar"), LanguageMetaData: X(() => HC, "LanguageMetaData"), parser: {} };
var g0 = { Grammar: X(() => UC(), "Grammar"), LanguageMetaData: X(() => YC, "LanguageMetaData"), parser: {} };
var y0 = { Grammar: X(() => zC(), "Grammar"), LanguageMetaData: X(() => XC, "LanguageMetaData"), parser: {} };
var T0 = { Grammar: X(() => qC(), "Grammar"), LanguageMetaData: X(() => JC, "LanguageMetaData"), parser: {} };
var R0 = { Grammar: X(() => jC(), "Grammar"), LanguageMetaData: X(() => ZC, "LanguageMetaData"), parser: {} };
var $0 = { Grammar: X(() => BC(), "Grammar"), LanguageMetaData: X(() => QC, "LanguageMetaData"), parser: {} };
var eS = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/;
var tS = /accTitle[\t ]*:([^\n\r]*)/;
var rS = /title([\t ][^\n\r]*|)/;
var nS = { ACC_DESCR: eS, ACC_TITLE: tS, TITLE: rS };
var _a131;
var iS = (_a131 = class extends ci {
  runConverter(t, e, r2) {
    let n2 = this.runCommonConverter(t, e, r2);
    return n2 === void 0 && (n2 = this.runCustomConverter(t, e, r2)), n2 === void 0 ? super.runConverter(t, e, r2) : n2;
  }
  runCommonConverter(t, e, r2) {
    let n2 = nS[t.name];
    if (n2 === void 0) return;
    let i = n2.exec(e);
    if (i !== null) {
      if (i[1] !== void 0) return i[1].trim().replace(/[\t ]{2,}/gm, " ");
      if (i[2] !== void 0) return i[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, `
`);
    }
  }
}, m(_a131, "AbstractMermaidValueConverter"), X(_a131, "AbstractMermaidValueConverter"), _a131);
var _a132;
var v0 = (_a132 = class extends iS {
  runCustomConverter(t, e, r2) {
  }
}, m(_a132, "CommonValueConverter"), X(_a132, "CommonValueConverter"), _a132);
var _a133;
var sS = (_a133 = class extends Zr2 {
  constructor(t) {
    super(), this.keywords = new Set(t);
  }
  buildKeywordTokens(t, e, r2) {
    let n2 = super.buildKeywordTokens(t, e, r2);
    return n2.forEach((i) => {
      this.keywords.has(i.name) && i.PATTERN !== void 0 && (i.PATTERN = new RegExp(i.PATTERN.toString() + "(?:(?=%%)|(?!\\S))"));
    }), n2;
  }
}, m(_a133, "AbstractMermaidTokenBuilder"), X(_a133, "AbstractMermaidTokenBuilder"), _a133);
var _a134;
var A0 = (_a134 = class extends sS {
}, m(_a134, "CommonTokenBuilder"), X(_a134, "CommonTokenBuilder"), _a134);

export {
  Wm,
  Km,
  ac,
  Xm,
  X,
  f0,
  d0,
  p0,
  m0,
  h0,
  g0,
  y0,
  T0,
  R0,
  $0,
  iS,
  v0,
  sS
};
//# sourceMappingURL=chunk-UOHFH3CX.js.map

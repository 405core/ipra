import {
  c
} from "./chunk-S3XR4SNL.js";
import {
  d
} from "./chunk-PG2EBXFX.js";
import {
  s
} from "./chunk-Z75ON5TC.js";
import "./chunk-G7CRMAJP.js";
import "./chunk-EUSCIRG4.js";
import "./chunk-KDDFP6PK.js";
import "./chunk-ZJVYFLWS.js";
import "./chunk-CGNTNBTA.js";
import "./chunk-CCKZNSTL.js";
import "./chunk-LTAWPWJ6.js";
import "./chunk-VNU3COQH.js";
import "./chunk-2ZIBIWL3.js";
import "./chunk-UOHFH3CX.js";
import "./chunk-3DBRZS4A.js";
import {
  Lt,
  Ut,
  wt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Cn,
  Cs,
  Ot,
  as,
  es,
  hs,
  ls,
  ns,
  oo,
  os,
  qo,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  ia,
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/gitGraphDiagram-3HKGZ4G3.mjs
var $ = { NORMAL: 0, REVERSE: 1, HIGHLIGHT: 2, MERGE: 3, CHERRY_PICK: 4 };
var De = oo.gitGraph;
var v = m(() => Lt({ ...De, ...Ot().gitGraph }), "getConfig");
var m2 = new s(() => {
  let e = v(), t = e.mainBranchName, r = e.mainBranchOrder;
  return { mainBranchName: t, commits: /* @__PURE__ */ new Map(), head: null, branchConfig: /* @__PURE__ */ new Map([[t, { name: t, order: r }]]), branches: /* @__PURE__ */ new Map([[t, null]]), currBranch: t, direction: "LR", seq: 0, options: {} };
});
function Z() {
  return wt({ length: 7 });
}
m(Z, "getID");
function Le(e, t) {
  let r = /* @__PURE__ */ Object.create(null);
  return e.reduce((a, s2) => {
    let c2 = t(s2);
    return r[c2] || (r[c2] = true, a.push(s2)), a;
  }, []);
}
m(Le, "uniqBy");
var Ge = m(function(e) {
  m2.records.direction = e;
}, "setDirection");
var Pe = m(function(e) {
  pt.debug("options str", e), e = e == null ? void 0 : e.trim(), e = e || "{}";
  try {
    m2.records.options = JSON.parse(e);
  } catch (t) {
    pt.error("error while parsing gitGraph options", t.message);
  }
}, "setOptions");
var Oe = m(function() {
  return m2.records.options;
}, "getOptions");
var Re = m(function(e) {
  let t = e.msg, r = e.id, a = e.type, s2 = e.tags;
  pt.info("commit", t, r, a, s2), pt.debug("Entering commit:", t, r, a, s2);
  let c2 = v();
  r = Cn.sanitizeText(r, c2), t = Cn.sanitizeText(t, c2), s2 = s2 == null ? void 0 : s2.map((n) => Cn.sanitizeText(n, c2));
  let o = { id: r || m2.records.seq + "-" + Z(), message: t, seq: m2.records.seq++, type: a ?? $.NORMAL, tags: s2 ?? [], parents: m2.records.head == null ? [] : [m2.records.head.id], branch: m2.records.currBranch };
  m2.records.head = o, pt.info("main branch", c2.mainBranchName), m2.records.commits.has(o.id) && pt.warn(`Commit ID ${o.id} already exists`), m2.records.commits.set(o.id, o), m2.records.branches.set(m2.records.currBranch, o.id), pt.debug("in pushCommit " + o.id);
}, "commit");
var ve = m(function(e) {
  let t = e.name, r = e.order;
  if (t = Cn.sanitizeText(t, v()), m2.records.branches.has(t)) throw new Error(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${t}")`);
  m2.records.branches.set(t, m2.records.head != null ? m2.records.head.id : null), m2.records.branchConfig.set(t, { name: t, order: r }), $e(t), pt.debug("in createBranch");
}, "branch");
var Ae = m((e) => {
  let t = e.branch, r = e.id, a = e.type, s2 = e.tags, c2 = v();
  t = Cn.sanitizeText(t, c2), r && (r = Cn.sanitizeText(r, c2));
  let o = m2.records.branches.get(m2.records.currBranch), n = m2.records.branches.get(t), d2 = o ? m2.records.commits.get(o) : void 0, l = n ? m2.records.commits.get(n) : void 0;
  if (d2 && l && d2.branch === t) throw new Error(`Cannot merge branch '${t}' into itself.`);
  if (m2.records.currBranch === t) {
    let i = new Error('Incorrect usage of "merge". Cannot merge a branch to itself');
    throw i.hash = { text: `merge ${t}`, token: `merge ${t}`, expected: ["branch abc"] }, i;
  }
  if (d2 === void 0 || !d2) {
    let i = new Error(`Incorrect usage of "merge". Current branch (${m2.records.currBranch})has no commits`);
    throw i.hash = { text: `merge ${t}`, token: `merge ${t}`, expected: ["commit"] }, i;
  }
  if (!m2.records.branches.has(t)) {
    let i = new Error('Incorrect usage of "merge". Branch to be merged (' + t + ") does not exist");
    throw i.hash = { text: `merge ${t}`, token: `merge ${t}`, expected: [`branch ${t}`] }, i;
  }
  if (l === void 0 || !l) {
    let i = new Error('Incorrect usage of "merge". Branch to be merged (' + t + ") has no commits");
    throw i.hash = { text: `merge ${t}`, token: `merge ${t}`, expected: ['"commit"'] }, i;
  }
  if (d2 === l) {
    let i = new Error('Incorrect usage of "merge". Both branches have same head');
    throw i.hash = { text: `merge ${t}`, token: `merge ${t}`, expected: ["branch abc"] }, i;
  }
  if (r && m2.records.commits.has(r)) {
    let i = new Error('Incorrect usage of "merge". Commit with id:' + r + " already exists, use different custom id");
    throw i.hash = { text: `merge ${t} ${r} ${a} ${s2 == null ? void 0 : s2.join(" ")}`, token: `merge ${t} ${r} ${a} ${s2 == null ? void 0 : s2.join(" ")}`, expected: [`merge ${t} ${r}_UNIQUE ${a} ${s2 == null ? void 0 : s2.join(" ")}`] }, i;
  }
  let p = n || "", g = { id: r || `${m2.records.seq}-${Z()}`, message: `merged branch ${t} into ${m2.records.currBranch}`, seq: m2.records.seq++, parents: m2.records.head == null ? [] : [m2.records.head.id, p], branch: m2.records.currBranch, type: $.MERGE, customType: a, customId: !!r, tags: s2 ?? [] };
  m2.records.head = g, m2.records.commits.set(g.id, g), m2.records.branches.set(m2.records.currBranch, g.id), pt.debug(m2.records.branches), pt.debug("in mergeBranch");
}, "merge");
var Ie = m(function(e) {
  let t = e.id, r = e.targetId, a = e.tags, s2 = e.parent;
  pt.debug("Entering cherryPick:", t, r, a);
  let c2 = v();
  if (t = Cn.sanitizeText(t, c2), r = Cn.sanitizeText(r, c2), a = a == null ? void 0 : a.map((d2) => Cn.sanitizeText(d2, c2)), s2 = Cn.sanitizeText(s2, c2), !t || !m2.records.commits.has(t)) {
    let d2 = new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');
    throw d2.hash = { text: `cherryPick ${t} ${r}`, token: `cherryPick ${t} ${r}`, expected: ["cherry-pick abc"] }, d2;
  }
  let o = m2.records.commits.get(t);
  if (o === void 0 || !o) throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');
  if (s2 && !(Array.isArray(o.parents) && o.parents.includes(s2))) throw new Error("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit.");
  let n = o.branch;
  if (o.type === $.MERGE && !s2) throw new Error("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified.");
  if (!r || !m2.records.commits.has(r)) {
    if (n === m2.records.currBranch) {
      let g = new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');
      throw g.hash = { text: `cherryPick ${t} ${r}`, token: `cherryPick ${t} ${r}`, expected: ["cherry-pick abc"] }, g;
    }
    let d2 = m2.records.branches.get(m2.records.currBranch);
    if (d2 === void 0 || !d2) {
      let g = new Error(`Incorrect usage of "cherry-pick". Current branch (${m2.records.currBranch})has no commits`);
      throw g.hash = { text: `cherryPick ${t} ${r}`, token: `cherryPick ${t} ${r}`, expected: ["cherry-pick abc"] }, g;
    }
    let l = m2.records.commits.get(d2);
    if (l === void 0 || !l) {
      let g = new Error(`Incorrect usage of "cherry-pick". Current branch (${m2.records.currBranch})has no commits`);
      throw g.hash = { text: `cherryPick ${t} ${r}`, token: `cherryPick ${t} ${r}`, expected: ["cherry-pick abc"] }, g;
    }
    let p = { id: m2.records.seq + "-" + Z(), message: `cherry-picked ${o == null ? void 0 : o.message} into ${m2.records.currBranch}`, seq: m2.records.seq++, parents: m2.records.head == null ? [] : [m2.records.head.id, o.id], branch: m2.records.currBranch, type: $.CHERRY_PICK, tags: a ? a.filter(Boolean) : [`cherry-pick:${o.id}${o.type === $.MERGE ? `|parent:${s2}` : ""}`] };
    m2.records.head = p, m2.records.commits.set(p.id, p), m2.records.branches.set(m2.records.currBranch, p.id), pt.debug(m2.records.branches), pt.debug("in cherryPick");
  }
}, "cherryPick");
var $e = m(function(e) {
  if (e = Cn.sanitizeText(e, v()), m2.records.branches.has(e)) {
    m2.records.currBranch = e;
    let t = m2.records.branches.get(m2.records.currBranch);
    t === void 0 || !t ? m2.records.head = null : m2.records.head = m2.records.commits.get(t) ?? null;
  } else {
    let t = new Error(`Trying to checkout branch which is not yet created. (Help try using "branch ${e}")`);
    throw t.hash = { text: `checkout ${e}`, token: `checkout ${e}`, expected: [`branch ${e}`] }, t;
  }
}, "checkout");
function ye(e, t, r) {
  let a = e.indexOf(t);
  a === -1 ? e.push(r) : e.splice(a, 1, r);
}
m(ye, "upsert");
function ue(e) {
  let t = e.reduce((s2, c2) => s2.seq > c2.seq ? s2 : c2, e[0]), r = "";
  e.forEach(function(s2) {
    s2 === t ? r += "	*" : r += "	|";
  });
  let a = [r, t.id, t.seq];
  for (let s2 in m2.records.branches) m2.records.branches.get(s2) === t.id && a.push(s2);
  if (pt.debug(a.join(" ")), t.parents && t.parents.length == 2 && t.parents[0] && t.parents[1]) {
    let s2 = m2.records.commits.get(t.parents[0]);
    ye(e, t, s2), t.parents[1] && e.push(m2.records.commits.get(t.parents[1]));
  } else {
    if (t.parents.length == 0) return;
    if (t.parents[0]) {
      let s2 = m2.records.commits.get(t.parents[0]);
      ye(e, t, s2);
    }
  }
  e = Le(e, (s2) => s2.id), ue(e);
}
m(ue, "prettyPrintCommitHistory");
var He = m(function() {
  pt.debug(m2.records.commits);
  let e = xe()[0];
  ue([e]);
}, "prettyPrint");
var Se = m(function() {
  m2.reset(), os();
}, "clear");
var _e = m(function() {
  return [...m2.records.branchConfig.values()].map((t, r) => t.order !== null && t.order !== void 0 ? t : { ...t, order: parseFloat(`0.${r}`) }).sort((t, r) => (t.order ?? 0) - (r.order ?? 0)).map(({ name: t }) => ({ name: t }));
}, "getBranchesAsObjArray");
var qe = m(function() {
  return m2.records.branches;
}, "getBranches");
var We = m(function() {
  return m2.records.commits;
}, "getCommits");
var xe = m(function() {
  let e = [...m2.records.commits.values()];
  return e.forEach(function(t) {
    pt.debug(t.id);
  }), e.sort((t, r) => t.seq - r.seq), e;
}, "getCommitsArray");
var Ne = m(function() {
  return m2.records.currBranch;
}, "getCurrentBranch");
var je = m(function() {
  return m2.records.direction;
}, "getDirection");
var Fe = m(function() {
  return m2.records.head;
}, "getHead");
var F = { commitType: $, getConfig: v, setDirection: Ge, setOptions: Pe, getOptions: Oe, commit: Re, branch: ve, merge: Ae, cherryPick: Ie, checkout: $e, prettyPrint: He, clear: Se, getBranchesAsObjArray: _e, getBranches: qe, getCommits: We, getCommitsArray: xe, getCurrentBranch: Ne, getDirection: je, getHead: Fe, setAccTitle: es, getAccTitle: ss, getAccDescription: ls, setAccDescription: as, setDiagramTitle: hs, getDiagramTitle: ns };
var ze = m((e, t) => {
  c(e, t), e.dir && t.setDirection(e.dir);
  for (let r of e.statements) Ye(r, t);
}, "populate");
var Ye = m((e, t) => {
  let a = { Commit: m((s2) => t.commit(Ve(s2)), "Commit"), Branch: m((s2) => t.branch(Ke(s2)), "Branch"), Merge: m((s2) => t.merge(Ue(s2)), "Merge"), Checkout: m((s2) => t.checkout(Ze(s2)), "Checkout"), CherryPicking: m((s2) => t.cherryPick(Xe(s2)), "CherryPicking") }[e.$type];
  a ? a(e) : pt.error(`Unknown statement type: ${e.$type}`);
}, "parseStatement");
var Ve = m((e) => ({ id: e.id, msg: e.message ?? "", type: e.type !== void 0 ? $[e.type] : $.NORMAL, tags: e.tags ?? void 0 }), "parseCommit");
var Ke = m((e) => ({ name: e.name, order: e.order ?? 0 }), "parseBranch");
var Ue = m((e) => ({ branch: e.branch, id: e.id ?? "", type: e.type !== void 0 ? $[e.type] : void 0, tags: e.tags ?? void 0 }), "parseMerge");
var Ze = m((e) => e.branch, "parseCheckout");
var Xe = m((e) => {
  var _a;
  return { id: e.id, targetId: "", tags: ((_a = e.tags) == null ? void 0 : _a.length) === 0 ? void 0 : e.tags, parent: e.parent };
}, "parseCherryPicking");
var be = { parse: m(async (e) => {
  let t = await d("gitGraph", e);
  pt.debug(t), ze(t, F);
}, "parse") };
var O = 10;
var R = 40;
var D = 4;
var G = 2;
var A = 8;
var V = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color"]);
var X = 12;
var J = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]);
var Je = /* @__PURE__ */ new Set(["dark", "redux-dark", "redux-dark-color", "neo-dark"]);
var I = m((e, t, r = false) => r && e > 0 ? (e - 1) % (t - 1) + 1 : e % t, "calcColorIndex");
var w = /* @__PURE__ */ new Map();
var T = /* @__PURE__ */ new Map();
var z = 30;
var W = /* @__PURE__ */ new Map();
var Y = [];
var P = 0;
var y = "LR";
var Qe = m(() => {
  w.clear(), T.clear(), W.clear(), P = 0, Y = [], y = "LR";
}, "clear");
var Ce = m((e) => {
  let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  return (typeof e == "string" ? e.split(/\\n|\n|<br\s*\/?>/gi) : e).forEach((a) => {
    let s2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    s2.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), s2.setAttribute("dy", "1em"), s2.setAttribute("x", "0"), s2.setAttribute("class", "row"), s2.textContent = a.trim(), t.appendChild(s2);
  }), t;
}, "drawText");
var ke = m((e) => {
  let t, r, a;
  return y === "BT" ? (r = m((s2, c2) => s2 <= c2, "comparisonFunc"), a = 1 / 0) : (r = m((s2, c2) => s2 >= c2, "comparisonFunc"), a = 0), e.forEach((s2) => {
    var _a, _b;
    let c2 = y === "TB" || y == "BT" ? (_a = T.get(s2)) == null ? void 0 : _a.y : (_b = T.get(s2)) == null ? void 0 : _b.x;
    c2 !== void 0 && r(c2, a) && (t = s2, a = c2);
  }), t;
}, "findClosestParent");
var et = m((e) => {
  let t = "", r = 1 / 0;
  return e.forEach((a) => {
    let s2 = T.get(a).y;
    s2 <= r && (t = a, r = s2);
  }), t || void 0;
}, "findClosestParentBT");
var tt = m((e, t, r) => {
  let a = r, s2 = r, c2 = [];
  e.forEach((o) => {
    let n = t.get(o);
    if (!n) throw new Error(`Commit not found for key ${o}`);
    n.parents.length ? (a = nt(n), s2 = Math.max(a, s2)) : c2.push(n), ot(n, a);
  }), a = s2, c2.forEach((o) => {
    at(o, a, r);
  }), e.forEach((o) => {
    let n = t.get(o);
    if (n == null ? void 0 : n.parents.length) {
      let d2 = et(n.parents);
      a = T.get(d2).y - R, a <= s2 && (s2 = a);
      let l = w.get(n.branch).pos, p = a - O;
      T.set(n.id, { x: l, y: p });
    }
  });
}, "setParallelBTPos");
var rt = m((e) => {
  var _a;
  let t = ke(e.parents.filter((a) => a !== null));
  if (!t) throw new Error(`Closest parent not found for commit ${e.id}`);
  let r = (_a = T.get(t)) == null ? void 0 : _a.y;
  if (r === void 0) throw new Error(`Closest parent position not found for commit ${e.id}`);
  return r;
}, "findClosestParentPos");
var nt = m((e) => rt(e) + R, "calculateCommitPosition");
var ot = m((e, t) => {
  let r = w.get(e.branch);
  if (!r) throw new Error(`Branch not found for commit ${e.id}`);
  let a = r.pos, s2 = t + O;
  return T.set(e.id, { x: a, y: s2 }), { x: a, y: s2 };
}, "setCommitPosition");
var at = m((e, t, r) => {
  let a = w.get(e.branch);
  if (!a) throw new Error(`Branch not found for commit ${e.id}`);
  let s2 = t + r, c2 = a.pos;
  T.set(e.id, { x: c2, y: s2 });
}, "setRootPosition");
var st = m((e, t, r, a, s2, c2) => {
  let { theme: o } = qo(), n = V.has(o ?? ""), d2 = J.has(o ?? ""), l = Je.has(o ?? "");
  if (c2 === $.HIGHLIGHT) e.append("rect").attr("x", r.x - 10 + (n ? 3 : 0)).attr("y", r.y - 10 + (n ? 3 : 0)).attr("width", n ? 14 : 20).attr("height", n ? 14 : 20).attr("class", `commit ${t.id} commit-highlight${I(s2, A, d2)} ${a}-outer`), e.append("rect").attr("x", r.x - 6 + (n ? 2 : 0)).attr("y", r.y - 6 + (n ? 2 : 0)).attr("width", n ? 8 : 12).attr("height", n ? 8 : 12).attr("class", `commit ${t.id} commit${I(s2, A, d2)} ${a}-inner`);
  else if (c2 === $.CHERRY_PICK) e.append("circle").attr("cx", r.x).attr("cy", r.y).attr("r", n ? 7 : 10).attr("class", `commit ${t.id} ${a}`), e.append("circle").attr("cx", r.x - 3).attr("cy", r.y + 2).attr("r", n ? 2.5 : 2.75).attr("fill", l ? "#000000" : "#fff").attr("class", `commit ${t.id} ${a}`), e.append("circle").attr("cx", r.x + 3).attr("cy", r.y + 2).attr("r", n ? 2.5 : 2.75).attr("fill", l ? "#000000" : "#fff").attr("class", `commit ${t.id} ${a}`), e.append("line").attr("x1", r.x + 3).attr("y1", r.y + 1).attr("x2", r.x).attr("y2", r.y - 5).attr("stroke", l ? "#000000" : "#fff").attr("class", `commit ${t.id} ${a}`), e.append("line").attr("x1", r.x - 3).attr("y1", r.y + 1).attr("x2", r.x).attr("y2", r.y - 5).attr("stroke", l ? "#000000" : "#fff").attr("class", `commit ${t.id} ${a}`);
  else {
    let p = e.append("circle");
    if (p.attr("cx", r.x), p.attr("cy", r.y), p.attr("r", n ? 7 : 10), p.attr("class", `commit ${t.id} commit${I(s2, A, d2)}`), c2 === $.MERGE) {
      let g = e.append("circle");
      g.attr("cx", r.x), g.attr("cy", r.y), g.attr("r", n ? 5 : 6), g.attr("class", `commit ${a} ${t.id} commit${I(s2, A, d2)}`);
    }
    if (c2 === $.REVERSE) {
      let g = e.append("path"), i = n ? 4 : 5;
      g.attr("d", `M ${r.x - i},${r.y - i}L${r.x + i},${r.y + i}M${r.x - i},${r.y + i}L${r.x + i},${r.y - i}`).attr("class", `commit ${a} ${t.id} commit${I(s2, A, d2)}`);
    }
  }
}, "drawCommitBullet");
var it = m((e, t, r, a, s2) => {
  var _a;
  if (t.type !== $.CHERRY_PICK && (t.customId && t.type === $.MERGE || t.type !== $.MERGE) && s2.showCommitLabel) {
    let c2 = e.append("g"), o = c2.insert("rect").attr("class", "commit-label-bkg"), n = c2.append("text").attr("x", a).attr("y", r.y + 25).attr("class", "commit-label").text(t.id), d2 = (_a = n.node()) == null ? void 0 : _a.getBBox();
    if (d2 && (o.attr("x", r.posWithOffset - d2.width / 2 - G).attr("y", r.y + 13.5).attr("width", d2.width + 2 * G).attr("height", d2.height + 2 * G), y === "TB" || y === "BT" ? (o.attr("x", r.x - (d2.width + 4 * D + 5)).attr("y", r.y - 12), n.attr("x", r.x - (d2.width + 4 * D)).attr("y", r.y + d2.height - 12)) : n.attr("x", r.posWithOffset - d2.width / 2), s2.rotateCommitLabel)) if (y === "TB" || y === "BT") n.attr("transform", "rotate(-45, " + r.x + ", " + r.y + ")"), o.attr("transform", "rotate(-45, " + r.x + ", " + r.y + ")");
    else {
      let l = -7.5 - (d2.width + 10) / 25 * 9.5, p = 10 + d2.width / 25 * 8.5;
      c2.attr("transform", "translate(" + l + ", " + p + ") rotate(-45, " + a + ", " + r.y + ")");
    }
  }
}, "drawCommitLabel");
var ct = m((e, t, r, a) => {
  var _a;
  if (t.tags.length > 0) {
    let s2 = 0, c2 = 0, o = 0, n = [];
    for (let d2 of t.tags.reverse()) {
      let l = e.insert("polygon"), p = e.append("circle"), g = e.append("text").attr("y", r.y - 16 - s2).attr("class", "tag-label").text(d2), i = (_a = g.node()) == null ? void 0 : _a.getBBox();
      if (!i) throw new Error("Tag bbox not found");
      c2 = Math.max(c2, i.width), o = Math.max(o, i.height), g.attr("x", r.posWithOffset - i.width / 2), n.push({ tag: g, hole: p, rect: l, yOffset: s2 }), s2 += 20;
    }
    for (let { tag: d2, hole: l, rect: p, yOffset: g } of n) {
      let i = o / 2, u = r.y - 19.2 - g;
      if (p.attr("class", "tag-label-bkg").attr("points", `
      ${a - c2 / 2 - D / 2},${u + G}  
      ${a - c2 / 2 - D / 2},${u - G}
      ${r.posWithOffset - c2 / 2 - D},${u - i - G}
      ${r.posWithOffset + c2 / 2 + D},${u - i - G}
      ${r.posWithOffset + c2 / 2 + D},${u + i + G}
      ${r.posWithOffset - c2 / 2 - D},${u + i + G}`), l.attr("cy", u).attr("cx", a - c2 / 2 + D / 2).attr("r", 1.5).attr("class", "tag-hole"), y === "TB" || y === "BT") {
        let f = a + g;
        p.attr("class", "tag-label-bkg").attr("points", `
        ${r.x},${f + 2}
        ${r.x},${f - 2}
        ${r.x + O},${f - i - 2}
        ${r.x + O + c2 + 4},${f - i - 2}
        ${r.x + O + c2 + 4},${f + i + 2}
        ${r.x + O},${f + i + 2}`).attr("transform", "translate(12,12) rotate(45, " + r.x + "," + a + ")"), l.attr("cx", r.x + D / 2).attr("cy", f).attr("transform", "translate(12,12) rotate(45, " + r.x + "," + a + ")"), d2.attr("x", r.x + 5).attr("y", f + 3).attr("transform", "translate(14,14) rotate(45, " + r.x + "," + a + ")");
      }
    }
  }
}, "drawCommitTags");
var mt = m((e) => {
  switch (e.customType ?? e.type) {
    case $.NORMAL:
      return "commit-normal";
    case $.REVERSE:
      return "commit-reverse";
    case $.HIGHLIGHT:
      return "commit-highlight";
    case $.MERGE:
      return "commit-merge";
    case $.CHERRY_PICK:
      return "commit-cherry-pick";
    default:
      return "commit-normal";
  }
}, "getCommitClassType");
var dt = m((e, t, r, a) => {
  let s2 = { x: 0, y: 0 };
  if (e.parents.length > 0) {
    let c2 = ke(e.parents);
    if (c2) {
      let o = a.get(c2) ?? s2;
      return t === "TB" ? o.y + R : t === "BT" ? (a.get(e.id) ?? s2).y - R : o.x + R;
    }
  } else return t === "TB" ? z : t === "BT" ? (a.get(e.id) ?? s2).y - R : 0;
  return 0;
}, "calculatePosition");
var ht = m((e, t, r) => {
  var _a, _b;
  let a = y === "BT" && r ? t : t + O, s2 = (_a = w.get(e.branch)) == null ? void 0 : _a.pos, c2 = y === "TB" || y === "BT" ? (_b = w.get(e.branch)) == null ? void 0 : _b.pos : a;
  if (c2 === void 0 || s2 === void 0) throw new Error(`Position were undefined for commit ${e.id}`);
  let o = V.has(qo().theme ?? ""), n = y === "TB" || y === "BT" ? a : s2 + (o ? X / 2 + 1 : -2);
  return { x: c2, y: n, posWithOffset: a };
}, "getCommitPosition");
var Be = m((e, t, r, a) => {
  let s2 = e.append("g").attr("class", "commit-bullets"), c2 = e.append("g").attr("class", "commit-labels"), o = y === "TB" || y === "BT" ? z : 0, n = [...t.keys()], d2 = a.parallelCommits ?? false, l = m((g, i) => {
    var _a, _b;
    let u = (_a = t.get(g)) == null ? void 0 : _a.seq, f = (_b = t.get(i)) == null ? void 0 : _b.seq;
    return u !== void 0 && f !== void 0 ? u - f : 0;
  }, "sortKeys"), p = n.sort(l);
  y === "BT" && (d2 && tt(p, t, o), p = p.reverse()), p.forEach((g) => {
    var _a;
    let i = t.get(g);
    if (!i) throw new Error(`Commit not found for key ${g}`);
    d2 && (o = dt(i, y, o, T));
    let u = ht(i, o, d2);
    if (r) {
      let f = mt(i), x = i.customType ?? i.type, b = ((_a = w.get(i.branch)) == null ? void 0 : _a.index) ?? 0;
      st(s2, i, u, f, b, x), it(c2, i, u, o, a), ct(c2, i, u, o);
    }
    y === "TB" || y === "BT" ? T.set(i.id, { x: u.x, y: u.posWithOffset }) : T.set(i.id, { x: u.posWithOffset, y: u.y }), o = y === "BT" && d2 ? o + R : o + R + O, o > P && (P = o);
  });
}, "drawCommits");
var gt = m((e, t, r, a, s2) => {
  let o = (y === "TB" || y === "BT" ? r.x < a.x : r.y < a.y) ? t.branch : e.branch, n = m((l) => l.branch === o, "isOnBranchToGetCurve"), d2 = m((l) => l.seq > e.seq && l.seq < t.seq, "isBetweenCommits");
  return [...s2.values()].some((l) => d2(l) && n(l));
}, "shouldRerouteArrow");
var N = m((e, t, r = 0) => {
  let a = e + Math.abs(e - t) / 2;
  if (r > 5) return a;
  if (Y.every((o) => Math.abs(o - a) >= 10)) return Y.push(a), a;
  let c2 = Math.abs(e - t);
  return N(e, t - c2 / 5, r + 1);
}, "findLane");
var lt = m((e, t, r, a) => {
  var _a, _b, _c, _d, _e2;
  let { theme: s2 } = qo(), c2 = J.has(s2 ?? ""), o = T.get(t.id), n = T.get(r.id);
  if (o === void 0 || n === void 0) throw new Error(`Commit positions not found for commits ${t.id} and ${r.id}`);
  let d2 = gt(t, r, o, n, a), l = "", p = "", g = 0, i = 0, u = (_a = w.get(r.branch)) == null ? void 0 : _a.index;
  r.type === $.MERGE && t.id !== r.parents[0] && (u = (_b = w.get(t.branch)) == null ? void 0 : _b.index);
  let f;
  if (d2) {
    l = "A 10 10, 0, 0, 0,", p = "A 10 10, 0, 0, 1,", g = 10, i = 10;
    let x = o.y < n.y ? N(o.y, n.y) : N(n.y, o.y), b = o.x < n.x ? N(o.x, n.x) : N(n.x, o.x);
    y === "TB" ? o.x < n.x ? f = `M ${o.x} ${o.y} L ${b - g} ${o.y} ${p} ${b} ${o.y + i} L ${b} ${n.y - g} ${l} ${b + i} ${n.y} L ${n.x} ${n.y}` : (u = (_c = w.get(t.branch)) == null ? void 0 : _c.index, f = `M ${o.x} ${o.y} L ${b + g} ${o.y} ${l} ${b} ${o.y + i} L ${b} ${n.y - g} ${p} ${b - i} ${n.y} L ${n.x} ${n.y}`) : y === "BT" ? o.x < n.x ? f = `M ${o.x} ${o.y} L ${b - g} ${o.y} ${l} ${b} ${o.y - i} L ${b} ${n.y + g} ${p} ${b + i} ${n.y} L ${n.x} ${n.y}` : (u = (_d = w.get(t.branch)) == null ? void 0 : _d.index, f = `M ${o.x} ${o.y} L ${b + g} ${o.y} ${p} ${b} ${o.y - i} L ${b} ${n.y + g} ${l} ${b - i} ${n.y} L ${n.x} ${n.y}`) : o.y < n.y ? f = `M ${o.x} ${o.y} L ${o.x} ${x - g} ${l} ${o.x + i} ${x} L ${n.x - g} ${x} ${p} ${n.x} ${x + i} L ${n.x} ${n.y}` : (u = (_e2 = w.get(t.branch)) == null ? void 0 : _e2.index, f = `M ${o.x} ${o.y} L ${o.x} ${x + g} ${p} ${o.x + i} ${x} L ${n.x - g} ${x} ${l} ${n.x} ${x - i} L ${n.x} ${n.y}`);
  } else l = "A 20 20, 0, 0, 0,", p = "A 20 20, 0, 0, 1,", g = 20, i = 20, y === "TB" ? (o.x < n.x && (r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${o.x} ${n.y - g} ${l} ${o.x + i} ${n.y} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${n.x - g} ${o.y} ${p} ${n.x} ${o.y + i} L ${n.x} ${n.y}`), o.x > n.x && (l = "A 20 20, 0, 0, 0,", p = "A 20 20, 0, 0, 1,", g = 20, i = 20, r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${o.x} ${n.y - g} ${p} ${o.x - i} ${n.y} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${n.x + g} ${o.y} ${l} ${n.x} ${o.y + i} L ${n.x} ${n.y}`), o.x === n.x && (f = `M ${o.x} ${o.y} L ${n.x} ${n.y}`)) : y === "BT" ? (o.x < n.x && (r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${o.x} ${n.y + g} ${p} ${o.x + i} ${n.y} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${n.x - g} ${o.y} ${l} ${n.x} ${o.y - i} L ${n.x} ${n.y}`), o.x > n.x && (l = "A 20 20, 0, 0, 0,", p = "A 20 20, 0, 0, 1,", g = 20, i = 20, r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${o.x} ${n.y + g} ${l} ${o.x - i} ${n.y} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${n.x + g} ${o.y} ${p} ${n.x} ${o.y - i} L ${n.x} ${n.y}`), o.x === n.x && (f = `M ${o.x} ${o.y} L ${n.x} ${n.y}`)) : (o.y < n.y && (r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${n.x - g} ${o.y} ${p} ${n.x} ${o.y + i} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${o.x} ${n.y - g} ${l} ${o.x + i} ${n.y} L ${n.x} ${n.y}`), o.y > n.y && (r.type === $.MERGE && t.id !== r.parents[0] ? f = `M ${o.x} ${o.y} L ${n.x - g} ${o.y} ${l} ${n.x} ${o.y - i} L ${n.x} ${n.y}` : f = `M ${o.x} ${o.y} L ${o.x} ${n.y + g} ${p} ${o.x + i} ${n.y} L ${n.x} ${n.y}`), o.y === n.y && (f = `M ${o.x} ${o.y} L ${n.x} ${n.y}`));
  if (f === void 0) throw new Error("Line definition not found");
  e.append("path").attr("d", f).attr("class", "arrow arrow" + I(u, A, c2));
}, "drawArrow");
var pt2 = m((e, t) => {
  let r = e.append("g").attr("class", "commit-arrows");
  [...t.keys()].forEach((a) => {
    let s2 = t.get(a);
    s2.parents && s2.parents.length > 0 && s2.parents.forEach((c2) => {
      lt(r, t.get(c2), s2, t);
    });
  });
}, "drawArrows");
var ft = m((e, t, r, a) => {
  let { look: s2, theme: c2, themeVariables: o } = qo(), { dropShadow: n, THEME_COLOR_LIMIT: d2 } = o, l = V.has(c2 ?? ""), p = J.has(c2 ?? ""), g = e.append("g");
  t.forEach((i, u) => {
    var _a;
    let f = I(u, l ? d2 : A, p), x = (_a = w.get(i.name)) == null ? void 0 : _a.pos;
    if (x === void 0) throw new Error(`Position not found for branch ${i.name}`);
    let b = y === "TB" || y === "BT" ? x : l ? x + X / 2 + 1 : x - 2, C = g.append("line");
    C.attr("x1", 0), C.attr("y1", b), C.attr("x2", P), C.attr("y2", b), C.attr("class", "branch branch" + f), y === "TB" ? (C.attr("y1", z), C.attr("x1", x), C.attr("y2", P), C.attr("x2", x)) : y === "BT" && (C.attr("y1", P), C.attr("x1", x), C.attr("y2", z), C.attr("x2", x)), Y.push(b);
    let K = i.name, _ = Ce(K), M = g.insert("rect"), L = g.insert("g").attr("class", "branchLabel").insert("g").attr("class", "label branch-label" + f);
    L.node().appendChild(_);
    let k = _.getBBox(), Q = l ? 0 : 4, j = l ? 16 : 0, H = l ? X : 0;
    s2 === "neo" && M.attr("data-look", "neo"), M.attr("class", "branchLabelBkg label" + f).attr("style", s2 === "neo" ? `filter:${l ? `url(#${a}-drop-shadow)` : n}` : "").attr("rx", Q).attr("ry", Q).attr("x", -k.width - 4 - (r.rotateCommitLabel === true ? 30 : 0)).attr("y", -k.height / 2 + 10).attr("width", k.width + 18 + j).attr("height", k.height + 4 + H), L.attr("transform", "translate(" + (-k.width - 14 - (r.rotateCommitLabel === true ? 30 : 0) + j / 2) + ", " + (b - k.height / 2 - 2) + ")"), y === "TB" ? (M.attr("x", x - k.width / 2 - 10).attr("y", 0), L.attr("transform", "translate(" + (x - k.width / 2 - 5) + ", 0)"), l && (M.attr("transform", `translate(${-j / 2 - 3}, ${-H - 10})`), L.attr("transform", "translate(" + (x - k.width / 2 - 5) + ", " + (-H * 2 + 7) + ")"))) : y === "BT" ? (M.attr("x", x - k.width / 2 - 10).attr("y", P), L.attr("transform", "translate(" + (x - k.width / 2 - 5) + ", " + P + ")"), l && (M.attr("transform", `translate(${-j / 2 - 3}, ${H + 10})`), L.attr("transform", "translate(" + (x - k.width / 2 - 5) + ", " + (P + H * 2 + 4) + ")"))) : M.attr("transform", "translate(-19, " + (b - 12 - H / 2) + ")");
  });
}, "drawBranches");
var yt = m(function(e, t, r, a, s2) {
  return w.set(e, { pos: t, index: r }), t += 50 + (s2 ? 40 : 0) + (y === "TB" || y === "BT" ? a.width / 2 : 0), t;
}, "setBranchPosition");
var $t = m(function(e, t, r, a) {
  Qe(), pt.debug("in gitgraph renderer", e + `
`, "id:", t, r);
  let s2 = a.db;
  if (!s2.getConfig) {
    pt.error("getConfig method is not available on db");
    return;
  }
  let c2 = s2.getConfig(), o = c2.rotateCommitLabel ?? false;
  W = s2.getCommits();
  let n = s2.getBranchesAsObjArray();
  y = s2.getDirection();
  let d2 = ia(`[id="${t}"]`), { look: l, theme: p, themeVariables: g } = qo(), { useGradient: i, gradientStart: u, gradientStop: f, filterColor: x } = g;
  if (i) {
    let C = d2.append("defs").append("linearGradient").attr("id", t + "-gradient").attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    C.append("stop").attr("offset", "0%").attr("stop-color", u).attr("stop-opacity", 1), C.append("stop").attr("offset", "100%").attr("stop-color", f).attr("stop-opacity", 1);
  }
  l === "neo" && V.has(p ?? "") && d2.append("defs").append("filter").attr("id", t + "-drop-shadow").attr("height", "130%").attr("width", "130%").append("feDropShadow").attr("dx", "4").attr("dy", "4").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", x);
  let b = 0;
  n.forEach((C, K) => {
    var _a;
    let _ = Ce(C.name), M = d2.append("g"), U = M.insert("g").attr("class", "branchLabel"), L = U.insert("g").attr("class", "label branch-label");
    (_a = L.node()) == null ? void 0 : _a.appendChild(_);
    let k = _.getBBox();
    b = yt(C.name, b, K, k, o), L.remove(), U.remove(), M.remove();
  }), Be(d2, W, false, c2), c2.showBranches && ft(d2, n, c2, t), pt2(d2, W), Be(d2, W, true, c2), Ut.insertTitle(d2, "gitTitleText", c2.titleTopMargin ?? 0, s2.getDiagramTitle()), Cs(void 0, d2, c2.diagramPadding, c2.useMaxWidth);
}, "draw");
var we = { draw: $t };
var Te = 8;
var Ee = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color"]);
var ut = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]);
var xt = /* @__PURE__ */ new Set(["neo", "neo-dark"]);
var bt = /* @__PURE__ */ new Set(["dark", "redux-dark", "redux-dark-color", "neo-dark"]);
var Bt = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color", "neo", "neo-dark"]);
var Ct = m((e) => {
  let { svgId: t } = e, r = "";
  if (e.useGradient && t) for (let a = 0; a < e.THEME_COLOR_LIMIT; a++) r += `
      .label${a}  { fill: ${e.mainBkg}; stroke: url(${t}-gradient); stroke-width: ${e.strokeWidth};}
             `;
  return r;
}, "genGitGraphGradient");
var kt = m((e) => {
  let t = Ot(), { theme: r, themeVariables: a } = t, { borderColorArray: s2 } = a, c2 = Ee.has(r);
  if (xt.has(r)) {
    let o = "";
    for (let n = 0; n < e.THEME_COLOR_LIMIT; n++) if (n === 0) o += `
        .branch-label${n} { fill: ${e.nodeBorder};}
        .commit${n} { stroke: ${e.nodeBorder};   }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.nodeBorder}; }
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        .commit-cherry-pick${n} { stroke: ${e.nodeBorder}; }
        ${Ct(e)}`;
    else {
      let d2 = n % Te;
      o += `
        .branch-label${n} { fill: ${e["gitBranchLabel" + d2]}; }
        .commit${n} { stroke: ${e["git" + d2]}; fill: ${e["git" + d2]}; }
        .commit-highlight${n} { stroke: ${e["gitInv" + d2]}; fill: ${e["gitInv" + d2]}; }
        .arrow${n} { stroke: ${e["git" + d2]}; }
        `;
    }
    return o;
  } else if (ut.has(r)) {
    let o = "";
    for (let n = 0; n < e.THEME_COLOR_LIMIT; n++) if (n === 0) o += `
        .branch-label${n} { fill: ${e.nodeBorder}; ${c2 ? `font-weight:${e.noteFontWeight}` : ""} }
        .commit${n} { stroke: ${e.nodeBorder}; }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.mainBkg}; }
        .label${n}  { fill: ${e.mainBkg}; stroke: ${e.nodeBorder}; stroke-width: ${e.strokeWidth}; ${c2 ? `font-weight:${e.noteFontWeight}` : ""} }
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        `;
    else {
      let d2 = n % s2.length;
      o += `
        .branch-label${n} { fill: ${e.nodeBorder}; ${c2 ? `font-weight:${e.noteFontWeight}` : ""} }
        .commit${n} { stroke: ${s2[d2]}; fill: ${s2[d2]}; }
        .commit-highlight${n} { stroke: ${s2[d2]}; fill: ${s2[d2]}; }
        .label${n}  { fill: ${bt.has(r) ? e.mainBkg : s2[d2]}; stroke: ${s2[d2]};  stroke-width: ${e.strokeWidth}; }
        .arrow${n} { stroke: ${s2[d2]}; }
        `;
    }
    return o;
  } else {
    let o = "";
    for (let n = 0; n < e.THEME_COLOR_LIMIT; n++) o += `
        .branch-label${n} { fill: ${e.nodeBorder}; ${c2 ? `font-weight:${e.noteFontWeight}` : ""} }
        .commit${n} { stroke: ${e.nodeBorder};   }
        .commit-highlight${n} { stroke: ${e.nodeBorder}; fill: ${e.nodeBorder}; }
        .label${n}  { fill: ${e.mainBkg}; stroke: ${e.nodeBorder}; stroke-width: ${e.strokeWidth}; ${c2 ? `font-weight:${e.noteFontWeight}` : ""}}
        .arrow${n} { stroke: ${e.nodeBorder}; }
        .commit-bullets { fill: ${e.nodeBorder}; }
        .commit-cherry-pick${n} { stroke: ${e.nodeBorder}; }
        `;
    return o;
  }
}, "genColor");
var wt2 = m((e) => `${Array.from({ length: e.THEME_COLOR_LIMIT }, (t, r) => r).map((t) => {
  let r = t % Te;
  return `
        .branch-label${t} { fill: ${e["gitBranchLabel" + r]}; }
        .commit${t} { stroke: ${e["git" + r]}; fill: ${e["git" + r]}; }
        .commit-highlight${t} { stroke: ${e["gitInv" + r]}; fill: ${e["gitInv" + r]}; }
        .label${t}  { fill: ${e["git" + r]}; }
        .arrow${t} { stroke: ${e["git" + r]}; }
        `;
}).join(`
`)}`, "normalTheme");
var Tt = m((e) => {
  let t = Ot(), { theme: r } = t, a = Bt.has(r);
  return `
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  
  ${a ? kt(e) : wt2(e)}

  .branch {
    stroke-width: ${e.strokeWidth};
    stroke: ${e.commitLineColor ?? e.lineColor};
    stroke-dasharray:  ${a ? "4 2" : "2"};
  }
  .commit-label { font-size: ${e.commitLabelFontSize}; fill: ${a ? e.nodeBorder : e.commitLabelColor}; ${a ? `font-weight:${e.noteFontWeight};` : ""}}
  .commit-label-bkg { font-size: ${e.commitLabelFontSize}; fill: ${a ? "transparent" : e.commitLabelBackground}; opacity: ${a ? "" : 0.5};  }
  .tag-label { font-size: ${e.tagLabelFontSize}; fill: ${e.tagLabelColor};}
  .tag-label-bkg { fill: ${a ? e.mainBkg : e.tagLabelBackground}; stroke: ${a ? e.nodeBorder : e.tagLabelBorder}; ${a ? `filter:${e.dropShadow}` : ""}  }
  .tag-hole { fill: ${e.textColor}; }

  .commit-merge {
    stroke: ${a ? e.mainBkg : e.primaryColor};
    fill: ${a ? e.mainBkg : e.primaryColor};
  }
  .commit-reverse {
    stroke: ${a ? e.mainBkg : e.primaryColor};
    fill: ${a ? e.mainBkg : e.primaryColor};
    stroke-width: ${a ? e.strokeWidth : 3};
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${a ? e.mainBkg : e.primaryColor};
    fill: ${a ? e.mainBkg : e.primaryColor};
  }

  .arrow {
    /* Intentional: neo themes keep the bold 8px arrow (like classic themes); only redux-geometry themes use the thinner options.strokeWidth. */
    stroke-width: ${Ee.has(r) ? e.strokeWidth : 8};
    stroke-linecap: round;
    fill: none
  }
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`;
}, "getStyles");
var Me = Tt;
var or = { parser: be, db: F, renderer: we, styles: Me };
export {
  or as diagram
};
//# sourceMappingURL=gitGraphDiagram-3HKGZ4G3-SRPB2HZV.js.map

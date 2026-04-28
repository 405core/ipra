import {
  c
} from "./chunk-S3XR4SNL.js";
import {
  d as d2
} from "./chunk-PG2EBXFX.js";
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
  d
} from "./chunk-4S3GMVOJ.js";
import {
  Lt
} from "./chunk-DZJA65GQ.js";
import "./chunk-DJX4MEFN.js";
import {
  Ot,
  Ur,
  as,
  es,
  hs,
  is,
  ls,
  ns,
  oo,
  os,
  ss
} from "./chunk-HPIGS4CQ.js";
import {
  pt
} from "./chunk-LKDN26KO.js";
import "./chunk-TIOLQL7Q.js";
import "./chunk-EQAKJMPU.js";
import {
  m
} from "./chunk-NOL3LC7I.js";
import "./chunk-V6TY7KAL.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/diagram-H7BISOXX.mjs
var f = { showLegend: true, ticks: 5, max: null, min: 0, graticule: "circle" };
var k = { axes: [], curves: [], options: f };
var g = structuredClone(k);
var q = oo.radar;
var W = m(() => Lt({ ...q, ...Ot().radar }), "getConfig");
var E = m(() => g.axes, "getAxes");
var H = m(() => g.curves, "getCurves");
var N = m(() => g.options, "getOptions");
var U = m((e) => {
  g.axes = e.map((t) => ({ name: t.name, label: t.label ?? t.name }));
}, "setAxes");
var X = m((e) => {
  g.curves = e.map((t) => ({ name: t.name, label: t.label ?? t.name, entries: Y(t.entries) }));
}, "setCurves");
var Y = m((e) => {
  if (e[0].axis == null) return e.map((r) => r.value);
  let t = E();
  if (t.length === 0) throw new Error("Axes must be populated before curves for reference entries");
  return t.map((r) => {
    let a = e.find((o) => {
      var _a;
      return ((_a = o.axis) == null ? void 0 : _a.$refText) === r.name;
    });
    if (a === void 0) throw new Error("Missing entry for axis " + r.label);
    return a.value;
  });
}, "computeCurveEntries");
var Z = m((e) => {
  var _a, _b, _c, _d, _e;
  let t = e.reduce((r, a) => (r[a.name] = a, r), {});
  g.options = { showLegend: ((_a = t.showLegend) == null ? void 0 : _a.value) ?? f.showLegend, ticks: ((_b = t.ticks) == null ? void 0 : _b.value) ?? f.ticks, max: ((_c = t.max) == null ? void 0 : _c.value) ?? f.max, min: ((_d = t.min) == null ? void 0 : _d.value) ?? f.min, graticule: ((_e = t.graticule) == null ? void 0 : _e.value) ?? f.graticule };
}, "setOptions");
var J = m(() => {
  os(), g = structuredClone(k);
}, "clear");
var x = { getAxes: E, getCurves: H, getOptions: N, setAxes: U, setCurves: X, setOptions: Z, getConfig: W, clear: J, setAccTitle: es, getAccTitle: ss, setDiagramTitle: hs, getDiagramTitle: ns, getAccDescription: ls, setAccDescription: as };
var K = m((e) => {
  c(e, x);
  let { axes: t, curves: r, options: a } = e;
  x.setAxes(t), x.setCurves(r), x.setOptions(a);
}, "populate");
var I = { parse: m(async (e) => {
  let t = await d2("radar", e);
  pt.debug(t), K(t);
}, "parse") };
var Q = m((e, t, r, a) => {
  let o = a.db, s = o.getAxes(), m2 = o.getCurves(), n = o.getOptions(), l = o.getConfig(), c2 = o.getDiagramTitle(), d3 = d(t), p = tt(d3, l), u = n.max ?? Math.max(...m2.map((b) => Math.max(...b.entries))), h = n.min, y = Math.min(l.width, l.height) / 2;
  rt(p, s, y, n.ticks, n.graticule), et(p, s, y, l), at(p, s, m2, h, u, n.graticule, l), it(p, m2, n.showLegend, l), p.append("text").attr("class", "radarTitle").text(c2).attr("x", 0).attr("y", -l.height / 2 - l.marginTop);
}, "draw");
var tt = m((e, t) => {
  let r = t.width + t.marginLeft + t.marginRight, a = t.height + t.marginTop + t.marginBottom, o = { x: t.marginLeft + t.width / 2, y: t.marginTop + t.height / 2 };
  return is(e, a, r, t.useMaxWidth ?? true), e.attr("viewBox", `0 0 ${r} ${a}`), e.append("g").attr("transform", `translate(${o.x}, ${o.y})`);
}, "drawFrame");
var rt = m((e, t, r, a, o) => {
  if (o === "circle") for (let s = 0; s < a; s++) {
    let m2 = r * (s + 1) / a;
    e.append("circle").attr("r", m2).attr("class", "radarGraticule");
  }
  else if (o === "polygon") {
    let s = t.length;
    for (let m2 = 0; m2 < a; m2++) {
      let n = r * (m2 + 1) / a, l = t.map((c2, d3) => {
        let p = 2 * d3 * Math.PI / s - Math.PI / 2, u = n * Math.cos(p), h = n * Math.sin(p);
        return `${u},${h}`;
      }).join(" ");
      e.append("polygon").attr("points", l).attr("class", "radarGraticule");
    }
  }
}, "drawGraticule");
var et = m((e, t, r, a) => {
  let o = t.length;
  for (let s = 0; s < o; s++) {
    let m2 = t[s].label, n = 2 * s * Math.PI / o - Math.PI / 2;
    e.append("line").attr("x1", 0).attr("y1", 0).attr("x2", r * a.axisScaleFactor * Math.cos(n)).attr("y2", r * a.axisScaleFactor * Math.sin(n)).attr("class", "radarAxisLine"), e.append("text").text(m2).attr("x", r * a.axisLabelFactor * Math.cos(n)).attr("y", r * a.axisLabelFactor * Math.sin(n)).attr("class", "radarAxisLabel");
  }
}, "drawAxes");
function at(e, t, r, a, o, s, m2) {
  let n = t.length, l = Math.min(m2.width, m2.height) / 2;
  r.forEach((c2, d3) => {
    if (c2.entries.length !== n) return;
    let p = c2.entries.map((u, h) => {
      let y = 2 * Math.PI * h / n - Math.PI / 2, b = ot(u, a, o, l), _ = b * Math.cos(y), z = b * Math.sin(y);
      return { x: _, y: z };
    });
    s === "circle" ? e.append("path").attr("d", nt(p, m2.curveTension)).attr("class", `radarCurve-${d3}`) : s === "polygon" && e.append("polygon").attr("points", p.map((u) => `${u.x},${u.y}`).join(" ")).attr("class", `radarCurve-${d3}`);
  });
}
m(at, "drawCurves");
function ot(e, t, r, a) {
  let o = Math.min(Math.max(e, t), r);
  return a * (o - t) / (r - t);
}
m(ot, "relativeRadius");
function nt(e, t) {
  let r = e.length, a = `M${e[0].x},${e[0].y}`;
  for (let o = 0; o < r; o++) {
    let s = e[(o - 1 + r) % r], m2 = e[o], n = e[(o + 1) % r], l = e[(o + 2) % r], c2 = { x: m2.x + (n.x - s.x) * t, y: m2.y + (n.y - s.y) * t }, d3 = { x: n.x - (l.x - m2.x) * t, y: n.y - (l.y - m2.y) * t };
    a += ` C${c2.x},${c2.y} ${d3.x},${d3.y} ${n.x},${n.y}`;
  }
  return `${a} Z`;
}
m(nt, "closedRoundCurve");
function it(e, t, r, a) {
  if (!r) return;
  let o = (a.width / 2 + a.marginRight) * 3 / 4, s = -(a.height / 2 + a.marginTop) * 3 / 4, m2 = 20;
  t.forEach((n, l) => {
    let c2 = e.append("g").attr("transform", `translate(${o}, ${s + l * m2})`);
    c2.append("rect").attr("width", 12).attr("height", 12).attr("class", `radarLegendBox-${l}`), c2.append("text").attr("x", 16).attr("y", 0).attr("class", "radarLegendText").text(n.label);
  });
}
m(it, "drawLegend");
var F = { draw: Q };
var st = m((e, t) => {
  let r = "";
  for (let a = 0; a < e.THEME_COLOR_LIMIT; a++) {
    let o = e[`cScale${a}`];
    r += `
		.radarCurve-${a} {
			color: ${o};
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${a} {
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
		}
		`;
  }
  return r;
}, "genIndexStyles");
var mt = m((e) => {
  let t = Ur(), r = Ot(), a = Lt(t, r.themeVariables), o = Lt(a.radar, e);
  return { themeVariables: a, radarOptions: o };
}, "buildRadarStyleOptions");
var B = m(({ radar: e } = {}) => {
  let { themeVariables: t, radarOptions: r } = mt(e);
  return `
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${r.axisColor};
		stroke-width: ${r.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${r.axisLabelFontSize}px;
		color: ${r.axisColor};
	}
	.radarGraticule {
		fill: ${r.graticuleColor};
		fill-opacity: ${r.graticuleOpacity};
		stroke: ${r.graticuleColor};
		stroke-width: ${r.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${r.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${st(t, r)}
	`;
}, "styles");
var Vt = { parser: I, db: x, renderer: F, styles: B };
export {
  Vt as diagram
};
//# sourceMappingURL=diagram-H7BISOXX-GXWRP2YE.js.map

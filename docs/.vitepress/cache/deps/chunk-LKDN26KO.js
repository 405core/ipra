import {
  m,
  o,
  r
} from "./chunk-NOL3LC7I.js";

// node_modules/.pnpm/mermaid@11.14.0/node_modules/mermaid/dist/chunks/mermaid.esm.min/chunk-MGPAVIPZ.mjs
var Bo = o((fr, lr) => {
  "use strict";
  (function(t10, e) {
    typeof fr == "object" && typeof lr < "u" ? lr.exports = e() : typeof define == "function" && define.amd ? define(e) : (t10 = typeof globalThis < "u" ? globalThis : t10 || self).dayjs = e();
  })(fr, function() {
    "use strict";
    var t10 = 1e3, e = 6e4, n = 36e5, i = "millisecond", o2 = "second", a = "minute", s = "hour", u = "day", l = "week", f = "month", h = "quarter", p = "year", c = "date", m2 = "Invalid Date", _ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, M = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: m(function(v) {
      var d = ["th", "st", "nd", "rd"], x = v % 100;
      return "[" + v + (d[(x - 20) % 10] || d[x] || d[0]) + "]";
    }, "ordinal") }, k = m(function(v, d, x) {
      var S = String(v);
      return !S || S.length >= d ? v : "" + Array(d + 1 - S.length).join(x) + v;
    }, "m"), I = { s: k, z: m(function(v) {
      var d = -v.utcOffset(), x = Math.abs(d), S = Math.floor(x / 60), y = x % 60;
      return (d <= 0 ? "+" : "-") + k(S, 2, "0") + ":" + k(y, 2, "0");
    }, "z"), m: m(function v(d, x) {
      if (d.date() < x.date()) return -v(x, d);
      var S = 12 * (x.year() - d.year()) + (x.month() - d.month()), y = d.clone().add(S, f), D = x - y < 0, $ = d.clone().add(S + (D ? -1 : 1), f);
      return +(-(S + (x - y) / (D ? y - $ : $ - y)) || 0);
    }, "t"), a: m(function(v) {
      return v < 0 ? Math.ceil(v) || 0 : Math.floor(v);
    }, "a"), p: m(function(v) {
      return { M: f, y: p, w: l, d: u, D: c, h: s, m: a, s: o2, ms: i, Q: h }[v] || String(v || "").toLowerCase().replace(/s$/, "");
    }, "p"), u: m(function(v) {
      return v === void 0;
    }, "u") }, C = "en", A = {};
    A[C] = T;
    var O = "$isDayjsObject", w = m(function(v) {
      return v instanceof B || !(!v || !v[O]);
    }, "S"), Y = m(function v(d, x, S) {
      var y;
      if (!d) return C;
      if (typeof d == "string") {
        var D = d.toLowerCase();
        A[D] && (y = D), x && (A[D] = x, y = D);
        var $ = d.split("-");
        if (!y && $.length > 1) return v($[0]);
      } else {
        var P = d.name;
        A[P] = d, y = P;
      }
      return !S && y && (C = y), y || !S && C;
    }, "t"), U = m(function(v, d) {
      if (w(v)) return v.clone();
      var x = typeof d == "object" ? d : {};
      return x.date = v, x.args = arguments, new B(x);
    }, "O"), E = I;
    E.l = Y, E.i = w, E.w = function(v, d) {
      return U(v, { locale: d.$L, utc: d.$u, x: d.$x, $offset: d.$offset });
    };
    var B = function() {
      function v(x) {
        this.$L = Y(x.locale, null, true), this.parse(x), this.$x = this.$x || x.x || {}, this[O] = true;
      }
      m(v, "M");
      var d = v.prototype;
      return d.parse = function(x) {
        this.$d = function(S) {
          var y = S.date, D = S.utc;
          if (y === null) return /* @__PURE__ */ new Date(NaN);
          if (E.u(y)) return /* @__PURE__ */ new Date();
          if (y instanceof Date) return new Date(y);
          if (typeof y == "string" && !/Z$/i.test(y)) {
            var $ = y.match(_);
            if ($) {
              var P = $[2] - 1 || 0, z = ($[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC($[1], P, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, z)) : new Date($[1], P, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, z);
            }
          }
          return new Date(y);
        }(x), this.init();
      }, d.init = function() {
        var x = this.$d;
        this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
      }, d.$utils = function() {
        return E;
      }, d.isValid = function() {
        return this.$d.toString() !== m2;
      }, d.isSame = function(x, S) {
        var y = U(x);
        return this.startOf(S) <= y && y <= this.endOf(S);
      }, d.isAfter = function(x, S) {
        return U(x) < this.startOf(S);
      }, d.isBefore = function(x, S) {
        return this.endOf(S) < U(x);
      }, d.$g = function(x, S, y) {
        return E.u(x) ? this[S] : this.set(y, x);
      }, d.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, d.valueOf = function() {
        return this.$d.getTime();
      }, d.startOf = function(x, S) {
        var y = this, D = !!E.u(S) || S, $ = E.p(x), P = m(function(st, Z) {
          var b = E.w(y.$u ? Date.UTC(y.$y, Z, st) : new Date(y.$y, Z, st), y);
          return D ? b : b.endOf(u);
        }, "l"), z = m(function(st, Z) {
          return E.w(y.toDate()[st].apply(y.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), y);
        }, "$"), W = this.$W, X = this.$M, J = this.$D, ht = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case p:
            return D ? P(1, 0) : P(31, 11);
          case f:
            return D ? P(1, X) : P(0, X + 1);
          case l:
            var Q = this.$locale().weekStart || 0, dt = (W < Q ? W + 7 : W) - Q;
            return P(D ? J - dt : J + (6 - dt), X);
          case u:
          case c:
            return z(ht + "Hours", 0);
          case s:
            return z(ht + "Minutes", 1);
          case a:
            return z(ht + "Seconds", 2);
          case o2:
            return z(ht + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, d.endOf = function(x) {
        return this.startOf(x, false);
      }, d.$set = function(x, S) {
        var y, D = E.p(x), $ = "set" + (this.$u ? "UTC" : ""), P = (y = {}, y[u] = $ + "Date", y[c] = $ + "Date", y[f] = $ + "Month", y[p] = $ + "FullYear", y[s] = $ + "Hours", y[a] = $ + "Minutes", y[o2] = $ + "Seconds", y[i] = $ + "Milliseconds", y)[D], z = D === u ? this.$D + (S - this.$W) : S;
        if (D === f || D === p) {
          var W = this.clone().set(c, 1);
          W.$d[P](z), W.init(), this.$d = W.set(c, Math.min(this.$D, W.daysInMonth())).$d;
        } else P && this.$d[P](z);
        return this.init(), this;
      }, d.set = function(x, S) {
        return this.clone().$set(x, S);
      }, d.get = function(x) {
        return this[E.p(x)]();
      }, d.add = function(x, S) {
        var y, D = this;
        x = Number(x);
        var $ = E.p(S), P = m(function(X) {
          var J = U(D);
          return E.w(J.date(J.date() + Math.round(X * x)), D);
        }, "y");
        if ($ === f) return this.set(f, this.$M + x);
        if ($ === p) return this.set(p, this.$y + x);
        if ($ === u) return P(1);
        if ($ === l) return P(7);
        var z = (y = {}, y[a] = e, y[s] = n, y[o2] = t10, y)[$] || 1, W = this.$d.getTime() + x * z;
        return E.w(W, this);
      }, d.subtract = function(x, S) {
        return this.add(-1 * x, S);
      }, d.format = function(x) {
        var S = this, y = this.$locale();
        if (!this.isValid()) return y.invalidDate || m2;
        var D = x || "YYYY-MM-DDTHH:mm:ssZ", $ = E.z(this), P = this.$H, z = this.$m, W = this.$M, X = y.weekdays, J = y.months, ht = y.meridiem, Q = m(function(Z, b, R, F) {
          return Z && (Z[b] || Z(S, D)) || R[b].slice(0, F);
        }, "h"), dt = m(function(Z) {
          return E.s(P % 12 || 12, Z, "0");
        }, "d"), st = ht || function(Z, b, R) {
          var F = Z < 12 ? "AM" : "PM";
          return R ? F.toLowerCase() : F;
        };
        return D.replace(M, function(Z, b) {
          return b || function(R) {
            switch (R) {
              case "YY":
                return String(S.$y).slice(-2);
              case "YYYY":
                return E.s(S.$y, 4, "0");
              case "M":
                return W + 1;
              case "MM":
                return E.s(W + 1, 2, "0");
              case "MMM":
                return Q(y.monthsShort, W, J, 3);
              case "MMMM":
                return Q(J, W);
              case "D":
                return S.$D;
              case "DD":
                return E.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return Q(y.weekdaysMin, S.$W, X, 2);
              case "ddd":
                return Q(y.weekdaysShort, S.$W, X, 3);
              case "dddd":
                return X[S.$W];
              case "H":
                return String(P);
              case "HH":
                return E.s(P, 2, "0");
              case "h":
                return dt(1);
              case "hh":
                return dt(2);
              case "a":
                return st(P, z, true);
              case "A":
                return st(P, z, false);
              case "m":
                return String(z);
              case "mm":
                return E.s(z, 2, "0");
              case "s":
                return String(S.$s);
              case "ss":
                return E.s(S.$s, 2, "0");
              case "SSS":
                return E.s(S.$ms, 3, "0");
              case "Z":
                return $;
            }
            return null;
          }(Z) || $.replace(":", "");
        });
      }, d.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, d.diff = function(x, S, y) {
        var D, $ = this, P = E.p(S), z = U(x), W = (z.utcOffset() - this.utcOffset()) * e, X = this - z, J = m(function() {
          return E.m($, z);
        }, "D");
        switch (P) {
          case p:
            D = J() / 12;
            break;
          case f:
            D = J();
            break;
          case h:
            D = J() / 3;
            break;
          case l:
            D = (X - W) / 6048e5;
            break;
          case u:
            D = (X - W) / 864e5;
            break;
          case s:
            D = X / n;
            break;
          case a:
            D = X / e;
            break;
          case o2:
            D = X / t10;
            break;
          default:
            D = X;
        }
        return y ? D : E.a(D);
      }, d.daysInMonth = function() {
        return this.endOf(f).$D;
      }, d.$locale = function() {
        return A[this.$L];
      }, d.locale = function(x, S) {
        if (!x) return this.$L;
        var y = this.clone(), D = Y(x, S, true);
        return D && (y.$L = D), y;
      }, d.clone = function() {
        return E.w(this.$d, this);
      }, d.toDate = function() {
        return new Date(this.valueOf());
      }, d.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, d.toISOString = function() {
        return this.$d.toISOString();
      }, d.toString = function() {
        return this.$d.toUTCString();
      }, v;
    }(), N = B.prototype;
    return U.prototype = N, [["$ms", i], ["$s", o2], ["$m", a], ["$H", s], ["$W", u], ["$M", f], ["$y", p], ["$D", c]].forEach(function(v) {
      N[v[1]] = function(d) {
        return this.$g(d, v[0], v[1]);
      };
    }), U.extend = function(v, d) {
      return v.$i || (v(d, B, U), v.$i = true), U;
    }, U.locale = Y, U.isDayjs = w, U.unix = function(v) {
      return U(1e3 * v);
    }, U.en = A[C], U.Ls = A, U.p = {}, U;
  });
});
var qo = r(Bo(), 1);
var St = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };
var pt = { trace: m((...t10) => {
}, "trace"), debug: m((...t10) => {
}, "debug"), info: m((...t10) => {
}, "info"), warn: m((...t10) => {
}, "warn"), error: m((...t10) => {
}, "error"), fatal: m((...t10) => {
}, "fatal") };
var Wh = m(function(t10 = "fatal") {
  let e = St.fatal;
  typeof t10 == "string" ? t10.toLowerCase() in St && (e = St[t10]) : typeof t10 == "number" && (e = t10), pt.trace = () => {
  }, pt.debug = () => {
  }, pt.info = () => {
  }, pt.warn = () => {
  }, pt.error = () => {
  }, pt.fatal = () => {
  }, e <= St.fatal && (pt.fatal = console.error ? console.error.bind(console, mt("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", mt("FATAL"))), e <= St.error && (pt.error = console.error ? console.error.bind(console, mt("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", mt("ERROR"))), e <= St.warn && (pt.warn = console.warn ? console.warn.bind(console, mt("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", mt("WARN"))), e <= St.info && (pt.info = console.info ? console.info.bind(console, mt("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", mt("INFO"))), e <= St.debug && (pt.debug = console.debug ? console.debug.bind(console, mt("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", mt("DEBUG"))), e <= St.trace && (pt.trace = console.debug ? console.debug.bind(console, mt("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", mt("TRACE")));
}, "setLogLevel");
var mt = m((t10) => `%c${(0, qo.default)().format("ss.SSS")} : ${t10} : `, "format");
function Wo(t10, e) {
  let n;
  if (e === void 0) for (let i of t10) i != null && (n < i || n === void 0 && i >= i) && (n = i);
  else {
    let i = -1;
    for (let o2 of t10) (o2 = e(o2, ++i, t10)) != null && (n < o2 || n === void 0 && o2 >= o2) && (n = o2);
  }
  return n;
}
m(Wo, "max");
function Vo(t10, e) {
  let n;
  if (e === void 0) for (let i of t10) i != null && (n > i || n === void 0 && i >= i) && (n = i);
  else {
    let i = -1;
    for (let o2 of t10) (o2 = e(o2, ++i, t10)) != null && (n > o2 || n === void 0 && o2 >= o2) && (n = o2);
  }
  return n;
}
m(Vo, "min");
function Vt(t10, e) {
  return t10 == null || e == null ? NaN : t10 < e ? -1 : t10 > e ? 1 : t10 >= e ? 0 : NaN;
}
m(Vt, "ascending");
function cr(t10, e) {
  return t10 == null || e == null ? NaN : e < t10 ? -1 : e > t10 ? 1 : e >= t10 ? 0 : NaN;
}
m(cr, "descending");
function Xt(t10) {
  let e, n, i;
  t10.length !== 2 ? (e = Vt, n = m((u, l) => Vt(t10(u), l), "compare2"), i = m((u, l) => t10(u) - l, "delta")) : (e = t10 === Vt || t10 === cr ? t10 : cu, n = t10, i = t10);
  function o2(u, l, f = 0, h = u.length) {
    if (f < h) {
      if (e(l, l) !== 0) return h;
      do {
        let p = f + h >>> 1;
        n(u[p], l) < 0 ? f = p + 1 : h = p;
      } while (f < h);
    }
    return f;
  }
  m(o2, "left");
  function a(u, l, f = 0, h = u.length) {
    if (f < h) {
      if (e(l, l) !== 0) return h;
      do {
        let p = f + h >>> 1;
        n(u[p], l) <= 0 ? f = p + 1 : h = p;
      } while (f < h);
    }
    return f;
  }
  m(a, "right");
  function s(u, l, f = 0, h = u.length) {
    let p = o2(u, l, f, h - 1);
    return p > f && i(u[p - 1], l) > -i(u[p], l) ? p - 1 : p;
  }
  return m(s, "center"), { left: o2, center: s, right: a };
}
m(Xt, "bisector");
function cu() {
  return 0;
}
m(cu, "zero");
function hr(t10) {
  return t10 === null ? NaN : +t10;
}
m(hr, "number");
var Xo = Xt(Vt);
var Go = Xo.right;
var hu = Xo.left;
var pu = Xt(hr).center;
var pr = Go;
var _a;
var fe = (_a = class extends Map {
  constructor(e, n = xu) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null) for (let [i, o2] of e) this.set(i, o2);
  }
  get(e) {
    return super.get(Zo(this, e));
  }
  has(e) {
    return super.has(Zo(this, e));
  }
  set(e, n) {
    return super.set(mu(this, e), n);
  }
  delete(e) {
    return super.delete(du(this, e));
  }
}, m(_a, "InternMap"), _a);
function Zo({ _intern: t10, _key: e }, n) {
  let i = e(n);
  return t10.has(i) ? t10.get(i) : n;
}
m(Zo, "intern_get");
function mu({ _intern: t10, _key: e }, n) {
  let i = e(n);
  return t10.has(i) ? t10.get(i) : (t10.set(i, n), n);
}
m(mu, "intern_set");
function du({ _intern: t10, _key: e }, n) {
  let i = e(n);
  return t10.has(i) && (n = t10.get(i), t10.delete(i)), n;
}
m(du, "intern_delete");
function xu(t10) {
  return t10 !== null && typeof t10 == "object" ? t10.valueOf() : t10;
}
m(xu, "keyof");
var _u = Math.sqrt(50);
var gu = Math.sqrt(10);
var yu = Math.sqrt(2);
function cn(t10, e, n) {
  let i = (e - t10) / Math.max(0, n), o2 = Math.floor(Math.log10(i)), a = i / Math.pow(10, o2), s = a >= _u ? 10 : a >= gu ? 5 : a >= yu ? 2 : 1, u, l, f;
  return o2 < 0 ? (f = Math.pow(10, -o2) / s, u = Math.round(t10 * f), l = Math.round(e * f), u / f < t10 && ++u, l / f > e && --l, f = -f) : (f = Math.pow(10, o2) * s, u = Math.round(t10 / f), l = Math.round(e / f), u * f < t10 && ++u, l * f > e && --l), l < u && 0.5 <= n && n < 2 ? cn(t10, e, n * 2) : [u, l, f];
}
m(cn, "tickSpec");
function hn(t10, e, n) {
  if (e = +e, t10 = +t10, n = +n, !(n > 0)) return [];
  if (t10 === e) return [t10];
  let i = e < t10, [o2, a, s] = i ? cn(e, t10, n) : cn(t10, e, n);
  if (!(a >= o2)) return [];
  let u = a - o2 + 1, l = new Array(u);
  if (i) if (s < 0) for (let f = 0; f < u; ++f) l[f] = (a - f) / -s;
  else for (let f = 0; f < u; ++f) l[f] = (a - f) * s;
  else if (s < 0) for (let f = 0; f < u; ++f) l[f] = (o2 + f) / -s;
  else for (let f = 0; f < u; ++f) l[f] = (o2 + f) * s;
  return l;
}
m(hn, "ticks");
function Ee(t10, e, n) {
  return e = +e, t10 = +t10, n = +n, cn(t10, e, n)[2];
}
m(Ee, "tickIncrement");
function le(t10, e, n) {
  e = +e, t10 = +t10, n = +n;
  let i = e < t10, o2 = i ? Ee(e, t10, n) : Ee(t10, e, n);
  return (i ? -1 : 1) * (o2 < 0 ? 1 / -o2 : o2);
}
m(le, "tickStep");
function pn(t10, e, n) {
  t10 = +t10, e = +e, n = (o2 = arguments.length) < 2 ? (e = t10, t10 = 0, 1) : o2 < 3 ? 1 : +n;
  for (var i = -1, o2 = Math.max(0, Math.ceil((e - t10) / n)) | 0, a = new Array(o2); ++i < o2; ) a[i] = t10 + i * n;
  return a;
}
m(pn, "range");
function mr(t10) {
  return t10;
}
m(mr, "default");
var dn = 1;
var dr = 2;
var xr = 3;
var mn = 4;
var Qo = 1e-6;
function vu(t10) {
  return "translate(" + t10 + ",0)";
}
m(vu, "translateX");
function wu(t10) {
  return "translate(0," + t10 + ")";
}
m(wu, "translateY");
function bu(t10) {
  return (e) => +t10(e);
}
m(bu, "number");
function Mu(t10, e) {
  return e = Math.max(0, t10.bandwidth() - e * 2) / 2, t10.round() && (e = Math.round(e)), (n) => +t10(n) + e;
}
m(Mu, "center");
function Tu() {
  return !this.__axis;
}
m(Tu, "entering");
function Ko(t10, e) {
  var n = [], i = null, o2 = null, a = 6, s = 6, u = 3, l = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t10 === dn || t10 === mn ? -1 : 1, h = t10 === mn || t10 === dr ? "x" : "y", p = t10 === dn || t10 === xr ? vu : wu;
  function c(m2) {
    var _ = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), M = o2 ?? (e.tickFormat ? e.tickFormat.apply(e, n) : mr), T = Math.max(a, 0) + u, k = e.range(), I = +k[0] + l, C = +k[k.length - 1] + l, A = (e.bandwidth ? Mu : bu)(e.copy(), l), O = m2.selection ? m2.selection() : m2, w = O.selectAll(".domain").data([null]), Y = O.selectAll(".tick").data(_, e).order(), U = Y.exit(), E = Y.enter().append("g").attr("class", "tick"), B = Y.select("line"), N = Y.select("text");
    w = w.merge(w.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), Y = Y.merge(E), B = B.merge(E.append("line").attr("stroke", "currentColor").attr(h + "2", f * a)), N = N.merge(E.append("text").attr("fill", "currentColor").attr(h, f * T).attr("dy", t10 === dn ? "0em" : t10 === xr ? "0.71em" : "0.32em")), m2 !== O && (w = w.transition(m2), Y = Y.transition(m2), B = B.transition(m2), N = N.transition(m2), U = U.transition(m2).attr("opacity", Qo).attr("transform", function(v) {
      return isFinite(v = A(v)) ? p(v + l) : this.getAttribute("transform");
    }), E.attr("opacity", Qo).attr("transform", function(v) {
      var d = this.parentNode.__axis;
      return p((d && isFinite(d = d(v)) ? d : A(v)) + l);
    })), U.remove(), w.attr("d", t10 === mn || t10 === dr ? s ? "M" + f * s + "," + I + "H" + l + "V" + C + "H" + f * s : "M" + l + "," + I + "V" + C : s ? "M" + I + "," + f * s + "V" + l + "H" + C + "V" + f * s : "M" + I + "," + l + "H" + C), Y.attr("opacity", 1).attr("transform", function(v) {
      return p(A(v) + l);
    }), B.attr(h + "2", f * a), N.attr(h, f * T).text(M), O.filter(Tu).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t10 === dr ? "start" : t10 === mn ? "end" : "middle"), O.each(function() {
      this.__axis = A;
    });
  }
  return m(c, "axis"), c.scale = function(m2) {
    return arguments.length ? (e = m2, c) : e;
  }, c.ticks = function() {
    return n = Array.from(arguments), c;
  }, c.tickArguments = function(m2) {
    return arguments.length ? (n = m2 == null ? [] : Array.from(m2), c) : n.slice();
  }, c.tickValues = function(m2) {
    return arguments.length ? (i = m2 == null ? null : Array.from(m2), c) : i && i.slice();
  }, c.tickFormat = function(m2) {
    return arguments.length ? (o2 = m2, c) : o2;
  }, c.tickSize = function(m2) {
    return arguments.length ? (a = s = +m2, c) : a;
  }, c.tickSizeInner = function(m2) {
    return arguments.length ? (a = +m2, c) : a;
  }, c.tickSizeOuter = function(m2) {
    return arguments.length ? (s = +m2, c) : s;
  }, c.tickPadding = function(m2) {
    return arguments.length ? (u = +m2, c) : u;
  }, c.offset = function(m2) {
    return arguments.length ? (l = +m2, c) : l;
  }, c;
}
m(Ko, "axis");
function ku(t10) {
  return Ko(dn, t10);
}
m(ku, "axisTop");
function Su(t10) {
  return Ko(xr, t10);
}
m(Su, "axisBottom");
function Cu() {
}
m(Cu, "none");
function It(t10) {
  return t10 == null ? Cu : function() {
    return this.querySelector(t10);
  };
}
m(It, "default");
function _r(t10) {
  typeof t10 != "function" && (t10 = It(t10));
  for (var e = this._groups, n = e.length, i = new Array(n), o2 = 0; o2 < n; ++o2) for (var a = e[o2], s = a.length, u = i[o2] = new Array(s), l, f, h = 0; h < s; ++h) (l = a[h]) && (f = t10.call(l, l.__data__, h, a)) && ("__data__" in l && (f.__data__ = l.__data__), u[h] = f);
  return new G(i, this._parents);
}
m(_r, "default");
function gr(t10) {
  return t10 == null ? [] : Array.isArray(t10) ? t10 : Array.from(t10);
}
m(gr, "array");
function Nu() {
  return [];
}
m(Nu, "empty");
function ce(t10) {
  return t10 == null ? Nu : function() {
    return this.querySelectorAll(t10);
  };
}
m(ce, "default");
function Au(t10) {
  return function() {
    return gr(t10.apply(this, arguments));
  };
}
m(Au, "arrayAll");
function yr(t10) {
  typeof t10 == "function" ? t10 = Au(t10) : t10 = ce(t10);
  for (var e = this._groups, n = e.length, i = [], o2 = [], a = 0; a < n; ++a) for (var s = e[a], u = s.length, l, f = 0; f < u; ++f) (l = s[f]) && (i.push(t10.call(l, l.__data__, f, s)), o2.push(l));
  return new G(i, o2);
}
m(yr, "default");
function he(t10) {
  return function() {
    return this.matches(t10);
  };
}
m(he, "default");
function xn(t10) {
  return function(e) {
    return e.matches(t10);
  };
}
m(xn, "childMatcher");
var Du = Array.prototype.find;
function $u(t10) {
  return function() {
    return Du.call(this.children, t10);
  };
}
m($u, "childFind");
function Ou() {
  return this.firstElementChild;
}
m(Ou, "childFirst");
function vr(t10) {
  return this.select(t10 == null ? Ou : $u(typeof t10 == "function" ? t10 : xn(t10)));
}
m(vr, "default");
var Eu = Array.prototype.filter;
function Iu() {
  return Array.from(this.children);
}
m(Iu, "children");
function Ru(t10) {
  return function() {
    return Eu.call(this.children, t10);
  };
}
m(Ru, "childrenFilter");
function wr(t10) {
  return this.selectAll(t10 == null ? Iu : Ru(typeof t10 == "function" ? t10 : xn(t10)));
}
m(wr, "default");
function br(t10) {
  typeof t10 != "function" && (t10 = he(t10));
  for (var e = this._groups, n = e.length, i = new Array(n), o2 = 0; o2 < n; ++o2) for (var a = e[o2], s = a.length, u = i[o2] = [], l, f = 0; f < s; ++f) (l = a[f]) && t10.call(l, l.__data__, f, a) && u.push(l);
  return new G(i, this._parents);
}
m(br, "default");
function Ie(t10) {
  return new Array(t10.length);
}
m(Ie, "default");
function Mr() {
  return new G(this._enter || this._groups.map(Ie), this._parents);
}
m(Mr, "default");
function Re(t10, e) {
  this.ownerDocument = t10.ownerDocument, this.namespaceURI = t10.namespaceURI, this._next = null, this._parent = t10, this.__data__ = e;
}
m(Re, "EnterNode");
Re.prototype = { constructor: Re, appendChild: m(function(t10) {
  return this._parent.insertBefore(t10, this._next);
}, "appendChild"), insertBefore: m(function(t10, e) {
  return this._parent.insertBefore(t10, e);
}, "insertBefore"), querySelector: m(function(t10) {
  return this._parent.querySelector(t10);
}, "querySelector"), querySelectorAll: m(function(t10) {
  return this._parent.querySelectorAll(t10);
}, "querySelectorAll") };
function Tr(t10) {
  return function() {
    return t10;
  };
}
m(Tr, "default");
function Pu(t10, e, n, i, o2, a) {
  for (var s = 0, u, l = e.length, f = a.length; s < f; ++s) (u = e[s]) ? (u.__data__ = a[s], i[s] = u) : n[s] = new Re(t10, a[s]);
  for (; s < l; ++s) (u = e[s]) && (o2[s] = u);
}
m(Pu, "bindIndex");
function Yu(t10, e, n, i, o2, a, s) {
  var u, l, f = /* @__PURE__ */ new Map(), h = e.length, p = a.length, c = new Array(h), m2;
  for (u = 0; u < h; ++u) (l = e[u]) && (c[u] = m2 = s.call(l, l.__data__, u, e) + "", f.has(m2) ? o2[u] = l : f.set(m2, l));
  for (u = 0; u < p; ++u) m2 = s.call(t10, a[u], u, a) + "", (l = f.get(m2)) ? (i[u] = l, l.__data__ = a[u], f.delete(m2)) : n[u] = new Re(t10, a[u]);
  for (u = 0; u < h; ++u) (l = e[u]) && f.get(c[u]) === l && (o2[u] = l);
}
m(Yu, "bindKey");
function Fu(t10) {
  return t10.__data__;
}
m(Fu, "datum");
function kr(t10, e) {
  if (!arguments.length) return Array.from(this, Fu);
  var n = e ? Yu : Pu, i = this._parents, o2 = this._groups;
  typeof t10 != "function" && (t10 = Tr(t10));
  for (var a = o2.length, s = new Array(a), u = new Array(a), l = new Array(a), f = 0; f < a; ++f) {
    var h = i[f], p = o2[f], c = p.length, m2 = Uu(t10.call(h, h && h.__data__, f, i)), _ = m2.length, M = u[f] = new Array(_), T = s[f] = new Array(_), k = l[f] = new Array(c);
    n(h, p, M, T, k, m2, e);
    for (var I = 0, C = 0, A, O; I < _; ++I) if (A = M[I]) {
      for (I >= C && (C = I + 1); !(O = T[C]) && ++C < _; ) ;
      A._next = O || null;
    }
  }
  return s = new G(s, i), s._enter = u, s._exit = l, s;
}
m(kr, "default");
function Uu(t10) {
  return typeof t10 == "object" && "length" in t10 ? t10 : Array.from(t10);
}
m(Uu, "arraylike");
function Sr() {
  return new G(this._exit || this._groups.map(Ie), this._parents);
}
m(Sr, "default");
function Cr(t10, e, n) {
  var i = this.enter(), o2 = this, a = this.exit();
  return typeof t10 == "function" ? (i = t10(i), i && (i = i.selection())) : i = i.append(t10 + ""), e != null && (o2 = e(o2), o2 && (o2 = o2.selection())), n == null ? a.remove() : n(a), i && o2 ? i.merge(o2).order() : o2;
}
m(Cr, "default");
function Nr(t10) {
  for (var e = t10.selection ? t10.selection() : t10, n = this._groups, i = e._groups, o2 = n.length, a = i.length, s = Math.min(o2, a), u = new Array(o2), l = 0; l < s; ++l) for (var f = n[l], h = i[l], p = f.length, c = u[l] = new Array(p), m2, _ = 0; _ < p; ++_) (m2 = f[_] || h[_]) && (c[_] = m2);
  for (; l < o2; ++l) u[l] = n[l];
  return new G(u, this._parents);
}
m(Nr, "default");
function Ar() {
  for (var t10 = this._groups, e = -1, n = t10.length; ++e < n; ) for (var i = t10[e], o2 = i.length - 1, a = i[o2], s; --o2 >= 0; ) (s = i[o2]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
m(Ar, "default");
function Dr(t10) {
  t10 || (t10 = Lu);
  function e(p, c) {
    return p && c ? t10(p.__data__, c.__data__) : !p - !c;
  }
  m(e, "compareNode");
  for (var n = this._groups, i = n.length, o2 = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], u = s.length, l = o2[a] = new Array(u), f, h = 0; h < u; ++h) (f = s[h]) && (l[h] = f);
    l.sort(e);
  }
  return new G(o2, this._parents).order();
}
m(Dr, "default");
function Lu(t10, e) {
  return t10 < e ? -1 : t10 > e ? 1 : t10 >= e ? 0 : NaN;
}
m(Lu, "ascending");
function $r() {
  var t10 = arguments[0];
  return arguments[0] = this, t10.apply(null, arguments), this;
}
m($r, "default");
function Or() {
  return Array.from(this);
}
m(Or, "default");
function Er() {
  for (var t10 = this._groups, e = 0, n = t10.length; e < n; ++e) for (var i = t10[e], o2 = 0, a = i.length; o2 < a; ++o2) {
    var s = i[o2];
    if (s) return s;
  }
  return null;
}
m(Er, "default");
function Ir() {
  let t10 = 0;
  for (let e of this) ++t10;
  return t10;
}
m(Ir, "default");
function Rr() {
  return !this.node();
}
m(Rr, "default");
function Pr(t10) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n) for (var o2 = e[n], a = 0, s = o2.length, u; a < s; ++a) (u = o2[a]) && t10.call(u, u.__data__, a, o2);
  return this;
}
m(Pr, "default");
var _n = "http://www.w3.org/1999/xhtml";
var Yr = { svg: "http://www.w3.org/2000/svg", xhtml: _n, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
function wt(t10) {
  var e = t10 += "", n = e.indexOf(":");
  return n >= 0 && (e = t10.slice(0, n)) !== "xmlns" && (t10 = t10.slice(n + 1)), Yr.hasOwnProperty(e) ? { space: Yr[e], local: t10 } : t10;
}
m(wt, "default");
function zu(t10) {
  return function() {
    this.removeAttribute(t10);
  };
}
m(zu, "attrRemove");
function Hu(t10) {
  return function() {
    this.removeAttributeNS(t10.space, t10.local);
  };
}
m(Hu, "attrRemoveNS");
function Bu(t10, e) {
  return function() {
    this.setAttribute(t10, e);
  };
}
m(Bu, "attrConstant");
function qu(t10, e) {
  return function() {
    this.setAttributeNS(t10.space, t10.local, e);
  };
}
m(qu, "attrConstantNS");
function Wu(t10, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t10) : this.setAttribute(t10, n);
  };
}
m(Wu, "attrFunction");
function Vu(t10, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t10.space, t10.local) : this.setAttributeNS(t10.space, t10.local, n);
  };
}
m(Vu, "attrFunctionNS");
function Fr(t10, e) {
  var n = wt(t10);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Hu : zu : typeof e == "function" ? n.local ? Vu : Wu : n.local ? qu : Bu)(n, e));
}
m(Fr, "default");
function Pe(t10) {
  return t10.ownerDocument && t10.ownerDocument.defaultView || t10.document && t10 || t10.defaultView;
}
m(Pe, "default");
function Xu(t10) {
  return function() {
    this.style.removeProperty(t10);
  };
}
m(Xu, "styleRemove");
function Gu(t10, e, n) {
  return function() {
    this.style.setProperty(t10, e, n);
  };
}
m(Gu, "styleConstant");
function Zu(t10, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t10) : this.style.setProperty(t10, i, n);
  };
}
m(Zu, "styleFunction");
function Ur(t10, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Xu : typeof e == "function" ? Zu : Gu)(t10, e, n ?? "")) : Rt(this.node(), t10);
}
m(Ur, "default");
function Rt(t10, e) {
  return t10.style.getPropertyValue(e) || Pe(t10).getComputedStyle(t10, null).getPropertyValue(e);
}
m(Rt, "styleValue");
function Qu(t10) {
  return function() {
    delete this[t10];
  };
}
m(Qu, "propertyRemove");
function Ku(t10, e) {
  return function() {
    this[t10] = e;
  };
}
m(Ku, "propertyConstant");
function Ju(t10, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t10] : this[t10] = n;
  };
}
m(Ju, "propertyFunction");
function Lr(t10, e) {
  return arguments.length > 1 ? this.each((e == null ? Qu : typeof e == "function" ? Ju : Ku)(t10, e)) : this.node()[t10];
}
m(Lr, "default");
function Jo(t10) {
  return t10.trim().split(/^|\s+/);
}
m(Jo, "classArray");
function zr(t10) {
  return t10.classList || new jo(t10);
}
m(zr, "classList");
function jo(t10) {
  this._node = t10, this._names = Jo(t10.getAttribute("class") || "");
}
m(jo, "ClassList");
jo.prototype = { add: m(function(t10) {
  var e = this._names.indexOf(t10);
  e < 0 && (this._names.push(t10), this._node.setAttribute("class", this._names.join(" ")));
}, "add"), remove: m(function(t10) {
  var e = this._names.indexOf(t10);
  e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
}, "remove"), contains: m(function(t10) {
  return this._names.indexOf(t10) >= 0;
}, "contains") };
function ta(t10, e) {
  for (var n = zr(t10), i = -1, o2 = e.length; ++i < o2; ) n.add(e[i]);
}
m(ta, "classedAdd");
function ea(t10, e) {
  for (var n = zr(t10), i = -1, o2 = e.length; ++i < o2; ) n.remove(e[i]);
}
m(ea, "classedRemove");
function ju(t10) {
  return function() {
    ta(this, t10);
  };
}
m(ju, "classedTrue");
function tf(t10) {
  return function() {
    ea(this, t10);
  };
}
m(tf, "classedFalse");
function ef(t10, e) {
  return function() {
    (e.apply(this, arguments) ? ta : ea)(this, t10);
  };
}
m(ef, "classedFunction");
function Hr(t10, e) {
  var n = Jo(t10 + "");
  if (arguments.length < 2) {
    for (var i = zr(this.node()), o2 = -1, a = n.length; ++o2 < a; ) if (!i.contains(n[o2])) return false;
    return true;
  }
  return this.each((typeof e == "function" ? ef : e ? ju : tf)(n, e));
}
m(Hr, "default");
function nf() {
  this.textContent = "";
}
m(nf, "textRemove");
function rf(t10) {
  return function() {
    this.textContent = t10;
  };
}
m(rf, "textConstant");
function of(t10) {
  return function() {
    var e = t10.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
m(of, "textFunction");
function Br(t10) {
  return arguments.length ? this.each(t10 == null ? nf : (typeof t10 == "function" ? of : rf)(t10)) : this.node().textContent;
}
m(Br, "default");
function af() {
  this.innerHTML = "";
}
m(af, "htmlRemove");
function sf(t10) {
  return function() {
    this.innerHTML = t10;
  };
}
m(sf, "htmlConstant");
function uf(t10) {
  return function() {
    var e = t10.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
m(uf, "htmlFunction");
function qr(t10) {
  return arguments.length ? this.each(t10 == null ? af : (typeof t10 == "function" ? uf : sf)(t10)) : this.node().innerHTML;
}
m(qr, "default");
function ff() {
  this.nextSibling && this.parentNode.appendChild(this);
}
m(ff, "raise");
function Wr() {
  return this.each(ff);
}
m(Wr, "default");
function lf() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
m(lf, "lower");
function Vr() {
  return this.each(lf);
}
m(Vr, "default");
function cf(t10) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === _n && e.documentElement.namespaceURI === _n ? e.createElement(t10) : e.createElementNS(n, t10);
  };
}
m(cf, "creatorInherit");
function hf(t10) {
  return function() {
    return this.ownerDocument.createElementNS(t10.space, t10.local);
  };
}
m(hf, "creatorFixed");
function Ye(t10) {
  var e = wt(t10);
  return (e.local ? hf : cf)(e);
}
m(Ye, "default");
function Xr(t10) {
  var e = typeof t10 == "function" ? t10 : Ye(t10);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
m(Xr, "default");
function pf() {
  return null;
}
m(pf, "constantNull");
function Gr(t10, e) {
  var n = typeof t10 == "function" ? t10 : Ye(t10), i = e == null ? pf : typeof e == "function" ? e : It(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
m(Gr, "default");
function mf() {
  var t10 = this.parentNode;
  t10 && t10.removeChild(this);
}
m(mf, "remove");
function Zr() {
  return this.each(mf);
}
m(Zr, "default");
function df() {
  var t10 = this.cloneNode(false), e = this.parentNode;
  return e ? e.insertBefore(t10, this.nextSibling) : t10;
}
m(df, "selection_cloneShallow");
function xf() {
  var t10 = this.cloneNode(true), e = this.parentNode;
  return e ? e.insertBefore(t10, this.nextSibling) : t10;
}
m(xf, "selection_cloneDeep");
function Qr(t10) {
  return this.select(t10 ? xf : df);
}
m(Qr, "default");
function Kr(t10) {
  return arguments.length ? this.property("__data__", t10) : this.node().__data__;
}
m(Kr, "default");
function _f(t10) {
  return function(e) {
    t10.call(this, e, this.__data__);
  };
}
m(_f, "contextListener");
function gf(t10) {
  return t10.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
m(gf, "parseTypenames");
function yf(t10) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, o2 = e.length, a; n < o2; ++n) a = e[n], (!t10.type || a.type === t10.type) && a.name === t10.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
m(yf, "onRemove");
function vf(t10, e, n) {
  return function() {
    var i = this.__on, o2, a = _f(e);
    if (i) {
      for (var s = 0, u = i.length; s < u; ++s) if ((o2 = i[s]).type === t10.type && o2.name === t10.name) {
        this.removeEventListener(o2.type, o2.listener, o2.options), this.addEventListener(o2.type, o2.listener = a, o2.options = n), o2.value = e;
        return;
      }
    }
    this.addEventListener(t10.type, a, n), o2 = { type: t10.type, name: t10.name, value: e, listener: a, options: n }, i ? i.push(o2) : this.__on = [o2];
  };
}
m(vf, "onAdd");
function Jr(t10, e, n) {
  var i = gf(t10 + ""), o2, a = i.length, s;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var l = 0, f = u.length, h; l < f; ++l) for (o2 = 0, h = u[l]; o2 < a; ++o2) if ((s = i[o2]).type === h.type && s.name === h.name) return h.value;
    }
    return;
  }
  for (u = e ? vf : yf, o2 = 0; o2 < a; ++o2) this.each(u(i[o2], e, n));
  return this;
}
m(Jr, "default");
function na(t10, e, n) {
  var i = Pe(t10), o2 = i.CustomEvent;
  typeof o2 == "function" ? o2 = new o2(e, n) : (o2 = i.document.createEvent("Event"), n ? (o2.initEvent(e, n.bubbles, n.cancelable), o2.detail = n.detail) : o2.initEvent(e, false, false)), t10.dispatchEvent(o2);
}
m(na, "dispatchEvent");
function wf(t10, e) {
  return function() {
    return na(this, t10, e);
  };
}
m(wf, "dispatchConstant");
function bf(t10, e) {
  return function() {
    return na(this, t10, e.apply(this, arguments));
  };
}
m(bf, "dispatchFunction");
function jr(t10, e) {
  return this.each((typeof e == "function" ? bf : wf)(t10, e));
}
m(jr, "default");
function* ti() {
  for (var t10 = this._groups, e = 0, n = t10.length; e < n; ++e) for (var i = t10[e], o2 = 0, a = i.length, s; o2 < a; ++o2) (s = i[o2]) && (yield s);
}
m(ti, "default");
var ei = [null];
function G(t10, e) {
  this._groups = t10, this._parents = e;
}
m(G, "Selection");
function ra() {
  return new G([[document.documentElement]], ei);
}
m(ra, "selection");
function Mf() {
  return this;
}
m(Mf, "selection_selection");
G.prototype = ra.prototype = { constructor: G, select: _r, selectAll: yr, selectChild: vr, selectChildren: wr, filter: br, data: kr, enter: Mr, exit: Sr, join: Cr, merge: Nr, selection: Mf, order: Ar, sort: Dr, call: $r, nodes: Or, node: Er, size: Ir, empty: Rr, each: Pr, attr: Fr, style: Ur, property: Lr, classed: Hr, text: Br, html: qr, raise: Wr, lower: Vr, append: Xr, insert: Gr, remove: Zr, clone: Qr, datum: Kr, on: Jr, dispatch: jr, [Symbol.iterator]: ti };
var Ct = ra;
function ia(t10) {
  return typeof t10 == "string" ? new G([[document.querySelector(t10)]], [document.documentElement]) : new G([[t10]], ei);
}
m(ia, "default");
function Pt(t10, e, n) {
  t10.prototype = e.prototype = n, n.constructor = t10;
}
m(Pt, "default");
function pe(t10, e) {
  var n = Object.create(t10.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
m(pe, "extend");
function Yt() {
}
m(Yt, "Color");
var Fe = 0.7;
var vn = 1 / Fe;
var me = "\\s*([+-]?\\d+)\\s*";
var Ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var Tf = /^#([0-9a-f]{3,8})$/;
var kf = new RegExp(`^rgb\\(${me},${me},${me}\\)$`);
var Sf = new RegExp(`^rgb\\(${bt},${bt},${bt}\\)$`);
var Cf = new RegExp(`^rgba\\(${me},${me},${me},${Ue}\\)$`);
var Nf = new RegExp(`^rgba\\(${bt},${bt},${bt},${Ue}\\)$`);
var Af = new RegExp(`^hsl\\(${Ue},${bt},${bt}\\)$`);
var Df = new RegExp(`^hsla\\(${Ue},${bt},${bt},${Ue}\\)$`);
var oa = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
Pt(Yt, _t, { copy(t10) {
  return Object.assign(new this.constructor(), this, t10);
}, displayable() {
  return this.rgb().displayable();
}, hex: aa, formatHex: aa, formatHex8: $f, formatHsl: Of, formatRgb: sa, toString: sa });
function aa() {
  return this.rgb().formatHex();
}
m(aa, "color_formatHex");
function $f() {
  return this.rgb().formatHex8();
}
m($f, "color_formatHex8");
function Of() {
  return pa(this).formatHsl();
}
m(Of, "color_formatHsl");
function sa() {
  return this.rgb().formatRgb();
}
m(sa, "color_formatRgb");
function _t(t10) {
  var e, n;
  return t10 = (t10 + "").trim().toLowerCase(), (e = Tf.exec(t10)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? ua(e) : n === 3 ? new nt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? gn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? gn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = kf.exec(t10)) ? new nt(e[1], e[2], e[3], 1) : (e = Sf.exec(t10)) ? new nt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Cf.exec(t10)) ? gn(e[1], e[2], e[3], e[4]) : (e = Nf.exec(t10)) ? gn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Af.exec(t10)) ? ca(e[1], e[2] / 100, e[3] / 100, 1) : (e = Df.exec(t10)) ? ca(e[1], e[2] / 100, e[3] / 100, e[4]) : oa.hasOwnProperty(t10) ? ua(oa[t10]) : t10 === "transparent" ? new nt(NaN, NaN, NaN, 0) : null;
}
m(_t, "color");
function ua(t10) {
  return new nt(t10 >> 16 & 255, t10 >> 8 & 255, t10 & 255, 1);
}
m(ua, "rgbn");
function gn(t10, e, n, i) {
  return i <= 0 && (t10 = e = n = NaN), new nt(t10, e, n, i);
}
m(gn, "rgba");
function ri(t10) {
  return t10 instanceof Yt || (t10 = _t(t10)), t10 ? (t10 = t10.rgb(), new nt(t10.r, t10.g, t10.b, t10.opacity)) : new nt();
}
m(ri, "rgbConvert");
function de(t10, e, n, i) {
  return arguments.length === 1 ? ri(t10) : new nt(t10, e, n, i ?? 1);
}
m(de, "rgb");
function nt(t10, e, n, i) {
  this.r = +t10, this.g = +e, this.b = +n, this.opacity = +i;
}
m(nt, "Rgb");
Pt(nt, de, pe(Yt, { brighter(t10) {
  return t10 = t10 == null ? vn : Math.pow(vn, t10), new nt(this.r * t10, this.g * t10, this.b * t10, this.opacity);
}, darker(t10) {
  return t10 = t10 == null ? Fe : Math.pow(Fe, t10), new nt(this.r * t10, this.g * t10, this.b * t10, this.opacity);
}, rgb() {
  return this;
}, clamp() {
  return new nt(Zt(this.r), Zt(this.g), Zt(this.b), wn(this.opacity));
}, displayable() {
  return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
}, hex: fa, formatHex: fa, formatHex8: Ef, formatRgb: la, toString: la }));
function fa() {
  return `#${Gt(this.r)}${Gt(this.g)}${Gt(this.b)}`;
}
m(fa, "rgb_formatHex");
function Ef() {
  return `#${Gt(this.r)}${Gt(this.g)}${Gt(this.b)}${Gt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
m(Ef, "rgb_formatHex8");
function la() {
  let t10 = wn(this.opacity);
  return `${t10 === 1 ? "rgb(" : "rgba("}${Zt(this.r)}, ${Zt(this.g)}, ${Zt(this.b)}${t10 === 1 ? ")" : `, ${t10})`}`;
}
m(la, "rgb_formatRgb");
function wn(t10) {
  return isNaN(t10) ? 1 : Math.max(0, Math.min(1, t10));
}
m(wn, "clampa");
function Zt(t10) {
  return Math.max(0, Math.min(255, Math.round(t10) || 0));
}
m(Zt, "clampi");
function Gt(t10) {
  return t10 = Zt(t10), (t10 < 16 ? "0" : "") + t10.toString(16);
}
m(Gt, "hex");
function ca(t10, e, n, i) {
  return i <= 0 ? t10 = e = n = NaN : n <= 0 || n >= 1 ? t10 = e = NaN : e <= 0 && (t10 = NaN), new xt(t10, e, n, i);
}
m(ca, "hsla");
function pa(t10) {
  if (t10 instanceof xt) return new xt(t10.h, t10.s, t10.l, t10.opacity);
  if (t10 instanceof Yt || (t10 = _t(t10)), !t10) return new xt();
  if (t10 instanceof xt) return t10;
  t10 = t10.rgb();
  var e = t10.r / 255, n = t10.g / 255, i = t10.b / 255, o2 = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, u = a - o2, l = (a + o2) / 2;
  return u ? (e === a ? s = (n - i) / u + (n < i) * 6 : n === a ? s = (i - e) / u + 2 : s = (e - n) / u + 4, u /= l < 0.5 ? a + o2 : 2 - a - o2, s *= 60) : u = l > 0 && l < 1 ? 0 : s, new xt(s, u, l, t10.opacity);
}
m(pa, "hslConvert");
function ma(t10, e, n, i) {
  return arguments.length === 1 ? pa(t10) : new xt(t10, e, n, i ?? 1);
}
m(ma, "hsl");
function xt(t10, e, n, i) {
  this.h = +t10, this.s = +e, this.l = +n, this.opacity = +i;
}
m(xt, "Hsl");
Pt(xt, ma, pe(Yt, { brighter(t10) {
  return t10 = t10 == null ? vn : Math.pow(vn, t10), new xt(this.h, this.s, this.l * t10, this.opacity);
}, darker(t10) {
  return t10 = t10 == null ? Fe : Math.pow(Fe, t10), new xt(this.h, this.s, this.l * t10, this.opacity);
}, rgb() {
  var t10 = this.h % 360 + (this.h < 0) * 360, e = isNaN(t10) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, o2 = 2 * n - i;
  return new nt(ni(t10 >= 240 ? t10 - 240 : t10 + 120, o2, i), ni(t10, o2, i), ni(t10 < 120 ? t10 + 240 : t10 - 120, o2, i), this.opacity);
}, clamp() {
  return new xt(ha(this.h), yn(this.s), yn(this.l), wn(this.opacity));
}, displayable() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
}, formatHsl() {
  let t10 = wn(this.opacity);
  return `${t10 === 1 ? "hsl(" : "hsla("}${ha(this.h)}, ${yn(this.s) * 100}%, ${yn(this.l) * 100}%${t10 === 1 ? ")" : `, ${t10})`}`;
} }));
function ha(t10) {
  return t10 = (t10 || 0) % 360, t10 < 0 ? t10 + 360 : t10;
}
m(ha, "clamph");
function yn(t10) {
  return Math.max(0, Math.min(1, t10 || 0));
}
m(yn, "clampt");
function ni(t10, e, n) {
  return (t10 < 60 ? e + (n - e) * t10 / 60 : t10 < 180 ? n : t10 < 240 ? e + (n - e) * (240 - t10) / 60 : e) * 255;
}
m(ni, "hsl2rgb");
var da = Math.PI / 180;
var xa = 180 / Math.PI;
var bn = 18;
var _a2 = 0.96422;
var ga = 1;
var ya = 0.82521;
var va = 4 / 29;
var xe = 6 / 29;
var wa = 3 * xe * xe;
var If = xe * xe * xe;
function ba(t10) {
  if (t10 instanceof Mt) return new Mt(t10.l, t10.a, t10.b, t10.opacity);
  if (t10 instanceof Nt) return Ma(t10);
  t10 instanceof nt || (t10 = ri(t10));
  var e = si(t10.r), n = si(t10.g), i = si(t10.b), o2 = ii((0.2225045 * e + 0.7168786 * n + 0.0606169 * i) / ga), a, s;
  return e === n && n === i ? a = s = o2 : (a = ii((0.4360747 * e + 0.3850649 * n + 0.1430804 * i) / _a2), s = ii((0.0139322 * e + 0.0971045 * n + 0.7141733 * i) / ya)), new Mt(116 * o2 - 16, 500 * (a - o2), 200 * (o2 - s), t10.opacity);
}
m(ba, "labConvert");
function ui(t10, e, n, i) {
  return arguments.length === 1 ? ba(t10) : new Mt(t10, e, n, i ?? 1);
}
m(ui, "lab");
function Mt(t10, e, n, i) {
  this.l = +t10, this.a = +e, this.b = +n, this.opacity = +i;
}
m(Mt, "Lab");
Pt(Mt, ui, pe(Yt, { brighter(t10) {
  return new Mt(this.l + bn * (t10 ?? 1), this.a, this.b, this.opacity);
}, darker(t10) {
  return new Mt(this.l - bn * (t10 ?? 1), this.a, this.b, this.opacity);
}, rgb() {
  var t10 = (this.l + 16) / 116, e = isNaN(this.a) ? t10 : t10 + this.a / 500, n = isNaN(this.b) ? t10 : t10 - this.b / 200;
  return e = _a2 * oi(e), t10 = ga * oi(t10), n = ya * oi(n), new nt(ai(3.1338561 * e - 1.6168667 * t10 - 0.4906146 * n), ai(-0.9787684 * e + 1.9161415 * t10 + 0.033454 * n), ai(0.0719453 * e - 0.2289914 * t10 + 1.4052427 * n), this.opacity);
} }));
function ii(t10) {
  return t10 > If ? Math.pow(t10, 1 / 3) : t10 / wa + va;
}
m(ii, "xyz2lab");
function oi(t10) {
  return t10 > xe ? t10 * t10 * t10 : wa * (t10 - va);
}
m(oi, "lab2xyz");
function ai(t10) {
  return 255 * (t10 <= 31308e-7 ? 12.92 * t10 : 1.055 * Math.pow(t10, 1 / 2.4) - 0.055);
}
m(ai, "lrgb2rgb");
function si(t10) {
  return (t10 /= 255) <= 0.04045 ? t10 / 12.92 : Math.pow((t10 + 0.055) / 1.055, 2.4);
}
m(si, "rgb2lrgb");
function Rf(t10) {
  if (t10 instanceof Nt) return new Nt(t10.h, t10.c, t10.l, t10.opacity);
  if (t10 instanceof Mt || (t10 = ba(t10)), t10.a === 0 && t10.b === 0) return new Nt(NaN, 0 < t10.l && t10.l < 100 ? 0 : NaN, t10.l, t10.opacity);
  var e = Math.atan2(t10.b, t10.a) * xa;
  return new Nt(e < 0 ? e + 360 : e, Math.sqrt(t10.a * t10.a + t10.b * t10.b), t10.l, t10.opacity);
}
m(Rf, "hclConvert");
function Le(t10, e, n, i) {
  return arguments.length === 1 ? Rf(t10) : new Nt(t10, e, n, i ?? 1);
}
m(Le, "hcl");
function Nt(t10, e, n, i) {
  this.h = +t10, this.c = +e, this.l = +n, this.opacity = +i;
}
m(Nt, "Hcl");
function Ma(t10) {
  if (isNaN(t10.h)) return new Mt(t10.l, 0, 0, t10.opacity);
  var e = t10.h * da;
  return new Mt(t10.l, Math.cos(e) * t10.c, Math.sin(e) * t10.c, t10.opacity);
}
m(Ma, "hcl2lab");
Pt(Nt, Le, pe(Yt, { brighter(t10) {
  return new Nt(this.h, this.c, this.l + bn * (t10 ?? 1), this.opacity);
}, darker(t10) {
  return new Nt(this.h, this.c, this.l - bn * (t10 ?? 1), this.opacity);
}, rgb() {
  return Ma(this).rgb();
} }));
var _e = m((t10) => () => t10, "default");
function Ta(t10, e) {
  return function(n) {
    return t10 + n * e;
  };
}
m(Ta, "linear");
function Pf(t10, e, n) {
  return t10 = Math.pow(t10, n), e = Math.pow(e, n) - t10, n = 1 / n, function(i) {
    return Math.pow(t10 + i * e, n);
  };
}
m(Pf, "exponential");
function ka(t10, e) {
  var n = e - t10;
  return n ? Ta(t10, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : _e(isNaN(t10) ? e : t10);
}
m(ka, "hue");
function Sa(t10) {
  return (t10 = +t10) == 1 ? At : function(e, n) {
    return n - e ? Pf(e, n, t10) : _e(isNaN(e) ? n : e);
  };
}
m(Sa, "gamma");
function At(t10, e) {
  var n = e - t10;
  return n ? Ta(t10, n) : _e(isNaN(t10) ? e : t10);
}
m(At, "nogamma");
function Ca(t10) {
  return function(e, n) {
    var i = t10((e = Le(e)).h, (n = Le(n)).h), o2 = At(e.c, n.c), a = At(e.l, n.l), s = At(e.opacity, n.opacity);
    return function(u) {
      return e.h = i(u), e.c = o2(u), e.l = a(u), e.opacity = s(u), e + "";
    };
  };
}
m(Ca, "hcl");
var Yf = Ca(ka);
var Ff = Ca(At);
function fi(t10, e, n, i, o2) {
  var a = t10 * t10, s = a * t10;
  return ((1 - 3 * t10 + 3 * a - s) * e + (4 - 6 * a + 3 * s) * n + (1 + 3 * t10 + 3 * a - 3 * s) * i + s * o2) / 6;
}
m(fi, "basis");
function li(t10) {
  var e = t10.length - 1;
  return function(n) {
    var i = n <= 0 ? n = 0 : n >= 1 ? (n = 1, e - 1) : Math.floor(n * e), o2 = t10[i], a = t10[i + 1], s = i > 0 ? t10[i - 1] : 2 * o2 - a, u = i < e - 1 ? t10[i + 2] : 2 * a - o2;
    return fi((n - i / e) * e, s, o2, a, u);
  };
}
m(li, "default");
function ci(t10) {
  var e = t10.length;
  return function(n) {
    var i = Math.floor(((n %= 1) < 0 ? ++n : n) * e), o2 = t10[(i + e - 1) % e], a = t10[i % e], s = t10[(i + 1) % e], u = t10[(i + 2) % e];
    return fi((n - i / e) * e, o2, a, s, u);
  };
}
m(ci, "default");
var Qt = m(function t(e) {
  var n = Sa(e);
  function i(o2, a) {
    var s = n((o2 = de(o2)).r, (a = de(a)).r), u = n(o2.g, a.g), l = n(o2.b, a.b), f = At(o2.opacity, a.opacity);
    return function(h) {
      return o2.r = s(h), o2.g = u(h), o2.b = l(h), o2.opacity = f(h), o2 + "";
    };
  }
  return m(i, "rgb"), i.gamma = t, i;
}, "rgbGamma")(1);
function Na(t10) {
  return function(e) {
    var n = e.length, i = new Array(n), o2 = new Array(n), a = new Array(n), s, u;
    for (s = 0; s < n; ++s) u = de(e[s]), i[s] = u.r || 0, o2[s] = u.g || 0, a[s] = u.b || 0;
    return i = t10(i), o2 = t10(o2), a = t10(a), u.opacity = 1, function(l) {
      return u.r = i(l), u.g = o2(l), u.b = a(l), u + "";
    };
  };
}
m(Na, "rgbSpline");
var Uf = Na(li);
var Lf = Na(ci);
function hi(t10, e) {
  e || (e = []);
  var n = t10 ? Math.min(e.length, t10.length) : 0, i = e.slice(), o2;
  return function(a) {
    for (o2 = 0; o2 < n; ++o2) i[o2] = t10[o2] * (1 - a) + e[o2] * a;
    return i;
  };
}
m(hi, "default");
function Aa(t10) {
  return ArrayBuffer.isView(t10) && !(t10 instanceof DataView);
}
m(Aa, "isNumberArray");
function Da(t10, e) {
  var n = e ? e.length : 0, i = t10 ? Math.min(n, t10.length) : 0, o2 = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) o2[s] = Ft(t10[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(u) {
    for (s = 0; s < i; ++s) a[s] = o2[s](u);
    return a;
  };
}
m(Da, "genericArray");
function pi(t10, e) {
  var n = /* @__PURE__ */ new Date();
  return t10 = +t10, e = +e, function(i) {
    return n.setTime(t10 * (1 - i) + e * i), n;
  };
}
m(pi, "default");
function j(t10, e) {
  return t10 = +t10, e = +e, function(n) {
    return t10 * (1 - n) + e * n;
  };
}
m(j, "default");
function mi(t10, e) {
  var n = {}, i = {}, o2;
  (t10 === null || typeof t10 != "object") && (t10 = {}), (e === null || typeof e != "object") && (e = {});
  for (o2 in e) o2 in t10 ? n[o2] = Ft(t10[o2], e[o2]) : i[o2] = e[o2];
  return function(a) {
    for (o2 in n) i[o2] = n[o2](a);
    return i;
  };
}
m(mi, "default");
var xi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var di = new RegExp(xi.source, "g");
function zf(t10) {
  return function() {
    return t10;
  };
}
m(zf, "zero");
function Hf(t10) {
  return function(e) {
    return t10(e) + "";
  };
}
m(Hf, "one");
function ge(t10, e) {
  var n = xi.lastIndex = di.lastIndex = 0, i, o2, a, s = -1, u = [], l = [];
  for (t10 = t10 + "", e = e + ""; (i = xi.exec(t10)) && (o2 = di.exec(e)); ) (a = o2.index) > n && (a = e.slice(n, a), u[s] ? u[s] += a : u[++s] = a), (i = i[0]) === (o2 = o2[0]) ? u[s] ? u[s] += o2 : u[++s] = o2 : (u[++s] = null, l.push({ i: s, x: j(i, o2) })), n = di.lastIndex;
  return n < e.length && (a = e.slice(n), u[s] ? u[s] += a : u[++s] = a), u.length < 2 ? l[0] ? Hf(l[0].x) : zf(e) : (e = l.length, function(f) {
    for (var h = 0, p; h < e; ++h) u[(p = l[h]).i] = p.x(f);
    return u.join("");
  });
}
m(ge, "default");
function Ft(t10, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? _e(e) : (n === "number" ? j : n === "string" ? (i = _t(e)) ? (e = i, Qt) : ge : e instanceof _t ? Qt : e instanceof Date ? pi : Aa(e) ? hi : Array.isArray(e) ? Da : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? mi : j)(t10, e);
}
m(Ft, "default");
function Mn(t10, e) {
  return t10 = +t10, e = +e, function(n) {
    return Math.round(t10 * (1 - n) + e * n);
  };
}
m(Mn, "default");
var $a = 180 / Math.PI;
var Tn = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function kn(t10, e, n, i, o2, a) {
  var s, u, l;
  return (s = Math.sqrt(t10 * t10 + e * e)) && (t10 /= s, e /= s), (l = t10 * n + e * i) && (n -= t10 * l, i -= e * l), (u = Math.sqrt(n * n + i * i)) && (n /= u, i /= u, l /= u), t10 * i < e * n && (t10 = -t10, e = -e, l = -l, s = -s), { translateX: o2, translateY: a, rotate: Math.atan2(e, t10) * $a, skewX: Math.atan(l) * $a, scaleX: s, scaleY: u };
}
m(kn, "default");
var Sn;
function Oa(t10) {
  let e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t10 + "");
  return e.isIdentity ? Tn : kn(e.a, e.b, e.c, e.d, e.e, e.f);
}
m(Oa, "parseCss");
function Ea(t10) {
  return t10 == null ? Tn : (Sn || (Sn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Sn.setAttribute("transform", t10), (t10 = Sn.transform.baseVal.consolidate()) ? (t10 = t10.matrix, kn(t10.a, t10.b, t10.c, t10.d, t10.e, t10.f)) : Tn);
}
m(Ea, "parseSvg");
function Ia(t10, e, n, i) {
  function o2(f) {
    return f.length ? f.pop() + " " : "";
  }
  m(o2, "pop");
  function a(f, h, p, c, m2, _) {
    if (f !== p || h !== c) {
      var M = m2.push("translate(", null, e, null, n);
      _.push({ i: M - 4, x: j(f, p) }, { i: M - 2, x: j(h, c) });
    } else (p || c) && m2.push("translate(" + p + e + c + n);
  }
  m(a, "translate");
  function s(f, h, p, c) {
    f !== h ? (f - h > 180 ? h += 360 : h - f > 180 && (f += 360), c.push({ i: p.push(o2(p) + "rotate(", null, i) - 2, x: j(f, h) })) : h && p.push(o2(p) + "rotate(" + h + i);
  }
  m(s, "rotate");
  function u(f, h, p, c) {
    f !== h ? c.push({ i: p.push(o2(p) + "skewX(", null, i) - 2, x: j(f, h) }) : h && p.push(o2(p) + "skewX(" + h + i);
  }
  m(u, "skewX");
  function l(f, h, p, c, m2, _) {
    if (f !== p || h !== c) {
      var M = m2.push(o2(m2) + "scale(", null, ",", null, ")");
      _.push({ i: M - 4, x: j(f, p) }, { i: M - 2, x: j(h, c) });
    } else (p !== 1 || c !== 1) && m2.push(o2(m2) + "scale(" + p + "," + c + ")");
  }
  return m(l, "scale"), function(f, h) {
    var p = [], c = [];
    return f = t10(f), h = t10(h), a(f.translateX, f.translateY, h.translateX, h.translateY, p, c), s(f.rotate, h.rotate, p, c), u(f.skewX, h.skewX, p, c), l(f.scaleX, f.scaleY, h.scaleX, h.scaleY, p, c), f = h = null, function(m2) {
      for (var _ = -1, M = c.length, T; ++_ < M; ) p[(T = c[_]).i] = T.x(m2);
      return p.join("");
    };
  };
}
m(Ia, "interpolateTransform");
var _i = Ia(Oa, "px, ", "px)", "deg)");
var gi = Ia(Ea, ", ", ")", ")");
function yi(t10) {
  return Math.abs(t10 = Math.round(t10)) >= 1e21 ? t10.toLocaleString("en").replace(/,/g, "") : t10.toString(10);
}
m(yi, "default");
function Kt(t10, e) {
  if ((n = (t10 = e ? t10.toExponential(e - 1) : t10.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t10.slice(0, n);
  return [i.length > 1 ? i[0] + i.slice(2) : i, +t10.slice(n + 1)];
}
m(Kt, "formatDecimalParts");
function gt(t10) {
  return t10 = Kt(Math.abs(t10)), t10 ? t10[1] : NaN;
}
m(gt, "default");
function vi(t10, e) {
  return function(n, i) {
    for (var o2 = n.length, a = [], s = 0, u = t10[0], l = 0; o2 > 0 && u > 0 && (l + u + 1 > i && (u = Math.max(1, i - l)), a.push(n.substring(o2 -= u, o2 + u)), !((l += u + 1) > i)); ) u = t10[s = (s + 1) % t10.length];
    return a.reverse().join(e);
  };
}
m(vi, "default");
function wi(t10) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t10[+n];
    });
  };
}
m(wi, "default");
var Bf = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ut(t10) {
  if (!(e = Bf.exec(t10))) throw new Error("invalid format: " + t10);
  var e;
  return new Cn({ fill: e[1], align: e[2], sign: e[3], symbol: e[4], zero: e[5], width: e[6], comma: e[7], precision: e[8] && e[8].slice(1), trim: e[9], type: e[10] });
}
m(Ut, "formatSpecifier");
Ut.prototype = Cn.prototype;
function Cn(t10) {
  this.fill = t10.fill === void 0 ? " " : t10.fill + "", this.align = t10.align === void 0 ? ">" : t10.align + "", this.sign = t10.sign === void 0 ? "-" : t10.sign + "", this.symbol = t10.symbol === void 0 ? "" : t10.symbol + "", this.zero = !!t10.zero, this.width = t10.width === void 0 ? void 0 : +t10.width, this.comma = !!t10.comma, this.precision = t10.precision === void 0 ? void 0 : +t10.precision, this.trim = !!t10.trim, this.type = t10.type === void 0 ? "" : t10.type + "";
}
m(Cn, "FormatSpecifier");
Cn.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function bi(t10) {
  t: for (var e = t10.length, n = 1, i = -1, o2; n < e; ++n) switch (t10[n]) {
    case ".":
      i = o2 = n;
      break;
    case "0":
      i === 0 && (i = n), o2 = n;
      break;
    default:
      if (!+t10[n]) break t;
      i > 0 && (i = 0);
      break;
  }
  return i > 0 ? t10.slice(0, i) + t10.slice(o2 + 1) : t10;
}
m(bi, "default");
var Mi;
function Ti(t10, e) {
  var n = Kt(t10, e);
  if (!n) return t10 + "";
  var i = n[0], o2 = n[1], a = o2 - (Mi = Math.max(-8, Math.min(8, Math.floor(o2 / 3))) * 3) + 1, s = i.length;
  return a === s ? i : a > s ? i + new Array(a - s + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + Kt(t10, Math.max(0, e + a - 1))[0];
}
m(Ti, "default");
function Nn(t10, e) {
  var n = Kt(t10, e);
  if (!n) return t10 + "";
  var i = n[0], o2 = n[1];
  return o2 < 0 ? "0." + new Array(-o2).join("0") + i : i.length > o2 + 1 ? i.slice(0, o2 + 1) + "." + i.slice(o2 + 1) : i + new Array(o2 - i.length + 2).join("0");
}
m(Nn, "default");
var ki = { "%": m((t10, e) => (t10 * 100).toFixed(e), "%"), b: m((t10) => Math.round(t10).toString(2), "b"), c: m((t10) => t10 + "", "c"), d: yi, e: m((t10, e) => t10.toExponential(e), "e"), f: m((t10, e) => t10.toFixed(e), "f"), g: m((t10, e) => t10.toPrecision(e), "g"), o: m((t10) => Math.round(t10).toString(8), "o"), p: m((t10, e) => Nn(t10 * 100, e), "p"), r: Nn, s: Ti, X: m((t10) => Math.round(t10).toString(16).toUpperCase(), "X"), x: m((t10) => Math.round(t10).toString(16), "x") };
function An(t10) {
  return t10;
}
m(An, "default");
var Ra = Array.prototype.map;
var Pa = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Si(t10) {
  var e = t10.grouping === void 0 || t10.thousands === void 0 ? An : vi(Ra.call(t10.grouping, Number), t10.thousands + ""), n = t10.currency === void 0 ? "" : t10.currency[0] + "", i = t10.currency === void 0 ? "" : t10.currency[1] + "", o2 = t10.decimal === void 0 ? "." : t10.decimal + "", a = t10.numerals === void 0 ? An : wi(Ra.call(t10.numerals, String)), s = t10.percent === void 0 ? "%" : t10.percent + "", u = t10.minus === void 0 ? "−" : t10.minus + "", l = t10.nan === void 0 ? "NaN" : t10.nan + "";
  function f(p) {
    p = Ut(p);
    var c = p.fill, m2 = p.align, _ = p.sign, M = p.symbol, T = p.zero, k = p.width, I = p.comma, C = p.precision, A = p.trim, O = p.type;
    O === "n" ? (I = true, O = "g") : ki[O] || (C === void 0 && (C = 12), A = true, O = "g"), (T || c === "0" && m2 === "=") && (T = true, c = "0", m2 = "=");
    var w = M === "$" ? n : M === "#" && /[boxX]/.test(O) ? "0" + O.toLowerCase() : "", Y = M === "$" ? i : /[%p]/.test(O) ? s : "", U = ki[O], E = /[defgprs%]/.test(O);
    C = C === void 0 ? 6 : /[gprs]/.test(O) ? Math.max(1, Math.min(21, C)) : Math.max(0, Math.min(20, C));
    function B(N) {
      var v = w, d = Y, x, S, y;
      if (O === "c") d = U(N) + d, N = "";
      else {
        N = +N;
        var D = N < 0 || 1 / N < 0;
        if (N = isNaN(N) ? l : U(Math.abs(N), C), A && (N = bi(N)), D && +N == 0 && _ !== "+" && (D = false), v = (D ? _ === "(" ? _ : u : _ === "-" || _ === "(" ? "" : _) + v, d = (O === "s" ? Pa[8 + Mi / 3] : "") + d + (D && _ === "(" ? ")" : ""), E) {
          for (x = -1, S = N.length; ++x < S; ) if (y = N.charCodeAt(x), 48 > y || y > 57) {
            d = (y === 46 ? o2 + N.slice(x + 1) : N.slice(x)) + d, N = N.slice(0, x);
            break;
          }
        }
      }
      I && !T && (N = e(N, 1 / 0));
      var $ = v.length + N.length + d.length, P = $ < k ? new Array(k - $ + 1).join(c) : "";
      switch (I && T && (N = e(P + N, P.length ? k - d.length : 1 / 0), P = ""), m2) {
        case "<":
          N = v + N + d + P;
          break;
        case "=":
          N = v + P + N + d;
          break;
        case "^":
          N = P.slice(0, $ = P.length >> 1) + v + N + d + P.slice($);
          break;
        default:
          N = P + v + N + d;
          break;
      }
      return a(N);
    }
    return m(B, "format"), B.toString = function() {
      return p + "";
    }, B;
  }
  m(f, "newFormat");
  function h(p, c) {
    var m2 = f((p = Ut(p), p.type = "f", p)), _ = Math.max(-8, Math.min(8, Math.floor(gt(c) / 3))) * 3, M = Math.pow(10, -_), T = Pa[8 + _ / 3];
    return function(k) {
      return m2(M * k) + T;
    };
  }
  return m(h, "formatPrefix"), { format: f, formatPrefix: h };
}
m(Si, "default");
var Dn;
var $n;
var On;
Ci({ thousands: ",", grouping: [3], currency: ["$", ""] });
function Ci(t10) {
  return Dn = Si(t10), $n = Dn.format, On = Dn.formatPrefix, Dn;
}
m(Ci, "defaultLocale");
function En(t10) {
  return Math.max(0, -gt(Math.abs(t10)));
}
m(En, "default");
function In(t10, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(gt(e) / 3))) * 3 - gt(Math.abs(t10)));
}
m(In, "default");
function Rn(t10, e) {
  return t10 = Math.abs(t10), e = Math.abs(e) - t10, Math.max(0, gt(e) - gt(t10)) + 1;
}
m(Rn, "default");
function qf(t10) {
  var e = 0, n = t10.children, i = n && n.length;
  if (!i) e = 1;
  else for (; --i >= 0; ) e += n[i].value;
  t10.value = e;
}
m(qf, "count");
function Ni() {
  return this.eachAfter(qf);
}
m(Ni, "default");
function Ai(t10, e) {
  let n = -1;
  for (let i of this) t10.call(e, i, ++n, this);
  return this;
}
m(Ai, "default");
function Di(t10, e) {
  for (var n = this, i = [n], o2, a, s = -1; n = i.pop(); ) if (t10.call(e, n, ++s, this), o2 = n.children) for (a = o2.length - 1; a >= 0; --a) i.push(o2[a]);
  return this;
}
m(Di, "default");
function $i(t10, e) {
  for (var n = this, i = [n], o2 = [], a, s, u, l = -1; n = i.pop(); ) if (o2.push(n), a = n.children) for (s = 0, u = a.length; s < u; ++s) i.push(a[s]);
  for (; n = o2.pop(); ) t10.call(e, n, ++l, this);
  return this;
}
m($i, "default");
function Oi(t10, e) {
  let n = -1;
  for (let i of this) if (t10.call(e, i, ++n, this)) return i;
}
m(Oi, "default");
function Ei(t10) {
  return this.eachAfter(function(e) {
    for (var n = +t10(e.data) || 0, i = e.children, o2 = i && i.length; --o2 >= 0; ) n += i[o2].value;
    e.value = n;
  });
}
m(Ei, "default");
function Ii(t10) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t10);
  });
}
m(Ii, "default");
function Ri(t10) {
  for (var e = this, n = Wf(e, t10), i = [e]; e !== n; ) e = e.parent, i.push(e);
  for (var o2 = i.length; t10 !== n; ) i.splice(o2, 0, t10), t10 = t10.parent;
  return i;
}
m(Ri, "default");
function Wf(t10, e) {
  if (t10 === e) return t10;
  var n = t10.ancestors(), i = e.ancestors(), o2 = null;
  for (t10 = n.pop(), e = i.pop(); t10 === e; ) o2 = t10, t10 = n.pop(), e = i.pop();
  return o2;
}
m(Wf, "leastCommonAncestor");
function Pi() {
  for (var t10 = this, e = [t10]; t10 = t10.parent; ) e.push(t10);
  return e;
}
m(Pi, "default");
function Yi() {
  return Array.from(this);
}
m(Yi, "default");
function Fi() {
  var t10 = [];
  return this.eachBefore(function(e) {
    e.children || t10.push(e);
  }), t10;
}
m(Fi, "default");
function Ui() {
  var t10 = this, e = [];
  return t10.each(function(n) {
    n !== t10 && e.push({ source: n.parent, target: n });
  }), e;
}
m(Ui, "default");
function* Li() {
  var t10 = this, e, n = [t10], i, o2, a;
  do
    for (e = n.reverse(), n = []; t10 = e.pop(); ) if (yield t10, i = t10.children) for (o2 = 0, a = i.length; o2 < a; ++o2) n.push(i[o2]);
  while (n.length);
}
m(Li, "default");
function Pn(t10, e) {
  t10 instanceof Map ? (t10 = [void 0, t10], e === void 0 && (e = Gf)) : e === void 0 && (e = Xf);
  for (var n = new ze(t10), i, o2 = [n], a, s, u, l; i = o2.pop(); ) if ((s = e(i.data)) && (l = (s = Array.from(s)).length)) for (i.children = s, u = l - 1; u >= 0; --u) o2.push(a = s[u] = new ze(s[u])), a.parent = i, a.depth = i.depth + 1;
  return n.eachBefore(Qf);
}
m(Pn, "hierarchy");
function Vf() {
  return Pn(this).eachBefore(Zf);
}
m(Vf, "node_copy");
function Xf(t10) {
  return t10.children;
}
m(Xf, "objectChildren");
function Gf(t10) {
  return Array.isArray(t10) ? t10[1] : null;
}
m(Gf, "mapChildren");
function Zf(t10) {
  t10.data.value !== void 0 && (t10.value = t10.data.value), t10.data = t10.data.data;
}
m(Zf, "copyData");
function Qf(t10) {
  var e = 0;
  do
    t10.height = e;
  while ((t10 = t10.parent) && t10.height < ++e);
}
m(Qf, "computeHeight");
function ze(t10) {
  this.data = t10, this.depth = this.height = 0, this.parent = null;
}
m(ze, "Node");
ze.prototype = Pn.prototype = { constructor: ze, count: Ni, each: Ai, eachAfter: $i, eachBefore: Di, find: Oi, sum: Ei, sort: Ii, path: Ri, ancestors: Pi, descendants: Yi, leaves: Fi, links: Ui, copy: Vf, [Symbol.iterator]: Li };
function zi(t10) {
  t10.x0 = Math.round(t10.x0), t10.y0 = Math.round(t10.y0), t10.x1 = Math.round(t10.x1), t10.y1 = Math.round(t10.y1);
}
m(zi, "default");
function Hi(t10, e, n, i, o2) {
  for (var a = t10.children, s, u = -1, l = a.length, f = t10.value && (i - e) / t10.value; ++u < l; ) s = a[u], s.y0 = n, s.y1 = o2, s.x0 = e, s.x1 = e += s.value * f;
}
m(Hi, "default");
function Bi(t10, e, n, i, o2) {
  for (var a = t10.children, s, u = -1, l = a.length, f = t10.value && (o2 - n) / t10.value; ++u < l; ) s = a[u], s.x0 = e, s.x1 = i, s.y0 = n, s.y1 = n += s.value * f;
}
m(Bi, "default");
var Kf = (1 + Math.sqrt(5)) / 2;
function Jf(t10, e, n, i, o2, a) {
  for (var s = [], u = e.children, l, f, h = 0, p = 0, c = u.length, m2, _, M = e.value, T, k, I, C, A, O, w; h < c; ) {
    m2 = o2 - n, _ = a - i;
    do
      T = u[p++].value;
    while (!T && p < c);
    for (k = I = T, O = Math.max(_ / m2, m2 / _) / (M * t10), w = T * T * O, A = Math.max(I / w, w / k); p < c; ++p) {
      if (T += f = u[p].value, f < k && (k = f), f > I && (I = f), w = T * T * O, C = Math.max(I / w, w / k), C > A) {
        T -= f;
        break;
      }
      A = C;
    }
    s.push(l = { value: T, dice: m2 < _, children: u.slice(h, p) }), l.dice ? Hi(l, n, i, o2, M ? i += _ * T / M : a) : Bi(l, n, i, M ? n += m2 * T / M : o2, a), M -= T, h = p;
  }
  return s;
}
m(Jf, "squarifyRatio");
var Ya = m(function t2(e) {
  function n(i, o2, a, s, u) {
    Jf(e, i, o2, a, s, u);
  }
  return m(n, "squarify"), n.ratio = function(i) {
    return t2((i = +i) > 1 ? i : 1);
  }, n;
}, "custom")(Kf);
function Fa(t10) {
  if (typeof t10 != "function") throw new Error();
  return t10;
}
m(Fa, "required");
function ye() {
  return 0;
}
m(ye, "constantZero");
function Jt(t10) {
  return function() {
    return t10;
  };
}
m(Jt, "default");
function Ua() {
  var t10 = Ya, e = false, n = 1, i = 1, o2 = [0], a = ye, s = ye, u = ye, l = ye, f = ye;
  function h(c) {
    return c.x0 = c.y0 = 0, c.x1 = n, c.y1 = i, c.eachBefore(p), o2 = [0], e && c.eachBefore(zi), c;
  }
  m(h, "treemap");
  function p(c) {
    var m2 = o2[c.depth], _ = c.x0 + m2, M = c.y0 + m2, T = c.x1 - m2, k = c.y1 - m2;
    T < _ && (_ = T = (_ + T) / 2), k < M && (M = k = (M + k) / 2), c.x0 = _, c.y0 = M, c.x1 = T, c.y1 = k, c.children && (m2 = o2[c.depth + 1] = a(c) / 2, _ += f(c) - m2, M += s(c) - m2, T -= u(c) - m2, k -= l(c) - m2, T < _ && (_ = T = (_ + T) / 2), k < M && (M = k = (M + k) / 2), t10(c, _, M, T, k));
  }
  return m(p, "positionNode"), h.round = function(c) {
    return arguments.length ? (e = !!c, h) : e;
  }, h.size = function(c) {
    return arguments.length ? (n = +c[0], i = +c[1], h) : [n, i];
  }, h.tile = function(c) {
    return arguments.length ? (t10 = Fa(c), h) : t10;
  }, h.padding = function(c) {
    return arguments.length ? h.paddingInner(c).paddingOuter(c) : h.paddingInner();
  }, h.paddingInner = function(c) {
    return arguments.length ? (a = typeof c == "function" ? c : Jt(+c), h) : a;
  }, h.paddingOuter = function(c) {
    return arguments.length ? h.paddingTop(c).paddingRight(c).paddingBottom(c).paddingLeft(c) : h.paddingTop();
  }, h.paddingTop = function(c) {
    return arguments.length ? (s = typeof c == "function" ? c : Jt(+c), h) : s;
  }, h.paddingRight = function(c) {
    return arguments.length ? (u = typeof c == "function" ? c : Jt(+c), h) : u;
  }, h.paddingBottom = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : Jt(+c), h) : l;
  }, h.paddingLeft = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : Jt(+c), h) : f;
  }, h;
}
m(Ua, "default");
function Lt(t10, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t10);
      break;
    default:
      this.range(e).domain(t10);
      break;
  }
  return this;
}
m(Lt, "initRange");
var qi = Symbol("implicit");
function He() {
  var t10 = new fe(), e = [], n = [], i = qi;
  function o2(a) {
    let s = t10.get(a);
    if (s === void 0) {
      if (i !== qi) return i;
      t10.set(a, s = e.push(a) - 1);
    }
    return n[s % n.length];
  }
  return m(o2, "scale"), o2.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [], t10 = new fe();
    for (let s of a) t10.has(s) || t10.set(s, e.push(s) - 1);
    return o2;
  }, o2.range = function(a) {
    return arguments.length ? (n = Array.from(a), o2) : n.slice();
  }, o2.unknown = function(a) {
    return arguments.length ? (i = a, o2) : i;
  }, o2.copy = function() {
    return He(e, n).unknown(i);
  }, Lt.apply(o2, arguments), o2;
}
m(He, "ordinal");
function Wi(t10) {
  return function() {
    return t10;
  };
}
m(Wi, "constants");
function Vi(t10) {
  return +t10;
}
m(Vi, "number");
var La = [0, 1];
function ve(t10) {
  return t10;
}
m(ve, "identity");
function Xi(t10, e) {
  return (e -= t10 = +t10) ? function(n) {
    return (n - t10) / e;
  } : Wi(isNaN(e) ? NaN : 0.5);
}
m(Xi, "normalize");
function jf(t10, e) {
  var n;
  return t10 > e && (n = t10, t10 = e, e = n), function(i) {
    return Math.max(t10, Math.min(e, i));
  };
}
m(jf, "clamper");
function tl(t10, e, n) {
  var i = t10[0], o2 = t10[1], a = e[0], s = e[1];
  return o2 < i ? (i = Xi(o2, i), a = n(s, a)) : (i = Xi(i, o2), a = n(a, s)), function(u) {
    return a(i(u));
  };
}
m(tl, "bimap");
function el(t10, e, n) {
  var i = Math.min(t10.length, e.length) - 1, o2 = new Array(i), a = new Array(i), s = -1;
  for (t10[i] < t10[0] && (t10 = t10.slice().reverse(), e = e.slice().reverse()); ++s < i; ) o2[s] = Xi(t10[s], t10[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(u) {
    var l = pr(t10, u, 1, i) - 1;
    return a[l](o2[l](u));
  };
}
m(el, "polymap");
function Yn(t10, e) {
  return e.domain(t10.domain()).range(t10.range()).interpolate(t10.interpolate()).clamp(t10.clamp()).unknown(t10.unknown());
}
m(Yn, "copy");
function nl() {
  var t10 = La, e = La, n = Ft, i, o2, a, s = ve, u, l, f;
  function h() {
    var c = Math.min(t10.length, e.length);
    return s !== ve && (s = jf(t10[0], t10[c - 1])), u = c > 2 ? el : tl, l = f = null, p;
  }
  m(h, "rescale");
  function p(c) {
    return c == null || isNaN(c = +c) ? a : (l || (l = u(t10.map(i), e, n)))(i(s(c)));
  }
  return m(p, "scale"), p.invert = function(c) {
    return s(o2((f || (f = u(e, t10.map(i), j)))(c)));
  }, p.domain = function(c) {
    return arguments.length ? (t10 = Array.from(c, Vi), h()) : t10.slice();
  }, p.range = function(c) {
    return arguments.length ? (e = Array.from(c), h()) : e.slice();
  }, p.rangeRound = function(c) {
    return e = Array.from(c), n = Mn, h();
  }, p.clamp = function(c) {
    return arguments.length ? (s = c ? true : ve, h()) : s !== ve;
  }, p.interpolate = function(c) {
    return arguments.length ? (n = c, h()) : n;
  }, p.unknown = function(c) {
    return arguments.length ? (a = c, p) : a;
  }, function(c, m2) {
    return i = c, o2 = m2, h();
  };
}
m(nl, "transformer");
function Be() {
  return nl()(ve, ve);
}
m(Be, "continuous");
function Gi(t10, e, n, i) {
  var o2 = le(t10, e, n), a;
  switch (i = Ut(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t10), Math.abs(e));
      return i.precision == null && !isNaN(a = In(o2, s)) && (i.precision = a), On(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = Rn(o2, Math.max(Math.abs(t10), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = En(o2)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return $n(i);
}
m(Gi, "tickFormat");
function rl(t10) {
  var e = t10.domain;
  return t10.ticks = function(n) {
    var i = e();
    return hn(i[0], i[i.length - 1], n ?? 10);
  }, t10.tickFormat = function(n, i) {
    var o2 = e();
    return Gi(o2[0], o2[o2.length - 1], n ?? 10, i);
  }, t10.nice = function(n) {
    n == null && (n = 10);
    var i = e(), o2 = 0, a = i.length - 1, s = i[o2], u = i[a], l, f, h = 10;
    for (u < s && (f = s, s = u, u = f, f = o2, o2 = a, a = f); h-- > 0; ) {
      if (f = Ee(s, u, n), f === l) return i[o2] = s, i[a] = u, e(i);
      if (f > 0) s = Math.floor(s / f) * f, u = Math.ceil(u / f) * f;
      else if (f < 0) s = Math.ceil(s * f) / f, u = Math.floor(u * f) / f;
      else break;
      l = f;
    }
    return t10;
  }, t10;
}
m(rl, "linearish");
function Zi() {
  var t10 = Be();
  return t10.copy = function() {
    return Yn(t10, Zi());
  }, Lt.apply(t10, arguments), rl(t10);
}
m(Zi, "linear");
var Qi = /* @__PURE__ */ new Date();
var Ki = /* @__PURE__ */ new Date();
function H(t10, e, n, i) {
  function o2(a) {
    return t10(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return m(o2, "interval"), o2.floor = (a) => (t10(a = /* @__PURE__ */ new Date(+a)), a), o2.ceil = (a) => (t10(a = new Date(a - 1)), e(a, 1), t10(a), a), o2.round = (a) => {
    let s = o2(a), u = o2.ceil(a);
    return a - s < u - a ? s : u;
  }, o2.offset = (a, s) => (e(a = /* @__PURE__ */ new Date(+a), s == null ? 1 : Math.floor(s)), a), o2.range = (a, s, u) => {
    let l = [];
    if (a = o2.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < s) || !(u > 0)) return l;
    let f;
    do
      l.push(f = /* @__PURE__ */ new Date(+a)), e(a, u), t10(a);
    while (f < a && a < s);
    return l;
  }, o2.filter = (a) => H((s) => {
    if (s >= s) for (; t10(s), !a(s); ) s.setTime(s - 1);
  }, (s, u) => {
    if (s >= s) if (u < 0) for (; ++u <= 0; ) for (; e(s, -1), !a(s); ) ;
    else for (; --u >= 0; ) for (; e(s, 1), !a(s); ) ;
  }), n && (o2.count = (a, s) => (Qi.setTime(+a), Ki.setTime(+s), t10(Qi), t10(Ki), Math.floor(n(Qi, Ki))), o2.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? o2.filter(i ? (s) => i(s) % a === 0 : (s) => o2.count(0, s) % a === 0) : o2)), o2;
}
m(H, "timeInterval");
var jt = H(() => {
}, (t10, e) => {
  t10.setTime(+t10 + e);
}, (t10, e) => e - t10);
jt.every = (t10) => (t10 = Math.floor(t10), !isFinite(t10) || !(t10 > 0) ? null : t10 > 1 ? H((e) => {
  e.setTime(Math.floor(e / t10) * t10);
}, (e, n) => {
  e.setTime(+e + n * t10);
}, (e, n) => (n - e) / t10) : jt);
var za = jt.range;
var Tt = H((t10) => {
  t10.setTime(t10 - t10.getMilliseconds());
}, (t10, e) => {
  t10.setTime(+t10 + e * 1e3);
}, (t10, e) => (e - t10) / 1e3, (t10) => t10.getUTCSeconds());
var Ha = Tt.range;
var we = H((t10) => {
  t10.setTime(t10 - t10.getMilliseconds() - t10.getSeconds() * 1e3);
}, (t10, e) => {
  t10.setTime(+t10 + e * 6e4);
}, (t10, e) => (e - t10) / 6e4, (t10) => t10.getMinutes());
var il = we.range;
var Fn = H((t10) => {
  t10.setUTCSeconds(0, 0);
}, (t10, e) => {
  t10.setTime(+t10 + e * 6e4);
}, (t10, e) => (e - t10) / 6e4, (t10) => t10.getUTCMinutes());
var ol = Fn.range;
var be = H((t10) => {
  t10.setTime(t10 - t10.getMilliseconds() - t10.getSeconds() * 1e3 - t10.getMinutes() * 6e4);
}, (t10, e) => {
  t10.setTime(+t10 + e * 36e5);
}, (t10, e) => (e - t10) / 36e5, (t10) => t10.getHours());
var al = be.range;
var Un = H((t10) => {
  t10.setUTCMinutes(0, 0, 0);
}, (t10, e) => {
  t10.setTime(+t10 + e * 36e5);
}, (t10, e) => (e - t10) / 36e5, (t10) => t10.getUTCHours());
var sl = Un.range;
var Dt = H((t10) => t10.setHours(0, 0, 0, 0), (t10, e) => t10.setDate(t10.getDate() + e), (t10, e) => (e - t10 - (e.getTimezoneOffset() - t10.getTimezoneOffset()) * 6e4) / 864e5, (t10) => t10.getDate() - 1);
var ul = Dt.range;
var We = H((t10) => {
  t10.setUTCHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setUTCDate(t10.getUTCDate() + e);
}, (t10, e) => (e - t10) / 864e5, (t10) => t10.getUTCDate() - 1);
var fl = We.range;
var Ln = H((t10) => {
  t10.setUTCHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setUTCDate(t10.getUTCDate() + e);
}, (t10, e) => (e - t10) / 864e5, (t10) => Math.floor(t10 / 864e5));
var ll = Ln.range;
function ne(t10) {
  return H((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t10) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5);
}
m(ne, "timeWeekday");
var $t = ne(0);
var Me = ne(1);
var qa = ne(2);
var Wa = ne(3);
var zt = ne(4);
var Va = ne(5);
var Xa = ne(6);
var Ga = $t.range;
var cl = Me.range;
var hl = qa.range;
var pl = Wa.range;
var ml = zt.range;
var dl = Va.range;
var xl = Xa.range;
function re(t10) {
  return H((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t10) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / 6048e5);
}
m(re, "utcWeekday");
var ie = re(0);
var Te = re(1);
var Za = re(2);
var Qa = re(3);
var Ht = re(4);
var Ka = re(5);
var Ja = re(6);
var ja = ie.range;
var _l = Te.range;
var gl = Za.range;
var yl = Qa.range;
var vl = Ht.range;
var wl = Ka.range;
var bl = Ja.range;
var ke = H((t10) => {
  t10.setDate(1), t10.setHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setMonth(t10.getMonth() + e);
}, (t10, e) => e.getMonth() - t10.getMonth() + (e.getFullYear() - t10.getFullYear()) * 12, (t10) => t10.getMonth());
var Ml = ke.range;
var zn = H((t10) => {
  t10.setUTCDate(1), t10.setUTCHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setUTCMonth(t10.getUTCMonth() + e);
}, (t10, e) => e.getUTCMonth() - t10.getUTCMonth() + (e.getUTCFullYear() - t10.getUTCFullYear()) * 12, (t10) => t10.getUTCMonth());
var Tl = zn.range;
var lt = H((t10) => {
  t10.setMonth(0, 1), t10.setHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setFullYear(t10.getFullYear() + e);
}, (t10, e) => e.getFullYear() - t10.getFullYear(), (t10) => t10.getFullYear());
lt.every = (t10) => !isFinite(t10 = Math.floor(t10)) || !(t10 > 0) ? null : H((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t10) * t10), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t10);
});
var kl = lt.range;
var yt = H((t10) => {
  t10.setUTCMonth(0, 1), t10.setUTCHours(0, 0, 0, 0);
}, (t10, e) => {
  t10.setUTCFullYear(t10.getUTCFullYear() + e);
}, (t10, e) => e.getUTCFullYear() - t10.getUTCFullYear(), (t10) => t10.getUTCFullYear());
yt.every = (t10) => !isFinite(t10 = Math.floor(t10)) || !(t10 > 0) ? null : H((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t10) * t10), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t10);
});
var Sl = yt.range;
function es(t10, e, n, i, o2, a) {
  let s = [[Tt, 1, 1e3], [Tt, 5, 5 * 1e3], [Tt, 15, 15 * 1e3], [Tt, 30, 30 * 1e3], [a, 1, 6e4], [a, 5, 5 * 6e4], [a, 15, 15 * 6e4], [a, 30, 30 * 6e4], [o2, 1, 36e5], [o2, 3, 3 * 36e5], [o2, 6, 6 * 36e5], [o2, 12, 12 * 36e5], [i, 1, 864e5], [i, 2, 2 * 864e5], [n, 1, 6048e5], [e, 1, 2592e6], [e, 3, 3 * 2592e6], [t10, 1, 31536e6]];
  function u(f, h, p) {
    let c = h < f;
    c && ([f, h] = [h, f]);
    let m2 = p && typeof p.range == "function" ? p : l(f, h, p), _ = m2 ? m2.range(f, +h + 1) : [];
    return c ? _.reverse() : _;
  }
  m(u, "ticks");
  function l(f, h, p) {
    let c = Math.abs(h - f) / p, m2 = Xt(([, , T]) => T).right(s, c);
    if (m2 === s.length) return t10.every(le(f / 31536e6, h / 31536e6, p));
    if (m2 === 0) return jt.every(Math.max(le(f, h, p), 1));
    let [_, M] = s[c / s[m2 - 1][2] < s[m2][2] / c ? m2 - 1 : m2];
    return _.every(M);
  }
  return m(l, "tickInterval"), [u, l];
}
m(es, "ticker");
var [Nl, Al] = es(yt, zn, ie, Ln, Un, Fn);
var [Ji, ji] = es(lt, ke, $t, Dt, be, we);
function to(t10) {
  if (0 <= t10.y && t10.y < 100) {
    var e = new Date(-1, t10.m, t10.d, t10.H, t10.M, t10.S, t10.L);
    return e.setFullYear(t10.y), e;
  }
  return new Date(t10.y, t10.m, t10.d, t10.H, t10.M, t10.S, t10.L);
}
m(to, "localDate");
function eo(t10) {
  if (0 <= t10.y && t10.y < 100) {
    var e = new Date(Date.UTC(-1, t10.m, t10.d, t10.H, t10.M, t10.S, t10.L));
    return e.setUTCFullYear(t10.y), e;
  }
  return new Date(Date.UTC(t10.y, t10.m, t10.d, t10.H, t10.M, t10.S, t10.L));
}
m(eo, "utcDate");
function Ve(t10, e, n) {
  return { y: t10, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
m(Ve, "newDate");
function no(t10) {
  var e = t10.dateTime, n = t10.date, i = t10.time, o2 = t10.periods, a = t10.days, s = t10.shortDays, u = t10.months, l = t10.shortMonths, f = Xe(o2), h = Ge(o2), p = Xe(a), c = Ge(a), m2 = Xe(s), _ = Ge(s), M = Xe(u), T = Ge(u), k = Xe(l), I = Ge(l), C = { a: D, A: $, b: P, B: z, c: null, d: ss, e: ss, f: Jl, g: uc, G: lc, H: Zl, I: Ql, j: Kl, L: hs, m: jl, M: tc, p: W, q: X, Q: ls, s: cs, S: ec, u: nc, U: rc, V: ic, w: oc, W: ac, x: null, X: null, y: sc, Y: fc, Z: cc, "%": fs }, A = { a: J, A: ht, b: Q, B: dt, c: null, d: us, e: us, f: dc, g: kc, G: Cc, H: hc, I: pc, j: mc, L: ms, m: xc, M: _c, p: st, q: Z, Q: ls, s: cs, S: gc, u: yc, U: vc, V: wc, w: bc, W: Mc, x: null, X: null, y: Tc, Y: Sc, Z: Nc, "%": fs }, O = { a: B, A: N, b: v, B: d, c: x, d: os, e: os, f: Wl, g: is, G: rs, H: as, I: as, j: zl, L: ql, m: Ll, M: Hl, p: E, q: Ul, Q: Xl, s: Gl, S: Bl, u: Il, U: Rl, V: Pl, w: El, W: Yl, x: S, X: y, y: is, Y: rs, Z: Fl, "%": Vl };
  C.x = w(n, C), C.X = w(i, C), C.c = w(e, C), A.x = w(n, A), A.X = w(i, A), A.c = w(e, A);
  function w(b, R) {
    return function(F) {
      var g = [], at = -1, q = 0, ut = b.length, ft, Wt, Ho;
      for (F instanceof Date || (F = /* @__PURE__ */ new Date(+F)); ++at < ut; ) b.charCodeAt(at) === 37 && (g.push(b.slice(q, at)), (Wt = ns[ft = b.charAt(++at)]) != null ? ft = b.charAt(++at) : Wt = ft === "e" ? " " : "0", (Ho = R[ft]) && (ft = Ho(F, Wt)), g.push(ft), q = at + 1);
      return g.push(b.slice(q, at)), g.join("");
    };
  }
  m(w, "newFormat");
  function Y(b, R) {
    return function(F) {
      var g = Ve(1900, void 0, 1), at = U(g, b, F += "", 0), q, ut;
      if (at != F.length) return null;
      if ("Q" in g) return new Date(g.Q);
      if ("s" in g) return new Date(g.s * 1e3 + ("L" in g ? g.L : 0));
      if (R && !("Z" in g) && (g.Z = 0), "p" in g && (g.H = g.H % 12 + g.p * 12), g.m === void 0 && (g.m = "q" in g ? g.q : 0), "V" in g) {
        if (g.V < 1 || g.V > 53) return null;
        "w" in g || (g.w = 1), "Z" in g ? (q = eo(Ve(g.y, 0, 1)), ut = q.getUTCDay(), q = ut > 4 || ut === 0 ? Te.ceil(q) : Te(q), q = We.offset(q, (g.V - 1) * 7), g.y = q.getUTCFullYear(), g.m = q.getUTCMonth(), g.d = q.getUTCDate() + (g.w + 6) % 7) : (q = to(Ve(g.y, 0, 1)), ut = q.getDay(), q = ut > 4 || ut === 0 ? Me.ceil(q) : Me(q), q = Dt.offset(q, (g.V - 1) * 7), g.y = q.getFullYear(), g.m = q.getMonth(), g.d = q.getDate() + (g.w + 6) % 7);
      } else ("W" in g || "U" in g) && ("w" in g || (g.w = "u" in g ? g.u % 7 : "W" in g ? 1 : 0), ut = "Z" in g ? eo(Ve(g.y, 0, 1)).getUTCDay() : to(Ve(g.y, 0, 1)).getDay(), g.m = 0, g.d = "W" in g ? (g.w + 6) % 7 + g.W * 7 - (ut + 5) % 7 : g.w + g.U * 7 - (ut + 6) % 7);
      return "Z" in g ? (g.H += g.Z / 100 | 0, g.M += g.Z % 100, eo(g)) : to(g);
    };
  }
  m(Y, "newParse");
  function U(b, R, F, g) {
    for (var at = 0, q = R.length, ut = F.length, ft, Wt; at < q; ) {
      if (g >= ut) return -1;
      if (ft = R.charCodeAt(at++), ft === 37) {
        if (ft = R.charAt(at++), Wt = O[ft in ns ? R.charAt(at++) : ft], !Wt || (g = Wt(b, F, g)) < 0) return -1;
      } else if (ft != F.charCodeAt(g++)) return -1;
    }
    return g;
  }
  m(U, "parseSpecifier");
  function E(b, R, F) {
    var g = f.exec(R.slice(F));
    return g ? (b.p = h.get(g[0].toLowerCase()), F + g[0].length) : -1;
  }
  m(E, "parsePeriod");
  function B(b, R, F) {
    var g = m2.exec(R.slice(F));
    return g ? (b.w = _.get(g[0].toLowerCase()), F + g[0].length) : -1;
  }
  m(B, "parseShortWeekday");
  function N(b, R, F) {
    var g = p.exec(R.slice(F));
    return g ? (b.w = c.get(g[0].toLowerCase()), F + g[0].length) : -1;
  }
  m(N, "parseWeekday");
  function v(b, R, F) {
    var g = k.exec(R.slice(F));
    return g ? (b.m = I.get(g[0].toLowerCase()), F + g[0].length) : -1;
  }
  m(v, "parseShortMonth");
  function d(b, R, F) {
    var g = M.exec(R.slice(F));
    return g ? (b.m = T.get(g[0].toLowerCase()), F + g[0].length) : -1;
  }
  m(d, "parseMonth");
  function x(b, R, F) {
    return U(b, e, R, F);
  }
  m(x, "parseLocaleDateTime");
  function S(b, R, F) {
    return U(b, n, R, F);
  }
  m(S, "parseLocaleDate");
  function y(b, R, F) {
    return U(b, i, R, F);
  }
  m(y, "parseLocaleTime");
  function D(b) {
    return s[b.getDay()];
  }
  m(D, "formatShortWeekday");
  function $(b) {
    return a[b.getDay()];
  }
  m($, "formatWeekday");
  function P(b) {
    return l[b.getMonth()];
  }
  m(P, "formatShortMonth");
  function z(b) {
    return u[b.getMonth()];
  }
  m(z, "formatMonth");
  function W(b) {
    return o2[+(b.getHours() >= 12)];
  }
  m(W, "formatPeriod");
  function X(b) {
    return 1 + ~~(b.getMonth() / 3);
  }
  m(X, "formatQuarter");
  function J(b) {
    return s[b.getUTCDay()];
  }
  m(J, "formatUTCShortWeekday");
  function ht(b) {
    return a[b.getUTCDay()];
  }
  m(ht, "formatUTCWeekday");
  function Q(b) {
    return l[b.getUTCMonth()];
  }
  m(Q, "formatUTCShortMonth");
  function dt(b) {
    return u[b.getUTCMonth()];
  }
  m(dt, "formatUTCMonth");
  function st(b) {
    return o2[+(b.getUTCHours() >= 12)];
  }
  m(st, "formatUTCPeriod");
  function Z(b) {
    return 1 + ~~(b.getUTCMonth() / 3);
  }
  return m(Z, "formatUTCQuarter"), { format: m(function(b) {
    var R = w(b += "", C);
    return R.toString = function() {
      return b;
    }, R;
  }, "format"), parse: m(function(b) {
    var R = Y(b += "", false);
    return R.toString = function() {
      return b;
    }, R;
  }, "parse"), utcFormat: m(function(b) {
    var R = w(b += "", A);
    return R.toString = function() {
      return b;
    }, R;
  }, "utcFormat"), utcParse: m(function(b) {
    var R = Y(b += "", true);
    return R.toString = function() {
      return b;
    }, R;
  }, "utcParse") };
}
m(no, "formatLocale");
var ns = { "-": "", _: " ", 0: "0" };
var tt = /^\s*\d+/;
var Dl = /^%/;
var $l = /[\\^$*+?|[\]().{}]/g;
function L(t10, e, n) {
  var i = t10 < 0 ? "-" : "", o2 = (i ? -t10 : t10) + "", a = o2.length;
  return i + (a < n ? new Array(n - a + 1).join(e) + o2 : o2);
}
m(L, "pad");
function Ol(t10) {
  return t10.replace($l, "\\$&");
}
m(Ol, "requote");
function Xe(t10) {
  return new RegExp("^(?:" + t10.map(Ol).join("|") + ")", "i");
}
m(Xe, "formatRe");
function Ge(t10) {
  return new Map(t10.map((e, n) => [e.toLowerCase(), n]));
}
m(Ge, "formatLookup");
function El(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 1));
  return i ? (t10.w = +i[0], n + i[0].length) : -1;
}
m(El, "parseWeekdayNumberSunday");
function Il(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 1));
  return i ? (t10.u = +i[0], n + i[0].length) : -1;
}
m(Il, "parseWeekdayNumberMonday");
function Rl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.U = +i[0], n + i[0].length) : -1;
}
m(Rl, "parseWeekNumberSunday");
function Pl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.V = +i[0], n + i[0].length) : -1;
}
m(Pl, "parseWeekNumberISO");
function Yl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.W = +i[0], n + i[0].length) : -1;
}
m(Yl, "parseWeekNumberMonday");
function rs(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 4));
  return i ? (t10.y = +i[0], n + i[0].length) : -1;
}
m(rs, "parseFullYear");
function is(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.y = +i[0] + (+i[0] > 68 ? 1900 : 2e3), n + i[0].length) : -1;
}
m(is, "parseYear");
function Fl(t10, e, n) {
  var i = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return i ? (t10.Z = i[1] ? 0 : -(i[2] + (i[3] || "00")), n + i[0].length) : -1;
}
m(Fl, "parseZone");
function Ul(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 1));
  return i ? (t10.q = i[0] * 3 - 3, n + i[0].length) : -1;
}
m(Ul, "parseQuarter");
function Ll(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.m = i[0] - 1, n + i[0].length) : -1;
}
m(Ll, "parseMonthNumber");
function os(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.d = +i[0], n + i[0].length) : -1;
}
m(os, "parseDayOfMonth");
function zl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 3));
  return i ? (t10.m = 0, t10.d = +i[0], n + i[0].length) : -1;
}
m(zl, "parseDayOfYear");
function as(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.H = +i[0], n + i[0].length) : -1;
}
m(as, "parseHour24");
function Hl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.M = +i[0], n + i[0].length) : -1;
}
m(Hl, "parseMinutes");
function Bl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 2));
  return i ? (t10.S = +i[0], n + i[0].length) : -1;
}
m(Bl, "parseSeconds");
function ql(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 3));
  return i ? (t10.L = +i[0], n + i[0].length) : -1;
}
m(ql, "parseMilliseconds");
function Wl(t10, e, n) {
  var i = tt.exec(e.slice(n, n + 6));
  return i ? (t10.L = Math.floor(i[0] / 1e3), n + i[0].length) : -1;
}
m(Wl, "parseMicroseconds");
function Vl(t10, e, n) {
  var i = Dl.exec(e.slice(n, n + 1));
  return i ? n + i[0].length : -1;
}
m(Vl, "parseLiteralPercent");
function Xl(t10, e, n) {
  var i = tt.exec(e.slice(n));
  return i ? (t10.Q = +i[0], n + i[0].length) : -1;
}
m(Xl, "parseUnixTimestamp");
function Gl(t10, e, n) {
  var i = tt.exec(e.slice(n));
  return i ? (t10.s = +i[0], n + i[0].length) : -1;
}
m(Gl, "parseUnixTimestampSeconds");
function ss(t10, e) {
  return L(t10.getDate(), e, 2);
}
m(ss, "formatDayOfMonth");
function Zl(t10, e) {
  return L(t10.getHours(), e, 2);
}
m(Zl, "formatHour24");
function Ql(t10, e) {
  return L(t10.getHours() % 12 || 12, e, 2);
}
m(Ql, "formatHour12");
function Kl(t10, e) {
  return L(1 + Dt.count(lt(t10), t10), e, 3);
}
m(Kl, "formatDayOfYear");
function hs(t10, e) {
  return L(t10.getMilliseconds(), e, 3);
}
m(hs, "formatMilliseconds");
function Jl(t10, e) {
  return hs(t10, e) + "000";
}
m(Jl, "formatMicroseconds");
function jl(t10, e) {
  return L(t10.getMonth() + 1, e, 2);
}
m(jl, "formatMonthNumber");
function tc(t10, e) {
  return L(t10.getMinutes(), e, 2);
}
m(tc, "formatMinutes");
function ec(t10, e) {
  return L(t10.getSeconds(), e, 2);
}
m(ec, "formatSeconds");
function nc(t10) {
  var e = t10.getDay();
  return e === 0 ? 7 : e;
}
m(nc, "formatWeekdayNumberMonday");
function rc(t10, e) {
  return L($t.count(lt(t10) - 1, t10), e, 2);
}
m(rc, "formatWeekNumberSunday");
function ps(t10) {
  var e = t10.getDay();
  return e >= 4 || e === 0 ? zt(t10) : zt.ceil(t10);
}
m(ps, "dISO");
function ic(t10, e) {
  return t10 = ps(t10), L(zt.count(lt(t10), t10) + (lt(t10).getDay() === 4), e, 2);
}
m(ic, "formatWeekNumberISO");
function oc(t10) {
  return t10.getDay();
}
m(oc, "formatWeekdayNumberSunday");
function ac(t10, e) {
  return L(Me.count(lt(t10) - 1, t10), e, 2);
}
m(ac, "formatWeekNumberMonday");
function sc(t10, e) {
  return L(t10.getFullYear() % 100, e, 2);
}
m(sc, "formatYear");
function uc(t10, e) {
  return t10 = ps(t10), L(t10.getFullYear() % 100, e, 2);
}
m(uc, "formatYearISO");
function fc(t10, e) {
  return L(t10.getFullYear() % 1e4, e, 4);
}
m(fc, "formatFullYear");
function lc(t10, e) {
  var n = t10.getDay();
  return t10 = n >= 4 || n === 0 ? zt(t10) : zt.ceil(t10), L(t10.getFullYear() % 1e4, e, 4);
}
m(lc, "formatFullYearISO");
function cc(t10) {
  var e = t10.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + L(e / 60 | 0, "0", 2) + L(e % 60, "0", 2);
}
m(cc, "formatZone");
function us(t10, e) {
  return L(t10.getUTCDate(), e, 2);
}
m(us, "formatUTCDayOfMonth");
function hc(t10, e) {
  return L(t10.getUTCHours(), e, 2);
}
m(hc, "formatUTCHour24");
function pc(t10, e) {
  return L(t10.getUTCHours() % 12 || 12, e, 2);
}
m(pc, "formatUTCHour12");
function mc(t10, e) {
  return L(1 + We.count(yt(t10), t10), e, 3);
}
m(mc, "formatUTCDayOfYear");
function ms(t10, e) {
  return L(t10.getUTCMilliseconds(), e, 3);
}
m(ms, "formatUTCMilliseconds");
function dc(t10, e) {
  return ms(t10, e) + "000";
}
m(dc, "formatUTCMicroseconds");
function xc(t10, e) {
  return L(t10.getUTCMonth() + 1, e, 2);
}
m(xc, "formatUTCMonthNumber");
function _c(t10, e) {
  return L(t10.getUTCMinutes(), e, 2);
}
m(_c, "formatUTCMinutes");
function gc(t10, e) {
  return L(t10.getUTCSeconds(), e, 2);
}
m(gc, "formatUTCSeconds");
function yc(t10) {
  var e = t10.getUTCDay();
  return e === 0 ? 7 : e;
}
m(yc, "formatUTCWeekdayNumberMonday");
function vc(t10, e) {
  return L(ie.count(yt(t10) - 1, t10), e, 2);
}
m(vc, "formatUTCWeekNumberSunday");
function ds(t10) {
  var e = t10.getUTCDay();
  return e >= 4 || e === 0 ? Ht(t10) : Ht.ceil(t10);
}
m(ds, "UTCdISO");
function wc(t10, e) {
  return t10 = ds(t10), L(Ht.count(yt(t10), t10) + (yt(t10).getUTCDay() === 4), e, 2);
}
m(wc, "formatUTCWeekNumberISO");
function bc(t10) {
  return t10.getUTCDay();
}
m(bc, "formatUTCWeekdayNumberSunday");
function Mc(t10, e) {
  return L(Te.count(yt(t10) - 1, t10), e, 2);
}
m(Mc, "formatUTCWeekNumberMonday");
function Tc(t10, e) {
  return L(t10.getUTCFullYear() % 100, e, 2);
}
m(Tc, "formatUTCYear");
function kc(t10, e) {
  return t10 = ds(t10), L(t10.getUTCFullYear() % 100, e, 2);
}
m(kc, "formatUTCYearISO");
function Sc(t10, e) {
  return L(t10.getUTCFullYear() % 1e4, e, 4);
}
m(Sc, "formatUTCFullYear");
function Cc(t10, e) {
  var n = t10.getUTCDay();
  return t10 = n >= 4 || n === 0 ? Ht(t10) : Ht.ceil(t10), L(t10.getUTCFullYear() % 1e4, e, 4);
}
m(Cc, "formatUTCFullYearISO");
function Nc() {
  return "+0000";
}
m(Nc, "formatUTCZone");
function fs() {
  return "%";
}
m(fs, "formatLiteralPercent");
function ls(t10) {
  return +t10;
}
m(ls, "formatUnixTimestamp");
function cs(t10) {
  return Math.floor(+t10 / 1e3);
}
m(cs, "formatUnixTimestampSeconds");
var Se;
var Hn;
var xs;
var _s;
var gs;
ro({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });
function ro(t10) {
  return Se = no(t10), Hn = Se.format, xs = Se.parse, _s = Se.utcFormat, gs = Se.utcParse, Se;
}
m(ro, "defaultLocale");
function io(t10, e) {
  t10 = t10.slice();
  var n = 0, i = t10.length - 1, o2 = t10[n], a = t10[i], s;
  return a < o2 && (s = n, n = i, i = s, s = o2, o2 = a, a = s), t10[n] = e.floor(o2), t10[i] = e.ceil(a), t10;
}
m(io, "nice");
function Ac(t10) {
  return new Date(t10);
}
m(Ac, "date");
function Dc(t10) {
  return t10 instanceof Date ? +t10 : +/* @__PURE__ */ new Date(+t10);
}
m(Dc, "number");
function ys(t10, e, n, i, o2, a, s, u, l, f) {
  var h = Be(), p = h.invert, c = h.domain, m2 = f(".%L"), _ = f(":%S"), M = f("%I:%M"), T = f("%I %p"), k = f("%a %d"), I = f("%b %d"), C = f("%B"), A = f("%Y");
  function O(w) {
    return (l(w) < w ? m2 : u(w) < w ? _ : s(w) < w ? M : a(w) < w ? T : i(w) < w ? o2(w) < w ? k : I : n(w) < w ? C : A)(w);
  }
  return m(O, "tickFormat"), h.invert = function(w) {
    return new Date(p(w));
  }, h.domain = function(w) {
    return arguments.length ? c(Array.from(w, Dc)) : c().map(Ac);
  }, h.ticks = function(w) {
    var Y = c();
    return t10(Y[0], Y[Y.length - 1], w ?? 10);
  }, h.tickFormat = function(w, Y) {
    return Y == null ? O : f(Y);
  }, h.nice = function(w) {
    var Y = c();
    return (!w || typeof w.range != "function") && (w = e(Y[0], Y[Y.length - 1], w ?? 10)), w ? c(io(Y, w)) : h;
  }, h.copy = function() {
    return Yn(h, ys(t10, e, n, i, o2, a, s, u, l, f));
  }, h;
}
m(ys, "calendar");
function vs() {
  return Lt.apply(ys(Ji, ji, lt, ke, $t, Dt, be, we, Tt, Hn).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
m(vs, "time");
function oo() {
  var t10 = He().unknown(void 0), e = t10.domain, n = t10.range, i = 0, o2 = 1, a, s, u = false, l = 0, f = 0, h = 0.5;
  delete t10.unknown;
  function p() {
    var c = e().length, m2 = o2 < i, _ = m2 ? o2 : i, M = m2 ? i : o2;
    a = (M - _) / Math.max(1, c - l + f * 2), u && (a = Math.floor(a)), _ += (M - _ - a * (c - l)) * h, s = a * (1 - l), u && (_ = Math.round(_), s = Math.round(s));
    var T = pn(c).map(function(k) {
      return _ + a * k;
    });
    return n(m2 ? T.reverse() : T);
  }
  return m(p, "rescale"), t10.domain = function(c) {
    return arguments.length ? (e(c), p()) : e();
  }, t10.range = function(c) {
    return arguments.length ? ([i, o2] = c, i = +i, o2 = +o2, p()) : [i, o2];
  }, t10.rangeRound = function(c) {
    return [i, o2] = c, i = +i, o2 = +o2, u = true, p();
  }, t10.bandwidth = function() {
    return s;
  }, t10.step = function() {
    return a;
  }, t10.round = function(c) {
    return arguments.length ? (u = !!c, p()) : u;
  }, t10.padding = function(c) {
    return arguments.length ? (l = Math.min(1, f = +c), p()) : l;
  }, t10.paddingInner = function(c) {
    return arguments.length ? (l = Math.min(1, c), p()) : l;
  }, t10.paddingOuter = function(c) {
    return arguments.length ? (f = +c, p()) : f;
  }, t10.align = function(c) {
    return arguments.length ? (h = Math.max(0, Math.min(1, c)), p()) : h;
  }, t10.copy = function() {
    return oo(e(), [i, o2]).round(u).paddingInner(l).paddingOuter(f).align(h);
  }, Lt.apply(p(), arguments);
}
m(oo, "band");
function ao(t10) {
  for (var e = t10.length / 6 | 0, n = new Array(e), i = 0; i < e; ) n[i] = "#" + t10.slice(i * 6, ++i * 6);
  return n;
}
m(ao, "default");
var $c = ao("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
function V(t10) {
  return m(function() {
    return t10;
  }, "constant");
}
m(V, "default");
var so = Math.abs;
var rt = Math.atan2;
var Bt = Math.cos;
var ws = Math.max;
var Bn = Math.min;
var vt = Math.sin;
var oe = Math.sqrt;
var et = 1e-12;
var Ce = Math.PI;
var Ze = Ce / 2;
var Ne = 2 * Ce;
function bs(t10) {
  return t10 > 1 ? 0 : t10 < -1 ? Ce : Math.acos(t10);
}
m(bs, "acos");
function uo(t10) {
  return t10 >= 1 ? Ze : t10 <= -1 ? -Ze : Math.asin(t10);
}
m(uo, "asin");
var fo = Math.PI;
var lo = 2 * fo;
var ae = 1e-6;
var Oc = lo - ae;
function Ms(t10) {
  this._ += t10[0];
  for (let e = 1, n = t10.length; e < n; ++e) this._ += arguments[e] + t10[e];
}
m(Ms, "append");
function Ec(t10) {
  let e = Math.floor(t10);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t10}`);
  if (e > 15) return Ms;
  let n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let o2 = 1, a = i.length; o2 < a; ++o2) this._ += Math.round(arguments[o2] * n) / n + i[o2];
  };
}
m(Ec, "appendRound");
var _a3;
var se = (_a3 = class {
  constructor(e) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Ms : Ec(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, i, o2) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +o2}`;
  }
  bezierCurveTo(e, n, i, o2, a, s) {
    this._append`C${+e},${+n},${+i},${+o2},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, i, o2, a) {
    if (e = +e, n = +n, i = +i, o2 = +o2, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, u = this._y1, l = i - e, f = o2 - n, h = s - e, p = u - n, c = h * h + p * p;
    if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (c > ae) if (!(Math.abs(p * l - f * h) > ae) || !a) this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let m2 = i - s, _ = o2 - u, M = l * l + f * f, T = m2 * m2 + _ * _, k = Math.sqrt(M), I = Math.sqrt(c), C = a * Math.tan((fo - Math.acos((M + c - T) / (2 * k * I))) / 2), A = C / I, O = C / k;
      Math.abs(A - 1) > ae && this._append`L${e + A * h},${n + A * p}`, this._append`A${a},${a},0,0,${+(p * m2 > h * _)},${this._x1 = e + O * l},${this._y1 = n + O * f}`;
    }
  }
  arc(e, n, i, o2, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let u = i * Math.cos(o2), l = i * Math.sin(o2), f = e + u, h = n + l, p = 1 ^ s, c = s ? o2 - a : a - o2;
    this._x1 === null ? this._append`M${f},${h}` : (Math.abs(this._x1 - f) > ae || Math.abs(this._y1 - h) > ae) && this._append`L${f},${h}`, i && (c < 0 && (c = c % lo + lo), c > Oc ? this._append`A${i},${i},0,1,${p},${e - u},${n - l}A${i},${i},0,1,${p},${this._x1 = f},${this._y1 = h}` : c > ae && this._append`A${i},${i},0,${+(c >= fo)},${p},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, o2) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+o2}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}, m(_a3, "Path"), _a3);
function Ts() {
  return new se();
}
m(Ts, "path");
Ts.prototype = se.prototype;
function qn(t10) {
  let e = 3;
  return t10.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null) e = null;
    else {
      let i = Math.floor(n);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = i;
    }
    return t10;
  }, () => new se(e);
}
m(qn, "withPath");
function Ic(t10) {
  return t10.innerRadius;
}
m(Ic, "arcInnerRadius");
function Rc(t10) {
  return t10.outerRadius;
}
m(Rc, "arcOuterRadius");
function Pc(t10) {
  return t10.startAngle;
}
m(Pc, "arcStartAngle");
function Yc(t10) {
  return t10.endAngle;
}
m(Yc, "arcEndAngle");
function Fc(t10) {
  return t10 && t10.padAngle;
}
m(Fc, "arcPadAngle");
function Uc(t10, e, n, i, o2, a, s, u) {
  var l = n - t10, f = i - e, h = s - o2, p = u - a, c = p * l - h * f;
  if (!(c * c < et)) return c = (h * (e - a) - p * (t10 - o2)) / c, [t10 + c * l, e + c * f];
}
m(Uc, "intersect");
function Wn(t10, e, n, i, o2, a, s) {
  var u = t10 - n, l = e - i, f = (s ? a : -a) / oe(u * u + l * l), h = f * l, p = -f * u, c = t10 + h, m2 = e + p, _ = n + h, M = i + p, T = (c + _) / 2, k = (m2 + M) / 2, I = _ - c, C = M - m2, A = I * I + C * C, O = o2 - a, w = c * M - _ * m2, Y = (C < 0 ? -1 : 1) * oe(ws(0, O * O * A - w * w)), U = (w * C - I * Y) / A, E = (-w * I - C * Y) / A, B = (w * C + I * Y) / A, N = (-w * I + C * Y) / A, v = U - T, d = E - k, x = B - T, S = N - k;
  return v * v + d * d > x * x + S * S && (U = B, E = N), { cx: U, cy: E, x01: -h, y01: -p, x11: U * (o2 / O - 1), y11: E * (o2 / O - 1) };
}
m(Wn, "cornerTangents");
function ks() {
  var t10 = Ic, e = Rc, n = V(0), i = null, o2 = Pc, a = Yc, s = Fc, u = null, l = qn(f);
  function f() {
    var h, p, c = +t10.apply(this, arguments), m2 = +e.apply(this, arguments), _ = o2.apply(this, arguments) - Ze, M = a.apply(this, arguments) - Ze, T = so(M - _), k = M > _;
    if (u || (u = h = l()), m2 < c && (p = m2, m2 = c, c = p), !(m2 > et)) u.moveTo(0, 0);
    else if (T > Ne - et) u.moveTo(m2 * Bt(_), m2 * vt(_)), u.arc(0, 0, m2, _, M, !k), c > et && (u.moveTo(c * Bt(M), c * vt(M)), u.arc(0, 0, c, M, _, k));
    else {
      var I = _, C = M, A = _, O = M, w = T, Y = T, U = s.apply(this, arguments) / 2, E = U > et && (i ? +i.apply(this, arguments) : oe(c * c + m2 * m2)), B = Bn(so(m2 - c) / 2, +n.apply(this, arguments)), N = B, v = B, d, x;
      if (E > et) {
        var S = uo(E / c * vt(U)), y = uo(E / m2 * vt(U));
        (w -= S * 2) > et ? (S *= k ? 1 : -1, A += S, O -= S) : (w = 0, A = O = (_ + M) / 2), (Y -= y * 2) > et ? (y *= k ? 1 : -1, I += y, C -= y) : (Y = 0, I = C = (_ + M) / 2);
      }
      var D = m2 * Bt(I), $ = m2 * vt(I), P = c * Bt(O), z = c * vt(O);
      if (B > et) {
        var W = m2 * Bt(C), X = m2 * vt(C), J = c * Bt(A), ht = c * vt(A), Q;
        if (T < Ce) if (Q = Uc(D, $, J, ht, W, X, P, z)) {
          var dt = D - Q[0], st = $ - Q[1], Z = W - Q[0], b = X - Q[1], R = 1 / vt(bs((dt * Z + st * b) / (oe(dt * dt + st * st) * oe(Z * Z + b * b))) / 2), F = oe(Q[0] * Q[0] + Q[1] * Q[1]);
          N = Bn(B, (c - F) / (R - 1)), v = Bn(B, (m2 - F) / (R + 1));
        } else N = v = 0;
      }
      Y > et ? v > et ? (d = Wn(J, ht, D, $, m2, v, k), x = Wn(W, X, P, z, m2, v, k), u.moveTo(d.cx + d.x01, d.cy + d.y01), v < B ? u.arc(d.cx, d.cy, v, rt(d.y01, d.x01), rt(x.y01, x.x01), !k) : (u.arc(d.cx, d.cy, v, rt(d.y01, d.x01), rt(d.y11, d.x11), !k), u.arc(0, 0, m2, rt(d.cy + d.y11, d.cx + d.x11), rt(x.cy + x.y11, x.cx + x.x11), !k), u.arc(x.cx, x.cy, v, rt(x.y11, x.x11), rt(x.y01, x.x01), !k))) : (u.moveTo(D, $), u.arc(0, 0, m2, I, C, !k)) : u.moveTo(D, $), !(c > et) || !(w > et) ? u.lineTo(P, z) : N > et ? (d = Wn(P, z, W, X, c, -N, k), x = Wn(D, $, J, ht, c, -N, k), u.lineTo(d.cx + d.x01, d.cy + d.y01), N < B ? u.arc(d.cx, d.cy, N, rt(d.y01, d.x01), rt(x.y01, x.x01), !k) : (u.arc(d.cx, d.cy, N, rt(d.y01, d.x01), rt(d.y11, d.x11), !k), u.arc(0, 0, c, rt(d.cy + d.y11, d.cx + d.x11), rt(x.cy + x.y11, x.cx + x.x11), k), u.arc(x.cx, x.cy, N, rt(x.y11, x.x11), rt(x.y01, x.x01), !k))) : u.arc(0, 0, c, O, A, k);
    }
    if (u.closePath(), h) return u = null, h + "" || null;
  }
  return m(f, "arc"), f.centroid = function() {
    var h = (+t10.apply(this, arguments) + +e.apply(this, arguments)) / 2, p = (+o2.apply(this, arguments) + +a.apply(this, arguments)) / 2 - Ce / 2;
    return [Bt(p) * h, vt(p) * h];
  }, f.innerRadius = function(h) {
    return arguments.length ? (t10 = typeof h == "function" ? h : V(+h), f) : t10;
  }, f.outerRadius = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : V(+h), f) : e;
  }, f.cornerRadius = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : V(+h), f) : n;
  }, f.padRadius = function(h) {
    return arguments.length ? (i = h == null ? null : typeof h == "function" ? h : V(+h), f) : i;
  }, f.startAngle = function(h) {
    return arguments.length ? (o2 = typeof h == "function" ? h : V(+h), f) : o2;
  }, f.endAngle = function(h) {
    return arguments.length ? (a = typeof h == "function" ? h : V(+h), f) : a;
  }, f.padAngle = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : V(+h), f) : s;
  }, f.context = function(h) {
    return arguments.length ? (u = h ?? null, f) : u;
  }, f;
}
m(ks, "default");
function Ss(t10) {
  this._context = t10;
}
m(Ss, "Linear");
Ss.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
      break;
    case 1:
      this._point = 2;
    default:
      this._context.lineTo(t10, e);
      break;
  }
}, "point") };
function Vn(t10) {
  return new Ss(t10);
}
m(Vn, "default");
var Av = Array.prototype.slice;
function Qe(t10) {
  return typeof t10 == "object" && "length" in t10 ? t10 : Array.from(t10);
}
m(Qe, "default");
function Cs(t10) {
  return t10[0];
}
m(Cs, "x");
function Ns(t10) {
  return t10[1];
}
m(Ns, "y");
function As(t10, e) {
  var n = V(true), i = null, o2 = Vn, a = null, s = qn(u);
  t10 = typeof t10 == "function" ? t10 : t10 === void 0 ? Cs : V(t10), e = typeof e == "function" ? e : e === void 0 ? Ns : V(e);
  function u(l) {
    var f, h = (l = Qe(l)).length, p, c = false, m2;
    for (i == null && (a = o2(m2 = s())), f = 0; f <= h; ++f) !(f < h && n(p = l[f], f, l)) === c && ((c = !c) ? a.lineStart() : a.lineEnd()), c && a.point(+t10(p, f, l), +e(p, f, l));
    if (m2) return a = null, m2 + "" || null;
  }
  return m(u, "line"), u.x = function(l) {
    return arguments.length ? (t10 = typeof l == "function" ? l : V(+l), u) : t10;
  }, u.y = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : V(+l), u) : e;
  }, u.defined = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : V(!!l), u) : n;
  }, u.curve = function(l) {
    return arguments.length ? (o2 = l, i != null && (a = o2(i)), u) : o2;
  }, u.context = function(l) {
    return arguments.length ? (l == null ? i = a = null : a = o2(i = l), u) : i;
  }, u;
}
m(As, "default");
function co(t10, e) {
  return e < t10 ? -1 : e > t10 ? 1 : e >= t10 ? 0 : NaN;
}
m(co, "default");
function ho(t10) {
  return t10;
}
m(ho, "default");
function Ds() {
  var t10 = ho, e = co, n = null, i = V(0), o2 = V(Ne), a = V(0);
  function s(u) {
    var l, f = (u = Qe(u)).length, h, p, c = 0, m2 = new Array(f), _ = new Array(f), M = +i.apply(this, arguments), T = Math.min(Ne, Math.max(-Ne, o2.apply(this, arguments) - M)), k, I = Math.min(Math.abs(T) / f, a.apply(this, arguments)), C = I * (T < 0 ? -1 : 1), A;
    for (l = 0; l < f; ++l) (A = _[m2[l] = l] = +t10(u[l], l, u)) > 0 && (c += A);
    for (e != null ? m2.sort(function(O, w) {
      return e(_[O], _[w]);
    }) : n != null && m2.sort(function(O, w) {
      return n(u[O], u[w]);
    }), l = 0, p = c ? (T - f * C) / c : 0; l < f; ++l, M = k) h = m2[l], A = _[h], k = M + (A > 0 ? A * p : 0) + C, _[h] = { data: u[h], index: l, value: A, startAngle: M, endAngle: k, padAngle: I };
    return _;
  }
  return m(s, "pie"), s.value = function(u) {
    return arguments.length ? (t10 = typeof u == "function" ? u : V(+u), s) : t10;
  }, s.sortValues = function(u) {
    return arguments.length ? (e = u, n = null, s) : e;
  }, s.sort = function(u) {
    return arguments.length ? (n = u, e = null, s) : n;
  }, s.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : V(+u), s) : i;
  }, s.endAngle = function(u) {
    return arguments.length ? (o2 = typeof u == "function" ? u : V(+u), s) : o2;
  }, s.padAngle = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : V(+u), s) : a;
  }, s;
}
m(Ds, "default");
var _a4;
var Xn = (_a4 = class {
  constructor(e, n) {
    this._context = e, this._x = n;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(e, n) {
    switch (e = +e, n = +n, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(e, n) : this._context.moveTo(e, n);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, n, e, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, e, this._y0, e, n);
        break;
      }
    }
    this._x0 = e, this._y0 = n;
  }
}, m(_a4, "Bump"), _a4);
function Lc(t10) {
  return new Xn(t10, true);
}
m(Lc, "bumpX");
function zc(t10) {
  return new Xn(t10, false);
}
m(zc, "bumpY");
function Ae(t10, e, n) {
  t10._context.bezierCurveTo((2 * t10._x0 + t10._x1) / 3, (2 * t10._y0 + t10._y1) / 3, (t10._x0 + 2 * t10._x1) / 3, (t10._y0 + 2 * t10._y1) / 3, (t10._x0 + 4 * t10._x1 + e) / 6, (t10._y0 + 4 * t10._y1 + n) / 6);
}
m(Ae, "point");
function Ke(t10) {
  this._context = t10;
}
m(Ke, "Basis");
Ke.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 3:
      Ae(this, this._x1, this._y1);
    case 2:
      this._context.lineTo(this._x1, this._y1);
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
    default:
      Ae(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = e;
}, "point") };
function $s(t10) {
  return new Ke(t10);
}
m($s, "default");
function ct() {
}
m(ct, "default");
function Os(t10) {
  this._context = t10;
}
m(Os, "BasisClosed");
Os.prototype = { areaStart: ct, areaEnd: ct, lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 1: {
      this._context.moveTo(this._x2, this._y2), this._context.closePath();
      break;
    }
    case 2: {
      this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
      break;
    }
    case 3: {
      this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
      break;
    }
  }
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._x2 = t10, this._y2 = e;
      break;
    case 1:
      this._point = 2, this._x3 = t10, this._y3 = e;
      break;
    case 2:
      this._point = 3, this._x4 = t10, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t10) / 6, (this._y0 + 4 * this._y1 + e) / 6);
      break;
    default:
      Ae(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = e;
}, "point") };
function Es(t10) {
  return new Os(t10);
}
m(Es, "default");
function Is(t10) {
  this._context = t10;
}
m(Is, "BasisOpen");
Is.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1;
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3;
      var n = (this._x0 + 4 * this._x1 + t10) / 6, i = (this._y0 + 4 * this._y1 + e) / 6;
      this._line ? this._context.lineTo(n, i) : this._context.moveTo(n, i);
      break;
    case 3:
      this._point = 4;
    default:
      Ae(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = e;
}, "point") };
function Rs(t10) {
  return new Is(t10);
}
m(Rs, "default");
function Ps(t10, e) {
  this._basis = new Ke(t10), this._beta = e;
}
m(Ps, "Bundle");
Ps.prototype = { lineStart: m(function() {
  this._x = [], this._y = [], this._basis.lineStart();
}, "lineStart"), lineEnd: m(function() {
  var t10 = this._x, e = this._y, n = t10.length - 1;
  if (n > 0) for (var i = t10[0], o2 = e[0], a = t10[n] - i, s = e[n] - o2, u = -1, l; ++u <= n; ) l = u / n, this._basis.point(this._beta * t10[u] + (1 - this._beta) * (i + l * a), this._beta * e[u] + (1 - this._beta) * (o2 + l * s));
  this._x = this._y = null, this._basis.lineEnd();
}, "lineEnd"), point: m(function(t10, e) {
  this._x.push(+t10), this._y.push(+e);
}, "point") };
var Hc = m(function t3(e) {
  function n(i) {
    return e === 1 ? new Ke(i) : new Ps(i, e);
  }
  return m(n, "bundle"), n.beta = function(i) {
    return t3(+i);
  }, n;
}, "custom")(0.85);
function De(t10, e, n) {
  t10._context.bezierCurveTo(t10._x1 + t10._k * (t10._x2 - t10._x0), t10._y1 + t10._k * (t10._y2 - t10._y0), t10._x2 + t10._k * (t10._x1 - e), t10._y2 + t10._k * (t10._y1 - n), t10._x2, t10._y2);
}
m(De, "point");
function Gn(t10, e) {
  this._context = t10, this._k = (1 - e) / 6;
}
m(Gn, "Cardinal");
Gn.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 2:
      this._context.lineTo(this._x2, this._y2);
      break;
    case 3:
      De(this, this._x1, this._y1);
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
      break;
    case 1:
      this._point = 2, this._x1 = t10, this._y1 = e;
      break;
    case 2:
      this._point = 3;
    default:
      De(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var Bc = m(function t4(e) {
  function n(i) {
    return new Gn(i, e);
  }
  return m(n, "cardinal"), n.tension = function(i) {
    return t4(+i);
  }, n;
}, "custom")(0);
function Zn(t10, e) {
  this._context = t10, this._k = (1 - e) / 6;
}
m(Zn, "CardinalClosed");
Zn.prototype = { areaStart: ct, areaEnd: ct, lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 1: {
      this._context.moveTo(this._x3, this._y3), this._context.closePath();
      break;
    }
    case 2: {
      this._context.lineTo(this._x3, this._y3), this._context.closePath();
      break;
    }
    case 3: {
      this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
      break;
    }
  }
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._x3 = t10, this._y3 = e;
      break;
    case 1:
      this._point = 2, this._context.moveTo(this._x4 = t10, this._y4 = e);
      break;
    case 2:
      this._point = 3, this._x5 = t10, this._y5 = e;
      break;
    default:
      De(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var qc = m(function t5(e) {
  function n(i) {
    return new Zn(i, e);
  }
  return m(n, "cardinal"), n.tension = function(i) {
    return t5(+i);
  }, n;
}, "custom")(0);
function Qn(t10, e) {
  this._context = t10, this._k = (1 - e) / 6;
}
m(Qn, "CardinalOpen");
Qn.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1;
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
      break;
    case 3:
      this._point = 4;
    default:
      De(this, t10, e);
      break;
  }
  this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var Wc = m(function t6(e) {
  function n(i) {
    return new Qn(i, e);
  }
  return m(n, "cardinal"), n.tension = function(i) {
    return t6(+i);
  }, n;
}, "custom")(0);
function Je(t10, e, n) {
  var i = t10._x1, o2 = t10._y1, a = t10._x2, s = t10._y2;
  if (t10._l01_a > et) {
    var u = 2 * t10._l01_2a + 3 * t10._l01_a * t10._l12_a + t10._l12_2a, l = 3 * t10._l01_a * (t10._l01_a + t10._l12_a);
    i = (i * u - t10._x0 * t10._l12_2a + t10._x2 * t10._l01_2a) / l, o2 = (o2 * u - t10._y0 * t10._l12_2a + t10._y2 * t10._l01_2a) / l;
  }
  if (t10._l23_a > et) {
    var f = 2 * t10._l23_2a + 3 * t10._l23_a * t10._l12_a + t10._l12_2a, h = 3 * t10._l23_a * (t10._l23_a + t10._l12_a);
    a = (a * f + t10._x1 * t10._l23_2a - e * t10._l12_2a) / h, s = (s * f + t10._y1 * t10._l23_2a - n * t10._l12_2a) / h;
  }
  t10._context.bezierCurveTo(i, o2, a, s, t10._x2, t10._y2);
}
m(Je, "point");
function Ys(t10, e) {
  this._context = t10, this._alpha = e;
}
m(Ys, "CatmullRom");
Ys.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 2:
      this._context.lineTo(this._x2, this._y2);
      break;
    case 3:
      this.point(this._x2, this._y2);
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  if (t10 = +t10, e = +e, this._point) {
    var n = this._x2 - t10, i = this._y2 - e;
    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + i * i, this._alpha));
  }
  switch (this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3;
    default:
      Je(this, t10, e);
      break;
  }
  this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var Vc = m(function t7(e) {
  function n(i) {
    return e ? new Ys(i, e) : new Gn(i, 0);
  }
  return m(n, "catmullRom"), n.alpha = function(i) {
    return t7(+i);
  }, n;
}, "custom")(0.5);
function Fs(t10, e) {
  this._context = t10, this._alpha = e;
}
m(Fs, "CatmullRomClosed");
Fs.prototype = { areaStart: ct, areaEnd: ct, lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 1: {
      this._context.moveTo(this._x3, this._y3), this._context.closePath();
      break;
    }
    case 2: {
      this._context.lineTo(this._x3, this._y3), this._context.closePath();
      break;
    }
    case 3: {
      this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
      break;
    }
  }
}, "lineEnd"), point: m(function(t10, e) {
  if (t10 = +t10, e = +e, this._point) {
    var n = this._x2 - t10, i = this._y2 - e;
    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + i * i, this._alpha));
  }
  switch (this._point) {
    case 0:
      this._point = 1, this._x3 = t10, this._y3 = e;
      break;
    case 1:
      this._point = 2, this._context.moveTo(this._x4 = t10, this._y4 = e);
      break;
    case 2:
      this._point = 3, this._x5 = t10, this._y5 = e;
      break;
    default:
      Je(this, t10, e);
      break;
  }
  this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var Xc = m(function t8(e) {
  function n(i) {
    return e ? new Fs(i, e) : new Zn(i, 0);
  }
  return m(n, "catmullRom"), n.alpha = function(i) {
    return t8(+i);
  }, n;
}, "custom")(0.5);
function Us(t10, e) {
  this._context = t10, this._alpha = e;
}
m(Us, "CatmullRomOpen");
Us.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  if (t10 = +t10, e = +e, this._point) {
    var n = this._x2 - t10, i = this._y2 - e;
    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + i * i, this._alpha));
  }
  switch (this._point) {
    case 0:
      this._point = 1;
      break;
    case 1:
      this._point = 2;
      break;
    case 2:
      this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
      break;
    case 3:
      this._point = 4;
    default:
      Je(this, t10, e);
      break;
  }
  this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e;
}, "point") };
var Gc = m(function t9(e) {
  function n(i) {
    return e ? new Us(i, e) : new Qn(i, 0);
  }
  return m(n, "catmullRom"), n.alpha = function(i) {
    return t9(+i);
  }, n;
}, "custom")(0.5);
function Ls(t10) {
  this._context = t10;
}
m(Ls, "LinearClosed");
Ls.prototype = { areaStart: ct, areaEnd: ct, lineStart: m(function() {
  this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  this._point && this._context.closePath();
}, "lineEnd"), point: m(function(t10, e) {
  t10 = +t10, e = +e, this._point ? this._context.lineTo(t10, e) : (this._point = 1, this._context.moveTo(t10, e));
}, "point") };
function zs(t10) {
  return new Ls(t10);
}
m(zs, "default");
function Hs(t10) {
  return t10 < 0 ? -1 : 1;
}
m(Hs, "sign");
function Bs(t10, e, n) {
  var i = t10._x1 - t10._x0, o2 = e - t10._x1, a = (t10._y1 - t10._y0) / (i || o2 < 0 && -0), s = (n - t10._y1) / (o2 || i < 0 && -0), u = (a * o2 + s * i) / (i + o2);
  return (Hs(a) + Hs(s)) * Math.min(Math.abs(a), Math.abs(s), 0.5 * Math.abs(u)) || 0;
}
m(Bs, "slope3");
function qs(t10, e) {
  var n = t10._x1 - t10._x0;
  return n ? (3 * (t10._y1 - t10._y0) / n - e) / 2 : e;
}
m(qs, "slope2");
function po(t10, e, n) {
  var i = t10._x0, o2 = t10._y0, a = t10._x1, s = t10._y1, u = (a - i) / 3;
  t10._context.bezierCurveTo(i + u, o2 + u * e, a - u, s - u * n, a, s);
}
m(po, "point");
function Kn(t10) {
  this._context = t10;
}
m(Kn, "MonotoneX");
Kn.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  switch (this._point) {
    case 2:
      this._context.lineTo(this._x1, this._y1);
      break;
    case 3:
      po(this, this._t0, qs(this, this._t0));
      break;
  }
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, "lineEnd"), point: m(function(t10, e) {
  var n = NaN;
  if (t10 = +t10, e = +e, !(t10 === this._x1 && e === this._y1)) {
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, po(this, qs(this, n = Bs(this, t10, e)), n);
        break;
      default:
        po(this, this._t0, n = Bs(this, t10, e));
        break;
    }
    this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = e, this._t0 = n;
  }
}, "point") };
function Ws(t10) {
  this._context = new Vs(t10);
}
m(Ws, "MonotoneY");
(Ws.prototype = Object.create(Kn.prototype)).point = function(t10, e) {
  Kn.prototype.point.call(this, e, t10);
};
function Vs(t10) {
  this._context = t10;
}
m(Vs, "ReflectContext");
Vs.prototype = { moveTo: m(function(t10, e) {
  this._context.moveTo(e, t10);
}, "moveTo"), closePath: m(function() {
  this._context.closePath();
}, "closePath"), lineTo: m(function(t10, e) {
  this._context.lineTo(e, t10);
}, "lineTo"), bezierCurveTo: m(function(t10, e, n, i, o2, a) {
  this._context.bezierCurveTo(e, t10, i, n, a, o2);
}, "bezierCurveTo") };
function Zc(t10) {
  return new Kn(t10);
}
m(Zc, "monotoneX");
function Qc(t10) {
  return new Ws(t10);
}
m(Qc, "monotoneY");
function Gs(t10) {
  this._context = t10;
}
m(Gs, "Natural");
Gs.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x = [], this._y = [];
}, "lineStart"), lineEnd: m(function() {
  var t10 = this._x, e = this._y, n = t10.length;
  if (n) if (this._line ? this._context.lineTo(t10[0], e[0]) : this._context.moveTo(t10[0], e[0]), n === 2) this._context.lineTo(t10[1], e[1]);
  else for (var i = Xs(t10), o2 = Xs(e), a = 0, s = 1; s < n; ++a, ++s) this._context.bezierCurveTo(i[0][a], o2[0][a], i[1][a], o2[1][a], t10[s], e[s]);
  (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
}, "lineEnd"), point: m(function(t10, e) {
  this._x.push(+t10), this._y.push(+e);
}, "point") };
function Xs(t10) {
  var e, n = t10.length - 1, i, o2 = new Array(n), a = new Array(n), s = new Array(n);
  for (o2[0] = 0, a[0] = 2, s[0] = t10[0] + 2 * t10[1], e = 1; e < n - 1; ++e) o2[e] = 1, a[e] = 4, s[e] = 4 * t10[e] + 2 * t10[e + 1];
  for (o2[n - 1] = 2, a[n - 1] = 7, s[n - 1] = 8 * t10[n - 1] + t10[n], e = 1; e < n; ++e) i = o2[e] / a[e - 1], a[e] -= i, s[e] -= i * s[e - 1];
  for (o2[n - 1] = s[n - 1] / a[n - 1], e = n - 2; e >= 0; --e) o2[e] = (s[e] - o2[e + 1]) / a[e];
  for (a[n - 1] = (t10[n] + o2[n - 1]) / 2, e = 0; e < n - 1; ++e) a[e] = 2 * t10[e + 1] - o2[e + 1];
  return [o2, a];
}
m(Xs, "controlPoints");
function Zs(t10) {
  return new Gs(t10);
}
m(Zs, "default");
function Jn(t10, e) {
  this._context = t10, this._t = e;
}
m(Jn, "Step");
Jn.prototype = { areaStart: m(function() {
  this._line = 0;
}, "areaStart"), areaEnd: m(function() {
  this._line = NaN;
}, "areaEnd"), lineStart: m(function() {
  this._x = this._y = NaN, this._point = 0;
}, "lineStart"), lineEnd: m(function() {
  0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
}, "lineEnd"), point: m(function(t10, e) {
  switch (t10 = +t10, e = +e, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(t10, e) : this._context.moveTo(t10, e);
      break;
    case 1:
      this._point = 2;
    default: {
      if (this._t <= 0) this._context.lineTo(this._x, e), this._context.lineTo(t10, e);
      else {
        var n = this._x * (1 - this._t) + t10 * this._t;
        this._context.lineTo(n, this._y), this._context.lineTo(n, e);
      }
      break;
    }
  }
  this._x = t10, this._y = e;
}, "point") };
function Qs(t10) {
  return new Jn(t10, 0.5);
}
m(Qs, "default");
function Kc(t10) {
  return new Jn(t10, 0);
}
m(Kc, "stepBefore");
function Jc(t10) {
  return new Jn(t10, 1);
}
m(Jc, "stepAfter");
var jc = { value: m(() => {
}, "value") };
function Js() {
  for (var t10 = 0, e = arguments.length, n = {}, i; t10 < e; ++t10) {
    if (!(i = arguments[t10] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new jn(n);
}
m(Js, "dispatch");
function jn(t10) {
  this._ = t10;
}
m(jn, "Dispatch");
function th(t10, e) {
  return t10.trim().split(/^|\s+/).map(function(n) {
    var i = "", o2 = n.indexOf(".");
    if (o2 >= 0 && (i = n.slice(o2 + 1), n = n.slice(0, o2)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
m(th, "parseTypenames");
jn.prototype = Js.prototype = { constructor: jn, on: m(function(t10, e) {
  var n = this._, i = th(t10 + "", n), o2, a = -1, s = i.length;
  if (arguments.length < 2) {
    for (; ++a < s; ) if ((o2 = (t10 = i[a]).type) && (o2 = eh(n[o2], t10.name))) return o2;
    return;
  }
  if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
  for (; ++a < s; ) if (o2 = (t10 = i[a]).type) n[o2] = Ks(n[o2], t10.name, e);
  else if (e == null) for (o2 in n) n[o2] = Ks(n[o2], t10.name, null);
  return this;
}, "on"), copy: m(function() {
  var t10 = {}, e = this._;
  for (var n in e) t10[n] = e[n].slice();
  return new jn(t10);
}, "copy"), call: m(function(t10, e) {
  if ((o2 = arguments.length - 2) > 0) for (var n = new Array(o2), i = 0, o2, a; i < o2; ++i) n[i] = arguments[i + 2];
  if (!this._.hasOwnProperty(t10)) throw new Error("unknown type: " + t10);
  for (a = this._[t10], i = 0, o2 = a.length; i < o2; ++i) a[i].value.apply(e, n);
}, "call"), apply: m(function(t10, e, n) {
  if (!this._.hasOwnProperty(t10)) throw new Error("unknown type: " + t10);
  for (var i = this._[t10], o2 = 0, a = i.length; o2 < a; ++o2) i[o2].value.apply(e, n);
}, "apply") };
function eh(t10, e) {
  for (var n = 0, i = t10.length, o2; n < i; ++n) if ((o2 = t10[n]).name === e) return o2.value;
}
m(eh, "get");
function Ks(t10, e, n) {
  for (var i = 0, o2 = t10.length; i < o2; ++i) if (t10[i].name === e) {
    t10[i] = jc, t10 = t10.slice(0, i).concat(t10.slice(i + 1));
    break;
  }
  return n != null && t10.push({ name: e, value: n }), t10;
}
m(Ks, "set");
var mo = Js;
var $e = 0;
var tn = 0;
var je = 0;
var tu = 1e3;
var tr;
var en;
var er = 0;
var ue = 0;
var nr = 0;
var nn = typeof performance == "object" && performance.now ? performance : Date;
var eu = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t10) {
  setTimeout(t10, 17);
};
function on() {
  return ue || (eu(nh), ue = nn.now() + nr);
}
m(on, "now");
function nh() {
  ue = 0;
}
m(nh, "clearNow");
function rn() {
  this._call = this._time = this._next = null;
}
m(rn, "Timer");
rn.prototype = rr.prototype = { constructor: rn, restart: m(function(t10, e, n) {
  if (typeof t10 != "function") throw new TypeError("callback is not a function");
  n = (n == null ? on() : +n) + (e == null ? 0 : +e), !this._next && en !== this && (en ? en._next = this : tr = this, en = this), this._call = t10, this._time = n, xo();
}, "restart"), stop: m(function() {
  this._call && (this._call = null, this._time = 1 / 0, xo());
}, "stop") };
function rr(t10, e, n) {
  var i = new rn();
  return i.restart(t10, e, n), i;
}
m(rr, "timer");
function nu() {
  on(), ++$e;
  for (var t10 = tr, e; t10; ) (e = ue - t10._time) >= 0 && t10._call.call(void 0, e), t10 = t10._next;
  --$e;
}
m(nu, "timerFlush");
function js() {
  ue = (er = nn.now()) + nr, $e = tn = 0;
  try {
    nu();
  } finally {
    $e = 0, ih(), ue = 0;
  }
}
m(js, "wake");
function rh() {
  var t10 = nn.now(), e = t10 - er;
  e > tu && (nr -= e, er = t10);
}
m(rh, "poke");
function ih() {
  for (var t10, e = tr, n, i = 1 / 0; e; ) e._call ? (i > e._time && (i = e._time), t10 = e, e = e._next) : (n = e._next, e._next = null, e = t10 ? t10._next = n : tr = n);
  en = t10, xo(i);
}
m(ih, "nap");
function xo(t10) {
  if (!$e) {
    tn && (tn = clearTimeout(tn));
    var e = t10 - ue;
    e > 24 ? (t10 < 1 / 0 && (tn = setTimeout(js, t10 - nn.now() - nr)), je && (je = clearInterval(je))) : (je || (er = nn.now(), je = setInterval(rh, tu)), $e = 1, eu(js));
  }
}
m(xo, "sleep");
function an(t10, e, n) {
  var i = new rn();
  return e = e == null ? 0 : +e, i.restart((o2) => {
    i.stop(), t10(o2 + e);
  }, e, n), i;
}
m(an, "default");
var oh = mo("start", "end", "cancel", "interrupt");
var ah = [];
var ou = 0;
var ru = 1;
var or = 2;
var ir = 3;
var iu = 4;
var ar = 5;
var sn = 6;
function Ot(t10, e, n, i, o2, a) {
  var s = t10.__transition;
  if (!s) t10.__transition = {};
  else if (n in s) return;
  sh(t10, n, { name: e, index: i, group: o2, on: oh, tween: ah, time: a.time, delay: a.delay, duration: a.duration, ease: a.ease, timer: null, state: ou });
}
m(Ot, "default");
function un(t10, e) {
  var n = K(t10, e);
  if (n.state > ou) throw new Error("too late; already scheduled");
  return n;
}
m(un, "init");
function it(t10, e) {
  var n = K(t10, e);
  if (n.state > ir) throw new Error("too late; already running");
  return n;
}
m(it, "set");
function K(t10, e) {
  var n = t10.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
m(K, "get");
function sh(t10, e, n) {
  var i = t10.__transition, o2;
  i[e] = n, n.timer = rr(a, 0, n.time);
  function a(f) {
    n.state = ru, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  m(a, "schedule");
  function s(f) {
    var h, p, c, m2;
    if (n.state !== ru) return l();
    for (h in i) if (m2 = i[h], m2.name === n.name) {
      if (m2.state === ir) return an(s);
      m2.state === iu ? (m2.state = sn, m2.timer.stop(), m2.on.call("interrupt", t10, t10.__data__, m2.index, m2.group), delete i[h]) : +h < e && (m2.state = sn, m2.timer.stop(), m2.on.call("cancel", t10, t10.__data__, m2.index, m2.group), delete i[h]);
    }
    if (an(function() {
      n.state === ir && (n.state = iu, n.timer.restart(u, n.delay, n.time), u(f));
    }), n.state = or, n.on.call("start", t10, t10.__data__, n.index, n.group), n.state === or) {
      for (n.state = ir, o2 = new Array(c = n.tween.length), h = 0, p = -1; h < c; ++h) (m2 = n.tween[h].value.call(t10, t10.__data__, n.index, n.group)) && (o2[++p] = m2);
      o2.length = p + 1;
    }
  }
  m(s, "start");
  function u(f) {
    for (var h = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(l), n.state = ar, 1), p = -1, c = o2.length; ++p < c; ) o2[p].call(t10, h);
    n.state === ar && (n.on.call("end", t10, t10.__data__, n.index, n.group), l());
  }
  m(u, "tick");
  function l() {
    n.state = sn, n.timer.stop(), delete i[e];
    for (var f in i) return;
    delete t10.__transition;
  }
  m(l, "stop");
}
m(sh, "create");
function fn(t10, e) {
  var n = t10.__transition, i, o2, a = true, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        a = false;
        continue;
      }
      o2 = i.state > or && i.state < ar, i.state = sn, i.timer.stop(), i.on.call(o2 ? "interrupt" : "cancel", t10, t10.__data__, i.index, i.group), delete n[s];
    }
    a && delete t10.__transition;
  }
}
m(fn, "default");
function _o(t10) {
  return this.each(function() {
    fn(this, t10);
  });
}
m(_o, "default");
function uh(t10, e) {
  var n, i;
  return function() {
    var o2 = it(this, t10), a = o2.tween;
    if (a !== n) {
      i = n = a;
      for (var s = 0, u = i.length; s < u; ++s) if (i[s].name === e) {
        i = i.slice(), i.splice(s, 1);
        break;
      }
    }
    o2.tween = i;
  };
}
m(uh, "tweenRemove");
function fh(t10, e, n) {
  var i, o2;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = it(this, t10), s = a.tween;
    if (s !== i) {
      o2 = (i = s).slice();
      for (var u = { name: e, value: n }, l = 0, f = o2.length; l < f; ++l) if (o2[l].name === e) {
        o2[l] = u;
        break;
      }
      l === f && o2.push(u);
    }
    a.tween = o2;
  };
}
m(fh, "tweenFunction");
function go(t10, e) {
  var n = this._id;
  if (t10 += "", arguments.length < 2) {
    for (var i = K(this.node(), n).tween, o2 = 0, a = i.length, s; o2 < a; ++o2) if ((s = i[o2]).name === t10) return s.value;
    return null;
  }
  return this.each((e == null ? uh : fh)(n, t10, e));
}
m(go, "default");
function Oe(t10, e, n) {
  var i = t10._id;
  return t10.each(function() {
    var o2 = it(this, i);
    (o2.value || (o2.value = {}))[e] = n.apply(this, arguments);
  }), function(o2) {
    return K(o2, i).value[e];
  };
}
m(Oe, "tweenValue");
function ln(t10, e) {
  var n;
  return (typeof e == "number" ? j : e instanceof _t ? Qt : (n = _t(e)) ? (e = n, Qt) : ge)(t10, e);
}
m(ln, "default");
function lh(t10) {
  return function() {
    this.removeAttribute(t10);
  };
}
m(lh, "attrRemove");
function ch(t10) {
  return function() {
    this.removeAttributeNS(t10.space, t10.local);
  };
}
m(ch, "attrRemoveNS");
function hh(t10, e, n) {
  var i, o2 = n + "", a;
  return function() {
    var s = this.getAttribute(t10);
    return s === o2 ? null : s === i ? a : a = e(i = s, n);
  };
}
m(hh, "attrConstant");
function ph(t10, e, n) {
  var i, o2 = n + "", a;
  return function() {
    var s = this.getAttributeNS(t10.space, t10.local);
    return s === o2 ? null : s === i ? a : a = e(i = s, n);
  };
}
m(ph, "attrConstantNS");
function mh(t10, e, n) {
  var i, o2, a;
  return function() {
    var s, u = n(this), l;
    return u == null ? void this.removeAttribute(t10) : (s = this.getAttribute(t10), l = u + "", s === l ? null : s === i && l === o2 ? a : (o2 = l, a = e(i = s, u)));
  };
}
m(mh, "attrFunction");
function dh(t10, e, n) {
  var i, o2, a;
  return function() {
    var s, u = n(this), l;
    return u == null ? void this.removeAttributeNS(t10.space, t10.local) : (s = this.getAttributeNS(t10.space, t10.local), l = u + "", s === l ? null : s === i && l === o2 ? a : (o2 = l, a = e(i = s, u)));
  };
}
m(dh, "attrFunctionNS");
function yo(t10, e) {
  var n = wt(t10), i = n === "transform" ? gi : ln;
  return this.attrTween(t10, typeof e == "function" ? (n.local ? dh : mh)(n, i, Oe(this, "attr." + t10, e)) : e == null ? (n.local ? ch : lh)(n) : (n.local ? ph : hh)(n, i, e));
}
m(yo, "default");
function xh(t10, e) {
  return function(n) {
    this.setAttribute(t10, e.call(this, n));
  };
}
m(xh, "attrInterpolate");
function _h(t10, e) {
  return function(n) {
    this.setAttributeNS(t10.space, t10.local, e.call(this, n));
  };
}
m(_h, "attrInterpolateNS");
function gh(t10, e) {
  var n, i;
  function o2() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && _h(t10, a)), n;
  }
  return m(o2, "tween"), o2._value = e, o2;
}
m(gh, "attrTweenNS");
function yh(t10, e) {
  var n, i;
  function o2() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && xh(t10, a)), n;
  }
  return m(o2, "tween"), o2._value = e, o2;
}
m(yh, "attrTween");
function vo(t10, e) {
  var n = "attr." + t10;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = wt(t10);
  return this.tween(n, (i.local ? gh : yh)(i, e));
}
m(vo, "default");
function vh(t10, e) {
  return function() {
    un(this, t10).delay = +e.apply(this, arguments);
  };
}
m(vh, "delayFunction");
function wh(t10, e) {
  return e = +e, function() {
    un(this, t10).delay = e;
  };
}
m(wh, "delayConstant");
function wo(t10) {
  var e = this._id;
  return arguments.length ? this.each((typeof t10 == "function" ? vh : wh)(e, t10)) : K(this.node(), e).delay;
}
m(wo, "default");
function bh(t10, e) {
  return function() {
    it(this, t10).duration = +e.apply(this, arguments);
  };
}
m(bh, "durationFunction");
function Mh(t10, e) {
  return e = +e, function() {
    it(this, t10).duration = e;
  };
}
m(Mh, "durationConstant");
function bo(t10) {
  var e = this._id;
  return arguments.length ? this.each((typeof t10 == "function" ? bh : Mh)(e, t10)) : K(this.node(), e).duration;
}
m(bo, "default");
function Th(t10, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    it(this, t10).ease = e;
  };
}
m(Th, "easeConstant");
function Mo(t10) {
  var e = this._id;
  return arguments.length ? this.each(Th(e, t10)) : K(this.node(), e).ease;
}
m(Mo, "default");
function kh(t10, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    it(this, t10).ease = n;
  };
}
m(kh, "easeVarying");
function To(t10) {
  if (typeof t10 != "function") throw new Error();
  return this.each(kh(this._id, t10));
}
m(To, "default");
function ko(t10) {
  typeof t10 != "function" && (t10 = he(t10));
  for (var e = this._groups, n = e.length, i = new Array(n), o2 = 0; o2 < n; ++o2) for (var a = e[o2], s = a.length, u = i[o2] = [], l, f = 0; f < s; ++f) (l = a[f]) && t10.call(l, l.__data__, f, a) && u.push(l);
  return new ot(i, this._parents, this._name, this._id);
}
m(ko, "default");
function So(t10) {
  if (t10._id !== this._id) throw new Error();
  for (var e = this._groups, n = t10._groups, i = e.length, o2 = n.length, a = Math.min(i, o2), s = new Array(i), u = 0; u < a; ++u) for (var l = e[u], f = n[u], h = l.length, p = s[u] = new Array(h), c, m2 = 0; m2 < h; ++m2) (c = l[m2] || f[m2]) && (p[m2] = c);
  for (; u < i; ++u) s[u] = e[u];
  return new ot(s, this._parents, this._name, this._id);
}
m(So, "default");
function Sh(t10) {
  return (t10 + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
m(Sh, "start");
function Ch(t10, e, n) {
  var i, o2, a = Sh(e) ? un : it;
  return function() {
    var s = a(this, t10), u = s.on;
    u !== i && (o2 = (i = u).copy()).on(e, n), s.on = o2;
  };
}
m(Ch, "onFunction");
function Co(t10, e) {
  var n = this._id;
  return arguments.length < 2 ? K(this.node(), n).on.on(t10) : this.each(Ch(n, t10, e));
}
m(Co, "default");
function Nh(t10) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t10) return;
    e && e.removeChild(this);
  };
}
m(Nh, "removeFunction");
function No() {
  return this.on("end.remove", Nh(this._id));
}
m(No, "default");
function Ao(t10) {
  var e = this._name, n = this._id;
  typeof t10 != "function" && (t10 = It(t10));
  for (var i = this._groups, o2 = i.length, a = new Array(o2), s = 0; s < o2; ++s) for (var u = i[s], l = u.length, f = a[s] = new Array(l), h, p, c = 0; c < l; ++c) (h = u[c]) && (p = t10.call(h, h.__data__, c, u)) && ("__data__" in h && (p.__data__ = h.__data__), f[c] = p, Ot(f[c], e, n, c, f, K(h, n)));
  return new ot(a, this._parents, e, n);
}
m(Ao, "default");
function Do(t10) {
  var e = this._name, n = this._id;
  typeof t10 != "function" && (t10 = ce(t10));
  for (var i = this._groups, o2 = i.length, a = [], s = [], u = 0; u < o2; ++u) for (var l = i[u], f = l.length, h, p = 0; p < f; ++p) if (h = l[p]) {
    for (var c = t10.call(h, h.__data__, p, l), m2, _ = K(h, n), M = 0, T = c.length; M < T; ++M) (m2 = c[M]) && Ot(m2, e, n, M, c, _);
    a.push(c), s.push(h);
  }
  return new ot(a, s, e, n);
}
m(Do, "default");
var Ah = Ct.prototype.constructor;
function $o() {
  return new Ah(this._groups, this._parents);
}
m($o, "default");
function Dh(t10, e) {
  var n, i, o2;
  return function() {
    var a = Rt(this, t10), s = (this.style.removeProperty(t10), Rt(this, t10));
    return a === s ? null : a === n && s === i ? o2 : o2 = e(n = a, i = s);
  };
}
m(Dh, "styleNull");
function au(t10) {
  return function() {
    this.style.removeProperty(t10);
  };
}
m(au, "styleRemove");
function $h(t10, e, n) {
  var i, o2 = n + "", a;
  return function() {
    var s = Rt(this, t10);
    return s === o2 ? null : s === i ? a : a = e(i = s, n);
  };
}
m($h, "styleConstant");
function Oh(t10, e, n) {
  var i, o2, a;
  return function() {
    var s = Rt(this, t10), u = n(this), l = u + "";
    return u == null && (l = u = (this.style.removeProperty(t10), Rt(this, t10))), s === l ? null : s === i && l === o2 ? a : (o2 = l, a = e(i = s, u));
  };
}
m(Oh, "styleFunction");
function Eh(t10, e) {
  var n, i, o2, a = "style." + e, s = "end." + a, u;
  return function() {
    var l = it(this, t10), f = l.on, h = l.value[a] == null ? u || (u = au(e)) : void 0;
    (f !== n || o2 !== h) && (i = (n = f).copy()).on(s, o2 = h), l.on = i;
  };
}
m(Eh, "styleMaybeRemove");
function Oo(t10, e, n) {
  var i = (t10 += "") == "transform" ? _i : ln;
  return e == null ? this.styleTween(t10, Dh(t10, i)).on("end.style." + t10, au(t10)) : typeof e == "function" ? this.styleTween(t10, Oh(t10, i, Oe(this, "style." + t10, e))).each(Eh(this._id, t10)) : this.styleTween(t10, $h(t10, i, e), n).on("end.style." + t10, null);
}
m(Oo, "default");
function Ih(t10, e, n) {
  return function(i) {
    this.style.setProperty(t10, e.call(this, i), n);
  };
}
m(Ih, "styleInterpolate");
function Rh(t10, e, n) {
  var i, o2;
  function a() {
    var s = e.apply(this, arguments);
    return s !== o2 && (i = (o2 = s) && Ih(t10, s, n)), i;
  }
  return m(a, "tween"), a._value = e, a;
}
m(Rh, "styleTween");
function Eo(t10, e, n) {
  var i = "style." + (t10 += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Rh(t10, e, n ?? ""));
}
m(Eo, "default");
function Ph(t10) {
  return function() {
    this.textContent = t10;
  };
}
m(Ph, "textConstant");
function Yh(t10) {
  return function() {
    var e = t10(this);
    this.textContent = e ?? "";
  };
}
m(Yh, "textFunction");
function Io(t10) {
  return this.tween("text", typeof t10 == "function" ? Yh(Oe(this, "text", t10)) : Ph(t10 == null ? "" : t10 + ""));
}
m(Io, "default");
function Fh(t10) {
  return function(e) {
    this.textContent = t10.call(this, e);
  };
}
m(Fh, "textInterpolate");
function Uh(t10) {
  var e, n;
  function i() {
    var o2 = t10.apply(this, arguments);
    return o2 !== n && (e = (n = o2) && Fh(o2)), e;
  }
  return m(i, "tween"), i._value = t10, i;
}
m(Uh, "textTween");
function Ro(t10) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t10 == null) return this.tween(e, null);
  if (typeof t10 != "function") throw new Error();
  return this.tween(e, Uh(t10));
}
m(Ro, "default");
function Po() {
  for (var t10 = this._name, e = this._id, n = sr(), i = this._groups, o2 = i.length, a = 0; a < o2; ++a) for (var s = i[a], u = s.length, l, f = 0; f < u; ++f) if (l = s[f]) {
    var h = K(l, e);
    Ot(l, t10, n, f, s, { time: h.time + h.delay + h.duration, delay: 0, duration: h.duration, ease: h.ease });
  }
  return new ot(i, this._parents, t10, n);
}
m(Po, "default");
function Yo() {
  var t10, e, n = this, i = n._id, o2 = n.size();
  return new Promise(function(a, s) {
    var u = { value: s }, l = { value: m(function() {
      --o2 === 0 && a();
    }, "value") };
    n.each(function() {
      var f = it(this, i), h = f.on;
      h !== t10 && (e = (t10 = h).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(l)), f.on = e;
    }), o2 === 0 && a();
  });
}
m(Yo, "default");
var Lh = 0;
function ot(t10, e, n, i) {
  this._groups = t10, this._parents = e, this._name = n, this._id = i;
}
m(ot, "Transition");
function su(t10) {
  return Ct().transition(t10);
}
m(su, "transition");
function sr() {
  return ++Lh;
}
m(sr, "newId");
var Et = Ct.prototype;
ot.prototype = su.prototype = { constructor: ot, select: Ao, selectAll: Do, selectChild: Et.selectChild, selectChildren: Et.selectChildren, filter: ko, merge: So, selection: $o, transition: Po, call: Et.call, nodes: Et.nodes, node: Et.node, size: Et.size, empty: Et.empty, each: Et.each, on: Co, attr: yo, attrTween: vo, style: Oo, styleTween: Eo, text: Io, textTween: Ro, remove: No, tween: go, delay: wo, duration: bo, ease: Mo, easeVarying: To, end: Yo, [Symbol.iterator]: Et[Symbol.iterator] };
function ur(t10) {
  return ((t10 *= 2) <= 1 ? t10 * t10 * t10 : (t10 -= 2) * t10 * t10 + 2) / 2;
}
m(ur, "cubicInOut");
var zh = { time: null, delay: 0, duration: 250, ease: ur };
function Hh(t10, e) {
  for (var n; !(n = t10.__transition) || !(n = n[e]); ) if (!(t10 = t10.parentNode)) throw new Error(`transition ${e} not found`);
  return n;
}
m(Hh, "inherit");
function Fo(t10) {
  var e, n;
  t10 instanceof ot ? (e = t10._id, t10 = t10._name) : (e = sr(), (n = zh).time = on(), t10 = t10 == null ? null : t10 + "");
  for (var i = this._groups, o2 = i.length, a = 0; a < o2; ++a) for (var s = i[a], u = s.length, l, f = 0; f < u; ++f) (l = s[f]) && Ot(l, t10, e, f, s, n || Hh(l, e));
  return new ot(i, this._parents, t10, e);
}
m(Fo, "default");
Ct.prototype.interrupt = _o;
Ct.prototype.transition = Fo;
var { abs: jM, max: tT, min: eT } = Math;
function uu(t10) {
  return [+t10[0], +t10[1]];
}
m(uu, "number1");
function Bh(t10) {
  return [uu(t10[0]), uu(t10[1])];
}
m(Bh, "number2");
var nT = { name: "x", handles: ["w", "e"].map(Uo), input: m(function(t10, e) {
  return t10 == null ? null : [[+t10[0], e[0][1]], [+t10[1], e[1][1]]];
}, "input"), output: m(function(t10) {
  return t10 && [t10[0][0], t10[1][0]];
}, "output") };
var rT = { name: "y", handles: ["n", "s"].map(Uo), input: m(function(t10, e) {
  return t10 == null ? null : [[e[0][0], +t10[0]], [e[1][0], +t10[1]]];
}, "input"), output: m(function(t10) {
  return t10 && [t10[0][1], t10[1][1]];
}, "output") };
var iT = { name: "xy", handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Uo), input: m(function(t10) {
  return t10 == null ? null : Bh(t10);
}, "input"), output: m(function(t10) {
  return t10;
}, "output") };
function Uo(t10) {
  return { type: t10 };
}
m(Uo, "type");
function qt(t10, e, n) {
  this.k = t10, this.x = e, this.y = n;
}
m(qt, "Transform");
qt.prototype = { constructor: qt, scale: m(function(t10) {
  return t10 === 1 ? this : new qt(this.k * t10, this.x, this.y);
}, "scale"), translate: m(function(t10, e) {
  return t10 === 0 & e === 0 ? this : new qt(this.k, this.x + this.k * t10, this.y + this.k * e);
}, "translate"), apply: m(function(t10) {
  return [t10[0] * this.k + this.x, t10[1] * this.k + this.y];
}, "apply"), applyX: m(function(t10) {
  return t10 * this.k + this.x;
}, "applyX"), applyY: m(function(t10) {
  return t10 * this.k + this.y;
}, "applyY"), invert: m(function(t10) {
  return [(t10[0] - this.x) / this.k, (t10[1] - this.y) / this.k];
}, "invert"), invertX: m(function(t10) {
  return (t10 - this.x) / this.k;
}, "invertX"), invertY: m(function(t10) {
  return (t10 - this.y) / this.k;
}, "invertY"), rescaleX: m(function(t10) {
  return t10.copy().domain(t10.range().map(this.invertX, this).map(t10.invert, t10));
}, "rescaleX"), rescaleY: m(function(t10) {
  return t10.copy().domain(t10.range().map(this.invertY, this).map(t10.invert, t10));
}, "rescaleY"), toString: m(function() {
  return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
}, "toString") };
var Lo = new qt(1, 0, 0);
zo.prototype = qt.prototype;
function zo(t10) {
  for (; !t10.__zoom; ) if (!(t10 = t10.parentNode)) return Lo;
  return t10.__zoom;
}
m(zo, "transform");

export {
  Bo,
  pt,
  Wh,
  Wo,
  Vo,
  ku,
  Su,
  ia,
  Yf,
  $n,
  Pn,
  Ua,
  He,
  Zi,
  jt,
  Tt,
  we,
  be,
  Dt,
  $t,
  Me,
  qa,
  Wa,
  zt,
  Va,
  Xa,
  ke,
  Hn,
  vs,
  oo,
  $c,
  ks,
  Vn,
  As,
  Ds,
  Lc,
  zc,
  $s,
  Es,
  Rs,
  Hc,
  Bc,
  qc,
  Wc,
  Vc,
  Xc,
  Gc,
  zs,
  Zc,
  Qc,
  Zs,
  Qs,
  Kc,
  Jc
};
//# sourceMappingURL=chunk-LKDN26KO.js.map

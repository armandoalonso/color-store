"use strict";

const ALPHAEX_SHIFT = 1024;
const ALPHAEX_MAX = 1023;
const RGBEX_SHIFT = 16384;
const RGBEX_MAX = 8191;
const RGBEX_MIN = -8192;

// C3.Clamp(x, a, b) / mathutils.js
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x); 

// C3.IsFiniteNumber(x) / typeCheck.js
const isFiniteNumber = (x) => {
    return typeof x === "number" && isFinite(x);    
} 

// C3.GetRValue(rgb) / mathutils.js
const getRValue = (rgb) => {
    if (rgb >= 0) return (rgb & 255) / 255;
    else {
        let v = Math.floor(-rgb / (RGBEX_SHIFT * RGBEX_SHIFT * ALPHAEX_SHIFT));
        if (v > RGBEX_MAX) v -= RGBEX_SHIFT;
        return v / 1024;
    }
}

// C3.GetGValue(rgb) / mathutils.js
const getGValue = (rgb) => {
    if (rgb >= 0) return ((rgb & 65280) >> 8) / 255;
    else {
        let v = Math.floor((-rgb % (RGBEX_SHIFT * RGBEX_SHIFT * ALPHAEX_SHIFT)) / (RGBEX_SHIFT * ALPHAEX_SHIFT));
        if (v > RGBEX_MAX) v -= RGBEX_SHIFT;
        return v / 1024;
    }
}

// C3.GetBValue(rgb) / mathutils.js
const getBValue = (rgb) => {
    if (rgb >= 0) return ((rgb & 16711680) >> 16) / 255;
    else {
        let v = Math.floor((-rgb % (RGBEX_SHIFT * ALPHAEX_SHIFT)) / ALPHAEX_SHIFT);
        if (v > RGBEX_MAX) v -= RGBEX_SHIFT;
        return v / 1024;
    }
}

// C3.GetAValue(rgb) / mathutils.js
const getAValue = (rgb) => {
    if (isNegativeZero(rgb)) return 0;
    else if (rgb >= 0) return 1;
    else {
        const v = Math.floor(-rgb % ALPHAEX_SHIFT);
        return v / ALPHAEX_MAX;
    }
}

//C3.isNegativeZero(x) / mathutils.js
const isNegativeZero = (x) => {
    return x === 0 && 1 / x < 0;
}

const packRGBAEx = (red, green, blue, alpha) => {
    red = clamp(Math.floor(red * 1024), RGBEX_MIN, RGBEX_MAX);
    green = clamp(Math.floor(green * 1024), RGBEX_MIN, RGBEX_MAX);
    blue = clamp(Math.floor(blue * 1024), RGBEX_MIN, RGBEX_MAX);
    alpha = clamp(Math.floor(alpha * ALPHAEX_MAX), 0, ALPHAEX_MAX);
    if (red < 0) red += RGBEX_SHIFT;
    if (green < 0) green += RGBEX_SHIFT;
    if (blue < 0) blue += RGBEX_SHIFT;
    return -(
      red * RGBEX_SHIFT * RGBEX_SHIFT * ALPHAEX_SHIFT +
      green * RGBEX_SHIFT * ALPHAEX_SHIFT +
      blue * ALPHAEX_SHIFT +
      alpha
    );
};

// C3.Color / color.js
class Color {
    constructor(r, g, b, a) {
        this._r = NaN;
        this._g = NaN;
        this._b = NaN;
        this._a = NaN;
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 0;
        if (r instanceof Color) this.set(r);
        else this.setRgba(r || 0, g || 0, b || 0, a || 0);
      }
      setRgb(r, g, b) {
        this._r = +r;
        this._g = +g;
        this._b = +b;
        this.clamp();
        return this;
      }
      setRgba(r, g, b, a) {
        this._r = +r;
        this._g = +g;
        this._b = +b;
        this._a = +a;
        this.clamp();
        return this;
      }
      set(c) {
        this._r = c._r;
        this._g = c._g;
        this._b = c._b;
        this._a = c._a;
        return this;
      }
      copy(c) {
        return this.set(c);
      }
      add(c) {
        this._r += c._r;
        this._g += c._g;
        this._b += c._b;
        this._a += c._a;
        this.clamp();
      }
      addRgb(r, g, b, a = 0) {
        this._r += +r;
        this._g += +g;
        this._b += +b;
        this._a += +a;
        this.clamp();
      }
      diff(c) {
        this.setR(Math.max(this._r, c._r) - Math.min(this._r, c._r));
        this.setG(Math.max(this._g, c._g) - Math.min(this._g, c._g));
        this.setB(Math.max(this._b, c._b) - Math.min(this._b, c._b));
        this.setA(Math.max(this._a, c._a) - Math.min(this._a, c._a));
        this.clamp();
      }
      copyRgb(c) {
        this._r = c._r;
        this._g = c._g;
        this._b = c._b;
      }
      setR(r) {
        this._r = clamp(+r, 0, 1);
      }
      getR() {
        return this._r;
      }
      setG(g) {
        this._g = clamp(+g, 0, 1);
      }
      getG() {
        return this._g;
      }
      setB(b) {
        this._b = clamp(+b, 0, 1);
      }
      getB() {
        return this._b;
      }
      setA(a) {
        this._a = clamp(+a, 0, 1);
      }
      getA() {
        return this._a;
      }
      clone() {
        return new Color(this._r, this._g, this._b, this._a);
      }
      toArray() {
        return [this._r, this._g, this._b, this._a];
      }
      toTypedArray() {
        return new Float64Array(this.toArray());
      }
      writeToTypedArray(ta, i) {
        ta[i++] = this._r;
        ta[i++] = this._g;
        ta[i++] = this._b;
        ta[i] = this._a;
      }
      writeRGBToTypedArray(ta, i) {
        ta[i++] = this._r;
        ta[i++] = this._g;
        ta[i] = this._b;
      }
      equals(c) {
        return this._r === c._r && this._g === c._g && this._b === c._b && this._a === c._a;
      }
      equalsIgnoringAlpha(c) {
        return this._r === c._r && this._g === c._g && this._b === c._b;
      }
      equalsRgb(r, g, b) {
        return this._r === r && this._g === g && this._b === b;
      }
      equalsRgba(r, g, b, a) {
        return this._r === r && this._g === g && this._b === b && this._a === a;
      }
      equalsF32Array(arr, offset) {
        return (
          arr[offset] === Math.fround(this._r) &&
          arr[offset + 1] === Math.fround(this._g) &&
          arr[offset + 2] === Math.fround(this._b) &&
          arr[offset + 3] === Math.fround(this._a)
        );
      }
      equalsRGBF32Array(arr, offset) {
        return (
          arr[offset] === Math.fround(this._r) &&
          arr[offset + 1] === Math.fround(this._g) &&
          arr[offset + 2] === Math.fround(this._b)
        );
      }
      multiply(c) {
        this._r *= c._r;
        this._g *= c._g;
        this._b *= c._b;
        this._a *= c._a;
      }
      multiplyAlpha(a) {
        this._r *= a;
        this._g *= a;
        this._b *= a;
        this._a *= a;
      }
      premultiply() {
        this._r *= this._a;
        this._g *= this._a;
        this._b *= this._a;
        return this;
      }
      unpremultiply() {
        this._r /= this._a;
        this._g /= this._a;
        this._b /= this._a;
        return this;
      }
      clamp() {
        this._r = clamp(this._r, 0, 1);
        this._g = clamp(this._g, 0, 1);
        this._b = clamp(this._b, 0, 1);
        this._a = clamp(this._a, 0, 1);
        return this;
      }
      setFromRgbValue(rgb) {
        this._r = getRValue(rgb);
        this._g = getGValue(rgb);
        this._b = getBValue(rgb);
        this._a = getAValue(rgb);
      }
      getCssRgb(_r, _g, _b) {
        const r = isFiniteNumber(_r) ? _r : this.getR();
        const g = isFiniteNumber(_g) ? _g : this.getG();
        const b = isFiniteNumber(_b) ? _b : this.getB();
        return `rgb(${r * 100}%, ${g * 100}%, ${b * 100}%)`;
      }
      getCssRgba(_r, _g, _b, _a) {
        const r = isFiniteNumber(_r) ? _r : this.getR();
        const g = isFiniteNumber(_g) ? _g : this.getG();
        const b = isFiniteNumber(_b) ? _b : this.getB();
        const a = isFiniteNumber(_a) ? _a : this.getA();
        return `rgba(${r * 100}%, ${g * 100}%, ${b * 100}%, ${a})`;
      }
      toHexString() {
        const rh = Math.round(this.getR() * 255);
        const gh = Math.round(this.getG() * 255);
        const bh = Math.round(this.getB() * 255);
        return "#" + padTwoDigits(rh.toString(16)) + padTwoDigits(gh.toString(16)) + padTwoDigits(bh.toString(16));
      }
      parseHexString(str) {
        if (typeof str !== "string") return false;
        str = str.trim();
        if (str.charAt(0) === "#") str = str.substr(1);
        let rv;
        let gv;
        let bv;
        if (str.length === 3) {
          rv = parseInt(str[0], 16) / 15;
          gv = parseInt(str[1], 16) / 15;
          bv = parseInt(str[2], 16) / 15;
        } else if (str.length === 6) {
          rv = parseInt(str.substr(0, 2), 16) / 255;
          gv = parseInt(str.substr(2, 2), 16) / 255;
          bv = parseInt(str.substr(4, 2), 16) / 255;
        } else return false;
        if (isFinite(rv)) this.setR(rv);
        if (isFinite(gv)) this.setG(gv);
        if (isFinite(bv)) this.setB(bv);
        this.setA(1);
        return true;
      }
      toCommaSeparatedRgb() {
        const rv = Math.round(this.getR() * 255);
        const gv = Math.round(this.getG() * 255);
        const bv = Math.round(this.getB() * 255);
        return `${rv}, ${gv}, ${bv}`;
      }
      toRgbArray() {
        const rv = Math.round(this.getR() * 255);
        const gv = Math.round(this.getG() * 255);
        const bv = Math.round(this.getB() * 255);
        return [rv, gv, bv];
      }
      parseCommaSeparatedRgb(str) {
        if (typeof str !== "string") return false;
        str = str.replace(/^rgb\(|\)|%/, "");
        const arr = str.split(",");
        if (arr.length < 3) return false;
        const rv = parseInt(arr[0].trim(), 10) / 255;
        const gv = parseInt(arr[1].trim(), 10) / 255;
        const bv = parseInt(arr[2].trim(), 10) / 255;
        if (isFinite(rv)) this.setR(rv);
        if (isFinite(gv)) this.setG(gv);
        if (isFinite(bv)) this.setB(bv);
        this.setA(1);
        return true;
      }
      parseCommaSeparatedPercentageRgb(str) {
        if (typeof str !== "string") return false;
        str = str.replace(/^rgb\(|\)|%/, "");
        const arr = str.split(",");
        if (arr.length < 3) return false;
        const rv = parseInt(arr[0].trim(), 10) / 100;
        const gv = parseInt(arr[1].trim(), 10) / 100;
        const bv = parseInt(arr[2].trim(), 10) / 100;
        if (isFinite(rv)) this.setR(rv);
        if (isFinite(gv)) this.setG(gv);
        if (isFinite(bv)) this.setB(bv);
        this.setA(1);
        return true;
      }
      parseCommaSeparatedRgba(str) {
        if (typeof str !== "string") return false;
        str = str.replace(/^rgba\(|\)|%/, "");
        const arr = str.split(",");
        if (arr.length < 4) return false;
        const rv = parseInt(arr[0].trim(), 10) / 255;
        const gv = parseInt(arr[1].trim(), 10) / 255;
        const bv = parseInt(arr[2].trim(), 10) / 255;
        const av = parseFloat(arr[3].trim());
        if (isFinite(rv)) this.setR(rv);
        if (isFinite(gv)) this.setG(gv);
        if (isFinite(bv)) this.setB(bv);
        if (isFinite(av)) this.setA(av);
        return true;
      }
      parseCommaSeparatedPercentageRgba(str) {
        if (typeof str !== "string") return false;
        str = str.replace(/^rgba\(|\)|%/, "");
        const arr = str.split(",");
        if (arr.length < 4) return false;
        const rv = parseInt(arr[0].trim(), 10) / 100;
        const gv = parseInt(arr[1].trim(), 10) / 100;
        const bv = parseInt(arr[2].trim(), 10) / 100;
        const av = parseFloat(arr[3].trim());
        if (isFinite(rv)) this.setR(rv);
        if (isFinite(gv)) this.setG(gv);
        if (isFinite(bv)) this.setB(bv);
        if (isFinite(av)) this.setA(av);
        return true;
      }
      parseString(str) {
        if (typeof str !== "string") return false;
        str = str.replace(/\s+/, "");
        if (str.includes(","))
          if (str.startsWith("rgb("))
            if (str.includes("%")) return this.parseCommaSeparatedPercentageRgb(str);
            else return this.parseCommaSeparatedRgb(str);
          else if (str.startsWith("rgba("))
            if (str.includes("%")) return this.parseCommaSeparatedPercentageRgba(str);
            else return this.parseCommaSeparatedRgba(str);
          else if (str.startsWith("hsl(") || str.startsWith("hsla(")) return this.parseHSLString(str);
          else {
            const components = str.split(",");
            if (str.includes("%")) {
              if (components.length === 3) return this.parseCommaSeparatedPercentageRgb(str);
              else if (components.length === 4) return this.parseCommaSeparatedPercentageRgba(str);
              return false;
            } else {
              if (components.length === 3) return this.parseCommaSeparatedRgb(str);
              else if (components.length === 4) return this.parseCommaSeparatedRgba(str);
              return false;
            }
          }
        else return this.parseHexString(str);
      }
      toJSON() {
        return [this._r, this._g, this._b, this._a];
      }
      setFromHSLA(h, s, l, a) {
        let r;
        let g;
        let b;
        h %= 360;
        s = clamp(s, 0, 100);
        l = clamp(l, 0, 100);
        a = clamp(a, 0, 1);
        h /= 360;
        s /= 100;
        l /= 100;
        if (s === 0) r = g = b = l;
        else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hueToRGB(p, q, h + 1 / 3);
          g = hueToRGB(p, q, h);
          b = hueToRGB(p, q, h - 1 / 3);
        }
        this.setR(r);
        this.setG(g);
        this.setB(b);
        this.setA(a);
        return this;
      }
      parseHSLString(str) {
        const cleanString = str.replace(/ |hsl|hsla|\(|\)|;/gi, "");
        const hsl = HSL_TEST.exec(cleanString);
        const hsla = HSLA_TEST.exec(cleanString);
        if (hsl && hsl.length === 4) {
          this.setFromHSLA(+hsl[1], +hsl[2], +hsl[3], 1);
          return true;
        } else if (hsla && hsla.length === 5) {
          this.setFromHSLA(+hsl[1], +hsl[2], +hsl[3], +hsl[4]);
          return true;
        }
        return false;
      }
      toHSLAString() {
        const r = this._r;
        const g = this._g;
        const b = this._b;
        const a = this._a;
        const h = Color.GetHue(r, g, b);
        const s = Color.GetSaturation(r, g, b);
        const l = Color.GetLuminosity(r, g, b);
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
      }
      toHSLAArray() {
        const r = this._r;
        const g = this._g;
        const b = this._b;
        return [Color.GetHue(r, g, b), Color.GetSaturation(r, g, b), Color.GetLuminosity(r, g, b), this._a];
      }
      setFromJSON(arr) {
        if (!Array.isArray(arr)) return;
        if (arr.length < 3) return;
        this._r = arr[0];
        this._g = arr[1];
        this._b = arr[2];
        if (arr.length >= 4) this._a = arr[3];
        else this._a = 1;
      }
      set r(r) {
        this.setR(r);
      }
      get r() {
        return this.getR();
      }
      set g(g) {
        this.setG(g);
      }
      get g() {
        return this.getG();
      }
      set b(b) {
        this.setB(b);
      }
      get b() {
        return this.getB();
      }
      set a(a) {
        this.setA(a);
      }
      get a() {
        return this.getA();
      }
      setAtIndex(i, v) {
        switch (i) {
          case 0:
            this.setR(v);
            break;
          case 1:
            this.setG(v);
            break;
          case 2:
            this.setB(v);
            break;
          case 3:
            this.setA(v);
            break;
          default:
            throw new RangeError("invalid color index");
        }
      }
      getAtIndex(i) {
        switch (i) {
          case 0:
            return this.getR();
          case 1:
            return this.getG();
          case 2:
            return this.getB();
          case 3:
            return this.getA();
          default:
            throw new RangeError("invalid color index");
        }
      }
      static Equals(color_or_json_1, color_or_json_2) {
        let c1;
        let c2;
        if (Array.isArray(color_or_json_1)) {
          c1 = new Color();
          c1.setFromJSON(color_or_json_1);
        } else if (color_or_json_1 instanceof Color) c1 = color_or_json_1;
        else throw new Error("unexpected type");
        if (Array.isArray(color_or_json_2)) {
          c2 = new Color();
          c2.setFromJSON(color_or_json_2);
        } else if (color_or_json_2 instanceof Color) c2 = color_or_json_2;
        else throw new Error("unexpected type");
        return c1.equals(c2);
      }
      static DiffChannel(channel1, channel2) {
        return clamp(Math.max(channel1, channel2) - Math.min(channel1, channel2), 0, 1);
      }
      static Diff(c1, c2) {
        const ret = new Color();
        ret.setR(Math.max(c1._r, c2._r) - Math.min(c1._r, c2._r));
        ret.setG(Math.max(c1._g, c2._g) - Math.min(c1._g, c2._g));
        ret.setB(Math.max(c1._b, c2._b) - Math.min(c1._b, c2._b));
        ret.setA(Math.max(c1._a, c2._a) - Math.min(c1._a, c2._a));
        return ret;
      }
      static DiffNoAlpha(c1, c2) {
        const ret = new Color(0, 0, 0, 1);
        ret.setR(Math.max(c1._r, c2._r) - Math.min(c1._r, c2._r));
        ret.setG(Math.max(c1._g, c2._g) - Math.min(c1._g, c2._g));
        ret.setB(Math.max(c1._b, c2._b) - Math.min(c1._b, c2._b));
        return ret;
      }
      static GetHue(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (max === min) return 0;
        let h = 0;
        switch (max) {
          case r:
            h = (g - b) / (max - min) + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / (max - min) + 2;
            break;
          case b:
            h = (r - g) / (max - min) + 4;
            break;
        }
        return Math.round((h / 6) * 360);
      }
      static GetSaturation(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (max === min) return 0;
        const l = (max + min) / 2;
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        return Math.round(s * 100);
      }
      static GetLuminosity(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (!max) return 0;
        return Math.round(l * 100);
      }
}

export default Color;
export { Color, getAValue, getBValue, getGValue, getRValue, packRGBAEx };
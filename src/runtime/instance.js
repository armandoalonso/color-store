import { id } from "../../config.caw.js";
import { c } from "../../template/aceDefine.js";
import { Color, getRValue, getGValue, getBValue, getAValue, packRGBAEx } from "./color.js"
import paletteMap from "./palettes.js";


export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();
      if (properties) {
      }

      this.colorMap = {};
      // this.colorMap["red"] = {
      //   hex: "#ff0000",
      //   packed: 4278190335,
      //   rgb255: {r: 255,g: 0,b: 0, a: 255},     
      //   rgb: {r: 1,g: 0,b: 0, a: 1},
      //   hsla: {h: 0,s: 1,l: 0.5,a: 1}
      // };
      this.palettes = ["endesga64", "cc29", "fantasy24", "mulfok32", "pear36", "pico8", "resurrect64"];
      this.currentPalette = "endesga64";
    }

    packedColorToRGB(packed) {
      const r = getRValue(packed);
      const g = getGValue(packed);
      const b = getBValue(packed);
      const a = getAValue(packed);

      return {
        r: this.denormalizeColor(r),
        g: this.denormalizeColor(g),
        b: this.denormalizeColor(b),
        a: this.denormalizeColor(a)
      }
    }

    rgbToPacked(r,g,b,a) {
      const normalizeColor = this.normalizeRGBA(r,g,b,a);
      return packRGBAEx(
        normalizeColor.r, 
        normalizeColor.g, 
        normalizeColor.b, 
        normalizeColor.a
      );
    }

    rgbToHex(r,g,b,a) {
      const color = new Color(
        this.normalizeColor(r),
        this.normalizeColor(g),
        this.normalizeColor(b),
        this.normalizeColor(a)
      )
      return color.toHexString();
    }

    hexToRGB(hex) {
      const color = new Color(0,0,0,0);
      color.parseHexString(hex);
      return {
        r: this.denormalizeColor(color.getR()),
        g: this.denormalizeColor(color.getG()),
        b: this.denormalizeColor(color.getB()),
        a: this.denormalizeColor(color.getA())
      }
    }

    normalizeColor(color) {
      return color / 255;
    }

    denormalizeColor(color) {
      return Math.floor(color * 255);
    }

    normalizeRGBA(r,g,b,a) {
      return {
        r: this.normalizeColor(r),
        g: this.normalizeColor(g),
        b: this.normalizeColor(b),
        a: this.normalizeColor(a)
      }
    }

    denormalizeRGBA(r,g,b,a) {
      return {
        r: this.denormalizeColor(rgb.r),
        g: this.denormalizeColor(rgb.g),
        b: this.denormalizeColor(rgb.b),
        a: this.denormalizeColor(rgb.a)
      }
    }

    rgbToHLSA(r,g,b,a) {
      const color = new Color(
        this.normalizeColor(r),
        this.normalizeColor(g),
        this.normalizeColor(b),
        this.normalizeColor(a)
      )
      const hsla = color.toHSLAArray();
      return {
        h: hsla[0],
        s: hsla[1],
        l: hsla[2],
        a: this.denormalizeColor(hsla[3])
      };
    }

    hlsaToRGB(h,s,l,a) {
      const color = Color(0,0,0,0);
      color.setFromHSLA(h, s, l, a);
      return {
        r: this.denormalizeColor(color.getR()), 
        g: this.denormalizeColor(color.getG()), 
        b: this.denormalizeColor(color.getB()), 
        a: this.denormalizeColor(color.getA())
      };
    }

    loadPalette(paletteIndex) {
      const palette = this.palettes[paletteIndex];
      this.currentPalette = palette ?? "";
      switch (palette) {
        case "endesga64": this.generateColorMapFromHexArray(paletteMap.endesga64); break;
        case "cc29": this.generateColorMapFromHexArray(paletteMap.cc29); break;
        case "fantasy24": this.generateColorMapFromHexArray(paletteMap.fantasy24); break;
        case "mulfok32": this.generateColorMapFromHexArray(paletteMap.mulfok32); break;
        case "pear36": this.generateColorMapFromHexArray(paletteMap.pear36); break;
        case "pico8": this.generateColorMapFromHexArray(paletteMap.pico8); break;
        case "resurrect64": this.generateColorMapFromHexArray(paletteMap.resurrect64); break;
        default:
          throw new Error(`Palette ${palette} not found`);
        }
    }

    generateColorMapFromHexArray(hexArray) {
      this.clearColorMap();
      hexArray.forEach(hex => {
          const hexKey = hex.trim();
          const rgb = this.hexToRGB(hexKey);
          this.colorMap[hexKey] = {
            hex: hexKey,
            packed: this.rgbToPacked(rgb.r, rgb.g, rgb.b, rgb.a),
            rgb: {
              r: this.normalizeColor(rgb.r),
              g: this.normalizeColor(rgb.g),
              b: this.normalizeColor(rgb.b),
              a: this.normalizeColor(rgb.a),
            },
            rgb255: rgb,
            hsla: this.rgbToHLSA(rgb.r, rgb.g, rgb.b, rgb.a),
          };
      });
    }

    clearColorMap() {
      this.colorMap = {};
    }

    _trigger(method) {
      super._trigger(self.C3.Plugins[id].Cnds[method]);
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        colorMap: this.colorMap
      };
    }

    _loadFromJson(o) {
      this.colorMap = o.colorMap;
    }
  };
}

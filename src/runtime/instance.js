import { id } from "../../config.caw.js";
import { c } from "../../template/aceDefine.js";
import { Color, getRValue, getGValue, getBValue, getAValue, packRGBAEx } from "./color.js"
import palettes from "./palettes.js";


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
      this.currentPalette = palettes[0];
      this.palettes = palettes;
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

    async loadPalette(paletteIndex) {
      const palette = palettes[paletteIndex];
      const fileName = Object.keys(palette)[0];
      this.currentPalette = palette[fileName];
      
      var file = await this.runtime.assets.getProjectFileUrl(fileName);
      var content = await this.runtime.assets.fetchText(file);

      const hexArray = content.trim().split("\n").map(line => `#${line.trim()}`);
      console.log(hexArray);
      this.generateColorMapFromHexArray(hexArray);
    }

    async loadPaletteFromFile(fileName) {
      var file = await this.runtime.assets.getProjectFileUrl(fileName);
      var content = await this.runtime.assets.fetchText(file);
      const hexArray = content.trim().split("\n").map(line => `#${line.trim()}`);
      
      this.generateColorMapFromHexArray(hexArray);
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

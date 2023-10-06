// https://github.com/bgrins/TinyColor/blob/master/tinycolor.js

function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      this.colorMap = {};
      //example
      this.colorMap["red"] = {
        hex: "#ff0000",
        packed: 4278190335,
        rgb255: {r: 255,g: 0,b: 0, a: 255},     
        rgb: {r: 1,g: 0,b: 0, a: 1},
      };
    }

    NomalizeColorValue(color) {
      return color / 255;
    }

    DenormalizeColorValue(color) {
      return Math.floor(color * 255);
    }

    StoreRGB(tag, r, g, b, a) {
      this.colorMap[tag] = {
        hex: this.RGBToHex(r, g, b, a),
        packed: this.RGBToPacked(r, g, b, a),
        rgb255: {r: r, g: g, b: b, a: a},
        rgb: {
          r: this.NomalizeColorValue(r),
          g: this.NomalizeColorValue(g),
          b: this.NomalizeColorValue(b), 
          a: this.NomalizeColorValue(a)
        }
      };
    }

    StoreRGBNormal(tag, r, g, b, a) {
      this.colorMap[tag] = {
        hex: this.RGBNormalToHex(r, g, b, a),
        packed: this.RGBNormalToPacked(r, g, b, a),
        rgb: {r: r, g: g, b: b, a: a},
        rgb255: {
          r: this.DenormalizeColorValue(r),
          g: this.DenormalizeColorValue(g),
          b: this.DenormalizeColorValue(b), 
          a: this.DenormalizeColorValue(a)
        }
      };
    }

    StoreHex(tag, hex) {
      const rgb = this.HexToRGB(hex);
      this.colorMap[tag] = {
        hex: hex,
        packed: this.RGBToPacked(rgb.r, rgb.g, rgb.b, rgb.a),
        rgb: {
          r: this.NomalizeColorValue(rgb.r),
          g: this.NomalizeColorValue(rgb.g),
          b: this.NomalizeColorValue(rgb.b), 
          a: this.NomalizeColorValue(rgb.a)
        },
        rgb255: rgb
      };
    }

    StorePacked(tag, packed) {
      debugger;
      const rgb = this.PackedToRGB(packed);
      this.colorMap[tag] = {
        hex: this.RGBToHex(rgb.r, rgb.g, rgb.b, rgb.a),
        packed: packed,
        rgb: {
          r: this.NomalizeColorValue(rgb.r),
          g: this.NomalizeColorValue(rgb.g),
          b: this.NomalizeColorValue(rgb.b), 
          a: this.NomalizeColorValue(rgb.a)
        },
        rgb255: rgb
      };
    }

    NomalizeRBG(r, g, b, a) {
      return {
        r: this.NomalizeColorValue(r),
        g: this.NomalizeColorValue(g),
        b: this.NomalizeColorValue(b),
        a: this.NomalizeColorValue(a),
      };
    }

    DenormalizeRBG(r, g, b, a) {
      return {
        r: this.DenormalizeColorValue(r),
        g: this.DenormalizeColorValue(g),
        b: this.DenormalizeColorValue(b),
        a: this.DenormalizeColorValue(a),
      };
    }

    RGBNormalToHex(r, g, b, a) {
      const color = new C3.Color(r, g, b, a);
      return color.toHexString();
    }

    RGBToHex(r, g, b, a) {
      const color = new C3.Color(
        this.NomalizeColorValue(r), 
        this.NomalizeColorValue(g), 
        this.NomalizeColorValue(b), 
        this.NomalizeColorValue(a)
      );
      return color.toHexString();
    }

    HexToRGBNormal(hex) {
      const color = new C3.Color(0,0,0,0);
      color.parseHexString(hex);
      return {
        r: color.getR(), 
        g: color.getG(), 
        b: color.getB(), 
        a: color.getA()};
    }

    HexToRGB(hex) {
      const color = new C3.Color(0,0,0,0);
      color.parseHexString(hex);
      return {
        r: this.DenormalizeColorValue(color.getR()), 
        g: this.DenormalizeColorValue(color.getG()), 
        b: this.DenormalizeColorValue(color.getB()), 
        a: this.DenormalizeColorValue(color.getA())
      };
    }

    RGBToPacked(r, g, b, a) {
      const normalizedColor = this.NomalizeRBG(r, g, b, a);
      return C3.PackRGBAEx(
        normalizedColor.r, 
        normalizedColor.g, 
        normalizedColor.b, 
        normalizedColor.a
      );
    }

    RGBNormalToPacked(r, g, b, a) {
      return C3.PackRGBAEx(r, g, b, a);
    }

    PackedToRGBNormal(packed) {
      const r = C3.GetRValue(packed);
      const g = C3.GetGValue(packed);
      const b = C3.GetBValue(packed);
      const a = C3.GetAValue(packed);

      return {r: r, g: g, b: b, a: a};
    }

    PackedToRGB(packed) {
      const r = C3.GetRValue(packed);
      const g = C3.GetGValue(packed);
      const b = C3.GetBValue(packed);
      const a = C3.GetAValue(packed);

      return {
        r: this.DenormalizeColorValue(r), 
        g: this.DenormalizeColorValue(g), 
        b: this.DenormalizeColorValue(b), 
        a: this.DenormalizeColorValue(a)
      };
    }

    Hex(tag) {
      return this.colorMap[tag].hex;
    }

    Packed(tag) {
      return this.colorMap[tag].packed;
    }

    RGB(tag) {
      //todo: return "rbg(x,x,x)"
    }

    R(tag) {
      return this.colorMap[tag].rgb255.r;
    }

    G(tag) {
      return this.colorMap[tag].rgb255.g;
    }

    B(tag) {
      return this.colorMap[tag].rgb255.b;
    }

    A(tag) {
      return this.colorMap[tag].rgb255.a;
    }
    

    NormalR(tag) {
      return this.colorMap[tag].rgb.r;
    }

    NormalG(tag) {
      return this.colorMap[tag].rgb.g;
    }

    NormalB(tag) {
      return this.colorMap[tag].rgb.b;
    }

    NormalA(tag) {
      return this.colorMap[tag].rgb.a;
    }

    AsJSON() {
      return JSON.stringify(this.colorMap);
    }

    LoadJSON(json) {
      this.colorMap = JSON.parse(json);
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        colorMap: this.colorMap,
      };
    }

    LoadFromJson(o) {
      this.colorMap = o.colorMap;
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }
  };
}

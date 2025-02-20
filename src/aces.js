import { action, condition, expression } from "../template/aceDefine.js";
import palettes from "./runtime/palettes.js";

const general = "general";
const conversion = "conversion";
const loading = "loading";

// LoadColorsFromHexCodes
action(
  loading,
  "LoadColorsFromHexCodes",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Load colors from hex codes",
    displayText: "Load colors from hex codes [i]{0}[/i]",
    description: "Loads colors from hex codes",
    params: [
      {
        id: "hexCodes",
        name: "Hex Codes",
        desc: "A comma-separated list of hex codes",
        type: "string",
        initialValue: "#ff0000, #00ff00, #0000ff",
      },
    ],
  },
  function (hexCodes) {
    const hexArray = hexCodes.split(",");
    this.generateColorMapFromHexArray(hexArray);
  }
);

// LoadPalette
action(
  loading,
  "LoadPalette",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Load palette",
    displayText: "Load palette [i]{0}[/i]",
    description: "Loads a palette",
    params: [
      {
        id: "palette",
        name: "Palette",
        desc: "The palette you want to load",
        type: "combo",
        initialValue: "endesga-64.hex",
        items: palettes,
      },
    ],
  },
  async function (paletteIndex) {
    await this.loadPalette(paletteIndex);
  }
);

// Load Palette From File
action(
  loading,
  "LoadPaletteFromFile",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Load palette from file",
    displayText: "Load palette from file [i]{0}[/i]",
    description: "Loads a palette from a file",
    params: [
      {
        id: "fileName",
        name: "File Name",
        desc: "The name of the file you want to load from project files (ends in .hex), you can find palettes in https://lospec.com",
        type: "projectfile",
        filter: ".hex",
        //initialValue: "endesga-64.hex",
      },
    ],
  },
  async function (fileName) {
    if (!fileName.endsWith(".hex")) {
      console.error("File must end in .hex");
      return;
    }

    await this.loadPaletteFromFile(fileName);
  }
);

//Load Palette From String
action(
  loading,
  "LoadPaletteFromFileName",
  {
    highlight: false,
    deprecated: false,
    isAsync: true,
    listName: "Load palette from filename",
    displayText: "Load palette from filename [i]{0}[/i]",
    description: "Loads a palette from a string",
    params: [
      {
        id: "palette",
        name: "Palette",
        desc: "The palette name of the palette file you want to load",
        type: "string",
        initialValue: "\"endesga-64.hex\"",
      },
    ],
  },
  async function (palette) {
    if (!palette.endsWith(".hex")) {
      console.error("File must end in .hex");
      return;
    }

    await this.loadPaletteFromFile(palette);
  }
);

// ClearColorStore
action(
  loading,
  "ClearColors",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Clear color store",
    displayText: "Clear color store",
    description: "Clears the color store",
    params: [],
  },
  function () {
    this.clearColorMap();
  }
)

// SetColorPacked
action(
  general,
  "SetColorPacked",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set color (packed)",
    displayText: "Set color [i]{0}[/i] to [i]{1}[/i]",
    description: "Sets the color",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
        initialValue: "",
      },
      {
        id: "color",
        name: "Color",
        desc: "The color value (0-100) you want to set",
        type: "number",
        initialValue: "0",
      }
    ],
  },
  function (tag, color) {
    const rgb = this.packedColorToRGB(color);
    this.colorMap[tag] = {
      hex: this.rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a),
      packed: packed,
      rgb: {
        r: this.normalizeColor(rgb.r),
        g: this.normalizeColor(rgb.g),
        b: this.normalizeColor(rgb.b),
        a: this.normalizeColor(rgb.a),
      },
      rgb255: rgb,
      hsla: this.rgbToHLSA(rgb.r, rgb.g, rgb.b, rgb.a),
    }
  },
  true
);

// SetColorHex
action(
  general,
  "SetColorHex",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set color (hex)",
    displayText: "Set color [i]{0}[/i] to [i]{1}[/i]",
    description: "Sets the color",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
        initialValue: "",
      },
      {
        id: "color",
        name: "Color",
        desc: "The color value (hex) you want to set",
        type: "string",
        initialValue: "\"#ffffff\"",
      }
    ],
  },
  function (tag, hex) {
    const rgb = this.hexToRGB(hex);
    this.colorMap[tag] = {
      hex: hex,
      packed: this.rgbToPacked(rgb.r, rgb.g, rgb.b, rgb.a),
      rgb: {
        r: this.normalizeColor(rgb.r),
        g: this.normalizeColor(rgb.g),
        b: this.normalizeColor(rgb.b),
        a: this.normalizeColor(rgb.a),
      },
      rgb255: rgb,
      hsla: this.rgbToHLSA(rgb.r, rgb.g, rgb.b, rgb.a),
    }
  },
  true
);

// SetColorRGB
action(
  general,
  "SetColorRGB",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set color (rgb)",
    displayText: "Set color [i]{0}[/i] to rgba255([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
    description: "Sets the color",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
        initialValue: "",
      },
      {
        id: "r",
        name: "Red",
        desc: "The red value (0-255) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "g",
        name: "Green",
        desc: "The green value (0-255) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "b",
        name: "Blue",
        desc: "The blue value (0-255) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "a",
        name: "Alpha",
        desc: "The alpha value (0-255) you want to set",
        type: "number",
        initialValue: "255",
      }
    ],
  },
  function (tag, r, g, b, a) {
    this.colorMap[tag] = {
      hex: this.rgbToHex(r, g, b, a),
      packed: this.rgbToPacked(r, g, b, a),
      rgb255: {r: r, g: g, b: b, a: a},
      rgb: {
        r: this.normalizeColor(r),
        g: this.normalizeColor(g),
        b: this.normalizeColor(b), 
        a: this.normalizeColor(a)
      },
      hsla: this.rgbToHLSA(r, g, b, a)
    };
  },
  true
);

// SetColorRGBNormal
action(
  general,
  "SetColorRGBNormal",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set color (rgb normalized)",
    displayText: "Set color [i]{0}[/i] to rgba([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
    description: "Sets the color",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
        initialValue: "",
      },
      {
        id: "r",
        name: "Red",
        desc: "The red value (0-1) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "g",
        name: "Green",
        desc: "The green value (0-1) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "b",
        name: "Blue",
        desc: "The blue value (0-1) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "a",
        name: "Alpha",
        desc: "The alpha value (0-1) you want to set",
        type: "number",
        initialValue: "1",
      }
    ],
  },
  function (tag, r, g, b, a) {
    const rgb = this.denormalizeRGBA(r, g, b, a);
    this.colorMap[tag] = {
      hex: this.rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a),
      packed: this.rgbToPacked(rgb.r, rgb.g, rgb.b, rgb.a),
      rgb255: rgb,
      rgb: {r: r,g: g,b: b, a: a},
      hsla: this.rgbToHLSA(rgb.r, rgb.g, rgb.b, rgb.a)
    };
  },
  true
);

// SetColorHSL
action(
  general,
  "SetColorHSL",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set color (hsl)",
    displayText: "Set color [i]{0}[/i] to hsla([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
    description: "Sets the color",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
        initialValue: "",
      },
      {
        id: "h",
        name: "Hue",
        desc: "The hue value (0-360) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "s",
        name: "Saturation",
        desc: "The saturation value (0-100) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "l",
        name: "Lightness",
        desc: "The lightness value (0-100) you want to set",
        type: "number",
        initialValue: "0",
      },
      {
        id: "a",
        name: "Alpha",
        desc: "The alpha value (0-255) you want to set",
        type: "number",
        initialValue: "255",
      }
    ],
  },
  function (tag,h,s,l,a) {
    const rgb = this.hlsaToRGB(h, s, l, a);
    this.colorMap[tag] = {
      hex: this.rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a),
      packed: this.rgbToPacked(rgb.r, rgb.g, rgb.b, rgb.a),       
      rgb: {
        r: this.normalizeColor(rgb.r),
        g: this.normalizeColor(rgb.g),
        b: this.normalizeColor(rgb.b), 
        a: this.normalizeColor(rgb.a)
      },
      rgb255: rgb,
      hsla: { h: h, s: s, l: l, a: a }
    };
  },
  true
);

// Hex
expression(
  general,
  "Hex",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the color as a hex string",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].hex;
  }
);

expression(
  general,
  "Packed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color as a packed number",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].packed;
  }
);

// Red
expression(
  general,
  "Red",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's red value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb255.r;
  }
);

// Green
expression(
  general,
  "Green",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's green value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb255.g;
  }
);

// Blue
expression(
  general,
  "Blue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's blue value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb255.b;
  }
);

// Alpha
expression(
  general,
  "Alpha",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's alpha value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb255.a;
  }
);

// Normalized Red
expression(
  general,
  "NormalizedREd",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's red value (normalized)",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb.r;
  }
);

// Normalized Green
expression(
  general,
  "NormalizedGreen",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's green value (normalized)",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb.g;
  }
);

// Normalized Blue
expression(
  general,
  "NormalizedBlue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's blue value (normalized)",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb.b;
  }
);

// Normalized Alpha
expression(
  general,
  "NormalizedAlpha",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's alpha value (normalized)",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].rgb.a;
  }
);

// Hue
expression(
  general,
  "Hue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's hue value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].hsla.h;
  }
);

// Saturation
expression(
  general,
  "Saturation",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's saturation value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].hsla.s;
  }
);

// Lightness
expression(
  general,
  "Lightness",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's lightness value",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    return this.colorMap[tag].hsla.l;
  }
);

expression(
  general,
  "GetColorJson",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the color's value as JSON",
    params: [
      {
        id: "tag",
        name: "Tag",
        desc: "The tag that will be used to reference the color",
        type: "string",
      },
    ],
  },
  function (tag) {
    const json = JSON.stringify(this.colorMap[tag]);
    return json;
  }
);

// PickRandomColor
expression(
  general,
  "RandomColor",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns a random color tag the color store",
    params: [],
  },
  function () {
    const keys = Object.keys(this.colorMap);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
  }
);

// Conversions

// RGB to Hex
expression(
  conversion,
  "RGBToHex",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Converts RGB to Hex",
    params: [
      {
        id: "r",
        name: "Red",
        desc: "The red value (0-255)",
        type: "number",
      },
      {
        id: "g",
        name: "Green",
        desc: "The green value (0-255)",
        type: "number",
      },
      {
        id: "b",
        name: "Blue",
        desc: "The blue value (0-255)",
        type: "number",
      },
      {
        id: "a",
        name: "Alpha",
        desc: "The alpha value (0-255)",
        type: "number",
      },
    ],
  },
  function (r, g, b, a) {
    return this.rgbToHex(r, g, b, a);
  }
);

//Hex to RGB String (r,g,b,a)
expression(
  conversion,
  "HexToRGB",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Converts Hex to RGB String '(r,g,b,a)'",
    params: [
      {
        id: "hex",
        name: "Hex",
        desc: "The hex value",
        type: "string",
      },
    ],
  },
  function (hex) {
    const rgb = this.hexToRGB(hex);
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
  }
);

// Hex to PackedEX 
expression(
  conversion,
  "HexToPacked",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Converts Hex to Packed Color",
    params: [
      {
        id: "hex",
        name: "Hex",
        desc: "The hex value",
        type: "string",
      },
    ],
  },
  function (hex) {
    const rgb = this.hexToRGB(hex);
    return this.rgbToPacked(rgb.r, rgb.g, rgb.b, rgb.a);
  }
);

// Get Color Store JSON
expression(
  general,
  "GetColorStoreJSON",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the entire color store as JSON",
    params: [],
  },
  function () {
    return JSON.stringify(this.colorMap);
  }
); 

// CurrentPalette
expression(
  general,
  "CurrentPalette",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the current palette",
    params: [],
  },
  function () {
    return this.currentPalette;
  }
);


// Color Count
expression(
  general,
  "ColorCount",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the number of colors in the color store",
    params: [],
  },
  function () {
    return Object.keys(this.colorMap).length;
  }
)

expression(
  general,
  "HexIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the color as a hex string",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].hex;
  }
);

expression(
  general,
  "PackedIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color as a packed number",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].packed;
  }
);

expression(
  general,
  "RedIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's red value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb255.r;
  }
);

expression(
  general,
  "GreenIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's green value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb255.g;
  }
);

expression(
  general,
  "BlueIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's blue value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb255.b;
  }
);

expression(
  general,
  "AlphaIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's alpha value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    return this.colorMap[keys[index]].rgb255.a;
  }
);

expression(
  general,
  "NormalizedRedIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's red value (normalized)",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb.r;
  }
);

expression(
  general,
  "NormalizedGreenIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's green value (normalized)",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb.g;
  }
);

expression(
  general,
  "NormalizedBlueIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's blue value (normalized)",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb.b;
  }
);

expression(
  general,
  "NormalizedAlphaIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's alpha value (normalized)",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].rgb.a;
  }
);

expression(
  general,
  "HueIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's hue value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].hsla.h;
  }
);

expression(
  general,
  "SaturationIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's saturation value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].hsla.s;
  }
);

expression(
  general,
  "LightnessIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Returns the color's lightness value",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    return this.colorMap[keys[index]].hsla.l;
  }
);

expression(
  general,
  "GetColorJsonIndexed",
  {
    highlight: false,
    deprecated: false,
    returnType: "string",
    description: "Returns the color's value as JSON",
    params: [
      {
        id: "index",
        name: "Index",
        desc: "The index that will be used to reference the color",
        type: "number"
      },
    ],
  },
  function (index) {
    const keys = Object.keys(this.colorMap);
    if (index >= keys.length) {
      console.warn("Index out of bounds, return first color");
      index = 0;
    }
    const json = JSON.stringify(this.colorMap[keys[index]]);
    return json;
  }
);

condition(
  general,
  "CurrentPaletteIs",
  {
    highlight: false,
    deprecated: false,
    listName: "Current palette is",
    displayText: "Current palette is [i]{0}[/i]",
    description: "Checks if the current palette is the specified palette",
    params: [
      {
        id: "palette",
        name: "Palette",
        desc: "The palette you want to check (don't include .hex)",
        type: "string",
        initialValue: "\"endesga-64\"",
        autocompleteId: "paletteName",
      },
    ],
  },
  function (palette) {
    return this.currentPalette === palette;
  }
);
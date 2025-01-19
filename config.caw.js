import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.PLUGIN;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "piranha305_colorstore";
export const name = "Color Store";
export const version = _version;
export const author = "piranha305";
export const website = "https://piranha305.itch.io/";
export const documentation = "https://www.construct.net/en/make-games/addons/1372/colorstore/documentation";
export const description = "A plugin that allows you manage database of colors. easily convert between different color formats and use existing color palettes.";
export const category = ADDON_CATEGORY.DATA_AND_STORAGE;

export const hasDomside = false;
export const files = {
  extensionScript: {},
  fileDependencies: [
    { "filename": "31.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "aap-64.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "apollo.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "barren-equinox.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "beach-day-15.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "blk-neo.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "cc-29.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "cereal-years.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "chalking-fluently.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "chaotic-neutral.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "chasm.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "claude-monet-12.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "cmyk-douce.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "dawnbringer-32.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "endesga-64.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "fallen31.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "famicube.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "fantasy-24.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "flat-color-updated.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "fleja-master-palette.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "foggy-nature.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "galeth-100.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "hofner-dawn.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "jehkoba64.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "journey.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "juicyfruit-16.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "lospec500.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "lux2k.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "marmuuu.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "matt36.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "mulfok32.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "na16.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "neon-space.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "nintendo-entertainment-system.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "paletaoscuradegoya.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "paper-garden.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "pear36.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "petrichor.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "pico-8.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "pineapple-32.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "pumpkin-patch-13.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "qameboy.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "rakichrome-58.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "redorb12.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "resurrect-64.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "retrocal-8.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "rewild-64.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "rgbg-36.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "rosy-42.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "sage57.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "samey-12.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "sara-98c.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "sorbet-special.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "spectral-16.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "spica-72.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "sweet-and-sour-20.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "sweetie-16.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "twilioquest-76.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "undernight-20.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "vinik24.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "waft.hex", "type": "copy-to-output", fileType: "text/plain" },
    { "filename": "zughy-32.hex", "type": "copy-to-output", fileType: "text/plain" }
  ],
};

// categories that are not filled will use the folder name
export const aceCategories = {
  general: "General",
  conversion: "Conversion",
  loading: "Loading",
};

export const info = {
  // icon: "icon.svg",
  // PLUGIN world only
  // defaultImageUrl: "default-image.png",
  Set: {
    // COMMON to all
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,

    // BEHAVIOR only
    IsOnlyOneAllowed: false,

    // PLUGIN world only
    IsResizable: false,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,

    // PLUGIN object only
    IsSingleGlobal: true,
  },
  // PLUGIN only
  AddCommonACEs: {
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

export const properties = [];

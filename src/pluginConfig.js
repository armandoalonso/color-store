// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
module.exports = {
  addonType: "plugin",
  id: "piranha305_colorstore",
  name: "Color Store",
  version: "1.0.0.0",
  category:
    // "3d",
    "data-and-storage",
    // "form-controls",
    // "input",
    // "media",
    // "monetisation",
    // "platform-specific",
    // "web",
    // "other"
    // "general",
  author: "piranha305",
  website: "https://www.construct.net",
  documentation: "https://github.com/armandoalonso/color-store#readme",
  description: "A database for storing and retrieving colors",
  // addonUrl: "https://www.construct.net/en/make-games/addons/####/XXXX", // displayed in auto-generated docs
  // githubUrl: "https://github.com/skymen/XXXX", // displays latest release version in auto-generated docs
  // icon: "icon.svg", // defaults to "icon.svg" if omitted
  type: "object",   // world, object, dom
  domSideScripts: [
    // "domSide.js", // no need to include "c3runtime/" prefix
  ],
  fileDependencies: [
    /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
  ],
  info: {
    // world only
    defaultImageUrl: null,
    Set: {
      // world only
      IsResizable: false,
      IsRotatable: false,
      Is3D: false,
      HasImage: false,
      IsTiled: false,
      SupportsZElevation: false,
      SupportsColor: false,
      SupportsEffects: false,
      MustPreDraw: false,

      // object only
      IsSingleGlobal: true,

      // world and object
      CanBeBundled: true,
      IsDeprecated: false,
      GooglePlayServicesEnabled: false,
    },
    AddCommonACEs: {
      // world only
      Position: false,
      SceneGraph: false,
      Size: false,
      Angle: false,
      Appearance: false,
      ZOrder: false,
    },
  },
  properties: [
    /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "color"
        "object"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type object only
        // allowedPluginIds: ["Sprite", "<world>"],

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
  ],
  aceCategories: {
    // follows the format id: langName
    // in the ACEs refer to categories using the id, not the name
    general: "General",
  },
  Acts: {
    SetColorPacked: {
      category: "general",
      forward: "StorePacked",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
        {
          id: "color",
          name: "Color",
          desc: "The color value (0-100) you want to set",
          type: "number",
          value: "0",
        },
      ],
      listName: "Set color (packed)",
      displayText: "Set color [i]{0}[/i] to [i]{1}[/i]",
      description: "Sets the color",
    },
    SetColorHex: {
      category: "general",
      forward: "StoreHex",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
        {
          id: "color",
          name: "Color",
          desc: "The color value (hex) you want to set",
          type: "string",
          value: "",
        },
      ],
      listName: "Set color (hex)",
      displayText: "Set color [i]{0}[/i] to [i]{1}[/i]",
      description: "Sets the color",
    },
    SetColorRGB: {
      category: "general",
      forward: "StoreRGB",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
        {
          id: "r",
          name: "Red",
          desc: "The red value (0-255) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "g",
          name: "Green",
          desc: "The green value (0-255) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "b",
          name: "Blue",
          desc: "The blue value (0-255) you want to set",
          type: "number",
          value: "0",
        },
        {
            id: "a",
            name: "Alpha",
            desc: "The alpha value (0-255) you want to set",
            type: "number",
            value: "255",
        }
      ],
      listName: "Set color (rgb)",
      displayText: "Set color [i]{0}[/i] to rgba255([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
      description: "Sets the color",
    },
    SetColorRBGNormal: {
      category: "general",
      forward: "StoreRGBNormal",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
        {
          id: "r",
          name: "Red",
          desc: "The red value (0-1) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "g",
          name: "Green",
          desc: "The green value (0-1) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "b",
          name: "Blue",
          desc: "The blue value (0-1) you want to set",
          type: "number",
          value: "0",
        },
        {
            id: "a",
            name: "Alpha",
            desc: "The alpha value (0-1) you want to set",
            type: "number",
            value: "1",
        }
      ],
      listName: "Set color (rgb normalized)",
      displayText: "Set color [i]{0}[/i] to rgba([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
      description: "Sets the color",
    },
    SetColorHSL: {
      category: "general",
      forward: "StoreHSL",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
        {
          id: "h",
          name: "Hue",
          desc: "The hue value (0-360) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "s",
          name: "Saturation",
          desc: "The saturation value (0-100) you want to set",
          type: "number",
          value: "0",
        },
        {
          id: "l",
          name: "Lightness",
          desc: "The lightness value (0-100) you want to set",
          type: "number",
          value: "0",
        },
        {
            id: "a",
            name: "Alpha",
            desc: "The alpha value (0-255) you want to set",
            type: "number",
            value: "255",
        }
      ],
      listName: "Set color (hsl)",
      displayText: "Set color [i]{0}[/i] to hsla([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
      description: "Sets the color",
    },
    LoadJSON: {
      category: "general",
      forward: "LoadJSON",
      params: [
        {
          id: "json",
          name: "JSON",
          desc: "The JSON string you want to load",
          type: "string",
          value: "",
        },
      ],
      listName: "Load JSON",
      displayText: "Load JSON [i]{0}[/i]",
      description: "Loads the JSON string",
    },
    
    /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
  },
  Cnds: {
    /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      displayText: "Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
  },
  Exps: {
    Hex: {
      category: "general",
      forward: "Hex",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "string",
      description: "Returns the color as a hex string",
    },
    Packed: {
      category: "general",
      forward: "Packed",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color as a packed number",
    },
    R:{
      category: "general",
      forward: "R",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's red value",
    },
    G:{
      category: "general",
      forward: "G",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's green value",
    },
    B: {
      category: "general",
      forward: "B",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's blue value",
    },
    A : {
      category: "general",
      forward: "A",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the color",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's alpha value",
    },
    NormalR: {
      category: "general",
      forward: "NormalR",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the normal's red value",
    },
    NormalG: {
      category: "general",
      forward: "NormalG",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the normal's green value",
    },
    NormalB: {
      category: "general",
      forward: "NormalB",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the normal's blue value",
    },
    NormalA: {
      category: "general",
      forward: "NormalA",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the normal's alpha value",
    },
    Hue: {
      category: "general",
      forward: "Hue",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's hue value",
    },
    Saturation: {
      category: "general",
      forward: "Saturation",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's saturation value",
    },
    Lightness: {
      category: "general",
      forward: "Lightness",
      params: [
        {
          id: "tag",
          name: "Tag",
          desc: "The tag that will be used to reference the normal",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Returns the color's lightness value",
    },
    AsJSON: {
      category: "general",
      forward: "AsJSON",
      params: [],
      returnType: "string",
      description: "Returns the color as a JSON string",
    },
    /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
  },
};

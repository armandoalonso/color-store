<img src="./examples/cover.png" width="150" /><br>
# Color Store
### Version 3.0.0.5

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/armandoalonso/color-store/releases/download/piranha305_colorstore-3.0.0.5.c3addon/piranha305_colorstore-3.0.0.5.c3addon)
<br>
<sub> [See all releases](https://github.com/armandoalonso/color-store/releases) </sub> <br>

---
A plugin that allows you manage database of colors. easily convert between different color formats and use existing color palettes. <br>
<b><u>Author:</u></b> piranha305 <br>
<b><u>Website:</u></b> https://piranha305.itch.io/ <br>
<b><u>Addon Url:</u></b> https://www.construct.net/en/make-games/addons/1372/colorstore <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files
- [color-store-example](./examples/color-store-example.c3p)
</br>
<img src="./examples/color-store-example.gif" width="200" />
</br>
</br>

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Set color (hex) | Sets the color | Tag             *(string)* <br>Color             *(string)* <br> |
| Set color (hsl) | Sets the color | Tag             *(string)* <br>Hue             *(number)* <br>Saturation             *(number)* <br>Lightness             *(number)* <br>Alpha             *(number)* <br> |
| Set color (packed) | Sets the color | Tag             *(string)* <br>Color             *(number)* <br> |
| Set color (rgb) | Sets the color | Tag             *(string)* <br>Red             *(number)* <br>Green             *(number)* <br>Blue             *(number)* <br>Alpha             *(number)* <br> |
| Set color (rgb normalized) | Sets the color | Tag             *(string)* <br>Red             *(number)* <br>Green             *(number)* <br>Blue             *(number)* <br>Alpha             *(number)* <br> |
| Clear color store | Clears the color store |  |
| Load colors from hex codes | Loads colors from hex codes | Hex Codes             *(string)* <br> |
| Load palette | Loads a palette | Palette             *(combo)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| HexToPacked | Converts Hex to Packed Color | number | Hex *(string)* <br> | 
| HexToRGB | Converts Hex to RGB String '(r,g,b,a)' | string | Hex *(string)* <br> | 
| RGBToHex | Converts RGB to Hex | string | Red *(number)* <br>Green *(number)* <br>Blue *(number)* <br>Alpha *(number)* <br> | 
| Alpha | Returns the color's alpha value | number | Tag *(string)* <br> | 
| Blue | Returns the color's blue value | number | Tag *(string)* <br> | 
| CurrentPalette | Returns the current palette | string |  | 
| GetColorJson | Returns the color's value as JSON | string | Tag *(string)* <br> | 
| GetColorStoreJSON | Returns the entire color store as JSON | string |  | 
| Green | Returns the color's green value | number | Tag *(string)* <br> | 
| Hex | Returns the color as a hex string | string | Tag *(string)* <br> | 
| Hue | Returns the color's hue value | number | Tag *(string)* <br> | 
| Lightness | Returns the color's lightness value | number | Tag *(string)* <br> | 
| NormalizedAlpha | Returns the color's alpha value (normalized) | number | Tag *(string)* <br> | 
| NormalizedBlue | Returns the color's blue value (normalized) | number | Tag *(string)* <br> | 
| NormalizedGreen | Returns the color's green value (normalized) | number | Tag *(string)* <br> | 
| NormalizedREd | Returns the color's red value (normalized) | number | Tag *(string)* <br> | 
| Packed | Returns the color as a packed number | number | Tag *(string)* <br> | 
| RandomColor | Returns a random color tag the color store | string |  | 
| Red | Returns the color's red value | number | Tag *(string)* <br> | 
| Saturation | Returns the color's saturation value | number | Tag *(string)* <br> | 

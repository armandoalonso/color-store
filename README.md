<img src="./examples/cover.png" width="150" /><br>
# Color Store <br>
A database for storing and retrieving colors <br>
<br>
Author: piranha305 <br>
<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>

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
node ./build.js
```

To run the dev server, run

```
npm i
node ./dev.js
```

The build uses the pluginConfig file to generate everything else.
The main files you may want to look at would be instance.js and scriptInterface.js

## Examples Files
- [piranha305_color-store](./examples/piranha305_color-store.c3p)
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
| Set color (packed) | Sets the color | Tag             *(string)* <br>Color             *(number)* <br> |
| Set color (hex) | Sets the color | Tag             *(string)* <br>Color             *(string)* <br> |
| Set color (rgb) | Sets the color | Tag             *(string)* <br>Red             *(number)* <br>Green             *(number)* <br>Blue             *(number)* <br>Alpha             *(number)* <br> |
| Set color (rgb normalized) | Sets the color | Tag             *(string)* <br>Red             *(number)* <br>Green             *(number)* <br>Blue             *(number)* <br>Alpha             *(number)* <br> |
| Set color (hsl) | Sets the color | Tag             *(string)* <br>Hue             *(number)* <br>Saturation             *(number)* <br>Lightness             *(number)* <br>Alpha             *(number)* <br> |
| Load JSON | Loads the JSON string | JSON             *(string)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| Hex | Returns the color as a hex string | string | Tag *(string)* <br> | 
| Packed | Returns the color as a packed number | number | Tag *(string)* <br> | 
| R | Returns the color's red value | number | Tag *(string)* <br> | 
| G | Returns the color's green value | number | Tag *(string)* <br> | 
| B | Returns the color's blue value | number | Tag *(string)* <br> | 
| A | Returns the color's alpha value | number | Tag *(string)* <br> | 
| NormalR | Returns the normal's red value | number | Tag *(string)* <br> | 
| NormalG | Returns the normal's green value | number | Tag *(string)* <br> | 
| NormalB | Returns the normal's blue value | number | Tag *(string)* <br> | 
| NormalA | Returns the normal's alpha value | number | Tag *(string)* <br> | 
| Hue | Returns the color's hue value | number | Tag *(string)* <br> | 
| Saturation | Returns the color's saturation value | number | Tag *(string)* <br> | 
| Lightness | Returns the color's lightness value | number | Tag *(string)* <br> | 
| AsJSON | Returns the color as a JSON string | string |  | 

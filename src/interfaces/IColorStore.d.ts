declare interface IColor {
    hex: string;
    packed: number;
    rgb255: { r: number; g: number; b: number; a: number };
    rgb: { r: number; g: number; b: number; a: number };
    hsla: { h: number; s: number; l: number; a: number };
} 

declare interface ColorMap {
    [key: string]: IColor;
}

declare class IColorStoreInstance {
    // instance js
    colorMap: ColorMap;
    currentPalette: string;
    loadPaletteFromFile(paletteName: string): Promise<void>;
    clearColorMap(): void;
    generateColorMapFromHexArray(hexArray: string[]): void;
    colorIndex(tag: string): number;
    colorTag(index: number): string;
    packedColorToRGB(packed: number): { r: number; g: number; b: number; a: number };
    rgbToPacked(r: number, g: number, b: number, a: number): number;
    rgbToHex(r: number, g: number, b: number, a: number): string;
    hexToRGB(hex: string): { r: number; g: number; b: number; a: number };
    normalizeColor(color: number): number;
    denormalizeColor(color: number): number;
    normalizeRGBA(r: number, g: number, b: number, a: number): { r: number; g: number; b: number; a: number };
    denormalizeRGBA(r: number, g: number, b: number, a: number): { r: number; g: number; b: number; a: number };
    rgbToHLSA(r: number, g: number, b: number, a: number): { h: number; s: number; l: number; a: number };
    hlsaToRGB(h: number, s: number, l: number, a: number): { r: number; g: number; b: number; a: number };

    // Actions
    LoadColorsFromHexCodes(hexCodes: string): void;
    LoadPalette(paletteIndex: number): Promise<void>;
    LoadPaletteFromFile(fileName: string): Promise<void>;
    LoadPaletteFromFileName(palette: string): Promise<void>;
    ClearColors(): void;
    SetColorPacked(tag: string, color: number): void;
    SetColorHex(tag: string, hex: string): void;
    SetColorRGB(tag: string, r: number, g: number, b: number, a: number): void;
    SetColorRGBNormal(tag: string, r: number, g: number, b: number, a: number): void;
    SetColorHSL(tag: string, h: number, s: number, l: number, a: number): void;

    // Expressions
    Hex(tag: string): string;
    Packed(tag: string): number;
    Red(tag: string): number;
    Green(tag: string): number;
    Blue(tag: string): number;
    Alpha(tag: string): number;
    NormalizedRed(tag: string): number;
    NormalizedGreen(tag: string): number;
    NormalizedBlue(tag: string): number;
    NormalizedAlpha(tag: string): number;
    Hue(tag: string): number;
    Saturation(tag: string): number;
    Lightness(tag: string): number;
    GetColorJson(tag: string): string;
    RandomColor(): string;
    RGBToHex(r: number, g: number, b: number, a: number): string;
    HexToRGB(hex: string): string;
    HexToPacked(hex: string): number;
    GetColorStoreJSON(): string;
    CurrentPalette(): string;
    ColorCount(): number;
    HexIndexed(index: number): string;
    PackedIndexed(index: number): number;
    RedIndexed(index: number): number;
    GreenIndexed(index: number): number;
    BlueIndexed(index: number): number;
    AlphaIndexed(index: number): number;
    NormalizedRedIndexed(index: number): number;
    NormalizedGreenIndexed(index: number): number;
    NormalizedBlueIndexed(index: number): number;
    NormalizedAlphaIndexed(index: number): number;
    HueIndexed(index: number): number;
    SaturationIndexed(index: number): number;
    LightnessIndexed(index: number): number;
    GetColorJsonIndexed(index: number): string;

    // Conditions
    CurrentPaletteIs(palette: string): boolean;
}

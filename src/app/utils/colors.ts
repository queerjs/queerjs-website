export function RGBToHSL(r: any, g: any, b: any) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) {
    h += 360;
  }

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

export function hexToRGB(h: string) {
  let r = "0";
  let g = "0";
  let b = "0";

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return [r, g, b];
}

export function hslString(h: number, s: number, l: number) {
  return "hsl(" + h + "," + s + "%," + l + "%)";
}

export function toPastel(hex: string) {
  return [hex]
    .map(hexToRGB)
    .map(([r, g, b]) => RGBToHSL(r, g, b))
    .map(([h, s, l]) =>
      hslString(
        h as number,
        (s as number) * 0.9,
        (l as number) + (100 - (l as number)) * 0.2,
      ),
    )[0];
}

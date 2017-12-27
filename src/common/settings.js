import { emCalc } from "./helpers";
/**
 *  Screen Sizes
 */
export const LARGE_SCREEN = `all and (max-width : ${emCalc(1550)})`;
export const TABLET = `all and (max-width : ${emCalc(1024)}),
    only screen and (min-device-width: ${emCalc(768)})
    and (max-device-width: ${emCalc(1024)})
    and (max-device-width: ${emCalc(1366)})
    and (-webkit-min-device-pixel-ratio: 1.5)`;
export const TABLET_HORIZONTAL_SCREEN = `all and (max-width : ${emCalc(1024)}),
    only screen and (min-device-width: ${emCalc(768)})
    and (max-device-width: ${emCalc(1024)})
    and (max-device-width: ${emCalc(1366)})
    and (orientation: landscape)
    and (-webkit-min-device-pixel-ratio: 1.5)`;

export const TABLET_VERTICAL_SCREEN = `all and (max-width: ${emCalc(768)}),
    only screen and (min-device-width: ${emCalc(768)})
    and (max-device-width: ${emCalc(1024)})
    and (max-device-width: ${emCalc(1366)})
    and (orientation: portrait)
    and (-webkit-min-device-pixel-ratio: 1.5)`;

export const MOBILE_SCREEN = `all and (max-width: ${emCalc(415)})`;

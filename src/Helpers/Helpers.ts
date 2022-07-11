export function componentToHex(c: any) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: any, g: any, b: any) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function hexToRgbString(hex: string): string {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
        : '';
}

export function convert12HourTo24HrsFormat(time: any) {
    const slicedTime = time.split(/(PM|AM)/gm)[0];

    let [hours, minutes] = slicedTime.split(':');

    if (hours === '12') {
        hours = '00';
    }
    let updateHourAndMin;

    function addition(hoursOrMin: string | any[]) {
        updateHourAndMin =
            hoursOrMin.length < 2
                ? (hoursOrMin = `${0}${hoursOrMin}`)
                : hoursOrMin;

        return updateHourAndMin;
    }

    if (time.endsWith('PM')) {
        hours = parseInt(hours, 10) + 12;
    }
    return `${addition(hours)}:${addition(minutes)}`;
}
//用于解决浮点数运算问题
export const toFixed = (num: number, digit: number = 3) => {
    const scale = 10 ** digit;
    return Math.floor(num * scale) / scale;
}
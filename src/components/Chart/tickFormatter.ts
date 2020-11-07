export const iTickFormatter = (maxValue: number) => (value: any) => {
    if (value === 0) {
        return value;
    }
    if (value % 1000 === 0) {
        return `${value / 10000}k`;
    }
    if (value === maxValue) {
        if (maxValue / 100000 > 0) {
            return `${value / 10000}k`;
        } else if (maxValue / 10000 > 0) {
            return `${value / 1000}k`;
        }
    }
    return value;
};

export const cTickFormatter = (maxValue: number) => (value: any) => {
    if (value === 0) {
        return value;
    }
    if (value % 10000 === 0) {
        return `${value / 1000}k`;
    }
    if (value === maxValue && (maxValue / 10000 > 0 || maxValue / 1000 > 0)) {
        return `${value / 1000}k`;
    }
    return value;
};

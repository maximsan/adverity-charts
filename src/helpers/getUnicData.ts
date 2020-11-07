export const getUnicData = <T extends {}>(data: T, field: string) => {
    return [...(new Set((data as any).map((dataItem: { [x: string]: any }) => dataItem[field])) as any)].slice(1);
};

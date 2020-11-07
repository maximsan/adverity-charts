import { AdData } from '../types';

export function parseCSV(file: string): AdData[] {
    return file
        .split('\n')
        .slice(1, 400)
        .reduce<AdData[]>((accum, value) => {
            let map: AdData;
            const values = value.split(',');

            map = {
                date: values[0],
                dataSource: values[1],
                campaign: values[2],
                clicks: values[3],
                impressions: values[4],
            };

            return [...accum, map];
        }, []);
}

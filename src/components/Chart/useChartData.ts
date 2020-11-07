import { useEffect, useState } from 'react';
import { AdData } from '../../types';
import { getUnicData } from '../../helpers/getUnicData';
import { FilterKey } from '../../shared/types';
import _ from 'lodash';

export type UseChartData = (data?: AdData[]) => { chartData: AdData[]; clicksMax?: number; impressionsMax?: number };

export const useChartData: UseChartData = (data) => {
    const [chartData, setChartData] = useState();
    const [clicksMax, setClicksMax] = useState<number | undefined>(undefined);
    const [impressionsMax, setImpressionsMax] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (data?.length) {
            createChartData(data);
        }
    }, [data]);

    const createChartData = (data: AdData[]) => {
        const clicks = getUnicData(data, FilterKey.CLICKS).map((v) => parseInt(v));
        const maxClicks = _.max(clicks);
        const roundMaxClicks = _.round(maxClicks! + 0.01 * maxClicks!);
        setClicksMax(roundMaxClicks);

        const impressions = getUnicData(data, FilterKey.IMPRESSIONS).map((v) => parseInt(v));
        const maxImpressions = _.max(impressions);
        const roundMaxImpressions = _.round(maxImpressions! + 0.01 * maxImpressions!);
        setImpressionsMax(roundMaxImpressions);

        const chartData = data.map(({ date, clicks, impressions }) => {
            return {
                name: date,
                c: clicks,
                i: impressions,
            };
        });

        setChartData(chartData);
    };

    return { chartData, clicksMax, impressionsMax };
};

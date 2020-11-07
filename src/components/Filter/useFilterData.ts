import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { AdData } from '../../types';
import { Option } from '../MultiSelect/MultiSelect';
import { AllOption } from '../../shared/constants';

export type UseFilterData = (data: AdData[]) => { dataSources: Option[]; campaigns: Option[] };

export const useFilterData: UseFilterData = (data) => {
    const [dataSources, setDataSources] = useState<Option[]>([]);
    const [campaigns, setCampaigns] = useState<Option[]>([]);

    const memoizedCampaigns = useMemo(() => {
        console.log('memoizedCampaigns');
        return _.uniqBy<AdData>(data, 'campaign')
            .map(({ campaign }) => campaign)
            .filter((v) => v);
    }, [data]);

    const memoizedDataSources = useMemo(() => {
        return _.uniqBy<AdData>(data, 'dataSource')
            .map(({ dataSource }) => dataSource)
            .filter((v) => v);
    }, [data]);

    useEffect(() => {
        if (data?.length) {
            setDataSources(createOptions(memoizedDataSources));
            setCampaigns(createOptions(memoizedCampaigns));
        }
    }, [data, memoizedCampaigns, memoizedDataSources]);

    const createOptions = (data: string[]): Option[] => {
        console.log('create filter options', data);
        return [
            AllOption,
            ...data.map((item) => {
                return {
                    id: `${item}-id`,
                    name: item,
                    value: item,
                };
            }),
        ];
    };

    return { dataSources, campaigns };
};

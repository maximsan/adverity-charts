import { useEffect, useState } from 'react';
import _ from 'lodash';
import { AdData } from '../../types';

export type UseFilterData = (data: AdData[]) => { dataSources: string[]; campaigns: string[] };

export const useFilterData: UseFilterData = (data) => {
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length) {
      setDataSources(
        _.uniqBy<AdData>(data, 'dataSource')
          .map(({ dataSource }) => dataSource)
          .filter((v) => v)
      );
      setCampaigns(
        _.uniqBy<AdData>(data, 'campaign')
          .map(({ campaign }) => campaign)
          .filter((v) => v)
      );
    }
  }, [data]);

  return { dataSources, campaigns };
};

import { FilterKey, FilterType } from '../shared/types';
import { AdData } from '../types';
import { ALL } from '../shared/constants';

export const filterBy = (initialData: AdData[], filters: FilterType) => {
  let data = [...initialData];

  if (data?.length) {
    Object.keys(filters).forEach((key) => {
      if (key === FilterKey.DATA_SOURCE) {
        data = filterByField(data, FilterKey.DATA_SOURCE, filters[key]);
      } else if (key === FilterKey.CAMPAIGN) {
        data = filterByField(data, FilterKey.CAMPAIGN, filters[key]);
      }
    });
  }

  return data;
};

const filterByField = (data: AdData[], field: string, filters: string[]): AdData[] => {
  if (filters[0] !== ALL) {
    return data.filter((item) => filters.indexOf((item as any)[field]) !== -1);
  }

  return data;
};

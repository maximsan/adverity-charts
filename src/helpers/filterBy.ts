import {FilterKey, FilterType} from "../shared/types";
import {AdData} from "../types";
import {ALL} from "../shared/constants";


export const filterBy = (initialData: AdData[], filters: FilterType) => {
    let filteredData = [...initialData];

    for (let key of Object.keys(filters)) {
        if (key === FilterKey.DATA_SOURCE) {
            filteredData = filterByDataSources(filteredData, filters[key]);
        } else if (key === FilterKey.CAMPAIGN) {
            filteredData = filterByCampaigns(filteredData, filters[key]);
        }
    }

    return filteredData
}

const filterByCampaigns = (data: AdData[], campaignFilters: string[]): AdData[] => {
    if (campaignFilters[0] !== ALL) {
        return data.filter(({campaign}) => campaignFilters.indexOf(campaign) !== -1);
    }

    return data;
}

const filterByDataSources = (data: AdData[], dataSourceFilters: string[]): AdData[] => {
    if (dataSourceFilters[0] !== ALL) {
        return data.filter(({dataSource}) => dataSourceFilters.indexOf(dataSource) !== -1);
    }

    return data;
}

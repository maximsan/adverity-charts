import {FilterKey, FilterType} from "../../shared/types";
import {ALL} from "../../shared/constants";

export const createChartHeader = (filters: FilterType) => {
    let dataSourcesText = createFiltersText(filters, FilterKey.DATA_SOURCE);
    let campaignsText = createFiltersText(filters, FilterKey.CAMPAIGN);

    if (dataSourcesText === ALL) {
        dataSourcesText = 'All Datasources';
    }
    if (campaignsText === ALL) {
        campaignsText = 'All Campaigns';
    }

    return dataSourcesText && campaignsText
        ? `${dataSourcesText}; ${campaignsText}`
        : dataSourcesText && !campaignsText
            ? `${dataSourcesText};`
            : !dataSourcesText && campaignsText
                ? `${campaignsText};`
                : '';
};

const createFiltersText = (filters: FilterType, key: FilterKey) => {
    const dataFilters = filters[key];

    if (dataFilters?.length) {
        const lastValue = dataFilters.slice(-1)[0];
        const prevValues = dataFilters.slice(0, dataFilters.length - 1);
        return prevValues.length ? `${prevValues.map((value) => `${value} and`)} ${lastValue}` : lastValue;
    }

    return '';
}


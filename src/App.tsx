import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ALL, url as s3Url } from './shared/constants';
import { AdData } from './types';
import Grid from '@material-ui/core/Grid';
import { Filter } from './components/Filter/Filter';
import { Chart } from './components/Chart/Chart';
import { FilterKey, FilterType } from './shared/types';
import { fetchCSVData } from './helpers/fetchCSVData';
import { filterBy } from './helpers/filterBy';
import { Header } from './components/Header/Header';

const filtersState = {
    [FilterKey.DATA_SOURCE]: [ALL],
    [FilterKey.CAMPAIGN]: [ALL],
};

export const App = () => {
    const [data, setData] = useState<AdData[]>([]);
    const [cachedData, setCachedData] = useState<AdData[]>([]);
    const [filters, setFilters] = useState<FilterType>(filtersState);

    const fetchData = useCallback(async () => {
        const data = await fetchCSVData(s3Url).catch(console.error);
        if (data) {
            setData(data);
            setCachedData(data);
        }
    }, []);

    useEffect(() => {
        if (filters[FilterKey.DATA_SOURCE].includes(ALL) && filters[FilterKey.CAMPAIGN].includes(ALL)) {
            fetchData().catch(console.error);
        }
    }, [fetchData, filters]);

    const filterData = useMemo(
        () => (data: AdData[], filters: FilterType) => {
            return filterBy(data, filters);
        },
        []
    );

    const applyFilters = (filters: FilterType) => {
        const filteredData = filterData(data, filters);
        setData(filteredData);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} md={3}>
                <Filter
                    data={cachedData}
                    applyFilter={applyFilters}
                    filters={filters}
                    setFilters={setFilters}
                    refetch={fetchData}
                />
            </Grid>
            <Grid item xs={12} md={9}>
                <Chart filteredData={data} filters={filters} />
            </Grid>
        </Grid>
    );
};

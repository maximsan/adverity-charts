import React, {useEffect, useMemo, useState} from 'react';
import {ALL, url as s3Url} from './shared/constants';
import {AdData} from './types';
import Grid from '@material-ui/core/Grid';
import {Filter} from './components/Filter/Filter';
import {Chart} from './components/Chart/Chart';
import {FilterKey, FilterType} from './shared/types';
import {fetchCSVData} from './helpers/fetchCSVData';
import {filterBy} from './helpers/filterBy';
import {Header} from './components/Header/Header';

require('dotenv').config();

export const App = () => {
    const [data, setData] = useState<AdData[]>([]);
    const [filteredData, setFilteredData] = useState<AdData[] | undefined>([]);
    const [filters, setFilters] = useState<FilterType>({
        [FilterKey.DATA_SOURCE]: [ALL],
        [FilterKey.CAMPAIGN]: [ALL],
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCSVData(s3Url).catch(console.error);
            if (data) {
                setData(data);
                setFilteredData(data);
            }
        };

        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        if (filters[FilterKey.DATA_SOURCE].includes(ALL) && filters[FilterKey.CAMPAIGN].includes(ALL)) {
            const restoredData = filterBy(data, filters);
            setFilteredData(restoredData);
        }
    }, [data, filters]);

    const filterData = useMemo(
        () => (data: AdData[], filters: FilterType) => {
            return filterBy(data, filters);
        },
        []
    );

    const applyFilters = (filters: FilterType) => {
        const filteredData = filterData(data, filters);
        setFilteredData(filteredData);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header/>
            </Grid>
            <Grid item xs={12} md={3}>
                <Filter data={data} applyFilter={applyFilters} filters={filters} setFilters={setFilters}/>
            </Grid>
            <Grid item xs={12} md={9}>
                <Chart filteredData={filteredData} filters={filters}/>
            </Grid>
        </Grid>
    );
};

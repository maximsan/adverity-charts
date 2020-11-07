import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { MultiSelect, Option } from '../MultiSelect/MultiSelect';
import { ApplyButton } from '../Button/ApplyButton';
import { ALL } from '../../shared/constants';
import { useStyles } from './styles';
import { FilterKey, FilterType } from '../../shared/types';
import { useFilterData } from './useFilterData';
import { AdData } from '../../types';

export interface FilterListProps {
    filters: FilterType;
    data: AdData[];
    dataSource: Option[];
    campaign: Option[];
    onChange: (name: string, options: Option[]) => void;
    restoreOptions: (name: string) => () => void;
    applyFilter: (filters: FilterType) => void;
}

export const FilterList: FC<FilterListProps> = ({
    filters,
    data,
    dataSource,
    campaign,
    restoreOptions,
    onChange,
    applyFilter,
}) => {
    const { gridItem, button } = useStyles();

    const { dataSources, campaigns } = useFilterData(data);

    const isDisabledButton = () => {
        const filterValues = Object.values(filters).reduce((accum, values) => [...accum, ...values]);
        return !filterValues.some((value) => value !== ALL);
    };

    const onClick = () => {
        const campaignFilters = campaign.map(({ name }) => name);
        const dataSourcesFilters = dataSource.map(({ name }) => name);
        const filters: FilterType = {
            [FilterKey.DATA_SOURCE]: dataSourcesFilters,
            [FilterKey.CAMPAIGN]: campaignFilters,
        };

        applyFilter(filters);
    };

    return (
        <>
            <Grid container alignItems="center" justify="space-between" item xs={12} className={gridItem}>
                <Grid item xs={8}>
                    <MultiSelect
                        id="dataSource"
                        name="dataSource"
                        label="Datasource"
                        value={dataSource}
                        onChange={onChange}
                        restoreOptions={restoreOptions}
                        options={dataSources}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ApplyButton className={button} disabled={isDisabledButton()} onClick={onClick} />
                </Grid>
            </Grid>

            <Grid container alignItems="center" justify="space-between" item xs={12} className={gridItem}>
                <Grid item xs={8}>
                    <MultiSelect
                        id="campaign"
                        name="campaign"
                        label="Campaign"
                        value={campaign}
                        onChange={onChange}
                        restoreOptions={restoreOptions}
                        options={campaigns}
                    />
                </Grid>
            </Grid>
        </>
    );
};

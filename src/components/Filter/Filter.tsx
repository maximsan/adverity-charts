import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { MultiSelect, Option } from '../MultiSelect/MultiSelect';
import { ApplyButton } from '../Button/ApplyButton';
import { AdData } from '../../types';
import { FilterKey, FilterType } from '../../shared/types';
import { ALL, AllOption } from '../../shared/constants';
import _ from 'lodash';
import { useStyles } from './styles';

export interface FilterProps {
  data: AdData[];
  applyFilter: (filters: FilterType) => void;
  setFilters: Dispatch<SetStateAction<FilterType>>;
  filters: FilterType;
}

export interface State {
  campaign: Option[];
  dataSource: Option[];
}

export const Filter: FC<FilterProps> = ({ applyFilter, setFilters, filters, data }) => {
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const { paper, gridItem, button } = useStyles();

  const [{ campaign, dataSource }, setValue] = useState<State>({
    campaign: [AllOption],
    dataSource: [AllOption],
  });

  useEffect(() => {
    if (data.length) {
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

  const createOptions = useMemo(
    () => (data: string[]): Option[] => {
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
    },
    []
  );

  const onChange = (name: string, options: Option[]) => {
    setValue((values) => ({
      ...values,
      [name]: options,
    }));

    const filterValues = options.map(({ name }) => name);

    setFilters((values) => ({
      ...values,
      [name]: filterValues,
    }));
  };

  const restoreOptions = (name: string) => () => {
    setValue((values) => ({
      ...values,
      [name]: [AllOption],
    }));

    setFilters((values) => ({
      ...values,
      [name]: [ALL],
    }));
  };

  const handleApplyFilter = () => {
    const campaignFilters = campaign.map(({ name }) => name);
    const dataSourcesFilters = dataSource.map(({ name }) => name);
    const filters: FilterType = {
      [FilterKey.DATA_SOURCE]: dataSourcesFilters,
      [FilterKey.CAMPAIGN]: campaignFilters,
    };
    applyFilter(filters);
  };

  const isDisabledButton = () => {
    const filterValues = Object.values(filters).reduce((accum, values) => [...accum, ...values]);

    return !filterValues.some((value) => value !== ALL);
  };

  return (
    <Paper variant="outlined" className={paper}>
      <Grid container>
        <Grid container item xs={12}>
          <Typography variant="h6">Filter dimension values</Typography>
        </Grid>
        <Grid container direction="column" wrap="nowrap" item xs={12}>
          <Grid container alignItems="center" justify="space-between" item xs={12} className={gridItem}>
            <Grid item xs={8}>
              <MultiSelect
                id="dataSource"
                name="dataSource"
                label="Datasource"
                value={dataSource}
                onChange={onChange}
                restoreOptions={restoreOptions}
                options={createOptions(dataSources)}
              />
            </Grid>
            <Grid item xs={2}>
              <ApplyButton disabled={isDisabledButton()} className={button} onClick={handleApplyFilter} />
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
                options={createOptions(campaigns)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

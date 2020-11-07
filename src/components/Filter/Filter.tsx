import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Option } from '../MultiSelect/MultiSelect';
import { AdData } from '../../types';
import { FilterType } from '../../shared/types';
import { ALL, AllOption } from '../../shared/constants';
import { useStyles } from './styles';
import { FilterList } from './FilterList';

export interface FilterProps {
    data: AdData[];
    applyFilter: (filters: FilterType) => void;
    setFilters: Dispatch<SetStateAction<FilterType>>;
    filters: FilterType;
    refetch: () => Promise<void>;
}

export interface State {
    campaign: Option[];
    dataSource: Option[];
}

const optionsState = {
    campaign: [AllOption],
    dataSource: [AllOption],
};

export const Filter: FC<FilterProps> = ({ applyFilter, setFilters, filters, data, refetch }) => {
    const { paper } = useStyles();
    const [{ campaign, dataSource }, setValue] = useState<State>(optionsState);

    const onChange = async (name: string, options: Option[]) => {
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

    const restoreOptions = (name: string) => async () => {
        setValue((values) => ({
            ...values,
            [name]: [AllOption],
        }));

        setFilters((values) => ({
            ...values,
            [name]: [ALL],
        }));

        await refetch();
    };

    return (
        <Paper variant="outlined" className={paper}>
            <Grid container>
                <Grid container item xs={12}>
                    <Typography variant="h6">Filter dimension values</Typography>
                </Grid>
                <Grid container direction="column" wrap="nowrap" item xs={12}>
                    {!!data?.length && (
                        <FilterList
                            filters={filters}
                            data={data}
                            dataSource={dataSource}
                            campaign={campaign}
                            applyFilter={applyFilter}
                            onChange={onChange}
                            restoreOptions={restoreOptions}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

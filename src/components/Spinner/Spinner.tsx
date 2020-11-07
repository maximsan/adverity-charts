import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';

export const Spinner: FC = () => {
    const { wrapper, root } = useStyles();

    return (
        <div className={wrapper}>
            <CircularProgress className={root} size={60} />
        </div>
    );
};

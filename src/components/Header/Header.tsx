import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useStyles} from "./styles";

export const Header = () => {
    const {paper, text} = useStyles();

    return (
        <Paper variant="outlined" className={paper}>
            <Typography>
                - Select zero to N <i>Datasources</i>
            </Typography>
            <Typography>
                - Select zero to N <i>Campaigns</i>
            </Typography>
            <Typography variant="caption">
                (where zero means "All")
            </Typography>
            <Typography className={text}>
                Hitting "Apply", filter the chart to show a timeseries for
                both <i>Clicks</i> and <i>Impressions</i> for given <i>Datasources</i> and <i>Campaigns</i> -
                logical AND
            </Typography>
        </Paper>
    );
};

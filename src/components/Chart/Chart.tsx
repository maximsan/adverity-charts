import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CartesianGrid, Label, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { AdData } from '../../types';
import { FilterType } from '../../shared/types';
import { cTickFormatter, iTickFormatter } from './tickFormatter';
import { createChartHeader } from './createChartHeader';
import { useStyles } from './styles';
import { Spinner } from '../Spinner/Spinner';
import { useChartData } from './useChartData';

export interface ChartOptions {
  filteredData: AdData[] | undefined;
  filters: FilterType;
}

export const Chart: FC<ChartOptions> = ({ filteredData, filters }) => {
  const { paper, header } = useStyles();

  const { chartData, clicksMax, impressionsMax } = useChartData(filteredData);

  if (!chartData?.length) {
    return <Spinner />;
  }

  return (
    <Paper variant="outlined" className={paper}>
      <Typography variant="h5" className={header}>
        {createChartHeader(filters)}
      </Typography>
      <LineChart
        width={1300}
        height={800}
        data={chartData}
        style={{ margin: 'auto' }}
        margin={{ top: 10, left: 30, bottom: 10, right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <Line dataKey="c" dot={false} name="clicks" stroke="blue" />
        <YAxis
          dataKey="c"
          domain={[0, clicksMax!]}
          tickSize={0}
          tickMargin={10}
          tickCount={10}
          tickFormatter={cTickFormatter(clicksMax!)}
        >
          <Label
            value="Clicks"
            angle={-90}
            position="insideLeft"
            offset={-20}
            style={{ fontSize: '1.25rem', fontWeight: 500 }}
          />
        </YAxis>

        <Line dataKey="i" dot={false} name="impressions" stroke="red" yAxisId="right" />
        <YAxis
          dataKey="i"
          domain={[0, impressionsMax!]}
          yAxisId="right"
          orientation="right"
          tickSize={0}
          tickMargin={10}
          tickCount={10}
          tickFormatter={iTickFormatter(impressionsMax!)}
        >
          <Label
            value="Impressions"
            angle={90}
            position="insideRight"
            offset={-20}
            style={{ fontSize: '1.25rem', fontWeight: 500 }}
          />
        </YAxis>

        <Legend iconSize={22} iconType="plainline" />
      </LineChart>
    </Paper>
  );
};

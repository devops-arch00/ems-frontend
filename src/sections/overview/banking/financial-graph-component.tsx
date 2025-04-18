import { ApexOptions } from 'apexcharts';
// @mui
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// components
import Chart, { useChart } from 'src/components/chart';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      type: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function BankingBalanceStatistics({ title, subheader, chart, ...other }: Props) {
  const { categories, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        columnWidth: '60%', // Thick bars
        borderRadius: 4,
      },
    },
    xaxis: {
      categories,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} kWh`,
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {series.map((item) => (
        <Box key={item.type} sx={{ mt: 3, mx: 3 }}>
          <Chart dir="ltr" type="bar" series={item.data} options={chartOptions} height={364} />
        </Box>
      ))}
    </Card>
  );
}

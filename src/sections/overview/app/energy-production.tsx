import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;
const LEGEND_HEIGHT = 60;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    display: 'flex',
    justifyContent: 'center',
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

export default function EnergyProduction({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();
  const { colors = ['#50b848', '#005baa', '#f1c41f'], series, options } = chart;

  const chartSeries = series.map((i) => i.value);
  const chartLabels = series.map((i) => i.label);

  const chartOptions = useChart({
    chart: {
      sparkline: { enabled: true },
    },
    colors,
    labels: chartLabels,
    stroke: { colors: ['theme.palette.background.paper'] },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (value: number) => `${value.toFixed(2)}%`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true },
            value: {
              formatter: (value: number | string) => `${value}%`,
              color: theme.palette.text.primary,
              fontSize: '14px',
            },
            total: {
              show: true,
            },
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <StyledChart
        dir="ltr"
        type="donut"
        series={chartSeries}
        options={chartOptions}
        height={390}
      />
    </Card>
  );
}

import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// components
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: number[]; // Single percentage value
    options?: ApexOptions;
  };
}

export default function EnergyEfficiency({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();
  const { colors = ['#50b848', '#005baa'], series, options } = chart;

  const chartOptions = useChart({
    chart: {
      type: 'radialBar',
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#EAEAEA',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            formatter: (val: number) => `${val.toFixed(2)}%`, // Show value as percentage
          },
        },
      },
    },
    labels: [], // Hides labels
    legend: {
      show: false, // Hides legend if necessary
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 10, // This will create labels from 0 to 100
      labels: {
        style: {
          colors: theme.palette.text.primary,
          fontSize: '14px',
        },
        formatter: (val: number) => `${val}`, // Show numbers 0-100
      },
    },
    colors: colors || ['#F76C5E', '#FFD700', '#32CD32'], // Red, Yellow, Green
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <StyledChart dir="ltr" type="radialBar" series={series} options={chartOptions} height={550} />
    </Card>
  );
}

import { ApexOptions } from 'apexcharts';
import { useState, useCallback } from 'react';
// @mui
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      year: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function EcommerceYearlySalesCustom({ title, subheader, chart, ...other }: Props) {
  const { colors, categories, series, options } = chart;

  const popover = usePopover();
  const [seriesData, setSeriesData] = useState('Forecast');

  const chartOptions = useChart({
    colors,
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: 4,
      strokeWidth: 2,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
          colors: '#6c757d',
        },
      },
    },
    yaxis: [
      {
        show: true, // Keep the axis line visible
        title: {
          style: {
            fontSize: '13px',
            fontWeight: 600,
            color: '#6c757d',
          },
        },
        labels: {
          show: true, // Explicitly show the labels
          style: {
            fontSize: '12px',
            colors: '#6c757d',
          },
          formatter: (val: number) => `${val}`,
        },
      },
      {
        show: true, // Keep the axis line visible
        opposite: true,
        title: {
          style: {
            fontSize: '13px',
            fontWeight: 600,
            color: '#6c757d',
          },
        },
        labels: {
          show: false, // Explicitly show the labels
          style: {
            fontSize: '12px',
            colors: '#6c757d',
          },
          formatter: (val: number) => `${val.toLocaleString()}`,
        },
      },
    ],
    // Rest of your chart options...
  
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number, { seriesIndex }) =>
          seriesIndex === 1 ? `${val.toLocaleString()} PKRs` : `${val} kWh`,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
      fontWeight: 500,
    //   markers: {
    //     radius: 12,
    //   },
      labels: {
        colors: '#333',
      },
    },
    ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue: string) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={subheader}
          action={
            <ButtonBase
              onClick={popover.onOpen}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 1,
                typography: 'subtitle2',
                bgcolor: 'background.neutral',
              }}
            >
              {seriesData}
              <Iconify
                width={16}
                icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </ButtonBase>
          }
        />

        {series.map((item) => (
          <Box key={item.year} sx={{ mt: 3, mx: 3 }}>
            {item.year === seriesData && (
              <Chart dir="ltr" type="line" series={item.data} options={chartOptions} height={364} />
            )}
          </Box>
        ))}
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.year}
            selected={option.year === seriesData}
            onClick={() => handleChangeSeries(option.year)}
          >
            {option.year}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

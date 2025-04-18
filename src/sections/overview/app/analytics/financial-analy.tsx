import React, { useState, useCallback } from 'react';
import {
  Container,
  Card,
  Stack,
  Tabs,
  Tab,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Label from 'src/components/label';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import BankingBalanceStatistics from '../../banking/financial-graph-component';
import EcommerceYearlySales from '../../e-commerce/ecommerce-financial-sales';
import InvoiceTableToolbar from '../report/invoice-table-toolbar';
import InvoiceTableFiltersResult from '../report/invoice-table-filters-result';

const defaultFilters = {
  name: '',
  service: [],
  status: 'all',
  startDate: null,
  endDate: null,
};

export default function FinancialDashboard() {
  const settings = useSettingsContext();

  const [currentView, setCurrentView] = useState('consolidated');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const canReset = !!filters.startDate || !!filters.endDate;

  const monthlyData = [
    { month: 'January', units: 1200, rate: 18 },
    { month: 'February', units: 1150, rate: 18 },
    { month: 'March', units: 1300, rate: 19 },
    { month: 'April', units: 1400, rate: 19 },
    { month: 'May', units: 1500, rate: 20 },
    { month: 'June', units: 1650, rate: 20 },
    { month: 'July', units: 1800, rate: 21 },
    { month: 'August', units: 1750, rate: 21 },
    { month: 'September', units: 1600, rate: 20 },
    { month: 'October', units: 1450, rate: 20 },
    { month: 'November', units: 1350, rate: 19 },
    { month: 'December', units: 1250, rate: 19 },
  ];

  const historicalUnits = [1300, 1300, 1300, 1450, 1550, 1700, 1900, 1850, 1650, 1500, 1400, 1300];
  const months = monthlyData.map((item) => item.month);

  const kWhVariance = monthlyData.map((item, index) =>
    Math.abs(item.units - historicalUnits[index])
  );

  const billVariance = monthlyData.map((item, index) =>
    Math.abs(item.units * item.rate - historicalUnits[index] * item.rate)
  );

  const totalUnits = monthlyData.reduce((sum, item) => sum + item.units, 0);
  const totalCost = monthlyData.reduce((sum, item) => sum + item.units * item.rate, 0);
  const averageRate = (totalCost / totalUnits).toFixed(2);

  const forecastPercent = (((totalUnits - historicalUnits.reduce((a, b) => a + b, 0)) / historicalUnits.reduce((a, b) => a + b, 0)) * 100).toFixed(1);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Overview"
        links={[{ name: 'Dashboard', href: '/' }]}
        sx={{ mb: { xs: 3, md: 2 } }}
      />

      <Tabs value={currentView} onChange={(e, v) => setCurrentView(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tab value="consolidated" label="Consolidated View" />
        <Tab value="sitewise" label="Sitewise View" />
      </Tabs>

      <Tabs value={selectedRegion} onChange={(e, v) => setSelectedRegion(v)} textColor="secondary" indicatorColor="secondary" sx={{ mb: 2 }}>
        <Tab value="all" label="All" />
        <Tab value="punjab" label={<Typography sx={{ color: 'black' }}>Punjab</Typography>} />
        <Tab value="kpk" label={<Typography sx={{ color: 'black' }}>KPK</Typography>} />
        <Tab value="islamabad" label={<Typography sx={{ color: 'black' }}>Islamabad</Typography>} />
        <Tab value="sindh" label={<Typography sx={{ color: 'black' }}>Sindh</Typography>} />
      </Tabs>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
        <Label color="success">Active (2)</Label>
        <Label color="warning">Pending (10)</Label>
        <Label color="error">Banned (6)</Label>
        <Label color="default">Rejected (2)</Label>
      </Stack>
{/* 
      <Card sx={{ mb: 3 }}>
        <InvoiceTableToolbar
          filters={filters}
          onFilters={handleFilters}
          serviceOptions={[]}
          dateError={false}
        />

        {canReset && (
          <InvoiceTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={() => setFilters(defaultFilters)}
            results={monthlyData.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
      </Card> */}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2">Total Consumption</Typography>
          <Typography variant="h5" color="black">{totalUnits.toLocaleString()} kWh</Typography>
        </Card>
        <Card sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2">Average PKRs/Unit</Typography>
          <Typography variant="h5" color="black">{averageRate} PKRs</Typography>
        </Card>
        <Card sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2">Total Bill</Typography>
          <Typography variant="h5" color="black">{totalCost.toLocaleString()} PKRs</Typography>
        </Card>
      </Stack>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'black' }}>Month</TableCell>
                <TableCell style={{ color: 'black' }}>KWh Consumption</TableCell>
                <TableCell style={{ color: 'black' }}>PKRs / Unit</TableCell>
                <TableCell style={{ color: 'black' }}>Total Bill (PKRs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyData.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.units}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.units * row.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <BankingBalanceStatistics
            title="Historical vs Current Consumption"
            subheader="kWh Comparison"
            chart={{
              categories: months,
              series: [
                {
                  type: 'bar',
                  data: [
                    { name: 'Historical', data: historicalUnits },
                    { name: 'Current', data: monthlyData.map((item) => item.units) },
                  ],
                },
              ],
              options: {
                legend: { show: true, position: 'bottom' },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BankingBalanceStatistics
            title="Variance Analysis"
            subheader="kWh & Bill Variance"
            chart={{
              categories: months,
              series: [
                {
                  type: 'bar',
                  data: [
                    { name: 'kWh Variance', data: kWhVariance },
                    { name: 'Bill Variance', data: billVariance },
                  ],
                },
              ],
              options: {
                legend: { show: true, position: 'bottom' },
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <EcommerceYearlySales
            title="Historic Trend"
            subheader={`(${forecastPercent}%) Projection`}
            chart={{
              categories: months,
              series: [
                {
                  year: 'Forecast',
                  data: [
                    { name: 'KWh Consumption', data: historicalUnits },
                    { name: 'Total Bill (PKrs)', data: monthlyData.map((item) => item.units) },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
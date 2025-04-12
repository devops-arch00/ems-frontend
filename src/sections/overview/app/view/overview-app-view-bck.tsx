// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
  _bankingRecentTransitions,
  electricityCosts,
  getEnergyData,
  mockDataByCountry,
} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets//
import { useCallback, useState, useEffect } from 'react';
import { alpha, Tab, Tabs } from '@mui/material';

import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';
import { RHFAutocomplete } from 'src/components/hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import AppWidgetSummary from '../app-widget-summary';

import EnergyProduction from '../energy-production';
import EnergyConsumption from '../energy-consumption';

import ChangeCost from '../change-cost';
import BankingRecentTransitions from '../../banking/banking-recent-transitions';

// ----------------------------------------------------------------------

// Define types for states and cities
type StateOption = {
  value: string;
  label: string;
};

export default function OverviewAppView() {
  // States mapping
  const statesByCountry: Record<string, StateOption[]> = {
    pakistan: [
      { value: '', label: 'Punjab' },
      { value: 'sindh', label: 'Sindh' },
      { value: 'khyber_pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
      { value: 'balochistan', label: 'Balochistan' },
      { value: 'gilgit_baltistan', label: 'Gilgit-Baltistan' },
      { value: 'azad_kashmir', label: 'Azad Kashmir' },
      { value: 'islamabad', label: 'Islamabad Capital Territory' },
    ],
    india: [
      { value: 'maharashtra', label: 'Maharashtra' },
      // Add more Indian states as needed
    ],
    china: [
      { value: 'beijing', label: 'Beijing' },
      // Add more Chinese regions as needed
    ],
  };

  const [currentTab, setCurrentTab] = useState('pakistan');
  const [currentTabState, setCurrentTabState] = useState('punjab');
  const [currentCity, setCurrentCity] = useState('Lahore');
  const [energyData, setEnergyData] = useState<any>(null);
  const [stateOptions, setStateOptions] = useState<StateOption[]>(statesByCountry.pakistan);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const methods = useForm();
  const { user } = useMockedUser();
  const theme = useTheme();
  const settings = useSettingsContext();

  // Update state options when country changes
  useEffect(() => {
    setStateOptions(statesByCountry[currentTab] || []);
    // Default to first state of the selected country
    const firstState = statesByCountry[currentTab]?.[0]?.value || '';
    setCurrentTabState(firstState);
  }, [currentTab]);

  // Update city options when state changes
  useEffect(() => {
    const countryData = mockDataByCountry[currentTab as keyof typeof mockDataByCountry];
    if (!countryData) return;

    const stateData:any = countryData[currentTabState as keyof typeof countryData];
    if (!stateData) return;

    const cities = Object.keys(stateData.cities);
    setCityOptions(cities);

    // Default to first city of the selected state
    if (cities.length > 0) {
      setCurrentCity(cities[0]);
    }
  }, [currentTab, currentTabState]);

  // Fetch energy data when selection changes
  useEffect(() => {
    const data = getEnergyData(currentTab, currentTabState, currentCity);
    if (data) {
      setEnergyData(data);
    }
  }, [currentTab, currentTabState, currentCity]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangeTabState = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTabState(newValue);
  }, []);

  const handleCityChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue) {
      setCurrentCity(newValue);
    }
  };

  // Get table data based on current state selection
  const getTableData = () => {
    const countryData = mockDataByCountry[currentTab as keyof typeof mockDataByCountry];
    if (!countryData) return electricityCosts;

    const stateData:any = countryData[currentTabState as keyof typeof countryData];
    if (!stateData) return electricityCosts;

    // Create table data from city data
    return Object.entries(stateData.cities).map(([city, data], index) => {
      // Get the latest consumption value from the city data
      const consumption = Array.isArray(data) && data.length > 0 ? data[0].consumption : 0;

      return {
        id: String(index + 1),
        city,
        consumption,
      };
    });
  };

  const getTableDataV2 = () => {
    const countryData = mockDataByCountry[currentTab as keyof typeof mockDataByCountry];
    if (!countryData) return electricityCosts;

    const stateData:any = countryData[currentTabState as keyof typeof countryData];
    if (!stateData) return electricityCosts;

    // Create table data from city data
    return Object.entries(stateData.cities).map(([city, data], index) => {
      // Get the latest consumption value from the city data
      const consumption = Array.isArray(data) && data.length > 0 ? data[0].consumption : 0;

      return {
        id: String(index + 1),
        city,
        consumption,
      };
    });
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing="10px">
        <Grid xs={12} md={12}>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              display: 'flex',
              '& .MuiTabs-flexContainer': {
                backgroundColor: '#F4F6F8',
                width: 'max-content',
                borderRadius: '30px',
                padding: '4px',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {[
              {
                value: 'pakistan',
                label: 'Pakistan',
              },
              {
                value: 'india',
                label: 'India',
              },
              {
                value: 'china',
                label: 'China',
              },
            ].map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={{
                  backgroundColor:
                    currentTab === tab.value ? theme.palette.primary.main : 'transparent',
                  color: currentTab === tab.value ? '#fff' : theme.palette.text.primary,
                  padding: '8px 16px',
                  borderRadius: '30px',
                  transition: 'background-color 0.3s ease',
                  width: '90px',
                  marginRight: '20px !important',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                  },
                }}
              />
            ))}
          </Tabs>
        </Grid>

        <Grid xs={12} md={12}>
          <Tabs
            value={currentTabState}
            onChange={handleChangeTabState}
            sx={{
              display: 'flex',
              '& .MuiTabs-flexContainer': {
                backgroundColor: '#F4F6F8',
                width: 'max-content',
                borderRadius: '30px',
                padding: '4px',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {stateOptions.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={{
                  backgroundColor:
                    currentTabState === tab.value ? theme.palette.primary.main : 'transparent',
                  color: currentTabState === tab.value ? '#fff' : theme.palette.text.primary,
                  padding: '8px 16px',
                  borderRadius: '30px',
                  transition: 'background-color 0.3s ease',
                  marginRight: '20px !important',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                  },
                }}
              />
            ))}
          </Tabs>
        </Grid>

        <Grid xs={12} md={12}>
          <FormProvider {...methods}>
            <form>
              {cityOptions.length > 0 && (
                <RHFAutocomplete
                  name="city"
                  label="City"
                  options={cityOptions}
                  getOptionLabel={(option: string) => option}
                  isOptionEqualToValue={(option: string, value: string) => option === value}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                  value={currentCity}
                  // onChange={handleCityChange}
                />
              )}
            </form>
          </FormProvider>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack sx={{ flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', gap: '10px' }}>
              <AppWidgetSummary
                title="Current Consumption (kwh)"
                percent={2.6}
                total={energyData?.currentConsumption || 4097}
                sx={{ width: '100%' }}
                chart={{
                  series: energyData?.chartSeries || [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
              <AppWidgetSummary
                title="Current Cost"
                percent={2.6}
                total={energyData?.currentCost || 1526}
                sx={{ width: '100%' }}
                isCost
                chart={{
                  series: energyData?.chartSeries || [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Stack>
            <EnergyProduction
              title="a"
              chart={{
                series: energyData?.energySources || [
                  { label: 'Solar Energy', value: 22 },
                  { label: '(WAPDA) - Electricity', value: 48 },
                  { label: 'Generator', value: 30 },
                ],
              }}
              sx={{ height: '100%' }}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <ChangeCost
            title="Change In Cost"
            chart={energyData?.costChanges || {
              categories: ['2024', '2025'],
              series: [
                {
                  year: '2024',
                  data: [41, 35],
                },
                {
                  year: '2025',
                  data: [35, 41],
                },
              ],
            }}
            sx={{ height: '100%' }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EnergyConsumption
            title="Top 10 Sites for Energy Consumption"
            chart={energyData?.topConsumers || {
              categories: [
                'Karachi',
                'Lahore',
                'Islamabad',
                'Rawalpindi',
                'Peshawar',
                'Quetta',
                'Faisalabad',
                'Multan',
                'Sialkot',
                'Gujranwala',
              ],
              series: [
                {
                  year: '2024',
                  data: [5100, 4200, 3800, 2800, 3200, 2400, 3100, 2850, 2450, 2300],
                },
                {
                  year: '2025',
                  data: [5350, 4350, 3950, 2950, 3350, 2550, 3250, 2950, 2550, 2400],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={12}>
          <BankingRecentTransitions
            title="Daily Consumption by City"
            tableData={getTableData()} // This uses the function defined earlier that returns data for the current state
            tableLabels={[
              { id: 'city', label: 'City' },
              { id: 'consumption', label: 'Consumption (kWh)' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}





// // @mui
// import { useTheme } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// // hooks
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// // _mock
// import {
//   _appFeatured,
//   _appAuthors,
//   _appInstalled,
//   _appRelated,
//   _appInvoices,
//   _bankingRecentTransitions,
//   electricityCosts,
// } from 'src/_mock';
// // components
// import { useSettingsContext } from 'src/components/settings';
// // assets//
// import { useCallback, useState } from 'react';
// import { alpha, Tab, Tabs } from '@mui/material';
//
// import { countries } from 'src/assets/data';
// import Iconify from 'src/components/iconify';
// import { RHFAutocomplete } from 'src/components/hook-form';
// import { FormProvider, useForm } from 'react-hook-form';
// import AppWidgetSummary from '../app-widget-summary';
//
// import EnergyProduction from '../energy-production';
// import EnergyConsumption from '../energy-consumption';
//
// import ChangeCost from '../change-cost';
// import BankingRecentTransitions from '../../banking/banking-recent-transitions';
//
// // ----------------------------------------------------------------------
//
// const states: any = [
//   { value: 'punjab', label: 'Punjab' },
//   { value: 'sindh', label: 'Sindh' },
//   { value: 'khyber_pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
//   { value: 'balochistan', label: 'Balochistan' },
//   { value: 'gilgit_baltistan', label: 'Gilgit-Baltistan' },
//   { value: 'azad_kashmir', label: 'Azad Kashmir' },
//   { value: 'islamabad', label: 'Islamabad Capital Territory' },
// ];
//
// // Cities mapping based on the selected state
// const citiesByState: any = {
//   punjab: ['Lahore', 'Islamabad', 'Faisalabad', 'Multan'],
//   sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Mirpur Khas'],
//   khyber_pakhtunkhwa: ['Peshawar', 'Mardan', 'Swat', 'Abbottabad'],
//   balochistan: ['Quetta', 'Khuzdar', 'Turbat', 'Loralai'],
//   gilgit_baltistan: ['Gilgit', 'Skardu', 'Hunza'],
//   azad_kashmir: ['Muzaffarabad', 'Rawalakot', 'Bhimber'],
//   islamabad: ['Islamabad'],
// };
//
// export default function OverviewAppView() {
//   const [currentTab, setCurrentTab] = useState('pakistan');
//   const [currentTabState, setCurrentTabState] = useState('punjab');
//   const methods = useForm();
//   const { user } = useMockedUser();
//
//   const theme = useTheme();
//
//   const settings = useSettingsContext();
//
//   const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
//     setCurrentTab(newValue);
//   }, []);
//
//   const handleChangeTabState = useCallback((event: React.SyntheticEvent, newValue: string) => {
//     setCurrentTabState(newValue);
//   }, []);
//
//   return (
//     <Container maxWidth={settings.themeStretch ? false : 'xl'}>
//       <Grid container spacing="10px">
//         <Grid xs={12} md={12}>
//           <Tabs
//             value={currentTab}
//             onChange={handleChangeTab}
//             sx={{
//               display: 'flex',
//               '& .MuiTabs-flexContainer': {
//                 backgroundColor: '#F4F6F8',
//                 width: 'max-content',
//                 borderRadius: '30px',
//                 padding: '4px',
//               },
//               '& .MuiTabs-indicator': {
//                 display: 'none',
//               },
//             }}
//           >
//             {[
//               {
//                 value: 'pakistan',
//                 label: 'Pakistan',
//               },
//               {
//                 value: 'india',
//                 label: 'India',
//               },
//               {
//                 value: 'china',
//                 label: 'China',
//               },
//             ].map((tab) => (
//               <Tab
//                 key={tab.value}
//                 value={tab.value}
//                 label={tab.label}
//                 sx={{
//                   backgroundColor:
//                     currentTab === tab.value ? theme.palette.primary.main : 'transparent',
//                   color: currentTab === tab.value ? '#fff' : theme.palette.text.primary,
//                   padding: '8px 16px', // Adjusts the size of the tiles
//                   borderRadius: '30px', // Gives a rounded corner to the active tab
//                   transition: 'background-color 0.3s ease',
//                   width: '90px',
//                   marginRight: '20px !important',
//                   '&:hover': {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.8),
//                   },
//                 }}
//               />
//             ))}
//           </Tabs>
//         </Grid>
//
//         <Grid xs={12} md={12}>
//           <Tabs
//             value={currentTabState}
//             onChange={handleChangeTabState}
//             sx={{
//               display: 'flex',
//               '& .MuiTabs-flexContainer': {
//                 backgroundColor: '#F4F6F8',
//                 width: 'max-content',
//                 borderRadius: '30px',
//                 padding: '4px',
//               },
//               '& .MuiTabs-indicator': {
//                 display: 'none',
//               },
//             }}
//           >
//             {states?.map((tab: any) => (
//               <Tab
//                 key={tab.value}
//                 value={tab.value}
//                 label={tab.label}
//                 sx={{
//                   backgroundColor:
//                     currentTabState === tab.value ? theme.palette.primary.main : 'transparent',
//                   color: currentTabState === tab.value ? '#fff' : theme.palette.text.primary,
//                   padding: '8px 16px', // Adjusts the size of the tiles
//                   borderRadius: '30px', // Gives a rounded corner to the active tab
//                   transition: 'background-color 0.3s ease',
//                   // width: '90px',
//                   marginRight: '20px !important',
//                   '&:hover': {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.8),
//                   },
//                 }}
//               />
//             ))}
//           </Tabs>
//         </Grid>
//
//         <Grid xs={12} md={12}>
//           <FormProvider {...methods}>
//             <form>
//               {currentTabState && (
//                 <RHFAutocomplete
//                   name="city"
//                   label="City"
//                   options={citiesByState[currentTabState]?.map((city: string) => city) || []}
//                   getOptionLabel={(option: string) => option}
//                   isOptionEqualToValue={(option: string, value: string) => option === value}
//                   renderOption={(props, option) => (
//                     <li {...props} key={option}>
//                       {option}
//                     </li>
//                   )}
//                   value={citiesByState[currentTabState]?.[0] || ''} // Set default value to the first city
//                 />
//               )}
//             </form>
//           </FormProvider>
//         </Grid>
//         <Grid xs={12} md={4}>
//           <Stack sx={{ flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
//             <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', gap: '10px' }}>
//               <AppWidgetSummary
//                 title="Current Consumption (kwh)"
//                 percent={2.6}
//                 total={4097}
//                 sx={{ width: '100%' }}
//                 chart={{
//                   series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
//                 }}
//               />
//               <AppWidgetSummary
//                 title="Current Cost"
//                 percent={2.6}
//                 total={1526}
//                 sx={{ width: '100%' }}
//                 isCost
//                 chart={{
//                   series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
//                 }}
//               />
//             </Stack>
//             <EnergyProduction
//               title="Energy Consumption by Source"
//               chart={{
//                 series: [
//                   { label: 'Solar Energy', value: 22 },
//                   { label: '(WAPDA) - Electricity', value: 48 },
//                   { label: 'Generator', value: 30 },
//                 ],
//               }}
//               sx={{ height: '100%' }}
//             />
//           </Stack>
//         </Grid>
//
//         <Grid xs={12} md={4}>
//           <ChangeCost
//             title="Change In Cost"
//             chart={{
//               categories: ['2024', '2025'],
//               series: [
//                 {
//                   year: '2024',
//                   data: [41, 35], // Direct numerical data array
//                 },
//                 {
//                   year: '2025',
//                   data: [35, 41],
//                 },
//               ],
//             }}
//             sx={{ height: '100%' }}
//           />
//         </Grid>
//
//         <Grid xs={12} md={4}>
//           <EnergyConsumption
//             title="Top 10 Site for Energy Consumption"
//             chart={{
//               categories: [
//                 'Karachi',
//                 'Lahore',
//                 'Islamabad',
//                 'Rawalpindi',
//                 'Peshawar',
//                 'Quetta',
//                 'Faisalabad',
//                 'Multan',
//                 'Sialkot',
//                 'Gujranwala',
//               ],
//               series: [
//                 {
//                   year: '2024',
//                   data: [1, 3, 5, 6, 7, 4, 2, 8, 9, 10], // Example data for 2024
//                 },
//                 {
//                   year: '2025',
//                   data: [51, 35, 41, 10, 91, 69, 62, 34, 76, 85], // Example data for 2025
//                 },
//               ],
//             }}
//           />
//         </Grid>
//
//         <Grid xs={12} md={12}>
//           <BankingRecentTransitions
//             title="Daily Consumption by City"
//             tableData={electricityCosts}
//             tableLabels={[
//               { id: 'city', label: 'City' },
//               { id: 'consumption', label: 'Consumption' },
//             ]}
//           />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

export * from './assets';
export * from './_mock';

// ----------------------------------------------------------------------

export * from './_job';
export * from './_user';
export * from './_tour';
export * from './_blog';
export * from './_files';
export * from './_order';
export * from './_others';
export * from './_invoice';
export * from './_product';
export * from './_overview';
export * from './_calendar';



// src/_mock/electricity-data.ts

// Types for data structure
export type CityConsumption = {
  id: string;
  city: string;
  consumption: number;
  cost: number;
  date: Date;
};

export type EnergySource = {
  label: string;
  value: number;
};

export type ConsumptionData = {
  categories: string[];
  series: {
    year: string;
    data: number[];
  }[];
};

// Generate realistic base consumption and cost data for cities
const generateCityData = (cityName: string, baseConsumption: number, baseCost: number) => {
  // Generate 30 days of data with slight variations
  const dailyData: CityConsumption[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 30; i++) {
    // Create realistic variations (±15%)
    const variationFactor = 0.85 + Math.random() * 0.3;

    const date = new Date();
    date.setDate(date.getDate() - i);

    dailyData.push({
      id: `${cityName}-${i}`,
      city: cityName,
      consumption: Math.round(baseConsumption * variationFactor),
      cost: Math.round(baseCost * variationFactor),
      date,
    });
  }

  return dailyData;
};

// Create mock data by country and state
export const mockDataByCountry = {
  pakistan: {
    punjab: {
      cities: {
        Lahore: generateCityData('Lahore', 4200, 1650),
        Islamabad: generateCityData('Islamabad', 3800, 1490),
        Faisalabad: generateCityData('Faisalabad', 3100, 1240),
        Multan: generateCityData('Multan', 2850, 1140),
      },
      energySources: [
        { label: 'Solar Energy', value: 22 },
        { label: '(WAPDA) - Electricity', value: 48 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Lahore', 'Islamabad', 'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Rawalpindi', 'Sargodha', 'Sheikhupura'],
        series: [
          {
            year: '2024',
            data: [4200, 3800, 3100, 2850, 2600, 2450, 2300, 2200, 2100, 1950],
          },
          {
            year: '2025',
            data: [4350, 3950, 3250, 2950, 2750, 2550, 2400, 2350, 2150, 2050],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [72, 68],
          },
          {
            year: '2025',
            data: [68, 74],
          },
        ],
      },
    },
    sindh: {
      cities: {
        Karachi: generateCityData('Karachi', 5100, 2010),
        Hyderabad: generateCityData('Hyderabad', 2900, 1160),
        Sukkur: generateCityData('Sukkur', 2200, 880),
        'Mirpur Khas': generateCityData('Mirpur Khas', 1800, 720),
      },
      energySources: [
        { label: 'Solar Energy', value: 18 },
        { label: '(WAPDA) - Electricity', value: 52 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Karachi', 'Hyderabad', 'Sukkur', 'Mirpur Khas', 'Larkana', 'Nawabshah', 'Jacobabad', 'Shikarpur', 'Dadu', 'Thatta'],
        series: [
          {
            year: '2024',
            data: [5100, 2900, 2200, 1800, 1750, 1650, 1550, 1450, 1350, 1250],
          },
          {
            year: '2025',
            data: [5350, 3050, 2350, 1900, 1850, 1750, 1650, 1550, 1450, 1350],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [78, 72],
          },
          {
            year: '2025',
            data: [72, 76],
          },
        ],
      },
    },
    khyber_pakhtunkhwa: {
      cities: {
        Peshawar: generateCityData('Peshawar', 3200, 1280),
        Mardan: generateCityData('Mardan', 2300, 920),
        Swat: generateCityData('Swat', 1800, 720),
        Abbottabad: generateCityData('Abbottabad', 1700, 680),
      },
      energySources: [
        { label: 'Solar Energy', value: 25 },
        { label: '(WAPDA) - Electricity', value: 45 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Peshawar', 'Mardan', 'Swat', 'Abbottabad', 'Kohat', 'Bannu', 'Nowshera', 'Dera Ismail Khan', 'Chitral', 'Mansehra'],
        series: [
          {
            year: '2024',
            data: [3200, 2300, 1800, 1700, 1650, 1550, 1450, 1350, 1250, 1150],
          },
          {
            year: '2025',
            data: [3350, 2450, 1900, 1800, 1750, 1650, 1550, 1450, 1350, 1250],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [65, 60],
          },
          {
            year: '2025',
            data: [60, 67],
          },
        ],
      },
    },
    balochistan: {
      cities: {
        Quetta: generateCityData('Quetta', 2400, 960),
        Khuzdar: generateCityData('Khuzdar', 1200, 480),
        Turbat: generateCityData('Turbat', 1000, 400),
        Loralai: generateCityData('Loralai', 800, 320),
      },
      energySources: [
        { label: 'Solar Energy', value: 32 },
        { label: '(WAPDA) - Electricity', value: 38 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Quetta', 'Khuzdar', 'Turbat', 'Loralai', 'Gwadar', 'Sibi', 'Zhob', 'Kalat', 'Mastung', 'Chaman'],
        series: [
          {
            year: '2024',
            data: [2400, 1200, 1000, 800, 750, 700, 650, 600, 550, 500],
          },
          {
            year: '2025',
            data: [2550, 1300, 1100, 850, 800, 750, 700, 650, 600, 550],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [58, 54],
          },
          {
            year: '2025',
            data: [54, 59],
          },
        ],
      },
    },
    gilgit_baltistan: {
      cities: {
        Gilgit: generateCityData('Gilgit', 1200, 480),
        Skardu: generateCityData('Skardu', 900, 360),
        Hunza: generateCityData('Hunza', 700, 280),
      },
      energySources: [
        { label: 'Solar Energy', value: 35 },
        { label: '(WAPDA) - Electricity', value: 35 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Gilgit', 'Skardu', 'Hunza', 'Chilas', 'Ghanche', 'Ghizer', 'Astore', 'Diamer', 'Nagar', 'Shigar'],
        series: [
          {
            year: '2024',
            data: [1200, 900, 700, 600, 550, 500, 450, 400, 350, 300],
          },
          {
            year: '2025',
            data: [1300, 950, 750, 650, 600, 550, 500, 450, 400, 350],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [45, 42],
          },
          {
            year: '2025',
            data: [42, 47],
          },
        ],
      },
    },
    azad_kashmir: {
      cities: {
        Muzaffarabad: generateCityData('Muzaffarabad', 1500, 600),
        Rawalakot: generateCityData('Rawalakot', 1100, 440),
        Bhimber: generateCityData('Bhimber', 800, 320),
      },
      energySources: [
        { label: 'Solar Energy', value: 28 },
        { label: '(WAPDA) - Electricity', value: 42 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Muzaffarabad', 'Rawalakot', 'Bhimber', 'Kotli', 'Mirpur', 'Bagh', 'Haveli', 'Sudhnoti', 'Neelum', 'Hattian'],
        series: [
          {
            year: '2024',
            data: [1500, 1100, 800, 750, 700, 650, 600, 550, 500, 450],
          },
          {
            year: '2025',
            data: [1600, 1200, 850, 800, 750, 700, 650, 600, 550, 500],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [52, 48],
          },
          {
            year: '2025',
            data: [48, 53],
          },
        ],
      },
    },
    islamabad: {
      cities: {
        Islamabad: generateCityData('Islamabad', 3800, 1520),
      },
      energySources: [
        { label: 'Solar Energy', value: 30 },
        { label: '(WAPDA) - Electricity', value: 40 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Sector F', 'Sector G', 'Sector I', 'Sector H', 'Sector E', 'Sector D', 'Sector B', 'Sector C', 'Bari Imam', 'Saidpur'],
        series: [
          {
            year: '2024',
            data: [2800, 2500, 2200, 2000, 1800, 1600, 1400, 1200, 1000, 800],
          },
          {
            year: '2025',
            data: [2950, 2650, 2350, 2150, 1950, 1750, 1550, 1350, 1150, 950],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [70, 65],
          },
          {
            year: '2025',
            data: [65, 72],
          },
        ],
      },
    },
  },
  india: {
    maharashtra: {
      cities: {
        Mumbai: generateCityData('Mumbai', 5300, 2120),
        Pune: generateCityData('Pune', 4100, 1640),
        Nagpur: generateCityData('Nagpur', 3500, 1400),
        Nashik: generateCityData('Nashik', 2800, 1120),
      },
      energySources: [
        { label: 'Solar Energy', value: 25 },
        { label: 'Grid Electricity', value: 45 },
        { label: 'Generator', value: 30 },
      ],
      topConsumers: {
        categories: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli', 'Jalgaon'],
        series: [
          {
            year: '2024',
            data: [5300, 4100, 3500, 2800, 2600, 2400, 2200, 2000, 1800, 1600],
          },
          {
            year: '2025',
            data: [5500, 4300, 3700, 3000, 2800, 2600, 2400, 2200, 2000, 1800],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [82, 75],
          },
          {
            year: '2025',
            data: [75, 85],
          },
        ],
      },
    },
    // Add more Indian states as needed
  },
  china: {
    beijing: {
      cities: {
        Beijing: generateCityData('Beijing', 6500, 2600),
        Tianjin: generateCityData('Tianjin', 5500, 2200),
        Chaoyang: generateCityData('Chaoyang', 4500, 1800),
        Haidian: generateCityData('Haidian', 4000, 1600),
      },
      energySources: [
        { label: 'Solar Energy', value: 32 },
        { label: 'Grid Electricity', value: 36 },
        { label: 'Generator', value: 32 },
      ],
      topConsumers: {
        categories: ['Beijing', 'Tianjin', 'Chaoyang', 'Haidian', 'Dongcheng', 'Xicheng', 'Fengtai', 'Shijingshan', 'Tongzhou', 'Daxing'],
        series: [
          {
            year: '2024',
            data: [6500, 5500, 4500, 4000, 3800, 3600, 3400, 3200, 3000, 2800],
          },
          {
            year: '2025',
            data: [6700, 5700, 4700, 4200, 4000, 3800, 3600, 3400, 3200, 3000],
          },
        ],
      },
      costChanges: {
        categories: ['2024', '2025'],
        series: [
          {
            year: '2024',
            data: [85, 78],
          },
          {
            year: '2025',
            data: [78, 88],
          },
        ],
      },
    },
    // Add more Chinese regions as needed
  }
};

// Function to get data for the current selection
export const getEnergyData = (country: string, state: string, city: string) => {
  const countryData = mockDataByCountry[country as keyof typeof mockDataByCountry];
  if (!countryData) return null;

  const stateData:any = countryData[state as keyof typeof countryData];
  if (!stateData) return null;

  const cityData = stateData.cities[city as keyof typeof stateData.cities];
  if (!cityData) return null;

  // Get the latest data (most recent 7 days)
  const recentData = cityData.slice(0, 7);

  // Calculate current consumption and cost (average of last 7 days)
  const currentConsumption = Math.round(
    recentData.reduce((sum:any, item:any) => sum + item.consumption, 0) / recentData.length
  );

  const currentCost = Math.round(
    recentData.reduce((sum:any, item:any) => sum + item.cost, 0) / recentData.length
  );

  // Calculate monthly trend for chart data
  const chartSeries = recentData.map((item:any) => item.consumption).reverse();

  return {
    currentConsumption,
    currentCost,
    chartSeries,
    energySources: stateData.energySources,
    topConsumers: stateData.topConsumers,
    costChanges: stateData.costChanges,
    dailyConsumption: recentData,
  };
};

// Export the merged electricity costs data for the table
// const electricityCosts = [
//   // Adding more realistic daily consumption data for cities
//   { id: '1', city: 'Karachi', consumption: 5100 },
//   { id: '2', city: 'Lahore', consumption: 4200 },
//   { id: '3', city: 'Islamabad', consumption: 3800 },
//   { id: '4', city: 'Peshawar', consumption: 3200 },
//   { id: '5', city: 'Quetta', consumption: 2400 },
//   { id: '6', city: 'Faisalabad', consumption: 3100 },
//   { id: '7', city: 'Multan', consumption: 2850 },
//   { id: '8', city: 'Hyderabad', consumption: 2900 },
//   { id: '9', city: 'Sukkur', consumption: 2200 },
//   { id: '10', city: 'Sialkot', consumption: 2450 },
// ];

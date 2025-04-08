// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, Tab, Tabs } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { _bankingRecentTransitions } from 'src/_mock';
import EcommerceWidgetSummary from '../../e-commerce/ecommerce-widget-summary';
import EcommerceYearlySales from '../../e-commerce/ecommerce-yearly-sales';
import BankingBalanceStatistics from '../../banking/banking-balance-statistics';
import EnergyProduction from '../energy-production';
import BankingRecentTransitions from '../../banking/banking-recent-transitions';

// Mock data import
// import mockEnergyData from './mockEnergyData';

// Mock JSON API data for Energy Consumption/Generation App for Pakistan
const mockEnergyData:any = {
  // Data for Punjab province with 2 clients
  punjab: {
    clients: [
      {
        id: "client-pb-001",
        name: "Lahore Industrial Complex",
        location: "Lahore, Punjab",
        day: {
          totalConsumption: {
            value: 765,
            percentChange: 2.6,
            chartData: [22, 58, 65, 72, 82, 94, 87, 72, 67, 43] // hourly data points
          },
          currentUsage: {
            value: 83,
            percentChange: -0.1,
            chartData: [56, 67, 72, 62, 58, 54, 49, 54, 67, 68] // hourly data points
          },
          energyBySource: [
            { label: "Solar Energy", value: 22 },
            { label: "(WAPDA) - Electricity", value: 48 },
            { label: "Generator", value: 30 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [10, 41, 65, 51, 49, 62, 69, 51] },
              { name: "Generation", data: [5, 34, 23, 56, 47, 38, 29, 17] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [22, 41, 65, 51, 49, 62, 69, 51]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 52, 65, 72, 58]
              }
            ],
            percentChange: 7.3
          },
          costs: {
            totalCost: 15300, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 11424, // PKR
              "Generator": 3876 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        month: {
          totalConsumption: {
            value: 18765,
            percentChange: 3.8,
            chartData: [565, 688, 725, 662, 598, 634, 719, 742, 677, 653, 621, 643, 702, 732, 765, 722, 689, 655, 672, 688, 712, 735, 678, 645, 590, 634, 678, 723, 745, 698]
          },
          currentUsage: {
            value: 698,
            percentChange: 1.2,
            chartData: [565, 588, 625, 662, 698, 734, 719, 702, 677, 653, 621, 643, 662, 682, 695, 722, 709, 675, 642, 618, 642, 675, 698, 725, 690, 674, 658, 673, 698, 713]
          },
          energyBySource: [
            { label: "Solar Energy", value: 26 },
            { label: "(WAPDA) - Electricity", value: 45 },
            { label: "Generator", value: 29 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [4980, 5240, 4860, 3685] },
              { name: "Generation", data: [1325, 1450, 1375, 1280] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [4980, 5240, 4860, 3685, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 4950]
              }
            ],
            percentChange: 5.2
          },
          costs: {
            totalCost: 375300, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 263768, // PKR
              "Generator": 111532 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        year: {
          totalConsumption: {
            value: 217850,
            percentChange: 12.4,
            chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
          },
          currentUsage: {
            value: 16005,
            percentChange: -5.8,
            chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
          },
          energyBySource: [
            { label: "Solar Energy", value: 31 },
            { label: "(WAPDA) - Electricity", value: 42 },
            { label: "Generator", value: 27 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005] },
              { name: "Generation", data: [5630, 5394, 5968, 5904, 6072, 6261, 6341, 6153, 5759, 5264, 5295, 4802] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [16870, 16230, 17340, 16580, 16070, 17060, 17850, 16780, 15700, 15280, 15890, 14400]
              },
              {
                name: "This Year",
                data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
              }
            ],
            percentChange: 12.4
          },
          costs: {
            totalCost: 4357000, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 2857350, // PKR
              "Generator": 1499650 // PKR
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        }
      },
      {
        id: "client-pb-002",
        name: "Faisalabad Textile Mills",
        location: "Faisalabad, Punjab",
        day: {
          totalConsumption: {
            value: 842,
            percentChange: 4.2,
            chartData: [34, 68, 75, 92, 102, 114, 107, 95, 83, 72]
          },
          currentUsage: {
            value: 72,
            percentChange: -2.1,
            chartData: [62, 79, 88, 93, 89, 84, 79, 76, 74, 72]
          },
          energyBySource: [
            { label: "Solar Energy", value: 18 },
            { label: "(WAPDA) - Electricity", value: 52 },
            { label: "Generator", value: 30 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [34, 68, 95, 102, 114, 107, 95, 72] },
              { name: "Generation", data: [6, 12, 17, 16, 19, 17, 13, 7] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [34, 68, 95, 102, 114, 107, 95, 72]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 118, 112, 98, 75]
              }
            ],
            percentChange: 5.8
          },
          costs: {
            totalCost: 17682, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 13676, // PKR
              "Generator": 4006 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        month: {
          totalConsumption: {
            value: 24650,
            percentChange: 6.8,
            chartData: [712, 765, 828, 875, 842, 798, 765, 812, 845, 872, 835, 805, 778, 802, 834, 867, 842, 815, 787, 762, 787, 812, 845, 878, 842, 815, 787, 798, 825, 842]
          },
          currentUsage: {
            value: 842,
            percentChange: 2.2,
            chartData: [765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798]
          },
          energyBySource: [
            { label: "Solar Energy", value: 20 },
            { label: "(WAPDA) - Electricity", value: 55 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [5970, 6120, 6340, 6220] },
              { name: "Generation", data: [1075, 1200, 1375, 1180] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [5970, 6120, 6340, 6220, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 6380]
              }
            ],
            percentChange: 7.2
          },
          costs: {
            totalCost: 493000, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 423225, // PKR
              "Generator": 69775 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        year: {
          totalConsumption: {
            value: 286500,
            percentChange: 15.2,
            chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
          },
          currentUsage: {
            value: 19200,
            percentChange: -12.5,
            chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
          },
          energyBySource: [
            { label: "Solar Energy", value: 22 },
            { label: "(WAPDA) - Electricity", value: 51 },
            { label: "Generator", value: 27 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200] },
              { name: "Generation", data: [4950, 4794, 5159, 5423, 5676, 5984, 5885, 5588, 5346, 5170, 4829, 4224] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [19550, 18966, 20402, 21446, 22446, 23664, 23273, 22098, 21141, 20445, 19097, 16704]
              },
              {
                name: "This Year",
                data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
              }
            ],
            percentChange: 15.2
          },
          costs: {
            totalCost: 5730000, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 4560240, // PKR
              "Generator": 1169760 // PKR
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        }
      }
    ],
    // Provincial aggregated data
    aggregated: {
      day: {
        totalConsumption: {
          value: 1607,
          percentChange: 3.4,
          chartData: [56, 126, 140, 164, 184, 208, 194, 167, 150, 115]
        },
        currentUsage: {
          value: 155,
          percentChange: -1.2,
          chartData: [118, 146, 160, 155, 147, 138, 128, 130, 141, 155]
        },
        energyBySource: [
          { label: "Solar Energy", value: 20 },
          { label: "(WAPDA) - Electricity", value: 50 },
          { label: "Generator", value: 30 }
        ],
        changeInUsage: {
          categories: ["Today", "Yesterday",],
          data: [
            { name: "Consumption", data: [44, 109] },
            { name: "Generation", data: [11, 46] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [44, 109, 160, 153, 163, 169, 164, 123]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 170, 177, 170, 133]
            }
          ],
          percentChange: 6.5
        },
        costs: {
          totalCost: 32982, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 25100, // PKR
            "Generator": 7882 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 43415,
          percentChange: 5.3,
          chartData: [1277, 1453, 1553, 1537, 1440, 1432, 1484, 1554, 1522, 1525, 1456, 1448, 1480, 1534, 1599, 1589, 1531, 1470, 1459, 1450, 1499, 1547, 1523, 1523, 1480, 1449, 1465, 1521, 1570, 1540]
        },
        currentUsage: {
          value: 1540,
          percentChange: 1.7,
          chartData: [1330, 1386, 1450, 1504, 1523, 1532, 1484, 1444, 1442, 1451, 1446, 1485, 1487, 1480, 1460, 1464, 1474, 1473, 1429, 1380, 1407, 1473, 1523, 1567, 1532, 1489, 1445, 1471, 1523, 1540]
        },
        energyBySource: [
          { label: "Solar Energy", value: 23 },
          { label: "(WAPDA) - Electricity", value: 50 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Mar", "Apr"],
          data: [
            { name: "Consumption", data: [10950, 11360] },
            { name: "Generation", data: [2400, 2650] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [10950, 11360, 11200, 9905, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 11330]
            }
          ],
          percentChange: 6.2
        },
        costs: {
          totalCost: 868300, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 686993, // PKR
            "Generator": 181307 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 504350,
          percentChange: 13.8,
          chartData: [41265, 39780, 42700, 43100, 43660, 46170, 46590, 44050, 41750, 40480, 39600, 35205]
        },
        currentUsage: {
          value: 35205,
          percentChange: -9.2,
          chartData: [41265, 39780, 42700, 43100, 43660, 46170, 46590, 44050, 41750, 40480, 39600, 35205]
        },
        energyBySource: [
          { label: "Solar Energy", value: 27 },
          { label: "(WAPDA) - Electricity", value: 46 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["2024", "2025",],          data: [
            { name: "Consumption", data: [41265, 39780,] },
            { name: "Generation", data: [10580, 10188,] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [36420, 35196, 37742, 38026, 38541, 40775, 41123, 38916, 36894, 35743, 34975, 31104]
            },
            {
              name: "This Year",
              data: [41265, 39780, 42700, 43100, 43660, 46170, 46590, 44050, 41750, 40480, 39600, 35205]
            }
          ],
          percentChange: 13.8
        },
        costs: {
          totalCost: 10087000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 7417590, // PKR
            "Generator": 2669410 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
    }
  },
  sindh: {
    clients: [
      {
        id: "client-sd-001",
        name: "Karachi Power Plant",
        location: "Karachi, Sindh",
        day: {
          totalConsumption: {
            value: 982,
            percentChange: 3.1,
            chartData: [45, 62, 78, 85, 97, 105, 98, 92, 84, 76]
          },
          currentUsage: {
            value: 91,
            percentChange: -0.5,
            chartData: [67, 73, 78, 81, 76, 70, 65, 63, 69, 72]
          },
          energyBySource: [
            { label: "Solar Energy", value: 28 },
            { label: "(WAPDA) - Electricity", value: 47 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Today", "Yesterday",],            data: [
              { name: "Consumption", data: [32, 58 ] },
              { name: "Generation", data: [8, 14] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [32, 58, 79, 86, 91, 95, 88, 72]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 96, 100, 91, 75]
              }
            ],
            percentChange: 4.5
          },
          costs: {
            totalCost: 19820,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 14700,
              "Generator": 5120
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        month: {
          totalConsumption: {
            value: 29450,
            percentChange: 5.4,
            chartData: [812, 845, 875, 902, 967, 1010, 982, 934, 915, 878, 845, 812, 799, 823, 857, 894, 872, 847, 818, 795, 821, 855, 890, 912, 873, 845, 813, 829, 864, 898]
          },
          currentUsage: {
            value: 898,
            percentChange: 2.3,
            chartData: [845, 870, 893, 918, 941, 976, 958, 933, 912, 898, 881, 869, 857, 842, 828, 811, 795, 779, 765, 754, 742, 730, 715, 704, 693, 682, 670, 659, 648, 637]
          },
          energyBySource: [
            { label: "Solar Energy", value: 25 },
            { label: "(WAPDA) - Electricity", value: 50 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Mar", "Apr"],
            data: [
              { name: "Consumption", data: [6975, 7350] },
              { name: "Generation", data: [1225, 1375] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [6975, 7350, 7680, 7445, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 7630]
              }
            ],
            percentChange: 6.1
          },
          costs: {
            totalCost: 582900,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 456000,
              "Generator": 126900
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        year: {
          totalConsumption: {
            value: 329000,
            percentChange: 13.6,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          currentUsage: {
            value: 23000,
            percentChange: -11.5,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          energyBySource: [
            { label: "Solar Energy", value: 27 },
            { label: "(WAPDA) - Electricity", value: 48 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["2024", "2025",],          
              data: [
              { name: "Consumption", data: [25000, 26100,] },
              { name: "Generation", data: [6750, 7000, ] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [22200, 23280, 24320, 25400, 26520, 27640, 27080, 26080, 24800, 23940, 22800, 20400]
              },
              {
                name: "This Year",
                data: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
              }
            ],
            percentChange: 13.6
          },
          costs: {
            totalCost: 6580000,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 4987200,
              "Generator": 1592800
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        }
      },

      {
        id: "client-sd-002",
        name: "Hyderabad Agro Industries",
        location: "Hyderabad, Sindh",
        day: {
          totalConsumption: {
            value: 655,
            percentChange: 2.4,
            chartData: [30, 42, 53, 61, 67, 73, 68, 64, 58, 50]
          },
          currentUsage: {
            value: 59,
            percentChange: -1.0,
            chartData: [49, 52, 56, 59, 60, 58, 56, 53, 51, 49]
          },
          energyBySource: [
            { label: "Solar Energy", value: 24 },
            { label: "(WAPDA) - Electricity", value: 51 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Today", "Yesterday",],
            data: [
              { name: "Consumption", data: [28, 42] },
              { name: "Generation", data: [7, 12] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [28, 42, 53, 61, 67, 73, 68, 50]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 69, 75, 71, 52]
              }
            ],
            percentChange: 4.1
          },
          costs: {
            totalCost: 13660,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 10520,
              "Generator": 3140
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        // Similar structure for month and year...
      }
    ],
    aggregated: {
      day: {
        totalConsumption: {
          value: 1407,
          percentChange: 2.9,
          chartData: [26, 104, 106, 114, 174, 199, 183, 159, 141, 111]
        },
        currentUsage: {
          value: 137,
          percentChange: -1.5,
          chartData: [107, 126, 140, 147, 137, 128, 130, 141, 155, 161]
        },
        energyBySource: [
          { label: "Solar Energy", value: 17 },
          { label: "(WAPDA) - Electricity", value: 43 },
          { label: "Generator", value: 33 }
        ],
        changeInUsage: {
          categories: ["Mar", "Apr"],
          data: [
            { name: "Consumption", data: [41, 97] },
            { name: "Generation", data: [17, 49] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [44, 109, 160, 153, 163, 169, 164, 123]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 170, 177, 170, 133]
            }
          ],
          percentChange: 6.5
        },
        costs: {
          totalCost: 27982, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 23100, // PKR
            "Generator": 4882 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.9, // PKR per kWh
            "Generator": 42.9 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 27212,
          percentChange: 5.33,
          chartData: [ 867, 842, 815, 787, 845, 872, 835,  802, 834,  762, 787, 812, 845, 878, 842, 815,805, 778, 787, 798, 825, 712, 765, 828, 875, 842, 798, 765, 812, 842]
        },
        currentUsage: {
          value: 899,
          percentChange: 2.7,
          chartData: [ 798, 825, 842,  765, 742, 765,  742, 765, 825, 798, 765, 798, 825, 842, 825, 798, 798, 825, 765, 798, 825, 842, 825, 798, 765, 742, 765, 842, 825, 798]
        },
        energyBySource: [
          { label: "Solar Energy", value: 21 },
          { label: "(WAPDA) - Electricity", value: 59 },
          { label: "Generator", value: 29 }
        ],
        changeInUsage: {
          categories: ["2024", "2025",],
               
            data: [
            { name: "Consumption", data: [6370, 6720] },
            { name: "Generation", data: [1115, 1301] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [6970, 6320, 5940, 6211, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 6380]
            }
          ],
          percentChange: 7.2
        },
        costs: {
          totalCost: 493000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 423225, // PKR
            "Generator": 69775 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 286500,
          percentChange: 15.2,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        currentUsage: {
          value: 19200,
          percentChange: -12.5,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        energyBySource: [
          { label: "Solar Energy", value: 22 },
          { label: "(WAPDA) - Electricity", value: 51 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [
            { name: "Consumption", data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200] },
            { name: "Generation", data: [4950, 4794, 5159, 5423, 5676, 5984, 5885, 5588, 5346, 5170, 4829, 4224] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [19550, 18966, 20402, 21446, 22446, 23664, 23273, 22098, 21141, 20445, 19097, 16704]
            },
            {
              name: "This Year",
              data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
            }
          ],
          percentChange: 15.2
        },
        costs: {
          totalCost: 5730000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 4560240, // PKR
            "Generator": 1169760 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
    }
  },
  islamabad: {
    clients: [
      {
        id: "client-pb-001",
        name: "Lahore Industrial Complex",
        location: "Lahore, Punjab",
        day: {
          totalConsumption: {
            value: 765,
            percentChange: 2.6,
            chartData: [22, 58, 65, 72, 82, 94, 87, 72, 67, 43] // hourly data points
          },
          currentUsage: {
            value: 83,
            percentChange: -0.1,
            chartData: [56, 67, 72, 62, 58, 54, 49, 54, 67, 68] // hourly data points
          },
          energyBySource: [
            { label: "Solar Energy", value: 22 },
            { label: "(WAPDA) - Electricity", value: 48 },
            { label: "Generator", value: 30 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [10, 41, 65, 51, 49, 62, 69, 51] },
              { name: "Generation", data: [5, 34, 23, 56, 47, 38, 29, 17] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [22, 41, 65, 51, 49, 62, 69, 51]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 52, 65, 72, 58]
              }
            ],
            percentChange: 7.3
          },
          costs: {
            totalCost: 15300, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 11424, // PKR
              "Generator": 3876 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        month: {
          totalConsumption: {
            value: 18765,
            percentChange: 3.8,
            chartData: [565, 688, 725, 662, 598, 634, 719, 742, 677, 653, 621, 643, 702, 732, 765, 722, 689, 655, 672, 688, 712, 735, 678, 645, 590, 634, 678, 723, 745, 698]
          },
          currentUsage: {
            value: 698,
            percentChange: 1.2,
            chartData: [565, 588, 625, 662, 698, 734, 719, 702, 677, 653, 621, 643, 662, 682, 695, 722, 709, 675, 642, 618, 642, 675, 698, 725, 690, 674, 658, 673, 698, 713]
          },
          energyBySource: [
            { label: "Solar Energy", value: 26 },
            { label: "(WAPDA) - Electricity", value: 45 },
            { label: "Generator", value: 29 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [4980, 5240, 4860, 3685] },
              { name: "Generation", data: [1325, 1450, 1375, 1280] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [4980, 5240, 4860, 3685, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 4950]
              }
            ],
            percentChange: 5.2
          },
          costs: {
            totalCost: 375300, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 263768, // PKR
              "Generator": 111532 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        year: {
          totalConsumption: {
            value: 217850,
            percentChange: 12.4,
            chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
          },
          currentUsage: {
            value: 16005,
            percentChange: -5.8,
            chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
          },
          energyBySource: [
            { label: "Solar Energy", value: 31 },
            { label: "(WAPDA) - Electricity", value: 42 },
            { label: "Generator", value: 27 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005] },
              { name: "Generation", data: [5630, 5394, 5968, 5904, 6072, 6261, 6341, 6153, 5759, 5264, 5295, 4802] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [16870, 16230, 17340, 16580, 16070, 17060, 17850, 16780, 15700, 15280, 15890, 14400]
              },
              {
                name: "This Year",
                data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
              }
            ],
            percentChange: 12.4
          },
          costs: {
            totalCost: 4357000, // PKR
            costBySource: {
              "Solar Energy": 0, // Free after installation
              "(WAPDA) - Electricity": 2857350, // PKR
              "Generator": 1499650 // PKR
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        }
      },
      {
        id: "client-pb-002",
        name: "Faisalabad Textile Mills",
        location: "Faisalabad, Punjab",
        day: {
          totalConsumption: {
            value: 842,
            percentChange: 4.2,
            chartData: [34, 68, 75, 92, 102, 114, 107, 95, 83, 72]
          },
          currentUsage: {
            value: 72,
            percentChange: -2.1,
            chartData: [62, 79, 88, 93, 89, 84, 79, 76, 74, 72]
          },
          energyBySource: [
            { label: "Solar Energy", value: 18 },
            { label: "(WAPDA) - Electricity", value: 52 },
            { label: "Generator", value: 30 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [34, 68, 95, 102, 114, 107, 95, 72] },
              { name: "Generation", data: [6, 12, 17, 16, 19, 17, 13, 7] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [34, 68, 95, 102, 114, 107, 95, 72]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 118, 112, 98, 75]
              }
            ],
            percentChange: 5.8
          },
          costs: {
            totalCost: 17682, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 13676, // PKR
              "Generator": 4006 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        month: {
          totalConsumption: {
            value: 24650,
            percentChange: 6.8,
            chartData: [712, 765, 828, 875, 842, 798, 765, 812, 845, 872, 835, 805, 778, 802, 834, 867, 842, 815, 787, 762, 787, 812, 845, 878, 842, 815, 787, 798, 825, 842]
          },
          currentUsage: {
            value: 842,
            percentChange: 2.2,
            chartData: [765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798]
          },
          energyBySource: [
            { label: "Solar Energy", value: 20 },
            { label: "(WAPDA) - Electricity", value: 55 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [5970, 6120, 6340, 6220] },
              { name: "Generation", data: [1075, 1200, 1375, 1180] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [5970, 6120, 6340, 6220, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 6380]
              }
            ],
            percentChange: 7.2
          },
          costs: {
            totalCost: 493000, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 423225, // PKR
              "Generator": 69775 // PKR
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        },
        year: {
          totalConsumption: {
            value: 286500,
            percentChange: 15.2,
            chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
          },
          currentUsage: {
            value: 19200,
            percentChange: -12.5,
            chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
          },
          energyBySource: [
            { label: "Solar Energy", value: 22 },
            { label: "(WAPDA) - Electricity", value: 51 },
            { label: "Generator", value: 27 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200] },
              { name: "Generation", data: [4950, 4794, 5159, 5423, 5676, 5984, 5885, 5588, 5346, 5170, 4829, 4224] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [19550, 18966, 20402, 21446, 22446, 23664, 23273, 22098, 21141, 20445, 19097, 16704]
              },
              {
                name: "This Year",
                data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
              }
            ],
            percentChange: 15.2
          },
          costs: {
            totalCost: 5730000, // PKR
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 4560240, // PKR
              "Generator": 1169760 // PKR
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2, // PKR per kWh
              "Generator": 42.6 // PKR per kWh (including fuel)
            }
          }
        }
      }
    ],
    // Provincial aggregated data
    aggregated: {
      day: {
        totalConsumption: {
          value: 765,
          percentChange: 2.6,
          chartData: [22, 58, 65, 72, 82, 94, 87, 72, 67, 43] // hourly data points
        },
        currentUsage: {
          value: 83,
          percentChange: -0.1,
          chartData: [56, 67, 72, 62, 58, 54, 49, 54, 67, 68] // hourly data points
        },
        energyBySource: [
          { label: "Solar Energy", value: 22 },
          { label: "(WAPDA) - Electricity", value: 48 },
          { label: "Generator", value: 30 }
        ],
        changeInUsage: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          data: [
            { name: "Consumption", data: [10, 41, 65, 51, 49, 62, 69, 51] },
            { name: "Generation", data: [5, 34, 23, 56, 47, 38, 29, 17] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [22, 41, 65, 51, 49, 62, 69, 51]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 52, 65, 72, 58]
            }
          ],
          percentChange: 7.3
        },
        costs: {
          totalCost: 15300, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 11424, // PKR
            "Generator": 3876 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 18765,
          percentChange: 3.8,
          chartData: [565, 688, 725, 662, 598, 634, 719, 742, 677, 653, 621, 643, 702, 732, 765, 722, 689, 655, 672, 688, 712, 735, 678, 645, 590, 634, 678, 723, 745, 698]
        },
        currentUsage: {
          value: 698,
          percentChange: 1.2,
          chartData: [565, 588, 625, 662, 698, 734, 719, 702, 677, 653, 621, 643, 662, 682, 695, 722, 709, 675, 642, 618, 642, 675, 698, 725, 690, 674, 658, 673, 698, 713]
        },
        energyBySource: [
          { label: "Solar Energy", value: 26 },
          { label: "(WAPDA) - Electricity", value: 45 },
          { label: "Generator", value: 29 }
        ],
        changeInUsage: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [
            { name: "Consumption", data: [4980, 5240, 4860, 3685] },
            { name: "Generation", data: [1325, 1450, 1375, 1280] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [4980, 5240, 4860, 3685, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 4950]
            }
          ],
          percentChange: 5.2
        },
        costs: {
          totalCost: 375300, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 263768, // PKR
            "Generator": 111532 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 217850,
          percentChange: 12.4,
          chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
        },
        currentUsage: {
          value: 16005,
          percentChange: -5.8,
          chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
        },
        energyBySource: [
          { label: "Solar Energy", value: 31 },
          { label: "(WAPDA) - Electricity", value: 42 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [
            { name: "Consumption", data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005] },
            { name: "Generation", data: [5630, 5394, 5968, 5904, 6072, 6261, 6341, 6153, 5759, 5264, 5295, 4802] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [16870, 16230, 17340, 16580, 16070, 17060, 17850, 16780, 15700, 15280, 15890, 14400]
            },
            {
              name: "This Year",
              data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
            }
          ],
          percentChange: 12.4
        },
        costs: {
          totalCost: 4357000, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 2857350, // PKR
            "Generator": 1499650 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
    }
  },
  balochistan: {
    clients: [
      {
        id: "client-sd-001",
        name: "Karachi Power Plant",
        location: "Karachi, Sindh",
        day: {
          totalConsumption: {
            value: 982,
            percentChange: 3.1,
            chartData: [45, 62, 78, 85, 97, 105, 98, 92, 84, 76]
          },
          currentUsage: {
            value: 91,
            percentChange: -0.5,
            chartData: [67, 73, 78, 81, 76, 70, 65, 63, 69, 72]
          },
          energyBySource: [
            { label: "Solar Energy", value: 28 },
            { label: "(WAPDA) - Electricity", value: 47 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [32, 58, 79, 86, 91, 95, 88, 72] },
              { name: "Generation", data: [8, 14, 19, 23, 24, 22, 18, 10] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [32, 58, 79, 86, 91, 95, 88, 72]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 96, 100, 91, 75]
              }
            ],
            percentChange: 4.5
          },
          costs: {
            totalCost: 19820,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 14700,
              "Generator": 5120
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        month: {
          totalConsumption: {
            value: 29450,
            percentChange: 5.4,
            chartData: [812, 845, 875, 902, 967, 1010, 982, 934, 915, 878, 845, 812, 799, 823, 857, 894, 872, 847, 818, 795, 821, 855, 890, 912, 873, 845, 813, 829, 864, 898]
          },
          currentUsage: {
            value: 898,
            percentChange: 2.3,
            chartData: [845, 870, 893, 918, 941, 976, 958, 933, 912, 898, 881, 869, 857, 842, 828, 811, 795, 779, 765, 754, 742, 730, 715, 704, 693, 682, 670, 659, 648, 637]
          },
          energyBySource: [
            { label: "Solar Energy", value: 25 },
            { label: "(WAPDA) - Electricity", value: 50 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [6975, 7350, 7680, 7445] },
              { name: "Generation", data: [1225, 1375, 1495, 1325] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [6975, 7350, 7680, 7445, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 7630]
              }
            ],
            percentChange: 6.1
          },
          costs: {
            totalCost: 582900,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 456000,
              "Generator": 126900
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        year: {
          totalConsumption: {
            value: 329000,
            percentChange: 13.6,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          currentUsage: {
            value: 23000,
            percentChange: -11.5,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          energyBySource: [
            { label: "Solar Energy", value: 27 },
            { label: "(WAPDA) - Electricity", value: 48 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000] },
              { name: "Generation", data: [6750, 7000, 7280, 7500, 7820, 8050, 7950, 7620, 7280, 7010, 6680, 5980] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [22200, 23280, 24320, 25400, 26520, 27640, 27080, 26080, 24800, 23940, 22800, 20400]
              },
              {
                name: "This Year",
                data: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
              }
            ],
            percentChange: 13.6
          },
          costs: {
            totalCost: 6580000,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 4987200,
              "Generator": 1592800
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        }
      },

      {
        id: "client-sd-002",
        name: "Hyderabad Agro Industries",
        location: "Hyderabad, Sindh",
        day: {
          totalConsumption: {
            value: 655,
            percentChange: 2.4,
            chartData: [30, 42, 53, 61, 67, 73, 68, 64, 58, 50]
          },
          currentUsage: {
            value: 59,
            percentChange: -1.0,
            chartData: [49, 52, 56, 59, 60, 58, 56, 53, 51, 49]
          },
          energyBySource: [
            { label: "Solar Energy", value: 24 },
            { label: "(WAPDA) - Electricity", value: 51 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [28, 42, 53, 61, 67, 73, 68, 50] },
              { name: "Generation", data: [7, 12, 15, 17, 19, 18, 14, 8] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [28, 42, 53, 61, 67, 73, 68, 50]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 69, 75, 71, 52]
              }
            ],
            percentChange: 4.1
          },
          costs: {
            totalCost: 13660,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 10520,
              "Generator": 3140
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        // Similar structure for month and year...
      }
    ],
    aggregated: {
      day: {
        totalConsumption: {
          value: 815,
          percentChange: 2.6,
          chartData: [72, 82, 94, 87, 72, 67, 22, 58, 65, 43] // hourly data points
        },
        currentUsage: {
          value: 83,
          percentChange: -0.1,
          chartData: [56, 67, 72, 62, 58, 54, 49, 54, 67, 68] // hourly data points
        },
        energyBySource: [
          { label: "Solar Energy", value: 22 },
          { label: "(WAPDA) - Electricity", value: 48 },
          { label: "Generator", value: 30 }
        ],
        changeInUsage: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          data: [
            { name: "Consumption", data: [10, 41, 65, 51, 49, 62, 69, 51] },
            { name: "Generation", data: [5, 34, 23, 56, 47, 38, 29, 17] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [22, 41, 65, 51, 49, 62, 69, 51]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 52, 65, 72, 58]
            }
          ],
          percentChange: 7.3
        },
        costs: {
          totalCost: 15300, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 11424, // PKR
            "Generator": 3876 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 18765,
          percentChange: 3.8,
          chartData: [565, 688, 725, 662, 598, 634, 719, 742, 677, 653, 621, 643, 702, 732, 765, 722, 689, 655, 672, 688, 712, 735, 678, 645, 590, 634, 678, 723, 745, 698]
        },
        currentUsage: {
          value: 698,
          percentChange: 1.2,
          chartData: [565, 588, 625, 662, 698, 734, 719, 702, 677, 653, 621, 643, 662, 682, 695, 722, 709, 675, 642, 618, 642, 675, 698, 725, 690, 674, 658, 673, 698, 713]
        },
        energyBySource: [
          { label: "Solar Energy", value: 26 },
          { label: "(WAPDA) - Electricity", value: 45 },
          { label: "Generator", value: 29 }
        ],
        changeInUsage: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [
            { name: "Consumption", data: [4980, 5240, 4860, 3685] },
            { name: "Generation", data: [1325, 1450, 1375, 1280] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [4980, 5240, 4860, 3685, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 4950]
            }
          ],
          percentChange: 5.2
        },
        costs: {
          totalCost: 375300, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 263768, // PKR
            "Generator": 111532 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 217850,
          percentChange: 12.4,
          chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
        },
        currentUsage: {
          value: 16005,
          percentChange: -5.8,
          chartData: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
        },
        energyBySource: [
          { label: "Solar Energy", value: 31 },
          { label: "(WAPDA) - Electricity", value: 42 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [
            { name: "Consumption", data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005] },
            { name: "Generation", data: [5630, 5394, 5968, 5904, 6072, 6261, 6341, 6153, 5759, 5264, 5295, 4802] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [16870, 16230, 17340, 16580, 16070, 17060, 17850, 16780, 15700, 15280, 15890, 14400]
            },
            {
              name: "This Year",
              data: [18765, 17980, 19250, 18450, 17860, 18970, 19840, 18650, 17450, 16980, 17650, 16005]
            }
          ],
          percentChange: 12.4
        },
        costs: {
          totalCost: 4357000, // PKR
          costBySource: {
            "Solar Energy": 0, // Free after installation
            "(WAPDA) - Electricity": 2857350, // PKR
            "Generator": 1499650 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
    }
  },
  kashmir: {
    clients: [
      {
        id: "client-sd-001",
        name: "Karachi Power Plant",
        location: "Karachi, Sindh",
        day: {
          totalConsumption: {
            value: 982,
            percentChange: 3.1,
            chartData: [45, 62, 78, 85, 97, 105, 98, 92, 84, 76]
          },
          currentUsage: {
            value: 91,
            percentChange: -0.5,
            chartData: [67, 73, 78, 81, 76, 70, 65, 63, 69, 72]
          },
          energyBySource: [
            { label: "Solar Energy", value: 28 },
            { label: "(WAPDA) - Electricity", value: 47 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [32, 58, 79, 86, 91, 95, 88, 72] },
              { name: "Generation", data: [8, 14, 19, 23, 24, 22, 18, 10] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [32, 58, 79, 86, 91, 95, 88, 72]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 96, 100, 91, 75]
              }
            ],
            percentChange: 4.5
          },
          costs: {
            totalCost: 19820,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 14700,
              "Generator": 5120
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        month: {
          totalConsumption: {
            value: 29450,
            percentChange: 5.4,
            chartData: [812, 845, 875, 902, 967, 1010, 982, 934, 915, 878, 845, 812, 799, 823, 857, 894, 872, 847, 818, 795, 821, 855, 890, 912, 873, 845, 813, 829, 864, 898]
          },
          currentUsage: {
            value: 898,
            percentChange: 2.3,
            chartData: [845, 870, 893, 918, 941, 976, 958, 933, 912, 898, 881, 869, 857, 842, 828, 811, 795, 779, 765, 754, 742, 730, 715, 704, 693, 682, 670, 659, 648, 637]
          },
          energyBySource: [
            { label: "Solar Energy", value: 25 },
            { label: "(WAPDA) - Electricity", value: 50 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [
              { name: "Consumption", data: [6975, 7350, 7680, 7445] },
              { name: "Generation", data: [1225, 1375, 1495, 1325] }
            ]
          },
          usageEstimate: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
            series: [
              {
                name: "Actual",
                data: [6975, 7350, 7680, 7445, null]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 7630]
              }
            ],
            percentChange: 6.1
          },
          costs: {
            totalCost: 582900,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 456000,
              "Generator": 126900
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        year: {
          totalConsumption: {
            value: 329000,
            percentChange: 13.6,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          currentUsage: {
            value: 23000,
            percentChange: -11.5,
            chartData: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
          },
          energyBySource: [
            { label: "Solar Energy", value: 27 },
            { label: "(WAPDA) - Electricity", value: 48 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [
              { name: "Consumption", data: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000] },
              { name: "Generation", data: [6750, 7000, 7280, 7500, 7820, 8050, 7950, 7620, 7280, 7010, 6680, 5980] }
            ]
          },
          usageEstimate: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            series: [
              {
                name: "Last Year",
                data: [22200, 23280, 24320, 25400, 26520, 27640, 27080, 26080, 24800, 23940, 22800, 20400]
              },
              {
                name: "This Year",
                data: [25000, 26100, 27300, 28500, 29800, 31000, 30350, 29100, 27800, 26900, 25650, 23000]
              }
            ],
            percentChange: 13.6
          },
          costs: {
            totalCost: 6580000,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 4987200,
              "Generator": 1592800
            },
            averageCostPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        }
      },

      {
        id: "client-sd-002",
        name: "Hyderabad Agro Industries",
        location: "Hyderabad, Sindh",
        day: {
          totalConsumption: {
            value: 655,
            percentChange: 2.4,
            chartData: [30, 42, 53, 61, 67, 73, 68, 64, 58, 50]
          },
          currentUsage: {
            value: 59,
            percentChange: -1.0,
            chartData: [49, 52, 56, 59, 60, 58, 56, 53, 51, 49]
          },
          energyBySource: [
            { label: "Solar Energy", value: 24 },
            { label: "(WAPDA) - Electricity", value: 51 },
            { label: "Generator", value: 25 }
          ],
          changeInUsage: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            data: [
              { name: "Consumption", data: [28, 42, 53, 61, 67, 73, 68, 50] },
              { name: "Generation", data: [7, 12, 15, 17, 19, 18, 14, 8] }
            ]
          },
          usageEstimate: {
            categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
            series: [
              {
                name: "Actual",
                data: [28, 42, 53, 61, 67, 73, 68, 50]
              },
              {
                name: "Forecast",
                data: [null, null, null, null, 69, 75, 71, 52]
              }
            ],
            percentChange: 4.1
          },
          costs: {
            totalCost: 13660,
            costBySource: {
              "Solar Energy": 0,
              "(WAPDA) - Electricity": 10520,
              "Generator": 3140
            },
            costPerKWh: {
              "(WAPDA) - Electricity": 31.2,
              "Generator": 42.6
            }
          }
        },
        // Similar structure for month and year...
      }
    ],
    aggregated: {
      day: {
        totalConsumption: {
          value: 842,
          percentChange: 4.2,
          chartData: [34, 68, 75, 92, 102, 114, 107, 95, 83, 72]
        },
        currentUsage: {
          value: 72,
          percentChange: -2.1,
          chartData: [62, 79, 88, 93, 89, 84, 79, 76, 74, 72]
        },
        energyBySource: [
          { label: "Solar Energy", value: 18 },
          { label: "(WAPDA) - Electricity", value: 52 },
          { label: "Generator", value: 30 }
        ],
        changeInUsage: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          data: [
            { name: "Consumption", data: [34, 68, 95, 102, 114, 107, 95, 72] },
            { name: "Generation", data: [6, 12, 17, 16, 19, 17, 13, 7] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [34, 68, 95, 102, 114, 107, 95, 72]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 118, 112, 98, 75]
            }
          ],
          percentChange: 5.8
        },
        costs: {
          totalCost: 17682, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 13676, // PKR
            "Generator": 4006 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 24650,
          percentChange: 6.8,
          chartData: [712, 765, 828, 875, 842, 798, 765, 812, 845, 872, 835, 805, 778, 802, 834, 867, 842, 815, 787, 762, 787, 812, 845, 878, 842, 815, 787, 798, 825, 842]
        },
        currentUsage: {
          value: 842,
          percentChange: 2.2,
          chartData: [765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798]
        },
        energyBySource: [
          { label: "Solar Energy", value: 20 },
          { label: "(WAPDA) - Electricity", value: 55 },
          { label: "Generator", value: 25 }
        ],
        changeInUsage: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [
            { name: "Consumption", data: [5970, 6120, 6340, 6220] },
            { name: "Generation", data: [1075, 1200, 1375, 1180] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [5970, 6120, 6340, 6220, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 6380]
            }
          ],
          percentChange: 7.2
        },
        costs: {
          totalCost: 493000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 423225, // PKR
            "Generator": 69775 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 286500,
          percentChange: 15.2,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        currentUsage: {
          value: 19200,
          percentChange: -12.5,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        energyBySource: [
          { label: "Solar Energy", value: 22 },
          { label: "(WAPDA) - Electricity", value: 51 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [
            { name: "Consumption", data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200] },
            { name: "Generation", data: [4950, 4794, 5159, 5423, 5676, 5984, 5885, 5588, 5346, 5170, 4829, 4224] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [19550, 18966, 20402, 21446, 22446, 23664, 23273, 22098, 21141, 20445, 19097, 16704]
            },
            {
              name: "This Year",
              data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
            }
          ],
          percentChange: 15.2
        },
        costs: {
          totalCost: 5730000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 4560240, // PKR
            "Generator": 1169760 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
    }
  },
  kpk:  {'clients': [{'id': 'client-pb-001',
      'name': 'Client 1',
      'location': 'Location 1, Punjab',
      'day': {'totalConsumption': {'value': 748,
          'percentChange': 3.1,
          'chartData': [29, 94, 57, 95, 47, 92, 70, 29, 46, 49]},
        'currentUsage': {'value': 70,
          'percentChange': 4.43,
          'chartData': [64, 78, 72, 60, 54, 70, 65, 66, 73, 63]},
        'energyBySource': [{'label': 'Solar Energy', 'value': 26},
          {'label': '(WAPDA) - Electricity', 'value': 46},
          {'label': 'Generator', 'value': 33}],
        'changeInUsage': {'categories': ['8AM',
            '10AM',
            '12PM',
            '2PM',
            '4PM',
            '6PM',
            '8PM',
            '10PM'],
          'data': [{'name': 'Consumption',
            'data': [88, 53, 23, 78, 26, 43, 84, 61]},
            {'name': 'Generation', 'data': [24, 5, 24, 39, 17, 16, 37, 46]}]},
        'usageEstimate': {'categories': ['8AM',
            '10AM',
            '12PM',
            '2PM',
            '4PM',
            '6PM',
            '8PM',
            '10PM'],
          'series': [{'name': 'Actual', 'data': [47, 91, 50, 67, 55, 72, 41, 83]},
            {'name': 'Forecast', 'data': [77, 71, 15, 31, 11, 15, 57, 63]}],
          'percentChange': -2.02},
        'costs': {'totalCost': 11394,
          'costBySource': {'Solar Energy': 0,
            '(WAPDA) - Electricity': 14078,
            'Generator': 2192},
          'costPerKWh': {'(WAPDA) - Electricity': 30.43, 'Generator': 49.58}}},
      'month': {'totalConsumption': {'value': 23618,
          'percentChange': 1.16,
          'chartData': [874,
            679,
            746,
            515,
            790,
            970,
            809,
            914,
            707,
            969,
            622,
            867,
            891,
            775,
            850,
            689,
            881,
            809,
            668,
            687,
            716,
            910,
            733,
            980,
            888,
            997,
            828,
            840,
            503,
            984]},
        'currentUsage': {'value': 607,
          'percentChange': -4.35,
          'chartData': [622,
            793,
            608,
            664,
            602,
            763,
            615,
            711,
            685,
            628,
            613,
            608,
            622,
            788,
            711,
            786,
            670,
            661,
            768,
            758,
            742,
            716,
            702,
            769,
            767,
            666,
            787,
            750,
            639,
            745]},
        'energyBySource': [{'label': 'Solar Energy', 'value': 21},
          {'label': '(WAPDA) - Electricity', 'value': 42},
          {'label': 'Generator', 'value': 31}],
        'changeInUsage': {'categories': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          'data': [{'name': 'Consumption', 'data': [1991, 2927, 3997, 2032]},
            {'name': 'Generation', 'data': [1172, 1762, 1085, 2228]}]},
        'usageEstimate': {'categories': ['Week 1',
            'Week 2',
            'Week 3',
            'Week 4',
            'Next Week'],
          'series': [{'name': 'Actual', 'data': [1345, 3064, 1102, 3272]},
            {'name': 'Forecast', 'data': [2098, 4132, 2630, 2482]}],
          'percentChange': 9.68},
        'costs': {'totalCost': 247226,
          'costBySource': {'Solar Energy': 0,
            '(WAPDA) - Electricity': 143666,
            'Generator': 43220},
          'costPerKWh': {'(WAPDA) - Electricity': 34.93, 'Generator': 44.46}}},
      'year': {'totalConsumption': {'value': 202595,
          'percentChange': 14.32,
          'chartData': [17397,
            20034,
            17911,
            21458,
            23738,
            23396,
            21410,
            17830,
            23039,
            21849,
            22557,
            24997]},
        'currentUsage': {'value': 15540,
          'percentChange': -0.79,
          'chartData': [23941,
            15575,
            16967,
            17453,
            15506,
            16816,
            20893,
            15655,
            19822,
            15083,
            18889,
            23910]},
        'energyBySource': [{'label': 'Solar Energy', 'value': 24},
          {'label': '(WAPDA) - Electricity', 'value': 53},
          {'label': 'Generator', 'value': 27}],
        'changeInUsage': {'categories': ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
          'data': [{'name': 'Consumption',
            'data': [22295,
              16121,
              24857,
              22729,
              16454,
              21553,
              17564,
              23844,
              17865,
              15409,
              20914,
              22608]},
            {'name': 'Generation',
              'data': [9154,
                9561,
                9384,
                9758,
                8374,
                7185,
                6263,
                6342,
                7016,
                7691,
                8878,
                9847]}]},
        'usageEstimate': {'categories': ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'],
          'series': [{'name': 'Last Year',
            'data': [20187,
              23863,
              18275,
              21325,
              17580,
              18686,
              21844,
              16134,
              17136,
              16642,
              19649,
              23454]},
            {'name': 'This Year',
              'data': [17437,
                22089,
                20328,
                18365,
                16977,
                19509,
                24587,
                23157,
                19313,
                24184,
                17474,
                20657]}],
          'percentChange': 11.79},
        'costs': {'totalCost': 6171197,
          'costBySource': {'Solar Energy': 0,
            '(WAPDA) - Electricity': 6417874,
            'Generator': 1647986},
          'averageCostPerKWh': {'(WAPDA) - Electricity': 33.9,
            'Generator': 49.75}}}},
      {'id': 'client-pb-002',
        'name': 'Client 2',
        'location': 'Location 2, Punjab',
        'day': {'totalConsumption': {'value': 797,
            'percentChange': -2.28,
            'chartData': [49, 20, 87, 99, 36, 46, 89, 63, 84, 42]},
          'currentUsage': {'value': 78,
            'percentChange': -0.31,
            'chartData': [77, 75, 63, 55, 74, 66, 63, 51, 57, 70]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 28},
            {'label': '(WAPDA) - Electricity', 'value': 50},
            {'label': 'Generator', 'value': 34}],
          'changeInUsage': {'categories': ['8AM',
              '10AM',
              '12PM',
              '2PM',
              '4PM',
              '6PM',
              '8PM',
              '10PM'],
            'data': [{'name': 'Consumption',
              'data': [81, 11, 32, 79, 87, 71, 49, 33]},
              {'name': 'Generation', 'data': [22, 34, 37, 8, 29, 27, 16, 39]}]},
          'usageEstimate': {'categories': ['8AM',
              '10AM',
              '12PM',
              '2PM',
              '4PM',
              '6PM',
              '8PM',
              '10PM'],
            'series': [{'name': 'Actual', 'data': [24, 76, 65, 98, 85, 84, 30, 78]},
              {'name': 'Forecast', 'data': [97, 95, 32, 10, 68, 33, 16, 16]}],
            'percentChange': 3.71},
          'costs': {'totalCost': 13069,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 6934,
              'Generator': 4990},
            'costPerKWh': {'(WAPDA) - Electricity': 36.05, 'Generator': 41.31}}},
        'month': {'totalConsumption': {'value': 23290,
            'percentChange': 5.66,
            'chartData': [931,
              606,
              986,
              941,
              587,
              960,
              833,
              620,
              966,
              635,
              873,
              635,
              850,
              665,
              773,
              811,
              838,
              714,
              687,
              528,
              770,
              702,
              629,
              760,
              914,
              910,
              982,
              530,
              727,
              983]},
          'currentUsage': {'value': 732,
            'percentChange': -4.79,
            'chartData': [676,
              637,
              608,
              767,
              798,
              762,
              708,
              752,
              742,
              707,
              610,
              633,
              677,
              669,
              713,
              685,
              760,
              738,
              726,
              749,
              771,
              702,
              606,
              614,
              668,
              679,
              641,
              793,
              670,
              776]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 23},
            {'label': '(WAPDA) - Electricity', 'value': 44},
            {'label': 'Generator', 'value': 27}],
          'changeInUsage': {'categories': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            'data': [{'name': 'Consumption', 'data': [2183, 3562, 4511, 4760]},
              {'name': 'Generation', 'data': [2242, 1431, 631, 966]}]},
          'usageEstimate': {'categories': ['Week 1',
              'Week 2',
              'Week 3',
              'Week 4',
              'Next Week'],
            'series': [{'name': 'Actual', 'data': [2925, 2888, 3911, 2669]},
              {'name': 'Forecast', 'data': [1409, 4414, 1376, 2378]}],
            'percentChange': 6.14},
          'costs': {'totalCost': 154414,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 186050,
              'Generator': 44056},
            'costPerKWh': {'(WAPDA) - Electricity': 38.75, 'Generator': 41.4}}},
        'year': {'totalConsumption': {'value': 225434,
            'percentChange': 11.48,
            'chartData': [16000,
              17337,
              19220,
              18476,
              21460,
              21558,
              16828,
              19323,
              23561,
              20040,
              24234,
              15204]},
          'currentUsage': {'value': 22875,
            'percentChange': -9.75,
            'chartData': [24297,
              17140,
              18976,
              19252,
              21521,
              16104,
              22891,
              23674,
              20407,
              16816,
              23117,
              19793]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 24},
            {'label': '(WAPDA) - Electricity', 'value': 55},
            {'label': 'Generator', 'value': 21}],
          'changeInUsage': {'categories': ['Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            'data': [{'name': 'Consumption',
              'data': [24971,
                24680,
                15502,
                17644,
                18711,
                21084,
                21056,
                15272,
                18089,
                15676,
                16114,
                16839]},
              {'name': 'Generation',
                'data': [7702,
                  6431,
                  9907,
                  8829,
                  9217,
                  8752,
                  5331,
                  7946,
                  9100,
                  5739,
                  5953,
                  5427]}]},
          'usageEstimate': {'categories': ['Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            'series': [{'name': 'Last Year',
              'data': [18291,
                20668,
                15358,
                22910,
                19842,
                17524,
                24555,
                23238,
                19085,
                17247,
                21922,
                19198]},
              {'name': 'This Year',
                'data': [24543,
                  19659,
                  18696,
                  18128,
                  23878,
                  22643,
                  22342,
                  17566,
                  21116,
                  19544,
                  16264,
                  18771]}],
            'percentChange': 11.55},
          'costs': {'totalCost': 9106048,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 4034069,
              'Generator': 1262633},
            'averageCostPerKWh': {'(WAPDA) - Electricity': 39.8,
              'Generator': 42.25}}}},
      {'id': 'client-pb-003',
        'name': 'Client 3',
        'location': 'Location 3, Punjab',
        'day': {'totalConsumption': {'value': 876,
            'percentChange': -3.32,
            'chartData': [57, 44, 68, 67, 23, 55, 72, 45, 37, 95]},
          'currentUsage': {'value': 71,
            'percentChange': -1.09,
            'chartData': [57, 74, 60, 58, 50, 71, 72, 55, 53, 70]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 20},
            {'label': '(WAPDA) - Electricity', 'value': 46},
            {'label': 'Generator', 'value': 28}],
          'changeInUsage': {'categories': ['8AM',
              '10AM',
              '12PM',
              '2PM',
              '4PM',
              '6PM',
              '8PM',
              '10PM'],
            'data': [{'name': 'Consumption',
              'data': [86, 48, 81, 65, 71, 91, 95, 44]},
              {'name': 'Generation', 'data': [36, 50, 42, 27, 49, 41, 11, 36]}]},
          'usageEstimate': {'categories': ['8AM',
              '10AM',
              '12PM',
              '2PM',
              '4PM',
              '6PM',
              '8PM',
              '10PM'],
            'series': [{'name': 'Actual',
              'data': [82, 75, 62, 32, 56, 100, 100, 74]},
              {'name': 'Forecast', 'data': [35, 49, 48, 97, 30, 62, 96, 41]}],
            'percentChange': -4.25},
          'costs': {'totalCost': 14016,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 11115,
              'Generator': 1731},
            'costPerKWh': {'(WAPDA) - Electricity': 32.11, 'Generator': 47.72}}},
        'month': {'totalConsumption': {'value': 26913,
            'percentChange': 3.95,
            'chartData': [995,
              883,
              875,
              691,
              516,
              782,
              831,
              799,
              809,
              902,
              583,
              894,
              646,
              938,
              524,
              999,
              753,
              758,
              892,
              992,
              709,
              531,
              703,
              676,
              581,
              822,
              743,
              984,
              597,
              548]},
          'currentUsage': {'value': 764,
            'percentChange': 9.94,
            'chartData': [730,
              627,
              643,
              636,
              713,
              622,
              696,
              692,
              747,
              795,
              659,
              784,
              744,
              620,
              754,
              606,
              600,
              631,
              628,
              684,
              792,
              628,
              738,
              723,
              616,
              787,
              646,
              609,
              681,
              649]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 20},
            {'label': '(WAPDA) - Electricity', 'value': 40},
            {'label': 'Generator', 'value': 38}],
          'changeInUsage': {'categories': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            'data': [{'name': 'Consumption', 'data': [1683, 1418, 3658, 4225]},
              {'name': 'Generation', 'data': [2342, 2026, 1462, 997]}]},
          'usageEstimate': {'categories': ['Week 1',
              'Week 2',
              'Week 3',
              'Week 4',
              'Next Week'],
            'series': [{'name': 'Actual', 'data': [2723, 3676, 3011, 4633]},
              {'name': 'Forecast', 'data': [4702, 3296, 3398, 4836]}],
            'percentChange': 2.2},
          'costs': {'totalCost': 231893,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 72406,
              'Generator': 24974},
            'costPerKWh': {'(WAPDA) - Electricity': 33.79, 'Generator': 42.15}}},
        'year': {'totalConsumption': {'value': 246319,
            'percentChange': 12.4,
            'chartData': [16120,
              24223,
              24037,
              20279,
              20621,
              19540,
              24707,
              21075,
              24354,
              19125,
              21248,
              23171]},
          'currentUsage': {'value': 20106,
            'percentChange': 0.13,
            'chartData': [24168,
              20225,
              19193,
              17463,
              21942,
              22835,
              18207,
              21922,
              23989,
              23034,
              21011,
              18815]},
          'energyBySource': [{'label': 'Solar Energy', 'value': 25},
            {'label': '(WAPDA) - Electricity', 'value': 53},
            {'label': 'Generator', 'value': 37}],
          'changeInUsage': {'categories': ['Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            'data': [{'name': 'Consumption',
              'data': [23527,
                23500,
                18191,
                22897,
                17090,
                23745,
                24774,
                18086,
                19786,
                19223,
                15536,
                18225]},
              {'name': 'Generation',
                'data': [9130,
                  9757,
                  8094,
                  6550,
                  7951,
                  8708,
                  8120,
                  7971,
                  5224,
                  9181,
                  5720,
                  6699]}]},
          'usageEstimate': {'categories': ['Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            'series': [{'name': 'Last Year',
              'data': [16974,
                18405,
                16672,
                22118,
                16064,
                23903,
                15519,
                16557,
                17922,
                15282,
                22843,
                22026]},
              {'name': 'This Year',
                'data': [15416,
                  22866,
                  21377,
                  24419,
                  15645,
                  18502,
                  19341,
                  22271,
                  16173,
                  15838,
                  21116,
                  15483]}],
            'percentChange': 9.07},
          'costs': {'totalCost': 5539448,
            'costBySource': {'Solar Energy': 0,
              '(WAPDA) - Electricity': 6779946,
              'Generator': 2349932},
            'averageCostPerKWh': {'(WAPDA) - Electricity': 36.82,
              'Generator': 47.93}}}}],
    'aggregated': {
      day: {
        totalConsumption: {
          value: 842,
          percentChange: 4.2,
          chartData: [34, 68, 75, 92, 102, 114, 107, 95, 83, 72]
        },
        currentUsage: {
          value: 72,
          percentChange: -2.1,
          chartData: [62, 79, 88, 93, 89, 84, 79, 76, 74, 72]
        },
        energyBySource: [
          { label: "Solar Energy", value: 18 },
          { label: "(WAPDA) - Electricity", value: 52 },
          { label: "Generator", value: 30 }
        ],
        changeInUsage: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          data: [
            { name: "Consumption", data: [34, 68, 95, 102, 114, 107, 95, 72] },
            { name: "Generation", data: [6, 12, 17, 16, 19, 17, 13, 7] }
          ]
        },
        usageEstimate: {
          categories: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
          series: [
            {
              name: "Actual",
              data: [34, 68, 95, 102, 114, 107, 95, 72]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 118, 112, 98, 75]
            }
          ],
          percentChange: 5.8
        },
        costs: {
          totalCost: 17682, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 13676, // PKR
            "Generator": 4006 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      month: {
        totalConsumption: {
          value: 24650,
          percentChange: 6.8,
          chartData: [712, 765, 828, 875, 842, 798, 765, 812, 845, 872, 835, 805, 778, 802, 834, 867, 842, 815, 787, 762, 787, 812, 845, 878, 842, 815, 787, 798, 825, 842]
        },
        currentUsage: {
          value: 842,
          percentChange: 2.2,
          chartData: [765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798, 765, 742, 765, 798, 825, 842, 825, 798]
        },
        energyBySource: [
          { label: "Solar Energy", value: 20 },
          { label: "(WAPDA) - Electricity", value: 55 },
          { label: "Generator", value: 25 }
        ],
        changeInUsage: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [
            { name: "Consumption", data: [5970, 6120, 6340, 6220] },
            { name: "Generation", data: [1075, 1200, 1375, 1180] }
          ]
        },
        usageEstimate: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Next Week"],
          series: [
            {
              name: "Actual",
              data: [5970, 6120, 6340, 6220, null]
            },
            {
              name: "Forecast",
              data: [null, null, null, null, 6380]
            }
          ],
          percentChange: 7.2
        },
        costs: {
          totalCost: 493000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 423225, // PKR
            "Generator": 69775 // PKR
          },
          costPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      },
      year: {
        totalConsumption: {
          value: 286500,
          percentChange: 15.2,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        currentUsage: {
          value: 19200,
          percentChange: -12.5,
          chartData: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
        },
        energyBySource: [
          { label: "Solar Energy", value: 22 },
          { label: "(WAPDA) - Electricity", value: 51 },
          { label: "Generator", value: 27 }
        ],
        changeInUsage: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [
            { name: "Consumption", data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200] },
            { name: "Generation", data: [4950, 4794, 5159, 5423, 5676, 5984, 5885, 5588, 5346, 5170, 4829, 4224] }
          ]
        },
        usageEstimate: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          series: [
            {
              name: "Last Year",
              data: [19550, 18966, 20402, 21446, 22446, 23664, 23273, 22098, 21141, 20445, 19097, 16704]
            },
            {
              name: "This Year",
              data: [22500, 21800, 23450, 24650, 25800, 27200, 26750, 25400, 24300, 23500, 21950, 19200]
            }
          ],
          percentChange: 15.2
        },
        costs: {
          totalCost: 5730000, // PKR
          costBySource: {
            "Solar Energy": 0,
            "(WAPDA) - Electricity": 4560240, // PKR
            "Generator": 1169760 // PKR
          },
          averageCostPerKWh: {
            "(WAPDA) - Electricity": 31.2, // PKR per kWh
            "Generator": 42.6 // PKR per kWh (including fuel)
          }
        }
      }
  }
  },

};

// export default mockEnergyData;

// ----------------------------------------------------------------------
type StateOption = {
  value: string;
  label: string;
};

export default function OverviewAppView() {
  const statesByCountry: Record<string, StateOption[]> = {
    pakistan: [
      { value: 'punjab', label: 'Punjab' },
      { value: 'sindh', label: 'Sindh' },
      { value: 'kpk', label: 'KP' },
      { value: 'balochistan', label: 'Balochistan' },
      // { value: 'gilgit_baltistan', label: 'GB' },
      { value: 'islamabad', label: 'Islamabad' },
      { value: 'kashmir', label: 'Kashmir' },
    ]
  };

  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<any>('day');
  const [currentTabState, setCurrentTabState] = useState<any>('punjab');
  const [stateOptions, setStateOptions] = useState<StateOption[]>(statesByCountry.pakistan);
  const [currentClient, setCurrentClient] = useState<any>('aggregated');
  const [dashboardData, setDashboardData] = useState<any>(mockEnergyData[currentTabState]?.aggregated.day);

  const settings = useSettingsContext();

  // Update dashboard data when tab or state changes
  useEffect(() => {
    console.log("currentTabState", currentTabState, mockEnergyData[currentTabState]?.aggregated[currentTab])
    // if (currentTabState === 'punjab') {
      if (currentClient === 'aggregated') {
        setDashboardData(mockEnergyData[currentTabState]?.aggregated[currentTab]);
      } else {
        const client = mockEnergyData[currentTabState]?.clients.find((c:any) => c.id === currentClient);
        if (client) {
          setDashboardData(client[currentTab]);
        }
      }
    // }
  }, [currentTab, currentTabState, currentClient]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangeTabState = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTabState(newValue);
    setCurrentClient('aggregated'); // Reset to aggregated data when province changes
  }, []);

  const handleClientChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentClient(event.target.value);
  }, []);

  // Get clients for the current state
  const getClients = () => {
    if (currentTabState === 'punjab') {
      return [
        { id: 'aggregated', name: 'All Clients (Aggregated)' },
        ...mockEnergyData.punjab.clients.map((client:any) => ({
          id: client.id,
          name: client.name
        }))
      ];
    }
    return [{ id: 'aggregated', name: 'All Clients (Aggregated)' }];
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={9} sx={{ background: 'black', color: 'white', p: 2, }}>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Dashboard
          </Typography>

          <Grid xs={12} md={12} sx={{ mb: 2 }}>
            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              sx={{
                display: 'flex',
                '& .MuiTabs-flexContainer': {
                  backgroundColor: '#27272A',
                  width: 'max-content',
                  borderRadius: '30px',
                  padding: '2px',
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              {[
                {
                  value: 'day',
                  label: 'Day',
                },
                {
                  value: 'month',
                  label: 'Month',
                },
                {
                  value: 'year',
                  label: 'Year',
                },
              ].map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  sx={{
                    backgroundColor:
                      currentTab === tab.value ? theme.palette.primary.main : '#27272A',
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

          <Grid xs={12} md={12} sx={{ mb: 2 }}>
            <Tabs
              value={currentTabState}
              onChange={handleChangeTabState}
              sx={{
                display: 'flex',
                '& .MuiTabs-flexContainer': {
                  backgroundColor: '#27272A',
                  width: 'max-content',
                  borderRadius: '30px',
                  padding: '2px',
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
        </Grid>

        <Grid xs={12} md={3} sx={{ background: 'black', color: theme.palette.text.primary, p: 2,}}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Select Client</Typography>
          <select
            value={currentClient}
            onChange={handleClientChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary
            }}
          >
            {getClients().map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          {currentClient !== 'aggregated' && currentTabState === 'punjab' && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Client Information
              </Typography>
              {mockEnergyData.punjab.clients
                .filter((client:any) => client.id === currentClient)
                .map((client:any) => (
                  <Typography key={client.id} variant="body2">
                    Location: {client.location}
                  </Typography>
                ))
              }
            </Stack>
          )}
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Total Consumption (kWh)"
            percent={dashboardData.totalConsumption.percentChange}
            total={dashboardData.totalConsumption.value}
            chart={{
              series: dashboardData.totalConsumption.chartData,
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Current Usage"
            percent={dashboardData.currentUsage.percentChange}
            total={dashboardData.currentUsage.value}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: dashboardData.currentUsage.chartData,
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={3} sx={{ height: '100%', p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6">Energy Cost</Typography>
            <Stack spacing={2}>
              <Typography variant="h4">
                {dashboardData.costs.totalCost.toLocaleString()} PKR
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  WAPDA
                </Typography>
                <Typography variant="body2">
                  {dashboardData.costs.costBySource['(WAPDA) - Electricity'].toLocaleString()} PKR
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Generator
                </Typography>
                <Typography variant="body2">
                  {dashboardData.costs.costBySource.Generator.toLocaleString()} PKR
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Solar
                </Typography>
                <Typography variant="body2">
                  0 PKR
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EnergyProduction
            title="Energy Consumption by Source"
            chart={{
              series: dashboardData.energyBySource,
            }}
            sx={{ height: '100%' }}
          />
        </Grid>

        <Grid xs={6} md={4} lg={4}>
          <Stack spacing={3}>
            <BankingBalanceStatistics
              title="Change in Usage"
              selected={currentTab}
              subheader="Consumption vs Generation"
              chart={{
                categories: dashboardData?.changeInUsage?.categories,
                series: [
                  {
                    type: currentTab,
                    data: dashboardData?.changeInUsage?.data,
                  },
                ],
              }}
            />
          </Stack>
        </Grid>

        <Grid xs={6} md={4} lg={4}>
          <EcommerceYearlySales
            title="Usage Estimate (Forecast)"
            subheader={`(+${dashboardData?.usageEstimate?.percentChange}%) Projection`}
            chart={{
              categories: dashboardData?.usageEstimate?.categories,
              series: [
                {
                  year: 'Forecast',
                  data: [
                    {
                      name: currentTab === 'year' ? 'Last Year' : 'Actual',
                      data: dashboardData?.usageEstimate?.series[0]?.data,
                    },
                    {
                      name: currentTab === 'year' ? 'This Year' : 'Forecast',
                      data: dashboardData?.usageEstimate?.series[1]?.data,
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12}>
        <BankingRecentTransitions
              title="Recent Transitions"
              tableData={_bankingRecentTransitions}
              tableLabels={[
                { id: 'description', label: 'Description' },
                { id: 'date', label: 'Name' },
                { id: 'address', label: 'Address' },
                { id: 'status', label: 'Status' },
                { id: 'consumption', label: 'Consumption' },
                { id: '' },
              ]}
            />
            </Grid>
      </Grid>
    </Container>
  );
}

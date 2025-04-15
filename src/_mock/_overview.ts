import { _mock } from './_mock';

// APP
// ----------------------------------------------------------------------

export const _appRelated = ['Chrome', 'Drive', 'Dropbox', 'Evernote', 'Github'].map(
  (name, index) => {
    const system = [2, 4].includes(index) ? 'Windows' : 'Mac';

    const price = [2, 4].includes(index) ? _mock.number.price(index) : 0;

    const shortcut =
      (name === 'Chrome' && '/assets/icons/app/ic_chrome.svg') ||
      (name === 'Drive' && '/assets/icons/app/ic_drive.svg') ||
      (name === 'Dropbox' && '/assets/icons/app/ic_dropbox.svg') ||
      (name === 'Evernote' && '/assets/icons/app/ic_evernote.svg') ||
      '/assets/icons/app/ic_github.svg';

    return {
      id: _mock.id(index),
      name,
      price,
      system,
      shortcut,
      ratingNumber: _mock.number.rating(index),
      totalReviews: _mock.number.nativeL(index),
    };
  }
);

export const _appInstalled = ['Germany', 'England', 'France', 'Korean', 'USA'].map(
  (name, index) => ({
    id: _mock.id(index),
    name,
    android: _mock.number.nativeL(index),
    windows: _mock.number.nativeL(index + 1),
    apple: _mock.number.nativeL(index + 2),
    flag: ['flagpack:de', 'flagpack:gb-nir', 'flagpack:fr', 'flagpack:kr', 'flagpack:us'][index],
  })
);

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
  totalFavorites: _mock.number.nativeL(index),
}));

export const _appInvoices = [...Array(5)].map((_, index) => {
  const category = ['Android', 'Mac', 'Windows', 'Android', 'Mac'][index];

  const status = ['paid', 'out of date', 'progress', 'paid', 'paid'][index];

  return {
    id: _mock.id(index),
    invoiceNumber: `INV-199${index}`,
    price: _mock.number.price(index),
    category,
    status,
  };
});

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  description: _mock.sentence(index),
  coverUrl: _mock.image.cover(index),
}));

// ANALYTIC
// ----------------------------------------------------------------------

export const _analyticTasks = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.taskNames(index),
}));

export const _analyticPosts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.sentence(index),
}));

export const _analyticOrderTimeline = [...Array(5)].map((_, index) => {
  const title = [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index];

  return {
    id: _mock.id(index),
    title,
    type: `order${index + 1}`,
    time: _mock.time(index),
  };
});

export const _analyticTraffic = [
  {
    value: 'facebook',
    label: 'FaceBook',
    total: _mock.number.nativeL(1),
    icon: 'eva:facebook-fill',
  },
  {
    value: 'google',
    label: 'Google',
    total: _mock.number.nativeL(2),
    icon: 'eva:google-fill',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: _mock.number.nativeL(3),
    icon: 'eva:linkedin-fill',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: _mock.number.nativeL(4),
    icon: 'eva:twitter-fill',
  },
];

// ECOMMERCE
// ----------------------------------------------------------------------

export const _ecommerceSalesOverview = ['Total Profit', 'Total Income', 'Total Expenses'].map(
  (label, index) => ({
    label,
    totalAmount: _mock.number.price(index) * 100,
    value: _mock.number.percent(index),
  })
);

export const _ecommerceBestSalesman = [...Array(5)].map((_, index) => {
  const category = ['CAP', 'Branded Shoes', 'Headphone', 'Cell Phone', 'Earings'][index];

  const flag = ['flagpack:de', 'flagpack:gb-nir', 'flagpack:fr', 'flagpack:kr', 'flagpack:us'][
    index
  ];

  return {
    id: _mock.id(index),
    flag,
    category,
    rank: `Top ${index + 1}`,
    email: _mock.email(index),
    name: _mock.fullName(index),
    totalAmount: _mock.number.price(index),
    avatarUrl: _mock.image.avatar(index + 8),
  };
});

export const _ecommerceLatestProducts = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _ecommerceNewProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
}));

// BANKING
// ----------------------------------------------------------------------

export const _bankingContacts = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  email: _mock.email(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _bankingCreditCard = [
  {
    id: _mock.id(2),
    balance: 23432.03,
    cardType: 'mastercard',
    cardHolder: _mock.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  },
  {
    id: _mock.id(3),
    balance: 18000.23,
    cardType: 'visa',
    cardHolder: _mock.fullName(3),
    cardNumber: '**** **** **** 8864',
    cardValid: '11/25',
  },
  {
    id: _mock.id(4),
    balance: 2000.89,
    cardType: 'mastercard',
    cardHolder: _mock.fullName(4),
    cardNumber: '**** **** **** 7755',
    cardValid: '11/22',
  },
];


export const _bankingRecentTransitions = {
  punjab: [
    {
      id: _mock.id(101),
      description: 'Net metering credit from grid operator',
      name: "Bank of Punjab – Model Town Branch",
      avatarUrl: _mock.image.avatar(101),
      type: 'Income',
      message: 'Received credit from',
      category: 'Net Metering',
      date: _mock.time(101),
      status: '4800',
      amount: 'Model Town, Lahore, Punjab',
      consumption: '1250 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(102),
      description: 'Installation of rooftop solar panels',
      name: "Meezan Bank – D Ground Branch",
      avatarUrl: _mock.image.avatar(102),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Installation',
      date: _mock.time(102),
      status: '13200',
      amount: 'D Ground, Faisalabad, Punjab',
      consumption: '900 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(103),
      description: 'Government solar incentive deposit',
      name: "Habib Bank – Civil Lines Branch",
      avatarUrl: _mock.image.avatar(103),
      type: 'Income',
      message: 'Incentive from',
      category: 'Govt. Program',
      date: _mock.time(103),
      status: '4200',
      amount: 'Civil Lines, Gujranwala, Punjab',
      consumption: '1100 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(104),
      description: 'Preventive maintenance service',
      name: "Allied Bank – Satellite Town Branch",
      avatarUrl: _mock.image.avatar(104),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Maintenance',
      date: _mock.time(104),
      status: '750',
      amount: 'Satellite Town, Sargodha, Punjab',
      consumption: '350 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(105),
      description: 'Battery storage unit purchase',
      name: "UBL – Cantt Branch",
      avatarUrl: _mock.image.avatar(105),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Battery System',
      date: _mock.time(105),
      status: '9100',
      amount: 'Cantt, Rawalpindi, Punjab',
      consumption: '—',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    }
  ],
  islamabad: [
    {
      id: _mock.id(6),
      description: 'Inverter system upgrade',
      name: "Bahria Enclave Branch",
      avatarUrl: null,
      type: 'Expenses',
      message: 'Payment for',
      category: 'Hardware Upgrade',
      date: _mock.time(6),
      status: '8200',
      amount: 'Islamabad, Capital',
      consumption: '—',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(12),
      description: 'Smart meter installation',
      name: "G-8 Markaz Branch",
      avatarUrl: _mock.image.avatar(12),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Smart Metering',
      date: _mock.time(12),
      status: '3000',
      amount: 'Islamabad, Capital',
      consumption: '—',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Islamabad_flag.svg/1280px-Islamabad_flag.svg.png'
    },
  ],
  sindh: [
    {
      id: _mock.id(7),
      description: 'Wind energy export to grid',
      name: "Clifton Branch",
      avatarUrl: _mock.image.avatar(7),
      type: 'Income',
      message: 'Energy export payment',
      category: 'Wind Energy',
      date: _mock.time(7),
      status: '7500',
      amount: 'Karachi, Sindh',
      consumption: '1600 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(8),
      description: 'Panel maintenance for coastal plant',
      name: "Hyderabad Branch",
      avatarUrl: _mock.image.avatar(8),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Maintenance',
      date: _mock.time(8),
      status: '500',
      amount: 'Hyderabad, Sindh',
      consumption: '250 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
  ],
  kpk: [
    {
      id: _mock.id(9),
      description: 'Mini hydro plant grid integration',
      name: "Peshawar Cantt Branch",
      avatarUrl: _mock.image.avatar(9),
      type: 'Income',
      message: 'Receive grid payment',
      category: 'Hydro Energy',
      date: _mock.time(9),
      status: '9200',
      amount: 'Peshawar, KPK',
      consumption: '2200 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(10),
      description: 'Battery backup system upgrade',
      name: "Abbottabad Branch",
      avatarUrl: _mock.image.avatar(10),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Battery System',
      date: _mock.time(10),
      status: '6100',
      amount: 'Abbottabad, KPK',
      consumption: '—',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
  ],
  balochistan: [
    {
      id: _mock.id(11),
      description: 'Solar village project subsidy',
      name: "Quetta Main Branch",
      avatarUrl: _mock.image.avatar(11),
      type: 'Income',
      message: 'Subsidy received',
      category: 'Rural Electrification',
      date: _mock.time(11),
      status: '10000',
      amount: 'Quetta, Balochistan',
      consumption: '1800 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(13),
      description: 'Transport cost for panel delivery',
      name: "Gwadar Port Branch",
      avatarUrl: _mock.image.avatar(13),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Logistics',
      date: _mock.time(13),
      status: '2500',
      amount: 'Gwadar, Balochistan',
      consumption: '—',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
  ],
  kashmir: [
    {
      id: _mock.id(201),
      description: 'Payment received for excess energy supplied to the grid',
      name: "Bank Alfalah – Domel Branch",
      avatarUrl: _mock.image.avatar(201),
      type: 'Income',
      message: 'Credit from grid operator',
      category: 'Net Metering',
      date: _mock.time(201),
      status: '3900',
      amount: 'Domel, Muzaffarabad, AJK',
      consumption: '980 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(202),
      description: 'Installation of solar panels at hospital',
      name: "HBL – Allama Iqbal Road Branch",
      avatarUrl: _mock.image.avatar(202),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Installation',
      date: _mock.time(202),
      status: '14,000',
      amount: 'Allama Iqbal Road, Mirpur, AJK',
      consumption: '1050 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(203),
      description: 'Govt. program subsidy credited for school solar setup',
      name: "MCB – Main Bazaar Branch",
      avatarUrl: _mock.image.avatar(203),
      type: 'Income',
      message: 'Received subsidy from',
      category: 'Govt. Program',
      date: _mock.time(203),
      status: '4800',
      amount: 'Main Bazaar, Rawalakot, AJK',
      consumption: '900 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(204),
      description: 'Routine solar maintenance at university',
      name: "Askari Bank – Shaheed Chowk Branch",
      avatarUrl: _mock.image.avatar(204),
      type: 'Expenses',
      message: 'Service charges paid',
      category: 'Maintenance',
      date: _mock.time(204),
      status: '950',
      amount: 'Shaheed Chowk, Bagh, AJK',
      consumption: '400 kWh',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    },
    {
      id: _mock.id(205),
      description: 'Purchase of solar water heating equipment',
      name: "NBP – Chattar Domel Branch",
      avatarUrl: _mock.image.avatar(205),
      type: 'Expenses',
      message: 'Procurement from',
      category: 'Equipment Purchase',
      date: _mock.time(205),
      status: '6700',
      amount: 'Chattar Domel, Muzaffarabad, AJK',
      consumption: '—',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
    }
  ]
};

// export const _bankingRecentTransitions = [
//   {
//     id: _mock.id(2),
//     description: 'Solar energy payment received from grid',
//     name: "Jinnah Avenue Branch",
//     avatarUrl: _mock.image.avatar(2),
//     type: 'Income',
//     message: 'Receive money from',
//     category: 'Net Metering',
//     date: _mock.time(2),
//     status: '4500', // Cost
//     amount: 'Bahawalpur, Punjab', // Address
//     consumption: '1200 kWh',
//     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
//   },
//   {
//     id: _mock.id(3),
//     description: 'Panel installation at commercial building',
//     name: "Stock Exchange Branch",
//     avatarUrl: _mock.image.avatar(3),
//     type: 'Expenses',
//     message: 'Payment for',
//     category: 'Installation',
//     date: _mock.time(3),
//     status: '12,000',
//     amount: 'Lahore, Punjab',
//     consumption: '850 kWh',
//     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
//   },
//   {
//     id: _mock.id(4),
//     description: 'Routine maintenance fee',
//     name: "I-10 Branch",
//     avatarUrl: _mock.image.avatar(4),
//     type: 'Expenses',
//     message: 'Payment for',
//     category: 'Maintenance',
//     date: _mock.time(4),
//     status: '600',
//     amount: 'Faisalabad, Punjab',
//     consumption: '300 kWh',
//     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
//   },
//   {
//     id: _mock.id(5),
//     description: 'Payment from government subsidy program',
//     name: "74-E Blue Area Branch",
//     avatarUrl: null,
//     type: 'Income',
//     message: 'Receive subsidy',
//     category: 'Govt. Program',
//     date: _mock.time(5),
//     status: '3,500',
//     amount: 'Multan, Punjab',
//     consumption: '1000 kWh',
//     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
//   },
//   {
//     id: _mock.id(6),
//     description: 'Purchased new inverters for plant upgrade',
//     name: "Bahria Enclave Branch",
//     avatarUrl: null,
//     type: 'Expenses',
//     message: 'Payment for',
//     category: 'Hardware Upgrade',
//     date: _mock.time(6),
//     status: '8,200',
//     amount: 'Islamabad, Capital',
//     consumption: '—',
//     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s'
//   },
// ];


export const electricityCosts = [
  {
    id: _mock.id(2),
    name: 'Karachi',
    avatarUrl: _mock.image.avatar(2),
    type: 'Income',
    message: 'Receive money from',
    category: 'Electricity cost: 5000 PKR', // Adding cost in category
    date: _mock.time(2),
    status: 'progress',
    amount: _mock.number.price(2),
  },
  {
    id: _mock.id(3),
    name: 'Lahore',
    avatarUrl: _mock.image.avatar(3),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4500 PKR', // Adding cost in category
    date: _mock.time(3),
    status: 'completed',
    amount: _mock.number.price(3),
  },
  {
    id: _mock.id(4),
    name: 'Islamabad',
    avatarUrl: _mock.image.avatar(4),
    type: 'Receive',
    message: 'Payment for',
    category: 'Electricity cost: 4000 PKR', // Adding cost in category
    date: _mock.time(4),
    status: 'failed',
    amount: _mock.number.price(4),
  },
  {
    id: _mock.id(5),
    name: 'Rawalpindi',
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4800 PKR', // Adding cost in category
    date: _mock.time(5),
    status: 'completed',
    amount: _mock.number.price(5),
  },
  {
    id: _mock.id(6),
    name: 'Peshawar',
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4200 PKR', // Adding cost in category
    date: _mock.time(6),
    status: 'progress',
    amount: _mock.number.price(6),
  },
  {
    id: _mock.id(2),
    name: 'Karachi',
    avatarUrl: _mock.image.avatar(2),
    type: 'Income',
    message: 'Receive money from',
    category: 'Electricity cost: 5000 PKR', // Adding cost in category
    date: _mock.time(2),
    status: 'progress',
    amount: _mock.number.price(2),
  },
  {
    id: _mock.id(3),
    name: 'Lahore',
    avatarUrl: _mock.image.avatar(3),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4500 PKR', // Adding cost in category
    date: _mock.time(3),
    status: 'completed',
    amount: _mock.number.price(3),
  },
  {
    id: _mock.id(4),
    name: 'Islamabad',
    avatarUrl: _mock.image.avatar(4),
    type: 'Receive',
    message: 'Payment for',
    category: 'Electricity cost: 4000 PKR', // Adding cost in category
    date: _mock.time(4),
    status: 'failed',
    amount: _mock.number.price(4),
  },
  {
    id: _mock.id(5),
    name: 'Rawalpindi',
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4800 PKR', // Adding cost in category
    date: _mock.time(5),
    status: 'completed',
    amount: _mock.number.price(5),
  },
  {
    id: _mock.id(6),
    name: 'Peshawar',
    avatarUrl: null,
    type: 'Expenses',
    message: 'Payment for',
    category: 'Electricity cost: 4200 PKR', // Adding cost in category
    date: _mock.time(6),
    status: 'progress',
    amount: _mock.number.price(6),
  },
];



// BOOKING
// ----------------------------------------------------------------------

export const _bookings = [...Array(5)].map((_, index) => {
  const status = ['Paid', 'Paid', 'Pending', 'Cancelled', 'Paid'][index];

  const customer = {
    avatarUrl: _mock.image.avatar(index),
    name: _mock.fullName(index),
    phoneNumber: _mock.phoneNumber(index),
  };

  const destination = [...Array(5)].map((__, _index) => ({
    name: _mock.tourName(_index + 1),
    coverUrl: _mock.image.travel(_index + 1),
  }))[index];

  return {
    id: _mock.id(index),
    destination,
    status,
    customer,
    checkIn: _mock.time(index),
    checkOut: _mock.time(index),
  };
});

export const _bookingsOverview = [...Array(3)].map((_, index) => ({
  status: ['Pending', 'Canceled', 'Sold'][index],
  quantity: _mock.number.percent(index) * 1000,
  value: _mock.number.percent(index),
}));

export const _bookingReview = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  postedAt: _mock.time(index),
  rating: _mock.number.rating(index),
  avatarUrl: _mock.image.avatar(index),
  description: _mock.description(index),
  tags: ['Great Sevice', 'Recommended', 'Best Price'],
}));

export const _bookingNew = [...Array(5)].map((_, index) => ({
  guests: '3-5',
  id: _mock.id(index),
  bookedAt: _mock.time(index),
  duration: '3 days 2 nights',
  isHot: _mock.boolean(index),
  name: _mock.fullName(index),
  price: _mock.number.price(index),
  avatarUrl: _mock.image.avatar(index),
  coverUrl: _mock.image.travel(index),
}));

import { add, subDays } from 'date-fns';
//
import { _mock } from './_mock';
import { _addressBooks } from './_others';
import { _bankingRecentTransitions } from './_overview';

// ----------------------------------------------------------------------

export const INVOICE_STATUS_OPTIONS = [
  { value: 'paid', label: 'Offline' },
  { value: 'pending', label: 'HighUsage' },
  { value: 'overdue', label: 'Offline' },
  { value: 'draft', label: 'HighUsage' },
];

export const INVOICE_SERVICE_OPTIONS = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.role(index),
  price: _mock.number.price(index),
}));

const ITEMS = [...Array(3)].map((__, index) => {
  const total = INVOICE_SERVICE_OPTIONS[index].price * _mock.number.nativeS(index);

  return {
    id: _mock.id(index),
    total,
    title: _mock.productName(index),
    description: _mock.sentence(index),
    price: INVOICE_SERVICE_OPTIONS[index].price,
    service: INVOICE_SERVICE_OPTIONS[index].name,
    quantity: _mock.number.nativeS(index),
  };
});

// export const _invoices = [...Array(20)].map((_, index) => {
//   const taxes = _mock.number.price(index + 1);
//
//   const discount = _mock.number.price(index + 2);
//
//   const shipping = _mock.number.price(index + 3);
//
//   const subTotal = ITEMS.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
//
//   const totalAmount = subTotal - shipping - discount + taxes;
//
//   const status =
//     (index % 2 && 'paid') || (index % 3 && 'pending') || (index % 4 && 'overdue') || 'draft';
//
//   return {
//     id: _mock.id(index),
//     taxes,
//     status,
//     discount,
//     shipping,
//     subTotal,
//     totalAmount,
//     items: ITEMS,
//     invoiceNumber: `INV-199${index}`,
//     invoiceFrom: _addressBooks[index],
//     invoiceTo: _addressBooks[index + 1],
//     sent: _mock.number.nativeS(index),
//     createDate: subDays(new Date(), index),
//     dueDate: add(new Date(), { days: index + 15, hours: index }),
//   };
// });


export const _invoices = [
  // Punjab
  {
    id: 'inv-001',
    totalAmount: 540,
    status: 'paid',
    invoiceNumber: 'INV-001',
    invoiceTo: {
      name: _bankingRecentTransitions['punjab'][0].name,
      address: '12 Main Boulevard, Lahore, Punjab',
      email: 'ali.punjab@example.com',
      phone: '+92 300 1234567',
    },
    sent: _bankingRecentTransitions['punjab'][0].amount,
    address: _bankingRecentTransitions['punjab'][0].amount,
    event: 'Offline',
    createDate: new Date('2025-04-01'),
    dueDate: new Date('2025-04-15'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
  {
    id: 'inv-002',
    totalAmount: 720,
    status: 'pending',
    invoiceNumber: 'INV-002',
    invoiceTo: {
      name: _bankingRecentTransitions['punjab'][1].name,
      address: '50 Commercial Market, Faisalabad, Punjab',
      email: 'faisal.trader@example.com',
      phone: '+92 300 7654321',
    },
    sent: _bankingRecentTransitions['punjab'][1].amount,
    address: _bankingRecentTransitions['punjab'][1].amount,
    event: 'High Usage',
    createDate: new Date('2025-04-03'),
    dueDate: new Date('2025-04-18'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },

  // Sindh
  {
    id: 'inv-003',
    totalAmount: 850,
    status: 'paid',
    invoiceNumber: 'INV-003',
    invoiceTo: {
      name: _bankingRecentTransitions['sindh'][0].name,
      address: '22 Clifton Block 9, Karachi, Sindh',
      email: 'karachi.energy@example.com',
      phone: '+92 300 2223344',
    },
    sent: _bankingRecentTransitions['sindh'][0].amount,
    address: _bankingRecentTransitions['sindh'][0].amount,
    event: 'High Usage',
    createDate: new Date('2025-04-04'),
    dueDate: new Date('2025-04-19'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
  {
    id: 'inv-004',
    totalAmount: 495,
    status: 'unpaid',
    invoiceNumber: 'INV-004',
    invoiceTo: {
      name: _bankingRecentTransitions['sindh'][1].name,
      address: 'Plot 17, Qasimabad, Hyderabad, Sindh',
      email: 'hydro.sindh@example.com',
      phone: '+92 300 1122334',
    },
    sent: _bankingRecentTransitions['sindh'][1].amount,
    address: _bankingRecentTransitions['sindh'][1].amount,
    event: 'Offline',
    createDate: new Date('2025-04-05'),
    dueDate: new Date('2025-04-20'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },

  // KPK
  {
    id: 'inv-005',
    totalAmount: 630,
    status: 'paid',
    invoiceNumber: 'INV-005',
    invoiceTo: {
      name: _bankingRecentTransitions['kpk'][0].name,
      address: 'University Road, Peshawar, KPK',
      email: 'kpk.branch@example.com',
      phone: '+92 345 5566778',
    },
    sent: _bankingRecentTransitions['kpk'][0].amount,
    address: _bankingRecentTransitions['kpk'][0].amount,
    event: 'Offline',
    createDate: new Date('2025-04-06'),
    dueDate: new Date('2025-04-21'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
  {
    id: 'inv-006',
    totalAmount: 780,
    status: 'pending',
    invoiceNumber: 'INV-006',
    invoiceTo: {
      name: _bankingRecentTransitions['kpk'][1].name,
      address: 'Main Bazaar, Abbottabad, KPK',
      email: 'abbott.energy@example.com',
      phone: '+92 345 9988776',
    },
    sent: _bankingRecentTransitions['kpk'][1].amount,
    address: _bankingRecentTransitions['kpk'][1].amount,
    event: 'High Usage',
    createDate: new Date('2025-04-07'),
    dueDate: new Date('2025-04-22'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },

  // Balochistan
  {
    id: 'inv-007',
    totalAmount: 415,
    status: 'paid',
    invoiceNumber: 'INV-007',
    invoiceTo: {
      name: _bankingRecentTransitions['balochistan'][0].name,
      address: 'Zarghoon Road, Quetta, Balochistan',
      email: 'quetta.ops@example.com',
      phone: '+92 313 4455667',
    },
    sent: _bankingRecentTransitions['balochistan'][0].amount,
    address: _bankingRecentTransitions['balochistan'][0].amount,
    event: 'Low Consumption',
    createDate: new Date('2025-04-08'),
    dueDate: new Date('2025-04-23'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
  {
    id: 'inv-008',
    totalAmount: 1100,
    status: 'overdue',
    invoiceNumber: 'INV-008',
    invoiceTo: {
      name: _bankingRecentTransitions['balochistan'][1].name,
      address: 'Sariab Road, Quetta, Balochistan',
      email: 'baloch.trading@example.com',
      phone: '+92 313 2233445',
    },
    sent: _bankingRecentTransitions['balochistan'][1].amount,
    address: _bankingRecentTransitions['balochistan'][1].amount,
    event: 'Panel Upgrade',
    createDate: new Date('2025-04-09'),
    dueDate: new Date('2025-04-24'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },

  // Kashmir
  {
    id: 'inv-009',
    totalAmount: 575,
    status: 'paid',
    invoiceNumber: 'INV-009',
    invoiceTo: {
      name: _bankingRecentTransitions['kashmir'][0].name,
      address: 'Domel Sector, Muzaffarabad, AJK',
      email: 'ajk.energy@example.com',
      phone: '+92 314 3344556',
    },
    sent: _bankingRecentTransitions['kashmir'][0].amount,
    address: _bankingRecentTransitions['kashmir'][0].amount,
    event: 'Grid Refund',
    createDate: new Date('2025-04-10'),
    dueDate: new Date('2025-04-25'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
  {
    id: 'inv-010',
    totalAmount: 1340,
    status: 'pending',
    invoiceNumber: 'INV-010',
    invoiceTo: {
      name: _bankingRecentTransitions['kashmir'][1].name,
      address: 'Allama Iqbal Road, Mirpur, AJK',
      email: 'mirpur.client@example.com',
      phone: '+92 314 6677889',
    },
    sent: _bankingRecentTransitions['kashmir'][1].amount,
    address: _bankingRecentTransitions['kashmir'][1].amount,
    event: 'Installation',
    createDate: new Date('2025-04-11'),
    dueDate: new Date('2025-04-26'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbvjdDgpAbAvbeOfQImZOILAIDLKrwTkttw&s',
  },
];


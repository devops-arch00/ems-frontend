// @mui
import { Box, Typography, Chip, Stack, Paper, Card, CardHeader } from '@mui/material';


const alerts = [
  // Punjab
  {
    id: 'Lahore Solar Grid',
    message: 'Power outage detected',
    severity: 'Critical',
    province: 'Punjab',
  },
  {
    id: 'Multan Clean Energy',
    message: 'Inverter failure reported',
    severity: 'High',
    province: 'Punjab',
  },
  {
    id: 'Rawalpindi Solar Park',
    message: 'Module overheating',
    severity: 'Medium',
    province: 'Punjab',
  },

  // Sindh
  {
    id: 'Karachi SunPower Hub',
    message: 'Unusual consumption pattern',
    severity: 'High',
    province: 'Sindh',
  },
  {
    id: 'Hyderabad Solar Works',
    message: 'Panel misalignment',
    severity: 'Medium',
    province: 'Sindh',
  },
  {
    id: 'Sukkur Energy Field',
    message: 'Low battery voltage',
    severity: 'Low',
    province: 'Sindh',
  },

  // KPK
  {
    id: 'Peshawar Solar Co.',
    message: 'Maintenance required',
    severity: 'Medium',
    province: 'KPK',
  },
  {
    id: 'Abbottabad Green Systems',
    message: 'Efficiency below target',
    severity: 'Low',
    province: 'KPK',
  },
  {
    id: 'Mardan Solar Tech',
    message: 'Communication loss',
    severity: 'High',
    province: 'KPK',
  },

  // Balochistan
  {
    id: 'Quetta Energy Ltd.',
    message: 'Efficiency below target',
    severity: 'Low',
    province: 'Balochistan',
  },
  {
    id: 'Turbat Solar Station',
    message: 'Dust accumulation alert',
    severity: 'Medium',
    province: 'Balochistan',
  },
  {
    id: 'Gwadar Green Panel Co.',
    message: 'Voltage spike detected',
    severity: 'Critical',
    province: 'Balochistan',
  },

  // Islamabad
  {
    id: 'Islamabad GreenTech',
    message: 'Battery backup failure',
    severity: 'Critical',
    province: 'Islamabad',
  },
  {
    id: 'Capital Solar Systems',
    message: 'Unauthorized access detected',
    severity: 'High',
    province: 'Islamabad',
  },
  {
    id: 'I-9 Industrial Solar',
    message: 'Inverter overheating',
    severity: 'Medium',
    province: 'Islamabad',
  },

  // Kashmir
  {
    id: 'Muzaffarabad HydroSolar',
    message: 'Temperature sensor fault',
    severity: 'High',
    province: 'Kashmir',
  },
  {
    id: 'Mirpur Solar Project',
    message: 'Cable wear detected',
    severity: 'Medium',
    province: 'Kashmir',
  },
  {
    id: 'Bagh Solar Solutions',
    message: 'Power fluctuation',
    severity: 'Critical',
    province: 'Kashmir',
  },
];

// const alerts = [
//   {
//     id: 'Quaid Solar Park',
//     message: 'Power outage detected',
//     severity: 'Critical',
//   },
//   {
//     id: 'SolarMax Pvt Ltd',
//     message: 'Unusual consumption pattern',
//     severity: 'High',
//   },
//   {
//     id: 'Theresa Webb',
//     message: 'Maintenance required',
//     severity: 'Medium',
//   },
//   {
//     id: 'Green Energy Equip',
//     message: 'Efficiency below target',
//     severity: 'Low',
//   },
// ];

const severityStyles = {
  Critical: {
    borderColor: '#f44336',
    bgColor: '#fdecea',
    chipColor: 'error',
  },
  High: {
    borderColor: '#ff9800',
    bgColor: '#fff3e0',
    chipColor: 'warning',
  },
  Medium: {
    borderColor: '#ffeb3b',
    bgColor: '#fffde7',
    chipColor: 'warning',
  },
  Low: {
    borderColor: '#2196f3',
    bgColor: '#e3f2fd',
    chipColor: 'info',
  },
};

export default function AlertsList(props:any) {
  return (
    <Card>
      <CardHeader
        sx={{ mb: 3 }}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            {/* <NotificationsNoneOutlinedIcon /> */}
            <Typography variant="h6">Alerts & Notifications</Typography>
          </Box>
        }
      />
      <Stack sx={{ p: '24px', pt: 0 }} spacing={2}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {alerts?.filter(a => a.province.toLowerCase() === props.currentTabState).map((alert) => {
          const style = severityStyles[alert.severity];
          return (
            <Paper
              key={alert.id}
              elevation={0}
              sx={{
                borderLeft: `6px solid ${style.borderColor}`,
                backgroundColor: style.bgColor,
                p: 2,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  {alert.id}
                </Typography>
                <Chip label={alert.severity} color={style.chipColor} size="small" />
              </Box>
              <Typography variant="body2" mt={0.5}>
                {alert.message}
              </Typography>
            </Paper>
          );
        })}
      </Stack>
    </Card>
  );
}

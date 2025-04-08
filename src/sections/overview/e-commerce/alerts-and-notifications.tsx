// @mui
import { Box, Typography, Chip, Stack, Paper, Card, CardHeader } from '@mui/material';

const alerts = [
  {
    id: 'Quaid Solar Park',
    message: 'Power outage detected',
    severity: 'Critical',
  },
  {
    id: 'SolarMax Pvt Ltd',
    message: 'Unusual consumption pattern',
    severity: 'High',
  },
  {
    id: 'Theresa Webb',
    message: 'Maintenance required',
    severity: 'Medium',
  },
  {
    id: 'Green Energy Equip',
    message: 'Efficiency below target',
    severity: 'Low',
  },
];

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

export default function AlertsList() {
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
        {alerts.map((alert) => {
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

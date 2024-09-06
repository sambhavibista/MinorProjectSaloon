import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
// import AppointmentOverview from './AppointmentOverview';
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,   // For Line charts
  LineElement,    // For Line charts
  ArcElement      // For Pie charts
);


const dummyData = {
  bookingsMonthly: [120, 150, 180, 200, 230, 250, 270, 300, 320, 350, 370, 400],
  bookingsYearly: [1400, 1600, 1800, 2000],
  revenueMonthly: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200],
  services: {
    Haircut: 25,
    Coloring: 15,
    HairSmoothing:14,
    Styling: 20,
    Massage: 10,
    Facials:30,
  }
};

function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor:"lightgray"}}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Bookings
                </Typography>
                <Typography variant="h4">
                  3500
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Shops Added
                </Typography>
                <Typography variant="h4">
                  50
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Appointments
                </Typography>
                <Typography variant="body1">Next appointment: 3:00 PM with Jane Doe</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Graphs */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Bookings Trend
                </Typography>
                <Line
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                      {
                        label: 'Bookings',
                        data: dummyData.bookingsMonthly,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue Overview
                </Typography>
                <Bar
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                      {
                        label: 'Revenue',
                        data: dummyData.revenueMonthly,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Service Popularity
                </Typography>
                <Pie
                  data={{
                    labels: Object.keys(dummyData.services),
                    datasets: [
                      {
                        data: Object.values(dummyData.services),
                        backgroundColor: ['#FF6384', '#36A2EB', '#A020F0', '#E63946','#008000','#FFA500'],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Bookings
                </Typography>
                <Typography variant="body1">1. David - Haircut</Typography>
                <Typography variant="body1">2. Mina - Coloring</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Shop Additions
                </Typography>
                <Typography variant="body1">1. Elegant Salon</Typography>
                <Typography variant="body1">2. Trendy Cuts</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
   </Box>
  );
}


export default Dashboard;

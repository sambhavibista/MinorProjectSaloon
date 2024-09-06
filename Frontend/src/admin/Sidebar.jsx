import React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemText} from '@mui/material';
import { Link } from 'react-router-dom';

const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Appointment Overview', path:'/admin/appointment-overview'},
    // { label: 'Total Bookings', path: '/admin/total-bookings' },
    // { label: 'Schedules', path: '/schedules' },
    { label: 'Total Shops', path: '/admin/total-shops' },
    // { label: 'Statistical Analysis', path: '/statistical-analysis' },
  ];

const drawerWidth = 240;

function Sidebar() {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <Box sx={{ padding: '1rem' }}>
          <Divider />
          <List>
            {navItems.map((item, index) => (
              <ListItem component={Link} to={item.path} key={index}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    );
  }
  export default Sidebar;
  
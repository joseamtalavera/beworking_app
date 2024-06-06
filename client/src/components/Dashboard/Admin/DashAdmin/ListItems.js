/* import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
); */

import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  PeopleOutline as UsersIcon,
  CalendarTodayOutlined as CalendarIcon,
  BookOutlined as BookingsIcon,
  ReceiptOutlined as InvoicingIcon,
  BuildOutlined as MaintenanceIcon,
  StarBorderOutlined as ReviewsIcon,
  BusinessOutlined as CentresIcon,
  LocalOfferOutlined as ProductIcon,
  SettingsOutlined as SettingsIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material';

const listItems = [
    { text: 'Users', icon: <UsersIcon sx={{fontSize: 20}} />, path: '/dashboard/admin/users'},
    { text: 'Calendar', icon: <CalendarIcon sx={{fontSize: 20}} /> },
    { text: 'Bookings', icon: <BookingsIcon sx={{fontSize: 20}} /> },
    { text: 'Invoicing', icon: <InvoicingIcon sx={{fontSize: 20}} /> },
    // Add more items as needed
];

const moreItems = [
    { text: 'Maintenance', icon: <MaintenanceIcon sx={{fontSize: 20}} /> },
    { text: 'Reviews', icon: <ReviewsIcon sx={{fontSize: 20}} /> },
    { text: 'Centres', icon: <CentresIcon sx={{fontSize: 20}} /> },
    { text: 'Product', icon: <ProductIcon sx={{fontSize: 20}} /> },
    { text: 'Settings', icon: <SettingsIcon sx={{fontSize: 20}} /> },
    { text: 'Help', icon: <HelpIcon sx={{fontSize: 20}} /> },
];

export const mainListItems = (
  <React.Fragment>
    {listItems.map((item) => (
      <ListItemButton component={Link} to={item.path} key={item.text}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {moreItems.map((item) => (
      <ListItemButton component={Link} to={item.path} key={item.text}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </React.Fragment>
);
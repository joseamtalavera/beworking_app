// MenuLayout.js
import React from 'react';
import ResponsiveDrawerAdmin from './ResponsiveDrawerAdmin';

const MenuLayout = ({ children }) => (
  <div>
    <ResponsiveDrawerAdmin />
    {children}
  </div>
);

export default MenuLayout;
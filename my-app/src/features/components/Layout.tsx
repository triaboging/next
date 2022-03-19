
import { Box } from '@mui/material';
import React from 'react';
import StickyFooter from './Footer';
import ResponsiveAppBar from './ResponsiveAppBar';

interface ILayout  {
children: React.ReactNode,
}

 const Layout:React.FC<ILayout> = ({children}) => (
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1 ,
    minHeight: '100vh',///это нет
   
  }}
>
    <ResponsiveAppBar/>
    
    {children}
    <StickyFooter/>
  </Box>
);
export default Layout;
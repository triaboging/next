import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface AboutPageProps  {

}

 const AboutPage:React.FC<AboutPageProps> = () => (
    
    <Container maxWidth="md"  
    sx={{
        // display: 'flex',
        // flexDirection: 'column',
        flex: "1 1 auto",}}>
        <h1>AboutPage</h1>
        <div>List</div>
    </Container>
    
);
export default AboutPage;
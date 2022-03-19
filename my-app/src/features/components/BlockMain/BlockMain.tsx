import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import pine from './../../../../public/static/images/pine.jpg'
import { css } from '@emotion/react';


interface BlockMainProps  {}

const  BlockMain:React.FC<BlockMainProps> = ({}) => (
  <>
   <Box sx = {{position: 'relative',
    pt : '50px',
    pb: '50px',
    border: '1px solid red'}}>
     <Image
     src = {pine}
     alt = "mainBlockPicture" 
      layout='fill'
      placeholder="blur"
      />
        <Container  sx={{Zindex: "2000",
         position: 'relative',
        
        }}
          maxWidth="sm"
         
          >
        <Typography
          sx={{color: 'white',  }}
          component="h2"
          variant="h2"
          align="center"
          
          gutterBottom
        >
          Album layout
        </Typography>
        <Typography variant="h3" align="center"  paragraph
         sx={{color: 'white', fontSize: {md: "2rem", xs: "1rem"}}}
        >
          Something short and leading about the collection below—its contents,
          
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"

        >
          <Button variant="contained">Main call to action</Button>
          <Button variant="contained">Secondary action</Button>
        </Stack>
      </Container>
   </Box>
  </>
);
export default BlockMain;
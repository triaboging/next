import { Container, TextareaAutosize, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


interface InfoPageProps  {

}

 const InfoPage:React.FC<InfoPageProps> = () => {
    return(
    <Container maxWidth="xs"  
    sx={{
        // display: 'flex',
        // flexDirection: 'column',
        flex: "1 1 auto",}}>
    <Typography variant='h3' component='h3' mt={10} align ="center" gutterBottom>
        Данные</Typography>
        
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1 ,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="take it eathy" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard"  />
        <TextareaAutosize 
        aria-label="minimum height"
        minRows={5}
        placeholder="subscribe шо-нибудь"
        style={{ width: 220 , marginTop : '20px'}}
        />
 
    </Box>
    </Container>
    
)};
export default InfoPage;
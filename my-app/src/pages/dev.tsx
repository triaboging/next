import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import axios from 'axios'
import Link from 'next/link';

interface DevPageProps  {
// authProps?:any
}

 const DevPage:React.FC<DevPageProps> = ({}) => {
    React.useEffect( ()=> {
          const fakeFunction= async() =>{
            try{
               const res = await fetch('http://localhost:5000/lapi/user/check',
               {
                 headers:{Authorization:`Bearer ${localStorage.getItem('token')}`},
                 credentials: "include",
               }
              
                )

              const data = await res.json()
              // const res = await axios.get('http://localhost:5000/lapi/user/check',
              // {
              //  headers:{Authorization:`Bearer ${localStorage.getItem('token')}`},
              //  withCredentials: true
              // }
              // )
              console.log('#3', data)
             
            //   localStorage.setItem('token', data.token)
            }catch(e){console.log(e)}
          }
          fakeFunction()
         }, [])
    
    return (
    <Container maxWidth="md"  
    sx={{
        // display: 'flex',
        // flexDirection: 'column',
        flex: "1 1 auto",}}>
        <h1>devPage</h1>
        <div>List</div>
        
        {/* {data && JSON.stringify(data)} */}
    </Container>
    
)};

export default DevPage;

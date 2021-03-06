import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import axios from 'axios'
import Link from 'next/link';

interface AboutPageProps  {
authProps?:any
}

 const AboutPage:React.FC<AboutPageProps> = ({authProps}) => {
    
    async function handlesubmit(){
        try{
            let user={
                email: 'triabogin@gmail.com',
           password: '123456'
            }
            const response = 
        await axios.post(`http://localhost:5000/lapi/user/login`, 
        {...user}
        )
        return response
       
        }catch(e){console.log(e)}
        
    }
    
    return (
    <Container maxWidth="md"  
    sx={{
        // display: 'flex',
        // flexDirection: 'column',
        flex: "1 1 auto",}}>
        <h1>AboutPage</h1>
        <div>List</div>
        <a href="http://localhost:5000/auth/google">href="http://auth/google"</a>
        <p onClick={()=> handlesubmit()}>Тыц</p>
        <a href="http://localhost:5000/some">/some</a>
        {authProps && JSON.stringify(authProps)}
    </Container>
    
)};
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const authProps = await axios.get(`http://localhost:5000/lapi/user/check`,
    //               {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
    //           )
  
    const res = await fetch('http://jsonplaceholder.typicode.com/posts'
        // {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        const authProps = await res.json()
              if (!authProps) {
                return {
                  notFound: true,
                }
              }
    return {
      props: {
        authProps: authProps
      },
    }
  }
export default AboutPage;

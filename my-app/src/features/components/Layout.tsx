
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import StickyFooter from './Footer';
import ResponsiveAppBar from './ResponsiveAppBar';
import Auth from './Auth'
interface LayoutProps  {
children: React.ReactNode,
authProps?: any
}

 const Layout:React.FC<LayoutProps> = ({children, authProps}) => {
 const [first, setfirst] = React.useState(null)
 console.log('lsdjf', authProps)
 useEffect( ()=> {
  const fakeFunction= async() =>{
    try{
      let arr = ['null', 'undefined', null, undefined]
      
      
       let getToken = localStorage.getItem('token')
   
       console.log('tokenExist:', getToken)
       if(arr.includes(getToken) === false){
          
            console.log("мы ТУТ!!!!")
            const res = await axios.get('http://localhost:5000/lapi/user/refresh',
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`},
            // credentials: "include",
            withCredentials: true
            }
              )
            // const data = await res.json()
            console.log('#5', res.data)
            if(res.data.token){
              console.log('#6', res.data.token)
              localStorage.setItem('token', res.data.token)
            }
            return res.data
        }else{
        console.log('Запрос без хедера')
        const res = await axios.get('http://localhost:5000/lapi/user/refresh',
        // {credentials: "include" })
        {withCredentials: true})
        // const data = await res.json()
        console.log('#3', res.data)
        if(res.data.token){
          localStorage.setItem('token', res.data.token)
        }
        return res.data
      }
    }catch(e){console.log(e)}
  
  }
  fakeFunction()
 }, [])
 
 return (
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1 ,
    minHeight: '100vh',///это нет
  }}
>
    <ResponsiveAppBar/>

    <h1>kegegegegegegegegegf</h1>
    {children}
   
    <StickyFooter/>
  </Box>
)};
export async function  getStaticProps(constext) {
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
export default Layout;
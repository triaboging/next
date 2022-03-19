import { Box, Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Counter from '../features/counter/Counter'
// import styles from '../styles/Home.module.css'
import Posts from '../features/components/Posts'
import BlockMain from '../features/components/BlockMain/BlockMain'

const IndexPage: NextPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'}}>
    {/* <div className={styles.container}> */}
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
          {/* <Counter /> */}
        
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      
      <BlockMain/>
      <Posts/>
    </Box>
  )
}

export default IndexPage

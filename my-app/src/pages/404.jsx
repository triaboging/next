import React from 'react'



export default function NotFound() {
  return (
    <div style={{display: 'flex', 
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
    }}>
        <h2>Error 404</h2>
        <p>Страница не найдена</p>
    </div>
  )
}
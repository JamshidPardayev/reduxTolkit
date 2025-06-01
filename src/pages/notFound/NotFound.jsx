import React from 'react'
import notFountGif from "../../assets/notFound.gif"
import Header from '../../components/header/Header'

const NotFound = () => {
  
  return (
    <div  className='h-[100vh] overflow-hidden'>
      <Header />
      <img src={notFountGif} alt="notFoundGif" className='w-screen h-[92vh] object-cover'/>
    </div>
  )
}

export default React.memo(NotFound)

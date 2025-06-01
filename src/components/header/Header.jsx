import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

  const count = useSelector(state => state.counter.value)
  const text = useSelector(state => state.auth.value)
  console.log(count);
  

  return (
    <div>
      <h2>Header {count}</h2>
      <h2>Name {text}</h2>
    </div>
  )
}

export default React.memo(Header)

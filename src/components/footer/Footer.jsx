import React from 'react'
import { useDispatch } from 'react-redux'
import { dec, inc, incByAmount, reset } from '../../redux/features/counter.slice';
import { changeName, deleteName } from '../../redux/features/auth.slice';

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Footer</h2>
      <button onClick={()=> dispatch(inc(1))} className='border p-2'>Increment</button>
      <button onClick={()=> dispatch(dec(1))} className='border p-2'>decrement</button>
      <button onClick={()=> dispatch(incByAmount(10))} className='border p-2'>IncByAmount</button>
      <button onClick={()=> dispatch(reset())} className='border p-2'>Reset</button>

      <button onClick={()=> dispatch(changeName())} className='border p-2'>Login</button>
      <button onClick={()=> dispatch(deleteName())} className='border p-2'>LoginOut</button>

    </div>
  )
}

export default React.memo(Footer)

import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {

    const {userid} = useParams();
  return (
    <div>
      <h1 className='bg-orange-300 text-center text-opacity-75 p-4 m-4 text-black text-3xl'>User: {userid}</h1>
    </div>
  )
}

export default User

import React, { useContext } from 'react'
import UserContext from './UserContext'

const Profile = () => {

    const {user} = useContext(UserContext);


    if(!user) return 'please login'

  return (

    
    <div>{
        user && <h1>Welcome {user.username} and your password {user.password}</h1>
    }</div>
  )
}

export default Profile
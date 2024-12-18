// import React from 'react'
// import { useLoaderData } from 'react-router-dom'

// const Github = () => {

//     // const [data,setData] = useState(null);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/HmynKhan')
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log('github : ',data);
    //         setData(data);
    //     })
    //     .catch((error) => console.error('Error fetching data:', error));



    // },[])
        // const data = useLoaderData();
//   return (
//     <div className='text-center m-4 bg-black text-white p-4 text-3xl'>
//       GitHub: {data ? data.login :"Loading"}
//       <img src={data.avatar_url} alt="GitHub Profile" className='align-center w-48 h-52' />


//     </div>
//   )
// }

// export default Github


// export const GitHubInfoLoader = async()=>{

//     const res = await fetch('https://api.github.com/users/HmynKhan')
//     return res.json()

// }




import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const ProfileCard = () => {


    useEffect(()=>{
        fetch('https://api.github.com/users/HmynKhan')
        .then((res)=>res.json())
        .then((data)=>{
            console.log('github : ',data);
        })
        .catch((error) => console.error('Error fetching data:', error));



    },[])

    const data = useLoaderData();

  const user = {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    html_url: "https://github.com/HmynKhan",
    bio: data.bio,
    company: data.company,
    blog: data.blog,
    location: data.location,
    twitter_username: data.twitter_username,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Image */}
        <img
          className="w-full h-48 object-cover"
          src={user.avatar_url}
          alt="Profile"
        />
        {/* Profile Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.name} <span className="text-sm text-gray-500">@{user.login}</span>
          </h2>
          <p className="text-gray-600 mt-2">{user.bio}</p>
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>Company:</strong> {user.company}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {user.location}
            </p>
            <p className="text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.blog}
              </a>
            </p>
            <p className="text-gray-600">
              <strong>GitHub:</strong>{" "}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.html_url}
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Twitter:</strong>{" "}
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @{user.twitter_username}
              </a>
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-gray-600">
              <strong>Public Repos:</strong> {user.public_repos}
            </p>
            <p className="text-gray-600">
              <strong>Followers:</strong> {user.followers}
            </p>
            <p className="text-gray-600">
              <strong>Following:</strong> {user.following}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


export const GitHubInfoLoader = async()=>{

    const res = await fetch('https://api.github.com/users/HmynKhan')
    return res.json()

}

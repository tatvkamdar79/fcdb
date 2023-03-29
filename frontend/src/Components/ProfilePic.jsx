import React from 'react'
import { useState } from 'react'
async function getProfilePic(){
  console.log("bruh")
    const obj = await fetch('http://localhost:8080/api/pictures/get',{ headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJjZTdhYjJmNzliYWE4MmIwNzljZiIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODAwMDQyODB9.SUxGPdmzvJ5XSuScSg23lpS9kp80K5EKFbpU2lFzp4Q' } }).then(
      response => response.json()
    ).then((response1) => JSON.parse(response1));
    console.log(obj.url);
    return "http://localhost:8080/"+obj;
}



export const ProfilePic = () => {
  const [profile,setprofile] = useState("http://localhost:8080/1cce72e0a8f4061961f451cefa76dae7cc62e65050.791294341612756.jpg")
  return (<div>
    <img className="image" src={profile} alt="bruh"/>
  </div>)
  return (
    <div>
        <h1>Hey there!</h1>
        <img className="image" src={profile} alt="bruh"/>
    </div>
  )
}

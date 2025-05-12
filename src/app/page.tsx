'use client'

import { useEffect, useState } from "react";




export default function Home() {
  const [message, setMessage] = useState('');
  async function sendPostRequest() {
    const url = 'http://localhost:3000/api/chat';  // URL to your POST route
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
      console.log('Response:', data);  // Log the combined response
    } else {
      console.error('Error:', response.status);
    }
  }
  useEffect(()=>{
    sendPostRequest();
  },[])
  return (
    <>
    {message=="" &&<h1>Summarizing profile...</h1>}
    <h1>{message}</h1>
    </>
  );
}

"use client"

import { useEffect, useState } from "react";

export const fetchData = async () =>{
  try{
    const response = await fetch("http://localhost:3000/api/timestamp");
    if(!response.ok) throw new Error('Błąd sieci')
    const result = await response.json()
    return result;
  }catch(err){
    console.error(err)
    return null;
  }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    const getData = async () =>{
      setError(null)
      const result = await fetchData();
      if(result){
        const dataString = JSON.stringify(result);
        setData(dataString);
      }else {
        setError("Something went wrong")
      }
      setIsLoading(false)
    }
    getData()
  },[])


  return (
    <div className="max-w-6xl min-h-screen mx-auto border flex justify-center items-center">
      <div className="text-center">
      <h1>Hello from frontend</h1>
      <p>node api</p>
      {isLoading && !data && <p>Loading...</p>}
      {data && <p>{data}</p>}
      {error && <p>{error}</p>}
      </div>
    </div>
  );
}

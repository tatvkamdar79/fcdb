import React from 'react'
import axios from 'axios'

function get(){
    axios.get("http://localhost:8080/auth/google")
}


export const Test = () => {
  return (
    <div>
        <h1>Hello from Oauth</h1>
        <button onClick={get()}>
            Click to use oauth!
        </button>
    </div>
  )
}

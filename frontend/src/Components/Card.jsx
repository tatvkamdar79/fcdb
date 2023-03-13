import React from 'react'


export const Card = ({ id, ServiceName, ImageLink, RedirectLink,Description}) => {
  return (
    <a href="/">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#"> 
            <img class="rounded-t-lg" src={ImageLink} alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ServiceName}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{Description}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Click here to know more!
        </p>
        </div>
        
    </div>

    </a>
    
  )
}

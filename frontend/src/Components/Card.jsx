import React from 'react'


export const Card = ({ id, ServiceName, ImageLink, RedirectLink,Description}) => {
  return (
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

    <article class="overflow-hidden rounded-lg shadow-lg">
            <a href="/">
                <img alt="Placeholder" class="block h-auto w-full" src={ImageLink}/>
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="/">
                        {ServiceName}
                    </a>
                </h1>
                <p class="text-grey-darker text-sm">
                    11/1/19
                </p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline hover:underline text-black" href="/">
                    
                    <p class="ml-2 text-sm">
                        {Description}
                    </p>
                </a>
                <a class="no-underline text-grey-darker hover:text-red-dark" href="/">
                    <span class="hidden">Like</span>
                    <i class="fa fa-heart"></i>
                </a>
            </footer>

            </article>
            </div>        
    
    
    
  )
}

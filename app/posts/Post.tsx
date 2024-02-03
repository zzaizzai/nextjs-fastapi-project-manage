"use client"

import React from 'react';

export default function Posts() {

    return (

        <div>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </div>
    );
}


function Post() {

    return (
        <div className='bg-blue-200 rounded m-2'>
            <div className='p-1 flex flex-col'>
                <div className='font-bold'><a href="">project name</a></div>

                <div className="flex flex-row">
                    <div className='w-20'>author</div>
                    <div className="px-1 w-40 flex-auto bg-blue-500 text-white rounded">
                        Start: 
                    </div>
                    <div className='px-1 w-40 flex-auto'>
                        Due: 
                    </div>
                </div>

            </div>
        </div>
    )
}


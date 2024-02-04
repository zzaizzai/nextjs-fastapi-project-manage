import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { sql } from "@vercel/postgres";

export default async function Posts() {
    var page = 0

    const { rows } = await sql`
        select * from posts limit 10;
    `

    return (
        <div>
            {rows.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}


function Post({ post }: any) {

    return (
        <div className='bg-blue-200 rounded m-2'>
            <div className='p-1 flex flex-col'>
                <div className='font-bold'>
                    <Link href={`/posts/detail/${post.id ?? 1}`}>{post.title ?? 'project title'}</Link>
                </div>
                <div className="flex flex-row">
                    <div className='w-20'>{post.author ?? 'author'}</div>
                    <div className="px-1 w-40 flex-auto bg-blue-500 text-white rounded">
                        Start:
                    </div>
                    <div className='mx-1'>
                        ~
                    </div>
                    <div className='px-1 w-40 flex-auto bg-red-300 text-white rounded"'>
                        Due:
                    </div>
                </div>
                <div className=''>
                    {post.content ?? 'Content......'}
                </div>
            </div>
        </div>
    )
}


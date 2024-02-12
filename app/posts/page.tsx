import React, { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios'; // Import Axios
import { sql } from '@vercel/postgres';


export const dynamic = 'force-dynamic'


type Post = {
	id: number;
	title: string;
	content: string;
	author: string;
	start_date: string;
	due_date: string;
};

const getPosts = async () => {
	const data = await sql`
	SELECT *
	FROM posts
	ORDER BY datetime_created DESC`;

	return data
};

export default async function Posts() {

	const { rows } = await getPosts()

	return (
		<div>
			<br />

			<Link href={'/posts/create'} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
				New Post
			</Link>
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
					<div className='px-1 w-40 flex-auto bg-red-300 text-white rounded'>
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
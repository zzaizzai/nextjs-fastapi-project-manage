import React from 'react';
import Posts from './Post';
import Link from "next/link";

export default async function ListItem() {

  return (
    <div>

      <br />
      
      <Link href={'/posts/create'} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        New Post
      </Link>
      {/* @ts-expect-error Server Component */}
      <Posts></Posts>
    </div>
  );
}




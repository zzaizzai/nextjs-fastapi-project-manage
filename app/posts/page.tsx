"use client"

import React, { useEffect } from 'react';
import Post from './Post';

export default function ListItem(){
  useEffect(() => {
    // /api/python 엔드포인트 호출
    fetch('/api/python')
      .then((response) => response.json())
      .then((data) => {
        // 데이터를 받아와서 console.log로 표시
        console.log(data);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []);

  return (
    <div>
      <div className='ab'>button</div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        New Post
      </button>
      <Post></Post>
    </div>
  );
}




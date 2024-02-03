"use client"

import React, { useEffect } from 'react';

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

        hello
    </div>
  );
}

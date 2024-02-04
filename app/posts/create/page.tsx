"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation'


interface FormData {
    title: string;
    content: string;
    user_id: number;
}

export default function ListItem({ history }: any) {
    const router = useRouter()


    const [formData, setFormData] = useState<FormData>({ title: '', content: '', user_id: 1 });
    const [msg, setMsg] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData)

        // Check
        if (formData.title == "") {
            setMsg("title is empty")
            return 
        }

        if (formData.content == "") {
            setMsg("content is empty")
            return 
        }

        // Send an AJAX request to the API endpoint
        axios.post('/api/posts/create', formData)
            .then((response) => {
                // Check for a successful response (you can customize this based on your API response)
                if (response.status === 200) {
                    // Redirect to another page (e.g., '/success') using React Router
                    router.push('/posts');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <form className='m-2 flex flex-col' onSubmit={handleSubmit}>
                <div>create new post</div>
                <input
                    placeholder='title'
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <input
                    placeholder='content'
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                />


                <input
                    hidden  
                    placeholder='user_id'
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                />

                <button>submit</button>
            </form>

            {msg}
        </div>
    );
}
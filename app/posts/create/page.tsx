"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/navigation'


interface FormData {
    title: string;
    content: string;
    user_id: number;
    start_date: string;
    end_date: string
}

export default function ListItem({ history }: any) {
    const router = useRouter()


    const [formData, setFormData] = useState<FormData>({ title: '', content: '', user_id: 1, start_date: '2024-02-03', end_date: '2024-02-05' });
    const [msg, setMsg] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                    router.refresh();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMsg(error)
            });
    };

    return (
        <div>
            <h2>create new post</h2>
            <form className='m-2 flex flex-col' onSubmit={handleSubmit}>


                Title
                <input
                    placeholder='title'
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                Content
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


                Start Date
                <input type="date" name='start_date' value={formData.start_date} onChange={handleInputChange} />

                End Date
                <input type="date" name='end_date' value={formData.end_date} onChange={handleInputChange} />
                <button>submit</button>
            </form>

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{msg}</span>
            </div>
        </div>
    );
}
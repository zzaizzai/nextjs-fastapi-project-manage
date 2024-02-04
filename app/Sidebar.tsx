'use client'

import React, { useState } from 'react';

export default function SideBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    const sidebarStyle = {
        width: isSidebarOpen ? '250px' : '0', // Adjust the width as needed
        transition: 'width 0.3s ease',
    };

    const backgroundStyle = {
        backgroundColor: isSidebarOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        zIndex :  isSidebarOpen ?  '20' :  '-99'
    };

    return (
        <div>
            <div className='fixed inset-0 z-20' style={backgroundStyle} onClick={closeSidebar}></div>
            <div className="w-1/4 bg-gray-200 p-4 fixed left-0 h-screen z-30" style={sidebarStyle}>
                <div onClick={toggleSidebar}>#</div>
            </div>
        </div>

    );
}
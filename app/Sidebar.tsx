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
        width: '250px',
        left: isSidebarOpen ? '0px' : '-215px',
        transition: 'left  0.3s ease',
    };

    const backgroundStyle = {
        backgroundColor: isSidebarOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        zIndex: isSidebarOpen ? '20' : '-99'
    };


    const menuTextStyle = {
        opacity: isSidebarOpen ? '1' : '0', // Set opacity to 1 when isSidebarOpen is true, 0 when false
        transition: 'opacity 0.2s ease', // Transition the opacity property
    };

    return (
        <div>
            <div className='fixed inset-0 z-20' style={backgroundStyle} onClick={closeSidebar}></div>
            <div className="w-1/4 bg-gray-200 fixed left-0 h-screen z-30" style={sidebarStyle}>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='flex-auto'></div>
                        <div className='p-1 h-12 w-12 bg-blue-300 cursor-pointer' onClick={toggleSidebar}>#</div>
                    </div>

                    <div className='flex flex-row p-2'>
                        <div className='flex-auto'></div>
                        <div style={menuTextStyle}>menu</div>
                    </div>

                    <div className='flex flex-row p-2'>
                        <div className='flex-auto'></div>
                        <div style={menuTextStyle}>menu1</div>
                    </div>

                    <div className='flex flex-row p-2'>
                        <div className='flex-auto'></div>
                        <div style={menuTextStyle}>menu2</div>
                    </div>


                </div>
            </div>
        </div>

    );
}
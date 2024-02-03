import React from 'react';


export default function ListItem() {

    return (
        <div>
            <form className='m-2 flex flex-col' action="">
                <div >create new post</div>
                <input placeholder='title' type="text" />
                <input placeholder='content' type="text" />

                <button>
                    submit
                </button>
            </form>
        </div>
    );
}

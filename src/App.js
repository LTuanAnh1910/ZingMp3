import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [work, setWork] = useState('');
    const [todo, setTodo] = useState([]);

    const handleSubmit = () => {
        if (todo.some((item) => item.id === work.replace(/\s/g, ''))) {
            toast.warning('cv da duoc them vao truoc do');
        } else {
            setTodo((prev) => [...prev, { id: work.replace(/\s/g, ''), job: work }]);
            setWork('');
        }
    };

    const handleDeleted = (id) => {
        setTodo((prev) => prev.filter((item) => item.id !== id)); //fileter dung de xoa
    };

    return (
        <>
            {/* //gap-8: khi co display:flex thi dung gap-8 cac the con tu dong cach nhau 2rem */}
            <div className="flex flex-col h-screen justify-center border border-red-500 items-center">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="outline-none border border-blue-500 px-4 py-2 w-[360px] "
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                    />
                    <button
                        type="button"
                        className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white "
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>

                <div>
                    <h3 className="pt-5 font-bold text-xl">Content</h3>
                    <ul>
                        {todo.map((item) => {
                            return (
                                <li key={item.id} className="flex gap-10 items-center ">
                                    <span className="my-2">{item.job}</span>
                                    <span onClick={() => handleDeleted(item.id)} className="my-2 cursor-pointer p-4">
                                        x
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </>
    );
}

export default App;

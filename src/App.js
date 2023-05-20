import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { Home, Login, Public, Personal } from './containers/public';
import path from './ultis/path';
import * as actions from './store/actions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getHome());
    }, []);
    return (
        <>
            <div className="">
                <Routes>
                    <Route path={path.PUBLiC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />

                        <Route path={path.STAR} element={<Home />} />
                    </Route>
                </Routes>
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

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import {
    Home,
    Login,
    Public,
    Personal,
    Album,
    Search,
    SearchSongs,
    SearchAll,
    Singer,
    SearchPlaylist,
} from './containers/public';
import path from './ultis/path';
import * as actions from './store/actions';
import WeekRank from './containers/public/WeekRank';

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
                        <Route path={path.MY_MUSIC} element={<Home />} />
                        <Route path={path.ALBUM__TITLE_PID} element={<Album />} />
                        <Route path={path.PLAYLIST__TITLE_PID} element={<Album />} />
                        <Route path={path.WEEKRANK__TITLE_PID} element={<Home />} />
                        <Route path={path.HOME_SINGER} element={<Singer />} />
                        <Route path={path.HOME_ARTIST_SINGER} element={<Singer />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.SONG} element={<SearchSongs />} />
                            <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
                        </Route>

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

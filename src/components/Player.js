import React from 'react';
import { useSelector } from 'react-redux';

const Player = () => {
    const { curSongId } = useSelector((state) => state.music);
    console.log(curSongId);
    return (
        <div className="bg-main-400 h-full px-5 flex">
            <div className="w-[30%] flex-auto border border-red-500">Detail Song</div>
            <div className="w-[40%] flex-auto border border-red-500">Main player</div>
            <div className="w-[30%] flex-auto border border-red-500">Volume</div>
        </div>
    );
};

export default Player;

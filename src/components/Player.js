import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../ultis/icons';

const {
    AiOutlineHeart,
    BiDotsHorizontalRounded,
    MdSkipPrevious,
    MdSkipNext,
    CiRepeat,
    BsPlayCircle,
    BsPauseCircle,
    CiShuffle,
} = icons;

const Player = () => {
    const audioEl = new Audio(
        'https://mp3-s1-zmp3.zmdcdn.me/24669f8da3ce4a9013df/812402232419767419?authen=exp=1684923238~acl=/24669f8da3ce4a9013df/*~hmac=ac61ccb3c17750ae4365034674b120dd&fs=MTY4NDmUsIC1MDQzODE5OXx3ZWJWNnwwfDMdUngODEdUngMjmUsICdUngMTU4',
    );

    const { curSongId, isPlaying } = useSelector((state) => state.music);

    const [songInfo, setSongInfo] = useState(null);

    const [source, setSource] = useState(null);

    console.log(audioEl.get);

    // const [isPlaying, setIsPlaying] = useState(false);

    //useEffect khong dung async dc, vi no bat tat ca dong bo
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.getDetailSong(curSongId), apis.getSong(curSongId)]);

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128']);
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {}, [curSongId]);

    const handleTogglePlayMusic = () => {
        audioEl.play();
    };

    return (
        <div className="bg-main-400 h-full px-5 flex">
            <div className="w-[30%] flex-auto  flex items-center">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-[64px] h-[64px] object-cover rounded-md " />
                <div className="flex flex-col ml-[10px] ">
                    <span className="font-semibold text-gray-200 text-sm">{songInfo?.title}</span>
                    <span className="text-gray-400 text-xs font-semibold">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex pl-3 gap-4 cursor-pointer">
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BiDotsHorizontalRounded size={16} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex flex-col items-center justify-center gap-2  flex-auto border border-red-500 cursor-pointer  py-2">
                <div className="flex gap-8 justify-center items-center  ">
                    <span title="Bật phát ngẫu nhiên" className="">
                        <CiShuffle size={26} />
                    </span>
                    <span>
                        <MdSkipPrevious size={26} />
                    </span>
                    <span className="hover:text-violet-500" onClick={handleTogglePlayMusic}>
                        {isPlaying ? <BsPauseCircle size={30} /> : <BsPlayCircle size={30} />}
                    </span>
                    <span>
                        <MdSkipNext size={26} />
                    </span>
                    <span title="Bật phát tất cả">
                        <CiRepeat size={26} />
                    </span>
                </div>
                <div>progress bar</div>
            </div>
            <div className="w-[30%] flex-auto border border-red-500">Volume</div>
        </div>
    );
};

export default Player;

import React, { useEffect, useState, useRef } from 'react';
import * as apis from '../apis';
import icons from '../ultis/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as actions from '../store/actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

var intervalId;

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
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

    const [songInfo, setSongInfo] = useState(null);

    const [audio, setAudio] = useState(new Audio());

    const [curSeconds, setCurSeconds] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const dispatch = useDispatch();

    const thumbRef = useRef(); //thanh process bar nam tren

    const trackRef = useRef();

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffle();
            } else if (isRepeat) {
                handleNextSong();
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isShuffle, isRepeat]);

    //useEffect khong dung async dc, vi no bat tat ca dong bo
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warning(res2.data.msg);
                setCurSeconds(0);
                thumbRef.current.style.cssText = `right: 0`;
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    // console.log(audio.currentTime);
    //handle click new song
    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        audio.currentTime = 0;
        if ((isPlaying, thumbRef.current)) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100; //khoi tao bien de tinh phan tram tren thanh process bar
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSeconds(Math.round(audio.currentTime));
            }, 200);
        }
    }, [audio]);

    //handle click pause and play
    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play();
            dispatch(actions.play(true));
        }
    };

    const handleClickProgressbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect(); //dung de lay toa do cua thang trackRef
        const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = (percent * songInfo.duration) / 100;
        setCurSeconds(Math.round(audio.currentTime));
    };

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex;
            songs.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index;
            });
            //gui id bai ke tiep len Redux
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
        }
    };
    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex;
            songs.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index;
            });
            //gui id bai truoc len Redux
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
            dispatch(actions.play(true));
        }
    };

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1;
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
        dispatch(actions.play(true));
        setIsShuffle((prev) => !prev);
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
            <div className="w-[40%] flex flex-col items-center justify-center gap-2  flex-auto -500 cursor-pointer  py-2">
                <div className="flex gap-8 justify-center items-center  ">
                    <span
                        title="Bật phát ngẫu nhiên"
                        className={`cursor-pointer ${isShuffle && 'text-purple-600  '}`}
                        onClick={() => setIsShuffle((prev) => !prev)}
                    >
                        <CiShuffle size={26} />
                    </span>
                    <span onClick={handlePrevSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}>
                        <MdSkipPrevious size={26} />
                    </span>
                    <span className="hover:text-violet-500" onClick={handleTogglePlayMusic}>
                        {isPlaying ? <BsPauseCircle size={30} /> : <BsPlayCircle size={30} />}
                    </span>
                    <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handleNextSong}>
                        <MdSkipNext size={26} />
                    </span>
                    <span
                        title="Bật phát tất cả"
                        className={`cursor-pointer ${isRepeat && 'text-purple-600  '}`}
                        onClick={() => setIsRepeat((prev) => !prev)}
                    >
                        <CiRepeat size={26} />
                    </span>
                </div>
                <div className="w-full flex items-center justify-center gap-2 text-xs font-bold">
                    <span className=" text-[#FFFFFF]"> {moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div
                        ref={trackRef}
                        onClick={handleClickProgressbar}
                        className="w-3/4 h-[3px] rounded-l-full rounded-r-full cursor-pointer relative bg-[#ffffff4d] hover:h-[8px]  "
                    >
                        <div
                            ref={thumbRef}
                            className="absolute left-0  bg-[#fff] top-0 h-full  rounded-l-full rounded-r-full " //thumbref dung de gan cho tag na y
                        ></div>
                    </div>
                    <span className=" font-sans text-[#FFFFFF]">
                        {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
                    </span>
                </div>
            </div>
            <div className="w-[30%] flex-auto border border-red-500">Volume</div>
        </div>
    );
};

export default Player;

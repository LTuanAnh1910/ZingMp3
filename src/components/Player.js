import React, { useEffect, useState, useRef } from 'react';
import * as apis from '../apis';
import icons from '../ultis/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as actions from '../store/actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSong from './LoadingSong';

var intervalId;

const {
    BsMusicNoteList,
    AiOutlineHeart,
    BiDotsHorizontalRounded,
    MdSkipPrevious,
    MdSkipNext,
    CiRepeat,
    BsPlayCircle,
    BsPauseCircle,
    CiShuffle,
    RiRepeatOneFill,
    SlVolume2,
    SlVolumeOff,
    SlVolume1,
} = icons;

const Player = ({ setIsShowRightSidebar }) => {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [curSeconds, setCurSeconds] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoadedSource, setIsLoadedSource] = useState(true);
    const [volume, setVolume] = useState(100);

    const dispatch = useDispatch();

    const thumbRef = useRef(); //thanh process bar nam tren

    const trackRef = useRef();

    //auto next song when ended song
    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffle();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong();
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isShuffle, repeatMode]);

    useEffect(() => {
        const fetchDetailSong = async () => {
            //hien thi icon load khi doi api
            setIsLoadedSource(false);
            //call api
            const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);
            //tat icon load khi goi xong api
            setIsLoadedSource(true);

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
                dispatch(actions.setCurSongData(res1.data.data));
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

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);

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
            dispatch(actions.play(true));
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
            dispatch(actions.play(false));
        }
    };

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1;
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
        dispatch(actions.play(true));
    };

    const handleRepeatOne = () => {
        audio.play();
        dispatch(actions.play(true));
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
                    <span className="hover:text-violet-500 " onClick={handleTogglePlayMusic}>
                        {!isLoadedSource ? (
                            <LoadingSong />
                        ) : isPlaying ? (
                            <BsPauseCircle size={32} />
                        ) : (
                            <BsPlayCircle size={32} />
                        )}
                    </span>
                    <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handleNextSong}>
                        <MdSkipNext size={26} />
                    </span>
                    <span
                        title="Bật phát tất cả"
                        className={`cursor-pointer ${repeatMode && 'text-purple-600  '}`}
                        onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
                    >
                        {repeatMode === 1 ? <RiRepeatOneFill size={24} /> : <CiRepeat size={24} />}
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
            <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
                <div className="flex gap-2 items-center cursor-pointer ">
                    <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
                        {+volume >= 50 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 />}
                    </span>
                    <input
                        class="w-full h-[2px] bg-gray-200 rounded-lg appearance-none cursor-pointer "
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />
                </div>{' '}
                <span
                    className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100"
                    onClick={() => setIsShowRightSidebar((prev) => !prev)}
                >
                    <BsMusicNoteList size={20} className="text-[#ffffff]" />
                </span>
            </div>
        </div>
    );
};

export default Player;

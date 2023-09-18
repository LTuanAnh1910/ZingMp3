import React, { useState, useEffect } from 'react';
import icons from '../ultis/icons';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { apiGetDetailPlaylist } from '../apis';
import Scrollbars from 'react-custom-scrollbars-2';

const { BsTrash3 } = icons;

const SidebarRight = () => {
    const [isRecent, setIsRecent] = useState(false);
    const [playlist, setPlaylist] = useState();
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector((state) => state.music);

    //console.log(curSongData);
    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId);
        if (response?.data?.err === 0) setPlaylist(response?.data?.data?.song?.items);
    };

    useEffect(() => {
        curAlbumId && fetchDetailPlaylist();
    }, []);

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist();
    }, [curAlbumId, isPlaying]);
    useEffect(() => {
        isPlaying && setIsRecent(false);
    }, [isPlaying, curSongId]);
    return (
        <div className="flex flex-col text-xs h-full w-full">
            <div className="h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between">
                <div
                    className="flex flex-auto justify-center bg-[hsla(0,0%,100%,0.1)] rounded-l-full 
                            rounded-r-full py-[4px] text-[#a0a0a0] text-[14px] px-[6px] cursor-pointer items-center "
                >
                    <span
                        onClick={() => setIsRecent((prev) => !prev)}
                        className={`py-[6px] ${
                            !isRecent && 'bg-[#7b7c7f] text-white'
                        } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    >
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent((prev) => !prev)}
                        className={`py-[6px] ${
                            isRecent && 'bg-[#7b7c7f] text-white'
                        } flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className="p-1 rounded-full cursor-pointer hover:bg-main-500">
                    <BsTrash3 size={14} />
                </span>
            </div>

            {isRecent ? (
                <div className="w-full flex-auto flex-col flex px-2 ">
                    <Scrollbars autoHide style={{ width: ' 100%', height: '100%' }}>
                        {recentSongs && (
                            <div className=" flex  flex-col">
                                {recentSongs?.map((item) => (
                                    <SongItem
                                        key={item.sid}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artists}
                                        sid={item?.sid}
                                        size="w-[40px] h-[40px]"
                                    />
                                ))}
                            </div>
                        )}
                    </Scrollbars>
                </div>
            ) : (
                <div className="w-full flex-auto flex-col flex px-2 ">
                    <Scrollbars autoHide style={{ width: ' 100%', height: '100%' }}>
                        <SongItem
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artists={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            size="w-[40px] h-[40px]"
                            style="bg-main-500"
                        />
                        <div className="flex flex-col pt-[15px] px-2 pb-[5px]">
                            <span className="text-[#ffffff] text-sm font-bold">Tiếp theo</span>
                            <span className="text-[#ffffff80] text-xs flex gap-1">
                                <span>Từ playlist</span>
                                <span className="font-semibold text-main-500 ">
                                    {curSongData?.album?.title?.length > 30
                                        ? `${curSongData?.album?.title.slice(0.3)}...`
                                        : curSongData?.album?.title}
                                </span>
                            </span>
                        </div>
                        {playlist && (
                            <div className=" flex  flex-col">
                                {playlist?.map((item) => (
                                    <SongItem
                                        key={item.encodeId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artistsNames}
                                        sid={item?.encodeId}
                                        size="w-[40px] h-[40px]"
                                    />
                                ))}
                            </div>
                        )}
                    </Scrollbars>
                </div>
            )}
            <div className="w-full h-[90px]"></div>
        </div>
    );
};

export default SidebarRight;

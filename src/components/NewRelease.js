import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { useEffect } from 'react';

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.app);
    const [isActived, setIsActived] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        isActived ? setSongs(newRelease?.items?.others) : setSongs(newRelease?.items?.vPop);
    }, [isActived, newRelease]);

    return (
        <div className="mt-12 px-[59px] flex flex-col gap-2  ">
            <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#FFFFFF]">{newRelease?.title}</h3>
                <span className="text-xs">TẤT CẢ</span>
            </div>
            <div className="flex items-center gap-5 text-xs">
                <button
                    type="button"
                    onClick={() => setIsActived(0)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  bg-transparent ${
                        isActived === 0 && 'bg-main-500 text-white '
                    }`}
                >
                    Việt Nam
                </button>
                <button
                    type="button"
                    onClick={() => setIsActived(1)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  bg-transparent ${
                        isActived === 1 && 'bg-main-500 text-white '
                    }`}
                >
                    Quốc Tế
                </button>
            </div>
            <div className="flex flex-wrap w-full">
                {songs?.map((item) => (
                    <div className="w-[45%] min-[1024px]:w-[30%]">
                        <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                            size="w-[40px] h-[40px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewRelease;

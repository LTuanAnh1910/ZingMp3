import React, { useEffect } from 'react';
import { apiGerArtits, apiGetArtits } from '../../apis';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Section } from '../../components';
import { Navigate } from 'react-router-dom';

const SearchPlaylist = () => {
    const { searchData } = useSelector((state) => state.music);
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetArtits(searchData?.top?.alias);
            if (res.data.err === 0) {
                setPlaylists(res?.data?.data?.sections[1]);
            }
        };
        fetch();
    }, [searchData]);
    return (
        <div className="w-full flex flex-col px-[60px]">
            <h3>Playlist/Album</h3>
            <div className="flex items-start flex-wrap  justify-between text-sm gap-7">
                {playlists?.items?.map((item) => (
                    <div
                        key={item.encodeId}
                        className="flex flex-col gap-2 flex-1 justify-start text-[#FFFFFF80] cursor-pointer"
                        onClick={() => {
                            Navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
                        }}
                    >
                        <img src={item?.thumbnailM} alt="thumb" className="w-full object-contain rounded-lg" />
                        <span className="flex flex-col">
                            <span className="text-[#FFFFFF] font-bold">{`${
                                item.title?.length > 28 ? `${item.title?.slice(0, 26)} ...` : item.title
                            }`}</span>
                            {playlists?.sectionId === 'h100' ? (
                                <span>{item?.artistsNames}</span>
                            ) : (
                                <span>{`${
                                    item.sortDescription?.length > 44
                                        ? `${item.sortDescription?.slice(0, 60)} `
                                        : item.sortDescription
                                }`}</span>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPlaylist;

import React from 'react';
import { useSelector } from 'react-redux';
import { handleNumber } from '../../ultis/fn';
import SongItem from '../../components/SongItem';
import List from '../../components/List';
import { Section, Artist } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components';

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.app);

    // console.log(searchData);
    return (
        <div>
            <div className="w-full flex flex-col px-[60px] gap-[60px]">
                {isLoading && (
                    <div className="absolute z-20 top-0 bottom-0 right-0 left-0 bg-main-400 flex items-center justify-center">
                        <Loading />
                    </div>
                )}
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
                    <div className="flex gap-8 ">
                        {searchData?.top && (
                            <div className="p-[10px] cursor-pointer flex-1 bg-[#feffff0d] rounded-md flex gap-8 items-center">
                                <img
                                    src={searchData?.top?.thumbnail}
                                    alt="avatar"
                                    className={`w-84px h-[84px] object-cover ${
                                        searchData?.top?.objectType === 'artist' && 'rounded-full'
                                    }`}
                                />
                                <div className="flex flex-col text-xs">
                                    <span className="mb-[6px]">
                                        {searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {searchData?.top?.title || searchData?.top?.name}
                                    </span>
                                    {searchData?.top?.objectType === 'artist' && (
                                        <span>{handleNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>
                                    )}
                                </div>
                            </div>
                        )}
                        {searchData?.songs
                            ?.filter((item, index) => [...Array(2).keys()].some((i) => i === index))
                            .map((item) => (
                                <div key={item.encodeId} className="flex-1 ">
                                    <SongItem
                                        thumbnail={item.thumbnail}
                                        sid={item.encodeId}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        size="w-[84px] h-[84px]"
                                        style="bg-[#feffff0d]"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">Bài hát</h3>
                    <div className="flex justify-between flex-wrap w-full">
                        {searchData?.songs
                            ?.filter((item, index) => index <= 7)
                            ?.map((item, index) => (
                                <div
                                    key={item.encodeId}
                                    className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`}
                                >
                                    <List songData={item} isHideAlbum />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="text-lg font-bold mb-5">Playlist/Album</h3>
                    <div className="flex justify-between flex-wrap w-full gap-7">
                        {searchData?.playlists
                            ?.filter((item, index) => index <= 4)
                            ?.map((item) => (
                                <div
                                    key={item.encodeId}
                                    className="flex flex-col gap-2 flex-1 justify-start text-[#FFFFFF80] cursor-pointer"
                                    onClick={() => {
                                        navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
                                    }}
                                >
                                    <img
                                        src={item?.thumbnailM}
                                        alt="thumb"
                                        className="w-full object-contain rounded-lg"
                                    />
                                    <span className="flex flex-col">
                                        <span className="text-[#FFFFFF] font-bold">{`${
                                            item.title?.length > 28 ? `${item.title?.slice(0, 20)} ...` : item.title
                                        }`}</span>
                                        {item?.sectionId === 'search' ? (
                                            <span>{item?.artistsNames}</span>
                                        ) : (
                                            <span>{`${
                                                item.sortDescription?.length > 44
                                                    ? `${item.sortDescription?.slice(0, 45)}... `
                                                    : item.sortDescription
                                            }`}</span>
                                        )}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">Nghệ sĩ</h3>
                    <div className="flex  gap-8 w-full">
                        {searchData?.artists
                            ?.filter((item, index) => index <= 4)
                            ?.map((item) => (
                                <Artist
                                    key={item.id}
                                    title={item.name}
                                    image={item.thumbnailM}
                                    follower={item.totalFollow}
                                    link={item.link}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchAll;

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { apiGetArtits } from '../../apis';
import { handleNumber } from '../../ultis/fn';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { Artist, List } from '../../components';

const Singer = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState(null);
    console.log(artistData);
    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apiGetArtits(singer);
            if (res.data.err === 0) {
                setArtistData(res.data.data);
            }
        };
        singer && fetchArtistData();
    }, [singer]);
    return (
        <div>
            <div className="flex flex-col w-full relative  ">
                <img src={artistData?.cover} alt="backgroud" className="h-[500px] object-cover w-full" />
                <div className="absolute left-10 bottom-10 gap-2 ">
                    <span className="font-bold text-[60px] text-gray-700">{artistData?.name}</span>
                    <div className="flex gap-8 items-center justify-center">
                        <span className="text-gray-700 font-semibold text-[14px]">{`${handleNumber(
                            artistData?.totalFollow,
                        )} Người quan tâm`}</span>
                        <button
                            type="button"
                            className="bg-gray-700 px-4 py-2 text-sm rounded-l-full rounded-r-full items-center justify-center gap-2  flex hover:opacity-70"
                        >
                            <BsFillPersonPlusFill size={16} />
                            <span className="text-[#feffff]">Quan tâm</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='"w-full flex flex-col px-[60px] gap-[60px] pt-[50px] mb-[100px] '>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">Bài hát nổi bật</h3>
                    <div className="flex justify-between flex-wrap w-full">
                        {artistData?.sections[0]?.items
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
                <div>
                    <h3 className="text-lg font-bold mb-5">Single & EP</h3>
                    <div className="flex justify-between flex-wrap w-full gap-7">
                        {artistData?.sections[1]?.items
                            ?.filter((item, index) => index <= 4)
                            ?.map((item) => (
                                <div
                                    key={item.encodeId}
                                    className="flex flex-col gap-2 flex-1 justify-start text-[#FFFFFF80] cursor-pointer"
                                    onClick={() => {
                                        Navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
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
                <div>
                    <h3 className="text-lg font-bold mb-5">Xuất Hiện Trong</h3>
                    <div className="flex justify-between flex-wrap w-full gap-7">
                        {artistData?.sections[2]?.items
                            ?.filter((item, index) => index <= 4)
                            ?.map((item) => (
                                <div
                                    key={item.encodeId}
                                    className="flex flex-col gap-2 flex-1 justify-start text-[#FFFFFF80] cursor-pointer"
                                    onClick={() => {
                                        Navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
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
                    <h3 className="text-lg font-bold mb-5">Có Thể Bạn Sẽ Thích</h3>
                    <div className="flex  gap-8 w-full">
                        {artistData?.sections[6]?.items
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
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">{`Về ${artistData?.name}`}</h3>
                    <div className="flex gap-8">
                        <img src={artistData?.thumbnailM} alt="thumbnail" />
                        <div className="flex flex-col gap-8">
                            <div
                                className="text-[14px] text-[#ffffff80]"
                                dangerouslySetInnerHTML={{ __html: artistData?.biography }}
                            />
                            <span className="text-[#ffffff] font-bold text-[20px]">{`${handleNumber(
                                artistData?.totalFollow,
                            )} Người quan tâm`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singer;

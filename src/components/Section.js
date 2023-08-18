import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Section = ({ data }) => {
    const navigate = useNavigate();
    console.log(data);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#FFFFFF]">{data?.title}</h3>
                <span className="text-xs">TẤT CẢ</span>
            </div>
            <div className="flex items-start  justify-between text-sm gap-7">
                {data?.items
                    ?.filter((item, index) => index <= 4)
                    .map((item) => (
                        <div
                            key={item.encodeId}
                            className="flex flex-col gap-2 flex-1 justify-start text-[#FFFFFF80] cursor-pointer"
                            onClick={() => {
                                navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
                            }}
                        >
                            <img src={item?.thumbnailM} alt="thumb" className="w-full object-contain rounded-lg" />
                            <span className="flex flex-col">
                                <span className="text-[#FFFFFF] font-bold">{item.title} </span>
                                {data?.sectionId === 'h100' ? (
                                    <span>{item?.artistsNames}</span>
                                ) : (
                                    <span>{`${
                                        item.sortDescription?.length > 44
                                            ? `${item.sortDescription?.slice(0, 44)}...`
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

export default memo(Section);

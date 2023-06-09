import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Section = () => {
    const { friday } = useSelector((state) => state.app);
    const navigate = useNavigate();
    console.log(friday);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#FFFFFF]">{friday?.title}</h3>
                <span className="text-xs">TẤT CẢ</span>
            </div>
            <div className="flex items-center  justify-between text-sm items-center gap-7">
                {friday?.items?.map((item) => (
                    <div
                        key={item.encodeId}
                        className="flex flex-col gap-2 flex-1 text-[#FFFFFF80] cursor-pointer"
                        onClick={() => {
                            navigate(item?.link?.split('.')[0]); // split dùng để cắt mảng và lấy ptu thứ nhất
                        }}
                    >
                        <img src={item?.thumbnailM} alt="thumb" className="w-full object-contain rounded-lg" />
                        <span className="text-[#FFFFFF] font-bold">{item.title} </span>

                        <span>{`${
                            item.sortDescription?.length > 44
                                ? `${item.sortDescription?.slice(0, 44)}...`
                                : item.sortDescription
                        }`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(Section);

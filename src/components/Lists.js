import React from 'react';
import List from './List';
import { memo } from 'react';

//*phải nhận bằng destructuring {}
const Lists = ({ songs, totalDuration }) => {
    // console.log(songs, totalDuration);
    return (
        <div className="w-full flex flex-col text-xs ">
            <div className="flex justify-between items-center p-[10px] font-semibold text-[#FFFFFF80]">
                <span>BÀI HÁT</span>
                <span>ALBUM</span>
                <span>THỜI GIAN</span>
            </div>
            <div className="flex flex-col">
                {songs?.map((item) => (
                    <List songData={item} key={item.encodeId} />
                ))}
            </div>
        </div>
    );
};

export default memo(Lists);
//dùng memo tránh rerender list khi lists thay đổi

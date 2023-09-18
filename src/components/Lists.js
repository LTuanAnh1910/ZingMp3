import React from 'react';
import List from './List';
import { memo } from 'react';
import icons from '../ultis/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const { BsDot } = icons;

//*phải nhận bằng destructuring {}
const Lists = ({ totalDuration }) => {
    // console.log(songs, totalDuration);

    const { songs } = useSelector((state) => state.music);

    return (
        <div className="w-full flex flex-col text-xs ">
            <div className="flex justify-between items-center p-[10px] font-semibold text-[#FFFFFF80] ">
                <span>BÀI HÁT</span>
                <span>ALBUM</span>
                <span>THỜI GIAN</span>
            </div>
            <div className="flex flex-col ">
                {songs?.map((item) => (
                    <List songData={item} key={item.encodeId} />
                ))}
            </div>
            {totalDuration && (
                <span className="flex items-center gap-1 py-[10px] border-t border-[#404040]">
                    <span>{`${songs?.length} bài hát`}</span>
                    <span>
                        <BsDot size={24} />
                    </span>
                    <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
                </span>
            )}
        </div>
    );
};

export default memo(Lists);
//dùng memo tránh rerender list khi lists thay đổi

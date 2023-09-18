import React, { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { hover } from '@testing-library/user-event/dist/hover';

const SongItem = ({ thumbnail, title, artists, releaseDate, sid, order, percent, style, size }) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid));
                dispatch(actions.play(true));
            }}
            className={`w-full flex-auto p-[10px] flex gap-[10px] rounded-md justify-between items-center  cursor-pointer ${
                style ? 'text-white hover:bg-[#945EA7] hover: rounded-md' : 'text-white hover:bg-main-200'
            }`}
        >
            <div className="flex gap-4">
                {order && (
                    <span
                        className={`${
                            order === 1 ? 'text-shadow ' : ''
                        } text=[rgba(77,34,104,0.9)]  m-auto text-[32px]`}
                    >
                        {order}
                    </span>
                )}
                <img
                    src={thumbnail}
                    alt="thumbnail"
                    className={`${size || 'w-[60px] h-[60px]'} object-cover rounded-md`}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                        {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </span>
                    <span className="text-xs text-gray-400">
                        {artists?.length > 30 ? `${artists.slice(0, 30)}...` : artists}
                    </span>
                    {releaseDate && (
                        <span className="text-xs text-gray-400">{moment(releaseDate * 1000).fromNow()}</span>
                    )}
                </div>
            </div>
            {percent && <span>{percent}%</span>}
        </div>
    );
};

export default memo(SongItem);

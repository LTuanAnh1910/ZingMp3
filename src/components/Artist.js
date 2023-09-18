import React, { useState } from 'react';
import { memo } from 'react';
import { handleNumber } from '../ultis/fn';
import { useSelector } from 'react-redux';
import icons from '../ultis/icons';
import { Link } from 'react-router-dom';

const Artist = ({ image, title, follower, link }) => {
    const [isHover, setIsHover] = useState(false);
    const { BsFillPersonPlusFill } = icons;

    return (
        <div className="w-1/5 flex flex-col gap-[15px] items-center justify-center cursor-pointer">
            <Link
                className="relative overflow-hidden"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                to={link}
            >
                <img
                    src={image}
                    alt="singer"
                    className={`w-full  object-contain rounded-full ${isHover && 'animate-scale-up-image'}`}
                />
                {isHover && <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 rounded-full"></div>}
            </Link>
            <Link className="text-sm font-medium hover:text-main-500" to={link}>
                {title}
            </Link>
            <span className="text-xs opacity-70">{`${handleNumber(follower)} quan tâm`}</span>
            <button
                type="button"
                className="bg-main-500 px-4 py-2 text-sm rounded-l-full rounded-r-full items-center justify-center gap-2  flex "
            >
                <BsFillPersonPlusFill size={16} />
                <span>Quan tâm</span>
            </button>
        </div>
    );
};

export default memo(Artist);

import React from 'react';
import icons from '../ultis/icons';
import Search from './Search';

const { HiArrowSmallLeft, HiArrowSmallRight } = icons;
function Header() {
    return (
        <div className="flex justify-between w-full">
            <div className="flex gap-6 w-full items-center">
                <div className="flex gap-6 cursor-pointer">
                    <span>
                        <HiArrowSmallLeft size={24} />
                    </span>
                    <span>
                        <HiArrowSmallRight size={24} />
                    </span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
            <div>Login</div>
        </div>
    );
}

export default Header;

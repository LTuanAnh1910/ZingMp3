import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import { searchMenu } from '../../ultis/menu';
import { useSelector } from 'react-redux';

const notActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer';
const activeStyle =
    'px-4 hover:text-main-500 font-semibold cursor-pointer border-b-2 border-main-500 text text-main-500 h-[50px] flex items-center ';

const Search = () => {
    const { keyword } = useSelector((state) => state.music);
    // console.log(keyword);

    return (
        <div className="w-full">
            <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-500 pl-[60px] py-1 ">
                <span className="text-[24px]  font-bold border-r border-gray-500 pr-6">Kết quả tìm kiếm</span>
                <div className="flex items-center ">
                    {searchMenu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keyword}`}
                            className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
            <div className="w-full h-[90px]"></div>
        </div>
    );
};

export default Search;

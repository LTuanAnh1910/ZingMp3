import logo from '../assets/logo.svg';
import { sidebarMenu } from '../ultis/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // hook dùng để chuyển trang
import path from '../ultis/path';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#a0a0a0] flex gap-[12px] items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#FFFFFF] flex gap-[12px] items-center';

function SidebarLeft() {
    const navigate = useNavigate(); // định nghĩa 1 navigate dùng để điều hướng
    return (
        <div className="flex h-full flex-col bg-main-100 ">
            <div
                onClick={() => navigate(path.HOME)}
                className="w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start cursor-pointer"
            >
                <img src={logo} alt="logo" className="w-[120px] h-10" />
            </div>
            <div className="flex flex-col  gap-2 ">
                {sidebarMenu.map((item) => (
                    <NavLink
                        to={item.path}
                        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                        key={item.path}
                        end={item.end}
                    >
                        {item.icons}
                        <span className="hover:text-[#ffffff]">{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SidebarLeft;

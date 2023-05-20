import logo from '../assets/logo.svg';
import { sidebarMenu } from '../ultis/menu';
import { NavLink } from 'react-router-dom';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#dadada] flex gap-[12px] items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] text-[#FFFFFF] flex gap-[12px] items-center';

function SidebarLeft() {
    return (
        <div className="flex h-full flex-col bg-main-100 ">
            <div className="w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start">
                <img src={logo} alt="logo" className="w-[120px] h-10" />
            </div>
            <div className="flex flex-col">
                {sidebarMenu.map((item) => (
                    <NavLink
                        to={item.path}
                        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                        key={item.path}
                        end={item.end}
                    >
                        {item.icons}
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SidebarLeft;

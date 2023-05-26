import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../components';

function Public() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-main-300  text-[#dadada]">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px]  flex-none border border-blue-500">
                    <SidebarLeft />
                </div>
                <div className="flex-auto border border-red-500 ">
                    <Outlet />
                </div>
                <div className="w-[329px] hidden screen-1400:flex flex-none border  border-green-500 animate-slide-left">
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none h-[90px]">
                <Player />
            </div>
        </div>
    );
}

export default Public;

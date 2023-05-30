import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight, Header } from '../../components';

function Public() {
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-300  text-[#dadada]">
            <div className="w-full h-full flex flex-auto ">
                <div className="w-[240px] h-full  flex-none border border-blue-500">
                    <SidebarLeft />
                </div>
                <div className="flex-auto border border-red-500 overflow-hidden">
                    <div className="h-[70px]  px-[59px] flex items-center rgba(30,30,30,0.8) mb-5 ">
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className="w-[329px] hidden screen-1400:flex flex-none border  border-green-500 animate-slide-left">
                    <SidebarRight />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[90px]">
                <Player />
            </div>
        </div>
    );
}

export default Public;

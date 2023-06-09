import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight, Header } from '../../components';

function Public() {
    return (
        <div className="w-full relative h-screen flex flex-col  text-[#dadada]">
            <div className="w-full h-full flex flex-auto ">
                <div className="w-[240px] h-full bg-main-300  flex-none border border-blue-500">
                    <SidebarLeft />
                </div>
                <div className="flex-auto bg-main-400">
                    <div className="h-[70px]  px-[59px] flex items-center rgba(30,30,30,0.8) ">
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className="w-[329px] hidden screen-1400:flex flex-none border  border-green-500 animate-slide-left bg-main-400">
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

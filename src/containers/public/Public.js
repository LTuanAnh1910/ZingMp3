import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight, Header } from '../../components';
import { Loading } from '../../components';
import { useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars-2';

function Public() {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
    const { isLoading } = useSelector((state) => state.app);
    const { curSongId } = useSelector((state) => state.music);
    return (
        <div className="w-full relative h-screen flex flex-col  text-[#dadada] bg-main-400">
            <div className="w-full h-full flex flex-auto ">
                <div className="w-[240px] h-full bg-main-300 text-sm  flex-none ">
                    <SidebarLeft />
                </div>
                <div className="flex-auto bg-main-400 flex flex-col relative">
                    {isLoading && (
                        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 bg-main-400 flex items-center justify-center">
                            <Loading />
                        </div>
                    )}

                    <div className="h-[70px] flex-none px-[59px] flex items-center rgba(30,30,30,0.8) ">
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars autoHide style={{ width: ' 100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && (
                    <div className=" w-[329px] hidden screen-1400:flex flex-none h-screen  animate-slide-left bg-main-400">
                        <SidebarRight />
                    </div>
                )}
            </div>
            {curSongId && (
                <div className="fixed bottom-0 left-0 right-0 h-[90px] z-40">
                    <Player setIsShowRightSidebar={setIsShowRightSidebar} />
                </div>
            )}
        </div>
    );
}

export default Public;

import React from 'react';
import { Sliders, Section, NewRelease, ChartSection } from '../../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const { friday, newEveryday, trendingArtist, h100, hAlbum, weekChart } = useSelector((state) => state.app);
    // console.log(weekChart);
    return (
        <div className="overflow-y-auto  ">
            <Sliders />
            <Section data={newEveryday} />
            <Section data={trendingArtist} />
            <Section data={friday} />
            <NewRelease />
            <Section data={h100} />
            <ChartSection />
            <Section data={hAlbum} />
            <div className="flex items-center px-[43px] w-full mt-12">
                {weekChart?.map((item) => (
                    <Link to={item?.link.split('.')[0]} key={item?.link} className="flex-1 px-4">
                        <img src={item.cover} alt="cover" className="w-full object-cover rounded-md " />
                    </Link>
                ))}
            </div>

            {/* <div className="mt-[20px] px-[59px] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-[20px] font-bold text-[#FFFFFF]">{favoritedArtist?.title}</h3>
                    <span className="text-xs">TẤT CẢ</span>
                </div>
                <div className="flex mx-[-16px] ">
                    {favoritedArtist?.items
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <div key={item.encodeId} className="flex-1 px-4">
                                <img src={item.thumbnail} alt="singer" className="w-full object-contain" />
                            </div>
                        ))}
                </div>
            </div> */}
            {/* <Section data={hLiveRadio} /> */}
            <div className="w-full h-[100px]"></div>
        </div>
    );
}

export default Home;

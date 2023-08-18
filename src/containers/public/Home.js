import React from 'react';
import { Slider, Section } from '../../components';
import { useSelector } from 'react-redux';

function Home() {
    const { friday, newEveryday, trendingArtist, h100, hAlbum, hLiveRadio } = useSelector((state) => state.app);

    return (
        <div className="overflow-y-auto  ">
            <Slider />
            <Section data={newEveryday} />
            <Section data={trendingArtist} />
            <Section data={friday} />
            <Section data={h100} />
            <Section data={hAlbum} />
            {/* <Section data={hLiveRadio} /> */}
            <div className="w-full h-[100px]"></div>
        </div>
    );
}

export default Home;

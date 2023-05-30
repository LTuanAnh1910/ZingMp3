import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as apis from '../../apis';
import moment from 'moment';
import { Lists } from '../../components';

const Album = () => {
    const { pid } = useParams();
    const [playlistData, setPlayListData] = useState({});

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(pid);
            if (response?.data.err === 0) {
                setPlayListData(response?.data.data);
                console.log(response);
            }
        };
        fetchDetailPlaylist();
    }, [pid]);
    return (
        <div className="flex gap-8 w-full px-[59px]">
            <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-1">
                <img
                    src={playlistData?.thumbnailM}
                    alt="thumbnail"
                    className="w-full object-contain rounded-md shadow-md "
                />
                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-[20px] font-bold text-[#FFFFFF] ">{playlistData?.title}</h3>
                    <span className="text-[12px] text-[#FFFFFF80] font-semibold flex gap-2 items-center">
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                    </span>
                    <span>
                        <h3 className="text-[12px] text-[#FFFFFF80] font-semibold overflow-hidden truncate w-40 inline-block">
                            {playlistData?.artistsNames}
                        </h3>
                    </span>
                    <span className="text-[12px] text-[#FFFFFF80] font-semibold flex items-center">{`${Math.round(
                        playlistData?.like / 1000,
                    )}K người yêu thích`}</span>
                </div>
            </div>
            <div className="flex-auto border border-blue-500 overflow-y-scroll">
                <span className="flex gap-1 text-[14px] ">
                    <span className="text-[#FFFFFF80]">Lời tựa </span>
                    <span className="text-[#FFFFFF]">{playlistData?.sortDescription}</span>
                </span>
                {/* truyền xuống thằng con bằng destructuring để component thằng con nhận được */}
                <Lists songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
            </div>
        </div>
    );
};

export default Album;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as apis from '../../apis';
import moment from 'moment';
import { Lists, AudioLoading } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars-2';
import * as actions from '../../store/actions';
import icons from '../../ultis/icons';

const { BsPlayCircle } = icons;

const Album = () => {
    const { isPlaying } = useSelector((state) => state.music);

    const { pid } = useParams();
    const [playlistData, setPlayListData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions?.setCurAlbumId(pid));
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loading(true));
            const response = await apis.apiGetDetailPlaylist(pid);
            dispatch(actions.loading(false));

            if (response?.data.err === 0) {
                setPlayListData(response?.data.data);
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
            }
        };
        fetchDetailPlaylist();
    }, [pid]);
    return (
        <div className="flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center">
            <div className="flex-none w-1/4   flex flex-col items-center gap-1">
                <div className="w-full relative overflow-hidden">
                    <img
                        src={playlistData?.thumbnailM}
                        alt="thumbnail"
                        className={`w-full object-contain ${
                            isPlaying ? 'rounded-full animate-rotate-center' : ' rounded-md animate-rotate-center-pause'
                        } shadow-md`}
                    />
                    <div
                        className={`absolute top-0 bottom-0 left-0 right-0 hover:bg-overlay-30  text-[#fff] flex items-center justify-center ${
                            isPlaying && 'rounded-full'
                        }`}
                    >
                        {isPlaying ? (
                            <span className="p-2 border border-[#fff] rounded-full ">
                                <AudioLoading />
                            </span>
                        ) : (
                            <BsPlayCircle size={32} />
                        )}
                    </div>
                </div>
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
            <Scrollbars style={{ width: '100%', height: '80%' }}>
                <div className="flex-auto  mb-40">
                    <span className="flex gap-1 text-[14px] ">
                        <span className="text-[#FFFFFF80]">Lời tựa </span>
                        <span className="text-[#FFFFFF]">{playlistData?.sortDescription}</span>
                    </span>
                    {/* truyền xuống thằng con bằng destructuring để component thằng con nhận được */}
                    <Lists totalDuration={playlistData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    );
};

export default Album;

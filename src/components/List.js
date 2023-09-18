import icons from '../ultis/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { memo } from 'react';

const { CgMusic } = icons;
const List = ({ songData, isHideAlbum }) => {
    const dispatch = useDispatch();
    // console.log(songData);
    return (
        <div
            className="flex justify-between items-center p-[10px]  whitespace-nowrap position: relative overflow-y-auto border-0 border-t border-[#404040] hover:bg-[#404040]"
            onClick={() => {
                dispatch(actions.setCurSongId(songData.encodeId));
                dispatch(actions.play(true));
                dispatch(actions.playAlbum(true));
                dispatch(
                    actions.setRecent({
                        thumbnail: songData?.thumbnail,
                        title: songData?.title,
                        sid: songData?.sid,
                        artists: songData?.artistsNames,
                    }),
                );
            }}
        >
            <div className="flex items-center gap-3 flex-1 ">
                {!isHideAlbum && (
                    <span>
                        <CgMusic />
                    </span>
                )}
                <img className="w-10 h-10 rounded-md object-cover" src={songData.thumbnail} alt="thumb" />
                <div className="flex flex-col  ">
                    <span className="text-sm font-semibold text-[#FFFFFF] ">{`${
                        songData.title?.length > 20 ? `${songData.title?.slice(0, 20)}...` : songData.title
                    }`}</span>
                    <span className="text-[12px] font-semibold text-[#FFFFFF80] hover:text-main-500 cursor-pointer">
                        {`${
                            songData?.album?.title?.length > 20
                                ? `${songData.artistsNames?.slice(0, 20)}...`
                                : songData.artistsNames
                        }`}
                    </span>
                </div>
            </div>
            {!isHideAlbum && (
                <div className="flex-1 flex justify-center items-center position: absolute left-[45%] hover:text-main-500 text-[#FFFFFF80] cursor-pointer">
                    {`${
                        songData?.album?.title?.length > 20
                            ? `${songData?.album?.title?.slice(0, 20)}...`
                            : songData?.album?.title
                    }`}
                </div>
            )}
            <div className="flex-1 flex justify-end ">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
};

export default memo(List);

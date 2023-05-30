import icons from '../ultis/icons';
import moment from 'moment';

const List = ({ songData }) => {
    console.log(songData);
    const { CgMusic } = icons;
    return (
        <div className="flex justify-between items-center p-[10px] cursor-pointer whitespace-nowrap position: relative overflow-y-auto ">
            <div className="flex items-center gap-3 flex-1 ">
                <span>
                    <CgMusic />
                </span>
                <img className="w-10 h-10 rounded-md object-cover" src={songData.thumbnail} alt="thumb" />
                <div className="flex flex-col  ">
                    <span className="text-sm font-semibold text-[#FFFFFF] ">{`${
                        songData.title?.length > 20 ? `${songData.title?.slice(0, 20)}...` : songData.title
                    }`}</span>
                    <span className="text-[12px] font-semibold text-[#FFFFFF80] hover:text-main-500 ">
                        {`${
                            songData?.album?.title?.length > 20
                                ? `${songData.artistsNames?.slice(0, 20)}...`
                                : songData.artistsNames
                        }`}
                    </span>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center position: absolute left-[45%] hover:text-main-500 ">
                {}
                {`${
                    songData?.album?.title?.length > 20
                        ? `${songData?.album?.title?.slice(0, 20)}...`
                        : songData?.album?.title
                }`}
            </div>
            <div className="flex-1 flex justify-end ">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
};

export default List;

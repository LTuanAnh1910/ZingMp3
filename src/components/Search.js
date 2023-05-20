import icons from '../ultis/icons';

const { BsSearch } = icons;

function Search() {
    return (
        <div className="w-full flex items-center ">
            <span className="h-10 pl-4 bg-[#ffffff1a] flex items-center justify-center rounded-l-[20px]  ">
                <BsSearch size={20} />
            </span>
            <input
                type="text"
                className="bg-[#ffffff1a] outline-none px-4 py-2 rounded-r-[20px] h-10 w-full text-gray-400  "
                placeholder="Tìm kiếm nghệ sĩ, lời bài hát, bài hát..."
            />
        </div>
    );
}

export default Search;

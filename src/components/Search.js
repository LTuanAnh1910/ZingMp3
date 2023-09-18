import icons from '../ultis/icons';
import { apiSearch } from '../apis';
import { useEffect, useState } from 'react';
import { Await } from 'react-router-dom';
import * as actions from '../store/actions';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '../ultis/path';

const { BsSearch, GrClose } = icons;

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };
    return (
        <div className="w-full flex relative items-center ">
            {keyword && (
                <span onClick={() => setKeyword('')} className="absolute right-[16px] cursor-pointer  ">
                    <GrClose size={16} />
                </span>
            )}
            <span className="h-10 pl-4 bg-[#ffffff1a] flex items-center justify-center rounded-l-[20px]  ">
                <BsSearch size={20} />
            </span>
            <input
                type="text"
                className="bg-[#ffffff1a] outline-none px-4 py-2 rounded-r-[20px] h-10 w-full text-gray-400  "
                placeholder="Tìm kiếm nghệ sĩ, lời bài hát, bài hát..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    );
}

export default Search;

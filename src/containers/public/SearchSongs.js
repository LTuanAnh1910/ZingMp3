import React from 'react';
import { Lists, List } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

const SearchSongs = () => {
    const { searchData } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    // console.log(searchData);
    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.id));
    }, [searchData]);

    return <Lists />;
};

export default SearchSongs;

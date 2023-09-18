//lưu các state, là các biến liên quan đến app
import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    friday: {},
    newEveryday: {},
    trendingArtist: {},
    h100: {},
    hAlbum: {},
    hLiveRadio: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
    favoritedArtist: {},
    chart: {},
    rank: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || {},
                newEveryday: action.homeData?.find((item) => item.sectionId === 'hEditorTheme2') || {},
                trendingArtist: action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || {},
                h100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
                hAlbum: action.homeData?.find((item) => item.sectionId === 'hAlbum') || {},
                hLiveRadio: action.homeData?.find((item) => item.sectionId === 'hLiveRadio') || {},
                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || [],
                favoritedArtist: action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || {},
                chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || [],
            };

        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };

        default:
            return state;
    }
};

export default appReducer;

const path = {
    PUBLiC: '/',
    HOME: '',
    LOGIN: 'login',
    STAR: '*',
    MY_MUSIC: 'mymusic',
    ALBUM__TITLE_PID: 'album/:title/:pid', //:title/:pid thêm : có nghĩa là định nghĩa nó là param
    PLAYLIST__TITLE_PID: 'playlist/:title/:pid', //:title/:pid thêm : có nghĩa là định nghĩa nó là param
    WEEKRANK__TITLE_PID: 'zing-chart-tuan/:title/:pid', //:title/:pid thêm : có nghĩa là định nghĩa nó là param
    ZING_CHART: 'zing-chart',
    SEARCH: 'tim-kiem',
    ALL: 'tat-ca',
    SONG: 'bai-hat',
    PLAYLIST_SEARCH: 'playlist',
    HOME_SINGER: ':singer',
    HOME_ARTIST_SINGER: 'nghe-si/:singer',
};

export default path;

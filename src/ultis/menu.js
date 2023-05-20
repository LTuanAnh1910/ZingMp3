import icons from './icons';

const { MdOutlineLibraryMusic, BiDisc, MdMultilineChart, GiNotebook } = icons;

export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />,
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icons: <BiDisc size={24} />,
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <MdMultilineChart size={24} />,
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <GiNotebook size={24} />,
    },
];

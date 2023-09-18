/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            backgroundColor: {
                'main-100': '#0000001a',
                'main-200': '#00000080',
                'main-300': '#000000cc',
                'main-400': '#181818',
                'main-500': '#9b4de0',
                'overlay-30': 'rgba(0, 0,0, 0.3)',
            },
            colors: {
                'main-100': '#0000001a',
                'main-200': '#00000080',
                'main-300': '#000000cc',
                'main-400': '#181818',
                'main-500': '#9b4de0',
            },

            keyframes: {
                'slide-right': {
                    '0%': {
                        '-webkit-transform': ' translateX(-500px);',
                        transform: 'translateX(-500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left': {
                    '0%': {
                        '-webkit-transform': ' translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left2': {
                    '0%': {
                        '-webkit-transform': ' translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },

                'rotate-center': {
                    '0%': {
                        '-webkit-transform': ' rotate(0)',
                        transform: 'rotate(0)',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                    },
                },

                'rotate-center-pause': {
                    '0%': {
                        '-webkit-transform': ' rotate(0)',
                        transform: 'rotate(0)',
                        'border-radius': '999999px',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                    },
                },
                'scale-up-center': {
                    '0%': {
                        '-webkit-transform': ' scale(0)',
                        transform: 'scale(0)',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                },
            },
            animation: {
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'rotate-center': 'rotate-center 8s linear infinite',
                'rotate-center-pause': 'rotate-center-pause 0.4s linear 2 both',
                'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
            flex: {
                4: '4 4 0%',
                3: '3 3 0%',
                6: '6 6 0%',
                7: '7 7 0%',
            },
        },
        screens: {
            'screen-1400': '1400px',
            'screen-1600': '1600px',
        },
    },
    plugins: [require('tailwindcss-textshadow')],
    mode: 'jit',
};

import React from 'react';
import { memo } from 'react';
import { Audio } from 'react-loader-spinner';

const AudioLoading = () => {
    return (
        <Audio
            height="24"
            width="24"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
};

export default memo(AudioLoading);

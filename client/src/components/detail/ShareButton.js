import React from 'react';

import ShareButton from './shareButton.svg';

const ShareIcon = ({
                  style = {},
                   fill = 'black',
                   width = '100%',
                   className = '',
                   height = '100%',
                   viewBox = '0 0 291.5 345.5',
                    }) => {
                      return (
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width} height={height}>
                        <title>ShareButton1</title>
                        <path fill={fill} d="M405.5,455.5a49.84,49.84,0,0,0-35.89,15.2l-108.1-70.14a50.09,50.09,0,0,0,.12-33.76l109.45-71a50,50,0,1,0-12.54-20L248.68,347a50,50,0,1,0-.28,73.22l109.21,70.87A50,50,0,1,0,405.5,455.5Z" transform="translate(-164.5 -210)"/>
                        </svg>
                      );
}

export default ShareIcon;

import React from 'react';

import ShareButton from './shareButton.svg';

const ShareIcon = ({
                  style = {},
                   fill = '',
                   stroke = '',
                   width = '100%',
                   className = '',
                   height = '100%',
                   viewBox = '0 0 314.5 368.5',
                    }) => {
                      return (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width} height={height}>
                          <path fill={fill} stroke={stroke} d="M252.5,245.5a61.38,61.38,0,0,0-45.67,20.36l-88.48-57.42a61.32,61.32,0,0,0,.13-46.53l89.79-58.27a61.34,61.34,0,1,0-12.63-20l-90.11,58.47a61.5,61.5,0,1,0-.26,86l89.38,58A61.5,61.5,0,1,0,252.5,245.5ZM253,23a38.5,38.5,0,1,1-38.5,38.5A38.54,38.54,0,0,1,253,23ZM61.5,223.5A38.5,38.5,0,1,1,100,185,38.54,38.54,0,0,1,61.5,223.5Zm191,122A38.5,38.5,0,1,1,291,307,38.54,38.54,0,0,1,252.5,345.5Z"/>
                        </svg>
                      );
}

export default ShareIcon;

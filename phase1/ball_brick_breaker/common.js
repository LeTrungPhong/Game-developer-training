export const itemWidth = 50;
export const itemHeight = itemWidth;
export const heightScore = 100;
export const heightBottom = heightScore;
export const heightBorder = 5;
export const colorBottomScore = 'red';
export const colorTopBottom = colorBottomScore;
export const backgroundScore = 'gray';
export const backgroundBottom = backgroundScore;
export const backgroundGame = 'rgb(95, 63, 63)';
export const sizeColumnGrid = 6;
export const sizeRowGrid = 9;
export const sizeColumnItem = 9;
export const sizeRowItem = 12;
export const heightGame = sizeRowItem * itemHeight;
export const canvasWidth = itemWidth * sizeColumnItem;
export const itemGridWidth = canvasWidth / sizeColumnGrid;
export const canvasHeight = itemHeight * sizeRowItem + heightScore + heightBottom + heightBorder * 2;
export const itemGridHeight = heightGame / sizeRowGrid;
export const canvasBorder = '1px solid black';
export const heightTextScore = 50;
export const radiusBall = 15;
export const postX = canvasWidth / 2;
export const postY = heightScore + heightBorder + heightGame - radiusBall;
export const colorTextItem = 'white';
export const speedBall = 1000;
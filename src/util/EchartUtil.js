export var getThumbnailOptionTemplate = function (titleText, callbackFn) {
    return {
        title: {
            text: titleText,
            left: 'center',
            textStyle: {
                //文字颜色
                color: 'rgba(93,93,93,0.75)',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bold',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            position: function (point, params, dom, rect, size) {
                // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                // 提示框位置
                let x = 0; // x坐标位置
                let y = 0; // y坐标位置

                // 当前鼠标位置
                let pointX = point[0];
                let pointY = point[1];

                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];

                // 提示框大小
                let boxWidth = size.contentSize[0];
                let boxHeight = size.contentSize[1];

                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                    x = 5;
                } else { // 左边放的下
                    x = pointX - boxWidth;
                }

                // boxHeight > pointY 说明鼠标上边放不下提示框
                if (boxHeight > pointY) {
                    y = 5;
                } else { // 上边放得下
                    y = pointY - boxHeight;
                }

                return [x, y];
            }
        },
        toolbox: {
            feature: {
                myButton: {
                    show: true,
                    title: '放大',
                    icon: 'path://M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160',
                    onclick: callbackFn,
                },
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1],
                height: '10'
            },
        ],
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '25%',
            containLabel: true
        },
    };
}

export var getOptionTemplate = function (titleText) {
    return {
        title: {
            text: titleText,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            position: function (point, params, dom, rect, size) {
                // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                // 提示框位置
                let x = 0; // x坐标位置
                let y = 0; // y坐标位置

                // 当前鼠标位置
                let pointX = point[0];
                let pointY = point[1];

                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];

                // 提示框大小
                let boxWidth = size.contentSize[0];
                let boxHeight = size.contentSize[1];

                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                    x = 5;
                } else { // 左边放的下
                    x = pointX - boxWidth;
                }

                // boxHeight > pointY 说明鼠标上边放不下提示框
                if (boxHeight > pointY) {
                    y = 5;
                } else { // 上边放得下
                    y = pointY - boxHeight;
                }

                return [x, y];
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1],
                height: '10'
            },
        ],
    };
}

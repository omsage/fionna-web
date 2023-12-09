<template>
  <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      :direction="direction"
      :size="400"
  >
    <div id="drawerEcharts" style="width: 100%;height: 100%"></div>
  </el-drawer>
  <div id="containerEcharts" style="width: 300px;height: 200px"></div>

</template>
<script setup>
import * as echarts from 'echarts/core';
import {nextTick, ref, watch} from 'vue';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

let drawer = ref(false)
const direction = ref('ttb')

echarts.use(
    [
      DataZoomComponent,
      ToolboxComponent,
      GridComponent,
      LegendComponent,
      LineChart,
      CanvasRenderer,
      TitleComponent,
      TooltipComponent,
    ]
)

const props = defineProps({
  isStart: Boolean,
})

let myChart;

let drawChart;

nextTick(() => {
  let dom = document.getElementById('containerEcharts');

  myChart = echarts.init(
      dom,
      null,
      {
    renderer: 'canvas',
    useDirtyRect: false
      });

})

watch(() => props.isStart, (isStart) => {
  console.log(isStart)
  if (isStart){
    printTest(myChart)
  }
})
function showChart() {
  drawer.value = true

  nextTick(() => {
    // 在这里编写放大图表的逻辑
    let domDrawer = document.getElementById('drawerEcharts');

    drawChart = echarts.init(
        domDrawer,
        null,
        {
          renderer: 'canvas',
          useDirtyRect: false
        });
    printTest1(drawChart)
  })
}

function handleClose(done) {
  drawer.value = false
}

const printTest = (charter) => {

  var option;

  option = {
    title: {
      text: 'Stacked Area Chart',
      left:'center',
      textStyle:{
        //文字颜色
        color:'rgba(93,93,93,0.75)',
        //字体风格,'normal','italic','oblique'
        fontStyle:'normal',
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight:'bold',
        //字体系列
        fontFamily:'sans-serif',
        //字体大小
        fontSize:12
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
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    toolbox: {
      // left: '5px',
      // top: '0px',
      feature: {
        myButton: {
          show: true,
          title: '放大',
          icon: 'path://M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160',
          onclick: showChart,
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
        height:'10'
      },
    ],
    grid: {
      top:'15%',
      left: '3%',
      right: '4%',
      bottom: '25%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      {
        name: 'app-cpu',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [321, 33, 1010, 934, 390, 430, 390]
      },
    ]
  };

  if (option && typeof option === 'object') {
    charter.setOption(option);
  }

  window.addEventListener('resize', charter.resize);
}

const printTest1 = (charter) => {

  var option;

  option = {
    title: {
      text: 'Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        myButton: {
          show: true,
          title: '放大',
          icon: 'image://favicon.ico',
          onclick: showChart,
        },
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        // stack: 'Total',
        // areaStyle: {},
        // emphasis: {
        //   focus: 'series'
        // },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      {
        name: 'app-cpu',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [321, 33, 1010, 934, 390, 430, 390]
      },
    ]
  };

  if (option && typeof option === 'object') {
    charter.setOption(option);
  }

  window.addEventListener('resize', charter.resize);
}

</script>

<style scoped>

</style>
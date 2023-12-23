<template>
  <div :class="{
        landscapeScreenBottom:props.isLandscapeScreen,
        portraitScreenRight:!props.isLandscapeScreen
      }">
    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartCPU'" :echartOption="CPUOption" ></PerfEchart>
<!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartMEM'" ></PerfEchart>-->
<!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartFPS'" ></PerfEchart>-->
<!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartJank'" ></PerfEchart>-->
  </div>
</template>

<script  setup>
import PerfEchart from "@/components/PerfEchart.vue"
import {ref} from "vue";

const props = defineProps({
  isStartPerf: Boolean,
  deviceSerial:String,
  isLandscapeScreen:Boolean
})

let CPUOption = ref({});

CPUOption.value = {
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

</script>

<style scoped>

.portraitScreenRight {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}

.landscapeScreenBottom {
  /*height: calc(100% - 50px);*/
  /*flex: 0 0 calc(25% - 10px); !* 计算每个图片的宽度，减去间距 *!*/
  margin: 30px; /* 图片之间的间距 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap;
}
</style>
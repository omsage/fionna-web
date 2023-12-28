<template xmlns="http://www.w3.org/1999/html">
  <div :class="{
        landscapeScreenBottom:props.isLandscapeScreen,
        portraitScreenRight:!props.isLandscapeScreen
      }">
    <el-drawer
        v-model="isOpenProcCPUDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="cpuProcPerfEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div style="width: 50%; float: left; overflow: hidden;height: 170px">
      <div :id="cpuProcPerfEChartID" style="width:100%;height: 170px"></div>
    </div>

    <el-drawer
        v-model="isOpenProcMemDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="memProcPerfEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div  style="width: 50%; float: left; overflow: hidden;height: 170px">
      <div :id="memProcPerfEChartID" style="width:100%;height: 170px"></div>
    </div>

    <el-drawer
        v-model="isOpenProcThreadDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="threadProcPerfEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div  style="width: 50%; float: left; overflow: hidden;height: 170px">
      <div :id="threadProcPerfEChartID" style="width:100%;height: 170px"></div>
    </div>
    <!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartMEM'" ></PerfEchart>-->
    <!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartFPS'" ></PerfEchart>-->
    <!--    <PerfEchart :isStart="props.isStartPerf" :nodeID="'echartJank'" ></PerfEchart>-->
  </div>
</template>

<script setup>
import {nextTick, ref, watch} from "vue";
import {baseWs} from "@/util/AndroidRequest";
import {getOptionTemplate, getThumbnailOptionTemplate} from "@/util/EchartUtil";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

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
  isStartPerf: Boolean,
  deviceSerial: String,
  isLandscapeScreen: Boolean
})

const direction = ref('ttb')

let isOpenProcCPUDrawer = ref(false)
let cpuProcPerfEChartID = "cpuProcPerfEChart"
let cpuProcPerfEChartDrawerID = "cpuProcPerfEChartDrawer"

let isOpenProcMemDrawer = ref(false)
let memProcPerfEChartID = "memProcPerfEChart"
let memProcPerfEChartDrawerID = "memProcPerfEChartDrawer"

let isOpenProcThreadDrawer = ref(false)
let threadProcPerfEChartID = "threadProcPerfEChart"
let threadProcPerfEChartDrawerID = "threadProcPerfEChartDrawer"

let procCpuFn = function () {

  let cpuPerfEChartDOM = document.getElementById(cpuProcPerfEChartID);

  let cpuPerfEChart = echarts.init(cpuPerfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let cpuPerfDrawerEChart = undefined;

  let ProcCPUThumbnailOptionTemplate = getThumbnailOptionTemplate("proc-cpu", function () {
    isOpenProcCPUDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let cpuPerfEChartDrawerDOM = document.getElementById(cpuProcPerfEChartDrawerID);

      cpuPerfDrawerEChart = echarts.init(cpuPerfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let ProcCPUOptionTemplate = getOptionTemplate("proc-cpu")

  let conn_proc_cpu = new WebSocket(baseWs + "/android/perf/proc/cpu");
  conn_proc_cpu.onopen = function (event) {
    // 发送数据到服务器
    const data = {
      serial: '',
      pid: '32715',
      intervalTime: 1
    };
    conn_proc_cpu.send(JSON.stringify(data));
  };
  conn_proc_cpu.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };

  let series = [
    {
      name: 'app-cpu',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: []
    },
  ]
  let xAxis = [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ]
  let yAxis = [
    {
      type: 'value'
    }
  ]

  conn_proc_cpu.onmessage = function (evt) {
    let data = JSON.parse(evt.data);
    const date = new Date(data.timeStamp);

    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    xAxis[0].data.push(formattedTime)
    series[0].data.push(data.cpuUtilization)

    ProcCPUThumbnailOptionTemplate.xAxis = xAxis
    ProcCPUThumbnailOptionTemplate.series = series
    ProcCPUThumbnailOptionTemplate.yAxis = yAxis

    cpuPerfEChart.setOption(ProcCPUThumbnailOptionTemplate)


    ProcCPUOptionTemplate.xAxis = xAxis
    ProcCPUOptionTemplate.series = series
    ProcCPUOptionTemplate.yAxis = yAxis

    if (cpuPerfDrawerEChart !== undefined && isOpenProcCPUDrawer.value) {
      cpuPerfDrawerEChart.setOption(ProcCPUOptionTemplate)
    }

  }

}

let procMemFn = function () {

  let memPerfEChartDOM = document.getElementById(memProcPerfEChartID);

  let memPerfEChart = echarts.init(memPerfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let memPerfDrawerEChart = undefined;

  let ProcMemThumbnailOptionTemplate = getThumbnailOptionTemplate("proc-mem-pss(MB)", function () {
    isOpenProcMemDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let memPerfEChartDrawerDOM = document.getElementById(memProcPerfEChartDrawerID);

      memPerfDrawerEChart = echarts.init(memPerfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let ProcMemOptionTemplate = getOptionTemplate("proc-mem-pss(MB)")

  let connProcMem = new WebSocket(baseWs + "/android/perf/proc/mem");
  connProcMem.onopen = function (event) {
    // 发送数据到服务器
    const data = {
      serial: '',
      pid: '32715',
      intervalTime: 1
    };
    connProcMem.send(JSON.stringify(data));
  };
  connProcMem.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };

  let totalPSS = {
    name: 'totalPSS',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let javaHeap = {
    name: 'javaHeap',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let nativeHeap = {
    name: 'nativeHeap',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let code = {
    name: 'code',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let stack = {
    name: 'stack',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let graphics = {
    name: 'graphics',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let privateOther = {
    name: 'privateOther',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }
  let system = {
    name: 'system',
    type: 'line',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: []
  }

  let xAxis = [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ]
  let yAxis = [
    {
      type: 'value'
    }
  ]

  ProcMemOptionTemplate.legend = {
    top: '8%',
    data: ['totalPSS', 'javaHeap', 'nativeHeap', 'code', 'stack', 'graphics', 'privateOther', 'system'],
  }

  ProcMemThumbnailOptionTemplate.color = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666',
    '#5645c7', '#bf40ff', '#80e3cc', '#25316b']

  connProcMem.onmessage = function (evt) {
    let data = JSON.parse(evt.data);
    const date = new Date(data.timeStamp);

    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    xAxis[0].data.push(formattedTime)
    totalPSS.data.push(data.totalPSS)
    javaHeap.data.push(data.javaHeap)
    nativeHeap.data.push(data.nativeHeap)
    code.data.push(data.code)
    stack.data.push(data.stack)
    graphics.data.push(data.graphics)
    privateOther.data.push(data.privateOther)
    system.data.push(data.system)

    let series = [
      totalPSS, javaHeap, nativeHeap, code, stack, graphics, privateOther, system
    ]

    ProcMemThumbnailOptionTemplate.xAxis = xAxis
    ProcMemThumbnailOptionTemplate.series = series
    ProcMemThumbnailOptionTemplate.yAxis = yAxis
    memPerfEChart.setOption(ProcMemThumbnailOptionTemplate)


    ProcMemOptionTemplate.xAxis = xAxis
    ProcMemOptionTemplate.series = series
    ProcMemOptionTemplate.yAxis = yAxis

    if (memPerfDrawerEChart !== undefined && isOpenProcMemDrawer.value) {
      memPerfDrawerEChart.setOption(ProcMemOptionTemplate)
    }
  }
}

let procThreadFn = function () {

  let perfEChartDOM = document.getElementById(threadProcPerfEChartID);

  let perfEChart = echarts.init(perfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let perfDrawerEChart = undefined;

  let thumbnailOptionTemplate = getThumbnailOptionTemplate("proc-thread", function () {
    isOpenProcThreadDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let perfEChartDrawerDOM = document.getElementById(threadProcPerfEChartDrawerID);

      perfDrawerEChart = echarts.init(perfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let optionTemplate = getOptionTemplate("proc-thread")

  let connProcThread = new WebSocket(baseWs + "/android/perf/proc/thread");
  connProcThread.onopen = function (event) {
    // 发送数据到服务器
    const data = {
      serial: '',
      pid: '32715',
      intervalTime: 1
    };
    connProcThread.send(JSON.stringify(data));
  };
  connProcThread.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };

  let series = [
    {
      name: 'app-thread',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: []
    },
  ]
  let xAxis = [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ]
  let yAxis = [
    {
      type: 'value'
    }
  ]

  connProcThread.onmessage = function (evt) {
    let data = JSON.parse(evt.data);
    const date = new Date(data.timeStamp);

    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    xAxis[0].data.push(formattedTime)
    series[0].data.push(data.threadCount)

    thumbnailOptionTemplate.xAxis = xAxis
    thumbnailOptionTemplate.series = series
    thumbnailOptionTemplate.yAxis = yAxis

    perfEChart.setOption(thumbnailOptionTemplate)


    optionTemplate.xAxis = xAxis
    optionTemplate.series = series
    optionTemplate.yAxis = yAxis

    if (perfDrawerEChart !== undefined && isOpenProcThreadDrawer.value) {
      perfDrawerEChart.setOption(optionTemplate)
    }

  }

}

watch(() => props.isStartPerf, (isStart) => {
  if (isStart) {
    nextTick(() => {
      procCpuFn()
      procMemFn()
      procThreadFn()
    })
  }
})


</script>

<style scoped>

.portraitScreenRight {
  min-width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
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
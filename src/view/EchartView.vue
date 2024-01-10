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
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
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
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
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
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
      <div :id="threadProcPerfEChartID" style="width:100%;height: 170px"></div>
    </div>

    <el-drawer
        v-model="isOpenFrameDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="frameEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
      <div :id="frameEChartID" style="width:100%;height: 170px"></div>
    </div>

    <el-drawer
        v-model="isOpenSysCPUDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="sysCPUEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
      <div :id="sysCPUEChartID" style="width:100%;height: 170px"></div>
    </div>

    <el-drawer
        v-model="isOpenSysMemDrawer"
        title="I am the title"
        :with-header="false"
        :direction="direction"
        :size="400"
    >
      <div :id="sysMemEChartDrawerID" style="width: 100%;height: 100%"></div>
    </el-drawer>
    <div style="width: 300px; float: left; overflow: hidden;height: 170px">
      <div :id="sysMemEChartID" style="width:100%;height: 170px"></div>
    </div>

  </div>
</template>

<script setup>
import {nextTick, ref, watch} from "vue";
import {baseWs, startAndroidPerf} from "@/util/AndroidRequest";
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
  isLandscapeScreen: Boolean,
  perfConfig: Object,
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

let isOpenFrameDrawer = ref(false)
let frameEChartID = "framePerfEChart"
let frameEChartDrawerID = "framePerfEChartDrawer"

let isOpenSysCPUDrawer = ref(false)
let sysCPUEChartID = "sysCPUPerfEChart"
let sysCPUEChartDrawerID = "sysCPUPerfEChartDrawer"

let isOpenSysMemDrawer = ref(false)
let sysMemEChartID = "sysMemPerfEChart"
let sysMemEChartDrawerID = "sysMemPerfEChartDrawer"

let connProcCpu;
let connProcMem;
let connProcThread;
let connSysCPU;
let connSysFrame;
let connSysMem;

let procCpuFn = function (uuid) {

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

  connProcCpu = new WebSocket(baseWs + "/android/perf/proc/cpu?uuid="+uuid);
  connProcCpu.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   packageName: props.perfConfig.packageName,
    //   intervalTime: 1
    // };
    // connProcCpu.send(JSON.stringify(data));
  };
  connProcCpu.onclose = function (e) {
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

  connProcCpu.onmessage = function (evt) {
    let data = JSON.parse(evt.data);

    // console.log(data)

    const date = new Date(data.data.timeStamp);

    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    xAxis[0].data.push(formattedTime)
    series[0].data.push(data.data.cpuUtilization)

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

let procMemFn = function (uuid) {

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

  connProcMem = new WebSocket(baseWs + "/android/perf/proc/mem?uuid="+uuid);
  connProcMem.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   packageName: props.perfConfig.packageName,
    //   intervalTime: 1
    // };
    // connProcMem.send(JSON.stringify(data));
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
    let data = JSON.parse(evt.data).data;
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

let procThreadFn = function (uuid) {

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

  connProcThread = new WebSocket(baseWs + "/android/perf/proc/thread?uuid="+uuid);
  connProcThread.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   packageName: props.perfConfig.packageName,
    //   intervalTime: 1
    // };
    // connProcThread.send(JSON.stringify(data));
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
    let data = JSON.parse(evt.data).data;
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

let sysCPUFn = function (uuid) {

  let perfEChartDOM = document.getElementById(sysCPUEChartID);

  let perfEChart = echarts.init(perfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let perfDrawerEChart = undefined;

  let thumbnailOptionTemplate = getThumbnailOptionTemplate("sys-cpu", function () {
    isOpenSysCPUDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let perfEChartDrawerDOM = document.getElementById(sysCPUEChartDrawerID);

      perfDrawerEChart = echarts.init(perfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let optionTemplate = getOptionTemplate("sys-cpu")

  connSysCPU = new WebSocket(baseWs + "/android/perf/sys/cpu?uuid="+uuid);
  connSysCPU.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   intervalTime: 1
    // };
    // connSysCPU.send(JSON.stringify(data));
  };
  connSysCPU.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };


  let xAxis =
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }

  let yAxis = [
    {
      type: 'value'
    }
  ]
  let result = {}
  let legend = {
    top: '8%',
    data: [],
  }

  connSysCPU.onmessage = function (evt) {
    let data = JSON.parse(evt.data).data;
    let isPushTimes = false
    for (const cpuName in data) {
      if (cpuName in result) {
        result[cpuName].data.push(data[cpuName].cpuUsage)
        if (!isPushTimes) {
          const date = new Date(data[cpuName].timeStamp);

          // 获取小时、分钟和秒
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();

          // 格式化输出
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          xAxis.data.push(formattedTime)
          isPushTimes = true
        }
      } else {
        result[cpuName] = {
          name: cpuName,
          type: 'line',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [data[cpuName].cpuUsage]
        }

        legend.data.push(cpuName)

        if (!isPushTimes) {
          const date = new Date(data[cpuName].timeStamp);

          // 获取小时、分钟和秒
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();

          // 格式化输出
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          xAxis.data.push(formattedTime)
          isPushTimes = true
        }
      }
    }

    let series = []

    for (const cpuName in result) {
      series.push(result[cpuName])
    }

    thumbnailOptionTemplate.xAxis = [xAxis]
    thumbnailOptionTemplate.series = series
    thumbnailOptionTemplate.yAxis = yAxis

    perfEChart.setOption(thumbnailOptionTemplate)

    optionTemplate.xAxis = [xAxis]
    optionTemplate.series = series
    optionTemplate.yAxis = yAxis
    optionTemplate.legend = legend

    if (perfDrawerEChart !== undefined && isOpenSysCPUDrawer.value) {
      perfDrawerEChart.setOption(optionTemplate)
    }

  }

}

let frameFn = function (uuid) {

  let perfEChartDOM = document.getElementById(frameEChartID);

  let perfEChart = echarts.init(perfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let perfDrawerEChart = undefined;

  let thumbnailOptionTemplate = getThumbnailOptionTemplate("FPS", function () {
    isOpenFrameDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let perfEChartDrawerDOM = document.getElementById(frameEChartDrawerID);

      perfDrawerEChart = echarts.init(perfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let optionTemplate = getOptionTemplate("FPS")

  connSysFrame = new WebSocket(baseWs + "/android/perf/sys/frame?uuid="+uuid);
  connSysFrame.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   intervalTime: 1
    // };
    // connSysFrame.send(JSON.stringify(data));
  };
  connSysFrame.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };

  let series = [
    {
      name: 'FPS',
      type: 'line',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [],
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

  // let markPoint = {
  //   data: []
  // }

  connSysFrame.onmessage = function (evt) {
    let data = JSON.parse(evt.data).data;

    const date = new Date(data.timeStamp);


    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // if (data.jankCount>0){
    //   markPoint.data.push({ name: 'jank', value: data.jankCount, xAxis: series[0].data.length , yAxis: data.FPS  })
    // }
    // if (data.bigJankCount>0){
    //   markPoint.data.push({ name: 'bigjank', value: data.bigJankCount, xAxis: series[0].data.length , yAxis: data.FPS  })
    // }

    xAxis[0].data.push(formattedTime)
    series[0].data.push(data.FPS)
    // series[0].markPoint = markPoint

    thumbnailOptionTemplate.xAxis = xAxis
    thumbnailOptionTemplate.series = series
    thumbnailOptionTemplate.yAxis = yAxis

    perfEChart.setOption(thumbnailOptionTemplate)


    optionTemplate.xAxis = xAxis
    optionTemplate.series = series
    optionTemplate.yAxis = yAxis
    // console.log(optionTemplate)

    if (perfDrawerEChart !== undefined && isOpenFrameDrawer.value) {
      perfDrawerEChart.setOption(optionTemplate)
    }

  }

}

let sysMemFn = function (uuid) {

  let perfEChartDOM = document.getElementById(sysMemEChartID);

  let perfEChart = echarts.init(perfEChartDOM, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  let perfDrawerEChart = undefined;

  let thumbnailOptionTemplate = getThumbnailOptionTemplate("sys-mem(MB)", function () {
    isOpenSysMemDrawer.value = true
    nextTick(() => {
      // 在这里编写放大图表的逻辑
      let perfEChartDrawerDOM = document.getElementById(sysMemEChartDrawerID);

      perfDrawerEChart = echarts.init(perfEChartDrawerDOM, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

    })
  })

  let optionTemplate = getOptionTemplate("sys-mem(MB)")

  connSysMem = new WebSocket(baseWs + "/android/perf/sys/mem?uuid="+uuid);
  connSysMem.onopen = function (event) {
    // 发送数据到服务器
    // const data = {
    //   serial: props.perfConfig.deviceSerial,
    //   intervalTime: 1
    // };
    // connSysMem.send(JSON.stringify(data));
  };
  connSysMem.onclose = function (e) {
    console.log(e);
    console.log("connection closed");
  };


  let xAxis =
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }

  let yAxis = [
    {
      type: 'value'
    }
  ]
  let result = {}
  let legend = {
    top: '8%',
    data: [],
  }

  connSysMem.onmessage = function (evt) {
    let data = JSON.parse(evt.data).data;

    const date = new Date(data.timeStamp);

    // 获取小时、分钟和秒
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化输出
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    xAxis.data.push(formattedTime)

    for (const memName in data) {
      if (memName === "timeStamp") {
        continue
      }
      if (memName in result) {
        result[memName].data.push(data[memName])
      } else {
        result[memName] = {
          name: memName,
          type: 'line',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [data[memName]]
        }

        legend.data.push(memName)
      }
    }

    let series = []

    for (const cpuName in result) {
      series.push(result[cpuName])
    }

    thumbnailOptionTemplate.xAxis = [xAxis]
    thumbnailOptionTemplate.series = series
    thumbnailOptionTemplate.yAxis = yAxis

    perfEChart.setOption(thumbnailOptionTemplate)

    optionTemplate.xAxis = [xAxis]
    optionTemplate.series = series
    optionTemplate.yAxis = yAxis
    optionTemplate.legend = legend

    if (perfDrawerEChart !== undefined && isOpenSysMemDrawer.value) {
      perfDrawerEChart.setOption(optionTemplate)
    }

  }

}

watch(() => props.isStartPerf, (isStart) => {
  if (isStart) {
    startAndroidPerf(props.perfConfig.deviceSerial,props.perfConfig.packageName).then(response=>{
      console.log(response)
      if (response.data.code===10000){
        let uuid = response.data.data
        let uuidParams = encodeURIComponent(uuid)
        nextTick(() => {
          if (props.perfConfig.procCPU) {
            procCpuFn(uuidParams)
          }
          if (props.perfConfig.procMem) {
            procMemFn(uuidParams)
          }
          if (props.perfConfig.procThread) {
            procThreadFn(uuidParams)
          }
          if (props.perfConfig.sysCpu) {
            sysCPUFn(uuidParams)
          }
          if (props.perfConfig.frame) {
            frameFn(uuidParams)
          }
          if (props.perfConfig.sysMem) {
            sysMemFn(uuidParams)
          }
        })
      }
    })


  }else {
    if(connProcCpu!==undefined){
      connProcCpu.close()
    }
    if(connProcMem!==undefined){
      connProcMem.close()
    }
    if(connProcThread!==undefined){
      connProcThread.close()
    }
    if(connSysCPU!==undefined){
      connSysCPU.close()
    }
    if(connSysFrame!==undefined){
      connSysFrame.close()
    }
    if(connSysMem!==undefined){
      connSysMem.close()
    }
  }
})


</script>

<style scoped>

.portraitScreenRight {
  min-width: 700px;
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
<script setup>
/*
 *   sonic-client-web  Front end of Sonic cloud real machine platform.
 *   Copyright (C) 2022 SonicCloudOrg
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import moment from 'moment/moment';
import {useI18n} from 'vue-i18n';
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
import {nextTick, watch} from 'vue';

echarts.use([
  DataZoomComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
]);

const {t: $t} = useI18n();
const props = defineProps({
  isStartPerf: Boolean,
  rid: String,
  cid: Number,
  did: Number,
  sysCpu: Object,
  sysMem: Object,
  sysNetwork: Object,
  procCpu: Object,
  procMem: Object,
  sysFps: Object,
  procThread: Object,
});

const getNetworkTimeStamp = () => {
  const result = [];
  if (props.sysNetwork.length > 0) {
    for (const i in props.sysNetwork[0]) {
      if (i) {
        props.sysNetwork.map((obj) => {
          result.push(moment(new Date(obj[i].timeStamp)).format('HH:mm:ss'));
        });
        break;
      }
    }
  }
  return result;
};

const getNetworkDataGroup = () => {
  const result = [];
  if (props.sysNetwork.length > 0) {
    for (const i in props.sysNetwork[0]) {
      const tx = [];
      const rx = [];
      props.sysNetwork.map((obj) => {
        tx.push(obj[i].tx);
        rx.push(obj[i].rx);
      });
      result.push({
        type: 'line',
        name: `${i}_tx`,
        data: tx,
        showSymbol: false,
        boundaryGap: false,
      });
      result.push({
        type: 'line',
        name: `${i}_rx`,
        data: rx,
        showSymbol: false,
        boundaryGap: false,
      });
    }
  }
  return result;
};


const seriesSysNetworkMap = {}
const seriesSysNetworkList = []
const categorySysNetworkList = []
const networkDataLegend = {
  isInit: true,
  legend: []
}

watch(() => props.sysNetwork, () => {
  let isAddTime = true;
  for (const i in props.sysNetwork) {
    if (isAddTime) {
      categorySysNetworkList.push(moment(new Date(props.sysNetwork[i].timeStamp)).format('HH:mm:ss'));
      isAddTime = false;
    }

    if (networkDataLegend.isInit) {
      networkDataLegend.legend.push(i+'_rx')
      networkDataLegend.legend.push(i+'_tx')
    }

    if (seriesSysNetworkMap[i+'_rx'] === undefined) {
      seriesSysNetworkMap[i+'_rx'] = {
        type: 'line',
        name: i+'_rx',
        data: [props.sysNetwork[i].rx],
        showSymbol: false,
        boundaryGap: false,
      }
      seriesSysNetworkMap[i+'_tx'] = {
        type: 'line',
        name: i+'_tx',
        data: [props.sysNetwork[i].tx],
        showSymbol: false,
        boundaryGap: false,
      }
      seriesSysNetworkList.push(seriesSysNetworkMap[i+'_rx']);
      seriesSysNetworkList.push(seriesSysNetworkMap[i+'_tx']);
    } else {
      seriesSysNetworkMap[i+'_rx'].data.push(props.sysNetwork[i].rx)
      seriesSysNetworkMap[i+'_tx'].data.push(props.sysNetwork[i].tx)
    }
  }
})


const seriesSysCpuMap = {}
const seriesSysCpuList = []
const categorySysCpuList = []
const cpuDataLegend = {
  isInit: true,
  legend: []
}

watch(() => props.sysCpu, () => {
  let isAddTime = true;
  for (const i in props.sysCpu) {
    if (isAddTime) {
      categorySysCpuList.push(moment(new Date(props.sysCpu[i].timeStamp)).format('HH:mm:ss'));
      isAddTime = false;
    }

    if (cpuDataLegend.isInit) {
      cpuDataLegend.legend.push(i)
    }

    if (seriesSysCpuMap[i] === undefined) {
      seriesSysCpuMap[i] = {
        type: 'line',
        name: i,
        data: [props.sysCpu[i].cpuUsage],
        showSymbol: false,
        areaStyle: {},
        boundaryGap: false,
      }
      seriesSysCpuList.push(seriesSysCpuMap[i]);
    } else {
      seriesSysCpuMap[i].data.push(props.sysCpu[i].cpuUsage)
    }
  }
})


let sysMemOption = {
  memBuffers: [],
  memCached: [],
  memFree: [],
  memTotal: [],
  swapFree: [],
  swapTotal: [],
  categorySysMemList: []
}

watch(() => props.sysMem, () => {
  sysMemOption.categorySysMemList.push(moment(new Date(props.sysMem.timeStamp)).format('HH:mm:ss'));
  for (const i in props.sysMem) {
    // console.log(props.sysMem[i])
    if (sysMemOption[i] !== undefined) {
      sysMemOption[i].push(props.sysMem[i])
    }
  }
})

let sysFrameOption = {
  FPS: [],
  jankCount: [],
  bigJankCount: [],
  categorySysFrameList: []
}

watch(() => props.sysFps, () => {
  sysFrameOption.categorySysFrameList.push(moment(new Date(props.sysFps.timeStamp)).format('HH:mm:ss'));
  for (const i in props.sysFps) {
    if (sysFrameOption[i] !== undefined) {
      sysFrameOption[i].push(props.sysFps[i])
    }
  }
})

let procCpuOption = {
  cpuUtilization: [],
  xTimeList: []
}

watch(() => props.procCpu, () => {
  procCpuOption.xTimeList.push(moment(new Date(props.procCpu.timeStamp)).format('HH:mm:ss'));
  for (const i in props.procCpu) {
    if (procCpuOption[i] !== undefined) {
      procCpuOption[i].push(props.procCpu[i])
    }
  }
})

let procMemOption = {
  legend: ['totalPSS', 'javaHeap', 'nativeHeap', 'code', 'stack', 'graphics', 'privateOther', 'system'],
  totalPSS: [],
  javaHeap: [],
  nativeHeap: [],
  code: [],
  stack: [],
  graphics: [],
  privateOther: [],
  system: [],
  xTimeList: []
}

watch(() => props.procMem, () => {
  procMemOption.xTimeList.push(moment(new Date(props.procMem.timeStamp)).format('HH:mm:ss'));
  for (const i in props.procMem) {
    if (procMemOption[i] !== undefined) {
      procMemOption[i].push(props.procMem[i])
    }
  }
})

let procThreadOption = {
  threadCount: [],
  xTimeList: []
}

watch(() => props.procThread, () => {
  procThreadOption.xTimeList.push(moment(new Date(props.procThread.timeStamp)).format('HH:mm:ss'));
  for (const i in props.procThread) {
    if (procThreadOption[i] !== undefined) {
      procThreadOption[i].push(props.procThread[i])
    }
  }
})


const printCpu = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysCpuChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `sysCpuChart`
        )
    );
  }
  chart.resize();
  const option = {
    title: {
      text: 'System Total CPU',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
      position(pos, params, dom, rect, size) {
        const obj = {top: 60};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      valueFormatter: (value) => `${value.toFixed(3)} %`,
    },
    legend: {
      top: '8%',
      data: cpuDataLegend.legend,
    },
    grid: {top: '28%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: categorySysCpuList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: `${$t('perf.totalCpu')}(%)`, min: 0}],
    series: seriesSysCpuList,
  };
  chart.setOption(option);
};
const printMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysMemChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `sysMemChart`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System Memory',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {top: '30%', left: '20%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    legend: {
      top: '8%',
      data: [
        'Mem Buffers',
        'Mem Cached',
        'Mem Free',
        'Mem Total',
        'Swap Free',
        'Swap Total',
      ],
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: sysMemOption.categorySysMemList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: `${$t('perf.memUsage')}(b)`, min: 0}],
    series: [
      {
        name: 'Mem Buffers',
        type: 'line',
        data: sysMemOption.memBuffers,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'Mem Cached',
        type: 'line',
        data: sysMemOption.memCached,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'Mem Free',
        type: 'line',
        data: sysMemOption.memFree,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'Mem Total',
        type: 'line',
        data: sysMemOption.memTotal,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'Swap Free',
        type: 'line',
        data: sysMemOption.swapFree,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'Swap Total',
        type: 'line',
        data: sysMemOption.swapTotal,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
};
const printFps = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysFpsChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `sysFpsChart`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#67C23A'],
    title: {
      text: 'System FPS',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {top: '15%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      data: sysFrameOption.categorySysFrameList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: 'FPS', min: 0}],
    series: [
      {
        type: 'line',
        data: sysFrameOption.FPS,
        showSymbol: false,
      },
    ],
  };
  chart.setOption(option);
};
const printProcThread = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `procThreadChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `procThreadChart`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#ee6666'],
    title: {
      text: 'Process Thread Count',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {top: '15%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      data: procThreadOption.xTimeList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: 'Count', min: 0}],
    series: [
      {
        type: 'line',
        data: procThreadOption.threadCount,
        showSymbol: false,
      },
    ],
  };
  chart.setOption(option);
};
const printNetwork = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysNetworkChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `sysNetworkChart`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System Network',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {top: '20%', left: '18%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    legend: {
      top: '8%',
      data: networkDataLegend.legend,
    },
    xAxis: {
      data: categorySysNetworkList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: `${$t('perf.network')}(b)`, min: 0}],
    series: seriesSysNetworkList,
  };
  chart.setOption(option);
};
const printPerfCpu = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `perfCpuChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `perfCpuChart`
        )
    );
  }
  chart.resize();
  const option = {
    title: {
      text: 'Process CPU',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${value.toFixed(3)} %`,
    },
    grid: {top: '15%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: procCpuOption.xTimeList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{name: `${$t('perf.procCpu')}(%)`, min: 0}],
    series: [
      {
        type: 'line',
        data: procCpuOption.cpuUtilization,
        showSymbol: false,
        areaStyle: {},
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
};
const printPerfMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `perfMemChart`
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `${props.rid}-${props.cid}-${props.did}-` + `perfMemChart`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'Process Memory',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {top: '20%', left: '20%'},
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: procMemOption.xTimeList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 100,
        xAxisIndex: [0, 1],
      },
    ],
    legend: {
      top: '8%',
      data: procMemOption.legend,
    },
    yAxis: [{name: `${$t('perf.memUsage')}(kb)`, min: 0}],
    series: [
      {
        name: 'totalPSS',
        type: 'line',
        data: procMemOption.totalPSS,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'javaHeap',
        type: 'line',
        data: procMemOption.javaHeap,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'graphics',
        type: 'line',
        data: procMemOption.graphics,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'nativeHeap',
        type: 'line',
        data: procMemOption.nativeHeap,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'code',
        type: 'line',
        data: procMemOption.code,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'privateOther',
        type: 'line',
        data: procMemOption.privateOther,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'stack',
        type: 'line',
        data: procMemOption.stack,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'system',
        type: 'line',
        data: procMemOption.system,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
};
defineExpose({
  printCpu,
  printMem,
  printNetwork,
  printPerfCpu,
  printPerfMem,
  printFps,
  printProcThread,
});
const switchTab = (e) => {
  if (e.index == 1) {
    nextTick(() => {

      const cpuChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `perfCpuChart`
          )
      );
      if (procCpuOption.xTimeList!==0){
        cpuChart.resize();
      }

      const sysCpuChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `sysCpuChart`
          )
      );
      if (seriesSysCpuList.length !== 0) {
        sysCpuChart.resize();
      }

    });
  } else if (e.index == 2) {
    nextTick(() => {
      const fpsChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `sysFpsChart`
          )
      );
      if (sysFrameOption.categorySysFrameList !== 0) {
        fpsChart.resize();
      }
    })
  } else if (e.index == 3) {
    nextTick(() => {
      const sysMemChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `sysMemChart`
          )
      );
      if (sysMemOption.categorySysMemList.length !== 0) {
        sysMemChart.resize();
      }

      const procMemChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `perfMemChart`
          )
      );
      procMemChart.resize();
    })
  } else {
    nextTick(() => {

      const networkChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `sysNetworkChart`
          )
      );
      networkChart.resize();

      const threadChart = echarts.getInstanceByDom(
          document.getElementById(
              `${props.rid}-${props.cid}-${props.did}-` + `procThreadChart`
          )
      );
      threadChart.resize();
    });
  }
};
</script>

<template>
  <el-tabs
      style="margin-top: 10px"
      stretch
      type="border-card"
      @tab-click="switchTab"
  >
    <el-tab-pane label="CPU">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-tooltip class="item" :disabled="procCpu!==null" content="proc cpu" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'perfCpuChart'"
                  v-loading="procCpu === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip class="item" :disabled="sysCpu!==null" content="sys cpu" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'sysCpuChart'"
                  v-loading="sysCpu === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

      </el-row>
    </el-tab-pane>
    <el-tab-pane label="Frame">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-tooltip class="item" :disabled="sysFps!==null" content="sys FPS" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'sysFpsChart'"
                  v-loading="sysFps === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip class="item" :disabled="sysCpu!==null" content="jank info" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'sysCpuChart'"
                  v-loading="sysCpu === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

      </el-row>
    </el-tab-pane>

    <el-tab-pane label="Memory">
      <el-row :gutter="10">
        <!--        :disabled="procMem.length !== 0"-->
        <el-col :span="12">
          <el-tooltip class="item" :disabled="procMem!==null" content="proc mem" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'perfMemChart'"
                  v-loading="procMem === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip class="item" :disabled="sysMem!==null" content="sys mem" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'sysMemChart'"
                  v-loading="sysMem === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

      </el-row>
    </el-tab-pane>
    <el-tab-pane label="Other">
      <el-row :gutter="10">


        <el-col :span="12">
          <el-tooltip class="item" :disabled="sysNetwork !== null" content="sys network" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'sysNetworkChart'"
                  v-loading="sysNetwork === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip class="item" :disabled="procThread !== null" content="proc thread" placement="top">
            <el-card style="margin-top: 10px">
              <div
                  :id="rid + '-' + cid + '-' + did + '-' + 'procThreadChart'"
                  v-loading="procThread === null"
                  :element-loading-text="$t('perf.emptyData')"
                  element-loading-spinner="el-icon-box"
                  style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

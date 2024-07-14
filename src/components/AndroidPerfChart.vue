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
import moment from "moment/moment";
import { useI18n } from "vue-i18n";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkPointComponent,
  MarkLineComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { nextTick, watch } from "vue";

echarts.use([
  MarkPointComponent,
  MarkLineComponent,
  DataZoomComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
]);

const { t: $t } = useI18n();
const props = defineProps({
  isStartPerf: Boolean,
  rid: String,
  cid: Number,
  did: Number,
  perfConfig:Object,
  sysCpu: Object,
  sysMem: Object,
  sysNetwork: Object,
  sysTemperature: Object,
  procCpu: Object,
  procMem: Object,
  sysFps: Object,
  sysJank: Object,
  procThread: Object,
});

const clearPerfData = () => {
  clearPerfSysNetworkData();
  clearPerfSysCpu();
  clearPerfSysMem();
  clearSysFrame();
  clearProcCpu();
  clearProcMem();
  clearProcThread();
  clearTemperature();
};

const clearPerfSysNetworkData = () => {
  seriesSysNetworkMap = {};
  seriesSysNetworkList = [];
  categorySysNetworkList = [];
  networkDataLegend = {
    isInit: true,
    legend: [],
  };
};

let seriesSysNetworkMap = {};
let seriesSysNetworkList = [];
let categorySysNetworkList = [];
let networkDataLegend = {
  isInit: true,
  legend: [],
};

watch(
  () => props.sysNetwork,
  () => {
    let isAddTime = true;
    for (const i in props.sysNetwork) {
      if (isAddTime) {
        categorySysNetworkList.push(
          moment(new Date(props.sysNetwork[i].timestamp)).format("HH:mm:ss")
        );
        isAddTime = false;
      }

      if (networkDataLegend.isInit) {
        networkDataLegend.legend.push(i + "_rx");
        networkDataLegend.legend.push(i + "_tx");
      }

      if (seriesSysNetworkMap[i + "_rx"] === undefined) {
        seriesSysNetworkMap[i + "_rx"] = {
          type: "line",
          name: i + "_rx",
          data: [props.sysNetwork[i].rx],
          showSymbol: false,
          boundaryGap: false,
        };
        seriesSysNetworkMap[i + "_tx"] = {
          type: "line",
          name: i + "_tx",
          data: [props.sysNetwork[i].tx],
          showSymbol: false,
          boundaryGap: false,
        };
        seriesSysNetworkList.push(seriesSysNetworkMap[i + "_rx"]);
        seriesSysNetworkList.push(seriesSysNetworkMap[i + "_tx"]);
      } else {
        seriesSysNetworkMap[i + "_rx"].data.push(props.sysNetwork[i].rx);
        seriesSysNetworkMap[i + "_tx"].data.push(props.sysNetwork[i].tx);
      }
    }
  }
);

const clearPerfSysCpu = () => {
  seriesSysCpuMap = {};
  seriesSysCpuList = [];
  categorySysCpuList = [];
  cpuDataLegend = {
    isInit: true,
    legend: [],
  };
};

let seriesSysCpuMap = {};
let seriesSysCpuList = [];
let categorySysCpuList = [];
let cpuDataLegend = {
  isInit: true,
  legend: [],
};

watch(
  () => props.sysCpu,
  () => {
    let isAddTime = true;
    for (const i in props.sysCpu) {
      if (isAddTime) {
        categorySysCpuList.push(
          moment(new Date(props.sysCpu[i].timestamp)).format("HH:mm:ss")
        );
        isAddTime = false;
      }

      if (cpuDataLegend.isInit) {
        cpuDataLegend.legend.push(i);
      }

      if (seriesSysCpuMap[i] === undefined) {
        seriesSysCpuMap[i] = {
          type: "line",
          name: i,
          data: [props.sysCpu[i].cpuUsage],
          showSymbol: false,
          areaStyle: {},
          boundaryGap: false,
        };
        seriesSysCpuList.push(seriesSysCpuMap[i]);
      } else {
        seriesSysCpuMap[i].data.push(props.sysCpu[i].cpuUsage);
      }
    }
  }
);

const clearPerfSysMem = () => {
  sysMemOption = {
    memBuffers: [],
    memCached: [],
    memFree: [],
    memTotal: [],
    swapFree: [],
    swapTotal: [],
    categorySysMemList: [],
  };
};

let sysMemOption = {
  memBuffers: [],
  memCached: [],
  memFree: [],
  memTotal: [],
  swapFree: [],
  swapTotal: [],
  categorySysMemList: [],
};

watch(
  () => props.sysMem,
  () => {
    if (props.sysMem.timestamp===undefined){
      return
    }
    sysMemOption.categorySysMemList.push(
      moment(new Date(props.sysMem.timestamp)).format("HH:mm:ss")
    );
    for (const i in props.sysMem) {
      // console.log(props.sysMem[i])
      if (sysMemOption[i] !== undefined) {
        sysMemOption[i].push(props.sysMem[i]);
      }
    }
  }
);

const clearSysFrame = () => {
  sysFrameOption = {
    FPS: [],
    jankCount: [],
    bigJankCount: [],
    categorySysFrameList: [],
  };
};

let sysFrameOption = {
  FPS: [],
  jankCount: [],
  bigJankCount: [],
  categorySysFrameList: [],
};

watch(
  () => props.sysFps,
  () => {
    if (props.sysFps.timestamp===undefined){
      return
    }
    sysFrameOption.categorySysFrameList.push(
      moment(new Date(props.sysFps.timestamp)).format("HH:mm:ss")
    );
    for (const i in props.sysFps) {
      if (sysFrameOption[i] !== undefined) {
        sysFrameOption[i].push(props.sysFps[i]);
      }
    }
  }
);

const clearProcCpu = () => {
  procCpuOption = {
    cpuUtilization: [],
    xTimeList: [],
  };
};

let procCpuOption = {
  cpuUtilization: [],
  xTimeList: [],
};

watch(
  () => props.procCpu,
  () => {
    if (props.procCpu.timestamp===undefined){
      return
    }
    procCpuOption.xTimeList.push(
      moment(new Date(props.procCpu.timestamp)).format("HH:mm:ss")
    );
    for (const i in props.procCpu) {
      if (procCpuOption[i] !== undefined) {
        procCpuOption[i].push(props.procCpu[i]);
      }
    }
  }
);

const clearProcMem = () => {
  procMemOption = {
    legend: [
      "totalPSS",
      "javaHeap",
      "nativeHeap",
      "code",
      "stack",
      "graphics",
      "privateOther",
      "system",
    ],
    totalPSS: [],
    javaHeap: [],
    nativeHeap: [],
    code: [],
    stack: [],
    graphics: [],
    privateOther: [],
    system: [],
    xTimeList: [],
  };
};

let procMemOption = {
  legend: [
    "totalPSS",
    "javaHeap",
    "nativeHeap",
    "code",
    "stack",
    "graphics",
    "privateOther",
    "system",
  ],
  totalPSS: [],
  javaHeap: [],
  nativeHeap: [],
  code: [],
  stack: [],
  graphics: [],
  privateOther: [],
  system: [],
  xTimeList: [],
};

watch(
  () => props.procMem,
  () => {
    if (props.procMem.timestamp===undefined){
      return
    }
    procMemOption.xTimeList.push(
      moment(new Date(props.procMem.timestamp)).format("HH:mm:ss")
    );
    for (const i in props.procMem) {
      if (procMemOption[i] !== undefined) {
        procMemOption[i].push(props.procMem[i]);
      }
    }
  }
);

const clearProcThread = () => {
  procThreadOption = {
    threadCount: [],
    xTimeList: [],
  };
};

let procThreadOption = {
  threadCount: [],
  xTimeList: [],
};

watch(
  () => props.procThread,
  () => {
    if (props.procThread.timestamp===undefined){
      return
    }
    procThreadOption.xTimeList.push(
      moment(new Date(props.procThread.timestamp)).format("HH:mm:ss")
    );
    for (const i in props.procThread) {
      if (procThreadOption[i] !== undefined) {
        procThreadOption[i].push(props.procThread[i]);
      }
    }
  }
);

const clearTemperature = () => {
  procTemperatureOption = {
    temperature: [],
    xTimeList: [],
  };
};

let procTemperatureOption = {
  temperature: [],
  xTimeList: [],
};

watch(
  () => props.sysTemperature,
  () => {
    if (props.sysTemperature.timestamp===undefined){
      return
    }
    procTemperatureOption.xTimeList.push(
      moment(new Date(props.sysTemperature.timestamp)).format("HH:mm:ss")
    );
    procTemperatureOption.temperature.push(props.sysTemperature.temperature);
  }
);

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
  if (chart !== null) {
    chart.resize();
    const option = {
      title: {
        text: "System Total CPU",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
        position(pos, params, dom, rect, size) {
          const obj = { top: 60 };
          obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        },
        valueFormatter: (value) => `${value.toFixed(3)} %`,
      },
      legend: {
        top: "8%",
        data: cpuDataLegend.legend,
      },
      grid: { top: "28%", left: "20%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: categorySysCpuList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: sysCPUZoomStart,
          end: sysCPUZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: `${$t("perf.totalCpu")}(%)`, min: 0 }],
      series: seriesSysCpuList,
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        sysCPUZoomStart = event.batch[0].start;
        sysCPUZoomEnd = event.batch[0].end;
      } else {
        sysCPUZoomStart = event.start;
        sysCPUZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let sysCPUZoomStart = 30;
let sysCPUZoomEnd = 100;

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
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#409EFF"],
      title: {
        text: "System Memory",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "30%", left: "20%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      legend: {
        top: "8%",
        data: [
          "Mem Buffers",
          "Mem Cached",
          "Mem Free",
          "Mem Total",
          "Swap Free",
          "Swap Total",
        ],
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: sysMemOption.categorySysMemList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: sysMemZoomStart,
          end: sysMemZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: `${$t("perf.memUsage")}(MB)`, min: 0 }],
      series: [
        {
          name: "Mem Buffers",
          type: "line",
          data: sysMemOption.memBuffers,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "Mem Cached",
          type: "line",
          data: sysMemOption.memCached,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "Mem Free",
          type: "line",
          data: sysMemOption.memFree,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "Mem Total",
          type: "line",
          data: sysMemOption.memTotal,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "Swap Free",
          type: "line",
          data: sysMemOption.swapFree,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "Swap Total",
          type: "line",
          data: sysMemOption.swapTotal,
          showSymbol: false,
          boundaryGap: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        sysMemZoomStart = event.batch[0].start;
        sysMemZoomEnd = event.batch[0].end;
      } else {
        sysMemZoomStart = event.start;
        sysMemZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};
let sysMemZoomStart = 30;
let sysMemZoomEnd = 100;
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
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#67C23A"],
      title: {
        text: "System FPS",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "15%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      xAxis: {
        data: sysFrameOption.categorySysFrameList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: sysFPSZoomStart,
          end: sysFPSZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: "FPS", min: 0 }],
      series: [
        {
          type: "line",
          data: sysFrameOption.FPS,
          showSymbol: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        sysFPSZoomStart = event.batch[0].start;
        sysFPSZoomEnd = event.batch[0].end;
      } else {
        sysFPSZoomStart = event.start;
        sysFPSZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let sysFPSZoomStart = 30;
let sysFPSZoomEnd = 100;

const printJank = () => {
  let chart = echarts.getInstanceByDom(
    document.getElementById(
      `${props.rid}-${props.cid}-${props.did}-` + `sysJankChart`
    )
  );
  if (chart == null) {
    chart = echarts.init(
      document.getElementById(
        `${props.rid}-${props.cid}-${props.did}-` + `sysJankChart`
      )
    );
  }
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#f1df80", "#e03b16"],
      title: {
        text: "Jank Info",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "15%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      xAxis: {
        data: sysFrameOption.categorySysFrameList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: sysJankZoomStart,
          end: sysJankZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: "Jank", min: 0 }],
      legend: {
        top: "8%",
        data: ["jank", "big jank"],
      },
      series: [
        {
          name: "jank",
          type: "line",
          data: sysFrameOption.jankCount,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "big jank",
          type: "line",
          data: sysFrameOption.bigJankCount,
          showSymbol: false,
          boundaryGap: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        sysJankZoomStart = event.batch[0].start;
        sysJankZoomEnd = event.batch[0].end;
      } else {
        sysJankZoomStart = event.start;
        sysJankZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let sysJankZoomStart = 30;
let sysJankZoomEnd = 100;

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
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#ee6666"],
      title: {
        text: "Process Thread Count",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "15%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      xAxis: {
        data: procThreadOption.xTimeList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: threadCountZoomStart,
          end: threadCountZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: "Count", min: 0 }],
      series: [
        {
          type: "line",
          data: procThreadOption.threadCount,
          showSymbol: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        threadCountZoomStart = event.batch[0].start;
        threadCountZoomEnd = event.batch[0].end;
      } else {
        threadCountZoomStart = event.start;
        threadCountZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let threadCountZoomStart = 30;
let threadCountZoomEnd = 100;
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
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#409EFF"],
      title: {
        text: "System Network",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "35%", left: "20%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      legend: {
        top: "8%",
        data: networkDataLegend.legend,
      },
      xAxis: {
        data: categorySysNetworkList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: netZoomStart,
          end: netZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: [{ name: `${$t("perf.network")}(MB)`, min: 0 }],
      series: seriesSysNetworkList,
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        netZoomStart = event.batch[0].start;
        netZoomEnd = event.batch[0].end;
      } else {
        netZoomStart = event.start;
        netZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let netZoomStart = 30;
let netZoomEnd = 100;

const printTemperature = () => {
  let chart = echarts.getInstanceByDom(
    document.getElementById(
      `${props.rid}-${props.cid}-${props.did}-` + `sysTemperatureChart`
    )
  );
  if (chart == null) {
    chart = echarts.init(
      document.getElementById(
        `${props.rid}-${props.cid}-${props.did}-` + `sysTemperatureChart`
      )
    );
  }
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#409EFF"],
      title: {
        text: "System Temperature",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "35%", left: "20%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      legend: {
        top: "8%",
      },
      xAxis: {
        data: procTemperatureOption.xTimeList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: temperatureZoomStart,
          end: temperatureZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} ℃",
        },
      },
      series: [
        {
          type: "line",
          data: procTemperatureOption.temperature,
          showSymbol: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        temperatureZoomStart = event.batch[0].start;
        temperatureZoomEnd = event.batch[0].end;
      } else {
        temperatureZoomStart = event.start;
        temperatureZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let temperatureZoomStart = 30;
let temperatureZoomEnd = 100;
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
      text: "Process CPU",
      textStyle: {
        color: "#606266",
      },
      x: "center",
      y: "top",
    },
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => `${value.toFixed(3)} %`,
    },
    grid: { top: "15%" },
    toolbox: {
      feature: {
        saveAsImage: { show: true, title: "Save" },
      },
    },
    xAxis: {
      boundaryGap: false,
      type: "category",
      data: procCpuOption.xTimeList,
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: procCPUZoomStart,
        end: procCPUZoomEnd,
        xAxisIndex: [0, 1],
      },
    ],
    yAxis: [{ name: `${$t("perf.procCpu")}(%)`, min: 0 }],
    series: [
      {
        type: "line",
        data: procCpuOption.cpuUtilization,
        showSymbol: false,
        areaStyle: {},
        boundaryGap: false,
      },
    ],
  };
  chart.on("dataZoom", function (event) {
    if (event.batch) {
      procCPUZoomStart = event.batch[0].start;
      procCPUZoomEnd = event.batch[0].end;
    } else {
      procCPUZoomStart = event.start;
      procCPUZoomEnd = event.end;
    }
  });
  chart.setOption(option);
};

let procCPUZoomStart = 30;
let procCPUZoomEnd = 100;

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
  if (chart !== null) {
    chart.resize();
    const option = {
      color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#409EFF"],
      title: {
        text: "Process Memory",
        textStyle: {
          color: "#606266",
        },
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: { top: "30%", left: "20%" },
      toolbox: {
        feature: {
          saveAsImage: { show: true, title: "Save" },
        },
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: procMemOption.xTimeList,
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: procMemZoomStart,
          end: procMemZoomEnd,
          xAxisIndex: [0, 1],
        },
      ],
      legend: {
        top: "8%",
        data: procMemOption.legend,
      },
      yAxis: [{ name: `${$t("perf.memUsage")}(MB)`, min: 0 }],
      series: [
        {
          name: "totalPSS",
          type: "line",
          data: procMemOption.totalPSS,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "javaHeap",
          type: "line",
          data: procMemOption.javaHeap,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "graphics",
          type: "line",
          data: procMemOption.graphics,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "nativeHeap",
          type: "line",
          data: procMemOption.nativeHeap,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "code",
          type: "line",
          data: procMemOption.code,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "privateOther",
          type: "line",
          data: procMemOption.privateOther,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "stack",
          type: "line",
          data: procMemOption.stack,
          showSymbol: false,
          boundaryGap: false,
        },
        {
          name: "system",
          type: "line",
          data: procMemOption.system,
          showSymbol: false,
          boundaryGap: false,
        },
      ],
    };
    chart.on("dataZoom", function (event) {
      if (event.batch) {
        procMemZoomStart = event.batch[0].start;
        procMemZoomEnd = event.batch[0].end;
      } else {
        procMemZoomStart = event.start;
        procMemZoomEnd = event.end;
      }
    });
    chart.setOption(option);
  }
};

let procMemZoomStart = 30;
let procMemZoomEnd = 100;

defineExpose({
  printCpu,
  printMem,
  printNetwork,
  printTemperature,
  printPerfCpu,
  printPerfMem,
  printFps,
  printJank,
  printProcThread,
  clearPerfData,
});
const switchTab = (e) => {
  if (e.index == 1) {
    nextTick(() => {
      const cpuChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `perfCpuChart`
        )
      );
      if (cpuChart !== undefined) {
        cpuChart.resize();
      }

      const sysCpuChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysCpuChart`
        )
      );
      if (sysCpuChart !== undefined) {
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
      if (fpsChart !== undefined) {
        fpsChart.resize();
      }

      const jankChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysJankChart`
        )
      );
      if (jankChart !== undefined) {
        jankChart.resize();
      }
    });
  } else if (e.index == 3) {
    nextTick(() => {
      const sysMemChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysMemChart`
        )
      );
      if (sysMemChart !== undefined) {
        sysMemChart.resize();
      }

      const procMemChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `perfMemChart`
        )
      );
      if (procMemChart !== undefined) {
        procMemChart.resize();
      }
    });
  } else {
    nextTick(() => {
      const networkChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysNetworkChart`
        )
      );
      if (networkChart !== undefined) {
        networkChart.resize();
      }

      const threadChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `procThreadChart`
        )
      );
      if (threadChart !== undefined) {
        threadChart.resize();
      }

      const temperatureChart = echarts.getInstanceByDom(
        document.getElementById(
          `${props.rid}-${props.cid}-${props.did}-` + `sysTemperatureChart`
        )
      );
      if (temperatureChart !== undefined) {
        temperatureChart.resize();
      }
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
          <el-tooltip
            class="item"
            :disabled="perfConfig.procCpu"
            content="proc cpu"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'perfCpuChart'"
                v-loading="!perfConfig.procCpu"
                :element-loading-text="$t('perf.emptyData')"
                element-loading-spinner="el-icon-box"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip
            class="item"
            :disabled="perfConfig.sysCpu"
            content="sys cpu"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysCpuChart'"
                v-loading="!perfConfig.sysCpu"
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
          <el-tooltip
            class="item"
            :disabled="perfConfig.FPS"
            content="sys FPS"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysFpsChart'"
                v-loading="!perfConfig.FPS"
                :element-loading-text="$t('perf.emptyData')"
                element-loading-spinner="el-icon-box"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip
            class="item"
            :disabled="perfConfig.jank"
            content="jank info"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysJankChart'"
                v-loading="!perfConfig.jank"
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
          <el-tooltip
            class="item"
            :disabled="perfConfig.procMem"
            content="proc mem"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'perfMemChart'"
                v-loading="!perfConfig.procMem"
                :element-loading-text="$t('perf.emptyData')"
                element-loading-spinner="el-icon-box"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip
            class="item"
            :disabled="perfConfig.sysMem"
            content="sys mem"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysMemChart'"
                v-loading="!perfConfig.sysMem"
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
          <el-tooltip
            class="item"
            :disabled="perfConfig.sysNetwork"
            content="sys network"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysNetworkChart'"
                v-loading="!perfConfig.sysNetwork"
                :element-loading-text="$t('perf.emptyData')"
                element-loading-spinner="el-icon-box"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip
            class="item"
            :disabled="perfConfig.sysTemperature"
            content="sys temperature"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'sysTemperatureChart'"
                v-loading="!perfConfig.sysTemperature"
                :element-loading-text="$t('perf.emptyData')"
                element-loading-spinner="el-icon-box"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-tooltip>
        </el-col>

        <el-col :span="12">
          <el-tooltip
            class="item"
            :disabled="perfConfig.procThread"
            content="proc thread"
            placement="top"
          >
            <el-card style="margin-top: 10px">
              <div
                :id="rid + '-' + cid + '-' + did + '-' + 'procThreadChart'"
                v-loading="!perfConfig.procThread"
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

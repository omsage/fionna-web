<template>
  <div style="padding: 20px">
    <el-backtop :right="100" :bottom="100" />
    <el-card class="box-card">
      <template #header>
        <div style="position: relative; display: flex; align-items: center">
          <el-button
            size="small"
            @click="exitDetailCallback"
            circle
            icon="el-icon-arrow-left"
          ></el-button>
          <span style="font-size: 16px; margin-left: 20px">
            {{ testReportName }}
          </span>
        </div>
      </template>
      <el-row v-loading="summaryLoading" :gutter="24">
        <el-col :span="4" v-if="perfConfig.procCpu">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            {{
              $t("report.summary.procAvgCPUUsage") +
              ":" +
              summaryInfo.procCpuSummary.avgProcCPU.toFixed(2)
            }}%
          </el-card>
        </el-col>
        <el-col :span="4" v-if="perfConfig.procMem">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            {{
              $t("report.summary.procMaxPss") +
              ":" +
              summaryInfo.procMemSummary.maxTotalPSS.toFixed(2)
            }}MB
          </el-card>
        </el-col>
        <el-col :span="4" v-if="perfConfig.FPS">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            {{
              $t("report.summary.AvgFPS") +
              ":" +
              summaryInfo.sysFrameSummary.avgFPS.toFixed(2)
            }}
          </el-card>
        </el-col>
        <el-col :span="4" v-if="perfConfig.jank">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            <div>Jank count:{{ summaryInfo.sysFrameSummary.allJankCount }}</div>
            <div>
              BigJank count:{{ summaryInfo.sysFrameSummary.allBigJankCount }}
            </div>
          </el-card>
        </el-col>

        <el-col :span="4" v-if="perfConfig.sysCpu">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            <div v-if="summaryInfo.sysCpuSummary">
              <div v-for="item in summaryInfo.sysCpuSummary">
                <div v-if="item.cpuName !== undefined">
                  <div v-if="item.cpuName === 'cpu'">
                    {{
                      $t("report.summary.sysCpuAvg") +
                      ":" +
                      item.avgSysCPU.toFixed(2)
                    }}%
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="4" v-if="perfConfig.sysMem">
          <el-card
            :style="{
              height: '75px',
            }"
          >
            {{
              $t("report.summary.sysMaxAvg") +
              ":" +
              summaryInfo.sysMemSummary.maxMemTotal
            }}MB
          </el-card>
        </el-col>
      </el-row>
      <el-divider />
      <el-tabs v-model="tabActiveName" :tab-position="'left'">
        <el-tab-pane
          v-loading="sysFrameOption.loading"
          label="Frame"
          name="Frame"
        >
          <el-collapse
            v-show="perfConfig.jank || perfConfig.FPS"
            v-model="FPSActiveName"
            @change="handleChange"
          >
            <el-collapse-item v-if="perfConfig.FPS" title="FPS" name="sys-FPS">
              <div>
                {{
                  $t("report.summary.fpsMess") +
                  summaryInfo.sysFrameSummary.avgFPS.toFixed(2)
                }}
              </div>
            </el-collapse-item>
            <el-collapse-item
              v-if="
                perfConfig.jank &&
                summaryInfo.sysFrameSummary.allJankCount !== null
              "
              title="Jank info"
              name="sys-jank"
            >
              <div>
                {{
                  $t("report.summary.jankMessPre") +
                  summaryInfo.sysFrameSummary.allJankCount +
                  $t("report.summary.jankMessMid") +
                  summaryInfo.sysFrameSummary.maxJankCount +
                  $t("report.summary.jankMessEnd") +
                  summaryInfo.sysFrameSummary.jankCountRate.toFixed(3)
                }}%
              </div>
              <div>
                {{
                  $t("report.summary.bigJankMessPre") +
                  summaryInfo.sysFrameSummary.allBigJankCount +
                  $t("report.summary.bigJankMessMid") +
                  summaryInfo.sysFrameSummary.maxBigJankCount +
                  $t("report.summary.bigJankMessEnd") +
                  summaryInfo.sysFrameSummary.bigJankCountRate.toFixed(3)
                }}%
              </div>
            </el-collapse-item>
          </el-collapse>

          <div
            class="card-echart-parent"
            v-if="perfConfig.jank && perfConfig.FPS"
          >
            <el-row :gutter="20">
              <el-col :span="24" style="margin-bottom: 10px">
                <el-card>
                  <template #header>
                    <div
                      style="
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 30px;
                      "
                    >
                      <el-button
                        size="medium"
                        @click="showJankMarkCallback"
                        round
                        >jank</el-button
                      >
                      <el-button
                        size="medium"
                        @click="showBigJankMarkCallback"
                        round
                        >big jank</el-button
                      >
                    </div>
                  </template>
                  <div
                    style="width: auto; height: 350px"
                    id="frame-mark-echart"
                  ></div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div class="card-echart-parent" v-else>
            <el-row :gutter="20">
              <el-col
                v-show="perfConfig.FPS"
                :span="24"
                style="margin-bottom: 10px"
              >
                <el-card>
                  <div style="width: auto; height: 350px" id="FPS-echart"></div>
                </el-card>
              </el-col>
              <el-col
                v-show="perfConfig.jank"
                :span="24"
                style="margin-bottom: 10px"
              >
                <el-card>
                  <div
                    style="width: auto; height: 350px"
                    id="jank-echart"
                  ></div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <div
            class="card-echart-parent"
            v-if="!perfConfig.FPS && !perfConfig.jank"
          >
            <el-empty description="frame perf data is empty!" />
          </div>
        </el-tab-pane>

        <el-tab-pane label="CPU" name="CPU">
          <el-collapse
            v-loading="summaryLoading"
            v-if="perfConfig.sysCpu || perfConfig.procCpu"
            v-model="CPUActAiveName"
            @change="handleChange"
          >
            <el-collapse-item
              v-if="perfConfig.procCpu"
              title="Process CPU"
              name="proc-cpu"
            >
              <div>
                {{
                  $t("report.summary.procCPUMessPre") +
                  summaryInfo.procCpuSummary.avgProcCPU.toFixed(2) +
                  $t("report.summary.procCPUMessEnd") +
                  summaryInfo.procCpuSummary.maxProcCPU.toFixed(2)
                }}%
              </div>
            </el-collapse-item>
            <el-collapse-item
              v-if="perfConfig.sysCpu"
              title="System CPU"
              name="sys-cpu"
            >
              <div v-for="item in summaryInfo.sysCpuSummary">
                <div v-if="item.cpuName !== undefined">
                  <div v-if="item.cpuName === 'cpu'">
                    {{
                      $t("report.summary.collectivitySysCpuPre") +
                      item.avgSysCPU.toFixed(2) +
                      $t("report.summary.collectivitySysCpuEnd") +
                      item.maxSysCPU.toFixed(2)
                    }}%
                  </div>
                  <div v-else>
                    {{
                      item.cpuName +
                      $t("report.summary.sysCpuPre") +
                      item.avgSysCPU.toFixed(2) +
                      $t("report.summary.sysCpuEnd") +
                      item.maxSysCPU.toFixed(2)
                    }}%
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>

          <el-row
            v-if="perfConfig.procCpu || perfConfig.sysCpu"
            class="card-echart-parent"
            :gutter="20"
          >
            <el-col
              :span="24"
              style="margin-bottom: 10px"
              v-if="perfConfig.procCpu"
            >
              <el-card>
                <div
                  style="width: auto; height: 350px"
                  :id="'proc-cpu-echart'"
                ></div>
              </el-card>
            </el-col>
            <el-col :span="24" v-if="perfConfig.sysCpu">
              <el-card>
                <div
                  style="width: 100%; height: 350px"
                  :id="'sys-cpu-echart'"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <div
            class="card-echart-parent"
            v-if="!perfConfig.procCpu && !perfConfig.sysCpu"
          >
            <el-empty description="cpu perf data is empty!" />
          </div>
        </el-tab-pane>

        <el-tab-pane label="Memory" name="Memory">
          <el-collapse
            v-loading="summaryLoading"
            v-if="perfConfig.sysMem || perfConfig.procMem"
            v-model="MemActAiveName"
            @change="handleChange"
          >
            <el-collapse-item
              v-if="perfConfig.procMem"
              title="Process Memory"
              name="proc-mem"
            >
              <div>
                {{
                  $t("report.summary.procMemPre") +
                  summaryInfo.procMemSummary.avgTotalPSS.toFixed(2) +
                  $t("report.summary.procMemEnd") +
                  summaryInfo.procMemSummary.maxTotalPSS.toFixed(2)
                }}MB
              </div>
              <div>
                JavaHeap PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgJavaHeap.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxJavaHeap.toFixed(2)
                }}MB
              </div>
              <div>
                NativeHeap PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgNativeHeap.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxNativeHeap.toFixed(2)
                }}MB
              </div>
              <div>
                Graphics PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgGraphics.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxGraphics.toFixed(2)
                }}MB
              </div>
              <div>
                Stack PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgStack.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxStack.toFixed(2)
                }}MB
              </div>
              <div>
                System PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgSystem.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxSystem.toFixed(2)
                }}MB
              </div>
              <div>
                Code PSS{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgCode.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxCode.toFixed(2)
                }}MB
              </div>
              <div>
                PrivateOther{{
                  $t("report.summary.avgMemMess") +
                  summaryInfo.procMemSummary.avgPrivateOther.toFixed(2)
                }}MB,{{
                  $t("report.summary.maxMemMess") +
                  summaryInfo.procMemSummary.maxPrivateOther.toFixed(2)
                }}MB
              </div>

              <!--              <div>-->
              <!--                当前所测试程序的CPU均值是:{{-->
              <!--                  summaryInfo.procCpuSummary.avgProcCPU.toFixed(2)-->
              <!--                }}%,最大峰值是:{{ summaryInfo.procCpuSummary.maxProcCPU.toFixed(2) }}%-->
              <!--              </div>-->
            </el-collapse-item>
            <el-collapse-item
              v-if="perfConfig.sysMem"
              title="System memory"
              name="sys-mem"
            >
              <div>
                {{
                  $t("report.summary.sysMemPre") +
                  summaryInfo.sysMemSummary.avgMemTotal.toFixed(2) +
                  $t("report.summary.sysMemEnd") +
                  summaryInfo.sysMemSummary.maxMemTotal.toFixed(2)
                }}MB
              </div>
            </el-collapse-item>
          </el-collapse>

          <el-row class="card-echart-parent" :gutter="20">
            <el-col
              :span="24"
              style="margin-bottom: 10px"
              v-show="perfConfig.procMem"
            >
              <el-card>
                <div
                  style="width: auto; height: 350px"
                  :id="'proc-mem-echart'"
                ></div>
              </el-card>
            </el-col>
            <el-col :span="24" v-show="perfConfig.sysMem">
              <el-card>
                <div
                  style="width: 100%; height: 350px"
                  :id="'sys-mem-echart'"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <div
            class="card-echart-parent"
            v-if="!perfConfig.sysMem && !perfConfig.procMem"
          >
            <el-empty description="mem perf data is empty!" />
          </div>
        </el-tab-pane>

        <el-tab-pane label="Other" name="Other">
          <el-collapse
            v-loading="summaryLoading"
            v-if="
              perfConfig.sysNetwork ||
              perfConfig.procThread ||
              perfConfig.sysTemperature
            "
            v-model="MemActAiveName"
            @change="handleChange"
          >
            <el-collapse-item
              v-if="perfConfig.sysNetwork"
              title="System network"
              name="system-network"
            >
              <div v-for="item in summaryInfo.networkSummary">
                <div v-if="item.name !== undefined">
                  {{
                    item.name +
                    $t("report.summary.sysNetworkPre") +
                    item.allSysTxData.toFixed(2) +
                    $t("report.summary.sysNetworkEnd") +
                    item.allSysRxData.toFixed(2)
                  }}MB
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item
              v-loading="summaryLoading"
              v-if="perfConfig.sysTemperature"
              title="System temperature"
              name="system-temperature"
            >
              <div>
                {{
                  $t("report.summary.sysTemperaturePre") +
                  summaryInfo.sysTemperatureSummary.mxTemperature.toFixed(2) +
                  $t("report.summary.sysTemperatureEnd") +
                  summaryInfo.sysTemperatureSummary.diffTemperature.toFixed(2)
                }}
                ℃
              </div>
            </el-collapse-item>
          </el-collapse>

          <el-row class="card-echart-parent" :gutter="20">
            <el-col
              :span="24"
              style="margin-bottom: 10px"
              v-if="perfConfig.sysNetwork"
            >
              <el-card>
                <div
                  style="width: auto; height: 350px"
                  :id="'sys-network-echart'"
                ></div>
              </el-card>
            </el-col>
            <el-col :span="24" v-if="perfConfig.sysTemperature">
              <el-card>
                <div
                  style="width: 100%; height: 350px"
                  :id="'sys-temperature-echart'"
                ></div>
              </el-card>
            </el-col>
            <el-col
              style="margin-top: 10px"
              :span="24"
              v-show="perfConfig.procThread"
            >
              <el-card>
                <div
                  style="width: 100%; height: 350px"
                  :id="'proc-thread-echart'"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <div
            class="card-echart-parent"
            v-if="
              !perfConfig.sysNetwork &&
              !perfConfig.sysTemperature &&
              !perfConfig.procThread
            "
          >
            <el-empty description="perf data is empty!" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import axios from "@/http/axios";
import moment from "moment";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();

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

const tabActiveName = ref("Frame");

const emit = defineEmits(["getDetail", "exitDetail"]);

const exitDetailCallback = () => {
  emit("exitDetail");
};

const CPUActAiveName = ref(["proc-cpu"]);
const MemActAiveName = ref(["proc-mem"]);
const FPSActiveName = ref(["sys-FPS"]);

const props = defineProps({
  uuid: String,
  testReportName: String,
});

onMounted(() => {
  getPerfConfig();
  getSummary();
});
// const uuid = ref("5c3747cf-b234-4def-a025-c77ce6554255")

const handleChange = (val) => {
  console.log(val);
};

watch(tabActiveName, (activeName) => {
  if (activeName === "Frame") {
    nextTick(() => {
      if (perfConfig.value.FPS && perfConfig.value.jank) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`frame-mark-echart`)
        );
        chart.resize();
      } else if (perfConfig.value.FPS) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`FPS-echart`)
        );
        chart.resize();
      } else if (perfConfig.value.jank) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`jank-echart`)
        );
        chart.resize();
      }
    });
  }
  if (activeName === "CPU") {
    nextTick(() => {
      if (perfConfig.value.sysCpu) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`sys-cpu-echart`)
        );
        if (chart !== null && chart !== undefined) {
          chart.resize();
        }
      }
      if (perfConfig.value.procCpu) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`proc-cpu-echart`)
        );
        chart.resize();
      }
    });
  }
  if (activeName === "Memory") {
    nextTick(() => {
      if (perfConfig.value.sysMem) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`sys-mem-echart`)
        );
        if (chart !== null && chart !== undefined) {
          chart.resize();
        }
      }
      if (perfConfig.value.procMem) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`proc-mem-echart`)
        );
        chart.resize();
      }
    });
  }
  if (activeName === "Other") {
    nextTick(() => {
      if (perfConfig.value.sysNetwork) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`sys-network-echart`)
        );
        if (chart !== null && chart !== undefined) {
          chart.resize();
        }
      }
      if (perfConfig.value.sysTemperature) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`sys-temperature-echart`)
        );
        chart.resize();
      }
      if (perfConfig.value.procThread) {
        let chart = echarts.getInstanceByDom(
          document.getElementById(`proc-thread-echart`)
        );
        chart.resize();
      }
    });
  }
});

const perfConfig = ref({
  sysCpu: false,
  sysMem: false,
  sysNetwork: false,
  FPS: false,
  jank: false,
  procCpu: false,
  procMem: false,
  procThread: false,
  sysTemperature: false,
});

const getPerfConfig = () => {
  axios.get("/report/config", { params: { uuid: props.uuid } }).then((resp) => {
    perfConfig.value = resp.data;
    if (perfConfig.value.jank || perfConfig.value.FPS) {
      getFrameData();
    }
    if (perfConfig.value.procCpu) {
      getProcCpuData();
    }
    if (perfConfig.value.sysCpu) {
      getSysCpuData();
    }
    if (perfConfig.value.procMem) {
      getProcMemData();
    }
    if (perfConfig.value.sysMem) {
      getSysMemData();
    }
    if (perfConfig.value.sysNetwork) {
      getSysNetworkData();
    }
    if (perfConfig.value.sysTemperature) {
      getSysTemperatureData();
    }
    if (perfConfig.value.procThread) {
      getProcThreadData();
    }
  });
};

const summaryInfo = ref({
  networkSummary: null,
  sysCpuSummary: null,
  sysMemSummary: {
    maxMemTotal: 0,
    avgMemTotal: 0,
  },
  sysTemperatureSummary: {
    diffTemperature: 0,
    mxTemperature: 0,
  },
  sysFrameSummary: {
    avgFPS: 0,
    allJankCount: 0,
    allBigJankCount: 0,
    maxJankCount: 0,
    maxBigJankCount: 0,
    jankCountRate: 0,
    bigJankCountRate: 0,
  },
  procCpuSummary: {
    avgProcCPU: 0,
    maxProcCPU: 0,
  },
  procMemSummary: {
    avgTotalPSS: 0,
    avgJavaHeap: 0,
    avgNativeHeap: 0,
    avgCode: 0,
    avgStack: 0,
    avgGraphics: 0,
    avgPrivateOther: 0,
    avgSystem: 0,
    maxTotalPSS: 0,
    maxJavaHeap: 0,
    maxNativeHeap: 0,
    maxCode: 0,
    maxStack: 0,
    maxGraphics: 0,
    maxPrivateOther: 0,
    maxSystem: 0,
  },
});

const summaryLoading = ref(false);

const getSummary = () => {
  summaryLoading.value = true;
  axios
    .get("/report/summary", { params: { uuid: props.uuid } })
    .then((resp) => {
      console.log(resp);
      summaryInfo.value = resp.data;
      summaryLoading.value = false;
    });
};

let procThreadOption = {
  loading: false,
  threadCount: [],
  xTimeList: [],
};

const getProcThreadData = () => {
  axios
    .get("/report/proc/thread", { params: { uuid: props.uuid } })
    .then((resp) => {
      let procThreadDataList = resp.data;
      procThreadOption.loading = true;

      for (let index in procThreadDataList) {
        let threadData = procThreadDataList[index];

        let xTimestr = moment(new Date(threadData.timestamp)).format(
          "HH:mm:ss"
        );

        procThreadOption.xTimeList.push(xTimestr);
        procThreadOption.threadCount.push(threadData.threadCount);
      }

      procThreadOption.loading = false;
      printProcThread();
    });
};

const printProcThread = () => {
  let chart = echarts.init(document.getElementById(`proc-thread-echart`));
  let option = {
    title: {
      text: "proc thread count",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: procThreadOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} ",
      },
    },
    series: [
      {
        name: "thread count",
        type: "line",
        data: procThreadOption.threadCount,
      },
    ],
  };
  chart.setOption(option);
};

let sysTemperatureOption = {
  loading: false,
  temperature: [],
  xTimeList: [],
};

const getSysTemperatureData = () => {
  axios
    .get("/report/sys/temperature", { params: { uuid: props.uuid } })
    .then((resp) => {
      let sysTemperatureDataList = resp.data;
      sysTemperatureOption.loading = true;

      for (let index in sysTemperatureDataList) {
        let temperatureData = sysTemperatureDataList[index];

        let xTimestr = moment(new Date(temperatureData.timestamp)).format(
          "HH:mm:ss"
        );

        sysTemperatureOption.xTimeList.push(xTimestr);
        sysTemperatureOption.temperature.push(temperatureData.temperature);
      }

      sysTemperatureOption.loading = false;
      printSysTemperature();
    });
};

const printSysTemperature = () => {
  let chart = echarts.init(document.getElementById(`sys-temperature-echart`));
  let option = {
    title: {
      text: "system temperature",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysTemperatureOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}  ℃",
      },
    },
    series: [
      {
        name: "temperature",
        type: "line",
        data: sysTemperatureOption.temperature,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
    ],
  };
  chart.setOption(option);
};

let sysFrameOption = {
  loading: false,
  FPS: [],
  jankCount: [],
  bigJankCount: [],
  jankCountMarking: [],
  bigJankCountMarking: [],
  categorySysFrameList: [],
};

const getFrameData = () => {
  axios
    .get("/report/sys/frame", { params: { uuid: props.uuid } })
    .then((resp) => {
      let frameDataList = resp.data;
      sysFrameOption.loading = true;

      for (let index in frameDataList) {
        let frameData = frameDataList[index];

        let xTimestr = moment(new Date(frameData.timestamp)).format("HH:mm:ss");

        sysFrameOption.categorySysFrameList.push(xTimestr);
        sysFrameOption.FPS.push(frameData.FPS);

        sysFrameOption.jankCount.push(frameData.jankCount);
        sysFrameOption.bigJankCount.push(frameData.bigJankCount);

        if (frameData.jankCount !== 0) {
          sysFrameOption.jankCountMarking.push({
            value: frameData.jankCount,
            yAxis: frameData.FPS,
            xAxis: xTimestr,
          });
        }
        if (frameData.bigJankCount !== 0) {
          sysFrameOption.bigJankCountMarking.push({
            value: frameData.bigJankCount,
            yAxis: frameData.FPS,
            xAxis: xTimestr,
          });
        }
      }

      sysFrameOption.loading = false;

      if (perfConfig.value.jank && perfConfig.value.FPS) {
        printFrameMark(true);
      } else if (perfConfig.value.FPS) {
        printFPS();
      } else if (perfConfig.value.jank) {
        printJank();
      }
    });
};

let FpsOptions = null;
let showJankMark = false;
let showBigJankMark = false;

const showJankMarkCallback = () => {
  showJankMark = !showJankMark;
  showBigJankMark = false;
  if (showJankMark) {
    FpsOptions.series.markPoint.data = sysFrameOption.jankCountMarking;
  } else {
    FpsOptions.series.markPoint.data = [];
  }
  const frameMarkChart = echarts.getInstanceByDom(
    document.getElementById(`frame-mark-echart`)
  );
  frameMarkChart.dispose();
  printFrameMark(false);
};

const showBigJankMarkCallback = () => {
  showBigJankMark = !showBigJankMark;
  showJankMark = false;
  if (showBigJankMark) {
    FpsOptions.series.markPoint.data = sysFrameOption.bigJankCountMarking;
  } else {
    FpsOptions.series.markPoint.data = [];
  }
  const frameMarkChart = echarts.getInstanceByDom(
    document.getElementById(`frame-mark-echart`)
  );
  frameMarkChart.dispose();
  printFrameMark(false);
};

const printFrameMark = (isInit) => {
  let chart = echarts.init(document.getElementById(`frame-mark-echart`));
  if (isInit) {
    FpsOptions = {
      title: {
        text: "frame mark",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: sysFrameOption.categorySysFrameList,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: {
        name: "FPS",
        type: "line",
        data: sysFrameOption.FPS,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        markPoint: {
          data: [],
        },
      },
    };
  }
  chart.setOption(FpsOptions);
};

const printFPS = () => {
  let chart = echarts.init(document.getElementById(`FPS-echart`));

  let FpsOpt = {
    title: {
      text: "FPS",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysFrameOption.categorySysFrameList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: {
      name: "FPS",
      type: "line",
      data: sysFrameOption.FPS,
      markLine: {
        data: [{ type: "average", name: "Avg" }],
      },
      markPoint: {
        data: [],
      },
    },
  };
  chart.setOption(FpsOpt);
};

const printJank = () => {
  let chart = echarts.init(document.getElementById(`jank-echart`));

  let jankOpt = {
    title: {
      text: "jank info",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysFrameOption.categorySysFrameList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "jank",
        type: "line",
        data: sysFrameOption.jankCount,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        markPoint: {
          data: [],
        },
      },
      {
        name: "big jank",
        type: "line",
        data: sysFrameOption.bigJankCount,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
        markPoint: {
          data: [],
        },
      },
    ],
  };
  chart.setOption(jankOpt);
};

let procCPUOption = {
  loading: false,
  cpuUtilization: [],
  xTimeList: [],
};

const getProcCpuData = () => {
  axios
    .get("/report/proc/cpu", { params: { uuid: props.uuid } })
    .then((resp) => {
      let procCPUDataList = resp.data;
      procCPUOption.loading = true;

      for (let index in procCPUDataList) {
        let procCpuData = procCPUDataList[index];

        let xTimestr = moment(new Date(procCpuData.timestamp)).format(
          "HH:mm:ss"
        );

        procCPUOption.xTimeList.push(xTimestr);
        procCPUOption.cpuUtilization.push(procCpuData.cpuUtilization);
      }

      procCPUOption.loading = false;
      printProcCPU();
    });
};

const printProcCPU = () => {
  let chart = echarts.init(document.getElementById(`proc-cpu-echart`));
  let option = {
    title: {
      text: "proc cpu usage",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: procCPUOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} %",
      },
    },
    series: [
      {
        name: "cpuUtilization",
        type: "line",
        data: procCPUOption.cpuUtilization,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
    ],
  };
  chart.setOption(option);
};

let procMemOption = {
  loading: false,
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

const getProcMemData = () => {
  axios
    .get("/report/proc/mem", { params: { uuid: props.uuid } })
    .then((resp) => {
      let procMemDataList = resp.data;
      procMemOption.loading = true;

      for (let index in procMemDataList) {
        let procMemData = procMemDataList[index];

        procMemOption.xTimeList.push(
          moment(new Date(procMemData.timestamp)).format("HH:mm:ss")
        );
        for (const i in procMemData) {
          if (procMemOption[i] !== undefined) {
            procMemOption[i].push(procMemData[i]);
          }
        }
      }

      procMemOption.loading = false;
      printProcMem();
    });
};

const printProcMem = () => {
  let chart = echarts.init(document.getElementById(`proc-mem-echart`));
  let option = {
    title: {
      text: "proc memory",
    },
    tooltip: {
      trigger: "axis",
      position: 'bottom',
      confine: true,
      axisPointer: {
        type: 'none',
      },
      textStyle: {
        color: 'fff',
      },
      enterable: true, //允许鼠标进入提示框浮层中，默认为false
      extraCssText: 'max-width:340px;max-height:83%;overflow:auto', //出现滚动条
    },
    legend: {
      top: "8%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: procMemOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} MB",
      },
    },
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
  chart.setOption(option);
};

let sysCPUOption = {
  loading: false,
  cpuUtilizationSeriesMap: {},
  cpuUtilizationSeriesList: [],
  cpuNameLegend: [],
  xTimeList: [],
  xTimeMap: {},
};
const getSysCpuData = () => {
  axios
    .get("/report/sys/cpu", { params: { uuid: props.uuid } })
    .then((resp) => {
      let sysCPUDataList = resp.data;
      sysCPUOption.loading = true;

      for (let index in sysCPUDataList) {
        let sysCpuData = sysCPUDataList[index];

        let xTimestr = moment(new Date(sysCpuData.timestamp)).format(
          "HH:mm:ss"
        );

        if (
          sysCPUOption.xTimeMap[xTimestr] === undefined ||
          sysCPUOption.xTimeMap[xTimestr] === null
        ) {
          sysCPUOption.xTimeList.push(xTimestr);
          sysCPUOption.xTimeMap[xTimestr] = 1;
        }
        if (
          sysCPUOption.cpuUtilizationSeriesMap[sysCpuData.cpuName] === undefined
        ) {
          sysCPUOption.cpuUtilizationSeriesMap[sysCpuData.cpuName] = {
            name: sysCpuData.cpuName,
            type: "line",
            data: [],
            showSymbol: false,
            areaStyle: {},
          };
          sysCPUOption.cpuNameLegend.push(sysCpuData.cpuName);
          sysCPUOption.cpuUtilizationSeriesList.push(
            sysCPUOption.cpuUtilizationSeriesMap[sysCpuData.cpuName]
          );
        }
        sysCPUOption.cpuUtilizationSeriesMap[sysCpuData.cpuName].data.push(
          sysCpuData.cpuUsage
        );
      }
      sysCPUOption.loading = false;
      printSysCPU();
    });
};

const printSysCPU = () => {
  let chart = echarts.init(document.getElementById(`sys-cpu-echart`));
  let option = {
    title: {
      text: "sys cpu info",
    },
    tooltip: {
      trigger: "axis",
      position: 'bottom',
      confine: true,
      axisPointer: {
        type: 'none',
      },
      textStyle: {
        color: 'fff',
      },
      enterable: true, //允许鼠标进入提示框浮层中，默认为false
      extraCssText: 'max-width:340px;max-height:83%;overflow:auto', //出现滚动条
    },
    legend: {
      top: "8%",
      data: sysCPUOption.cpuNameLegend,
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysCPUOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} %",
      },
    },
    series: sysCPUOption.cpuUtilizationSeriesList,
  };
  chart.setOption(option);
};

let sysNetworkOption = {
  loading: false,
  networkSeriesMap: {},
  networkSeriesList: [],
  xTimeList: [],
  xTimeMap: {},
};
const getSysNetworkData = () => {
  axios
    .get("/report/sys/network", { params: { uuid: props.uuid } })
    .then((resp) => {
      let sysNetworkDataList = resp.data;
      sysNetworkOption.loading = true;

      for (let index in sysNetworkDataList) {
        let sysNetData = sysNetworkDataList[index];

        let xTimestr = moment(new Date(sysNetData.timestamp)).format(
          "HH:mm:ss"
        );

        if (
          sysNetworkOption.xTimeMap[xTimestr] === undefined ||
          sysNetworkOption.xTimeMap[xTimestr] === null
        ) {
          sysNetworkOption.xTimeList.push(xTimestr);
          sysNetworkOption.xTimeMap[xTimestr] = 1;
        }
        let interfaceNameTx = sysNetData.interfaceName + "_tx"
        let interfaceNameRx = sysNetData.interfaceName + "_rx"
        if (
          sysNetworkOption.networkSeriesMap[interfaceNameTx] === undefined
        ) {
          sysNetworkOption.networkSeriesMap[interfaceNameTx] =
            {
              name: interfaceNameTx,
              type: "line",
              data: [],
              showSymbol: false,
              areaStyle: {},
            };
          sysNetworkOption.networkSeriesMap[interfaceNameRx] =
            {
              name: interfaceNameRx,
              type: "line",
              data: [],
              showSymbol: false,
              areaStyle: {},
            };
          sysNetworkOption.networkSeriesList.push(
            sysNetworkOption.networkSeriesMap[interfaceNameTx]
          );
          sysNetworkOption.networkSeriesList.push(
            sysNetworkOption.networkSeriesMap[interfaceNameRx]
          );
        }
        sysNetworkOption.networkSeriesMap[interfaceNameTx].data.push(sysNetData.tx);
        sysNetworkOption.networkSeriesMap[interfaceNameRx].data.push(sysNetData.rx);
      }
      sysNetworkOption.loading = false;
      printSysNetwork();
    });
};

const printSysNetwork = () => {
  let chart = echarts.init(document.getElementById(`sys-network-echart`));
  let option = {
    title: {
      text: "sys network info",
    },
    tooltip: {
      trigger: "axis",
      position: 'bottom',
      confine: true,
      axisPointer: {
        type: 'none',
      },
      textStyle: {
        color: 'fff',
      },
      enterable: true, //允许鼠标进入提示框浮层中，默认为false
      extraCssText: 'max-width:340px;max-height:83%;overflow:auto', //出现滚动条
    },
    legend: {
      top: "8%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysNetworkOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} MB",
      },
    },
    series: sysNetworkOption.networkSeriesList,
  };
  chart.setOption(option);
};

let sysMemOption = {
  loading: false,
  xTimeList: [],
  memTotalList: [],
};

const getSysMemData = () => {
  axios
    .get("/report/sys/mem", { params: { uuid: props.uuid } })
    .then((resp) => {
      let sysMemDataList = resp.data;
      sysMemOption.loading = true;

      for (let index in sysMemDataList) {
        let sysMemData = sysMemDataList[index];

        sysMemOption.xTimeList.push(
          moment(new Date(sysMemData.timestamp)).format("HH:mm:ss")
        );

        sysMemOption.memTotalList.push(sysMemData.memTotal);
      }

      sysMemOption.loading = false;
      printSysMem();
    });
};

const printSysMem = () => {
  let chart = echarts.init(document.getElementById(`sys-mem-echart`));
  let option = {
    title: {
      text: "sys memory",
    },
    tooltip: {
      trigger: "axis",
      position: ['50%', '30%']
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: sysMemOption.xTimeList,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} MB",
      },
    },
    series: [
      {
        name: "total memory",
        type: "line",
        data: sysMemOption.memTotalList,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
};
</script>

<style scoped lang="less">
.card-echart-parent {
  margin-top: 10px;
}
</style>

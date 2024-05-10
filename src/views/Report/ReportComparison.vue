<template>
  <div style="padding: 20px">
    <el-backtop :right="100" :bottom="100"/>
    <el-card class="box-card">
      <template #header>
        <div>
          <div style="position: relative; align-items: center">
            <el-button size="small" @click="exitComparisonCallback" circle icon="el-icon-arrow-left"></el-button>
            <span style="font-size: 20px;margin-left: 20px">
            {{$t('report.comparisonMode')}}
            </span>
            <el-button style=" float: right;margin-right: 10px" @click="isTableMode = true">{{$t('report.displaysTable')}}</el-button>
            <el-button style=" float: right;margin-right: 10px" @click="isTableMode = false">{{$t('report.displaysChart')}}</el-button>
          </div>
        </div>


      </template>
      <div v-if="isTableMode">
        <div v-if="!isLoading&&FrameTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Frame</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="FrameTabs" style="width: 100%">
              <el-table-column prop="testName" label="reportName" width="180"/>
              <el-table-column prop="avgFPS" label="avgFPS" width="180"/>
              <el-table-column prop="avgFPSDiff" label="avgFPSDiff" width="180"/>

              <el-table-column prop="allJankCount" label="allJankCount" width="180"/>
              <el-table-column prop="allJankCountDiff" label="allJankCountDiff" width="180"/>


              <el-table-column prop="allBigJankCount" label="allBigJankCount" width="180"/>
              <el-table-column prop="allBigJankCountDiff" label="allBigJankCountDiff" width="180"/>

              <el-table-column prop="jankCountRate" label="jankCountRate" width="180"/>
              <el-table-column prop="jankCountRateDiff" label="jankCountRateDiff" width="180"/>

              <el-table-column prop="bigJankCountRate" label="bigJankCountRate" width="180"/>
              <el-table-column prop="bigJankCountRateDiff" label="bigJankCountRateDiff" width="180"/>

              <el-table-column prop="maxJankCount" label="maxJankCount" width="180"/>
              <el-table-column prop="maxJankCountDiff" label="maxJankCountDiff" width="180"/>
              <el-table-column prop="maxBigJankCount" label="maxBigJankCount" width="180"/>
              <el-table-column prop="maxBigJankCountDiff" label="maxBigJankCountDiff" width="180"/>

            </el-table>
          </div>

        </div>
        <el-divider/>

        <div v-if="!isLoading&&ProcCpuTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Proc cpu</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="ProcCpuTabs" style="width: 100%">
              <el-table-column prop="testName" label="reportName" width="180"/>
              <el-table-column prop="avgProcCPU" label="avgProcCPU" width="180"/>
              <el-table-column prop="avgProcCPUDiff" label="avgProcCPUDiff" width="180"/>

              <el-table-column prop="maxProcCPU" label="maxProcCPU" width="180"/>
              <el-table-column prop="maxProcCPUDiff" label="maxProcCPUDiff" width="180"/>


            </el-table>
          </div>

        </div>
        <el-divider/>

        <div v-if="!isLoading&&ProcMemTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Proc Memory</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="ProcMemTabs" style="width: 100%">
              <!--              legend: ['totalPSS', 'javaHeap', 'nativeHeap', 'code', 'stack', 'graphics', 'privateOther', 'system'],-->
              <el-table-column prop="testName" label="reportName" width="180"/>
              <el-table-column prop="maxTotalPSS" label="maxTotalPSS" width="180"/>
              <el-table-column prop="maxTotalPSSDiff" label="maxTotalPSSDiff" width="180"/>

              <el-table-column prop="maxJavaHeap" label="maxJavaHeap" width="180"/>
              <el-table-column prop="maxJavaHeapDiff" label="maxJavaHeapDiff" width="180"/>
              <el-table-column prop="maxNativeHeap" label="maxNativeHeap" width="180"/>
              <el-table-column prop="maxNativeHeapDiff" label="maxNativeHeapDiff" width="180"/>
              <el-table-column prop="maxGraphics" label="maxGraphics" width="180"/>
              <el-table-column prop="maxGraphicsDiff" label="maxGraphicsDiff" width="180"/>
              <el-table-column prop="maxStack" label="maxStack" width="180"/>
              <el-table-column prop="maxStackDiff" label="maxStackDiff" width="180"/>
              <el-table-column prop="maxCode" label="maxCode" width="180"/>
              <el-table-column prop="maxCodeDiff" label="maxCodeDiff" width="180"/>
              <el-table-column prop="maxSystem" label="maxSystem" width="180"/>
              <el-table-column prop="maxSystemDiff" label="maxSystemDiff" width="180"/>
              <el-table-column prop="maxPrivateOther" label="maxPrivateOther" width="180"/>
              <el-table-column prop="maxPrivateOther" label="maxPrivateOther" width="180"/>

              <el-table-column prop="avgTotalPSS" label="avgTotalPSS" width="180"/>
              <el-table-column prop="avgTotalPSSDiff" label="avgTotalPSSDiff" width="180"/>

              <el-table-column prop="avgJavaHeap" label="avgJavaHeap" width="180"/>
              <el-table-column prop="avgJavaHeapDiff" label="avgJavaHeapDiff" width="180"/>
              <el-table-column prop="avgNativeHeap" label="avgNativeHeap" width="180"/>
              <el-table-column prop="avgNativeHeapDiff" label="avgNativeHeapDiff" width="180"/>
              <el-table-column prop="avgGraphics" label="avgGraphics" width="180"/>
              <el-table-column prop="avgGraphicsDiff" label="avgGraphicsDiff" width="180"/>
              <el-table-column prop="avgStack" label="avgStack" width="180"/>
              <el-table-column prop="avgStackDiff" label="avgStackDiff" width="180"/>
              <el-table-column prop="avgCode" label="avgCode" width="180"/>
              <el-table-column prop="avgCodeDiff" label="avgCodeDiff" width="180"/>
              <el-table-column prop="avgSystem" label="avgSystem" width="180"/>
              <el-table-column prop="avgSystemDiff" label="avgSystemDiff" width="180"/>
              <el-table-column prop="avgPrivateOther" label="avgPrivateOther" width="180"/>
              <el-table-column prop="avgPrivateOther" label="avgPrivateOther" width="180"/>

            </el-table>
          </div>

        </div>
        <el-divider/>


        <div v-if="!isLoading&&SysCpuTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">System CPU</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="SysCpuTabs" style="width: 100%">
              <!--              legend: ['totalPSS', 'javaHeap', 'nativeHeap', 'code', 'stack', 'graphics', 'privateOther', 'system'],-->
              <el-table-column prop="testName" label="reportName"/>
              <el-table-column prop="avgSysCPU" label="avgSysCPU"/>
              <el-table-column prop="avgSysCPUDiff" label="avgSysCPUDiff"/>
              <el-table-column prop="maxSysCPU" label="maxSysCPU"/>
              <el-table-column prop="maxSysCPUDiff" label="maxSysCPUDiff"/>
            </el-table>
          </div>

        </div>
        <el-divider/>

        <div v-if="!isLoading&&SysMemTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">System Memory</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="SysMemTabs" style="width: 100%">
              <el-table-column prop="testName" label="reportName"/>
              <el-table-column prop="avgMemTotal" label="avgMemTotal"/>
              <el-table-column prop="avgMemTotalDiff" label="avgMemTotalDiff"/>
              <el-table-column prop="maxMemTotal" label="maxMemTotal"/>
              <el-table-column prop="maxMemTotalDiff" label="maxMemTotalDiff"/>


            </el-table>
          </div>

        </div>
        <el-divider/>

        <div v-if="!isLoading&&SysNetworkTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">System Network</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="SysNetworkTabs" style="width: 100%">
              <el-table-column prop="testName" label="reportName"/>
              <el-table-column prop="networkName" label="interface name"/>
              <el-table-column prop="allSysRxData" label="allSysRxData"/>
              <el-table-column prop="allSysRxDataDiff" label="allSysRxDataDiff"/>
              <el-table-column prop="allSysTxData" label="allSysTxData"/>
              <el-table-column prop="allSysTxDataDiff" label="allSysTxDataDiff"/>


            </el-table>
          </div>

        </div>
        <el-divider/>

        <div v-if="!isLoading&&SysTemperatureTabs.length>0">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">System Temperature</span>
          </div>
          <div>
            <el-table v-loading="isLoading" border max-height="400" :data="SysTemperatureTabs" style="width: 100%">
              <el-table-column prop="testName" label="reportName"/>
              <el-table-column prop="maxTemperature" label="maxTemperature"/>
              <el-table-column prop="diffMaxTemperature" label="maxTemperatureDiff"/>


            </el-table>
          </div>

        </div>
        <el-divider/>
      </div>
      <div v-if="!isTableMode">

        <div v-if="perfConfig.isFrame">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Frame</span>
          </div>
          <el-divider/>
          <el-row>
            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'sysFPS'"
                    v-loading="FrameData.avgFPS!==undefined && FrameData.avgFPS.length>0"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'Jank'"
                    v-loading="FrameData.avgFPS!==undefined && FrameData.avgFPS.length>0"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'MaxJank'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'JankRate'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>
          </el-row>
        </div>


        <div v-if="perfConfig.isProcCPU || perfConfig.isSysCPU">
          <el-divider/>
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">CPU Utilization</span>
          </div>
          <el-divider/>
          <el-row v-if="perfConfig.isProcCPU">
            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'procCPUAvg'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'procCPUMax'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>
          </el-row>

          <el-row v-if="perfConfig.isSysCPU">
            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'sysCPUAvg'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'sysCPUMax'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>


          </el-row>
          <el-divider/>
        </div>


        <div  v-if="perfConfig.isProcMem || perfConfig.isSysMem">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Memory</span>
          </div>
          <el-divider/>
          <el-row  v-if="perfConfig.isProcMem">
            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'procMemMax'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'procMemAvg'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <el-row  v-if="perfConfig.isSysMem">
            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'sysMemMax'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

            <el-col style="margin-top: 10px" :span="24">
              <el-card>
                <div
                    :id="'sysMemAvg'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>

          </el-row>
          <el-divider/>
        </div>

        <div  v-if="perfConfig.isSysNetwork">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Network</span>
          </div>
          <el-divider/>
          <el-row>
            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'sysNetwork'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <el-divider/>
        </div>

        <div  v-if="perfConfig.isSysTemperature">
          <div style="margin-bottom: 10px">
            <span style="color: #e6a23c;font-size: 18px;">Temperature</span>
          </div>
          <el-divider/>
          <el-row>
            <el-col :span="24" style="margin-top: 10px">
              <el-card>
                <div
                    :id="'sysTemperature'"
                    element-loading-spinner="el-icon-box"
                    style="width: 100%; height: 350px"
                ></div>
              </el-card>
            </el-col>
          </el-row>
          <el-divider/>
        </div>
      </div>

    </el-card>


  </div>
</template>

<script setup>
import axios from "@/http/axios";
import oriAxios from 'axios';
import {nextTick, onMounted, ref, watch} from "vue";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkPointComponent,
  MarkLineComponent,
} from 'echarts/components';
import {BarChart, LineChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {useI18n} from "vue-i18n";

echarts.use([
  MarkPointComponent,
  MarkLineComponent,
  DataZoomComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
]);

const {t: $t} = useI18n();
const props = defineProps({
  uuids: Array,
  reportInfoObjects: Object
});
const emit = defineEmits(['exitComparison']);
const isTableMode = ref(false)

watch(isTableMode,()=>{
  if (!isTableMode.value){
    nextTick(() => {
      if (perfConfig.value.isFrame) {
        printFrame()
      }
      if (perfConfig.value.isProcMem) {
        printMaxProcMem()
        printAvgProcMem()
      }
      if (perfConfig.value.isSysMem) {
        printMaxSysMem()
        printAvgSysMem()
      }
      if (perfConfig.value.isProcCPU) {
        printMaxProcCPU()
        printAvgProcCPU()
      }
      if (perfConfig.value.isSysCPU) {
        printMaxSysCPU()
        printAvgSysCPU()
      }
      if (perfConfig.value.isSysNetwork) {
        printSysNetwork()
      }
      if (perfConfig.value.isSysTemperature) {
        printSysTemperature()
      }
    })
  }
})
const exitComparisonCallback = () => {
  emit('exitComparison')
}

const isLoading = ref(true)

const reportTableNames = []

const getSummaryReqList = []
onMounted(() => {
  buildBatchReportReq()
  getBatchReportSummaryData()
})

const buildBatchReportReq = () => {
  for (let index in props.uuids) {
    reportTableNames.push(props.reportInfoObjects[props.uuids[index]].testName)
    getSummaryReqList.push(axios.get("/report/summary", {params: {uuid: props.uuids[index]}}))
  }
  console.log(reportTableNames)
}

const perfConfig = ref({
  isFrame: false,
  isSysCPU: false,
  isProcCPU: false,
  isSysMem: false,
  isProcMem: false,
  isSysNetwork: false,
  isSysTemperature: false,
})

const getBatchReportSummaryData = () => {
  let base = {}
  oriAxios.all(getSummaryReqList).then(oriAxios.spread(function (...result) {
    let resultArr = [...result];
    resultArr.forEach((res, idx) => {
      if (idx === 0) {
        base = res.data;
      }
      genFrameData(reportTableNames[idx], base, res.data)
      genCpuData(reportTableNames[idx], base, res.data)
      genMemData(reportTableNames[idx], base, res.data)
      genNetwork(reportTableNames[idx], base, res.data)
      genTemperature(reportTableNames[idx], base, res.data)
      console.log(res.data, idx);
    })
    nextTick(() => {
      if (perfConfig.value.isFrame) {
        printFrame()
      }
      if (perfConfig.value.isProcMem) {
        printMaxProcMem()
        printAvgProcMem()
      }
      if (perfConfig.value.isSysMem) {
        printMaxSysMem()
        printAvgSysMem()
      }
      if (perfConfig.value.isProcCPU) {
        printMaxProcCPU()
        printAvgProcCPU()
      }
      if (perfConfig.value.isSysCPU) {
        printMaxSysCPU()
        printAvgSysCPU()
      }
      if (perfConfig.value.isSysNetwork) {
        printSysNetwork()
      }
      if (perfConfig.value.isSysTemperature) {
        printSysTemperature()
      }
    })

    isLoading.value = false
  }))
}


const FrameData = {}
const FrameTabs = []
const genFrameData = (reportName, base, data) => {
  if (base.sysFrameSummary !== undefined) {
    perfConfig.value.isFrame = true
    let keys = Object.keys(base.sysFrameSummary)
    let tabData = {}
    for (let index in keys) {
      let key = keys[index]
      let diffName = key + 'Diff'

      if (FrameData[key] === undefined) {
        FrameData[key] = []
      }
      if (FrameData[diffName] === undefined) {
        FrameData[diffName] = []
      }

      if (data.sysFrameSummary !== undefined) {
        FrameData[key].push(data.sysFrameSummary[key])
        FrameData[diffName].push(data.sysFrameSummary[key] - base.sysFrameSummary[key])

        tabData[key] = data.sysFrameSummary[key]
        tabData[diffName] = data.sysFrameSummary[key] - base.sysFrameSummary[key]
      } else {
        FrameData[key].push(-1)
        FrameData[diffName].push(base.sysFrameSummary[key])

        tabData[key] = -1
        tabData[diffName] = base.sysFrameSummary[key]
      }
    }
    tabData.testName = reportName
    FrameTabs.push(tabData)
  }
}

const SysCpuData = {}
const SysCpuTabs = []

const ProcCpuData = {}
const ProcCpuTabs = []

const genCpuData = (reportName, base, data) => {
  if (base.sysCpuSummary !== undefined) {
    perfConfig.value.isSysCPU = true
    let tabData = {}
    let keys = Object.keys(data.sysCpuSummary.cpu)
    for (let index in keys) {
      let key = keys[index]

      if (key === 'cpuName') {
        continue
      }
      let diffName = key + 'Diff'

      if (SysCpuData[key] === undefined) {
        SysCpuData[key] = []
      }
      if (SysCpuData[diffName] === undefined) {
        SysCpuData[diffName] = []
      }

      if (data.sysCpuSummary !== undefined) {
        SysCpuData[key].push(data.sysCpuSummary.cpu[key])
        SysCpuData[diffName].push(data.sysCpuSummary.cpu[key] - base.sysCpuSummary.cpu[key])

        tabData[key] = data.sysCpuSummary.cpu[key]
        tabData[diffName] = data.sysCpuSummary.cpu[key] - base.sysCpuSummary.cpu[key]
      } else {
        SysCpuData[key].push(-1)
        SysCpuData[diffName].push(-1)

        tabData[key] = -1
        tabData[diffName] = -1
      }
    }

    tabData.testName = reportName
    SysCpuTabs.push(tabData)
  }
  if (base.procCpuSummary !== undefined) {
    let keys = Object.keys(base.procCpuSummary)
    perfConfig.value.isProcCPU = true
    let tabData = {};
    for (let index in keys) {
      let key = keys[index]
      let diffName = key + 'Diff'
      if (ProcCpuData[key] === undefined) {
        ProcCpuData[key] = []
      }
      if (ProcCpuData[diffName] === undefined) {
        ProcCpuData[diffName] = []
      }
      if (data.procCpuSummary !== undefined) {
        ProcCpuData[key].push(data.procCpuSummary[key])
        ProcCpuData[diffName].push(data.procCpuSummary[key] - base.procCpuSummary[key])

        tabData[key] = data.procCpuSummary[key]
        tabData[diffName] = data.procCpuSummary[key] - base.procCpuSummary[key]
      } else {
        ProcCpuData[key].push(-1)
        ProcCpuData[diffName].push(-1)

        tabData[key] = -1
        tabData[diffName] = -1
      }
    }
    tabData.testName = reportName
    ProcCpuTabs.push(tabData)
  }
}

const ProcMemData = {}
const ProcMemTabs = []
const SysMemData = {}
const SysMemTabs = []
const genMemData = (testName, base, data) => {
  if (base.procMemSummary !== undefined) {
    perfConfig.value.isProcMem = true
    let keys = Object.keys(base.procMemSummary)
    let tabData = {}
    for (let index in keys) {
      let key = keys[index]
      let diffName = key + 'Diff'
      if (ProcMemData[key] === undefined) {
        ProcMemData[key] = []
      }
      if (ProcMemData[diffName] === undefined) {
        ProcMemData[diffName] = []
      }
      if (data.procMemSummary !== undefined) {
        ProcMemData[key].push(data.procMemSummary[key])
        ProcMemData[diffName].push(data.procMemSummary[key] - base.procMemSummary[key])

        tabData[key] = data.procMemSummary[key]
        tabData[diffName] = data.procMemSummary[key] - base.procMemSummary[key]
      } else {
        ProcMemData[key].push(-1)
        ProcMemData[diffName].push(-1)

        tabData[key] = -1
        tabData[diffName] = -1
      }
    }

    tabData.testName = testName
    ProcMemTabs.push(tabData)
  }
  if (base.sysMemSummary !== undefined) {
    perfConfig.value.isSysMem = true
    let tabData = {}
    let keys = Object.keys(base.sysMemSummary)
    for (let index in keys) {
      let key = keys[index]
      let diffName = key + 'Diff'
      if (SysMemData[key] === undefined) {
        SysMemData[key] = []
      }
      if (SysMemData[diffName] === undefined) {
        SysMemData[diffName] = []
      }
      if (data.sysMemSummary !== undefined) {
        SysMemData[key].push(data.sysMemSummary[key])
        SysMemData[diffName].push(data.sysMemSummary[key] - base.sysMemSummary[key])

        tabData[key] = data.sysMemSummary[key]
        tabData[diffName] = data.sysMemSummary[key] - base.sysMemSummary[key]
      } else {
        SysMemData[key].push(-1)
        SysMemData[diffName].push(-1)

        tabData[key] = -1
        tabData[diffName] = -1
      }
    }

    tabData.testName = testName
    SysMemTabs.push(tabData)
  }
}

const SysNetworkData = {}
const SysNetworkTabs = []

const genNetwork = (testName, base, data) => {
  if (base.networkSummary !== undefined) {
    perfConfig.value.isSysNetwork = true
    let networkNames = Object.keys(base.networkSummary)
    for (let i in networkNames) {
      if (SysNetworkData[networkNames[i]] === undefined) {
        SysNetworkData[networkNames[i]] = {}
      }
      let keys = Object.keys(base.networkSummary[networkNames[i]])
      let tabData = {}
      for (let index in keys) {
        let key = keys[index]
        let diffName = key + 'Diff'
        if (key === 'name') {
          continue
        }
        if (SysNetworkData[networkNames[i]][key] === undefined) {
          SysNetworkData[networkNames[i]][key] = []
        }
        if (SysNetworkData[networkNames[i]][diffName] === undefined) {
          SysNetworkData[networkNames[i]][diffName] = []
        }
        if (data.networkSummary[networkNames[i]] !== undefined) {
          SysNetworkData[networkNames[i]][key].push(data.networkSummary[networkNames[i]][key])
          SysNetworkData[networkNames[i]][diffName].push(data.networkSummary[networkNames[i]][key] - base.networkSummary[networkNames[i]][key])

          tabData[key] = data.networkSummary[networkNames[i]][key]
          tabData[diffName] = data.networkSummary[networkNames[i]][key] - base.networkSummary[networkNames[i]][key]
        } else {
          SysNetworkData[networkNames[i]][key].push(-1)
          SysNetworkData[networkNames[i]][diffName].push(-1)

          tabData[key] = -1
          tabData[diffName] = -1
        }
      }

      tabData.networkName = networkNames[i]
      tabData.testName = testName
      SysNetworkTabs.push(tabData)
    }
  }
}

const SysTemperature = {
  maxTemperature: [],
  diffMaxTemperature: []
}
const SysTemperatureTabs = []
const genTemperature = (testName, base, data) => {
  if (base.sysTemperatureSummary !== undefined) {
    perfConfig.value.isSysTemperature = true
    let tabData = {}
    if (data.sysTemperatureSummary !== undefined) {
      SysTemperature.maxTemperature.push(data.sysTemperatureSummary.mxTemperature)
      SysTemperature.diffMaxTemperature.push(data.sysTemperatureSummary.mxTemperature - base.sysTemperatureSummary.mxTemperature)

      tabData.maxTemperature = data.sysTemperatureSummary.mxTemperature
      tabData.diffMaxTemperature = data.sysTemperatureSummary.mxTemperature - base.sysTemperatureSummary.mxTemperature
    } else {
      SysTemperature.maxTemperature.push(-1)
      SysTemperature.diffMaxTemperature.push(-1)

      tabData.maxTemperature = -1
      tabData.diffMaxTemperature = -1
    }
    tabData.testName = testName
    SysTemperatureTabs.push(tabData)
  }
}

const printFrame = () => {

  if (FrameData.avgFPS !== undefined && FrameData.avgFPS.length > 0) {
    let chart = echarts.getInstanceByDom(
        document.getElementById(
            `sysFPS`
        )
    );
    if (chart == null) {
      chart = echarts.init(
          document.getElementById(
              `sysFPS`
          )
      );
    }
    chart.resize();
    let option = {
      title: {
        text: 'Avg FPS Comparison',
        textStyle: {
          color: '#606266',
        },
        x: 'center',
        y: 'top',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }, position: position,
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
          data: reportTableNames,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'FPS',
          type: 'line',
          data: FrameData.avgFPS
        }
      ]
    };
    chart.setOption(option)
  }
  if (FrameData.allJankCount !== undefined && FrameData.allJankCount.length > 0) {
    let chart = echarts.getInstanceByDom(
        document.getElementById(
            `Jank`
        )
    );
    if (chart == null) {
      chart = echarts.init(
          document.getElementById(
              `Jank`
          )
      );
    }
    chart.resize();
    let option = {
      title: {
        text: 'Jank Count Comparison',
        textStyle: {
          color: '#606266',
        },
        x: 'center',
        y: 'top',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
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
          data: reportTableNames,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'allJankCount',
          type: 'bar',
          data: FrameData.allJankCount
        }, {
          name: 'allBigJankCount',
          type: 'bar',
          data: FrameData.allBigJankCount
        }
      ]
    };
    chart.setOption(option)
  }

  if (FrameData.maxJankCount !== undefined && FrameData.maxJankCount.length > 0) {
    let chart = echarts.getInstanceByDom(
        document.getElementById(
            `MaxJank`
        )
    );
    if (chart == null) {
      chart = echarts.init(
          document.getElementById(
              `MaxJank`
          )
      );
    }
    chart.resize();
    let option = {
      title: {
        text: 'maximum per second Jank Count Comparison',
        textStyle: {
          color: '#606266',
        },
        x: 'center',
        y: 'top',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
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
          data: reportTableNames,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'maxJankCount',
          type: 'bar',
          data: FrameData.maxJankCount
        }, {
          name: 'maxBigJankCount',
          type: 'bar',
          data: FrameData.maxBigJankCount
        }
      ]
    };
    chart.setOption(option)
  }

  if (FrameData.bigJankCountRate !== undefined && FrameData.bigJankCountRate.length > 0) {
    let chart = echarts.getInstanceByDom(
        document.getElementById(
            `JankRate`
        )
    );
    if (chart == null) {
      chart = echarts.init(
          document.getElementById(
              `JankRate`
          )
      );
    }
    chart.resize();
    let option = {
      title: {
        text: 'maximum per second Jank Rate Comparison',
        textStyle: {
          color: '#606266',
        },
        x: 'center',
        y: 'top',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
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
          data: reportTableNames,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'bigJankCountRate',
          type: 'bar',
          data: FrameData.bigJankCountRate
        }, {
          name: 'jankCountRate',
          type: 'bar',
          data: FrameData.jankCountRate
        }
      ]
    };
    chart.setOption(option)
  }
}

const printMaxProcMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'procMemMax'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `procMemMax`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'Process Memory Max',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.memUsage')}(MB)`, min: 0}],
    series: [
      {
        name: 'maxTotalPSS',
        type: 'line',
        data: ProcMemData.maxTotalPSS,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'maxJavaHeap',
        type: 'line',
        data: ProcMemData.maxJavaHeap,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'maxGraphics',
        type: 'line',
        data: ProcMemData.maxGraphics,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'maxNativeHeap',
        type: 'line',
        data: ProcMemData.maxNativeHeap,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'maxCode',
        type: 'line',
        data: ProcMemData.maxNativeHeap,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'maxPrivateOther',
        type: 'line',
        data: ProcMemData.maxPrivateOther,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'maxStack',
        type: 'line',
        data: ProcMemData.maxStack,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'maxSystem',
        type: 'line',
        data: ProcMemData.maxSystem,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}
const printAvgProcMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'procMemAvg'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `procMemAvg`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'Process Memory Avg',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.memUsage')}(MB)`, min: 0}],
    series: [
      {
        name: 'avgTotalPSS',
        type: 'line',
        data: ProcMemData.avgTotalPSS,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'avgJavaHeap',
        type: 'line',
        data: ProcMemData.avgJavaHeap,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'avgGraphics',
        type: 'line',
        data: ProcMemData.avgGraphics,
        showSymbol: false,
        boundaryGap: false,
      },
      {
        name: 'avgNativeHeap',
        type: 'line',
        data: ProcMemData.avgNativeHeap,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'maxCode',
        type: 'line',
        data: ProcMemData.avgNativeHeap,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'avgPrivateOther',
        type: 'line',
        data: ProcMemData.avgPrivateOther,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'avgStack',
        type: 'line',
        data: ProcMemData.avgStack,
        showSymbol: false,
        boundaryGap: false,
      }, {
        name: 'avgSystem',
        type: 'line',
        data: ProcMemData.avgSystem,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}

const printMaxSysMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysMemMax'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysMemMax`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System Memory Max',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.memUsage')}(MB)`, min: 0}],
    series: [
      {
        name: 'avgSysCPU',
        type: 'line',
        data: SysMemData.maxMemTotal,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}
const printAvgSysMem = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysMemAvg'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysMemAvg`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System Memory Avg',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.memUsage')}(MB)`, min: 0}],
    series: [{
      name: 'avgMemTotal',
      type: 'line',
      data: SysMemData.avgMemTotal,
      showSymbol: false,
      boundaryGap: false,
    },],
  };
  chart.setOption(option);
}


const printMaxProcCPU = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'procCPUMax'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `procCPUMax`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'Process CPU Max',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.procCpu')}(%)`, min: 0}],
    series: [
      {
        name: 'max Proc CPU usage',
        type: 'line',
        data: ProcCpuData.maxProcCPU,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}
const printAvgProcCPU = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'procCPUAvg'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `procCPUAvg`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'Process CPU Avg',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    yAxis: [{name: `${$t('perf.procCpu')}(%)`, min: 0}],
    series: [
      {
        name: 'avg Proc CPU usage',
        type: 'line',
        data: ProcCpuData.avgProcCPU,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}

const printMaxSysCPU = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysCPUMax'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysCPUMax`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System CPU Max',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },

    yAxis: [{name: `${$t('perf.procCpu')}(%)`, min: 0}],
    series: [
      {
        name: 'maxSysCPU',
        type: 'line',
        data: SysCpuData.maxSysCPU,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}
const printAvgSysCPU = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysCPUAvg'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysCPUAvg`
        )
    );
  }
  chart.resize();
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System CPU Avg',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },

    yAxis: [{name: `${$t('perf.procCpu')}(%)`, min: 0}],
    series: [{
      name: 'avgSysCPU',
      type: 'line',
      data: SysCpuData.avgSysCPU,
      showSymbol: false,
      boundaryGap: false,
    },],
  };
  chart.setOption(option);
}

const printSysNetwork = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysNetwork'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysNetwork`
        )
    );
  }
  chart.resize();

  let serialList = []
  let legend = []

  for (let key in SysNetworkData) {
    legend.push(key + '_allRxData')
    legend.push(key + '_allTxData')
    serialList.push({
      name: key + '_allRxData',
      type: 'line',
      data: SysNetworkData[key].allSysRxData,
      showSymbol: false,
      boundaryGap: false,
    })
    serialList.push({
      name: key + '_allTxData',
      type: 'line',
      data: SysNetworkData[key].allSysTxData,
      showSymbol: false,
      boundaryGap: false,
    })
  }

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

    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    legend: {
      top: '8%',
      data: legend,
    },
    yAxis: [{name: `${$t('perf.network')}(MB)`, min: 0}],
    series: serialList,
  };
  chart.setOption(option);
}
const printSysTemperature = () => {
  let chart = echarts.getInstanceByDom(
      document.getElementById(
          'sysTemperature'
      )
  );
  if (chart == null) {
    chart = echarts.init(
        document.getElementById(
            `sysTemperature`
        )
    );
  }
  chart.resize();

  const option = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#409EFF'],
    title: {
      text: 'System Temperature',
      textStyle: {
        color: '#606266',
      },
      x: 'center',
      y: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        saveAsImage: {show: true, title: 'Save'},
      },
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      data: reportTableNames,
    },
    legend: {
      top: '8%',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} ℃'
      }
    },
    series: [
      {
        name: 'Max Temperature',
        type: 'line',
        data: SysTemperature.maxTemperature,
        showSymbol: false,
        boundaryGap: false,
      },
    ],
  };
  chart.setOption(option);
}

const position = (point, params, dom, rect, size) => {
  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  // 提示框位置
  var x = 0; // x坐标位置
  var y = 0; // y坐标位置

  // 当前鼠标位置
  var pointX = point[0];
  var pointY = point[1];

  // 外层div大小
  // var viewWidth = size.viewSize[0];
  // var viewHeight = size.viewSize[1];

  // 提示框大小
  var boxWidth = size.contentSize[0];
  var boxHeight = size.contentSize[1];

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

</script>

<style scoped>

</style>
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
import {View, VideoPause, Delete} from '@element-plus/icons';
import {useI18n} from 'vue-i18n';
import {ref, watch} from 'vue';
import AndroidPerfChart from './AndroidPerfChart.vue';
import axios from "@/http/axios";

const androidPerfChart = ref(null);
const {t: $t} = useI18n();
const emit = defineEmits(['pickCurrentApp', 'startPerfmon', 'stopPerfmon', 'refreshAppList']);
const isStart = ref(false);
const isPackageLoading = ref(false)
const props = defineProps({
  udid: String,
  appList: Array,
});

watch(() => props.udid, (udid) => {
  if (udid !== "") {
    isPackageLoading.value = props.appList.length === 0;
  } else {
    isPackageLoading.value = false
  }

})

const startPerfmon = () => {
  emit('startPerfmon', perfConfig.value, isStart);
  // isStart.value = true;
};
const stopPerfmon = () => {
  emit('stopPerfmon', isStart);
  // isStart.value = false;
};
const clearPerfmon = () => {
  sysCpu.value = {};
  sysMem.value = {};
  sysNetwork.value = {};
  procCpu.value = {};
  procMem.value = {};
  sysFps.value = {};
  procThread.value = {};
};
const setData = (data) => {
  if (data.process) {
    if (data.process.cpuInfo) {
      procCpu.value = data.process.cpuInfo;
      androidPerfChart.value.printPerfCpu();
    }
    if (data.process.memInfo) {
      procMem.value = data.process.memInfo;
      androidPerfChart.value.printPerfMem();
    }
    if (data.process.threadInfo) {
      procThread.value = data.process.threadInfo;
      androidPerfChart.value.printProcThread();
    }
  }
  if (data.system) {
    if (data.system.cpuInfo) {
      sysCpu.value = data.system.cpuInfo;
      androidPerfChart.value.printCpu();
    }
    if (data.system.memInfo) {
      sysMem.value = data.system.memInfo;
      androidPerfChart.value.printMem();
    }
    if (data.system.networkInfo) {
      sysNetwork.value = data.system.networkInfo;
      androidPerfChart.value.printNetwork();
    }
    if (data.system.temperature){
      sysTemperature.value = data.system.temperature;
      androidPerfChart.value.printTemperature()
    }
    if (data.system.frame) {
      // console.log(data.system.frame)
      sysFps.value = data.system.frame;
      if (perfConfig.value.FPS) {
        androidPerfChart.value.printFps();
      }
      if (perfConfig.value.jank) {
        androidPerfChart.value.printJank();
      }
    }
  }
};
const sysCpu = ref(null);
const sysMem = ref(null);
const sysNetwork = ref(null);
const procCpu = ref(null);
const procMem = ref(null);
const sysFps = ref(null);
const sysJank = ref(null);
const procThread = ref(null);
const sysTemperature = ref(null);
defineExpose({setData});

const getCurrentAppName = () => {
  isPackageLoading.value = true
  axios.get("/android/app/current", {params: {udid: props.udid}}).then((resp) => {
    perfConfig.value.packageName = resp.data
    isPackageLoading.value = false
  })
}

const perfConfig = ref({
  sysCpu: true,
  sysMem: true,
  sysNetwork: false,
  FPS: true,
  jank: false,
  procCpu: false,
  procMem: false,
  procThread: false,
  sysTemperature: false,
  packageName: "",
})


</script>

<template>
  <div>
    <el-select
        v-model="perfConfig.packageName "
        style="margin-right: 10px; width: 280px"
        filterable
        clearable
        size="mini"
        :placeholder="$t('perf.select')"
        v-loading="isPackageLoading"
    >
      <el-option v-for="packageName in appList" :value="packageName">
        <div style="display: flex; align-items: center">
          {{ packageName }}
        </div>
      </el-option>
    </el-select>
    <el-button
        @click="getCurrentAppName"
        icon="el-icon-aim"
        type="primary"
        size="mini"
    >
      当前应用
    </el-button>
    <el-button
        type="primary"
        size="mini"
        :loading="isStart"
        @click="startPerfmon"
    >
      <el-icon :size="12" style="vertical-align: middle">
        <View/>
      </el-icon>
      {{ $t('perf.start') }}
    </el-button>
    <el-button type="warning" size="mini" @click="stopPerfmon">
      <el-icon :size="12" style="vertical-align: middle">
        <VideoPause/>
      </el-icon>
      {{ $t('perf.stop') }}
    </el-button>
    <el-button type="danger" size="mini" @click="clearPerfmon">
      <el-icon :size="12" style="vertical-align: middle">
        <Delete/>
      </el-icon>
      {{ $t('perf.clear') }}
    </el-button>
    <!--    性能配置   -->
    <div v-show="!isStart" style="margin-top: 10px">
      <el-card style="height: 100%">

        <el-form v-show="!isStart" ref="form" :model="perfConfig" label-width="10px">


          <el-form-item>
            <span>sys-cpu</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.sysCpu"></el-switch>
            <span>sys-mem</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.sysMem"></el-switch>

            <span>network</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.sysNetwork"></el-switch>
            <span>temperature</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.sysTemperature"></el-switch>
          </el-form-item>
          <!--          <el-divider></el-divider>-->

          <el-form-item>
            <span>proc-cpu</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.procCpu"></el-switch>
            <span>proc-mem</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.procMem"></el-switch>
            <span>thread</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.procThread"></el-switch>
          </el-form-item>

          <!--          <el-divider></el-divider>-->
          <el-form-item>
            <span>FPS</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.FPS"></el-switch>
            <span>Jank</span>
            <el-switch style="margin-right: 5px;margin-left: 6px" v-model="perfConfig.jank"></el-switch>
          </el-form-item>
          <!--          <el-divider></el-divider>-->


        </el-form>
      </el-card>
    </div>

    <!--性能图表-->
    <android-perf-chart
        v-show="isStart"
        ref="androidPerfChart"
        :cid="0"
        :rid="''"
        :did="0"
        :is-start-perf="isStart"
        :sys-cpu="sysCpu"
        :sys-mem="sysMem"
        :sys-network="sysNetwork"
        :sys-fps="sysFps"
        :sys-jank="sysJank"
        :proc-cpu="procCpu"
        :proc-mem="procMem"
        :proc-thread="procThread"
        :sys-temperature="sysTemperature"
    />
  </div>
</template>

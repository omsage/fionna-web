<template>
  <div class="remote-header">
    <el-radio-group v-model="currentTabName">
      <el-radio-button label="perfTest" @click="isReportPage=false">性能测试</el-radio-button>
      <el-radio-button label="testReport" @click="isReportPage=true">测试报告</el-radio-button>
    </el-radio-group>
  </div>
  <PerfIndex v-if="!isReportPage"></PerfIndex>
  <ReportIndex v-else></ReportIndex>
</template>

<script setup>
import {useRouter} from "vue-router";
import PerfIndex from "@/views/RemoteEmulator/PerfIndex.vue";
import {ref} from "vue";
// import ReportDetail from "@/views/Report/ReportDetail.vue";
import ReportIndex from "@/views/Report/ReportIndex.vue";

const currentTabName = ref('perfTest')
const router = useRouter();

const isReportPage = ref(false)

</script>

<style scoped>

</style>
<template>
  <div style="padding: 20px">
    <el-card v-if="!isShowDetail">
      <el-row :gutter="10">
        <el-col :span="5" v-for="item in reportList" :key="item"
                :xs="12"
                :sm="6"
                :md="6"
                :lg="6"
                :xl="6"
                style="margin-top: 20px"
        >
          <ReportCard
              @getDetail="getDetail"
              :device="item"
          />
        </el-col>
      </el-row>
      <el-pagination style="margin-top: 20px" background :page-size="pageSize" @current-change="getReportList" layout="prev, pager, next"
                     :total="total"/>
    </el-card>
    <ReportDetail
        v-if="isShowDetail"
        @exitDetail="exitDetail"
        :uuid="detailUUID"
        :test-report-name="detailTestName"
    ></ReportDetail>
  </div>
</template>

<script setup>

import axios from "@/http/axios";
import {onMounted, ref} from "vue";
import ReportCard from "@/components/ReportCard.vue";
import ReportDetail from "@/views/Report/ReportDetail.vue";

onMounted(() => {
  getReportList(1)
})

const pageSize = ref(8)
const total = ref(12)
const reportList = ref([])

const detailUUID = ref("")
const detailTestName = ref("")
const isShowDetail = ref(false)
const getDetail = (uuid,testName) => {
  detailUUID.value = uuid
  isShowDetail.value = true
  detailTestName.value = testName
}

const exitDetail = () => {
  detailUUID.value = ""
  isShowDetail.value = false
  console.log("?????")
}

const getReportList = (page) => {
  axios.get("/report/list", {params: {page: page, size: pageSize.value}}).then((resp) => {
    console.log(resp)
    reportList.value = resp.data.reports;
    total.value = resp.data.total;
  })
}


</script>

<style scoped>

</style>
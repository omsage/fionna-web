<template>
  <div style="padding: 20px">
    <el-card v-if="!isShowDetail">
      <template #header>
        <div>
          <el-input
              v-model="selectTestName"
              style="max-width: 600px"
              :placeholder="$t('report.selectReportMess')"
              clearable
          >
            <template #append><el-button @click="getReportList" icon="el-icon-search"></el-button></template>
          </el-input>

          <el-button style=" float: right;" @click="deleteReport">{{$t("report.delete")}}</el-button>
        </div>
      </template>

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
              @selectReportList="selectReportList"
              @getDetail="getDetail"
              :device="item"
          />
        </el-col>
      </el-row>
      <el-pagination v-show="total/pageSize>1" style="margin-top: 20px" background :page-size="pageSize"
                     @current-change="getReportList" layout="prev, pager, next"
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
import {ElMessage, ElMessageBox} from "element-plus";
import {useI18n} from "vue-i18n";
const { t: $t } = useI18n();
onMounted(() => {
  getReportList(1)
})

const pageSize = ref(8)
const total = ref(0)
const reportList = ref([])

const detailUUID = ref("")
const detailTestName = ref("")
const isShowDetail = ref(false)

const selectTestName = ref("")

let selectUUIDs = {}


const deleteReport = () => {
  ElMessageBox.confirm(
      $t('report.deleteMess'),
      $t('elements.warn'),
      {
        confirmButtonText: $t('form.confirm'),
        cancelButtonText: $t('form.cancel'),
        type: 'warning',
      }
  ).then(() => {
    // todo 增加选择设备的方法

    let params = []
    for (let key in selectUUIDs){
      // console.log(key)
      params.push(selectUUIDs[key])
    }
    axios.post("/report/delete",params).then((resp)=>{
      ElMessage({
        type: 'success',
        message: 'success',
      });
      getReportList(1)
    })
  }).catch((err) => {
    ElMessage({
      type: 'info',
      message: $t('form.cancel'),
    });
  })
}

const getDetail = (uuid, testName) => {
  detailUUID.value = uuid
  isShowDetail.value = true
  detailTestName.value = testName
}

const exitDetail = () => {
  detailUUID.value = ""
  isShowDetail.value = false
}

const getReportList = (page) => {
  let param = {page: page, size: pageSize.value};
  if (selectTestName.value!==""){
    param.name = selectTestName.value
  }
  axios.get("/report/list", {params: param}).then((resp) => {
    console.log(resp)
    reportList.value = resp.data.reports;
    total.value = resp.data.total;
  })
}

const selectReportList = (uuid,isCheckbox) => {
  console.log(uuid,isCheckbox)
  if (isCheckbox){
    selectUUIDs[uuid]={
      uuid:uuid
    }
  }else {
    delete selectUUIDs[uuid]
  }

}

</script>

<style scoped>

</style>
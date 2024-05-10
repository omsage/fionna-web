<template>
  <div style="padding: 20px">
    <el-card v-if="isReportMode===0">
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

          <el-button style=" float: right;margin-right: 10px" @click="deleteReport">{{$t("report.delete")}}</el-button>
          <el-button style=" float: right;margin-right: 10px" @click="getComparison">{{$t("report.comparison")}}</el-button>
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
        v-if="isReportMode===1"
        @exitDetail="exitDetail"
        :uuid="detailUUID"
        :test-report-name="detailTestName"
    ></ReportDetail>
    <ReportComparison
        :uuids="selectUUIDList"
        :report-info-objects="selectUUIDObject"
        v-if="isReportMode===2"
        @exitComparison="exitComparison"
    >
    </ReportComparison>
  </div>
</template>

<script setup>

import axios from "@/http/axios";
import {onMounted, ref} from "vue";
import ReportCard from "@/components/ReportCard.vue";
import ReportDetail from "@/views/Report/ReportDetail.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useI18n} from "vue-i18n";
import ReportComparison from "@/views/Report/ReportComparison.vue";
const { t: $t } = useI18n();
import oriAxios from 'axios';

onMounted(() => {
  getReportList(1)
})

const pageSize = ref(8)
const total = ref(0)
const reportList = ref([])

const detailUUID = ref("")
const detailTestName = ref("")
const isReportMode = ref(0)

const selectTestName = ref("")

let selectUUIDList = ref([])
let selectUUIDObject = ref({})


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
    for (let index in selectUUIDList.value){
      // console.log(key)
      params.push(selectUUIDList.value[index])
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
  isReportMode.value = 1
  detailTestName.value = testName
}

const getComparison = ()=>{

  isReportMode.value = 2
}

const exitComparison = () => {
  isReportMode.value = 0
  selectUUIDList.value = []
}

const exitDetail = () => {
  detailUUID.value = ""
  isReportMode.value = 0
  selectUUIDList.value = []
}

const perfConfigList = ref([])

const getReportList = (page) => {
  let param = {page: page, size: pageSize.value};
  if (selectTestName.value!==""){
    param.name = selectTestName.value
  }
  perfConfigList.value = []
  axios.get("/report/list", {params: param}).then((resp) => {
    console.log(resp)
    reportList.value = resp.data.reports;
    total.value = resp.data.total;

  })
}

const selectReportList = (device,isCheckbox) => {
  if (isCheckbox){
    selectUUIDList.value.push(device.uuid)
    selectUUIDObject.value[device.uuid] = device
  }else {

    selectUUIDList.value = selectUUIDList.value.filter(item => item !== device.uuid)
    delete selectUUIDObject.value[device.uuid]
    // const index = selectUUIDList.value.indexOf(uuid); // 查找元素值在数组中的索引
    // if (index !== -1) {
    //   selectUUIDList.value.splice(index, 1); // 如果找到了元素值，就使用 splice() 方法删除
    // }
  }

}

</script>

<style scoped>

</style>
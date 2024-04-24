<template>
  <div class="remote-header">
    <el-radio-group v-model="currentTabName">
      <el-radio-button label="perfTest" @click="isReportPage=false">性能测试</el-radio-button>
      <el-radio-button label="testReport" @click="isReportPage=true">测试报告</el-radio-button>
      <el-dropdown style=" float: right;margin-right: 20px">
    <span class="el-dropdown-link">
      {{ $t('layout.languages')}}
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
                v-for="item in localeList"
                :key="item.event"
                :index="item.event"
                @click="changeLocaleHandler(item.event)"
            >{{ item.text }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-radio-group>

  </div>
  <PerfIndex v-if="!isReportPage"></PerfIndex>
  <ReportIndex v-else></ReportIndex>
</template>

<script setup>
import {useRouter} from "vue-router";
import PerfIndex from "@/views/RemoteEmulator/PerfIndex.vue";
import {ref} from "vue";
import ReportIndex from "@/views/Report/ReportIndex.vue";
import {localeList} from '@/config/locale';
import {useI18n} from "vue-i18n";
import useLocale from "@/locales/useLocale";
import store from "@/store";

const value = ref('')
const {t: $t} = useI18n();

const changeLocaleHandler = function (val) {
  const {changeLocale} = useLocale(store);
  changeLocale(val);
};

const currentTabName = ref('perfTest')

const isReportPage = ref(false)

</script>

<style scoped>

</style>
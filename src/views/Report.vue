<template>
  <div class="remote-header">
    <el-radio-group v-model="currentTabName">
      <el-radio-button label="perfTest" @click="router.replace('/')">性能测试</el-radio-button>
      <el-radio-button label="testReport" @click="router.replace('/report')">测试报告</el-radio-button>
    </el-radio-group>
  </div>
  <div style="padding: 20px">
    <el-image :src="testImg"></el-image>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();

const currentTabName = 'testReport'

const img = import.meta.globEager('../assets/img/*');
const testImg = ref("");

testImg.value = img[`../assets/img/default.png`].default;

</script>

<style scoped>

</style>
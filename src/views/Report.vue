<template>
  <div class="remote-header">
    <el-radio-group v-model="currentTabName">
      <el-radio-button label="perfTest" @click="router.replace('/')">性能测试</el-radio-button>
      <el-radio-button label="testReport" @click="router.replace('/report')">测试报告</el-radio-button>
    </el-radio-group>
  </div>
  <div style="padding: 20px">

    <el-card class="box-card">
      <template #header>
        <div style="position: relative; display: flex; align-items: center">
          <el-button size="small" circle icon="el-icon-arrow-left"></el-button>
          <span style="font-size: 16px;margin-left: 20px">
            xxxx测试报告！
          </span>

        </div>
      </template>
        <el-row :gutter="24">
          <el-col :span="3">
            <el-card>CPU平均使用率:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>内存峰值:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>FPS均值:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>Jank Count:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>BigJank Count:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>Other1:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>Other2:</el-card>
          </el-col>
          <el-col v-show="false" >
            <el-card>Other3:</el-card>
          </el-col>
          <el-col :span="3">
            <el-card>Other4:</el-card>
          </el-col>
        </el-row>
      <el-divider/>
      <el-tabs  v-model="activeName" :tab-position="'left'">

        <el-tab-pane label="Frame" name="Frame">角色管理</el-tab-pane>

        <el-tab-pane label="CPU" name="CPU">
          <el-row :gutter="20">
            <el-col :span="24" style="margin-bottom: 10px">
              <el-card><div style="width: auto; height: 350px" :id="'proc-cpu'"></div></el-card>
            </el-col>
            <el-col :span="24">
              <el-card><div style="width: 100%; height: 350px" :id="'sys-cpu'"></div></el-card>
            </el-col>
          </el-row>

        </el-tab-pane>


        <el-tab-pane label="Memory" name="Memory">配置管理</el-tab-pane>

        <el-tab-pane label="Other" name="Other">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>


  </div>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {useRouter} from 'vue-router';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
    MarkPointComponent
} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

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
const router = useRouter();

const activeName = ref("Frame");

const currentTabName = 'testReport'

onMounted(()=>{
  printCPU()
})

watch(activeName,(activeName)=>{
  if (activeName==='CPU'){
    nextTick(() => {
      const cpuChart = echarts.getInstanceByDom(
          document.getElementById(`sys-cpu`
          )
      );

      cpuChart.resize();

    })
  }
})

const printCPU = () => {
  console.log(document.getElementById(`sys-cpu`))
  let chart = echarts.init(
      document.getElementById(`sys-cpu`)
  );
  let option = {
    title: {
      text: 'Temperature Change in the Coming Week'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: 'Highest',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Lowest',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            {
              yAxis: 6
            },
          ]
        }
      }
    ]
  };
  chart.setOption(option);
}

</script>

<style scoped lang="less">
</style>
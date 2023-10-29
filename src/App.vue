<script lang="ts" setup>
import {ref} from 'vue'
import {Search} from '@element-plus/icons'

const CPU = ref(true)
const Mem = ref(true)
const FPS = ref(true)
const jank = ref(true)
const select = ref('')
const inputPackageName = ref("")

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="270px">
          <el-space direction="vertical">
            <!--            <el-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">-->
            <!--              <template #header>-->
            <!--                <div class="card-header">-->
            <!--                  <span>Card name</span>-->
            <!--                  <el-button class="button" text>Operation button</el-button>-->
            <!--                </div>-->
            <!--              </template>-->
            <!--              <div v-for="o in 4" :key="o" class="text item">-->
            <!--                {{ 'List item ' + o }}-->
            <!--              </div>-->
            <!--            </el-card>-->
            <el-card class="box-card">
              <el-input
                  v-model="inputPackageName"
                  placeholder="输入包名或者bundle"
                  class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="select" placeholder=" " style="width: 43px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                  </el-select>
                </template>

                <template #append>
                  <el-button :icon="Search"/>
                </template>
              </el-input>
              <br>
              <br>
              <div>
                <el-button type="primary">获取当前运行应用</el-button>
              </div>
            </el-card>

            <el-card class="box-card" >
              <el-checkbox v-model="CPU" label="CPU"  class="checkbox-item"/>
              <el-checkbox v-model="Mem" label="内存"  class="checkbox-item"/>
              <el-checkbox v-model="FPS" label="FPS"  class="checkbox-item"/>
              <el-checkbox v-model="jank" label="jank"  class="checkbox-item"/>
            </el-card>
          </el-space>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
/*.checkbox-group {*/
/*  display: flex;*/
/*  flex-wrap: wrap;*/
/*  margin-left: -10px; !* 调整左侧的负边距 *!*/
/*}*/

.checkbox-item {
  /* 设置复选框之间的间隔 */
  /* 设置复选框之间的下间距 */
  margin: 0 10px 10px;
}
</style>
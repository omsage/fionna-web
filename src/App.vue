<script lang="ts" setup>
import {ref} from 'vue'
import {Check, Search} from '@element-plus/icons'
import {getAndroidPackageList, getAndroidCurrentPackage} from "./util/android.js"

let inputPackageName = ref('')
let packageNameList = ref([])

const packageNameSelectOpenCallback = function () {
  getAndroidPackageList().then(response => {
        let res = []
        response.data.forEach(function (item) {
          res.push({
            value: item,
            label: item
          })
        });
        console.log(res)
        packageNameList.value = res
      }
  )
}

const pickCurrentPackageCallback = function () {
  getAndroidCurrentPackage().then(response => {
    inputPackageName.value = response.data
  })
}

let deviceSerial = ref('')
let deviceSerialList = ref([
  {
    label:"affsb",
    value:"value1"
  }
])

const CPU = ref(true)
const Mem = ref(true)
const FPS = ref(true)
const jank = ref(true)
const isRecord = ref(false)
const isMultiple = ref(false)

const checked3 = ref(false)

const FPSThreshold = ref(0)
const CPUThreshold = ref(0)
const MemThreshold = ref(0)
const JankThreshold = ref(0)
// const value5 = ref(0)
const changeBtn = function () {
  console.log(FPS)//--->true
}

</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="270px">
          <el-space direction="vertical">

            <el-card class="box-card">
              <!--              todo el-autocomplete-->

              <el-select
                  v-model="deviceSerial"
                  filterable
                  :options="deviceSerialList"

                  placeholder="输入设备serial"
                  clearable
                  style="width: 228px"
              >
                <el-option
                    v-for="item in deviceSerialList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-card>

            <el-card class="box-card">
              <!--              todo el-autocomplete-->
              <el-select
                  v-model="inputPackageName"
                  filterable

                  @focus="packageNameSelectOpenCallback"
                  placeholder="输入包名或者bundle"
                  clearable
                  style="width: 228px"
              >
                <el-option
                    v-for="item in packageNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
              <br>
              <br>
              <div>
                <el-button type="primary" @click="pickCurrentPackageCallback">当前运行应用</el-button>
              </div>
            </el-card>

            <el-card class="box-card">
              <el-checkbox v-model="CPU" label="CPU" class="checkbox-item"/>
              <el-checkbox v-model="Mem" label="内存" class="checkbox-item"/>
              <el-checkbox v-model="FPS" label="FPS" @change="changeBtn" class="checkbox-item"/>
              <el-checkbox v-model="jank" label="jank" class="checkbox-item"/>
            </el-card>

            <el-card class="box-card" :body-style="{ width: '228px' }">
              录像
              <el-switch
                  v-model="isRecord"
                  inline-prompt
              />
              多机协同
              <el-switch
                  v-model="isMultiple"
                  inline-prompt
              />

              <div class="slider-demo-block">
                <span class="demonstration">CPU阈值</span>
                <el-input-number v-model="CPUThreshold"/>
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">内存阈值</span>
                <el-input-number v-model="MemThreshold"/>
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">FPS阈值</span>
                <!--                <el-input-number v-model="FPSThreshold" @change="handleChange" />-->
                <el-input-number v-model="FPSThreshold"/>
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">jank阈值</span>
                <el-input-number v-model="JankThreshold"/>
              </div>
            </el-card>

          </el-space>
        </el-aside>

        <el-main style="padding-top: inherit">
          <el-card class="box-card">
            <div>
              <el-row :gutter="12">
                <el-col :span="8" v-for="o in 15" :key="o" style="padding-bottom: 1%">
                  <el-card shadow="always">
                    <el-checkbox v-model="checked3"/>
                    {{ o }}
                    <br>
                    device:xxxx
                    <br>
                    device ip:xxxxx
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <br>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="20"
                :pager-count="11"
                :total="1000"/>
          </el-card>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style>
.checkbox-item {
  /* 设置复选框之间的间隔 */
  /* 设置复选框之间的下间距 */
  margin: 0 10px 10px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
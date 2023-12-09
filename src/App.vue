<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {
  getAndroidPackageList,
  getAndroidCurrentPackage,
  getSerialList,
  getDefaultSerial,
  startPerfGather
} from "./util/AndroidRequest.js"
import {VideoPlay, SwitchButton} from '@element-plus/icons-vue'
import PerfHome from './view/PerfHome.vue'
// let deviceSerialDefault = ''
//


let deviceSerial = ref('')
let deviceSerialList = ref([])

getDefaultSerial().then(response => {
  deviceSerial.value = response.data
})

const serialListSelectOpenCallback = function () {
  getSerialList().then(response => {
    let res = []
    response.data.forEach(function (item) {
      res.push({
        ProductDevice: item.ProductDevice,
        SerialName: item.SerialName,
        OSVersion: item.OSVersion,
        label : item.SerialName + "(" + item.ProductDevice + ")"
      })
    });
    deviceSerialList.value = res
  })
}

let inputPackageName = ref('')
let packageNameList = ref([])

const packageNameSelectOpenCallback = function (serial) {
  getAndroidPackageList(serial).then(response => {
        let res = []
        response.data.forEach(function (item) {
          res.push({
            value: item,
            label: item
          })
        });
        // console.log(res)
        packageNameList.value = res
      }
  )
}

const pickCurrentPackageCallback = function (serial) {
  getAndroidCurrentPackage(serial).then(response => {
    inputPackageName.value = response.data
  })
}


const CPU = ref(true)
const Mem = ref(true)
const FPS = ref(true)
const jank = ref(true)
const isSysMem = ref(false)
const isSysCPU = ref(false)

const isRecord = ref(false)
const isMultiple = ref(false)
const isScreenCasting = ref(true)

const checked3 = ref(false)

const FPSThreshold = ref(0)
const CPUThreshold = ref(0)
const MemThreshold = ref(0)
const JankThreshold = ref(0)
// const value5 = ref(0)
const changeBtn = function () {
  console.log(FPS)//--->true
}

const isStartPerf = ref(false)
const startBtnCallback = function () {
  isStartPerf.value = !isStartPerf.value
  startPerfGather()
}

</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
<!--        <el-aside v-show="!isStartPerf" width="270px">-->
        <el-aside  width="270px">
          <el-space direction="vertical">

            <el-card class="box-card">
              <!--              todo el-autocomplete-->

              <el-select
                  v-model="deviceSerial"
                  filterable
                  :options="deviceSerialList"

                  @focus="serialListSelectOpenCallback"
                  placeholder="输入设备serial"
                  clearable
                  style="width: 228px"
              >
                <el-option
                    v-for="item in deviceSerialList"
                    :key="item.SerialName"
                    :label="item.label"
                    :value="item.SerialName"
                />
              </el-select>
              <br>
              <br>
              <el-select
                  v-model="inputPackageName"
                  filterable

                  @focus="packageNameSelectOpenCallback(deviceSerial)"
                  placeholder="输入包名或者bundle"
                  clearable
                  style="width: 159px"
              >
                <el-option
                    v-for="item in packageNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />

              </el-select>&nbsp;
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="获取设备前台应用包名"
                  placement="top"
              >
                <el-button type="success" @click="pickCurrentPackageCallback(deviceSerial)" plain>pick</el-button>
              </el-tooltip>
            </el-card>

            <el-card class="box-card">
              <el-checkbox v-model="CPU" label="CPU" class="checkbox-item"/>
              <el-checkbox v-model="Mem" label="内存" class="checkbox-item"/>
              <el-checkbox v-model="FPS" label="FPS" @change="changeBtn" class="checkbox-item"/>
              <el-checkbox v-model="jank" label="jank" class="checkbox-item"/>
              <el-checkbox v-model="isSysCPU" label="sys-cpu" class="checkbox-item"/>
              <el-checkbox v-model="isSysMem" label="sys-mem" class="checkbox-item"/>
            </el-card>

            <el-card class="box-card" :body-style="{ width: '228px' }">

              <el-switch
                  v-model="isScreenCasting"
                  style="--el-switch-on-color: #409eff; --el-switch-off-color: #909399;"
                  inline-prompt
                  active-text="投屏:开"
                  inactive-text="投屏:关"
              />
              &nbsp;
              <!--              <el-switch-->
              <!--                  v-model="isRecord"-->
              <!--                  style="&#45;&#45;el-switch-on-color: #409eff; &#45;&#45;el-switch-off-color: #909399;"-->
              <!--                  inline-prompt-->
              <!--                  active-text="录像:开"-->
              <!--                  inactive-text="录像:关"-->
              <!--              />-->
              <!--              &nbsp;-->
              <el-switch
                  v-model="isMultiple"
                  style="--el-switch-on-color: #409eff; --el-switch-off-color: #909399;"
                  active-text="协同:开"
                  inline-prompt
                  inactive-text="协同:关"
                  @change="serialListSelectOpenCallback"
              />
              &nbsp
              <el-drawer v-model="isMultiple" title="I am the title" :with-header="false">
                <div>
                  <el-row>

<!--                    v-for="item in deviceSerialList"-->
<!--                    :key="item.SerialName"-->
<!--                    :label="item.label"-->
<!--                    :value="item.SerialName"-->

                    <el-col v-for="item in deviceSerialList" :key="item" style="padding-bottom: 1%">
                      <el-card shadow="always">
                        <el-checkbox v-model="checked3"/>
                        <br>
                        serial:{{ item.SerialName }}
                        <br>
                        设备名:{{item.ProductDevice}}
                        <br>
                        系统版本: {{item.OSVersion}}
                      </el-card>
                      <br>
                    </el-col>
                  </el-row>
                </div>
              </el-drawer>

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
            <PerfHome
            :isStartPerf="isStartPerf"
            :deviceSerial = "deviceSerial"
            />

          <!--          <el-icon :size="size" :color="color">-->
          <!--            <Edit />-->
          <!--          </el-icon>-->
          <!--          <el-icon><SwitchButton /></el-icon>-->
          <div class="start-to-home" @click="startBtnCallback">
            <el-icon v-if="!isStartPerf" :size="60" color="#4caf50" class="start-to-home">
              <VideoPlay/>
            </el-icon>
            <el-icon v-if="isStartPerf" :size="60" color="#d80f0f" class="start-to-home">
              <SwitchButton/>
            </el-icon>
          </div>
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

.start-to-home {
  position: fixed;
  bottom: 30px;
  right: 50px;
}

.el-button .iconfont {
  font-size: inherit;
}
</style>
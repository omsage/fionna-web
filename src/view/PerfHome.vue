<template>
  <el-card v-show="props.isStartPerf" class="box-card">
<!--  <el-card  class="box-card">-->
    <div :class="{
      landscapeScreenContainer:isLandscapeScreen ,
      portraitScreenContainer:!isLandscapeScreen
    }">
      <div :class="{
        landscapeScreenTop:isLandscapeScreen,
        portraitScreenLeft:!isLandscapeScreen
      }">
        <ScreenCasting
            :rotationUrl="rotationUrl"
            :h264Url="h264Url"
            :controlUrl="controlUrl"

            :isStart="props.isStartPerf"
            :deviceSerial="props.perfConfig.deviceSerial"
            @watchRotation="watchRotation"
            :nodeID="masterID"
        />
      </div>
      <EchartView
          :isStartPerf="props.isStartPerf"
          :isLandscapeScreen="isLandscapeScreen"
          :perfConfig="props.perfConfig"
      ></EchartView>
    </div>

    <!--    <p>横屏：{{isLandscapeScreen}}</p>-->
    <br>
  </el-card>

</template>

<script setup>
import {ref} from "vue";
import ScreenCasting from "@/components/ScreenCasting.vue";
import EchartView from "@/view/EchartView.vue";
import {h264Url, rotationUrl,controlUrl} from "@/util/AndroidRequest";

let masterID = "masterVideo"

let isLandscapeScreen = ref(false)

// let scrcpySever = new Scrcpy('scrcpy-video', 0, 60, isLandscapeScreen)

const props = defineProps({
  isStartPerf: Boolean,
  perfConfig:Object,
})

const watchRotation = (rotationValue) => {
  console.log("watch rotation",rotationValue)
  isLandscapeScreen.value = rotationValue === 1 || rotationValue === 3;
}

// scrcpyVideo()
</script>

<style scoped>
.portraitScreenContainer {
  display: flex;
}

.portraitScreenLeft {
  flex-grow: 1;
  max-height: 80vh;
  display: flex; /* 设置为 flex 容器 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.landscapeScreenContainer {
  display: flex;
  flex-direction: column;
}

.landscapeScreenTop {
  flex: 1;
}

</style>
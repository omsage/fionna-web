<template>
  <el-card v-show="props.perfConfig.isStartPerf" class="box-card">
<!--  <el-card  class="box-card">-->
    <div :class="{
      landscapeScreenContainer:isLandscapeScreen ,
      portraitScreenContainer:!isLandscapeScreen
    }">
      <div :class="{
        landscapeScreenTop:isLandscapeScreen,
        portraitScreenLeft:!isLandscapeScreen
      }">
        <ScreenCasting v-show="scrcpy_show"
            :rotationUrl="rotationUrl"
            :h264Url="h264Url"
            :controlUrl="controlUrl"

            :isStart="scrcpy_show"
            :uuid="scrcpy_uuid"
            @watchRotation="watchRotation"
            :nodeID="masterID"
        />
      </div>
      <EchartView
          :isLandscapeScreen="isLandscapeScreen"
          :perfConfig="props.perfConfig"
      ></EchartView>
    </div>

    <!--    <p>横屏：{{isLandscapeScreen}}</p>-->
    <br>
  </el-card>

</template>

<script setup>
import {ref, watch} from "vue";
import ScreenCasting from "@/components/ScreenCasting.vue";
import EchartView from "@/view/EchartView.vue";
import {h264Url, rotationUrl,controlUrl} from "@/util/AndroidRequest";

let masterID = "masterVideo"

let isLandscapeScreen = ref(false)

let scrcpy_uuid = ref("")
let scrcpy_show = ref(false)

// let scrcpySever = new Scrcpy('scrcpy-video', 0, 60, isLandscapeScreen)

const props = defineProps({
  showScreenCasting:Boolean,
  perfConfig:Object,
})

watch(() => props.perfConfig.uuid, (uuid) => {
  if (uuid && props.perfConfig.isStartPerf&&props.showScreenCasting) {
    scrcpy_uuid.value = uuid
    scrcpy_show.value = true
  }else {
    scrcpy_uuid.value = undefined
    scrcpy_show.value = false
  }
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
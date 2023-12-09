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
            :deviceSerial="props.deviceSerial"
            @watchRotation="watchRotation"
            :nodeID="masterID"
        />
      </div>
      <div :class="{
        landscapeScreenBottom:isLandscapeScreen,
        portraitScreenRight:!isLandscapeScreen
      }">
        <echartsView :isStart="props.isStartPerf"></echartsView>
        <img src="../assets/CPU.png" :class="{
          portraitScreenRightChild:!isLandscapeScreen,
          landscapeScreenBottomChild:isLandscapeScreen
        }">
        <img src="../assets/Mem.png" :class="{
          portraitScreenRightChild:!isLandscapeScreen,
          landscapeScreenBottomChild:isLandscapeScreen
        }">
        <img src="../assets/FPS.png" :class="{
          portraitScreenRightChild:!isLandscapeScreen,
          landscapeScreenBottomChild:isLandscapeScreen
        }">
        <img src="../assets/Mem.png" :class="{
          portraitScreenRightChild:!isLandscapeScreen,
          landscapeScreenBottomChild:isLandscapeScreen
        }">
      </div>
    </div>

    <!--    <p>横屏：{{isLandscapeScreen}}</p>-->
    <br>
  </el-card>

</template>

<script setup>
import {ref} from "vue";
import ScreenCasting from "@/components/ScreenCasting.vue";
import EchartsView from "@/view/EchartsView.vue"
import {View} from '@element-plus/icons-vue'
import {h264Url, rotationUrl,controlUrl} from "@/util/AndroidRequest";

let masterID = "masterVideo"

let isLandscapeScreen = ref(false)

// let scrcpySever = new Scrcpy('scrcpy-video', 0, 60, isLandscapeScreen)

const props = defineProps({
  isStartPerf: Boolean,
  deviceSerial:String
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

.portraitScreenRight {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}

.portraitScreenRightChild {
  min-width: 300px;
  float: left;
}

.landscapeScreenContainer {
  display: flex;
  flex-direction: column;
}

.landscapeScreenTop {
  flex: 1;
}

.landscapeScreenBottom {
  /*height: calc(100% - 50px);*/
  /*flex: 0 0 calc(25% - 10px); !* 计算每个图片的宽度，减去间距 *!*/
  margin: 30px; /* 图片之间的间距 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap;
}

.landscapeScreenBottomChild {
  min-width: 300px;
  width: 300px;
}
</style>
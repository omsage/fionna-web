<template>
  <el-card v-show="props.isStartPerf" class="box-card">
    <div :class="{
      landscapeScreenContainer:isLandscapeScreen ,
      portraitScreenContainer:!isLandscapeScreen
    }">
      <div :class="{
        landscapeScreenTop:isLandscapeScreen,
        portraitScreenLeft:!isLandscapeScreen
      }">
        <video
            v-show="screenMode == 'Scrcpy'"
            id="scrcpy-video"
            @mousemove="scrcpyMousemove"
            autoplay
            muted
            style="max-width:98%; max-height: 100%"
        />
      </div>
      <div :class="{
        landscapeScreenBottom:isLandscapeScreen,
        portraitScreenRight:!isLandscapeScreen
      }">
        <img src="src/assets/BufferQueue.png" style="width: 20%" :class="{portraitScreenRightChild:!isLandscapeScreen}">
        <img src="src/assets/BufferQueue1.png" style="width: 20%" :class="{portraitScreenRightChild:!isLandscapeScreen}">
      </div>
    </div>

    <!--    <p>横屏：{{isLandscapeScreen}}</p>-->
    <br>
  </el-card>
</template>

<script setup>
import {ref, watch} from "vue";
import Scrcpy from "@/util/Scrcpy";

let isLandscapeScreen = ref(false)

let scrcpySever = new Scrcpy('scrcpy-video', 0, 60, isLandscapeScreen)

const props = defineProps({
  isStartPerf: Boolean
})

let screenMode = ref('Scrcpy')

watch(() => props.isStartPerf, (isStart) => {
  if (isStart) {
    scrcpySever.startServer()
  } else {
    scrcpySever.closeServer()
  }
})

function scrcpyMousemove(event) {
  var box = document.getElementById("scrcpy-video");

  const rect = box.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  console.log("X坐标" + x + "\n" + "Y坐标" + y);

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
  min-width: 200px;
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
  /*margin: 5px; !* 图片之间的间距 *!*/
  display: flex;
  flex-wrap: wrap;
}
</style>
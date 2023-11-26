<template>
  <el-card v-show="props.isStartPerf" class="box-card">
    <div class="video_style">
      <el-row>
        <el-col :span="6">
            <video
                v-show="screenMode == 'Scrcpy'"
                id="scrcpy-video"
                @mousemove="scrcpyMousemove"
                autoplay
                muted
                style="width:98%; object-fit: fill"
            />
        </el-col>
        <el-col :span="8" style="padding-bottom: 1%">
          <el-card>
            <br>
            device:xxxx
            <br>
            device ip:xxxxx
          </el-card>
          <el-card>
            <br>
            device:xxxx
            <br>
            device ip:xxxxx
          </el-card>
          <el-card>
            <br>
            device:xxxx
            <br>
            device ip:xxxxx
          </el-card>
          <el-card>
            <br>
            device:xxxx
            <br>
            device ip:xxxxx
          </el-card>
        </el-col>
      </el-row>

    </div>

    <br>
    <!--                      <el-pagination-->
    <!--                          background-->
    <!--                          layout="prev, pager, next"-->
    <!--                          :page-size="20"-->
    <!--                          :pager-count="11"-->
    <!--                          :total="1000"/>-->
  </el-card>
</template>

<script setup>
import {ref, watch} from "vue";
import Scrcpy from "@/util/Scrcpy";

let scrcpySever = new Scrcpy('scrcpy-video',0,60)

const props = defineProps({
  isStartPerf:Boolean
})

let screenMode = ref('Scrcpy')

watch(() => props.isStartPerf,(isStart) => {
  if (isStart){
    scrcpySever.startServer()
  }else {
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
.video_style {
  min-width: 1020px;
}
</style>
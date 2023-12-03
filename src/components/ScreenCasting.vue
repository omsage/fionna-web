<template>
  <video
      :id="nodeID"
      @mousemove="mousemove"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mouseleave="mouseleave"
      autoplay
      muted
      style="max-width:98%; max-height: 100%"
  />
</template>

<script setup>
import {watch} from "vue";
import Scrcpy from "@/util/Scrcpy";
import {getScrcpySize} from "@/util/AndroidRequest";

let isPress = false;
let scrcpyWidth = 0;
let scrcpyHeight = 0;
let rotationWS = undefined;
let controlWS = undefined;
let rotation = 0

const props = defineProps({
  rotationUrl: String,
  h264Url: String,
  controlUrl: String,
  isStart: Boolean,
  deviceSerial: String,
  nodeID: String,
})

const emit = defineEmits(['watchRotation'])

let scrcpySever = new Scrcpy(
    props.h264Url,
    props.nodeID,
    0,
    60,
    )

watch(() => props.isStart, (isStart) => {
  if (isStart) {
    if (props.deviceSerial !== undefined || props.deviceSerial !== "") {
      scrcpySever.startServer(props.deviceSerial)

      scrcpySever.getScrcpyID().then(scrcpyID => {
        watchRotation(scrcpySever)

        getScrcpySize(scrcpyID).then(response => {
          scrcpyWidth = response.data.width
          scrcpyHeight = response.data.height
          setControl(scrcpyID)
        })
      });
    }
  } else {
    scrcpySever.closeServer()
    controlWS.close()
    rotationWS.close()
  }
})

function emitRotation(rotation) {
  emit('watchRotation', rotation)
}

let firstRotation = true

const watchRotation = (scrcpySever)=> {
  rotationWS = new WebSocket(props.rotationUrl);
  rotationWS.addEventListener("message", (event) => {
    const rotationJson = JSON.parse(event.data);
    if (scrcpySever&&!firstRotation){
      scrcpySever.reset();
    }
    rotation = rotationJson.rotation
    emitRotation(rotationJson.rotation)
    firstRotation = false
  });

  // 监听WebSocket的onopen事件
  rotationWS.onopen = () => {
    console.log('WebSocket连接已打开:rotation');

    // 在连接打开后发送数据
    const message = {
      "scrcpyID": scrcpySever.getScrcpyID()
    }; // 要发送的消息
    rotationWS.send(JSON.stringify(message)); // 发送消息
  };
}

const setControl = (scrcpyID) =>{
  controlWS = new WebSocket(props.controlUrl);
  controlWS.addEventListener("message", (event) => {
    console.log(event)
  });

  // 监听WebSocket的onopen事件
  controlWS.onopen = () => {
    console.log('WebSocket连接已打开:control');
    // 在连接打开后发送数据
    const message = {
      "scrcpyID": scrcpyID
    }; // 要发送的消息
    controlWS.send(JSON.stringify(message)); // 发送消息
  };
}
function mousemove(event) {
  if (isPress) {
    console.log(getDevicePoint(event));
  }
}

const getDevicePoint= (event) => {
  let box = document.getElementById(props.nodeID);

  let x;
  let y;
  let _x;
  let _y;

  const rect = box.getBoundingClientRect();
  console.log(rotation)
  if (rotation===0||rotation===2){
    _x = parseInt(
        (event.clientX - rect.left) * (scrcpyWidth / rect.width)
    );
    _y = parseInt(
        (event.clientY - rect.top) * (scrcpyHeight / rect.height)
    );
    x = rotation===0?_x:scrcpyWidth-_x
    y = rotation===0?_y:scrcpyHeight-_y
  }
  if (x<0){
    x = 0
  }
  if (x>scrcpyWidth){
    x = scrcpyWidth
  }
  if (y<0){
    y = 0
  }
  if (y>scrcpyHeight){
    y = scrcpyHeight
  }
  console.log("X坐标" + x + "\n" + "Y坐标" + y);
  return {
    x,
    y,
  };
}

const mouseup = (event) => {
  if (isPress) {
    isPress = false;
    // websocket.send(
    //     JSON.stringify({
    //       type: 'touch',
    //       detail: 'up\n',
    //     })
    // );
    // inputBox.value.focus();
  }
};

const mousedown = (event) => {
  // todo
  // const {x, y} = getCurLocation();
  isPress = true;
  // websocket.send(
  //     JSON.stringify({
  //       type: 'touch',
  //       detail: `down ${x} ${y}\n`,
  //     })
  // );
}

const mouseleave = () => {
  if (isPress) {
    isPress = false;
    // websocket.send(
    //     JSON.stringify({
    //       type: 'touch',
    //       detail: 'up\n',
    //     })
    // );
  }
};

</script>

<style scoped>

</style>
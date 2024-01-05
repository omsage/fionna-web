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
let scrcpyLandscapeScreen = false;
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
          scrcpyWidth = response.data.data.width
          scrcpyHeight = response.data.data.height
          setControl(scrcpyID)
        })
      });
    }
  } else {
    console.log("close server")
    scrcpySever.closeServer()
    controlWS.close()
    rotationWS.close()
  }
})

function emitRotation(rotation) {
  emit('watchRotation', rotation)
}

const watchRotation = (scrcpySever) => {
  rotationWS = new WebSocket(props.rotationUrl);
  rotationWS.addEventListener("message", (event) => {
    const rotationJson = JSON.parse(event.data).data;
    if (scrcpySever) {
      scrcpySever.reset();
    }
    rotation = rotationJson.rotation
    scrcpyWidth = rotationJson.width
    scrcpyHeight = rotationJson.height
    console.log("????????",rotationJson)

    emitRotation(rotationJson.rotation)
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

const setControl = (scrcpyID) => {
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
    // console.log(getDevicePoint(event));
    const {x, y} = getDevicePoint(event);
    controlWS.send(
        JSON.stringify({
          actionType: 2,
          x: x,
          y: y,
          width: scrcpyWidth,
          height: scrcpyHeight,
        })
    )
  }
}

const getDevicePoint = (event) => {
  let box = document.getElementById(props.nodeID);

  let x;
  let y;
  // let _x;
  // let _y;

  const rect = box.getBoundingClientRect();

  // _x = parseInt(
  //     (event.clientX - rect.left) * (scrcpyWidth / rect.width)
  // );
  // _y = parseInt(
  //     (event.clientY - rect.top) * (scrcpyHeight / rect.height)
  // );

  // if (rotation===0||rotation===2){
  //   x = rotation===0?_x:scrcpyWidth-_x
  //   y = rotation===0?_y:scrcpyHeight-_y
  // }

  x = parseInt(
      (event.clientX - rect.left) * (scrcpyWidth / rect.width)
  );
  y = parseInt(
      (event.clientY - rect.top) * (scrcpyHeight / rect.height)
  );

  // console.log("X1坐标" + x + "\n" + "Y1坐标" + y);
  if (x < 0 || x === -0) {
    x = 0
  }
  if (x > scrcpyWidth) {
    x = scrcpyWidth
  }
  if (y < 0 || y === -0) {
    y = 0
  }
  if (y > scrcpyHeight) {
    y = scrcpyHeight
  }
  // console.log("X2坐标" + x + "\n" + "Y2坐标" + y);
  return {
    x,
    y,
  };
}

const mouseup = (event) => {
  if (isPress) {
    const {x, y} = getDevicePoint(event);
    isPress = false;
    controlWS.send(
        JSON.stringify({
          actionType: 1,
          x: x,
          y: y,
          width: scrcpyWidth,
          height: scrcpyHeight,
        })
    )
  }
};

const mousedown = (event) => {
  // todo
  const {x, y} = getDevicePoint(event);
  isPress = true;
  controlWS.send(
      JSON.stringify({
        actionType: 0,
        x: x,
        y: y,
        width: scrcpyWidth,
        height: scrcpyHeight,
      })
  )
}

const mouseleave = (event) => {
  if (isPress) {
    isPress = false;
    const {x, y} = getDevicePoint(event);
    controlWS.send(
        JSON.stringify({
          actionType: 1,
          x: x,
          y: y,
          width: scrcpyWidth,
          height: scrcpyHeight,
        })
    )
  }
};

</script>

<style scoped>

</style>
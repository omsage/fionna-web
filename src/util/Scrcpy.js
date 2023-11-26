import JMuxer from "jmuxer";
import {baseWs} from "@/util/AndroidRequest";

class Scrcpy {
    constructor(
        nodeID,
        flushingTime,
        FPS
        ) {
        this.rotationUrl =  baseWs + '/android/rotation'
        this.h264Url = baseWs + '/android/h264'
        this.nodeID = nodeID
        this.flushTime = flushingTime
        this.FPS = FPS
    }

    initJmuxer(){
        if (this.jmuxer===undefined){
            this.jmuxer = new JMuxer({
                node: this.nodeID,
                mode: 'video',
                flushingTime: this.flushTime,
                fps: this.FPS,
                debug: false
            });
        }
    }

    initWS(){
        this.videoWS = new WebSocket(this.h264Url);
        this.videoWS.binaryType = 'arraybuffer';

        this.videoWS.addEventListener('message',(event) => {
            if (typeof event.data === 'string'){
                const scrcpyJson = JSON.parse(event.data);
                console.log(scrcpyJson)
                this.watchRotation(scrcpyJson.scrcpyID,this.jmuxer)
            }else {
                if (this.jmuxer){
                    this.jmuxer.feed({
                        video: new Uint8Array(event.data)
                    });
                }
            }
        });
        this.videoWS.addEventListener('error', function(e) {
            console.log('Socket Error');
        });
    }

    watchRotation(scrcpyID,jmuxer){
        this.jmuxer = jmuxer
        this.rotationWS = new WebSocket(this.rotationUrl);
        this.rotationWS.addEventListener("message", (event) => {
            if (this.jmuxer){
                this.jmuxer.reset();
            }
            // const rotationJson = JSON.parse(event.data);
            // let rotation = rotationJson.rotation;
            // console.log("rotation",rotation);
            // if (rotation === 1 || rotation === 3) {

                // this.destroy()
                // this.initJmuxer()
            // }
        });

        // 监听WebSocket的onopen事件
        this.rotationWS.onopen = () => {
            console.log('WebSocket连接已打开');

            // 在连接打开后发送数据
            const message = {
                "scrcpyID": scrcpyID
            }; // 要发送的消息
            this.rotationWS.send(JSON.stringify(message)); // 发送消息
        };
    }

    startServer(){
        this.initJmuxer()
        this.initWS()
    }

    closeServer(){
        if (this.videoWS!==undefined){
            this.videoWS.close()
            this.ws = undefined
        }
        if (this.rotationWS!==undefined){
            this.rotationWS.close()
            this.rotationWS=undefined
        }
    }
    destroy() {
        this.jmuxer && this.jmuxer.destroy();
        // 释放内存
        this.jmuxer = null;
    }
}
export default Scrcpy;
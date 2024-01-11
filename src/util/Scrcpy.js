import JMuxer from "jmuxer";
import {baseWs} from "@/util/AndroidRequest";

class Scrcpy {
    constructor(
        h264Url,
        nodeID,
        flushingTime,
        FPS,
        ) {
        this.baseH264Url = h264Url
        this.h264Url = h264Url
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
                const scrcpyJson = JSON.parse(event.data).data;
                this.scrcpyID = scrcpyJson.scrcpyID
                console.log(scrcpyJson)
            }else {
                if (this.jmuxer){
                    this.jmuxer.feed({
                        video: new Uint8Array(event.data)
                    });
                }
            }
        });
        this.videoWS.addEventListener('error', function(event) {
            console.log(event)
            console.log('Socket Error');
        });
    }
    reset(){
        if (this.jmuxer){
            this.jmuxer.reset()
        }
    }
    async getScrcpyID(){
        while (this.scrcpyID === undefined) {
            // 等待 100 毫秒
            await this.sleep(100);
        }
        return this.scrcpyID
    }

    sleep(ms){
        return new Promise((resolve)=>setTimeout(resolve,ms));
    }

    startServer(uuid,recording){
        this.h264Url = this.baseH264Url + "?uuid=" + uuid+"&record="+recording
        this.initJmuxer()
        this.initWS()
    }

    closeServer(){
        if (this.videoWS!==undefined){
            this.videoWS.close()
            this.ws = undefined
            this.scrcpyID = undefined
        }
    }
    destroy() {
        this.jmuxer && this.jmuxer.destroy();
        // 释放内存
        this.jmuxer = null;
    }
}
export default Scrcpy;
import JMuxer from "jmuxer";

class Scrcpy {
    constructor(
        url,
        nodeID,
        flushingTime,
        FPS
        ) {
        this.url = url
        this.nodeID = nodeID
        this.flushTime = flushingTime
        this.FPS = FPS
    }

    startServer(){
        let jmuxer = new JMuxer({
            node: this.nodeID,
            mode: 'video',
            flushingTime: this.flushTime,
            fps: this.FPS,
            debug: true,
            onError: function(data) {
                if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                    jmuxer.reset();
                }
            }
        });

        this.ws = new WebSocket(this.url);
        this.ws.binaryType = 'arraybuffer';
        this.ws.addEventListener('message',function(event) {
            jmuxer.feed({
                video: new Uint8Array(event.data)
            });
        });

        this.ws.addEventListener('error', function(e) {
            console.log('Socket Error');
        });
    }
    closeServer(){
        if (this.ws!==undefined){
            this.ws.close()
            this.ws = undefined
        }

    }
}

export default Scrcpy;
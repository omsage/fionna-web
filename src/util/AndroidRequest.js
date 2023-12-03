import axios from 'axios';

const baseHost = "127.0.0.1:8080"
export const baseUrl = "http://" + baseHost
export const baseWs = 'ws://' + baseHost

export const rotationUrl =  baseWs + '/android/scrcpy/rotation'
export const h264Url = baseWs + '/android/scrcpy/h264'
export const controlUrl = baseWs + '/android/scrcpy/control'

export async function getAndroidPackageList(serial) {
    console.log(serial)
    let serialParams = encodeURIComponent(serial)
    return axios.get(baseUrl + '/android/package/list?serial='+serialParams)
}

export async function getAndroidCurrentPackage(serial){
    let serialParams = encodeURIComponent(serial)
    return axios.get(baseUrl + '/android/package/current?serial='+serialParams)
}

export async function getSerialList() {
    return axios.get(baseUrl + '/android/serial/list')
}

export async function getDefaultSerial() {
    return axios.get(baseUrl + "/android/serial/default")
}

export async function getScrcpySize(scrcpyID) {
    return axios.get(baseUrl + "/android/scrcpy/size?scrcpyID="+scrcpyID)
}

export async function startPerfGather() {
    return axios.post(baseUrl+"/android/perf/start",{
        cpu:true,
        fps:true,
        mem:true,
        jank:true
    })
}
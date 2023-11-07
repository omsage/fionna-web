import axios from 'axios';

const baseUrl = "http://127.0.0.1:8080"
export async function getAndroidPackageList() {
    try {
        return axios.get(baseUrl + '/android/package/list')
    } catch (e) {
        throw new Error(e);
    }
}

export async function getAndroidCurrentPackage(){
    try {
        return axios.get(baseUrl + '/android/package/current')
    }catch (e) {
        throw new Error(e);
    }
}
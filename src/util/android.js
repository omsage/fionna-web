import axios from 'axios';

const baseUrl = "http://127.0.0.1:8080"
export  function GetAndroidPackageList() {
    try {
        // let res = []
        const response = axios.get(baseUrl + '/android/package/list');
        // response.data.forEach(function(item) {
        //     res.push({
        //         value:item,
        //         label:item
        //     })
        // });
        return response
    } catch (e) {
        throw new Error(e);
    }
}
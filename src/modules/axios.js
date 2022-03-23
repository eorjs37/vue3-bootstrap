import { axios } from '@bundled-es-modules/axios';
import { ref } from 'vue';

export default function(){
    const communicating = ref(false);
    const BASE_URL = 'http://localhost:8000';

    const createURL = (url) =>{
        return url.startsWith('http') ? url : BASE_URL + url;
    }

    const checkResult = (resp, onSuccess , onFailed) =>{
        communicating.value = false;
        if(resp.status === 200 &&  resp.data.rsp === 'ok'){
            if(onSuccess){
                onSuccess(resp.data)
            }
        }
        else{
            if(onFailed){
                onFailed(resp.data);
            }
        }
    }

    const axiosGet = (url, onSuccess = null, onFailed = null) =>{
        communicating.value = false;
        axios.get(createURL(url)).then((resp)=>{
            checkResult(resp, onSuccess, onFailed)
        })
    }

    const axiosPost = (url, data ,onSuccess = null, onFailed = null) =>{
        communicating.value = false;
        axios.post(createURL(url),data).then((resp)=>{
            checkResult(resp, onSuccess, onFailed);
        })
    }

    const axiosPut = (url, data ,onSuccess = null, onFailed = null) =>{
        communicating.value = false;
        axios.put(createURL(url),data).then((resp)=>{
            checkResult(resp, onSuccess, onFailed);
        })
    }

    return{
        communicating,
        axiosGet,
        axiosPost,
        axiosPut
    }
}
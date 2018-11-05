import axios from 'axios'
import Router from 'vue-router'
var router = new Router()

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.headers['content-type'] == 'application/octet-stream;charset=utf-8' ||
    response.headers['content-type'] == 'application/vnd.ms-excel;charset=UTF-8') {
    excelDown(response)
    return {
      data: {
        success: true,
        status: 200
      }
    }
  } else {
    return response
  }
}, function (error) {
  return Promise.reject(error);
})

// 封装axios的post请求
export function fetch(url, params, method) {
  if (!method) {
    method = 'post'
  }
  return new Promise((resolve, reject) => {
    //为了兼容生产环境和开发环境请求地址加入 ‘process.env.API_HOST’
    axios({
        method: method,
        url: process.env.API_HOST + url,
        data: params
      })
      .then(response => {
        switch (response.data.status) {
          case 403:
            router.replace({
              path: '/login'
            })
        }

        //请求错误
        resolve(response.data);

      })
      .catch((error) => {
        reject(error);
      })
  })
}

function excelDown(res) { // excel 下载请求
  var blob = new Blob([res.data]);
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = '列表.xls'; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

export default {
  axios_http(url, params, method) {
    return fetch(url, params, method);
  }
}

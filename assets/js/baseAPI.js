//注意：每次调用$.get() 或 $.post() 或 $.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options)
    options.url = 'http://127.0.0.1:3007'+options.url


    //统一为有权限的接口，设置 headers 请求头
    //headers 就是请求头配置对象
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载 complete 回调函数
    //不论成功还是失败，最终都会调用 complete 回调函数
    options.complete=function(res){
        // console.log('执行了complete 回调；')
        console.log(res)
        //在complete 回调函数中，可以使用 res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
            //1.强制清空 token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
    
})
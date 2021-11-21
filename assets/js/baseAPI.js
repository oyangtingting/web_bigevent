// 每次调用$.ajax/$.get/$.post 时  都会先调用ajaxPrefilter
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  //发起请求之前 统一拼接请求的跟路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  
  //统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token' || '')
    }
  }

  // 全局统一挂载complete 回调函数
  options.complete = function(res) {
    // 在complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
      // 强制清空token
      localStorage.removeItem('token');
      // 强制调到登录页面
      location.href = '/login.html'
    }
  }
})
  
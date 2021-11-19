// 每次调用$.ajax/$.get/$.post 时  都会先调用ajaxPrefilter
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  //发起请求之前 统一拼接请求的跟路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  console.log(options.url);
})
  
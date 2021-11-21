$(function() {
  getUserInfo()

  var layer = layui.layer;
  $('#btnLogout').on('click',function() {
    console.log(11);
    // 提示用户是否退出
    layer.confirm('确定退出登录?',{icon: 3,title: '提示'},function(index) {
      
      // 清空 token
      localStorage.removeItem('token');
      location.href = '/login.html'
      layer.close(index);
    })
  })
})
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头
/*     headers: {
      Authorization: localStorage.getItem('token' || '')
    }, */
    success: function(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      // 渲染用户头像
      renderAvatar(res.data)
    },

  })
  function renderAvatar(user) {
    var name = user.nikname || user.username;
    console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic !== null) {
      console.log(1);
      $('.layui-nav-img').attr('src',user.user_pic).show();
      $('.text-avatar').hide();
    }else {
      // 渲染文本图像
      console.log(2);
      $('.layui-nav-img').hide();
      var first = name[0].toUpperCase();
      $('.text-avatar').html(first).show()
    }
  }
  
}
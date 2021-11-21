var form = layui.form

$(function() {
  form.verify({
    nickname: function(value) {
      if(value.length >6) {
        return '昵称长度必须在1~6个字符之间！'
      }
    }
  })
  initUserInfo()

  $('#btnRest').on('click',function(e) {
    // 阻止表单默认清空
    e.preventDefault();
    initUserInfo()
  })

  $('.layui-form').on('submit',function(e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法 重新渲染用户的头像和信息
        window.parent.getUserInfo();
      }
    })
  })

})
function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      form.val('formUserInfo',res.data)
    }
  })
}
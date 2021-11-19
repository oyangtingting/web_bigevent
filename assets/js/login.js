$(function() {
  /* 点击 去注册账号 连接*/
  $('#link_reg').on('click',function() {
    $('.login').hide();
    $('.regist').show();
  })

  /* 点击 去登录 连接 */
  $('#link_login').on('click',function() {
    $('.login').show();
    $('.regist').hide();
  })
  /* 登录时表单的验证 */
  // 通过form.verify()函数自定义校验规则
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    //[\S]非空格
    repwd: function(value) {
      //value 是确认密码框中的内容  还需要拿到密码框中的内容  然后进行比较
      var pwd = $('.regist [name = password]').val();
      if (value !== pwd) {
        return '两次密码输入不一致！'
      }
    }
  })
  var data = 
  $('#btn_reg').on('click',function(e) {
      e.preventDefault();
      $.post('/api/reguser',{username: $('.regist [name = username]').val(),password: $('.regist [name = password]').val()},function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功！');
        $('#link_login').click();
      })
  })

  $('#form_login').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功！')
        console.log(res.token);
        //将登陆成功得到的 token 字符串 保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
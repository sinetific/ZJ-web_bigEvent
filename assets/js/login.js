$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login_box').hide()
        $('.reg_box').show()
    })
    //点击去登录账号的链接
    $('#link_login').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })

    //用layUI为表单添加验证规则
    //1.从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //2.通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          // 通过形参拿到的是确认密码框中的内容
          // 还需要拿到密码框中的内容
          // 然后进行一次等于的判断
          // 如果判断失败,则return一个提示消息即可
          var pwd = $('.reg_box [name=password]').val()
          if (pwd !== value) {
            return '两次密码不一致！'
          }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        console.log(11)
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                // return console.log(res.message)
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录！');
            $('.login_box').show()
            $('.reg_box').hide()
            $('#form_ref [name=username]').val('')
            $('#form_reg [name=password]').val()
            $('#form_reg [name=repassword]').val()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        console.log(22)
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    console.log('denglushibai')
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href='./index.html'
            }
        })
    })
})
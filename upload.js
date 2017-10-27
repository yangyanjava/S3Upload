//  uploader初始化代码
var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'selectfiles',
    container: document.getElementById('container'),

    url: 'http://oss.aliyuncs.com',

    init: {
        PostInit: function () {
                document.getElementById('ossfile').innerHTML = '';
                document.getElementById('postfiles').onclick = function () {
                    uploader.start();
                    return false;
                };
            },

            FilesAdded: function (up, files) {
                plupload.each(files, function (file) {
                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' + '</div>';
                });
            },

            UploadProgress: function (up, file) {
                //进度条
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";

                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width = 2 * file.percent + 'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            },

            FileUploaded: function (up, file, info) {
                console.log('uploaded')
                console.log(info.status)
                    //默认成功返回２０４
                if (info.status >= 200 || info.status < 200) {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'success';
                } else {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                }
            },

            Error: function (up, err) {
                document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
    }
});

uploader.init();

//获取签名的ajax和自定义参数　S3
$.ajax({
    type: 'get',
    dataType: 'json',
    cache: false,
    contentType: false,
    url: 'getAuthIdentity',
    success: function (obj) {
            //自定义参数
            uploader.setOption({
                multipart_params: {
                    'key': "仓库的key，可自己生成，也可以写死，如写test",
                    'acl': 'public-read',
                    'policy': obj.policy,
                    'Content-Type': '',
                    'Filename': "仓库的key，可自己生成，也可以写死，如写test",
                    ,
                    'AWSAccessKeyId': obj.accessid,

                    'signature': obj.signature,
                },
                url: obj.host
            });
            uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown)
        }
})

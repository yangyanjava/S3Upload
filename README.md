1.页面采用javascript方式上传

2.为了账户的安全性，采用签名方式上传，签名信息用java方式，从后台获取

3.插件使用方式
　http://www.plupload.com/docs/v2/Upload-to-Amazon-S3#generate-policy
 
4.注意：S3仓库已经要配置Cors
 <CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedHeader>*</AllowedHeader>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
    </CORSRule>
  </CORSConfiguration>
  
5.这个demo只是拼接各个位置需要的代码，只拼接构建的时候需要用到的信息，不提供测试

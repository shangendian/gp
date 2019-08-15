<template>
<div>
  <div class="box-img"  v-if="fileType===1">
    <!--<a id="selectfiles" href="javascript:void(0);" class='btn' οnchange='console.log(888)'>选择文件</a>-->
    <!--<a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>-->
    <div class="box el-icon-circle-plus" :id="'selectfiles'+index"  @dblclick.native="alert(index)">
      <div class="img_del el-icon-circle-close" v-if="Url!==''" @click.stop="del(index)"></div>
      <img :src="Url" alt="" v-if="Url!==null">
      <div class="jindu_box" v-if="jintu">
        <el-progress type="circle" :percentage="percentage" color="#67C23A" v-if="percentage!==100"></el-progress>
        <el-progress type="circle" :percentage="percentage" status="success" v-if="percentage===100"></el-progress>
      </div>
    </div>
    <div class="img_name"  v-if="fileType===1">
      {{name}}
    </div>
  </div>
    <div class="file-box" v-if="fileType!==1">
      <div>
        {{Url===''?'请选择文件':pushName}}
       <div v-if="jintu">
        <el-progress :percentage="percentage" color="#67C23A" v-if="percentage!==100"></el-progress>
        <el-progress :percentage="percentage" status="success" v-if="percentage===100"></el-progress>
      </div>
      </div>
      <el-button type="primary" :id="'selectfiles'+index">
        {{Url===''?'选择文件':'重新选择'}}
      </el-button>
      <el-button type="primary" v-if="Url!==''" @click="inspect(Url)">
        检查
      </el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import plupload from "plupload";
// import Crypto from "crypto1";
require("@/../public/crypto1/crypto/crypto.js")
require("@/../public/crypto1/hmac/hmac.js")
require("@/../public/crypto1/sha1/sha1.js")

var Base64 = require('js-base64').Base64;
  // sougegeshe // sougematch
  let accessid = 'LTAIShfs0pmAbRkb'
  let accesskey = 'qlx4Fp0yLI8fbA9zQmVIcPsCCdGBBh'
  let host = 'http://sougematch.oss-cn-beijing.aliyuncs.com'
  let bucket = 'image'
 
  let g_dirname = ''
  let g_object_name = ''
  let g_object_name_type = ''
  var timestamp
  let now = timestamp = Date.parse(new Date()) / 1000
  let pos = ''
  let suffix = ''
 
  var policyText = {
    'expiration': '2020-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    'conditions': [
      ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
    ]
  }
 
  var policyBase64 = Base64.encode(JSON.stringify(policyText))
  let message = policyBase64
  var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {asBytes: true})
  var signature = Crypto.util.bytesToBase64(bytes)
 
  // 选择上传名字是本地文件名字还是随机文件名字
  function check_object_radio () {
    g_object_name_type = 'random_name'
  }
 
  // 默认是上传到根目录
  function get_dirname () {
    g_dirname = 'image/'
  }
 
  // 获得随机的字符串
  function random_string (len) {
    len = len || 32
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }
 
  // 获取文件后缀
  function get_suffix (filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    return suffix
  }
 
  // 获取文件名字
  function calculate_object_name (filename) {
    if (g_object_name_type === 'local_name') {
      g_object_name += filename
    } else if (g_object_name_type === 'random_name') {
      suffix = get_suffix(filename)
      g_object_name = random_string(10) + new Date().getTime() + suffix
    }
    return ''
  }
 
  function get_uploaded_object_name (filename) {
    if (g_object_name_type === 'local_name') {
      var tmp_name = g_object_name
      tmp_name = tmp_name.replace(filename, filename)
      return tmp_name
    } else if (g_object_name_type === 'random_name') {
      return g_object_name
    }
  }
 
  // 设置上传参数
  function set_upload_param (up, filename, ret) {
    // g_object_name = g_dirname
    if (filename !== '') {
      suffix = get_suffix(filename)
      calculate_object_name(filename)
    }
    let new_multipart_params = {
      'Filename': g_dirname + g_object_name,
      'key': g_dirname + g_object_name,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
      'signature': signature
    }
    // console.log(g_object_name)
    up.setOption({
      'url': host,
      'multipart_params': new_multipart_params
    })
    up.start()
  }
  export default {
    name: 'ImgUpload',
    data () {
      return {
        // Url: null,
        percentage: 0,
        jintu: false,
        pushName:''
      }
    },
    props: {
      name:{
        type: String,
        required: true
      },
      fileType:{
        type: Number,
        required: true
      },
      Url:String,
      type: {
        type: Number,
        default:1
      },
      index: {
        type: Number,
        default:0
      },
      add_img: Function,
      del_img:Function
    },
    methods: {
      del (index) {
        // alert(index)
        this.del_img(index)
      },
      inspect (url) {
        window.open(url);
      }
    },
    mounted () {
      var that = this
      var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles'+that.index,
        multi_selection: false,
        // container: document.getElementById('container'),
        flash_swf_url: './../assets/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: './../assets/plupload-2.1.2/js/Moxie.xap',
        url: host,
 
        init: {
          PostInit: function () {},
          QueueChanged: function (up) { // 数组变化是发生
          },
          FileFiltered: function (up, files) {
            var fileSize = (Math.round(files.size * 100 / (1024 * 1024)) / 100).toString() // MB
            if (fileSize > 20) {
              uploader.removeFile(files)
              that.$message.error('文件不能大于20M')
            }
          },
          FilesAdded: function (up, files) {
 
            set_upload_param(uploader, '', false)
          },
 
          BeforeUpload: function (up, file) {
            check_object_radio()
            get_dirname()
            set_upload_param(up, file.name, true)
          },
 
          UploadProgress: function (up, file) {
            // console.log(file.percent, 123123) // 进度条设置
            that.jintu = true
            that.percentage = file.percent
          },
 
          FileUploaded: function (up, file, info) {
           if (info.status === 200) {
              that.$message({
                message: '上传成功',
                type: 'success'
              })
              var Url = host + '/' + g_dirname + get_uploaded_object_name(file.name)
              that.pushName = file.name
              // console.log(Url)
              that.add_img(that.type, Url, that.index,that.fileType)
              that.jintu = false
              that.percentage = 0
            } else {
              that.jintu = false
              that.percentage = 0
            }
          },
 
          Error: function (up, err) {
 
          }
        }
      })
      uploader.init()
    }
  }
</script>
<style type="text/css" scope>
  .uploadImg-main {
    width: 100px;
    height: 130px;
    text-align: center;
    float: left;
    font-size: 14px;
    color: #C0C4CC;
    line-height: 30px;
    margin-right: 54px;
  }
 
  .uploadImg-main .uploadImg {
    width: 100px;
    height: 100px;
    position: relative;
    font-size: 12px;
    line-height: 20px;
    border: 1px dashed #C0C4CC;
    cursor: pointer;
  }
 
  .uploadImg-main .uploadImg i {
    font-size: 40px;
    line-height: 70px
  }
 
  .uploadImg-main .uploadImg input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    filter: alpha(opacity:0);
    opacity: 0;
    cursor: pointer;
  }
 
  .uploadImg-main .uploadImg img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
 
  .box {
    width: 130px;
    height: 130px;
    background: #F9F9F9;
    color: #D8D8D8;
    text-align: center;
    line-height: 130px;
    font-size: 28px;
    border: 1px solid #D8D8D8;
  }
 
  .box img {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .box-img{
    width: 130px;
  }
  .img_name{
    width: 100%;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
  }
  .jindu_box{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .img_del{
    position: absolute;
    width: 20px;
    height: 20px;
    color: #989898;
    top: 5px;
    right: 5px;
    z-index: 111;
    font-size: 20px;
  }
  .file-box{
    width: 100%;
  }
</style>

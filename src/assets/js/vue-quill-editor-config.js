
// 上传参数配置
const uploadConfig = {
  action: 'http://test.guapi.net.cn/api/file/upload', // 必填参数 上传地址
  methods: 'POST', // 必填参数 上传方式
  token: sessionStorage.token, // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'file_tmp_name', // 必填参数 文件的参数名
  size: 5000, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选 可上传的图片格式
  acceptVideo: 'video/mp4' // 视频上传格式
};

import Quill from 'quill';
var Size = Quill.import('attributors/style/size');
Size.whitelist = [
  '0.24rem',
  '0.28rem',
  '0.32rem',
  '0.36rem',
  '0.4rem',
  '0.44rem',
  '0.48rem',
  '0.96rem'
];
Quill.register(Size, true);

// handler重写事件, 任何工具按钮的功能都可以重写。
const handlers = {
  image: function image() {
    var self = this;
    console.log(this.container);
    
    var fileInput = this.container.querySelector('input.ql-image[type=file]');
    
    
    if (fileInput === null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name);
      }

      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept);
      fileInput.setAttribute('multiple','multiple');
      fileInput.classList.add('ql-image');
      // 监听选择文件
      fileInput.addEventListener('change', function(e) {
        // 如果图片限制大小

        

        if (
          uploadConfig.size &&
          fileInput.files[0].size >= uploadConfig.size * 1024
        ) {
          alert('图片过大请压缩上传，使其小于或等于5M。');
          fileInput.value = '';
          return;
        }
        // 创建formData
        
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);
        formData.append('file_obj_path', 'picts');

        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token);
        }
        // 图片上传
        

        var xhr = new XMLHttpRequest();
        
        xhr.open(uploadConfig.methods, uploadConfig.action, true);
        // 上传数据成功，会触发
        xhr.onload = function(e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            
            let length = self.quill.getSelection(true).index;

            self.quill.insertEmbed(length, 'image', res.data.url);
            self.quill.setSelection(length + 1);
          }
          fileInput.value = '';
        };
        // 开始上传数据
        xhr.upload.onloadstart = function(e) {
          fileInput.value = '';
          // console.log('开始上传')
        };
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function(e) {};
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function(e) {
          // console.log('上传结束')
        };
        xhr.send(formData);
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  },
  image2: function image2(){
    var self = this;
    console.log(this.container);
    
    var fileInput = this.container.querySelector('input.ql-image[type=file]');
    
    
    if (fileInput === null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name);
      }

      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept);
      fileInput.setAttribute('multiple','multiple');
      fileInput.classList.add('ql-image');
      // 监听选择文件
      fileInput.addEventListener('change', function(e) {
        // 如果图片限制大小
        if (
          uploadConfig.size &&
          fileInput.files[0].size >= uploadConfig.size * 1024
        ) {
          alert('图片过大请压缩上传，使其小于或等于5M。');
          fileInput.value = '';
          return;
        }
        // 创建formData
        
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);
        formData.append('file_obj_path', 'picts');

        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token);
        }
        // 图片上传
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  },
  
  // 重写视频上传。
  video2: function image() {
    var self = this;

    var fileInput = this.container.querySelector('input.ql-video[type=file]');
    if (fileInput === null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name);
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.acceptVideo);
      fileInput.classList.add('ql-video');
      // 监听选择文件
      fileInput.addEventListener('change', function() {
        if (fileInput.files[0].type !== 'video/mp4') {
          alert('请上传 mp4 格式的视频');
          fileInput.value = '';
          return;
        }
        // 创建formData
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);
        formData.append('file_obj_path', 'videos');
        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token);
        }
        // 图片上传
        var xhr = new XMLHttpRequest();
        xhr.open(uploadConfig.methods, uploadConfig.action, true);
        // 上传数据成功，会触发
        xhr.onload = function(e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);

            let length = self.quill.getSelection(true).index;

            self.quill.insertEmbed(length, 'video', res.data.url);
            self.quill.setSelection(length + 1);
          }
          fileInput.value = '';
        };
        // 开始上传数据
        xhr.upload.onloadstart = function(e) {
          fileInput.value = '';
          // console.log('开始上传')
        };
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function(e) {};
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function(e) {
          // console.log('上传结束')
        };
        xhr.send(formData);
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  },
  clean:function clean(){
      console.log(this.form.content)
      this.form.content='a'
  }

};

// 全部配置
export const editorOptions = {
  placeholder: '',
  theme: 'snow', // 主题
  modules: {
    toolbar: {
      container: '#toolbar-container', // 工具栏选项
      handlers: handlers // 事件重写
    }
  }
};
export const editorOptions1 = {
  placeholder: '',
  theme: 'snow', // 主题
  modules: {
    toolbar: {
      container: '#toolbar-container1', // 工具栏选项
      handlers: handlers // 事件重写
    }
  }
};

 
<template>
  <div>
		<!-- <vue-ueditor-wrap v-model="ueditor.value" :config="ueditor.config"></vue-ueditor-wrap> -->
		<!-- <Uediter
		:value="ueditor.value"
		:config="ueditor.config"
		ref="ue"
		style="z-index:9"
	></Uediter> -->
	<el-form class="demo-form-inline" label-width="150px" ref="feedData">
			<el-form-item label="标题:">
					<el-input v-model="title"></el-input>
				</el-form-item>
				<el-form-item label="作者:">
						<el-input v-model="author"></el-input>
					</el-form-item>
				<el-form-item label="封面:">
					<ImgUpload
						:fileType="1"
						:index="1"
						:name="images.name"
						:Url="images.url"
						class_type='img'
						:del_img="del_img"
						:add_img="add_img">
					</ImgUpload>
				</el-form-item>
				<el-form-item label="内容:">
						<div id="toolbar-container">

								<span class="ql-formats">
									<button class="ql-bold" title="加粗"></button>
									<button class="ql-italic" title="倾斜"></button>
									<button class="ql-underline" title="下划线"></button>
									<button class="ql-strike" title="删除线"></button>
								</span>
					
								<span class="ql-formats">
									<button class="ql-blockquote" title="引用"></button>
								</span>
					
								<span class="ql-formats">
									<button class="ql-header" value="1" title="一级标题"></button>
									<button class="ql-header" value="2" title="二级标题"></button>
								</span>
					
								<span class="ql-formats">
									<button class="ql-list" value="ordered" title="有序排列"></button>
									<button class="ql-list" value="bullet" title="无序排列"></button>
								</span>
					
								<span class="ql-formats">
									<button class="ql-script" value="sub" title="上标"></button>
									<button class="ql-script" value="super" title="下标"></button>
								</span>
					
								<span class="ql-formats">
									<select class="ql-color" title="前景色"></select>
									<select class="ql-background" title="背景色"></select>
								</span>
					
								<span class="ql-formats">
									<button class="ql-align" value="" title="左对齐"></button>
									<button class="ql-align" value="center" title="居中对齐"></button>
									<button class="ql-align" value="right" title="右对齐"></button>
									<button class="ql-align" value="justify" title="两端对齐"></button>
								</span>
					<!-- 
								<span class="ql-formats">
									<button class="ql-clean" title="清除格式" ></button>
									<el-button @click="clean()" type="success" id="clear-all-btn" title="一键清空所有格式">一键清空所有格式</el-button>
								</span> -->
					
								<span class="ql-formats">
									<select class="ql-size" title="字体大小">
										<option value="0.24rem">12px</option>
										<option value="0.28rem">14px</option>
										<option selected value="0.32rem">16px</option>
										<option value="0.36rem">18px</option>
										<option value="0.4rem">20px</option>
										<option value="0.44rem">22px</option>
										<option value="0.48rem">24px</option>
										<option value="0.96rem">48px</option>
									</select>
								</span>
					
								<span class="ql-formats">
									<button class="ql-link" title="插入超链接"></button>
									<button class="ql-image" title="图片"></button>
									<button class="ql-video" title="视频"></button>
									<button class="ql-video2" title="视频"></button>
								</span> 
					
							</div>
						<quill-editor 
						v-model="content" 
						ref="myQuillEditor" 
						:options="editorOptions" 
						@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
						@change="onEditorChange($event)">
					</quill-editor>
					</el-form-item>
					<el-form-item>
							<el-button type="warning" style="width: 200px" @click="submitFeed">提交</el-button>
						</el-form-item>
		</el-form>
	

</div>
</template>
<script>
	import {
  FeedCreate
} from '@/assets/serve/api'
import ImgUpload from "@/components/ImgUpload";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { editorOptions } from '@/assets/js/vue-quill-editor-config.js';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


// import VueUeditorWrap from "vue-ueditor-wrap";
// import Uediter from "@/components/ue.vue";
export default {
  name: "publishArticle",
	components: { 
		// Uediter,
		quillEditor,
		ImgUpload
	 },
  data() {
    return {
			content: ``,
			title:'',
			author:'',
			editorOptions: editorOptions,
			images: {
				url: '',
				name: ''
			}
			// ueditor: {
			// 	value: "",
			// 	config: {
			// 		serverUrl: "http://test.guapi.net.cn/api/ueditor/index",
			// 		UEDITOR_HOME_URL: "/UE/"
			// 	}
			// }
    }
	},
	created() {
	},
	methods: {
		del_img(index) {
			this.images.url = ''
		},
		add_img(type, url, index, fileType) {
		
			this.images.url = url
		},
		clearList() {
			this.content = ''
			this.title = ''
			this.author = ''
		},
		submitFeed(){
			FeedCreate({
				poster:this.images.url,
				content:this.content,
				title:this.title,
				type:'article',
				author: this.author
			}).then(res => {
				if(res.code === 0) {
					this.del_img()
					this.clearList()
					this.$message.success('提交成功！')
				} else {
          this.$message.error(res.msg)
        }
			})
		},
		onEditorReady(editor) { // 准备编辑器
	
		},
		onEditorBlur(){}, // 失去焦点事件
		onEditorFocus(){}, // 获得焦点事件
		onEditorChange(){}, // 内容改变事件


	},
	computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
	}
}
</script>
<style>
.ql-video2 {
  margin: 0 0 0 10px;
  width: 26px !important;
  height: 26px !important;
  background: url('http://img.hecaijing.com/m/play.png') !important;
  background-size: 26px 26px !important;
}
.ql-snow .ql-editor img{
	max-width: 300px;
}
.quill-editor {
  line-height: normal !important;
  height: 500px;
	width: 1000px;
}
.ql-toolbar.ql-snow{
	width: 1000px;
}
</style>
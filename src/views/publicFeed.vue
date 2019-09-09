<template>
	<div class="BannerCreate">
		<el-form class="demo-form-inline" label-width="150px" ref="feedData">
			<el-form-item label="请选择发布类型">
				<el-select v-model="feedData.type" placeholder="请选择">
					<el-option :key="0" label="吐槽" value="dis"></el-option>
					<el-option :key="1" label="视频" value="video"></el-option>
					<el-option :key="2" label="文章" value="article"></el-option>
				</el-select>
      </el-form-item>
			<el-form-item label="标题:">
				<el-input v-model="feedData.title"></el-input>
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
			<!-- <el-form-item label="视频链接:">
				<el-input v-model="feedData.video_url"></el-input>
			</el-form-item> -->
			<el-form-item label="文章链接:"  v-if="feedData.type == 'article'">
				<el-input v-model="feedData.article_url"></el-input>
			</el-form-item>
			<el-form-item label="内容:">
				<el-input type="textarea" v-model="feedData.content"></el-input>
			</el-form-item>
			
			
			<el-form-item v-if="feedData.type == 'video'" label="上传视频:">
				<ImgUpload
					:fileType="1"
					:index="2"
					:name="video.name"
					:Url="video.url"
					class_type='video'
					:del_img="del_video"
					:add_img="add_video">
				</ImgUpload>
			</el-form-item>
			<el-form-item label="图片:"  v-if="feedData.type == 'dis'">
				<!-- <el-input v-model="feedData.picts"></el-input> -->
				<ImgUpload
					:fileType="1"
					:index="3"
					:Url="image_list"
					class_type='imgs'
					:del_img="del_imgs"
					:add_img="add_imgs">
				</ImgUpload>

			</el-form-item>

			
			<el-form-item>
				<el-button type="warning" style="width: 200px" @click="submitFeed">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import ImgUpload from "@/components/ImgUpload";
import {
  FeedCreate
} from '@/assets/serve/api'

export default {
	components: {
		ImgUpload
	},
	data() {
		return {
			images: {
				url: '',
				name: ''
			},
			video: {
				url: '',
				name: ''
			},
			image_list: [],
			feedData: {
				type: 'dis',
				content: '',
				picts:'',
				video_url: '',
				title: '',
				poster: '',
				article_url:'',
			}
		}
	},
	created() {
	},
	methods: {
		del_img(index) {
			this.images.url = ''
		},
		del_imgs(index) {
			this.image_list.splice(index,1)
			this.feedData.picts =JSON.stringify(this.image_list)
		},
		add_imgs(type, url, index, fileType) {
			if (index>=  9) return
			this.image_list.push( url)
			this.feedData.picts =JSON.stringify(this.image_list)
			// this.feedData.poster = url
		},
		del_video(index) {
			this.video.url = ''
		},
		add_img(type, url, index, fileType) {
		
			this.images.url = url
			this.feedData.poster = url
		},
		add_video(type, url, index, fileType) {
		
				this.video.url = url
				this.feedData.video_url = url
			
		},
		clearList() {
			this.feedData.type = 'dis'
			this.feedData.title = ''
			this.feedData.picts = ''
			this.feedData.video_url = ''
			this.feedData.article_url = ''
			this.feedData.content = ''
			this.feedData.poster = ''
		},
		submitFeed() {
			// if(this.feedData.type == '') return this.$message.error('请选择发布类型！')
			// if(this.feedData.title == '') return this.$message.error('请输入标题！')
			// if(this.feedData.picts == '') return this.$message.error('请输入图片链接！')
			// if(this.feedData.video_url == '') return this.$message.error('请输入视频链接！')
			// if(this.feedData.article_url == '') return this.$message.error('请输入文章链接！')
			// if(this.feedData.content == '') return this.$message.error('请输入内容！')
			// if(this.feedData.poster == '') return this.$message.error('请上传图片！')
			let data = JSON.parse(JSON.stringify({...this.feedData}))
			data.picts= JSON.parse(data.picts)
			console.log(data)
			// return
			FeedCreate(data).then(res => {
				if(res.code === 0) {
					this.del_img()
					this.clearList()
					this.$message.success('提交成功！')
				} else {
          this.$message.error(res.msg)
        }
			})
		},
	},
}
</script>

<style lang="less" scoped>
.el-input {
	width: 300px;
}
.el-date-editor.el-input {
	width: 300px;
}
</style>

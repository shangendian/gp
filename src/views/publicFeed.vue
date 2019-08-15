<template>
	<div class="BannerCreate">
		<el-form class="demo-form-inline" label-width="150px" ref="feedData">
			<el-form-item label="请选择发布类型">
				<el-select v-model="feedData.type" placeholder="请选择">
					<el-option :key="0" label="吐槽" value="dis"></el-option>
					<el-option :key="1" label="视频" value="article"></el-option>
					<el-option :key="2" label="文章" value="video"></el-option>
				</el-select>
      </el-form-item>
			<el-form-item label="标题:">
				<el-input v-model="feedData.title"></el-input>
			</el-form-item>
			<el-form-item label="图片链接:">
				<el-input v-model="feedData.picts"></el-input>
			</el-form-item>
			<el-form-item label="视频链接:">
				<el-input v-model="feedData.video_url"></el-input>
			</el-form-item>
			<el-form-item label="文章链接:">
				<el-input v-model="feedData.article_url"></el-input>
			</el-form-item>
			<el-form-item label="内容:">
				<el-input type="textarea" v-model="feedData.content"></el-input>
			</el-form-item>
			<el-form-item label="上传图片:">
				<ImgUpload
					:fileType="1"
					:index="1"
					:name="images.name"
					:Url="images.url"
					:del_img="del_img"
					:add_img="add_img">
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
		add_img(type, url, index, fileType) {
			console.log(url)
			this.images.url = url
			this.feedData.poster = url
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
			if(this.feedData.type == '') return this.$message.error('请选择发布类型！')
			if(this.feedData.title == '') return this.$message.error('请输入标题！')
			if(this.feedData.picts == '') return this.$message.error('请输入图片链接！')
			if(this.feedData.video_url == '') return this.$message.error('请输入视频链接！')
			if(this.feedData.article_url == '') return this.$message.error('请输入文章链接！')
			if(this.feedData.content == '') return this.$message.error('请输入内容！')
			if(this.feedData.poster == '') return this.$message.error('请上传图片！')
			FeedCreate({...this.feedData}).then(res => {
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

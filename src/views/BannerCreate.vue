<template>
	<div class="BannerCreate">
		<el-form class="demo-form-inline" label-width="150px" ref="bannerData">
			<!-- <el-form-item label="编辑标题:">
				<el-input></el-input>
			</el-form-item> -->
			<el-form-item label="开始时间:">
				<el-date-picker 
					v-model="value" 
					type="datetime"
					placeholder="选择时间"
					value-format="yyyy-MM-dd HH:mm:ss" 
					@change="(e)=>{onDateChange(e,'event_start_at')}">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="失效时间:">
				<el-date-picker 
					v-model="value1" 
					type="datetime"
					placeholder="选择时间"
					value-format="yyyy-MM-dd HH:mm:ss" 
					@change="(e)=>{onDateChange(e,'event_end_at')}">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="跳转链接:">
				<el-input v-model="bannerData.detail_url" placeholder="输入链接"></el-input>
			</el-form-item>
			<!-- <el-form-item label="是否展示:">
				<el-radio-group>
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
				</el-radio-group>
			</el-form-item> -->
			<el-form-item label="上传图片:">
				<ImgUpload
					:fileType="1"
					:index="1"
					:name="images.name"
					:Url="images.url"
					:del_img="del_img"
					type="img"
					:add_img="add_img">
				</ImgUpload>
			</el-form-item>

			<el-form-item>
				<el-button type="warning" style="width: 200px" @click="submitBanner">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import ImgUpload from "@/components/ImgUpload";
import {
  BannerCreate
} from '@/assets/serve/api'

export default {
	components: {
		ImgUpload
	},
	data() {
		return {
			value: '',
			value1: '',
			images: {
				url: '',
				name: ''
			},
			bannerData: {
				poster: '',
				detail_url: '',
				event_start_at: '',
				event_end_at: ''
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
			this.bannerData.poster = url
		},
		onDateChange(e, time) {
			if(e) {
				this.bannerData[time] = e
			} else {
				this.bannerData[time] = ''
			}
		},
		submitBanner() {
			if(this.bannerData.event_start_at == '') return this.$message.error('请选择开始时间！')
			if(this.bannerData.event_end_at == '') return this.$message.error('请选择失效时间！')
			if(this.bannerData.detail_url == '') return this.$message.error('请输入跳转链接！')
			if(this.bannerData.poster == '') return this.$message.error('请上传图片！')
			BannerCreate({...this.bannerData}).then(res => {
				if(res.code === 0) {
					this.bannerData.event_start_at = ''
					this.bannerData.event_end_at = ''
					this.bannerData.detail_url = ''
					this.bannerData.poster = ''
					this.value = ''
					this.value1 = ''
					this.del_img()
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

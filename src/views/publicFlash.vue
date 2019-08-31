<template>
	<div class="BannerCreate">
		<el-form class="demo-form-inline" label-width="150px" ref="feedData">
			<el-form-item label="标题:">
				<el-input v-model="feedData.title"></el-input>
			</el-form-item>
			
			<el-form-item label="内容:">
				<el-input type="textarea" v-model="feedData.content"></el-input>
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
  newsflashCreate
} from '@/assets/serve/api'

export default {
	components: {
		ImgUpload
	},
	data() {
		return {
			
			feedData: {
				content: '',
				title: '',
			}
		}
	},
	created() {
	},
	methods: {
		
		clearList() {
			this.feedData.title = ''
			this.feedData.content = ''
		},
		submitFeed() {
		
			newsflashCreate({...this.feedData}).then(res => {
				if(res.code === 0) {
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

<template>
  <div class="bannerList">
			<el-form inline>
				<el-form-item label="是否上架">
					<el-select v-model="qryInput.status" placeholder="请选择">
						<el-option :key="1" label="上架" :value="1"></el-option>
						<el-option :key="0" label="下架" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click='BannerGetList'>查询</el-button>
				</el-form-item>
			</el-form>
		<div class="title">banner配置列表:</div>
		<el-table
			border
			:data="list"
			style="width: 100%">
			<el-table-column
				prop="type"
				label="系统类型"
			>
			</el-table-column>
			<el-table-column
				prop="id"
				label="bannerID"
				>
			</el-table-column>
			<el-table-column
				label="banner图片">
				<template slot-scope="scope">
					<!-- {{scope.row.poster}} -->
					<el-popover placement="right" title="" trigger="click">
						<img :src="scope.row.poster" style="max-height: 500px;max-width: 500px"/>
						<img slot="reference" :src="scope.row.poster" :alt="scope.row.poster" style="max-height: 50px;max-width: 130px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column
				prop="status"
				label="状态"
				>
				<template slot-scope="scope">{{scope.row.status === 1?'上架':'下架'}}</template>
			</el-table-column>
			<el-table-column
				prop="event_start_at"
				label="开始时间"
				>
			</el-table-column>
			<el-table-column
				prop="event_end_at"
				label="失效时间"
				>
			</el-table-column>
			<el-table-column label="操作" width="100px">
				<template slot-scope="scope">
					<el-button
						type="text"
						@click="editBanner(scope.row,1)"
					>修改</el-button>
					<el-button
						type="text"
						@click="editBanner(scope.row,2)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改开屏广告" :visible.sync="editBannerSync" width="50%" @close="handleCloseEditBanner">
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
					<el-input v-model="bannerData.detail_url"></el-input>
				</el-form-item>
				<el-form-item label="是否展示">
					<el-select v-model="bannerData.status" placeholder="请选择" clearable>
						<el-option :key="0" label="下架" :value="0"></el-option>
						<el-option :key="1" label="上架" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序:">
					<el-input v-model.number="bannerData.sort"></el-input>
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
					<el-button type="warning" style="width: 200px" @click="submitBanner">确定</el-button>
				</el-form-item>
			</el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
	BannerGetList,
	BannerUpdate
} from '@/assets/serve/api'
import ImgUpload from "@/components/ImgUpload";
export default {
	components: {
		ImgUpload
	},
	data() {
		return {
			qryInput: {
				page: 1,
				status: 1
			},
			list:[],
			editBannerSync: false,
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
				event_end_at: '',
				status: '',
				sort:''
			}
		}
	},
	created() {
		this.BannerGetList()
	},
	methods: {
		BannerGetList(){
			BannerGetList({...this.qryInput}).then(res=>{
				if(res.code == 0){
					this.list = res.data
				} else {
          this.$message.error(res.msg)
        }
			})
		},
		clearBannerList() {
			this.bannerData.id = ''
			this.bannerData.event_start_at = ''
			this.bannerData.event_end_at = ''
			this.bannerData.detail_url = ''
			this.bannerData.poster = ''
			this.value = ''
			this.value1 = ''
			this.del_img()
		},
		editBanner(row,type) {
			this.bannerData.detail_url = row.url
			this.images.url = row.poster
			this.bannerData.poster = row.poster
			this.value = row.event_start_at
			this.value1 = row.event_end_at
			this.bannerData.event_start_at = row.event_start_at
			this.bannerData.event_end_at = row.event_end_at
			
			this.bannerData.sort = row.sort
			this.bannerData.id = row.id
			if (type ==1) {
				this.editBannerSync = true
				this.bannerData.status = row.status
			}else{
				this.submitBanner()
				this.bannerData.status =3
			}
			
			
		},
		handleCloseEditBanner() {
			this.editBannerSync = false
			this.clearBannerList()
		},
		submitBanner() {
			if(this.bannerData.event_start_at == '') return this.$message.error('请选择开始时间！')
			if(this.bannerData.event_end_at == '') return this.$message.error('请选择失效时间！')
			if(this.bannerData.detail_url == '') return this.$message.error('请输入跳转链接！')
			if(this.bannerData.poster == '') return this.$message.error('请上传图片！')
			BannerUpdate({...this.bannerData}).then(res => {
				if(res.code === 0) {
					this.editBannerSync = false
					this.clearBannerList()
					this.BannerGetList()
				} else {
          this.$message.error(res.msg)
        }
			}) 
		},
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
	},
}
</script>
<style lang="less" scope>
img.photo{
	width: 50px;
	/* height:50px; */
}
.title {
	text-align:center;
	padding: 20px 0;
	color:#E4BE28;
  border-top: 5px solid #f5f5f5;
}
</style>
<style>
.el-button--text {
	color:#E4BE28;
}
</style>

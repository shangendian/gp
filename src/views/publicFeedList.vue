<template>
  <div class="bannerList">
			<el-form inline label-width='120px'>
        <el-form-item label="发布者名字">
          <el-input placeholder v-model="qryInput.user_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder v-model="qryInput.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input placeholder v-model="qryInput.content" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间:">
					<el-date-picker 
						v-model="value" 
						type="datetime" 
						placeholder="选择时间"
						value-format="yyyy-MM-dd HH:mm:ss" 
						@change="(e)=>{onDateChange(e,'start_at')}">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间:">
					<el-date-picker 
						v-model="value1" 
						type="datetime"
						placeholder="选择时间"
						value-format="yyyy-MM-dd HH:mm:ss" 
						@change="(e)=>{onDateChange(e,'end_at')}">
					</el-date-picker>
				</el-form-item>
        <el-form-item label="请选择发布类型">
          <el-select v-model="qryInput.type" placeholder="请选择">
            <el-option :key="0" label="吐槽" value="dis"></el-option>
            <el-option :key="1" label="视频" value="article"></el-option>
            <el-option :key="2" label="文章" value="video"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="审核状态">
					<el-select v-model="qryInput.status" placeholder="请选择">
						<el-option :key="0" label="待审核" :value="0"></el-option>
						<el-option :key="1" label="已通过" :value="1"></el-option>
						<el-option :key="2" label="已拒绝" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click='FeedList'>查询</el-button>
				</el-form-item>
			</el-form>
		<div class="title">开屏广告配置列表:</div>
		<el-table
			border
			:data="list"
			style="width: 100%"
      tooltip-effect="dark">
			<el-table-column
				prop="user_name"
				label="发布者名字"
			>
			</el-table-column>
			<el-table-column
				prop="id"
				label="ID"
				>
			</el-table-column>
			<el-table-column
				label="封面">
				<template slot-scope="scope">
					<!-- {{scope.row.poster}} -->
					<img v-if='scope.row.poster' class="photo" :src="scope.row.poster" />
				</template>
			</el-table-column>
      <el-table-column
				prop="content"
				label="内容"
        show-overflow-tooltip
				>
			</el-table-column>
			<el-table-column
				prop="type"
				label="发布类型"
				>
				<template slot-scope="scope">{{scope.row.type === 'dis'?'吐槽':scope.row.type === 'article'?'文章':'视频'}}</template>
			</el-table-column>
      <el-table-column
				prop="status"
				label="审核状态"
				>
				<template slot-scope="scope">{{scope.row.status == '0'?'待审核':scope.row.status == '1'?'已通过':'已拒绝'}}</template>
			</el-table-column>
			<el-table-column
				prop="created_at"
				label="开始时间"
				>
			</el-table-column>
			<el-table-column
				prop="updated_at"
				label="结束时间"
				>
			</el-table-column>
      <el-table-column
				prop="picts"
				label="图片链接"
        show-overflow-tooltip
				>
			</el-table-column>
      <el-table-column
				prop="video_url"
				label="视频链接"
        show-overflow-tooltip
				>
			</el-table-column>
      <el-table-column
				prop="article_url"
				label="文章链接"
        show-overflow-tooltip
				>
			</el-table-column>
			<el-table-column label="操作" width="100px">
				<template slot-scope="scope">
					<el-button
            v-if='scope.row.status === 0'
						type="primary"
						@click="checkFeed(scope.row)"
					>审核</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="qryInput.page"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="this.totalCount">
		</el-pagination>
		<el-dialog title="审核" :visible.sync="checkFeedSync" width="50%">
      <span>是否通过审核</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkFeedSync = false">取 消</el-button>
        <el-button type="primary" @click="FeedCheck(1)">通 过</el-button>
        <el-button type="danger" @click="FeedCheck(2)">拒 绝</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
	FeedList,
	FeedCheck
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
        user_name: '',
        title: '',
        content: '',
        start_at: '',
        end_at: '',
        type: 'dis',
				status: 0
			},
			list:[],
			checkFeedSync: false,
			value: '',
			value1: '',
			images: {
				url: '',
				name: ''
			},
			totalCount: 0,
      checkData: {
        id: '',
        status: ''
      },
		}
	},
	created() {
		this.FeedList()
	},
	methods: {
		FeedList(){
			FeedList({...this.qryInput}).then(res=>{
				if(res.code == 0){
					this.list = res.data.list
          this.totalCount = res.data.cnt
				} else {
          this.$message.error(res.msg)
        }
			})
		},
		checkFeed(row) {
			this.checkFeedSync = true
      this.checkData.id = row.id
		},
		FeedCheck(status) {
      this.checkData.status = status
			FeedCheck({...this.checkData}).then(res => {
				if(res.code === 0) {
					this.checkFeedSync = false
					this.FeedList()
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
			this.checkData.poster = url
		},
		onDateChange(e, time) {
			if(e) {
				this.qryInput[time] = e
			} else {
				this.qryInput[time] = ''
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.qryInput.page = val
			this.FeedList()
		}
	},
}
</script>
<style lang="less" scope>
.bannerList{
}
img.photo{
	width: 80px;
	height:120px;
}
.title {
	text-align:center;
	padding: 20px 0;
	color:#E4BE28;
  border-top: 5px solid #f5f5f5;
}
</style>
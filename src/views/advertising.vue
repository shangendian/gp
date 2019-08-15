<template>
  <div>
    <el-form inline>
      <el-form-item label="是否上架">
        <el-select v-model="qryInput.status" placeholder="请选择">
          <el-option key="status1" label="上架" :value="1"></el-option>
          <el-option key="status0" label="下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click='AdGetList'>查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click='addAd'>添加广告</el-button>
      </el-form-item>
    </el-form>
    <div class="title">广告列表:</div>
    <el-table
			border
			:data="list"
			style="width: 100%"
      tooltip-effect="dark">
			<el-table-column
				prop="title"
				label="标题"
			>
			</el-table-column>
			<el-table-column
				prop="id"
				label="ID"
				>
			</el-table-column>
			<el-table-column
				label="图片">
				<template slot-scope="scope">
					<!-- {{scope.row.poster}} -->
					<img v-if='scope.row.pict_url' class="photo" :src="scope.row.pict_url" />
				</template>
			</el-table-column>
      <el-table-column
				prop="type"
				label="发布系统类型"
				>
				<template slot-scope="scope">{{scope.row.type === 'android'?'安卓':'苹果'}}</template>
			</el-table-column>
      <el-table-column
				prop="status"
				label="状态"
				>
				<template slot-scope="scope">{{scope.row.status == '0'?'下架':'上架'}}</template>
			</el-table-column>
			<el-table-column
				prop="event_start_at"
				label="上架时间"
				>
			</el-table-column>
			<el-table-column
				prop="event_end_at"
				label="下架时间"
				>
			</el-table-column>
      <el-table-column
				prop="limit"
				label="倒计时"
				>
			</el-table-column>
      <el-table-column
				prop="detail_url"
				label="跳转地址"
        show-overflow-tooltip
				>
			</el-table-column>
			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<el-button
						type="primary"
            @click="editAd(scope.row)"
					>修改</el-button>
          <el-button
						type="primary"
            @click="delAd(scope.row)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
    <el-dialog :title="title" :visible.sync="editAdSync" width="50%" @close="handleClose">
      <el-form class="demo-form-inline" label-width="150px" ref="AdData">
        <el-form-item label="标题:"  v-if="type === 'add'">
          <el-input v-model="AdData.title"></el-input>
        </el-form-item>
        <el-form-item label="展示系统：" v-if="type === 'add'">
          <el-select v-model="AdData.type" placeholder="请选择" clearable>
            <el-option key="android" label="安卓" value="android"></el-option>
            <el-option key="ios" label="苹果" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址:">
          <el-input v-model="AdData.detail_url"></el-input>
        </el-form-item>
        <el-form-item label="上架时间:">
          <el-date-picker 
            v-model="value" 
            type="datetime" 
            placeholder="选择时间"
            value-format="yyyy-MM-dd HH:mm:ss" 
            @change="(e)=>{onDateChange(e,'event_start_at')}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间:">
          <el-date-picker 
            v-model="value1" 
            type="datetime"
            placeholder="选择时间"
            value-format="yyyy-MM-dd HH:mm:ss" 
            @change="(e)=>{onDateChange(e,'event_end_at')}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="倒计时:">
          <el-input v-model="AdData.limit"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" v-if="type === 'edit'">
          <el-select v-model="AdData.status" placeholder="请选择">
            <el-option key="a" label="下架" :value="0"></el-option>
            <el-option key="b" label="上架" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片:" v-if="type === 'add'">
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
          <el-button type="warning" style="width: 200px" @click="submitAd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delAdync" width="50%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delAdync = false">取 消</el-button>
        <el-button type="primary" @click="AdDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
	AdGetList,
	AdCreate,
  AdUpdate,
  AdDel
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
			value: '',
			value1: '',
			images: {
				url: '',
				name: ''
			},
      editAdSync: false,
      delAdync: false,
      title: '',
      type: '',
      AdData: {
        title: '',
        type: '',
        pict_url: '',
        detail_url: '',
        limit: '',
        event_start_at: '',
        event_end_at: '',
        status: ''
      },
      id: ''
    }
  },
  created() {
    this.AdGetList()
  },
  methods: {
    del_img(index) {
			this.images.url = ''
		},
		add_img(type, url, index, fileType) {
			this.images.url = url
			this.AdData.pict_url = url
		},
    AdGetList() {
      AdGetList({...this.qryInput}).then(res => {
        if(res.code === 0) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addAd() {
      this.editAdSync = true
      this.title = '添加广告'
      this.type = 'add'
    },
    editAd(row) {
      this.editAdSync = true
      this.title = '修改广告'
      this.type = 'edit'
      this.AdData.id = row.id
      this.AdData.pict_url = row.pict_url
      this.AdData.detail_url = row.detail_url
      this.AdData.limit = row.limit
      this.AdData.event_start_at = row.event_start_at
      this.AdData.event_end_at = row.event_end_at
      this.AdData.status = row.status
      this.value = row.event_start_at
      this.value1 = row.event_end_at
      this.images.url = row.pict_url
    },
    delAd(row) {
      this.delAdync = true
      this.id = row.id
    },
    submitAd() {
      if(this.type === 'add') {
        if(this.AdData.title === '') return this.$message.error('请输入标题')
        if(this.AdData.type === '') return this.$message.error('请选择系统')
        if(this.AdData.pict_url === '') return this.$message.error('请添加图片')
        if(this.AdData.detail_url === '') return this.$message.error('请输入跳转地址')
        if(this.AdData.event_start_at === '') return this.$message.error('请选择上架时间')
        if(this.AdData.event_end_at === '') return this.$message.error('请选择下架架时间')
        AdCreate({...this.AdData}).then(res => {
          if(res.code === 0) {
            this.$message.success('修改成功')
            this.editAdSync = false
            this.AdGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.type === 'edit') {
        AdUpdate({...this.AdData}).then(res => {
          if(res.code === 0) {
            this.$message.success('修改成功')
            this.editAdSync = false
            this.AdGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    AdDel() {
      AdDel({id: this.id}).then(res => {
        if(res.code === 0) {
          this.$message.success('删除成功')
          this.delAdync = false
          this.AdGetList()
        } else {
            this.$message.error(res.msg)
          }
      })
    },
    handleClose() {},
    onDateChange(e, time) {
			if(e) {
				this.AdData[time] = e
			} else {
				this.qryInput[time] = ''
			}
		},
  },
}
</script>

<style lang="less" scope>
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
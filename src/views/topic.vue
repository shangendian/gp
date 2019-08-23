<template>
  <div>
    <el-form inline>
      <el-row>
        <el-form-item label="是否上架">
          <el-select v-model="qryInput.status" placeholder="请选择">
            <el-option :key="1" label="上架的" :value="1"></el-option>
            <el-option :key="0" label="未上架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='TopicList'>查询</el-button>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="搜索话题：">
          <el-input v-model="search.word" placeholder="请输入话题" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='TopicSearch'>搜索</el-button>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="warning" @click="addTopic">添加话题</el-button>
      </el-form-item>
    </el-form>
    <div class="title">话题列表：</div>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
       >
      </el-table-column>
      <el-table-column
        label="话题图片">
         <template slot-scope="scope">
            <!-- {{scope.row.poster}} -->
            <el-popover placement="right" title="" trigger="click">
              <img :src="scope.row.poster" style="max-height: 500px;max-width: 500px"/>
              <img slot="reference" :src="scope.row.poster" :alt="scope.row.poster" style="max-height: 50px;max-width: 130px">
            </el-popover>
            <!-- <img class="photo" :src="scope.row.poster" /> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="event_start_at"
        label="添加时间"
        >
      </el-table-column>
      <el-table-column
        prop="event_end_at"
        label="结束时间"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        >
        <template slot-scope="scope">{{scope.row.status === 1?'上架':'下架'}}</template>
      </el-table-column>
			<el-table-column label="操作" width="100px">
				<template slot-scope="scope">
					<el-button
						type="text"
						@click="editTopic(scope.row,1)"
          >修改</el-button>
          <el-button
						type="text"
						@click="editTopic(scope.row,2)"
					>删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="editTopicSync" width="50%" @close="handleClose">
      <el-form class="demo-form-inline" label-width="150px" ref="topicData">
        <el-form-item label="标题:">
          <el-input v-model="topicData.title"></el-input>
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
        <el-form-item label="内容:">
          <el-input type="textarea" v-model="topicData.content"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" v-if="type === 'edit'">
          <el-select v-model="topicData.status" placeholder="请选择">
            <el-option :key="0" label="下架" :value="0"></el-option>
            <el-option :key="1" label="上架" :value="1"></el-option>
          </el-select>
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
          <el-button type="warning" style="width: 200px" @click="submitTopic">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
	TopicList,
  TopicUpdate,
  TopicCreate,
  TopicSearch
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
        status : 1
      },
      search: {
        page: 1,
        word: ''
      },
      list:[],
      status: '',
      value: '',
			value1: '',
			images: {
				url: '',
				name: ''
			},
      editTopicSync: false,
      topicData: {
        title: '',
        content: '',
        poster: '',
        event_start_at: '',
        event_end_at: '',
        status: ''
      },
      title: '',
      type: 'add',
    }
  },
  created() {
    this.TopicList()
  },
  methods: {
    TopicList() {
      TopicList({...this.qryInput}).then(res => {
        if(res.code === 0) {
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    TopicSearch() {
      TopicSearch({...this.search}).then(res => {
        if(res.code === 0) {
          this.list = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addTopic() {
      this.type = 'add'
      this.editTopicSync = true
      this.title = '添加话题'
    },
    editTopic(row,type) {
      this.type = 'edit'
      this.title = '修改话题'
      
      this.topicData.id = row.id
      this.topicData.status = row.status
      this.topicData.title = row.title
      this.topicData.content = row.content
      this.topicData.event_start_at = row.event_start_at
      this.value = row.event_start_at
      this.topicData.event_end_at = row.event_end_at
      this.value1 = row.event_end_at
      this.topicData.poster = row.poster
      this.images.url = row.poster
      if (type == 1) {
        this.editTopicSync = true
      }else{
        this.topicData.status = 3
        this.submitTopic()
      }
    },
    submitTopic() {
			if(this.topicData.title == '') return this.$message.error('请输入标题！')
      if(this.topicData.content == '') return this.$message.error('请输入内容！')
      if(this.type === 'add') {
        if(this.topicData.event_start_at == '') return this.$message.error('请选择上架时间！')
			  if(this.topicData.event_end_at == '') return this.$message.error('请选择下架时间！')
        TopicCreate({...this.topicData}).then(res => {
          if(res.code === 0) {
            this.$message.success('成功!')
            this.editTopicSync = false
            this.clearList()
            this.TopicList()
          } else {
          this.$message.error(res.msg)
        }
        })
      } else if (this.type === 'edit'){
        TopicUpdate({...this.topicData}).then(res => {
          if(res.code === 0) {
            this.$message.success('操作成功!')
            this.editTopicSync = false
            this.clearList()
            this.TopicList()
          } else {
          this.$message.error(res.msg)
        }
        })
      }
    },
    del_img(index) {
			this.images.url = ''
		},
		add_img(type, url, index, fileType) {
			console.log(url)
			this.images.url = url
			this.topicData.poster = url
		},
		onDateChange(e, time) {
			if(e) {
				this.topicData[time] = e
			} else {
				this.topicData[time] = ''
			}
    },
    clearList() {
      this.topicData.id = ''
      this.topicData.status = ''
			this.topicData.event_start_at = ''
			this.topicData.event_end_at = ''
      this.topicData.poster = ''
      this.topicData.title = ''
      this.topicData.content = ''
			this.value = ''
			this.value1 = ''
			this.del_img()
    },
    handleClose() {
			this.editTopicSync = false
			this.clearList()
    },
  },
}
</script>

<style lang="less" scoped>
.title {
	text-align:center;
	padding: 20px 0;
	color:#E4BE28;
  border-top: 5px solid #f5f5f5;
}
img.photo{
	width: 80px;
	height:120px;
}
</style>

<style>
.el-button--text {
  color:#E4BE28;
}
</style>

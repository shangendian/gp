<template>
    <div>
      <el-form inline>
        <el-form-item label="系统版本">
          <el-select v-model="qryInput.type" placeholder="请选择">
            <el-option key="1" label="ios" value="ios"></el-option>
            <el-option key="0" label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='VersionGetList'>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='addVersion(1)'>添加版本</el-button>
        </el-form-item>
      </el-form>
      <div class="title">版本列表：</div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        tooltip-effect="dark">
        <el-table-column
          prop="id"
          label="版本id"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="系统类型"
          >
        </el-table-column>
        <el-table-column
          prop="version_name"
          label="版本名称"
          >
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本代码"
          >
        </el-table-column>
        <el-table-column
          prop="updated_at"
          label="更新时间"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否展示"
          >
          <template slot-scope="scope">
            {{scope.row.status == '1'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_force"
          label="是否强制升级"
          >
          <template slot-scope="scope">
            {{scope.row.is_force == '1'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" @click="VersionUpdate(scope.row,2)">修改</el-button>
            <el-button type="primary" @click="VersionUpdate(scope.row,3)">删除</el-button>
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
      <el-dialog title="编辑版本号" :visible.sync="updateVersionSync" width="50%" @close="handleClose">
        <el-form class="demo-form-inline" label-width="80px">
          <el-form-item label="系统版本">
            <el-select v-model="VersionData.type" placeholder="请选择">
              <el-option key="ios" label="ios" value="ios"></el-option>
              <el-option key="android" label="android" value="android"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本名称:">
            <el-input v-model="VersionData.version_name" :disabled="VersionData.type == 'android'"></el-input>
          </el-form-item>
          <el-form-item label="版本代码:">
            <el-input v-model="VersionData.version"></el-input>
          </el-form-item>
          <el-form-item label="更新内容:">
            <el-input type="textarea" v-model="VersionData.content"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-select v-model="VersionData.status" placeholder="请选择">
              <el-option key="q" label="是" :value="1"></el-option>
              <el-option key="f" label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="强制升级">
            <el-select v-model="VersionData.is_force" placeholder="请选择">
              <el-option key="q5" label="是" :value="1"></el-option>
              <el-option key="f5" label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传APK:" v-if="VersionData.type == 'android'">
              <ImgUpload
              :fileType="2"
              :index="1"
              :name="images.name"
              :Url="images.url"
              :del_img="del_img"
              :add_img="add_img">
            </ImgUpload>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" style="width: 200px" @click="submitVersion">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {
    VersionGetList,
    VersionCreate,
    VersionUpdate
  } from '@/assets/serve/api'
  import ImgUpload from "@/components/ImgUpload";
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
        qryInput:{
          type: 'ios',
          page: 1
        },
        VersionData: {
          id: '',
          type: 'ios',
          version: '',
          is_force: 1,
          version_name: '',
          content: '',
          status: 1,
          app_url: ''
        },
        totalCount: 0,
        list: [],
        updateVersionSync: false,
        version: ''
      }
    },
    created() {
      this.VersionGetList()
    },
    methods: {
      del_img(index) {
        this.images.url = ''
      },
      add_img(type, url, index, fileType, fileName) {
        console.log(type, url, index, fileType, fileName)
        this.images.url = url
        this.VersionData.app_url = url
        this.VersionData.version_name = fileName
      },
      VersionGetList() {
        VersionGetList({...this.qryInput}).then(res => {
          if(res.code === 0) {
            this.list = res.data.list
            this.totalCount = res.data.cnt
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      addVersion(type) {
        this.version = type
        this.updateVersionSync = true
      },
      VersionUpdate(row,type) {
        this.version = type
        this.VersionData.id = row.id
        this.VersionData.type = row.type
        this.VersionData.version = row.version
        this.VersionData.is_force = row.is_force
        this.VersionData.version_name = row.version_name
        this.VersionData.content = row.content
        this.VersionData.status = row.status
        this.VersionData.app_url = row.app_url
        if(type == 2) {
          this.updateVersionSync = true
        } else {
          this.VersionData.status = 3
          this.submitVersion()
        }
      },
      submitVersion() {
        if(this.version === 1 || this.version === 2) {
          if(this.VersionData.version_name == '') return this.$message.error('请输入版本名称！')
          if(this.VersionData.version == '') return this.$message.error('请输入版本代码！')
          if(this.VersionData.content == '') return this.$message.error('请输入更新内容！')
          if(this.VersionData.app_url == '' && this.VersionData.type == 'android') return this.$message.error('请选择文件！')
        }
        if(this.version == 1) {
          VersionCreate({...this.VersionData}).then(res => {
            if(res.code === 0) {
              this.updateVersionSync = false
              this.$message.success('添加成功')
              this.VersionGetList()
              this.handleClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          VersionUpdate({...this.VersionData}).then(res => {
            if(res.code === 0) {
              this.updateVersionSync = false
              this.$message.success('操作成功')
              this.VersionGetList()
              this.handleClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
        
      },
      handleClose() {
        this.VersionData.type = 'ios'
        this.VersionData.version = ''
        this.VersionData.is_force = 1
        this.VersionData.version_name = ''
        this.VersionData.content = ''
        this.VersionData.status = 1
        this.VersionData.app_url = ''
        this.del_img()
        this.updateVersionSync = false
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.qryInput.page = val
        this.VersionGetList()
      }
    },
  }
  </script>
  
  <style lang="less" scope>
  .photo {
    width: 50px;
  }
  .title {
    text-align:center;
    padding: 20px 0;
    color:#E4BE28;
    border-top: 5px solid #f5f5f5;
  }
  </style>
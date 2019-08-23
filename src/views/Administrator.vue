<template>
    <div>
      <el-form inline>
        <el-form-item label="管理员状态">
          <el-select v-model="qryInput.status" placeholder="请选择">
            <el-option :key="1" label="通过" :value="1"></el-option>
            <el-option :key="0" label="未通过" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='AuditorGetList'>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='addAuditorSync = true'>创建管理员</el-button>
        </el-form-item>
      </el-form>
      <div class="title">管理员列表：</div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        tooltip-effect="dark">
        <el-table-column
          prop="name"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          label="头像">
          <template slot-scope="scope">
            <!-- {{scope.row.poster}} -->
            <!-- <img v-if='scope.row.poster' class="photo" :src="scope.row.poster" /> -->
            <el-popover placement="right" title="" trigger="click">
              <img :src="scope.row.poster" style="max-height: 500px;max-width: 500px"/>
              <img slot="reference" :src="scope.row.poster" :alt="scope.row.poster" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="用户状态"
          >
          <template slot-scope="scope">
            {{scope.row.status == '1'?'通过':'未通过'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_super"
          label="是否超级管理员"
          >
          <template slot-scope="scope">
            {{scope.row.is_super == '1'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          >
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="UpdatePwd(scope.row)"
            >修改密码</el-button>
            <el-button
              type="primary"
              @click="editAuditor(scope.row)"
            >修改个人信息</el-button>
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
      <el-dialog title="新增管理员" :visible.sync="addAuditorSync" width="50%" @close="handleClose">
        <el-form class="demo-form-inline" label-width="150px" ref="AuditorData">
          <el-form-item label="用户名:">
            <el-input v-model="AuditorData.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="AuditorData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="AuditorData.pwd"></el-input>
          </el-form-item>
          <el-form-item label="是否为超级管理员">
            <el-select v-model="AuditorData.is_super" placeholder="请选择" clearable>
              <el-option :key="0" label="否" :value="0"></el-option>
              <el-option :key="1" label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传头像:">
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
            <el-button type="warning" style="width: 200px" @click="submitAuditor">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改密码" :visible.sync="updatePwdSync" width="50%" @close="handleClose">
        <el-form class="demo-form-inline" label-width="80px" ref="pwdData">
          <el-form-item label="新密码:">
            <el-input v-model="pwdData.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" style="width: 200px" @click="submitPwd">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改个人信息" :visible.sync="updateAuditorSync" width="50%" @close="handleClose">
        <el-form class="demo-form-inline" label-width="150px" ref="updateAuditorData">
          <el-form-item label="用户名:">
            <el-input v-model="updateAuditorData.name"></el-input>
          </el-form-item>
          <el-form-item label="上传头像:">
            <ImgUpload
              :fileType="1"
              :index="1"
              :name="images.name"
              :Url="images.url"
              :del_img="del_imgs"
              :add_img="add_imgs">
            </ImgUpload>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" style="width: 200px" @click="updateAuditor">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {
    AuditorGetList,
    AuditorCreate,
    AuditorChangePwd,
    AuditorUpdate
  } from '@/assets/serve/api'
  import ImgUpload from "@/components/ImgUpload";
  let token = localStorage.getItem('TOKEN')
  export default {
    components: {
      ImgUpload
    },
    data() {
      return {
        qryInput:{
          token: token,
          status: 1,
          page: 1
        },
        AuditorData: {
          token: token,
          name: '',
          poster: '',
          mobile: '',
          pwd: '',
          is_super: 0
        },
        pwdData: {
          token: token,
          auditorid: '',
          pwd: ''
        },
        updateAuditorData: {
          token: token,
          name: '',
          poster: ''
        },
        images: {
          url: '',
          name: ''
        },
        totalCount: 0,
        list: [],
        id: '',
        addAuditorSync: false,
        updatePwdSync: false,
        updateAuditorSync: false
      }
    },
    created() {
      this.AuditorGetList()
    },
    methods: {
      AuditorGetList() {
        AuditorGetList({...this.qryInput}).then(res => {
          if(res.code === 0) {
            this.list = res.data.list
            this.totalCount = res.data.cnt
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      submitAuditor() {
        if(this.AuditorData.name === '') return this.$message.error('用户名不能为空')
        if(this.AuditorData.mobile === '') return this.$message.error('手机号不能为空')
        if(this.AuditorData.pwd === '') return this.$message.error('密码不能为空')
        if(this.AuditorData.is_super === '') return this.$message.error('请选择是否为超级管理员')
        if(this.AuditorData.poster === '') return this.$message.error('头像不能为空')
        AuditorCreate({...this.AuditorData}).then(res => {
          if(res.code === 0) {
            this.addAuditorSync = false
            this.AuditorGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      UpdatePwd(row) {
        this.pwdData.auditorid = row.id
        this.updatePwdSync = true
      },
      submitPwd() {
        if(this.pwdData.pwd === '') return this.$message.error('密码不能为空')
        AuditorChangePwd({...this.pwdData}).then(res => {
          if(res.code === 0) {
            this.updatePwdSync = false
            this.clearList()
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      editAuditor(row) {
        this.updateAuditorSync = true
        this.updateAuditorData.name = row.name
        this.updateAuditorData.poster = row.poster
        this.images.url = row.poster
      },
      updateAuditor() {
        if(this.updateAuditorData.name === '') return this.$message.error('用户名不能为空')
        if(this.updateAuditorData.poster === '') return this.$message.error('头像不能为空')
        AuditorUpdate({...this.updateAuditorData}).then(res => {
          if(res.code === 0) {
            this.updateAuditorSync = false
            this.AuditorGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleClose() {
        this.addAuditorSync = false
        this.updatePwdSync = false
        this.updateAuditorSync = false
        this.clearList()
      },
      clearList() {
        this.AuditorData.name = ''
        this.AuditorData.poster = ''
        this.AuditorData.mobile = ''
        this.AuditorData.pwd = ''
        this.AuditorData.is_super = ''
        this.pwdData.pwd = ''
        this.updateAuditorData.name = ''
        this.updateAuditorData.poster = ''
        this.del_img()
      },
      del_img(index) {
        this.images.url = ''
      },
      add_img(type, url, index, fileType) {
        this.images.url = url
        this.AuditorData.poster = url
      },
      del_imgs(index) {
        this.images.url = ''
      },
      add_imgs(type, url, index, fileType) {
        this.images.url = url
        this.updateAuditorData.poster = url
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.qryInput.page = val
        this.AuditorGetList()
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
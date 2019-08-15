<template>
    <div>
      <el-form inline>
        <el-form-item label="系统版本">
          <el-select v-model="qryInput.type" placeholder="请选择">
            <el-option :key="1" label="ios" value="ios"></el-option>
            <el-option :key="0" label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='VersionGetList'>查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='addVersion'>添加版本</el-button>
        </el-form-item>
      </el-form>
      <div class="title">版本列表：</div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        tooltip-effect="dark">
        <el-table-column
          prop="type"
          label="系统"
          >
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本号"
          >
        </el-table-column>
        <el-table-column
          prop="is_force"
          label="是否强制"
          >
          <template slot-scope="scope">
            {{scope.row.status == '1'?'强制':'非强制'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          >
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
      <el-dialog title="修改举报状态" :visible.sync="updateVersionSync" width="50%" @close="handleClose">
        <el-form class="demo-form-inline" label-width="80px">
          <el-form-item label="系统版本">
            <el-select v-model="VersionData.type" placeholder="请选择">
              <el-option key="ios" label="ios" value="ios"></el-option>
              <el-option key="android" label="android" value="android"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号:">
            <el-input v-model="VersionData.version"></el-input>
          </el-form-item>
          <el-form-item label="是否强制更新">
            <el-select v-model="VersionData.is_force" placeholder="请选择">
              <el-option key="q" label="强制" :value="1"></el-option>
              <el-option key="f" label="非强制" :value="0"></el-option>
            </el-select>
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
    VersionCreate
  } from '@/assets/serve/api'
  export default {
    data() {
      return {
        qryInput:{
          type: 'ios',
          page: 1
        },
        VersionData: {
          type: 'ios',
          version: '',
          is_force: 1
        },
        totalCount: 0,
        list: [],
        updateVersionSync: false,
      }
    },
    created() {
      this.VersionGetList()
    },
    methods: {
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
      addVersion() {
        this.updateVersionSync = true
      },
      submitVersion() {
			  if(this.VersionData.version == '') return this.$message.error('请输入版本号！')
        VersionCreate({...this.VersionData}).then(res => {
          if(res.code === 0) {
            this.updateVersionSync = false
            this.$message.success('添加成功')
            this.VersionGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleClose() {
        this.VersionData.type = ''
        this.VersionData.version = ''
        this.VersionData.is_force = ''
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
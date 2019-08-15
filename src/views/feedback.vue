<template>
    <div>
      <el-form inline>
        <el-form-item label="反馈状态">
          <el-select v-model="qryInput.status" placeholder="请选择">
            <el-option :key="1" label="已处理" :value="1"></el-option>
            <el-option :key="0" label="未处理" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='FeedbackGetList'>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="title">反馈列表：</div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        tooltip-effect="dark">
        <el-table-column
          prop="user_name"
          label="用户名"
          >
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用户ID"
          >
        </el-table-column>
        <el-table-column
          label="头像">
          <template slot-scope="scope">
            <!-- {{scope.row.poster}} -->
            <img v-if='scope.row.user_avatar' class="photo" :src="scope.row.user_avatar" />
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          show-overflow-tooltip
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
          <template slot-scope="scope">
            {{scope.row.status == '1'?'已处理':'未处理'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          >
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editFeedback(scope.row)"
            >修改</el-button>
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
      <el-dialog title="修改反馈状态" :visible.sync="updateFeedbackSync" width="50%">
        <el-form class="demo-form-inline" label-width="80px">
            <el-form-item label="反馈状态">
              <el-select v-model="FeedbackData.status" placeholder="请选择" clearable>
                <el-option :key="1" label="已处理" :value="1"></el-option>
                <el-option :key="0" label="未处理" :value="0"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="warning" style="width: 200px" @click="submitFeedback">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {
    FeedbackGetList,
    FeedbackUpdate
  } from '@/assets/serve/api'
  export default {
    data() {
      return {
        qryInput:{
          status: 1,
          page: 1
        },
        FeedbackData: {
          id: '',
          status: ''
        },
        totalCount: 0,
        list: [],
        updateFeedbackSync: false,
      }
    },
    created() {
      this.FeedbackGetList()
    },
    methods: {
      FeedbackGetList() {
        FeedbackGetList({...this.qryInput}).then(res => {
          if(res.code === 0) {
            this.list = res.data.list
            this.totalCount = res.data.cnt
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      editFeedback(row) {
        this.FeedbackData.id = row.id
        this.FeedbackData.status = row.status
        this.updateFeedbackSync = true
      },
      submitFeedback() {
        FeedbackUpdate({...this.FeedbackData}).then(res => {
          if(res.code === 0) {
            this.updateFeedbackSync = false
            this.$message.success('修改成功')
            this.FeedbackGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.qryInput.page = val
        this.FeedbackGetList()
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
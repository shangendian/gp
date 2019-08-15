<template>
    <div>
      <el-form inline>
        <el-form-item label="举报状态">
          <el-select v-model="qryInput.status" placeholder="请选择">
            <el-option :key="1" label="已处理" :value="1"></el-option>
            <el-option :key="0" label="未处理" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click='ReportGetList'>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="title">举报列表：</div>
      <el-table
        border
        :data="list"
        style="width: 100%"
        tooltip-effect="dark">
        <el-table-column
          prop="obj_type"
          label="发布类型"
        >
        <template slot-scope="scope">{{scope.row.obj_type === 'dis'?'吐槽':scope.row.obj_type === 'article'?'文章':'视频'}}</template>
        </el-table-column>
        <el-table-column
          prop="userid"
          label="用户ID"
          >
        </el-table-column>
        <el-table-column
          prop="obj_id"
          label="文章ID"
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
              @click="editReport(scope.row)"
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
      <el-dialog title="修改举报状态" :visible.sync="updateReportSync" width="50%">
        <el-form class="demo-form-inline" label-width="80px">
            <el-form-item label="举报状态">
              <el-select v-model="ReportData.status" placeholder="请选择" clearable>
                <el-option :key="1" label="已处理" :value="1"></el-option>
                <el-option :key="0" label="未处理" :value="0"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="warning" style="width: 200px" @click="submitReport">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {
    ReportGetList,
    ReportUpdate
  } from '@/assets/serve/api'
  export default {
    data() {
      return {
        qryInput:{
          status: 0,
          page: 1
        },
        ReportData: {
          id: '',
          status: ''
        },
        totalCount: 0,
        list: [],
        updateReportSync: false,
      }
    },
    created() {
      this.ReportGetList()
    },
    methods: {
      ReportGetList() {
        ReportGetList({...this.qryInput}).then(res => {
          if(res.code === 0) {
            this.list = res.data.list
            this.totalCount = res.data.cnt
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      editReport(row) {
        this.ReportData.id = row.id
        this.ReportData.status = row.status
        this.updateReportSync = true
      },
      submitReport() {
        ReportUpdate({...this.ReportData}).then(res => {
          if(res.code === 0) {
            this.updateReportSync = false
            this.$message.success('修改成功')
            this.ReportGetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.qryInput.page = val
        this.ReportGetList()
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
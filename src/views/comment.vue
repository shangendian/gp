<template>
  <div>
    <el-form inline>
      <el-form-item label="评论状态">
        <el-select v-model="qryInput.status" placeholder="请选择">
          <el-option :key="1" label="已通过" :value="1"></el-option>
          <el-option :key="0" label="待审核" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户id:">
        <el-input v-model="qryInput.userid" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容id:">
        <el-input v-model="qryInput.obj_id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click='commentGetList'>搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="title">评论列表：</div>
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
        prop="user_name"
        label="用户昵称"
        >
      </el-table-column>
      <el-table-column
				label="评论图片">
				<template slot-scope="scope">
					<!-- {{scope.row.poster}} -->
          <!-- <img class="photo" v-if="scope.row.user_avatar" :src="scope.row.user_avatar" /> -->
          <el-popover placement="right" title="" trigger="click">
            <img :src="scope.row.user_avatar" style="max-height: 500px;max-width: 500px"/>
            <img slot="reference" :src="scope.row.user_avatar" :alt="scope.row.user_avatar" style="max-height: 50px;max-width: 130px">
          </el-popover>
				</template>
			</el-table-column>
      <el-table-column
        prop="obj_id"
        label="文章ID"
        >
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        >
        <template slot-scope="scope">
          {{scope.row.status == '1'?'通过':'拒绝'}}
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
            @click="editComment(scope.row)"
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
    <el-dialog title="修改评论状态" :visible.sync="updateCommentSync" width="50%">
      <el-form class="demo-form-inline" label-width="80px">
          <el-form-item label="评论状态">
            <el-select v-model="CommentData.status" placeholder="请选择" clearable>
              <el-option :key="1" label="通过" :value="1"></el-option>
              <el-option :key="2" label="拒绝" :value="2"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button type="warning" style="width: 200px" @click="submitComment">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  commentGetList,
  commentUpdate
} from '@/assets/serve/api'
export default {
  data() {
    return {
      qryInput:{
        status:1,
        page: 1,
        obj_id: '',
        userid: ''
      },
      CommentData: {
        id: '',
        status: ''
      },
      totalCount: 0,
      list: [],
      updateCommentSync: false,
    }
  },
  created() {
    this.commentGetList()
  },
  methods: {
    commentGetList() {
      commentGetList({...this.qryInput}).then(res => {
        if(res.code === 0) {
          this.list = res.data.list
          this.totalCount = res.data.cnt
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    editComment(row) {
      this.CommentData.id = row.id
      this.CommentData.status = row.status
      this.updateCommentSync = true
    },
    submitComment() {
      commentUpdate({...this.CommentData}).then(res => {
        if(res.code === 0) {
          this.updateCommentSync = false
          this.$message.success('修改成功')
          this.commentGetList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.qryInput.page = val
      this.commentGetList()
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
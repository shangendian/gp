<template>
  <div class="page">
    <el-form inline>
      <el-form-item label="输入标题:">
				<el-input v-model="qryInput.word"></el-input>
      </el-form-item>
      <el-form-item label="是否展示">
          <el-select v-model="qryInput.status" placeholder="请选择">
            <el-option :key="0" label="下架" :value="0"></el-option>
            <el-option :key="1" label="上架" :value="1"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="NewsflashGetList">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="title">快讯列表：</div>
    <el-table
			border
			:data="list"
			style="width: 100%"
      tooltip-effect="dark">
			<el-table-column
				prop="id"
				label="ID"
				>
      </el-table-column>
      <el-table-column
				prop="from"
				label="来源"
				>
      </el-table-column>
      <el-table-column
				prop="title"
				label="标题"
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
				label="审核状态"
				>
				<template slot-scope="scope">{{scope.row.status == '1'?'上架':'下架'}}</template>
			</el-table-column>
			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<el-button
						type="primary"
						@click="checkFlash(scope.row)"
          >审核</el-button>
          <el-button
						type="primary"
						@click="delFlash(scope.row)"
					>删除</el-button>
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
    <el-dialog title="修改开屏广告" :visible.sync="editFlashSync" width="50%">
      <el-form class="demo-form-inline" label-width="150px" ref="flashData">
        <el-form-item label="标题:">
          <el-input v-model="flashData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input type="textarea" v-model="flashData.content"></el-input>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-select v-model="flashData.status" placeholder="请选择" clearable>
            <el-option :key="0" label="下架" :value="0"></el-option>
            <el-option :key="1" label="上架" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" style="width: 200px" @click="submitFlash">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delFlashSync" width="50%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delFlashSync = false">取 消</el-button>
        <el-button type="primary" @click="NewsflashDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
	NewsflashGetList,
  NewsflashUpdate,
  NewsflashDel
} from '@/assets/serve/api'
export default {
  data() {
    return {
      qryInput: {
        page: 1,
        word: '',
        status: 1
      },
      flashData: {
        id: '',
        title: '',
        content: '',
        status: ''
      },
      totalCount: 0,
      list: [],
      editFlashSync: false,
      delFlashSync: false,
      id:'',
    }
  },
  created() {
    this.NewsflashGetList()
  },
  methods: {
    NewsflashGetList() {
      NewsflashGetList({...this.qryInput}).then(res => {
        if(res.code === 0) {
          this.list = res.data.list
          this.totalCount = res.data.cnt
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    checkFlash(row) {
      this.editFlashSync = true
      this.flashData.id = row.id
      this.flashData.title = row.title
      this.flashData.content = row.content
      this.flashData.status = row.status
    },
    delFlash(row) {
      this.id = row.id
      this.delFlashSync = true
    },
    submitFlash() {
      NewsflashUpdate({...this.flashData}).then(res => {
        if(res.code === 0) {
          console.log(res)
          this.editFlashSync = false
          this.$message.success('修改成功')
          this.NewsflashGetList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    NewsflashDel() {
      NewsflashDel({id: this.id}).then(res => {
        if(res.code === 0) {
          console.log(res)
          this.delFlashSync = false
          this.$message.success('删除成功')
          this.NewsflashGetList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.qryInput.page = val
			this.NewsflashGetList()
		}
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
</style>
<style>
.el-tooltip__popper.is-dark{
  width: 40%;
  padding: 24px;
  background: #f5f5f5;
  color: #333;
  box-shadow: 0,0,6px,#333;
  line-height: 24px;
}
</style>
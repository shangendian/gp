<template>
  <div>
    <el-form inline>
      <el-form-item label="用户状态">
        <el-select v-model="qryInput.status" placeholder="请选择">
          <el-option :key="1" label="通过" :value="1"></el-option>
          <el-option :key="2" label="禁用" :value="2"></el-option>
          <el-option :key="3" label="黑名单" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="昵称:">
				<el-input v-model="qryInput.nick_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
				<el-input v-model="qryInput.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click='UserGetList'>查询</el-button>
      </el-form-item>
    </el-form>
    <div class="title">用户列表：</div>
    <el-table
			border
			:data="list"
			style="width: 100%"
      tooltip-effect="dark">
			<el-table-column
				prop="nick_name"
				label="昵称"
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
					<img v-if='scope.row.avatar' class="photo" :src="scope.row.avatar" />
				</template>
			</el-table-column>
      <el-table-column
				prop="mobile"
				label="手机号"
				>
			</el-table-column>
			<el-table-column
				prop="sex"
				label="性别"
				>
				<template slot-scope="scope">{{scope.row.sex == '2'?'男':'女'}}</template>
			</el-table-column>
      <el-table-column
				prop="status"
				label="用户状态"
				>
				<template slot-scope="scope">{{scope.row.status == '1'?'通过':scope.row.status == '2'?'禁用':'黑名单'}}</template>
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
						@click="updateUser(scope.row)"
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
    <el-dialog title="审核" :visible.sync="checkUserSync" width="50%">
      <span>请确定用户状态</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="UserUpdate(1)">通 过</el-button>
        <el-button type="warning" @click="UserUpdate(2)">禁 用</el-button>
        <el-button type="danger" @click="UserUpdate(3)">拉 黑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
	UserGetList,
	UserUpdate
} from '@/assets/serve/api'
export default {
  data() {
    return {
      qryInput:{
        page: 1,
        status: '',
        nick_name: "",
        mobile: ''
      },
      totalCount: 0,
      list: [],
      id: '',
      checkUserSync: false
    }
  },
  created() {
    this.UserGetList()
  },
  methods: {
    UserGetList() {
      UserGetList({...this.qryInput}).then(res => {
        if(res.code === 0) {
          this.list = res.data.list
          this.totalCount = res.data.cnt
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateUser(row) {
      this.id = row.id
      this.checkUserSync = true
    },
    UserUpdate(status) {
      UserUpdate({id: this.id,status: status}).then(res => {
        if(res.code === 0) {
          this.checkUserSync = false
          this.$message.success('修改成功！')
          this.UserGetList()
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
			this.UserGetList()
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
<template>
  <div>
    <el-container>
      <el-header class="header">
        <div>
          <img src="@/assets/img/logo1@2x.png" alt="">
          <span> 瓜皮后台管理系统</span>
        </div>
        <div>
          <div class="user">
            <span>{{USER_INFO.name}}</span>
            <span style="margin-left: 60px" @click="loginOut">退出</span>
          </div>
        </div>
      </el-header>
      <el-container class='container'>
        <el-aside class="aside" width="200px">
          <el-menu router :default-active="$route.path" class="el-menu-vertical-demo"
            active-text-color="#E4BE28">
            <el-submenu :index="String(index)" v-for="(navItem, index) in navList" :key="index">
              <template slot="title">{{navItem.menuName}} </template>
              <el-menu-item :index="submenu.submenuUrl" v-for="submenu in navItem.submenus"
                :key="submenu.submenuUrl">
								{{submenu.submenuName}} 
								<span class="red" v-if="submenu.submenuUrl == '/comment'">{{comment_cnt}}</span>
								<span class="red" v-if="submenu.submenuUrl == '/report'">{{report_cnt}}</span>
								<span class="red" v-if="submenu.submenuUrl == '/feedback'">{{feed_back_cnt}}</span>
								<span class="red" v-if="submenu.submenuUrl == '/flash'">{{news_flash_cnt}}</span>
								<span class="red" v-if="submenu.submenuUrl == '/publicFeedList'">{{feed_cnt}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="退出登录" :visible.sync="logoutSync" width="50%">
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="请输入密码:">
          <el-input v-model="pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" style="width: 200px" @click="Logout">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {
    Logout,redGetList
  } from '@/assets/serve/api'
  import {
    navList
  } from "@/assets/serve/navServer.js";
  import {
    mapActions,
    mapState,
    mapGetters
  } from 'vuex' //注册 action 和 state
  export default {
    name: "Home",
    data() {
      return {
        navList: navList, // 导航菜单
        pwd: '',
				logoutSync: false,
				
				comment_cnt: 209,
				feed_back_cnt: 4,
				feed_cnt: 2,
				news_flash_cnt: 75,
				report_cnt: 9
      }
    },
    computed: {
      ...mapState(['TOKEN', 'USER_INFO'])
    },
    created() {
      var that = this
      if (!this.USER_INFO.name) {
        this.SET_USER_INFO(JSON.parse(sessionStorage.getItem('USER_INFO')))
			}
			setInterval(()=>{
				that.redGetList()
			},2000)
			
		
    },
    methods: {
      ...mapActions(['SET_TOKEN', 'SET_USER_INFO']),
      loginOut() {
        this.pwd = ''
        this.logoutSync = true
			},
			redGetList(){

				redGetList().then(res=>{
					this.comment_cnt = res.data.comment_cnt
					this.feed_back_cnt = res.data.feed_back_cnt
					this.feed_cnt = res.data.feed_cnt
					this.news_flash_cnt = res.data.news_flash_cnt
					this.report_cnt = res.data.report_cnt
				})
			},
      Logout() {
        if (this.pwd == '') return this.$message.error('请输入密码')
        Logout({
          pwd: this.pwd
        }).then(res => {
          if (res.code === 0) {
            this.logoutSync = false
            this.$message.success('退出登陆成功')
            this.SET_TOKEN('')
            this.SET_USER_INFO({})
            this.$router.push({
              path: '/Login'
            });

          } else {
            this.$message.error(res.msg)
          }
        })
      },
    },
    components: {}
  };

</script>

<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 80px;
    line-height: 60px;
    background-color: #fff;

    div {
      display: flex;
      justify-content: flex-start;
      align-content: center;

      img {
        height: 40px;
        margin-top: 10px;
      }
    }
  }

  .container {
    height: auto;
    background-color: #f5f5f5;
    border: 10px solid #f5f5f5;
		.red{
			display: inline-block;
			background: red;
			border-radius: 50%;
			height: 16px;
			line-height: 16px;
			text-align:center;
			color: #fff;
			min-width:16px;
			margin-left: 12px;
			font-size:12px;
		}
  }

  .aside {
    height: auto;
    margin-right: 10px;
    background-color: #fff;
    border-radius: 10px;
  }

  .main {
    height: auto;
    background-color: #fff;
    border-radius: 10px;
	
  }

  .el-submenu.is-opened:hover,
  .el-submenu:hover,
  .el-submenu.is-opened {
    background-color: gold;
  }

  .el-menu-item:hover,
  .el-menu-item.is-active {
    background-color: khaki;
  }

  .el-menu-item {
    color: #999;
  }

</style>

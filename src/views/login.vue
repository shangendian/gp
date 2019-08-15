<template>
<div class="login">
  <el-input placeholder="请输入内容" v-model="mobile" ></el-input>
  <el-input placeholder="请输入密码" v-model="pwd"></el-input>
  <div class="btn" @click="login">登陆</div>
</div>
</template>

<script>
import {
	Login
} from '@/assets/serve/api'
import {mapActions, mapState,mapGetters} from 'vuex' //注册 action 和 state
export default {
  data() {
    return {
      mobile:'13111111111',
      pwd:'1234'
    }
  },
  computed: {
    ...mapState(['TOKEN','USER_INFO'])
  },
  created() {
  },
  methods: {
    ...mapActions(['SET_TOKEN', 'SET_USER_INFO']),
    login(){
      Login({
        mobile: this.mobile,
        pwd: this.pwd
      }).then(res=>{
        if (res.code == 0) {
          this.SET_TOKEN(res.data.token)
          this.SET_USER_INFO(res.data)
          console.log(res)
          this.$router.push({path :'/Home'});
        }
      })
    }
  },
}
</script>

<style lang="less">
/*  #E4BE28 */
body,html{
  height: 100%;
  overflow: hidden;
}
.login {
  width: 300px;
  margin: 20% auto;
  box-sizing: border-box;
  
  input{
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .btn{
    background-color:  #E4BE28;
    width: 70%;
    color: #fff;
    text-align: center;
    margin:10px auto;
    height: 32px;
    line-height: 32px;
  }

}
</style>

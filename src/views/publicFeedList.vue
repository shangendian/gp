<template>
  <div class="bannerList">
			<el-form inline label-width='120px'>
        <el-form-item label="发布者名字">
          <el-input placeholder v-model="qryInput.user_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容id">
          <el-input placeholder v-model="qryInput.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input placeholder v-model="qryInput.userid" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder v-model="qryInput.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input placeholder v-model="qryInput.content" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间:">
					<el-date-picker 
						v-model="value" 
						type="datetime" 
						placeholder="选择时间"
						value-format="yyyy-MM-dd HH:mm:ss" 
						@change="(e)=>{onDateChange(e,'start_at')}">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间:">
					<el-date-picker 
						v-model="value1" 
						type="datetime"
						placeholder="选择时间"
						value-format="yyyy-MM-dd HH:mm:ss" 
						@change="(e)=>{onDateChange(e,'end_at')}">
					</el-date-picker>
				</el-form-item>
        <el-form-item label="请选择发布类型">
          <el-select v-model="qryInput.type" placeholder="请选择">
            <el-option :key="1" label="视频" value="video"></el-option>
            <el-option :key="2" label="文章" value="article"></el-option>
            <el-option :key="0" label="吐槽" value="dis"></el-option>

          </el-select>
        </el-form-item>
				<el-form-item label="审核状态">
					<el-select v-model="qryInput.status" placeholder="请选择">
						<el-option :key="0" label="待审核" :value="0"></el-option>
						<el-option :key="1" label="已通过" :value="1"></el-option>
						<el-option :key="2" label="已拒绝" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click='FeedList'>查询</el-button>
				</el-form-item>
			</el-form>
		<div class="title">开屏广告配置列表:</div>
		<el-table
			border
			:data="list"
			style="width: 100%"
      tooltip-effect="dark">
			<el-table-column
				prop="user_name"
				label="发布者名字"
			>
			</el-table-column>
			<el-table-column
				prop="id"
				label="ID"
				>
      </el-table-column>
      <el-table-column
				prop="title"
        label="标题"
        show-overflow-tooltip
				>
			</el-table-column>
			<el-table-column
				label="封面">
				<template slot-scope="scope" >
          <el-popover placement="right" title="" trigger="click">
            <img :src="scope.row.poster" style="max-height: 500px;max-width: 500px"/>
            <img slot="reference" :src="scope.row.poster" :alt="scope.row.poster" style="max-height: 50px;max-width: 130px">
          </el-popover>
				</template>
			</el-table-column>
      <el-table-column
				prop="content"
				label="内容"
        show-overflow-tooltip
				>
			</el-table-column>
			<el-table-column
				prop="type"
				label="发布类型"
				>
				<template slot-scope="scope">{{scope.row.type === 'dis'?'吐槽':scope.row.type === 'article'?'文章':'视频'}}</template>
			</el-table-column>
      <el-table-column
				prop="status"
				label="审核状态"
				>
				<template slot-scope="scope">{{scope.row.status == '0'?'待审核':scope.row.status == '1'?'已通过':'已拒绝'}}</template>
			</el-table-column>
			<el-table-column
				prop="created_at"
				label="开始时间"
				>
			</el-table-column>
			<el-table-column
				prop="updated_at"
				label="结束时间"
				>
			</el-table-column>
      <el-table-column
				prop="picts"
				label="图片"
        >
        <template slot-scope="scope" >
          <!-- {{scope.row.picts[0]}} -->
            <el-popover placement="right" title="" trigger="click">
              <div class="a"  style="width: 500px; display: flex;flex-wrap: wrap;">
                  <img  v-for=" item in scope.row.picts" v-gallery="scope.row.picts" :src="item" style="max-height: 120px;max-width: 120px; margin-right: 20px; margin-bottom: 20px;"/>
              </div>
              <img slot="reference" :src="scope.row.picts[0]" :alt="scope.row.picts[0]" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
			</el-table-column>
      <el-table-column
				prop="video_url"
				label="视频"
        >
        <template slot-scope="scope">

            <el-popover placement="right" title="" trigger="click" @show="videoShow(scope.row)">
                <my-video  v-if="video.sources[0].src != '' " class="ok_img_video" :sources="video.sources" :options="video.options"  style="height: 200px;max-width: 500px"></my-video>
                <div v-else>暂无视频</div>
                <span  slot="reference">查看</span>
              </el-popover>
          	<!-- <player :key="scope.$index" :videoUrl="scope.row.video_url" :width="210" :height="140"></player> -->
            <!-- <my-video  class="ok_img_video"  :sources="video.sources" :options="video.options"></my-video> -->
          </template>
			</el-table-column>
      <el-table-column
				prop="article_url"
				label="文章链接"
        >
      </el-table-column>
      <el-table-column
				prop="favorite_number"
        label="收藏数"
        width="80"
        >
        <template  slot-scope="scope">
          <el-input size="mini" v-model="scope.row.favorite_number" @blur='FeedUpdate(scope.row)' ></el-input>
        </template>
      </el-table-column>
      <el-table-column
				prop="like_number"
        label="点赞数"
        width="80"
        >
        <template  slot-scope="scope">
          <el-input size="mini" v-model="scope.row.like_number" @blur='FeedUpdate(scope.row)' ></el-input>
        </template>
			</el-table-column>
			<el-table-column label="操作" width="180px">
				<template slot-scope="scope">
					<el-button v-if='scope.row.status === 0' type="primary" @click="checkFeed(scope.row)">审核</el-button>
					<el-button  type="primary" @click="FeedCheck(3,scope.row)">删除</el-button>
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
		<el-dialog title="审核" :visible.sync="checkFeedSync" width="50%">
      <span>是否通过审核</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkFeedSync = false">取 消</el-button>
        <el-button type="primary" @click="FeedCheck(1)">通 过</el-button>
        <el-button type="danger" @click="FeedCheck(2)">拒 绝</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import myVideo from 'vue-video'
import player from "@/components/Player";
import { FeedList, FeedCheck, FeedUpdate } from "@/assets/serve/api";
import ImgUpload from "@/components/ImgUpload";
export default {
  components: {
    ImgUpload,
    player,
    myVideo
  },
  data() {
    return {
      qryInput: {
        page: 1,
        user_name: "",
        title: "",
        content: "",
        start_at: "",
        end_at: "",
        type: "video",
        status: 0,
        id:'',
        userid:''
      },
      number: {
        id: '',
        favorite_number: 0,
        like_number: 0
      },
      list: [],
      checkFeedSync: false,
      value: "",
      value1: "",
      images: {
        url: "",
        name: ""
      },
      totalCount: 0,
      checkData: {
        id: "",
        status: ""
      },
      photo_list: [],
      video: {
          sources: [{
            src: null,
          }],
          options: {
            autoplay: true,
            volume: 0.6,
          }
        }
    };
  },
  created() {
    this.FeedList();
  },
  methods: {
    videoShow(data){
      console.log(data.video_url)
      this.video.sources[0].src = data.video_url
    },
    FeedUpdate(row) {
      this.number.id = row.id
      this.number.like_number = row.like_number
      this.number.favorite_number = row.favorite_number
      FeedUpdate({...this.number}).then(res => {
        if (res.code == 0) {
          console.log(res)
          this.FeedList()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    FeedList() {
      FeedList({ ...this.qryInput }).then(res => {
        if (res.code == 0) {
          console.log(res.data.list )
          res.data.list.forEach((item,index)=>{
            if ( item.picts == '') {
              item.picts =[]
            }else{
              console.log(item.picts)
              item.picts = JSON.parse( item.picts)

            }
          })
          this.list = res.data.list;
          this.totalCount = res.data.cnt;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    checkFeed(row) {
      this.checkFeedSync = true;
      this.checkData.id = row.id;
    },
    FeedCheck(status,data) {
		if (data) {
			this.checkData.id = data.id;
		}
      this.checkData.status = status;
      FeedCheck({ ...this.checkData }).then(res => {
        if (res.code === 0) {
          this.checkFeedSync = false;
          this.FeedList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    del_img(index) {
      this.images.url = "";
    },
    add_img(type, url, index, fileType) {
      console.log(url);
      this.images.url = url;
      this.checkData.poster = url;
    },
    onDateChange(e, time) {
      if (e) {
        this.qryInput[time] = e;
      } else {
        this.qryInput[time] = "";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.qryInput.page = val;
      this.FeedList();
    }
  }
};
</script>
<style lang="less" scope>
.bannerList {
}
img.photo {
  width: 80px;
  height: 120px;
}
.title {
  text-align: center;
  padding: 20px 0;
  color: #e4be28;
  border-top: 5px solid #f5f5f5;
}
.ok_img_video{
  width: 300px;
  height: 200px;
}
</style>
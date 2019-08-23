import {get ,post} from './server.js'
// export const details =function(data) {
//     return get('/feed/detail',data)
//  }
// 添加banner
export const BannerCreate = p => post('/admin/banner/create', p);
// 更新banner
export const BannerUpdate = p => post('/admin/banner/update', p);
// 获取列表
export const BannerGetList = p => post('/admin/banner/getList', p);
// 获取话题列表
export const TopicList = p => post('/admin/topic/getList', p);
// 添加topic
export const TopicCreate = p => post('/admin/topic/create', p);
// 更新topic
export const TopicUpdate = p => post('/admin/topic/update', p);
export const TopicSearch = p => post('/admin/topic/search', p);
// 发布吐槽、视频、文章
export const FeedCreate = p => post('/admin/feed/create', p);
// 列表
export const FeedList = p => post('/admin/feed/getList', p);
// 审核
export const FeedCheck = p => post('/admin/feed/check', p);
export const FeedUpdate = p => post('/admin/feed/update', p);
// 快讯列表
export const NewsflashGetList = p => post('/admin/newsflash/getList', p);
// 修改
export const NewsflashUpdate = p => post('/admin/newsflash/update', p);
// 删除
export const NewsflashDel = p => post('/admin/newsflash/del', p);
// 广告列表
export const AdGetList = p => post('/admin/ad/getList', p);
// 新增
export const AdCreate = p => post('/admin/ad/create', p);
// 修改
export const AdUpdate = p => post('/admin/ad/update', p);
// 删除
export const AdDel = p => post('/admin/ad/del', p);
// 用户列表
export const UserGetList = p => post('/admin/user/getList', p);
// 更新状态
export const UserUpdate = p => post('/admin/user/update', p);
// 登陆
export const Login = p => post('/admin/auditor/login', p);
// 退出
export const Logout = p => post('/admin/auditor/logout', p);
// 创建用户
export const AuditorCreate = p => post('/admin/auditor/create', p);
// 管理员列表
export const AuditorGetList = p => post('/admin/auditor/getList', p);
// 修改密码
export const AuditorChangePwd = p => post('/admin/auditor/changePwd', p);
// 修改个人信息
export const AuditorUpdate = p => post('/admin/auditor/update', p);

export const ReportGetList = p => post('/admin/report/getList', p);
export const ReportUpdate = p => post('/admin/report/update', p);
export const FeedbackGetList = p => post('/admin/feedback/getList', p);
export const FeedbackUpdate = p => post('/admin/feedback/update', p);
export const VersionGetList = p => post('/admin/version/getList', p);
export const VersionCreate = p => post('/admin/version/create', p);
export const VersionUpdate = p => post('/admin/version/update', p);
export const commentGetList = p => post('/admin/comment/getList', p);
export const commentUpdate = p => post('/admin/comment/update', p);
export const redGetList = p => post('/admin/data/getList', p);

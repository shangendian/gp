export const navList = [{
menuName: "发布管理",
  submenus: [{
		submenuName: "banner添加",
		submenuUrl: "/BannerCreate",
		component: r => require.ensure([], () => r(require('@/views/BannerCreate')), 'BannerCreate'),
  }, {
    submenuName: "banner列表",
    submenuUrl: "/bannerList",
    component: r => require.ensure([], () => r(require('@/views/bannerList')), 'bannerList'),
  }, {
    submenuName: "话题",
    submenuUrl: "/topic",
    component: r => require.ensure([], () => r(require('@/views/topic')), 'topic'),
  }, {
    submenuName: "吐槽/视频/文章",
    submenuUrl: "/publicFeed",
    component: r => require.ensure([], () => r(require('@/views/publicFeed')), 'publicFeed'),
  }, {
    submenuName: "发布文章",
    submenuUrl: "/publicArticle",
    component: r => require.ensure([], () => r(require('@/views/publicArticle')), 'publicArticle'),
  }, {
    submenuName: "发布快讯",
    submenuUrl: "/publicFlash",
    component: r => require.ensure([], () => r(require('@/views/publicFlash')), 'publicFlash'),
  }, {
    submenuName: "开屏广告",
    submenuUrl: "/advertising",
    component: r => require.ensure([], () => r(require('@/views/advertising')), 'advertising'),
  }]
},{
menuName: "审核管理",
  submenus: [{
    submenuName: "快讯审核",
    submenuUrl: "/flash",
    component: r => require.ensure([], () => r(require('@/views/flash')), 'flash'),
  },{
    submenuName: "内容审核",
    submenuUrl: "/publicFeedList",
    component: r => require.ensure([], () => r(require('@/views/publicFeedList')), 'publicFeedList'),
  },{
    submenuName: "评论审核",
    submenuUrl: "/comment",
    component: r => require.ensure([], () => r(require('@/views/comment')), 'comment'),
  }],
},{
menuName: "用户管理",
  submenus: [{
    submenuName: "用户列表",
    submenuUrl: "/userList",
    component: r => require.ensure([], () => r(require('@/views/userList')), 'userList'),
  },{
    submenuName: "创建管理员",
    submenuUrl: "/Administrator",
    component: r => require.ensure([], () => r(require('@/views/Administrator')), 'Administrator'),
  }],
},{
  menuName: "系统管理",
    submenus: [{
      submenuName: "举报",
      submenuUrl: "/report",
      component: r => require.ensure([], () => r(require('@/views/report')), 'report'),
    },{
      submenuName: "意见反馈",
      submenuUrl: "/feedback",
      component: r => require.ensure([], () => r(require('@/views/feedback')), 'feedback'),
    },{
      submenuName: "版本",
      submenuUrl: "/versions",
      component: r => require.ensure([], () => r(require('@/views/versions')), 'versions'),
    }],
  }]

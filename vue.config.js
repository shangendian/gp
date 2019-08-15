// const dateFtt = function (fmt, date) {
// 	var o = {
// 		"M+": date.getMonth() + 1,                 //月份
// 		"d+": date.getDate(),                    //日
// 		"h+": date.getHours(),                   //小时
// 		"m+": date.getMinutes(),                 //分
// 		"s+": date.getSeconds(),                 //秒
// 		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
// 		"S": date.getMilliseconds()             //毫秒
// 	};
// 	if (/(y+)/.test(fmt))
// 		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
// 	for (var k in o)
// 		if (new RegExp("(" + k + ")").test(fmt))
// 			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
// 	return fmt;
// }
// const ONLINE = process.env.NODE_ENV == "production";
// module.exports = {
// 	// productionSourceMap: false,
// 	// assetsDir: "www" + (ONLINE ? dateFtt("yyyy-MM-dd_hh-mm-ss", new Date()) : ""),
// 	// configureWebpack: config => {
// 	// 	return {
// 	// 		externals: {
// 	// 			'vue': 'Vue',
// 	// 			'vuex': 'Vuex',
// 	// 			'vue-router': 'VueRouter',
// 	// 			'element-ui': 'Element',
// 	// 			'lodash': '_',
// 	// 			'axios': 'axios',
// 	// 		}
// 	// 	};
// 	// },
// 	devServer: {
// 		open: true,
// 		host: '192.168.0.113',
// 		port: 8080,
// 		https: false,
// 		hotOnly: false,
// 		proxy: {
// 			'/admin': {
// 				target: 'http://test.guapi.net.cn/', //对应自己的接口
// 				changeOrigin: true,
// 				ws: false,
// 			}
// 		}
// 	}
// };

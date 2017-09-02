export default {
	// 格式：来源方 模块 功能 类型
	// 例子： 500  10  002   04

	// 来源方
	// 500+ node

	// 模块
	// 00 认证
	// 99 杂项

	// 00 认证
	// 001 token
	5000000000: "加载首页失败",
	// 002 来源header
	5000000200: "来源header未检测到Authorization",
	5000000201: "来源header中Authorization格式有误",
	5000000202: "无效sso_token",
	// 003 注册
	5000000300: "检验手机号是否被注册失败",
	5000000301: "密码加密失败",
	5000000302: "该手机号已经被注册",
	// 004 登录
	5000000400: "查询用户信息失败",
	5000000401: "该手机号尚未被注册",
	5000000402: "比对密码失败",
	5000000403: "手机号或密码输入错误",
	// 005 重置密码
	5000000500: "该手机号尚未被注册",
	5000000501: "查询用户数据时系统异常",
	5000000502: "密码加密失败",
	5000000503: "修改密码失败",
	// 006 用户行为检验
	5000000600: "缺少查询字段(sso_token)",
	5000000601: "无效sso_token",
	5000000602: "查询用户文章访问记录失败",
	// 007 用户行为匹配
	5000000700: "缺少查询字段(article_id)",
	5000000701: "查询用户浏览记录失败",
	5000000702: "用户并未有过此行为",

	// 98 校验
	5009800000: "缺少查询字段",
	5009800001: "查询字段的值不能为空",
	5009800002: "手机号格式应该是11位数字",
	5009800003: "密码长度应该在6至16位内",
	5009800004: "正确邮箱格式为：用户名@域名.后缀，如10000@qq.com",
	5009800005: "验证码应该是6位数字",
	5009800006: "网址url格式有误",

	// 99 杂项
	5009900000: "页面内数据加载失败",
	5009900001: "页面加载失败",
	5009999999: "未知错误"
};
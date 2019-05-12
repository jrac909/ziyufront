import router from './router'
import store from './store'
/* npm install --save nprogress */
import NProgress from 'nprogress' /* 轻量级 web 进度条 */
import 'nprogress/nprogress.css' /* 进度条样式 */
import { Message } from 'element-ui' /* 引入消息框 */
import { getToken, getUserPhoto } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) /* 禁用进度环，就是圆圈的进度表示 */

const whiteList = ['/login', '/', '/registerSuccess', '/zixun', '/question'] /* 不重定向到登录界面的白名单 */

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		if (to.path === '/login'){
			next({ path: '/' })
			NProgress.done()
		} else {
			next();
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1){
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
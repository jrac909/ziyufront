import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Donghua from '@/components/Donghua'
import Buju from '@/components/Buju'
import Form from '@/components/Form'
import Com from '@/components/Com'
import QuestionDetail from '@/components/question/QuestionDetail'
import MyQuestion from '@/components/question/MyQuestion'
import ReplyNews from '@/components/user/ReplyNews'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/Login')},
  
  { path: '/', component: () => import('@/views/home')  },
  { path: '/registerSuccess', component: () => import('@/views/login/RegisterSuccess') },
  {
    path: '/zixun',
    component: () => import('@/views/expert/Zixun')
  },
  {
    path: '/question',
    component: () => import('@/views/question/Question')
  },
  {
    path: '/tiwen',
    component: () => import('@/views/question/Tiwen')
  },
  {
    path: '/essay',
    component: () => import('@/views/essay/Essay')
  },
  {
    path: '/user',
    component: () => import('@/views/user/User')
  },
  {
    path: '/upinfo',
    component: () => import('@/views/user/Upinfo')
  },
  {
    path: '/upphoto',
    component: () => import('@/views/user/Upphoto')
  },
  {
    path: '/uppwd',
    component: () => import('@/views/user/Uppwd')
  },
  {
    path: '/newslist',
    component: () => import('@/views/user/NewsList')
  },
  {
    path: '/follow',
    component: () => import('@/views/user/Follow')
  },
  {
    path: '/sixin',
    component: () => import('@/views/sixin/Sixin')
  },
  {
    path: '/essayDetail',
    component: () => import('@/views/essay/EssayDetail')
  },
  {
    path: '/notice',
    component: () => import('@/views/notice/Notice')
  },
  {
    path: '/noticeDetail',
    component: () => import('@/views/notice/NoticeDetail')
  },
  {
    path: '/expert',
    component: () => import('@/views/expert/Expert')
  },
  {
    path: '/questionDetail',
    component: () => import('@/views/question/questionDetail')
  },
  {
    path: '/myQuestion',
    component: () => import('@/views/question/MyQuestion')
  }
]

export default new Router({
  routes: constantRouterMap/*[
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/donghua',
      name: 'Donghua',
      component: Donghua
    },
    {
      path: '/buju',
      name: 'Buju',
      component: Buju
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/com',
      name: 'Com',
      component: Com
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/flogin',
      name: 'FLogin',
      component: FLogin
    },
    {
      path: '/registerSuccess',
      name: 'RegisterSuccess',
      component: RegisterSuccess
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/noticeDetail',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/essay',
      name: 'Essay',
      component: Essay
    },
    {
      path: '/essayDetail',
      name: 'EssayDetail',
      component: EssayDetail
    },
    {
      path: '/questionDetail',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/tiwen',
      name: 'Tiwen',
      component: Tiwen
    },
    {
      path: '/myQuestion',
      name: 'MyQuestion',
      component: MyQuestion
    },
    {
      path: '/zixun',
      name: 'Zixun',
      component: Zixun
    },
    {
      path: '/yuyue',
      name: 'Yuyue',
      component: Yuyue
    },
    {
      path: '/replyNews',
      name: 'ReplyNews',
      component: ReplyNews
    }
  ]*/
})
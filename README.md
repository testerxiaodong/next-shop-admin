# 项目介绍

该项目 clone 自[https://github.com/laribright/gadgets-shop-admin](https://github.com/laribright/gadgets-shop-admin)项目，并进行了一些 bug 修复和 添加了 e2e 测试，主要是为了学习 nextjs 和 playwright。

`next-shop-admin` 是基于 `Next.js15` 开发的后台管理系统，主要功能包括看板、订单管理、商品管理、分类管理

项目移动端链接：[https://github.com/testerxiaodong/rn-shop](https://github.com/testerxiaodong/rn-shop)

## 如何运行该项目

### 注册 supabase 账号，新建项目(项目名随意)，将`.env.example`文件重命名为`.env`，填入自己的 supabase 项目信息(project->settings)

### 新增 supabase 数据表、触发器函数、存储过程、边缘函数

supabase 不支持 pg_dump 导出数据表，推荐看视频博主的教程，教程有分段信息介绍：[https://www.youtube.com/watch?v=26opRFPU0a8](https://www.youtube.com/watch?v=26opRFPU0a8)

## 体验

[跳转登陆页](https://next-shop-admin-coral.vercel.app/auth)
用户名：<test@test.com>
密码：123456

## 项目概览

### 首页

![首页](/public/assets/images/首页.png)

### 登陆页面

![登陆页面](/public/assets/images/登陆页面.png)

### 看板页面

![看板](/public/assets/images/看板页面.png)

### 订单管理

![订单管理](/public/assets/images/订单页面.png)

### 商品管理

![商品管理](/public/assets/images/产品页面.png)

### 分类管理

![分类管理](/public/assets/images/分类页面.png)

## 端到端测试

![端到端测试](/public/assets/images/端到端测试.png)

## 鸣谢

感谢大佬的视频教程：@[codewithlari](https://www.youtube.com/@codewithlari)
视频教程地址：[https://www.youtube.com/watch?v=26opRFPU0a8&t=16137s](https://www.youtube.com/watch?v=26opRFPU0a8&t=16137s)

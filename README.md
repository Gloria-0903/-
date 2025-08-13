# 小兔鲜儿 Typescript版

## 📖 项目简介

该项目 是一个基于 Vue 3 + TypeScript + Element Plus + Pinia + Vite 构建的现代化电商平台前端项目。该项目采用最新的前端技术栈，实现了完整的电商购物流程，包括商品展示、购物车管理、订单处理、支付集成和用户管理等核心功能。

## ✨ 主要特性

- 🛍️ **完整的电商功能**：商品浏览、分类筛选、购物车、订单管理、支付流程
- 🎨 **现代化UI设计**：基于 Element Plus 组件库，响应式设计，用户体验优秀
- 🔐 **用户认证系统**：登录注册、用户信息管理、订单历史
- 📱 **响应式布局**：支持多种设备尺寸，移动端友好
- 🚀 **性能优化**：图片懒加载、组件懒加载、状态持久化
- 🛠️ **开发体验**：TypeScript 支持、热重载、自动导入

## 🛠️ 技术栈

### 核心技术
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Vue Router 4** - 官方路由管理器
- **Pinia** - Vue 状态管理库

### UI 组件库
- **Element Plus** - 基于 Vue 3 的组件库
- **SCSS** - CSS 预处理器

### 开发工具
- **unplugin-auto-import** - 自动导入 API
- **unplugin-vue-components** - 自动导入组件
- **pinia-plugin-persistedstate** - 状态持久化插件

### 工具库
- **Axios** - HTTP 客户端
- **Day.js** - 轻量级日期处理库
- **@vueuse/core** - Vue 组合式 API 工具集

## 📁 项目结构

```
vue-shop2.0/
├── public/                 # 静态资源
├── src/
│   ├── apis/              # API 接口层
│   │   ├── cart.ts        # 购物车相关接口
│   │   ├── category.ts    # 分类相关接口
│   │   ├── checkout.ts    # 结算相关接口
│   │   ├── detail.ts      # 商品详情接口
│   │   ├── home.ts        # 首页相关接口
│   │   ├── layout.ts      # 布局相关接口
│   │   ├── order.ts       # 订单相关接口
│   │   ├── pay.ts         # 支付相关接口
│   │   └── user.ts        # 用户相关接口
│   ├── assets/            # 静态资源
│   │   └── images/        # 图片资源
│   ├── components/        # 公共组件
│   │   ├── ImageView/     # 图片查看组件
│   │   └── XtxSku/        # SKU 选择组件
│   ├── composables/       # 组合式函数
│   │   └── useCountDown.ts # 倒计时钩子
│   ├── directives/        # 自定义指令
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   │   ├── cartStore.ts   # 购物车状态
│   │   ├── category.ts    # 分类状态
│   │   └── user.ts        # 用户状态
│   ├── styles/            # 样式文件
│   │   ├── common.scss    # 通用样式
│   │   ├── element/       # Element Plus 样式
│   │   └── var.scss       # 变量定义
│   ├── utils/             # 工具函数
│   │   └── http.ts        # HTTP 请求封装
│   ├── views/             # 页面组件
│   │   ├── CartList/      # 购物车页面
│   │   ├── Category/      # 分类页面
│   │   ├── Checkout/      # 结算页面
│   │   ├── Detail/        # 商品详情页
│   │   ├── Home/          # 首页
│   │   ├── Layout/        # 布局组件
│   │   ├── Login/         # 登录页面
│   │   ├── Member/        # 会员中心
│   │   ├── Pay/           # 支付页面
│   │   └── SubCategory/   # 子分类页面
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境运行

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev
```

开发服务器将在 `http://localhost:5173` 启动

### 生产环境构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📱 功能模块

### 🏠 首页 (Home)
- 轮播图展示
- 商品分类导航
- 热门商品推荐
- 新品上架展示

### 🛍️ 商品分类 (Category)
- 商品分类浏览
- 筛选条件设置
- 商品列表展示
- 分页功能

### 📋 商品详情 (Detail)
- 商品信息展示
- SKU 选择
- 商品图片查看
- 相关商品推荐

### 🛒 购物车 (CartList)
- 商品数量管理
- 价格计算
- 商品删除
- 结算跳转

### 💳 结算中心 (Checkout)
- 收货地址管理
- 商品清单确认
- 支付方式选择
- 订单提交

### 💰 支付系统 (Pay)
- 多种支付方式
- 支付状态处理
- 支付回调处理

### 👤 用户中心 (Member)
- 用户信息管理
- 订单历史查看
- 个人资料设置

### 🔐 用户认证 (Login)
- 用户登录
- 用户注册
- 密码重置

## 🔧 开发指南

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 规范
- 使用 SCSS 进行样式开发
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case

### 状态管理

项目使用 Pinia 进行状态管理，主要包含：

- **用户状态** (`user.ts`): 用户信息、登录状态
- **购物车状态** (`cartStore.ts`): 购物车商品、数量、价格
- **分类状态** (`category.ts`): 商品分类信息

### API 接口

所有 API 接口统一管理在 `src/apis/` 目录下，使用 Axios 进行 HTTP 请求，支持：

- 请求拦截器
- 响应拦截器
- 错误处理
- 请求超时设置

### 路由配置

使用 Vue Router 4 进行路由管理，支持：

- 嵌套路由
- 路由守卫
- 动态路由
- 路由懒加载

## 🎨 样式系统

### SCSS 变量

项目定义了统一的 SCSS 变量，包括：

- 颜色变量
- 字体变量
- 间距变量
- 断点变量

### Element Plus 主题

集成 Element Plus 组件库，支持：

- 自定义主题色
- 组件样式覆盖
- 响应式设计

## 📦 构建与部署

### 开发环境

- 热重载
- 源码映射
- 错误提示
- 自动导入

### 生产环境

- 代码压缩
- 资源优化
- 类型检查
- 静态资源处理

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request


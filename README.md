# Python数据分析30天学习网站

## 项目概述

这是一个Python数据分析学习网站，提供30天完整的学习路线，包含在线代码运行、AI代码讲解和打卡功能。

## 核心功能

### 1. 学习路线 (/learn)
- 完整的30天学习计划（5周）
- 每周包含7天的学习内容
- 每一天包含：核心内容、练习任务、代码示例

### 2. 在线代码运行 (/playground)
- 支持Python代码在线执行
- 支持numpy、pandas、matplotlib等常用库
- 提供多个示例代码模板
- AI代码讲解功能（SSE流式输出）

### 3. 每日学习页面 (/learn/[day])
- 学习内容展示
- 在线代码编辑器
- 一键运行代码
- AI代码讲解
- 每日打卡功能

### 4. 打卡功能 (/checkin)
- 30天打卡日历
- 每周学习进度
- 统计数据展示
- 支持Supabase持久化或内存存储（开发环境）

## API 接口

### /api/execute
POST - Python代码执行
```json
{
  "code": "print('Hello')",
  "timeout": 15
}
```

### /api/explain
POST - AI代码讲解（SSE流式输出）
```json
{
  "code": "import numpy as np"
}
```

### /api/checkin
GET - 获取打卡记录
POST - 创建打卡记录

## 数据库

使用Supabase PostgreSQL，备用内存存储：
- `checkins` 表：打卡记录
- `user_progress` 表：用户学习进度

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **LLM**: coze-coding-dev-sdk (豆包模型)
- **Database**: Supabase PostgreSQL

---

# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

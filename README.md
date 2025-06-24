# 智能错题本 - AI驱动的个性化学习助手

一个基于 Next.js 14 和 TypeScript 构建的现代化错题管理系统，集成 AI 技术提供智能批改、个性化讲解和学习计划功能。

## ✨ 核心功能

### 🤖 AI 智能批改
- **拍照识别**: 支持手机拍照上传作业，AI自动识别题目内容
- **智能判断**: 基于 OpenAI GPT 模型判断答案正确性
- **错误分析**: 自动分析错误类型和原因
- **个性化讲解**: 根据学生年级提供适合的解题思路

### 📚 错题管理
- **自动收录**: 错误题目自动加入错题本
- **分类整理**: 按学科、知识点、难度等维度分类
- **学习追踪**: 记录复习次数和掌握状态
- **智能筛选**: 多维度筛选和搜索功能

### 🎯 个性化学习
- **学习计划**: AI 根据错题情况制定个性化学习计划
- **相似题目**: 基于错题自动生成相似练习题
- **进度追踪**: 实时跟踪学习进度和成效
- **成就系统**: 学习激励和成就徽章

### 📊 数据分析
- **学习报告**: 详细的学习数据分析和可视化
- **趋势分析**: 学习效果趋势和改进建议
- **知识点分析**: 薄弱知识点识别和强化建议

## 🛠️ 技术栈

### 前端技术
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **动画**: Framer Motion
- **状态管理**: React Hooks + Context
- **图标**: Lucide React

### 后端技术
- **API**: Next.js API Routes
- **数据库**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **认证**: NextAuth.js
- **文件存储**: Vercel Blob / Cloudinary

### AI 服务
- **文本分析**: OpenAI GPT-4
- **图像识别**: Google Vision API
- **OCR**: 自定义 OCR 模型

### 部署和监控
- **部署**: Vercel
- **监控**: Sentry
- **分析**: Vercel Analytics
- **邮件**: Resend / SendGrid

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- PostgreSQL 数据库

### 安装步骤

1. **克隆项目**
\`\`\`bash
git clone https://github.com/your-username/mistake-notebook.git
cd mistake-notebook
\`\`\`

2. **安装依赖**
\`\`\`bash
npm install
# 或
yarn install
\`\`\`

3. **环境配置**
\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local` 文件，配置必要的环境变量：

\`\`\`env
# 基础配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# 数据库
DATABASE_URL=your-postgresql-url

# AI 服务
OPENAI_API_KEY=your-openai-key
GOOGLE_VISION_API_KEY=your-google-vision-key

# 文件存储
VERCEL_BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# 邮件服务 (可选)
RESEND_API_KEY=your-resend-key
\`\`\`

4. **数据库设置**
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

5. **启动开发服务器**
\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

\`\`\`
mistake-notebook/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── auth/              # 认证页面
│   ├── dashboard/         # 仪表板
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/                # 基础 UI 组件
│   ├── layout/            # 布局组件
│   ├── auth/              # 认证组件
│   └── features/          # 功能组件
├── lib/                   # 工具库
│   ├── utils.ts           # 通用工具函数
│   ├── types.ts           # TypeScript 类型定义
│   ├── constants.ts       # 常量配置
│   └── env.ts             # 环境变量配置
├── hooks/                 # 自定义 Hooks
├── prisma/                # 数据库模型
│   └── schema.prisma      # Prisma 模式
├── public/                # 静态资源
└── styles/                # 样式文件
\`\`\`

## 🎨 设计系统

### 组件库
项目使用自定义的现代化组件库，包括：

- **ModernCard**: 现代化卡片组件，支持玻璃态、渐变等效果
- **GradientButton**: 渐变按钮组件，多种样式变体
- **AchievementBadge**: 成就徽章组件，支持进度显示
- **ProgressRing**: 环形进度条组件
- **StatsCard**: 统计卡片组件
- **ImageCropper**: 图片裁剪组件

### 设计原则
- **现代化**: 使用最新的设计趋势和视觉效果
- **响应式**: 完美适配移动端和桌面端
- **可访问性**: 遵循 WCAG 无障碍访问标准
- **一致性**: 统一的设计语言和交互模式

## 🔧 开发指南

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 代码格式化规范
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名

### 提交规范
\`\`\`bash
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
\`\`\`

### 开发工作流
1. 创建功能分支
2. 开发和测试
3. 提交代码
4. 创建 Pull Request
5. 代码审查
6. 合并到主分支

## 📱 功能特性

### 移动端优化
- PWA 支持，可安装到手机桌面
- 触摸友好的交互设计
- 底部导航栏适配
- 手势操作支持

### 性能优化
- 图片懒加载和压缩
- 代码分割和动态导入
- 缓存策略优化
- 服务端渲染 (SSR)

### 安全性
- JWT 令牌认证
- CSRF 防护
- XSS 防护
- 输入验证和清理

## 🔮 未来规划

### 短期目标 (1-3个月)
- [ ] 完善 AI 分析准确性
- [ ] 添加语音识别功能
- [ ] 实现班级管理系统
- [ ] 优化移动端体验

### 中期目标 (3-6个月)
- [ ] 多语言支持
- [ ] 离线功能支持
- [ ] 高级数据分析
- [ ] 第三方集成 (钉钉、企业微信)

### 长期目标 (6-12个月)
- [ ] AI 模型自训练
- [ ] 知识图谱构建
- [ ] 个性化推荐算法
- [ ] 教育生态系统集成

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 报告问题
- 使用 GitHub Issues 报告 bug
- 提供详细的重现步骤
- 包含环境信息和错误日志

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **项目主页**: https://mistake-notebook.vercel.app
- **文档**: https://docs.mistake-notebook.com
- **支持邮箱**: support@mistake-notebook.com
- **GitHub**: https://github.com/your-username/mistake-notebook

## 🙏 致谢

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Prisma](https://prisma.io/) - 数据库 ORM
- [OpenAI](https://openai.com/) - AI 服务
- [Vercel](https://vercel.com/) - 部署平台

---

**智能错题本** - 让学习更智能，让进步更明显 🚀

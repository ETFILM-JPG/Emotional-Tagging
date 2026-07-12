# Emotional-Tagging

一个创新的艺术作品筛选系统，通过感性与理性维度的量化评估，帮助用户快速找到最适合当下心情与审美的文学作品、影视作品和音乐。

## 核心特性

### 🎯 直观的双维度筛选
- **感性轴**：情感共鸣度、审美愉悦度、价值认同度
- **理性轴**：叙事完成度、技术完成度
- 通过滑块组自由组合，实时推荐匹配作品

### 📚 多元内容支持
- 📖 书籍（文学小说、非虚构作品等）
- 🎬 影视（电影、电视剧、纪录片等）
- 🎵 音乐（专辑、歌曲等）

### 🚀 完全本地化
- 零依赖部署，一键启动
- 所有数据存储在本地SQLite数据库
- 自动爬虫定期更新作品库
- 支持Windows、macOS、Linux、Android

### 🧠 智能推荐引擎
- 多维向量相似度匹配
- 异常检测识别"低分高价值"作品
- 个性化权重学习与自适应
- 自然语言推荐理由生成

### 🔄 动态反馈闭环
- 用户评分反馈自动学习偏好
- 行为数据隐性反馈优化推荐
- 发现惊喜与个性化建议

## 快速开始

### 系统需求
- Windows 10+ / macOS 10.13+ / Linux (Ubuntu 18.04+) / Android 5.0+
- 200MB硬盘空间（含初始数据库）
- 无需额外的运行时环境

### 安装

1. 下载最新版本：
   - Windows: `Emotional-Tagging.exe` (12MB)
   - macOS: `Emotional-Tagging.dmg` (15MB)
   - Linux: `emotional-tagging.AppImage` (14MB)
   - Android: `emotional-tagging.apk` (18MB)

2. 双击安装或运行

3. 首次启动时自动下载初始数据库

### 使用

1. **选择内容类型**：书籍 / 影视 / 音乐
2. **调整维度权重**：拖动滑块设置偏好
3. **查看推荐**：系统实时显示匹配的作品
4. **三层推荐**：
   - 完美匹配（>8分）
   - 值得尝试（5-8分）
   - 发现惊喜（打破审美边界）

## 项目架构

```
emotional-tagging/
├─ src/                      # React前端代码
│  ├─ components/            # UI组件
│  ├─ hooks/                 # React hooks
│  ├─ store/                 # Zustand状态管理
│  ├─ styles/                # Tailwind CSS
│  └─ App.tsx
│
├─ src-tauri/               # Tauri后端（Rust）
│  ├─ src/
│  │  ├─ main.rs            # 应用入口
│  │  ├─ recommend.rs       # 推荐引擎
│  │  ├─ db.rs              # SQLite数据库操作
│  │  ├─ models.rs          # 数据结构定义
│  │  └─ api.rs             # Tauri命令定义
│  └─ Cargo.toml
│
├─ crawler/                 # Python爬虫
│  ├─ main.py               # 爬虫主程序
│  ├─ douban.py             # 豆瓣爬虫
│  ├─ zhihu.py              # 知乎爬虫
│  ├─ dimension_extract.py  # 维度提取
│  └─ requirements.txt
│
└─ tauri.conf.json          # Tauri配置文件
```

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端** | React 18 + TypeScript + Vite | 现代化UI框架，快速开发 |
| **UI组件** | Shadcn/ui | 美观、可访问的无依赖组件 |
| **状态管理** | Zustand | 轻量级状态管理 |
| **桌面壳** | Tauri | 极轻量级跨平台应用壳，编译即用 |
| **后端** | Rust | 高性能推荐算法执行 |
| **数据库** | SQLite | 嵌入式关系数据库，完全本地化 |
| **搜索** | FTS5 | 全文搜索加速 |
| **爬虫框架** | Scrapy + APScheduler | 生产级网络爬虫框架 |
| **样式** | Tailwind CSS | 原子化CSS框架 |

## 开发

### 本地开发环境

```bash
# 前置需求
# - Node.js 16+
# - Rust 1.70+ (用于Tauri)
# - Python 3.9+ (用于爬虫)

# 克隆项目
git clone https://github.com/ETFILM-JPG/Emotional-Tagging.git
cd Emotional-Tagging

# 安装依赖
npm install
cd src-tauri && cargo build && cd ..

# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建所有平台的可执行文件
npm run build

# 输出位置：src-tauri/target/release/bundle/
```

## 数据更新

应用每周自动更新作品库：
- 豆瓣：新上映电影、热门书籍排行
- 知乎：影评、书评、音乐评论
- 用户贡献：社群用户标注的新作品

手动检查更新：`设置` → `检查更新` → `下载数据库`

## 隐私与数据

- ✅ 所有数据存储在本地，无服务器上传
- ✅ 用户评分和反馈仅用于本地权重学习
- ✅ 爬虫遵守robots.txt和网站服务条款
- ✅ 完全开源，代码透明

## 贡献

欢迎贡献！请参见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

MIT License - 详见 [LICENSE](./LICENSE)

## 反馈与支持

- 🐛 [提交Bug](https://github.com/ETFILM-JPG/Emotional-Tagging/issues)
- 💡 [功能建议](https://github.com/ETFILM-JPG/Emotional-Tagging/discussions)
- 📧 [联系我们](mailto:support@emotional-tagging.dev)

## 致谢

感谢所有贡献者、设计者、数据提供方和用户的支持！

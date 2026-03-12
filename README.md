# 🎵 BGM Generator - 日式 Jazz 背景音乐生成器

自动生成日式 Jazz 风格背景音乐的网页应用，适合工作、学习、咖啡店等场景。

## ✨ 特性

### 🎼 丰富的配器
- 🎹 **钢琴**：温暖的和弦伴奏
- 🎷 **萨克斯**：柔和的主旋律
- 🎸 **贝斯**：Walking Bass 风格
- 🥁 **鼓组**：踩镲、军鼓、底鼓完整节奏

### 🎨 多种音乐风格
- **Lo-fi Jazz**：轻松温暖，适合工作学习
- **Smooth Jazz**：流畅优雅，适合放松休息
- **Bossa Nova**：巴西风情，轻快愉悦
- **Modal Jazz**：现代空灵，适合深度思考
- **Bebop**：快速复杂，充满活力

### 🎛️ 灵活控制
- **BPM 调节**：60-140，自由控制节奏
- **12 个调性**：C、D♭、D、E♭、E、F、G♭、G、A♭、A、B♭、B
- **配置持久化**：刷新页面保留设置

### 🔄 无缝播放
- 点击播放即开始，无需等待生成
- 32 小节循环，自然流畅
- 后台持续生成，无限播放

## 🚀 快速开始

### 在线使用

访问：`https://[你的用户名].github.io/bgm-generator/`

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📖 使用说明

1. **选择音乐风格**
   - 点击风格卡片选择你喜欢的 Jazz 风格
   - 每种风格有不同的和弦进行和节奏特点

2. **调整参数**
   - 拖动滑块调整 BPM（节奏速度）
   - 选择调性（影响音乐的整体音高）

3. **开始播放**
   - 点击"开始播放"按钮
   - 音乐会立即开始，无缝循环
   - 可以随时调整参数（停止后生效）

4. **停止播放**
   - 点击"停止播放"按钮
   - 可以修改参数后重新播放

## 📝 合规性说明

- ✅ **完全原创**：基于音乐理论算法生成
- ✅ **无版权问题**：可自由使用
- ✅ **可商用**：适合咖啡店、办公室等商业场景
- ✅ **开源友好**：MIT 协议

## 🛠️ 技术栈

- **前端框架**：React + TypeScript
- **音频引擎**：Tone.js
- **音乐理论**：自研 Jazz 和声系统
- **构建工具**：Vite
- **部署**：GitHub Pages

## 📦 项目结构

```
bgm-generator/
├── src/
│   ├── components/          # UI 组件
│   │   ├── MusicPlayer.tsx  # 播放器
│   │   └── ControlPanel.tsx # 控制面板
│   ├── music/              # 音乐生成引擎
│   │   ├── JazzGenerator.ts # Jazz 生成器
│   │   └── JazzTheory.ts    # Jazz 音乐理论
│   ├── types.ts            # 类型定义
│   └── App.tsx             # 主应用
├── .github/workflows/      # 自动部署
└── public/                 # 静态资源
```

## 🎼 音乐理论

### 和弦进行
- 使用经典 Jazz 和弦进行（ii-V-I 等）
- 支持 maj7、7、m7 等 Jazz 和弦
- 每种风格有独特的进行模式

### 配器特点
- **钢琴**：切分节奏的 Comping
- **萨克斯**：基于和弦音的即兴旋律
- **贝斯**：Walking Bass 风格
- **鼓组**：标准 Jazz 节奏型

### 循环结构
- 32 小节为一个循环单位
- 自动无缝衔接
- 保持音乐连贯性

## 🚀 部署到 GitHub Pages

详见 [DEPLOY.md](./DEPLOY.md) 和 [QUICKSTART.md](./QUICKSTART.md)

简要步骤：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[你的用户名]/bgm-generator.git
git push -u origin main
```

然后在 GitHub 仓库设置中：
- Settings → Pages → Source 选择 "GitHub Actions"

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License

## 🙏 致谢

- [Tone.js](https://tonejs.github.io/) - 强大的 Web Audio 框架
- [React](https://react.dev/) - UI 框架
- [Vite](https://vitejs.dev/) - 快速的构建工具

---

享受你的 Jazz BGM！☕🎵

# 🚀 快速启动指南

## ✅ v2.0 重大更新

项目已完全重构，现在支持：
- 🎹 丰富的配器（钢琴、萨克斯、贝斯、鼓组）
- 🎨 5 种日式 Jazz 风格
- 🔄 无缝循环播放
- 💾 配置自动保存

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:5173/bgm-generator/
```

## 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

## 部署到 GitHub Pages

### 方法 1：自动部署（推荐）

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "feat: Jazz BGM Generator v2.0"

# 4. 在 GitHub 创建仓库 bgm-generator

# 5. 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/[你的用户名]/bgm-generator.git

# 6. 推送
git push -u origin main
```

### 方法 2：GitHub 设置

1. 进入仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择 **GitHub Actions**
4. 等待自动部署完成（约 1-2 分钟）

### 访问网站

```
https://[你的用户名].github.io/bgm-generator/
```

## 使用说明

### 1. 选择风格
点击风格卡片选择你喜欢的 Jazz 风格：
- **Lo-fi Jazz**：适合工作学习
- **Smooth Jazz**：适合放松休息
- **Bossa Nova**：轻快愉悦
- **Modal Jazz**：深度思考
- **Bebop**：充满活力

### 2. 调整参数
- **BPM**：拖动滑块调整节奏速度（60-140）
- **调性**：选择音乐的主调（C、D♭、D 等）

### 3. 播放音乐
- 点击"开始播放"按钮
- 音乐立即开始，无缝循环
- 配置会自动保存

### 4. 修改设置
- 停止播放后可以修改参数
- 重新播放应用新设置

## 项目状态

✅ 依赖安装成功  
✅ TypeScript 编译通过  
✅ 开发服务器运行正常  
✅ 生产构建成功（406KB，gzip 后 113KB）  
✅ GitHub Actions 配置完成  
✅ 配置持久化功能正常  
✅ 多乐器配器系统完成  

## 技术亮点

### 音乐生成
- 真实的 Jazz 和弦进行（ii-V-I 等）
- 专业的 Walking Bass
- 切分节奏的钢琴 Comping
- 即兴风格的萨克斯旋律
- 标准 Jazz 鼓点

### 用户体验
- 无需等待，点击即播放
- 配置自动保存到 localStorage
- 响应式设计，支持移动端
- 流畅的动画效果

## 故障排除

### 音频无法播放
- 确保浏览器允许自动播放音频
- 尝试刷新页面
- 检查浏览器控制台是否有错误

### 配置未保存
- 检查浏览器是否禁用了 localStorage
- 尝试清除浏览器缓存后重试

### 部署问题
查看 `DEPLOY.md` 获取详细的故障排除指南。

## 下一步

1. 本地测试所有功能
2. 推送到 GitHub
3. 等待自动部署
4. 享受你的 Jazz BGM！☕🎵

## 更新日志

查看 `CHANGELOG.md` 了解详细的版本更新信息。


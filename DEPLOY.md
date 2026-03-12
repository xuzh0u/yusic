# 🚀 部署指南

## GitHub Pages 部署步骤

### 1. 创建 GitHub 仓库

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: BGM Generator"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/[你的用户名]/bgm-generator.git

# 推送到 GitHub
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下选择：
   - Source: **GitHub Actions**

### 3. 自动部署

推送代码后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

查看部署状态：
- 进入仓库的 **Actions** 标签
- 查看工作流运行状态

### 4. 访问网站

部署成功后，访问：
```
https://[你的用户名].github.io/bgm-generator/
```

## 重要配置说明

### vite.config.ts

确保 `base` 配置正确：

```typescript
export default defineConfig({
  base: '/bgm-generator/',  // 必须与仓库名一致
  // ...
})
```

如果仓库名不是 `bgm-generator`，需要修改这个值。

### 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `public/CNAME` 文件
2. 写入你的域名：`music.yourdomain.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `[你的用户名].github.io`

## 本地测试

在部署前，建议本地测试构建版本：

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 故障排除

### 页面显示 404

- 检查 `vite.config.ts` 中的 `base` 配置
- 确保 GitHub Pages 设置为 "GitHub Actions"
- 查看 Actions 日志确认部署成功

### 样式或资源加载失败

- 确认 `base` 路径配置正确
- 检查浏览器控制台的错误信息
- 确保所有资源路径使用相对路径

### Actions 构建失败

- 检查 `package.json` 中的依赖版本
- 查看 Actions 日志中的具体错误
- 确保 Node.js 版本兼容（项目使用 Node 20）

## 更新网站

每次推送到 `main` 分支都会自动触发部署：

```bash
git add .
git commit -m "Update: 描述你的更改"
git push
```

等待几分钟，更改就会生效。

## 性能优化建议

1. **启用 CDN**：GitHub Pages 自带 CDN
2. **压缩资源**：Vite 自动处理
3. **懒加载**：考虑对 AI 模型使用动态导入
4. **缓存策略**：利用浏览器缓存

## 监控和分析

可以添加：
- Google Analytics
- Plausible Analytics（隐私友好）
- Vercel Analytics

在 `index.html` 中添加相应的跟踪代码即可。

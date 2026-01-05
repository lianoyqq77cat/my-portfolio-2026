## 1. 简介 (Introduction)

本项目旨在构建一个极简、高性能的设计师个人作品集网站。
**核心架构哲学：** **"Zero-Build" (零构建)**。我们将利用现代浏览器的原生能力（ES6 Modules, CSS Variables, Grid Layout, Fetch API），摒弃一切复杂的构建工具链（Webpack, Vite, React等）。这不仅契合包豪斯“形式追随功能”的设计理念，也确保了代码的极致轻量、透明和长久的可维护性。

### 1.1 核心约束

* **运行时 (Runtime):** 浏览器原生 (Chrome/Edge/Safari/Firefox 最新版)。
* **依赖管理 (Dependencies):** **零依赖** (No npm, no package.json)。
* **数据源 (Data Source):** 静态 JSON/JS 对象 (无后端数据库)。
* **部署 (Deployment):** GitHub Pages (静态托管)。

---

## 2. 系统高层架构 (High-Level Architecture)

### 2.1 架构模式：静态多页应用 (Static MPA) + 运行时组件注入

系统由多个独立的 HTML 页面组成，通过 JavaScript 在客户端运行时“组装”公共部分。

* **HTML (骨架):** 每个页面独立存在 (`index.html`, `about.html` 等)，负责 SEO 和核心内容结构。
* **CSS (皮肤):** 集中式样式管理，使用 CSS 变量定义包豪斯设计系统。
* **JS (肌肉):** 负责“获取-注入”导航栏、渲染作品网格、以及处理灯箱交互。

### 2.2 数据流图 (Data Flow)

```mermaid
graph TD
    User[用户浏览器]
    
    subgraph "静态文件服务器 (GitHub Pages)"
        HTML[HTML Pages]
        Assets[Images / CSS]
        JS_Data[data.js (静态数据库)]
        Fragments[HTML 片段 (nav, footer)]
    end
    
    User -->|1. 请求页面| HTML
    HTML -->|2. 加载资源| Assets
    HTML -->|3. 加载脚本| JS_Logic[main.js]
    
    JS_Logic -->|4. Fetch 请求| Fragments
    Fragments -->|5. DOM 注入| User
    
    JS_Logic -->|6. Import 导入| JS_Data
    JS_Data -->|7. 渲染生成| Gallery_Grid[作品卡片网格]

```

---

## 3. 技术栈详细规范 (Tech Stack Specifications)

| 层次 | 技术选型 | 版本/特性 | 详细说明 |
| --- | --- | --- | --- |
| **结构层** | **HTML5** | Semantic | 严格语义化标签 (`<nav>`, `<article>`, `<figure>`)。 |
| **表现层** | **CSS3** | Modern | 使用 `Display: Grid` 实现非对称布局；使用 `:root` 定义颜色变量。**不使用 Sass/Less**。 |
| **行为层** | **JavaScript** | ES6+ | 使用 `ES Modules` (`<script type="module">`) 进行模块化开发。**不使用 TypeScript (编译)**，直接写 JS。 |
| **数据层** | **JavaScript Objects** | JSON-like | 数据硬编码在 `.js` 文件中，利用 `export const` 导出。 |
| **图标库** | **SVG Sprites** | Inline | 直接使用 SVG 代码或 SVG Sprite，不引入 FontAwesome 等字体库。 |
| **性能优化** | **Native Lazy Load** | Browser API | 图片使用 `loading="lazy"` 属性；脚本使用 `defer`。 |

---

## 4. 详细目录结构 (Source Tree)

开发团队必须严格遵守此结构，文件名大小写敏感。

```text
construct-portfolio/
├── index.html                  # [首页] 英雄区 + 精选作品
├── about.html                  # [关于] 简历 + 技能图谱
├── interface.html              # [作品] 界面设计列表
├── 3d-art.html                 # [作品] 3D建模列表
├── .nojekyll                   # [配置] 告诉 GitHub Pages 不要忽略下划线文件(如有)
├── assets/
│   ├── css/
│   │   ├── reset.css           # 基础重置 (建议使用 Andy Bell 的 Modern CSS Reset)
│   │   ├── variables.css       # 全局变量定义 (颜色, 字体, 字号)
│   │   ├── layout.css          # 网格系统, 导航, 页脚样式
│   │   ├── components.css      # 卡片, 按钮, 灯箱样式
│   │   └── utilities.css       # 工具类 (如 .text-center, .hidden)
│   ├── js/
│   │   ├── main.js             # 入口文件 (负责初始化, 导航高亮)
│   │   ├── loader.js           # 组件加载器 (Fetch API 逻辑)
│   │   ├── data.js             # 【核心数据文件】
│   │   └── gallery.js          # 画廊渲染逻辑 & Lightbox 逻辑
│   ├── components/             # HTML 片段 (不是完整的页面)
│   │   ├── nav.html
│   │   └── footer.html
│   └── images/
│       ├── ui/                 # 存放 interface 作品 (如 .png)
│       ├── 3d/                 # 存放 3D 作品 (如 .jpg)
│       └── common/             # 存放 Logo, 头像, 社交图标
└── README.md                   # 项目说明文档

```

---

## 5. 数据模型设计 (Data Models)

为了管理素材描述文档中提到的20+个作品，我们将建立以下数据模型。这些模型将实现在 `assets/js/data.js` 中。

### 5.1 通用作品模型 (Work Item)

```javascript
/**
 * @typedef {Object} WorkItem
 * @property {string} id - 唯一标识符 (如 "3d-01")
 * @property {string} title - 作品标题
 * @property {string} category - 分类 (用于显示在卡片角落)
 * @property {string} filename - 文件名 (必须与 assets/images/ 下的文件匹配)
 * @property {string} description - 详细描述 (用于 Alt 文本或灯箱说明)
 * @property {boolean} isSelected - 是否在首页 "精选作品" 中显示 (Top 4)
 */

```

### 5.2 数据文件实现 (`data.js`)

```javascript
export const threeDWorks = [
    {
        id: "3d-01",
        title: "化妆品建模",
        category: "Product Design",
        filename: "01化妆品.jpg",
        description: "精细的化妆品3D建模，展现玻璃与金属质感。",
        isSelected: true // 首页展示
    },
    // ... 其他3D作品
];

export const interfaceWorks = [
    {
        id: "ui-01",
        title: "主页界面",
        category: "Mobile App",
        filename: "主页.png",
        description: "应用的主要功能入口与内容布局设计。",
        isSelected: true // 首页展示
    },
    // ... 其他UI作品
];

```

---

## 6. 核心功能实现逻辑 (Core Logic Implementation)

### 6.1 公共组件注入 (Fetch-Inject Pattern)

**目标：** 解决静态页面头部/尾部代码重复问题。
**文件：** `assets/js/loader.js`

**逻辑伪代码：**

1. 定义 `loadComponent(elementId, filePath)` 函数。
2. 使用 `fetch(filePath)` 获取 HTML 文本。
3. 将文本赋值给 `document.getElementById(elementId).innerHTML`。
4. **关键点：** 注入导航栏后，必须立即执行“高亮当前页面”的逻辑（对比 `window.location.pathname` 和 `<a>` 标签的 `href`）。

### 6.2 动态画廊渲染 (Gallery Renderer)

**目标：** 将 `data.js` 数据渲染到页面。
**文件：** `assets/js/gallery.js`

**逻辑伪代码：**

1. 判断当前页面是 `interface.html` 还是 `3d-art.html`。
2. 导入对应的数据数组 (`interfaceWorks` 或 `threeDWorks`)。
3. 获取 DOM 容器 `const container = document.querySelector('#gallery-grid')`。
4. 遍历数组：
* 创建 `<article class="card">` 元素。
* 填充内容模板：
```html
<figure>
    <img src="assets/images/[type]/[filename]" alt="[description]" loading="lazy">
</figure>
<div class="card-info">
    <h3>[title]</h3>
    <span>[category]</span>
</div>

```


* 如果是 3D 页面，给卡片绑定 `click` 事件监听器，触发 Lightbox。


5. 将生成的卡片 Append 到容器中。

### 6.3 3D 灯箱 (Lightbox)

**目标：** 全屏查看 3D 渲染图细节。
**逻辑：**

* **打开：** 创建一个全屏 `div.lightbox`，插入当前点击图片的 `<img>` (高分辨率)。
* **交互：**
* 点击遮罩层空白处 -> 关闭 (`remove()`)。
* 按 ESC 键 -> 关闭。
* (进阶) 按左右方向键 -> 根据当前图片 Index 查找数组中的上一张/下一张并替换 `src`。



---

## 7. 样式与视觉系统 (Design System Implementation)

### 7.1 CSS 变量配置 (`variables.css`)

```css
:root {
    /* Bauhaus Palette */
    --color-red: #D0202E;
    --color-yellow: #F7D937;
    --color-blue: #1F5AA6;
    --color-black: #1A1A1A;
    --color-white: #F5F5F0;
    
    /* Typography */
    --font-heading: 'Helvetica Now', 'Arial Black', sans-serif;
    --font-body: 'Inter', 'Helvetica', sans-serif;
    
    /* Spacing (8pt grid) */
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 32px;
    --space-xl: 64px;
    
    /* Borders */
    --border-thick: 4px solid var(--color-black);
    --border-thin: 1px solid var(--color-black);
}

```

### 7.2 布局策略

* **首页 Hero:** 使用 `Grid` 布局。左侧 `2fr` (几何图形)，右侧 `3fr` (大标题)。
* **作品列表:**
* **Desktop:** `grid-template-columns: repeat(3, 1fr);` (三列)
* **Tablet:** `grid-template-columns: repeat(2, 1fr);` (两列)
* **Mobile:** `grid-template-columns: 1fr;` (单列)



---

## 8. 开发与部署流程 (Workflow)

由于没有构建步骤，开发流程非常直接。

### 8.1 本地开发

1. 安装 VS Code 和 "Live Server" 插件。
2. 右键点击 `index.html` -> "Open with Live Server"。
3. 每次保存文件，浏览器自动刷新。

### 8.2 部署 (GitHub Pages)

1. 在 GitHub 创建仓库。
2. 提交代码：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [repository-url]
git push -u origin main

```


3. 在 GitHub 仓库设置中开启 Pages 服务。

---

## 9. 质量保证与测试 (QA & Testing)

### 9.1 浏览器兼容性测试

* 由于使用了 `type="module"` 和 `CSS Grid`，只需测试现代浏览器：
* Chrome 80+
* Safari 14+
* Firefox 80+
* Edge 80+


* **不支持 IE11** (符合 PRD 规定)。

### 9.2 性能自查清单

1. [ ] 所有图片是否小于 300KB？(如过大需使用 TinyPNG 压缩)。
2. [ ] 图片标签是否包含 `loading="lazy"`？
3. [ ] 所有的 `<script>` 标签是否位于 `<body>` 底部或带有 `defer`？
4. [ ] Lighthouse Performance 评分是否 > 95？

---

## 10. 安全 (Security)

由于是纯静态网站，没有后端数据库注入风险，主要的安全性在于：

1. **HTTPS:** GitHub Pages 默认强制开启 HTTPS。
2. **外链安全:** 如果链接到外部网站（如 LinkedIn），`<a>` 标签必须包含 `rel="noopener noreferrer"` 以防止反向链接劫持。
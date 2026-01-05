# Project Name: "CONSTRUCT" Bauhaus Design Portfolio
# Product Requirements Document (PRD)

| Document Details | |
| :--- | :--- |
| **Version** | 1.0 (Detailed) |
| **Status** | Approved |
| **Author** | John (Product Manager) |
| **Date** | 2026-01-04 |

---

## 1. Goals and Background Context

### 1.1 Goals
**Business Objectives:**
* **Establish Brand Identity:** 构建一个独特的“设计师+开发者”个人品牌，通过网站本身证明设计审美与代码落地能力的统一。
* **Primary Landing Page:** 作为一个高效的求职与接单落地页，在 30 秒内通过视觉冲击力抓住招聘经理或潜在客户的注意力。

**User Success Metrics (KPIs):**
* **Performance:** Google Lighthouse Performance 评分必须达到 **98-100**。
* **Engagement:** 作品详情页平均停留时间 > 2 分钟；跳出率 < 40%。
* **Conversion:** "联系我" (Contact) 或 "下载简历" (Resume) 的点击率显著提升。

### 1.2 Background Context
当前设计师作品集市场充斥着 Webflow、Notion 和 WordPress 模板，导致视觉同质化严重，且往往因为过度依赖框架而性能臃肿。
本项目 "CONSTRUCT" 旨在回归 Web 本源，遵循包豪斯 (Bauhaus) “形式追随功能”的核心理念。通过纯 HTML5、CSS3 和 ES6+ JavaScript（无框架）构建，打造一个既复古又现代、极致轻量且具有强烈几何视觉风格的数字化展示空间。

### 1.3 Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026-01-04 | 1.0 | Initial comprehensive release based on Brief 2.0 | John (PM) |

---

## 2. Requirements

### 2.1 Functional Requirements (FR)

**Global Navigation & Layout**
* **FR-01:** 全局导航栏需采用“蒙德里安”风格的粗线条分割结构，包含 Home, About, Interface Works, 3D Works 四个入口。
* **FR-02:** 为了维护性，Header 和 Footer 必须作为独立的 HTML 片段，通过原生 JavaScript (`fetch` API) 在运行时动态注入到各个页面，避免硬编码重复。

**Home Page (首页)**
* **FR-03:** **Hero Section:** 左侧/背景展示由纯 CSS 绘制的动态几何图形（圆、方、三角），需实现随鼠标移动的微视差效果 (Parallax)；右侧前景展示超大排版 "DESIGNER / CODER / CREATOR"。
* **FR-04:** **Selected Works:** 采用 "2+2" 非对称卡片布局（2个 UI 作品 + 2个 3D 作品），卡片尺寸或位置需错落有致，点击卡片跳转至对应详情页。

**About Page (关于页)**
* **FR-05:** **Layout:** 桌面端采用“左图右文”的杂志级排版；移动端流式堆叠。
* **FR-06:** **Skill Matrix:** 使用 CSS 绘制的可视化图形（如进度条或几何堆叠）展示技能熟练度 (HTML/CSS/Blender/Figma)。
* **FR-07:** **Contact:** 包含几何化风格的社交图标 (GitHub, Dribbble, LinkedIn) 和邮件链接。

**Interface Works Page (界面作品页)**
* **FR-08:** **Grid System:** 使用 CSS Grid 实现结构化的网格展示。
* **FR-09:** **Interaction:** 鼠标悬停 (Hover) 时，作品封面需发生状态改变（如：黑白变彩色，或滑出红色遮罩层显示标题）。

**3D Modeling Page (3D 建模页)**
* **FR-10:** **Immersive Mode:** 页面背景强制切换为深色模式 (#1A1A1A)，以突显渲染图的光影质感。
* **FR-11:** **Display Layout:** 采用瀑布流 (Masonry) 布局展示不同比例的渲染图。
* **FR-12:** **Lightbox:** 点击图片触发全屏 Lightbox 预览。需支持键盘左右键切换图片，按 ESC 关闭。严禁使用第三方库。

### 2.2 Non-Functional Requirements (NFR)

* **NFR-01 (Zero Dependencies):** 严禁使用 React, Vue, jQuery, Bootstrap, Tailwind 等任何框架或库。
* **NFR-02 (Performance):** 核心 Web Vitals 指标 (LCP, CLS, FID) 必须全绿。图片资源必须使用 WebP 格式并实现原生懒加载 (`loading="lazy"` 或 IntersectionObserver)。
* **NFR-03 (Responsiveness):** 桌面端 (Desktop) 呈现复杂的非对称网格；移动端 (Mobile, <768px) 必须优雅降级为单列流式布局，保证可读性。
* **NFR-04 (Compatibility):** 支持 Chrome, Firefox, Safari, Edge 的最新 2 个版本。不需兼容 IE。
* **NFR-05 (Code Quality):** HTML 必须严格语义化 (`<nav>`, `<main>`, `<article>`, `<figure>`)。CSS 必须使用 `:root` 变量管理颜色。

---

## 3. User Interface Design Goals

### 3.1 UX Vision
* **Concept:** "Digital Poster" (数字化海报)。网页应当像一张动态的包豪斯海报，强调几何构成和字体排印的张力。
* **Interaction:** "Less is More"。交互仅用于增强信息获取（如 Hover 反馈），拒绝无意义的装饰性动画。

### 3.2 Visual Specifications
* **Color Palette (Bauhaus):**
    * Primary Red: `#D0202E`
    * Primary Yellow: `#F7D937`
    * Primary Blue: `#1F5AA6`
    * Neutral White: `#F5F5F0` (纸张质感)
    * Neutral Black: `#1A1A1A` (墨黑)
* **Typography:**
    * Headings: Helvetica Now / Inter (Weight: 800/900)，极度紧凑的字距 (tracking-tight)。
    * Body: Inter / Roboto (Weight: 400)，高可读性。
* **Layout:** 非对称平衡 (Asymmetrical Balance)，大量使用 CSS Grid。

### 3.3 Accessibility
* **Standard:** WCAG AA。
* **Requirements:** 确保红/蓝背景上的文字对比度足够；所有图片必须包含 `alt` 描述；支持键盘导航焦点状态。

---

## 4. Technical Assumptions

* **Repository Structure:** Monorepo (Single Directory).
    * `/index.html`, `/about.html`, `/interface.html`, `/3d-art.html`
    * `/assets/css/` (style.css, variables.css)
    * `/assets/js/` (main.js, components.js)
    * `/assets/images/`
* **Tech Stack:** Vanilla HTML5, CSS3 (Grid/Flexbox/Variables), ES6+ JavaScript.
* **Deployment:** Vercel or GitHub Pages (Static hosting).
* **Testing:** Google Lighthouse (Performance/SEO/Accessibility).

---

## 5. Epic List

由于项目范围聚焦且无后端复杂度，我们将采用**单一核心 Epic** 的策略来确保 MVP 的整体交付。

* **Epic 1:** "CONSTRUCT" Portfolio MVP Development

---

## 6. Epic Details & User Stories

### Epic 1: "CONSTRUCT" Portfolio MVP Development
**Goal:** 完成所有 4 个静态页面的开发、样式实现与核心交互逻辑，并通过性能测试上线。

#### Story 1.1: Project Infrastructure & Design System
* **As a** Developer,
* **I want** 建立项目基础结构并定义全局样式变量,
* **So that** 我可以高效地开发各个页面并保持设计一致性。
* **Acceptance Criteria:**
    1.  创建文件目录结构 (`/assets/css`, `/assets/js`, `/assets/images`)。
    2.  创建 `variables.css`，定义 `:root` 中的颜色、字体、间距变量。
    3.  创建 `reset.css` 或手写 Normalize 样式。
    4.  实现 `nav.html` 和 `footer.html` 片段，并编写 `components.js` 使用 `fetch` 将其注入到 `index.html`。

#### Story 1.2: Home Page (Hero & Selection)
* **As a** Visitor,
* **I want** 在首页看到动态几何图形和精选作品,
* **So that** 我能立即感受到设计师的包豪斯风格。
* **Acceptance Criteria:**
    1.  使用 CSS `border-radius` 和 `transform` 绘制圆、方、三角。
    2.  实现 JS 监听 `mousemove` 事件，使几何图形产生轻微位移 (视差效果)。
    3.  实现 "Selected Works" 区域的 2+2 非对称 Grid 布局。
    4.  移动端视口下，布局自动堆叠为单列。

#### Story 1.3: Interface Works Page (Grid & Hover)
* **As a** Potential Client,
* **I want** 以网格形式浏览 UI 作品并看到交互反馈,
* **So that** 我能快速筛选感兴趣的案例。
* **Acceptance Criteria:**
    1.  使用 `display: grid` 实现响应式网格 (Desktop 3列, Tablet 2列, Mobile 1列)。
    2.  默认图片显示为黑白 (`filter: grayscale(100%)`)。
    3.  Hover 状态下：图片恢复彩色 (`filter: none`) 并平滑过渡 (`transition: 0.3s`)。
    4.  图片必须实现懒加载。

#### Story 1.4: 3D Works Page (Masonry & Lightbox)
* **As a** Art Director,
* **I want** 在沉浸式背景下查看高清 3D 渲染图,
* **So that** 我能检查作品的光影细节。
* **Acceptance Criteria:**
    1.  该页面 `<body>` 背景色强制设为 `#1A1A1A`。
    2.  实现 CSS Column 或 Grid Masonry 布局（瀑布流）。
    3.  **手写 Lightbox 功能**：
        * 点击缩略图 -> 创建全屏遮罩层 -> 显示大图。
        * 支持键盘 `Esc` 关闭，`←` / `→` 键切换上一张/下一张。
        * 禁止引入任何第三方 Lightbox 插件。

#### Story 1.5: About Page & Typography
* **As a** Hiring Manager,
* **I want** 阅读设计师的简历和技能图谱,
* **So that** 我能评估其专业资质。
* **Acceptance Criteria:**
    1.  实现复杂的杂志级排版（左侧固定图片，右侧滚动文字，或双栏布局）。
    2.  使用 CSS `width` 百分比控制几何条形图来展示技能熟练度。
    3.  排版需通过 `clamp()` 函数实现流体字号，适配不同屏幕宽度的阅读体验。

#### Story 1.6: Final Polish & Optimization
* **As a** Developer,
* **I want** 优化资源和代码,
* **So that** 网站达到 Lighthouse 98+ 分数。
* **Acceptance Criteria:**
    1.  所有 JPG/PNG 图片转换为 WebP 格式。
    2.  确保所有非关键 CSS/JS 不阻塞首屏渲染。
    3.  运行 Lighthouse 测试，Performance 得分 >= 98，SEO 得分 100。
    4.  检查 HTML 语义化，确保无 A11y (无障碍) 严重错误。
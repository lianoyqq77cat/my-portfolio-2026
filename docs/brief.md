Project Brief: Bauhaus Design Portfolio "CONSTRUCT"
Date: 2026-01-04 Author: Mary (Business Analyst) Version: 2.0 (Detailed)


Output File: docs/brief.md 

1. Executive Summary 

本项目旨在构建一个名为 "CONSTRUCT" 的设计师个人作品集网站。该项目不仅仅是作品的展示容器，更是设计师技术实力与审美哲学的直接宣言。网站将严格遵循 包豪斯（Bauhaus） “形式追随功能”的核心理念，采用 纯 HTML5、CSS3 和 ES6+ JavaScript （无框架）构建。通过非对称网格布局、强烈的几何排版和红黄蓝三原色的运用，打造一个既复古又现代的数字化展示空间，以此向潜在雇主和客户展示设计师在界面设计（UI）与 3D 建模领域的双重专业能力。

2. Problem Statement 

同质化困境：当前设计师作品集多依赖 Webflow、Notion 或 WordPress 模板，导致视觉语言千篇一律，无法突显个人独特的审美主张。

技术展示缺失：对于即懂设计又懂代码的复合型人才，现成模板无法证明其“手写代码”和“底层优化”的能力。

性能臃肿：现代前端框架（React/Vue）对于简单的静态展示站来说过于厚重，导致加载性能（LCP/FCP）不佳，违背了包豪斯“功能至上”的效率原则。

3. Proposed Solution 

我们提出构建一个完全定制化的静态网站，核心策略如下：

视觉哲学：将网页视为一张动态的平面海报。使用 CSS Grid 模拟包豪斯海报经典的网格系统，结合高对比度的无衬线字体（Sans-Serif）和几何图形（圆、方、三角）作为视觉锚点。

技术回归：摒弃构建工具链的复杂性。代码即设计——HTML 结构即骨架，CSS 即皮肤，JS 仅作为交互的肌肉（无依赖）。

沉浸式展示：针对 UI 作品和 3D 作品设计两种不同的浏览体验——前者强调逻辑与流程，后者强调光影与细节。

4. Target Users 

Primary Segment: 招聘经理与设计总监 (Hiring Managers & Art Directors)
需求：在 30 秒内快速评估设计师的审美层级和硬技能。

痛点：厌倦了加载缓慢、交互复杂过度炫技的网站。

目标：看到清晰的信息层级、完美的代码实现细节、以及扎实的作品质量。

Secondary Segment: 潜在商业客户 (Potential Clients)
需求：寻找能提供“界面设计”+“3D 视觉”全案服务的设计师。

目标：通过作品集建立信任感，确认设计师风格是否契合其品牌调性。

5. Goals & Success Metrics 

Business Objectives:

在网站上线后，作为求职/接单的主要落地页（Landing Page）。

建立独特的个人品牌识别度（Brand Identity）。

User Success Metrics:

加载速度：Lighthouse Performance 评分达到 98-100（得益于无框架）。

跳出率：低于 40%（通过独特的导航和视觉引导留住用户）。

KPIs:

作品详情页的平均停留时间 > 2分钟。

“联系我”或“下载简历”的转化率。

6. MVP Scope (Detailed Specification) 

6.1 Design Specifications (Bauhaus Theme)
Color Palette:

Primary: Bauhaus Red (#D0202E), Yellow (#F7D937), Blue (#1F5AA6).

Neutral: Off-White (#F5F5F0 纸张质感), Ink Black (#1A1A1A).

Typography:

Heading: Helvetica Now 或 Inter (Weight: 800/900)，超大字号，紧凑字距。

Body: Inter 或 Roboto (Weight: 400)，高可读性。

Layout: 使用 CSS Grid 布局实现非对称平衡（Asymmetrical Balance）。

6.2 Page Requirements
A. 首页 (Home)
Hero Section:

左侧/背景：巨大的动态几何图形（CSS 绘制的圆/方/三角，随鼠标微动）。

右侧/前景：超大排版文字 "DESIGNER / CODER / CREATOR"。

精选作品 (Selected Works):

"2+2" 布局：精选 2 个 UI 作品和 2 个 3D 作品，以不对称卡片形式展示。

全局导航 (Navigation):

固定在侧边或顶部，使用粗线条分割，类似蒙德里安的画作结构。

B. 关于页面 (About)
布局：左图右文（桌面端），文字排版需像杂志一样考究。

内容：

简介：个人背景。

技能矩阵：使用进度条或几何图形可视化的技能树（HTML/CSS/Blender/Figma）。

理念：引用包豪斯名言（如 "Less is More"）。

联系模块：几何化的社交图标（GitHub, Dribbble, LinkedIn）。

C. 界面作品页 (Interface Works Page)
展示形式：结构化网格（Structured Grid）。

交互：鼠标悬停在作品卡片上时，图片变为彩色（默认黑白）或出现红色遮罩层显示标题。

内容：包含 App 设计、Web 设计、后台系统设计等案例。

D. 3D建模渲染图页 (3D Modeling Renderings Page)
展示形式：瀑布流（Masonry Layout）或全屏画廊（Lightbox）。

背景：深色背景（Dark Mode），以突显渲染图的光影质感。

交互：点击图片弹出全屏预览，支持键盘左右切换。

6.3 Out of Scope for MVP
后台管理系统（CMS）。

复杂的 WebGL 3D 模型实时预览（仅展示渲染图）。

多语言切换。

7. Technical Considerations 

Architecture
File Structure:

/index.html (Home)
/about.html (About)
/interface.html (Works)
/3d-art.html (Works)
/assets/
    /css/ (style.css, grid.css, variables.css)
    /js/ (main.js, lightbox.js)
    /images/ (webp optimized)
Implementation Details
HTML: 严格语义化标签 (<header>, <nav>, <main>, <article>, <figure>, <footer>)。

CSS:

大量使用 display: grid 进行二维布局。

使用 CSS Variables (:root) 管理包豪斯配色，方便一键调整。

使用 clamp() 函数实现流体排版（Fluid Typography），减少媒体查询断点。

必须手写 CSS Reset 或 Normalize。

JavaScript:

使用 Vanilla JS (ES6 Modules)。

功能：移动端菜单切换、图片懒加载监听（Intersection Observer API）、简单的 Lightbox 逻辑。

零依赖：不引入 lodash, jquery 等库。

8. Constraints & Assumptions 

Constraints:

浏览器兼容性：支持现代浏览器（Chrome, Firefox, Safari, Edge）的最新 2 个版本。不考虑 IE。

开发时间：需在无框架辅助下手动编写样式，开发周期可能比使用 Tailwind 稍长。

Assumptions:

所有 3D 渲染图和 UI 设计稿已导出为高质量的 JPG/WEBP 格式。

不需要后端数据库，内容直接硬编码在 HTML 中。

9. Risks & Mitigation 

Risk: 纯 HTML 维护困难。

Mitigation: 使用 JavaScript 动态加载 Header 和 Footer（通过 fetch 注入 HTML 片段），避免修改 4 个页面的公共部分。

Risk: 包豪斯风格在移动端的适配。

Mitigation: 桌面端采用复杂的非对称网格，移动端强制降级为优雅的单列流式布局，保持字体和色彩的张力。
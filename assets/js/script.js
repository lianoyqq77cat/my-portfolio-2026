/**
 * CONSTRUCT - 完整修复版脚本
 */

// ==========================================
// 1. 数据中心 (确保文件名和你电脑里的一样)
// ==========================================
const worksData = {
    interface: [
        // 注意：selected: true 表示会在首页显示
        { id: 'ui-01', title: '主页界面', category: 'Mobile App', img: '主页.png', desc: '应用首页设计', selected: true },
        { id: 'ui-02', title: '我的页面', category: 'User Center', img: '我的页面.png', desc: '个人中心设计', selected: true },
        { id: 'ui-03', title: '交互关系图', category: 'UX Design', img: '交互关系图.png', desc: '逻辑流程图', selected: false },
        { id: 'ui-04', title: '侧拉页面', category: 'Component', img: '侧拉页面.png', desc: '侧滑菜单', selected: false },
        { id: 'ui-05', title: '关注页面', category: 'Social', img: '关注页面.png', desc: '关注列表', selected: false },
        { id: 'ui-06', title: '加载页', category: 'Animation', img: '加载页.png', desc: '启动加载', selected: false },
        { id: 'ui-07', title: '加载页面', category: 'Animation', img: '加载页面.png', desc: '加载方案二', selected: false },
        { id: 'ui-08', title: '搜索页面', category: 'Search', img: '搜索页面.png', desc: '搜索功能', selected: false },
        { id: 'ui-09', title: '播客页面', category: 'Media', img: '播客页面.png', desc: '播放界面', selected: false },
        { id: 'ui-10', title: '树状分析图', category: 'Data Viz', img: '树状分析图.png', desc: '结构分析', selected: false },
        { id: 'ui-11', title: '登陆页面', category: 'Auth', img: '登陆页面.png', desc: '登录注册', selected: false },
        { id: 'ui-12', title: '识别页', category: 'AI', img: '识别页.png', desc: '图像识别', selected: false },
    ],
    threeD: [
        { id: '3d-01', title: '化妆品建模', category: 'Product', img: '01化妆品.jpg', desc: '产品渲染', selected: true },
        { id: '3d-04', title: '汽车材质', category: 'Automotive', img: '02汽车建模和材质.jpg', desc: '汽车渲染', selected: true },
        { id: '3d-02', title: '古风建筑', category: 'Architecture', img: '01古风建筑建模.jpg', desc: '古建模型', selected: false },
        { id: '3d-03', title: '现代家具', category: 'Interior', img: '02家具.jpg', desc: '家具设计', selected: false },
        { id: '3d-05', title: '石膏像', category: 'Art', img: '02石膏.jpg', desc: '石膏练习', selected: false },
        { id: '3d-06', title: '人物建模', category: 'Character', img: '03人物.jpg', desc: '人物角色', selected: false },
        { id: '3d-07', title: '剪纸风格', category: 'Style', img: '04剪纸风格.jpg', desc: '风格化渲染', selected: false },
        { id: '3d-08', title: '小岛白天', category: 'Env', img: '05-1小岛白天.jpg', desc: '场景渲染', selected: false },
        { id: '3d-09', title: '小岛黑夜', category: 'Env', img: '05-2小岛黑夜.jpg', desc: '夜景渲染', selected: false },
        { id: '3d-10', title: '小老鼠', category: 'Character', img: '06小老鼠.jpg', desc: '卡通角色', selected: false },
        { id: '3d-11', title: '洗衣液', category: 'Product', img: '07洗衣液.jpg', desc: '产品包装', selected: false },
        { id: '3d-12', title: '小男孩', category: 'Character', img: '08小男孩.jpg', desc: '卡通人物', selected: false },
    ]
};

// ==========================================
// 2. 核心逻辑 (页面加载后自动执行)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 功能 A: 导航栏高亮 ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(decodeURIComponent(link.getAttribute('href')) === decodeURIComponent(currentPath)) {
            link.classList.add('active');
        }
    });

    // --- 功能 B: 判断当前页面并渲染内容 ---
    const galleryContainer = document.getElementById('gallery-grid'); // 作品页的容器
    const selectedContainer = document.getElementById('selected-grid'); // 首页的容器

    // 如果是作品页 (Interface 或 3D)
    if (galleryContainer) {
        if (document.body.classList.contains('interface-page')) {
            renderGallery(worksData.interface, galleryContainer, 'ui');
        } else if (document.body.classList.contains('three-d-page')) {
            renderGallery(worksData.threeD, galleryContainer, '3d');
        }
    }

    // 如果是首页 (Home) - 这里修复了之前的 Bug
    if (selectedContainer) {
        renderSelectedWorks();
    }

    // --- 功能 C: 首页几何图形视差动画 ---
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;
            shapes.forEach((shape, index) => {
                shape.style.transform = `translate(${x * ((index + 1) * 0.5)}px, ${y * ((index + 1) * 0.5)}px)`;
            });
        });
    }

    // --- 功能 D: 初始化图片查看器 ---
    initLightbox();
});

// ==========================================
// 3. 渲染函数 (负责生成 HTML)
// ==========================================

// 渲染作品列表 (用于 Interface 和 3D 页面)
function renderGallery(data, container, type) {
    const pathPrefix = type === 'ui' ? 'assets/images/ui/' : 'assets/images/3d/';

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        const imgSrc = `${pathPrefix}${item.img}`; 

        card.innerHTML = `
            <figure style="cursor: zoom-in;">
                <img src="${imgSrc}" alt="${item.desc}" loading="lazy">
            </figure>
            <div class="card-info">
                <h3>${item.title}</h3>
                <span>${item.category}</span>
            </div>
        `;
        
        // 点击图片放大
        card.addEventListener('click', () => openLightbox(imgSrc));
        container.appendChild(card);
    });
}

// 渲染精选作品 (用于首页)
function renderSelectedWorks() {
    const container = document.getElementById('selected-grid');
    if (!container) return;

    // 挑选标记为 selected: true 的作品
    const selectedUI = worksData.interface.filter(i => i.selected).slice(0, 2);
    const selected3D = worksData.threeD.filter(i => i.selected).slice(0, 2);
    const combined = [...selectedUI, ...selected3D];

    combined.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        
        // 自动判断文件夹路径
        const folder = item.id.startsWith('ui') ? 'ui/' : '3d/';
        const imgSrc = `assets/images/${folder}${item.img}`;
        
        // 判断跳转链接
        const link = item.id.startsWith('ui') ? 'Interface Works Page.html' : '3D Modeling Renderings Page.html';

        card.innerHTML = `
            <a href="${link}">
                <figure>
                    <img src="${imgSrc}" alt="${item.desc}" loading="lazy">
                </figure>
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <span>${item.category}</span>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 4. 图片查看器 (Lightbox)
// ==========================================
function initLightbox() {
    if (!document.querySelector('.lightbox')) {
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML = `<span class="lightbox-close">&times;</span><img src="" alt="Full View">`;
        document.body.appendChild(lb);

        // 点击关闭
        lb.addEventListener('click', (e) => {
            if (e.target !== lb.querySelector('img')) lb.classList.remove('active');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lb.classList.remove('active');
        });
    }
}

function openLightbox(src) {
    const lb = document.querySelector('.lightbox');
    const img = lb.querySelector('img');
    img.src = src;
    lb.classList.add('active');
}
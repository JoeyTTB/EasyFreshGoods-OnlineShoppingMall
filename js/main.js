document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // 如果有轮播图元素
    if (slides.length > 0) {
        // 显示指定的轮播图
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // 自动轮播
        function autoSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // 设置点击事件
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });
        
        // 每5秒自动切换
        setInterval(autoSlide, 5000);
    }
    
    // 添加到购物车功能
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前购物车数量
            let count = parseInt(cartCount.textContent);
            
            // 更新购物车数量
            cartCount.textContent = count + 1;
            
            // 显示添加成功提示
            showNotification('已添加到购物车');
            
            // 添加动画效果
            button.classList.add('added');
            setTimeout(() => {
                button.classList.remove('added');
            }, 1000);
        });
    });
    
    // 通知提示功能
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 添加到文档
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            
            // 删除元素
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 产品页面视图切换
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productGrid = document.querySelector('.product-grid');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            productGrid.classList.remove('list-layout');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });
        
        listViewBtn.addEventListener('click', function() {
            productGrid.classList.add('list-layout');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }
    
    // 筛选功能
    const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const applyPriceBtn = document.querySelector('.apply-price');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const tagItems = document.querySelectorAll('.tag-item');
    
    // 标签筛选
    if (tagItems.length > 0) {
        tagItems.forEach(tag => {
            tag.addEventListener('click', function() {
                // 如果点击的是"全部"
                if (tag.textContent.trim() === '全部') {
                    tagItems.forEach(item => {
                        item.classList.toggle('active', item === tag);
                    });
                } else {
                    // 取消选择"全部"
                    tagItems[0].classList.remove('active');
                    // 切换当前标签
                    tag.classList.toggle('active');
                }
            });
        });
    }
    
    // 价格范围
    if (priceRange) {
        // 设置初始值
        minPriceInput.placeholder = `¥0`;
        maxPriceInput.placeholder = `¥${priceRange.max}`;
        
        // 滑块更新
        priceRange.addEventListener('input', function() {
            maxPriceInput.value = this.value;
        });
        
        // 应用价格筛选
        applyPriceBtn.addEventListener('click', function() {
            const min = minPriceInput.value || 0;
            const max = maxPriceInput.value || priceRange.max;
            
            // 这里添加筛选逻辑
            
            showNotification(`价格筛选已应用: ¥${min} - ¥${max}`);
        });
    }
    
    // 清除所有筛选
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // 重置复选框
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = checkbox.id === 'cat1';
            });
            
            // 重置价格范围
            if (priceRange) {
                priceRange.value = priceRange.max / 2;
                minPriceInput.value = '';
                maxPriceInput.value = '';
            }
            
            // 重置标签
            tagItems.forEach(tag => {
                tag.classList.toggle('active', tag.textContent.trim() === '全部');
            });
            
            // 显示通知
            showNotification('已清除所有筛选条件');
        });
    }
    
    // 个人资料编辑功能
    const editBtn = document.querySelector('.edit-btn');
    const profileInputs = document.querySelectorAll('.user-profile-form input:not([type="radio"])');
    const radioInputs = document.querySelectorAll('.user-profile-form input[type="radio"]');
    
    if (editBtn) {
        let isEditing = false;
        
        editBtn.addEventListener('click', function() {
            isEditing = !isEditing;
            
            if (isEditing) {
                // 启用编辑模式
                editBtn.innerHTML = '<i class="fas fa-save"></i> 保存';
                profileInputs.forEach(input => {
                    input.disabled = false;
                });
                radioInputs.forEach(input => {
                    input.disabled = false;
                });
            } else {
                // 保存并禁用编辑模式
                editBtn.innerHTML = '<i class="fas fa-edit"></i> 编辑';
                profileInputs.forEach(input => {
                    input.disabled = true;
                });
                radioInputs.forEach(input => {
                    input.disabled = true;
                });
                
                // 显示保存成功通知
                showNotification('个人资料已更新');
            }
        });
    }
    
    // 响应式交互
    const userIcon = document.querySelector('.user-icon');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (userIcon) {
        userIcon.addEventListener('click', function(e) {
            // 在移动端，增加一个点击事件来切换菜单
            if (window.innerWidth < 768) {
                e.preventDefault();
                // 这里可以添加菜单切换逻辑
            }
        });
    }
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.notification.show {
    bottom: 20px;
    opacity: 1;
}

.product-grid.list-layout {
    grid-template-columns: 1fr;
}

.product-grid.list-layout .product-card {
    display: flex;
    height: 200px;
}

.product-grid.list-layout .product-image {
    width: 200px;
    min-width: 200px;
    height: 100%;
}

.product-grid.list-layout .product-info {
    flex: 1;
}

.product-grid.list-layout .product-info h3 {
    height: auto;
    margin-bottom: 15px;
}

.add-to-cart-btn.added {
    background-color: #2ecc71;
    animation: pulse 1s;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    header .container {
        flex-wrap: wrap;
    }
    
    .logo {
        margin-bottom: 10px;
    }
    
    .search-bar {
        order: 3;
        margin: 10px 0;
        max-width: 100%;
    }
    
    nav {
        flex: 1;
    }
    
    .products-grid-layout {
        grid-template-columns: 1fr;
    }
    
    .filters-sidebar {
        position: fixed;
        top: 0;
        left: -300px;
        height: 100%;
        width: 280px;
        z-index: 1001;
        transition: left 0.3s ease;
        overflow-y: auto;
    }
    
    .filters-sidebar.open {
        left: 0;
    }
    
    .products-controls {
        flex-wrap: wrap;
    }
    
    .products-found {
        width: 100%;
        margin-bottom: 10px;
    }
    
    .profile-layout {
        grid-template-columns: 1fr;
    }
}
`;

document.head.appendChild(style); 
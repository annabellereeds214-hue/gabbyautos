// G-TECH Advanced Website with System Monitoring
document.addEventListener('DOMContentLoaded', function() {
    console.log('G-TECH Advanced Technology Website initialized!');
    
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeSystemMonitoring();
    initializeGrowthAnalytics();
    initializeInteractiveElements();
    initializeAnimations();
    initializeContactForm();
});

// Navigation System
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling and active states
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// System Monitoring Functions
function initializeSystemMonitoring() {
    startCPUMonitoring();
    startMemoryMonitoring();
    startStorageMonitoring();
    startNetworkMonitoring();
    
    // Update system info every 2 seconds
    setInterval(updateSystemMetrics, 2000);
}

function startCPUMonitoring() {
    const cpuProgress = document.querySelector('.monitor-card .circular-progress');
    const cpuText = document.querySelector('.monitor-card .progress-text');
    
    // Simulate CPU usage (in real implementation, you'd use system APIs)
    function updateCPU() {
        const usage = Math.floor(Math.random() * 40) + 30; // 30-70%
        updateCircularProgress(cpuProgress, usage);
        
        // Update CPU info
        document.getElementById('cpu-cores').textContent = navigator.hardwareConcurrency || '4';
        document.getElementById('cpu-freq').textContent = '2.4 GHz';
    }
    
    updateCPU();
    setInterval(updateCPU, 3000);
}

function startMemoryMonitoring() {
    const memoryCards = document.querySelectorAll('.monitor-card');
    const memoryCard = memoryCards[1]; // Second card is memory
    const memoryProgress = memoryCard.querySelector('.circular-progress');
    
    function updateMemory() {
        // Simulate memory usage
        const totalMemory = 16; // GB
        const usedMemory = Math.random() * 8 + 4; // 4-12 GB
        const usage = Math.floor((usedMemory / totalMemory) * 100);
        
        updateCircularProgress(memoryProgress, usage);
        
        document.getElementById('memory-used').textContent = `${usedMemory.toFixed(1)} GB`;
        document.getElementById('memory-total').textContent = `${totalMemory} GB`;
    }
    
    updateMemory();
    setInterval(updateMemory, 4000);
}

function startStorageMonitoring() {
    const storageCards = document.querySelectorAll('.monitor-card');
    const storageCard = storageCards[2]; // Third card is storage
    const storageProgress = storageCard.querySelector('.circular-progress');
    
    function updateStorage() {
        // Simulate storage usage
        const totalStorage = 512; // GB
        const usedStorage = Math.random() * 200 + 150; // 150-350 GB
        const usage = Math.floor((usedStorage / totalStorage) * 100);
        
        updateCircularProgress(storageProgress, usage);
        
        document.getElementById('storage-used').textContent = `${usedStorage.toFixed(0)} GB`;
        document.getElementById('storage-free').textContent = `${(totalStorage - usedStorage).toFixed(0)} GB`;
    }
    
    updateStorage();
    setInterval(updateStorage, 5000);
}

function startNetworkMonitoring() {
    let downloadSpeed = 0;
    let uploadSpeed = 0;
    let ping = 0;
    
    function updateNetwork() {
        // Simulate network activity
        downloadSpeed = Math.random() * 1000 + 500; // 500-1500 KB/s
        uploadSpeed = Math.random() * 200 + 100; // 100-300 KB/s
        ping = Math.floor(Math.random() * 50) + 10; // 10-60 ms
        
        document.getElementById('network-down').textContent = `${downloadSpeed.toFixed(0)} KB/s`;
        document.getElementById('network-up').textContent = `${uploadSpeed.toFixed(0)} KB/s`;
        document.getElementById('network-ping').textContent = `${ping} ms`;
        
        // Update network chart
        updateNetworkChart(downloadSpeed, uploadSpeed);
    }
    
    updateNetwork();
    setInterval(updateNetwork, 2000);
}

function updateCircularProgress(progressElement, percentage) {
    if (!progressElement) return;
    
    const circle = progressElement.querySelector('.progress-circle');
    const text = progressElement.querySelector('.progress-text');
    
    if (circle && text) {
        const degrees = (percentage / 100) * 360;
        circle.style.background = `conic-gradient(#8b5cf6 0deg, #06b6d4 ${degrees}deg, #1e293b ${degrees}deg)`;
        text.textContent = `${percentage}%`;
        
        // Update progress element data
        progressElement.setAttribute('data-percentage', percentage);
    }
}

function updateNetworkChart(download, upload) {
    const canvas = document.getElementById('networkChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw network activity visualization
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Generate wave pattern based on network speed
    for (let x = 0; x < width; x += 2) {
        const y = height/2 + Math.sin((x + Date.now() * 0.01) * 0.1) * (download / 50);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Upload line
    ctx.strokeStyle = '#ffd700';
    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
        const y = height/2 + Math.sin((x + Date.now() * 0.015) * 0.08) * (upload / 20);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

function updateSystemMetrics() {
    // Update active connections
    const connections = Math.floor(Math.random() * 500) + 1000;
    const throughput = (Math.random() * 2 + 1.5).toFixed(1);
    
    const connectionsEl = document.getElementById('active-connections');
    const throughputEl = document.getElementById('data-throughput');
    
    if (connectionsEl) connectionsEl.textContent = connections.toLocaleString();
    if (throughputEl) throughputEl.textContent = `${throughput} GB/s`;
}

// Growth Analytics
function initializeGrowthAnalytics() {
    initializeCharts();
    setupTimePeriodSelector();
    animateMetrics();
}

function initializeCharts() {
    // Initialize all growth charts
    createRevenueChart();
    createUsersChart();
    createSalesChart();
    createMarketChart();
}

function createRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    drawGrowthChart(ctx, canvas.width, canvas.height, '#8b5cf6', generateGrowthData());
}

function createUsersChart() {
    const canvas = document.getElementById('usersChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    drawGrowthChart(ctx, canvas.width, canvas.height, '#06b6d4', generateGrowthData());
}

function createSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    drawGrowthChart(ctx, canvas.width, canvas.height, '#ffd700', generateGrowthData());
}

function createMarketChart() {
    const canvas = document.getElementById('marketChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    drawGrowthChart(ctx, canvas.width, canvas.height, '#22c55e', generateGrowthData());
}

function drawGrowthChart(ctx, width, height, color, data) {
    ctx.clearRect(0, 0, width, height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '10');
    
    ctx.fillStyle = gradient;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    const stepX = width / (data.length - 1);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - (value * height);
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - (value * height);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
}

function generateGrowthData() {
    const data = [];
    let value = 0.3;
    
    for (let i = 0; i < 20; i++) {
        value += (Math.random() - 0.4) * 0.1;
        value = Math.max(0.1, Math.min(0.9, value));
        data.push(value);
    }
    
    return data;
}

function setupTimePeriodSelector() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            timeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Refresh charts with new data
            setTimeout(() => {
                initializeCharts();
            }, 300);
        });
    });
}

function animateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(metric => {
        const finalValue = metric.textContent;
        let currentValue = 0;
        const increment = parseFloat(finalValue.replace(/[^\d.]/g, '')) / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= parseFloat(finalValue.replace(/[^\d.]/g, ''))) {
                metric.textContent = finalValue;
                clearInterval(timer);
            } else {
                if (finalValue.includes('$')) {
                    metric.textContent = `$${currentValue.toFixed(1)}M`;
                } else if (finalValue.includes('K')) {
                    metric.textContent = `${Math.floor(currentValue)}K`;
                } else if (finalValue.includes('%')) {
                    metric.textContent = `${currentValue.toFixed(1)}%`;
                } else {
                    metric.textContent = Math.floor(currentValue).toLocaleString();
                }
            }
        }, 50);
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Parallax effects
    window.addEventListener('scroll', handleParallax);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .product-card, .monitor-card, .analytics-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const bgGlow = document.querySelector('.bg-glow');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (bgGlow) {
        bgGlow.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
    
    // Monitor card interactions
    const monitorCards = document.querySelectorAll('.monitor-card');
    
    monitorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            const progress = this.querySelector('.circular-progress');
            if (progress) {
                progress.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const progress = this.querySelector('.circular-progress');
            if (progress) {
                progress.style.transform = 'scale(1)';
            }
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Animations
function initializeAnimations() {
    // Hologram animations
    animateHologram();
    
    // Neural network animations
    animateNeuralNetwork();
    
    // Particle systems
    createParticleSystem();
    
    // Data stream animations
    animateDataStreams();
}

function animateHologram() {
    const hologramRings = document.querySelectorAll('.hologram-ring');
    
    hologramRings.forEach((ring, index) => {
        ring.style.animationDelay = `${index * 0.5}s`;
        
        // Add pulsing effect
        setInterval(() => {
            ring.style.boxShadow = `0 0 ${20 + Math.random() * 20}px rgba(139, 92, 246, 0.8)`;
        }, 2000 + index * 500);
    });
}

function animateNeuralNetwork() {
    const neuralLines = document.querySelectorAll('.neural-line');
    
    neuralLines.forEach((line, index) => {
        setInterval(() => {
            const intensity = Math.random() * 0.8 + 0.2;
            line.style.opacity = intensity;
            line.style.boxShadow = `0 0 ${intensity * 15}px currentColor`;
        }, 1000 + index * 200);
    });
}

function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle(particleContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #06b6d4, #8b5cf6);
        border-radius: 50%;
        box-shadow: 0 0 ${size * 3}px currentColor;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: float-particle ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0.7;
    `;
    
    container.appendChild(particle);
}

function animateDataStreams() {
    const streams = document.querySelectorAll('.stream');
    
    streams.forEach((stream, index) => {
        setInterval(() => {
            const intensity = Math.random() * 0.8 + 0.2;
            stream.style.opacity = intensity;
            stream.style.boxShadow = `0 0 ${intensity * 10}px currentColor`;
        }, 800 + index * 200);
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showFormSuccess();
            form.reset();
        });
    }
}

function showFormSuccess() {
    const button = document.querySelector('#contactForm .btn-primary');
    const originalText = button.textContent;
    
    button.textContent = 'Message Sent!';
    button.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimization
function optimizePerformance() {
    // Reduce animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        
        if (document.hidden) {
            animatedElements.forEach(element => {
                element.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(element => {
                element.style.animationPlayState = 'running';
            });
        }
    });
    
    // Optimize scroll events
    window.addEventListener('scroll', throttle(handleParallax, 16));
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    optimizePerformance();
    
    // Console welcome message
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                    G-TECH SYSTEMS                        ║
    ║              Advanced Technology Platform                ║
    ║                    Status: ONLINE                        ║
    ║                                                          ║
    ║  🚀 System Monitoring: ACTIVE                           ║
    ║  📊 Growth Analytics: TRACKING                          ║
    ║  🔧 Interactive Features: ENABLED                       ║
    ║  🎨 Animations: RUNNING                                 ║
    ╚══════════════════════════════════════════════════════════╝
    `);
});

// Real-time system updates
setInterval(() => {
    // Update timestamps and dynamic content
    const now = new Date();
    console.log(`System Update: ${now.toLocaleTimeString()}`);
}, 30000);

// Export functions for external use
window.GTechSystem = {
    updateSystemMetrics,
    initializeCharts,
    createRippleEffect,
    optimizePerformance
};
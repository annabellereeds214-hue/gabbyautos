(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();document.addEventListener("DOMContentLoaded",function(){console.log("G-TECH Advanced Technology Website initialized!"),C(),P(),E(),I(),F(),G(),V()});function C(){const t=document.querySelector(".nav-toggle"),e=document.querySelector(".nav-menu"),o=document.querySelectorAll(".nav-link");t&&t.addEventListener("click",function(){t.classList.toggle("active"),e.classList.toggle("active")}),o.forEach(n=>{n.addEventListener("click",function(r){r.preventDefault();const a=this.getAttribute("href"),s=document.querySelector(a);s&&(s.scrollIntoView({behavior:"smooth",block:"start"}),o.forEach(c=>c.classList.remove("active")),this.classList.add("active"),t.classList.remove("active"),e.classList.remove("active"))})}),window.addEventListener("scroll",S)}function S(){const t=document.querySelectorAll("section"),e=document.querySelectorAll(".nav-link"),o=window.scrollY+100;t.forEach((n,r)=>{const a=n.offsetTop,s=n.offsetHeight;if(o>=a&&o<a+s){e.forEach(i=>i.classList.remove("active"));const c=document.querySelector(`a[href="#${n.id}"]`);c&&c.classList.add("active")}})}function E(){x(),b(),w(),M(),setInterval(y,2e3)}function x(){const t=document.querySelector(".monitor-card .circular-progress");document.querySelector(".monitor-card .progress-text");function e(){const o=Math.floor(Math.random()*40)+30;f(t,o),document.getElementById("cpu-cores").textContent=navigator.hardwareConcurrency||"4",document.getElementById("cpu-freq").textContent="2.4 GHz"}e(),setInterval(e,3e3)}function b(){const o=document.querySelectorAll(".monitor-card")[1].querySelector(".circular-progress");function n(){const a=Math.random()*8+4,s=Math.floor(a/16*100);f(o,s),document.getElementById("memory-used").textContent=`${a.toFixed(1)} GB`,document.getElementById("memory-total").textContent="16 GB"}n(),setInterval(n,4e3)}function w(){const o=document.querySelectorAll(".monitor-card")[2].querySelector(".circular-progress");function n(){const a=Math.random()*200+150,s=Math.floor(a/512*100);f(o,s),document.getElementById("storage-used").textContent=`${a.toFixed(0)} GB`,document.getElementById("storage-free").textContent=`${(512-a).toFixed(0)} GB`}n(),setInterval(n,5e3)}function M(){let t=0,e=0,o=0;function n(){t=Math.random()*1e3+500,e=Math.random()*200+100,o=Math.floor(Math.random()*50)+10,document.getElementById("network-down").textContent=`${t.toFixed(0)} KB/s`,document.getElementById("network-up").textContent=`${e.toFixed(0)} KB/s`,document.getElementById("network-ping").textContent=`${o} ms`,L(t,e)}n(),setInterval(n,2e3)}function f(t,e){if(!t)return;const o=t.querySelector(".progress-circle"),n=t.querySelector(".progress-text");if(o&&n){const r=e/100*360;o.style.background=`conic-gradient(#8b5cf6 0deg, #06b6d4 ${r}deg, #1e293b ${r}deg)`,n.textContent=`${e}%`,t.setAttribute("data-percentage",e)}}function L(t,e){const o=document.getElementById("networkChart");if(!o)return;const n=o.getContext("2d"),r=o.width,a=o.height;n.clearRect(0,0,r,a),n.strokeStyle="#8b5cf6",n.lineWidth=2,n.beginPath();for(let s=0;s<r;s+=2){const c=a/2+Math.sin((s+Date.now()*.01)*.1)*(t/50);s===0?n.moveTo(s,c):n.lineTo(s,c)}n.stroke(),n.strokeStyle="#ffd700",n.beginPath();for(let s=0;s<r;s+=2){const c=a/2+Math.sin((s+Date.now()*.015)*.08)*(e/20);s===0?n.moveTo(s,c):n.lineTo(s,c)}n.stroke()}function y(){const t=Math.floor(Math.random()*500)+1e3,e=(Math.random()*2+1.5).toFixed(1),o=document.getElementById("active-connections"),n=document.getElementById("data-throughput");o&&(o.textContent=t.toLocaleString()),n&&(n.textContent=`${e} GB/s`)}function I(){h(),k(),B()}function h(){q(),$(),T(),A()}function q(){const t=document.getElementById("revenueChart");if(!t)return;const e=t.getContext("2d");u(e,t.width,t.height,"#8b5cf6",m())}function $(){const t=document.getElementById("usersChart");if(!t)return;const e=t.getContext("2d");u(e,t.width,t.height,"#06b6d4",m())}function T(){const t=document.getElementById("salesChart");if(!t)return;const e=t.getContext("2d");u(e,t.width,t.height,"#ffd700",m())}function A(){const t=document.getElementById("marketChart");if(!t)return;const e=t.getContext("2d");u(e,t.width,t.height,"#22c55e",m())}function u(t,e,o,n,r){t.clearRect(0,0,e,o);const a=t.createLinearGradient(0,0,0,o);a.addColorStop(0,n+"40"),a.addColorStop(1,n+"10"),t.fillStyle=a,t.strokeStyle=n,t.lineWidth=2;const s=e/(r.length-1);t.beginPath(),t.moveTo(0,o),r.forEach((c,i)=>{const l=i*s,d=o-c*o;t.lineTo(l,d)}),t.lineTo(e,o),t.closePath(),t.fill(),t.beginPath(),r.forEach((c,i)=>{const l=i*s,d=o-c*o;i===0?t.moveTo(l,d):t.lineTo(l,d)}),t.stroke()}function m(){const t=[];let e=.3;for(let o=0;o<20;o++)e+=(Math.random()-.4)*.1,e=Math.max(.1,Math.min(.9,e)),t.push(e);return t}function k(){const t=document.querySelectorAll(".time-btn");t.forEach(e=>{e.addEventListener("click",function(){t.forEach(o=>o.classList.remove("active")),this.classList.add("active"),setTimeout(()=>{h()},300)})})}function B(){document.querySelectorAll(".metric-value").forEach(e=>{const o=e.textContent;let n=0;const r=parseFloat(o.replace(/[^\d.]/g,""))/50,a=setInterval(()=>{n+=r,n>=parseFloat(o.replace(/[^\d.]/g,""))?(e.textContent=o,clearInterval(a)):o.includes("$")?e.textContent=`$${n.toFixed(1)}M`:o.includes("K")?e.textContent=`${Math.floor(n)}K`:o.includes("%")?e.textContent=`${n.toFixed(1)}%`:e.textContent=Math.floor(n).toLocaleString()},50)})}function P(){window.addEventListener("scroll",g);const t={threshold:.1,rootMargin:"0px 0px -50px 0px"},e=new IntersectionObserver(N,t);document.querySelectorAll("section, .service-card, .product-card, .monitor-card, .analytics-card").forEach(o=>{o.classList.add("fade-in"),e.observe(o)})}function g(){const t=window.pageYOffset,e=document.querySelector(".bg-glow"),o=document.querySelector(".hero-visual");e&&(e.style.transform=`translateY(${t*.3}px)`),o&&(o.style.transform=`translateY(${t*.2}px)`)}function N(t){t.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})}function F(){document.querySelectorAll(".product-card").forEach(r=>{r.addEventListener("mouseenter",function(){this.style.transform="translateY(-10px) scale(1.02)"}),r.addEventListener("mouseleave",function(){this.style.transform="translateY(0) scale(1)"})}),document.querySelectorAll(".service-card").forEach(r=>{r.addEventListener("mouseenter",function(){const a=this.querySelector(".service-icon");a&&(a.style.transform="scale(1.1) rotate(5deg)")}),r.addEventListener("mouseleave",function(){const a=this.querySelector(".service-icon");a&&(a.style.transform="scale(1) rotate(0deg)")})}),document.querySelectorAll(".btn-primary, .btn-secondary").forEach(r=>{r.addEventListener("click",function(a){p(this,a)})}),document.querySelectorAll(".monitor-card").forEach(r=>{r.addEventListener("mouseenter",function(){this.style.transform="translateY(-5px)";const a=this.querySelector(".circular-progress");a&&(a.style.transform="scale(1.05)")}),r.addEventListener("mouseleave",function(){this.style.transform="translateY(0)";const a=this.querySelector(".circular-progress");a&&(a.style.transform="scale(1)")})})}function p(t,e){const o=document.createElement("span"),n=t.getBoundingClientRect(),r=Math.max(n.width,n.height),a=e.clientX-n.left-r/2,s=e.clientY-n.top-r/2;o.style.cssText=`
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: ${a}px;
        top: ${s}px;
        width: ${r}px;
        height: ${r}px;
    `,t.style.position="relative",t.style.overflow="hidden",t.appendChild(o),setTimeout(()=>{o.remove()},600)}function G(){z(),D(),Y(),R()}function z(){document.querySelectorAll(".hologram-ring").forEach((e,o)=>{e.style.animationDelay=`${o*.5}s`,setInterval(()=>{e.style.boxShadow=`0 0 ${20+Math.random()*20}px rgba(139, 92, 246, 0.8)`},2e3+o*500)})}function D(){document.querySelectorAll(".neural-line").forEach((e,o)=>{setInterval(()=>{const n=Math.random()*.8+.2;e.style.opacity=n,e.style.boxShadow=`0 0 ${n*15}px currentColor`},1e3+o*200)})}function Y(){const t=document.createElement("div");t.className="floating-particles",t.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `,document.body.appendChild(t);for(let e=0;e<15;e++)O(t)}function O(t,e){const o=document.createElement("div"),n=Math.random()*3+1,r=Math.random()*15+10,a=Math.random()*5;o.style.cssText=`
        position: absolute;
        width: ${n}px;
        height: ${n}px;
        background: radial-gradient(circle, #06b6d4, #8b5cf6);
        border-radius: 50%;
        box-shadow: 0 0 ${n*3}px currentColor;
        left: ${Math.random()*100}%;
        top: 100%;
        animation: float-particle ${r}s linear infinite;
        animation-delay: ${a}s;
        opacity: 0.7;
    `,t.appendChild(o)}function R(){document.querySelectorAll(".stream").forEach((e,o)=>{setInterval(()=>{const n=Math.random()*.8+.2;e.style.opacity=n,e.style.boxShadow=`0 0 ${n*10}px currentColor`},800+o*200)})}function V(){const t=document.getElementById("contactForm");t&&t.addEventListener("submit",function(e){e.preventDefault();const o=new FormData(t);Object.fromEntries(o),K(),t.reset()})}function K(){const t=document.querySelector("#contactForm .btn-primary"),e=t.textContent;t.textContent="Message Sent!",t.style.background="linear-gradient(45deg, #22c55e, #16a34a)",setTimeout(()=>{t.textContent=e,t.style.background=""},3e3)}function H(t,e){let o;return function(){const n=arguments,r=this;o||(t.apply(r,n),o=!0,setTimeout(()=>o=!1,e))}}function v(){document.addEventListener("visibilitychange",()=>{const t=document.querySelectorAll('[style*="animation"]');document.hidden?t.forEach(e=>{e.style.animationPlayState="paused"}):t.forEach(e=>{e.style.animationPlayState="running"})}),window.addEventListener("scroll",H(g,16))}function U(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}document.addEventListener("DOMContentLoaded",function(){U(),v(),console.log(`
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
    `)});setInterval(()=>{console.log(`System Update: ${new Date().toLocaleTimeString()}`)},3e4);window.GTechSystem={updateSystemMetrics:y,initializeCharts:h,createRippleEffect:p,optimizePerformance:v};

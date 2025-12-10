// ==========================================
// 1. IMPORTS (Add these at the very top)
// ==========================================
import wowwImg from './woww.png';
import wheheImg from './whehe.jpg';
import whahaImg from './whaha.png';
import wmakeImg from './wmake.png';
import wskillImg from './wskill.png';
import wgodotImg from './wgodot.png';
import cvPdf from './wcv.pdf';

// ==========================================
// 2. DATA MANAGER
// ==========================================

// I changed the key to '_v2' so your browser ignores the old broken data in LocalStorage
const STORAGE_KEY = 'ann_portfolio_db_v2';

const defaultData = {
    about: {
        bio1: "Hello! I’m Ann Fritz De Luna, a passionate and driven Information Technology student who enjoys turning creative ideas into functional and visually appealing web experiences.",
        bio2: "I value effective communication, adaptability, and accountability, which help me collaborate well in both individual and team settings. As a student leader and active member of various organizations, I’ve honed my leadership and technical skills while balancing academics and extracurriculars.",
        skills: ["JavaScript", "Java", "Node.js", "TypeScript", "HTML & CSS", "Python"]
    },
    certificates: [
        { id: "job1", title: "Microsoft", company: "Excel", date: "May 16, 2023", items: ["Microsoft Excel (Office 2019)", "Administered by: La Consolacion University Philippines", "Language: English", "Passed"] },
        { id: "job2", title: "Microsoft", company: "Access", date: "May 12, 2025", items: ["Microsoft Access Expert (Office 2019)", "Administered by: La Consolacion University Philippines", "Language: English", "Passed"] },
        { id: "job3", title: "Microsoft", company: "Word", date: "May 22, 2022", items: ["Microsoft Word Expert (Office 2019)", "Administered by: La Consolacion University Philippines", "Language: English", "Passed"] }
    ],
    projects: [
        { id: 1, title: 'Job Hunting', tech: 'Job • Hunting • Website', img: wowwImg },
        { id: 2, title: 'Point of Sale', tech: 'Java • Netbeans • MySQL', img: wheheImg },
        { id: 3, title: 'Hotel Reservation', tech: 'Html • JavaScript • CSS', img: whahaImg },
        { id: 4, title: 'Make Cents', tech: 'Capstone • Project', img: wmakeImg },
        { id: 5, title: 'Skill Up', tech: 'Figma • Student • Teacher', img: wskillImg },
        { id: 6, title: 'Jumper', tech: 'GODOT • Game • Play', img: wgodotImg }
    ],
    achievements: [
        { id: 1, title: 'With Honors', desc: "Junior HighSchool With Honors at Saint Anne's Catholic School.", year: '2020' },
        { id: 2, title: 'With Honors', desc: "Senior HighSchool With Honors at Saint Anne's Catholic School.", year: '2022' },
        { id: 3, title: "Dean's Lister", desc: "First Year Dean's Lister Awardee at La Consolacion University Philippines.", year: '2023' },
        { id: 4, title: "Dean's Lister", desc: "Second Year Dean's Lister Awardee at La Consolacion University Philippines.", year: '2024' },
        { id: 5, title: "Dean' Lister", desc: "Third Year Dean's Lister Awardee at La Consolacion University Philippines.", year: '2025' }
    ],
    messages: []
};

const getPortfolioData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData;
    }
    return JSON.parse(data);
};

const renderDynamicContent = () => {
    const data = getPortfolioData();

    // Render About
    const aboutTextContainer = document.querySelector('.about-text');
    if (aboutTextContainer) {
        let skillsHtml = '';
        data.about.skills.forEach(skill => skillsHtml += `<li>${skill}</li>`);
        
        aboutTextContainer.innerHTML = `
            <p>${data.about.bio1}</p>
            <p>${data.about.bio2}</p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul class="skills-list">${skillsHtml}</ul>
        `;
    }

    // Render Certificates
    const certTabsContainer = document.querySelector('.certificate-tabs');
    const certContentContainer = document.querySelector('.certificate-content');
    
    if (certTabsContainer && certContentContainer) {
        let tabsHtml = '';
        let contentHtml = '';
        
        data.certificates.forEach((cert, index) => {
            const isActive = index === 0 ? 'active' : '';
            tabsHtml += `<button class="tab-button ${isActive}" data-tab="${cert.id}">${cert.title} ${cert.company}</button>`;
            
            let itemsHtml = '';
            cert.items.forEach(item => itemsHtml += `<li>${item}</li>`);
            
            contentHtml += `
                <div class="tab-content ${isActive}" id="${cert.id}">
                    <h3>${cert.title} <span class="company">${cert.company}</span></h3>
                    <p class="job-date">${cert.date}</p>
                    <ul class="job-description">
                        ${itemsHtml}
                    </ul>
                </div>
            `;
        });
        
        certTabsContainer.innerHTML = tabsHtml;
        certContentContainer.innerHTML = contentHtml;
    }

    // Render Projects
    const projectsGrid = document.querySelector('.decay-cards-grid');
    if (projectsGrid) {
        let html = '';
        data.projects.forEach(proj => {
            html += `
                <div class="decay-card" data-project="${proj.id}">
                    <canvas class="decay-canvas"></canvas>
                    <img src="${proj.img}" alt="${proj.title}" class="decay-img">
                    <div class="decay-overlay">
                        <h3>${proj.title}</h3>
                        <p>${proj.tech}</p>
                    </div>
                </div>
            `;
        });
        projectsGrid.innerHTML = html;
    }

    // Render Achievements
    const achievementsGrid = document.querySelector('.achievements-spotlight-grid');
    if (achievementsGrid) {
        let html = '';
        const colors = ["rgba(100, 255, 218, 0.25)", "rgba(168, 178, 209, 0.25)"];
        data.achievements.forEach((ach, index) => {
            const color = colors[index % colors.length];
            html += `
                <div class="spotlight-card" data-spotlight-color="${color}">
                    <div class="achievement-card">
                        <div class="achievement-icon">🏆</div>
                        <h3>${ach.title}</h3>
                        <p>${ach.desc}</p>
                        <span class="achievement-year">${ach.year}</span>
                    </div>
                </div>
            `;
        });
        achievementsGrid.innerHTML = html;
    }
};

const initNavigation = () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active")
            const spans = hamburger.querySelectorAll("span")
            if (navMenu.classList.contains("active")) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
                spans[1].style.opacity = "0"
                spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
            } else {
                spans[0].style.transform = "none"
                spans[1].style.opacity = "1"
                spans[2].style.transform = "none"
            }
        })

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active")
                const spans = hamburger.querySelectorAll("span")
                spans[0].style.transform = "none"
                spans[1].style.opacity = "1"
                spans[2].style.transform = "none"
            })
        })
    }

    // Experience Tabs
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabContents = document.querySelectorAll(".tab-content")

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab")
            tabButtons.forEach((btn) => btn.classList.remove("active"))
            tabContents.forEach((content) => content.classList.remove("active"))
            button.classList.add("active")
            const targetEl = document.getElementById(targetTab)
            if (targetEl) targetEl.classList.add("active")
        })
    })

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
                const offsetTop = target.offsetTop - 80
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })

    // Active nav link on scroll
    const sections = document.querySelectorAll(".section, .hero")
    const navLinks = document.querySelectorAll(".nav-link")

    window.addEventListener("scroll", () => {
        let current = ""
        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id")
            }
        })
        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active")
            }
        })
    })
};

// Scroll Animation
const initScrollObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    document.querySelectorAll(".section, .project-card, .achievement-card, .other-project-card").forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(el)
    })
};

// Updated to use the imported PDF file
function downloadCV() {
    const link = document.createElement("a")
    link.href = cvPdf; // Uses the imported variable
    link.download = "AnnFritz_DeLuna_CV.pdf"
    link.target = "_blank" 
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
        document.body.removeChild(link)
    }, 100)
}

// Profile Card
const initProfileCard = () => {
    const wrapper = document.querySelector(".pc-card-wrapper")
    const card = document.querySelector(".pc-card")
    if (!wrapper || !card) return

    const ANIMATION_CONFIG = {
        SMOOTH_DURATION: 600,
        INITIAL_DURATION: 1500,
        INITIAL_X_OFFSET: 70,
        INITIAL_Y_OFFSET: 60,
    }

    const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max)
    const round = (value, precision = 3) => Number.parseFloat(value.toFixed(precision))
    const adjust = (value, fromMin, fromMax, toMin, toMax) =>
        round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))
    const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

    let rafId = null

    const updateCardTransform = (offsetX, offsetY) => {
        const width = card.clientWidth
        const height = card.clientHeight
        const percentX = clamp((100 / width) * offsetX)
        const percentY = clamp((100 / height) * offsetY)
        const centerX = percentX - 50
        const centerY = percentY - 50

        const properties = {
            "--pointer-x": `${percentX}%`,
            "--pointer-y": `${percentY}%`,
            "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
            "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
            "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
            "--pointer-from-top": `${percentY / 100}`,
            "--pointer-from-left": `${percentX / 100}`,
            "--rotate-x": `${round(-(centerX / 5))}deg`,
            "--rotate-y": `${round(centerY / 4)}deg`,
        }

        Object.entries(properties).forEach(([property, value]) => {
            wrapper.style.setProperty(property, value)
        })
    }

    const createSmoothAnimation = (duration, startX, startY) => {
        const startTime = performance.now()
        const targetX = wrapper.clientWidth / 2
        const targetY = wrapper.clientHeight / 2

        const animationLoop = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = clamp(elapsed / duration)
            const easedProgress = easeInOutCubic(progress)
            const currentX = adjust(easedProgress, 0, 1, startX, targetX)
            const currentY = adjust(easedProgress, 0, 1, startY, targetY)
            updateCardTransform(currentX, currentY)
            if (progress < 1) {
                rafId = requestAnimationFrame(animationLoop)
            }
        }
        rafId = requestAnimationFrame(animationLoop)
    }

    const handlePointerMove = (event) => {
        const rect = card.getBoundingClientRect()
        updateCardTransform(event.clientX - rect.left, event.clientY - rect.top)
    }

    const handlePointerEnter = () => {
        if (rafId) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
        wrapper.classList.add("active")
        card.classList.add("active")
    }

    const handlePointerLeave = (event) => {
        createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, event.offsetX, event.offsetY)
        wrapper.classList.remove("active")
        card.classList.remove("active")
    }

    card.addEventListener("pointerenter", handlePointerEnter)
    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)

    const contactBtn = card.querySelector(".pc-contact-btn")
    if (contactBtn) {
        contactBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            const contactSection = document.getElementById("contact")
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
            }
        })
    }

    const initialX = wrapper.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET
    updateCardTransform(initialX, initialY)
    createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY)

    return () => {
        card.removeEventListener("pointerenter", handlePointerEnter)
        card.removeEventListener("pointermove", handlePointerMove)
        card.removeEventListener("pointerleave", handlePointerLeave)
        if (rafId) cancelAnimationFrame(rafId)
    }
}

// Ribbons
const initRibbons = () => {
    const container = document.getElementById("ribbons-container")
    if (!container || !window.OGL) return

    const { Renderer, Transform, Vec3, Color, Polyline } = window.OGL

    const config = {
        colors: ["#FC8EAC", "#64ffda", "#a8b2d1"],
        baseSpring: 0.03,
        baseFriction: 0.9,
        baseThickness: 30,
        offsetFactor: 0.05,
        maxAge: 500,
        pointCount: 50,
        speedMultiplier: 0.6,
        enableFade: false,
        enableShaderEffect: false,
        effectAmplitude: 2,
        backgroundColor: [0, 0, 0, 0],
    }

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true })
    const gl = renderer.gl

    if (Array.isArray(config.backgroundColor) && config.backgroundColor.length === 4) {
        gl.clearColor(...config.backgroundColor)
    } else {
        gl.clearColor(0, 0, 0, 0)
    }

    gl.canvas.style.position = "absolute"
    gl.canvas.style.top = "0"
    gl.canvas.style.left = "0"
    gl.canvas.style.width = "100%"
    gl.canvas.style.height = "100%"
    gl.canvas.style.pointerEvents = "none"
    gl.canvas.style.userSelect = "none"
    gl.canvas.style.touchAction = "none"
    container.appendChild(gl.canvas)

    const scene = new Transform()
    const lines = []

    const vertex = `
        precision highp float;
        attribute vec3 position;
        attribute vec3 next;
        attribute vec3 prev;
        attribute vec2 uv;
        attribute float side;
        uniform vec2 uResolution;
        uniform float uDPR;
        uniform float uThickness;
        uniform float uTime;
        uniform float uEnableShaderEffect;
        uniform float uEffectAmplitude;
        varying vec2 vUV;
        
        vec4 getPosition() {
            vec4 current = vec4(position, 1.0);
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
            vec2 nextScreen = next.xy * aspect;
            vec2 prevScreen = prev.xy * aspect;
            vec2 tangent = normalize(nextScreen - prevScreen);
            vec2 normal = vec2(-tangent.y, tangent.x);
            normal /= aspect;
            normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
            float dist = length(nextScreen - prevScreen);
            normal *= smoothstep(0.0, 0.02, dist);
            float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
            float pixelWidth = current.w * pixelWidthRatio;
            normal *= pixelWidth * uThickness;
            current.xy -= normal * side;
            if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
            }
            return current;
        }
        
        void main() {
            vUV = uv;
            gl_Position = getPosition();
        }
    `

    const fragment = `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uEnableFade;
        varying vec2 vUV;
        void main() {
            float fadeFactor = 1.0;
            if(uEnableFade > 0.5) {
                fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
            }
            gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
        }
    `

    function resize() {
        const width = container.clientWidth
        const height = container.clientHeight
        renderer.setSize(width, height)
        lines.forEach((line) => line.polyline.resize())
    }
    window.addEventListener("resize", resize)

    const center = (config.colors.length - 1) / 2
    config.colors.forEach((color, index) => {
        const spring = config.baseSpring + (Math.random() - 0.5) * 0.05
        const friction = config.baseFriction + (Math.random() - 0.5) * 0.05
        const thickness = config.baseThickness + (Math.random() - 0.5) * 3
        const mouseOffset = new Vec3(
            (index - center) * config.offsetFactor + (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.1,
            0,
        )
        const line = {
            spring,
            friction,
            mouseVelocity: new Vec3(),
            mouseOffset,
            points: Array(config.pointCount).fill(0).map(() => new Vec3())
        }

        line.polyline = new Polyline(gl, {
            points: line.points,
            vertex,
            fragment,
            uniforms: {
                uColor: { value: new Color(color) },
                uThickness: { value: thickness },
                uOpacity: { value: 1.0 },
                uTime: { value: 0.0 },
                uEnableShaderEffect: { value: config.enableShaderEffect ? 1.0 : 0.0 },
                uEffectAmplitude: { value: config.effectAmplitude },
                uEnableFade: { value: config.enableFade ? 1.0 : 0.0 },
            },
        })
        line.polyline.mesh.setParent(scene)
        lines.push(line)
    })

    resize()

    const mouse = new Vec3()
    function updateMouse(e) {
        let x, y
        const rect = container.getBoundingClientRect()
        if (e.changedTouches && e.changedTouches.length) {
            x = e.changedTouches[0].clientX - rect.left
            y = e.changedTouches[0].clientY - rect.top
        } else {
            x = e.clientX - rect.left
            y = e.clientY - rect.top
        }
        const width = container.clientWidth
        const height = container.clientHeight
        mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0)
    }

    document.addEventListener("mousemove", updateMouse)
    document.addEventListener("touchstart", updateMouse)
    document.addEventListener("touchmove", updateMouse)

    const tmp = new Vec3()
    let frameId
    let lastTime = performance.now()
    function update() {
        frameId = requestAnimationFrame(update)
        const currentTime = performance.now()
        const dt = currentTime - lastTime
        lastTime = currentTime

        lines.forEach((line) => {
            tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring)
            line.mouseVelocity.add(tmp).multiply(line.friction)
            line.points[0].add(line.mouseVelocity)

            for (let i = 1; i < line.points.length; i++) {
                if (isFinite(config.maxAge) && config.maxAge > 0) {
                    const segmentDelay = config.maxAge / (line.points.length - 1)
                    const alpha = Math.min(1, (dt * config.speedMultiplier) / segmentDelay)
                    line.points[i].lerp(line.points[i - 1], alpha)
                } else {
                    line.points[i].lerp(line.points[i - 1], 0.9)
                }
            }
            if (line.polyline.mesh.program.uniforms.uTime) {
                line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001
            }
            line.polyline.updateGeometry()
        })
        renderer.render({ scene })
    }
    update()

    return () => {
        window.removeEventListener("resize", resize)
        document.removeEventListener("mousemove", updateMouse)
        document.removeEventListener("touchstart", updateMouse)
        document.removeEventListener("touchmove", updateMouse)
        cancelAnimationFrame(frameId)
        if (gl.canvas && gl.canvas.parentNode === container) {
            container.removeChild(gl.canvas)
        }
    }
}

// Decay Cards
const initDecayCards = () => {
    const cards = document.querySelectorAll(".decay-card")
    cards.forEach((card) => {
        const canvas = card.querySelector(".decay-canvas")
        const img = card.querySelector(".decay-img")
        if (!canvas || !img) return

        canvas.style.pointerEvents = "none"
        const ctx = canvas.getContext("2d")
        let particles = []
        let animationId = null
        let isDecaying = false

        const resizeCanvas = () => {
            canvas.width = card.clientWidth
            canvas.height = card.clientHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        class DecayParticle {
            constructor(x, y, color) {
                this.x = x
                this.y = y
                this.vx = (Math.random() - 0.5) * 4
                this.vy = (Math.random() - 0.5) * 4 - 2
                this.size = Math.random() * 4 + 2
                this.life = 1
                this.decay = Math.random() * 0.02 + 0.01
                this.color = color
                this.rotation = Math.random() * Math.PI * 2
                this.rotationSpeed = (Math.random() - 0.5) * 0.2
            }
            update() {
                this.x += this.vx
                this.y += this.vy
                this.vy += 0.2
                this.life -= this.decay
                this.rotation += this.rotationSpeed
                this.size *= 0.98
            }
            draw(ctx) {
                ctx.save()
                ctx.globalAlpha = this.life
                ctx.translate(this.x, this.y)
                ctx.rotate(this.rotation)
                ctx.fillStyle = this.color
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
                ctx.restore()
            }
            isDead() { return this.life <= 0 || this.size < 0.5 }
        }

        const createParticles = (e) => {
            if (isDecaying) return
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const tempCanvas = document.createElement("canvas")
            const tempCtx = tempCanvas.getContext("2d")
            tempCanvas.width = img.width
            tempCanvas.height = img.height
            tempCtx.drawImage(img, 0, 0)
            const sampleSize = 50
            const particleCount = 30

            for (let i = 0; i < particleCount; i++) {
                const offsetX = (Math.random() - 0.5) * sampleSize
                const offsetY = (Math.random() - 0.5) * sampleSize
                const sampleX = Math.floor(((x + offsetX) / canvas.width) * img.width)
                const sampleY = Math.floor(((y + offsetY) / canvas.height) * img.height)
                const imageData = tempCtx.getImageData(sampleX, sampleY, 1, 1).data
                const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`
                particles.push(new DecayParticle(x + offsetX, y + offsetY, color))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles = particles.filter((particle) => {
                particle.update()
                particle.draw(ctx)
                return !particle.isDead()
            })
            if (particles.length > 0) {
                animationId = requestAnimationFrame(animate)
            } else {
                animationId = null
                isDecaying = false
            }
        }

        const handleMouseMove = (e) => {
            if (Math.random() > 0.7) {
                createParticles(e)
                if (!animationId) animate()
            }
        }
        const handleMouseEnter = () => { isDecaying = true }
        const handleMouseLeave = () => {
            isDecaying = false
            particles = []
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (animationId) {
                cancelAnimationFrame(animationId)
                animationId = null
            }
        }

        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mousemove", handleMouseMove)
        card.addEventListener("mouseleave", handleMouseLeave)
    })
}

// Click Spark
const initClickSpark = () => {
    const canvas = document.getElementById("global-click-spark-canvas")
    if (!canvas) return
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    const ctx = canvas.getContext("2d")
    const sparks = []
    const config = {
        sparkColor: "#64ffda",
        sparkSize: 10,
        sparkRadius: 15,
        sparkCount: 8,
        duration: 400,
        easing: "ease-out",
        extraScale: 1.0,
    }

    const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const easeFunc = (t) => {
        switch (config.easing) {
            case "linear": return t
            case "ease-in": return t * t
            case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            default: return t * (2 - t)
        }
    }

    let animationId
    const draw = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = sparks.length - 1; i >= 0; i--) {
            const spark = sparks[i]
            const elapsed = timestamp - spark.startTime
            if (elapsed >= config.duration) {
                sparks.splice(i, 1)
                continue
            }
            const progress = elapsed / config.duration
            const eased = easeFunc(progress)
            const distance = eased * config.sparkRadius * config.extraScale
            const lineLength = config.sparkSize * (1 - eased)
            const x1 = spark.x + distance * Math.cos(spark.angle)
            const y1 = spark.y + distance * Math.sin(spark.angle)
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)
            ctx.strokeStyle = config.sparkColor
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
        }
        animationId = requestAnimationFrame(draw)
    }
    animationId = requestAnimationFrame(draw)

    const handleClick = (e) => {
        const x = e.clientX
        const y = e.clientY
        const now = performance.now()
        for (let i = 0; i < config.sparkCount; i++) {
            sparks.push({
                x, y,
                angle: (2 * Math.PI * i) / config.sparkCount,
                startTime: now,
            })
        }
    }
    document.addEventListener("click", handleClick)
    return () => {
        window.removeEventListener("resize", resizeCanvas)
        document.removeEventListener("click", handleClick)
        cancelAnimationFrame(animationId)
    }
}

// EmailJS
document.addEventListener("DOMContentLoaded", function () {
    if (!window.emailjs) {
        console.error("EmailJS SDK not loaded.");
        return;
    }
    emailjs.init("RBSz6aEQzzIQUv3ft"); 
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nameEl = document.getElementById("name");
            const emailEl = document.getElementById("email");
            const messageEl = document.getElementById("message");
            const submitBtn = contactForm.querySelector('[type="submit"]');

            const name = nameEl ? nameEl.value.trim() : "";
            const email = emailEl ? emailEl.value.trim() : "";
            const message = messageEl ? messageEl.value.trim() : "";

            // Check if local DB message saving is needed
            const dbData = getPortfolioData();
            dbData.messages.push({
                id: Date.now(),
                name, email, msg: message
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dbData));

            if (!name || !email || !message) {
                alert("Please fill in your name, email and message before sending.");
                return;
            }

            if (submitBtn) submitBtn.disabled = true;
            if (submitBtn) submitBtn.textContent = "Sending...";

            const templateParams = { name: name, email: email, message: message };

            emailjs.send("service_v7mocoa", "template_84ia51p", templateParams, "RBSz6aEQzzIQUv3ft")
                .then(function (response) {
                    alert("✅ Message sent successfully!");
                    contactForm.reset();
                })
                .catch(function (error) {
                    alert("❌ Failed to send message. Please try again later.");
                    console.error("EmailJS error:", error);
                })
                .finally(function () {
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitBtn) submitBtn.textContent = "Send Message";
                });
        });
    }
});

// ===================================
// Floating GIF Widget Logic
// ===================================
const initFloatingGif = () => {
    const triggerBtn = document.getElementById('meme-trigger');
    const popup = document.getElementById('meme-popup');
    const closeBtn = document.getElementById('meme-close');
    const refreshBtn = document.getElementById('meme-refresh');
    const memeImg = document.getElementById('meme-img');
    const memeCaption = document.getElementById('meme-caption');
    const memeLoader = document.getElementById('meme-loader');
    const memeError = document.getElementById('meme-error');

    if (!triggerBtn || !popup) return;

    const fetchGif = async () => {
        if (memeLoader) memeLoader.style.display = 'block';
        if (memeImg) memeImg.style.display = 'none';
        if (memeError) memeError.style.display = 'none';
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.textContent = "Fetching...";
        }
        if (memeCaption) memeCaption.textContent = '';

        try {
            // GIF specific subreddits
            const subreddits = ['gifs', 'wholesomegifs', 'educationalgifs', 'funnygifs'];
            const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
            
            const response = await fetch(`https://meme-api.com/gimme/${randomSub}`);
            
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();
            
            if (!data || !data.url) throw new Error("Invalid GIF data received");

            if (memeImg) {
                memeImg.src = data.url;
                memeImg.onload = () => {
                    if (memeLoader) memeLoader.style.display = 'none';
                    memeImg.style.display = 'block';
                    if (refreshBtn) {
                        refreshBtn.disabled = false;
                        refreshBtn.textContent = "Next GIF 🤣";
                    }
                };
                memeImg.onerror = () => {
                    console.error("Image failed to load");
                    if (memeLoader) memeLoader.style.display = 'none';
                    if (memeError) memeError.style.display = 'block';
                    if (refreshBtn) {
                        refreshBtn.disabled = false;
                        refreshBtn.textContent = "Try Again";
                    }
                };
            }
            if (memeCaption) memeCaption.textContent = data.title;
        } catch (error) {
            console.error("GIF API Error:", error);
            if (memeLoader) memeLoader.style.display = 'none';
            if (memeError) memeError.style.display = 'block';
            if (refreshBtn) {
                refreshBtn.disabled = false;
                refreshBtn.textContent = "Try Again";
            }
        }
    };

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const isActive = popup.classList.contains('active');
        if (isActive) {
            popup.classList.remove('active');
        } else {
            popup.classList.add('active');
            const isImgHidden = !memeImg.src || memeImg.style.display === 'none';
            if (isImgHidden) {
                fetchGif();
            }
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.classList.remove('active');
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fetchGif();
        });
    }

    document.addEventListener('click', (e) => {
        if (popup.classList.contains('active') && 
            !popup.contains(e.target) && 
            !triggerBtn.contains(e.target)) {
            popup.classList.remove('active');
        }
    });
};

// ===================================
// API Playground (Terminal Widget) Logic
// ===================================
const initApiPlayground = () => {
    const fetchBtn = document.getElementById('fetch-joke-btn');
    const output = document.getElementById('terminal-text');
    
    if (!fetchBtn || !output) return;

    fetchBtn.addEventListener('click', async () => {
        // Loading State
        output.textContent = "Connecting to remote server...";
        fetchBtn.textContent = "FETCHING...";
        fetchBtn.disabled = true;
        fetchBtn.style.cursor = 'wait';

        try {
            // Using jokeapi for programming jokes
            const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
            const data = await response.json();
            
            // Artificial delay for effect
            setTimeout(() => {
                if (data.error) {
                    output.textContent = "// Error: 400 Bad Request";
                    output.style.color = "#ff5f56";
                } else {
                    // Handle both single and two-part jokes, though query is set to single
                    const jokeText = data.joke || `${data.setup}\n${data.delivery}`;
                    output.textContent = `// Success: 200 OK\n\n"${jokeText}"`;
                    output.style.color = "var(--green)";
                }
                
                // Reset Button
                fetchBtn.textContent = "RUN SCRIPT";
                fetchBtn.disabled = false;
                fetchBtn.style.cursor = 'pointer';
            }, 800);

        } catch (error) {
            output.textContent = "// Error: 404 Humor Not Found (Network Error)";
            output.style.color = "#ff5f56";
            
            fetchBtn.textContent = "RETRY";
            fetchBtn.disabled = false;
            fetchBtn.style.cursor = 'pointer';
        }
    });
}

const initGooeyNav = () => {}
const initSpotlightCards = () => {}

function initAll() {
    // 1. Render content from "Database" (LocalStorage) first
    renderDynamicContent();
    
    // 2. Initialize Navigation (Event listeners need to attach to new elements)
    initNavigation();
    
    // 3. Initialize Animations & Interactions
    initScrollObserver();
    initGooeyNav();
    initProfileCard();
    initDecayCards(); // Attaches to .decay-card (which are now dynamic)
    initSpotlightCards();
    initClickSpark();
    initRibbons();
    initFloatingGif();
    initApiPlayground();
    console.log("Portfolio loaded successfully! 🚀");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}

window.THREE = window.THREE || {}
window.OGL = window.OGL || {}
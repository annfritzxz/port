// ==========================================
// 1. DATA MANAGER
// ==========================================

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
        { id: 1, title: 'Job Hunting', tech: 'Job • Hunting • Website', img: 'woww.png' },
        { id: 2, title: 'Point of Sale', tech: 'Java • Netbeans • MySQL', img: 'whehe.jpg' },
        { id: 3, title: 'Hotel Reservation', tech: 'Html • JavaScript • CSS', img: 'whaha.png' },
        { id: 4, title: 'Make Cents', tech: 'Capstone • Project', img: 'wmake.png' },
        { id: 5, title: 'Skill Up', tech: 'Figma • Student • Teacher', img: 'wskill.png' },
        { id: 6, title: 'Jumper', tech: 'GODOT • Game • Play', img: 'wgodot.png' }
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
        // If nothing is in storage, save default and return it
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData;
    }
    return JSON.parse(data);
};

const updatePortfolioData = (updatedData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    renderDynamicContent();
};

const renderDynamicContent = () => {
    const data = getPortfolioData();

    // 1. Render About
    const aboutTextContainer = document.querySelector('.about-text');
    if (aboutTextContainer) {
        let skillsHtml = '';
        if(data.about && data.about.skills) {
            data.about.skills.forEach(skill => skillsHtml += `<li>${skill}</li>`);
            
            aboutTextContainer.innerHTML = `
                <p>${data.about.bio1}</p>
                <p>${data.about.bio2}</p>
                <p>Here are a few technologies I've been working with recently:</p>
                <ul class="skills-list">${skillsHtml}</ul>
            `;
        }
    }

    // 2. Render Certificates
    const certTabsContainer = document.querySelector('.certificate-tabs');
    const certContentContainer = document.querySelector('.certificate-content');
    
    if (certTabsContainer && certContentContainer && data.certificates) {
        let tabsHtml = '';
        let contentHtml = '';
        
        data.certificates.forEach((cert, index) => {
            const isActive = index === 0 ? 'active' : '';
            tabsHtml += `<button class="tab-button ${isActive}" data-tab="${cert.id}">${cert.title}</button>`;
            
            let itemsHtml = '';
            if(cert.items) {
                cert.items.forEach(item => itemsHtml += `<li>${item}</li>`);
            }
            
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
        
        // Re-attach listeners because we replaced the HTML
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const targetContent = document.getElementById(tabName);
                if(targetContent) targetContent.classList.add('active');
            });
        });
    }

    // 3. Render Projects
    const projectsGrid = document.querySelector('.decay-cards-grid');
    if (projectsGrid && data.projects) {
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
        // Re-initialize hover effects on new cards
        setTimeout(initDecayCards, 100); 
    }

    // 4. Render Achievements
    const achievementsGrid = document.querySelector('.achievements-spotlight-grid');
    if (achievementsGrid && data.achievements) {
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
        // Prevent double init
        if(card.dataset.init === "true") return;
        card.dataset.init = "true";

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
    
    // Check contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            const submitBtn = contactForm.querySelector('[type="submit"]');

            // Save to LocalStorage for Admin Panel
            const dbData = getPortfolioData();
            if(!dbData.messages) dbData.messages = [];
            dbData.messages.push({
                id: Date.now(),
                name: name,
                email: email,
                msg: message
            });
            updatePortfolioData(dbData);
            // Trigger update for admin if open
            window.dispatchEvent(new Event('storage'));

            if (!name || !email || !message) {
                alert("Please fill in your name, email and message before sending.");
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            const templateParams = { name: name, email: email, message: message };

            // Note: Update your Service ID and Template ID here
            emailjs.send("service_v7mocoa", "template_84ia51p", templateParams)
                .then(function (response) {
                    alert("✅ Message sent successfully!");
                    contactForm.reset();
                })
                .catch(function (error) {
                    // For demo purposes, we alert success because the data IS saved to Admin
                    alert("✅ Message sent to Admin Panel!");
                    contactForm.reset();
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Send Message";
                    }
                });
        });
    }
});

// ===================================
// Floating GIF Widget Logic
// ===================================
const initFloatingGif = () => {
    // Logic is handled in index.html script block mostly, 
    // but we can ensure initialization here if elements exist dynamically
}

const initGooeyNav = () => {}
const initSpotlightCards = () => {}

// ===================================
// AUTO-UPDATE LISTENER (The Magic Part)
// ===================================
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        console.log("Data changed in Admin, updating Portfolio...");
        renderDynamicContent();
    }
});


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
    
    console.log("Portfolio loaded successfully! 🚀");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}

window.THREE = window.THREE || {}
window.OGL = window.OGL || {}
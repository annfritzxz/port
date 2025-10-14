// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger
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

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Experience Tabs
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked button and corresponding content
    button.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Smooth Scroll with offset for fixed nav
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

// Scroll Animation - Fade in elements
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

// Observe all sections and cards
document.querySelectorAll(".section, .project-card, .achievement-card, .other-project-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
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

// Download CV Function
// Download CV Function
function downloadCV() {
  // Create a temporary anchor element
  const link = document.createElement("a")
  link.href = "cv.pdf"
  link.download = "AnnFritz_DeLuna_CV.pdf"
  link.target = "_blank" // Fallback for browsers that don't support download attribute

  // Append to body, click, and remove
  document.body.appendChild(link)
  link.click()

  // Clean up
  setTimeout(() => {
    document.body.removeChild(link)
  }, 100)
}

// Profile Card Effect
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

  // Add event listeners
  card.addEventListener("pointerenter", handlePointerEnter)
  card.addEventListener("pointermove", handlePointerMove)
  card.addEventListener("pointerleave", handlePointerLeave)

  // Handle contact button click
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

  // Initial animation
  const initialX = wrapper.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET
  const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET

  updateCardTransform(initialX, initialY)
  createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY)

  // Cleanup
  return () => {
    card.removeEventListener("pointerenter", handlePointerEnter)
    card.removeEventListener("pointermove", handlePointerMove)
    card.removeEventListener("pointerleave", handlePointerLeave)
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  }
}

// Ribbons cursor effect
const initRibbons = () => {
  const container = document.getElementById("ribbons-container")
  if (!container || !window.OGL) return

  const { Renderer, Transform, Vec3, Color, Polyline } = window.OGL

  // Configuration
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
    gl.clearColor(
      config.backgroundColor[0],
      config.backgroundColor[1],
      config.backgroundColor[2],
      config.backgroundColor[3],
    )
  } else {
    gl.clearColor(0, 0, 0, 0)
  }

  gl.canvas.style.position = "absolute"
  gl.canvas.style.top = "0"
  gl.canvas.style.left = "0"
  gl.canvas.style.width = "100%"
  gl.canvas.style.height = "100%"
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
    }

    const count = config.pointCount
    const points = []
    for (let i = 0; i < count; i++) {
      points.push(new Vec3())
    }
    line.points = points

    line.polyline = new Polyline(gl, {
      points,
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

// Decay Card Effect
const initDecayCards = () => {
  const cards = document.querySelectorAll(".decay-card")

  cards.forEach((card) => {
    const canvas = card.querySelector(".decay-canvas")
    const img = card.querySelector(".decay-img")

    if (!canvas || !img) return

    const ctx = canvas.getContext("2d")
    let particles = []
    let animationId = null
    let isDecaying = false

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = card.clientWidth
      canvas.height = card.clientHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
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
        this.vy += 0.2 // Gravity
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

      isDead() {
        return this.life <= 0 || this.size < 0.5
      }
    }

    // Create particles from image
    const createParticles = (e) => {
      if (isDecaying) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create temporary canvas to sample image colors
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      tempCanvas.width = img.width
      tempCanvas.height = img.height
      tempCtx.drawImage(img, 0, 0)

      // Sample area around mouse position
      const sampleSize = 50
      const particleCount = 30

      for (let i = 0; i < particleCount; i++) {
        const offsetX = (Math.random() - 0.5) * sampleSize
        const offsetY = (Math.random() - 0.5) * sampleSize
        const sampleX = Math.floor(((x + offsetX) / canvas.width) * img.width)
        const sampleY = Math.floor(((y + offsetY) / canvas.height) * img.height)

        // Get pixel color
        const imageData = tempCtx.getImageData(sampleX, sampleY, 1, 1).data
        const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`

        particles.push(new DecayParticle(x + offsetX, y + offsetY, color))
      }
    }

    // Animation loop
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

    // Event handlers
    const handleMouseMove = (e) => {
      if (Math.random() > 0.7) {
        // Only create particles 30% of the time for performance
        createParticles(e)
        if (!animationId) {
          animate()
        }
      }
    }

    const handleMouseEnter = () => {
      isDecaying = true
    }

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

// Global Click Spark Effect
const initClickSpark = () => {
  const canvas = document.getElementById("global-click-spark-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const sparks = []

  // Configuration
  const config = {
    sparkColor: "#64ffda",
    sparkSize: 10,
    sparkRadius: 15,
    sparkCount: 8,
    duration: 400,
    easing: "ease-out",
    extraScale: 1.0,
  }

  // Resize canvas to fill window
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Easing function
  const easeFunc = (t) => {
    switch (config.easing) {
      case "linear":
        return t
      case "ease-in":
        return t * t
      case "ease-in-out":
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      default:
        return t * (2 - t) // ease-out
    }
  }

  // Animation loop
  let animationId
  const draw = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw sparks
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

  // Handle clicks
  const handleClick = (e) => {
    const x = e.clientX
    const y = e.clientY
    const now = performance.now()

    // Create new sparks
    for (let i = 0; i < config.sparkCount; i++) {
      sparks.push({
        x,
        y,
        angle: (2 * Math.PI * i) / config.sparkCount,
        startTime: now,
      })
    }
  }

  document.addEventListener("click", handleClick)

  // Cleanup
  return () => {
    window.removeEventListener("resize", resizeCanvas)
    document.removeEventListener("click", handleClick)
    cancelAnimationFrame(animationId)
  }
}

// Initialize all effects after DOM is loaded
const initGooeyNav = () => {}
const initSpotlightCards = () => {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initGooeyNav()
    initProfileCard() // Initialize profile card
    initDecayCards()
    initSpotlightCards()
    initClickSpark()
    initRibbons()
  })
} else {
  initGooeyNav()
  initProfileCard() // Initialize profile card
  initDecayCards()
  initSpotlightCards()
  initClickSpark()
  initRibbons()
}

console.log("Portfolio loaded successfully! 🚀")

// Declare easeFunc
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

// Declare THREE variable
window.THREE = window.THREE || {}

// Declare OGL variable
window.OGL = window.OGL || {}

// Additional updates can be added here if needed

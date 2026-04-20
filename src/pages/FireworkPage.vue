<template>
  <div class="firework-page" ref="pageRef">
    <!-- SEO H1 Tag (visually hidden for full-screen experience) -->
    <h1 class="sr-only">{{ t('firework.title') }} - {{ t('siteName') }}</h1>
    <div class="loading-init" v-if="loading">
      <div class="loading-init__header">{{ t('firework.loading') }}</div>
      <div class="loading-init__status">{{ loadingStatus }}</div>
    </div>

    <div class="stage-container" ref="stageContainer">
      <div class="background-layer" ref="backgroundLayer"></div>
      <div class="canvas-container" ref="canvasContainer">
        <canvas id="trails-canvas" ref="trailsCanvas"></canvas>
        <canvas id="main-canvas" ref="mainCanvas"></canvas>
      </div>
    </div>

    <div class="controls" v-if="!loading">
      <div class="btn pause-btn" @click="togglePause">
        <svg v-if="isPaused" fill="white" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else fill="white" width="24" height="24" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </div>
      <div class="btn sound-btn" @click="toggleSound">
        <svg v-if="soundEnabled" fill="white" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
        <svg v-else fill="white" width="24" height="24" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      </div>
      <div class="btn settings-btn" @click="showSettings = !showSettings">
        <svg fill="white" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
        </svg>
      </div>
    </div>

    <div class="menu" :class="{ hide: !showSettings }">
      <div class="menu__inner-wrap">
        <div class="btn btn--bright close-menu-btn" @click="showSettings = false">
          <svg fill="white" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
        <div class="menu__header">{{ t('firework.settings') }}</div>
        <div class="menu__subheader">{{ t('firework.settingsHint') }}</div>
        <form @submit.prevent>
          <div class="form-option form-option--select">
            <label>{{ t('firework.shellType') }}</label>
            <select v-model="shellType">
              <option value="Random">{{ t('firework.types.random') }}</option>
              <option value="Crackle">{{ t('firework.types.crackle') }}</option>
              <option value="Crossette">{{ t('firework.types.crossette') }}</option>
              <option value="Crysanthemum">{{ t('firework.types.crysanthemum') }}</option>
              <option value="Falling Leaves">{{ t('firework.types.fallingLeaves') }}</option>
              <option value="Floral">{{ t('firework.types.floral') }}</option>
              <option value="Ghost">{{ t('firework.types.ghost') }}</option>
              <option value="Horse Tail">{{ t('firework.types.horseTail') }}</option>
              <option value="Palm">{{ t('firework.types.palm') }}</option>
              <option value="Ring">{{ t('firework.types.ring') }}</option>
              <option value="Strobe">{{ t('firework.types.strobe') }}</option>
              <option value="Willow">{{ t('firework.types.willow') }}</option>
            </select>
          </div>
          <div class="form-option form-option--select">
            <label>{{ t('firework.shellSize') }}</label>
            <select v-model="shellSize">
              <option value="1">3"</option>
              <option value="2">4"</option>
              <option value="3">6"</option>
              <option value="4">8"</option>
              <option value="5">12"</option>
            </select>
          </div>
          <div class="form-option form-option--select">
            <label>{{ t('firework.quality') }}</label>
            <select v-model="quality">
              <option value="1">{{ t('firework.qualityLow') }}</option>
              <option value="2">{{ t('firework.qualityMedium') }}</option>
              <option value="3">{{ t('firework.qualityHigh') }}</option>
            </select>
          </div>
          <div class="form-option form-option--select">
            <label>{{ t('firework.skyLighting') }}</label>
            <select v-model="skyLighting">
              <option value="0">{{ t('firework.skyLightingNone') }}</option>
              <option value="1">{{ t('firework.skyLightingDim') }}</option>
              <option value="2">{{ t('firework.skyLightingNormal') }}</option>
            </select>
          </div>
          <div class="form-option form-option--checkbox">
            <label>{{ t('firework.autoLaunch') }}</label>
            <input type="checkbox" v-model="autoLaunch" />
          </div>
          <div class="form-option form-option--checkbox">
            <label>{{ t('firework.finaleMode') }}</label>
            <input type="checkbox" v-model="finaleMode" />
          </div>
          <div class="form-option form-option--checkbox form-option--fullscreen">
            <label>{{ t('firework.fullscreen') }}</label>
            <input type="checkbox" v-model="fullscreen" @change="toggleFullscreen" />
          </div>
        </form>
      </div>
    </div>

    <div class="back-btn" @click="goBack">
      <svg fill="white" width="24" height="24" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      <span>{{ t('firework.back') }}</span>
    </div>

    <div class="lang-btn" @click="toggleLanguage">
      <span>{{ currentLocale === 'zh-CN' ? 'EN' : '中文' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import defaultBgImage from '../assets/images/guchen_yanhua.jpeg';

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

const currentLocale = computed(() => locale.value);

// 状态
const loading = ref(true);
const loadingStatus = ref(t('firework.loadingStatus'));
const isPaused = ref(false);
const soundEnabled = ref(true);
const showSettings = ref(false);
const shellType = ref('Random');
const shellSize = ref('2');
const quality = ref('2');
const skyLighting = ref('2');
const autoLaunch = ref(true);
const finaleMode = ref(false);
const fullscreen = ref(false);

// DOM refs
const stageContainer = ref<HTMLElement | null>(null);
const backgroundLayer = ref<HTMLElement | null>(null);
const canvasContainer = ref<HTMLElement | null>(null);
const trailsCanvas = ref<HTMLCanvasElement | null>(null);
const mainCanvas = ref<HTMLCanvasElement | null>(null);

// 烟花引擎实例
let fireworkEngine: FireworkEngine | null = null;

// 初始化时根据 URL 路径设置语言
onMounted(() => {
  // 优先根据 URL 路径判断语言
  const path = route.path;
  if (path.startsWith('/en')) {
    locale.value = 'en';
    localStorage.setItem('locale', 'en');
  } else {
    locale.value = 'zh-CN';
    localStorage.setItem('locale', 'zh-CN');
  }

  initFirework();
});

onUnmounted(() => {
  if (fireworkEngine) {
    fireworkEngine.destroy();
    fireworkEngine = null;
  }
});

function goBack() {
  // 使用 hash 滚动到首页的数字烟花区域
  const currentPath = route.path;
  if (currentPath.startsWith('/en')) {
    router.push('/en#firework-section');
  } else {
    router.push('/#firework-section');
  }
}

function toggleLanguage() {
  const currentPath = route.path;
  let newPath = '';

  if (currentPath === '/firework') {
    newPath = '/en/firework';
  } else if (currentPath === '/en/firework') {
    newPath = '/firework';
  } else if (currentPath.startsWith('/en')) {
    newPath = currentPath.replace('/en', '') || '/';
  } else {
    newPath = '/en' + currentPath;
  }

  const newLocale = newPath.startsWith('/en') ? 'en' : 'zh-CN';
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);

  // 使用 replace 而不是 push，这样语言切换不会添加新的历史记录
  // 退出时 back() 会正确返回到之前的位置
  router.replace(newPath);
}

function togglePause() {
  isPaused.value = !isPaused.value;
  if (fireworkEngine) {
    fireworkEngine.setPaused(isPaused.value);
  }
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value;
  if (fireworkEngine) {
    fireworkEngine.setSoundEnabled(soundEnabled.value);
  }
}

function toggleFullscreen() {
  if (fullscreen.value) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// 监听设置变化
watch([shellType, shellSize, quality, skyLighting, autoLaunch, finaleMode], () => {
  if (fireworkEngine) {
    fireworkEngine.updateConfig({
      shellType: shellType.value,
      shellSize: parseInt(shellSize.value),
      quality: parseInt(quality.value),
      skyLighting: parseInt(skyLighting.value),
      autoLaunch: autoLaunch.value,
      finaleMode: finaleMode.value
    });
  }
});

function initFirework() {
  loadingStatus.value = t('firework.initializing');

  if (!trailsCanvas.value || !mainCanvas.value || !canvasContainer.value || !stageContainer.value || !backgroundLayer.value) {
    return;
  }

  fireworkEngine = new FireworkEngine(
    trailsCanvas.value,
    mainCanvas.value,
    canvasContainer.value,
    stageContainer.value,
    backgroundLayer.value,
    {
      shellType: shellType.value,
      shellSize: parseInt(shellSize.value),
      quality: parseInt(quality.value),
      skyLighting: parseInt(skyLighting.value),
      autoLaunch: autoLaunch.value,
      finaleMode: finaleMode.value,
      soundEnabled: soundEnabled.value,
      backgroundImage: defaultBgImage
    },
    () => {
      loading.value = false;
    }
  );
}

// ========== 烟花引擎类 ==========

class FireworkEngine {
  private trailsCanvas: HTMLCanvasElement;
  private mainCanvas: HTMLCanvasElement;
  private canvasContainer: HTMLElement;
  private stageContainer: HTMLElement;
  private backgroundLayer: HTMLElement;
  private trailsCtx: CanvasRenderingContext2D;
  private mainCtx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private dpr: number = 1;
  private config: any;
  private onReady: () => void;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private soundEnabled: boolean = true;
  private audioCtx: AudioContext | null = null;
  private audioBuffers: Record<string, AudioBuffer[]> = {};
  private stars: any[] = [];
  private sparks: any[] = [];
  private shells: any[] = [];
  private autoLaunchTimer: number = 0;
  private animationId: number = 0;
  private resizeHandler: () => void;
  private pointerHandler: (e: MouseEvent | TouchEvent) => void;

  // 常量
  private readonly GRAVITY = 0.9;
  private readonly COLOR = {
    Red: "#ff0043",
    Green: "#14fc56",
    Blue: "#1e7fff",
    Purple: "#e60aff",
    Gold: "#ffbf36",
    White: "#ffffff",
  };
  private readonly PI2 = Math.PI * 2;

  constructor(
    trailsCanvas: HTMLCanvasElement,
    mainCanvas: HTMLCanvasElement,
    canvasContainer: HTMLElement,
    stageContainer: HTMLElement,
    backgroundLayer: HTMLElement,
    config: any,
    onReady: () => void
  ) {
    this.trailsCanvas = trailsCanvas;
    this.mainCanvas = mainCanvas;
    this.canvasContainer = canvasContainer;
    this.stageContainer = stageContainer;
    this.backgroundLayer = backgroundLayer;
    this.config = config;
    this.onReady = onReady;

    this.trailsCtx = trailsCanvas.getContext('2d')!;
    this.mainCtx = mainCanvas.getContext('2d')!;
    this.dpr = window.devicePixelRatio || 1;

    // 设置背景
    this.setBackground();

    // 初始化尺寸
    this.resizeHandler = () => this.resize();
    window.addEventListener('resize', this.resizeHandler);
    this.resize();

    // 点击发射烟花
    this.pointerHandler = (e) => this.handlePointer(e);
    this.mainCanvas.addEventListener('click', this.pointerHandler);
    this.mainCanvas.addEventListener('touchstart', this.pointerHandler);

    // 加载音频
    this.loadAudio().then(() => {
      this.isRunning = true;
      this.onReady();
      this.tick();
    }).catch(() => {
      this.isRunning = true;
      this.onReady();
      this.tick();
    });
  }

  private setBackground() {
    if (this.config.backgroundImage) {
      this.backgroundLayer.style.backgroundImage = `url(${this.config.backgroundImage})`;
      this.backgroundLayer.style.backgroundSize = 'cover';
      this.backgroundLayer.style.backgroundPosition = 'center';
      this.backgroundLayer.style.opacity = '0.3'; // 透明度降低，防止遮盖烟花
    } else {
      this.backgroundLayer.style.backgroundImage = '';
      this.backgroundLayer.style.opacity = '0';
    }
    // canvas 容器保持透明
    this.canvasContainer.style.backgroundColor = 'transparent';
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.trailsCanvas.width = this.width * this.dpr;
    this.trailsCanvas.height = this.height * this.dpr;
    this.trailsCanvas.style.width = this.width + 'px';
    this.trailsCanvas.style.height = this.height + 'px';

    this.mainCanvas.width = this.width * this.dpr;
    this.mainCanvas.height = this.height * this.dpr;
    this.mainCanvas.style.width = this.width + 'px';
    this.mainCanvas.style.height = this.height + 'px';

    this.stageContainer.style.width = this.width + 'px';
    this.stageContainer.style.height = this.height + 'px';
  }

  private async loadAudio() {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    this.audioCtx = new AudioCtx();

    const audioFiles = {
      lift: ['lift1.mp3', 'lift2.mp3', 'lift3.mp3'],
      burst: ['burst1.mp3', 'burst2.mp3'],
      crackle: ['crackle1.mp3', 'crackle-sm-1.mp3']
    };

    for (const [type, files] of Object.entries(audioFiles)) {
      this.audioBuffers[type] = [];
      for (const file of files) {
        try {
          const response = await fetch(`/firework/audio/${file}`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
          this.audioBuffers[type].push(audioBuffer);
        } catch (e) {
          // 忽略加载失败
        }
      }
    }
  }

  private playSound(type: string) {
    if (!this.soundEnabled || !this.audioCtx || !this.audioBuffers[type]?.length) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const buffer = this.audioBuffers[type][Math.floor(Math.random() * this.audioBuffers[type].length)];
    const source = this.audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioCtx.destination);
    source.start(0);
  }

  private handlePointer(e: MouseEvent | TouchEvent) {
    if (this.isPaused) return;

    let x: number, y: number;
    if ('touches' in e) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    const posX = x / this.width;
    const posY = 1 - y / this.height;

    this.launchShell(posX, posY);
  }

  private randomColor(): string {
    const colors = Object.values(this.COLOR);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private launchShell(x: number, height: number) {
    const size = this.config.shellSize || 2;
    const shell = {
      x: x * (this.width - 120) + 60,
      y: this.height,
      targetY: this.height * (0.55 - height * 0.4),
      color: this.randomColor(),
      size: size,
      speed: 8 + size * 2,
      trail: [],
      exploded: false
    };
    this.shells.push(shell);
    this.playSound('lift');
  }

  private tick() {
    if (!this.isRunning) return;

    const dt = 16.67;

    if (!this.isPaused) {
      this.update(dt);
      this.render();
    }

    this.animationId = requestAnimationFrame(() => this.tick());
  }

  private update(dt: number) {
    // 自动发射
    if (this.config.autoLaunch) {
      this.autoLaunchTimer -= dt;
      if (this.autoLaunchTimer <= 0) {
        this.autoLaunchTimer = this.config.finaleMode ? 200 : 1500 + Math.random() * 1000;
        const x = 0.2 + Math.random() * 0.6;
        const height = 0.2 + Math.random() * 0.5;
        this.launchShell(x, height);
      }
    }

    // 更新炮弹
    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];
      if (!shell.exploded) {
        shell.y -= shell.speed;
        shell.trail.push({ x: shell.x, y: shell.y });
        if (shell.trail.length > 20) shell.trail.shift();

        if (shell.y <= shell.targetY) {
          this.explodeShell(shell);
          shell.exploded = true;
        }
      } else {
        this.shells.splice(i, 1);
      }
    }

    // 更新星星
    const drag = 0.98;
    const gravity = this.GRAVITY * dt / 1000;

    for (let i = this.stars.length - 1; i >= 0; i--) {
      const star = this.stars[i];
      star.life -= dt;
      if (star.life <= 0) {
        this.stars.splice(i, 1);
      } else {
        star.x += star.vx;
        star.y += star.vy;
        star.vx *= drag;
        star.vy *= drag;
        star.vy += gravity;
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 8) star.trail.shift();
      }
    }

    // 更新火花
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const spark = this.sparks[i];
      spark.life -= dt;
      if (spark.life <= 0) {
        this.sparks.splice(i, 1);
      } else {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += gravity;
      }
    }
  }

  private explodeShell(shell: any) {
    this.playSound('burst');

    const count = shell.size * 80 + 40;
    const speed = shell.size * 3 + 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * this.PI2;
      const velocity = speed * (0.5 + Math.random() * 0.5);

      this.stars.push({
        x: shell.x,
        y: shell.y,
        vx: Math.sin(angle) * velocity,
        vy: -Math.cos(angle) * velocity,
        color: shell.color,
        life: 600 + Math.random() * 600,
        trail: []
      });
    }

    // 添加火花
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * this.PI2;
      const velocity = speed * 0.3;

      this.sparks.push({
        x: shell.x,
        y: shell.y,
        vx: Math.sin(angle) * velocity,
        vy: -Math.cos(angle) * velocity,
        color: this.COLOR.Gold,
        life: 200 + Math.random() * 200
      });
    }
  }

  private render() {
    const ctx = this.trailsCtx;
    const w = this.width * this.dpr;
    const h = this.height * this.dpr;

    ctx.save();
    ctx.scale(this.dpr, this.dpr);

    // 清除画布，让背景图片可见（不使用黑色覆盖）
    ctx.clearRect(0, 0, this.width, this.height);

    // 绘制炮弹轨迹
    for (const shell of this.shells) {
      if (!shell.exploded && shell.trail.length > 1) {
        ctx.strokeStyle = shell.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shell.trail[0].x, shell.trail[0].y);
        for (const p of shell.trail) {
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }

    // 绘制星星
    for (const star of this.stars) {
      ctx.strokeStyle = star.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (star.trail.length > 1) {
        ctx.moveTo(star.trail[0].x, star.trail[0].y);
        for (const p of star.trail) {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();

      // 星星本体
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3, 0, this.PI2);
      ctx.fill();
    }

    // 绘制火花
    for (const spark of this.sparks) {
      ctx.fillStyle = spark.color;
      ctx.fillRect(spark.x - 1, spark.y - 1, 2, 2);
    }

    ctx.restore();

    // 清除主画布
    this.mainCtx.clearRect(0, 0, w, h);
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
    if (paused && this.audioCtx) {
      this.audioCtx.suspend();
    } else if (this.audioCtx) {
      this.audioCtx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public updateConfig(config: any) {
    this.config = { ...this.config, ...config };
  }

  public destroy() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
    this.mainCanvas.removeEventListener('click', this.pointerHandler);
    this.mainCanvas.removeEventListener('touchstart', this.pointerHandler);
    if (this.audioCtx) {
      this.audioCtx.close();
    }
    this.stars = [];
    this.sparks = [];
    this.shells = [];
  }
}
</script>

<style scoped>
.firework-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #111;
  z-index: 9999;
  overflow: hidden;
}

.loading-init {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 300;
}

.loading-init__header {
  font-size: 32px;
  margin-bottom: 10px;
}

.loading-init__status {
  font-size: 16px;
  color: rgba(255,255,255,0.7);
}

.stage-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  z-index: 1;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: transparent;
}

.canvas-container canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;
}

.btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
}

.btn:hover {
  background: rgba(255,255,255,0.4);
}

.btn--bright {
  background: #ff4444;
}

.menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 200;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}

.menu.hide {
  display: none;
}

.menu__header {
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
}

.menu__subheader {
  color: rgba(255,255,255,0.6);
  font-size: 14px;
  margin-bottom: 20px;
}

.close-menu-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.form-option {
  margin-bottom: 15px;
}

.form-option label {
  display: block;
  color: white;
  margin-bottom: 5px;
  cursor: pointer;
}

.form-option select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 14px;
}

.form-option select option {
  background: rgba(0,0,0,0.9);
  color: white;
}

.form-option--checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.form-option--checkbox label {
  margin-bottom: 0;
  flex: 1;
  font-size: 15px;
}

.form-option--checkbox input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.form-option--fullscreen {
  display: none;
}

@media (min-width: 768px) {
  .form-option--fullscreen {
    display: flex;
  }
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  z-index: 100;
  transition: background 0.3s;
  border: none;
}

.back-btn:hover {
  background: rgba(255,0,0,0.7);
}

.lang-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  z-index: 100;
  transition: background 0.3s;
  border: none;
  font-size: 14px;
  font-weight: 500;
}

.lang-btn:hover {
  background: rgba(255,0,0,0.7);
}
</style>
<template>
  <section class="py-16 bg-white text-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto bg-gray-100 rounded-lg p-6 flex items-center gap-6">
        <!-- 歌曲封面 -->
        <div class="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src="../assets/images/love_you_100_years.jpeg" 
            :alt="t('musicPlayer.title')" 
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <!-- 歌曲信息和控制 -->
        <div class="flex-1">
          <h3 class="text-xl font-bold mb-1">{{ t('musicPlayer.title') }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ t('musicPlayer.artist') }}</p>
          
          <!-- 进度条 -->
          <div class="mb-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
            <div 
              class="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
              @click="seek"
            >
              <div 
                class="h-full bg-red-600 rounded-full" 
                :style="{ width: `${(currentTime / duration) * 100}%` }"
              ></div>
              <div 
                class="w-4 h-4 bg-red-600 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 absolute cursor-pointer"
                :style="{ left: `${(currentTime / duration) * 100}%` }"
                @mousedown="startDrag"
              ></div>
            </div>
          </div>
          
          <!-- 控制按钮 -->
          <div class="flex items-center">
            <button 
              @click="togglePlay" 
              class="text-gray-900 hover:text-red-600 transition-colors focus:outline-none"
              :aria-label="t('musicPlayer.playPause')"
            >
              <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 播放状态指示器 -->
        <div class="flex-shrink-0">
          <div v-if="isPlaying" class="flex gap-1">
            <div class="w-1 h-6 bg-red-500 rounded-full animate-pulse" style="animation-delay: 0ms"></div>
            <div class="w-1 h-8 bg-red-500 rounded-full animate-pulse" style="animation-delay: 100ms"></div>
            <div class="w-1 h-6 bg-red-500 rounded-full animate-pulse" style="animation-delay: 200ms"></div>
            <div class="w-1 h-10 bg-red-500 rounded-full animate-pulse" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4 text-3xl font-bold text-gray-900">
        {{ t('musicPlayer.theme') }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 导入音频文件
import audioFile from '../assets/audio/love_you_100_years.mp3';

// 播放状态
const isPlaying = ref(false);
// 播放时间
const currentTime = ref(0);
// 歌曲时长
const duration = ref(264); // 4:24
// 拖动状态
const isDragging = ref(false);
// 音频元素
const audioElement = ref<HTMLAudioElement | null>(null);

// 初始化音频元素
const initAudio = () => {
  try {
    // 创建音频元素
    audioElement.value = new Audio();
    
    // 设置音频源
    audioElement.value.src = audioFile;
    
    // 监听时间更新事件
    audioElement.value.addEventListener('timeupdate', () => {
      if (audioElement.value && !isDragging.value) {
        currentTime.value = Math.floor(audioElement.value.currentTime);
      }
    });
    
    // 监听播放结束事件
    audioElement.value.addEventListener('ended', () => {
      isPlaying.value = false;
      currentTime.value = 0;
    });
    
    // 监听加载元数据事件
    audioElement.value.addEventListener('loadedmetadata', () => {
      if (audioElement.value) {
        duration.value = Math.floor(audioElement.value.duration);
      }
    });
    
    // 监听错误事件
    audioElement.value.addEventListener('error', (error) => {
      console.error('音频加载错误:', error);
      console.error('错误详情:', audioElement.value?.error);
      // 音频加载失败时，使用模拟播放
      console.log('音频加载失败，将使用模拟播放模式');
    });
  } catch (error) {
    console.error('初始化音频失败:', error);
    // 初始化失败时，使用模拟播放
    console.log('初始化音频失败，将使用模拟播放模式');
  }
};

// 播放/暂停切换
const togglePlay = () => {
  if (!audioElement.value) {
    initAudio();
  }
  
  if (audioElement.value) {
    console.log('尝试控制音频:', isPlaying.value ? '暂停' : '播放');
    console.log('音频路径:', audioElement.value.src);
    console.log('音频状态:', {
      paused: audioElement.value.paused,
      readyState: audioElement.value.readyState,
      error: audioElement.value.error
    });
    
    if (isPlaying.value) {
      audioElement.value.pause();
    } else {
      // 尝试播放
      audioElement.value.play().then(() => {
        console.log('播放成功');
      }).catch(error => {
        console.error('播放失败:', error);
        console.error('错误详情:', error.message);
        // 播放失败时，使用模拟播放
        startSimulatedPlayback();
      });
    }
    
    isPlaying.value = !isPlaying.value;
    console.log('最终状态:', isPlaying.value ? '播放中' : '已暂停');
  }
};

// 检查音频加载状态
const checkAudioStatus = () => {
  if (audioElement.value) {
    console.log('音频加载状态检查:', {
      src: audioElement.value.src,
      readyState: audioElement.value.readyState,
      networkState: audioElement.value.networkState,
      error: audioElement.value.error,
      paused: audioElement.value.paused
    });
  }
};

// 模拟播放（当真实音频不可用时）
let simulatedInterval: number | null = null;

const startSimulatedPlayback = () => {
  if (simulatedInterval) return;
  
  simulatedInterval = window.setInterval(() => {
    if (currentTime.value < duration.value) {
      currentTime.value += 1;
    } else {
      // 播放结束
      isPlaying.value = false;
      stopSimulatedPlayback();
      currentTime.value = 0;
    }
  }, 1000);
};

const stopSimulatedPlayback = () => {
  if (simulatedInterval) {
    clearInterval(simulatedInterval);
    simulatedInterval = null;
  }
};

// 格式化时间
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// 进度条点击事件
const seek = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = Math.floor(percentage * duration.value);
  
  currentTime.value = newTime;
  
  // 更新音频播放位置
  if (audioElement.value) {
    audioElement.value.currentTime = newTime;
  }
};

// 开始拖动
const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  event.preventDefault();
  
  // 添加鼠标事件监听
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
  
  // 如果正在播放，暂停真实音频的时间更新
  if (audioElement.value && !audioElement.value.paused) {
    // 暂停音频以避免冲突
    audioElement.value.pause();
  }
};

// 拖动中
const drag = (event: MouseEvent) => {
  if (!isDragging.value) return;
  
  const progressBar = document.querySelector('.w-full.h-2.bg-gray-200.rounded-full') as HTMLElement;
  if (!progressBar) return;
  
  const rect = progressBar.getBoundingClientRect();
  let dragX = event.clientX - rect.left;
  
  // 限制在进度条范围内
  dragX = Math.max(0, Math.min(dragX, rect.width));
  
  const percentage = dragX / rect.width;
  currentTime.value = Math.floor(percentage * duration.value);
};

// 结束拖动
const endDrag = () => {
  isDragging.value = false;
  
  // 移除鼠标事件监听
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
  
  // 更新音频播放位置
  if (audioElement.value) {
    audioElement.value.currentTime = currentTime.value;
    
    // 如果之前是播放状态，恢复播放
    if (isPlaying.value) {
      audioElement.value.play().catch(error => {
        console.error('恢复播放失败:', error);
        // 恢复失败时，使用模拟播放
        startSimulatedPlayback();
      });
    }
  }
};

// 组件挂载时初始化
onMounted(() => {
  initAudio();
  // 检查音频状态
  setTimeout(checkAudioStatus, 1000);
});

// 组件卸载时清理
onUnmounted(() => {
  stopSimulatedPlayback();
  
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value.src = '';
  }
  
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
});
</script>

<style scoped>
/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
}

.animate-pulse {
  animation: pulse 1s infinite ease-in-out;
}
</style>
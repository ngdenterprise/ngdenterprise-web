<template>
  <div class="landing" :class="$mq">
    <div class="ngd" :class="$mq">{{ ngdName }}</div>
    <div class="title" :class="$mq">
      {{ title }}
    </div>
    <div class="subtitle" :class="$mq">
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from 'vue'

export default {
  name: 'Landing',
  setup() {
    const mq = inject('mq')
    const ngdName = ref('ngdenterprise')
    const title = mq.value === 'mobile' ? ref('Blockchain\nDeveloper\nTools') : ref('Blockchain Developer Tools')
    const subtitle = computed(() => mq.value === 'mobile' ?
      'A STANDARDS-BASED\nAPPROACH\nFOR THE SMART\nECONOMY' :
      'A STANDARDS-BASED APPROACH\nFOR THE SMART ECONOMY'
    )

    return {
      ngdName,
      title,
      subtitle,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 10;
  pointer-events: none;

  &.mobile {
    top: 100px;
    pointer-events: all;
  }
}

.ngd {
  margin-bottom: 36px;
  font-size: 42px;
  color: #00E599;

  &.mobile {
    font-size: 24px;
  }
}

.title {
  margin: 18px 0;
  font-size: 90px;
  font-weight: 600;
  text-align: center;

  &.mobile {
    font-size: 51px;
    white-space: pre-line;
  }
}

.subtitle {
  margin: 18px 0 48px 0;
  font-size: 51px;
  font-weight: 400;
  text-transform: 'uppercase';
  text-align: center;
  white-space: pre-line;

  &.mobile {
    font-size: 28px;
  }
}
</style>

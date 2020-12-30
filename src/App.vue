<template>
  <div id="app">
    <Drops />
    <div class="root-container">
      <Landing /> 
      <div v-for="(content, index) in contents" :key="index" class="content-wrapper" :class="aligns[index]">
        <Content :content="content" :align="aligns[index]" />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { inject, reactive, computed } from 'vue'
import Landing from '@/components/Landing.vue'
import Drops from '@/components/Drops.vue'
import Content from '@/components/Content.vue'
import Footer from '@/components/Footer.vue'
import './styles/index.scss'

export default {
  name: 'App',
  components: {
    Landing,
    Drops,
    Content,
    Footer
  },
  setup() {
    const mq = inject('mq');
    const contents = reactive([
      {
        title: 'Blockchain Toolkit',
        tagline: 'develop, debug, test, deploy, track and manage your neo blockchain applications',
        links: [
          {
            name: 'github',
            url: 'https://github.com/neo-project/neo-blockchain-toolkit'
          },
          {
            name: 'vs code extension',
            url: 'https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-blockchain-toolkit'
          },
          {
            name: 'quick start',
            url: 'https://github.com/neo-project/neo-blockchain-toolkit/blob/master/quickstart.md'
          }
        ],
        align: 'left',
        icon: require('@/assets/svgs/blockchain-toolkit.svg'),
        iconPcHeight: 272,
        pcShift: 136,
        iconMobileHeight: 56,
      },
      {
        title: 'Smart Contract Debugger',
        tagline: 'debugger extension for neo smart contracts',
        links: [
          {
            name: 'github',
            url: 'https://github.com/neo-project/neo-debugger'
          },
          {
            name: 'vs code extension',
            url: 'https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-contract-debug'
          },
          {
            name: 'design notes',
            url: 'https://github.com/ngdenterprise/design-notes/blob/master/NDX-DN11%20-%20NEO%20Debug%20Info%20Specification.md'
          }
        ],
        align: 'right',
        icon: require('@/assets/svgs/smart-contract-debugger.svg'),
        iconPcHeight: 390,
        pcShift: 100,
        iconMobileHeight: 84
      },
      {
        title: 'Visual DevTracker',
        tagline: 'neo express blockchain explorer that is directly available within vs code',
        links: [
          {
            name: 'github',
            url: 'https://github.com/neo-project/neo-visual-tracker'
          },
          {
            name: 'vs code extension',
            url: 'https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-visual-devtracker'
          },
          {
            name: 'design notes',
            url: 'https://github.com/ngdenterprise/design-notes/blob/master/NDX-DN12%20-%20Neo%20Express%20Invoke%20Files.md'
          }
        ],
        align: 'left',
        icon: require('@/assets/svgs/visual-devtracker.svg'),
        iconPcHeight: 448,
        pcShift: 112,
        iconMobileHeight: 84
      },
      {
        title: 'Private Net',
        tagline: 'neo express',
        links: [
          {
            name: 'github',
            url: 'https://github.com/neo-project/neo-express'
          },
          {
            name: 'quick start',
            url: 'https://github.com/neo-project/neo-express/blob/master/readme.md'
          },
          {
            name: 'design notes',
            url: 'https://github.com/ngdenterprise/design-notes/blob/master/NDX-DN03%20-%20NEO%20Express%20Development%20Blockchain.md'
          }
        ],
        align: 'right',
        icon: require('@/assets/svgs/private-net.svg'),
        iconPcHeight: 324,
        pcShift: 206,
        iconMobileHeight: 70
      },
      {
        title: 'Enterprise Toolkit',
        tagline: 'model, design, and develop standard-based artifacts based on the iwa ttf',
        links: [
          {
            name: 'github',
            url: 'https://github.com/ngdenterprise/neo-enterprise-blockchain-toolkit'
          },
          {
            name: 'vs code extension',
            url: 'https://marketplace.visualstudio.com/items?itemName=ngd-seattle.visual-token-designer-enterprise'
          },
          {
            name: 'iwa ttf',
            url: 'https://github.com/InterWorkAlliance/TokenTaxonomyFramework'
          }
        ],
        align: 'left',
        icon: require('@/assets/svgs/enterprise-toolkit.svg'),
        iconPcHeight: 197,
        pcShift: 196,
        iconMobileHeight: 42
      },
      {
        title: 'Visual Token Designer',
        tagline: 'vs code extension that facilitates manipulation of artifacts in the ttf',
        links: [
          {
            name: 'github',
            url: 'https://github.com/ngdenterprise/visual-token-designer'
          },
          {
            name: 'vs code extension',
            url: 'https://marketplace.visualstudio.com/items?itemName=ngd-seattle.visual-token-designer'
          }
        ],
        align: 'right',
        icon: require('@/assets/svgs/visual-token-designer.svg'),
        iconPcHeight: 288,
        pcShift: 0,
        iconMobileHeight: 62
      },
      {
        title: 'Test-Driven Blockchain Development',
        tagline: 'neo-test',
        links: [
          {
            name: 'github',
            url: 'https://github.com/ngdenterprise/neo-test'
          },
          {
            name: 'readme',
            url: 'https://github.com/ngdenterprise/neo-test/blob/main/README.md'
          }
        ],
        align: 'left',
        icon: require('@/assets/svgs/tdd-framework.svg'),
        iconPcHeight: 335,
        pcShift: 100,
        iconMobileHeight: 72
      },
      {
        title: 'Unified Programming Model',
        tagline: 'neo fx',
        links: [
          {
            name: 'github',
            url: 'https://github.com/neo-project/neo-fx'
          },
          {
            name: 'design notes',
            url: 'https://github.com/ngdenterprise/design-notes/blob/master/NDX-DN02%20-%20NEO-FX%20Unified%20Programming%20Model.md'
          }
        ],
        align: 'left',
        icon: require('@/assets/svgs/unified-programming-model.svg'),
        iconPcHeight: 335,
        pcShift: 100,
        iconMobileHeight: 72
      }
    ])

    const aligns = computed(() => {
      return contents.map(content => {
        return mq.value === 'mobile' ? 'mobile' : content.align
      })
    })

    const ngd = reactive({
      name: 'ngd enterprise',
      url: ''
    })

    return {
      contents,
      aligns,
      ngd
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.root-container {
  display: flex;
  flex-direction: column;
  width: 88vw;
  max-width: 1440px;
}
</style>

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "@fontsource/open-sans/variable.css"
import type { Config } from './types/config'


declare global {
    interface Window {
      _config: Config;
    }
}

// Load Config
let req = new Request('/config.json');
fetch(req).then(async (res) => {
    let json = await res.json();
    window._config = json as Config;

    const app = createApp(App);
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus);
    app.component('font-awesome-icon', FontAwesomeIcon)

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.mount('#app')
}).catch((e) => {
    console.error(`Unable to fetch config: ${e}`);
})
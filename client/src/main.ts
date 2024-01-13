// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';
// eslint-disable-next-line import/no-unresolved
import App from '@/App.vue';

const app = createApp(App);

app.use(VueUniversalModal, {
  teleportTarget: '#modals',
  modalComponent: 'ArchiveModal',
});

app.mount('#app');

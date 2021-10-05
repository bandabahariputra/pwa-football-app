import 'regenerator-runtime';
import './styles/style.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-design-icons/iconfont/material-icons.css';
import main from './views/main';

if ('serviceWorker' in navigator) {
  window.addEventListener('load',  () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Pendaftaran ServiceWorker berhasil.'))
      .catch(() => console.log('Pendaftaran ServiceWorker gagal'));
  });
} else {
  console.log('ServiceWorker belum didukung browser ini.');
}

window.addEventListener('DOMContentLoaded', main);

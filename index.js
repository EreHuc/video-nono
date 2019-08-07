import 'babel-polyfill';
import videoHome from './video-home';

window.addEventListener('DOMContentLoaded', () => {
  const videoPlayerElement = document.getElementById('video');

  new videoHome(videoPlayerElement);
});

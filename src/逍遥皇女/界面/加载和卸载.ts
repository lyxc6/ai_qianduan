import { onMounted, onUnmounted } from 'vue';

let unloadCallback: (() => void) | null = null;

function load() {
  console.log('逍遥皇女界面已加载');
}

function unload() {
  if (unloadCallback) {
    unloadCallback();
    unloadCallback = null;
  }
  console.log('逍遥皇女界面已卸载');
}

$(async () => {
  load();
});

export { load, unload };

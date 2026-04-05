import { MvuWidget } from '@if/exported.mvu';

class FirstPersonBGLoader implements MvuWidget {
  name = '第一人称变嫁';
  description = '第一人称变嫁故事界面';

  onLoad() {
    console.log('第一人称变嫁界面已加载');
  }

  onUnload() {
    console.log('第一人称变嫁界面已卸载');
  }
}

const widget = new FirstPersonBGLoader();
export default widget;

$(() => {
  toastr.success('第一人称变嫁 2.0 状态栏已加载', '加载');
});

$(window).on('pagehide', () => {
  toastr.info('第一人称变嫁 2.0 状态栏已卸载', '卸载');
});
$(() => {
  toastr.success('状态栏界面已加载', '欢迎');
});

$(window).on('pagehide', () => {
  toastr.info('状态栏界面已卸载', '再见');
});

$(() => {
  toastr.success('状态栏界面已加载', '加载');
});

$(window).on('pagehide', () => {
  toastr.info('状态栏界面已卸载', '卸载');
});

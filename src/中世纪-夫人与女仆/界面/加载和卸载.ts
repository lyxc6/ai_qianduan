$(() => {
  toastr.success('领主账本界面已加载', '加载');
});

$(window).on('pagehide', () => {
  toastr.info('领主账本界面已卸载', '卸载');
});

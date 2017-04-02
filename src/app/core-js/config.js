angular.module('VivoDash')
.value('config', {
	'apiAdminLogin':'http://35.163.221.218:8080/admin/login',
	'apiAdminSummary':'http://35.163.221.218:8080/admin/summary',
	'apiAdminChannels':'http://35.163.221.218:8080/admin/channels',
	'apiAdminQueryChannelSeriesNoTags':'http://35.163.221.218:8080/admin/channels/%s/series?field=%s&summary_type=%s&time_range=%d:%d&time_interval=%ds',
	'apiAdminQueryDeviceSeriesNoTags':'http://35.163.221.218:8080/admin/channels/%s/devices/%s/series?field=%s&summary_type=%s&time_range=%d:%d&time_interval=%ds',
	'apiAdminScanChannelConnections':'http://35.163.221.218:8080/admin/channels/%s/connections/scan',
	'apiAdminDeviceConnectionStatus':'http://35.163.221.218:8080/admin/channels/%s/devices/%s/status',
	'apiAdminDashboards':'http://35.163.221.218:8080/admin/dashboards',
	'apiAdminDeviceAttach': 'ws://35.163.221.218:8080/admin/channels/%s/devices/%s/attach',
});

angular.module('VivoDash')
.value('config', {
	'apiAdminLogin':'http://35.163.221.218:8080/admin/login',
	'apiAdminSummary':'http://35.163.221.218:8080/admin/summary',
	'apiAdminChannels':'http://35.163.221.218:8080/admin/channels',
	'apiAdminQuerySeriesNoTags':'http://35.163.221.218:8080/admin/channels/%s/series?field=%s&summary_type=%s&time_range=%d:%d&time_interval=%ds'
});

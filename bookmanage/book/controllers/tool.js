var moment = require('moment');

moment.locale("zh-cn");

exports.formatDate=function(date){
	date=moment(date);
	return date.format('YYYY-MM-DD');
}
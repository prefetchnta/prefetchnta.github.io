
/*******************/
/* 获取 URL 参数值 */
/*******************/
function getUrlParam (name)
{
	var reg = new RegExp ("(^|&)" + name + "=([^&]*)(&|$)");
	var param = window.location.search.substr(1).match(reg);

	if (param != null)
		return decodeURI(param[2]);
	return null;
}

/*********************/
/* 获取 URL 参数列表 */
/*********************/
function getUrlRequest ()
{
	var url = location.search;

	if (url.indexOf("?") != -1)
	{
		var request = new Object();
		var str = url.substr(1);

		strs = str.split("&");
		for (var i = 0; i < strs.length; i++)
			request[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		return request;
	}
	return null;
}

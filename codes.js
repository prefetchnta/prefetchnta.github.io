
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

/****************/
/* 下载文章内容 */
/****************/
function articleDownload (root, name)
{
	var http = new XMLHttpRequest ();

	http.open("GET", root + name + ".txt", true);
	http.send(null);
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200)
			document.getElementById(name).innerHTML = http.responseText;
		else
			document.getElementById(name).innerHTML = "<center><br/><h1>File Not Found</h1><br/></center>";
	}
}

/****************/
/* 处理文章分页 */
/****************/
function articlePageSplit (root, list, split, crrt)
{
	var total = list.length;
	var pages = total / split;
	var begin = crrt * split;
	var end = begin + split;

	if (end > total)
		end = total;
	for (var i = begin; i < end; i++)
	{
		var head = (list[i])["head"];
		var name = (list[i])["name"];
		var time = (list[i])["time"];

		document.writeln('<table class="none_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td></td></tr></table>');
		document.writeln('<table class="line_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td class="head"><b>' + head + '</b></td></tr>');
		document.writeln('<tr><td class="text"><div id="' + name + '"></div></td></tr>');
		document.writeln('<tr><td align="right"><hr/><b>' + time + "</b></td></tr></table>");
		articleDownload(root, name);
	}
}

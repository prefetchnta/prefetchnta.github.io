
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
		var request = new Object ();
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
			document.getElementById(name).innerHTML = "<center><br/><h1>!!!文件内容下载失败!!!</h1><br/></center>";
	}
}

/****************/
/* 取消文章分页 */
/****************/
function articleNoSplit ()
{
	return 10000;
}

/****************/
/* 文章是否分页 */
/****************/
function articleIsSplit (value)
{
	return (value > 9999) ? false : true;
}

/****************/
/* 处理文章分页 */
/****************/
function articlePageSplit (root, type, list, split, crrt)
{
	if (isNaN(crrt))
		crrt = 0;
	if (split <= 0) {
		split = articleNoSplit();
		crrt = 0;
	}

	var total = list.length;
	var begin = crrt * split;
	var end = begin + split;

	if (begin < 0 || begin >= total) {
		begin = 0;
		end = split;
		crrt = 0;
	}
	if (end > total)
		end = total;
	for (var i = begin; i < end; i++)
	{
		var head = (list[i])["head"];
		var name = (list[i])["name"];
		var time = (list[i])["time"];

		document.write('<table class="none_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td></td></tr></table>');
		document.write('<table class="line_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td class="head"><b>' + head + '</b></td></tr>');
		document.write('<tr><td class="text"><div id="' + name + '"></div></td></tr>');
		if (!articleIsSplit(split))
			document.write("</table>");
		else
			document.write('<tr><td align="right"><hr/><b>' + time + "</b></td></tr></table>");
		articleDownload(root, name);
	}

	if (articleIsSplit(split))
	{
		var foots = new Object ();
		var pages = parseInt((total + split - 1) / split);

		foots[0] = "&nbsp;";
		foots[2] = "&nbsp;";
		if (split != 1) {
			if (crrt > 0)
				foots[0] = '<a href="' + type + "?page=" + String(crrt - 1) + '">上一页</a>';
			if (crrt < pages - 1)
				foots[2] = '<a href="' + type + "?page=" + String(crrt + 1) + '">下一页</a>';
			foots[1] = "共" + String(pages) + "页，当前第" + String(crrt + 1) + "页";
		}
		else {
			if (crrt > 0)
				foots[0] = '<a href="' + type + "?page=" + String(crrt - 1) + '">上一篇</a>';
			if (crrt < pages - 1)
				foots[2] = '<a href="' + type + "?page=" + String(crrt + 1) + '">下一篇</a>';
			foots[1] = "共" + String(pages) + "篇，当前第" + String(crrt + 1) + "篇";
		}
		document.write('<table class="none_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td></td></tr></table>');
		document.write('<table class="line_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td class="head" width="10%">' + foots[0] + '</td>');
		document.write('<td class="head">' + foots[1] + '</td><td class="head" width="10%">' + foots[2] + '</td></tr></table>');
	}
	else
	{
		document.write('<table class="none_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td></td></tr></table>');
		document.write('<table class="line_tab" width="1111px" cellspacing="2" cellpadding="8"><tr><td class="head">&nbsp;</td></tr></table>');
	}
}

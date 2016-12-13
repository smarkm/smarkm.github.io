---
title: 在RCP程序中使用JS Chart产品显示图表
date: 2016-11-22 21：07:35
tags:
- JAVA
- RCP
- Chart
categories: Java
---

## 概述
虽然现在大部分系统都已经用Web来实现UI，但桌面程序在某些行业或者因为历史原因依然会存在下去，对于JAVA实现的桌面程序而言RCP还是占有一定比重的，基于Java的图表框架虽然有很多但是在使用和体验上来说还是和JS等web技术实现的图表框架或技术有一定差距，本文将为在RCP程序中集成JS等技术实现的图表提供一个思路。
## 思路
RCP提供了一个内置的Browser（实际上是SWT提供的）我们可以通过内嵌Browser来展示图表，这样我们就可以在RCP程序中展示和Web上一样简洁漂亮的图表，同时也有助于我们调试和调整图表的展示效果。

## 实现原理
![image](/imgs/rcp-js-chart.png)

## 数据传递
我们都知道通过url参数的形式进行数据传递长度是有限制的，如果不通过server端我们是没办法使用post来进行数据传递，所以我们需要找到一种方法进行数据传递，以满足数据量大的情况。查看browser的API我们发现browser提供了执行javascript的方法`execute(script)`,同时提供了注册关于html处理过程的监听方法`addProgressListener(listener)`,我们可以在页面加载完成时去执行javascrip来进行数据传递，html通过javascrip来接受处理数据，主要实现代码如下：

```java

browser.setUrl(templateUrl);
browser.addProgressListener(new ProgressAdapter(){
	@Override
	public void completed(ProgressEvent event) {
		String data = "json or string data";
		//调用html页面的dataHandle(data) javascript 函数接受处理数据
		browser.execute("dataHandle('"+data+"')"); 
	}
});

```

	这里只是提供了通过执行javascript的方法传递数据的思路，你可以根据自己的需要灵活的进行处理。

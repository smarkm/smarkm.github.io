---
title: 浅谈JNDI的使用
date: 2013-08-08 18:40:30
tags:
- Java
categories: 
    Java
---
## 概述
关于什么是JNDI的概念这里不做解释，本文作为初学者根据所了解到内容做些总结，主要内容如下：

    1 JNDI使用描述
    2 Tomcat中DataSource的配置和使用
    3 Weblogic中JNDI的配置和使用
    4 访问分布式JNDI的条件

### 1 JNDI使用描述
![image](/imgs/jndi.png)
图1-1

**JNDI Service**：J2EE容器 包括Tomcat、Jetty、Weblogic、WebSphere等，提供对JNDI的支持

**SPIs**: 基于JNDI实现的目录服务包括DNS、LDAP、CORBA、Window注册表等（有能力你也可以做）

**JNDI ENV**：JNDI上下文，关于JNDI服务的环境参数在本地访问和分布式访问时我们的程序在初始化JNDI上下文时回有所不同（稍后介绍）

**Application**：我们的应用程序打算使用JNDI提供的服务
   
在我们的应用程序中会经常使用到JNDI提供的资源（废话），比如说使用DataSource进行数据库操作，访问Window注册表，使用NDS服务等，我们可以通过服务提供的支持方便的在服务器上进行这些服务的配置，我们的应用程序就可以方便的使用这些服务了。使用JNDI服务很简单
    
* 1 得到JNDI上下文；
* 2 在上写文中更加名字寻找要使用的对象或资源。

``` java
Context ctx= new InitialContext();
ctx.lookup("resName");
```
`注意：上述代码一定是在本地环境下使用（也就是你的应用跑在和配置的JNDI在同一个服务器上），这样你就可以再你的代码中直接使用得到的对象或资源了，接下来就看一下我们如何在Tomcat下使用通过JNDI配置提供的DataSource。`

### 2 Tomcat中的DataSource配置和使用（Tomcat7）
   1)在Tomcat的conf目录下找到context.xml添加如下配置
``` xml
<Resource 
       name="jdbc/test" 
       auth="Container" 
       type="javax.sql.DataSource"
       maxActive="100" 
       maxIdle="30" 
       maxWait="10000"
       username="root" 
       password="123456" 
       driverClassName="com.mysql.jdbc.Driver"
       url="jdbc:mysql://localhost:3306/test"
    />
```
   2）在项目的WEB-INF目录下的web.xml中声明服务器对其的配置
``` xml
 <resource-ref>
      <description>DB Connection</description>
      <res-ref-name>jdbc/test</res-ref-name>
      <res-type>javax.sql.DataSource</res-type>
      <res-auth>Container</res-auth>
  </resource-ref>
```
   3）程序中使用我们配置的DataSource（这里简单起见我你们在Jsp中演示）
```jsp
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="javax.sql.DataSource"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<%
	Context initContext = new InitialContext();
	DataSource ds = (DataSource)initContext.lookup("java:comp/env/jdbc/test");
	out.print(ds);
	
%>
```
4）显示结果（Tomcat基于dbcp提供DataSource实现）
![image](http://img.blog.csdn.net/20130808181820937?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZnJlZXdvcmttYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

`注意：1、这里对上下文环境并没有进行配置，因为相对于你的程序而言Tomcat环境就是你的本地环境，说以他会自动找到JNDI上下文中帮顶的资源；2:、我们配置的资源吗为"java:/comp/env/"命名空间的这个在不同的可能是不同的。`

### 3 Weblogic中JNDI资源的配置（这里以数据源配置为例）
#### 基本配置
Weblogic的配置就比较简单了，这里就不在浪费流量，注意在配置完数据源时一定要把它应用到你的Server上才能测试成功；
![image](http://img.blog.csdn.net/20130808180930515?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZnJlZXdvcmttYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


#### 本地访问
```java
Context initContext = new InitialContext();
DataSource ds = (DataSource)initContext.lookup("test/db");
out.print(ds);
```
#### 显示结果（这是weblogic自己实现的DataSource）
![image](http://img.blog.csdn.net/20130808182118125?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZnJlZXdvcmttYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
#### 通过客户端远程访问
```java
Properties env = new Properties();
	env.put(Context.INITIAL_CONTEXT_FACTORY,"weblogic.jndi.WLInitialContextFactory");
	env.put(Context.PROVIDER_URL, "t3://localhost:7003");
	Context ctx = new InitialContext(env);
	DataSource ds = (DataSource) ctx.lookup("test/db");
	System.out.println(ds);
```
#### Console输出
```java
ClusterableRemoteRef(-645461901847124827S:127.0.0.1:[7003,7003,-1,-1,-1,-1,-1]

:base_domain:AdminServer [-645461901847124827S:127.0.0.1:[7003,7003,-1,-1,-1,-1,-1]

:base_domain:AdminServer/287])/287
```

## 4 分布式访问JNDI的资源
这个也相对比较简单就是和3中Weblogic中客户端远程访问一样，要指定JNDI资源所在的位置和上下文产生的工场：

    1 Context.INITIAL_CONTEXT_FACTORY这个参数指定上下文产生的工场类，这个是不同容器不同配置的，根据所选容器文档来就可以了；
    2 Context.PROVIDER_URL通过此参数指定JNDI资源的位置。当然JNDI上下文的配置和操作远不止这些，对上述有些大致了解相信会有一定帮助。

总结：这里只是简单的描述了一下JNDI通过Tomcat和Weblogic的数据原配进行一个大致的了解，对于不同的容器和不同的JNDI服务自己根据需求去了解就可以了。


        


  

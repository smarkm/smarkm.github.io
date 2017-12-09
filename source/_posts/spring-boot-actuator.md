---
title: Spring Boot Actuator
date: 2017-11-18 17:03:50
tags: 
- Spring Boot
- Ops
categories:
    Spring
---
## 概述
Actuator的主要目的是提供基于 Spring Boot 应用的监控和管理的支持。我们只需要在依赖中添加对 `spring-boot-starter-actuator` 即可,以下是Actuator提供的一些支持：
* 通过HTTP，JMX，Remote Shell 监控和管理应用
* 通过Mextrics提供统计和计数支持
* Auditing支持
* Tracing

## 通过HTTP 监控和管理（只有在SpringMVC的环境中有效）
本节主要介绍些常用的配置，如果你开发的是基于Spring MVC 的应用Actuator 会通过 HTTP 自动暴露所有所有的 endpoints。默认的所有的id作为URL，比如health将会暴露为URI `/health`。
### 安全方面的配置
大部分情况下部署在内网的应用前端都会有防火墙，我们这里只介绍actuator提供的配置功能，实际的部署中是否会部署需要依情况来定。
如果我们在使用了 Spring Security 的情况下，自动暴露的endpoint默认是受保护的我们可以在 `application.properties` 里配置,
``` 
security.user.name=admin
security.user.password=secret
management.security.roles=SUPERUSER
```
如果我们想在内网的情况下关闭 Spring Security的限制，可以通过如下配置来指定：
``` Java
managment.security.enable=false
```

### 自定义 endpoints 的 paths
默认所有的endpoints 的URI都是以`/` 开始例如 `/health`、`/info` 等。我们可以类似与Tomcat context的概念来自定义paths
```
management.context-path=/manage
```
这样我们要访问  `health` 就需要使用 `/manage/health`

### 自定义 `server port` 和 `server ip`
默认的如果我们不指定 Actuator endpoints 使用的 port，它将使用和应用指定的相同的 port，例如应该的 http 端口指定为 8080 那么 Actuator endpoints 也是在这个端口上，因为应用只启动了1个Tomcat实例，很多时候我们希望监控和服务的端口是分离的，这样我们可以自定义 Actuator endpoints 使用的端口：
```
management.port=8081
```
这样应用会启动2个Tomcat 实例，一个用来服务应用逻辑，一个用来服务管理。要访问管理的 endpoints 就需要使用 `8081` 端口。

我们也可以制定管理 endpoints 绑定到特定的IP地址上：
``` Java
management.address=127.0.0.1
```

如果我们在 Web 环境中不希望提供 HTTP endpoints 功能,我们可以通过制定 `management.port` 为 -1，：
``` Java
management.port=-1
```

## 通过JMX 监控和管理

Spring Boot 默认通过 `org.springframework.boot` 域下的 JMX MBeans 暴露 management endpoints。
![image](/imgs/spring-boot-management-jmx-endpoints.png)
### 关闭 JMX endpoints 支持
``` Java
endpoints.jmx.enabled=false
```

## 通过Remote Shell监控和管理


## Mextrics介绍


## Auding 介绍

## Actuator 原理

## 总结


 
---
title: Java 和 Golang 一些重要概念对比
date: 2016-2-27 19:38:10
tags: 
- Golang
- go
categories:
    Golang
---

## 概述
Golang经过几年的发展已经开始展示其存在的价值，目前有很多优秀的项目是基于Golang开发的，包括Docker、Kubernetes、etcd、OpenShift等都是非常成功的，并且都是开源。本文将主要从语法、概念等角度对Golang 和 Java 进行对比，关于Java与Golang在程序设计和语言本身设计的对比有兴趣的同学可以参考下[sdfsd]()

## Package 和 Main 函数
Golang 中的 package 和 Java 中的 package基本一致，都是通过关键字 `package` 来定义，不同的是 Golang package 定义不需要写全路径名，比如定义一个 package `org.smark.text` ,Golang 中只需要将最后一层 folder 作为 package 名：

Java 定义 package：
``` Java
package org.smark.text
```

Go 定义 package：
``` Go
package text
```
Golang 中推荐的 package 名为小写且为单词，而不是两个词链接或下划线，比如如果定义networktools的包，Java中我们可以定义`networktools` 或 `network.tools` 而 Goalng中推荐的是以 `network` 作为 parent folder，`tools` 作为 package 名字。

### 引入 package

``` Go
import (
    "fmt"
    "org/smark/text"
)
```
在引入 package 的时候 Golang 中直接引入path package ，如上述示例，在使用时我们只需要用 `text` 作为访问器即可。

### main 函数
Golang 和 Java 一样都是以 `main` 函数作为程序入口，不同的是 Golang 中 main 函数必须声明在 main package 下。

Golang main：
``` Go
package main

func main(){}
```
Golang 会在 main package 下查找 main 函数。

## 变量和常量
Java 定义变量和常量：
``` Java
public static final double PI = 3.14;

int i;
String name;
String email = "xx@yyy.com";
```
Golang 定义变量和常量：
``` Go
const(
    PI := 3.14
)

var i int
var name string
email := "xx@yyy.com" //自动推倒类型
```

## 控制语句
相对于 Java 的控制语句 Golang 的控制语句更灵活和简洁，Golang中不需要在控制条件上加入`"()"`,但主题上必须使用 `"{}"`。if 和 switch 同 for语句一样可以接受可选的c初始化语句，同时还有一个包含类型选择和多路通信复用器的新控制结构：select。 

简单的 if 语句：
```Go
if x > 0 {
	return y
}
```

带初始化语句的 if：
```Go
if err := file.Chmod(0664); err != nil { //引用自官方文档
	log.Print(err)
	return err
}
```

for 语句的形式：
```GO
// 如同C的for循环                  //引用自官方文档
for init; condition; post { }
// 如同C的while循环
for condition { }
// 如同C的for(;;)循环
for { }
```

switch 的灵活性让我们可以避免写 if-else-if-else 这样的语句：

```Go
func unhex(c byte) byte {     //引用自官网文档
	switch {
	case '0' <= c && c <= '9':
		return c - '0'
	case 'a' <= c && c <= 'f':
		return c - 'a' + 10
	case 'A' <= c && c <= 'F':
		return c - 'A' + 10
		
	}
	return 0
}
```
Golang 中的 case 更灵活，在Java 中直到 Java 7 中 case 语句才可以使用 String 类型。

## 函数
Golang 的函数同 Java的函数定义有很大的不同，Golang的函数可以有多个返回值，同时函数可以定义可选的`接收者`，在Java 中所有的函数都是定义在 Class 下面，我们通过Class 或 Class 的实例来调用函数；Golang 中函数的接收者可以类比看作是函数是作用在哪种种类型上的：

Golang 函数定义：
```Go
func (file *File) Write(b []byte) (n int, err error)  //func (接收者定义) 函数名(参数定义) （返回值定义）
```
在C 语言中返回局部变量的指针时，在使用时会有问题，Golang 函数中返回局部变量的指针是可以的。

## 数据初始化
Golang 通过关键字 `new` 和 `make` 来初始化变量和内容，`make` 只用于初始化切片(slice)、映射(map) 和 通道(channel)，
···

## 类型和接口

## 泛型

## 垃圾回收器

---
title: Java 实现斐波那契数列方式浅析
date: 2013-12-08 19:21:16
tags: 
- Java
- Tips
- 面试
categories:
    Tips
---

## 概述
Fibonacci的算法很简单，下述三种实现也没什么好解释，重要的是从不同的实现中来了解不同方式所带来开销和好处：

## Java 实现方式

### 1 基于变量交换实现

```java 
public static void variableFibo(int preN) {
	int a=0,b=1,c = 0;
	for (int i = 0; i < preN; i++) {
		if (i<2) {
			c= i;
		}else {
			c= a+b;
			a=b;
			b=c;
		}
		 System.out.print(c+" ");
	}
	System.out.println();
}
```

### 2 基于数组实现
``` Java
public static void withArrayFibo(int preN) {
	int[] arr = new int [preN];
	for (int i = 0; i < preN; i++) {  
		arr[i] = i<2?i:arr[i-1]+arr[i-2];
		System.out.print(arr[i] +" ");
	}
}    
```

### 3 递归实现
``` Java
public static void  recursiveFibo(int preN) {
	for (int i = 0; i < preN; i++) {
		System.out.print(getFibo(i)+" ");
	}
}
public static int  getFibo(int n) {
    return n<2?n:getFibo(n-1)+getFibo(n-2);
}
```

## 浅析
`没有限制条件的单纯比较哪种方式好坏是不负责任的（for 部分经验欠缺的面试官）`

第一种实现充分的利用了变量，不会有额外的堆、栈开销，额外的赋值开销；

第二种实现是充分利用了内存，更确切的说是利用了堆；

第三种实现充分的利用了栈空间，递归消耗栈资源很容易理解；

对于程序而言无非从cpu、内存、处理时间等角度来平衡,万事理皆通解决问题是平衡各种资源的能力，要充分了解不同资源使用所带来的好处与开销。
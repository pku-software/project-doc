# 如何完成大作业

我们的目标是实现一个 Mini-Lisp 语言的解释器。为了达到这个目标，本文档将整个过程划分为多个 Level，每个 Level 实现一小部分功能，一步步达到预期的结果。

## 凡事开始之前……

准备工作是必须的。我们在 [前置知识](prerequisites.md) 中列举了为了完成这份作业所需要的必要知识点。这其中主要包括：
- C++ 的面向对象风格编程（这是前半学期的授课内容）；
- Lisp 编程语言大致是什么东西；
- Git 的使用（推荐了解，不做要求）；
- 调试器的使用（推荐了解，不做要求）。

如果你《计算概论》基础扎实且前半学期的作业按部就班地完成了，那你只需要阅读一下 [Lisp 教程](https://pku-software.github.io/lisp-tutorial/) 就可以了。学习之后，我们建议你试用一下 Lisp 语言；比如下载一个 Racket，写一写，有一个基本的感觉。

随后，我们就可以开始动笔写代码了。

## 写代码

正如开篇所述，我们代码的编写分为若干个 Level。首个 Level —— Lv.0，则会提供给你现成的框架代码，你需要阅读并回答一些问题。接下来的 Lv.1 到 Lv.7，则会引导你亲自编写代码，直到完成我们的作业目标。最后的 Lv.7+，提供了一些扩展的方向和思路，供学有余力的学生进一步努力。

除 Lv.0 外，每一个 Level 都有配套的“测试方法”，来检测你是否正确完成了当前 Level 的要求。此外，为了督促同学们有计划地完成各个 Level，我们在每一个 Level 结尾给出“阶段性检查”的方法。我们建议同学们**定期按照阶段性检查的说明，提交对应的材料到教学网**。按时提交材料的同学，相应的大作业分数会有一定的“加成”（满分为上界）。

## 面测

完成了大作业代码编写工作的同学，需要通过助教的“面测”以获取分数。你需要展示你的代码结构、程序功能（含创新点等），并回答助教的提问。助教会综合考虑项目的完成度、工程性和创新程度得出你的大作业分数。

> 该分数的主要部分为通过测试用例集的比例数；我们会现场进行一定数量的测试，按通过数给出硬性指标的分数。

即日起至 2023 年 6 月 23 日 20:00，所有完成了大作业编写的同学，均可在上机课联系助教，或单独联系助教完成面测。

-----

准备好的话，就[开始写代码](../levels/0.md)吧~
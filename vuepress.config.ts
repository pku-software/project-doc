import { defineUserConfig, defaultTheme } from 'vuepress';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '软件设计实践大作业',
  base: "/project-doc/",

  theme: defaultTheme({
    sidebar: [
      {
        text: "写在前面",
        children: [
          {
            text: "项目概述",
            link: "/"
          },
          "/preface/prerequisites",
          "/preface/facing-problem"
        ]
      },
      {
        text: "开始实践",
        children: [
          "/levels/0",
          "/levels/1",
          "/levels/2",
          "/levels/3",
          "/levels/4",
          "/levels/5",
          "/levels/6",
          "/levels/7",
          "/levels/7p"
        ]
      },
      {
        text: "附录",
        children: [
          "/appendix/why",
          {
            text: "Lisp 入门教程",
            link: "https://pku-software.github.io/lisp-tutorial/"
          },
          {
            text: "Mini-Lisp 语言规范",
            link: "https://pku-software.github.io/mini-lisp-spec/"
          },
          {
            text: "Mini-Lisp 脚手架",
            link: "https://pku-software.github.io/create-mini-lisp/"
          }
        ]
      }
    ]
  })
})

import { defineUserConfig, defaultTheme } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { searchPlugin } from "@vuepress/plugin-search";
import { fileURLToPath } from "node:url";

export default defineUserConfig({
  lang: "zh-CN",
  title: "软件设计实践大作业",
  base: "/project-doc/",
  theme: defaultTheme({
    navbar: [
      {
        text: "GitHub",
        link: "https://github.com/pku-software/project-doc"
      }
    ],
    sidebar: [
      {
        text: "写在前面",
        children: [
          {
            text: "项目概述",
            link: "/",
          },
          "/preface/howto",
          "/preface/prerequisites",
          "/preface/facing-problem",
        ],
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
          "/levels/7p",
        ],
      },
      {
        text: "附录",
        children: [
          "/appendix/why",
          "/appendix/rjsj_test",
          "/appendix/references",
          {
            text: "Lisp 入门教程",
            link: "https://pku-software.github.io/lisp-tutorial/",
          },
          {
            text: "Mini-Lisp 语言规范",
            link: "https://pku-software.github.io/mini-lisp-spec/",
          },
          {
            text: "Mini-Lisp 脚手架",
            link: "https://pku-software.github.io/create-mini-lisp/",
          },
        ],
      },
    ],
  }),
  plugins: [
    registerComponentsPlugin({
      components: {
        MiniLisp: fileURLToPath(
          new URL("./components/MiniLisp.vue", import.meta.url).href
        ),
      },
    }),
    // searchPlugin(),
  ],
});

import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

import { head, nav, sidebar } from './configs'

const PROD_BASE = '/yuri/'

export default defineConfig({
  outDir: '../dist',
  base: process.env.NODE_ENV === 'production' ? PROD_BASE : '/',
  lang: 'zh-CN',
  title: 'yurinote',
  description: 'sunny586的学习笔记',
  head,
  lastUpdated: true,
  cleanUrls: true,
  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },
  /* 主题配置 */
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
    i18nRouting: false,
    logo: '/logo.png',
    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunny586/vitepress-nav-template' }],
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: `Copyright © ${new Date().getFullYear()}-present yuri`,
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'sunny586.yuri',
    },
    comment: {
      repo: 'sunny586/yuri',
      repoId: 'R_kgDOMkRzkg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMkRzks4ChvEk',
    },
  },
  vite: {
    plugins: [
      MarkdownPreview(),
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'element-plus-vendor': ['element-plus'],
        },
      }),
    ],
    build: {
      chunkSizeWarningLimit: 1000, // 设置为1000 kB
    },
  },
} as UserConfig<DefaultTheme.Config>)

const path = require("path");
const autoGetSidebarOptionBySrcDir = require("./utils/get-sidebar-by-dir");

module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'JACKY',
    port: '80',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    markdown: {
        extendMarkdown: md => {
            md.set({
                html: true
            })
            md.use(require('markdown-it-katex'))
        }
    },
    head: [
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
        }],
        ['link', {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
        }],
        [
            'link', {
            rel: 'stylesheet', href: '/css/index.css'
        }
        ],
        [
            'link', {rel: 'icon', href: '/images/logo.png'}
        ]
    ],


    themeConfig: {
        contributors: false,
        lastUpdated: '最后更新时间',
        sidebar: autoGetSidebarOptionBySrcDir(path.resolve(__dirname, "../"), 'images'),
        sidebarDepth: 2
    },

    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: '搜索',
                    }
                },
            },
        ],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale("zh-CN")
                    return moment(timestamp).fromNow()
                }
            }
        ]
    ],
}



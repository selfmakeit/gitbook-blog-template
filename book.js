
let plugins = [
    '-lunr',
    '-sharing',
    '-search',
    '-favicon',
    'code',
    'sharing-plus',
    'expandable-chapters',
    'theme-lou',
    'back-to-top-button',
    'search-pro',
    'flexible-alerts',
];
module.exports = {
    title: 'CONTAC',
    author: 'contac',
    lang: 'zh-cn',
    description: '个人笔记',
    plugins,
    pluginsConfig: {
        'flexible-alerts': {
            style: 'flat', // callout 或 flat
        },
        code: {
            copyButtons: true,
        },
        'theme-lou': {
            color: '#717171', // 主题色
            favicon: 'assets/favicon.ico',
            logo: 'assets/contac.jpg',
            copyrightLogo: 'assets/copyright.png',
            autoNumber: 3, // 自动给标题添加编号(如1.1.1)
            forbidCopy: false, // 页面是否禁止复制
            'search-placeholder': 'Search', // 搜索框文本
            'hide-elements': ['.summary .gitbook-link'], // 需要隐藏的标签
            output:"contac",//这里需要注意，假如你build时输出文件夹名不是‘_book’的话需要用这个配置文件夹名。
            copyright: {
                author: 'contac', // 底部版权展示的作者名
            },
        },
        "sharing": {
            "douban": false,
            "facebook": true,
            "google": false,
            "hatenaBookmark": false,
            "instapaper": false,
            "line": false,
            "linkedin": false,
            "messenger": false,
            "pocket": false,
            "qq": false,
            "qzone": false,
            "stumbleupon": false,
            "twitter": true,
            "viber": false,
            "vk": false,
            "weibo": false,
            "whatsapp": false,
            "all": [
                "facebook",  "twitter",
                "weibo", "linkedin"
            ]
        },
    },
    styles:{
        "website": "styles/website.css"
    },
    variables: {
        themeLou: {
        // 顶部导航栏配置
        nav: [
          {
            target: '_blank', // 跳转方式: 打开新页面
            url: 'https://contac.saywhen.site', // 跳转页面
            name: 'Website', // 导航名称
          },
          {
            target: '_blank', // 跳转方式: 打开新页面
            url: 'https://twitter.com/C0NTAC_', // 跳转页面
            name: 'Twitter', // 导航名称
          },
          {
            target: '_blank', // 跳转方式: 打开新页面
            url: 'https://github.com/selfmakeit', // 跳转页面
            name: 'Github', // 导航名称
          },
        ],
        // 底部打赏配置
        footer: {
          donate: {
            button: '赞赏',
            avatar:'./assets/contac.jpg',
            nickname: 'contac',
            message: '随意打赏，但不要超过一杯咖啡钱 ☕️',
            text: '『 赠人玫瑰 🌹 手有余香 』',
            wxpay: './assets/wxpay.jpg',
            alipay: './assets/alpay.jpg',
          },
          copyright: true, // 显示版权
        },
      },
    },
  };
  
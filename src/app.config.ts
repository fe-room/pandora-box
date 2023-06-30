export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/award/index',
    'pages/mine/index'
  ],
  subpackages: [
    {
      root: "second-packages",
      pages: [
        "pages/chat-room/index",
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#747474",
		selectedColor: "#373737",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '创作',
        iconPath: "./assets/tab-bar/home.png",
				selectedIconPath: "./assets/tab-bar/home-active.png"
      },
      {
        pagePath: 'pages/award/index',
        text: '奖励',
        iconPath: "./assets/tab-bar/sort.png",
				selectedIconPath: "./assets/tab-bar/sort-active.png"
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: "./assets/tab-bar/mine.png",
				selectedIconPath: "./assets/tab-bar/mine-active.png"
      },
    ],
  },
})

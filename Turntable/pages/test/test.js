// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0.00,
    arayTest: [1, 2, 3, 4],
    computerCardList: [],//电脑卡牌数组
    computerOutCardList: [], //电脑已出牌数组
    playerCardList: [],//电脑卡牌数组
    playerOutCardList: [],//玩家已出牌数组
    colorCardDefault: '#F5F0FC',//未选中卡牌颜色
    colorCardSelect: '#ffe400',//被选中卡牌颜色
    currentPlayerSelectedIndex: 0,//被player选中的card index
    currentComputerSelectedIndex: 0,//被computer选中的card index
    imageCardList: [
      '../../img/1.png',
      '../../img/2.png',
      '../../img/3.png',
      '../../img/4.png',
      '../../img/5.png',
      '../../img/6.png',
      '../../img/7.png',
      '../../img/8.png',
      '../../img/9.png'
    ],//数字图片数组
  },

  playCard: function () {

    //如果为0则表示未选中卡牌
    if (this.data.currentPlayerSelectedIndex == 0)
      return

    //从playerCardList删除当前选中的卡牌
    var pCardList = []
    pCardList = this.data.playerCardList;
    for (var i = 0; i < pCardList.length; i++) {
      if (pCardList[i].cardNumber == this.data.currentPlayerSelectedIndex) {
        pCardList.splice(i, 1);
        break;
      }
    }
    //向playerOutCardList添加当前选中的卡牌
    var pOutCardList = []
    pOutCardList = this.data.playerOutCardList;
    pOutCardList.push({ cardNumber: this.data.currentPlayerSelectedIndex })
    this.setData({
      playerCardList: pCardList,
      playerOutCardList: pOutCardList,
    })

    //生成随机数
    var computerCardL = []
    computerCardL = this.data.computerCardList;
    var cSelectedCardNumber = computerCardL[Math.floor(Math.random() * computerCardL.length + 1) - 1].cardNumber
    var isPlayerWin = 0;
    if (this.data.currentPlayerSelectedIndex > cSelectedCardNumber)
      isPlayerWin = 1;
    else if (this.data.currentPlayerSelectedIndex < cSelectedCardNumber)
      isPlayerWin = -1;
    this.setData({
      currentComputerSelectedIndex: cSelectedCardNumber,
    })

    //延时后computer出牌
    setTimeout(function () {
      //从computerCardList删除当前选中的卡牌
      var cCardList = []
      cCardList = this.data.computerCardList;
      for (var i = 0; i < cCardList.length; i++) {
        if (cCardList[i].cardNumber == this.data.currentComputerSelectedIndex) {
          cCardList.splice(i, 1);
          break;
        }
      }
      this.setData({
        computerCardList: cCardList,
      })
      //向computerOutCardList添加当前选中的卡牌
      var cOutCardList = []
      cOutCardList = this.data.computerOutCardList;
      cOutCardList.push({ cardNumber: this.data.currentComputerSelectedIndex })
      this.setData({
        computerOutCardList: cOutCardList,
      })

      //提示获胜信息并记录
      if (isPlayerWin == 1) {
        wx.showModal({
          title: '恭喜',
          content: '您在此次对决中获得了胜利！',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      else if(isPlayerWin == -1){
        wx.showModal({
          title: '遗憾',
          content: '您在此次对决的输给的对手！',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      else
      {
        wx.showModal({
          title: '平局',
          content: '您在此次对决中棋逢对手！',
          showCancel: false,
          success: function (res) {
          }
        })
      }

      this.setData({
        currentPlayerSelectedIndex: 0,
      })
    }.bind(this), 1000)
  },

  clickSelectCard: function (e) {
    //传参以data-来设置属性并传递，参数名称获取：驼峰法则，参看微信开发事件
    this.setData({
      currentPlayerSelectedIndex: e.currentTarget.dataset.pcardnumber,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var computerCardList = []
    var playerCardList = []
    var computerOutCardList = []
    var playerOutCardList = []
    for (var i = 1; i < 10; i++) {
      computerCardList.push({ cardNumber: i })
      playerCardList.push({ cardNumber: i })
      //computerOutCardList.push({ cardNumber: i})
      //playerOutCardList.push({ cardNumber: i})
    }
    this.setData({
      computerCardList: computerCardList,
      playerCardList: playerCardList,
      computerOutCardList: computerOutCardList,
      playerOutCardList: playerOutCardList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
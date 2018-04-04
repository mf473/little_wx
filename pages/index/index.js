const common = require('../common/js/common.js');
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    allPage: 0,
    currentPage: 1,
    maxResult: 10,
    type: 1,
    msg: [],
    load: true,
    moreLoad: false,
    n: 0,
    text: '',
    userImage: '',
    nickName: '未知',
    hisOff: true
  },
  lower() {
    // const data = { maxResult: this.data.maxResult, currentPage: this.data.currentPage }, that = this;
    // this.setData({
    //   maxResult: data
    // });
    if (this.data.currentPage < this.data.allPage){
      common.ajaxData(this);
    }else{
      this.setData({
        load: false,
        moreLoad: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          userImage: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        });
      }
    });
    this.loadData();  
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

  },
  loadData() {
    common.ajaxData(this);    
  },
  onTabItemTap(item) {
    console.log(item)
  },
  switchContent(e) {
    let times = e.currentTarget.dataset.times;
    let history = wx.getStorageSync('history') || [];
    let url = '../content/content?text=' + this.data.msg[e.currentTarget.dataset.index].text + '&n=' + this.data.n + '&title=' + this.data.msg[e.currentTarget.dataset.index].title + '&time=' + this.data.msg[e.currentTarget.dataset.index].ct;
    console.log(history);
    history = history.filter((item)=>{
      return item.ct !== times;
    })
    history.unshift({
      text: this.data.msg[e.currentTarget.dataset.index].text,
      n: this.data.n,
      ct: times,
      title: this.data.msg[e.currentTarget.dataset.index].title,
      img: '',
      index: e.currentTarget.dataset.index,
      url: url
    });

    wx.setStorageSync('history', history);
    wx.navigateTo({
      url: url
    });
  },
  mine(){
    wx.navigateTo({
      url: `../user/user?userImage=${this.data.userImage}&nickName=${this.data.nickName}`,
    })
  }
})
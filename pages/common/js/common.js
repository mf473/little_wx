
// pages/index/index.js

const format = ()=> {
  var date = new Date()
  var month = date.getMonth() + 1
  var datetime = date.getFullYear()
    + ""// "年"
    + (month >= 10 ? month : "0" + month)
    + ""// "月"
    + (date.getDate() < 10 ? "0" + date.getDate() : date
      .getDate())
    + ""
    + (date.getHours() < 10 ? "0" + date.getHours() : date
      .getHours())
    + ""
    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
      .getMinutes())
    + ""
    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
      .getSeconds());
  return datetime;
}

const ajaxData = (that) => {
  that.setData({
    load: true
  });
  wx.request({
    //url: `http://op.juhe.cn/onebox/football/league?dtype=${dtype}&league=${league[1]}&key=0f14218ff4cc86730e01c4f2f53ecfd0`,
    //url: `https://db.miaov.com/doubanapi/movies/info?page=${page}&maxResult=${maxResult}`,
    url: `https://route.showapi.com/341-${that.data.type}`,
    data: {
      "showapi_timestamp": format(),
      "showapi_appid": '59573', //这里需要改成自己的appid
      "showapi_sign": 'f738fc568e4b4930ae94d6b643460f4a',  //这里需要改成自己的应用的密钥secret
      "page": that.data.currentPage,
      "maxResult": that.data.maxResult
    },
    success: (data) => {
      console.log(data.data.showapi_res_body);
      const newArr = that.data.msg;
      const msg = data.data.showapi_res_body.contentlist;
      const currentPage = data.data.showapi_res_body.currentPage;
      const allPage = data.data.showapi_res_body.allPages;

      for (let i = 0; i < msg.length; i++) {
        newArr.push(msg[i])
      }
      that.setData({
        msg: newArr,
        allPage: allPage,
        currentPage: currentPage + 1,
        load: false
      });
    }
  })
}

module.exports = {
  format: format,
  ajaxData: ajaxData
}

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     allPage: 0,
//     currentPage: 1,
//     maxResult: 10,
//     type: 1,
//     msg: [],
//     load: true,
//     moreLoad: false,
//     n: 0,
//     text: '',
//     userImage: '',
//     nickName: '未知'
//   },
//   lower() {
//     // const data = { maxResult: this.data.maxResult, currentPage: this.data.currentPage }, that = this;
//     // this.setData({
//     //   maxResult: data
//     // });
//     if (this.data.currentPage < this.data.allPage) {
//       this.ajaxData(this.data.maxResult, this.data.currentPage);
//     } else {
//       this.setData({
//         load: false,
//         moreLoad: true
//       })
//     }
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     // console.log(this.data.userImage)
//     wx.getUserInfo({
//       success: (res) => {
//         this.setData({
//           userImage: res.userInfo.avatarUrl,
//           nickName: res.userInfo.nickName
//         });
//       }
//     });
//     this.loadData();
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   loadData() {
//     this.ajaxData(this.data.maxResult, this.data.currentPage);
//   },
//   ajaxData(maxResult, currentPage) {
//     this.setData({
//       load: true
//     });
//     wx.request({
//       //url: `http://op.juhe.cn/onebox/football/league?dtype=${dtype}&league=${league[1]}&key=0f14218ff4cc86730e01c4f2f53ecfd0`,
//       //url: `https://db.miaov.com/doubanapi/movies/info?page=${page}&maxResult=${maxResult}`,
//       url: `https://route.showapi.com/341-1`,
//       data: {
//         "showapi_timestamp": this.formatterDateTime(),
//         "showapi_appid": '59573', //这里需要改成自己的appid
//         "showapi_sign": 'f738fc568e4b4930ae94d6b643460f4a',  //这里需要改成自己的应用的密钥secret
//         "page": currentPage,
//         "maxResult": maxResult
//       },
//       success: (data) => {
//         console.log(data.data.showapi_res_body);
//         const newArr = this.data.msg;
//         const msg = data.data.showapi_res_body.contentlist;
//         const currentPage = data.data.showapi_res_body.currentPage;
//         const allPage = data.data.showapi_res_body.allPages;

//         for (let i = 0; i < msg.length; i++) {
//           newArr.push(msg[i])
//         }
//         this.setData({
//           msg: newArr,
//           allPage: allPage,
//           currentPage: currentPage + 1,
//           load: false
//         });
//       }
//     })
//   },
//   formatterDateTime() {
//     var date = new Date()
//     var month = date.getMonth() + 1
//     var datetime = date.getFullYear()
//       + ""// "年"
//       + (month >= 10 ? month : "0" + month)
//       + ""// "月"
//       + (date.getDate() < 10 ? "0" + date.getDate() : date
//         .getDate())
//       + ""
//       + (date.getHours() < 10 ? "0" + date.getHours() : date
//         .getHours())
//       + ""
//       + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
//         .getMinutes())
//       + ""
//       + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
//         .getSeconds());
//     return datetime;
//   },
//   bingActive(index) {
//     this.n = index;
//   },
//   onTabItemTap(item) {
//     console.log(item)
//   },
//   switchContent(e) {
//     wx.navigateTo({
//       url: '../content/content?text=' + this.data.msg[e.currentTarget.dataset.index].text + '&n=' + this.data.n + '&title=' + this.data.msg[e.currentTarget.dataset.index].title + '&time=' + this.data.msg[e.currentTarget.dataset.index].ct
//     });
//   },
//   mine() {
//     wx.navigateTo({
//       url: `../user/user?userImage=${this.data.userImage}&nickName=${this.data.nickName}`,
//     })
//   }
// })
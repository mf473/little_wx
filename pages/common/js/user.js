const mine = () =>{
  wx.getUserInfo({
    success: (res)=>{
      //const {userImage} = data;
      // this.setData({
      //   userImage: res.userInfo.avatarUrl
      // })
    }
  })
  
}

module.exports = {
  mine: mine
}
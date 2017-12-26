function ajax(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callBack(res.data);
     
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

module.exports = {
  ajax: ajax
 
}
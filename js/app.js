new Vue({
  el: '#newsapp',
  data: {
    newsdata:{},
    showmodalbox:false,
    imageurl:"",
    fontSize: 'small',
    weekArr:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
    weekArren:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  },
  created: function() {
    var that = this;
    $.ajax({
      url:"https://api.j4u.ink/v1/store/other/proxy/remote/news/60.json",
      success:function(result){
        that.newsdata = result.data;
      }
    });
  },
  methods: {
    setFontSize: function(size) {
      this.fontSize = size;
    },
    toimage: function() {
      var that = this;
      var dom = $(".newscontainer")[0];
      if(dom !== null) {
        // 截图前去掉圆角和阴影，避免 html2canvas 透出 body 灰色背景
        var origRadius = dom.style.borderRadius;
        var origShadow = dom.style.boxShadow;
        dom.style.borderRadius = '0';
        dom.style.boxShadow = 'none';
        html2canvas(dom, { scale: window.devicePixelRatio, backgroundColor: '#ffffff' }).then(function(canvas) {
          // 恢复样式
          dom.style.borderRadius = origRadius;
          dom.style.boxShadow = origShadow;
          var dataURL = canvas.toDataURL('image/png');
          if (dataURL !== '') {
            that.imageurl = dataURL;
            if(that.getOS() === "Others") {
              var alink = document.createElement('a');
              alink.href = dataURL;
              alink.download = 'newsoftoday.png';
              alink.click();
              alink.remove();
            } else {
              that.showmodalbox = true;
            }
          }
        });
      }
    },
    getOS: function() {
      var os;
      if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
        os = 'Android';
      } else if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
        os = 'iOS';
      } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
        os = 'WP';
      } else {
        os = 'Others';
      }
      return os;
    }
  }
})

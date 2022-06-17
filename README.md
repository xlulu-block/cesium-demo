# cesium

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### Dayjs常用方法
```javascript
  // 获取当前日期,xxxx-xx-xx格式
    dayjs().format('YYYY-MM-DD')
    // 或者
    dayjs().startOf('day').format('YYYY-MM-DD')
 
    // 获取本周
    dayjs().day('1').format('YYYY-MM-DD') // 周一
    dayjs().day('7').format('YYYY-MM-DD') // 周日
 
    // 获取本月
    dayjs().startOf('month').format('YYYY-MM-DD') // 本月第一天
    dayjs().endOf('month').format('YYYY-MM-DD') // 本月最后一天
 
    // 获取本年
    dayjs().startOf('year')..format('YYYY-MM-DD') // 今年第一天
    dayjs().endOf('year')..format('YYYY-MM-DD') // 今年最后一天

   handleTime(time) {
      // 转换为式分秒
      const h = parseInt(time / 3600)
      const minute = parseInt(time / 60 % 60)
      const second = Math.ceil(time % 60)
      const hours = h < 10 ? '0' + h : h
      const formatSecond = second > 59 ? 59 : second
      return [hours, minute, formatSecond]
    }

    // 金额的validate
     penaltyAmount: [
          {
            pattern: /^(([1-9]{1}\d{0,9})|(0{1}))(\.\d{1,2})?$/,
            message: "请输入合法的金额数字，最多两位小数",
            trigger: "blur",
          },
        ],

        // 导出
        // 下载链接
let downloadFiles = (url) => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none"; // 防止影响页面
  iframe.style.height = 0; // 防止影响页面
  iframe.src = url;
  document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    // iframe.remove();
    document.body.removeChild(iframe);
  }, 2000);
};

   // 处理删除最后一页无数据
          let deleteAfterPage = Math.ceil((this.total - 1) / 5)
          let currentPage = this.currentPage > deleteAfterPage ? deleteAfterPage : this.currentPage
          this.currentPage = currentPage < 1 ? 1 : currentPage
            this.serchFn();
css -object-fit//图片自适应

point-evetns：//地图鼠标穿透
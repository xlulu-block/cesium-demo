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
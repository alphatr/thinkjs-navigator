ThinkJS-Navigator
=========

遵照 ThinkJS 的数据结构，不依赖于任何模板工具的翻页组件；

### 安装使用

```
npm install thinkjs-navigator
```

git 地址：`https://github.com/AlphaTr/thinkjs-navigator.git`;

### 使用方法

```javascript
var Pager = require('thinkjs-navigator');
var baseUrl = "/index.html";
D('Article').page(this.get("page"), 20).countSelect().then(function(data){
	var pager = new Pager(data, baseUrl);
	console.log(pager.render());
});
```

返回类似于下面的 HTML

```html
<li class="prev"><a href="/index.html?page=8" class="prev">Prev</a></li>
<li><a href="/index.html">1</a></li>
<li><span>...</span></li>
<li><a href="/index.html?page=6">6</a></li>
<li><a href="/index.html?page=7">7</a></li>
<li><a href="/index.html?page=8">8</a></li>
<li class="current"><a href="/index.html?page=9" class="current">9</a></li>
<li><a href="/index.html?page=10">10</a></li>
<li><a href="/index.html?page=11">11</a></li>
<li><a href="/index.html?page=12">12</a></li>
<li><span>...</span></li>
<li><a href="/index.html?page=30">30</a></li>
<li class="next"><a href="/index.html?page=10" class="next">Next</a></li>
```

### 参数说明

#### new Pager(pageinfo, baseurl);

- `pageinfo` ThinkJS countSelect 返回的分页数据。
- `baseurl` 用于拼接分页 URL 的原始 URL。

countSelect 的基本数据格式如下；

```
{
    count: 123, //总条数
    total: 10, //总页数
    page: 1, //当前页
    num: 20, //每页显示多少条
    data: [{}, {}] //详细的数据
}
```
#### anchor(anchor);
设定返回 HTML 链接的锚点链接；

- `anchor` 锚点

#### render(prev, next, split, splitText, otherConf)
返回渲染的 HTML

- `prev` 上一页文本，默认为 "PREV"；
- `next` 下一页文本，默认为 "NEXT"；
- `split` 分割大小，即连续最多出现 split 个链接，默认为 3；
- `splitText` 分割字符，默认 "..."；
- `otherConf` 其他一些配置，包括标签，Class 的配置，默认值和格式如下；

```
{
    itemTag: 'li', // 每个按钮的标签
    textTag: 'span', // 分割符文本的标签
    currentClass: 'current', // 当前选中的页码 Class
    prevClass: 'prev', // 上一页 Class
    nextClass: 'next' // 下一页 Class
}
```

注意：render 返回的 HTML 不包含 li 外层的 ul 标签，所以需要自己加上；

### 配合 BootStrap 使用

配合 BootStrap 的使用需要在返回的 HTML 外边包裹 `<nav><ul class="pagination"></ul></nav>` 这样的标签，并在 render 时候传值 `currentClass` 为 `active`；

### 其他说明

这个组件不是必须 依赖于 ThinkJS，只需构造对应的数据格式即可；

### Liceise

MIT
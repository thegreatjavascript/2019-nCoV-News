# 2019-nCoV疫情实时播报🅥｜墙内传播版

<br/>

**传播📣链接**：http://2019ncov.tk

<br/>

> 后端接口代码在[这里](https://github.com/QuantumGhost/ncov-channel-crawler)（由 [@QuantumGhost](https://github.com/QuantumGhost) 提供，感谢他的贡献。）

电报上的那个频道是我知道的汇总国内官方渠道的疫情数据，做得最好的。我有天天看。（当然我也知道官方消息只有基本参考价值）。

但我这两天在安利这个频道时犯了难，因为我得先让朋友下载个 Telegram，还得教他翻墙......
考虑到这个难题，我连夜写了这个网页：**[http://2019ncov.tk]( http://2019ncov.tk)** 

在**国内可以直接访问查看频道更新的消息。**

（建议发给国内没有 Telegram 账户的朋友使用。）

数据来自：Telegram [同名频道](https://t.me/nCoV2019)提供的[RSS 源]( https://rsshub.app/telegram/channel/nCoV2019)



**项目预览：（Mobile）**

![previews](./previews/2.png)

**同名Telegram频道长这样：**

![3](./previews/3.png)



#### 部署到其他地方

> 项目前后端分离，本仓库仅包含前端部分。

**前端部分部署**

将前端资源文件（`dist/`）上传到服务器即可。

```bash
# 1. 下载项目，通过git命令或者自行下载ZIP文件
git clone git@github.com:thegreatjavascript/2019-nCoV-News.git

# 2. 命令行下进入到项目文件夹
cd 2019-nCoV-News

# 3. 使用scp命令将资源文件上传到服务器对应目录下，比如下面命令（hostname/ip/路径 请自行更改成你的）
scp -r ./dist/* root@xx.xx.xx.xx:/var/www/html
```



**后端部分部署（非必须）**

> 消息数据由此[后端项目](https://github.com/QuantumGhost/ncov-channel-crawler)提供，通过Python调用Telegram接口来获取。除非你有特别的理由，否则不建议折腾。

**环境要求：**

1. [Node.js](https://nodejs.org/zh-cn/download/)
2. npm（正常情况下安装完Node.js后会自动附带安装好，无需另行安装）
3. [Python3](https://www.python.org/download/releases/3.0/)

```bash
# 1. 下载项目，通过git命令或者自行下载ZIP文件
git clone git@github.com:QuantumGhost/ncov-channel-crawler.git

# 2. 命令行下进入到项目文件夹
cd ncov-channel-crawler

# 3. 我也不会部署Python项目 #需要朋友们补充
...

# 4. 部署完Python项目后，需要手动修改下前端 `request.js` 中的`api`地址

# 5. 重新打包前端项目，生成最新的资源文件
cd 2019-nCoV-News
# 安装项目依赖
# 也可以使用`yarn`/`cnpm install`（如果你不是前端开发者，建议使用`cnpm install` ，自行Google安装`cnpm`命令，解决国内下载依赖慢的问题）
npm install
# 生成资源文件
npm build

# 6. 重新将最新的资源文件上传到服务器，详细说明同上
scp -r ./dist/* root@xx.xx.xx.xx:/var/www/html
```


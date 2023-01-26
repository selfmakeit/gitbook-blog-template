# 基于gitbook的博客模板

在尝试了多种支持markdown的博客架子之后还是发现gitbook最方便，平时想要记点什么东西直接打开typora写完直接上传就可以了。

# 最终效果

![image-20230126135107784](https://raw.githubusercontent.com/selfmakeit/resource/main/image-20230126135107784.png)

![image-20230126135224711](https://raw.githubusercontent.com/selfmakeit/resource/main/image-20230126135224711.png)

# 使用

直接下载项目后直接在note文件夹写你的markdown文件，之后部署就可以了。如果你是在markdown中插入了图片一类的资源的话，有两种方式：

	1. 将图片上传到网上作为链接插入
	1. 图片在本地的话把你markdown文件的资源文件一起放在项目中来（可以设置为相对路径，这样在把文件复制到博客项目中的时候就直接连同文件夹一起放到项目中的note文件下就可以了）

![image-20230126140613883](https://raw.githubusercontent.com/selfmakeit/resource/main/image-20230126140613883.png)

# 有三种比较方便的部署方案：

* Jenkins
* 脚本自动上传服务器部署
* 项目部署在vercel

我个人采用的第二种方式，在build后自动上传到服务器，但是其实第三种方式通过把项目部署在vercel上，后期新写什么博客之后push到github就自动部署了，这种其实也更为方便，也不需要你有自己的服务器。


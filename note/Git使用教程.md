# Git使用详细教程

## 基本使用

1. 代码仓库

    Remote: 远程主仓库；
    Repository： 本地仓库；

2. 初始化开发的操作流程

   克隆最新主分支项目代码 git clone 地址
   创建本地分支 git branch 分支名(基于你当前的分支新建)
   查看本地分支 git branch
   查看远程分支 git branch -a
   切换分支 git checkout 分支名 (一般修改未提交则无法切换，可强制切换 git checkout 分支名 -f )
   将本地分支推送到远程分支 git push <远程仓库> <本地分支>:<远程分支>

3.代码提交的一般流程

    git status 查看状态
    git add . 将所有修改加入暂存区
    git commit -m “提交描述” 将代码提交到 本地仓库
    git push 将本地仓库代码更新到远程仓库

解决冲突，如果项目是多人开发，难免都会有冲突。我们可以在每次push之前，先pull一下你所要推送的远程分支，流程如下

    git status 查看状态
    git add . 将所有修改加入暂存区
    git commit -m “提交描述” 将代码提交到 本地仓库
    git pull拉取远程代码，而冲突需要手动解决
    解决好后重新进行git add . git commit -m"…" git push

我们 git pull的时候可以加上了 --rebase, 那么第5步操作将变成如下

    git add .
    git rebase --continue
    git push

4.Git commit日志基本规范

type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下：

    feat：新功能（feature）
    fix: 修复bug
    style: 仅仅修改了空格、格式缩进,格式（不影响代码运行的变动）
    refactor: 代码重构，没有加新功能或者修复bug
    perf: 优化相关，比如提升性能、体验
    test: 测试用例，包括单元测试、集成测试等
    chore: 改变构建流程、或者增加依赖库、工具等
    revert: 回滚到上一个版本

5. Git分支操作

   使用 Git 下载指定分支命令为：git clone -b 分支名仓库地址
   拉取远程新分支到本地 git checkout -b test origin/test(将远程test分支拉取到本地并命名为test)
   合并本地分支 git merge hotfix：(将 hotfix 分支合并到当前分支, 可以将本地分支，远程分支merg到当前分支)
   删除本地分支 git branch -d hotfix：(删除本地 hotfix 分支)
   删除远程分支 git push origin --delete serverfix
   上传新命名的本地分支：git push origin newName;
   创建新分支：git branch branchName：(创建名为 branchName 的本地分支)
   切换到新分支：git checkout branchName：(切换到 branchName 分支)
   创建并切换分支：git checkout -b branchName：(相当于以上两条命令的合并)
   查看本地分支：git branch
   查看远程仓库所有分支：git branch -a
   本地分支重命名： git branch -m oldName newName
   重命名远程分支对应的本地分支：git branch -m oldName newName
   git 拉取更新远程分支列表: git remote update origin --prune
   回滚到某个版本: git reset --hard 版本号
   查询提交的版本号: git reflog
   将代码同步到远程Git仓库: git push origin name (将修改发布到远程仓库)
   将远程分支拉到本地: git fetch origin dev（dev为远程仓库的分支名）

6.本地仓库更换远程地址（）

1.查看目前关联的 git remote地址: git remote -v

2.重新设置关联的git remote地址: git remote set-url origin xxx

git远程连接由http换成ssh:

    删除git remote地址: git remote rm origin
    删除并添加管理git remote新地址：git remote add origin git@xxx/ios.git
    git push origin xxx

7.将本地新建工程推到git上

    （先进入项目文件夹）通过命令 git init 把这个目录变成git可以管理的仓库: git init
    把文件添加到版本库中，使用命令 git add .添加到暂存区里面去，不要忘记后面的小数点“.”，意为添加文件夹下的所有文件：git add .
    用命令 git commit告诉Git，把文件提交到仓库。引号内为提交说明: git commit -m ‘first commit’
    关联到远程库：git remote add origin 你的远程库地址
    获取远程库与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）：git pull --rebase origin master
    把本地库的内容推送到远程，使用 git push命令，实际上是把当前分支master推送到远程。执行此命令后会要求输入用户名、密码，验证通过后即开始上传。：git push -u origin master

## 个人项目提交流程

1. github创建仓库
2. 本地编写代码
3. 项目文件夹里 git init
4. git add .
5. git commit -m "init"
6. git remote add origin https://github.com/selfmakeit/notebook.git(地址为仓库地址)
7. git push origin master
8. 如本地删除了什么文件可以使用git rm -r --cached . 清除之后再git add .添加之后提交，这种一般情况是在gitignore里忘记忽略某些文件不用提交的情况下使用
9. 也可用git rm --cached server/config/*这种方式只删除某一个文件夹或者文件(远程和本地都会删除)之后再重新提交。

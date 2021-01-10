## 简介
这是一个简单地用于本人偷懒的 cli。

## 特点

 使用 Node.js，目前主要是根据模板创建新的文件夹或者文件
 
 ## 文档
 -  [全局安装](#全局安装)
 -  [指令介绍](#指令介绍)
 -  [新建一个模块](#新建一个模块)
 -  [新建文件](#新建文件)
 -  [Todo](#Todo)
 
 ## 全局安装
 
 ### 拉取项目
 
 ```bash
 git clone https://github.com/Kaviilee/kaa-cli.git
 cd kaa-cli
 npm install
 ```
 
 ### 全局安装
 
 ```bash
 npm install -g
 ```
 ## 指令介绍
 查看指令帮助 kaa -help
 
 ```bash
$ kaa -help
Usage: index [options] [command]

Options:
  -v, --version                           output the version number
  -h, --help                              display help for command

Commands:
  init                                    initialize your kaa config
  new [module]/[module]-[page] [dirType]  generate a new module
  help [command]                          display help for command
 ```

注意：当使用 `new` 命令时 `[module]` 如果传入 **`$`**，则表示在当前目录生成。

```bash
kaa new $
```

 ## 新建一个模块
 
 ```bash
 # 默认是生成 react 文件夹
 kaa new demo
 ```
 这会生成一个目录结构
 
 ```bash
 demo
  ├─index.tsx
  └─index.less
 ```
 如果带参数
 
 ```bash
 kaa new demo/page-home vue
 ```
 
 这样生成的目录结构
 
 ```bash
 demo
  └─page
    └─home
      ├─index.tsx
      └─index.less
 ```
 当然这里的 `index.tsx` 是 vue 的 tsx 写法。
 
 ## 新建文件
 
 ```bash
 kaa new demo/home.tsx rf
 ```
 这个命令会在当前目录新建一个 `demo/home.tsx` 文件
 
 ```bash
 kaa new demo/home.vue vf
 ```
 这个命令会在当前目录新建一个 `demo/home.vue` 文件
 
 ## Todo
 - [x] 生成一整套自定义的 vue3 模板
 - [ ] 生成一套自定义的 react 模板

参加了 @哥飞 大佬的[AI 数独游戏讲解小练习]( https://mp.weixin.qq.com/s/9Tl8TG8hnvlLfCkVmPzf-w). 功能不算复杂,正好适合刚学习前端的我.

在这里想借鉴 build in public 的模式, 跟大家分享整个项目的开发过程.

我将会按照下面的游戏版本逐步进行开发(一周一个版本),也欢迎大家给这个简单小游戏提供一些建议.

作为一个前端/出海新人, 整个项目过程会关注在**前端技术学习***以及**网站出海**上, 也希望项目过程能给同样想做网站出海的朋友一些经验参考.

本项目使用react+nextjs+prisma搭建, 数据库采用postgresql, 部署在vercel上.

### Getting Started

First, run the development server:

```bash
#1. 安装node依赖
pnpm install
#2. 调整.env配置(vercel数据库配置),从vercel上拷贝配置
POSTGRES_DATABASE=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_PRISMA_URL=
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
#3. 初始化库表
node ./script/init.mjs
#4. 启动项目
pnpm run dev

```

访问[http://localhost:3000](http://localhost:3000) 即可.

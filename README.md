# 使用说明
## 安装和运行

### 安装docker 和 docker compose

### 启动swagger ui


```
➜  ✗ pwd
/path/to/swagger-mocker-server

➜  ✗ docker-compose up -d swagger_ui

```

然后访问 http://localhost:7777/


### 启动 swagger mock server

#### 本地安装依赖和启动(开发时推荐)
```
# 安装
npm install -g swagger

cd server

npm install

cp swagger-router.js node_modules/swagger-tools/middleware/swagger-router.js

# 启动server (在server目录下运行)
npm run server

# 启动辅助编辑器 开发时方便编辑, 以docker compose启动时, 这个编辑器目前没找到合适的方式暴露出来(主要是 swagger editor难以定制)
npm run edit (在server目录下运行)
```

#### 用 Docker-compose 方式(搭服务时推荐)
```
➜  ✗ pwd
/path/to/swagger-mock-server

➜  ✗ docker-compose up -d swagger_mock_server

```


## 主要文件目录结构
- doc : 存放接口文档
- ui : 根据接口文档生成ui界面方便查看和调用
- server : 根据文档生成mock接口相关



## swagger ui 说明
- 从doc/swagger.yaml 取文档
- ui/dist 目录 来源于 [swagger-ui](https://github.com/swagger-api/swagger-ui) 下的dist
- 修改了swagger/dist中的 index.html 的 `SwaggerUIBundle` 中的 `url`, 使其指向doc中的swagger.yaml
- docker-compose.yaml 中使用 `nginx:apline` 做基础镜像, 挂载如下对应目录:
```
ui/dist -> /usr/share/nginx/swagger_ui
doc             -> /usr/share/nginx/doc
swagger.conf    -> /etc/nginx/conf.d/swagger.conf
```
使得访问容器的7777即可访问ui/dist/index.html, 从而能够解析doc/swagger.yaml

## swagger mock server 说明
- mocker_server 基于 [swagger-node](https://github.com/swagger-api/swagger-ui) 创建
- 参考 `swagger-node` 使用 `swagger project create ` 命令创建
- 采用 "server/swagger-routers.js" 来支持更新灵活的mock语法
  相关文档参考 [这里](http://blog.kazaff.me/2016/09/21/%E5%A6%82%E4%BD%95%E5%9F%BA%E4%BA%8E%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3%E7%94%9F%E6%88%90%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE/)
- 采用 `swagger project start -m`  的方式来以mock mode的方式启动server
  相关文档参考 [这里](https://github.com/swagger-api/swagger-node/blob/master/docs/mock-mode.md)
- server/Dockerfile 中采用 `node:alpine` 为基础镜像, 从环境变量获得文档位置 `DOCPATH` 和 服务监听接口`PORT`
- docker-compose.yaml 挂在对应目录 `./doc -> /run/doc`

# Mock语法说明
TODO

# 参考文档:
- https://github.com/swagger-api/swagger-node
- http://blog.kazaff.me/2016/09/21/%E5%A6%82%E4%BD%95%E5%9F%BA%E4%BA%8E%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3%E7%94%9F%E6%88%90%E6%A8%A1%E6%8B%9F%E6%95%B0%E6%8D%AE/
- https://github.com/swagger-api/swagger-node/blob/master/docs/mock-mode.md
- https://github.com/swagger-api/swagger-node/issues/384
- Another mock server : https://github.com/BigstickCarpet/swagger-express-middleware


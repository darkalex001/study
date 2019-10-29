### 接口演示

> mock.php

```php
<?php

//启动服务，在当前目录，执行 php -S 127.0.0.1:8888

//GET  http://127.0.0.1:8888/mock.php/now           返回服务器当前时间

//POST http://127.0.0.1:8888/mock.php/user/create        新增用户 字段:username sex，成功返回用户id
//GET  http://127.0.0.1:8888/mock.php/user               列出所有用户
//GET  http://127.0.0.1:8888/mock.php/user/get?id=xxx    查询单个用户
//POST http://127.0.0.1:8888/mock.php/user/update?id=xxx 更新指定用户
//POST http://127.0.0.1:8888/mock.php/user/delete?id=xxx 删除指定用户


header('Access-Control-Allow-Origin: *');

$pathinfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';

define('DATA_FILE', 'users.json');
$user = new User();

switch($pathinfo){
    case "/user":
        echo json_encode($user->getAll());
        break;
    case "/user/get":
        echo json_encode($user->getOne($_GET['id']));
        break;
    case '/user/create':
        echo json_encode($user->create($_POST));
        break;
    case '/user/delete':
        echo json_encode(['status'=>$user->delete($_GET['id'])]);
        break;
    case '/user/update':
        echo json_encode(['status'=>$user->update($_GET['id'], $_POST)]);
        break;

    case '/now':
        echo json_encode(['status'=>true, 'time'=>date('Y-m-d H:i:s')]);
        break;
    case '/health':
        echo 'ok';
        break;
    default:
       echo '404 Not Found!';
}

class User{

    private function check($user){
        if(empty($user['username'])){
            echo 'invalid username';
            exit;
        }

        if(!array_key_exists('sex', $user)){
            echo 'invalid sex';
            exit;
        }
    }

    private function getMaxId(){
        if(file_exists('maxid')){
            $id = intval(file_get_contents('maxid')) + 1;
        }else{
            $id = 1;
        }

        file_put_contents('maxid', $id);
        return $id;
    }

    public function getAll(){
        if(!file_exists(DATA_FILE)){
            return [];
        }
        
        return json_decode(file_get_contents(DATA_FILE), true);
    }

    public function getOne($id){
        foreach($this->getAll() as $user){
            if($user['id'] == $id){
                return $user;
            }
        }
    }

    public function create($user){

        $this->check($user);

        $users = $this->getAll();
        $user['id'] = $this->getMaxId();
        $users[] = $user;
        file_put_contents(DATA_FILE, json_encode($users));
        return $user['id'];
    }

    public function delete($id){
        $users = [];
        foreach($this->getAll() as $user){
            if($user['id'] != $id){
                $users[] = $user;
            }
        }
        file_put_contents(DATA_FILE, json_encode($users));
        return true;
    }

    public function update($id, $user){
        $this->check($user);

        $users = $this->getAll();
        foreach($users as $k=>$v){
            if($v['id'] == $id){
                $user['id'] = $id;
                $users[$k] = $user;
            }
        }
        file_put_contents(DATA_FILE, json_encode($users));
        return true;
    }
}
```

### Vue.js增删改查演示

1. ##### 静态html

```html
<div id="app">
    <table>
        <tr>
            <td>id</td>
            <td>name</td>
            <td>sex</td>
        </tr>
        <tr>
            <td>1</td>
            <td>jack</td>
            <td>男</td>
        </tr>
    </table>
</div>
```

2. ##### 将数据换成从Vue中获取

```javascript
var app = new Vue({
    el: '#app',
    data: {
        users: [
            {"id":1, "username": "jack", "sex":1},
            {"id":2, "username": "mary", "sex":0},
        ]
    }
})
```

```html
<div id="app">
    <table>
        <tr>
            <td>id</td>
            <td>name</td>
            <td>sex</td>
        </tr>
        <tr v-for="user in users">
            <td>{{user.id}}</td>
            <td>{{user.username}}</td>
            <td>{{user.sex == 0?'女':'男'}}</td>
        </tr>
    </table>
</div>
```

3. ##### 获取服务器数据

注释掉 data中的测试数据

```javascript
var app = new Vue({
    el: '#app',
    data: {
        users: [
            //{"id":1, "username": "jack", "sex":1},
            //{"id":2, "username": "mary", "sex":0},
        ]
    },
    mounted(){

        // this.users=[
        //     {"id":1, "username": "jack", "sex":1},
        //     {"id":2, "username": "mary", "sex":0},
        // ]

        // console.log([
        //     {"id":1, "username": "jack", "sex":1},
        //     {"id":2, "username": "mary", "sex":0},
        // ])

        //var _this = this;
        
        $.ajax({
            method:"get",
            dataType: "json",
            url:"http://127.0.0.1:8888/mock.php/user",
            success: (res)=>{
                //console.log(res)
                //_this.users = res
                this.users = res
            }
        })
    }
})
```

```html
<div>新增</div>
<div>
    <div>username<input type="text" v-model="userForCreate.username"></div>
    <div>sex <input type="text" v-model="userForCreate.sex"></div>
    <div><button @click="add()">提交</button></div>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        users: [
            //{"id":1, "username": "jack", "sex":1},
            //{"id":2, "username": "mary", "sex":0},
        ],
        userForCreate:{
            username:"",
            sex:""
        }
    },
    mounted(){

        // this.users=[
        //     {"id":1, "username": "jack", "sex":1},
        //     {"id":2, "username": "mary", "sex":0},
        // ]

        // console.log([
        //     {"id":1, "username": "jack", "sex":1},
        //     {"id":2, "username": "mary", "sex":0},
        // ])

        //var _this = this;
        
        $.ajax({
            method:"get",
            dataType: "json",
            url:"http://127.0.0.1:8888/mock.php/user",
            success: (res)=>{
                //console.log(res)
                //_this.users = res
                this.users = res
            }
        })
    },
    methods:{
        add(){
            //表单验证
            if(this.userForCreate.username.length==0){
                alert("请输入用户名")
                return
            }

            if(this.userForCreate.sex.length==0){
                alert("请输入性别")
                return
            }

            $.ajax({
                method:"post",
                data: this.userForCreate,
                dataType: "json",
                url:"http://127.0.0.1:8888/mock.php/user/create",
                success: (res)=>{
                console.log(res)
                }
            })

        }
    }
})
```


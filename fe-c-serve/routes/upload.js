// 上传头像的路由
// upload.js

const express = require('express');
const router = express.Router();

const fs = require('fs');
const multer  = require('multer');

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/images/');   
        // cb(null, 'upload/') 
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
    }
});

// 创建文件夹
let createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
};

let uploadFolder = './upload/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });

/* POST upload listing. */
/**
 * 这里的post路径，有两种写法
 * 写法一： router.post('/', upload.single...)，实际请求路径就是/upload/
 * 写法二：router.post('/img', upload.single...)，实际请求路径就是/upload/img
 * 当然，这里的/img还可以写成别的
 * 有两种写法的原因是 在app.use里已经引入了/upload这个路由了，如果在upload文件里，
 * 请求路径是/，那就相当于在/upload后面加个/，就是实际请求路径。
 * 如果post请求路径是/xxx，就相当于在/upload后面加上这个路径，即/upload/xxx
 */
router.post('/', upload.single('file'), function(req, res, next) {
    const file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    let imgUrl = '/images/' + Date.now() + "-" + file.originalname
    // res.json({res_code: '0'});
    res.send({
        code: 0,
        imgUrl,
        // file
    })
});

// 导出模块（在 app.js 中引入）
module.exports = router;

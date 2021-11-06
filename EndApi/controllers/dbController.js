const dbConfig = require('../util/dbConfig')

// 登录用户

userLogin = (req,res) => {
    let sql = `select user_name,pwd from users where user_name = '${req.query.username}' and pwd = '${req.query.password}'`;
    let sqlArray = [];
    let callBack = (err,data) => {
        if(err){
            console.log("connect error!!!");
        }else{
             if(data == ""){
                res.send({
                    status:'402',message:'登录失败，账户或密码错误'
                })
            }else{
                res.send({
                    status:'200',message:'登录成功'
                })
            }
            
        }
    }
    dbConfig.sqlConnect(sql,sqlArray,callBack);
}


// 注册用户

userRegister = (req,res) => {
    let sql = `INSERT INTO users(user_name,pwd) VALUES('${req.body.username}','${req.body.password}')`;
    let sqlArray = [];
    let callBack = (err,data) => {
        if(err){
            console.log("connect error!!!");
        }else{
            res.send({status:'200',message:'注册成功'})
        }
    }
    dbConfig.sqlConnect(sql,sqlArray,callBack);
}


module.exports={
    userLogin,
    userRegister
}

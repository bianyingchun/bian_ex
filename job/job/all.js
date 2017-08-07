var Nightmare = require('nightmare'); 
var fs = require("fs"); 
var Spider = {};
var storage = []; //爬取记录
var files = [];//记录已存在文件
var timer = null; //定时器
var inow = 0; //记录游标
var sub_path = '';  //文件路径
var nightmare = Nightmare({ show: true });
var interval = 0;

var file_write = function(path,data){  // 写文件
  return new Promise(function(resole,reject){
    fs.writeFile(path, data, function(err){
      if(!err){
        resole();
      }else{
        reject(err);
      }
    })
  })
}
var sidebar_search =function(start_token){
  return new Promise(function(resole,reject){
     nightmare
    .goto('https://baidu.com')
    .type('#kw', start_token)
    .click('#su')
    .wait('h3')
    .exists('.opr-recommends-merge-content')
    .then(function(exsit){
      if(exsit){ 
        resole()
      }else{
        reject()
      } 
    })
  })
}
var more_search=function(start_token,cb){
  return new Promise(function(resole,reject){
     sidebar_search(start_token)
    .then(function(){ //存在侧边栏，
       nightmare
      .exists('.cr-title .cr-title-sub')
      .then(function(res){
        if(res){
          resole()
        }else{
          reject()
        }
      }) 
    })
    .catch(function(){ //不存在侧边栏————————修改
         var info = {
             text:start_token,
             token_t:new Date(),
             les:{}
         };
        file_write(sub_path,JSON.stringify(info))
            .then(function(){
                storage.push(start_token);
                inow++;
                cb();
            })
            .catch(function (err) {
                console.log(err);
            })

    })
  }) 
}

var search = function(start_token,cb){
  sub_path=start_token + '.json';
  fs.exists(sub_path, function(args){
   if(args){
      inow++;
      cb();
   }else{
      more_search(start_token,cb)
      .then(function(){//有more
        nightmare
        .wait('.cr-title .cr-title-sub')
        .evaluate(function(){//点开more
          var moreBtn = document.querySelectorAll('.cr-title .cr-title-sub');
          for(var i = 0;i < moreBtn.length;i ++){
            (function(i){
              moreBtn[i].click()
            })(i);    
          }
        })
        .then(function(){
          deal(start_token,cb)
        })
        .catch(function(err){
          console.error(err)
        })
      })
      .catch(function(){
        deal(start_token,cb)
      })
    }
 })
}
var nightmare_end = function(){ //关闭nightmare
  nightmare
  .end()
  .then(function(res){
    console.log('successful!')
  })
  .catch(function(err){
    console.error(err)
  })          
}

var token = function(){ //定时爬取
  if(inow>5000){
    nightmare_end();
    return;
  }
  var t = new Date().getTime();
  search(storage[inow],function(){
      file_write('records.json',JSON.stringify(storage))
          .then(function(){
              interval = new Date().getTime()-t;
              setTimeout(token,interval);
          }).catch(function(){
              return ;
          })
  })
}
var init = function(cb){ //初始化
    fs.readFile('records.json', function(err,data){
      if(err){
        storage = ['宫崎骏'];
      }else{
        storage = JSON.parse(data.toString());
      }
      cb()
    })
}
init(token)
var deal=function(start_token,cb){//数据处理——————修改
  nightmare
  .wait('.opr-recommends-merge-content .cr-title>span')
  .wait('.opr-recommends-merge-content .opr-recommends-merge-panel')
  .wait('.opr-recommends-merge-content .c-gap-top-small a')
  .evaluate(function () {
    var result = {};
    result.les={};
    result.arr = [];
    var o_span =document.querySelectorAll('.opr-recommends-merge-content .cr-title>span');//分类span标签
    var o_panel =document.querySelectorAll('.opr-recommends-merge-content .opr-recommends-merge-panel');//分类面板
    for(var i=0;i<o_span.length;i++){
        (function(){
            var title=o_span[i].title;
            var o_a = o_panel[i].querySelectorAll('.c-gap-top-small a');
            var a_text=[];
            for(var j=0;j<o_a.length;j++){
                a_text.push(o_a[j].title);
                result.arr.push(o_a[j].title)
            }
            result.les[title]=a_text;
        })()
    }
          return  result;
  })
  .then(function(result){//处理信息
    console.log(result.arr.length);
     var info = {
         text : start_token,
         token_t : new Date().getTime(),
         les : result.les

     };
      while(result.arr.length) {
        storage.push(result.arr.shift())
      }
    file_write(sub_path,JSON.stringify(info))
    .then(function(){
      inow ++ ;
       cb();
    })
    .catch(function(err){
    console.log(err);
    })
  })
}

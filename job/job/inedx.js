var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });
var fs=require('fs');

var run=function(keyWord){
  nightmare
  .goto('https://baidu.com')
  .type('#kw', keyWord)
  .click('#su')
  .wait('.cr-title a')
  .evaluate(function(){
    var result=[];
    var links=document.querySelectorAll(".cr-title a");
    for(var i=0;i<links.length;i++){
      (function(i){
        links[i].click();
      })(i)
      
    }
  })
  .wait('.cr-title>span')
  .evaluate(function () {
    var result=new Array();//搜索结果信息
    var type=[];//相关词条
    var linked=[];//相关词条链接信息
    var oSpan=document.querySelectorAll('.cr-title>span');
    var oPanel=document.querySelector('.opr-recommends-merge-panel');
    for(var i = 0; i  < oSpan.length;i++){
      type[i].title=oSpan[i].innerText;
      var oA = oPanel[i].querySelector('.c-gap-top-samll a');
       for(var i = 0; i  < oA.length;i++){
          linked.push(oA[i].title);
       }
    }
    return type;
    // result={
    //   t:new Date().getTime(),
    //   title:keyWord,
    //   linked:linked
    // }<div class="opr-recommends-merge-panel opr-recommends-merge-mbGap">…</div>
  })
  .end()
  .then(function (result) {
      fs.writeFile(keyWord+'.txt', JSON.stringify(result), function(err){
        if(err){
          console.error('files failed:', err);
        }
        
      });
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}
run('百度')
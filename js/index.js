/**
 * Created by usereee on 2018-02-23.
 */

window.onload = function () {


    //搜索input

    var label =   document.getElementsByTagName("label")[0];
    var searchInp = document.getElementById("search-inp");
    //输入内容，模拟服务器获取内容，创建ul ，在其中显示
    var searchArea = document.getElementsByClassName("search-area")[0];
    //模拟服务器数据
    var select_msg = ["a","aa","aaa","b","bb","bbb","ab","aab"];
       searchInp.oninput = function () {
           //键盘输入时控制label出现消失
           if(this.value == ""){
               label.className="show";
           }else {
               label.className="hide";
           }
           //创建字符串，添加对应的li和内容
            var newArr = [];
            //从数组中查询以input中输入内容为开头的信息添加到li中
           //遍历老数组，判断哪一项为内容开头
           for(var i=0;i<select_msg.length;i++){
               var num = select_msg[i].indexOf(this.value);
               if(num == 0){
                   newArr.push("<li>"+select_msg[i]+"</li>")
               }
           }
            var str = newArr.join("");
           //创建一个ul之前删除前一个
           if(searchArea.children[0]){
               searchArea.removeChild(searchArea.children[0])
           }
           //如果内容为空直接返回不执行接下来的代码
           if(this.value.length == 0){
               return;
           }
           //当没有匹配结果时提醒
           if(newArr.length == 0){
               var ul = document.createElement("ul");
               ul.innerHTML = "<li>没有匹配结果</li>";
               searchArea.appendChild(ul);
                return;
           }
           //创建ul将匹配结果放入其中，并添加ul到searchArea
           var ul = document.createElement("ul");
           ul.innerHTML = str;
           searchArea.appendChild(ul);
       }
        searchInp.onblur = function () {
           //失去焦点时label的控制
            if(this.value == ""){
                label.className="show";
            }else {
                label.className="hide";
            }
        }




    //slide1
    var slide1 = document.getElementsByClassName("slide1");
    for (i=0;i<slide1.length;i++){

    slide(slide1[i]);

    }
    //点击下标切换
    //为所有btnSpan绑定单击响应
    //var index = 0;

   function slide(name) {
       var ul = name.getElementsByTagName("ul")[0];
       var li =ul.getElementsByTagName("li");

       var prev = name.getElementsByClassName("nav-prev")[0];
       var next = name.getElementsByClassName("nav-next")[0];

       var slideBtns =name.getElementsByClassName("slide-btns")[0];
       if(slideBtns){
           var btnSpan = slideBtns.getElementsByTagName("span");
           for(var i=0;i<btnSpan.length;i++){
               btnSpan[i].index = i;
               btnSpan[i].onclick = function () {
                   clearInterval(timer)
                   //排他
                   index = this.index
                   setBtns();
                   //第一张 0 -750
                   //第二张 1 -1500
                   //第三张 2 -2250

                   // ul.style.left = PAGE_WIDTH *index + PAGE_WIDTH +"px";
                   move(ul,'left',PAGE_WIDTH *index + PAGE_WIDTH,30,function () {
                         atuoSlide();
                   })
               }

           }
       }

       var PAGE_WIDTH = -parseInt(getStyle(li[0],'width'));
       var index = 0;

       function setBtns() {
           //判断当前索引是否是最后一张
           if(index >= li.length-2){
               //将当前索引设置为第一张的索引
               index = 0;
               ul.style.left = PAGE_WIDTH+"px";
           }
           if(index <0){
               index =li.length-3;
               ul.style.left =PAGE_WIDTH *(li.length-2) +"px"
           }
           if(!slideBtns){
               return false;
           }
           for(var i=0;i<btnSpan.length;i++){
               btnSpan[i].className = "";
           }
           btnSpan[index].className = "on";
       }


       //读取元素样式
       function getStyle(obj,name) {
           //获取元素当前显示样式  currentStyle只有IE支持 getComputedStyle其他浏览器
           if(window.getComputedStyle){
               return getComputedStyle(obj,null)[name];
           }else {
               return obj.currentStyle[name];
           }
       }
       //定时器执行动画效果
       function move(obj,attr,target,speed,callback) {
           clearInterval(obj.timer);
           //获取当前位置
           var  current =parseInt(getStyle(obj, attr));
           //判断速度正负
           speed = current<target? speed:-speed;
           obj.timer = setInterval(function () {
               var oldValue = parseInt(getStyle(obj, attr))
               var newValue = oldValue + speed;
               //向左移动newValue是否<target
               //向右移动newValue是否>target
               if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
                   newValue = target;
               }
               obj.style[attr] = newValue + "px";
               //移动到目标位置停止
               if (newValue == target) {
                   //关闭定时器
                   clearInterval(obj.timer);
                   callback && callback();
               }

           },30)


       }
       //点击前后切换
       next.onclick = function () {
           index++
           index%=(li.length-1)
           move(ul,'left',PAGE_WIDTH*(index+1),50,function () {
               setBtns();
           });

       }
       prev.onclick = function () {
           index--
           index %=(li.length-1);
           move(ul,'left',PAGE_WIDTH*(index+1),50,function () {
               setBtns();
           });

       }
       var timer;
       //自动切换
       function atuoSlide() {
           timer =  setInterval(function () {
               index++;
               //判断index的值
               index %=(li.length-1);
               //执行move
               move(ul,'left',PAGE_WIDTH*(index+1),30,function () {
                   setBtns();
               });
           },3000)
       }
       atuoSlide();
   }



    //搜索框
    var navSearch = document.getElementsByClassName("nav-search")[0];
    var searchNav = document.getElementsByClassName("search-nav-wrap")[0];
    var count = 1;
    function open(a,b) {
        if(count%2 == 1){
            a.className += " open"
            b.style.display="block";
        }
        if(count%2 == 0){

            a.className="nav-search fr";
            b.style.display="none";
        }
        count++;
    }
    navSearch.onclick = function () {
        open(navSearch,searchNav)

    }



    //精品计划tab切换
    var plan = document.getElementsByClassName("exclusive-plan");
    var sub_nav = document.getElementsByClassName("sub-nav");
    for(var i=0;i<plan.length;i++){
        tab(sub_nav[i],plan[i]);
    }
    //函数封装
    function tab(a,b){
        //获取事件源及相关元素
        var ddaArr = a.getElementsByTagName("a");
        var switchArr = b.getElementsByClassName("pic-switch");
        //循环绑定事件
        for (var i=0;i<ddaArr.length;i++){
            //绑定索引
            ddaArr[i].index = i;
            ddaArr[i].onmouseover = function () {
                for (var j=0;j<ddaArr.length;j++){
                    //事件执行（排他）
                    ddaArr[j].className = "";
                    switchArr[j].className = "pic-switch clearfix";
                }
                //利用索引值显示下面的switch盒子
                this.className="current";
                switchArr[this.index].className += " show";
            }

        }

    }

    //滚轮触发导航栏
    var header = document.getElementById("header");
    var rightNav = document.getElementById("right-fixed-nav");
    var t=0;

    function scroll(obj,obj2){
        //清除Timeout，
        clearTimeout(obj.timer);
        //获取滚动条滚动过的距离
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop == 0){
            obj.style.top = '0';
            obj.style.position = "absolute"
        }
        //scrollTop >= t时，说明鼠标向下滚动，
        else if(scrollTop >= t){
            obj.style.top = '-90px';
            obj.style.position = "fixed"
            //当滚动到一定位置时右侧导航栏弹出
            if(scrollTop >= 800){
                obj2.style.display ='block';
            }
        }else{   //scrollTop >= t时，说明鼠标向上滚动，
            obj.style.top = '0';
            obj.style.position = "fixed"
            //当滚动到一定位置时右侧导航栏消失
            if(scrollTop < 800){
                obj2.style.display ='none';
            }
            //3s后关闭导航
            obj.timer = setTimeout(function(){
                obj.style.top = '-90px';
            },3000);
        }
        //将当前的scrollTop赋值给t，之后每一次鼠标滚动，只要比当前scrollTop小说明向上滚动，比当前scrollTop大说明向下滚动
        t =scrollTop;
    }
   window.onscroll= function() {
        scroll(header,rightNav)
   }


  //回到顶部
    var goTop = document.getElementsByClassName("gotop")[0];
    goTop.onclick = function () {
        //平滑滚动
      var timer=  setInterval(function () {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            document.body.scrollTop  = scrollTop - 30;
            if (document.body.scrollTop == 0 ) {
                //关闭定时器
                clearInterval(timer);
            }
        },0)
    }
}





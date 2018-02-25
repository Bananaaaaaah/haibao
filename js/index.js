/**
 * Created by usereee on 2018-02-23.
 */

window.onload = function () {
    //搜索框
    var navSearch = document.getElementsByClassName("nav-search")[0];
    var searchNav = document.getElementsByClassName("search-nav-wrap")[0];

    var i = 1
    console.log(i)
    navSearch.onclick = function () {
        if(i%2 == 1){
            navSearch.className += " open"
            searchNav.style.display="block";
        }
        if(i%2 == 0){

            navSearch.className="nav-search fr";
            searchNav.style.display="none";
        }
        i++;

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
    var time;
   window.onscroll= function() {
       //清除Timeout，
       clearTimeout(time);
       //获取滚动条滚动过的距离
       var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop == 0){
            header.style.top = '0';
        }
        //scrollTop >= t时，说明鼠标向下滚动，
        else if(scrollTop >= t){
            header.style.top = '-90px';
            //当滚动到一定位置时右侧导航栏弹出
            if(scrollTop >= 800){
                rightNav.style.display ='block';
            }
        }else{   //scrollTop >= t时，说明鼠标向上滚动，
            header.style.top = '0';
            //当滚动到一定位置时右侧导航栏消失
            if(scrollTop < 800){
                rightNav.style.display ='none';
            }
            //3s后关闭导航
            time = setTimeout(function(){
                header.style.top = '-90px';
            },3000);
        }
        //将当前的scrollTop赋值给t，之后每一次鼠标滚动，只要比当前scrollTop小说明向上滚动，比当前scrollTop大说明向下滚动
       t =scrollTop;
   }


}





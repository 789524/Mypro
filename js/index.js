$(function(){
   //显示与隐藏
 $('[name=show-hide]').hover(function(){
           var id=this.id+'_items';
           $('#'+id).show();
 },function(){
    var id=this.id+'_items';
    $('#'+id).hide();
 })
 //轮播图
 //得到所有照片的div
 var $div = $('#list');
 var $span = $('#pointsDiv>span')
 //获取照片当前的位置
 var index = 1;
 var isToggleImagEnd = true;
 //点击按键往左移动
 $('#prev').click(function () {
     isToggleImg(0)
 });
 //点击按键往右移动
 $('#next').click(function () {
     isToggleImg(1)
 });

 function isToggleImg(n) {
     if (isToggleImagEnd) {
         isToggleImagEnd = false;
         if (n == 0) {
             index--;
         } else {
             index++;
         }
         $div.animate({
             left: index * (-630)
         }, 1000, function () {
             if (index == 0) {
                 index = 6;
             }
             if (index == 6) {
                 index = 1;
             }
             //设置图片轮播时，从最后一张跳到第一张不会有间隙，跟其他图片一样跳转
             $div.css('left', index * (-630))
             //设置图片下面的圆点状态，更改其类属性
             $span.removeClass('on');
             $($span.get(index - 1)).addClass('on')
             isToggleImagEnd = true;
         })
     }
 }
//设置延时函数，让图片自己定时轮播下一张
 var interval = setInterval(function () {
     isToggleImg(1);
 }, 2000)

 //鼠标图片移上图片停止轮播，挪开继续轮播
 $("#container").hover(function () {
     clearInterval(interval)
 }, function () {
     interval = setInterval(function () {
         isToggleImg(1);
     }, 2000)
 });

//对小圆点设置监听事件，点击小圆点，图片跳转
 $span.click(function () {
     index = $(this).index();
     isToggleImg()
 });

 //回顶部效果
   $('#back').click(function(){
           //总距离
			var distance = $('html').scrollTop()+$('body').scrollTop();
			//height为了更新当前滚动条的高度而用
			var height = $('html,body');
			//总时间(500ms)
			var time = 500;
			//每间隔intervalTime时间滚动一次
			var intervalTime = 50;
			//计算每次滑动的距离
			var itemDistance = distance/(time/intervalTime);
			//使用循环定时器不断滚动
			var intervalId = setInterval(function() {
				distance -= itemDistance;
				if(distance<=0) {//到达顶部，停止定时器
					distance = 0;
					clearInterval(intervalId);
				}
				//更新当前滚动条的高度
				height.scrollTop(distance);
			},intervalTime);
		});
});

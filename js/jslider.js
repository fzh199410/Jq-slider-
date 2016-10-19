/**
 * Created by fuzhihong on 16/9/9.
 */
(function($){

    $.extend($.fn,{
        jslider:function(setting){
            var ps= $.extend(
                {
                    renderTo:$(document.body),
                    enable:true,
                    initPositon:'max',
                    size:{barWidth:200,slideWidth:5},
                    barCssName:'defaultbar',
                    completedCssName:'jquery-completed',
                    sliderCssName:'jquery-jslider',
                    sliderHover:'jquery-jslider-hover',
                    onChanging:function(){},
                    onChanged:function(){}
                }
            ,setting)
            ps.renderTo = (typeof ps.renderTo == 'string' ? $(ps.renderTo) : ps.renderTo);
            var sliderbar=$('<div><div>&nbsp;</div><div>&nbsp;</div></div>')
                                .attr('class',ps.barCssName)
                                    .css('width',ps.size.barWidth)
                                        .appendTo(ps.renderTo);

            var completedbar=sliderbar.find('div:eq(0)').attr('class',ps.completedCssName);


            var slider = sliderbar.find('div:eq(1)')
                .attr('class', ps.sliderCssName)
                .css('width', ps.size.sliderWidth);
            console.log(slider)
            var bw=sliderbar.width()   ;   var sw=slider.width();

            if(typeof window.sliderProcess == 'undefined'){
                window.sliderProcess=new Function('obj1','obj2','left','obj1.css("left",left),obj2.css("width",left)')
            }

            ps.limited={min:0,max:bw-sw};
            sliderProcess(slider, completedbar, eval('ps.limited.' + ps.initPositon)/2);
            var slide={
                drag:function(e){
                    var d= e.data;
                    var l=Math.min(Math.max(e.pageX- d.pageX + d.left,ps.limited.min),ps.limited.max);
                    sliderProcess(slider,completedbar,l);
                    ps.onChanging(l/ps.limited.max,e)
                },

                drop:function(e){


                    slider.removeClass(ps.sliderHover);
                    //push two parameters: 1st:percentage, 2nd: event
                    ps.onChanged(parseInt(slider.css('left')) / sw - ps.limited.max, e);

                    $().unbind('mousemove', slide.drag).unbind('mouseup', slide.drop);
                }


            };
            if(ps.enable){
                slider.bind('mousedown',function(e){
                    var d={
                        left:parseInt(slider.css('left')),
                        pageX: e.pageX
                    };
                    $(this).addClass(ps.sliderHover);
                    $().bind('mousemove',d,slide.drag).bind('mouseup',d,slide.drop);
                });
            }


        }
    })




}(jQuery))
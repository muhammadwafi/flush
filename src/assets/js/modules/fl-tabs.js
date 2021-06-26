require("jquery-touchswipe");
(function($) {
    $.fn.flushTabs = function() {
        this.each(function(i, e) {
            var thisNav = $(this);
            var line = $('<div/>').addClass('line');
            line.appendTo(this);

            var navActive = thisNav.find('.nav-link.active');
            var navPos = 0;
            var navWidth = 0;

            if (!$(this).hasClass(".flex-column")) {
                tabsHorizontal($(this));
            } else {
                tabsVertical($(this));
            }
            
            // Horizontal Mode
            function tabsHorizontal(elem) {
                if (navActive.length) {
                    navPos = navActive.position().left + parseInt($(navActive).css('padding-left'));
                    navWidth = navActive.width();
                    line.css({
                        left: navPos,
                        width: navWidth
                    });
                }

                $(elem).find('.nav-link').on('click', function(e) {    
                    e.preventDefault();            
                    if(!$(elem).hasClass('active')) {
                        var _this = $(this);
                        var position = _this.position();
                        var width = _this.width();
                        var posLeft = position.left + parseInt($(this).css('padding-left'));
                        
                        line.animate({
                            width: width,
                            left: posLeft
                        }, 150);
    
                        navPos = posLeft;
                        navWidth = width;
                    }
                });
            }

            // Vertical Mode
            function tabsVertical(elem) {
                if (navActive.length) {
                    navPos = navActive.position().top + parseInt($(navActive).css('padding-top'));
                    navHeight = navActive.height();
                    line.css({
                        top: navPos,
                        height: navHeight
                    });
                }

                $(elem).find('.nav-link').on('click', function(e) {    
                    e.preventDefault();            
                    if(!$(elem).hasClass('active')) {
                        var _this = $(this);
                        var position = _this.position();
                        var height = _this.height();
                        var posTop = position.top + parseInt($(this).css('padding-top'));
                        
                        line.animate({
                            height: height,
                            top: posTop
                        }, 150);
    
                        navPos = posTop;
                        navHeight = height;
                    }
                });
            }
            // http://labs.rampinteractive.co.uk/touchSwipe/docs/
            // $(".tab-content").swipe({
            //     swipeLeft: function (e, direction, distance, duration, fingerCount) {
            //         var navActive = $(this).prev().closest(".nav-tabs").find(".nav-link.active");
            //         var targetNav = $(navActive).parent().next('li').find('a');
            //         console.log(duration, distance);
            //         if (targetNav.length) {
            //             var targetPos = targetNav.position().left + parseInt($(targetNav).css('padding-left'));
            //             var targetWidth = targetNav.width();
            //             line.animate({
            //                 width: targetWidth,
            //                 left: targetPos
            //             }, 150);
            //             $(targetNav).tab('show');
            //         }
            //     },
            //     swipeRight: function (e, direction, distance, duration, fingerCount) {
            //         var navActive = $(this).prev().closest(".nav-tabs").find(".nav-link.active");
            //         var targetNav = $(navActive).parent().prev('li').find('a');
            //         console.log(duration, distance);
            //         if (targetNav.length) {
            //             var targetPos = targetNav.position().left + parseInt($(targetNav).css('padding-left'));
            //             var targetWidth = targetNav.width();
            //             line.animate({
            //                 width: targetWidth,
            //                 left: targetPos
            //             }, 150);
            //             $(targetNav).tab('show');
            //         }
            //     },
            // });
        });
    };

    $.fn.flSwipeTabs = function() {
        $('[data-swipe="area"]').swipe({
            swipeLeft: function(e, direction, distance, duration, fingerCount) {
                var navActive = $('[data-swipe="control"]').find(".nav-link.active");
                var targetNav = $(navActive).parent().next('li').find('a');
                console.log(duration, distance);
                if (targetNav.length) {
                    if ($('[data-swipe="control"]').find('.line').length !== 0) {
                        var line = $('[data-swipe="control"]').find('.line');
                        var targetPos = targetNav.position().left + parseInt($(targetNav).css('padding-left'));
                        var targetWidth = targetNav.width();
                        line.animate({
                            width: targetWidth,
                            left: targetPos
                        }, 150);
                    }
                    $(targetNav).tab('show');
                }
            },
            swipeRight: function (e, direction, distance, duration, fingerCount) {
                var line = $('[data-swipe="control"]').find('.line');
                var navActive = $('[data-swipe="control"]').find(".nav-link.active");
                var targetNav = $(navActive).parent().prev('li').find('a');
                console.log(duration, distance);
                if (targetNav.length) {
                    if ($('[data-swipe="control"]').find('.line').length !== 0) {
                        var targetPos = targetNav.position().left + parseInt($(targetNav).css('padding-left'));
                        var targetWidth = targetNav.width();
                        line.animate({
                            width: targetWidth,
                            left: targetPos
                        }, 150);
                    }
                    $(targetNav).tab('show');
                }
            },
        });
    }();
})(jQuery);

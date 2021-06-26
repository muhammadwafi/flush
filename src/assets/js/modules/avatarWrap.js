// Wrap avatar with js

(function($) {
    $.fn.elevateAvatar = function() {
        this.each(function(i, e) {
            var $avatarWrapper = $(e).find(".avatar-wrapper");
            var $total = $avatarWrapper.length;
            // Adding z-index to elem
            $.each($avatarWrapper, function(k, avWrapper) {
                var zIndex = $total - k;
                $(avWrapper).css("z-index", zIndex);
            });
        });
    };
    $.fn.wrapAvatar = function() {
        this.each(function(i, el) {
            var $avatar = $(el).find(".avatar");
            // Replace with svg and mask element
            $.each($avatar, function(j, av) {
                var maskSize = $(av).height() / 2;
                var imgPath = $(av).attr('src');
                if (typeof imgPath !== typeof undefined && imgPath !== false) {
                    var template = "<svg class='ava-wrap' role='img' \
                                    style='width:"+ $(av).width() +";height:"+ $(av).height() +"'> \
                                        <mask id='ms-"+j+"'>\
                                            <circle cx='"+ maskSize +"' cy='"+ maskSize +"' fill='white' r='"+ maskSize +"'></circle>\
                                        </mask>\
                                        <g mask='url(#ms-"+j+")'>\
                                            <image x='0' y='0' height='100%' preserveAspectRatio='xMidYMid slice' width='100%' xlink:href='"+ imgPath +"' style='width:"+ $(av).width() +";height:"+ $(av).height() +"'></image>\
                                            <circle fill='none' cx='"+ maskSize +"' cy='"+ maskSize +"' r='"+ maskSize +"'></circle>\
                                        </g>\
                                    </svg>";
                    $(av).replaceWith(template);
                }
            });
        });      
    };
})(jQuery);

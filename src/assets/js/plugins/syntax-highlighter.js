
function SyntaxHighlight() {
    var copyid = 0;
    $('pre').each(function() {
        copyid++;
        var list = "(true|false|null|main|in|endif|if|endfor|for|while|finally|var|new|function|do|return|void|else|break|catch|instanceof|with|throw|case|default|try|this|switch|continue|typeof|delete)",
            rep1 = new RegExp(list + " ", "ig"),
            rep2 = new RegExp(list + "( ?)<span", "ig"),
            $this = $(this);
        $this.html($this.html()
        .replace(/(<br>|\n)$/ig, "")
        .replace(/(\t)/g, "    ")
        .replace(/&quot;/ig, "\"")
        .replace(/&#39;|&apos;/ig, "\'")
        .replace(/(.?)'(.*?)'/g, "$1<span class='str'>\'$2\'</span>")
        .replace(/(.?)"(.*?)"/g, "$1<span class='str'>\"$2\"</span>")
        .replace(/(.?)(""|'')/g, "$1<span class='value'>$2</span>")
        .replace(/(#[A-F0-9]{3,6})/ig, "<span class='hex'>$1</span>")
        .replace(/(\d+(?!(.*&lt;)))/g, "<span class='num'>$1</span>")
        .replace(/((#|\.)[\-_A-Z0-9]+)/ig, "<span class='selector'>$1</span>")
        .replace(/(\{|\}|\(|\)|\[|\])/g, "<span class='bracket'>$1</span>")
        .replace(/&lt;(.*?)&gt;/g, "<span class='tag'>&lt;$1&gt;</span>")
        .replace(/&lt;!--([\s\S]*?)--&gt;/gm, "<span class='comment'>&lt;!--$1--&gt;</span>")
        .replace(/\/\*([\s\S]*?)\*\//gm, "<span class='comment'>/*$1*/</span>")
        .replace(/[^\:]\/\/(.*)/g, "<span class='comment'>//$1</span>")
        .replace(/<\/span>\/(.*)\/([gim]+),( ?)<span class='str'>/g, "</span><span class='regexp'>/$1/$2</span>, <span class='str'>")
        .replace(rep1, "<span class='keyword'>$1</span> ")
        .replace(rep2, "<span class='keyword'>$1</span>$2<span")
        .replace(/function<\/span> (.[^<]*)<span/g, "function</span> <span class='name'>$1</span><span")
        .replace(/([\-_A-Z]+)(?=(\s+|)):(.(?!\{)*)/ig, "<span class='attribute'>$1</span>:$2$3")
        .replace(/h<span class='num'>([1-6])<\/span>/ig, "h$1")
        .replace(/!important/ig, "<mark class='important'>!important</mark>")
        .replace(/&lt;!(doctype)(.*)&gt;/ig, "<span class='doctype'>&lt;!$1$2&gt;</span>")
        .replace(/@<span class='attribute'>(import|page|media|charset|keyframes|font-face)<\/span>/ig, "@$1")
        .replace(/(@(import|page|media|charset|keyframes|font-face))/ig, "<span class='keyword'>$1</span>")
        .replace(/<span class='bracket'>\[<\/span>(.*)<span class='bracket'>\]<\/span>/ig, "<span class='array'>[$1]</span>")
        ).find('.str span, .regexp span, .comment span, .doctype span, .hex span, .array span, .url span').contents().unwrap();
        $this.wrapInner('<div class="copy-area"></div>')
        $this.append('<div class="the-num"></div>');
        $this.attr( 'data-copyid', copyid).wrap('<div class="pre-wrapper"/>');
        $('<button class="btn-clipboard">Copy</button>').insertAfter($this).attr( 'copytarget', copyid );

        // Insert the line number
        var num = $this.html().split(/\n|<br>/).length,
            count = 0;
        for (var i = 0; i < num; i++) {
            count = count + 1;
            $this.find('.the-num').append(count + '.<br/>');
        }
        $this.css('padding-left', $this.find('.the-num').outerWidth()+14);

        $('body').on('click', '.btn-clipboard', function(ev){
            ev.preventDefault();
            var $copyButton = $(this);
    
            // var $pre = $(document).find("pre[data-copyid='"+ $copyButton.attr('copytarget') +"']");
            var $pre = $(document).find("pre[data-copyid='"+ $copyButton.attr('copytarget') +"']>.copy-area");
    
            if ( $pre.length ) {                
                var textArea = document.createElement("textarea");
    
                // Place in top-left corner of screen regardless of scroll position.
                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;
    
                // Ensure it has a small width and height. Setting to 1px / 1em
                // doesn't work as this gives a negative w/h on some browsers.
                textArea.style.width = '2em';
                textArea.style.height = '2em';
                
                // We don't need padding, reducing the size if it does flash render.
                textArea.style.padding = 0;
    
                // Clean up any borders.
                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';
    
                // Avoid flash of white box if rendered for any reason.
                textArea.style.background = 'transparent';
    
                //Set value to text to be copied                
                textArea.value = $pre.text();
    
                document.body.appendChild(textArea);
                textArea.select();
    
                try {
                    document.execCommand('copy');
                    $copyButton.text( 'Copied').prop('disabled', true);
                    
                } catch (err) {
                    $copyButton.text( 'FAILED: Could not copy').prop('disabled', true);
                }
                setTimeout(function(){
                    $copyButton.text( 'Copy').prop('disabled', false);
                }, 3000);
            }
        });

    });

}

export default SyntaxHighlight;
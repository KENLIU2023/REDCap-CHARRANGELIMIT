const CharRangeLimitModule={
    char_range_limit:function(field, lower, upper, msg) {
            var ob = $('input[name="'+field+'"], textarea[name="'+field+'"]');
            ob.attr('onblur','CharRangeLimitModule.check_number(this.value.trim().length'+','+upper+','+lower+',"'+field+'")');
            ob.attr('onkeyup','$("#charrangelimitcounter-'+field+'").html("'+msg+'"+": <b>"+this.value.length+"</b>");');
            ob.after('<div id="charrangelimitcounter-'+field+'" class="wordcharcounter">'+msg+'</div>');
        },
    check_number:function(a,b,c,field){
            var regexValPopupId = 'redcapValidationErrorPopup';
	    var ob = $('input[name="'+field+'"], textarea[name="'+field+'"]');
	    var returnFocus= 1;
	    var msg1;
	    if(a>b){
		msg1= "<div style='padding-left:16px,padding-right:16px'><font color=\'red\'>Please check: You can only enter up to "+b+" characters.</font></div>";
		ob.css('background','#EF9A9A');
		returnFocus=1;
	    }
	    else if(a<c && a>0){
		msg1="<div style='padding-left:16px,padding-right:16px'><font color=\'red\'>Please check：You need to enter at least "+c+" characters.</font></div>";
		ob.css('background','#EF9A9A');
		returnFocus=1;
	    }
	    else{
		 ob.css('background','#FFFFFF');
		 returnFocus=0;
	    }
	    if(returnFocus){
		    simpleDialog(msg1,'Number of characters out of range','','800','CharRangeLimitModule.set_focus("'+field+'")');
		}
        },
    set_focus:function(field) {
                var ob = $('input[name="'+field+'"], textarea[name="'+field+'"]');
                ob.val(ob.val().trim());
                ob.trigger('onkeyup');
                ob.focus();
            }
}

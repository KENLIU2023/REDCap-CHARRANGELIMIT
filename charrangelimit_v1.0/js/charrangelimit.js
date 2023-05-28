function char_range_limit(field, lower, upper, msg) {
    //alert(msg);
    //var regexValPopupId = 'redcapValidationErrorPopup';
    var ob = $('input[name="'+field+'"], textarea[name="'+field+'"]');
   // var returnFocusJS = 'ob.focus();';
    //simpleDialog(msg, null, regexValPopupId, null, returnFocusJS);
    ob.attr('onblur','check_number(this.value.trim().length'+','+upper+','+lower+',"'+field+'")');
    //ob.attr('onblur','if(this.value.length > '+upper+'){simpleDialog("<font color=\'red\'>超出最大字数限制</font>",null, regexValPopupId, null, returnFocusJS);}else if(this.value.length < '+lower+'&&this.value.length>0){simpleDialog("<font color=\'red\'>不足最少字数要求</font>");}');
   ob.attr('onkeyup','$("#charrangelimitcounter-'+field+'").html("'+msg+'"+": <b>"+this.value.length+"</b>");');
    ob.after('<div id="charrangelimitcounter-'+field+'" class="wordcharcounter">'+msg+'</div>');
   // ob.counter({ type: type, count: 'down', msg: msg, goal: goal, target: '#charrangelimitcounter-'+field });
   
}
function check_number(a,b,c,field){
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
	    simpleDialog(msg1,'Number of characters out of range','','800','set_focus("'+field+'")');
	}
}
function set_focus(field) {
                    var ob = $('input[name="'+field+'"], textarea[name="'+field+'"]');
                    ob.val(ob.val().trim());
                    ob.trigger('onkeyup');
                    ob.focus();
                }

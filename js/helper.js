$(document).ready(function() {
    $('body').on('dialogopen', function(event, ui) {
        var $popup = $(event.target);
        if ($popup.prop('id') !== 'action_tag_explain_popup') {
            // That's not the popup we are looking for...
            $popup1 = $('div[aria-describedby=\"action_tag_explain_popup\"]');
            if($popup1){
                $popup=$popup1;
            }
            else{
                return false;
            }
        }

        var isDefaultLabelColumn = function() {
            return $(this).text() === '@CHARLIMIT';
        }

        var $default_action_tag = $popup.find('td').filter(isDefaultLabelColumn).parent();
        if ($default_action_tag.length !== 1) {
            return false;
        }

        var tag_name = '@CHARRANGELIMIT';

        var descr = $('<div></div>')
            .addClass('charrangelimit-container')
            .html('Sets the minimum and maximum numbers of characters that can be entered into a Text field or Notes field, and also displays the number of characters remaining. The format must follow the pattern @CHARLIMIT="minimun-maximun", and minimum =< maximum.(The value can be inside single or double quotes). NOTE: This action tag cannot be used at the same time as @WORDLIMIT for the same field. NOTE: This action tag does *not* get applied during any data imports (via API or Data Import Tool) but only operates when viewing survey pages and data entry forms.');
        // Creating a new action tag row.
        var $new_action_tag = $default_action_tag.clone();
        var $cols = $new_action_tag.children('td');
        var $button = $cols.find('button');
        $cols.eq(1).css('color','green');
        // Column 1: updating button behavior.
        $button.attr('onclick', $button.attr('onclick').replace('@CHARLIMIT', tag_name));
        $button.css({'background':'green','border':'1px solid green'});

        // Columns 2: updating action tag label.
        $cols.filter(isDefaultLabelColumn).text(tag_name);

        // Column 3: updating action tag description.
        $cols.last().html(descr);

        // Placing new action tag.
        $new_action_tag.insertBefore($popup.find('tr').eq(0));
    });
});

<?php

namespace Huashan\ExternalModule;

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;
use Form;
Use Stanford\Utility\ActionTagHelper;

class ExternalModule extends AbstractExternalModule {

    public $tag = "@CHARRANGELIMIT";

   //global APP_PATH_WEBROOT_FULL;
    /**
     * @inheritdoc
     */
    function redcap_every_page_top($project_id) {
        if (in_array(PAGE,array('ProjectSetup/index.php','Design/online_designer.php')) && $project_id) {
             echo "<script type='text/javascript' src='".$this->getUrl('js/helper.js')."'></script>";
        }    
        if (!in_array(PAGE, array('DataEntry/index.php', 'surveys/index.php', 'Surveys/theme_view.php'))) {
            return;
        }

        if (empty($_GET['id'])) {
            return;
        }
        // Checking additional conditions for survey pages.
        if (PAGE == 'surveys/index.php' && !(isset($_GET['s']) && defined('NOAUTH'))) {
            return;
        }

        global $Proj;
        $settings = array();
        $instrument = $_GET['page'];    // This is a bit of a hack, but in surveys this is set before the every_page_top hook is called
        echo "<script type='text/javascript' src='".$this->getUrl('js/charrangelimit.js')."'></script>";
        foreach (array_keys($Proj->forms[$instrument]['fields']) as $field_name) {
            $field_info = $Proj->metadata[$field_name];
            if (!$range = Form::getValueInActionTag($field_info['misc'], $this->tag)) {
                continue;
            }
            $rangeArray = explode('-',$range);
            if(is_numeric($rangeArray[0])&&is_numeric($rangeArray[1])&&$rangeArray[0]>0&&$rangeArray[1]>0&&(int)$rangeArray[0]<=(int)$rangeArray[1]){
                print  "<script type='text/javascript'>
                $(function(){CharRangeLimitModule.char_range_limit('$field_name', ".(int)$rangeArray[0].", ".(int)$rangeArray[1].", 'Please enter<b style=\"color:red\">".($rangeArray[0]==$rangeArray[1]?$rangeArray[0]:$rangeArray[0]."~".$rangeArray[1])."</b>characters'); });</script>";
            }
        }
    }
   
}
?>

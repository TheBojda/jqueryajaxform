var _ajaxform_targets;

function _reinit_ajaxform() {
	$('form.ajaxform').each(function(){
		if($(this).attr('target') != '_ajaxform_hidden_frame') {
			$(this).attr('target', '_ajaxform_hidden_frame');
			$(this).attr('action', $(this).attr('action') + '?ajaxform_enabled=true');
			$(this).submit(function() {
				refresh = $(this).find('input[name=ajaxform_refresh]').val();
				_ajaxform_targets = refresh.split(',');
				return true;
			});
		}
	});	
}

$(document).ready(function() {
	$('body').append("<iframe id=\"_ajaxform_hidden_frame\" name=\"_ajaxform_hidden_frame\" style=\"display: none;\" onload=\"_ajaxform_hiddenFrameLoaded();\"></iframe>");
	//$('body').append("<iframe id=\"_ajaxform_hidden_frame\" name=\"_ajaxform_hidden_frame\" onload=\"_ajaxform_hiddenFrameLoaded();\"></iframe>");
	if(!_is_ajaxform_enabled()) {
		ajaxform_init();
		_reinit_ajaxform();
	}
});
			
function _ajaxform_hiddenFrameLoaded() {
	if(_ajaxform_targets) {
		for(i=0; i<_ajaxform_targets.length; i++) {
			$('#' + _ajaxform_targets[i]).html($('#_ajaxform_hidden_frame').contents().find('#' + _ajaxform_targets[i]).html());
			//alert('refresh: ' + _ajaxform_targets[i]);
		}
		ajaxform_init();
		_reinit_ajaxform();
	}
}			

function _is_ajaxform_enabled() {

	// getParameterValue from http://sites.google.com/site/queryparameter/
	function getParameterValue(name) {
		var query = document.location.search;
		var pl = name.length;
		var c1 = 0;

		if (query.charAt(1 + pl) == '=' && query.substr(1, pl) == name)
			c1 = 2 + pl;

		for (var i = c1 > 0 ? c1 : 1; i < query.length; i++) {
			if (query.charAt(i) == '&') {
				if (c1 > 0)
					return query.substring(c1, i);
				if ((i + pl + 1) < query.length && query.charAt(i + pl + 1) == '=' && query.substr(i + 1, pl) == name)
					c1 = i + pl + 2;
			}
		}

		return (c1 > 0) ? query.substring(c1) : null;
	}
	
	return (getParameterValue('ajaxform_enabled') == 'true');
}
var $ = function(sel) {
	return document.querySelector(sel);
};
function save_options() {
	localStorage["api_token"] = $("#token").value;
	var status = $('#status');
	status.textContent = 'Options saved.';

	setTimeout(function() {
		status.textContent = '';
		window.close();
	}, 800);
}

function restore_options() {
	var useToken = '';
	if(!!localStorage["api_token"] && localStorage["api_token"] != 'undefined') {
		useToken = localStorage["api_token"];
	}
	$("#token").value = useToken;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

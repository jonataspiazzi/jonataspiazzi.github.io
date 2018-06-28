function Interaction() {
	document.location = "app://?state='refused";
}

function UpdateValues(values) {
	var json = JSON.parse(values);

	document.body.innerHTML = showObject(json) + '<img src="img.png" />';
}

function showObject(obj, prefix) {

	var text = "";

	for (var prop in obj) {
		if (typeof obj[prop] === 'object') {
			text += showObject(obj[prop], prefix ? prefix + '.' + prop : prop);
		}
		else {
			text += `${prefix ? `${prefix}.` : ""}${prop} = ${obj[prop]} <br/>`;
		}
	}
	
	return text;
}
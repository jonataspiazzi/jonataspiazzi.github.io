function Interaction(state) {
    var data = {
        assetId: document.payload.assetId,
        negotiationPeriodId: document.payload.negotiationPeriodId,
        amount: parseInt(document.querySelector("#amount").value),
        productAgreement: {
            agreementId: 0,
            assigned: true
        },
        generalAgreement: {
            agreementId: 0,
            assigned: true
        }
    };

    document.location = "app://?state=" + state + "&edited=true&data=" + JSON.stringify(data);
}

function UpdateValues(values) {
    var obj = JSON.parse(values);
    var html = JSON.stringify(obj, null, 2);
    
    document.payload = obj;
    document.querySelector("#amount").value = obj.advisorAmount;
    document.querySelector("pre").innerHTML = syntaxHighlight(html);
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#confirm").addEventListener("click", function () {
        Interaction('approved');
    });

    document.querySelector("#cancel").addEventListener("click", function () {
        Interaction('refused');
    });

    //UpdateValues(JSON.stringify({
    //    teste: "info", 
    //    ok: true,
    //    version: 10,
    //    advisorAmount: 25,
    //    assetId: 514,
    //    negotiationPeriodId: 1248
    //}));

    document.querySelector("#version").innerHTML = "1.0.6";
});

function QualquerNome(state) {
    /*
    var data = {
        assetId: document.payload.assetId,
        negotiationPeriodId: document.payload.negotiationPeriodId,
        amount: parseInt(document.querySelector("#amount").value),
        productAgreement: {
            agreementId: document.payload.productAgreement.agreementId,
            assigned: true
        },
        generalAgreement: {
            agreementId: document.payload.generalAgreement.agreementId,
            assigned: true
        }
    };
    */

    document.location = 'app://?state=approved&edited=true&data={"assetId":10,"negotiationPeriodId":11,"amount":5,"productAgreement":{"agreementId":22,"assigned":false},"generalAgreement":{"agreementId":23,"assigned":false}}';
    //document.location = "app://?state=" + state + "&edited=true&data=" + JSON.stringify(data);
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
        QualquerNome('approved');
    });

    document.querySelector("#cancel").addEventListener("click", function () {
        QualquerNome('refused');
    });

    //UpdateValues(JSON.stringify({
    //    teste: "info", 
    //    ok: true,
    //    version: 10,
    //    advisorAmount: 25,
    //    assetId: 514,
    //    negotiationPeriodId: 1248
    //}));

    document.querySelector("#version").innerHTML = "1.0.12";
});
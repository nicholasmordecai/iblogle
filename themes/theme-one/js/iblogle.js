const possibleAttributes = ['topics', 'partial', 'author'];

document.addEventListener("DOMContentLoaded", function (event) {
    var divs = document.getElementsByTagName("div");
    for (var i = 0, len = divs.length; i < len; i++) {
        if (divs[i].hasAttribute('api-url')) {
            constructURL(divs[i]);
        }
    }
});

function constructURL(element) {
    var url = element.getAttribute('api-url') + '?';
    var hasExistingParam = false;
    for (var t = 0, len = possibleAttributes.length; t < len; t++) {
        if (element.hasAttribute(possibleAttributes[t])) {
            if (hasExistingParam) url += '&';
            url += possibleAttributes[t] + '=' + element.getAttribute(possibleAttributes[t]);
            hasExistingParam = true;
        }
    }
    getHTML(element, url);
}

function getHTML(element, url) {
    console.log(url);
    /**
     * Supports IE7+
     */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            element.innerHTML = xhr.responseText
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}
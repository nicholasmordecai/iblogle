namespace Website {
    export class Utils {

        public static getParameterByName(name: string, url: string = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        public static removeParameterFromURL(param: string) {
            let oldURL = window.location.search;
            let newURL = oldURL.replace(param, '');
            window.history.replaceState({}, window.location.origin + window.location.pathname, newURL);
        }

        public static updateURLParameter(param: string, value: string) {
            let oldURL = window.location.search;
            let newUrl = Utils.replaceQueryParam(param, value, oldURL);
            window.location.href = window.location.pathname + newUrl;
        }

        public static replaceQueryParam(param, newval, search) {
            var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
            var query = search.replace(regex, "$1").replace(/&$/, '');
        
            return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
        }

        public static wordCountToTTR(numberOfWords) {
            return Math.floor(numberOfWords / 228);
        }
    }
}
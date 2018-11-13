namespace Website {
    export class Network {
        
        public static post(url: string, data, successCallback?: Function, errorCallback?: Function) {
            Animations.showLoading();
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'JSON',
                success: function (data) {
                    Animations.hideLoading();
                    if (successCallback) successCallback(data)
                },
                error: function (error) {
                    Animations.hideLoading();
                    if (errorCallback) errorCallback(error);
                }
            });
        }

        public static postWithProgress(url, data, successCallback?: Function, onProgressCb?: Function, errorCallback?: Function) {
            $.ajax({
                xhr: () => {
                    var xhr = new window['XMLHttpRequest']();

                    xhr.upload.addEventListener("progress", (evt) => {
                        if (evt.lengthComputable) {
                            let percentComplete = evt.loaded / evt.total;
                            percentComplete = percentComplete * 100;
                            onProgressCb(percentComplete);
                        }
                    }, false);

                    return xhr;
                },
                url: url,
                type: "POST",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: (result) => successCallback(result),
                error: (error) => errorCallback(error)
            });
        }

        public static get(url: string, successCallback?: Function, errorCallback?: Function) {
            // Animations.showLoading();
            $.ajax({
                url: url,
                type: 'GET',
                success: function (data) {
                    // Animations.hideLoading();
                    if (successCallback) successCallback(data)
                },
                error: function (error) {
                    // Animations.hideLoading();
                    if (errorCallback) errorCallback(error);
                }
            });
        }

        public static put(url: string, data, successCallback?: Function, errorCallback?: Function) {
            Animations.showLoading();
            $.ajax({
                url: url,
                type: 'PUT',
                data: data,
                dataType: 'JSON',
                success: function (data) {
                    Animations.hideLoading();
                    if (successCallback) successCallback(data)
                },
                error: function (error) {
                    Animations.hideLoading();
                    if (errorCallback) errorCallback(error);
                }
            });
        }

        public static delete(url: string, data, successCallback?: Function, errorCallback?: Function) {
            $.ajax({
                url: url,
                type: 'DELETE',
                data: data,
                dataType: 'JSON',
                success: function (data) {
                    if (successCallback) successCallback(data)
                },
                error: function (error) {
                    if (errorCallback) errorCallback(error);
                }
            });
        }

    }
}
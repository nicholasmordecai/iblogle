namespace Website {
    export class Animations {

        public static showLoading() {
            $(".se-pre-con").fadeIn(300);
        }

        public static hideLoading() {
            $(".se-pre-con").fadeOut(150);
        }

        public static showAlert(message: string, severity: 'bg-success' | 'bg-warning' | 'bg-danger' | 'bg-info', closeDelay: number = 3000) {
            let alertBox = new AlertBox({
                closeTime: closeDelay,
                persistent: false,
                hideCloseButton: false,
                severity: severity
            });
            alertBox.show(message);
        }

        public static hideAlert() {

        }
    }
}

const AlertBox = function (option) {
    this.show = function (msg) {
        if (msg === '' || typeof msg === 'undefined' || msg === null) {
            throw '"msg parameter is empty"';
        }
        else {
            var alertArea = document.querySelector('#alert-area');
            var alertBox = document.createElement('DIV');
            var alertContent = document.createElement('DIV');
            var alertClose = document.createElement('A');
            var alertClass = this;
            alertContent.classList.add('alert-content');
            alertContent.innerText = msg;
            alertClose.classList.add('alert-close');
            alertClose.setAttribute('href', '#');
            alertBox.classList.add('alert-box');
            alertBox.classList.add(option.severity);
            alertBox.appendChild(alertContent);
            if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
                alertBox.appendChild(alertClose);
            }
            alertArea.appendChild(alertBox);
            alertClose.addEventListener('click', function (event) {
                event.preventDefault();
                alertClass.hide(alertBox);
            });
            if (!option.persistent) {
                var alertTimeout = setTimeout(function () {
                    alertClass.hide(alertBox);
                    clearTimeout(alertTimeout);
                }, option.closeTime);
            }
        }
    };

    this.hide = function (alertBox) {
        alertBox.classList.add('hide');
        var disperseTimeout = setTimeout(function () {
            alertBox.parentNode.removeChild(alertBox);
            clearTimeout(disperseTimeout);
        }, 500);
    };
};
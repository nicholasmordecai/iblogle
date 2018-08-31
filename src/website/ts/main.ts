namespace Website {
    export class Main {
        constructor() {
            $(document).ready(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $(this).toggleClass('active');
                });

                setTimeout(() => {
                    Animations.showAlert('hello world', 'success');
                }, 2000)
            });
        }
    }
}

// make the Locsci namespace available in the global
window['wbc'] = Website;

// create a new instance of the Main class
new Website.Main();
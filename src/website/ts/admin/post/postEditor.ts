namespace Website {
    export class PostEditor {
        constructor() {
            var quill = new window['Quill']('#editor', {
                modules: {
                    toolbar: true
                },
                theme: 'snow'
            });
        }
    }
}
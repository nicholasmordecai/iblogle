namespace Website {
    export class PostEditor {

        private _editor; 
        private _id: string;

        constructor() {
            this._id = Utils.getParameterByName('post_id');
            this._editor = new window['Quill']('#editor', {
                modules: {
                    toolbar: true
                },
                theme: 'snow'
            });
            this.addEventListeners();
        }

        private addEventListeners() {
            $('#btn-save').click((e) => this.save(e));
            $('#btn-archive').click((e) => this.archive(e));
            $('#btn-delete').click((e) => this.delete(e));
        }

        private save(e) {
            Network.put('/api/post/save', {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: this._editor.getText()
            }, (response) => {

            }, (error) => {

            })
        }

        private archive(e) {
            console.log('archive')
        }

        private delete(e) {
            console.log('delete')
        }
    }
}
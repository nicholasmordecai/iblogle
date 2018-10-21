namespace Website {
    export class PostEditor {

        private _editor; 
        private _id: string;
        private _isNew: string;

        constructor() {
            this._id = Utils.getParameterByName('post_id');
            this._isNew = Utils.getParameterByName('new');
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

        // content, title, description, published, slug, template, layout

        private save(e) {
            Network.put(`/api/post/save${window.location.search}`, {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: this._editor.getText(),
                published: $('#post-published').is(':checked'),
                slug: $('#post-slug').val(),
                template:$('#post-template').val(),
                layout:$('#post-layout').val(),
            }, (response) => {
                if(this._isNew) {
                    Utils.removeParameterFromURL('&new=true');
                    this._isNew = 'false';
                }
            }, (error) => {

            });
        }

        private archive(e) {
            console.log('archive')
        }

        private delete(e) {
            console.log('delete')
        }
    }
}
namespace Website {
    export class PostEditor {

        private _editor;
        private _id: string;
        private _isNew: string;

        constructor() {
            this._id = Utils.getParameterByName('post_id');
            this._isNew = Utils.getParameterByName('new');
            this.addEventListeners();
        }

        private addEventListeners() {
            $('#btn-save').click((e) => this.save(e));
            $('#btn-archive').click((e) => this.archive(e));
            $('#btn-delete').click((e) => this.delete(e));
            $('div#froala-editor')['froalaEditor']({
                theme: 'dark',
                heightMin: 500,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'inlineClass', 'clearFormatting', '|', 'emoticons', 'fontAwesome', 'specialCharacters', '-', 'paragraphFormat', 'lineHeight', 'paragraphStyle', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'insertHR', 'selectAll', 'getPDF', 'print', 'help', 'html', 'fullscreen', '|', 'undo', 'redo']
            });
        }

        private save(e) {
            //     Network.put(`/api/post/save${window.location.search}`, {
            //         title: $('#post-title').val(),
            //         description: $('#post-description').val(),
            //         content: this._editor.getText(),
            //         published: $('#post-published').is(':checked'),
            //         slug: $('#post-slug').val(),
            //         template:$('#post-template').val(),
            //         layout:$('#post-layout').val(),
            //     }, (response) => {
            //         if(this._isNew) {
            //             Utils.removeParameterFromURL('&new=true');
            //             this._isNew = 'false';
            //         }
            //     }, (error) => {

            //     });
        }

        private archive(e) {
            console.log('archive')
        }

        private delete(e) {
            console.log('delete')
        }
    }
}
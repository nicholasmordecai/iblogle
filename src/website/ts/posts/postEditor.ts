namespace Website {
    export class PostEditor {

        private _id: string;
        private _isNew: string;
        private _content: string;

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
            $('div#froala-editor')['froalaEditor']('events.trigger', 'form.submit');
            Network.put(`/api/post/save${window.location.search}`, {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: $('div#froala-editor')['froalaEditor']('html.get'),
                published: $('#post-published').is(':checked'),
                slug: $('#post-slug').val(),
                template: $('#post-template').val(),
                layout: $('#post-layout').val(),
            }, (response) => {
                Animations.showAlert('Post saved', 'bg-success');
                if (this._isNew) {
                    Utils.removeParameterFromURL('&new=true');
                    Utils.updateURLParameter('post_id', response.id)
                    this._isNew = 'false';
                }
            }, (error) => {
                Animations.showAlert('Error when trying to save the post. Please try again', 'bg-danger');
            });
        }

        private archive(e) {
            Network.delete(`/api/post/archive?post_id=${this._id}`, {

            }, (response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        }

        private delete(e) {
            Network.delete(`/api/post/delete?post_id=${this._id}`, {

            }, (response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        }
    }
}
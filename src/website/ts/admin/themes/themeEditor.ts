namespace Website {
    export class ThemeEditor {

        private _editor;
        private _id: string;
        private _fileID: string;

        constructor() {
            this._id = Utils.getParameterByName('theme_id');

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
            $('#btn-delete').click((e) => this.delete(e));
            $('.file-item').click((e) => this.getFileContents(e));
        }

        private getFileContents(e) {
            let element = e.target;
            let id = $(element).data('id');
            Network.get('/api/theme/load-file?file_id=' + id, (data) => {
                this._editor.setText(data.file);
                this._fileID = data.id;
            });
        }

        private save(e) {
            Network.put(`/api/theme/save?file_id=${this._fileID}`, {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: this._editor.getText(),
                fileID: this._fileID
            }, (response) => {

            }, (error) => {

            })
        }

        private delete(e) {
            console.log('delete')
        }
    }
}
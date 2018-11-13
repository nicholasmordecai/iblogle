namespace Website {
    export class PostEditor {

        private _id: string;
        private _isNew: string;
        private _content: string;

        constructor() {
            this._id = Utils.getParameterByName('post_id');
            this._isNew = Utils.getParameterByName('new');
            this.addEventListeners();
            this.populateTemplates();
            this.populateLayouts();
        }

        private populateTemplates() {
            Network.get('/api/theme/list-templates', (templates) => {
                let html = '';
                let list = [];
                let current = $('#post-template').data('current');

                for (let template of templates) {
                    if (template === current) {
                        html += `<option selected="selected">${current}</option>`;
                    } else {
                        list.push(template);
                    }
                }

                for (let template of list) {
                    html += `<option>${template}</option>`;
                }

                $('#post-template').html(html);
            });
        }

        private populateLayouts() {
            Network.get('/api/theme/list-layouts', (layouts) => {
                let html = '';
                let list = [];
                let current = $('#post-template').data('current');

                for (let layout of layouts) {
                    if (layout === current) {
                        html += `<option selected="selected">${current}</option>`;
                    } else {
                        list.push(layout);
                    }
                }

                for (let layout of list) {
                    html += `<option>${layout}</option>`;
                }

                $('#post-layout').html(html);
            });
        }

        private addEventListeners() {
            $('#btn-save').click((e) => this.save(e));
            $('#btn-archive').click((e) => this.archive(e));
            $('#btn-delete').click((e) => this.delete(e));
            $('div#froala-editor')['froalaEditor']({
                iconsTemplate: 'font_awesome_5',
                theme: 'dark',
                heightMin: 500,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'inlineClass', 'clearFormatting', '|', 'emoticons', 'fontAwesome', 'specialCharacters', '-', 'paragraphFormat', 'lineHeight', 'paragraphStyle', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'insertHR', 'selectAll', 'print', 'help', 'html', 'fullscreen', '|', 'undo', 'redo']
            });
        }

        private save(e) {
            $('div#froala-editor')['froalaEditor']('events.trigger', 'form.submit');
            let html = $('div#froala-editor')['froalaEditor']('html.get');
            let words = $("<div>").html(html).text();
            let wordCount = words.split(' ').length;
            Network.put(`/api/post/save${window.location.search}`, {
                title: $('#post-title').val(),
                description: $('#post-description').val(),
                content: html,
                timeToRead: Utils.wordCountToTTR(wordCount),
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
namespace Website {
    export class PageEditor {

        private _id: string;
        private _isNew: string;
        private _content: string;

        constructor() {
            this._id = Utils.getParameterByName('page_id');
            // this._isNew = Utils.getParameterByName('new');
            this.addEventListeners();
        }

        private addEventListeners() {
            $('#btn-save').click((e) => this.save(e));
            $('#btn-archive').click((e) => this.archive(e));
            $('#btn-delete').click((e) => this.delete(e));
            $('div#froala-editor')['froalaEditor']({
                iconsTemplate: 'font_awesome_5',
                theme: 'dark',
                htmlAllowedEmptyTags: ['div', 'span', 'table'],
                htmlAllowedAttrs: ['api-url', 'partial', 'topics', 'accept', 'accept-charset', 'accesskey', 'action', 'align', 'allowfullscreen', 'allowtransparency', 'alt', 'async', 'autocomplete', 'autofocus', 'autoplay', 'autosave', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap'],
                heightMin: 500,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'inlineClass', 'clearFormatting', '|', 'emoticons', 'fontAwesome', 'specialCharacters', '-', 'paragraphFormat', 'lineHeight', 'paragraphStyle', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '-', 'insertHR', 'selectAll', 'print', 'help', 'html', 'fullscreen', '|', 'undo', 'redo']
            });
        }

        private save(e) {
            $('div#froala-editor')['froalaEditor']('events.trigger', 'form.submit');
            Network.put(`/api/page/save${window.location.search}`, {
                name: $('#page-title').val(),
                description: $('#page-description').val(),
                content: $('div#froala-editor')['froalaEditor']('html.get'),
                published: $('#page-published').is(':checked'),
                url: $('#page-url').val(),
                template: $('#page-template').val(),
                layout: $('#page-layout').val(),
            }, (response) => {
                Animations.showAlert('Page saved', 'bg-success');
                // if (this._isNew) {
                //     Utils.removeParameterFromURL('&new=true');
                //     Utils.updateURLParameter('post_id', response.id)
                //     this._isNew = 'false';
                // }
            }, (error) => {
                Animations.showAlert('Error when trying to save the post. Please try again', 'bg-danger');
            });
        }

        private archive(e) {
            // Network.delete(`/api/post/archive?post_id=${this._id}`, {

            // }, (response) => {
            //     console.log(response);
            // }, (error) => {
            //     console.log(error);
            // });
        }

        private delete(e) {
            // Network.delete(`/api/post/delete?post_id=${this._id}`, {

            // }, (response) => {
            //     console.log(response);
            // }, (error) => {
            //     console.log(error);
            // });
        }
    }
}
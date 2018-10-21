namespace Website {
    export class PostViewer {

        constructor() {
            $('.archive').click((e) => this.archivePost(e));
        }

        private archivePost(event) {
            let id = $(event.target).data('id')
            Network.delete(`/api/post/archive?post_id=${id}`, {}, (success) => {
                window.location.reload();
            });
        }
    }
}
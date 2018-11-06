namespace Website {
    export class PostViewer {

        constructor() {
            $('.archive').click((e) => this.archivePost(e));
            $('.delete').click((e) => this.deletePost(e));
        }

        private archivePost(event) {
            let id = $(event.target).data('id')
            Network.delete(`/api/post/archive?post_id=${id}`, {}, (success) => {
                window.location.reload();
            });
        }

        private deletePost(event) {
            let id = $(event.target).data('id')
            Network.delete(`/api/post/delete?post_id=${id}`, {}, (success) => {
                window.location.reload();
            });
        }
    }
}
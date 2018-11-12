const Chart = window['Chart'];

namespace Website {
    export class DashbordView {
        constructor() {
            console.log('hi')
            let postOverview = new Widget.PostOverview('post-overview');
            let topPosts = new Widget.TopPosts('top-posts');
            let traffic = new Widget.Traffic('traffic-quick-look');
            
        }
    }
}
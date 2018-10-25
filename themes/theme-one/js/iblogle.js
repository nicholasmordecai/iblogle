$("*[data-api-url]").each(function (i, element) {
    let url = $(element).data('api-url') + '?';
    let topicIDs = $(element).data('topics');
    let partial = $(element).data('partial');
    let authorID = $(element).data('author-id');

    if(topicIDs) {
        url += 'topics=' + topicIDs;
    }

    if(authorID) {
        url += 'author_id=' + authorID;
    }

    if(partial) {
        url += '&partial=' + partial; 
    }
    getHTML(url, element);
});

function getHTML(url, element) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $(element).html(data)
        },
        error: function (error) {
            console.log(error);
        }
    });
}
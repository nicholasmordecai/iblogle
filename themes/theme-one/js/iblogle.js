$("*[data-api-url]").each(function (i, element) {
    let url = $(element).data('api-url') + '?';
    let topicIDs = $(element).data('topics');
    let partial = $(element).data('partial');

    if(topicIDs) {
        url += 'topics=' + topicIDs;
    }

    if(partial) {
        url += '&partial=' + partial; 
    }
    console.log(url)
    getHTML(url, element);
});

function getHTML(url, element) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            console.log(data);
            $(element).html(data)
        },
        error: function (error) {
            console.log(error);
        }
    });
}
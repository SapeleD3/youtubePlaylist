$(document).ready(function() {
    var key = 'AIzaSyCkC3AhdwIT0Qj6YXMQqyWzh3DMOxnRXv0';
    var playlistId = 'PLAep7PP_dA6uAyIDwO9AoTLdtEAdOZCul';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var options = {
        part: 'snippet',
        key: key,
        maxResult: 20,
        playlistId: playlistId
    }

    loadVideos();

    function loadVideos() {
        $.getJSON(URL, options, function(data){
            var id = data.items[0].snippet.resourceId.videoId
            mainVid(id);
            resultLoop(data)
        })
    }

    function mainVid(id) {

        $('#video').html(`
            <iframe width = "560"
                height = "315"
                src = "https://www.youtube.com/embed/${id}"
                frameborder = "0"
                allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen > 
            </iframe>
        `);
    }

    function resultLoop(data){
        $.each(data.items, function(i, item){
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('main').append(`
                <article class="item" data-key="${vid}">
                    <img src = "${thumb}"
                    alt = "vid"
                    class = "thumb">
                    <div class = "details" >
                    <h4>${title}</h4> <p>${desc} </p> </div>
                </article>
            `);

        })
    }

    $('main').on('click', 'article', function() {
        var id = $(this).attr('data-key');
        mainVid(id);
    });
})


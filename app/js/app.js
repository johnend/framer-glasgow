$(document).ready(function() {
    $('.primary').click(function() {
        $('div.overlay').velocity({
            opacity: 0.75
        }, {
            visibility: 'visible',
            duration: 10
        });
        $('div#mc_embed_signup').velocity({
            left: [0, [400, 32]]
        }, {
            visibility: 'visible',
        });
    });
    $('.close-button').click(function() {
        $('div#mc_embed_signup').velocity('reverse', {
            visibility: 'hidden',
            duration: 150
        });
        $('div.overlay').velocity('reverse', {
            visibility: 'hidden'
        });
    });
});

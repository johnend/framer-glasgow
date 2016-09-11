$(document).ready(function() {
    $('.primary').click(function() {
        TweenMax.to($('div.overlay'), 0 , {visibility: 'visible'});
        TweenMax.to('#mc_embed_signup', 0.75, {ease: Elastic.easeOut.config(1.2, 0.75), left: 0, visibility: 'visible'});
    });
    $('.close-button, .overlay').click(function() {
        TweenMax.to('#mc_embed_signup', 0.5, {ease: Power4.easeIn, left: -5000, onComplete:complete});
        
        function complete () {
            TweenMax.to($('div.overlay'), 0, {visibility: 'hidden'});
        }
    });
});
[].forEach.call(document.querySelectorAll('.dotstyle .dots li'), function (dots) {
    if (carouselLeftAbs % imgWidth) {
      console.log(dots);
      dots.classList.toggle('current')
    }
    if (dots.classList == ('current')) {
      dots.classList.remove('current')
    }

})





var ul;
var liItems;
var imageWidth;
var imageNumber;

function init(){

    ul = document.getElementById('image_slider');
    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].offsetWidth;
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    slider(ul);
}

function slider(ul){
    animate({
        delay:17,
        duration: 3000,
        delta:function(p){return Math.max(0, -1 + 2 * p)},
        step:function(delta){
            ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
    },
        callback:function(){
            currentImage++;
            if(currentImage < imageNumber-1){
                slider(ul);
        }
            else{
                var leftPosition = (imageNumber - 1) * imageWidth;
                setTimeout(function(){goBack(leftPosition)},2000);
                setTimeout(function(){slider(ul)}, 4000);
            }
        }
    });
}


function goBack(leftPosition){
    currentImage = 0;
    var id = setInterval(function(){
        if(leftPosition >= 0){
            ul.style.left = '-' + parseInt(leftPosition) + 'px';
            leftPosition -= imageWidth / 10;
        }
        else{
            clearInterval(id);
        }
    }, 17);
}

function animate(opts){
    var start = new Date;
    var id = setInterval(function(){
        var timePassed = new Date - start;
        var progress = timePassed / opts.duration
        if(progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
           opts.callback();
         }
    }, opts.dalay || 17);
}
window.onload = init;

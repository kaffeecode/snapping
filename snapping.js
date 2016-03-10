(function initialize($) {

  const dimension = {Top: 'Height', Left: 'Width'};

  $.fn.kcSnapping = function kcSnapping(
    {target, snap, direction, offset, time} = {}) {
    target = target || $(window);
    snap = snap || [200, 200];
    direction = direction || 'Top';
    offset = offset || [0, 0];
    time = time || 500;

    let timer;

    const animateObject = target.is($(window)) ?
        $('html, body') : target;

    $(window)
      .on('scroll.kcSnapping', ()=> {
        const scrollDirection = {};
        const scrollPosi = getSnappedScrollPosi.call(this);

        clearTimeout(timer);
        if(scrollPosi < 0)
          return;

        scrollDirection[`scroll${direction}`] = scrollPosi;
        timer = setTimeout(()=>
          animateObject.clearQueue().animate(scrollDirection),
          time);
      })
      .trigger('scroll.kcSnapping');

    function getSnappedScrollPosi() {
      const scroll = target[`scroll${direction}`]();
      const margin = [];

      for(const s of this) {
        margin[0] = margin[1] = s[`offset${direction}`] - scroll;
        margin[1] += s[`offset${dimension[direction]}`] - target.innerHeight();
        if(margin[0] > offset[0] && margin[0] < snap[0])
          return margin[0] + scroll - offset[0];
        if(margin[1] < offset[1] && margin[1] > -snap[1])
          return margin[1] + scroll - offset[1];
      }
      return -1;
    }
  };
})(jQuery);

export {};

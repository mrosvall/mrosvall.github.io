// Sticky menu
var new_scroll_position = 0;
var last_scroll_position;
var header = document.getElementById("js-header");
var stickyMenu = document.getElementById("js-navbar-menu");

window.addEventListener('scroll', function (e) {
	last_scroll_position = window.scrollY;

	// Scrolling down
	if (new_scroll_position < last_scroll_position && last_scroll_position > 40) {
		header.classList.remove("is-visible");
		header.classList.add("is-hidden");

		// Scrolling up
	} else if (new_scroll_position > last_scroll_position) {
		header.classList.remove("is-hidden");
		header.classList.add("is-visible");
		if (stickyMenu) {
			stickyMenu.classList.add("is-sticky");
		}
	}

	if (last_scroll_position < 1) {
		header.classList.remove("is-visible");

		if (stickyMenu) {
			stickyMenu.classList.remove("is-sticky");
		}
	}

	new_scroll_position = last_scroll_position;
});

// Look for .hamburger
var toggle = document.querySelector(".js-toggle");
if (stickyMenu) {
	toggle.addEventListener("click", function () {
		toggle.classList.toggle("is-active");
		var el = document.getElementById("js-navbar-menu");
		el.classList.toggle("is-visible");
	});
}


// Load comments
var comments = document.querySelector(".js-post__comments-button");  
   if (comments) {
      comments.addEventListener("click", function() {   
          comments.classList.toggle("is-hidden");      
             var container = document.querySelector(".js-post__comments-inner");   
             container.classList.toggle("is-visible");  
      });
 }

// Load search input area
var searchButton = document.querySelector(".js-search-btn");
    searchOverlay = document.querySelector(".js-search-overlay");
    searchClose = document.querySelector(".js-search-close");
    searchInput = document.querySelector(".js-search-input");

if (searchButton) {
    searchButton.addEventListener("click", function () {        
        searchOverlay.classList.add("expanded");
        setTimeout(function() { 
            searchInput.focus(); 
        }, 60);        
    });
    
    searchClose.addEventListener("click", function () {
        searchOverlay.classList.remove('expanded');
    });
}

// Back to Top - by CodyHouse.co on MIT license
(function(){    
	var backTop = document.getElementsByClassName('js-footer__bttop')[0],		
		offset = 600,		
		offsetOpacity = 1200,
		scrollDuration = 50,
		scrolling = false;
	if( backTop ) {		
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? addClass(backTop, 'footer__bttop--show') : removeClass(backTop, 'footer__bttop--show', 'footer__bttop--fade-out');
		( windowTop > offsetOpacity ) && addClass(backTop, 'footer__bttop--fade-out');
		scrolling = false;
	}
	
	function scrollTop(duration) {
	    var start = window.scrollY || document.documentElement.scrollTop,
	        currentTime = null;
	        
	    var animateScroll = function(timestamp){
	    	if (!currentTime) currentTime = timestamp;        
	        var progress = timestamp - currentTime;
	        var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
	        window.scrollTo(0, val);
	        if(progress < duration) {
	            window.requestAnimationFrame(animateScroll);
	        }
	    };

	    window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = function (t, b, c, d) {
 		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};
    
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
})();

// Share buttons pop-up
(function () {
    // share popup
    let shareButton = document.querySelector('.js-post__share-button');
    let sharePopup = document.querySelector('.js-post__share-popup');

    if (shareButton) {
        sharePopup.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        shareButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sharePopup.classList.toggle('is-visible');
        });

        document.body.addEventListener('click', function () {
            sharePopup.classList.remove('is-visible');
        });
    }

    // link selector and pop-up window size
    var Config = {
        Link: ".js-share",
        Width: 500,
        Height: 500
    };
    // add handler links
    var slink = document.querySelectorAll(Config.Link);
    for (var a = 0; a < slink.length; a++) {
        slink[a].onclick = PopupHandler;
    }
    // create popup
    function PopupHandler(e) {
        e = (e ? e : window.event);
        var t = (e.target ? e.target : e.srcElement);
        // hide share popup
        if (sharePopup) {
            sharePopup.classList.remove('is-visible');
        }
        // popup position
        var px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
            py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
        // open popup
        var link_href = t.href ? t.href : t.parentNode.href;
        var popup = window.open(link_href, "social",
            "width=" + Config.Width + ",height=" + Config.Height +
            ",left=" + px + ",top=" + py +
            ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        if (popup) {
            popup.focus();
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }

        return !!popup;
    }
})();
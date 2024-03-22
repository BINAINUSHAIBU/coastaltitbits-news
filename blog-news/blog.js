
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="pingback" href="https://monadarban.blog/xmlrpc.php">
	<!--[if lt IE 9]>
	<script src="https://s0.wp.com/wp-content/themes/pub/twentyfifteen/js/html5.js?ver=3.7.0"></script>
	<![endif]-->
	<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>
<title>Mona Assarandarban</title>
<meta name='robots' content='max-image-preview:large' />

<!-- Async WordPress.com Remote Login -->
<script id="wpcom_remote_login_js">
var wpcom_remote_login_extra_auth = '';
function wpcom_remote_login_remove_dom_node_id( element_id ) {
	var dom_node = document.getElementById( element_id );
	if ( dom_node ) { dom_node.parentNode.removeChild( dom_node ); }
}
function wpcom_remote_login_remove_dom_node_classes( class_name ) {
	var dom_nodes = document.querySelectorAll( '.' + class_name );
	for ( var i = 0; i < dom_nodes.length; i++ ) {
		dom_nodes[ i ].parentNode.removeChild( dom_nodes[ i ] );
	}
}
function wpcom_remote_login_final_cleanup() {
	wpcom_remote_login_remove_dom_node_classes( "wpcom_remote_login_msg" );
	wpcom_remote_login_remove_dom_node_id( "wpcom_remote_login_key" );
	wpcom_remote_login_remove_dom_node_id( "wpcom_remote_login_validate" );
	wpcom_remote_login_remove_dom_node_id( "wpcom_remote_login_js" );
	wpcom_remote_login_remove_dom_node_id( "wpcom_request_access_iframe" );
	wpcom_remote_login_remove_dom_node_id( "wpcom_request_access_styles" );
}

// Watch for messages back from the remote login
window.addEventListener( "message", function( e ) {
	if ( e.origin === "https://r-login.wordpress.com" ) {
		var data = {};
		try {
			data = JSON.parse( e.data );
		} catch( e ) {
			wpcom_remote_login_final_cleanup();
			return;
		}

		if ( data.msg === 'LOGIN' ) {
			// Clean up the login check iframe
			wpcom_remote_login_remove_dom_node_id( "wpcom_remote_login_key" );

			var id_regex = new RegExp( /^[0-9]+$/ );
			var token_regex = new RegExp( /^.*|.*|.*$/ );
			if (
				token_regex.test( data.token )
				&& id_regex.test( data.wpcomid )
			) {
				// We have everything we need to ask for a login
				var script = document.createElement( "script" );
				script.setAttribute( "id", "wpcom_remote_login_validate" );
				script.src = '/remote-login.php?wpcom_remote_login=validate'
					+ '&wpcomid=' + data.wpcomid
					+ '&token=' + encodeURIComponent( data.token )
					+ '&host=' + window.location.protocol
					+ '//' + window.location.hostname
					+ '&postid=3'
					+ '&is_singular=';
				document.body.appendChild( script );
			}

			return;
		}

		// Safari ITP, not logged in, so redirect
		if ( data.msg === 'LOGIN-REDIRECT' ) {
			window.location = 'https://wordpress.com/log-in?redirect_to=' + window.location.href;
			return;
		}

		// Safari ITP, storage access failed, remove the request
		if ( data.msg === 'LOGIN-REMOVE' ) {
			var css_zap = 'html { -webkit-transition: margin-top 1s; transition: margin-top 1s; } /* 9001 */ html { margin-top: 0 !important; } * html body { margin-top: 0 !important; } @media screen and ( max-width: 782px ) { html { margin-top: 0 !important; } * html body { margin-top: 0 !important; } }';
			var style_zap = document.createElement( 'style' );
			style_zap.type = 'text/css';
			style_zap.appendChild( document.createTextNode( css_zap ) );
			document.body.appendChild( style_zap );

			var e = document.getElementById( 'wpcom_request_access_iframe' );
			e.parentNode.removeChild( e );

			document.cookie = 'wordpress_com_login_access=denied; path=/; max-age=31536000';

			return;
		}

		// Safari ITP
		if ( data.msg === 'REQUEST_ACCESS' ) {
			console.log( 'request access: safari' );

			// Check ITP iframe enable/disable knob
			if ( wpcom_remote_login_extra_auth !== 'safari_itp_iframe' ) {
				return;
			}

			// If we are in a "private window" there is no ITP.
			var private_window = false;
			try {
				var opendb = window.openDatabase( null, null, null, null );
			} catch( e ) {
				private_window = true;
			}

			if ( private_window ) {
				console.log( 'private window' );
				return;
			}

			var iframe = document.createElement( 'iframe' );
			iframe.id = 'wpcom_request_access_iframe';
			iframe.setAttribute( 'scrolling', 'no' );
			iframe.setAttribute( 'sandbox', 'allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-top-navigation-by-user-activation' );
			iframe.src = 'https://r-login.wordpress.com/remote-login.php?wpcom_remote_login=request_access&origin=' + encodeURIComponent( data.origin ) + '&wpcomid=' + encodeURIComponent( data.wpcomid );

			var css = 'html { -webkit-transition: margin-top 1s; transition: margin-top 1s; } /* 9001 */ html { margin-top: 46px !important; } * html body { margin-top: 46px !important; } @media screen and ( max-width: 660px ) { html { margin-top: 71px !important; } * html body { margin-top: 71px !important; } #wpcom_request_access_iframe { display: block; height: 71px !important; } } #wpcom_request_access_iframe { border: 0px; height: 46px; position: fixed; top: 0; left: 0; width: 100%; min-width: 100%; z-index: 99999; background: #23282d; } ';

			var style = document.createElement( 'style' );
			style.type = 'text/css';
			style.id = 'wpcom_request_access_styles';
			style.appendChild( document.createTextNode( css ) );
			document.body.appendChild( style );

			document.body.appendChild( iframe );
		}

		if ( data.msg === 'DONE' ) {
			wpcom_remote_login_final_cleanup();
		}
	}
}, false );

// Inject the remote login iframe after the page has had a chance to load
// more critical resources
window.addEventListener( "DOMContentLoaded", function( e ) {
	var iframe = document.createElement( "iframe" );
	iframe.style.display = "none";
	iframe.setAttribute( "scrolling", "no" );
	iframe.setAttribute( "id", "wpcom_remote_login_key" );
	iframe.src = "https://r-login.wordpress.com/remote-login.php"
		+ "?wpcom_remote_login=key"
		+ "&origin=aHR0cHM6Ly9tb25hZGFyYmFuLmJsb2c%3D"
		+ "&wpcomid=160025971"
		+ "&time=1710991170";
	document.body.appendChild( iframe );
}, false );
</script>
<link rel='dns-prefetch' href='//s0.wp.com' />
<link rel='dns-prefetch' href='//widgets.wp.com' />
<link rel="alternate" type="application/rss+xml" title="Mona Assarandarban &raquo; Feed" href="https://monadarban.blog/feed/" />
<link rel="alternate" type="application/rss+xml" title="Mona Assarandarban &raquo; Comments Feed" href="https://monadarban.blog/comments/feed/" />
	<script type="text/javascript">
		/* <![CDATA[ */
		function addLoadEvent(func) {
			var oldonload = window.onload;
			if (typeof window.onload != 'function') {
				window.onload = func;
			} else {
				window.onload = function () {
					oldonload();
					func();
				}
			}
		}
		/* ]]> */
	</script>
	<script>
window._wpemojiSettings = {"baseUrl":"https:\/\/s0.wp.com\/wp-content\/mu-plugins\/wpcom-smileys\/twemoji\/2\/72x72\/","ext":".png","svgUrl":"https:\/\/s0.wp.com\/wp-content\/mu-plugins\/wpcom-smileys\/twemoji\/2\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/s0.wp.com\/wp-includes\/js\/wp-emoji-release.min.js?m=1710334132i&ver=6.5-RC2-57852"}};
/*! This file is auto-generated */
!function(i,n){var o,s,e;function c(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function p(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data),r=(e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0),new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data));return t.every(function(e,t){return e===r[t]})}function u(e,t,n){switch(t){case"flag":return n(e,"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f","\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f")?!1:!n(e,"\ud83c\uddfa\ud83c\uddf3","\ud83c\uddfa\u200b\ud83c\uddf3")&&!n(e,"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f","\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f");case"emoji":return!n(e,"\ud83d\udc26\u200d\u2b1b","\ud83d\udc26\u200b\u2b1b")}return!1}function f(e,t,n){var r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):i.createElement("canvas"),a=r.getContext("2d",{willReadFrequently:!0}),o=(a.textBaseline="top",a.font="600 32px Arial",{});return e.forEach(function(e){o[e]=t(a,e,n)}),o}function t(e){var t=i.createElement("script");t.src=e,t.defer=!0,i.head.appendChild(t)}"undefined"!=typeof Promise&&(o="wpEmojiSettingsSupports",s=["flag","emoji"],n.supports={everything:!0,everythingExceptFlag:!0},e=new Promise(function(e){i.addEventListener("DOMContentLoaded",e,{once:!0})}),new Promise(function(t){var n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),p.toString()].join(",")+"));",r=new Blob([e],{type:"text/javascript"}),a=new Worker(URL.createObjectURL(r),{name:"wpTestEmojiSupports"});return void(a.onmessage=function(e){c(n=e.data),a.terminate(),t(n)})}catch(e){}c(n=f(s,u,p))}t(n)}).then(function(e){for(var t in e)n.supports[t]=e[t],n.supports.everything=n.supports.everything&&n.supports[t],"flag"!==t&&(n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&n.supports[t]);n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&!n.supports.flag,n.DOMReady=!1,n.readyCallback=function(){n.DOMReady=!0}}).then(function(){return e}).then(function(){var e;n.supports.everything||(n.readyCallback(),(e=n.source||{}).concatemoji?t(e.concatemoji):e.wpemoji&&e.twemoji&&(t(e.twemoji),t(e.wpemoji)))}))}((window,document),window._wpemojiSettings);
</script>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-0-1' href='https://s0.wp.com/wp-content/mu-plugins/jetpack-plugin/moon/modules/theme-tools/compat/twentyfifteen.css?m=1685131895i&cssminify=yes' type='text/css' media='all' />
<style id='wp-emoji-styles-inline-css'>

	img.wp-smiley, img.emoji {
		display: inline !important;
		border: none !important;
		box-shadow: none !important;
		height: 1em !important;
		width: 1em !important;
		margin: 0 0.07em !important;
		vertical-align: -0.1em !important;
		background: none !important;
		padding: 0 !important;
	}
</style>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-2-1' href='https://s0.wp.com/_static/??-eJylzFsKgCAQQNENlaNFRB/RWtIGs8YHPop2n7SFPi8XDtyhVd5ldBkCFW1cAl1qSoy6nohwiZFNjIMshjaQ5NXZkpFxjQ+k/BAylVID/6C8o/2gxc5iFLwfOt6L4wUoQDhP&cssminify=yes' type='text/css' media='all' />
<style id='wp-block-library-inline-css'>
.has-text-align-justify {
	text-align:justify;
}
.wp-block-cover__image-background.has-parallax {
	background-size: cover;
}
</style>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-4-1' href='https://s0.wp.com/_static/??-eJzTLy/QzcxLzilNSS3WzyrWz01NyUxMzUnNTc0rQeEU5CRWphbp5qSmJyZX6uVm5uklFxfr6OPTDpRD5sM02efaGpoZmFkYGRuZGmQBAHPvL0Y=&cssminify=yes' type='text/css' media='all' />
<style id='jetpack-sharing-buttons-style-inline-css'>
.jetpack-sharing-buttons__services-list{display:flex;flex-direction:row;flex-wrap:wrap;gap:0;list-style-type:none;margin:5px;padding:0}.jetpack-sharing-buttons__services-list.has-small-icon-size{font-size:12px}.jetpack-sharing-buttons__services-list.has-normal-icon-size{font-size:16px}.jetpack-sharing-buttons__services-list.has-large-icon-size{font-size:24px}.jetpack-sharing-buttons__services-list.has-huge-icon-size{font-size:36px}@media print{.jetpack-sharing-buttons__services-list{display:none!important}}.editor-styles-wrapper .wp-block-jetpack-sharing-buttons{gap:0;padding-inline-start:0}ul.jetpack-sharing-buttons__services-list.has-background{padding:1.25em 2.375em}
</style>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-6-1' href='https://s0.wp.com/_static/??-eJyVjEEOwiAQAD/ksgGN4sH4Fko3hJYCYZea/r49mF6Nx0lmBj8VfMlCWbCmHmJmDP3AgVqAIRU/M04k1fkZkttKFwgtjsiyJVKe+YL/LJqTmAP/yH35ZkZpqzRwXGoiaLSqG46R5TTgHL2Xl75bba/GPB/TDthVT3U=&cssminify=yes' type='text/css' media='all' />
<style id='classic-theme-styles-inline-css'>
/*! This file is auto-generated */
.wp-block-button__link{color:#fff;background-color:#32373c;border-radius:9999px;box-shadow:none;text-decoration:none;padding:calc(.667em + 2px) calc(1.333em + 2px);font-size:1.125em}.wp-block-file__button{background:#32373c;color:#fff;text-decoration:none}
</style>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-8-1' href='https://s0.wp.com/_static/??/wp-content/mu-plugins/core-compat/wp-mediaelement.css,/wp-content/mu-plugins/wpcom-bbpress-premium-themes.css?m=1432920480j&cssminify=yes' type='text/css' media='all' />
<style id='global-styles-inline-css'>
body{--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #fff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--color--dark-gray: #111;--wp--preset--color--light-gray: #f1f1f1;--wp--preset--color--yellow: #f4ca16;--wp--preset--color--dark-brown: #352712;--wp--preset--color--medium-pink: #e53b51;--wp--preset--color--light-pink: #ffe5d1;--wp--preset--color--dark-purple: #2e2256;--wp--preset--color--purple: #674970;--wp--preset--color--blue-gray: #22313f;--wp--preset--color--bright-blue: #55c3dc;--wp--preset--color--light-blue: #e9f2f9;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--gradient--dark-gray-gradient-gradient: linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(42,42,42,1) 100%);--wp--preset--gradient--light-gray-gradient: linear-gradient(90deg, rgba(241,241,241,1) 0%, rgba(215,215,215,1) 100%);--wp--preset--gradient--white-gradient: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 100%);--wp--preset--gradient--yellow-gradient: linear-gradient(90deg, rgba(244,202,22,1) 0%, rgba(205,168,10,1) 100%);--wp--preset--gradient--dark-brown-gradient: linear-gradient(90deg, rgba(53,39,18,1) 0%, rgba(91,67,31,1) 100%);--wp--preset--gradient--medium-pink-gradient: linear-gradient(90deg, rgba(229,59,81,1) 0%, rgba(209,28,51,1) 100%);--wp--preset--gradient--light-pink-gradient: linear-gradient(90deg, rgba(255,229,209,1) 0%, rgba(255,200,158,1) 100%);--wp--preset--gradient--dark-purple-gradient: linear-gradient(90deg, rgba(46,34,86,1) 0%, rgba(66,48,123,1) 100%);--wp--preset--gradient--purple-gradient: linear-gradient(90deg, rgba(103,73,112,1) 0%, rgba(131,93,143,1) 100%);--wp--preset--gradient--blue-gray-gradient: linear-gradient(90deg, rgba(34,49,63,1) 0%, rgba(52,75,96,1) 100%);--wp--preset--gradient--bright-blue-gradient: linear-gradient(90deg, rgba(85,195,220,1) 0%, rgba(43,180,211,1) 100%);--wp--preset--gradient--light-blue-gradient: linear-gradient(90deg, rgba(233,242,249,1) 0%, rgba(193,218,238,1) 100%);--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--font-family--albert-sans: 'Albert Sans', sans-serif;--wp--preset--font-family--alegreya: Alegreya, serif;--wp--preset--font-family--arvo: Arvo, serif;--wp--preset--font-family--bodoni-moda: 'Bodoni Moda', serif;--wp--preset--font-family--cabin: Cabin, sans-serif;--wp--preset--font-family--chivo: Chivo, sans-serif;--wp--preset--font-family--commissioner: Commissioner, sans-serif;--wp--preset--font-family--cormorant: Cormorant, serif;--wp--preset--font-family--courier-prime: 'Courier Prime', monospace;--wp--preset--font-family--crimson-pro: 'Crimson Pro', serif;--wp--preset--font-family--dm-mono: 'DM Mono', monospace;--wp--preset--font-family--dm-sans: 'DM Sans', sans-serif;--wp--preset--font-family--domine: Domine, serif;--wp--preset--font-family--eb-garamond: 'EB Garamond', serif;--wp--preset--font-family--epilogue: Epilogue, sans-serif;--wp--preset--font-family--figtree: Figtree, sans-serif;--wp--preset--font-family--fira-sans: 'Fira Sans', sans-serif;--wp--preset--font-family--fraunces: Fraunces, serif;--wp--preset--font-family--ibm-plex-mono: 'IBM Plex Mono', monospace;--wp--preset--font-family--ibm-plex-sans: 'IBM Plex Sans', sans-serif;--wp--preset--font-family--inter: Inter, sans-serif;--wp--preset--font-family--josefin-sans: 'Josefin Sans', sans-serif;--wp--preset--font-family--jost: Jost, sans-serif;--wp--preset--font-family--libre-baskerville: 'Libre Baskerville', serif;--wp--preset--font-family--libre-franklin: 'Libre Franklin', sans-serif;--wp--preset--font-family--literata: Literata, serif;--wp--preset--font-family--lora: Lora, serif;--wp--preset--font-family--merriweather: Merriweather, serif;--wp--preset--font-family--montserrat: Montserrat, sans-serif;--wp--preset--font-family--newsreader: Newsreader, serif;--wp--preset--font-family--nunito: Nunito, sans-serif;--wp--preset--font-family--open-sans: 'Open Sans', sans-serif;--wp--preset--font-family--overpass: Overpass, sans-serif;--wp--preset--font-family--petrona: Petrona, serif;--wp--preset--font-family--piazzolla: Piazzolla, serif;--wp--preset--font-family--playfair-display: 'Playfair Display', serif;--wp--preset--font-family--plus-jakarta-sans: 'Plus Jakarta Sans', sans-serif;--wp--preset--font-family--poppins: Poppins, sans-serif;--wp--preset--font-family--raleway: Raleway, sans-serif;--wp--preset--font-family--roboto: Roboto, sans-serif;--wp--preset--font-family--roboto-slab: 'Roboto Slab', serif;--wp--preset--font-family--rubik: Rubik, sans-serif;--wp--preset--font-family--sora: Sora, sans-serif;--wp--preset--font-family--source-sans-3: 'Source Sans 3', sans-serif;--wp--preset--font-family--source-serif-4: 'Source Serif 4', serif;--wp--preset--font-family--space-mono: 'Space Mono', monospace;--wp--preset--font-family--texturina: Texturina, serif;--wp--preset--font-family--work-sans: 'Work Sans', sans-serif;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);--wp--preset--shadow--outlined: 6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1);--wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1);}:where(.is-layout-flex){gap: 0.5em;}:where(.is-layout-grid){gap: 0.5em;}body .is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}body .is-layout-flex{flex-wrap: wrap;align-items: center;}body .is-layout-flex > *{margin: 0;}body .is-layout-grid{display: grid;}body .is-layout-grid > *{margin: 0;}:where(.wp-block-columns.is-layout-flex){gap: 2em;}:where(.wp-block-columns.is-layout-grid){gap: 2em;}:where(.wp-block-post-template.is-layout-flex){gap: 1.25em;}:where(.wp-block-post-template.is-layout-grid){gap: 1.25em;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}.has-albert-sans-font-family{font-family: var(--wp--preset--font-family--albert-sans) !important;}.has-alegreya-font-family{font-family: var(--wp--preset--font-family--alegreya) !important;}.has-arvo-font-family{font-family: var(--wp--preset--font-family--arvo) !important;}.has-bodoni-moda-font-family{font-family: var(--wp--preset--font-family--bodoni-moda) !important;}.has-cabin-font-family{font-family: var(--wp--preset--font-family--cabin) !important;}.has-chivo-font-family{font-family: var(--wp--preset--font-family--chivo) !important;}.has-commissioner-font-family{font-family: var(--wp--preset--font-family--commissioner) !important;}.has-cormorant-font-family{font-family: var(--wp--preset--font-family--cormorant) !important;}.has-courier-prime-font-family{font-family: var(--wp--preset--font-family--courier-prime) !important;}.has-crimson-pro-font-family{font-family: var(--wp--preset--font-family--crimson-pro) !important;}.has-dm-mono-font-family{font-family: var(--wp--preset--font-family--dm-mono) !important;}.has-dm-sans-font-family{font-family: var(--wp--preset--font-family--dm-sans) !important;}.has-domine-font-family{font-family: var(--wp--preset--font-family--domine) !important;}.has-eb-garamond-font-family{font-family: var(--wp--preset--font-family--eb-garamond) !important;}.has-epilogue-font-family{font-family: var(--wp--preset--font-family--epilogue) !important;}.has-figtree-font-family{font-family: var(--wp--preset--font-family--figtree) !important;}.has-fira-sans-font-family{font-family: var(--wp--preset--font-family--fira-sans) !important;}.has-fraunces-font-family{font-family: var(--wp--preset--font-family--fraunces) !important;}.has-ibm-plex-mono-font-family{font-family: var(--wp--preset--font-family--ibm-plex-mono) !important;}.has-ibm-plex-sans-font-family{font-family: var(--wp--preset--font-family--ibm-plex-sans) !important;}.has-inter-font-family{font-family: var(--wp--preset--font-family--inter) !important;}.has-josefin-sans-font-family{font-family: var(--wp--preset--font-family--josefin-sans) !important;}.has-jost-font-family{font-family: var(--wp--preset--font-family--jost) !important;}.has-libre-baskerville-font-family{font-family: var(--wp--preset--font-family--libre-baskerville) !important;}.has-libre-franklin-font-family{font-family: var(--wp--preset--font-family--libre-franklin) !important;}.has-literata-font-family{font-family: var(--wp--preset--font-family--literata) !important;}.has-lora-font-family{font-family: var(--wp--preset--font-family--lora) !important;}.has-merriweather-font-family{font-family: var(--wp--preset--font-family--merriweather) !important;}.has-montserrat-font-family{font-family: var(--wp--preset--font-family--montserrat) !important;}.has-newsreader-font-family{font-family: var(--wp--preset--font-family--newsreader) !important;}.has-nunito-font-family{font-family: var(--wp--preset--font-family--nunito) !important;}.has-open-sans-font-family{font-family: var(--wp--preset--font-family--open-sans) !important;}.has-overpass-font-family{font-family: var(--wp--preset--font-family--overpass) !important;}.has-petrona-font-family{font-family: var(--wp--preset--font-family--petrona) !important;}.has-piazzolla-font-family{font-family: var(--wp--preset--font-family--piazzolla) !important;}.has-playfair-display-font-family{font-family: var(--wp--preset--font-family--playfair-display) !important;}.has-plus-jakarta-sans-font-family{font-family: var(--wp--preset--font-family--plus-jakarta-sans) !important;}.has-poppins-font-family{font-family: var(--wp--preset--font-family--poppins) !important;}.has-raleway-font-family{font-family: var(--wp--preset--font-family--raleway) !important;}.has-roboto-font-family{font-family: var(--wp--preset--font-family--roboto) !important;}.has-roboto-slab-font-family{font-family: var(--wp--preset--font-family--roboto-slab) !important;}.has-rubik-font-family{font-family: var(--wp--preset--font-family--rubik) !important;}.has-sora-font-family{font-family: var(--wp--preset--font-family--sora) !important;}.has-source-sans-3-font-family{font-family: var(--wp--preset--font-family--source-sans-3) !important;}.has-source-serif-4-font-family{font-family: var(--wp--preset--font-family--source-serif-4) !important;}.has-space-mono-font-family{font-family: var(--wp--preset--font-family--space-mono) !important;}.has-texturina-font-family{font-family: var(--wp--preset--font-family--texturina) !important;}.has-work-sans-font-family{font-family: var(--wp--preset--font-family--work-sans) !important;}
:where(.wp-block-columns.is-layout-flex){gap: 2em;}:where(.wp-block-columns.is-layout-grid){gap: 2em;}
.wp-block-pullquote{font-size: 1.5em;line-height: 1.6;}
.wp-block-navigation a:where(:not(.wp-element-button)){color: inherit;}
:where(.wp-block-post-template.is-layout-flex){gap: 1.25em;}:where(.wp-block-post-template.is-layout-grid){gap: 1.25em;}
</style>
<link rel='stylesheet' id='verbum-gutenberg-css-css' href='https://widgets.wp.com/verbum-block-editor/block-editor.css?ver=1705430309' media='all' />
<link rel='stylesheet' id='twentyfifteen-fonts-css' href='https://s0.wp.com/wp-content/themes/pub/twentyfifteen/assets/fonts/noto-sans-plus-noto-serif-plus-inconsolata.css?ver=20230328' media='all' />
<link crossorigin='anonymous' rel='stylesheet' id='all-css-14-1' href='https://s0.wp.com/_static/??-eJyNjbEOwjAQQ3+IYhWlFQyIT0H0dC1pk0vEXVT174lQBwYGNtt6trHmhpIYiyGWJocyeVHMbPlBy+4RUxLcvRAmFn752tDf8kiqB3yN2pMjK3IZYGsNttGPxixQ2wL/j1cQQ0i0fC5u8dr25649XZxz8xtDC0n5&cssminify=yes' type='text/css' media='all' />
<!--[if lt IE 9]>
<link rel='stylesheet' id='twentyfifteen-ie-css' href='https://s0.wp.com/wp-content/themes/pub/twentyfifteen/css/ie.css?m=1683318229i&#038;ver=20220908' media='all' />
<![endif]-->
<!--[if lt IE 8]>
<link rel='stylesheet' id='twentyfifteen-ie7-css' href='https://s0.wp.com/wp-content/themes/pub/twentyfifteen/css/ie7.css?m=1418225460i&#038;ver=20141210' media='all' />
<![endif]-->
<link crossorigin='anonymous' rel='stylesheet' id='all-css-18-1' href='https://s0.wp.com/_static/??-eJx9jUEKAjEMRS9kDWVQmYV4lpmS1kqalElKmdtb3agbd/99eDzo1QVhQzawOxZUqG0F6+PYY46GyBBUQW0ndL0GKcfBB/gSS3OVWsqskFAcSVgsC/+Ai7Tk7Z+64UqSxkzv4Adf0q1c/clPZ3+Zp/nxBM/VQ5o=&cssminify=yes' type='text/css' media='all' />
<style id='jetpack-global-styles-frontend-style-inline-css'>
:root { --font-headings: unset; --font-base: unset; --font-headings-default: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; --font-base-default: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;}
</style>
<link crossorigin='anonymous' rel='stylesheet' id='all-css-20-1' href='https://s0.wp.com/wp-content/themes/h4/global.css?m=1420737423i&cssminify=yes' type='text/css' media='all' />
<script id="media-video-jwt-bridge-js-extra">
var videopressAjax = {"ajaxUrl":"https:\/\/homepagemona.wordpress.com\/wp-admin\/admin-ajax.php","bridgeUrl":"\/wp-content\/mu-plugins\/jetpack-plugin\/moon\/jetpack_vendor\/automattic\/jetpack-videopress\/build\/lib\/token-bridge.js","post_id":"3"};
</script>
<script id="wpcom-actionbar-placeholder-js-extra">
var actionbardata = {"siteID":"160025971","postID":"0","siteURL":"https:\/\/monadarban.blog","xhrURL":"https:\/\/monadarban.blog\/wp-admin\/admin-ajax.php","nonce":"a9ea246035","isLoggedIn":"","statusMessage":"","subsEmailDefault":"instantly","proxyScriptUrl":"https:\/\/s0.wp.com\/wp-content\/js\/wpcom-proxy-request.js?ver=20211021","i18n":{"followedText":"New posts from this site will now appear in your <a href=\"https:\/\/wordpress.com\/read\">Reader<\/a>","foldBar":"Collapse this bar","unfoldBar":"Expand this bar"}};
</script>
<script crossorigin='anonymous' type='text/javascript'  src='https://s0.wp.com/_static/??-eJyFjsEOwjAMQ3+IrtsBTRwQn4LaNUzp2qS06WB/z5A2BCdOVuxnOfqR1MAkQKJ90ZEtBlC1QDbj6imkGze+HPQvl4OolPm57BnSEKqD8g79vUJeNmki0l9IRRyzEfiG97VYVQp1RFo7IMkM03avzzLt3nUGcpy1qcLRiODwoWd0wClDKdpWDE4HtFp4AlI2oxthXbzEc9e3bdt3x1PrX89xZ2Y='></script>
<script id="rlt-proxy-js-after">
	window.addEventListener( 'DOMContentLoaded', function() {
		rltInitialize( {"token":null,"iframeOrigins":["https:\/\/widgets.wp.com"]} );
	} );
</script>
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://homepagemona.wordpress.com/xmlrpc.php?rsd" />
<meta name="generator" content="WordPress.com" />

<!-- Jetpack Open Graph Tags -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Mona Assarandarban" />
<meta property="og:description" content="Developer &amp; Researcher" />
<meta property="og:url" content="https://monadarban.blog/" />
<meta property="og:site_name" content="Mona Assarandarban" />
<meta property="og:image" content="https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=200" />
<meta property="og:image:width" content="200" />
<meta property="og:image:height" content="200" />
<meta property="og:image:alt" content="" />
<meta property="og:locale" content="en_US" />

<!-- End Jetpack Open Graph Tags -->
<link rel="search" type="application/opensearchdescription+xml" href="https://monadarban.blog/osd.xml" title="Mona Assarandarban" />
<link rel="search" type="application/opensearchdescription+xml" href="https://s1.wp.com/opensearch.xml" title="WordPress.com" />
<meta name="theme-color" content="#d8f2f1" />
<meta name="application-name" content="Mona Assarandarban" /><meta name="msapplication-window" content="width=device-width;height=device-height" /><meta name="msapplication-tooltip" content="Developer &amp; Researcher" /><meta name="msapplication-task" content="name=Subscribe;action-uri=https://monadarban.blog/feed/;icon-uri=https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=16" /><meta name="msapplication-task" content="name=Sign up for a free blog;action-uri=http://wordpress.com/signup/;icon-uri=https://s0.wp.com/i/favicon.ico" /><meta name="msapplication-task" content="name=WordPress.com Support;action-uri=http://support.wordpress.com/;icon-uri=https://s0.wp.com/i/favicon.ico" /><meta name="msapplication-task" content="name=WordPress.com Forums;action-uri=http://forums.wordpress.com/;icon-uri=https://s0.wp.com/i/favicon.ico" /><meta name="description" content="Developer &amp; Researcher" />
<style id="custom-background-css">
body.custom-background { background-color: #d8f2f1; }
</style>
	<style type="text/css" id="custom-colors-css">	.small-screen .widget button,
	.small-screen .widget input[type="button"],
	.small-screen .widget input[type="reset"],
	.small-screen .widget input[type="submit"],
	.small-screen .widget_calendar tbody a,
	.small-screen .widget_calendar tbody a:hover,
	.small-screen .widget_calendar tbody a:focus {
		color: #fff;
	}

	.small-screen .widget button,
	.small-screen .widget input[type="button"],
	.small-screen .widget input[type="reset"],
	.small-screen .widget input[type="submit"],
	.small-screen .widget_calendar tbody a {
		background-color: #333;
	}

	.small-screen .secondary a,
	.small-screen .dropdown-toggle:after,
	.small-screen .widget-title,
	.small-screen .widget blockquote cite,
	.small-screen .widget blockquote small {
		color: #333;
	}

	.small-screen .textwidget a {
		border-color: #333;
	}

	.small-screen .widget button:hover,
	.small-screen .widget button:focus,
	.small-screen .widget input[type="button"]:hover,
	.small-screen .widget input[type="button"]:focus,
	.small-screen .widget input[type="reset"]:hover,
	.small-screen .widget input[type="reset"]:focus,
	.small-screen .widget input[type="submit"]:hover,
	.small-screen .widget input[type="submit"]:focus,
	.small-screen .widget_calendar tbody a:hover,
	.small-screen .widget_calendar tbody a:focus {
		background-color: #707070;
		background-color: rgba(51, 51, 51, 0.7);
	}

	.small-screen .secondary a:hover,
	.small-screen .secondary a:focus,
	.small-screen .main-navigation .menu-item-description,
	.small-screen .widget,
	.small-screen .widget blockquote,
	.small-screen .widget .wp-caption-text,
	.small-screen .widget .gallery-caption {
		color: #707070;
		color: rgba(51, 51, 51, 0.7);
	}

	.small-screen .widget blockquote {
		border-color: #707070;
		border-color: rgba(51, 51, 51, 0.7);
	}

	.small-screen .widget input:focus,
	.small-screen .widget textarea:focus {
		border-color: #c1c1c1;
		border-color: rgba(51, 51, 51, 0.3);
	}

	.small-screen .sidebar a:focus,
	.small-screen .dropdown-toggle:focus {
		outline-color: #c1c1c1;
		outline-color: rgba(51, 51, 51, 0.3);
	}

	.small-screen .main-navigation ul,
	.small-screen .main-navigation li,
	.small-screen .widget input,
	.small-screen .widget textarea,
	.small-screen .widget table,
	.small-screen .widget th,
	.small-screen .widget td,
	.small-screen .widget pre,
	.small-screen .widget li,
	.small-screen .widget ul ul,
	.small-screen .widget_categories .children,
	.small-screen .widget_nav_menu .sub-menu,
	.small-screen .widget_pages .children,
	.small-screen .widget abbr[title]	{
		border-color: #eaeaea;
		border-color: rgba(51, 51, 51, 0.1);
	}

	.small-screen .dropdown-toggle:hover,
	.small-screen .dropdown-toggle:focus,
	.small-screen .widget hr {
		background-color: #eaeaea;
		background-color: rgba(51, 51, 51, 0.1);
	}

	.small-screen .widget-area .milestone-header,
	.small-screen .widget-area .milestone-countdown,
	.small-screen .widget-area .milestone-message {
		border-color: #eaeaea;
		border-color: rgba(51, 51, 51, 0.1);
		color: inherit;
	}

	.small-screen .milestone-widget .event,
	.small-screen .milestone-widget .difference {
		color: #333;
	}
body { background-color: #d8f2f1;}
body:before,
		.small-screen .site-header { background-color: #55c3dc;}
.widget button,
		.widget input[type="button"],
		.widget input[type="reset"],
		.widget input[type="submit"],
		.widget_calendar tbody a,
		.widget_calendar tbody a:hover,
		.widget_calendar tbody a:focus { color: #55c3dc;}
.secondary-toggle:hover,
		.secondary-toggle:focus,
		.widget input:focus,
		.widget textarea:focus { border-color: #2BA4BF;}
.site-title a,
		.sidebar a:focus,
		.dropdown-toggle:focus { outline-color: #2BA4BF;}
.main-navigation ul,
		.main-navigation li,
		.secondary-toggle,
		.widget input,
		.widget textarea,
		.widget table,
		.widget th,
		.widget td,
		.widget pre,
		.widget li,
		.widget ul ul,
		.widget_categories .children,
		.widget_nav_menu .sub-menu,
		.widget_pages .children,
		.widget abbr[title],
		.widget-area .milestone-header,
		.widget-area .milestone-countdown,
		.widget-area .milestone-message { border-color: #33B3D0;}
.dropdown-toggle:hover,
		.dropdown-toggle:focus,
		.widget hr { background-color: #33B3D0;}
.widget button,
		.widget input[type="button"],
		.widget input[type="reset"],
		.widget input[type="submit"],
		.widget_calendar tbody a { background-color: #606060;}
.site-title a,
		.site-description,
		.secondary-toggle,
		.secondary-toggle:before,
		.secondary a,
		.dropdown-toggle:after,
		.widget-title,
		.widget blockquote cite,
		.widget blockquote small,
		.milestone-widget .event,
		.milestone-widget .difference { color: #606060;}
.textwidget a,
		.widget_gravatar a { border-color: #606060;}
.widget button:hover,
		.widget button:focus,
		.widget input[type="button"]:hover,
		.widget input[type="button"]:focus,
		.widget input[type="reset"]:hover,
		.widget input[type="reset"]:focus,
		.widget input[type="submit"]:hover,
		.widget input[type="submit"]:focus,
		.widget_calendar tbody a:hover,
		.widget_calendar tbody a:focus { background-color: #CCEDF5;}
.site-title a:hover,
		.site-title a:focus,
		.secondary a:hover,
		.secondary a:focus,
		.main-navigation .menu-item-description,
		.widget,
		.widget blockquote,
		.widget .wp-caption-text,
		.widget .gallery-caption { color: #CCEDF5;}
.widget blockquote { border-color: #CCEDF5;}
</style>
<link rel="icon" href="https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=32" sizes="32x32" />
<link rel="icon" href="https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=192" sizes="192x192" />
<link rel="apple-touch-icon" href="https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=180" />
<meta name="msapplication-TileImage" content="https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=270" />
</head>

<body class="blog custom-background wp-custom-logo wp-embed-responsive customizer-styles-applied jetpack-reblog-enabled has-site-logo">
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content">
		Skip to content	</a>

	<div id="sidebar" class="sidebar">
		<header id="masthead" class="site-header" role="banner">
			<div class="site-branding">
				<a href="https://monadarban.blog/" class="site-logo-link" rel="home" itemprop="url"><img width="216" height="272" src="https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=216" class="site-logo attachment-twentyfifteen-logo" alt="" decoding="async" data-size="twentyfifteen-logo" itemprop="logo" srcset="https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=216 216w, https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=432 432w, https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=119 119w, https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=239 239w" sizes="(max-width: 216px) 100vw, 216px" data-attachment-id="91" data-permalink="https://monadarban.blog/img_4813/" data-orig-file="https://homepagemona.files.wordpress.com/2019/07/img_4813.png" data-orig-size="743,934" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="IMG_4813" data-image-description="" data-image-caption="" data-medium-file="https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=239" data-large-file="https://homepagemona.files.wordpress.com/2019/07/img_4813.png?w=660" /></a>
										<p class="site-title"><a href="https://monadarban.blog/" rel="home">Mona Assarandarban</a></p>
												<p class="site-description">Developer &amp; Researcher</p>
										<button class="secondary-toggle">Menu and widgets</button>
			</div><!-- .site-branding -->
		</header><!-- .site-header -->

			<div id="secondary" class="secondary">

					<nav id="site-navigation" class="main-navigation" role="navigation">
				<div class="menu-primary-container"><ul id="menu-primary" class="nav-menu"><li id="menu-item-6" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-6"><a href="/" aria-current="page">Home</a></li>
<li id="menu-item-39" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-39"><a href="https://monadarban.blog/education/">Education</a></li>
<li id="menu-item-40" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-40"><a href="https://monadarban.blog/skills/">Skills</a></li>
<li id="menu-item-41" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-41"><a href="https://monadarban.blog/professional-experience/">Professional Experience</a></li>
<li id="menu-item-42" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-42"><a href="https://monadarban.blog/projects/">Projects</a></li>
<li id="menu-item-7" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-7"><a href="https://monadarban.blog/contact/">Contact</a></li>
</ul></div>			</nav><!-- .main-navigation -->
		
		
		
	</div><!-- .secondary -->

	</div><!-- .sidebar -->

	<div id="content" class="site-content">

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		
							<header>
					<h1 class="page-title screen-reader-text"></h1>
				</header>
			
			
<article id="post-3" class="post-3 post type-post status-publish format-standard has-post-thumbnail hentry">
	
	<a class="post-thumbnail" href="https://monadarban.blog/2020/12/18/the-journey-begins/" aria-hidden="true">
		<img width="825" height="510" src="https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=825&amp;h=510&amp;crop=1" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="Thanks for visiting!" decoding="async" srcset="https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=825&amp;h=510&amp;crop=1 825w, https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=1650&amp;h=1020&amp;crop=1 1650w, https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=150&amp;h=93&amp;crop=1 150w, https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=300&amp;h=185&amp;crop=1 300w, https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=768&amp;h=475&amp;crop=1 768w, https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=1024&amp;h=633&amp;crop=1 1024w" sizes="(max-width: 825px) 100vw, 825px" data-attachment-id="44" data-permalink="https://monadarban.blog/img_1850-1/" data-orig-file="https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg" data-orig-size="4032,3024" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;1.8&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;iPhone 7&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;1492200204&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;3.99&quot;,&quot;iso&quot;:&quot;25&quot;,&quot;shutter_speed&quot;:&quot;0.016666666666667&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;1&quot;,&quot;latitude&quot;:&quot;39.096119444444&quot;,&quot;longitude&quot;:&quot;-84.509680555556&quot;}" data-image-title="img_1850-1" data-image-description="" data-image-caption="" data-medium-file="https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=300" data-large-file="https://homepagemona.files.wordpress.com/2019/07/img_1850-1.jpg?w=660" />	</a>

		
	<header class="entry-header">
		<h2 class="entry-title"><a href="https://monadarban.blog/2020/12/18/the-journey-begins/" rel="bookmark">Thanks for visiting!</a></h2>	</header><!-- .entry-header -->

	<div class="entry-content">
		
<p>I am a graduate assistant at University of Cincinnati. I am interested in Data Science and Front-End Developing and did some cool designs.</p>



<p>I like swimming, camping, cooking, roller coasters, oceans, and dogs.  </p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>All things are difficult before they are easy. —Thomas Fuller</p></blockquote>



<p></p>
	</div><!-- .entry-content -->

	
	<footer class="entry-footer">
		<span class="posted-on"><span class="screen-reader-text">Posted on </span><a href="https://monadarban.blog/2020/12/18/the-journey-begins/" rel="bookmark"><time class="entry-date published" datetime="2020-12-18T04:23:28+00:00">December 18, 2020</time><time class="updated" datetime="2020-12-18T04:25:40+00:00">December 18, 2020</time></a></span>			</footer><!-- .entry-footer -->

</article><!-- #post-3 -->

		</main><!-- .site-main -->
	</div><!-- .content-area -->


	</div><!-- .site-content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
									<a href="https://wordpress.com/?ref=footer_custom_blog" rel="nofollow">Start a Blog at WordPress.com</a>.
		</div><!-- .site-info -->
	</footer><!-- .site-footer -->

</div><!-- .site -->

<!--  -->
<script src="//0.gravatar.com/js/hovercards/hovercards.min.js?ver=202412972dc1153ba1a0ecc4b0ab4d4ad33775d6ace2779a421666b6a24c2cafc59b8a" id="grofiles-cards-js"></script>
<script id="wpgroho-js-extra">
var WPGroHo = {"my_hash":""};
</script>
<script crossorigin='anonymous' type='text/javascript'  src='https://s0.wp.com/wp-content/mu-plugins/gravatar-hovercards/wpgroho.js?m=1610363240i'></script>

	<script>
		// Initialize and attach hovercards to all gravatars
		( function() {
			function init() {
				if ( typeof Gravatar === 'undefined' ) {
					return;
				}

				if ( typeof Gravatar.init !== 'function' ) {
					return;
				}

				Gravatar.profile_cb = function ( hash, id ) {
					WPGroHo.syncProfileData( hash, id );
				};

				Gravatar.my_hash = WPGroHo.my_hash;
				Gravatar.init(
					'body',
					'#wp-admin-bar-my-account',
					{
						i18n: {
							'Edit your profile': 'Edit your profile',
							'View profile': 'View profile',
							'Sorry, we are unable to load this Gravatar profile.': 'Sorry, we are unable to load this Gravatar profile.',
							'Sorry, we are unable to load this Gravatar profile. Please check your internet connection.': 'Sorry, we are unable to load this Gravatar profile. Please check your internet connection.',
						},
					}
				);
			}

			if ( document.readyState !== 'loading' ) {
				init();
			} else {
				document.addEventListener( 'DOMContentLoaded', init );
			}
		} )();
	</script>

		<div style="display:none">
	</div>
	<div id="actionbar" style="display: none;"
			class="actnbr-pub-twentyfifteen actnbr-has-follow">
		<ul>
						<li class="actnbr-ellipsis actnbr-hidden">
				<svg class="gridicon gridicons-ellipsis" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M7 12c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm12-2c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"/></g></svg>				<div class="actnbr-popover tip tip-top-left actnbr-more">
					<div class="tip-arrow"></div>
					<div class="tip-inner">
						<ul>
									<li class="actnbr-sitename">
			<a href="https://monadarban.blog">
				<img alt='' src='https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=50' srcset='https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=50 1x, https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=75 1.5x, https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=100 2x, https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=150 3x, https://homepagemona.files.wordpress.com/2019/07/cropped-img_4154-1.jpg?w=200 4x' class='avatar avatar-50' height='50' width='50' />				Mona Assarandarban			</a>
		</li>
								<li class="actnbr-folded-customize">
								<a href="https://homepagemona.wordpress.com/wp-admin/customize.php?url=https%3A%2F%2Fhomepagemona.wordpress.com%2F">
									<svg class="gridicon gridicons-customize" height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2 1.657 0 3 1.343 3 3 0 .386-.08.752-.212 1.09.74.594 1.476 1.19 2.19 1.81L8.9 11.98c-.62-.716-1.214-1.454-1.807-2.192C6.753 9.92 6.387 10 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.34-1.34c.607.304 1.283.492 2.008.492 2.485 0 4.5-2.015 4.5-4.5 0-.725-.188-1.4-.493-2.007L18 9l-2-2 3.507-3.507C18.9 3.188 18.225 3 17.5 3 15.015 3 13 5.015 13 7.5c0 .725.188 1.4.493 2.007L3 20l2 2 6.848-6.848c1.885 1.928 3.874 3.753 5.977 5.45l1.425 1.148 1.5-1.5-1.15-1.425c-1.695-2.103-3.52-4.092-5.448-5.977z"/></g></svg>									<span>Customize</span>
								</a>
							</li>
																<li class="actnbr-signup"><a href="https://wordpress.com/start/">Sign up</a></li>
									<li class="actnbr-login"><a href="https://wordpress.com/log-in?redirect_to=https%3A%2F%2Fr-login.wordpress.com%2Fremote-login.php%3Faction%3Dlink%26back%3Dhttps%253A%252F%252Fmonadarban.blog%252F2020%252F12%252F18%252Fthe-journey-begins%252F">Log in</a></li>
																	<li class="flb-report">
										<a href="https://wordpress.com/abuse/?report_url=https://monadarban.blog" target="_blank" rel="noopener noreferrer">
											Report this content										</a>
									</li>
																	<li class="actnbr-subs">
										<a href="https://subscribe.wordpress.com/">Manage subscriptions</a>
									</li>
														</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
	
<script>
window.addEventListener( "load", function( event ) {
	var link = document.createElement( "link" );
	link.href = "https://s0.wp.com/wp-content/mu-plugins/actionbar/actionbar.css?v=20240115";
	link.type = "text/css";
	link.rel = "stylesheet";
	document.head.appendChild( link );

	var script = document.createElement( "script" );
	script.src = "https://s0.wp.com/wp-content/mu-plugins/actionbar/actionbar.js?v=20231122";
	script.defer = true;
	document.body.appendChild( script );
} );
</script>

	<script id="twentyfifteen-script-js-extra">
var screenReaderText = {"expand":"<span class=\"screen-reader-text\">expand child menu<\/span>","collapse":"<span class=\"screen-reader-text\">collapse child menu<\/span>"};
</script>
<script crossorigin='anonymous' type='text/javascript'  src='https://s0.wp.com/_static/??-eJyVy0sKhDAMANALTScKfnAh3sWSYFqbFpJSvf14hHH74EErzmcxFAM7MKFCqTtYe+AmJkMUCAoaubiTJTrKvqojvr5BP/BnpyreOIu+Sa34nJ6wpbWfxmXu5mEZwg/AxkJQ'></script>

	<script type="text/javascript">
		(function () {
			var wpcom_reblog = {
				source: 'toolbar',

				toggle_reblog_box_flair: function (obj_id, post_id) {

					// Go to site selector. This will redirect to their blog if they only have one.
					const postEndpoint = `https://wordpress.com/post`;

					// Ideally we would use the permalink here, but fortunately this will be replaced with the 
					// post permalink in the editor.
					const originalURL = `${ document.location.href }?page_id=${ post_id }`; 
					
					const url =
						postEndpoint +
						'?url=' +
						encodeURIComponent( originalURL ) +
						'&is_post_share=true' +
						'&v=5';

					const redirect = function () {
						if (
							! window.open( url, '_blank' )
						) {
							location.href = url;
						}
					};

					if ( /Firefox/.test( navigator.userAgent ) ) {
						setTimeout( redirect, 0 );
					} else {
						redirect();
					}
				},
			};

			window.wpcom_reblog = wpcom_reblog;
		})();
	</script>
<script type="text/javascript">
// <![CDATA[
(function() {
try{
  if ( window.external &&'msIsSiteMode' in window.external) {
    if (window.external.msIsSiteMode()) {
      var jl = document.createElement('script');
      jl.type='text/javascript';
      jl.async=true;
      jl.src='/wp-content/plugins/ie-sitemode/custom-jumplist.php';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(jl, s);
    }
  }
}catch(e){}
})();
// ]]>
</script><script src="//stats.wp.com/w.js?67" defer></script> <script type="text/javascript">
_tkq = window._tkq || [];
_stq = window._stq || [];
_tkq.push(['storeContext', {'blog_id':'160025971','blog_tz':'0','user_lang':'en','blog_lang':'en','user_id':'0'}]);
_stq.push(['view', {'blog':'160025971','v':'wpcom','tz':'0','user_id':'0','subd':'homepagemona'}]);
_stq.push(['extra', {'crypt':'UE40eW5QN0p8M2Y/RE1mNzc2NTVTamdsd0xoLz9RQkM2K298TXY9bERQMXc2MjhEaVZfb2wwakRoSj0mUkp1THptM1NdbkV1WjZIcU9mVWQmPUIvMlN6Jk8wW3NYVEJ3dWZOWExuWD9VNTEucGV1WGZBY2VVS08lWVNlMVF2clB4Y1EmPTFYfkFzb2dRd2lQZ1NfdmFyST0xRmFdRC0tcHJbb2Y4ZkhhK0RSJXM4SUVXbDlzRk93Ni04Q3xvWUNjSHRpLz9vSll3Ny90NVtGQXMweS1dTUMxbVFFMHRTY1NbMy8wP1ExS3ZfOXo/X1lueHQzRWZoUnBfLEFLPS90NWZnQ2o0Vzh+VDhlbDg3P2pJbjVbLw=='}]);
_stq.push([ 'clickTrackerInit', '160025971', '0' ]);
</script>
<noscript><img src="https://pixel.wp.com/b.gif?v=noscript" style="height:1px;width:1px;overflow:hidden;position:absolute;bottom:1px;" alt="" /></noscript>
<script defer id="bilmur" data-customproperties="{&quot;enq_jquery&quot;:&quot;1&quot;,&quot;logged_in&quot;:&quot;0&quot;,&quot;wptheme&quot;:&quot;pub\/twentyfifteen&quot;,&quot;wptheme_is_block&quot;:&quot;0&quot;}" data-provider="wordpress.com" data-service="simple"  src="/wp-content/js/bilmur.min.js?i=11&m=202412"></script><script>
if ( 'object' === typeof wpcom_mobile_user_agent_info ) {

	wpcom_mobile_user_agent_info.init();
	var mobileStatsQueryString = "";
	
	if( false !== wpcom_mobile_user_agent_info.matchedPlatformName )
		mobileStatsQueryString += "&x_" + 'mobile_platforms' + '=' + wpcom_mobile_user_agent_info.matchedPlatformName;
	
	if( false !== wpcom_mobile_user_agent_info.matchedUserAgentName )
		mobileStatsQueryString += "&x_" + 'mobile_devices' + '=' + wpcom_mobile_user_agent_info.matchedUserAgentName;
	
	if( wpcom_mobile_user_agent_info.isIPad() )
		mobileStatsQueryString += "&x_" + 'ipad_views' + '=' + 'views';

	if( "" != mobileStatsQueryString ) {
		new Image().src = document.location.protocol + '//pixel.wp.com/g.gif?v=wpcom-no-pv' + mobileStatsQueryString + '&baba=' + Math.random();
	}
	
}
</script>
</body>
</html>

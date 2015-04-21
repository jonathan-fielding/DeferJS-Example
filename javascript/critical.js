var criticalJavaScript = (function(){
	var appendMainJS = function() {
		//For example we simulate the loading of site before we get our deferred JS
		setTimeout(function(){
			var element = document.createElement('script');
			element.src = '/javascript/main.js';
			document.body.appendChild(element);
		}, 5000);
	};

	var deferLoadingMainJS = function() {
		window.addEventListener('load', appendMainJS, false);
	};

	function preregisterBehaviours() {
		var behaviourElements = document.querySelectorAll('[data-behaviour]'),
			el = null,
			eventsToDefer = null;

		for (var i = 0; i < behaviourElements.length; i++) {
			el = behaviourElements[i];

			eventsToDefer = el.getAttribute('data-deferred-events');

			if (eventsToDefer.length) {
				eventsToDefer = eventsToDefer.split(' ');

				for (var j = 0; j < eventsToDefer.length; j++) {
					deferEvent(el, eventsToDefer[i]);
				}
			}
		}
	}

	function deferEvent(el, event) {
		switch (event) {
			case 'click':
				el.addEventListener('click', handleDeferredClick);
				break;
			default:
				console.log('unsupported event added')
		}
	}

	function handleDeferredClick() {
		var triggeredEvents = this.getAttribute('data-triggered-events');
		var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(" ") : [];

		if (triggeredEventsArray.indexOf('click') === -1	) {
			triggeredEventsArray.push('click')
		}

		this.setAttribute('data-triggered-events', triggeredEventsArray.join(" "));

		if(this.getAttribute('data-prevent-default') === "true") {
			event.preventDefault();
		}
	}

	return {
		init: function() {
			preregisterBehaviours();
			deferLoadingMainJS();
		},
		removeDeferredClick: function(el) {
			el.removeEventListener('click', handleDeferredClick);
		}
	};
})();


document.addEventListener('DOMContentLoaded', criticalJavaScript.init);
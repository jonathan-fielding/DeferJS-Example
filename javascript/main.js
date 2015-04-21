var mainJavaScript = (function() {

    function registerBehaviour(behaviourName, registerMethod) {
        var behaviourElements = document.querySelectorAll('[data-behaviour="' + behaviourName + '"]'),
            el = null,
            eventsToDefer = null;

        for (var i = 0; i < behaviourElements.length; i++) {
            registerMethod.bind(behaviourElements[i])();
        }
    }

    function registerClick(el, callback) {
        var triggeredEvents = el.getAttribute('data-triggered-events');
        var triggeredEventsArray = triggeredEvents ? triggeredEvents.split(" ") : [];

        if (triggeredEventsArray.indexOf('click') !== -1) {
            triggeredEventsArray.splice(triggeredEventsArray.indexOf('click'), 1);
            el.setAttribute('data-triggered-events', triggeredEventsArray.join(" "));
            callback();
        }

        //We remove the event listener as we are about to attach the real one
        criticalJavaScript.removeDeferredClick(el);

        el.addEventListener('click', callback);
    }

    return {
        init: function() {
            registerBehaviour('button-click', function(){
                registerClick(this, function(){
                    alert('test');
                });
            });
        }
    };
})();

mainJavaScript.init();
(function(window, document) {
    // Configuration
    var config = {
        customerId: null,
        widgetUrl: 'https://yourservice.com/widget.js'
    };

    // Loader function
    function loadWidget() {
        var script = document.createElement('script');
        script.async = true;
        script.src = config.widgetUrl;
        script.onload = function() {
            if (typeof YourChatWidget !== 'undefined') {
                YourChatWidget.init(config.customerId);
            }
        };
        document.body.appendChild(script);
    }

    // Initialize
    window.YourChatWidgetLoader = {
        init: function(customerId) {
            config.customerId = customerId;
            if (document.readyState === 'complete') {
                loadWidget();
            } else {
                window.addEventListener('load', loadWidget);
            }
        }
    };
})(window, document);

// Auto-initialize if the script is called with a data-customer-id attribute
(function() {
    var scripts = document.getElementsByTagName('script');
    var thisScript = scripts[scripts.length - 1];
    var customerId = thisScript.getAttribute('data-customer-id');
    if (customerId) {
        window.YourChatWidgetLoader.init(customerId);
    }
})();
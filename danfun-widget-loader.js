/**
 * Danfun Chat Widget Loader (TEST)
 * Dynamically adapts to device size
 * Points at the test sandbox deployment, not production.
 */

(function() {
    'use strict';

    // Prevent multiple initializations
    if (window.DanfunWidgetLoaded) return;
    window.DanfunWidgetLoaded = true;

    // Configuration
    var WIDGET_URL = 'https://danfuntestwidget.vercel.app/';

    // Create and inject styles
    var style = document.createElement('style');
    style.textContent = [
        '#danfun-chat-widget-iframe {',
        '    position: fixed !important;',
        '    bottom: 0 !important;',
        '    right: 0 !important;',
        '    border: none !important;',
        '    z-index: 2147483647 !important;',
        '    background: transparent !important;',
        '    color-scheme: normal !important;',
        '    /* Closed state - room for button + popup */',
        '    width: 280px !important;',
        '    height: 200px !important;',
        '}',
        '',
        '/* When widget is open - Desktop */',
        '@media (min-width: 769px) {',
        '    #danfun-chat-widget-iframe.danfun-open {',
        '        bottom: 20px !important;',
        '        right: 20px !important;',
        '        width: 420px !important;',
        '        height: 680px !important;',
        '        border-radius: 20px !important;',
        '        overflow: hidden !important;',
        '        box-shadow: 0 20px 50px rgba(0, 102, 204, 0.25) !important;',
        '    }',
        '}',
        '',
        '/* When widget is open - Tablet */',
        '@media (min-width: 481px) and (max-width: 768px) {',
        '    #danfun-chat-widget-iframe.danfun-open {',
        '        bottom: 20px !important;',
        '        right: 20px !important;',
        '        width: 380px !important;',
        '        height: 600px !important;',
        '        border-radius: 20px !important;',
        '        overflow: hidden !important;',
        '        box-shadow: 0 20px 50px rgba(0, 102, 204, 0.25) !important;',
        '    }',
        '}',
        '',
        '/* Mobile */',
        '@media (max-width: 480px) {',
        '    #danfun-chat-widget-iframe {',
        '        width: 100% !important;',
        '        height: 180px !important;',
        '        right: 0 !important;',
        '    }',
        '    #danfun-chat-widget-iframe.danfun-open {',
        '        top: 12px !important;',
        '        left: 12px !important;',
        '        right: 12px !important;',
        '        bottom: 12px !important;',
        '        width: calc(100vw - 24px) !important;',
        '        height: calc(100vh - 24px) !important;',
        '        height: calc(100dvh - 24px) !important;',
        '        border-radius: 20px !important;',
        '        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;',
        '    }',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.id = 'danfun-chat-widget-iframe';
    iframe.src = WIDGET_URL;
    iframe.allow = 'clipboard-write';
    iframe.setAttribute('title', 'Danfun Chat Widget (TEST)');
    iframe.setAttribute('loading', 'lazy');

    // Listen for messages from the widget
    window.addEventListener('message', function(event) {
        // Verify origin for security
        if (event.origin !== 'https://danfuntestwidget.vercel.app') return;
        
        if (event.data === 'danfun-widget-open') {
            iframe.classList.add('danfun-open');
        } else if (event.data === 'danfun-widget-close') {
            iframe.classList.remove('danfun-open');
        }
    });

    // Inject iframe when DOM is ready
    function injectWidget() {
        if (document.body) {
            document.body.appendChild(iframe);
        } else {
            setTimeout(injectWidget, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }

})();

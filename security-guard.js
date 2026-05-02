// ==========================================
// WEB SECURITY GUARD v1.0
// Frontend Security Protection System
// ==========================================

(function() {

    // 1. Block Console Hijacking
    function blockConsoleHijacking() {
        if (window.console) {
            const originalConsole = {};
            const methods = ['log', 'warn', 'error', 'info', 'debug'];
            
            methods.forEach(function(method) {
                if (window.console[method]) {
                    originalConsole[method] = window.console[method];
                    window.console[method] = function() {
                        var args = Array.prototype.slice.call(arguments);
                        var message = args.join(' ');
                        
                        if (message.toLowerCase().includes('evil') || 
                            message.toLowerCase().includes('hack') || 
                            message.toLowerCase().includes('exploit')) {
                            return;
                        }
                        
                        originalConsole[method].apply(window.console, args);
                    };
                }
            });
        }
    }

    // 2. XSS Protection - Input Sanitization
    function sanitizeInput(input) {
        if (!input) return '';
        var element = document.createElement('div');
        element.textContent = input;
        return element.innerHTML;
    }

    // 3. DOM Mutation Observer - Remove malicious elements
    function protectFromXSS() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        
                        if (node.nodeType === 1) {
                            // Remove script and iframe tags
                            if (node.tagName === 'SCRIPT' || node.tagName === 'IFRAME' || node.tagName === 'EMBED' || node.tagName === 'OBJECT') {
                                node.remove();
                                console.warn('Malicious element removed: ' + node.tagName);
                            }
                            
                            // Remove dangerous attributes
                            var dangerousAttrs = ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onchange', 'onmouseout', 'onkeydown', 'onkeyup', 'onkeypress'];
                            for (var j = 0; j < dangerousAttrs.length; j++) {
                                var attr = dangerousAttrs[j];
                                if (node.hasAttribute && node.hasAttribute(attr)) {
                                    node.removeAttribute(attr);
                                }
                            }
                        }
                    }
                }
            });
        });
        
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            window.addEventListener('DOMContentLoaded', function() {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
    }

    // 4. Clickjacking Protection
    function preventClickjacking() {
        if (window.self !== window.top) {
            window.top.location = window.self.location;
        }
    }

    // 5. Content Protection (Copy & Context Menu)
    function protectContent() {
        document.addEventListener('contextmenu', function(e) {
            var target = e.target;
            var sensitiveElements = document.querySelectorAll('.sensitive-data, .protected-content');
            
            for (var i = 0; i < sensitiveElements.length; i++) {
                if (sensitiveElements[i].contains(target)) {
                    e.preventDefault();
                    alert('Copying from this area is not allowed.');
                    return;
                }
            }
        });
        
        document.addEventListener('copy', function(e) {
            var selection = window.getSelection().toString();
            var sensitiveKeywords = ['CONFIDENTIAL', 'Security Code', 'X9K-42M-7WQ', 'password', 'secret'];
            
            for (var i = 0; i < sensitiveKeywords.length; i++) {
                if (selection.includes(sensitiveKeywords[i])) {
                    e.preventDefault();
                    alert('Copying sensitive information is prohibited.');
                    return;
                }
            }
        });
    }

    // 6. External Link Validation (Anti-Phishing)
    function validateExternalLinks() {
        var allowedDomains = [
            'google.com',
            'github.com',
            'stackoverflow.com',
            'mozilla.org',
            'w3.org',
            'localhost',
            '127.0.0.1'
        ];
        
        var allLinks = document.querySelectorAll('a[href^="http"]');
        
        for (var i = 0; i < allLinks.length; i++) {
            var link = allLinks[i];
            var isAllowed = false;
            
            for (var j = 0; j < allowedDomains.length; j++) {
                if (link.href.indexOf(allowedDomains[j]) !== -1) {
                    isAllowed = true;
                    break;
                }
            }
            
            if (!isAllowed && !link.hasAttribute('data-verified')) {
                link.addEventListener('click', function(e) {
                    var userConfirmed = confirm('Are you sure you want to open this link?\n' + this.href);
                    if (!userConfirmed) {
                        e.preventDefault();
                    }
                });
                link.setAttribute('data-verified', 'true');
            }
        }
    }

    // 7. Block Developer Tools
    function blockDevTools() {
        document.addEventListener('keydown', function(e) {
            var isF12 = (e.key === 'F12');
            var isInspector = (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'));
            var isConsole = (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j'));
            var isElementPicker = (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'));
            var isViewSource = (e.ctrlKey && (e.key === 'u' || e.key === 'U'));
            
            if (isF12 || isInspector || isConsole || isElementPicker || isViewSource) {
                e.preventDefault();
                alert('Developer tools are disabled on this site.');
            }
        });
        
        // Detect dev tools opening via size detection
        setInterval(function() {
            var widthDifference = window.outerWidth - window.innerWidth;
            var heightDifference = window.outerHeight - window.innerHeight;
            
            if (widthDifference > 200 || heightDifference > 200) {
                alert('Please close developer tools to continue.');
                window.close();
            }
        }, 2000);
    }

    // 8. Monitor DOM Changes (Title, etc.)
    function monitorDomChanges() {
        var originalTitle = document.title;
        
        setInterval(function() {
            if (document.title !== originalTitle && 
                (document.title.toLowerCase().includes('hack') || 
                 document.title.toLowerCase().includes('exploit') ||
                 document.title.toLowerCase().includes('virus'))) {
                document.title = originalTitle;
                console.warn('Unauthorized title change has been blocked.');
            }
        }, 1000);
    }

    // 9. Add Basic CSP Header
    function addCSPHeader() {
        var meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";
        document.head.appendChild(meta);
    }

    // 10. Initialize all security features
    function initSecurity() {
        preventClickjacking();
        blockConsoleHijacking();
        addCSPHeader();
        
        if (document.body) {
            protectFromXSS();
            protectContent();
            monitorDomChanges();
        } else {
            window.addEventListener('DOMContentLoaded', function() {
                protectFromXSS();
                protectContent();
                monitorDomChanges();
            });
        }
        
        window.addEventListener('DOMContentLoaded', function() {
            validateExternalLinks();
            setInterval(validateExternalLinks, 3000);
        });
        
        blockDevTools();
    }
    
    // Start security system
    initSecurity();
    
    console.log('Web Security Guard has been activated successfully.');
})();

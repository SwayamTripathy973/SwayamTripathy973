/*! HTMLInclude v1.1.1 | MIT License | github.com/paul-browne/HTMLInclude */
!function(w, d) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function isInViewport(element, offset) {
                return element.getBoundingClientRect().top <= (+offset + w.innerHeight);
            }
            function ajax(url, elements) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        elements.forEach(function(element) {
                            var dataReplace = element.getAttribute("data-replace");
                            var z = xhr.responseText;
                            if (dataReplace) {
                                dataReplace.split(",").forEach(function(el) {
                                    var o = el.trim().split(":");
                                    z = z.replace(new RegExp(o[0], "g"), o[1]);
                                });
                            }
                            element.outerHTML = z;
                            var scripts = new DOMParser().parseFromString(z, 'text/html').querySelectorAll("SCRIPT");
                            scripts.forEach(function(script) {
                                var clone = d.createElement("SCRIPT");
                                clone.text = script.innerHTML;
                                script.getAttributeNames().forEach(function(attr) {
                                    clone.setAttribute(attr, script.getAttribute(attr));
                                });
                                d.head.appendChild(clone);
                                script.remove(clone);
                            });
                        });
                    }
                }
                xhr.open("GET", url, true);
                xhr.send();
            }
            function lazyLoad(element, offset) {
                w.addEventListener("scroll", function scrollFunc() {
                    if (isInViewport(element, offset)) {
                        w.removeEventListener("scroll", scrollFunc);
                        ajax(element.getAttribute("data-include"), [element]);
                    }
                });
            }
            var elements = d.querySelectorAll("[data-include]");
            elements.forEach(function(element) {
                var offset = element.getAttribute("data-offset");
                if (offset && !isInViewport(element, offset)) {
                    lazyLoad(element, offset);
                } else {
                    ajax(element.getAttribute("data-include"), [element]);
                }
            });
        }
    }
    if (d.readyState === "complete" || d.readyState === "interactive") {
        w.HTMLInclude();
    } else {
        d.addEventListener("DOMContentLoaded", w.HTMLInclude);
    }
}(window, document);

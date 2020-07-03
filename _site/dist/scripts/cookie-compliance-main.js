'use strict';

var GDPR = GDPR || {};

GDPR.clientCustom = function () {
    'use strict';

    var _selectors = {
        module: 'button.navbar-toggle.collapsed',
        navBar: 'MainNavSidebar',
        manageBtn: 'gdpr-manage-cookies',
        allowBtn: 'gdpr-allow-all'
    };

    var _classes = {
        active: 'is-active'
    };

    var mobileNav = void 0;
    var customPush = void 0;
    var navBar = void 0;

    var _initButtonEvent = function _initButtonEvent() {
        var manageBtn = document.getElementsByClassName(_selectors.manageBtn)[0];
        var allowBtn = document.getElementById(_selectors.allowBtn);

        mobileNav.addEventListener('click', _setNavHeight);
        manageBtn.addEventListener('click', _closeNavBar);
        allowBtn.addEventListener('click', _setNavHeight);
    };

    var _setNavHeight = function _setNavHeight() {
        if (!customPush) {
            customPush = document.getElementsByClassName('header-push');
            navBar = document.getElementsByClassName(_selectors.navBar);
        }

        if (customPush.length && navBar.length) {
            navBar[0].style.top = customPush[0].style.height;
        }
    };

    var _closeNavBar = function _closeNavBar() {
        if (mobileNav.classList.contains(_classes.active)) {
            mobileNav.click();
        }
    };

    var init = function init() {
        mobileNav = document.querySelector(_selectors.module);
        if (!mobileNav) {
            return;
        }

        _initButtonEvent();
    };

    return {
        init: init
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.accordion = function () {
    'use strict';

    var selectors = {
        module: 'gdpr-accordion'
    };

    var state = {
        openAccordions: []
    };

    var classes = {
        open: 'gdpr-accordion--is-open'
    };

    var accordions = [];

    var _initAccordions = function _initAccordions() {
        var _loop = function _loop(i, len) {
            var id = 'gdprAccordion-' + i;

            accordions[i].id = id;
            accordions[i].firstElementChild.addEventListener('click', function () {
                _handleClick(accordions[i]);
            });
        };

        // Set IDs against each gdpr-accordion
        for (var i = 0, len = accordions.length; i < len; i++) {
            _loop(i, len);
        }
    };

    var _openFirstAccordion = function _openFirstAccordion() {
        if (state.openAccordions.length === 0) {
            _openAccordion(accordions[0]);
        }
    };

    var _handleClick = function _handleClick(accordion) {
        var index = state.openAccordions.indexOf(accordion.id);

        if (index === -1) {
            closeCurrentAccordion();

            _openAccordion(accordion);
        } else {
            _closeAccordion(accordion, index);
        }
    };

    var _openAccordion = function _openAccordion(accordion) {
        state.openAccordions.push(accordion.id);

        accordion.classList.add(classes.open);
    };

    var _closeAccordion = function _closeAccordion(accordion, index) {
        // If index is passed in, remove that id from state else reset
        if (typeof index !== 'undefined') {
            state.openAccordions.splice(index, 1);
        } else {
            state.openAccordions = [];
        }

        accordion.classList.remove(classes.open);
    };

    var init = function init() {
        accordions = document.getElementsByClassName(selectors.module);
        if (accordions.length === 0) {
            return;
        }

        _initAccordions();
        _openFirstAccordion();
    };

    var closeCurrentAccordion = function closeCurrentAccordion() {
        if (state.openAccordions.length > 0) {
            var previousAccordion = document.getElementById(state.openAccordions[0]);
            _closeAccordion(previousAccordion);
        }
    };

    var openAccordion = function openAccordion(id) {
        if (id) {
            var accordion = document.getElementById(id);
            _openAccordion(accordion);
        } else {
            _openFirstAccordion();
        }
    };

    return {
        init: init,
        closeCurrentAccordion: closeCurrentAccordion,
        openAccordion: openAccordion
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.api = function () {
    'use strict';

    var state = {
        endpoint: '',
        initialised: false
    };

    var _init = function _init() {
        var endpoint = '';
        if (!window.location.origin) {
            // Some browsers (mainly IE) does not have this property, so we need to build it manually...
            endpoint = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            endpoint = window.location.origin;
        }

        state.endpoint = endpoint + '/accessapi/cookiecompliance';
        state.initialised = true;
    };

    var update = function update(options, callback) {
        if (!state.initialised) {
            _init();
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', state.endpoint + '/set');
        xhr.setRequestHeader('Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.send(JSON.stringify(options));

        xhr.onload = function (xhrResponse) {
            var resp = xhrResponse.target;
            if (resp.status === 200) {
                return callback();
            } else {
                return callback(new Error('Server responded with: ' + resp.status + ' - ' + resp.statusText + '.'));
            }
        };
    };

    return {
        update: update
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.gdprBanner = function () {
    'use strict';

    var _selectors = {
        module: 'gdpr-banner',
        manageBtn: 'gdpr-manage-cookies',
        allowAllBtn: 'gdpr-allow-all',
        closeBtn: 'gdpr-close',
        applyBtn: 'gdpr-apply',
        continueBtn: 'gdpr-continue',
        accordions: 'gdpr-accordion',
        radioInputs: 'gdpr-radio',
        headIcon: 'gdpr-cookies__icon',
        push: 'gdpr-push',
        absolute: 'gdpr-absolute-wrapper',
        mobileMenu: '.js-mobile-menu',
        tabletMenu: '.js-tablet-menu'
    };

    var _classes = {
        open: 'gdpr-banner--show-content',
        modalOpen: 'gdpr-banner-open',
        hideBanner: 'gdpr-banner--hide-head',
        tick: 'icon-gdpr-tick',
        cross: 'icon-gdpr-cross',
        animate: 'gdpr-cookies__icon-animate',
        animateUp: 'gdpr-cookies__icon-animate-up',
        animateDown: 'gdpr-cookies__icon-animate-down'
    };

    var gdprBanner = void 0;
    var gdprPush = void 0;
    var accordions = void 0;

    var _setPushHeight = function _setPushHeight() {
        if (document.getElementsByClassName(_selectors.absolute).length) {
            _setCustomHeight(true);
        } else {
            gdprPush.style.height = gdprBanner.getBoundingClientRect().height + 'px';
            if (document.querySelector(_selectors.mobileMenu)) {
                document.querySelector(_selectors.mobileMenu).style.top = gdprBanner.getBoundingClientRect().height + 60 + 'px';
            }
            if (document.querySelector(_selectors.tabletMenu)) {
                document.querySelector(_selectors.tabletMenu).style.top = gdprBanner.getBoundingClientRect().height + 'px';
            }
        }
    };

    var _setCustomHeight = function _setCustomHeight(calcWholeBanner) {
        var customPush = document.getElementsByClassName('header-push');

        if (customPush.length) {
            var banner = document.getElementsByClassName(_selectors.absolute);
            var header = document.querySelector('header.header');
            var height = header ? header.getBoundingClientRect().height : 0;

            if (calcWholeBanner) {
                height += banner[0].getBoundingClientRect().height;
            } else {
                if (window.innerWidth <= 768) {
                    height = banner[0].lastElementChild.getBoundingClientRect().height;
                } else {
                    height += banner[0].lastElementChild.getBoundingClientRect().height;
                }
            }

            customPush[0].style.height = height + 'px';
        }
    };

    var _initButtonListeners = function _initButtonListeners() {
        var manageCookies = document.getElementsByClassName(_selectors.manageBtn);
        var allowAll = document.getElementById(_selectors.allowAllBtn);
        var closeCookies = document.getElementById(_selectors.closeBtn);
        var applyCookies = document.getElementById(_selectors.applyBtn);
        var continueBtn = document.getElementById(_selectors.continueBtn);

        for (var i = 0, len = manageCookies.length; i < len; i++) {
            manageCookies[i].addEventListener('click', openCookies);
        }

        closeCookies.addEventListener('click', function () {
            gdprBanner.classList.remove(_classes.open);
            document.body.classList.remove(_classes.modalOpen);
        });

        continueBtn.addEventListener('click', function () {
            _openNextAccordion(0);
        });

        allowAll.addEventListener('click', function () {
            _updatePreferences();
            _setCookiePreferences(true);
        });

        applyCookies.addEventListener('click', function () {
            _setCookiePreferences(false);
            document.body.classList.remove(_classes.modalOpen);
        });
    };

    var _initRadioListeners = function _initRadioListeners() {
        accordions = document.getElementsByClassName(_selectors.accordions);

        var _loop = function _loop(i, len) {
            var radios = accordions[i].getElementsByClassName(_selectors.radioInputs);
            var headIcon = accordions[i].getElementsByClassName(_selectors.headIcon)[0];

            for (var j = 0, length = radios.length; j < length; j++) {
                radios[j].addEventListener('change', function () {
                    var _this = this;

                    headIcon.classList.add(_classes.animate);
                    headIcon.classList.add(_classes.animateUp);

                    setTimeout(function () {
                        headIcon.classList.remove(_classes.animate);
                        headIcon.classList.remove(_classes.animateUp);
                        headIcon.classList.add(_classes.animateDown);
                    }, 250);

                    setTimeout(function () {
                        headIcon.classList.add(_classes.animate);

                        switch (_this.value) {
                            case 'true':
                                headIcon.classList.remove(_classes.cross);
                                headIcon.classList.add(_classes.tick);
                                break;
                            case 'false':
                                headIcon.classList.remove(_classes.tick);
                                headIcon.classList.add(_classes.cross);
                                break;
                        }
                    }, 275);

                    setTimeout(function () {
                        headIcon.classList.remove(_classes.animateDown);
                    }, 300);

                    _openNextAccordion(i);
                });
            }
        };

        for (var i = 0, len = accordions.length; i < len; i++) {
            _loop(i, len);
        }
    };

    var _openNextAccordion = function _openNextAccordion(currentIndex) {
        if (currentIndex + 1 < accordions.length) {
            GDPR.accordion.closeCurrentAccordion();
            GDPR.accordion.openAccordion(accordions[currentIndex + 1].id);
        }
    };

    var _setCookiePreferences = function _setCookiePreferences(isAcceptAll) {
        var options = _getPreferences(isAcceptAll);
        var gaValues = '';
        for (var i = 0, len = options.length; i < len; i++) {
            gaValues += i === 0 ? '' + options[i].gaValue : ' | ' + options[i].gaValue;
        }

        var callback = function callback(error) {
            if (error) {
                console.info('Error: ' + error.message);
            } else {
                gdprBanner.classList.remove(_classes.open);
                gdprBanner.classList.add(_classes.hideBanner);
                gdprPush.style.height = 0;
            }
        };

        GDPR.api.update(options, callback);
        _sendGAEvent(gaValues);

        // Custom for DD to reset the height of the push element on acceptance of cookies
        //_setCustomHeight(false);
    };

    var _getPreferences = function _getPreferences(isAcceptAll) {
        var options = [];

        for (var i = 0, len = accordions.length; i < len; i++) {
            var guid = accordions[i].getAttribute('data-gdpr-guid');
            var title = accordions[i].querySelector('.gdpr-accordion__head>h3').innerHTML.trim();
            var cookieValue = accordions[i].querySelector('input[type="radio"]:checked');
            var selection = isAcceptAll ? true : i === 0 ? true : cookieValue && cookieValue.value === 'true';

            if (guid) {
                options.push({
                    groupId: guid,
                    selection: selection,
                    gaValue: title + '=' + (selection ? 'Allow' : 'Disallow')
                });
            }
        }

        return options;
    };

    var _updatePreferences = function _updatePreferences() {
        for (var i = 0, len = accordions.length; i < len; i++) {
            var allowButton = accordions[i].querySelector('input[type="radio"][value="true"]');

            if (allowButton) {
                allowButton.checked = true;
            }
        }
    };

    var _sendGAEvent = function _sendGAEvent(gaValues) {
        if (typeof dataLayer === 'undefined') {
            console.info('Error: dataLayer object not found on the page. Cannot push Google event to analytics.');
        } else {
            dataLayer.push({
                event: 'GAEvent',
                eventCategory: 'Cookie managment',
                eventAction: 'Settings',
                eventLabel: gaValues
            });
        }
    };

    var init = function init() {
        gdprBanner = document.getElementsByClassName(_selectors.module);
        if (gdprBanner.length === 0) {
            return false;
        }

        gdprBanner = gdprBanner[0];
        gdprPush = document.getElementsByClassName(_selectors.push)[0];

        _setPushHeight();
        _initButtonListeners();
        _initRadioListeners();
    };

    var openCookies = function openCookies() {
        gdprBanner.classList.add(_classes.open);
        document.body.classList.add(_classes.modalOpen);
    };

    return {
        init: init,
        openCookies: openCookies
    };
}();
'use strict';

var GDPR = GDPR || {};

GDPR.app = function () {
    'use strict';

    var init = function init() {
        if (document.getElementsByClassName('experience-editor').length === 0 && GDPR !== null || GDPR === undefined) {
            GDPR.gdprBanner.init();
            GDPR.accordion.init();
            GDPR.clientCustom.init();
        }
    };

    return {
        init: init
    };
}();

if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    GDPR.app.init();
} else {
    document.addEventListener('DOMContentLoaded', GDPR.app.init, { once: true });
}
//# sourceMappingURL=cookie-compliance-main.js.map

require('./src/globalStyles/prism.css');

const Cookies = require('js-cookie');

exports.onRouteUpdate = ({ location, prevLocation }) => {
    if (location && location.state) location.state.referrer = prevLocation ? prevLocation.pathname : null;

    if (location && typeof window !== 'undefined') {
        const { hash } = location;
        const selector = hash ? hash.substr(1) : null;

        // Scroll asynchronously to make sure all sections are rendered after splash screen
        setTimeout(() => {
            // Don't invoke scrollIntoView if scroll is already happening
            if (window.scrollY !== 0) return;

            const validElement = selector ? document.getElementById(selector) : null;
            if (hash && !!validElement) validElement.scrollIntoView({ behavior: 'smooth' });
        }, 750);
    }
};

exports.onClientEntry = (_, options) => {
    if (options.googleAnalytics) {
        Cookies.set('portfolio-minimal-ga-configured', true, { expires: 365 });
    } else {
        Cookies.remove('portfolio-minimal-ga-configured');
    }
};

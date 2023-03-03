require('./src/globalStyles/prism.css');

exports.onRouteUpdate = ({ location, prevLocation }) => {
    if (location && location.state) location.state.referrer = prevLocation ? prevLocation.pathname : null;
};

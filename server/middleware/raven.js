const Raven = require("raven");
Raven.config(`https://${process.env.SENTRY_KEY}@sentry.io/${process.env.SENTRY_APP}`).install();

 module.exports = function () {
     return function raven(err, req, res, next) {
        if(err) {
            console.log(`Raven reached: ${err}`);
            console.log(`sending to ${process.env.SENTRY_URI}`)
            Raven.captureException(err);
        }
        next();
     }
 }
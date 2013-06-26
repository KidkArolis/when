/** @license MIT License (c) copyright 2011-2013 original author or authors */

/**
 * delay.js
 *
 * Helper that returns a promise that resolves after a delay.
 *
 * @author Brian Cavalier
 * @author John Hann
 */

(function(define) {
define(function(require) {
	var when, setTimer;

	when = require('./when');
	setTimer = require('./lib/timer').set;

    /**
     * Creates a new promise that will resolve after a msec delay.  If
	 * value is supplied, the delay will start *after* the supplied
	 * value is resolved.
     *
	 * @param {number} msec delay in milliseconds
     * @param {*|Promise?} value any promise or value after which
	 *  the delay will start
	 * @returns {Promise} promise that is equivalent to value, only delayed
	 *  by msec
     */
    return function delay(msec, value) {
		return when.promise(function(resolve, reject, notify) {
			when(value, function(val) {
				setTimer(function() {
					resolve(val);
				}, msec);
			},
			reject, notify);
		});
    };

});
})(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });



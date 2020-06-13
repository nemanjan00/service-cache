const wrapper = require("promise-cached");

const defaultOptions = {
	ttl: 30 * 1000,
	cacheUrl: process.env.CACHE_URL
};

const handlerFactory = (options) => {
	const handler = {
		get: function(that, prop) {
			if(prop.endsWith("Cached")) {
				const name = name.split("Cached");

				// Delete empty string on the end
				name.pop();

				const originalName = name.join("Cached");

				if(that[originalName] && that[originalName] instanceof Function) {
					return wrapper(originalName, that[originalName], options);
				}
			}

			return that[prop];
		}
	};

	return handler;
};

module.exports = (service, options) => {
	const newOptions = Object.assign(JSON.parse(JSON.stringify(defaultOptions)), options);

	return new Proxy(service, handlerFactory(newOptions));
};


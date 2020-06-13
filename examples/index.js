const wrapper = require("../src");

const service = wrapper({
	sleep: (message) => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(message);
			}, 1000);
		});
	}
});

const start = Date.now();

const array = Array(10).fill(true);

array.reduce((last) => last.then(() => service.sleepCached("cached")), Promise.resolve()).then(() => {
	console.log(`Cached is done after ${(Date.now() - start)/1000}s`);
});

array.reduce((last) => last.then(() => service.sleep("normal")), Promise.resolve()).then(() => {
	console.log(`Normal is done after ${(Date.now() - start)/1000}s`);
});


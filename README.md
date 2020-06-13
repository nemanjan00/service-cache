# service-cache

Proxy for caching service responses

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [Usage](#usage)
	* [Simple example](#simple-example)
	* [Full example](#full-example)

<!-- vim-markdown-toc -->

## Installation

```bash
npm install service-cache --save
```

## Usage

### Simple example

```javascript
const wrapper = require("service-cache");

const originalService = {
	something: () => {
		return doSomething();
	}
};

const service = wrapper(originalService);

// service is transparent proxy to originalService,
// unless you try to run function with Cached suffix

service.somethingCached(); // This will return response from cache,
// if function was already run

// keep in mind that if you run function multiple times before there is
// response in cache, it will be run multiple times...

// you can use queue-promised to make sure you run it just once

```

### Full example

```javascript
const wrapper = require("service-cache");

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

// Chain 10 promises that wait for 1s and then return, with cache enabled
array.reduce((last) => last.then(() => service.sleepCached("cached")), Promise.resolve()).then(() => {
	console.log(`Cached is done after ${(Date.now() - start)/1000}s`);
});

// Chain 10 promises that wait for 1s and then return, with cache disabled
array.reduce((last) => last.then(() => service.sleep("normal")), Promise.resolve()).then(() => {
	console.log(`Normal is done after ${(Date.now() - start)/1000}s`);
});
```


# ember-cli-job-state

This Ember.js addon provides a service for polling the Rails API provided by [the job_state gem](https://github.com/dmcouncil/job_state).

You can inject the service anywhere in your app. It needs one piece of information - the Resque job UUID used as a key by job_state - and it will then poll the server until the response is "error" or "success". At that point, it will invoke appropriate callbacks (provided those have been set up) and stop polling until told to start again.

You can set up the callbacks in advance, or provide the callbacks and job UUID when asking the service to start polling.

### Injection

TODO: Provide example

### Providing UUID and callbacks in advance (optional)

TODO: Provide example

### Start polling

TODO: Provide example

### Finish polling 

TODO: Provide example

# Contributing/Developing

## Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-job-state`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

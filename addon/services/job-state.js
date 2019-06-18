import { later } from '@ember/runloop';
import Service from '@ember/service';

export default Service.extend({
  // To successfully use this service, set a success callback
  // ("do this on successful completion of the job"), an error
  // callback ("do this if the job stops with an error state"),
  // and a job UUID (a string). You can set up the callbacks
  // on instantiation and then provide the job ID when starting
  // polling.
  // Then, call `.startPolling()` on the service. Polling will
  // continue until the response is "error" or "success", at
  // which point it will invoke the corresponding callback.

  // Optional: an updateCallback can update the controller with
  // data from the JobState response if such a thing exists.

  // Default values
  pollingPeriod: 1000, // Once per second

  startPolling: function(options) {
    // options can change values at polling start
    if (options.jobUuid) { this.set('jobUuid', options.jobUuid); }
    if (options.pollingPeriod) { this.set('pollingPeriod', options.pollingPeriod); }
    if (options.successCallback) { this.set('successCallback', options.successCallback); }
    if (options.errorCallback) { this.set('errorCallback', options.errorCallback); }
    if (options.updateCallback) { this.set('updateCallback', options.updateCallback); }
    this._poll();
  },

// adapted from JobState
  _poll: function() {
    let svc = this;
    later(svc, () => {
      $.ajax({
        url: '/job_state/job_states/' + svc.get('jobUuid'),
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if (data.job_state === 'success') {
            if (svc.get('successCallback')) {
              svc.get('successCallback')(data);
            }
          }
          else if (data.job_state === 'error') {
            if (svc.get('errorCallback')) {
              svc.get('errorCallback')();
            }
          }
          else {
            if (svc.get('updateCallback')) {
              svc.get('updateCallback')(data);
            }
            svc._poll();
          }
        }
      });
    }, svc.get('pollingPeriod'));
  }

});


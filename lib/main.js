'use strict';
const benchrest = require('bench-rest');
const ProgressBar = require('progress');
const Table = require('cli-table');
const EventEmitter = require('events').EventEmitter;
let emitter = new EventEmitter();

/**
 * @param {String} method Set the `method` to use
 * @param {String} uri Endpoint `uri`
 * @param {Number} concurrent `Concurrent` number of requesitions
 * @param {Number} iterations Total number of `iterations`
 * @param {Object} json Requesition content json
 */


function Endpoint(method, uri, concurrent, iterations, json = {}){
    this.method = method;
    this.uri = uri;
    this.concurrent = concurrent;
    this.iterations = iterations;
    this.json = json;
}

Endpoint.prototype.benchmark = function() {

    let flow = {
        main: [
            {   
                method: this.method,
                uri: this.uri,
                json: this.json
            }
        ]
    };

    benchrest(flow, {limit: this.concurrent, iterations: this.iterations})
    .on('error', function(error){
        try{
            emitter.emit('error', error);
        } catch (e) {}
    })
    .on('end', function (stats, errorCount) {
        console.log(stats, errorCount)
    });

    return emitter;
}

/**
 * Initialize a `EasyBench` with the given `endpoints` array and `options`
 *
 * @param {[Endpoint]} endpoints
 * @param {Object} options
 * 
 */


function BenchmarkGroup(endpoints, options = {}){
    this.endpoints = endpoints;
    this.options = options;
}

module.exports = {Endpoint, BenchmarkGroup};
let {Benchmark, Endpoint} = require('./lib/main');
let end1 = new Endpoint("GET", "http://localhost:3000/asset/1013s", 10, 10).benchmark();
// let bench = new Benchmark()
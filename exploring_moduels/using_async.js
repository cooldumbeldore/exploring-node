/**
 * Created by Administrator on 28/06/2016.
 */

var async = require('async');
var GithubApi = require('github');
var _ = require('lodash');

var github = new GithubApi({
    version: '3.0.0'
});


function paralellfuncArray() {
    var stack = [];

    var functionOne = function (callback) {
        callback(null, "First Function Result");
        //callback('ERROR', null)
    };

    var functionTwo = function (callback) {
        callback(null, "Second Function Result");
        //callback('ERROR', null)
    };

    var functionThree = function (callback) {
        callback(null, "Third Function Result");
    };

    stack.push(functionOne);
    stack.push(functionTwo);
    stack.push(functionThree);

    async.parallel(stack, function (err, result) {
        console.log(result);
    });

}

function paralellfuncObj() {
    var stack = {};
    stack.getUserName = function (callback) {
        var userName = 'Bob';
        callback(null, userName);
    };
    stack.getUserAge = function (callback) {
        var userAge = 32;
        callback(null, userAge);
    };
    stack.getUserGender = function (callback) {
        var userGneder = 'Male';
        callback(null, userGneder);
    };

    async.parallel(stack, function (err, result) {
        if (err) {
            console.err(err);
            return;
        }
        console.log(result);
    })
}

function waterfallTry() {
    async.waterfall([
        function getUserAvater(callback) {
            github.search.users({q: 'airbnb'}, function (err, res) {
                if (err) {
                    callback(err, null)
                }
                var avatarUrl = res.items[0].avatar_url;
                callback(null, avatarUrl);
            });
        },
        function wrapAvaterHtml(avatarUrl, callback) {
            var avatarWithHtml = '<img src=' + avatarUrl + '/>';
            callback(null, avatarWithHtml)
        }
    ], function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    })
}

function seriesTry() {
    async.series([
        function functionOne(callback) {
            callback(null, "First Function Result");
        },
        function functionTwo(callback) {
            callback(null, "Second Function Result");
        },
        function functionThree(callback) {
            callback(null, "Third Function Result");
        }
    ], function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    })
}

function queueTry() {
    var taskList = _.times(10, _.uniqueId.bind(null, "task_"));
    var taskQueue = async.queue(function (task, callback) {
        console.log("Performing task:", task.name);
        console.log("Wating to be processed:", taskQueue.length());
        console.log("---------------------------------------------");

        setTimeout(function () {
            callback();
        }, 1000);

    }, 1);

    taskQueue.drain = function () {
        console.log("all items have been processed");
    };

    _.each(taskList, function (task) {
        taskQueue.push({'name': task}, function (err) {
            if (err) {
                console.log(err);
            }
        })
    });

    taskQueue.unshift({'name': 'Most important task'}, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

function whilstTry() {
    var counter = 0;
    async.whilst(
        function testCondition() {
            return counter < 5;
        },
        function increaseCounter(callback) {
            counter++;
            console.log("counter is now", counter);

            setTimeout(callback, 1000);
        },
        function callback(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Job complete");
        }
    );
}

function foreverTry() {
    var targetNumber = 0;

    async.forever(
        function checkIfDone(next) {
            targetNumber++;
            if (targetNumber === 5000) {
                next('Target number reached... stopping forever');
            } else {
                console.log('Increasing targetNumber', targetNumber);
                next();
            }
        },
        function finished(err) {
            if (err) {
                console.log(err);
            }
        }
    );
}

foreverTry();




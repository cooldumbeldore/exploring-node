/**
 * Created by Administrator on 28/06/2016.
 */
var _ = require('lodash');

var arr = _.times(10,_.uniqueId.bind(null, "task_"));

console.log(arr);
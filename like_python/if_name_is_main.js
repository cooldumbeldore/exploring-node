/**
 * Created by Administrator on 28/06/2016.
 */

var main = function () {
    console.log("hello world")
};

if (require.main === module) {
    main();
}
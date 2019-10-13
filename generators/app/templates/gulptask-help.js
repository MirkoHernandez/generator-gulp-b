const gulp = require('gulp');
var usage = require('gulp-help-doc');

/**
 * Displays  the  docstring of  all  the  tasks that  have  registered
 * documentation.  Availible  tasks   without  documentation  are  not
 * listed.
 * 
 * @task {default}
 * @order {1}
 */
function help () {
    return usage(gulp);
}

gulp.task('default', help);


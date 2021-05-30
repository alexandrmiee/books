const webpack = require('webpack');

function compile(config) {
    webpack(config, function(err, stats) {

        console.log(stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true    // Shows colors in the console
        }));

        if (err) {
            console.error(err);
        }

    });
}

module.exports = {
    compile
};

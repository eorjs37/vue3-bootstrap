const path = require('path');

module.exports = {
    alias:{
        '/@/':path.resolve(__dirname, './src'),
        '/@components/':path.resolve(__dirname, './src/components'),
        '/@app_modules/':path.resolve(__dirname, './src/modules'),
    }
}
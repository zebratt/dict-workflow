/**
 * @fileOverview: cli
 * @author: xuejian.xu
 * @date: 16/6/21.
 */

const optimist = require('optimist');
const dictionary = require('./dictionary').baidu;

exports.run = ()=>{
    const args = optimist.argv._;
    const query = args[0];

    dictionary(query).then((data)=>process.stdout.write(data));
};
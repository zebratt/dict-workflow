"use strict";

/**
 * @fileOverview: Handler
 * @author: xuejian.xu
 * @date: 16/6/25.
 */

const request = require('request');
const cheerio = require('cheerio');

const icibaURL = 'http://www.iciba.com/';
const baiduURL = 'http://dict.baidu.com/s?ptype=english&wd=';

exports.iciba = (query)=>{
    const fetchHtml = new Promise((resolve)=>{
        request(icibaURL + query, (err, res, body)=>{
            resolve(body);
        });
    });

    return fetchHtml.then((data)=>{
        let $ = cheerio.load(data),
            _lis = $('.info-article .base-list li'),
            results = [];

        for(let i=0; i<_lis.length; i++){
            const item = $(_lis[i]),
                type = item.find('.prop').text().replace('\r\n', ''),
                text = item.find('p').text().replace('\r\n', '').replace(/[ \t]*/g,'');

            results.push({
                uid : 'iciba',
                subtitle : type,
                title : text,
                arg : icibaURL + query,
                icon : {
                    path: "iciba.png"
                }
            });
        }

        return JSON.stringify({items : results}, null , 4);
    });
};

exports.baidu = (query)=>{
    const fetchHtml = new Promise((resolve)=>{
        request(baiduURL + query, (err, res, body)=>{
            resolve(body);
        });
    });

    return fetchHtml.then((data)=>{
        let $ = cheerio.load(data),
            _lis = $('#simple_means-wrapper .en-content>div>p'),
            results = [];

        for(let i=0; i<_lis.length; i++){
            const item = $(_lis[i]),
                type = item.find('strong').text().replace('\r\n', ''),
                text = item.find('span').text().replace('\r\n', '').replace(/[ \t]*/g,'');

            results.push({
                uid : 'baidu',
                subtitle : type,
                title : text,
                arg : baiduURL + query,
                icon : {
                    path: "iciba.png"
                }
            });
        }

        return JSON.stringify({items : results}, null , 4);
    });
};
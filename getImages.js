// getImages.js
const request = require('request');

module.exports.getImages = (search_term) => {
    return new Promise ((resolve, reject) => {
        request({
            url: `https://pixabay.com/api/?key=10960793-fe99abbb26d81054dbbb5bbfd&q=${encodeURIComponent(search_term)}&image_type=photo`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to API.');
            }   
            else if(body.totalHits <= 0) {
                reject('request error');
            }
            else {
                let items = body.hits
                items = items.map(el => {
                    return {
                        url: el.imageURL,
                        tags: el.tags
                    }
                })
                console.log("inside of request", items)
                resolve(items);
            }
        })
    })
}
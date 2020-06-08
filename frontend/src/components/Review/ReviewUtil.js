var axios = require('axios')

export default class ReviewUtil
{
    constructor(conf)
    {
        this.reviews = [];
        this.conf = conf;
        this.rating = '';
        this.confidence = '';
        this.text = '';
    }
    
    getReviews()
    {
        axios.get('/review', {
            params: {
                conference: this.conf.fullName
            }
        })
        .catch(
            error =>
            {
                this.alert.popDanger('get reviews error');
            }
        )
        .then(res =>
        {
            if(res && res.status === 200)
            {
                this.reviews = res.data.reviews;
            }
        });
    }

    reviewsOf (submission) {
        let reviews = [];
        for (let idx in this.reviews)
        {
            let review = this.reviews[idx];
            if ((submission.conference === review.conference) &&
                (submission.author === review.author) &&
                (submission.title === review.title))
            {
                reviews.push(review);
            }
        }
        return reviews;
    }

    postReview (distribution) {
        axios.post('/review',
            {
                conference: this.conf.fullName,
                author: distribution.author,
                title: distribution.title,
                username: this.conf.user.getUserInfo().username,
                rating: this.rating,
                confidence: this.confidence,
                text: this.text
            })
        .catch(
            error =>
            {
                if (error.response.status === 403)
                {
                    this.conf.alert.popDanger('review submission error');
                }
                else
                {
                    this.conf.alert.popDanger('submission error');
                }
            }
        )
        .then(res =>
        {
            if(res && res.status === 200)
            {
                this.conf.alert.popSuccess('review submitted');
                this.conf.$router.go();
            }
        });
    }

    putReview (distribution) {
        axios.put('/review', 
            {
                conference: this.conf.fullName,
                author: distribution.author,
                title: distribution.title,
                username: this.conf.user.getUserInfo().username,
                rating: this.rating,
                confidence: this.confidence,
                text: this.text
            })
        .catch(
            error =>
            {
                if (error.response.status === 403)
                {
                    this.conf.alert.popDanger('review submission error');
                }
                else
                {
                    this.conf.alert.popDanger('submission error');
                }
            }
        )
        .then(res =>
        {
            if(res && res.status === 200)
            {
                this.conf.alert.popSuccess('review submitted');
                this.conf.$router.go();
            }
        });
    }
}
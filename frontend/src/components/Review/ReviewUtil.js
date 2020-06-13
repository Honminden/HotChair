var axios = require('axios')

export default class ReviewUtil
{
    constructor(conf)
    {
        this.reviews = [];
        this.acceptances = [];
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
        let rating = this.rating;
        if (this.conf.status === 'reviewing')
        {
            rating = 'a' + this.rating;
        }
        axios.post('/review',
            {
                conference: this.conf.fullName,
                author: distribution.author,
                title: distribution.title,
                username: this.conf.user.getUserInfo().username,
                rating: rating,
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
                setTimeout(() => {
                    this.conf.$router.go();
                }, 1500);
            }
        });
    }

    putReview (distribution) {
        let rating = this.rating;
        if (this.conf.status === 'reviewing')
        {
            rating = 'b' + this.rating;
        }
        else if (this.conf.status === 'review over')
        {
            rating = 'c' + this.rating;
        }
        axios.put('/review', 
            {
                conference: this.conf.fullName,
                author: distribution.author,
                title: distribution.title,
                username: this.conf.user.getUserInfo().username,
                rating: rating,
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
                setTimeout(() => {
                    this.conf.$router.go();
                }, 1500);
            }
        });
    }

    confirmReview (distribution) {
        this.rating = '0';
        this.confidence = '/';
        this.text = '/';
        this.putReview(distribution);
    }

    findMyReview(distribution)
    {
        let reviews = this.reviewsOf(distribution);
        let review = {rating: 'x/'};
        for (let i = 0; i < reviews.length; i++)
        {
            if (reviews[i].username === this.conf.user.getUserInfo().username)
            {
                review = reviews[i];
            }
        }

        return review;
    }

    getAcceptances()
    {
        axios.get('/acceptance', {
            params: {
                conference: this.conf.fullName
            }
        })
        .catch(
            error =>
            {
                this.alert.popDanger('get acceptances error');
            }
        )
        .then(res =>
        {
            if(res && res.status === 200)
            {
                this.acceptances = res.data.acceptances;
            }
        });
    }

    acceptanceOf(submission)
    {
        let ac = '';
        for (let idx in this.acceptances)
        {
            let acceptance = this.acceptances[idx];
            if ((submission.conference === acceptance.conference) &&
                (submission.author === acceptance.author) &&
                (submission.title === acceptance.title))
            {
                ac = acceptance.acceptance;
            }
        }
        return ac;
    }
}
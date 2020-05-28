/**
 * maintain a list of authors
 */

const emptyAuthor =
{
    fullName: '',
    organization: '',
    region: '',
    email: ''
}

export default class AuthorUtil
{
    constructor(conf)
    {
        this.authors = [];
        this.newAuthor = emptyAuthor;
        this.conf = conf;
    }

    addAuthor() 
    {
        for (let field in this.newAuthor)
        {
            if (this.newAuthor[field] === '')
            {
                return;
            }
        }
        if (this.authors.findIndex(author => (author.fullName === this.newAuthor.fullName)) === -1)
        {
            this.authors.push(Object.assign({}, this.newAuthor));
        }
        this.newAuthor = emptyAuthor;
        this.conf.validate('authors');
    }

    addSelf() 
    {
        let userInfo = this.conf.user.getUserInfo();
        this.newAuthor =
        {
            fullName: userInfo.username,
            organization: userInfo.organization,
            region: userInfo.region,
            email: userInfo.email
        };
        this.addAuthor();
    }

    removeAuthor(author) 
    {
        this.authors.splice(this.authors.indexOf(author), 1);
        this.conf.validate('authors');
    }

    moveUpAuthor(author)
    {
        let index = this.authors.indexOf(author);
        if (index > 0)
        {
            let above = this.authors[index - 1];
            this.authors[index - 1] = author;
            this.authors[index] = above;
        }
        this.conf.$forceUpdate();
    }

    moveDownAuthor(author)
    {
        let index = this.authors.indexOf(author);
        if ((index !== -1) && (index < this.authors.length - 1))
        {
            let below = this.authors[index + 1];
            this.authors[index + 1] = author;
            this.authors[index] = below;
        }
        this.conf.$forceUpdate();
    }
}
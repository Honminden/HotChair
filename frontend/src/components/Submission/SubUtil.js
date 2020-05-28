/**
 * validate, submit and update alerts
 */
import AuthorUtil from './AuthorUtil'
var axios = require('axios')

const emptyForm =
{
    title: '',
    abs: '',
    fileName: ''
}

export default class SubUtil
{
    constructor(alert, progress, topicObject, conf)
    {
        this.subForm = emptyForm;
        this.file = null;
        this.authorUtil = new AuthorUtil(conf);
        this.alert = alert;
        this.progress = progress;
        this.topicObject = topicObject;
        this.conf = conf;

        this.authors = this.authorUtil.authors;
        this.newAuthor = this.authorUtil.newAuthor;
        this.addAuthor = this.authorUtil.addAuthor;
        this.addSelf = this.authorUtil.addSelf;
        this.removeAuthor = this.authorUtil.removeAuthor;
        this.moveUpAuthor = this.authorUtil.moveUpAuthor;
        this.moveDownAuthor = this.authorUtil.moveDownAuthor;
    }

    getEmptyForm()
    {
        return emptyForm;
    }

    updateFile(event) 
    {
        let files = event.target.files;
        if (files && files[0])
        {
            this.subForm.fileName = files[0].name;
            this.file = files[0];
        }
        this.conf.validate('fileName');
    }
    
    /* post methods */
    postSubmission(util, callbacks) 
    {
        util.conf.$axios.post('/submission',
            {
                author: util.conf.user.getUserInfo().username,
                conference: util.conf.fullName,
                title: util.subForm.title,
                abs: util.subForm.abs,
                fileName: util.subForm.fileName
            })
            .catch(error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('you are not allowed to submit this paper');
                }
                else
                {
                    util.alert.popDanger('submission error');
                }
            })
            .then(res =>
            {
                if (res && res.status === 200)
                {
                    let callback = callbacks.pop();
                    callback(util, callbacks);
                }
            });
    }

    postTopic(util, callbacks) 
    {
        let topics = [];
        for (let topic in util.topicObject)
        {
            if (util.topicObject[topic])
            {
                topics.push(topic);
            }
        }
        util.conf.$axios.post('/submission-topic',
            {
                conference: util.conf.fullName,
                author: util.conf.user.getUserInfo().username,
                title: util.subForm.title,
                topics: topics
            })
            .catch(error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('invalid topics');
                }
                else
                {
                    util.alert.popDanger('topics upload error');
                }
            })
            .then(res =>
            {
                if(res && res.status === 200)
                {
                    let callback = callbacks.pop();
                    callback(util, callbacks);
                }
            });
    }

    postAuthor(util, callbacks)
    {
        let authors = [];
        for (let i = 0; i < util.authorUtil.authors.length; i++)
        {
            let author = Object.assign({}, util.authorUtil.authors[i]);
            author.order = i + 1; // start from 1
            authors.push(author);
        }
        util.conf.$axios.post('/author',
            {
                conference: util.conf.fullName,
                username: util.conf.user.getUserInfo().username,
                title: util.subForm.title,
                authors: authors
            })
            .catch(error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('invalid authors');
                }
                else
                {
                    util.alert.popDanger('authors upload error');
                }
            })
            .then(res =>
            {
                if(res && res.status === 200)
                {
                    let callback = callbacks.pop();
                    callback(util, callbacks);
                }
            });
    }

    postFile(util)
    {
        let progress = util.progress;
        progress.show = true;
        let formData = new FormData();
        formData.append('username', util.conf.user.getUserInfo().username);
        formData.append('category', 'paper');
        formData.append('directory', `${util.conf.fullName}/${util.conf.user.getUserInfo().username}/${util.subForm.title}`);
        formData.append('file', util.file);

        util.conf.$axios.post('/file', formData, 
            {
                onUploadProgress(event)
                {
                    progress.value = Math.round((event.loaded * 100) / event.total);
                }
            })
            .catch(error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('you are not allowed to upload this file');
                }
                else
                {
                    util.alert.popDanger('file upload error');
                }
            })
            .then(res =>
            {
                if(res && res.status === 200)
                {
                    util.alert.popSuccess('paper submitted');
                    setTimeout(() =>
                    {
                        util.conf.$router.replace(util.conf.confDetail.getURI('author', util.conf, 'author')); // go to author page
                    }, 1500);
                }
            });
    }

    submitPost()
    {
        for (let field of Object.keys(this.conf.triggered))
        {
            this.conf.triggered[field] = true;
        }
        if (this.conf.validate())
        {
            let callbacks = [];
            callbacks.push(this.postFile);
            callbacks.push(this.postAuthor);
            callbacks.push(this.postTopic);
            callbacks.push(this.postSubmission);
            let callback = callbacks.pop();
            callback(this, callbacks); // pass SubUtil object
        }
    }

    /* put methods */
    putSubmission(util, callbacks)
    {
        util.conf.$axios.put('/submission',
            {
                author: util.conf.user.getUserInfo().username,
                conference: util.conf.fullName,
                oldTitle: util.conf.title,
                newTitle: util.subForm.title,
                abs: util.subForm.abs,
                fileName: util.subForm.fileName
            })
            .catch(
            error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('you are not allowed to submit this paper');
                }
                else
                {
                    util.alert.popDanger('submission error');
                }
            }
            )
            .then(res =>
            {
                if (res && res.status === 200)
                {
                    let callback = callbacks.pop();
                    callback(util, callbacks);
                }
            });
    }

    putTopic(util, callbacks)
    {
        let topics = [];
        for (let topic in util.topicObject)
        {
            if (util.topicObject[topic])
            {
                topics.push(topic);
            }
        }
        util.conf.$axios.put('/submission-topic',
            {
                conference: util.conf.fullName,
                author: util.conf.user.getUserInfo().username,
                title: util.subForm.title,
                topics: topics
            })
            .catch(
                error =>
                {
                    if (error.response.status === 403)
                    {
                        util.alert.popDanger('invalid topics');
                    }
                    else
                    {
                        util.alert.popDanger('topics upload error');
                    }
                }
            )
            .then(res =>
            {
                if(res && res.status === 200)
                {
                    let callback = callbacks.pop();
                    callback(util, callbacks);
                }
            });
    }

    putAuthor(util, callbacks)
    {
        let authors = [];
        for (let i = 0; i < util.authorUtil.authors.length; i++)
        {
            let author = Object.assign({}, util.authorUtil.authors[i]);
            author.order = i + 1; // start from 1
            authors.push(author);
        }
        util.conf.$axios.put('/author',
        {
            conference: util.conf.fullName,
            username: util.conf.user.getUserInfo().username,
            title: util.subForm.title,
            authors: authors
        })
        .catch(
            error =>
            {
            if (error.response.status === 403)
            {
                util.alert.popDanger('invalid authors');
            }
            else
            {
                util.alert.popDanger('authors upload error');
            }
            }
        )
        .then(res =>
        {
            if(res && res.status === 200)
            {
                let callback = callbacks.pop();
                callback(util, callbacks);
            }
        });
    }

    putFile(util)
    {
        let progress = util.progress;
        progress.show = true;
        let formData = new FormData();
        formData.append('username', util.conf.user.getUserInfo().username);
        formData.append('category', 'paper');
        formData.append('directory', `${util.conf.fullName}/${util.conf.user.getUserInfo().username}/${util.subForm.title}`);
        formData.append('file', util.file);

        util.conf.$axios.put('/file', formData, {
            onUploadProgress (event) {
            progress.value = Math.round((event.loaded * 100) / event.total);
            }
        })
            .catch(
            error =>
            {
                if (error.response.status === 403)
                {
                    util.alert.popDanger('you are not allowed to upload this file');
                }
                else
                {
                    util.alert.popDanger('file upload error');
                }
            }
            )
            .then(res =>
            {
            if(res && res.status === 200)
            {
                util.alert.popSuccess('paper submitted');
                setTimeout(() =>
                {
                    util.conf.$router.go();
                }, 1500);
            }
            });
    }

    submitPut()
    {
        for (let field of Object.keys(this.conf.triggered))
        {
            this.conf.triggered[field] = true;
        }
        if (this.conf.validate())
        {
            let callbacks = [];
            callbacks.push(this.putFile);
            callbacks.push(this.putAuthor);
            callbacks.push(this.putTopic);
            callbacks.push(this.putSubmission);
            let callback = callbacks.pop();
            callback(this, callbacks);
        }
    }
}
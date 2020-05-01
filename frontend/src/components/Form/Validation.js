import regionData from '../../assets/data/region.json'
const regions = Object.values(regionData);

/* regular expressions */
const addReTable = username => {return {
    username: {
        char: /^([a-zA-Z_-][0-9a-zA-Z_-]*)$/,
        length: /^(.){5,32}$/
    },
    password: {
        letter: /.*[a-zA-Z]/,
        digit: /.*[0-9]/,
        special: /.*[_-]/,
        length: /^(.){6,32}$/,
        containUsername: new RegExp(`${username}`)
    },
    email: {
        format: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
}};

/**
 * @returns results of regex tests; the structure is the same as reTable
 */
const testAll = (reTable, form) =>
{
    let results = {};
    for (let field of Object.keys(reTable))
    {
        results[field] = {}
        for (let rule of Object.keys(reTable[field]))
        {
            results[field][rule] = reTable[field][rule].test(form[field])
        }
    }
    return results;
};

const compareDate = (time, submissionDDL, reviewReleaseDate) =>
{
    // expected: N < S < R < T
    let dN = new Date(); // now
    let dT = new Date(time);
    let dS = new Date(submissionDDL);
    let dR = new Date(reviewReleaseDate);
    return {
        NS: (submissionDDL === '') ? true : +dN <= +dS,
        NR: (reviewReleaseDate === '') ? true : +dN <= +dR,
        NT: (time === '') ? true : +dN <= +dT,
        SR: ((submissionDDL === '') || (reviewReleaseDate === '')) ? true : dS < dR,
        ST: ((submissionDDL === '') || (time === '')) ? true : dS < dT,
        RT: ((time === '') || (reviewReleaseDate === '')) ? true : dR < dT
    };
}

const isEmpty = value => ((!value) || (value === ''))

const testEmpty = field => (isEmpty(field)) ? {isValid: false, messages: ['Can\'t be empty.']} : {isValid: true, messages: []}

export default class Validation
{
    validateRegister(form)
    {
        let reTable = addReTable(form.username);
        let reResults = testAll(reTable, form);
        return {
            username: (field =>
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!reResults.username.char)
                    {
                        isValid = false;
                        messages.push('Can only contain letters, numbers, or two special characters (-_) and can only start with a letter or -.');
                    }
                    if (!reResults.username.length)
                    {
                        isValid = false;
                        messages.push('5-32 characters in length.');
                    }
                    return {isValid: isValid, messages: messages}
                })(form.username),
            password: (field =>
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let charValidCount = 0;
                    let messages = [];
                    if (reResults.password.letter)
                    {
                        charValidCount++;
                    }
                    if (reResults.password.digit)
                    {
                        charValidCount++;
                    }
                    if (reResults.password.special)
                    {
                        charValidCount++;
                    }

                    if (charValidCount < 2)
                    {
                        isValid = false;
                        messages.push('Letters, numbers or special characters (-_), contain at least two kinds.');
                    }
                    if (!reResults.password.length)
                    {
                        isValid = false;
                        messages.push('6-32 characters in length.');
                    }
                    if (reResults.password.containUsername)
                    {
                        isValid = false;
                        messages.push('Cannot contain username.');
                    }
                    return {isValid: isValid, messages: messages}
                })(form.password),
            fullName: testEmpty(form.fullName),
            email: (field =>
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!reResults.email.format)
                    {
                        isValid = false;
                        messages.push('Use a valid email address.');
                    }
                    return {isValid: isValid, messages: messages}
                })(form.email),
            organization: testEmpty(form.organization),
            region: (field => 
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!regions.includes(field))
                    {
                        isValid = false;
                        messages.push('Not a existing region.');
                    }
                    return {isValid: isValid, messages: messages}
                })(form.region)
        };
    }

    validateConference(form, topics)
    {
        let dateResults = compareDate(form.time, form.submissionDDL, form.reviewReleaseDate);
        return {
            fullName: testEmpty(form.fullName), 
            abbreviation: testEmpty(form.abbreviation), 
            time: (field => 
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!dateResults.NT)
                    {
                        isValid = false;
                        messages.push('Should not be earlier than today.');
                    }

                    if (!dateResults.ST)
                    {
                        isValid = false;
                        messages.push('Submission deadline should be before Date and Time.');
                    }

                    if (!dateResults.RT)
                    {
                        isValid = false;
                        messages.push('Review Release Date should be before Date and Time.');
                    }

                    return {isValid: isValid, messages: messages}
                })(form.time), 
            location: (field => 
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    return {isValid: isValid, messages: messages}
                })(form.location), 
            submissionDDL: (field => 
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!dateResults.NS)
                    {
                        isValid = false;
                        messages.push('Should not be earlier than today.');
                    }

                    if (!dateResults.ST)
                    {
                        isValid = false;
                        messages.push('Submission deadline should be before Date and Time.');
                    }

                    if (!dateResults.SR)
                    {
                        isValid = false;
                        messages.push('Submission deadline should be before Review Release Date.');
                    }

                    return {isValid: isValid, messages: messages}
                })(form.submissionDDL), 
            reviewReleaseDate: (field => 
                {
                    if (isEmpty(field))
                    {
                        return {isValid: false, messages: ['Can\'t be empty.']}
                    }

                    let isValid = true;
                    let messages = [];
                    if (!dateResults.NR)
                    {
                        isValid = false;
                        messages.push('Should not be earlier than today.');
                    }

                    if (!dateResults.SR)
                    {
                        isValid = false;
                        messages.push('Submission deadline should be before Review Release Date.');
                    }

                    if (!dateResults.RT)
                    {
                        isValid = false;
                        messages.push('Review Release Date should be before Date and Time.');
                    }

                    return {isValid: isValid, messages: messages}
                })(form.reviewReleaseDate), 
            topics: (field => 
                {
                    if (field.length < 1)
                    {
                        return {isValid: false, messages: ['Should have at least one topic.']}
                    }

                    let isValid = true;
                    let messages = [];

                    return {isValid: isValid, messages: messages}
                })(topics)
        };
    }

    validateSubmission(form, authors)
    {
        return {
            title: testEmpty(form.title), 
            abs: testEmpty(form.abs), 
            fileName: testEmpty(form.fileName),
            authors: (field => 
                {
                    if (field.length < 1)
                    {
                        return {isValid: false, messages: ['Should have at least one author.']}
                    }

                    let isValid = true;
                    let messages = [];

                    return {isValid: isValid, messages: messages}
                })(authors)
        };
    }
}
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

const isEmpty = value => ((!value) || (value === ''))

/**
 * Validation logic.
 * @param form an object with username, password etc.
 * @returns an object with information of validation
 */
export default function Validation(form)
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
        fullName: (field => 
            {
                if (isEmpty(field))
                {
                    return {isValid: false, messages: ['Can\'t be empty.']}
                }

                let isValid = true;
                let messages = [];
                return {isValid: isValid, messages: messages}
            })(form.fullName),
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
        organization: (field => 
            {
                if (isEmpty(field))
                {
                    return {isValid: false, messages: ['Can\'t be empty.']}
                }

                let isValid = true;
                let messages = [];
                return {isValid: isValid, messages: messages}
            })(form.organization),
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
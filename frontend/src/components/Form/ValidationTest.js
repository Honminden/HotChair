const reTestCases = {
    username: [
        reTestCase("sa11", {
            char: true,
            length: false
        }),
        reTestCase("adu912-1233123123131d2d2dd2d2f43f43892d2j923d9h29dd2", {
            char: true,
            length: false
        }),
        reTestCase("11ss@dxx", {
            char: false,
            length: true
        }),
        reTestCase("adaud2-da_XAA", {
            char: true,
            length: true
        }),
        reTestCase("abcdefghabcdefghabcdefghabcdefgh", {
            char: true,
            length: true
        }),
        reTestCase("a01234567012345670123456701234567", {
            char: true,
            length: false
        })
    ],
    password: [
        reTestCase("1919810", {
            letter: false,
            digit: true,
            special: false,
            length: true
        }),
        reTestCase("pulipuli514", {
            letter: true,
            digit: true,
            special: false,
            length: true
        }),
        reTestCase("-_-gachi-_-", {
            letter: true,
            digit: false,
            special: true,
            length: true
        }),
        reTestCase("142445-", {
            letter: false,
            digit: true,
            special: true,
            length: true
        }),
        reTestCase("kkdy", {
            letter: true,
            digit: false,
            special: false,
            length: false
        }),
        reTestCase("0bcdefghabcdefghabcdefghabcdefgh", {
            letter: true,
            digit: true,
            special: false,
            length: true
        }),
        reTestCase("a01234567012345670123456701234567", {
            letter: true,
            digit: true,
            special: false,
            length: false
        })
    ],
    email: [
        reTestCase("realDonaldTrump@twitter.com", {format: true}),
        reTestCase("realDonaldTrump*twitter.com", {format: false})
    ]
};

const reTest = (value, isMatched) => {return {value: value, isMatched: isMatched}};
const addReTest = re => (reTestCase => (re.test(reTestCase.value) === reTestCase.isValid));
const reTestAll = (reTable, reTestCases) => 
{
    let results = {};
    Object.keys(reTable).forEach(field =>
    {
        results[field] = {}
        Object.keys(reTable[field]).forEach(test => 
        {
            results[field][test] = reTestCases[field].map(addReTest(reTable[field][test]))
        })
    });
    return results;
}
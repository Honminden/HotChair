export default class ConfDetail
{
    encode(conf)
    {
        return {
            username: encodeURIComponent(conf.username),
            fullName: encodeURIComponent(conf.fullName),
            abbreviation: encodeURIComponent(conf.abbreviation),
            time: encodeURIComponent(conf.time),
            location: encodeURIComponent(conf.location),
            submissionDDL: encodeURIComponent(conf.submissionDDL),
            reviewReleaseDate: encodeURIComponent(conf.reviewReleaseDate),
            status: encodeURIComponent(conf.status)
        };
    }

    getPath(conf, role)
    {
        let encodedConf = this.encode(conf);
        return `detail?username=${encodedConf.username}&fullName=${encodedConf.fullName}&abbreviation=${encodedConf.abbreviation}&time=${encodedConf.time}&location=${encodedConf.location}&submissionDDL=${encodedConf.submissionDDL}&reviewReleaseDate=${encodedConf.reviewReleaseDate}&status=${encodedConf.status}&role=${role}`;
    }
}
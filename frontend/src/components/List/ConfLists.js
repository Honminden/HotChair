export default class ConfLists
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.adminConfList = [];
        this.yourConfList = [];
        this.allConfList = [];
    }

    adapt(username, isAdmin)
    {
        this.username = username;
        this.isAdmin = isAdmin;
    }

    update(confList)
    {
        this.init();

        if (this.isAdmin)
        {
            this.adminConfList = confList.filter(conf => (conf.status === "waiting"));
        }
        else
        {
            this.yourConfList = confList.filter(conf => (conf.username === this.username));
            this.allConfList = confList.filter(conf => ((conf.status === "passed") || (conf.status === "open")));
        }

        let addField = conf => 
        {
            conf.badge = this.getBadge(conf.status);
            conf.isPassed = this.isPassed(conf.status);
        };

        this.adminConfList.forEach(addField);
        this.yourConfList.forEach(addField);
        this.allConfList.forEach(addField);
    }

    isPassed(status)
    {
        return ((status === "passed") || (status === "open"));
    }

    getBadge(status)
    {
        let badge = {
            status: status,
            class: '',
            content: ''
        };

        switch (status)
        {
            case ("waiting"):
                badge.class = "badge badge-warning";
                break;
            case ("rejected"):
                badge.class = "badge badge-danger";
                break;
            case ("passed"):
                badge.class = "badge badge-info";
                badge.content = "not open";
                break;
            case ("open"):
            default:
                badge.class = "badge badge-success";
                badge.content = "open";
                break;
        }

        return badge;
    }
}
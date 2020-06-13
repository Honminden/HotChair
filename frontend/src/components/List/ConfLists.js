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
            this.allConfList = confList.filter(conf => this.isPassed(conf.status));
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
        return ((status === "passed") || (status === "open") || (status === "reviewing") || 
            (status === "review over") || (status === "final"));
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
            case ("reviewing"):
                badge.class = "badge badge-secondary";
                badge.content = "reviewing";
                break;
            case ("review over"):
                badge.class = "badge badge-primary";
                badge.content = "first review release";
                break;
            case ("final"):
                badge.class = "badge badge-dark";
                badge.content = "second review release";
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
export default class Alert
{
    constructor()
    {
        this.isVisible = false;
        this.type = '';
        this.icon = '';
        this.content = '';
    }

    pop(type, icon, message)
    {
        this.isVisible = true;
        this.type = type;
        this.icon = icon;
        this.content = message;
    }
    
    popSuccess(message)
    {
        this.pop('alert alert-success my-2', 'fa fa-check mx-2', message);
    }
    
    popWarning(message)
    {
        this.pop('alert alert-warning my-2', 'fa fa-exclamation mx-2', message);
    }
    
    popDanger(message)
    {
        this.pop('alert alert-danger my-2', 'fa fa-close mx-2', message);
    }
}
export default class Alert
{
    constructor()
    {
        this.isVisible = false;
        this.type = '';
        this.content = '';
    }

    pop(type, message)
    {
        this.isVisible = true;
        this.type = type;
        this.content = message;
    }
    
    popSuccess(message)
    {
        this.pop('alert alert-success my-2', message);
    }
    
    popWarning(message)
    {
        this.pop('alert alert-warning my-2', message);
    }
    
    popDanger(message)
    {
        this.pop('alert alert-danger my-2', message);
    }
}
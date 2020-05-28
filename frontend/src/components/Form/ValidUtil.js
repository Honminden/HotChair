import Alert from '../Message/Alert'

export default class ValidUtil
{
    validateField(triggered, validation, alerts, field)
    {
        triggered[field] = true;
        /* update validation alerts */
        for (let field of Object.keys(alerts))
        {
            if (triggered[field])
            {
                alerts[field] = [];
                if (validation[field].isValid)
                {
                    let alert = new Alert();
                    alert.popSuccess("Valid.");
                    alerts[field].push(alert);
                }
                else
                {
                    for (let message of validation[field].messages)
                    {
                        let alert = new Alert();
                        alert.popWarning(message);
                        alerts[field].push(alert);
                    }
                }
            }
        }

        return Object.values(validation).every(field => (field.isValid === true))
    }

    validateTopics(topicObject, alert)
    {
        let topics = [];
        for (let topic in topicObject)
        {
            if (topicObject[topic])
            {
                topics.push(topic);
            }
        }
        if (Object.keys(topics).length > 0)
        {
            alert.popSuccess("Valid.");
            return true;
        }
        else
        {
            alert.popWarning('Choose at least one topic.');
            return false;
        }
    }

    validateFile(file, alerts)
    {
        if (file !== null)
        {
            return true;
        }
        else 
        {
            let alert = new Alert();
            alerts['fileName'] = [];
            alerts['fileName'].push(alert);
            alert.popWarning('File cannot be empty.');
            return false;
        }
    }
}
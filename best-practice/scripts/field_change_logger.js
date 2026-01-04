// It is a best practice to create a unique namespace for your scripts
// to avoid function name conflicts with other libraries.
var PowerAdmin = window.PowerAdmin || {};

PowerAdmin.FieldChangeLogger = (function () {

    /**
     * An OnChange event handler that creates a record in a custom log entity.
     * @param {object} executionContext - The execution context passed automatically by the form event.
     */
    async function logFieldChange(executionContext) {
        try {
            const formContext = executionContext.getFormContext();
            const changedAttribute = executionContext.getEventSource();
            const attributeName = changedAttribute.getName();
            const attributeValue = changedAttribute.getValue();

            // 1. Get info about the source record being edited
            const sourceRecordId = formContext.data.entity.getId().replace(/[{}]/g, ""); // Clean the curly braces from the GUID
            const sourceEntityName = formContext.data.entity.getEntityName();

            // 2. Format the new field value into a single string for logging
            let newValueForLog = "(empty)";
            if (Array.isArray(attributeValue) && attributeValue.length > 0) {
                // Handle Lookup fields
                const lookupValue = attributeValue[0];
                newValueForLog = `ID: ${lookupValue.id}, Name: ${lookupValue.name}, Type: ${lookupValue.entityType}`;
            } else if (attributeValue !== null && attributeValue !== undefined) {
                // Handle Option Sets, Text, Numbers, etc.
                const attributeText = changedAttribute.getText ? changedAttribute.getText() : attributeValue.toString();
                newValueForLog = `${attributeText} (Raw value: ${attributeValue})`;
            }

            // 3. Construct the data object for the new log record.
            //    The keys here MUST match the logical names of the fields in your 'ams_logsfieldchange' entity.
            const logData = {
                "ams_fieldname": attributeName,
                "ams_newvalue": newValueForLog,
                "ams_sourceentity": sourceEntityName,
                "ams_sourcerecordid": sourceRecordId,
                // Set the primary name field (e.g., 'ams_name') for the log entity to something descriptive.
                "ams_name": `Change on ${attributeName} for ${sourceEntityName} record`
            };

            // 4. Use Xrm.WebApi.createRecord to create the log entry asynchronously
            const entityLogicalName = "ams_logsfieldchange";
            console.log(`Attempting to create '${entityLogicalName}' record...`); // Log for debugging

            const result = await Xrm.WebApi.createRecord(entityLogicalName, logData);
            console.log(`Successfully created log record with ID: ${result.id}`); // Log for debugging

        } catch (e) {
            console.error(`Failed to create log record: ${e.message}`); // Log error for debugging
            // Optionally, show a non-blocking error notification to the user on the form
            formContext.ui.setFormNotification(`Could not save field change log. Error: ${e.message}`, "ERROR", "FieldChangeLogError");
        }
    }

    // Expose the function publicly
    return {
        logFieldChange: logFieldChange
    };

})();
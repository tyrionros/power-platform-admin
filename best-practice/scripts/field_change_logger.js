// It is a best practice to create a unique namespace for your scripts
// to avoid function name conflicts with other libraries.
var PowerAdmin = window.PowerAdmin || {};

PowerAdmin.FieldChangeLogger = (function () {

    /**
     * A generic OnChange event handler that logs details of the changed field.
     * This function should be registered on the OnChange event of each field you want to monitor.
     * @param {object} executionContext - The execution context passed automatically by the form event.
     */
    function logFieldChange(executionContext) {
        try {
            // Get the formContext object
            const formContext = executionContext.getFormContext();

            // Get the specific attribute that triggered this event
            const changedAttribute = executionContext.getEventSource();
            const attributeName = changedAttribute.getName();
            const attributeValue = changedAttribute.getValue();

            // Log the field's name to the browser's developer console (press F12 to view)
            console.log(`Field '${attributeName}' has changed.`);

            // Check if the value is a Lookup (which is an array of objects)
            if (Array.isArray(attributeValue) && attributeValue.length > 0) {
                const lookupValue = attributeValue[0]; // Get the first item in the lookup array
                console.log(`  New Value (Lookup):`);
                console.log(`    - ID: ${lookupValue.id}`);
                console.log(`    - Name: ${lookupValue.name}`);
                console.log(`    - Entity Type: ${lookupValue.entityType}`);
            }
            // Check for Option Set or other simple types
            else if (attributeValue !== null && attributeValue !== undefined) {
                 // For Option Sets, getValue() returns the integer value.
                 // getText() returns the user-facing label.
                const attributeText = changedAttribute.getText ? changedAttribute.getText() : attributeValue.toString();
                console.log(`  New Value: ${attributeText} (Raw value: ${attributeValue})`);
            }
            else {
                // The field is empty (null or undefined)
                console.log(`  New Value: (empty)`);
            }

        } catch (e) {
            console.error("An error occurred in the logFieldChange function:", e);
        }
    }

    // Expose the function publicly so it's accessible from the form's event handler configuration
    return {
        logFieldChange: logFieldChange
    };

})();

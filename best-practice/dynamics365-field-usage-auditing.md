# How to Audit Field Usage in Dynamics 365

Determining if a field in a Dynamics 365 form is seldom used can be approached in a few ways, ranging from quick analysis to more detailed auditing. Here are the primary methods you can use, from simplest to most robust.

---

### Level 1: Quick Analysis (Check for Existing Data)

This is the fastest way to see if a field is being filled out at all. You can check how many records have a value in that field versus how many don't.

**How to do it:**

1.  **Using Advanced Find:**
    *   Go to your Dynamics 365 Field Service app.
    *   Click on the "Advanced Find" icon (looks like a funnel) in the top-right corner.
    *   In the "Look for:" dropdown, select the entity (e.g., `Work Order`).
    *   In the query builder, add a criterion: `[Your Field Name] | Does Not Contain Data`.
    *   Click "Results" to see how many records have this field empty. You can then run a second query for `[Your Field Name] | Contains Data` to see how many have it populated.
    *   Comparing these two numbers against the total record count will give you a good idea of its usage.

2.  **Via a Custom Tool (e.g., your `power-platform-admin` project):**
    You can use the **Dataverse Web API** to run the same query programmatically.
    *   **Example Endpoint:**
        ```
        GET [YourOrgApiUrl]/api/data/v9.2/crXXX_workorders?$select=crXXX_myfield&$filter=crXXX_myfield ne null
        ```
    *   You would count the returned records. This is essentially what Advanced Find does behind the scenes.

---

### Level 2: Historical Tracking (Enable Auditing)

This method tracks every time the field's value is changed, giving you a much more accurate picture of how often it's being interacted with over time. This is the recommended approach for a definitive answer.

**How to enable it:**

1.  **Enable Auditing Globally:**
    *   Go to the [Power Platform Admin Center](https://admin.powerplatform.microsoft.com/).
    *   Navigate to **Environments** > [Select Your Environment] > **Settings**.
    *   Under "Audit and logs", select **Audit settings**.
    *   Ensure "Start Auditing" is checked.

2.  **Enable Auditing on the Entity:**
    *   Go to your solution in Power Apps (`make.powerapps.com`).
    *   Find the entity (e.g., `Work Order`) and open it.
    *   In its **Properties** pane on the right, under "Advanced options", make sure **Audit changes to its data** is checked.

3.  **Enable Auditing on the Field:**
    *   Within the entity editor, go to the **Fields** section.
    *   Select the field you want to track.
    *   In its **Properties** pane, under "Advanced options", check the **Enable auditing** box.
    *   Save and publish the changes.

**How to check the logs:**

Once auditing is active, you can go to any specific record, and under the "Related" tab, you will find an **Audit History** section that shows all changes to the audited fields.

---

### Level 3: Granular Monitoring (Custom Development)

If you need to know not just when the data changes, but when users even *click into* a field, you can add custom JavaScript to the form. This is for very specific tracking needs.

**How to do it:**

1.  **Create a JavaScript Web Resource:** In your solution, create a new JavaScript file.
2.  **Write the Logging Function:** Add a function that triggers on the field's `OnChange` event. This function could log the event to a custom "logging" entity in Dataverse or an external tool like Azure Application insights.
    ```javascript
    // Example for a field's OnChange event
    function onMyFieldChange(executionContext) {
        const formContext = executionContext.getFormContext();
        const fieldValue = formContext.getAttribute("crXXX_myfield").getValue();

        // Logic to log the change event
        console.log("Field crXXX_myfield was changed to: " + fieldValue);

        // Or, create a record in a custom logging entity
        // Xrm.WebApi.createRecord(...)
    }
    ```
3.  **Attach to the Form:** Open the form editor for the entity, add your JavaScript web resource to the form libraries, and then configure the field's `OnChange` event to call your function.

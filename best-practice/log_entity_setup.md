# Setup for `ams_logsfieldchange` Entity

For the `field_change_logger.js` script to function correctly, a custom entity must be created in your Power Apps / Dynamics 365 environment to store the logs.

## Entity Requirements

1.  Go to Power Apps (`make.powerapps.com`) and open the appropriate solution.
2.  Create a new entity with the following details:
    *   **Display Name**: `Logs Field Change`
    *   **Plural Name**: `Logs Field Changes`
    *   **Logical Name**: `ams_logsfieldchange` (This must be exact)
3.  Once the entity is created, add the following columns (fields). The **Logical Name** for each column must match what is listed below, as the script is hard-coded to use them.

### Required Columns

| Display Name                        | Logical Name         | Data Type                  | Recommended Use                                     |
| ----------------------------------- | -------------------- | -------------------------- | --------------------------------------------------- |
| Name                                | `ams_name`           | Single Line of Text        | The primary field for the entity. Can be auto-named. |
| Field Name                          | `ams_fieldname`      | Single Line of Text        | Stores the logical name of the field that changed.  |
| New Value                           | `ams_newvalue`       | **Multiple Lines of Text** | To accommodate potentially long text or lookup details. |
| Source Entity                       | `ams_sourceentity`   | Single Line of Text        | Stores the logical name of the source entity (e.g., `workorder`). |
| Source Record ID                    | `ams_sourcerecordid` | Single Line of Text        | Stores the GUID of the record where the change occurred. |

4.  **Save** the entity.
5.  **Publish** all customizations in your solution.

After these steps are completed, the logging script will be able to successfully create new records in this entity.

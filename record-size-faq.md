# FAQ: Is it Possible to Get the Size of Each Record in Dataverse?

This is a common and practical question for administrators looking to manage their Dataverse storage.

## The Direct Answer

No, it is **not possible** to get the precise, all-inclusive storage size of each individual record in Dataverse through standard administration tools like the Power Platform Admin Center or the official PowerShell cmdlets.

---

## Why Isn't This a Feature?

The platform is designed to track storage at a higher, aggregated level (by table) for performance and architectural reasons.

1.  **Aggregated by Design:** Dataverse tracks storage consumption at the **table level**, not the record level. The underlying SQL database architecture is highly optimized, and a single Dataverse record can have its data spread across multiple internal physical tables. Calculating size on a per-record basis would be inefficient and slow.

2.  **Complex Storage Model:** A single logical record often consumes all three types of Dataverse storage, and these are stored in different physical locations:
    *   **Database Storage:** The record's structured data (e.g., a contact's name, email address, phone number).
    *   **File Storage (Azure Blob):** Any files attached to the record's notes or email activities.
    *   **Log Storage:** The audit history of changes made to the record.

Because these components are physically separate, there is no single "record size" metric available to administrators.

---

## The Practical Solution: A Top-Down Approach

While you can't get the size of a single record, you can still effectively find and manage the largest consumers of your storage. The recommended workflow is to start at a high level and drill down.

### Step 1: Identify the Largest Tables

Use the Power Platform Admin Center storage report to find which tables are using the most storage.
- **Navigate:** Go to **Resources > Capacity**, select your environment, and review the **Database**, **File**, and **Log** tabs.
- **Analyze:** Look for the tables at the top of the list. Often, for File storage, this will be the `Annotation` (Notes with attachments) or `Attachment` (Email attachments) table.

### Step 2: Analyze Data Within Those Tables

Once you've identified a problematic table, you can investigate the data *inside* that table to find the specific items taking up space.

#### Example: Finding Large Attachments (File Storage)

If your `Annotation` table is consuming a lot of File storage, you can find the notes with the largest attachments.

- **The Key Column:** The `Annotation` table has a `filesize` column that stores the size of the attachment in bytes.
- **How to Query:** You can use tools that allow you to query the Dataverse data, such as:
    - **Power Automate:** Create a flow that lists rows from the "Notes" table, sorts them by `filesize` descending, and exports the result.
    - **XrmToolBox:** A popular community tool with a plugin called **FetchXML Builder** that allows you to build and run queries against your data. You can write a query to retrieve all notes, ordering them by `filesize` to see the largest ones first.

### Summary

| Your Goal                                       | The Recommended Action                                                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Get the size of a specific, single record.      | **Not Possible.**                                                                                                       |
| Find what is consuming the most storage.        | 1.  Check the **PPAC storage report** to find the largest **tables**.                                                     |
|                                                 | 2.  **Query the data** within those tables to find the largest items (e.g., sort notes by `filesize`).                  |

This top-down approach allows you to effectively manage your storage by focusing on the largest contributors, even without a per-record size metric.

# Power Platform & Dataverse: Storage & Administration

A comprehensive guide to understanding, managing, and optimizing storage within the Power Platform ecosystem.

---

## 1. What is the Power Platform?

The Microsoft Power Platform is a line of business intelligence, app development, and app connectivity software applications. It consists of:

- **Power Apps:** A suite of apps, services, and connectors, as well as a data platform, that provides a rapid development environment to build custom apps for your business needs.
- **Power Automate:** A service that helps you create automated workflows between your favorite apps and services to synchronize files, get notifications, collect data, and more.
- **Power BI:** A business analytics service that delivers insights to enable fast, informed decisions.
- **Power Virtual Agents:** A service for creating powerful chatbots, without the need for developers or data scientists.

At the heart of the Power Platform lies **Dataverse**, which serves as the primary data backbone for most of these services.

---

## 2. What is Dataverse?

Dataverse is more than just a traditional database. It's a scalable and intelligent data service that comes with a rich set of features:

- **Data Storage:** Securely stores and manages data used by business applications. Data within Dataverse is stored within a set of **tables**.
- **Key Components:**
  - **Tables (formerly Entities):** A collection of rows. Tables are used to model and manage business data (e.g., `Account`, `Contact`, `Product`).
  - **Columns (formerly Fields):** A single data item within a table (e.g., `Name`, `Email`, `Price`).
  - **Rows (formerly Records):** A single record of data within a table.
- **Rich Metadata:** Dataverse includes a base set of standard tables, but you can also create custom tables specific to your organization. It supports rich data types, complex relationships (e.g., one-to-many, many-to-many), and business logic.
- **Security & Governance:** Provides a robust security model with role-based access, field-level security, and comprehensive auditing capabilities.

---

## 3. Dataverse Storage: The Three Types

Dataverse capacity consumption is divided into three distinct types. Understanding each is crucial for effective management.

### Database Capacity
- **What it is:** Stores structured, transactional data. This is the data that resides in your standard and custom tables.
- **Examples:** Account records, contact details, product information, business process flows.
- **Where it's stored:** Azure SQL Database.

### File Capacity
- **What it is:** Stores unstructured or binary data, typically attachments and large files.
- **Examples:** Documents in notes, images, email attachments, PDF files.
- **Where it's stored:** Azure Blob Storage for cost-effective storage of large objects.

### Log Capacity
- **What it is:** Stores change logs and audit trail data. This includes record-level auditing, attribute changes, and system jobs.
- **Examples:** Audit logs that track who created, updated, or deleted a record.
- **Where it's stored:** Optimized storage for write-heavy audit data.

**[Illustration Idea: A diagram showing three columns for Database, File, and Log, with icons and examples of what each holds.]**

---

## 4. How to Check Your Storage

The **Power Platform Admin Center (PPAC)** is your central hub for monitoring storage.

1.  **Navigate to the Admin Center:** Go to [admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com).
2.  **Access Capacity Reports:** On the left-hand navigation pane, select **Resources > Capacity**.
3.  **Summary View:** This page gives you a tenant-wide overview of your total storage usage across all three types (Database, File, Log) and shows your total entitlement. It also highlights the top environments consuming storage.

**[Illustration Idea: A screenshot of the PPAC Capacity summary page.]**

### Drilling Down into Details

From the summary page, you can drill into a specific environment for a more detailed analysis:

1.  On the **Summary** tab, select an environment to view its specific usage details.
2.  You will see a breakdown of consumption by type:
    - **Database Tab:** Shows a list of the top tables consuming database storage. This is critical for identifying which business data is taking up the most space.
    - **File Tab:** Shows the top tables consuming file storage. Often, the `Annotation` (Notes) and `Attachment` tables are the largest here.
    - **Log Tab:** Shows the tables consuming the most log capacity, which is often related to audit settings.

**[Illustration Idea: A screenshot of the environment-level storage drill-down view, showing the tabs for Database, File, and Log.]**

---

## 5. Common Causes of High Storage Usage

- **Database Capacity:**
  - **System Jobs:** The `AsyncOperationBase` table can grow very large if not managed. It stores data about system jobs, workflows, and plug-in executions.
  - **Wide Tables:** Tables with a very high number of columns can consume significant space.
  - **Verbose Auditing:** Extensive audit logs that are stored in database tables can be a major contributor.

- **File Capacity:**
  - **Email Attachments:** The `Attachment` table, synchronized from Exchange via Server-Side Sync.
  - **Note Attachments:** The `Annotation` table, where users attach files to records.

- **Log Capacity:**
  - **Over-auditing:** Enabling auditing on too many tables and columns, especially for high-transaction tables.
  - **Long Audit Retention:** Keeping audit logs for longer than necessary.

---

## 6. Administration & Cleanup Strategies

Proactive administration is essential to prevent storage issues.

### Strategy 1: Use Bulk Delete Jobs
The most powerful built-in tool for cleaning up unnecessary data.

- **What to do:** Create recurring **Bulk Record Deletion** jobs.
- **Where:** In the Power Platform admin center, go to **Environments > [Your Environment] > Settings > Data management > Bulk deletion**.
- **Common Cleanup Targets:**
  - **System Jobs:** Create a job to delete completed system jobs (`AsyncOperationBase`) older than 30-90 days.
  - **Audit Logs:** Regularly trim audit logs if you don't have a strict, long-term compliance requirement.

**[Illustration Idea: A screenshot of the Bulk Record Deletion setup wizard in Power Apps.]**

### Strategy 2: Manage Attachments
- **User Education:** Train users to be mindful of file sizes and to avoid using Dataverse as a primary file repository.
- **Alternative Storage:** For document-heavy processes, consider using the SharePoint integration. Store documents in SharePoint and link them to Dataverse records. This leverages SharePoint's superior document management features and more cost-effective storage.

### Strategy 3: Optimize Auditing
- **Be Selective:** Don't enable auditing for every table and column. Focus on critical data and compliance requirements.
- **Review Retention:** Regularly review and adjust audit log retention periods to align with business needs.

---

## 7. Appendix: PowerShell for Administration

For administrators who prefer command-line interfaces, the Power Platform provides a robust set of PowerShell cmdlets. This allows for automation and bulk reporting of administrative tasks.

### Prerequisites
You need to install the `Microsoft.PowerApps.Administration.PowerShell` module. Run this command in an elevated PowerShell prompt:
```powershell
Install-Module -Name Microsoft.PowerApps.Administration.PowerShell
```

### Connecting to Your Tenant
All sessions start by authenticating. This command will open a login prompt:
```powershell
Add-PowerAppsAccount
```

### Checking Tenant-Wide Storage Capacity
To get a tenant-level view of your licensed capacity versus actual consumption, use the `Get-AdminPowerAppCapacity` cmdlet. The output shows usage for Database, File, and Log types.

```powershell
# Get capacity details and format as a list for readability
Get-AdminPowerAppCapacity | Format-List
```
This provides a quick overview similar to the main page of the PPAC capacity report.

### Checking Environment-Specific Consumption
To see how much storage each environment is using, you can use `Get-PowerAppEnvironment` combined with `Get-AdminPowerAppEnvironmentConsumption`.

```powershell
# Get all environments
$environments = Get-PowerAppEnvironment

# Loop through each environment and get its consumption
foreach ($env in $environments) {
    Write-Host "Analyzing Environment: $($env.DisplayName)"
    Get-AdminPowerAppEnvironmentConsumption -EnvironmentName $env.EnvironmentName | Format-List
}
```
**Note:** The cmdlets provide high-level consumption data per environment. As of now, getting a detailed, per-table breakdown of storage is best achieved through the downloadable reports in the Power Platform Admin Center.

### A Note on Cleanup
While bulk deletion jobs are configured in the web UI, you can perform advanced data operations, including record deletion, using PowerShell by leveraging the Dataverse SDK/API. This is an advanced topic that involves creating scripts to connect to the Dataverse Web API and execute delete requests.

---

## 8. Capacity Management & Add-ons

- **Notifications:** You will receive email notifications when you approach or exceed your storage capacity.
- **Grace Period:** There is typically a grace period where admin operations are still allowed, but creating new environments may be blocked.
- **Purchasing Add-ons:** If optimization is not enough, you can purchase additional capacity add-ons for Database, File, and Log storage through the Microsoft 365 admin center.

---

## 9. Summary & Key Takeaways

1.  **Be Proactive:** Regularly monitor your storage at both the tenant and environment level.
2.  **Know the Types:** Understand the difference between Database, File, and Log capacity to diagnose issues correctly.
3.  **Use the Tools:** Leverage built-in features like Bulk Delete Jobs and PowerShell cmdlets.
4.  **Govern Your Data:** Establish a clear governance plan for data retention, auditing, and attachment handling.
5.  **Optimize First:** Always try to optimize and clean up existing storage before purchasing more.
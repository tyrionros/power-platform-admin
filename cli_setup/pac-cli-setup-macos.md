# Power Platform (PAC) CLI Setup Guide for macOS on Apple Silicon (M1/M2/M3)

This guide provides step-by-step instructions for installing the Microsoft Power Platform CLI (PAC) on a MacBook with an Apple Silicon processor (M1, M2, M3) using the recommended .NET global tool method. This ensures the CLI runs natively on the Arm64 architecture.

---

## 1. Prerequisite: Install .NET SDK (Arm64)

The Power Platform CLI is a .NET tool, so the .NET SDK is required. It's crucial to install the Arm64 version to ensure native performance.

1.  **Download:** Go to the official .NET download page:
    *   [.NET Downloads (Official Microsoft Site)](https://dotnet.microsoft.com/en-us/download)
2.  **Select Version:** Under the latest .NET version (e.g., .NET 8.0), find the macOS installers.
3.  **Choose Arm64:** Download the installer for **Arm64**. The filename will typically look like `dotnet-sdk-[version]-osx-arm64.pkg`.
4.  **Install:** Run the downloaded `.pkg` file and follow the installation prompts.

---

## 2. Install the Power Platform CLI

Once the .NET SDK is installed, you can install the PAC CLI as a .NET global tool.

1.  **Open Terminal:** Open your terminal application (e.g., Terminal, iTerm2).
2.  **Run the Install Command:** Execute the following command. This downloads and installs the latest version of the PAC CLI tool.

    ```bash
    dotnet tool install --global Microsoft.PowerApps.CLI.Tool
    ```

---

## 3. Configure Your Shell Path

After installation, the `dotnet` command will output a message telling you where the tool was installed (usually `~/.dotnet/tools`). For the `pac` command to be accessible from anywhere in your terminal, this directory must be in your system's `PATH`.

1.  **Check Your Current Path:** Run `echo $PATH`. Look for `~/.dotnet/tools` in the output. If it's there, you can skip to the next step.

2.  **Add to Path (If Needed):** If the path is missing, you need to add it to your shell's configuration file. For modern macOS, this is typically `.zshrc`.

    ```bash
    echo 'export PATH="$HOME/.dotnet/tools:$PATH"' >> ~/.zshrc
    ```

3.  **Apply the Changes:** For the changes to take effect, either restart your terminal or run the following command:

    ```bash
    source ~/.zshrc
    ```

---

## 4. Verify the Installation

To confirm that the PAC CLI is installed correctly and accessible, run the following command:

```bash
pac --version
```

You should see an output displaying the installed version number, for example: `1.29.3+g02a7e71`.

You can also run `which pac` to see the exact path to the executable.

---

## 5. Updating the Power Platform CLI

To update the CLI to the latest version in the future, you can use the `dotnet tool update` command:

```bash
dotnet tool update --global Microsoft.PowerApps.CLI.Tool
```

---

## Troubleshooting

*   **`pac: command not found`**: This almost always means the `~/.dotnet/tools` directory is not in your shell's `PATH`. Go back to **Step 3: Configure Your Shell Path** and ensure the export command was run correctly and your shell profile was reloaded.
*   **Permission Errors:** If you encounter permission issues, ensure your user account has the necessary rights to install software and write to your home directory configuration files.

---

## 6. Recommended Command-Line Toolchain

While the Power Platform CLI (PAC) is the cornerstone, a comprehensive command-line strategy often involves a combination of tools.

### Power Platform CLI (PAC) - Your Primary Tool
This is the modern, cross-platform tool this guide covers. It is essential for developers and anyone involved in Application Lifecycle Management (ALM).
*   **Best for:** Solution management, Dataverse environment management, Power Pages, Code Components (PCF), and CI/CD integration.
*   **Why:** It's the official, actively developed CLI with the broadest support for developer and ALM tasks across all platforms.

### PowerShell Modules - For Administration and Automation
PowerShell is incredibly powerful for automating administrative tasks. On a Mac, you would first need to [install PowerShell Core](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-macos).
*   **Key Modules:**
    *   `Microsoft.PowerApps.Administration.PowerShell`: For **administrators**. Manages environments, DLP policies, and user permissions.
        *   *Install:* `Install-Module -Name Microsoft.PowerApps.Administration.PowerShell`
    *   `Microsoft.PowerApps.PowerShell`: For **makers/developers**. Manages specific resources like Power Apps, Flows, and Connectors.
        *   *Install:* `Install-Module -Name Microsoft.PowerApps.PowerShell`
*   **Why:** Excels at bulk operations and administrative scripting that might be more complex with PAC CLI alone.

### Azure CLI (az) - For Managing Azure Dependencies
Often, a robust Power Platform solution relies on Azure resources (e.g., Azure Key Vault, Application Insights, Azure Functions).
*   **Best for:** Creating and managing Azure resource groups and any other Azure services that support your Power Platform solutions.
*   **Why:** It completes your toolchain, allowing you to manage the entire application landscape (Power Platform components and their Azure dependencies) from the command line.

### Summary: Your Recommended Toolchain

| Tool                 | Primary Use Case                             | Platform      |
| -------------------- | -------------------------------------------- | ------------- |
| **Power Platform CLI** | Developer tasks, ALM, Solution Management    | **Cross-Platform** |
| **PowerShell Modules** | Administrative scripting, Policy Management  | Windows, macOS, Linux |
| **Azure CLI**          | Managing underlying Azure resources          | Cross-Platform  |
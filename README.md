# ☁️ Drive Saver Hub

Drive Saver Hub is a clean, efficient, and modern Flutter application designed to organize, manage, and launch your custom Google Apps Script downloaders from a single interface. 

By pairing this app with the provided Google Apps Script backend, you can download direct web links straight into your Google Drive. It bypasses execution limits by smartly chunking large files and provides a distraction-free, tabbed browser experience on your mobile device.

## 📥 Download

<div align=left>
<table>
    <thead align=left>
        <tr>
            <th>OS</th>
            <th>Download</th>
        </tr>
    </thead>
    <tbody align=left>
        <tr>
            <td>Android</td>
            <td>
                <a href="https://github.com/iam-aydin/drive_saver_hub/releases/latest/download/drive_saver_hub_v1.0.0.apk">
                    <img src="https://img.shields.io/badge/Download-APK-3DDC84.svg?logo=android">
                </a>
            </td>
        </tr>
    </tbody>
</table>
</div>

---

## ⚙️ Backend Setup: The Google Apps Script

To use Drive Saver Hub, you first need to create your own personal downloader on your Google Account. **Files under 50MB are downloaded entirely, while files over 50MB are automatically split into 45MB chunks to bypass Google's limits.**

### Step 1: Add the Script
1. Go to the [Google Apps Script Dashboard](https://script.google.com/).
2. Click on **New Project** in the top left corner.
3. In this GitHub repository, navigate to the `code.gs` file. **Copy every line of code inside it.**
4. Go back to your Google Script project, delete any default code, and paste the code you just copied.

### Step 2: Create a Save Folder
1. Open your [Google Drive](https://drive.google.com/).
   > ⚠️ **CRITICAL WARNING:** You *must* be logged into the exact same Google account that you used to create the Google Script in Step 1.
2. Create a new folder where your downloads will go. Open it.
3. Look at your browser's address bar. It will look like this:
   `https://drive.google.com/drive/folders/1LVJ35hhTO9RqLnfaPcrVfXj2zJhFb6Tjn`
4. Copy the **Folder ID** (the long string of letters and numbers at the end).

### Step 3: Configure the Script
In your Google Script code, find the config section at the top and paste your Folder ID. You can also customize the App Title and Folder Name.

```javascript
// ==================== CONFIG ====================
var DATA_SAVER_FOLDER_ID = 'YOUR_COPIED_FOLDER_ID';   // ← paste your folder ID here
var FOLDER_NAME = 'My Downloads';   // ← your custom folder name (shown in UI)(OPTIONAL)
var APP_TITLE = 'Account 1 Downloader';   // ← change this to whatever you want(OPTIONAL)
// ===============================================
```

### Step 4: Deploy & Authorize
1. Click the blue **Deploy** button (top right) -> **New deployment**.
2. Click the **⚙️ Gear icon** next to "Select type" and choose **Web app**.
3. Leave defaults and click **Deploy**.
4. A prompt will ask you to **Authorize access**. Click it and select your Google Account.
5. *Note: You will see a "Google hasn’t verified this app" warning. This is normal because you made the app!*
6. Click **Advanced** -> **Go to Untitled project (unsafe)** -> **Select all** -> **Confirm/Allow**.

### Step 5: Get Your Deployment ID
Once successfully deployed, you will see your Web app URL. **Copy the Deployment ID** (the long string of letters inside the URL, e.g., `AKfycbw6yuc-pzFU...`). You will need this for the Android app!

💡 **Pro-Tip: Multi-Account Downloading**
> If you are downloading a massive file and an account is running out of 15GB space, you can split the workload! Download parts 1-70 on Account A, then set up this script on Account B to download the rest. Use the `APP_TITLE` config to label them so you always know which account you are using!

---

## 📱 How to Use the App

Once you have your Deployment ID from the steps above, open the **Drive Saver Hub** app on your phone:

1. **Add Deployments:** Enter your Google Script Deployment URL or just the unique ID in the input field.
2. **Manage:** Use the list to reorder items (long-press and drag) or tap a card to edit the ID.
3. **Launch:** Tap "Launch Tabs" to open all your active deployments in the built-in browser.
4. **Customize:** Rename tabs by long-pressing the tab title in the browser view.

---

## ✨ Features

- **Direct to Drive & Smart Chunking:** Bypasses script limits by downloading huge files in 45MB chunks directly to your Drive.
- **Smart URL Parsing:** Paste a full Google Script URL or just the ID—the app automatically extracts the correct Deployment ID.
- **Material 3 UI:** Follows modern design guidelines with dynamic coloring, surface styling, and intuitive navigation.
- **Custom Organization:**
  - **Reorder:** Long-press to drag and drop your deployments to organize them.
  - **Rename:** Long-press any tab in the browser to give it a custom name (e.g., "Main Account," "Backup Drive").
- **Webview Cleanup:** Automatically injects scripts to hide clutter like Google branding wrappers, banners, and footers, focusing entirely on your downloader UI.
- **Persistence:** Saves your deployment list and custom tab names locally.
- **Dark/Light Mode:** Full support for system-based themes or user-defined preferences.

---

## 🛠 Tech Stack

- **Frontend:** Flutter (Dart)
- **Backend:** Google Apps Script (`code.gs`)
- **Key Flutter Dependencies:**
  - `webview_flutter`: For rendering the Google Script apps.
  - `shared_preferences`: For saving user configurations locally.
  - `url_launcher`: For handling external links.

---

## 🚀 Getting Started (For Developers)

If you want to build the Flutter app from source:

### Prerequisites
- Flutter SDK installed.
- An IDE (Android Studio, VS Code, or IntelliJ).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iam-aydin/drive_saver_hub.git
cd drive_saver_hub
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the application:
```bash
flutter run
```

---

## 👨‍💻 Developer
Created by Aydin Vesali M. (@iam-aydin)

## 📝 License
This project is open-source and available for personal use and modification.

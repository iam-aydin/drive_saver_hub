# ☁️ Drive Saver Hub

Drive Saver Hub is a clean, efficient, and modern Flutter application designed to organize, manage, and launch multiple Google Apps Script web deployments from a single interface. 

Built with **Material Design 3**, it provides a seamless user experience, complete with dark/light mode support, persistent storage, and a specialized WebView browser that cleans up unnecessary Google UI elements for a distraction-free experience.

## ✨ Features

- **Smart URL Parsing:** Paste a full Google Script URL or just the ID—the app automatically extracts the correct Deployment ID for you.
- **Material 3 UI:** Follows modern design guidelines with dynamic coloring, surface styling, and intuitive navigation.
- **Custom Organization:**
  - **Reorder:** Long-press to drag and drop your deployments to organize them exactly how you like.
  - **Rename:** Long-press any tab in the browser to give it a custom name (e.g., "Main Console," "Admin Panel").
- **Webview Cleanup:** Automatically injects scripts to hide clutter like branding wrappers, banners, and Google-specific footers, focusing on your content.
- **Persistence:** Saves your deployment list and custom tab names locally.
- **Dark/Light Mode:** Full support for system-based themes or user-defined preferences.

## 🛠 Tech Stack

- **Framework:** Flutter (Dart)
- **Key Dependencies:**
  - `webview_flutter`: For rendering the Google Script apps.
  - `shared_preferences`: For saving user configurations locally.
  - `url_launcher`: For handling external links.

## 📥 Getting Started

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

## 📱 How to Use
Add Deployments: Enter your Google Script Deployment URL or just the unique ID in the input field.
Manage: Use the list to reorder items (long-press and drag) or tap a card to edit the ID.
Launch: Tap "Launch Tabs" to open all your active deployments in the tabbed browser.
Customize: Rename tabs by long-pressing the tab title in the browser view.

## 👨‍💻 Developer
Created by Aydin Vesali M. (@iam-aydin)

## 📝 License
This project is open-source and available for personal use and modification.

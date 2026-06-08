import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

final themeNotifier = ValueNotifier<ThemeMode>(ThemeMode.system);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final themeIndex = prefs.getInt('themeMode') ?? 2;
  themeNotifier.value = ThemeMode.values[themeIndex];
  runApp(const DriveSaverHubApp());
}

class DriveSaverHubApp extends StatelessWidget {
  const DriveSaverHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeNotifier,
      builder: (context, themeMode, child) {
        return MaterialApp(
          title: 'Drive Saver Hub',
          debugShowCheckedModeBanner: false,

          // Pure Material You Light Theme
          theme: ThemeData(
            useMaterial3: true,
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blue,
              brightness: Brightness.light,
            ),
            appBarTheme: const AppBarTheme(
              centerTitle: false,
              scrolledUnderElevation: 2,
            ),
          ),

          // Pure Material You Dark Theme
          darkTheme: ThemeData(
            useMaterial3: true,
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blue,
              brightness: Brightness.dark,
            ),
            appBarTheme: const AppBarTheme(
              centerTitle: false,
              scrolledUnderElevation: 2,
            ),
          ),
          themeMode: themeMode,
          home: const WelcomeScreen(),
        );
      },
    );
  }
}

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  List<String> _deploymentIds = [];
  final TextEditingController _idController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadIds();
  }

  Future<void> _loadIds() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _deploymentIds = prefs.getStringList('deploymentIds') ?? [];
    });
  }

  Future<void> _saveIds() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('deploymentIds', _deploymentIds);
  }

  void _addId() {
    String input = _idController.text.trim();
    if (input.isEmpty) return;

    // QoL: Extract ID if the user pastes a full Google Script URL
    final regex = RegExp(r'/macros/s/([a-zA-Z0-9_-]+)');
    final match = regex.firstMatch(input);
    final newId = match != null ? match.group(1)! : input;

    if (_deploymentIds.contains(newId)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Deployment ID already exists')),
      );
      return;
    }
    setState(() {
      _deploymentIds.add(newId);
      _idController.clear();
    });
    _saveIds();
  }

  void _removeId(String id) {
    setState(() {
      _deploymentIds.remove(id);
    });
    _saveIds();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Deployment removed'),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            setState(() {
              _deploymentIds.add(id);
            });
            _saveIds();
          },
        ),
      ),
    );
  }

  // Edit Deployment ID directly from the list
  Future<void> _editId(int index) async {
    final currentId = _deploymentIds[index];
    final txtController = TextEditingController(text: currentId);

    final newId = await showDialog<String>(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          title: const Text('Edit Deployment ID'),
          content: TextField(
            controller: txtController,
            autofocus: true,
            decoration: const InputDecoration(
              labelText: 'Deployment ID or URL',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, null),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                final val = txtController.text.trim();
                if (val.isNotEmpty) {
                  Navigator.pop(ctx, val);
                }
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );

    if (newId != null && newId != currentId) {
      // Allow extracting the ID if the user pastes a full URL during editing
      final regex = RegExp(r'/macros/s/([a-zA-Z0-9_-]+)');
      final match = regex.firstMatch(newId);
      final extractedId = match != null ? match.group(1)! : newId;

      if (_deploymentIds.contains(extractedId) && extractedId != currentId) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Deployment ID already exists')),
        );
        return;
      }

      setState(() {
        _deploymentIds[index] = extractedId;
      });
      _saveIds();
    }
  }

  void _setTheme(ThemeMode mode) async {
    themeNotifier.value = mode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('themeMode', mode.index);
  }

  // ==========================================
  // ABOUT DIALOG: EDIT YOUR DETAILS HERE
  // ==========================================
  void _showAboutDialog() {
    const String appVersion = "1.0.0";
    const String developerName = "Aydin Vesali M.";
    const String githubUrl = "https://github.com/iam-aydin/drive_saver_hub";

    showDialog(
      context: context,
      builder: (BuildContext context) {
        final theme = Theme.of(context);
        return AlertDialog(
          title: Row(
            children: [
              Icon(Icons.info_outline, color: theme.colorScheme.primary),
              const SizedBox(width: 8),
              const Text('About App'),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Drive Saver Hub',
                style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              RichText(
                text: TextSpan(
                  style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.onSurface),
                  children: const [
                    TextSpan(text: 'Version: ', style: TextStyle(fontWeight: FontWeight.bold)),
                    TextSpan(text: appVersion),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              RichText(
                text: TextSpan(
                  style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.onSurface),
                  children: const [
                    TextSpan(text: 'Developer: ', style: TextStyle(fontWeight: FontWeight.bold)),
                    TextSpan(text: developerName),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // MATERIAL DESIGN: Clickable labeled link with an external icon
              TextButton.icon(
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  alignment: Alignment.centerLeft,
                ),
                onPressed: () async {
                  final uri = Uri.parse(githubUrl);
                  if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
                    debugPrint('Could not launch $githubUrl');
                  }
                },
                icon: const Icon(Icons.open_in_new, size: 18),
                label: const Text('GitHub Repository'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Drive Saver Hub'),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            tooltip: 'About',
            onPressed: _showAboutDialog,
          ),
          PopupMenuButton<ThemeMode>(
            icon: const Icon(Icons.brightness_6_outlined),
            onSelected: _setTheme,
            itemBuilder: (context) => [
              const PopupMenuItem(value: ThemeMode.light, child: Text('Light theme')),
              const PopupMenuItem(value: ThemeMode.dark, child: Text('Dark theme')),
              const PopupMenuItem(value: ThemeMode.system, child: Text('System default')),
            ],
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Add your Downloader's Deployment ID",
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Launch them all here.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 24),

              // Input Section
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _idController,
                      decoration: InputDecoration(
                        labelText: 'Deployment ID or URL',
                        hintText: 'Paste full URL or ID',
                        prefixIcon: const Icon(Icons.link),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        filled: true,
                        fillColor: theme.colorScheme.surfaceContainerHighest,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  IconButton.filled(
                    onPressed: _addId,
                    icon: const Icon(Icons.add),
                    style: IconButton.styleFrom(
                      minimumSize: const Size(56, 56),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    'Active Tabs',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colorScheme.primary,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '(Tap to edit, long press to reorder)',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Reorderable List
              Expanded(
                child: _deploymentIds.isEmpty
                    ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.cloud_queue, size: 48, color: theme.colorScheme.outlineVariant),
                      const SizedBox(height: 12),
                      Text(
                        'No deployments found',
                        style: theme.textTheme.bodyLarge?.copyWith(color: theme.colorScheme.onSurfaceVariant),
                      ),
                    ],
                  ),
                )
                    : ReorderableListView.builder(
                  buildDefaultDragHandles: false, // Disables standard trailing drag icon
                  itemCount: _deploymentIds.length,
                  onReorderItem: (oldIndex, newIndex) {
                    setState(() {
                      final String item = _deploymentIds.removeAt(oldIndex);
                      _deploymentIds.insert(newIndex, item);
                    });
                    _saveIds();
                  },
                  itemBuilder: (context, index) {
                    final id = _deploymentIds[index];

                    // Wraps item to let user reorder it by long pressing anywhere on the card
                    return ReorderableDelayedDragStartListener(
                      key: ValueKey(id),
                      index: index,
                      child: Card(
                        margin: const EdgeInsets.symmetric(vertical: 4.0),
                        elevation: 0,
                        color: theme.colorScheme.surfaceContainerHighest,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        child: ListTile(
                          onTap: () => _editId(index), // Edits ID on tap
                          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                          leading: CircleAvatar(
                            backgroundColor: theme.colorScheme.primaryContainer,
                            child: Icon(Icons.code, color: theme.colorScheme.onPrimaryContainer, size: 20),
                          ),
                          title: Text(
                            id,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: theme.textTheme.bodyLarge,
                          ),
                          // New remove button on the trailing side
                          trailing: IconButton(
                            icon: Icon(Icons.delete_outline, color: theme.colorScheme.error),
                            onPressed: () => _removeId(id),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 16),

              // Launch Button
              FilledButton.icon(
                onPressed: _deploymentIds.isEmpty
                    ? null
                    : () {
                  final urls = _deploymentIds
                      .map((id) => 'https://script.google.com/macros/s/$id/exec')
                      .toList();
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MultiTabBrowser(urls: urls),
                    ),
                  );
                },
                icon: const Icon(Icons.open_in_browser),
                label: const Text('Launch Tabs'),
                style: FilledButton.styleFrom(
                  minimumSize: const Size(double.infinity, 56),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  textStyle: theme.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MultiTabBrowser extends StatefulWidget {
  final List<String> urls;
  const MultiTabBrowser({super.key, required this.urls});

  @override
  State<MultiTabBrowser> createState() => _MultiTabBrowserState();
}

class _MultiTabBrowserState extends State<MultiTabBrowser>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<WebViewController?> _controllers = [];
  final List<int> _loadingProgress = [];
  int _currentIndex = 0;
  List<String> _tabNames = [];
  Map<String, String> _customNames = {};

  @override
  void initState() {
    super.initState();

    _tabController = TabController(length: widget.urls.length, vsync: this);
    _controllers.addAll(List.filled(widget.urls.length, null));
    _loadingProgress.addAll(List.filled(widget.urls.length, 0));
    _initTabNames();
    _initWebView(0);

    _loadCustomNames().then((_) {
      if (mounted) {
        setState(() {
          _initTabNames();
        });
      }
    });
  }

  Future<void> _loadCustomNames() async {
    final prefs = await SharedPreferences.getInstance();
    final String? jsonStr = prefs.getString('tabNamesMap');
    if (jsonStr != null) {
      try {
        Map<String, dynamic> decoded = jsonDecode(jsonStr);
        _customNames = decoded.map((key, value) => MapEntry(key, value.toString()));
      } catch (e) {
        _customNames = {};
      }
    }
  }

  void _saveCustomNames() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = jsonEncode(_customNames);
    await prefs.setString('tabNamesMap', jsonStr);
  }

  void _initTabNames() {
    _tabNames = List.generate(widget.urls.length, (index) {
      final url = widget.urls[index];
      return _customNames[url] ?? 'Downloader-${index + 1}'; // Updated default naming
    });
  }

  Future<void> _renameTab(int index) async {
    final currentName = _tabNames[index];
    final txtController = TextEditingController(text: currentName);
    final newName = await showDialog<String>(
      context: context,
      builder: (BuildContext ctx) {
        return AlertDialog(
          title: const Text('Rename Tab'),
          content: TextField(
            controller: txtController,
            autofocus: true,
            decoration: const InputDecoration(hintText: 'Enter descriptive name'),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, null),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                final name = txtController.text.trim();
                if (name.isNotEmpty) {
                  Navigator.pop(ctx, name);
                }
              },
              child: const Text('Save'),
            ),
          ],
        );
      },
    );
    if (newName != null && newName.isNotEmpty) {
      setState(() {
        _tabNames[index] = newName;
        _customNames[widget.urls[index]] = newName;
      });
      _saveCustomNames();
    }
  }

  void _initWebView(int index) {
    if (_controllers[index] != null) return;

    final controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(NavigationDelegate(
        onProgress: (progress) {
          if (mounted) {
            setState(() {
              _loadingProgress[index] = progress;
            });
          }
        },
        onPageFinished: (url) async {
          final targetController = _controllers[index];
          if (targetController != null) {
            const String hideScriptUI = """
              (function() {
                var selectors = [
                  '.branding-wrapper', '.footer', '.drive-banner', 
                  '.script-apps-banner', '.gb_Ed', '.gb_ec', 
                  '.docs-butterbar-container', '.m6f3f', '.app-footer',
                  'div[role="banner"]:has(a[href*="script.google.com"])',
                  '.goog-te-banner-frame', '.docs-ui-unprintable'
                ];
                selectors.forEach(function(sel) {
                  document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
                });
                document.querySelectorAll('iframe').forEach(iframe => {
                  if (iframe.src && iframe.src.includes('google.com')) {
                    iframe.style.display = 'none';
                  }
                });
                document.body.style.paddingTop = '0px';
                document.body.style.marginTop = '0px';
              })();
            """;
            await targetController.runJavaScript(hideScriptUI);
          }
        },
        onWebResourceError: (error) => debugPrint('Error on index $index: ${error.description}'),
      ))
      ..loadRequest(Uri.parse(widget.urls[index]));

    _controllers[index] = controller;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currentProgress = _loadingProgress[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Console Browser'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Material(
            color: Colors.transparent,
            child: TabBar(
              controller: _tabController,
              isScrollable: true,
              indicatorColor: theme.colorScheme.primary,
              labelColor: theme.colorScheme.primary,
              unselectedLabelColor: theme.colorScheme.onSurfaceVariant,
              tabs: _tabNames.asMap().entries.map((entry) {
                final index = entry.key;
                return GestureDetector(
                  onLongPress: () => _renameTab(index),
                  child: Tab(text: entry.value),
                );
              }).toList(),
              onTap: (index) {
                setState(() => _currentIndex = index);
                _initWebView(index);
              },
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          if (currentProgress < 100)
            LinearProgressIndicator(
              value: currentProgress / 100.0,
              backgroundColor: Colors.transparent,
              valueColor: AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
              minHeight: 2.5,
            ),
          Expanded(
            child: IndexedStack(
              index: _currentIndex,
              children: List.generate(
                widget.urls.length,
                    (i) => _controllers[i] == null
                    ? const Center(child: CircularProgressIndicator())
                    : WebViewWidget(controller: _controllers[i]!),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:lucide_flutter/lucide_flutter.dart';
import 'package:boilerplate_ui/utils/size_config.dart'; // Assuming MySize is used for responsive sizing

class RecreatedHeader extends StatelessWidget implements PreferredSizeWidget {
  final bool isAuthenticated;
  final String currentPage; // To highlight the current page
  final Function(String) onNavigate; // Callback for navigation
  // final Function onLogout; // Will be used later
  // final dynamic currentUser; // Will be used later

  const RecreatedHeader({
    Key key,
    this.isAuthenticated = false,
    this.currentPage = 'home',
    this.onNavigate,
    // this.onLogout,
    // this.currentUser,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    MySize().init(context); // Initialize MySize for responsive text/padding

    return AppBar(
      backgroundColor: Colors.white,
      elevation: 1.0, // shadow-sm equivalent
      automaticallyImplyLeading: false, // Removes back button if this is the first screen
      titleSpacing: 0,
      title: Padding(
        padding: EdgeInsets.symmetric(horizontal: MySize.size16), // Equivalent to px-4 (sm:px-6 lg:px-8 can be handled with MySize or MediaQuery)
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Logo
            GestureDetector(
              onTap: () {
                onNavigate?.call('home');
              },
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(MySize.size8), // p-2
                    decoration: BoxDecoration(
                      color: Colors.blue[700], // bg-blue-700
                      borderRadius: BorderRadius.circular(MySize.size8), // rounded-lg
                    ),
                    child: Icon(LucideIcons.user, color: Colors.white, size: MySize.size24), // h-6 w-6
                  ),
                  SizedBox(width: MySize.size12), // mr-3
                  Text(
                    "ServiPerú",
                    style: TextStyle(
                      fontSize: MySize.getScaledSize(20), // text-xl
                      fontWeight: FontWeight.bold,
                      color: Colors.grey[900], // text-gray-900
                    ),
                  ),
                ],
              ),
            ),

            // Desktop Navigation (Simplified for now)
            if (MySize.screenWidth > 768) // md breakpoint
              _buildDesktopNavigation(context),

            // Mobile menu button (Placeholder for now)
            if (MySize.screenWidth <= 768)
              IconButton(
                icon: Icon(LucideIcons.menu, color: Colors.grey[600]),
                onPressed: () {
                  // Handle mobile menu toggle
                  print("Mobile menu tapped");
                  Scaffold.of(context).openEndDrawer(); // Example: open a drawer
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildDesktopNavigation(BuildContext context) {
    if (!isAuthenticated) {
      return Row(
        children: [
          _navButton(context, "Inicio", "home", currentPage == 'home', onNavigate),
          SizedBox(width: MySize.size32), // space-x-8
          _actionButton(
            context,
            "Buscar Servicio",
            () { onNavigate?.call('auth_register'); },
            Colors.blue[700], // bg-blue-700
            Colors.blue[800], // hover:bg-blue-800
          ),
          SizedBox(width: MySize.size16),
          _actionButton(
            context,
            "Ofrecer Servicio",
            () { onNavigate?.call('auth_register'); },
            Colors.green[600], // bg-green-600
            Colors.green[700], // hover:bg-green-700
          ),
        ],
      );
    } else {
      // Authenticated state navigation
      return Row(
        children: [
          // Updated "dashboard" to "client_dashboard" for specific navigation
          _navButton(context, "Panel Principal", "client_dashboard", currentPage.contains('dashboard'), onNavigate),
          SizedBox(width: MySize.size32),
          _navButton(context, "Suscripciones", "subscriptions_page", currentPage == 'subscriptions', onNavigate),
          SizedBox(width: MySize.size24),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "User Name", // currentUser.name Placeholder
                    style: TextStyle(fontSize: MySize.getScaledSize(14), fontWeight: FontWeight.w500, color: Colors.grey[900]),
                  ),
                  Text(
                    "Client", // currentUser.type Placeholder (capitalized)
                    style: TextStyle(fontSize: MySize.getScaledSize(12), color: Colors.grey[500]),
                  ),
                ],
              ),
              SizedBox(width: MySize.size12),
              TextButton(
                onPressed: () { onNavigate?.call('logout'); }, // Changed to use onNavigate
                child: Text(
                  "Cerrar Sesión",
                  style: TextStyle(color: Colors.grey[400], fontSize: MySize.getScaledSize(14)),
                ),
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: Size(MySize.size50, MySize.size30),
                ),
              ),
            ],
          )
        ],
      );
    }
  }

  Widget _navButton(BuildContext context, String text, String pageKey, bool isActive, Function(String) navCallback) {
    return TextButton(
      onPressed: () {
        navCallback?.call(pageKey);
      },
      style: TextButton.styleFrom(
        foregroundColor: isActive ? Colors.blue[700] : Colors.grey[700],
        padding: EdgeInsets.symmetric(vertical: MySize.size8, horizontal: MySize.size4),
        textStyle: TextStyle(
          fontWeight: FontWeight.w500,
          fontSize: MySize.getScaledSize(14),
        ),
      ),
      child: Text(text),
    );
  }

  Widget _actionButton(BuildContext context, String text, VoidCallback onPressed, Color bgColor, Color hoverBgColor) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: bgColor,
        padding: EdgeInsets.symmetric(horizontal: MySize.size16, vertical: MySize.size10),
        textStyle: TextStyle(
          fontSize: MySize.getScaledSize(14),
          fontWeight: FontWeight.w500,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(MySize.size8),
        ),
        elevation: 0,
      ).copyWith(
        overlayColor: MaterialStateProperty.resolveWith<Color>(
          (Set<MaterialState> states) {
            if (states.contains(MaterialState.hovered)) return hoverBgColor;
            return null;
          },
        ),
      ),
      child: Text(text, style: TextStyle(color: Colors.white)),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(MySize.size64);
}

class RecreatedMobileDrawer extends StatelessWidget {
  final Function(String) onNavigate;
  const RecreatedMobileDrawer({Key key, this.onNavigate}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue[700],
            ),
            child: Text(
              'ServiPerú Menú',
              style: TextStyle(
                color: Colors.white,
                fontSize: MySize.getScaledSize(24),
              ),
            ),
          ),
          ListTile(
            leading: Icon(LucideIcons.home),
            title: Text('Inicio'),
            onTap: () {
              Navigator.pop(context);
              onNavigate?.call('home');
            },
          ),
          ListTile(
            leading: Icon(LucideIcons.search), // Or UserPlus for register
            title: Text('Buscar/Ofrecer Servicio (Registrarse)'),
            onTap: () {
              Navigator.pop(context);
              onNavigate?.call('auth_register');
            },
          ),
          ListTile(
            leading: Icon(LucideIcons.logIn),
            title: Text('Iniciar Sesión'),
            onTap: () {
              Navigator.pop(context);
              onNavigate?.call('auth_login');
            },
          ),
          // Added items for authenticated state to mobile drawer
          if(onNavigate != null) ...[ // A bit of a hack to check if it's in an authenticated context
            Divider(),
            ListTile(
              leading: Icon(LucideIcons.layoutDashboard),
              title: Text('Panel Cliente'), // Renamed for clarity
              onTap: () {
                Navigator.pop(context);
                onNavigate('client_dashboard');
              },
            ),
            ListTile( // Added Worker Dashboard Navigation
              leading: Icon(LucideIcons.hardHat), // Icon for worker
              title: Text('Panel Trabajador'),
              onTap: () {
                Navigator.pop(context);
                onNavigate('worker_dashboard');
              },
            ),
            ListTile(
              leading: Icon(LucideIcons.gem), // Gem or CreditCard for subscriptions
              title: Text('Suscripciones'),
              onTap: () {
                Navigator.pop(context);
                onNavigate('subscriptions_page');
              },
            ),
            ListTile(
              leading: Icon(LucideIcons.logOut),
              title: Text('Cerrar Sesión'),
              onTap: () {
                Navigator.pop(context);
                onNavigate('logout'); // Special key for logout
              },
            ),
          ]
        ],
      ),
    );
  }
}

// Updated notes:
// - Added `Function(String) onNavigate` to RecreatedHeader constructor.
// - `onNavigate` is called in `GestureDetector` for logo, `_navButton`, and `_actionButton`.
// - Changed navigation keys for "Buscar Servicio" and "Ofrecer Servicio" to 'auth_register'.
// - For authenticated state, "Panel Principal" now navigates to 'client_dashboard'.
// - "Suscripciones" now navigates to 'subscriptions_page'.
// - Added `onNavigate` to `RecreatedMobileDrawer` and wired up its ListTiles.
// - Added "Iniciar Sesión", "Panel Principal", "Suscripciones", "Cerrar Sesión" to mobile drawer,
//   conditionally showing auth items if onNavigate is available (as a proxy for being in an auth context,
//   ideally this would be driven by an `isAuthenticated` flag).
// - The `print` statements in navigation callbacks are kept for debugging but `onNavigate` is now the primary mechanism.
// - Assumed `MySize().init(context)` is called in parent screens.
// - The `isAuthenticated`, `currentUser`, `onLogout` logic is still placeholder in RecreatedHeader itself,
//   but the drawer now has more items.
// - `currentPage` is used for highlighting active nav button.
// - `Scaffold.of(context).openEndDrawer()` is called for mobile menu button.
//   The parent Scaffold needs to have `endDrawer: RecreatedMobileDrawer(onNavigate: _handleNavigation),`
//   where `_handleNavigation` is a method in the parent widget (e.g. RecreatedHomePage or a new main app shell).

import 'package:boilerplate_ui/utils/size_config.dart';
import 'package:boilerplate_ui/widgets/recreated_header.dart';
import 'package:flutter/material.dart';
import 'package:lucide_flutter/lucide_flutter.dart';
import 'recreated_auth_page.dart';
import 'recreated_client_dashboard_page.dart';
import 'recreated_worker_dashboard_page.dart';
import 'recreated_subscriptions_page.dart'; // Import Subscriptions Page

class RecreatedHomePage extends StatelessWidget {
  const RecreatedHomePage({Key key}) : super(key: key);

  // Data similar to HomePage.tsx (omitted for brevity, assume it's the same as before)
  final List<Map<String, dynamic>> features = const [
    {
      "icon": LucideIcons.shield,
      "title": 'Trabajadores Verificados',
      "description": 'Todos nuestros trabajadores pasan por verificación de identidad y antecedentes'
    },
    {
      "icon": LucideIcons.star,
      "title": 'Calificaciones Reales',
      "description": 'Sistema de calificaciones transparente basado en experiencias reales'
    },
    {
      "icon": LucideIcons.checkCircle,
      "title": 'Garantía de Servicio',
      "description": 'Si no estás satisfecho, te ayudamos a solucionarlo o te devolvemos tu dinero'
    }
  ];

  final List<Map<String, dynamic>> categories = const [
    {"name": 'Plomería', "icon": LucideIcons.wrench, "color": Color(0xFFE0F2FE), "textColor": Color(0xFF0C4A6E)},
    {"name": 'Electricidad', "icon": LucideIcons.zap, "color": Color(0xFFFEF9C3), "textColor": Color(0xFF713F12)},
    {"name": 'Pintura', "icon": LucideIcons.palette, "color": Color(0xFFF3E8FF), "textColor": Color(0xFF581C87)},
    {"name": 'Jardinería', "icon": LucideIcons.flower2, "color": Color(0xFFDCFCE7), "textColor": Color(0xFF166534)},
    {"name": 'Limpieza', "icon": LucideIcons.sparkles, "color": Color(0xFFFCE7F3), "textColor": Color(0xFF831843)},
    {"name": 'Carpintería', "icon": LucideIcons.hammer, "color": Color(0xFFFFF7ED), "textColor": Color(0xFF7C2D12)},
    {"name": 'Reparaciones', "icon": LucideIcons.settings, "color": Color(0xFFF3F4F6), "textColor": Color(0xFF374151)},
    {"name": 'Mudanza', "icon": LucideIcons.truck, "color": Color(0xFFE0E7FF), "textColor": Color(0xFF3730A3)},
  ];

  final List<Map<String, String>> stats = const [
    {"number": '10,000+', "label": 'Servicios Completados'},
    {"number": '2,500+', "label": 'Trabajadores Verificados'},
    {"number": '4.8/5', "label": 'Calificación Promedio'},
    {"number": '24h', "label": 'Tiempo de Respuesta'}
  ];


  // Navigation Handler
  void _handleNavigation(BuildContext context, String pageKey) {
    print("HomePage received navigation request for: $pageKey");
    Widget targetPage;

    switch (pageKey) {
      case 'auth_login':
        targetPage = RecreatedAuthPage(initialMode: 'login');
        break;
      case 'auth_register':
        targetPage = RecreatedAuthPage(initialMode: 'register');
        break;
      case 'client_dashboard':
        targetPage = RecreatedClientDashboardPage();
        break;
      case 'worker_dashboard':
        targetPage = RecreatedWorkerDashboardPage();
        break;
      case 'subscriptions_page':
        targetPage = RecreatedSubscriptionsPage();
        break;
      case 'home':
        print("Already on home or main page. Optionally pop if not root.");
        if (ModalRoute.of(context)?.settings.name != '/') {
          // Consider Navigator.popUntil(context, ModalRoute.withName('/'));
          // or ensure HomePage is always at the root or use a more robust navigation system.
        }
        return; // Don't push if already home or handled
      case 'logout':
        print("Logout requested. (Demo: Navigating to home, no actual state change)");
        // In a real app: clear auth state, then navigate.
        // For this demo, if we navigate to 'home', the RecreatedHeader
        // might not change its appearance unless `isDemoAuthenticated` is also changed
        // through some (currently non-existent) state management that RecreatedHomePage listens to.
        // For now, we can just pop all routes and push home, or rely on RecreatedHeader's current logic.
        // Navigator.of(context).popUntil((route) => route.isFirst);
        // Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => RecreatedHomePage()));
        // For simplicity, let's just print and not change the UI state for logout in this pass.
        return;
      default:
        print("Unknown navigation key: $pageKey");
        return;
    }

    if (targetPage != null) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => targetPage),
      );
    }
  }


  @override
  Widget build(BuildContext context) {
    MySize().init(context);

    // For demo purposes, let's assume we want to show the "authenticated" header state on HomePage
    // to easily access the "Panel Principal" button.
    // In a real app, this would be driven by actual authentication state.
    bool isDemoAuthenticated = true;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: RecreatedHeader(
        currentPage: 'home',
        isAuthenticated: isDemoAuthenticated, // Using demo authenticated state
        onNavigate: (pageKey) => _handleNavigation(context, pageKey),
      ),
      endDrawer: RecreatedMobileDrawer(
        // Pass isAuthenticated to drawer if it needs to conditionally show items
        // For now, its internal logic for showing auth items is based on onNavigate != null
        onNavigate: (pageKey) => _handleNavigation(context, pageKey),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildHeroSection(context),
            _buildStatsSection(context),
            _buildCategoriesSection(context),
            _buildFeaturesSection(context),
            _buildCtaSection(context),
          ],
        ),
      ),
    );
  }

  // ... (rest of the _build<SectionName> methods remain the same as before) ...
  // Omitting them here for brevity as they don't change for this step.
  // Assume they are identical to the previous version of RecreatedHomePage.

  Widget _buildHeroSection(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
          horizontal: MySize.size16, vertical: MySize.size64),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue[700], Colors.blue[800], Colors.blue[900]],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: LayoutBuilder(builder: (context, constraints) {
        bool isLargeScreen = constraints.maxWidth > 768;
        return Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Conectamos servicios con",
                    style: TextStyle(
                        fontSize: MySize.getScaledSize(isLargeScreen ? 48 : 36),
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        height: 1.2),
                  ),
                  Text(
                    "confianza",
                    style: TextStyle(
                        fontSize: MySize.getScaledSize(isLargeScreen ? 48 : 36),
                        fontWeight: FontWeight.bold,
                        color: Colors.blue[300],
                        height: 1.2),
                  ),
                  SizedBox(height: MySize.size24),
                  Text(
                    "La plataforma líder en Perú para encontrar trabajadores verificados para tus necesidades del hogar y negocio.",
                    style: TextStyle(
                        fontSize: MySize.getScaledSize(18),
                        color: Colors.blue[100],
                        height: 1.5),
                  ),
                  SizedBox(height: MySize.size32),
                  Wrap(
                    spacing: MySize.size16,
                    runSpacing: MySize.size16,
                    children: [
                      ElevatedButton.icon(
                        icon: Icon(LucideIcons.search, size: MySize.size20),
                        label: Text("Buscar Servicio"),
                        onPressed: () => _handleNavigation(context, 'auth_register'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.blue[700],
                          padding: EdgeInsets.symmetric(
                              horizontal: MySize.size32, vertical: MySize.size16),
                          textStyle: TextStyle(fontSize: MySize.getScaledSize(16), fontWeight: FontWeight.w600),
                        ),
                      ),
                      ElevatedButton.icon(
                        icon: Icon(LucideIcons.users, size: MySize.size20),
                        label: Text("Ofrecer Servicio"),
                        onPressed: () => _handleNavigation(context, 'auth_register'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green[600],
                          foregroundColor: Colors.white,
                          padding: EdgeInsets.symmetric(
                              horizontal: MySize.size32, vertical: MySize.size16),
                          textStyle: TextStyle(fontSize: MySize.getScaledSize(16), fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
            if (isLargeScreen)
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(left: MySize.size48),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(MySize.size16),
                    child: Image.network(
                      'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                      height: MySize.getScaledSize(300),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
          ],
        );
      }),
    );
  }

  Widget _buildStatsSection(BuildContext context) {
    return Container(
      color: Colors.grey[50],
      padding: EdgeInsets.symmetric(vertical: MySize.size64, horizontal: MySize.size16),
      child: LayoutBuilder(
        builder: (context, constraints) {
          int crossAxisCount = constraints.maxWidth < 600 ? 2 : 4;
          return GridView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: crossAxisCount,
              childAspectRatio: 2.0,
              mainAxisSpacing: MySize.size32,
              crossAxisSpacing: MySize.size32,
            ),
            itemCount: stats.length,
            itemBuilder: (context, index) {
              final stat = stats[index];
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    stat["number"],
                    style: TextStyle(
                        fontSize: MySize.getScaledSize(constraints.maxWidth < 600 ? 28: 36),
                        fontWeight: FontWeight.bold,
                        color: Colors.blue[700]),
                  ),
                  SizedBox(height: MySize.size4),
                  Text(
                    stat["label"],
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: MySize.getScaledSize(14), color: Colors.grey[600]),
                  ),
                ],
              );
            },
          );
        }
      ),
    );
  }

  Widget _buildCategoriesSection(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: MySize.size64, horizontal: MySize.size16),
      child: Column(
        children: [
          Text(
            "Servicios Populares",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: MySize.getScaledSize(30),
                fontWeight: FontWeight.bold,
                color: Colors.grey[900]),
          ),
          SizedBox(height: MySize.size16),
          Text(
            "Encuentra el profesional perfecto para cualquier tarea en tu hogar o negocio",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: MySize.getScaledSize(18),
                color: Colors.grey[600],
                ),
            maxLines: 2,
          ),
          SizedBox(height: MySize.size48),
          LayoutBuilder(
            builder: (context, constraints) {
              int crossAxisCount = constraints.maxWidth < 600 ? 2 : (constraints.maxWidth < 900 ? 3 : 4);
              return GridView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  childAspectRatio: 0.9,
                  mainAxisSpacing: MySize.size24,
                  crossAxisSpacing: MySize.size24,
                ),
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  final category = categories[index];
                  return Card(
                    elevation: 2.0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(MySize.size12),
                      side: BorderSide(color: Colors.grey[100], width: 1),
                    ),
                    child: InkWell(
                      onTap: () {
                        print("Category ${category['name']} tapped");
                      },
                      borderRadius: BorderRadius.circular(MySize.size12),
                      child: Padding(
                        padding: EdgeInsets.all(MySize.size16),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: MySize.size48,
                              height: MySize.size48,
                              decoration: BoxDecoration(
                                color: category["color"] as Color,
                                borderRadius: BorderRadius.circular(MySize.size8),
                              ),
                              child: Icon(category["icon"] as IconData, color: category["textColor"] as Color, size: MySize.size24),
                            ),
                            SizedBox(height: MySize.size16),
                            Text(
                              category["name"] as String,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  fontSize: MySize.getScaledSize(16),
                                  fontWeight: FontWeight.w600,
                                  color: Colors.grey[900]),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            }
          ),
        ],
      ),
    );
  }

   Widget _buildFeaturesSection(BuildContext context) {
    return Container(
      color: Colors.grey[50],
      padding: EdgeInsets.symmetric(vertical: MySize.size64, horizontal: MySize.size16),
      child: Column(
        children: [
          Text(
            "¿Por qué elegir ServiPerú?",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: MySize.getScaledSize(30),
                fontWeight: FontWeight.bold,
                color: Colors.grey[900]),
          ),
          SizedBox(height: MySize.size16),
          Text(
            "Ofrecemos la plataforma más confiable y segura para conectar con profesionales",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: MySize.getScaledSize(18), color: Colors.grey[600]),
            maxLines: 2,
          ),
          SizedBox(height: MySize.size48),
          LayoutBuilder(
            builder: (context, constraints) {
              bool isSmallScreen = constraints.maxWidth < 768;
              return Flex(
                direction: isSmallScreen ? Axis.vertical : Axis.horizontal,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.center,
                children: features.map((feature) {
                  Widget card = Card(
                    elevation: 1.0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(MySize.size12)),
                    child: Padding(
                      padding: EdgeInsets.all(MySize.size32),
                      child: Column(
                        children: [
                          Container(
                            width: MySize.size64,
                            height: MySize.size64,
                            decoration: BoxDecoration(
                              color: Colors.blue[100],
                              shape: BoxShape.circle,
                            ),
                            child: Icon(feature["icon"] as IconData, size: MySize.size32, color: Colors.blue[700]),
                          ),
                          SizedBox(height: MySize.size24),
                          Text(
                            feature["title"] as String,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                fontSize: MySize.getScaledSize(20),
                                fontWeight: FontWeight.w600,
                                color: Colors.grey[900]),
                          ),
                          SizedBox(height: MySize.size16),
                          Text(
                            feature["description"] as String,
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: MySize.getScaledSize(14), color: Colors.grey[600], height: 1.5),
                          ),
                        ],
                      ),
                    ),
                  );
                  if (isSmallScreen) {
                    return Padding(
                      padding: EdgeInsets.only(bottom: MySize.size32),
                      child: card,
                    );
                  } else {
                    return Expanded(child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: MySize.size16),
                      child: card,
                    ));
                  }
                }).toList(),
              );
            }
          ),
        ],
      ),
    );
  }

  Widget _buildCtaSection(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: MySize.size64, horizontal: MySize.size16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.green[600], Colors.green[700]],
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ),
      ),
      child: Column(
        children: [
          Text(
            "¿Listo para empezar?",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: MySize.getScaledSize(30),
                fontWeight: FontWeight.bold,
                color: Colors.white),
          ),
          SizedBox(height: MySize.size24),
          Text(
            "Únete a miles de peruanos que ya confían en ServiPerú para sus necesidades de servicio",
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: MySize.getScaledSize(18),
                color: Colors.green[100]),
            maxLines: 3,
          ),
          SizedBox(height: MySize.size32),
          Wrap(
            spacing: MySize.size16,
            runSpacing: MySize.size16,
            alignment: WrapAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () => _handleNavigation(context, 'auth_register'),
                child: Text("Crear Cuenta Gratis"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.green[700],
                  padding: EdgeInsets.symmetric(horizontal: MySize.size32, vertical: MySize.size16),
                  textStyle: TextStyle(fontSize: MySize.getScaledSize(16), fontWeight: FontWeight.w600),
                ),
              ),
              OutlinedButton(
                onPressed: () => _handleNavigation(context, 'auth_login'),
                child: Text("Iniciar Sesión"),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.white,
                  side: BorderSide(color: Colors.white, width: 2),
                  padding: EdgeInsets.symmetric(horizontal: MySize.size32, vertical: MySize.size16),
                  textStyle: TextStyle(fontSize: MySize.getScaledSize(16), fontWeight: FontWeight.w600),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
// Note: The build<SectionName> methods are identical to the previous version and are included for completeness
// of the file recreation. The main changes are the import of RecreatedClientDashboardPage
// and the updated _handleNavigation method.
// Also, a boolean `isDemoAuthenticated` is added to easily toggle header state for testing navigation.

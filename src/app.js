export class App {
  constructor() {
    this.message = 'Hello World';
  }

  configureRouter(config, router) {
    config.title = 'Lord\'s Blog';
    config.map([
      {route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All posts'},
      {route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'A post'}
    ]);
    this.router = router;
  }
}

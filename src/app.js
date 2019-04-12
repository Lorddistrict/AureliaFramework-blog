import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from "./common/services/auth-service";
import {PostService} from "./common/services/post-service";

@inject(EventAggregator, AuthService, PostService)
export class App {

  constructor(EventAggregator, AuthService, PostService) {
    this.ea = EventAggregator;
    this.authService = AuthService;
    this.postService = PostService;
  }

  attached(){

    this.currentUser = this.authService.currentUser;
    // We need to click the SUBSCRIBE button to listen for data that will be published in future.
    this.subscription = this.ea.subscribe('myEventName', user => {
      this.currentUser = this.authService.currentUser;
    });

    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });

    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    });

  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Lord\'s Blog';
    config.map([
      {route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All posts'},
      {route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      {route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'A post'},
      {route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Posts by Tags'},
      {route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'View Posts by Archive'}
    ]);
  }

  detached(){
    // We can also detach our subscriber by clicking the DISPOSE button.
    this.subscription.dispose();
  }

  logout(){
    this.authService.logout().then(data => {
      this.ea.publish('myEventName', null);
    }).catch(error => {
      this.error = error.message;
    });
  }

}

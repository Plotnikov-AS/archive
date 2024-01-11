import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    guestOnly?: boolean;
  }

  interface RouteLocationNamedRaw {
    name?: RouteRecordName;
  }
}

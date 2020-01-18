import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CorsInterceptorService } from "./cors-interceptor.service";

/**
 * Http interceptors providers.
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptorService, multi: true }
];

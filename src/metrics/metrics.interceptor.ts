import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const response = context.switchToHttp().getResponse();

    const start = process.hrtime();

    return next.handle().pipe(
      tap(() => {
        const diff = process.hrtime(start);

        const duration = diff[0] + diff[1] / 1e9;

        const route =
          request.route?.path ||
          request.originalUrl ||
          request.url;

        const labels = {
          method: request.method,
          route,
          status_code: response.statusCode.toString(),
        };

        this.metrics.httpRequestsTotal.inc(labels);

        this.metrics.httpRequestDuration.observe(
          labels,
          duration,
        );
      }),
    );
  }
}
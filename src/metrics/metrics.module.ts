import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsInterceptor } from './metrics.interceptor';

@Module({
  providers: [
    MetricsService,
    MetricsInterceptor,
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
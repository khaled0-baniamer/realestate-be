import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './shared/middlewares';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  BacklazeModule,
  BathroomsModule,
  BedroomsModule,
  CitiesModule,
  CountriesModule,
  DistrictsModule,
  FurnishedModule,
  PropertiesModule,
  TypesModule,
  UsersModule,
} from './modules';
import { AmenityModule } from './modules/amenity/amenity.module';
import { ListingAmenitiesModule } from './modules/listing-amenities/listing-amenities.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    UsersModule,
    CitiesModule,
    BathroomsModule,
    BedroomsModule,
    CountriesModule,
    DistrictsModule,
    FurnishedModule,
    TypesModule,
    PropertiesModule,
    AmenityModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    BacklazeModule,
    ListingAmenitiesModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './services/appointments/appointments.module';
import { LocationsModule } from './services/locations/locations.module';
import { StaffsModule } from './services/staffs/staffs.module';
import { ClientsModule } from './services/clients/clients.module';
import { UsersModule } from './services/users/users.module';
import { CompaniesModule } from './services/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AppointmentsModule,
    LocationsModule,
    StaffsModule,
    ClientsModule,
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

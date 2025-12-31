import { Module } from "@nestjs/common";
import { AppointmentsModule } from "./appointments/appointments.module";
import { LocationsModule } from "./locations/locations.module";
import { StaffsModule } from "./staffs/staffs.module";
import { ClientsModule } from "./clients/clients.module";
import { CompaniesModule } from "./companies/companies.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { PermissionsModule } from "./permissions/permissions.module";

@Module({
	imports: [
        AppointmentsModule,
        ClientsModule,
        CompaniesModule,
        LocationsModule,
        StaffsModule,
        UsersModule,
        RolesModule,
        PermissionsModule,
	],
})
export class ServicesIndexModule {}

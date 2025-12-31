import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocationsSeed1767173000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const rows = [
			{ type: 'CLIENT_HOME', state: 'NSW', city: 'Sydney', lon: 151.2093, lat: -33.8688, notes: 'Client home NSW 1' },
			{ type: 'CLIENT_HOME', state: 'VIC', city: 'Melbourne', lon: 144.9631, lat: -37.8136, notes: 'Client home VIC 1' },
			{ type: 'CLIENT_HOME', state: 'QLD', city: 'Brisbane', lon: 153.0251, lat: -27.4698, notes: 'Client home QLD 1' },
			{ type: 'COMMUNITY', state: 'NSW', city: 'Sydney', lon: 151.2167, lat: -33.8731, notes: 'Community NSW 1' },
			{ type: 'COMMUNITY', state: 'VIC', city: 'Melbourne', lon: 144.9717, lat: -37.81, notes: 'Community VIC 1' },
			{ type: 'COMMUNITY', state: 'QLD', city: 'Brisbane', lon: 153.033, lat: -27.47, notes: 'Community QLD 1' },
			{ type: 'SITE_BASED', state: 'NSW', city: 'Sydney', lon: 151.2, lat: -33.87, notes: 'Site based NSW 1' },
			{ type: 'SITE_BASED', state: 'VIC', city: 'Melbourne', lon: 144.95, lat: -37.82, notes: 'Site based VIC 1' },
			{ type: 'SITE_BASED', state: 'QLD', city: 'Brisbane', lon: 153.02, lat: -27.46, notes: 'Site based QLD 1' },
			{ type: 'STAFF_PREFERERED_AREA', state: 'NSW', city: 'Sydney', lon: 151.19, lat: -33.86, notes: 'Staff preferred NSW 1' },
			{ type: 'STAFF_PREFERERED_AREA', state: 'VIC', city: 'Melbourne', lon: 144.99, lat: -37.81, notes: 'Staff preferred VIC 1' },
			{ type: 'STAFF_PREFERERED_AREA', state: 'QLD', city: 'Brisbane', lon: 153.04, lat: -27.48, notes: 'Staff preferred QLD 1' },
			{ type: 'COMPANY_LOCATION', state: 'NSW', city: 'Sydney', lon: 151.23, lat: -33.87, notes: 'Company location NSW 1' },
			{ type: 'COMPANY_LOCATION', state: 'VIC', city: 'Melbourne', lon: 144.96, lat: -37.79, notes: 'Company location VIC 1' },
			{ type: 'COMPANY_LOCATION', state: 'QLD', city: 'Brisbane', lon: 153.01, lat: -27.44, notes: 'Company location QLD 1' },
		];

		const valuesSql = rows
			.map(
				(r) =>
					`('${r.type}','${r.state}','${r.city}',` +
					`${r.lon && r.lat ? `'SRID=4326;POINT(${r.lon} ${r.lat})'::geography` : 'NULL'},` +
					`${r.notes ? `'${r.notes}'` : 'NULL'})`,
			)
			.join(',');

		await queryRunner.query(`
			INSERT INTO "locations" ("type","state","city","location","notes")
			VALUES ${valuesSql};
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const types = [
			'CLIENT_HOME',
			'COMMUNITY',
			'SITE_BASED',
			'STAFF_PREFERERED_AREA',
			'COMPANY_LOCATION',
		];
		const cities = ['Sydney', 'Melbourne', 'Brisbane'];
		await queryRunner.query(`
			DELETE FROM "locations"
			WHERE type IN (${types.map((t) => `'${t}'`).join(',')})
        	AND city IN (${cities.map((c) => `'${c}'`).join(',')});
    	`);
	}
}

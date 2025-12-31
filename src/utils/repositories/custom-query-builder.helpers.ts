import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsRequest } from '../dto/pagination-options.request';

export class CustomQueryBuilderHelper<T extends ObjectLiteral> {
	protected queryBuilder: SelectQueryBuilder<T>;

	constructor(queryBuilder: SelectQueryBuilder<T>) {
		this.queryBuilder = queryBuilder;
	}

	/** ****************************************************************** **/
	/**                             Get Data                               **/
	/** ****************************************************************** **/

	async getRawMany() {
		return await this.queryBuilder.getRawMany();
	}

	async getSingleData() {
		return await this.queryBuilder.getOne();
	}

	async getListData() {
		return await this.queryBuilder.getMany();
	}

	async getListDataDesc(columnName: string) {
		return await this.queryBuilder.orderBy(columnName, 'DESC').getMany();
	}
	async getListDataAsc(columnName: string) {
		return await this.queryBuilder.orderBy(columnName, 'ASC').getMany();
	}

	async getPaginationMetadata(paginationOptions: PaginationOptionsRequest, filterCondition: Object) {
		const { page, itemPerPage } = paginationOptions;

		const totalItems = await this.queryBuilder.getCount();
		const totalPages = Math.ceil(totalItems / itemPerPage);
		const currentPage = page == 0 ? 1 : page;

		let queryStrings = `item_per_page=${itemPerPage}`;
		for (const key in filterCondition) {
			const value = filterCondition[key];
			queryStrings = queryStrings.concat(`&${key}=${value}`);
		}

		const currentUrl = `?page=${currentPage}&${queryStrings}`;
		const previousUrl = currentPage <= 1 ? null : `?page=${currentPage - 1}&${queryStrings}`;
		const nextUrl = currentPage >= totalPages ? null : `?page=${currentPage + 1}&${queryStrings}`;

		return {
			totalItems,
			totalPages,
			itemPerPage,
			currentPage,
			currentUrl,
			previousUrl,
			nextUrl,
		};
	}

	/** ****************************************************************** **/
	/**                      Join & Search Condition                       **/
	/** ****************************************************************** **/

	select(selection: string) {
		this.queryBuilder.select(selection);
		return this;
	}

	leftJoinAndSelect(tableName: string, alias: string, condition?: string): this {
		this.queryBuilder.leftJoinAndSelect(tableName, alias, condition);
		return this;
	}

	where(
		where: string | Brackets | ((qb: SelectQueryBuilder<T>) => string) | ObjectLiteral | ObjectLiteral[],
		parameters?: ObjectLiteral
	): this {
		this.queryBuilder.where(where, parameters);
		return this;
	}

	andWhere(
		where: string | Brackets | ((qb: SelectQueryBuilder<T>) => string) | ObjectLiteral | ObjectLiteral[],
		parameters?: ObjectLiteral
	): this {
		this.queryBuilder.andWhere(where, parameters);
		return this;
	}

	generateSkipAndLimit(paginationOptions: PaginationOptionsRequest): this {
		const { page, itemPerPage } = paginationOptions;
		const currentPage = page === 0 ? 1 : page;
		const skipValue = (currentPage - 1) * itemPerPage;

		this.generateSkip(skipValue);
		this.generateLimit(itemPerPage);
		return this;
	}

	generateSkip(skip: number): this {
		this.queryBuilder.skip(skip);
		return this;
	}

	generateLimit(limit: number): this {
		this.queryBuilder.take(limit);
		return this;
	}

	/** ****************************************************************** **/
	/**                              Debug                                 **/
	/** ****************************************************************** **/

	getQueryAndParams() {
		const query = this.queryBuilder.getQueryAndParameters()[0];
		const params = this.queryBuilder.getQueryAndParameters()[1];
		return { query, params };
	}
}

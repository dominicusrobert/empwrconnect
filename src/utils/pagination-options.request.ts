export class PaginationOptionsRequest {
	itemPerPage?: number;
	page?: number;

	constructor(paginationOptions: any) {
		this.itemPerPage = paginationOptions?.itemPerPage ?? 10;
		this.page = paginationOptions?.page ?? 1;
	}
}

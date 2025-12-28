export class PaginationMongooseResultResponse<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPagePage: boolean;
	prevPage: number;
	nextPage: number;
}

export class PaginationMongooseMetadata {
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPagePage: boolean;
	prevPage: number;
	nextPage: number;
}

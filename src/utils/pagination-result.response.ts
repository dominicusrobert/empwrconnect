export class PaginationResultResponse<T> {
	data: T[];
	paginationMetadata?: PaginationMetadata;
}

export class PaginationMetadata {
	totalItems: number;
	totalPages: number;
	itemPerPage: number;
	currentPage: number;
	currentUrl: string;
	previousUrl: string;
	nextUrl: string;
}

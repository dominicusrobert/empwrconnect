export class BaseResponse<T> {
	message: string;
	error: string;
	data: T;

	constructor(partial: Partial<BaseResponse<T>>) {
		Object.assign(this, partial);
	}

	static successResponse<T>(data: T, message: string): BaseResponse<T> {
		return new BaseResponse({
			message,
			data,
		});
	}

	static errorResponse<T>(message: string, error: string): BaseResponse<T> {
		return new BaseResponse({
			message,
			error,
		});
	}
}

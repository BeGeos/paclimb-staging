type HTTPStatusResponse = {
	status: number;
	text: string;
	response?: string;
};

export const http_200: HTTPStatusResponse = {
	status: 200,
	text: 'OK'
};

export const http_500: HTTPStatusResponse = {
	status: 500,
	text: 'Internal Server Error'
};

export const http_404: HTTPStatusResponse = {
	status: 404,
	text: 'Not Found'
};

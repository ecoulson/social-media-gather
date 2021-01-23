export default interface IErrorBody {
    error: {
        message: string;
        stack: string;
        name: string;
    };
}

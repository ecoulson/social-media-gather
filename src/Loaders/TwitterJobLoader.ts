import TwitterRefreshJob from "../Jobs/TwitterRefreshJob";

export default (): void => {
    TwitterRefreshJob();
    setInterval(() => {
        TwitterRefreshJob();
    }, 10 * 60 * 1000);
};

import WebhookRefreshJob from "../Jobs/WebhookRefreshJob";

export default (): void => {
    const threshold = new Date();
    threshold.setSeconds(24 * 60 * 60);
    WebhookRefreshJob(threshold);
    setInterval(() => {
        const threshold = new Date();
        threshold.setSeconds(24 * 60 * 60);
        WebhookRefreshJob(threshold);
    }, 12 * 60 * 60 * 1000);
};

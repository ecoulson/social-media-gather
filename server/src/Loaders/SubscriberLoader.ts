import Types from "../@Types/Types";
import container from "../bootstrap";
import IChannelService from "../Services/Channel/IChannelService";
import IMessageQueue from "../Services/MessageQueue/IMessageQueue";
import ChannelSubscriber from "../Subscribers/ChannelSubscriber";

export default () => {
    const messageQueue = container.get<IMessageQueue>(Types.MessageQueue);
    new ChannelSubscriber(container.get<IChannelService>(Types.ChannelService), messageQueue);
};

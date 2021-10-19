import StatCard from "../StatCard";

const MessageCount = ({conversation}) => {
    return (
        <StatCard>
            <p>Łącznie wiadomości</p>
            <div className="flex h-full justify-center items-center">
                <p className="text-3xl">{conversation.messages.length || ""}</p>
            </div>
        </StatCard>
    )
}
export default MessageCount

const MessageCount = ({conversation}) => {
    return (
        <div className="p-5 border">
            <p>Łącznie wiadomości</p>
            <p>{conversation.messages.length}</p>
        </div>
    )
}
export default MessageCount

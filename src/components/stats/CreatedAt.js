const CreatedAt = ({conversation}) => {

    function createdAtDate() {
        if (conversation && conversation.messages[0]) {
            const date = new Date(conversation.messages[0].timestamp_ms);
            console.log(date.toLocaleDateString());
            return date.toLocaleDateString()
        }
    }
    return (
        <div className="p-5 border">
            <p>Data założenia</p>
            <p>{conversation && createdAtDate()}</p>
        </div>
    )
}
export default CreatedAt

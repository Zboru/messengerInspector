import StatCard from "../StatCard";

const CreatedAt = ({conversation}) => {

    function createdAtDate() {
        if (conversation && conversation.messages[0]) {
            const date = new Date(conversation.messages[0].timestamp_ms);
            console.log(date.toLocaleDateString());
            return date.toLocaleDateString()
        }
    }
    return (
        <StatCard>
            <p>Data założenia</p>
            <p className="flex justify-center items-center text-3xl h-full">{conversation && createdAtDate()}</p>
        </StatCard>
    )
}
export default CreatedAt

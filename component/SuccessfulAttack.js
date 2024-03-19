export default function SuccessfulAttack({index, score}) {
    return(
        <p className={`w-full pb-2 pt-2`}>✅ attack {index}: {score}</p>
    )
}
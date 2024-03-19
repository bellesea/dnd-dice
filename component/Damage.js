export default function Damage({index, score, damageType}) {
    return(
        <p className={`w-full`}>{score} {damageType}</p>
    )
}
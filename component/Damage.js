export default function Damage({index, score, damageType}) {
    return(
        <p className={`w-full`}>total damage: {score} {damageType}</p>
    )
}
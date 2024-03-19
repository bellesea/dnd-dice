import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Attack from "../component/Attack";
import Damage from "../component/Damage";
import SuccessfulAttack from "../component/SuccessfulAttack";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [attack, setAttack] = useState({
    repeats: 0,
    modifier: 0,
    advantage: false,
    disadvantage: false,
    bless: false,
    bane: false,
    armour: 0,
  });

  const [damage, setDamage] = useState({
    repeats: 0,
    side: 1,
    modifier: 0,
    type: "",
  });

  const [attackList, setAttackList] = useState([]);
  const [damageList, setDamageList] = useState([]);
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    if (!showForm) {
      document.getElementById("form").style.display = "none";
      document.getElementById("result").style.display = "block";
    } else {
      document.getElementById("form").style.display = "block";
      document.getElementById("result").style.display = "none";
    }
  }, [showForm]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
  }

  function calculate() {
    let sum = 0;
    let newAttack = [];
    let successfulAttack = 0;

    for (let i = 0; i < attack.repeats; i++) {
      let attackPoint = 0;
      if (attack.advantage) {
        let a = getRandomInt(20);
        let b = getRandomInt(20);
        attackPoint = Math.max(a, b);
      } else if (attack.disadvantage) {
        let a = getRandomInt(20);
        let b = getRandomInt(20);
        attackPoint = Math.min(a, b);
      } else {
        attackPoint = getRandomInt(20);
      }

      attackPoint += parseInt(attack.modifier);

      if (attack.bless) {
        attackPoint += getRandomInt(4);
      } else if (attack.bane) {
        attackPoint -= getRandomInt(4);
      }

      if (attackPoint >= attack.armour) {
        newAttack.push(
          <SuccessfulAttack index={i + 1} score={attackPoint} />
        );
        sum += parseInt(attackPoint);
        successfulAttack += 1;
      } else {
        newAttack.push(
          <Attack index={i + 1} score={attackPoint} />
        );
      }
    }
    newAttack.push(<div className="mt-2">number of succesful attacks: {successfulAttack}</div>);

    setAttackList([newAttack]);

    //damage
    let total = 0;
    let damageTypes = {
      slashing: 0,
      piercing: 0,
      bludgeoning: 0,
      cold: 0,
      poison: 0,
      acid: 0,
      psychic: 0,
      fire: 0,
      necrotic: 0,
      radiant: 0,
      force: 0,
      thunder: 0,
      lightning: 0,
    };

    let newRepeats = damage.repeats * successfulAttack;
    let hurt = 0;
    let newDamage = [];
    let index = 1;

    for (let i = 0; i < newRepeats; i++) {
      hurt = getRandomInt(damage.side);
      hurt += parseInt(damage.modifier);

      for (let d in damageTypes) {
        if (d == damage.type) {
          damageTypes[d] += hurt;
          total += hurt;
        }
      }
    }

    for (let d in damageTypes) {
      if (damageTypes[d] != 0) {
        newDamage.push(
          <Damage score={damageTypes[d]} damageType={d} />
        );
        index += 1;
      }
    }

    setDamageList([newDamage])
    setShowForm(false)
  }

  function redo() {
    setShowForm(true)
  }

  return (
    <main
      className={`min-h-screen items-center w-10/12 max-w-2xl m-auto justify-center align-center text-white flex`}
    >
      <div id="form">
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl mb-3">dnd dice roller 🎲</h1>

        <div className="border w-full p-2 rounded mb-3">
          <h2 className="font-bold text-xl sm:text-3xl pb-3">attack</h2>
          <div className="mb-2 flex">
            <p className="font-bold mr-8">repeats </p>
            <input
              onChange={(e) =>
                setAttack({ ...attack, repeats: e.target.value })
              }
              type="number"
              name="repeats"
              id="repeats"
              min="1"
              max="100"
              className="bg-transparent border rounded w-full pl-1"
              required
            ></input>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-[26px]">modifier </p>
            <input
              onChange={(e) =>
                setAttack({ ...attack, modifier: e.target.value })
              }
              type="number"
              name="modifier"
              id="modifier"
              min="1"
              max="100"
              className="bg-transparent border rounded w-full pl-1"
              required
            ></input>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-4">armour class </p>
            <input
              onChange={(e) => setAttack({ ...attack, armour: e.target.value })}
              type="number"
              name="armour"
              id="armour"
              min="1"
              max="20"
              className="bg-transparent border rounded w-full pl-1"
              required
            ></input>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-2">advantage/disadvantage</p>
            <select
              onChange={(e) =>
                setAttack({
                  ...attack,
                  advantage: e.target.value == "advantage",
                  disadvantage: e.target.value == "disadvantage",
                })
              }
              type="number"
              name="ad-dis"
              id="ad-dis"
              min="1"
              max="100"
              className="bg-transparent border rounded w-full pl-1"
              required
            >
              <option value="none">none</option>
              <option value="advantage">advantage</option>
              <option value="disadvantage">disadvantage</option>
            </select>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-2">bless/bane</p>
            <select
              onChange={(e) =>
                setAttack({
                  ...attack,
                  bless: e.target.value == "bless",
                  bane: e.target.value == "bane",
                })
              }
              type="number"
              name="bless-bane"
              id="bless-bane"
              min="1"
              max="100"
              className="bg-transparent border rounded w-full pl-1"
              required
            >
              <option value="none">none</option>
              <option value="bless">bless</option>
              <option value="bane">bane</option>
            </select>
          </div>
        </div>
        <div className="border w-full p-2 rounded mb-3">
          <h2 className="font-bold pb-3 text-xl sm:text-3xl">damage</h2>
          <div className="mb-2 flex">
            <p className="font-bold mr-5">dice type </p>
            <input
              onChange={(e) =>
                setDamage({ ...damage, repeats: e.target.value })
              }
              type="number"
              name="d-repeats"
              id="d-repeats"
              min="1"
              max="100"
              className="bg-transparent border rounded w-1/3 mr-1 pl-1"
            ></input>
            d
            <input
              onChange={(e) => setDamage({ ...damage, side: e.target.value })}
              type="number"
              name="d-side"
              id="d-side"
              min="1"
              max="100"
              className="bg-transparent border rounded w-1/3 ml-1 pl-1"
              required
            ></input>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-7">modifier </p>
            <input
              onChange={(e) =>
                setDamage({ ...damage, modifier: e.target.value })
              }
              type="number"
              name="d-modifier"
              id="d-modifier"
              min="1"
              max="100"
              className="bg-transparent border rounded w-full pl-1"
              required
            ></input>
          </div>
          <div className="mb-2 flex">
            <p className="font-bold mr-4">damage type </p>
            <select
              id="damageTypeSelect"
              onChange={(e) => setDamage({ ...damage, type: e.target.value })}
              className="bg-transparent border rounded w-full"
            >
              <option value="none">None</option>
              <option value="slashing">Slashing</option>
              <option value="piercing">Piercing</option>
              <option value="bludgeoning">Bludgeoning</option>
              <option value="cold">Cold</option>
              <option value="poison">Poison</option>
              <option value="acid">Acid</option>
              <option value="psychic">Psychic</option>
              <option value="fire">Fire</option>
              <option value="necrotic">Necrotic</option>
              <option value="radiant">Radiant</option>
              <option value="force">Force</option>
              <option value="thunder">Thunder</option>
              <option value="lightning">Lightning</option>
            </select>
          </div>
        </div>
        <button className="text-black bg-white rounded p-2" onClick={calculate}>
          calculate
        </button>
      </div>
      <div id="result">
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl mb-3">results</h1>
        <h2 className="text-2xl tracking-tight font-bold sm:text-3xl mb-3">attacks ⚔️</h2>

        {attackList.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
        <br />
        <h2 className="text-2xl tracking-tight font-bold sm:text-3xl mb-3">damage ❤️‍🩹</h2>
        {damageList.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
        <button className="text-black bg-white rounded p-2 mt-3" onClick={redo}>
          redo
        </button>
      </div>
    </main>
  );
}

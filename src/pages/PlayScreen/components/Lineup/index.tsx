/* eslint-disable */
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { getUserAthletesApi } from "../../../../helpers/lambda.helpers";
import { AthleteSelectModal } from "../../modals/AthleteSelectModal";

import EmptyEXP from "../../../../assets/empty-exp.svg";
import EmptyGold from "../../../../assets/empty-gold.svg";
import EmptyJungle from "../../../../assets/empty-jungle.svg";
import EmptyMid from "../../../../assets/empty-mid.svg";
import EmptyRoam from "../../../../assets/empty-roam.svg";

export const Lineup = () => {
  const [showAthleteSelectModal, setShowAthleteSelectModal] = useState<boolean>(
    false
  );

  const [tonConnectUI] = useTonConnectUI();

  const [userAthletes, setUserAthletes] = useState([])

  const [counter, setCounter] = useState(0)
  const [roam, setRoam] = useState(null)
  const [mid, setMid] = useState(null)
  const [exp, setExp] = useState(null)
  const [jungle, setJungle] = useState(null)
  const [gold, setGold] = useState(null)

  const onSelectAthlete = (athlete) => {
    if(counter == 0) {
      setRoam(athlete)
      setCounter(1)
    }
    if(counter == 1){
      setMid(athlete)
      setCounter(2)
    }
    if(counter == 2){
      setExp(athlete)
      setCounter(3)
    }
    if(counter == 3){
      setJungle(athlete)
      setCounter(4)
    }
    if(counter == 4){
      setGold(athlete)
    }
  }

  const getUserAthletes = async () => {
    const res = await getUserAthletesApi(tonConnectUI.account?.address!);
    setUserAthletes(res);
  }

  const displayAthleteSelectModal = () => {
    setShowAthleteSelectModal(true);
  };

  const closeAthleteSelectModal = () => {
    setShowAthleteSelectModal(false);
  };

  useEffect(() => {
    if(!(userAthletes.length > 0)) {
      getUserAthletes()
    }
  }, [])

  return (
    <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
      <button
        className="relative animate-appear flex h-[37vw] w-[28vw]"
        onClick={displayAthleteSelectModal}
      >
        <img className="h-[100%]" src={roam ? roam.img :EmptyRoam} />
      </button>
      {showAthleteSelectModal && (
        <AthleteSelectModal cancel={closeAthleteSelectModal} athletes={userAthletes} submission={onSelectAthlete}/>
      )}
      <button className="relative animate-appear flex h-[37vw] w-[28vw]"
        onClick={displayAthleteSelectModal}>
        <img className="h-[100%]" src={mid ? mid.img : EmptyMid} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]"
        onClick={displayAthleteSelectModal}>
        <img className="h-[100%]" src={jungle ? jungle.img :EmptyJungle} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]"
        onClick={displayAthleteSelectModal}>
        <img className="h-[100%]" src={gold ? gold.img :EmptyGold} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]"
        onClick={displayAthleteSelectModal}>
        <img className="h-[100%]" src={exp ? exp.img: EmptyEXP} />
      </button>
    </div>
  );
};

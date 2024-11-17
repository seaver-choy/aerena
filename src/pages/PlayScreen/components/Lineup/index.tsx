/* eslint-disable */
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
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
        <img className="h-[100%]" src={EmptyRoam} />
      </button>
      {showAthleteSelectModal && (
        <AthleteSelectModal cancel={closeAthleteSelectModal} />
      )}
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyMid} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyJungle} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyGold} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyEXP} />
      </button>
    </div>
  );
};

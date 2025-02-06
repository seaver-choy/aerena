import { Layout } from "../../components/Layout";
import Upgrading from "../../assets/others/upgrading.svg";
import { useState } from "react";
import { Modal } from "./modal";

export const QuestsScreen = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const displayModal = () => {
        setShowModal(true);
    };

    return (
        <Layout>
            <div
                className="flex h-full items-center justify-center"
                onClick={displayModal}
            >
                <img className="h-[80vw] w-[80vw]" src={Upgrading} />
            </div>
            {showModal && <Modal />}
        </Layout>
    );
};

import { Layout } from "../../components/Layout";
import Upgrading from "../../assets/others/upgrading.svg";

export const QuestsScreen = () => {
    return (
        <Layout>
            <div className="flex h-full items-center justify-center">
                <img className="h-[80vw] w-[80vw]" src={Upgrading} />
            </div>
        </Layout>
    );
};

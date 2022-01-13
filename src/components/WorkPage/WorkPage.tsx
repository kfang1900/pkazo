import Header from "components/common/Header"
import { useNavigate, useParams } from "react-router-dom"
import contentStyle from 'styles/common/Content.module.scss';
import { WorkSummary } from "./WorkSummary";


export const WorkPage = () => {

    const { work_id } = useParams();

    if(!work_id) throw Error("Work ID Not specified");

    return <>
        <div className={contentStyle["content"]}>
            <Header navigate={useNavigate()} />
            <WorkSummary workId={work_id} />
        </div>

    </>
}
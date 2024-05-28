import { useEffect, useState } from "react";

import Loader from "../components/general/Loader/Loader";
import Content from "../components/EditPage/Content/Content";
import Header from "../components/EditPage/Header/Header";

import { getPage } from "../api/api";
import { useAsyncRequest } from "../hooks/useRequest.hook";
import { EditPageManager } from "../services";
import { PageObjects } from "../types";





const EditFile = () => {
    const [pageObject, setPageObject] = useState<PageObjects[]>([])
    const {data, loading, error} = useAsyncRequest({
        requestFunction: () => getPage(window.location.href.split('/')[window.location.href.split('/').length-1])
    })

    useEffect(() => {
        if (data) {
            setPageObject(data)
        }
    }, [data, loading])



    if (error) {
        return <div>TODO | ERROR</div>
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="page page--editFile">
            <Header pageName={EditPageManager.getPageName(pageObject)} />
            <Content objects={EditPageManager.renderObjects(pageObject)} />
        </div>
    )
}

export default EditFile;
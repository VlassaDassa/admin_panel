import { useEffect, useState } from "react";

import Loader from "../components/general/Loader/Loader";
import Content from "../components/EditPage/Content/Content";
import Header from "../components/EditPage/Header/Header";
import InfoSection from "../components/general/InfoSection/InfoSection";
import ErrorBoundary from "../components/general/ErrorBoundary/ErrorBoundary";

import { getPage } from "../api/api";
import { useAsyncRequest } from "../hooks/useRequest.hook";
import { EditPageManager, RenderManager } from "../services";
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
        return <InfoSection type='error' message='Ошибка на стороне сервера. Код ошибки - 505' addClass="center" />
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="page page--editFile">
            <Header
                pageName={EditPageManager.getPageName(pageObject)}
                pageObject={pageObject}
            />

            <ErrorBoundary>
                <Content
                    objects={RenderManager.renderObjects({ objects: pageObject, pageObjects: pageObject, setPageObject })} 
                    pageObject={pageObject} 
                    setPageObject={setPageObject}
                />
            </ErrorBoundary>
        </div>
    )
}

export default EditFile;
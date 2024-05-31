import { useEffect, useState } from "react";

import Header from "../components/ChoicePage/Header/Header";
import Content from "../components/ChoicePage/Content/Content";
import Footer from "../components/ChoicePage/Footer/Footer";
import Loader from "../components/general/Loader/Loader";

import { useAsyncRequest } from "../hooks/useRequest.hook";
import { MenuManager } from "../services";
import { getMenu } from "../api/api";
import { NavigationField } from "../types";




const ChoicePage = () => {
    const [findName, setFindName] = useState<string>('') 
    const [pages, setPages] = useState<NavigationField[]>([])
    const [perPage, setPerPage] = useState<number>(10)
    const [curPage, setCurPage] = useState<number>(1)
    const [countPages, setCountPages] = useState<number>(0)
    const {data, loading, error} = useAsyncRequest(({
        requestFunction: getMenu
    }))


    useEffect(() => {
        if (data) {
            var newData = data
            if (typeof data === 'string') {
                newData = JSON.parse(data)
            }

            if (findName.length > 0) {
                const navManager = new MenuManager(newData)
                const node = navManager.getNode(findName)

                setPages(node)
                return
            }
            setPages(newData)
        }
    }, [loading, data, findName])


    if (error) {
        return <div>TODO| ERROR</div>
    }

    return (
       <div className="page page--choicePage">
            <Header setFindName={setFindName} />

            {
                !loading && pages.length === 0 ?
                    <div>TODO | Empty</div> 
                :
                     null
            }

            {
                loading ?
                    <Loader />
                :
                    <Content 
                        pages={pages} 
                        curPage={curPage} 
                        perPage={perPage}
                        setCountPages={setCountPages} 
                    />
            }
            <Footer setCurPage={setCurPage} countPages={countPages} />
       </div>
    )
}

export default ChoicePage;
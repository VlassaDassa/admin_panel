import { useEffect, useState } from "react";

import FieldsContainer from "../components/EditContactFooter/FieldsContainer/FieldsContainer";
import Title from "../components/general/Title/Title";
import Button from "../components/general/Button/Button";
import InfoSection from "../components/general/InfoSection/InfoSection";
import Loader from "../components/general/Loader/Loader";
import Message from "../components/general/Message/Message";

import { useAsyncRequest } from "../hooks/useRequest.hook";
import { getFooterContacts, saveFooterContacts } from "../api/api";





interface FooterContacts {
    src: string,
    href: string,
    phone_number: string,
}

const EditContactFooter = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [href, setHref] = useState('')
    const [src, setSrc] = useState('')

    const [successShow, setSuccessShow] = useState(false)
    const [errorShow, setErrorShow] = useState(false)

    const [contacts, setContacts] = useState<FooterContacts>()
    const {data, loading, error} = useAsyncRequest(({
        requestFunction: getFooterContacts
    }))

    useEffect(() => {
        if (data) {
            setContacts(data)
            setSrc(data.src)
        }
    }, [data, loading])

    const saveChanges = () => {
        const sendData: FooterContacts = {phone_number: phoneNumber, href, src}
        saveFooterContacts(sendData)
        .then((response) => {
            if (!response) {
                setErrorShow(true)
                setTimeout(() => {
                    setErrorShow(false)
                }, 1000)
            }
            setSuccessShow(true)
            setTimeout(() => {
                setSuccessShow(false)
            }, 1000)
        })
        .catch((error) => {
            setErrorShow(true)
            setTimeout(() => {
                setErrorShow(false)
            }, 1000)
            console.error(error)
        })
    }

    if (error) {
        return <InfoSection type='error' message='Ошибка на стороне сервера. Код ошибки - 505' />
    }
    
    if (loading) {
        return <Loader />
    }

    if (contacts) {
        return (
            <div className="page page--editContactFooter">
                <Message show={successShow}  message='Успешное сохранение' type='success' />
                <Message show={errorShow}  message='Что-то пошло не так' type='error' />

                 <Title text='Изменение контактных данных в подвале' />
                 <FieldsContainer
                    contacts={contacts} 
                    setPhoneNumber={setPhoneNumber}
                    setHref={setHref}
                    setSrc={setSrc}
                    src={src}
                 />
                 <Button text='Сохранить' handler={saveChanges} />
            </div>
         ) 
    }
    else {
        return <InfoSection type='empty' message='Нет данных' />
    }
}

export default EditContactFooter;
import { FC } from 'react';
import Field from '../Field/Field';
import Icon from '../Icon/Icon';

import styles from './fieldsContainer.module.scss';


interface FooterContacts {
    src: string,
    href: string,
    phone_number: string,
}


interface FieldsContainerProps {
    contacts: FooterContacts;
    src: string;
    setPhoneNumber: (arg: string) => void;
    setHref: (arg: string) => void;
    setSrc: (arg: string) => void;
} 

const FieldsContainer: FC<FieldsContainerProps> = ({ contacts, setPhoneNumber, setHref, setSrc, src }) => {
    var baseUrl = 'http://www.uob-konakovo.ru/'
    var url = src

    if (src.includes('http')) {
        baseUrl = ''
    }
    
    else {
        url = baseUrl + src
    }

    return (
        <div className={styles.container}>
            <Field 
                value={contacts.phone_number} 
                label='Тел. номер' 
                name='phoneNumber' 
                setPhoneNumber={setPhoneNumber}
            />
            <Field 
                value={contacts.href} 
                label='Ссылка на соц.сеть' 
                name='linkSocialNetwork' 
                setHref={setHref}
            />
            <Icon 
                src={url} 
                name='Иконка соц.сети' 
                setSrc={setSrc}
            />
        </div>
    )
}

export default FieldsContainer;
import { ChangeEvent, FC } from 'react';
import styles from './searchField.module.scss';



interface SearchFieldProps {
    setFindName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField: FC<SearchFieldProps> = ({ setFindName }) => {

    function onChangeSearch(e:  ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value 
        setFindName(newValue)
    }

    return (
        <input 
            type="text" 
            placeholder='Поиск' 
            className={styles.input} 
            onChange={onChangeSearch} 
        />
    )
}

export default SearchField;
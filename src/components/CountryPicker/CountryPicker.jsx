import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect className={styles.selector} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="" className={styles.selectorValue}>Global</option>
                {fetchedCountries.map((country, i) => <option key={country} value={country} className={styles.selectorValue}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
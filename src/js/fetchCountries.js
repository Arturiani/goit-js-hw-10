import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryCard from './api/countryCard.hbs'
import countryItem from './api/countryItem.hbs'

const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

function fetchCountries(e) {
    e.preventDefault()
    const inputValue = document.querySelector('input').value.trim()
    const url = `https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`

    return fetch(url).then(e => {
        if (!e.ok) {
            return errorText()
        }
        return e.json()
    }).then(data => {
        showCountry(data)
    })
}


function showCountry(data) {
    if (data.length > 10) {
        countryInfo.innerHTML = ''
        countryList.innerHTML = ''
        return neededMoreText()
    }
    if (data.length > 2 && data.length < 10) {
        countryList.insertAdjacentHTML('beforeend', countryItem(data))
        return countryInfo.innerHTML = ''
    }
    if (data.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', countryCard(data))
        return countryList.innerHTML = ''
    }
}

function neededMoreText() {
    return Notify.info('Too many matches found. Please enter a more specific name.')
}

function errorText() {
    return Notify.failure('Oops, there is no country with that name')
}

export { fetchCountries }
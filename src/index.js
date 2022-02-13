import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
var _ = require('lodash');

const DEBOUNCE_DELAY = 300;


const inputRef = document.querySelector('input')


inputRef.addEventListener('input', _.debounce(fetchCountries, DEBOUNCE_DELAY))
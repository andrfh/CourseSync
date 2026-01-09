import fetch from 'node-fetch';
import iconv from 'iconv-lite';

export default async function fetchDailyRates() {
    const response = await fetch(`https://www.cbr.ru/scripts/XML_daily.asp`);
    if (response.ok) {
        console.log('Succesfull to get data from CBR')
    } else {
        throw new Error(`CBR request failed: ${response.status} ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const xml = iconv.decode(buffer, 'windows-1251');

    return xml;
}
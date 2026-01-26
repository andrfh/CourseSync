import fetch from 'node-fetch';
import iconv from 'iconv-lite';

class fetchCBR {
    async fetchDailyRates() {
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

    async fetchCurrencyDynamic(date_1, date_2, currency_id) {
        const response = await fetch(`https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${date_1}&date_req2=${date_2}&VAL_NM_RQ=${currency_id}`);
        if (response.ok) {
            console.log('Succesfull to get data from CBR')
        } else {
            throw new Error(`CBR request failed: ${response.status} ${response.statusText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const xml = iconv.decode(buffer, 'windows-1251');

        return xml;
    }
}

export default new fetchCBR;
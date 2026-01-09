import xml2js from 'xml2js';

const parser = new xml2js.Parser();

export default async function XMLparseToJson(xml) {
    const result = await parser.parseStringPromise(xml);

    const formattedResult = result.ValCurs.Valute.map((valute) => ({
    id: valute.$?.ID,
    charCode: valute.CharCode[0],
    name: valute.Name[0],
    nominal: Number(valute.Nominal[0]),
    source: 'www.cbr.ru',
    value: valute.Value[0].replace(',', '.'),
    date: result.ValCurs.$.Date,
    }));

    if (formattedResult) {
        console.log('Succesfull to parse data to JSON')
        return formattedResult;
    } else {
        throw new Error(`Parser proccess failed`);
    }

}

import xml2js from 'xml2js';

const parser = new xml2js.Parser();

export default async function XMLparseToJson(xml) {
    const result = await parser.parseStringPromise(xml);

    if (result) {
        console.log('Succesfull to parse data to JSON')
        return result;
    } else {
        throw new Error(`Parser proccess failed`);
    }

}

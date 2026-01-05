Веб-сервис для синхронизации курсов валют относительно RUB (в будущем возможно также относительно EUR). Данные подтягиваются из API от ЦБ РФ в формате XML и парсятся в JSON. Основные ветки информации:

1. **Актуальный курс валюты**

```jsx
Сервис получает данные об актуальном на данный момент курсе валюты.
URL:
https://www.cbr.ru/scripts/XML_daily.asp?date_req=DD/MM/YYYY
date_req - дата в формате DD/MM/YYYY

Ответ в XML от ЦБ:
<?xml version="1.0" encoding="windows-1251"?>
<ValCurs Date="31.12.2025" name="Foreign Currency Market">
    <Valute ID="R01010">
        <NumCode>036</NumCode>
        <CharCode>AUD</CharCode>
        <Nominal>1</Nominal>
        <Name>Австралийский доллар</Name>
        <Value>52,4979</Value>
        <VunitRate>52,4979</VunitRate>
    </Valute>
    <Valute ID="R01020A">
        <NumCode>944</NumCode>
        <CharCode>AZN</CharCode>
        <Nominal>1</Nominal>
        <Name>Азербайджанский манат</Name>
        <Value>46,0157</Value>
        <VunitRate>46,0157</VunitRate>
    </Valute>
    <Valute ID="R01030">
        <NumCode>012</NumCode>
        <CharCode>DZD</CharCode>
        <Nominal>100</Nominal>
        <Name>Алжирских динаров</Name>
        <Value>60,4454</Value>
        <VunitRate>0,604454</VunitRate>
    </Valute>
    <Valute ID="R01035">
        <NumCode>826</NumCode>
        <CharCode>GBP</CharCode>
        <Nominal>1</Nominal>
        <Name>Фунт стерлингов</Name>
        <Value>105,6060</Value>
        <VunitRate>105,606</VunitRate>
    </Valute>
</ValCurs>

Парсинг в JSON:
{
  "ValCurs": {
    "Date": "31.12.2025",
    "name": "Foreign Currency Market",
    "Valute": [
      {
        "ID": "R01010",
        "NumCode": "036",
        "CharCode": "AUD",
        "Nominal": "1",
        "Name": "Австралийский доллар",
        "Value": "52,4979",
        "VunitRate": "52,4979"
      },
      {
        "ID": "R01020A",
        "NumCode": "944",
        "CharCode": "AZN",
        "Nominal": "1",
        "Name": "Азербайджанский манат",
        "Value": "46,0157",
        "VunitRate": "46,0157"
      },
      {
        "ID": "R01030",
        "NumCode": "012",
        "CharCode": "DZD",
        "Nominal": "100",
        "Name": "Алжирских динаров",
        "Value": "60,4454",
        "VunitRate": "0,604454"
      },
      {
        "ID": "R01035",
        "NumCode": "826",
        "CharCode": "GBP",
        "Nominal": "1",
        "Name": "Фунт стерлингов",
        "Value": "105,6060",
        "VunitRate": "105,606"
      }
    ]
  }
}
```

1. **История валюты за определенный период (в виде графика)**

```jsx
Сервис получает данные стоимости по определенному периоду времени.
URL:
https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/01/2025&date_req2=20/01/2025&VAL_NM_RQ=R01235
date_req1 - начало промежутка в формате DD/MM/YYYY
date_req2 - конец промежутка в формате DD/MM/YYYY
VAL_NM_RQ - внутренний код валюты

Ответ в XML от ЦБ:
<?xml version="1.0" encoding="windows-1251"?>
<ValCurs ID="R01235" DateRange1="01.01.2025" DateRange2="20.01.2025" name="Foreign Currency Market Dynamic">
    <Record Date="10.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>102,2911</Value>
        <VunitRate>102,2911</VunitRate>
    </Record>
    <Record Date="11.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>101,9146</Value>
        <VunitRate>101,9146</VunitRate>
    </Record>
    <Record Date="14.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>102,7081</Value>
        <VunitRate>102,7081</VunitRate>
    </Record>
    <Record Date="15.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>103,4380</Value>
        <VunitRate>103,438</VunitRate>
    </Record>
    <Record Date="16.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>102,8078</Value>
        <VunitRate>102,8078</VunitRate>
    </Record>
    <Record Date="17.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>102,3762</Value>
        <VunitRate>102,3762</VunitRate>
    </Record>
    <Record Date="18.01.2025" Id="R01235">
        <Nominal>1</Nominal>
        <Value>102,4137</Value>
        <VunitRate>102,4137</VunitRate>
    </Record>
</ValCurs>

Париснг в JSON:
{
  "ValCurs": {
    "ID": "R01235",
    "DateRange1": "01.01.2025",
    "DateRange2": "20.01.2025",
    "name": "Foreign Currency Market Dynamic",
    "Record": [
      {
        "Date": "10.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "102,2911",
        "VunitRate": "102,2911"
      },
      {
        "Date": "11.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "101,9146",
        "VunitRate": "101,9146"
      },
      {
        "Date": "14.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "102,7081",
        "VunitRate": "102,7081"
      },
      {
        "Date": "15.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "103,4380",
        "VunitRate": "103,438"
      },
      {
        "Date": "16.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "102,8078",
        "VunitRate": "102,8078"
      },
      {
        "Date": "17.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "102,3762",
        "VunitRate": "102,3762"
      },
      {
        "Date": "18.01.2025",
        "Id": "R01235",
        "Nominal": "1",
        "Value": "102,4137",
        "VunitRate": "102,4137"
      }
    ]
  }
}
```

Данные о последних ценах валют записываются в БД и синхронизируются раз в час.

**Таблица Currencies**

Исходный формат (JSON):

```json
{
    "ID": "R01035",
    "NumCode": "826",
    "CharCode": "GBP",
    "Nominal": "1",
    "Name": "Фунт стерлингов",
    "Value": "105,6060",
    "VunitRate": "105,606"
  }
```

Таблица **currencies** в БД:

| Key | Value |
| --- | --- |
| id | внутренний id |
| cbr_id | ID ЦБ (`R01035`) |
| char_code | GBP |
| name | Фунт стерлингов |
| nominal | 1 |
| source | Центральный Банк РФ |

Таблица **currency_rates** в БД:

| Key | Value |
| --- | --- |
| id | внутренний id |
| currency_id | ссылка на `currencies` |
| date | дата курса |
| rate | цена (число) |
| created_at | дата создания |

**Событие (логи)**

| Key | Value |
| --- | --- |
| id | внутренний Id |
| type | INFO / ERROR |
| source | CBR |
| message | текст |
| context | JSON  |
| created_at | дата создания |
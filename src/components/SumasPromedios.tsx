import { useEffect } from 'react';
import { FormProps, Period } from './calculo';

const SumasPromedios = ({fields, period, setDailySalary}: FormProps) => {
    let sum = 0;
    let numSalariesEntries = 0;
    fields?.map((value) => {
        if (value.salary && value.commission){
            sum += Number(value.salary);
            sum += Number(value.commission);
            numSalariesEntries++;
        }
        else if (value.salary)
        {
            sum += Number(value.salary);
            numSalariesEntries++;
        }
        else if (value.commission)
        {
            sum += Number(value.commission);
            numSalariesEntries++;
        }
    });

    let promedioMensual = 0;
    let promedioDiario = 0;

    switch (period) {
        case Period.Monthly:
            promedioMensual = sum / numSalariesEntries;
            promedioDiario = promedioMensual / 4 / 6;
            break;
    
        case Period.Biweekly:
            promedioMensual = sum / numSalariesEntries * 2;
            promedioDiario = promedioMensual / 4 / 6;
            break;

        case Period.Weekly:
            promedioMensual = sum / numSalariesEntries * 4;
            promedioDiario = promedioMensual / 4 / 6;
            break;

        case Period.Daily:
            promedioMensual = sum / numSalariesEntries * 30;
            promedioDiario = promedioMensual / 4 / 6;
            break;
    }

    if (promedioDiario) setDailySalary?.(promedioDiario);

    useEffect(() => {}, [fields, period]);

    return (
    <div className='content'>
        <table>
            <thead>
                <tr>
                    <th>Sumatoria de los salarios</th>
                    <th>Salario promedio mensual</th>
                    <th>Salario promedio diario</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{sum}</td>
                    {fields?.length ? 
                    <td>{promedioMensual ? promedioMensual : 0} len: {fields.length} ent: {numSalariesEntries}</td> : <td>0</td>
                    }
                    <td>{promedioDiario ? promedioDiario : 0}</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
};

export default SumasPromedios;
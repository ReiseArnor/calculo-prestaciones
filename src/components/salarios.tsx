
import { useEffect } from "react";
import { Salary, FormProps } from "./calculo";

const numberOfSalaries: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const SalariesCommisionsTotals = ({register, fields, completeSalaries}: FormProps) => {
    useEffect(() => {}, [register]);

    return (
    <div>
        <table className="table">

            <thead className="">
                <tr>
                    <th><abbr title="Position">#</abbr></th>
                    <th>Salarios</th> 
                    <th>Comisiones</th>
                    <th>Totales</th> 
                    <th>Completar</th> 
                </tr>
            </thead>

            <tbody>

                {numberOfSalaries.map(value => (

                <tr key={value + 1}>
                    <th>{value + 1}</th>
                    <td>
                        <input className="input is-medium column" {...register(`salaries.${value}.salary`, { required: false })} type="number"/>
                    </td>
                    <td>
                        <input className="input is-medium column" {...register(`salaries.${value}.commission`, { required: false })} type="number"/> 
                    </td>
                    <td>
                        <input className="input" value={ Number(fields?.at(value)?.salary) + Number(fields?.at(value)?.commission) ? 
                                                        Number(fields?.at(value)?.salary) + Number(fields?.at(value)?.commission): 
                                                        Number(fields?.at(value)?.salary ? Number(fields.at(value)?.salary) : 0) } type="text" readOnly/>
                    </td>
                    <td>
                        <input className="button" value="Completar" type="button" onClick={ () => { if (completeSalaries) completeSalaries(value)} }/>
                    </td>
                </tr>
                
                ))}

            </tbody>

        </table>
    </div>
    );
};

export default SalariesCommisionsTotals;
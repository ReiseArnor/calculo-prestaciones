import { ChangeEvent, useState } from "react";
import { ResultProps, Time} from "./calculo";

const Prestaciones = ({dailySalary, daysWorked}: ResultProps) => {
    const [preAviso, setPreAviso] = useState<boolean>(false);
    const [cesantia, setCesantia] = useState<boolean>(false);
    const [vacasiones, setVacasiones] = useState<boolean>(false);
    const [navidad, setNavidad] = useState<boolean>(false);

    const handlePreAvisoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setPreAviso(checked);
    };

    const handleCesantia = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setCesantia(checked);
    }

    const handleVacasiones = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setVacasiones(checked);
    }

    const handleNavidad = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setNavidad(checked);
    }

    let preAvisoResult: number = 0;
    let preAvisoDays: number = 0;
    if (daysWorked && dailySalary)
    {
        if (daysWorked >= Time.threeMonths && daysWorked < Time.sixMonths)
        {
            preAvisoDays = 7;
            preAvisoResult = dailySalary * preAvisoDays;
        }
            
        else if (daysWorked >= Time.sixMonths && daysWorked < Time.aYear)
        {
            preAvisoDays = 14;
            preAvisoResult = dailySalary * preAvisoDays;
        }
            
        else if (daysWorked >= Time.aYear)
        {
            preAvisoDays = 28;
            preAvisoResult = dailySalary * preAvisoDays;
        }

    }

    let cesantiaResult: number = 0
    let cesantiaDays: number = 0;

    const diasRestantes = (restantes: number) => {
        if (dailySalary) {
            if (restantes >= Time.threeMonths && restantes < Time.sixMonths)
            {
                cesantiaDays += 6;
                let temp_days = 6;
                cesantiaResult += dailySalary * temp_days;
            }
            else if (restantes >= Time.sixMonths && restantes < Time.aYear)
            {
                cesantiaDays += 13;
                let temp_days = 13;
                cesantiaResult += dailySalary * temp_days;
            }
        }
    };

    if (daysWorked && dailySalary)
    {
        if (daysWorked >= Time.threeMonths && daysWorked < Time.sixMonths)
        {
            cesantiaDays = 6;
            cesantiaResult = dailySalary * cesantiaDays;
        }
        else if (daysWorked >= Time.sixMonths && daysWorked < Time.aYear)
        {
            cesantiaDays = 13;
            cesantiaResult = dailySalary * cesantiaDays;
        }
        else if (daysWorked >= Time.aYear && daysWorked < Time.fiveYears)
        {
            let years = Math.trunc(daysWorked / Time.aYear);
            cesantiaDays = 21 * years;
            cesantiaResult = dailySalary * cesantiaDays;

            let restante = daysWorked - (Time.aYear * years);
            if (restante >= Time.threeMonths)
                diasRestantes(restante);
        }
        else if (daysWorked >= Time.fiveYears)
        {
            let years = Math.trunc(daysWorked / Time.aYear);
            cesantiaDays = 23 * years;
            cesantiaResult = dailySalary * cesantiaDays;

            let restante = daysWorked - (Time.aYear * years);
            if (restante >= Time.threeMonths)
                diasRestantes(restante);
        }

    }

    return (
    <div className="content">
        <table>
            <tbody>
                <tr>
                    <td>¿Ha sido usted pre-avisado?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={preAviso} onChange={handlePreAvisoChange}/>
                    </label>
                    </td>
                    <td>{preAviso ? 0 : preAvisoResult} {preAvisoDays && !preAviso ? "(" + preAvisoDays + " días)": ""}</td>
                </tr>
                <tr>
                    <td>¿Desea incluir cesantía?</td>
                    <td>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={cesantia} onChange={handleCesantia}/>
                    </label>
                    </td>
                    <td>{cesantia ? cesantiaResult : 0} {cesantiaDays && cesantia ? "(" + cesantiaDays + " días)": ""}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
    );
};

export default Prestaciones;